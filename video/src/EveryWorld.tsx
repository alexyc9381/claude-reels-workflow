import React from "react";
import { Img, staticFile } from "remotion";
import { inter } from "./fonts";
import { E, osc, rnd, OUT, IO, BACK, IN_Q } from "./MissionWorld";

/* =========================================================================
   REEL 86 "EVERYTHING" · SHARED KIT.

   Claim: one GitHub repo turns Claude Code into a complete dev team —
   subagents, skills, slash commands, rules and MCP servers in a single install.

   ⚠️⚠️ THE NUMBERS ARE PENDING A RE-RECORD. Verified against the GitHub API and
   both repos' full trees on 2026-08-01:

     VO said                  WorldFlowAI/everything-claude-code    -zh fork
     "almost 200,000 stars"   892                                   1,796
     "28 subagents"           9                                     14
     "119 skills"             11                                    58
     "60 slash commands"      15                                    35
     "34 rules"               8                                     9
     "14 MCP servers"         15  ✅                                 10
     "Anthropic's hackathon"  ✅ TRUE — README: "configs from an Anthropic
                              hackathon winner"; won Anthropic x Forum Ventures,
                              Sep 2025

   ⛔ EVERY on-screen figure comes from STATS below and nowhere else, so the
   re-record is a one-line change. Never hardcode a count into a scene.
   ========================================================================= */

export const STATS = {
  repo:     "everything-claude-code",
  owner:    "WorldFlowAI",
  stars:    "892",          // ⚠️ awaiting re-record; VO currently says ~200,000
  agents:   9,
  skills:   11,
  commands: 15,
  rules:    8,
  mcps:     15,
};

/** the five things in the box — each a real category in the repo */
export const PARTS: { key: keyof typeof STATS; label: string; c: string; glyph: string }[] = [
  { key: "agents",   label: "SUBAGENTS",      c: "#C96442", glyph: "◆" },
  { key: "skills",   label: "SKILLS",         c: "#3E7AB8", glyph: "✦" },
  { key: "commands", label: "SLASH COMMANDS", c: "#17A87C", glyph: "/" },
  { key: "rules",    label: "RULES",          c: "#7A5A9E", glyph: "§" },
  { key: "mcps",     label: "MCP SERVERS",    c: "#E9AE3E", glyph: "⇄" },
];

/* palette — Claude clay against a cold dark room */
export const CLAY = "#C96442", CLAY_L = "#E08A67", CLAY_D = "#9A4527";
export const NIGHT = "#0A0F16", NIGHT_L = "#141C26", NIGHT_M = "#1B2530";
export const STEEL = "#5B6B7C", STEEL_L = "#7E90A2", STEEL_D = "#36434F";
export const CARD = "#F7F3EA", INKD = "#241F1A", MUTE = "#8E8677";
export const RED = "#D63B27", GO = "#17A87C", BLUE = "#3E7AB8", PLUM = "#7A5A9E", GOLD = "#E9AE3E";

/* ================================================================= room ==== */

/** a dark stage with a floor line and a subordinate back wall */
export const Stage: React.FC<{ f: number; horizon?: number; grid?: boolean; z?: number }> =
  ({ f, horizon = 620, grid = true, z = 2 }) => (<>
  <div style={{ position: "absolute", inset: 0, background: NIGHT, zIndex: z }} />
  {grid && Array.from({ length: 9 }, (_, i) => (
    <div key={i} style={{ position: "absolute", left: 12 + i * 124, top: 96, width: 96, height: 300,
      borderRadius: 8, background: NIGHT_L, zIndex: z + 1 }} />
  ))}
  <div style={{ position: "absolute", left: 0, right: 0, top: horizon, bottom: 0,
    background: "#101823", zIndex: z + 3 }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: horizon, height: 5,
    background: "#1E2A36", zIndex: z + 4 }} />
</>);

