import React from "react";
import { Img, staticFile } from "remotion";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D,
  Crew, Puff, Ring, Contact,
  CLAY, CLAYD, GOLD, GREEN, RED, SKY, INK, MUTE, BRASS, SLATE, IRON, CHROME, BONE, TEAL,
  REPOS, MODELS, R, GY, repoBy, mono, ui, lerpHex,
} from "./RpsWorld";
import type { Repo } from "./RpsWorld";

/* ===========================================================================
   REEL 137 · "REPOS" — THE PROPS.  Board: storyboards/137-repos.md.

   ⛔⛔ EVERY OBJECT IS DRAWN, NOT STACKED, and every object passes the
   "say what it is" test with a noun from the subject: a PowerPoint deck, a
   Word doc, a spreadsheet, a stripping press, a markdown sheet, a monitor, a
   plugboard, a claw, a brain core, a fuel manifold, a comment box.

   ⛔⛔ CATEGORY IS STRUCTURE, NOT HUE. Before painting, the four or five
   features a viewer uses to name the thing were listed and drawn: a press has
   an intake slot, rollers, a blade, a chaff chute, an output slot; a gauge has
   a needle, a red band and E/F marks; a claw has a chain, a body and two jaws.

   ⛔⛔ THE INFORMATION IS IN THE GRAPHIC. A number MOVES to its value (the
   gauge, the tally, the dial); type is budgeted to one chip per shot and the
   UI labels a screen legitimately carries.
   ========================================================================= */

/* ---- the three Office files: real file-type icons on cards whose CONTENT
        shows the formatting the VO says breaks ---------------------------- */
export type FileKind = "ppt" | "doc" | "xls";
const FILE = {
  ppt: { c: "#D04423", icon: "ft_powerpoint.svg", label: "DECK.PPTX" },
  doc: { c: "#2B579A", icon: "ft_word.svg", label: "REPORT.DOCX" },
  xls: { c: "#217346", icon: "ft_excel.svg", label: "DATA.XLSX" },
} as const;

export const FileCard: React.FC<{ kind: FileKind; x: number; y: number; s?: number; rot?: number; z?: number;
  o?: number; squash?: number }> = ({ kind, x, y, s = 1, rot = 0, z = 60, o = 1, squash = 0 }) => {
  const F = FILE[kind];
  const WD = 128 * s, HT = 160 * s;
  return (
    <div style={{ position: "absolute", left: x - WD / 2, top: y - HT / 2, width: WD, height: HT, zIndex: z, opacity: o,
      borderRadius: 8 * s, background: "#FBF8F1", boxShadow: SH_D, overflow: "hidden",
      transform: `rotate(${rot}deg) scale(${1 + squash * 0.12}, ${1 - squash * 0.18})`, transformOrigin: "50% 50%",
      border: `${2 * s}px solid #D9D1BE` }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 30 * s, background: F.c }} />
      <div style={{ position: "absolute", left: 8 * s, top: 4 * s, width: 22 * s, height: 22 * s, borderRadius: 4 * s,
        background: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Img src={staticFile("logos/" + F.icon)} style={{ width: 18 * s, height: 18 * s }} />
      </div>
      <div style={{ position: "absolute", left: 36 * s, top: 9 * s, ...mono(10 * s, 800), color: "#FFFFFF", letterSpacing: "0.06em" }}>{F.label}</div>
      {kind === "ppt" && (<>
        <div style={{ position: "absolute", left: 12 * s, top: 40 * s, width: 70 * s, height: 9 * s, background: INK, borderRadius: 2 }} />
        {[0.9, 0.55, 0.72].map((h, i) => (
          <div key={i} style={{ position: "absolute", left: (16 + i * 30) * s, top: (60 + (1 - h) * 60) * s, width: 20 * s, height: h * 60 * s,
            background: [F.c, SKY, MUTE][i], borderRadius: 2 }} />
        ))}
        <div style={{ position: "absolute", left: 12 * s, top: 130 * s, width: 90 * s, height: 5 * s, background: hexa(INK, 0.4) }} />
        <div style={{ position: "absolute", left: 12 * s, top: 142 * s, width: 60 * s, height: 5 * s, background: hexa(INK, 0.3) }} />
      </>)}
      {kind === "doc" && (<>
        <div style={{ position: "absolute", left: 12 * s, top: 40 * s, width: 80 * s, height: 10 * s, background: INK, borderRadius: 2 }} />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} style={{ position: "absolute", left: 12 * s, top: (58 + i * 12) * s, width: (104 - (i % 3) * 22) * s,
            height: 5 * s, background: i === 3 ? F.c : hexa(INK, 0.45), borderRadius: 1 }} />
        ))}
        <div style={{ position: "absolute", left: 12 * s, top: 144 * s, width: 44 * s, height: 10 * s, background: hexa(F.c, 0.25), borderRadius: 2 }} />
      </>)}
      {kind === "xls" && (<>
        {Array.from({ length: 6 }, (_, r) => Array.from({ length: 4 }, (_, c) => (
          <div key={r + "-" + c} style={{ position: "absolute", left: (10 + c * 27) * s, top: (40 + r * 19) * s, width: 25 * s, height: 17 * s,
            background: r === 0 ? F.c : c === 0 ? hexa(F.c, 0.18) : "#FFFFFF", border: `${1 * s}px solid ${hexa(INK, 0.28)}` }}>
            {r > 0 && c > 0 && <div style={{ position: "absolute", left: 4 * s, top: 6 * s, width: (8 + ((r * 7 + c * 3) % 9)) * s, height: 4 * s, background: hexa(INK, 0.5) }} />}
          </div>
        )))}
      </>)}
    </div>
  );
};

/** an inclined feed chute from (x0,y0) to (x1,y1): a bed and two rails */
export const Chute: React.FC<{ x0: number; y0: number; x1: number; y1: number; w?: number; z?: number; c?: string }> =
  ({ x0, y0, x1, y1, w = 150, z = 34, c = IRON }) => {
  const len = Math.hypot(x1 - x0, y1 - y0);
  const ang = (Math.atan2(y1 - y0, x1 - x0) * 180) / Math.PI;
  return (
    <div style={{ position: "absolute", left: x0, top: y0 - w / 2, width: len, height: w, zIndex: z,
      transformOrigin: "0% 50%", transform: `rotate(${ang}deg)` }}>
      <div style={{ position: "absolute", inset: `${w * 0.18}px 0`, background: `linear-gradient(180deg, ${dkh(c, 0.3)}, ${mxh(c, 0.14)} 50%, ${dkh(c, 0.2)})` }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: w * 0.18, background: `linear-gradient(180deg, ${mxh(c, 0.3)}, ${dkh(c, 0.4)})`, borderRadius: 4 }} />
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: w * 0.18, background: `linear-gradient(180deg, ${mxh(c, 0.2)}, ${dkh(c, 0.5)})`, borderRadius: 4 }} />
      {Array.from({ length: Math.floor(len / 90) }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: 40 + i * 90, top: w * 0.18, width: 6, bottom: w * 0.18, background: hexa("#000000", 0.18) }} />
      ))}
    </div>
  );
};

/* ---- the broken formatting: fragments thrown out of the model and PILING UP */
const GLYPHS = ["#", "%", "|", "▯", "<>", "&", "*", "▤"];
export const Debris: React.FC<{ x: number; y: number; f: number; bursts: number[]; n?: number; seed?: number;
  z?: number; floor?: number; spread?: number }> =
  ({ x, y, f, bursts, n = 12, seed = 0, z = 70, floor = GY - 6, spread = 1 }) => {
  const g = 1.15;
  return (<>{bursts.map((at, b) => Array.from({ length: n }, (_, j) => {
    const t = f - at;
    if (t < 0) return null;
    const k = b * 100 + j + seed * 1000;
    const a = Math.PI * (0.18 + rnd(k, 1) * 0.64);           /* thrown up and out, both sides */
    const v = (12 + rnd(k, 2) * 12) * spread;
    const vx = Math.cos(a) * v * (rnd(k, 3) > 0.5 ? 1 : -1), vy = -Math.sin(a) * v;
    /* solve the landing time on the floor */
    const dy = floor - y;
    const tl = (-vy + Math.sqrt(vy * vy + 2 * g * dy)) / g;
    const tt = Math.min(t, tl);
    const px = x + vx * tt, py = y + vy * tt + 0.5 * g * tt * tt;
    const landed = t >= tl;
    const kind = j % 4;
    const col = [FILE.ppt.c, SKY, FILE.xls.c, GOLD][(j + b) % 4];
    const rot = landed ? (rnd(k, 4) - 0.5) * 60 : t * (8 + rnd(k, 5) * 10) * (j % 2 ? 1 : -1);
    const sz = 30 + rnd(k, 6) * 28;
    return (
      <div key={"db" + k} style={{ position: "absolute", left: px, top: py - (landed ? rnd(k, 7) * 26 : 0), zIndex: z + (landed ? 0 : 2),
        transform: `rotate(${rot}deg)`, opacity: landed ? 0.92 : 1 }}>
        {kind === 0 && <div style={{ width: sz * 0.5, height: sz * 1.4, background: col, borderRadius: 2, border: `2px solid ${dkh(col, 0.3)}` }} />}
        {kind === 1 && <div style={{ width: sz * 1.2, height: sz * 0.8, border: `4px solid ${hexa(INK, 0.7)}`, background: hexa("#FFFFFF", 0.6) }} />}
        {kind === 2 && <div style={{ ...mono(sz * 1.1, 900), color: INK, lineHeight: 1 }}>{GLYPHS[(j + b) % GLYPHS.length]}</div>}
        {kind === 3 && <div style={{ width: sz * 1.5, height: 8, background: col, borderRadius: 4 }} />}
      </div>
    );
  }))}</>);
};

/* =========================================================================
   THE PRESS — the anydoc machine. Intake slot, rollers, blade, chaff chute,
   bin, output slot, the flame badge, an ms dial. `feeds` are the frames each
   file enters; the machine does the rest on its own clock.
   ====================================================================== */
const Roller: React.FC<{ x: number; y: number; r: number; f: number; dir?: number }> = ({ x, y, r, f, dir = 1 }) => (
  <div style={{ position: "absolute", left: x - r, top: y - r, width: r * 2, height: r * 2, borderRadius: "50%",
    background: `conic-gradient(${CHROME} 0 12%, ${dkh(CHROME, 0.42)} 12% 25%, ${CHROME} 25% 37%, ${dkh(CHROME, 0.42)} 37% 50%, ${CHROME} 50% 62%, ${dkh(CHROME, 0.42)} 62% 75%, ${CHROME} 75% 87%, ${dkh(CHROME, 0.42)} 87%)`,
    transform: `rotate(${f * 11 * dir}deg)`, border: `4px solid ${dkh(IRON, 0.5)}` }}>
    <div style={{ position: "absolute", left: "38%", top: "38%", width: "24%", height: "24%", borderRadius: "50%", background: dkh(IRON, 0.3) }} />
  </div>
);

export const Press: React.FC<{ x: number; y: number; f: number; feeds: { at: number; kind: FileKind }[];
  s?: number; z?: number; showDial?: boolean }> = ({ x, y, f, feeds, s = 1, z = 44, showDial = true }) => {
  const anydoc = repoBy("anydoc");
  const WD = 460 * s, HT = 236 * s;
  const left = x - WD / 2, top = y - HT;
  const binLevel = feeds.reduce((acc, fd) => acc + E(f, fd.at + 14, fd.at + 40, 0, 1, OUT), 0) / Math.max(1, feeds.length);
  const lastKick = feeds.reduce((m, fd) => { const t = f - fd.at; return t >= 10 && t < 22 ? Math.max(m, 1 - (t - 10) / 12) : m; }, 0);
  const chaffColours = [FILE.ppt.c, SKY, FILE.xls.c, GOLD, RED];
  return (<>
    {/* the bin under the chaff chute, filling */}
    <div style={{ position: "absolute", left: x - 90 * s, top: y - 4, width: 180 * s, height: 96 * s, zIndex: z - 1, borderRadius: 6 * s,
      background: `linear-gradient(90deg, ${dkh(SLATE, 0.34)}, ${SLATE} 40%, ${dkh(SLATE, 0.3)})`, border: `${3 * s}px solid ${dkh(SLATE, 0.5)}`,
      overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: `${binLevel * 88}%`,
        background: `repeating-linear-gradient(35deg, ${FILE.ppt.c} 0 9px, ${SKY} 9px 17px, ${FILE.xls.c} 17px 26px, ${GOLD} 26px 33px, ${hexa(INK, 0.6)} 33px 37px)` }} />
    </div>
    {/* housing */}
    <div style={{ position: "absolute", left, top, width: WD, height: HT, zIndex: z, borderRadius: 12 * s, boxShadow: SH_D,
      background: `linear-gradient(180deg, ${mxh(GOLD, 0.22)} 0%, ${dkh(GOLD, 0.06)} 46%, ${dkh(GOLD, 0.34)} 100%)`,
      border: `${4 * s}px solid ${dkh(GOLD, 0.5)}`, transform: `translateY(${lastKick * 3}px)` }}>
      {/* the inspection window with the rollers and the blade */}
      <div style={{ position: "absolute", left: 130 * s, top: 34 * s, width: 200 * s, height: 130 * s, borderRadius: 10 * s,
        background: `linear-gradient(180deg, ${dkh(anydoc.c2, 0.5)}, ${dkh(anydoc.c2, 0.7)})`, border: `${4 * s}px solid ${dkh(IRON, 0.55)}`, overflow: "hidden" }}>
        <Roller x={64 * s} y={44 * s} r={34 * s} f={f} dir={1} />
        <Roller x={136 * s} y={44 * s} r={34 * s} f={f} dir={-1} />
        <div style={{ position: "absolute", left: 20 * s, top: 92 * s, width: 160 * s, height: 10 * s, borderRadius: 3,
          background: `linear-gradient(180deg, ${mxh(CHROME, 0.3)}, ${dkh(CHROME, 0.3)})`, transform: "rotate(-6deg)" }} />
        {/* chaff being stripped off inside the window */}
        {lastKick > 0 && Array.from({ length: 8 }, (_, i) => (
          <div key={i} style={{ position: "absolute", left: (40 + rnd(i, 3) * 120) * s, top: (60 + (1 - lastKick) * 70 + rnd(i, 4) * 20) * s,
            width: (8 + rnd(i, 5) * 10) * s, height: 6 * s, background: chaffColours[i % 5], borderRadius: 2,
            transform: `rotate(${rnd(i, 6) * 180}deg)`, opacity: lastKick }} />
        ))}
      </div>
      {/* intake slot (left) with rubber lips, output slot (right) */}
      <div style={{ position: "absolute", left: 18 * s, top: 70 * s, width: 96 * s, height: 60 * s, borderRadius: 6 * s,
        background: dkh(INK, 0), border: `${5 * s}px solid ${dkh(IRON, 0.55)}` }}>
        <div style={{ position: "absolute", left: 6 * s, right: 6 * s, top: 18 * s, height: 14 * s, background: dkh("#3A3733", 0.1), borderRadius: 4 }} />
      </div>
      <div style={{ position: "absolute", right: 18 * s, top: 86 * s, width: 90 * s, height: 30 * s, borderRadius: 4 * s,
        background: dkh(INK, 0), border: `${4 * s}px solid ${dkh(IRON, 0.55)}` }} />
      {/* the flame badge and the name stencil */}
      <div style={{ position: "absolute", left: 24 * s, top: 16 * s, width: 44 * s, height: 44 * s, borderRadius: 10 * s, background: "#FFFFFF",
        border: `${2 * s}px solid #E3D8C2`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Img src={staticFile("logos/" + anydoc.mark)} style={{ width: 32 * s, height: 32 * s, objectFit: "contain" }} />
      </div>
      <div style={{ position: "absolute", left: 76 * s, top: 22 * s, ...ui(24 * s, 900), color: INK, letterSpacing: "0.02em" }}>anydoc</div>
      <div style={{ position: "absolute", left: 24 * s, top: 150 * s, right: 24 * s, height: 10 * s,
        background: `repeating-linear-gradient(-45deg, ${INK} 0 14px, ${dkh(GOLD, 0.2)} 14px 28px)`, opacity: 0.85 }} />
      {/* the ms dial: a needle that FLICKS and settles */}
      {showDial && (
        <div style={{ position: "absolute", right: 24 * s, top: 14 * s, width: 66 * s, height: 66 * s, borderRadius: "50%", background: "#F4EEDC",
          border: `${4 * s}px solid ${dkh(BRASS, 0.3)}` }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} style={{ position: "absolute", left: "50%", top: 4 * s, width: 2 * s, height: 8 * s, background: hexa(INK, 0.6), marginLeft: -1 * s,
              transformOrigin: `50% ${29 * s}px`, transform: `rotate(${-70 + i * 35}deg)` }} />
          ))}
          <div style={{ position: "absolute", left: "50%", top: "50%", width: 3 * s, height: 26 * s, marginLeft: -1.5 * s, marginTop: -24 * s,
            background: RED, transformOrigin: "50% 92%", borderRadius: 2,
            transform: `rotate(${-70 + 32 * lastKick}deg)` }} />
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 8 * s, textAlign: "center", ...mono(9 * s, 800), color: hexa(INK, 0.6), letterSpacing: "0.1em" }}>MS</div>
        </div>
      )}
    </div>
    {/* the chaff chute from the window down into the bin */}
    <div style={{ position: "absolute", left: x - 70 * s, top: y - 4, width: 140 * s, height: 30 * s, zIndex: z + 1,
      background: `linear-gradient(180deg, ${dkh(IRON, 0.3)}, ${dkh(IRON, 0.5)})`, clipPath: "polygon(0 0, 100% 0, 78% 100%, 22% 100%)" }} />
    {/* the chaff falling into the bin on each feed */}
    {feeds.map((fd, b) => Array.from({ length: 10 }, (_, i) => {
      const t = f - fd.at - 10;
      if (t < 0 || t > 26) return null;
      const p = t / 26;
      return (
        <div key={"ch" + b + i} style={{ position: "absolute", left: x + (rnd(i + b * 9, 1) - 0.5) * 120 * s * p, top: y - 10 + p * (70 * s),
          width: (10 + rnd(i, 2) * 12) * s, height: 6 * s, zIndex: z + 2, borderRadius: 2, background: chaffColours[(i + b) % 5],
          transform: `rotate(${p * 300 + i * 40}deg)`, opacity: 1 - p * 0.3 }} />
      );
    }))}
  </>);
};

