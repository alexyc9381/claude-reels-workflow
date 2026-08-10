import React from "react";
import { Img, staticFile } from "remotion";
import { inter } from "./fonts";
import { E, OUT, IO, BACK } from "./MissionWorld";
import {
  RACERS, LOGOS, STATS, CARD, INKD, MUTE, CLAY, GO, BLUE, PLUM, GOLD, RED, SH_D,
} from "./FileWorld";

/* =========================================================================
   REEL 88 "FILE" · THE APP UI — LIGHT MODE.

   ⛔ "the UI showing the screen should seem way more detail way more realistic
      and like lightscreen". The dark UI was the mistake, for two reasons:

      1. REALISM. Nearly every screenshot a viewer has seen of a browser app is
         light mode. A dark slab reads as a MOCKUP; a white app with grey chrome
         reads as a screen somebody actually has open.
      2. HIERARCHY. A dark window inside a dark room has no dominant lit thing,
         which is exactly why these scenes measured 1.13-1.46 while the race
         shots measured 2.5-3.6. A LIT screen in a night circuit is the
         brightest object in frame by construction.

   Realism is the stuff a mockup leaves out:
      · a menu bar, a tab strip, a toolbar, a bookmark row, a real file:// path
      · 2px hairlines on a strict radius family, never heavy outlines
      · REAL short strings (names, times, token counts, ctx sizes) mixed with
        skeleton paragraphs — all-skeleton reads as a wireframe
      · timestamps, an avatar with an initial, message actions, a scrollbar
      · a DARK code block inside a light app, the way every real one looks
      · the screen SPILLS light onto the room. ⛔ Matte rule: hard-edged solid
        steps, never a radial glow.
   ========================================================================= */

const W_CHROME = "#EDEAE3", W_BAR = "#F6F4EF", W_BODY = "#FFFFFF";
const W_SIDE = "#F4F1EA", W_EDGE = "#DFD9CC", W_EDGE2 = "#EAE5DA";
const T_HI = "#241F1A", T_MID = "#6B6357", T_LO = "#9A9184";
const SH_WIN = "0 26px 60px -12px rgba(0,0,0,0.72), 0 6px 16px rgba(0,0,0,0.45)";
const SH_CARD = "0 2px 5px rgba(36,31,26,0.10)";
export const CHROME_H = 138;                 // menu + tabs + toolbar + bookmarks

/* ---------------------------------------------------------- screen spill --
   The floor in front of a lit screen is not the colour of the floor behind it.
   Three hard-edged steps, matte, no gradient.
   ---------------------------------------------------------------------------- */
export const ScreenSpill: React.FC<{
  x: number; y: number; w: number; h?: number; z?: number;
}> = ({ x, y, w, h = 132, z = 11 }) => (<>
  {[0, 1, 2].map((i) => {
    const ww = w * (1 + i * 0.24);
    return (
      <div key={i} style={{ position: "absolute", left: x + w / 2 - ww / 2,
        top: y + i * (h / 3), width: ww, height: h / 3 + 2,
        background: ["#27313D", "#222B36", "#1D252F"][i], zIndex: z - i }} />
    );
  })}
</>);

/* ------------------------------------------------------------------ chrome -- */
export const AppWindow: React.FC<{
  f: number; x: number; y: number; w: number; h: number; t?: number; z?: number;
  tab?: string; url?: string; children?: React.ReactNode;
}> = ({ f, x, y, w, h, t = 1, z = 26, tab = "G0DM0D3 — Liberated Chat",
        url = "file:///Users/you/Downloads/index.html", children }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
    borderRadius: 16, background: W_BODY, boxShadow: SH_WIN, overflow: "hidden",
    border: `2px solid ${W_EDGE}`,
    transform: `scale(${t})`, opacity: Math.min(1, t * 1.5) }}>

    {/* MENU BAR */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 30,
      background: W_CHROME, borderBottom: `2px solid ${W_EDGE}`, display: "flex",
      alignItems: "center", paddingLeft: 15, gap: 8 }}>
      {["#EC6A5E", "#F4BF4F", "#61C554"].map((c) => (
        <div key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c,
          border: "1px solid rgba(0,0,0,0.13)" }} />
      ))}
      <div style={{ display: "flex", gap: 16, marginLeft: 14 }}>
        {["File", "Edit", "View", "Window", "Help"].map((m) => (
          <div key={m} style={{ fontFamily: inter.fontFamily, fontWeight: 600,
            fontSize: 13, color: T_MID }}>{m}</div>
        ))}
      </div>
      <div style={{ marginLeft: "auto", marginRight: 15, display: "flex", gap: 11,
        alignItems: "center" }}>
        <div style={{ width: 15, height: 10, borderRadius: 2, border: `2px solid ${T_LO}` }} />
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 12,
          color: T_MID }}>100%</div>
      </div>
    </div>

    {/* TAB STRIP */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 30, height: 38,
      background: W_CHROME }}>
      <div style={{ position: "absolute", left: 12, top: 4, width: 292, height: 34,
        borderRadius: "9px 9px 0 0", background: W_BAR, border: `2px solid ${W_EDGE}`,
        borderBottom: "none", display: "flex", alignItems: "center", gap: 8,
        paddingLeft: 11 }}>
        <div style={{ width: 15, height: 15, borderRadius: 4, background: CLAY }} />
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 13,
          color: T_HI, whiteSpace: "nowrap", overflow: "hidden" }}>{tab}</div>
        <div style={{ marginLeft: "auto", marginRight: 9, fontFamily: inter.fontFamily,
          fontWeight: 700, fontSize: 14, color: T_LO }}>×</div>
      </div>
      <div style={{ position: "absolute", left: 314, top: 9, width: 168, height: 25,
        borderRadius: 7, background: "#E4E0D7" }} />
      <div style={{ position: "absolute", left: 496, top: 8, fontFamily: inter.fontFamily,
        fontWeight: 700, fontSize: 19, color: T_LO }}>+</div>
    </div>

    {/* TOOLBAR */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 68, height: 40,
      background: W_BAR, borderBottom: `2px solid ${W_EDGE2}` }}>
      {["‹", "›", "⟳"].map((g, i) => (
        <div key={g} style={{ position: "absolute", left: 15 + i * 27, top: 7,
          fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 18, color: T_MID }}>{g}</div>
      ))}
      <div style={{ position: "absolute", left: 104, right: 90, top: 6, height: 27,
        borderRadius: 14, background: W_BODY, border: `2px solid ${W_EDGE}`,
        display: "flex", alignItems: "center", gap: 8, paddingLeft: 12 }}>
        <svg width={12} height={13} viewBox="0 0 12 14">
          <path d="M2.6 6 V4.2 a3.4 3.4 0 0 1 6.8 0 V6" fill="none" stroke={GO} strokeWidth={1.7} />
          <rect x={1.2} y={6} width={9.6} height={6.6} rx={1.5} fill={GO} />
        </svg>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 13,
          color: T_MID, whiteSpace: "nowrap" }}>{url}</div>
      </div>
      {[0, 1].map((i) => (
        <div key={i} style={{ position: "absolute", right: 18 + i * 29, top: 9, width: 20,
          height: 20, borderRadius: 6, background: "#E4E0D7" }} />
      ))}
    </div>

    {/* BOOKMARK STRIP */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 108, height: 30,
      background: W_BAR, borderBottom: `2px solid ${W_EDGE2}`, display: "flex",
      alignItems: "center", paddingLeft: 15, gap: 17 }}>
      {["github", "openrouter", "docs", "localhost"].map((b, i) => (
        <div key={b} style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 11, height: 11, borderRadius: 3,
            background: [INKD, "#94A3B8", CLAY, GO][i] }} />
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 12,
            color: T_MID }}>{b}</div>
        </div>
      ))}
    </div>

    <div style={{ position: "absolute", left: 0, right: 0, top: CHROME_H, bottom: 0 }}>
      {children}
    </div>
  </div>
);

