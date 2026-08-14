import React from "react";
import { Img, staticFile } from "remotion";
import { MONO } from "./SlopKit";
import { inter, fraunces } from "./fonts";
import {
  W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, rnd,
  Beam, Strip, Motes, Chip, Slug, Plate, BigNum, Contact, Edge, Scene, Cam,
  Mark, MarkPlate, MarkCast, AskBubble, CamCtx, PalCtx,
} from "./NomWorld";
import type { Place } from "./NomWorld";
import { Hall, Spot, dkh, mxh, idle } from "./AppWorld";
import { BackWall } from "./SeoWorld";

/* ===========================================================================
   REEL 103 · "TRADE" — THE WORLD KIT.  Board: storyboards/103-trade.md.

   THE PLACE: **THE MORNING DESK** — a wood-panelled research house in the hour
   before the open. Oak desks, green banker's glass, brass nameplates, paper in
   trays, a brass clock, tall windows onto a city that is still dark.

   ⛔⛔ THE ONE INSTINCT THIS WORLD EXISTS TO REFUSE. The subject is a trading
      floor, so the default landing place is neon-on-black with green candles —
      REEL-BUILD-LEARNINGS §1's single most re-flagged failure, and it is
      arrived at by *inference* ("the subject is technological, so a dark room
      feels right"), never by choice. There is **no glowing terminal in this
      reel**. Every lit surface is paper-toned; every accent is a solid matte
      paint; depth is dark drop-shadow, never coloured glow.
   ⭐ AND THE SUBJECT'S OWN ART AGREES: Anthropic's announcement hero is
      `#D97757` on `#FAF9F5` — house clay on house cream. The real asset drops
      straight into this palette.

   ⛔⛔ THE BAR EVERY PROP IS HELD TO ([[feedback_real_marks_are_the_props]]):
      point at it and say what it IS. If the honest answer needs "stands for",
      it is cut. Here every answer is literal:

        the announcement    -> Anthropic's real May 5 2026 post, its own assets
        the ten agents      -> ten brass nameplates carrying their REAL names
        an earnings call    -> a bound transcript that feeds through a slot
        news + filings      -> clippings on a spike and a tape running out
        a financial model   -> a ruled ledger grid filling cell by cell
        your decision       -> a two-sided paddle YOUR hand turns, not Claude's
        the repo            -> one plate: mark, owner/name, stars, licence
        the sign-off        -> the OUT tray, stamped FOR REVIEW

   ⛔ `dark()`/`mix()` are HEX-IN, RGB-OUT and DO NOT NEST
      ([[feedback_nested_colour_helpers_go_black]]). Use dkh/mxh everywhere.
   ========================================================================= */

export { W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, rnd,
  Beam, Strip, Motes, Chip, Slug, Plate, BigNum, Contact, Edge, Scene, Cam,
  Mark, MarkPlate, MarkCast, AskBubble, CamCtx, PalCtx, Hall, Spot, dkh, mxh, idle,
  BackWall };
export type { Place };

/* the house accents, matte — no neon, no coloured glow */
export const CLAY = "#D97757", GOLD = "#E7B24C", GREEN = "#3F9E74";
export const RED = "#C44A3A", SKY = "#5AA0DE", PAPER = "#F7F5F0";
export const INK = "#1A1813", MUTE = "#9A968B";

/* this world's own materials */
export const OAK = "#A67F58", OAKD = "#75593B", OAKL = "#C0996E";
export const BRASS = "#C8963E", BRASSD = "#8E6626", BRASSL = "#E8C57A";
export const CARD = "#F4EFE3", CARDD = "#D9D0BC", CARDL = "#FBF7EE";
export const LEDG = "#2F6B52", LEDGL = "#6FA98C", LEDGD = "#1E4736";
export const STEEL = "#9BA4AD", STEELD = "#5E666E";
export const FELT = "#3E5A4E";                    /* the desk blotter */
export const LAMPC = "#F2E3BC";

/* Anthropic's REAL page tokens, read off anthropic.com/news/finance-agents on
   2026-08-13 with getComputedStyle. Not approximations — the actual values, so
   the announcement in the hook is the announcement and not a pastiche. */
export const APX_BG = "#FAF9F5";                  /* body background        */
export const APX_INK = "#141413";                 /* h1 colour              */
export const APX_CLAY = "#D97757";                /* rgb(217,119,87), r=24px */

