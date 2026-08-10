import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing, Sequence } from "remotion";
import { inter, fraunces } from "./fonts";
import { loadFont as loadMono } from "@remotion/google-fonts/JetBrainsMono";

const mono = loadMono("normal", { weights: ["400", "500", "700"] });
const MONO = mono.fontFamily;
const UI = inter.fontFamily;

// terminal theme (One Dark-ish)
const T = {
  bg: "#1B1D26", bar: "#2A2D3A", text: "#E6E6EA", dim: "#7C8290", green: "#98C379",
  cyan: "#56B6C2", blue: "#61AFEF", red: "#E06C75", purple: "#C678DD", yellow: "#E5C07B",
};
const SPIN = "⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏";
const TYPE = 2.6; // frames per typed char

type Row =
  | { k: "cmd"; cmd: string; final?: boolean }
  | { k: "res"; spin: string; done: string }
  | { k: "out"; t: string; c: string }
  | { k: "ok"; t: string }
  | { k: "dim"; t: string }
  | { k: "blank" };

const ROWS: Row[] = [
  { k: "cmd", cmd: "npm i -g @google/gemini-cli" },
  { k: "res", spin: "reify: @google/gemini-cli", done: "added 47 packages in 5.8s" },
  { k: "dim", t: "3 packages are looking for funding — run `npm fund`" },
  { k: "blank" },
  { k: "cmd", cmd: "gemini --version" },
  { k: "dim", t: "gemini-cli/1.4.2  darwin-arm64  node-v20.11.0" },
  { k: "blank" },
  { k: "cmd", cmd: "gemini auth login" },
  { k: "out", t: "✔ Opening aistudio.google.com/apikey in your browser…", c: T.cyan },
  { k: "out", t: "✔ Paste your API key: AIza••••••••••••••••••••••••", c: T.dim },
  { k: "ok", t: "✓ Authenticated · connected to gemini-3.6-pro" },
  { k: "cmd", cmd: "", final: true },
];

// precompute the start/end frame of each row
const timed = (() => {
  let cf = 14; const out: (Row & { start: number; end: number })[] = [];
  for (const r of ROWS) {
    let span = 7;
    if (r.k === "cmd") span = r.final ? 8 : r.cmd.length * TYPE + 12;
    else if (r.k === "res") span = 44;
    const start = Math.round(cf); cf += span;
    out.push({ ...r, start, end: Math.round(cf) });
  }
  return out;
})();
export const SCREENREC_END = timed[timed.length - 1].end;

const Prompt: React.FC = () => (
  <span style={{ whiteSpace: "pre" }}>
    <span style={{ color: T.green, fontWeight: 700 }}>➜</span>
    <span>{"  "}</span>
    <span style={{ color: T.cyan, fontWeight: 500 }}>my-app</span>
    <span>{" "}</span>
    <span style={{ color: T.blue }}>git:(</span>
    <span style={{ color: T.red }}>main</span>
    <span style={{ color: T.blue }}>)</span>
    <span>{" "}</span>
  </span>
);
const Cursor: React.FC<{ f: number; solid?: boolean }> = ({ f, solid }) => (
  <span style={{ display: "inline-block", width: "0.62em", height: "1.05em", verticalAlign: "-0.18em", marginLeft: 1, background: (solid || (f % 16) < 9) ? "#D7DAE0" : "transparent" }} />
);
const Line: React.FC<{ row: Row & { start: number; end: number }; f: number }> = ({ row, f }) => {
  const base: React.CSSProperties = { fontFamily: MONO, fontSize: 29, lineHeight: 1.5, whiteSpace: "pre-wrap", wordBreak: "break-word" };
  if (row.k === "blank") return <div style={{ ...base, height: 22 }} />;
  if (row.k === "cmd") {
    const n = Math.max(0, Math.floor((f - row.start) / TYPE));
    const shown = row.cmd.slice(0, Math.min(row.cmd.length, n));
    const typing = f - row.start < row.cmd.length * TYPE;
    return <div style={base}><Prompt /><span style={{ color: T.text }}>{shown}</span>{(typing || row.final) && <Cursor f={f} solid={typing} />}</div>;
  }
  if (row.k === "res") {
    const spinning = f - row.start < 30;
    if (spinning) { const s = SPIN[Math.floor((f - row.start)) % SPIN.length]; return <div style={{ ...base, color: T.yellow }}>{s} <span style={{ color: T.dim }}>{row.spin}</span></div>; }
    return <div style={{ ...base, color: T.green }}>{row.done}</div>;
  }
  if (row.k === "ok") return <div style={{ ...base, color: T.green, fontWeight: 700 }}>{row.t}</div>;
  if (row.k === "dim") return <div style={{ ...base, color: T.dim }}>{row.t}</div>;
  return <div style={{ ...base, color: (row as any).c }}>{(row as any).t}</div>;
};

// the realistic terminal window
export const RealTerminal: React.FC<{ w?: number; h?: number }> = ({ w = 1240, h = 700 }) => {
  const f = useCurrentFrame();
  return (
    <div style={{ width: w, height: h, borderRadius: 13, overflow: "hidden", background: T.bg, boxShadow: "0 40px 90px -20px rgba(0,0,0,0.6), 0 8px 24px rgba(0,0,0,0.4)", border: "0.5px solid rgba(255,255,255,0.12)" }}>
      {/* title bar */}
      <div style={{ height: 44, background: "linear-gradient(180deg,#33363F,#2A2D36)", display: "flex", alignItems: "center", padding: "0 16px", position: "relative", borderBottom: "0.5px solid rgba(0,0,0,0.4)" }}>
        {[["#FF5F57", "#E0443E"], ["#FEBC2E", "#DDA123"], ["#28C840", "#1DA92E"]].map(([c, b], i) => (
          <div key={i} style={{ width: 15, height: 15, borderRadius: "50%", background: c, border: `0.5px solid ${b}`, marginRight: 9 }} />
        ))}
        <div style={{ position: "absolute", left: 0, right: 0, textAlign: "center", fontFamily: UI, fontSize: 18, fontWeight: 600, color: "#B9BEC9", pointerEvents: "none" }}>my-app — gemini-cli — zsh — 120×32</div>
      </div>
      {/* body */}
      <div style={{ padding: "20px 26px", height: h - 44, overflow: "hidden" }}>
        {timed.map((r, i) => f >= r.start && <Line key={i} row={r} f={f} />)}
      </div>
    </div>
  );
};

