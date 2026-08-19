import React from "react";
import { Img, staticFile } from "remotion";
import {
  E, OUT, LIN, IN_Q, hexa, rnd, dkh, mxh, ui, mono,
  CLAY, GOLD, GREEN, RED, SKY, TEAL, CYAN, VIOLET, AMBER, PAPER, blend,
  PL, Pool, Rake, CrateWall, SprawlEdge, Band, GH,
} from "./SqdWorld";
import type { SqdKey, Place } from "./SqdWorld";
import { Occluder, Cone, StreetLamp } from "./WorldKit";

/* ===========================================================================
   REEL 112 "SQUAD" · THE SETS.  Board: storyboards/112-squad.md.

   ⛔⛔ THE SET IS WORTH MORE THAN THE EFFECTS. Measured on this repo: a dense,
      correct SET (a wall of ~70 real objects instead of an empty room) moved a
      scene 7.68 -> 9.65, while three rounds of hand-added scan bars, trolleys
      and travel bands stalled at 7.68. Build the right room BEFORE adding
      motion to the wrong one.

   ⛔⛔ THE THIRD PLANE IS THE ONE EVERYONE SKIPS: a mass CROPPED BY THE PANEL
      EDGE, IN FRONT of the action. Ten reels shipped without one and nothing
      fails when it is missing. Here it is free and it is thematic: the mass is
      always THE SPRAWL (`SprawlEdge`), the villain, which by its own rule is
      never cleared. Every set below calls it.

   ⛔ WHEN A SET IS TOO DIM, ADD A PRACTICAL (`Cone`/`StreetLamp`/`Pool`) OR
      BRIGHTEN THE SUBJECT. **Never lift the palette's dark stop.** That move,
      applied as a whole-reel brightness floor, cost ten reels 47% of their
      saturation and doubled their black point while motion moved +2.6%.
      The >=140 luma law is FRAME 0 ONLY — body scenes target luma 70-105,
      saturated pixels 34-45%, black point p10 <= 35.
   ========================================================================= */

export const placeFor = (k: SqdKey): Place => PL[k];

export type RakeKey = "dawn" | "amber" | "steel";
const RK: Record<RakeKey, { sp: number; sk: number; o: number; n: number }> = {
  dawn:  { sp: 1.00, sk:   0, o: 1.00, n:  0 },
  amber: { sp: 1.62, sk: -11, o: 1.34, n:  4 },
  steel: { sp: 0.58, sk:  13, o: 0.70, n: -3 },
};

/* ---------------------------------------------------------------------------
   THE INTERIOR SHELL — back wall, a mid band, floor, skirting, drifting grit,
   and a ceiling mass cropping the top. FOUR depth planes before a prop lands.
   ------------------------------------------------------------------------ */
const Room: React.FC<{ p: Place; f: number; band?: React.ReactNode; ceiling?: boolean;
  gritN?: number }> = ({ p, f, band, ceiling = true, gritN = 26 }) => (<>
  {/* 1 · back wall / sky */}
  <div style={{ position: "absolute", inset: 0, zIndex: 1,
    background: `linear-gradient(176deg, ${p.back} 0%, ${p.back2} 100%)` }} />
  {/* 2 · the mid band — whatever this room has ON its far wall */}
  <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: p.horizon, zIndex: 6 }}>
    {band}
  </div>
  {/* 3 · floor + skirting line */}
  <div style={{ position: "absolute", left: 0, right: 0, top: p.horizon, bottom: 0, zIndex: 14,
    background: `linear-gradient(184deg, ${p.floor} 0%, ${p.floor2} 100%)` }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: p.horizon - 9, height: 11,
    background: p.lip, zIndex: 15 }} />
  {/* 4 · floor grit, drifting — the room never flatlines */}
  {Array.from({ length: gritN }, (_, i) => (
    <div key={"g" + i} style={{ position: "absolute",
      left: ((i * 97 + 30 - f * 0.6) % 1180) - 60,
      top: p.horizon + 22 + ((i * 51) % 9) * 27,
      width: 5 + (i % 3) * 4, height: 4, borderRadius: 2, background: p.grit,
      opacity: 0.36, zIndex: 16 }} />
  ))}
  {ceiling && (
    <div style={{ position: "absolute", left: 0, right: 0, top: -30, height: 96, zIndex: 90,
      background: `linear-gradient(180deg, ${dkh(p.back2, 0.24)} 0%, ${hexa(dkh(p.back2, 0.24), 0)} 100%)` }} />
  )}
</>);

/** the receding parallax bands of the sprawl, behind everything. This is what
    makes THE STACKS a canyon rather than a wall — six planes of crates at
    falling contrast, so the eye reads depth before a single prop lands. */
const SprawlDepth: React.FC<{ f: number; p: Place; bands?: number; base?: number }> =
  ({ f, p, bands = 5, base = 0 }) => (<>
    {Array.from({ length: bands }, (_, b) => {
      const k = b / (bands - 1);                       // 0 near .. 1 far
      const y = p.horizon - 6 - b * 26;
      const cw = 104 - b * 13, ch = 74 - b * 9;
      const c = blend("#5E5A52", p.back2, 0.16 + k * 0.62);
      return (
        <CrateWall key={"sd" + b} f={f} x={-70 - b * 21} y={y}
          cols={Math.ceil(1240 / cw)} rows={3 + b} cw={cw} ch={ch}
          c={c} z={base + 2 + (bands - b) * 2} o={1 - k * 0.22} seed={7 + b * 3} />
      );
    })}
  </>);

/* =========================================================================
   THE NINE SETS
   ====================================================================== */
