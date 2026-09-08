import React from "react";
import { Img, staticFile } from "remotion";
import { W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, SH, SH_D, mono, ui, G, AGV as AGVC } from "./GvtWorld";

/* ===========================================================================
   REEL 141 · "GRAVITY" — THE REAL PRODUCT SURFACE.

   ⛔⛔ ALEX, REV 1: *"the animations are not good like when i see antigravity in
   VS Code i should see like an actual super realistic browser etc here."*

   The first build drew the subject SYMBOLICALLY — drawer units with a mark
   stencilled on them standing in for "your VS Code setup". That is the
   illustrating-the-noun trap wearing a workshop costume: the world never showed
   the thing the reel is about. This file is the fix. It is a real VS Code
   window, drawn to the actual Dark+ theme, with every part a viewer would
   recognise: the traffic lights, the activity bar, the explorer tree with its
   indent guides, the tab strip with its active-tab top border, the line-number
   gutter, syntax-coloured code, the minimap, and the blue status bar with a
   branch name and Ln/Col.

   ⭐ It is also the biggest motion lever available (reference_animation_quality
   §1: real UI moved four scenes 7.7->9.9 on reel 116), because a caret that
   blinks, a diff that opens and a tree row that highlights are all real events
   happening on a surface the viewer already reads fluently.

   ⛔ EVERY STRING IN HERE IS EITHER GENERIC CODE OR COMES FROM `G` (the ledger).
   No invented version numbers, no invented model names, no fake install counts.
   ========================================================================= */

/* ---- the real VS Code Dark+ palette --------------------------------------
   Taken from the theme's own token colours so the surface reads as VS Code and
   not as "a dark rectangle with coloured lines". */
export const VS = {
  bg:        "#1E1E1E",   // editor background
  side:      "#252526",   // sidebar
  act:       "#333333",   // activity bar
  tabBar:    "#252526",
  tabOn:     "#1E1E1E",
  tabOff:    "#2D2D2D",
  status:    "#007ACC",   // the blue status bar
  border:    "#3C3C3C",
  text:      "#D4D4D4",
  dim:       "#858585",   // line numbers
  accent:    "#0078D4",
  sel:       "#264F78",
  lineHi:    "#282828",
  // token colours
  kw:        "#569CD6",   // keyword
  ctl:       "#C586C0",   // control flow
  str:       "#CE9178",   // string
  com:       "#6A9955",   // comment
  fn:        "#DCDCAA",   // function
  num:       "#B5CEA8",   // number
  type:      "#4EC9B0",   // type
  varc:      "#9CDCFE",   // variable
  add:       "#487E4A",   // diff added gutter
  del:       "#8C3A38",   // diff removed gutter
} as const;

type Tok = [string, keyof typeof VS];
/** one line of code as (text, token) pairs. Indent is a leading count of spaces. */
export type CodeLine = { ind: number; toks: Tok[] };

/** a small, real-looking TypeScript file. Generic on purpose: it asserts nothing. */
export const SAMPLE: CodeLine[] = [
  { ind: 0, toks: [["import", "ctl"], [" { ", "text"], ["readFile", "varc"], [" } ", "text"], ["from", "ctl"], [" 'node:fs/promises'", "str"]] },
  { ind: 0, toks: [] },
  { ind: 0, toks: [["// resolve every workspace config once, then cache", "com"]] },
  { ind: 0, toks: [["export", "ctl"], [" ", "text"], ["async", "kw"], [" ", "text"], ["function", "kw"], [" ", "text"], ["loadConfig", "fn"], ["(", "text"], ["root", "varc"], [": ", "text"], ["string", "type"], [") {", "text"]] },
  { ind: 2, toks: [["const", "kw"], [" ", "text"], ["raw", "varc"], [" = ", "text"], ["await", "ctl"], [" ", "text"], ["readFile", "fn"], ["(", "text"], ["root", "varc"], [" + ", "text"], ["'/config.json'", "str"], [")", "text"]] },
  { ind: 2, toks: [["const", "kw"], [" ", "text"], ["parsed", "varc"], [" = ", "text"], ["JSON", "type"], [".", "text"], ["parse", "fn"], ["(", "text"], ["raw", "varc"], [")", "text"]] },
  { ind: 2, toks: [] },
  { ind: 2, toks: [["if", "ctl"], [" (!", "text"], ["parsed", "varc"], [".", "text"], ["version", "varc"], [") {", "text"]] },
  { ind: 4, toks: [["throw", "ctl"], [" ", "text"], ["new", "kw"], [" ", "text"], ["Error", "type"], ["(", "text"], ["'config has no version'", "str"], [")", "text"]] },
  { ind: 2, toks: [["}", "text"]] },
  { ind: 2, toks: [] },
  { ind: 2, toks: [["return", "ctl"], [" { ...", "text"], ["parsed", "varc"], [", ", "text"], ["root", "varc"], [" }", "text"]] },
  { ind: 0, toks: [["}", "text"]] },
  { ind: 0, toks: [] },
  { ind: 0, toks: [["// TODO: watch the file and invalidate", "com"]] },
];

const FILES = [
  { n: "src", d: true, o: true },
  { n: "config.ts", d: false, c: VS.kw },
  { n: "loader.ts", d: false, c: VS.kw, on: true },
  { n: "index.ts", d: false, c: VS.kw },
  { n: "test", d: true, o: false },
  { n: "package.json", d: false, c: VS.fn },
  { n: "README.md", d: false, c: VS.varc },
];

