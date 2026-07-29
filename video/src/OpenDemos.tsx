import React from "react";
import { Easing, interpolate, Img, staticFile } from "remotion";
import { inter, fraunces } from "./fonts";
import { INK, CLAY, RED, GREEN, MUTE, GOLD, SKY, MONO, grad, hexA, Mascot } from "./SlopKit";
import { PINK, PURPLE } from "./OpenArcade";

/* =========================================================================
   THE CABINET SCREENS. Every demo is authored to fill the cabinet's screen
   EXACTLY: 892 x 400 panel-local. Anything narrower reads as off-centre and
   sparse, which is what happened when the cabinets were enlarged and these
   were left at their old dimensions.
   ========================================================================= */
export const SW = 892, SH = 400;

const OUT = Easing.out(Easing.cubic), IO = Easing.inOut(Easing.cubic), BACK = Easing.out(Easing.back(1.6));
const E = (f: number, a: number, b: number, va = 0, vb = 1, ez: any = OUT) =>
  b <= a ? (f >= b ? vb : va)
         : interpolate(f, [a, b], [va, vb], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ez });
const osc = (f: number, p: number, a = 1, ph = 0) => Math.sin(f / p + ph) * a;

/* ⛔ MATTE ANIMATION PALETTE — solid paints only. No neon halos, no low-opacity
   washes. `mix()` turns any accent into a SOLID pastel so surfaces stay readable. */
const UI_LINE = "#C2B69E", UI_DIM = "#8A8172", UI_INK = "#2B2620";
const PAPER = "#F7F5F0", PAPER2 = "#EDE7DA", PAPER3 = "#DED5C4", PAPER4 = "#CDC2AB";
const BAR = "#4A4237";
export const mix = (hex: string, k = 0.82) => {
  const n = parseInt(hex.slice(1), 16);
  const m = (v: number) => Math.round(v + (247 - v) * k);
  return `rgb(${m((n >> 16) & 255)},${m((n >> 8) & 255)},${m(n & 255)})`;
};

/* a small app chrome bar so every screen reads as real software */
const AppBar: React.FC<{ title: string; right?: React.ReactNode; icon?: string }> = ({ title, right, icon = "●" }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 34, background: BAR, borderBottom: `3px solid #37302A`, display: "flex", alignItems: "center", padding: "0 12px", gap: 9 }}>
    {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => <div key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c }} />)}
    <span style={{ marginLeft: 6, fontFamily: MONO, fontSize: 13, color: "#E4DCCB" }}>{icon} {title}</span>
    <div style={{ flex: 1 }} />
    {right}
  </div>
);
const Chip: React.FC<{ c?: string; children: React.ReactNode }> = ({ c = SKY, children }) => (
  <span style={{ padding: "3px 9px", borderRadius: 999, background: mix(c, 0.7), border: `2px solid ${c}`, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 11, color: c, whiteSpace: "nowrap" }}>{children}</span>
);
const Line: React.FC<{ x: number; y: number; w: number; h?: number; c?: string; o?: number }> = ({ x, y, w, h = 9, c = "#9C907B", o = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, borderRadius: h / 2, background: c, opacity: o }} />
);

