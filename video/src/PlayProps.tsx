import React from "react";
import { Img, staticFile } from "remotion";
import { inter, fraunces } from "./fonts";
import { MONO } from "./SlopKit";
import { E, OUT, IO, BACK, LIN, hexa, mix, dark, CLAY, Claudie, SH, SH_D, W, H } from "./PlayWorld";

/* =========================================================================
   REEL 95 "TOOLS" · THE BUILT PROPS.

   ⛔ Every hero is BUILT — bevels, brass, panel lines, a lit face and a
      shadowed face — never a flat rectangle with type on it.
   ⛔ Real marks only, from public/logos/*, on WHITE tiles. Nothing recolours a
      mark; the house filter destroys any logo that is not already black.
   ⛔ NOTHING HERE DRAWS A PRICE, A SCORE OR AN INSTALL COMMAND THAT DOES NOT
      EXIST. See the three flagged VO claims at the head of storyboards/95-tools.md.
   ========================================================================= */


/* ---------------------------------------------------------------------------
   ⛔ REAL MARKS, WHEREVER ONE EXISTS. Alex, round 2: "try to use real company
      logos whenever possible ... targeting our ideal AI audience with the
      visual imagery." Every company below has a real section in the repo AND a
      real mark saved locally, so the script racks, the shelves and the fly bars
      all carry identification instead of coloured spines. That is the audience
      signal: a viewer scrolling past reads CLAUDE / CHATGPT / CURSOR before a
      word of the voiceover lands.
   ⛔ A WRONG MARK IS WORSE THAN NO MARK. Simple Icons has no `grok` or `xai`, so
      Grok carries the X mark (xAI's parent brand). Kimi, GLM, OpenCode and Pi
      have no mark at all and are named in type only, never given a stand-in.
   ------------------------------------------------------------------------ */
export type Mark = [file: string, name: string, png?: boolean];
export const ROSTER: Mark[] = [
  ["claude.svg", "CLAUDE"],
  ["chatgpt_logo.png", "CHATGPT", true],
  ["googlegemini.svg", "GEMINI"],
  ["x.svg", "GROK"],
  ["cursor.svg", "CURSOR"],
  ["githubcopilot.svg", "COPILOT"],
  ["perplexity.svg", "PERPLEXITY"],
  ["deepseek.svg", "DEEPSEEK"],
  ["mistralai.svg", "MISTRAL"],
  ["notion.svg", "NOTION AI"],
  ["qwen.svg", "QWEN"],
  ["meta.svg", "META AI"],
];

/** a real mark on a WHITE tile — the only way a coloured logo survives the house
    treatment, and the only way it reads at feed size. */
export const MarkTile: React.FC<{ m: Mark; s?: number; z?: number; r?: number }> =
  ({ m, s = 1, z = 1, r = 0.24 }) => (
  <div style={{ width: 44 * s, height: 44 * s, borderRadius: 44 * s * r, background: "#FFFFFF",
    border: `${Math.max(2, 2.5 * s)}px solid #E0D6BC`, display: "flex", alignItems: "center",
    justifyContent: "center", zIndex: z, flex: "0 0 auto" }}>
    <Img src={staticFile(m[2] ? m[0] : `logos/${m[0]}`)}
      style={{ width: 28 * s, height: 28 * s, objectFit: "contain" }} />
  </div>
);

/** a bound script with its owner's mark on the cover — the repo's unit of work,
    and what the whole reel is actually about. */