/* ---------------------------------------------------------------- mode tabs -- */
export const ModeTabs: React.FC<{ left: number; active?: number; f?: number }> =
  ({ left, active = 0, f = 0 }) => (
  <div style={{ position: "absolute", left, right: 0, top: 0, height: 42,
    background: W_BODY, borderBottom: `2px solid ${W_EDGE2}`, display: "flex",
    alignItems: "center", paddingLeft: 22, gap: 24 }}>
    {["Chat", "Classic", "Local"].map((t, i) => (
      <div key={t} style={{ position: "relative", fontFamily: inter.fontFamily,
        fontWeight: i === active ? 900 : 700, fontSize: 16,
        color: i === active ? T_HI : T_LO }}>
        {t}
        {i === active && (
          <div style={{ position: "absolute", left: -2, right: -2, bottom: -13, height: 3,
            borderRadius: 2, background: i === 1 ? GOLD : CLAY }} />
        )}
      </div>
    ))}
    <div style={{ marginLeft: "auto", marginRight: 18, display: "flex", alignItems: "center",
      gap: 7 }}>
      <div style={{ width: 8, height: 8, borderRadius: "50%", background: GO }} />
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 12,
        color: T_MID }}>connected</div>
    </div>
  </div>
);

/* ----------------------------------------------------------------- sidebar -- */
export const Sidebar: React.FC<{
  f: number; w?: number; at?: number; active?: number; classic?: boolean;
  scroll?: number; slot?: number; top?: number; bottom?: number;
}> = ({ f, w = 250, at = 0, active = 0, classic = false, scroll = 0, slot,
        top = 42, bottom = 28 }) => {
  /* ⛔ REALISM IS DENSITY AND SMALL TYPE. A real chat app's sidebar carries a
        New-chat button, a search field, a RECENTS list with titles and times,
        and only then the model list — roughly 20 rows at 11-13px. The first
        version had a search box and five 15px rows and read as a wireframe. */
  const R = 34;                                   // model row pitch
  const MODELS_TOP = 158;
  return (
  <div style={{ position: "absolute", left: 0, top, bottom, width: w,
    background: W_SIDE, borderRight: `2px solid ${W_EDGE2}`, overflow: "hidden" }}>

    <div style={{ position: "absolute", left: 10, right: 10, top: 10, height: 28,
      borderRadius: 7, background: CLAY, display: "flex", alignItems: "center",
      justifyContent: "center", gap: 6, fontFamily: inter.fontFamily, fontWeight: 700,
      fontSize: 12, color: "#FFFFFF" }}>+ New chat</div>

    <div style={{ position: "absolute", left: 10, right: 10, top: 44, height: 26,
      borderRadius: 7, background: W_BODY, border: `1px solid ${W_EDGE}`,
      display: "flex", alignItems: "center", gap: 7, paddingLeft: 9 }}>
      <svg width={11} height={11} viewBox="0 0 14 14">
        <circle cx={6} cy={6} r={4.3} fill="none" stroke={T_LO} strokeWidth={1.7} />
        <path d="M9.3 9.3 L12.4 12.4" stroke={T_LO} strokeWidth={1.7} strokeLinecap="round" />
      </svg>
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 500, fontSize: 11,
        color: T_LO }}>Search</div>
      <div style={{ marginLeft: "auto", marginRight: 6, padding: "1px 5px", borderRadius: 3,
        background: "#E7E2D7", fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 9,
        color: T_LO }}>⌘K</div>
    </div>

    {/* RECENTS — the thing that makes it look USED */}
    <div style={{ position: "absolute", left: 13, top: 80, fontFamily: inter.fontFamily,
      fontWeight: 700, fontSize: 9, letterSpacing: "0.13em", color: T_LO }}>RECENTS</div>
    {[["Launch email draft", "2m"], ["Refactor auth middleware", "1h"],
      ["Compare pricing tiers", "yest"]].map(([t, w2], i) => (
      <div key={t} style={{ position: "absolute", left: 8, right: 8, top: 94 + i * 22,
        height: 20, borderRadius: 5, display: "flex", alignItems: "center", paddingLeft: 8,
        background: i === 0 ? "#EAE5DA" : "transparent" }}>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: i === 0 ? 600 : 500,
          fontSize: 11, color: i === 0 ? T_HI : T_MID, whiteSpace: "nowrap",
          overflow: "hidden" }}>{t}</span>
        <span style={{ marginLeft: "auto", marginRight: 8, fontFamily: inter.fontFamily,
          fontWeight: 500, fontSize: 9.5, color: T_LO }}>{w2}</span>
      </div>
    ))}

    <div style={{ position: "absolute", left: 13, top: 166, fontFamily: inter.fontFamily,
      fontWeight: 700, fontSize: 9, letterSpacing: "0.13em", color: T_LO, zIndex: 5 }}>
      MODELS · {STATS.models}
    </div>

    {/* ⛔ the list needs its OWN clipped viewport. Scrolling the rows in the
           sidebar's own space dragged them up over RECENTS and the label. */}
    <div style={{ position: "absolute", left: 0, right: 0, top: MODELS_TOP + 22,
      bottom: classic ? 50 : 6, overflow: "hidden" }}>
    <div style={{ position: "absolute", left: 7, right: 7,
      top: (slot ?? active) * R - scroll * 118, height: 30, borderRadius: 7,
      background: W_BODY, boxShadow: SH_CARD, borderLeft: `3px solid ${RACERS[active].c}`,
      zIndex: 1 }} />

    {RACERS.map((m, i) => {
      const on = E(f, at + i * 3, at + 14 + i * 3, 0, 1, OUT);
      return (
        <div key={m.name} style={{ position: "absolute", left: 7, right: 7,
          top: i * R - scroll * 118, height: 30, opacity: on, zIndex: 2,
          display: "flex", alignItems: "center", gap: 7, paddingLeft: 9 }}>
          <div style={{ width: 19, height: 19, borderRadius: 5, background: W_BODY,
            border: `1px solid ${W_EDGE2}`, display: "flex", alignItems: "center",
            justifyContent: "center" }}>
            <Img src={staticFile(`logos/${m.logo}`)}
                 style={{ width: 12, height: 12, objectFit: "contain" }} />
          </div>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: i === active ? 700 : 500,
            fontSize: 12, color: i === active ? T_HI : T_MID }}>{m.name}</div>
          <div style={{ marginLeft: "auto", marginRight: 8, display: "flex",
            alignItems: "center", gap: 6 }}>
            <div style={{ fontFamily: inter.fontFamily, fontWeight: 500, fontSize: 9.5,
              color: T_LO, fontVariantNumeric: "tabular-nums" }}>
              {(0.4 + i * 0.17).toFixed(2)}s
            </div>
            <div style={{ width: 6, height: 6, borderRadius: "50%",
              background: (Math.floor(f / 8) + i) % 6 === 0 ? "#5FD9A6" : GO }} />
          </div>
        </div>
      );
    })}

    {scroll > 0.01 && Array.from({ length: 5 }, (_, i) => (
      <div key={`x${i}`} style={{ position: "absolute", left: 7, right: 7,
        top: (RACERS.length + i) * R - scroll * 118, height: 30, zIndex: 2,
        display: "flex", alignItems: "center", gap: 7, paddingLeft: 9 }}>
        <div style={{ width: 19, height: 19, borderRadius: 5, background: W_BODY,
          border: `1px solid ${W_EDGE2}`, display: "flex", alignItems: "center",
          justifyContent: "center" }}>
          <Img src={staticFile(`logos/${LOGOS[(i + 5) % LOGOS.length]}`)}
               style={{ width: 12, height: 12, objectFit: "contain" }} />
        </div>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 500, fontSize: 12,
          color: T_MID }}>{["Llama 3.3", "Qwen 2.5", "Mistral", "Ollama", "Router"][i]}</div>
        <div style={{ marginLeft: "auto", marginRight: 8, fontFamily: inter.fontFamily,
          fontWeight: 500, fontSize: 9.5, color: T_LO,
          fontVariantNumeric: "tabular-nums" }}>{(0.5 + i * 0.13).toFixed(2)}s</div>
      </div>
    ))}
    </div>

    {classic && (
      <div style={{ position: "absolute", left: 7, right: 7, bottom: 9, height: 34,
        borderRadius: 8, background: INKD, boxShadow: SH_CARD, display: "flex",
        alignItems: "center", paddingLeft: 10, gap: 7, zIndex: 4 }}>
        <div style={{ width: 17, height: 17, borderRadius: 4, background: GOLD }} />
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 13,
          color: GOLD }}>Classic Mode</div>
      </div>
    )}
  </div>
  );
};

