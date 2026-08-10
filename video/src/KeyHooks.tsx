import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { inter } from "./fonts";
import { Bg, Panel, ProgressBar, HookHeader, Caption, AssemblyCtx, hexA } from "./SlopKit";
import {
  Dev, KeyProp, Meter, Booth, DoorWall, Tap, Provider, Chip, Plaza, Vault, Yard,
  PW, PH, ASPH, STEEL, STEEL_L, STEEL_D, BOOTH, BOOTH_D, LINE, CARD, INKD,
  RED, RED_D, AMBER, GO, GO_L, GOLD, E, osc, rnd, OUT, IO, BACK, SH, SH_D,
} from "./KeyWorld";

const SoloCap: React.FC<{ words: string[]; hot?: number }> = (p) =>
  React.useContext(AssemblyCtx) ? null : <Caption {...p} />;

/* =========================================================================
   REEL 83 "KEY" · THREE HOOK CONCEPTS (docs/THE-OPEN.md step 1).

   Three genuinely different WORLDS, not one world in three colourways. Each
   maps the VO element-by-element — the table is in storyboards/83-key.md, and
   a concept that cannot fill that table is not a candidate.

     A · THE TOLL PLAZA — everyone queues to pay per call; one lane is open
     B · THE KEY VAULT  — a wall of 134 locked doors; one key opens all of them
     C · THE METER YARD — 40 trunk lines, 134 taps, every one on a cost meter

   Every concept holds to the same gates: 6 shots, none under 0.70s, frame-0
   panel luma >= 140, ONE text chip per shot, matte paints only.
   ========================================================================= */

const HOOK_LEN = 157;

/** a shot with its own push-in; identical contract in all three concepts */
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

const Flash: React.FC<{ f: number; cuts: number[] }> = ({ f, cuts }) => (<>
  {cuts.map((cf) => {
    const k = f - cf;
    if (k < 0 || k > 2) return null;
    return <div key={cf} style={{ position: "absolute", inset: 0, background: "#F2EEE4",
      opacity: (1 - k / 2) * 0.34, zIndex: 40 }} />;
  })}
</>);

const HEAD = { big: "134 FREE AI APIS", hot: "ONE REPO NOBODY KNOWS" };
const PROVIDERS = ["GEMINI", "GROK", "NVIDIA"];

/* ===================== A · THE TOLL PLAZA ================================ */
/* 0.73 · 0.93 · 0.93 · 0.93 · 0.87 · 0.70 s */
export const KEY_CUTS_A = [22, 50, 78, 106, 132];