// realistic dock with actual app icons
const AppIcon: React.FC<{ type: string }> = ({ type }) => {
  const tile = (bg: string, child: React.ReactNode) => <div style={{ width: 56, height: 56, borderRadius: 13, background: bg, boxShadow: "0 4px 10px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.25)", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>{child}</div>;
  switch (type) {
    case "finder": return tile("linear-gradient(180deg,#3AA9FF,#1E78E6)", <><div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "50%", background: "#DCEEFF" }} /><svg width={44} height={44} viewBox="0 0 44 44" style={{ position: "relative" }}><rect x="13" y="13" width="3.4" height="8" rx="1.7" fill="#2A2A3A" /><rect x="27" y="13" width="3.4" height="8" rx="1.7" fill="#2A2A3A" /><path d="M15 29 Q22 33 29 29" stroke="#2A2A3A" strokeWidth="2.6" fill="none" strokeLinecap="round" /></svg></>);
    case "safari": return tile("linear-gradient(180deg,#EAF2FC,#C4DAF0)", <svg width={50} height={50} viewBox="0 0 50 50"><circle cx="25" cy="25" r="21" fill="#1FA3F0" /><circle cx="25" cy="25" r="21" fill="none" stroke="#fff" strokeWidth="2" /><polygon points="25,25 36,14 27,27" fill="#F0463C" /><polygon points="25,25 14,36 23,23" fill="#fff" /></svg>);
    case "messages": return tile("linear-gradient(180deg,#4BE05A,#22B637)", <div style={{ width: 34, height: 28, borderRadius: "15px 15px 15px 5px", background: "#fff" }} />);
    case "mail": return tile("linear-gradient(180deg,#57ADFF,#1E7BE6)", <svg width={42} height={30} viewBox="0 0 42 30"><rect x="3" y="3" width="36" height="24" rx="5" fill="#fff" /><path d="M5 7 L21 19 L37 7" stroke="#5AA0E0" strokeWidth="2.6" fill="none" /></svg>);
    case "notes": return tile("linear-gradient(180deg,#FCEFA6,#F2D65E)", <><div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 15, background: "#FDF6C8" }} /><svg width={42} height={42} viewBox="0 0 42 42" style={{ position: "relative" }}>{[22, 28, 34].map((y, i) => <rect key={i} x="10" y={y} width="22" height="2.6" rx="1.3" fill="#C9A83A" />)}</svg></>);
    case "calendar": return tile("#fff", <><div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 15, background: "#F0463C" }} /><div style={{ position: "absolute", inset: "15px 0 0 0", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: UI, fontWeight: 700, fontSize: 28, color: "#333" }}>17</div></>);
    case "music": return tile("linear-gradient(180deg,#FB5C74,#E23350)", <svg width={40} height={40} viewBox="0 0 40 40"><path d="M27 9 L27 26 A5 4.4 0 1 1 24 22 L24 16 L16 18 L16 29 A5 4.4 0 1 1 13 25 L13 13 Z" fill="#fff" /></svg>);
    case "terminal": return tile("linear-gradient(180deg,#2A2D38,#14151C)", <svg width={42} height={42} viewBox="0 0 42 42"><path d="M12 15 L19 21 L12 27" stroke="#6BE06B" strokeWidth="2.8" fill="none" strokeLinecap="round" strokeLinejoin="round" /><rect x="21" y="25" width="10" height="2.8" rx="1.4" fill="#fff" /></svg>);
    case "code": return tile("linear-gradient(180deg,#2C8FE0,#1466B0)", <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 23, color: "#fff" }}>{"</>"}</span>);
    case "claude": return tile("linear-gradient(180deg,#E58A6A,#C5603C)", <svg width={40} height={40} viewBox="-20 -20 40 40">{Array.from({ length: 12 }, (_, i) => { const len = i % 2 ? 12 : 15; const tip = i % 2 ? 1.4 : 1.7; return <path key={i} d={`M -1 -2.4 L 1 -2.4 L ${tip} ${-len} L ${-tip} ${-len} Z`} fill="#fff" transform={`rotate(${i * 30})`} />; })}<circle r="3.1" fill="#fff" /></svg>);
    case "settings": return tile("linear-gradient(180deg,#9096A0,#5A606A)", <svg width={42} height={42} viewBox="0 0 42 42"><g fill="#EDEFF2">{Array.from({ length: 8 }).map((_, i) => <rect key={i} x="18.5" y="3" width="5" height="9" transform={`rotate(${i * 45} 21 21)`} />)}<circle cx="21" cy="21" r="12" /></g><circle cx="21" cy="21" r="5.5" fill="#5A606A" /></svg>);
    default: return tile("#888", null);
  }
};
const Dock: React.FC = () => (
  <div style={{ position: "absolute", left: "50%", bottom: 14, transform: "translateX(-50%)", height: 76, borderRadius: 22, background: "rgba(255,255,255,0.18)", backdropFilter: "blur(24px)", border: "0.5px solid rgba(255,255,255,0.3)", display: "flex", alignItems: "center", gap: 13, padding: "0 18px", boxShadow: "0 10px 30px rgba(0,0,0,0.35)" }}>
    {["finder", "safari", "messages", "mail", "notes", "calendar", "music", "terminal", "code", "claude", "settings"].map((t) => <AppIcon key={t} type={t} />)}
  </div>
);

// a macOS desktop backdrop + menu bar + dock (so it reads as a real screen capture)
const MenuIcon: React.FC<{ d: string }> = ({ d }) => (
  <svg width={22} height={22} viewBox="0 0 24 24" style={{ opacity: 0.92 }}><path d={d} fill="#fff" /></svg>
);
const DesktopBg: React.FC = () => (
  <AbsoluteFill>
    <AbsoluteFill style={{ background: "linear-gradient(150deg,#3A2E6E 0%,#5B3E86 34%,#8E4E7E 64%,#C06A5A 100%)" }} />
    <div style={{ position: "absolute", left: "18%", top: "12%", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle,rgba(255,180,120,0.35),transparent 62%)", filter: "blur(30px)" }} />
    <div style={{ position: "absolute", right: "8%", bottom: "6%", width: 800, height: 800, borderRadius: "50%", background: "radial-gradient(circle,rgba(90,70,180,0.4),transparent 62%)", filter: "blur(40px)" }} />
    {/* menu bar */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 34, background: "rgba(20,18,30,0.5)", backdropFilter: "blur(20px)", display: "flex", alignItems: "center", padding: "0 16px", fontFamily: UI, fontSize: 16, color: "#fff" }}>
      <svg width={18} height={20} viewBox="0 0 16 18" style={{ marginRight: 18 }}><path d="M11.2 9.5c0-1.7 1.4-2.5 1.5-2.6-0.8-1.2-2.1-1.3-2.5-1.4-1.1-0.1-2.1 0.6-2.6 0.6-0.5 0-1.4-0.6-2.3-0.6-1.2 0-2.3 0.7-2.9 1.8-1.2 2.1-0.3 5.3 0.9 7 0.6 0.8 1.3 1.8 2.2 1.8 0.9 0 1.2-0.6 2.3-0.6 1.1 0 1.3 0.6 2.3 0.6 0.9 0 1.5-0.8 2.1-1.7 0.7-1 0.9-1.9 0.9-2-0.1 0-1.7-0.7-1.7-2.7zM9.6 4.3c0.5-0.6 0.8-1.4 0.7-2.3-0.7 0-1.5 0.5-2 1.1-0.4 0.5-0.8 1.4-0.7 2.2 0.8 0.1 1.5-0.4 2-1z" fill="#fff" /></svg>
      {["Terminal", "Shell", "Edit", "View", "Window", "Help"].map((m, i) => <span key={i} style={{ marginRight: 20, fontWeight: i === 0 ? 700 : 400, opacity: i === 0 ? 1 : 0.9 }}>{m}</span>)}
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 16 }}>
        <MenuIcon d="M12 3a9 9 0 100 18 9 9 0 000-18zm0 2a7 7 0 110 14V5z" />
        <svg width={26} height={16} viewBox="0 0 26 16"><rect x="1" y="3" width="20" height="10" rx="3" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.9" /><rect x="3" y="5" width="15" height="6" rx="1.5" fill="#fff" /><rect x="22" y="6" width="2.5" height="4" rx="1" fill="#fff" opacity="0.9" /></svg>
        <MenuIcon d="M12 18a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0-14C7 4 3 6 1 9l2 2c1.6-2.3 5-3.9 9-3.9s7.4 1.6 9 3.9l2-2c-2-3-6-5-11-5z" />
        <span style={{ fontWeight: 500 }}>Mon 9:41 AM</span>
      </div>
    </div>
    <Dock />
  </AbsoluteFill>
);

// the standalone "what your screen recording looks like" comp (16:9)
export const RouteScreenRec: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <DesktopBg />
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <RealTerminal w={1300} h={720} />
    </AbsoluteFill>
  </AbsoluteFill>
);

