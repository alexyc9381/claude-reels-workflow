import React from "react";
import { Img, staticFile } from "remotion";
import { MONO } from "./SlopKit";
import { inter, fraunces } from "./fonts";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, mxh, dkh, SH, SH_D, rnd,
  CLAY, GOLD, GREEN, RED, SKY, PAPER, INK, MUTE, STEEL, STEELD, STEELL,
  CREAMP, CREAMD, CREAML, HAZARD, LAMPC, Hall, Spot, BackWall, Beam, Motes,
  MODULES, Tile,
} from "./PlgWorld";
import type { Place, Module } from "./PlgWorld";
import { TravelBand, Trolley, ScanBar, Sheen } from "./PlgProps";

/* ===========================================================================
   REEL 104 "PLUGIN" · THE THREE THEMES.

   ⛔⛔ WHY THIS FILE REPLACES THE FIRST FOUR CANDIDATES. Round 2 offered a pit
      wall, a hangar, a launch pad and a substation. Alex: *"it has to match the
      theme of the video."* He is right and it is a rule I already had:

        [[feedback_real_marks_are_the_props]] — "a metaphor for the MECHANISM is
        not the SUBJECT. Nothing in frame said AI, so the viewer had to decode
        plumbing before the topic arrived, and that decode costs the exact
        second the reel has to earn."

      That memory records reel 99 losing TWO worlds to this, both with correct
      mappings. A race car is not Claude. A rocket is not Claude. I reached for
      "interesting" and dropped "about the subject", which is the same trade
      that failed twice before.

   ⭐ THE FIX IS NOT A SAFER WORLD, IT IS A WORLD MADE OF THE SUBJECT'S OWN
      THINGS. Every set below is built out of objects that ARE software tooling:
      plugin boxes on a marketplace shelf, a machine that is the Claude mark
      itself, a rack of branded blades. The real logos are not decals on a prop,
      they are the FACE of the prop. Nothing needs translating, and the topic is
      legible in frame 0 with no narration.

   ⛔ AND ALL THREE STILL HAVE TO CLEAR THE ROUND-1 NOTE: the hero object is
      LARGE, something happens that MATTERS, and no scene is small objects doing
      small things in one room.
   ========================================================================= */

export type ThemeId = "mkt" | "mch" | "rck";

/* which scene role maps to which palette, per theme. The roles are the same in
   every theme so the choreography in PlgScenes never branches on set. */
export type Role = "hero" | "state" | "one" | "oneb" | "seat" | "two" | "three"
                 | "threeb" | "peak" | "cta";