/* ============ 1 · CAVEMAN — a real side-by-side diff ============ */
export const DemoCaveman: React.FC<{ f: number; flip: number; smashed: boolean; tok: number }> = ({ f, flip, smashed, tok }) => {
  const PW = 424;
  const BEFORE = [396, 372, 388, 344, 380, 316, 364, 330, 352];
  const AFTER = ["USE HOOK.", "CACHE IT.", "SHIP.", "DONE."];
  return (<>
    <AppBar title="claude · response.txt" icon="◈" right={<div style={{ display: "flex", gap: 6 }}><Chip c={RED}>-9 lines</Chip><Chip c={GREEN}>+4 lines</Chip></div>} />
    {/* LEFT pane — the rambling default */}
    <div style={{ position: "absolute", left: 12, top: 44, width: PW, bottom: 62, borderRadius: 9, background: mix(RED), border: `2px solid ${RED}`, overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "6px 10px", background: mix(RED, 0.72), borderBottom: `1px solid ${RED}` }}>
        <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 14, color: RED }}>−</span>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 12, color: "#F0B4AC", letterSpacing: 1.4 }}>CLAUDE, NORMALLY</span>
        <div style={{ flex: 1 }} />
        <span style={{ fontFamily: MONO, fontSize: 12, color: RED }}>1,240 tok</span>
      </div>
      {BEFORE.map((w, i) => (
        <React.Fragment key={i}>
          <span style={{ position: "absolute", left: 8, top: 40 + i * 23, fontFamily: MONO, fontSize: 11, color: RED }}>{i + 1}</span>
          <Line x={30} y={43 + i * 23} w={w * 0.92} h={11} c="#5E6B85" o={smashed ? 0.28 : 0.95} />
        </React.Fragment>
      ))}
    </div>
    {/* RIGHT pane — caveman */}
    <div style={{ position: "absolute", right: 12, top: 44, width: PW, bottom: 62, borderRadius: 9, background: mix(GREEN), border: `3px solid ${smashed ? GREEN : UI_LINE}`, overflow: "hidden", boxShadow: "0 8px 16px rgba(26,24,19,0.22)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "6px 10px", background: mix(GREEN, 0.72), borderBottom: `1px solid ${GREEN}` }}>
        <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 14, color: GREEN }}>+</span>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 12, color: "#B6E3CD", letterSpacing: 1.4 }}>CLAUDE, CAVEMAN</span>
        <div style={{ flex: 1 }} />
        <span style={{ fontFamily: MONO, fontSize: 12, color: GREEN }}>{smashed ? "434 tok" : "—"}</span>
      </div>
      {AFTER.map((t, i) => (
        <div key={t} style={{ position: "absolute", left: 30, top: 42 + i * 44, opacity: E(f, flip + 30 + i * 7, flip + 42 + i * 7, 0, 1, OUT), transform: `translateX(${(1 - E(f, flip + 30 + i * 7, flip + 42 + i * 7, 0, 1, BACK)) * 22}px)` }}>
          <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 30, color: "#CFE6DA" }}>{t}</span>
        </div>
      ))}
      {!smashed && <div style={{ position: "absolute", left: 30, top: 60, fontFamily: MONO, fontSize: 15, color: GREEN }}>waiting…</div>}
    </div>
    {/* debris flying out of the left pane on the smash */}
    {smashed && Array.from({ length: 22 }, (_, i) => {
      const t = Math.min(1, (f - flip - 30) / 32);
      return <div key={i} style={{ position: "absolute", left: 30 + (i % 11) * 38, top: 60 + Math.floor(i / 11) * 90 + t * (120 + (i % 5) * 50), width: 26, height: 9, borderRadius: 3, background: "#A79B85", opacity: 1 - t, transform: `rotate(${t * (i % 2 ? 220 : -220)}deg)` }} />;
    })}
    {/* full-width token meter */}
    <div style={{ position: "absolute", left: 12, right: 12, bottom: 12, height: 40, borderRadius: 9, background: PAPER3, border: `2px solid ${UI_LINE}`, display: "flex", alignItems: "center", gap: 12, padding: "0 12px" }}>
      <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 12, color: UI_DIM, letterSpacing: 1.4 }}>TOKENS USED</span>
      <div style={{ flex: 1, height: 16, borderRadius: 999, background: PAPER4, border: `1px solid ${UI_LINE}`, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${tok}%`, background: tok < 60 ? GREEN : RED }} />
      </div>
      <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 19, color: tok < 60 ? GREEN : RED, minWidth: 56, textAlign: "right" }}>{Math.round(tok)}%</span>
    </div>
  </>);
};

/* ============ 2 · UI/UX PRO MAX — a full browser, before and after ============ */
export const DemoTaste: React.FC<{ f: number; wipe: number }> = ({ f, wipe }) => {
  const Page: React.FC<{ good?: boolean }> = ({ good }) => (
    <div style={{ position: "absolute", inset: 0, background: good ? "#FAF9F5" : "linear-gradient(150deg,#6D3BD6,#B14BE8 52%,#3B1E7A)" }}>
      {/* nav */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 44, display: "flex", alignItems: "center", padding: "0 26px", gap: 22, borderBottom: good ? "1px solid #E7E1D4" : "1px solid rgba(255,255,255,0.2)" }}>
        <div style={{ width: 26, height: 26, borderRadius: good ? 8 : "50%", background: good ? CLAY : "rgba(255,255,255,0.9)" }} />
        {[46, 54, 40, 50].map((w, i) => <div key={i} style={{ width: w, height: 9, borderRadius: 4, background: good ? "#C9C2B4" : "rgba(255,255,255,0.55)" }} />)}
        <div style={{ flex: 1 }} />
        <div style={{ width: 84, height: 26, borderRadius: good ? 8 : 999, background: good ? CLAY : "#fff" }} />
      </div>
      {/* hero */}
      {good ? (
        <>
          <div style={{ position: "absolute", left: 26, top: 66, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 42, color: "#241F19", lineHeight: 1 }}>Ship faster.</div>
          <div style={{ position: "absolute", left: 26, top: 116, width: 320, height: 11, borderRadius: 4, background: "#C9C2B4" }} />
          <div style={{ position: "absolute", left: 26, top: 134, width: 244, height: 11, borderRadius: 4, background: "#DCD5C7" }} />
          <div style={{ position: "absolute", left: 26, top: 162, padding: "10px 24px", borderRadius: 9, background: CLAY, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 14, color: "#fff" }}>Get started</div>
          <div style={{ position: "absolute", right: 26, top: 66, width: 300, height: 132, borderRadius: 14, background: "linear-gradient(160deg,#F1ECE0,#E4DCCB)", border: "2px solid #E0D8C6" }} />
        </>
      ) : (
        <>
          <div style={{ position: "absolute", left: 26, top: 70, width: 360, height: 30, borderRadius: 6, background: "rgba(255,255,255,0.9)" }} />
          <div style={{ position: "absolute", left: 26, top: 112, width: 268, height: 14, borderRadius: 5, background: "rgba(255,255,255,0.5)" }} />
          <div style={{ position: "absolute", left: 26, top: 160, width: 150, height: 40, borderRadius: 999, background: "#fff" }} />
          <div style={{ position: "absolute", right: 26, top: 66, width: 300, height: 132, borderRadius: 18, background: "rgba(255,255,255,0.15)", border: "2px solid rgba(255,255,255,0.3)" }} />
        </>
      )}
      {/* feature row */}
      {[0, 1, 2, 3].map((i) => (
        <div key={i} style={{ position: "absolute", left: 26 + i * 212, top: 224, width: 190, height: 108, borderRadius: good ? 14 : 12, background: good ? "#fff" : "rgba(255,255,255,0.16)", border: good ? "2px solid #E7E1D4" : "2px solid rgba(255,255,255,0.28)", boxShadow: good ? "0 6px 14px rgba(0,0,0,0.06)" : "none" }}>
          <div style={{ position: "absolute", left: 14, top: 14, width: 34, height: 34, borderRadius: good ? 10 : "50%", background: good ? [CLAY, GREEN, SKY, GOLD][i] : "rgba(255,255,255,0.55)" }} />
          <div style={{ position: "absolute", left: 14, top: 60, width: 118, height: 10, borderRadius: 4, background: good ? "#D6CFC0" : "rgba(255,255,255,0.45)" }} />
          <div style={{ position: "absolute", left: 14, top: 78, width: 82, height: 10, borderRadius: 4, background: good ? "#E4DED1" : "rgba(255,255,255,0.3)" }} />
        </div>
      ))}
      {/* footer strip */}
      <div style={{ position: "absolute", left: 26, right: 26, bottom: 14, height: 22, borderRadius: 6, background: good ? "#EFE9DC" : "rgba(255,255,255,0.12)" }} />
    </div>
  );
  return (<>
    <AppBar title="localhost:3000" icon="⌘" right={<div style={{ display: "flex", gap: 6 }}>{wipe > 0.5 ? <Chip c={GREEN}>design system applied</Chip> : <Chip c={PURPLE}>generic AI output</Chip>}</div>} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 34, bottom: 0, overflow: "hidden" }}>
      <Page />
      <div style={{ position: "absolute", inset: 0, clipPath: `inset(0 ${(1 - wipe) * 100}% 0 0)` }}><Page good /></div>
      {wipe > 0.02 && wipe < 0.99 && (
        <div style={{ position: "absolute", left: wipe * SW - 20, top: -10, width: 40, bottom: -10, background: "#F4F1EA", borderRadius: 6, border: "3px solid #B9AE97", boxShadow: "0 8px 18px rgba(26,24,19,0.3)" }} />
      )}
    </div>
  </>);
};

/* ============ 3 · AGENCY AGENTS — a 12-card role grid ============ */
export const DemoAgency: React.FC<{ f: number; flip: number; n: number }> = ({ f, flip, n }) => {
  const ROLES: [string, string, string][] = [
    ["frontend-developer", "ENG", "#3E6FBF"], ["backend-architect", "ENG", "#3E6FBF"], ["security-engineer", "ENG", "#3E6FBF"],
    ["ui-designer", "DESIGN", "#E27BA0"], ["ux-researcher", "DESIGN", "#E27BA0"], ["brand-guardian", "DESIGN", "#E27BA0"],
    ["growth-hacker", "GROWTH", "#3F9E74"], ["seo-specialist", "GROWTH", "#3F9E74"], ["reddit-ninja", "GROWTH", "#3F9E74"],
    ["copywriter", "CONTENT", "#E7B24C"], ["podcast-producer", "CONTENT", "#E7B24C"], ["whimsy-injector", "CONTENT", "#E7B24C"],
  ];
  return (<>
    <AppBar title="~/.claude/agents" icon="◫" right={<div style={{ display: "flex", gap: 6 }}><Chip c={GOLD}>{n} roles</Chip><Chip c={GREEN}>20 departments</Chip></div>} />
    <div style={{ position: "absolute", left: 12, right: 12, top: 42, height: 26, borderRadius: 7, background: PAPER3, border: `1px solid ${UI_LINE}`, display: "flex", alignItems: "center", padding: "0 10px", gap: 8 }}>
      <span style={{ fontSize: 11, color: UI_DIM }}>🔍</span>
      <span style={{ fontFamily: MONO, fontSize: 12, color: UI_DIM }}>filter roles…</span>
    </div>
    {ROLES.map(([name, dept, c], i) => {
      const col = i % 4, row = Math.floor(i / 4);
      const app = E(f, flip + 4 + i * 3, flip + 16 + i * 3, 0, 1, BACK);
      return (
        <div key={name} style={{ position: "absolute", left: 12 + col * 220, top: 78 + row * 76, width: 208, height: 66, borderRadius: 9, background: PAPER2, border: `2px solid ${c}`, opacity: app, transform: `scale(${0.9 + app * 0.1})` }}>
          <div style={{ position: "absolute", left: 9, top: 9, width: 30, height: 30, borderRadius: 8, background: c, border: `1px solid ${c}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>{["🖥", "🏗", "🛡", "🎨", "🔬", "🛟", "📈", "🔎", "👾", "✍️", "🎙", "✨"][i]}</div>
          <div style={{ position: "absolute", left: 47, top: 10, fontFamily: MONO, fontWeight: 700, fontSize: 12, color: UI_INK }}>{name}</div>
          <div style={{ position: "absolute", left: 47, top: 30, display: "flex", gap: 5, alignItems: "center" }}>
            <span style={{ padding: "1px 7px", borderRadius: 999, background: mix(c, 0.6), fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 9, color: c }}>{dept}</span>
            <span style={{ fontFamily: MONO, fontSize: 10, color: GREEN }}>ready</span>
          </div>
          <Line x={47} y={50} w={128} h={6} c="#31405C" />
        </div>
      );
    })}
    <div style={{ position: "absolute", left: 12, right: 12, bottom: 10, height: 30, borderRadius: 7, background: PAPER3, border: `1px solid ${UI_LINE}`, display: "flex", alignItems: "center", padding: "0 10px", gap: 9 }}>
      <span style={{ fontFamily: MONO, fontSize: 12, color: GREEN }}>$</span>
      <span style={{ fontFamily: MONO, fontSize: 12, color: UI_INK }}>cp -r agents/ ~/.claude/agents/</span>
      <div style={{ width: 8, height: 14, background: GREEN, opacity: f % 20 < 10 ? 1 : 0 }} />
      <div style={{ flex: 1 }} />
      <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 14, color: GOLD }}>{n} / 267</span>
    </div>
  </>);
};