// ============================== THE CLAUDE APP (GUI, full-screen vertical) ==============================
const CO = "#C96442";       // Claude clay/orange
const APP_BG = "#FAF9F5", APP_INK = "#2B2824", APP_DIM = "#8C877D", APP_LINE = "#EAE6DC";
const ClaudeSpark: React.FC<{ s: number; c?: string }> = ({ s, c = CO }) => (
  <svg width={s} height={s} viewBox="-20 -20 40 40" style={{ display: "block" }}>
    {Array.from({ length: 12 }, (_, i) => { const len = i % 2 ? 12 : 15.5; const tip = i % 2 ? 1.5 : 1.9; return <path key={i} d={`M -1.1 -2.6 L 1.1 -2.6 L ${tip} ${-len} L ${-tip} ${-len} Z`} fill={c} transform={`rotate(${i * 30})`} />; })}
    <circle r="3.2" fill={c} />
  </svg>
);
const AppStatusBar: React.FC = () => (
  <div style={{ height: 54, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px 0 44px", fontFamily: inter.fontFamily }}>
    <span style={{ fontSize: 30, fontWeight: 700, color: APP_INK }}>9:41</span>
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <svg width={34} height={22} viewBox="0 0 34 22">{[0, 1, 2, 3].map((i) => <rect key={i} x={i * 8} y={16 - i * 5} width={5.5} height={6 + i * 5} rx={1.5} fill={APP_INK} />)}</svg>
      <svg width={30} height={22} viewBox="0 0 30 22"><path d="M15 20 C6 12 2 9 2 9 A18 18 0 0 1 28 9 S24 12 15 20Z" fill="none" stroke={APP_INK} strokeWidth="2" opacity="0.35" /><path d="M15 20 C9 14 6 11 6 11 A11 11 0 0 1 24 11 S21 14 15 20Z" fill={APP_INK} /></svg>
      <svg width={44} height={22} viewBox="0 0 44 22"><rect x="1" y="4" width="36" height="14" rx="4" fill="none" stroke={APP_INK} strokeWidth="2" opacity="0.4" /><rect x="3.5" y="6.5" width="29" height="9" rx="2" fill={APP_INK} /><rect x="39" y="8" width="3" height="6" rx="1.5" fill={APP_INK} opacity="0.5" /></svg>
    </div>
  </div>
);
const AppHeader: React.FC = () => (
  <div style={{ height: 78, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 30px", borderBottom: `1px solid ${APP_LINE}` }}>
    <svg width={30} height={30} viewBox="0 0 24 24"><path d="M3 6h18M3 12h18M3 18h18" stroke={APP_INK} strokeWidth="2.2" strokeLinecap="round" /></svg>
    <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
      <ClaudeSpark s={26} />
      <span style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 32, color: APP_INK }}>Claude</span>
      <span style={{ fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 22, color: APP_DIM, background: "#F0ECE3", padding: "3px 12px", borderRadius: 999 }}>Opus 4.8</span>
    </div>
    <svg width={30} height={30} viewBox="0 0 24 24"><path d="M4 20l4-1L19 8a2 2 0 0 0-3-3L5 16l-1 4z" fill="none" stroke={APP_INK} strokeWidth="2" strokeLinejoin="round" /></svg>
  </div>
);

// Claude's streaming answer
const RESP = [
  { type: "p", text: "On it, here's your setup:" },
  { type: "chk", text: "Installed the Gemini plugin for Claude Code" },
  { type: "chk", text: "Connected me to Gemini 3.6" },
  { type: "chk", text: "Created your /route skill" },
  { type: "p", text: "Now just type /route and I'll plan it out, then hand each piece to Gemini to build and review it, so you ship way more using far fewer tokens." },
];
const RESP_START = 66;   // frame Claude starts answering
const CPF = 1.7;         // chars per frame (stream speed)

export const RouteAppRec: React.FC = () => {
  const f = useCurrentFrame();
  const userIn = Math.min(1, Math.max(0, (f - 12) / 10));                 // user bubble slide-in
  const thinking = f >= 40 && f < RESP_START;
  let budget = Math.max(0, Math.floor((f - RESP_START) * CPF));
  return (
    <AbsoluteFill style={{ background: APP_BG }}>
      <AppStatusBar />
      <AppHeader />
      {/* chat scroll area */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 132, bottom: 150, padding: "26px 34px", overflow: "hidden" }}>
        {/* user message */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 30, opacity: userIn, transform: `translateY(${(1 - userIn) * 24}px)` }}>
          <div style={{ maxWidth: 720, background: "#EFEAE0", border: `1px solid ${APP_LINE}`, borderRadius: "22px 22px 6px 22px", padding: "20px 26px", fontFamily: inter.fontFamily, fontSize: 33, lineHeight: 1.5, color: APP_INK }}>
            Set up <span style={{ fontFamily: MONO, background: "#E3DCCF", padding: "1px 8px", borderRadius: 6, fontSize: 29 }}>/route</span> so you're the boss and Gemini 3.6 does the building — I want to save my Claude usage limits.
          </div>
        </div>
        {/* claude message */}
        {f >= 40 && (
          <div style={{ display: "flex", gap: 18 }}>
            <div style={{ marginTop: 4, flexShrink: 0 }}><ClaudeSpark s={40} /></div>
            <div style={{ flex: 1 }}>
              {thinking && <div style={{ display: "flex", gap: 9, paddingTop: 14 }}>{[0, 1, 2].map((i) => <div key={i} style={{ width: 15, height: 15, borderRadius: "50%", background: APP_DIM, opacity: 0.35 + 0.65 * Math.abs(Math.sin((f - 40) / 6 + i * 0.7)) }} />)}</div>}
              {!thinking && RESP.map((b, i) => {
                const start = budget; const shown = b.text.slice(0, Math.max(0, budget)); budget -= b.text.length;
                if (start <= 0) return null;
                if (b.type === "chk") return (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14, margin: "14px 0" }}>
                    <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#E8F3EC", border: `2px solid #3F9E74`, display: "flex", alignItems: "center", justifyContent: "center", color: "#3F9E74", fontWeight: 900, fontSize: 20, flexShrink: 0, marginTop: 4 }}>✓</div>
                    <span style={{ fontFamily: fraunces.fontFamily, fontSize: 34, lineHeight: 1.4, color: APP_INK }}>{shown}</span>
                  </div>);
                return <p key={i} style={{ fontFamily: fraunces.fontFamily, fontSize: 35, lineHeight: 1.55, color: APP_INK, margin: "16px 0" }}>{shown.split("/route").map((seg, k, arr) => <React.Fragment key={k}>{seg}{k < arr.length - 1 && <span style={{ fontFamily: MONO, background: "#F1E9DC", color: CO, padding: "1px 8px", borderRadius: 6, fontSize: 30 }}>/route</span>}</React.Fragment>)}</p>;
              })}
            </div>
          </div>
        )}
      </div>
      {/* input bar */}
      <div style={{ position: "absolute", left: 26, right: 26, bottom: 30, height: 96, background: "#fff", border: `1.5px solid ${APP_LINE}`, borderRadius: 28, display: "flex", alignItems: "center", padding: "0 14px 0 28px", boxShadow: "0 6px 20px rgba(0,0,0,0.05)" }}>
        <span style={{ fontFamily: inter.fontFamily, fontSize: 31, color: APP_DIM, flex: 1 }}>Reply to Claude…</span>
        <div style={{ width: 66, height: 66, borderRadius: "50%", background: CO, display: "flex", alignItems: "center", justifyContent: "center" }}><svg width={32} height={32} viewBox="0 0 24 24"><path d="M12 20V5M6 11l6-6 6 6" stroke="#fff" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
      </div>
      {/* home indicator */}
      <div style={{ position: "absolute", left: "50%", bottom: 10, transform: "translateX(-50%)", width: 180, height: 6, borderRadius: 3, background: "#00000030" }} />
    </AbsoluteFill>
  );
};

