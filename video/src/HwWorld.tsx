import React from "react";
import { MONO, Mascot } from "./SlopKit";
import { inter } from "./fonts";
import {
  W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, rnd,
  Beam, Strip, Motes, Chip, Slug, Plate, BigNum, Contact, Edge, Scene, Cam,
  Mark, MarkPlate, MarkCast, CamCtx, PalCtx,
} from "./NomWorld";
import type { Place } from "./NomWorld";
import { dkh, mxh, idle } from "./AppWorld";
import { rock, shake, drift, squash } from "./SklWorld";

/* ===========================================================================
   REEL 122 · "HARDWARE" — THE WORLD KIT.  Board: storyboards/122-hardware.md.

   Subject: what it actually costs to run a frontier model on your own GPUs.
   Anthropic has never published Opus 5's weights, so the nearest thing you can
   run is Moonshot AI's Kimi K3 (2.8T params, open weights, released
   2026-07-27). Seven RTX PRO 6000 at $16,000 each is $112,000, pulls 4.2 kW and
   costs $565/month to power — and it still does not work, because the
   bottleneck was never the money. It is MEMORY BANDWIDTH.

   ⛔⛔ THE WORLD IS THE WORD THE SCRIPT TURNS ON: "LOCALLY".
      One address. A builder Claude tries to bring a frontier model home and the
      reel walks the house — back bedroom, vault, parts trade, meter cupboard,
      street, a rented hall, UNDER THE FLOORBOARDS, and out the front door. The
      joke a viewer gets in under a second is that "locally" means a data centre
      in a bedroom, and that joke is also the thesis.

   ⛔⛔ THE VILLAIN IS `THE PIPE` AND IT IS NEVER BEATEN.
      Planted unremarked under the rack at S4, opens the floor at S9, revealed at
      S11, and it WINS at S12 — the hero cranks it as hard as he can and nothing
      improves. S13 does not defeat it, it walks around it. An arc where the
      blocker wins is unusual here and it is the honest shape of this subject.

   ⛔⛔ THE HONESTY LEDGER IS IN THIS FILE AND NOWHERE ELSE (`R` below).
      Checked live 2026-08-24. If a number is not in `R` it does not go on
      screen. Three guards are greppable and must return zero rendered hits.
   ⛔ MATTE ONLY. No `boxShadow: 0 0 Npx` anywhere.
   ⛔ `dark()`/`mix()` are hex-in/rgb-out and DO NOT NEST. Use dkh/mxh.
   ⛔ `Scene` push walks content off-frame: keep `left >= 506 - 486/push`.
   ⛔ A transformed wrapper with NO zIndex VANISHES. Use `Cam`.
   ⛔ `Mascot`'s drawn body is ~100% of `size`, NOT 70%. Pitch >= 0.85 * size.
   ⛔ THE 40px FLOOR APPLIES TO MOVING OBJECTS TOO (it is really "survives the
      audit's 1012->240 downsample", i.e. ~52px is 12px when differenced).
   ========================================================================= */

export { W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, rnd,
  Beam, Strip, Motes, Chip, Slug, Plate, BigNum, Contact, Edge, Scene, Cam,
  Mark, MarkPlate, MarkCast, CamCtx, PalCtx, dkh, mxh, idle, rock, shake, drift, squash };
export type { Place };

/* ---- the palette --------------------------------------------------------- */
export const CLAY = "#D97757", CLAYD = "#B8501F", GOLD = "#E7B24C", GREEN = "#3F9E74";
export const RED = "#C44A3A", SKY = "#5AA0DE", PAPER = "#F7F5F0", CREAMB = "#F2EDE0";
export const INK = "#1A1813", MUTE = "#9A968B", TEAL = "#7FC0C9", STEEL = "#8E9299";
export const BRASS = "#C9A15A", SODIUM = "#E7A94C", VIOLET = "#8B72B0", EMBER = "#E06A2C";
export const OXIDE = "#8C4A2E", SLATE = "#4E5A62", PCB = "#2E5A46", COPPER = "#C87F4A";

/* ---- THE LEDGER ----------------------------------------------------------
   Every number and word the picture is allowed to assert, and where it came
   from. Verified live 2026-08-24. */
