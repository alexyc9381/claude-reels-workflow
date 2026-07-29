import React from "react";
import { Img, staticFile } from "remotion";
import { inter, fraunces } from "./fonts";
import { INK, CLAY, CLAYD, RED, GREEN, MUTE, GOLD, SKY, MONO, grad, hexA } from "./SlopKit";

/* =========================================================================
   REEL 79 "OPEN" — THE ARCADE. Shared world kit for every scene: you are in
   a neon arcade where paid AI tools cost $49.99 a grab and the open-source
   crate beside them is free. Each of the 7 repos is a cabinet you play.
   Panel-local coords throughout (1012 x 792).
   ========================================================================= */

/* ⛔ HOUSE COLOUR RULE (claude-ai-reel-workflow): rich MATTE animation-film colour.
   No neon glow (no coloured 0 0 Npx halos — depth comes from soft DARK shadows), no
   washed low-opacity fills, no neon-on-black. Every surface below is a SOLID paint. */
export const PINK = "#C4708E", PURPLE = "#6B5A8E", TAN = "#C9A36A";
export const CAB_R = "#B4534A", CAB_RD = "#7A2F2A";
// matte set: warm painted arcade interior
export const WALL = "#3E4E5C", WALL2 = "#33414D", WALL3 = "#48596A";
export const WOOD = "#8A6242", WOOD_D = "#6E4A30", WOOD_L = "#A87C4C";
export const PAPER = "#F7F5F0", PAPER2 = "#EDE7DA", PAPER3 = "#DED5C4";
export const SLATE = "#3A5C84", SLATE_L = "#5C7CA8", TEAL = "#2F6B63", PLUM = "#6E4257";
export const SOFT_SH = "0 10px 22px rgba(26,24,19,0.34)";
export const DEEP_SH = "0 20px 38px rgba(26,24,19,0.46)";

/* ---- the room: back wall, silhouetted cabinets, neon, carpet ---- */
export const ArcadeRoom: React.FC<{ f: number; shift?: number; tint?: string }> = ({ f, shift = 0, tint }) => (<>
    {/* painted back wall + wainscot, all solid paint */}
    <div style={{ position: "absolute", inset: 0, background: WALL }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 150, background: WALL3 }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 148, height: 8, background: "#2B3844" }} />
    {/* a painted bunting band instead of a glowing neon strip */}
    {Array.from({ length: 14 }, (_, i) => (
      <div key={i} style={{ position: "absolute", left: 14 + i * 74, top: 18, width: 0, height: 0, borderLeft: "22px solid transparent", borderRight: "22px solid transparent", borderTop: `32px solid ${[GOLD, CLAY, TEAL, TAN][i % 4]}` }} />
    ))}
    <div style={{ position: "absolute", left: 0, right: 0, top: 12, height: 6, background: "#2B3844" }} />
    {/* silhouetted cabinets: solid painted bodies, matte screens, dark shadow only */}
    {Array.from({ length: 9 }, (_, i) => {
      const x = ((i * 132 - shift * 0.35) % 1200 + 1200) % 1200 - 120;
      const k = i % 3;
      return (
        <div key={i} style={{ position: "absolute", left: x, top: 62, width: 108, height: 256, borderRadius: "12px 12px 0 0", background: [ "#4A5A47", "#5A4753", "#3F5566" ][k], boxShadow: SOFT_SH }}>
          <div style={{ position: "absolute", left: 10, top: 18, right: 10, height: 68, borderRadius: 5, background: [ "#87A07E", "#A0808F", "#7E96AC" ][k] }} />
          <div style={{ position: "absolute", left: 10, top: 18, right: 10, height: 16, borderRadius: "5px 5px 0 0", background: "rgba(255,255,255,0.16)" }} />
          <div style={{ position: "absolute", left: 17, top: 102, right: 17, height: 8, borderRadius: 4, background: "#2F3B45" }} />
          <div style={{ position: "absolute", left: 23, top: 124, width: 17, height: 17, borderRadius: "50%", background: CLAY }} />
          <div style={{ position: "absolute", left: 53, top: 124, width: 17, height: 17, borderRadius: "50%", background: GOLD }} />
        </div>
      );
    })}
    {/* warm carpet with a solid printed pattern */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 596, height: 196, background: "#7A4A3E" }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 596, height: 10, background: "#5E362D" }} />
    {Array.from({ length: 40 }, (_, i) => (
      <div key={i} style={{ position: "absolute", left: ((i * 61 - shift * 0.8) % 1040 + 1040) % 1040 - 20, top: 616 + ((i * 43) % 160), width: 20, height: 9, borderRadius: 4, background: [GOLD, TAN, "#9A5F50", TEAL][i % 4], transform: `rotate(${(i * 43) % 180}deg)` }} />
    ))}
    {tint && <div style={{ position: "absolute", inset: 0, background: tint, opacity: 0.14 }} />}
  </>);

