import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { fraunces, inter } from "./fonts";
import { Mascot } from "./ClaudeOsReel";

/* =========================================================================
   NO-CODE ALEX · CAROUSEL KIT
   The shared chassis promoted out of NoCodeAgencyCarousel so a second deck
   does not re-type it: the warm Place + Fitout architecture, the DeskUnit,
   the progress rail / count chip / handle / swipe cue, WallSign, Card, and
   the logo badges. ⛔ Everything here is EXPORTED; per-deck slides live in
   their own file. Deck rules that live in memory, in one line each:
     · one FORMAT per slide      · one BENEFIT per slide
     · headers 3-4 words, CAPS, naming the value
     · spoken copy, no verb-phrase labels, no back-references
   ========================================================================= */

export const INK = "#1A1813", CLAY = "#D97757", MUTE = "#8B8578", PAPER = "#F5F1E8";
export const LIME = "#C7EB6A", BRASS = "#C6A45E", RUST = "#B0472F", GREEN = "#2C7A50";
export const mono = "ui-monospace,'SF Mono',Menlo,monospace";
export const seed = (n: number) => { const x = Math.sin(n * 127.1 + 43.7) * 43758.5453; return x - Math.floor(x); };
const rgb = (h: string) => { h = h.replace("#", ""); return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16) }; };
export const hexA = (h: string, a: number) => { const { r, g, b } = rgb(h); return `rgba(${r},${g},${b},${a})`; };

/* ------------------------------------------------------------- the PLACE
   One palette per room; Fitout takes its entire colour from this, so a dim
   room and a warm room are the same architecture at different values.     */
export type Place = { wall: string; wall2: string; dado: string; trim: string; floor: string; floorD: string; dark: string; lamp: string };
export const WARM: Place = { wall: "#EFE1C7", wall2: "#DCC7A4", dado: "#CBAF88", trim: "#B08F66", floor: "#B98D63", floorD: "#8E6A49", dark: "#211A13", lamp: "#F8E6BA" };
export const DIM: Place = { wall: "#4A3E31", wall2: "#332A21", dado: "#2C241C", trim: "#5A4938", floor: "#3A2E24", floorD: "#241C15", dark: "#150F0A", lamp: "#F3D79E" };

/* the FITOUT: cornice · clerestory w/ mullions · pilasters · panelled dado ·
   skirting · converging boards. Same members in every room, palette-driven. */