export const R = {
  /** ⛔ Anthropic has never released open weights for ANY Claude model. S1 draws
      a vault that does not open; it asserts unavailability, never a reason. */
  sealed:   { model: "OPUS 5", stencil: "NOT PUBLISHED" },
  /** the nearest thing you CAN run. Released 2026-07-27, largest open-weight
      model shipped: 2.8T total / 104B active MoE, 896 experts (16 per token),
      1M context, Modified MIT. ⛔ No Moonshot/Kimi mark exists in public/logos,
      so it is a stencilled NAME PLATE on a real crate, never a fabricated logo. */
  model:    { name: "KIMI K3", maker: "MOONSHOT AI", params: "2.8T",
              licence: "OPEN WEIGHTS · MODIFIED MIT" },
  /** ⛔⛔ THE QUALIFIER THAT KEEPS THIS HONEST. Seven 96GB cards = 672GB, which
      clears the 1-BIT (UD-IQ1_S, 594GB) floor. The FULL MXFP4 weights are
      1.56TB and need ~18 cards. The VO says seven; the rack rail carries
      `1-BIT BUILD · 594 GB` at stencil size so the frame says which build. */
  cards:    { n: 7, sku: "RTX PRO 6000", vram: "96 GB", each: "$16,000",
              total: "$112,000", over: "OVER $110,000",
              build: "1-BIT BUILD · 594 GB",
              src: "NVIDIA US MARKETPLACE · AUG 2026" },
  /** 7 × 600 W TDP. Both halves published. */
  power:    { kw: "4.2 kW", tdp: "7 × 600 W TDP" },
  /** 4.2 kW × 730 h = 3,066 kWh × $0.184. EIA 2026 US residential average runs
      17.65-18.83 ¢/kWh, so the implied rate sits inside the published band. */
  bill:     { month: "$565", per: "/ MONTH", src: "US AVG 18.4¢/kWh · EIA 2026" },
  /** ⭐ THE MEASURED RUN, and it is unusually specific — this is the receipt the
      whole turn rests on. Benchmark Aug 2026 on a rented instance. */
  run:      { rate: "0.1 tok/s", util: "1%", stored: "594 GB STORED",
              rig: "4 × A100-SXM4-40GB · 2 TB RAM · UD-IQ1_S 594 GB" },
  /** ⛔ THE HOUR IS THE VO'S ESTIMATE. THE RATE IS PUBLISHED. The receipt states
      the hour, the stencil under it states the rate, and they are separate
      objects so the frame never presents an estimate as a published figure. */
  api:      { hour: "$0.70", label: "1 HR", rate: "OPUS 5 · $5 / $25 PER MTOK" },
  reasons:  ["INDUSTRIAL VOLUME", "DATA PRIVACY", "AGENTS 24/7"] as const,
  keyword:  "HARDWARE",
} as const;

/** ⛔ GUARDS. A grep for any of these over Hw*.tsx must return zero hits inside
    a rendered string.
    · DEPR: the VO says hardware "loses value every year" and names NO rate. S18
      strikes the $112,000 plate through and puts NOTHING back — you watch the
      value be taken away. A percentage there would be invented, and an invented
      number on a price plate is the most believable kind of wrong.
    · SPEED: the VO makes no speed or quality comparison between Kimi K3 and
      Opus 5, and no benchmark is drawn anywhere in this reel.
    · ATTRIB: S16 says "healthcare or government". A real hospital or agency mark
      there would fabricate an endorsement, so both are DRAWN generics. */
export const DEPR_BANNED = ["% A YEAR", "PER YEAR", "RESALE", "DEPRECIATION"] as const;
export const SPEED_BANNED = ["X FASTER", "BENCHMARK", "BEATS", "SOTA", "#1"] as const;
export const ATTRIB_BANNED = ["NHS", "MEDICARE", "PENTAGON", "FDA", "HHS"] as const;

/* ---- THE TWELVE PLACES ---------------------------------------------------
   ⛔ NEIGHBOURING SCENES DIFFER BY BOTH HUE **AND** LIGHTNESS. Visit order is
   desk -> vault -> dock -> dock' -> bay -> counter -> till -> meter -> street
   -> bayred -> hall -> under -> under' -> front -> doors -> plant -> ward ->
   night -> front', which alternates warm/cold and bright/dark on every cut.
   ⛔ BODY SCENES TARGET LUMA 70-105 AND BLACK POINT p10 <= 35. The >=140 bar is
   FRAME 0 ONLY, and `desk` is the only place built for it. */