/* ---- a playable cabinet: marquee + chase bulbs + screen + control deck ---- */
export const Cabinet: React.FC<{
  f: number; x: number; y: number; w: number; h: number; title: string;
  accent?: string; children?: React.ReactNode; badge?: string; badgeColor?: string;
}> = ({ f, x, y, w, h, title, accent = CAB_R, children, badge, badgeColor = GOLD }) => {
  const bulbs = Math.max(4, Math.round(w / 52));
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 16, background: accent, border: `6px solid ${CAB_RD}`, boxShadow: DEEP_SH }} />
      <div style={{ position: "absolute", left: 6, top: 6, right: 6, height: 12, borderRadius: "10px 10px 0 0", background: "rgba(255,255,255,0.16)" }} />
      {/* marquee */}
      <div style={{ position: "absolute", left: 14, top: 12, right: 14, height: 66, borderRadius: 10, background: PAPER, border: `5px solid ${GOLD}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "inset 0 -5px 0 rgba(26,24,19,0.12)" }}>
        <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: Math.min(40, Math.max(22, w / (title.length * 0.52))), color: CLAYD, whiteSpace: "nowrap", letterSpacing: 0.5 }}>{title}</span>
      </div>
      {Array.from({ length: bulbs }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: 22 + i * ((w - 44) / (bulbs - 1)), top: 86, width: 13, height: 13, borderRadius: "50%", background: Math.abs(Math.sin(f / 6 + i)) > 0.45 ? "#FFEFC0" : "#C79A3C", border: "2px solid #8A6A22" }} />
      ))}
      {/* screen */}
      <div style={{ position: "absolute", left: 20, top: 108, right: 20, bottom: 96, borderRadius: 10, background: PAPER2, border: `5px solid #4A2A26`, overflow: "hidden", boxShadow: "inset 0 3px 0 rgba(26,24,19,0.18)" }}>
        {children}
        <div style={{ position: "absolute", left: -80, top: -40, width: 160, bottom: -40, background: "rgba(255,255,255,0.10)", transform: "rotate(15deg)", pointerEvents: "none" }} />
      </div>
      {/* control deck: joystick + two buttons + coin slot */}
      <div style={{ position: "absolute", left: 20, bottom: 18, right: 20, height: 64, borderRadius: 10, background: CAB_RD, border: "3px solid #4A2A26", boxShadow: "inset 0 4px 0 rgba(255,255,255,0.12)" }}>
        <div style={{ position: "absolute", left: 30, top: 26, width: 11, height: 30, background: "#2A0908", transform: "rotate(-13deg)", transformOrigin: "50% 100%" }} />
        <div style={{ position: "absolute", left: 21, top: 14, width: 30, height: 30, borderRadius: "50%", background: grad("#E9645C", "#B23A34"), border: "3px solid #3E0E0C" }} />
        {[GREEN, GOLD].map((c, i) => (
          <div key={i} style={{ position: "absolute", left: 78 + i * 40, top: 22, width: 28, height: 28, borderRadius: "50%", background: c, border: "3px solid rgba(26,24,19,0.4)", boxShadow: "inset 0 -4px 0 rgba(26,24,19,0.22)" }} />
        ))}
        {badge && (
          <div style={{ position: "absolute", right: 14, top: 15, padding: "6px 14px", borderRadius: 8, background: PAPER, border: `3px solid ${badgeColor}` }}>
            <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 21, color: badgeColor }}>{badge}</span>
          </div>
        )}
      </div>
    </div>
  );
};

