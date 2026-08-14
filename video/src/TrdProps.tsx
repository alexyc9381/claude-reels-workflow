import React from "react";
import { Img, staticFile } from "remotion";
import { inter, fraunces } from "./fonts";
import { MONO } from "./SlopKit";
/* ⛔ NOT SlopKit's Mascot. That copy carries `glasses` plus a handful of
   costumes; ClaudeOsReel's carries seventeen independent levers and is a pure
   component with no module side effects, so it imports cleanly. This reel needs
   eleven distinct costumes plus ten more on the desks. */
import { Mascot } from "./ClaudeOsReel";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, mxh, dkh, SH, SH_D, rnd,
  CLAY, GOLD, GREEN, RED, SKY, PAPER, INK, MUTE,
  OAK, OAKD, OAKL, BRASS, BRASSD, BRASSL, CARD, CARDD, CARDL,
  LEDG, LEDGL, LEDGD, STEEL, STEELD, FELT, LAMPC,
  APX_BG, APX_INK, APX_CLAY,
  AGENTS, REPO, CONNECTORS, QUOTES, WIRE, MODEL_ROWS, BOOK,
  AnthropicWordmark, PostHero, NamePlate, Contact, Mark,
} from "./TrdWorld";
import { Candles, PriceLine, Spark, Dir, TickerBoard, Allocation, ChartCard, series } from "./TrdCharts";
import { Costume } from "./TrdCostumes";

/* ===========================================================================
   REEL 103 "TRADE" · THE PROPS.  Board: storyboards/103-trade.md.

   ⛔ EVERY STRING IN THIS FILE IS A REAL ONE. Agent names and descriptions are
      Anthropic's own from the May 5 2026 post; the star count and licence come
      from the GitHub API; the connector list is the one the post prints. Where
      a prop needs content that no source supplies (what a specific company
      said on a specific call), it carries a CATEGORY instead of a made-up
      figure — a fabricated number on a receipt-shaped object is the most
      believable kind of wrong.

   ⛔ NO `0 0 Npx <colour>` ANYWHERE and no stacked alpha washes. Depth is dark
      drop-shadow + inset highlight; a tint is `mxh()` toward paper, emitted as
      a solid value.
   ========================================================================= */

/** a specular sweep, clipped to its parent — the house polish pass */
export const Sheen: React.FC<{ f: number; at: number; n?: number; z?: number; o?: number }> =
  ({ f, at, n = 26, z = 9, o = 0.30 }) => {
  if (f < at || f > at + n) return null;
  const p = (f - at) / n;
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: z, overflow: "hidden",
      pointerEvents: "none", borderRadius: "inherit" }}>
      <div style={{ position: "absolute", top: "-30%", bottom: "-30%", width: "34%",
        left: `${-40 + p * 150}%`, transform: "skewX(-18deg)",
        background: `linear-gradient(90deg, ${hexa("#FFFFFF", 0)} 0%, ${hexa("#FFFFFF", o)} 50%, ${hexa("#FFFFFF", 0)} 100%)` }} />
    </div>
  );
};

/** ⛔ NOTHING LANDS AND STOPS ([[feedback_scene_needs_an_arc]]). A damped
    oscillation that never quite settles — the cheapest fix for a dead shot. */
export const rock = (lf: number, at: number, amp = 5.5, k = 26) =>
  lf < at ? 0 : Math.sin((lf - at) / 3.1) * amp * Math.exp(-(lf - at) / k);

/** the ceiling'd component idle. ⛔ 1.15deg/1.7px measured as "never static"
    and READ as static; 2.6deg/4.6px with a second slower harmonic is the
    amplitude that actually registers ([[seo-reel]] lesson 5). */
export const sway = (f: number, seed: number, amp = 1) => ({
  r: (Math.sin(f / 41 + seed * 2.3) * 2.6 + Math.sin(f / 97 + seed) * 0.9) * amp,
  y: (Math.sin(f / 37 + seed * 1.7) * 4.6 + Math.sin(f / 89 + seed * 3) * 1.6) * amp,
});

/* =========================================================================
   THE ANNOUNCEMENT — Alex's direct instruction for this reel: *"for the
   beginning scene, use a real image of the anthropic article announcement for
   that finance agents thing."*

   ⛔⛔ AND IT IS BUILT FROM ANTHROPIC'S OWN ASSETS, NOT A SCREENGRAB. The
      browser pane returns an 800px-wide capture; this sheet fills ~600px of a
      1012px panel and then gets pushed into, so a screengrab would be visibly
      soft on the one frame that is guaranteed to be seen. Instead: the real
      1000x1000 hero SVG off Anthropic's CDN (vector, crisp at any scale), the
      real wordmark, the real kicker / headline / date, and the page's REAL
      computed tokens read with getComputedStyle on 2026-08-13 —
      bg #FAF9F5, ink #141413, hero #D97757 at 24px radius.
   ⛔ IT IS STAGED AS A PHYSICAL SHEET, not a floating rectangle. Alex's
      standing note across reels 68/85/86 is "object scenes not UI"; the
      instruction overrides the general rule for frame 0, and the mitigation is
      that this is a pinned sheet on a board in a room, with a pin, a curl and a
      cast shadow, that a Claude is standing at and reading.
   ====================================================================== */