export const PLACES: Record<string, Place> = {
  /* 1 · THE BACK BEDROOM — frame 0 lives here, so it is built for >=140: bone
     plaster, a real daylight window and a lit floor. The RACK on top of it is
     near-black, which is where the reel's biggest value SPREAD comes from
     (brightness is the MEAN, hierarchy is the SPREAD — they only fight if you
     reach for the palette's dark stop, which nothing here does). */
  desk:    { back: "#B6BFCA", back2: "#F4F2EC", floor: "#CBB287", floor2: "#9C8258",
             lip: "#4A3C2A", key: "#FFF4D6", horizon: 470, grit: "#2A241A" },
  /* 2 · THE VAULT — cold steel-blue, hard top light, darkest set so far. */
  vault:   { back: "#232E3C", back2: "#4C5E74", floor: "#2E3A48", floor2: "#18202A",
             lip: "#0C1218", key: "#BFD4E6", horizon: 508, grit: "#0A0E14" },
  /* 3 · THE LOADING DOCK — warm amber, low sun through a roller door. */
  dock:    { back: "#3A2A16", back2: "#96682C", floor: "#7A5A2E", floor2: "#3E2C16",
             lip: "#241808", key: "#F2C05C", horizon: 496, grit: "#1E1408" },
  /* 4 · THE WEIGHBRIDGE — the same dock, tighter and cooler. A returning set is
     a callback only if the LIGHT changed. */
  weigh:   { back: "#2A2A24", back2: "#6E6A52", floor: "#5E5A44", floor2: "#2E2C20",
             lip: "#181608", key: "#DCD2A0", horizon: 470, grit: "#16140A" },
  /* 5 · THE CARD BAY — dark steel, one cyan practical. */
  bay:     { back: "#141C22", back2: "#2E4450", floor: "#22323C", floor2: "#121A20",
             lip: "#070C10", key: "#8FD0DE", horizon: 520, grit: "#080E12" },
  /* 6 · THE PARTS COUNTER — bright bone, warm lamp. Brightest since the hook. */
  counter: { back: "#B0A894", back2: "#F2EEE2", floor: "#C8B48C", floor2: "#9A8460",
             lip: "#3A3022", key: "#FFE6A8", horizon: 486, grit: "#282016" },
  /* 7 · THE TILL — dark ink-green, one overhead. */
  till:    { back: "#101E18", back2: "#2A4A38", floor: "#1E362A", floor2: "#0E1A14",
             lip: "#060C08", key: "#8ED8A8", horizon: 512, grit: "#060A08" },
  /* 8 · THE METER CUPBOARD — hot amber FROM BELOW, black ceiling. */
  meter:   { back: "#241608", back2: "#7A4A10", floor: "#96661A", floor2: "#3E2808",
             lip: "#140A02", key: "#FFC24E", horizon: 424, grit: "#180E04" },
  /* 9 · THE STREET — cold navy night, one lit window. Coldest set in the reel. */
  street:  { back: "#141E36", back2: "#2E3E62", floor: "#1E2842", floor2: "#0E1424",
             lip: "#060A12", key: "#E8D08C", horizon: 548, grit: "#080C16" },
  /* 10 · THE BAY, RE-LIT HARD RED — the turn, and the only red in the reel. */
  bayred:  { back: "#2A1010", back2: "#7A2016", floor: "#541C16", floor2: "#280C08",
             lip: "#120404", key: "#F0543A", horizon: 520, grit: "#140404" },
  /* 11 · THE RENTED HALL — cold cyan, long perspective. */
  hall:    { back: "#0E2028", back2: "#2A5A68", floor: "#1C424E", floor2: "#0C2028",
             lip: "#040E12", key: "#7FD4E4", horizon: 500, grit: "#061014" },
  /* 12 · UNDER THE FLOOR — violet, light falling DOWN through the boards. */
  under:   { back: "#1A1428", back2: "#453466", floor: "#2C2246", floor2: "#161028",
             lip: "#0A0614", key: "#B492E4", horizon: 470, grit: "#100A1C" },
  /* 13 · THE FRONT STEP — DAYLIGHT. The brightest body set, and the biggest
     lightness jump on any cut in the reel (it follows `under`). */
  front:   { back: "#8FA6BE", back2: "#EDF1F4", floor: "#B9A480", floor2: "#8C7854",
             lip: "#382E20", key: "#FFF4D6", horizon: 466, grit: "#241C12" },
  /* 14 · THE CORRIDOR — slate, three doors. */
  doors:   { back: "#20242A", back2: "#4A5460", floor: "#2E353E", floor2: "#161A20",
             lip: "#0A0C10", key: "#C6D0DC", horizon: 528, grit: "#0A0C10" },
  /* 15 · THE PLANT — hot orange, huge. */
  plant:   { back: "#301404", back2: "#96430C", floor: "#7A3A0E", floor2: "#361804",
             lip: "#1A0802", key: "#FF9438", horizon: 486, grit: "#1C0A02" },
  /* 16 · THE WARD — clean cyan-white, cold, sealed. */
  ward:    { back: "#9EB6BC", back2: "#EEF5F6", floor: "#A8BCC0", floor2: "#7E9298",
             lip: "#2E3C40", key: "#DFF6F8", horizon: 500, grit: "#1E2A2E" },
  /* 17 · THE NIGHT FLOOR — deep blue, lamps. */
  night:   { back: "#0C1430", back2: "#243060", floor: "#182142", floor2: "#0A0E22",
             lip: "#04060E", key: "#F0D28C", horizon: 522, grit: "#060814" },
  /* 18 · THE KERB — flat overhead daylight, the rack outside. */
  kerb:    { back: "#A2ADB8", back2: "#E8E9E6", floor: "#A69880", floor2: "#7C7058",
             lip: "#302A20", key: "#FFF6E0", horizon: 486, grit: "#201A12" },
};
export const asPlace = (k: keyof typeof PLACES): Place => PLACES[k];

export const vivid = (hex: string, k: number) => {
  const n = parseInt(hex.slice(1), 16);
  let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  const l = (r + g + b) / 3;
  r = Math.max(0, Math.min(255, l + (r - l) * k));
  g = Math.max(0, Math.min(255, l + (g - l) * k));
  b = Math.max(0, Math.min(255, l + (b - l) * k));
  return `rgb(${r | 0},${g | 0},${b | 0})`;
};
export const lerpHex = (a: string, b: string, t: number) => {
  const A = parseInt(a.slice(1), 16), B = parseInt(b.slice(1), 16);
  const r = Math.round(((A >> 16) & 255) + (((B >> 16) & 255) - ((A >> 16) & 255)) * t);
  const g = Math.round(((A >> 8) & 255) + (((B >> 8) & 255) - ((A >> 8) & 255)) * t);
  const c = Math.round((A & 255) + ((B & 255) - (A & 255)) * t);
  return `rgb(${r},${g},${c})`;
};
export const mono = (px: number, w = 700) => ({ fontFamily: MONO, fontSize: px, fontWeight: w as 700 });
export const ui = (px: number, w = 800) => ({ fontFamily: inter.fontFamily, fontSize: px, fontWeight: w });