/* =========================================================================
   THE MARKDOWN SHEET — real syntax, legible, and lines that turn green as
   they are READ. `read` 0..1 sweeps down the sheet.
   ====================================================================== */
const MD_LINES = [
  { t: "# Q3 Report", w: 900 }, { t: "", w: 400 }, { t: "## Summary", w: 800 },
  { t: "- Revenue by region", w: 500 }, { t: "- Pipeline and hiring", w: 500 }, { t: "", w: 400 },
  { t: "| Region | Total |", w: 600 }, { t: "|--------|-------|", w: 600 },
  { t: "| North  | ▮▮▮▮  |", w: 600 }, { t: "| South  | ▮▮▮   |", w: 600 }, { t: "| West   | ▮▮    |", w: 600 },
];
export const MdSheet: React.FC<{ x: number; y: number; s?: number; rot?: number; z?: number; read?: number;
  lines?: number; o?: number }> = ({ x, y, s = 1, rot = 0, z = 60, read = -1, lines = MD_LINES.length, o = 1 }) => {
  const WD = 190 * s, HT = 244 * s;
  const cut = read * lines;
  return (
    <div style={{ position: "absolute", left: x - WD / 2, top: y - HT / 2, width: WD, height: HT, zIndex: z, opacity: o,
      background: "#FBF7EC", borderRadius: 6 * s, boxShadow: SH_D, border: `${2 * s}px solid #E0D8C4`,
      transform: `rotate(${rot}deg)`, padding: `${14 * s}px ${12 * s}px`, boxSizing: "border-box", overflow: "hidden" }}>
      {/* the dog-ear */}
      <div style={{ position: "absolute", right: 0, top: 0, width: 22 * s, height: 22 * s, background: `linear-gradient(225deg, #D9D0B8 50%, #FBF7EC 50%)` }} />
      {MD_LINES.slice(0, lines).map((ln, i) => {
        const done = read >= 0 && i < cut;
        const hot = read >= 0 && i >= cut - 1 && i < cut;
        return (
          <div key={i} style={{ ...mono(13.5 * s, ln.w), lineHeight: `${19 * s}px`, whiteSpace: "pre",
            color: done ? GREEN : ln.t.startsWith("#") ? INK : hexa(INK, 0.78),
            background: hot ? hexa(GREEN, 0.18) : "transparent", borderRadius: 3 }}>{ln.t || " "}</div>
        );
      })}
    </div>
  );
};

/** a belt of sheets travelling right: dark belt, cream sheets — light against
    shadow so every boundary is a real luma step */
export const SheetBelt: React.FC<{ y: number; f: number; z?: number; rate?: number; x0?: number; x1?: number; s?: number }> =
  ({ y, f, z = 36, rate = 5.4, x0 = -60, x1 = W + 60, s = 0.5 }) => {
  const pitch = 190 * s + 70;
  const span = x1 - x0;
  const n = Math.ceil(span / pitch) + 1;
  return (<>
    <div style={{ position: "absolute", left: x0, top: y - 14, width: span, height: 30, zIndex: z, borderRadius: 6,
      background: `linear-gradient(180deg, ${dkh("#2E2B27", 0)} 0%, #1E1B18 50%, ${dkh("#2E2B27", 0.2)} 100%)`,
      border: `3px solid ${dkh(IRON, 0.4)}` }} />
    {Array.from({ length: n }, (_, i) => {
      const x = x0 + ((i * pitch + f * rate) % span);
      return <MdSheet key={"sb" + i} x={x} y={y - 122 * s - 10} s={s} z={z + 1} rot={(rnd(i, 2) - 0.5) * 4} lines={11} />;
    })}
    {/* the rollers under the belt */}
    {Array.from({ length: Math.floor(span / 120) }, (_, i) => (
      <div key={"br" + i} style={{ position: "absolute", left: x0 + 30 + i * 120, top: y + 14, width: 34, height: 34, zIndex: z - 1,
        borderRadius: "50%", background: `radial-gradient(circle, ${dkh(IRON, 0.1)} 0 30%, ${dkh(IRON, 0.5)} 34%)`,
        transform: `rotate(${f * 9}deg)` }}>
        <div style={{ position: "absolute", left: "45%", top: 2, width: 4, height: 12, background: hexa("#FFFFFF", 0.3) }} />
      </div>
    ))}
  </>);
};

/* =========================================================================
   THE MONITOR — one window with four agents crammed in it, then the herdr
   SPLIT into panels with a status lamp each. The screen is LIGHT (matte rule 4).
   ====================================================================== */
