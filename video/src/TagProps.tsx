import React from "react";
import { Img, staticFile } from "remotion";
import { inter, fraunces } from "./fonts";
import { MONO } from "./SlopKit";
import { E, OUT, IO, BACK, LIN, hexa, mix, dark, SH, SH_D, Slab, Chip, Caret, W, H } from "./TagWorld";

/* =========================================================================
   REEL 97 "FREE" · THE TEN WORK SURFACES.

   ⛔ THE RULE THIS FILE EXISTS FOR: draw what the tool DOES, not the swap.
   Reel 86 shipped its product scenes as a card, an arrow and a card — eight
   objects each, three of them the same template in three wall colours — and got
   *"the tool scenes need to be elevated a lot, more detail, not so plain and
   basic."*  The fix there took object counts from 8 to 38-150 by drawing the
   actual work: an NLE with tracks and a waveform and a playhead, a model with
   RAM and GPU meters, a kanban with columns.

   ⛔ AND THE OTHER HALF OF THAT ROUND: *"the UI needs to look like actual app
   UIs."*  What makes a mock read as software is CHROME IN LAYERS — a title bar,
   an icon rail, a sidebar, an inspector, a status bar carrying details only real
   software knows. Not one rectangle with a label on it.

   ⛔ NO HOUSE TOKEN CROSSES A PRODUCT WINDOW'S FRAME. Reel 86 had the clay,
   green and amber constants inside its app mocks 28 times, so every playhead was
   clay-red and every tick clay-green, and it read as Claude wearing a costume.
   Each surface below carries its own system colours.

   ⛔⛔ THE BOX. Every surface is authored to fill x 58..954, y 132..536 and NOT
   to overflow it. The first cut authored them small and then SCALED the group to
   0.80 to make room for the hero tag, which cost twice: the work ended up
   occupying about half the panel width with dead room either side, and every
   label lost a fifth of its height for nothing. A surface that is authored to
   the box needs no scale.

   Each surface takes:  f  = scene-local frame
                        pf = frames since the PAID hit  (negative = not yet)
                        ff = frames since the FREE hit   (negative = not yet)
   ========================================================================= */

export type SurfaceP = { f: number; pf: number; ff: number };
export const BOX = { x: 58, y: 132, w: 896, h: 404 } as const;
const g = (a: string, b: string, deg = 168) => `linear-gradient(${deg}deg, ${a} 0%, ${b} 100%)`;
const rnd = (i: number, k = 0) => { const v = Math.sin(i * 37.7 + k * 91.3) * 4371.7; return v - Math.floor(v); };

/* ================================================================== 1 =====
   IMAGE CREATION — a render resolves from a prompt. It MAKES a picture; S6
   REMOVES from one, which is what keeps those two scenes apart.
   ======================================================================== */
