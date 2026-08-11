import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { inter, fraunces } from "./fonts";
import { Panel, Mascot, hexA, MONO } from "./SlopKit";
import { CamCtx, PalCtx, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D } from "./AgyWorld";

/* ===========================================================================
   REEL 98 "NOMAD" — THE WORLD KIT.
   Board: storyboards/98-nomad.md.

   The place is a knowledge vault cut into a snow ridge: an exterior at dusk, a
   descending throat, and a lit archive hall with four working zones. Every
   scene is one of eleven PLACES below, and neighbours in the cut differ by both
   hue and lightness so the viewer knows they have moved.

   ⛔ MATTE PALETTE, NOT NEON (REEL-BUILD-LEARNINGS §1). Solid paints, dark
      drop-shadows, warm painted interiors. The subject here is a machine in a
      bunker, which is exactly the setup that pulls a build toward glowing
      terminals on black — so the hero screen is deliberately PAPER-TONED
      (#F7F5F0), the same light UI the real Command Center serves at
      localhost:8080. It is also the single brightest value in the reel, which
      is what lets the crest work: when every other light dies, a white
      rectangle in a black room needs no glow to dominate.
   ⛔ NO `0 0 Npx <colour>` ANYWHERE. Practical light is a solid disc plus one
      low-alpha ring (the house `Surface` pattern), never an emissive blur.
   ========================================================================= */

export const W = 1012, H = 792;
/** the Panel's real safe area once the header and the rail are accounted for */
export const SAFE = { x0: 46, x1: 974, y0: 56, y1: 690 } as const;

export { E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, CamCtx, PalCtx };

/* the house accents, matte */
export const CLAY = "#D97757", GOLD = "#E7B24C", GREEN = "#3F9E74";
export const RED = "#C44A3A", SKY = "#5AA0DE", PAPER = "#F7F5F0";
export const INK = "#1A1813";

/** deterministic hash — no Math.random anywhere in a reel */
export const rnd = (seed: number, k: number) => {
  const v = Math.sin(seed * 51.13 + k * 17.71) * 4371.7;
  return v - Math.floor(v);
};

/* ---------------------------------------------------------------------------
   THE ELEVEN PLACES. `key` is the practical-light colour the scene's props are
   lit by; `back`/`back2` the back wall or sky; `floor`/`floor2` the ground.
   ------------------------------------------------------------------------ */
export type Place = {
  back: string; back2: string;          // sky / back wall, top to bottom
  floor: string; floor2: string;        // ground plane, near to far
  lip: string;                          // the horizon or the skirting line
  key: string;                          // the practical colour
  horizon: number;                      // where the ground starts
  grit: string;
};

export const PLACES: Record<string, Place> = {
  /* --- exteriors: cold, blue, HIGH-VALUE snow ---------------------------
     ⛔ FRAME 0 IS A BRIGHTNESS COMPETITION (docs/THE-OPEN.md law 1). The first
        cut of `ridge` measured 128/255 mean panel luma against the ≥150 the doc
        demands, because the snow plain only occupied 41% of the frame and the
        sky above it sat at ~110. Fixed by RAISING THE HORIZON (snow now 46% of
        the panel), lifting the plain a full stop, and warming the sky's lower
        third toward the sun rather than leaving it a flat cold blue. */
  /* ⛔ THE SNOW IS ASH-STAINED AND THE SKY IS SMOKE. Clean white drifts under a
     clear blue dusk is a ski holiday. Every exterior value is pulled toward
     brown-grey, which keeps the frame BRIGHT (the plain is still the highest
     value in the panel) while reading as fallout rather than fresh powder. */
  ridge:  { back: "#8C818A", back2: "#E4CFB2", floor: "#EFECE4", floor2: "#D2CDC2",
            lip: "#B8B1A6", key: GOLD, horizon: 430, grit: "#B3ACA0" },
  door:   { back: "#655E6C", back2: "#B49C82", floor: "#D6D2CA", floor2: "#A8A49C",
            lip: "#928D85", key: GOLD, horizon: 640, grit: "#9A948B" },
  mast:   { back: "#7E7684", back2: "#D8C2A6", floor: "#E4E0D8", floor2: "#BAB5AB",
            lip: "#A39D93", key: RED, horizon: 430, grit: "#A69F94" },
  kiosk:  { back: "#514E5C", back2: "#94897C", floor: "#D4D0C8", floor2: "#A8A49C",
            lip: "#8E8981", key: "#B0AEA6", horizon: 560, grit: "#948F86" },

  /* --- the throat: the transition, warm ahead and cold behind ----------- */
  throat: { back: "#2E2A26", back2: "#4A4039", floor: "#5A4E44", floor2: "#3A322C",
            lip: "#6B5C4E", key: GOLD, horizon: 540, grit: "#7A6A58" },

  /* --- interiors: warm painted rooms, each a different mood ------------- */
  /* ⛔ INTERIOR FLOORS ARE CONCRETE, NOT DIRT. v1 painted them #7A6952/#6E6156
     and both the alcove and the stacks read as rooms with a mud floor. Concrete
     also gives the warm practicals something cool to sit against. */
  alcove: { back: "#42535F", back2: "#33414D", floor: "#5E6161", floor2: "#3D4041",
            lip: "#5A6C79", key: "#E3C98C", horizon: 500, grit: "#787B79" },
  stacks: { back: "#3B4A54", back2: "#2C383F", floor: "#63665F", floor2: "#42443F",
            lip: "#55686F", key: GOLD, horizon: 470, grit: "#7C7F76" },
  chart:  { back: "#4A3C30", back2: "#332921", floor: "#8A6242", floor2: "#5C412C",
            lip: "#6B5540", key: "#EFD9A2", horizon: 460, grit: "#9E7A54" },
  hall:   { back: "#39454E", back2: "#232C33", floor: "#6B5C4A", floor2: "#3E3529",
            lip: "#4E5C66", key: GOLD, horizon: 440, grit: "#7E6C56" },
  shaft:  { back: "#4E5A64", back2: "#39434C", floor: "#6A5D50", floor2: "#443B32",
            lip: "#63717C", key: "#C9D6E2", horizon: 560, grit: "#7C6C5C" },
  dark:   { back: "#171C22", back2: "#0D1115", floor: "#1B1712", floor2: "#0E0C09",
            lip: "#232A31", key: PAPER, horizon: 500, grit: "#2A241D" },
};

