import React from "react";
import { Img, staticFile } from "remotion";
import { inter } from "./fonts";
import { E, osc, rnd, OUT, IO, BACK, SH, SH_D } from "./MissionWorld";
import { CARD, INKD, MUTE, RED, AMBER, GO, BLUE, PLUM, TEAL } from "./DraftWorld";
import { GH_BG, GH_SUBTLE, GH_BORDER, GH_TEXT, GH_MUTED, GH_LINK, Octocat } from "./RolesGitHub";

/* =========================================================================
   REEL 84 "ROLES" · ELEVATED UI + REAL LOGOS.

   Two notes built this file:
     "there should be graphical icons for each of these boxes"
     "the scenes after the midpoint need to be more intentional with the design,
      not looking so basic, a lot more elevated, especially the UI screens"
     "for the graphic at 11 seconds you need the official logos for those
      companies in there as well"

   ⛔ REAL marks, not coloured squares. Sourced from the Simple Icons CDN and
   saved LOCALLY to public/logos/ so a render never depends on the network and
   can never silently ship a 404 tile (memory `reel-brand-logo-sourcing`).
   All 18 were HTTP-verified before download; zed / openai / continue / aider /
   codeium / tabnine have no Simple Icons entry and are not used.

   ⛔ Marks are drawn BLACK on cream tiles, not in brand colours. Eighteen brand
   palettes at 40px reads as confetti; a monochrome logo wall reads as a product
   page. The colour variety lives in the tile's accent bar instead, which keeps
   the matte-paint rule intact (no neon, no glow).
   ========================================================================= */

/** the 18 tools, in the order they tile */
export const TOOLS: { slug: string; name: string }[] = [
  { slug: "claude",        name: "Claude Code" },
  { slug: "cursor",        name: "Cursor" },
  { slug: "githubcopilot", name: "Copilot" },
  { slug: "windsurf",      name: "Windsurf" },
  { slug: "cline",         name: "Cline" },
  { slug: "googlegemini",  name: "Gemini" },
  { slug: "warp",          name: "Warp" },
  { slug: "jetbrains",     name: "JetBrains" },
  { slug: "intellijidea",  name: "IntelliJ" },
  { slug: "pycharm",       name: "PyCharm" },
  { slug: "webstorm",      name: "WebStorm" },
  { slug: "androidstudio", name: "Android Studio" },
  { slug: "neovim",        name: "Neovim" },
  { slug: "vim",           name: "Vim" },
  { slug: "sublimetext",   name: "Sublime" },
  { slug: "eclipseide",    name: "Eclipse" },
  { slug: "xcode",         name: "Xcode" },
  { slug: "replit",        name: "Replit" },
];

/** one real brand mark, from the local pack */
export const ToolLogo: React.FC<{ slug: string; s?: number; z?: number }> = ({ slug, s = 40, z }) => (
  <Img src={staticFile(`logos/${slug}.svg`)}
       style={{ width: s, height: s, objectFit: "contain", display: "block", zIndex: z }} />
);

/** a tile in the rack of 18: real mark, name, and a coloured accent bar */
export const ToolTile: React.FC<{
  x: number; y: number; w?: number; h?: number; slug: string; name: string; c?: string;
  t?: number; z?: number;
}> = ({ x, y, w = 96, h = 104, slug, name, c = AMBER, t = 1, z = 20 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, borderRadius: 11,
    background: CARD, boxShadow: SH_D, zIndex: z, overflow: "hidden",
    transform: `scale(${Math.max(0.02, t)})` }}>
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 6, background: c }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 20, display: "flex",
      justifyContent: "center" }}>
      <ToolLogo slug={slug} s={w * 0.42} />
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 9, textAlign: "center",
      fontFamily: inter.fontFamily, fontWeight: 800, fontSize: w * 0.115, letterSpacing: "-0.01em",
      color: "#6E6452", padding: "0 4px", whiteSpace: "nowrap", overflow: "hidden" }}>{name}</div>
  </div>
);

/* ===================================================== the empty chat, done properly ==
   The villain used to be a grey rectangle with a caret. It is the single most
   recognisable UI in the reel's whole subject, so it is now drawn as one: model
   pill, placeholder, attach + voice controls, a send button, suggestion chips.
   ==================================================================================== */
