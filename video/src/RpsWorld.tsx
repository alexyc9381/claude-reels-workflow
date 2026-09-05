import React from "react";
import { Img, staticFile } from "remotion";
import { Mascot } from "./SlopKit";
import {
  W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, rnd,
  Beam, Strip, Motes, Chip, Slug, Plate, BigNum, Contact, Edge, Scene, Cam,
  Mark, MarkPlate, MarkCast, CamCtx, PalCtx, dkh, mxh, idle, rock, shake, drift, squash,
  Rake, Runner, Ring, Puff, Pool, Steam, Sweat, Fall, Crew, Hero, Forearm,
  COSTUMES, costumeFor, vivid, lerpHex, mono, ui,
} from "./HwWorld";
import type { Place } from "./HwWorld";

/* ===========================================================================
   REEL 137 · "REPOS" — THE WORLD KIT.  Board: storyboards/137-repos.md.

   ⛔ THE CHASSIS IS CLONED, NOT REINVENTED. Everything above is re-exported
   from `HwWorld` verbatim — the Rake, the Runner, the four action loops on
   `Crew`, `Hero`, `Forearm`, the twelve costume levers, `Scene`/`Cam`. Only the
   PLACES, the LEDGER, the REPOS table and the props are new.

   ⭐ THE WORLD IS THE WORD THE SCRIPT TURNS ON: "UPGRADE" (spoken twice).
      THE SHOP — a tuning garage for Claudes. A hydraulic lift, chain hoists on
      a gantry, four bays each with its own bench and crew, a pegboard of tools,
      tyre stacks, oil drums, a roller door. A stock Claude rolls in, is lifted,
      and leaves with four parts bolted on. Warm matte interior: oatmeal
      concrete, brick, sodium lamps, one cold daylight door. ⛔ Never neon-on-
      black — this is not a screen world, so the neon default has nothing to
      pull on (feedback_arcade_world_means_neon_on_black).

   ⛔ FOUR SMALL VILLAINS, one per bay, each physical, each beaten once in its
      own bay and never before: THE JAM · THE CRAM · THE DIM CORE · THE EMPTY
      TANK. The hero is YOUR CLAUDE and he is never tinted; colour goes on the
      crew, the parts, the lamps and the tags.

   ⛔ THE HONESTY LEDGER IS `R` BELOW AND NOWHERE ELSE. Verified 2026-09-05
      against the GitHub API and each repo's README. If a figure is not in `R`
      it does not go on screen.
   ⛔ MATTE ONLY. No `boxShadow: 0 0 Npx` anywhere.
   ⛔ `dark()`/`mix()`/`lerpHex()` are hex-in/rgb-out and DO NOT NEST. dkh/mxh.
   ⛔ `Scene` push walks content off-frame: keep `left >= 506 - 486/push`.
   ⛔ A transformed wrapper with NO position/inset/zIndex is a CONTAINING BLOCK
      and its absolutely-positioned children vanish. Use `Cam`, or give the
      wrapper all three.
   ⛔ `Mascot` draws its body at ~100% of `size`. Sprite pitch >= 0.85 * size.
   ⛔ THE 40px FLOOR APPLIES TO MOVING OBJECTS: a 52px object is 12px after the
      audit's 1012->240 downsample.
   ========================================================================= */

export {
  W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, rnd,
  Beam, Strip, Motes, Chip, Slug, Plate, BigNum, Contact, Edge, Scene, Cam,
  Mark, MarkPlate, MarkCast, CamCtx, PalCtx, dkh, mxh, idle, rock, shake, drift, squash,
  Rake, Runner, Ring, Puff, Pool, Steam, Sweat, Fall, Crew, Hero, Forearm,
  COSTUMES, costumeFor, vivid, lerpHex, mono, ui,
};
export type { Place };