export const AnnouncementSheet: React.FC<{ x: number; y: number; w: number; z?: number;
  f?: number; pin?: boolean }> = ({ x, y, w: ww, z = 60, f = 0, pin = true }) => {
  /* ⛔ AUTHORED AT 620 x 420, NOT 620 x 452. The first cut was taller, and to
     keep its bottom edge clear of the desk the sheet could only be 590 wide —
     which measured a **18.04%** claim plate against an 18% bar and a **139.5**
     frame-0 luma against a 140 bar. Both gates were passing by less than their
     own noise. Trimming the body block to two lines buys 32px of height, which
     buys 58px of WIDTH at the same footprint, which is what actually moves both
     numbers. ⭐ Sizing a hero is a gate change, not a layout change. */
  const u = ww / 620;                      /* everything below is authored at 620 wide */
  const hh = 420 * u;
  const sw = sway(f, 3, 0.32);
  return (
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, zIndex: z,
      transform: `rotate(${-0.5 + sw.r * 0.14}deg)`, transformOrigin: "50% 0%" }}>
      {/* the sheet */}
      <div style={{ position: "absolute", inset: 0, background: APX_BG, borderRadius: 6 * u,
        boxShadow: SH_D, overflow: "hidden" }}>
        {/* ⛔ THE NAV ROW IS GONE. `Research · Policy · News · Try Claude` was
            four strings of site chrome on the single most-seen frame of the
            reel, carrying no information about the announcement at all. The
            wordmark alone is what makes the page recognisable. */}
        <AnthropicWordmark x={26 * u} y={20 * u} s={u * 1.14} z={4} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 56 * u, height: 1,
          background: "#E9E6DE", zIndex: 3 }} />

        {/* the real kicker / headline / date */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 74 * u, textAlign: "center",
          fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 14 * u, color: APX_INK,
          zIndex: 4 }}>{REPO.postKicker}</div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 98 * u, textAlign: "center",
          fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 44 * u, lineHeight: 1.05,
          letterSpacing: "-0.028em", color: APX_INK, zIndex: 4 }}>{REPO.post}</div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 158 * u, textAlign: "center",
          fontFamily: inter.fontFamily, fontWeight: 500, fontSize: 15 * u, color: APX_INK,
          opacity: 0.72, zIndex: 4 }}>{REPO.postDate}</div>

        {/* the real hero art */}
        <PostHero x={82 * u} y={188 * u} w={456 * u} h={166 * u} z={5} r={14 * u} />

        {/* ⛔ AND THE BODY SENTENCE IS GONE TOO. It read "we're releasing ten
            ready-to-run agent templates", which is word-for-word what the header
            pill above it already says — the reel's one literal channel, printed
            twice on the same frame. */}
        <Sheen f={f} at={14} n={30} z={20} o={0.24} />
      </div>
      {/* the pin and the curl — what makes it a sheet on a board */}
      {pin && (<>
        <div style={{ position: "absolute", left: ww / 2 - 11 * u, top: -9 * u, width: 22 * u,
          height: 22 * u, borderRadius: "50%", background: CLAY, zIndex: 8, boxShadow: SH,
          border: `${3 * u}px solid ${dkh(CLAY, 0.30)}` }} />
        <div style={{ position: "absolute", right: -2 * u, bottom: -2 * u, width: 44 * u,
          height: 44 * u, background: dkh(APX_BG, 0.14), zIndex: 9,
          clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }} />
      </>)}
    </div>
  );
};

/* =========================================================================
   DESK DRESSING — ⭐ THE LAYERS, NOT MORE IDEAS. [[feedback_hook_simplicity]]:
   *"do not strip the world out ... the thing to reduce is IDEAS, not LAYERS."*
   The hook's first cut was one sheet, one desk, one Claude and two empty drawer
   fronts — about eight objects, which [[feedback_graphical_over_textual]] calls
   "reads as a diagram" against the 12-18 an approved scene carries.

   Every item below is something that is ACTUALLY on an analyst's desk at 6am,
   so the density costs no new idea: a filings stack, an in-tray, a mug, a pen
   cup, a phone. ⛔ All of it is FURNITURE — it sits below the hero in size and
   in contrast and it never moves faster than the sway.
   ====================================================================== */
export const DeskDressing: React.FC<{ y: number; f: number; z?: number; s?: number;
  side?: "l" | "r"; o?: number }> = ({ y, f, z = 52, s = 1, side = "r", o = 1 }) => {
  const L = side === "l";
  const X = (v: number) => (L ? v : W - v - 200 * s);
  const sw = sway(f, 4, 0.3);
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: z, opacity: o }}>
      {/* the stack of filings, thumbed and leaning */}
      {[0, 1, 2, 3, 4].map((i) => (
        <div key={"fs" + i} style={{ position: "absolute", left: X(6) + i * 1.6 * s,
          top: y - (16 + i * 11) * s, width: 128 * s, height: 12 * s,
          background: i % 2 ? CARD : CARDL, borderRadius: 2 * s,
          transform: `rotate(${(i % 2 ? 1 : -1) * 0.9}deg)`, boxShadow: i === 4 ? SH : undefined }} />
      ))}
      <div style={{ position: "absolute", left: X(22), top: y - 74 * s, width: 44 * s,
        height: 16 * s, background: CLAY, borderRadius: 2 * s,
        transform: `rotate(-1.4deg)` }} />
      {/* the in-tray */}
      <div style={{ position: "absolute", left: X(150), top: y - 26 * s, width: 132 * s,
        height: 24 * s, background: STEELD, borderRadius: `${3 * s}px ${3 * s}px ${7 * s}px ${7 * s}px`,
        clipPath: "polygon(0 0, 100% 0, 94% 100%, 6% 100%)", boxShadow: SH }} />
      {[0, 1].map((i) => (
        <div key={"it" + i} style={{ position: "absolute", left: X(156) + i * 2 * s,
          top: y - (34 + i * 8) * s, width: 120 * s, height: 9 * s, background: CARDL,
          borderRadius: 2 * s }} />
      ))}
      {/* the mug, with a wisp */}
      <div style={{ position: "absolute", left: X(304), top: y - 46 * s, width: 40 * s,
        height: 44 * s, background: CARDL, borderRadius: `${4 * s}px ${4 * s}px ${9 * s}px ${9 * s}px`,
        boxShadow: SH, borderBottom: `${3 * s}px solid ${CARDD}` }} />
      <div style={{ position: "absolute", left: X(338), top: y - 36 * s, width: 17 * s,
        height: 19 * s, borderRadius: "50%", border: `${5 * s}px solid ${CARDL}` }} />
      <div style={{ position: "absolute", left: X(320) + sw.r * 1.2, top: y - 74 * s,
        width: 3 * s, height: 24 * s, borderRadius: 2 * s, background: "#CFC6B4",
        opacity: 0.30 }} />
      {/* the pen cup */}
      <div style={{ position: "absolute", left: X(366), top: y - 40 * s, width: 30 * s,
        height: 38 * s, background: BRASSD, borderRadius: `${3 * s}px ${3 * s}px ${5 * s}px ${5 * s}px`,
        boxShadow: SH }} />
      {[0, 1, 2].map((i) => (
        <div key={"pn" + i} style={{ position: "absolute", left: X(372) + i * 8 * s,
          top: y - (62 + (i % 2) * 7) * s, width: 4 * s, height: (26 + (i % 2) * 7) * s,
          background: [INK, CLAY, SKY][i], borderRadius: 2 * s,
          transform: `rotate(${(i - 1) * 7}deg)` }} />
      ))}
    </div>
  );
};

