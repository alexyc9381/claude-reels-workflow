import React from "react";
import { Img, staticFile } from "remotion";
import { MONO } from "./SlopKit";
import { inter } from "./fonts";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D, squash,
  mono, ui, Contact, Ring, Puff, Pool, R,
  CLAY, CLAYD, GOLD, GREEN, RED, PAPER, CREAMB, INK, MUTE, TEAL, STEEL,
  BRASS, SODIUM, VIOLET, EMBER, OXIDE, SLATE,
} from "./LoopWorld";

/* ===========================================================================
   REEL 118 · "LOOP" — THE PROPS.  Board: storyboards/118-loop.md.

   ⛔⛔ A CONTAINER IS STILL A CONTAINER WHEN IT IS A NICE BOX (reel 112). Nothing
   in here is a crate with a logo on it. Every object is drawn with the ten to
   twenty parts a viewer actually uses to identify that category:
     a browser  = chrome bar + three lights + a URL pill + a hero band + a nav
                  row + three cards + a scrollbar + a footer
     a game     = a horizon + parallax skyline + a ground plane + a crosshair +
                  an ammo readout + a health bar + a weapon in the near corner
     a paddle   = a shaft + a bound grip + a collar + a two-sided head with a
                  cast rim, a stamped face and a rivet ring
   ⛔ AND EVERY CONTAINER MUST READ WHILE IT IS STILL **EMPTY**, differing from
   its room in HUE **AND** VALUE — empty is the promise (reel 110). Line 3's
   socket is a BRIGHT RIM around a dark hole, never a hole in a dark plate.
   ========================================================================= */

/* =========================================================================
   1 · THE PROMPT SLAB — the three-line prompt, the object the reel starts from
   ====================================================================== */

/** ⭐ THE HERO OBJECT OF THE SETUP. Three lines on a lit lectern plate. Each
    line has its own lamp, its own number stud and its own state, so "the THIRD
    line" is a thing you can point at rather than a caption.
    ⛔ Line 3 draws a SOCKET while it is empty — a bright brass rim around a
    dark bore — because an empty container that reads as a hole in a plate is
    the reel-110 defect. */
export const PromptSlab: React.FC<{ x: number; y: number; w?: number; f: number;
  /** how many lines are LIT, 0..3 */ lit?: number; z?: number; s?: number;
  /** 0..1 — line 3's plug seated */ plug?: number; hot?: number;
  /** flash the body on a fire */ fire?: number }> =
  ({ x, y, w: ww = 520, f, lit = 0, z = 60, s = 1, plug = 0, hot = -1, fire = 0 }) => {
  const rowH = 62 * s;
  const bodyC = "#2A2E38";
  return (
    <div style={{ position: "absolute", left: x, top: y, width: ww, zIndex: z }}>
      {/* the cast body, with a chamfered top rail and side cheeks */}
      <div style={{ position: "absolute", left: -14 * s, top: -18 * s, right: -14 * s,
        bottom: -16 * s, borderRadius: 12 * s, boxShadow: SH_D,
        background: `linear-gradient(168deg, ${mxh(bodyC, 0.24 + fire * 0.24)} 0%, ${bodyC} 42%, ${dkh(bodyC, 0.40)} 100%)`,
        border: `${4 * s}px solid ${dkh(bodyC, 0.52)}` }} />
      {/* the top rail: a maker's strip with the Claude mark cast into it */}
      <div style={{ position: "absolute", left: -6 * s, top: -14 * s, width: ww - 4 * s,
        height: 22 * s, borderRadius: 4 * s, background: dkh(bodyC, 0.26),
        display: "flex", alignItems: "center", gap: 7 * s, paddingLeft: 8 * s }}>
        <div style={{ width: 15 * s, height: 15 * s, borderRadius: 4 * s, background: "#FFFFFF",
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Img src={staticFile("claude_logo.png")}
            style={{ width: 12 * s, height: 12 * s, objectFit: "contain" }} />
        </div>
        <span style={{ ...mono(11 * s, 800), color: "#8C93A2", letterSpacing: "0.24em" }}>PROMPT</span>
        <div style={{ marginLeft: "auto", marginRight: 10 * s, display: "flex", gap: 5 * s }}>
          {[0, 1, 2].map(i => (
            <div key={"td" + i} style={{ width: 8 * s, height: 8 * s, borderRadius: 8 * s,
              background: i < lit ? GREEN : "#464C58" }} />
          ))}
        </div>
      </div>
      {/* the three lines */}
      {[0, 1, 2].map(i => {
        const on = i < lit;
        const isHot = i === hot;
        const c = on ? (i === 2 ? GOLD : CREAMB) : "#3A404C";
        return (
          <div key={"pl" + i} style={{ position: "absolute", left: 0, top: 16 * s + i * rowH,
            width: ww, height: rowH - 10 * s, borderRadius: 7 * s, display: "flex",
            alignItems: "center", gap: 12 * s, paddingLeft: 10 * s,
            background: on ? hexa(c, 0.13) : "#20242C",
            border: `${3 * s}px solid ${isHot ? GOLD : on ? hexa(c, 0.42) : "#2E333D"}`,
            transform: `scale(${isHot ? 1 + Math.sin(f / 7) * 0.012 : 1})` }}>
            {/* the number stud */}
            <div style={{ width: 34 * s, height: 34 * s, borderRadius: 7 * s, flexShrink: 0,
              background: on ? c : "#333944", border: `${2 * s}px solid ${dkh(bodyC, 0.30)}`,
              display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ ...mono(20 * s, 900), color: on ? "#20242C" : "#616978" }}>{i + 1}</span>
            </div>
            {/* line 3 while EMPTY is a SOCKET: a bright brass rim around a bore */}
            {i === 2 && plug < 0.5 ? (
              <div style={{ width: 46 * s, height: 34 * s, borderRadius: 6 * s,
                border: `${4 * s}px solid ${BRASS}`, background: "#0B0D12",
                boxShadow: `inset 0 ${3 * s}px ${6 * s}px rgba(0,0,0,0.8)` }} />
            ) : null}
            {/* the code bars — the line's own content, arriving as it lights */}
            <div style={{ display: "flex", gap: 6 * s, alignItems: "center", flex: 1 }}>
              {[0, 1, 2, 3, 4].map(j => (
                <div key={"cb" + j} style={{ height: 10 * s, borderRadius: 5 * s,
                  width: (34 + rnd(i * 5 + j, 2) * 76) * s,
                  background: on ? hexa(c, 0.72 - j * 0.09) : "#333944" }} />
              ))}
            </div>
            {/* the line lamp */}
            <div style={{ width: 13 * s, height: 13 * s, borderRadius: 13 * s, marginRight: 12 * s,
              flexShrink: 0, background: on ? (i === 2 ? GOLD : GREEN) : "#3A404C",
              border: `${2 * s}px solid ${dkh(bodyC, 0.34)}` }} />
          </div>
        );
      })}
      {/* the enter lever's socket rail at the foot */}
      <div style={{ position: "absolute", left: 0, top: 16 * s + 3 * rowH, width: ww,
        height: 12 * s, borderRadius: 5 * s, background: dkh(bodyC, 0.44) }} />
    </div>
  );
};

/** the big throw-lever the hero drives to fire the prompt. ⭐ AN ACTION IS A
    DISTANCE: this travels 96deg, not 12. */
export const Lever: React.FC<{ x: number; y: number; k: number; s?: number; z?: number;
  c?: string }> = ({ x, y, k, s = 1, z = 62, c = "#B4402E" }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
    {/* the cast base and its bolt ring */}
    <div style={{ position: "absolute", left: -46 * s, top: -14 * s, width: 92 * s, height: 46 * s,
      borderRadius: 9 * s, background: `linear-gradient(180deg, #4E545E 0%, #262A32 100%)`,
      border: `${3 * s}px solid #1A1D23` }} />
    {[-30, -10, 10, 30].map((bx, i) => (
      <div key={"bt" + i} style={{ position: "absolute", left: bx * s - 4 * s, top: 22 * s,
        width: 8 * s, height: 8 * s, borderRadius: 8 * s, background: "#161920" }} />
    ))}
    {/* the arm — a real shaft with a collar and a ball grip */}
    <div style={{ position: "absolute", left: -9 * s, top: -128 * s, width: 18 * s, height: 132 * s,
      borderRadius: 9 * s, transformOrigin: "50% 100%",
      transform: `rotate(${-46 + k * 96}deg)`,
      background: `linear-gradient(90deg, #9AA2AE 0%, #5C636E 60%, #363B44 100%)` }}>
      <div style={{ position: "absolute", left: -8 * s, top: 46 * s, width: 34 * s, height: 13 * s,
        borderRadius: 3 * s, background: "#454B55" }} />
      <div style={{ position: "absolute", left: -13 * s, top: -30 * s, width: 44 * s, height: 44 * s,
        borderRadius: "50%", border: `${3 * s}px solid ${dkh(c, 0.44)}`,
        background: `radial-gradient(60% 60% at 36% 32%, ${mxh(c, 0.34)} 0%, ${c} 52%, ${dkh(c, 0.38)} 100%)` }} />
    </div>
  </div>
);

/* =========================================================================
   2 · THE RETURN RAIL — the LOOP, made visible. A full-width high-contrast
   travelling band, which is §1's single highest-value per-scene shape.
   ⛔ It alternates LIGHT AND SHADOW so it does not lift the black point.
   ====================================================================== */
export const ReturnRail: React.FC<{ y: number; f: number; z?: number; rate?: number;
  c?: string; h?: number; hangers?: boolean; o?: number }> =
  ({ y, f, z = 34, rate = 4.2, c = STEEL, h: hh = 42, hangers = true, o = 1 }) => (
  <div style={{ position: "absolute", left: -60, top: y, width: W + 120, zIndex: z, opacity: o }}>
    {/* the girder: a top flange, a webbed centre and a bottom flange */}
    <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 9,
      background: mxh(c, 0.24) }} />
    <div style={{ position: "absolute", left: 0, top: 9, width: "100%", height: hh - 18,
      background: `linear-gradient(180deg, ${dkh(c, 0.30)} 0%, ${dkh(c, 0.58)} 100%)`,
      overflow: "hidden" }}>
      {/* the web's lightening holes, travelling — the band's own motion */}
      {Array.from({ length: 26 }, (_, i) => (
        <div key={"wh" + i} style={{ position: "absolute", top: (hh - 18) * 0.22,
          left: ((i * 68 - f * rate * 0.55) % (W + 240) + W + 240) % (W + 240) - 60,
          width: 30, height: (hh - 18) * 0.56, borderRadius: 4, background: "#0A0D12" }} />
      ))}
    </div>
    <div style={{ position: "absolute", left: 0, top: hh - 9, width: "100%", height: 9,
      background: dkh(c, 0.62) }} />
    {/* ⭐ THE CHAIN: alternating light links and dark gaps, travelling fast. This
        is the part the audit actually reads, and the alternation is what keeps
        the black point down while it does. */}
    {/* ⛔ A ROW OF EQUAL LIGHT/DARK RECTANGLES IS A DASHED LINE, NOT A CHAIN.
        Deepening the links to 34px did lift the score and it also made every
        scene look like it had FILM SPROCKET HOLES along its top edge — a
        graphic laid on the frame rather than a thing in the room. This is the
        reel-109 lesson one step on: what makes a band read wrong is not its
        size, it is that it does not look like an object.

        ⭐ SO THE BAND IS NOW LOADED. A thin continuous chain runs the span and
        CARRIERS ride it — a hook and a work plate every ~136px. They are 52x40,
        comfortably over the downsample floor, they are large bright objects
        travelling (§1's second-highest row), and they say what the rail is FOR:
        this is the loop, and it is carrying rejected work back to the start. */}
    <div style={{ position: "absolute", left: 0, top: hh + 3, width: "100%", height: 7,
      background: dkh(c, 0.66) }} />
    <div style={{ position: "absolute", left: 0, top: hh, width: "100%", height: 52,
      overflow: "hidden" }}>
      {Array.from({ length: 10 }, (_, i) => {
        const x = ((i * 136 + f * rate) % (W + 272) + W + 272) % (W + 272) - 136;
        return (
          <div key={"cr" + i} style={{ position: "absolute", left: x, top: 0, width: 52,
            height: 52 }}>
            {/* the hook */}
            <div style={{ position: "absolute", left: 22, top: 0, width: 8, height: 15,
              background: mxh(c, 0.40) }} />
            {/* the work plate it is carrying */}
            <div style={{ position: "absolute", left: 0, top: 13, width: 52, height: 38,
              borderRadius: 5, background: i % 3 === 1 ? mxh(c, 0.54) : dkh(c, 0.16),
              border: `3px solid ${dkh(c, 0.56)}` }}>
              <div style={{ position: "absolute", left: 5, top: 5, right: 5, height: 9,
                borderRadius: 2, background: i % 3 === 1 ? hexa("#0A0D12", 0.44) : hexa(GOLD, 0.60) }} />
              <div style={{ position: "absolute", left: 5, top: 19, width: 24, height: 6,
                borderRadius: 2, background: hexa("#0A0D12", 0.34) }} />
            </div>
          </div>
        );
      })}
    </div>
    {hangers && <>{[0.10, 0.32, 0.54, 0.76, 0.96].map((k, i) => (
      <div key={"hg" + i} style={{ position: "absolute", left: `${k * 100}%`, top: -66,
        width: 11, height: 68, background: dkh(c, 0.46) }} />
    ))}</>}
  </div>
);

