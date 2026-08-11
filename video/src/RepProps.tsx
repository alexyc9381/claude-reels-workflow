import React from "react";
import { Img, staticFile } from "remotion";
import { inter, fraunces } from "./fonts";
import { MONO, Mascot } from "./SlopKit";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, mxh, dkh, SH, SH_D, rnd,
  GOLD, RED, GREEN, PAPER, INK, CLAY, CANVAS, CANVAS2, ROPE, ROPED,
  POST_R, POST_B, BRASS, BRASSD, BRASSL, CROWD, Contact, Stencil,
} from "./RepWorld";

/* ===========================================================================
   REEL 99 "REPO" · THE PROP LIBRARY — a tag-team title fight.

   ⛔ SOLID PAINTS ONLY, no `0 0 Npx <colour>` glow anywhere. Brass reads as
      brass because BRASSD / BRASS / BRASSL are stacked in the right order.
   ⛔ EVERY TRANSFORMED WRAPPER CARRIES AN EXPLICIT zIndex.
   ⛔⛔ THE MARK NEVER COVERS THE MASCOT'S FACE. The box Mascot has no separate
      head — the body rect (y 44..146 of a 200 viewBox) IS the face, eyes at
      y 70..96. So a fighter's provider mark goes on a NAME BOARD ABOVE him or
      on the banner BEHIND him, never on his chest. That constraint is also what
      makes the marks big: a board above the head can be 120px wide when a chest
      badge could only ever be 40.
   ========================================================================= */

/** the fighter's overhead name board — the mark at 96-130px, clear of the face. */
export const NameBoard: React.FC<{ x: number; y: number; w?: number; z?: number;
  markKey?: string; name: string; hasMark?: boolean; dim?: number }> =
  ({ x, y, w: ww = 150, z = 78, markKey, name, hasMark, dim = 0 }) => (
  <div style={{ position: "absolute", left: x - ww / 2, top: y, width: ww, zIndex: z,
    borderRadius: 9, background: dim ? "#CFC7B4" : "#F7F3E8",
    border: `4px solid ${BRASSD}`, boxShadow: SH, padding: "7px 6px 6px",
    display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
    {hasMark && markKey
      ? <Img src={staticFile(`logos/${markKey}.svg`)}
          style={{ width: ww * 0.44, height: ww * 0.44, objectFit: "contain" }} />
      : <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900,
          fontSize: ww * (name.length > 8 ? 0.15 : 0.21), lineHeight: 1.02,
          color: "#241F17", textAlign: "center" }}>{name}</span>}
    {hasMark && <span style={{ fontFamily: inter.fontFamily, fontWeight: 900,
      fontSize: ww * 0.098, letterSpacing: "0.05em", color: "#6B6355" }}>{name}</span>}
  </div>
);

/** a fighter in the corner. The Mascot, a robe, gloves, and the mark above.
    `tint` separates the corner (slate) from Claude (clay) so the hero ranks by
    COLOUR and never has to be found. */
export const Fighter: React.FC<{ x: number; base: number; s?: number; z?: number; f: number;
  markKey?: string; name?: string; hasMark?: boolean; tint?: string; robe?: string;
  gassed?: number; cheer?: number; shock?: number; gaze?: number; board?: boolean;
  armUp?: number }> =
  ({ x, base, s = 1, z = 60, f, markKey, name, hasMark, tint = "#7C8496",
     robe = "#5E6B80", gassed = 0, cheer = 0, shock = 0, gaze = 0, board = true,
     armUp = 0 }) => {
  const SZ = 230 * s;
  const sag = gassed * 16 * s;
  return (<>
    <Contact x={x - SZ * 0.34} y={base - 10 * s} w={SZ * 0.68} z={z - 2} o={0.4} />
    {/* the robe, BEHIND the body — colour mass so a fighter is not a bare box */}
    <div style={{ position: "absolute", left: x - SZ * 0.36, top: base - SZ * 0.60 + sag,
      width: SZ * 0.72, height: SZ * 0.56, borderRadius: `${SZ * 0.10}px ${SZ * 0.10}px 0 0`,
      background: robe, zIndex: z - 1, boxShadow: SH }} />
    <div style={{ position: "absolute", left: x - SZ * 0.36, top: base - SZ * 0.60 + sag,
      width: SZ * 0.16, height: SZ * 0.56, background: mxh(robe, 0.20), zIndex: z - 1 }} />
    <div style={{ position: "absolute", left: x - (SZ) / 2, top: base - SZ + sag, zIndex: z }}>
      <Mascot lf={f} size={SZ} tint={tint} gaze={gaze} cheer={cheer} shock={shock}
        stern={gassed > 0.4 ? 1 : 0} nodAmp={gassed > 0.4 ? 1.2 : 3.0} nodSpeed={11} />
    </div>
    {/* the gloves — the one thing a tag needs to be legible */}
    {[-1, 1].map((sd) => (
      <div key={"gl" + sd} style={{ position: "absolute",
        left: x + sd * SZ * 0.40 - SZ * 0.085,
        top: base - SZ * 0.50 + sag - (sd > 0 ? armUp * SZ * 0.30 : 0),
        width: SZ * 0.17, height: SZ * 0.20, borderRadius: `${SZ * 0.085}px`,
        background: CLAY === tint ? "#B8543A" : "#8E3F30", zIndex: z + 3, boxShadow: SH }}>
        <div style={{ position: "absolute", left: "16%", top: "12%", width: "34%",
          height: "30%", borderRadius: "50%", background: mxh("#B8543A", 0.30) }} />
      </div>
    ))}
    {board && name && (
      <NameBoard x={x} y={base - SZ - 78 * s} w={150 * s} z={z + 8}
        markKey={markKey} name={name} hasMark={hasMark} dim={gassed > 0.4 ? 1 : 0} />
    )}
  </>);
};

