import React from "react";
import { AbsoluteFill, useCurrentFrame, Audio, staticFile } from "remotion";
import { inter } from "./fonts";
import {
  Bg, Panel, ProgressBar, HookHeader, KaraokeCaption, Mascot,
  Bubble, SlopBrick, AssemblyCtx,
  CLAY, CO, GOLD, GREEN, RED, MONO, hexA, over,
} from "./SlopKit";
import capWords from "./data/words_slop_hook.json";

/* ============================================================================
   SLOP · HOOK 2 (V2 COLD ROOM vs WARM BOOTH) : a THEMED split diorama in one room.
   LEFT: a cold blue-grey "AI WRITING ROOM" (server racks + LEDs, a scrolling
   autocue of perfect grey text, a stiff grey ROBOT typing, cold fluorescent light,
   a pile of identical grey slop-paper). RIGHT: a warm "VOICEMAIL BOOTH" (acoustic
   foam wedges, a big condenser MIC on a boom + pop filter, an audio INTERFACE with
   glowing knobs + VU meters, a live-waveform MONITOR w/ REC dot, an edison LAMP,
   plants, a coffee mug, a warm LED strip). The clay Mascot is mid-stride crossing
   FROM the cold left TO the warm right, ditching the robot for the mic. A doorway /
   light-seam divides them. Three depth layers (far dim wall, mid gear, near hero),
   warm key + cool rim, everything animates off f. Panel-local 1012 x 792.
   ========================================================================== */

// cold-room palette (the AI writing side)
const COLD_WALL = "#171C2A", COLD_WALL2 = "#0E1220", COLD_STEEL = "#2E3446", COLD_EDGE = "#3A4256";
const COLD_LED_A = "#5FE0FF", COLD_LED_B = "#61A6FF", COLD_LED_C = "#7CF0C0", COLD_FLUO = "#BFE6FF";
const SLOP = "#8E8A80", SLOP_DK = "#2A2E38", SLOP_LN = "#3A404C";
// warm-booth palette (the voicemail side)
const FOAM_A = "#4A4038", FOAM_B = "#33302B", WARM_WALL = "#241C16", WARM_WALL2 = "#171009";
const WARM_KEY = "#FFC98A", EDISON = "#FFB454", LED_STRIP = "#FF9A5A";

const seed = (n: number) => { const x = Math.sin(n * 127.1 + 43.7) * 43758.5453; return x - Math.floor(x); };