/** the carriage that rides the rail, carrying a rejected build back to the
    start. ⛔ OVERLAPPING ACTION (§13): the hoist leads, the carriage eases, the
    load lags on the carriage's own velocity and rings out as a pendulum. */
export const Carriage: React.FC<{ x: number; y: number; swing: number; s?: number;
  z?: number; c?: string; children?: React.ReactNode }> =
  ({ x, y, swing, s = 1, z = 58, c = BRASS, children }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
    {/* the trolley: two flanged wheels, a yoke and a hook block */}
    {[-26, 26].map((wx, i) => (
      <div key={"wl" + i} style={{ position: "absolute", left: wx * s - 15 * s, top: -20 * s,
        width: 30 * s, height: 30 * s, borderRadius: "50%", background: dkh(c, 0.30),
        border: `${4 * s}px solid ${mxh(c, 0.20)}` }} />
    ))}
    <div style={{ position: "absolute", left: -36 * s, top: 2 * s, width: 72 * s, height: 20 * s,
      borderRadius: 5 * s, background: `linear-gradient(180deg, ${mxh(c, 0.20)} 0%, ${dkh(c, 0.34)} 100%)` }} />
    {/* the sling, rotating on the swing so the load trails properly */}
    <div style={{ position: "absolute", left: 0, top: 20 * s, transformOrigin: "50% 0%",
      transform: `rotate(${swing}deg)` }}>
      <div style={{ position: "absolute", left: -3 * s, top: 0, width: 6 * s, height: 54 * s,
        background: dkh(c, 0.46) }} />
      <div style={{ position: "absolute", left: -60 * s, top: 54 * s }}>{children}</div>
    </div>
  </div>
);

/* =========================================================================
   3 · THE BUILD — the thing that runs the gauntlet, at five levels of refinement
   ====================================================================== */

/** ⭐⭐ THE HERO ARTIFACT'S COUNTERPART. The SAME object at five levels, so
    "loop and refine" is legible as one thing getting better rather than five
    different things. Each level adds real structure: more tiers, lit windows,
    a finished crown and a stamp — and the scaffold comes OFF as it improves. */