/* =========================================================================
   AGENT SPRITE — ⛔⛔ TEN AGENTS SAID WITH ZERO WORDS. Alex: *"the first few
   animations from 0-5 seconds have wayyyy too much text, use claude sprites
   that represent each of those, don't have text in the animations."* Counted,
   the hook was carrying **31 strings**: nine on the announcement, ten on the
   plate rail, ten more on the ten stations, and two on the count.

   ⭐ THE COSTUME IS THE LABEL. `AGENTS[i].costume` was already derived from what
   each agent DOES — the earnings reviewer is the detective, the model builder
   wears the hard hat, the KYC screener is in wrap shades — so the roster was
   always legible without a single nameplate. The plates were belt-and-braces on
   the one stretch of the reel that cannot afford reading.
   ⛔ The full names still exist where they can actually be read: the header
   pill, the item scenes at plate scale, and the lead-magnet page.
   ====================================================================== */
export const AgentSprite: React.FC<{ x: number; y: number; i: number; f: number; s?: number;
  z?: number; on?: number; podium?: boolean }> =
  ({ x, y, i, f, s = 1, z = 60, on = 1, podium = true }) => {
  const a = AGENTS[i % AGENTS.length];
  const sw = sway(f, i * 2.3, on > 0.5 ? 1 : 0.35);
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
      {podium && (<>
        <div style={{ position: "absolute", left: 2 * s, top: 96 * s, width: 116 * s,
          height: 15 * s, borderRadius: 4 * s, boxShadow: SH,
          background: on > 0.5 ? BRASS : dkh(BRASS, 0.44) }} />
        <div style={{ position: "absolute", left: 10 * s, top: 111 * s, width: 100 * s,
          height: 10 * s, borderRadius: `0 0 ${4 * s}px ${4 * s}px`,
          background: on > 0.5 ? BRASSD : dkh(BRASS, 0.58) }} />
      </>)}
      {/* ⛔⛔ THE COSTUME IS A SILHOUETTE, NOT A LEVER. The Mascot's built-in
          costume props draw 8-14 units in a 200-unit viewBox — four to seven
          pixels at this size — so ten "different" agents were ten identical
          sprites. `Costume` gives each one a garment behind, a hat over the top
          and a held prop beside it, and it is the OUTLINE that changes. */}
      <div style={{ position: "absolute", left: 8 * s, top: 0, width: 104 * s, height: 104 * s,
        opacity: 0.30 + on * 0.70,
        transform: `translateY(${sw.y * 0.5}px) rotate(${sw.r * 0.30}deg)` }}>
        <Costume size={104 * s} id={a.id} f={f + i * 19} layer="back" />
        <Mascot lf={f + i * 19} size={104 * s} gaze={0.4 - (i % 3) * 0.4}
          nodAmp={on > 0.5 ? 3.0 : 0.8} nodSpeed={11 + (i % 5)} {...(a.costume as any)} />
        <Costume size={104 * s} id={a.id} f={f + i * 19} layer="front"
          side={i % 2 ? "l" : "r"} />
      </div>
      <Contact x={16 * s} y={100 * s} w={88 * s} z={-1} o={0.30 * on} />
    </div>
  );
};

/* =========================================================================
   THE PLATE RAIL — the ten agents, as ten brass plates on a rail. This is the
   roster prop, and it appears in S0-B, S0-D, S1 and S9, so it is the highest
   scene-count object in the reel: ⭐ fixing it upgrades four scenes at once
   ([[seo-reel]] round 2).
   ====================================================================== */
export const PlateRail: React.FC<{ x: number; y: number; w: number; f: number; z?: number;
  on?: (i: number) => number; drop?: (i: number) => number; s?: number; rail?: boolean }> =
  ({ x, y, w: ww, f, z = 60, on, drop, s = 1, rail = true }) => {
  const COLS = 5, GAP = 12 * s;
  const cw = (ww - GAP * (COLS - 1)) / COLS;
  return (<>
    {rail && [0, 1].map((r) => (
      <div key={"rl" + r} style={{ position: "absolute", left: x - 14 * s, top: y + 62 * s + r * 104 * s,
        width: ww + 28 * s, height: 9 * s, background: dkh(BRASS, 0.42), zIndex: z - 1,
        borderRadius: 3 * s, boxShadow: SH }} />
    ))}
    {AGENTS.map((a, i) => {
      const r = Math.floor(i / COLS), c = i % COLS;
      const d = drop ? drop(i) : 1;
      const lit = on ? on(i) : 1;
      const sw = sway(f, i * 1.7, 0.34 * lit);
      return (
        <div key={a.id} style={{ position: "absolute",
          left: x + c * (cw + GAP), top: y + r * 104 * s,
          width: cw, zIndex: z, opacity: d,
          transform: `translateY(${(1 - d) * -70 * s + sw.y * 0.5}px) rotate(${sw.r * 0.22}deg)` }}>
          <NamePlate x={0} y={0} t={a.short} w={cw} s={s} z={2} on={lit} holder={false} />
        </div>
      );
    })}
  </>);
};

/* =========================================================================
   A DESK UNIT — one agent's station: the desk face, its lamp, its nameplate and
   its own costumed Claude. Ten of these is the floor.
   ====================================================================== */