/** the GitHub repo card — states "one free repo" as an object, not a caption */
export const RepoPlate: React.FC<{
  f: number; x: number; y: number; s?: number; t?: number; z?: number;
}> = ({ f, x, y, s = 1, t = 1, z = 34 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 520 * s, zIndex: z,
    borderRadius: 14 * s, background: CARD, boxShadow: "0 14px 22px rgba(0,0,0,0.7)",
    transform: `scale(${Math.max(0.02, t)})`, fontFamily: inter.fontFamily, overflow: "hidden" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 11 * s,
      padding: `${13 * s}px ${16 * s}px ${6 * s}px` }}>
      <Img src={staticFile("logos/github.svg")}
           style={{ width: 30 * s, height: 30 * s, objectFit: "contain", display: "block" }} />
      <div style={{ fontWeight: 800, fontSize: 21 * s, color: "#0969DA" }}>{STATS.repo}</div>
    </div>
    <div style={{ display: "flex", gap: 8 * s, padding: `0 ${16 * s}px ${14 * s}px` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 5 * s,
        padding: `${5 * s}px ${11 * s}px`, borderRadius: 7 * s, background: "#F6F8FA",
        border: `1px solid #D0D7DE`, fontWeight: 800, fontSize: 16 * s, color: INKD }}>
        ★ {STATS.stars}
      </div>
      <div style={{ padding: `${5 * s}px ${11 * s}px`, borderRadius: 7 * s, background: CLAY,
        fontWeight: 900, fontSize: 15 * s, color: "#FFF6F2" }}>FOR CLAUDE CODE</div>
      <div style={{ padding: `${5 * s}px ${11 * s}px`, borderRadius: 7 * s, background: GO,
        fontWeight: 900, fontSize: 15 * s, color: "#EAFBF3" }}>FREE</div>
    </div>
  </div>
);

/** a Claude Code terminal window — dark body, light chrome, the real thing */
export const Terminal: React.FC<{
  f: number; x: number; y: number; w?: number; h?: number; at?: number;
  lines?: string[]; panes?: number; z?: number;
}> = ({ f, x, y, w = 640, h = 380, at = 0, lines, panes = 1, z = 20 }) => {
  const k = w / 640;
  const L = lines ?? ["> claude", "  reading the repo…", "  ✳ ready"];
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
      borderRadius: 14 * k, background: "#0E141B", border: `${3 * k}px solid #2A3644`,
      overflow: "hidden", fontFamily: inter.fontFamily,
      boxShadow: "0 18px 28px rgba(0,0,0,0.75)" }}>
      <div style={{ height: 38 * k, background: "#1A2431",
        display: "flex", alignItems: "center", gap: 7 * k, paddingLeft: 13 * k,
        borderBottom: `${2 * k}px solid #26313D` }}>
        {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
          <div key={c} style={{ width: 11 * k, height: 11 * k, borderRadius: "50%", background: c }} />
        ))}
        <div style={{ marginLeft: 10 * k, fontWeight: 800, fontSize: 14 * k, color: "#7E8C9A" }}>
          claude code
        </div>
      </div>
      {/* split panes — one terminal becoming a team */}
      {Array.from({ length: panes }, (_, p) => (
        <div key={p} style={{ position: "absolute", left: (p * (w / panes)) + 2, top: 42 * k,
          width: w / panes - 4, bottom: 0,
          borderLeft: p ? `${2 * k}px solid #26313D` : "none", padding: 12 * k,
          boxSizing: "border-box" }}>
          {L.map((ln, i) => {
            const n = Math.max(0, Math.min(ln.length, Math.round((f - at - p * 6 - i * 7) * 1.6)));
            if (n <= 0) return null;
            return (
              <div key={i} style={{ fontWeight: 700, fontSize: 17 * k / Math.max(1, panes * 0.6),
                color: i === 0 ? "#7EE787" : "#B7C4D0", lineHeight: 1.5, whiteSpace: "nowrap" }}>
                {ln.slice(0, n)}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

/** one module crate — a category with its real count */
export const Crate: React.FC<{
  x: number; y: number; s?: number; label: string; n: number; c: string; glyph: string;
  t?: number; z?: number;
}> = ({ x, y, s = 1, label, n, c, glyph, t = 1, z = 26 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 200 * s, height: 148 * s, zIndex: z,
    borderRadius: 13 * s, background: CARD, transform: `scale(${Math.max(0.02, t)})`,
    boxShadow: "0 10px 16px rgba(0,0,0,0.68)", fontFamily: inter.fontFamily, overflow: "hidden" }}>
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 8 * s, background: c }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 22 * s, textAlign: "center",
      fontWeight: 900, fontSize: 54 * s, lineHeight: 1, letterSpacing: "-0.03em", color: INKD }}>{n}</div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 88 * s, textAlign: "center",
      fontWeight: 900, fontSize: 15 * s, letterSpacing: "0.09em", color: MUTE }}>{label}</div>
    <div style={{ position: "absolute", right: 11 * s, bottom: 9 * s, fontWeight: 900,
      fontSize: 20 * s, color: c }}>{glyph}</div>
  </div>
);

/** the hackathon badge — the one claim in this script that verified TRUE */
export const HackBadge: React.FC<{
  f: number; x: number; y: number; s?: number; t?: number; z?: number;
}> = ({ f, x, y, s = 1, t = 1, z = 30 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 470 * s, zIndex: z,
    transform: `scale(${Math.max(0.02, t)})`, fontFamily: inter.fontFamily,
    filter: "drop-shadow(0 12px 18px rgba(0,0,0,0.7))" }}>
    <div style={{ borderRadius: 13 * s, background: CARD, overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 * s,
        padding: `${14 * s}px ${18 * s}px` }}>
        <Img src={staticFile("logos/anthropic.svg")}
             style={{ width: 38 * s, height: 38 * s, objectFit: "contain", display: "block" }} />
        <div>
          <div style={{ fontWeight: 900, fontSize: 22 * s, color: INKD, whiteSpace: "nowrap" }}>
            ANTHROPIC HACKATHON
          </div>
          <div style={{ fontWeight: 800, fontSize: 15 * s, color: MUTE }}>winner’s own config</div>
        </div>
      </div>
    </div>
  </div>
);