/* -------------------------------------------------------------- code block --
   Dark, inside a light app — exactly how every real one looks, and the contrast
   makes the answer read as CODE at a glance.
   ---------------------------------------------------------------------------- */
export const CodeBlock: React.FC<{
  f: number; x?: number; y?: number; w: number; at?: number; flow?: boolean;
}> = ({ f, x = 0, y = 0, w, at = 0, flow = false }) => (
  /* ⛔ `position:absolute` inside a STATIC parent anchors to the nearest
        positioned ancestor, not to where it sits in the markup — so in the chat
        answer this block jumped to the top-left and covered the heading and the
        bullets. `flow` puts it back in normal flow where it belongs. */
  <div style={{ position: flow ? "relative" : "absolute", left: flow ? undefined : x,
    top: flow ? undefined : y, width: w, height: 112,
    borderRadius: 9, background: "#1B2430", overflow: "hidden", boxShadow: SH_CARD }}>
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 23,
      background: "#141C26", display: "flex", alignItems: "center", paddingLeft: 10,
      paddingRight: 10, justifyContent: "space-between" }}>
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 10,
        letterSpacing: "0.08em", color: "#7E8FA1" }}>PYTHON</div>
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 10,
        color: "#7E8FA1" }}>copy</div>
    </div>
    {[[[24, PLUM], [52, "#79B8E8"], [36, "#E0B341"]],
      [[16, "#5C6B7A"], [78, "#7FCF9A"]],
      [[30, PLUM], [42, "#79B8E8"], [26, "#E0B341"], [18, "#5C6B7A"]],
      [[54, "#7FCF9A"], [24, "#5C6B7A"]]].map((row, r) => {
      let cx = 0;
      return (
        <React.Fragment key={r}>
          <div style={{ position: "absolute", left: 6, top: 33 + r * 19, width: 14,
            fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 10,
            color: "#4A5765", textAlign: "right" }}>{r + 1}</div>
          {(row as [number, string][]).map(([wd, c], k) => {
            const el = (
              <div key={k} style={{ position: "absolute", left: 28 + cx, top: 36 + r * 19,
                width: wd, height: 7, borderRadius: 4, background: c,
                transform: `scaleX(${E(f, at + r * 4, at + 14 + r * 4, 0, 1, OUT)})`,
                transformOrigin: "0% 50%" }} />
            );
            cx += wd + 8;
            return el;
          })}
        </React.Fragment>
      );
    })}
  </div>
);

