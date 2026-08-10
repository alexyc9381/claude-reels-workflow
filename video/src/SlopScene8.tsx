import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { inter } from "./fonts";
import {
  Bg, ProgressBar, Panel, CaptionLine, Mascot, Confetti, Star,
  hexA, grad, over, CLAY, GOLD, GREEN, SKY,
} from "./SlopKit";

/* =========================================================================
   S8 - the SECURITY SCANNER CHECKPOINT (a NEW clean-lab setting, not the studio)
   A bright detector lab: the written page rides a conveyor belt THROUGH a metal
   airport-style scanner ARCH. A scan beam sweeps the page, then a big CENTRED
   result panel above the arch flips to green and reads HUMAN with a 100 PASS
   check. The clay hero celebrates beside the gate while the cold grey AI-SLOP
   robot is left stunned. Depth: FAR lab wall plus ceiling lights, MID arch plus
   belt plus result panel, NEAR hero and robot. No text stamp overlays.
   ========================================================================= */
export const Scene8: React.FC = () => {
  const f = useCurrentFrame();
  const cl = (x: number) => Math.max(0, Math.min(1, x));

  // page rides the belt into the centre of the arch, then the verdict lands
  const ride = over(f, 4, 30);            // 0 = off screen left, 1 = centred under the beam
  const scanning = f >= 10 && f < 40;     // active sweep window
  const sweepY = 236 + (Math.sin(f / 3) * 0.5 + 0.5) * 260; // beam sweeps down the opening
  const reveal = over(f, 40, 12);         // green result panel pops
  const cheer = over(f, 46, 18);          // hero celebrates the pass
  const stun = over(f, 42, 16);           // grey robot stunned
  const lampPulse = 0.85 + 0.15 * Math.sin(f / 14);

  // the page travelling on the belt (panel-local)
  const paperX = 118 + ride * 388;        // 118 -> 506 (frame centre)
  const paperY = 512;

  // arch opening (panel-local ~1012 wide)
  const OPEN_L = 396, OPEN_R = 616;

  return (
    <AbsoluteFill style={{ fontFamily: inter.fontFamily }}>
      <Bg />
      <ProgressBar />

      <Panel glow={hexA(GREEN, 0.24 + reveal * 0.2)} pushIn>
        {/* ================= FAR LAYER - clean lab wall + ceiling lights ================= */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#E7EEF5 0%,#D3DEEA 46%,#BFCEDD 70%,#AEBFD0 100%)", zIndex: 0 }} />
        {/* soft green wash that blooms across the wall as the verdict lands */}
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 70% 52% at 50% 26%, ${hexA(GREEN, 0.28 * reveal)}, transparent 70%)`, zIndex: 0 }} />
        {/* recessed ceiling light strips */}
        {[150, 380, 632, 862].map((x, i) => (
          <div key={i} style={{ position: "absolute", left: x, top: 12, width: 96, height: 20, borderRadius: 10, background: "linear-gradient(180deg,#FBFDFF,#D6E0EC)", boxShadow: `0 8px 26px ${hexA("#FFFFFF", 0.7 * lampPulse)}`, zIndex: 0 }} />
        ))}
        {/* faint wall panel seams for depth */}
        {[250, 506, 762].map((x, i) => (
          <div key={i} style={{ position: "absolute", left: x, top: 40, width: 2, height: 470, background: hexA("#8FA3B8", 0.35), zIndex: 0 }} />
        ))}

        {/* ================= MID FLOOR - tiled lab floor in perspective ================= */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 560, bottom: 0, background: "linear-gradient(180deg,#C4CEDA 0%,#A7B4C4 40%,#8C9BAE 100%)", zIndex: 1 }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 556, height: 8, background: hexA("#6F8095", 0.5), zIndex: 1 }} />
        {/* floor tile seams converging toward the arch */}
        {[-360, -180, 0, 180, 360].map((dx, i) => (
          <div key={i} style={{ position: "absolute", left: 506, top: 560, width: 3, height: 232, background: hexA("#7C8CA0", 0.4), transformOrigin: "50% 0%", transform: `translateX(-50%) skewX(${dx / 9}deg)`, zIndex: 1 }} />
        ))}
        {[600, 660, 730, 792].map((y, i) => (
          <div key={i} style={{ position: "absolute", left: 0, right: 0, top: y, height: 2, background: hexA("#7C8CA0", 0.3), zIndex: 1 }} />
        ))}

        {/* ================= the SCANNER ARCH (metal detector gate) ================= */}
        {/* gate shadow on the floor */}
        <div style={{ position: "absolute", left: 330, top: 588, width: 352, height: 26, borderRadius: "50%", background: hexA("#3A4656", 0.45), filter: "blur(7px)", zIndex: 2 }} />

        {/* two chromed posts */}
        <ArchPost x={352} scanning={scanning} reveal={reveal} f={f} />
        <ArchPost x={618} scanning={scanning} reveal={reveal} f={f} />

        {/* top cross bar */}
        <div style={{ position: "absolute", left: 336, top: 196, width: 340, height: 54, borderRadius: 12, background: grad("#D7DEE7", "#9DAAB9"), border: "3px solid #C2CCD8", boxShadow: "0 12px 22px rgba(40,54,74,0.35), inset 0 3px 6px rgba(255,255,255,0.7)", zIndex: 5 }}>
          {/* row of gate indicator lamps that turn green on PASS */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} style={{ position: "absolute", left: 26 + i * 50, top: 20, width: 15, height: 15, borderRadius: "50%", background: reveal > 0.4 ? GREEN : scanning ? GOLD : "#8797A8", boxShadow: reveal > 0.4 ? `0 0 12px ${GREEN}` : scanning ? `0 0 8px ${hexA(GOLD, 0.7)}` : "none", opacity: 0.6 + 0.4 * Math.abs(Math.sin(f / 5 + i)) }} />
          ))}
        </div>

        {/* the scan BEAM sweeping the opening while scanning */}
        {scanning && (
          <div style={{ position: "absolute", left: OPEN_L, top: sweepY, width: OPEN_R - OPEN_L, height: 8, background: `linear-gradient(90deg, transparent, ${SKY}, transparent)`, boxShadow: `0 0 26px ${hexA(SKY, 0.9)}`, zIndex: 8 }} />
        )}
        {/* faint vertical curtain of the scan field inside the opening */}
        <div style={{ position: "absolute", left: OPEN_L, top: 236, width: OPEN_R - OPEN_L, height: 300, background: `linear-gradient(180deg, ${hexA(SKY, scanning ? 0.16 : 0.1)}, transparent)`, zIndex: 3 }} />

        {/* ================= the CONVEYOR BELT feeding the arch ================= */}
        <div style={{ position: "absolute", left: 40, right: 40, top: 540, height: 46, borderRadius: 8, background: grad("#4A5566", "#2C3542"), border: "3px solid #596472", boxShadow: "0 14px 26px rgba(30,40,56,0.4)", zIndex: 6 }} />
        {/* moving belt tread marks */}
        <div style={{ position: "absolute", left: 40, right: 40, top: 556, height: 12, overflow: "hidden", zIndex: 6 }}>
          {Array.from({ length: 30 }, (_, i) => (
            <div key={i} style={{ position: "absolute", left: ((i * 40 - f * 6) % 1200 + 1200) % 1200, top: 0, width: 20, height: 12, background: hexA("#1E2530", 0.6), borderRadius: 3 }} />
          ))}
        </div>
        {/* belt end rollers */}
        {[54, 934].map((x, i) => (
          <div key={i} style={{ position: "absolute", left: x, top: 542, width: 24, height: 42, borderRadius: 12, background: grad("#6A7788", "#38424F"), zIndex: 6 }} />
        ))}

        {/* ================= the PAGE being scanned (the written work) ================= */}
        <div style={{ position: "absolute", left: paperX, top: paperY, transform: "translate(-50%,-100%)", zIndex: 7 }}>
          <div style={{ width: 132, height: 168, borderRadius: 8, background: "linear-gradient(180deg,#FCFBF7,#EDE9DF)", border: "2px solid #D8D2C4", boxShadow: "0 10px 20px rgba(30,40,56,0.35)", position: "relative", overflow: "hidden", transform: `rotate(${-3 + ride * 3}deg)` }}>
            {/* warm hand written lines (uneven = human) */}
            {[0, 1, 2, 3, 4, 5, 6].map((r) => (
              <div key={r} style={{ position: "absolute", left: 16, top: 20 + r * 19, height: 6, borderRadius: 3, width: [86, 72, 92, 64, 88, 58, 78][r], background: r % 2 ? hexA(CLAY, 0.65) : hexA("#7A6A58", 0.7), transform: `rotate(${(r % 2 ? 1 : -1) * 0.8}deg)` }} />
            ))}
            {/* green verified check appears on the page as it clears */}
            {reveal > 0.3 && (
              <div style={{ position: "absolute", right: 8, bottom: 8, width: 34, height: 34, borderRadius: "50%", background: GREEN, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 24, fontWeight: 900, boxShadow: `0 0 12px ${GREEN}`, transform: `scale(${cl((reveal - 0.3) / 0.5)})` }}>{"✓"}</div>
            )}
          </div>
        </div>

        {/* ================= the big CENTRED RESULT PANEL (mounted above the arch) ================= */}
        <ResultPanel reveal={reveal} scanning={scanning} f={f} cl={cl} />

        {/* ================= NEAR LAYER - clay hero celebrating beside the gate ================= */}
        {reveal > 0.2 && <Confetti f={f} x={214} y={470} start={44} n={22} />}
        <div style={{ position: "absolute", left: 214, top: 690, transform: "translate(-50%,-100%)", zIndex: 16 }}>
          {/* contact shadow */}
          <div style={{ position: "absolute", left: "50%", top: -6, transform: "translateX(-50%)", width: 150, height: 30, borderRadius: "50%", background: hexA("#3A4656", 0.4), filter: "blur(6px)" }} />
          <Mascot lf={f} size={214} gaze={4} nodSpeed={7} nodAmp={3.4} cheer={cheer} />
        </div>
        {/* little sparkle pops around the hero on the win */}
        {reveal > 0.4 && [[120, 430], [300, 400], [150, 330]].map(([x, y], i) => (
          <Star key={i} x={x} y={y + Math.sin(f / 8 + i) * 6} s={0.7} c={GOLD} o={cl((reveal - 0.4) / 0.4) * (0.5 + 0.5 * Math.abs(Math.sin(f / 6 + i)))} />
        ))}

        {/* ================= the cold grey AI-SLOP robot, stunned on the far side ================= */}
        <div style={{ position: "absolute", left: 812, top: 668, zIndex: 15, transform: `scale(0.66) rotate(${stun * 8}deg)`, transformOrigin: "50% 100%", filter: `saturate(${0.34 - stun * 0.14}) brightness(${0.9 - stun * 0.1})` }}>
          <RobotSlop f={f} stun={stun} />
        </div>
        {/* a stunned reaction over the robot */}
        {stun > 0.3 && (
          <div style={{ position: "absolute", left: 866, top: 508 - stun * 14, zIndex: 18, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 46, color: hexA(SKY, cl((stun - 0.3) / 0.5)), transform: `rotate(${8 + Math.sin(f / 7) * 4}deg)` }}>{"?!"}</div>
        )}

        {/* cool foreground vignette to seat the lab depth */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 30, background: "radial-gradient(ellipse 94% 78% at 50% 46%, transparent 56%, rgba(30,42,60,0.42) 100%)" }} />
      </Panel>

      <CaptionLine words={["it", "reads", "HUMAN"]} hot={2} top={1240} />
    </AbsoluteFill>
  );
};

/* ---- a chromed scanner post with a status strip ---- */
const ArchPost: React.FC<{ x: number; scanning: boolean; reveal: number; f: number }> = ({ x, scanning, reveal, f }) => (
  <div style={{ position: "absolute", left: x, top: 236, width: 42, height: 356, borderRadius: 10, background: grad("#D3DBE4", "#93A1B1"), border: "3px solid #BFC9D6", boxShadow: "0 12px 22px rgba(40,54,74,0.35), inset 3px 0 6px rgba(255,255,255,0.7), inset -3px 0 6px rgba(60,74,96,0.25)", zIndex: 5 }}>
    {/* inner glowing sensor strip: amber while scanning, green on pass */}
    <div style={{ position: "absolute", left: 13, top: 20, width: 16, bottom: 24, borderRadius: 8, background: reveal > 0.4 ? `linear-gradient(180deg, ${GREEN}, ${hexA(GREEN, 0.6)})` : scanning ? `linear-gradient(180deg, ${GOLD}, ${hexA(GOLD, 0.5)})` : hexA("#7C8CA0", 0.5), boxShadow: reveal > 0.4 ? `0 0 16px ${GREEN}` : scanning ? `0 0 12px ${hexA(GOLD, 0.7)}` : "none", opacity: 0.7 + 0.3 * Math.abs(Math.sin(f / 6)) }} />
  </div>
);

/* ---- the big centred result panel that flips to green HUMAN ---- */
const ResultPanel: React.FC<{ reveal: number; scanning: boolean; f: number; cl: (x: number) => number }> = ({ reveal, scanning, f, cl }) => {
  const pop = reveal <= 0 ? 0.9 : 0.9 + 0.1 * Math.min(1, reveal * 2) + Math.sin(Math.min(1, reveal) * Math.PI) * 0.06;
  const green = reveal > 0.35;
  const fillPct = green ? Math.round(cl((reveal - 0.35) / 0.5) * 100) : Math.round((scanning ? 0.4 + 0.2 * Math.sin(f / 4) : 0.1) * 100);
  return (
    <div style={{ position: "absolute", left: 506, top: 74, transform: `translateX(-50%) scale(${pop})`, width: 496, zIndex: 12 }}>
      {/* mounting neck down to the arch */}
      <div style={{ position: "absolute", left: "50%", top: 150, transform: "translateX(-50%)", width: 20, height: 30, background: grad("#C2CCD8", "#94A2B2") }} />
      <div style={{ padding: "22px 26px", borderRadius: 22, background: green ? grad("#3FB07E", "#2C7E58") : grad("#39424F", "#242B34"), border: `4px solid ${green ? "#7BE0AE" : "#4C5763"}`, boxShadow: green ? `0 16px 40px rgba(30,40,56,0.4), 0 0 40px ${hexA(GREEN, 0.6)}` : "0 16px 40px rgba(30,40,56,0.4)", display: "flex", alignItems: "center", gap: 22 }}>
        {/* verdict icon: spinner while scanning, big check on pass */}
        <div style={{ width: 92, height: 92, borderRadius: "50%", flexShrink: 0, background: green ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.06)", border: `4px solid ${green ? "#EAFBF2" : hexA("#9FB0C2", 0.6)}`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
          {green ? (
            <span style={{ fontSize: 60, fontWeight: 900, color: "#fff", transform: `scale(${cl((reveal - 0.35) / 0.4)})` }}>{"✓"}</span>
          ) : (
            <div style={{ position: "absolute", inset: 10, borderRadius: "50%", border: `6px solid ${hexA("#9FB0C2", 0.35)}`, borderTopColor: scanning ? GOLD : "#9FB0C2", transform: `rotate(${f * 12}deg)` }} />
          )}
        </div>
        {/* readout: big label + a percent bar (the device output, not an overlay) */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 22, letterSpacing: 3, color: green ? hexA("#EAFBF2", 0.85) : hexA("#AFC0D2", 0.8), marginBottom: 4 }}>{green ? "VERDICT" : "SCANNING"}</div>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 50, lineHeight: 1, color: "#fff", letterSpacing: 1, whiteSpace: "nowrap" }}>{green ? "HUMAN" : "• • •"}</div>
          {/* fill bar climbing to 100 on pass */}
          <div style={{ marginTop: 12, height: 16, borderRadius: 999, background: "rgba(0,0,0,0.28)", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${fillPct}%`, borderRadius: 999, background: green ? "linear-gradient(90deg,#B6F1D3,#5FD69C)" : hexA(GOLD, 0.7) }} />
          </div>
        </div>
        {/* the score number */}
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 46, color: "#fff", flexShrink: 0, opacity: green ? cl((reveal - 0.35) / 0.4) : 0.4 }}>{green ? "100" : "--"}</div>
      </div>
    </div>
  );
};