/** one chip of type, in a band nothing else occupies */
export const EChip: React.FC<{ y: number; text: string; c?: string; size?: number; z?: number }> =
  ({ y, text, c = RED, size = 36, z = 34 }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top: y, display: "flex",
    justifyContent: "center", zIndex: z }}>
    <div style={{ padding: "9px 24px", borderRadius: 8, background: c,
      boxShadow: "0 8px 12px rgba(0,0,0,0.65)", fontFamily: inter.fontFamily, fontWeight: 900,
      fontSize: size, letterSpacing: "-0.01em", color: "#FFF8ED", whiteSpace: "nowrap" }}>{text}</div>
  </div>
);

/* =========================================================================
   KINETICS.

   ⛔ MEASURED: the first five hooks ran at 3.5-4.8 overall motion and 0.7-3.9
   in the opening second, against the ~13 reel 85 shipped at. They were built as
   "an element scales in, then holds" — five static arrangements. A hook has to
   be MOVING at frame 0 and never stop, or it reads as a still and gets scrolled.

   These primitives all animate CONTINUOUSLY rather than settling.
   ========================================================================= */

/** a number that rolls up to its value — the count IS the content, so animate it */
export const Roll: React.FC<{ f: number; at: number; to: number; dur?: number }> =
  ({ f, at, to, dur = 22 }) => <>{Math.round(E(f, at, at + dur, 0, to, OUT))}</>;

/** a crate whose number rolls and which never stops drifting */
export const LiveCrate: React.FC<{
  f: number; x: number; y: number; s?: number; label: string; n: number; c: string;
  glyph: string; at?: number; t?: number; drift?: number; z?: number;
}> = ({ f, x, y, s = 1, label, n, c, glyph, at = 0, t = 1, drift = 1, z = 26 }) => {
  const bob = Math.sin((f + x) / 21) * 9 * drift;
  const tip = Math.sin((f + x) / 29) * 1.6 * drift;
  return (
    <div style={{ position: "absolute", left: x, top: y + bob, width: 200 * s, height: 148 * s,
      zIndex: z, borderRadius: 13 * s, background: CARD,
      transform: `scale(${Math.max(0.02, t)}) rotate(${tip}deg)`,
      boxShadow: "0 10px 16px rgba(0,0,0,0.68)", fontFamily: inter.fontFamily, overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 8 * s, background: c }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 22 * s, textAlign: "center",
        fontWeight: 900, fontSize: 54 * s, lineHeight: 1, letterSpacing: "-0.03em", color: INKD }}>
        <Roll f={f} at={at} to={n} />
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 88 * s, textAlign: "center",
        fontWeight: 900, fontSize: 15 * s, letterSpacing: "0.09em", color: MUTE }}>{label}</div>
      <div style={{ position: "absolute", right: 11 * s, bottom: 9 * s, fontWeight: 900,
        fontSize: 20 * s, color: c }}>{glyph}</div>
    </div>
  );
};

/**
 * A never-ending stream of parts crossing the frame toward a point.
 * ⛔ Five discrete arrivals leave four gaps. A stream has no gaps by construction.
 */