export const BuildRig: React.FC<{ x: number; y: number; lvl: number; f: number; s?: number;
  z?: number; stamp?: string; stampAt?: number; shake?: number }> =
  ({ x, y, lvl, f, s = 1, z = 54, stamp, stampAt, shake: sh = 0 }) => {
  const tiers = Math.max(1, Math.min(5, Math.round(lvl)));
  /* A TOWER IS TALLER THAN IT IS WIDE, AND v1 WAS NOT. At tierH 46 against
     bw 150 + 22/tier, five tiers came out 260x230 - square - and on the contact
     sheet the hook's build read as a run of SHELVING rather than a structure.
     Height per tier is now 64 and the base is narrower, so a finished build is
     191x320: a 1:1.7 silhouette that reads as a tower at thumbnail size.
     (ANIMATION-QUALITY §11: proportion is the first of the two free checks.) */
  const tierH = 64 * s;
  const bw = (116 + tiers * 15) * s;
  const finished = lvl >= 4;
  const jx = sh ? Math.sin(f * 2.2) * sh : 0;
  return (
    <div style={{ position: "absolute", left: x - bw / 2 + jx, top: y - tiers * tierH - 34 * s,
      width: bw, zIndex: z }}>
      {/* the crown — only on a finished build, and it carries the mark */}
      {finished && (
        <div style={{ position: "absolute", left: bw * 0.5 - 44 * s, top: -46 * s, width: 88 * s,
          height: 42 * s, borderRadius: 8 * s, background: GOLD,
          border: `${3 * s}px solid ${dkh(GOLD, 0.36)}`, display: "flex", alignItems: "center",
          justifyContent: "center", boxShadow: SH }}>
          <div style={{ width: 26 * s, height: 26 * s, borderRadius: 6 * s, background: "#FFFFFF",
            display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Img src={staticFile("claude_logo.png")}
              style={{ width: 21 * s, height: 21 * s, objectFit: "contain" }} />
          </div>
        </div>
      )}
      {/* the tiers, top to bottom — each a real UI band, not a blank slab */}
      {Array.from({ length: tiers }, (_, i) => {
        const lit = lvl >= 2 || i < lvl - 1;
        const face = lit ? "#2E3A48" : "#232830";
        return (
          <div key={"tr" + i} style={{ position: "absolute", left: 0, top: i * tierH,
            width: bw, height: tierH - 5 * s, borderRadius: 5 * s,
            background: `linear-gradient(178deg, ${mxh(face, 0.16)} 0%, ${face} 40%, ${dkh(face, 0.34)} 100%)`,
            border: `${3 * s}px solid ${dkh(face, 0.52)}`, overflow: "hidden" }}>
            {/* the band's header strip */}
            <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 9 * s,
              background: lit ? hexa(TEAL, 0.52) : "#2C323C" }} />
            {/* the windows — three cells with content, lit as the level rises */}
            {/* THE WINDOW COUNT IS DERIVED FROM THE TIER'S WIDTH, NOT FIXED.
                Four cells is right at s=1 and at the hook's s=1.9 it made each
                window a 100px slab, so the tower read as a stack of BARS rather
                than a building with windows in it. Cells are held at ~34px so
                the same component reads correctly at every scale it is used. */}
            <div style={{ position: "absolute", left: 8 * s, top: 15 * s, right: 8 * s,
              display: "flex", gap: 5 * s }}>
              {/* bw is ALREADY in screen pixels, so dividing by 34*s re-cancelled
                  the scale and left 70px slabs on the hook's tower. The divisor
                  is a fixed SCREEN size: cells stay ~34px at every scale. */}
              {Array.from({ length: Math.max(4, Math.round((bw - 16 * s) / 34)) },
                (_, j) => (
                <div key={"wn" + j} style={{ flex: 1, height: tierH - 28 * s, borderRadius: 3 * s,
                  background: lit && (j + i) % 3 !== 2 ? hexa(GOLD, 0.62) : "#161A21",
                  borderTop: `${2 * s}px solid ${lit ? hexa(GOLD, 0.30) : "#20252D"}` }} />
              ))}
            </div>
          </div>
        );
      })}
      {/* ⭐ THE CORNER COLUMNS — what makes a stack of tiers read as ONE
          building. They run the full height, in front of the tier gaps, so the
          silhouette is continuous instead of sliced. */}
      {[-6, bw - 12].map((cx, i) => (
        <div key={"cc" + i} style={{ position: "absolute", left: cx, top: -6 * s,
          width: 18 * s, height: tiers * tierH + 6 * s, borderRadius: 3 * s, zIndex: 3,
          background: `linear-gradient(90deg, ${mxh(SLATE, 0.20)} 0%, ${dkh(SLATE, 0.40)} 100%)` }} />
      ))}
      {/* the plinth */}
      <div style={{ position: "absolute", left: -12 * s, top: tiers * tierH, width: bw + 24 * s,
        height: 30 * s, borderRadius: 5 * s, boxShadow: SH,
        background: `linear-gradient(180deg, ${mxh(SLATE, 0.20)} 0%, ${dkh(SLATE, 0.44)} 100%)` }} />
      {/* the scaffold — comes OFF as the build improves */}
      {lvl < 4 && <>
        {[-1, 1].map(sgn => (
          <div key={"sc" + sgn} style={{ position: "absolute",
            left: sgn < 0 ? -22 * s : bw + 6 * s, top: -8 * s, width: 16 * s,
            height: tiers * tierH + 14 * s, background: dkh(OXIDE, 0.24), opacity: 1 - lvl * 0.2 }}>
            {Array.from({ length: tiers + 1 }, (_, i) => (
              <div key={"sr" + i} style={{ position: "absolute", left: sgn < 0 ? 14 * s : -18 * s,
                top: i * tierH + 8 * s, width: 20 * s, height: 6 * s, background: dkh(OXIDE, 0.16) }} />
            ))}
          </div>
        ))}
      </>}
      {/* the stamp, rocking to a stop */}
      {stamp && stampAt !== undefined && f >= stampAt && (
        <div style={{ position: "absolute", left: bw * 0.5 - 70 * s, top: tiers * tierH * 0.42,
          width: 140 * s, height: 46 * s, borderRadius: 6 * s, zIndex: 9,
          transform: `rotate(${-9 + Math.sin((f - stampAt) / 3.1) * Math.exp(-(f - stampAt) / 12) * 12}deg) scale(${squash(f, stampAt, 0.3, 3, 12)})`,
          background: stamp === R.stamps.mvp ? CREAMB : GREEN,
          border: `${4 * s}px solid ${stamp === R.stamps.mvp ? "#8E846E" : dkh(GREEN, 0.40)}`,
          display: "flex", alignItems: "center", justifyContent: "center", boxShadow: SH_D }}>
          <span style={{ ...mono(24 * s, 900), letterSpacing: "0.10em",
            color: stamp === R.stamps.mvp ? "#3A3428" : "#0E1A14" }}>{stamp}</span>
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   4 · THE THREE ARTIFACTS — "apps and websites". Drawn, not contained.
   ====================================================================== */


/** ⭐ THE AURA — light coming OFF a lit screen, built the matte way. Three
    layers: a wide soft field, a tighter warm core, and a thin bright rim that
    hugs the bezel. ⛔ No `boxShadow: 0 0` anywhere; the ship gate greps for it
    and this house paints light as gradients, never as a glow property. */
export const ScreenAura: React.FC<{ x: number; y: number; w: number; h: number;
  c?: string; k?: number; z?: number; f?: number }> =
  ({ x, y, w: ww, h: hh, c = TEAL, k = 1, z = 44, f = 0 }) => {
  const pulse = 0.92 + Math.sin(f / 17) * 0.08;
  const o = k * pulse;
  return (<>
    <div style={{ position: "absolute", left: x - ww * 0.44, top: y - hh * 0.44,
      width: ww * 1.88, height: hh * 1.88, zIndex: z - 2, borderRadius: "50%",
      background: `radial-gradient(50% 50% at 50% 50%, ${hexa(c, 0.46 * o)} 0%, ${hexa(c, 0.17 * o)} 44%, ${hexa(c, 0)} 100%)` }} />
    <div style={{ position: "absolute", left: x - ww * 0.16, top: y - hh * 0.16,
      width: ww * 1.32, height: hh * 1.32, zIndex: z - 1, borderRadius: 26,
      background: `radial-gradient(50% 50% at 50% 50%, ${hexa(c, 0.52 * o)} 0%, ${hexa(c, 0)} 72%)` }} />
    <div style={{ position: "absolute", left: x - 7, top: y - 7, width: ww + 14, height: hh + 14,
      zIndex: z, borderRadius: 15, border: `4px solid ${hexa(c, 0.78 * o)}` }} />
  </>);
};

export const BrowserWin: React.FC<{ x: number; y: number; s?: number; z?: number; f: number }> =
  ({ x, y, s = 1, z = 54, f }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 300 * s, height: 214 * s, zIndex: z,
    borderRadius: 9 * s, overflow: "hidden", boxShadow: SH_D,
    background: "#F6F3EC", border: `${4 * s}px solid #23262C` }}>
    <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 27 * s,
      background: "#DCD6C8", display: "flex", alignItems: "center", gap: 5 * s, paddingLeft: 8 * s }}>
      {["#E0533F", "#E7B24C", "#3F9E74"].map((c, i) => (
        <div key={"tl" + i} style={{ width: 9 * s, height: 9 * s, borderRadius: 9 * s, background: c }} />
      ))}
      <div style={{ marginLeft: 8 * s, width: 152 * s, height: 13 * s, borderRadius: 7 * s,
        background: "#F2EEE4", border: `${1.5 * s}px solid #C0B8A6` }} />
    </div>
    {/* the hero band */}
    <div style={{ position: "absolute", left: 0, top: 27 * s, width: "100%", height: 62 * s,
      background: `linear-gradient(120deg, ${CLAY} 0%, ${dkh(CLAY, 0.30)} 100%)` }}>
      <div style={{ position: "absolute", left: 14 * s, top: 15 * s, width: 132 * s, height: 13 * s,
        borderRadius: 4 * s, background: hexa("#FFFFFF", 0.86) }} />
      <div style={{ position: "absolute", left: 14 * s, top: 34 * s, width: 86 * s, height: 8 * s,
        borderRadius: 4 * s, background: hexa("#FFFFFF", 0.52) }} />
      <div style={{ position: "absolute", left: 14 * s, top: 48 * s, width: 52 * s, height: 12 * s,
        borderRadius: 6 * s, background: GOLD }} />
    </div>
    {/* the nav row */}
    <div style={{ position: "absolute", left: 12 * s, top: 96 * s, display: "flex", gap: 9 * s }}>
      {[38, 30, 44, 26].map((w2, i) => (
        <div key={"nv" + i} style={{ width: w2 * s, height: 7 * s, borderRadius: 4 * s,
          background: "#B6AE9C" }} />
      ))}
    </div>
    {/* three cards, arriving one by one */}
    <div style={{ position: "absolute", left: 12 * s, top: 112 * s, right: 12 * s,
      display: "flex", gap: 8 * s }}>
      {[0, 1, 2].map(i => (
        <div key={"cd" + i} style={{ flex: 1, height: 72 * s, borderRadius: 5 * s,
          background: "#EAE4D6", border: `${2 * s}px solid #CFC6B2`,
          transform: `translateY(${E(f, 16 + i * 6, 28 + i * 6, 22, 0, OUT)}px)`,
          opacity: E(f, 16 + i * 6, 26 + i * 6, 0, 1, LIN) }}>
          <div style={{ position: "absolute", left: 5 * s, top: 5 * s, right: 5 * s, height: 30 * s,
            borderRadius: 3 * s, background: [TEAL, CLAY, GREEN][i] }} />
          <div style={{ position: "absolute", left: 5 * s, top: 40 * s, width: "70%", height: 6 * s,
            borderRadius: 3 * s, background: "#B6AE9C" }} />
          <div style={{ position: "absolute", left: 5 * s, top: 51 * s, width: "48%", height: 6 * s,
            borderRadius: 3 * s, background: "#C6BEAC" }} />
        </div>
      ))}
    </div>
    <div style={{ position: "absolute", right: 3 * s, top: 34 * s, width: 5 * s, height: 60 * s,
      borderRadius: 3 * s, background: "#C0B8A6" }} />
  </div>
);

