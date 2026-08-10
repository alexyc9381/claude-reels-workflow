import React from "react";
import { AbsoluteFill, useCurrentFrame, Img, staticFile } from "remotion";
import { inter } from "./fonts";
import { Bg, Panel, ProgressBar, HookHeader, Caption, AssemblyCtx, hexA } from "./SlopKit";
import { Dev, Meter, Chip, PW, PH, INKD, RED, RED_D, AMBER, GO, GOLD, CARD } from "./KeyWorld";
import {
  Gem, Halo, Pedestal, Room, Sparks, Orbit, G1, G2, G3, G4, G5, KEY_BLUE,
} from "./KeyRelic";
import { E, osc, rnd, OUT, IO, BACK } from "./MissionWorld";

/* =========================================================================
   REEL 83 "KEY" · ALTERNATE HOOKS B AND C.

   ⛔ IG suppresses near-duplicate uploads, so a trial set has to differ where
   it is actually measured (memory `feedback_trial_reel_variants`): the HOOK,
   the bed, per-scene camera offset, the transition kit and the caption band.
   The hook carries the delta — the shared body is the weak half — so these two
   are built as genuinely different OPENS, not recolours of A.

     A (shipped) · THE RELIC — the gem on its pedestal, object-first.
     B · THE PRICE  — villain-first. The bill climbs before any gem exists.
     C · THE COUNT  — quantity-first. One gem becomes 134, then collapses back.

   The near-black room is deliberate and stays: it was an explicit instruction
   and it is the reason this world ranks a frame at all (reel 84 measured a
   cream room at 1.24 vs a dark one at 2.92). The documented frame-0 luma
   override in ClaudeKeyReel.tsx therefore applies to B and C as well.
   ========================================================================= */

const SoloCap: React.FC<{ words: string[]; hot?: number }> = (p) =>
  React.useContext(AssemblyCtx) ? null : <Caption {...p} />;

const HEAD = { big: "134 FREE AI APIS", hot: "ONE REPO NOBODY KNOWS" };

const Shot: React.FC<{ f: number; a: number; b: number; k?: number; children: React.ReactNode }> =
  ({ f, a, b, k = 0, children }) => {
  if (f < a || f >= b) return null;
  const t = Math.min(1, (f - a) / 26), e = t * t * (3 - 2 * t);
  const z = [1.08 - e * 0.07, 1.01 + e * 0.06, 1.06 - e * 0.05, 1.02 + e * 0.05][k % 4];
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden",
      transform: `scale(${z})`, transformOrigin: "50% 54%" }}>{children}</div>
  );
};

const Flash: React.FC<{ f: number; cuts: number[]; c?: string }> = ({ f, cuts, c = "#DFF3FF" }) => (<>
  {cuts.map((cf) => {
    const k = f - cf;
    if (k < 0 || k > 2) return null;
    return <div key={cf} style={{ position: "absolute", inset: 0, background: c,
      opacity: (1 - k / 2) * 0.3, zIndex: 44 }} />;
  })}
</>);

/* ========================================================== B · THE PRICE ==
   Villain first. Four shots, a beat SLOWER at the open than A so the two do
   not share a cut rhythm either.
   ========================================================================= */
export const KEY_B_CUTS = [46, 78, 120];

