import React from "react";
import { AbsoluteFill, useCurrentFrame, Easing, interpolate, Img, staticFile } from "remotion";
import { inter, fraunces } from "./fonts";
import { Bg, Panel, ProgressBar, HookHeader, Caption, Mascot, AssemblyCtx, INK, CLAY, hexA } from "./SlopKit";

/* =========================================================================
   REEL 82 "BORIS" — THREE HOOK CONCEPTS, for selection.

   Built to docs/THE-OPEN.md Step 1: produce N genuinely different WORLDS,
   render frame 0 of each at full quality with the real chassis, and get one
   picked BEFORE any scene file is written.

   The claim: the person who built Claude Code gave a talk and gave away three
   things 99% of users get wrong. Payoff: he handed it one instruction and it
   has been running unattended for two weeks.

   Each concept fills the mapping table element by element (THE-OPEN "a theme
   must be a metaphor for the actual mechanic"). All three are geometric and
   hard-edged per memory `feedback_reel_geometric_references`, all three open
   BRIGHT (the luma bar is 140/255), and the mascot is on screen at frame 0.
   ========================================================================= */

const SoloCaption: React.FC<{ words: string[]; hot?: number }> = (p) =>
  React.useContext(AssemblyCtx) ? null : <Caption {...p} />;

const OUT = Easing.out(Easing.cubic), IO = Easing.inOut(Easing.cubic), BACK = Easing.out(Easing.back(1.6));
const E = (f: number, a: number, b: number, va = 0, vb = 1, ez: any = OUT) =>
  b <= a ? (f >= b ? vb : va)
         : interpolate(f, [a, b], [va, vb], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ez });
const osc = (f: number, p: number, amp = 1, ph = 0) => Math.sin(f / p + ph) * amp;
const rnd = (i: number, k = 1) => { const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return x - Math.floor(x); };

const SH = "0 10px 22px rgba(26,24,20,0.30)", SH_D = "0 20px 40px rgba(26,24,20,0.42)";
const CARD = "#F7F5F0", CARD2 = "#EDE7DA", CARD3 = "#DCD3C2";
const RED = "#C0392B", RED_D = "#8E2A20", AMBER = "#E0894A", TEAL = "#2F6B63";

/** the Claude mark on a coloured chip — the subject, stated at frame 0 */
const Mark: React.FC<{ x: number; y: number; d?: number; c?: string; z?: number }> =
  ({ x, y, d = 78, c = RED, z = 20 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: d, height: d, borderRadius: 12, background: c, zIndex: z, boxShadow: SH }}>
    <Img src={staticFile("claude_logo.png")}
      style={{ position: "absolute", left: d * 0.15, top: d * 0.15, width: d * 0.7, height: d * 0.7,
        objectFit: "contain", filter: "brightness(0) invert(1)" }} />
  </div>
);

/* ZONES (panel-local, 1012x792). Every concept below places its claim in the
   CLAIM band and its hero prop in the PROP band. They do not overlap, which is
   what went wrong on the first pass — the headline sat on top of the objects.
     PROP   y  96..340   (right column x 620..980, or full width for a board)
     CLAIM  y 104..390   (left column x 54..590)  or 404..590 for a board layout
     FLOOR  y 620        (props stand ON it; the mascot's feet land here)
*/
const FLOOR = 620;

/** the one string that has to be mute-readable at thumb distance */
const Claim: React.FC<{ x?: number; y: number; kick: string; big: string; sub?: string; c?: string; w?: number }> =
  ({ x = 54, y, kick, big, sub, c = RED, w = 700 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, zIndex: 24 }}>
    <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
      <span style={{ width: 30, height: 8, borderRadius: 4, background: c }} />
      <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 27, letterSpacing: "0.2em", color: c }}>{kick}</span>
    </div>
    <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 88, lineHeight: 0.98,
      letterSpacing: "-0.04em", color: INK, whiteSpace: "pre-line" }}>{big}</div>
    {sub && <div style={{ marginTop: 10, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 30,
      lineHeight: 1.2, color: "#6B6355" }}>{sub}</div>}
  </div>
);

