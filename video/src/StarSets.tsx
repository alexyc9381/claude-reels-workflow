import React from "react";
import { Img, staticFile } from "remotion";
import {
  W, H, E, OUT, IO, LIN, hexa, dkh, mxh, rnd, SH,
  PLACES, asPlace, vivid, Rake, Pool, STEEL, CLAY, CREAMB, INK, BRASS, GOLD,
} from "./StarWorld";
import type { Place } from "./StarWorld";

/* ===========================================================================
   REEL 115 · "STAR" — THE SETS.  Board: storyboards/115-star.md.

   ⛔⛔ EVERY SCENE IS A REAL PLACE, NOT SHAPES ON BLACK. `Market` builds seven
   planes for every stretch of the night market:

     1  the far wall / the night sky beyond the stalls
     2  ONE haze disc around the practical (a solid disc + a soft ring, never
        an emissive blur — matte only)
     3  a far band of stall fronts, parallaxed slowest
     4  a mid band of awnings and shutters
     5  the near band of crates and trestles + the floor and its wet lip
     6  litter and grit drifting on the ground — the market never flatlines
     7  the travelling rake, the bulb string overhead, and the OCCLUDER

   ⛔⛔ AND THE DEPTH CHECK IS BY EYE, BECAUSE IT CANNOT BE AUTOMATED:
   *"Is there a mass cropped by the panel edge, IN FRONT of the action?"* If
   not, the camera is pointed at a backdrop. `AwningPost` and `CrateStack` are
   that mass, and every scene mounts at least one.
   ========================================================================= */

export type SetKey = keyof typeof PLACES;
export const placeFor = (k: SetKey): Place => PLACES[k];

/** a parallax band of market structure — stall fronts, awnings, or a crate run */
const Band: React.FC<{ c: string; lit: string; y: number; n: number; seed: number; dx: number;
  z: number; on?: number; hMin?: number; hMax?: number; kind?: "stall" | "shutter" | "crate" }> =
  ({ c, lit, y, n, seed, dx, z, on = 0.3, hMin = 110, hMax = 250, kind = "stall" }) => (
  <>{Array.from({ length: n }, (_, i) => {
    const h = hMin + rnd(seed, i) * (hMax - hMin);
    const w = 96 + rnd(seed + 1, i) * 130;
    const x = ((i * (W / n) + dx) % (W + 300)) - 150;
    return (
      <div key={"bd" + seed + i} style={{ position: "absolute", left: x, top: y - h, width: w,
        height: h, zIndex: z, background: c, borderTop: `5px solid ${mxh(c, 0.12)}` }}>
        {kind === "stall"
          /* a lit stall front — the market behind the market */
          ? (<>
              <div style={{ position: "absolute", left: "12%", top: "26%", width: "76%",
                height: "52%", background: lit, opacity: on, borderRadius: 3 }} />
              {/* the awning valance's scallops */}
              <div style={{ position: "absolute", left: 0, right: 0, top: "14%", height: "12%",
                background: `repeating-linear-gradient(90deg, ${mxh(c, 0.30)} 0px, ${mxh(c, 0.30)} 14px, ${dkh(c, 0.20)} 14px, ${dkh(c, 0.20)} 28px)` }} />
            </>)
          : kind === "shutter"
          /* a closed roller shutter: corrugation, a lock box, a kerb bar */
          ? (<>
              <div style={{ position: "absolute", inset: "18% 8% 6% 8%", borderRadius: 2,
                background: `repeating-linear-gradient(180deg, ${dkh(c, 0.14)} 0px, ${dkh(c, 0.14)} 9px, ${dkh(c, 0.34)} 9px, ${dkh(c, 0.34)} 18px)` }} />
              <div style={{ position: "absolute", left: "40%", bottom: "8%", width: "20%",
                height: "9%", background: mxh(c, 0.22), borderRadius: 2 }} />
            </>)
          /* a run of stacked crates */
          : (<>{[0, 1, 2].map(j => (
              <div key={"cx" + j} style={{ position: "absolute", left: "10%", right: "10%",
                bottom: `${6 + j * 30}%`, height: "26%", borderRadius: 2,
                background: j % 2 ? mxh(c, 0.16) : dkh(c, 0.16),
                borderTop: `3px solid ${mxh(c, 0.26)}` }} />
            ))}</>)}
      </div>
    );
  })}</>
);

/** ⛔⛔ THE OCCLUDER — an awning post cropped by the panel edge and painted IN
    FRONT of everything. This is the difference between a PLACE and a backdrop,
    and it is not optional. */