/* ============ 4 · AGENT MEMORY — save slots + a live context panel ============ */
export const DemoMemory: React.FC<{ f: number; flip: number }> = ({ f, flip }) => {
  const DAYS: [string, string][] = [["MON", "chose Postgres over Mongo"], ["TUE", "auth flow + rate limits"], ["WED", "billing webhooks"], ["THU", "refactored the queue"], ["FRI", "shipped v2 to prod"]];
  return (<>
    <AppBar title="agentmemory · recall" icon="◈" right={<div style={{ display: "flex", gap: 6 }}><Chip c={GREEN}>5 sessions</Chip><Chip c={SKY}>0 re-explains</Chip></div>} />
    <div style={{ position: "absolute", left: 12, top: 44, width: 536, bottom: 12 }}>
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 11, color: UI_DIM, letterSpacing: 1.6, marginBottom: 6 }}>SESSION HISTORY</div>
      {DAYS.map(([d, note], i) => {
        const lit = f > flip + 14 + i * 10;
        return (
          <div key={d} style={{ position: "absolute", left: 0, right: 0, top: 24 + i * 58, height: 50, borderRadius: 9, background: lit ? mix(GREEN, 0.72) : PAPER2, border: `2px solid ${lit ? GREEN : UI_LINE}`, display: "flex", alignItems: "center", gap: 11, padding: "0 11px", transform: `translateX(${lit ? 0 : -6}px)` }}>
            <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 15, color: lit ? GREEN : "#4E5C7E", width: 40 }}>{d}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 13, color: lit ? "#CFE6DA" : "#41506E" }}>{note}</div>
              <Line x={0} y={22} w={lit ? 210 : 150} h={6} c={lit ? GREEN : "#31405C"} />
            </div>
            <span style={{ fontSize: 16, opacity: lit ? 1 : 0.25 }}>{lit ? "✅" : "⬜"}</span>
          </div>
        );
      })}
    </div>
    <div style={{ position: "absolute", right: 12, top: 44, width: 320, bottom: 12, borderRadius: 9, background: PAPER2, border: `2px solid ${UI_LINE}`, padding: 12 }}>
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 11, color: UI_DIM, letterSpacing: 1.6 }}>CONTEXT LOADED</div>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 22, color: UI_INK, marginTop: 8 }}>acme-api</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 9 }}>
        {["TypeScript", "Postgres", "Fastify", "Stripe"].map((t, i) => <Chip key={t} c={[SKY, GREEN, GOLD, PINK][i]}>{t}</Chip>)}
      </div>
      {[["decisions", "42"], ["files indexed", "1,318"], ["last recall", "0.2s"]].map(([k, v], i) => (
        <div key={k} style={{ position: "absolute", left: 12, right: 12, top: 128 + i * 30, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: inter.fontFamily, fontSize: 12, color: UI_DIM }}>{k}</span>
          <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 15, color: GREEN }}>{v}</span>
        </div>
      ))}
      {/* a little recall sparkline */}
      <svg width={296} height={54} style={{ position: "absolute", left: 12, bottom: 44 }}>
        <polyline points={Array.from({ length: 22 }, (_, i) => `${i * 14},${40 - (12 + osc(f + i * 9, 7, 10) + i * 0.7)}`).join(" ")} fill="none" stroke={GREEN} strokeWidth={2.5} opacity={0.85} />
      </svg>
      <div style={{ position: "absolute", left: 12, right: 12, bottom: 10, padding: "7px 0", borderRadius: 7, background: mix(GREEN, 0.72), border: `2px solid ${GREEN}`, textAlign: "center", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 13, color: "#CFE6DA" }}>still loaded</div>
    </div>
  </>);
};