export const THEME_PLACES: Record<ThemeId, Record<Role, Place>> = {
  /* ---- T1 · THE MARKETPLACE ------------------------------------------------
     The Claude Code plugin marketplace as a real place: floor-to-ceiling bays
     of plugin boxes, a counter, shelf tags. Warm oak, cream card, clay. */
  mkt: {
    hero:   { back: "#AE7F45", back2: "#805A2C", floor: "#D6B078", floor2: "#A88554",
              lip: "#EBC98E", key: LAMPC, horizon: 596, grit: "#AA7C42" },
    state:  { back: "#2F6068", back2: "#173C43", floor: "#3E7C82", floor2: "#22545A",
              lip: "#519195", key: "#CFE9E4", horizon: 582, grit: "#2C626A" },
    one:    { back: "#3C4C82", back2: "#212C55", floor: "#4A5C96", floor2: "#2C3A6C",
              lip: "#5D71AC", key: "#DCE2F5", horizon: 588, grit: "#374778" },
    oneb:   { back: "#3C4C82", back2: "#212C55", floor: "#4A5C96", floor2: "#2C3A6C",
              lip: "#5D71AC", key: "#DCE2F5", horizon: 588, grit: "#374778" },
    seat:   { back: "#8E5033", back2: "#582C18", floor: "#AE6C45", floor2: "#7D4726",
              lip: "#C8865B", key: "#F6DCC4", horizon: 596, grit: "#8F5432" },
    two:    { back: "#6E3239", back2: "#40191E", floor: "#8D4B49", floor2: "#602F2F",
              lip: "#A46059", key: "#F2D8A8", horizon: 572, grit: "#71363B" },
    three:  { back: "#2C5E4A", back2: "#153629", floor: "#39775B", floor2: "#204E3A",
              lip: "#49906E", key: "#DCEFDF", horizon: 592, grit: "#2C624B" },
    threeb: { back: "#2C5E4A", back2: "#153629", floor: "#39775B", floor2: "#204E3A",
              lip: "#49906E", key: "#DCEFDF", horizon: 592, grit: "#2C624B" },
    peak:   { back: "#F0E4C8", back2: "#CBB792", floor: "#B28E5C", floor2: "#82663E",
              lip: "#C9A77A", key: GOLD, horizon: 584, grit: "#B99A6E" },
    cta:    { back: "#8E6B3E", back2: "#573D1C", floor: "#B98D53", floor2: "#836134",
              lip: "#D3AB6E", key: "#F3E2BB", horizon: 590, grit: "#98703F" },
  },
  /* ---- T2 · THE MACHINE ----------------------------------------------------
     Claude itself at building scale, in a lit assembly hall. Steel, clay and
     safety yellow. The hero IS the mark. */
  mch: {
    hero:   { back: "#7098C6", back2: "#4E749E", floor: "#A8BEDC", floor2: "#8098BE",
              lip: "#CADAF0", key: "#EAF2F8", horizon: 600, grit: "#6B94C2" },
    state:  { back: "#37525F", back2: "#1D323C", floor: "#4A6C79", floor2: "#2C4855",
              lip: "#5D8291", key: "#D6ECF2", horizon: 584, grit: "#345060" },
    one:    { back: "#3A4A80", back2: "#202B54", floor: "#4A5C96", floor2: "#2C3A6C",
              lip: "#5D71AC", key: "#DCE2F5", horizon: 588, grit: "#354676" },
    oneb:   { back: "#3A4A80", back2: "#202B54", floor: "#4A5C96", floor2: "#2C3A6C",
              lip: "#5D71AC", key: "#DCE2F5", horizon: 588, grit: "#354676" },
    seat:   { back: "#93502F", back2: "#5C2C15", floor: "#B26C41", floor2: "#804724",
              lip: "#CC8857", key: "#F6DCC4", horizon: 596, grit: "#94542E" },
    two:    { back: "#6B3A2A", back2: "#3E1F15", floor: "#8B5340", floor2: "#5F3527",
              lip: "#A26A52", key: "#F2D8A8", horizon: 574, grit: "#6E3E2C" },
    three:  { back: "#2A5A52", back2: "#143430", floor: "#377468", floor2: "#1F4C44",
              lip: "#478E7E", key: "#DCEFEA", horizon: 592, grit: "#2A5F55" },
    threeb: { back: "#2A5A52", back2: "#143430", floor: "#377468", floor2: "#1F4C44",
              lip: "#478E7E", key: "#DCEFEA", horizon: 592, grit: "#2A5F55" },
    peak:   { back: "#EFE0C0", back2: "#C8B189", floor: "#AE8A58", floor2: "#7F633C",
              lip: "#C6A375", key: GOLD, horizon: 584, grit: "#B5966A" },
    cta:    { back: "#7C6440", back2: "#4C3A1E", floor: "#A98council".slice(0,7), floor2: "#7A5A30",
              lip: "#C6A166", key: "#F3E2BB", horizon: 590, grit: "#8A6B40" },
  },
  /* ---- T3 · THE RACK -------------------------------------------------------
     A dense compute bay: rows of rack units, cable looms, capacity columns.
     Cool graphite and cyan steel with clay accents. */
  rck: {
    hero:   { back: "#5FB0C6", back2: "#428A9E", floor: "#9CD2E0", floor2: "#72B2C6",
              lip: "#C4E8F2", key: "#DCEAF6", horizon: 600, grit: "#5AAABE" },
    state:  { back: "#26424E", back2: "#12262F", floor: "#37606E", floor2: "#1E3E4A",
              lip: "#4A7E8E", key: "#CFE9F2", horizon: 582, grit: "#254250" },
    one:    { back: "#2E3C70", back2: "#182248", floor: "#3C4E86", floor2: "#22305E",
              lip: "#4E62A0", key: "#DCE2F5", horizon: 588, grit: "#2B3A6C" },
    oneb:   { back: "#2E3C70", back2: "#182248", floor: "#3C4E86", floor2: "#22305E",
              lip: "#4E62A0", key: "#DCE2F5", horizon: 588, grit: "#2B3A6C" },
    seat:   { back: "#8A4A2C", back2: "#552814", floor: "#A96440", floor2: "#7A4222",
              lip: "#C48053", key: "#F6DCC4", horizon: 596, grit: "#8C4E2C" },
    two:    { back: "#5E3348", back2: "#361A28", floor: "#7C4A5E", floor2: "#542F3E",
              lip: "#93607A", key: "#F2D8E4", horizon: 574, grit: "#61374C" },
    three:  { back: "#26544A", back2: "#123029", floor: "#336C5E", floor2: "#1C463C",
              lip: "#438674", key: "#DCEFE6", horizon: 592, grit: "#26584C" },
    threeb: { back: "#26544A", back2: "#123029", floor: "#336C5E", floor2: "#1C463C",
              lip: "#438674", key: "#DCEFE6", horizon: 592, grit: "#26584C" },
    peak:   { back: "#E8E2D2", back2: "#BFB69E", floor: "#93A0AE", floor2: "#67717C",
              lip: "#AAB6C2", key: GOLD, horizon: 584, grit: "#A2AEBA" },
    cta:    { back: "#3E4A56", back2: "#232B34", floor: "#657280", floor2: "#414C58",
              lip: "#828F9D", key: "#DCEAF6", horizon: 590, grit: "#3B4652" },
  },
};
THEME_PLACES.mkt.hero.grit = "#966B38";
THEME_PLACES.mch.cta.floor = "#A9834E";