/* =========================================================================
   ATMOSPHERE
   ====================================================================== */

/** ⭐⭐⭐ THE TRAVELLING RAKE — the highest-value shape in the motion table,
    with both of reel 109's corrections baked in: the bands ALTERNATE LIGHT AND
    SHADOW (a light-only wash lifts the black point, which is the banned fix),
    and every edge is FEATHERED (a hard edge reads as wallpaper laid over the
    room; a feathered one reads as light falling through a structure). Width is
    kept and the motion is bought back through SPEED, which no viewer reads as
    stripiness in a still frame. */
export const Rake: React.FC<{ f: number; y: number; h: number; x0?: number; span?: number;
  c?: string; o?: number; rate?: number; z?: number; n?: number; skew?: number }> =
  ({ f, y, h: hh, x0 = 0, span = W + 420, c = "#F2DFAE", o = 0.30, rate = 2.1, z = 26,
     n = 7, skew = -16 }) => (
  <>{Array.from({ length: n }, (_, i) => {
    const pitch = span / n;
    const x = x0 + (((i * pitch + f * rate) % span) + span) % span - 210;
    const dk = i % 2 === 1;
    return (
      <div key={"rk" + i} style={{ position: "absolute", left: x, top: y, width: pitch * 0.52,
        height: hh, zIndex: z, transform: `skewX(${skew}deg)`,
        background: dk
          ? `linear-gradient(90deg, ${hexa("#05070C", 0)} 0%, ${hexa("#05070C", o * 1.16)} 46%, ${hexa("#05070C", 0)} 100%)`
          : `linear-gradient(90deg, ${hexa(c, 0)} 0%, ${hexa(c, o * 0.86)} 46%, ${hexa(c, 0)} 100%)` }} />
    );
  })}</>
);

/** ⭐⭐⭐ THE BACKGROUND PROCESS, AND IT IS THE BIGGEST SINGLE LEVER IN THE
    MOTION TABLE: *a full-width high-contrast travelling band — one scene 10.44
    against its neighbour 2.83 at identical push.*

    Round 4 of this reel measured a median of **4.87 against a bar of 9.00, with
    11 of 19 scenes STATIC**, and the diagnosis was not that the rooms were badly
    drawn — it was that almost nothing LARGE moved in any of them. Motes are
    3-14px and vanish in the audit's 1012→240 downsample; a spinning fan face
    repaints only its own small disc; a 92px day-plate crossing at 5.8px/frame
    repaints about 1% of the panel per sample.

    ⛔ AND THE TRAP ON THE OTHER SIDE: reel 112 multiplied every rake by 2.6,
    hit 10.72 with 0/20 failing, every gate green — and turned the reel into
    VENETIAN BLINDS. So this is deliberately NOT a stripe generator. Every
    instance is mounted as something the room would actually contain (a hoist
    run, a stock belt, a cable tray, traffic, a fan wall), which is also why the
    shapes are drawn rather than filled.

    The three things that make it register, all from the formula
    `motion ≈ (fraction of panel repainted per 0.1s) × (luma delta)`:
      SIZE   every carried object is >= 48px on its short side
      VALUE  the run ALTERNATES light and shadow, so each boundary is a big
             luma step rather than a hue change the greyscale audit cannot see
      SPEED  motion is bought through rate, which no viewer reads as heaviness
             at any instant, never through opacity, which lifts the black point */