export const AwningPost: React.FC<{ side?: "l" | "r"; c?: string; w?: number; z?: number;
  lean?: number }> = ({ side = "l", c = "#3A342A", w = 62, z = 86, lean = 0 }) => (
  <div style={{ position: "absolute", [side === "l" ? "left" : "right"]: -8, top: -60,
    width: w, height: H + 130, zIndex: z, transform: `rotate(${lean}deg)`,
    transformOrigin: side === "l" ? "0% 30%" : "100% 30%",
    background: `linear-gradient(${side === "l" ? 90 : 270}deg, ${dkh(c, 0.22)} 0%, ${dkh(c, 0.62)} 100%)` }}>
    {/* the collar bands and the guy-rope cleat every market post has */}
    {[0.16, 0.44, 0.74].map((k, i) => (
      <div key={"cb" + i} style={{ position: "absolute", left: -5, right: -5, top: `${k * 100}%`,
        height: 16, background: dkh(c, 0.44), borderTop: `3px solid ${mxh(c, 0.10)}` }} />
    ))}
    <div style={{ position: "absolute", [side === "l" ? "right" : "left"]: -20, top: "31%",
      width: 26, height: 40, borderRadius: 5, background: dkh(c, 0.50) }} />
    {/* the diagonal brace into frame — the strongest single depth cue */}
    <div style={{ position: "absolute", [side === "l" ? "left" : "right"]: w - 6, top: 108,
      width: 260, height: 20, background: dkh(c, 0.54),
      transform: `rotate(${side === "l" ? 26 : -26}deg)`,
      transformOrigin: side === "l" ? "0% 50%" : "100% 50%" }} />
  </div>
);

/** the second occluder shape: a stack of crates in the near foreground, cropped
    by the bottom edge, so the camera is standing IN the market. */
export const CrateStack: React.FC<{ side?: "l" | "r"; c?: string; h?: number; z?: number;
  n?: number }> = ({ side = "r", c = "#4A3A28", h = 210, z = 84, n = 3 }) => (
  <div style={{ position: "absolute", [side === "l" ? "left" : "right"]: -34, bottom: -46,
    width: 250, height: h, zIndex: z }}>
    {Array.from({ length: n }, (_, i) => (
      <div key={"cs" + i} style={{ position: "absolute", left: 8 + (i % 2) * 16,
        bottom: i * (h / n) * 0.92, width: 224 - i * 14, height: h / n,
        borderRadius: 4, transform: `rotate(${(i % 2 ? 1 : -1) * 1.4}deg)`,
        background: `linear-gradient(96deg, ${mxh(c, 0.10)} 0%, ${c} 44%, ${dkh(c, 0.42)} 100%)`,
        border: `4px solid ${dkh(c, 0.56)}` }}>
        {[0.16, 0.84].map((k, j) => (
          <div key={"cb" + j} style={{ position: "absolute", left: `${k * 100}%`, top: "8%",
            width: 12, height: "84%", background: dkh(c, 0.26) }} />
        ))}
        <div style={{ position: "absolute", left: "26%", top: "38%", width: "48%", height: "22%",
          borderRadius: 2, background: dkh(c, 0.34) }} />
      </div>
    ))}
  </div>
);

/** the string of festoon bulbs every night market hangs — the overhead plane,
    and a legitimate cheap motion source because it SWAYS on its own clock. */
export const BulbString: React.FC<{ f: number; y?: number; z?: number; c?: string;
  n?: number; sag?: number; on?: number }> =
  ({ f, y = 74, z = 88, c = "#FFE7BE", n = 13, sag = 56, on = 1 }) => (
  <div style={{ position: "absolute", left: -40, right: -40, top: y, height: 150, zIndex: z }}>
    {Array.from({ length: n }, (_, i) => {
      const t = i / (n - 1);
      const dy = Math.sin(t * Math.PI) * sag + Math.sin(f / 41 + i * 0.5) * 3.4;
      const lit = on * (0.62 + 0.38 * Math.sin(i * 1.7));
      return (
        <div key={"bl" + i} style={{ position: "absolute", left: `${t * 100}%`, top: dy }}>
          {/* the flex + the cap */}
          <div style={{ position: "absolute", left: -2, top: -14, width: 4, height: 16,
            background: "#241F17" }} />
          <div style={{ position: "absolute", left: -7, top: -2, width: 14, height: 10,
            borderRadius: 2, background: "#3A342A" }} />
          <div style={{ position: "absolute", left: -12, top: 7, width: 24, height: 30,
            borderRadius: "46% 46% 50% 50%",
            background: `radial-gradient(circle at 40% 34%, ${mxh(c, 0.5)} 0%, ${c} 56%, ${dkh(c, 0.28)} 100%)`,
            opacity: 0.35 + lit * 0.65 }} />
        </div>
      );
    })}
    {/* the catenary itself */}
    <svg width="100%" height="150" style={{ position: "absolute", left: 0, top: 0 }}>
      <path d={`M 0 0 Q 50% ${sag * 2 + 8} 100% 0`} stroke="#241F17" strokeWidth="4" fill="none" />
    </svg>
  </div>
);

/** a hard practical: a conical shade with a hot filament plate and a floor pool.
    ⛔ NEVER an emissive blur — the cone is drawn, the pool is a radial paint. */