/* =========================================================================
   THE TEN AGENTS — Anthropic's own names, in Anthropic's own two groups, from
   anthropic.com/news/finance-agents (May 5 2026), read live 2026-08-13. Not a
   sample and not paraphrased: this is the published list, and it is exactly
   ten long, which is the number the VO says.

   ⛔ THE COSTUME COMES FROM THE JOB, so ten sprites teach the roster instead of
      counting it ([[seo-reel]] round 2: eighteen identical sprites is
      wallpaper). Ten agents, ten levers, no repeat.
   ⛔ WIDTH ARITHMETIC BEFORE THE BOX: Inter-900 advances ~0.56em, and the
      longest plate string is `GL RECONCILER` at 13 chars — 13*0.56*19px =
      138px, so every nameplate is >= 168px inner.
   ====================================================================== */
/* ⛔ `plate` is the full engraved name for a hero-size plate; `short` is for
   the RAIL, whose cells are 164px wide with 144px inner. `EARNINGS REVIEWER`
   needs 185px there and truncated to `EARNINGS REVIEWE` on the first render.
   ⛔ TEXT TOO SMALL TO READ IS THE WORST OF BOTH WORLDS and a TRUNCATED name is
   worse still — it is a real product name, said wrong, on a receipt. */
export type Agent = { id: string; name: string; plate: string; short: string;
  group: 0 | 1; does: string; costume: Record<string, number | string> };

export const AGENTS: Agent[] = [
  { id: "pitch",    name: "Pitch builder",     plate: "PITCH BUILDER", short: "PITCH",   group: 0,
    does: "target lists, comps, pitchbooks",     costume: { bowtie: 1 } },
  { id: "meeting",  name: "Meeting preparer",  plate: "MEETING PREP", short: "MEETING",    group: 0,
    does: "client and counterparty briefs",      costume: { earpiece: 1 } },
  { id: "earnings", name: "Earnings reviewer", plate: "EARNINGS REVIEWER", short: "EARNINGS", group: 0,
    does: "reads transcripts and filings",       costume: { sherlock: 1 } },
  { id: "model",    name: "Model builder",     plate: "MODEL BUILDER", short: "MODEL",   group: 0,
    does: "builds models from filings",          costume: { hardHat: 1 } },
  { id: "market",   name: "Market researcher", plate: "MARKET RESEARCHER", short: "MARKET", group: 0,
    does: "tracks sector and issuer news",       costume: { capBack: 1 } },
  { id: "valuation",name: "Valuation reviewer",plate: "VALUATION REVIEW", short: "VALUATION", group: 1,
    does: "checks against comparables",          costume: { judge: 1 } },
  { id: "gl",       name: "GL reconciler",     plate: "GL RECONCILER", short: "GL RECON",   group: 1,
    does: "reconciles the ledger, runs NAV",     costume: { glasses: 1 } },
  { id: "close",    name: "Month-end closer",  plate: "MONTH-END CLOSE", short: "MONTH-END", group: 1,
    does: "runs the close checklist",            costume: { shades: 1 } },
  { id: "audit",    name: "Statement auditor", plate: "STATEMENT AUDIT", short: "STATEMENT", group: 1,
    does: "reviews statements for consistency",  costume: { freshEyes: 1 } },
  { id: "kyc",      name: "KYC screener",      plate: "KYC SCREENER", short: "KYC",    group: 1,
    does: "assembles entity files",              costume: { wrapShades: 1 } },
];

/** the three the VO actually names, in the VO's order */
export const HERO_IDS = ["earnings", "market", "model"] as const;
export const heroAgent = (id: string) => AGENTS.find((a) => a.id === id)!;

/* ⛔⛔ EVERY CLAUDE IN THE REEL WEARS SOMETHING NOBODY ELSE WEARS. Keyed per
   SPRITE, not per scene — a scene can hold more than one Claude, and reel 102
   shipped two of them in the same glasses because the table was keyed by scene.
   11 sprites, 11 levers, zero repeats, and the job picks the costume where it
   can: the one reading what executives SAID is the detective, the one building
   the model wears the hard hat, the one handing the pack over is in the suit. */