export const ChatCompose: React.FC<{
  f: number; x: number; y: number; w?: number; typed?: string; n?: number;
  dead?: boolean; z?: number;
}> = ({ f, x, y, w = 470, typed, n, dead = false, z = 22 }) => {
  const k = w / 470;
  const shown = typed !== undefined ? typed.slice(0, n ?? typed.length) : "";
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, zIndex: z,
      fontFamily: inter.fontFamily,
      filter: "drop-shadow(0 12px 16px rgba(6,10,16,0.5))" }}>
      {/* the compose box */}
      <div style={{ width: w, borderRadius: 18 * k, background: dead ? "#F3F0E9" : "#FFFFFF",
        border: `2px solid ${dead ? "#D9D3C6" : "#D0D7DE"}`, overflow: "hidden" }}>
        {/* the model pill */}
        <div style={{ display: "flex", alignItems: "center", gap: 7 * k,
          padding: `${11 * k}px ${16 * k}px ${4 * k}px` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 * k,
            padding: `${4 * k}px ${10 * k}px`, borderRadius: 20 * k, background: GH_SUBTLE,
            border: `1px solid ${GH_BORDER}` }}>
            <div style={{ width: 12 * k, height: 12 * k, borderRadius: 3 * k, background: "#C96442" }} />
            <div style={{ fontSize: 13 * k, fontWeight: 700, color: GH_TEXT }}>Claude Sonnet</div>
            <div style={{ fontSize: 10 * k, color: GH_MUTED }}>▾</div>
          </div>
        </div>
        {/* the input line */}
        <div style={{ padding: `${6 * k}px ${18 * k}px ${14 * k}px`, minHeight: 46 * k }}>
          <div style={{ fontSize: 20 * k, fontWeight: 500, lineHeight: 1.35,
            color: shown ? GH_TEXT : "#A8AFB8" }}>
            {shown || "How can I help you today?"}
            <span style={{ color: GH_TEXT, opacity: (f % 24) < 13 ? 1 : 0 }}>▌</span>
          </div>
        </div>
        {/* the control row */}
        <div style={{ display: "flex", alignItems: "center", gap: 9 * k,
          padding: `0 ${14 * k}px ${13 * k}px` }}>
          {["+", "⌘", "🎙"].map((g, i) => (
            <div key={i} style={{ width: 32 * k, height: 32 * k, borderRadius: 9 * k,
              background: GH_SUBTLE, border: `1px solid ${GH_BORDER}`, display: "flex",
              alignItems: "center", justifyContent: "center", fontSize: 15 * k, color: GH_MUTED }}>{g}</div>
          ))}
          <div style={{ flex: 1 }} />
          <div style={{ width: 36 * k, height: 36 * k, borderRadius: 10 * k,
            background: dead ? "#C9C2B4" : "#C96442", display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: 17 * k, color: "#FFF8ED", fontWeight: 900 }}>↑</div>
        </div>
      </div>
      {/* suggestion chips — the tell that nothing here knows who it is */}
      <div style={{ display: "flex", gap: 8 * k, marginTop: 11 * k }}>
        {["Write something", "Analyse data", "Help me code"].map((s) => (
          <div key={s} style={{ padding: `${6 * k}px ${12 * k}px`, borderRadius: 9 * k,
            background: "#FFFFFF", border: `1px solid ${GH_BORDER}`, fontSize: 12.5 * k,
            fontWeight: 600, color: GH_MUTED, whiteSpace: "nowrap" }}>{s}</div>
        ))}
      </div>
    </div>
  );
};

/* ================================================= the landing page they build ==
   Was three coloured bands. Now an actual page: nav, hero with a real CTA, a
   three-card feature row, a footer. Each region carries the tag of whoever
   built it, which is the whole point of the beat.
   ============================================================================= */