export const MarkedScript: React.FC<{ x: number; y: number; m: Mark; s?: number; z?: number;
  lines?: number; spin?: boolean; f?: number; big?: boolean }> =
  ({ x, y, m, s = 1, z = 50, lines = 5, spin = false, f = 0, big = false }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z, transform: `scale(${s})`,
    transformOrigin: "50% 100%" }}>
    <div style={{ width: 132, borderRadius: 6, background: "#F2EADA", border: "5px solid #C4B48E",
      borderLeft: "11px solid #8A3F2E", boxShadow: SH, padding: "12px 12px 14px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: big ? 10 : 8 }}>
        <div style={{ transform: spin ? `rotate(${f * 1.4}deg)` : undefined }}>
          <MarkTile m={m} s={big ? 1.02 : 0.72} z={2} />
        </div>
        <div style={{ fontFamily: MONO, fontWeight: 900, fontSize: big ? 12 : 10,
          letterSpacing: "0.06em", color: "#6E5F3E", lineHeight: 1.1 }}>{m[1]}</div>
      </div>
      {Array.from({ length: lines }, (_, i) => (
        <div key={i} style={{ marginTop: i === 0 ? 11 : 7, height: 6,
          width: `${92 - (i * 29 % 38)}%`, borderRadius: 2, background: "#BFB292" }} />
      ))}
    </div>
  </div>
);

/** the rack the prompter reaches into — twelve marked scripts, ranked. */
export const MarkRack: React.FC<{ x: number; y: number; n?: number; s?: number; z?: number;
  reveal?: number; f?: number }> = ({ x, y, n = 12, s = 1, z = 46, reveal = 1, f = 0 }) => (<>
  {/* ⛔ CLAUDE IS NOT ONE OF TWELVE EQUALS. The rack ranks: the Claude script is
      1.5x, first, and its mark spins. Everything else is the evidence that the
      repo is comprehensive; this is the one that says who the video is for. */}
  {Array.from({ length: n }, (_, i) => {
    const col = i % 6, row = Math.floor(i / 6);
    const on = reveal * n > i;
    const isClaude = i === 0;
    return (
      <div key={i} style={{ position: "absolute", left: x + col * 150 * s,
        top: y + row * 122 * s - (isClaude ? 26 * s : 0), zIndex: z + (isClaude ? 40 : i),
        opacity: on ? 1 : 0.18,
        transform: `scale(${s * (on ? 1 : 0.9) * (isClaude ? 1.34 : 1)})`,
        transformOrigin: "0% 50%" }}>
        <MarkedScript x={0} y={0} m={ROSTER[i % ROSTER.length]} s={1} z={z + i} lines={3}
          spin={isClaude} f={f} big={isClaude} />
      </div>
    );
  })}
</>);

/* ---------------------------------------------------------- THE HERO ------
   THE PROMPT CARD. The thing the prompter holds up at 0.60s, the thing that is
   copied, and the thing the understudy is still holding at the end. It is the
   only object that appears in the first shot and the last.
   ------------------------------------------------------------------------- */
export const PromptCard: React.FC<{ x: number; y: number; s?: number; z?: number; f: number;
  rot?: number; lines?: number; title?: string; mark?: string; spin?: boolean }> =
  ({ x, y, s = 1, z = 70, f, rot = 0, lines = 7, title = "SYSTEM PROMPT",
     mark = "claude_logo.png", spin = false }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 360, zIndex: z,
    transform: `scale(${s}) rotate(${rot}deg)`, transformOrigin: "50% 50%" }}>
    <div style={{ position: "relative", borderRadius: 12, background: "#F2EADA",
      border: "7px solid #C4B48E", boxShadow: SH_D, padding: "20px 22px 24px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {/* ⛔ THE MARK IS THE SUBJECT OF THIS CARD, not a bullet next to a label.
            Round 3: bigger Claude logos, especially in the first three seconds. */}
        <div style={{ width: 92, height: 92, borderRadius: 22, background: "#FFFFFF",
          border: "4px solid #E0D6BC", display: "flex", alignItems: "center",
          justifyContent: "center", flex: "0 0 auto", boxShadow: SH }}>
          <Img src={staticFile(mark)} style={{ width: 66, height: 66, objectFit: "contain",
            transform: spin ? `rotate(${f * 1.6}deg)` : undefined }} />
        </div>
        <div>
          <div style={{ fontFamily: MONO, fontWeight: 900, fontSize: 19, letterSpacing: "0.18em",
            color: "#6E5F3E" }}>{title}</div>
          <div style={{ marginTop: 5, fontFamily: fraunces.fontFamily, fontWeight: 900,
            fontSize: 27, lineHeight: 1, color: "#241E12" }}>CLAUDE FABLE 5</div>
        </div>
      </div>
      <div style={{ marginTop: 16, height: 3, background: "#D6C8A4" }} />
      {Array.from({ length: lines }, (_, i) => (
        <div key={i} style={{ marginTop: i === 0 ? 16 : 11, height: i === 0 ? 13 : 9,
          width: `${94 - (i * 37 % 44)}%`, borderRadius: 3,
          background: i === 0 ? "#8A7A54" : "#BFB292" }} />
      ))}
    </div>
  </div>
);

/* ------------------------------------------------------------------ S0 ----
   THE PROMPTER'S BOX — the hooded hatch cut into the front lip of the stage,
   and the reel's central image.
   ------------------------------------------------------------------------- */