export const PartStream: React.FC<{
  f: number; cx: number; cy: number; n?: number; period?: number; rad?: number; z?: number;
}> = ({ f, cx, cy, n = 12, period = 34, rad = 760, z = 30 }) => (<>
  {Array.from({ length: n }, (_, i) => {
    const t = (((f + i * (period / n)) % period) / period);
    const p = PARTS[i % PARTS.length];
    const ang = (i / n) * Math.PI * 2 + i * 0.7;
    const d = rad * (1 - t);
    const sc = 0.45 + t * 0.72;
    return (
      <div key={i} style={{ position: "absolute",
        left: cx + Math.cos(ang) * d - 74 * sc, top: cy + Math.sin(ang) * d * 0.66 - 46 * sc,
        width: 148 * sc, height: 92 * sc, borderRadius: 11 * sc, background: CARD, zIndex: z,
        opacity: t > 0.88 ? (1 - t) / 0.12 : 1,
        transform: `rotate(${(1 - t) * 70 * (i % 2 ? 1 : -1)}deg)`,
        boxShadow: "0 7px 12px rgba(0,0,0,0.6)", fontFamily: inter.fontFamily }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 6 * sc,
          background: p.c }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 16 * sc, textAlign: "center",
          fontWeight: 900, fontSize: 34 * sc, color: INKD }}>{STATS[p.key] as number}</div>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 8 * sc, textAlign: "center",
          fontWeight: 900, fontSize: 12 * sc, letterSpacing: "0.06em", color: MUTE }}>{p.label}</div>
      </div>
    );
  })}
</>);

/** a ring that ORBITS forever — large circular travel, never settles */
export const PartOrbit: React.FC<{
  f: number; cx: number; cy: number; rx?: number; ry?: number; speed?: number;
  s?: number; z?: number;
}> = ({ f, cx, cy, rx = 356, ry = 172, speed = 0.030, s = 1, z = 26 }) => (<>
  {PARTS.map((p, i) => {
    const a = (i / PARTS.length) * Math.PI * 2 + f * speed;
    const depth = Math.sin(a);
    const k = (0.7 + ((depth + 1) / 2) * 0.5) * s;
    return (
      <div key={p.label} style={{ position: "absolute",
        left: cx + Math.cos(a) * rx - 84 * k, top: cy + depth * ry - 52 * k,
        width: 168 * k, height: 104 * k, borderRadius: 13 * k, background: CARD,
        zIndex: depth > 0 ? z + 8 : z - 8, boxShadow: "0 8px 13px rgba(0,0,0,0.62)",
        fontFamily: inter.fontFamily }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 6 * k,
          background: p.c }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 18 * k, textAlign: "center",
          fontWeight: 900, fontSize: 38 * k, color: INKD }}>{STATS[p.key] as number}</div>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 9 * k, textAlign: "center",
          fontWeight: 900, fontSize: 13 * k, letterSpacing: "0.06em", color: MUTE }}>{p.label}</div>
      </div>
    );
  })}
</>);

/** a column that keeps CYCLING upward — no end, so no settle */
export const PartCycle: React.FC<{
  f: number; cx: number; base: number; speed?: number; n?: number; z?: number;
}> = ({ f, cx, base, speed = 1.9, n = 7, z = 24 }) => (<>
  {Array.from({ length: n }, (_, i) => {
    const span = n * 116;
    const y = base - (((i * 116 + f * speed) % span));
    const k = 1.16 - (base - y) / span * 0.5;
    const p = PARTS[i % PARTS.length];
    return (
      <div key={i} style={{ position: "absolute", left: cx - 100 * k, top: y - 148 * k,
        width: 200 * k, height: 148 * k, borderRadius: 13 * k, background: CARD, zIndex: z + n - i,
        boxShadow: "0 9px 15px rgba(0,0,0,0.66)", fontFamily: inter.fontFamily,
        transform: `rotate(${Math.sin((f + i * 40) / 33) * 1.6}deg)` }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 8 * k,
          background: p.c }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 22 * k, textAlign: "center",
          fontWeight: 900, fontSize: 54 * k, lineHeight: 1, color: INKD }}>
          {STATS[p.key] as number}</div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 88 * k, textAlign: "center",
          fontWeight: 900, fontSize: 15 * k, letterSpacing: "0.09em", color: MUTE }}>{p.label}</div>
      </div>
    );
  })}
</>);

/**
 * A NAMED agent pane — a subagent with a job title, not an anonymous rectangle.
 *
 * ⛔ Two fixes in one component. Splitting a terminal into N equal panes makes a
 * flat grid, and a flat grid has hierarchy ZERO by definition (reel 84's roster
 * wall measured 1.24 and was rejected for exactly this). And an unlabelled pane
 * says "something is happening" rather than "a reviewer is reviewing", so the
 * claim "a complete dev team" stays abstract.
 *
 * So the buds are SMALL relative to the main window, and every one is named.
 */