const AGENT_C = [CLAY, SKY, GOLD, GREEN, "#8B72B0"];
export const Monitor: React.FC<{ x: number; y: number; f: number; w?: number; h?: number; z?: number;
  arrivals: number[]; split?: number; splitAt?: number; states?: number[]; s?: number; printAt?: number;
  messStep?: number }> =
  ({ x, y, f, w = 560, h = 380, z = 44, arrivals, split = 0, splitAt = 9999, states = [1, 1, -1, 0, 1], s = 1,
     printAt = 9999, messStep = 0 }) => {
  const herdr = repoBy("herdr");
  const grow = split;                                  /* 0 = one window, 1 = the wall */
  const WD = w + grow * 300, HT = h + grow * 90;
  const left = x - WD / 2, top = y - HT - 70;
  const screen = { l: 16, t: 44, w: WD - 32, h: HT - 60 };
  const sidebar = 120 * grow;
  const cols = 2, rows = 2;
  const cellW = (screen.w - sidebar) / cols, cellH = screen.h / rows;
  const n = arrivals.length;
  const divV = E(f, splitAt + 10, splitAt + 18, 0, 1, OUT);
  const divH = E(f, splitAt + 24, splitAt + 32, 0, 1, OUT);
  return (<>
    {/* stand and foot */}
    <div style={{ position: "absolute", left: x - 18, top: y - 70, width: 36, height: 72, zIndex: z, background: `linear-gradient(90deg, ${dkh(IRON, 0.2)}, ${mxh(IRON, 0.1)}, ${dkh(IRON, 0.4)})` }} />
    <div style={{ position: "absolute", left: x - 120, top: y - 12, width: 240, height: 14, zIndex: z, borderRadius: 7, background: `linear-gradient(180deg, ${mxh(IRON, 0.1)}, ${dkh(IRON, 0.4)})` }} />
    {/* bezel */}
    <div style={{ position: "absolute", left, top, width: WD, height: HT, zIndex: z + 1, borderRadius: 16, boxShadow: SH_D,
      background: `linear-gradient(180deg, #4A4038 0%, #2E2822 100%)`, border: `4px solid #1E1A16` }}>
      {/* title bar */}
      <div style={{ position: "absolute", left: 16, top: 12, width: WD - 32, height: 30, borderRadius: "8px 8px 0 0", background: "#E8E1D2",
        display: "flex", alignItems: "center", gap: 8, padding: "0 12px" }}>
        {[RED, GOLD, GREEN].map((c, i) => <div key={i} style={{ width: 11, height: 11, borderRadius: "50%", background: c }} />)}
        <div style={{ flex: 1 }} />
        {grow > 0.5 && (<>
          <div style={{ width: 20, height: 20, borderRadius: 5, background: herdr.markBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Img src={staticFile("logos/" + herdr.mark)} style={{ width: 16, height: 16 }} />
          </div>
          <div style={{ ...mono(12, 800), color: hexa(INK, 0.7), letterSpacing: "0.1em" }}>herdr</div>
        </>)}
      </div>
      {/* the screen */}
      <div style={{ position: "absolute", left: screen.l, top: screen.t, width: screen.w, height: screen.h, overflow: "hidden",
        background: "#F6F1E4", borderRadius: "0 0 8px 8px" }}>
        {/* faint gutter lines so it reads as a coding window */}
        {Array.from({ length: 12 }, (_, i) => (
          <div key={"ln" + i} style={{ position: "absolute", left: 10, top: 14 + i * 30, width: 22, height: 8, background: hexa(INK, 0.10), borderRadius: 2 }} />
        ))}
        {/* the tangle → clean lines */}
        <svg width={screen.w} height={screen.h} style={{ position: "absolute", left: 0, top: 0 }}>
          {arrivals.map((at, i) => {
            const k = E(f, at + 6, at + 30, 0, 1, OUT);
            if (k <= 0) return null;
            const c = AGENT_C[i % AGENT_C.length];
            const cx = (screen.w - sidebar) * (0.18 + 0.64 * ((i * 0.37) % 1));
            const cy = screen.h * (0.3 + 0.5 * ((i * 0.61) % 1));
            const wob = (1 - grow) * 60;
            const p1x = cx + Math.sin(f / 9 + i) * wob, p1y = cy + Math.cos(f / 7 + i * 2) * wob;
            const p2x = (screen.w - sidebar) * ((i * 0.53 + 0.2) % 1) + Math.sin(f / 6 + i) * wob;
            const p2y = screen.h * ((i * 0.29 + 0.15) % 1) + Math.cos(f / 8 + i) * wob;
            const ex = grow > 0.5 ? (i % cols) * cellW + cellW - 30 : (screen.w - sidebar) * ((i * 0.71 + 0.1) % 1);
            const ey = grow > 0.5 ? Math.floor(i / cols) * cellH + cellH * 0.32 : screen.h * ((i * 0.43 + 0.2) % 1);
            const sx = grow > 0.5 ? (i % cols) * cellW + 30 : cx;
            const sy = grow > 0.5 ? Math.floor(i / cols) * cellH + cellH * 0.32 : cy;
            const d = grow > 0.5
              ? `M ${sx} ${sy} L ${sx + (ex - sx) * k} ${sy}`
              : `M ${cx} ${cy} C ${p1x} ${p1y} ${p2x} ${p2y} ${cx + (ex - cx) * k} ${cy + (ey - cy) * k}`;
            return <path key={i} d={d} fill="none" stroke={c} strokeWidth={grow > 0.5 ? 6 : 11} strokeLinecap="round" opacity={0.92} />;
          })}
        </svg>
        {/* ⭐⭐ THE MESS (Alex, rev 4: "the animation with all of the messy coding agents window needs
            to be way more interesting"). A dozen half-overlapping terminal windows piled on one
            screen, each jittering on its own clock, three of them throwing an error dot — the actual
            picture of running four agents in one window. As `grow` runs they FLY to the four panes,
            so the split is the payoff of this mess and not a separate idea. */}
        {/* ⛔ all eleven windows existing from frame 0 gave CRAM a Q1 of 16 and a Q4 of 3.7 — the
            pile ARRIVED and then sat. `messStep` staggers them so windows keep landing right up to
            the cut, which is also what the sentence says is happening. */}
        {grow < 0.98 && Array.from({ length: 11 }, (_, i) => {
            const born = i * messStep;
            if (f < born) return null;
            const pop = E(f, born, born + 6, 0, 1, BACK);
            const r1 = rnd(i * 3 + 1, 7), r2 = rnd(i * 5 + 2, 11), r3 = rnd(i * 7 + 3, 5);
            const ww = 168 + r1 * 96, wh = 104 + r2 * 66;
            const mx = (screen.w - sidebar) * (0.04 + 0.62 * r1) - ww * 0.2;
            const my = screen.h * (0.05 + 0.52 * r2);
            const jx = Math.sin(f / (5 + r3 * 4) + i) * 4.5 * (1 - grow);
            const jy = Math.cos(f / (6 + r1 * 4) + i * 2) * 3.5 * (1 - grow);
            const slot = i % (cols * rows);
            const tx = (slot % cols) * cellW + cellW * 0.5 - ww * 0.5;
            const ty = Math.floor(slot / cols) * cellH + cellH * 0.32;
            const gx = mx + (tx - mx) * grow + jx, gy = my + (ty - my) * grow + jy;
            const err = i % 4 === 1;
            const ac = AGENT_C[i % AGENT_C.length];
            return (
              <div key={"mw" + i} style={{ position: "absolute", left: gx, top: gy, width: ww, height: wh,
                zIndex: 3 + (i % 5), borderRadius: 6, background: "#FBF7EC", opacity: (1 - grow * 0.92) * pop,
                border: `2px solid ${hexa(INK, 0.28)}`, boxShadow: SH, overflow: "hidden",
                transform: `rotate(${(r3 - 0.5) * 3 * (1 - grow)}deg) scale(${0.7 + 0.3 * pop})` }}>
                <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 15,
                  background: hexa(INK, 0.11), display: "flex", alignItems: "center", gap: 3, paddingLeft: 5 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: err ? RED : ac }} />
                  <div style={{ width: 30 + r1 * 26, height: 4, borderRadius: 2, background: hexa(INK, 0.3) }} />
                </div>
                {Array.from({ length: 3 + Math.floor(r2 * 4) }, (_, l) => (
                  <div key={l} style={{ position: "absolute", left: 7, top: 22 + l * 10,
                    width: (ww - 22) * (0.3 + rnd(i * 11 + l, 9) * 0.66), height: 4.5, borderRadius: 2,
                    background: l === 0 ? hexa(ac, 0.85) : hexa(INK, 0.22 + (l % 3) * 0.08) }} />
                ))}
                {err && (
                  <div style={{ position: "absolute", right: 6, bottom: 5, width: 16, height: 16, borderRadius: "50%",
                    background: RED, color: "#FFF", ...ui(12, 900), display: "flex", alignItems: "center",
                    justifyContent: "center", lineHeight: 1,
                    opacity: 0.55 + 0.45 * Math.abs(Math.sin(f / 6 + i)) }}>!</div>
                )}
              </div>
            );
        })}
        {/* ⭐⭐ EACH PANE IS A REAL WORKSPACE (Alex, rev 3: "each of the screens needs to be way
            more interesting, way better detailed, not just lines"). Per pane: a header with the
            agent's name and its live status chip, a file tree, SYNTAX-COLOURED code printing a
            line every six frames, and a progress bar that fills. Grey bars became code. */}
        {grow > 0.5 && arrivals.map((at, i) => {
          if (i >= cols * rows) return null;
          const st = states[i] ?? 1;
          const cx0 = (i % cols) * cellW, cy0 = Math.floor(i / cols) * cellH;
          const ac = AGENT_C[i % AGENT_C.length];
          const stC = st > 0.5 ? "#1A7F37" : st < 0 ? RED : "#8A8F98";
          const stT = st > 0.5 ? "WORKING" : st < 0 ? "BLOCKED" : "IDLE";
          const nLines = st > 0.5 ? Math.max(0, Math.min(8, Math.floor((f - printAt - i * 4) / 5))) : st < 0 ? 1 : 0;
          const prog = st > 0.5 ? Math.max(0, Math.min(1, (f - printAt - i * 4) / 62)) : st < 0 ? 0.34 : 0;
          const TOK = ["#C7502B", "#2B5EA8", "#1A7F37", hexa(INK, 0.5)];
          return (
            <div key={"pane" + i} style={{ position: "absolute", left: cx0 + 10, top: cy0 + 7,
              width: cellW - 20, height: cellH - 14, zIndex: 6 }}>
              {/* the pane header: whose pane it is, and what it is doing right now */}
              <div style={{ display: "flex", alignItems: "center", gap: 6, height: 16 }}>
                <div style={{ width: 9, height: 9, borderRadius: "50%", background: ac, flexShrink: 0 }} />
                <div style={{ ...mono(11, 800), color: hexa(INK, 0.74), letterSpacing: "0.04em" }}>agent-{i + 1}</div>
                <div style={{ flex: 1 }} />
                <div style={{ ...mono(9, 800), color: "#FFFFFF", background: stC, borderRadius: 3,
                  padding: "1.5px 5px", letterSpacing: "0.08em",
                  opacity: st > 0.5 ? 0.72 + 0.28 * Math.abs(Math.sin(f / 9 + i)) : 1 }}>{stT}</div>
              </div>
              <div style={{ position: "absolute", left: 0, top: 20, width: cellW - 20, height: 1.5,
                background: hexa(INK, 0.13) }} />
              {/* the file tree down the left of the pane */}
              <div style={{ position: "absolute", left: 0, top: 28 }}>
                {[0, 1, 2, 3, 4].map((r) => (
                  <div key={r} style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 6 }}>
                    <div style={{ width: 7, height: 8, borderRadius: 1.5,
                      background: r === (i % 3) ? ac : hexa(INK, 0.28) }} />
                    <div style={{ width: 17 + ((r * 7 + i * 5) % 4) * 6, height: 5, borderRadius: 2,
                      background: hexa(INK, r === (i % 3) ? 0.42 : 0.20) }} />
                  </div>
                ))}
              </div>
              <div style={{ position: "absolute", left: 52, top: 26, bottom: 12, width: 1.5,
                background: hexa(INK, 0.11) }} />
              {/* the code it is printing — tokens, not bars */}
              {Array.from({ length: nLines }, (_, k2) => {
                const seed = k2 * 7 + i * 3;
                const toks = 2 + (seed % 3);
                return (
                  <div key={"cl" + k2} style={{ position: "absolute", left: 62, top: 30 + k2 * 13,
                    display: "flex", alignItems: "center", gap: 5,
                    opacity: k2 === nLines - 1 ? 0.55 + 0.45 * Math.abs(Math.sin(f / 3)) : 1 }}>
                    <div style={{ ...mono(8, 700), color: hexa(INK, 0.26), width: 12 }}>{k2 + 1}</div>
                    {Array.from({ length: toks }, (_, t2) => (
                      <div key={t2} style={{ width: 16 + ((seed + t2 * 5) % 6) * 11, height: 6, borderRadius: 2,
                        background: TOK[(seed + t2) % TOK.length] }} />
                    ))}
                  </div>
                );
              })}
              {/* blocked panes show the reason, not just a red lamp */}
              {st < 0 && (
                <div style={{ position: "absolute", left: 62, top: 46, display: "flex", alignItems: "center", gap: 5 }}>
                  <div style={{ ...mono(10, 800), color: RED, letterSpacing: "0.04em" }}>waiting on input</div>
                </div>
              )}
              {/* the pane's own progress */}
              <div style={{ position: "absolute", left: 62, right: 6, bottom: 8, height: 5, borderRadius: 3,
                background: hexa(INK, 0.12), overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${prog * 100}%`,
                  background: st < 0 ? RED : ac }} />
              </div>
            </div>
          );
        })}
        {/* dividers */}
        {divV > 0 && <div style={{ position: "absolute", left: cellW - 4, top: 0, width: 8, height: screen.h * divV, background: dkh(herdr.c2, 0.1), borderRadius: 4 }} />}
        {divH > 0 && <div style={{ position: "absolute", left: 0, top: cellH - 4, width: (screen.w - sidebar) * divH, height: 8, background: dkh(herdr.c2, 0.1), borderRadius: 4 }} />}
        {/* the agents */}
        {arrivals.map((at, i) => {
          const k = E(f, at, at + 12, 0, 1, OUT);
          if (k <= 0) return null;
          const size = (grow > 0.5 ? 96 : 118) * s;
          /* crammed: everybody near the middle, shoving; split: each to its own panel centre */
          const cramX = (screen.w - sidebar) * (0.40 + 0.20 * ((i * 0.37) % 1)) + Math.sin(f / 5 + i * 1.3) * 22 * (1 - grow);
          const cramY = screen.h * 0.78 + Math.abs(Math.sin(f / 6 + i)) * -8 * (1 - grow);
          const cellX = (i % cols) * cellW + cellW / 2, cellY = Math.floor(i / cols) * cellH + cellH * 0.86;
          const gx = cramX + (cellX - cramX) * grow, gy = cramY + (cellY - cramY) * grow;
          const drop = (1 - k) * -220;
          const blocked = states[i] < 0;
          return (
            <div key={"ag" + i} style={{ position: "absolute", left: 0, top: drop, width: "100%", height: "100%" }}>
              <Crew f={f} x={gx} y={gy} i={i * 5 + 1} size={size} z={10 + (i % 3)} at={at} loop={grow > 0.5 ? (blocked ? 3 : i % 2 === 0 ? 0 : 2) : 0} />
              {blocked && grow > 0.5 && (
                <div style={{ position: "absolute", left: gx - 14, top: gy - size - 30, width: 28, height: 28, borderRadius: "50%", background: RED,
                  color: "#FFFFFF", ...ui(20, 900), display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1 }}>!</div>
              )}
            </div>
          );
        })}
        {/* the sidebar with a lamp per agent — WORKING / BLOCKED / IDLE, herdr's own states */}
        {sidebar > 10 && (
          <div style={{ position: "absolute", right: 0, top: 0, width: sidebar, height: screen.h, background: "#E8E1D2", borderLeft: `3px solid ${dkh(herdr.c2, 0.1)}`,
            padding: "14px 10px", boxSizing: "border-box" }}>
            {arrivals.map((at, i) => {
              const on = E(f, splitAt + 34 + i * 6, splitAt + 40 + i * 6, 0, 1, OUT);
              const st = states[i] ?? 1;
              const c = st > 0.5 ? GREEN : st < 0 ? RED : MUTE;
              const label = st > 0.5 ? "WORKING" : st < 0 ? "BLOCKED" : "IDLE";
              return (
                <div key={"sb" + i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, opacity: on, transform: `translateX(${(1 - on) * 30}px)` }}>
                  <div style={{ width: 16, height: 16, borderRadius: "50%", background: c, border: `2px solid ${dkh(c, 0.3)}`, flexShrink: 0 }} />
                  <div style={{ ...mono(11, 800), color: hexa(INK, 0.75), letterSpacing: "0.06em" }}>{label}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  </>);
};

/* =========================================================================
   THE PLUGBOARD — the harness rack: posts, shelves, six sockets with lamps,
   the DeepSeek badge. Cartridges fly in and CLICK.
   ====================================================================== */
const PlugIcon: React.FC<{ k: number; s: number }> = ({ k, s }) => (
  <svg width={38 * s} height={38 * s} viewBox="0 0 38 38">
    {k === 0 && <path d="M8 30 L22 16 M22 16 L30 8 L34 12 L26 20 M8 30 L4 34 L8 34 Z" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" fill="none" />}
    {k === 1 && (<><ellipse cx="19" cy="10" rx="13" ry="5" fill="none" stroke="#FFFFFF" strokeWidth="4" /><path d="M6 10 V28 C6 31 12 34 19 34 C26 34 32 31 32 28 V10" fill="none" stroke="#FFFFFF" strokeWidth="4" /><path d="M6 19 C6 22 12 25 19 25 C26 25 32 22 32 19" fill="none" stroke="#FFFFFF" strokeWidth="4" /></>)}
    {k === 2 && <path d="M22 3 L8 22 L18 22 L16 35 L30 16 L20 16 Z" fill="#FFFFFF" />}
    {k === 3 && (<><circle cx="19" cy="19" r="14" fill="none" stroke="#FFFFFF" strokeWidth="4" /><path d="M19 10 V19 L26 23" stroke="#FFFFFF" strokeWidth="4" fill="none" strokeLinecap="round" /></>)}
    {k === 4 && (<><rect x="4" y="7" width="30" height="20" rx="3" fill="none" stroke="#FFFFFF" strokeWidth="4" /><path d="M13 33 H25" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" /></>)}
    {k === 5 && (<><path d="M19 5 C10 5 6 12 8 18 C4 20 4 27 9 29 C10 34 16 35 19 32 C22 35 28 34 29 29 C34 27 34 20 30 18 C32 12 28 5 19 5 Z" fill="none" stroke="#FFFFFF" strokeWidth="4" /><path d="M19 8 V32" stroke="#FFFFFF" strokeWidth="3" /></>)}
  </svg>
);
const PLUG_C = [CLAY, SKY, GOLD, GREEN, "#8B72B0", "#5786FE"];
export const Cartridge: React.FC<{ k: number; x: number; y: number; s?: number; z?: number; squash?: number; big?: boolean }> =
  ({ k, x, y, s = 1, z = 60, squash = 0, big = false }) => {
  const WD = (big ? 150 : 110) * s, HT = (big ? 84 : 66) * s;
  const c = PLUG_C[k % PLUG_C.length];
  return (
    <div style={{ position: "absolute", left: x - WD / 2, top: y - HT / 2, width: WD, height: HT, zIndex: z, borderRadius: 10 * s, boxShadow: SH_D,
      background: `linear-gradient(180deg, ${mxh(c, 0.16)} 0%, ${c} 48%, ${dkh(c, 0.32)} 100%)`, border: `${3 * s}px solid ${dkh(c, 0.5)}`,
      transform: `scale(${1 + squash * 0.1}, ${1 - squash * 0.14})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* contacts along the bottom edge */}
      <div style={{ position: "absolute", left: 10 * s, right: 10 * s, bottom: -6 * s, height: 8 * s,
        background: `repeating-linear-gradient(90deg, ${BRASS} 0 8px, transparent 8px 13px)` }} />
      <PlugIcon k={k} s={big ? 1.3 : 1} />
    </div>
  );
};

export const Rack: React.FC<{ x: number; y: number; f: number; plugs: number[]; s?: number; z?: number }> =
  ({ x, y, f, plugs, s = 1, z = 42 }) => {
  const dsh = repoBy("dsh");
  const WD = 560 * s, HT = 360 * s;
  const left = x - WD / 2, top = y - HT;
  const cols = 3, rows = 2;
  const sockW = 150 * s, sockH = 96 * s;
  const sockX = (i: number) => left + 40 * s + (i % cols) * ((WD - 80 * s - sockW) / (cols - 1)) + sockW / 2;
  const sockY = (i: number) => top + 84 * s + Math.floor(i / cols) * (sockH + 40 * s) + sockH / 2;
  return (<>
    {/* posts and shelves */}
    {[left, left + WD - 22 * s].map((px, i) => (
      <div key={"po" + i} style={{ position: "absolute", left: px, top: top - 10, width: 22 * s, height: HT + 10, zIndex: z,
        background: `linear-gradient(90deg, ${dkh(IRON, 0.1)}, ${mxh(IRON, 0.14)} 40%, ${dkh(IRON, 0.44)})`, borderRadius: 3 }} />
    ))}
    <div style={{ position: "absolute", left, top: top - 10, width: WD, height: 64 * s, zIndex: z + 1, borderRadius: 6,
      background: `linear-gradient(180deg, ${mxh(dsh.c2, 0.1)}, ${dkh(dsh.c2, 0.3)})`, boxShadow: SH_D, border: `${3 * s}px solid ${dkh(dsh.c2, 0.5)}`,
      display: "flex", alignItems: "center", gap: 12 * s, padding: `0 ${16 * s}px` }}>
      <div style={{ width: 40 * s, height: 40 * s, borderRadius: 9 * s, background: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Img src={staticFile("logos/" + dsh.mark)} style={{ width: 30 * s, height: 30 * s }} />
      </div>
      <div style={{ ...ui(22 * s, 900), color: "#F6F1E6", letterSpacing: "0.02em" }}>deepseek-harness</div>
      <div style={{ flex: 1 }} />
      <div style={{ ...mono(12 * s, 800), color: hexa("#F6F1E6", 0.7), letterSpacing: "0.12em" }}>{R.dshClaim}</div>
    </div>
    {/* the back panel */}
    <div style={{ position: "absolute", left: left + 22 * s, top: top + 54 * s, width: WD - 44 * s, height: HT - 54 * s, zIndex: z,
      background: `linear-gradient(180deg, ${dkh(dsh.c2, 0.45)}, ${dkh(dsh.c2, 0.62)})`,
      backgroundImage: `radial-gradient(circle, ${hexa("#000000", 0.4)} 1.6px, transparent 2.4px)`, backgroundSize: "18px 18px" }} />
    {/* the sockets, each with a lamp; cartridges arrive into them */}
    {Array.from({ length: 6 }, (_, i) => {
      const at = plugs[i] ?? 99999;
      const k = E(f, at, at + 14, 0, 1, IN_Q);
      const seated = f >= at + 14;
      const squash = seated ? Math.max(0, 1 - (f - at - 14) / 7) : 0;
      const side = i % 2 === 0 ? -1 : 1;
      const fromX = sockX(i) + side * 620, fromY = sockY(i) - 160;
      const cx = fromX + (sockX(i) - fromX) * k, cy = fromY + (sockY(i) - fromY) * k - Math.sin(k * Math.PI) * 90;
      const big = i === 5;
      return (
        <React.Fragment key={"sk" + i}>
          <div style={{ position: "absolute", left: sockX(i) - sockW / 2, top: sockY(i) - sockH / 2, width: sockW, height: sockH, zIndex: z + 1,
            borderRadius: 10 * s, background: dkh(dsh.c2, 0.7), border: `${4 * s}px solid ${dkh(IRON, 0.3)}`,
            boxShadow: `inset 0 6px 14px ${hexa("#000000", 0.6)}` }}>
            <div style={{ position: "absolute", right: 10 * s, top: 8 * s, width: 14 * s, height: 14 * s, borderRadius: "50%",
              background: seated ? GREEN : dkh(RED, 0.3), border: `2px solid ${hexa("#000000", 0.4)}` }} />
            {big && !seated && <div style={{ position: "absolute", left: 0, right: 0, bottom: 6 * s, textAlign: "center", ...mono(11 * s, 800), color: hexa("#F6F1E6", 0.5), letterSpacing: "0.14em" }}>MODEL</div>}
          </div>
          {k > 0 && <Cartridge k={i} x={cx} y={cy} s={s} z={z + 3} squash={squash} big={big} />}
          {seated && squash > 0.5 && <Ring x={sockX(i)} y={sockY(i)} f={f} at={at + 14} c={mxh(PLUG_C[i], 0.3)} z={z + 4} s={0.8} dur={12} />}
        </React.Fragment>
      );
    })}
  </>);
};

/* =========================================================================
   THE CLAW AND THE CORES — the brain swap.
   ====================================================================== */
export const Claw: React.FC<{ x: number; y: number; open: number; f: number; z?: number; s?: number }> =
  ({ x, y, open, f, z = 70, s = 1 }) => {
  const jaw = 12 + open * 34;
  return (<>
    <div style={{ position: "absolute", left: x - 6 * s, top: 0, width: 12 * s, height: Math.max(0, y - 60 * s), zIndex: z,
      background: `repeating-linear-gradient(180deg, ${mxh(IRON, 0.28)} 0 8px, ${dkh(IRON, 0.36)} 8px 14px, transparent 14px 17px)`,
      borderLeft: `2px solid ${dkh(IRON, 0.5)}`, borderRight: `2px solid ${dkh(IRON, 0.5)}` }} />
    <div style={{ position: "absolute", left: x - 34 * s, top: y - 64 * s, width: 68 * s, height: 44 * s, zIndex: z + 1, borderRadius: 8 * s,
      background: `linear-gradient(180deg, ${mxh(IRON, 0.2)}, ${dkh(IRON, 0.36)})`, border: `${3 * s}px solid ${dkh(IRON, 0.5)}`, boxShadow: SH }}>
      <div style={{ position: "absolute", left: "30%", right: "30%", top: 10 * s, height: 8 * s, background: GOLD, borderRadius: 2, opacity: 0.85 }} />
    </div>
    {[-1, 1].map((side) => (
      <svg key={side} width={60 * s} height={70 * s} viewBox="0 0 60 70"
        style={{ position: "absolute", left: x - 30 * s + side * 16 * s, top: y - 26 * s, zIndex: z + 2,
          transformOrigin: "50% 8%", transform: `rotate(${side * jaw}deg) ${side < 0 ? "scaleX(-1)" : ""}` }}>
        <path d="M30 4 C30 30 22 44 10 58 L20 66 C34 52 44 36 44 6 Z" fill={CHROME} stroke={dkh(CHROME, 0.45)} strokeWidth="4" strokeLinejoin="round" />
      </svg>
    ))}
  </>);
};

export const Core: React.FC<{ x: number; y: number; r?: number; lit?: number; c?: string; c2?: string; f: number; z?: number;
  stem?: boolean }> = ({ x, y, r = 40, lit = 1, c = "#8A8EE6", c2 = "#3A3E8E", f, z = 66, stem = true }) => {
  const k = Math.max(0, Math.min(1, lit));
  const pulse = 1 + Math.sin(f / 5) * 0.04 * k;
  return (<>
    <div style={{ position: "absolute", left: x - r, top: y - r, width: r * 2, height: r * 2, zIndex: z, borderRadius: "50%",
      transform: `scale(${pulse})`, boxShadow: SH,
      background: `radial-gradient(circle at 38% 34%, ${mxh(c, 0.45 * k + 0.1)} 0%, ${k > 0.5 ? c : dkh(c2, 0.1)} 45%, ${dkh(c2, 0.3)} 100%)`,
      border: `${Math.max(2, r * 0.08)}px solid ${dkh(c2, 0.4)}` }}>
      {/* three ridges — a brain, not a marble */}
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ position: "absolute", left: "18%", right: "18%", top: `${28 + i * 20}%`, height: r * 0.12,
          borderRadius: r, border: `${Math.max(2, r * 0.06)}px solid ${hexa(k > 0.5 ? mxh(c, 0.5) : dkh(c2, 0.5), 0.7)}`, borderTopColor: "transparent" }} />
      ))}
      {k > 0.5 && <div style={{ position: "absolute", left: "26%", top: "18%", width: "22%", height: "12%", borderRadius: r, background: hexa("#FFFFFF", 0.55) }} />}
    </div>
    {stem && <div style={{ position: "absolute", left: x - 7, top: y + r - 4, width: 14, height: 22, zIndex: z - 1, borderRadius: 3,
      background: `linear-gradient(90deg, ${dkh(BRASS, 0.3)}, ${mxh(BRASS, 0.1)}, ${dkh(BRASS, 0.4)})` }} />}
  </>);
};

