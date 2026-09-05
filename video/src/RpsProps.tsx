import React from "react";
import { Img, staticFile } from "remotion";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D,
  Crew, Puff, Ring, Contact,
  CLAY, CLAYD, GOLD, GREEN, RED, SKY, INK, MUTE, BRASS, SLATE, IRON, CHROME, BONE, TEAL,
  REPOS, MODELS, R, GY, repoBy, mono, ui,
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
  arrivals: number[]; split?: number; splitAt?: number; states?: number[]; s?: number; printAt?: number }> =
  ({ x, y, f, w = 560, h = 380, z = 44, arrivals, split = 0, splitAt = 9999, states = [1, 1, -1, 0, 1], s = 1, printAt = 9999 }) => {
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
        {/* ⭐ REAL CONTENT ARRIVING: once split, every working panel PRINTS output, a
            line every six frames — the third row of the motion table, and the
            thing a panel per agent actually buys you */}
        {grow > 0.5 && arrivals.map((at, i) => {
          if (i >= cols * rows) return null;
          const st = states[i] ?? 1;
          const px0 = (i % cols) * cellW + 26, py0 = Math.floor(i / cols) * cellH + cellH * 0.40;
          const nLines = st > 0.5 ? Math.max(0, Math.min(7, Math.floor((f - printAt - i * 4) / 6))) : st < 0 ? 1 : 0;
          return Array.from({ length: nLines }, (_, k) => (
            <div key={"pl" + i + "-" + k} style={{ position: "absolute", left: px0, top: py0 + k * 12, width: (cellW - 70) * (0.45 + ((k * 7 + i * 3) % 5) * 0.11),
              height: 7, borderRadius: 2, background: k === nLines - 1 ? AGENT_C[i % AGENT_C.length] : hexa(INK, 0.55) }} />
          ));
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
  const [owner, nm] = repo.repo.split("/");
  /* ⛔ `diegosouzapw/OmniRoute` truncated to `diegosouzapw/On` and `deepseek-ai/deepseek-harness`
     lost its tail on the first probe: a REAL repo name rendered wrong is worse than a small one.
     The line scales to its own length so every character survives at every card size. */
  const fit = Math.min(1, 18 / repo.repo.length);
  const ins = Math.max(0, Math.min(1, install));
  const pad = 14 * u;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y, width: w, zIndex: z,
      transformOrigin: "50% 0%", transform: `rotate(${rot}deg) scaleY(${0.72 + 0.28 * k})`, opacity: k }}>
      <div style={{ position: "relative", background: GH.bg, border: `${2.4 * u}px solid ${GH.line}`,
        borderRadius: 9 * u, boxShadow: SH_D, padding: `${pad}px ${pad}px ${11 * u}px`,
        filter: dim > 0 ? `brightness(${1 - dim * 0.34})` : undefined }}>
        {/* row 1 — the repo glyph, owner/name, and the Public pill GitHub puts on every public repo */}
        <div style={{ display: "flex", alignItems: "center", gap: 7 * u }}>
          <Octicon kind="repo" s={20 * u} c={GH.mute} />
          <div style={{ ...ui(21 * u * fit, 800), color: GH.link, whiteSpace: "nowrap",
            letterSpacing: "-0.01em", flexShrink: 0 }}>
            <span style={{ color: GH.mute, fontWeight: 600 }}>{owner}/</span>{nm}
          </div>
          {/* the Public pill is decoration; a long repo name is content, so the pill yields to it */}
          {fit > 0.92 && (
            <div style={{ marginLeft: "auto", border: `${1.6 * u}px solid ${GH.line}`, borderRadius: 20 * u,
              padding: `${1.5 * u}px ${8 * u}px`, ...ui(11 * u, 700), color: GH.mute, whiteSpace: "nowrap",
              flexShrink: 0 }}>Public</div>
          )}
        </div>
        {/* row 2 — the repo's real one-line description */}
        {desc && (
          <div style={{ ...ui(14.5 * u, 500), color: GH.mute, marginTop: 8 * u, lineHeight: 1.34,
            display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {repo.desc}
          </div>
        )}
        {/* row 3 — the footer every repo page has: language dot, stars, licence */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 * u, marginTop: 11 * u }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5 * u }}>
            <div style={{ width: 11 * u, height: 11 * u, borderRadius: "50%", background: repo.langC,
              border: `${1 * u}px solid ${hexa("#000000", 0.14)}` }} />
            <div style={{ ...ui(13 * u, 600), color: GH.mute, whiteSpace: "nowrap" }}>{repo.lang}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5 * u }}>
            <Octicon kind="star" s={13 * u} c={GH.star} />
            <div style={{ ...ui(13 * u, 800), color: GH.text, whiteSpace: "nowrap" }}>{shown}</div>
          </div>
          <div style={{ ...ui(13 * u, 600), color: GH.mute, whiteSpace: "nowrap" }}>{repo.lic}</div>
          {/* the repo's own mark, bottom-right, where a repo page puts the org avatar */}
          <div style={{ marginLeft: "auto", width: 26 * u, height: 26 * u, borderRadius: 6 * u,
            background: repo.markBg, border: `${1.4 * u}px solid ${GH.line}`, display: "flex",
            alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Img src={staticFile("logos/" + repo.mark)} style={{ width: 19 * u, height: 19 * u, objectFit: "contain" }} />
          </div>
        </div>
        {/* ⭐ INSTALLING — the card is being APPLIED. A real bar that fills, then a tick.
            This is the beat's verb, drawn, and it is the one hot colour on the card. */}
        {ins > 0.001 && (
          <div style={{ position: "absolute", left: pad, right: pad, bottom: -7 * u, height: 6 * u,
            borderRadius: 4 * u, background: hexa(GH.line, 0.9), overflow: "hidden" }}>
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${ins * 100}%`,
              background: `linear-gradient(90deg, ${GH.green}, ${mxh(GH.green, 0.3)})` }} />
          </div>
        )}
        {ins > 0.98 && (
          <div style={{ position: "absolute", right: -10 * u, top: -10 * u, width: 30 * u, height: 30 * u,
            borderRadius: "50%", background: GH.green, display: "flex", alignItems: "center",
            justifyContent: "center", boxShadow: SH }}>
            <Octicon kind="check" s={19 * u} c="#FFFFFF" />
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
