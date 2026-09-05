import React from "react";
import { Img, staticFile } from "remotion";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D,
  Crew, Contact, Puff, Steam, Ring, Parts, Rig,
  CLAY, GOLD, GREEN, RED, INK, MUTE, BRASS, SLATE, IRON, CHROME, BONE, CONCRETE, OXIDE,
  REPOS, GY, mono, ui,
} from "./RpsWorld";
import type { Place, Repo, Kit } from "./RpsWorld";
import { Octicon, RepoCard } from "./RpsProps";

/* ===========================================================================
   REEL 137 · "REPOS" — THE SETS.  Board: storyboards/137-repos.md.

   ⛔⛔ EVERY SCENE IS A REAL PLACE. `HwSets.Room` lays the seven planes (wall,
   bands, floor, lip, grit, rake, overhead). What makes it THE SHOP rather than
   a gradient is here: brick courses, a pegboard of DRAWN tools, a roller door,
   a hazard band, a bay lamp, tyre stacks and a toolbox cropped by the edge, a
   scissor lift whose SCISSORS OPEN, chain hoists with real hooks.

   ⛔ DETAIL AND CONTRAST ARE DIFFERENT DIALS (feedback_rooms_need_an_architecture_layer):
   everything on the wall sits inside a narrow band around the wall's own value,
   so the props and the sprites keep every hard edge in the frame. The hazard
   band and the bay lamp are the only saturated things a set contributes.

   ⛔ GREY + RECTANGULAR IS THE NAMED BORING COMBINATION. Iron here is warm
   (`IRON` #5A6068 against oatmeal and brick), tyres are near-black rubber with
   tread, the toolbox is clay red, chrome is drawn with a conic highlight.
   ========================================================================= */

/* ---- brick courses + pegboard + roller door + hazard band ---------------- */
const Tool: React.FC<{ kind: number; c: string; s?: number }> = ({ kind, c, s = 1 }) => {
  const k = kind % 6;
  const w = 26 * s, h = 92 * s;
  return (
    <svg width={w} height={h} viewBox="0 0 26 92" style={{ display: "block" }}>
      {k === 0 && (<>{/* open-end spanner */}
        <rect x="9" y="14" width="8" height="66" rx="3" fill={c} />
        <path d="M2 4 L24 4 L24 14 L18 14 L18 20 L8 20 L8 14 L2 14 Z" fill={c} />
        <path d="M4 88 L22 88 L22 78 L16 78 L16 72 L10 72 L10 78 L4 78 Z" fill={c} /></>)}
      {k === 1 && (<>{/* claw hammer */}
        <rect x="10" y="20" width="6" height="70" rx="2" fill={mxh(c, -0.2)} />
        <path d="M2 8 L24 8 L24 22 L18 22 L14 30 L10 22 L2 22 Z" fill={c} />
        <rect x="2" y="8" width="22" height="6" fill={dkh(c, 0.2)} /></>)}
      {k === 2 && (<>{/* screwdriver */}
        <rect x="8" y="2" width="10" height="34" rx="5" fill={CLAY} />
        <rect x="11" y="36" width="4" height="50" fill={c} />
        <rect x="9" y="84" width="8" height="6" fill={c} /></>)}
      {k === 3 && (<>{/* adjustable wrench */}
        <rect x="10" y="26" width="7" height="62" rx="3" fill={c} />
        <path d="M3 6 L20 6 L20 14 L13 14 L13 26 L6 26 L6 14 L3 14 Z" fill={c} />
        <rect x="16" y="10" width="7" height="12" fill={dkh(c, 0.2)} /></>)}
      {k === 4 && (<>{/* pliers */}
        <path d="M8 6 L13 26 L18 6 Z" fill={c} />
        <rect x="6" y="26" width="6" height="60" rx="3" fill={RED} transform="rotate(-6 9 56)" />
        <rect x="14" y="26" width="6" height="60" rx="3" fill={RED} transform="rotate(6 17 56)" /></>)}
      {k === 5 && (<>{/* socket ratchet */}
        <rect x="9" y="22" width="8" height="66" rx="3" fill={c} />
        <circle cx="13" cy="14" r="10" fill={c} />
        <circle cx="13" cy="14" r="4" fill={dkh(c, 0.4)} /></>)}
    </svg>
  );
};

