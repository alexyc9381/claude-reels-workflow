import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fraunces, inter } from "./fonts";
import {
  Bg, ProgressBar, Panel, CaptionLine, Mascot, Star, hexA, over, CO, CLAY, GOLD, GREEN, RED, SKY, PINK, AMBER, MONO, APP_BG, APP_INK, APP_LINE, grad, SectionHeader,
} from "./SlopKit";

/* =========================================================================
   S9 - CTA - "COMMENT SLOP"
   A warm COZY CREATOR DESK (home office at dusk), distinct from the studio.
   A soft dome lamp + a creator RING LIGHT pool light over a wooden desk, a
   dusk window glows amber behind, string lights twinkle across the top, a
   floating shelf holds books + trinkets + a trailing plant, a SECOND monitor
   glows soft blue in the back corner, and a camera on a mini tripod records
   (blinking red dot). The clay Mascot presents a premium WHITE paper guide
   card (the voicemail prompts, green FREE ribbon) while a big clay "Comment
   SLOP" chat pill floats above, ringed by little comment + heart bubbles.
   The recurring grey AI-SLOP robot sits dim + powered down in the corner.
   Depth: FAR wall + window + shelf + monitor + robot + bokeh + light shaft,
   MID wood desk + lamps + mug + plants + keyboard, NEAR mascot + card + pill
   + out-of-focus ring light framing the right edge. Everything rides off f.
   Canonical panel: 1012 wide x 792 tall (no top/height overrides).
   ========================================================================= */
