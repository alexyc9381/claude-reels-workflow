import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { inter } from "./fonts";
import { Bg, Panel, ProgressBar, HookHeader, Caption, AssemblyCtx, hexA } from "./SlopKit";
import {
  ControlRoom, Launch, Nebula, GasGiant, RingWorld, Stars, Moons, Cluster,
  Astro, Patch, Craft, Dish, Gauge, Flap, BarMeter, Pulse, Sweep, Trace,
  ROOM_HI, PANEL_B, PANEL_L, STEEL_D,
  RED, RED_D, AMBER, GO, GO_L,
  FLOOR, E, osc, rnd, OUT, IO, IN_Q, SH_D,
} from "./MissionWorld";
import {
  Surface, horizonOf, SkyWorld, Aurora, Flagpole, Rover, Hab, Tally, Kick, PW, PH,
} from "./MissionSurfaces";
import { SheetStack, Rulebook, Rails, StepChain, StageScreen } from "./MissionProps";

const SoloCaption: React.FC<{ words: string[]; hot?: number }> = (p) =>
  React.useContext(AssemblyCtx) ? null : <Caption {...p} />;

/* =========================================================================
   REEL 82 · TRIAL-REEL HOOKS B AND C.

   ⛔ Instagram flags near-duplicates, so a trial variant that only swaps its
   music is wasted (memory `feedback_trial_reel_variants`). The HOOK carries the
   difference. Each one changes the cold-open world, the world order, the cut
   rhythm and the hero graphic per shot; the assembly then gives the shared body
   a per-variant camera offset. The luma delta is MEASURED after render.

   ⛔ BOTH WERE RE-CUT. They shipped at 9 and 11 shots (0.30 - 0.60s each) and
   came back as "flipping way too fast... we dont need so many flips". Six shots
   each now, every shot at or above the 0.7s floor
   (memory `feedback_shot_count_is_a_floor`).

   A opens on mission control (pale grey-blue).
   B opens on the BREAK, a step giving way (violet).
   C opens on the BURN, full thrust (amber).
   ========================================================================= */

/** a shot: mounts only inside its window, with a slow push-in under it */
const Shot: React.FC<{ f: number; a: number; b: number; k?: number; children: React.ReactNode }> =
  ({ f, a, b, k = 0, children }) => {
  if (f < a || f >= b) return null;
  const t = Math.min(1, (f - a) / 20), e = t * t * (3 - 2 * t);
  const z = [1.10 - e * 0.09, 1.02 + e * 0.07, 1.07 - e * 0.06, 1.03 + e * 0.06][k % 4];
  const dx = [(1 - e) * 24, -(1 - e) * 28, (1 - e) * 16, -(1 - e) * 20][k % 4];
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden",
      transform: `scale(${z}) translateX(${dx}px)`, transformOrigin: "50% 58%" }}>{children}</div>
  );
};

const Chip: React.FC<{ y: number; text: string; c?: string; size?: number }> =
  ({ y, text, c = RED, size = 38 }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top: y, display: "flex", justifyContent: "center", zIndex: 26 }}>
    <div style={{ padding: "9px 24px", borderRadius: 8, background: c, boxShadow: SH_D,
      fontFamily: inter.fontFamily, fontWeight: 900, fontSize: size, letterSpacing: "-0.01em",
      color: "#FFF6F2", whiteSpace: "nowrap" }}>{text}</div>
  </div>
);

const Flash: React.FC<{ f: number; cuts: number[] }> = ({ f, cuts }) => (<>
  {cuts.map((cf) => {
    const k = f - cf;
    if (k < 0 || k > 2) return null;
    return <div key={cf} style={{ position: "absolute", inset: 0, background: ROOM_HI,
      opacity: (1 - k / 2) * 0.36, zIndex: 40 }} />;
  })}
</>);