export const PrompterBox: React.FC<{ x: number; y: number; s?: number; z?: number; f: number;
  lit?: number }> = ({ x, y, s = 1, z = 60, f, lit = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z, transform: `scale(${s})`,
    transformOrigin: "50% 100%" }}>
    {/* the hood — a half-shell facing upstage, seen from the house */}
    <div style={{ position: "absolute", left: -128, top: -132, width: 256, height: 138,
      borderRadius: "128px 128px 0 0", background: "linear-gradient(176deg,#6E4A22 0%,#3A2610 100%)",
      boxShadow: SH_D }} />
    <div style={{ position: "absolute", left: -128, top: -132, width: 256, height: 12,
      borderRadius: "128px 128px 0 0", background: "#A8763F" }} />
    {/* the mouth, and the green shade burning inside it */}
    <div style={{ position: "absolute", left: -92, top: -76, width: 184, height: 74,
      borderRadius: "92px 92px 0 0", background: "#150C06" }} />
    <div style={{ position: "absolute", left: -46, top: -50, width: 92, height: 22,
      borderRadius: 11, background: "#8FD9A8", opacity: lit * 0.9 }} />
    {/* brass studs round the hood */}
    {Array.from({ length: 7 }, (_, i) => {
      const a = Math.PI * (0.12 + i * 0.127);
      return (
        <div key={i} style={{ position: "absolute", left: -Math.cos(a) * 116 - 6,
          top: -132 + 138 - Math.sin(a) * 116 - 6, width: 12, height: 12, borderRadius: 7,
          background: "#D9A441" }} />
      );
    })}
    {/* the base sunk into the lip */}
    <div style={{ position: "absolute", left: -142, top: -6, width: 284, height: 24,
      borderRadius: 6, background: "#5A3A18" }} />
  </div>
);

/* ------------------------------------------------------------------ S1 ----
   THE ARCHIVE. Ranked script boxes with spine labels — a wall of documents that
   one card comes out of.
   ------------------------------------------------------------------------- */
export const Shelf: React.FC<{ x: number; y: number; w: number; rows?: number; z?: number;
  gap?: number; dark0?: number }> =
  ({ x, y, w: ww, rows = 4, z = 30, gap = 96, dark0 = -1 }) => (<>
  {Array.from({ length: rows }, (_, r) => (
    <React.Fragment key={r}>
      <div style={{ position: "absolute", left: x, top: y + r * gap, width: ww, height: 11,
        background: "#6E5433", zIndex: z, boxShadow: SH }} />
      <div style={{ position: "absolute", left: x, top: y + r * gap - 4, width: ww, height: 5,
        background: "#8E6E42", zIndex: z + 1 }} />
      {Array.from({ length: Math.floor(ww / 34) }, (_, i) => {
        const q = Math.sin(r * 19.3 + i * 7.7) * 4371.7;
        const rr = q - Math.floor(q);
        const h = 52 + Math.round(rr * 22);
        const gone = dark0 === r * 100 + i;
        return (
          <div key={i} style={{ position: "absolute", left: x + 6 + i * 34,
            top: y + r * gap - h, width: 27, height: h, zIndex: z,
            background: gone ? "#1C150F"
              : ["#7A3F2E", "#8A6A32", "#4E5E42", "#6E4A56", "#84603A"][(i + r) % 5] }}>
            {!gone && <div style={{ position: "absolute", left: 4, top: 12, width: 19, height: 12,
              background: "#E4D6B4" }} />}
          </div>
        );
      })}
    </React.Fragment>
  ))}
</>);

/* ------------------------------------------------------------------ S2 ----
   THE STAR DRESSING DOOR — mirror bulbs and a brass name plate.
   ------------------------------------------------------------------------- */
export const DressingDoor: React.FC<{ x: number; y: number; name: string; on: number;
  f: number; s?: number; z?: number; logo?: string; sub?: string }> =
  ({ x, y, name, on, f, s = 1, z = 40, logo, sub }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z, transform: `scale(${s})`,
    transformOrigin: "50% 100%" }}>
    {/* the surround the bulbs sit on */}
    <div style={{ position: "absolute", left: -22, top: -368, width: 268, height: 368,
      borderRadius: 8, background: on > 0 ? "#54423E" : "#392C2A" }} />
    {/* the door */}
    <div style={{ position: "absolute", left: 0, top: -340, width: 224, height: 340,
      background: on > 0 ? "linear-gradient(96deg,#EFE4CE 0%,#CDBE9E 100%)"
                         : "linear-gradient(96deg,#6E6055 0%,#4A3F38 100%)",
      border: "6px solid #8A7358", borderRadius: 4, boxShadow: SH_D }}>
      <div style={{ position: "absolute", left: 22, top: 26, right: 22, height: 118,
        border: `5px solid ${on > 0 ? "#BCAA86" : "#5E5148"}` }} />
      <div style={{ position: "absolute", right: 20, top: 196, width: 17, height: 17,
        borderRadius: 9, background: "#C79A46" }} />
    </div>
    {/* the brass name plate */}
    <div style={{ position: "absolute", left: -2, top: -252, width: 228, height: 76,
      borderRadius: 6, background: on > 0 ? "linear-gradient(160deg,#E0BE72 0%,#A8801E 100%)" : "#4A3F30",
      border: `4px solid ${on > 0 ? "#7C5D24" : "#3A3126"}`, boxShadow: SH,
      display: "flex", alignItems: "center", justifyContent: "center", gap: 9 }}>
      {logo && on > 0 && (
        <div style={{ width: 34, height: 34, borderRadius: 8, background: "#FFFFFF",
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Img src={staticFile(logo)} style={{ width: 23, height: 23, objectFit: "contain" }} />
        </div>
      )}
      <div>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 21,
          lineHeight: 1, color: on > 0 ? "#2E220A" : "#6E6250", whiteSpace: "nowrap" }}>{name}</div>
        {sub && <div style={{ marginTop: 3, fontFamily: MONO, fontWeight: 900, fontSize: 12,
          letterSpacing: "0.14em", color: on > 0 ? "#5E4517" : "#5E5442" }}>{sub}</div>}
      </div>
    </div>
    {/* the mirror bulbs, solid lenses that chase */}
    {Array.from({ length: 14 }, (_, i) => {
      const side = i < 7;
      const k = side ? i : i - 7;
      const chase = (i * 3 + Math.floor(f / 4)) % 4 !== 0;
      return (
        <div key={i} style={{ position: "absolute", left: side ? -14 : 226,
          top: -344 + k * 48, width: 26, height: 26, borderRadius: 14,
          background: on > 0 ? (chase ? "#F6E2A8" : "#B99A5E") : "#453A32", zIndex: 4 }} />
      );
    })}
  </div>
);

