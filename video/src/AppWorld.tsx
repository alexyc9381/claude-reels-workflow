import React from "react";
import { inter } from "./fonts";
import { MONO } from "./SlopKit";
import {
  W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, rnd,
  Beam, Strip, Motes, Chip, Slug, Plate, BigNum, Contact, Edge, Scene, Cam,
  Mark, MarkPlate, MarkCast, AskBubble, CamCtx, PalCtx,
} from "./NomWorld";
import type { Place } from "./NomWorld";

/* ===========================================================================
   REEL 100 · "APPLE" — THE WORLD KIT.  Board: storyboards/100-apple.md.

   THE PLACE: **THE PROOFING FLOOR** — a design hall after hours, where a
   website is a physical BOARD you can stand up, light, and measure against a
   rack of engraved rule plates.

   ⛔⛔ THE RULE THIS BUILD IS HELD TO ([[feedback_real_marks_are_the_props]],
      and the two worlds reel 99 lost to it): **nothing on screen has to be
      TRANSLATED before it means something.** A page is a page. A gap is a gap.
      A hex is a paint swatch. A rule is a printed rule. There is no metaphor
      to decode, so there is nothing for the viewer to be told.

        Apple's design language  -> a rack of engraved plates, real token names
        the skill                -> ONE cream .md card, three real tokens on it
        your existing website    -> a tall board on an easel, already wrong
        the audit                -> a measuring sweep, and 14 red tags
        --apple-section-gap      -> a caliper that opens 64 -> 100
        --apple-content-max-width-> two guide rails that squeeze to 980
        --apple-text-primary     -> a swatch chip that flips #4A4A4A -> #1D1D1F
        --apple-weight-title     -> a dial that turns, and the headline thickens

   ⛔ EVERY NUMBER ON SCREEN IS REAL, quoted from the skill's own
      `prompts/design-tokens.md` and `prompts/typography.md`. There is no star
      count, no fork count and no maker plate anywhere in this reel — research
      found several Apple-design skills and no dominant one, so the reel
      dramatises the MECHANISM and stops at the edge of the claim
      (docs/KICKOFF-PROMPT.md §1). See the board's HONESTY LINE.

   ⛔ MATTE PALETTE. Solid paints and dark shadows; not one `0 0 Npx <colour>`
      glow in the reel ([[feedback_reel_matte_palette]]).
   ⛔⛔ `dark()`/`mix()` are HEX-IN, RGB-OUT, so they do not nest. Use dkh/mxh.
   ========================================================================= */

export { W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, rnd,
  Beam, Strip, Motes, Chip, Slug, Plate, BigNum, Contact, Edge, Scene, Cam,
  Mark, MarkPlate, MarkCast, AskBubble, CamCtx, PalCtx };
export type { Place };

/* the house accents, matte */
export const CLAY = "#D97757", GOLD = "#E7B24C", GREEN = "#3F9E74";
export const RED = "#C44A3A", SKY = "#5AA0DE", PAPER = "#F7F5F0";
export const INK = "#1A1813";

/* ⛔⛔ HEX IN, HEX OUT — see the header. Nesting dark()/mix() paints SOLID
   BLACK, silently, and only in the dimmed shots. */
export const dkh = (hex: string, k: number) => {
  const n = parseInt(hex.slice(1), 16);
  const m = (v: number) => Math.round(v * (1 - k));
  const h = (v: number) => m(v).toString(16).padStart(2, "0");
  return `#${h((n >> 16) & 255)}${h((n >> 8) & 255)}${h(n & 255)}`;
};
export const mxh = (hex: string, k: number) => {
  const n = parseInt(hex.slice(1), 16);
  const m = (v: number) => Math.round(v + (247 - v) * k);
  const h = (v: number) => m(v).toString(16).padStart(2, "0");
  return `#${h((n >> 16) & 255)}${h((n >> 8) & 255)}${h(n & 255)}`;
};