export const SPRITE_COSTUME: Record<string, Record<string, number | string>> = {
  /* ⛔ freshEyes and glasses were the other way round. On frame 0 the sprite
     is 196px and eight of those pixels are eyes — a wide-eye lever is not a
     COSTUME at that size, and frame 0 is the one frame that must read. The
     reader gets the visible prop; the counting shot keeps the subtle one. */
  s0read:  { glasses: 1 },     // S0-A · first look at the announcement
  s0ten:   { freshEyes: 1 },   // S0-B · counting the plates
  s0model: { brainHat: 1 },    // S0-C · the model + the benchmark
  s0floor: { earpiece: 1 },    // S0-D · the floor, seven dark three lit
  roster:  { judge: 1 },       // S1  · picks the three out of the ten
  earnings:{ sherlock: 1 },    // S2/S3 · what was ACTUALLY said
  decide:  { bowtie: 1 },      // S4  · steps back, the call is yours
  market:  { capBack: 1 },     // S5/S6 · out on the wire
  model:   { hardHat: 1 },     // S7/S8 · builds it
  peak:    { hiVis: 1 },       // S9  · the whole floor running
  cta:     { suit: 1 },        // S10 · hands the pack over
};

/* =========================================================================
   THE RECEIPTS — every value verified 2026-08-13 against the GitHub API and
   Anthropic's own announcement. Nothing here is estimated or remembered.
   ⛔ `benchN` IS THE HONEST REPLACEMENT FOR THE VO'S "TRADING MODEL". There is
      no trading model; there IS a real model with a real, published finance
      credential, and this is it. Board §0 claim 1.
   ====================================================================== */
export const REPO = {
  owner: "anthropics", name: "financial-services", full: "anthropics/financial-services",
  stars: "34,211", starsN: 34211, licence: "APACHE-2.0", lang: "Python",
  agents: 10,
  post: "Agents for financial services",
  postKicker: "Announcements",
  postDate: "May 5, 2026",
  model: "CLAUDE OPUS 4.7",
  benchN: "64.37%",
  bench: "VALS AI FINANCE AGENT",
  install: "claude plugin marketplace add anthropics/financial-services",
  runs: ["CLAUDE COWORK", "CLAUDE CODE", "MANAGED AGENTS"],
} as const;

/** the real connectors Anthropic names on that page, for the source strip */
export const CONNECTORS = ["FACTSET", "S&P CAPITAL IQ", "MSCI", "PITCHBOOK",
  "MORNINGSTAR", "LSEG", "DALOOPA"];

/** what the Earnings reviewer pulls OUT of a call. ⛔ These are CATEGORIES an
    earnings read is organised by, never results for a real company — a made-up
    figure on a receipt-shaped object is the most believable kind of wrong. */
export const QUOTES: [string, string][] = [
  ["GUIDANCE", "RAISED FOR THE YEAR"],
  ["MARGIN", "MIX, NOT PRICE"],
  ["CAPEX", "PULLED FORWARD"],
  ["BUYBACK", "PACE UNCHANGED"],
];

/** what the Market researcher hands back, in the VO's own order and words */
export const WIRE: { t: string; c: string; n: number }[] = [
  { t: "ANNOUNCEMENTS", c: CLAY,  n: 5 },
  { t: "NEWS",          c: SKY,   n: 6 },
  { t: "RATINGS",       c: GOLD,  n: 4 },
];

/** the rows a valuation model is actually made of */
export const MODEL_ROWS = ["REVENUE", "EBITDA", "FREE CASH FLOW", "WACC", "TERMINAL"];

/** a plausible retail book — tickers only, no positions, no prices, no P&L */
export const BOOK = ["AAPL", "MSFT", "NVDA", "JPM", "KO", "TSM"];

/* =========================================================================
   THE PLACES — one per scene, each its own palette so every cut is a COLOUR
   change as well as a framing change ([[feedback_reel_vary_the_locations]]).

   ⛔⛔ HORIZONS ARE DERIVED FROM THE MEASURED STAGE. The panel is 1012x792; the
      root header pill owns y 0..112 and the slug owns y 730..792, so the
      working stage is **y 118..726** and a horizon belongs at 560..604.
   ⛔ DARKNESS IS FOR HIERARCHY, NOT MOOD, and this reel has NO villain, so it
      spends almost none. Every place is a warm painted interior at a real
      working level; the only dip is `wire` (a back room) and it still clears
      the frame-0 style bar comfortably.
   ====================================================================== */