/* =========================================================================
   CONCEPT A · THE LAB
   His own words: "the job now is closer to being a scientist." Claude in a lab
   coat; three cracked specimen jars are the three mistakes; a self-test rig is
   "hand it a way to check its own work"; a strip chart running off the bench is
   the two-week unattended run.

     on screen                        | what it actually is
     ---------------------------------|-----------------------------------------
     three cracked specimen jars      | the 3 things 99% get wrong
     the lab coat + hypothesis board  | "the job is closer to being a scientist"
     the wall of instructions, stripped| the 80% of system prompt he deleted
     the self-test rig                | "a way to check its own work"
     the strip chart off the bench end | running unattended for two weeks
   ========================================================================= */
export const BorisHookA: React.FC = () => {
  const f = useCurrentFrame();
  const JARS = ["THE PROMPT", "THE METHOD", "THE SIZE"];
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <HookHeader f={f + 12} big="CLAUDE CODE'S CREATOR" hot="3 THINGS YOU GET WRONG" />
      <Panel glow={hexA(CLAY, 0.28)}>
        {/* bright lab: tiled wall, steel bench, cold daylight */}
        <div style={{ position: "absolute", inset: 0, background: "#EFF1EE" }} />
        <div style={{ position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 44% 30%, #FFFFFF 0%, #EFF1EE 52%, #D6DAD6 100%)" }} />
        {Array.from({ length: 8 }, (_, i) => (
          <div key={`v${i}`} style={{ position: "absolute", left: 4 + i * 128, top: 0, width: 5, height: 470, background: "rgba(60,70,66,0.10)" }} />
        ))}
        {Array.from({ length: 4 }, (_, i) => (
          <div key={`h${i}`} style={{ position: "absolute", left: 0, right: 0, top: 60 + i * 128, height: 5, background: "rgba(60,70,66,0.10)" }} />
        ))}

        {/* the stripped instruction wall — pages torn off their clips */}
        <div style={{ position: "absolute", left: 672, top: 96, width: 300, height: 234, background: CARD2,
          border: `8px solid ${CARD3}`, borderRadius: 6, boxShadow: SH, zIndex: 6 }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 40, background: "#6E7A74",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 19, letterSpacing: "0.16em", color: "#F4F6F4" }}>SYSTEM PROMPT</div>
          {Array.from({ length: 7 }, (_, i) => {
            const torn = i > 1;                       // 80% of it is gone
            return <div key={i} style={{ position: "absolute", left: 16, right: 16, top: 52 + i * 24, height: 13, borderRadius: 3,
              background: torn ? "rgba(110,122,116,0.14)" : "#3D4A44",
              clipPath: torn ? "polygon(0 0, 62% 0, 54% 100%, 0 100%)" : undefined }} />;
          })}
          <div style={{ position: "absolute", right: 12, bottom: 10, fontFamily: inter.fontFamily, fontWeight: 900,
            fontSize: 34, color: RED, letterSpacing: "-0.02em" }}>−80%</div>
        </div>

        {/* the strip chart, in the band between the claim and the bench */}
        <div style={{ position: "absolute", left: 660, top: 348, width: 322, height: 62, zIndex: 5 }}>
          <svg width={322} height={40} style={{ position: "absolute", left: 0, top: 0 }}>
            <polyline fill="none" stroke={TEAL} strokeWidth={5}
              points={Array.from({ length: 22 }, (_, i) => `${i * 15},${20 + Math.sin(i / 2.6) * 13 + rnd(i) * 5}`).join(" ")} />
          </svg>
          <div style={{ position: "absolute", left: 0, top: 42, padding: "6px 12px", borderRadius: 6, background: TEAL,
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 19, letterSpacing: "0.09em", color: "#EAF3F1" }}>DAY 14 · STILL RUNNING</div>
        </div>

        {/* steel bench */}
        <div style={{ position: "absolute", left: -20, right: -20, top: FLOOR, height: 40, background: "#9AA5A0", zIndex: 7 }} />
        <div style={{ position: "absolute", left: -20, right: -20, top: FLOOR, height: 10, background: "#BFC8C3", zIndex: 7 }} />
        <div style={{ position: "absolute", left: -20, right: -20, top: FLOOR + 40, bottom: 0, background: "#7E8A85", zIndex: 4 }} />

        {/* three cracked specimen jars = the three mistakes */}
        {JARS.map((t, i) => (
          <div key={t} style={{ position: "absolute", left: 62 + i * 170, top: 430, width: 148, zIndex: 9 }}>
            <div style={{ position: "absolute", left: 14, top: 0, width: 120, height: 20, borderRadius: 5, background: "#8E9A94" }} />
            <div style={{ position: "absolute", left: 6, top: 18, width: 136, height: 148, borderRadius: "8px 8px 18px 18px",
              background: "rgba(255,255,255,0.62)", border: `7px solid #B7C1BC`, boxShadow: SH }} />
            <div style={{ position: "absolute", left: 16, top: 96, width: 116, height: 62, borderRadius: "4px 4px 12px 12px", background: i === 2 ? AMBER : "#C9D4CE" }} />
            {/* the crack */}
            <div style={{ position: "absolute", left: 60 + i * 6, top: 30, width: 5, height: 120, background: RED_D,
              clipPath: "polygon(0 0, 100% 12%, 30% 40%, 100% 62%, 20% 84%, 100% 100%, 0 100%)" }} />
            <div style={{ position: "absolute", left: 6, top: 172, width: 136, padding: "6px 0", borderRadius: 4, background: INK,
              fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 17, letterSpacing: "0.08em",
              color: "#F4F1EA", textAlign: "center" }}>{i + 1}. {t}</div>
          </div>
        ))}

        {/* the scientist */}
        <div style={{ position: "absolute", left: 700, top: FLOOR - 282 * 0.94, zIndex: 12,
          filter: "drop-shadow(0 16px 22px rgba(26,24,20,0.34))" }}>
          <Mascot lf={f} size={282} prof={1} glasses={1} nodAmp={2} nodSpeed={14} gaze={-2} />
        </div>
        <Mark x={926} y={FLOOR - 96} d={68} c={RED} z={22} />

        <Claim y={100} x={54} kick="HE GAVE A TALK" big={"3 THINGS\n99% GET\nWRONG"} c={RED} w={580} />
      </Panel>
      <SoloCaption words={["The", "guy", "who", "built"]} hot={1} />
    </AbsoluteFill>
  );
};