export const SurfImage: React.FC<SurfaceP> = ({ f, pf, ff }) => {
  const PROMPT = "a lighthouse at dusk, long exposure  --ar 3:2  --v 7";
  /* ⛔ FRAME 0 IS SETTLED AND HAS THE SUBJECT IN IT (THE-OPEN laws 1 and 4).
     The first cut started the prompt at f2 and the render at f8, so frame 0 —
     the one frame guaranteed to be seen — was an empty dark box with a caret
     blinking in it.

     ⛔⛔ AND THE SETTLED VERSION THEN AUDITED **STATIC** (5.70 against a bar of
     9.00) — the hook, of all scenes. Two fixes failed before the cause was
     right: running the tile-resolve longer, then adding a sweeping beam. Both
     were real motion and both were INVISIBLE TO THE AUDIT, because a 50x40 tile
     is 0.25% of the panel and a beam is 1.6% of it, and the audit measures mean
     frame delta — only LARGE x BRIGHT x FAST registers.

     ⭐ THE FIX IS THE THING MIDJOURNEY ACTUALLY DOES. It renders a 2x2 grid and
     then you upscale one. So frame 0 is four finished variations (settled,
     bright, subject present), and at f16 the chosen one EXPANDS to fill the
     frame — a bright object crossing most of the panel in ten frames. The move
     the gate wanted and the move the product makes are the same move. */
  const grid = E(f, -14, 12, 0, 1, LIN);          // the four resolving
  const up = E(f, 16, 27, 0, 1, IO);              // the upscale
  const redo = ff >= 0 ? E(ff, 1, 12, 0, 1, OUT) : 0;
  const IX = 10, IY = 44, IW = 876, IH = 300;     // the render area
  const CW = (IW - 16) / 2, CH = (IH - 16) / 2;   // one quadrant

  const Pic: React.FC<{ k: number; x: number; y: number; w: number; h: number; o: number }> =
    ({ k, x, y, w, h, o }) => {
    const S = w / IW;                              // everything scales with the frame
    const sweep = Math.sin((f + k * 13) / 21);
    return (
      <div style={{ position: "absolute", left: x, top: y, width: w, height: h,
        overflow: "hidden", borderRadius: 6, background: "#12171F", opacity: o }}>
        <div style={{ position: "absolute", inset: 0, background: g("#41548A", "#C07C70", 178) }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: h * 0.62, bottom: 0,
          background: g("#2A3E5C", "#0F1826", 182) }} />
        {[0, 1, 2, 3].map((i) => (
          <div key={"w" + i} style={{ position: "absolute", left: 0, right: 0,
            top: h * 0.66 + i * 22 * S, height: Math.max(2, 5 * S), background: "#7290B8",
            opacity: 0.5 - i * 0.08 }} />
        ))}
        {/* cloud bands, so the sky is a sky and not a gradient */}
        {[0, 1, 2].map((i) => (
          <div key={"cl" + i} style={{ position: "absolute", left: w * (0.05 + i * 0.31),
            top: h * (0.12 + i * 0.11), width: w * (0.30 - i * 0.05), height: 12 * S,
            borderRadius: 9 * S, background: "#E8C4B0", opacity: 0.34 - i * 0.06 }} />
        ))}
        {/* ⛔ THE SUN SITS ON THE HORIZON, not in mid-air. At h*0.36 with no
            waterline behind it, it read as a pale egg floating beside the tower.
            Each quadrant also varies it, because a real 2x2 grid is four
            DIFFERENT takes, not the same picture printed four times. */}
        <div style={{ position: "absolute", left: w * (0.50 + k * 0.045), top: h * 0.505,
          width: (96 + k * 10) * S, height: (96 + k * 10) * S, borderRadius: 60 * S,
          background: "#F8DFA2" }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: h * 0.615, bottom: 0,
          background: g("#2A3E5C", "#0F1826", 182) }} />
        <div style={{ position: "absolute", left: w * (0.26 + k * 0.02), top: h * 0.12,
          width: (62 - k * 3) * S, height: 176 * S, background: g("#F2ECDC", "#A89E90", 176),
          clipPath: "polygon(26% 0, 74% 0, 100% 100%, 0 100%)" }} />
        <div style={{ position: "absolute", left: w * (0.268 + k * 0.02), top: h * 0.08,
          width: 46 * S, height: 28 * S, borderRadius: 5 * S, background: "#F8E0A8" }} />
        {/* the beam turns — the prompt says long exposure, so the picture does */}
        <div style={{ position: "absolute", left: w * (0.30 + k * 0.02), top: h * 0.14,
          width: 340 * S, height: 48 * S, background: "#F8E4B4", opacity: 0.44,
          transformOrigin: "0% 50%",
          transform: `rotate(${sweep * 15 - 3}deg)`,
          clipPath: "polygon(0 42%, 100% 0, 100% 100%, 0 58%)" }} />
        <div style={{ position: "absolute", left: w * 0.18 + sweep * w * 0.11, top: h * 0.62,
          width: 150 * S, height: 120 * S, background: "#8FA8CC", opacity: 0.22,
          clipPath: "polygon(42% 0, 58% 0, 100% 100%, 0 100%)" }} />
        <div style={{ position: "absolute", left: 0, top: h * 0.58, width: w * 0.22, height: h * 0.28,
          background: "#18202E", clipPath: "polygon(0 100%, 34% 12%, 72% 44%, 100% 100%)" }} />
        {/* the resolve, in BANDS not tiles: a band is 12% of the frame, a tile
            was 0.25% of it, and only one of those two is a visible event */}
        {Array.from({ length: 8 }, (_, i) => {
          const done = Math.max(grid, redo) > (i + 0.6 + rnd(i + k * 7) * 0.7) / 8.6;
          return done ? null : (
            <div key={"b" + i} style={{ position: "absolute", left: 0, right: 0,
              top: (i * h) / 8, height: h / 8 + 1, background: i % 2 ? "#1C2330" : "#161C27" }} />
          );
        })}
      </div>
    );
  };

  /* quadrant 0 lerps to the full frame; the other three fade under it */
  const lerp = (a: number, b: number) => a + (b - a) * up;
  return (<>
    <Slab {...BOX} z={50} c="#151A22" c2="#0D1117" bar="render  ·  1024 x 1024  ·  seed 4471">
      <Pic k={1} x={IX + CW + 16} y={IY} w={CW} h={CH} o={1 - up} />
      <Pic k={2} x={IX} y={IY + CH + 16} w={CW} h={CH} o={1 - up} />
      <Pic k={3} x={IX + CW + 16} y={IY + CH + 16} w={CW} h={CH} o={1 - up} />
      <Pic k={0} x={lerp(IX, IX)} y={lerp(IY, IY)} w={lerp(CW, IW)} h={lerp(CH, IH)} o={1} />
      {/* the selection ring, and then the U1 badge on the upscaled frame */}
      <div style={{ position: "absolute", left: lerp(IX, IX) - 4, top: lerp(IY, IY) - 4,
        width: lerp(CW, IW) + 8, height: lerp(CH, IH) + 8, borderRadius: 9,
        border: "4px solid #7FE0C0", zIndex: 20 }} />
      <div style={{ position: "absolute", left: lerp(IX + 10, IX + 14),
        top: lerp(IY + CH - 34, IY + IH - 42), padding: "4px 12px", borderRadius: 6,
        background: "#0E1D22", fontFamily: MONO, fontWeight: 800, fontSize: 17,
        letterSpacing: "0.10em", color: "#7FE0C0", zIndex: 22 }}>
        {up > 0.5 ? "U1  ·  UPSCALED" : "U1"}
      </div>
      {/* the four quadrant labels, only while the grid is up */}
      {up < 0.5 && ["", "U2", "U3", "U4"].map((t, i) => (t ? (
        <div key={t} style={{ position: "absolute",
          left: (i % 2 ? IX + CW + 26 : IX + 10), top: (i > 1 ? IY + CH + 16 : IY) + CH - 34,
          padding: "4px 12px", borderRadius: 6, background: "#141C24", fontFamily: MONO,
          fontWeight: 800, fontSize: 17, letterSpacing: "0.10em", color: "#8A94A2",
          opacity: 1 - up * 2, zIndex: 22 }}>{t}</div>
      ) : null))}
      {/* the prompt, as the window's own footer */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 52,
        background: "#0F141B", borderTop: "2px solid rgba(228,224,210,0.16)" }} />
      <div style={{ position: "absolute", left: 20, bottom: 15, fontFamily: MONO, fontWeight: 700,
        fontSize: 21, color: "#C8D0D8", whiteSpace: "nowrap" }}>{PROMPT}</div>
      <Caret x={20 + PROMPT.length * 11.6} y={BOX.h - 44} h={26} f={f} c="#7FE0C0" />
      <div style={{ position: "absolute", right: 16, top: 10, fontFamily: MONO, fontWeight: 700,
        fontSize: 15, letterSpacing: "0.10em", color: "#6E7784" }}>
        {"FAST GPU  ·  " + Math.max(0, Math.round((1 - Math.max(grid, up)) * 41)) + "s"}
      </div>
    </Slab>
  </>);
};

/* ================================================================== 2 =====
   AI RESEARCH — a question fans out into citations with real source chrome.
   ======================================================================== */