/* =========================================================================
   THE MANIFOLD — OmniRoute as plumbing: five canisters with real marks, a
   header pipe, a SELECTOR carriage that moves under the live canister, beads
   running the pipe to the tank, a big CREDITS gauge, an ERROR beacon.
   ====================================================================== */
export const Canister: React.FC<{ x: number; y: number; logo: string; c: string; s?: number; z?: number; live?: number }> =
  ({ x, y, logo, c, s = 1, z = 46, live = 0 }) => {
  const WD = 84 * s, HT = 150 * s;
  return (
    <div style={{ position: "absolute", left: x - WD / 2, top: y - HT, width: WD, height: HT, zIndex: z, borderRadius: `${WD / 2}px ${WD / 2}px ${10 * s}px ${10 * s}px / ${28 * s}px ${28 * s}px ${8 * s}px ${8 * s}px`,
      boxShadow: SH_D, border: `${3 * s}px solid ${dkh(IRON, 0.5)}`,
      background: `linear-gradient(90deg, ${dkh(IRON, 0.3)} 0%, ${mxh(IRON, 0.06)} 34%, ${mxh(IRON, 0.22)} 50%, ${dkh(IRON, 0.3)} 100%)` }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 30 * s, height: 22 * s, background: c, opacity: 0.85 + 0.15 * live }} />
      <div style={{ position: "absolute", left: WD / 2 - 26 * s, top: 62 * s, width: 52 * s, height: 52 * s, borderRadius: 12 * s, background: "#FFFFFF",
        border: `${2 * s}px solid #E3D8C2`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Img src={staticFile("logos/" + logo)} style={{ width: 38 * s, height: 38 * s, objectFit: "contain" }} />
      </div>
      <div style={{ position: "absolute", left: WD / 2 - 12 * s, top: -12 * s, width: 24 * s, height: 16 * s, borderRadius: 4 * s,
        background: `linear-gradient(180deg, ${mxh(BRASS, 0.2)}, ${dkh(BRASS, 0.4)})` }} />
      {live > 0.02 && <div style={{ position: "absolute", left: 8 * s, right: 8 * s, top: 122 * s, height: 10 * s, borderRadius: 5 * s, background: GREEN, opacity: live }} />}
    </div>
  );
};

export const BigGauge: React.FC<{ x: number; y: number; v: number; s?: number; z?: number; label?: string; err?: number }> =
  ({ x, y, v, s = 1, z = 50, label = "CREDITS", err = 0 }) => {
  const R0 = 92 * s;
  const ang = -120 + 240 * Math.max(0, Math.min(1, v));
  return (
    <div style={{ position: "absolute", left: x - R0, top: y - R0, width: R0 * 2, height: R0 * 2, zIndex: z, borderRadius: "50%",
      background: `radial-gradient(circle at 50% 46%, #FBF6E8 0%, #EDE4CE 70%, ${dkh(BRASS, 0.1)} 100%)`,
      border: `${9 * s}px solid ${dkh(BRASS, 0.3)}`, boxShadow: SH_D, transform: `translate(${err > 0.5 ? Math.sin(err * 90) * 3 : 0}px, 0)` }}>
      {/* the red band near E, the ticks, E and F */}
      <div style={{ position: "absolute", inset: 10 * s, borderRadius: "50%", border: `${10 * s}px solid transparent`,
        borderLeftColor: RED, transform: "rotate(-30deg)", opacity: 0.85, clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)" }} />
      {Array.from({ length: 9 }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: "50%", top: 14 * s, width: (i % 4 === 0 ? 4 : 2) * s, height: (i % 4 === 0 ? 18 : 10) * s,
          marginLeft: -1 * s, background: hexa(INK, 0.7), transformOrigin: `50% ${R0 - 14 * s}px`, transform: `rotate(${-120 + i * 30}deg)` }} />
      ))}
      <div style={{ position: "absolute", left: 22 * s, bottom: 40 * s, ...ui(26 * s, 900), color: RED }}>E</div>
      <div style={{ position: "absolute", right: 22 * s, bottom: 40 * s, ...ui(26 * s, 900), color: INK }}>F</div>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 22 * s, textAlign: "center", ...mono(11 * s, 800), color: hexa(INK, 0.6), letterSpacing: "0.16em" }}>{label}</div>
      <div style={{ position: "absolute", left: "50%", top: "50%", width: 5 * s, height: R0 * 0.78, marginLeft: -2.5 * s, marginTop: -R0 * 0.74,
        background: INK, borderRadius: 3, transformOrigin: "50% 95%", transform: `rotate(${ang}deg)` }} />
      <div style={{ position: "absolute", left: "50%", top: "50%", width: 18 * s, height: 18 * s, marginLeft: -9 * s, marginTop: -9 * s, borderRadius: "50%",
        background: `radial-gradient(circle, ${mxh(BRASS, 0.2)}, ${dkh(BRASS, 0.4)})` }} />
    </div>
  );
};

export const ErrorLamp: React.FC<{ x: number; y: number; on: number; f: number; s?: number; z?: number }> =
  ({ x, y, on, f, s = 1, z = 50 }) => {
  const blink = on > 0.5 ? (Math.floor(f / 6) % 2 === 0 ? 1 : 0.45) : 0;
  return (<>
    {blink > 0 && <div style={{ position: "absolute", left: x - 160 * s, top: y + 20 * s, width: 320 * s, height: 260 * s, zIndex: z - 1, opacity: 0.22 * blink,
      background: `linear-gradient(180deg, ${hexa(RED, 0.9)}, ${hexa(RED, 0)})`, clipPath: "polygon(38% 0, 62% 0, 100% 100%, 0 100%)" }} />}
    <div style={{ position: "absolute", left: x - 30 * s, top: y - 10 * s, width: 60 * s, height: 20 * s, zIndex: z, borderRadius: 4, background: dkh(IRON, 0.3) }} />
    <div style={{ position: "absolute", left: x - 24 * s, top: y + 6 * s, width: 48 * s, height: 52 * s, zIndex: z, borderRadius: `8px 8px ${20 * s}px ${20 * s}px`,
      background: blink > 0 ? `radial-gradient(circle at 50% 40%, ${mxh(RED, 0.5 * blink)} 0%, ${RED} 55%, ${dkh(RED, 0.3)} 100%)` : dkh(RED, 0.62),
      border: `${3 * s}px solid ${dkh(IRON, 0.4)}` }}>
      {[0, 1, 2].map((i) => <div key={i} style={{ position: "absolute", left: 0, right: 0, top: (10 + i * 12) * s, height: 3 * s, background: dkh(IRON, 0.4) }} />)}
    </div>
    <div style={{ position: "absolute", left: x - 60 * s, top: y + 64 * s, width: 120 * s, textAlign: "center", zIndex: z, ...mono(12 * s, 800),
      color: blink > 0 ? RED : hexa("#F6F1E6", 0.4), letterSpacing: "0.16em" }}>ERROR</div>
  </>);
};

/** the manifold rack: canisters, down-pipes, the header, the selector carriage,
    the outlet to the tank, beads on the live route */