export const ShopWall: React.FC<{ p: Place; f: number; seed?: number; bay?: Repo | null; z?: number;
  door?: boolean; pegX?: number; pegW?: number; lift?: number }> =
  ({ p, f, seed = 0, bay = null, z = 18, door = true, pegX = 560, pegW = 400, lift = 1 }) => {
  const hz = p.horizon;
  const rows = 9, rowH = (hz - 40) / rows;
  const beamY = 74;
  const doorX = 40, doorW = 340, doorTop = beamY + 30;
  const pegTop = beamY + 56, pegH = hz - pegTop - 70;
  const tools = 7 + (seed % 3);
  return (<>
    {/* the steel beam that carries the gantry — a garage has one */}
    <div style={{ position: "absolute", left: -20, top: beamY, width: W + 40, height: 22, zIndex: z,
      background: `linear-gradient(180deg, ${mxh(IRON, 0.18)} 0%, ${IRON} 40%, ${dkh(IRON, 0.36)} 100%)` }} />
    <div style={{ position: "absolute", left: -20, top: beamY + 22, width: W + 40, height: 8, zIndex: z,
      background: hexa("#000000", 0.26) }} />
    {/* brick courses on the upper wall — each course its own value so the wall has grain */}
    {Array.from({ length: rows }, (_, r) => {
      const y = 100 + r * rowH;
      const tone = 0.06 + rnd(seed + 3, r) * 0.10;
      return (
        <div key={"row" + r} style={{ position: "absolute", left: -20, top: y, width: W + 40, height: rowH - 4,
          zIndex: z, opacity: 0.9,
          background: `repeating-linear-gradient(90deg, ${dkh(p.back, tone)} 0 ${118 + (r % 2) * 9}px, ${hexa("#000000", 0.16)} ${118 + (r % 2) * 9}px ${124 + (r % 2) * 9}px)`,
          backgroundPositionX: r % 2 ? 60 : 0, borderBottom: `4px solid ${hexa("#000000", 0.14)}` }} />
      );
    })}
    {/* the roller door at the left — slats, a window band, a cold daylight glow at its foot */}
    {door && (<>
      <div style={{ position: "absolute", left: doorX - 14, top: doorTop - 14, width: doorW + 28,
        height: hz - doorTop + 14, zIndex: z + 1, background: dkh(p.lip, -0.02), borderRadius: 6 }} />
      <div style={{ position: "absolute", left: doorX, top: doorTop, width: doorW, height: hz - doorTop,
        zIndex: z + 2, overflow: "hidden",
        background: `repeating-linear-gradient(180deg, ${mxh(SLATE, 0.46)} 0 22px, ${mxh(SLATE, 0.24)} 22px 30px, ${dkh(SLATE, 0.14)} 30px 34px)` }}>
        <div style={{ position: "absolute", left: 24, top: 96, width: doorW - 48, height: 46,
          background: `linear-gradient(90deg, ${mxh(p.key, 0.3)} 0%, ${mxh(p.key, 0.6)} 50%, ${mxh(p.key, 0.3)} 100%)`,
          borderRadius: 3, opacity: 0.9 * lift }} />
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{ position: "absolute", left: 24 + i * ((doorW - 48) / 4), top: 96, width: 6,
            height: 46, background: dkh(SLATE, 0.5) }} />
        ))}
      </div>
      {/* daylight leaking under the door onto the floor */}
      <div style={{ position: "absolute", left: doorX - 30, top: hz - 6, width: doorW + 60, height: 120,
        zIndex: z + 3, opacity: 0.30 * lift, transform: "skewX(-18deg)",
        background: `linear-gradient(180deg, ${hexa(p.key, 0.7)} 0%, ${hexa(p.key, 0)} 100%)` }} />
    </>)}
    {/* the pegboard: a frame, a hole grid, and DRAWN tools hung in a row */}
    <div style={{ position: "absolute", left: pegX - 12, top: pegTop - 12, width: pegW + 24, height: pegH + 24,
      zIndex: z + 1, borderRadius: 8, background: dkh(OXIDE, 0.34) }} />
    <div style={{ position: "absolute", left: pegX, top: pegTop, width: pegW, height: pegH, zIndex: z + 2,
      borderRadius: 4, background: mxh(p.back, 0.08),
      backgroundImage: `radial-gradient(circle, ${hexa("#000000", 0.30)} 2.2px, transparent 3px)`,
      backgroundSize: "26px 26px" }} />
    {Array.from({ length: tools }, (_, i) => (
      <div key={"tl" + i} style={{ position: "absolute", left: pegX + 22 + i * ((pegW - 44) / tools),
        top: pegTop + 22 + (i % 2) * 14, zIndex: z + 3,
        transform: `rotate(${(rnd(seed, i) - 0.5) * 8}deg)`, filter: `drop-shadow(0 4px 3px ${hexa("#000000", 0.35)})` }}>
        <Tool kind={(i + seed) % 6} c={i % 3 === 0 ? CHROME : mxh(IRON, 0.32)} s={1.1} />
      </div>
    ))}
    {/* a shelf under the pegboard with cans and a rag */}
    <div style={{ position: "absolute", left: pegX - 8, top: pegTop + pegH + 20, width: pegW + 16, height: 12,
      zIndex: z + 3, background: `linear-gradient(180deg, ${mxh(OXIDE, 0.16)}, ${dkh(OXIDE, 0.34)})`, borderRadius: 2 }} />
    {[0, 1, 2, 3, 4].map((i) => (
      <div key={"cn" + i} style={{ position: "absolute", left: pegX + 20 + i * 66, top: pegTop + pegH - 26,
        width: 34 + (i % 2) * 10, height: 46, zIndex: z + 3, borderRadius: 4,
        background: `linear-gradient(90deg, ${dkh(mxh([CLAY, GOLD, GREEN, SLATE, BONE][i], 0.22), 0.2)}, ${mxh([CLAY, GOLD, GREEN, SLATE, BONE][i], 0.22)} 40%, ${dkh(mxh([CLAY, GOLD, GREEN, SLATE, BONE][i], 0.22), 0.34)})`,
        border: `2px solid ${hexa("#000000", 0.35)}` }}>
        <div style={{ position: "absolute", left: 4, top: 14, right: 4, height: 12, background: hexa("#F6F1E6", 0.85) }} />
      </div>
    ))}
    {/* the bay lamp: a caged industrial lamp with the repo's colour in its lens */}
    {bay && <BayLamp x={pegX + pegW / 2} y={pegTop - 28} c={bay.c} on={1} f={f} z={z + 4} label={bay.tagName} />}
    {/* the hazard band along the floor lip — the one saturated line a set contributes */}
    <div style={{ position: "absolute", left: -20, top: hz - 2, width: W + 40, height: 16, zIndex: z + 4,
      background: `repeating-linear-gradient(-45deg, ${GOLD} 0 22px, ${INK} 22px 44px)`, opacity: 0.92 }} />
    {/* conduit along the beam, and a wall clock */}
    <div style={{ position: "absolute", left: -20, top: beamY - 10, width: W + 40, height: 6, zIndex: z,
      background: dkh(SLATE, 0.3), borderRadius: 3 }} />
    <div style={{ position: "absolute", left: pegX + pegW + 26, top: beamY + 48, width: 56, height: 56,
      zIndex: z + 3, borderRadius: "50%", background: "#F4EEDC", border: `5px solid ${dkh(SLATE, 0.3)}`,
      boxShadow: SH }}>
      <div style={{ position: "absolute", left: 25, top: 8, width: 3, height: 20, background: INK,
        transformOrigin: "50% 100%", transform: `rotate(${(f / 30) * 6 + seed * 40}deg)` }} />
      <div style={{ position: "absolute", left: 25, top: 14, width: 3, height: 14, background: INK,
        transformOrigin: "50% 100%", transform: `rotate(${seed * 97 + 40}deg)` }} />
    </div>
  </>);
};

