import React from "react";
import { Img, staticFile } from "remotion";
import { inter } from "./fonts";
import { E, osc, rnd, OUT, IO, BACK } from "./MissionWorld";

/* =========================================================================
   REEL 86 "CANCEL" · SHARED WORLD KIT FOR THE FIVE CANDIDATE HOOKS.

   VO (hook, 0.00-4.84): "5 apps you pay for every month have free versions,
   and together they have over 175,000 stars on GitHub."

   ⛔ THE BRIEF: hierarchical, and RELATED to what is being said — interesting
   without drifting off the subject. So all five worlds are worlds about
   PAYING EVERY MONTH, and each one ranks with a DIFFERENT mechanism. Reel 85
   learned that five props sharing one mechanism (a lit object on a plinth) is
   one concept in five costumes, so the mechanisms are the thing being varied:

     A · CHECKOUT   ORDER     a ranked receipt: five lines, and a total
     B · TOLL ROAD  DIRECTION one lit lane running to a vanishing point
     C · SKYLINE    SCALE     tower height IS the star count
     D · TURNSTILE  CONTRAST  one green gate in a field of red
     E · PLANT      TIME      the calendar wheel is the only thing moving

   ⛔ Matte animation paints and dark OFFSET shadows only. No `0 0 Npx` glow,
   no low-opacity washes, no neon-on-black (memory reel_matte_palette).
   ⛔ Every brand mark is the REAL local asset, black on a light plate
   (memory reel_brand_logo_sourcing). Nothing here is a coloured square.
   ⛔ The five FREE repos are REDACTED in the hook — star counts visible,
   names blacked out. Showing them hands over the payoff (learnings §2).
   ========================================================================= */

/* --------------------------------------------------------------- palette --
   ⛔ THE HOUSE SET, NOT A NEW ONE. This file first carried reel 85's accents
   (RED #D63B27, GO #17A87C, GO_L #2FCB99) — an electric mint that is not in the
   house palette at all and reads as neon next to the clay. Every accent below
   is now SlopKit's constant or a tint/shade derived from it, so the reel sits
   in the same paint set as every other one (memory feedback_reel_matte_palette,
   flagged repeatedly). Derived values only ever move lightness, never hue. */
export const PAPER = "#F7F3EA", PAPER2 = "#EAE3D4", INKD = "#1B1712", SOOT = "#0C1016";
/** CLAY family — SlopKit RED #C44A3A / CLAYD #B8501F */
export const RED = "#C44A3A", RED_D = "#8E2E22";
/** GREEN family — SlopKit GREEN #3F9E74 */
export const GO = "#3F9E74", GO_L = "#63BE95", GO_D = "#256A4B";
/** GOLD family — SlopKit GOLD #E7B24C / AMBER #CF9544 */
export const AMB = "#E7B24C", AMB_L = "#F3D28E", AMB_D = "#A9761F";
export const STEEL = "#5B6B7C", STEEL_L = "#8496A8", STEEL_D = "#36424F";
export const NIGHT = "#101823", NIGHT_L = "#1B2735", TEAL = "#2E6E74", MAG = "#B4477E";

/* the shadow the house uses — OFFSET and dark, never a coloured halo */
export const SH = "0 12px 20px rgba(6,9,14,0.62)";
export const SH_S = "0 6px 12px rgba(6,9,14,0.55)";

/** Blend two hexes into ONE SOLID PAINT. Used instead of stacking a
    low-opacity overlay: the house rule is solid animation-film paints, and an
    alpha wash over a dark floor is exactly the "washed out" look that keeps
    getting flagged. Same pixel, but it is a colour someone chose. */
export const mix = (a: string, b: string, t: number) => {
  const p = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const [r1, g1, b1] = p(a), [r2, g2, b2] = p(b);
  const c = (x: number, y: number) => Math.round(x + (y - x) * t).toString(16).padStart(2, "0");
  return `#${c(r1, r2)}${c(g1, g2)}${c(b1, b2)}`;
};

/* ------------------------------------------------- the verified real data -- */
/** The five paid products the VO names. Marks are LOCAL files, checked to be
    real images before use (public/logos/canva.svg shipped empty and was
    re-sourced from simple-icons; the rest were already on disk). */