/* =========================================================================
   CONCEPT B · MISSION CONTROL
   The payoff is the hook: one instruction, running unattended for two weeks.
   A flight-control wall with the mission clock at T+14 DAYS, three red FAULT
   lamps for the three mistakes, and a flight plan with most pages torn out.

     on screen                        | what it actually is
     ---------------------------------|-----------------------------------------
     three red FAULT lamps            | the 3 things 99% get wrong
     mission clock at T+14 DAYS       | it has run on its own for two weeks
     flight plan, 80% of pages gone   | the system prompt he deleted
     telemetry traces, not a script   | "watch where it actually breaks"
     the short hop vs the long burn   | "the tasks you give it are far too small"
   ========================================================================= */
export const BorisHookB: React.FC = () => {
  const f = useCurrentFrame();
  const FAULTS = ["PROMPT", "METHOD", "SCOPE"];
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <HookHeader f={f + 12} big="CLAUDE CODE'S CREATOR" hot="3 THINGS YOU GET WRONG" />
      <Panel glow={hexA(CLAY, 0.28)}>
        {/* a LIT control room: pale console wall, not a dark sci-fi bridge */}
        <div style={{ position: "absolute", inset: 0, background: "#F0EEE7" }} />
        <div style={{ position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 48% 26%, #FFFFFF 0%, #F0EEE7 56%, #DDD9CE 100%)" }} />
        {/* the big board */}
        <div style={{ position: "absolute", left: 40, top: 92, right: 40, height: 264, borderRadius: 10,
          background: "#46586A", border: `10px solid #7C8C99`, boxShadow: SH_D, zIndex: 5, overflow: "hidden" }}>
          {/* the mission clock */}
          <div style={{ position: "absolute", left: 26, top: 18 }}>
            <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 20, letterSpacing: "0.2em", color: "#CBDCE7" }}>MISSION ELAPSED</div>
            <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 78, lineHeight: 1,
              letterSpacing: "-0.03em", color: "#EAF2F7" }}>T+14 DAYS</div>
            <div style={{ marginTop: 6, display: "inline-flex", alignItems: "center", gap: 10,
              padding: "6px 14px", borderRadius: 6, background: TEAL }}>
              <span style={{ width: 14, height: 14, borderRadius: "50%", background: "#D8F0E8",
                opacity: 0.55 + 0.45 * Math.abs(Math.sin(f / 6)) }} />
              <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 21, letterSpacing: "0.14em", color: "#EAF6F2" }}>UNATTENDED · NOMINAL</span>
            </div>
          </div>
          {/* telemetry traces */}
          <svg width={366} height={116} style={{ position: "absolute", right: 22, top: 22 }}>
            {[0, 1, 2].map((r) => (
              <polyline key={r} fill="none" stroke={r === 2 ? RED : "#B4D0E0"} strokeWidth={4}
                points={Array.from({ length: 30 }, (_, i) => `${i * 12.6},${26 + r * 36 + Math.sin(i / 2.4 + r) * 11 + rnd(i, r) * 5}`).join(" ")} />
            ))}
          </svg>
          {/* three FAULT lamps */}
          <div style={{ position: "absolute", left: 26, bottom: 16, display: "flex", gap: 13 }}>
            {FAULTS.map((t, i) => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 9, padding: "9px 14px",
                borderRadius: 8, background: "#5A6C7C", border: `4px solid ${RED_D}` }}>
                <span style={{ width: 19, height: 19, borderRadius: "50%", background: RED,
                  opacity: 0.5 + 0.5 * Math.abs(Math.sin(f / 5 + i)) }} />
                <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 20, letterSpacing: "0.09em", color: "#F2DCD8" }}>{i + 1} {t}</span>
              </div>
            ))}
          </div>
          {/* the flight plan, most of it torn out */}
          <div style={{ position: "absolute", right: 24, bottom: 14, width: 176, height: 100, background: CARD2,
            borderRadius: 5, border: `5px solid ${CARD3}` }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 26, background: "#6E7A84",
              fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 15, letterSpacing: "0.12em",
              color: "#F4F6F4", textAlign: "center", lineHeight: "26px" }}>FLIGHT PLAN</div>
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} style={{ position: "absolute", left: 12, right: 12, top: 36 + i * 15, height: 8, borderRadius: 2,
                background: i > 0 ? "rgba(110,122,132,0.18)" : "#3D4A54",
                clipPath: i > 0 ? "polygon(0 0, 58% 0, 50% 100%, 0 100%)" : undefined }} />
            ))}
            <div style={{ position: "absolute", right: 9, bottom: 6, fontFamily: inter.fontFamily, fontWeight: 900,
              fontSize: 26, color: RED }}>−80%</div>
          </div>
        </div>

        {/* consoles + the operator */}
        <div style={{ position: "absolute", left: -20, right: -20, top: FLOOR, height: 74, background: "#CFC9BC", zIndex: 6 }} />
        <div style={{ position: "absolute", left: -20, right: -20, top: FLOOR, height: 12, background: "#E4DED1", zIndex: 6 }} />
        {[64, 726].map((cx, i) => (
          <div key={i} style={{ position: "absolute", left: cx, top: FLOOR + 18, width: 222, height: 42, borderRadius: 6,
            background: "#4E5C68", zIndex: 8 }}>
            {Array.from({ length: 12 }, (_, k) => (
              <div key={k} style={{ position: "absolute", left: 12 + (k % 6) * 35, top: 10 + Math.floor(k / 6) * 18,
                width: 22, height: 10, borderRadius: 2, background: k % 4 ? "#8B99A4" : AMBER }} />
            ))}
          </div>
        ))}
        <div style={{ position: "absolute", left: -20, right: -20, top: FLOOR + 74, bottom: 0, background: "#BEB6A6", zIndex: 4 }} />
        <div style={{ position: "absolute", left: 700, top: FLOOR - 268 * 0.94, zIndex: 12,
          filter: "drop-shadow(0 16px 22px rgba(26,24,20,0.34))" }}>
          <Mascot lf={f} size={268} suit={1} nodAmp={1.8} nodSpeed={16} gaze={2} />
        </div>
        <Mark x={950} y={FLOOR - 88} d={64} c={RED} z={22} />

        <Claim y={382} x={54} kick="ONE INSTRUCTION" big={"14 DAYS,\nUNATTENDED"} c={RED} w={600} />
      </Panel>
      <SoloCaption words={["The", "guy", "who", "built"]} hot={1} />
    </AbsoluteFill>
  );
};