export const AppWin: React.FC<{ x: number; y: number; s?: number; z?: number; f: number }> =
  ({ x, y, s = 1, z = 54, f }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 268 * s, height: 198 * s, zIndex: z,
    borderRadius: 9 * s, overflow: "hidden", boxShadow: SH_D,
    background: "#1B2028", border: `${4 * s}px solid #0E1116` }}>
    <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 24 * s,
      background: "#262C36", display: "flex", alignItems: "center", paddingLeft: 9 * s, gap: 7 * s }}>
      <div style={{ width: 14 * s, height: 14 * s, borderRadius: 4 * s, background: "#FFFFFF",
        display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Img src={staticFile("claude_logo.png")}
          style={{ width: 11 * s, height: 11 * s, objectFit: "contain" }} />
      </div>
      <div style={{ width: 74 * s, height: 8 * s, borderRadius: 4 * s, background: "#4A5260" }} />
    </div>
    {/* the sidebar with four real rows */}
    <div style={{ position: "absolute", left: 0, top: 24 * s, width: 72 * s, bottom: 0,
      background: "#151A21", borderRight: `${2 * s}px solid #0B0E13` }}>
      {[0, 1, 2, 3].map(i => (
        <div key={"sb" + i} style={{ position: "absolute", left: 8 * s, top: (12 + i * 26) * s,
          display: "flex", gap: 6 * s, alignItems: "center" }}>
          <div style={{ width: 11 * s, height: 11 * s, borderRadius: 3 * s,
            background: i === 1 ? CLAY : "#39414D" }} />
          <div style={{ width: (36 - i * 4) * s, height: 6 * s, borderRadius: 3 * s,
            background: i === 1 ? "#C6CEDA" : "#39414D" }} />
        </div>
      ))}
    </div>
    {/* the content rows, landing one at a time */}
    {[0, 1, 2].map(i => (
      <div key={"rw" + i} style={{ position: "absolute", left: 84 * s, right: 12 * s,
        top: (38 + i * 44) * s, height: 36 * s, borderRadius: 5 * s, background: "#222933",
        border: `${2 * s}px solid #2E3743`,
        transform: `translateX(${E(f, 14 + i * 8, 26 + i * 8, 40, 0, OUT)}px)`,
        opacity: E(f, 14 + i * 8, 24 + i * 8, 0, 1, LIN) }}>
        <div style={{ position: "absolute", left: 7 * s, top: 8 * s, width: 62 * s, height: 7 * s,
          borderRadius: 4 * s, background: "#7E8896" }} />
        <div style={{ position: "absolute", left: 7 * s, top: 21 * s, width: 96 * s, height: 6 * s,
          borderRadius: 3 * s, background: "#4A5260" }} />
        <div style={{ position: "absolute", right: 7 * s, top: 10 * s, width: 34 * s, height: 15 * s,
          borderRadius: 4 * s, background: [TEAL, GREEN, GOLD][i] }} />
      </div>
    ))}
  </div>
);

/** ⭐ THE RECEIPT LIVES ON A STRUCTURAL FEATURE. The demo's line count is
    stamped where a game HUD puts a readout, so it is not a floating caption. */
export const GameView: React.FC<{ x: number; y: number; s?: number; z?: number; f: number }> =
  ({ x, y, s = 1, z = 54, f }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 320 * s, height: 202 * s, zIndex: z,
    borderRadius: 9 * s, overflow: "hidden", boxShadow: SH_D, border: `${4 * s}px solid #0C0E13`,
    background: `linear-gradient(178deg, #35404E 0%, #5E6070 38%, #6E5F4E 54%, #2E2A26 100%)` }}>
    {/* the parallax skyline — three ranks, darkening back to front */}
    {[0, 1, 2].map(r => (
      <div key={"sk" + r} style={{ position: "absolute", left: 0, right: 0,
        top: (74 + r * 16) * s, height: (70 - r * 12) * s }}>
        {Array.from({ length: 7 }, (_, i) => (
          <div key={"bl" + i} style={{ position: "absolute",
            left: ((i * 52 + r * 21 - f * (0.5 + r * 0.6)) % 380 + 380) % 380 * s - 30 * s,
            bottom: 0, width: (22 + rnd(r * 7 + i, 1) * 26) * s,
            height: (28 + rnd(r * 7 + i, 2) * 52 - r * 8) * s,
            background: ["#2A3038", "#1E242C", "#141920"][r] }} />
        ))}
      </div>
    ))}
    {/* the ground plane */}
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 62 * s,
      background: `linear-gradient(180deg, #4A4034 0%, #211D18 100%)` }} />
    {/* the weapon in the near corner — the single strongest FPS cue */}
    <div style={{ position: "absolute", right: 26 * s, bottom: -8 * s, width: 96 * s, height: 74 * s,
      transform: `rotate(-16deg) translateY(${Math.sin(f / 9) * 3 * s}px)` }}>
      <div style={{ position: "absolute", left: 22 * s, top: 0, width: 20 * s, height: 62 * s,
        borderRadius: 4 * s, background: "#20242A" }} />
      <div style={{ position: "absolute", left: 0, top: 30 * s, width: 62 * s, height: 20 * s,
        borderRadius: 4 * s, background: "#2C3138" }} />
      <div style={{ position: "absolute", left: 44 * s, top: 46 * s, width: 30 * s, height: 26 * s,
        borderRadius: 4 * s, background: "#181C21", transform: "rotate(18deg)" }} />
    </div>
    {/* the crosshair */}
    <div style={{ position: "absolute", left: "50%", top: "48%", width: 26 * s, height: 26 * s,
      marginLeft: -13 * s, marginTop: -13 * s }}>
      {[[0, 11, 26, 3], [11, 0, 3, 26]].map((q, i) => (
        <div key={"ch" + i} style={{ position: "absolute", left: q[0] * s, top: q[1] * s,
          width: q[2] * s, height: q[3] * s, background: hexa("#F4F0E4", 0.80) }} />
      ))}
    </div>
    {/* the HUD: a health bar, an ammo readout, and the receipt where a readout goes */}
    <div style={{ position: "absolute", left: 12 * s, bottom: 12 * s, width: 92 * s, height: 11 * s,
      borderRadius: 3 * s, background: "#161A20", border: `${2 * s}px solid #2A3038` }}>
      <div style={{ position: "absolute", left: 2 * s, top: 2 * s, bottom: 2 * s,
        width: `${58 + Math.sin(f / 14) * 5}%`, borderRadius: 2 * s, background: GREEN }} />
    </div>
    <div style={{ position: "absolute", right: 12 * s, top: 12 * s, padding: `${4 * s}px ${8 * s}px`,
      borderRadius: 4 * s, background: hexa("#0A0C10", 0.72),
      border: `${2 * s}px solid ${hexa(GOLD, 0.44)}` }}>
      <span style={{ ...mono(15 * s, 900), color: GOLD, letterSpacing: "0.06em" }}>
        {R.demo.lines}</span>
      <span style={{ ...mono(10 * s, 700), color: "#9CA4B0", marginLeft: 5 * s }}>LINES</span>
    </div>
    <div style={{ position: "absolute", left: 12 * s, top: 12 * s, padding: `${3 * s}px ${7 * s}px`,
      borderRadius: 4 * s, background: hexa("#0A0C10", 0.62) }}>
      <span style={{ ...mono(11 * s, 800), color: "#B8C0CC", letterSpacing: "0.14em" }}>
        {R.demo.stack}</span>
    </div>
  </div>
);

