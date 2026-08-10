import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";
import { fraunces, inter } from "./fonts";

/* =========================================================================
   SCREEN-DEMO HYBRID  ·  repeatable editing style for tool / repo videos
   Built ON the house chassis (CLAUDE-REELS-PLAYBOOK §5): CREAM bg, the dark
   Panel (left:34 right:34 top:384 height:792) IS the screen, ProgressBar
   rail at top:272, ScreenHead title, house Captions at top:1256.
   The screen recording lives INSIDE the Panel (panel-local 1012x792), with
   punch-in zoom. Drop the real recording in via <OffthreadVideo>; a mock
   Langfuse dashboard stands in here so the look is visible.
   ========================================================================= */

// ---- house palette + helpers (from ClaudeVaultReel) ----
const CREAM = "#ECE9E2", INK = "#1A1813", CLAY = "#D2724E", GOLD = "#E7B24C", GREEN = "#3F9E74", MUTE = "#9A968B";
const TERM = "#0E1626", TERM2 = "#0A1120";
const FPS = 30;
const grad = (a: string, b: string) => `linear-gradient(158deg, ${a} 0%, ${b} 100%)`;
const NAVYSH = "0 34px 66px -22px rgba(18,28,58,0.55), 0 10px 24px rgba(18,28,58,0.30)";
const over = (f: number, start: number, dur: number, ease = Easing.out(Easing.cubic)) => interpolate(f, [start, start + dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
const fr = (s: number) => Math.round(s * FPS);
const hexA = (h: string, a: number) => { const n = parseInt(h.slice(1), 16); return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`; };

/* ---- MOCK Langfuse dashboard (placeholder for the real screen recording) ---- */
const BLUE = "#4C7BD9", MAG = "#C56CB0", LINE = "#2A2740";
const MockDashboard: React.FC<{ f: number }> = ({ f }) => {
  const rows = [
    { label: "plan task", c: BLUE, ms: "220ms", cost: "$0.004", w: 30 },
    { label: "read auth.ts", c: GREEN, ms: "90ms", cost: "$0.001", w: 16 },
    { label: "read routes.ts", c: GREEN, ms: "110ms", cost: "$0.002", w: 22 },
    { label: "write handler", c: CLAY, ms: "640ms", cost: "$0.011", w: 60 },
    { label: "run tests", c: MAG, ms: "1.2s", cost: "$0.003", w: 46 },
    { label: "fix + recheck", c: CLAY, ms: "410ms", cost: "$0.006", w: 34 },
  ];
  const drawn = Math.max(0, Math.min(rows.length, Math.floor((f - 78) / 5)));
  return (
    <div style={{ width: "100%", height: "100%", background: grad(TERM, TERM2), display: "flex", color: "#EFEAE0", fontFamily: inter.fontFamily }}>
      <div style={{ width: 96, background: "rgba(0,0,0,0.25)", borderRight: `1px solid ${LINE}`, padding: "22px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
        <div style={{ width: 38, height: 38, borderRadius: 10, background: grad(GOLD, CLAY) }} />
        {[GREEN, BLUE, MAG, MUTE].map((c, i) => <div key={i} style={{ width: 30, height: 30, borderRadius: 8, background: hexA(c, 0.22), border: `1px solid ${hexA(c, 0.4)}` }} />)}
      </div>
      <div style={{ flex: 1, padding: "26px 30px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <div style={{ fontWeight: 800, fontSize: 30 }}>Trace <span style={{ color: MUTE, fontFamily: "ui-monospace,Menlo,monospace", fontSize: 20 }}>· agent-run-4f2a</span></div>
          <div style={{ fontFamily: "ui-monospace,Menlo,monospace", fontSize: 22, color: "#F6E4A0" }}>total $0.027 · 2.7s</div>
        </div>
        <div style={{ height: 1, background: LINE, margin: "18px 0 20px" }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {rows.map((r, i) => (
            <div key={i} style={{ opacity: i < drawn ? 1 : 0.14, display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 172, fontFamily: "ui-monospace,Menlo,monospace", fontSize: 21, color: "#EFEAE0" }}>{r.label}</div>
              <div style={{ flex: 1, height: 30, borderRadius: 7, background: "rgba(0,0,0,0.3)", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", left: `${i * 6}%`, top: 0, bottom: 0, width: `${r.w}%`, borderRadius: 7, background: `linear-gradient(90deg, ${hexA(r.c, 0.95)}, ${hexA(r.c, 0.5)})`, boxShadow: `0 0 12px ${hexA(r.c, 0.5)}` }} />
              </div>
              <div style={{ width: 84, textAlign: "right", fontFamily: "ui-monospace,Menlo,monospace", fontSize: 19, color: MUTE }}>{r.ms}</div>
              <div style={{ width: 92, textAlign: "right", fontFamily: "ui-monospace,Menlo,monospace", fontSize: 21, color: "#F6E4A0" }}>{r.cost}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ---- the house Panel (dark macbook card) — the screen lives here ---- */
const Panel: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div style={{ position: "absolute", left: 34, right: 34, top: 384, height: 792, borderRadius: 40, background: grad(TERM, TERM2), boxShadow: NAVYSH, overflow: "hidden", border: `2px solid rgba(120,150,210,0.22)` }}>{children}</div>
);

/* ---- ScreenHead (title + chip), house style ---- */
const ScreenHead: React.FC<{ lf: number; big: string; clay: string }> = ({ lf, big, clay }) => {
  const p = over(lf, 0, fr(0.4), Easing.out(Easing.back(1.5)));
  return (<>
    <div style={{ position: "absolute", right: 26, top: 22, zIndex: 46, transform: `scale(${1 + 0.035 * Math.abs(Math.sin(lf / 6))})`, display: "flex", alignItems: "center", gap: 7, padding: "7px 14px", borderRadius: 12, background: "linear-gradient(180deg,#14B88F,#0C7D62)", border: "2px solid #7FE8CE", boxShadow: "0 6px 16px rgba(0,0,0,0.5), 0 0 12px rgba(16,163,127,0.55)" }}>
      <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#EAFFF7", boxShadow: "0 0 8px #EAFFF7", opacity: 0.6 + 0.4 * Math.abs(Math.sin(lf / 5)) }} />
      <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 15, color: "#fff", letterSpacing: 0.3 }}>FREE · OPEN SOURCE</span>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 70, textAlign: "center", zIndex: 46, transform: `scale(${p})`, opacity: p }}>
      <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 58, lineHeight: 1.06, color: "#1A1813", textShadow: "0 2px 8px rgba(255,251,244,0.6)" }}>{big} <span style={{ color: CLAY }}>{clay}</span></span>
    </div>
  </>);
};

/* ---- ProgressBar rail (house retention spine), simplified ---- */
const ProgressBar: React.FC = () => {
  const f = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const p = Math.min(1, f / durationInFrames);
  const STARS = [0.18, 0.5, 0.82];
  const PELLETS = [0.1, 0.28, 0.4, 0.62, 0.72, 0.92];
  return (
    <div style={{ position: "absolute", left: 46, right: 46, top: 272, height: 60, zIndex: 120 }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 20, height: 22, background: "rgba(154,150,139,0.28)", borderRadius: 999, boxShadow: "inset 0 1px 3px rgba(0,0,0,0.15)" }} />
      <div style={{ position: "absolute", left: 0, top: 20, height: 22, width: `${p * 100}%`, background: grad("#E08A66", "#C5603C"), borderRadius: 999, boxShadow: "0 3px 12px rgba(210,114,78,0.6)" }} />
      {PELLETS.map((np, i) => (np > p ? <div key={i} style={{ position: "absolute", left: `${np * 100}%`, top: 24, transform: "translate(-50%,-50%)", width: 13, height: 13, borderRadius: "50%", background: GOLD, border: "2px solid #F6E4A0", boxShadow: `0 0 9px ${GOLD}`, opacity: 0.9 }} /> : null))}
      {STARS.map((np, i) => { const passed = p >= np; return (
        <div key={i} style={{ position: "absolute", left: `${np * 100}%`, top: 7, transform: "translateX(-50%)", width: 48, height: 48 }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: passed ? grad("#F0CB63", "#D39A2A") : "#25314A", border: `4px solid ${passed ? "#F6E4A0" : GOLD}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, color: passed ? "#fff" : GOLD, boxShadow: passed ? `0 0 14px ${GOLD}99` : `0 0 12px ${GOLD}66` }}>★</div>
        </div>); })}
      {/* traveling marker */}
      <div style={{ position: "absolute", left: `${p * 100}%`, top: 12, transform: "translateX(-50%)", width: 34, height: 34, borderRadius: "50%", background: grad(GOLD, CLAY), border: "2px solid #F6E4A0", boxShadow: `0 4px 12px ${hexA(CLAY, 0.6)}` }} />
    </div>
  );
};

