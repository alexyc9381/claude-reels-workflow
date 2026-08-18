import React from "react";
import { Img, staticFile } from "remotion";
import { inter } from "./fonts";
import { MONO } from "./SlopKit";
import {
  PLACES, Rake, Pool, Lamp, FILES, PROVIDERS,
  CLAY, GOLD, GREEN, RED, SKY, PAPER, INK, MUTE, TEAL, VIOLET, MINT,
  hexa, dkh, mxh, E, OUT, IO, LIN, SH, SH_D, rnd,
} from "./Pg3World";
import type { Place } from "./Pg3World";
import { Surface, Occluder, StreetLamp } from "./WorldKit";
import type { World } from "./WorldKit";

/* ===========================================================================
   REEL 109 · "PLUGINS3" — THE ELEVEN SETS.

   ⛔⛔ THE SET IS WORTH MORE THAN THE EFFECTS. Measured on reel 104: three
   rounds of hand-added scan bars, trolleys, travel bands and mid-scene events
   stalled at 7.68; rebuilding the SET as a dense, on-topic place cleared the
   bar in ONE pass (7.68 -> 9.65). Build the right room before adding motion to
   the wrong one.

   ⛔ EVERY SET CARRIES:
        4+ depth planes · one committed light direction · world props
        an `Occluder` mass CROPPED BY THE FRAME EDGE, in front of the action
        one background process that never stops
   ⛔ Two exteriors (`lane`, `gate`) use the promoted `WorldKit.Surface` depth
      engine rather than a hand-built gradient — the primitive nine reels
      shipped without, and the difference between a place and a backdrop.
   ========================================================================= */

export type SetKey = "bay" | "hold" | "shelf" | "bench" | "lane" | "grid"
                   | "gate" | "mint" | "void" | "drum" | "runlit";

export const placeFor = (k: SetKey): Place => PLACES[k];

/* ---------------------------------------------------------------------------
   THE INTERIOR SHELL — back wall, a mid band, floor, skirting, drifting grit,
   and a ceiling mass cropping the top. Four depth planes before a single prop.
   ------------------------------------------------------------------------ */
const Room: React.FC<{ p: Place; f: number; t?: number; band?: React.ReactNode;
  ceiling?: boolean }> = ({ p, f, t = 0, band, ceiling = true }) => (<>
  <div style={{ position: "absolute", inset: 0, zIndex: 1,
    background: `linear-gradient(176deg, ${p.back} 0%, ${p.back2} 100%)` }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: p.horizon, zIndex: 6 }}>
    {band}
  </div>
  <div style={{ position: "absolute", left: 0, right: 0, top: p.horizon, bottom: 0, zIndex: 14,
    background: `linear-gradient(184deg, ${p.floor} 0%, ${p.floor2} 100%)` }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: p.horizon - 9, height: 11,
    background: p.lip, zIndex: 15 }} />
  {/* the floor grit, drifting — the room never flatlines */}
  {Array.from({ length: 24 }, (_, i) => (
    <div key={"g" + i} style={{ position: "absolute",
      left: ((i * 101 + 30 - t * 0.55) % 1160) - 60,
      top: p.horizon + 24 + ((i * 53) % 9) * 26,
      width: 5 + (i % 3) * 4, height: 4, borderRadius: 2, background: p.grit,
      opacity: 0.38, zIndex: 16 }} />
  ))}
  {ceiling && (
    <div style={{ position: "absolute", left: 0, right: 0, top: -30, height: 96, zIndex: 90,
      background: `linear-gradient(180deg, ${dkh(p.back2, 0.22)} 0%, ${hexa(dkh(p.back2, 0.22), 0)} 100%)` }} />
  )}
</>);

/* the two exteriors, on the promoted depth engine */
const EXT: Record<"lane" | "gate", World> = {
  lane: { sky: "#24374C", sky2: "#0B1119", glow: "#B9D2EE", glowX: 812, glowY: 92, glowR: 74,
    b1: "#2A3E56", b2: "#203046", b3: "#172433", win: "#8FB6D8",
    ground: "#1C2734", ground2: "#0A0F16", lip: "#3A5473", grit: "#8AA6C4",
    horizon: 596, key: "#6FA8DC" },
  gate: { sky: "#4A1A1F", sky2: "#140508", glow: "#FF8A6E", glowX: 506, glowY: 118, glowR: 96,
    b1: "#48222A", b2: "#3A1A20", b3: "#2A1116", win: "#E4574A",
    ground: "#301418", ground2: "#100407", lip: "#6A2229", grit: "#A84A44",
    horizon: 588, key: "#E4574A" },
};

/* =========================================================================
   SET-LOCAL PROPS — the things that make each room the room it is.
   ====================================================================== */

/** ⭐ THE CRATE WALL — ~70 real objects, each carrying a REAL FILENAME. The VO
    says "scans your entire CODEBASE", so the wall IS the codebase. A crate with
    a generic glyph would be a CONTAINER (§3): it would say "there are files"
    and nothing else. `readTo` is how far the scan has swept; crates behind it
    stay OPEN and lit, so the room itself records the scan's progress. */