/* --------------------------------------------------------------- chat pane -- */
export const ChatPane: React.FC<{
  f: number; left: number; at?: number; promptAt?: number; model?: number; prompt?: string;
  top?: number; right?: number; scroll?: number;
}> = ({ f, left, at = 0, promptAt, model = 0, prompt = "write my launch email",
        top = 42, right = 176, scroll = 0 }) => {
  const m = RACERS[model];
  const pAt = promptAt ?? at;
  const typed = Math.round(E(f, pAt, pAt + 22, 0, prompt.length, IO));
  const y = (v: number) => v - scroll * 76;    // relative to the clip box
  /* ⛔ 190px of scroll in a 296px viewport pushed the whole answer off the top.
        76 reveals the answer and retires the prompt, which is what a real one does. */
  return (<>
    {/* CHAT HEADER — model pill, share, overflow. Real apps have one. */}
    <div style={{ position: "absolute", left, right, top, height: 34,
      borderBottom: `1px solid ${W_EDGE2}`, display: "flex", alignItems: "center",
      paddingLeft: 16, gap: 8 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "3px 9px",
        borderRadius: 6, border: `1px solid ${W_EDGE}`, background: W_BODY }}>
        <Img src={staticFile(`logos/${m.logo}`)}
             style={{ width: 12, height: 12, objectFit: "contain" }} />
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 11,
          color: T_HI }}>{m.name}</span>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 9,
          color: T_LO }}>▾</span>
      </div>
      <span style={{ fontFamily: inter.fontFamily, fontWeight: 500, fontSize: 10.5,
        color: T_LO }}>Launch email draft</span>
      <div style={{ marginLeft: "auto", marginRight: 14, display: "flex", gap: 9 }}>
        {["share", "more"].map((k) => (
          <div key={k} style={{ width: 20, height: 20, borderRadius: 5,
            border: `1px solid ${W_EDGE2}`, background: W_BODY }} />
        ))}
      </div>
    </div>

    {scroll > 0.01 && (
      <div style={{ position: "absolute", right: right + 5, top: top + 40, bottom: 62,
        width: 4, borderRadius: 2, background: "#EAE5DA", zIndex: 4 }}>
        <div style={{ position: "absolute", left: 0, width: 4, height: "36%",
          top: `${scroll * 64}%`, borderRadius: 2, background: "#C6BEAF" }} />
      </div>
    )}

    {/* ⛔ CLIP THE TRANSCRIPT. Without this the scrolled bubble and code block
           drew straight over the toolbar and the bookmark bar. */}
    <div style={{ position: "absolute", left, right, top: top + 34, bottom: 56,
      overflow: "hidden" }}>

    {/* the user turn */}
    <div style={{ position: "absolute", left: left + 130 - left, right: 18, top: y(14),
      display: "flex", justifyContent: "flex-end", alignItems: "flex-start", gap: 7 }}>
      <div>
        <div style={{ padding: "8px 13px", borderRadius: "11px 11px 3px 11px",
          background: CLAY, fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 14,
          color: "#FFFFFF", maxWidth: 320, boxShadow: SH_CARD,
          transform: `scale(${E(f, pAt, pAt + 12, 0.9, 1, BACK)})`,
          transformOrigin: "100% 50%" }}>
          {prompt.slice(0, typed)}
          <span style={{ opacity: Math.floor(f / 6) % 2 }}>|</span>
        </div>
        <div style={{ textAlign: "right", marginTop: 3, fontFamily: inter.fontFamily,
          fontWeight: 500, fontSize: 9.5, color: T_LO }}>2:14 PM</div>
      </div>
      <div style={{ width: 24, height: 24, borderRadius: 6, background: "#DCD5C7",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 11, color: T_MID }}>A</div>
    </div>

    {/* the assistant turn — a heading, prose, BULLETS, code, actions. This is the
        shape a real LLM answer has; three grey bars is a wireframe. */}
    <div style={{ position: "absolute", left: 18, top: y(76), display: "flex", gap: 8,
      transform: `translateY(${(1 - E(f, at + 8, at + 26, 0, 1, OUT)) * 70}px)`,
      opacity: E(f, at + 8, at + 22, 0, 1, OUT) }}>
      <div style={{ width: 24, height: 24, borderRadius: 6, background: W_BODY,
        border: `1px solid ${W_EDGE}`, display: "flex", alignItems: "center",
        justifyContent: "center" }}>
        <Img src={staticFile(`logos/${m.logo}`)}
             style={{ width: 14, height: 14, objectFit: "contain" }} />
      </div>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 6 }}>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 12,
            color: T_HI }}>{m.name}</div>
          <div style={{ padding: "1px 6px", borderRadius: 4, background: "#EFEBE1",
            fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 9.5, color: T_MID,
            fontVariantNumeric: "tabular-nums" }}>
            {(0.4 + model * 0.17).toFixed(2)}s · 412 tok
          </div>
        </div>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 13,
          color: T_HI, marginBottom: 6,
          opacity: E(f, at + 14, at + 22, 0, 1, OUT) }}>Here's a draft you can send:</div>
        {[0, 1].map((k) => (
          <div key={k} style={{ width: [352, 300][k], height: 8, borderRadius: 4,
            background: "#DCD6C9", marginBottom: 7,
            transform: `scaleX(${E(f, at + 18 + k * 4, at + 30 + k * 4, 0, 1, OUT)})`,
            transformOrigin: "0% 50%" }} />
        ))}
        {[0, 1, 2].map((k) => (
          <div key={k} style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 6,
            opacity: E(f, at + 24 + k * 3, at + 34 + k * 3, 0, 1, OUT) }}>
            <div style={{ width: 4, height: 4, borderRadius: "50%", background: T_LO }} />
            <div style={{ width: [268, 316, 232][k], height: 8, borderRadius: 4,
              background: "#E6E1D6" }} />
          </div>
        ))}
        <CodeBlock f={f} w={372} at={at + 32} flow />
        <div style={{ display: "flex", gap: 6, marginTop: 8,
          opacity: E(f, at + 44, at + 56, 0, 1, OUT) }}>
          {["copy", "retry", "up", "down"].map((k) => (
            <div key={k} style={{ width: 22, height: 22, borderRadius: 6,
              background: W_BODY, border: `1px solid ${W_EDGE2}` }} />
          ))}
        </div>
      </div>
    </div>
    </div>
  </>);
};