export const PLACES: Record<string, Place> = {
  /* S0 · the desk the announcement is pinned above. Warm oak, one green lamp. */
  desk:  { back: "#7E6134", back2: "#4C3819", floor: "#B0824A", floor2: "#7C5628",
           lip: "#C89B5C", key: LAMPC, horizon: 596, grit: "#8E6A38" },
  /* ⛔⛔ FIVE OF FIFTEEN SCENES MEASURED UNDER 0.22 MEAN SATURATION and Alex's
     word for the result was "gray and dull and plain". The cause is that three
     of the eight places below were built as desaturated blue-GRAYS — `floor`
     at #66757F, `wire` at #59636E, `hold` at #5D6975 — and between them they
     carry S0-D, S0-E, S1, S4, S5 and S6.
     ⭐ THE FIX IS SATURATION, NOT BRIGHTNESS, AND IT IS NOT NEON. Every value
     below is still a solid matte paint with no glow and no wash; what changed
     is that each place now commits to a HUE (petrol, indigo, slate blue)
     instead of sitting on the gray axis between them. The house rule bans
     neon-on-black, not colour ([[feedback_reel_matte_palette]]), and the
     desaturated purple #6B5A8E is the approved one.
     measured after: floor 0.193 -> 0.36, wire 0.189 -> 0.38, hold 0.227 -> 0.35 */
  /* S0-D/S0-E/S1 · the floor, wide. A petrol-green research house at dawn. */
  floor: { back: "#2E6068", back2: "#17393F", floor: "#3C7B7E", floor2: "#215257",
           lip: "#4C9095", key: "#CFEDE4", horizon: 578, grit: "#2A666C" },
  /* S2/S3 · bay one. Tight, warm, a single lamp pool over paper. */
  bay1:  { back: "#7A5A32", back2: "#4A3316", floor: "#A6743C", floor2: "#754C24",
           lip: "#B98A48", key: GOLD, horizon: 600, grit: "#8A6230" },
  /* S4 · the decision. Hard top light, the cleanest frame in the reel. */
  hold:  { back: "#31567C", back2: "#1B3350", floor: "#3F6893", floor2: "#26466A",
           lip: "#4E7BAA", key: "#F6EBCE", horizon: 604, grit: "#2E5378" },
  /* S5/S6 · the wire room. Cooler and busier — a different room, not a re-light. */
  wire:  { back: "#54487A", back2: "#302956", floor: "#5F5289", floor2: "#3B3462",
           lip: "#6F60A0", key: "#DED3F2", horizon: 566, grit: "#4E4372" },
  /* S7/S8 · the modelling desk. Ledger green over cream paper. */
  grid:  { back: "#2F6247", back2: "#173B29", floor: "#4C8461", floor2: "#2C5A3C",
           lip: "#5D9A73", key: "#E6F3E0", horizon: 604, grit: "#2C5C43" },
  /* S9 · every lamp on. Brightest and warmest frame in the reel — the peak
     must beat the hook, and brightness is half of how it does that. */
  lit:   { back: "#EDE2C8", back2: "#C6B492", floor: "#A8895E", floor2: "#7A6240",
           lip: "#BE9E73", key: GOLD, horizon: 586, grit: "#B2936A" },
  /* S10 · the out tray, close and low. */
  cta:   { back: "#84603A", back2: "#4E361A", floor: "#B4834C", floor2: "#7C5628",
           lip: "#CCA366", key: BRASSL, horizon: 592, grit: "#946A3C" },
};

const WARM = ["desk", "bay1", "grid", "lit", "cta"];
const COLD = ["floor", "hold", "wire"];
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
   THE GREEN LAMP — this world's signature light, and the thing that makes it a
   research house rather than a trading floor. A brass stem, a green glass
   shade, and a warm pool under it.
   ⛔ The cone is a SHAPED gradient, never a full-frame tint.
   ====================================================================== */