/** a thick bound script — what a top model's brief physically looks like. */
export const ScriptStack: React.FC<{ x: number; y: number; n?: number; s?: number; z?: number;
  c?: string; label?: string }> =
  ({ x, y, n = 9, s = 1, z = 50, c = "#E4D6B4", label }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z, transform: `scale(${s})`,
    transformOrigin: "50% 100%" }}>
    {Array.from({ length: n }, (_, i) => (
      <div key={i} style={{ position: "absolute", left: ((i * 13) % 9) - 4, top: -i * 9,
        width: 168, height: 13, borderRadius: 2, background: i % 2 ? c : mix(c, 0.12),
        borderLeft: "7px solid #8A3F2E", boxShadow: i === n - 1 ? SH : undefined }} />
    ))}
    {label && (
      <div style={{ position: "absolute", left: 0, top: -n * 9 - 34, width: 168, textAlign: "center",
        fontFamily: MONO, fontWeight: 900, fontSize: 15, letterSpacing: "0.12em",
        color: "#D8C8A8" }}>{label}</div>
    )}
  </div>
);

/* ------------------------------------------------------------------ S4 ----
   THE MARQUEE, and the number that arrives under it.
   ------------------------------------------------------------------------- */
export const Marquee: React.FC<{ x: number; y: number; text: string; on: number; f: number;
  s?: number; z?: number; c?: string }> =
  ({ x, y, text, on, f, s = 1, z = 60, c = "#E7B24C" }) => {
  const chars = text.split("");
  const wpc = 42 * s;
  const ww = chars.length * wpc + 46 * s;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: 100 * s, zIndex: z }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 10 * s, background: "#2A1712",
        border: `${5 * s}px solid #6E4A22`, boxShadow: SH_D }} />
      {Array.from({ length: Math.floor(ww / (26 * s)) }, (_, i) => {
        const litB = (i * 7 + Math.floor(f / 3)) % 3 !== 0;
        return (<React.Fragment key={i}>
          <div style={{ position: "absolute", left: 14 * s + i * 26 * s, top: 8 * s,
            width: 11 * s, height: 11 * s, borderRadius: 7 * s,
            background: on > 0 ? (litB ? "#F6DDA0" : "#8A6E34") : "#4A3A2A" }} />
          <div style={{ position: "absolute", left: 14 * s + i * 26 * s, bottom: 8 * s,
            width: 11 * s, height: 11 * s, borderRadius: 7 * s,
            background: on > 0 ? (litB ? "#8A6E34" : "#F6DDA0") : "#4A3A2A" }} />
        </React.Fragment>);
      })}
      {chars.map((ch, i) => (
        <div key={i} style={{ position: "absolute", left: 23 * s + i * wpc, top: 24 * s,
          width: wpc, textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 900,
          fontSize: 50 * s, lineHeight: 1, color: i < on ? c : "#544438" }}>{ch}</div>
      ))}
    </div>
  );
};

/** ⛔ THE NUMBER MOVES TO ITS VALUE. Gold stars streak in on staggered arcs and
    pile into the housing; the digits roll on the same curve. */