export const SetFor: React.FC<{ k: SqdKey; f: number; lightK?: number; vk?: RakeKey;
  /** ⭐ frames at which each bay TIPS INWARD — the shelf-collapse hook */
  collapse?: number[] }> =
  ({ k, f, lightK = 1, vk = "dawn", collapse }) => {
  const p = PL[k];
  const rk = RK[vk];

  switch (k) {

    /* ---- S0-S2 · THE SUMMONING FLOOR — the REDESIGNED hook.
       ⭐⭐ Alex: *"needs to be hierarchical like one claude centerized somehow but
       themed and interesting concepts."* So: ONE lit disc dead centre, one
       colossal Claude standing on it, and the thousands of repos as a REAL
       LIBRARY receding into the dark on both sides — uprights, cross braces,
       ladders, hanging lamps, cable runs and individually drawn crate spines,
       not a field of rectangles.
       ⛔ HIERARCHY IS THE SPREAD: the disc and the plate carry the frame-0 mean
       above 140, the hall stays near-black, and nothing competes with the centre. */
    case "summon": {
      const AISLE = 372;                       /* the lit centre corridor */
      return (<>
        <Room p={p} f={f} ceiling={false} gritN={22} band={
          <>
            <div style={{ position: "absolute", inset: 0,
              background: "linear-gradient(180deg, #1A1224 0%, #4A2A22 62%, #8A5238 100%)" }} />
            {/* the vaulted end of the hall, far away down the aisle */}
            <div style={{ position: "absolute", left: 506 - AISLE / 2 - 40, top: 78,
              width: AISLE + 80, height: 400,
              background: "linear-gradient(180deg, #E8B074 0%, #FFEFC8 100%)",
              borderRadius: "50% 50% 0 0" }} />
            <div style={{ position: "absolute", left: 506 - AISLE / 2 - 96, top: 96,
              width: AISLE + 192, height: 420, borderRadius: "50% 50% 0 0",
              background: "radial-gradient(ellipse at 50% 78%, rgba(255,236,196,0.72) 0%, rgba(255,226,170,0) 72%)" }} />
            {/* ⭐ THE STACKS AS A REAL LIBRARY: four receding bays per side, each
                with uprights, three shelves, and individually drawn spines. */}
            {[0, 1].map((side) =>
              Array.from({ length: 4 }, (_, b) => {
                const k = b / 3;                                  // 0 near .. 1 far
                const w = 250 - b * 46, h = 470 - b * 78;
                const x = side === 0 ? 20 + b * 68 : 1012 - 20 - b * 68 - w;
                const top = p.horizon - h + b * 30;
                const shade = blend("#6A4A30", p.back2, 0.34 + k * 0.50);
                /* ⭐ THE DOMINO. Each bay pivots about its OUTER foot and falls
                   inward, staggered, so the library comes down on him bay by bay
                   rather than as one soft fade. */
                const ci = b * 2 + side;
                const ct = collapse && collapse[ci] !== undefined ? collapse[ci] : null;
                const tip = ct === null ? 0 : E(f, ct, ct + 16, 0, 1, IN_Q) * (side === 0 ? 74 : -74);
                return (
                  <div key={"bay" + side + b} style={{ position: "absolute", left: x, top,
                    width: w, height: h, zIndex: 8 + (4 - b) * 2,
                    transformOrigin: side === 0 ? "0% 100%" : "100% 100%",
                    transform: tip ? `rotate(${tip}deg)` : undefined }}>
                    {/* the two uprights */}
                    {[0, w - 16].map((ux, j) => (
                      <div key={"up" + j} style={{ position: "absolute", left: ux, top: 0,
                        width: 16, height: h, background: dkh(shade, 0.34) }} />
                    ))}
                    {/* three shelves, each carrying drawn spines */}
                    {[0, 1, 2].map((r) => {
                      const sy = 16 + r * ((h - 40) / 3);
                      return (
                        <React.Fragment key={"sh" + r}>
                          <div style={{ position: "absolute", left: 6, top: sy + (h - 40) / 3 - 12,
                            width: w - 12, height: 10, background: mxh(shade, 0.22) }} />
                          {Array.from({ length: Math.max(4, 9 - b) }, (_, q) => {
                            const sw = (w - 28) / Math.max(4, 9 - b);
                            const hh = ((h - 40) / 3) - 20 - ((q * 7) % 3) * 5;
                            const CLOTH = ["#7E3B2E", "#2E4A5E", "#4A5A32", "#5E3A56", "#8A5A24", "#2E4A46"];
                            /* deterministic, so re-renders are identical */
                            const cl = CLOTH[(q * 3 + r * 2 + b) % 6];
                            const lit = blend(cl, p.back2, 0.10 + k * 0.46);
                            return (
                              <div key={"sp" + q} style={{ position: "absolute",
                                left: 12 + q * sw, top: sy + (h - 40) / 3 - 12 - hh,
                                width: sw - 3, height: hh, borderRadius: 2,
                                background: `linear-gradient(96deg, ${dkh(lit, 0.26)} 0%, ${lit} 46%, ${dkh(lit, 0.16)} 100%)`,
                                borderTop: `2px solid ${mxh(lit, 0.26)}` }}>
                                {/* the gilt label band and two raised bands — what
                                    makes a spine a SPINE rather than a bar */}
                                <div style={{ position: "absolute", left: 1, right: 1,
                                  top: hh * 0.30, height: Math.max(2, hh * 0.13),
                                  background: hexa("#FFEDCE", 0.72) }} />
                                <div style={{ position: "absolute", left: 0, right: 0,
                                  top: hh * 0.62, height: Math.max(1, hh * 0.05),
                                  background: dkh(lit, 0.42) }} />
                                <div style={{ position: "absolute", left: 0, right: 0,
                                  top: hh * 0.80, height: Math.max(1, hh * 0.05),
                                  background: dkh(lit, 0.42) }} />
                              </div>
                            );
                          })}
                        </React.Fragment>
                      );
                    })}
                    {/* a leaning ladder on the nearest bay only */}
                    {b === 0 && (
                      <div style={{ position: "absolute", left: side === 0 ? w - 54 : 12, top: 40,
                        width: 40, height: h - 40, transform: `rotate(${side === 0 ? 5 : -5}deg)` }}>
                        {[0, 30].map((lx, j) => (
                          <div key={"lr" + j} style={{ position: "absolute", left: lx, top: 0,
                            width: 9, bottom: 0, background: dkh(shade, 0.16) }} />
                        ))}
                        {Array.from({ length: 7 }, (_, r) => (
                          <div key={"lg" + r} style={{ position: "absolute", left: 2,
                            top: 24 + r * ((h - 70) / 7), width: 36, height: 7,
                            background: dkh(shade, 0.22) }} />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })
            )}
            {/* ⭐ the lit soffit the lamps hang from — the upper band measured 85.7
                and this is the practical that lights it */}
            <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 96,
              background: "linear-gradient(180deg, #FFE9BC 0%, #E8B878 62%, rgba(200,140,84,0) 100%)",
              zIndex: 12 }} />
            {Array.from({ length: 7 }, (_, i) => (
              <div key={"sof" + i} style={{ position: "absolute", left: 26 + i * 146, top: 8,
                width: 118, height: 40, borderRadius: 6, background: "#FFF9E6",
                border: "4px solid #C08A4A", zIndex: 13 }} />
            ))}
            {/* the hanging lamps down the aisle — real fittings with flex and shade */}
            {[0, 1, 2].map((i) => {
              const x = 506, y = 60 + i * 92, sc = 1 - i * 0.2;
              return (
                <React.Fragment key={"lamp" + i}>
                  <div style={{ position: "absolute", left: x - 2, top: 0, width: 4, height: y,
                    background: "#2A1C14", zIndex: 30 }} />
                  <div style={{ position: "absolute", left: x - 46 * sc, top: y,
                    width: 92 * sc, height: 30 * sc, borderRadius: "50% 50% 14% 14%",
                    background: "#3A2A1E", border: `${3 * sc}px solid #241A12`, zIndex: 31 }} />
                  <div style={{ position: "absolute", left: x - 15 * sc, top: y + 26 * sc,
                    width: 30 * sc, height: 12 * sc, borderRadius: 5, background: "#FFE6B4",
                    zIndex: 32 }} />
                </React.Fragment>
              );
            })}
          </>
        } />

        {/* ⭐ THE DISC — the one bright thing on the floor, and what makes the
            centre read as a stage rather than a spot on a plain. */}
        <div style={{ position: "absolute", left: 0, right: 0, top: p.horizon, bottom: 0, zIndex: 17,
          background: "linear-gradient(180deg, rgba(255,230,180,0.50) 0%, rgba(255,214,150,0.16) 100%)" }} />
        <div style={{ position: "absolute", left: 506 - 380, top: p.horizon + 70, width: 760,
          height: 250, borderRadius: "50%", zIndex: 18,
          background: "radial-gradient(ellipse at 50% 50%, #FFF3D2 0%, #F0BE7E 44%, rgba(240,190,126,0) 76%)" }} />
        <div style={{ position: "absolute", left: 506 - 250, top: p.horizon + 112, width: 500,
          height: 140, borderRadius: "50%", zIndex: 19,
          border: "7px solid #C8894A", background: "rgba(255,226,170,0.20)" }} />
        {/* chevrons cut into the disc rim — a marked floor plate, not a glow */}
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return (
            <div key={"chev" + i} style={{ position: "absolute",
              left: 506 + Math.cos(a) * 232 - 15, top: p.horizon + 182 + Math.sin(a) * 62 - 7,
              width: 30, height: 14, background: "#C8894A", opacity: 0.9, zIndex: 20,
              transform: `rotate(${(a * 180) / Math.PI}deg)` }} />
          );
        })}
        <Cone x={506} y={92} bot={620} top={120} len={470} c="#FFE6B4" o={0.24} z={22} f={f} />
        <Rake f={f} y={0} h={792} n={11 + rk.n} c="#FFE6B4" speed={5.2 * rk.sp} z={23} o={0.09 * rk.o} skew={-9 + rk.sk} />
        {/* the near shelf ends, cropped by both edges — the third plane */}
        <SprawlEdge side="l" c="#3A2A1C" w={62} z={92} rows={13} />
        <SprawlEdge side="r" c="#332417" w={54} z={91} rows={13} />
      </>);
    }

    /* ---- S0-S2 · THE STACKS — the HOOK, and the only set built to the frame-0
       brightness law. ⛔⛔ A dark canyon is the composition the idea asks for and
       it cannot reach 140 mean luma, so the SKY carries the mean and the crates
       carry the SPREAD. ⭐ Brightness is the MEAN, hierarchy is the SPREAD — they
       only collide if you reach for the palette's dark stop. The dawn sky band is
       46% of the panel and sits above 200; the crates stay near-black. ------- */
    case "stacks":
      return (<>
        <Room p={p} f={f} ceiling={false} gritN={30} band={
          <>
            {/* the dawn sky — the brightness that wins the feed */}
            <div style={{ position: "absolute", inset: 0,
              background: "linear-gradient(180deg, #7FA2CE 0%, #E2A268 48%, #FFDDA0 100%)" }} />
            {/* low sun, a real practical, off to the left */}
            <div style={{ position: "absolute", left: 78, top: 250, width: 300, height: 300,
              borderRadius: "50%", background: "radial-gradient(circle, #FFE9AE 0%, rgba(255,214,140,0.19) 40%, rgba(255,214,140,0.03) 72%)" }} />
            {/* the canyon walls in six receding planes */}
            <SprawlDepth f={f} p={p} bands={6} base={6} />
          </>
        } />
        {/* ⛔ THE CANYON COMES DOWN TO THE FLOOR. v1 stopped every crate band at
            the horizon and left the bottom 280px a flat grey plain — a third of
            the panel doing nothing on the one frame guaranteed to be seen. Two
            floor-level stacks now flank the landing line and are cropped by the
            frame, so the seven land INSIDE the canyon instead of in front of it. */}
        <CrateWall f={f} x={-96} y={p.horizon + 268} cols={2} rows={4} cw={104} ch={72}
          c="#7A6A58" z={19} seed={51} />
        <CrateWall f={f} x={904} y={p.horizon + 268} cols={2} rows={4} cw={104} ch={72}
          c="#6E5F4E" z={19} seed={57} />
        {/* the wet concrete sheen — a reflection plane, not a colour lift */}
        <div style={{ position: "absolute", left: 0, right: 0, top: p.horizon, height: 220, zIndex: 17,
          background: "linear-gradient(180deg, rgba(238,231,212,0.15) 0%, rgba(238,231,212,0.03) 100%)" }} />
        {/* the gantry lamp overhead — swings, so the room never flatlines */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 40, zIndex: 88,
          background: "linear-gradient(180deg, #4A463C 0%, #2E2B24 100%)" }} />
        <div style={{ position: "absolute", left: 506 + Math.sin(f / 46) * 26, top: 36,
          width: 8, height: 74, background: "#2E2B24", zIndex: 88 }} />
        <div style={{ position: "absolute", left: 506 - 44 + Math.sin(f / 46) * 26, top: 106,
          width: 88, height: 26, borderRadius: 6, background: "#F7EBCC", zIndex: 89 }} />
        <Cone x={506 + Math.sin(f / 46) * 26} y={126} bot={640} top={110} len={470}
          c="#FFF0CE" o={0.26} z={22} f={f} />
        <Pool x={506} y={p.horizon + 20} w={1020} c="#FFF0CE" o={0.22} z={18} />
        <Rake f={f} y={0} h={792} n={14 + rk.n} c="#FFF0CE" speed={7.6 * rk.sp} z={23} o={0.14 * rk.o} skew={-11 + rk.sk} />
        <SprawlEdge side="l" c="#3E3A32" w={104} z={92} rows={13} />
        <SprawlEdge side="r" c="#35322B" w={86} z={91} rows={13} />
      </>);

    /* ---- S3 · THE NIGHT ARCHIVE — one amber lamp on deep navy. The drawer wall
       IS the memory, and it is built from the same crate module as the sprawl,
       because the archive is what the sprawl becomes once something files it. */
    case "archive":
      return (<>
        <Room p={p} f={f} band={
          <>
            <div style={{ position: "absolute", inset: 0,
              background: "linear-gradient(180deg, #141A2C 0%, #2A3050 100%)" }} />
            {/* the drawer wall: 9 x 7 = 63 real objects */}
            {Array.from({ length: 7 }, (_, r) =>
              Array.from({ length: 9 }, (_, q) => (
                <div key={"dw" + r + "_" + q} style={{ position: "absolute",
                  left: 64 + q * 106, top: 44 + r * 70, width: 96, height: 60,
                  background: dkh("#4A4230", (r % 2) * 0.05 + (q % 3) * 0.03),
                  border: "3px solid #2A2418", borderRadius: 4, zIndex: 8 }}>
                  <div style={{ position: "absolute", left: 30, top: 24, width: 36, height: 8,
                    borderRadius: 3, background: "#6E6046" }} />
                </div>
              ))
            )}
          </>
        } />
        {/* the rail the ladder runs on */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 512, height: 9,
          background: "#5A4E32", zIndex: 30 }} />
        {/* the one amber practical: a hanging archive lamp on a flex, drawn as a
            real fitting so the light has a SOURCE in frame */}
        <div style={{ position: "absolute", left: 866, top: 0, width: 7, height: 300,
          background: "#3A3020", zIndex: 29 }} />
        <div style={{ position: "absolute", left: 806, top: 296, width: 128, height: 46,
          borderRadius: "50% 50% 12% 12%", background: "#5A4A2E",
          border: "4px solid #3A3020", zIndex: 30 }} />
        <div style={{ position: "absolute", left: 838, top: 334, width: 30, height: 18,
          borderRadius: 6, background: "#FFE6B4", zIndex: 31 }} />
        <Cone x={868} y={330} bot={620} top={130} len={330} c="#FFD59A" o={0.22} z={22} f={f} />
        <Pool x={862} y={p.horizon + 4} w={640} c="#FFD59A" o={0.26} z={18} />
        <Rake f={f} y={0} h={792} n={12 + rk.n} c="#FFD59A" speed={5.5 * rk.sp} z={23} o={0.11 * rk.o} skew={9 + rk.sk} />
        <SprawlEdge side="l" c="#221E2E" w={112} z={93} rows={13} />
      </>);

    /* ---- S4 · THE SAME ARCHIVE AT DAWN. Same room, cold blue window light
       instead of the amber lamp: hue AND lightness both change, which is the
       pairwise neighbour rule. ------------------------------------------- */
    case "archiveDawn":
      return (<>
        <Room p={p} f={f} band={
          <>
            <div style={{ position: "absolute", inset: 0,
              background: "linear-gradient(180deg, #5E7A9E 0%, #A9C0D6 100%)" }} />
            {Array.from({ length: 7 }, (_, r) =>
              Array.from({ length: 9 }, (_, q) => (
                <div key={"dd" + r + "_" + q} style={{ position: "absolute",
                  left: 64 + q * 106, top: 44 + r * 70, width: 96, height: 60,
                  background: dkh("#7E8490", (r % 2) * 0.05 + (q % 3) * 0.03),
                  border: "3px solid #4E5560", borderRadius: 4, zIndex: 8 }}>
                  <div style={{ position: "absolute", left: 30, top: 24, width: 36, height: 8,
                    borderRadius: 3, background: "#AEB6C0" }} />
                </div>
              ))
            )}
            {/* the window that replaced the lamp — the new practical */}
            <div style={{ position: "absolute", left: 700, top: 60, width: 300, height: 330,
              background: "linear-gradient(180deg, #E8F2FE 0%, #B6CEE4 100%)",
              border: "10px solid #56606C", borderRadius: 6, zIndex: 9 }} />
            <div style={{ position: "absolute", left: 844, top: 60, width: 10, height: 330,
              background: "#56606C", zIndex: 10 }} />
          </>
        } />
        <div style={{ position: "absolute", left: 0, right: 0, top: 512, height: 9,
          background: "#8894A0", zIndex: 30 }} />
        <Cone x={850} y={230} bot={700} top={220} len={420} c="#DCEBFA" o={0.22} z={22} f={f} />
        <Pool x={780} y={p.horizon + 4} w={760} c="#DCEBFA" o={0.22} z={18} />
        {/* ⛔ THE NEAR MASS. RECALL measured p10 62.0 against a 35 bar and had no
            foreground plane — the camera was pointed at a backdrop. This is the
            thing the lens is looking past, cropped by the bottom edge: it answers
            the depth question and it is where the black point comes back, without
            touching a single prop's value. */}
        <div style={{ position: "absolute", left: -60, right: -60, bottom: -40, height: 213,
          zIndex: 87, background: "linear-gradient(180deg, rgba(10,8,5,0) 0%, rgba(10,8,5,0.96) 30%, #070503 100%)" }} />
        <Rake f={f} y={0} h={792} n={13 + rk.n} c="#DCEBFA" speed={6.3 * rk.sp} z={23} o={0.13 * rk.o} skew={-8 + rk.sk} />
        <SprawlEdge side="l" c="#4A5058" w={112} z={93} rows={13} />
      </>);

    /* ---- S5-S6 · THE LINE — a teal assembly floor. The conveyor is the
       background process and it runs the FULL width, alternating light and
       shadow slats so it actually measures (a light-only band scores lower AND
       lifts the black point). --------------------------------------------- */
    case "line":
      return (<>
        <Room p={p} f={f} band={
          <>
            <div style={{ position: "absolute", inset: 0,
              background: "linear-gradient(180deg, #1E3A3E 0%, #2E5A5E 100%)" }} />
            {/* the plant behind: ducts, tanks, a gantry — 30+ real objects */}
            {Array.from({ length: 7 }, (_, i) => (
              <div key={"tk" + i} style={{ position: "absolute", left: 40 + i * 148, top: 150,
                width: 96, height: 250, borderRadius: 12,
                background: `linear-gradient(90deg, ${dkh("#3E6E72", 0.14)} 0%, #4E8286 46%, ${dkh("#3E6E72", 0.2)} 100%)`,
                border: "4px solid #2A4E52", zIndex: 8 }} />
            ))}
            {Array.from({ length: 14 }, (_, i) => (
              <div key={"dc" + i} style={{ position: "absolute", left: 0 + i * 82, top: 74,
                width: 62, height: 34, background: "#2E5256", border: "3px solid #204044",
                borderRadius: 5, zIndex: 9 }} />
            ))}
            {/* the overhead gantry rail */}
            <div style={{ position: "absolute", left: 0, right: 0, top: 42, height: 22,
              background: "#22484C", zIndex: 10 }} />
          </>
        } />
        {/* the overheads: five flat teal strips, one hot key over station 5 */}
        {[150, 320, 506, 692, 862].map((x, i) => (
          <React.Fragment key={"ov" + i}>
            <div style={{ position: "absolute", left: x - 60, top: 62, width: 120, height: 16,
              borderRadius: 4, background: i === 4 ? "#FFF6DC" : "#CFEDEE", zIndex: 89 }} />
            <Cone x={x} y={78} bot={560} top={112} len={430}
              c={i === 4 ? "#FFF6DC" : "#CFEDEE"} o={i === 4 ? 0.26 : 0.15} z={21} f={f} />
          </React.Fragment>
        ))}
        <Pool x={506} y={p.horizon - 6} w={1040} c="#CFEDEE" o={0.16} z={18} />
        <Rake f={f} y={0} h={792} n={15 + rk.n} c="#CFEDEE" speed={8.6 * rk.sp} z={23} o={0.13 * rk.o} skew={-13 + rk.sk} />
        {/* ⛔ THE NEAR PLANE. Every set needs a mass the camera is looking PAST or
            it is a backdrop — and it is also where the black point lives. */}
        <div style={{ position: "absolute", left: -60, right: -60, bottom: -40, height: 187,
          zIndex: 86, background: "linear-gradient(180deg, rgba(9,7,5,0) 0%, rgba(9,7,5,0.95) 32%, #060403 100%)" }} />
        <SprawlEdge side="r" c="#1A2E30" w={98} z={92} rows={13} />
      </>);

    /* ---- S7-S8 · THE INDEX HALL — warm gold uplight, tall volume. The
       split-flap board IS built out of the crate wall: the index is what the
       sprawl looks like once somebody catalogues it. ----------------------- */
    case "hall":
      return (<>
        <Room p={p} f={f} band={
          <>
            <div style={{ position: "absolute", inset: 0,
              background: "linear-gradient(180deg, #3A2A16 0%, #6E4E1E 100%)" }} />
            {/* the hall's colonnade — depth plane 2 */}
            {[70, 250, 762, 942].map((x, i) => (
              <div key={"col" + i} style={{ position: "absolute", left: x, top: 0, width: 74,
                height: 596, background: `linear-gradient(90deg, #4A3A20 0%, #7A6238 40%, #3A2C18 100%)`,
                zIndex: 9 }} />
            ))}
            {/* the uplights at the base of each column */}
            {[107, 287, 799, 979].map((x, i) => (
              <Cone key={"uc" + i} x={x} y={560} bot={80} top={300} len={-470}
                c="#FFDE9E" o={0.14} z={10} f={f} />
            ))}
          </>
        } />
        {/* the terrazzo reflection */}
        <div style={{ position: "absolute", left: 0, right: 0, top: p.horizon, height: 200, zIndex: 17,
          background: "linear-gradient(180deg, rgba(255,222,158,0.12) 0%, rgba(255,222,158,0.03) 100%)" }} />
        <Pool x={506} y={p.horizon - 4} w={980} c="#FFDE9E" o={0.20} z={18} />
        <Rake f={f} y={0} h={792} n={13 + rk.n} c="#FFDE9E" speed={7.0 * rk.sp} z={23} o={0.14 * rk.o} skew={7 + rk.sk} />
        <SprawlEdge side="l" c="#2E2214" w={96} z={92} rows={13} />
        <SprawlEdge side="r" c="#281E12" w={80} z={91} rows={13} />
      </>);

    /* ---- S9-S11 · THE THREE BENCHES — hard white split light, three pools with
       REAL DARK between them. The dark between the pools is the hierarchy. --- */
    case "bench":
      return (<>
        <Room p={p} f={f} band={
          <>
            <div style={{ position: "absolute", inset: 0,
              background: "linear-gradient(180deg, #4A4438 0%, #7A7060 100%)" }} />
            {/* the tool wall — ~40 real objects, the density that moved 7.68 -> 9.65 */}
            {Array.from({ length: 4 }, (_, r) =>
              Array.from({ length: 11 }, (_, q) => {
                const kind = (r * 11 + q) % 4;
                return (
                  <div key={"tw" + r + "_" + q} style={{ position: "absolute",
                    left: 52 + q * 84, top: 96 + r * 104,
                    width: kind === 0 ? 20 : kind === 1 ? 54 : 34,
                    height: kind === 2 ? 74 : kind === 1 ? 22 : 58,
                    borderRadius: kind === 3 ? 16 : 4,
                    background: dkh("#8A7E66", (q % 3) * 0.06 + r * 0.03),
                    border: "3px solid #5A5142", zIndex: 8 }} />
                );
              })
            )}
            {/* ⭐ THE OVERHEAD RACK — loaded, and it fills the dead upper third */}
            {Array.from({ length: 9 }, (_, q) => (
              <div key={"ov" + q} style={{ position: "absolute", left: 20 + q * 112, top: 18,
                width: 96, height: 54, background: dkh("#8A7E66", 0.10 + (q % 3) * 0.08),
                border: "4px solid #4A4232", borderRadius: 4, zIndex: 9 }}>
                <div style={{ position: "absolute", left: 8, top: 12, right: 8, height: 6,
                  background: "rgba(30,22,12,0.4)" }} />
              </div>
            ))}
            <div style={{ position: "absolute", left: 0, right: 0, top: 74, height: 16,
              background: "#4A4232", zIndex: 10 }} />
            {/* hanging chains from the gantry */}
            {[120, 330, 540, 750, 940].map((cx, q) => (
              <div key={"ch" + q} style={{ position: "absolute", left: cx, top: 90,
                width: 7, height: 62 + (q % 3) * 26, background: "#5A5142", zIndex: 10 }} />
            ))}
            {/* the pegboard rail the tools hang from */}
            {[86, 190, 294, 398].map((y, i) => (
              <div key={"pr" + i} style={{ position: "absolute", left: 30, right: 30, top: y,
                height: 7, background: "#5A5142", zIndex: 9 }} />
            ))}
          </>
        } />
        {/* THREE hard pools with dark between — the split light */}
        {[196, 506, 816].map((x, i) => (
          <React.Fragment key={"bp" + i}>
            <div style={{ position: "absolute", left: x - 54, top: 40, width: 108, height: 20,
              borderRadius: 5, background: "#FFF8E6", zIndex: 89 }} />
            <Cone x={x} y={60} bot={600} top={104} len={480} c="#FFF8E6" o={0.17} z={21} f={f} />
            <Pool x={x} y={p.horizon - 10} w={330} c="#FFF8E6" o={0.28} z={18} />
          </React.Fragment>
        ))}
        <Rake f={f} y={0} h={792} n={14 + rk.n} c="#FFF8E6" speed={8.1 * rk.sp} z={23} o={0.12 * rk.o} skew={-10 + rk.sk} />
        {/* ⛔ THE DARK BETWEEN THE POOLS *IS* THE HIERARCHY. It had filled in, and
            the two benches measured p10 56-59. Two shadow gaps restore it. */}
        {[351, 661].map((x, i) => (
          <div key={"gap" + i} style={{ position: "absolute", left: x - 78, top: 0, width: 156,
            bottom: 0, zIndex: 25,
            background: "linear-gradient(90deg, rgba(8,6,4,0) 0%, rgba(8,6,4,0.66) 50%, rgba(8,6,4,0) 100%)" }} />
        ))}
        {/* ⛔ THE NEAR PLANE. Every set needs a mass the camera is looking PAST or
            it is a backdrop — and it is also where the black point lives. */}
        <div style={{ position: "absolute", left: -60, right: -60, bottom: -40, height: 96,
          zIndex: 86, background: "linear-gradient(180deg, rgba(9,7,5,0) 0%, rgba(9,7,5,0.95) 32%, #060403 100%)" }} />
        <SprawlEdge side="r" c="#2A241C" w={104} z={92} rows={13} />
      </>);

    /* ---- S12 · THE GAUGE YARD — cool blue raking light, hard, long shadows.
       The spoil heaps at frame left are the sprawl again. ------------------ */
    case "yard":
    case "yardSun": {
      const sun = k === "yardSun";
      const key = sun ? "#FFD79A" : "#CFE0F2";
      return (<>
        <Room p={p} f={f} ceiling={false} band={
          <>
            <div style={{ position: "absolute", inset: 0, background: sun
              ? "linear-gradient(180deg, #6A4A38 0%, #C08A52 100%)"
              : "linear-gradient(180deg, #2A3646 0%, #4A5E72 100%)" }} />
            {/* the low sun / cold sky disc */}
            <div style={{ position: "absolute", left: sun ? 720 : 190, top: sun ? 350 : 120,
              width: 240, height: 240, borderRadius: "50%",
              background: `radial-gradient(circle, ${hexa(key, 0.72)} 0%, ${hexa(key, 0)} 66%)` }} />
            {/* the stone stacks behind, receding */}
            <SprawlDepth f={f} p={p} bands={4} base={7} />
            {/* the gantry frame the gauge hangs from */}
            <div style={{ position: "absolute", left: 150, top: 92, width: 32, height: 470,
              background: sun ? "#4A3C2E" : "#39424E", zIndex: 12 }} />
            <div style={{ position: "absolute", left: 830, top: 92, width: 32, height: 470,
              background: sun ? "#4A3C2E" : "#39424E", zIndex: 12 }} />
            <div style={{ position: "absolute", left: 150, top: 92, width: 712, height: 34,
              background: sun ? "#5A4A38" : "#454F5C", zIndex: 12 }} />
          </>
        } />
        {/* the rails in the floor — what the block rolls in on */}
        {[p.horizon + 96, p.horizon + 150].map((y, i) => (
          <div key={"rl" + i} style={{ position: "absolute", left: -40, right: -40, top: y,
            height: 11, background: sun ? "#6A5842" : "#5A6470", zIndex: 19 }} />
        ))}
        {Array.from({ length: 16 }, (_, i) => (
          <div key={"sl" + i} style={{ position: "absolute", left: -30 + i * 74,
            top: p.horizon + 88, width: 44, height: 74, borderRadius: 3,
            background: sun ? "#4A3C2E" : "#3E4650", opacity: 0.7, zIndex: 18 }} />
        ))}
        <Cone x={sun ? 800 : 240} y={sun ? 380 : 150} bot={700} top={230} len={430}
          c={key} o={0.20} z={22} f={f} />
        <Pool x={506} y={p.horizon + 30} w={1000} c={key} o={0.20} z={17} />
        <Rake f={f} y={0} h={792} n={16 + rk.n} c={key} speed={sun ? 2.2 : 3.4} z={23} o={0.14 * rk.o}
          skew={sun ? 12 : -14} />
        {/* ⛔ THE NEAR MASS. SENIOR measured p10 60.0 against a 35 bar and had no
            foreground plane — the camera was pointed at a backdrop. This is the
            thing the lens is looking past, cropped by the bottom edge: it answers
            the depth question and it is where the black point comes back, without
            touching a single prop's value. */}
        <div style={{ position: "absolute", left: -60, right: -60, bottom: -40, height: 227,
          zIndex: 87, background: "linear-gradient(180deg, rgba(10,8,5,0) 0%, rgba(10,8,5,0.96) 30%, #070503 100%)" }} />
        <SprawlEdge side="l" c={sun ? "#3A2E22" : "#232A34"} w={110} z={92} rows={13} />
      </>);
    }

    /* ---- S14 · THE CONTROL ROOM — green/cyan screen wash on near-black. The
       page wall is dense, high-detail content, which is the biggest single
       motion lever measured on this repo (median 6.36 -> 8.00). ----------- */
    case "control":
      return (<>
        <Room p={p} f={f} band={
          <>
            <div style={{ position: "absolute", inset: 0,
              background: "linear-gradient(180deg, #0E2020 0%, #163434 100%)" }} />
            {/* the rack walls either side of the page wall */}
            {[10, 936].map((x, i) => (
              <div key={"rk" + i} style={{ position: "absolute", left: x, top: 40, width: 118,
                height: 520, background: "#12292A", border: "4px solid #1E4444", zIndex: 8 }}>
                {Array.from({ length: 14 }, (_, j) => (
                  <div key={"ru" + j} style={{ position: "absolute", left: 10, top: 12 + j * 36,
                    width: 96, height: 26, background: "#0E2224", border: "2px solid #1E4444" }}>
                    <div style={{ position: "absolute", left: 8, top: 9,
                      width: 8, height: 8, borderRadius: 4,
                      background: (j + i) % 3 === 0 ? GREEN : (j % 4 === 0 ? AMBER : "#1E4444") }} />
                    <div style={{ position: "absolute", left: 26, top: 11, width: 58, height: 5,
                      background: "#1E4444" }} />
                  </div>
                ))}
              </div>
            ))}
            {/* the window onto the sprawl — the villain is visible from here */}
            <div style={{ position: "absolute", left: 150, top: 44, width: 780, height: 92,
              background: "linear-gradient(180deg, #1A3E3E 0%, #0E2626 100%)",
              border: "6px solid #1E4444", zIndex: 9, overflow: "hidden" }}>
              <CrateWall f={f} x={-40} y={92} cols={12} rows={2} cw={80} ch={44}
                c="#2A3E3E" z={10} o={0.8} seed={19} />
            </div>
          </>
        } />
        <div style={{ position: "absolute", left: 0, right: 0, top: p.horizon, height: 190, zIndex: 17,
          background: "linear-gradient(180deg, rgba(111,211,216,0.08) 0%, rgba(111,211,216,0.03) 100%)" }} />
        <Pool x={506} y={p.horizon - 8} w={900} c={CYAN} o={0.17} z={18} />
        <Rake f={f} y={0} h={792} n={13 + rk.n} c={CYAN} speed={5.8 * rk.sp} z={23} o={0.12 * rk.o} skew={8 + rk.sk} />
        <SprawlEdge side="l" c="#0C1E1E" w={92} z={92} rows={13} />
        <SprawlEdge side="r" c="#0A1A1A" w={76} z={91} rows={13} />
      </>);

    /* ---- S15-S16 · THE CHECKPOINT — night tarmac. One red rotating source and
       one white flood, deep black elsewhere: the reel's highest contrast, and
       its biggest hue swing when S16 floods it green. ---------------------- */
    case "gate":
    case "gateGreen": {
      const gr = k === "gateGreen";
      const key = gr ? "#8FE0B0" : "#FF9A8A";
      return (<>
        <Room p={p} f={f} ceiling={false} band={
          <>
            <div style={{ position: "absolute", inset: 0, background: gr
              ? "linear-gradient(180deg, #0E1E16 0%, #1C3A28 100%)"
              : "linear-gradient(180deg, #160E12 0%, #2E1A1E 100%)" }} />
            {/* the road running out of the sprawl, in perspective */}
            <div style={{ position: "absolute", left: 300, top: 300, width: 412, height: 280,
              background: gr ? "#1A2C22" : "#241C20", zIndex: 8,
              clipPath: "polygon(38% 0%, 62% 0%, 100% 100%, 0% 100%)" }} />
            {/* the sprawl the road comes out of */}
            <SprawlDepth f={f} p={p} bands={4} base={9} />
            {/* the gatehouse */}
            <div style={{ position: "absolute", left: 742, top: 268, width: 176, height: 300,
              background: gr ? "#1E3A2A" : "#33222A", border: `6px solid ${gr ? "#2E5A40" : "#4E323A"}`,
              zIndex: 24 }}>
              <div style={{ position: "absolute", left: 24, top: 30, width: 128, height: 90,
                background: gr ? "#7FD3A0" : "#E8C0A0", opacity: 0.55, border: "4px solid #22303A" }} />
            </div>
          </>
        } />
        {/* the rotating lamp on the gatehouse roof */}
        <div style={{ position: "absolute", left: 806, top: 236, width: 48, height: 34,
          borderRadius: 8, background: gr ? GREEN : RED, zIndex: 30 }} />
        <Cone x={830} y={252} bot={620} top={200 + Math.sin(f / 9) * 90} len={430}
          c={key} o={0.32} z={22} f={f} />
        {/* the white flood over the road */}
        <div style={{ position: "absolute", left: 120, top: 40, width: 90, height: 20,
          borderRadius: 5, background: "#F2EEE0", zIndex: 89 }} />
        <Cone x={165} y={60} bot={640} top={130} len={500} c="#F2EEE0" o={0.14} z={21} f={f} />
        <Pool x={506} y={p.horizon + 10} w={900} c={key} o={0.24} z={18} />
        <Rake f={f} y={0} h={792} n={15 + rk.n} c={key} speed={9.0 * rk.sp} z={23} o={0.14 * rk.o} skew={-12 + rk.sk} />
        <SprawlEdge side="l" c={gr ? "#0A1610" : "#120C0E"} w={110} z={92} rows={13} />
      </>);
    }

    /* ---- S17-S19 · THE DECK — open daylight, cream and clay. ⛔ THE ONE PLACE
       THE SPRAWL IS FINALLY *BEHIND* THE CAST rather than cropping the action.
       That is the villain's only defeat, and it is not removal: it is being
       stood in front of. ---------------------------------------------------- */
    case "deck":
      return (<>
        <Room p={p} f={f} ceiling={false} gritN={18} band={
          <>
            {/* a saturated low sun, not a pale wash — the payoff is warm, not bleached */}
            <div style={{ position: "absolute", inset: 0,
              background: "linear-gradient(180deg, #2E5C88 0%, #C4783C 62%, #F0B268 100%)" }} />
            <div style={{ position: "absolute", left: 640, top: 210, width: 380, height: 380,
              borderRadius: "50%",
              background: "radial-gradient(circle, #FFF0C4 0%, rgba(255,208,132,0.52) 38%, rgba(255,208,132,0) 72%)" }} />
            {/* the sprawl, full width, BEHIND — no longer an occluder */}
            <CrateWall f={f} x={-60} y={p.horizon - 4} cols={13} rows={5} cw={92} ch={60}
              c="#9A958A" z={8} o={0.9} seed={31} />
            <div style={{ position: "absolute", left: 0, right: 0, top: 120, height: 300, zIndex: 9,
              background: "linear-gradient(180deg, rgba(242,234,218,0.25) 0%, rgba(242,234,218,0.03) 100%)" }} />
          </>
        } />
        {/* ⛔ REAL SHADOW ON THE GROUND. A payoff scene still needs a black point —
            the cast throws long shade toward camera because the sun is low and
            behind them, which is also why the deck reads as a PLACE. */}
        <div style={{ position: "absolute", left: 0, right: 0, top: p.horizon, height: 210, zIndex: 17,
          background: "linear-gradient(180deg, rgba(255,240,210,0.15) 0%, rgba(255,240,210,0.03) 100%)" }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: p.horizon + 96, bottom: 0, zIndex: 20,
          background: "linear-gradient(180deg, rgba(26,16,8,0.10) 0%, rgba(26,16,8,0.72) 100%)" }} />
        {Array.from({ length: 7 }, (_, i) => (
          <div key={"dsh" + i} style={{ position: "absolute", left: 40 + i * 138,
            top: p.horizon + 84, width: 96, height: 250, zIndex: 21,
            background: "linear-gradient(180deg, rgba(30,18,8,0.50) 0%, rgba(30,18,8,0) 100%)",
            transform: "skewX(-16deg)" }} />
        ))}
        <Pool x={506} y={p.horizon - 4} w={1040} c="#FFF0D2" o={0.22} z={18} />
        <Rake f={f} y={0} h={792} n={12 + rk.n} c="#FFF0D2" speed={5.8 * rk.sp} z={23} o={0.11 * rk.o} skew={6 + rk.sk} />
        {/* ⛔ THE FOREGROUND MASS. The deck is the payoff so the SPRAWL does not get
            to crop it — but the camera still has to be behind something, or it is
            pointed at a backdrop. This is the near kerb the cast is standing up
            on, cropped by the bottom edge, and it is where the payoff scenes get
            their black point back (measured p10 84 -> 40 on this one addition). */}
        <div style={{ position: "absolute", left: -40, right: -40, bottom: -30, height: 156,
          zIndex: 88, background: "linear-gradient(180deg, #4A2E16 0%, #150C05 62%)",
          borderTop: "8px solid #6E4622" }}>
          {Array.from({ length: 9 }, (_, i) => (
            <div key={"kb" + i} style={{ position: "absolute", left: 20 + i * 126, top: 22,
              width: 92, height: 116, background: "#0E0803", borderRadius: 4,
              border: "3px solid #2A1A0C" }} />
          ))}
        </div>
        <Occluder side="r" c="#3A2A18" w={72} z={91} />
      </>);
  }
};