/* ---- the palette — the house matte set ---------------------------------- */
export const CLAY = "#D97757", CLAYD = "#B8501F", GOLD = "#E7B24C", GREEN = "#3F9E74";
export const RED = "#C44A3A", SKY = "#5AA0DE", PAPER = "#F7F5F0", CREAMB = "#F2EDE0";
export const INK = "#1A1813", MUTE = "#9A968B", TEAL = "#7FC0C9", STEEL = "#8E9299";
export const BRASS = "#C9A15A", SODIUM = "#E7A94C", VIOLET = "#8B72B0", EMBER = "#E06A2C";
export const OXIDE = "#8C4A2E", SLATE = "#4E5A62", COPPER = "#C87F4A", BONE = "#EFE7D4";
export const INDIGO = "#5B5FA8", OXBLOOD = "#5E2320", IRON = "#5A6068", CHROME = "#C9CFD4";
export const CONCRETE = "#B7AB92";

/* =========================================================================
   THE LEDGER — every label and numeral the picture is allowed to assert.
   Verified 2026-09-05: GitHub API for stars / licence / language, each README
   for what the tool does.
   ====================================================================== */
export const R = {
  count: 4,
  keyword: "REPOS",
  /** spoken "millions of free tokens every single day"; the README's own figure
      is what the frame shows. ⛔ Never a per-day number — that would be derived. */
  omniTokens: "~1.47B FREE TOKENS / MO",
  omniProviders: "352 PROVIDERS · 150+ FREE",
  omniModels: "1200+ MODELS",
  anydocMs: "SINGLE-DIGIT MS",
  anydocFormats: ["PPTX", "DOCX", "XLSX", "PDF", "EPUB", "CSV"] as const,
  herdrStates: ["WORKING", "BLOCKED", "IDLE"] as const,
  dshCmd: "npx @deepseek-ai/dsh web",
  dshClaim: "EVERYTHING IS A PLUGIN",
} as const;

/** ⭐⭐⭐ THE REPO TABLE — ONE SOURCE OF TRUTH FOR EVERY COLOUR AND MARK.
    The tag on the hoist, the bay lamp, the crew in that bay, the part's paint
    and the CTA rack all read out of this, so teal ALWAYS means anydoc and green
    ALWAYS means OmniRoute (feedback_colour_the_sprite_not_the_plate: colour is
    only information if it never changes meaning). */
export type Repo = {
  key: "anydoc" | "herdr" | "dsh" | "omni";
  name: string; repo: string; stars: number; starsStr: string; lic: string;
  c: string; c2: string; mark: string; markBg: string; part: "INTAKE" | "HUD" | "CORE" | "TANK";
  cos: number[]; place: string; tagName: string; tagSub: string;
  /* ⭐ GitHub's OWN fields, read from the API 2026-09-05 — the repo card is the subject's
     own object, not a garage tag with a badge on it (feedback_real_marks_are_the_props) */
  lang: string; langC: string; desc: string;
};
export const REPOS: Repo[] = [
  { key: "anydoc", name: "anydoc", repo: "firecrawl/anydoc", stars: 20397, starsStr: "20,397",
    lang: "Rust", langC: "#DEA584", desc: "Convert Word, PowerPoint, Excel, EPUB, CSV and PDF to clean Markdown.",
    lic: "MIT", c: "#7FC0C9", c2: "#2E7C86", mark: "firecrawl.png", markBg: "#FFFFFF",
    part: "INTAKE", cos: [0, 1, 4], place: "paper", tagName: "anydoc", tagSub: "MIT · GITHUB" },
  { key: "herdr", name: "herdr", repo: "herdrdev/herdr", stars: 35522, starsStr: "35,522",
    lang: "Rust", langC: "#DEA584", desc: "The runtime your coding agents live on.",
    lic: "Apache-2.0", c: "#E7B24C", c2: "#8A5F14", mark: "herdr.png", markBg: "#DADADA",
    part: "HUD", cos: [6, 7, 0], place: "cockpit", tagName: "herdr", tagSub: "APACHE-2.0 · GITHUB" },
  { key: "dsh", name: "deepseek-harness", repo: "deepseek-ai/deepseek-harness", stars: 213060,
    starsStr: "213,060", lang: "TypeScript", langC: "#3178C6", desc: "DeepSeek Harness: Everything is a Plugin.", lic: "MIT", c: "#8A8EE6", c2: "#3A3E8E", mark: "deepseek.svg",
    markBg: "#FFFFFF", part: "CORE", cos: [9, 1, 3], place: "engine", tagName: "DeepSeek", tagSub: "HARNESS · MIT · GITHUB" },
  { key: "omni", name: "OmniRoute", repo: "diegosouzapw/OmniRoute", stars: 61564, starsStr: "61,564",
    lang: "TypeScript", langC: "#3178C6", desc: "One endpoint, 352 providers, 1200+ models. Never stop coding.",
    lic: "MIT", c: "#5FBF8E", c2: "#2E7A52", mark: "omniroute.png", markBg: "#FFFFFF",
    part: "TANK", cos: [8, 0, 2], place: "fuel", tagName: "OmniRoute", tagSub: "MIT · GITHUB" },
];
export const repoBy = (k: Repo["key"]) => REPOS.find((r) => r.key === k) ?? REPOS[0];