export const AGENTS = [
  { name: "REVIEWER",  c: "#3E7AB8", line: "reviewing diff…" },
  { name: "TESTER",    c: "#17A87C", line: "running tests…" },
  { name: "DOCS",      c: "#7A5A9E", line: "writing docs…" },
  { name: "REFACTOR",  c: "#E9AE3E", line: "cleaning up…" },
  { name: "SECURITY",  c: "#D63B27", line: "scanning…" },
  { name: "PLANNER",   c: "#C96442", line: "planning…" },
];

export const AgentPane: React.FC<{
  f: number; x: number; y: number; w?: number; h?: number; name: string; c: string;
  line: string; t?: number; z?: number;
}> = ({ f, x, y, w = 218, h = 128, name, c, line, t = 1, z = 26 }) => {
  const k = w / 218;
  const bob = Math.sin((f + x) / 19) * 4;
  return (
    <div style={{ position: "absolute", left: x, top: y + bob, width: w, height: h, zIndex: z,
      borderRadius: 11 * k, background: "#0E141B", border: `${2 * k}px solid #2A3644`,
      overflow: "hidden", fontFamily: inter.fontFamily,
      transform: `scale(${Math.max(0.02, t)})`, boxShadow: "0 9px 15px rgba(0,0,0,0.68)" }}>
      <div style={{ height: 30 * k, background: c, display: "flex", alignItems: "center",
        paddingLeft: 10 * k, fontWeight: 900, fontSize: 15 * k, letterSpacing: "0.09em",
        color: "#FFF8ED" }}>{name}</div>
      <div style={{ padding: `${10 * k}px ${10 * k}px`, fontWeight: 700, fontSize: 14 * k,
        color: "#8FA0AE", whiteSpace: "nowrap" }}>
        {line.slice(0, Math.max(0, Math.min(line.length, Math.round((f - 4) * 1.4))))}
      </div>
      {/* a working bar that never finishes — the pane is alive, not a still */}
      <div style={{ position: "absolute", left: 10 * k, right: 10 * k, bottom: 12 * k,
        height: 7 * k, borderRadius: 4 * k, background: "#1C2632" }}>
        <div style={{ position: "absolute", left: `${((f * 2.6 + x) % 100)}%`, top: 0,
          width: "34%", height: "100%", borderRadius: 4 * k, background: c }} />
      </div>
    </div>
  );
};

/**
 * A WALL of dim terminal panes — the world behind the crew.
 *
 * ⛔ `Stage` was a near-black room with a few slabs: two tiers only (figures and
 * void), so nothing receded and the frame read flat. A third, clearly
 * subordinate tier is what makes a frame rank. On-theme too: a dev floor's worth
 * of running windows, dim enough to never compete.
 * Detail is REDUCED, not just dimmed — no readable text, just the shape of work.
 */
export const PaneWall: React.FC<{
  f: number; cols?: number; rows?: number; d?: number; dim?: number; z?: number;
}> = ({ f, cols = 6, rows = 5, d = 178, dim = 0.5, z = 4 }) => (
  <div style={{ position: "absolute", left: -30, top: -20, width: cols * d, height: rows * d,
    zIndex: z, opacity: dim }}>
    {Array.from({ length: cols * rows }, (_, i) => {
      const c = i % cols, r = Math.floor(i / cols);
      const drift = Math.sin(f / 34 + i * 0.7) * 16;
      const acc = ["#2A3644", "#31404F", "#28323D"][i % 3];
      return (
        <div key={i} style={{ position: "absolute", left: c * d + (r % 2 ? d / 2 : 0),
          top: r * d + drift, width: d - 26, height: d - 52, borderRadius: 9,
          background: "#121A24", border: `2px solid ${acc}` }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 12,
            borderRadius: "7px 7px 0 0", background: acc }} />
          {[0, 1, 2].map((k) => (
            <div key={k} style={{ position: "absolute", left: 12, top: 26 + k * 14,
              width: [58, 82, 44][k], height: 6, borderRadius: 3, background: "#1E2A36" }} />
          ))}
          {/* one pane in ten has a live bar, so the wall breathes */}
          {i % 7 === 0 && (
            <div style={{ position: "absolute", left: 12, right: 12, bottom: 12, height: 6,
              borderRadius: 3, background: "#2E3E4E" }} />
          )}
        </div>
      );
    })}
  </div>
);

/** a solid floor pool — matte stepped bands, never a gradient wash */
export const Pool: React.FC<{ cx: number; top: number; w?: number; z?: number }> =
  ({ cx, top, w = 560, z = 8 }) => (<>
  {[0, 1, 2].map((i) => (
    <div key={i} style={{ position: "absolute", left: cx - (w - i * 150) / 2, top: top + i * 8,
      width: w - i * 150, height: 132 - i * 30, borderRadius: "50%",
      background: ["#1A2431", "#212D3B", "#293849"][i], zIndex: z + i }} />
  ))}
</>);