export const HookT2: React.FC = () => {
  const f = useCurrentFrame();

  // ---- ambient motion ----
  const fluo = 0.86 + 0.14 * Math.abs(Math.sin(f / 2.3)) * (seed(Math.floor(f / 5)) > 0.12 ? 1 : 0.4); // cold fluorescent flicker
  const edison = 0.82 + 0.18 * (0.5 + 0.5 * Math.sin(f / 9)) - (seed(Math.floor(f / 7)) > 0.9 ? 0.14 : 0); // warm bulb flicker
  const strip = 0.55 + 0.45 * Math.abs(Math.sin(f / 17));   // warm LED strip breathe
  const recBlink = (f % 30) < 16;                            // REC dot
  const autocueScroll = (f * 0.9) % 34;                      // teleprompter text creep
  const type = Math.sin(f / 3);                              // robot typing bob
  const stride = Math.sin(f / 9) * 3;                        // mascot mid-stride sway
  const bub = (i: number) => over(f, 18 + i * 15, 12);

  // ---- OPENING BEAT: a stiff grey ROBOT SHELL RIPS off the warm clay hero PIECE BY PIECE (f 0..~40) ----
  // each plate cracks, JOLTS ("rip"), then FLINGS off with real velocity + fast spin + gravity.
  // ps = pop frame (staggered cascade top->bottom); vx/vy = LAUNCH velocity px/frame; spin = deg/frame.
  const SHELL: { x: number; y: number; w: number; h: number; ps: number; vx: number; vy: number; spin: number; kind?: string }[] = [
    { x: 138, y: 24, w: 22, h: 44, ps: 2, vx: -7, vy: -19, spin: -46, kind: "antenna" },
    { x: 54, y: 58, w: 192, h: 46, ps: 6, vx: 3, vy: -17, spin: 26, kind: "dome" },
    { x: 96, y: 150, w: 108, h: 28, ps: 9, vx: -4, vy: -13, spin: -34, kind: "chin" },
    { x: 66, y: 100, w: 168, h: 42, ps: 12, vx: 5, vy: -15, spin: 22, kind: "visor" },
    { x: 51, y: 100, w: 44, h: 66, ps: 14, vx: -19, vy: -10, spin: -50 },
    { x: 205, y: 100, w: 44, h: 66, ps: 15, vx: 19, vy: -10, spin: 50 },
    { x: 6, y: 118, w: 46, h: 54, ps: 17, vx: -23, vy: -5, spin: -40, kind: "arm" },
    { x: 248, y: 118, w: 46, h: 54, ps: 18, vx: 23, vy: -5, spin: 40, kind: "arm" },
    { x: 22, y: 150, w: 50, h: 44, ps: 20, vx: -17, vy: 3, spin: -30 },
    { x: 228, y: 150, w: 50, h: 44, ps: 21, vx: 17, vy: 3, spin: 30 },
    { x: 66, y: 156, w: 168, h: 64, ps: 24, vx: 4, vy: -8, spin: -16, kind: "chest" },
    { x: 70, y: 220, w: 160, h: 56, ps: 28, vx: 2, vy: 9, spin: 14, kind: "leg" },
  ];
  // the last plate flings ~f28; the crack overlay tracks the cascade.
  const crackO = over(f, 1, 6) * (1 - over(f, 26, 12));

  const assembled = React.useContext(AssemblyCtx);
  return (
    <AbsoluteFill>
      {!assembled && <Audio src={staticFile("slop_vo_hook.wav")} />}
      {!assembled && <Audio src={staticFile("slop_music.mp3")} volume={0.5} />}
      <Bg />
      <HookHeader f={f} big="MAKE CLAUDE SOUND" hot="100% HUMAN" />
      <ProgressBar />

      <Panel glow={hexA(CO, 0.3)} pushIn>
        {/* panel-local 1012 x 792 stage */}
        <div style={{ position: "absolute", inset: 0 }}>

          {/* ============================================================
              LAYER 1 : FAR: split wall, cold recess (left) + foam (right)
              ============================================================ */}
          {/* left cold room back wall + ceiling recess */}
          <div style={{ position: "absolute", left: 0, top: 0, width: 512, height: 792, background: `linear-gradient(160deg, ${COLD_WALL} 0%, ${COLD_WALL2} 78%)`, boxShadow: "inset 0 0 120px rgba(0,0,0,0.55)" }} />
          {/* cold ceiling fluorescent tube */}
          <div style={{ position: "absolute", left: 40, top: 40, width: 420, height: 20, borderRadius: 6, background: `linear-gradient(180deg, ${COLD_FLUO}, #8FB9E0)`, opacity: fluo, boxShadow: `0 12px 46px ${hexA(COLD_LED_A, 0.5 * fluo)}, 0 3px 10px rgba(0,0,0,0.4)` }} />
          <div style={{ position: "absolute", left: 20, top: 30, width: 460, height: 150, background: `radial-gradient(ellipse at 50% 0%, ${hexA(COLD_LED_A, 0.16 * fluo)}, transparent 70%)`, pointerEvents: "none" }} />
          {/* ceiling grid tiles (cold, receding) */}
          {Array.from({ length: 6 }, (_, i) => <div key={"ct" + i} style={{ position: "absolute", left: 8 + i * 84, top: 0, width: 2, height: 26, background: COLD_EDGE, opacity: 0.4 }} />)}

          {/* cold ceiling DUCTS + PIPES running back into the hall */}
          <div style={{ position: "absolute", left: 0, top: 64, width: 476, height: 16, background: `linear-gradient(180deg, #3A4152, #1C2130)`, boxShadow: "0 5px 12px rgba(0,0,0,0.45)" }} />
          {Array.from({ length: 9 }, (_, i) => <div key={"dct" + i} style={{ position: "absolute", left: 18 + i * 50, top: 64, width: 3, height: 16, background: "rgba(0,0,0,0.4)" }} />)}
          <div style={{ position: "absolute", left: 0, top: 90, width: 476, height: 8, borderRadius: 4, background: `linear-gradient(180deg, #2E3446, #12161F)`, opacity: 0.9, boxShadow: `0 0 10px ${hexA(COLD_LED_A, 0.14)}` }} />
          {/* a thin conduit pipe dropping down the back wall (glinting) */}
          <div style={{ position: "absolute", left: 250, top: 96, width: 6, height: 300, borderRadius: 3, background: `linear-gradient(90deg, #141926, #3A4256, #141926)`, opacity: 0.7 }} />
          <div style={{ position: "absolute", left: 396, top: 96, width: 5, height: 250, borderRadius: 3, background: `linear-gradient(90deg, #12161F, #333B4E, #12161F)`, opacity: 0.55 }} />

          {/* FAR HALL: a row of receding server towers deep in the cold room */}
          {[[262, 46, 160, 0.52], [312, 40, 148, 0.44], [352, 34, 138, 0.37], [388, 28, 128, 0.3]].map(([fx, fw, fh, fo], i) => (
            <div key={"fh" + i} style={{ position: "absolute", left: fx as number, top: 178, width: fw as number, height: fh as number, borderRadius: 4, background: `linear-gradient(180deg, ${COLD_STEEL}, #131826)`, border: `1px solid ${COLD_EDGE}`, opacity: fo as number, boxShadow: "0 6px 16px rgba(0,0,0,0.45)", overflow: "hidden" }}>
              {Array.from({ length: 7 }, (_, k) => {
                const on = seed(k * 5.3 + i * 9) > 0.4 && (Math.floor(f / (6 + (k % 3) * 3)) + k + i) % 2 === 0;
                const c = [COLD_LED_A, COLD_LED_C][k % 2];
                return <span key={"fl" + k} style={{ position: "absolute", left: 5, top: 8 + k * (((fh as number) - 16) / 7), width: 6, height: 3, borderRadius: 1, background: on ? c : "#20242E", boxShadow: on ? `0 0 5px ${c}` : "none" }} />;
              })}
            </div>
          ))}

          {/* a CABLE TRAY / ladder-rack angling down into the hall */}
          <svg width={150} height={130} style={{ position: "absolute", left: 300, top: 110, opacity: 0.5, overflow: "visible" }}>
            <line x1={0} y1={0} x2={130} y2={110} stroke="#39415A" strokeWidth={4} strokeLinecap="round" />
            <line x1={22} y1={-6} x2={152} y2={104} stroke="#2A3040" strokeWidth={4} strokeLinecap="round" />
            {Array.from({ length: 7 }, (_, i) => <line key={"rg" + i} x1={4 + i * 20} y1={i * 17} x2={26 + i * 20} y2={i * 17 - 6} stroke="#2E3446" strokeWidth={3} />)}
          </svg>

          {/* cold VOLUMETRIC light shaft raking down from the fluorescent tube */}
          <div style={{ position: "absolute", left: 56, top: 54, width: 400, height: 540, background: `linear-gradient(176deg, ${hexA(COLD_LED_A, 0.15 * fluo)}, transparent 60%)`, clipPath: "polygon(32% 0, 68% 0, 100% 100%, 0% 100%)", mixBlendMode: "screen", pointerEvents: "none", opacity: 0.72 }} />

          {/* two SERVER RACKS deep on the left, rows of blinking LEDs */}
          {[[16, 150], [150, 132]].map(([rx, rh], r) => (
            <div key={"rack" + r} style={{ position: "absolute", left: rx as number, top: 190, width: 118, height: rh as number + 300, borderRadius: 6, background: `linear-gradient(180deg, ${COLD_STEEL}, #1A2030)`, border: `2px solid ${COLD_EDGE}`, boxShadow: "inset 0 2px 10px rgba(120,150,210,0.12), 0 10px 24px rgba(0,0,0,0.5)", overflow: "hidden", opacity: 0.92 }}>
              {Array.from({ length: 14 }, (_, k) => {
                const on = seed(k * 3.1 + r * 11) > 0.35 && (Math.floor(f / (4 + (k % 4) * 2)) + k) % 2 === 0;
                const c = [COLD_LED_A, COLD_LED_B, COLD_LED_C][k % 3];
                return (
                  <div key={"u" + k} style={{ position: "absolute", left: 8, top: 12 + k * 30, right: 8, height: 22, borderRadius: 3, background: "#12161F", border: "1px solid #262D3E", display: "flex", alignItems: "center", gap: 5, paddingLeft: 8 }}>
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: on ? c : "#20242E", boxShadow: on ? `0 0 8px ${c}` : "none" }} />
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: seed(k + r * 7) > 0.6 ? COLD_LED_C : "#20242E" }} />
                    <div style={{ marginLeft: 4, width: 40, height: 3, borderRadius: 2, background: "#2C3446" }} />
                  </div>
                );
              })}
            </div>
          ))}
          {/* cold blue key wash pooling on the AI side */}
          <div style={{ position: "absolute", left: -40, top: 120, width: 520, height: 620, background: `radial-gradient(ellipse at 40% 30%, ${hexA(COLD_LED_B, 0.22)}, transparent 66%)`, mixBlendMode: "screen", pointerEvents: "none", opacity: 0.8 * fluo }} />
          {/* glossy cold FLOOR + reflected rack-LED streaks */}
          <div style={{ position: "absolute", left: 0, top: 640, width: 476, height: 152, background: `linear-gradient(180deg, ${hexA(COLD_LED_B, 0.08)}, transparent 40%), linear-gradient(180deg, #10141F, #0A0D16)`, boxShadow: "inset 0 8px 22px rgba(0,0,0,0.55)" }} />
          {[[26, COLD_LED_A], [64, COLD_LED_B], [162, COLD_LED_C], [206, COLD_LED_A]].map(([rx, rc], i) => (
            <div key={"rfl" + i} style={{ position: "absolute", left: rx as number, top: 642, width: 58, height: 78, background: `linear-gradient(180deg, ${hexA(rc as string, 0.2)}, transparent 82%)`, filter: "blur(7px)", opacity: 0.4 + 0.3 * Math.abs(Math.sin(f / 6 + i * 1.3)), pointerEvents: "none" }} />
          ))}
          {/* drifting cold FOG wisps low in the hall */}
          {Array.from({ length: 3 }, (_, i) => { const dx = Math.sin(f / 40 + i * 2) * 30; return <div key={"cfog" + i} style={{ position: "absolute", left: 10 + i * 130 + dx, top: 552 + i * 34, width: 230, height: 96, borderRadius: "50%", background: `radial-gradient(ellipse, ${hexA(COLD_LED_B, 0.1)}, transparent 68%)`, filter: "blur(11px)", mixBlendMode: "screen", pointerEvents: "none" }} />; })}

          {/* right warm booth back wall */}
          <div style={{ position: "absolute", left: 500, top: 0, width: 512, height: 792, background: `linear-gradient(200deg, ${WARM_WALL} 0%, ${WARM_WALL2} 82%)`, boxShadow: "inset 0 0 120px rgba(0,0,0,0.5)" }} />
          {/* ACOUSTIC FOAM WEDGE WALL (conic pyramids), warm-lit */}
          <div style={{ position: "absolute", left: 520, top: 96, width: 476, height: 376, borderRadius: 8, overflow: "hidden", boxShadow: "inset 0 0 40px rgba(0,0,0,0.55)", opacity: 0.95 }}>
            {Array.from({ length: 8 }, (_, ry) => Array.from({ length: 11 }, (_, cx) => (
              <div key={"fm" + ry + "-" + cx} style={{ position: "absolute", left: cx * 44, top: ry * 48, width: 43, height: 47, background: `conic-gradient(from 45deg at 50% 50%, ${FOAM_A}, ${FOAM_B}, ${FOAM_A}, ${FOAM_B})`, boxShadow: "inset 0 0 6px rgba(0,0,0,0.35)" }} />
            )))}
            {/* warm key raking the foam from top-right */}
            <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 78% 8%, ${hexA(WARM_KEY, 0.34)}, transparent 62%)`, mixBlendMode: "screen", opacity: 0.9 }} />
          </div>
          {/* warm LED strip along the top of the booth wall (breathing) */}
          <div style={{ position: "absolute", left: 516, top: 86, width: 484, height: 8, borderRadius: 6, background: `linear-gradient(90deg, ${hexA(LED_STRIP, 0.4)}, ${LED_STRIP}, ${hexA(GOLD, 0.6)})`, opacity: strip, boxShadow: `0 8px 40px ${hexA(LED_STRIP, 0.5 * strip)}` }} />
          {/* warm key wash pooling on the booth side */}
          <div style={{ position: "absolute", left: 540, top: 90, width: 520, height: 640, background: `radial-gradient(ellipse at 66% 24%, ${hexA(WARM_KEY, 0.26)}, transparent 64%)`, mixBlendMode: "screen", pointerEvents: "none", opacity: 0.92 }} />
          {/* soft WINDOW glow spilling onto the booth wall (top-right) */}
          <div style={{ position: "absolute", left: 812, top: 100, width: 184, height: 156, borderRadius: 18, background: `radial-gradient(ellipse at 62% 30%, ${hexA(WARM_KEY, 0.3 * edison)}, transparent 70%)`, mixBlendMode: "screen", pointerEvents: "none" }} />
          {/* warm VOLUMETRIC light shaft angling in from the window */}
          <div style={{ position: "absolute", left: 616, top: 58, width: 380, height: 560, background: `linear-gradient(200deg, ${hexA(WARM_KEY, 0.16)}, transparent 58%)`, clipPath: "polygon(42% 0, 92% 0, 60% 100%, 12% 100%)", mixBlendMode: "screen", pointerEvents: "none", opacity: 0.66 + 0.14 * Math.sin(f / 22) }} />
          {/* a HANGING PLANT drooping from the booth ceiling (gentle sway) */}
          <div style={{ position: "absolute", left: 548, top: 104, width: 70, height: 30 }}>
            <div style={{ position: "absolute", left: 8, top: 0, width: 54, height: 22, borderRadius: "6px 6px 20px 20px", background: "linear-gradient(180deg,#8A5A3A,#5A3620)", boxShadow: "0 6px 12px rgba(0,0,0,0.3)" }} />
            {Array.from({ length: 6 }, (_, i) => { const sway = Math.sin(f / 26 + i) * 4; const h = 40 + (i % 3) * 22; return <div key={"hv" + i} style={{ position: "absolute", left: 8 + i * 9, top: 20, width: 7, height: h, borderRadius: "0 0 6px 6px", background: "linear-gradient(180deg,#4F8F52,#2E6435)", transformOrigin: "50% 0", transform: `rotate(${sway}deg)` }} />; })}
          </div>
          {/* a small trailing HANGING PLANT high on the right */}
          <div style={{ position: "absolute", left: 878, top: 100, width: 50, height: 24 }}>
            <div style={{ position: "absolute", left: 6, top: 0, width: 38, height: 16, borderRadius: "4px 4px 14px 14px", background: "linear-gradient(180deg,#7A4E32,#4E2E1C)" }} />
            {Array.from({ length: 4 }, (_, i) => { const sway = Math.sin(f / 30 + i + 1) * 5; const h = 34 + (i % 2) * 18; return <div key={"hv2" + i} style={{ position: "absolute", left: 6 + i * 10, top: 14, width: 6, height: h, borderRadius: "0 0 6px 6px", background: "linear-gradient(180deg,#5A9A5A,#2E6435)", transformOrigin: "50% 0", transform: `rotate(${sway}deg)` }} />; })}
          </div>

          {/* THE DIVIDER: a doorway frame + a glowing warm/cold light seam */}
          <div style={{ position: "absolute", left: 476, top: 0, width: 60, height: 792, background: `linear-gradient(90deg, ${COLD_WALL2}, #05070C 50%, ${WARM_WALL2})`, boxShadow: "inset 0 0 26px rgba(0,0,0,0.7)" }} />
          <div style={{ position: "absolute", left: 470, top: 0, width: 10, height: 792, background: `linear-gradient(180deg, ${COLD_EDGE}, #1A2030)` }} />
          <div style={{ position: "absolute", left: 532, top: 0, width: 10, height: 792, background: `linear-gradient(180deg, #4A3A28, #241811)` }} />
          {/* the seam of light where warm meets cold */}
          <div style={{ position: "absolute", left: 500, top: 0, width: 14, height: 792, background: `linear-gradient(180deg, ${hexA(GOLD, 0.0)}, ${hexA(GOLD, 0.55 * strip)} 40%, ${hexA(CO, 0.5 * strip)} 70%, ${hexA(GOLD, 0.0)})`, filter: "blur(5px)", mixBlendMode: "screen" }} />

          {/* ============================================================
              LAYER 2 : MID: the desks / gear on each side
              ============================================================ */}
          {/* -------- LEFT: the AI WRITING desk + robot + autocue + slop -------- */}
          {/* autocue / teleprompter on a stand, scrolling perfect grey text */}
          <div style={{ position: "absolute", left: 44, top: 250, width: 176, height: 138, borderRadius: 12, background: "#0A0D16", border: `3px solid ${COLD_EDGE}`, boxShadow: `0 10px 24px rgba(0,0,0,0.5), 0 0 22px ${hexA(COLD_LED_A, 0.25)}`, overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 6, background: "linear-gradient(180deg,#10151F,#0A0D16)", borderRadius: 8, overflow: "hidden" }}>
              {Array.from({ length: 12 }, (_, i) => {
                const y = ((i * 20 - autocueScroll) % 240 + 240) % 240;
                return <div key={"tp" + i} style={{ position: "absolute", left: 12, top: y, width: i % 3 === 2 ? "48%" : "78%", height: 6, borderRadius: 3, background: hexA(COLD_FLUO, 0.72), opacity: 0.5 + 0.5 * Math.sin(i) }} />;
              })}
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, ${hexA(COLD_LED_A, 0.14)}, transparent 40%, transparent 60%, ${hexA(COLD_LED_A, 0.14)})` }} />
            </div>
            <div style={{ position: "absolute", left: 12, top: 8, fontFamily: MONO, fontSize: 12, color: COLD_LED_A, opacity: 0.7, letterSpacing: 1 }}>AUTOCUE</div>
          </div>
          <div style={{ position: "absolute", left: 122, top: 388, width: 16, height: 60, background: `linear-gradient(180deg,${COLD_EDGE},#12161F)` }} />
          <div style={{ position: "absolute", left: 96, top: 446, width: 70, height: 12, borderRadius: 4, background: "#12161F" }} />

          {/* the cold steel desk */}
          <div style={{ position: "absolute", left: 30, top: 486, width: 300, height: 22, borderRadius: "6px 6px 3px 3px", background: `linear-gradient(180deg, ${COLD_STEEL}, #1A2030)`, boxShadow: "0 12px 26px rgba(0,0,0,0.5)" }} />
          <div style={{ position: "absolute", left: 46, top: 508, width: 12, height: 96, background: "#181D2A" }} />
          <div style={{ position: "absolute", left: 300, top: 508, width: 12, height: 96, background: "#181D2A" }} />
          {/* cold monitor on the desk showing grey slop paragraph */}
          <div style={{ position: "absolute", left: 210, top: 388, width: 132, height: 96, borderRadius: 8, background: "#0A0D16", border: `2px solid ${COLD_EDGE}`, overflow: "hidden", boxShadow: `0 0 18px ${hexA(COLD_LED_B, 0.2)}` }}>
            {Array.from({ length: 6 }, (_, i) => <div key={"mn" + i} style={{ position: "absolute", left: 10, top: 12 + i * 13, width: i === 5 ? "40%" : "80%", height: 5, borderRadius: 3, background: hexA(SLOP, 0.85) }} />)}
          </div>
          <div style={{ position: "absolute", left: 262, top: 484, width: 28, height: 16, background: "#12161F" }} />

          {/* the stiff grey ROBOT typing at the desk */}
          <div style={{ position: "absolute", left: 96, top: 356, transform: `translateY(${type * 1.4}px)`, filter: "drop-shadow(0 10px 14px rgba(0,0,0,0.45))" }}>
            <svg width={150} height={200} viewBox="0 0 150 200" style={{ overflow: "visible" }}>
              {/* antenna + blinking bulb */}
              <rect x={72} y={2} width={4} height={20} fill="#6C7488" />
              <circle cx={74} cy={0} r={7} fill={COLD_LED_A} opacity={0.4 + 0.6 * Math.abs(Math.sin(f / 4))} />
              {/* boxy head + cold visor */}
              <rect x={44} y={22} width={62} height={50} rx={8} fill="#5A616F" stroke="#3A4150" strokeWidth={3} />
              <rect x={44} y={22} width={62} height={10} rx={6} fill="#6C7482" />
              <rect x={52} y={38} width={46} height={20} rx={5} fill="url(#visor)" />
              <rect x={58} y={44} width={12} height={6} rx={3} fill={COLD_LED_A} opacity={0.5 + 0.5 * Math.abs(Math.sin(f / 3))} />
              <rect x={80} y={44} width={12} height={6} rx={3} fill={COLD_LED_A} opacity={0.5 + 0.5 * Math.abs(Math.sin(f / 3 + 1))} />
              <defs><linearGradient id="visor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2A3140" /><stop offset="1" stopColor="#12161F" /></linearGradient></defs>
              {/* segmented neck + torso with a grey panel + status row */}
              <rect x={66} y={72} width={18} height={10} fill="#4A5160" />
              <rect x={40} y={82} width={70} height={64} rx={9} fill="#525A69" stroke="#363D4C" strokeWidth={3} />
              <rect x={52} y={94} width={46} height={20} rx={4} fill="#3A4150" />
              {[0, 1, 2].map((i) => <rect key={"rl" + i} x={57 + i * 13} y={100} width={8} height={8} rx={2} fill={[COLD_LED_C, COLD_LED_A, COLD_LED_B][i]} opacity={0.4 + 0.6 * Math.abs(Math.sin(f / 4 + i))} />)}
              <rect x={54} y={122} width={42} height={5} rx={2} fill="#3A4150" />
              <rect x={54} y={132} width={30} height={5} rx={2} fill="#3A4150" />
              {/* rigid arms reaching to a keyboard (typing bob) */}
              <g transform={`translate(0 ${type * 2})`}>
                <rect x={22} y={96} width={22} height={12} rx={5} fill="#5A616F" />
                <rect x={20} y={104} width={14} height={30} rx={5} fill="#4A5160" />
                <rect x={16} y={130} width={20} height={12} rx={4} fill="#6C7482" />
              </g>
              <g transform={`translate(0 ${-type * 2})`}>
                <rect x={106} y={96} width={22} height={12} rx={5} fill="#5A616F" />
                <rect x={116} y={104} width={14} height={30} rx={5} fill="#4A5160" />
                <rect x={114} y={130} width={20} height={12} rx={4} fill="#6C7482" />
              </g>
            </svg>
          </div>
          {/* the robot's keyboard on the desk */}
          <div style={{ position: "absolute", left: 100, top: 476, width: 108, height: 16, borderRadius: 4, background: "#20263A", border: "1px solid #12161F", display: "flex", flexWrap: "wrap", gap: 2, padding: 3 }}>
            {Array.from({ length: 20 }, (_, i) => <div key={"kb" + i} style={{ width: 8, height: 4, borderRadius: 1, background: (Math.floor(f / 3) + i) % 7 === 0 ? COLD_LED_A : "#39415A" }} />)}
          </div>

          {/* a PILE of identical grey slop-paper stacking up beside the desk */}
          {[[36, 560, -7], [30, 540, 5], [40, 520, -3], [34, 500, 4]].map(([x, y, r], i) => (
            <SlopBrick key={"sp" + i} x={x as number} y={y as number} w={118} lines={4} rot={r as number} o={0.9} />
          ))}
          <div style={{ opacity: 0.9 }}><SlopBrick x={150} y={556} w={120} lines={4} rot={6} o={0.85} /></div>

          {/* -------- RIGHT: the VOICEMAIL BOOTH gear -------- */}
          {/* the warm wooden desk */}
          <div style={{ position: "absolute", left: 560, top: 500, width: 430, height: 24, borderRadius: "6px 6px 3px 3px", background: "linear-gradient(180deg,#7A5334,#4A3016)", boxShadow: "0 14px 30px rgba(0,0,0,0.5)" }} />
          <div style={{ position: "absolute", left: 560, top: 500, width: 430, height: 6, background: "#8A6340", opacity: 0.7 }} />
          <div style={{ position: "absolute", left: 590, top: 524, width: 14, height: 110, background: "#3A2612" }} />
          <div style={{ position: "absolute", left: 946, top: 524, width: 14, height: 110, background: "#3A2612" }} />
          {/* a rug under the booth */}
          <div style={{ position: "absolute", left: 560, top: 636, width: 452, height: 130, borderRadius: "50%", background: `radial-gradient(ellipse, ${hexA("#8A3B2E", 0.5)}, ${hexA("#5A2A22", 0.28)} 60%, transparent 78%)`, filter: "blur(2px)" }} />

          {/* two wall-mounted near-field STUDIO MONITORS flanking the mic */}
          {[[606, -12], [896, 12]].map(([mx, rot], i) => (
            <div key={"mon" + i} style={{ position: "absolute", left: mx as number, top: 150, width: 70, height: 92, borderRadius: 8, background: "linear-gradient(160deg,#2E2822,#14100B)", border: "2px solid #3E362C", transform: `perspective(360px) rotateY(${rot}deg)`, boxShadow: `0 12px 24px rgba(0,0,0,0.5), 0 0 18px ${hexA(EDISON, 0.14)}`, overflow: "hidden" }}>
              <div style={{ position: "absolute", left: 13, top: 10, width: 44, height: 44, borderRadius: "50%", background: "radial-gradient(circle at 40% 36%, #4A4238, #0E0B07)", border: "3px solid #241D16" }}>
                <div style={{ position: "absolute", left: "50%", top: "50%", width: 16, height: 16, marginLeft: -8, marginTop: -8, borderRadius: "50%", background: "radial-gradient(circle, #6A5E4E, #221B14)" }} />
              </div>
              <div style={{ position: "absolute", left: 20, top: 62, width: 30, height: 16, borderRadius: 4, background: "#0E0B07", border: "1px solid #2A2118" }} />
              <div style={{ position: "absolute", left: 25, top: 67, width: 6, height: 6, borderRadius: "50%", background: GREEN, boxShadow: `0 0 6px ${GREEN}`, opacity: 0.55 + 0.45 * Math.abs(Math.sin(f / 5 + i)) }} />
            </div>
          ))}

          {/* the audio INTERFACE: glowing knobs + VU meters */}
          <div style={{ position: "absolute", left: 590, top: 452, width: 150, height: 50, borderRadius: 8, background: "linear-gradient(180deg,#2A2622,#15110C)", border: "2px solid #3E362C", boxShadow: `0 8px 18px rgba(0,0,0,0.5), 0 0 18px ${hexA(EDISON, 0.22)}`, display: "flex", alignItems: "center", padding: "0 10px", gap: 10 }}>
            {/* 3 knobs, glowing indicator */}
            {[0, 1, 2].map((i) => (
              <div key={"kn" + i} style={{ width: 30, height: 30, borderRadius: "50%", background: "radial-gradient(circle at 40% 34%, #4A4238, #1A140D)", border: `2px solid ${hexA(EDISON, 0.7)}`, position: "relative", boxShadow: `0 0 8px ${hexA(EDISON, 0.4)}` }}>
                <div style={{ position: "absolute", left: "50%", top: 3, width: 3, height: 11, marginLeft: -1.5, borderRadius: 2, background: EDISON, transformOrigin: "50% 12px", transform: `rotate(${-120 + Math.sin(f / 20 + i) * 20 + i * 90}deg)`, boxShadow: `0 0 5px ${EDISON}` }} />
              </div>
            ))}
            {/* VU meter bars */}
            <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 30, marginLeft: 4 }}>
              {Array.from({ length: 7 }, (_, i) => {
                const h = 6 + Math.abs(Math.sin(i * 0.8 + f / 4)) * 22;
                const hot = h > 22;
                return <div key={"vu" + i} style={{ width: 5, height: h, borderRadius: 2, background: hot ? RED : i > 4 ? GOLD : GREEN, boxShadow: `0 0 5px ${hot ? RED : GREEN}` }} />;
              })}
            </div>
          </div>

          {/* the live WAVEFORM MONITOR w/ orange waveform + REC dot */}
          <div style={{ position: "absolute", left: 758, top: 372, width: 210, height: 130, borderRadius: 10, background: "#0A0D12", border: "3px solid #2E2A22", boxShadow: `0 10px 26px rgba(0,0,0,0.55), 0 0 26px ${hexA(CO, 0.28)}`, overflow: "hidden" }}>
            {/* screen glow + grid */}
            <div style={{ position: "absolute", inset: 4, borderRadius: 6, background: "linear-gradient(180deg,#12100A,#0A0D12)" }} />
            {Array.from({ length: 4 }, (_, i) => <div key={"gl" + i} style={{ position: "absolute", left: 8, right: 8, top: 24 + i * 26, height: 1, background: "rgba(255,255,255,0.06)" }} />)}
            {/* the bouncing waveform */}
            <svg width={196} height={70} style={{ position: "absolute", left: 7, top: 40 }}>
              {Array.from({ length: 46 }, (_, i) => { const h = 5 + Math.abs(Math.sin(i * 0.6 + f / 3.5)) * 58; return <rect key={"wv" + i} x={i * 4.2} y={35 - h / 2} width={2.4} height={h} rx={1.2} fill={CO} opacity={0.6 + 0.4 * Math.abs(Math.sin(i + f / 6))} />; })}
            </svg>
            {/* REC chip + timer */}
            <div style={{ position: "absolute", left: 10, top: 8, display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: RED, boxShadow: `0 0 9px ${RED}`, opacity: recBlink ? 1 : 0.25 }} />
              <span style={{ fontFamily: MONO, fontSize: 15, color: "#FFD9B0", letterSpacing: 1 }}>REC</span>
            </div>
            <div style={{ position: "absolute", right: 12, top: 9, fontFamily: MONO, fontSize: 15, color: "#FFD9B0" }}>0:{String(12 + Math.floor(f / 2)).padStart(2, "0")}</div>
          </div>

          {/* the big CONDENSER MIC on a boom arm + pop filter + shockmount */}
          {/* boom arm */}
          <div style={{ position: "absolute", left: 940, top: 150, width: 14, height: 150, borderRadius: 4, background: "linear-gradient(180deg,#3A342C,#221C15)", transformOrigin: "50% 100%", transform: "rotate(16deg)" }} />
          <div style={{ position: "absolute", left: 806, top: 214, width: 170, height: 12, borderRadius: 4, background: "linear-gradient(90deg,#3A342C,#221C15)", transformOrigin: "100% 50%", transform: "rotate(-9deg)" }} />
          <div style={{ position: "absolute", left: 942, top: 208, width: 20, height: 20, borderRadius: "50%", background: "#4A4238", border: "2px solid #2A241C" }} />
          {/* shockmount ring */}
          <div style={{ position: "absolute", left: 736, top: 226, width: 120, height: 120, borderRadius: "50%", border: `5px solid ${hexA(GOLD, 0.85)}`, boxShadow: `0 0 16px ${hexA(GOLD, 0.4)}` }}>
            {Array.from({ length: 6 }, (_, i) => { const a = (i / 6) * Math.PI * 2; return <div key={"sm" + i} style={{ position: "absolute", left: 55 + Math.cos(a) * 56, top: 55 + Math.sin(a) * 56, width: 3, height: 26, background: hexA(GOLD, 0.5), transformOrigin: "50% 0", transform: `rotate(${(a * 180) / Math.PI + 90}deg)` }} />; })}
          </div>
          {/* the mic capsule (grille + body) */}
          <div style={{ position: "absolute", left: 764, top: 246, width: 64, height: 92, borderRadius: "22px 22px 12px 12px", background: "linear-gradient(160deg,#E8E2D6,#8C857A)", border: "2px solid #6A6358", boxShadow: `0 10px 22px rgba(0,0,0,0.45), 0 0 26px ${hexA(WARM_KEY, 0.4)}`, overflow: "hidden" }}>
            <div style={{ position: "absolute", left: 8, top: 8, right: 8, height: 52, borderRadius: "16px 16px 6px 6px", background: "repeating-linear-gradient(45deg,#6A6358 0 3px,#B8B1A4 3px 6px)", opacity: 0.85 }} />
            <div style={{ position: "absolute", left: 14, top: 70, right: 14, height: 4, borderRadius: 2, background: "#5A544A" }} />
            <div style={{ position: "absolute", left: 20, top: 26, width: 8, height: 8, borderRadius: "50%", background: recBlink ? "#FF5A44" : "#7A2A22", boxShadow: recBlink ? "0 0 8px #FF5A44" : "none" }} />
          </div>
          {/* POP FILTER in front of the mic */}
          <div style={{ position: "absolute", left: 690, top: 250, width: 12, height: 90, borderRadius: 6, background: "linear-gradient(180deg,#3A342C,#221C15)", transformOrigin: "50% 100%", transform: "rotate(-6deg)" }} />
          <div style={{ position: "absolute", left: 700, top: 250, width: 74, height: 82, borderRadius: "50%", background: `radial-gradient(circle, ${hexA("#1A1610", 0.35)}, ${hexA("#1A1610", 0.16)} 60%, transparent 72%)`, border: `3px solid ${hexA("#2A241C", 0.85)}`, boxShadow: "inset 0 0 14px rgba(0,0,0,0.4)" }} />

          {/* an EDISON-BULB LAMP on the desk (warm flicker glow) */}
          <div style={{ position: "absolute", left: 584, top: 470, width: 40, height: 40, borderRadius: "50%", background: `radial-gradient(circle at 50% 40%, ${hexA(EDISON, 0.9 * edison)}, ${hexA(EDISON, 0.2)} 60%, transparent 74%)`, filter: "blur(1px)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", left: 588, top: 442, width: 6, height: 34, background: "#2A2015", transformOrigin: "50% 100%", transform: "rotate(-14deg)" }} />
          <div style={{ position: "absolute", left: 598, top: 428, width: 24, height: 34, borderRadius: "50% 50% 46% 46%", background: `radial-gradient(circle at 50% 44%, ${hexA("#FFE1A8", edison)}, ${hexA(EDISON, 0.8 * edison)} 60%, ${hexA("#9A5E1E", 0.5)})`, boxShadow: `0 0 30px ${hexA(EDISON, 0.7 * edison)}`, border: "1px solid #B87A2E" }}>
            <div style={{ position: "absolute", left: 10, top: 8, width: 3, height: 18, background: hexA("#FFF1C8", edison), borderRadius: 2 }} />
          </div>
          <div style={{ position: "absolute", left: 574, top: 476, width: 74, height: 12, borderRadius: 6, background: "linear-gradient(180deg,#3A2E1E,#1A130A)" }} />

          {/* a POTTED PLANT on the left of the booth desk */}
          <div style={{ position: "absolute", left: 936, top: 452, width: 54, height: 60 }}>
            {[[-30, 30], [-14, 46], [4, 34], [18, 44], [30, 28]].map(([rot, h], i) => (
              <div key={"lf" + i} style={{ position: "absolute", left: 22, top: 12, width: 12, height: h as number, borderRadius: "50% 50% 50% 50% / 70% 70% 30% 30%", background: `linear-gradient(180deg,#4F8F52,#2E6435)`, transformOrigin: "50% 100%", transform: `rotate(${rot}deg)`, boxShadow: "inset 0 0 6px rgba(0,0,0,0.2)" }} />
            ))}
            <div style={{ position: "absolute", left: 14, top: 40, width: 28, height: 22, borderRadius: "4px 4px 8px 8px", background: "linear-gradient(180deg,#B8623A,#7A3E22)" }} />
          </div>
          {/* a small trailing plant far right up high */}
          <div style={{ position: "absolute", left: 968, top: 300, width: 40, height: 90 }}>
            <div style={{ position: "absolute", left: 8, top: 0, width: 24, height: 16, borderRadius: "0 0 8px 8px", background: "#7A3E22" }} />
            {[0, 1, 2, 3].map((i) => <div key={"vn" + i} style={{ position: "absolute", left: 12 + (i % 2 ? 8 : -6), top: 14 + i * 18, width: 9, height: 22, borderRadius: "50% 50% 50% 50% / 70% 70% 30% 30%", background: "#3E8A48", transform: `rotate(${i % 2 ? 24 : -24}deg)` }} />)}
          </div>

          {/* a COFFEE MUG with a rising steam wisp */}
          <div style={{ position: "absolute", left: 660, top: 468, width: 34, height: 32, borderRadius: "5px 5px 10px 10px", background: "linear-gradient(180deg,#D8CFBE,#A89A82)", border: "2px solid #8A7B60" }}>
            <div style={{ position: "absolute", right: -10, top: 6, width: 12, height: 14, borderRadius: "50%", border: "3px solid #A89A82" }} />
          </div>
          {Array.from({ length: 3 }, (_, i) => { const p = ((f / 3 + i * 8) % 24) / 24; return <div key={"st" + i} style={{ position: "absolute", left: 672 + Math.sin(f / 5 + i) * 4, top: 466 - p * 26, width: 5, height: 5, borderRadius: "50%", background: hexA("#EDE6D6", (1 - p) * 0.5), filter: "blur(2px)" }} />; })}
          {/* coiled cable snaking across the warm desk */}
          <svg width={300} height={40} style={{ position: "absolute", left: 630, top: 494 }}>
            <path d={`M0 12 Q 40 30 80 14 T 160 16 T 260 12`} fill="none" stroke="#1A130A" strokeWidth={5} opacity={0.7} strokeLinecap="round" />
          </svg>

          {/* -- lively touch (cold): a spinning COOLING FAN whirring in a server rack -- */}
          <div style={{ position: "absolute", left: 166, top: 250, width: 84, height: 84, borderRadius: "50%", background: "radial-gradient(circle,#20242E,#12161F)", border: "3px solid #3A4256", overflow: "hidden", boxShadow: `inset 0 0 12px rgba(0,0,0,0.6), 0 0 12px ${hexA(COLD_LED_A, 0.14)}` }}>
            <svg width={84} height={84} style={{ position: "absolute", inset: 0 }}>
              <g transform={`rotate(${(f * 8) % 360} 42 42)`}>
                {Array.from({ length: 6 }, (_, i) => <rect key={"fb" + i} x={40} y={9} width={5} height={30} rx={2.5} fill="#39415A" transform={`rotate(${i * 60} 42 42) skewX(18)`} />)}
                <circle cx={42} cy={42} r={8} fill="#2E3446" stroke="#4A5468" strokeWidth={2} />
              </g>
              {Array.from({ length: 4 }, (_, i) => <line key={"fg" + i} x1={6} y1={16 + i * 17} x2={78} y2={16 + i * 17} stroke="rgba(0,0,0,0.35)" strokeWidth={2} />)}
            </svg>
          </div>

          {/* -- lively touch (warm): a blinking ON AIR sign mounted on the foam -- */}
          <div style={{ position: "absolute", left: 690, top: 118, width: 152, height: 46, borderRadius: 9, background: "linear-gradient(180deg,#2A1410,#150705)", border: `3px solid ${hexA(RED, 0.82)}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 8px 18px rgba(0,0,0,0.45), 0 0 ${recBlink ? 24 : 8}px ${hexA(RED, recBlink ? 0.6 : 0.2)}`, opacity: 0.96 }}>
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 22, letterSpacing: 4, color: recBlink ? "#FF8A66" : "#7A2A22", textShadow: recBlink ? `0 0 10px ${RED}` : "none" }}>ON AIR</span>
          </div>

          {/* ============================================================
              LAYER 3 : NEAR: the clay hero mid-stride crossing the divider
              ============================================================ */}
          {/* floor contact shadow straddling both sides */}
          <div style={{ position: "absolute", left: 350, top: 632, width: 320, height: 46, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(0,0,0,0.5), transparent 70%)", filter: "blur(3px)" }} />
          {/* the mascot, one foot in the cold room, reaching for the warm mic */}
          <div style={{ position: "absolute", left: 360, top: 320, transform: `translateX(${stride}px)`, filter: "drop-shadow(0 14px 18px rgba(0,0,0,0.45))", zIndex: 20 }}>
            {/* a cool rim on the left of the hero, warm key on the right */}
            <div style={{ position: "absolute", left: -6, top: 30, width: 40, height: 240, background: `linear-gradient(90deg, ${hexA(COLD_LED_B, 0.4)}, transparent)`, mixBlendMode: "screen", pointerEvents: "none" }} />
            <div style={{ position: "absolute", right: -6, top: 20, width: 60, height: 250, background: `linear-gradient(270deg, ${hexA(WARM_KEY, 0.42)}, transparent)`, mixBlendMode: "screen", pointerEvents: "none" }} />
            <Mascot lf={f} size={300} cheer={0.4} gaze={1} nodSpeed={7} />

            {/* OPENING BEAT: the grey robot SHELL, cracking + popping off to reveal the clay hero */}
            {f < 44 && (
              <div style={{ position: "absolute", left: 0, top: 0, width: 300, height: 300, pointerEvents: "none" }}>
                {/* spreading cracks over the intact shell (draw in, then fade as it shatters) */}
                {crackO > 0.01 && (
                  <svg width={300} height={300} style={{ position: "absolute", left: 0, top: 0, opacity: crackO }}>
                    <g stroke="#0E121C" strokeWidth={2.6} fill="none" strokeLinecap="round">
                      <path d="M150 66 L140 110 L158 152 L146 214" />
                      <path d="M158 152 L118 158 M158 152 L208 150" />
                      <path d="M96 96 L120 130 L96 172" />
                      <path d="M210 96 L186 132 L212 172" />
                      <path d="M110 200 L150 214 L192 200" />
                    </g>
                    <path d="M150 66 L140 110 L158 152 L146 214" stroke={hexA(COLD_LED_A, 0.45)} strokeWidth={1} fill="none" />
                  </svg>
                )}
                {/* the plates */}
                {SHELL.map((pl, i) => {
                  const age = f - pl.ps;
                  if (age > 34) return null;
                  // a 3-frame "RIP" jolt at the pop (shudder + scale pop), THEN launch on frame ps+3
                  const rip = age >= 0 && age < 3 ? 1 - age / 3 : 0;         // 1..0 over the rip
                  const jolt = 1 + Math.sin(Math.min(1, Math.max(0, age) / 3) * Math.PI) * 0.2 * (age < 3 ? 1 : 0);
                  const shudder = rip > 0.05 ? Math.sin(f * 5) * 3 * rip : 0; // brief shake as it rips free
                  const t = Math.max(0, age - 3);                             // fling clock (starts after the rip)
                  const flung = age >= 3;
                  const tx = flung ? pl.vx * t + shudder : shudder;
                  const ty = flung ? pl.vy * t + 0.6 * t * t : 0;             // gravity accelerates the fall
                  const rz = flung ? pl.spin * t : Math.sin((f + i) / 2) * 0.6 * crackO + shudder * 0.4;
                  const op = age < 26 ? 1 : Math.max(0, 1 - (age - 26) / 8);  // stay solid while flying, fade only at the very end
                  const isV = pl.kind === "visor";
                  return (
                    <div key={"pl" + i} style={{ position: "absolute", left: pl.x, top: pl.y, width: pl.w, height: pl.h, transform: `translate(${tx}px,${ty}px) rotate(${rz}deg) scale(${jolt})`, opacity: op, borderRadius: pl.kind === "antenna" ? 4 : isV ? "14px 14px 8px 8px" : 8, background: isV ? "linear-gradient(180deg,#2A3140,#12161F)" : "linear-gradient(150deg,#6C7382,#3A4150)", border: "2px solid #262D3C", boxShadow: rip > 0.05 ? `inset 0 2px 0 rgba(255,255,255,0.14), 0 0 ${10 * rip}px ${hexA(COLD_LED_A, 0.5 * rip)}, 0 4px 10px rgba(0,0,0,0.42)` : "inset 0 2px 0 rgba(255,255,255,0.14), inset 0 -3px 8px rgba(0,0,0,0.4), 0 4px 10px rgba(0,0,0,0.42)" }}>
                      {isV && <>
                        {/* dead LED eyes (dark, barely-lit) */}
                        <div style={{ position: "absolute", left: "16%", top: "34%", width: "22%", height: "24%", borderRadius: 4, background: "#1B1F27", boxShadow: `inset 0 0 4px #000, 0 0 ${3 + 2 * Math.abs(Math.sin(f / 6))}px ${hexA(COLD_LED_A, 0.22)}` }} />
                        <div style={{ position: "absolute", right: "16%", top: "34%", width: "22%", height: "24%", borderRadius: 4, background: "#1B1F27", boxShadow: `inset 0 0 4px #000, 0 0 ${3 + 2 * Math.abs(Math.sin(f / 6 + 1))}px ${hexA(COLD_LED_A, 0.18)}` }} />
                      </>}
                      {pl.kind === "antenna" && <div style={{ position: "absolute", left: "50%", top: -10, width: 12, height: 12, marginLeft: -6, borderRadius: "50%", background: "#2A3446", border: "2px solid #4A5468", boxShadow: `0 0 4px ${hexA(COLD_LED_A, 0.28)}` }} />}
                      {pl.kind === "chest" && <>
                        <div style={{ position: "absolute", left: "26%", top: "28%", width: "48%", height: "28%", borderRadius: 4, background: "#232A38", border: "1px solid #454E60" }} />
                        {[0, 1, 2].map((k) => <div key={"cl" + k} style={{ position: "absolute", left: `${32 + k * 15}%`, top: "37%", width: 9, height: 9, borderRadius: 2, background: "#1B1F27", boxShadow: "inset 0 0 3px #000" }} />)}
                      </>}
                      {(pl.kind === undefined || pl.kind === "chin" || pl.kind === "arm" || pl.kind === "leg" || pl.kind === "dome") && <div style={{ position: "absolute", left: 6, right: 6, top: "46%", height: 3, borderRadius: 2, background: "rgba(0,0,0,0.32)" }} />}
                      <div style={{ position: "absolute", left: 4, top: 4, width: 5, height: 5, borderRadius: "50%", background: "#2A3140" }} />
                      <div style={{ position: "absolute", right: 4, top: 4, width: 5, height: 5, borderRadius: "50%", background: "#2A3140" }} />
                    </div>
                  );
                })}
                {/* flying debris chips */}
                {Array.from({ length: 18 }, (_, i) => {
                  const sp = seed(i * 3.3) * 20;
                  const age = f - sp;
                  if (age < 0 || age > 26) return null;
                  const a = seed(i * 7.1) * Math.PI * 2;
                  const spd = 2 + seed(i * 2.2) * 5;
                  const px = 150 + Math.cos(a) * spd * age;
                  const py = 150 + Math.sin(a) * spd * age * 0.7 + 0.16 * age * age;
                  const op = Math.max(0, 1 - age / 24);
                  const sz = 4 + seed(i) * 7;
                  return <div key={"deb" + i} style={{ position: "absolute", left: px, top: py, width: sz, height: sz * 0.7, background: seed(i * 9) > 0.72 ? hexA(COLD_LED_A, op * 0.9) : hexA("#4A5160", op), transform: `rotate(${age * (8 + i * 3)}deg)`, opacity: op }} />;
                })}
                {/* pop sparks */}
                {Array.from({ length: 11 }, (_, i) => {
                  const sp = 2 + seed(i * 5.5) * 22;
                  const age = f - sp;
                  if (age < 0 || age > 7) return null;
                  const a = seed(i * 4.4) * Math.PI * 2;
                  const d = age * (3 + seed(i) * 4);
                  const px = 140 + seed(i * 2) * 30 + Math.cos(a) * d;
                  const py = 116 + seed(i * 3) * 96 + Math.sin(a) * d;
                  const op = Math.max(0, 1 - age / 7);
                  return <div key={"spk" + i} style={{ position: "absolute", left: px, top: py, width: 3, height: 12, borderRadius: 2, background: hexA(GOLD, op), boxShadow: `0 0 8px ${hexA(GOLD, op)}`, transform: `rotate(${(a * 180) / Math.PI}deg)`, opacity: op }} />;
                })}
              </div>
            )}
          </div>
          {/* motion puff behind the hero on the cold side (leaving it) */}
          {Array.from({ length: 3 }, (_, i) => { const p = over(f, i * 6, 20); return <div key={"pf" + i} style={{ position: "absolute", left: 320 - i * 26 - p * 14, top: 560 + i * 6, width: 30 - i * 5, height: 30 - i * 5, borderRadius: "50%", background: hexA("#8FB9E0", (1 - p) * 0.22), filter: "blur(4px)" }} />; })}

          {/* messy WARM human speech bubbles pouring toward the mic */}
          <div style={{ opacity: bub(0), transform: `translateY(${(1 - bub(0)) * 18}px)`, zIndex: 30 }}><Bubble x={612} y={196} text="so, umm, honestly…" s={1.02} c="#FFF3E6" rot={4} /></div>
          <div style={{ opacity: bub(1), transform: `translateY(${(1 - bub(1)) * 18}px)`, zIndex: 30 }}><Bubble x={676} y={280} text="what I really meant" s={0.94} c="#FAF9F5" rot={-3} /></div>
          {/* one COLD grey monotone tag dissolving off the robot */}
          <div style={{ position: "absolute", left: 150, top: 300, opacity: 0.5 + 0.2 * Math.sin(f / 8), zIndex: 30 }}>
            <div style={{ padding: "8px 14px", borderRadius: 12, background: SLOP_DK, border: `2px solid ${SLOP_LN}`, fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 20, color: SLOP, whiteSpace: "nowrap" }}>"In today's landscape…"</div>
          </div>

          {/* ============================================================
              ATMOSPHERE : string-light bokeh + dust motes on both sides
              ============================================================ */}
          {/* warm STRING LIGHTS: a drooping wire + twinkling bokeh bulbs across the booth */}
          <svg width={472} height={80} style={{ position: "absolute", left: 538, top: 96, overflow: "visible", pointerEvents: "none" }}>
            <path d={`M0 6 Q 235 ${54 + Math.sin(f / 30) * 4} 472 6`} fill="none" stroke="#2A1F14" strokeWidth={2} opacity={0.55} />
          </svg>
          {Array.from({ length: 9 }, (_, i) => { const t = (i + 1) / 10; const ctrlY = 54 + Math.sin(f / 30) * 4; const bx = 2 * (1 - t) * t * 235 + t * t * 472; const by = (1 - t) * (1 - t) * 6 + 2 * (1 - t) * t * ctrlY + t * t * 6; const tw = 0.55 + 0.45 * Math.abs(Math.sin(f / 6 + i * 1.3)); return <div key={"sl" + i} style={{ position: "absolute", left: 538 + bx, top: 96 + by, width: 10, height: 10, borderRadius: "50%", background: hexA(EDISON, tw), boxShadow: `0 0 ${8 + tw * 9}px ${hexA(EDISON, tw)}`, pointerEvents: "none" }} />; })}
          {/* soft warm BOKEH drifting in the booth light */}
          {Array.from({ length: 7 }, (_, i) => { const bxx = seed(i * 1.7) * 430; const drift = Math.sin(f / (24 + i * 4) + i) * 14; const byy = 150 + seed(i * 4.2) * 330 + drift; const r = 18 + seed(i) * 26; const tw = 0.3 + 0.4 * Math.abs(Math.sin(f / 10 + i)); return <div key={"bok" + i} style={{ position: "absolute", left: 552 + bxx, top: byy, width: r, height: r, borderRadius: "50%", background: `radial-gradient(circle, ${hexA(GOLD, tw * 0.5)}, transparent 70%)`, filter: "blur(3px)", pointerEvents: "none" }} />; })}
          {/* warm DUST motes rising in the light shaft */}
          {Array.from({ length: 12 }, (_, i) => { const dbx = seed(i * 2.7) * 370; const dr = (f * (0.25 + seed(i) * 0.35) + seed(i * 5) * 300) % 300; const dby = 600 - dr; const tw = 0.3 + 0.5 * Math.abs(Math.sin(f / 11 + i)); return <div key={"wdust" + i} style={{ position: "absolute", left: 602 + dbx + Math.sin(f / 18 + i) * 6, top: dby, width: 3, height: 3, borderRadius: "50%", background: hexA("#FFE1A8", tw * 0.6), boxShadow: `0 0 4px ${hexA(EDISON, tw * 0.5)}`, pointerEvents: "none" }} />; })}
          {/* cold DUST motes drifting in the hall */}
          {Array.from({ length: 14 }, (_, i) => { const cbx = seed(i * 2.1) * 450; const cdr = (f * (0.3 + seed(i) * 0.4) + seed(i * 3) * 320) % 320; const cby = 620 - cdr; const tw = 0.3 + 0.5 * Math.abs(Math.sin(f / 12 + i)); return <div key={"cdust" + i} style={{ position: "absolute", left: 12 + cbx + Math.sin(f / 20 + i) * 8, top: cby, width: 3, height: 3, borderRadius: "50%", background: hexA(COLD_FLUO, tw * 0.55), boxShadow: `0 0 4px ${hexA(COLD_LED_A, tw * 0.45)}`, pointerEvents: "none" }} />; })}

          {/* ============================================================
              NEAR FOREGROUND : out-of-focus gear framing the bottom corners
              ============================================================ */}
          {/* cold blurred SERVER UNIT foreground (bottom-left) */}
          <div style={{ position: "absolute", left: -22, top: 706, width: 264, height: 110, borderRadius: "12px 12px 0 0", background: "linear-gradient(180deg,#2A3040,#12161F)", border: "2px solid #3A4256", filter: "blur(1.4px)", transform: "perspective(560px) rotateX(28deg)", transformOrigin: "50% 100%", zIndex: 23, boxShadow: "0 -8px 24px rgba(0,0,0,0.45)" }}>
            {Array.from({ length: 4 }, (_, r) => (
              <div key={"fgr" + r} style={{ position: "absolute", left: 16, right: 16, top: 16 + r * 22, height: 14, borderRadius: 3, background: "#0E121C", border: "1px solid #232B3C", display: "flex", alignItems: "center", gap: 6, paddingLeft: 8 }}>
                {Array.from({ length: 5 }, (_, k) => { const on = (Math.floor(f / (5 + k)) + k + r) % 2 === 0; const c = [COLD_LED_A, COLD_LED_C, COLD_LED_B][k % 3]; return <span key={"fgl" + k} style={{ width: 6, height: 6, borderRadius: "50%", background: on ? c : "#20242E", boxShadow: on ? `0 0 5px ${c}` : "none" }} />; })}
              </div>
            ))}
          </div>
          {/* warm blurred MIXING DESK foreground (bottom-right) — faders + knobs */}
          <div style={{ position: "absolute", left: 706, top: 704, width: 322, height: 112, borderRadius: "12px 12px 0 0", background: "linear-gradient(180deg,#322A22,#15110C)", border: "2px solid #40372C", filter: "blur(1.4px)", transform: "perspective(560px) rotateX(30deg)", transformOrigin: "50% 100%", zIndex: 24, boxShadow: "0 -8px 24px rgba(0,0,0,0.45)" }}>
            {Array.from({ length: 8 }, (_, i) => { const fy = 18 + Math.sin(f / 6 + i * 0.9) * 10; return (
              <div key={"fdt" + i} style={{ position: "absolute", left: 24 + i * 20, top: 20, width: 6, height: 60, borderRadius: 3, background: "#0E0B07" }}>
                <div style={{ position: "absolute", left: -4, top: fy, width: 14, height: 10, borderRadius: 2, background: "linear-gradient(180deg,#6A5E4E,#2A231A)", boxShadow: `0 0 5px ${hexA(EDISON, 0.4)}` }} />
              </div>); })}
            {Array.from({ length: 6 }, (_, i) => (
              <div key={"knt" + i} style={{ position: "absolute", left: 200 + i * 20, top: 28, width: 16, height: 16, borderRadius: "50%", background: "radial-gradient(circle at 40% 34%, #4A4238, #1A140D)", border: `1px solid ${hexA(EDISON, 0.6)}`, boxShadow: `0 0 5px ${hexA(EDISON, 0.3)}` }}>
                <div style={{ position: "absolute", left: "50%", top: 2, width: 2, height: 6, marginLeft: -1, background: EDISON, transformOrigin: "50% 6px", transform: `rotate(${Math.sin(f / 18 + i) * 40}deg)` }} />
              </div>))}
          </div>

          {/* a faint vignette to seat the whole diorama */}
          <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 160px rgba(0,0,0,0.5)", pointerEvents: "none" }} />
        </div>
      </Panel>

      <KaraokeCaption words={capWords as any} fps={30} top={1240} />
    </AbsoluteFill>
  );
};