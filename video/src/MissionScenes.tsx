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
import {
  Sheet, SheetStack, Rulebook, Rails, TaskCard, Checklist, StepChain, AppBuild, OneInstruction,
  StageScreen,
} from "./MissionProps";

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

/** A FAST entrance. Returns the remaining offset, so `left: X + slide(f, at, -700)`
   starts 700px left of X and arrives in `dur` frames.

   ⛔ Why `dur` defaults to 12 and not 40: a movement has to cover real distance
   per frame or it does not read. Measured on this reel — a 300px glide across a
   104-frame scene scored ZERO motion per frame. Rule of thumb: at least ~25px
   per frame in panel space for the duration of the beat. */
const slide = (f: number, at: number, dist: number, dur = 12) =>
  (1 - E(f, at, at + dur, 0, 1, OUT)) * dist;

/** a stepped traverse: `n` fast pushes instead of one slow glide */
const pushes = (f: number, at: number, n: number, gap: number, dur = 11) => {
  let v = 0;
  for (let i = 0; i < n; i++) v += E(f, at + i * gap, at + i * gap + dur, 0, 1 / n, OUT);
  return v;
};


/** An internal cut inside a scene. Mounts only in its window and brings its own
 *  framing, so one location can hold three distinct SHOTS.
 *
 *  ⛔ Use this whenever a scene runs past ~2.5s. A single take of a character
 *  crossing the frame reads as boring even when it measures as "moving" — motion
 *  and interest are not the same number. */
const Beat: React.FC<{ f: number; a: number; b: number; zoom?: number; ox?: number; oy?: number;
  children: React.ReactNode }> = ({ f, a, b, zoom = 1, ox = 0, oy = 0, children }) => {
  if (f < a || f >= b) return null;
  const t = Math.min(1, (f - a) / 10), e = t * t * (3 - 2 * t);
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden",
      transform: `scale(${zoom - e * 0.035}) translate(${ox}px, ${oy}px)`, transformOrigin: "50% 56%" }}>
      {children}
    </div>
  );
};

/** two bright frames on an internal cut, so a hard cut reads as a cut */
const CutFlash: React.FC<{ f: number; at: number[] }> = ({ f, at }) => (<>
  {at.map((c) => {
    const k = f - c;
    if (k < 0 || k > 2) return null;
    return <div key={c} style={{ position: "absolute", inset: 0, background: "#FFF6F2",
      opacity: (1 - k / 2) * 0.3, zIndex: 40 }} />;
  })}
</>);

/* ====== M1 · ICE PLAIN — 80% of the system prompt, thrown out (5.24) ======
   THREE shots: close on the stack tearing itself apart · wide on what is left ·
   the crew hauling the one surviving page away. */