/** an industrial cage lamp on the wall. The lens takes the bay colour; `on`
    snaps it and throws a matte cone below. */
export const BayLamp: React.FC<{ x: number; y: number; c: string; on: number; f: number; z?: number;
  label?: string; s?: number }> = ({ x, y, c, on, f, z = 40, label, s = 1 }) => {
  const k = Math.max(0, Math.min(1, on));
  return (<>
    {/* the cone it throws, shaped, never a full-frame fill */}
    {k > 0.02 && (
      <div style={{ position: "absolute", left: x - 170 * s, top: y + 20 * s, width: 340 * s, height: 420 * s,
        zIndex: z - 1, opacity: 0.22 * k,
        background: `linear-gradient(180deg, ${hexa(c, 0.9)} 0%, ${hexa(c, 0)} 100%)`,
        clipPath: "polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)" }} />
    )}
    <div style={{ position: "absolute", left: x - 34 * s, top: y - 8 * s, width: 68 * s, height: 16 * s,
      zIndex: z, borderRadius: 4 * s, background: `linear-gradient(180deg, ${mxh(IRON, 0.2)}, ${dkh(IRON, 0.3)})` }} />
    <div style={{ position: "absolute", left: x - 26 * s, top: y + 6 * s, width: 52 * s, height: 44 * s,
      zIndex: z, borderRadius: `4px 4px ${22 * s}px ${22 * s}px`,
      background: k > 0.5 ? `radial-gradient(circle at 50% 40%, ${mxh(c, 0.55)} 0%, ${c} 55%, ${dkh(c, 0.3)} 100%)` : dkh(c, 0.62),
      border: `${3 * s}px solid ${dkh(IRON, 0.3)}` }}>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ position: "absolute", left: 0, right: 0, top: 8 * s + i * 11 * s, height: 3 * s,
          background: dkh(IRON, 0.3) }} />
      ))}
    </div>
    {label && (
      <div style={{ position: "absolute", left: x - 90 * s, top: y + 58 * s, width: 180 * s, textAlign: "center",
        zIndex: z, ...mono(15 * s, 800), letterSpacing: "0.14em", color: hexa("#F6F1E6", 0.55 + 0.45 * k) }}>
        {label.toUpperCase()}
      </div>
    )}
  </>);
};

/* ---- the near-edge masses: tyres, a toolbox, a drum, a bench ------------- */
export const TyreStack: React.FC<{ x: number; n?: number; s?: number; z?: number; bottom?: number }> =
  ({ x, n = 3, s = 1, z = 90, bottom = H + 30 }) => (
  <>{Array.from({ length: n }, (_, i) => {
    const w = 236 * s, h = 92 * s;
    const y = bottom - (i + 1) * (h - 8 * s);
    return (
      <div key={"ty" + i} style={{ position: "absolute", left: x - w / 2 + (rnd(i, 5) - 0.5) * 22 * s, top: y,
        width: w, height: h, zIndex: z + i, borderRadius: w / 2 + "px / " + h / 2 + "px",
        background: `linear-gradient(180deg, #3A3733 0%, #22201D 45%, #14120F 100%)`,
        boxShadow: SH_D, overflow: "hidden" }}>
        {/* tread */}
        <div style={{ position: "absolute", inset: `0 ${w * 0.16}px`, opacity: 0.55,
          background: `repeating-linear-gradient(90deg, transparent 0 14px, ${hexa("#000000", 0.6)} 14px 20px)` }} />
        {/* the sidewall lettering ring and the hub */}
        <div style={{ position: "absolute", left: w * 0.30, top: h * 0.18, width: w * 0.40, height: h * 0.64,
          borderRadius: "50%", border: `${4 * s}px solid ${hexa("#F6F1E6", 0.10)}` }} />
        <div style={{ position: "absolute", left: w * 0.40, top: h * 0.30, width: w * 0.20, height: h * 0.40,
          borderRadius: "50%", background: `radial-gradient(circle, ${CHROME} 0%, ${dkh(CHROME, 0.4)} 70%)` }} />
      </div>
    );
  })}</>
);

