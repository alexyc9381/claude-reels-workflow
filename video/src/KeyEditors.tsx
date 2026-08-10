import React from "react";
import { Img, staticFile } from "remotion";
import { inter } from "./fonts";
import { E, osc, rnd, OUT, BACK, GO, GO_L, AMBER, RED } from "./KeyWorld";

/* =========================================================================
   REEL 83 "KEY" · THE THREE SURFACES IT INSTALLS INTO.

   ⛔ First pass drew three identical dark rectangles with a name on each. That
   is a label, not a UI. These are built to what each product actually looks
   like, because the whole point of the beat is "you already use one of these":

     CURSOR       an IDE — activity rail, file tree, tabs, syntax-coloured code,
                  and the Cmd-K inline prompt bar that is its signature
     CLAUDE CODE  a TERMINAL, not a GUI — a prompt, the ✳ mark, tool-use lines
                  with bullets, a bordered input box, clay accent
     CODEX        a cloud task view — browser chrome with a URL pill, a task
                  list with status dots, strictly monochrome

   Three different shapes, three different palettes, three different layouts.
   A viewer should recognise their own tool without reading the title.
   ========================================================================= */

const mono = "ui-monospace,'SF Mono',Menlo,monospace";

const Chrome: React.FC<{ w: number; h: number; bg: string; bar: string; children?: React.ReactNode }> =
  ({ w, h, bg, bar, children }) => (<>
  <div style={{ position: "absolute", inset: 0, borderRadius: 12, background: bg }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 44,
    borderRadius: "12px 12px 0 0", background: bar }} />
  {[0, 1, 2].map((i) => (
    <div key={i} style={{ position: "absolute", left: 14 + i * 18, top: 17, width: 11, height: 11,
      borderRadius: "50%", background: ["#E06C60", "#E0B45C", "#5CB85C"][i] }} />
  ))}
  {children}
</>);

/* --------------------------------------------------------------- CURSOR -- */
/* an IDE: activity rail + file tree + tabs + coloured code + the Cmd-K bar */
export const CursorUI: React.FC<{ f: number; w?: number; h?: number; at?: number }> =
  ({ f, w = 430, h = 372, at = 0 }) => {
  const rows = Math.max(0, Math.floor(E(f, at + 5, at + 46, 0, 7, OUT)));
  const kbar = E(f, at + 26, at + 40, 0, 1, OUT);
  const done = f > at + 44;
  const TOK = ["#7FB2E8", "#C08AE8", "#7FD8A8", "#E8C07F", "#8FA0B4"];
  return (
    <Chrome w={w} h={h} bg="#101418" bar="#161B21">
      <Img src={staticFile("logos/cursor.svg")}
        style={{ position: "absolute", right: 13, top: 12, width: 21, height: 21,
          objectFit: "contain", filter: "brightness(0) invert(1)" }} />
      {/* activity rail */}
      <div style={{ position: "absolute", left: 0, top: 44, width: 38, bottom: 0, background: "#0C1014" }} />
      {[0, 1, 2, 3].map((i) => (
        <div key={i} style={{ position: "absolute", left: 11, top: 60 + i * 30, width: 16, height: 16,
          borderRadius: 4, background: i === 0 ? "#5C9BE0" : "#2A323C" }} />
      ))}
      {/* file tree */}
      <div style={{ position: "absolute", left: 38, top: 44, width: 96, bottom: 0, background: "#0F141A" }} />
      {Array.from({ length: 7 }, (_, i) => (
        <div key={`t${i}`} style={{ position: "absolute", left: 48 + (i % 3) * 7, top: 60 + i * 21,
          width: 62 - (i % 3) * 8, height: 7, borderRadius: 3, background: i === 2 ? "#5C9BE0" : "#242C36" }} />
      ))}
      {/* tab strip */}
      <div style={{ position: "absolute", left: 134, top: 44, right: 0, height: 26, background: "#0F141A" }} />
      <div style={{ position: "absolute", left: 140, top: 46, width: 88, height: 22, borderRadius: "4px 4px 0 0",
        background: "#151B22" }} />
      <div style={{ position: "absolute", left: 148, top: 53, width: 60, height: 8, borderRadius: 4,
        background: "#4E5A68" }} />
      {/* code with line numbers and syntax colour */}
      {Array.from({ length: 7 }, (_, i) => i < rows && (
        <React.Fragment key={`c${i}`}>
          <div style={{ position: "absolute", left: 142, top: 84 + i * 26, fontFamily: mono,
            fontSize: 11, color: "#2E3742" }}>{i + 1}</div>
          <div style={{ position: "absolute", left: 164 + (i % 3) * 14, top: 86 + i * 26,
            width: 34 + rnd(i, 3) * 26, height: 9, borderRadius: 4, background: TOK[i % TOK.length] }} />
          <div style={{ position: "absolute", left: 208 + (i % 3) * 14 + rnd(i, 3) * 26, top: 86 + i * 26,
            width: 52 + rnd(i, 7) * 60, height: 9, borderRadius: 4, background: TOK[(i + 2) % TOK.length],
            opacity: 0.75 }} />
        </React.Fragment>
      ))}
      {/* the Cmd-K inline prompt — Cursor's signature */}
      <div style={{ position: "absolute", left: 142, right: 14, top: h - 92, height: 40, borderRadius: 8,
        background: "#141C26", border: `2px solid ${kbar > 0.1 ? "#5C9BE0" : "#222B36"}` }}>
        <div style={{ position: "absolute", left: 10, top: 12, fontFamily: mono, fontSize: 13,
          color: "#5C9BE0", fontWeight: 700 }}>⌘K</div>
        <div style={{ position: "absolute", left: 42, top: 16, width: (w - 210) * kbar, height: 9,
          borderRadius: 4, background: "#33414F" }} />
      </div>
      <div style={{ position: "absolute", left: 142, right: 14, top: h - 44, height: 32, borderRadius: 8,
        background: done ? GO : "#161E28", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 16,
        letterSpacing: "0.06em", color: done ? "#EAFBF3" : "#3A4654", textAlign: "center",
        lineHeight: "32px" }}>{done ? "134 FREE APIS" : "connecting"}</div>
    </Chrome>
  );
};