/** the models OmniRoute's own README lists as providers — drawn on the manifold
    canisters as DESTINATIONS, never as rivals (135 did the same with tools). */
export const MODELS = [
  { n: "CLAUDE",   logo: "claude.svg",       c: "#D97757" },
  { n: "DEEPSEEK", logo: "deepseek.svg",     c: "#5786FE" },
  { n: "GEMINI",   logo: "googlegemini.svg", c: "#8E75B2" },
  { n: "QWEN",     logo: "qwen.svg",         c: "#6B5FD6" },
  { n: "MISTRAL",  logo: "mistralai.svg",    c: "#F26B1D" },
] as const;

/** ⛔ GUARDS. A grep for any of these over `Rps*.tsx` must return zero hits
    inside a rendered string.
    · MONEY: the VO states no price and no saving. No `$` string anywhere.
    · CLAIM: nothing spoken licenses a superlative or a benchmark. "god tier" is
      the VO's own phrase and lives only in the caption track.
    · PERDAY: the tokens figure is the README's per-MONTH figure; a per-day
      number would be derived and is banned. */
export const MONEY_BANNED = ["$", "/MO PRICE", "SAVE", "WORTH", "COSTS"] as const;
export const CLAIM_BANNED = ["BEST", "#1", "FASTEST", "BENCHMARK", "BEATS", "100%", "UNLIMITED"] as const;
export const PERDAY_BANNED = ["/ DAY", "PER DAY", "A DAY", "TOKENS / D"] as const;

/* ---- THE SEVEN PLACES ----------------------------------------------------
   ⛔ NEIGHBOURING SCENES DIFFER BY BOTH HUE AND LIGHTNESS. Visit order:
     floor    BRIGHT WARM oatmeal + pale brick   (frame 0 lives here, >=140)
     paper    BRIGHT COOL teal on paper          (BAY 1: the tag, the jam, the read)
     press    MID-DARK TEAL iron                 (BAY 1: the press)
     cockpit  DARK AMBER                         (BAY 2)
     engine   MID INDIGO                         (BAY 3)
     god      NEAR-DARK, one gold column         (the reveal)
     fuel     MID GREEN iron, one red lamp       (BAY 4)
     floor    again for the roll-out

   ⛔ BODY SCENES TARGET LUMA 70-105, SAT >= 34%, BLACK POINT p10 <= 35. The
   >=140 bar is FRAME 0 ONLY and `floor` is the only place built for it: a pale
   lit brick wall and a bright concrete floor carry the MEAN while the hero and
   the iron stay dark — brightness is the mean, hierarchy is the spread.
   ========================================================================= */
