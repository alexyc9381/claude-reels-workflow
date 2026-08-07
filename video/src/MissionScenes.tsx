import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { inter, fraunces } from "./fonts";
import { Bg, Panel, ProgressBar, INK, hexA } from "./SlopKit";
import {
  Astro, Patch, Craft, Dish, Gauge, Flap, BarMeter, Pulse, Tag,
  CARD, RED, RED_D, AMBER, AMBER_D, GO, GO_L, TEAL,
  DAWN, CLAY, STARC,
  cam, E, osc, rnd, OUT, IO, IN_Q, BACK, SH, SH_D,
} from "./MissionWorld";
import {
  Surface, horizonOf, SkyWorld, Aurora, Prints, Flagpole, Rover, Crates, Drill,
  SampleBench, Mast, Lander, Hab, Tally, Arc, Chip, Kick, PW, PH,
} from "./MissionSurfaces";

/* =========================================================================
   REEL 82 "BORIS" · SCENES M1..M9 — NINE WORLDS, ALL OUTSIDE.

   ⛔ The first cut of these scenes put SEVEN of the nine inside a bay, and
   three of those were a figure beside a wall screen with a wave on it. Alex:
   "they look like theyre on the ship... most of the scenes are just them with a
   screen with waves on the wall which is so boring... i want to also see them
   walking on the planets."

   Every scene below is an EXTERIOR on its own world, with its own palette and
   its own light, and in every one the crew is DOING something physical —
   walking, hauling, drilling, shimming, watching a thing fail. Object budget is
   12-18 per scene; `Surface` contributes 6-9 before any prop lands.

   Information stays GRAPHICAL. ONE text chip per scene, in a band nothing else
   occupies. The header states the CLAIM in the product's nouns.
   ========================================================================= */

/** feet-on-ground helper: the Mascot's boots reach size*0.94, so this plants them. */
const stand = (groundY: number, size: number) => groundY - size * 0.94;

/* ====== M1 · ICE PLAIN, TWO SUNS — 80% of it gets jettisoned (5.24) ======= */
export const M1Deleted: React.FC = () => {
  const f = useCurrentFrame();
  const H = horizonOf("ice");
  const walk = E(f, 0, 108, 0, 150, IO);            // the crew walks away from the pile
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <Tag f={f} logo word="HE DELETED 80% OF IT" c={RED} />
      <Panel glow={hexA(CLAY, 0.24)}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden",
          transform: cam(f, 108, 1), transformOrigin: "50% 62%" }}>
          <Surface f={f} kind="ice" pan={walk * 0.5} />

          {/* the dominant object: a tower of supply crates, most of it lifting away */}
          <div style={{ position: "absolute", left: 552 - walk * 0.5, top: H - 304, width: 230, height: 378,
            border: "6px dashed #8FB2C8", borderRadius: 8, zIndex: 9 }} />
          <Crates f={f} x={556 - walk * 0.5} y={H - 300} cols={3} rows={5} cw={74} gone={0.8} c="#C0663E" />
          <div style={{ position: "absolute", left: 548 - walk * 0.5, top: H + 4, width: 246, height: 22,
            borderRadius: 10, background: "#9FBACB", zIndex: 10 }} />

          {/* what is left after the cut: one small case on a sled, being towed */}
          <div style={{ position: "absolute", left: 214 - walk, top: H + 62, width: 176, height: 54, zIndex: 13,
            filter: "drop-shadow(0 6px 6px rgba(26,30,40,0.32))" }}>
            <div style={{ position: "absolute", left: 0, top: 20, width: 176, height: 20, borderRadius: 8, background: "#8E9AA6" }} />
            <div style={{ position: "absolute", left: 34, top: 0, width: 88, height: 30, borderRadius: 5, background: "#C0663E" }} />
            <div style={{ position: "absolute", left: 0, top: 40, width: 176, height: 8, borderRadius: 4, background: "#6E7B88" }} />
          </div>
          <svg viewBox={`0 0 ${PW} ${PH}`} width={PW} height={PH}
            style={{ position: "absolute", inset: 0, zIndex: 12, overflow: "visible" }}>
            <path d={`M${300 - walk} ${H + 74} L${372 - walk} ${H + 40}`} stroke="#8E9AA6" strokeWidth={5} />
          </svg>

          {/* the crew, WALKING away with what is left */}
          <Astro f={f} x={330 - walk} y={stand(H + 96, 244)} size={244} step={7} pack gaze={-1}
                 nodAmp={1.6} nodSpeed={16} z={14} />
          <Astro f={f + 21} x={104 - walk} y={stand(H + 172, 268)} size={268} step={7} pack gaze={-1}
                 nodAmp={1.5} nodSpeed={18} z={16} suitC="#E2E6EA" />
          <Kick f={f} x={368 - walk} y={H + 92} c="rgba(255,255,255,0.6)" />
          <Prints x={470 - walk} y={H + 106} n={8} step={48} c="rgba(90,116,136,0.34)" flip />

          {/* ice detail so the plain is not empty */}
          <div style={{ position: "absolute", left: 40, top: H + 138, width: 420, height: 7,
            background: "#AFC9D6", transform: "rotate(-2deg)", zIndex: 6 }} />
          <div style={{ position: "absolute", left: 596, top: H + 178, width: 360, height: 7,
            background: "#AFC9D6", transform: "rotate(3deg)", zIndex: 6 }} />
          <Flagpole f={f} x={880 - walk * 0.5} y={H - 108} h={152} z={11} />
          <BarMeter f={f} x={286} y={86} w={440} h={42} v={0.8} at={10} n={10} c={RED} z={20} />
          <Chip y={144} text="80% GONE" c={RED} />
        </div>
      </Panel>
    </AbsoluteFill>
  );
};