export const KeyHookB: React.FC = () => {
  const f = useCurrentFrame();
  const [C1, C2, C3] = KEY_B_CUTS;
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <HookHeader f={f + 12} big={HEAD.big} hot={HEAD.hot} />
      <Panel glow={hexA(RED, 0.30)}>

        {/* 1 · THE BILL. No gem yet. The number climbs on its own.
              ⛔ MEASURED: the meter alone left an 18-frame dead run — a digit
              changing is a few hundred pixels on a 1012x792 panel, invisible to
              the metric and nearly so to the eye. Charges now LAND across the
              whole shot, which is both the fix and the better image. */}
        <Shot f={f} a={0} b={C1} k={0}>
          <Room f={f} horizon={620} />
          <Meter f={f} x={236} y={168} s={1.5} rate={3.6} label="WHAT YOU PAY" z={26} />
          {Array.from({ length: 14 }, (_, i) => {
            const at = 2 + i * 3;
            if (f < at) return null;
            const t = E(f, at, at + 8, 0, 1, BACK);
            return (
              <div key={`ch${i}`} style={{ position: "absolute", left: 322 + (i % 5) * 82,
                top: 596 - Math.floor(i / 5) * 66, width: 70, height: 54, borderRadius: 8,
                background: i % 2 ? "#B85A3E" : RED_D, zIndex: 20,
                transform: `scale(${t}) translateY(${(1 - t) * -90}px)` }} />
            );
          })}
          <Dev f={f} x={62} y={396} size={288} gaze={2} shock={f > 26 ? 0.85 : 0.55}
               nodAmp={f > 26 ? 4.4 : 2} nodSpeed={f > 26 ? 6 : 15} z={24} />
          <Chip y={716} text="EVERY SINGLE CALL" c={RED} />
        </Shot>

        {/* 2 · THE THING THAT STOPS IT. One gem, arriving hard. */}
        <Shot f={f} a={C1} b={C2} k={1}>
          <Room f={f} horizon={640} />
          <Halo f={f} cx={506} cy={352} r={E(f, C1, C1 + 22, 60, 372, BACK)} z={6} />
          <Pedestal x={356} y={540} s={1.0} z={14} />
          <Gem f={f} x={356} y={E(f, C1 + 1, C1 + 20, -320, 206, BACK)} s={1.2} z={20} />
          <Sparks f={f} cx={506} cy={352} r={296} n={5} z={22} />
          <Chip y={130} text="ONE FREE REPO" c={GO} />
        </Shot>

        {/* 3 · IT ZEROES. The meter is the graphic; the number moves to its value. */}
        <Shot f={f} a={C2} b={C3} k={2}>
          <Room f={f} horizon={604} />
          <Halo f={f} cx={636} cy={332} r={288} z={6} />
          <Gem f={f} x={528} y={202} s={0.94} z={20} />
          <Meter f={f} x={54} y={196} s={1.12} stop label="NOW" z={26} />
          <Sparks f={f} cx={636} cy={332} r={244} n={4} z={22} />
          {/* the three products, as OFFICIAL marks — B has no plinths beat, so the
              logos land here, which is B's 3-second mark (shot 3 = 2.80-4.00s) */}
          {[["CURSOR", "cursor.svg"], ["CLAUDE CODE", "claude.svg"], ["CODEX", "openai.png"]].map(([t, lg], i) => {
            const tt = E(f, C2 + 1 + i * 2, C2 + 8 + i * 2, 0, 1, BACK);
            return (
              <div key={t} style={{ position: "absolute", left: 44 + i * 316, top: 600 + (1 - tt) * 150,
                width: 284, height: 62, borderRadius: 10, background: "#F7F3EA", zIndex: 30,
                transform: `scale(${Math.max(0.02, tt)})`, display: "flex", alignItems: "center",
                justifyContent: "center", gap: 12, boxShadow: "0 8px 12px rgba(6,10,16,0.6)" }}>
                <Img src={staticFile(`logos/${lg}`)}
                     style={{ width: 32, height: 32, objectFit: "contain", display: "block" }} />
                <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 22,
                  letterSpacing: "0.04em", color: "#241F1A", whiteSpace: "nowrap" }}>{t}</div>
              </div>
            );
          })}
          <Chip y={130} text="SAME MODELS. ZERO." c={GO} />
        </Shot>

        {/* 4 · WHOSE. The providers arrive around it. */}
        <Shot f={f} a={C3} b={9999} k={3}>
          <Room f={f} horizon={690} />
          <Halo f={f} cx={506} cy={386} r={400} z={6} />
          <Orbit f={f} cx={506} cy={392} rx={430} ry={146} n={10} speed={0.030} d={94} gemZ={20} />
          <Gem f={f} x={342} y={224} s={1.36} z={20} />
          <div style={{ position: "absolute", left: 0, right: 0, top: 70, textAlign: "center",
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 128, lineHeight: 1,
            letterSpacing: "-0.04em", color: G2, zIndex: 26 }}>134</div>
          <Sparks f={f} cx={506} cy={386} r={330} n={4} z={22} />
        </Shot>

        <Flash f={f} cuts={KEY_B_CUTS} />
      </Panel>
      <SoloCap words={["Because", "of", "one", "GitHub"]} hot={2} />
    </AbsoluteFill>
  );
};

/* =========================================================== C · THE RING ==
   ⛔ REBUILT. The first version of C opened on a bare gem and then a field of 34
   small gems, and it dropped the ORBITING PROVIDER LOGOS entirely — the single
   most interesting thing in this world. Differentiating a variant by removing
   its best element makes it a worse reel, not a different one.

   So C now leads WITH the logos and differs from A by ORDER, not by subtraction:
     A · the gem is already there, the ring turns around it.
     C · the RING turns around an EMPTY centre, tightening, and the gem drops in.
   The ring also spins the opposite way from A (negative speed), so the two opens
   never share a frame even where both show the same ten marks.
   ========================================================================= */
export const KEY_C_CUTS = [30, 58, 80, 118];