/* ---------------------------------------------------------------------------
   THE SUBJECT'S OWN COLOURS. These are Apple's, verbatim from the skill's
   design-tokens.md, and they are used as PAINT in this world — the swatch that
   flips in S8 is literally --apple-text-primary.
   ------------------------------------------------------------------------ */
export const A_WHITE = "#FFFFFF";
export const A_DARK = "#1D1D1F";        /* --apple-bg-dark / --apple-text-primary */
export const A_GRAY = "#F5F5F7";        /* --apple-bg-light-gray */
export const A_ELEV = "#FBFBFD";        /* --apple-bg-elevated */
export const A_SEC = "#6E6E73";         /* --apple-text-secondary */
export const A_TER = "#86868B";         /* --apple-text-tertiary */
export const A_BLUE = "#0066CC";        /* --apple-link-blue */
/* the WRONG value the audit finds, and what it is corrected to */
export const BAD_TEXT = "#4A4A4A";

/* the world's own materials */
export const OAK = "#A67F58", OAKD = "#75593B", OAKL = "#C0996E";
export const STEEL = "#9BA4AD", STEELD = "#5E666E", STEELL = "#C3CAD1";
export const BRASS = "#C8963E", BRASSD = "#8E6626", BRASSL = "#E8C57A";
export const CARD = "#F4EFE3", CARDD = "#D9D0BC";
export const TAGR = "#C8443A", TAGRD = "#8E2B24";

/* =========================================================================
   THE PLACES — eight of them, one per scene, each its own palette so every
   cut is a COLOUR change as well as a framing change
   ([[reel-locations-library-vs-used]]: this is the USED list, not a library).
   ====================================================================== */
/* ⛔⛔ THE HORIZONS WERE ALL ~100px TOO HIGH IN v1 AND EVERY SCENE SHIPPED A
   DEAD BOTTOM THIRD — the floor ran from mid-panel to the slug and carried
   nothing. Measured off the rendered stills, not guessed: the panel is 792
   tall, the header pill owns y 0..112, the slug owns y 730..792, so the
   working stage is y 118..726. A horizon at 560..600 leaves the floor as a
   ~180px band the sprite stands ON, instead of a half-frame of empty ground.
   ⭐ Every scene's hero geometry below is derived from that stage, so nothing
   is authored off-panel again (S4 v1 put a 634px board in a 792px panel with
   the horizon at 520, and shipped a board whose top four sections were off
   frame — only the footer was visible). */
export const PLACES: Record<string, Place> = {
  /* S0 · the gallery. Graphite hall, white plinth, one hard spot. The set IS
     the subject: this is Apple's own retail language. */
  plinth: { back: "#2E3339", back2: "#171A1E", floor: "#3C4147", floor2: "#20242A",
            lip: "#4C525A", key: "#F2EFE8", horizon: 600, grit: "#505761" },
  /* S1 · the request desk. Flat, sourceless, the dullest frame in the reel and
     that is the point — a vague ask gets a vague room. */
  desk:   { back: "#C8C3B6", back2: "#A8A296", floor: "#B2AC9E", floor2: "#8F8A7C",
            lip: "#BFB9AB", key: "#D2CCBE", horizon: 566, grit: "#9C9587" },
  /* S2 · the rule bench. Warm amber worklight raking from the left. */
  bench:  { back: "#E6D9BE", back2: "#C0AF8D", floor: OAK, floor2: OAKD,
            lip: "#C09A6C", key: GOLD, horizon: 600, grit: "#B08E62" },
  /* S3 · the blank rack. Cool moonlight from a high window. */
  rack:   { back: "#707C88", back2: "#45505A", floor: "#5C6772", floor2: "#39424B",
            lip: "#68747F", key: "#A1B6C6", horizon: 566, grit: "#6D7985" },
  /* S4 · your board on its easel. Warm neutral, paper white, key from the right. */
  stand:  { back: "#DED5C4", back2: "#B5AB94", floor: "#907D62", floor2: "#655643",
            lip: "#A28E70", key: "#E7C98C", horizon: 604, grit: "#9B886C" },
  /* S5 · the intake console. The reel's only BOTTOM-LIT frame. */
  slot:   { back: "#25363C", back2: "#152025", floor: "#2E4047", floor2: "#19262C",
            lip: "#3C525A", key: "#6FC3C8", horizon: 600, grit: "#40575F" },
  /* S6 · the inspection bay. Hard red top-down, used NOWHERE else. */
  bay:    { back: "#4C3C3C", back2: "#2C2021", floor: "#584441", floor2: "#312624",
            lip: "#6C5452", key: "#D8564A", horizon: 604, grit: "#604A46" },
  /* S7 · the copying desk. Cold monitor light, no key. Unpleasant on purpose. */
  mill:   { back: "#434E59", back2: "#283038", floor: "#4E5863", floor2: "#2E363E",
            lip: "#58636E", key: "#81A8CA", horizon: 582, grit: "#5A6570" },
  /* S8/S9 · the rule wall lit. Gold key, low and warm. Brightest in the reel. */
  vault:  { back: "#F1E7CE", back2: "#CDBC98", floor: "#AB8C60", floor2: "#7C6442",
            lip: "#C2A277", key: GOLD, horizon: 586, grit: "#B5966C" },
};

