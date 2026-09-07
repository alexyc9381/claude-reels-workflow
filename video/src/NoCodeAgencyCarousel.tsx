import React from "react";
import { AbsoluteFill, useCurrentFrame, Img, staticFile } from "remotion";
import { fraunces, inter } from "./fonts";
import { Mascot } from "./ClaudeOsReel";

/* =========================================================================
   NO-CODE ALEX · "You just hired an AI agency."
   Carousel from reel 135 AGENCY (msitarzewski/agency-agents).
   WORLD BUILD: the deck is a walk through an actual agency — facade, lobby
   directory, the floor, the seven desks, the corner office, reception.
   HIERARCHY per slide: one hero biggest by 3-4x + ONE repeated object
   (the DESK) + a hued near-black mass. Six slides, almost no type.
   1080x1350, one slide per frame (still render).
   ========================================================================= */

const INK = "#1A1813", CLAY = "#D97757", MUTE = "#8B8578", PAPER = "#F5F1E8";
const LIME = "#C7EB6A", BRASS = "#C6A45E", RUST = "#B0472F", GREEN = "#2C7A50";
const mono = "ui-monospace,'SF Mono',Menlo,monospace";
const seed = (n: number) => { const x = Math.sin(n * 127.1 + 43.7) * 43758.5453; return x - Math.floor(x); };
const rgb = (h: string) => { h = h.replace("#", ""); return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16) }; };
const hexA = (h: string, a: number) => { const { r, g, b } = rgb(h); return `rgba(${r},${g},${b},${a})`; };

/* ------------------------------------------------------------- the PLACE
   One palette per room; Fitout takes its entire colour from this, so a dim
   room and a warm room are the same architecture at different values.     */
type Place = { wall: string; wall2: string; dado: string; trim: string; floor: string; floorD: string; dark: string; lamp: string };
const WARM: Place = { wall: "#EFE1C7", wall2: "#DCC7A4", dado: "#CBAF88", trim: "#B08F66", floor: "#B98D63", floorD: "#8E6A49", dark: "#211A13", lamp: "#F8E6BA" };
const DIM: Place = { wall: "#4A3E31", wall2: "#332A21", dado: "#2C241C", trim: "#5A4938", floor: "#3A2E24", floorD: "#241C15", dark: "#150F0A", lamp: "#F3D79E" };

/* the FITOUT: cornice · clerestory w/ mullions · pilasters · panelled dado ·
   skirting · converging boards. Same members in every room, palette-driven. */