export const StarStream: React.FC<{ k: number; tx: number; ty: number; n?: number; z?: number }> =
  ({ k, tx, ty, n = 42, z = 66 }) => (<>
  {Array.from({ length: n }, (_, i) => {
    const r = (m: number) => { const v = Math.sin(i * 31.7 + m * 17.3) * 4371.7; return v - Math.floor(v); };
    const t0 = i * 0.78;
    const p = E(k, t0, t0 + 30, 0, 1, IO);
    if (p <= 0 || p >= 1) return null;
    const sx = -260 - r(1) * 300, sy = -120 + r(2) * 660;
    const arc = Math.sin(p * Math.PI) * (90 + r(3) * 160) * (r(4) > 0.5 ? 1 : -1);
    return (
      <div key={i} style={{ position: "absolute", left: sx + (tx - sx) * p,
        top: sy + (ty - sy) * p + arc, width: 30, height: 30, zIndex: z,
        opacity: 1 - p * p * 0.5, transform: `rotate(${p * 330}deg)` }}>
        <div style={{ width: 30, height: 30, background: "#F2C15E",
          clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)" }} />
      </div>
    );
  })}
</>);

export const Counter: React.FC<{ x: number; y: number; v: string; label: string; s?: number;
  z?: number; hit?: number }> = ({ x, y, v, label, s = 1, z = 70, hit = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    transform: `scale(${1 + hit * 0.06})`, transformOrigin: "50% 50%" }}>
    <div style={{ width: 448 * s, height: 150 * s, borderRadius: 14 * s,
      background: "linear-gradient(168deg,#2A1F16 0%,#150E0A 100%)", boxShadow: SH_D,
      border: `${4 * s}px solid #7C5D24` }}>
      <div style={{ position: "absolute", left: 22 * s, top: 15 * s, fontFamily: MONO,
        fontWeight: 800, fontSize: 18 * s, letterSpacing: "0.22em", color: "#A08F62" }}>{label}</div>
      <div style={{ position: "absolute", left: 22 * s, top: 46 * s, display: "flex", gap: 5 * s }}>
        {v.split("").map((d, i) => (
          <div key={i} style={{ minWidth: d === "," ? 15 * s : 45 * s, height: 78 * s,
            borderRadius: 7 * s, background: d === "," ? "transparent" : "#0E0906",
            border: d === "," ? "none" : `${3 * s}px solid #3E3524`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 52 * s,
            color: "#E7B24C", lineHeight: 1 }}>{d}</div>
        ))}
      </div>
      <div style={{ position: "absolute", right: 18 * s, top: 13 * s, width: 40 * s,
        height: 40 * s, borderRadius: 10 * s, background: "#FFFFFF", display: "flex",
        alignItems: "center", justifyContent: "center" }}>
        <Img src={staticFile("logos/github.svg")}
          style={{ width: 28 * s, height: 28 * s, objectFit: "contain" }} />
      </div>
    </div>
  </div>
);

/* ------------------------------------------------------------------ S5 ----
   THE ALLEY TERMINAL. ⛔ THE ONLY COMMAND THAT SHIPS IS A CLONE — the repo has
   no installer, no CLI and no skill, so a clone is what gets typed and nothing
   is invented. See the flagged claims at the head of the board.
   ------------------------------------------------------------------------- */
export const AlleyTerminal: React.FC<{ x: number; y: number; typed: number; files: number;
  done: boolean; f: number; s?: number; z?: number }> =
  ({ x, y, typed, files, done, f, s = 1, z = 60 }) => {
  const CMD = "git clone https://github.com/asgeirtj/system_prompts_leaks";
  const shown = CMD.slice(0, Math.max(0, Math.round(typed * CMD.length)));
  const DIRS = ["Anthropic/", "OpenAI/", "Google/", "xAI/", "Cursor/", "Perplexity/"];
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z, transform: `scale(${s})`,
      transformOrigin: "50% 100%" }}>
      <div style={{ position: "absolute", left: -14, top: 0, width: 470, height: 22,
        borderRadius: 9, background: "linear-gradient(178deg,#D2CCC0 0%,#A29C90 100%)",
        boxShadow: SH_D }} />
      <div style={{ position: "absolute", left: 8, top: -286, width: 428, height: 286,
        borderRadius: 12, background: "#C4BEB2", boxShadow: SH_D, border: "4px solid #948E82" }}>
        <div style={{ position: "absolute", inset: 12, borderRadius: 5, background: "#101A16",
          overflow: "hidden" }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 26,
            background: "#17231E" }} />
          {["#C44A3A", "#E7B24C", "#3F9E74"].map((c, i) => (
            <div key={c} style={{ position: "absolute", left: 10 + i * 16, top: 9, width: 9,
              height: 9, borderRadius: 5, background: c }} />
          ))}
          <div style={{ position: "absolute", left: 12, top: 36, right: 10, fontFamily: MONO,
            fontWeight: 800, fontSize: 14, lineHeight: 1.35, color: "#8FD9A8",
            wordBreak: "break-all" }}>
            <span style={{ color: "#D8C8A8" }}>$ </span>{shown}
            {typed < 1 && <span style={{ opacity: Math.sin(f / 3) > 0 ? 1 : 0 }}>█</span>}
          </div>
          {files > 0 && DIRS.slice(0, files).map((d, i) => (
            <div key={d} style={{ position: "absolute", left: 12, top: 112 + i * 21,
              fontFamily: MONO, fontWeight: 700, fontSize: 13, color: "#B8C4BC" }}>
              <span style={{ color: "#3F9E74" }}>+</span> {d}
            </div>
          ))}
          {done && (
            <div style={{ position: "absolute", left: 12, bottom: 12, padding: "5px 12px",
              borderRadius: 6, background: "#17321F", fontFamily: MONO, fontWeight: 900,
              fontSize: 14, color: "#7FD3A6" }}>✓ 184 FILES · 18 FOLDERS</div>
          )}
        </div>
      </div>
      <div style={{ position: "absolute", left: 190, top: 2, width: 36, height: 36,
        borderRadius: 9, background: "#FFFFFF", display: "flex", alignItems: "center",
        justifyContent: "center", zIndex: 4 }}>
        <Img src={staticFile("logos/github.svg")}
          style={{ width: 25, height: 25, objectFit: "contain" }} />
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ S6 ----
   A FLY BAR of script boards, dropping in from the grid.
   ------------------------------------------------------------------------- */