// ============================== THE CLAUDE DESKTOP APP (landscape, to drop into the reel) ==============================
const LONG_PROMPT = "You are now my orchestrator. From now on, whenever I run /route you act as the BOSS and Gemini 3.6 is the executor. First, interview me with 2–3 quick questions to scope the task. Then break it into a clear, ordered plan of small, tightly-specified pieces. For each piece: write Gemini a precise spec — inputs, outputs, constraints, and the exact files to touch — hand it off, let Gemini build it, then YOU review the result against the spec, send back concrete fixes, and only accept work that fully passes. After every loop, give me a one-line status. Do all the planning and reviewing yourself, but push the heavy building to Gemini so we spend the fewest Claude tokens possible. Save this whole workflow as a reusable /route skill. Rules: (1) never accept unreviewed code, (2) keep a running task list, (3) prefer small diffs, (4) ";
const RoutePill: React.FC<{ text: string; size?: number }> = ({ text, size = 28 }) => (
  <>{text.split("/route").map((seg, k, arr) => <React.Fragment key={k}>{seg}{k < arr.length - 1 && <span style={{ fontFamily: MONO, background: "#F1E9DC", color: CO, padding: "1px 8px", borderRadius: 6, fontSize: size }}>/route</span>}</React.Fragment>)}</>
);
export const RouteAppRecDesktop: React.FC = () => {
  const f = useCurrentFrame();
  const userIn = Math.min(1, Math.max(0, (f - 12) / 10));
  const thinking = f >= 40 && f < RESP_START;
  let budget = Math.max(0, Math.floor((f - RESP_START) * CPF));
  const chats = [["Route setup", true], ["Landing page redesign", false], ["Fix the auth bug", false], ["SQL: monthly revenue", false], ["Rename variables sweep", false]] as [string, boolean][];
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <AbsoluteFill style={{ background: APP_BG }}>
        <div style={{ height: 52, background: "#EDE9DF", display: "flex", alignItems: "center", padding: "0 20px", borderBottom: `1px solid ${APP_LINE}` }}>
          {[["#FF5F57", "#E0443E"], ["#FEBC2E", "#DDA123"], ["#28C840", "#1DA92E"]].map(([c, b], i) => <div key={i} style={{ width: 15, height: 15, borderRadius: "50%", background: c, border: `0.5px solid ${b}`, marginRight: 9 }} />)}
        </div>
        <div style={{ position: "absolute", top: 52, left: 0, bottom: 0, right: 0, display: "flex" }}>
          {/* sidebar */}
          <div style={{ width: 360, background: "#F1ECE1", borderRight: `1px solid ${APP_LINE}`, display: "flex", flexDirection: "column", padding: "22px 18px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 11, padding: "0 8px 20px" }}><ClaudeSpark s={26} /><span style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 30, color: APP_INK }}>Claude</span></div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 16px", borderRadius: 14, border: `1px solid ${APP_LINE}`, background: "#fff", marginBottom: 22 }}><span style={{ fontSize: 28, color: CO, fontWeight: 700 }}>+</span><span style={{ fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 24, color: APP_INK }}>New chat</span></div>
            <div style={{ fontFamily: inter.fontFamily, fontSize: 20, fontWeight: 600, color: APP_DIM, padding: "0 8px 10px", letterSpacing: 0.4 }}>Recents</div>
            {chats.map(([t, active], i) => <div key={i} style={{ padding: "12px 16px", borderRadius: 12, background: active ? "#E4DCCC" : "transparent", fontFamily: inter.fontFamily, fontSize: 23, color: active ? APP_INK : "#6E6A60", fontWeight: active ? 600 : 400, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginBottom: 3 }}>{t}</div>)}
            <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 12, padding: "10px 8px" }}><div style={{ width: 40, height: 40, borderRadius: "50%", background: CO, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 20 }}>A</div><span style={{ fontFamily: inter.fontFamily, fontSize: 23, color: APP_INK, fontWeight: 500 }}>Alex</span></div>
          </div>
          {/* main chat */}
          <div style={{ flex: 1, position: "relative" }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 132, padding: "34px 60px", overflow: "hidden" }}>
              <div style={{ maxWidth: 1000, margin: "0 auto" }}>
                {/* the long, deliberately-hidden prompt */}
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 30, opacity: userIn, transform: `translateY(${(1 - userIn) * 20}px)` }}>
                  <div style={{ maxWidth: 860, background: "#EFEAE0", border: `1px solid ${APP_LINE}`, borderRadius: "20px 20px 6px 20px", padding: "18px 24px 6px", maxHeight: 300, overflow: "hidden", position: "relative" }}>
                    <div style={{ fontFamily: inter.fontFamily, fontSize: 27, lineHeight: 1.5, color: APP_INK }}><RoutePill text={LONG_PROMPT} size={24} /></div>
                    <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 74, display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 12, background: "linear-gradient(to bottom, rgba(239,234,224,0), #EFEAE0 60%)" }}>
                      <span style={{ fontFamily: inter.fontFamily, fontSize: 24, fontWeight: 600, color: "#8A8377", display: "flex", alignItems: "center", gap: 6 }}>Show more <span style={{ fontSize: 19 }}>⌄</span></span>
                    </div>
                  </div>
                </div>
                {f >= 40 && (
                  <div style={{ display: "flex", gap: 18 }}>
                    <div style={{ marginTop: 4, flexShrink: 0 }}><ClaudeSpark s={38} /></div>
                    <div style={{ flex: 1 }}>
                      {thinking && <div style={{ display: "flex", gap: 9, paddingTop: 14 }}>{[0, 1, 2].map((i) => <div key={i} style={{ width: 14, height: 14, borderRadius: "50%", background: APP_DIM, opacity: 0.35 + 0.65 * Math.abs(Math.sin((f - 40) / 6 + i * 0.7)) }} />)}</div>}
                      {!thinking && RESP.map((b, i) => {
                        const start = budget; const shown = b.text.slice(0, Math.max(0, budget)); budget -= b.text.length;
                        if (start <= 0) return null;
                        if (b.type === "chk") return (
                          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14, margin: "13px 0" }}>
                            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#E8F3EC", border: `2px solid #3F9E74`, display: "flex", alignItems: "center", justifyContent: "center", color: "#3F9E74", fontWeight: 900, fontSize: 19, flexShrink: 0, marginTop: 3 }}>✓</div>
                            <span style={{ fontFamily: fraunces.fontFamily, fontSize: 32, lineHeight: 1.4, color: APP_INK }}>{shown}</span>
                          </div>);
                        return <p key={i} style={{ fontFamily: fraunces.fontFamily, fontSize: 33, lineHeight: 1.55, color: APP_INK, margin: "16px 0" }}><RoutePill text={shown} /></p>;
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* input box */}
            <div style={{ position: "absolute", left: 60, right: 60, bottom: 30, maxWidth: 1000, margin: "0 auto", background: "#fff", border: `1.5px solid ${APP_LINE}`, borderRadius: 20, padding: "18px 22px", boxShadow: "0 6px 20px rgba(0,0,0,0.05)" }}>
              <div style={{ fontFamily: inter.fontFamily, fontSize: 28, color: APP_DIM, marginBottom: 14 }}>Reply to Claude…</div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ fontFamily: inter.fontFamily, fontSize: 22, color: APP_DIM, fontWeight: 600, background: "#F0ECE3", padding: "6px 14px", borderRadius: 999 }}>Claude Opus 4.8 ⌄</span>
                <div style={{ marginLeft: "auto", width: 52, height: 52, borderRadius: "50%", background: CO, display: "flex", alignItems: "center", justifyContent: "center" }}><svg width={26} height={26} viewBox="0 0 24 24"><path d="M12 20V5M6 11l6-6 6 6" stroke="#fff" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
              </div>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ============================== BROWSER: get the free Google AI key ==============================