/** THE TAG. Two gloves an inch apart, then meeting. `t` 0..1 closes the gap.
    This is the hook's frozen moment and the reel's whole mechanism in one prop. */
export const Tag: React.FC<{ x: number; y: number; s?: number; z?: number; t: number;
  f?: number }> = ({ x, y, s = 1, z = 90, t, f = 0 }) => {
  const gap = (1 - t) * 84 * s;
  const G = 104 * s;
  return (<>
    {/* the incoming glove, Claude's side */}
    <div style={{ position: "absolute", left: x - gap / 2 - G, top: y - G / 2,
      width: G, height: G * 0.9, borderRadius: `${G * 0.44}px`, background: "#B8543A",
      zIndex: z, boxShadow: SH_D }}>
      <div style={{ position: "absolute", left: "14%", top: "12%", width: "36%",
        height: "30%", borderRadius: "50%", background: mxh("#B8543A", 0.32) }} />
      <div style={{ position: "absolute", right: -G * 0.10, top: G * 0.22, width: G * 0.22,
        height: G * 0.46, borderRadius: 6, background: "#8E3F30" }} />
    </div>
    {/* the fresh glove, the corner's side */}
    <div style={{ position: "absolute", left: x + gap / 2, top: y - G / 2,
      width: G, height: G * 0.9, borderRadius: `${G * 0.44}px`, background: "#5E6B80",
      zIndex: z, boxShadow: SH_D }}>
      <div style={{ position: "absolute", right: "14%", top: "12%", width: "36%",
        height: "30%", borderRadius: "50%", background: mxh("#5E6B80", 0.32) }} />
      <div style={{ position: "absolute", left: -G * 0.10, top: G * 0.22, width: G * 0.22,
        height: G * 0.46, borderRadius: 6, background: "#44506180" }} />
    </div>
    {/* the contact burst, three frames of solid rays */}
    {t > 0.97 && Array.from({ length: 8 }, (_, i) => (
      <div key={"bz" + i} style={{ position: "absolute", left: x - 5, top: y - 5,
        width: 10, height: 52 * s, borderRadius: 5, background: "#F6EBD2",
        zIndex: z + 2, transformOrigin: "50% 0%",
        transform: `rotate(${i * 45}deg) translateY(${34 * s}px)` }} />
    ))}
  </>);
};

/* =========================================================================
   THE BOARDS — where the real numbers live, at a size that reads on mute.
   ====================================================================== */

/** the arena totaliser: the reel's number spine, on a flip-board. */
export const RoundBoard: React.FC<{ x: number; y: number; v: string; sub: string;
  s?: number; z?: number; small?: string }> =
  ({ x, y, v, sub, s = 1, z = 86, small }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    background: "#241F19", borderRadius: 12 * s, padding: `${16 * s}px ${26 * s}px`,
    border: `${6 * s}px solid ${BRASSD}`, boxShadow: SH_D, textAlign: "center" }}>
    <div style={{ fontFamily: MONO, fontWeight: 800, fontSize: 20 * s, letterSpacing: "0.22em",
      color: "#B9A87C" }}>{sub}</div>
    <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 74 * s,
      lineHeight: 1.04, letterSpacing: "-0.02em", color: "#F6E9CC" }}>{v}</div>
    {small && <div style={{ marginTop: 6 * s, paddingTop: 6 * s,
      borderTop: `3px solid #4A4032`, fontFamily: inter.fontFamily, fontWeight: 900,
      fontSize: 22 * s, letterSpacing: "0.04em", color: "#C9B98E" }}>{small}</div>}
  </div>
);