export const Scene9: React.FC = () => {
  const f = useCurrentFrame();

  // ambient warm-room drivers (all deterministic, NaN-safe)
  const led = 0.5 + 0.5 * Math.sin(f / 15);                  // warm breathe
  const lampFlick = 0.9 + 0.1 * Math.abs(Math.sin(f / 3.4)); // warm lamp shimmer
  const robFlick = 0.24 + 0.08 * Math.abs(Math.sin(f / 9));  // dim defeated robot
  const shaftFlick = 0.68 + 0.32 * Math.abs(Math.sin(f / 20)); // volumetric beam
  const monGlow = 0.6 + 0.4 * Math.abs(Math.sin(f / 8 + 1));  // 2nd monitor flicker
  const ringPulse = 0.85 + 0.15 * Math.abs(Math.sin(f / 5));  // ring light breathe
  const recOn = (f % 44) < 24 ? 1 : 0.18;                     // camera REC blink

  // hero + prop motion
  const cardBob = Math.sin(f / 26) * 6;                      // guide card float
  const cardTilt = -4 + Math.sin(f / 34) * 1.4;
  const cardPop = over(f, 2, 14);
  const pillPop = over(f, 6, 16);                            // pill spring-in
  const pillBob = Math.sin(f / 18) * 5;
  const heroSway = Math.sin(f / 24) * 2;

  const BULBS = 11;

  // FAR warm bokeh orbs (drift + twinkle)
  const BOKEH = [
    [70, 300, 70, GOLD], [560, 60, 54, "#F3B968"], [300, 360, 40, CLAY],
    [820, 340, 60, GOLD], [180, 90, 34, "#F7D9AE"], [470, 250, 30, GOLD],
  ] as const;
  // dust motes floating in the light shaft
  const MOTES = Array.from({ length: 16 }, (_, i) => i);
  // comment / heart bubbles rising around the pill
  const BUBS = [
    [402, 232, 0, "heart"], [612, 250, 40, "chat"], [900, 224, 78, "heart"],
    [430, 210, 112, "chat"], [872, 250, 24, "chat"], [560, 236, 96, "heart"],
  ] as const;

  return (
    <AbsoluteFill style={{ fontFamily: inter.fontFamily }}>
      <Bg />
      <ProgressBar />
      <SectionHeader f={f} badge="💬" l1={<>COMMENT</>} l2={<span style={{ color: CLAY }}>SLOP</span>} />

      <Panel glow={hexA(CO, 0.28)} pushIn>
        {/* ================= FAR LAYER - warm room wall + dusk window ================= */}
        <div style={{ position: "absolute", left: 0, top: 0, right: 0, height: 452, overflow: "hidden", zIndex: 0 }}>
          {/* cozy plaster wall (warm, not studio foam) */}
          <div style={{ position: "absolute", inset: 0, background: grad("#3C332A", "#241D17") }} />
          {/* faint wall texture bands for a lived-in room */}
          {[0, 1, 2, 3].map((i) => (
            <div key={i} style={{ position: "absolute", left: 0, right: 0, top: 40 + i * 96, height: 1, background: hexA("#FFE7C4", 0.04) }} />
          ))}
          {/* warm key wash from the desk lamp (lower left) */}
          <div style={{ position: "absolute", left: -80, top: 120, width: 720, height: 520, background: `radial-gradient(ellipse at 30% 60%, ${hexA(GOLD, 0.28 * lampFlick)}, transparent 62%)`, mixBlendMode: "screen" }} />
          {/* faint cool rim on the robot side */}
          <div style={{ position: "absolute", left: 700, top: 150, width: 420, height: 360, background: `radial-gradient(ellipse at 70% 60%, ${hexA(SKY, 0.1)}, transparent 66%)`, mixBlendMode: "screen" }} />
          {/* warm bokeh orbs drifting behind everything */}
          {BOKEH.map(([bx, by, br, bc], i) => {
            const dy = Math.sin(f / (28 + i * 5) + i) * 10;
            const dx = Math.cos(f / (34 + i * 4) + i) * 8;
            const tw = 0.12 + 0.1 * Math.abs(Math.sin(f / 12 + i * 1.7));
            return <div key={i} style={{ position: "absolute", left: (bx as number) + dx, top: (by as number) + dy, width: br as number, height: br as number, borderRadius: "50%", background: `radial-gradient(circle, ${hexA(bc as string, tw + 0.14)}, transparent 68%)`, filter: "blur(6px)", mixBlendMode: "screen" }} />;
          })}
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 110, background: "linear-gradient(180deg, rgba(0,0,0,0.42), transparent)" }} />
        </div>

        {/* ---- dusk WINDOW (upper right), warm amber sky spilling in ---- */}
        <div style={{ position: "absolute", left: 632, top: 40, zIndex: 1 }}>
          {/* warm glow bleeding into the room around the frame */}
          <div style={{ position: "absolute", left: -70, top: -50, width: 470, height: 380, background: `radial-gradient(ellipse at 50% 45%, ${hexA("#F3B968", 0.34 * lampFlick)}, transparent 66%)`, mixBlendMode: "screen", pointerEvents: "none" }} />
          {/* wooden window frame */}
          <div style={{ width: 320, height: 220, borderRadius: 14, background: grad("#5A4331", "#38271A"), boxShadow: "0 16px 30px rgba(0,0,0,0.5)", padding: 12, position: "relative" }}>
            {/* the dusk sky pane */}
            <div style={{ position: "absolute", inset: 12, borderRadius: 6, overflow: "hidden", background: "linear-gradient(180deg, #6E4E7E 0%, #C9668A 42%, #F2A85C 74%, #F8D08A 100%)" }}>
              {/* low sun glow */}
              <div style={{ position: "absolute", left: 150, bottom: -40, width: 180, height: 180, borderRadius: "50%", background: `radial-gradient(circle, ${hexA("#FFE6A6", 0.9)}, ${hexA("#F5A85A", 0.4)} 46%, transparent 70%)` }} />
              {/* soft cloud bands (slow drift) */}
              <div style={{ position: "absolute", left: 20 + Math.sin(f / 60) * 8, top: 46, width: 150, height: 12, borderRadius: 8, background: hexA("#F7D9AE", 0.4) }} />
              <div style={{ position: "absolute", left: 90 + Math.sin(f / 52 + 1) * 7, top: 78, width: 130, height: 10, borderRadius: 8, background: hexA("#E9B7B0", 0.34) }} />
              {/* a tiny distant bird pair */}
              {[0, 1].map((b) => {
                const bx = 40 + b * 34 + ((f * 0.4 + b * 20) % 220);
                return <div key={b} style={{ position: "absolute", left: bx, top: 26 + Math.sin(f / 14 + b) * 4, width: 12, height: 6, borderRadius: "50% 50% 0 0", borderTop: "2px solid rgba(58,42,68,0.6)", transform: "rotate(-8deg)" }} />;
              })}
              {/* a tiny distant tree line silhouette */}
              <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 30, background: "#3A2A44", opacity: 0.7 }} />
            </div>
            {/* muntin bars (the cross) */}
            <div style={{ position: "absolute", left: "50%", top: 12, bottom: 12, width: 10, marginLeft: -5, background: grad("#5A4331", "#3B2A1B"), borderRadius: 3 }} />
            <div style={{ position: "absolute", top: "50%", left: 12, right: 12, height: 10, marginTop: -5, background: grad("#5A4331", "#3B2A1B"), borderRadius: 3 }} />
            {/* sill */}
            <div style={{ position: "absolute", left: -10, bottom: -14, width: 340, height: 14, borderRadius: 4, background: grad("#4A3626", "#2E2013"), boxShadow: "0 8px 14px rgba(0,0,0,0.4)" }} />
          </div>
          {/* a little plant silhouette on the sill */}
          <div style={{ position: "absolute", left: 24, top: 210, zIndex: 2 }}>
            {[[-10, -22, -22], [2, -30, 4], [14, -22, 22]].map(([lx, ly, rot], i) => (
              <div key={i} style={{ position: "absolute", left: 10 + (lx as number), top: (ly as number), width: 13, height: 34, borderRadius: "50% 50% 50% 50% / 70% 70% 30% 30%", background: grad("#3E7A56", "#25553A"), transform: `rotate(${(rot as number) + Math.sin(f / 30 + i) * 3}deg)`, transformOrigin: "50% 100%" }} />
            ))}
            <div style={{ position: "absolute", left: 4, top: 6, width: 30, height: 24, background: grad("#B85B33", "#8A4023"), borderRadius: "5px 5px 8px 8px" }} />
          </div>
        </div>

        {/* ---- volumetric LIGHT SHAFT from the window into the room ---- */}
        <div style={{ position: "absolute", left: 470, top: 20, width: 300, height: 560, transform: "rotate(24deg)", transformOrigin: "80% 0%", background: `linear-gradient(180deg, ${hexA("#FCE1A8", 0.16 * shaftFlick)}, ${hexA("#F3B968", 0.05 * shaftFlick)} 55%, transparent)`, mixBlendMode: "screen", filter: "blur(7px)", pointerEvents: "none", zIndex: 2 }} />
        {/* dust motes drifting through the shaft */}
        {MOTES.map((i) => {
          const cyc = ((f * 0.7 + i * 41) % 520) / 520;         // 0..1 slow rise
          const mx = 470 + ((i * 53) % 300) + Math.sin(f / 9 + i) * 12;
          const my = 560 - cyc * 540;
          const mo = Math.sin(cyc * Math.PI) * (0.28 + 0.2 * Math.abs(Math.sin(f / 7 + i)));
          return <div key={i} style={{ position: "absolute", left: mx, top: my, width: 4, height: 4, borderRadius: "50%", background: hexA("#FFE9C0", mo), filter: "blur(0.5px)", zIndex: 2, pointerEvents: "none" }} />;
        })}

        {/* ---- string lights strung across the top ---- */}
        <svg width={1012} height={90} style={{ position: "absolute", left: 0, top: 6, zIndex: 3, overflow: "visible" }}>
          <path
            d={Array.from({ length: BULBS }, (_, i) => {
              const x = 26 + i * 96;
              const y = 18 + Math.abs(Math.sin(i * 1.15)) * 12 + (i % 2) * 8;
              return `${i === 0 ? "M" : "L"} ${x} ${y}`;
            }).join(" ")}
            fill="none" stroke="#2C241C" strokeWidth={3}
          />
          {Array.from({ length: BULBS }, (_, i) => {
            const x = 26 + i * 96;
            const y = 18 + Math.abs(Math.sin(i * 1.15)) * 12 + (i % 2) * 8;
            const tw = 0.55 + 0.45 * Math.abs(Math.sin(f / 6 + i * 1.3));
            return (
              <g key={i}>
                <circle cx={x} cy={y + 12} r={9} fill="#FFD98A" opacity={tw} />
                <circle cx={x} cy={y + 12} r={16} fill="#FFCB6E" opacity={0.16 * tw} />
              </g>
            );
          })}
        </svg>

        {/* ---- floating shelf: books + trailing plant + trinkets (upper left) ---- */}
        <div style={{ position: "absolute", left: 24, top: 150, zIndex: 3 }}>
          <div style={{ width: 250, height: 15, background: grad("#4A382A", "#2E2117"), borderRadius: 3, boxShadow: "0 10px 18px rgba(0,0,0,0.45)" }} />
          {/* leaning books */}
          <div style={{ position: "absolute", left: 12, top: -74, display: "flex", alignItems: "flex-end", gap: 5 }}>
            {[[CLAY, 66], ["#3F7A6A", 58], [GOLD, 72], ["#7A5A3C", 54], ["#4A5B7A", 68]].map(([c, h], i) => (
              <div key={i} style={{ width: 15, height: h as number, background: c as string, borderRadius: "2px 2px 0 0", boxShadow: "inset -3px 0 0 rgba(0,0,0,0.22)" }} />
            ))}
          </div>
          {/* a tiny framed photo trinket leaning on the shelf */}
          <div style={{ position: "absolute", left: 104, top: -40, width: 34, height: 40, background: "#EDE7DB", border: "3px solid #6B533A", borderRadius: 3, transform: "rotate(4deg)", boxShadow: "0 5px 10px rgba(0,0,0,0.35)" }}>
            <div style={{ position: "absolute", inset: 4, borderRadius: 1, background: "linear-gradient(160deg,#C9668A,#6E4E7E)" }} />
          </div>
          {/* a small ticking wall/desk clock trinket */}
          <div style={{ position: "absolute", left: 146, top: -42, width: 34, height: 34, borderRadius: "50%", background: "#EDE7DB", border: "3px solid #6B533A", boxShadow: "0 5px 10px rgba(0,0,0,0.35)" }}>
            <div style={{ position: "absolute", left: "50%", top: "50%", width: 2, height: 11, marginLeft: -1, background: "#3A342C", transformOrigin: "50% 100%", transform: `translate(0,-11px) rotate(${(f * 6) % 360}deg)` }} />
            <div style={{ position: "absolute", left: "50%", top: "50%", width: 2, height: 8, marginLeft: -1, background: CO, transformOrigin: "50% 100%", transform: `translate(0,-8px) rotate(${(f / 2) % 360}deg)` }} />
          </div>
          {/* pot on the right of the shelf */}
          <div style={{ position: "absolute", left: 194, top: -46, width: 52, height: 42, background: grad("#C67A50", "#9A5333"), borderRadius: "6px 6px 10px 10px", zIndex: 2 }} />
          <div style={{ position: "absolute", left: 190, top: -50, width: 60, height: 12, background: "#D2724E", borderRadius: 4, zIndex: 2 }} />
          {/* trailing vine cascading down from the pot */}
          <svg width={120} height={210} style={{ position: "absolute", left: 176, top: -6, zIndex: 1, overflow: "visible" }}>
            <path d="M 46 0 C 22 40, 66 80, 40 128 C 20 166, 58 186, 44 208" fill="none" stroke="#2F6E4C" strokeWidth={4} />
            <path d="M 46 0 C 80 34, 40 70, 70 116 C 92 150, 60 176, 78 202" fill="none" stroke="#357B54" strokeWidth={4} />
            {[[40, 34], [58, 62], [36, 92], [66, 118], [44, 148], [72, 172], [50, 196]].map(([lx, ly], i) => (
              <ellipse key={i} cx={lx} cy={ly + Math.sin(f / 22 + i) * 2} rx={11} ry={7} fill={i % 2 ? "#4E9A6E" : "#3F8A5E"} transform={`rotate(${(i % 2 ? 26 : -22) + Math.sin(f / 26 + i) * 4} ${lx} ${ly})`} />
            ))}
          </svg>
        </div>

        {/* ---- a small framed print on the wall (center left) ---- */}
        <div style={{ position: "absolute", left: 356, top: 120, zIndex: 2, transform: "rotate(-1.5deg)" }}>
          <div style={{ width: 132, height: 100, borderRadius: 6, background: "#3A2C1E", border: "6px solid #55402C", boxShadow: "0 10px 20px rgba(0,0,0,0.45)", padding: 6 }}>
            <div style={{ width: "100%", height: "100%", borderRadius: 3, background: "linear-gradient(160deg, #E7B24C, #C9668A 60%, #6E4E7E)", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", left: 10, bottom: 0, width: 0, height: 0, borderLeft: "26px solid transparent", borderRight: "26px solid transparent", borderBottom: "34px solid rgba(58,42,68,0.7)" }} />
              <div style={{ position: "absolute", left: 58, bottom: 0, width: 0, height: 0, borderLeft: "34px solid transparent", borderRight: "34px solid transparent", borderBottom: "48px solid rgba(58,42,68,0.7)" }} />
            </div>
          </div>
        </div>

        {/* ---- a little cluster of sticky notes pinned to the wall (center) ---- */}
        <div style={{ position: "absolute", left: 500, top: 130, zIndex: 2 }}>
          {[[0, 0, AMBER, -5], [58, 12, PINK, 4], [24, 62, "#8FD1A6", -2]].map(([sx, sy, sc, rot], i) => (
            <div key={i} style={{ position: "absolute", left: sx as number, top: sy as number, width: 52, height: 50, background: sc as string, transform: `rotate(${(rot as number) + Math.sin(f / 30 + i) * 1.2}deg)`, boxShadow: "0 6px 12px rgba(0,0,0,0.32)" }}>
              <div style={{ position: "absolute", left: 8, top: 12, right: 8, height: 3, borderRadius: 2, background: "rgba(60,42,20,0.35)" }} />
              <div style={{ position: "absolute", left: 8, top: 22, right: 14, height: 3, borderRadius: 2, background: "rgba(60,42,20,0.28)" }} />
              <div style={{ position: "absolute", left: 8, top: 32, right: 20, height: 3, borderRadius: 2, background: "rgba(60,42,20,0.22)" }} />
            </div>
          ))}
        </div>

        {/* ---- a SECOND monitor glowing soft blue in the back-left corner ---- */}
        <div style={{ position: "absolute", left: -6, top: 296, zIndex: 5 }}>
          {/* soft screen glow bleed */}
          <div style={{ position: "absolute", left: -30, top: -24, width: 260, height: 220, background: `radial-gradient(ellipse at 40% 40%, ${hexA(SKY, 0.18 * monGlow)}, transparent 66%)`, mixBlendMode: "screen", pointerEvents: "none" }} />
          <div style={{ width: 172, height: 112, borderRadius: 10, background: "#14161E", border: "4px solid #2A2E38", boxShadow: "0 12px 22px rgba(0,0,0,0.5)", overflow: "hidden", position: "relative" }}>
            {/* a blurred editing timeline */}
            <div style={{ position: "absolute", inset: 6, borderRadius: 5, background: grad("#182338", "#101728"), opacity: 0.6 + 0.4 * monGlow }} />
            {[0, 1, 2].map((r) => (
              <div key={r} style={{ position: "absolute", left: 12, right: 12, top: 20 + r * 22, height: 9, borderRadius: 3, background: hexA(r === 1 ? CO : SKY, 0.5 * monGlow) }} />
            ))}
            {/* playhead */}
            <div style={{ position: "absolute", top: 8, bottom: 8, left: 20 + ((f * 1.4) % 130), width: 2, background: hexA("#FFFFFF", 0.6 * monGlow) }} />
          </div>
          {/* neck + base */}
          <div style={{ position: "absolute", left: 78, top: 108, width: 14, height: 20, background: "#2A2E38" }} />
          <div style={{ position: "absolute", left: 54, top: 126, width: 62, height: 10, borderRadius: 4, background: "#23262F" }} />
        </div>

        {/* ================= the grey AI-SLOP robot, dim + powered down, back corner ================= */}
        <div style={{ position: "absolute", left: 852, top: 268, zIndex: 5, opacity: 0.66, filter: "saturate(0.28) brightness(0.7)" }}>
          {/* teleprompter head, dead grey slop text */}
          <div style={{ width: 104, height: 74, borderRadius: 10, background: grad("#4A4E58", "#2C2F37"), border: "3px solid #565A64", boxShadow: "0 12px 22px rgba(0,0,0,0.5), inset 0 0 16px rgba(0,0,0,0.55)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 7, borderRadius: 6, background: "#171A20" }} />
            {[0, 1, 2, 3].map((r) => (
              <div key={r} style={{ position: "absolute", left: 12, top: 14 + r * 11, height: 4, width: r === 3 ? 34 : 78, borderRadius: 3, background: hexA("#6C7078", robFlick) }} />
            ))}
            <div style={{ position: "absolute", right: 8, bottom: 7, width: 6, height: 6, borderRadius: "50%", background: hexA(RED, 0.26) }} />
          </div>
          {/* neck + boxy grey body */}
          <div style={{ position: "absolute", left: 46, top: 70, width: 13, height: 18, background: "#3A3D45" }} />
          <div style={{ position: "absolute", left: 20, top: 84, width: 64, height: 50, borderRadius: 9, background: grad("#40434C", "#292C33"), border: "3px solid #4E525C" }}>
            <div style={{ position: "absolute", left: 10, top: 10, width: 20, height: 20, borderRadius: 4, background: "#23262D" }} />
            <div style={{ position: "absolute", right: 10, top: 12, width: 16, height: 6, borderRadius: 3, background: hexA(SKY, 0.2) }} />
          </div>
          {/* cold cyan rim */}
          <div style={{ position: "absolute", left: -24, top: -16, width: 160, height: 180, background: `radial-gradient(ellipse at 60% 40%, ${hexA(SKY, 0.13)}, transparent 66%)`, mixBlendMode: "screen", pointerEvents: "none" }} />
        </div>

        {/* ================= MID LAYER - warm wooden desk tabletop ================= */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 434, height: 158, background: grad("#6B4A30", "#3E2A1A"), zIndex: 4 }}>
          {/* wood grain */}
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} style={{ position: "absolute", left: 0, right: 0, top: 14 + i * 30, height: 2, background: hexA("#2A1B0E", 0.4) }} />
          ))}
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 434, height: 8, background: hexA("#FFD8A8", 0.26), zIndex: 4 }} />
        {/* warm light pool on the desk under the lamp + card */}
        <div style={{ position: "absolute", left: 120, top: 470, width: 560, height: 100, borderRadius: "50%", background: `radial-gradient(ellipse, ${hexA("#F4C077", 0.42 * lampFlick)}, ${hexA("#C97A3E", 0.2)} 66%, transparent)`, mixBlendMode: "screen", zIndex: 4 }} />
        {/* a soft desk mat under the card */}
        <div style={{ position: "absolute", left: 300, top: 500, width: 470, height: 84, borderRadius: 18, background: grad("#7A4C34", "#5A3322"), boxShadow: "inset 0 2px 8px rgba(0,0,0,0.3)", zIndex: 4 }}>
          <div style={{ position: "absolute", inset: 8, borderRadius: 12, border: `2px dashed ${hexA(GOLD, 0.3)}` }} />
        </div>
        {/* a couple of drooping cables snaking off the desk back */}
        <svg width={1012} height={120} style={{ position: "absolute", left: 0, top: 470, zIndex: 5, overflow: "visible", pointerEvents: "none" }}>
          <path d="M 720 6 C 760 40, 700 70, 748 108" fill="none" stroke="#221812" strokeWidth={5} strokeLinecap="round" />
          <path d="M 90 4 C 60 34, 118 58, 78 96" fill="none" stroke="#2A1D14" strokeWidth={5} strokeLinecap="round" />
        </svg>

        {/* ---- warm DOME desk lamp (left), the cozy key light ---- */}
        <div style={{ position: "absolute", left: 8, top: 236, zIndex: 6 }}>
          {/* arm */}
          <div style={{ position: "absolute", left: 44, top: 96, width: 11, height: 150, background: grad("#4A3626", "#2C1E12"), borderRadius: 6, transform: "rotate(8deg)", transformOrigin: "50% 100%" }} />
          {/* dome shade, tilted to throw light right */}
          <div style={{ position: "absolute", left: 6, top: 40, width: 128, height: 74, background: grad("#C96442", "#8A3F24"), borderRadius: "60% 60% 46% 46% / 90% 90% 30% 30%", boxShadow: "0 12px 24px rgba(0,0,0,0.45), inset 0 -8px 12px rgba(0,0,0,0.35)", transform: "rotate(14deg)", transformOrigin: "50% 100%" }}>
            <div style={{ position: "absolute", left: 14, top: 8, width: 40, height: 12, borderRadius: 8, background: hexA("#FFE0B0", 0.4) }} />
          </div>
          {/* glowing bulb under the shade */}
          <div style={{ position: "absolute", left: 44, top: 104, width: 44, height: 30, borderRadius: "50%", background: `radial-gradient(circle at 45% 35%, #FFE9B8, ${GOLD} 55%, #C77E2C)`, boxShadow: `0 0 34px ${hexA(GOLD, 0.95 * lampFlick)}, 0 0 80px ${hexA(GOLD, 0.55 * lampFlick)}`, opacity: lampFlick }} />
        </div>

        {/* ---- coffee mug (steaming) on the desk ---- */}
        <div style={{ position: "absolute", left: 700, top: 452, zIndex: 6 }}>
          {[0, 1, 2].map((k) => {
            const a = ((f + k * 20) % 60) / 60;
            return <div key={k} style={{ position: "absolute", left: 18 + Math.sin(a * 7 + k) * 6, top: -6 - a * 40, width: 8 + a * 4, height: 8 + a * 4, borderRadius: "50%", background: hexA("#EEE9DE", 0.34 * (1 - a)), filter: "blur(3px)" }} />;
          })}
          <div style={{ width: 54, height: 46, borderRadius: "8px 8px 12px 12px", background: grad("#D2724E", "#A9522E"), boxShadow: "0 8px 14px rgba(0,0,0,0.35)" }} />
          <div style={{ position: "absolute", right: -13, top: 10, width: 20, height: 22, border: "5px solid #B85B33", borderRadius: "0 12px 12px 0", borderLeft: "none" }} />
        </div>

        {/* ---- little potted succulent on the desk (front center-right) ---- */}
        <div style={{ position: "absolute", left: 616, top: 462, zIndex: 7 }}>
          {[[-12, -18, -26], [0, -26, 2], [12, -18, 26]].map(([lx, ly, rot], i) => (
            <div key={i} style={{ position: "absolute", left: 16 + (lx as number), top: 20 + (ly as number), width: 15, height: 34, borderRadius: "50% 50% 50% 50% / 66% 66% 34% 34%", background: grad("#5AA97A", "#347E54"), transform: `rotate(${(rot as number) + Math.sin(f / 28 + i) * 3}deg)`, transformOrigin: "50% 100%" }} />
          ))}
          <div style={{ position: "absolute", left: 6, top: 40, width: 40, height: 30, background: grad("#C67A50", "#8A4023"), borderRadius: "6px 6px 9px 9px", boxShadow: "0 6px 12px rgba(0,0,0,0.35)" }} />
          <div style={{ position: "absolute", left: 2, top: 36, width: 48, height: 10, background: "#D2724E", borderRadius: 4 }} />
        </div>

        {/* ================= NEAR LAYER - hero mascot presenting ================= */}
        <div style={{ position: "absolute", left: 96, top: 356, zIndex: 8, transform: `rotate(${4 + heroSway}deg)`, transformOrigin: "60% 90%" }}>
          <Mascot lf={f} size={252} gaze={6} cheer={0.55} nodSpeed={14} nodAmp={2.2} />
        </div>

        {/* ================= HERO - premium WHITE paper guide card ================= */}
        <div style={{ position: "absolute", left: 452, top: 306, zIndex: 11, transform: `translateY(${cardBob}px) rotate(${cardTilt}deg) scale(${0.9 + 0.1 * cardPop})`, opacity: cardPop, transformOrigin: "50% 100%" }}>
          {/* soft cast shadow */}
          <div style={{ position: "absolute", left: 24, top: 40, width: 372, height: 296, borderRadius: 22, background: "rgba(0,0,0,0.4)", filter: "blur(20px)" }} />
          <div style={{ position: "relative", width: 392, height: 300, borderRadius: 20, background: grad(APP_BG, "#F1EEE6"), border: `2px solid ${APP_LINE}`, boxShadow: "0 24px 44px rgba(0,0,0,0.42), inset 0 1px 0 rgba(255,255,255,0.9)", overflow: "hidden", padding: "26px 30px" }}>
            {/* warm lamp kiss on the paper */}
            <div style={{ position: "absolute", left: -30, top: -30, width: 280, height: 210, background: `radial-gradient(ellipse at 30% 40%, ${hexA(GOLD, 0.24 * lampFlick)}, transparent 70%)`, mixBlendMode: "screen", pointerEvents: "none" }} />

            {/* FREE ribbon, diagonal top-right */}
            <div style={{ position: "absolute", right: -46, top: 26, width: 176, transform: "rotate(38deg)", background: grad(GREEN, "#2F7E5A"), boxShadow: "0 6px 14px rgba(0,0,0,0.3)", textAlign: "center", padding: "8px 0", zIndex: 3 }}>
              <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 20, color: "#fff", letterSpacing: 3 }}>FREE</span>
            </div>

            {/* chat-bubble glyph + kicker */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <svg width={30} height={30} viewBox="0 0 30 30">
                <path d="M4 5 h22 a3 3 0 0 1 3 3 v11 a3 3 0 0 1 -3 3 h-13 l-7 5 v-5 h-2 a3 3 0 0 1 -3 -3 v-11 a3 3 0 0 1 3 -3 z" fill={CO} />
                <circle cx={10} cy={13.5} r={2} fill="#fff" />
                <circle cx={16} cy={13.5} r={2} fill="#fff" />
                <circle cx={22} cy={13.5} r={2} fill="#fff" />
              </svg>
              <span style={{ fontFamily: MONO, fontSize: 14, letterSpacing: 2, color: CO, fontWeight: 700 }}>CHEAT SHEET</span>
            </div>

            {/* title */}
            <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 34, lineHeight: 1.06, color: APP_INK, letterSpacing: "-0.01em" }}>
              Humanizing<br />Prompts
            </div>

            {/* a few prompt lines with checks */}
            <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 13 }}>
              {["ramble the whole answer aloud", "strip only the ums + filler", "keep the human cadence"].map((t, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 11 }}>
                  <span style={{ width: 22, height: 22, borderRadius: 6, background: hexA(GREEN, 0.16), border: `1.5px solid ${hexA(GREEN, 0.6)}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width={13} height={13} viewBox="0 0 13 13"><path d="M2 7 L5 10 L11 3" fill="none" stroke={GREEN} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  <span style={{ fontFamily: inter.fontFamily, fontSize: 17, color: "#5A554C", fontWeight: 600 }}>{t}</span>
                </div>
              ))}
            </div>

            {/* tiny waveform footer motif */}
            <svg width={150} height={22} style={{ position: "absolute", left: 30, bottom: 18 }}>
              {Array.from({ length: 22 }, (_, i) => {
                const h = 4 + Math.abs(Math.sin(i * 0.7 + f / 6)) * 15;
                return <rect key={i} x={i * 7} y={11 - h / 2} width={3.5} height={h} rx={1.75} fill={hexA(CO, 0.55)} />;
              })}
            </svg>
          </div>
        </div>

        {/* ================= "Comment SLOP" chat pill, floating above ================= */}
        {/* little comment + heart bubbles rising around the pill */}
        {BUBS.map(([bx, by, ph, kind], i) => {
          const cyc = ((f + (ph as number)) % 150) / 150;      // 0..1 rise loop
          const y = (by as number) - cyc * 140;
          const o = Math.sin(cyc * Math.PI) * 0.9;
          const x = (bx as number) + Math.sin(cyc * 6 + i) * 10;
          const sc = 0.6 + cyc * 0.4;
          return (
            <div key={i} style={{ position: "absolute", left: x, top: y, zIndex: 13, opacity: o, transform: `scale(${sc})`, pointerEvents: "none" }}>
              {kind === "heart" ? (
                <svg width={30} height={30} viewBox="0 0 30 30">
                  <path d="M15 26 C 4 17, 3 9, 9 6 C 13 4, 15 8, 15 8 C 15 8, 17 4, 21 6 C 27 9, 26 17, 15 26 Z" fill={PINK} />
                </svg>
              ) : (
                <svg width={30} height={26} viewBox="0 0 30 26">
                  <path d="M3 2 h24 a2 2 0 0 1 2 2 v12 a2 2 0 0 1 -2 2 h-14 l-6 5 v-5 h-2 a2 2 0 0 1 -2 -2 v-12 a2 2 0 0 1 2 -2 z" fill={GOLD} />
                  <circle cx={9} cy={10} r={1.6} fill="#fff" /><circle cx={15} cy={10} r={1.6} fill="#fff" /><circle cx={21} cy={10} r={1.6} fill="#fff" />
                </svg>
              )}
            </div>
          );
        })}
        <div style={{ position: "absolute", left: 448, top: 166, zIndex: 14, transform: `translateY(${pillBob}px) scale(${0.7 + 0.3 * pillPop})`, opacity: pillPop, transformOrigin: "50% 120%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 30px", borderRadius: 40, background: grad(CO, "#B8501F"), boxShadow: `0 18px 34px ${hexA(CO, 0.5)}, 0 0 46px ${hexA(GOLD, 0.35)}, inset 0 2px 0 rgba(255,255,255,0.28)`, border: "2px solid rgba(255,255,255,0.22)" }}>
            {/* chat bubble icon */}
            <svg width={40} height={40} viewBox="0 0 40 40">
              <path d="M5 6 h30 a4 4 0 0 1 4 4 v15 a4 4 0 0 1 -4 4 h-18 l-9 7 v-7 h-3 a4 4 0 0 1 -4 -4 v-15 a4 4 0 0 1 4 -4 z" fill="#fff" />
              <circle cx={13} cy={17.5} r={2.6} fill={CO} />
              <circle cx={21} cy={17.5} r={2.6} fill={CO} />
              <circle cx={29} cy={17.5} r={2.6} fill={CO} />
            </svg>
            <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 46, color: "#fff", letterSpacing: "-0.01em", whiteSpace: "nowrap", textShadow: "0 2px 6px rgba(120,40,15,0.5)" }}>
              Comment <span style={{ color: "#FFE7B8" }}>SLOP</span>
            </span>
          </div>
          {/* pill tail pointing at the card */}
          <div style={{ position: "absolute", left: 78, bottom: -14, width: 30, height: 30, background: "#B8501F", transform: "rotate(45deg)", borderRadius: 4 }} />
          {/* sparkles */}
          <Star x={-26} y={4} s={0.8} c={GOLD} o={0.5 + 0.5 * Math.sin(f / 7)} />
          <Star x={402} y={-14} s={1} c="#FFE7B8" o={0.5 + 0.5 * Math.sin(f / 7 + 2)} />
          <Star x={430} y={54} s={0.7} c={GOLD} o={0.5 + 0.5 * Math.sin(f / 7 + 4)} />
        </div>

        {/* ================= NEAR foreground framing - creator RING LIGHT + camera (right edge, out of focus) ================= */}
        <div style={{ position: "absolute", left: 858, top: 372, zIndex: 13, filter: "blur(1.4px)" }}>
          {/* ring light glow spill */}
          <div style={{ position: "absolute", left: -60, top: -50, width: 320, height: 320, background: `radial-gradient(circle at 40% 40%, ${hexA("#FFF3D6", 0.3 * ringPulse)}, transparent 62%)`, mixBlendMode: "screen", pointerEvents: "none" }} />
          {/* the glowing ring */}
          <div style={{ position: "absolute", left: 0, top: 0, width: 150, height: 150, borderRadius: "50%", border: `16px solid ${hexA("#FFF6E2", 0.9 * ringPulse)}`, boxShadow: `0 0 30px ${hexA("#FFE9B8", 0.7 * ringPulse)}, inset 0 0 22px ${hexA("#FFE9B8", 0.5)}` }} />
          {/* camera body in the middle on a mini tripod */}
          <div style={{ position: "absolute", left: 44, top: 46, width: 62, height: 48, borderRadius: 8, background: grad("#2A2E38", "#171A20"), border: "3px solid #3A404C", boxShadow: "0 6px 12px rgba(0,0,0,0.4)" }}>
            {/* lens */}
            <div style={{ position: "absolute", left: 16, top: 10, width: 30, height: 30, borderRadius: "50%", background: "radial-gradient(circle at 40% 35%, #4A5566, #0C0E14 70%)", border: "3px solid #4E525C" }} />
            {/* blinking REC dot */}
            <div style={{ position: "absolute", right: 6, top: 6, width: 8, height: 8, borderRadius: "50%", background: RED, boxShadow: `0 0 8px ${RED}`, opacity: recOn }} />
          </div>
          {/* mini tripod legs */}
          <svg width={160} height={120} style={{ position: "absolute", left: 0, top: 120, overflow: "visible" }}>
            <path d="M 75 0 L 46 96 M 75 0 L 104 96 M 75 0 L 75 100" fill="none" stroke="#23262F" strokeWidth={6} strokeLinecap="round" />
          </svg>
        </div>

        {/* ================= FOREGROUND - desk front lip ================= */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 640, height: 152, background: grad("#4A331F", "#241811"), zIndex: 12, boxShadow: "0 -14px 30px rgba(0,0,0,0.4)" }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 6, background: hexA("#F0BE80", 0.3) }} />
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 40, background: `linear-gradient(180deg, ${hexA(CO, 0.3 * (0.5 + led))}, transparent)`, mixBlendMode: "screen" }} />
        </div>

        {/* ---- keyboard + mouse on the lip (front-left, out of focus framing) ---- */}
        <div style={{ position: "absolute", left: 54, top: 648, zIndex: 13, transform: "rotate(-3deg)", filter: "blur(1.2px)" }}>
          <div style={{ width: 300, height: 96, borderRadius: 12, background: grad("#20232B", "#12141A"), border: "3px solid #2C303A", boxShadow: "0 12px 24px rgba(0,0,0,0.45)", padding: 10, position: "relative", overflow: "hidden" }}>
            {[0, 1, 2, 3].map((r) => (
              <div key={r} style={{ position: "absolute", left: 12, right: 12, top: 12 + r * 20, display: "flex", gap: 6 }}>
                {Array.from({ length: 12 }, (_, c) => (
                  <div key={c} style={{ flex: 1, height: 14, borderRadius: 3, background: "#2E323C", boxShadow: "inset 0 -2px 0 rgba(0,0,0,0.4)", opacity: 0.9 }} />
                ))}
              </div>
            ))}
            {/* a couple of keys lit warm by the lamp */}
            <div style={{ position: "absolute", left: 28, top: 32, width: 16, height: 14, borderRadius: 3, background: hexA(GOLD, 0.4 * lampFlick) }} />
          </div>
        </div>
        {/* mouse */}
        <div style={{ position: "absolute", left: 386, top: 700, zIndex: 13, width: 52, height: 78, borderRadius: "26px 26px 24px 24px", background: grad("#2A2E38", "#171A20"), border: "3px solid #3A404C", boxShadow: "0 10px 20px rgba(0,0,0,0.4)", filter: "blur(1.2px)" }}>
          <div style={{ position: "absolute", left: "50%", top: 8, width: 2, height: 22, marginLeft: -1, background: "#3A404C" }} />
        </div>

        {/* an open notebook + pen resting on the lip (front-right) */}
        <div style={{ position: "absolute", left: 640, top: 648, zIndex: 13, transform: "rotate(-4deg)" }}>
          <div style={{ width: 220, height: 120, borderRadius: 10, background: grad("#FBF8F1", "#ECE7DB"), boxShadow: "0 12px 22px rgba(0,0,0,0.4)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 2, marginLeft: -1, background: hexA("#C9BFA9", 0.7) }} />
            {[0, 1, 2, 3].map((r) => (
              <div key={r} style={{ position: "absolute", left: 18, top: 22 + r * 20, width: 74, height: 4, borderRadius: 2, background: hexA(CO, 0.35) }} />
            ))}
            {[0, 1, 2, 3].map((r) => (
              <div key={"r2" + r} style={{ position: "absolute", right: 18, top: 22 + r * 20, width: 74, height: 4, borderRadius: 2, background: hexA("#8C877D", 0.4) }} />
            ))}
          </div>
          {/* pen */}
          <div style={{ position: "absolute", left: 150, top: -8, width: 130, height: 9, borderRadius: 5, background: grad("#C96442", "#8A3F24"), transform: "rotate(16deg)", boxShadow: "0 4px 8px rgba(0,0,0,0.3)" }} />
        </div>

        {/* panel-wide warm foreground vignette to seat the depth */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 15, background: "radial-gradient(ellipse 90% 70% at 46% 48%, transparent 54%, rgba(8,6,4,0.4) 100%)" }} />
      </Panel>

      <CaptionLine words={["comment", "SLOP"]} hot={1} top={1240} />
    </AbsoluteFill>
  );
};