export const KeyHookC: React.FC = () => {
  const f = useCurrentFrame();
  const [C1, C2, C3, C4] = KEY_C_CUTS;
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <HookHeader f={f + 12} big={HEAD.big} hot={HEAD.hot} />
      <Panel glow={hexA(KEY_BLUE, 0.34)}>

        {/* 1 · THE RING, EMPTY. Ten provider marks turning around nothing, closing in. */}
        <Shot f={f} a={0} b={C1} k={0}>
          <Room f={f} horizon={640} />
          <Orbit f={f} cx={506} cy={362} rx={E(f, 0, C1, 486, 384, IO)} ry={E(f, 0, C1, 178, 140, IO)}
                 n={10} speed={-0.030} d={108} gemZ={20} />
          <Sparks f={f} cx={506} cy={362} r={300} n={5} z={12} />
          <Chip y={716} text="EVERY MODEL YOU PAY FOR" c={AMBER} />
        </Shot>

        {/* 2 · IT DROPS IN. The centre fills; the ring never stops turning. */}
        <Shot f={f} a={C1} b={C2} k={1}>
          <Room f={f} horizon={620} />
          <Halo f={f} cx={506} cy={336} r={E(f, C1 + 6, C1 + 22, 40, 340, BACK)} z={6} />
          <Orbit f={f} cx={506} cy={340} rx={372} ry={134} n={10} speed={-0.030} d={100} gemZ={20} />
          <Pedestal x={356} y={528} s={1.0} z={14} />
          <Gem f={f} x={356} y={E(f, C1 + 1, C1 + 18, -340, 196, BACK)} s={1.18} z={20} />
          <Sparks f={f} cx={506} cy={336} r={286} n={5} z={22} />
          <Chip y={130} text="ONE FREE REPO" c={GO} />
        </Shot>

        {/* 3 · THE COUNT. The ring opens out and 134 lands. */}
        <Shot f={f} a={C2} b={C3} k={2}>
          <Room f={f} horizon={700} />
          <Halo f={f} cx={506} cy={396} r={420} z={6} />
          <Orbit f={f} cx={506} cy={400} rx={E(f, C2, C2 + 26, 360, 452, OUT)} ry={152}
                 n={10} speed={-0.036} d={94} phase={0.7} gemZ={20} />
          <Gem f={f} x={330} y={232} s={1.44} z={20} />
          <div style={{ position: "absolute", left: 0, right: 0, top: 68, textAlign: "center",
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 132, lineHeight: 1,
            letterSpacing: "-0.04em", color: G2, zIndex: 26 }}>134</div>
          <Sparks f={f} cx={506} cy={396} r={340} n={5} z={22} />
        </Shot>

        {/* 4 · WHERE IT GOES. The 3.00s mark — official marks land by frame 90. */}
        <Shot f={f} a={C3} b={C4} k={3}>
          <Room f={f} horizon={604} />
          {[["CURSOR", "cursor.svg"], ["CLAUDE CODE", "claude.svg"], ["CODEX", "openai.png"]].map(([t, lg], i) => {
            const dy = (1 - E(f, C3 + 1 + i * 2, C3 + 8 + i * 2, 0, 1, BACK)) * 430;
            return (
              <React.Fragment key={t}>
                <Halo f={f + i * 9} cx={172 + i * 330} cy={392 + dy} r={168} z={5} />
                <Pedestal x={22 + i * 330} y={470 + dy} s={0.78} label={t} logo={lg} z={14 + i} />
                <Gem f={f + i * 11} x={70 + i * 330} y={262 + dy} s={0.56} z={20 + i} />
              </React.Fragment>
            );
          })}
          <Chip y={116} text="ONE CLICK SETUP" c={AMBER} />
        </Shot>

        {/* 5 · AND IT IS FREE. */}
        <Shot f={f} a={C4} b={9999} k={0}>
          <Room f={f} horizon={620} />
          <Halo f={f} cx={636} cy={330} r={306} z={6} />
          <Orbit f={f} cx={636} cy={336} rx={318} ry={112} n={8} speed={-0.024} d={86} phase={1.4} gemZ={20} />
          <Gem f={f} x={506} y={196} s={1.02} z={20} />
          <Dev f={f} x={40} y={378} size={300} gaze={2} cheer={0.95} nodAmp={3.4} nodSpeed={8} z={24} />
          <Meter f={f} x={62} y={128} s={0.62} stop label="YOUR BILL" z={30} />
          <Sparks f={f} cx={636} cy={330} r={256} n={4} z={22} />
          <Chip y={716} text="ZERO. FOREVER." c={GO} />
        </Shot>

        <Flash f={f} cuts={KEY_C_CUTS} />
      </Panel>
      <SoloCap words={["Because", "of", "one", "GitHub"]} hot={2} />
    </AbsoluteFill>
  );
};