/** the corner's roster board — the HIERARCHY MECHANISM. Each provider gets a
    row whose bar is how many rounds it is good for, and the bars are the reason
    you can see "individually a toy" without reading a word. */
export const Roster: React.FC<{ x: number; y: number; n?: number; s?: number; z?: number;
  f?: number; lit?: number; pooled?: number }> =
  ({ x, y, n = 6, s = 1, z = 70, f = 0, lit = 99, pooled = 0 }) => {
  const RW = 420 * s, RH = 46 * s;
  return (<>
    <div style={{ position: "absolute", left: x - 18 * s, top: y - 46 * s,
      width: RW + 36 * s, height: RH * n + 96 * s, borderRadius: 10 * s,
      background: "#241F19", border: `${5 * s}px solid ${BRASSD}`, zIndex: z,
      boxShadow: SH_D }} />
    <div style={{ position: "absolute", left: x, top: y - 34 * s, zIndex: z + 1,
      fontFamily: MONO, fontWeight: 800, fontSize: 19 * s, letterSpacing: "0.20em",
      color: "#B9A87C" }}>FREE ROUNDS PER CORNER</div>
    {Array.from({ length: n }, (_, i) => {
      const w = (0.13 + rnd(i, 5) * 0.16) * RW;                 /* each is a toy */
      const on = i < lit;
      return (<React.Fragment key={"rr" + i}>
        <div style={{ position: "absolute", left: x, top: y + i * RH, width: RW,
          height: RH - 10 * s, borderRadius: 5, background: "#332C22", zIndex: z + 1 }} />
        <div style={{ position: "absolute", left: x, top: y + i * RH, width: on ? w : 6 * s,
          height: RH - 10 * s, borderRadius: 5, background: on ? GOLD : "#4A4032",
          zIndex: z + 2 }} />
      </React.Fragment>);
    })}
    {/* the pooled bar: every row's length, end to end, on one rail */}
    {pooled > 0 && (<>
      <div style={{ position: "absolute", left: x, top: y + n * RH + 12 * s, width: RW,
        height: RH - 6 * s, borderRadius: 5, background: "#332C22", zIndex: z + 1 }} />
      <div style={{ position: "absolute", left: x, top: y + n * RH + 12 * s,
        width: RW * Math.min(1, pooled), height: RH - 6 * s, borderRadius: 5,
        background: CLAY, zIndex: z + 3 }} />
      <div style={{ position: "absolute", left: x + 12 * s, top: y + n * RH + 20 * s,
        zIndex: z + 4, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 24 * s,
        letterSpacing: "0.04em", color: "#2A1D10" }}>ALL 29, ONE CORNER</div>
    </>)}
  </>);
};

/* =========================================================================
   THE VILLAIN — the box office. Buy ONE ticket, for ONE fighter, per month.
   ====================================================================== */