export const Lamp: React.FC<{ x: number; y?: number; s?: number; z?: number; on?: number;
  c?: string; drop?: number }> =
  ({ x, y = 62, s = 1, z = 20, on = 1, c = "#FFE7BE", drop = 120 }) => (<>
    <div style={{ position: "absolute", left: x - 3, top: y - 60, width: 6, height: drop,
      background: "#241F17", zIndex: z + 2 }} />
    <div style={{ position: "absolute", left: x - 62 * s, top: y + drop - 60, width: 124 * s,
      height: 56 * s, zIndex: z + 3,
      background: `linear-gradient(180deg, #4A443C 0%, #23201B 100%)`,
      clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }} />
    <div style={{ position: "absolute", left: x - 34 * s, top: y + drop - 10, width: 68 * s,
      height: 14 * s, borderRadius: 4, zIndex: z + 4, background: mxh(c, 0.36), opacity: on }} />
    {/* the drawn light cone — a solid, not a blur */}
    <div style={{ position: "absolute", left: x - 300 * s, top: y + drop - 6, width: 600 * s,
      height: 520 * s, zIndex: z + 1, opacity: on * 0.30,
      background: `linear-gradient(180deg, ${hexa(c, 0.62)} 0%, ${hexa(c, 0)} 88%)`,
      clipPath: "polygon(44% 0%, 56% 0%, 100% 100%, 0% 100%)" }} />
  </>);

/** the market's base plate: seven planes, one committed light direction. */
export const Market: React.FC<{ p: Place; f: number; t?: number; lit?: number; z0?: number;
  bulbs?: boolean; band?: React.ReactNode; glowX?: number; glowR?: number;
  rake?: boolean; rakeRate?: number; rakeX0?: number; parX?: number;
  kind?: "stall" | "shutter" | "crate";
  /** how far the parallax bands fall away in VALUE. 0 = a lit block (the hook,
      where THE-OPEN law 1 wants a bright mean); 1 = the house depth ramp. */
  deep?: number }> =
  ({ p, f, t = 0, lit = 0.34, z0 = 0, bulbs = true, band, glowX = 500, glowR = 300,
     rake = true, rakeRate = 3.4, rakeX0 = -260, parX = 0,
     kind = "stall", deep = 1 }) => (<>
  {/* 1 · the far wall / the night beyond */}
  <div style={{ position: "absolute", inset: 0, zIndex: z0 + 1,
    background: `linear-gradient(174deg, ${p.back} 0%, ${p.back2} 100%)` }} />
  {/* 2 · ONE haze source around the practical */}
  <div style={{ position: "absolute", left: glowX - glowR * 1.5, top: 60 - glowR * 1.2,
    width: glowR * 3, height: glowR * 3, borderRadius: "50%", zIndex: z0 + 3,
    background: `radial-gradient(circle, ${hexa(p.key, 0.24)} 0%, ${hexa(p.key, 0.08)} 46%, ${hexa(p.key, 0)} 70%)` }} />
  {/* 3,4,5 · three parallax bands, far to near */}
  <Band c={dkh(p.back2, 0.04 + deep * 0.02)} lit={mxh(p.key, 0.28)} y={p.horizon - 176} n={8} seed={3}
    dx={t * 0.09} z={z0 + 8} on={lit * 0.52} hMin={132} hMax={288} kind="stall" />
  <Band c={dkh(p.back2, 0.16 + deep * 0.08)} lit={mxh(p.key, 0.12)} y={p.horizon - 92} n={6} seed={11}
    dx={t * 0.20} z={z0 + 10} on={lit * 0.80} hMin={112} hMax={246} kind={kind} />
  <Band c={dkh(p.back2, 0.30 + deep * 0.14)} lit={p.key} y={p.horizon - 2} n={5} seed={23}
    dx={t * 0.38} z={z0 + 12} on={lit} hMin={94} hMax={190} kind="crate" />
  {/* whatever this stretch of the market has standing on it */}
  <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: p.horizon, zIndex: z0 + 13 }}>
    {band}
  </div>
  {/* 6 · the ground and its wet lip */}
  <div style={{ position: "absolute", left: 0, right: 0, top: p.horizon, bottom: 0, zIndex: z0 + 14,
    background: `linear-gradient(184deg, ${p.floor} 0%, ${p.floor2} 100%)` }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: p.horizon - 9, height: 11,
    background: p.lip, zIndex: z0 + 15 }} />
  {/* the ground's own markings — a market floor is painted into pitches */}
  {Array.from({ length: 4 }, (_, i) => (
    <div key={"fm" + i} style={{ position: "absolute", left: -80 + i * 300 - t * 0.5,
      top: p.horizon + 34 + i * 12, width: 210, height: 8, background: hexa(p.lip, 0.34),
      zIndex: z0 + 16, transform: `rotate(${-2 - i}deg)` }} />
  ))}
  {/* 7 · litter and grit drifting — the market never flatlines */}
  {Array.from({ length: 24 }, (_, i) => (
    <div key={"gt" + i} style={{ position: "absolute",
      left: ((i * 97 + 30 - t * 0.62) % 1190) - 62,
      top: p.horizon + 22 + ((i * 51) % 10) * 24,
      width: 6 + (i % 3) * 5, height: 5, borderRadius: 3, background: p.grit,
      opacity: 0.32, zIndex: z0 + 17 }} />
  ))}
  {/* ⭐ the travelling rake — feathered, light AND shadow, speed at the call site */}
  {rake && <Rake f={f} y={p.horizon - 300} h={480} c={p.key} o={0.26} rate={rakeRate}
    x0={rakeX0} z={z0 + 20} n={6} />}
  {bulbs && <BulbString f={f} c={p.key} z={z0 + 88} />}
</>);

/* =========================================================================
   THE NINE SETS. Each one is a place with its own light direction, and
   neighbours differ by BOTH hue and lightness.
   ====================================================================== */