export const LandingPage: React.FC<{
  f: number; x: number; y: number; w?: number; h?: number; at?: number; z?: number;
}> = ({ f, x, y, w = 620, h = 400, at = 0, z = 20 }) => {
  const k = w / 620;
  const A = E(f, at + 1, at + 17, 0, 1, OUT);      // designer: nav + shell
  const B = E(f, at + 12, at + 30, 0, 1, OUT);     // writer: the words
  const C = E(f, at + 24, at + 42, 0, 1, OUT);     // engineer: the feature cards
  const Tag: React.FC<{ tx: number; ty: number; c: string; s: string; t: number }> =
    ({ tx, ty, c, s, t }) => (
    <div style={{ position: "absolute", left: tx, top: ty, padding: `${4 * k}px ${10 * k}px`,
      borderRadius: 6 * k, background: c, zIndex: 40, opacity: t,
      fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 12 * k, letterSpacing: "0.11em",
      color: "#FFF8ED", whiteSpace: "nowrap" }}>{s}</div>
  );
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
      borderRadius: 14 * k, background: "#FFFFFF", overflow: "hidden", boxShadow: SH_D,
      fontFamily: inter.fontFamily }}>
      {/* browser chrome, so it reads as a shipped page and not a poster */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 34 * k,
        background: "#EDEAE3", display: "flex", alignItems: "center", gap: 6 * k,
        paddingLeft: 12 * k, borderBottom: `1px solid #DCD6C9` }}>
        {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
          <div key={c} style={{ width: 9 * k, height: 9 * k, borderRadius: "50%", background: c }} />
        ))}
        <div style={{ marginLeft: 10 * k, width: 190 * k, height: 17 * k, borderRadius: 9 * k,
          background: "#FFFFFF", border: `1px solid #DCD6C9` }} />
      </div>

      {/* nav — designer */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 34 * k, height: 40 * k,
        display: "flex", alignItems: "center", paddingLeft: 20 * k, paddingRight: 20 * k,
        gap: 16 * k, opacity: A, transform: `translateY(${(1 - A) * -22}px)` }}>
        <div style={{ width: 22 * k, height: 22 * k, borderRadius: 6 * k, background: PLUM }} />
        <div style={{ width: 58 * k, height: 9 * k, borderRadius: 4 * k, background: "#3A3730" }} />
        <div style={{ flex: 1 }} />
        {[42, 36, 48].map((wd, i) => (
          <div key={i} style={{ width: wd * k, height: 7 * k, borderRadius: 4 * k,
            background: "#C9C3B6" }} />
        ))}
        <div style={{ width: 74 * k, height: 26 * k, borderRadius: 7 * k, background: PLUM }} />
      </div>

      {/* hero — writer supplies the words, designer the block */}
      <div style={{ position: "absolute", left: 20 * k, top: 88 * k, width: 340 * k }}>
        <div style={{ height: 22 * k, width: 300 * k * B, borderRadius: 5 * k, background: "#26221C",
          marginBottom: 9 * k }} />
        <div style={{ height: 22 * k, width: 214 * k * B, borderRadius: 5 * k, background: "#26221C",
          marginBottom: 14 * k }} />
        <div style={{ height: 9 * k, width: 288 * k * B, borderRadius: 4 * k, background: "#B4AE9F",
          marginBottom: 7 * k }} />
        <div style={{ height: 9 * k, width: 236 * k * B, borderRadius: 4 * k, background: "#B4AE9F",
          marginBottom: 18 * k }} />
        <div style={{ display: "flex", gap: 10 * k, opacity: A }}>
          <div style={{ width: 108 * k, height: 34 * k, borderRadius: 8 * k, background: GO }} />
          <div style={{ width: 90 * k, height: 34 * k, borderRadius: 8 * k, background: "#FFFFFF",
            border: `2px solid #D6D0C3` }} />
        </div>
      </div>
      <div style={{ position: "absolute", right: 20 * k, top: 92 * k, width: 218 * k, height: 148 * k,
        borderRadius: 11 * k, background: "#EFE9F5", border: `2px solid ${PLUM}`,
        opacity: A, transform: `scale(${0.9 + A * 0.1})` }}>
        <div style={{ position: "absolute", left: 22 * k, top: 26 * k, width: 92 * k, height: 92 * k,
          borderRadius: 10 * k, background: PLUM }} />
        <div style={{ position: "absolute", right: 20 * k, top: 34 * k, width: 62 * k, height: 10 * k,
          borderRadius: 4 * k, background: "#B7A6C9" }} />
        <div style={{ position: "absolute", right: 20 * k, top: 54 * k, width: 44 * k, height: 10 * k,
          borderRadius: 4 * k, background: "#B7A6C9" }} />
      </div>

      {/* feature row — engineer */}
      <div style={{ position: "absolute", left: 20 * k, right: 20 * k, top: 262 * k, height: 96 * k,
        display: "flex", gap: 14 * k }}>
        {[0, 1, 2].map((i) => {
          const t = E(f, at + 24 + i * 5, at + 40 + i * 5, 0, 1, BACK);
          return (
            <div key={i} style={{ flex: 1, borderRadius: 10 * k, background: "#FBF6EC",
              border: `2px solid ${AMBER}`, transform: `translateY(${(1 - t) * 90}px)`, opacity: t,
              position: "relative" }}>
              <div style={{ position: "absolute", left: 14 * k, top: 14 * k, width: 26 * k,
                height: 26 * k, borderRadius: 7 * k, background: AMBER }} />
              <div style={{ position: "absolute", left: 14 * k, top: 50 * k, width: 92 * k,
                height: 8 * k, borderRadius: 4 * k, background: "#D2C3A8" }} />
              <div style={{ position: "absolute", left: 14 * k, top: 66 * k, width: 64 * k,
                height: 8 * k, borderRadius: 4 * k, background: "#D2C3A8" }} />
            </div>
          );
        })}
      </div>

      {/* who built what */}
      <Tag tx={20 * k} ty={44 * k}  c={PLUM}  s="DESIGNER" t={A} />
      <Tag tx={20 * k} ty={196 * k} c={GO}    s="WRITER"   t={B} />
      <Tag tx={20 * k} ty={366 * k} c={AMBER} s="ENGINEER" t={C} />
    </div>
  );
};