export const M1Deleted: React.FC = () => {
  const f = useCurrentFrame();
  const H = horizonOf("ice");
  const CUTS = [40, 76];
  const [B, C] = CUTS;
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <Tag f={f} logo word="HE DELETED 80% OF IT" c={RED} />
      <Panel glow={hexA(CLAY, 0.24)}>

        {/* --- 1 · CLOSE. The prompt tears itself apart, filling the frame. --- */}
        <Beat f={f} a={0} b={B} zoom={1.06} oy={30}>
          <Surface f={f} kind="ice" pan={f * 2.2} />
          <div style={{ position: "absolute", left: 218, top: 96, width: 486, height: 660,
            border: "8px dashed #8FB2C8", borderRadius: 10, zIndex: 9 }} />
          <SheetStack f={f} x={224} y={104} cols={3} rows={5} cw={162} ch={132}
                      gone={0.8} at={2} every={1.5} z={12} />
          <BarMeter f={f} x={286} y={62} w={440} h={44} v={0.8} at={6} n={10} c={RED} z={20} />
          <Chip y={648} text="80% GONE" c={RED} />
        </Beat>

        {/* --- 2 · WIDE. The plain, and the outline of everything that left. --- */}
        <Beat f={f} a={B} b={C} zoom={1.0}>
          <Surface f={f} kind="ice" pan={(f - B) * 3.4} />
          <div style={{ position: "absolute", left: 552 - (f - B) * 3, top: H - 304, width: 230, height: 378,
            border: "6px dashed #8FB2C8", borderRadius: 8, zIndex: 9 }} />
          {/* only the bottom row survived the cut */}
          <SheetStack f={99} x={556 - (f - B) * 3} y={H - 72} cols={3} rows={1} cw={78} ch={76}
                      gone={0} at={0} z={12} />
          <Astro f={f} x={E(f, B, C, -230, 300, IO)} y={stand(H + 120, 286)} size={286} step={11} pack
                 gaze={2} nodAmp={3.2} nodSpeed={9} z={15} />
          <Kick f={f} x={E(f, B, C, -190, 340, IO)} y={H + 116} c="rgba(255,255,255,0.6)" />
          <Flagpole f={f} x={880 - (f - B) * 3} y={H - 108} h={152} z={11} />
          <Chip y={128} text="NOT TRIMMED. DELETED." c={RED} size={35} />
        </Beat>

        {/* --- 3 · The one page that survived, hauled off on a sled. --- */}
        <Beat f={f} a={C} b={9999} zoom={1.04} oy={-16}>
          <Surface f={f} kind="ice" pan={(f - C) * 6} />
          {/* the sled + the single surviving page */}
          <div style={{ position: "absolute", left: 690 - (f - C) * 13, top: H + 74, width: 250, height: 74,
            zIndex: 13, filter: "drop-shadow(0 7px 7px rgba(26,30,40,0.32))" }}>
            <div style={{ position: "absolute", left: 0, top: 30, width: 250, height: 26, borderRadius: 10, background: "#8E9AA6" }} />
            <div style={{ position: "absolute", left: 62, top: -48, width: 104, height: 84, borderRadius: 6, background: CARD }}>
              <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 17, borderRadius: "6px 6px 0 0", background: RED }} />
              <div style={{ position: "absolute", left: 12, top: 32, width: 74, height: 7, borderRadius: 3, background: "#CFC8BC" }} />
              <div style={{ position: "absolute", left: 12, top: 48, width: 54, height: 7, borderRadius: 3, background: "#CFC8BC" }} />
            </div>
            <div style={{ position: "absolute", left: 0, top: 58, width: 250, height: 11, borderRadius: 5, background: "#6E7B88" }} />
          </div>
          <Astro f={f} x={430 - (f - C) * 13} y={stand(H + 132, 300)} size={300} step={11} pack gaze={-1}
                 nodAmp={3.2} nodSpeed={9} z={15} />
          <Astro f={f + 21} x={716 - (f - C) * 13} y={stand(H + 44, 208)} size={208} step={11} pack gaze={-1}
                 nodAmp={3} nodSpeed={10} z={13} suitC="#E2E6EA" />
          <Prints x={880 - (f - C) * 13} y={H + 140} n={8} step={50} c="rgba(90,116,136,0.34)" flip />
          <Chip y={H + 214} text="ONE PAGE LEFT" c={RED} />
        </Beat>

        <CutFlash f={f} at={CUTS} />
      </Panel>
    </AbsoluteFill>
  );
};

/* ====== M2 · DUST DUNES — the rules were written for the OLD one (8.86) ====
   THREE shots: close on the rulebook strapped to it · the old unit inside its
   trainer rails · Opus 5 walking past, free of both. */