/* ⛔ `chatgpt_logo.png` is a 600x600 PNG with a FULLY OPAQUE WHITE background
   (alpha 255 everywhere). The house plate darkens marks with
   `grayscale(1) brightness(0.12)`, which turned that white field into a solid
   near-black square on every plate in every variant. `logos_official/openai.svg`
   is black-on-transparent and is the one to use. Checked the alpha channel of
   every mark before trusting it. */
export const PAID = [
  { file: "logos_official/higgsfield.png", name: "HIGGSFIELD", short: "HIGGS" },
  { file: "logos_official/openai.svg", name: "CHATGPT PLUS", short: "CHATGPT" },
  { file: "logos/notion.svg", name: "NOTION", short: "NOTION" },
  { file: "logos/canva.svg", name: "CANVA", short: "CANVA" },
  { file: "logos/figma.svg", name: "FIGMA", short: "FIGMA" },
];

/** The five open-source replacements, star counts read from the GitHub API on
    2026-07-31, RANKED. The hook shows the counts and blacks out the names. */
export const FREE = [
  { repo: "AppFlowy-IO/AppFlowy", stars: 74690 },
  { repo: "calesthio/OpenMontage", stars: 44388 },
  { repo: "janhq/jan", stars: 43792 },
  { repo: "presenton/presenton", stars: 9268 },
  { repo: "ZSeven-W/openpencil", stars: 4518 },
];
export const TOTAL = FREE.reduce((a, b) => a + b.stars, 0); // 176,656 — VO says "over 175,000"

/* ============================================================== primitives = */

/** A light product plate carrying a REAL mark. Paper UI, black logo, dark
    offset shadow. `dead` stamps it cancelled without ever hiding the mark. */
export const Plate: React.FC<{
  x: number; y: number; s?: number; i: number; t?: number; dead?: number; z?: number;
}> = ({ x, y, s = 1, i, t = 1, dead = 0, z = 26 }) => {
  const b = PAID[i % PAID.length];
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 150 * s, height: 150 * s,
      zIndex: z, borderRadius: 16 * s, background: PAPER, boxShadow: SH,
      transform: `scale(${Math.max(0.02, t)})`, overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 22 * s, display: "flex",
        justifyContent: "center" }}>
        <Img src={staticFile(b.file)} style={{ width: 68 * s, height: 68 * s,
          objectFit: "contain", display: "block", filter: "none" }} />
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 13 * s, textAlign: "center",
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 15 * s, letterSpacing: "0.05em",
        color: INKD }}>{b.short}</div>
      {dead > 0.02 && (<>
        <div style={{ position: "absolute", inset: 0, background: "rgba(20,16,14,0.55)",
          opacity: dead }} />
        <div style={{ position: "absolute", left: -10 * s, right: -10 * s, top: 66 * s,
          height: 9 * s, background: RED, transform: "rotate(-12deg)",
          transformOrigin: "50% 50%", opacity: dead }} />
      </>)}
    </div>
  );
};

/** A REDACTED open-source repo: the star count is the whole point, the name is
    a black bar. This is the "tease the count, redact the items" rule as a
    component so no hook can accidentally spend the payoff. */
export const Lock: React.FC<{
  x: number; y: number; w?: number; s?: number; i: number; t?: number; z?: number;
}> = ({ x, y, w = 300, s = 1, i, t = 1, z = 30 }) => {
  const r = FREE[i % FREE.length];
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, zIndex: z,
      borderRadius: 12 * s, background: PAPER, boxShadow: SH, overflow: "hidden",
      transform: `scale(${Math.max(0.02, t)})`, transformOrigin: "0% 50%",
      fontFamily: inter.fontFamily }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 * s,
        padding: `${11 * s}px ${14 * s}px` }}>
        <Img src={staticFile("logos/github.svg")} style={{ width: 26 * s, height: 26 * s,
          objectFit: "contain", display: "block" }} />
        {/* the name, blacked out — the shape of a repo path, none of the letters */}
        <div style={{ flex: 1, display: "flex", gap: 6 * s, alignItems: "center" }}>
          <div style={{ height: 17 * s, width: 62 * s, background: INKD, borderRadius: 3 }} />
          <div style={{ fontWeight: 900, fontSize: 17 * s, color: INKD }}>/</div>
          <div style={{ height: 17 * s, width: 88 * s, background: INKD, borderRadius: 3 }} />
        </div>
        <div style={{ fontWeight: 900, fontSize: 20 * s, color: AMB_D, whiteSpace: "nowrap" }}>
          {"★ " + r.stars.toLocaleString("en-US")}
        </div>
      </div>
      <div style={{ height: 5 * s, background: GO }} />
    </div>
  );
};