const Fitout: React.FC<{ p: Place; horizon?: number }> = ({ p, horizon = 946 }) => {
  const bays = [0, 216, 432, 648, 864];
  return (
    <svg style={{ position: "absolute", top: 0, left: 0 }} width={1080} height={1350}>
      <defs>
        <linearGradient id="wallg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={p.wall} /><stop offset="1" stopColor={p.wall2} /></linearGradient>
        <linearGradient id="floorg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={p.floorD} /><stop offset="1" stopColor={p.floor} /></linearGradient>
        <radialGradient id="pool"><stop offset="0" stopColor={hexA(p.lamp, 0.5)} /><stop offset="1" stopColor={hexA(p.lamp, 0)} /></radialGradient>
      </defs>
      {/* wall + floor */}
      <rect x={0} y={0} width={1080} height={horizon} fill="url(#wallg)" />
      <rect x={0} y={horizon} width={1080} height={1350 - horizon} fill="url(#floorg)" />
      {/* converging boards */}
      {Array.from({ length: 13 }, (_, i) => {
        const x = i * 90;
        return <line key={i} x1={540 + (x - 540) * 0.34} y1={horizon} x2={x} y2={1350} stroke={hexA(p.dark, 0.20)} strokeWidth={2} />;
      })}
      {[0, 1, 2].map((i) => <line key={i} x1={0} y1={horizon + 66 + i * 104} x2={1080} y2={horizon + 66 + i * 104} stroke={hexA(p.dark, 0.14)} strokeWidth={2} />)}
      {/* cornice, three members */}
      <rect x={0} y={0} width={1080} height={26} fill={p.trim} />
      <rect x={0} y={26} width={1080} height={10} fill={hexA(p.dark, 0.30)} />
      <rect x={0} y={36} width={1080} height={7} fill={hexA(p.lamp, 0.18)} />
      {/* clerestory: lit openings with mullions + transom */}
      {bays.map((bx, i) => (
        <g key={i}>
          <rect x={bx + 46} y={92} width={124} height={104} rx={7} fill={hexA(p.lamp, 0.55)} stroke={p.trim} strokeWidth={5} />
          <line x1={bx + 108} y1={92} x2={bx + 108} y2={196} stroke={p.trim} strokeWidth={4} />
          <line x1={bx + 46} y1={140} x2={bx + 170} y2={140} stroke={p.trim} strokeWidth={4} />
        </g>
      ))}
      {/* pilasters with caps */}
      {[...bays, 1080].map((bx, i) => (
        <g key={i}>
          <rect x={bx - 17} y={43} width={34} height={horizon - 43} fill={hexA(p.lamp, 0.10)} stroke={hexA(p.dark, 0.16)} strokeWidth={2} />
          <rect x={bx - 26} y={228} width={52} height={16} rx={3} fill={p.trim} />
        </g>
      ))}
      {/* panelled dado + rail + skirting */}
      <rect x={0} y={horizon - 196} width={1080} height={14} fill={p.trim} />
      <rect x={0} y={horizon - 182} width={1080} height={158} fill={p.dado} />
      {Array.from({ length: 8 }, (_, i) => (
        <rect key={i} x={34 + i * 130} y={horizon - 160} width={102} height={112} rx={5} fill="none" stroke={hexA(p.dark, 0.22)} strokeWidth={3} />
      ))}
      <rect x={0} y={horizon - 24} width={1080} height={24} fill={p.trim} />
      <rect x={0} y={horizon} width={1080} height={6} fill={hexA(p.dark, 0.34)} />
      <rect x={0} y={0} width={1080} height={1350} fill="none" style={{ mixBlendMode: "multiply" }} />
    </svg>
  );
};
const Vignette: React.FC = () => (<div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 300px rgba(40,28,16,0.42)", pointerEvents: "none" }} />);

/* ------------------------------------------------------ the REPEATED OBJECT
   One desk, drawn once, used everywhere. The sprite is drawn FIRST and the
   desk over its lower half, which is what makes it read as SEATED.        */
const DeskUnit: React.FC<{ w: number; lit?: boolean; dim?: number; sprite?: React.ReactNode; p?: Place }> = ({ w, lit = true, dim = 1, sprite, p = WARM }) => {
  const H = w * 1.02, deskY = H * 0.60, top = w * 0.075, panel = w * 0.26;
  const monW = w * 0.28, monH = w * 0.21;
  return (
    <div style={{ position: "relative", width: w, height: H, opacity: dim }}>
      {/* the sprite is drawn FIRST; the desk paints over its lower edge, which is
          what makes it read as SEATED. ⛔ the monitor must sit to the LEFT — put it
          centre and it covers the face, which is the performance surface. */}
      {sprite && <div style={{ position: "absolute", left: "57%", bottom: H - deskY - w * 0.05, transform: "translateX(-50%)" }}>{sprite}</div>}
      <svg width={w} height={H} viewBox={`0 0 ${w} ${H}`} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
        <ellipse cx={w / 2} cy={H * 0.99} rx={w * 0.52} ry={w * 0.05} fill={hexA(p.dark, 0.34)} />
        <g transform={`translate(${w * 0.03} ${deskY - monH})`}>
          <rect x={0} y={0} width={monW} height={monH} rx={3} fill={lit ? "#2B3A4E" : p.dark} stroke={hexA(p.dark, 0.6)} strokeWidth={2} />
          <rect x={3} y={3} width={monW - 6} height={monH - 6} rx={2} fill={lit ? hexA(p.lamp, 0.85) : hexA(p.dark, 0.9)} />
          {lit && <g fill={hexA("#2B3A4E", 0.5)}><rect x={7} y={7} width={monW * 0.55} height={3} /><rect x={7} y={14} width={monW * 0.7} height={3} /><rect x={7} y={21} width={monW * 0.4} height={3} /></g>}
        </g>
        <rect x={0} y={deskY} width={w} height={top} rx={3} fill={lit ? "#A9714A" : p.dark} />
        <rect x={0} y={deskY} width={w} height={top * 0.34} fill={hexA(p.lamp, lit ? 0.35 : 0.06)} />
        <rect x={w * 0.06} y={deskY + top} width={w * 0.88} height={panel} fill={lit ? "#8A5A39" : p.dark} />
        <rect x={w * 0.10} y={deskY + top + panel} width={w * 0.05} height={H - (deskY + top + panel) - w * 0.02} fill={hexA(p.dark, 0.75)} />
        <rect x={w * 0.85} y={deskY + top + panel} width={w * 0.05} height={H - (deskY + top + panel) - w * 0.02} fill={hexA(p.dark, 0.75)} />
        {lit && <><rect x={w * 0.87} y={deskY - w * 0.15} width={w * 0.028} height={w * 0.15} fill={hexA(p.dark, 0.7)} />
          <path d={`M${w * 0.81} ${deskY - w * 0.15} h${w * 0.14} l-${w * 0.028} -${w * 0.055} h-${w * 0.084} z`} fill={BRASS} />
          <rect x={w * 0.63} y={deskY - w * 0.032} width={w * 0.13} height={w * 0.028} rx={2} fill={hexA(p.lamp, 0.95)} /></>}
      </svg>
    </div>
  );
};

/* ---------------------------------------------------------------- chassis */
const ProgressRail: React.FC<{ i: number; n: number }> = ({ i, n }) => (
  <div style={{ position: "absolute", top: 54, left: 60, right: 60, display: "flex", gap: 8, zIndex: 40 }}>
    {Array.from({ length: n }, (_, k) => (<div key={k} style={{ flex: 1, height: 7, borderRadius: 4, background: k <= i ? CLAY : "rgba(255,255,255,0.34)", boxShadow: k === i ? `0 0 0 3px ${hexA(CLAY, 0.22)}` : undefined }} />))}
  </div>
);
const CountChip: React.FC<{ i: number; n: number }> = ({ i, n }) => (
  <div style={{ position: "absolute", top: 78, right: 56, padding: "8px 16px", borderRadius: 999, background: INK, color: PAPER, fontFamily: mono, fontSize: 24, fontWeight: 700, letterSpacing: 1, boxShadow: "0 10px 24px -8px rgba(0,0,0,0.5)", zIndex: 40 }}>{i + 1}/{n}</div>
);
const Handle: React.FC<{ light?: boolean }> = ({ light }) => (
  <div style={{ position: "absolute", bottom: 46, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 40 }}>
    <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 28, color: light ? PAPER : INK, opacity: 0.9, letterSpacing: "-0.01em", textShadow: light ? "0 2px 8px rgba(0,0,0,0.5)" : undefined }}>@nocodealex</div>
  </div>
);
const SwipeCue: React.FC = () => (
  <div style={{ position: "absolute", bottom: 40, right: 44, display: "flex", alignItems: "center", gap: 7, zIndex: 40 }}>
    <div style={{ width: 62, height: 62, borderRadius: "50%", background: CLAY, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 12px 24px -6px ${hexA(CLAY, 0.6)}`, position: "relative" }}>
      <div style={{ position: "absolute", inset: -7, borderRadius: "50%", border: `2px solid ${hexA(CLAY, 0.34)}` }} />
      <svg width={30} height={24} viewBox="0 0 30 24"><path d="M4 12h19M16 4l8 8-8 8" stroke="#fff" strokeWidth={3.4} strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
    </div>
  </div>
);
const Kicker: React.FC<{ children: React.ReactNode; light?: boolean }> = ({ children, light }) => (
  <div style={{ fontFamily: mono, fontSize: 23, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", color: light ? hexA(PAPER, 0.8) : CLAY, textAlign: "center" }}>{children}</div>
);
const HL: React.FC<{ children: React.ReactNode; c?: string }> = ({ children, c = LIME }) => (
  <span style={{ position: "relative", padding: "0 8px" }}>
    <span style={{ position: "absolute", left: 0, right: 0, top: "34%", bottom: "6%", background: c, borderRadius: 5, transform: "rotate(-1.2deg)", opacity: 0.95 }} />
    <span style={{ position: "relative" }}>{children}</span>
  </span>
);
/* header sits ON the wall — a sign in the room, not a caption above it */
const Head: React.FC<{ kicker: string; children: React.ReactNode; size?: number; top?: number; light?: boolean }> = ({ kicker, children, size = 80, top = 268, light }) => (
  <div style={{ position: "absolute", top, left: 60, right: 60, display: "flex", flexDirection: "column", alignItems: "center", gap: 14, zIndex: 30 }}>
    <Kicker light={light}>{kicker}</Kicker>
    <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 600, fontSize: size, color: light ? PAPER : INK, letterSpacing: "-0.03em", lineHeight: 1.02, textAlign: "center", textShadow: light ? "0 4px 18px rgba(0,0,0,0.55)" : "0 2px 10px rgba(255,246,228,0.5)" }}>{children}</div>
  </div>
);
/* ⭐ the header is a SIGN MOUNTED ON THE WALL, not type floating on whatever
   happens to be behind it. Solves contrast over dado/floor and adds fitout. */
const WallSign: React.FC<{ kicker: string; children: React.ReactNode; size?: number; top?: number; max?: number }> = ({ kicker, children, size = 74, top = 228, max = 880 }) => (
  <div style={{ position: "absolute", top, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 32 }}>
    <div style={{ maxWidth: max, background: "linear-gradient(178deg,#F6EBD4 0%,#EADCBE 100%)", borderRadius: 14, padding: "18px 42px 22px", textAlign: "center", boxShadow: `0 26px 46px -22px rgba(40,26,14,0.72), inset 0 0 0 3px ${hexA(BRASS, 0.72)}, inset 0 0 0 6px rgba(255,255,255,0.5)` }}>
      <div style={{ fontFamily: mono, fontSize: 21, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", color: CLAY, marginBottom: 8 }}>{kicker}</div>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 600, fontSize: size, color: INK, letterSpacing: "-0.03em", lineHeight: 1.02 }}>{children}</div>
    </div>
  </div>
);
/* a desk NAMEPLATE — the agent names are the payload, so they get an object */
const NamePlate: React.FC<{ job: string; name: string; w: number; small?: boolean }> = ({ job, name, w, small }) => (
  <div style={{ width: w, margin: "4px auto 0", background: "linear-gradient(178deg,#F6EBD4 0%,#E7D8B8 100%)", borderRadius: 9, padding: small ? "6px 6px 7px" : "8px 8px 9px", boxShadow: `0 12px 20px -14px rgba(40,26,14,0.8), inset 0 0 0 2px ${hexA(BRASS, 0.62)}` }}>
    <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: small ? 24 : 28, color: INK, lineHeight: 1.05 }}>{job}</div>
    <div style={{ fontFamily: mono, fontSize: small ? 13 : 15, color: "#6B5A44", lineHeight: 1.15, marginTop: 2 }}>{name}</div>
  </div>
);
const Line: React.FC<{ top?: number; children: React.ReactNode; light?: boolean }> = ({ top = 1176, children, light }) => (
  <div style={{ position: "absolute", top, left: 80, right: 80, textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 600, fontSize: 42, lineHeight: 1.16, color: light ? PAPER : INK, letterSpacing: "-0.02em", zIndex: 30, textShadow: light ? "0 4px 16px rgba(0,0,0,0.6)" : undefined }}>{children}</div>
);

/* ---------------------------------------------------------------- logos */
const LOGO_EXT: Record<string, string> = { github: "svg", github_white: "svg", claude: "svg", cursor: "svg", copilot: "svg", gemini: "svg", codex: "svg" };
const LogoBadge: React.FC<{ brand: string; size?: number }> = ({ brand, size = 78 }) => (
  <div style={{ width: size, height: size, borderRadius: size * 0.26, background: "#fff", display: "grid", placeItems: "center", boxShadow: "0 12px 24px -12px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(0,0,0,0.05)" }}>
    <Img src={staticFile(`logos_official/${brand}.${LOGO_EXT[brand]}`)} style={{ width: size * 0.58, height: size * 0.58, objectFit: "contain" }} />
  </div>
);

/* ---------------------------------------------------------------- the cast */
type Cast = { job: string; name: string; costume: Record<string, number>; lf: number };
const CAST: Cast[] = [
  { job: "Ship it", name: "Frontend Developer", costume: { hardHat: 1 }, lf: 20 },
  { job: "Style it", name: "UI Designer", costume: { beret: 1 }, lf: 33 },
  { job: "Test it", name: "Reality Checker", costume: { sherlock: 1 }, lf: 46 },
  { job: "Secure it", name: "AI Code Auditor", costume: { judge: 1 }, lf: 27 },
  { job: "Post it", name: "Reddit Community Builder", costume: { capBack: 1 }, lf: 39 },
  { job: "Sell it", name: "Ad Creative Strategist", costume: { shades: 1 }, lf: 52 },
  { job: "Run them", name: "Agents Orchestrator", costume: { wizard: 1 }, lf: 30 },
];

type Slide = { type: "facade" | "lobby" | "floor" | "seven" | "office" | "cta" };
const SLIDES: Slide[] = [{ type: "facade" }, { type: "lobby" }, { type: "floor" }, { type: "seven" }, { type: "cta" }];
const N = SLIDES.length;

/* 1 · THE ROSTER — ⛔ the agency is its PEOPLE, not the building that holds
   them. A facade is illustrating the NOUN and it is a CONTAINER, twice-named
   traps. Winning hooks are CROWDS, so the cover is the whole workforce in
   receding ranks: a hued near-black mass behind one lit costumed front row. */
/* ⛔ evenly-spaced full-width rows read as STRIPES, not a crowd. The ranks
   overlap vertically, jitter in x and y, and each is offset so heads
   interleave instead of lining up.
   ⛔ ROUND 10: the crowd was too SMALL to read as an agency and the placard
   ate the frame, so all the sizes went up and the sign lost a line. */
const RANKS = [
  { y: 156, n: 21, size: 56, tint: "#211A13", off: 0.0 },
  { y: 216, n: 18, size: 72, tint: "#2A2018", off: 0.45 },
  { y: 288, n: 15, size: 92, tint: "#3A2A1D", off: 0.1 },
  { y: 374, n: 13, size: 116, tint: "#5A3B25", off: 0.5 },
  { y: 470, n: 11, size: 140, tint: "#7A4A30", off: 0.2 },
];
const FRONT: { c: Record<string, number>; lf: number }[] = [
  { c: { hardHat: 1 }, lf: 20 }, { c: { beret: 1 }, lf: 33 }, { c: { sherlock: 1 }, lf: 46 },
  { c: { judge: 1 }, lf: 27 }, { c: { capBack: 1 }, lf: 39 }, { c: { shades: 1 }, lf: 52 },
];
const Roster: React.FC = () => (
  <>
    <AbsoluteFill style={{ background: "linear-gradient(176deg,#F4EAD4 0%,#E7D5B5 48%,#CDB088 100%)" }} />
    <div style={{ position: "absolute", left: 20, top: 150, width: 1040, height: 700, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(255,240,206,0.95), rgba(255,236,196,0.35) 55%, transparent 74%)" }} />
    <svg style={{ position: "absolute", top: 0, left: 0 }} width={1080} height={1350}>
      <rect x={0} y={806} width={1080} height={544} fill="#C09468" />
      <rect x={0} y={806} width={1080} height={10} fill="#8E6A49" />
      {Array.from({ length: 11 }, (_, i) => <line key={i} x1={540 + (i * 108 - 540) * 0.42} y1={806} x2={i * 108} y2={1350} stroke="rgba(70,46,28,0.16)" strokeWidth={2} />)}
      <ellipse cx={540} cy={862} rx={490} ry={70} fill="rgba(255,240,206,0.45)" />
    </svg>
    {RANKS.map((r, ri) => Array.from({ length: r.n }, (_, i) => {
      const span = 1180, step = span / r.n, x = -50 + (i + r.off) * step + (seed(ri * 9 + i) - 0.5) * step * 0.5;
      return <div key={`${ri}-${i}`} style={{ position: "absolute", left: x, top: r.y + (seed(i * 3 + ri) - 0.5) * 28, zIndex: 5 + ri }}>
        <Mascot lf={9 + i * 7 + ri * 13} size={r.size} tint={r.tint} nodAmp={0} />
      </div>;
    }))}
    {/* the lit front row, in costume — big enough that you can SEE it is a staffed team */}
    {FRONT.map((f, i) => {
      const left = i < 3, k = left ? i : i - 3;
      const x = left ? 2 + k * 130 : 662 + k * 130;
      return <div key={i} style={{ position: "absolute", left: x, top: 636 + (i % 2) * 20, zIndex: 20 }}>
        <Mascot lf={f.lf} size={166} gaze={2} nodAmp={0} {...f.c} />
      </div>;
    })}
    <div style={{ position: "absolute", top: 536, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 30 }}>
      <div style={{ position: "relative", display: "grid", placeItems: "center" }}>
        <div style={{ position: "absolute", width: 620, height: 470, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(255,244,214,0.85), transparent 68%)" }} />
        <Mascot lf={30} size={330} wizard={1} gaze={2} cheer={0.32} nodAmp={0} />
      </div>
    </div>
    {/* ⭐ the open-source signal is a BADGE with the real GitHub mark, pinned to
       the sign — a logo reads instantly where a repo path was just noise. */}
    <div style={{ position: "absolute", top: 866, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 40 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18, background: "#1B1510", borderRadius: 999, padding: "18px 40px", boxShadow: `0 18px 30px -14px rgba(0,0,0,0.75), inset 0 0 0 2px ${hexA(BRASS, 0.55)}` }}>
        <Img src={staticFile("logos_official/github_white.svg")} style={{ width: 50, height: 50 }} />
        <span style={{ fontFamily: mono, fontSize: 34, fontWeight: 700, letterSpacing: 2.8, color: PAPER, textTransform: "uppercase" }}>open source</span>
      </div>
    </div>
    <div style={{ position: "absolute", top: 938, left: 52, right: 52, zIndex: 35 }}>
      <div style={{ background: "linear-gradient(178deg,#F7EDD8 0%,#EADCBE 100%)", borderRadius: 18, padding: "46px 30px 26px", textAlign: "center", boxShadow: `0 30px 52px -24px rgba(40,26,14,0.8), inset 0 0 0 3px ${hexA(BRASS, 0.7)}, inset 0 0 0 6px rgba(255,255,255,0.5)` }}>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 72, color: INK, letterSpacing: "-0.03em", lineHeight: 1.02 }}>250-AGENT AI AGENCY</div>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 116, color: INK, letterSpacing: "-0.035em", lineHeight: 1.02, marginTop: 4 }}><HL>FREE</HL></div>
      </div>
    </div>
    <Vignette />
  </>
);

/* ---------------------------------------------------------- THE CARD
   The house device from here on: a HORIZONTAL card, big sprite on the left
   like a hero introduction, and the card's HEIGHT carries the ranking, so
   the hierarchy is information and not decoration.                        */
const Card: React.FC<{ h: number; n?: string; title: string; sub: string; blurb: React.ReactNode; costume: Record<string, number>; lf: number; hero?: boolean; big?: string }> = ({ h, n, title, sub, blurb, costume, lf, hero, big }) => (
  <div style={{
    height: h, display: "flex", alignItems: "center", gap: 18, marginBottom: 16,
    background: hero ? "linear-gradient(178deg,#E9F6C9 0%,#D8EBA8 100%)" : "linear-gradient(178deg,#F8EFDB 0%,#EDDFC2 100%)",
    borderRadius: 22, padding: "0 26px 0 10px", overflow: "hidden",
    boxShadow: hero
      ? `0 24px 42px -22px rgba(40,26,14,0.85), inset 0 0 0 3px ${hexA(GREEN, 0.45)}`
      : `0 18px 32px -22px rgba(40,26,14,0.75), inset 0 0 0 2px ${hexA(BRASS, 0.42)}`,
  }}>
    <div style={{ width: h * 0.9, height: h, position: "relative", display: "grid", placeItems: "end center", flexShrink: 0 }}>
      <div style={{ position: "absolute", bottom: h * 0.07, width: h * 0.66, height: h * 0.13, borderRadius: "50%", background: "rgba(70,46,28,0.20)" }} />
      <Mascot lf={lf} size={h * 0.86} gaze={2} nodAmp={0} {...costume} />
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      {n && <div style={{ fontFamily: mono, fontSize: 16, letterSpacing: 2.4, fontWeight: 700, color: hero ? GREEN : CLAY, textTransform: "uppercase" }}>{n}</div>}
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: Math.min(h * 0.215, 46), color: INK, lineHeight: 1.02, letterSpacing: "-0.022em", marginTop: 2 }}>{title}</div>
      <div style={{ fontFamily: mono, fontSize: 15, letterSpacing: 1.8, color: "#8A7659", textTransform: "uppercase", marginTop: 3 }}>{sub}</div>
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 500, fontSize: Math.min(h * 0.125, 26), color: "#4A3E2E", lineHeight: 1.26, marginTop: 7 }}>{blurb}</div>
    </div>
    {big && <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: h * 0.46, color: hexA(CLAY, 0.42), letterSpacing: "-0.05em", flexShrink: 0, lineHeight: 1 }}>{big}</div>}
  </div>
);
const CardStack: React.FC<{ top: number; children: React.ReactNode }> = ({ top, children }) => (
  <div style={{ position: "absolute", top, left: 62, right: 62, zIndex: 20 }}>{children}</div>
);

/* 2 · THE DEPARTMENTS — card height encodes headcount, so the shape of the
   roster IS the graphic. Every name listed is a real file in the repo.    */
const Departments: React.FC = () => (
  <>
    <AbsoluteFill style={{ background: WARM.wall }} />
    <Fitout p={WARM} horizon={318} />
    <WallSign kicker="the org chart" size={80} top={180} max={1000}><HL>ONE CLICK</HL> INSTALL</WallSign>
    <CardStack top={392}>
      <Card h={188} big="59" title="Engineering" sub="they build the product" costume={{ hardHat: 1 }} lf={20}
        blurb={<>web, mobile, APIs, AI features and the infrastructure under them</>} />
      <Card h={178} big="58" title="C-Suite" sub="they run the place" costume={{ wizard: 1 }} lf={30}
        blurb={<>strategy, operations, governance and running the other agents</>} />
      <Card h={162} big="36" title="Marketing" sub="they bring the customers" costume={{ capBack: 1 }} lf={39}
        blurb={<>SEO, ads, social, content and community, across every channel</>} />
      <Card h={156} big="105" title="+ 15 more" sub="everything else you would hire for" costume={{ beret: 1 }} lf={33}
        blurb={<>design, security, sales, testing, finance, product, legal and more</>} />
    </CardStack>
    <div style={{ position: "absolute", top: 1144, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 30 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, background: "#1B1510", borderRadius: 999, padding: "16px 40px", boxShadow: `0 18px 30px -14px rgba(0,0,0,0.75), inset 0 0 0 2px ${hexA(BRASS, 0.55)}` }}>
        <Img src={staticFile("logos_official/github_white.svg")} style={{ width: 40, height: 40 }} />
        <span style={{ fontFamily: mono, fontSize: 30, fontWeight: 700, letterSpacing: 2, color: PAPER, textTransform: "uppercase" }}>150,477 stars</span>
      </div>
    </div>
    <Vignette />
  </>
);

/* ⛔ FORMAT DISCIPLINE: slide 2 owns the CARD. Every other slide below uses a
   DIFFERENT way of showing information — desks in a room, a routing fan, a
   stepper, a reception counter — because sameness is what makes people scroll. */

/* 3 · THE SIX — a room of desks. Format: WORLD + nameplates. */
const SIX: { name: string; div: string; does: string; c: Record<string, number>; lf: number }[] = [
  { name: "Frontend Developer", div: "engineering", does: "builds your screens in React or Vue", c: { hardHat: 1 }, lf: 20 },
  { name: "UI Designer", div: "design", does: "makes the design system and components", c: { beret: 1 }, lf: 33 },
  { name: "Reality Checker", div: "testing", does: "blocks the ship until you prove it works", c: { sherlock: 1 }, lf: 46 },
  { name: "AI Code Auditor", div: "security", does: "finds hardcoded keys and injection holes", c: { judge: 1 }, lf: 27 },
  { name: "Reddit Community Builder", div: "marketing", does: "posts where your buyers already are", c: { capBack: 1 }, lf: 39 },
  { name: "Ad Creative Strategist", div: "paid-media", does: "writes and tests the ad copy", c: { shades: 1 }, lf: 52 },
];
/* ⭐ the plate leads with the REAL agent name (that is what you install) and
   then says EXACTLY what it does. A two-word verb like "Ship it" told nobody
   anything. The 'does' line is the payload, so it gets a legible dark brown,
   not the 1.6:1 house clay. */
const DeskPlate: React.FC<{ i: number; w: number }> = ({ i, w }) => {
  const a = SIX[i];
  return (
    <div style={{ width: w, margin: "5px auto 0", background: "linear-gradient(178deg,#F6EBD4 0%,#E7D8B8 100%)", borderRadius: 10, padding: "8px 8px 10px", textAlign: "center", boxShadow: `0 12px 20px -14px rgba(40,26,14,0.85), inset 0 0 0 2px ${hexA(BRASS, 0.62)}` }}>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 24, color: INK, lineHeight: 1.02 }}>{a.name}</div>
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 17, color: "#3E2B1B", lineHeight: 1.16, marginTop: 4 }}>{a.does}</div>
    </div>
  );
};
const TheSix: React.FC = () => (
  <>
    <AbsoluteFill style={{ background: WARM.wall }} />
    <Fitout p={WARM} horizon={446} />
    <WallSign kicker="the founding team" size={76} top={180} max={980}>YOUR FIRST <HL>SIX HIRES</HL></WallSign>
    {[0, 1, 2].map((i) => {
      const w = 238, gap = (1080 - 3 * w) / 4, x = gap + i * (w + gap);
      return <div key={i} style={{ position: "absolute", left: x, top: 430, width: w, zIndex: 12 }}>
        <DeskUnit w={w} sprite={<Mascot lf={SIX[i].lf} size={160} gaze={2} nodAmp={0} {...SIX[i].c} />} />
        <DeskPlate i={i} w={w} />
      </div>;
    })}
    {[3, 4, 5].map((i, k) => {
      const w = 268, gap = (1080 - 3 * w) / 4, x = gap + k * (w + gap);
      return <div key={i} style={{ position: "absolute", left: x, top: 820, width: w, zIndex: 20 }}>
        <DeskUnit w={w} sprite={<Mascot lf={SIX[i].lf} size={184} gaze={2} nodAmp={0} {...SIX[i].c} />} />
        <DeskPlate i={i} w={w} />
      </div>;
    })}
    <Vignette />
  </>
);

/* 4 · THE SEVENTH — a routing FAN. Format: hub and spokes, one hero. */
const TheSeventh: React.FC = () => {
  const xs = [110, 268, 426, 584, 742, 900];
  return (
    <>
      <AbsoluteFill style={{ background: WARM.wall }} />
      <Fitout p={WARM} horizon={606} />
      <WallSign kicker="the one nobody installs" size={74} top={170} max={980}>YOUR <HL>CHIEF OF STAFF</HL></WallSign>
      <div style={{ position: "absolute", top: 366, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 25 }}>
        <div style={{ position: "relative", display: "grid", placeItems: "center" }}>
          <div style={{ position: "absolute", width: 600, height: 440, borderRadius: "50%", background: `radial-gradient(ellipse, ${hexA(LIME, 0.55)}, transparent 68%)` }} />
          <Mascot lf={30} size={300} wizard={1} gaze={2} cheer={0.34} nodAmp={0} />
        </div>
      </div>
      <div style={{ position: "absolute", top: 686, left: 0, right: 0, textAlign: "center", zIndex: 30 }}>
        <div style={{ display: "inline-block", background: INK, color: PAPER, borderRadius: 999, padding: "12px 32px", fontFamily: mono, fontSize: 25, fontWeight: 700, boxShadow: "0 16px 28px -12px rgba(0,0,0,0.65)" }}>agents-orchestrator</div>
      </div>
      <svg style={{ position: "absolute", top: 0, left: 0 }} width={1080} height={1350}>
        {xs.map((x, i) => <line key={i} x1={540} y1={748} x2={x + 36} y2={812} stroke={hexA(CLAY, 0.55)} strokeWidth={3} strokeDasharray="9 10" strokeLinecap="round" />)}
      </svg>
      {SIX.map((a, i) => (
        <div key={i} style={{ position: "absolute", left: xs[i] - 24, top: 806, width: 120, display: "grid", placeItems: "center", zIndex: 20 }}>
          <div style={{ position: "absolute", bottom: 6, width: 86, height: 16, borderRadius: "50%", background: "rgba(70,46,28,0.20)" }} />
          <Mascot lf={a.lf} size={124} gaze={2} nodAmp={0} {...a.c} />
        </div>
      ))}
      {/* ⛔ short. one goal in, the whole thing out. the old version explained
         routing in three lines when two carry it. */}
      <div style={{ position: "absolute", top: 998, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 30 }}>
        <div style={{ width: 900, background: "linear-gradient(178deg,#F6EBD4 0%,#EADCBE 100%)", borderRadius: 14, padding: "22px 34px 24px", textAlign: "center", boxShadow: `0 22px 40px -22px rgba(40,26,14,0.8), inset 0 0 0 2px ${hexA(BRASS, 0.6)}` }}>
          <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 46, lineHeight: 1.08, color: INK, letterSpacing: "-0.02em" }}>
            Give it one goal.
          </div>
          <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 600, fontSize: 36, lineHeight: 1.22, color: INK, marginTop: 8 }}>
            It manages your other agents and builds the whole thing <span style={{ color: RUST }}>without you</span>.
          </div>
        </div>
      </div>
      <Vignette />
    </>
  );
};

/* 5 · THE CTA — a reception counter. Carries the install line that left with
   the old stepper slide, so nothing actionable was lost by cutting it.    */
const Cta: React.FC = () => (
  <>
    <AbsoluteFill style={{ background: WARM.wall }} />
    <Fitout p={WARM} horizon={840} />
    <div style={{ position: "absolute", top: 164, left: 0, right: 0, textAlign: "center", zIndex: 30 }}>
      <div style={{ display: "inline-block", background: "#241A12", borderRadius: 10, padding: "13px 42px", boxShadow: `inset 0 0 0 3px ${hexA(BRASS, 0.6)}, 0 18px 34px -16px rgba(0,0,0,0.6)` }}>
        <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 36, letterSpacing: "0.22em", color: BRASS }}>THE AGENCY</span>
      </div>
    </div>
    <div style={{ position: "absolute", top: 272, left: 70, right: 70, textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 600, fontSize: 74, color: INK, letterSpacing: "-0.02em", lineHeight: 1.04, zIndex: 30 }}>
      WANT THE <HL>FREE SETUP</HL>?
    </div>
    <div style={{ position: "absolute", top: 378, left: 110, right: 110, textAlign: "center", fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 32, color: "#5C4C39", lineHeight: 1.3, zIndex: 30 }}>
      Comment <span style={{ color: INK, fontWeight: 800 }}>"AGENCY"</span> and I'll send you the seven, plus how to use them together.
    </div>
    <div style={{ position: "absolute", top: 500, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 16, zIndex: 30 }}>
      <div style={{ padding: "16px 28px", borderRadius: 16, background: INK, color: PAPER, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 29 }}>🔖 Save this</div>
      <div style={{ padding: "16px 30px", borderRadius: 16, background: CLAY, color: "#fff", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 29, boxShadow: `0 14px 30px -10px ${hexA(CLAY, 0.7)}` }}>+ Follow @nocodealex</div>
    </div>
    <div style={{ position: "absolute", top: 604, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 25 }}>
      <DeskUnit w={340} sprite={<Mascot lf={26} size={248} hardHat={1} cheer={0.44} gaze={2} nodAmp={0} />} />
    </div>
    <div style={{ position: "absolute", top: 992, left: 70, right: 70, textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 600, fontSize: 36, color: INK, lineHeight: 1.2, zIndex: 30 }}>
      One click from their desktop app. No terminal.
    </div>
    <div style={{ position: "absolute", top: 1062, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 17, zIndex: 30 }}>
      {["claude", "cursor", "codex", "copilot", "gemini"].map((b) => <LogoBadge key={b} brand={b} size={66} />)}
    </div>
    <Vignette />
  </>
);

/* ---------------------------------------------------------------- root */
export const NoCodeAgencyCarousel: React.FC = () => {
  const frame = useCurrentFrame();
  const i = Math.max(0, Math.min(N - 1, Math.floor(frame)));
  const s = SLIDES[i];
  const light = false;
  return (
    <AbsoluteFill style={{ fontFamily: inter.fontFamily }}>
      {s.type === "facade" && <Roster />}
      {s.type === "lobby" && <Departments />}
      {s.type === "floor" && <TheSix />}
      {s.type === "seven" && <TheSeventh />}
      {s.type === "cta" && <Cta />}
      <ProgressRail i={i} n={N} />
      <CountChip i={i} n={N} />
      {s.type !== "facade" && <Handle light={light} />}
      {s.type !== "cta" && <SwipeCue />}
    </AbsoluteFill>
  );
};
export const NOCODE_AGENCY_SLIDES = N;
