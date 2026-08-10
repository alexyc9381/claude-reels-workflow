import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { inter } from "./fonts";
import { Bg, Panel, ProgressBar, HookHeader, Caption, AssemblyCtx, hexA } from "./SlopKit";
import {
  ControlRoom, Nebula, GasGiant, Stars, Moons, Cluster,
  Astro, Patch, Craft, Gauge, Flap, BarMeter, Pulse, Sweep, Trace,
  ROOM_HI, PANEL_B, PANEL_L, STEEL_D,
  RED, RED_D, AMBER, GO, GO_L, CLAY,
  FLOOR, E, osc, OUT, IO, SH_D,
} from "./MissionWorld";
import { Surface, horizonOf, Flagpole, Kick, PW, PH } from "./MissionSurfaces";
import { SheetStack, StageScreen } from "./MissionProps";

const SoloCaption: React.FC<{ words: string[]; hot?: number }> = (p) =>
  React.useContext(AssemblyCtx) ? null : <Caption {...p} />;

/* =========================================================================
   REEL 82 "BORIS" · HOOK — SIX SHOTS, SIX WORLDS.

   ⛔ THIS HOOK HAS BEEN RE-CUT THREE TIMES. The history is the lesson:

     7 shots  (0.40 - 1.20s)  "not fast enough, the back half decelerates"
    11 shots  (0.33 - 0.57s)  "flipping way too fast, we dont need so many flips"
     6 shots  (0.73 - 1.00s)  ← here

   The 11-shot cut overshot. The house floor already said it: no shot under
   0.7s, and six shots in ~4.5s is the target, not the minimum
   (memory `feedback_shot_count_is_a_floor`). Chasing "faster" past that floor
   produces churn — the viewer registers motion but cannot read any single shot.

   The first cut lands at f22 = 0.73s, which is exactly where the APPROVED reel
   81 hook cuts (measure the approved reel, do not re-derive a feel).

   Six shots, six worlds, and each one earns its place against the VO:
     1 mission control  "three things 99% are getting wrong"  (three dials, one red)
     2 THE STAGE        "the guy who built Claude Code"       (real YC footage)
     3 a nebula         "three things"                        (the 3, vast)
     4 an ice plain     "he deleted 80%"                      (the prompt, thrown out)
     5 a gas giant      "the third one will blow your mind"   (T+14 DAYS)
     6 mission control  the payoff
   ========================================================================= */

/* 0.73 · 0.93 · 1.00 · 1.00 · 0.87 · 0.70 s — every shot at or above the floor.
   ⛔ every cut must land INSIDE the hook's 157 frames. */
export const HOOK_CUTS = [22, 50, 80, 110, 136];
export const HAS_CLIP = true;
export const CLIP_SRC = "boris_clip.mp4";

/** one chip of type, parked in a band nothing else occupies */
const Chip: React.FC<{ y: number; text: string; c?: string; size?: number }> =
  ({ y, text, c = RED, size = 38 }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top: y, display: "flex", justifyContent: "center", zIndex: 26 }}>
    <div style={{ padding: "9px 24px", borderRadius: 8, background: c, boxShadow: SH_D,
      fontFamily: inter.fontFamily, fontWeight: 900, fontSize: size, letterSpacing: "-0.01em",
      color: "#FFF6F2", whiteSpace: "nowrap" }}>{text}</div>
  </div>
);

/** a shot: mounts only inside its window, and gets its own slow push-in.
 *  The push is spread over 20 frames now rather than 9 — a longer shot wants a
 *  slower move under it, or it arrives and then sits. */
const Shot: React.FC<{ f: number; a: number; b: number; k?: number; children: React.ReactNode }> =
  ({ f, a, b, k = 0, children }) => {
  if (f < a || f >= b) return null;
  const t = Math.min(1, (f - a) / 20), e = t * t * (3 - 2 * t);
  const z = [1.09 - e * 0.08, 1.02 + e * 0.06, 1.06 - e * 0.05, 1.03 + e * 0.06][k % 4];
  const dx = [(1 - e) * 20, -(1 - e) * 24, (1 - e) * 14, -(1 - e) * 18][k % 4];
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden",
      transform: `scale(${z}) translateX(${dx}px)`, transformOrigin: "50% 58%" }}>{children}</div>
  );
};