/* ---------------------------------------------------------- CLAUDE CODE -- */
/* a terminal. No sidebar, no tabs — a prompt, tool lines, an input box. */
export const ClaudeCodeUI: React.FC<{ f: number; w?: number; h?: number; at?: number }> =
  ({ f, w = 430, h = 372, at = 0 }) => {
  const lines = Math.max(0, Math.floor(E(f, at + 5, at + 48, 0, 5, OUT)));
  const done = f > at + 44;
  const caret = !done && (f % 16) < 9;
  const TOOLS = ["Read(providers.md)", "Fetch(api-list)", "Write(.env)", "Bash(install)", "Done"];
  return (
    <Chrome w={w} h={h} bg="#17140F" bar="#221D16">
      <div style={{ position: "absolute", left: 0, right: 0, top: 12, textAlign: "center",
        fontFamily: mono, fontSize: 13, color: "#8A7C68" }}>claude</div>
      {/* the ✳ mark */}
      <Img src={staticFile("logos/claude.svg")}
        style={{ position: "absolute", right: 13, top: 11, width: 22, height: 22, objectFit: "contain" }} />
      {/* the welcome line */}
      <div style={{ position: "absolute", left: 16, top: 60, fontFamily: mono, fontSize: 14,
        color: "#D97757", fontWeight: 700 }}>✳ Claude Code</div>
      <div style={{ position: "absolute", left: 16, top: 84, width: w - 40, height: 7, borderRadius: 3,
        background: "#2E271F" }} />
      {/* tool-use lines, bulleted, the way the CLI prints them */}
      {TOOLS.map((t, i) => i < lines && (
        <React.Fragment key={t}>
          <div style={{ position: "absolute", left: 18, top: 116 + i * 30, width: 9, height: 9,
            borderRadius: "50%", background: i === lines - 1 ? "#D97757" : "#5E7F63" }} />
          <div style={{ position: "absolute", left: 36, top: 111 + i * 30, fontFamily: mono, fontSize: 13,
            color: i === lines - 1 ? "#E8DCC8" : "#7E7466" }}>{t}</div>
        </React.Fragment>
      ))}
      {/* the bordered input box */}
      <div style={{ position: "absolute", left: 14, right: 14, top: h - 76, height: 44, borderRadius: 8,
        border: "2px solid #3E3529", background: "#1C1812" }}>
        <div style={{ position: "absolute", left: 12, top: 13, fontFamily: mono, fontSize: 15,
          color: "#D97757" }}>&gt;</div>
        <div style={{ position: "absolute", left: 32, top: 18, width: (w - 90) * (lines / 5), height: 8,
          borderRadius: 4, background: "#3A3227" }} />
        {caret && <div style={{ position: "absolute", left: 36 + (w - 90) * (lines / 5), top: 14,
          width: 9, height: 17, background: "#E8DCC8" }} />}
      </div>
      <div style={{ position: "absolute", left: 14, right: 14, top: h - 26, height: 18,
        fontFamily: mono, fontSize: 12, color: done ? GO_L : "#4E463A", textAlign: "center" }}>
        {done ? "134 free APIs configured" : "working…"}
      </div>
    </Chrome>
  );
};