export const SetFor: React.FC<{ k: SetKey; f: number; lit?: number; t?: number;
  rakeRate?: number; rakeX0?: number; parX?: number; occluders?: boolean }> =
  ({ k, f, lit = 1, t = 0, rakeRate, rakeX0, parX = 0, occluders = true }) => {
  const p = placeFor(k);
  switch (k) {

    /* S0 — THE METERED STREET. The market ARCH behind the turnstile is a wide
       bright bay: the hook's mean luma comes from the ROOM, the spread comes
       from the near-black hero standing against it. ⛔ Reel 109's fix,
       restated: brightness is the MEAN, hierarchy is the SPREAD, and neither
       is bought by touching the palette's dark stop. */
    case "street":
      return (<>
        <Market p={p} f={f} t={t + parX} rakeX0={rakeX0} lit={0.70} bulbs={false} glowX={506} glowR={430}
          rakeRate={rakeRate ?? 6.1} kind="shutter" deep={0.15} />
        {/* ⛔⛔ THE ARCH IS THE SET'S BRIGHT PLANE AND IT MUST NOT BE AN EMPTY
            WHITE VOID. v1 painted one pale gradient inside the opening and the
            hook's largest object was a blank area — the §10 defect, "a plain
            screen", drawn as light instead of as a place. It is now a MARKET:
            a lit sky plane, five stall fronts with their own awnings and lit
            counters, a festoon string, and six crowd silhouettes crossing it.
            The mean luma still comes from the ROOM; the difference is that the
            room now has something in it. */}
        <div style={{ position: "absolute", left: 172, top: 66, width: 668, height: p.horizon - 4,
          zIndex: 11, borderRadius: "334px 334px 6px 6px", overflow: "hidden",
          background: `linear-gradient(178deg, #FFFFFF 0%, #FFF9EC 46%, #FDEBD2 100%)` }}>
          {/* ⭐⭐ THE STALLS SIT WHERE THE GATE DOES NOT COVER THEM. v1 put them
              on the arch's floor, where the pay gate hides everything below its
              top rail — so the upper two thirds of the brightest object in the
              frame was EMPTY, which is §10's "just a plain screen" wearing a
              luma gate as an excuse. Brightness is the MEAN and hierarchy is
              the SPREAD: the field stays near-white and the STRUCTURE that
              ranks it is dark, and it is placed where it can be seen. */}
          {[0, 1, 2, 3, 4, 5].map(i => {
            const sx = -6 + i * 118, sh = 150 + rnd(7, i) * 64;
            return (
              <div key={"ms" + i} style={{ position: "absolute", left: sx,
                bottom: 232, width: 110, height: sh, borderRadius: 3,
                background: `linear-gradient(178deg, ${hexa("#5A3C24", 0.70 + (i % 3) * 0.06)} 0%, ${hexa("#2A1B10", 0.86)} 100%)` }}>
                {/* the awning */}
                <div style={{ position: "absolute", left: -9, right: -9, bottom: -20, height: 26,
                  background: `repeating-linear-gradient(90deg, #C9683E 0px, #C9683E 14px, #F5E8D2 14px, #F5E8D2 28px)`,
                  borderRadius: 3 }} />
                {/* the lit counter under the awning — every stall has a light on */}
                <div style={{ position: "absolute", left: 10, right: 10, bottom: 12, height: 40,
                  background: "#FFF6E4", borderRadius: 2 }} />
                {/* goods on the shelves, dark against the lit back */}
                {[0, 1, 2, 3].map(j => (
                  <div key={"gd" + j} style={{ position: "absolute", left: 12 + (j % 2) * 52,
                    top: 24 + ((j / 2) | 0) * 42, width: 44, height: 30, borderRadius: 3,
                    background: j % 2 ? "#E7B24C" : "#D97757" }} />
                ))}
                {/* the stall's own hanging bulb */}
                <div style={{ position: "absolute", left: 48, bottom: 56, width: 15, height: 20,
                  borderRadius: "44% 44% 50% 50%", background: "#FFF6E4" }} />
              </div>
            );
          })}
          {/* ⭐ HANGING STOCK across the top of the arch — bunting and lanterns.
              This is the band a viewer actually sees over the gate, and it is
              the dark-on-bright that gives the frame its value spread. */}
          {Array.from({ length: 9 }, (_, i) => (
            <div key={"hl" + i} style={{ position: "absolute", left: 22 + i * 74,
              top: 118 + (i % 2) * 22, width: 46, height: 62, borderRadius: "8px 8px 22px 22px",
              background: `linear-gradient(178deg, ${hexa("#8A2F1E", 0.86)} 0%, ${hexa("#4A1409", 0.92)} 100%)`,
              transform: `rotate(${Math.sin(f / 47 + i) * 2.2}deg)`, transformOrigin: "50% -14px" }}>
              <div style={{ position: "absolute", left: 15, top: -16, width: 4, height: 18,
                background: "#3A2A1C" }} />
              <div style={{ position: "absolute", left: 8, top: 22, right: 8, height: 12,
                background: hexa("#FFD9A0", 0.66) }} />
            </div>
          ))}
          {/* ⛔⛔ THE MARK IS AN AUDIENCE FILTER, NOT BRANDING, AND IT HAS TO BE
              IN THE FIRST THREE SECONDS. v1's hook carried ZERO marks and the
              first Claude in the reel was 3.5s in — reel 95's note verbatim:
              *"more Claude logo imagery especially in the first 3 seconds."*
              It hangs INSIDE the arch, over the market, so it says whose market
              this is; it reads through the gate bars; and a slow rotation on a
              fixture is the cheapest legitimate motion in the frame. */}
          <div style={{ position: "absolute", left: 632, top: 128, width: 8, height: 58,
            background: "#3A2A1C" }} />
          <div style={{ position: "absolute", left: 560, top: 182, width: 152, height: 152,
            borderRadius: 22, background: "#FFFFFF", border: "8px solid #E4DECE",
            display: "flex", alignItems: "center", justifyContent: "center",
            transform: `rotate(${Math.sin(f / 53) * 1.4}deg)`, transformOrigin: "50% -56px" }}>
            <Img src={staticFile("claude_logo.png")}
              style={{ width: 104, height: 104, objectFit: "contain",
                transform: `rotate(${(f * 0.55) % 360}deg)` }} />
          </div>
          {/* the bunting the lanterns hang off */}
          <div style={{ position: "absolute", left: -10, right: -10, top: 112, height: 7,
            background: "#3A2A1C" }} />
          {/* six shoppers crossing the opening — characters, at depth */}
          {[0, 1, 2, 3, 4, 5].map(i => (
            <div key={"sh" + i} style={{ position: "absolute",
              left: ((i * 116 + 24 + f * (0.5 + (i % 3) * 0.28)) % 700) - 22,
              bottom: 168 + (i % 3) * 10, width: 44, height: 74 + (i % 2) * 12,
              borderRadius: "16px 16px 3px 3px", background: hexa("#2E1E12", 0.74 + (i % 3) * 0.08) }}>
              <div style={{ position: "absolute", left: 9, top: -15, width: 26, height: 25,
                borderRadius: "50%", background: hexa("#2E1E12", 0.80) }} />
            </div>
          ))}
          {/* the festoon string inside the arch */}
          {Array.from({ length: 11 }, (_, i) => (
            <div key={"fb" + i} style={{ position: "absolute", left: 18 + i * 56,
              top: 96 + Math.sin((i / 10) * Math.PI) * 40 + Math.sin(f / 43 + i) * 2,
              width: 17, height: 22, borderRadius: "44% 44% 50% 50%", background: "#FFF4DC" }} />
          ))}
        </div>
        {/* ⭐ THE ARCH RING, drawn as a real arch: a brick band 22px proud of the
            opening on all three sides, with its own courses. v1 rotated 19 brick
            divs around a point and they bunched into a paper fan. */}
        <div style={{ position: "absolute", left: 150, top: 44, width: 712, height: p.horizon + 18,
          zIndex: 14, borderRadius: "356px 356px 8px 8px", pointerEvents: "none",
          border: "22px solid #A88866",
          background: `repeating-linear-gradient(0deg, ${hexa("#2E1E14", 0.30)} 0px, ${hexa("#2E1E14", 0.30)} 3px, ${hexa("#2E1E14", 0)} 3px, ${hexa("#2E1E14", 0)} 34px)` }} />
        <div style={{ position: "absolute", left: 150, top: 44, width: 712, height: 230,
          zIndex: 15, borderRadius: "356px 356px 0 0", pointerEvents: "none",
          border: "22px solid transparent",
          background: `repeating-conic-gradient(from 200deg at 50% 100%, ${hexa("#3A281E", 0.34)} 0deg 4deg, ${hexa("#3A281E", 0)} 4deg 9deg)`,
          WebkitMask: "radial-gradient(320px 210px at 50% 100%, transparent 0 88%, #000 88% 100%)",
          mask: "radial-gradient(320px 210px at 50% 100%, transparent 0 88%, #000 88% 100%)" }} />
        {/* ⭐ THE LIT FASCIA — the market's own sign band over the arch. It is a
            practical (a run of lamps behind a cream panel), it replaces a strip
            of dark rooftops, and it is the second brightest plane in the frame.
            Frame 0's luma is bought by adding LIGHT SOURCES, never by lifting
            the palette's dark stop (ANIMATION-QUALITY §8). */}
        <div style={{ position: "absolute", left: -20, right: -20, top: 108, height: 96,
          zIndex: 10, background: "linear-gradient(180deg, #FFF6E4 0%, #E8D5B0 62%, #C7A97C 100%)",
          borderBottom: "8px solid #7E5E3E" }}>
          {Array.from({ length: 15 }, (_, i) => (
            <div key={"fl" + i} style={{ position: "absolute", left: 14 + i * 72, top: 60,
              width: 40, height: 22, borderRadius: 4, background: "#FFFFFF" }} />
          ))}
          {Array.from({ length: 8 }, (_, i) => (
            <div key={"fs" + i} style={{ position: "absolute", left: 30 + i * 136, top: 16,
              width: 96, height: 34, borderRadius: 3, background: hexa("#8A5C36", 0.30) }} />
          ))}
        </div>
        {/* the piers either side of the arch */}
        {[92, 868].map((px, i) => (
          <div key={"pr" + i} style={{ position: "absolute", left: px, top: 60, width: 62,
            height: p.horizon - 10, zIndex: 15,
            background: `linear-gradient(90deg, ${mxh("#A88866", 0.34)} 0%, ${dkh("#A88866", 0.22)} 100%)` }}>
            {Array.from({ length: 9 }, (_, j) => (
              <div key={"bk" + j} style={{ position: "absolute", left: 0, right: 0,
                top: 22 + j * 46, height: 4, background: hexa("#3A2A1C", 0.42) }} />
            ))}
          </div>
        ))}
        {/* the wet road's reflection of the arch — the bright plane at the bottom */}
        <div style={{ position: "absolute", left: 120, top: p.horizon, width: 772, height: 280,
          zIndex: 19, opacity: 0.64,
          background: `linear-gradient(180deg, ${hexa("#FFF6E4", 0.95)} 0%, ${hexa("#FFF6E4", 0)} 100%)`,
          filter: "blur(1px)" }} />
        {/* the market's own stall lights, mirrored in the wet road */}
        {[0, 1, 2, 3, 4].map(i => (
          <div key={"rf" + i} style={{ position: "absolute", left: 208 + i * 128, top: p.horizon + 6,
            width: 88, height: 176, zIndex: 20, opacity: 0.30, filter: "blur(2px)",
            background: `linear-gradient(180deg, ${hexa("#FFE7BE", 0.95)} 0%, ${hexa("#FFE7BE", 0)} 100%)` }} />
        ))}
        <Pool x={506} y={p.horizon + 104} w={880} c="#FFF6E4" o={0.34} z={20} />
        {/* ⛔ the occluder is the near KERB EDGE and a bollard, not a post across
            the arch — v1's awning post threw a diagonal brace over the market and
            read as a broken plank rather than as depth. */}
        {occluders && <>
          <div style={{ position: "absolute", left: -40, right: -40, bottom: -30, height: 62,
            zIndex: 86, borderRadius: 8,
            background: "linear-gradient(180deg, #C2CDD8 0%, #7A8592 50%, #454E59 100%)" }} />
          {[70, 940].map((bx, i) => (
            <div key={"bo" + i} style={{ position: "absolute", left: bx, bottom: 34, width: 54,
              height: 176, zIndex: 87, borderRadius: "27px 27px 5px 5px",
              background: "linear-gradient(90deg, #7A8492 0%, #39424E 100%)" }}>
              <div style={{ position: "absolute", left: 6, right: 6, top: 38, height: 12,
                background: hexa("#EAF1F7", 0.42) }} />
            </div>
          ))}
        </>}
      </>);

    /* S1 — UNDER THE ARCH. Warm brass from a single hanging lamp; the rack is
       the brightest object and the arch feet are the deepest shadow. */
    case "arch":
      return (<>
        <Market p={p} f={f} t={t + parX} rakeX0={rakeX0} lit={0.46} glowX={506} glowR={330}
          rakeRate={rakeRate ?? 4.4} kind="crate" />
        <Lamp x={506} y={44} s={1.25} z={17} c={p.key} drop={104} />
        {/* the arch's brick soffit, cropped by the top edge */}
        <div style={{ position: "absolute", left: -40, right: -40, top: -20, height: 132,
          zIndex: 82, background: `linear-gradient(180deg, #241810 0%, #4A3428 100%)`,
          borderBottom: "8px solid #2E2018" }}>
          {Array.from({ length: 16 }, (_, i) => (
            <div key={"sb" + i} style={{ position: "absolute", left: i * 72, top: 66, width: 64,
              height: 58, background: i % 2 ? "#5A3E2E" : "#4A3428", border: "2px solid #33231A" }} />
          ))}
        </div>
        {occluders && <><AwningPost side="l" c="#2A211A" w={58} z={86} />
          <CrateStack side="r" c="#4A3A28" h={230} z={85} /></>}
      </>);

    /* S2/S3 — STALL 1. Green enamel under two hanging bulbs; the pigeonhole
       wall fills the back plane, so the set IS the mechanism. */
    case "holes":
      return (<>
        <Market p={p} f={f} t={t + parX} rakeX0={rakeX0} lit={0.40} glowX={430} glowR={310}
          rakeRate={rakeRate ?? 5.0} kind="stall" />
        <Lamp x={286} y={40} s={0.92} z={17} c={p.key} drop={92} />
        <Lamp x={742} y={40} s={0.92} z={17} c={p.key} drop={118} />
        {/* the stall's counter, cropped by the bottom edge */}
        <div style={{ position: "absolute", left: -30, right: -30, top: p.horizon + 186, height: 200,
          zIndex: 80, background: `linear-gradient(180deg, ${mxh("#274A3E", 0.14)} 0%, ${dkh("#274A3E", 0.44)} 100%)`,
          borderTop: "9px solid #3E7A63" }}>
          {Array.from({ length: 9 }, (_, i) => (
            <div key={"cp" + i} style={{ position: "absolute", left: 10 + i * 122, top: 26,
              width: 96, height: 12, borderRadius: 3, background: hexa("#0C1F18", 0.4) }} />
          ))}
        </div>
        {occluders && <AwningPost side="l" c="#1C382E" w={54} z={86} lean={-1.2} />}
      </>);

    /* S4 — THE TILL. One cold white tube: the biggest lightness step in the
       reel, landing on the beat that should feel like relief. */
    case "till":
      return (<>
        <Market p={p} f={f} t={t + parX} rakeX0={rakeX0} lit={0.86} bulbs={false} glowX={506} glowR={400}
          rakeRate={rakeRate ?? 3.4} kind="shutter" />
        {/* the fluorescent tube itself, drawn */}
        <div style={{ position: "absolute", left: 150, top: 78, width: 712, height: 30,
          zIndex: 84, borderRadius: 15,
          background: "linear-gradient(180deg, #FFFFFF 0%, #DDE6EE 100%)",
          border: "5px solid #7E8892" }} />
        {[150, 838].map((ex, i) => (
          <div key={"tc" + i} style={{ position: "absolute", left: ex - 10, top: 68, width: 34,
            height: 50, borderRadius: 5, background: "#6E7883", zIndex: 85 }} />
        ))}
        <div style={{ position: "absolute", left: 90, top: 104, width: 832, height: 380,
          zIndex: 16, opacity: 0.26,
          background: "linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 100%)",
          clipPath: "polygon(6% 0%, 94% 0%, 100% 100%, 0% 100%)" }} />
        {/* the back shelf wall — six bays of stock, so the room has contents */}
        <div style={{ position: "absolute", left: 46, top: 138, width: 920, height: 300,
          zIndex: 13, borderRadius: 6,
          background: "linear-gradient(178deg, #7E8894 0%, #4E5761 100%)", border: "7px solid #39424C" }}>
          {[0, 1, 2].map(r => (
            <div key={"sr" + r} style={{ position: "absolute", left: 12, right: 12,
              top: 16 + r * 94, height: 78 }}>
              <div style={{ position: "absolute", left: 0, right: 0, bottom: -9, height: 9,
                background: "#C2CCD6" }} />
              {Array.from({ length: 11 }, (_, i) => (
                <div key={"sk" + i} style={{ position: "absolute", left: 6 + i * 81,
                  bottom: 0, width: 62, height: 40 + ((i * 7 + r * 3) % 4) * 10, borderRadius: 3,
                  background: (i + r) % 3 === 0 ? "#E8EDF2" : (i + r) % 3 === 1 ? "#C9683E" : "#8A93A0" }} />
              ))}
            </div>
          ))}
        </div>
        {/* the queue rail, in front — a till has a line at it */}
        {[0, 1].map(i => (
          <div key={"qr" + i} style={{ position: "absolute", left: 92 + i * 640, top: p.horizon + 30,
            width: 26, height: 152, zIndex: 78, borderRadius: 13,
            background: "linear-gradient(90deg, #C2CCD6 0%, #6E7883 100%)" }} />
        ))}
        <div style={{ position: "absolute", left: 104, top: p.horizon + 44, width: 640, height: 16,
          zIndex: 78, borderRadius: 8, background: "#9BA5AF" }} />
        {occluders && <CrateStack side="l" c="#7E8894" h={176} z={84} n={2} />}
      </>);

    /* S5/S6 — STALL 2. Hard sodium from directly above, so every jack row gets
       a top highlight and the floor is nearly black under the bay. */
    case "patch":
      return (<>
        <Market p={p} f={f} t={t + parX} rakeX0={rakeX0} lit={0.44} glowX={506} glowR={350}
          rakeRate={rakeRate ?? 5.6} kind="stall" />
        {/* the cable loom overhead — the SOURCE half of the mechanism */}
        <div style={{ position: "absolute", left: -40, right: -40, top: -10, height: 118,
          zIndex: 83, background: `linear-gradient(180deg, #241A0C 0%, #3E2E16 100%)` }}>
          {Array.from({ length: 22 }, (_, i) => (
            <div key={"lm" + i} style={{ position: "absolute", left: i * 52,
              top: 62 + Math.sin(i * 1.3 + f / 46) * 8, width: 46, height: 13, borderRadius: 7,
              background: i % 3 === 0 ? "#C9A15A" : i % 3 === 1 ? "#8E6A34" : "#6A4E22" }} />
          ))}
          <div style={{ position: "absolute", left: 0, right: 0, top: 86, height: 12,
            background: "#1E1608" }} />
        </div>
        <Lamp x={506} y={104} s={1.1} z={17} c={p.key} drop={62} />
        {occluders && <AwningPost side="r" c="#3A2A12" w={60} z={86} />}
      </>);

    /* S7/S8 — STALL 3. A red raking lamp from camera-left: the most saturated
       frame in the reel, and where BODY_SAT is bought back. */
    case "check":
      return (<>
        <Market p={p} f={f} t={t + parX} rakeX0={rakeX0} lit={0.34} bulbs={false} glowX={218} glowR={370}
          rakeRate={rakeRate ?? 6.6} kind="shutter" />
        {/* the red raking lamp on its bracket */}
        <div style={{ position: "absolute", left: 96, top: 96, width: 106, height: 70,
          zIndex: 84, borderRadius: 8,
          background: "linear-gradient(160deg, #6E2A20 0%, #2E100C 100%)",
          border: "5px solid #431610" }}>
          <div style={{ position: "absolute", right: -6, top: 14, width: 22, height: 40,
            borderRadius: 4, background: "#FF8E62" }} />
        </div>
        <div style={{ position: "absolute", left: 150, top: 106, width: 900, height: 470,
          zIndex: 16, opacity: 0.30,
          background: `linear-gradient(102deg, ${hexa("#FF8E62", 0.8)} 0%, ${hexa("#FF8E62", 0)} 74%)`,
          clipPath: "polygon(0% 6%, 22% 0%, 100% 86%, 0% 100%)" }} />
        {/* a wall of red hazard chevrons behind the barrier */}
        <div style={{ position: "absolute", left: 0, right: 0, top: p.horizon - 44, height: 44,
          zIndex: 19, opacity: 0.7,
          background: `repeating-linear-gradient(56deg, #8E2A1C 0px, #8E2A1C 30px, #23100C 30px, #23100C 60px)` }} />
        {occluders && <><AwningPost side="l" c="#3A130E" w={64} z={86} />
          <CrateStack side="r" c="#5A2018" h={190} z={85} n={2} /></>}
      </>);

    /* S9/S10 — STALL 4, out back. A COLD room with ONE warm firebox: the whole
       point of the scene is that the warm light is now yours, so the palette
       carries the contrast rather than a grade. */
    case "shed":
      return (<>
        <Market p={p} f={f} t={t + parX} rakeX0={rakeX0} lit={0.30} bulbs={false} glowX={330} glowR={300}
          rakeRate={rakeRate ?? 4.2} kind="crate" />
        {/* moonlight from a high window, the cold key */}
        <div style={{ position: "absolute", left: 620, top: 62, width: 268, height: 176,
          zIndex: 15, borderRadius: 6, background: "linear-gradient(178deg, #C6DCF4 0%, #6E90BC 100%)",
          border: "8px solid #22303F" }}>
          {[1, 2].map(i => (
            <div key={"mw" + i} style={{ position: "absolute", left: i * 88, top: 0, bottom: 0,
              width: 8, background: "#22303F" }} />
          ))}
          <div style={{ position: "absolute", left: 0, right: 0, top: 84, height: 8,
            background: "#22303F" }} />
        </div>
        <div style={{ position: "absolute", left: 380, top: 200, width: 700, height: 460,
          zIndex: 16, opacity: 0.24,
          background: `linear-gradient(200deg, ${hexa("#C6DCF4", 0.9)} 0%, ${hexa("#C6DCF4", 0)} 72%)`,
          clipPath: "polygon(34% 0%, 74% 0%, 100% 100%, 0% 100%)" }} />
        {/* corrugated shed wall */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 40, height: p.horizon - 40,
          zIndex: 9, opacity: 0.5,
          background: `repeating-linear-gradient(90deg, ${dkh(p.back, 0.10)} 0px, ${dkh(p.back, 0.10)} 26px, ${dkh(p.back, 0.34)} 26px, ${dkh(p.back, 0.34)} 52px)` }} />
        {occluders && <><AwningPost side="l" c="#1A2330" w={56} z={86} />
          <CrateStack side="r" c="#2C3C54" h={200} z={85} n={2} /></>}
      </>);

    /* S11/S12 — STALL 5. The wall's own signal lamps ARE the light source, so
       the mechanism and the practical are the same object. */
    case "plugs":
      return (<>
        <Market p={p} f={f} t={t + parX} rakeX0={rakeX0} lit={0.52} glowX={506} glowR={420}
          rakeRate={rakeRate ?? 5.2} kind="stall" />
        {/* the trunking run that feeds the wall — the SOURCE half */}
        <div style={{ position: "absolute", left: -30, right: -30, top: 84, height: 46,
          zIndex: 82, borderRadius: 5,
          background: "linear-gradient(180deg, #2E6B58 0%, #113026 100%)",
          border: "4px solid #0C2119" }}>
          {Array.from({ length: 18 }, (_, i) => (
            <div key={"tk" + i} style={{ position: "absolute", left: 14 + i * 62, top: 8,
              width: 34, height: 28, borderRadius: 3, background: hexa("#9CF0C4", 0.22) }} />
          ))}
        </div>
        {occluders && <AwningPost side="r" c="#12332A" w={58} z={86} />}
      </>);

    /* S13 — THE GATE COUNTER. Warm practical over the counter, cool street
       spill behind it: the strongest depth in the reel, on the last frame. */
    case "gate":
      return (<>
        <Market p={p} f={f} t={t + parX} rakeX0={rakeX0} lit={0.42} glowX={506} glowR={340}
          rakeRate={rakeRate ?? 4.0} kind="stall" />
        <Lamp x={506} y={40} s={1.2} z={17} c={p.key} drop={96} />
        {/* the cool street spill through the gate behind */}
        <div style={{ position: "absolute", left: 96, top: 150, width: 210, height: p.horizon - 150,
          zIndex: 12, borderRadius: "100px 100px 0 0",
          background: "linear-gradient(178deg, #93A8C8 0%, #3E4A62 100%)", opacity: 0.7 }} />
        <div style={{ position: "absolute", left: 716, top: 150, width: 210, height: p.horizon - 150,
          zIndex: 12, borderRadius: "100px 100px 0 0",
          background: "linear-gradient(178deg, #93A8C8 0%, #3E4A62 100%)", opacity: 0.55 }} />
        {occluders && <AwningPost side="l" c="#2A2233" w={60} z={86} />}
      </>);
  }
  return null;
};