const Cursor2: React.FC<{ x: number; y: number; press?: boolean }> = ({ x, y, press }) => (
  <>
    {press && <div style={{ position: "absolute", left: x - 12, top: y - 6, width: 46, height: 46, borderRadius: "50%", border: "5px solid #FF6A2C", opacity: 0.55, transform: "translate(-50%,-50%) scale(1.15)", zIndex: 59 }} />}
    <svg width={58} height={58} viewBox="0 0 24 24" style={{ position: "absolute", left: x, top: y, zIndex: 60, filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.55))", transform: press ? "scale(0.82)" : "scale(1)" }}><path d="M4 2l6.5 17 2.3-6.6L20 10.2 4 2z" fill="#FF6A2C" stroke="#fff" strokeWidth="1.7" strokeLinejoin="round" /></svg>
  </>
);
const GDot = ({ c }: { c: string }) => <div style={{ width: 13, height: 13, borderRadius: "50%", background: c }} />;
// Gemini brand spark (gradient 4-point star)
const GeminiSpark: React.FC<{ s: number }> = ({ s }) => (
  <svg width={s} height={s} viewBox="0 0 24 24"><defs><linearGradient id="gsp" x1="1" y1="4" x2="23" y2="20" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#4989F5" /><stop offset="0.38" stopColor="#9334EA" /><stop offset="0.72" stopColor="#E0447F" /><stop offset="1" stopColor="#F9A94B" /></linearGradient></defs><path d="M12 1.5c.45 5.2 4.8 9.55 10 10-5.2.45-9.55 4.8-10 10-.45-5.2-4.8-9.55-10-10 5.2-.45 9.55-4.8 10-10z" fill="url(#gsp)" /></svg>
);
const TrafficDots: React.FC = () => (<>{["#FF5F57", "#FEBC2E", "#28C840"].map((c, i) => <div key={i} style={{ width: 15, height: 15, borderRadius: "50%", background: c, marginRight: 9 }} />)}</>);
const AppSidebar: React.FC<{ active: string }> = ({ active }) => (
  <div style={{ width: 360, background: "#F1ECE1", borderRight: `1px solid ${APP_LINE}`, padding: "22px 18px", display: "flex", flexDirection: "column" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 11, padding: "0 8px 20px" }}><ClaudeSpark s={26} /><span style={{ fontFamily: UI, fontWeight: 700, fontSize: 30, color: APP_INK }}>Claude</span></div>
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 16px", borderRadius: 14, border: `1px solid ${APP_LINE}`, background: "#fff", marginBottom: 18 }}><span style={{ fontSize: 28, color: CO, fontWeight: 700 }}>+</span><span style={{ fontFamily: UI, fontWeight: 600, fontSize: 24, color: APP_INK }}>New chat</span></div>
    {[["💬", "Chats"], ["🧩", "Plugins"], ["⚙️", "Settings"]].map(([ic, t], i) => (
      <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 12, background: active === t ? "#E4DCCC" : "transparent", marginBottom: 4 }}>
        <span style={{ fontSize: 22 }}>{ic}</span><span style={{ fontFamily: UI, fontSize: 24, color: active === t ? APP_INK : "#6E6A60", fontWeight: active === t ? 600 : 400 }}>{t}</span>
      </div>))}
  </div>
);
const BrowserChrome: React.FC<{ url: string; tab?: string; fav?: React.ReactNode; children: React.ReactNode }> = ({ url, tab = "Google AI Studio", fav = <GDot c="#4285F4" />, children }) => (
  <AbsoluteFill style={{ background: "#fff" }}>
    <div style={{ height: 58, background: "#DEE1E6", display: "flex", alignItems: "flex-end", paddingLeft: 14 }}>
      <div style={{ display: "flex", gap: 9, alignItems: "center", height: 58, marginRight: 16 }}>{["#FF5F57", "#FEBC2E", "#28C840"].map((c, i) => <div key={i} style={{ width: 15, height: 15, borderRadius: "50%", background: c }} />)}</div>
      <div style={{ height: 46, background: "#fff", borderRadius: "12px 12px 0 0", padding: "0 22px", display: "flex", alignItems: "center", gap: 11, minWidth: 360 }}>
        <div style={{ display: "flex", alignItems: "center" }}>{fav}</div>
        <span style={{ fontFamily: UI, fontSize: 22, color: "#3C4043" }}>{tab}</span>
        <span style={{ marginLeft: "auto", color: "#5F6368", fontSize: 22 }}>×</span>
      </div>
    </div>
    <div style={{ height: 58, background: "#fff", borderBottom: "1px solid #E4E4E4", display: "flex", alignItems: "center", padding: "0 18px", gap: 16 }}>
      <div style={{ display: "flex", gap: 20, color: "#5F6368", fontSize: 26 }}><span>←</span><span>→</span><span>⟳</span></div>
      <div style={{ flex: 1, height: 42, background: "#F1F3F4", borderRadius: 999, display: "flex", alignItems: "center", padding: "0 20px", gap: 12 }}>
        <span style={{ fontSize: 17, color: "#5F6368" }}>🔒</span><span style={{ fontFamily: UI, fontSize: 22, color: "#3C4043" }}>{url}</span>
      </div>
      <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#5F6368", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: UI, fontWeight: 700, fontSize: 20 }}>A</div>
    </div>
    <div style={{ position: "absolute", top: 116, left: 0, right: 0, bottom: 0 }}>{children}</div>
  </AbsoluteFill>
);
export const AiStudioKey: React.FC = () => {
  const f = useCurrentFrame();
  const toCreate = Math.min(1, Math.max(0, (f - 4) / 16));
  const clickCreate = f >= 22 && f < 29;
  const created = f >= 28;
  const keyShown = f >= 38;
  const toCopy = Math.min(1, Math.max(0, (f - 48) / 14));
  const copyHover = f >= 60 && f < 67;
  const copied = f >= 66;
  const createBtn = { x: 195, y: 200 }, copyBtn = { x: 900, y: 452 }, start = { x: 1050, y: 680 };
  const cx = f < 44 ? start.x + (createBtn.x - start.x) * toCreate : createBtn.x + (copyBtn.x - createBtn.x) * toCopy;
  const cy = f < 44 ? start.y + (createBtn.y - start.y) * toCreate : createBtn.y + (copyBtn.y - createBtn.y) * toCopy;
  const nav = (ic: string, t: string, on?: boolean) => (
    <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 16px", borderRadius: 12, background: on ? "#E8F0FE" : "transparent", marginBottom: 3 }}><span style={{ fontSize: 22 }}>{ic}</span><span style={{ fontFamily: UI, fontSize: 24, color: on ? "#1A73E8" : "#3C4043", fontWeight: on ? 700 : 500 }}>{t}</span></div>
  );
  return (
    <BrowserChrome url="aistudio.google.com/apikey" tab="Google AI Studio" fav={<GeminiSpark s={18} />}>
      <AbsoluteFill style={{ background: "#fff", display: "flex", flexDirection: "row" }}>
        <div style={{ width: 320, borderRight: "1px solid #E8EAED", padding: "26px 14px", background: "#fff" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "0 12px 24px" }}><GeminiSpark s={30} /><span style={{ fontFamily: UI, fontWeight: 600, fontSize: 25, color: "#3C4043" }}>Google AI Studio</span></div>
          {nav("＋", "New prompt")}{nav("💬", "Chat")}{nav("🎬", "Stream")}{nav("🎨", "Generate media")}
          <div style={{ height: 1, background: "#E8EAED", margin: "14px 12px" }} />
          {nav("🔑", "Get API key", true)}{nav("📊", "Dashboard")}{nav("📄", "Documentation")}
        </div>
        <div style={{ flex: 1, padding: "42px 56px", position: "relative" }}>
          <div style={{ fontFamily: UI, fontWeight: 500, fontSize: 46, color: "#202124", marginBottom: 10 }}>API keys</div>
          <div style={{ fontFamily: UI, fontSize: 26, color: "#5F6368", marginBottom: 32 }}>Use the Gemini API in your own apps. Free to get started.</div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 12, background: clickCreate ? "#1B66C9" : "#1A73E8", color: "#fff", padding: "16px 30px", borderRadius: 999, fontFamily: UI, fontWeight: 600, fontSize: 28, transform: clickCreate ? "scale(0.97)" : "scale(1)", boxShadow: "0 2px 10px rgba(26,115,232,0.35)" }}>＋ Create API key</div>
          {created && <div style={{ marginTop: 38, maxWidth: 1000, border: "1px solid #E4E4E4", borderRadius: 18, padding: 32, boxShadow: "0 12px 36px rgba(0,0,0,0.14)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}><GeminiSpark s={26} /><div style={{ fontFamily: UI, fontWeight: 600, fontSize: 32, color: "#202124" }}>API key generated</div></div>
            <div style={{ fontFamily: UI, fontSize: 24, color: "#5F6368", marginBottom: 22 }}>Copy your key, then connect it to Gemini next.</div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, background: "#F1F3F4", borderRadius: 14, padding: "18px 22px" }}>
              <span style={{ fontFamily: MONO, fontSize: 27, color: "#202124", flex: 1, letterSpacing: 1 }}>{keyShown ? "AIzaSyD9x2Hq•••••••••••••••••••" : "generating…"}</span>
              <div style={{ background: copied ? "#E6F4EA" : (copyHover ? "#E8F0FE" : "#fff"), border: `1px solid ${copied ? "#B7DFC0" : "#DADCE0"}`, borderRadius: 12, padding: "12px 22px", fontFamily: UI, fontWeight: 600, fontSize: 25, color: copied ? "#188038" : "#1A73E8", display: "flex", gap: 8, alignItems: "center" }}>{copied ? "✓ Copied" : "⧉ Copy"}</div>
            </div>
          </div>}
          <Cursor2 x={cx} y={cy} press={clickCreate || copyHover} />
        </div>
      </AbsoluteFill>
    </BrowserChrome>
  );
};