/* ============================================ the broadcast shot clock ==
   Was a number in a box. Now a rack-mounted clock with a bezel, seven-segment
   digits and a status lamp, next to a real editor showing the brief being typed.
   ====================================================================== */
const SEG: Record<string, number[]> = {
  "0": [1,1,1,1,1,1,0], "1": [0,1,1,0,0,0,0], "2": [1,1,0,1,1,0,1], "3": [1,1,1,1,0,0,1],
  "4": [0,1,1,0,0,1,1], "5": [1,0,1,1,0,1,1], "6": [1,0,1,1,1,1,1], "7": [1,1,1,0,0,0,0],
  "8": [1,1,1,1,1,1,1], "9": [1,1,1,1,0,1,1],
};

const Digit: React.FC<{ d: string; s?: number; c?: string; off?: string }> =
  ({ d, s = 1, c = RED, off = "#2A1614" }) => {
  const on = SEG[d] ?? SEG["0"];
  const W = 46 * s, H = 84 * s, T = 9 * s;
  const bar = (i: number, st: React.CSSProperties) => (
    <div key={i} style={{ position: "absolute", background: on[i] ? c : off, ...st }} />
  );
  return (
    <div style={{ position: "relative", width: W, height: H }}>
      {bar(0, { left: T * 0.6, top: 0, width: W - T * 1.2, height: T })}
      {bar(1, { right: 0, top: T * 0.6, width: T, height: H / 2 - T })}
      {bar(2, { right: 0, top: H / 2 + T * 0.2, width: T, height: H / 2 - T })}
      {bar(3, { left: T * 0.6, bottom: 0, width: W - T * 1.2, height: T })}
      {bar(4, { left: 0, top: H / 2 + T * 0.2, width: T, height: H / 2 - T })}
      {bar(5, { left: 0, top: T * 0.6, width: T, height: H / 2 - T })}
      {bar(6, { left: T * 0.6, top: H / 2 - T / 2, width: W - T * 1.2, height: T })}
    </div>
  );
};