/** A number that MOVES to its value — never typeset at it (memory
    feedback_graphical_over_textual). Counts, then settles with a punch. */
export const Counter: React.FC<{
  f: number; at: number; dur?: number; to: number; x?: number; y: number; size?: number;
  c?: string; suffix?: string; z?: number;
}> = ({ f, at, dur = 30, to, y, size = 120, c = AMB_L, suffix = "", z = 40 }) => {
  const p = E(f, at, at + dur, 0, 1, OUT);
  const pop = 1 + Math.max(0, 1 - Math.abs(f - (at + dur)) / 7) * 0.11;
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: y, textAlign: "center",
      zIndex: z, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: size, lineHeight: 1,
      letterSpacing: "-0.045em", color: c, transform: `scale(${pop})`,
      textShadow: "0 6px 0 rgba(6,9,14,0.55)" }}>
      {Math.round(to * p).toLocaleString("en-US")}{suffix}
    </div>
  );
};

/** ONE text chip per shot, in a band nothing else occupies. */
export const Chip: React.FC<{ y: number; text: string; c?: string; size?: number; z?: number }> =
  ({ y, text, c = RED, size = 34, z = 44 }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top: y, display: "flex",
    justifyContent: "center", zIndex: z }}>
    <div style={{ padding: "9px 24px", borderRadius: 8, background: c, boxShadow: SH_S,
      fontFamily: inter.fontFamily, fontWeight: 900, fontSize: size, letterSpacing: "-0.01em",
      color: "#FFF8ED", whiteSpace: "nowrap" }}>{text}</div>
  </div>
);

/* ====================================================================== stage
   ONE parameterized backdrop instead of 25 bespoke ones (the MissionSurfaces
   lesson). Every place gets sky/far wall, a horizon, three receding structure
   bands, a perspective floor and a lip — 8 or 9 objects of DEPTH before a
   single prop lands, which is most of the way to the 12-18 target and is what
   actually produces the tiers the brief is asking for.
   ========================================================================= */

type Struct = "flat" | "city" | "bays" | "arches" | "racks" | "shelves";
type Pal = {
  sky: string; far: string; mid: string; near: string;
  floor: string; floor2: string; line: string; lip: string; accent: string;
  struct: Struct; horizon?: number;
};