export const Runner: React.FC<{
  y: number; f: number; z?: number; rate?: number; pitch?: number; w?: number; h?: number;
  c?: string; c2?: string; kind?: "load" | "crate" | "cell" | "car" | "fan" | "bead";
  rail?: boolean; hang?: number; o?: number;
}> = ({ y, f, z = 28, rate = 7.2, pitch = 176, w: ww = 118, h: hh = 74,
        c = "#C6B48A", c2 = "#0B1020", kind = "load", rail = true, hang = 0, o = 1 }) => {
  const span = pitch * Math.ceil((W + pitch * 2) / pitch);
  const n = Math.ceil(span / pitch);
  return (
    <>
      {rail && (
        <div style={{ position: "absolute", left: -40, top: y - 16, width: W + 80, height: 13,
          zIndex: z, background: dkh(c2, -0.12), opacity: o }} />
      )}
      {Array.from({ length: n }, (_, i) => {
        const x = ((i * pitch - f * rate) % span + span) % span - pitch;
        const dk = i % 2 === 1;
        const face = dk ? c2 : c;
        const sway = hang ? Math.sin(f / 14 + i * 1.1) * hang : 0;
        return (
          <div key={"rn" + i} style={{ position: "absolute", left: x, top: y + (hang ? 12 : 0),
            width: ww, height: hh, zIndex: z + 1, opacity: o,
            transform: sway ? `rotate(${sway}deg)` : undefined, transformOrigin: "50% -14px" }}>
            {hang > 0 && (
              <div style={{ position: "absolute", left: ww / 2 - 3, top: -14, width: 6, height: 16,
                background: dkh(c2, -0.3) }} />
            )}
            {kind === "load" && (
              <div style={{ position: "absolute", inset: 0, borderRadius: 4, background: face,
                border: `4px solid ${hexa("#000", 0.44)}` }}>
                <div style={{ position: "absolute", left: "14%", top: "22%", width: "44%",
                  height: 9, background: dk ? hexa("#8FA0C0", 0.7) : hexa("#000", 0.28) }} />
              </div>
            )}
            {kind === "crate" && (
              <div style={{ position: "absolute", inset: 0, borderRadius: 3, background: face,
                border: `4px solid ${hexa("#000", 0.5)}` }}>
                {[0, 1, 2].map(j => (
                  <div key={j} style={{ position: "absolute", left: 6, right: 6, top: 8 + j * (hh / 3.4),
                    height: 6, background: hexa("#000", 0.22) }} />
                ))}
              </div>
            )}
            {kind === "cell" && (
              <div style={{ position: "absolute", inset: 0, borderRadius: 3, background: face,
                border: `3px solid ${hexa("#000", 0.42)}`, display: "flex", flexWrap: "wrap",
                alignContent: "flex-start", padding: 7, gap: 5 }}>
                {Array.from({ length: 6 }, (_, j) => (
                  <div key={j} style={{ width: (ww - 34) / 3, height: (hh - 26) / 2,
                    background: dk ? hexa("#7FD4E4", (j % 3) * 0.28 + 0.18) : hexa("#000", 0.18),
                    borderRadius: 2 }} />
                ))}
              </div>
            )}
            {kind === "car" && (
              <>
                <div style={{ position: "absolute", left: 0, top: hh * 0.30, width: ww,
                  height: hh * 0.52, borderRadius: 7, background: face,
                  border: `3px solid ${hexa("#000", 0.5)}` }} />
                <div style={{ position: "absolute", left: ww * 0.20, top: 0, width: ww * 0.52,
                  height: hh * 0.40, borderRadius: "8px 8px 0 0", background: dkh(face, 0.22) }} />
                <div style={{ position: "absolute", left: ww - 16, top: hh * 0.46, width: 15,
                  height: 12, borderRadius: 3, background: "#FFE7B0" }} />
                {[ww * 0.20, ww * 0.70].map((wx, j) => (
                  <div key={j} style={{ position: "absolute", left: wx, top: hh * 0.72,
                    width: hh * 0.30, height: hh * 0.30, borderRadius: "50%", background: "#14120E" }} />
                ))}
              </>
            )}
            {kind === "fan" && (
              <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: dkh(c2, -0.06),
                border: `4px solid ${hexa("#000", 0.44)}`, overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0,
                  transform: `rotate(${f * (7 + (i % 3) * 2)}deg)` }}>
                  {Array.from({ length: 7 }, (_, b) => (
                    <div key={b} style={{ position: "absolute", left: "50%", top: "50%",
                      width: ww * 0.40, height: hh * 0.17, marginTop: -hh * 0.085, borderRadius: 5,
                      transformOrigin: "0% 50%", transform: `rotate(${b * 51}deg)`, background: c }} />
                  ))}
                </div>
              </div>
            )}
            {kind === "bead" && (
              <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: face }} />
            )}
          </div>
        );
      })}
    </>
  );
};

export const Ring: React.FC<{ x: number; y: number; f: number; at: number; c?: string;
  z?: number; s?: number; dur?: number }> =
  ({ x, y, f, at, c = "#F2E0B4", z = 74, s = 1, dur = 20 }) => {
  const lf = f - at;
  if (lf < 0 || lf > dur) return null;
  const k = lf / dur;
  const r = (26 + k * 190) * s;
  return (
    <div style={{ position: "absolute", left: x - r, top: y - r * 0.36, width: r * 2,
      height: r * 0.72, borderRadius: "50%", zIndex: z,
      border: `${Math.max(2, 9 * (1 - k) * s)}px solid ${hexa(c, 0.72 * (1 - k))}` }} />
  );
};

export const Puff: React.FC<{ x: number; y: number; f: number; at: number; c?: string;
  z?: number; n?: number; s?: number; up?: number }> =
  ({ x, y, f, at, c = "#CFC4AE", z = 60, n = 9, s = 1, up = 0 }) => {
  const lf = f - at;
  if (lf < 0 || lf > 30) return null;
  return (<>{Array.from({ length: n }, (_, i) => {
    const a = (rnd(i, 3) - 0.5) * 2;
    const k = Math.min(1, lf / 26);
    const d = (34 + rnd(i, 4) * 96) * s;
    return (
      <div key={"pf" + i} style={{ position: "absolute",
        left: x + a * d * k - 16 * s, top: y - (up * k) - rnd(i, 5) * 40 * s * k - 16 * s,
        width: (26 + rnd(i, 6) * 34) * s * (0.5 + k), height: (26 + rnd(i, 6) * 34) * s * (0.5 + k),
        borderRadius: "50%", background: hexa(c, 0.40 * (1 - k)), zIndex: z }} />
    );
  })}</>);
};