export const PLACES: Record<string, Place> = {
  floor:   { back: "#C6BBA8", back2: "#EDE6D7", floor: "#C7BCA4", floor2: "#786C5C",
             lip: "#2A241C", key: "#FFD98A", horizon: 470, grit: "#1A160F" },
  paper:   { back: "#3F6C74", back2: "#CDDBD9", floor: "#A3B3B1", floor2: "#4F6567",
             lip: "#152224", key: "#C4F0F4", horizon: 484, grit: "#0E1A1C" },
  press:   { back: "#1E3B42", back2: "#4A7A82", floor: "#3F5F66", floor2: "#1A2D32",
             lip: "#0B1517", key: "#9FE7EF", horizon: 496, grit: "#081214" },
  cockpit: { back: "#2A1B0C", back2: "#7A5326", floor: "#5B4322", floor2: "#25190A",
             lip: "#120B04", key: "#FFC978", horizon: 500, grit: "#130C05" },
  engine:  { back: "#1B1D48", back2: "#4A4E96", floor: "#3A3D74", floor2: "#1A1B3C",
             lip: "#0B0C22", key: "#B9BDFF", horizon: 492, grit: "#0A0B1E" },
  god:     { back: "#1A140A", back2: "#4E3C18", floor: "#3B2F15", floor2: "#160F06",
             lip: "#0B0704", key: "#FFE7A8", horizon: 470, grit: "#0C0804" },
  fuel:    { back: "#15302A", back2: "#3F7A64", floor: "#2D5747", floor2: "#122A22",
             lip: "#07130F", key: "#C6F0D8", horizon: 496, grit: "#07140F" },
};
export const asPlace = (k: keyof typeof PLACES): Place => PLACES[k];

/** the ground line the cast stands on, house-wide */
export const GY = 706;
/** ⛔ THE RESERVED PLATE BAND — nothing else enters panel y 112..210. */
export const BAND_Y = 132;
/** ⛔ THE SAFE BOX FOR ALL THREE CUTS — the intersection of the three cameras'
    visible windows (computed from CAM in RpsScenes: house s1.010 dx0 · amber
    s1.050 dx-46 · steel s1.055 dx+50 → x 128..862). */
export const SAFE3 = { x0: 128, x1: 862, cx: 495 } as const;

/* =========================================================================
   THE RIG — the hero WITH HIS PARTS.

   `Hero` is a closed component: its strain squash, drive and tremble live on
   one transformed div, so a part drawn as a SIBLING floats off him the moment
   he squashes under a load — which is exactly the beat where a part is landing
   on him. So the rig is Hero's own math (copied, not re-derived) with the four
   parts drawn INSIDE the same transform, in the mascot's 200-unit space.

   Mascot geometry, read off the SVG not assumed: viewBox 200x200 rendered at
   `size`; body rect x34..166, y44..146 (a 132x102 clay block); arms 26x26 at
   x8 / x166, y = 86 (raised by `cheer`); the head TOP is y44 → in pixels the
   body top sits at `foot - size*0.78`, the body bottom at `foot - size*0.27`,
   the hip line at `foot - size*0.36`, the shoulder at `foot - size*0.62`.

   Parts (each identified by 4-5 structural features, never by hue alone):
     INTAKE  a teal FUNNEL (trapezoid) over a ROLLER BOX with a PAPER SLOT and
             the Firecrawl flame badge — worn at the LEFT HIP
     HUD     a BOOM (mast) off the right shoulder carrying THREE small PANELS
             in a row with a status lamp each and the herdr ram badge — above
             the shoulder, never on the face
     CORE    a GLASS DOME on the head TOP holding a glowing brain core on a
             stem, a brass collar, the DeepSeek badge on the collar
     TANK    a CYLINDER on the back with two straps, a round GAUGE with a
             needle, a filler cap and a HOSE, the OmniRoute badge
   ====================================================================== */
export type Kit = { intake?: number; hud?: number; core?: number; tank?: number;
  coreLit?: number; gauge?: number; hudLamps?: number[]; hudOn?: number; cape?: number };