/** the variant palette rotation — the SAME lever reel 94 uses, so six cuts do
    not share a pixel-identical body. Borrows COLOUR only; `horizon` stays with
    the original place because every prop is positioned against it. */
/* ⛔⛔ THE ROTATION MUST STAY INSIDE ITS OWN CLIMATE.
   v1 rotated across the whole `PLACES` table, so on cut B the `ridge` exterior
   borrowed `throat`'s browns and on cut C it borrowed `chart`'s. Measured frame-0
   panel luma: cut A 155, cut B **85**, cut C **109** — two of the four opens went
   muddy and lost the brightness competition that docs/THE-OPEN.md calls law 1,
   for a variance lever that was supposed to be free.
   ⭐ The fix is two rings. An exterior only ever borrows from another exterior
   (all four are cold, high-value snow), an interior only from another interior.
   The cuts still diverge — they just diverge without going dark. */
/* ⛔⛔ AND `kiosk` IS NOT A DONOR, AND EXTERIORS TAKE NO LEVEL SHIFT.
   Round 2 measured cut B at 106 and cut C at 115 frame-0 panel luma against
   cut A's 141. Two causes, both in here: the donor ring included `kiosk`, which
   is deliberately the darkest exterior in the reel because it is the paid-gate
   scene, and pal 3 applied a DARKENER on top. A variance lever must never cost
   an open its brightness — divergence between these four cuts is already
   carried by four completely different hook compositions, so the palette only
   has to differ, not to dim. Exteriors now rotate among the three bright
   places and take no level shift at all; the level shift is interiors only. */
const EXT_DONORS = ["ridge", "door", "mast", "kiosk"];
const INT = ["throat", "alcove", "stacks", "chart", "hall", "shaft", "dark"];
const LEVEL: Record<number, (c: string) => string> = {
  1: (c) => mix(c, 0.10),
  2: (c) => mix(c, 0.18),
  3: (c) => dark(c, 0.12),
};
export const usePlace = (key: string): Place => {
  const p = React.useContext(PalCtx);
  const base = PLACES[key];
  if (!p) return base;
  const isExt = EXT_DONORS.includes(key);
  const ring = isExt ? EXT_DONORS : INT;
  const idx = Math.max(0, ring.indexOf(key));
  const OFFS: Record<number, number> = { 1: 1, 2: 2, 3: 3 };
  const d = PLACES[ring[(idx + (OFFS[p] ?? p)) % ring.length]];
  const L = isExt ? undefined : LEVEL[p];
  const c = L ? { ...d, back: L(d.back), back2: L(d.back2), floor: L(d.floor),
    floor2: L(d.floor2), lip: L(d.lip), grit: L(d.grit) } : d;
  return { ...c, key: base.key, horizon: base.horizon };
};

/* =========================================================================
   SURFACES
   ====================================================================== */

/** wind-driven snow. A foreground band and a far band at different rates, so
    the air has depth without anything else having to move. */
export const Snow: React.FC<{ f: number; n?: number; z?: number; near?: boolean;
  speed?: number; c?: string }> =
  ({ f, n = 40, z = 60, near = false, speed = 1, c = "#EDF2F6" }) => (<>
    {Array.from({ length: n }, (_, i) => {
      const sp = (near ? 8.5 : 3.2) * speed * (0.6 + rnd(i, 1) * 0.8);
      const x = ((rnd(i, 2) * 1240 - f * sp) % 1240 + 1240) % 1240 - 110;
      const y = rnd(i, 3) * H + Math.sin(f / 26 + i) * (near ? 16 : 6);
      const s = near ? 4 + rnd(i, 4) * 5 : 2 + rnd(i, 5) * 2;
      return <div key={"sn" + i} style={{ position: "absolute", left: x, top: y,
        width: s * (near ? 3.4 : 2.4), height: s, borderRadius: s,
        background: c, opacity: near ? 0.82 : 0.5, zIndex: z }} />;
    })}
  </>);

/** ⛔⛔ THE EXTERIOR IS A DOOMSDAY, NOT A SNOWY EVENING.
    v1 painted an intact city with warm lit windows under a clear dusk and it
    read as a pleasant winter scene with a bunker in it. The VO's first line is
    "an AI for the apocalypse" and the frame has to agree with it.

    What makes it read as the end of the world, in order of how much each pays:
      1  a BROKEN SKYLINE. Sheared tops, leaning towers, whole floors missing,
         a toppled crane, a collapsed span. An intact silhouette is a healthy
         city however dark you paint it.
      2  a STORM CEILING. Two drifting cloud bands crushing the sky down to a
         letterbox. It also gives the frame continuous motion for free.
      3  FIRES on the horizon, as a solid muted ember band under the ruins,
         never as neon (REEL-BUILD-LEARNINGS §1).
      4  ASHFALL mixed with the snow — dark flakes among light ones, which is
         the single cheapest "something has burned" signal there is.
      5  RUBBLE, not clean drifts. Slabs, rebar and debris breaking the plain.

    ⭐ AND THE CLOCK STILL WORKS. `lit` is now "how much of the emergency power
    is still hanging on" rather than "how alive the city is". The world is
    already ruined at frame 0; what dies at the crest is the LAST of it. That is
    a better turn than a healthy city dying, and it costs the arc nothing. */