const WARM = ["bench", "stand", "vault", "desk"];
const COLD = ["plinth", "rack", "slot", "bay", "mill"];
/* ⛔ HEX IN, HEX OUT — a Place field goes straight back into dkh/mxh. */
const LEVEL: Record<number, (c: string) => string> = {
  1: (c) => mxh(c, 0.09), 2: (c) => mxh(c, 0.16), 3: (c) => dkh(c, 0.10),
};
export const usePlace = (key: string): Place => {
  const p = React.useContext(PalCtx);
  const base = PLACES[key];
  if (!p) return base;
  const ring = COLD.includes(key) ? COLD : WARM;
  const d = PLACES[ring[(ring.indexOf(key) + p) % ring.length]];
  const L = LEVEL[p];
  const c = L ? { ...d, back: L(d.back), back2: L(d.back2), floor: L(d.floor),
    floor2: L(d.floor2), lip: L(d.lip), grit: L(d.grit) } : d;
  return { ...c, key: base.key, horizon: base.horizon };
};

/* =========================================================================
   THE HALL — wall, skirting, floor, and a floor that recedes. Every scene
   stands in one of these; nothing in this reel floats on black.

   ⛔⛔ *"so much more needs to be animated as well."* `live` gives the ROOM a
      permanent low-contrast idle — dust in the light, the key breathing, a
      slow drift on the wall wash — so the frame is never static even when the
      hero is between gestures. None of it competes for hierarchy: it is all
      slow and all low-contrast ([[reel-motion-hierarchy]]).
   ====================================================================== */
/* ⛔ `bleed` EXISTS FOR THE TWO MOTIVATED CAMERA MOVES ONLY (S6 pull-back, S8
   rise). A scene that scales below 1.0 or translates would otherwise show the
   panel's own edge past the end of the wall. It widens the wall and floor
   without moving the HORIZON, so the set does not shift when it is used. */