/* =========================================================================
   ICONS.

   ⛔ "Less text, more icons." The hook was carrying five role names, five
   category labels and a chip in every shot — that is a list, not a graphic
   (memory `feedback_graphical_over_textual`: info goes in the GRAPHIC, and a
   shot gets ONE text chip). Numbers stay, because the number IS the claim.
   Everything that was a label becomes a shape.
   ========================================================================= */

const P: Record<string, string> = {
  /* roles */
  review:  "M10.5 3a7.5 7.5 0 1 0 4.55 13.46l4.74 4.75 1.42-1.42-4.75-4.74A7.5 7.5 0 0 0 10.5 3zm0 2a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11z",
  test:    "M9 2v6.2L3.6 18a2.6 2.6 0 0 0 2.24 3.9h12.3A2.6 2.6 0 0 0 20.4 18L15 8.2V2H9zm2 2h2v4.74l.26.47L15.4 13H8.6l2.14-3.79.26-.47V4z",
  shield:  "M12 2 4 5.2v6.1c0 4.9 3.4 9.4 8 10.6 4.6-1.2 8-5.7 8-10.6V5.2L12 2zm0 2.2 6 2.4v4.7c0 3.8-2.5 7.4-6 8.5-3.5-1.1-6-4.7-6-8.5V6.6l6-2.4z",
  build:   "M13.7 2a5.6 5.6 0 0 0-4.5 8.9L2.6 17.5a2 2 0 0 0 0 2.9l1 1a2 2 0 0 0 2.9 0l6.6-6.6A5.6 5.6 0 0 0 19.3 8h-3.1l-2-2V2.9c-.2 0-.4-.1-.5 0z",
  plan:    "M8 2a2 2 0 0 0-2 2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1a2 2 0 0 0-2-2H8zm0 2h8v2H8V4zM7 10h10v2H7v-2zm0 4h10v2H7v-2z",
  /* categories */
  agent:   "M12 2a2 2 0 0 0-2 2v1H7a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3h-3V4a2 2 0 0 0-2-2zM8.5 10a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm7 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM8 15h8v2H8v-2z",
  skill:   "M12 1.8 14.9 8l6.8 1-4.9 4.8 1.2 6.8-6-3.2-6 3.2 1.2-6.8L2.3 9l6.8-1L12 1.8z",
  slash:   "M4 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H4zm10.6 4.2 1.8.9-6 12-1.8-.9 6-12z",
  rule:    "M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6H6zm7 1.9L18.1 9H13V3.9zM7.5 12h9v1.8h-9V12zm0 3.6h9v1.8h-9v-1.8z",
  mcp:     "M7 2v6H5a2 2 0 0 0-2 2v3a5 5 0 0 0 5 5v4h2v-4a5 5 0 0 0 5-5v-3a2 2 0 0 0-2-2h-2V2h-2v6H9V2H7z",
  /* misc */
  spark:   "M12 2l1.9 6.1L20 10l-6.1 1.9L12 18l-1.9-6.1L4 10l6.1-1.9L12 2z",
  github:  "",
};

export const Icon: React.FC<{ n: string; s?: number; c?: string }> =
  ({ n, s = 40, c = "#241F1A" }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill={c} style={{ display: "block" }}>
    <path d={P[n] ?? P.spark} />
  </svg>
);

/** which icon each part uses — replaces the text label on the crate */
export const PART_ICON: Record<string, string> = {
  SUBAGENTS: "agent", SKILLS: "skill", "SLASH COMMANDS": "slash",
  RULES: "rule", "MCP SERVERS": "mcp",
};

/** a crate that shows a NUMBER and an ICON — no category text */
export const IconCrate: React.FC<{
  f: number; x: number; y: number; s?: number; icon: string; n: number; c: string;
  at?: number; t?: number; z?: number;
}> = ({ f, x, y, s = 1, icon, n, c, at = 0, t = 1, z = 26 }) => {
  const bob = Math.sin((f + x) / 21) * 9;
  const tip = Math.sin((f + x) / 29) * 1.6;
  return (
    <div style={{ position: "absolute", left: x, top: y + bob, width: 186 * s, height: 186 * s,
      zIndex: z, borderRadius: 20 * s, background: CARD,
      transform: `scale(${Math.max(0.02, t)}) rotate(${tip}deg)`,
      boxShadow: "0 11px 18px rgba(0,0,0,0.7)", fontFamily: inter.fontFamily, overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 9 * s, background: c }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 30 * s, display: "flex",
        justifyContent: "center" }}>
        <Icon n={icon} s={54 * s} c={c} />
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 18 * s, textAlign: "center",
        fontWeight: 900, fontSize: 62 * s, lineHeight: 1, letterSpacing: "-0.04em", color: INKD }}>
        <Roll f={f} at={at} to={n} />
      </div>
    </div>
  );
};