export const ScreenDemoReel: React.FC = () => {
  const f = useCurrentFrame();
  // punch-in zoom INSIDE the panel (emphasise the cost column)
  const zoom = interpolate(f, [120, 150, 200], [1, 1.4, 1.4], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const fy = interpolate(f, [120, 200], [38, 66], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: CREAM }}>
      {/* soft brand grain / glow */}
      <div style={{ position: "absolute", left: -120, top: 300, width: 620, height: 620, borderRadius: "50%", background: `radial-gradient(circle, ${hexA(CLAY, 0.1)}, transparent 62%)`, filter: "blur(16px)" }} />

      <ScreenHead lf={f} big="See what your agent" clay="is doing" />
      <ProgressBar />

      {/* THE PANEL = the screen. Recording lives inside it, panel-local, with zoom */}
      <Panel>
        <div style={{ width: "100%", height: "100%", transformOrigin: `82% ${fy}%`, transform: `scale(${zoom})` }}>
          <MockDashboard f={f} />
          {/* >>> REAL RECORDING GOES HERE (fills the panel):
              <OffthreadVideo src={staticFile("langfuse_demo.mp4")} style={{width:'100%',height:'100%',objectFit:'cover'}} /> */}
        </div>
        {/* highlight callout on the cost column when zoomed (inside the panel) */}
        {f > 140 && f < 205 && <div style={{ position: "absolute", right: 40, top: 250, width: 150, height: 54, borderRadius: 10, border: `3px solid ${GOLD}`, boxShadow: `0 0 18px ${hexA(GOLD, 0.6)}`, zIndex: 5 }} />}
      </Panel>

      {/* @handle above the panel */}
      <div style={{ position: "absolute", left: 46, top: 200, display: "flex", alignItems: "center", gap: 10, zIndex: 46 }}>
        <div style={{ width: 30, height: 30, borderRadius: "50%", background: grad(GOLD, CLAY) }} />
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 22, color: INK }}>@nocodealex</div>
      </div>

      {/* CAPTION (house style, top:1256) — sample line */}
      <div style={{ position: "absolute", left: 44, right: 44, top: 1256, textAlign: "center", zIndex: 90 }}>
        <div style={{ display: "inline-flex", flexWrap: "wrap", justifyContent: "center", gap: "0 16px" }}>
          {["every", "step,", "and", "what", "it", "cost"].map((w, i) => <span key={i} style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 74, lineHeight: 1.12, letterSpacing: "-0.01em", color: i === 5 ? "#B8501F" : CLAY, transform: i === 5 ? "translateY(-3px) scale(1.04)" : "none", display: "inline-block", textShadow: "0 2px 12px rgba(255,251,244,0.9), 0 1px 2px rgba(120,56,26,0.35)" }}>{w}</span>)}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const SCREENDEMO_DUR = 260;