export const Ridge: React.FC<{ p: Place; f: number; city?: number; lit?: number;
  sunX?: number; portal?: number; storm?: number; fires?: number }> =
  ({ p, f, city = 1, lit = 1, sunX = 806, storm = 1, fires = 1 }) => {
  const hz = p.horizon;
  return (<>
    <div style={{ position: "absolute", inset: 0, zIndex: 1,
      background: `linear-gradient(178deg, ${dark(p.back, 0.24)} 0%, ${p.back2} 100%)` }} />

    {/* 2 · THE STORM CEILING — two bands drifting at different rates. This is
        the reel's largest continuous motion source and it costs no hierarchy,
        because atmosphere is a PLANE, not a subject. */}
    {storm > 0 && [0, 1].map((c) => {
      const yy = -30 + c * 62, hh = 122 - c * 26;
      const dx = -((f * (0.42 + c * 0.55)) % 1400);
      return (
        <div key={"cl" + c} style={{ position: "absolute", left: 0, right: 0, top: yy,
          height: hh + 60, zIndex: 2 + c, overflow: "hidden" }}>
          {Array.from({ length: 14 }, (_, i) => {
            const bw = 240 + rnd(c * 11 + i, 1) * 300;
            return <div key={i} style={{ position: "absolute",
              left: dx + i * 200 + rnd(c * 11 + i, 2) * 90, top: rnd(c * 11 + i, 3) * 40,
              width: bw, height: hh, borderRadius: hh / 2,
              background: dark(p.back, 0.22 - c * 0.10), opacity: (0.40 - c * 0.12) * storm }} />;
          })}
        </div>
      );
    })}

    {/* 3 · FIRES. A solid muted ember band low on the sky, plus two hot cores
        sitting behind the ruins. Solid paints and one soft ring, never a glow. */}
    {fires > 0 && (<>
      <div style={{ position: "absolute", left: 0, right: 0, top: hz - 168, height: 176, zIndex: 3,
        background: `linear-gradient(180deg, ${hexa("#C9743A", 0)} 0%, ${hexa("#C9743A", 0.34 * fires)} 72%, ${hexa("#E8AC68", 0.52 * fires)} 100%)` }} />
      {[[268, 0.9], [742, 0.62]].map(([fx, k], i) => (
        <div key={"fi" + i} style={{ position: "absolute", left: (fx as number) - 150,
          top: hz - 150, width: 300, height: 190, zIndex: 4, borderRadius: "50%",
          background: `radial-gradient(ellipse at 50% 100%, ${hexa("#E8A25C", (0.40 * (k as number) * fires) * (0.86 + Math.sin(f / 13 + i * 2) * 0.14))} 0%, ${hexa("#E8A25C", 0)} 70%)` }} />
      ))}
    </>)}
    {/* the sun, sitting IN the smoke rather than in a clear sky */}
    <div style={{ position: "absolute", left: sunX - 240, top: hz - 300, width: 480, height: 480,
      borderRadius: "50%", zIndex: 4,
      background: `radial-gradient(circle, ${hexa("#E9C899", 0.34)} 0%, ${hexa("#E9C899", 0.10)} 44%, ${hexa("#E9C899", 0)} 70%)` }} />
    <div style={{ position: "absolute", left: sunX - 40, top: hz - 132, width: 80, height: 80,
      borderRadius: "50%", background: "#EBD3AC", zIndex: 5 }} />

    {/* 1 · THE BROKEN SKYLINE. Every block is sheared, leaning or gutted, and
        only a handful of emergency lights are still on — those are `lit`. */}
    {city > 0 && [0, 1, 2].map((b) => {
      const bc = [dark(p.back, 0.62), dark(p.back, 0.74), dark(p.back, 0.84)][b];
      const top = hz - 150 + b * 40;
      const litB = lit * [0.16, 0.24, 0.32][b];
      return (
        <div key={"cb" + b} style={{ position: "absolute", left: 0, right: 0, top,
          height: 190, zIndex: 6 + b }}>
          {Array.from({ length: 13 - b * 2 }, (_, i) => {
            const seed = b * 9 + i;
            const bw = 34 + rnd(seed, 1) * 58;
            const bh = 40 + rnd(seed, 2) * (104 - b * 18);
            const bx = 20 + i * (86 + b * 12) + rnd(seed, 3) * 24;
            const kind = rnd(seed, 9);
            const lean = kind > 0.84 ? (rnd(seed, 10) - 0.5) * 13 : 0;
            /* sheared / gutted / stub — never a clean rectangle */
            const clip = kind > 0.62
              ? `polygon(0 ${18 + rnd(seed, 11) * 22}%, ${34 + rnd(seed, 12) * 30}% 0, 100% ${8 + rnd(seed, 13) * 26}%, 100% 100%, 0 100%)`
              : kind > 0.34
                ? `polygon(0 0, 100% 0, 100% 100%, ${58 + rnd(seed, 14) * 22}% 100%, ${52 + rnd(seed, 15) * 16}% ${44 + rnd(seed, 16) * 22}%, ${22 + rnd(seed, 17) * 14}% ${40 + rnd(seed, 18) * 26}%, 0 100%)`
                : undefined;
            return (
              <div key={i} style={{ position: "absolute", left: bx, top: 150 - bh + b * 6,
                width: bw, height: bh, background: bc, clipPath: clip,
                transform: lean ? `rotate(${lean}deg)` : undefined,
                transformOrigin: "50% 100%" }}>
                {Array.from({ length: 6 }, (_, k) => {
                  if (rnd(b * 40 + i * 7 + k, 6) > litB) return null;
                  /* emergency lights flicker; a steady grid is a working grid */
                  const fl = 0.5 + 0.5 * Math.sin(f / (5 + (k % 4)) + i * 3 + b);
                  return <div key={k} style={{ position: "absolute",
                    left: 6 + (k % 2) * (bw * 0.46), top: 12 + Math.floor(k / 2) * 17,
                    width: Math.max(5, bw * 0.24), height: 7,
                    background: "#E9C07A", opacity: 0.34 + fl * 0.52 }} />;
                })}
              </div>
            );
          })}
          {/* a toppled crane and a collapsed span, one per band on the near two */}
          {b > 0 && (
            <div style={{ position: "absolute", left: 300 + b * 330, top: 60,
              width: 220, height: 12, background: bc,
              transform: `rotate(${b === 1 ? -34 : 22}deg)`, transformOrigin: "0% 50%" }} />
          )}
        </div>
      );
    })}
    {/* the mast that has already come down, lying across the skyline */}
    <div style={{ position: "absolute", left: 78, top: hz - 46, width: 250, height: 9,
      background: dark(p.back, 0.74), zIndex: 9, transform: "rotate(-11deg)",
      transformOrigin: "0% 50%" }} />

    {/* the ridge itself — one black rock mass under the sky */}
    <div style={{ position: "absolute", left: -40, right: -40, top: hz - 62, height: 120,
      zIndex: 11, background: dark(p.back, 0.86),
      clipPath: "polygon(0 44%, 9% 30%, 19% 40%, 31% 22%, 44% 36%, 56% 20%, 68% 34%, 80% 25%, 91% 38%, 100% 30%, 100% 100%, 0 100%)" }} />

    {/* the ground */}
    <div style={{ position: "absolute", left: 0, right: 0, top: hz, bottom: 0, zIndex: 14,
      background: `linear-gradient(182deg, ${p.floor2} 0%, ${p.floor} 100%)` }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: hz - 5, height: 8,
      background: p.lip, zIndex: 15 }} />
    {/* wind-combed drift, in short staggered arcs (full-width rules read as blinds) */}
    {Array.from({ length: 10 }, (_, i) => {
      const y = hz + 20 + i * i * 3.0 + i * 13;
      if (y > H + 20) return null;
      return Array.from({ length: 2 + (i % 2) }, (_, j) => {
        const k = rnd(i * 5 + j, 7);
        const wd = 190 + k * 330 + i * 16;
        return <div key={`dr${i}-${j}`} style={{ position: "absolute",
          left: -70 + rnd(i * 5 + j, 8) * 1000, top: y + (j % 2) * (5 + i),
          width: wd, height: 5 + i * 1.5, borderRadius: 40, background: p.grit,
          opacity: 0.26 + i * 0.026, zIndex: 16 }} />;
      });
    })}
    {/* 5 · RUBBLE. Slabs and rebar breaking the plain, so the ground reads as a
        place something fell on rather than a ski field. */}
    {Array.from({ length: 13 }, (_, i) => {
      const y = hz + 26 + rnd(i, 21) * (H - hz - 60);
      const sc = 0.5 + (y - hz) / (H - hz);
      const wd = (26 + rnd(i, 22) * 66) * sc, ht = (9 + rnd(i, 23) * 15) * sc;
      return (
        <div key={"rb" + i} style={{ position: "absolute", left: rnd(i, 24) * 1010 - 30, top: y,
          width: wd, height: ht, zIndex: 17,
          background: dark(p.grit, 0.32 + rnd(i, 25) * 0.22),
          transform: `rotate(${(rnd(i, 26) - 0.5) * 26}deg)`,
          borderTop: `${Math.max(2, ht * 0.22)}px solid ${p.grit}` }} />
      );
    })}
    {/* one bright crest, kept soft — a hard white rule reads as a seam */}
    <div style={{ position: "absolute", left: 0, right: 0, top: hz + 2, height: 26, zIndex: 18,
      background: `linear-gradient(180deg, ${hexa("#F6F9FB", 0.44)} 0%, ${hexa("#F6F9FB", 0)} 100%)` }} />
  </>);
};