export const MissionHook: React.FC = () => {
  const f = useCurrentFrame();
  const [C1, C2, C3, C4, C5] = HOOK_CUTS;
  const HI = horizonOf("ice");

  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <HookHeader f={f + 12} big="CLAUDE CODE'S CREATOR:" hot="3 THINGS 99% GET WRONG" />
      <Panel glow={hexA(CLAY, 0.28)}>

        {/* ---- 1 · MISSION CONTROL. One dial slams into the red. ---- */}
        <Shot f={f} a={0} b={C1} k={0}>
          <ControlRoom f={f} />
          <div style={{ position: "absolute", left: 40, top: 92, width: 932, height: 300, borderRadius: 12,
            background: PANEL_B, border: `10px solid ${PANEL_L}`, boxShadow: SH_D, zIndex: 8 }} />
          <Gauge f={f} x={318} y={96} d={300} v={0.96} at={1} danger={0.6} c={GO} z={13} />
          <Pulse f={f} at={9} x={468} y={246} r={250} c={RED} life={14} z={14} />
          {[0, 1].map((i) => (
            <Gauge key={i} f={f} x={i ? 706 : 84} y={172} d={172} v={0.9} at={i ? 12 : 6} danger={0.62} c={GO} z={11} />
          ))}
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={`l${i}`} style={{ position: "absolute", left: 74 + i * 58, top: 412, width: 40, height: 16,
              borderRadius: 4, background: f > 6 + i * 3 ? RED : STEEL_D, zIndex: 12 }} />
          ))}
          <Trace f={f} x={556} y={402} w={380} h={56} c={GO_L} z={12} />
          <Astro f={f} x={40} y={FLOOR - 250 * 0.94} size={250} gaze={2} shock={0.45} nodAmp={2.6} nodSpeed={11} z={15} />
          <Astro f={f + 9} x={764} y={FLOOR - 240 * 0.94} size={240} gaze={-2} shock={0.4} nodAmp={2.4} nodSpeed={12} z={15} suitC="#E2E6EA" />
          <Chip y={478} text="ALL THREE IN THE RED" c={RED} size={35} />
        </Shot>

        {/* ---- 2 · THE STAGE. The real recording, and who it is. ---- */}
        <Shot f={f} a={C1} b={C2} k={1}>
          <ControlRoom f={f} />
          <div style={{ position: "absolute", inset: 0, background: "#22303E", opacity: 0.55 }} />
          <StageScreen f={f} x={188} y={152} w={636} h={358} from={44} z={22} />
          <Astro f={f} x={-58} y={FLOOR - 214 * 0.94} size={214} gaze={2} nodAmp={2.4} nodSpeed={11} z={18} />
          <Astro f={f + 9} x={866} y={FLOOR - 206 * 0.94} size={206} gaze={-2} nodAmp={2.2} nodSpeed={12}
                 z={18} suitC="#E2E6EA" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={`l${i}`} style={{ position: "absolute", left: 300 + i * 74, top: 740, width: 46, height: 14,
              borderRadius: 4, background: i % 2 ? GO : STEEL_D, zIndex: 19 }} />
          ))}
        </Shot>

        {/* ---- 3 · A NEBULA. The 3, vast and alone. ---- */}
        <Shot f={f} a={C2} b={C3} k={2}>
          <Nebula f={f} />
          <Stars n={70} seed={7} />
          <Cluster f={f} x={676} y={196} />
          <Moons f={f} />
          {[0, 1].map((i) => (
            <Flap key={i} f={f} at={C2 + 1 + i * 5} text={String(i + 1)} x={70 + i * 112} y={308} w={94} h={122}
                  c="#8E86C4" bg="#2A2456" z={13} />
          ))}
          <Flap f={f} at={C2 + 12} text="3" x={340} y={140} w={360} h={412} c="#FFF1EE" bg={RED_D} z={14} />
          <Pulse f={f} at={C2 + 18} x={520} y={346} r={430} c="#B79BF0" life={20} z={12} />
          {Array.from({ length: 16 }, (_, i) => {
            const d = ((i * 37) % 100) / 100, w = 14 + d * 46;
            return <div key={`db${i}`} style={{ position: "absolute",
              left: ((i * 83 + (f - C2) * (2 + d * 3)) % (PW + 120)) - 60, top: 60 + ((i * 53) % 100) / 100 * 660,
              width: w, height: w * 0.5, borderRadius: w * 0.3, zIndex: 6,
              background: i % 3 ? "#4A3E7A" : "#6E5EA0", transform: `rotate(${d * 90}deg)` }} />;
          })}
          <Chip y={614} text="AND THE THIRD ONE" c="#6E56AE" size={34} />
        </Shot>

        {/* ---- 4 · AN ICE PLAIN. The system prompt, thrown away. ---- */}
        <Shot f={f} a={C3} b={C4} k={3}>
          <Surface f={f} kind="ice" pan={(f - C3) * 4} />
          <div style={{ position: "absolute", left: 464, top: HI - 304, width: 230, height: 378,
            border: "6px dashed #8FB2C8", borderRadius: 8, zIndex: 9 }} />
          <SheetStack f={f - C3} x={470} y={HI - 300} cols={3} rows={5} cw={78} ch={76}
                      gone={0.8} at={2} every={1.5} z={12} />
          <Astro f={f} x={96} y={HI + 110 - 274 * 0.94} size={274} step={11} pack gaze={-1}
                 nodAmp={3.2} nodSpeed={9} z={15} />
          <Kick f={f} x={132} y={HI + 106} c="rgba(255,255,255,0.6)" />
          <Flagpole f={f} x={858} y={HI - 108} h={152} z={13} />
          <BarMeter f={f} x={286} y={78} w={440} h={42} v={0.8} at={C3 + 4} n={10} c={RED} z={20} />
          <Chip y={140} text="HE DELETED 80%" c={RED} />
        </Shot>

        {/* ---- 5 · A GAS GIANT. T+14, flap by flap. ---- */}
        <Shot f={f} a={C4} b={C5} k={0}>
          <div style={{ position: "absolute", inset: 0, background: "#0E1428" }} />
          <Stars n={80} seed={3} />
          <GasGiant f={f} cx={506} cy={620} r={470} hue="teal" />
          <Moons f={f} />
          {["T", "+", "1", "4"].map((ch, i) => (
            <Flap key={i} f={f} at={C4 + 2 + i * 4} text={ch} x={110 + i * 128} y={118} w={108} h={146}
                  c="#EAF6F7" bg="#12344A" z={16} />
          ))}
          <div style={{ position: "absolute", left: 646, top: 142, fontFamily: inter.fontFamily, fontWeight: 900,
            fontSize: 58, lineHeight: 1, letterSpacing: "-0.02em", color: "#EAF6F7", zIndex: 16 }}>DAYS</div>
          <div style={{ position: "absolute", left: -120, top: 486, width: 1250, height: 190,
            borderRadius: "50%", border: "12px solid #7FC9C6", opacity: 0.55,
            transform: "rotate(-9deg)", zIndex: 12 }} />
          <Craft f={f} x={960 - E(f, C4, C5, 0, 640, IO)} y={352} s={0.86} flame={0.5} z={15} />
          <BarMeter f={f} x={110} y={286} w={470} h={38} v={1} at={C4 + 10} n={14} c={GO_L} z={16} />
        </Shot>

        {/* ---- 6 · MISSION CONTROL. They are only watching. ---- */}
        <Shot f={f} a={C5} b={9999} k={1}>
          <ControlRoom f={f} />
          <div style={{ position: "absolute", left: 40, top: 92, width: 932, height: 300, borderRadius: 12,
            background: PANEL_B, border: `10px solid ${PANEL_L}`, boxShadow: SH_D, zIndex: 8 }} />
          <Sweep f={f} x={94} y={116} d={250} c={GO_L} z={12} />
          <Trace f={f} x={392} y={138} w={292} h={96} c={GO_L} z={12} />
          <Trace f={f} x={392} y={246} w={292} h={96} c="#B4D0E0" z={12} />
          <Gauge f={f} x={736} y={126} d={192} v={0.98} at={C5 + 2} danger={1.1} c={GO} z={12} />
          <BarMeter f={f} x={94} y={392} w={836} h={42} v={1} at={C5 + 4} n={20} c={GO} z={14} />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={`l${i}`} style={{ position: "absolute", left: 74 + i * 58, top: 452, width: 40, height: 16,
              borderRadius: 4, background: GO, zIndex: 12 }} />
          ))}
          <Astro f={f} x={40} y={FLOOR - 250 * 0.94} size={250} gaze={2} cheer={0.7} nodAmp={2.6} nodSpeed={10} z={14} />
          <Astro f={f + 37} x={764} y={FLOOR - 240 * 0.94} size={240} gaze={-2} cheer={0.65} nodAmp={2.4} nodSpeed={11} z={14} suitC="#E2E6EA" />
          <Patch x={474} y={FLOOR - 128} d={76} c={RED} z={16} />
        </Shot>

        {/* two bright frames on every hard cut */}
        {HOOK_CUTS.map((cf) => {
          const k = f - cf;
          if (k < 0 || k > 2) return null;
          return <div key={cf} style={{ position: "absolute", inset: 0, background: ROOM_HI,
            opacity: (1 - k / 2) * 0.36, zIndex: 40 }} />;
        })}
      </Panel>
      <SoloCaption words={["The", "guy", "who", "built"]} hot={1} />
    </AbsoluteFill>
  );
};