// ============================== the full multi-step SETUP recording (browser -> CLI -> Claude app) ==============================
const StepTag: React.FC<{ n: number; label: string }> = ({ n, label }) => (
  <div style={{ position: "absolute", left: 24, bottom: 22, zIndex: 40, display: "flex", alignItems: "center", gap: 12, background: "rgba(15,16,22,0.9)", border: "1px solid rgba(255,255,255,0.16)", borderRadius: 999, padding: "10px 20px 10px 12px", boxShadow: "0 8px 20px rgba(0,0,0,0.35)" }}>
    <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#C96442", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: UI, fontWeight: 800, fontSize: 24 }}>{n}</div>
    <span style={{ fontFamily: UI, fontWeight: 700, fontSize: 28, color: "#fff" }}>{label}</span>
  </div>
);
// STEP 2 — install the Gemini CLI (GitHub readme + copy button, NO terminal)
const GeminiCliCard: React.FC = () => {
  const f = useCurrentFrame();
  const toCopy = Math.min(1, Math.max(0, (f - 6) / 16));
  const copyHover = f >= 24 && f < 31;
  const copied = f >= 30;
  const start = { x: 900, y: 600 }, copyBtn = { x: 1120, y: 236 };
  const cx = start.x + (copyBtn.x - start.x) * toCopy, cy = start.y + (copyBtn.y - start.y) * toCopy;
  return (
    <BrowserChrome url="github.com/google-gemini/gemini-cli" tab="google-gemini/gemini-cli" fav={<div style={{ width: 16, height: 16, borderRadius: "50%", background: "#1F2328" }} />}>
      <AbsoluteFill style={{ background: "#fff", padding: "44px 72px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 8 }}><GeminiSpark s={34} /><span style={{ fontFamily: UI, fontWeight: 700, fontSize: 40, color: "#1F2328" }}>Gemini CLI</span></div>
        <div style={{ fontFamily: UI, fontSize: 25, color: "#59636E", marginBottom: 34 }}>Google's open-source AI agent for your terminal. Powered by Gemini 3.6.</div>
        <div style={{ fontFamily: UI, fontWeight: 600, fontSize: 27, color: "#1F2328", marginBottom: 14 }}>Install</div>
        <div style={{ position: "relative", background: "#F6F8FA", border: "1px solid #D0D7DE", borderRadius: 14, padding: "26px 28px", maxWidth: 1108 }}>
          <span style={{ fontFamily: MONO, fontSize: 29, color: "#1F2328" }}><span style={{ color: "#953800" }}>npm</span> install -g <span style={{ color: "#0550AE" }}>@google/gemini-cli</span></span>
          <div style={{ position: "absolute", top: 16, right: 16, background: copied ? "#DAFBE1" : (copyHover ? "#EFF2F5" : "#fff"), border: `1px solid ${copied ? "#2DA44E" : "#D0D7DE"}`, borderRadius: 10, padding: "9px 16px", fontFamily: UI, fontWeight: 600, fontSize: 22, color: copied ? "#1A7F37" : "#1F2328", display: "flex", gap: 8, alignItems: "center" }}>{copied ? "✓ Copied" : "⧉ Copy"}</div>
        </div>
        <div style={{ fontFamily: UI, fontSize: 24, color: "#59636E", marginTop: 22 }}>Paste it once, then run <span style={{ fontFamily: MONO, background: "#EFF1F3", padding: "3px 10px", borderRadius: 6, color: "#1F2328" }}>gemini</span> and drop in your key to sign in.</div>
        <Cursor2 x={cx} y={cy} press={copyHover} />
      </AbsoluteFill>
    </BrowserChrome>
  );
};
// STEP 3 — add the Gemini plugin inside the Claude app (click Install)
const PluginStep: React.FC = () => {
  const f = useCurrentFrame();
  const toInstall = Math.min(1, Math.max(0, (f - 6) / 16));
  const press = f >= 22 && f < 29;
  const installing = f >= 26 && f < 40;
  const installed = f >= 40;
  const start = { x: 820, y: 620 }, btn = { x: 1075, y: 315 };
  const cx = start.x + (btn.x - start.x) * toInstall, cy = start.y + (btn.y - start.y) * toInstall;
  return (
    <AbsoluteFill style={{ background: APP_BG }}>
      <div style={{ height: 52, background: "#EDE9DF", display: "flex", alignItems: "center", padding: "0 20px", borderBottom: `1px solid ${APP_LINE}` }}><TrafficDots /></div>
      <div style={{ position: "absolute", top: 52, left: 0, right: 0, bottom: 0, display: "flex" }}>
        <AppSidebar active="Plugins" />
        <div style={{ flex: 1, padding: "42px 58px", position: "relative" }}>
          <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 44, color: APP_INK, marginBottom: 8 }}>Plugins</div>
          <div style={{ fontFamily: UI, fontSize: 26, color: APP_DIM, marginBottom: 28 }}>Extend Claude Code with community tools.</div>
          <div style={{ background: "#fff", border: `1.5px solid ${APP_LINE}`, borderRadius: 14, padding: "14px 20px", fontFamily: UI, fontSize: 25, color: APP_INK, marginBottom: 24 }}>🔍  gemini</div>
          <div style={{ background: "#fff", border: `1.5px solid ${APP_LINE}`, borderRadius: 18, padding: "26px 30px", display: "flex", alignItems: "center", gap: 22, boxShadow: "0 8px 26px rgba(0,0,0,0.06)" }}>
            <div style={{ width: 74, height: 74, borderRadius: 16, background: "#F3EEFF", display: "flex", alignItems: "center", justifyContent: "center" }}><GeminiSpark s={42} /></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: UI, fontWeight: 700, fontSize: 30, color: APP_INK }}>Gemini for Claude Code</div>
              <div style={{ fontFamily: UI, fontSize: 23, color: APP_DIM, marginTop: 4 }}>Route heavy building to Gemini 3.6, review it in Claude.</div>
            </div>
            <div style={{ background: installed ? "#E8F3EC" : CO, border: installed ? "1px solid #B7DFC0" : "none", color: installed ? "#2E9E63" : "#fff", borderRadius: 12, padding: "14px 28px", fontFamily: UI, fontWeight: 700, fontSize: 25, transform: press ? "scale(0.96)" : "scale(1)" }}>{installed ? "✓ Installed" : installing ? "Installing…" : "Install"}</div>
          </div>
          <Cursor2 x={cx} y={cy} press={press} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