export const CrateWall: React.FC<{ f: number; x: number; y: number; cols?: number;
  rows?: number; readTo?: number; z?: number; s?: number }> =
  ({ f, x, y, cols = 9, rows = 4, readTo = -1, z = 20, s = 1 }) => (<>
    {Array.from({ length: cols * rows }, (_, i) => {
      const cx = i % cols, cy = Math.floor(i / cols);
      const px = x + cx * 106 * s, py = y + cy * 82 * s;
      const open = cx <= readTo;
      const lid = open ? Math.min(1, (readTo - cx + 1) * 0.9) : 0;
      const name = FILES[i % FILES.length];
      return (
        <div key={"cr" + i} style={{ position: "absolute", left: px, top: py, zIndex: z + cy }}>
          {/* the crate body */}
          <div style={{ width: 96 * s, height: 72 * s, borderRadius: 6 * s,
            background: open
              ? `linear-gradient(166deg,${mxh("#2C5C68", 0.30)} 0%,${dkh("#2C5C68", 0.14)} 100%)`
              : `linear-gradient(166deg,#1B3A44 0%,#0D2229 100%)`,
            border: `${3 * s}px solid ${open ? hexa(TEAL, 0.60) : "#123039"}`,
            boxShadow: SH }} />
          {/* the label — the real filename */}
          <div style={{ position: "absolute", left: 7 * s, top: 46 * s, width: 82 * s,
            height: 19 * s, borderRadius: 3 * s,
            background: open ? PAPER : "#16333C", display: "flex", alignItems: "center",
            justifyContent: "center", overflow: "hidden" }}>
            <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 10 * s,
              color: open ? INK : "#2E5763", whiteSpace: "nowrap" }}>{name}</span>
          </div>
          {/* the lid, hinged open once the beam has passed */}
          <div style={{ position: "absolute", left: 0, top: -4 * s, width: 96 * s,
            height: 16 * s, borderRadius: 4 * s, background: open ? hexa(TEAL, 0.85) : "#204852",
            transformOrigin: "50% 100%", transform: `rotateX(${lid * 62}deg) translateY(${-lid * 9 * s}px)` }} />
          {/* what the crate is holding, flaring as it is read */}
          {open && (
            <div style={{ position: "absolute", left: 22 * s, top: 10 * s, width: 52 * s,
              height: 28 * s, borderRadius: 3 * s, background: hexa("#DFF6F9", 0.30 + lid * 0.34) }} />
          )}
        </div>
      );
    })}
  </>);

/** the scan gantry — the travelling band AND the trigger, one object. It is a
    real machine: two legs, a truss, a lamp housing, and the beam it throws. */
export const Gantry: React.FC<{ f: number; x: number; top?: number; h?: number;
  z?: number; c?: string }> =
  ({ f, x, top = 96, h = 520, z = 46, c = TEAL }) => (<>
    {/* the beam it throws — a hard wedge, not a blur */}
    <div style={{ position: "absolute", left: x - 132, top: top + 52, width: 264, height: h,
      zIndex: z - 4, opacity: 0.34,
      clipPath: "polygon(40% 0, 60% 0, 100% 100%, 0 100%)",
      background: `linear-gradient(180deg, ${hexa(c, 0.95)} 0%, ${hexa(c, 0)} 100%)` }} />
    {/* the truss */}
    <div style={{ position: "absolute", left: x - 108, top, width: 216, height: 30, zIndex: z,
      borderRadius: 5, background: "#2A3B42", border: "3px solid #3E5A64", boxShadow: SH_D }} />
    {Array.from({ length: 6 }, (_, i) => (
      <div key={"tr" + i} style={{ position: "absolute", left: x - 100 + i * 34, top: top + 4,
        width: 4, height: 22, background: "#4E7080", zIndex: z + 1,
        transform: `skewX(${i % 2 ? 22 : -22}deg)` }} />
    ))}
    {/* the lamp housing */}
    <div style={{ position: "absolute", left: x - 44, top: top + 28, width: 88, height: 26,
      borderRadius: 6, background: "#1B282E", border: "3px solid #3E5A64", zIndex: z + 2 }} />
    <div style={{ position: "absolute", left: x - 34, top: top + 46, width: 68, height: 9,
      borderRadius: 4, background: c, zIndex: z + 3 }} />
    {/* the two legs, running to the floor */}
    <div style={{ position: "absolute", left: x - 112, top, width: 16, height: h + 40,
      background: "#22323A", zIndex: z - 1 }} />
    <div style={{ position: "absolute", left: x + 96, top, width: 16, height: h + 40,
      background: "#1B282E", zIndex: z - 1 }} />
  </>);

/** ⭐ THE DIVERTER — the machine that does the sorting, swinging to whichever
    chute the next candidate is bound for. S2 measured 9.19 with **83% HOLD**,
    the highest in the reel: twelve cards arriving is content, but between them
    nothing was running. A diverter is the background process this room should
    always have had, and it is diegetic — it is HOW a sorter sorts. */
export const Diverter: React.FC<{ f: number; x0: number; y: number; pitch: number;
  targets: number[]; ats: number[]; z?: number }> =
  ({ f, x0, y, pitch, targets, ats, z = 40 }) => {
  /* which chute it is currently swinging toward */
  let idx = 0;
  for (let i = 0; i < ats.length; i++) if (f >= ats[i] - 10) idx = i;
  const prev = Math.max(0, idx - 1);
  const k = E(f, ats[idx] - 10, ats[idx] - 2, 0, 1, IO);
  const tgt = targets[prev] + (targets[idx] - targets[prev]) * k;
  const cx = x0 + tgt * pitch + pitch * 0.5;
  const ang = (cx - 506) / 506 * 26;
  return (<>
    {/* the head that travels the rail */}
    <div style={{ position: "absolute", left: cx - 62, top: y - 26, width: 124, height: 34,
      borderRadius: 8, background: "linear-gradient(180deg,#B08A48 0%,#6A4A24 100%)",
      border: "3px solid #D6AE68", zIndex: z + 2, boxShadow: SH }} />
    {/* the arm it points with — a real drawn limb on a pivot, not a marker */}
    <div style={{ position: "absolute", left: cx - 7, top: y + 4, width: 14, height: 92,
      borderRadius: 7, background: "#D6AE68", zIndex: z + 1,
      transformOrigin: "50% 0%", transform: `rotate(${ang}deg)` }}>
      <div style={{ position: "absolute", left: -13, top: 74, width: 40, height: 22,
        borderRadius: 6, background: "#8E6536", border: "2px solid #D6AE68" }} />
    </div>
    {/* the rail it runs on */}
    <div style={{ position: "absolute", left: 0, right: 0, top: y - 34, height: 9,
      background: "#6A4A24", zIndex: z }} />
  </>);
};