export const SurfResearch: React.FC<SurfaceP> = ({ f, pf, ff }) => {
  const Q = "does creatine improve working memory?";
  const n = Math.round(E(f, 0, 18, 6, Q.length, LIN));
  const CARDS = [
    { t: "Randomised trial, 6 weeks, n = 123", s: "NATURE  ·  2024", p: 92, y: "YES" },
    { t: "Meta-analysis across 23 studies", s: "CELL REP  ·  2023", p: 78, y: "YES" },
    { t: "Prospective cohort, n = 1,204", s: "JAMA  ·  2025", p: 64, y: "MIXED" },
  ];
  const more = ff >= 0 ? E(ff, 1, 12, 0, 1, BACK) : 0;
  return (<>
    <Slab {...BOX} z={50} c="#161C25" c2="#0F141C" bar="1,415 papers  ·  peer reviewed only">
      {/* the question bar */}
      <div style={{ position: "absolute", left: 18, top: 50, right: 18, height: 52,
        borderRadius: 10, background: "#1E2632", border: "2px solid rgba(228,224,210,0.14)" }} />
      <div style={{ position: "absolute", left: 34, top: 64, fontFamily: inter.fontFamily,
        fontWeight: 700, fontSize: 24, color: "#D6DEE6", whiteSpace: "nowrap" }}>{Q.slice(0, n)}</div>
      <Caret x={34 + n * 12.1} y={62} h={26} f={f} c="#7FC8E8" />
      {CARDS.map((c, i) => {
        const a = E(f, 10 + i * 6, 26 + i * 6, 0, 1, BACK);
        return (
          <div key={i} style={{ position: "absolute", left: 18, top: 112 + i * 80, right: 18,
            height: 72, transform: `translateY(${(1 - a) * 34}px)`, opacity: a, zIndex: 20 - i }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: 12, background: "#F4F2EA",
              boxShadow: SH, border: "2px solid #DAD4C4" }} />
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 10,
              borderRadius: "12px 0 0 12px", background: "#2E7CC4" }} />
            <div style={{ position: "absolute", left: 28, top: 12, fontFamily: inter.fontFamily,
              fontWeight: 800, fontSize: 25, color: "#1E2430" }}>{c.t}</div>
            <div style={{ position: "absolute", left: 28, top: 44, fontFamily: MONO, fontWeight: 700,
              fontSize: 17, color: "#6B7480", letterSpacing: "0.08em" }}>{c.s}</div>
            {/* the finding, as a badge and a quantity */}
            <div style={{ position: "absolute", left: 330, top: 42, padding: "3px 12px",
              borderRadius: 6, background: c.y === "YES" ? "#DCEEE2" : "#F2EAD6",
              fontFamily: MONO, fontWeight: 800, fontSize: 15,
              color: c.y === "YES" ? "#2C6B4C" : "#7A6428" }}>{c.y}</div>
            <div style={{ position: "absolute", right: 132, top: 32, width: 200, height: 14,
              borderRadius: 7, background: "#DFDACB" }} />
            <div style={{ position: "absolute", right: 132 + 200 - (200 * c.p) / 100, top: 32,
              width: (200 * c.p) / 100 * a, height: 14, borderRadius: 7, background: "#2E7CC4" }} />
            <div style={{ position: "absolute", right: 24, top: 26, fontFamily: fraunces.fontFamily,
              fontWeight: 900, fontSize: 30, color: "#2E7CC4" }}>{c.p + "%"}</div>
          </div>
        );
      })}
      {more > 0 && (
        <div style={{ position: "absolute", left: 18, right: 18, bottom: 12, height: 46,
          borderRadius: 10, background: "#1E4A38", opacity: more, display: "flex",
          alignItems: "center", paddingLeft: 22, fontFamily: MONO, fontWeight: 800, fontSize: 19,
          letterSpacing: "0.08em", color: "#8FE0BC", zIndex: 30 }}>
          + 1,412 MORE PAPERS SEARCHED
        </div>
      )}
    </Slab>
  </>);
};

/* ================================================================== 3 =====
   AVATAR CREATION — one still photo stands up and talks.
   ======================================================================== */
const Head: React.FC<{ x: number; y: number; s: number; live: number; f: number; z: number }> =
  ({ x, y, s, live, f, z }) => {
  const mouth = 8 + Math.abs(Math.sin(f / 3.1)) * 24;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: 176 * s, height: 224 * s,
        borderRadius: 16 * s, background: g("#8492AE", "#4C566C") }} />
      <div style={{ position: "absolute", left: 44 * s, top: 32 * s, width: 88 * s, height: 98 * s,
        borderRadius: `${44 * s}px ${44 * s}px ${36 * s}px ${36 * s}px`, background: "#EACBA6" }} />
      <div style={{ position: "absolute", left: 40 * s, top: 24 * s, width: 96 * s, height: 34 * s,
        borderRadius: `${48 * s}px ${48 * s}px 0 0`, background: "#4A3A2C" }} />
      {[0, 1].map((i) => (
        <div key={i} style={{ position: "absolute", left: (62 + i * 36) * s, top: 68 * s,
          width: 11 * s, height: (live ? 11 : 5) * s, borderRadius: 6 * s, background: "#2A2118" }} />
      ))}
      <div style={{ position: "absolute", left: 78 * s, top: (102 - (live ? mouth : 8) / 2) * s,
        width: 24 * s, height: (live ? mouth : 6) * s, borderRadius: 9 * s, background: "#93524A" }} />
      <div style={{ position: "absolute", left: 20 * s, top: 138 * s, width: 136 * s, height: 86 * s,
        borderRadius: `${32 * s}px ${32 * s}px 0 0`, background: "#33405A" }} />
      <div style={{ position: "absolute", left: 68 * s, top: 138 * s, width: 40 * s, height: 86 * s,
        background: "#EACBA6" }} />
    </div>
  );
};