export const Fitout: React.FC<{ p: Place; horizon?: number }> = ({ p, horizon = 946 }) => {
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
export const Vignette: React.FC = () => (<div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 300px rgba(40,28,16,0.42)", pointerEvents: "none" }} />);

/* ------------------------------------------------------ the REPEATED OBJECT
   One desk, drawn once, used everywhere. The sprite is drawn FIRST and the
   desk over its lower half, which is what makes it read as SEATED.        */
export const DeskUnit: React.FC<{ w: number; lit?: boolean; dim?: number; sprite?: React.ReactNode; p?: Place }> = ({ w, lit = true, dim = 1, sprite, p = WARM }) => {
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
export const ProgressRail: React.FC<{ i: number; n: number }> = ({ i, n }) => (
  <div style={{ position: "absolute", top: 54, left: 60, right: 60, display: "flex", gap: 8, zIndex: 40 }}>
    {Array.from({ length: n }, (_, k) => (<div key={k} style={{ flex: 1, height: 7, borderRadius: 4, background: k <= i ? CLAY : "rgba(255,255,255,0.34)", boxShadow: k === i ? `0 0 0 3px ${hexA(CLAY, 0.22)}` : undefined }} />))}
  </div>
);
export const CountChip: React.FC<{ i: number; n: number }> = ({ i, n }) => (
  <div style={{ position: "absolute", top: 78, right: 56, padding: "8px 16px", borderRadius: 999, background: INK, color: PAPER, fontFamily: mono, fontSize: 24, fontWeight: 700, letterSpacing: 1, boxShadow: "0 10px 24px -8px rgba(0,0,0,0.5)", zIndex: 40 }}>{i + 1}/{n}</div>
);
export const Handle: React.FC<{ light?: boolean }> = ({ light }) => (
  <div style={{ position: "absolute", bottom: 46, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 40 }}>
    <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 28, color: light ? PAPER : INK, opacity: 0.9, letterSpacing: "-0.01em", textShadow: light ? "0 2px 8px rgba(0,0,0,0.5)" : undefined }}>@nocodealex</div>
  </div>
);
export const SwipeCue: React.FC = () => (
  <div style={{ position: "absolute", bottom: 40, right: 44, display: "flex", alignItems: "center", gap: 7, zIndex: 40 }}>
    <div style={{ width: 62, height: 62, borderRadius: "50%", background: CLAY, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 12px 24px -6px ${hexA(CLAY, 0.6)}`, position: "relative" }}>
      <div style={{ position: "absolute", inset: -7, borderRadius: "50%", border: `2px solid ${hexA(CLAY, 0.34)}` }} />
      <svg width={30} height={24} viewBox="0 0 30 24"><path d="M4 12h19M16 4l8 8-8 8" stroke="#fff" strokeWidth={3.4} strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
    </div>
  </div>
);
export const Kicker: React.FC<{ children: React.ReactNode; light?: boolean }> = ({ children, light }) => (
  <div style={{ fontFamily: mono, fontSize: 23, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", color: light ? hexA(PAPER, 0.8) : CLAY, textAlign: "center" }}>{children}</div>
);
export const HL: React.FC<{ children: React.ReactNode; c?: string }> = ({ children, c = LIME }) => (
  <span style={{ position: "relative", padding: "0 8px" }}>
    <span style={{ position: "absolute", left: 0, right: 0, top: "34%", bottom: "6%", background: c, borderRadius: 5, transform: "rotate(-1.2deg)", opacity: 0.95 }} />
    <span style={{ position: "relative" }}>{children}</span>
  </span>
);
/* header sits ON the wall — a sign in the room, not a caption above it */
export const Head: React.FC<{ kicker: string; children: React.ReactNode; size?: number; top?: number; light?: boolean }> = ({ kicker, children, size = 80, top = 268, light }) => (
  <div style={{ position: "absolute", top, left: 60, right: 60, display: "flex", flexDirection: "column", alignItems: "center", gap: 14, zIndex: 30 }}>
    <Kicker light={light}>{kicker}</Kicker>
    <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 600, fontSize: size, color: light ? PAPER : INK, letterSpacing: "-0.03em", lineHeight: 1.02, textAlign: "center", textShadow: light ? "0 4px 18px rgba(0,0,0,0.55)" : "0 2px 10px rgba(255,246,228,0.5)" }}>{children}</div>
  </div>
);
/* ⭐ the header is a SIGN MOUNTED ON THE WALL, not type floating on whatever
   happens to be behind it. Solves contrast over dado/floor and adds fitout. */
export const WallSign: React.FC<{ kicker: string; children: React.ReactNode; size?: number; top?: number; max?: number }> = ({ kicker, children, size = 74, top = 228, max = 880 }) => (
  <div style={{ position: "absolute", top, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 32 }}>
    <div style={{ maxWidth: max, background: "linear-gradient(178deg,#F6EBD4 0%,#EADCBE 100%)", borderRadius: 14, padding: "18px 42px 22px", textAlign: "center", boxShadow: `0 26px 46px -22px rgba(40,26,14,0.72), inset 0 0 0 3px ${hexA(BRASS, 0.72)}, inset 0 0 0 6px rgba(255,255,255,0.5)` }}>
      <div style={{ fontFamily: mono, fontSize: 21, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", color: CLAY, marginBottom: 8 }}>{kicker}</div>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 600, fontSize: size, color: INK, letterSpacing: "-0.03em", lineHeight: 1.02 }}>{children}</div>
    </div>
  </div>
);
/* a desk NAMEPLATE — the agent names are the payload, so they get an object */
export const NamePlate: React.FC<{ job: string; name: string; w: number; small?: boolean }> = ({ job, name, w, small }) => (
  <div style={{ width: w, margin: "4px auto 0", background: "linear-gradient(178deg,#F6EBD4 0%,#E7D8B8 100%)", borderRadius: 9, padding: small ? "6px 6px 7px" : "8px 8px 9px", boxShadow: `0 12px 20px -14px rgba(40,26,14,0.8), inset 0 0 0 2px ${hexA(BRASS, 0.62)}` }}>
    <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: small ? 24 : 28, color: INK, lineHeight: 1.05 }}>{job}</div>
    <div style={{ fontFamily: mono, fontSize: small ? 13 : 15, color: "#6B5A44", lineHeight: 1.15, marginTop: 2 }}>{name}</div>
  </div>
);
export const Line: React.FC<{ top?: number; children: React.ReactNode; light?: boolean }> = ({ top = 1176, children, light }) => (
  <div style={{ position: "absolute", top, left: 80, right: 80, textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 600, fontSize: 42, lineHeight: 1.16, color: light ? PAPER : INK, letterSpacing: "-0.02em", zIndex: 30, textShadow: light ? "0 4px 16px rgba(0,0,0,0.6)" : undefined }}>{children}</div>
);

/* ---------------------------------------------------------------- logos */
export const LOGO_EXT: Record<string, string> = { github: "svg", github_white: "svg", claude: "svg", cursor: "svg", copilot: "svg", gemini: "svg", codex: "svg" };
export const LogoBadge: React.FC<{ brand: string; size?: number }> = ({ brand, size = 78 }) => (
  <div style={{ width: size, height: size, borderRadius: size * 0.26, background: "#fff", display: "grid", placeItems: "center", boxShadow: "0 12px 24px -12px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(0,0,0,0.05)" }}>
    <Img src={staticFile(`logos_official/${brand}.${LOGO_EXT[brand]}`)} style={{ width: size * 0.58, height: size * 0.58, objectFit: "contain" }} />
  </div>
);


/* ------------------------------------------------------------ THE CARD
   A HORIZONTAL card: big sprite left like a hero introduction, and the
   card's HEIGHT carries the ranking, so the hierarchy is information and
   not decoration. Every type size derives from h, so one number sets the
   whole card and a stack of different heights stays consistent.          */
export const Card: React.FC<{ h: number; n?: string; title: string; sub: string; blurb: React.ReactNode; costume: Record<string, number>; lf: number; hero?: boolean; big?: string }> = ({ h, n, title, sub, blurb, costume, lf, hero, big }) => (
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
export const CardStack: React.FC<{ top: number; children: React.ReactNode }> = ({ top, children }) => (
  <div style={{ position: "absolute", top, left: 62, right: 62, zIndex: 20 }}>{children}</div>
);