/* ---- the recurring cold grey AI-SLOP robot (compact, local) ---- */
const RobotSlop: React.FC<{ f: number; stun: number }> = ({ f, stun }) => {
  const flick = 0.3 + 0.12 * Math.abs(Math.sin(f / 6));
  const eyeA = 0.5 * (1 - stun * 0.6);
  return (
    <div style={{ position: "relative", width: 128, height: 210 }}>
      {/* teleprompter head with a dead grey slop screen */}
      <div style={{ position: "absolute", left: 4, top: 0, width: 120, height: 88, borderRadius: 12, background: grad("#4A4E58", "#2C2F37"), border: "3px solid #565A64", boxShadow: "0 12px 22px rgba(0,0,0,0.5), inset 0 0 16px rgba(0,0,0,0.55)", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 8, borderRadius: 6, background: "#171A20" }} />
        {[0, 1, 2, 3, 4].map((r) => (
          <div key={r} style={{ position: "absolute", left: 15, top: 16 + r * 11, height: 5, width: r === 4 ? 40 : 90, borderRadius: 3, background: hexA("#6C7078", flick) }} />
        ))}
        {/* cyan eyes flicker out as it is stunned */}
        <div style={{ position: "absolute", left: 30, top: 30, width: 16, height: 16, borderRadius: "50%", background: hexA(SKY, eyeA) }} />
        <div style={{ position: "absolute", right: 30, top: 30, width: 16, height: 16, borderRadius: "50%", background: hexA(SKY, eyeA) }} />
      </div>
      {/* neck + boxy body */}
      <div style={{ position: "absolute", left: 56, top: 84, width: 16, height: 20, background: "#3A3D45" }} />
      <div style={{ position: "absolute", left: 28, top: 100, width: 74, height: 56, borderRadius: 10, background: grad("#40434C", "#292C33"), border: "3px solid #4E525C" }}>
        <div style={{ position: "absolute", left: 12, top: 12, width: 22, height: 22, borderRadius: 4, background: "#23262D" }} />
        <div style={{ position: "absolute", right: 12, top: 14, width: 18, height: 8, borderRadius: 3, background: hexA(SKY, 0.22) }} />
      </div>
      {/* arms fling up in a stunned jolt */}
      <div style={{ position: "absolute", left: 12, top: 108, width: 12, height: 42, borderRadius: 6, background: "#3A3D45", transform: `rotate(${10 - stun * 46}deg)`, transformOrigin: "50% 0%" }} />
      <div style={{ position: "absolute", right: 12, top: 108, width: 12, height: 42, borderRadius: 6, background: "#3A3D45", transform: `rotate(${-10 + stun * 46}deg)`, transformOrigin: "50% 0%" }} />
      {/* legs planted */}
      <div style={{ position: "absolute", left: 42, top: 154, width: 14, height: 40, borderRadius: 5, background: "#33363E" }} />
      <div style={{ position: "absolute", left: 72, top: 154, width: 14, height: 40, borderRadius: 5, background: "#33363E" }} />
    </div>
  );
};