export const THEME_META: Record<ThemeId, { name: string; blurb: string }> = {
  mkt: { name: "THE MARKETPLACE", blurb: "bays of real plugin boxes, taken off the shelf" },
  mch: { name: "THE MACHINE",     blurb: "Claude itself at building scale, three bays in its chest" },
  rck: { name: "THE RACK",        blurb: "a compute bay, three branded blades sliding home" },
};

export const ThemeCtx = React.createContext<ThemeId>("mkt");
export const useTheme = () => React.useContext(ThemeCtx);
export const usePlaceT = (role: Role): Place => THEME_PLACES[useTheme()][role];

/* =========================================================================
   ⭐ THE PLUGIN BOX — T1's atom, and the reason the marketplace is on-theme.
   It is not a crate with a sticker: the box FACE is the real logo, the real
   repo name and the real star count, which is exactly what a marketplace
   listing is. Dozens of them make a wall that says "software" instantly.
   ====================================================================== */
export const PluginBox: React.FC<{ x: number; y: number; w?: number; h?: number; z?: number;
  logo?: string; name?: string; stars?: string; accent?: string; dim?: number; lean?: number }> =
  ({ x, y, w = 96, h = 132, z = 30, logo, name, stars, accent = "#7E8CA8", dim = 0, lean = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
    transform: lean ? `rotate(${lean}deg)` : undefined, transformOrigin: "50% 100%" }}>
    <div style={{ position: "absolute", inset: 0, borderRadius: 7,
      background: `linear-gradient(168deg, ${mxh(accent, 0.24 - dim * 0.2)} 0%, ${dkh(accent, 0.18 + dim * 0.3)} 100%)`,
      border: `3px solid ${dkh(accent, 0.40)}`, boxShadow: SH }} />
    {/* the spine highlight — it is a boxed product on a shelf */}
    <div style={{ position: "absolute", left: 4, top: 4, bottom: 4, width: 7, borderRadius: 4,
      background: hexa("#FFFFFF", 0.20 - dim * 0.14) }} />
    {logo && (
      <div style={{ position: "absolute", left: w * 0.5 - w * 0.30, top: h * 0.13,
        width: w * 0.60, height: w * 0.60, borderRadius: w * 0.13, background: "#FFFFFF",
        opacity: 1 - dim * 0.45, display: "flex", alignItems: "center", justifyContent: "center",
        border: `2px solid ${CREAMD}` }}>
        <Img src={staticFile(logo)} style={{ width: w * 0.44, height: w * 0.44, objectFit: "contain" }} />
      </div>
    )}
    {name && (
      <div style={{ position: "absolute", left: 6, right: 6, top: h * 0.60, textAlign: "center",
        fontFamily: MONO, fontWeight: 800, fontSize: Math.max(8, w * 0.108), lineHeight: 1.1,
        color: hexa("#FFFFFF", 0.94 - dim * 0.4), wordBreak: "break-all" }}>{name}</div>
    )}
    {stars && (
      <div style={{ position: "absolute", left: 6, right: 6, bottom: 8, textAlign: "center",
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: Math.max(9, w * 0.115),
        color: hexa(GOLD, 0.95 - dim * 0.4) }}>★ {stars}</div>
    )}
  </div>
);

