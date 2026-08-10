import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { inter, fraunces } from "./fonts";
import { Bg, ProgressBar, Panel, CaptionLine, Mascot, RobotRig, grad, hexA, over, CLAY, GOLD, GREEN, RED, SKY, INK } from "./SlopKit";

/* SLOP - Scene 6 - the WHITEBOARD CLASSROOM.
   A distinct setting from the studio scenes: a bright, instructional room. A big
   dry-erase whiteboard lists the three tell-tale AI writing moves, and the clay
   Mascot, red marker in hand, strikes each one out. The cold grey AI-SLOP robot
   sulks in the far corner as its moves get banned. Far bg (wall / window / clock),
   mid props (board / desk / notes), near hero (mascot). No stamp text; the caption
   carries the words. Everything rides off f. */

// the three AI "moves" on the board, each struck out at a staggered beat
const MOVES: { t: string; strike: number }[] = [
  { t: "the throat-clearing intro", strike: 22 },
  { t: "the rule of three", strike: 46 },
  { t: "the tidy conclusion", strike: 70 },
];

export const Scene6: React.FC = () => {
  const f = useCurrentFrame();

  // whiteboard geometry (panel-local)
  const BX = 116, BY = 92, BW = 610, BH = 392;
  const rowH = 96, rowTop = BY + 128;

  // the marker arm reaches highest right as each strike lands
  const markerReach = MOVES.reduce((amp, m) => Math.max(amp, Math.max(0, 1 - Math.abs(f - m.strike) / 8)), 0);
  const armLift = markerReach * 16;
  const bansLanded = MOVES.filter((m) => f >= m.strike + 4).length;

  return (
    <AbsoluteFill style={{ fontFamily: inter.fontFamily }}>
      <Bg />
      <ProgressBar />
      <Panel glow={hexA(GREEN, 0.24)} pushIn>
        <AbsoluteFill style={{ overflow: "hidden" }}>
          {/* ============ FAR LAYER - bright classroom wall, warm base + cool window light ============ */}
          <div style={{ position: "absolute", inset: 0, background: grad("#F4EFE3", "#E2D8C4") }} />
          <div style={{ position: "absolute", left: -60, top: -40, width: 470, height: 580, background: `radial-gradient(circle at 34% 30%, ${hexA(SKY, 0.3)}, transparent 66%)`, filter: "blur(6px)", mixBlendMode: "multiply" }} />
          <div style={{ position: "absolute", right: -50, top: -30, width: 430, height: 430, background: `radial-gradient(circle, ${hexA(GOLD, 0.24)}, transparent 64%)`, filter: "blur(8px)" }} />

          {/* a classroom window (the cool light source), far-left */}
          <div style={{ position: "absolute", left: 24, top: 116, width: 120, height: 196, borderRadius: 8, background: grad("#CBE4F6", "#9FC6E6"), border: "8px solid #EBE4D3", boxShadow: "inset 0 0 26px rgba(255,255,255,0.55), 0 8px 18px rgba(0,0,0,0.14)" }}>
            <div style={{ position: "absolute", left: "50%", top: 8, bottom: 8, width: 5, background: "#EBE4D3", transform: "translateX(-50%)" }} />
            <div style={{ position: "absolute", top: "50%", left: 8, right: 8, height: 5, background: "#EBE4D3", transform: "translateY(-50%)" }} />
            <div style={{ position: "absolute", left: 10, top: 10, width: 40, height: 60, background: "linear-gradient(120deg, rgba(255,255,255,0.6), transparent)", borderRadius: 4 }} />
          </div>

          {/* a wall clock, top-right, hands turning */}
          <div style={{ position: "absolute", right: 44, top: 40, width: 98, height: 98, borderRadius: "50%", background: "#FBF8F1", border: "7px solid #C9C0AC", boxShadow: "0 8px 18px rgba(0,0,0,0.18)" }}>
            <div style={{ position: "absolute", left: "50%", top: "50%", width: 4, height: 30, background: INK, borderRadius: 3, transformOrigin: "50% 100%", transform: `translate(-50%,-100%) rotate(${(f * 6) % 360}deg)` }} />
            <div style={{ position: "absolute", left: "50%", top: "50%", width: 5, height: 22, background: CLAY, borderRadius: 3, transformOrigin: "50% 100%", transform: `translate(-50%,-100%) rotate(${(f * 0.9) % 360}deg)` }} />
            <div style={{ position: "absolute", left: "50%", top: "50%", width: 10, height: 10, borderRadius: "50%", background: INK, transform: "translate(-50%,-50%)" }} />
          </div>

          {/* mid: floor + wooden ledge across the bottom */}
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 150, background: grad("#D9C8A6", "#BFA579") }} />
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 150, height: 20, background: "#B29060", boxShadow: "0 -4px 10px rgba(0,0,0,0.14)" }} />

          {/* ============ MID LAYER - the WHITEBOARD ============ */}
          <div style={{ position: "absolute", left: BX, top: BY, width: BW, height: BH, borderRadius: 14, background: "linear-gradient(180deg,#FFFFFF,#F2F0E9)", border: "10px solid #C7C0AF", boxShadow: "0 24px 46px -14px rgba(30,26,20,0.42), inset 0 2px 10px rgba(255,255,255,0.7)" }}>
            <div style={{ position: "absolute", left: 22, top: 14, width: 210, height: 64, background: "linear-gradient(120deg, rgba(255,255,255,0.75), transparent)", borderRadius: 32, filter: "blur(5px)" }} />

            {/* small hand-written header (a label, not a stamp) */}
            <div style={{ position: "absolute", left: 34, top: 26, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 34, color: "#2E6B8C", letterSpacing: 0.5 }}>AI tells</span>
              <span style={{ width: 120, height: 4, borderRadius: 3, background: "#2E6B8C", opacity: 0.55 }} />
            </div>

            {/* the three moves, each struck out */}
            {MOVES.map((m, i) => {
              const y = rowTop + i * rowH - BY;
              const s = over(f, m.strike, 7, Easing.out(Easing.cubic));
              const done = f >= m.strike + 4;
              return (
                <div key={i} style={{ position: "absolute", left: 40, right: 34, top: y }}>
                  <div style={{ position: "absolute", left: 0, top: 2, width: 36, height: 36, borderRadius: 7, border: `4px solid ${done ? RED : "#9A968B"}`, background: done ? hexA(RED, 0.1) : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 30, color: RED, opacity: done ? 1 : 0 }}>{"✕"}</span>
                  </div>
                  <span style={{ position: "absolute", left: 56, top: 0, fontFamily: fraunces.fontFamily, fontWeight: 800, fontSize: 40, lineHeight: 1.05, color: done ? "#A9A499" : "#33302A", whiteSpace: "nowrap" }}>{m.t}</span>
                  <div style={{ position: "absolute", left: 54, top: 24, height: 8, width: `${s * (BW - 150)}px`, background: RED, borderRadius: 5, transform: "rotate(-1.4deg)", boxShadow: `0 1px 4px ${hexA(RED, 0.5)}`, opacity: 0.92 }} />
                </div>
              );
            })}
          </div>

          {/* marker tray under the board + resting markers + an eraser */}
          <div style={{ position: "absolute", left: BX + 14, top: BY + BH - 2, width: BW - 28, height: 22, borderRadius: 6, background: "#B9B1A0", boxShadow: "0 6px 12px rgba(0,0,0,0.2)" }} />
          {[["#C44A3A", 40], ["#3F9E74", 130], ["#5AA0DE", 218]].map(([c, lx], i) => (
            <div key={i} style={{ position: "absolute", left: BX + 24 + (lx as number), top: BY + BH - 10, width: 76, height: 16, borderRadius: 8, background: c as string, transform: "rotate(-2deg)", boxShadow: "0 3px 6px rgba(0,0,0,0.22)" }}>
              <div style={{ position: "absolute", right: -4, top: 2, width: 12, height: 12, borderRadius: 3, background: "#EDE9DF" }} />
            </div>
          ))}
          <div style={{ position: "absolute", left: BX + BW - 132, top: BY + BH - 14, width: 90, height: 26, borderRadius: 5, background: "#3A404C", border: "3px solid #2A2E38", boxShadow: "0 4px 8px rgba(0,0,0,0.25)" }}>
            <div style={{ position: "absolute", left: 4, top: 4, right: 4, height: 8, borderRadius: 3, background: "#E9E4D6" }} />
          </div>

          {/* warm sticky notes clustered on the wall */}
          {[["#F6D66B", 42, 470, -6], ["#F2A65A", 120, 500, 5], ["#E88FA6", 62, 556, -3]].map(([c, lx, ty, rot], i) => (
            <div key={i} style={{ position: "absolute", left: lx as number, top: ty as number, width: 78, height: 78, background: c as string, transform: `rotate(${rot}deg)`, boxShadow: "0 8px 16px rgba(0,0,0,0.2)" }}>
              {[18, 34, 50].map((ny, k) => <div key={k} style={{ position: "absolute", left: 12, top: ny, right: 12 + k * 8, height: 5, borderRadius: 3, background: "rgba(0,0,0,0.16)" }} />)}
            </div>
          ))}

          {/* ============ the cold grey AI-SLOP robot, sulking in the far corner ============ */}
          <div style={{ position: "absolute", left: 24, bottom: 150, opacity: 0.9, transform: `scale(${0.66 - bansLanded * 0.03}) translateY(${bansLanded * 8}px)`, transformOrigin: "left bottom", filter: "saturate(0.45) brightness(0.92)" }}>
            <div style={{ position: "relative" }}>
              <Mascot lf={f * 0.7} size={210} tint="#8E8A80" nodAmp={1.3} nodSpeed={17} gaze={5} stern={0.9} />
              <RobotRig x={38} y={22} f={f} s={0.86} />
              {bansLanded > 0 && (
                <div style={{ position: "absolute", left: 150, top: 40, width: 13, height: 17, borderRadius: "50% 50% 50% 50% / 62% 62% 38% 38%", background: hexA(SKY, 0.7), transform: `translateY(${(f % 40) * 0.5}px)`, opacity: 1 - (f % 40) / 40 }} />
              )}
            </div>
          </div>

          {/* ============ NEAR LAYER - the clay HERO mascot, marker in hand, striking the board ============ */}
          <div style={{ position: "absolute", right: 44, bottom: 138, width: 250, height: 34, borderRadius: "50%", background: "rgba(30,24,16,0.24)", filter: "blur(9px)" }} />
          <div style={{ position: "absolute", right: 30, bottom: 150 }}>
            <div style={{ position: "relative", transform: `translateY(${-armLift * 0.4}px)` }}>
              <Mascot lf={f} size={252} gaze={-3} nodAmp={2.4} nodSpeed={9} cheer={interpolate(f, [74, 92], [0, 0.5], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
              {/* the red marker in the raised hand */}
              <div style={{ position: "absolute", left: 6, top: 76 - armLift, width: 86, height: 22, borderRadius: 11, background: RED, transform: `rotate(${-42 - armLift}deg)`, transformOrigin: "82% 50%", boxShadow: `0 4px 10px ${hexA(RED, 0.5)}` }}>
                <div style={{ position: "absolute", left: -10, top: 5, width: 14, height: 12, borderRadius: 3, background: "#7A231A" }} />
                <div style={{ position: "absolute", right: 4, top: 5, width: 12, height: 12, borderRadius: 3, background: "#EDE9DF" }} />
              </div>
            </div>
          </div>

          {/* chalk-dust motes catching the light */}
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ position: "absolute", left: BX + 210 + i * 140, top: BY + 58 + Math.sin(f / 12 + i * 2) * 22, width: 8, height: 8, borderRadius: "50%", background: hexA("#FFFFFF", 0.7), boxShadow: `0 0 10px ${hexA(GOLD, 0.5)}`, opacity: 0.5 + 0.4 * Math.abs(Math.sin(f / 9 + i)) }} />
          ))}

          {/* soft warm foreground vignette to seat the depth */}
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 92% 74% at 48% 46%, transparent 56%, rgba(40,30,16,0.26) 100%)" }} />
        </AbsoluteFill>
      </Panel>
      <CaptionLine words={["ban", "the", "AI", "MOVES"]} hot={3} top={1240} />
    </AbsoluteFill>
  );
};

export default Scene6;