export const ShotClock: React.FC<{
  f: number; x: number; y: number; s?: number; secs: number; z?: number;
}> = ({ f, x, y, s = 1, secs, z = 20 }) => {
  const mm = Math.floor(Math.max(0, secs) / 60), ss = Math.floor(Math.max(0, secs) % 60);
  const txt = `${mm}${String(ss).padStart(2, "0")}`;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z,
      filter: "drop-shadow(0 14px 18px rgba(6,10,16,0.6))" }}>
      {/* the rack it hangs in */}
      <div style={{ position: "absolute", left: -14 * s, top: -14 * s, width: 300 * s, height: 152 * s,
        borderRadius: 12 * s, background: "#28323C" }} />
      <div style={{ position: "absolute", left: -6 * s, top: -6 * s, width: 284 * s, height: 136 * s,
        borderRadius: 8 * s, background: "#12181E" }} />
      <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 7 * s,
        padding: `${12 * s}px ${14 * s}px` }}>
        <Digit d={txt[0]} s={s} />
        <div style={{ width: 11 * s }}>
          {[0, 1].map((i) => (
            <div key={i} style={{ width: 11 * s, height: 11 * s, borderRadius: 3 * s,
              background: (f % 30) < 15 ? RED : "#2A1614", marginTop: i ? 34 * s : 20 * s }} />
          ))}
        </div>
        <Digit d={txt[1]} s={s} />
        <Digit d={txt[2]} s={s} />
      </div>
      {/* the status lamp + label plate */}
      <div style={{ position: "absolute", left: -6 * s, top: 136 * s, width: 284 * s, height: 30 * s,
        borderRadius: "0 0 8px 8px", background: "#1B242D", display: "flex", alignItems: "center",
        gap: 8 * s, paddingLeft: 12 * s }}>
        <div style={{ width: 10 * s, height: 10 * s, borderRadius: "50%",
          background: (Math.floor(f / 12) % 2) ? RED : "#3A2320" }} />
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 12 * s,
          letterSpacing: "0.2em", color: "#7A8894" }}>DESCRIBING A PERSON</div>
      </div>
    </div>
  );
};

/** the persona brief being typed, in a real editor with a gutter */
export const BriefEditor: React.FC<{
  f: number; x: number; y: number; w?: number; h?: number; at?: number; z?: number;
}> = ({ f, x, y, w = 470, h = 240, at = 0, z = 20 }) => {
  const k = w / 470;
  const LINES = [
    "You are a senior product designer",
    "with 10+ years at consumer startups.",
    "You care about hierarchy, contrast",
    "and restraint. You never use more",
    "than two typefaces. Before answering,",
    "restate the brief in your own words.",
    "Ask clarifying questions first.",
  ];
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
      borderRadius: 12 * k, background: "#FFFFFF", border: `2px solid ${GH_BORDER}`,
      overflow: "hidden", fontFamily: inter.fontFamily,
      filter: "drop-shadow(0 12px 16px rgba(6,10,16,0.5))" }}>
      <div style={{ height: 34 * k, background: GH_SUBTLE, borderBottom: `1px solid ${GH_BORDER}`,
        display: "flex", alignItems: "center", gap: 8 * k, paddingLeft: 13 * k }}>
        <div style={{ width: 13 * k, height: 13 * k, borderRadius: 3 * k, background: "#C96442" }} />
        <div style={{ fontSize: 12.5 * k, fontWeight: 800, color: GH_TEXT }}>system prompt</div>
        <div style={{ flex: 1 }} />
        <div style={{ fontSize: 11 * k, color: GH_MUTED, paddingRight: 13 * k }}>unsaved</div>
      </div>
      <div style={{ position: "absolute", left: 0, top: 34 * k, bottom: 0, width: 34 * k,
        background: GH_SUBTLE, borderRight: `1px solid ${GH_BORDER}` }} />
      {LINES.map((ln, i) => {
        const start = at + i * 9;
        const n = Math.max(0, Math.min(ln.length, Math.round((f - start) * 3.2)));
        if (n <= 0) return null;
        return (
          <React.Fragment key={i}>
            <div style={{ position: "absolute", left: 10 * k, top: (46 + i * 26) * k,
              fontSize: 11 * k, color: "#A8AFB8" }}>{i + 1}</div>
            <div style={{ position: "absolute", left: 46 * k, top: (44 + i * 26) * k,
              fontSize: 14.5 * k, fontWeight: 600, color: GH_TEXT, whiteSpace: "nowrap" }}>
              {ln.slice(0, n)}
              {n < ln.length && <span style={{ opacity: (f % 20) < 11 ? 1 : 0 }}>▌</span>}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};
