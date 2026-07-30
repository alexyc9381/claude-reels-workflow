import React from "react";
import { AbsoluteFill, useCurrentFrame, OffthreadVideo, staticFile } from "remotion";
import { inter, fraunces } from "./fonts";
import { Bg, Panel, ProgressBar, HookHeader, Caption, AssemblyCtx, INK, hexA } from "./SlopKit";
import {
  ControlRoom, Launch, Nebula, GasGiant, RingWorld, RustSurface, Stars, Moons, Cluster, SurfaceKit,
  Astro, Patch, Craft, Gauge, Flap, BarMeter, Pulse, Sweep, Trace,
  ROOM_HI, PANEL_B, PANEL_L, PANEL_D, STEEL, STEEL_L, STEEL_D,
  CARD, CARD3, RED, RED_D, AMBER, GO, GO_L, CLAY, STARC,
  FLOOR, E, osc, rnd, OUT, IO, IN_Q, BACK, SH, SH_D,
} from "./MissionWorld";

const SoloCaption: React.FC<{ words: string[]; hot?: number }> = (p) =>
  React.useContext(AssemblyCtx) ? null : <Caption {...p} />;

/* =========================================================================
   REEL 82 "BORIS" · HOOK — SIX SHOTS, SIX WORLDS.

   ⛔ The previous version put all six shots in ONE control room and only
   changed what was on the screen. That is the "one set redressed" failure from
   reel 81 (memory `feedback_reel_vary_the_locations`) and it read as people
   standing still. Every shot is now a DIFFERENT PLACE with its own palette, so
   each cut is a real visual change:

     A  f0-20    MISSION CONTROL   pale grey-blue · 3 needles slam to red
     B  f20-44   THE LAUNCH        amber + smoke   · it leaves the pad
     C  f44-72   A NEBULA          violet          · the 3 flips, vast and alone
     D  f72-106  A GAS GIANT       teal bands      · T+14 DAYS across the limb
     E  f106-140 A RUST WORLD      orange dust     · landed, running, no crew
     F  f100-136 A RINGED WORLD    gold rings      · the craft crossing them
     G  f136+    MISSION CONTROL   pale again      · they are only watching

   Information stays GRAPHICAL — needles, split-flaps, bars, a radar sweep.
   One dominant object per shot; nothing overlaps anything.
   ========================================================================= */

/* Cuts ramp: 0.40 · 0.87 · 1.47 · 2.27 · 3.33 · 4.53s. The first two shots are
   deliberately under the usual 0.7s floor — a hard staccato open IS the interrupt,
   and the shots lengthen from there so it settles instead of churning. */
export const HOOK_CUTS = [12, 26, 44, 68, 100, 136];
export const HAS_CLIP = false;
export const CLIP_SRC = "boris_clip.mp4";

/** one chip of type, parked in a band nothing else occupies */
const Chip: React.FC<{ y: number; text: string; c?: string; size?: number }> =
  ({ y, text, c = RED, size = 38 }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top: y, display: "flex", justifyContent: "center", zIndex: 26 }}>
    <div style={{ padding: "10px 26px", borderRadius: 8, background: c, boxShadow: SH_D,
      fontFamily: inter.fontFamily, fontWeight: 900, fontSize: size, letterSpacing: "-0.01em",
      color: "#FFF6F2", whiteSpace: "nowrap" }}>{text}</div>
  </div>
);