/* =========================================================================
   5 · THE CRITIC'S KIT
   ====================================================================== */

/** ⭐ CATEGORY IS COMMUNICATED BY STRUCTURE, NOT HUE (§11). A paddle reads as a
    paddle because of a bound grip, a collar, a cast rim and a rivet ring — and
    because it has TWO FACES, which is the whole beat at S10. */
export const Paddle: React.FC<{ x: number; y: number; rot: number; face: "bad" | "good";
  s?: number; z?: number; f: number }> =
  ({ x, y, rot, face, s = 1, z = 66, f }) => {
  const c = face === "bad" ? RED : GREEN;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z, transformOrigin: "50% 96%",
      transform: `rotate(${rot}deg)` }}>
      {/* the shaft */}
      <div style={{ position: "absolute", left: -9 * s, top: 62 * s, width: 18 * s, height: 108 * s,
        borderRadius: 8 * s,
        background: `linear-gradient(90deg, #A8825A 0%, #6E5334 62%, #45341F 100%)` }} />
      {/* the bound grip */}
      <div style={{ position: "absolute", left: -11 * s, top: 122 * s, width: 22 * s, height: 42 * s,
        borderRadius: 6 * s,
        background: `repeating-linear-gradient(24deg, #2E241A 0px, #2E241A 5px, #48382A 5px, #48382A 10px)` }} />
      {/* the collar */}
      <div style={{ position: "absolute", left: -16 * s, top: 56 * s, width: 32 * s, height: 15 * s,
        borderRadius: 4 * s, background: BRASS, border: `${2 * s}px solid ${dkh(BRASS, 0.36)}` }} />
      {/* the head: a thick cast rim, a stamped face, a rivet ring */}
      <div style={{ position: "absolute", left: -62 * s, top: -34 * s, width: 124 * s,
        height: 100 * s, borderRadius: 12 * s, boxShadow: SH_D,
        background: `linear-gradient(166deg, ${mxh(c, 0.26)} 0%, ${c} 46%, ${dkh(c, 0.36)} 100%)`,
        border: `${7 * s}px solid ${dkh(c, 0.52)}`, display: "flex", alignItems: "center",
        justifyContent: "center" }}>
        <span style={{ ...mono(face === "bad" ? 21 * s : 26 * s, 900), letterSpacing: "0.06em",
          color: face === "bad" ? "#2A0E08" : "#0B1A12" }}>
          {face === "bad" ? R.verdicts.bad : R.verdicts.good}</span>
      </div>
      {[[-46, -20], [40, -20], [-46, 46], [40, 46]].map((p, i) => (
        <div key={"rv" + i} style={{ position: "absolute", left: p[0] * s, top: p[1] * s,
          width: 10 * s, height: 10 * s, borderRadius: 10 * s, background: dkh(c, 0.60) }} />
      ))}
    </div>
  );
};

/** the critic's tower. ⛔ HE IS ABOVE AND APART FROM EVERY BENCH — that IS the
    mechanism ("the builder never grades itself"), so it is built into the set. */
export const Pulpit: React.FC<{ x: number; y: number; h?: number; s?: number; z?: number;
  c?: string; lit?: number; f: number }> =
  ({ x, y, h: hh = 200, s = 1, z = 44, c = "#3A3448", lit = 1, f }) => (
  <div style={{ position: "absolute", left: x - 74 * s, top: y - hh * s, width: 148 * s, zIndex: z }}>
    {/* the column, with three cast bands */}
    {/* THE PULPIT READ AS A MUSHROOM on the contact sheet - a fat column
        carrying a box of the same width. A judging pulpit is recognised by a
        WIDE raked box on a NARROW stem with a rail across its front, so the stem
        is 44px against a 148px box and the box now gets a handrail. */}
    <div style={{ position: "absolute", left: 52 * s, top: 74 * s, width: 44 * s,
      height: hh * s - 74 * s,
      background: `linear-gradient(90deg, ${mxh(c, 0.18)} 0%, ${c} 46%, ${dkh(c, 0.46)} 100%)` }}>
      {[0.16, 0.48, 0.80].map((k, i) => (
        <div key={"pb" + i} style={{ position: "absolute", left: -7 * s, right: -7 * s,
          top: `${k * 100}%`, height: 13 * s, background: dkh(c, 0.40) }} />
      ))}
    </div>
    {/* the box: a raked front panel, a rail and a reading ledge */}
    <div style={{ position: "absolute", left: 0, top: 0, width: 148 * s, height: 82 * s,
      borderRadius: 8 * s, boxShadow: SH_D,
      background: `linear-gradient(176deg, ${mxh(c, 0.30)} 0%, ${c} 40%, ${dkh(c, 0.42)} 100%)`,
      border: `${4 * s}px solid ${dkh(c, 0.56)}` }}>
      <div style={{ position: "absolute", left: 12 * s, top: 14 * s, right: 12 * s, height: 34 * s,
        borderRadius: 4 * s, background: dkh(c, 0.30),
        borderTop: `${3 * s}px solid ${mxh(c, 0.22)}` }} />
      {/* the verdict lamp */}
      <div style={{ position: "absolute", left: 64 * s, top: 56 * s, width: 20 * s, height: 12 * s,
        borderRadius: 3 * s, background: lit > 0.5 ? RED : "#2A2634" }} />
      {/* the handrail across the front - the feature that says "someone stands
          in this and looks DOWN at you" */}
      <div style={{ position: "absolute", left: -12 * s, right: -12 * s, top: -15 * s,
        height: 10 * s, borderRadius: 5 * s, background: mxh(c, 0.44) }} />
      {[0.10, 0.5, 0.90].map((k, i) => (
        <div key={"rp" + i} style={{ position: "absolute", left: `${k * 100}%`, top: -13 * s,
          width: 8 * s, height: 22 * s, background: mxh(c, 0.26) }} />
      ))}
    </div>
    {/* the reading lamp on its gooseneck */}
    <div style={{ position: "absolute", left: 118 * s, top: -34 * s, width: 7 * s, height: 40 * s,
      background: dkh(c, 0.50) }} />
    <div style={{ position: "absolute", left: 104 * s, top: -46 * s, width: 34 * s, height: 16 * s,
      borderRadius: `${8 * s}px ${8 * s}px 0 0`, background: "#4E4658" }} />
    {lit > 0.02 && <Pool x={121 * s} y={-26 * s} w={130 * s} c={VIOLET} o={0.26 * lit} z={-2} />}
  </div>
);