// STEPS 4 & 5 — copy a (long, truncated) prompt, watch it paste into Claude
const PromptCard: React.FC<{ title: string; sub: string; lines: string[]; result: string; copyAt: number; idx: number }> = ({ title, sub, lines, result, copyAt, idx }) => {
  const f = useCurrentFrame();
  const toCopy = Math.min(1, Math.max(0, (f - (copyAt - 26)) / 20));
  const copyHover = f >= copyAt - 6 && f < copyAt + 1;
  const copied = f >= copyAt;
  const pasted = f >= copyAt + 22;
  const start = { x: 1150, y: 600 }, copyBtn = { x: 1300, y: 140 };
  const cx = start.x + (copyBtn.x - start.x) * toCopy, cy = start.y + (copyBtn.y - start.y) * toCopy;
  const accent = idx === 1 ? "#C6602F" : "#C7952B"; // prompt 1 = clay, prompt 2 = gold (Claude palette)
  const accentBg = idx === 1 ? "#F7E7DC" : "#F7EFD9";
  return (
    <AbsoluteFill style={{ background: "linear-gradient(180deg,#F3EFE6,#E7E0D2)", padding: "64px 96px" }}>
      <div style={{ background: "#FCFBF7", borderRadius: 24, border: `1px solid ${APP_LINE}`, borderTop: `6px solid ${accent}`, boxShadow: `0 26px 64px -22px rgba(40,30,20,0.28), 0 0 ${copied ? 0 : 16 + 9 * Math.abs(Math.sin(f / 8))}px ${accent}44`, overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "22px 30px", borderBottom: `1px solid ${APP_LINE}`, background: "#F7F2E9" }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: accentBg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 28, color: accent }}>{idx}</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 2 }}>
              <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 32, color: APP_INK }}>{title}</span>
              <span style={{ fontFamily: UI, fontWeight: 800, fontSize: 17, color: accent, background: accentBg, padding: "3px 12px", borderRadius: 999, whiteSpace: "nowrap" }}>{idx} of 2</span>
            </div>
            <div style={{ fontFamily: UI, fontSize: 22, color: APP_DIM }}>{sub}</div>
          </div>
          <div style={{ background: copied ? "#E8F3EC" : CO, border: copied ? "1px solid #B7DFC0" : "none", color: copied ? "#2E9E63" : "#fff", borderRadius: 12, padding: "14px 26px", fontFamily: UI, fontWeight: 700, fontSize: 26, display: "flex", gap: 10, alignItems: "center", filter: copyHover && !copied ? "brightness(0.82)" : "none", transform: copyHover && !copied ? "scale(0.95)" : "scale(1)" }}>{copied ? "✓ Copied" : "⧉ Copy prompt"}</div>
        </div>
        <div style={{ position: "relative", padding: "26px 34px 30px", fontFamily: MONO, fontSize: 23, lineHeight: 1.62, color: "#6B6459" }}>
          {lines.map((l, i) => <div key={i} style={{ position: "relative", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {/* select-all highlight sweeps over the lines just before copy */}
            {f >= copyAt - 15 && f < copyAt + 4 && <span style={{ position: "absolute", left: -4, top: 0, bottom: 0, width: `${Math.max(0, Math.min(1, (f - (copyAt - 15) - i * 2.5) / 6)) * 100}%`, background: `${accent}30`, borderRadius: 4, pointerEvents: "none" }} />}
            <span style={{ position: "relative" }}>{l}</span>
          </div>)}
          <div style={{ marginTop: 14, display: "inline-block", fontFamily: UI, fontWeight: 600, fontSize: 22, color: CO, background: "#FBEEE6", padding: "6px 16px", borderRadius: 999 }}>… Show more</div>
          {/* scan-line light sweep while copying */}
          {f >= copyAt - 16 && f < copyAt && <div style={{ position: "absolute", left: 0, right: 0, top: `${((f - (copyAt - 16)) / 16) * 100}%`, height: 22, background: `linear-gradient(180deg,transparent,${accent}55,transparent)`, pointerEvents: "none" }} />}
        </div>
      </div>
      {copied && <div style={{ marginTop: 34, display: "flex", justifyContent: "center", transform: `scale(${Math.min(1, (f - copyAt) / 5)})` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, background: "#0E1116", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 18, padding: "20px 38px", boxShadow: "0 16px 40px -10px rgba(0,0,0,0.5)" }}>
          <ClaudeSpark s={40} /><span style={{ fontFamily: UI, fontWeight: 800, fontSize: 36, color: pasted ? "#7FE3A6" : "#fff" }}>{pasted ? result : "Pasting into Claude…"}</span>
        </div>
      </div>}
      <Cursor2 x={cx} y={cy} press={copyHover} />
    </AbsoluteFill>
  );
};
// the Claude app RUNNING /route (orchestrate -> delegate to Gemini -> review -> ship)
export const RouteRunRec: React.FC = () => {
  const f = useCurrentFrame();
  const userIn = Math.min(1, Math.max(0, (f - 19) / 12));
  const RS = 57; const tasks = ["Landing hero + headline", "Email capture form", "Styling + mobile responsive", "Deploy to production"];
  return (
    <AbsoluteFill style={{ background: APP_BG }}>
      <div style={{ height: 52, background: "#EDE9DF", display: "flex", alignItems: "center", padding: "0 20px", borderBottom: `1px solid ${APP_LINE}` }}>{["#FF5F57", "#FEBC2E", "#28C840"].map((c, i) => <div key={i} style={{ width: 15, height: 15, borderRadius: "50%", background: c, marginRight: 9 }} />)}</div>
      <div style={{ position: "absolute", top: 52, left: 0, bottom: 0, right: 0, display: "flex" }}>
        <div style={{ width: 360, background: "#F1ECE1", borderRight: `1px solid ${APP_LINE}`, padding: "22px 18px", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 11, padding: "0 8px 20px" }}><ClaudeSpark s={26} /><span style={{ fontFamily: UI, fontWeight: 700, fontSize: 30, color: APP_INK }}>Claude</span></div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 16px", borderRadius: 14, border: `1px solid ${APP_LINE}`, background: "#fff", marginBottom: 22 }}><span style={{ fontSize: 28, color: CO, fontWeight: 700 }}>+</span><span style={{ fontFamily: UI, fontWeight: 600, fontSize: 24, color: APP_INK }}>New chat</span></div>
          <div style={{ fontFamily: UI, fontSize: 20, fontWeight: 600, color: APP_DIM, padding: "0 8px 10px" }}>Recents</div>
          {[["Waitlist landing page", true], ["Route setup", false], ["Fix the auth bug", false], ["SQL: monthly revenue", false]].map(([t, a], i) => <div key={i} style={{ padding: "12px 16px", borderRadius: 12, background: a ? "#E4DCCC" : "transparent", fontFamily: UI, fontSize: 23, color: a ? APP_INK : "#6E6A60", fontWeight: a ? 600 : 400, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginBottom: 3 }}>{t as string}</div>)}
        </div>
        <div style={{ flex: 1, position: "relative" }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 132, padding: "40px 60px", overflow: "hidden" }}>
            <div style={{ maxWidth: 1000, margin: "0 auto" }}>
              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 30, opacity: userIn, transform: `translateY(${(1 - userIn) * 20}px)` }}>
                <div style={{ background: "#EFEAE0", border: `1px solid ${APP_LINE}`, borderRadius: "20px 20px 6px 20px", padding: "18px 24px", fontFamily: UI, fontSize: 30, color: APP_INK }}><span style={{ fontFamily: MONO, background: "#E3DCCF", padding: "2px 10px", borderRadius: 6, color: CO, fontSize: 27 }}>/route</span> build me a waitlist landing page</div>
              </div>
              {f >= 49 && <div style={{ display: "flex", gap: 18 }}>
                <div style={{ marginTop: 4 }}><ClaudeSpark s={38} /></div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: fraunces.fontFamily, fontSize: 32, lineHeight: 1.5, color: APP_INK, margin: "0 0 18px" }}>On it. I'm the boss: I'll interview you, build the plan, then hand each piece to Gemini 3.6 and review its work before it ships:</p>
                  {tasks.map((tk, i) => { const ts = RS + 8 + i * 30; if (f < ts) return null; const done = f >= ts + 22; return (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 18px", background: "#F3EFE6", border: `1px solid ${APP_LINE}`, borderRadius: 12, marginBottom: 10 }}>
                      <div style={{ width: 30, height: 30, borderRadius: "50%", background: done ? "#E8F3EC" : "#FBF0E6", border: `2px solid ${done ? "#3F9E74" : CO}`, display: "flex", alignItems: "center", justifyContent: "center", color: done ? "#3F9E74" : CO, fontWeight: 900, fontSize: 18 }}>{done ? "✓" : "⟳"}</div>
                      <span style={{ fontFamily: UI, fontSize: 27, color: APP_INK, fontWeight: 500, flex: 1 }}>{tk}</span>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <span style={{ fontFamily: MONO, fontSize: 18, color: "#7A4FC0", background: "#EFE8FA", padding: "5px 12px", borderRadius: 999 }}>Gemini {done ? "built" : "building…"}</span>
                        {done && <span style={{ fontFamily: MONO, fontSize: 18, color: "#2E9E63", background: "#E8F3EC", padding: "5px 12px", borderRadius: 999 }}>Claude ✓ reviewed</span>}
                      </div>
                    </div>); })}
                  {f >= RS + 8 + tasks.length * 30 + 12 && <p style={{ fontFamily: fraunces.fontFamily, fontSize: 30, color: "#3F9E74", fontWeight: 700, margin: "16px 0 0" }}>✓ Shipped. I reviewed every piece, and you spent about 4% of the usual tokens.</p>}
                </div>
              </div>}
            </div>
          </div>
          <div style={{ position: "absolute", left: 60, right: 60, bottom: 30, maxWidth: 1000, margin: "0 auto", background: "#fff", border: `1.5px solid ${APP_LINE}`, borderRadius: 20, padding: "18px 22px" }}><div style={{ fontFamily: UI, fontSize: 28, color: APP_DIM }}>Reply to Claude…</div></div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