export const Toolbox: React.FC<{ x: number; y: number; s?: number; z?: number; c?: string }> =
  ({ x, y, s = 1, z = 46, c = "#B8402E" }) => {
  const w = 220 * s, h = 250 * s;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - h, width: w, height: h, zIndex: z }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: w, height: h - 22 * s, borderRadius: 8 * s,
        background: `linear-gradient(90deg, ${dkh(c, 0.26)} 0%, ${c} 30%, ${mxh(c, 0.08)} 55%, ${dkh(c, 0.3)} 100%)`,
        boxShadow: SH_D, border: `${3 * s}px solid ${dkh(c, 0.5)}` }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} style={{ position: "absolute", left: 10 * s, right: 10 * s, top: (14 + i * 44) * s, height: 36 * s,
            borderRadius: 4 * s, background: `linear-gradient(180deg, ${mxh(c, 0.06)}, ${dkh(c, 0.22)})`,
            border: `${2 * s}px solid ${dkh(c, 0.42)}` }}>
            <div style={{ position: "absolute", left: "30%", right: "30%", top: 13 * s, height: 8 * s, borderRadius: 4 * s,
              background: `linear-gradient(180deg, ${CHROME}, ${dkh(CHROME, 0.4)})` }} />
          </div>
        ))}
        <div style={{ position: "absolute", left: 0, top: -12 * s, width: w, height: 16 * s, borderRadius: 4 * s,
          background: `linear-gradient(180deg, ${mxh(CHROME, 0.2)}, ${dkh(CHROME, 0.35)})` }} />
      </div>
      {[0.2, 0.8].map((k, i) => (
        <div key={i} style={{ position: "absolute", left: w * k - 16 * s, top: h - 30 * s, width: 32 * s, height: 32 * s,
          borderRadius: "50%", background: `radial-gradient(circle, ${dkh(CHROME, 0.3)} 0 30%, #22201D 32%)` }} />
      ))}
    </div>
  );
};

export const Drum: React.FC<{ x: number; y: number; s?: number; z?: number; c?: string }> =
  ({ x, y, s = 1, z = 44, c = "#3E5A84" }) => {
  const w = 150 * s, h = 210 * s;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - h, width: w, height: h, zIndex: z,
      borderRadius: `${w / 2}px ${w / 2}px ${w / 5}px ${w / 5}px / 22px 22px 14px 14px`, boxShadow: SH_D,
      background: `linear-gradient(90deg, ${dkh(c, 0.34)} 0%, ${c} 34%, ${mxh(c, 0.14)} 52%, ${dkh(c, 0.3)} 100%)`,
      border: `${3 * s}px solid ${dkh(c, 0.5)}` }}>
      {[0.28, 0.58].map((k, i) => (
        <div key={i} style={{ position: "absolute", left: -4 * s, right: -4 * s, top: h * k, height: 12 * s,
          borderRadius: 6 * s, background: `linear-gradient(180deg, ${mxh(c, 0.24)}, ${dkh(c, 0.3)})` }} />
      ))}
      <div style={{ position: "absolute", left: w * 0.24, top: h * 0.36, width: w * 0.52, height: h * 0.16,
        background: "#F4EEDC", borderRadius: 3, opacity: 0.9 }}>
        <div style={{ position: "absolute", left: "12%", right: "12%", top: "30%", height: "16%", background: hexa(INK, 0.6) }} />
        <div style={{ position: "absolute", left: "12%", right: "40%", top: "60%", height: "12%", background: hexa(INK, 0.35) }} />
      </div>
    </div>
  );
};

/** a steel workbench: a slab top, a lower shelf, two trestle legs */
export const Bench: React.FC<{ x: number; y: number; w?: number; s?: number; z?: number }> =
  ({ x, y, w = 560, s = 1, z = 30 }) => {
  const topH = 22 * s, legH = 150 * s;
  return (<>
    <div style={{ position: "absolute", left: x - w / 2, top: y - legH - topH, width: w, height: topH, zIndex: z + 2,
      borderRadius: 4, boxShadow: SH_D,
      background: `linear-gradient(180deg, ${mxh("#7A5A3C", 0.28)} 0%, #7A5A3C 40%, ${dkh("#7A5A3C", 0.3)} 100%)` }} />
    {[x - w / 2 + 30 * s, x + w / 2 - 54 * s].map((lx, i) => (
      <div key={i} style={{ position: "absolute", left: lx, top: y - legH, width: 24 * s, height: legH, zIndex: z,
        background: `linear-gradient(90deg, ${dkh(IRON, 0.1)}, ${dkh(IRON, 0.42)})` }} />
    ))}
    <div style={{ position: "absolute", left: x - w / 2 + 24 * s, top: y - legH * 0.42, width: w - 48 * s, height: 10 * s,
      zIndex: z, background: dkh(IRON, 0.3) }} />
  </>);
};