/** the five sorting chutes — the skill's own five categories, as real furniture */
export const Chutes: React.FC<{ f: number; x: number; y: number; labels: readonly string[];
  z?: number; s?: number }> = ({ f, x, y, labels, z = 22, s = 1 }) => (<>
    {labels.map((t, i) => {
      const px = x + i * 186 * s;
      return (
        <div key={"ch" + i}>
          {/* ⛔ v4's chute was near-black on a brown wall and the cards landed
              ABOVE its mouth, so the scene read as loose cards floating over five
              disconnected labels. The throat is now a LIGHTER recess than the
              wall in front of it, with a lit back panel, so a cream card dropped
              into it reads against it — hierarchy is a VALUE GAP. */}
          <div style={{ position: "absolute", left: px, top: y, width: 158 * s, height: 268 * s,
            zIndex: z, borderRadius: `${10 * s}px ${10 * s}px ${6 * s}px ${6 * s}px`,
            background: `linear-gradient(176deg, ${hexa("#7A5A30", 0.96)} 0%, ${hexa("#2A1C0C", 0.98)} 100%)`,
            border: `${4 * s}px solid #A97C40` }} />
          {/* the back panel the cards stack against, lit from the lip */}
          <div style={{ position: "absolute", left: px + 10 * s, top: y + 10 * s, width: 138 * s,
            height: 244 * s, borderRadius: 6 * s, zIndex: z + 1,
            background: `linear-gradient(180deg, ${hexa("#F2D3A2", 0.34)} 0%, ${hexa("#F2D3A2", 0.04)} 100%)` }} />
          {/* the lit lip */}
          <div style={{ position: "absolute", left: px - 8 * s, top: y - 14 * s, width: 174 * s,
            height: 20 * s, borderRadius: 5 * s, background: "#A97C40", zIndex: z + 6 }} />
          <div style={{ position: "absolute", left: px + 2 * s, top: y - 7 * s, width: 154 * s,
            height: 7 * s, borderRadius: 4 * s, background: hexa("#FFEBC6", 0.86), zIndex: z + 7 }} />
          {/* the category plate — diegetic set dressing, NOT a text chip */}
          <div style={{ position: "absolute", left: px + 12 * s, top: y + 282 * s, width: 134 * s,
            height: 36 * s, borderRadius: 6 * s, background: PAPER, zIndex: z + 3,
            display: "flex", alignItems: "center", justifyContent: "center", boxShadow: SH }}>
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 18 * s,
              letterSpacing: "0.04em", color: INK }}>{t}</span>
          </div>
        </div>
      );
    })}
  </>);

/** the provider grid, dark until swept. ⛔ 12 real marks at 98px on WHITE tiles;
    the rest anonymous, because there are 290 and we can only name twelve. */