export const DeskLamp: React.FC<{ x: number; y: number; on: number; s?: number; z?: number;
  f?: number; len?: number; spread?: number; pendant?: number }> =
  ({ x, y, on, s = 1, z = 40, f = 0, len = 210, spread = 250, pendant }) => {
  /* a ceiling'd idle: the filament breathes, never more than 0.05 opacity */
  const live = on > 0.04 ? 1 + Math.sin(f / 37 + x * 0.01) * 0.045 : 1;
  const glass = on > 0.04 ? LEDGL : dkh(LEDG, 0.22);
  return (<>
    {/* ⛔ A LAMP NEEDS SOMETHING TO STAND ON OR HANG FROM. A row of these on the
        peak's wall at y=124 rendered five table lamps with their bases in
        mid-air. `pendant` swaps the base and stem for a cord running up to the
        given ceiling y, which is the fixture a room like this actually has. */}
    {pendant !== undefined ? (
      <div style={{ position: "absolute", left: x - 2 * s, top: pendant, width: 4 * s,
        height: Math.max(0, y - pendant), background: BRASSD, zIndex: z }} />
    ) : (<>
      {/* the base */}
      <div style={{ position: "absolute", left: x - 26 * s, top: y + 96 * s, width: 52 * s,
        height: 9 * s, borderRadius: 4 * s, background: BRASSD, zIndex: z }} />
      {/* the stem */}
      <div style={{ position: "absolute", left: x - 3 * s, top: y + 26 * s, width: 6 * s,
        height: 72 * s, background: BRASS, zIndex: z }} />
    </>)}
    {/* the green glass shade, drawn as a real object so the silhouette names it */}
    <div style={{ position: "absolute", left: x - 56 * s, top: y, width: 112 * s, height: 34 * s,
      borderRadius: `${30 * s}px ${30 * s}px ${7 * s}px ${7 * s}px`,
      background: `linear-gradient(178deg, ${mxh(glass, 0.22)} 0%, ${glass} 58%, ${dkh(glass, 0.28)} 100%)`,
      zIndex: z + 1, boxShadow: SH }} />
    {/* the lit lip under the glass */}
    <div style={{ position: "absolute", left: x - 52 * s, top: y + 30 * s, width: 104 * s,
      height: 7 * s, borderRadius: `0 0 ${9 * s}px ${9 * s}px`,
      background: on > 0.04 ? LAMPC : "#5A5346",
      opacity: on > 0.04 ? (0.44 + on * 0.56) * live : 1, zIndex: z + 2 }} />
    {on > 0.04 && (
      <Beam x={x} y={y + 36 * s} top={92 * s} bot={spread * s} len={len * s} c={LAMPC}
        o={0.30 * on} z={z - 9} f={f} />
    )}
  </>);
};

/* =========================================================================
   THE DESK — an oak surface with a REAL top face in perspective, because a
   flat slab reads as a sheet of paper rather than a solid ([[apple-reel]]
   lesson 2). Every scene in this reel stands on one.
   ====================================================================== */
export const Desk: React.FC<{ y: number; z?: number; depth?: number; c?: string;
  x0?: number; x1?: number; felt?: boolean; drawers?: number }> =
  ({ y, z = 40, depth = 34, c = OAK, x0 = -70, x1 = W + 70, felt = true, drawers = 0 }) => (<>
    {/* the top face, lighter, receding */}
    <div style={{ position: "absolute", left: x0 + 30, right: W - x1 + 30, top: y - depth,
      height: depth, background: mxh(c, 0.18), zIndex: z,
      clipPath: "polygon(3% 0%, 97% 0%, 100% 100%, 0% 100%)" }} />
    {/* the blotter — the green felt that says DESK and not TABLE */}
    {felt && (
      <div style={{ position: "absolute", left: x0 + 118, right: W - x1 + 118, top: y - depth + 7,
        height: depth - 11, background: FELT, zIndex: z + 1, opacity: 0.9,
        clipPath: "polygon(2% 0%, 98% 0%, 100% 100%, 0% 100%)",
        borderTop: `2px solid ${mxh(FELT, 0.20)}` }} />
    )}
    {/* the front edge + its shadow line */}
    <div style={{ position: "absolute", left: x0, right: W - x1, top: y, height: 24,
      background: c, zIndex: z + 2, boxShadow: SH }} />
    <div style={{ position: "absolute", left: x0, right: W - x1, top: y + 24, height: 9,
      background: dkh(c, 0.30), zIndex: z + 2 }} />
    {/* the apron and its drawer pulls */}
    <div style={{ position: "absolute", left: x0, right: W - x1, top: y + 33, height: 170,
      background: dkh(c, 0.46), zIndex: z }} />
    {Array.from({ length: drawers }, (_, i) => (
      <React.Fragment key={"dw" + i}>
        <div style={{ position: "absolute", left: x0 + 74 + i * 268, top: y + 50, width: 218,
          height: 62, borderRadius: 4, background: dkh(c, 0.36), zIndex: z + 1,
          border: `2px solid ${dkh(c, 0.54)}` }} />
        <div style={{ position: "absolute", left: x0 + 152 + i * 268, top: y + 74, width: 62,
          height: 9, borderRadius: 5, background: BRASSD, zIndex: z + 2 }} />
      </React.Fragment>
    ))}
  </>);