/** 4 · ASHFALL. Dark flakes drifting UP as often as down, layered under the
    snow. The mix of a light particle and a dark one is what stops the weather
    reading as Christmas. */
export const Ash: React.FC<{ f: number; n?: number; z?: number; speed?: number }> =
  ({ f, n = 26, z = 62, speed = 1 }) => (<>
    {Array.from({ length: n }, (_, i) => {
      const sp = 2.2 * speed * (0.5 + rnd(i, 31) * 1.1);
      const x = ((rnd(i, 32) * 1240 - f * sp) % 1240 + 1240) % 1240 - 110;
      const rise = rnd(i, 33) > 0.62;
      const y = ((rnd(i, 34) * H + (rise ? -f * 0.7 : f * 0.5)) % H + H) % H;
      const s = 3 + rnd(i, 35) * 5;
      return <div key={"as" + i} style={{ position: "absolute", left: x,
        top: y + Math.sin(f / 18 + i) * 9, width: s, height: s * 0.7, borderRadius: 2,
        background: rise ? "#C98A52" : "#4A443E",
        opacity: rise ? 0.50 : 0.42, zIndex: z,
        transform: `rotate(${(f * 2 + i * 40) % 360}deg)` }} />;
    })}
  </>);

/** THE INTERIOR. A back wall with a skirting, a receding floor, and one
    committed light direction stated by the caller. */
export const Room: React.FC<{ p: Place; f: number; children?: React.ReactNode;
  tiles?: boolean; dim?: number }> = ({ p, f, tiles = true, dim = 0 }) => {
  const hz = p.horizon;
  const D = (c: string) => (dim > 0 ? dark(c, dim) : c);
  return (<>
    <div style={{ position: "absolute", inset: 0, zIndex: 1,
      background: `linear-gradient(172deg, ${D(p.back)} 0%, ${D(p.back2)} 100%)` }} />
    {/* breeze-block courses on the back wall — the world texture that says bunker */}
    {tiles && Array.from({ length: 9 }, (_, r) => (
      <div key={"bc" + r} style={{ position: "absolute", left: 0, right: 0, top: 30 + r * 52,
        height: 2, background: D(dark(p.back2, 0.22)), opacity: 0.75, zIndex: 2 }} />
    ))}
    {tiles && Array.from({ length: 40 }, (_, i) => {
      const r = Math.floor(i / 5), c = i % 5;
      return <div key={"bv" + i} style={{ position: "absolute",
        left: 24 + c * 214 + (r % 2) * 107, top: 30 + r * 52, width: 2, height: 52,
        background: D(dark(p.back2, 0.22)), opacity: 0.6, zIndex: 2 }} />;
    })}
    {/* the floor */}
    <div style={{ position: "absolute", left: 0, right: 0, top: hz, bottom: 0, zIndex: 12,
      background: `linear-gradient(184deg, ${D(p.floor)} 0%, ${D(p.floor2)} 100%)` }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: hz - 12, height: 14,
      background: D(p.lip), zIndex: 13 }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: hz - 16, height: 5,
      background: D(dark(p.lip, 0.32)), zIndex: 13 }} />
    {/* grit on the floor so it is not a flat sweep */}
    {Array.from({ length: 22 }, (_, i) => (
      <div key={"fg" + i} style={{ position: "absolute", left: rnd(i, 11) * 1020,
        top: hz + 22 + rnd(i, 12) * (H - hz - 40), width: 4 + rnd(i, 13) * 7, height: 3,
        borderRadius: 2, background: D(p.grit), opacity: 0.36, zIndex: 14 }} />
    ))}
  </>);
};

/* =========================================================================
   PRACTICAL LIGHT
   ====================================================================== */

/** a visible cone. Solid-to-transparent in ONE colour, clipped to a wedge —
    this is what makes an interior read as lit rather than as a filled box. */