export const Booth: React.FC<{ x: number; base: number; s?: number; z?: number; f?: number;
  price?: string; sold?: number }> =
  ({ x, base, s = 1, z = 50, f = 0, price = "$0", sold = 0 }) => {
  const bw = 340 * s, bh = 300 * s;
  return (<>
    <Contact x={x - bw * 0.55} y={base - 6} w={bw * 1.1} z={z - 1} o={0.44} />
    <div style={{ position: "absolute", left: x - bw / 2, top: base - bh, width: bw, height: bh,
      borderRadius: 10, background: "#4C565E", zIndex: z, boxShadow: SH_D }} />
    <div style={{ position: "absolute", left: x - bw / 2, top: base - bh, width: bw,
      height: 22 * s, borderRadius: "10px 10px 0 0", background: "#5E6970", zIndex: z + 1 }} />
    {/* the sour green lamp — the only light this scene owns */}
    <div style={{ position: "absolute", left: x - 34 * s, top: base - bh - 30 * s,
      width: 68 * s, height: 34 * s, borderRadius: "34px 34px 0 0", background: "#6E7C6A",
      zIndex: z + 2 }} />
    <div style={{ position: "absolute", left: x - 25 * s, top: base - bh - 20 * s,
      width: 50 * s, height: 20 * s, borderRadius: "25px 25px 0 0", background: "#A8BE9E",
      zIndex: z + 3 }} />
    {/* the price board */}
    <div style={{ position: "absolute", left: x - bw * 0.40, top: base - bh + 40 * s,
      width: bw * 0.80, height: 108 * s, borderRadius: 8, background: "#241F19",
      border: `${5 * s}px solid #6E6A5E`, zIndex: z + 4, boxShadow: SH,
      display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 62 * s,
        letterSpacing: "-0.02em", color: "#E8DCBA" }}>{price}</span>
    </div>
    <div style={{ position: "absolute", left: x - bw * 0.40, top: base - bh + 158 * s,
      width: bw * 0.80, textAlign: "center", zIndex: z + 5, fontFamily: MONO,
      fontWeight: 800, fontSize: 20 * s, letterSpacing: "0.14em",
      color: "#B6BEC4" }}>ONE FIGHTER / MONTH</div>
    {/* the wicket */}
    <div style={{ position: "absolute", left: x - bw * 0.22, top: base - bh + 200 * s,
      width: bw * 0.44, height: 70 * s, borderRadius: 6, background: "#20262B",
      zIndex: z + 4 }} />
    {/* the tickets that came out of it */}
    {Array.from({ length: sold }, (_, i) => (
      <div key={"tk" + i} style={{ position: "absolute",
        left: x - 40 * s + i * 26 * s, top: base - bh + 214 * s + i * 9 * s,
        width: 84 * s, height: 44 * s, borderRadius: 5, background: "#D8CDB2",
        border: `${3 * s}px solid #9A8F74`, zIndex: z + 6 + i, boxShadow: SH,
        transform: `rotate(${-8 + i * 7}deg)` }} />
    ))}
  </>);
};

/** a queueing silhouette. ⛔ never a second detailed character. */
export const Waiting: React.FC<{ x: number; base: number; s?: number; z?: number; c?: string }> =
  ({ x, base, s = 1, z = 40, c = "#2E373E" }) => (<>
    <div style={{ position: "absolute", left: x - 32 * s, top: base - 96 * s, width: 64 * s,
      height: 78 * s, borderRadius: `${16 * s}px ${16 * s}px 4px 4px`, background: c, zIndex: z }} />
    <div style={{ position: "absolute", left: x - 20 * s, top: base - 24 * s, width: 15 * s,
      height: 24 * s, background: c, zIndex: z }} />
    <div style={{ position: "absolute", left: x + 6 * s, top: base - 24 * s, width: 15 * s,
      height: 24 * s, background: c, zIndex: z }} />
    <Contact x={x - 34 * s} y={base - 8 * s} w={68 * s} z={z - 1} o={0.34} />
  </>);

/* =========================================================================
   THE MECHANISM PROPS
   ====================================================================== */

/** the 429 towel, thrown in over a gassed fighter. The rate limit, named. */
export const Towel429: React.FC<{ x: number; y: number; s?: number; z?: number; t: number }> =
  ({ x, y, s = 1, z = 92, t }) => {
  if (t <= 0.01) return null;
  const drop = (1 - t) * -150 * s;
  return (
    <div style={{ position: "absolute", left: x - 116 * s, top: y + drop, zIndex: z,
      transform: `rotate(${-9 + (1 - t) * 26}deg)`, transformOrigin: "50% 0%", opacity: t }}>
      <div style={{ width: 232 * s, height: 92 * s, borderRadius: 8 * s, background: "#F2ECDC",
        border: `${5 * s}px solid #C9BFA6`, boxShadow: SH_D, display: "flex",
        alignItems: "center", justifyContent: "center", gap: 12 * s }}>
        <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 56 * s,
          lineHeight: 1, color: RED }}>429</span>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 20 * s,
          letterSpacing: "0.04em", color: "#6B6355", textAlign: "left" }}>RATE<br />LIMIT</span>
      </div>
      {[0, 1, 2].map((i) => (
        <div key={"fd" + i} style={{ position: "absolute", left: 18 * s + i * 72 * s,
          top: 88 * s, width: 56 * s, height: 26 * s, borderRadius: "0 0 8px 8px",
          background: "#E4DCC8" }} />
      ))}
    </div>
  );
};