export const Station: React.FC<{ x: number; y: number; i: number; f: number; on: number;
  s?: number; z?: number; work?: number; named?: boolean }> =
  ({ x, y, i, f, on, s = 1, z = 50, work = 0, named = true }) => {
  const a = AGENTS[i % AGENTS.length];
  const sw = sway(f, i * 2.1, on > 0.5 ? 1 : 0.3);
  const paper = 0.25 + on * 0.75;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
      {/* the carrel back */}
      <div style={{ position: "absolute", left: -6 * s, top: -6 * s, width: 176 * s,
        height: 128 * s, background: on > 0.5 ? mxh(OAK, 0.06) : dkh(OAK, 0.40),
        borderRadius: 6 * s, zIndex: 1, boxShadow: SH,
        borderBottom: `${5 * s}px solid ${dkh(OAK, 0.42)}` }} />
      {/* ⛔⛔ THE WORK PRODUCT, NOT A BLANK SHEET. v1 drew three 86x34 cream
          rectangles per station; at ten stations that is thirty featureless
          white blobs, they were the largest thing in every cell, they covered
          the sprites, and they said nothing. A note has a HEAD RULE and BODY
          LINES — the same amount of ink, carrying the information that this is
          finished analyst output. */}
      {[0, 1, 2].map((k) => (
        <div key={"pp" + k} style={{ position: "absolute",
          left: (10 + k * 4) * s, top: (74 - k * 7 - work * k * 6) * s,
          width: 74 * s, height: 30 * s, background: k === 0 ? CARDL : CARD,
          opacity: paper, borderRadius: 2 * s, zIndex: 3 + k, overflow: "hidden",
          boxShadow: k === 0 ? SH : undefined,
          transform: `rotate(${(k - 1) * 1.7 + sw.r * 0.14}deg)` }}>
          {/* ⛔ THE TOP SHEET IS A CHART, NOT RULED LINES. This prop renders in
              four scenes and ten times in three of them, so it is the single
              highest-leverage place to put the subject's own language — forty
              little price charts across the reel instead of forty blank memos. */}
          <div style={{ position: "absolute", left: 5 * s, top: 5 * s, width: 30 * s,
            height: 4 * s, background: k === 0 ? CLAY : "#A79E8E", borderRadius: 2 * s }} />
          {k === 0 ? (
            <Spark x={5 * s} y={12 * s} w={62 * s} h={14 * s} seed={i * 3 + 1}
              up={i % 3 !== 1} z={2} />
          ) : (
            [0, 1].map((r) => (
              <div key={"pl" + r} style={{ position: "absolute", left: 5 * s,
                top: (14 + r * 6) * s, width: (58 - r * 16) * s, height: 2.4 * s,
                background: "#B7AE9D", borderRadius: 2 * s }} />
            ))
          )}
        </div>
      ))}
      {/* its Claude */}
      <div style={{ position: "absolute", left: 90 * s, top: 8 * s, zIndex: 6,
        width: 78 * s, height: 78 * s, opacity: 0.35 + on * 0.65,
        transform: `translateY(${sw.y * 0.4}px) rotate(${sw.r * 0.24}deg)` }}>
        <Costume size={78 * s} id={a.id} f={f + i * 17} layer="back" />
        <Mascot lf={f + i * 17} size={78 * s} gaze={0.42} nodAmp={on > 0.5 ? 2.4 : 0.7}
          nodSpeed={12 + (i % 4)} {...(a.costume as any)} />
        <Costume size={78 * s} id={a.id} f={f + i * 17} layer="front" side="l" />
      </div>
      {/* its nameplate */}
      {/* ⛔ OFF IN THE HOOK. Ten of these inside the first five seconds is ten
          strings nobody has time to read; the costume already says which desk
          this is ([[feedback_graphical_over_textual]]). */}
      {named && <NamePlate x={-6 * s} y={122 * s} t={a.short} w={176 * s} s={0.78 * s} z={8} on={on} />}
    </div>
  );
};

/* =========================================================================
   THE TRANSCRIPT — an earnings call, bound. Real object: a cover, a comb, a
   thumbed block of pages, a tab. What goes IN.
   ====================================================================== */
export const Transcript: React.FC<{ x: number; y: number; s?: number; z?: number; f?: number;
  open?: number }> = ({ x, y, s = 1, z = 60, f = 0, open = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
    {/* the page block behind the cover */}
    {[0, 1, 2, 3].map((k) => (
      <div key={"tb" + k} style={{ position: "absolute", left: (5 + k * 2.4) * s,
        top: (4 + k * 2.4) * s, width: 218 * s, height: 286 * s, background: CARDD,
        borderRadius: 3 * s, zIndex: 1 + k }} />
    ))}
    {/* the cover */}
    <div style={{ position: "absolute", left: 0, top: 0, width: 218 * s, height: 286 * s,
      background: `linear-gradient(168deg, ${mxh(CARDL, 0.24)} 0%, ${CARD} 62%, ${CARDD} 100%)`,
      borderRadius: 3 * s, zIndex: 8, boxShadow: SH_D, overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 34 * s,
        background: INK }} />
      <div style={{ position: "absolute", left: 14 * s, top: 9 * s, fontFamily: MONO,
        fontWeight: 800, fontSize: 12 * s, letterSpacing: "0.16em", color: CARDL }}>
        EARNINGS CALL
      </div>
      <div style={{ position: "absolute", left: 14 * s, top: 52 * s, right: 14 * s,
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 21 * s, lineHeight: 1.08,
        letterSpacing: "-0.015em", color: "#2B2620" }}>
        Q3<br />TRANSCRIPT
      </div>
      {/* thumbed body lines */}
      {Array.from({ length: 11 }, (_, k) => (
        <div key={"tl" + k} style={{ position: "absolute", left: 14 * s, top: (116 + k * 14) * s,
          width: (168 - (k % 4) * 26) * s, height: 5 * s, borderRadius: 3 * s,
          background: "#B9B0A0", opacity: 0.72 }} />
      ))}
      <Spark x={14 * s} y={252 * s} w={150 * s} h={22 * s} seed={9} up z={3} />
    </div>
    {/* the comb binding */}
    {Array.from({ length: 9 }, (_, k) => (
      <div key={"cb" + k} style={{ position: "absolute", left: -5 * s, top: (16 + k * 30) * s,
        width: 16 * s, height: 13 * s, borderRadius: 7 * s, background: STEELD, zIndex: 10 }} />
    ))}
    {/* the tab */}
    <div style={{ position: "absolute", right: -13 * s, top: 62 * s, width: 26 * s,
      height: 44 * s, borderRadius: `0 ${4 * s}px ${4 * s}px 0`, background: CLAY, zIndex: 7 }} />
  </div>
);

/* =========================================================================
   A PULLED QUOTE — what the Earnings reviewer takes OUT. ⛔ It carries a
   CATEGORY and a direction ("GUIDANCE / RAISED FOR THE YEAR"), never a figure
   for a real company: the tool reads what was said, and the reel is not
   entitled to invent what that was.
   ====================================================================== */
export const QuoteCard: React.FC<{ x: number; y: number; k: number; s?: number; z?: number;
  p: number; f?: number }> = ({ x, y, k, s = 1, z = 70, p, f = 0 }) => {
  const [tag, body] = QUOTES[k % QUOTES.length];
  const sw = sway(f, k * 3.1, 0.4);
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 246 * s, zIndex: z,
      opacity: p, transform: `translateX(${(1 - p) * -268 * s}px) rotate(${(k % 2 ? 1 : -1) * 1.1 + sw.r * 0.2}deg)` }}>
      <div style={{ background: CARDL, borderRadius: 5 * s, boxShadow: SH,
        borderLeft: `${7 * s}px solid ${CLAY}`, padding: `${9 * s}px ${11 * s}px`, overflow: "hidden",
        position: "relative" }}>
        <div style={{ fontFamily: MONO, fontWeight: 800, fontSize: 11.5 * s,
          letterSpacing: "0.16em", color: dkh(CLAY, 0.16) }}>{tag}</div>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 17 * s,
          letterSpacing: "-0.01em", color: "#2B2620", marginTop: 3 * s,
          whiteSpace: "nowrap" }}>{body}</div>
        <Sheen f={f} at={0} n={22} z={4} o={0.26} />
      </div>
    </div>
  );
};