export const SurfAvatar: React.FC<SurfaceP> = ({ f, pf, ff }) => {
  const stand = E(f, 4, 28, 0, 1, OUT);
  const talk = f > 24 ? 1 : 0;
  return (<>
    {/* the source: one still, with photo chrome */}
    <div style={{ position: "absolute", left: 74, top: 178, zIndex: 50 }}>
      <div style={{ position: "absolute", left: -18, top: -18, width: 276, height: 336,
        borderRadius: 10, background: "#EFEADC", boxShadow: SH_D }} />
      <div style={{ position: "absolute", left: 0, top: 0, width: 240, height: 282,
        overflow: "hidden", background: "#2C3444" }}>
        <Head x={20} y={14} s={1.18} live={0} f={f} z={52} />
      </div>
      <div style={{ position: "absolute", left: -18, top: 290, width: 276, textAlign: "center",
        fontFamily: MONO, fontWeight: 800, fontSize: 17, letterSpacing: "0.14em", color: "#6E6858" }}>
        1 PHOTO  ·  JPG
      </div>
    </div>
    {/* the work: an arrow with the job written on it */}
    <Chip x={352} y={276} t="LIP SYNC" c="#3A3020" fg="#E8CE9A" z={56} />
    <div style={{ position: "absolute", left: 356, top: 328, width: 76, height: 8, borderRadius: 4,
      background: "#C8A868", opacity: stand, zIndex: 54 }} />
    <div style={{ position: "absolute", left: 428, top: 316, width: 0, height: 0, zIndex: 54,
      borderLeft: "22px solid #C8A868", borderTop: "16px solid transparent",
      borderBottom: "16px solid transparent", opacity: stand }} />
    {/* the result: a live avatar in a player */}
    <Slab x={470} y={BOX.y} w={484} h={BOX.h} z={56} c="#141922" c2="#0D1219" bar="live avatar  ·  1080p">
      <div style={{ position: "absolute", inset: 0, top: 36, background: g("#2E3C56", "#161E2C") }} />
      <div style={{ opacity: stand, transform: `translateY(${(1 - stand) * 26}px)` }}>
        <Head x={148} y={72} s={1.10} live={talk} f={f} z={58} />
      </div>
      {/* the level meter — the tell that it is speaking, not a still */}
      <div style={{ position: "absolute", left: 22, right: 22, bottom: 54, height: 44 }}>
        {Array.from({ length: 30 }, (_, i) => {
          const h = talk ? 6 + Math.abs(Math.sin(f / 3.4 + i * 0.7)) * 36 : 4;
          return (<div key={i} style={{ position: "absolute", left: i * 14.7, bottom: 0, width: 9,
            height: h, borderRadius: 3, background: i % 5 === 4 ? "#7FD8B8" : "#5E7EA8" }} />);
        })}
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 40,
        background: "#0E131A", borderTop: "2px solid rgba(228,224,210,0.14)" }} />
      <div style={{ position: "absolute", left: 16, bottom: 12, fontFamily: MONO, fontWeight: 700,
        fontSize: 16, color: "#8A9299" }}>{"00:0" + Math.min(9, Math.floor(f / 8)) + " / 00:32"}</div>
      <div style={{ position: "absolute", right: 16, bottom: 12, fontFamily: MONO, fontWeight: 700,
        fontSize: 16, color: "#8A9299" }}>EN-US  ·  AVATAR 04</div>
    </Slab>
  </>);
};

/* ================================================================== 4 =====
   CODE GENERATION — an editor completes a function in ghost text.
   ======================================================================== */
export const SurfCode: React.FC<SurfaceP> = ({ f, pf, ff }) => {
  const LINES = [
    { t: "export async function retry(fn, tries = 3) {", k: 0 },
    { t: "  for (let i = 0; i < tries; i++) {", k: 1 },
    { t: "    try { return await fn() }", k: 1 },
    { t: "    catch (err) { if (i === tries - 1) throw err }", k: 1 },
    { t: "    await sleep(2 ** i * 100)", k: 2 },
    { t: "  }", k: 1 },
    { t: "}", k: 0 },
  ];
  const typed = E(f, 2, 44, 0, LINES.length, LIN);
  const done = ff >= 0 ? E(ff, 1, 10, 0, 1, OUT) : 0;
  return (<>
    {/* ⛔ ZERO EM DASHES ON SCREEN. This title bar shipped one; every other
        separator in the reel is a middot and this is now the same. */}
    <Slab {...BOX} z={50} c="#171C24" c2="#10141B" bar="retry.ts  ·  src/utils">
      {/* icon rail */}
      <div style={{ position: "absolute", left: 0, top: 36, bottom: 0, width: 52,
        background: "#12161D", borderRight: "2px solid rgba(220,226,218,0.10)" }} />
      {[0, 1, 2, 3, 4].map((i) => (
        <div key={"r" + i} style={{ position: "absolute", left: 16, top: 56 + i * 40, width: 20,
          height: 20, borderRadius: 4, background: i === 0 ? "#5E9AD8" : "#39424E" }} />
      ))}
      {/* file tree */}
      <div style={{ position: "absolute", left: 52, top: 36, bottom: 0, width: 176,
        background: "#141921", borderRight: "2px solid rgba(220,226,218,0.10)" }} />
      {["src", "  lib", "  utils", "   retry.ts", "  index.ts", "package.json"].map((t, i) => (
        <div key={"f" + i} style={{ position: "absolute", left: 66, top: 56 + i * 34,
          fontFamily: MONO, fontWeight: 700, fontSize: 17,
          color: i === 3 ? "#8ED0F0" : "#5C6675" }}>{t}</div>
      ))}
      {/* gutter + code */}
      <div style={{ position: "absolute", left: 228, top: 36, bottom: 0, width: 52,
        background: "#141921" }} />
      {LINES.map((l, i) => (
        <div key={"n" + i} style={{ position: "absolute", left: 242, top: 60 + i * 42,
          fontFamily: MONO, fontWeight: 700, fontSize: 20, color: "#4C5665" }}>{i + 1}</div>
      ))}
      {LINES.map((l, i) => {
        const ghost = i >= 3;
        const on = typed > i;
        const part = Math.max(0, Math.min(1, typed - i));
        const col = ["#C9A6E8", "#8ED0F0", "#F0C98A"][l.k];
        return (
          <div key={"l" + i} style={{ position: "absolute", left: 298, top: 58 + i * 42,
            fontFamily: MONO, fontWeight: 700, fontSize: 22, whiteSpace: "pre",
            color: ghost && !done ? "#5C6675" : col, opacity: on ? 1 : 0 }}>
            {l.t.slice(0, Math.round(l.t.length * part))}
          </div>
        );
      })}
      <Caret x={304} y={56 + Math.min(6, Math.floor(typed)) * 42} h={28} f={f} c="#8ED0F0" />
      {/* the accept bar + a status bar with details only real software carries */}
      <div style={{ position: "absolute", left: 298, bottom: 46, padding: "6px 14px",
        borderRadius: 6, background: done ? "#1E4A38" : "#242C38", fontFamily: MONO, fontWeight: 800,
        fontSize: 17, letterSpacing: "0.08em", color: done ? "#8FE0BC" : "#8A94A2" }}>
        {done ? "ACCEPTED  ·  TAB" : "SUGGESTION  ·  TAB TO ACCEPT"}
      </div>
      <div style={{ position: "absolute", left: 52, right: 0, bottom: 0, height: 34,
        background: "#0E131A", borderTop: "2px solid rgba(228,224,210,0.12)" }} />
      <div style={{ position: "absolute", left: 68, bottom: 8, fontFamily: MONO, fontWeight: 700,
        fontSize: 15, color: "#5A6472" }}>{"TypeScript  ·  UTF-8  ·  LF  ·  Ln 7, Col 2"}</div>
      <div style={{ position: "absolute", right: 16, bottom: 8, fontFamily: MONO, fontWeight: 700,
        fontSize: 15, color: "#5A6472" }}>{"0 problems"}</div>
    </Slab>
  </>);
};