/* ---------------------------------------------------------------- composer -- */
export const Composer: React.FC<{
  f: number; left: number; label?: string; right?: number; bottom?: number;
}> = ({ f, left, label = "GPT", right = 176, bottom = 36 }) => (
  <div style={{ position: "absolute", left: left + 18, right: right + 18, bottom, height: 44,
    borderRadius: 12, background: W_BODY, border: `2px solid ${W_EDGE}`, boxShadow: SH_CARD,
    display: "flex", alignItems: "center", paddingLeft: 14, gap: 11 }}>
    <div style={{ width: 20, height: 20, borderRadius: 6, border: `2px solid ${T_LO}` }} />
    <div style={{ fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 16,
      color: T_LO }}>Message {label}…</div>
    <div style={{ marginLeft: "auto", marginRight: 9, display: "flex", gap: 8,
      alignItems: "center" }}>
      <div style={{ padding: "4px 7px", borderRadius: 5, background: "#EFEBE1",
        fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 11, color: T_MID }}>⌘↵</div>
      <div style={{ padding: "4px 9px", borderRadius: 6, background: "#EFEBE1",
        fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 12, color: T_MID }}>{label}</div>
      <div style={{ width: 32, height: 32, borderRadius: 9, background: CLAY,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 16, color: "#FFFFFF" }}>↑</div>
    </div>
  </div>
);

/* ------------------------------------------------------------ context rail -- */
export const ContextRail: React.FC<{ f: number; w?: number; at?: number }> =
  ({ f, w = 182, at = 0 }) => {
  const used = E(f, at, at + 40, 0.18, 0.62, OUT);
  return (
    <div style={{ position: "absolute", right: 0, top: 42, bottom: 28, width: w,
      background: W_SIDE, borderLeft: `2px solid ${W_EDGE2}`, overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 13, top: 13, fontFamily: inter.fontFamily,
        fontWeight: 800, fontSize: 10, letterSpacing: "0.13em", color: T_LO }}>CONTEXT</div>
      <div style={{ position: "absolute", left: 13, right: 13, top: 33, height: 8,
        borderRadius: 4, background: "#E3DED2", overflow: "hidden" }}>
        <div style={{ width: `${used * 100}%`, height: "100%", background: CLAY }} />
      </div>
      <div style={{ position: "absolute", left: 13, top: 47, fontFamily: inter.fontFamily,
        fontWeight: 700, fontSize: 12, color: T_MID, fontVariantNumeric: "tabular-nums" }}>
        {Math.round(used * 128)}k / 128k tokens
      </div>
      {[["temperature", "0.7"], ["top_p", "1.00"], ["stream", "on"], ["seed", "auto"]]
        .map(([k, v], i) => (
        <div key={k} style={{ position: "absolute", left: 13, right: 13, top: 76 + i * 25,
          display: "flex", alignItems: "center" }}>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 12,
            color: T_LO }}>{k}</div>
          <div style={{ marginLeft: "auto", fontFamily: inter.fontFamily, fontWeight: 700,
            fontSize: 12, color: T_HI, fontVariantNumeric: "tabular-nums" }}>{v}</div>
        </div>
      ))}
      <div style={{ position: "absolute", left: 13, top: 186, fontFamily: inter.fontFamily,
        fontWeight: 800, fontSize: 10, letterSpacing: "0.13em", color: T_LO }}>ACTIVITY</div>
      {Array.from({ length: 21 }, (_, i) => {
        const h = 6 + (Math.sin(i * 1.7 + f / 9) * 0.5 + 0.5) * 30;
        return (
          <div key={i} style={{ position: "absolute", left: 13 + i * 7, bottom: 18,
            width: 5, height: h, borderRadius: 2, background: i > 16 ? CLAY : "#D4CDBE" }} />
        );
      })}
    </div>
  );
};

/* ---------------------------------------------------------------- status bar -- */
export const StatusBar: React.FC<{ f: number; left: number; model?: number }> =
  ({ f, left, model = 0 }) => {
  const m = RACERS[model];
  return (
    <div style={{ position: "absolute", left, right: 0, bottom: 0, height: 28,
      borderTop: `2px solid ${W_EDGE2}`, background: W_BAR, display: "flex",
      alignItems: "center", paddingLeft: 16, gap: 18, fontFamily: inter.fontFamily,
      fontWeight: 600, fontSize: 11, color: T_MID }}>
      <span style={{ color: m.c, fontWeight: 800 }}>{m.name}</span>
      <span style={{ fontVariantNumeric: "tabular-nums" }}>
        {412 + (Math.floor(f / 3) % 40)} tokens
      </span>
      <span style={{ fontVariantNumeric: "tabular-nums" }}>{(0.4 + model * 0.17).toFixed(2)}s</span>
      <span style={{ marginLeft: "auto", marginRight: 14 }}>history: localStorage</span>
    </div>
  );
};

/* -------------------------------------------------------------- model grid -- */
const GRID_NAMES = ["GPT-5", "Claude", "Gemini", "Grok", "DeepSeek", "Llama 3.3",
                    "Qwen 2.5", "Mistral", "Ollama", "Router", "HF", "Perplexity"];
const GRID_SPEC = ["128k ctx", "200k ctx", "1M ctx", "128k ctx", "64k ctx", "128k ctx",
                   "32k ctx", "32k ctx", "runs local", "60 models", "hosted", "web search"];

export const ModelGrid: React.FC<{
  f: number; left: number; at?: number; cols?: number; rows?: number;
}> = ({ f, left, at = 0, cols = 4, rows = 2 }) => (<>
  {Array.from({ length: cols * rows }, (_, i) => {
    const c = i % cols, r = Math.floor(i / cols);
    const t = E(f, at + i * 2, at + 15 + i * 2, 0, 1, BACK);
    return (
      <div key={i} style={{ position: "absolute", left: left + 22 + c * 218,
        top: 16 + r * 150, width: 202, height: 134, borderRadius: 12, background: W_BODY,
        border: `2px solid ${W_EDGE}`, boxShadow: SH_CARD,
        transform: `scale(${t})`, opacity: Math.min(1, t * 1.6), paddingLeft: 15,
        display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 9, background: "#F6F4EF",
            border: `2px solid ${W_EDGE2}`, display: "flex", alignItems: "center",
            justifyContent: "center" }}>
            <Img src={staticFile(`logos/${LOGOS[i % LOGOS.length]}`)}
                 style={{ width: 22, height: 22, objectFit: "contain" }} />
          </div>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 17,
            color: T_HI }}>{GRID_NAMES[i % GRID_NAMES.length]}</div>
        </div>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 12,
          color: T_LO, marginBottom: 8 }}>{GRID_SPEC[i % GRID_SPEC.length]}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%",
            background: (Math.floor(f / 9) + i) % 7 === 0 ? "#5FD9A6" : GO }} />
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 12,
            color: T_MID }}>ready · {(0.3 + (i % 6) * 0.14).toFixed(2)}s</div>
        </div>
      </div>
    );
  })}