/* ====== M2 · DUST DUNES — the old model, half buried (8.86) =============== */
export const M2Babysit: React.FC = () => {
  const f = useCurrentFrame();
  const H = horizonOf("dune");
  const walk = E(f, 0, 136, 0, 126, IO);
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <Tag f={f} logo word="WRITTEN FOR AN OLDER MODEL" c={AMBER_D} />
      <Panel glow={hexA(AMBER, 0.22)}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden",
          transform: cam(f, 136, 2), transformOrigin: "50% 60%" }}>
          <Surface f={f} kind="dune" pan={walk * 0.6} />

          {/* the dominant object: a derelict rover sunk in the dune, with its trainer rails */}
          <Rover f={f} x={496 - walk * 0.6} y={H - 118} s={1.22} bury={0.14} old z={13} />
          {[0, 1].map((i) => (
            <div key={i} style={{ position: "absolute", left: 486 - walk * 0.6 + i * 268, top: H - 118,
              width: 22, height: 150, borderRadius: 8, background: "#8A6A48", zIndex: 12 }} />
          ))}
          <div style={{ position: "absolute", left: 486 - walk * 0.6, top: H - 128, width: 290, height: 18,
            borderRadius: 8, background: "#8A6A48", zIndex: 12 }} />
          {/* the dune that has half-swallowed it */}
          <div style={{ position: "absolute", left: 430 - walk * 0.6, top: H + 46, width: 480, height: 116,
            borderRadius: "50% 50% 0 0 / 100% 100% 0 0", background: "#C08048", zIndex: 14 }} />
          <div style={{ position: "absolute", left: 386 - walk * 0.6, top: H - 84, width: 560, height: 150,
            borderRadius: "50% 50% 0 0 / 100% 100% 0 0", background: "#B0743F", zIndex: 9 }} />

          {/* the crew walking PAST it, toward the new craft */}
          <Astro f={f} x={168 - walk * 0.2} y={stand(H + 112, 250)} size={250} step={7} pack gaze={2}
                 nodAmp={1.6} nodSpeed={15} z={16} />
          <Kick f={f} x={210 - walk * 0.2} y={H + 108} c="rgba(226,178,124,0.62)" />
          <Prints x={112 - walk * 0.2} y={H + 122} n={7} step={46} c="rgba(112,72,40,0.30)" />
          <Craft f={f} x={846 - walk * 0.9} y={H - 232} s={0.78} flame={0} z={13} />
          <Flagpole f={f} x={780 - walk * 0.6} y={H - 86} h={130} c={AMBER_D} z={13} />

          {/* dust devils, so the air is moving */}
          {[0, 1].map((i) => (
            <div key={i} style={{ position: "absolute", left: 300 + i * 430 + osc(f, 30 + i * 8, 26, i),
              top: H - 210, width: 40, height: 220, zIndex: 8,
              clipPath: "polygon(38% 0, 62% 0, 100% 100%, 0 100%)", background: "#D9A468", opacity: 0.62 }} />
          ))}
          <Chip y={H + 196} text="BUILT FOR THE OLD ONE" c={AMBER_D} size={35} />
        </div>
      </Panel>
    </AbsoluteFill>
  );
};