/* ======================= VARIANT B · OPEN ON THE BREAK ==================== */
/* 0.80 · 0.93 · 1.00 · 0.87 · 0.87 · 0.77 s */
export const HOOK_CUTS_B = [24, 52, 82, 108, 134];

export const MissionHookB: React.FC = () => {
  const f = useCurrentFrame();
  const [B1, B2, B3, B4, B5] = HOOK_CUTS_B;
  const HS = horizonOf("shatter"), HI = horizonOf("ice"), HN = horizonOf("night");

  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <HookHeader f={f + 12} big="CLAUDE CODE'S CREATOR:" hot="3 THINGS 99% GET WRONG" />
      <Panel glow={hexA(RED, 0.26)}>

        {/* 1 · THE BREAK. Cold open on step 4 letting go. */}
        <Shot f={f} a={0} b={B1} k={0}>
          <Surface f={f} kind="shatter" />
          <div style={{ position: "absolute", left: 96, top: 96, width: 820, height: 300, borderRadius: 16,
            background: "#B7ABD6", zIndex: 6 }} />
          <div style={{ position: "absolute", left: 726, top: 62, width: 190, height: 190, borderRadius: "50%",
            background: "#EFE6FA", zIndex: 5 }} />
          <StepChain f={f + 4} x={104} y={HS - 344} n={5} breakAt={3} at={0} every={3.2} s={1.42} z={16} />
          <Pulse f={f} at={16} x={560} y={HS - 150} r={280} c={RED} life={16} z={18} />
          <Astro f={f} x={36} y={HS + 206 - 300 * 0.94} size={300} gaze={2} pack shock={0.6}
                 nodAmp={3} nodSpeed={9} z={17} />
          <Chip y={120} text="IT BREAKS HERE" c={RED_D} />
        </Shot>

        {/* 2 · THE STAGE. Who is telling you this. */}
        <Shot f={f} a={B1} b={B2} k={2}>
          <ControlRoom f={f} />
          <div style={{ position: "absolute", inset: 0, background: "#22303E", opacity: 0.55 }} />
          <StageScreen f={f} x={188} y={152} w={636} h={358} from={102} z={22} />
          <Astro f={f} x={-58} y={FLOOR - 214 * 0.94} size={214} gaze={2} nodAmp={2.4} nodSpeed={11} z={18} />
          <Astro f={f + 9} x={866} y={FLOOR - 206 * 0.94} size={206} gaze={-2} nodAmp={2.2} nodSpeed={12}
                 z={18} suitC="#E2E6EA" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={`l${i}`} style={{ position: "absolute", left: 300 + i * 74, top: 740, width: 46, height: 14,
              borderRadius: 4, background: i % 2 ? GO : STEEL_D, zIndex: 19 }} />
          ))}
        </Shot>

        {/* 3 · AN ICE PLAIN. The prompt, thrown out. */}
        <Shot f={f} a={B2} b={B3} k={1}>
          <Surface f={f} kind="ice" pan={(f - B2) * 4} />
          <div style={{ position: "absolute", left: 464, top: HI - 304, width: 230, height: 378,
            border: "6px dashed #8FB2C8", borderRadius: 8, zIndex: 9 }} />
          <SheetStack f={f - B2} x={470} y={HI - 300} cols={3} rows={5} cw={78} ch={76}
                      gone={0.8} at={2} every={1.5} z={12} />
          <Astro f={f} x={96} y={HI + 110 - 274 * 0.94} size={274} step={11} pack gaze={-1}
                 nodAmp={3.2} nodSpeed={9} z={15} />
          <Kick f={f} x={132} y={HI + 106} c="rgba(255,255,255,0.6)" />
          <Flagpole f={f} x={858} y={HI - 108} h={152} z={13} />
          <BarMeter f={f} x={286} y={78} w={440} h={42} v={0.8} at={B2 + 4} n={10} c={RED} z={20} />
          <Chip y={140} text="HE DELETED 80%" c={RED} />
        </Shot>

        {/* 4 · A RINGED WORLD. */}
        <Shot f={f} a={B3} b={B4} k={3}>
          <div style={{ position: "absolute", inset: 0, background: "#0B1030" }} />
          <Stars n={90} seed={17} />
          <RingWorld f={f} cx={506} cy={330} r={196} />
          <Moons f={f} />
          <Dish f={f} x={110} y={196} s={0.66} z={13} />
          {Array.from({ length: 20 }, (_, i) => {
            const d = rnd(i, 81), w = 12 + d * 52;
            return <div key={`as${i}`} style={{ position: "absolute",
              left: ((i * 71 + (f - B3) * (3 + d * 4)) % (PW + 140)) - 70,
              top: 520 + rnd(i, 83) * 250, width: w, height: w * 0.56, borderRadius: w * 0.34,
              zIndex: 14, background: i % 3 ? "#4A527A" : "#68729C", transform: `rotate(${d * 120}deg)` }} />;
          })}
          <Craft f={f} x={1030 - E(f, B3, B4, 0, 940, IO)} y={476 - osc(f, 22, 24)} s={0.9} flame={0.6} z={16} />
          <Chip y={640} text="TWO WEEKS STRAIGHT" c="#B18B58" size={35} />
        </Shot>

        {/* 5 · A NIGHT CAMP. */}
        <Shot f={f} a={B4} b={B5} k={2}>
          <Surface f={f} kind="night" />
          <Aurora f={f} z={3} />
          <SkyWorld cx={190} cy={148} r={78} c="#4C6E9E" c2="#3A5680" z={4} />
          <div style={{ position: "absolute", left: 566, top: HN - 168, width: 366, height: 150,
            background: "#20364E", borderRadius: 12, zIndex: 11,
            clipPath: "polygon(4% 12%, 96% 0, 100% 92%, 0 100%)" }} />
          <Tally f={f - B4} x={604} y={HN - 132} n={14} at={0} every={1.5} c="#F2E4C6" z={16} />
          <Hab f={f} x={58} y={HN - 96} s={0.86} z={12} />
          <Craft f={f} x={E(f, B4, B5, -120, 880, IO)} y={184} s={0.7} flame={0.6} z={9} />
          <Chip y={122} text="NOBODY WATCHING" c={GO} size={35} />
        </Shot>

        {/* 6 · MISSION CONTROL. */}
        <Shot f={f} a={B5} b={9999} k={0}>
          <ControlRoom f={f} />
          <div style={{ position: "absolute", left: 40, top: 92, width: 932, height: 300, borderRadius: 12,
            background: PANEL_B, border: `10px solid ${PANEL_L}`, boxShadow: SH_D, zIndex: 8 }} />
          <Sweep f={f} x={94} y={116} d={250} c={GO_L} z={12} />
          <Trace f={f} x={392} y={138} w={292} h={96} c={GO_L} z={12} />
          <Trace f={f} x={392} y={246} w={292} h={96} c="#B4D0E0" z={12} />
          <Gauge f={f} x={736} y={126} d={192} v={0.98} at={B5 + 2} danger={1.1} c={GO} z={12} />
          <BarMeter f={f} x={94} y={392} w={836} h={42} v={1} at={B5 + 4} n={20} c={GO} z={14} />
          <Astro f={f} x={40} y={FLOOR - 250 * 0.94} size={250} gaze={2} cheer={0.7} nodAmp={2.6} nodSpeed={10} z={14} />
          <Astro f={f + 37} x={764} y={FLOOR - 240 * 0.94} size={240} gaze={-2} cheer={0.65} nodAmp={2.4} nodSpeed={11} z={14} suitC="#E2E6EA" />
          <Patch x={474} y={FLOOR - 128} d={76} c={RED} z={16} />
        </Shot>

        <Flash f={f} cuts={HOOK_CUTS_B} />
      </Panel>
      <SoloCaption words={["The", "guy", "who", "built"]} hot={1} />
    </AbsoluteFill>
  );
};