/** a single code line, drawn as real tokens */
const Line: React.FC<{ l: CodeLine; s: number; y: number; hl?: boolean; diff?: 0 | 1 | -1;
  reveal?: number }> = ({ l, s, y, hl, diff = 0, reveal = 1 }) => {
  let x = 0;
  const CW = 6.05 * s;           // monospace advance
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: y, height: 15 * s }}>
      {hl && <div style={{ position: "absolute", inset: 0, background: VS.lineHi }} />}
      {diff !== 0 && (
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, right: 0,
          background: hexa(diff > 0 ? "#4B7A3F" : "#7A3A38", 0.30) }} />
      )}
      {diff !== 0 && (
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3 * s,
          background: diff > 0 ? "#4EA24E" : "#C05A55" }} />
      )}
      <div style={{ position: "absolute", left: 10 * s + l.ind * CW, top: 1 * s, whiteSpace: "pre",
        ...mono(10.5 * s, 500), lineHeight: `${13 * s}px`, overflow: "hidden",
        width: reveal >= 1 ? undefined : `${reveal * 100}%` }}>
        {l.toks.map((t, i) => (
          <span key={i} style={{ color: (VS as any)[t[1]] }}>{t[0]}</span>
        ))}
      </div>
    </div>
  );
};

/* ---------------------------------------------------------------------------
   THE WINDOW. `panel` slides the Antigravity side panel in from the right;
   `diffAt` rips a green diff down the file; `mark` puts the Antigravity icon on
   the activity bar. Everything is drawn, nothing is a screenshot.
   ------------------------------------------------------------------------ */