export const FlyBar: React.FC<{ y: number; drop: number; n?: number; z?: number; c?: string;
  label?: string; marks?: Mark[] }> = ({ y, drop, n = 6, z = 40, c = "#E4D6B4", label, marks }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top: y - (1 - drop) * 620, zIndex: z }}>
    {/* the hemp lines it hangs on */}
    {Array.from({ length: n }, (_, i) => (
      <div key={"ln" + i} style={{ position: "absolute", left: 66 + i * (880 / n) + 42,
        top: -700, width: 4, height: 700, background: "#6E5433" }} />
    ))}
    <div style={{ position: "absolute", left: -30, right: -30, top: 0, height: 15,
      borderRadius: 7, background: "#4E5A66", boxShadow: SH }} />
    {Array.from({ length: n }, (_, i) => (
      <div key={i} style={{ position: "absolute", left: 66 + i * (880 / n), top: 15, width: 118,
        height: 152, borderRadius: 5, background: i % 2 ? c : mix(c, 0.10),
        border: "5px solid #8A7358", boxShadow: SH }}>
        {/* ⛔ every board carries a REAL mark where one exists — a rack of blank
            paper says nothing to an AI viewer; a rack of logos says everything */}
        {marks && marks[i] ? (
          <div style={{ position: "absolute", left: 10, top: 10 }}>
            <MarkTile m={marks[i]} s={0.80} z={2} />
          </div>
        ) : (
          <div style={{ position: "absolute", left: 12, top: 14, width: 60, height: 10,
            background: "#8A7A54" }} />
        )}
        {marks && marks[i] && (
          <div style={{ position: "absolute", left: 10, top: 56, right: 8, fontFamily: MONO,
            fontWeight: 900, fontSize: 10, letterSpacing: "0.04em", color: "#6E5F3E",
            lineHeight: 1.1 }}>{marks[i][1]}</div>
        )}
        {[0, 1, 2].map((k) => (
          <div key={k} style={{ position: "absolute", left: 12, top: 84 + k * 17,
            width: 86 - (k * 23) % 44, height: 7, background: "#BFB292" }} />
        ))}
      </div>
    ))}
    {label && (
      <div style={{ position: "absolute", left: 0, right: 0, top: 178, textAlign: "center",
        fontFamily: MONO, fontWeight: 900, fontSize: 17, letterSpacing: "0.20em",
        color: "#9EB4CA" }}>{label}</div>
    )}
  </div>
);

/* ------------------------------------------------------------------ S7 ----
   THE CAST BOARD. Four real marks, each pinned on its own measured onset.
   ------------------------------------------------------------------------- */