/** a soft pool of practical light on the floor — matte, never an emissive blur */
export const Pool: React.FC<{ x: number; y: number; w: number; c?: string; o?: number;
  z?: number; hh?: number }> =
  ({ x, y, w: ww, c = "#F2E0B4", o = 0.22, z = 18, hh }) => (
  <div style={{ position: "absolute", left: x - ww / 2, top: y, width: ww,
    height: hh ?? ww * 0.30, borderRadius: "50%", zIndex: z,
    background: `radial-gradient(50% 50% at 50% 50%, ${hexa(c, o)} 0%, ${hexa(c, 0)} 100%)` }} />
);

/** ⭐ EFFORT WANTS AN EMITTER ON THE STILLEST PART OF THE HERO (§11). Used on
    the hero's head at S12 (the pump), and on the METER BOX at S7 — where the
    still thing is the box, not a body. */
export const Steam: React.FC<{ x: number; y: number; f: number; at: number; n?: number;
  z?: number; s?: number; c?: string; rate?: number }> =
  ({ x, y, f, at, n = 7, z = 62, s = 1, c = "#E8E0D0", rate = 1 }) => {
  const lf = f - at;
  if (lf < 0) return null;
  return (<>{Array.from({ length: n }, (_, i) => {
    const t = ((lf * rate * 0.05) + rnd(i, 8)) % 1;
    const side = i % 2 ? 1 : -1;
    return (
      <div key={"st" + i} style={{ position: "absolute",
        left: x + side * (26 + t * 42) * s + Math.sin(t * 7 + i) * 12 * s,
        top: y - t * 128 * s,
        width: (13 + t * 34) * s, height: (13 + t * 34) * s, borderRadius: "50%",
        background: hexa(c, 0.36 * (1 - t)), zIndex: z }} />
    );
  })}</>);
};

/** ⭐ SWEAT — drops thrown off a straining body. `Steam` says heat; sweat says
    EFFORT, and the two together are what reads as "he is about to fail" at
    thumbnail size where a facial expression cannot. Each drop is >= 14px so it
    survives the audit's 1012->240 downsample, and they are thrown SIDEWAYS on an
    arc rather than dripping, because a drip reads as calm. */
export const Sweat: React.FC<{ x: number; y: number; f: number; at: number; n?: number;
  z?: number; s?: number; c?: string; rate?: number }> =
  ({ x, y, f, at, n = 9, z = 72, s = 1, c = "#BFD9EC", rate = 1 }) => {
  const lf = f - at;
  if (lf < 0) return null;
  return (<>{Array.from({ length: n }, (_, i) => {
    const t = ((lf * rate * 0.055) + rnd(i, 31)) % 1;
    const side = i % 2 ? 1 : -1;
    const sz = (14 + rnd(i, 32) * 12) * s;
    return (
      <div key={"sw" + i} style={{ position: "absolute",
        left: x + side * (34 + t * 150) * s,
        top: y + (-52 * Math.sin(t * Math.PI) + t * 176) * s,
        width: sz, height: sz * 1.35, zIndex: z,
        borderRadius: "50% 50% 50% 50% / 62% 62% 38% 38%",
        background: hexa(c, 0.82 * (1 - t * 0.75)),
        transform: `rotate(${side * (18 + t * 46)}deg)` }} />
    );
  })}</>);
};

/** falling debris — plaster at S0, dust at S18. ⛔ each mote is >= 14px on the
    short side; a 3px streak becomes 0.7px after the audit's downsample and is
    invisible to a human too. */
export const Fall: React.FC<{ x: number; y: number; w: number; f: number; at: number;
  n?: number; z?: number; c?: string; rate?: number; s?: number }> =
  ({ x, y, w: ww, f, at, n = 10, z = 64, c = "#E4DCCA", rate = 1, s = 1 }) => {
  const lf = f - at;
  if (lf < 0) return null;
  return (<>{Array.from({ length: n }, (_, i) => {
    const t = ((lf * rate * 0.022) + rnd(i, 21)) % 1;
    const sz = (14 + rnd(i, 22) * 20) * s;
    return (
      <div key={"fl" + i} style={{ position: "absolute",
        left: x + rnd(i, 23) * ww + Math.sin(t * 5 + i) * 16,
        top: y + t * 300 * s, width: sz, height: sz * (0.5 + rnd(i, 24) * 0.6),
        borderRadius: 3, zIndex: z, background: hexa(c, 0.72 * (1 - t * 0.7)),
        transform: `rotate(${t * 260 + i * 37}deg)` }} />
    );
  })}</>);
};

/* =========================================================================
   THE CAST
   ====================================================================== */

/** ⛔ ALL TWELVE COSTUME LEVERS, CYCLED DETERMINISTICALLY (never random — a
    re-render must be byte-identical). Reel 107 shipped four and was told so. */