/* ================================================================== 5 =====
   VIDEOS — a filmstrip fills and runs. (S9 is TRACKS; this one is FRAMES.)
   ======================================================================== */
export const SurfVideos: React.FC<SurfaceP> = ({ f, pf, ff }) => {
  const N = 6;
  /* ⛔ THE STRIP CANNOT BE MOSTLY EMPTY FOR MOST OF THE SCENE. The first pass
     filled 0 -> 4.4 frames across 36f, so the shot spent its first second as
     five black rectangles and one picture — dead area, and the exact "arrives
     then holds" failure inverted. It starts part-filled and finishes on the
     flip. */
  const play = ff >= 0 ? E(ff, 1, 16, 3.2, N, LIN) : E(f, -6, 40, 0, N * 0.62, LIN);
  return (<>
    <div style={{ position: "absolute", left: BOX.x, top: 158, width: BOX.w, height: 296, zIndex: 50 }}>
      {/* sprocket rails — what makes a strip a strip */}
      {[0, 1].map((r) => (
        <div key={r} style={{ position: "absolute", left: 0, right: 0, top: r ? 252 : 0, height: 44,
          background: "#171C22" }}>
          {Array.from({ length: 18 }, (_, i) => (
            <div key={i} style={{ position: "absolute", left: 14 + i * 49, top: 13, width: 24,
              height: 18, borderRadius: 3, background: "#0C1014" }} />
          ))}
        </div>
      ))}
      <div style={{ position: "absolute", left: 0, right: 0, top: 44, height: 208,
        background: "#0E1216" }} />
      {Array.from({ length: N }, (_, i) => {
        const on = play > i ? 1 : 0;
        const t = Math.max(0, Math.min(1, play - i));
        const hue = ["#E0A542", "#D5763C", "#C4573E", "#9E4A5C", "#6C4A72", "#3E4A78"][i];
        return (
          <div key={i} style={{ position: "absolute", left: 8 + i * 147, top: 50, width: 141,
            height: 196, background: "#141920", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: g(hue, "#161C26", 176),
              opacity: on }} />
            <div style={{ position: "absolute", left: 38, top: 30 + i * 15, width: 64, height: 64,
              borderRadius: 34, background: "#F6E0AE", opacity: on * 0.94 }} />
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 64,
              background: "#101823", opacity: on }} />
            {[0, 1, 2].map((k) => (
              <div key={k} style={{ position: "absolute", left: 0, right: 0, bottom: 14 + k * 17,
                height: 4, background: "#4A6288", opacity: on * 0.7 }} />
            ))}
            {!on && (
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center",
                justifyContent: "center", fontFamily: MONO, fontWeight: 800, fontSize: 18,
                color: "#3E4855" }}>{"· · ·"}</div>
            )}
            <div style={{ position: "absolute", left: 7, bottom: 5, fontFamily: MONO,
              fontWeight: 800, fontSize: 14, color: "#98A2B0" }}>{"0" + (i + 1)}</div>
            {on && t < 1 && (
              <div style={{ position: "absolute", left: 141 * t, top: 0, right: 0, bottom: 0,
                background: "#141920" }} />
            )}
          </div>
        );
      })}
    </div>
    {/* transport */}
    <div style={{ position: "absolute", left: BOX.x, top: 476, width: BOX.w, height: 44, zIndex: 52 }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 18, height: 9, borderRadius: 5,
        background: "#2A313C" }} />
      <div style={{ position: "absolute", left: 0, top: 18, height: 9, borderRadius: 5,
        width: (play / N) * BOX.w, background: "#6C8CC0" }} />
      <div style={{ position: "absolute", left: (play / N) * BOX.w - 10, top: 10, width: 20,
        height: 25, borderRadius: 4, background: "#E4E8EE" }} />
    </div>
    <Chip x={BOX.x} y={132} t="TEXT  →  6s CLIP" c="#2B3340" fg="#C7D2DC" />
    <Chip x={BOX.x + 720} y={132} t="720p  ·  24 fps" c="#2B3340" fg="#C7D2DC" />
  </>);
};

/* ================================================================== 6 =====
   IMAGE EDITING — a background is knocked out. This one REMOVES (S1 makes).
   ======================================================================== */
export const SurfEdit: React.FC<SurfaceP> = ({ f, pf, ff }) => {
  const wipe = E(f, 4, 38, 0, 1, IO);
  const lift = ff >= 0 ? E(ff, 2, 16, 0, 1, OUT) : 0;
  const Shoe: React.FC<{ z: number }> = ({ z }) => (<>
    <div style={{ position: "absolute", left: 268, top: 176, width: 268, height: 92,
      borderRadius: "22px 66px 14px 14px", background: "#D8623E", zIndex: z }} />
    <div style={{ position: "absolute", left: 268, top: 246, width: 268, height: 24,
      borderRadius: 10, background: "#F0EDE4", zIndex: z + 1 }} />
    <div style={{ position: "absolute", left: 308, top: 122, width: 132, height: 66,
      borderRadius: "50px 22px 0 0", background: "#E07A50", zIndex: z }} />
    {[0, 1, 2].map((i) => (
      <div key={i} style={{ position: "absolute", left: 328 + i * 32, top: 140 + i * 10,
        width: 58, height: 6, borderRadius: 3, background: "#F6E2D2", zIndex: z + 2 }} />
    ))}
  </>);
  return (<>
    <Slab {...BOX} z={50} c="#161B23" c2="#0F141B" bar="cutout.png  ·  1 layer">
      {/* the busy original */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 36, bottom: 44,
        background: g("#7C6A54", "#4A3E32", 176) }} />
      {Array.from({ length: 40 }, (_, i) => (
        <div key={"c" + i} style={{ position: "absolute", left: 14 + (i % 10) * 89,
          top: 56 + Math.floor(i / 10) * 82, width: 66, height: 66, borderRadius: 12,
          background: i % 3 ? "#8A7660" : "#6A5A48" }} />
      ))}
      {/* the transparency checkerboard, revealed by the wipe */}
      <div style={{ position: "absolute", left: 0, top: 36, bottom: 44, width: `${wipe * 100}%`,
        overflow: "hidden" }}>
        {Array.from({ length: 154 }, (_, i) => {
          const cx = i % 14, cy = Math.floor(i / 14);
          return (<div key={i} style={{ position: "absolute", left: cx * 64, top: cy * 54,
            width: 64, height: 54, background: (cx + cy) % 2 ? "#D8D5CC" : "#F0EEE6" }} />);
        })}
      </div>
      {/* the subject survives the wipe */}
      <div style={{ position: "absolute", inset: 0, transform: `translateY(${-lift * 26}px)` }}>
        <Shoe z={62} />
      </div>
      {lift > 0 && (
        <div style={{ position: "absolute", left: 268, top: 276, width: 268, height: 20,
          borderRadius: 10, background: "#0A0D12", opacity: lift * 0.40, zIndex: 60 }} />
      )}
      {/* the selection edge riding the wipe */}
      <div style={{ position: "absolute", left: `${wipe * 100}%`, top: 36, bottom: 44, width: 4,
        background: "#7FE0C0", zIndex: 66 }} />
      {/* the export bar */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 44,
        background: "#0E131A", borderTop: "2px solid rgba(228,224,210,0.14)", zIndex: 68 }} />
      <div style={{ position: "absolute", left: 18, bottom: 12, fontFamily: MONO, fontWeight: 700,
        fontSize: 17, color: "#8A9299", zIndex: 69 }}>
        {"BACKGROUND  " + Math.round(wipe * 100) + "%  REMOVED"}
      </div>
      <div style={{ position: "absolute", right: 18, bottom: 9, padding: "5px 14px", borderRadius: 6,
        background: lift > 0 ? "#1E4A38" : "#242C38", fontFamily: MONO, fontWeight: 800,
        fontSize: 16, color: lift > 0 ? "#8FE0BC" : "#8A94A2", zIndex: 69 }}>
        {lift > 0 ? "EXPORTED PNG" : "EXPORT PNG"}
      </div>
    </Slab>
  </>);
};