/* ====== M3 · STRATA CANYON — taking an actual sample (13.51) ============== */
export const M3Scientist: React.FC = () => {
  const f = useCurrentFrame();
  const H = horizonOf("canyon");
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <Tag f={f} logo word="BE A SCIENTIST, NOT A PROMPTER" c={GO} />
      <Panel glow={hexA(TEAL, 0.24)}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden",
          transform: cam(f, 110, 1), transformOrigin: "46% 58%" }}>
          <Surface f={f} kind="canyon" />

          {/* the canyon wall, in readable strata — the thing being studied */}
          <div style={{ position: "absolute", left: 604, top: 96, width: 470, height: H - 46, zIndex: 7,
            clipPath: "polygon(16% 0, 100% 0, 100% 100%, 0 100%)" }}>
            {["#B98F5E", "#A8794E", "#C6A472", "#96693F", "#B98F5E", "#8A6541"].map((c, i) => (
              <div key={i} style={{ position: "absolute", left: 0, right: 0, top: i * 62, height: 60, background: c }} />
            ))}
          </div>

          {/* the dominant action: a core being pulled out of the ground */}
          <Drill f={f} x={396} y={H - 196} s={1.02} z={13} />
          <SampleBench f={f} x={92} y={H - 34} s={0.94} n={4} z={13} />
          {/* the crew KNEELING at the sample, not watching a screen */}
          <Astro f={f} x={252} y={stand(H + 96, 232)} size={232} kneel={0.55} pack gaze={2}
                 nodAmp={1.2} nodSpeed={20} stern={0.3} z={15} />
          <Astro f={f + 30} x={560} y={stand(H + 62, 208)} size={208} pack gaze={-2}
                 nodAmp={2} nodSpeed={13} z={14} suitC="#E2E6EA" />

          {/* test sites, flagged one at a time — the experiment, made countable */}
          {[0, 1, 2, 3].map((i) => {
            const on = f >= 12 + i * 11;
            if (!on) return null;
            const t = E(f, 12 + i * 11, 26 + i * 11, 0, 1, BACK);
            return <Flagpole key={i} f={f} x={92 + i * 118} y={H - 44 - t * 46} h={70 * t}
              c={i === 3 ? GO : AMBER} z={12} />;
          })}
          <div style={{ position: "absolute", left: 300, top: H - 22, width: 320, height: 9,
            background: "#7A5A38", zIndex: 11 }} />
          <Chip y={H + 176} text="RUN THE EXPERIMENT" c={GO} />
        </div>
      </Panel>
    </AbsoluteFill>
  );
};