/* =========================================================================
   THE BRASS NAMEPLATE — the single most repeated object in this reel, because
   it is how the roster is said. Ten of them in the wide, one big in each item
   scene. Etched brass on a holder, with a real engraved look (a light top bevel
   and a dark bottom one, no glow).
   ====================================================================== */
/* ⛔⛔ `w` IS THE TRUE RENDERED WIDTH. v1 set the outer box to `ww * s`, so the
   three item-title plates — authored as `w={520} s={1.9}` meaning "520px, big
   type" — rendered **988px wide** and ran off a 1012px panel at x=330. Three
   scenes shipped a clipped hero before a still caught it. `s` now scales TYPE
   AND PADDING ONLY, which is what every call site already assumed.
   ⛔ AND THE WIDTH IS ARITHMETIC: Inter-900 advances ~0.56em, so a 17-char name
   at `19*s` px needs `17 * 0.56 * 19 * s` inside `w - 20*s`. */
export const NamePlate: React.FC<{ x: number; y: number; t: string; w?: number; s?: number;
  z?: number; on?: number; rot?: number; sub?: string; holder?: boolean }> =
  ({ x, y, t, w: ww = 236, s = 1, z = 70, on = 1, rot = 0, sub, holder = true }) => {
  const face = on > 0.5 ? BRASS : dkh(BRASS, 0.42);
  const fg = on > 0.5 ? "#2B2110" : dkh("#2B2110", 0.0);
  return (
    <div style={{ position: "absolute", left: x, top: y, width: ww, zIndex: z,
      transform: `rotate(${rot}deg)`, transformOrigin: "50% 0%" }}>
      <div style={{ width: "100%", background:
        `linear-gradient(176deg, ${mxh(face, 0.30)} 0%, ${face} 46%, ${dkh(face, 0.26)} 100%)`,
        borderRadius: 4 * s, padding: `${9 * s}px ${10 * s}px`, boxShadow: SH,
        borderTop: `${2 * s}px solid ${mxh(face, 0.44)}`,
        borderBottom: `${3 * s}px solid ${dkh(face, 0.44)}` }}>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 19 * s,
          letterSpacing: "0.07em", color: fg, textAlign: "center", lineHeight: 1,
          opacity: on > 0.5 ? 1 : 0.5, whiteSpace: "nowrap", overflow: "hidden",
          textOverflow: "ellipsis" }}>{t}</div>
        {sub && (
          <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 11.5 * s,
            letterSpacing: "0.10em", color: fg, opacity: on > 0.5 ? 0.62 : 0.3,
            textAlign: "center", marginTop: 3 * s, whiteSpace: "nowrap",
            overflow: "hidden", textOverflow: "ellipsis" }}>{sub}</div>
        )}
      </div>
      {/* the holder it sits in — two feet, so it is an object on a rail */}
      {holder && (<>
        <div style={{ position: "absolute", left: "8%", top: "100%", width: "12%",
          height: 9 * s, background: BRASSD, borderRadius: `0 0 ${3 * s}px ${3 * s}px` }} />
        <div style={{ position: "absolute", right: "8%", top: "100%", width: "12%",
          height: 9 * s, background: BRASSD, borderRadius: `0 0 ${3 * s}px ${3 * s}px` }} />
      </>)}
    </div>
  );
};

/* =========================================================================
   THE CLOCK — the pressure object. ⛔ IT IS FURNITURE, NOT A CHARACTER: this
   reel has no villain by design (the measured finding in
   [[feedback_outlier_lift_is_within_creator_only]] is that every breakout has
   none), so the clock never wins a scene, never gets a close-up of its own, and
   never moves faster than one minute per scene.
   ====================================================================== */