/* ---- the gold star prize won from each cabinet ---- */
export const Prize: React.FC<{ x: number; y: number; s?: number; lit?: boolean; rot?: number }> = ({ x, y, s = 1, lit = true, rot = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 72, height: 72, transform: `scale(${s}) rotate(${rot}deg)` }}>
    <div style={{ position: "absolute", inset: 0, borderRadius: 12, background: lit ? "#E9B84A" : "#6C7A8C", border: `3px solid ${lit ? "#B9862A" : "#4E5C6E"}`, boxShadow: SOFT_SH }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 30, height: 10, background: lit ? "#F6E3AE" : "#8A97A8" }} />
    <div style={{ position: "absolute", left: 31, top: 0, bottom: 0, width: 10, background: lit ? "#F6E3AE" : "#8A97A8" }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 17, textAlign: "center", fontSize: 34, lineHeight: 1, color: lit ? "#7A5410" : "#4E5C6E" }}>{lit ? "★" : "🔒"}</div>
  </div>
);

/* ---- a labelled gauge (tokens, taste, etc) ---- */
export const Meter: React.FC<{ x: number; y: number; w?: number; label: string; val: number; c?: string; suffix?: string }> = ({ x, y, w = 260, label, val, c = GREEN, suffix = "%" }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w }}>
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
      <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 17, color: "#C9D2E6", letterSpacing: 1.5 }}>{label}</span>
      <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 19, color: c }}>{Math.round(val)}{suffix}</span>
    </div>
    <div style={{ position: "relative", height: 20, borderRadius: 999, background: PAPER3, border: "3px solid #B9AE97", overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${Math.max(0, Math.min(100, val))}%`, background: c }} />
    </div>
  </div>
);

/* ---- a redacted / revealed text bar (used on the cabinet screens) ---- */
export const Bar: React.FC<{ x: number; y: number; w: number; h?: number; c?: string; o?: number; r?: number }> = ({ x, y, w, h = 14, c = "#7C88A8", o = 1, r = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, borderRadius: h / 2, background: c, opacity: o, transform: r ? `rotate(${r}deg)` : undefined }} />
);

/* ---- speech bubble for the onlookers ---- */
export const Bubble: React.FC<{ x: number; y: number; text: string; s?: number; c?: string; rot?: number }> = ({ x, y, text, s = 1, c = "#FAF9F5", rot = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, transform: `scale(${s}) rotate(${rot}deg)`, transformOrigin: "0 100%" }}>
    <div style={{ padding: "9px 18px", borderRadius: 16, background: c, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 25, color: INK, whiteSpace: "nowrap", boxShadow: "0 8px 16px rgba(0,0,0,0.4)" }}>{text}</div>
    <div style={{ width: 0, height: 0, marginLeft: 20, borderLeft: "10px solid transparent", borderRight: "10px solid transparent", borderTop: `14px solid ${c}` }} />
  </div>
);

/* ---- a brand mark tile (reddit / x / youtube / hacker news) ---- */
export const FeedTile: React.FC<{ x: number; y: number; slug: string; s?: number; glow?: boolean }> = ({ x, y, slug, s = 1, glow }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 62 * s, height: 62 * s, borderRadius: 14 * s, background: "#F4F1EA", border: `${3 * s}px solid #D8D2C4`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: SOFT_SH, outline: glow ? `4px solid ${GOLD}` : "none" }}>
    <Img src={staticFile(`logos/${slug}.svg`)} style={{ width: 36 * s, height: 36 * s, objectFit: "contain" }} />
  </div>
);

/* ---- the lead-magnet doc (white paper card) ---- */
export const GuideCard: React.FC<{ x: number; y: number; s?: number; rot?: number; names: string[]; hidden?: number }> = ({ x, y, s = 1, rot = 0, names, hidden = 3 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 300, height: 384, transform: `scale(${s}) rotate(${rot}deg)`, transformOrigin: "50% 100%" }}>
    <div style={{ position: "absolute", inset: 0, borderRadius: 14, background: "linear-gradient(170deg,#FFFFFF,#F1ECE0)", border: "4px solid #E0D8C6", boxShadow: "0 22px 40px rgba(0,0,0,0.55)" }} />
    <div style={{ position: "absolute", left: 22, top: 22, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 30, color: INK, lineHeight: 1.05 }}>The 7 free<br />repos</div>
    <div style={{ position: "absolute", left: 22, top: 92, width: 62, height: 5, borderRadius: 3, background: CLAY }} />
    {names.map((n, i) => (
      <div key={i} style={{ position: "absolute", left: 22, top: 112 + i * 30, display: "flex", alignItems: "center", gap: 9 }}>
        <span style={{ width: 20, height: 20, borderRadius: "50%", background: GREEN, color: "#fff", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>✓</span>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 17, color: "#3A342A" }}>{n}</span>
      </div>
    ))}
    {Array.from({ length: hidden }, (_, i) => (
      <div key={i} style={{ position: "absolute", left: 22, top: 112 + (names.length + i) * 30, display: "flex", alignItems: "center", gap: 9 }}>
        <span style={{ fontSize: 15, lineHeight: 1 }}>🔒</span>
        {[54, 38, 46].map((w, j) => <span key={j} style={{ width: w, height: 12, borderRadius: 3, background: "rgba(90,74,50,0.3)" }} />)}
      </div>
    ))}
    <div style={{ position: "absolute", left: 22, right: 22, bottom: 18, padding: "9px 0", borderRadius: 10, background: CLAY, textAlign: "center", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 19, color: "#fff", letterSpacing: 1 }}>COMMENT "OPEN"</div>
  </div>
);