export const CastCard: React.FC<{ x: number; y: number; on: number; logo: string; name: string;
  file: string; png?: boolean; s?: number; z?: number }> =
  ({ x, y, on, logo, name, file, png = false, s = 1, z = 60 }) => {
  if (on <= 0.02) return null;
  return (
    <div style={{ position: "absolute", left: x, top: y - (1 - on) * 70, zIndex: z,
      transform: `scale(${s * (0.86 + on * 0.14)}) rotate(${(1 - on) * -7 + (x % 7) - 3}deg)`,
      transformOrigin: "50% 0%", opacity: Math.min(1, on * 2) }}>
      <div style={{ width: 196, borderRadius: 7, background: "#F2EADA", border: "4px solid #C4B48E",
        boxShadow: SH_D, padding: "16px 14px 14px", textAlign: "center" }}>
        <div style={{ width: 66, height: 66, margin: "0 auto", borderRadius: 15,
          background: "#FFFFFF", border: "3px solid #E0D6BC", display: "flex",
          alignItems: "center", justifyContent: "center" }}>
          <Img src={staticFile(png ? logo : `logos/${logo}`)}
            style={{ width: 42, height: 42, objectFit: "contain" }} />
        </div>
        <div style={{ marginTop: 11, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 22,
          color: "#2B2418" }}>{name}</div>
        <div style={{ marginTop: 4, fontFamily: MONO, fontWeight: 800, fontSize: 11,
          letterSpacing: "0.06em", color: "#8A7A54", wordBreak: "break-all" }}>{file}</div>
      </div>
      {/* the brass pin */}
      <div style={{ position: "absolute", left: 90, top: -9, width: 20, height: 20,
        borderRadius: 11, background: "#D9A441", border: "3px solid #8A6420" }} />
    </div>
  );
};

/* ------------------------------------------------------------------ S8 ----
   THE HOUSE — ranked seats in the dark, lifting back to front.
   ------------------------------------------------------------------------- */
export const Seats: React.FC<{ y: number; lit: number; rows?: number; z?: number; f?: number;
  wave?: number }> = ({ y, lit, rows = 6, z = 20, f = 0, wave = 0 }) => (<>
  {/* ⛔⛔ THE HOUSE IS FULL OF CLAUDES, AND THEY CHEER. Alex, round 5: "the
      animation at 17 seconds needs Claude sprites in the audience and cheering,
      right now it's not engaging or interesting enough." He is right and the
      first version deserved it — it was rows of empty red rectangles changing
      colour, which is a chart of seats, not an audience.
      Now: six ranked rows of real Mascots, only head-and-shoulders showing above
      each seat back (the back is drawn IN FRONT of them, which is both correct
      and what sells the depth), and a CHEER WAVE that travels front to back so
      the reaction reads as a reaction rather than a state change.
      ⛔ Every one is the house clay; the understudy out-ranks them on size and
      light, not colour. */}
  {Array.from({ length: rows }, (_, r) => {
    const p = r / rows;
    const s = 1 - p * 0.44;
    const rowY = y - r * 52;
    const n = 6 + r;
    const on = lit * rows > (rows - r);
    return (
      <React.Fragment key={r}>
        {Array.from({ length: n }, (_, i) => {
          const x = 40 + i * ((950 - r * 30) / n) + r * 15;
          /* the wave arrives at this row, then this seat, a beat apart */
          const t0 = (rows - r) * 3.5 + (i % 3) * 2;
          const ch = Math.max(0, Math.min(1, (wave * 46 - t0) / 9));
          return (
            <React.Fragment key={i}>
              {/* the occupant */}
              <Claudie x={x + 44 * s} y={rowY + 62 * s} s={s * 0.62} z={z + (rows - r) * 3}
                f={f + i * 13 + r * 29} costume={{ cheer: ch * 0.95 }} />
              {/* the seat back, drawn OVER them so only head and raised arms show */}
              <div style={{ position: "absolute", left: x, top: rowY + 24 * s, width: 90 * s,
                height: 54 * s, borderRadius: "18px 18px 4px 4px",
                background: on ? "#B0444A" : "#4A1C20", zIndex: z + (rows - r) * 3 + 1 }} />
              <div style={{ position: "absolute", left: x, top: rowY + 24 * s, width: 90 * s,
                height: 9 * s, borderRadius: "18px 18px 0 0",
                background: on ? "#C4585C" : "#5A2428", zIndex: z + (rows - r) * 3 + 2 }} />
            </React.Fragment>
          );
        })}
      </React.Fragment>
    );
  })}
</>);

/** confetti off the gallery when the house lifts — small, warm, and it falls
    THROUGH the frame rather than sitting in it. */
export const Cheer: React.FC<{ f: number; start: number; n?: number; z?: number }> =
  ({ f, start, n = 26, z = 86 }) => (<>
  {Array.from({ length: n }, (_, i) => {
    const r = (k: number) => { const v = Math.sin(i * 41.7 + k * 13.3) * 4371.7; return v - Math.floor(v); };
    const k = f - start - i * 1.4;
    if (k < 0) return null;
    const fall = k * (2.6 + r(3) * 3.2);
    if (fall > 520) return null;
    return (
      <div key={i} style={{ position: "absolute", left: 30 + r(1) * 950 + Math.sin(k / 9 + i) * 16,
        top: 96 + fall, width: 9 + (i % 2) * 4, height: 13,
        background: ["#F2C15E", "#E4D6B4", "#D9A441", "#C77A4E"][i % 4],
        transform: `rotate(${k * (6 + r(2) * 8)}deg)`, opacity: 1 - fall / 560, zIndex: z }} />
    );
  })}
</>);