</>);

/* =========================================================================
   CLASSIC MODE — FIVE PANES, FIVE DIFFERENT PRODUCTS.

   ⛔ Five identical white cards with a logo on top is a CHART, not a race
      between real products. Each pane now wears its own app's interface:
      ChatGPT's white-and-green, Claude's warm ivory, Gemini's Google blue,
      Grok's black, DeepSeek's cobalt. You recognise which one is winning
      before you read a single word, which is the whole point of the beat.

   Brand values are the products' own public UI colours.
   ========================================================================= */
type Brand = {
  name: string; model: string; bg: string; fg: string; sub: string;
  accent: string; bar: string; chip: string; dark: boolean;
};
const BRANDS: Brand[] = [
  { name: "ChatGPT",  model: "GPT-5",      bg: "#FFFFFF", fg: "#0D0D0D", sub: "#8E8EA0",
    accent: "#10A37F", bar: "#ECECF1", chip: "#F4F4F5", dark: false },
  { name: "Claude",   model: "Sonnet 4.5", bg: "#F5F1EB", fg: "#1F1E1D", sub: "#8A8781",
    accent: "#D97757", bar: "#E6DFD3", chip: "#EDE6DA", dark: false },
  { name: "Gemini",   model: "2.5 Pro",    bg: "#FFFFFF", fg: "#1F1F1F", sub: "#80868B",
    accent: "#4285F4", bar: "#E8EAED", chip: "#F1F3F4", dark: false },
  { name: "Grok",     model: "Grok 4",     bg: "#000000", fg: "#FFFFFF", sub: "#71767B",
    accent: "#1D9BF0", bar: "#202327", chip: "#16181C", dark: true },
  { name: "DeepSeek", model: "V3",         bg: "#FFFFFF", fg: "#1A1A1A", sub: "#8A8A8A",
    accent: "#4D6BFE", bar: "#E9EDFF", chip: "#F0F3FF", dark: false },
];

export const RacePanes: React.FC<{
  f: number; left: number; w: number; h: number; at?: number;
}> = ({ f, left, w, h, at = 0 }) => {
  const pw = (w - 22 * 2 - 4 * 10) / 5;
  return (<>
    {RACERS.map((m, i) => {
      const b = BRANDS[i];
      const speed = 1 - i * 0.13;
      const done = E(f, at + i, at + 46, 0, 1, OUT) * speed;
      const lead = i === 0;
      const H = h - 34;
      return (
        <div key={m.name} style={{ position: "absolute", left: left + 22 + i * (pw + 10),
          top: 16, width: pw, height: H, borderRadius: 12, background: b.bg,
          border: `2px solid ${lead ? GOLD : b.dark ? "#2F3336" : W_EDGE}`,
          boxShadow: SH_CARD, overflow: "hidden",
          transform: `scale(${E(f, at + i * 2, at + 14 + i * 2, 0.86, 1, BACK)})` }}>

          {/* the product's own header bar */}
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 36,
            borderBottom: `1px solid ${b.dark ? "#2F3336" : b.bar}`,
            display: "flex", alignItems: "center", gap: 7, paddingLeft: 9 }}>
            <div style={{ width: 22, height: 22, borderRadius: 6, background: CARD,
              display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Img src={staticFile(`logos/${m.logo}`)}
                   style={{ width: 14, height: 14, objectFit: "contain" }} />
            </div>
            <div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 13,
              color: b.fg }}>{b.name}</div>
            <div style={{ marginLeft: "auto", marginRight: 8, display: "flex", gap: 3 }}>
              {[0, 1, 2].map((k) => (
                <div key={k} style={{ width: 3, height: 3, borderRadius: "50%",
                  background: b.sub }} />
              ))}
            </div>
          </div>

          {/* the model chip, in the product's own accent */}
          <div style={{ position: "absolute", left: 9, top: 45, padding: "2px 7px",
            borderRadius: 5, background: b.chip, border: `1px solid ${b.dark ? "#2F3336" : b.bar}`,
            fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 10,
            color: b.accent }}>{b.model}</div>

          {/* the user's prompt, echoed the way each app echoes it */}
          <div style={{ position: "absolute", right: 9, top: 70, maxWidth: pw - 34,
            padding: "5px 8px", borderRadius: "9px 9px 3px 9px",
            background: b.dark ? "#202327" : b.chip,
            fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 9.5,
            color: b.sub, whiteSpace: "nowrap", overflow: "hidden" }}>launch email</div>

          {/* the answer streaming at this model's own rate */}
          {[0, 1, 2, 3, 4, 5].map((k) => {
            const seg = Math.max(0, Math.min(1, done * 6 - k));
            return (
              <div key={k} style={{ position: "absolute", left: 10, top: 104 + k * 18,
                width: (pw - 20) * [0.94, 0.8, 0.9, 0.66, 0.86, 0.56][k], height: 8,
                borderRadius: 4, background: k === 0 ? b.accent : b.bar,
                transform: `scaleX(${seg})`, transformOrigin: "0% 50%" }} />
            );
          })}

          {/* a typing dot while it is still going, a tick when it is done */}
          {done < 0.99 ? (
            <div style={{ position: "absolute", left: 10, top: 104 + 6 * 18 + 4,
              display: "flex", gap: 4 }}>
              {[0, 1, 2].map((k) => (
                <div key={k} style={{ width: 5, height: 5, borderRadius: "50%",
                  background: b.accent,
                  opacity: (Math.floor(f / 5) + k) % 3 === 0 ? 1 : 0.3 }} />
              ))}
            </div>
          ) : (
            <div style={{ position: "absolute", left: 9, top: 104 + 6 * 18,
              display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 13, height: 13, borderRadius: "50%", background: b.accent,
                display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width={8} height={8} viewBox="0 0 24 24">
                  <path d="M4 12.5 L9.5 18 L20 6.5" fill="none" stroke="#FFFFFF"
                        strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 9.5,
                color: b.sub }}>done</span>
            </div>
          )}

          {/* the product's own composer, and the clock */}
          <div style={{ position: "absolute", left: 9, right: 9, bottom: 30, height: 22,
            borderRadius: 11, background: b.dark ? "#16181C" : b.chip,
            border: `1px solid ${b.dark ? "#2F3336" : b.bar}`, display: "flex",
            alignItems: "center", paddingLeft: 8 }}>
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 8.5,
              color: b.sub }}>Message {b.name}</span>
            <div style={{ marginLeft: "auto", marginRight: 3, width: 16, height: 16,
              borderRadius: "50%", background: b.accent }} />
          </div>
          <div style={{ position: "absolute", left: 10, bottom: 9,
            fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 12, color: b.sub,
            fontVariantNumeric: "tabular-nums" }}>
            {Math.min(E(f, at, at + 46, 0, 1.34, OUT), 0.53 + i * 0.19).toFixed(2)}s
          </div>
          {lead && done > 0.9 && (
            <div style={{ position: "absolute", right: 8, bottom: 8, padding: "3px 8px",
              borderRadius: 6, background: INKD, fontFamily: inter.fontFamily,
              fontWeight: 800, fontSize: 10, color: GOLD }}>fastest</div>
          )}
        </div>
      );
    })}
  </>);
};