export const Hall: React.FC<{ p: Place; f: number; dim?: number; skirt?: boolean;
  floorLines?: number; live?: boolean; lightX?: number; bleed?: number }> =
  ({ p, f, dim = 0, skirt = true, floorLines = 5, live = true, lightX = 0.5, bleed = 0 }) => {
  const hz = p.horizon;
  const D = (c: string) => (dim > 0 ? dkh(c, dim) : c);
  const breathe = live ? Math.sin(f / 61) * 0.04 : 0;
  const drift = live ? Math.sin(f / 83) * 9 : 0;
  const B = { left: -bleed, right: -bleed } as const;
  return (<>
    {/* the wall — a single vertical ramp, one light direction */}
    <div style={{ position: "absolute", ...B, top: -bleed, bottom: -bleed, zIndex: 1,
      background: `linear-gradient(174deg, ${D(mxh(p.back, 0.12))} 0%, ${D(p.back)} 44%, ${D(p.back2)} 100%)` }} />
    {/* the key's wash on the wall, off-centre so the light has a SIDE */}
    <div style={{ position: "absolute", left: W * lightX - 430 + drift, top: -80,
      width: 860, height: hz + 140, zIndex: 2, borderRadius: "50%",
      background: D(mxh(p.back, 0.20)), opacity: 0.30 + breathe }} />
    {/* the floor */}
    <div style={{ position: "absolute", ...B, top: hz, bottom: -bleed, zIndex: 12,
      background: `linear-gradient(183deg, ${D(p.floor)} 0%, ${D(p.floor2)} 100%)` }} />
    {/* the skirting: the line that tells you wall from floor */}
    {skirt && (<>
      <div style={{ position: "absolute", ...B, top: hz - 15, height: 19,
        background: D(mxh(p.floor, 0.24)), zIndex: 13, boxShadow: SH }} />
      <div style={{ position: "absolute", ...B, top: hz + 4, height: 5,
        background: D(dkh(p.floor2, 0.26)), zIndex: 14 }} />
    </>)}
    {/* floorboards, spaced by a square law so the floor recedes */}
    {Array.from({ length: floorLines }, (_, i) => (
      <div key={"fl" + i} style={{ position: "absolute", ...B,
        top: hz + 38 + i * i * 13 + i * 28, height: 3,
        background: D(dkh(p.floor2, 0.22)), opacity: 0.55, zIndex: 15 }} />
    ))}
    {/* the pool of key light on the floor, breathing */}
    {live && (
      <div style={{ position: "absolute", left: W * lightX - 320 + drift * 0.6, top: hz + 18,
        width: 640, height: 132, borderRadius: "50%", background: D(mxh(p.floor, 0.24)),
        opacity: 0.28 + breathe, zIndex: 16 }} />
    )}
  </>);
};

/* the ceiling spot that lights the gallery — housing, throat, and its cone */
export const Spot: React.FC<{ x: number; y?: number; on?: number; c?: string;
  z?: number; f?: number; len?: number; spread?: number }> =
  ({ x, y = 0, on = 1, c = "#F2E7CC", z = 30, f = 0, len = 470, spread = 430 }) => (<>
    <div style={{ position: "absolute", left: x - 5, top: y, width: 10, height: 46,
      background: "#31363C", zIndex: z }} />
    <div style={{ position: "absolute", left: x - 40, top: y + 40, width: 80, height: 44,
      borderRadius: "8px 8px 30px 30px", background: "#3C424A", zIndex: z, boxShadow: SH_D }} />
    <div style={{ position: "absolute", left: x - 30, top: y + 76, width: 60, height: 11,
      borderRadius: "0 0 26px 26px", background: on > 0.03 ? c : "#3A3F46",
      opacity: on > 0 ? 0.4 + on * 0.6 : 1, zIndex: z + 1 }} />
    {on > 0.03 && <Beam x={x} y={y + 84} top={64} bot={spread} len={len} c={c}
      o={0.24 * on} z={z - 9} f={f} />}
  </>);

/* =========================================================================
   THE RULE WALL — the token file, cast into the set. Read as texture at a
   glance and as real token names when the camera is close.
   ⛔ It is FURNITURE, not a subject: it lights in bands and never animates
      per-plate, so it cannot compete with the hero ([[reel-motion-hierarchy]]).
   ====================================================================== */
/* ⛔⛔ TEXT WAS LEAKING OUT OF SIX PLATES AND THE CAUSE WAS ONE STRING.
   Measured, not eyeballed: mono at weight 800 advances ~0.60em, so
   `--apple-content-max-width` at 11px needs 165px inside a 162px RuleWall
   plate, and at 19px needs 379px inside a 336px RulePlate. Six boxes were
   over. The `--apple-` prefix is 8 of those characters, it repeats on every
   plate in the reel, and it carries NO information the set does not already
   give you — the hall is called APPLE DESIGN and the wall is Apple's tokens.
   ⭐ So the plates take the SHORT name and the SkillCard keeps the full
   `--apple-*` (its box is 692px inner and the full token IS the receipt).
   Longest short name is `content-max-width`: 112/162 and 194/336. */