/** the running verdict count. ⛔ THIS COUNTS EVENTS ON SCREEN, NEVER A SCORE. */
export const RejectCounter: React.FC<{ x: number; y: number; n: number; pass: boolean;
  f: number; at: number; s?: number; z?: number }> =
  ({ x, y, n, pass, f, at, s = 1, z = 86 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z, display: "flex",
    alignItems: "center", gap: 9 * s,
    transform: `scale(${squash(f, at, 0.16, 3, 11)})`, transformOrigin: "0% 50%" }}>
    <div style={{ padding: `${7 * s}px ${13 * s}px`, borderRadius: 7 * s,
      background: pass ? GREEN : "#231A18", border: `${3 * s}px solid ${pass ? dkh(GREEN, 0.40) : dkh(RED, 0.30)}`,
      boxShadow: SH }}>
      <span style={{ ...mono(24 * s, 900), letterSpacing: "0.08em",
        color: pass ? "#0B1A12" : RED }}>{pass ? R.verdicts.good : R.verdicts.bad}</span>
    </div>
    {!pass && <div style={{ display: "flex", gap: 6 * s }}>
      {[0, 1, 2].map(i => (
        <div key={"rc" + i} style={{ width: 20 * s, height: 20 * s, borderRadius: 4 * s,
          background: i < n ? RED : "#2A2422", border: `${2 * s}px solid #191413` }} />
      ))}
    </div>}
  </div>
);

/* =========================================================================
   6 · THE BAR — the hero artifact. Everything is measured against it.
   ====================================================================== */
export const QualityBar: React.FC<{ y: number; f: number; on: number; z?: number;
  x0?: number; x1?: number; label?: string }> =
  ({ y, f, on, z = 38, x0 = 60, x1 = W - 60, label }) => {
  const ww = x1 - x0;
  return (
    <div style={{ position: "absolute", left: x0, top: y, width: ww, zIndex: z }}>
      {/* the mounting brackets at each end */}
      {[0, 1].map(i => (
        <div key={"bk" + i} style={{ position: "absolute", left: i ? ww - 26 : 0, top: -22,
          width: 26, height: 74, background: dkh(SLATE, 0.42) }} />
      ))}
      {/* the beam: a dark cast channel with a lamp trough inside it */}
      <div style={{ position: "absolute", left: 0, top: 0, width: ww, height: 34, borderRadius: 5,
        background: `linear-gradient(180deg, ${mxh(SLATE, 0.14)} 0%, ${dkh(SLATE, 0.52)} 100%)`,
        border: `4px solid ${dkh(SLATE, 0.62)}`, overflow: "hidden" }}>
        {/* the lamp bar — floods along its OWN length, never a full-frame plate */}
        <div style={{ position: "absolute", left: 4, top: 6, bottom: 6,
          width: `${Math.max(0, on) * 100}%`, borderRadius: 3,
          background: `linear-gradient(90deg, ${dkh(GOLD, 0.14)} 0%, ${GOLD} 34%, ${mxh(GOLD, 0.30)} 100%)` }} />
        {/* the segment dividers, so it reads as a fixture not a progress bar */}
        {Array.from({ length: 14 }, (_, i) => (
          <div key={"sg" + i} style={{ position: "absolute", left: (i + 1) * (ww / 15), top: 0,
            width: 3, height: "100%", background: hexa("#0A0C10", 0.62) }} />
        ))}
      </div>
      {/* the target notch — the thing a build has to crest */}
      <div style={{ position: "absolute", left: ww * 0.5 - 30, top: -20, width: 60, height: 20 }}>
        <div style={{ position: "absolute", left: 26, top: 0, width: 8, height: 20,
          background: on > 0.5 ? GOLD : dkh(SLATE, 0.30) }} />
        <div style={{ position: "absolute", left: 0, top: 0, width: 60, height: 7,
          background: on > 0.5 ? GOLD : dkh(SLATE, 0.30) }} />
      </div>
      {label && (
        <div style={{ position: "absolute", left: ww * 0.5 - 78, top: 40, width: 156,
          padding: "5px 0", borderRadius: 5, textAlign: "center",
          background: on > 0.5 ? hexa(GOLD, 0.18) : hexa("#0A0C10", 0.44),
          border: `3px solid ${on > 0.5 ? hexa(GOLD, 0.52) : hexa(STEEL, 0.26)}` }}>
          <span style={{ ...mono(19, 900), letterSpacing: "0.16em",
            color: on > 0.5 ? GOLD : "#8E96A2" }}>{label}</span>
        </div>
      )}
      {on > 0.05 && <Pool x={ww * 0.5} y={44} w={ww * 0.92} c={GOLD} o={0.24 * on} z={-3} hh={200} />}
    </div>
  );
};

/* =========================================================================
   7 · THE FLOOR — hatches, benches, the belt, the splitter
   ====================================================================== */

export const Hatch: React.FC<{ x: number; y: number; open: number; s?: number; z?: number;
  c?: string; f: number }> = ({ x, y, open, s = 1, z = 22, c = "#3E2E20", f }) => (
  <div style={{ position: "absolute", left: x - 62 * s, top: y - 16 * s, width: 124 * s,
    height: 34 * s, zIndex: z }}>
    <div style={{ position: "absolute", inset: 0, borderRadius: 4 * s, background: "#0C0906",
      border: `${3 * s}px solid ${dkh(c, 0.44)}` }} />
    {open > 0.04 && <div style={{ position: "absolute", left: 6 * s, right: 6 * s, top: 5 * s,
      bottom: 5 * s, borderRadius: 3 * s,
      background: `linear-gradient(180deg, ${hexa("#F2A24A", 0.62 * open)} 0%, ${hexa("#E06A2C", 0.18 * open)} 100%)` }} />}
    {/* the two leaves, swinging open */}
    {[-1, 1].map(sgn => (
      <div key={"hl" + sgn} style={{ position: "absolute",
        left: sgn < 0 ? 0 : 62 * s, top: 0, width: 62 * s, height: 34 * s,
        transformOrigin: sgn < 0 ? "0% 50%" : "100% 50%",
        transform: `rotate(${sgn * open * 46}deg)`, borderRadius: 3 * s,
        background: `linear-gradient(180deg, ${mxh(c, 0.16)} 0%, ${dkh(c, 0.36)} 100%)`,
        border: `${3 * s}px solid ${dkh(c, 0.56)}` }} />
    ))}
  </div>
);

