import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fraunces, inter } from "./fonts";
import {
  Bg, Handle, ProgressBar, ScreenHead, Panel, Caption, Mascot, Bubble,
  hexA, CO, CLAY, GOLD, GREEN, RED, SKY, MUTE, INK, MONO, grad,
} from "./SlopKit";

/* =========================================================================
   HOOK 1 - "THE VOICEMAIL BOOTH"
   A warm, late-night home recording studio diorama living INSIDE the Panel
   (panel-local 1012 x 792). Three depth layers:
     FAR  - acoustic foam wedge wall, warm light wash, shelf with plants,
            edison lamp, LED strip glow, and the cold grey AI-SLOP robot
            powered down in the back corner (dead screen, wisp of smoke).
     MID  - wood desk, a monitor showing a live orange waveform + REC dot +
            rising timer, the big condenser mic on a boom arm + pop filter.
     NEAR - the clay Mascot leaning into the mic, floating messy human
            speech bubbles, the desk front lip holding the audio interface
            (glowing knobs + VU meters), coffee mug, coiled cable, rug mat.
   Warm human clay hero vs cold grey robotic slop. Everything rides off f.
   ========================================================================= */
export const HookT1: React.FC = () => {
  const f = useCurrentFrame();

  // animated drivers
  const led = 0.5 + 0.5 * Math.sin(f / 15);                 // LED strip breathe
  const recOn = f % 30 < 16;                                 // REC dot blink
  const lampFlick = 0.86 + 0.14 * Math.abs(Math.sin(f / 3.1)) * (Math.sin(f * 1.7) > -0.8 ? 1 : 0.55);
  const robFlick = 0.34 + 0.14 * Math.abs(Math.sin(f / 8));  // dead robot faint flicker
  const timer = String(Math.min(88, 14 + Math.floor(f / 2))).padStart(2, "0");
  const breathe = Math.sin(f / 22) * 2;                      // mascot lean sway

  // floating human speech bubbles (warm, messy, rising + fading)
  const bubbles = [
    { t: "umm, so...", x: 70, base: 296, delay: 0, rot: -5, s: 0.92 },
    { t: "what I meant was...", x: 236, base: 256, delay: 34, rot: 4, s: 0.98 },
    { t: "hold on, wait...", x: 118, base: 210, delay: 68, rot: -3, s: 0.9 },
  ];

  return (
    <AbsoluteFill style={{ fontFamily: inter.fontFamily }}>
      <Bg />
      <Handle />

      <Panel glow={hexA(CO, 0.28)} top={430} height={860} pushIn>
        {/* ================= FAR LAYER - foam wall + ambient light ================= */}
        <div style={{ position: "absolute", left: 0, top: 0, right: 0, height: 452, overflow: "hidden", zIndex: 0 }}>
          <div style={{ position: "absolute", inset: 0, background: grad("#2B2620", "#1A1712") }} />
          {/* acoustic foam wedge grid */}
          <div style={{ position: "absolute", inset: 0, display: "flex", flexWrap: "wrap" }}>
            {Array.from({ length: 14 * 7 }, (_, i) => (
              <div key={i} style={{
                width: 1012 / 14, height: 452 / 7,
                background: "conic-gradient(from 45deg at 50% 50%, #342E27, #201C17, #342E27, #201C17)",
                boxShadow: "inset 0 0 7px rgba(0,0,0,0.45)",
              }} />
            ))}
          </div>
          {/* warm key wash from the lamp (upper right) */}
          <div style={{ position: "absolute", right: -60, top: -80, width: 720, height: 560, background: `radial-gradient(ellipse at 70% 30%, ${hexA(GOLD, 0.32 * lampFlick)}, transparent 62%)`, mixBlendMode: "screen" }} />
          {/* cool rim from the far corner (the robot side) */}
          <div style={{ position: "absolute", left: 620, top: 120, width: 520, height: 420, background: `radial-gradient(ellipse at 70% 60%, ${hexA(SKY, 0.14)}, transparent 66%)`, mixBlendMode: "screen" }} />
          {/* top vignette for depth */}
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 120, background: "linear-gradient(180deg, rgba(0,0,0,0.5), transparent)" }} />
        </div>

        {/* soft warm LED strip glow running under the shelf line */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 430, height: 4, background: grad("#F0B168", "#E07A44"), boxShadow: `0 0 26px ${hexA(CO, 0.7 * (0.5 + led))}, 0 0 60px ${hexA(CO, 0.4 * led)}`, opacity: 0.7 + 0.3 * led, zIndex: 2 }} />

        {/* ---- shelf with plants + books (upper left, on the foam wall) ---- */}
        <div style={{ position: "absolute", left: 26, top: 118, zIndex: 3 }}>
          {/* board */}
          <div style={{ width: 268, height: 16, background: grad("#4A382A", "#2E2117"), borderRadius: 3, boxShadow: "0 10px 18px rgba(0,0,0,0.45)" }} />
          {/* book spines */}
          <div style={{ position: "absolute", left: 8, top: -78, display: "flex", alignItems: "flex-end", gap: 5 }}>
            {[[CLAY, 70], ["#3F7A6A", 62], [GOLD, 76], ["#7A5A3C", 58], ["#4A5B7A", 72], [RED, 64]].map(([c, h], i) => (
              <div key={i} style={{ width: 15, height: h as number, background: c as string, borderRadius: "2px 2px 0 0", boxShadow: "inset -3px 0 0 rgba(0,0,0,0.22)" }} />
            ))}
          </div>
          {/* potted plant */}
          <div style={{ position: "absolute", left: 176, top: -104 }}>
            {/* leaves */}
            {[[-18, -6, -26], [-4, -20, 6], [12, -8, 22], [0, 2, -8]].map(([lx, ly, rot], i) => (
              <div key={i} style={{ position: "absolute", left: 34 + (lx as number), top: 8 + (ly as number), width: 20, height: 48, borderRadius: "50% 50% 50% 50% / 70% 70% 30% 30%", background: grad("#4E9A6E", "#2F6E4C"), transform: `rotate(${rot as number}deg)`, transformOrigin: "50% 100%" }} />
            ))}
            {/* pot */}
            <div style={{ position: "absolute", left: 24, top: 44, width: 46, height: 40, background: grad("#C67A50", "#9A5333"), borderRadius: "6px 6px 10px 10px" }} />
            <div style={{ position: "absolute", left: 20, top: 40, width: 54, height: 12, background: "#D2724E", borderRadius: 4 }} />
          </div>
        </div>

        {/* ---- edison desk lamp arcing in from upper right ---- */}
        <div style={{ position: "absolute", right: 40, top: 26, zIndex: 3 }}>
          {/* arm segments */}
          <div style={{ position: "absolute", right: 8, top: 60, width: 12, height: 130, background: grad("#3A3A42", "#22222A"), borderRadius: 6, transform: "rotate(20deg)", transformOrigin: "50% 100%" }} />
          <div style={{ position: "absolute", right: 70, top: 30, width: 12, height: 120, background: grad("#3A3A42", "#22222A"), borderRadius: 6, transform: "rotate(-38deg)", transformOrigin: "50% 100%" }} />
          {/* shade */}
          <div style={{ position: "absolute", right: 96, top: 20, width: 96, height: 54, background: grad("#43434C", "#26262E"), borderRadius: "50% 50% 44% 44% / 80% 80% 30% 30%", boxShadow: "inset 0 -6px 10px rgba(0,0,0,0.4)" }} />
          {/* warm edison bulb */}
          <div style={{ position: "absolute", right: 122, top: 60, width: 44, height: 44, borderRadius: "50%", background: `radial-gradient(circle at 42% 38%, #FFE7A8, ${GOLD} 55%, #C77E2C)`, boxShadow: `0 0 30px ${hexA(GOLD, 0.9 * lampFlick)}, 0 0 70px ${hexA(GOLD, 0.55 * lampFlick)}`, opacity: lampFlick }}>
            <div style={{ position: "absolute", left: 18, top: 8, width: 3, height: 26, background: hexA("#FFB84D", 0.9), borderRadius: 2 }} />
          </div>
        </div>

        {/* ================= the cold grey AI-SLOP robot, powered down, back corner ================= */}
        <div style={{ position: "absolute", left: 786, top: 214, zIndex: 5, opacity: 0.9, filter: "saturate(0.35) brightness(0.82)" }}>
          {/* wisp of smoke rising from the dead machine */}
          {[0, 1, 2].map((k) => {
            const a = ((f + k * 26) % 78) / 78;
            return <div key={k} style={{ position: "absolute", left: 44 + Math.sin(a * 6 + k) * 10, top: -8 - a * 74, width: 16 + a * 20, height: 16 + a * 20, borderRadius: "50%", background: hexA("#B9BCC4", 0.28 * (1 - a)), filter: "blur(6px)" }} />;
          })}
          {/* teleprompter head with a dead screen of perfect grey slop text */}
          <div style={{ width: 132, height: 96, borderRadius: 12, background: grad("#4A4E58", "#2C2F37"), border: "3px solid #565A64", boxShadow: `0 14px 26px rgba(0,0,0,0.5), inset 0 0 18px rgba(0,0,0,0.55)`, position: "relative", overflow: "hidden" }}>
            {/* faint dead-screen flicker */}
            <div style={{ position: "absolute", inset: 8, borderRadius: 6, background: "#171A20", opacity: 1 }} />
            {[0, 1, 2, 3, 4].map((r) => (
              <div key={r} style={{ position: "absolute", left: 16, top: 18 + r * 12, height: 5, width: r === 4 ? 44 : 100, borderRadius: 3, background: hexA("#6C7078", robFlick) }} />
            ))}
            {/* dead power dot */}
            <div style={{ position: "absolute", right: 10, bottom: 8, width: 8, height: 8, borderRadius: "50%", background: hexA(RED, 0.35) }} />
          </div>
          {/* neck + boxy grey body */}
          <div style={{ position: "absolute", left: 58, top: 92, width: 16, height: 22, background: "#3A3D45" }} />
          <div style={{ position: "absolute", left: 26, top: 110, width: 80, height: 62, borderRadius: 10, background: grad("#40434C", "#292C33"), border: "3px solid #4E525C" }}>
            <div style={{ position: "absolute", left: 12, top: 12, width: 24, height: 24, borderRadius: 4, background: "#23262D" }} />
            <div style={{ position: "absolute", right: 12, top: 14, width: 20, height: 8, borderRadius: 3, background: hexA(SKY, 0.25) }} />
          </div>
          {/* unplugged cable dangling */}
          <div style={{ position: "absolute", left: 8, top: 150, width: 40, height: 40, border: "4px solid #33363D", borderTop: "none", borderRight: "none", borderRadius: "0 0 0 20px" }} />
          <div style={{ position: "absolute", left: 4, top: 186, width: 12, height: 16, borderRadius: 3, background: "#585C66" }} />
          {/* cold cyan rim on the machine */}
          <div style={{ position: "absolute", left: -30, top: -20, width: 200, height: 230, background: `radial-gradient(ellipse at 60% 40%, ${hexA(SKY, 0.18)}, transparent 66%)`, mixBlendMode: "screen", pointerEvents: "none" }} />
        </div>

        {/* ================= MID LAYER - the desk tabletop ================= */}
        {/* receding surface */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 434, height: 150, background: grad("#5A4331", "#3C2C1E"), zIndex: 4 }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 434, height: 8, background: hexA("#FFD8A8", 0.22), zIndex: 4 }} />
        {/* warm rug / desk mat under the mic stand */}
        <div style={{ position: "absolute", left: 70, top: 470, width: 520, height: 92, borderRadius: "50%", background: `radial-gradient(ellipse, ${hexA("#8A4C34", 0.7)}, ${hexA("#5E3222", 0.4)} 70%, transparent)`, zIndex: 4 }}>
          <div style={{ position: "absolute", inset: 14, borderRadius: "50%", border: `2px dashed ${hexA(GOLD, 0.35)}` }} />
        </div>

        {/* ---- the monitor showing a live orange waveform + REC dot + timer ---- */}
        <div style={{ position: "absolute", left: 566, top: 236, zIndex: 6 }}>
          {/* bezel */}
          <div style={{ width: 258, height: 176, borderRadius: 12, background: grad("#1B1D24", "#0C0E14"), border: "6px solid #2A2D36", boxShadow: `0 16px 30px rgba(0,0,0,0.5), 0 0 34px ${hexA(CO, 0.25)}`, position: "relative", overflow: "hidden" }}>
            {/* screen glow */}
            <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 60%, ${hexA(CO, 0.14)}, transparent 70%)` }} />
            {/* REC chip */}
            <div style={{ position: "absolute", left: 12, top: 10, display: "flex", alignItems: "center", gap: 7 }}>
              <span style={{ width: 12, height: 12, borderRadius: "50%", background: RED, boxShadow: `0 0 10px ${RED}`, opacity: recOn ? 1 : 0.25 }} />
              <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 15, color: "#fff", letterSpacing: 1 }}>REC</span>
              <span style={{ fontFamily: MONO, fontSize: 15, color: hexA("#fff", 0.8) }}>0:{timer}</span>
            </div>
            {/* live waveform */}
            <svg width={230} height={96} style={{ position: "absolute", left: 8, top: 62 }}>
              {Array.from({ length: 28 }, (_, i) => {
                const h = 6 + Math.abs(Math.sin(i * 0.6 + f / 4)) * 52 * (0.5 + 0.5 * Math.abs(Math.sin(i * 0.3 + f / 9)));
                return <rect key={i} x={4 + i * 8} y={48 - h / 2} width={4} height={h} rx={2} fill={CO} opacity={0.55 + 0.45 * Math.abs(Math.sin(i + f / 6))} />;
              })}
            </svg>
          </div>
          {/* stand */}
          <div style={{ position: "absolute", left: 116, top: 176, width: 18, height: 30, background: "#2A2D36" }} />
          <div style={{ position: "absolute", left: 88, top: 202, width: 74, height: 12, borderRadius: 6, background: grad("#33363F", "#1E2027") }} />
        </div>

        {/* ---- coffee mug (steaming) ---- */}
        <div style={{ position: "absolute", left: 726, top: 450, zIndex: 6 }}>
          {[0, 1].map((k) => {
            const a = ((f + k * 20) % 60) / 60;
            return <div key={k} style={{ position: "absolute", left: 18 + Math.sin(a * 7 + k) * 6, top: -6 - a * 34, width: 8, height: 8, borderRadius: "50%", background: hexA("#EEE9DE", 0.34 * (1 - a)), filter: "blur(3px)" }} />;
          })}
          <div style={{ width: 54, height: 46, borderRadius: "8px 8px 12px 12px", background: grad("#D2724E", "#A9522E"), boxShadow: "0 8px 14px rgba(0,0,0,0.35)" }} />
          <div style={{ position: "absolute", right: -13, top: 10, width: 20, height: 22, border: "5px solid #B85B33", borderRadius: "0 12px 12px 0", borderLeft: "none" }} />
        </div>

        {/* ================= NEAR LAYER - hero mascot + condenser mic ================= */}
        {/* the clay Mascot leaning into the mic */}
        <div style={{ position: "absolute", left: 96, top: 348, zIndex: 8, transform: `rotate(${6 + breathe}deg)`, transformOrigin: "60% 90%" }}>
          <Mascot lf={f} size={252} gaze={7} nodSpeed={13} nodAmp={2.4} />
        </div>

        {/* the big studio condenser mic on a boom arm */}
        <div style={{ position: "absolute", left: 0, top: 0, zIndex: 9, pointerEvents: "none" }}>
          {/* boom arm coming down from the top */}
          <div style={{ position: "absolute", left: 508, top: -20, width: 14, height: 210, background: grad("#3C3C44", "#20202A"), borderRadius: 7, transform: "rotate(30deg)", transformOrigin: "50% 0%", boxShadow: "0 6px 14px rgba(0,0,0,0.4)" }} />
          <div style={{ position: "absolute", left: 402, top: 150, width: 14, height: 150, background: grad("#3C3C44", "#20202A"), borderRadius: 7, transform: "rotate(-26deg)", transformOrigin: "50% 0%", boxShadow: "0 6px 14px rgba(0,0,0,0.4)" }} />
          {/* pivot bolt */}
          <div style={{ position: "absolute", left: 496, top: 158, width: 26, height: 26, borderRadius: "50%", background: grad("#52525C", "#2A2A32"), border: "2px solid #63636D" }} />
        </div>

        {/* shock mount + capsule */}
        <div style={{ position: "absolute", left: 356, top: 292, zIndex: 9 }}>
          {/* shock-mount yoke */}
          <div style={{ position: "absolute", left: -18, top: 6, width: 128, height: 150, borderRadius: 20, border: "5px solid #35353E", background: "transparent" }} />
          {[[-16, 26, -34], [-16, 96, 34], [110, 26, 34], [110, 96, -34]].map(([lx, ly, rot], i) => (
            <div key={i} style={{ position: "absolute", left: lx as number, top: ly as number, width: 30, height: 4, background: "#2A2A32", transform: `rotate(${rot as number}deg)` }} />
          ))}
          {/* capsule body */}
          <div style={{ position: "absolute", left: 20, top: 12, width: 56, height: 138, borderRadius: 16, background: grad("#5B5D66", "#26272E"), boxShadow: "0 10px 22px rgba(0,0,0,0.45), inset -6px 0 10px rgba(0,0,0,0.4), inset 6px 0 8px rgba(255,255,255,0.12)", overflow: "hidden" }}>
            {/* grille lines */}
            {Array.from({ length: 9 }, (_, i) => (
              <div key={i} style={{ position: "absolute", left: 6, right: 6, top: 12 + i * 8, height: 3, borderRadius: 2, background: hexA("#0E0F13", 0.7) }} />
            ))}
            {/* gold accent band + live LED */}
            <div style={{ position: "absolute", left: 0, right: 0, top: 96, height: 12, background: grad(GOLD, "#B7862B") }} />
            <div style={{ position: "absolute", left: 22, top: 116, width: 12, height: 6, borderRadius: 3, background: RED, boxShadow: `0 0 8px ${RED}`, opacity: recOn ? 1 : 0.4 }} />
          </div>
        </div>

        {/* pop filter between the mascot and the capsule */}
        <div style={{ position: "absolute", left: 268, top: 372, width: 118, height: 118, borderRadius: "50%", background: "radial-gradient(circle, rgba(18,18,24,0.5), rgba(18,18,24,0.28))", border: "6px solid #16171D", boxShadow: "0 8px 20px rgba(0,0,0,0.4)", zIndex: 9 }}>
          <div style={{ position: "absolute", inset: 8, borderRadius: "50%", backgroundImage: "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)", backgroundSize: "8px 8px" }} />
        </div>
        {/* pop filter gooseneck */}
        <div style={{ position: "absolute", left: 356, top: 420, width: 40, height: 8, background: "#22232A", borderRadius: 4, transform: "rotate(-8deg)", zIndex: 9 }} />

        {/* floating messy human speech bubbles */}
        {bubbles.map((b, i) => {
          const cyc = 100;
          const a = (((f - b.delay) % cyc) + cyc) % cyc;
          const p = a / cyc;
          const y = b.base - p * 96;
          const op = p < 0.14 ? p / 0.14 : p > 0.78 ? (1 - p) / 0.22 : 1;
          return (
            <div key={i} style={{ opacity: Math.max(0, op) }}>
              <Bubble x={b.x} y={y} text={b.t} s={b.s} rot={b.rot + Math.sin(f / 20 + i) * 2} />
            </div>
          );
        })}

        {/* ================= FOREGROUND - desk front lip + audio interface ================= */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 584, height: 208, background: grad("#3E2E1F", "#241811"), zIndex: 12, boxShadow: "0 -14px 30px rgba(0,0,0,0.4)" }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 6, background: hexA("#F0BE80", 0.28) }} />
          {/* under-lip warm LED wash */}
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 40, background: `linear-gradient(180deg, ${hexA(CO, 0.3 * (0.5 + led))}, transparent)`, mixBlendMode: "screen" }} />
        </div>

        {/* the audio interface: glowing knobs + VU meters */}
        <div style={{ position: "absolute", left: 344, top: 606, width: 340, height: 138, borderRadius: 16, background: grad("#26282F", "#15161B"), border: "3px solid #34363F", boxShadow: "0 16px 30px rgba(0,0,0,0.5)", zIndex: 13, padding: "16px 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {/* knobs */}
            <div style={{ display: "flex", gap: 20 }}>
              {[0, 1, 2].map((k) => {
                const ang = -120 + Math.sin(f / 20 + k) * 12 + k * 30;
                return (
                  <div key={k} style={{ width: 52, height: 52, borderRadius: "50%", background: grad("#42454E", "#1E2026"), border: "2px solid #52555F", boxShadow: `0 0 14px ${hexA(CO, 0.4)}, inset 0 -4px 8px rgba(0,0,0,0.5)`, position: "relative" }}>
                    <div style={{ position: "absolute", left: "50%", top: 6, width: 4, height: 18, background: CO, borderRadius: 2, transform: `translateX(-50%) rotate(${ang}deg)`, transformOrigin: "50% 20px", boxShadow: `0 0 6px ${CO}` }} />
                  </div>
                );
              })}
            </div>
            {/* VU meters */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[0, 1].map((row) => {
                const lvl = Math.floor((0.5 + 0.5 * Math.sin(f / 5 + row * 1.5)) * 12);
                return (
                  <div key={row} style={{ display: "flex", gap: 3 }}>
                    {Array.from({ length: 12 }, (_, i) => {
                      const on = i < lvl;
                      const c = i > 9 ? RED : i > 6 ? GOLD : GREEN;
                      return <div key={i} style={{ width: 9, height: 16, borderRadius: 2, background: on ? c : "#24262C", boxShadow: on ? `0 0 7px ${c}` : "none" }} />;
                    })}
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{ marginTop: 10, fontFamily: MONO, fontSize: 15, color: hexA("#fff", 0.55), letterSpacing: 1 }}>INPUT 01 &nbsp; +6dB &nbsp; 48V</div>
        </div>

        {/* coiled cable resting on the desk lip (foreground) */}
        <svg width={220} height={120} style={{ position: "absolute", left: 96, top: 636, zIndex: 13 }}>
          <path d="M 10 40 C 40 6, 96 6, 120 40 C 150 82, 60 96, 44 66 C 32 44, 78 40, 96 58" fill="none" stroke="#1B1C22" strokeWidth={13} strokeLinecap="round" />
          <path d="M 10 40 C 40 6, 96 6, 120 40 C 150 82, 60 96, 44 66 C 32 44, 78 40, 96 58" fill="none" stroke="#33353E" strokeWidth={5} strokeLinecap="round" opacity={0.6} />
          <circle cx={10} cy={40} r={9} fill="#54576200" stroke="#5A5D67" strokeWidth={4} />
        </svg>

        {/* panel-wide warm foreground vignette to seat the depth */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 14, background: "radial-gradient(ellipse 90% 70% at 46% 48%, transparent 52%, rgba(8,6,4,0.42) 100%)" }} />
      </Panel>

      <Caption words={["The", "AI", "sound", "is", "GONE"]} hot={4} top={1340} />
    </AbsoluteFill>
  );
};