export const Beam: React.FC<{ x: number; y: number; top?: number; bot?: number; len?: number;
  c?: string; o?: number; z?: number; f?: number }> =
  ({ x, y, top = 60, bot = 300, len = 400, c = "#EFD9A2", o = 0.26, z = 20, f = 0 }) => (
  <div style={{ position: "absolute", left: x - bot / 2, top: y, width: bot, height: len, zIndex: z,
    background: `linear-gradient(180deg, ${hexa(c, o * (0.94 + Math.sin(f / 11) * 0.05))} 0%, ${hexa(c, 0)} 100%)`,
    clipPath: `polygon(${50 - (top / bot) * 50}% 0, ${50 + (top / bot) * 50}% 0, 100% 100%, 0 100%)` }} />
);

/** a ceiling strip light: the housing, the tube, and its own down-wash. */
export const Strip: React.FC<{ x: number; y: number; w?: number; on?: number; c?: string;
  z?: number; f?: number; beam?: boolean }> =
  ({ x, y, w: ww = 210, on = 1, c = "#F0DDB0", z = 30, f = 0, beam = true }) => (<>
    <div style={{ position: "absolute", left: x - ww / 2, top: y, width: ww, height: 15,
      borderRadius: 4, background: "#2E3238", zIndex: z, boxShadow: SH }} />
    <div style={{ position: "absolute", left: x - ww / 2 + 9, top: y + 12, width: ww - 18, height: 9,
      borderRadius: 3, background: on > 0.02 ? c : "#3A3F46", opacity: on > 0 ? 0.35 + on * 0.65 : 1,
      zIndex: z + 1 }} />
    {beam && on > 0.02 && <Beam x={x} y={y + 20} top={ww - 40} bot={ww + 150} len={330} c={c}
      o={0.20 * on} z={z - 8} f={f} />}
  </>);

/** motes in a beam. Only ever ONE per scene — atmosphere, never a second mover. */
export const Motes: React.FC<{ x: number; y: number; w?: number; h?: number; n?: number;
  f: number; z?: number; c?: string }> =
  ({ x, y, w: ww = 300, h: hh = 300, n = 16, f, z = 40, c = "#F3E6C6" }) => (<>
    {Array.from({ length: n }, (_, i) => (
      <div key={"mo" + i} style={{ position: "absolute",
        left: x - ww / 2 + rnd(i, 21) * ww + Math.sin(f / 44 + i * 2) * 11,
        top: y + ((rnd(i, 22) * hh + f * 0.30) % hh),
        width: 3, height: 3, borderRadius: 3, background: c, opacity: 0.34, zIndex: z }} />
    ))}
  </>);

/* =========================================================================
   IN-PANEL CHROME (reel 94's law: display type set INTO the panel, never the
   white SectionHeader pill — the pill is ROOT's job)
   ====================================================================== */

export const Chip: React.FC<{ t: string; y: number; x?: number; c?: string; fg?: string;
  s?: number; z?: number }> =
  ({ t, y, x, c = INK, fg = "#F6F2E8", s = 1, z = 96 }) => (
  <div style={{ position: "absolute", left: x ?? 0, right: x === undefined ? 0 : undefined, top: y,
    display: "flex", justifyContent: x === undefined ? "center" : "flex-start", zIndex: z }}>
    <div style={{ padding: `${10 * s}px ${25 * s}px`, borderRadius: 12 * s, background: c,
      boxShadow: SH_D, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 33 * s,
      letterSpacing: "-0.015em", color: fg, whiteSpace: "nowrap" }}>{t}</div>
  </div>
);

export const Slug: React.FC<{ t: string; c?: string; z?: number; y?: number }> =
  ({ t, c = "#CFC8BC", z = 95, y = H - 42 }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top: y, textAlign: "center", zIndex: z,
    fontFamily: MONO, fontWeight: 800, fontSize: 20, letterSpacing: "0.30em", color: c,
    textShadow: "0 2px 6px rgba(0,0,0,0.55)" }}>{t}</div>
);

/** an etched label plate — the vocabulary every named object in this vault uses */
export const Plate: React.FC<{ x: number; y: number; t: string; sub?: string; w?: number;
  c?: string; fg?: string; z?: number; s?: number }> =
  ({ x, y, t, sub, w: ww = 190, c = "#C9BFA6", fg = "#241F17", z = 70, s = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: ww, zIndex: z,
    background: c, borderRadius: 4, padding: `${6 * s}px ${8 * s}px`,
    border: `2px solid ${dark(c, 0.24)}`, boxShadow: SH }}>
    <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 21 * s,
      letterSpacing: "0.06em", color: fg, textAlign: "center", lineHeight: 1 }}>{t}</div>
    {sub && <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 13 * s,
      letterSpacing: "0.10em", color: dark(fg, 0.02), opacity: 0.7, textAlign: "center",
      marginTop: 3 }}>{sub}</div>}
  </div>
);

/** a big number that MOVES to its value */
export const BigNum: React.FC<{ x: number; y: number; v: string; c?: string; size?: number;
  z?: number; mono?: boolean }> =
  ({ x, y, v, c = "#F6F1E6", size = 64, z = 72, mono = false }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    fontFamily: mono ? MONO : fraunces.fontFamily, fontWeight: 900, fontSize: size,
    lineHeight: 1, color: c, letterSpacing: "-0.02em",
    textShadow: "0 3px 10px rgba(0,0,0,0.5)" }}>{v}</div>
);

/** a contact shadow so nothing floats */
export const Contact: React.FC<{ x: number; y: number; w: number; z?: number; o?: number }> =
  ({ x, y, w: ww, z = 19, o = 0.36 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: ww,
    height: Math.max(11, ww * 0.11), borderRadius: "50%",
    background: `rgba(8,10,16,${o})`, zIndex: z, filter: "blur(6px)" }} />
);

/** the frame-edge occluder — a mass cropped by the panel, IN FRONT of the
    action. Without one the camera is pointed at a backdrop. */