export const ProviderGrid: React.FC<{ f: number; x: number; y: number; cols?: number;
  rows?: number; sweep?: number; z?: number; s?: number }> =
  ({ f, x, y, cols = 10, rows = 6, sweep = -1, z = 22, s = 1 }) => (<>
    {Array.from({ length: cols * rows }, (_, i) => {
      const cx = i % cols, cy = Math.floor(i / cols);
      /* the twelve real marks are spread across the grid, not clustered */
      const real = (cx * 7 + cy * 3) % 4 === 0 ? PROVIDERS[((cx * 3 + cy * 5) % 12)] : null;
      const d = cx + cy * 0.42;
      const lit = sweep >= d ? 1 : 0;
      const px = x + cx * 78 * s, py = y + cy * 78 * s;
      if (real) return (
        <div key={"pv" + i} style={{ position: "absolute", left: px, top: py, zIndex: z + cy }}>
          <div style={{ width: 70 * s, height: 70 * s, borderRadius: 10 * s,
            background: lit ? "#FFFFFF" : "#12151B",
            border: `${2 * s}px solid ${lit ? "#E3DDCE" : "#1D222B"}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: lit ? SH : undefined }}>
            <Img src={staticFile("logos/" + real.logo)}
              style={{ width: 52 * s, height: 52 * s, objectFit: "contain",
                opacity: lit ? 1 : 0.10 }} />
          </div>
        </div>
      );
      /* ⛔ v6's unlit tile was #10131A on a #13161D wall — invisible, so the
         wall read as "eight logos floating in the dark" instead of "290
         providers, twelve of which we can name". The unlit state now has a
         readable value gap from the wall, and the lit state is a real panel
         face, so the SWEEP is a wall waking up rather than dots appearing. */
      return (
        <div key={"pv" + i} style={{ position: "absolute", left: px, top: py, zIndex: z + cy,
          width: 70 * s, height: 70 * s, borderRadius: 10 * s,
          background: lit
            ? `linear-gradient(168deg, ${hexa("#A8C8E8", 0.52)} 0%, ${hexa("#4E6E92", 0.46)} 100%)`
            : "linear-gradient(168deg, #262D38 0%, #171C24 100%)",
          border: `${2 * s}px solid ${lit ? hexa("#CFE4FA", 0.72) : "#333B48"}` }}>
          {/* a port on every tile, so a nameless provider is still an OBJECT */}
          <div style={{ position: "absolute", left: 16 * s, top: 26 * s, width: 38 * s,
            height: 8 * s, borderRadius: 4 * s,
            background: lit ? hexa("#F2F8FF", 0.78) : hexa("#4A5464", 0.55) }} />
          <div style={{ position: "absolute", left: 16 * s, top: 42 * s, width: 22 * s,
            height: 8 * s, borderRadius: 4 * s,
            background: lit ? hexa("#F2F8FF", 0.50) : hexa("#4A5464", 0.38) }} />
        </div>
      );
    })}
  </>);

/* =========================================================================
   THE ELEVEN SETS
   ====================================================================== */
export const SetFor: React.FC<{ k: SetKey; f: number; lightK?: number; arg?: number }> =
  ({ k, f, lightK = 1, arg = 0 }) => {
  const p = placeFor(k);
  const t = f;

  switch (k) {

    /* ---- S0 · THE BAY — the HOOK, and the ONLY set built to the frame-0
       brightness law. ⛔⛔ THE >=140 BAR IS FRAME 0 ONLY. Applying it to every
       scene cost ten reels 47% of their saturation and doubled their black
       point. So this room carries two big practicals and a lit board; every
       body set below stays dark and keeps its shadows. ------------------- */
    case "bay":
      return (<>
        <Room p={p} f={f} t={t} band={<SpareBoard f={f} />} />
        {/* the deck plating, in perspective — the third plane */}
        {Array.from({ length: 7 }, (_, i) => (
          <div key={"dk" + i} style={{ position: "absolute", left: -60 + i * 172,
            top: p.horizon + 6, width: 6, height: 300, background: hexa("#8A90A4", 0.30), zIndex: 17,
            transform: `skewX(${(i - 3) * 7}deg)` }} />
        ))}
        {/* the overhead strip that lights the rig — a practical, not a palette lift */}
        <div style={{ position: "absolute", left: 108, top: 250, width: 800, height: 14,
          borderRadius: 4, background: "#4E5878", zIndex: 34 }} />
        <div style={{ position: "absolute", left: 124, top: 262, width: 768, height: 9,
          borderRadius: 4, background: "#F9E3AE", zIndex: 35 }} />
        <Lamp x={506} y={270} bot={900} top={720} len={310} c="#F4D89E" o={0.30} z={22} f={f} />
        <Lamp x={840} y={110} bot={340} len={430} c={GOLD} o={0.20 * lightK} z={20} f={f + 30} />
        <Pool x={506} y={p.horizon + 10} w={720} c="#E8E2D0" o={0.30} z={18} />
        <Pool x={840} y={p.horizon + 16} w={470} c={GOLD} o={0.26 * lightK} z={18} />
        <Pool x={196} y={p.horizon + 18} w={470} c="#EFE8D6" o={0.22} z={18} />
        {/* the floor sheen — a SHAPED highlight that falls off, so the floor
            keeps a dark value at its edges */}
        <div style={{ position: "absolute", left: 0, right: 0, top: p.horizon, height: 270,
          zIndex: 17, background:
            "linear-gradient(180deg, rgba(251,246,233,0.54) 0%, rgba(251,246,233,0.24) 58%, rgba(251,246,233,0.06) 100%)" }} />
        <Rake f={f} y={0} h={792} n={8} c="#FCF4DE" speed={4.9} z={23} o={0.12} />
        <Occluder side="l" c="#333C5E" w={112} z={92} />
      </>);

    /* ---- S1 · THE CARGO HOLD — teal, mid-dark; the gantry brings the light. */
    case "hold":
      return (<>
        <Room p={p} f={f} t={t} band={<HoldRibs f={f} />} />
        {/* the running conveyor — the background process that never stops */}
        <div style={{ position: "absolute", left: 0, right: 0, top: p.horizon + 44, height: 46,
          background: "#0E262E", zIndex: 24, borderTop: "3px solid #205260" }} />
        {Array.from({ length: 16 }, (_, i) => (
          <div key={"bl" + i} style={{ position: "absolute",
            left: ((i * 84 - f * 4.2) % 1180) - 80, top: p.horizon + 52,
            width: 54, height: 30, borderRadius: 4, background: i % 2 ? "#1B4552" : "#14343E",
            border: "2px solid #2A6373", zIndex: 25 }} />
        ))}
        <Lamp x={210} y={80} bot={300} len={420} c={TEAL} o={0.15} z={20} f={f} />
        <Pool x={470} y={p.horizon + 20} w={540} c={TEAL} o={0.16} z={18} />
        <Rake f={f} y={0} h={792} n={8} c="#CFE9EE" speed={6.9} z={23} o={0.30} />
        <Occluder side="l" c="#08202A" w={96} kind="pole" z={92} />
        <Occluder side="r" c="#071C24" w={84} z={91} />
      </>);

    /* ---- S2 · THE SORTING SHELF — warm ochre, mid-bright ------------------ */
    case "shelf":
      return (<>
        <Room p={p} f={f} t={t} band={<ShelfWall f={f} />} />
        {/* the feed rail the candidates fly in along */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 176, height: 12,
          background: "#7A5528", zIndex: 19 }} />
        {Array.from({ length: 14 }, (_, i) => (
          <div key={"fr" + i} style={{ position: "absolute",
            left: ((i * 96 - f * 5.0) % 1200) - 80, top: 168,
            width: 40, height: 8, borderRadius: 4, background: hexa("#F2D3A2", 0.55), zIndex: 20 }} />
        ))}
        <Lamp x={300} y={70} bot={320} len={400} c="#E0925A" o={0.20} z={20} f={f} />
        <Lamp x={760} y={70} bot={280} len={400} c="#F2D3A2" o={0.15} z={20} f={f + 50} />
        <Pool x={470} y={p.horizon + 12} w={600} c="#E0925A" o={0.18} z={18} />
        <Rake f={f} y={0} h={792} n={8} c="#F7E0BC" speed={6.3} z={23} o={0.32} />
        <Occluder side="r" c="#2A1B0C" w={104} z={92} />
      </>);

    /* ---- S3 · THE BENCH — deep oxblood, one hard practical --------------- */
    case "bench":
      return (<>
        <Room p={p} f={f} t={t} band={<ToolWallSm f={f} />} />
        {/* the bench mass across the bottom third */}
        <div style={{ position: "absolute", left: -40, right: -40, top: p.horizon - 16,
          height: 128, background: "linear-gradient(180deg,#5A3730 0%,#2A1418 100%)",
          borderTop: "5px solid #7A4A3E", zIndex: 30 }} />
        <Lamp x={506} y={54} bot={360} top={90} len={430} c="#F3C79E" o={0.30 * lightK} z={20} f={f} />
        {/* two more practicals over the rack — ⛔ a PRACTICAL, never a palette
            lift: each one is a shaped pool that falls off, so the room keeps its
            dark value at the edges and only the rack ranks. */}
        <Lamp x={252} y={40} bot={300} top={70} len={400} c="#F3C79E" o={0.22 * lightK} z={20} f={f + 33} />
        <Lamp x={760} y={40} bot={300} top={70} len={400} c="#F3C79E" o={0.22 * lightK} z={20} f={f + 66} />
        <Pool x={506} y={p.horizon - 6} w={520} c="#E0A07A" o={0.26 * lightK} z={19} />
        <Pool x={506} y={430} w={760} c="#E0A07A" o={0.20 * lightK} z={19} />
        <Rake f={f} y={0} h={792} n={7} c="#F3C79E" speed={5.6} z={23} o={0.26} />
        <Occluder side="l" c="#1A0A0E" w={108} z={92} />
      </>);

    /* ---- S4 · THE ROAD — EXTERIOR, on the promoted depth engine ---------- */
    case "lane":
      return (<>
        <Surface w={EXT.lane} t={t * 0.7} stars overhead={false} litFar={0.42} />
        <RoadDeck f={f} p={p} c="#8AA6C4" />
        <StreetLamp x={166} y={560} h={230} c="#B9D2EE" z={34} on={1} />
        <StreetLamp x={846} y={584} h={210} c="#B9D2EE" z={34} on={1} />
        {/* ⛔ v10's road was the DARKEST body scene in the reel and the beat that
            happens on it — a coupling and a gauge climbing — was unreadable
            because of it. Three more practicals and a floor pool: the palette's
            dark stops are untouched, the light is added by lamps that are in the
            room. Hierarchy is still a value gap; a value gap you cannot see is
            just a dark frame. */}
        <Lamp x={846} y={392} bot={280} len={280} c="#B9D2EE" o={0.26} z={22} f={f} />
        <Lamp x={166} y={366} bot={300} len={300} c="#B9D2EE" o={0.24} z={22} f={f + 40} />
        <Lamp x={506} y={300} bot={620} top={200} len={330} c="#CFE2F6" o={0.20} z={22} f={f + 80} />
        <Pool x={506} y={p.horizon + 20} w={980} c="#CFE2F6" o={0.34} z={19} />
        <Pool x={846} y={p.horizon + 36} w={520} c="#E7D4A8" o={0.26} z={19} />
        <Pool x={200} y={p.horizon + 44} w={520} c="#CFE2F6" o={0.22} z={19} />
        <Rake f={f} y={0} h={792} n={7} c="#B9D2EE" speed={8.9} z={23} o={0.34} skew={-20} />
        <Occluder side="l" c="#080D14" w={106} z={92} />
      </>);

    /* ---- S5 · THE PROVIDER GRID — THE DARKEST SET, lit by its own marks -- */
    case "grid":
      return (<>
        <Room p={p} f={f} t={t} band={<PatchBack f={f} />} ceiling />
        {/* ⛔ deliberately near-black; the light ARRIVES with the tiles */}
        <Pool x={506} y={p.horizon + 8} w={460} c="#8FB6D8" o={0.10 * lightK} z={18} />
        <Rake f={f} y={0} h={792} n={7} c="#8FB6D8" speed={7.6} z={23} o={0.28} />
        <Occluder side="l" c="#05070A" w={118} z={92} />
        <Occluder side="r" c="#05070A" w={68} kind="pole" z={91} />
      </>);

    /* ---- S6 · THE LIMIT GATE — red-lit, hostile. The villain's one win. -- */
    case "gate":
      return (<>
        <Surface w={EXT.gate} t={t * 0.8} stars={false} overhead={false} litFar={0.30} />
        <RoadDeck f={f} p={p} c="#A84A44" />
        {/* the gantry the shutter hangs from — two towers, cropped by the frame */}
        <div style={{ position: "absolute", left: 24, top: 60, width: 62, height: 470,
          background: "linear-gradient(90deg,#4A2028 0%,#2A1014 100%)", zIndex: 44,
          border: "3px solid #6A2229" }} />
        <div style={{ position: "absolute", right: 24, top: 60, width: 62, height: 470,
          background: "linear-gradient(90deg,#2A1014 0%,#4A2028 100%)", zIndex: 44,
          border: "3px solid #6A2229" }} />
        <div style={{ position: "absolute", left: 24, right: 24, top: 60, height: 44,
          background: "#3A1A20", border: "3px solid #6A2229", zIndex: 45 }} />
        <Lamp x={506} y={100} bot={620} top={200} len={430} c="#FF7A62" o={0.24 * lightK} z={22} f={f} />
        <Rake f={f} y={0} h={792} n={7} c="#FFB4A0" speed={9.6} z={23} o={0.30} skew={-18} />
        <Occluder side="l" c="#0C0305" w={100} z={92} />
      </>);

    /* ---- S7 · THE MINTING HALL — gold, the BRIGHTEST body set. THE PEAK. - */
    case "mint":
      return (<>
        <Room p={p} f={f} t={t} band={<PoolChutes f={f} />} />
        {/* the collecting floor — a shallow basin the coins land in */}
        <div style={{ position: "absolute", left: -40, right: -40, top: p.horizon + 92,
          height: 200, borderRadius: "50% 50% 0 0 / 22% 22% 0 0", zIndex: 26,
          background: "linear-gradient(180deg,#8A6528 0%,#4A3210 100%)",
          borderTop: "6px solid #C79B4C" }} />
        <Lamp x={280} y={54} bot={340} len={440} c="#F7DFA8" o={0.24} z={20} f={f} />
        <Lamp x={740} y={54} bot={340} len={440} c="#F7DFA8" o={0.22} z={20} f={f + 40} />
        <Pool x={506} y={p.horizon + 30} w={700} c="#F4CE79" o={0.26} z={19} />
        <Rake f={f} y={0} h={792} n={9} c="#FFF0CC" speed={5.9} z={23} o={0.30} />
        <Occluder side="r" c="#241703" w={100} z={92} />
      </>);

    /* ---- S8 · THE VOID — cold grey, drained. The wipe. ------------------- */
    case "void":
      return (<>
        <Room p={p} f={f} t={t} band={<BlankBoard f={f} />} />
        <Lamp x={506} y={64} bot={300} top={80} len={470} c="#C6D4DE" o={0.20} z={20} f={f} />
        <Pool x={506} y={p.horizon + 14} w={460} c="#9FB0BE" o={0.16} z={18} />
        <Rake f={f} y={0} h={792} n={6} c="#C6D4DE" speed={4.3} z={23} o={0.20} />
        <Occluder side="l" c="#0A0D12" w={112} z={92} />
        <Occluder side="r" c="#0A0D12" w={74} kind="pole" z={91} />
      </>);

    /* ---- S9 · THE SPOOL ROOM — green/mint, mid-bright. The recall. ------- */
    case "drum":
      return (<>
        <Room p={p} f={f} t={t} band={<SpoolWall f={f} />} />
        {/* the return conveyor, running the OTHER way — the room is refilling */}
        <div style={{ position: "absolute", left: 0, right: 0, top: p.horizon + 40, height: 44,
          background: "#0A2A20", zIndex: 24, borderTop: "3px solid #1E5C46" }} />
        {Array.from({ length: 16 }, (_, i) => (
          <div key={"rb" + i} style={{ position: "absolute",
            left: ((i * 84 + f * 4.6) % 1180) - 80, top: p.horizon + 48,
            width: 54, height: 28, borderRadius: 4, background: i % 2 ? "#154534" : "#0E3327",
            border: "2px solid #22684F", zIndex: 25 }} />
        ))}
        <Lamp x={300} y={62} bot={320} len={420} c={MINT} o={0.20} z={20} f={f} />
        <Lamp x={740} y={62} bot={300} len={420} c="#CFF0E0" o={0.16} z={20} f={f + 44} />
        <Pool x={506} y={p.horizon + 16} w={580} c={MINT} o={0.18} z={18} />
        <Rake f={f} y={0} h={792} n={8} c="#CFF0E0" speed={6.6} z={23} o={0.30} />
        <Occluder side="r" c="#04170F" w={98} z={92} />
      </>);

    /* ---- S10 · THE RUN, LIT — amber, bright. The payoff. ----------------- */
    case "runlit":
      return (<>
        <Room p={p} f={f} t={t} band={<RunSkyline f={f} />} ceiling={false} />
        <RoadDeck f={f} p={p} c="#C79B62" fast />
        <Lamp x={230} y={70} bot={330} len={430} c="#F7DFA8" o={0.22} z={20} f={f} />
        <Lamp x={790} y={70} bot={330} len={430} c="#F7DFA8" o={0.20} z={20} f={f + 36} />
        <Pool x={506} y={p.horizon + 20} w={680} c="#F0C979" o={0.24} z={19} />
        <Rake f={f} y={0} h={792} n={9} c="#FFF0CC" speed={8.6} z={23} o={0.32} />
        <Occluder side="l" c="#241804" w={104} z={92} />
      </>);
  }
};

/* =========================================================================
   THE BACK-WALL BANDS — one per room, so no two rooms share a far wall.
   ====================================================================== */

/** S0 — a LIT board of spare cartridges, the stock the three come from.
    ⛔⛔ THIS IS THE ONLY BAND IN THE REEL BUILT BRIGHT, and it is the legitimate
    way to clear THE-OPEN law 1. `look_audit` blocked v2 at HOOK_LUMA 135.4 and
    v3 still read 140.9 — under the bar once the yuv420p encode takes its ~2
    points. The two sanctioned fixes are "add a practical light" and "brighten
    the SUBJECT"; the banned one is lifting the palette's dark stop, which is
    what cost ten reels 47% of their saturation. So the STOCK BOARD is lit like
    a stockroom with the lights on — a bright fascia, a full-width lamp bank and
    saturated cartridge faces at full opacity — and every body set below keeps
    its shadows untouched. Frame 0 measures ~148 source, ~146 delivered. */
const SpareBoard: React.FC<{ f: number }> = ({ f }) => (<>
  {/* the lit fascia behind the stock */}
  <div style={{ position: "absolute", left: 62, top: 96, width: 892, height: 340,
    borderRadius: 14, background: "linear-gradient(172deg,#C6CEE6 0%,#8E9AC2 100%)",
    border: "6px solid #E4E9F6", boxShadow: SH_D }} />
  {/* the stock itself — saturated faces, not tinted ghosts */}
  {Array.from({ length: 32 }, (_, i) => {
    const cx = i % 8, cy = Math.floor(i / 8);
    return (
      <div key={"sp" + i} style={{ position: "absolute", left: 92 + cx * 108, top: 122 + cy * 78,
        width: 88, height: 62, borderRadius: 7,
        background: [CLAY, SKY, GREEN, "#E7B24C"][(cx + cy) % 4],
        opacity: 0.62 + ((cx * 3 + cy) % 3) * 0.13,
        border: "2px solid rgba(16,20,34,0.30)" }}>
        <div style={{ position: "absolute", left: 8, top: 8, width: 58, height: 9,
          borderRadius: 5, background: "rgba(255,255,255,0.52)" }} />
      </div>
    );
  })}
  {/* the lamp bank over it — a real practical, full width, on its own clock */}
  <div style={{ position: "absolute", left: 62, top: 62, width: 892, height: 16,
    borderRadius: 6, background: "#7B87AE" }} />
  {Array.from({ length: 6 }, (_, i) => (
    <div key={"rl" + i} style={{ position: "absolute", left: 84 + i * 148, top: 74, width: 118,
      height: 13, borderRadius: 6,
      background: hexa("#FFF4D6", 0.70 + Math.sin(f / 11 + i * 1.7) * 0.26) }} />
  ))}
  {/* the light it throws down the fascia */}
  <div style={{ position: "absolute", left: 62, top: 88, width: 892, height: 250,
    background: "linear-gradient(180deg, rgba(255,248,228,0.56) 0%, rgba(255,248,228,0) 100%)" }} />
</>);

/** S1 — the hold's structural ribs, receding */
const HoldRibs: React.FC<{ f: number }> = ({ f }) => (<>
  {Array.from({ length: 6 }, (_, i) => (
    <div key={"rib" + i} style={{ position: "absolute", left: 40 + i * 168, top: 40,
      width: 26, height: 480, background: `linear-gradient(90deg,#1C4450 0%,#0C2028 100%)`,
      border: "2px solid #26606F", opacity: 0.7 }} />
  ))}
  <div style={{ position: "absolute", left: 0, right: 0, top: 40, height: 22,
    background: "#164048" }} />
</>);

/** S2 — the shelf's stock wall behind the chutes */
const ShelfWall: React.FC<{ f: number }> = ({ f }) => (<>
  {Array.from({ length: 5 }, (_, i) => (
    <div key={"sh" + i} style={{ position: "absolute", left: 0, right: 0, top: 66 + i * 82,
      height: 14, background: "#7A5528", opacity: 0.9 }} />
  ))}
  {Array.from({ length: 30 }, (_, i) => {
    const cx = i % 10, cy = Math.floor(i / 10);
    return (
      <div key={"bx" + i} style={{ position: "absolute", left: 14 + cx * 100, top: 22 + cy * 82,
        width: 74, height: 44, borderRadius: 4, background: cy % 2 ? "#4E3618" : "#5C401E",
        border: "2px solid #7A5528", opacity: 0.72 }} />
    );
  })}
</>);

/** S3 — a small tool wall, dark */
const ToolWallSm: React.FC<{ f: number }> = ({ f }) => (<>
  <div style={{ position: "absolute", left: 150, top: 96, width: 712, height: 260,
    background: "linear-gradient(172deg,#4A2A2E 0%,#2A1418 100%)", border: "4px solid #63363C",
    borderRadius: 8 }} />
  {Array.from({ length: 18 }, (_, i) => {
    const cx = i % 6, cy = Math.floor(i / 6);
    return (
      <div key={"tw" + i} style={{ position: "absolute", left: 178 + cx * 116, top: 124 + cy * 80,
        width: 24, height: 58, borderRadius: 4, background: "#8A5A4E", opacity: 0.6,
        transform: `rotate(${(cx + cy) % 3 === 0 ? -8 : 5}deg)` }} />
    );
  })}
</>);

/** S5 — the patch-panel back wall behind the provider grid */
const PatchBack: React.FC<{ f: number }> = ({ f }) => (<>
  {Array.from({ length: 40 }, (_, i) => {
    const cx = i % 10, cy = Math.floor(i / 10);
    return (
      <div key={"pb" + i} style={{ position: "absolute", left: 20 + cx * 100, top: 30 + cy * 62,
        width: 76, height: 34, borderRadius: 4, background: "#12161D",
        border: "2px solid #1D232C" }} />
    );
  })}
  {/* a few live ports blinking on their own clocks — the background process */}
  {Array.from({ length: 9 }, (_, i) => (
    <div key={"lp" + i} style={{ position: "absolute", left: 46 + (i % 5) * 200,
      top: 44 + Math.floor(i / 5) * 130, width: 12, height: 12, borderRadius: "50%",
      background: hexa("#8FB6D8", 0.25 + Math.abs(Math.sin(f / (9 + i * 2.3))) * 0.55) }} />
  ))}
</>);

/** S7 — the 43 pool chutes across the ceiling, each faced with a provider mark */
const PoolChutes: React.FC<{ f: number }> = ({ f }) => (<>
  <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 96,
    background: "linear-gradient(180deg,#3A280C 0%,#5A4018 100%)" }} />
  {Array.from({ length: 9 }, (_, i) => (
    <div key={"pc" + i} style={{ position: "absolute", left: 20 + i * 112, top: 78,
      width: 84, height: 62, borderRadius: `0 0 ${10}px ${10}px`,
      background: "linear-gradient(180deg,#8A6528 0%,#5A4018 100%)", border: "3px solid #C79B4C" }}>
      <div style={{ position: "absolute", left: 16, top: 10, width: 48, height: 48,
        borderRadius: 8, background: "#FFFFFF", display: "flex", alignItems: "center",
        justifyContent: "center", border: "2px solid #E3DDCE" }}>
        <Img src={staticFile("logos/" + PROVIDERS[i % PROVIDERS.length].logo)}
          style={{ width: 34, height: 34, objectFit: "contain" }} />
      </div>
    </div>
  ))}
</>);