/* ================================================================== 7 =====
   SOCIAL SCHEDULING — a week grid fills with scheduled posts.
   ======================================================================== */
export const SurfSocial: React.FC<SurfaceP> = ({ f, pf, ff }) => {
  const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const SLOTS = [
    [0, 0, "09:00"], [1, 1, "12:30"], [2, 0, "09:00"], [3, 2, "18:00"],
    [4, 1, "12:30"], [5, 0, "10:00"], [6, 2, "19:00"], [1, 2, "17:45"], [3, 0, "08:30"],
  ] as Array<[number, number, string]>;
  const drop = E(f, 4, 42, 0, SLOTS.length, LIN);
  const more = ff >= 0 ? E(ff, 2, 12, 0, 1, OUT) : 0;
  const CW = 118, CH = 92;
  return (<>
    <Slab {...BOX} z={50} c="#181D26" c2="#11161E" bar="queue  ·  week of 10 aug">
      {DAYS.map((d, i) => (
        <div key={d} style={{ position: "absolute", left: 18 + i * (CW + 8), top: 46, width: CW,
          height: 30, borderRadius: 6, background: "#232A36", fontFamily: MONO, fontWeight: 800,
          fontSize: 16, letterSpacing: "0.10em", color: "#98A2AE", display: "flex",
          alignItems: "center", justifyContent: "center" }}>{d}</div>
      ))}
      {Array.from({ length: 21 }, (_, i) => (
        <div key={"e" + i} style={{ position: "absolute", left: 18 + (i % 7) * (CW + 8),
          top: 86 + Math.floor(i / 7) * (CH + 8), width: CW, height: CH, borderRadius: 10,
          background: "#1C222C", border: "2px dashed rgba(150,160,175,0.20)" }} />
      ))}
      {SLOTS.map(([d, r, t], i) => {
        const a = drop > i ? Math.min(1, (drop - i) * 1.6) : 0;
        if (a <= 0) return null;
        const col = ["#C0567A", "#3E86C8", "#3FA07A"][r];
        return (
          <div key={"s" + i} style={{ position: "absolute", left: 18 + d * (CW + 8),
            top: 86 + r * (CH + 8) - (1 - a) * 34, width: CW, height: CH, borderRadius: 10,
            background: col, opacity: a, boxShadow: SH, zIndex: 60 }}>
            <div style={{ position: "absolute", left: 9, top: 9, width: 22, height: 22,
              borderRadius: 6, background: "rgba(255,255,255,0.88)" }} />
            <div style={{ position: "absolute", left: 38, top: 12, fontFamily: MONO,
              fontWeight: 800, fontSize: 16, color: "#FFFFFF" }}>{t}</div>
            <div style={{ position: "absolute", left: 9, right: 9, top: 40, height: 30,
              borderRadius: 5, background: "rgba(255,255,255,0.22)" }} />
            {[0, 1].map((k) => (
              <div key={k} style={{ position: "absolute", left: 9, top: 76 + k * 0,
                width: k ? 40 : 74, height: 6, borderRadius: 3,
                background: "rgba(255,255,255,0.55)" }} />
            ))}
          </div>
        );
      })}
      {more > 0 && (
        <div style={{ position: "absolute", left: 18, right: 18, bottom: 10, height: 40,
          borderRadius: 8, background: "#1E4A38", opacity: more, display: "flex",
          alignItems: "center", paddingLeft: 18, fontFamily: MONO, fontWeight: 800, fontSize: 18,
          letterSpacing: "0.08em", color: "#8FE0BC", zIndex: 62 }}>
          3 ACCOUNTS CONNECTED  ·  NOTHING TO PAY
        </div>
      )}
    </Slab>
  </>);
};

/* ================================================================== 8 =====
   WEBSITE BUILDER — blocks stack into a page, and then it PUBLISHES.
   ⭐ the publish beat is this row's whole argument (a builder you cannot
      publish from is not free), so it is the loudest thing in the frame.
   ======================================================================== */