export const Manifold: React.FC<{ x: number; y: number; f: number; sel: number; flow: number; s?: number; z?: number;
  outX: number; outY: number; beadsAt?: number }> =
  ({ x, y, f, sel, flow, s = 1, z = 44, outX, outY, beadsAt = 0 }) => {
  const omni = repoBy("omni");
  const n = MODELS.length;
  const pitch = 118 * s;
  const canX = (i: number) => x - ((n - 1) * pitch) / 2 + i * pitch;
  const headerY = y + 46 * s;
  const selI = Math.max(0, Math.min(n - 1, sel));
  const selX = canX(Math.round(selI)) + (selI - Math.round(selI)) * pitch;
  const pipe = (l: number, t: number, w: number, h: number, live: number, key: string) => (
    <div key={key} style={{ position: "absolute", left: l, top: t, width: w, height: h, zIndex: z, borderRadius: 6 * s,
      background: live > 0.5
        ? `linear-gradient(${w > h ? 180 : 90}deg, ${mxh(GREEN, 0.2)}, ${GREEN} 50%, ${dkh(GREEN, 0.3)})`
        : `linear-gradient(${w > h ? 180 : 90}deg, ${mxh(IRON, 0.18)}, ${IRON} 50%, ${dkh(IRON, 0.36)})`,
      border: `2px solid ${dkh(IRON, 0.5)}` }} />
  );
  return (<>
    {/* the rack shelf the canisters stand on */}
    <div style={{ position: "absolute", left: x - (n * pitch) / 2 - 20 * s, top: y - 4, width: n * pitch + 40 * s, height: 16 * s, zIndex: z - 1,
      borderRadius: 4, background: `linear-gradient(180deg, ${mxh(IRON, 0.1)}, ${dkh(IRON, 0.4)})`, boxShadow: SH }} />
    {MODELS.map((m, i) => (
      <React.Fragment key={m.n}>
        <Canister x={canX(i)} y={y - 8} logo={m.logo} c={m.c} s={s} z={z + 1} live={Math.round(selI) === i ? flow : 0} />
        {pipe(canX(i) - 7 * s, y + 8, 14 * s, headerY - y, Math.round(selI) === i ? flow : 0, "dp" + i)}
      </React.Fragment>
    ))}
    {/* the header pipe */}
    {pipe(canX(0) - 20 * s, headerY, canX(n - 1) - canX(0) + 40 * s, 16 * s, flow, "hd")}
    {/* the selector carriage: a valve body with a wheel that turns while it moves */}
    <div style={{ position: "absolute", left: selX - 50 * s, top: headerY - 28 * s, width: 100 * s, height: 72 * s, zIndex: z + 3, borderRadius: 12 * s,
      background: `linear-gradient(180deg, ${mxh(BRASS, 0.18)}, ${dkh(BRASS, 0.34)})`, border: `${3 * s}px solid ${dkh(BRASS, 0.5)}`, boxShadow: SH_D }}>
      <div style={{ position: "absolute", left: "50%", top: "50%", width: 50 * s, height: 50 * s, marginLeft: -25 * s, marginTop: -25 * s, borderRadius: "50%",
        border: `${6 * s}px solid ${dkh(IRON, 0.2)}`, transform: `rotate(${selI * 260}deg)` }}>
        {[0, 60, 120].map((a) => <div key={a} style={{ position: "absolute", left: "50%", top: 0, width: 4 * s, height: "100%", marginLeft: -2 * s, background: dkh(IRON, 0.2), transform: `rotate(${a}deg)` }} />)}
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: -18 * s, textAlign: "center", ...mono(10 * s, 800), color: hexa("#F6F1E6", 0.7), letterSpacing: "0.14em" }}>AUTO</div>
    </div>
    {/* the outlet: header end → down → across to the tank */}
    {pipe(canX(n - 1) + 20 * s, headerY, outX - canX(n - 1) - 20 * s, 16 * s, flow, "o1")}
    {pipe(outX - 8 * s, headerY, 16 * s, outY - headerY, flow, "o2")}
    {/* the OmniRoute badge on the header */}
    <div style={{ position: "absolute", left: canX(0) - 10 * s, top: headerY + 26 * s, zIndex: z + 3, display: "flex", alignItems: "center", gap: 8 * s }}>
      <div style={{ width: 40 * s, height: 40 * s, borderRadius: 9 * s, background: "#FFFFFF", border: `2px solid #E3D8C2`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Img src={staticFile("logos/" + omni.mark)} style={{ width: 30 * s, height: 30 * s, objectFit: "contain" }} />
      </div>
      <div style={{ ...ui(20 * s, 900), color: "#F6F1E6" }}>OmniRoute</div>
    </div>
    {/* beads along the live route: down the live canister's pipe, along the header, out and down */}
    {flow > 0.05 && Array.from({ length: 14 }, (_, i) => {
      const u = (((f - beadsAt) * 0.03 + i / 14) % 1 + 1) % 1;
      const L1 = headerY - y, L2 = outX - selX, L3 = outY - headerY;
      const tot = L1 + L2 + L3;
      let bx: number, by: number;
      const d = u * tot;
      if (d < L1) { bx = selX; by = y + d; }
      else if (d < L1 + L2) { bx = selX + (d - L1); by = headerY + 8 * s; }
      else { bx = outX; by = headerY + (d - L1 - L2); }
      return <div key={"bd" + i} style={{ position: "absolute", left: bx - 20 * s, top: by - 20 * s, width: 40 * s, height: 40 * s, zIndex: z + 2, borderRadius: "50%",
        background: `radial-gradient(circle at 40% 36%, ${mxh(GOLD, 0.5)}, ${GOLD} 50%, ${dkh(GOLD, 0.3)})`, opacity: flow }} />;
    })}
  </>);
};

/** tokens pouring into a hopper and a tally that COUNTS to the README figure */
export const TokenHopper: React.FC<{ x: number; y: number; f: number; at: number; s?: number; z?: number; n?: number }> =
  ({ x, y, f, at, s = 1, z = 60, n = 26 }) => {
  const WD = 220 * s, HT = 120 * s;
  const level = E(f, at + 10, at + 70, 0, 1, OUT);
  return (<>
    <div style={{ position: "absolute", left: x - WD / 2, top: y - HT, width: WD, height: HT, zIndex: z, borderRadius: `0 0 ${16 * s}px ${16 * s}px`,
      background: `linear-gradient(90deg, ${dkh(IRON, 0.3)}, ${mxh(IRON, 0.08)} 40%, ${dkh(IRON, 0.36)})`, border: `${3 * s}px solid ${dkh(IRON, 0.5)}`,
      clipPath: "polygon(0 0, 100% 0, 84% 100%, 16% 100%)", overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: `${level * 82}%`,
        background: `radial-gradient(circle at 30% 30%, ${mxh(GOLD, 0.3)} 0 8px, transparent 9px), radial-gradient(circle at 70% 60%, ${mxh(GOLD, 0.2)} 0 8px, transparent 9px), ${GOLD}`,
        backgroundSize: "36px 36px, 36px 36px, auto" }} />
    </div>
    {Array.from({ length: n }, (_, i) => {
      const t0 = at + i * 3;
      const t = f - t0;
      if (t < 0 || t > 22) return null;
      const p = t / 22;
      const bx = x + (rnd(i, 1) - 0.5) * 90 * s * p, by = y - HT - 220 * s + p * p * 300 * s;
      return <div key={"tk" + i} style={{ position: "absolute", left: bx - 28 * s, top: by - 28 * s, width: 56 * s, height: 56 * s, zIndex: z + 1, borderRadius: "50%",
        background: `radial-gradient(circle at 40% 36%, ${mxh(GOLD, 0.5)}, ${GOLD} 55%, ${dkh(GOLD, 0.3)})`, border: `${3 * s}px solid ${dkh(GOLD, 0.4)}`,
        transform: `rotate(${p * 400}deg) scaleX(${0.5 + 0.5 * Math.abs(Math.cos(p * 9))})` }} />;
    })}
  </>);
};

export const Tally: React.FC<{ x: number; y: number; k: number; s?: number; z?: number }> = ({ x, y, k, s = 1, z = 80 }) => {
  const v = 1.47e9 * Math.max(0, Math.min(1, k));
  const txt = v < 1e6 ? `${Math.round(v / 1e3)}K` : v < 1e9 ? `${(v / 1e6).toFixed(0)}M` : `${(v / 1e9).toFixed(2)}B`;
  return (
    <div style={{ position: "absolute", left: x - 200 * s, top: y, width: 400 * s, zIndex: z, textAlign: "center" }}>
      <div style={{ ...mono(96 * s, 900), color: "#F6F1E6", lineHeight: 1, letterSpacing: "-0.02em", textShadow: `0 4px 12px ${hexa("#000000", 0.5)}` }}>{txt}</div>
      <div style={{ ...ui(15 * s, 900), color: hexa("#F6F1E6", 0.75), letterSpacing: "0.22em", marginTop: 6 * s }}>FREE TOKENS · PER MONTH</div>
    </div>
  );
};

/* =========================================================================
   THE COMPOSER — the CTA. "COMMENT REPOS" in one phrase, one size, the
   keyword typing itself in, a SEND key that pulses when it is done.
   ====================================================================== */
export const Composer: React.FC<{ x: number; y: number; f: number; at: number; s?: number; z?: number }> =
  ({ x, y, f, at, s = 1, z = 94 }) => {
  const WD = 660 * s, HT = 132 * s;
  const k = E(f, at, at + 10, 0, 1, BACK);
  if (k <= 0.01) return null;
  const t = f - at;
  const word = R.keyword;
  const n = Math.max(0, Math.min(word.length, Math.floor((t - 8) / 4)));
  const done = n >= word.length;
  const send = E(t, 8 + word.length * 4 + 6, 8 + word.length * 4 + 16, 0, 1, BACK);
  const caret = Math.floor(t / 7) % 2 === 0 ? 1 : 0.06;
  return (
    <div style={{ position: "absolute", left: x - WD / 2, top: y, width: WD, height: HT, zIndex: z, transform: `scale(${k})`, transformOrigin: "50% 50%",
      background: `linear-gradient(168deg, #FBF6E8, #DED5BC)`, borderRadius: 14 * s, border: `${6 * s}px solid ${dkh(BRASS, 0.34)}`, boxShadow: SH_D,
      display: "flex", alignItems: "center", gap: 12 * s, padding: `0 ${18 * s}px` }}>
      <div style={{ flex: 1, height: 86 * s, borderRadius: 10 * s, background: hexa(INK, 0.06), border: `${3 * s}px solid ${hexa(INK, 0.14)}`,
        display: "flex", alignItems: "center", justifyContent: "center", padding: `0 ${14 * s}px`, gap: 3 * s, overflow: "hidden" }}>
        <span style={{ ...ui(40 * s, 900), color: dkh(CLAYD, 0.02), letterSpacing: 0.5 * s, marginRight: 12 * s }}>COMMENT</span>
        {word.split("").map((ch, i) => (
          <span key={i} style={{ ...ui(40 * s, 900), color: mxh(CLAY, 0.02), opacity: i < n ? 1 : 0, display: "inline-block",
            transform: `translateY(${i < n ? 0 : 8 * s}px) scale(${i === n - 1 ? 1.14 : 1})` }}>{ch}</span>
        ))}
        <span style={{ width: 5 * s, height: 46 * s, background: dkh(CLAYD, 0.02), opacity: done ? caret * 0.5 : caret, marginLeft: 3 * s }} />
      </div>
      <div style={{ width: 100 * s, height: 86 * s, borderRadius: 10 * s, flexShrink: 0,
        background: `linear-gradient(168deg, ${mxh(CLAY, 0.10)}, ${dkh(CLAY, 0.30)})`, border: `${4 * s}px solid ${dkh(CLAY, 0.46)}`, boxShadow: SH,
        display: "flex", alignItems: "center", justifyContent: "center",
        transform: `scale(${(done ? 1 + 0.05 * Math.sin(f / 4) : 1) - send * 0.10})`, opacity: 0.5 + 0.5 * (done ? 1 : 0.5) }}>
        <div style={{ ...ui(22 * s, 900), color: "#FFF6E4", letterSpacing: 0.8 * s }}>SEND</div>
      </div>
    </div>
  );
};

/* =========================================================================
   ⭐⭐⭐ THE REPO CARD — GitHub's OWN object, and the reel's real subject.

   ⛔ The note that produced it (Alex, 2026-09-05): *"more on brand ... github
   themed ig moreso ... and more on brand with whats being spoken since its a
   bit off topic here at times."* The hook's sentence is **"These four brand new
   open source GITHUB REPOS will completely upgrade your Claude setup"** and the
   frame showed four anonymous machine parts on chains. A viewer with the sound
   off would say "car parts", never "repos" — the MUTE TEST failure in
   [[feedback_illustrate_the_sentence_not_the_set]], and the exact defect in
   [[feedback_real_marks_are_the_props]]: a metaphor for the mechanism is not
   the subject.

   So the thing that travels is now the repo itself, drawn the way GitHub draws
   it: the repo octicon, `owner/name` with the owner muted and the name in
   GitHub's link blue, the Public pill, the real description, and the footer row
   every repo page has — language dot, star count, licence. Every string here is
   read from the GitHub API (2026-09-05), none is invented.

   The PART is what it becomes on arrival. Card in the air, hardware on the body:
   one substitution that says "repo" and "upgrade" in the same beat.
   ====================================================================== */

/** GitHub's own glyphs, drawn from the octicons 16px grid (not approximated). */
export const Octicon: React.FC<{ kind: "repo" | "star" | "fork" | "issue" | "pr" | "check"; s: number; c: string; o?: number }> =
  ({ kind, s, c, o = 1 }) => {
  const d = {
    repo: "M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8Z",
    star: "M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z",
    fork: "M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z",
    issue: "M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z",
    pr: "M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z",
    check: "M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z",
  }[kind];
  return (
    <svg width={s} height={s} viewBox="0 0 16 16" style={{ display: "block", opacity: o, flexShrink: 0 }}>
      <path d={d} fill={c} fillRule="evenodd" />
    </svg>
  );
};

/** GitHub's card colours, sampled from the light theme. */
export const GH = { bg: "#FFFFFF", line: "#D0D7DE", link: "#0969DA", text: "#1F2328", mute: "#59636E",
  green: "#1A7F37", star: "#EAC54F" } as const;

/**
 * The repo card. `w` is its width; everything scales off it, so the same object
 * is a 250px payload falling on the hero and a 470px title card in the tag beat.
 *  - `count` 0..1 eases the star number to its real value (eased ONCE, by the caller —
 *    feedback_when_the_info_is_the_number_the_box_is_decoration)
 *  - `install` 0..1 fills the green progress bar and stamps the tick: the card is
 *    being APPLIED, which is the sentence's verb
 *  - `open` 0..1 folds it in on its own vertical (a card arriving, never a fade)
 */
export const RepoCard: React.FC<{ repo: Repo; x: number; y: number; w?: number; z?: number; f: number;
  count?: number; install?: number; open?: number; rot?: number; desc?: boolean; dim?: number }> =
  ({ repo, x, y, w = 300, z = 66, f, count = 1, install = 0, open = 1, rot = 0, desc = true, dim = 0 }) => {
  const u = w / 300;                                   /* one card unit */
  const k = Math.max(0, Math.min(1, open));
  const shown = Math.round(repo.stars * Math.max(0, Math.min(1, count))).toLocaleString("en-US");
  const [owner] = repo.repo.split("/");
  const ins = Math.max(0, Math.min(1, install));
  const pad = 13 * u;
  const MK = (desc ? 92 : 60) * u;                     /* the mark is the biggest thing on the card */
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y, width: w, zIndex: z,
      transformOrigin: "50% 0%", transform: `rotate(${rot}deg) scaleY(${0.72 + 0.28 * k})`, opacity: k }}>
      <div style={{ position: "relative", background: GH.bg, border: `${2.4 * u}px solid ${GH.line}`,
        borderRadius: 10 * u, boxShadow: SH_D, padding: `${pad}px ${pad}px ${pad}px`,
        display: "flex", alignItems: "center", gap: 13 * u,
        filter: dim > 0 ? `brightness(${1 - dim * 0.34})` : undefined }}>
        {/* ⭐ THE MARK IS THE CARD. Alex, rev 3: "too much text on those cards, I wanna see more
            graphics heavy" — the description paragraph is gone, the owner/name line is a caption,
            and the two things a viewer actually reads are the repo's LOGO and its STAR COUNT. */}
        <div style={{ width: MK, height: MK, borderRadius: 13 * u, background: repo.markBg, flexShrink: 0,
          border: `${2 * u}px solid ${GH.line}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Img src={staticFile("logos/" + repo.mark)} style={{ width: MK * 0.72, height: MK * 0.72, objectFit: "contain" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 * u, minWidth: 0, flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5 * u }}>
            <Octicon kind="repo" s={13 * u} c={GH.mute} />
            <div style={{ ...ui(12.5 * u, 600), color: GH.mute, whiteSpace: "nowrap" }}>{owner}/</div>
          </div>
          <div style={{ ...ui((desc ? 31 : 24) * u, 800), color: GH.link, whiteSpace: "nowrap",
            letterSpacing: "-0.02em", lineHeight: 1.06 }}>{repo.tagName}</div>
          {/* ⛔ Alex, rev 4: "don't need to have Rust or MIT mentioned, just the name and the stars."
              The language dot and the licence were repo-page furniture; the STAR COUNT is the only
              number that earns its place, so it gets the whole row and 30u of type. */}
          <div style={{ display: "flex", alignItems: "center", gap: 6 * u, marginTop: 5 * u }}>
            <Octicon kind="star" s={(desc ? 25 : 17) * u} c={GH.star} />
            <div style={{ ...ui((desc ? 30 : 20) * u, 900), color: GH.text, whiteSpace: "nowrap",
              letterSpacing: "-0.03em" }}>{shown}</div>
          </div>
        </div>
        {/* the GitHub mark, small, where a repo page puts it */}
        <div style={{ position: "absolute", right: 9 * u, top: 9 * u, opacity: 0.5 }}>
          <Img src={staticFile("logos/github.svg")} style={{ width: 15 * u, height: 15 * u }} />
        </div>
        {/* ⭐ INSTALLING — the card is being APPLIED: a real bar that fills, then a tick. */}
        {ins > 0.001 && (
          <div style={{ position: "absolute", left: pad, right: pad, bottom: -7 * u, height: 6 * u,
            borderRadius: 4 * u, background: hexa(GH.line, 0.9), overflow: "hidden" }}>
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${ins * 100}%`,
              background: `linear-gradient(90deg, ${GH.green}, ${mxh(GH.green, 0.3)})` }} />
          </div>
        )}
        {ins > 0.98 && (
          <div style={{ position: "absolute", right: -11 * u, top: -11 * u, width: 32 * u, height: 32 * u,
            borderRadius: "50%", background: GH.green, display: "flex", alignItems: "center",
            justifyContent: "center", boxShadow: SH }}>
            <Octicon kind="check" s={20 * u} c="#FFFFFF" />
          </div>
        )}
      </div>
    </div>
  );
};

