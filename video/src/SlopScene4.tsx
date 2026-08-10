import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fraunces, inter } from "./fonts";
import {
  Bg, ProgressBar, Panel, CaptionLine, Mascot, Bubble,
  hexA, grad, CO, CLAY, GOLD, GREEN, RED, SKY, MONO,
} from "./SlopKit";

/* =========================================================================
   S4 - "RAMBLE"  (its own distinct setting: a cozy LIVING ROOM)
   VO: "tell it to have messy, false starts like a real person rambling."
   The clay Mascot is flopped back into a deep sage couch, phone pressed to
   its ear, leaving a loose off the cuff voicemail. A warm arc floor lamp keys
   from the right, a cool TV glow rims from the left, a patterned rug, a tall
   plant, throw cushions and a coffee table up front. The air fills with messy
   false start bubbles. The cold grey AI SLOP robot sulks in the far corner,
   left out of the human moment. Three depth plates, everything rides off f.
   No banner stamps, the karaoke caption carries the words.
   ========================================================================= */
export const Scene4: React.FC = () => {
  const f = useCurrentFrame();

  // ---- animated drivers ----
  const lamp = 0.88 + 0.12 * Math.abs(Math.sin(f / 26));               // warm lamp breathe
  const tv = 0.6 + 0.4 * Math.abs(Math.sin(f / 5) * Math.sin(f / 13)); // cool TV flicker
  const recOn = f % 30 < 16;                                           // call REC dot blink
  const robFlick = 0.3 + 0.14 * Math.abs(Math.sin(f / 9));             // sulking robot flicker
  const timer = String(Math.min(88, 21 + Math.floor(f / 2))).padStart(2, "0");
  const ramble = Math.sin(f / 6) * 4 + Math.sin(f / 2.4) * 1.4;        // busy talking sway
  const lean = -6 + ramble * 0.4;                                      // reclined mascot rock

  // ---- messy false start bubbles rising through the air ----
  const bubbles = [
    { t: "umm, so like...", x: 452, base: 340, delay: 0,   rot: -5, s: 0.9,  c: "#FFFDF7" },
    { t: "wait, no...",     x: 640, base: 316, delay: 26,  rot: 5,  s: 0.98, c: GOLD },
    { t: "what I mean is",  x: 486, base: 262, delay: 52,  rot: -3, s: 0.96, c: "#FFF3E4" },
    { t: "okay so...",      x: 690, base: 244, delay: 78,  rot: 4,  s: 0.86, c: "#FBE7D2" },
    { t: "scratch that",    x: 448, base: 212, delay: 104, rot: -4, s: 0.9,  c: "#FFFDF7" },
    { t: "hold on...",      x: 700, base: 300, delay: 124, rot: 6,  s: 0.88, c: "#FFFDF7" },
  ];

  return (
    <AbsoluteFill style={{ fontFamily: inter.fontFamily }}>
      <Bg />
      <ProgressBar />

      <Panel glow={hexA(CO, 0.26)} pushIn>
        {/* ================= FAR LAYER - living room wall + ambient light ================= */}
        <div style={{ position: "absolute", left: 0, top: 0, right: 0, height: 476, overflow: "hidden", zIndex: 0 }}>
          <div style={{ position: "absolute", inset: 0, background: grad("#3A2F24", "#271E16") }} />
          {/* wainscot / dado rail */}
          <div style={{ position: "absolute", left: 0, right: 0, top: 300, height: 6, background: hexA("#6A5236", 0.55) }} />
          <div style={{ position: "absolute", left: 0, right: 0, top: 306, height: 170, background: grad("#33291F", "#241B13") }} />
          {/* warm key wash from the lamp (upper right) */}
          <div style={{ position: "absolute", right: -60, top: -70, width: 760, height: 560, background: `radial-gradient(ellipse at 74% 26%, ${hexA(GOLD, 0.34 * lamp)}, transparent 62%)`, mixBlendMode: "screen" }} />
          {/* cool spill from the TV (upper left) */}
          <div style={{ position: "absolute", left: -60, top: -20, width: 560, height: 470, background: `radial-gradient(ellipse at 30% 40%, ${hexA(SKY, 0.22 * tv)}, transparent 64%)`, mixBlendMode: "screen" }} />
          {/* top vignette for depth */}
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 120, background: "linear-gradient(180deg, rgba(0,0,0,0.5), transparent)" }} />
        </div>

        {/* ---- wall-mounted TV on the left, cool moving glow ---- */}
        <div style={{ position: "absolute", left: 58, top: 78, zIndex: 3 }}>
          <div style={{ width: 312, height: 196, borderRadius: 12, background: "#0B0E15", border: "8px solid #191B22", boxShadow: `0 18px 34px rgba(0,0,0,0.5), 0 0 46px ${hexA(SKY, 0.3 * tv)}`, overflow: "hidden", position: "relative" }}>
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(${f * 2}deg, ${hexA(SKY, 0.55 * tv)}, ${hexA("#2E4C74", 0.5)} 40%, ${hexA("#12202E", 0.7)} 100%)` }} />
            {[0, 1, 2].map((r) => (
              <div key={r} style={{ position: "absolute", left: 22, right: 22, top: 44 + r * 44, height: 12, borderRadius: 6, background: hexA("#BCE0FF", 0.18 + 0.14 * Math.abs(Math.sin(f / 6 + r))) }} />
            ))}
          </div>
          {/* console under the TV */}
          <div style={{ position: "absolute", left: -6, top: 200, width: 340, height: 26, borderRadius: 6, background: grad("#4A382A", "#2C2016"), boxShadow: "0 10px 18px rgba(0,0,0,0.45)" }} />
        </div>

        {/* ---- framed picture on the upper right wall ---- */}
        <div style={{ position: "absolute", right: 62, top: 66, zIndex: 3, width: 118, height: 96, borderRadius: 6, background: "#241B13", border: "6px solid #6A5236", boxShadow: "0 10px 20px rgba(0,0,0,0.4)" }}>
          <div style={{ position: "absolute", inset: 8, background: grad(hexA(CLAY, 0.8), hexA(GOLD, 0.7)) }} />
          <div style={{ position: "absolute", left: 14, bottom: 14, width: 40, height: 26, borderRadius: "50% 50% 0 0", background: hexA("#2C2016", 0.7) }} />
        </div>

        {/* ---- warm arc floor lamp on the right ---- */}
        <div style={{ position: "absolute", right: 40, top: -6, zIndex: 3 }}>
          <div style={{ position: "absolute", right: 14, top: 40, width: 12, height: 430, background: grad("#3A3A42", "#22222A"), borderRadius: 6 }} />
          <div style={{ position: "absolute", right: 14, top: 40, width: 150, height: 12, background: grad("#3A3A42", "#22222A"), borderRadius: 6, transform: "rotate(14deg)", transformOrigin: "100% 50%" }} />
          <div style={{ position: "absolute", right: 150, top: 22, width: 92, height: 60, background: grad("#43434C", "#26262E"), borderRadius: "50% 50% 44% 44% / 78% 78% 30% 30%", boxShadow: "inset 0 -6px 10px rgba(0,0,0,0.4)" }} />
          <div style={{ position: "absolute", right: 172, top: 60, width: 46, height: 46, borderRadius: "50%", background: `radial-gradient(circle at 42% 38%, #FFE7A8, ${GOLD} 55%, #C77E2C)`, boxShadow: `0 0 34px ${hexA(GOLD, 0.9 * lamp)}, 0 0 78px ${hexA(GOLD, 0.5 * lamp)}`, opacity: lamp }} />
        </div>

        {/* ---- tall potted plant, far right corner ---- */}
        <div style={{ position: "absolute", right: 20, top: 214, zIndex: 3 }}>
          {[[-24, -10, -30], [-6, -30, 4], [16, -12, 26], [2, -40, -6], [-14, -22, 14]].map(([lx, ly, rot], i) => (
            <div key={i} style={{ position: "absolute", left: 40 + (lx as number), top: 30 + (ly as number), width: 22, height: 96, borderRadius: "50% 50% 50% 50% / 70% 70% 30% 30%", background: grad("#4E9A6E", "#2F6E4C"), transform: `rotate(${(rot as number) + Math.sin(f / 28 + i) * 2}deg)`, transformOrigin: "50% 100%" }} />
          ))}
          <div style={{ position: "absolute", left: 26, top: 118, width: 56, height: 74, background: grad("#C67A50", "#8F4A2C"), borderRadius: "8px 8px 14px 14px", boxShadow: "0 10px 20px rgba(0,0,0,0.4)" }} />
        </div>

        {/* ================= the cold grey AI SLOP robot, sulking, back-left corner ================= */}
        <div style={{ position: "absolute", left: 24, top: 388, zIndex: 5, filter: "saturate(0.34) brightness(0.92)", transform: `translateY(${Math.sin(f / 32) * 2}px) rotate(-7deg)` }}>
          {/* boxy grey head turned away, dead grey slop text screen */}
          <div style={{ width: 116, height: 88, borderRadius: 12, background: grad("#4A4E58", "#2C2F37"), border: "3px solid #565A64", boxShadow: "0 14px 26px rgba(0,0,0,0.5), inset 0 0 18px rgba(0,0,0,0.55)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 8, borderRadius: 6, background: "#171A20" }} />
            {[0, 1, 2, 3].map((r) => (
              <div key={r} style={{ position: "absolute", left: 15, top: 16 + r * 12, height: 5, width: r === 3 ? 38 : 84, borderRadius: 3, background: hexA("#6C7078", robFlick) }} />
            ))}
            <div style={{ position: "absolute", right: 12, bottom: 9, width: 14, height: 5, borderRadius: 3, background: hexA(SKY, 0.5), boxShadow: `0 0 8px ${hexA(SKY, 0.4)}` }} />
          </div>
          <div style={{ position: "absolute", left: 50, top: 84, width: 16, height: 20, background: "#3A3D45" }} />
          <div style={{ position: "absolute", left: 20, top: 102, width: 76, height: 58, borderRadius: 10, background: grad("#40434C", "#292C33"), border: "3px solid #4E525C" }}>
            <div style={{ position: "absolute", left: 12, top: 12, width: 22, height: 22, borderRadius: 4, background: "#23262D" }} />
          </div>
          <div style={{ position: "absolute", left: -34, top: -24, width: 210, height: 230, background: `radial-gradient(ellipse at 55% 40%, ${hexA(SKY, 0.16)}, transparent 66%)`, mixBlendMode: "screen", pointerEvents: "none" }} />
        </div>

        {/* ================= MID LAYER - floor + rug ================= */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 476, height: 316, background: grad("#5A4331", "#33251A"), zIndex: 4 }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 476, height: 8, background: hexA("#FFD8A8", 0.2), zIndex: 4 }} />
        {/* patterned area rug */}
        <div style={{ position: "absolute", left: 96, top: 512, width: 820, height: 250, borderRadius: "48%", background: `radial-gradient(ellipse, ${hexA("#9A5333", 0.82)}, ${hexA("#63321F", 0.55)} 70%, transparent)`, zIndex: 4 }}>
          <div style={{ position: "absolute", inset: 26, borderRadius: "48%", border: `3px dashed ${hexA(GOLD, 0.32)}` }} />
          <div style={{ position: "absolute", inset: 60, borderRadius: "48%", border: `2px solid ${hexA("#F0C58A", 0.22)}` }} />
        </div>

        {/* ================= the sage COUCH ================= */}
        {/* back cushions */}
        <div style={{ position: "absolute", left: 176, top: 330, width: 664, height: 156, borderRadius: "34px 34px 12px 12px", background: grad("#547A66", "#365044"), boxShadow: "0 16px 30px rgba(0,0,0,0.42), inset 0 8px 14px rgba(255,255,255,0.08)", zIndex: 5 }}>
          <div style={{ position: "absolute", left: 22, top: 16, right: 22, bottom: 16, borderRadius: 20, boxShadow: "inset 0 0 26px rgba(0,0,0,0.28)" }} />
          <div style={{ position: "absolute", left: "50%", top: 12, bottom: 12, width: 3, background: hexA("#233830", 0.5) }} />
        </div>
        {/* warm lamp light catching the couch back (right side) */}
        <div style={{ position: "absolute", left: 500, top: 330, width: 360, height: 160, background: `radial-gradient(ellipse at 80% 30%, ${hexA(GOLD, 0.22 * lamp)}, transparent 68%)`, mixBlendMode: "screen", zIndex: 5, pointerEvents: "none" }} />
        {/* seat base */}
        <div style={{ position: "absolute", left: 150, top: 468, width: 716, height: 120, borderRadius: "20px 20px 16px 16px", background: grad("#4C6E5C", "#2E453A"), boxShadow: "0 18px 30px rgba(0,0,0,0.45)", zIndex: 6 }}>
          <div style={{ position: "absolute", left: 12, top: 10, width: 340, height: 60, borderRadius: 16, background: grad("#5A806B", "#3B5849"), boxShadow: "inset 0 0 20px rgba(0,0,0,0.22)" }} />
          <div style={{ position: "absolute", right: 12, top: 10, width: 340, height: 60, borderRadius: 16, background: grad("#5A806B", "#3B5849"), boxShadow: "inset 0 0 20px rgba(0,0,0,0.22)" }} />
        </div>
        {/* couch arms */}
        <div style={{ position: "absolute", left: 118, top: 388, width: 92, height: 208, borderRadius: "26px 20px 14px 14px", background: grad("#4E735F", "#2C4338"), boxShadow: "0 14px 26px rgba(0,0,0,0.4)", zIndex: 7 }} />
        <div style={{ position: "absolute", left: 806, top: 388, width: 92, height: 208, borderRadius: "20px 26px 14px 14px", background: grad("#456854", "#284035"), boxShadow: "0 14px 26px rgba(0,0,0,0.4)", zIndex: 7 }} />
        {/* throw cushions */}
        <div style={{ position: "absolute", left: 690, top: 430, width: 118, height: 118, borderRadius: 22, background: grad(CLAY, "#A9522E"), transform: "rotate(12deg)", boxShadow: "0 12px 22px rgba(0,0,0,0.4)", zIndex: 8 }}>
          <div style={{ position: "absolute", inset: 14, borderRadius: 14, border: `3px solid ${hexA(GOLD, 0.5)}` }} />
        </div>
        <div style={{ position: "absolute", left: 208, top: 452, width: 104, height: 104, borderRadius: 20, background: grad(GOLD, "#C7902F"), transform: "rotate(-10deg)", boxShadow: "0 12px 22px rgba(0,0,0,0.4)", zIndex: 8 }}>
          <div style={{ position: "absolute", inset: 12, borderRadius: 12, border: `3px solid ${hexA("#7A5A20", 0.4)}` }} />
        </div>

        {/* ================= HERO - mascot flopped back, phone to ear ================= */}
        <div style={{ position: "absolute", left: 322, top: 336, zIndex: 9, transform: `rotate(${lean}deg) translateY(${Math.sin(f / 5) * 2}px)`, transformOrigin: "50% 100%" }}>
          <Mascot lf={f} size={256} gaze={-8} nodSpeed={7} nodAmp={3.4} />
          {/* raised arm holding the phone to the ear */}
          <div style={{ position: "absolute", left: 8, top: 118, width: 30, height: 66, borderRadius: 12, background: "#D97757", transform: "rotate(24deg)", transformOrigin: "50% 100%", boxShadow: "inset -4px 0 0 rgba(0,0,0,0.14)" }} />
          {/* the phone pressed to the ear */}
          <div style={{ position: "absolute", left: -18, top: 88, width: 50, height: 96, borderRadius: 12, background: grad("#15161C", "#080910"), border: "3px solid #2A2C34", transform: "rotate(18deg)", boxShadow: "0 8px 16px rgba(0,0,0,0.4)", overflow: "hidden" }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 22, background: hexA(GREEN, 0.22) }} />
            <div style={{ position: "absolute", left: 8, top: 6, display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: RED, boxShadow: `0 0 6px ${RED}`, opacity: recOn ? 1 : 0.35 }} />
              <span style={{ fontFamily: MONO, fontSize: 10, color: hexA("#fff", 0.85) }}>0:{timer}</span>
            </div>
            {/* tiny call waveform */}
            <svg width={44} height={44} style={{ position: "absolute", left: 3, top: 34 }}>
              {Array.from({ length: 9 }, (_, i) => {
                const h = 5 + Math.abs(Math.sin(i * 0.8 + f / 3)) * 26;
                return <rect key={i} x={2 + i * 4.6} y={22 - h / 2} width={2.6} height={h} rx={1.3} fill={GREEN} opacity={0.55 + 0.45 * Math.abs(Math.sin(i + f / 5))} />;
              })}
            </svg>
          </div>
        </div>

        {/* floating messy false start speech bubbles rising through the air */}
        {bubbles.map((b, i) => {
          const cyc = 138;
          const a = (((f - b.delay) % cyc) + cyc) % cyc;
          const p = a / cyc;
          const y = b.base - p * 122;
          const op = p < 0.12 ? p / 0.12 : p > 0.8 ? (1 - p) / 0.2 : 1;
          const pop = p < 0.12 ? 0.7 + 0.3 * (p / 0.12) : 1;
          return (
            <div key={i} style={{ opacity: Math.max(0, op), transform: `scale(${pop})`, transformOrigin: "0 100%", zIndex: 30 }}>
              <Bubble x={b.x} y={y} text={b.t} s={b.s} c={b.c} rot={b.rot + Math.sin(f / 16 + i) * 2.4} />
            </div>
          );
        })}

        {/* ================= FOREGROUND - coffee table + props ================= */}
        <div style={{ position: "absolute", left: 250, top: 690, width: 512, height: 96, borderRadius: 18, background: grad("#5A4331", "#2E2116"), boxShadow: "0 -12px 26px rgba(0,0,0,0.4)", zIndex: 12 }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 10, borderRadius: "18px 18px 0 0", background: hexA("#F0BE80", 0.3) }} />
          {/* steaming mug */}
          <div style={{ position: "absolute", left: 60, top: -34, zIndex: 13 }}>
            {[0, 1].map((k) => {
              const av = ((f + k * 20) % 60) / 60;
              return <div key={k} style={{ position: "absolute", left: 14 + Math.sin(av * 7 + k) * 6, top: -6 - av * 30, width: 8, height: 8, borderRadius: "50%", background: hexA("#EEE9DE", 0.32 * (1 - av)), filter: "blur(3px)" }} />;
            })}
            <div style={{ width: 48, height: 40, borderRadius: "8px 8px 12px 12px", background: grad("#D2724E", "#A9522E"), boxShadow: "0 8px 14px rgba(0,0,0,0.35)" }} />
            <div style={{ position: "absolute", right: -12, top: 8, width: 18, height: 20, border: "5px solid #B85B33", borderRadius: "0 12px 12px 0", borderLeft: "none" }} />
          </div>
          {/* TV remote */}
          <div style={{ position: "absolute", right: 70, top: 26, width: 108, height: 30, borderRadius: 10, background: grad("#2C2E36", "#16171C"), transform: "rotate(-7deg)", zIndex: 13, boxShadow: "0 6px 12px rgba(0,0,0,0.35)" }}>
            <div style={{ position: "absolute", left: 10, top: 9, width: 12, height: 12, borderRadius: "50%", background: hexA(RED, 0.8) }} />
            <div style={{ position: "absolute", left: 34, top: 12, right: 10, height: 6, borderRadius: 3, background: hexA("#5A5D67", 0.6) }} />
          </div>
        </div>

        {/* warm foreground vignette to seat the depth */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 14, background: "radial-gradient(ellipse 92% 72% at 48% 50%, transparent 52%, rgba(8,6,4,0.42) 100%)" }} />
      </Panel>

      <CaptionLine words={["let", "it", "RAMBLE"]} hot={2} top={1240} />
    </AbsoluteFill>
  );
};