/* =========================================================================
   THE REAL GITHUB PAGE. Faithful light-theme repo page rendered as a live UI
   on the cabinet screen. Every field below is REAL data pulled from the
   GitHub API on 2026-07-29 — never invent a repo, an owner or a star count.
   ========================================================================= */

export type Repo = {
  key: string; owner: string; name: string; desc: string;
  stars: number; lang: string; langColor: string; license: string;
  topics: string[]; files: [string, string][];
};

export const REPOS: Record<string, Repo> = {
  caveman: { key: "caveman", owner: "JuliusBrussee", name: "caveman", stars: 94087, lang: "JavaScript", langColor: "#f1e05a", license: "MIT",
    desc: "why use many token when few token do trick \u2014 Claude Code skill that cuts 65% of tokens by talking like caveman",
    topics: ["claude-code", "skill", "tokens", "llm"],
    files: [[".claude", "add caveman hooks"], ["skills", "tighten grunt rules"], ["README.md", "why use many word"], ["LICENSE", "MIT"]] },
  uiux: { key: "uiux", owner: "nextlevelbuilder", name: "ui-ux-pro-max-skill", stars: 111289, lang: "Python", langColor: "#3572A5", license: "MIT",
    desc: "An AI SKILL that provide design intelligence for building professional UI/UX multiple platforms",
    topics: ["design-system", "ui-ux", "claude-skill", "tailwind"],
    files: [["databases", "84 styles, 192 palettes"], ["skills", "add motion presets"], ["README.md", "design intelligence"], ["LICENSE", "MIT"]] },
  agency: { key: "agency", owner: "msitarzewski", name: "agency-agents", stars: 137362, lang: "Shell", langColor: "#89e051", license: "MIT",
    desc: "A complete AI agency at your fingertips - from frontend wizards to Reddit community ninjas, each a specialized expert",
    topics: ["subagents", "claude-code", "agents", "marketplace"],
    files: [["agents", "267 expert roles"], ["departments", "engineering, design, marketing"], ["README.md", "your AI agency"], ["install.sh", "one-line install"]] },
  memory: { key: "memory", owner: "rohitg00", name: "agentmemory", stars: 25945, lang: "TypeScript", langColor: "#3178c6", license: "Apache-2.0",
    desc: "#1 Persistent memory for AI coding agents based on real-world benchmarks",
    topics: ["memory", "claudecode", "agents", "cursor"],
    files: [["src", "persist across sessions"], ["benchmarks", "real-world recall"], ["README.md", "never re-explain"], ["LICENSE", "Apache-2.0"]] },
  last30: { key: "last30", owner: "mvanhorn", name: "last30days-skill", stars: 54799, lang: "Python", langColor: "#3572A5", license: "MIT",
    desc: "AI agent skill that researches any topic across Reddit, X, YouTube, HN, Polymarket and the web - then synthesizes a grounded summary",
    topics: ["research", "claude-skill", "reddit", "hackernews"],
    files: [["sources", "reddit, x, youtube, hn"], ["skills", "rank by engagement"], ["README.md", "make research current"], ["setup.py", "30 second wizard"]] },
  montage: { key: "montage", owner: "calesthio", name: "OpenMontage", stars: 43572, lang: "Python", langColor: "#3572A5", license: "AGPL-3.0",
    desc: "World's first open-source, agentic video production system. 12 production pipelines, 100+ tools, 700+ agent skills",
    topics: ["video", "agents", "remotion", "ffmpeg"],
    files: [["pipelines", "12 production pipelines"], ["tools", "100+ tools"], ["README.md", "a video studio"], ["LICENSE", "AGPL-3.0"]] },
  orca: { key: "orca", owner: "stablyai", name: "orca", stars: 32160, lang: "TypeScript", langColor: "#3178c6", license: "MIT",
    desc: "Orca is the ADE for working with a fleet of parallel agents. Run any coding agent with your own subscription",
    topics: ["agents", "parallel", "worktrees", "ade"],
    files: [["apps", "desktop + mobile"], ["worktrees", "isolated per agent"], ["README.md", "fleet of agents"], ["LICENSE", "MIT"]] },
};