export const MissionHook: React.FC = () => {
  const f = useCurrentFrame();
  const [CA, CB, CC, CD, CE, CF] = HOOK_CUTS;

  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <HookHeader f={f + 12} big="CLAUDE CODE'S CREATOR" hot="3 THINGS 99% GET WRONG" />
      <Panel glow={hexA(CLAY, 0.28)}>

        {/* ---- A · MISSION CONTROL. Three needles slam into the red. ---- */}
        {f < CA && (
          <div style={{ position: "absolute", inset: 0 }}>
            <ControlRoom f={f} />
            <div style={{ position: "absolute", left: 40, top: 92, width: 932, height: 300, borderRadius: 12,
              background: PANEL_B, border: `10px solid ${PANEL_L}`, boxShadow: SH_D, zIndex: 8 }} />
            {[0, 1, 2].map((i) => (
              <Gauge key={i} f={f} x={96 + i * 296} y={124} d={214} v={0.94} at={1 + i * 5} danger={0.62} c={GO} z={12} />
            ))}
            {[0, 1, 2].map((i) => (
              <Pulse key={`p${i}`} f={f} at={12 + i * 5} x={203 + i * 296} y={231} r={182} c={RED} life={15} z={13} />
            ))}
            <Chip y={424} text="ALL THREE IN THE RED" c={RED} />
            <Astro f={f} x={40} y={FLOOR - 250 * 0.94} size={250} gaze={2} shock={0.45} nodAmp={1} nodSpeed={24} z={14} />
            <Astro f={f + 37} x={764} y={FLOOR - 240 * 0.94} size={240} gaze={-2} shock={0.4} nodAmp={1} nodSpeed={26} z={14} suitC="#E2E6EA" />
          </div>
        )}

        {/* ---- B · THE LAUNCH. Amber, loud, the ground falling away. ---- */}
        {f >= CA && f < CB && (
          <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
            <Launch f={f} lift={E(f, CA, CB, 0, 1, IN_Q)} />
            <Craft f={f} x={434} y={286 - E(f, CA, CB, 0, 210, IN_Q)} s={1.5} flame={1} z={10} />
            <Chip y={472} text="ONE INSTRUCTION" c={AMBER} />
          </div>
        )}

        {/* ---- C · A NEBULA. The 3, vast and alone. ---- */}
        {f >= CB && f < CC && (
          <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
            <Nebula f={f} />
            <Cluster f={f} x={676} y={196} />
            {[0, 1].map((i) => (
              <Flap key={i} f={f} at={CB} text={String(i + 1)} x={70 + i * 112} y={308} w={94} h={122}
                    c="#8E86C4" bg="#2A2456" z={13} />
            ))}
            <Flap f={f} at={CB + 2} text="3" x={340} y={140} w={360} h={412} c="#FFF1EE" bg={RED_D} z={14} />
            <Pulse f={f} at={CB + 6} x={520} y={346} r={430} c="#B79BF0" life={22} z={12} />
            <Pulse f={f} at={CB + 14} x={520} y={346} r={430} c="#B79BF0" life={22} z={12} />
            <Chip y={594} text="AND THE THIRD ONE" c="#6E56AE" size={34} />
          </div>
        )}

        {/* ---- D · A GAS GIANT. T+14 DAYS across the limb. ---- */}
        {f >= CC && f < CD && (
          <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "#0E1428" }} />
            <Stars n={80} seed={3} />
            <GasGiant f={f} cx={506} cy={620} r={470} hue="teal" />
            <Moons f={f} />
            {["T", "+", "1", "4"].map((ch, i) => (
              <Flap key={i} f={f} at={CC + 2 + i * 4} text={ch} x={110 + i * 128} y={118} w={108} h={146}
                    c="#EAF6F7" bg="#12344A" z={16} />
            ))}
            <div style={{ position: "absolute", left: 646, top: 142, fontFamily: inter.fontFamily, fontWeight: 900,
              fontSize: 58, lineHeight: 1, letterSpacing: "-0.02em", color: "#EAF6F7", zIndex: 16 }}>DAYS</div>
            <Craft f={f} x={704} y={352} s={0.8} flame={0.35} z={15} />
            <BarMeter f={f} x={110} y={286} w={470} h={38} v={1} at={CC + 14} n={14} c={GO_L} z={16} />
          </div>
        )}

        {/* ---- E · A RUST WORLD. Landed, running, nobody there. ---- */}
        {f >= CD && f < CE && (
          <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
            <RustSurface f={f} horizon={430} />
            <SurfaceKit f={f} horizon={430} />
            <Craft f={f} x={128} y={276} s={1.05} flame={0} z={12} />
            <Gauge f={f} x={598} y={168} d={188} v={0.98} at={CD + 2} danger={1.1} c={GO} label="RUN" z={16} />
            <Gauge f={f} x={806} y={196} d={150} v={0} at={CD + 6} danger={1.1} c={GO} label="CREW" z={16} />
            <Chip y={520} text="STILL RUNNING" c="#8A4F3A" />
          </div>
        )}

        {/* ---- F · A RINGED WORLD. Fresh palette, the craft crossing the rings. ---- */}
        {f >= CE && f < CF && (
          <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "#0B1030" }} />
            <Stars n={90} seed={11} />
            <RingWorld f={f} cx={506} cy={330} r={196} />
            <Craft f={f} x={702} y={452} s={0.72} flame={0.3} z={16} />
            <Chip y={604} text="TWO WEEKS STRAIGHT" c="#B18B58" size={35} />
          </div>
        )}

        {/* ---- G · MISSION CONTROL again. They are only watching. ---- */}
        {f >= CF && (
          <div style={{ position: "absolute", inset: 0 }}>
            <ControlRoom f={f} />
            <div style={{ position: "absolute", left: 40, top: 92, width: 932, height: 300, borderRadius: 12,
              background: PANEL_B, border: `10px solid ${PANEL_L}`, boxShadow: SH_D, zIndex: 8 }} />
            <Sweep f={f} x={94} y={116} d={250} c={GO_L} z={12} />
            <Trace f={f} x={392} y={138} w={292} h={96} c={GO_L} z={12} />
            <Trace f={f} x={392} y={246} w={292} h={96} c="#B4D0E0" z={12} />
            <Gauge f={f} x={736} y={126} d={192} v={0.98} at={CF + 2} danger={1.1} c={GO} z={12} />
            <BarMeter f={f} x={94} y={392} w={836} h={42} v={1} at={CF + 4} n={20} c={GO} z={14} />
            <Astro f={f} x={40} y={FLOOR - 250 * 0.94} size={250} gaze={2} cheer={0.7} nodAmp={2.6} nodSpeed={10} z={14} />
            <Astro f={f + 37} x={764} y={FLOOR - 240 * 0.94} size={240} gaze={-2} cheer={0.65} nodAmp={2.4} nodSpeed={11} z={14} suitC="#E2E6EA" />
            <Patch x={474} y={FLOOR - 128} d={76} c={RED} z={16} />
          </div>
        )}

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