/** a wall of them, deterministic, with the real marks salted through it */
const CL = "claude_logo.png";
/* ⛔ CLAUDE-DOMINANT BY DESIGN — 9 of 16 slots. Every box on this wall is a
   Claude Code plugin, so this is what the shelf would actually look like. */
const SHELF_MARKS = [CL, "logos/googlegemini.svg", CL, "logos/nvidia.svg", CL,
  "logos/vercel.svg", CL, "logos/github.svg", CL, "logos/groq.svg", CL,
  "logos/openrouter.svg", CL, "logos/huggingface.svg", CL, "logos/mistralai.svg"];
const SHELF_ACC = ["#7E8CA8", "#8A6F9E", "#6F8A72", "#9E7A5A", "#5F7E96", "#8E6A6A"];

export const BoxWall: React.FC<{ x: number; y: number; w: number; h: number; rows?: number;
  per?: number; z?: number; seed?: number; dim?: number; gap?: number }> =
  ({ x, y, w, h, rows = 4, per = 9, z = 20, seed = 5, dim = 0.25, gap = 16 }) => {
  const RH = h / rows, BW = (w - gap) / per;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z }}>
      {Array.from({ length: rows }, (_, r) => (
        <div key={"sr" + r} style={{ position: "absolute", left: 0, top: r * RH, width: w, height: RH }}>
          {/* the shelf board and its price rail — real furniture of a shop */}
          <div style={{ position: "absolute", left: -12, right: -12, bottom: 0, height: 13,
            background: dkh("#7A5C30", 0.24), borderRadius: 3, zIndex: 6, boxShadow: SH_D }} />
          <div style={{ position: "absolute", left: -12, right: -12, bottom: -5, height: 7,
            background: CREAMD, opacity: 0.55, zIndex: 7 }} />
          {Array.from({ length: per }, (_, i) => {
            const k = r * per + i;
            const hasLogo = (k * 7 + r) % 4 !== 3;
            return (
              <PluginBox key={"pb" + i} x={8 + i * BW} y={RH - 16 - (RH - 30)}
                w={BW - 10} h={RH - 26} z={5} dim={dim}
                accent={SHELF_ACC[(k + r) % SHELF_ACC.length]}
                logo={hasLogo ? SHELF_MARKS[(k * 3 + r) % SHELF_MARKS.length] : undefined}
                lean={(rnd(seed + r, i) - 0.5) * 2.6} />
            );
          })}
        </div>
      ))}
    </div>
  );
};

/* =========================================================================
   THE SET — one component per theme. Everything a scene needs behind its hero.
   ⛔ Each is built from objects that ARE software tooling, so the topic reads
      in frame 0 with no narration and nothing has to be translated.
   ====================================================================== */
/** the big diegetic CLAUDE CODE sign — the audience filter as a real object */
export const Fascia: React.FC<{ f: number; y?: number; s?: number; z?: number }> =
  ({ f, y = 128, s = 1, z = 44 }) => {
  const sw = Math.sin(f / 53) * 0.8;
  return (
    <div style={{ position: "absolute", left: 506 - 262 * s, top: y, width: 524 * s,
      height: 86 * s, zIndex: z, transformOrigin: "50% 0%", transform: `rotate(${sw}deg)` }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 14 * s, background: CREAML,
        border: `${5 * s}px solid ${CREAMD}`, boxShadow: SH_D, display: "flex",
        alignItems: "center", justifyContent: "center", gap: 16 * s, overflow: "hidden" }}>
        <div style={{ width: 58 * s, height: 58 * s, borderRadius: 14 * s, background: "#FFFFFF",
          border: `${3 * s}px solid ${CREAMD}`, flex: "0 0 auto", display: "flex",
          alignItems: "center", justifyContent: "center" }}>
          <Img src={staticFile("claude_logo.png")}
            style={{ width: 46 * s, height: 46 * s, objectFit: "contain" }} />
        </div>
        <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 46 * s,
          lineHeight: 1, letterSpacing: "-0.035em", color: "#22201A",
          whiteSpace: "nowrap" }}>CLAUDE CODE</span>
      </div>
      {[0.16, 0.84].map((k, i) => (
        <div key={"rd" + i} style={{ position: "absolute", left: 524 * s * k - 3 * s, top: -20 * s,
          width: 6 * s, height: 22 * s, background: dkh(STEEL, 0.34) }} />
      ))}
    </div>
  );
};