export const PLACES: Record<string, Pal> = {
  /* A · CHECKOUT — supermarket at closing time.
     ⛔ a1/b1/d1/e1 are the FRAME-0 places and are pitched ~2 stops above their
     world's night palette. Reel 81's night open measured 100/255 and had to be
     lifted the same way; a dark frame 0 loses the feed before it is read. */
  a1: { sky: "#41586A", far: "#526D7F", mid: "#628095", near: "#7292A6", floor: "#3A4E5D", floor2: "#465D6E", line: "#88A3B4", lip: "#2A3A47", accent: RED, struct: "flat", horizon: 300 },
  a2: { sky: "#1B2C36", far: "#264150", mid: "#2F5262", near: "#3A6474", floor: "#1E2E38", floor2: "#263A46", line: "#48697A", lip: "#131F27", accent: TEAL, struct: "bays", horizon: 340 },
  a3: { sky: "#231C16", far: "#3A2C1E", mid: "#4C3A26", near: "#5E4830", floor: "#2A2118", line: "#6E5433", floor2: "#332720", lip: "#180F0A", accent: AMB, struct: "shelves", horizon: 300 },
  a4: { sky: "#0C1016", far: "#141C26", mid: "#1C2733", near: "#243240", floor: "#0F151C", floor2: "#151E27", line: "#2E3E4E", lip: "#080B10", accent: PAPER, struct: "racks", horizon: 240 },
  a5: { sky: "#0E1A18", far: "#16292A", mid: "#1D3835", near: "#255045", floor: "#12201E", floor2: "#182B28", line: "#2C4C46", lip: "#091311", accent: GO, struct: "arches", horizon: 320 },

  /* B · TOLL ROAD — a night freeway under sodium light */
  /* the apron is lit CONCRETE, not asphalt — a sodium-lit plaza is genuinely
     the brightest floor in this reel, so the luma bar is cleared from inside
     the theme rather than by dropping a neutral card into the shot. */
  b1: { sky: "#4A4029", far: "#6B5A36", mid: "#8A7444", near: "#A38A52", floor: "#9A9382", floor2: "#ABA492", line: "#C4BDA8", lip: "#5A5342", accent: AMB, struct: "flat", horizon: 290 },
  b2: { sky: "#141E2C", far: "#1E2C3E", mid: "#293B50", near: "#354A62", floor: "#18222E", floor2: "#1F2C3B", line: "#3E5670", lip: "#0D1420", accent: AMB, struct: "bays", horizon: 330 },
  b3: { sky: "#0F1720", far: "#18232F", mid: "#22303E", near: "#2C3E4E", floor: "#131A23", floor2: "#19222C", line: "#36495C", lip: "#0A0F15", accent: PAPER, struct: "arches", horizon: 300 },
  b4: { sky: "#170F12", far: "#26161A", mid: "#351D22", near: "#46262B", floor: "#1C1216", floor2: "#24181C", line: "#542C33", lip: "#0F090B", accent: RED, struct: "city", horizon: 310 },
  b5: { sky: "#0D1A16", far: "#142A24", mid: "#1B3B31", near: "#235240", floor: "#101F1B", floor2: "#162A24", line: "#2A4C40", lip: "#08120F", accent: GO, struct: "flat", horizon: 300 },

  /* C · SKYLINE — a night city where height is the star count */
  c1: { sky: "#6A5340", far: "#806550", mid: "#96775E", near: "#AC896C", floor: "#5C4838", floor2: "#6C5645", line: "#C0A184", lip: "#3E3025", accent: AMB, struct: "flat", horizon: 300 },
  c2: { sky: "#160E1C", far: "#25152E", mid: "#341E40", near: "#452752", floor: "#1B1122", floor2: "#22162B", line: "#5A3268", lip: "#0E0713", accent: MAG, struct: "city", horizon: 330 },
  c3: { sky: "#101B2C", far: "#18273C", mid: "#21334C", near: "#2B415E", floor: "#141F2E", floor2: "#1A2739", line: "#354D6C", lip: "#0A1119", accent: STEEL_L, struct: "city", horizon: 340 },
  c4: { sky: "#0B1016", far: "#131A22", mid: "#1B242E", near: "#242F3B", floor: "#0E141A", floor2: "#141B23", line: "#2C3A48", lip: "#070A0E", accent: PAPER, struct: "city", horizon: 300 },
  c5: { sky: "#0B1A17", far: "#122A24", mid: "#183A31", near: "#1F5142", floor: "#0E1F1A", floor2: "#142A24", line: "#264A3E", lip: "#071310", accent: GO, struct: "city", horizon: 350 },

  /* D · TURNSTILE — a subway hall, red field with one green gate */
  d1: { sky: "#4A3A3C", far: "#5E494C", mid: "#72585C", near: "#86686C", floor: "#433537", floor2: "#523F42", line: "#9C7E82", lip: "#2E2426", accent: RED, struct: "flat", horizon: 290 },
  d2: { sky: "#151D26", far: "#1F2B37", mid: "#293A49", near: "#34495C", floor: "#19222C", floor2: "#202C38", line: "#3F5872", lip: "#0E141B", accent: RED, struct: "bays", horizon: 330 },
  d3: { sky: "#1F1A12", far: "#332B1B", mid: "#463A24", near: "#5A4A2D", floor: "#251F16", floor2: "#2E271C", line: "#6C5931", lip: "#151109", accent: AMB, struct: "arches", horizon: 300 },
  d4: { sky: "#0A0D12", far: "#11161D", mid: "#182029", near: "#202A35", floor: "#0D1116", floor2: "#12171E", line: "#28343F", lip: "#06080B", accent: AMB_L, struct: "flat", horizon: 280 },
  d5: { sky: "#0C1B18", far: "#132B26", mid: "#1A3B33", near: "#215244", floor: "#0F201C", floor2: "#152B26", line: "#284C41", lip: "#081310", accent: GO, struct: "bays", horizon: 330 },

  /* E · PLANT — a billing factory, the calendar wheel the only moving thing */
  e1: { sky: "#6E4E3A", far: "#8A6249", mid: "#A2765A", near: "#B98A69", floor: "#9A9184", floor2: "#AAA194", line: "#C4BBAA", lip: "#5E5648", accent: AMB, struct: "flat", horizon: 290 },
  e2: { sky: "#0F1E20", far: "#173033", mid: "#1F4247", near: "#28545A", floor: "#122326", floor2: "#182D31", line: "#2C5960", lip: "#091518", accent: TEAL, struct: "racks", horizon: 330 },
  e3: { sky: "#1E1810", far: "#33291A", mid: "#473924", near: "#5B492D", floor: "#241D14", floor2: "#2D251A", line: "#6D5731", lip: "#140F09", accent: AMB, struct: "bays", horizon: 320 },
  e4: { sky: "#0C1015", far: "#141A21", mid: "#1D252E", near: "#26303B", floor: "#0F1419", floor2: "#151B22", line: "#2E3A47", lip: "#070A0D", accent: PAPER, struct: "arches", horizon: 290 },
  e5: { sky: "#0D1A15", far: "#152A22", mid: "#1D3A2E", near: "#25513C", floor: "#101F19", floor2: "#162A22", line: "#2A4C3B", lip: "#081310", accent: GO, struct: "flat", horizon: 310 },
};