export const SurfSite: React.FC<SurfaceP> = ({ f, pf, ff }) => {
  const BLOCKS = [
    { h: 104, c: "#2E6EA8", k: "hero" }, { h: 44, c: "#3C4A5C", k: "nav" },
    { h: 82, c: "#43536A", k: "two-col" }, { h: 62, c: "#3C4A5C", k: "cards" },
  ];
  const stack = E(f, 3, 38, 0, BLOCKS.length, LIN);
  const live = ff >= 0 ? E(ff, 2, 14, 0, 1, OUT) : 0;
  const locked = pf >= 0 && ff < 0;
  let y = 88;
  return (<>
    <Slab {...BOX} z={50} c="#161B23" c2="#0F141B">
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 52,
        background: "#0E131A", borderBottom: "2px solid rgba(228,224,210,0.14)" }} />
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ position: "absolute", left: 16 + i * 22, top: 20, width: 12,
          height: 12, borderRadius: 6, background: ["#D5564A", "#E0A542", "#4CB98D"][i] }} />
      ))}
      <div style={{ position: "absolute", left: 96, top: 11, right: 160, height: 30, borderRadius: 8,
        background: locked ? "#33292A" : "#1D242E", display: "flex", alignItems: "center",
        paddingLeft: 14, fontFamily: MONO, fontWeight: 700, fontSize: 18,
        color: live > 0 ? "#8FE0BC" : locked ? "#D19289" : "#8A94A2" }}>
        {live > 0 ? "my-studio.lovable.app" : locked ? "PUBLISH  ·  LOCKED" : "localhost:3000"}
      </div>
      <div style={{ position: "absolute", right: 16, top: 11, width: 130, height: 30, borderRadius: 8,
        background: live > 0 ? "#1E4A38" : "#242C38", fontFamily: MONO, fontWeight: 800,
        fontSize: 16, letterSpacing: "0.10em", color: live > 0 ? "#8FE0BC" : "#8A94A2",
        display: "flex", alignItems: "center", justifyContent: "center" }}>
        {live > 0 ? "LIVE" : "PUBLISH"}
      </div>
      {BLOCKS.map((b, i) => {
        const a = stack > i ? Math.min(1, (stack - i) * 1.5) : 0;
        const top = y; y += b.h + 12;
        if (a <= 0) return null;
        return (
          <div key={i} style={{ position: "absolute", left: 28, right: 28, top: top - (1 - a) * 26,
            height: b.h, borderRadius: 10, background: b.c, opacity: a, zIndex: 56 }}>
            {i === 0 && (<>
              <div style={{ position: "absolute", left: 22, top: 24, width: 320, height: 18,
                borderRadius: 9, background: "rgba(255,255,255,0.88)" }} />
              <div style={{ position: "absolute", left: 22, top: 54, width: 470, height: 10,
                borderRadius: 5, background: "rgba(255,255,255,0.45)" }} />
              <div style={{ position: "absolute", left: 22, top: 74, width: 380, height: 10,
                borderRadius: 5, background: "rgba(255,255,255,0.32)" }} />
              <div style={{ position: "absolute", right: 22, top: 32, width: 118, height: 38,
                borderRadius: 8, background: "#F0EDE4" }} />
            </>)}
            {i === 2 && [0, 1].map((k) => (
              <div key={k} style={{ position: "absolute", left: 22 + k * 400, top: 14, width: 376,
                height: 54, borderRadius: 8, background: "rgba(255,255,255,0.16)" }} />
            ))}
            {i === 3 && [0, 1, 2, 3].map((k) => (
              <div key={k} style={{ position: "absolute", left: 22 + k * 196, top: 12, width: 178,
                height: 38, borderRadius: 8, background: "rgba(255,255,255,0.16)" }} />
            ))}
            <div style={{ position: "absolute", right: 10, bottom: 5, fontFamily: MONO,
              fontWeight: 800, fontSize: 13, letterSpacing: "0.10em",
              color: "rgba(255,255,255,0.55)" }}>{b.k}</div>
          </div>
        );
      })}
    </Slab>
  </>);
};

/* ================================================================== 9 =====
   VIDEO EDITING — an NLE timeline, and a WATERMARK that gets struck off.
   ⭐ the watermark IS the argument for this row; nothing else needs reading.
   ======================================================================== */
export const SurfNle: React.FC<SurfaceP> = ({ f, pf, ff }) => {
  const head = E(f, 2, 50, 0, 1, LIN);
  const mark = pf >= 0 && ff < 0 ? E(pf, 0, 6, 0, 1, OUT) : (ff >= 0 ? E(ff, 0, 8, 1, 0, OUT) : 0);
  const struck = ff >= 0 ? E(ff, 1, 9, 0, 1, OUT) : 0;
  return (<>
    {/* the media bin */}
    <Slab x={BOX.x} y={BOX.y} w={318} h={246} z={52} c="#161B23" c2="#0F141B" bar="media">
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: 14 + (i % 3) * 98, top: 50 + Math.floor(i / 3) * 92,
          width: 88, height: 78, borderRadius: 6, overflow: "hidden",
          background: ["#2E4468", "#54405E", "#3E5A4A", "#6A4438", "#334C60", "#5A4A2E"][i] }}>
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 18,
            background: "rgba(8,12,18,0.7)" }} />
          <div style={{ position: "absolute", left: 5, bottom: 3, fontFamily: MONO, fontWeight: 800,
            fontSize: 11, color: "#AEB8C4" }}>{"0" + (i + 1) + ".mp4"}</div>
        </div>
      ))}
    </Slab>
    {/* the programme monitor */}
    <Slab x={392} y={BOX.y} w={562} h={246} z={52} c="#12171E" c2="#0C1016" bar="programme">
      <div style={{ position: "absolute", inset: 0, top: 36, background: g("#3A5170", "#161F2C") }} />
      <div style={{ position: "absolute", left: 76, top: 76, width: 128, height: 128,
        borderRadius: 66, background: "#EEBC64" }} />
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 74,
        background: "#101923" }} />
      {[0, 1, 2].map((k) => (
        <div key={k} style={{ position: "absolute", left: 0, right: 0, bottom: 16 + k * 20,
          height: 5, background: "#4A6288", opacity: 0.65 }} />
      ))}
      {/* the watermark — a real one: repeated, diagonal, semi-opaque */}
      {mark > 0 && Array.from({ length: 9 }, (_, i) => (
        <div key={"wm" + i} style={{ position: "absolute", left: -40 + (i % 3) * 210,
          top: 54 + Math.floor(i / 3) * 74, fontFamily: inter.fontFamily, fontWeight: 900,
          fontSize: 38, color: "#FFFFFF", opacity: mark * 0.46, transform: "rotate(-20deg)",
          zIndex: 60, whiteSpace: "nowrap" }}>CapCut</div>
      ))}
      {struck > 0 && (
        <div style={{ position: "absolute", left: 28, right: 28, top: 128, height: 9,
          borderRadius: 5, background: "#4CB98D", zIndex: 64,
          transform: `scaleX(${struck})`, transformOrigin: "0% 50%" }} />
      )}
    </Slab>
    {/* the timeline: tracks, clips, a waveform, a playhead */}
    <Slab x={BOX.x} y={396} w={BOX.w} h={140} z={52} c="#161B23" c2="#0F141B">
      {["V2", "V1", "A1"].map((t, i) => (
        <div key={t} style={{ position: "absolute", left: 0, top: 6 + i * 44, width: 52, height: 38,
          background: "#1D242E", fontFamily: MONO, fontWeight: 800, fontSize: 15, color: "#8A94A2",
          display: "flex", alignItems: "center", justifyContent: "center" }}>{t}</div>
      ))}
      {[[70, 190], [300, 150]].map(([x, w2], i) => (
        <div key={"v2" + i} style={{ position: "absolute", left: x, top: 8, width: w2, height: 34,
          borderRadius: 5, background: "#8A5EA8", border: "2px solid #A87EC4" }} />
      ))}
      {[[62, 250], [320, 280], [610, 230]].map(([x, w2], i) => (
        <div key={"v1" + i} style={{ position: "absolute", left: x, top: 52, width: w2, height: 34,
          borderRadius: 5, background: "#2E6EA8", border: "2px solid #4E8ECA" }}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 6,
            background: "#8FC4F0" }} />
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 6,
            background: "#8FC4F0" }} />
        </div>
      ))}
      <div style={{ position: "absolute", left: 62, top: 96, width: 812, height: 36,
        borderRadius: 5, background: "#1E5244", border: "2px solid #2F7A62", overflow: "hidden" }}>
        {Array.from({ length: 100 }, (_, i) => {
          const h = 5 + Math.abs(Math.sin(i * 0.7) * Math.cos(i * 0.21)) * 26;
          return (<div key={i} style={{ position: "absolute", left: 4 + i * 8, top: 18 - h / 2,
            width: 4, height: h, borderRadius: 2, background: "#7FD8B8" }} />);
        })}
      </div>
      <div style={{ position: "absolute", left: 62 + head * 806, top: 2, bottom: 2, width: 3,
        background: "#E4E8EE", zIndex: 66 }} />
      <div style={{ position: "absolute", left: 62 + head * 806 - 10, top: 0, width: 23, height: 14,
        borderRadius: 3, background: "#E4E8EE", zIndex: 66 }} />
    </Slab>
  </>);
};