/** the GitHub wordmark on a lit shop sign — the ≥96px real mark the per-scene
    contract in [[feedback_real_marks_are_the_props]] asks for, made diegetic. */
export const GhSign: React.FC<{ x: number; y: number; w?: number; z?: number; on?: number; f: number }> =
  ({ x, y, w = 300, z = 30, on = 1, f }) => {
  const u = w / 300, k = Math.max(0, Math.min(1, on));
  const flick = k * (0.94 + 0.06 * Math.sin(f / 5.5));
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y, width: w, height: 84 * u, zIndex: z }}>
      {/* the two brackets holding it off the wall */}
      {[0.16, 0.84].map((p, i) => (
        <div key={i} style={{ position: "absolute", left: w * p - 3 * u, top: -16 * u, width: 6 * u, height: 18 * u,
          background: dkh(IRON, 0.28) }} />
      ))}
      <div style={{ position: "absolute", inset: 0, borderRadius: 10 * u, background: "#161B22",
        border: `${3 * u}px solid ${dkh(IRON, 0.2)}`, boxShadow: SH_D, display: "flex", alignItems: "center",
        justifyContent: "center", gap: 12 * u, opacity: 0.5 + 0.5 * k }}>
        <Img src={staticFile("logos/github.svg")}
          style={{ width: 46 * u, height: 46 * u, filter: `invert(1) brightness(${0.7 + 0.3 * flick})` }} />
        <div style={{ ...ui(31 * u, 900), color: hexa("#FFFFFF", 0.5 + 0.5 * flick), letterSpacing: "-0.02em" }}>GitHub</div>
      </div>
      {/* the pool it throws on the wall below */}
      {k > 0.05 && (
        <div style={{ position: "absolute", left: -w * 0.16, top: 78 * u, width: w * 1.32, height: 120 * u,
          zIndex: -1, opacity: 0.16 * k, background: `radial-gradient(ellipse at 50% 0%, #FFFFFF 0%, transparent 70%)` }} />
      )}
    </div>
  );
};

/* =========================================================================
   ⭐⭐ THE REPO GEM — Alex, rev 3: *"I want to see four glowing gems that come
   into the middle of the screen ... to the front of the screen ... so it's more
   interesting."*  The descending cards read as information; a gem flying at the
   camera reads as a PRIZE, and four of them converging on one hero is the top
   row of the motion table besides.

   ⛔ It still has to say REPO, so each gem carries that repo's REAL mark on its
   table and its star count under it — the card's two graphic facts, on a gem.
   ⛔ And it is CUT AND SHADED, not a blurred blob: a table, four crown facets, a
   pavilion, a specular. The halo is a soft pool at 0.34, not a neon bloom — the
   room around it stays lit, so this is a bright object in a lit shop and never
   neon-on-black ([[feedback_arcade_world_means_neon_on_black]]).
   ====================================================================== */