/* ====== M4 · VOLCANIC RIDGE — it tests the bridge itself (17.15) ========== */
export const M4TooHard: React.FC = () => {
  const f = useCurrentFrame();
  const H = horizonOf("volcanic");
  const cross = E(f, 14, 74, 0, 1, IO);
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <Tag f={f} logo word="GIVE IT A WAY TO CHECK ITSELF" c={RED} />
      <Panel glow={hexA(RED, 0.24)}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden",
          transform: cam(f, 104, 2), transformOrigin: "50% 62%" }}>
          <Surface f={f} kind="volcanic" />

          {/* the fissure: the gap the work has to cross */}
          <div style={{ position: "absolute", left: 340, top: H + 26, width: 330, height: PH - H,
            background: "#1C1518", zIndex: 8 }} />
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ position: "absolute", left: 356 + i * 106, top: H + 40 + i * 22,
              width: 86, height: 16, borderRadius: 8, background: i === 1 ? "#E0703A" : "#C4562C", zIndex: 9 }} />
          ))}
          {/* cooling seams in the rock — solid paint, no glow */}
          {[[70, H + 120, 240], [720, H + 96, 260], [640, H + 190, 300]].map(([x, y, w], i) => (
            <div key={i} style={{ position: "absolute", left: x, top: y, width: w, height: 11,
              borderRadius: 6, background: "#B84E2A", zIndex: 7, transform: `rotate(${i * 3 - 3}deg)` }} />
          ))}

          {/* the dominant object: a span the machine lays and load-tests as it goes */}
          <div style={{ position: "absolute", left: 340, top: H + 12, width: 330 * cross, height: 20,
            background: "#C3CCD4", zIndex: 12, boxShadow: SH_D }} />
          {Array.from({ length: 6 }, (_, i) => (
            (i / 6) < cross ? <div key={i} style={{ position: "absolute", left: 352 + i * 54, top: H + 32,
              width: 15, height: 42, background: "#8E9AA6", zIndex: 11 }} /> : null
          ))}
          <Rover f={f} x={296 + cross * 300} y={H - 74} s={0.7} roll={f * 0.04} z={14} />
          {/* it checks its own span before it trusts it */}
          <Gauge f={f} x={734} y={H - 232} d={186} v={0.9} at={22} danger={1.1} c={GO} label="SELF CHECK" z={18} />
          <Pulse f={f} at={40} x={827} y={H - 139} r={150} c={GO_L} life={18} z={17} />

          {/* the crew watching from behind the line, on the near side */}
          <Astro f={f} x={92} y={stand(H + 108, 236)} size={236} gaze={2} pack shock={0.3}
                 nodAmp={1.4} nodSpeed={19} z={16} />
          <div style={{ position: "absolute", left: 40, top: H + 74, width: 280, height: 9,
            background: AMBER, zIndex: 15 }} />
          {[46, 176, 300].map((x, i) => (
            <div key={i} style={{ position: "absolute", left: x, top: H + 74, width: 11, height: 52,
              background: "#8E9AA6", zIndex: 15 }} />
          ))}
          <Chip y={112} text="LET IT PROVE ITSELF" c={RED} />
        </div>
      </Panel>
    </AbsoluteFill>
  );
};

/* ====== M5 · SHATTERED PLAIN — load it until it breaks (20.63) ============ */
export const M5Breaks: React.FC = () => {
  const f = useCurrentFrame();
  const H = horizonOf("shatter");
  const SNAP = 30;
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <Tag f={f} logo word="WATCH WHERE IT ACTUALLY BREAKS" c={RED_D} />
      <Panel glow={hexA(RED, 0.22)}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden",
          transform: cam(f, 60, 3), transformOrigin: "50% 50%" }}>
          <Surface f={f} kind="shatter" />

          {/* the dominant object: a mast loaded until it fails */}
          <Mast f={f} x={430} y={H - 300} h={306} at={SNAP} z={14} />
          {/* the load that does it, winched down a frame at a time */}
          <div style={{ position: "absolute", left: 452, top: H - 340 + E(f, 4, SNAP, 0, 74, IO),
            width: 96, height: 62, borderRadius: 6, background: "#514874", zIndex: 15, boxShadow: SH_D }} />
          <Pulse f={f} at={SNAP} x={496} y={H - 156} r={230} c={RED} life={16} z={18} />

          {/* shards standing out of the plain, so the world reads as broken */}
          {[[120, 86, -12], [820, 104, 14], [252, 62, 8], [700, 74, -8]].map(([x, h, r], i) => (
            <div key={i} style={{ position: "absolute", left: x, top: H - h + 14, width: 52, height: h,
              background: i % 2 ? "#514874" : "#5E5486", zIndex: 9,
              clipPath: "polygon(46% 0, 100% 100%, 0 100%)", transform: `rotate(${r}deg)` }} />
          ))}

          {/* the crew behind the blast line, watching the failure happen */}
          <Astro f={f} x={44} y={stand(H + 214, 302)} size={302} gaze={2} pack kneel={0.35}
                 shock={f >= SNAP ? 0.6 : 0.15} nodAmp={1.2} nodSpeed={21} z={17} />
          <Astro f={f + 24} x={706} y={stand(H + 34, 150)} size={150} gaze={-2} pack
                 shock={f >= SNAP ? 0.5 : 0.1} nodAmp={1.5} nodSpeed={18} z={13} suitC="#E2E6EA" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} style={{ position: "absolute", left: 36 + i * 168, top: H + 96, width: 92, height: 10,
              background: i % 2 ? AMBER : "#3A3358", zIndex: 15 }} />
          ))}
          <Chip y={112} text="FIND THE BREAK" c={RED_D} />
        </div>
      </Panel>
    </AbsoluteFill>
  );
};