/* ====================== VARIANT C · OPEN ON THE BURN ====================== */
/* 0.70 · 0.90 · 0.93 · 0.93 · 0.87 · 0.90 s */
export const HOOK_CUTS_C = [21, 48, 76, 104, 130];

export const MissionHookC: React.FC = () => {
  const f = useCurrentFrame();
  const [K1, K2, K3, K4, K5] = HOOK_CUTS_C;
  const HV = horizonOf("volcanic"), HD = horizonOf("dune");

  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <HookHeader f={f + 12} big="CLAUDE CODE'S CREATOR:" hot="3 THINGS 99% GET WRONG" />
      <Panel glow={hexA(AMBER, 0.3)}>

        {/* 1 · FULL BURN. Brightest possible frame 0. */}
        <Shot f={f} a={0} b={K1} k={1}>
          <Launch f={f} lift={E(f, 0, K1, 0, 1, IN_Q)} />
          <div style={{ position: "absolute", left: 0, right: 0, top: 402, height: 120,
            background: "#FFE7C2", zIndex: 11 }} />
          <Craft f={f} x={410} y={250 - E(f, 0, K1, 0, 210, IN_Q)} s={1.75} flame={1} z={12} />
          {Array.from({ length: 16 }, (_, i) => (
            <div key={i} style={{ position: "absolute", left: -20 + i * 74 + osc(f, 7 + i, 18, i),
              top: 452 + rnd(i, 3) * 250, width: 132 + rnd(i, 5) * 150, height: 76,
              borderRadius: 38, background: i % 3 ? "#FBDDB2" : "#EFC38C", zIndex: 13 }} />
          ))}
          <Chip y={116} text="ONE INSTRUCTION" c={AMBER} />
        </Shot>

        {/* 2 · THE STAGE. */}
        <Shot f={f} a={K1} b={K2} k={0}>
          <ControlRoom f={f} />
          <div style={{ position: "absolute", inset: 0, background: "#22303E", opacity: 0.55 }} />
          <StageScreen f={f} x={188} y={152} w={636} h={358} from={148} z={22} />
          <Astro f={f} x={-58} y={FLOOR - 214 * 0.94} size={214} gaze={2} nodAmp={2.4} nodSpeed={11} z={18} />
          <Astro f={f + 9} x={866} y={FLOOR - 206 * 0.94} size={206} gaze={-2} nodAmp={2.2} nodSpeed={12}
                 z={18} suitC="#E2E6EA" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={`l${i}`} style={{ position: "absolute", left: 300 + i * 74, top: 740, width: 46, height: 14,
              borderRadius: 4, background: i % 2 ? GO : STEEL_D, zIndex: 19 }} />
          ))}
        </Shot>

        {/* 3 · DUNES. The old model, still on rails. */}
        <Shot f={f} a={K2} b={K3} k={2}>
          <Surface f={f} kind="dune" pan={(f - K2) * 3} />
          <Rails x={286} y={HD - 288} w={528} h={300} z={12} />
          <Astro f={(f - K2) * 0.5} x={390} y={HD + 26 - 322 * 0.94} size={322} old rot={osc(f, 7, 2.6)}
                 gaze={-1} stern={0.4} nodAmp={2.2} nodSpeed={7} z={14} suitC="#B7ABA2" />
          <Rulebook x={266} y={HD - 210} s={1.05} rot={-9 + osc(f, 9, 3)} z={15} />
          {Array.from({ length: 7 }, (_, i) => {
            const t = (((f - K2) * 0.045 + i * 0.14) % 1);
            return <div key={`sd${i}`} style={{ position: "absolute", left: 300 + i * 74,
              top: HD - 250 + t * 300, width: 9, height: 22 + t * 26, borderRadius: 5,
              background: "#D9A468", opacity: (1 - t) * 0.8, zIndex: 17 }} />;
          })}
          <Chip y={122} text="BUILT FOR THE OLD ONE" c="#8A5A2E" size={34} />
        </Shot>

        {/* 4 · A NEBULA. The 3. */}
        <Shot f={f} a={K3} b={K4} k={3}>
          <Nebula f={f} />
          <Stars n={70} seed={31} />
          <Cluster f={f} x={676} y={196} />
          <Moons f={f} />
          {[0, 1].map((i) => (
            <Flap key={i} f={f} at={K3 + 1 + i * 5} text={String(i + 1)} x={70 + i * 112} y={308} w={94} h={122}
                  c="#8E86C4" bg="#2A2456" z={13} />
          ))}
          <Flap f={f} at={K3 + 12} text="3" x={340} y={140} w={360} h={412} c="#FFF1EE" bg={RED_D} z={14} />
          <Pulse f={f} at={K3 + 18} x={520} y={346} r={430} c="#B79BF0" life={20} z={12} />
          <Chip y={614} text="AND THE THIRD ONE" c="#6E56AE" size={34} />
        </Shot>

        {/* 5 · A VOLCANIC RIDGE. It crosses on its own. */}
        <Shot f={f} a={K4} b={K5} k={2}>
          <Surface f={f} kind="volcanic" />
          <div style={{ position: "absolute", left: 340, top: HV + 26, width: 330, height: PH - HV,
            background: "#1C1518", zIndex: 8 }} />
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ position: "absolute", left: 356 + i * 106, top: HV + 40 + i * 22,
              width: 86, height: 16, borderRadius: 8, background: i === 1 ? "#E0703A" : "#C4562C", zIndex: 9 }} />
          ))}
          <div style={{ position: "absolute", left: 340, top: HV + 12, width: 330, height: 20,
            background: "#C3CCD4", zIndex: 12, boxShadow: SH_D }} />
          <Rover f={f} x={-200 + E(f, K4, K5, 0, 920, IO)} y={HV - 118} s={1.14} roll={f * 0.32} z={14} />
          <Gauge f={f} x={716} y={110} d={196} v={0.94} at={K4 + 3} danger={1.1} c={GO} z={18} />
          <Chip y={128} text="IT CHECKS ITSELF" c={RED} />
        </Shot>

        {/* 6 · MISSION CONTROL. */}
        <Shot f={f} a={K5} b={9999} k={0}>
          <ControlRoom f={f} />
          <div style={{ position: "absolute", left: 40, top: 92, width: 932, height: 300, borderRadius: 12,
            background: PANEL_B, border: `10px solid ${PANEL_L}`, boxShadow: SH_D, zIndex: 8 }} />
          <Sweep f={f} x={94} y={116} d={250} c={GO_L} z={12} />
          <Trace f={f} x={392} y={138} w={292} h={96} c={GO_L} z={12} />
          <Gauge f={f} x={736} y={126} d={192} v={0.98} at={K5 + 2} danger={1.1} c={GO} z={12} />
          <BarMeter f={f} x={94} y={392} w={836} h={42} v={1} at={K5 + 4} n={20} c={GO} z={14} />
          <Astro f={f} x={40} y={FLOOR - 250 * 0.94} size={250} gaze={2} cheer={0.7} nodAmp={2.6} nodSpeed={10} z={14} />
          <Astro f={f + 37} x={764} y={FLOOR - 240 * 0.94} size={240} gaze={-2} cheer={0.65} nodAmp={2.4} nodSpeed={11} z={14} suitC="#E2E6EA" />
          <Patch x={474} y={FLOOR - 128} d={76} c={RED} z={16} />
        </Shot>

        <Flash f={f} cuts={HOOK_CUTS_C} />
      </Panel>
      <SoloCaption words={["The", "guy", "who", "built"]} hot={1} />
    </AbsoluteFill>
  );
};