export const ThemeSet: React.FC<{ role: Role; p: Place; f: number; lightX?: number;
  wide?: boolean }> = ({ role, p, f, lightX = 0.44, wide = false }) => {
  const t = useTheme();
  const HZ = p.horizon;
  if (t === "mkt") return (<>
    <Hall p={p} f={f} lightX={lightX} floorLines={3} />
    {/* the aisle: bays of boxes either side, receding */}
    <BoxWall x={-24} y={140} w={430} h={330} rows={3} per={6} z={14} seed={3} dim={0.34} />
    <BoxWall x={606} y={140} w={430} h={330} rows={3} per={6} z={14} seed={8} dim={0.34} />
    {/* the aisle fascia — the audience filter, hung where a shop sign goes */}
    {role === "hero" && <Fascia f={f} y={130} s={0.94} z={44} />}
    <div style={{ position: "absolute", left: 356, top: 232, width: 300, height: 40, zIndex: 24,
      borderRadius: 8, background: CREAMP, border: `3px solid ${CREAMD}`, boxShadow: SH,
      display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ fontFamily: MONO, fontWeight: 800, fontSize: 18, letterSpacing: "0.10em",
        color: "#3A3226" }}>/plugin marketplace</span>
    </div>
    <TravelBand y={HZ + 46} h={18} f={f} speed={2.8} z={22} a="#D8BE8A" b="#8E6B38" pitch={42} />
  </>);
  if (t === "mch") return (<>
    <Hall p={p} f={f} lightX={lightX} floorLines={4} />
    <BackWall kind="girder" p={p} f={f} />
    <TravelBand y={122} h={19} f={f} speed={3.4} z={9} a="#B6BEC6" b="#68727C" pitch={38} />
    <Trolley y={144} f={f} period={188} z={11} w={168} h={52} hang={58} />
    <Spot x={162} y={-8} on={1} c="#EAF2F8" z={20} f={f} len={420} spread={360} />
    <Spot x={858} y={-8} on={1} c="#EAF2F8" z={20} f={f} len={420} spread={360} />
    {role === "hero" && <Fascia f={f} y={148} s={0.88} z={44} />}
    <div style={{ position: "absolute", left: -60, right: -60, top: HZ + 62, height: 16, zIndex: 19,
      background: `repeating-linear-gradient(74deg, ${HAZARD} 0 30px, ${dkh(HAZARD, 0.44)} 30px 60px)`,
      opacity: 0.56 }} />
  </>);
  /* rck */
  return (<>
    <Hall p={p} f={f} lightX={lightX} floorLines={3} />
    {/* rack rows either side, dense and crisp */}
    {[{ x: -30, s: 1 }, { x: 742, s: -1 }].map((c, ci) => (
      <div key={"rk" + ci} style={{ position: "absolute", left: c.x, top: 138, width: 300, height: 352,
        zIndex: 14, borderRadius: 8, background: `linear-gradient(174deg, ${mxh(p.back, 0.10)} 0%, ${dkh(p.back, 0.28)} 100%)`,
        border: `5px solid ${dkh(p.back, 0.38)}`, overflow: "hidden" }}>
        {Array.from({ length: 11 }, (_, i) => (
          <div key={"ru" + i} style={{ position: "absolute", left: 8, right: 8, top: 8 + i * 31,
            height: 25, borderRadius: 4, background: dkh(p.back, 0.14),
            border: `2px solid ${dkh(p.back, 0.34)}` }}>
            {/* status column — the only lit thing on an idle rack */}
            {Array.from({ length: 6 }, (_, k) => (
              <div key={k} style={{ position: "absolute", left: 8 + k * 13, top: 9, width: 7, height: 7,
                borderRadius: "50%",
                background: (i * 7 + k * 3 + ci) % 5 === 0 ? mxh(GREEN, 0.24) : dkh(p.back, 0.44) }} />
            ))}
            <div style={{ position: "absolute", right: 9, top: 8, width: 46, height: 9, borderRadius: 2,
              background: dkh(p.back, 0.40) }} />
          </div>
        ))}
      </div>
    ))}
    {/* the cable loom overhead — real infrastructure, and it travels */}
    <TravelBand y={124} h={22} f={f} speed={3.1} z={12} a="#8EA4B6" b="#465A6C" pitch={36} />
    <ScanBar y={138} h={356} f={f} period={92} z={26} c="#DCEAF6" o={0.16} w={280} />
    {role === "hero" && <Fascia f={f} y={150} s={0.88} z={44} />}
  </>);
};