const GH_INK = "#1F2328", GH_DIM = "#59636e", GH_LINE = "#d1d9e0", GH_BLUE = "#0969da", GH_BG = "#ffffff", GH_SOFT = "#f6f8fa";
const kfmt = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}k` : `${n}`;

// `load` 0..1 drives the page paint-in; `starP` 0..1 ticks the star counter up.
export const GithubPage: React.FC<{ f: number; repo: Repo; load?: number; starP?: number; scroll?: number }> = ({ f, repo, load = 1, starP = 1, scroll = 0 }) => {
  const stars = Math.round(repo.stars * Math.max(0, Math.min(1, starP)));
  const row = (i: number) => Math.max(0, Math.min(1, (load - 0.35 - i * 0.07) / 0.3));
  return (
    <div style={{ position: "absolute", inset: 0, background: GH_BG, fontFamily: inter.fontFamily, overflow: "hidden" }}>
      {/* ---- github top bar (dark) ---- */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 44, background: "#24292f", display: "flex", alignItems: "center", padding: "0 14px", gap: 12 }}>
        <Img src={staticFile("logos/github.svg")} style={{ width: 26, height: 26, filter: "invert(1)" }} />
        <div style={{ flex: 1, height: 26, borderRadius: 6, background: "#2f363d", border: "1px solid #444c56", display: "flex", alignItems: "center", padding: "0 9px" }}>
          <span style={{ fontSize: 12, color: "#909dab" }}>Search or jump to...</span>
        </div>
        {[0, 1, 2].map((i) => <div key={i} style={{ width: 17, height: 17, borderRadius: 4, background: "#909dab", opacity: 0.55 }} />)}
        <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#57606a" }} />
      </div>

      {/* ---- repo header ---- */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 44, padding: "12px 16px 0", background: GH_SOFT, borderBottom: `1px solid ${GH_LINE}`, height: 92 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <Img src={staticFile(`gh/${repo.key}.png`)} style={{ width: 22, height: 22, borderRadius: "50%", border: `1px solid ${GH_LINE}` }} />
          <span style={{ fontSize: 17, color: GH_BLUE, fontWeight: 500 }}>{repo.owner}</span>
          <span style={{ fontSize: 17, color: GH_DIM }}>/</span>
          <span style={{ fontSize: 17, color: GH_BLUE, fontWeight: 800 }}>{repo.name}</span>
          <span style={{ marginLeft: 4, padding: "1px 7px", borderRadius: 999, border: `1px solid ${GH_LINE}`, fontSize: 10, color: GH_DIM, fontWeight: 600 }}>Public</span>
          <div style={{ flex: 1 }} />
          {/* the STAR button, counter live-ticking */}
          <div style={{ display: "flex", alignItems: "center", borderRadius: 7, border: `1px solid ${GH_LINE}`, overflow: "hidden", background: "#fff", outline: starP > 0.98 ? `3px solid #EAC54F` : "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "5px 8px", background: GH_SOFT }}>
              <span style={{ fontSize: 15, color: "#eac54f" }}>{"\u2605"}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: GH_INK }}>Star</span>
            </div>
            <div style={{ padding: "5px 9px", fontSize: 13, fontWeight: 800, color: GH_INK, borderLeft: `1px solid ${GH_LINE}`, whiteSpace: "nowrap" }}>{kfmt(stars)}</div>
          </div>
        </div>
        {/* nav tabs */}
        <div style={{ display: "flex", gap: 15, marginTop: 12 }}>
          {["Code", "Issues", "Pull requests", "Actions", "Insights"].map((t, i) => (
            <span key={t} style={{ fontSize: 13, fontWeight: i === 0 ? 800 : 500, color: i === 0 ? GH_INK : GH_DIM, borderBottom: i === 0 ? "2px solid #fd8c73" : "none", paddingBottom: 8 }}>{t}</span>
          ))}
        </div>
      </div>

      {/* ---- body: file list + about sidebar ---- */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 136, bottom: 0, display: "flex", gap: 12, padding: "12px 16px", transform: `translateY(${-scroll}px)` }}>
        <div style={{ flex: 1.55 }}>
          <div style={{ border: `1px solid ${GH_LINE}`, borderRadius: 8, overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: GH_SOFT, borderBottom: `1px solid ${GH_LINE}` }}>
              <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#8b949e" }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: GH_INK }}>{repo.owner}</span>
              <span style={{ fontSize: 12, color: GH_DIM }}>{repo.files[0][1]}</span>
              <div style={{ flex: 1 }} />
              <span style={{ fontSize: 11, color: GH_DIM }}>{2 + (f % 40)} hours ago</span>
            </div>
            {repo.files.map(([n, msg], i) => (
              <div key={n} style={{ display: "flex", alignItems: "center", gap: 9, padding: "7px 12px", borderBottom: i < repo.files.length - 1 ? `1px solid ${GH_LINE}` : "none", opacity: row(i) }}>
                <span style={{ fontSize: 14 }}>{n.includes(".") ? "\ud83d\udcc4" : "\ud83d\udcc1"}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: GH_INK, minWidth: 118 }}>{n}</span>
                <span style={{ fontSize: 12, color: GH_DIM, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{msg}</span>
              </div>
            ))}
          </div>
          {/* README block */}
          <div style={{ marginTop: 10, border: `1px solid ${GH_LINE}`, borderRadius: 8, padding: "10px 12px", opacity: row(4) }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, paddingBottom: 8, borderBottom: `1px solid ${GH_LINE}` }}>
              <span style={{ fontSize: 13 }}>{"\ud83d\udcd6"}</span>
              <span style={{ fontSize: 13, fontWeight: 800, color: GH_INK }}>README.md</span>
            </div>
            <div style={{ fontSize: 16, fontWeight: 800, color: GH_INK, marginTop: 8 }}>{repo.name}</div>
            {[0.94, 0.72, 0.86].map((w, i) => (
              <div key={i} style={{ width: `${w * 100}%`, height: 8, borderRadius: 3, background: "#e6eaef", marginTop: 7 }} />
            ))}
          </div>
        </div>
        {/* About sidebar */}
        <div style={{ flex: 1, opacity: row(2) }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: GH_INK, marginBottom: 7 }}>About</div>
          <div style={{ fontSize: 12, lineHeight: 1.42, color: GH_INK }}>{repo.desc}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 9 }}>
            {repo.topics.map((t) => (
              <span key={t} style={{ padding: "2px 9px", borderRadius: 999, background: "#ddf4ff", color: GH_BLUE, fontSize: 11, fontWeight: 600 }}>{t}</span>
            ))}
          </div>
          <div style={{ marginTop: 11, display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: GH_DIM }}>
              <span style={{ color: "#eac54f", fontSize: 13 }}>{"\u2605"}</span>
              <b style={{ color: GH_INK }}>{stars.toLocaleString()}</b> stars
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: GH_DIM }}>
              <span style={{ width: 11, height: 11, borderRadius: "50%", background: repo.langColor, display: "inline-block" }} />
              {repo.lang}
              <span style={{ marginLeft: 8 }}>{repo.license}</span>
            </div>
          </div>
          {/* language bar */}
          <div style={{ display: "flex", height: 8, borderRadius: 4, overflow: "hidden", marginTop: 10 }}>
            <div style={{ flex: 7, background: repo.langColor }} />
            <div style={{ flex: 2, background: "#89e051" }} />
            <div style={{ flex: 1, background: "#e34c26" }} />
          </div>
        </div>
      </div>
      {/* CRT sheen so it still reads as a screen inside the cabinet */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(255,255,255,0.10), rgba(0,0,0,0.06))", pointerEvents: "none" }} />
      {load < 0.99 && <div style={{ position: "absolute", left: 0, top: 0, height: 3, width: `${load * 100}%`, background: "#fd8c73" }} />}
    </div>
  );
};