export const COSTUMES: Array<Record<string, number>> = [
  { constr: 1 }, { glasses: 1 }, { chef: 1 }, { beard: 1 }, { girl: 1 }, { fro: 1 },
  { suit: 1 }, { prof: 1 }, { cop: 1 }, { wizard: 1 }, { samurai: 1 }, { stern: 1 },
];
export const costumeFor = (i: number) => COSTUMES[i % COSTUMES.length];

/** ⭐ SPRITES NEED AN ACTION LOOP, NOT AN IDLE — four loops chosen by index,
    each on its own phase and rate, so a crowd does four things at once.
    ⛔ AND AN ACTION LOOP IS NOT A SCENE. This is what the floor does WHILE the
    scene happens; every scene still owes its own four-part event. */
export const Crew: React.FC<{ f: number; x: number; y: number; i: number; size: number;
  z?: number; at?: number; loop?: number; tint?: string; flip?: boolean; cheer?: number }> =
  ({ f, x, y, i, size, z = 48, at = 0, loop, tint, flip = false, cheer: cheerIn = 0 }) => {
  const lf = f - at;
  if (lf < -2) return null;
  const inS = E(lf, 0, 8, 0, 1, BACK);
  const sq = squash(lf, 6, 0.16, 3, 11);
  const L = loop ?? i % 4;
  const ph = i * 1.7;
  let dx = 0, dy = 0, rot = 0, cheer = 0, gaze = 0, nod = 3.6;
  if (L === 0) {                                  /* PACE */
    dx = Math.sin(f / 17 + ph) * size * 0.30;
    dy = -Math.abs(Math.sin(f / 8.5 + ph)) * size * 0.055;
    rot = Math.cos(f / 17 + ph) * 3.4;
  } else if (L === 1) {                           /* WORK — a real swinging arm */
    rot = 7 + Math.sin(f / 6.2 + ph) * 8.5;
    dy = Math.abs(Math.sin(f / 6.2 + ph)) * size * 0.05;
    dx = Math.sin(f / 6.2 + ph) * size * 0.055;
  } else if (L === 2) {                           /* HOP */
    const t = (f / 26 + ph) % 1;
    const j = Math.max(0, Math.sin(t * Math.PI));
    dy = -j * size * 0.24; cheer = j > 0.55 ? 1 : 0;
    rot = Math.sin(f / 26 + ph) * 2.8;
  } else {                                        /* LOOK */
    gaze = Math.sin(f / 21 + ph) * 1.0;
    rot = Math.sin(f / 21 + ph) * 4.2;
    nod = 5.2;
  }
  return (
    <div style={{ position: "absolute", left: x - size / 2 + dx, top: y - size + dy, width: size,
      height: size, zIndex: z,
      transform: `scale(${inS * sq}) rotate(${rot}deg) ${flip ? "scaleX(-1)" : ""}`,
      transformOrigin: "50% 100%" }}>
      <Mascot lf={f + i * 9} size={size} gaze={gaze} nodAmp={nod} nodSpeed={9 + (i % 3) * 2}
        cheer={Math.max(cheer, cheerIn)} tint={tint} {...costumeFor(i)} />
    </div>
  );
};

/** ⭐⭐ THE HERO. Name what the CLAUDE DOES in every scene: `strain` drives a
    real DEFORMATION, `drive` is a whole-body move with DISTANCE, and past
    halfway a FAST SMALL TREMBLE — the opposite of a slow sway — says effort.
    ⭐⭐⭐ AND THE HERO HAS AN ACTION LOOP TOO (reel 115 §14 — `Hero` had none and
    stood dead for 100 of 132 frames in a shipped reel). Its amplitude scales to
    zero as drive/strain rise, so an authored beat always wins outright and the
    loop only ever fills the gaps. A breathing idle sits under all four at the
    measured 4.6px / 2.6deg floor at which an idle actually READS — 1.7px
    registers on a metric and looks static to a person. */
/* ⭐⭐⭐ `heat` — THE SPRITE'S EMOTION, AS ONE NUMBER. Asked for directly (Alex,
   reel 122: *"make the claude sprite have more emotions, like turning red and
   mad, steaming, stuff like that"*). 0..1 drives FIVE things at once so a scene
   only ever has to author one value:
     · the body flushes CLAY -> a hot red             (colour)
     · it TREMBLES, faster and wider                  (motion)
     · the brow goes hard                             (face)
     · steam lifts off the head                       (emitter)
     · and above 0.55 the anger ticks pop             (accent)
   ⛔⛔ THE FLUSH IS TRANSIENT, NEVER A COSTUME. `hue-rotate`/`saturate` on the
   sprite are BANNED from GRADE and a permanently recoloured Claude is off-brand
   (feedback_trial_cut_variants) — this blends over the house clay for the beat
   and comes back. Every scene that uses it must bring `heat` back to 0. */