/* ============ 5 · LAST 30 DAYS — 4 CENTRED feed columns into one summary ============ */
export const DemoFeeds: React.FC<{ f: number; flip: number; card: number }> = ({ f, flip, card }) => {
  const FEEDS: [string, string, string][] = [["reddit", "r/ClaudeAI", "#FF4500"], ["x", "@builders", "#FFFFFF"], ["youtube", "yt/devs", "#FF0000"], ["ycombinator", "HN front", "#FF6600"]];
  const COLW = 200, GAP = 24;
  const total = FEEDS.length * COLW + (FEEDS.length - 1) * GAP;   // 896-ish -> centred below
  const x0 = Math.round((SW - total) / 2);
  const CX = SW / 2;
  return (<>
    <AppBar title="last30days · research" icon="◎" right={<div style={{ display: "flex", gap: 6 }}><Chip c={SKY}>last 30 days</Chip><Chip c={GREEN}>ranked by engagement</Chip></div>} />
    {/* four evenly spaced, screen-centred source columns */}
    {FEEDS.map(([slug, label, c], i) => {
      const x = x0 + i * (COLW + GAP);
      const on = f > flip + 4 + i * 6;
      return (
        <div key={slug} style={{ position: "absolute", left: x, top: 44, width: COLW }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 8px", borderRadius: 8, background: on ? mix(GOLD, 0.74) : PAPER2, border: `3px solid ${on ? GOLD : UI_LINE}`, boxShadow: "0 6px 12px rgba(26,24,19,0.2)" }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: "#F4F1EA", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Img src={staticFile(`logos/${slug}.svg`)} style={{ width: 19, height: 19, objectFit: "contain" }} />
            </div>
            <div>
              <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 12, color: UI_INK }}>{label}</div>
              <div style={{ fontFamily: MONO, fontSize: 10, color: on ? GREEN : UI_DIM }}>{on ? `${120 + i * 47} posts` : "scanning…"}</div>
            </div>
          </div>
          {/* posts falling from this column toward the centre funnel */}
          {[0, 1, 2].map((k) => {
            const t = ((f * 2.6 + i * 26 + k * 44) % 130) / 130;
            const cx = x + COLW / 2;
            const px = cx + (CX - cx) * t;
            return (
              <div key={k} style={{ position: "absolute", left: px - x - 54, top: 52 + t * 130, width: 108, height: 30, borderRadius: 6, background: PAPER, border: `2px solid ${c === "#FFFFFF" ? SKY : c}`, opacity: (1 - t) * 0.95, transform: `scale(${1 - t * 0.32})` }}>
                <Line x={7} y={7} w={72} h={6} c="#5E6B85" />
                <Line x={7} y={18} w={48} h={5} c="#41506E" />
                <div style={{ position: "absolute", right: 6, top: 9, fontFamily: MONO, fontSize: 9, color: GOLD }}>▲{9 + k * 7}</div>
              </div>
            );
          })}
        </div>
      );
    })}
    {/* the centred funnel */}
    <div style={{ position: "absolute", left: CX - 168, top: 224, width: 336, height: 40, background: grad("#33415F", "#1E2942"), clipPath: "polygon(0 0, 100% 0, 60% 100%, 40% 100%)" }} />
    <div style={{ position: "absolute", left: CX - 168, top: 224, width: 336, height: 40, background: `linear-gradient(180deg, ${mix(GOLD, 0.72)}, transparent)`, clipPath: "polygon(0 0, 100% 0, 60% 100%, 40% 100%)" }} />
    {/* the one grounded summary, dead centre */}
    <div style={{ position: "absolute", left: CX - 210, top: 272, width: 420, height: 112, borderRadius: 11, background: "linear-gradient(170deg,#FFFFFF,#F1ECE0)", border: "3px solid #E0D8C6", transform: `scale(${card})`, transformOrigin: "50% 0%", boxShadow: "0 8px 16px rgba(26,24,19,0.28)" }}>
      <div style={{ position: "absolute", left: 16, top: 11, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 21, color: INK }}>One grounded <span style={{ color: CLAY }}>summary</span></div>
      {[300, 366, 268].map((w, i) => <div key={i} style={{ position: "absolute", left: 16, top: 44 + i * 15, width: w, height: 8, borderRadius: 3, background: "#D8D2C4" }} />)}
      <div style={{ position: "absolute", left: 16, bottom: 10, display: "flex", gap: 6 }}>
        {FEEDS.map(([slug]) => (
          <div key={slug} style={{ width: 22, height: 22, borderRadius: 6, background: "#F4F1EA", border: "1px solid #E0D8C6", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Img src={staticFile(`logos/${slug}.svg`)} style={{ width: 13, height: 13, objectFit: "contain" }} />
          </div>
        ))}
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 11, color: "#8A8172", alignSelf: "center", marginLeft: 4 }}>with real citations</span>
      </div>
    </div>
  </>);
};