/** a real workbench: legs, a stretcher, a top with a lip, a vice and a tool rail */
export const Bench: React.FC<{ x: number; y: number; w?: number; s?: number; z?: number;
  c?: string }> = ({ x, y, w: ww = 190, s = 1, z = 40, c = "#5A3E26" }) => (
  <div style={{ position: "absolute", left: x - ww / 2, top: y - 88 * s, width: ww, zIndex: z }}>
    <div style={{ position: "absolute", left: 0, top: 0, width: ww, height: 18 * s, borderRadius: 3 * s,
      background: `linear-gradient(180deg, ${mxh(c, 0.24)} 0%, ${dkh(c, 0.20)} 100%)` }} />
    <div style={{ position: "absolute", left: -5 * s, top: 16 * s, width: ww + 10 * s, height: 8 * s,
      background: dkh(c, 0.44) }} />
    {[10, ww - 26].map((lx, i) => (
      <div key={"lg" + i} style={{ position: "absolute", left: lx, top: 24 * s, width: 16 * s,
        height: 64 * s, background: dkh(c, 0.40) }} />
    ))}
    <div style={{ position: "absolute", left: 14 * s, top: 62 * s, width: ww - 34 * s, height: 9 * s,
      background: dkh(c, 0.50) }} />
    {/* the vice */}
    <div style={{ position: "absolute", left: ww - 52 * s, top: -14 * s, width: 40 * s, height: 20 * s,
      borderRadius: 3 * s, background: SLATE, border: `${2 * s}px solid ${dkh(SLATE, 0.44)}` }} />
    {/* the tool rail */}
    {[0, 1, 2].map(i => (
      <div key={"tl" + i} style={{ position: "absolute", left: (16 + i * 22) * s, top: -22 * s,
        width: 7 * s, height: 22 * s, borderRadius: 3 * s, background: ["#8E96A2", "#B4402E", "#C9A15A"][i] }} />
    ))}
  </div>
);

/** the belt the bench floor ships onto — a full-width travelling band with real
    slats and a light/shadow alternation, so it registers rather than crawling. */
export const Belt: React.FC<{ x: number; y: number; w: number; f: number; z?: number;
  rate?: number; c?: string; load?: Array<{ k: number; c: string }> }> =
  ({ x, y, w: ww, f, z = 30, rate = 3.4, c = SLATE, load = [] }) => (
  <div style={{ position: "absolute", left: x, top: y, width: ww, zIndex: z }}>
    <div style={{ position: "absolute", left: 0, top: 0, width: ww, height: 30, overflow: "hidden",
      borderRadius: 4, background: dkh(c, 0.56), border: `3px solid ${dkh(c, 0.68)}` }}>
      {Array.from({ length: Math.ceil(ww / 34) + 4 }, (_, i) => (
        <div key={"sl" + i} style={{ position: "absolute", top: 0, height: 30, width: 17,
          left: ((i * 34 + f * rate) % (ww + 68) + ww + 68) % (ww + 68) - 34,
          background: i % 2 ? "#0B0E12" : mxh(c, 0.34) }} />
      ))}
    </div>
    {/* the rollers at each end */}
    {[0, 1].map(i => (
      <div key={"rl" + i} style={{ position: "absolute", left: i ? ww - 22 : 0, top: -6,
        width: 22, height: 42, borderRadius: 11, background: dkh(c, 0.30),
        border: `3px solid ${mxh(c, 0.16)}` }} />
    ))}
    {/* finished work riding it — each piece a real little stack, not a dot */}
    {load.map((L, i) => (
      <div key={"ld" + i} style={{ position: "absolute", top: -28,
        left: ((L.k * (ww + 120) + f * rate) % (ww + 120) + ww + 120) % (ww + 120) - 60,
        width: 46, height: 32, borderRadius: 4, background: L.c,
        border: `3px solid ${dkh(L.c, 0.44)}` }}>
        <div style={{ position: "absolute", left: 4, top: 4, right: 4, height: 7, borderRadius: 2,
          background: hexa("#FFFFFF", 0.44) }} />
        <div style={{ position: "absolute", left: 4, top: 15, width: 22, height: 5, borderRadius: 2,
          background: hexa("#000000", 0.34) }} />
      </div>
    ))}
  </div>
);