const W = 1012, H = 792;

/** the three receding structure bands, chosen by kind */
const Bands: React.FC<{ p: Pal; f: number }> = ({ p, f }) => {
  const hz = p.horizon ?? 310;
  const out: React.ReactNode[] = [];
  const push = (n: React.ReactNode) => out.push(n);

  if (p.struct === "city") {
    // far skyline, mid blocks, near rooftops — three ranked bands
    for (let i = 0; i < 16; i++) {
      const w = 40 + rnd(i, 3) * 52, x = i * 66 - 20, h = 30 + rnd(i, 7) * 96;
      push(<rect key={`f${i}`} x={x} y={hz - h} width={w} height={h + 8} fill={p.far} />);
    }
    for (let i = 0; i < 11; i++) {
      const w = 62 + rnd(i, 11) * 66, x = i * 98 - 30, h = 44 + rnd(i, 13) * 128;
      push(<rect key={`m${i}`} x={x} y={hz + 24 - h} width={w} height={h + 20} fill={p.mid} />);
      for (let k = 0; k < 5; k++)
        push(<rect key={`mw${i}${k}`} x={x + 12 + k * 13} y={hz + 4 - h + 16} width={7} height={9} fill={p.line} opacity={rnd(i * 9 + k, 5) > 0.55 ? 0.85 : 0.25} />);
    }
    for (let i = 0; i < 6; i++) {
      const w = 130 + rnd(i, 17) * 90, x = i * 190 - 60, h = 70 + rnd(i, 19) * 96;
      push(<rect key={`n${i}`} x={x} y={hz + 96 - h} width={w} height={h + 40} fill={p.near} />);
    }
  } else if (p.struct === "bays") {
    for (let i = 0; i < 7; i++)
      push(<rect key={`f${i}`} x={i * 150 + 8} y={hz - 120} width={118} height={128} fill={p.far} />);
    for (let i = 0; i < 5; i++) {
      push(<rect key={`m${i}`} x={i * 208 - 24} y={hz - 62} width={168} height={132} fill={p.mid} />);
      push(<rect key={`mb${i}`} x={i * 208 - 24} y={hz - 62} width={168} height={11} fill={p.line} opacity={0.7} />);
    }
    for (let i = 0; i < 4; i++)
      push(<rect key={`n${i}`} x={i * 300 - 90} y={hz + 44} width={214} height={150} fill={p.near} />);
  } else if (p.struct === "arches") {
    for (let i = 0; i < 5; i++) {
      const s = 1 - i * 0.14, w2 = 700 * s, h2 = 300 * s;
      push(<g key={`a${i}`}>
        <rect x={(W - w2) / 2} y={hz + 40 - h2} width={w2} height={h2} rx={w2 * 0.16}
              fill={i % 2 ? p.mid : p.far} />
        <rect x={(W - w2) / 2 + 16} y={hz + 46 - h2} width={w2 - 32} height={h2}
              rx={w2 * 0.15} fill={p.sky} opacity={0.55} />
      </g>);
    }
    for (let i = 0; i < 4; i++)
      push(<rect key={`n${i}`} x={i * 320 - 110} y={hz + 70} width={210} height={160} fill={p.near} />);
  } else if (p.struct === "racks") {
    for (let i = 0; i < 9; i++)
      push(<rect key={`f${i}`} x={i * 118 + 6} y={hz - 150} width={92} height={160} fill={p.far} />);
    for (let i = 0; i < 6; i++) {
      push(<rect key={`m${i}`} x={i * 176 - 20} y={hz - 84} width={142} height={172} fill={p.mid} />);
      for (let k = 0; k < 4; k++)
        push(<rect key={`ms${i}${k}`} x={i * 176 - 20} y={hz - 74 + k * 42} width={142} height={7} fill={p.line} opacity={0.6} />);
    }
    for (let i = 0; i < 4; i++)
      push(<rect key={`n${i}`} x={i * 306 - 96} y={hz + 52} width={222} height={168} fill={p.near} />);
  } else if (p.struct === "shelves") {
    for (let i = 0; i < 2; i++)
      push(<rect key={`f${i}`} x={i * 560 - 40} y={hz - 160} width={520} height={180} fill={p.far} />);
    for (let i = 0; i < 5; i++) {
      const s = 1 - i * 0.15, w2 = 250 * s;
      push(<rect key={`m${i}`} x={W / 2 - w2 / 2 + (i % 2 ? 1 : -1) * (60 + i * 76)} y={hz - 40 - 150 * s}
                 width={w2} height={150 * s + 90} fill={i % 2 ? p.mid : p.near} />);
    }
  } else {
    push(<rect key="f" x={0} y={hz - 160} width={W} height={180} fill={p.far} />);
    push(<rect key="m" x={0} y={hz + 16} width={W} height={78} fill={p.mid} />);
    for (let i = 0; i < 6; i++)
      push(<rect key={`n${i}`} x={i * 186 - 40} y={hz + 92} width={140} height={120} fill={p.near} />);
  }
  return <>{out}</>;
};