/* =========================================================================
   THE GITHUB PAGE — a replica, not a wireframe.

   ⛔ REALISM IS DENSITY AND SMALL TYPE. A real 940px-wide page shows ~60
      elements at 11-14px. The first version showed 8 at 23px and read as a
      mockup blown up. Every filename and size below is REAL, read from the
      repo tree on 2026-08-02; stars and forks are the verified 10,055 / 2,362.
   ========================================================================= */
const G_BG = "#FFFFFF", G_HDR = "#F6F8FA", G_EDGE = "#D1D9E0";
const G_TXT = "#1F2328", G_DIM = "#59636E", G_LINK = "#0969DA", G_BTN = "#1F883D";

const FILES: [string, string, string, string][] = [
  ["dir",  "HF",           "hf: dataset + autotune routes",    "3 days ago"],
  ["dir",  "src",          "refactor SettingsModal",           "2 days ago"],
  ["file", "API.md",       "docs: document /completions",      "6 days ago"],
  ["file", "README.md",    "readme: add Venice + local setup", "yesterday"],
  ["file", "index.html",   "build: single-file bundle",        "yesterday"],
  ["file", "package.json", "chore: bump deps",                 "5 days ago"],
];

export const GitHubPage: React.FC<{ f: number; dl?: number }> = ({ f, dl = 0 }) => (
  <div style={{ position: "absolute", inset: 0, background: G_BG, overflow: "hidden" }}>
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 38,
      background: "#F6F8FA", borderBottom: `1px solid ${G_EDGE}`, display: "flex",
      alignItems: "center", paddingLeft: 14, gap: 12 }}>
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 15,
        color: G_TXT }}>☰</div>
      <Img src={staticFile("logos/github.svg")} style={{ width: 21, height: 21 }} />
      <div style={{ width: 224, height: 22, borderRadius: 6, border: `1px solid ${G_EDGE}`,
        background: G_BG, display: "flex", alignItems: "center", paddingLeft: 8,
        fontFamily: inter.fontFamily, fontWeight: 500, fontSize: 11, color: "#818B98" }}>
        Type <span style={{ margin: "0 3px", padding: "0 4px", border: `1px solid ${G_EDGE}`,
          borderRadius: 3 }}>/</span> to search
      </div>
      <div style={{ marginLeft: "auto", marginRight: 14, display: "flex", alignItems: "center",
        gap: 11 }}>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 13,
          color: G_DIM }}>+ ▾</div>
        <div style={{ width: 21, height: 21, borderRadius: "50%", background: "#D0D7DE" }} />
      </div>
    </div>

    <div style={{ position: "absolute", left: 20, top: 50, display: "flex",
      alignItems: "center", gap: 7 }}>
      <div style={{ width: 15, height: 15, borderRadius: 3, border: `2px solid ${G_DIM}` }} />
      <span style={{ fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 18,
        color: G_LINK }}>{STATS.owner}</span>
      <span style={{ fontFamily: inter.fontFamily, fontWeight: 400, fontSize: 18,
        color: G_DIM }}>/</span>
      <span style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 18,
        color: G_LINK }}>{STATS.repo}</span>
      <span style={{ marginLeft: 5, padding: "1px 7px", borderRadius: 9,
        border: `1px solid ${G_EDGE}`, fontFamily: inter.fontFamily, fontWeight: 500,
        fontSize: 11, color: G_DIM }}>Public</span>
    </div>

    <div style={{ position: "absolute", right: 20, top: 46, display: "flex", gap: 7 }}>
      {[["Watch", "63"], ["Fork", "2.4k"], ["Star", "10k"]].map(([l, n], i) => (
        <div key={l} style={{ height: 26, borderRadius: 6, border: `1px solid ${G_EDGE}`,
          background: G_HDR, display: "flex", alignItems: "center", paddingLeft: 9,
          paddingRight: 3, gap: 6 }}>
          <span style={{ fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 11,
            color: G_TXT }}>{i === 2 ? "★ " : ""}{l}</span>
          <span style={{ padding: "1px 6px", borderRadius: 9, background: "#EFF2F5",
            fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 10, color: G_TXT }}>{n}</span>
        </div>
      ))}
    </div>

    <div style={{ position: "absolute", left: 20, right: 20, top: 82, height: 30,
      display: "flex", alignItems: "flex-end", gap: 15, borderBottom: `1px solid ${G_EDGE}` }}>
      {[["Code", ""], ["Issues", "12"], ["Pull requests", "3"], ["Actions", ""],
        ["Projects", ""], ["Security", ""], ["Insights", ""]].map(([t, n], i) => (
        <div key={t} style={{ position: "relative", paddingBottom: 7, display: "flex",
          alignItems: "center", gap: 5 }}>
          <span style={{ fontFamily: inter.fontFamily, fontWeight: i === 0 ? 600 : 400,
            fontSize: 12, color: G_TXT }}>{t}</span>
          {n && <span style={{ padding: "0 5px", borderRadius: 8, background: "#EFF2F5",
            fontFamily: inter.fontFamily, fontWeight: 500, fontSize: 10, color: G_DIM }}>{n}</span>}
          {i === 0 && <div style={{ position: "absolute", left: 0, right: 0, bottom: 0,
            height: 2, borderRadius: 2, background: "#FD8C73" }} />}
        </div>
      ))}
    </div>

    <div style={{ position: "absolute", left: 20, top: 124, display: "flex",
      alignItems: "center", gap: 10 }}>
      <div style={{ height: 26, borderRadius: 6, border: `1px solid ${G_EDGE}`,
        background: G_HDR, display: "flex", alignItems: "center", padding: "0 10px", gap: 6,
        fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 11, color: G_TXT }}>
        ⑂ main ▾
      </div>
      <span style={{ fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 11,
        color: G_TXT }}>1 <span style={{ color: G_DIM, fontWeight: 400 }}>Branch</span></span>
      <span style={{ fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 11,
        color: G_TXT }}>0 <span style={{ color: G_DIM, fontWeight: 400 }}>Tags</span></span>
    </div>
    <div style={{ position: "absolute", right: 296, top: 124, display: "flex", gap: 7 }}>
      {["Go to file", "Add file ▾"].map((l) => (
        <div key={l} style={{ height: 26, borderRadius: 6, border: `1px solid ${G_EDGE}`,
          background: G_HDR, display: "flex", alignItems: "center", padding: "0 10px",
          fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 11, color: G_TXT }}>{l}</div>
      ))}
      <div style={{ height: 26, borderRadius: 6, background: G_BTN, display: "flex",
        alignItems: "center", padding: "0 12px",
        fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 11, color: "#FFFFFF" }}>
        {"<> Code ▾"}
      </div>
    </div>

    <div style={{ position: "absolute", left: 20, top: 160, right: 296, bottom: 14,
      borderRadius: 7, border: `1px solid ${G_EDGE}`, overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 40,
        background: G_HDR, borderBottom: `1px solid ${G_EDGE}`, display: "flex",
        alignItems: "center", paddingLeft: 12, gap: 8 }}>
        <div style={{ width: 19, height: 19, borderRadius: "50%", background: "#C9D1D9" }} />
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 11,
          color: G_TXT }}>{STATS.owner}</span>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 400, fontSize: 11,
          color: G_DIM }}>build: single-file bundle</span>
        <span style={{ marginLeft: "auto", marginRight: 12, fontFamily: inter.fontFamily,
          fontWeight: 400, fontSize: 11, color: G_DIM }}>a3f19c2 · yesterday · 214 commits</span>
      </div>
      {FILES.map(([kind, name, msg, when], i) => {
        const hot = name === STATS.file;
        return (
          <div key={name} style={{ position: "absolute", left: 0, right: 0, top: 40 + i * 33,
            height: 33, borderBottom: `1px solid ${G_EDGE}`, display: "flex",
            alignItems: "center", paddingLeft: 12, gap: 9,
            background: hot ? "#FFF8C5" : "transparent" }}>
            {kind === "dir"
              ? <div style={{ width: 14, height: 11, borderRadius: 2, background: "#54AEFF" }} />
              : <div style={{ width: 11, height: 14, borderRadius: 2,
                  background: hot ? CLAY : "#818B98" }} />}
            <span style={{ width: 168, fontFamily: inter.fontFamily,
              fontWeight: hot ? 700 : 400, fontSize: 12, color: G_TXT }}>{name}</span>
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 400, fontSize: 11,
              color: G_DIM }}>{msg}</span>
            <span style={{ marginLeft: "auto", marginRight: 12, fontFamily: inter.fontFamily,
              fontWeight: 400, fontSize: 11, color: G_DIM }}>{when}</span>
          </div>
        );
      })}
    </div>

    <div style={{ position: "absolute", right: 20, top: 160, width: 264 }}>
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 13,
        color: G_TXT, marginBottom: 7 }}>About</div>
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 400, fontSize: 11.5,
        color: G_DIM, lineHeight: 1.5, marginBottom: 9 }}>
        LIBERATED AI CHAT. A single-file client for 60+ models. No build step.
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 11 }}>
        {["ai", "llm", "openrouter", "single-file", "chat"].map((t) => (
          <div key={t} style={{ padding: "2px 8px", borderRadius: 9, background: "#DDF4FF",
            fontFamily: inter.fontFamily, fontWeight: 500, fontSize: 10.5, color: G_LINK }}>{t}</div>
        ))}
      </div>
      {[["★", "10,055 stars"], ["⑂", "2,362 forks"], ["◉", "63 watching"],
        ["⚖", "AGPL-3.0 license"]].map(([g, l]) => (
        <div key={l} style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 6 }}>
          <span style={{ fontSize: 11, color: G_DIM, width: 12 }}>{g}</span>
          <span style={{ fontFamily: inter.fontFamily, fontWeight: 400, fontSize: 11.5,
            color: G_DIM }}>{l}</span>
        </div>
      ))}
      <div style={{ height: 1, background: G_EDGE, margin: "11px 0" }} />
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 13,
        color: G_TXT, marginBottom: 8 }}>Languages</div>
      <div style={{ display: "flex", height: 8, borderRadius: 4, overflow: "hidden",
        marginBottom: 8 }}>
        {[["#3178C6", 63], ["#E34C26", 26], ["#F1E05A", 8], ["#563D7C", 3]].map(([c, w], i) => (
          <div key={i} style={{ width: `${w}%`, background: c as string }} />
        ))}
      </div>
      {[["TypeScript", "63.4%", "#3178C6"], ["HTML", "26.1%", "#E34C26"],
        ["JavaScript", "8.2%", "#F1E05A"]].map(([l, pc, c]) => (
        <div key={l} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />
          <span style={{ fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 11,
            color: G_TXT }}>{l}</span>
          <span style={{ fontFamily: inter.fontFamily, fontWeight: 400, fontSize: 11,
            color: G_DIM }}>{pc}</span>
        </div>
      ))}
    </div>

    {dl > 0.01 && (
      <div style={{ position: "absolute", right: 22, bottom: 18, width: 268, height: 52,
        borderRadius: 7, background: G_BG, border: `1px solid ${G_EDGE}`,
        boxShadow: "0 6px 18px rgba(31,35,40,0.18)", paddingLeft: 11, paddingTop: 8,
        transform: `translateY(${(1 - Math.min(1, dl * 3)) * 60}px)` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <div style={{ width: 11, height: 14, borderRadius: 2, background: CLAY }} />
          <span style={{ fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 11.5,
            color: G_TXT }}>index.html</span>
          <span style={{ marginLeft: "auto", marginRight: 11, fontFamily: inter.fontFamily,
            fontWeight: 400, fontSize: 10.5, color: G_DIM }}>
            {Math.round(Math.min(1, dl) * 100)}%
          </span>
        </div>
        <div style={{ marginTop: 8, marginRight: 11, height: 5, borderRadius: 3,
          background: "#EFF2F5", overflow: "hidden" }}>
          <div style={{ width: `${Math.min(1, dl) * 100}%`, height: "100%", background: G_BTN }} />
        </div>
      </div>
    )}
  </div>
);