export const Gem: React.FC<{ repo: Repo; x: number; y: number; s?: number; z?: number; f: number;
  lit?: number; spin?: number; mark?: boolean; stars?: number; label?: boolean; shake?: number;
  glow?: number; trail?: number }> =
  ({ repo, x, y, s = 190, z = 70, f, lit = 1, spin = 0, mark = true, stars = 1, label = true, shake = 0,
     glow = 1, trail = 0 }) => {
  const k = Math.max(0, Math.min(1, lit));
  /* ⛔ Alex, rev 4: "the gems should be moving or shaking or glowing, more interesting." A gem that
     sits still is a shape; these BREATHE (halo + scale), JITTER on their own clock, sweep a GLINT
     across the facets every 40 frames, and carry three sparks orbiting the crown. */
  const pulse = 0.9 + 0.1 * Math.sin(f / 6 + x / 90);
  const breathe = 1 + 0.045 * Math.sin(f / 7.5 + x / 70) * k;
  const jx = Math.sin(f / 3.1 + x / 40) * 2.2 * k + Math.sin(f * 1.7) * 5 * shake;
  const jy = Math.cos(f / 3.7 + x / 55) * 2.0 * k + Math.cos(f * 1.9) * 5 * shake;
  const glint = ((f + x / 3) % 46) / 46;          /* 0..1, sweeps the face */
  const CUT = "polygon(28% 0%, 72% 0%, 100% 34%, 50% 100%, 0% 34%)";
  const shown = Math.round(repo.stars * Math.max(0, Math.min(1, stars))).toLocaleString("en-US");
  return (
    <div style={{ position: "absolute", left: x - s / 2 + jx, top: y - s / 2 + jy, width: s, height: s, zIndex: z,
      transform: `scale(${breathe})`, transformOrigin: "50% 60%" }}>
      {/* ⛔⛔ COLOURED GLOW, ON PURPOSE. [[feedback_reel_matte_palette]] bans emissive bloom outright
          ("no boxShadow 0 0 Npx colour") and it is a rule written from Alex's own notes on reels
          46, 79 and 124. He asked for it here by name: *"it should be glowing and stuff, glowing
          neon."* ⭐ The failure that rule guards against is neon-on-BLACK — glowing accents on a dark
          ground reading as vibecoded UI. This bay is near-WHITE and the glow is confined to the four
          GEMS in the hook; every body scene keeps the matte palette untouched. */}
      {/* the wide soft pool */}
      <div style={{ position: "absolute", left: -s * 0.72, top: -s * 0.68, width: s * 2.44, height: s * 2.44,
        borderRadius: "50%", opacity: 0.46 * k * glow * pulse, zIndex: -2,
        background: `radial-gradient(circle, ${hexa(mxh(repo.c, 0.62), 0.95)} 0%, ${hexa(repo.c, 0.5)} 26%, ${hexa(repo.c, 0.18)} 46%, ${hexa(repo.c, 0)} 70%)` }} />
      {/* the tight hot core halo */}
      <div style={{ position: "absolute", left: -s * 0.20, top: -s * 0.16, width: s * 1.40, height: s * 1.40,
        borderRadius: "50%", opacity: 0.72 * k * glow * pulse, zIndex: -1,
        background: `radial-gradient(circle, ${hexa("#FFFFFF", 0.9)} 0%, ${hexa(mxh(repo.c, 0.7), 0.8)} 22%, ${hexa(repo.c, 0)} 62%)` }} />
      {/* ⭐ light rays, pulsing on their own clock */}
      {glow > 0.05 && Array.from({ length: 8 }, (_, i) => {
        const len = s * (0.62 + 0.26 * Math.abs(Math.sin(f / 5 + i * 0.9))) * k * glow;
        return (
          <div key={"ry" + i} style={{ position: "absolute", left: "50%", top: "50%", width: len, height: s * 0.028,
            marginTop: -s * 0.014, zIndex: -1, transformOrigin: "0% 50%", borderRadius: s * 0.014,
            transform: `rotate(${i * 45 + f * 0.7}deg)`, opacity: 0.5 * k * glow,
            background: `linear-gradient(90deg, ${hexa("#FFF6E2", 0.9)}, ${hexa(repo.c, 0.5)} 40%, ${hexa(repo.c, 0)})` }} />
        );
      })}
      {/* the comet trail while it is travelling */}
      {trail > 0.02 && (
        <div style={{ position: "absolute", left: "50%", top: "50%", width: s * 2.6 * trail, height: s * 0.5,
          marginTop: -s * 0.25, zIndex: -2, transformOrigin: "0% 50%", borderRadius: s * 0.25,
          transform: `rotate(${spin > 0 ? 158 : 202}deg)`, opacity: 0.5 * trail * glow,
          background: `linear-gradient(90deg, ${hexa(mxh(repo.c, 0.5), 0.8)}, ${hexa(repo.c, 0)})` }} />
      )}
      <div style={{ position: "absolute", inset: 0, transform: `rotate(${spin}deg)` }}>
        {/* the body */}
        <div style={{ position: "absolute", inset: 0, clipPath: CUT, boxShadow: SH_D,
          background: `linear-gradient(160deg, ${mxh(repo.c, 0.62)} 0%, ${repo.c} 38%, ${dkh(repo.c2, 0.18)} 100%)` }} />
        {/* the table, flat and brightest */}
        <div style={{ position: "absolute", left: "28%", top: 0, width: "44%", height: "34%",
          background: `linear-gradient(180deg, ${mxh(repo.c, 0.78)}, ${mxh(repo.c, 0.36)})`,
          borderBottom: `${s * 0.012}px solid ${hexa("#FFFFFF", 0.45)}` }} />
        {/* two crown facets */}
        <div style={{ position: "absolute", inset: 0, clipPath: "polygon(28% 0%, 0% 34%, 26% 34%)",
          background: hexa("#FFFFFF", 0.20) }} />
        <div style={{ position: "absolute", inset: 0, clipPath: "polygon(72% 0%, 100% 34%, 74% 34%)",
          background: hexa("#000000", 0.16) }} />
        {/* the pavilion, split so the point reads */}
        <div style={{ position: "absolute", inset: 0, clipPath: "polygon(50% 34%, 100% 34%, 50% 100%)",
          background: hexa("#000000", 0.20) }} />
        <div style={{ position: "absolute", inset: 0, clipPath: "polygon(0% 34%, 50% 34%, 50% 100%)",
          background: hexa("#FFFFFF", 0.10) }} />
        {/* the specular — one hard highlight is what makes a facet read as cut */}
        <div style={{ position: "absolute", left: "31%", top: "3%", width: "16%", height: "24%",
          background: hexa("#FFFFFF", 0.62 * pulse), clipPath: "polygon(0 0, 100% 0, 60% 100%, 0 70%)" }} />
        {/* the emissive core inside the stone: what makes it read as LIT and not merely bright */}
        <div style={{ position: "absolute", left: "26%", top: "14%", width: "48%", height: "44%",
          borderRadius: "50%", opacity: 0.5 * k * glow * pulse,
          background: `radial-gradient(circle, ${hexa("#FFFFFF", 0.95)} 0%, ${hexa(mxh(repo.c, 0.75), 0.7)} 44%, ${hexa(repo.c, 0)} 78%)` }} />
        {/* ⭐ the GLINT: a bright bar sweeping the whole cut, clipped to the stone */}
        {glint < 0.34 && (
          <div style={{ position: "absolute", inset: 0, clipPath: CUT, overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "-40%", bottom: "-40%", width: "26%",
              left: `${-30 + glint * 3.4 * 100}%`, transform: "rotate(18deg)",
              background: `linear-gradient(90deg, ${hexa("#FFFFFF", 0)}, ${hexa("#FFFFFF", 0.55 * k)}, ${hexa("#FFFFFF", 0)})` }} />
          </div>
        )}
      </div>
      {/* three sparks orbiting the crown, each on its own radius and clock */}
      {k > 0.25 && [0, 1, 2].map((i) => {
        const a2 = f / (13 + i * 4) + i * 2.1;
        const rr = s * (0.52 + 0.07 * i);
        const sz = s * (0.055 - i * 0.008);
        return (
          <div key={"sp" + i} style={{ position: "absolute", left: s / 2 + Math.cos(a2) * rr - sz / 2,
            top: s * 0.44 + Math.sin(a2) * rr * 0.52 - sz / 2, width: sz, height: sz, borderRadius: "50%",
            background: hexa("#FFF8E6", 0.85 * k * (0.5 + 0.5 * Math.sin(f / 4 + i))), zIndex: 3 }} />
        );
      })}
      {/* the repo's real mark, set into the table */}
      {mark && (
        <div style={{ position: "absolute", left: s * 0.335, top: s * 0.055, width: s * 0.33, height: s * 0.235,
          borderRadius: s * 0.05, background: repo.markBg, display: "flex", alignItems: "center",
          justifyContent: "center", boxShadow: SH, zIndex: 2 }}>
          <Img src={staticFile("logos/" + repo.mark)}
            style={{ width: s * 0.20, height: s * 0.20, objectFit: "contain" }} />
        </div>
      )}
      {/* name + stars, as small graphic chips — the card's two facts, no paragraph */}
      {label && (
        <div style={{ position: "absolute", left: -s * 0.19, top: s * 1.0, width: s * 1.38, zIndex: 3,
          display: "flex", flexDirection: "column", alignItems: "center", gap: s * 0.022 }}>
          <div style={{ ...ui(s * 0.15 * Math.min(1, 8 / repo.tagName.length), 900), color: "#FFF6E4", letterSpacing: "-0.02em",
            textShadow: `0 ${s * 0.012}px ${s * 0.03}px rgba(0,0,0,.65)`, whiteSpace: "nowrap" }}>{repo.tagName}</div>
          <div style={{ display: "flex", alignItems: "center", gap: s * 0.03, background: hexa("#12100C", 0.62),
            borderRadius: s * 0.06, padding: `${s * 0.012}px ${s * 0.055}px` }}>
            <Octicon kind="star" s={s * 0.10} c={GH.star} />
            <div style={{ ...ui(s * 0.105, 800), color: "#FFF6E4", whiteSpace: "nowrap" }}>{shown}</div>
          </div>
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   ⭐⭐ THE DOC MORPH — Alex, rev 3: *"I don't want the main focus to be just the
   machine. I want the focus to be the DOCUMENT, like how they transform ...
   showing a more interesting animation on how they transform."*

   So the transformation is drawn as a transformation, not a crossfade: the
   Office junk PEELS OFF the page and flies away piece by piece — the coloured
   header band, the pie chart, the shape block, the tinted table cells — while
   the ragged proportional lines SNAP to aligned monospace and pick up their `#`
   and `-` markers. Same page throughout, so the eye tracks one object changing
   ([[feedback_make_an_action_read]]: an action is a DISTANCE, not a state swap).
   ====================================================================== */
export const DocMorph: React.FC<{ x: number; y: number; w?: number; t?: number; kind?: FileKind;
  f: number; z?: number; rot?: number }> =
  ({ x, y, w = 330, t = 0, kind = "ppt", f, z = 70, rot = 0 }) => {
  const u = w / 330, H2 = w * 1.28;
  const k = Math.max(0, Math.min(1, t));
  const tint = { ppt: "#C7502B", doc: "#2B5EA8", xls: "#1E7145" }[kind];
  const icon = { ppt: "ft_powerpoint.svg", doc: "ft_word.svg", xls: "ft_excel.svg" }[kind];
  const LINES = [0.86, 0.62, 0.94, 0.55, 0.78, 0.7, 0.9, 0.48];
  /* ⭐⭐ Alex, rev 4: "have a SLIDER thing that swipes down or from the side on the documents, kind
     of showing HOW it does that." So the page is two complete layers — the Office original and the
     finished Markdown — and a bright scan head wipes left to right across it. Everything behind the
     head is converted, everything ahead of it is untouched, and each piece of junk flies off at the
     moment the head reaches ITS column. The mechanism is visible, not implied. */
  const head = k;                                   /* 0..1 across the page */
  const HX = head * 100;                            /* the head's x, in % */
  const gone = (px: number) => Math.max(0, Math.min(1, (head - px) / 0.16));
  const office = (
    <>
      <div style={{ position: "absolute", left: 0, top: 0, right: 0, height: 46 * u, background: tint }} />
      <div style={{ position: "absolute", left: 16 * u, top: 14 * u, width: 150 * u, height: 16 * u,
        borderRadius: 3 * u, background: "#FFFFFF", opacity: 0.92 }} />
      <div style={{ position: "absolute", right: 12 * u, top: 11 * u, width: 30 * u, height: 30 * u,
        borderRadius: 6 * u, background: "#FFFFFF", border: `${1.6 * u}px solid #E2DCCC`,
        display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Img src={staticFile("logos/" + icon)} style={{ width: 21 * u, height: 21 * u, objectFit: "contain" }} />
      </div>
      {LINES.map((wd, i) => (
        <div key={"o" + i} style={{ position: "absolute", left: 16 * u, top: (64 + i * 21) * u,
          width: 298 * u * wd * 0.94, height: 9 * u, borderRadius: 2 * u,
          background: i % 3 === 0 ? "#7A8794" : "#9AA3AC" }} />
      ))}
    </>
  );
  const markdown = (
    <>
      <div style={{ position: "absolute", left: 0, top: 0, right: 0, height: 46 * u, background: "#F7F2E4" }} />
      <div style={{ position: "absolute", left: 16 * u, top: 15 * u, ...mono(17 * u, 800), color: "#C7502B" }}>#</div>
      <div style={{ position: "absolute", left: 32 * u, top: 18 * u, width: 106 * u, height: 12 * u,
        borderRadius: 3 * u, background: "#1F2328" }} />
      <div style={{ position: "absolute", right: 12 * u, top: 13 * u, ...mono(13 * u, 800), color: "#1A7F37",
        border: `${1.6 * u}px solid #1A7F37`, borderRadius: 5 * u, padding: `${2 * u}px ${6 * u}px` }}>MD</div>
      {LINES.map((wd, i) => {
        const mk = i === 2 || i === 3 || i === 6;
        return (
          <React.Fragment key={"m" + i}>
            {mk && <div style={{ position: "absolute", left: 16 * u, top: (62 + i * 21) * u,
              ...mono(13 * u, 800), color: "#C7502B" }}>-</div>}
            <div style={{ position: "absolute", left: (16 + (mk ? 14 : 0)) * u, top: (64 + i * 21) * u,
              width: (298 - (mk ? 14 : 0)) * u * 0.92 * 0.94, height: 7.4 * u, borderRadius: 2 * u,
              background: "#3A3F45" }} />
          </React.Fragment>
        );
      })}
      <div style={{ position: "absolute", left: 20 * u, top: 250 * u, right: 20 * u,
        ...mono(13 * u, 700), color: "#3A3F45", lineHeight: 1.6 }}>
        <div>| region | total |</div><div>|--------|-------|</div>
        <div>| north  |  ####  |</div><div>| south  |  ###   |</div>
      </div>
    </>
  );
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - H2 / 2, width: w, height: H2, zIndex: z,
      transform: `rotate(${rot}deg)`, transformOrigin: "50% 50%" }}>
      <div style={{ position: "absolute", inset: 0, background: "#FFFFFF", borderRadius: 7 * u, boxShadow: SH_D,
        border: `${2.4 * u}px solid #D8D2C4` }}>
        {/* the untouched original, revealed AHEAD of the head */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", borderRadius: 5 * u,
          clipPath: `inset(0 0 0 ${HX}%)` }}>{office}</div>
        {/* the finished markdown, revealed BEHIND it */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", borderRadius: 5 * u,
          background: "#F7F2E4", clipPath: `inset(0 ${100 - HX}% 0 0)` }}>{markdown}</div>
        {/* the junk: each piece leaves when the head reaches its own column */}
        {[{ px: 0.70, l: 210, t: 240, kind: "pie" }, { px: 0.16, l: 22, t: 250, kind: "block" },
          { px: 0.30, l: 22, t: 336, kind: "table" }].map((j2, i) => {
          const g = gone(j2.px);
          if (g >= 1) return null;
          const st: React.CSSProperties = { position: "absolute", opacity: 1 - g, zIndex: 4,
            transform: `translate(${g * (i === 1 ? 400 : -380) * u}px, ${-g * (250 + i * 90) * u}px) rotate(${g * (i % 2 ? 128 : -140)}deg) scale(${1 - g * 0.28})` };
          if (j2.kind === "pie") return (
            <div key={i} style={{ ...st, left: j2.l * u, top: j2.t * u, width: 82 * u, height: 82 * u,
              borderRadius: "50%", background: `conic-gradient(${tint} 0 42%, #E8B23C 42% 68%, #4E8FD1 68% 100%)`,
              border: `${2 * u}px solid #FFFFFF` }} />
          );
          if (j2.kind === "block") return (
            <div key={i} style={{ ...st, left: j2.l * u, top: j2.t * u, width: 108 * u, height: 62 * u,
              borderRadius: 5 * u, background: `linear-gradient(140deg, ${mxh(tint, 0.3)}, ${tint})`,
              border: `${2 * u}px solid #FFFFFF` }} />
          );
          return (
            <div key={i} style={{ ...st, left: j2.l * u, top: j2.t * u, width: 268 * u, height: 60 * u,
              display: "grid", gridTemplateColumns: "repeat(4,1fr)", gridTemplateRows: "repeat(3,1fr)", gap: 2 * u }}>
              {Array.from({ length: 12 }, (_, c) => (
                <div key={c} style={{ background: c < 4 ? tint : hexa(tint, 0.16 + (c % 3) * 0.1) }} />
              ))}
            </div>
          );
        })}
        {/* ⭐ THE SCAN HEAD: a bright bar with a warm edge, sparks trailing off it */}
        {head > 0.005 && head < 0.995 && (
          <>
            <div style={{ position: "absolute", left: `calc(${HX}% - ${3 * u}px)`, top: -6 * u, bottom: -6 * u,
              width: 6 * u, background: "#FFF3D0", boxShadow: `0 0 ${16 * u}px ${hexa("#FFC94A", 0.9)}`, zIndex: 6 }} />
            <div style={{ position: "absolute", left: `calc(${HX}% - ${34 * u}px)`, top: 0, bottom: 0,
              width: 34 * u, zIndex: 5,
              background: `linear-gradient(90deg, ${hexa("#1A7F37", 0)}, ${hexa("#1A7F37", 0.22)})` }} />
            {[0, 1, 2, 3].map((i) => (
              <div key={"sk" + i} style={{ position: "absolute", left: `calc(${HX}% - ${(4 + i * 9) * u}px)`,
                top: `${12 + ((f * 7 + i * 61) % 76)}%`, width: 5 * u, height: 5 * u, borderRadius: "50%",
                background: hexa("#FFE9A6", 0.9 - i * 0.2), zIndex: 7 }} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

/* =========================================================================
   ⭐⭐⭐ THE SLED — the load the hook's body works against.

   ⛔ Alex, rev 6: *"the first 5 seconds are not interesting enough whatsoever,
   people scrolled away hard within the first even 3 seconds."* Written in a column,
   the three hooks this reel has had were one concept in three costumes:

     round 1  four PARTS hang on chains · a Claude on a lift RISES · one LOCKS on
     round 2  four REPO CARDS descend    · a Claude on a lift RISES · one INSTALLS
     round 3  four GEMS fly to the front · a Claude on a lift RISES · one is ABSORBED

   → *in all of these, objects come to a Claude who is standing still.* **PASSIVE
   ACCRETION.** The objects travelled; the hero received. Every winning hook in this
   repo is ONE BODY AGAINST A LOAD, mid-action at f0, travelling at least a third of
   its own body width ([[feedback_read_the_winning_hook_do_not_just_measure_it]],
   [[feedback_one_concept_four_costumes]]).

   So he DRAGS. This is the load: a flatbed piled with the reel's own four villains —
   the Office files that break the model, the tangled agent window, the dead core and
   the dry drum — on wheels that ROLL (rotation derived from distance, not a spin), a
   tow bar, and hazard stripes. Every repo that lands makes it move further.
   ====================================================================== */
export const Sled: React.FC<{ x: number; y: number; f: number; s?: number; z?: number;
  roll?: number; lift?: number; jolt?: number; heroSide?: "left" | "right" }> =
  ({ x, y, f, s = 1, z = 50, roll = 0, lift = 0, jolt = 0, heroSide = "right" }) => {
  /* ⛔ the cargo nearest the HERO is the only cargo a viewer reliably sees, because the far end is
     always the end cropped by the panel edge. `heroSide` puts the Office files at that end without
     mirroring the sled (which would flip the file logos). */
  const CG = heroSide === "right"
    ? { files: 372, mon: 176, drum: 44, core: 150 }
    : { files: 24, mon: 236, drum: 448, core: 396 };
  const W2 = 560 * s, BED = 46 * s, WR = 54 * s;
  const left = x - W2 / 2, bedTop = y - WR - BED - lift * 26 * s;
  /* ⛔ the wheels turn because the sled MOVED, not because time passed — a wheel spinning
     off `f` reads as a prop that is on, and a wheel spinning off distance reads as weight. */
  const deg = -(roll / (2 * Math.PI * WR)) * 360;
  const tilt = lift * -4 + jolt * 1.6;
  return (
    <div style={{ position: "absolute", left: 0, top: 0, width: W, height: H, zIndex: z,
      transform: `rotate(${tilt}deg)`, transformOrigin: `${x}px ${y}px` }}>
      {/* the two wheels, with spokes and a hub so the rotation is visible */}
      {[left + W2 * 0.20, left + W2 * 0.78].map((wx, i) => (
        <div key={"wh" + i} style={{ position: "absolute", left: wx - WR, top: y - WR * 2, width: WR * 2, height: WR * 2,
          borderRadius: "50%", background: `radial-gradient(circle at 42% 38%, ${mxh(IRON, 0.12)} 0 38%, #201D19 40%)`,
          border: `${5 * s}px solid #17150F`, boxShadow: SH_D,
          transform: `rotate(${deg + i * 23}deg)` }}>
          {[0, 1, 2, 3].map((k) => (
            <div key={k} style={{ position: "absolute", left: "50%", top: "50%", width: WR * 1.5, height: 5 * s,
              marginLeft: -WR * 0.75, marginTop: -2.5 * s, background: mxh(IRON, 0.24),
              transform: `rotate(${k * 45}deg)`, borderRadius: 2 }} />
          ))}
          <div style={{ position: "absolute", left: "50%", top: "50%", width: WR * 0.5, height: WR * 0.5,
            marginLeft: -WR * 0.25, marginTop: -WR * 0.25, borderRadius: "50%",
            background: `linear-gradient(180deg, ${mxh(BRASS, 0.2)}, ${dkh(BRASS, 0.4)})` }} />
        </div>
      ))}
      {/* the bed, with a hazard skirt */}
      <div style={{ position: "absolute", left, top: bedTop, width: W2, height: BED, zIndex: 2, borderRadius: 5 * s,
        background: `linear-gradient(180deg, ${mxh(IRON, 0.2)} 0%, ${IRON} 40%, ${dkh(IRON, 0.4)} 100%)`, boxShadow: SH_D }} />
      <div style={{ position: "absolute", left, top: bedTop + BED - 12 * s, width: W2, height: 14 * s, zIndex: 3,
        background: `repeating-linear-gradient(-45deg, ${GOLD} 0 18px, ${INK} 18px 36px)`, opacity: 0.92 }} />
      {/* the tow bar, angled up to the hero's shoulder */}
      <div style={{ position: "absolute", left: heroSide === "right" ? left + W2 - 6 * s : left - 144 * s, top: bedTop - 96 * s, width: 150 * s, height: 11 * s,
        zIndex: 4, borderRadius: 6 * s, transformOrigin: heroSide === "right" ? "0% 50%" : "100% 50%", transform: `rotate(${heroSide === "right" ? -33 : 33}deg)`,
        background: `linear-gradient(180deg, ${mxh(IRON, 0.3)}, ${dkh(IRON, 0.34)})` }} />
      {/* ⭐ THE CARGO IS THE REEL'S OWN FOUR VILLAINS, stacked and strapped */}
      <div style={{ position: "absolute", left: left + CG.files * s, top: bedTop - 172 * s, width: 172 * s, height: 174 * s,
        zIndex: 4, borderRadius: 5 * s, background: `linear-gradient(150deg, ${mxh("#8C6A46", 0.2)}, #6E5236)`,
        border: `${4 * s}px solid #4E3A26`, boxShadow: SH_D, display: "flex", flexWrap: "wrap",
        alignContent: "center", justifyContent: "center", gap: 8 * s, padding: 10 * s }}>
        {["ft_word.svg", "ft_powerpoint.svg", "ft_excel.svg", "ft_word.svg"].map((ic, i) => (
          <div key={ic + i} style={{ width: 62 * s, height: 62 * s, borderRadius: 9 * s, background: "#FFFFFF",
            display: "flex", alignItems: "center", justifyContent: "center", boxShadow: SH }}>
            <Img src={staticFile("logos/" + ic)} style={{ width: 44 * s, height: 44 * s, objectFit: "contain" }} />
          </div>
        ))}
      </div>
      {/* a dead monitor, screen cracked and dark */}
      <div style={{ position: "absolute", left: left + CG.mon * s, top: bedTop - 122 * s, width: 172 * s, height: 124 * s,
        zIndex: 4, borderRadius: 7 * s, background: "#2E2822", border: `${5 * s}px solid #1E1A16`, boxShadow: SH_D }}>
        <div style={{ position: "absolute", inset: 8 * s, background: "#151A22", borderRadius: 3 * s, overflow: "hidden" }}>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} style={{ position: "absolute", left: 8 * s, top: (10 + i * 20) * s,
              width: (40 + i * 26) * s, height: 6 * s, borderRadius: 2, background: hexa("#8A93A0", 0.5) }} />
          ))}
          <div style={{ position: "absolute", left: "18%", top: 0, bottom: 0, width: 3 * s,
            background: hexa("#FFFFFF", 0.35), transform: "rotate(9deg)" }} />
        </div>
      </div>
      {/* the dry drum, tipped, and a dead core beside it */}
      <div style={{ position: "absolute", left: left + CG.drum * s, top: bedTop - 118 * s, width: 96 * s, height: 120 * s,
        zIndex: 4, borderRadius: 8 * s, boxShadow: SH_D,
        background: `linear-gradient(90deg, ${dkh(GREEN, 0.44)} 0%, ${dkh(GREEN, 0.2)} 40%, ${dkh(GREEN, 0.5)} 100%)`,
        border: `${3 * s}px solid ${dkh(GREEN, 0.6)}` }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 28 * s, height: 12 * s, background: hexa("#000000", 0.3) }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 66 * s, height: 12 * s, background: hexa("#000000", 0.3) }} />
      </div>
      <div style={{ position: "absolute", left: left + CG.core * s, top: bedTop - 76 * s, width: 64 * s, height: 64 * s,
        zIndex: 4, borderRadius: "50%", background: `radial-gradient(circle at 40% 36%, #6E6478, #35303C)`,
        border: `${4 * s}px solid #241F2A`, boxShadow: SH }} />
      {/* the strap over the whole load */}
      {/* ⛔ the strap was CLAY and read on the probe as a salmon line crossing the frame at the
          hero's chest — the same hue as the sprite. Dark webbing, and it sits over the load. */}
      <div style={{ position: "absolute", left: left + 12 * s, top: bedTop - 78 * s, width: W2 - 24 * s, height: 11 * s,
        zIndex: 6, background: `linear-gradient(180deg, #554C40 0%, #3A342B 50%, #221E19 100%)`, borderRadius: 3 }} />
    </div>
  );
};

/* =========================================================================
   ⭐⭐⭐ THE ROTOR — the real Claude mark, huge, in a machine that will not turn.

   ⛔ Alex, rev 8, rejecting the haul: *"I don't understand the concept of the gem
   coming in and he's wheeling the thing, wtf is he even wheeling, it looks so odd
   and out of place, it doesn't even seem on topic with Claude — maybe it should be
   a big logo of Claude with white background idk."*

   Rounds 1-3 were passive accretion and round 4 fixed the SHAPE but introduced a
   different defect: the load was an INVENTED object. A viewer has three seconds and
   spent them decoding a cart. ⭐ Take the half-formed image from the person who knows
   the script — "idk" marks uncertainty about the DRAWING, never about the instinct
   ([[feedback_illustrate_the_sentence_not_the_set]]) — and the house rules already
   agreed with it: *"striking comes from SCALE and REAL BRAND COLOUR, a single logo
   at 416px in the product's own colour beats six props"* ([[feedback_hook_simplicity]])
   and *"the hero scene carries the Claude mark at 200px+"*
   ([[feedback_real_marks_are_the_props]]).

   So the hook IS the Claude mark, 300px, on a near-white cyclorama, mounted in a
   dark steel rotor that judders and stalls. Four GitHub repos slot into its rim and
   it spins up: grey and stuck → full colour and running. Nothing to decode.
   ⛔ The mark is the REAL `claude.svg`, never redrawn.
   ====================================================================== */
export const Rotor: React.FC<{ x: number; y: number; f: number; d?: number; z?: number;
  angle?: number; lit?: number; filled?: number; judder?: number; hit?: number; rate?: number }> =
  ({ x, y, f, d = 540, z = 60, angle = 0, lit = 0, filled = 0, judder = 0, hit = 0, rate = 0 }) => {
  const R = d / 2, RING = d * 0.095;
  const k = Math.max(0, Math.min(1, lit));
  const jx = Math.sin(f * 1.9) * 5 * judder, jy = Math.cos(f * 2.3) * 4 * judder;
  const SOCK = [0, 90, 180, 270];
  return (
    <div style={{ position: "absolute", left: x - R + jx, top: y - R + jy, width: d, height: d, zIndex: z }}>
      {/* the light it throws once it is running — a pool, never a bloom ring */}
      {k > 0.04 && (
        <div style={{ position: "absolute", left: -R * 0.55, top: -R * 0.55, width: d * 1.55, height: d * 1.55,
          borderRadius: "50%", zIndex: -1, opacity: 0.42 * k,
          background: `radial-gradient(circle, ${hexa("#FFD9A8", 0.85)} 0%, ${hexa(CLAY, 0.34)} 38%, ${hexa(CLAY, 0)} 70%)` }} />
      )}
      {/* the ring: the near-black mass that gives the white ground its value structure */}
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", boxShadow: SH_D,
        background: `conic-gradient(from ${angle}deg, #23201C 0deg, #3E3831 22deg, #23201C 45deg, #453E36 68deg, #23201C 90deg)`,
        transform: `scale(${1 + hit * 0.03})` }} />
      {/* the machined face of the ring, with teeth that make the rotation visible */}
      <div style={{ position: "absolute", inset: RING * 0.30, borderRadius: "50%", overflow: "hidden",
        background: "#191713", transform: `rotate(${angle}deg)` }}>
        {Array.from({ length: 36 }, (_, i) => (
          <div key={"t" + i} style={{ position: "absolute", left: "50%", top: 0, width: d * 0.018,
            height: RING * 0.62, marginLeft: -d * 0.009, transformOrigin: `50% ${R - RING * 0.30}px`,
            transform: `rotate(${i * 10}deg)`, borderRadius: 2,
            background: i % 3 === 0 ? mxh(BRASS, 0.1) : hexa("#6E655A", 0.75) }} />
        ))}
      </div>
      {/* the hub the mark sits on — near-white, so the logo reads at any size */}
      <div style={{ position: "absolute", inset: RING, borderRadius: "50%",
        background: `radial-gradient(circle at 42% 34%, #FFFFFF 0%, #F4EFE6 62%, #E2DACB 100%)`,
        border: `${d * 0.012}px solid #CFC6B4`, boxShadow: `inset 0 ${d * 0.02}px ${d * 0.05}px ${hexa("#000000", 0.16)}` }} />
      {/* ⭐ THE REAL CLAUDE MARK, dead grey while it is stuck and full colour once it runs */}
      <div style={{ position: "absolute", left: d * 0.175, top: d * 0.175, width: d * 0.65, height: d * 0.65,
        zIndex: 3, transform: `rotate(${angle * 0.5}deg) scale(${0.92 + 0.08 * k + hit * 0.05})`,
        filter: `grayscale(${(1 - k) * 0.92}) contrast(${0.86 + 0.34 * k}) brightness(${0.72 + 0.42 * k})` }}>
        <Img src={staticFile("logos/claude.svg")} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      </div>
      {/* ⭐ SPEED ARCS off the rim — their length is the actual degrees-per-frame, so the eye reads
          acceleration and not just rotation */}
      {rate > 0.6 && [0, 1, 2, 3, 4, 5].map((i) => {
        const len = Math.min(78, rate * 7.5);
        return (
          <div key={"ar" + i} style={{ position: "absolute", left: "50%", top: "50%", width: len, height: d * 0.018,
            marginTop: -d * 0.009, zIndex: 6, borderRadius: d * 0.01, transformOrigin: "0% 50%",
            transform: `rotate(${angle * 0.7 + i * 60}deg) translateX(${R * 1.03}px)`,
            background: `linear-gradient(90deg, ${hexa(CLAY, 0.72)}, ${hexa(CLAY, 0)})` }} />
        );
      })}
      {/* the four sockets on the rim: empty and dark, then filled and lit */}
      {SOCK.map((deg, i) => {
        const on = i < filled;
        return (
          <div key={"s" + i} style={{ position: "absolute", left: "50%", top: "50%", width: d * 0.20, height: d * 0.13,
            marginLeft: -d * 0.10, marginTop: -d * 0.065, zIndex: 4,
            transform: `rotate(${deg + angle}deg) translateY(${-R + RING * 0.5}px)` }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: d * 0.022,
              background: on
                ? `linear-gradient(180deg, ${mxh(REPOS[i].c, 0.3)}, ${REPOS[i].c} 55%, ${dkh(REPOS[i].c2, 0.2)})`
                : "#141210",
              border: `${d * 0.008}px solid ${on ? dkh(REPOS[i].c2, 0.4) : "#0C0B09"}`,
              boxShadow: on ? SH : undefined, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {on && (
                <div style={{ width: d * 0.075, height: d * 0.075, borderRadius: d * 0.016, background: REPOS[i].markBg,
                  display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Img src={staticFile("logos/" + REPOS[i].mark)}
                    style={{ width: d * 0.055, height: d * 0.055, objectFit: "contain" }} />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

/** the bright test bay. ⛔ Alex, rev 9: cuts 1 and 2 need "elevating significantly". The first pass
    was a flat gradient sheet — no floor, no horizon, no key, so the mark floated on paper. This is a
    real cyclorama: a wall, a floor plane with a horizon seam, a soft overhead key that warms as the
    mark comes up, a falloff into the corners, and the shop's own gantry cropped by the top edge so
    the bay is still a place in this world ([[feedback_rooms_need_an_architecture_layer]]). */
export const Cyc: React.FC<{ z?: number; warm?: number; f?: number }> = ({ z = 8, warm = 0, f = 0 }) => {
  const HZ = 618;                                    /* where the wall meets the floor */
  const wall = lerpHex("#F4F0E7", "#FBEFDD", warm);
  const wall2 = lerpHex("#E7E1D4", "#F3E2C9", warm);
  const floor = lerpHex("#D8D1C2", "#E7D6BA", warm);
  return (<>
    <div style={{ position: "absolute", left: -40, top: -40, width: W + 80, height: HZ + 40, zIndex: z,
      background: `linear-gradient(180deg, ${wall} 0%, ${wall} 46%, ${wall2} 100%)` }} />
    {/* the floor plane, receding */}
    <div style={{ position: "absolute", left: -40, top: HZ, width: W + 80, height: H - HZ + 40, zIndex: z,
      background: `linear-gradient(180deg, ${lerpHex("#CFC7B6", "#DFCCAE", warm)} 0%, ${floor} 22%, ${lerpHex("#B7AF9E", "#C9B698", warm)} 100%)` }} />
    <div style={{ position: "absolute", left: -40, top: HZ - 3, width: W + 80, height: 5, zIndex: z + 1,
      background: hexa("#9A9182", 0.5) }} />
    {/* the overhead key, warming as it comes up */}
    <div style={{ position: "absolute", left: W * 0.5 - 520, top: -260, width: 1040, height: 900, zIndex: z + 1,
      borderRadius: "50%", opacity: 0.5 + 0.3 * warm,
      background: `radial-gradient(ellipse at 50% 30%, ${hexa(lerpHex("#FFFFFF", "#FFE9C8", warm), 0.9)} 0%, ${hexa("#FFFFFF", 0)} 62%)` }} />
    {/* falloff into the corners, so the frame has a value structure and not one flat tone */}
    <div style={{ position: "absolute", inset: -40, zIndex: z + 2, pointerEvents: "none",
      background: `radial-gradient(ellipse 74% 62% at 50% 44%, ${hexa("#6E6455", 0)} 0%, ${hexa("#6E6455", 0.10)} 68%, ${hexa("#584F42", 0.30)} 100%)` }} />
    {/* the shop's gantry, cropped by the top edge */}
    <div style={{ position: "absolute", left: -20, top: 44, width: W + 40, height: 26, zIndex: z + 3,
      background: `linear-gradient(180deg, ${mxh(IRON, 0.14)}, ${dkh(IRON, 0.4)})`, boxShadow: SH }} />
    {[0.14, 0.42, 0.7, 0.94].map((px, i) => (
      <div key={"hg" + i} style={{ position: "absolute", left: W * px - 5, top: 70, width: 10, height: 54 + i * 12,
        zIndex: z + 3, background: dkh(IRON, 0.3) }} />
    ))}
  </>);
};

/** the shadow the mark drops on the bay floor — what makes it sit IN the space. */
export const Contact2: React.FC<{ x: number; y: number; w: number; o?: number; z?: number }> =
  ({ x, y, w, o = 0.34, z = 30 }) => (
  <div style={{ position: "absolute", left: x - w / 2, top: y - w * 0.10, width: w, height: w * 0.20, zIndex: z,
    borderRadius: "50%", background: `radial-gradient(ellipse, ${hexa("#4A4236", o)} 0%, ${hexa("#4A4236", o * 0.45)} 48%, ${hexa("#4A4236", 0)} 76%)` }} />
);

/* ⭐⭐ VENT — the steam coming off an overloaded Claude. House `Steam` is a column of
   circles on a wrapping counter, so wisps POP in at full alpha and read as bubbles
   ([[feedback_props_need_real_drawing]], [[feedback_a_wrapping_counter_reads_as_chop]]).
   These are drawn: each wisp is an asymmetric blob that ramps IN and OUT over its own
   life, GROWS as it climbs, and CURLS harder the higher it gets, so the plume has a
   silhouette instead of a texture. `hot` bends the colour toward the scorch so the
   steam belongs to the body it is coming off. */
export const Vent: React.FC<{ x: number; y: number; f: number; at: number; n?: number; z?: number;
  s?: number; rate?: number; hot?: number; spread?: number; seed?: number }> =
  ({ x, y, f, at, n = 8, z = 74, s = 1, rate = 1, hot = 0, spread = 1, seed = 0 }) => {
  const lf = f - at;
  if (lf < 0) return null;
  /* ⛔⛔ THE COLOUR IS MIXED AS NUMBERS, NOT THROUGH A HELPER. `lerpHex` emits `rgb(...)` and
     `hexa` parses HEX, so `hexa(lerpHex(...))` is NaN and the wisps render BLACK — which is
     exactly what the first render of this prop did, dark circles all over the pegboard
     ([[feedback_nested_colour_helpers_go_black]]). Mix the channels, emit one rgba. */
  const hz = Math.max(0, Math.min(1, hot));
  const R0 = 240 + (226 - 240) * hz, G0 = 233 + (176 - 233) * hz, B0 = 221 + (150 - 221) * hz;
  const rgb = `${Math.round(R0)},${Math.round(G0)},${Math.round(B0)}`;
  return (<>{Array.from({ length: n }, (_, i) => {
    /* each wisp owns its phase, so the plume never pulses as one body */
    const t = ((lf * rate * 0.036) + rnd(i + seed, 9)) % 1;
    const side = i % 2 ? 1 : -1;
    /* ⛔ EQUAL BLOBS WITH HARD EDGES READ AS BUBBLES, not as steam — the first render of this
       was a string of balloons up the pegboard. Two fixes: every wisp gets its own size off
       `rnd`, and the fill is a radial FALLOFF so the edge dissolves instead of drawing a circle. */
    const vary = 0.66 + rnd(i + seed, 17) * 0.9;
    const grow = (34 + t * 96) * vary;
    /* the curl: drift widens with height and reverses, which is what makes it read as steam
       rather than as a rising dot */
    const curl = Math.sin(t * 4.4 + i * 1.3) * (16 + t * 58) * spread;
    /* ⛔ a sine fade is ZERO at t=0, so the plume detached from the body it was coming off and
       floated as a cloud further up the wall. It ramps in over the first sixth of the life now,
       which is what puts a wisp actually ON him ([[feedback_make_an_action_read]]). */
    const fade = Math.min(1, t * 6) * (1 - Math.max(0, (t - 0.5) / 0.5));
    const a1 = (0.88 * fade).toFixed(3), a2 = (0.48 * fade).toFixed(3);
    return (
      <div key={"vn" + seed + i} style={{ position: "absolute",
        left: x + (side * 15 * spread + curl) * s - grow * s * 0.5,
        top: y - (2 + t * 214) * s - grow * s * 0.5,
        width: grow * s, height: grow * s * (1.04 - t * 0.18), zIndex: z,
        transform: `rotate(${(side * (12 + t * 128)).toFixed(1)}deg)`,
        background: `radial-gradient(circle at 46% 44%, rgba(${rgb},${a1}) 0%, rgba(${rgb},${a2}) 40%, rgba(${rgb},0) 68%)` }} />
    );
  })}</>);
};