/* =========================================================================
   ⭐⭐ THE HERO RIG — the one object that IS the payoff, per theme. Three empty
   bays at frame 0, three filled and lit at the peak. Same contract in all
   three; completely different object.
   ====================================================================== */
export const HeroRig: React.FC<{ x: number; y: number; f: number; s?: number; z?: number;
  seat?: [number, number, number]; lit?: [number, number, number]; label?: string }> =
  ({ x, y, f, s = 1, z = 60, seat = [0, 0, 0], lit = [0, 0, 0], label = "CLAUDE CODE" }) => {
  const t = useTheme();
  const S = (n: number) => n * s;
  const bay = (i: number, bx: number, by: number, bw: number, bh: number, accent: string) => {
    const st = Math.min(1, Math.max(0, seat[i]));
    const li = Math.min(1, Math.max(0, lit[i]));
    return (
      <div key={"hb" + i} style={{ position: "absolute", left: bx, top: by, width: bw, height: bh, zIndex: 6 }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: S(9),
          background: `linear-gradient(180deg, ${dkh(accent, 0.80)} 0%, ${dkh(accent, 0.62)} 100%)`,
          border: `${S(3)}px solid ${dkh(accent, 0.52)}` }} />
        <div style={{ position: "absolute", left: S(10), right: S(10), bottom: S(9), height: S(10),
          display: "flex", gap: S(5) }}>
          {Array.from({ length: 7 }, (_, k) => (
            <div key={k} style={{ flex: 1, borderRadius: S(2),
              background: li > 0.05 ? mxh(CLAY, 0.34) : dkh(STEEL, 0.30),
              opacity: li > 0.05 ? 0.6 + li * 0.4 : 0.55 }} />
          ))}
        </div>
        {st > 0.01 && (
          <div style={{ position: "absolute", left: S(6), top: S(6) + (1 - st) * bh * 1.2,
            width: bw - S(12), height: bh - S(12), borderRadius: S(7), zIndex: 3,
            opacity: Math.min(1, st * 2.4),
            background: `linear-gradient(168deg, ${mxh(MODULES[i].accent, 0.28)} 0%, ${MODULES[i].accent} 62%, ${dkh(MODULES[i].accent, 0.30)} 100%)`,
            border: `${S(3)}px solid ${dkh(MODULES[i].accent, 0.42)}`, boxShadow: SH }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: S(9), textAlign: "center",
              fontFamily: inter.fontFamily, fontWeight: 900, fontSize: S(17), letterSpacing: "0.03em",
              color: "#FFFFFF" }}>{MODULES[i].spoken}</div>
            <div style={{ position: "absolute", left: 0, right: 0, top: S(32), textAlign: "center",
              fontFamily: MONO, fontWeight: 700, fontSize: S(13), color: "#FFFFFF", opacity: 0.85 }}>
              ★ {MODULES[i].stars}
            </div>
          </div>
        )}
        {li > 0.05 && (
          <div style={{ position: "absolute", left: bw / 2 - S(70), top: -S(140), width: S(140),
            height: S(140), zIndex: 2, opacity: 0.30 * li,
            background: `linear-gradient(0deg, ${hexa(CLAY, 0.60)} 0%, transparent 78%)`,
            clipPath: "polygon(42% 100%, 58% 100%, 100% 0%, 0% 0%)" }} />
        )}
      </div>
    );
  };

  /* ---- T1: a marketplace COUNTER CONSOLE with three display bays --------- */
  if (t === "mkt") {
    const PW = S(660), PH = S(300);
    return (
      <div style={{ position: "absolute", left: x, top: y, width: PW, height: PH, zIndex: z }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: S(16),
          background: `linear-gradient(172deg, ${CREAML} 0%, ${CREAMP} 56%, ${mxh(CREAMD, 0.34)} 100%)`,
          border: `${S(5)}px solid ${CREAMD}`, boxShadow: SH_D }} />
        <div style={{ position: "absolute", left: S(24), top: S(20), width: S(104), height: S(104),
          borderRadius: S(24), background: "#FFFFFF", border: `${S(3)}px solid ${CREAMD}`, zIndex: 5,
          display: "flex", alignItems: "center", justifyContent: "center", boxShadow: SH }}>
          <Img src={staticFile("claude_logo.png")} style={{ width: S(80), height: S(80), objectFit: "contain" }} />
        </div>
        <div style={{ position: "absolute", left: S(142), top: S(26), zIndex: 5,
          fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: S(52), lineHeight: 1,
          letterSpacing: "-0.03em", color: "#24201A" }}>{label}</div>
        <div style={{ position: "absolute", left: S(144), top: S(84), zIndex: 5, fontFamily: MONO,
          fontWeight: 800, fontSize: S(17), letterSpacing: "0.12em", color: "#6A6052" }}>
          3 PLUGIN BAYS
        </div>
        {[0, 1, 2].map((i) => bay(i, S(30) + i * S(204), S(150), S(184), S(126), "#B6A88C"))}
        <Sheen x={0} y={0} w={PW} h={PH} f={f} period={190} z={9} o={0.12} />
      </div>
    );
  }

  /* ---- T2: CLAUDE ITSELF, at building scale. The mark IS the machine. ---- */
  if (t === "mch") {
    const BW = S(452), BH = S(330);
    return (
      <div style={{ position: "absolute", left: x, top: y, width: BW, height: BH, zIndex: z }}>
        {[S(46), S(316)].map((lx, i) => (
          <div key={"lg" + i} style={{ position: "absolute", left: lx, top: S(268), width: S(88),
            height: S(104), borderRadius: S(9),
            background: `linear-gradient(172deg, ${dkh(CLAY, 0.24)} 0%, ${dkh(CLAY, 0.46)} 100%)`,
            border: `${S(5)}px solid ${dkh(CLAY, 0.54)}` }} />
        ))}
        <div style={{ position: "absolute", left: 0, top: S(56), width: BW, height: S(222),
          borderRadius: S(20),
          background: `linear-gradient(166deg, ${mxh(CLAY, 0.26)} 0%, ${CLAY} 58%, ${dkh(CLAY, 0.30)} 100%)`,
          border: `${S(7)}px solid ${dkh(CLAY, 0.44)}`, boxShadow: SH_D }} />
        {/* the head, with the real mark cast into it at scale */}
        <div style={{ position: "absolute", left: S(122), top: 0, width: S(208), height: S(70),
          borderRadius: S(13),
          background: `linear-gradient(172deg, ${mxh(CLAY, 0.14)} 0%, ${dkh(CLAY, 0.26)} 100%)`,
          border: `${S(6)}px solid ${dkh(CLAY, 0.48)}` }} />
        {[S(160), S(252)].map((ex, i) => (
          <div key={"ey" + i} style={{ position: "absolute", left: ex, top: S(24), width: S(36),
            height: S(22), borderRadius: S(6), background: dkh(CLAY, 0.60) }} />
        ))}
        <div style={{ position: "absolute", left: S(146), top: S(70), width: S(160), height: S(46),
          borderRadius: S(10), background: "#FFFFFF", border: `${S(4)}px solid ${CREAMD}`, zIndex: 8,
          display: "flex", alignItems: "center", justifyContent: "center", gap: S(8), boxShadow: SH }}>
          <Img src={staticFile("claude_logo.png")} style={{ width: S(32), height: S(32), objectFit: "contain" }} />
          <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: S(21),
            color: "#22201A" }}>CLAUDE</span>
        </div>
        {[0, 1, 2].map((i) => bay(i, S(30) + i * S(136), S(128), S(120), S(132), CLAY))}
      </div>
    );
  }

  /* ---- T3: a RACK CHASSIS with three empty blade slots ------------------- */
  const RW = S(640), RH2 = S(316);
  return (
    <div style={{ position: "absolute", left: x, top: y, width: RW, height: RH2, zIndex: z }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: S(12),
        background: `linear-gradient(174deg, ${mxh("#4C5A68", 0.20)} 0%, ${dkh("#4C5A68", 0.30)} 100%)`,
        border: `${S(6)}px solid ${dkh("#4C5A68", 0.44)}`, boxShadow: SH_D }} />
      {/* the chassis label strip — a real rack has one */}
      <div style={{ position: "absolute", left: S(18), top: S(16), height: S(58), zIndex: 6,
        display: "flex", alignItems: "center", gap: S(12) }}>
        <div style={{ width: S(58), height: S(58), borderRadius: S(13), background: "#FFFFFF",
          border: `${S(3)}px solid ${CREAMD}`, display: "flex", alignItems: "center",
          justifyContent: "center", boxShadow: SH }}>
          <Img src={staticFile("claude_logo.png")} style={{ width: S(44), height: S(44), objectFit: "contain" }} />
        </div>
        <span style={{ fontFamily: MONO, fontWeight: 800, fontSize: S(26), letterSpacing: "0.06em",
          color: "#E6EEF6" }}>{label}</span>
      </div>
      {[0, 1, 2].map((i) => bay(i, S(24), S(92) + i * S(74), RW - S(48), S(62), "#5E6E7E"))}
    </div>
  );
};