/**
 * The backdrop for one PLACE. Sky, horizon, three structure bands, a
 * perspective floor whose lines converge, a floor lip and grit.
 */
export const Stage: React.FC<{ id: keyof typeof PLACES; f: number; z?: number }> =
  ({ id, f, z = 2 }) => {
  const p = PLACES[id];
  const hz = p.horizon ?? 310;
  const vp = W / 2;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} shapeRendering="crispEdges"
      style={{ position: "absolute", left: 0, top: 0, zIndex: z }}>
      {/* 1 sky / far wall */}
      <rect x={0} y={0} width={W} height={H} fill={p.sky} />
      {/* 2 a horizon band so the far plane never touches the near one */}
      <rect x={0} y={hz - 190} width={W} height={196} fill={p.far} opacity={0.55} />
      {/* 3-5 the three receding structure bands */}
      <Bands p={p} f={f} />
      {/* 6 the floor */}
      <rect x={0} y={hz + 180} width={W} height={H - hz - 180} fill={p.floor} />
      {/* 7 converging floor lines — the depth cue that does the ranking */}
      {Array.from({ length: 13 }, (_, i) => {
        const x0 = -420 + i * 156;
        return <polygon key={`fl${i}`} fill={p.line} opacity={0.20}
          points={`${x0},${H} ${x0 + 26},${H} ${vp + 6},${hz + 180} ${vp - 6},${hz + 180}`} />;
      })}
      {/* 8 floor bands, tightening toward the horizon */}
      {Array.from({ length: 7 }, (_, i) => {
        const y0 = H - Math.pow(1 - i / 7, 1.9) * (H - hz - 180) - 0;
        return <rect key={`fb${i}`} x={0} y={y0} width={W} height={4} fill={p.floor2} opacity={0.7} />;
      })}
      {/* 9 the lip where floor meets structure */}
      <rect x={0} y={hz + 172} width={W} height={12} fill={p.lip} />
      {/* 10 grit so the floor is not a flat fill */}
      {Array.from({ length: 44 }, (_, i) => {
        const t = rnd(i, 23);
        return <rect key={`g${i}`} x={rnd(i, 29) * W} y={hz + 200 + t * (H - hz - 210)}
          width={3 + t * 5} height={3} fill={p.lip} opacity={0.5} />;
      })}
    </svg>
  );
};

/* =============================================================== hero props =
   One per world, the single object that carries the idea. Named so a reviewer
   can say "the barrier" or "the receipt" rather than "the thing on the left".
   ========================================================================= */