export const KeyHookA: React.FC = () => {
  const f = useCurrentFrame();
  const [C1, C2, C3, C4, C5] = KEY_CUTS_A;
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <HookHeader f={f + 12} big={HEAD.big} hot={HEAD.hot} />
      <Panel glow={hexA(GOLD, 0.26)}>

        {/* 1 · THE METER. The villain, ticking, before anything else. */}
        <Shot f={f} a={0} b={C1} k={0}>
          <Plaza f={f} horizon={368} />
          <Meter f={f} x={286} y={196} s={1.9} rate={2.2} label="YOUR API BILL" z={20} />
          <Dev f={f} x={44} y={PH - 300} size={300} gaze={2} shock={0.5} nodAmp={2.2} nodSpeed={12} z={16} />
          <Chip y={676} text="EVERY CALL COSTS" c={RED} />
        </Shot>

        {/* 2 · THE PLAZA. Paid lanes backed up, one lane open. */}
        <Shot f={f} a={C1} b={C2} k={1}>
          <Plaza f={f} pan={(f - C1) * 3} horizon={286} />
          <Booth f={f} x={20} y={222} s={0.72} open={0} sign="PAID" z={12} />
          <Booth f={f} x={330} y={222} s={0.72} open={0} sign="PAID" z={12} />
          <Booth f={f} x={648} y={210} s={0.78} open={E(f, C1 + 6, C1 + 20, 0, 1, BACK)} sign="FREE" free z={14} />
          <Meter f={f} x={44} y={148} s={0.5} rate={2.6} label="PAID" z={20} />
          <Meter f={f} x={352} y={148} s={0.5} rate={2.4} label="PAID" z={20} />
          <Meter f={f} x={690} y={132} s={0.5} stop label="FREE" z={20} />
          <Chip y={704} text="ONE LANE IS OPEN" c={GO} />
        </Shot>

        {/* 3 · THE GANTRY. 134, and who is behind it. */}
        <Shot f={f} a={C2} b={C3} k={2}>
          <Plaza f={f} horizon={330} />
          <div style={{ position: "absolute", left: 96, top: 96, width: 820, height: 192, borderRadius: 12,
            background: BOOTH_D, zIndex: 8 }} />
          <div style={{ position: "absolute", left: 0, right: 0, top: 118, textAlign: "center",
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 148, lineHeight: 1,
            letterSpacing: "-0.04em", color: GO_L, zIndex: 10 }}>134</div>
          <div style={{ position: "absolute", left: 0, right: 0, top: 250, textAlign: "center",
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 30, letterSpacing: "0.24em",
            color: "#CFE0EA", zIndex: 10 }}>FREE APIS</div>
          {PROVIDERS.map((p, i) => (
            <Provider key={p} x={112 + i * 268} y={352 + osc(f, 26 + i * 5, 5, i)} name={p}
                      s={1.05} on={f > C2 + 3 + i * 5} z={20} />
          ))}
          <Dev f={f} x={352} y={PH - 292} size={292} gaze={0} cheer={0.7} nodAmp={3} nodSpeed={10} z={16} />
        </Shot>

        {/* 4 · THE BARRIER GOES UP. The turn. */}
        <Shot f={f} a={C3} b={C4} k={3}>
          <Plaza f={f} horizon={296} />
          <Booth f={f} x={112} y={186} s={1.02} open={E(f, C3 + 4, C3 + 22, 0, 1, OUT)} sign="FREE" free z={14} />
          <div style={{ position: "absolute", left: 596, top: 300, zIndex: 22,
            transform: `scale(${0.7 + E(f, C3 + 2, C3 + 18, 0, 0.9, BACK)})` }}>
            <KeyProp s={2.1} rot={-14} />
          </div>
          <Chip y={124} text="A PERMANENT FREE TIER" c={GO} size={35} />
        </Shot>

        {/* 5 · ONE CLICK. Where it actually installs. */}
        <Shot f={f} a={C4} b={C5} k={0}>
          <Plaza f={f} horizon={330} />
          {["CURSOR", "CLAUDE CODE", "CODEX"].map((t, i) => {
            const on = f > C4 + 2 + i * 5;
            return (
              <div key={t} style={{ position: "absolute", left: 90, top: 128 + i * 128, width: 832, height: 106,
                borderRadius: 12, background: CARD, boxShadow: SH_D, zIndex: 18,
                transform: `translateX(${(1 - E(f, C4 + i * 5, C4 + 14 + i * 5, 0, 1, OUT)) * -900}px)` }}>
                <div style={{ position: "absolute", left: 26, top: 26, width: 54, height: 54, borderRadius: 10,
                  background: on ? GO : "#D8D2C6" }} />
                <div style={{ position: "absolute", left: 104, top: 30, fontFamily: inter.fontFamily,
                  fontWeight: 900, fontSize: 46, color: INKD }}>{t}</div>
                <div style={{ position: "absolute", right: 26, top: 34, padding: "8px 18px", borderRadius: 7,
                  background: on ? GO : "#D8D2C6", fontFamily: inter.fontFamily, fontWeight: 900,
                  fontSize: 24, letterSpacing: "0.1em", color: "#FFF6F2" }}>{on ? "FREE" : "..."}</div>
              </div>
            );
          })}
          <Chip y={548} text="ONE CLICK SETUP" c={AMBER} />
        </Shot>

        {/* 6 · THROUGH. The payoff. */}
        <Shot f={f} a={C5} b={9999} k={1}>
          <Plaza f={f} pan={(f - C5) * 9} horizon={300} />
          <Booth f={f} x={-40} y={210} s={0.8} open={1} sign="FREE" free z={12} />
          <Meter f={f} x={640} y={160} s={0.86} stop label="YOUR BILL" z={20} />
          <Dev f={f} x={220 + (f - C5) * 7} y={PH - 316} size={316} step={11} gaze={2} cheer={0.9}
               nodAmp={3.4} nodSpeed={9} hold z={17} />
          <Chip y={124} text="SAME MODELS. ZERO." c={GO} />
        </Shot>

        <Flash f={f} cuts={KEY_CUTS_A} />
      </Panel>
      <SoloCap words={["Because", "of", "one", "GitHub"]} hot={2} />
    </AbsoluteFill>
  );
};