/* =========================================================================
   ⭐⭐ THE FRAME-0 CLAIM BOARD — for the themes whose hero rig is not itself
   cream. [[feedback_frame0_claim_plate]] is the ONLY measured IG-performance
   rule in this repo: the AGENCY cuts that performed opened with a contiguous
   cream region >= 18% of the panel starting below y=120, carrying the Claude
   mark on a white tile >= 130px and a number in Fraunces >= 74px. T1's counter
   console satisfies that for free; T2 and T3 measured 9.8% and 9.6% cream
   without this, i.e. their brightest readable object at frame 0 was the shared
   header pill the audience has scrolled past a hundred times.
   ⛔ It is PANEL-local — it renders inside Scene, so no frame-coord offset.
   ====================================================================== */
export const ClaimBoard: React.FC<{ f: number; sub: string; x?: number; y?: number }> =
  ({ f, sub, x = 168, y = 452 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 676, height: 196, zIndex: 88 }}>
    <div style={{ position: "absolute", inset: 0, borderRadius: 18,
      background: `linear-gradient(172deg, ${CREAML} 0%, ${mxh(CREAMD, 0.42)} 100%)`,
      border: `6px solid ${CREAMD}`, boxShadow: SH_D }} />
    <div style={{ position: "absolute", left: 26, top: 28, width: 136, height: 136,
      borderRadius: 32, background: "#FFFFFF", border: `3px solid ${CREAMD}`, boxShadow: SH,
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 4 }}>
      <Img src={staticFile("claude_logo.png")} style={{ width: 106, height: 106, objectFit: "contain" }} />
    </div>
    <div style={{ position: "absolute", left: 182, top: 30, zIndex: 4, display: "flex",
      alignItems: "baseline", gap: 13 }}>
      <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 100,
        lineHeight: 0.86, letterSpacing: "-0.045em", color: "#22201A" }}>3</span>
      <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 39,
        color: "#3A3226" }}>PLUGINS</span>
    </div>
    <div style={{ position: "absolute", left: 184, top: 128, zIndex: 4, fontFamily: MONO,
      fontWeight: 800, fontSize: 18, letterSpacing: "0.12em", color: "#6A6052",
      whiteSpace: "nowrap" }}>{sub}</div>
    <Sheen x={0} y={0} w={676} h={196} f={f} period={190} z={8} o={0.12} />
  </div>
);