/** the splitter: one bright stream in, five out. The literal "fan out". */
export const Splitter: React.FC<{ x: number; y: number; f: number; at: number; n?: number;
  s?: number; z?: number; span?: number; c?: string }> =
  ({ x, y, f, at, n = 5, s = 1, z = 46, span = 720, c = GOLD }) => {
  const lf = f - at;
  return (
    <div style={{ position: "absolute", left: 0, top: 0, zIndex: z }}>
      {/* the manifold body */}
      <div style={{ position: "absolute", left: x - 78 * s, top: y - 30 * s, width: 156 * s,
        height: 60 * s, borderRadius: 9 * s, boxShadow: SH,
        background: `linear-gradient(174deg, ${mxh(BRASS, 0.24)} 0%, ${BRASS} 44%, ${dkh(BRASS, 0.44)} 100%)`,
        border: `${4 * s}px solid ${dkh(BRASS, 0.56)}` }}>
        {[0, 1, 2].map(i => (
          <div key={"mb" + i} style={{ position: "absolute", left: (16 + i * 42) * s, top: 10 * s,
            width: 26 * s, height: 34 * s, borderRadius: 4 * s, background: dkh(BRASS, 0.34) }} />
        ))}
      </div>
      {/* the inlet pipe */}
      <div style={{ position: "absolute", left: x - 13 * s, top: y - 130 * s, width: 26 * s,
        height: 104 * s, background: dkh(BRASS, 0.36) }} />
      {/* the five outlets and their charges travelling down */}
      {Array.from({ length: n }, (_, i) => {
        const tx = x - span / 2 + (span / (n - 1)) * i;
        const t = E(lf, 6 + i * 2, 24 + i * 2, 0, 1, IO);
        return (
          <React.Fragment key={"ot" + i}>
            <div style={{ position: "absolute", left: Math.min(x, tx), top: y + 26 * s,
              width: Math.abs(tx - x) + 12 * s, height: 12 * s, background: dkh(BRASS, 0.48) }} />
            <div style={{ position: "absolute", left: tx - 8 * s, top: y + 26 * s, width: 16 * s,
              height: 74 * s, background: dkh(BRASS, 0.44) }} />
            {t > 0 && t < 1 && (
              <div style={{ position: "absolute", left: x + (tx - x) * Math.min(1, t * 1.7) - 17 * s,
                top: y + 20 * s + Math.max(0, t - 0.58) * 150 * s, width: 34 * s, height: 34 * s,
                borderRadius: 6 * s, background: c, border: `${3 * s}px solid ${dkh(c, 0.40)}` }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

/* =========================================================================
   8 · THE COST — a drum that drains. ⛔ NO CURRENCY (honesty ledger 1).
   ====================================================================== */
export const TokenDrum: React.FC<{ x: number; y: number; level: number; f: number; s?: number;
  z?: number; hit?: number }> =
  ({ x, y, level, f, s = 1, z = 48, hit = -99 }) => {
  const bw = 224 * s, bh = 268 * s;
  const kick = f - hit >= 0 && f - hit < 8 ? (1 - (f - hit) / 8) * 5 : 0;
  return (
    <div style={{ position: "absolute", left: x - bw / 2, top: y - bh, width: bw, height: bh,
      zIndex: z, transform: `translateY(${kick}px)` }}>
      {/* the riveted shell */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 14 * s, boxShadow: SH_D,
        background: `linear-gradient(94deg, ${mxh(OXIDE, 0.18)} 0%, ${OXIDE} 34%, ${dkh(OXIDE, 0.52)} 100%)`,
        border: `${5 * s}px solid ${dkh(OXIDE, 0.62)}` }} />
      {[0.14, 0.86].map((k, i) => (
        <div key={"hp" + i} style={{ position: "absolute", left: -6 * s, right: -6 * s,
          top: `${k * 100}%`, height: 18 * s, background: dkh(OXIDE, 0.44) }} />
      ))}
      {Array.from({ length: 10 }, (_, i) => (
        <div key={"rv" + i} style={{ position: "absolute", left: (14 + (i % 5) * 48) * s,
          top: i < 5 ? 20 * s : bh - 34 * s, width: 10 * s, height: 10 * s, borderRadius: 10 * s,
          background: dkh(OXIDE, 0.66) }} />
      ))}
      {/* the sight glass — the level FALLS in steps and it is the hero of the shot */}
      <div style={{ position: "absolute", left: bw * 0.5 - 34 * s, top: 44 * s, width: 68 * s,
        height: bh - 108 * s, borderRadius: 7 * s, overflow: "hidden",
        background: "#120A06", border: `${4 * s}px solid ${dkh(BRASS, 0.34)}` }}>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0,
          height: `${Math.max(0, Math.min(1, level)) * 100}%`,
          background: `linear-gradient(180deg, ${mxh(EMBER, 0.22)} 0%, ${dkh(EMBER, 0.20)} 100%)` }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 5 * s,
            background: mxh(GOLD, 0.30) }} />
        </div>
        {[0.25, 0.5, 0.75].map((k, i) => (
          <div key={"gl" + i} style={{ position: "absolute", left: 0, right: 0,
            top: `${k * 100}%`, height: 2 * s, background: hexa("#000000", 0.44) }} />
        ))}
      </div>
      {/* the gauge: a real dial with a needle that swings to the level */}
      <div style={{ position: "absolute", left: bw * 0.5 - 44 * s, top: -46 * s, width: 88 * s,
        height: 88 * s, borderRadius: "50%", background: "#EDE6D4",
        border: `${6 * s}px solid ${dkh(BRASS, 0.42)}`, overflow: "hidden" }}>
        {Array.from({ length: 9 }, (_, i) => (
          <div key={"tk" + i} style={{ position: "absolute", left: 40 * s, top: 6 * s, width: 3 * s,
            height: 11 * s, background: i < 3 ? RED : "#4A4436", transformOrigin: `50% ${38 * s}px`,
            transform: `rotate(${-118 + i * 29.5}deg)` }} />
        ))}
        <div style={{ position: "absolute", left: 40 * s, top: 12 * s, width: 4 * s, height: 34 * s,
          background: RED, transformOrigin: "50% 100%", borderRadius: 2 * s,
          transform: `rotate(${-118 + Math.max(0, Math.min(1, level)) * 236}deg)` }} />
        <div style={{ position: "absolute", left: 36 * s, top: 42 * s, width: 12 * s, height: 12 * s,
          borderRadius: 12 * s, background: "#2A2620" }} />
      </div>
      {/* the tap at the foot, with its drip */}
      <div style={{ position: "absolute", left: bw * 0.5 - 13 * s, top: bh - 8 * s, width: 26 * s,
        height: 26 * s, background: dkh(BRASS, 0.30), borderRadius: 4 * s }} />
    </div>
  );
};

/** the big two-handed switch that unleashes the hall */
export const KnifeSwitch: React.FC<{ x: number; y: number; k: number; s?: number; z?: number }> =
  ({ x, y, k, s = 1, z = 60 }) => (
  <div style={{ position: "absolute", left: x - 60 * s, top: y - 96 * s, width: 120 * s,
    height: 130 * s, zIndex: z }}>
    <div style={{ position: "absolute", inset: 0, borderRadius: 8 * s,
      background: `linear-gradient(174deg, #3A322A 0%, #201B16 100%)`,
      border: `${4 * s}px solid #14100D`, boxShadow: SH }} />
    {[0, 1].map(i => (
      <div key={"jw" + i} style={{ position: "absolute", left: (24 + i * 52) * s, top: 92 * s,
        width: 22 * s, height: 26 * s, borderRadius: 3 * s, background: BRASS }} />
    ))}
    {[0, 1].map(i => (
      <div key={"bd" + i} style={{ position: "absolute", left: (28 + i * 52) * s, top: 22 * s,
        width: 14 * s, height: 78 * s, borderRadius: 4 * s, transformOrigin: "50% 8%",
        transform: `rotate(${(1 - k) * -62}deg)`,
        background: `linear-gradient(90deg, ${mxh(BRASS, 0.30)} 0%, ${dkh(BRASS, 0.34)} 100%)` }} />
    ))}
    <div style={{ position: "absolute", left: 24 * s, top: 12 * s, width: 72 * s, height: 16 * s,
      borderRadius: 8 * s, transformOrigin: "50% 62%",
      transform: `rotate(${(1 - k) * -62}deg)`, background: "#B4402E" }} />
    <div style={{ position: "absolute", left: 30 * s, top: 118 * s, width: 60 * s, height: 8 * s,
      borderRadius: 4 * s, background: k > 0.5 ? GREEN : "#2E2A24" }} />
  </div>
);

/** ⭐ THE PLUNGER, AND WHY IT REPLACED A THROW-LEVER. A lever's knob swings on a
    136px radius, so wherever the hero stands the connecting forearm is either
    189px long at one end of the throw or drawn straight through his own body at
    the other — the frame strip showed it as a long red POLE across his chest for
    forty frames. A plunger has no such geometry problem: the hero stands behind
    it, both arms come DOWN onto the cap, and the connecting forearm is 50-70px
    and vertical at every point of the stroke.
    ⭐ It is also the better category read. A detonator plunger says PRESS TO FIRE
    without a label, which is exactly what line 1 of the prompt does. Its drive is
    a real distance: the cap travels 76px, 28% of the hero's own height. */
export const Plunger: React.FC<{ x: number; y: number; k: number; s?: number; z?: number;
  c?: string }> = ({ x, y, k, s = 1, z = 60, c = "#B4402E" }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
    {/* the cast base box, with its bolt ring and a maker's plate */}
    <div style={{ position: "absolute", left: -76 * s, top: 0, width: 152 * s, height: 96 * s,
      borderRadius: 9 * s, boxShadow: SH_D,
      background: `linear-gradient(172deg, #5A616B 0%, #333941 44%, #1C2027 100%)`,
      border: `${4 * s}px solid #14171C` }}>
      <div style={{ position: "absolute", left: 16 * s, top: 20 * s, width: 120 * s,
        height: 34 * s, borderRadius: 5 * s, background: "#20242B" }} />
      {[0, 1, 2].map(i => (
        <div key={"pl" + i} style={{ position: "absolute", left: (24 + i * 42) * s, top: 28 * s,
          width: 26 * s, height: 18 * s, borderRadius: 3 * s,
          background: k > 0.5 ? GREEN : "#2E343C" }} />
      ))}
      {[[-60, 74], [44, 74]].map((q, i) => (
        <div key={"bo" + i} style={{ position: "absolute", left: q[0] * s + 76 * s, top: q[1] * s,
          width: 11 * s, height: 11 * s, borderRadius: 11 * s, background: "#12151A" }} />
      ))}
    </div>
    {/* the shaft — it is what the travel is measured against */}
    <div style={{ position: "absolute", left: -13 * s, top: -84 * s + k * 76 * s, width: 26 * s,
      height: (92 + 76 * (1 - k)) * s, borderRadius: 6 * s,
      background: `linear-gradient(90deg, #A6ADB8 0%, #666D78 58%, #3A4048 100%)` }} />
    {/* the T-cap the hero drives */}
    <div style={{ position: "absolute", left: -74 * s, top: -108 * s + k * 76 * s, width: 148 * s,
      height: 34 * s, borderRadius: 8 * s, boxShadow: SH,
      background: `linear-gradient(180deg, ${mxh(c, 0.32)} 0%, ${c} 46%, ${dkh(c, 0.42)} 100%)`,
      border: `${4 * s}px solid ${dkh(c, 0.56)}` }} />
    {[-52, 52].map((gx, i) => (
      <div key={"gr" + i} style={{ position: "absolute", left: gx * s - 14 * s,
        top: -122 * s + k * 76 * s, width: 28 * s, height: 22 * s, borderRadius: 6 * s,
        background: dkh(c, 0.30) }} />
    ))}
  </div>
);