/* ============ 6 · OPEN MONTAGE — a full video editor ============ */
export const DemoMontage: React.FC<{ f: number; flip: number }> = ({ f, flip }) => {
  const play = ((f - flip) * 3.4) % 420;
  const TRACKS: [string, string, number[]][] = [
    ["VIDEO", SKY, [0, 120, 250, 330]],
    ["B-ROLL", PINK, [40, 180, 300]],
    ["VO", GOLD, [10, 150, 290]],
    ["MUSIC", GREEN, [0]],
  ];
  const prog = E(f, flip + 10, flip + 70, 0, 100, IO);
  return (<>
    <AppBar title="OpenMontage · timeline" icon="▤" right={<div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <Chip c={PINK}>12 pipelines</Chip><Chip c={SKY}>100+ tools</Chip>
      <div style={{ width: 96, height: 9, borderRadius: 5, background: PAPER4, border: `1px solid ${UI_LINE}` }}>
        <div style={{ height: "100%", width: `${prog}%`, borderRadius: 5, background: grad(GOLD, "#D39A2A"), boxShadow: "0 8px 16px rgba(26,24,19,0.28)" }} />
      </div>
      <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 11, color: GOLD, width: 34 }}>{Math.round(prog)}%</span>
    </div>} />
    {/* preview window */}
    <div style={{ position: "absolute", left: 12, top: 44, width: 396, height: 224, borderRadius: 9, background: "#3E4E5C", border: `2px solid ${UI_LINE}`, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: grad("#243356", "#111A2B") }} />
      {Array.from({ length: 5 }, (_, i) => <div key={i} style={{ position: "absolute", left: 30 + i * 74, bottom: 46 + (i % 3) * 22, width: 52, height: 52 + (i % 3) * 26, borderRadius: 6, background: mix([SKY, PINK, GOLD, GREEN, PURPLE][i], 0.35), border: `2px solid ${[SKY, PINK, GOLD, GREEN, PURPLE][i]}` }} />)}
      <div style={{ position: "absolute", left: 168, top: 88, width: 0, height: 0, borderTop: "22px solid transparent", borderBottom: "22px solid transparent", borderLeft: `34px solid ${"#FFFFFF"}` }} />
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 26, background: "rgba(6,10,20,0.85)", display: "flex", alignItems: "center", padding: "0 10px", gap: 9 }}>
        <span style={{ fontFamily: MONO, fontSize: 11, color: GREEN }}>● REC</span>
        <span style={{ fontFamily: MONO, fontSize: 11, color: UI_DIM }}>00:0{Math.floor(play / 100)}:{String(Math.floor(play) % 60).padStart(2, "0")} / 00:14</span>
        <div style={{ flex: 1, height: 4, borderRadius: 2, background: PAPER4 }}><div style={{ height: "100%", width: `${(play / 420) * 100}%`, background: GOLD, borderRadius: 2 }} /></div>
      </div>
    </div>
    {/* shot list */}
    <div style={{ position: "absolute", right: 12, top: 44, width: 456, height: 224, borderRadius: 9, background: PAPER2, border: `2px solid ${UI_LINE}`, padding: 10 }}>
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 11, color: UI_DIM, letterSpacing: 1.6 }}>PIPELINE · animated explainer</div>
      {[["research", "live web search", GREEN], ["script", "voice direction", GOLD], ["images", "AI generated", PINK], ["voice", "Piper TTS", SKY], ["music", "royalty-free", PURPLE], ["render", "Remotion + ffmpeg", CLAY]].map(([step, note, c], i) => {
        const done = f > flip + 12 + i * 8;
        return (
          <div key={step as string} style={{ position: "absolute", left: 10, top: 32 + i * 30, right: 10, height: 26, borderRadius: 6, background: done ? mix(c as string, 0.72) : "rgba(255,255,255,0.02)", border: `1px solid ${done ? c as string : UI_LINE}`, display: "flex", alignItems: "center", gap: 8, padding: "0 8px" }}>
            <span style={{ fontSize: 11, color: done ? GREEN : "#41506E" }}>{done ? "✓" : "○"}</span>
            <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 12, color: done ? "#CBD8EE" : "#41506E", width: 74 }}>{step}</span>
            <span style={{ fontFamily: inter.fontFamily, fontSize: 11, color: UI_DIM }}>{note}</span>
            <div style={{ flex: 1 }} />
            <div style={{ opacity: done ? 1 : 0.25 }}><Mascot lf={f + i * 21} size={22} nodAmp={1.6} nodSpeed={7} /></div>
          </div>
        );
      })}
    </div>
    {/* timeline */}
    <div style={{ position: "absolute", left: 12, right: 12, top: 272, bottom: 8, borderRadius: 9, background: PAPER3, border: `2px solid ${UI_LINE}`, overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 16, background: BAR, borderBottom: `1px solid ${UI_LINE}` }}>
        {Array.from({ length: 22 }, (_, i) => <div key={i} style={{ position: "absolute", left: 66 + i * 36, top: 4, width: 1, height: 8, background: "#B9AE97" }} />)}
      </div>
      {TRACKS.map(([name, c, clips], r) => (
        <div key={name} style={{ position: "absolute", left: 0, right: 0, top: 18 + r * 22, height: 20 }}>
          <div style={{ position: "absolute", left: 6, top: 3, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 9, color: UI_DIM, letterSpacing: 1 }}>{name}</div>
          {(clips as number[]).map((cx, k) => (
            <div key={k} style={{ position: "absolute", left: 66 + cx * 1.9, top: 2, width: (name === "MUSIC" ? 780 : 100 + k * 34), height: 16, borderRadius: 4, background: c as string, border: `1px solid ${c as string}` }}>
              {Array.from({ length: 5 }, (_, w) => <div key={w} style={{ position: "absolute", left: 6 + w * 11, top: 4, width: 3, height: 8, background: c as string }} />)}
            </div>
          ))}
        </div>
      ))}
      {/* playhead */}
      <div style={{ position: "absolute", left: 66 + (play / 420) * 780, top: 0, bottom: 0, width: 2, background: RED, boxShadow: "0 8px 16px rgba(26,24,19,0.28)" }} />
      <div style={{ position: "absolute", left: 60 + (play / 420) * 780, top: 0, width: 14, height: 10, borderRadius: 2, background: RED }} />
    </div>
  </>);
};