export const Hero: React.FC<{ f: number; x: number; y: number; size: number; z?: number;
  drive?: number; strain?: number; flip?: boolean; costume?: Record<string, number>;
  gaze?: number; cheer?: number; reach?: number; tint?: string; shock?: number;
  stern?: number; pop?: number; act?: number; ph?: number; lift?: number;
  heat?: number }> =
  ({ f, x, y, size, z = 56, drive = 0, strain = 0, flip = false, costume = { constr: 1 },
     gaze = 0, cheer = 0, reach = 96, tint, shock = 0, stern = 0, pop = 1,
     act = 1, ph = 0, lift = 0, heat = 0 }) => {
  const hot = Math.max(0, Math.min(1, heat));
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

  const tremble = (strain > 0.5 ? Math.sin(f * 1.9) * 3.4 * (strain - 0.5) * 2 : 0)
    + (hot > 0.05 ? Math.sin(f * (2.4 + hot * 2.2)) * 4.2 * hot : 0);
  const sy = 1 - strain * 0.16;
  const sx = 1 + strain * 0.12;
  const dx = (flip ? -1 : 1) * (drive * reach + ax) + tremble;
  const dy = strain * size * 0.05 + ay - lift;
  const rot = (flip ? -1 : 1) * (drive * 7 - strain * 2 + ar);
  return (
    <div style={{ position: "absolute", left: x - size / 2 + dx, top: y - size + dy,
      width: size, height: size, zIndex: z,
      transform: `scale(${sx * pop * (flip ? -1 : 1)}, ${sy * pop}) rotate(${rot}deg)`,
      transformOrigin: "50% 100%" }}>
      <Mascot lf={f} size={size} gaze={gaze + aGaze} nodAmp={2.6 + strain * 2 + k * 1.4}
        nodSpeed={10} cheer={Math.max(cheer, aCheer)}
        tint={hot > 0.02 ? lerpHex(tint || CLAY, "#B8331E", hot * 0.86) : tint}
        shock={shock} stern={Math.max(stern, hot * 0.9)} {...costume} />
      {/* ── what BOILING OVER looks like: steam off the head, and the ticks ── */}
      {/* ⛔ THE FIRST BUILD STARTED THE STEAM INSIDE THE HAT at 0.16*size and
             rose it 0.42*size — 20px blobs on a yellow hard hat, which read as
             noise on the costume, not as steam. It has to START ABOVE THE CROWN
             and it has to be BIG. */}
      {hot > 0.06 && Array.from({ length: 4 }, (_, i) => {
        const t = ((f * (0.018 + hot * 0.024) + i / 4) % 1);
        const r = size * (0.048 + t * 0.072) * hot;
        return (
          <div key={"st" + i} style={{ position: "absolute",
            left: size * (0.32 + (i % 3) * 0.18) + Math.sin(t * 6.2 + i * 2) * size * 0.07 - r,
            top: -size * 0.03 - t * size * 0.52 - r,
            width: r * 2, height: r * 2, borderRadius: "50%",
            opacity: hot * (1 - t * 0.88) * 0.82, filter: `blur(${size * 0.016}px)`,
            background: `radial-gradient(50% 50% at 50% 50%, ${hexa("#F6EAE0", 0.95)} 0%, ${hexa("#D8C6BA", 0)} 100%)` }} />
        );
      })}
      {hot > 0.55 && [-1, 1].map(sd => (
        <div key={"tk" + sd} style={{ position: "absolute",
          left: size * (sd < 0 ? 0.04 : 0.80), top: size * 0.20,
          width: size * 0.16, height: size * 0.16,
          opacity: Math.min(1, (hot - 0.55) * 3.2) * (0.6 + 0.4 * Math.abs(Math.sin(f * 0.42))),
          transform: `scaleX(${sd})` }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{ position: "absolute", left: `${i * 32}%`, top: `${i * 14}%`,
              width: "36%", height: size * 0.017, borderRadius: 2, background: "#C2331C",
              transform: `rotate(${-38 + i * 30}deg)` }} />
          ))}
        </div>
      ))}
    </div>
  );
};

/** ⛔ READ THE RIG BEFORE YOU DRAW GEOMETRY. `Mascot` draws its own arms; the
    only limb geometry that survives is a forearm that STARTS on the mascot's own
    arm and ENDS on the thing it holds. A limb terminating in mid-air reads as a
    TAIL on every sprite in the reel — that cost reel 110 two rounds. */
export const Forearm: React.FC<{ x0: number; y0: number; x1: number; y1: number;
  w?: number; c?: string; z?: number }> =
  ({ x0, y0, x1, y1, w = 22, c = "#C4674A", z = 58 }) => {
  const len = Math.hypot(x1 - x0, y1 - y0);
  const ang = (Math.atan2(y1 - y0, x1 - x0) * 180) / Math.PI;
  return (
    <div style={{ position: "absolute", left: x0, top: y0 - w / 2, width: len, height: w,
      borderRadius: w / 2, zIndex: z, transformOrigin: "0% 50%", transform: `rotate(${ang}deg)`,
      background: `linear-gradient(180deg, ${mxh(c, 0.18)} 0%, ${dkh(c, 0.22)} 100%)` }}>
      <div style={{ position: "absolute", right: -w * 0.10, top: -w * 0.08, width: w * 1.05,
        height: w * 1.08, borderRadius: "42%", background: dkh(c, 0.10) }} />
    </div>
  );
};