export const Edge: React.FC<{ side?: "l" | "r"; c: string; w?: number; z?: number;
  kind?: "rock" | "post" | "rail" | "wall"; top?: number }> =
  ({ side = "l", c, w: ww = 128, z = 92, kind = "wall", top = -40 }) => {
  const L = side === "l";
  if (kind === "post") return (
    <div style={{ position: "absolute", top, bottom: -40, width: 40, zIndex: z,
      [L ? "left" : "right"]: 52, background: c, boxShadow: SH_D }}>
      <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: 9,
        background: mix(c, 0.18) }} />
      {Array.from({ length: 7 }, (_, i) => (
        <div key={i} style={{ position: "absolute", top: 60 + i * 116, left: -7, width: 54,
          height: 11, background: dark(c, 0.30) }} />
      ))}
    </div>
  );
  if (kind === "rail") return (
    <div style={{ position: "absolute", top, bottom: -40, width: 18, zIndex: z,
      [L ? "left" : "right"]: 66, background: c, boxShadow: SH_D,
      borderLeft: `4px solid ${mix(c, 0.24)}` }} />
  );
  /* ⛔ A ROCK IS NOT A FULL-HEIGHT SLAB. The first cut ran this from y=80 to the
     panel floor in near-black and it read as a rendering fault down the side of
     the frame, not as a boulder. A foreground mass has to sit in the LOWER part
     of the frame, be cropped by BOTH the side and the bottom, and carry a snow
     cap so it belongs to this world. */
  /* ⛔ A ROCK IS A CLUSTER OF MASSES, NOT ONE LOZENGE WITH A HIGHLIGHT STRIPE.
     v1 was a single rounded rect with a 12px light edge running its full height,
     which rendered as a grey POST standing in the snow next to a blue lump. Two
     overlapping boulders with their own snow caps read as terrain. */
  if (kind === "rock") {
    const S = (n: number) => (L ? { left: n } : { right: n });
    /* ⛔ FACETS, NOT BORDER-RADIUS. A rounded rect at this size reads as a
       lozenge — the second cut looked like a boot. Rock is angular, so it is
       clipped to a polygon and the snow sits on its top facets. */
    const face = L
      ? "polygon(0 100%, 0 34%, 26% 8%, 52% 0, 74% 22%, 100% 62%, 100% 100%)"
      : "polygon(100% 100%, 100% 34%, 74% 8%, 48% 0, 26% 22%, 0 62%, 0 100%)";
    const cap = L
      ? "polygon(0 84%, 0 44%, 27% 10%, 53% 0, 76% 28%, 100% 74%, 100% 100%, 74% 58%, 52% 34%, 27% 44%)"
      : "polygon(100% 84%, 100% 44%, 73% 10%, 47% 0, 24% 28%, 0 74%, 0 100%, 26% 58%, 48% 34%, 73% 44%)";
    return (
      <div style={{ position: "absolute", bottom: -60, height: 330, width: ww + 130, zIndex: z,
        [L ? "left" : "right"]: -80 }}>
        <div style={{ position: "absolute", bottom: 0, ...S(0), width: ww + 110, height: 300,
          background: c, clipPath: face }} />
        <div style={{ position: "absolute", bottom: 0, ...S(0), width: (ww + 110) * 0.34,
          height: 300, background: mix(c, 0.13), clipPath: face }} />
        <div style={{ position: "absolute", bottom: 118, ...S(-4), width: ww + 116, height: 150,
          background: "#E9EFF4", clipPath: cap }} />
      </div>
    );
  }
  return (
    <div style={{ position: "absolute", top, bottom: -40, width: ww, zIndex: z,
      [L ? "left" : "right"]: -26, background: c,
      borderRadius: L ? "0 42px 70px 0" : "42px 0 0 70px", boxShadow: SH_D }}>
      <div style={{ position: "absolute", top: 0, bottom: 0, [L ? "right" : "left"]: 0, width: 7,
        background: mix(c, 0.24) }} />
    </div>
  );
};

/* =========================================================================
   THE KEEPER — the reel's only character.

   ⛔ It is the SlopKit `Mascot` VERBATIM. The parka is drawn as an ADDITIVE
      overlay in the same 200x200 space, never as a restyle of the body
      ([[feedback_reel_house_chassis]]). The hood band sits at y30..50 and the
      cheeks at x26..42 / x158..174 — clear of the eyes at y70..96, which is the
      rule reel 94 learned when a badge landed on the face.
   ====================================================================== */