/* ============ 7 · ORCA — 8 worktrees, with a fleet header ============ */
export const DemoOrca: React.FC<{ f: number; flip: number }> = ({ f, flip }) => {
  const LANES = 8;
  const ps = Array.from({ length: LANES }, (_, i) => E(f, flip + 6 + i * 3, flip + 6 + i * 3 + (48 + (i % 4) * 18), 0, 1, IO));
  const doneN = ps.filter((p) => p >= 0.999).length;
  const AGENTS = ["claude-code", "codex", "cursor-cli", "opencode", "copilot", "amp", "grok", "pi"];
  return (<>
    <AppBar title="orca · fleet" icon="⛴" right={<div style={{ display: "flex", gap: 6 }}><Chip c={SKY}>8 worktrees</Chip><Chip c={GREEN}>{doneN}/8 done</Chip></div>} />
    <div style={{ position: "absolute", left: 12, right: 12, top: 42, height: 26, borderRadius: 7, background: PAPER3, border: `1px solid ${UI_LINE}`, display: "flex", alignItems: "center", padding: "0 10px", gap: 10 }}>
      <span style={{ fontFamily: MONO, fontSize: 11, color: GREEN }}>$ orca run --fan-out 8</span>
      <div style={{ flex: 1, height: 8, borderRadius: 4, background: PAPER4 }}>
        <div style={{ height: "100%", width: `${(ps.reduce((a, b) => a + b, 0) / LANES) * 100}%`, borderRadius: 4, background: grad(SKY, "#3E6FBF"), boxShadow: "0 8px 16px rgba(26,24,19,0.28)" }} />
      </div>
      <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 12, color: SKY }}>{Math.round((ps.reduce((a, b) => a + b, 0) / LANES) * 100)}%</span>
    </div>
    {ps.map((p, i) => {
      const done = p >= 0.999;
      return (
        <div key={i} style={{ position: "absolute", left: 12 + (i % 2) * 440, top: 76 + Math.floor(i / 2) * 76, width: 428, height: 66, borderRadius: 9, background: done ? mix(GREEN) : PAPER2, border: `2px solid ${done ? GREEN : UI_LINE}`, overflow: "hidden" }}>
          <div style={{ position: "absolute", left: 8, top: 6 }}><Mascot lf={f + i * 19} size={52} nodAmp={2.4} nodSpeed={6 + (i % 3)} cheer={done ? 0.6 : 0} /></div>
          <div style={{ position: "absolute", left: 66, top: 8, fontFamily: MONO, fontWeight: 900, fontSize: 13, color: done ? GREEN : "#CBD8EE" }}>{AGENTS[i]}</div>
          <div style={{ position: "absolute", left: 66, top: 26, fontFamily: MONO, fontSize: 10, color: UI_DIM }}>worktree/feat-{i + 1}</div>
          <div style={{ position: "absolute", left: 66, top: 44, right: 60, height: 12, borderRadius: 6, background: PAPER4, border: `1px solid ${UI_LINE}` }}>
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${p * 100}%`, borderRadius: 6, background: done ? GREEN : grad(SKY, "#3E6FBF"), boxShadow: "0 8px 16px rgba(26,24,19,0.28)" }} />
          </div>
          <div style={{ position: "absolute", right: 10, top: 24, fontFamily: MONO, fontWeight: 900, fontSize: 16, color: done ? GREEN : SKY }}>{done ? "✓" : `${Math.round(p * 100)}%`}</div>
          <div style={{ position: "absolute", right: 10, top: 46, fontFamily: MONO, fontSize: 9, color: UI_DIM }}>+{Math.round(p * (40 + i * 11))}/-{Math.round(p * (7 + i * 3))}</div>
        </div>
      );
    })}
  </>);
};