/* ====== M6 · METHANE SHORE — shim the leg, don't relabel it (22.62) ======= */
export const M6Setup: React.FC = () => {
  const f = useCurrentFrame();
  const H = horizonOf("shore");
  const shim = E(f, 10, 44, 0, 1, OUT);
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <Tag f={f} logo word="FIX THE SETUP, NOT THE WORDING" c={GO} />
      <Panel glow={hexA(TEAL, 0.24)}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden",
          transform: cam(f, 82, 1), transformOrigin: "50% 58%" }}>
          <Surface f={f} kind="shore" />

          {/* the liquid: a still teal shore behind everything */}
          <div style={{ position: "absolute", left: 0, right: 0, top: H - 76, height: 96,
            background: "#3E9A96", zIndex: 6 }} />
          {[0, 1, 2, 3].map((i) => (
            <div key={i} style={{ position: "absolute", left: 60 + i * 236 + osc(f, 34 + i * 6, 18, i),
              top: H - 54 + i * 17, width: 190, height: 8, borderRadius: 4,
              background: "#78C0B4", zIndex: 7 }} />
          ))}

          {/* the dominant object: a lander that comes LEVEL as the leg is shimmed */}
          <Lander f={f} x={382} y={H - 214} s={1.06} shim={shim} z={13} />
          {/* the crew doing the shimming, crouched at the bad leg */}
          <Astro f={f} x={214} y={stand(H + 156, 240)} size={240} kneel={0.62} pack gaze={2}
                 nodAmp={1.2} nodSpeed={22} z={17} />
          <Astro f={f + 28} x={826} y={stand(H + 30, 148)} size={148} pack gaze={-2} cheer={shim * 0.7}
                 nodAmp={1.8} nodSpeed={14} z={13} suitC="#E2E6EA" />

          {/* the level bubble: the read on whether the SETUP is right */}
          <div style={{ position: "absolute", left: 356, top: 94, width: 300, height: 52, borderRadius: 26,
            background: CARD, border: "7px solid #8E9AA6", zIndex: 20, boxShadow: SH_D }}>
            <div style={{ position: "absolute", left: 12 + (1 - shim) * 190, top: 8, width: 62, height: 30,
              borderRadius: 15, background: shim > 0.85 ? GO : AMBER }} />
            <div style={{ position: "absolute", left: 142, top: 0, bottom: 0, width: 5, background: "#8E9AA6" }} />
          </div>
          <Flagpole f={f} x={70} y={H - 84} h={126} c={GO} z={12} />
          <Chip y={H + 174} text="LEVEL IT" c={GO} />
        </div>
      </Panel>
    </AbsoluteFill>
  );
};