/** A · the receipt — a ranked list you can read: five charges, then a total. */
export const Receipt: React.FC<{
  f: number; x: number; y: number; s?: number; at?: number; rows?: number; z?: number;
}> = ({ f, x, y, s = 1, at = 0, rows = 5, z = 30 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 372 * s, zIndex: z,
    background: PAPER, boxShadow: SH, fontFamily: inter.fontFamily, color: INKD,
    transform: `scaleY(${E(f, at, at + 20, 0.02, 1, OUT)})`, transformOrigin: "50% 0%",
    clipPath: "polygon(0 0,100% 0,100% 97%,92% 100%,84% 97%,76% 100%,68% 97%,60% 100%,52% 97%,44% 100%,36% 97%,28% 100%,20% 97%,12% 100%,4% 97%,0 100%)" }}>
    <div style={{ padding: `${16 * s}px 0 ${9 * s}px`, textAlign: "center", fontWeight: 900,
      fontSize: 21 * s, letterSpacing: "0.16em" }}>MONTHLY</div>
    <div style={{ height: 3 * s, background: INKD, margin: `0 ${18 * s}px` }} />
    {PAID.slice(0, rows).map((b, i) => (
      <div key={b.name} style={{ display: "flex", alignItems: "center", gap: 10 * s,
        padding: `${9 * s}px ${18 * s}px`,
        opacity: E(f, at + 6 + i * 4, at + 14 + i * 4, 0, 1, OUT) }}>
        <Img src={staticFile(b.file)} style={{ width: 26 * s, height: 26 * s,
          objectFit: "contain", filter: "none" }} />
        <span style={{ flex: 1, fontWeight: 800, fontSize: 19 * s }}>{b.short}</span>
        <span style={{ fontWeight: 900, fontSize: 19 * s }}>/mo</span>
      </div>
    ))}
    <div style={{ height: 3 * s, background: INKD, margin: `${5 * s}px ${18 * s}px 0` }} />
    <div style={{ display: "flex", justifyContent: "space-between", padding: `${11 * s}px ${18 * s}px ${22 * s}px`,
      fontWeight: 900, fontSize: 25 * s }}>
      <span>EVERY MONTH</span><span style={{ color: RED }}>×∞</span>
    </div>
  </div>
);