/* ===================== B · THE KEY VAULT ================================= */
/* 0.77 · 0.90 · 0.93 · 0.90 · 0.87 · 0.87 s */
export const KEY_CUTS_B = [23, 50, 78, 105, 131];

export const KeyHookB: React.FC = () => {
  const f = useCurrentFrame();
  const [C1, C2, C3, C4, C5] = KEY_CUTS_B;
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <HookHeader f={f + 12} big={HEAD.big} hot={HEAD.hot} />
      <Panel glow={hexA(STEEL_L, 0.3)}>

        {/* 1 · A LOCKED DOOR AND A COIN SLOT. */}
        <Shot f={f} a={0} b={C1} k={0}>
          <Vault f={f} />
          <div style={{ position: "absolute", left: 262, top: 132, width: 488, height: 470, borderRadius: 14,
            background: STEEL, boxShadow: SH_D, zIndex: 12 }}>
            <div style={{ position: "absolute", left: 22, top: 22, right: 22, height: 26, background: STEEL_L }} />
            <div style={{ position: "absolute", left: 60, top: 132, width: 368, height: 74, borderRadius: 8,
              background: "#2C3542" }} />
            <div style={{ position: "absolute", left: 92, top: 152, width: 304, height: 34, borderRadius: 5,
              background: RED }} />
            <div style={{ position: "absolute", left: 196, top: 268, width: 96, height: 96, borderRadius: "50%",
              background: GOLD }} />
            <div style={{ position: "absolute", left: 232, top: 292, width: 24, height: 48, borderRadius: 5,
              background: "#8A6A1E" }} />
          </div>
          <Meter f={f} x={40} y={620} s={0.8} rate={2.4} label="PER CALL" z={20} />
          <Chip y={104} text="EVERY CALL COSTS" c={RED} />
        </Shot>

        {/* 2 · THE WALL. 134 doors, all shut. */}
        <Shot f={f} a={C1} b={C2} k={2}>
          <Vault f={f} />
          <DoorWall f={f} x={26} y={148} cols={10} rows={5} d={98} open={0} z={12} />
          <Dev f={f} x={-10} y={PH - 288} size={288} gaze={2} shock={0.4} nodAmp={2.4} nodSpeed={12} z={17} />
          <Chip y={706} text="134 LOCKED DOORS" c={RED_D} />
        </Shot>

        {/* 3 · ONE KEY. */}
        <Shot f={f} a={C2} b={C3} k={1}>
          <Vault f={f} />
          <div style={{ position: "absolute", left: 176, top: 268, zIndex: 22,
            transform: `scale(${0.6 + E(f, C2 + 1, C2 + 18, 0, 1.0, BACK)}) rotate(${-16 + osc(f, 30, 3)}deg)` }}>
            <KeyProp s={3.0} />
          </div>
          <div style={{ position: "absolute", left: 0, right: 0, top: 150, textAlign: "center",
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 40, letterSpacing: "0.2em",
            color: INKD, zIndex: 20 }}>ONE REPO</div>
          <Chip y={646} text="OPENS ALL OF THEM" c={GO} />
        </Shot>

        {/* 4 · THE WALL SWINGS OPEN. */}
        <Shot f={f} a={C3} b={C4} k={3}>
          <Vault f={f} />
          <DoorWall f={f} x={26} y={148} cols={10} rows={5} d={98}
                    open={E(f, C3, C3 + 24, 0, 1, IO)} at={C3} z={12} />
          {PROVIDERS.map((p, i) => (
            <Provider key={p} x={96 + i * 280} y={100} name={p} s={1.0} on={f > C3 + 4 + i * 4} z={22} />
          ))}
          <Chip y={706} text="40+ PROVIDERS" c={GO} />
        </Shot>

        {/* 5 · ONE CLICK, THREE EDITORS. */}
        <Shot f={f} a={C4} b={C5} k={0}>
          <Vault f={f} />
          {["CURSOR", "CLAUDE CODE", "CODEX"].map((t, i) => (
            <div key={t} style={{ position: "absolute", left: 78, top: 150 + i * 132, width: 856, height: 110,
              borderRadius: 12, background: CARD, boxShadow: SH_D, zIndex: 18,
              transform: `translateY(${(1 - E(f, C4 + i * 5, C4 + 15 + i * 5, 0, 1, BACK)) * -420}px)` }}>
              <div style={{ position: "absolute", left: 26, top: 28, width: 54, height: 54, borderRadius: 10,
                background: GO }} />
              <div style={{ position: "absolute", left: 104, top: 32, fontFamily: inter.fontFamily,
                fontWeight: 900, fontSize: 46, color: INKD }}>{t}</div>
            </div>
          ))}
          <Chip y={604} text="ONE CLICK SETUP" c={AMBER} />
        </Shot>

        {/* 6 · THE OPEN CORRIDOR. */}
        <Shot f={f} a={C5} b={9999} k={2}>
          <Vault f={f} />
          <DoorWall f={f} x={26} y={148} cols={10} rows={5} d={98} open={1} at={0} z={12} />
          <Meter f={f} x={648} y={608} s={0.8} stop label="YOUR BILL" z={21} />
          <Dev f={f} x={80 + (f - C5) * 6} y={PH - 306} size={306} step={11} gaze={2} cheer={0.9}
               nodAmp={3.4} nodSpeed={9} hold z={20} />
          <Chip y={106} text="SAME MODELS. ZERO." c={GO} />
        </Shot>

        <Flash f={f} cuts={KEY_CUTS_B} />
      </Panel>
      <SoloCap words={["Because", "of", "one", "GitHub"]} hot={2} />
    </AbsoluteFill>
  );
};