/* ====== M7 · A CRATERED MOON — the hop vs the real trip (25.36) =========== */
export const M7TooSmall: React.FC = () => {
  const f = useCurrentFrame();
  const H = horizonOf("moon");
  const hop = Math.max(0, Math.sin(((f - 6) / 22) * Math.PI)) * (f >= 6 && f < 28 ? 1 : 0);
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <Tag f={f} logo word="YOUR TASKS ARE FAR TOO SMALL" c={AMBER_D} />
      <Panel glow={hexA(AMBER, 0.22)}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden",
          transform: cam(f, 66, 2), transformOrigin: "50% 60%" }}>
          <Surface f={f} kind="moon" />
          {/* the huge ringed world overhead — the trip that was actually available */}
          <SkyWorld cx={716} cy={186} r={132} c="#C98A4E" c2="#A96E3E" ring="#E0BE8A" z={4} />

          {/* craters, so the ground reads as a moon and not a floor */}
          {[[86, 118], [640, 86], [300, 150]].map(([x, w], i) => (
            <div key={i} style={{ position: "absolute", left: x, top: H + 54 + i * 62, width: w, height: w * 0.36,
              borderRadius: "50%", background: "#525A6E", zIndex: 7 }} />
          ))}

          {/* the two trajectories: the timid hop, and the one that leaves the frame */}
          <Arc f={f} at={6} x1={286} y1={H + 68} x2={470} y2={H + 68} peak={132} c={AMBER} dur={20} z={14} />
          <Arc f={f} at={20} x1={286} y1={H + 68} x2={1080} y2={150} peak={330} c={GO_L} dur={34} z={14} />
          <Craft f={f} x={262 + hop * 176} y={H + 6 - hop * 128} s={0.5} flame={hop * 0.7} z={16} />

          {/* the crew, on the surface, watching the big one go */}
          <Astro f={f} x={30} y={stand(H + 224, 306)} size={306} gaze={2} pack shock={0.35}
                 nodAmp={1.5} nodSpeed={17} z={18} />
          <Astro f={f + 26} x={706} y={stand(H + 36, 146)} size={146} gaze={-2} pack
                 nodAmp={1.6} nodSpeed={15} z={13} suitC="#E2E6EA" />
          <Prints x={244} y={H + 132} n={6} step={44} c="rgba(28,34,50,0.34)" />
          <Flagpole f={f} x={604} y={H + 22} h={116} c={AMBER_D} z={13} />
          <Chip y={H + 208} text="GO BIGGER" c={AMBER_D} />
        </div>
      </Panel>
    </AbsoluteFill>
  );
};

/* ====== M8 · NIGHT CAMP, AURORA — one instruction, 14 days (27.56) ======== */
export const M8LongBurn: React.FC = () => {
  const f = useCurrentFrame();
  const H = horizonOf("night");
  const fly = E(f, 10, 160, 0, 720, IO);
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <Tag f={f} logo word="ONE INSTRUCTION, 14 DAYS" c={GO} />
      <Panel glow={hexA(TEAL, 0.26)}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden",
          transform: cam(f, 166, 1), transformOrigin: "50% 55%" }}>
          <Surface f={f} kind="night" />
          <Aurora f={f} z={3} />
          <SkyWorld cx={190} cy={150} r={78} c="#4C6E9E" c2="#3A5680" z={4} />

          {/* the dominant graphic: 14 days cut into the rock, one every few frames */}
          <div style={{ position: "absolute", left: 566, top: H - 168, width: 366, height: 150,
            background: "#20364E", borderRadius: 12, zIndex: 11,
            clipPath: "polygon(4% 12%, 96% 0, 100% 92%, 0 100%)" }} />
          <Tally f={f} x={604} y={H - 132} n={14} at={16} c="#F2E4C6" z={16} />

          {/* the craft still working, crossing the sky unattended */}
          <svg viewBox={`0 0 ${PW} ${PH}`} width={PW} height={PH}
            style={{ position: "absolute", inset: 0, zIndex: 8, overflow: "visible" }}>
            <path d={`M120 182 Q 430 150 ${130 + fly} 182`}
              stroke="#4C7E9E" strokeWidth={5} fill="none" strokeDasharray="14 18" />
          </svg>
          <Craft f={f} x={120 + fly} y={182 - osc(f, 42, 16)} s={0.46} flame={0.45} z={9} />

          {/* the camp: they went to sleep and it kept going */}
          <Hab f={f} x={64} y={H - 96} s={0.82} z={12} />
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ position: "absolute", left: 300 + i * 74, top: H + 44,
              width: 20, height: 20, borderRadius: "50%",
              background: i === 1 ? "#FFD79A" : "#E0B472", zIndex: 13 }} />
          ))}
          <Astro f={f} x={352} y={stand(H + 108, 226)} size={226} gaze={2} pack cheer={0.4}
                 nodAmp={1.6} nodSpeed={16} z={15} />
          <Prints x={300} y={H + 118} n={5} step={44} c="rgba(10,20,48,0.42)" />
          <Chip y={112} text="IT NEVER STOPPED" c={GO} />
        </div>
      </Panel>
    </AbsoluteFill>
  );
};