/* =========================================================================
   THE DEV FLOOR — a layered environment, not a wall.

   ⛔ `PaneWall` was ONE flat layer of panes. Reel 84's arena worked because it
   stacked SIX subordinate layers (crowd tiers, ribbon, banners, cameras, cable
   runs, truss) so the frame had density without anything competing. Same recipe:

     far     a deep bank of tiny monitors, dimmest
     mid     larger monitor banks on desks
     racks   server towers down both sides with LED columns
     truss   an overhead gantry with hanging cable loops
     floor   tile lines, cable runs, a matte light pool
     air     slow drifting specks

   ⛔ Every layer is dark. Density is not brightness — reel 84 measured 2.92 with
   a busier frame than this because everything behind stayed dim.
   ========================================================================= */
export const DevFloor: React.FC<{
  f: number; horizon?: number; dim?: number; racks?: boolean; z?: number;
}> = ({ f, horizon = 624, dim = 1, racks = true, z = 2 }) => {
  /* ⛔ the panel's header band eats the top ~86px — nothing structural above it,
     or the truss renders invisible under the chip (cost one render). */
  const TOP = 122;
  /* ⛔ these surfaces must sit WELL clear of NIGHT (#0A0F16). The first pass used
     #121A24 at 0.36 and the whole room read as black mush at panel scale. */
  return (<>
  <div style={{ position: "absolute", inset: 0, background: NIGHT, zIndex: z }} />

  {/* FAR — a deep bank of small monitors, a few carrying a dim accent */}
  <div style={{ position: "absolute", left: 0, top: TOP + 58, right: 0, height: 236,
    zIndex: z + 1, opacity: 0.66 * dim }}>
    {Array.from({ length: 55 }, (_, i) => {
      const c = i % 11, r = Math.floor(i / 11);
      const tint = [null, null, null, "#25404F", "#213D36", "#2B3350"][i % 6];
      return (
        <div key={i} style={{ position: "absolute", left: 6 + c * 94, top: r * 50 + Math.sin(f / 46 + i) * 3,
          width: 80, height: 42, borderRadius: 4, background: "#1A2431",
          border: `2px solid ${tint ?? "#2A3A4B"}` }}>
          <div style={{ position: "absolute", left: 7, top: 9, width: 36, height: 5,
            background: tint ?? "#32455A" }} />
          <div style={{ position: "absolute", left: 7, top: 20, width: 55, height: 5, background: "#28394A" }} />
          <div style={{ position: "absolute", left: 7, top: 30, width: 28, height: 5, background: "#28394A" }} />
        </div>
      );
    })}
  </div>

  {/* MID — full desks: monitor, keyboard slab, and on some of them a live bar */}
  <div style={{ position: "absolute", left: -24, top: TOP + 206, right: -24, height: 330,
    zIndex: z + 2, opacity: 0.86 * dim }}>
    {Array.from({ length: 12 }, (_, i) => {
      const c = i % 6, r = Math.floor(i / 6);
      const x = 6 + c * 186, y = r * 168;
      const live = i % 4 === 0;
      return (
        <React.Fragment key={i}>
          <div style={{ position: "absolute", left: x, top: y, width: 160, height: 116,
            borderRadius: 8, background: "#1E2A38", border: "3px solid #33475C" }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 13,
              borderRadius: "5px 5px 0 0", background: "#33475C" }} />
            {[0, 1, 2].map((k) => (
              <div key={k} style={{ position: "absolute", left: 10, top: 8 + k * 7, width: 5, height: 5,
                borderRadius: "50%", background: ["#4C6377", "#3E5568", "#3E5568"][k] }} />
            ))}
            {[0, 1, 2, 3].map((k) => (
              <div key={k} style={{ position: "absolute", left: 12, top: 30 + k * 15,
                width: [74, 100, 56, 86][k], height: 6, borderRadius: 3,
                background: k === 1 ? "#3A5063" : "#2C3E50" }} />
            ))}
            {live && (
              <div style={{ position: "absolute", left: 12, right: 12, bottom: 11, height: 8,
                borderRadius: 4, background: "#243342", overflow: "hidden" }}>
                <div style={{ position: "absolute", left: `${((f * 2.4 + i * 30) % 128) - 28}%`,
                  width: "38%", height: "100%", background: "#3E5C74" }} />
              </div>
            )}
          </div>
          {/* the desk slab under it — this is what makes it a room, not a wall */}
          <div style={{ position: "absolute", left: x - 12, top: y + 122, width: 184, height: 12,
            borderRadius: 3, background: "#22303E" }} />
          <div style={{ position: "absolute", left: x + 34, top: y + 138, width: 92, height: 9,
            borderRadius: 3, background: "#1C2836" }} />
        </React.Fragment>
      );
    })}
  </div>

  {/* RACKS — server towers down both sides, LEDs ticking */}
  {racks && [0, 1].map((sd) => (
    <div key={sd} style={{ position: "absolute", left: sd ? 894 : -18, top: TOP + 84, width: 136,
      height: 452, zIndex: z + 3, opacity: 0.95 * dim }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 8, background: "#18232F",
        border: "3px solid #33475C" }} />
      {Array.from({ length: 9 }, (_, i) => (
        <React.Fragment key={i}>
          <div style={{ position: "absolute", left: 9, right: 9, top: 12 + i * 48, height: 36,
            borderRadius: 4, background: "#22303E", border: "1px solid #2E4155" }} />
          {[0, 1, 2].map((k) => (
            <div key={k} style={{ position: "absolute", left: 18 + k * 15, top: 25 + i * 48,
              width: 8, height: 8, borderRadius: "50%",
              background: (Math.floor(f / 5) + i * 3 + k) % 4 === 0 ? "#5A8AA6" : "#2E4155" }} />
          ))}
          <div style={{ position: "absolute", right: 16, top: 23 + i * 48, width: 32, height: 12,
            borderRadius: 2, background: "#2A3A4B" }} />
        </React.Fragment>
      ))}
    </div>
  ))}

  {/* TRUSS — an overhead gantry with cable loops swinging off it */}
  <div style={{ position: "absolute", left: -20, right: -20, top: TOP, height: 16,
    background: "#2A3A4B", zIndex: z + 4, opacity: dim }} />
  <div style={{ position: "absolute", left: -20, right: -20, top: TOP + 32, height: 7,
    background: "#22303E", zIndex: z + 4, opacity: dim }} />
  {Array.from({ length: 11 }, (_, i) => (
    <div key={`t${i}`} style={{ position: "absolute", left: 16 + i * 96, top: TOP + 16, width: 9,
      height: 16, background: "#22303E", zIndex: z + 4, opacity: dim }} />
  ))}
  {Array.from({ length: 6 }, (_, i) => (
    <div key={`c${i}`} style={{ position: "absolute", left: 34 + i * 174, top: TOP + 38,
      width: 104, height: 54 + (i % 3) * 26, borderRadius: "0 0 60px 60px",
      border: "5px solid #223142", borderTop: "none", zIndex: z + 4, opacity: dim,
      transform: `translateY(${Math.sin(f / 48 + i) * 6}px)` }} />
  ))}

  {/* FLOOR — deck line, perspective tiles, cable runs */}
  <div style={{ position: "absolute", left: 0, right: 0, top: horizon, bottom: 0,
    background: "#111A24", zIndex: z + 6 }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: horizon, height: 6,
    background: "#33475C", zIndex: z + 7, opacity: dim }} />
  {Array.from({ length: 9 }, (_, i) => (
    <div key={`fl${i}`} style={{ position: "absolute", left: -60 + i * 148, top: horizon + 14,
      width: 4, bottom: 0, background: "#1C2836", zIndex: z + 7,
      transform: `skewX(${(i - 4) * 5}deg)` }} />
  ))}
  {[0, 1, 2].map((i) => (
    <div key={`cr${i}`} style={{ position: "absolute", left: -40, right: -40,
      top: horizon + 92 + i * 28, height: 6, borderRadius: 3,
      background: i % 2 ? "#1A2431" : "#1E2A38", zIndex: z + 7,
      transform: `rotate(${(i - 1) * 0.5}deg)` }} />
  ))}

  {/* AIR — slow specks, so even empty space is not dead */}
  {Array.from({ length: 22 }, (_, i) => {
    const y = ((i * 63 + f * (0.5 + (i % 4) * 0.22)) % 640) + TOP + 40;
    return (
      <div key={`a${i}`} style={{ position: "absolute", left: 20 + rnd(i, 3) * 960, top: y,
        width: 5, height: 5, background: "#33475C", zIndex: z + 8, opacity: 0.55 * dim }} />
    );
  })}
</>);
};