export const WallClock: React.FC<{ x: number; y: number; s?: number; z?: number; mins: number }> =
  ({ x, y, s = 1, z = 24, mins }) => {
  /* 9:24 -> hands derived, not drawn by eye */
  const hr = ((9 + mins / 60) % 12) * 30 - 90;
  const mn = (mins % 60) * 6 - 90;
  const R = 46 * s;
  return (
    <div style={{ position: "absolute", left: x - R, top: y - R, width: R * 2, height: R * 2,
      zIndex: z }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: BRASSD,
        boxShadow: SH }} />
      <div style={{ position: "absolute", inset: 5 * s, borderRadius: "50%", background: CARDL,
        border: `${2 * s}px solid ${BRASS}` }} />
      {Array.from({ length: 12 }, (_, i) => (
        <div key={"tk" + i} style={{ position: "absolute", left: R - 1.5 * s, top: 9 * s,
          width: 3 * s, height: i % 3 === 0 ? 9 * s : 5 * s, background: "#3A3228",
          transformOrigin: `${1.5 * s}px ${R - 9 * s}px`, transform: `rotate(${i * 30}deg)` }} />
      ))}
      <div style={{ position: "absolute", left: R, top: R - 2 * s, width: R * 0.5, height: 4 * s,
        background: "#2B2620", transformOrigin: "0% 50%", transform: `rotate(${hr}deg)`,
        borderRadius: 2 * s }} />
      <div style={{ position: "absolute", left: R, top: R - 1.5 * s, width: R * 0.72, height: 3 * s,
        background: "#2B2620", transformOrigin: "0% 50%", transform: `rotate(${mn}deg)`,
        borderRadius: 2 * s }} />
      <div style={{ position: "absolute", left: R - 4 * s, top: R - 4 * s, width: 8 * s,
        height: 8 * s, borderRadius: "50%", background: CLAY }} />
    </div>
  );
};

/* =========================================================================
   THE ANTHROPIC WORDMARK — set as the real page sets it. The `\` in `ANTHROP\C`
   is the mark's own glyph substitution and it is what makes the wordmark
   recognisable at a glance, so it is drawn rather than typed.
   ====================================================================== */
export const AnthropicWordmark: React.FC<{ x: number; y: number; s?: number; z?: number;
  c?: string }> = ({ x, y, s = 1, z = 80, c = APX_INK }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z, display: "flex",
    alignItems: "baseline", fontFamily: inter.fontFamily, fontWeight: 800,
    fontSize: 26 * s, letterSpacing: "0.015em", color: c, lineHeight: 1 }}>
    <span>ANTHROP</span>
    {/* ⛔ THE GLYPH IS A BACKSLASH AND IT HAS TO BE TIGHT. v1 leaned it the
        other way and gave it 1px of margin on each side, and at panel scale it
        read as `ANTHROP / C` — the one string on frame 0 whose whole job is
        instant brand recognition, saying something else. Leans right, and the
        negative margins close the gap the flex row opens. */}
    <span style={{ display: "inline-block", width: 9 * s, height: 20 * s,
      position: "relative", margin: `0 ${-0.5 * s}px 0 ${1 * s}px` }}>
      <span style={{ position: "absolute", left: 2.4 * s, top: 0, width: 3.4 * s, height: 20 * s,
        background: c, transform: "skewX(15deg)" }} />
    </span>
    <span>C</span>
  </div>
);

/** the real hero illustration from the post, straight off Anthropic's CDN.
    ⭐ It is an SVG, so it is crisp at panel scale — an 800px screengrab of the
    same page would be soft the moment it filled more than a third of the frame. */
export const PostHero: React.FC<{ x: number; y: number; w: number; h: number; z?: number;
  r?: number }> = ({ x, y, w: ww, h: hh, z = 60, r = 24 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, zIndex: z,
    background: APX_CLAY, borderRadius: r, overflow: "hidden", display: "flex",
    alignItems: "center", justifyContent: "center" }}>
    <Img src={staticFile("trade/anthropic_finance_hero.svg")}
      style={{ width: Math.min(ww, hh) * 1.42, height: Math.min(ww, hh) * 1.42,
        objectFit: "contain" }} />
  </div>
);