/* ====== M9 · A SUMMIT AT DAWN — comment BORIS (33.08) ==================== */
export const M9Cta: React.FC = () => {
  const f = useCurrentFrame();
  const H = horizonOf("dawn");
  const rise = E(f, 0, 70, 0, 92, OUT);
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <Tag f={f} logo word="COMMENT BORIS FOR THE GUIDE" c={RED} />
      <Panel glow={hexA(DAWN, 0.3)}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden",
          transform: cam(f, 78, 1), transformOrigin: "50% 56%" }}>
          <Surface f={f} kind="dawn" />
          {/* a world rising over the ridge behind them */}
          <SkyWorld cx={300} cy={268 - rise} r={116} c="#E0A05E" c2="#C4813F" z={3} />

          {/* the CTA seal owns its own column. Nothing else enters it. */}
          <div style={{ position: "absolute", left: 636, top: 236, width: 286, height: 286, zIndex: 22,
            transform: `rotate(${-7 + osc(f, 44, 1.4)}deg)`, filter: "drop-shadow(0 12px 14px rgba(26,30,40,0.42))" }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: 20, border: `20px solid ${RED}`,
              background: "rgba(255,255,255,0.9)" }} />
            <div style={{ position: "absolute", left: 0, right: 0, top: 58, textAlign: "center",
              fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 30, letterSpacing: "0.2em", color: RED }}>COMMENT</div>
            <div style={{ position: "absolute", left: 0, right: 0, top: 102, textAlign: "center",
              fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 72, letterSpacing: "-0.02em", color: RED }}>BORIS</div>
            <div style={{ position: "absolute", left: 111, top: 190, width: 64, height: 64 }}>
              <Patch x={0} y={0} d={64} c={RED} z={1} />
            </div>
          </div>

          {/* the guide, planted on the summit */}
          <div style={{ position: "absolute", left: 74, top: 250, width: 372, height: 226, zIndex: 18,
            borderRadius: 10, background: CARD, boxShadow: SH_D }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 52, borderRadius: "10px 10px 0 0",
              background: RED, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 26,
              letterSpacing: "0.12em", color: "#FFF6F2", textAlign: "center", lineHeight: "52px" }}>THE FULL GUIDE</div>
            {[0, 1, 2].map((i) => (
              <React.Fragment key={i}>
                <div style={{ position: "absolute", left: 24, top: 78 + i * 46, width: 20, height: 20,
                  borderRadius: "50%", background: GO }} />
                <div style={{ position: "absolute", left: 60, top: 84 + i * 46, width: 250 - i * 44, height: 12,
                  borderRadius: 6, background: "#D6D0C6" }} />
              </React.Fragment>
            ))}
          </div>

          {/* the crew, standing on the summit they climbed */}
          <Astro f={f} x={396} y={stand(H + 128, 224)} size={224} cheer={0.9} pack gaze={2}
                 nodAmp={2.8} nodSpeed={10} z={16} />
          <Flagpole f={f} x={196} y={H + 8} h={140} c={RED} z={15} />
          <Prints x={330} y={H + 140} n={6} step={46} c="rgba(50,30,24,0.32)" />
          {/* summit rocks so the ground is a peak, not a floor */}
          {[[36, 96, 74], [880, 118, 88], [640, 74, 60]].map(([x, w, h], i) => (
            <div key={i} style={{ position: "absolute", left: x, top: H + 26 + i * 20, width: w, height: h,
              background: i % 2 ? "#6E4A3E" : "#8E6250", zIndex: 8,
              clipPath: "polygon(40% 0, 100% 100%, 0 100%)" }} />
          ))}
        </div>
      </Panel>
    </AbsoluteFill>
  );
};