export const shortTok = (name: string) => name.replace(/^--apple-/, "");

export const TOKENS: [string, string][] = [
  ["--apple-section-gap", "100px"],
  ["--apple-content-max-width", "980px"],
  ["--apple-text-primary", "#1D1D1F"],
  ["--apple-card-padding", "32px"],
  ["--apple-weight-title", "600"],
  ["--apple-bg-light-gray", "#F5F5F7"],
  ["--apple-text-secondary", "#6E6E73"],
  ["--apple-link-blue", "#0066CC"],
  ["--apple-component-gap-md", "32px"],
];

export const RuleWall: React.FC<{ x: number; y: number; cols?: number; rows?: number;
  s?: number; z?: number; lit?: number; c?: string; f?: number }> =
  ({ x, y, cols = 4, rows = 5, s = 1, z = 6, lit = 1, c = "#C9BFA6", f = 0 }) => (<>
    {Array.from({ length: rows }, (_, r) =>
      Array.from({ length: cols }, (_, k) => {
        const i = r * cols + k;
        const [nm, vl] = TOKENS[i % TOKENS.length];
        /* bands light bottom-up; `lit` is 0..1 across the whole wall */
        const band = 1 - r / rows;
        const on = Math.max(0, Math.min(1, (lit - band * 0.85) * 3.2));
        const dim = 0.52 - on * 0.52;
        return (
          <div key={"rw" + i} style={{ position: "absolute",
            left: x + k * 196 * s, top: y + r * 62 * s, width: 180 * s, height: 50 * s,
            zIndex: z, background: dkh(c, dim), borderRadius: 4 * s,
            border: `${2 * s}px solid ${dkh(c, dim + 0.20)}`,
            display: "flex", flexDirection: "column", justifyContent: "center",
            padding: `0 ${9 * s}px`, boxShadow: SH }}>
            <div style={{ fontFamily: MONO, fontWeight: 800, fontSize: 11 * s,
              letterSpacing: "0.01em", color: dkh("#2A2419", dim * 0.5), opacity: 0.62 + on * 0.38,
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {shortTok(nm)}</div>
            <div style={{ fontFamily: MONO, fontWeight: 900, fontSize: 19 * s,
              color: dkh("#241F17", dim * 0.4), opacity: 0.7 + on * 0.3 }}>{vl}</div>
          </div>
        );
      })
    )}
  </>);

/* =========================================================================
   IDLE — the small permanent life a sprite needs so it is never a cut-out.
   ====================================================================== */
export const idle = (f: number, seed: number, amp = 1) => ({
  dy: Math.sin(f / 21 + seed * 1.7) * 2.4 * amp,
  rot: Math.sin(f / 29 + seed) * 0.7 * amp,
});

/* a foreground occluder specific to this world: the edge of the next board in
   the rack, cropped by the panel. Without one the camera is at a backdrop. */
export const BoardEdge: React.FC<{ side?: "l" | "r"; c: string; w?: number; z?: number;
  top?: number }> = ({ side = "l", c, w: ww = 96, z = 92, top = -40 }) => {
  const L = side === "l";
  return (
    <div style={{ position: "absolute", top, bottom: -40, width: ww, zIndex: z,
      [L ? "left" : "right"]: -18, background: c, boxShadow: SH_D }}>
      <div style={{ position: "absolute", top: 0, bottom: 0, [L ? "right" : "left"]: 0,
        width: 12, background: mxh(c, 0.20) }} />
      <div style={{ position: "absolute", top: 0, bottom: 0, [L ? "left" : "right"]: 0,
        width: 22, background: dkh(c, 0.28) }} />
    </div>
  );
};