/* =========================================================================
   THE LIFT — a scissor lift whose SCISSORS OPEN. The mechanism is drawn so
   the rise is the OUTPUT of something (§12: a float is not a lift): the ram
   extends, the arms pivot open, the platform comes up, and on `jolt` the
   whole thing shudders and drops back before it goes.
   ====================================================================== */
export const Lift: React.FC<{ x: number; y: number; rise: number; f: number; w?: number; z?: number;
  jolt?: number; steamAt?: number }> =
  ({ x, y, rise, f, w = 420, z = 40, jolt = 0, steamAt = -1 }) => {
  const baseH = 18, platH = 26;
  const r = Math.max(6, rise) + jolt;
  const L = 200;                                  /* arm length, px */
  const half = Math.min(L * 0.98, r / 2);
  const ang = (Math.asin(half / L) * 180) / Math.PI;
  const armW = Math.sqrt(L * L - half * half) * 2;
  const platY = y - baseH - r - platH;
  const arm = (cx: number, cy: number, a: number, key: string) => (
    <div key={key} style={{ position: "absolute", left: cx - L, top: cy - 8, width: L * 2, height: 16, zIndex: z + 1,
      borderRadius: 8, transformOrigin: "50% 50%", transform: `rotate(${a}deg)`,
      background: `linear-gradient(180deg, ${mxh(IRON, 0.22)}, ${IRON} 50%, ${dkh(IRON, 0.36)})`,
      border: `2px solid ${dkh(IRON, 0.5)}` }} />
  );
  const midY = y - baseH - r / 2;
  return (<>
    {/* base plate */}
    <div style={{ position: "absolute", left: x - w / 2, top: y - baseH, width: w, height: baseH, zIndex: z,
      borderRadius: 4, background: `linear-gradient(180deg, ${mxh(IRON, 0.1)}, ${dkh(IRON, 0.4)})`, boxShadow: SH }} />
    {/* two scissor pairs, left and right */}
    {[-1, 1].map((side) => (
      <React.Fragment key={"sc" + side}>
        {arm(x + side * (w * 0.24), midY, ang, "a" + side)}
        {arm(x + side * (w * 0.24), midY, -ang, "b" + side)}
        <div style={{ position: "absolute", left: x + side * (w * 0.24) - 11, top: midY - 11, width: 22, height: 22,
          zIndex: z + 2, borderRadius: "50%", background: `radial-gradient(circle, ${CHROME}, ${dkh(CHROME, 0.5)})` }} />
      </React.Fragment>
    ))}
    {/* the hydraulic ram, extending */}
    <div style={{ position: "absolute", left: x - 12, top: y - baseH - r, width: 24, height: r, zIndex: z,
      background: `linear-gradient(90deg, ${dkh(CHROME, 0.3)}, ${CHROME} 50%, ${dkh(CHROME, 0.4)})`, borderRadius: 3 }} />
    <div style={{ position: "absolute", left: x - 20, top: y - baseH - Math.min(r, 70), width: 40, height: Math.min(r, 70), zIndex: z + 1,
      background: `linear-gradient(90deg, ${dkh(IRON, 0.2)}, ${mxh(IRON, 0.1)} 50%, ${dkh(IRON, 0.4)})`, borderRadius: 4 }} />
    {/* the platform, hazard striped, with a toe rail */}
    <div style={{ position: "absolute", left: x - w / 2 - 10, top: platY, width: w + 20, height: platH, zIndex: z + 3,
      borderRadius: 4, boxShadow: SH_D,
      background: `linear-gradient(180deg, ${mxh(IRON, 0.16)} 0%, ${IRON} 55%, ${dkh(IRON, 0.36)} 100%)` }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 4, height: 8,
        background: `repeating-linear-gradient(-45deg, ${GOLD} 0 16px, ${INK} 16px 32px)`, opacity: 0.9 }} />
    </div>
    {steamAt >= 0 && <Steam x={x} y={y - baseH - 20} f={f} at={steamAt} n={6} z={z + 4} s={0.9} c="#E6E1D6" />}
  </>);
};

/* =========================================================================
   THE HOIST — a chain from the gantry, a drawn J-hook, and a PART hanging
   under it with its TAG. `len` is chain length in px, `swing` degrees.
   ====================================================================== */
export const Chain: React.FC<{ x: number; top: number; len: number; z?: number; swing?: number; w?: number }> =
  ({ x, top, len, z = 60, swing = 0, w = 12 }) => (
  <div style={{ position: "absolute", left: x - w / 2, top, width: w, height: len, zIndex: z,
    transformOrigin: "50% 0%", transform: `rotate(${swing}deg)`,
    background: `repeating-linear-gradient(180deg, ${mxh(IRON, 0.28)} 0 8px, ${dkh(IRON, 0.36)} 8px 14px, ${hexa("#000000", 0)} 14px 17px)`,
    borderLeft: `2px solid ${dkh(IRON, 0.5)}`, borderRight: `2px solid ${dkh(IRON, 0.5)}` }} />
);