export const VsCode: React.FC<{
  x: number; y: number; w: number; h: number; z?: number; f: number; s?: number;
  /** 0..1 how far the Antigravity panel is open */
  panel?: number;
  /** frame at which the diff starts ripping down the file (scene-local); -1 = never */
  diffAt?: number;
  /** show the Antigravity icon on the activity bar */
  mark?: boolean;
  /** small windows drop the sidebar and minimap so they stay legible */
  compact?: boolean;
  caret?: boolean; title?: string; branch?: string;
  /** which sidebar view is showing. `extensions` draws the real Marketplace panel. */
  view?: "explorer" | "extensions";
  /** 0..1 how far the model picker dropdown is open, and how many rows have landed */
  picker?: number; pickerRows?: number;
  /** the scene-local frame each picker row lands on, so a row can TRAVEL in */
  pickerAt?: number[];
  /** the Install button's progress, 0..1; >0 draws the progress bar */
  install?: number;
  /** ⛔⛔ AN EDITOR SITTING STILL IS A SCREENSHOT, AND FOUR SCENES MEASURED 1.1
      TO 4.9 AGAINST A BAR OF 9 BECAUSE OF IT. `live` is what a real editor does
      while an agent works in it: the file SCROLLS, the active line TYPES, the
      minimap viewport travels with it, and the diff keeps landing. It is a large
      high-contrast area repainting, which is the top of the motion table. */
  live?: number;
  /** the verified tick beside the publisher row (its own beat, on "official") */
  tick?: boolean;
  /** the "NEW · <date>" badge, on "just launched" */
  newAt?: number;
  /** the five IDEs it shipped for, landing on "for VS Code" */
  ideAt?: number;
  /** the three panel capabilities, landing one per spoken word */
  capAt?: number[];
  /** scene-local frame the extension NAME takes the details pane (on "Antigravity") */
  nameAt?: number;
}> = ({ x, y, w: ww, h: hh, z = 60, f, s: sIn, panel = 0, diffAt = -1, mark = false,
        compact = false, caret = true, title = "loader.ts", branch = "main",
        view = "explorer", picker = 0, pickerRows = 0, pickerAt, install = 0, live = 0,
        tick = false, nameAt, newAt, ideAt, capAt }) => {
  const s = sIn ?? ww / 560;                       // 560px is the design width
  const ACT = 40 * s, SIDE = compact ? 0 : 128 * s, STATUS = 20 * s, TAB = 30 * s;
  const PW = (compact ? 0.56 : 0.36) * ww * panel; // the Antigravity panel width
  const codeL = ACT + SIDE;
  const codeW = ww - codeL - PW;
  const GUT = 30 * s;
  const nLines = Math.min(SAMPLE.length, Math.floor((hh - STATUS - TAB - 6 * s) / (15 * s)));
  /* ⛔ A 0.5px/FRAME DRIFT IS INVISIBLE, and three scenes measured 1.5-2.7
     against a bar of 9 with `live` already on. An agent working through a file
     does not drift, it STEPS: one line every 9 frames, eased, so each step is a
     15px move of the whole code pane. The content is duplicated below the fold
     so the wrap never shows as a teleport. */
  const LH = 15 * s, STEP = live > 0 ? Math.max(4, Math.round(9 / live)) : 9;
  const stepI = Math.floor(f / STEP);
  const scroll = live > 0 ? (stepI + E(f - stepI * STEP, 0, STEP * 0.55, 0, 1, OUT)) % 6 * LH : 0;
  /* the active line types, then the caret moves on */
  const typed = live > 0 ? Math.min(1, ((f * 1.4 * live) % 40) / 22) : 1;
  const typeRow = live > 0 ? 2 + Math.floor((f * 1.4 * live) / 40) % Math.max(1, nLines - 4) : -1;
  /* ⭐ THE DIFF IS THE MOTION. Three stripes travel down the file continuously,
     which is a full-code-width luma change every few frames rather than a single
     event at `diffAt`. */
  const rollAt = (k: number) => live > 0 ? ((Math.floor(f / 5) + k * 4) % (nLines + 6)) : -99;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, zIndex: z,
      borderRadius: 7 * s, overflow: "hidden", background: VS.bg,
      border: `${1.5 * s}px solid #0A0A0A`, boxShadow: SH_D }}>

      {/* ---- ACTIVITY BAR ---- */}
      <div style={{ position: "absolute", left: 0, top: 0, width: ACT, height: hh - STATUS,
        background: VS.act }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={"ai" + i} style={{ position: "absolute", left: ACT / 2 - 8 * s, top: (14 + i * 30) * s,
            width: 16 * s, height: 16 * s, opacity: i === 0 ? 0.95 : 0.42 }}>
            {/* drawn glyphs: files / search / branch / run / blocks */}
            {i === 0 && (<>
              <div style={{ position: "absolute", left: 0, top: 0, width: 11 * s, height: 15 * s,
                border: `${1.6 * s}px solid ${VS.text}`, borderRadius: 1 * s }} />
              <div style={{ position: "absolute", left: 5 * s, top: 3 * s, width: 11 * s, height: 13 * s,
                border: `${1.6 * s}px solid ${VS.text}`, borderRadius: 1 * s, background: VS.act }} />
            </>)}
            {i === 1 && (<>
              <div style={{ position: "absolute", left: 1 * s, top: 1 * s, width: 10 * s, height: 10 * s,
                borderRadius: "50%", border: `${1.8 * s}px solid ${VS.text}` }} />
              <div style={{ position: "absolute", left: 10 * s, top: 10 * s, width: 6 * s, height: 1.8 * s,
                background: VS.text, transform: "rotate(45deg)" }} />
            </>)}
            {i === 2 && (<>
              {[0, 1, 2].map((k) => (
                <div key={k} style={{ position: "absolute", left: k === 1 ? 11 * s : 2 * s,
                  top: k === 2 ? 12 * s : k === 1 ? 5 * s : 1 * s, width: 4 * s, height: 4 * s,
                  borderRadius: "50%", border: `${1.5 * s}px solid ${VS.text}` }} />
              ))}
              <div style={{ position: "absolute", left: 4 * s, top: 4 * s, width: 1.6 * s, height: 9 * s, background: VS.text }} />
            </>)}
            {i === 3 && (
              <div style={{ position: "absolute", left: 3 * s, top: 1 * s, width: 0, height: 0,
                borderLeft: `${9 * s}px solid ${VS.text}`, borderTop: `${6 * s}px solid transparent`,
                borderBottom: `${6 * s}px solid transparent` }} />
            )}
            {i === 4 && [0, 1, 2, 3].map((k) => (
              <div key={k} style={{ position: "absolute", left: (k % 2) * 9 * s, top: Math.floor(k / 2) * 9 * s,
                width: 6 * s, height: 6 * s, border: `${1.5 * s}px solid ${VS.text}` }} />
            ))}
          </div>
        ))}
        {/* ⭐ the Antigravity icon, on the activity bar where it really lives */}
        {mark && (
          <div style={{ position: "absolute", left: ACT / 2 - 11 * s, top: (14 + 5 * 30) * s,
            width: 22 * s, height: 22 * s, borderRadius: 5 * s, background: "#FFFFFF",
            display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Img src={staticFile("logos/antigravity.png")}
              style={{ width: 17 * s, height: 17 * s, objectFit: "contain" }} />
          </div>
        )}
        {mark && (
          <div style={{ position: "absolute", left: 0, top: (14 + 5 * 30) * s - 3 * s, width: 2.4 * s,
            height: 28 * s, background: VS.text }} />
        )}
      </div>

      {/* ---- SIDEBAR: the EXTENSIONS view, when the reel is installing ---- */}
      {!compact && view === "extensions" && (
        <div style={{ position: "absolute", left: ACT, top: 0, width: SIDE, height: hh - STATUS,
          background: VS.side, borderRight: `${1 * s}px solid #1A1A1A` }}>
          <div style={{ position: "absolute", left: 10 * s, top: 7 * s, ...mono(8.5 * s, 600),
            color: hexa(VS.text, 0.62), letterSpacing: "0.10em" }}>EXTENSIONS</div>
          {/* the search field, with the real query in it */}
          <div style={{ position: "absolute", left: 8 * s, top: 22 * s, right: 8 * s, height: 16 * s,
            background: "#3C3C3C", border: `${1 * s}px solid #545454`, borderRadius: 2 * s }}>
            <div style={{ position: "absolute", left: 5 * s, top: 3.5 * s, ...mono(8 * s, 500),
              color: hexa(VS.text, 0.92) }}>Google Antigravity</div>
          </div>
          {/* the result rows: ours first, with the publisher and the install count */}
          {[0, 1, 2].map((i) => (
            <div key={"ex" + i} style={{ position: "absolute", left: 4 * s, right: 4 * s,
              top: (46 + i * 40) * s, height: 36 * s, borderRadius: 2 * s,
              background: i === 0 ? VS.sel : "transparent" }}>
              <div style={{ position: "absolute", left: 5 * s, top: 5 * s, width: 24 * s, height: 24 * s,
                borderRadius: 4 * s, background: "#FFFFFF", display: "flex", alignItems: "center",
                justifyContent: "center" }}>
                {i === 0
                  ? <Img src={staticFile("logos/antigravity.png")} style={{ width: 19 * s, height: 19 * s, objectFit: "contain" }} />
                  : <div style={{ width: 15 * s, height: 15 * s, borderRadius: 3 * s, background: ["#8E9299", "#5A6068"][i - 1] }} />}
              </div>
              <div style={{ position: "absolute", left: 34 * s, top: 3 * s, ...mono(8.2 * s, 700),
                color: hexa(VS.text, i === 0 ? 1 : 0.7) }}>
                {["Google Antigravity", "Antigravity Themes", "AG Snippets"][i]}
              </div>
              <div style={{ position: "absolute", left: 34 * s, top: 14 * s, ...mono(7.2 * s, 500),
                color: hexa(VS.text, 0.55) }}>
                {["Agent-first development", "Community", "Community"][i]}
              </div>
              <div style={{ position: "absolute", left: 34 * s, top: 24 * s, ...mono(7.2 * s, 600),
                color: hexa("#9CDCFE", 0.9) }}>
                {i === 0 ? `${G.publisher}${tick ? " ✓" : ""}  ${G.installs}` : "unverified"}
              </div>
            </div>
          ))}
        </div>
      )}
      {/* ---- SIDEBAR: the explorer tree ---- */}
      {!compact && view === "explorer" && (
        <div style={{ position: "absolute", left: ACT, top: 0, width: SIDE, height: hh - STATUS,
          background: VS.side, borderRight: `${1 * s}px solid #1A1A1A` }}>
          <div style={{ position: "absolute", left: 10 * s, top: 7 * s, ...mono(8.5 * s, 600),
            color: hexa(VS.text, 0.62), letterSpacing: "0.10em" }}>EXPLORER</div>
          {FILES.map((fl, i) => {
            const on = fl.on;
            return (
              <div key={"fl" + i} style={{ position: "absolute", left: 0, right: 0, top: (24 + i * 15) * s,
                height: 14 * s, background: on ? VS.sel : "transparent" }}>
                {/* chevron for folders */}
                {fl.d && (
                  <div style={{ position: "absolute", left: 7 * s, top: 4.5 * s, width: 0, height: 0,
                    borderLeft: `${4 * s}px solid ${hexa(VS.text, 0.7)}`,
                    borderTop: `${3 * s}px solid transparent`, borderBottom: `${3 * s}px solid transparent`,
                    transform: fl.o ? "rotate(90deg)" : undefined }} />
                )}
                {!fl.d && (
                  <div style={{ position: "absolute", left: 16 * s, top: 3.5 * s, width: 6 * s, height: 8 * s,
                    background: fl.c, borderRadius: 1 * s, opacity: 0.9 }} />
                )}
                <div style={{ position: "absolute", left: (fl.d ? 15 : 26) * s, top: 2.5 * s,
                  ...mono(9 * s, fl.d ? 700 : 500), color: hexa(VS.text, on ? 1 : 0.8) }}>{fl.n}</div>
              </div>
            );
          })}
        </div>
      )}

      {/* ---- TAB STRIP ---- */}
      <div style={{ position: "absolute", left: codeL, top: 0, width: Math.max(0, codeW), height: TAB,
        background: VS.tabBar, overflow: "hidden" }}>
        {[title, "config.ts"].map((t, i) => (
          <div key={"tb" + i} style={{ position: "absolute", left: i * 92 * s, top: 0, width: 92 * s,
            height: TAB, background: i === 0 ? VS.tabOn : VS.tabOff,
            borderRight: `${1 * s}px solid #1A1A1A`,
            borderTop: i === 0 ? `${1.6 * s}px solid ${VS.accent}` : "none" }}>
            <div style={{ position: "absolute", left: 9 * s, top: TAB / 2 - 4 * s, width: 6 * s, height: 8 * s,
              background: VS.kw, borderRadius: 1 * s, opacity: 0.9 }} />
            <div style={{ position: "absolute", left: 20 * s, top: TAB / 2 - 5 * s, ...mono(9 * s, 500),
              color: hexa(VS.text, i === 0 ? 1 : 0.6) }}>{t}</div>
            {i === 0 && (
              <div style={{ position: "absolute", right: 8 * s, top: TAB / 2 - 3 * s, width: 6 * s,
                height: 6 * s, borderRadius: "50%", background: hexa(VS.text, 0.55) }} />
            )}
          </div>
        ))}
      </div>

      {/* ---- EDITOR ---- */}
      <div style={{ position: "absolute", left: codeL, top: TAB, width: Math.max(0, codeW),
        height: hh - STATUS - TAB, background: VS.bg, overflow: "hidden" }}>
        {/* the line-number gutter */}
        <div style={{ position: "absolute", left: 0, top: 0, width: GUT, height: "100%", overflow: "hidden" }}>
          {Array.from({ length: nLines + 8 }, (_, i) => (
            <div key={"ln" + i} style={{ position: "absolute", right: 6 * s, top: (4 + i * 15) * s - scroll,
              ...mono(9.5 * s, 500), color: i === typeRow ? hexa(VS.text, 0.9) : VS.dim }}>{i + 1}</div>
          ))}
        </div>
        <div style={{ position: "absolute", left: GUT, top: 0, right: 0, bottom: 0, overflow: "hidden" }}>
          {Array.from({ length: nLines + 8 }, (_, k) => {
            const l = SAMPLE[k % SAMPLE.length];
            /* the diff rips DOWN the file, one line per 2 frames */
            let d: 0 | 1 | -1 = diffAt >= 0 && f >= diffAt + k * 2
              ? (k === 5 || k === 8 ? -1 : k % 3 === 0 ? 1 : 0) : 0;
            if (d === 0 && live > 0) {
              if (k === rollAt(0)) d = 1; else if (k === rollAt(1)) d = -1; else if (k === rollAt(2)) d = 1;
            }
            const rev = k === typeRow ? typed : 1;
            return <Line key={"cl" + k} l={l} s={s} y={(4 + k * 15) * s - scroll}
              hl={k === (typeRow >= 0 ? typeRow : 4)} diff={d} reveal={rev} />;
          })}
          {/* the caret, blinking at the real ~1.06s period */}
          {caret && (
            <div style={{ position: "absolute",
              left: 10 * s + (typeRow >= 0
                ? (SAMPLE[typeRow % SAMPLE.length].ind + typed * 34) * 6.05 * s
                : 2 * 6.05 * s + 96 * s),
              top: (4 + (typeRow >= 0 ? typeRow : 4) * 15) * s - scroll,
              width: 1.9 * s, height: 13 * s, background: VS.text,
              opacity: live > 0 ? 1 : (Math.floor(f / 16) % 2 ? 0.12 : 1) }} />
          )}
        </div>
        {/* the minimap */}
        {!compact && (
          <div style={{ position: "absolute", right: 0, top: 0, width: 34 * s, height: "100%",
            background: hexa("#000", 0.16) }}>
            {Array.from({ length: nLines + 8 }, (_, k) => {
              const l = SAMPLE[k % SAMPLE.length];
              return (
                <div key={"mm" + k} style={{ position: "absolute", left: 4 * s + l.ind * 1.4 * s,
                  top: (4 + k * 4.4) * s, width: Math.max(3 * s, l.toks.length * 5 * s),
                  height: 2 * s, background: hexa(l.toks[0] ? (VS as any)[l.toks[0][1]] : VS.dim, 0.55) }} />
              );
            })}
            {/* the viewport box, travelling with the scroll */}
            <div style={{ position: "absolute", left: 0, right: 0,
              top: (4 * s) + (scroll / LH) * 4.4 * s, height: nLines * 4.4 * s,
              background: hexa("#FFFFFF", 0.07), border: `${1 * s}px solid ${hexa("#FFFFFF", 0.10)}` }} />
          </div>
        )}
      </div>

      {/* ---- THE EXTENSION'S DETAILS PANE — an opaque surface, not an overlay ---- */}
      {!compact && view === "extensions" && (
        <div style={{ position: "absolute", left: codeL, top: TAB,
          width: Math.max(0, codeW), height: hh - STATUS - TAB, background: VS.bg,
          borderLeft: `${1 * s}px solid #1A1A1A` }} />
      )}
      {!compact && view === "extensions" && (
        <div style={{ position: "absolute", left: codeL + 18 * s, top: TAB + 16 * s,
          width: Math.max(0, codeW - 36 * s) }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 * s }}>
            <div style={{ width: 44 * s, height: 44 * s, borderRadius: 8 * s, background: "#FFF",
              display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Img src={staticFile("logos/antigravity.png")} style={{ width: 34 * s, height: 34 * s, objectFit: "contain" }} />
            </div>
            <div>
              <div style={{ ...mono(12 * s, 800), color: VS.text,
                transform: nameAt !== undefined ? `scale(${E(f, nameAt, nameAt + 8, 1.5, 1, OUT)})` : undefined,
                transformOrigin: "0% 50%" }}>{G.extName}</div>
              <div style={{ ...mono(8.5 * s, 500), color: hexa(VS.text, 0.62), marginTop: 3 * s }}>
                {G.publisher} · {G.version} · {G.installs} installs
              </div>
              {newAt !== undefined && f >= newAt && (
                <div style={{ display: "inline-flex", alignItems: "center", gap: 5 * s,
                  marginTop: 6 * s, padding: `${3 * s}px ${7 * s}px`, borderRadius: 3 * s,
                  background: hexa("#4EA24E", 0.9),
                  transform: `scale(${E(f, newAt, newAt + 7, 1.4, 1, BACK)})`, transformOrigin: "0% 50%" }}>
                  <span style={{ ...mono(8 * s, 900), color: "#0C1410", letterSpacing: "0.1em" }}>NEW</span>
                  <span style={{ ...mono(8 * s, 700), color: "#0C1410" }}>{G.launched}</span>
                </div>
              )}
            </div>
          </div>
          {/* the blue Install button, and the progress that replaces it */}
          <div style={{ marginTop: 12 * s, width: 74 * s, height: 20 * s, borderRadius: 3 * s,
            background: install > 0 ? "#2D2D2D" : VS.accent, overflow: "hidden",
            display: "flex", alignItems: "center", justifyContent: "center",
            transform: `scale(${install > 0 && install < 0.1 ? 0.94 : 1})` }}>
            {install > 0 && (
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${install * 74 * s}px`,
                background: VS.accent }} />
            )}
            <span style={{ ...mono(8.5 * s, 700), color: "#FFF", zIndex: 2 }}>
              {install >= 1 ? "Installed" : install > 0 ? "Installing" : "Install"}
            </span>
          </div>
          {ideAt !== undefined && f >= ideAt - 10 && (
            <div style={{ marginTop: 12 * s, display: "flex", alignItems: "center",
              gap: 6 * s, flexWrap: "wrap", maxWidth: 300 * s }}>
              {G.ides.map((d, i) => {
                const at = ideAt + (i === 0 ? 7 : i * 2);
                const t = E(f, at - 8, (at - 8) + 8, 0, 1, OUT);
                const me = i === 0;
                return (
                  <div key={"ide" + i} style={{ display: "flex", alignItems: "center", gap: 5 * s,
                    padding: `${4 * s}px ${7 * s}px`, borderRadius: 4 * s, opacity: t,
                    background: me && f >= at ? hexa("#0078D4", 0.34) : hexa("#FFFFFF", 0.05),
                    border: `${1.5 * s}px solid ${me && f >= at ? "#3E9BE8" : hexa(VS.text, 0.14)}`,
                    transform: `translateY(${(1 - t) * 16 * s}px) scale(${me && f >= at ? E(f, at, at + 7, 1.18, 1, BACK) : 1})` }}>
                    <div style={{ width: 15 * s, height: 15 * s, borderRadius: 3 * s, background: "#FFF",
                      display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Img src={staticFile("logos/" + d.mark)} style={{ width: 12 * s, height: 12 * s, objectFit: "contain" }} />
                    </div>
                    <span style={{ ...mono(8 * s, me ? 900 : 600), color: hexa(VS.text, me ? 1 : 0.66) }}>{d.t}</span>
                  </div>
                );
              })}
            </div>
          )}
          {install >= 1 && (
            <div style={{ marginTop: 9 * s, ...mono(8 * s, 500), color: hexa("#6A9955", 0.95) }}>
              ✓ installed local backend service `{G.service}`
            </div>
          )}
        </div>
      )}

      {/* ---- THE MODEL PICKER, the real dropdown with the real free-tier list ---- */}
      {picker > 0 && (
        <div style={{ position: "absolute", left: codeL + Math.max(8 * s, codeW - 258 * s),
          top: TAB + 6 * s, width: 250 * s, zIndex: 9, transformOrigin: "100% 0%",
          transform: `scaleY(${picker})`, opacity: picker }}>
          <div style={{ background: "#252526", border: `${1.5 * s}px solid #454545`,
            borderRadius: 4 * s, overflow: "hidden", boxShadow: SH_D }}>
            <div style={{ padding: `${7 * s}px ${10 * s}px`, ...mono(10 * s, 700),
              color: hexa(VS.text, 0.62), letterSpacing: "0.10em", borderBottom: `${1 * s}px solid #3C3C3C` }}>
              MODEL · FREE PLAN
            </div>
            {G.models.map((m, i) => {
              /* ⛔ A ROW THAT FADES IN PLACE IS NOT AN ARRIVAL. Each model flies
                 the full width of the dropdown and lands, so four arrivals are
                 four TRAVELS rather than four opacity changes. */
              const at = pickerAt ? pickerAt[i] : -999;
              const t = pickerAt ? E(f, at - 9, (at - 9) + 9, 0, 1, OUT) : (i < pickerRows ? 1 : 0);
              const landed = pickerAt ? f >= at : i < pickerRows;
              return (
              <div key={"mp" + i} style={{ display: "flex", alignItems: "center", gap: 8 * s,
                padding: `${8 * s}px ${10 * s}px`,
                background: i === (Math.floor(f / 7) % 4) && landed
                  ? hexa(m.c, 0.34) : landed ? hexa(m.c, 0.16) : "transparent",
                borderLeft: `${3 * s}px solid ${landed ? m.c : "transparent"}`,
                opacity: t,
                transform: `translateX(${(1 - t) * -260 * s}px) scaleY(${0.6 + t * 0.4})` }}>
                <div style={{ width: 20 * s, height: 20 * s, borderRadius: 4 * s, background: "#FFF",
                  display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Img src={staticFile("logos/" + m.mark)} style={{ width: 16 * s, height: 16 * s, objectFit: "contain" }} />
                </div>
                <span style={{ ...mono(10.5 * s, 700), color: hexa(VS.text, 0.98) }}>{m.t}</span>
              </div>);
            })}
            <div style={{ padding: `${6 * s}px ${10 * s}px`, ...mono(9 * s, 700),
              color: hexa("#6A9955", 0.95), borderTop: `${1 * s}px solid #3C3C3C` }}>
              + {G.moreModels}
            </div>
          </div>
        </div>
      )}

      {/* ---- THE ANTIGRAVITY PANEL ---- */}
      {panel > 0 && (
        <div style={{ position: "absolute", right: 0, top: 0, width: PW, height: hh - STATUS,
          background: "#1B1B1B", borderLeft: `${1.5 * s}px solid #0A0A0A`, overflow: "hidden" }}>
          <div style={{ position: "absolute", left: 0, top: 0, right: 0, height: compact ? TAB * 1.15 : TAB,
            background: compact ? "#E7B24C" : VS.side, display: "flex", alignItems: "center",
            paddingLeft: 6 * s, gap: 5 * s }}>
            <div style={{ width: (compact ? 21 : 15) * s, height: (compact ? 21 : 15) * s,
              borderRadius: 4 * s, background: "#FFF",
              display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Img src={staticFile("logos/antigravity.png")}
                style={{ width: (compact ? 17 : 12) * s, height: (compact ? 17 : 12) * s, objectFit: "contain" }} />
            </div>
            {!compact && (
              <span style={{ ...mono(8.5 * s, 700), color: hexa(VS.text, 0.85), letterSpacing: "0.08em" }}>ANTIGRAVITY</span>
            )}
          </div>
          {/* at wall size the panel's CONTENT is unreadable, so it reads as three
              lit rows and a mark rather than as unresolvable type */}
          {compact && (
            <div style={{ position: "absolute", left: 6 * s, top: TAB * 1.15 + 6 * s, right: 6 * s }}>
              {[0, 1, 2].map((i) => (
                <div key={"cp" + i} style={{ height: 6 * s, marginBottom: 5 * s, borderRadius: 2 * s,
                  background: hexa(["#E7B24C", "#4EA24E", "#9CDCFE"][i], 0.75),
                  width: `${92 - i * 22}%` }} />
              ))}
            </div>
          )}
          {/* the three things the docs say the panel does, and the agent STREAMING
              underneath them, which is what it looks like while it is working */}
          <div style={{ position: "absolute", left: 8 * s, top: (TAB + 8 * s), right: 8 * s }}>
            {[["AGENTS", VS.type], ["INLINE DIFFS", "#4EA24E"], ["PLANS", VS.fn]].map((row, i) => {
              const at = capAt ? capAt[i] : (diffAt < 0 ? 0 : diffAt) + i * 4;
              const t = E(f, at, at + 7, 0, 1, OUT);
              return (
              <div key={"pr" + i} style={{ marginBottom: 8 * s, padding: `${6 * s}px ${7 * s}px`,
                background: hexa("#FFFFFF", 0.05), borderLeft: `${3 * s}px solid ${row[1]}`,
                borderRadius: 3 * s, opacity: t,
                transform: capAt ? `translateX(${(1 - t) * 60 * s}px)` : undefined }}>
                <div style={{ ...mono(8 * s, 800), color: row[1] as string,
                  letterSpacing: "0.09em", marginBottom: 5 * s }}>{row[0]}</div>

                {/* AGENTS: three agent rows, each with an avatar, a name and a live state */}
                {i === 0 && [0, 1, 2].map((k) => {
                  const busy = k === (Math.floor(f / 14) % 3);
                  return (
                    <div key={"ag" + k} style={{ display: "flex", alignItems: "center",
                      gap: 5 * s, marginBottom: 4 * s }}>
                      <div style={{ width: 13 * s, height: 13 * s, borderRadius: 3 * s,
                        background: ["#D97757", "#7B8FF7", "#4EC9B0"][k],
                        display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ width: 3 * s, height: 3 * s, background: "#0E1016", borderRadius: 1,
                          marginRight: 3 * s }} />
                        <div style={{ width: 3 * s, height: 3 * s, background: "#0E1016", borderRadius: 1 }} />
                      </div>
                      <span style={{ ...mono(7.4 * s, 600), color: hexa(VS.text, 0.86) }}>
                        {["refactor loader", "add tests", "check types"][k]}
                      </span>
                      {busy ? (
                        <div style={{ marginLeft: "auto", width: 9 * s, height: 9 * s, borderRadius: "50%",
                          border: `${2 * s}px solid ${hexa(VS.type, 0.3)}`,
                          borderTopColor: VS.type, transform: `rotate(${f * 22}deg)` }} />
                      ) : (
                        <span style={{ marginLeft: "auto", ...mono(8 * s, 900), color: "#4EA24E" }}>✓</span>
                      )}
                    </div>
                  );
                })}

                {/* ⛔ INLINE DIFFS — rev 7, on Alex's note that 8s was "square and
                    rectangles". Bars ARE rectangles. A diff is TEXT: the removed line, the
                    line that replaced it, and a real gutter. */}
                {i === 1 && ([
                  [-1, 12, "const raw = read(p)", "#E08078"],
                  [ 1, 12, "const raw = await read(path)", "#8FD98F"],
                  [ 1, 13, "if (!parsed.version) throw", "#8FD98F"],
                  [ 0, 14, "return parsed", VS.dim],
                ] as Array<[number, number, string, string]>).map(([sgn, ln, code, c], k) => (
                  <div key={"df" + k} style={{ display: "flex", alignItems: "center", gap: 4 * s,
                    height: 11 * s, marginBottom: 1.5 * s, overflow: "hidden", whiteSpace: "nowrap",
                    background: sgn === 1 ? hexa("#4EA24E", 0.15) : sgn === -1 ? hexa("#C05A55", 0.15) : "transparent" }}>
                    <span style={{ width: 6 * s, ...mono(7.4 * s, 900), color: c }}>
                      {sgn === 1 ? "+" : sgn === -1 ? "\u2212" : ""}
                    </span>
                    <span style={{ width: 10 * s, ...mono(7 * s, 600), color: hexa(VS.dim, 0.75) }}>{ln}</span>
                    <span style={{ ...mono(7.2 * s, 600), color: sgn === 0 ? hexa(VS.text, 0.5) : c,
                      textDecoration: sgn === -1 ? "line-through" : undefined }}>{code}</span>
                  </div>
                ))}

                {/* PLANS: a numbered checklist that ticks as the agent works it */}
                {i === 2 && [0, 1, 2].map((k) => {
                  const done = f > at + 8 + k * 7;
                  return (
                    <div key={"pl" + k} style={{ display: "flex", alignItems: "center",
                      gap: 5 * s, marginBottom: 4 * s }}>
                      <div style={{ width: 11 * s, height: 11 * s, borderRadius: 2 * s,
                        border: `${1.6 * s}px solid ${done ? "#4EA24E" : hexa(VS.text, 0.3)}`,
                        background: done ? hexa("#4EA24E", 0.85) : "transparent",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        ...mono(7 * s, 900), color: "#0C1410" }}>{done ? "✓" : ""}</div>
                      <span style={{ ...mono(7.2 * s, 600),
                        color: hexa(VS.text, done ? 0.5 : 0.86),
                        textDecoration: done ? "line-through" : undefined }}>
                        {["read config.ts", "write loader.ts", "run the tests"][k]}
                      </span>
                    </div>
                  );
                })}
              </div>);
            })}
            {/* ⛔ THE AGENT STREAM — same note. A dot and a bar per line is a
                RECTANGLE FIELD. An agent working looks like SENTENCES arriving, so
                these are real lines, revealed a character at a time. */}
            {live > 0 && (() => {
              const SAY = [
                "reading src/loader.ts",
                "found 2 call sites",
                "await was missing on read()",
                "patching line 12",
                "running the type check",
                "3 files changed, 0 errors",
                "tests pass \u2014 ready to apply",
              ];
              const CPS = 0.9 * live;                 /* characters per frame */
              let budget = f * CPS;
              return (
                <div style={{ marginTop: 6 * s, height: 150 * s, overflow: "hidden" }}>
                  {SAY.map((line, k) => {
                    const n = Math.max(0, Math.min(line.length, budget));
                    budget -= line.length + 6;        /* a beat between lines */
                    if (n <= 0) return null;
                    const done = n >= line.length;
                    return (
                      <div key={"sy" + k} style={{ display: "flex", alignItems: "center",
                        gap: 4 * s, height: 12 * s, whiteSpace: "nowrap" }}>
                        <div style={{ width: 4 * s, height: 4 * s, borderRadius: "50%", flexShrink: 0,
                          background: hexa([VS.type, "#4EA24E", VS.fn, VS.varc][k % 4], 0.9) }} />
                        <span style={{ ...mono(7.4 * s, 600), color: hexa(VS.text, done ? 0.62 : 0.92) }}>
                          {line.slice(0, Math.floor(n))}
                        </span>
                        {!done && <div style={{ width: 2 * s, height: 8 * s, background: hexa(AGVC, 0.9) }} />}
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* ---- STATUS BAR ---- */}
      <div style={{ position: "absolute", left: 0, bottom: 0, width: ww, height: STATUS,
        background: VS.status, display: "flex", alignItems: "center", paddingLeft: 7 * s, gap: 10 * s }}>
        <span style={{ ...mono(8 * s, 600), color: "#FFFFFF" }}>⎇ {branch}</span>
        <span style={{ ...mono(8 * s, 600), color: hexa("#FFFFFF", 0.92) }}>
          ⊗ {diffAt >= 0 && f >= diffAt ? 0 : 2}  ⚠ {diffAt >= 0 && f >= diffAt ? 0 : 3}
        </span>
        {!compact && (
          <span style={{ ...mono(8 * s, 600), color: hexa("#FFFFFF", 0.92), marginLeft: "auto",
            paddingRight: 8 * s }}>Ln 5, Col 34   TypeScript</span>
        )}
      </div>
    </div>
  );
};

/* ===========================================================================
   ⛔⛔⛔ THE UI STAGE — REV 4, on Alex's note: *"i want to see it more like even
   though we see it like that like small screen recording etc, i want to see a
   more easy to watch version for the viewers here since right now it's too
   zoomed out and not interesting."*

   Rev 3 made the window fill the panel, and that was the wrong dial. A whole IDE
   in a 1012x792 vertical panel is a whole IDE ON A PHONE: every glyph is ~10px
   and the viewer is asked to read a wide desktop layout in a tall frame. The
   window cannot get bigger than the panel, so the answer is not a bigger window,
   it is a CROP.

   ⭐ `UiStage` draws the editor at 2-3x panel width inside a clipped viewport and
   PANS to the region the sentence is about, keyframe by keyframe. Text lands at
   phone-readable size, the surrounding chrome still shows at the edges so it is
   plainly VS Code, and the pan between regions is itself an authored beat rather
   than a scroll.

   ⛔ The viewport deliberately does NOT fill the panel: a bright band of the room
   stays above and below it. That is what keeps BODY_SAT off the floor when the
   frame is mostly dark IDE, and it reads as a recording playing in the bay.
   ========================================================================= */
export type FocusKey = [number, number, number];   // [frame, fx, fy] in window px

export const UiStage: React.FC<{
  f: number; keys: FocusKey[]; ww: number; wh: number;
  vx?: number; vy?: number; vw?: number; vh?: number; z?: number;
  children: React.ReactNode;
}> = ({ f, keys, ww, wh, vx = 26, vy = 138, vw = 960, vh = 496, z = 62, children }) => {
  /* interpolate the focus point across the keyframes, eased, so a move between
     two regions is a camera move and not a jump */
  let fx = keys[0][1], fy = keys[0][2];
  for (let i = 0; i < keys.length; i++) {
    const [kf, kx, ky] = keys[i];
    if (f >= kf) { fx = kx; fy = ky; }
    if (i + 1 < keys.length) {
      const [nf, nx, ny] = keys[i + 1];
      if (f >= kf && f < nf) {
        /* ⛔⛔ THE LURCH. E(f, a, b) takes START and END FRAMES — and when b <= a it
           silently degrades to `f >= b ? vb : va`, an instant snap, no error. This
           was written `E(f, nf - 12, (nf - 12) + 12)`, so every camera move in the reel either
           teleported or completed inside one frame and then sat. It is the single
           reason 6-11s reads as a random lurching screen recording. */
        const t = E(f, nf - 12, nf, 0, 1, IO);   /* 12 frames, ARRIVING on the next beat */
        fx = kx + (nx - kx) * t; fy = ky + (ny - ky) * t;
      }
    }
  }
  /* keep the window covering the viewport: never pan past its own edges */
  const L2 = Math.min(0, Math.max(vw - ww, vw / 2 - fx));
  const T2 = Math.min(0, Math.max(vh - wh, vh / 2 - fy));
  return (
    <div style={{ position: "absolute", left: vx, top: vy, width: vw, height: vh, zIndex: z,
      borderRadius: 10, overflow: "hidden", boxShadow: SH_D,
      border: `3px solid ${hexa("#0A0A0A", 0.85)}` }}>
      <div style={{ position: "absolute", left: L2, top: T2, width: ww, height: wh }}>
        {children}
      </div>
    </div>
  );
};