/* ------------------------------------------------------------------ S9 ----
   THE BOX OFFICE PRICE BOARD. ⛔ NO CURRENCY AND NO FIGURE ANYWHERE — the VO's
   "thousands of dollars" is unsourced, so price is a BAR LENGTH and the payoff
   is the licence, which is a verified fact.
   ------------------------------------------------------------------------- */
export const PriceBoard: React.FC<{ x: number; y: number; flip: number; s?: number; z?: number }> =
  ({ x, y, flip, s = 1, z = 60 }) => {
  const ROWS: [string, number][] = [["STALLS", 0.92], ["CIRCLE", 0.74], ["GALLERY", 0.52]];
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z, transform: `scale(${s})`,
      transformOrigin: "50% 50%" }}>
      <div style={{ width: 460, borderRadius: 12, background: "#1C120C",
        border: "8px solid #7C5D24", boxShadow: SH_D, padding: "22px 24px 24px" }}>
        {ROWS.map(([name, v], i) => {
          const p = Math.max(0, Math.min(1, flip * 3 - i));
          const len = v * (1 - p) + 0.07 * p;
          return (
            <div key={name} style={{ position: "relative", height: 54, marginBottom: 10 }}>
              <div style={{ position: "absolute", left: 0, top: 16, fontFamily: MONO,
                fontWeight: 900, fontSize: 18, letterSpacing: "0.14em", color: "#A08F62",
                width: 128 }}>{name}</div>
              <div style={{ position: "absolute", left: 138, top: 12, right: 0, height: 30,
                borderRadius: 6, background: "#2E2016" }} />
              <div style={{ position: "absolute", left: 138, top: 12, height: 30, borderRadius: 6,
                width: `${len * 292}px`,
                background: p > 0.5 ? "#3F9E74" : "linear-gradient(96deg,#E0743E 0%,#B44A24 100%)",
                transform: `scaleY(${1 - Math.abs(Math.cos(Math.min(1, p) * Math.PI)) * 0.0})` }} />
            </div>
          );
        })}
        {flip > 0.92 && (
          <div style={{ marginTop: 8, height: 58, borderRadius: 9, background: "#3F9E74",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 26, color: "#FFFFFF" }}>
            CC0 · PUBLIC DOMAIN
          </div>
        )}
      </div>
    </div>
  );
};

/* ----------------------------------------------------------------- S10 ----
   THE POSTER CASE, and the repo card handed to camera.
   ------------------------------------------------------------------------- */
export const RepoCard: React.FC<{ x: number; y: number; s?: number; z?: number }> =
  ({ x, y, s = 1, z = 80 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z, transform: `scale(${s})`,
    transformOrigin: "50% 50%" }}>
    <div style={{ width: 372, height: 214, borderRadius: 16, background: "#F6F2E6",
      boxShadow: SH_D, border: "4px solid #C4B48E", overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 22, top: 20, width: 56, height: 56,
        borderRadius: 14, background: "#FFFFFF", border: "3px solid #E0D6BC", display: "flex",
        alignItems: "center", justifyContent: "center" }}>
        <Img src={staticFile("logos/github.svg")} style={{ width: 36, height: 36, objectFit: "contain" }} />
      </div>
      <div style={{ position: "absolute", left: 94, top: 24, fontFamily: MONO, fontWeight: 800,
        fontSize: 15, letterSpacing: "0.12em", color: "#8A7A54" }}>asgeirtj /</div>
      <div style={{ position: "absolute", left: 94, top: 48, fontFamily: inter.fontFamily,
        fontWeight: 900, fontSize: 23, color: "#2B2418", whiteSpace: "nowrap" }}>system_prompts_leaks</div>
      <div style={{ position: "absolute", left: 22, top: 100, right: 22, height: 2,
        background: "#E2D8C0" }} />
      <div style={{ position: "absolute", left: 22, top: 118, display: "flex", gap: 9 }}>
        {[["★", "62,597"], ["⑂", "10,288"], ["", "CC0"]].map(([g, t], i) => (
          <div key={i} style={{ padding: "7px 13px", borderRadius: 9, background: "#EDE6D4",
            border: "2px solid #D8CDB4", fontFamily: inter.fontFamily, fontWeight: 900,
            fontSize: 19, color: "#2B2418" }}>{g} {t}</div>
        ))}
      </div>
      <div style={{ position: "absolute", left: 22, top: 168, right: 22, height: 30,
        borderRadius: 8, background: "#3F9E74", display: "flex", alignItems: "center",
        justifyContent: "center", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 17,
        color: "#FFFFFF" }}>
        184 PROMPTS · 18 COMPANIES
      </div>
    </div>
  </div>
);