export const Hook: React.FC<{ x: number; y: number; s?: number; z?: number; swing?: number }> =
  ({ x, y, s = 1, z = 61, swing = 0 }) => (
  <svg width={44 * s} height={58 * s} viewBox="0 0 44 58"
    style={{ position: "absolute", left: x - 22 * s, top: y, zIndex: z, transformOrigin: "50% 0%", transform: `rotate(${swing}deg)` }}>
    <rect x="16" y="0" width="12" height="16" rx="3" fill={dkh(IRON, 0.2)} />
    <path d="M22 14 C22 30 6 30 6 42 C6 52 16 56 24 54 C30 52 34 46 32 40"
      fill="none" stroke={CHROME} strokeWidth="8" strokeLinecap="round" />
    <path d="M22 14 C22 30 6 30 6 42 C6 52 16 56 24 54 C30 52 34 46 32 40"
      fill="none" stroke={dkh(CHROME, 0.45)} strokeWidth="3" strokeLinecap="round" transform="translate(2 1)" />
  </svg>
);

/** the name tag on a hoist ring: the mark on a tile, the name, the stars, the
    licence. `face` 0..1 turns it toward camera — the front face is CLAMPED so
    it never passes through edge-on (feedback_never_let_a_face_pass_through_edge_on). */
export const Tag: React.FC<{ repo: Repo; x: number; y: number; f: number; s?: number; z?: number;
  swing?: number; face?: number; lit?: number; count?: number }> =
  ({ repo, x, y, f, s = 1, z = 66, swing = 0, face = 1, lit = 1, count = 1 }) => {
  /* ⭐ the star count MOVES to its value (feedback_graphical_over_textual); eased once, by the caller */
  const shown = Math.round(repo.stars * Math.max(0, Math.min(1, count))).toLocaleString("en-US");
  const WD = 262 * s, HT = 118 * s;
  const sx = 0.46 + 0.54 * Math.max(0, Math.min(1, face));
  return (
    <div style={{ position: "absolute", left: x - WD / 2, top: y, width: WD, height: HT + 18 * s, zIndex: z,
      transformOrigin: "50% 0%", transform: `rotate(${swing}deg)` }}>
      {/* the string and the grommet */}
      <div style={{ position: "absolute", left: WD / 2 - 2 * s, top: 0, width: 4 * s, height: 18 * s, background: dkh(BRASS, 0.3) }} />
      <div style={{ position: "absolute", left: 0, top: 18 * s, width: WD, height: HT, borderRadius: 10 * s,
        transform: `scaleX(${sx})`, transformOrigin: "50% 50%", boxShadow: SH_D,
        background: `linear-gradient(168deg, ${BONE} 0%, #D9D0B8 100%)`,
        border: `${4 * s}px solid ${dkh(repo.c2, 0.1)}`, display: "flex", alignItems: "center",
        gap: 10 * s, padding: `0 ${12 * s}px`, opacity: 0.72 + 0.28 * lit }}>
        <div style={{ width: 66 * s, height: 66 * s, borderRadius: 14 * s, background: repo.markBg, flexShrink: 0,
          border: `${2 * s}px solid #E3D8C2`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Img src={staticFile("logos/" + repo.mark)} style={{ width: 50 * s, height: 50 * s, objectFit: "contain" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 3 * s, minWidth: 0 }}>
          <div style={{ ...ui(24 * s, 900), color: INK, letterSpacing: "-0.01em", whiteSpace: "nowrap", overflow: "hidden" }}>{repo.tagName}</div>
          <div style={{ ...mono(20 * s, 800), color: dkh(repo.c2, 0.06), whiteSpace: "nowrap" }}>★ {shown}</div>
          <div style={{ ...mono(12 * s, 800), color: hexa(INK, 0.55), letterSpacing: "0.12em", whiteSpace: "nowrap" }}>{repo.tagSub}</div>
        </div>
        <div style={{ position: "absolute", right: 8 * s, top: 8 * s, width: 22 * s, height: 22 * s, borderRadius: 5 * s,
          background: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Img src={staticFile("logos/github.svg")} style={{ width: 16 * s, height: 16 * s }} />
        </div>
      </div>
    </div>
  );
};

/** a part hanging on its own: the same drawing as the rig's, in a box, so a
    hanging INTAKE and the worn INTAKE are the identical object. */
export const HangPart: React.FC<{ repo: Repo; x: number; y: number; size?: number; z?: number; f: number;
  swing?: number; k?: number }> = ({ repo, x, y, size = 230, z = 62, f, swing = 0, k = 1 }) => {
  const u = size / 200;
  /* where each part sits in the rig box, so the hook can hang from its top */
  /* box offset so each part's TOP hangs just under the hook end: the HUD boom
     starts at -46u and the dome at -20u in rig space, so both need negative y */
  const off = { INTAKE: { x: 0, y: 96 }, HUD: { x: -200, y: -54 }, CORE: { x: -100, y: -30 }, TANK: { x: -160, y: 40 } }[repo.part];
  const kit: Kit = { [repo.part.toLowerCase()]: k, coreLit: 1, gauge: 0.9, hudOn: 1 } as Kit;
  return (
    <div style={{ position: "absolute", left: x + off.x * u, top: y - off.y * u, width: size, height: size, zIndex: z,
      transformOrigin: `${-off.x * u}px ${off.y * u}px`, transform: `rotate(${swing}deg)` }}>
      <Parts u={u} kit={kit} f={f} />
    </div>
  );
};

/** the whole hoist: chain, hook, the part, the tag beside it */
export const Hoist: React.FC<{ repo: Repo; x: number; len: number; f: number; z?: number; swing?: number;
  partSize?: number; tag?: boolean; tagFace?: number; tagLit?: number; partK?: number; hidePart?: boolean;
  card?: boolean; cardW?: number; install?: number; count?: number }> =
  ({ repo, x, len, f, z = 60, swing = 0, partSize = 200, tag = true, tagFace = 1, tagLit = 0.6, partK = 1,
     hidePart = false, card = false, cardW = 268, install = 0, count = 1 }) => {
  const rad = (swing * Math.PI) / 180;
  const ex = x + Math.sin(rad) * len, ey = Math.cos(rad) * len;
  return (<>
    <Chain x={x} top={0} len={len} z={z} swing={swing} />
    <Hook x={ex} y={ey} z={z + 1} swing={swing * 0.6} />
    {/* ⭐ what hangs on the chain is the REPO, not an anonymous part: the sentence
        says "four open source GitHub repos", so that is what descends. The part is
        what it BECOMES on arrival (feedback_illustrate_the_sentence_not_the_set). */}
    {!hidePart && (card
      ? <RepoCard repo={repo} x={ex} y={ey + 26} w={cardW} z={z + 2} f={f} count={count} install={install}
          rot={swing * 0.5} />
      : <HangPart repo={repo} x={ex} y={ey + 50} size={partSize} z={z + 2} f={f} swing={swing * 0.5} k={partK} />)}
    {tag && <Tag repo={repo} x={ex + 120} y={ey + 30} f={f} s={0.62} z={z + 3} swing={swing * 0.8 + Math.sin(f / 9) * 2}
      face={tagFace} lit={tagLit} />}
  </>);
};

/* =========================================================================
   THE CREW BAND — the near-camera crowd cropped by the bottom edge
   (feedback_the_crowd_is_a_near_band), tinted per bay, on TRAVELLING loops
   (PACE / HOP — a WORK lean repaints nothing, feedback_a_sway_is_not_motion).
   Slots, not a mark: pitch >= 0.85 x size (feedback_crowd_needs_slots_not_a_mark).
   ====================================================================== */
export const CrewBand: React.FC<{ f: number; repo: Repo; n?: number; size?: number; y?: number; z?: number;
  seed?: number; x0?: number; x1?: number; at?: number; cheer?: number; opacity?: number }> =
  ({ f, repo, n = 5, size = 190, y = H + 64, z = 84, seed = 0, x0 = 40, x1 = W - 40, at = -30, cheer = 0, opacity = 1 }) => {
  const pitch = Math.max(size * 0.9, (x1 - x0) / n);
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: z, opacity }}>
      {Array.from({ length: n }, (_, i) => {
        const x = x0 + pitch * (i + 0.5) + (rnd(seed, i) - 0.5) * 30;
        const loop = i % 2 === 0 ? 0 : 2;
        return (
          <Crew key={"cb" + i} f={f} x={x} y={y - (i % 2) * 14} i={repo.cos[i % repo.cos.length] + i * 3}
            size={size - (i % 3) * 10} z={z + (i % 2)} at={at + i * 3} loop={loop} tint={repo.c}
            flip={i % 2 === 1} cheer={cheer} />
        );
      })}
    </div>
  );
};

/** a shaped column of light from the gantry to the floor — matte, a cone */
export const LightColumn: React.FC<{ x: number; on: number; w?: number; c?: string; z?: number; top?: number }> =
  ({ x, on, w = 300, c = "#FFE7A8", z = 22, top = 60 }) => on <= 0.01 ? null : (
  <div style={{ position: "absolute", left: x - w, top, width: w * 2, height: H - top, zIndex: z, opacity: 0.34 * on,
    background: `linear-gradient(180deg, ${hexa(c, 0.9)} 0%, ${hexa(c, 0.25)} 70%, ${hexa(c, 0)} 100%)`,
    clipPath: `polygon(${50 - 8 * on}% 0%, ${50 + 8 * on}% 0%, 100% 100%, 0% 100%)` }} />
);

/* =========================================================================
   ⭐⭐ THE GITHUB FITOUT — the layer that makes the SHOP a GitHub shop.

   ⛔ The note (Alex, 2026-09-05): *"more on brand ... github themed ig moreso
   and more detailed."* The garage was a good stage for UPGRADE and said GitHub
   nowhere. One component, drawn in EVERY room, taking its whole palette from
   that room's own `Place` — the pattern that worked on reel 132
   ([[feedback_rooms_need_an_architecture_layer]]), where the same move paid for
   itself in motion because built walls parallax and flat gradients do not.

   ⛔ DETAIL AND CONTRAST ARE DIFFERENT DIALS: everything here sits in a narrow
   value band around the wall's own value, so the props and the sprites keep
   every hard edge and every hot colour in the frame. `lift` is the only knob.
   The contribution cells are the one exception and they are capped at 0.42.

   ⛔ AND EVERY ROOM MUST NOT BE ONE ROOM REPAINTED: `seed` drives the
   ARCHITECTURE (graph width, which glyphs, whether the branch forks up or down,
   the rail's height), not a hue.
   ====================================================================== */
export const GhFitout: React.FC<{ p: Place; f: number; seed?: number; z?: number; lift?: number;
  graphX?: number; graphY?: number; cols?: number; rail?: boolean }> =
  ({ p, f, seed = 0, z = 16, lift = 1, graphX = 96, graphY = 214, cols = 0, rail = true }) => {
  const wall = p.back;
  /* the four contribution steps, built OUT of the wall's own value so a dim room
     stays dim — GitHub's ramp in shape, this room's ramp in value */
  const step = [mxh(wall, 0.10), mxh(wall, 0.20), mxh(wall, 0.33), mxh(wall, 0.46)];
  const hot = "#3FA45B";                                   /* the one real green, used sparingly */
  const N = cols || (13 + (seed % 4) * 3);
  const cell = 17, gap = 5, ROWS = 7;
  const gw = N * (cell + gap), gh = ROWS * (cell + gap);
  const railY = p.horizon - 128 - (seed % 3) * 26;
  const up = seed % 2 === 0 ? -1 : 1;
  return (<>
    {/* ---- the contribution graph, painted on the wall ------------------- */}
    <div style={{ position: "absolute", left: graphX, top: graphY, width: gw, height: gh, zIndex: z,
      opacity: 0.86 * lift }}>
      {Array.from({ length: ROWS * N }, (_, i) => {
        const r = i % ROWS, c = Math.floor(i / ROWS);
        const q = rnd(seed * 7 + c, r);
        /* ⭐ the graph FILLS as the reel plays: a wave of cells reaching their
           value left to right, so the wall itself is never a still image */
        const t = E(f, c * 1.7 + r * 0.5, c * 1.7 + r * 0.5 + 10, 0, 1, OUT);
        const lvl = q > 0.82 ? 3 : q > 0.62 ? 2 : q > 0.36 ? 1 : 0;
        const live = q > 0.93;
        return (
          <div key={i} style={{ position: "absolute", left: c * (cell + gap), top: r * (cell + gap),
            width: cell, height: cell, borderRadius: 3.4,
            background: live ? hexa(hot, 0.55 * t) : step[lvl],
            opacity: 0.42 + 0.58 * t }} />
        );
      })}
    </div>
    {/* ---- the commit rail: a branch that forks off the trunk and merges back */}
    {rail && (
      <div style={{ position: "absolute", left: 0, top: railY, width: W, height: 90, zIndex: z }}>
        <div style={{ position: "absolute", left: 0, top: 44, width: W, height: 3,
          background: hexa(mxh(wall, 0.34), 0.7) }} />
        {/* the fork: out of the trunk, along, and back in */}
        <svg width={W} height={90} style={{ position: "absolute", left: 0, top: 0 }}>
          <path d={`M ${W * 0.30} 45 C ${W * 0.36} 45, ${W * 0.36} ${45 + up * 30}, ${W * 0.42} ${45 + up * 30} L ${W * 0.60} ${45 + up * 30} C ${W * 0.66} ${45 + up * 30}, ${W * 0.66} 45, ${W * 0.72} 45`}
            fill="none" stroke={hexa(mxh(wall, 0.40), 0.72)} strokeWidth={3} />
        </svg>
        {/* the commit dots, one lighting at a time as the head moves along */}
        {Array.from({ length: 11 }, (_, i) => {
          const cx = 60 + i * ((W - 120) / 10);
          const on = E(f, i * 5, i * 5 + 6, 0, 1, OUT) * (1 - E(f, i * 5 + 40, i * 5 + 52, 0, 1, LIN));
          return (
            <div key={i} style={{ position: "absolute", left: cx - 7, top: 38, width: 14, height: 14,
              borderRadius: "50%", border: `3px solid ${hexa(mxh(wall, 0.42), 0.8)}`,
              background: on > 0.2 ? hexa(hot, 0.34 * on) : hexa(mxh(wall, 0.16), 0.8) }} />
          );
        })}
      </div>
    )}
    {/* ---- octicon stencils, painted on the wall the way a workshop stencils a bay */}
    {(["issue", "pr", "fork"] as const).map((kd, i) => {
      const xs = [W - 150, W - 96, W - 150][(i + seed) % 3];
      return (
        <div key={kd} style={{ position: "absolute", left: xs, top: 250 + i * 62, zIndex: z, opacity: 0.20 * lift }}>
          <Octicon kind={kd} s={44} c={mxh(wall, 0.5)} />
        </div>
      );
    })}
  </>);
};