/** the belt — the CTA object, and the only place the keyword is cast. */
export const Belt: React.FC<{ x: number; y: number; s?: number; z?: number; word: string }> =
  ({ x, y, s = 1, z = 90, word }) => (
  <div style={{ position: "absolute", left: x - 300 * s, top: y, zIndex: z }}>
    {/* the strap */}
    <div style={{ position: "absolute", left: 0, top: 44 * s, width: 600 * s, height: 96 * s,
      borderRadius: 10 * s, background: "#5B3E28", boxShadow: SH_D }} />
    <div style={{ position: "absolute", left: 0, top: 44 * s, width: 600 * s, height: 16 * s,
      borderRadius: "10px 10px 0 0", background: "#7A5636" }} />
    {[40, 520].map((lx, i) => (
      <div key={"pl" + i} style={{ position: "absolute", left: lx * s, top: 56 * s,
        width: 64 * s, height: 72 * s, borderRadius: 10 * s, background: BRASS,
        border: `${4 * s}px solid ${BRASSD}`, boxSizing: "border-box", zIndex: 2 }} />
    ))}
    {/* the centre plate */}
    <div style={{ position: "absolute", left: 148 * s, top: 0, width: 304 * s, height: 186 * s,
      borderRadius: 18 * s, background: BRASS, border: `${8 * s}px solid ${BRASSD}`,
      boxSizing: "border-box", boxShadow: SH_D, zIndex: 3, display: "flex",
      flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <span style={{ fontFamily: MONO, fontWeight: 800, fontSize: 22 * s,
        letterSpacing: "0.24em", color: "#4A3410" }}>COMMENT</span>
      <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 86 * s,
        lineHeight: 1.02, letterSpacing: "-0.02em", color: "#2A1D06" }}>{word}</span>
    </div>
  </div>
);

/** the ring announcer's mic, hanging — a world prop that says "this is a bout" */
export const Mic: React.FC<{ x: number; y: number; s?: number; z?: number; f?: number }> =
  ({ x, y, s = 1, z = 34, f = 0 }) => {
  const a = Math.sin(f / 58) * 1.4;
  return (
    <div style={{ position: "absolute", left: x, top: 0, zIndex: z,
      transform: `rotate(${a}deg)`, transformOrigin: "50% 0%" }}>
      <div style={{ position: "absolute", left: -3, top: 0, width: 6, height: y,
        background: "#2E343C" }} />
      <div style={{ position: "absolute", left: -22 * s, top: y, width: 44 * s, height: 62 * s,
        borderRadius: `${22 * s}px`, background: "#3C434D", boxShadow: SH }} />
      <div style={{ position: "absolute", left: -15 * s, top: y + 10 * s, width: 30 * s,
        height: 30 * s, borderRadius: "50%", background: "#5A626C" }} />
    </div>
  );
};

/** a fight poster pasted on a tunnel wall — how a mark gets to be 210px. */
export const Poster: React.FC<{ x: number; y: number; w?: number; z?: number; rot?: number;
  markKey?: string; name: string; hasMark?: boolean; sub?: string }> =
  ({ x, y, w: ww = 250, z = 40, rot = 0, markKey, name, hasMark, sub }) => (
  <div style={{ position: "absolute", left: x - ww / 2, top: y, width: ww, zIndex: z,
    transform: `rotate(${rot}deg)`, transformOrigin: "50% 50%" }}>
    <div style={{ width: ww, height: ww * 1.28, borderRadius: 6, background: "#F7F3E8",
      border: `5px solid #C9BFA6`, boxSizing: "border-box", boxShadow: SH_D,
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", gap: ww * 0.045, padding: ww * 0.06 }}>
      <span style={{ fontFamily: MONO, fontWeight: 800, fontSize: ww * 0.062,
        letterSpacing: "0.20em", color: "#9A9080" }}>FREE TIER</span>
      {hasMark && markKey
        ? <Img src={staticFile(`logos/${markKey}.svg`)}
            style={{ width: ww * 0.62, height: ww * 0.62, objectFit: "contain" }} />
        : <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900,
            fontSize: ww * (name.length > 8 ? 0.15 : 0.21), lineHeight: 1.04,
            color: "#241F17", textAlign: "center" }}>{name}</span>}
      <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: ww * 0.088,
        letterSpacing: "0.04em", color: "#4A4238", textAlign: "center" }}>{name}</span>
      {sub && <span style={{ fontFamily: MONO, fontWeight: 800, fontSize: ww * 0.062,
        letterSpacing: "0.08em", color: "#9A9080" }}>{sub}</span>}
    </div>
  </div>
);