/** B · the barrier — drops on a cycle, which is the recurring charge. */
export const Barrier: React.FC<{ f: number; x: number; y: number; s?: number; drop: number; z?: number }> =
  ({ f, x, y, s = 1, drop, z = 30 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
    <div style={{ position: "absolute", left: 0, top: 0, width: 34 * s, height: 190 * s,
      background: STEEL_D, boxShadow: SH }} />
    <div style={{ position: "absolute", left: 4 * s, top: 8 * s, width: 26 * s, height: 40 * s,
      background: STEEL_L }} />
    <div style={{ position: "absolute", left: 24 * s, top: 16 * s, width: 420 * s, height: 22 * s,
      transformOrigin: "0% 50%", transform: `rotate(${(1 - drop) * -62}deg)`,
      background: `repeating-linear-gradient(90deg, ${RED} 0 ${44 * s}px, ${PAPER} ${44 * s}px ${88 * s}px)`,
      boxShadow: SH_S }} />
  </div>
);

/** C · the tower — height IS the star count. The whole ranking in one object. */
export const Tower: React.FC<{
  f: number; x: number; base: number; w: number; h: number; c: string; lit?: string;
  at?: number; label?: string; z?: number;
}> = ({ f, x, base, w, h, c, lit, at = 0, label, z = 20 }) => {
  const g = E(f, at, at + 26, 0, 1, OUT), hh = h * g;
  return (<>
    <div style={{ position: "absolute", left: x, top: base - hh, width: w, height: hh,
      background: c, zIndex: z, boxShadow: SH }} />
    {lit && Array.from({ length: Math.floor(hh / 34) }, (_, r) => (
      <div key={r} style={{ position: "absolute", left: x + 8, top: base - hh + 12 + r * 34,
        width: w - 16, height: 12, zIndex: z + 1, display: "flex", gap: 6 }}>
        {Array.from({ length: Math.max(1, Math.floor((w - 16) / 20)) }, (_, q) => (
          <div key={q} style={{ width: 13, height: 12, background: lit,
            opacity: rnd(r * 7 + q, 3) > 0.42 ? 0.9 : 0.18 }} />
        ))}
      </div>
    ))}
    {label && (
      <div style={{ position: "absolute", left: x, top: base - hh - 34, width: w, textAlign: "center",
        zIndex: z + 2, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 21, color: PAPER,
        opacity: g }}>{label}</div>
    )}
  </>);
};

/** D · the gate — red X or green arrow. Contrast is the ranking mechanism. */
export const Gate: React.FC<{
  x: number; y: number; s?: number; open?: boolean; t?: number; i?: number; z?: number;
}> = ({ x, y, s = 1, open = false, t = 1, i, z = 26 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    transform: `scale(${Math.max(0.02, t)})`, transformOrigin: "50% 100%" }}>
    <div style={{ position: "absolute", left: 0, top: 0, width: 74 * s, height: 178 * s,
      background: STEEL, boxShadow: SH }} />
    <div style={{ position: "absolute", left: 0, top: 0, width: 74 * s, height: 12 * s,
      background: STEEL_L }} />
    {/* the paddle arms — shut on a paid gate, folded away on the free one */}
    {!open && [0, 1, 2].map((k) => (
      <div key={k} style={{ position: "absolute", left: 66 * s, top: (44 + k * 40) * s,
        width: 96 * s, height: 10 * s, background: PAPER2, boxShadow: SH_S }} />
    ))}
    <div style={{ position: "absolute", left: 11 * s, top: 26 * s, width: 52 * s, height: 52 * s,
      background: open ? GO : RED, display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 34 * s, color: "#FFF8ED" }}>
      {open ? "→" : "✕"}
    </div>
    {i !== undefined && (
      <div style={{ position: "absolute", left: 5 * s, top: 92 * s, width: 64 * s, height: 64 * s,
        background: PAPER, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Img src={staticFile(PAID[i].file)} style={{ width: 44 * s, height: 44 * s,
          objectFit: "contain", filter: "none" }} />
      </div>
    )}
  </div>
);

/** E · the calendar wheel — the only moving thing, so it rules the frame. */
export const Wheel: React.FC<{ f: number; x: number; y: number; s?: number; at?: number; z?: number }> =
  ({ f, x, y, s = 1, at = 0, z = 30 }) => {
  const spin = E(f, at, at + 34, 0, 1, IO);
  const day = 1 + Math.floor(spin * 30) % 30;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 250 * s, height: 250 * s, zIndex: z }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: STEEL_D,
        boxShadow: SH }} />
      <div style={{ position: "absolute", inset: 16 * s, borderRadius: "50%", background: PAPER }} />
      {Array.from({ length: 12 }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: "50%", top: "50%", width: 6 * s,
          height: 108 * s, marginLeft: -3 * s, background: INKD, opacity: 0.16,
          transformOrigin: "50% 0%", transform: `rotate(${i * 30 + spin * 360}deg)` }} />
      ))}
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center",
        justifyContent: "center", fontFamily: inter.fontFamily, fontWeight: 900,
        fontSize: 96 * s, color: day === 1 ? RED : INKD, letterSpacing: "-0.05em" }}>{day}</div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 176 * s, textAlign: "center",
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 22 * s, color: INKD,
        letterSpacing: "0.18em" }}>OF THE MONTH</div>
    </div>
  );
};

/** the card that gets charged — the thing the target viewer already dreads */
export const Card: React.FC<{ x: number; y: number; s?: number; rot?: number; z?: number }> =
  ({ x, y, s = 1, rot = 0, z = 30 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 300 * s, height: 190 * s, zIndex: z,
    borderRadius: 18 * s, background: "#2A3543", boxShadow: SH, transform: `rotate(${rot}deg)` }}>
    <div style={{ position: "absolute", left: 24 * s, top: 44 * s, width: 58 * s, height: 44 * s,
      borderRadius: 7 * s, background: AMB }} />
    <div style={{ position: "absolute", left: 24 * s, top: 44 * s, width: 58 * s, height: 5 * s,
      background: AMB_L }} />
    <div style={{ position: "absolute", left: 24 * s, top: 116 * s, display: "flex", gap: 11 * s }}>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} style={{ display: "flex", gap: 5 * s }}>
          {[0, 1, 2, 3].map((k) => (
            <div key={k} style={{ width: 9 * s, height: 9 * s, borderRadius: 2, background: STEEL_L }} />
          ))}
        </div>
      ))}
    </div>
  </div>
);

/** a hard directional light CONE — never a full-frame fill (THE-OPEN law 3) */
export const Cone: React.FC<{
  x: number; y: number; w: number; h: number; c: string; o?: number; rot?: number; z?: number;
}> = ({ x, y, w, h, c, o = 0.3, rot = 0, z = 8 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
    background: c, opacity: o, transform: `rotate(${rot}deg)`, transformOrigin: "50% 0%",
    clipPath: "polygon(38% 0, 62% 0, 100% 100%, 0 100%)" }} />
);