/* ================================================================== 10 ====
   VOICE GENERATION — a line is spoken, and a character quota fills up.
   ======================================================================== */
export const SurfVoice: React.FC<SurfaceP> = ({ f, pf, ff }) => {
  const speak = E(f, 4, 50, 0, 1, LIN);
  const quota = pf >= 0 ? E(pf, 0, 14, 0.34, 1, OUT) : 0.34;
  const reset = ff >= 0 ? E(ff, 2, 14, 1, 0.10, OUT) : -1;
  const q = reset >= 0 ? reset : quota;
  const BW = BOX.w - 300;
  return (<>
    <Slab {...BOX} z={52} c="#171C25" c2="#10151D" bar="text to speech  ·  en-US">
      {/* the voice card */}
      <div style={{ position: "absolute", left: 22, top: 54, width: 236, height: 316,
        borderRadius: 14, background: "#1F2734", border: "2px solid rgba(220,226,218,0.14)" }}>
        <div style={{ position: "absolute", left: 66, top: 24, width: 104, height: 104,
          borderRadius: 54, background: g("#6C7FA8", "#414F6C") }} />
        <div style={{ position: "absolute", left: 100, top: 50, width: 36, height: 52,
          borderRadius: 18, background: "#D8DEE8" }} />
        <div style={{ position: "absolute", left: 110, top: 108, width: 16, height: 14,
          borderRadius: 3, background: "#D8DEE8" }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 148, textAlign: "center",
          fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 25, color: "#E4E9F0" }}>Narrator</div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 180, textAlign: "center",
          fontFamily: MONO, fontWeight: 700, fontSize: 16, letterSpacing: "0.10em",
          color: "#7E8896" }}>WARM  ·  MALE  ·  32</div>
        {["STABILITY", "CLARITY", "STYLE"].map((t, i) => (
          <div key={t} style={{ position: "absolute", left: 20, top: 218 + i * 32, right: 20 }}>
            <div style={{ position: "absolute", left: 0, top: 8, right: 0, height: 6,
              borderRadius: 3, background: "#2A323E" }} />
            <div style={{ position: "absolute", left: 0, top: 8, width: `${[62, 84, 40][i]}%`,
              height: 6, borderRadius: 3, background: "#5E86C0" }} />
            <div style={{ position: "absolute", left: `${[62, 84, 40][i]}%`, top: 2, width: 16,
              height: 16, borderRadius: 9, background: "#D8DEE8" }} />
          </div>
        ))}
      </div>
      {/* the spoken waveform */}
      <div style={{ position: "absolute", left: 278, top: 62, right: 22, height: 200 }}>
        {Array.from({ length: 68 }, (_, i) => {
          const on = speak * 68 > i;
          const h = 8 + Math.abs(Math.sin(i * 0.62) * Math.cos(i * 0.19)) * 168;
          return (<div key={i} style={{ position: "absolute", left: i * (BW / 68), top: 100 - h / 2,
            width: Math.max(4, BW / 68 - 3), height: h, borderRadius: 3,
            background: on ? "#8FD0F0" : "#2A323E" }} />);
        })}
        <div style={{ position: "absolute", left: speak * BW, top: -6, bottom: -6, width: 3,
          background: "#E4E8EE" }} />
      </div>
      {/* the quota — the paywall drawn as a quantity, not as a word */}
      <div style={{ position: "absolute", left: 278, top: 290, right: 22, height: 22,
        borderRadius: 11, background: "#232B36" }} />
      <div style={{ position: "absolute", left: 278, top: 290, height: 22, borderRadius: 11,
        width: (BOX.w - 300) * q, background: q > 0.9 ? "#D5564A" : "#5E86C0" }} />
      <div style={{ position: "absolute", left: 278, top: 324, fontFamily: MONO, fontWeight: 800,
        fontSize: 18, letterSpacing: "0.08em", color: q > 0.9 ? "#E8A49C" : "#8A94A2" }}>
        {Math.round(q * 10000).toLocaleString() + "  /  10,000 CHARACTERS THIS MONTH"}
      </div>
    </Slab>
  </>);
};

export const SURFACES: Array<React.FC<SurfaceP>> = [
  SurfImage, SurfResearch, SurfAvatar, SurfCode, SurfVideos,
  SurfEdit, SurfSocial, SurfSite, SurfNle, SurfVoice,
];