const PartBadge: React.FC<{ src: string; s: number; bg?: string }> = ({ src, s, bg = "#FFFFFF" }) => (
  <div style={{ position: "absolute", width: s, height: s, borderRadius: s * 0.24, background: bg,
    border: `${Math.max(1.5, s * 0.06)}px solid #E3D8C2`, display: "flex", alignItems: "center",
    justifyContent: "center", left: 0, top: 0 }}>
    <Img src={staticFile("logos/" + src)} style={{ width: s * 0.74, height: s * 0.74, objectFit: "contain" }} />
  </div>
);

/** the four parts, in the mascot's coordinate frame (0..200 → size). `u` is one
    mascot unit in pixels. Each part takes an `on` 0..1 that scales it up from
    its socket (an arrival), so a part can land while the hero squashes. */
export const Parts: React.FC<{ u: number; kit: Kit; f: number }> = ({ u, kit, f }) => {
  const { intake = 0, hud = 0, core = 0, tank = 0, coreLit = 1, gauge = 0.86, hudOn = 1, cape = 0 } = kit;
  const lamps = kit.hudLamps ?? [1, 1, 0];
  const anydoc = repoBy("anydoc"), herdr = repoBy("herdr"), dsh = repoBy("dsh"), omni = repoBy("omni");
  return (<>
    {/* TANK — behind the body (z below), two straps come over the shoulders */}
    {tank > 0.01 && (
      <div style={{ position: "absolute", left: 118 * u, top: 40 * u, width: 96 * u, height: 130 * u,
        zIndex: 1, transform: `scale(${tank})`, transformOrigin: "20% 50%" }}>
        <div style={{ position: "absolute", left: 30 * u, top: 6 * u, width: 60 * u, height: 118 * u,
          borderRadius: 30 * u, boxShadow: SH,
          background: `linear-gradient(90deg, ${dkh(omni.c2, 0.30)} 0%, ${omni.c2} 30%, ${mxh(omni.c, 0.10)} 55%, ${dkh(omni.c2, 0.20)} 100%)`,
          border: `${2 * u}px solid ${dkh(omni.c2, 0.5)}` }} />
        {/* filler cap */}
        <div style={{ position: "absolute", left: 50 * u, top: -6 * u, width: 22 * u, height: 16 * u,
          borderRadius: 4 * u, background: `linear-gradient(180deg, ${mxh(BRASS, 0.2)}, ${dkh(BRASS, 0.4)})` }} />
        {/* the gauge: a round face, a red band, a needle that MOVES */}
        <div style={{ position: "absolute", left: 38 * u, top: 44 * u, width: 44 * u, height: 44 * u,
          borderRadius: "50%", background: "#F4EEDC", border: `${3 * u}px solid ${dkh(BRASS, 0.3)}` }}>
          <div style={{ position: "absolute", left: "50%", top: "50%", width: 3 * u, height: 17 * u,
            marginLeft: -1.5 * u, marginTop: -15 * u, background: "#1A1813", transformOrigin: "50% 88%",
            transform: `rotate(${-120 + 240 * Math.max(0, Math.min(1, gauge))}deg)`, borderRadius: 2 }} />
          <div style={{ position: "absolute", left: 4 * u, top: 26 * u, width: 10 * u, height: 4 * u,
            background: RED, borderRadius: 2, transform: "rotate(50deg)" }} />
          <div style={{ position: "absolute", left: "50%", top: "50%", width: 6 * u, height: 6 * u,
            marginLeft: -3 * u, marginTop: -3 * u, borderRadius: "50%", background: dkh(BRASS, 0.2) }} />
        </div>
        {/* the hose, coiled once, ending at the hip */}
        <div style={{ position: "absolute", left: 6 * u, top: 96 * u, width: 60 * u, height: 26 * u,
          border: `${5 * u}px solid ${dkh(omni.c2, 0.44)}`, borderRadius: "50%", borderTopColor: "transparent" }} />
        <div style={{ position: "absolute", left: 84 * u, top: 100 * u }}><PartBadge src={omni.mark} s={18 * u} /></div>
      </div>
    )}
    {/* CAPE — behind the body, hangs from the shoulders, flaps on its own clock */}
    {cape > 0.01 && (
      <div style={{ position: "absolute", left: 30 * u, top: 60 * u, width: 140 * u, height: 150 * u * cape,
        zIndex: 0, transformOrigin: "50% 0%", transform: `rotate(${Math.sin(f / 7) * 2.6}deg) skewX(${Math.sin(f / 9) * 4}deg)`,
        borderRadius: `0 0 ${20 * u}px ${20 * u}px`,
        background: `linear-gradient(180deg, ${mxh(GOLD, 0.16)} 0%, ${GOLD} 40%, ${dkh(GOLD, 0.34)} 100%)`,
        clipPath: "polygon(0 0, 100% 0, 96% 100%, 62% 90%, 50% 100%, 38% 90%, 4% 100%)" }} />
    )}
    {/* INTAKE — at the left hip: funnel, roller box, slot, flame badge */}
    {intake > 0.01 && (
      <div style={{ position: "absolute", left: -46 * u, top: 96 * u, width: 90 * u, height: 84 * u,
        zIndex: 3, transform: `scale(${intake})`, transformOrigin: "100% 50%" }}>
        <div style={{ position: "absolute", left: 6 * u, top: 0, width: 72 * u, height: 30 * u,
          background: `linear-gradient(180deg, ${mxh(anydoc.c, 0.30)}, ${anydoc.c2})`,
          clipPath: "polygon(0 0, 100% 0, 78% 100%, 22% 100%)", border: `${1.5 * u}px solid ${dkh(anydoc.c2, 0.4)}` }} />
        <div style={{ position: "absolute", left: 14 * u, top: 28 * u, width: 56 * u, height: 40 * u,
          borderRadius: 6 * u, boxShadow: SH,
          background: `linear-gradient(180deg, ${mxh(anydoc.c2, 0.16)}, ${dkh(anydoc.c2, 0.28)})`,
          border: `${2 * u}px solid ${dkh(anydoc.c2, 0.5)}` }}>
          {[0, 1].map((i) => (
            <div key={i} style={{ position: "absolute", left: 8 * u + i * 22 * u, top: 8 * u, width: 18 * u,
              height: 18 * u, borderRadius: "50%", background: `conic-gradient(${CHROME} 0 25%, ${dkh(CHROME, 0.4)} 25% 50%, ${CHROME} 50% 75%, ${dkh(CHROME, 0.4)} 75%)`,
              transform: `rotate(${f * (i ? -14 : 14)}deg)` }} />
          ))}
        </div>
        <div style={{ position: "absolute", left: 22 * u, top: 70 * u, width: 40 * u, height: 8 * u,
          background: "#F4EEDC", borderRadius: 2 * u, border: `${1.5 * u}px solid ${dkh(anydoc.c2, 0.4)}` }} />
        <div style={{ position: "absolute", left: 58 * u, top: 44 * u }}><PartBadge src={anydoc.mark} s={20 * u} /></div>
      </div>
    )}
    {/* HUD — a boom off the right shoulder carrying three panels above the head line */}
    {hud > 0.01 && (
      <div style={{ position: "absolute", left: 150 * u, top: -46 * u, width: 110 * u, height: 130 * u,
        zIndex: 4, transform: `scale(${hud})`, transformOrigin: "10% 100%" }}>
        <div style={{ position: "absolute", left: 6 * u, top: 40 * u, width: 8 * u, height: 92 * u,
          background: `linear-gradient(90deg, ${mxh(IRON, 0.3)}, ${dkh(IRON, 0.3)})`, borderRadius: 3 * u }} />
        <div style={{ position: "absolute", left: 6 * u, top: 40 * u, width: 96 * u, height: 8 * u,
          background: `linear-gradient(180deg, ${mxh(IRON, 0.3)}, ${dkh(IRON, 0.3)})`, borderRadius: 3 * u }} />
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ position: "absolute", left: (8 + i * 32) * u, top: 8 * u, width: 30 * u,
            height: 30 * u, borderRadius: 4 * u, background: "#F6F1E4", boxShadow: SH,
            border: `${2 * u}px solid ${dkh(herdr.c2, 0.2)}`, opacity: hudOn }}>
            {[0, 1, 2].map((k) => (
              <div key={k} style={{ position: "absolute", left: 5 * u, top: (7 + k * 6) * u, width: (18 - k * 5) * u,
                height: 2.6 * u, background: hexa(INK, 0.5), borderRadius: 1 }} />
            ))}
            <div style={{ position: "absolute", right: 3 * u, top: 3 * u, width: 6 * u, height: 6 * u,
              borderRadius: "50%", background: lamps[i] > 0.5 ? GREEN : lamps[i] < 0 ? RED : MUTE }} />
          </div>
        ))}
        <div style={{ position: "absolute", left: 76 * u, top: 50 * u }}>
          <PartBadge src={herdr.mark} s={18 * u} bg={herdr.markBg} />
        </div>
      </div>
    )}
    {/* CORE — a glass dome on the head top with the brain core inside */}
    {core > 0.01 && (
      <div style={{ position: "absolute", left: 52 * u, top: -20 * u, width: 96 * u, height: 70 * u,
        zIndex: 5, transform: `scale(${core})`, transformOrigin: "50% 100%" }}>
        {/* brass collar sits ON the head top (y44) */}
        <div style={{ position: "absolute", left: 0, top: 56 * u, width: 96 * u, height: 12 * u,
          borderRadius: 4 * u, background: `linear-gradient(180deg, ${mxh(BRASS, 0.24)}, ${dkh(BRASS, 0.34)})`,
          border: `${1.5 * u}px solid ${dkh(BRASS, 0.5)}` }} />
        {/* the dome — glass, a highlight arc, the core visible through it */}
        <div style={{ position: "absolute", left: 6 * u, top: 0, width: 84 * u, height: 58 * u,
          borderRadius: `${42 * u}px ${42 * u}px 4px 4px`, overflow: "hidden",
          background: `linear-gradient(180deg, ${hexa("#DDF1FF", 0.34)} 0%, ${hexa("#8FB4CC", 0.22)} 100%)`,
          border: `${2 * u}px solid ${hexa("#CFE6F2", 0.7)}` }}>
          <div style={{ position: "absolute", left: 30 * u, top: 16 * u, width: 24 * u, height: 24 * u,
            borderRadius: "50%", opacity: 0.35 + 0.65 * coreLit,
            background: `radial-gradient(circle at 40% 36%, ${mxh(dsh.c, 0.5)} 0%, ${dsh.c} 42%, ${dkh(dsh.c2, 0.2)} 100%)`,
            transform: `scale(${0.7 + 0.3 * coreLit + Math.sin(f / 5) * 0.05 * coreLit})` }} />
          <div style={{ position: "absolute", left: 40 * u, top: 40 * u, width: 4 * u, height: 16 * u,
            background: dkh(BRASS, 0.3) }} />
          <div style={{ position: "absolute", left: 14 * u, top: 6 * u, width: 22 * u, height: 8 * u,
            borderRadius: 6 * u, background: hexa("#FFFFFF", 0.5), transform: "rotate(-24deg)" }} />
        </div>
        <div style={{ position: "absolute", left: 74 * u, top: 50 * u }}><PartBadge src={dsh.mark} s={16 * u} /></div>
      </div>
    )}
  </>);
};