/** S8 — the board, blank. What is left after a session ends. */
const BlankBoard: React.FC<{ f: number }> = ({ f }) => (<>
  <div style={{ position: "absolute", left: 130, top: 106, width: 752, height: 320,
    borderRadius: 10, background: "linear-gradient(172deg,#333B45 0%,#1C2229 100%)",
    border: "5px solid #444E5A" }} />
  {/* the ghosts of what used to be pinned there — four empty outlines */}
  {Array.from({ length: 4 }, (_, i) => (
    <div key={"gh" + i} style={{ position: "absolute", left: 176 + i * 176, top: 168,
      width: 132, height: 92, borderRadius: 8, border: "3px dashed #4A5561", opacity: 0.55 }} />
  ))}
</>);

/** S9 — a wall of session spools, turning */
const SpoolWall: React.FC<{ f: number }> = ({ f }) => (<>
  {Array.from({ length: 12 }, (_, i) => {
    const cx = i % 6, cy = Math.floor(i / 6);
    const rot = (f * (1.4 + (i % 3) * 0.5)) % 360;
    return (
      <div key={"sw" + i} style={{ position: "absolute", left: 46 + cx * 158, top: 74 + cy * 176,
        width: 108, height: 108, borderRadius: "50%",
        background: "radial-gradient(circle,#0B2E22 0%,#0B2E22 30%,#175440 32%,#123E30 100%)",
        border: "4px solid #22684F", transform: `rotate(${rot}deg)` }}>
        {[0, 1, 2].map((k) => (
          <div key={k} style={{ position: "absolute", left: 50, top: 8, width: 6, height: 44,
            background: hexa(MINT, 0.7), transformOrigin: "50% 100%",
            transform: `rotate(${k * 120}deg)` }} />
        ))}
      </div>
    );
  })}
</>);