const PROMPT1 = ["You can now call Google's Gemini 3.6 as a sub-agent.", "Whenever a task is large, delegate the heavy building to", "Gemini through the gemini CLI with a precise spec, then", "review its output yourself before accepting anything…"];
const PROMPT2 = ["Create a reusable /route skill. When I type /route you are", "the BOSS: interview me, break the work into small pieces,", "spec each one, hand it to Gemini 3.6 to build, then review", "and loop until the whole project is done…"];
// STEPS 4 & 5 — the copy-prompt shown as a real, full-screen Claude chat (Claude hands you the prompt in a code block)
export const PromptChat: React.FC<{ idx: number; title: string; sub: string; lines: string[]; result: string; copyAt: number }> = ({ idx, lines, result, copyAt }) => {
  const f = useCurrentFrame();
  const userIn = Math.min(1, Math.max(0, (f - 6) / 10));
  const claudeIn = f >= 22;
  const toCopy = Math.min(1, Math.max(0, (f - (copyAt - 26)) / 20));
  const copyHover = f >= copyAt - 6 && f < copyAt + 1;
  const copied = f >= copyAt;
  const pasted = f >= copyAt + 20;
  const start = { x: 820, y: 640 }, copyBtn = { x: 1058, y: 262 };
  const cx = start.x + (copyBtn.x - start.x) * toCopy, cy = start.y + (copyBtn.y - start.y) * toCopy;
  const userMsg = idx === 1 ? "Set me up so you can route the heavy work to Gemini 3.6." : "Now turn this whole workflow into a reusable /route command.";
  const claudeMsg = idx === 1 ? "On it. Copy this prompt and paste it back to me to wire up Gemini:" : "Nice. Copy this one to save the whole thing as a /route skill:";
  return (
    <AbsoluteFill style={{ background: APP_BG }}>
      <div style={{ height: 52, background: "#EDE9DF", display: "flex", alignItems: "center", padding: "0 20px", borderBottom: `1px solid ${APP_LINE}` }}><TrafficDots /></div>
      <div style={{ position: "absolute", top: 52, left: 0, right: 0, bottom: 0, display: "flex" }}>
        <AppSidebar active="Chats" />
        <div style={{ flex: 1, position: "relative", padding: "38px 60px" }}>
          <div style={{ maxWidth: 1080, margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 28, opacity: userIn, transform: `translateY(${(1 - userIn) * 16}px)` }}>
              <div style={{ background: "#EFEAE0", border: `1px solid ${APP_LINE}`, borderRadius: "20px 20px 6px 20px", padding: "18px 26px", fontFamily: UI, fontSize: 31, color: APP_INK, maxWidth: 780 }}>{userMsg}</div>
            </div>
            {claudeIn && <div style={{ display: "flex", gap: 18 }}>
              <div style={{ marginTop: 4 }}><ClaudeSpark s={40} /></div>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: fraunces.fontFamily, fontSize: 33, lineHeight: 1.5, color: APP_INK, margin: "0 0 20px" }}>{claudeMsg}</p>
                <div style={{ borderRadius: 16, overflow: "hidden", border: `1.5px solid ${APP_LINE}`, boxShadow: "0 14px 36px -14px rgba(40,30,20,0.32)" }}>
                  <div style={{ display: "flex", alignItems: "center", padding: "13px 22px", background: "#F0EADE", borderBottom: `1px solid ${APP_LINE}` }}>
                    <span style={{ fontFamily: MONO, fontSize: 22, color: APP_DIM }}>setup-prompt-{idx}.txt</span>
                    <div style={{ marginLeft: "auto", background: copied ? "#E8F3EC" : CO, border: copied ? "1px solid #B7DFC0" : "none", color: copied ? "#2E9E63" : "#fff", borderRadius: 10, padding: "10px 22px", fontFamily: UI, fontWeight: 700, fontSize: 24, display: "flex", gap: 9, alignItems: "center", filter: copyHover && !copied ? "brightness(0.85)" : "none", transform: copyHover && !copied ? "scale(0.96)" : "scale(1)" }}>{copied ? "✓ Copied" : "⧉ Copy"}</div>
                  </div>
                  <div style={{ position: "relative", padding: "24px 28px", background: "#FCFBF7", fontFamily: MONO, fontSize: 25, lineHeight: 1.62, color: "#5C554A" }}>
                    {lines.map((l, i) => <div key={i} style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{l}</div>)}
                    {f >= copyAt - 16 && f < copyAt && <div style={{ position: "absolute", left: 0, right: 0, top: `${((f - (copyAt - 16)) / 16) * 100}%`, height: 22, background: `linear-gradient(180deg,transparent,${CO}44,transparent)`, pointerEvents: "none" }} />}
                  </div>
                </div>
                {copied && <div style={{ marginTop: 20, display: "flex", transform: `scale(${Math.min(1, (f - copyAt) / 5)})`, transformOrigin: "left center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, background: "#E8F3EC", border: "1px solid #B7DFC0", borderRadius: 14, padding: "13px 24px" }}>
                    <span style={{ color: "#2E9E63", fontWeight: 900, fontSize: 26 }}>✓</span>
                    <span style={{ fontFamily: UI, fontWeight: 700, fontSize: 27, color: "#2E7D54" }}>{pasted ? result : "pasting into Claude…"}</span>
                  </div>
                </div>}
              </div>
            </div>}
          </div>
          <Cursor2 x={cx} y={cy} press={copyHover} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
export const RouteSetupRec: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Sequence from={0} durationInFrames={64}><AiStudioKey /></Sequence>
    <Sequence from={64} durationInFrames={38}><GeminiCliCard /></Sequence>
    <Sequence from={102} durationInFrames={50}><PluginStep /></Sequence>
    <Sequence from={152} durationInFrames={93}><PromptChat idx={1} title="Connect Gemini 3.6" sub="lets Claude call Gemini as a sub-agent" lines={PROMPT1} result="Claude can now call Gemini 3.6" copyAt={57} /></Sequence>
    <Sequence from={245} durationInFrames={224}><PromptChat idx={2} title="Build the /route skill" sub="turns the whole workflow into /route" lines={PROMPT2} result="/route skill created" copyAt={26} /></Sequence>
  </AbsoluteFill>
);