/** ⭐⭐ THE HERO, WITH HIS PARTS RIDING HIS OWN SQUASH. Hero's math, copied. */
export const Rig: React.FC<{ f: number; x: number; y: number; size: number; z?: number;
  drive?: number; strain?: number; flip?: boolean; costume?: Record<string, number>;
  gaze?: number; cheer?: number; reach?: number; shock?: number; stern?: number; pop?: number;
  act?: number; ph?: number; lift?: number; kit?: Kit; xeyes?: number }> =
  ({ f, x, y, size, z = 56, drive = 0, strain = 0, flip = false, costume = {},
     gaze = 0, cheer = 0, reach = 96, shock = 0, stern = 0, pop = 1, act = 3, ph = 0, lift = 0,
     kit = {}, xeyes = 0 }) => {
  const beat = Math.min(1, Math.max(Math.abs(drive), strain) * 1.7);
  const k = 1 - beat;
  let ax = 0, ay = 0, ar = 0, aGaze = 0, aCheer = 0;
  if (act === 0) {
    ax = Math.sin(f / 17 + ph) * size * 0.20 * k;
    ay = -Math.abs(Math.sin(f / 8.5 + ph)) * size * 0.042 * k;
    ar = Math.cos(f / 17 + ph) * 3.2 * k;
  } else if (act === 1) {
    ar = (4.5 + Math.sin(f / 6.2 + ph) * 6.5) * k;
    ay = Math.abs(Math.sin(f / 6.2 + ph)) * size * 0.038 * k;
    ax = Math.sin(f / 6.2 + ph) * size * 0.048 * k;
  } else if (act === 2) {
    const t = (f / 26 + ph) % 1;
    const j = Math.max(0, Math.sin(t * Math.PI));
    ay = -j * size * 0.19 * k; aCheer = j > 0.55 ? k : 0;
    ar = Math.sin(f / 26 + ph) * 2.6 * k;
  } else {
    aGaze = Math.sin(f / 21 + ph) * 1.0 * k;
    ar = Math.sin(f / 21 + ph) * 4.0 * k;
  }
  ay += Math.sin(f / 23 + ph) * 4.6 * k;
  ar += Math.sin(f / 31 + ph * 1.7) * 1.3 * k;
  const tremble = strain > 0.5 ? Math.sin(f * 1.9) * 3.4 * (strain - 0.5) * 2 : 0;
  const sy = 1 - strain * 0.16;
  const sx = 1 + strain * 0.12;
  const dx = (flip ? -1 : 1) * (drive * reach + ax) + tremble;
  const dy = strain * size * 0.05 + ay - lift;
  const rot = (flip ? -1 : 1) * (drive * 7 - strain * 2 + ar);
  const u = size / 200;
  return (
    <div style={{ position: "absolute", left: x - size / 2 + dx, top: y - size + dy,
      width: size, height: size, zIndex: z,
      transform: `scale(${sx * pop * (flip ? -1 : 1)}, ${sy * pop}) rotate(${rot}deg)`,
      transformOrigin: "50% 100%" }}>
      <Parts u={u} kit={kit} f={f} />
      <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>
        {/* ⛔ the Mascot blinks at lf 0-4 of every 84: offset it so frame 0 of a scene
            — and the reel's thumbnail — never catches the hero with his eyes shut */}
        <Mascot lf={f + 31} size={size} gaze={gaze + aGaze} nodAmp={2.6 + strain * 2 + k * 1.4}
          nodSpeed={10} cheer={Math.max(cheer, aCheer)} shock={shock} stern={stern} xeyes={xeyes}
          {...costume} />
      </div>
    </div>
  );
};

/** hip / shoulder / head-top anchors for a rig at (x, foot y, size) — used to
    aim hoists and claws at the sockets. Read off the mascot SVG, not guessed. */
export const anchors = (x: number, y: number, size: number) => ({
  headTop: y - size * 0.78, shoulderR: { x: x + size * 0.33, y: y - size * 0.62 },
  hipL: { x: x - size * 0.40, y: y - size * 0.36 }, back: { x: x + size * 0.2, y: y - size * 0.5 },
  centre: { x, y: y - size * 0.5 },
});