export const Keeper: React.FC<{ x: number; y: number; s?: number; z?: number; f?: number;
  face?: 1 | -1; walk?: number; hood?: number; back?: boolean; costume?: Record<string, number>;
  lit?: number; badge?: number }> =
  ({ x, y, s = 1, z = 40, f = 0, face = 1, walk = 0, hood = 1, back = false, costume, lit = 1,
     badge = 0 }) => {
  const size = 190 * s;
  const bob = walk ? Math.abs(Math.sin(f / 4.6 + x * 0.05)) * 5 * walk * s : 0;
  const P = "#3F5A44", PD = "#2C4030", FUR = "#D8CDB4";   // parka green, its shade, the ruff
  return (
    <div style={{ position: "absolute", left: x - size / 2, top: y - size - bob, zIndex: z,
      transform: `scaleX(${face})`, transformOrigin: "50% 100%",
      filter: lit < 1 ? `brightness(${0.30 + lit * 0.70})` : undefined }}>
      {/* ⛔ GROUND HIM. A sprite with no contact shadow floats, and the first cut
          of the throat shot had him hovering in mid-tunnel. */}
      <div style={{ position: "absolute", left: size * 0.10, top: size - 12 + bob,
        width: size * 0.80, height: size * 0.10, borderRadius: "50%",
        background: "rgba(8,10,16,0.34)", filter: "blur(6px)" }} />
      <Mascot lf={f} size={size} nodSpeed={walk ? 5.2 : 10} nodAmp={walk ? 4.4 : 3.0}
        gaze={back ? 0 : 0.6} tint={CLAY} {...(costume as any)} />
      {/* ⛔⛔ THE COAT IS ALWAYS ON; ONLY THE HOOD IS OPTIONAL.
          v2 gated the WHOLE costume on `hood`, so the indoor scenes (S4, S5b,
          S6b) rendered the bare Mascot — and a bare Mascot at this size is a
          single orange rectangle whose two arm blocks read as a second pair of
          LEGS. Three shots shipped a four-legged orange blob. The jacket and
          the mitts are what give this character a silhouette, so they are
          unconditional; the hood, ruff and goggles come off indoors. */}
      <svg viewBox="0 0 200 200" width={size} height={size} shapeRendering="crispEdges"
        style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
        {/* the jacket, in the torso band the house costumes all use */}
        <rect x={34} y={110} width={132} height={36} fill={P} />
        <rect x={34} y={110} width={132} height={6} fill={PD} />
        <rect x={95} y={110} width={10} height={36} fill={mix(P, 0.30)} />
        <rect x={44} y={122} width={22} height={12} fill={PD} />
        <rect x={134} y={122} width={22} height={12} fill={PD} />
        {/* shoulder yokes: they separate the arms from the body so the arm
            blocks stop reading as legs */}
        <rect x={34} y={92} width={30} height={20} fill={PD} />
        <rect x={136} y={92} width={30} height={20} fill={PD} />
        {/* mitts over the arm blocks */}
        <rect x={6} y={84} width={30} height={30} rx={7} fill={PD} />
        <rect x={164} y={84} width={30} height={30} rx={7} fill={PD} />
        <rect x={6} y={84} width={30} height={8} rx={4} fill={FUR} />
        <rect x={164} y={84} width={30} height={8} rx={4} fill={FUR} />
        {hood > 0.01 && (
          <g opacity={hood}>
            {/* ⛔ THE HOOD NEVER EXCEEDS THE HEAD'S OWN WIDTH. v1 drew the ruff
                from x20 to x180 — wider than the body rect (x34..166) — and at
                render size it read as the BRIM OF A HAT on a plank. Everything
                here lives inside x28..172 and never enters the eye band (y70..96). */}
            <rect x={28} y={26} width={144} height={28} fill={P} />
            <rect x={28} y={26} width={144} height={7} fill={mix(P, 0.16)} />
            <rect x={28} y={52} width={17} height={54} fill={P} />
            <rect x={155} y={52} width={17} height={54} fill={P} />
            <rect x={28} y={17} width={144} height={13} rx={6} fill={FUR} />
            <rect x={28} y={17} width={144} height={4} rx={2} fill={mix(FUR, 0.30)} />
            <rect x={68} y={17} width={5} height={13} fill={mix(FUR, 0.18)} />
            <rect x={128} y={17} width={5} height={13} fill={mix(FUR, 0.18)} />
            <rect x={28} y={102} width={17} height={9} fill={PD} />
            <rect x={155} y={102} width={17} height={9} fill={PD} />
            {/* snow goggles, pushed UP onto the hood band */}
            <rect x={64} y={33} width={72} height={15} rx={4} fill="#22262C" />
            <rect x={70} y={37} width={60} height={8} rx={3} fill="#7E97AB" />
            <rect x={53} y={37} width={12} height={8} fill="#3A4048" />
            <rect x={135} y={37} width={12} height={8} fill="#3A4048" />
          </g>
        )}
      </svg>
      {/* ⛔ THE BADGE HOVERS ABOVE THE HEAD, NEVER ON IT. Reel 94 put it at 47.5%
          of `size`, calling that the chest — but on a box character the body rect
          IS the face and the eyes sit at exactly that height. It landed on his
          eyes. Above the ruff (y < 17 of 200) is the only safe place. */}
      {badge > 0 && (
        <div style={{ position: "absolute",
          left: size * 0.5 - size * 0.17 * badge,
          top: -size * 0.30 * badge + Math.sin(f / 17) * size * 0.014,
          width: size * 0.34 * badge, height: size * 0.34 * badge,
          borderRadius: size * 0.085 * badge, background: "#FFFFFF",
          border: `${Math.max(2, size * 0.016 * badge)}px solid #E8DCC0`,
          display: "flex", alignItems: "center", justifyContent: "center",
          transform: `scaleX(${face})`, boxShadow: "0 6px 14px rgba(20,10,6,0.38)" }}>
          <Img src={staticFile("claude_logo.png")}
            style={{ width: size * 0.24 * badge, height: size * 0.24 * badge,
              objectFit: "contain" }} />
        </div>
      )}
    </div>
  );
};

/** a lone mittened hand entering frame — for the macro shots where a whole
    sprite would be a different scale of object */
export const Mitt: React.FC<{ x: number; y: number; s?: number; z?: number; rot?: number;
  face?: 1 | -1 }> = ({ x, y, s = 1, z = 80, rot = 0, face = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    transform: `rotate(${rot}deg) scaleX(${face})`, transformOrigin: "20% 50%" }}>
    <div style={{ position: "absolute", left: 0, top: 0, width: 118 * s, height: 96 * s,
      borderRadius: `${46 * s}px ${20 * s}px ${20 * s}px ${46 * s}px`, background: "#2C4030",
      boxShadow: SH_D }} />
    <div style={{ position: "absolute", left: 8 * s, top: 8 * s, width: 100 * s, height: 22 * s,
      borderRadius: 20 * s, background: "#3F5A44" }} />
    <div style={{ position: "absolute", left: 86 * s, top: 60 * s, width: 44 * s, height: 34 * s,
      borderRadius: `${12 * s}px`, background: "#2C4030" }} />
    <div style={{ position: "absolute", left: -22 * s, top: 6 * s, width: 34 * s, height: 84 * s,
      borderRadius: 8 * s, background: "#D8CDB4" }} />
  </div>
);

/* =========================================================================
   THE SCENE SHELL. Dark Panel + the place + the vignette + the floor slug.

   ⭐ THE IN-PANEL PUSH IS ON EVERY SCENE. Reel 96 settled this: CAMERA-GRAMMAR
      governs RE-FRAMING moves, and this is not one — it is the slow 1.00 -> 1.05
      that stops a scene arriving and then holding. The board's ONE motivated
      re-framing move (S5b) is a separate, larger push passed in explicitly.
   ====================================================================== */