/* =========================================================================
   THE PADDLE — the two-sided auction paddle the VIEWER turns.
   ⛔⛔ THIS PROP EXISTS TO KEEP THE REEL HONEST. The repo's own README: the
      agents *"do not make investment recommendations."* The VO says *"so YOU
      can decide"* — so the paddle is on the desk, the hand on it is not
      Claude's, and Claude has stepped back before it turns.
   ====================================================================== */
export const Paddle: React.FC<{ x: number; y: number; s?: number; z?: number; turn: number;
  f?: number }> = ({ x, y, s = 1, z = 74, turn, f = 0 }) => {
  const rotY = turn * 180;
  const front = rotY < 90;
  const sw = sway(f, 6, 0.5);
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z,
      transform: `rotate(${-3 + sw.r * 0.3}deg)`, transformOrigin: "50% 100%" }}>
      {/* the handle */}
      <div style={{ position: "absolute", left: 62 * s, top: 128 * s, width: 18 * s,
        height: 92 * s, borderRadius: 9 * s, background: OAKD, zIndex: 1, boxShadow: SH }} />
      {/* the blade, flipping */}
      <div style={{ position: "absolute", left: 0, top: 0, width: 142 * s, height: 138 * s,
        zIndex: 3, transformStyle: "preserve-3d",
        transform: `perspective(680px) rotateY(${rotY}deg)` }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: 9 * s,
          background: front ? CARDL : GREEN, boxShadow: SH_D,
          border: `${4 * s}px solid ${front ? CARDD : dkh(GREEN, 0.24)}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          transform: front ? undefined : "rotateY(180deg)" }}>
          <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 40 * s,
            letterSpacing: "-0.02em", color: front ? "#9A9184" : "#0E2A1E" }}>
            {front ? "?" : "HOLD"}
          </span>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   THE WIRE — the tape machine and its running tape. The background process
   that stops the wire scenes being one gesture in an empty shot.
   ⛔ It carries TICKERS ONLY. No prices, no arrows, no percentages: a running
      price tape would be a market claim this reel has no source for.
   ====================================================================== */
export const TapeMachine: React.FC<{ x: number; y: number; s?: number; z?: number; f: number }> =
  ({ x, y, s = 1, z = 56, f }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
    {/* the dome */}
    <div style={{ position: "absolute", left: 0, top: 0, width: 122 * s, height: 74 * s,
      borderRadius: `${58 * s}px ${58 * s}px ${8 * s}px ${8 * s}px`,
      background: `linear-gradient(170deg, ${mxh(STEEL, 0.26)} 0%, ${STEEL} 54%, ${STEELD} 100%)`,
      boxShadow: SH, zIndex: 2 }} />
    <div style={{ position: "absolute", left: 20 * s, top: 16 * s, width: 82 * s, height: 44 * s,
      borderRadius: `${40 * s}px ${40 * s}px ${5 * s}px ${5 * s}px`, background: dkh(STEELD, 0.30),
      zIndex: 3 }} />
    {/* the reel inside, turning */}
    <div style={{ position: "absolute", left: 44 * s, top: 28 * s, width: 34 * s, height: 34 * s,
      borderRadius: "50%", background: CARDL, zIndex: 4,
      transform: `rotate(${f * 3.4}deg)`, border: `${4 * s}px solid ${CARDD}` }}>
      <div style={{ position: "absolute", left: "46%", top: 2, width: 3 * s, height: "44%",
        background: CARDD }} />
    </div>
    {/* the base */}
    <div style={{ position: "absolute", left: -10 * s, top: 70 * s, width: 142 * s,
      height: 16 * s, borderRadius: 4 * s, background: STEELD, zIndex: 2, boxShadow: SH }} />
  </div>
);

export const Tape: React.FC<{ x: number; y: number; w: number; s?: number; z?: number; f: number;
  o?: number }> = ({ x, y, w: ww, s = 1, z = 54, f, o = 1 }) => {
  const step = 118 * s;
  const n = Math.ceil(ww / step) + 2;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: 34 * s, zIndex: z,
      background: CARDL, overflow: "hidden", boxShadow: SH, opacity: o,
      borderTop: `${2 * s}px solid ${CARDD}`, borderBottom: `${2 * s}px solid ${CARDD}` }}>
      {Array.from({ length: n }, (_, i) => {
        const px = ((i * step - f * 2.6 * s) % (n * step) + n * step) % (n * step) - step;
        return (
          <div key={"tp" + i} style={{ position: "absolute", left: px, top: 7 * s,
            fontFamily: MONO, fontWeight: 800, fontSize: 17 * s, letterSpacing: "0.10em",
            color: "#584F44", whiteSpace: "nowrap" }}>
            {BOOK[i % BOOK.length]}<span style={{ opacity: 0.4 }}> · </span>
          </div>
        );
      })}
    </div>
  );
};

/* =========================================================================
   A WIRE CLIPPING — one item on the board. Big and travelling, because only
   LARGE x BRIGHT x FAST registers ([[feedback_scene_needs_an_arc]]).
   ====================================================================== */
export const Clip: React.FC<{ x: number; y: number; c: string; k: number; s?: number; z?: number;
  p: number; f?: number; kind: number }> = ({ x, y, c, k, s = 1, z = 66, p, f = 0, kind }) => {
  const sw = sway(f, k * 2.7, 0.44);
  const lines = 2 + (k % 2);
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 176 * s, zIndex: z, opacity: p,
      transform: `translate(${(1 - p) * (k % 2 ? 96 : -96) * s}px, ${(1 - p) * 168 * s + sw.y * 0.5}px) rotate(${(k % 2 ? 1.4 : -1.2) + sw.r * 0.2}deg)` }}>
      <div style={{ background: CARDL, borderRadius: 4 * s, boxShadow: SH, overflow: "hidden",
        position: "relative", borderTop: `${8 * s}px solid ${c}` }}>
        <div style={{ padding: `${8 * s}px ${9 * s}px ${10 * s}px` }}>
          {/* an item is a headline block and a source line, not readable copy */}
          <div style={{ width: "88%", height: 8 * s, borderRadius: 4 * s, background: "#4C443A" }} />
          {Array.from({ length: lines }, (_, i) => (
            <div key={"cl" + i} style={{ width: `${74 - i * 16}%`, height: 5 * s, marginTop: 6 * s,
              borderRadius: 3 * s, background: "#B4AB9B" }} />
          ))}
          {/* ⛔ THE TEXT CHIPS ARE GONE. Every item now ends in a sparkline and a
              direction chevron: two graphic channels saying what one mono chip
              said, in the language the subject actually uses. */}
          <div style={{ marginTop: 8 * s, display: "flex", alignItems: "center",
            justifyContent: "space-between" }}>
            <Spark w={104 * s} h={22 * s} seed={k * 4 + kind * 3 + 2} up={(k + kind) % 3 !== 1}
              inline />
            <Dir s={0.9 * s} up={(k + kind) % 3 !== 1} inline />
          </div>
        </div>
        <Sheen f={f} at={0} n={20} z={4} o={0.22} />
      </div>
    </div>
  );
};

/** the portfolio the viewer hands over. Tickers only — a book, not a balance. */
export const PortfolioCard: React.FC<{ x: number; y: number; s?: number; z?: number; f?: number;
  p?: number }> = ({ x, y, s = 1, z = 72, f = 0, p = 1 }) => {
  const sw = sway(f, 9, 0.4);
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 216 * s, zIndex: z, opacity: p,
      transform: `translateY(${(1 - p) * 190 * s + sw.y * 0.4}px) rotate(${-1.4 + sw.r * 0.18}deg)` }}>
      <div style={{ background: CARDL, borderRadius: 6 * s, boxShadow: SH_D, overflow: "hidden",
        position: "relative", border: `${3 * s}px solid ${CARDD}` }}>
        <div style={{ background: INK, padding: `${7 * s}px ${11 * s}px`, fontFamily: MONO,
          fontWeight: 800, fontSize: 12 * s, letterSpacing: "0.16em", color: CARDL }}>
          YOUR PORTFOLIO
        </div>
        <div style={{ position: "relative", height: 92 * s }}>
          <Allocation x={16 * s} y={10 * s} r={36 * s} z={3} f={f} />
          <Spark x={100 * s} y={26 * s} w={98 * s} h={40 * s} seed={21} up z={3} />
        </div>
        <div style={{ padding: `0 ${11 * s}px ${11 * s}px`, display: "grid",
          gridTemplateColumns: "1fr 1fr", gap: `${7 * s}px ${9 * s}px` }}>
          {BOOK.map((t) => (
            <div key={t} style={{ fontFamily: MONO, fontWeight: 800, fontSize: 16 * s,
              letterSpacing: "0.06em", color: "#3A342C", background: mxh(GOLD, 0.72),
              borderRadius: 3 * s, padding: `${3 * s}px 0`, textAlign: "center" }}>{t}</div>
          ))}
        </div>
        <Sheen f={f} at={2} n={24} z={4} o={0.26} />
      </div>
    </div>
  );
};

/* =========================================================================
   THE MODEL — the hero output of agent three, built as the WHOLE PANEL rather
   than inside a window ([[feedback_scene_needs_an_arc]]: making the hero output
   full-panel measured 3.18 -> 4.25, the third-biggest motion lever there is).

   ⛔ THE ROWS ARE THE ROWS A VALUATION MODEL HAS (revenue, EBITDA, FCF, WACC,
      terminal) and the cells fill with BARS, not with numbers: a printed figure
      would be a valuation of nothing, and a bar filling is also the thing the
      eye can read at 1/30th of a second.
   ====================================================================== */
/* ⛔⛔ `asm` EXISTS BECAUSE A SPREADSHEET FILLING IN IS A SPREADSHEET FILLING IN.
   S8 measured 7.17 and Alex called it "way too boring", and he is describing the
   truth: the frame was a finished grid whose cells changed width. A model is
   BUILT — the agent doing it literally wears a hard hat — so the grid now
   ASSEMBLES: the ruling draws, the year columns crane down from above, and the
   row labels fly in from the left one at a time. Same object, but the viewer
   watches it get made instead of watching it get shaded. */
export const ModelGrid: React.FC<{ x: number; y: number; w: number; h: number; f: number;
  build: number; z?: number; s?: number; asm?: number }> =
  ({ x, y, w: ww, h: hh, f, build, z = 50, s = 1, asm = 1 }) => {
  const COLS = 6;
  const labW = 214 * s, headH = 46 * s;
  const cw = (ww - labW) / COLS;
  const rh = (hh - headH) / MODEL_ROWS.length;
  const total = MODEL_ROWS.length * COLS;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, zIndex: z,
      background: CARDL, borderRadius: 8 * s, boxShadow: SH_D, overflow: "hidden",
      border: `${3 * s}px solid ${dkh(LEDG, 0.10)}` }}>
      {/* the header band + the year columns */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: headH,
        background: LEDG }} />
      <Spark x={14 * s} y={12 * s} w={72 * s} h={22 * s} seed={31} up c="#CFE7DA" z={3} />
      {Array.from({ length: COLS }, (_, c) => {
        const t = Math.max(0, Math.min(1, asm * (COLS + 2) - c));
        return (
          <div key={"yh" + c} style={{ position: "absolute", left: labW + c * cw, top: 13 * s,
            width: cw, textAlign: "center", fontFamily: MONO, fontWeight: 800, fontSize: 14 * s,
            letterSpacing: "0.08em", color: "#DCEBE2", opacity: 0.9 * t,
            transform: `translateY(${(1 - BACK(t)) * -46 * s}px)` }}>
            {c < 2 ? `FY${24 + c}A` : `FY${24 + c}E`}
          </div>
        );
      })}
      {/* the ledger ruling */}
      {MODEL_ROWS.map((r, i) => {
        const ra = Math.max(0, Math.min(1, asm * 7 - i));
        return (
        <React.Fragment key={"rw" + i}>
          <div style={{ position: "absolute", left: 0, right: 0, top: headH + i * rh,
            height: rh, background: i % 2 ? mxh(LEDGL, 0.80) : CARDL,
            opacity: Math.min(1, ra * 4),
            transform: `translateX(${(1 - BACK(ra)) * -ww}px)` }} />
          <div style={{ position: "absolute", left: 0, right: 0, top: headH + i * rh,
            height: 1, background: mxh(LEDG, 0.62), opacity: ra,
            transform: `translateX(${(1 - BACK(ra)) * -ww}px)` }} />
          <div style={{ position: "absolute", top: headH + i * rh + rh / 2 - 11 * s,
            left: 14 * s + (1 - BACK(Math.max(0, Math.min(1, asm * 7 - i)))) * -300 * s,
            opacity: Math.min(1, Math.max(0, asm * 7 - i) * 3),
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 20 * s,
            letterSpacing: "-0.01em", color: "#2A3B33" }}>{r}</div>
        </React.Fragment>
      );})}
      {/* the vertical rules */}
      {Array.from({ length: COLS + 1 }, (_, c) => (
        <div key={"vr" + c} style={{ position: "absolute", left: labW + c * cw, top: headH,
          bottom: 0, width: 1, background: mxh(LEDG, 0.58) }} />
      ))}
      {/* the cells, filling in a continuous sweep left to right */}
      {MODEL_ROWS.map((_, i) => Array.from({ length: COLS }, (_, c) => {
        const k = c * MODEL_ROWS.length + i;
        const p = Math.max(0, Math.min(1, build * total - k));
        if (p <= 0) return null;
        const bw = (0.62 + rnd(k, 5) * 0.36) * (cw - 18 * s);
        const e = BACK(Math.min(1, p));
        return (
          <div key={"cl" + i + "_" + c} style={{ position: "absolute",
            left: labW + c * cw + 9 * s, top: headH + i * rh + rh / 2 - 11 * s,
            width: bw, height: 22 * s, borderRadius: 3 * s,
            background: i === 3 ? GOLD : i === 4 ? CLAY : LEDG, opacity: 0.86 * Math.min(1, p * 3),
            transform: `translateX(${(1 - e) * -0.9 * cw}px) scaleX(${0.24 + e * 0.76})`,
            transformOrigin: "0% 50%" }} />
        );
      }))}
      <Sheen f={f} at={6} n={40} z={20} o={0.20} />
    </div>
  );
};

/** the two blocks the VO actually names: what it's worth, and the risk */
export const ValueBlock: React.FC<{ x: number; y: number; t: string; sub: string; c: string;
  s?: number; z?: number; p: number; f?: number; grid?: boolean }> =
  ({ x, y, t, sub, c, s = 1, z = 84, p, f = 0, grid = false }) => {
  const sw = sway(f, t.length, 0.4);
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 244 * s, zIndex: z, opacity: p,
      transform: `scale(${0.72 + p * 0.28}) translateY(${(1 - p) * 176 + sw.y * 0.4}px) rotate(${sw.r * 0.16}deg)`,
      transformOrigin: "50% 50%" }}>
      <div style={{ background: CARDL, borderRadius: 7 * s, boxShadow: SH_D, overflow: "hidden",
        position: "relative", border: `${4 * s}px solid ${c}` }}>
        <div style={{ background: c, padding: `${5 * s}px 0`, textAlign: "center",
          fontFamily: MONO, fontWeight: 800, fontSize: 12 * s, letterSpacing: "0.18em",
          color: dkh(c, 0.50) }}>{t}</div>
        <div style={{ padding: `${10 * s}px ${12 * s}px ${12 * s}px` }}>
          {/* a valuation is a RANGE and a risk is a SPREAD — both drawn, never printed */}
          {grid ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 3 * s }}>
              {Array.from({ length: 15 }, (_, i) => (
                <div key={"sq" + i} style={{ height: 15 * s, borderRadius: 2 * s,
                  background: mxh(c, 0.80 - (i % 5) * 0.14 - Math.floor(i / 5) * 0.06),
                  opacity: Math.max(0, Math.min(1, p * 15 - i)) }} />
              ))}
            </div>
          ) : (<>
            <div style={{ position: "relative", height: 18 * s, borderRadius: 9 * s,
              background: CARDD, overflow: "hidden" }}>
              <div style={{ position: "absolute", left: `${22}%`, width: `${52 * p}%`, top: 0,
                bottom: 0, background: c }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 * s,
              fontFamily: MONO, fontWeight: 800, fontSize: 11 * s, letterSpacing: "0.08em",
              color: "#7C7466" }}><span>BEAR</span><span>BASE</span><span>BULL</span></div>
          </>)}
          {/* ⛔ the sub line is gone — a bar that already reads BEAR/BASE/BULL and
              a sensitivity square do not need a caption underneath them */}
        </div>
        <Sheen f={f} at={1} n={22} z={4} o={0.26} />
      </div>
    </div>
  );
};

/* =========================================================================
   THE OUT TRAY — ⭐ THE HERO ARTIFACT of the whole reel, and the thing that
   keeps it honest at its loudest moment. Anthropic's own sentence: *"users stay
   firmly in the loop — reviewing, iterating on, and approving Claude's work
   before it goes to a client, gets filed, or is acted on."* So the work stacks
   here and stops, stamped FOR REVIEW, waiting on a signature that is not
   Claude's. Board §0 claim 3.
   ====================================================================== */
export const OutTray: React.FC<{ x: number; y: number; s?: number; z?: number; f: number;
  n: number; stamp?: number }> = ({ x, y, s = 1, z = 70, f, n, stamp = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
    {/* the stack, oldest at the bottom */}
    {Array.from({ length: Math.max(0, Math.min(6, Math.floor(n))) }, (_, i) => {
      const p = Math.max(0, Math.min(1, n - i));
      return (
        <div key={"os" + i} style={{ position: "absolute", left: (10 - i * 2.4) * s,
          top: (58 - i * 13) * s, width: 232 * s, height: 30 * s, background: i % 2 ? CARD : CARDL,
          borderRadius: 3 * s, boxShadow: SH, zIndex: 4 + i, opacity: p,
          transform: `translateY(${(1 - p) * -44 * s}px) rotate(${(i % 2 ? 1 : -1) * 0.9}deg)` }}>
          <div style={{ position: "absolute", left: 12 * s, top: 11 * s, width: 122 * s,
            height: 5 * s, borderRadius: 3 * s, background: "#B0A796" }} />
          <div style={{ position: "absolute", right: 12 * s, top: 9 * s, width: 34 * s,
            height: 10 * s, borderRadius: 2 * s, background: mxh(CLAY, 0.56) }} />
        </div>
      );
    })}
    {/* the tray itself, in front */}
    <div style={{ position: "absolute", left: 0, top: 60 * s, width: 252 * s, height: 52 * s,
      background: `linear-gradient(174deg, ${mxh(STEEL, 0.20)} 0%, ${STEELD} 100%)`,
      borderRadius: `${4 * s}px ${4 * s}px ${10 * s}px ${10 * s}px`, zIndex: 20,
      boxShadow: SH_D, clipPath: "polygon(0 0, 100% 0, 96% 100%, 4% 100%)" }} />
    <div style={{ position: "absolute", left: 22 * s, top: 76 * s, zIndex: 21,
      fontFamily: MONO, fontWeight: 800, fontSize: 15 * s, letterSpacing: "0.22em",
      color: "#DCE2E8" }}>OUT</div>
    {/* the stamp — the reel's honest last word on what these agents do */}
    {stamp > 0 && (
      <div style={{ position: "absolute", left: 76 * s, top: -6 * s, zIndex: 30,
        opacity: Math.min(1, stamp),
        transform: `rotate(-11deg) scale(${1.5 - Math.min(1, stamp) * 0.5})` }}>
        <div style={{ border: `${4 * s}px solid ${RED}`, borderRadius: 5 * s,
          padding: `${5 * s}px ${12 * s}px`, fontFamily: inter.fontFamily, fontWeight: 900,
          fontSize: 21 * s, letterSpacing: "0.10em", color: RED, background: hexa(CARDL, 0.16) }}>
          FOR REVIEW
        </div>
      </div>
    )}
  </div>
);

/* =========================================================================
   THE REPO PLATE — the receipt. Mark, owner/name, stars, licence. ⛔ Every
   value verified against the GitHub API on 2026-08-13; nothing estimated.
   ====================================================================== */
export const RepoPlate: React.FC<{ x: number; y: number; s?: number; z?: number; f?: number;
  stars?: string; p?: number }> = ({ x, y, s = 1, z = 86, f = 0, stars, p = 1 }) => {
  const sw = sway(f, 12, 0.34);
  /* ⛔ 396 WIDE TRUNCATED THE RECEIPT TO `anthropics/financial-servi…`. The
     string is 29 chars and mono-800 advances ~0.60em, so at 17px it needs 296px
     — and a 396px plate leaves exactly 296 after the tile, the gap and the
     padding, i.e. it was landing on the boundary. 448 leaves 348. A repo name
     cut off mid-word is a receipt that fails as a receipt. */
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 448 * s, zIndex: z, opacity: p,
      transform: `translateY(${sw.y * 0.4}px) rotate(${sw.r * 0.14}deg)` }}>
      <div style={{ background: CARDL, borderRadius: 9 * s, boxShadow: SH_D, overflow: "hidden",
        position: "relative", border: `${3 * s}px solid ${CARDD}`, display: "flex",
        alignItems: "center", gap: 12 * s, padding: `${11 * s}px ${13 * s}px` }}>
        <div style={{ width: 62 * s, height: 62 * s, borderRadius: 15 * s, background: "#FFFFFF",
          border: `${2 * s}px solid #E8DCC0`, display: "flex", alignItems: "center",
          justifyContent: "center", flex: "0 0 auto", boxShadow: SH }}>
          <Img src={staticFile("claude_logo.png")}
            style={{ width: 44 * s, height: 44 * s, objectFit: "contain" }} />
        </div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontFamily: MONO, fontWeight: 800, fontSize: 17 * s,
            letterSpacing: "0.02em", color: "#2B2620", whiteSpace: "nowrap",
            overflow: "hidden", textOverflow: "ellipsis" }}>{REPO.full}</div>
          <div style={{ display: "flex", gap: 7 * s, marginTop: 6 * s }}>
            {[stars ?? REPO.stars + "★", REPO.licence].map((t) => (
              <span key={t} style={{ fontFamily: MONO, fontWeight: 800, fontSize: 12.5 * s,
                letterSpacing: "0.08em", color: "#5E564A", background: mxh(GOLD, 0.70),
                borderRadius: 4 * s, padding: `${3 * s}px ${8 * s}px` }}>{t}</span>
            ))}
          </div>
        </div>
        <Sheen f={f} at={4} n={26} z={4} o={0.24} />
      </div>
    </div>
  );
};