/* =========================================================================
   CONCEPT C · THE PIT WALL
   "You fix the SETUP around it, not the wording of the prompt" is literally a
   race-engineering sentence, so the theme is his own words. Three red flags on
   the timing tower are the three mistakes; the endurance board is the two-week
   run; the rulebook in the bin is the deleted prompt.

     on screen                        | what it actually is
     ---------------------------------|-----------------------------------------
     the SETUP board being changed     | "fix the setup around it, not the wording"
     three red flags on the tower      | the 3 things 99% get wrong
     the rulebook binned, 80% gone     | the system prompt he deleted
     telemetry finding where it breaks | "watch where it actually breaks"
     STINT 14 DAYS on the board        | running unattended for two weeks
   ========================================================================= */
export const BorisHookC: React.FC = () => {
  const f = useCurrentFrame();
  const FLAGS = ["PROMPT", "METHOD", "SCOPE"];
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <HookHeader f={f + 12} big="CLAUDE CODE'S CREATOR" hot="3 THINGS YOU GET WRONG" />
      <Panel glow={hexA(CLAY, 0.28)}>
        {/* daylight pit lane */}
        <div style={{ position: "absolute", inset: 0, background: "#E3E7EA" }} />
        <div style={{ position: "absolute", inset: 0,
          background: "linear-gradient(180deg, #FFFFFF 0%, #E3E7EA 40%, #C6CDD2 100%)" }} />
        {/* garage back wall + roller doors */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 88, height: 300, background: "#CDD4D8", zIndex: 3 }} />
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ position: "absolute", left: 24 + i * 330, top: 108, width: 292, height: 262,
            background: "#8E9AA2", borderRadius: 5, zIndex: 4 }}>
            {Array.from({ length: 9 }, (_, k) => (
              <div key={k} style={{ position: "absolute", left: 0, right: 0, top: 10 + k * 28, height: 15, background: "#A4AFB6" }} />
            ))}
          </div>
        ))}
        {/* the timing tower with three red flags */}
        <div style={{ position: "absolute", left: 618, top: 96, width: 354, borderRadius: 8,
          background: "#22282D", border: `8px solid #4A545C`, boxShadow: SH_D, zIndex: 8, padding: "14px 0 16px" }}>
          <div style={{ textAlign: "center", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 20,
            letterSpacing: "0.2em", color: "#9FB0BC" }}>SETUP FAULTS</div>
          {FLAGS.map((t, i) => (
            <div key={t} style={{ margin: "10px 16px 0", display: "flex", alignItems: "center", gap: 12,
              padding: "10px 14px", borderRadius: 6, background: "#313A41", border: `4px solid ${RED_D}` }}>
              <span style={{ width: 30, height: 22, background: RED, clipPath: "polygon(0 0, 100% 0, 84% 100%, 0 100%)",
                opacity: 0.55 + 0.45 * Math.abs(Math.sin(f / 5 + i)) }} />
              <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 25, letterSpacing: "0.08em", color: "#F2DCD8" }}>{i + 1}. {t}</span>
            </div>
          ))}
          <div style={{ margin: "12px 16px 0", padding: "9px 14px", borderRadius: 6, background: TEAL,
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 21, letterSpacing: "0.1em",
            color: "#EAF6F2", textAlign: "center" }}>STINT · 14 DAYS · GREEN</div>
        </div>

        {/* the binned rulebook */}
        <div style={{ position: "absolute", left: 420, top: 336, width: 142, height: 112, zIndex: 9 }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: "6px 6px 12px 12px", background: "#77828A" }} />
          <div style={{ position: "absolute", left: -8, top: -12, right: -8, height: 20, borderRadius: 5, background: "#5D6870" }} />
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ position: "absolute", left: 14 + i * 12, top: -44 + i * 8, width: 104, height: 34,
              borderRadius: 3, background: CARD2, border: `4px solid ${CARD3}`, transform: `rotate(${-14 + i * 13}deg)`,
              boxShadow: SH }} />
          ))}
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 8, textAlign: "center",
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 25, color: "#F0F3F5" }}>−80%</div>
        </div>

        {/* pit lane floor + the car on jacks */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 470, bottom: 0, background: "#9AA3AA", zIndex: 5 }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 470, height: 14, background: "#7C868D", zIndex: 5 }} />
        {Array.from({ length: 7 }, (_, i) => (
          <div key={i} style={{ position: "absolute", left: -30 + i * 160, top: 486, width: 96, height: 12, borderRadius: 6,
            background: "#EDF1F3", zIndex: 6 }} />
        ))}
        {/* the machine being set up */}
        <div style={{ position: "absolute", left: 54, top: 512, width: 396, height: 118, zIndex: 10 }}>
          <div style={{ position: "absolute", left: 0, top: 38, width: 396, height: 56, borderRadius: "32px 14px 10px 28px",
            background: CLAY, boxShadow: SH_D }} />
          <div style={{ position: "absolute", left: 28, top: 38, width: 340, height: 13, borderRadius: 8, background: "#E79A7E" }} />
          <div style={{ position: "absolute", left: 274, top: 6, width: 100, height: 40, borderRadius: "10px 10px 0 0", background: "#2E3A44" }} />
          <div style={{ position: "absolute", left: -12, top: 60, width: 70, height: 16, borderRadius: 4, background: "#3B4650" }} />
          {[42, 292].map((wx, i) => (
            <div key={i} style={{ position: "absolute", left: wx, top: 80, width: 68, height: 68, borderRadius: "50%", background: "#2A2F33" }}>
              <div style={{ position: "absolute", left: 18, top: 18, width: 32, height: 32, borderRadius: "50%", background: "#8D959B" }} />
            </div>
          ))}
          <Mark x={172} y={48} d={56} c={"#FFFFFF"} z={12} />
        </div>

        {/* the engineer with the setup sheet */}
        <div style={{ position: "absolute", left: 704, top: 656 - 268 * 0.94, zIndex: 12,
          filter: "drop-shadow(0 16px 22px rgba(26,24,20,0.34))" }}>
          <Mascot lf={f} size={268} constr={1} nodAmp={2} nodSpeed={13} gaze={-2} />
        </div>

        <Claim y={126} x={54} kick="FIX THE SETUP" big={"NOT THE\nPROMPT"} c={RED} w={520} />
      </Panel>
      <SoloCaption words={["The", "guy", "who", "built"]} hot={1} />
    </AbsoluteFill>
  );
};