/* ===================== C · THE METER YARD ================================ */
/* 0.70 · 0.93 · 0.93 · 0.90 · 0.87 · 0.90 s */
export const KEY_CUTS_C = [21, 49, 77, 104, 130];

export const KeyHookC: React.FC = () => {
  const f = useCurrentFrame();
  const [C1, C2, C3, C4, C5] = KEY_CUTS_C;
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <HookHeader f={f + 12} big={HEAD.big} hot={HEAD.hot} />
      <Panel glow={hexA(GO_L, 0.26)}>

        {/* 1 · A METER ON A PIPE, SPINNING. */}
        <Shot f={f} a={0} b={C1} k={0}>
          <Yard f={f} />
          <Meter f={f} x={272} y={214} s={1.95} rate={2.4} label="COST PER CALL" z={20} />
          <Tap f={f} x={98} y={330} s={1.5} z={14} />
          <Tap f={f} x={856} y={330} s={1.5} z={14} />
          <Chip y={686} text="THE METER NEVER STOPS" c={RED} size={35} />
        </Shot>

        {/* 2 · THE FIELD OF TAPS. */}
        <Shot f={f} a={C1} b={C2} k={1}>
          <Yard f={f} pan={(f - C1) * 4} />
          {Array.from({ length: 14 }, (_, i) => (
            <Tap key={i} f={f} x={26 + (i % 7) * 142} y={330 + Math.floor(i / 7) * 210} s={1.0}
                 free={false} z={12} />
          ))}
          <Dev f={f} x={392} y={PH - 268} size={268} gaze={0} shock={0.45} nodAmp={2.4} nodSpeed={12} z={18} />
          <Chip y={112} text="ALL OF THEM METERED" c={RED_D} size={35} />
        </Shot>

        {/* 3 · 134, ON THE BOARD. */}
        <Shot f={f} a={C2} b={C3} k={2}>
          <Yard f={f} />
          <div style={{ position: "absolute", left: 118, top: 150, width: 776, height: 300, borderRadius: 14,
            background: "#2C3542", boxShadow: SH_D, zIndex: 14 }} />
          <div style={{ position: "absolute", left: 0, right: 0, top: 176, textAlign: "center",
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 168, lineHeight: 1,
            letterSpacing: "-0.04em", color: GO_L, zIndex: 16 }}>134</div>
          <div style={{ position: "absolute", left: 0, right: 0, top: 356, textAlign: "center",
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 32, letterSpacing: "0.24em",
            color: "#CFE0EA", zIndex: 16 }}>FREE, PERMANENTLY</div>
          {PROVIDERS.map((p, i) => (
            <Provider key={p} x={128 + i * 274} y={492} name={p} s={1.05} on={f > C2 + 3 + i * 5} z={20} />
          ))}
        </Shot>

        {/* 4 · ONE LEVER THROWS EVERY VALVE. */}
        <Shot f={f} a={C3} b={C4} k={3}>
          <Yard f={f} />
          {Array.from({ length: 14 }, (_, i) => (
            <Tap key={i} f={f} x={26 + (i % 7) * 142} y={330 + Math.floor(i / 7) * 210} s={1.0}
                 free={f > C3 + 4 + i * 1.4} z={12} />
          ))}
          <div style={{ position: "absolute", left: 402, top: 92, zIndex: 24,
            transform: `scale(${0.7 + E(f, C3 + 1, C3 + 16, 0, 0.8, BACK)}) rotate(${-12}deg)` }}>
            <KeyProp s={1.9} />
          </div>
          <Chip y={112} text="ONE CLICK OPENS ALL" c={GO} size={35} />
        </Shot>

        {/* 5 · WHERE IT INSTALLS. */}
        <Shot f={f} a={C4} b={C5} k={0}>
          <Yard f={f} />
          {["CURSOR", "CLAUDE CODE", "CODEX"].map((t, i) => (
            <div key={t} style={{ position: "absolute", left: 84, top: 140 + i * 130, width: 844, height: 108,
              borderRadius: 12, background: CARD, boxShadow: SH_D, zIndex: 18,
              transform: `translateX(${(1 - E(f, C4 + i * 5, C4 + 15 + i * 5, 0, 1, OUT)) * 920}px)` }}>
              <div style={{ position: "absolute", left: 26, top: 27, width: 54, height: 54, borderRadius: 10,
                background: GO }} />
              <div style={{ position: "absolute", left: 104, top: 31, fontFamily: inter.fontFamily,
                fontWeight: 900, fontSize: 46, color: INKD }}>{t}</div>
            </div>
          ))}
          <Chip y={578} text="ONE CLICK SETUP" c={AMBER} />
        </Shot>

        {/* 6 · YOUR METER, FROZEN. */}
        <Shot f={f} a={C5} b={9999} k={1}>
          <Yard f={f} pan={(f - C5) * 8} />
          {Array.from({ length: 7 }, (_, i) => (
            <Tap key={i} f={f} x={26 + i * 142} y={340} s={1.05} free z={12} />
          ))}
          <Meter f={f} x={606} y={520} s={0.86} stop label="YOUR BILL" z={21} />
          <Dev f={f} x={120 + (f - C5) * 6} y={PH - 310} size={310} step={11} gaze={2} cheer={0.9}
               nodAmp={3.4} nodSpeed={9} hold z={20} />
          <Chip y={112} text="SAME MODELS. ZERO." c={GO} />
        </Shot>

        <Flash f={f} cuts={KEY_CUTS_C} />
      </Panel>
      <SoloCap words={["Because", "of", "one", "GitHub"]} hot={2} />
    </AbsoluteFill>
  );
};