/** S10 — a lit skyline behind the run */
const RunSkyline: React.FC<{ f: number }> = ({ f }) => (<>
  {Array.from({ length: 11 }, (_, i) => {
    const h = 120 + rnd(i, 7) * 190;
    return (
      <div key={"sk" + i} style={{ position: "absolute", left: -20 + i * 100,
        top: 574 - h, width: 86, height: h, background: i % 2 ? "#4A3418" : "#3A280F",
        border: "2px solid #5E4423" }}>
        {Array.from({ length: 6 }, (_, k) => (
          <div key={k} style={{ position: "absolute", left: 12 + (k % 3) * 24,
            top: 16 + Math.floor(k / 3) * 40, width: 16, height: 22,
            background: hexa("#F7DFA8", 0.3 + Math.abs(Math.sin(f / (13 + i) + k)) * 0.5) }} />
        ))}
      </div>
    );
  })}
</>);

/** the shared road deck — the travelling stripes under the rig.
    ⛔ light AND shadow alternating, never light-only. */
const RoadDeck: React.FC<{ f: number; p: Place; c: string; fast?: boolean }> =
  ({ f, p, c, fast = false }) => {
  const sp = fast ? 15 : 10;
  return (<>
    {/* the kerb rails, both sides, in perspective */}
    <div style={{ position: "absolute", left: 0, right: 0, top: p.horizon + 6, height: 10,
      background: hexa(c, 0.44), zIndex: 20 }} />
    {/* the centre stripes, travelling */}
    {Array.from({ length: 9 }, (_, i) => {
      const x = ((i * 132 - f * sp) % 1188) - 132;
      return (
        <div key={"st" + i} style={{ position: "absolute", left: x, top: p.horizon + 108,
          width: 82, height: 17, borderRadius: 4, background: hexa("#FFF3D4", 0.60), zIndex: 22 }} />
      );
    })}
    {/* the shadow band BETWEEN them — this is what keeps the black point down */}
    {Array.from({ length: 9 }, (_, i) => {
      const x = ((i * 132 - f * sp) % 1188) - 132 + 66;
      return (
        <div key={"sd" + i} style={{ position: "absolute", left: x, top: p.horizon + 108,
          width: 60, height: 17, borderRadius: 4, background: "rgba(4,6,11,0.52)", zIndex: 22 }} />
      );
    })}
    {/* the near shoulder, darker, cropping the bottom — the fourth plane */}
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 96,
      background: `linear-gradient(180deg,${hexa("#05070B", 0)} 0%,${hexa("#05070B", 0.62)} 100%)`,
      zIndex: 40 }} />
  </>);
};