export const M2Babysit: React.FC = () => {
  const f = useCurrentFrame();
  const H = horizonOf("dune");
  const CUTS = [46, 94];
  const [B, C] = CUTS;
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <Tag f={f} logo word="WRITTEN FOR AN OLDER MODEL" c={AMBER_D} />
      <Panel glow={hexA(AMBER, 0.22)}>

        {/* --- 1 · CLOSE. The rulebook itself. --- */}
        <Beat f={f} a={0} b={B} zoom={1.05} oy={20}>
          <Surface f={f} kind="dune" pan={f * 2.4} />
          <Rulebook x={278 + slide(f, 2, -700)} y={126} s={2.5} rot={-6} z={18} />
          {/* the pages it is full of, flicking over */}
          {[0, 1, 2].map((i) => {
            const on = f >= 14 + i * 9;
            if (!on) return null;
            const t = E(f, 14 + i * 9, 30 + i * 9, 0, 1, OUT);
            return <Sheet key={i} x={706} y={196 + i * 30 - t * 34} w={148} h={186} lines={4}
                          rot={-4 + i * 5 + t * 12} z={16 - i} />;
          })}
          <Chip y={706} text="RULES FOR THE OLD ONE" c={AMBER_D} size={35} />
        </Beat>

        {/* --- 2 · The old unit, still in its trainer rails. --- */}
        <Beat f={f} a={B} b={C} zoom={1.0}>
          <Surface f={f} kind="dune" pan={(f - B) * 3} />
          {/* the rails rattle as it strains, and the dune climbs while it stands there */}
          <Rails x={252 + slide(f, B + 1, 620) + osc(f, 2.4, 5)} y={H - 288} w={528} h={300} z={12} />
          <Astro f={(f - B) * 0.5} x={356} y={stand(H + 26, 322)} size={322} old rot={osc(f, 7, 2.6)}
                 gaze={-1} stern={0.4} nodAmp={2.2} nodSpeed={7} z={14} suitC="#B7ABA2" />
          <Rulebook x={232} y={H - 210} s={1.05} rot={-9 + osc(f, 9, 3)} z={15} />
          {/* sand pouring off the rails */}
          {Array.from({ length: 7 }, (_, i) => {
            const t = (((f - B) * 0.045 + i * 0.14) % 1);
            return <div key={`sd${i}`} style={{ position: "absolute", left: 270 + i * 74,
              top: H - 250 + t * 300, width: 9, height: 22 + t * 26, borderRadius: 5,
              background: "#D9A468", opacity: (1 - t) * 0.8, zIndex: 17 }} />;
          })}
          <div style={{ position: "absolute", left: 212, top: H + 92 - E(f, B, B + 46, 0, 74, IO),
            width: 620, height: 150, borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
            background: "#C08048", zIndex: 16 }} />
          <div style={{ position: "absolute", left: 196, top: H - 96, width: 640, height: 160,
            borderRadius: "50% 50% 0 0 / 100% 100% 0 0", background: "#B0743F", zIndex: 9 }} />
          <div style={{ position: "absolute", left: 862 + osc(f, 64, 8), top: H - 210, width: 40, height: 220,
            zIndex: 8, clipPath: "polygon(38% 0, 62% 0, 100% 100%, 0 100%)", background: "#D9A468", opacity: 0.62 }} />
          <Chip y={128} text="STILL ON RAILS" c={AMBER_D} />
        </Beat>

        {/* --- 3 · Opus 5, walking past. No rails, no rulebook. --- */}
        <Beat f={f} a={C} b={9999} zoom={1.03} oy={-14}>
          <Surface f={f} kind="dune" pan={(f - C) * 7} />
          <Craft f={f} x={880 - (f - C) * 9} y={H - 252} s={0.86} flame={0} z={11} />
          <Flagpole f={f} x={820 - (f - C) * 6} y={H - 86} h={130} c={AMBER_D} z={12} />
          <Astro f={f} x={E(f, C, C + 46, 940, 240, IO)} y={stand(H + 168, 348)} size={348} step={11} pack
                 gaze={2} nodAmp={3.4} nodSpeed={9} z={16} />
          <Kick f={f} x={E(f, C, C + 46, 990, 290, IO)} y={H + 164} c="rgba(226,178,124,0.62)" />
          <Prints x={1010 - (f - C) * 11} y={H + 178} n={7} step={48} c="rgba(112,72,40,0.30)" flip />
          <Chip y={128} text="OPUS 5 DOESN'T NEED IT" c={GO} size={35} />
        </Beat>

        <CutFlash f={f} at={CUTS} />
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
          transform: cam(f, 14, 1), transformOrigin: "46% 58%" }}>
          <Surface f={f} kind="canyon" />

          {/* the canyon wall, in readable strata — the thing being studied */}
          <div style={{ position: "absolute", left: 604, top: 96, width: 470, height: H - 46, zIndex: 7,
            clipPath: "polygon(16% 0, 100% 0, 100% 100%, 0 100%)" }}>
            {["#B98F5E", "#A8794E", "#C6A472", "#96693F", "#B98F5E", "#8A6541"].map((c, i) => (
              <div key={i} style={{ position: "absolute", left: 0, right: 0, top: i * 62, height: 60, background: c }} />
            ))}
          </div>

          {/* the dominant action: a core being pulled out of the ground */}
          <Drill f={f} x={396} y={H - 244 + slide(f, 2, -560)} s={1.32} z={13} />
          {/* the core lifts out — the scene's late beat, so the tail is not dead */}
          <div style={{ position: "absolute", left: 452, top: H - 60 - E(f, 74, 104, 0, 250, OUT),
            width: 46, height: 210, borderRadius: 8, background: "#8A6541", zIndex: 14,
            filter: "drop-shadow(0 6px 6px rgba(26,30,40,0.32))" }}>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} style={{ position: "absolute", left: 0, right: 0, top: 22 + i * 46,
                height: 16, background: i % 2 ? "#B98F5E" : "#6E4F32" }} />
            ))}
          </div>
          <SampleBench f={f} x={92 + slide(f, 16, -620)} y={H - 34} s={0.94} n={4} z={13} />
          {/* the crew KNEELING at the sample, not watching a screen */}
          <Astro f={f} x={252} y={stand(H + 96, 232)} size={232} kneel={0.55} pack gaze={2}
                 nodAmp={1.2} nodSpeed={20} stern={0.3} z={15} />
          <Astro f={f + 30} x={1040 - E(f, 0, 118, 0, 940, IO)} y={stand(H + 150, 330)} size={330}
                 step={11} pack gaze={-2} nodAmp={3.2} nodSpeed={9} z={17} suitC="#E2E6EA" />

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
          {/* the thing being STOPPED: a prompt page, scored out and dropped */}
          <Sheet x={742} y={H - 214 - (1 - E(f, 4, 26, 0, 1, OUT)) * 520} w={186} h={230} lines={5} mark
                 title="PROMPT" struck={E(f, 34, 64, 0, 1, OUT)}
                 rot={-7 + (1 - E(f, 4, 26, 0, 1, OUT)) * 40} z={19} />
          {/* the VO here is "HE SAYS the job is now closer to being a scientist",
             so the man saying it is on screen while he is quoted */}
          <StageScreen f={f} x={52} y={92} w={352} h={198} from={96} plate={false} z={21} />
          <div style={{ position: "absolute", left: 52, top: 306, width: 352, borderRadius: 8,
            background: CARD, boxShadow: SH_D, padding: "8px 16px 10px", zIndex: 21 }}>
            <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 27, lineHeight: 1.05,
              color: "#26211C" }}>BORIS CHERNY</div>
            <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 16,
              letterSpacing: "0.12em", color: RED }}>HE BUILT CLAUDE CODE</div>
          </div>
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
  const cross = E(f, 6, 100, 0, 1, IO);
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <Tag f={f} logo word="GIVE IT A WAY TO CHECK ITSELF" c={RED} />
      <Panel glow={hexA(RED, 0.24)}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden",
          transform: cam(f, 14, 2), transformOrigin: "50% 62%" }}>
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
          <Rover f={f} x={-260 + cross * 1240} y={H - 118} s={1.14} roll={f * 0.3} z={14} />
          {/* the two things the line actually names, in order: the task is pushed past
             comfortable, THEN it is handed a way to check its own work */}
          {/* beat 1: the task flies in from the left. beat 3: the checklist from the right. */}
          <TaskCard f={f} x={56 + slide(f, 2, -640)} y={92} s={0.86} title="THE TASK" hard={0.93} at={8} z={20} />
          <Checklist f={f} x={664 + slide(f, 52, 700)} y={104} s={0.8} n={4} at={60} every={7} z={20} />

          {/* the crew watching from behind the line, on the near side */}
          <Astro f={f} x={-160 + E(f, 0, 104, 0, 470, IO)} y={stand(H + 176, 312)} size={312}
                 step={11} gaze={2} pack shock={0.3} nodAmp={3.2} nodSpeed={9} z={16} />
          <div style={{ position: "absolute", left: 40, top: H + 74, width: 280, height: 9,
            background: AMBER, zIndex: 15 }} />
          {[46, 176, 300].map((x, i) => (
            <div key={i} style={{ position: "absolute", left: x, top: H + 74, width: 11, height: 52,
              background: "#8E9AA6", zIndex: 15 }} />
          ))}
          <Chip y={H + 186} text="LET IT PROVE ITSELF" c={RED} />
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
          transform: cam(f, 14, 3), transformOrigin: "50% 50%" }}>
          <Surface f={f} kind="shatter" />

          {/* the dominant object: THE RUN, step by step — and step 4 is where it breaks */}
          <StepChain f={f} x={196} y={H - 232} n={5} breakAt={3} at={4} every={6} s={0.94} z={16} />
          <Pulse f={f} at={SNAP} x={568} y={H - 178} r={210} c={RED} life={16} z={18} />

          {/* shards standing out of the plain, so the world reads as broken */}
          {[[120, 86, -12], [820, 104, 14], [252, 62, 8], [700, 74, -8]].map(([x, h, r], i) => (
            <div key={i} style={{ position: "absolute", left: x, top: H - h + 14, width: 52, height: h,
              background: i % 2 ? "#514874" : "#5E5486", zIndex: 9,
              clipPath: "polygon(46% 0, 100% 100%, 0 100%)", transform: `rotate(${r}deg)` }} />
          ))}

          {/* the crew behind the blast line, watching the failure happen */}
          <Astro f={f} x={44} y={stand(H + 214, 302)} size={302} gaze={2} pack kneel={0.35}
                 shock={f >= SNAP ? 0.6 : 0.15} nodAmp={1.2} nodSpeed={21} z={17} />
          <Astro f={f + 24} x={900 - E(f, 0, 60, 0, 620, IO)} y={stand(H + 96, 244)} size={244}
                 step={11} gaze={-2} pack shock={f >= SNAP ? 0.5 : 0.1} nodAmp={3.2} nodSpeed={9}
                 z={17} suitC="#E2E6EA" />
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
  const shim = E(f, 26, 42, 0, 1, OUT);          // a snap, not a 34-frame creep
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <Tag f={f} logo word="FIX THE SETUP, NOT THE WORDING" c={GO} />
      <Panel glow={hexA(TEAL, 0.24)}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden",
          transform: cam(f, 14, 1), transformOrigin: "50% 58%" }}>
          <Surface f={f} kind="shore" />

          {/* the liquid: a still teal shore behind everything */}
          <div style={{ position: "absolute", left: 0, right: 0, top: H - 76, height: 96,
            background: "#3E9A96", zIndex: 6 }} />
          {[0, 1].map((i) => (
            <div key={i} style={{ position: "absolute", left: 90 + i * 520 + osc(f, 88 + i * 10, 7, i),
              top: H - 48 + i * 26, width: 200, height: 8, borderRadius: 4,
              background: "#78C0B4", zIndex: 7 }} />
          ))}

          {/* the dominant object: a lander that comes LEVEL as the leg is shimmed */}
          <Lander f={f} x={382} y={H - 214} s={1.06} shim={shim} z={13} />
          {/* the crew doing the shimming, crouched at the bad leg */}
          <Astro f={f} x={214} y={stand(H + 156, 240)} size={240} kneel={0.62} pack gaze={2}
                 nodAmp={1.2} nodSpeed={22} z={17} />
          <Astro f={f + 28} x={1010 - E(f, 0, 90, 0, 700, IO)} y={stand(H + 196, 316)} size={316}
                 step={11} pack gaze={-2} cheer={shim * 0.7} nodAmp={3.2} nodSpeed={9}
                 z={18} suitC="#E2E6EA" />

          {/* the level bubble: the read on whether the SETUP is right */}
          <div style={{ position: "absolute", left: 356, top: 94, width: 300, height: 52, borderRadius: 26,
            background: CARD, border: "7px solid #8E9AA6", zIndex: 20, boxShadow: SH_D }}>
            <div style={{ position: "absolute", left: 12 + (1 - shim) * 190, top: 8, width: 62, height: 30,
              borderRadius: 15, background: shim > 0.85 ? GO : AMBER }} />
            <div style={{ position: "absolute", left: 142, top: 0, bottom: 0, width: 5, background: "#8E9AA6" }} />
          </div>
          {/* the wording, discarded — the setup is what actually gets fixed */}
          <Sheet x={62 + slide(f, 2, -520)} y={116} w={168} h={208} lines={5} title="WORDING"
                 struck={E(f, 12, 26, 0, 1, OUT)} rot={-8} z={19} />
          <Chip y={H + 174} text="FIX THE SETUP" c={GO} />
        </div>
      </Panel>
    </AbsoluteFill>
  );
};