/** the connector strip — the real data sources the post names */
export const SourceStrip: React.FC<{ x: number; y: number; w: number; s?: number; z?: number;
  p?: number }> = ({ x, y, w: ww, s = 1, z = 74, p = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: ww, zIndex: z, opacity: p,
    display: "flex", gap: 7 * s, flexWrap: "nowrap", justifyContent: "center" }}>
    {CONNECTORS.map((c) => (
      <span key={c} style={{ fontFamily: MONO, fontWeight: 800, fontSize: 11.5 * s,
        letterSpacing: "0.08em", color: "#4E463C", background: CARDD, borderRadius: 4 * s,
        padding: `${4 * s}px ${7 * s}px`, whiteSpace: "nowrap", boxShadow: SH }}>{c}</span>
    ))}
  </div>
);

/* =========================================================================
   THE AUDITOR — the reel's main Claude, costumed per SPRITE.
   ⛔ The mark never covers his face: the box Mascot's body rect IS the face.
   ====================================================================== */
export const Guy: React.FC<{ x: number; y: number; s?: number; z?: number; f: number;
  costume: Record<string, number | string>; gaze?: number; cheer?: number; shock?: number;
  stern?: number; nodAmp?: number; nodSpeed?: number; o?: number }> =
  ({ x, y, s = 1, z = 78, f, costume, gaze = 0.5, cheer = 0, shock = 0, stern = 0,
     nodAmp = 3.2, nodSpeed = 11, o = 1 }) => {
  const SZ = 196 * s;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z, opacity: o }}>
      <Contact x={SZ * 0.13} y={SZ * 0.90} w={SZ * 0.74} z={-1} o={0.34} />
      <Mascot lf={f} size={SZ} gaze={gaze} cheer={cheer} shock={shock} stern={stern}
        nodAmp={nodAmp} nodSpeed={nodSpeed} {...(costume as any)} />
    </div>
  );
};

/** the big number plate — one value, huge, in the display face */
export const NumPlate: React.FC<{ x: number; y: number; v: string; label: string; s?: number;
  z?: number; c?: string; p?: number; f?: number }> =
  ({ x, y, v, label, s = 1, z = 88, c = GOLD, p = 1, f = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z, opacity: p,
    transform: `scale(${0.9 + p * 0.1})`, transformOrigin: "0% 50%" }}>
    <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 96 * s,
      lineHeight: 0.94, letterSpacing: "-0.03em", color: c,
      textShadow: "0 4px 14px rgba(0,0,0,0.45)" }}>{v}</div>
    <div style={{ fontFamily: MONO, fontWeight: 800, fontSize: 15 * s, letterSpacing: "0.20em",
      color: "#E6DDCA", marginTop: 5 * s, opacity: 0.9 }}>{label}</div>
  </div>
);