export const Scene: React.FC<{ p: Place; slug: string; children: React.ReactNode;
  glow?: string; slugC?: string; push?: [number, number, number]; vig?: number }> =
  ({ p, slug, children, glow, slugC, push, vig = 0.58 }) => {
  const f = useCurrentFrame();
  const [a, b, to] = push ?? [0, 150, 1.05];
  const sc = E(f, a, b, 1, to, LIN);
  const cam = React.useContext(CamCtx);
  return (
    <Panel glow={glow ?? hexA(p.key, 0.18)}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1, transformOrigin: "50% 56%",
        transform: `translate(${cam.dx}px, ${cam.dy}px) rotate(${cam.rot}deg) scale(${sc * cam.s})` }}>
        {children}
      </div>
      {/* the vignette, last, over everything — it is what makes one thing rank */}
      <div style={{ position: "absolute", inset: 0, zIndex: 97, pointerEvents: "none",
        background: `radial-gradient(122% 92% at 50% 46%, transparent 38%, ${hexa("#05060B", vig)} 100%)` }} />
      <Slug t={slug} c={slugC} />
    </Panel>
  );
};

/** a transformed wrapper WITH the explicit zIndex the stacking-context trap
    demands (reel 93 lost a whole tower to a transform with no zIndex). */
export const Cam: React.FC<{ x?: number; y?: number; s?: number; z?: number; rot?: number;
  o?: number; children: React.ReactNode }> =
  ({ x = 0, y = 0, s = 1, z = 30, rot = 0, o = 1, children }) => (
  <div style={{ position: "absolute", inset: 0, zIndex: z, opacity: o,
    transform: `translate(${x}px, ${y}px) rotate(${rot}deg) scale(${s})`,
    transformOrigin: "50% 62%" }}>{children}</div>
);

/* =========================================================================
   ⛔⛔ THE MARK IS AN AUDIENCE FILTER, NOT BRANDING.
   Reel 95, round 3: *"more Claude logo imagery especially in the first 3
   seconds, more Claude logos throughout and BIGGER on the Claude sprites, so
   our target Claude audience keeps watching but other randoms don't."* The
   scroller who does not recognise the mark was never the audience, so the
   objective is the RIGHT stop, not a broad one.

   ⛔ v1 of this reel put ONE mark in the whole thing, in the CTA at 17.9s, and
      the first four seconds said "bunker" and never said "AI". FIVE marks now
      land inside the first three seconds, and every scene after carries one.
   ⛔ THE MARK NEVER COVERS HIS FACE. The box Mascot has no separate head: the
      body rect (y 44..146 of a 200 viewBox) IS the face and the eyes sit at
      y 70..96. The only safe places for an emblem are ABOVE the body or behind
      it (reel 94 learned this by landing a badge on the eyes).
   ====================================================================== */

/** the official Claude mark, for the frames that have to say who this is for */
export const Mark: React.FC<{ x: number; y: number; s?: number; z?: number; plate?: boolean }> =
  ({ x, y, s = 84, z = 90, plate = true }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    width: s * 1.3, height: s * 1.3, borderRadius: s * 0.28,
    background: plate ? "#FFFFFF" : "transparent",
    border: plate ? `${Math.max(2, s * 0.04)}px solid #E8DCC0` : undefined,
    display: "flex", alignItems: "center", justifyContent: "center", boxShadow: plate ? SH : undefined }}>
    <Img src={staticFile("claude_logo.png")}
      style={{ width: s * 0.86, height: s * 0.86, objectFit: "contain" }} />
  </div>
);

/** the mark CAST INTO the set: a concrete or steel plate with the logo and one
    mono product line under it. This is how the world itself says what it runs. */
export const MarkPlate: React.FC<{ x: number; y: number; t: string; s?: number; z?: number;
  c?: string; fg?: string }> =
  ({ x, y, t, s = 1, z = 70, c = "#EFE9DC", fg = "#241F17" }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    display: "flex", alignItems: "center", gap: 12 * s,
    padding: `${9 * s}px ${16 * s}px ${9 * s}px ${9 * s}px`, borderRadius: 14 * s,
    background: c, border: `${3 * s}px solid ${dark(c, 0.16)}`, boxShadow: SH }}>
    <div style={{ width: 52 * s, height: 52 * s, borderRadius: 12 * s, background: "#FFFFFF",
      border: `${2 * s}px solid #E8DCC0`, display: "flex", alignItems: "center",
      justifyContent: "center" }}>
      <Img src={staticFile("claude_logo.png")}
        style={{ width: 40 * s, height: 40 * s, objectFit: "contain" }} />
    </div>
    <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 26 * s,
      letterSpacing: "0.02em", color: fg, whiteSpace: "nowrap" }}>{t}</span>
  </div>
);

/** the mark as a big emblem cast into a wall or a door face — no plate, no
    chrome, just the logo at scale so it reads at a glance and at a thumbnail. */
export const MarkCast: React.FC<{ x: number; y: number; s?: number; z?: number; o?: number }> =
  ({ x, y, s = 150, z = 40, o = 1 }) => (
  <div style={{ position: "absolute", left: x - s / 2, top: y - s / 2, width: s, height: s,
    zIndex: z, opacity: o, display: "flex", alignItems: "center", justifyContent: "center" }}>
    <Img src={staticFile("claude_logo.png")}
      style={{ width: s, height: s, objectFit: "contain" }} />
  </div>
);

/** a chat bubble carrying the mark — the recurring "this is an assistant" motif */
export const AskBubble: React.FC<{ x: number; y: number; t: string; s?: number; z?: number }> =
  ({ x, y, t, s = 1, z = 86 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
    <div style={{ position: "relative", display: "inline-flex", alignItems: "center",
      gap: 11 * s, padding: `${11 * s}px ${22 * s}px ${11 * s}px ${11 * s}px`,
      borderRadius: 18 * s, background: "#FFFFFF", border: `${3 * s}px solid #EDE7DB`,
      boxShadow: SH_D }}>
      <div style={{ width: 44 * s, height: 44 * s, borderRadius: 11 * s, background: "#FFF3EC",
        border: `${2 * s}px solid #F0D5C6`, display: "flex", alignItems: "center",
        justifyContent: "center" }}>
        <Img src={staticFile("claude_logo.png")}
          style={{ width: 34 * s, height: 34 * s, objectFit: "contain" }} />
      </div>
      <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 27 * s,
        color: INK, whiteSpace: "nowrap" }}>{t}</span>
      <div style={{ position: "absolute", left: 34 * s, bottom: -16 * s, width: 24 * s,
        height: 18 * s, background: "#FFFFFF", clipPath: "polygon(0 0, 100% 0, 18% 100%)" }} />
    </div>
  </div>
);