/* ---------------------------------------------------------------- CODEX -- */
/* a cloud task view: browser chrome, a URL pill, task rows, monochrome. */
export const CodexUI: React.FC<{ f: number; w?: number; h?: number; at?: number }> =
  ({ f, w = 430, h = 372, at = 0 }) => {
  const done = Math.max(0, Math.floor(E(f, at + 6, at + 46, 0, 4, OUT)));
  const fin = f > at + 46;
  const TASKS = ["scan providers", "check free tiers", "write keys", "verify"];
  return (
    <Chrome w={w} h={h} bg="#0E0E0E" bar="#1A1A1A">
      {/* URL pill — the giveaway that this one is in a browser */}
      <div style={{ position: "absolute", left: 68, top: 11, right: 14, height: 22, borderRadius: 11,
        background: "#262626" }}>
        <div style={{ position: "absolute", left: 12, top: 7, width: 108, height: 8, borderRadius: 4,
          background: "#4A4A4A" }} />
      </div>
      <div style={{ position: "absolute", left: 18, top: 62, fontFamily: inter.fontFamily, fontWeight: 900,
        fontSize: 19, letterSpacing: "0.04em", color: "#F2F2F2" }}>Codex</div>
      <div style={{ position: "absolute", left: 18, top: 90, width: w - 36, height: 1,
        background: "#2A2A2A" }} />
      {/* task rows with status dots */}
      {TASKS.map((t, i) => (
        <React.Fragment key={t}>
          <div style={{ position: "absolute", left: 18, right: 18, top: 108 + i * 46, height: 38,
            borderRadius: 8, background: i < done ? "#1C1C1C" : "#151515" }} />
          <div style={{ position: "absolute", left: 30, top: 120 + i * 46, width: 14, height: 14,
            borderRadius: "50%", background: i < done ? "#E6E6E6" : "#333333" }}>
            {i < done && <div style={{ position: "absolute", left: 4, top: 4, width: 6, height: 6,
              borderRadius: "50%", background: "#0E0E0E" }} />}
          </div>
          <div style={{ position: "absolute", left: 56, top: 118 + i * 46, fontFamily: mono, fontSize: 13,
            color: i < done ? "#D8D8D8" : "#4A4A4A" }}>{t}</div>
        </React.Fragment>
      ))}
      <div style={{ position: "absolute", left: 18, right: 18, top: h - 46, height: 34, borderRadius: 8,
        background: fin ? "#F2F2F2" : "#1F1F1F", fontFamily: inter.fontFamily, fontWeight: 900,
        fontSize: 15, letterSpacing: "0.08em", color: fin ? "#0E0E0E" : "#4A4A4A",
        textAlign: "center", lineHeight: "34px" }}>{fin ? "134 FREE" : "running"}</div>
    </Chrome>
  );
};