/* ====== M7 · A CRATERED MOON — the hop vs the real trip (25.36) =========== */
export const M7TooSmall: React.FC = () => {
  const f = useCurrentFrame();
  const H = horizonOf("moon");
  const hop = Math.max(0, Math.sin(((f - 4) / 14) * Math.PI)) * (f >= 4 && f < 18 ? 1 : 0);
  const big = E(f, 22, 52, 0, 1, IO);            // the trip that was available
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <Tag f={f} logo word="YOUR TASKS ARE FAR TOO SMALL" c={AMBER_D} />
      <Panel glow={hexA(AMBER, 0.22)}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden",
          transform: cam(f, 14, 2), transformOrigin: "50% 60%" }}>
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
          {big > 0 && (
            <Craft f={f} x={200 + big * 900} y={H + 68 - Math.sin(big * Math.PI) * 460 - big * 110}
                   s={0.86} flame={0.9} z={17} />
          )}

          {/* the crew, on the surface, watching the big one go */}
          <Astro f={f} x={30} y={stand(H + 224, 306)} size={306} gaze={2} pack shock={0.35}
                 nodAmp={1.5} nodSpeed={17} z={18} />
          <Astro f={f + 26} x={880 - E(f, 0, 66, 0, 720, IO)} y={stand(H + 92, 258)} size={258}
                 step={11} gaze={-2} pack nodAmp={3.2} nodSpeed={9} z={17} suitC="#E2E6EA" />
          <Prints x={244} y={H + 132} n={6} step={44} c="rgba(28,34,50,0.34)" />
          {/* the task itself, and it is tiny next to the trip that was available */}
          <TaskCard f={f} x={556} y={H + 46} s={0.34} title="THE TASK" hard={0.2} at={4} z={15} />
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
  const fly = E(f, 0, 166, -180, 1120, IO);
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <Tag f={f} logo word="ONE INSTRUCTION, 14 DAYS" c={GO} />
      <Panel glow={hexA(TEAL, 0.26)}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden",
          transform: cam(f, 14, 1), transformOrigin: "50% 55%" }}>
          <Surface f={f} kind="night" />
          <Aurora f={f} z={3} />
          <SkyWorld cx={190} cy={150} r={78} c="#4C6E9E" c2="#3A5680" z={4} />

          {/* one instruction goes in, and an entire app gets rewritten in another language */}
          <OneInstruction f={f} x={62 + slide(f, 2, -560)} y={104} s={0.84} at={2} z={20} />
          <div style={{ position: "absolute", left: 340, top: 96, width: 340, height: 236,
            borderRadius: 12, background: "#0E1A34", zIndex: 18 }} />
          <AppBuild f={f} x={354} y={112} cols={6} rows={4} cw={52} at={8} dur={150}
                    from="#9488B4" to={GO} z={19} />
          {/* and 14 days cut into the rock, one every few frames */}
          <div style={{ position: "absolute", left: 566, top: H - 168, width: 366, height: 150,
            background: "#20364E", borderRadius: 12, zIndex: 11,
            clipPath: "polygon(4% 12%, 96% 0, 100% 92%, 0 100%)" }} />
          <Tally f={f} x={604} y={H - 132} n={14} at={92} every={4.6} c="#F2E4C6" z={16} />

          {/* the craft still working, crossing the sky unattended */}
          <svg viewBox={`0 0 ${PW} ${PH}`} width={PW} height={PH}
            style={{ position: "absolute", inset: 0, zIndex: 8, overflow: "visible" }}>
            <path d={`M-180 214 Q 430 168 ${fly + 40} 214`}
              stroke="#4C7E9E" strokeWidth={6} fill="none" strokeDasharray="14 18" />
          </svg>
          <Craft f={f} x={fly} y={196 - osc(f, 42, 22)} s={0.9} flame={0.7} z={9} />
          {/* a second pass, late, so the tail of the longest scene keeps moving */}
          <Craft f={f} x={1080 - E(f, 104, 166, 0, 1180, IO)} y={126 + osc(f, 34, 16)}
                 s={0.62} flame={0.6} z={10} />

          {/* the camp: they went to sleep and it kept going */}
          <Hab f={f} x={64} y={H - 96} s={0.82} z={12} />
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ position: "absolute", left: 300 + i * 74, top: H + 44,
              width: 20, height: 20, borderRadius: "50%",
              background: i === 1 ? "#FFD79A" : "#E0B472", zIndex: 13 }} />
          ))}
          <Astro f={f} x={-260 + E(f, 0, 178, 0, 1260, IO)} y={stand(H + 176, 330)} size={330}
                 step={11} gaze={2} pack cheer={0.4} nodAmp={3.2} nodSpeed={9} z={17} />
          <Prints x={300} y={H + 118} n={5} step={44} c="rgba(10,20,48,0.42)" />
          <Chip y={H + 168} text="IT NEVER STOPPED" c={GO} />
        </div>
      </Panel>
    </AbsoluteFill>
  );
};

/* ====== M9 · A SUMMIT AT DAWN — comment BORIS (33.08) ==================== */
export const M9Cta: React.FC = () => {
  const f = useCurrentFrame();
  const H = horizonOf("dawn");
  const rise = E(f, 0, 78, -40, 150, IO);
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <Tag f={f} logo word="COMMENT BORIS FOR THE GUIDE" c={RED} />
      <Panel glow={hexA(DAWN, 0.3)}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden",
          transform: cam(f, 14, 1), transformOrigin: "50% 56%" }}>
          <Surface f={f} kind="dawn" />
          {/* a world rising over the ridge behind them */}
          <SkyWorld cx={300} cy={268 - rise} r={116} c="#E0A05E" c2="#C4813F" z={3} />

          {/* the CTA seal owns its own column. Nothing else enters it. */}
          <div style={{ position: "absolute", left: 636, top: 236, width: 286, height: 286, zIndex: 22,
            transform: `translateY(${(1 - E(f, 2, 26, 0, 1, BACK)) * -560}px) scale(${0.6 + E(f, 2, 26, 0, 0.4, BACK)}) rotate(${-7 + osc(f, 44, 1.4)}deg)`,
            filter: "drop-shadow(0 12px 14px rgba(26,30,40,0.42))" }}>
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
          <div style={{ position: "absolute", left: 74 + slide(f, 22, -620), top: 250, width: 372, height: 226,
            zIndex: 18, borderRadius: 10, background: CARD, boxShadow: SH_D }}>
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
          <Astro f={f} x={-200 + E(f, 0, 78, 0, 780, IO)} y={stand(H + 176, 312)} size={312}
                 step={11} cheer={0.9} pack gaze={2} nodAmp={3.4} nodSpeed={8} z={16} />
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
