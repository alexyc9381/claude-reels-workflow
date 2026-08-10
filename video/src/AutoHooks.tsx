import React from "react";
import { AbsoluteFill, useCurrentFrame, Img, staticFile } from "remotion";
import { inter } from "./fonts";
import { Bg, Panel, ProgressBar, HookHeader, Caption, AssemblyCtx, hexA } from "./SlopKit";
import { Dev } from "./KeyWorld";
import { Halo, Pedestal, Room, Sparks } from "./KeyRelic";
import {
  Switch, FileRelic, Machine, NightBlock, Domino, LampWall, DoorRow, BrandTile, AChip,
  AUTO_BRANDS, AUTO_CATS, A1, A2, A3, A4, A5, AUTO_AMBER, STEEL, STEEL_L, STEEL_D,
  CARD, INKD, MUTE, RED, RED_D, GO, BLUE, NIGHT, NIGHT_L,
} from "./AutoWorld";
import { E, osc, rnd, OUT, IO, BACK, IN_Q } from "./MissionWorld";

/* =========================================================================
   REEL 85 "AUTO" · FIVE CANDIDATE HOOKS.

   Brief: "hierarchical, simple, like the gem idea, easy to understand, and
   clear immediately to our target audience what the video is about."

   So all five follow the relic's rule exactly — near-black room, ONE lit object
   on a plinth, everything else falls away — and share its chassis, which makes
   them directly comparable rather than five different looks.

     A · THE SWITCH  one lever thrown, 280 lamps ignite in a wave
     B · THE FILE    one .json on a plinth, splitting into 280
     C · THE MACHINE a rig turning with nobody near it, output stacking up
     D · THE WINDOW  one lit window in a black block, everyone else asleep
     E · THE DOMINO  one tile pushed, the run leaves through 18 doors

   ⛔ Frame-0 luma sits under the 140 bar in all five, exactly as reel 83 does.
   That override is inherited on purpose: "mostly black" IS the approved look and
   it is the reason this world can rank a frame at all (cream 1.24 vs dark 2.92).
   ========================================================================= */

const SoloCap: React.FC<{ words: string[]; hot?: number }> = (p) =>
  React.useContext(AssemblyCtx) ? null : <Caption {...p} />;

const HEAD = { big: "280 AUTOMATIONS, FREE", hot: "ONE GITHUB REPO" };

/** 5.56s — the measured onset of "Your inbox sorts itself" */
export const AUTO_HOOK_LEN = 167;

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

const Flash: React.FC<{ f: number; cuts: number[] }> = ({ f, cuts }) => (<>
  {cuts.map((cf) => {
    const k = f - cf;
    if (k < 0 || k > 2) return null;
    return <div key={cf} style={{ position: "absolute", inset: 0, background: "#FFF6E2",
      opacity: (1 - k / 2) * 0.3, zIndex: 44 }} />;
  })}
</>);

/** the repo line, so the FIRST thing read is "this is a free GitHub repo" */
const RepoBadge: React.FC<{ t?: number; y?: number }> = ({ t = 1, y = 690 }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top: y, display: "flex",
    justifyContent: "center", zIndex: 32, opacity: t }}>
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 22px",
      borderRadius: 10, background: CARD, boxShadow: "0 8px 14px rgba(0,0,0,0.6)" }}>
      <Img src={staticFile("logos/github.svg")}
           style={{ width: 30, height: 30, objectFit: "contain", display: "block" }} />
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 25,
        letterSpacing: "0.02em", color: INKD, whiteSpace: "nowrap" }}>24,302 ★ · 280 WORKFLOWS</div>
    </div>
  </div>
);

const wrap = (glow: string, f: number, cuts: number[], children: React.ReactNode) => (
  <AbsoluteFill>
    <Bg /><ProgressBar />
    <HookHeader f={f + 12} big={HEAD.big} hot={HEAD.hot} />
    <Panel glow={hexA(glow, 0.32)}>
      {children}
      <Flash f={f} cuts={cuts} />
    </Panel>
    <SoloCap words={["There's", "a", "GitHub", "repo"]} hot={2} />
  </AbsoluteFill>
);

/* =============================================================== A · SWITCH ==
   One lever. Throw it and 280 lamps light in a wave. The clearest possible
   statement of "you do one thing, everything else runs".
   ========================================================================== */
export const AUTO_A_CUTS = [46, 88, 126];

export const AutoHookA: React.FC = () => {
  const f = useCurrentFrame();
  const [C1, C2, C3] = AUTO_A_CUTS;
  const thrown = E(f, 26, 40, 0, 1, BACK);
  return wrap(AUTO_AMBER, f, AUTO_A_CUTS, <>
    {/* 1 · the switch alone, then thrown */}
    <Shot f={f} a={0} b={C1} k={0}>
      <Room f={f} horizon={640} />
      <Halo f={f} cx={506} cy={330} r={E(f, 0, 18, 120, 300, OUT)} z={6} />
      <Pedestal x={356} y={506} s={1.0} z={14} />
      <Switch f={f} x={376} y={214} s={1.0} on={thrown} z={20} />
      <Sparks f={f} cx={506} cy={330} r={276} n={4} z={22} />
      <AChip y={690} text="ONE SWITCH" c={RED} />
    </Shot>

    {/* 2 · 280 lamps ignite outward from it */}
    <Shot f={f} a={C1} b={C2} k={1}>
      <Room f={f} horizon={760} />
      <LampWall f={f} x={66} y={150} cols={20} rows={14} d={44}
                on={E(f, C1 + 2, C1 + 30, 0, 1.5, OUT)} z={10} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 40, textAlign: "center",
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 118, lineHeight: 1,
        letterSpacing: "-0.04em", color: A1, zIndex: 26 }}>280</div>
      <AChip y={696} text="AUTOMATIONS, ALREADY BUILT" c={GO} size={32} />
    </Shot>

    {/* 3 · whose */}
    <Shot f={f} a={C2} b={C3} k={2}>
      <Room f={f} horizon={660} />
      {AUTO_BRANDS.map((b, i) => (
        <BrandTile key={b.slug} x={62 + i * 226} y={286} s={1.02} slug={b.slug} name={b.name}
                   t={E(f, C2 + 2 + i * 5, C2 + 18 + i * 5, 0, 1, BACK)} z={26} />
      ))}
      <AChip y={132} text="GMAIL. SLACK. WHATSAPP. NOTION." c={BLUE} size={30} />
    </Shot>

    {/* 4 · it is a repo */}
    <Shot f={f} a={C3} b={9999} k={3}>
      <Room f={f} horizon={640} />
      <Halo f={f} cx={506} cy={340} r={306} z={6} />
      <Pedestal x={356} y={514} s={1.0} z={14} />
      <Switch f={f} x={376} y={222} s={1.0} on={1} z={20} />
      <Dev f={f} x={26} y={430} size={252} gaze={1} cheer={0.9} nodAmp={3.4} nodSpeed={9} z={24} />
      <Sparks f={f} cx={506} cy={340} r={262} n={4} z={22} />
      <RepoBadge y={690} />
    </Shot>
  </>);
};

/* ================================================================= B · FILE ==
   The closest sibling of the gem: one object on a plinth. Here it is the file
   you actually download.
   ========================================================================== */
export const AUTO_B_CUTS = [42, 84, 126];

export const AutoHookB: React.FC = () => {
  const f = useCurrentFrame();
  const [C1, C2, C3] = AUTO_B_CUTS;
  return wrap(A3, f, AUTO_B_CUTS, <>
    {/* 1 · the file, alone */}
    <Shot f={f} a={0} b={C1} k={0}>
      <Room f={f} horizon={640} />
      <Halo f={f} cx={506} cy={330} r={E(f, 0, 18, 110, 306, OUT)} z={6} />
      <Pedestal x={356} y={506} s={1.0} z={14} />
      <FileRelic f={f} x={396} y={214} s={1.0} z={20} />
      <Sparks f={f} cx={506} cy={330} r={276} n={4} z={22} />
      <AChip y={690} text="ONE FILE" c={RED} />
    </Shot>

    {/* 2 · it splits into 280 */}
    <Shot f={f} a={C1} b={C2} k={1}>
      <Room f={f} horizon={720} />
      {Array.from({ length: 60 }, (_, i) => {
        const t = E(f, C1 + 1 + (i % 20) * 0.9, C1 + 22 + (i % 20) * 0.9, 0, 1, OUT);
        if (t <= 0.02) return null;
        const ang = (i / 60) * Math.PI * 2, rad = t * (250 + rnd(i, 3) * 190);
        return (
          <div key={i} style={{ position: "absolute",
            left: 486 + Math.cos(ang) * rad, top: 348 + Math.sin(ang) * rad * 0.62,
            width: 30, height: 38, borderRadius: 4, background: i % 3 ? A2 : A3,
            transform: `rotate(${ang * 30}deg)`, zIndex: 18, opacity: Math.min(1, t * 2) }} />
        );
      })}
      <div style={{ position: "absolute", left: 0, right: 0, top: 300, textAlign: "center",
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 136, lineHeight: 1,
        letterSpacing: "-0.04em", color: A1, zIndex: 30,
        transform: `scale(${E(f, C1 + 8, C1 + 24, 0.6, 1, BACK)})` }}>280</div>
      <AChip y={696} text="READY TO RUN" c={GO} />
    </Shot>

    {/* 3 · whose */}
    <Shot f={f} a={C2} b={C3} k={2}>
      <Room f={f} horizon={660} />
      {AUTO_BRANDS.map((b, i) => (
        <BrandTile key={b.slug} x={62 + i * 226} y={286} s={1.02} slug={b.slug} name={b.name}
                   t={E(f, C2 + 2 + i * 5, C2 + 18 + i * 5, 0, 1, BACK)} z={26} />
      ))}
      <AChip y={132} text="GMAIL. SLACK. WHATSAPP. NOTION." c={BLUE} size={30} />
    </Shot>

    {/* 4 · it is a repo */}
    <Shot f={f} a={C3} b={9999} k={3}>
      <Room f={f} horizon={640} />
      <Halo f={f} cx={506} cy={336} r={300} z={6} />
      <Pedestal x={356} y={510} s={1.0} z={14} />
      <FileRelic f={f} x={396} y={220} s={1.0} z={20} />
      <Dev f={f} x={26} y={430} size={252} gaze={1} cheer={0.9} nodAmp={3.4} nodSpeed={9} z={24} />
      <Sparks f={f} cx={506} cy={336} r={258} n={4} z={22} />
      <RepoBadge y={690} />
    </Shot>
  </>);
};

/* ============================================================== C · MACHINE ==
   The rig turns and stacks finished work with nobody near it. States the
   benefit rather than the mechanism.
   ========================================================================== */
export const AUTO_C_CUTS = [48, 90, 128];

export const AutoHookC: React.FC = () => {
  const f = useCurrentFrame();
  const [C1, C2, C3] = AUTO_C_CUTS;
  return wrap(A2, f, AUTO_C_CUTS, <>
    {/* 1 · it is running, and nobody is there */}
    <Shot f={f} a={0} b={C1} k={0}>
      <Room f={f} horizon={660} />
      <Halo f={f} cx={506} cy={340} r={E(f, 0, 18, 120, 312, OUT)} z={6} />
      <Pedestal x={356} y={520} s={1.0} z={14} />
      <Machine f={f} x={356} y={222} s={1.0} run={1} z={20} />
      <Sparks f={f} cx={506} cy={340} r={286} n={4} z={22} />
      <AChip y={690} text="NOBODY IS TOUCHING THIS" c={RED} size={34} />
    </Shot>

    {/* 2 · 280 of them, all turning */}
    <Shot f={f} a={C1} b={C2} k={1}>
      <Room f={f} horizon={760} />
      <LampWall f={f} x={66} y={150} cols={20} rows={14} d={44}
                on={E(f, C1 + 2, C1 + 28, 0, 1.5, OUT)} z={10} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 40, textAlign: "center",
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 118, lineHeight: 1,
        letterSpacing: "-0.04em", color: A1, zIndex: 26 }}>280</div>
      <AChip y={696} text="RUNNING WHILE YOU SLEEP" c={GO} size={32} />
    </Shot>

    {/* 3 · whose */}
    <Shot f={f} a={C2} b={C3} k={2}>
      <Room f={f} horizon={660} />
      {AUTO_BRANDS.map((b, i) => (
        <BrandTile key={b.slug} x={62 + i * 226} y={286} s={1.02} slug={b.slug} name={b.name}
                   t={E(f, C2 + 2 + i * 5, C2 + 18 + i * 5, 0, 1, BACK)} z={26} />
      ))}
      <AChip y={132} text="GMAIL. SLACK. WHATSAPP. NOTION." c={BLUE} size={30} />
    </Shot>

    {/* 4 · it is a repo */}
    <Shot f={f} a={C3} b={9999} k={3}>
      <Room f={f} horizon={660} />
      <Halo f={f} cx={506} cy={344} r={300} z={6} />
      <Pedestal x={356} y={524} s={1.0} z={14} />
      <Machine f={f} x={356} y={226} s={1.0} run={1} z={20} />
      <Dev f={f} x={26} y={434} size={248} gaze={1} cheer={0.9} nodAmp={3.4} nodSpeed={9} z={24} />
      <RepoBadge y={690} />
    </Shot>
  </>);
};

/* =============================================================== D · WINDOW ==
   One lit window in a black block. The contrast IS the hook: everyone else is
   dark, your work is being done.
   ========================================================================== */
export const AUTO_D_CUTS = [46, 88, 126];

export const AutoHookD: React.FC = () => {
  const f = useCurrentFrame();
  const [C1, C2, C3] = AUTO_D_CUTS;
  return wrap(A2, f, AUTO_D_CUTS, <>
    {/* 1 · the block at night, one window on */}
    <Shot f={f} a={0} b={C1} k={0}>
      <div style={{ position: "absolute", inset: 0, background: NIGHT }} />
      <NightBlock f={f} lit={26} z={8} />
      <AChip y={706} text="3 AM. YOURS IS STILL WORKING." c={RED} size={30} />
    </Shot>

    {/* 2 · inside: 280 jobs completing */}
    <Shot f={f} a={C1} b={C2} k={1}>
      <Room f={f} horizon={760} />
      <LampWall f={f} x={66} y={150} cols={20} rows={14} d={44}
                on={E(f, C1 + 2, C1 + 30, 0, 1.5, OUT)} z={10} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 40, textAlign: "center",
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 118, lineHeight: 1,
        letterSpacing: "-0.04em", color: A1, zIndex: 26 }}>280</div>
      <AChip y={696} text="JOBS DONE BY MORNING" c={GO} size={32} />
    </Shot>

    {/* 3 · whose */}
    <Shot f={f} a={C2} b={C3} k={2}>
      <Room f={f} horizon={660} />
      {AUTO_BRANDS.map((b, i) => (
        <BrandTile key={b.slug} x={62 + i * 226} y={286} s={1.02} slug={b.slug} name={b.name}
                   t={E(f, C2 + 2 + i * 5, C2 + 18 + i * 5, 0, 1, BACK)} z={26} />
      ))}
      <AChip y={132} text="GMAIL. SLACK. WHATSAPP. NOTION." c={BLUE} size={30} />
    </Shot>

    {/* 4 · it is a repo */}
    <Shot f={f} a={C3} b={9999} k={3}>
      <Room f={f} horizon={640} />
      <Halo f={f} cx={506} cy={336} r={300} z={6} />
      <Pedestal x={356} y={510} s={1.0} z={14} />
      <FileRelic f={f} x={396} y={220} s={1.0} z={20} />
      <Dev f={f} x={26} y={430} size={252} gaze={1} cheer={0.9} nodAmp={3.4} nodSpeed={9} z={24} />
      <Sparks f={f} cx={506} cy={336} r={258} n={4} z={22} />
      <RepoBadge y={690} />
    </Shot>
  </>);
};

/* =============================================================== E · DOMINO ==
   One tile pushed, the run leaves through 18 doors. The product IS a cascade.
   ========================================================================== */
export const AUTO_E_CUTS = [44, 86, 126];

export const AutoHookE: React.FC = () => {
  const f = useCurrentFrame();
  const [C1, C2, C3] = AUTO_E_CUTS;
  return wrap(A3, f, AUTO_E_CUTS, <>
    {/* 1 · one tile, then the push */}
    <Shot f={f} a={0} b={C1} k={0}>
      <Room f={f} horizon={620} />
      <Halo f={f} cx={506} cy={368} r={E(f, 0, 18, 110, 286, OUT)} z={6} />
      <Pedestal x={356} y={490} s={1.0} z={14} />
      <Domino f={f} x={484} y={318} s={1.5} fall={E(f, 28, 42, 0, 1, IN_Q)} c={A1} z={20} />
      <Sparks f={f} cx={506} cy={368} r={262} n={4} z={22} />
      <AChip y={690} text="YOU PUSH ONE" c={RED} />
    </Shot>

    {/* 2 · the run — 280 tiles going down across the frame */}
    <Shot f={f} a={C1} b={C2} k={1}>
      <Room f={f} horizon={700} />
      {Array.from({ length: 3 }, (_, row) =>
        Array.from({ length: 26 }, (_, i) => {
          const idx = row * 26 + i;
          const hit = E(f, C1 + 2 + idx * 0.42, C1 + 8 + idx * 0.42, 0, 1, IN_Q);
          return (
            <Domino key={idx} f={f} x={22 + i * 38} y={200 + row * 168} s={0.82} fall={hit}
                    c={[A1, A2, A3][row]} z={18 + row} />
          );
        })
      )}
      <div style={{ position: "absolute", left: 0, right: 0, top: 62, textAlign: "center",
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 112, lineHeight: 1,
        letterSpacing: "-0.04em", color: A1, zIndex: 30 }}>280</div>
      <AChip y={700} text="THE REST RUN THEMSELVES" c={GO} size={32} />
    </Shot>

    {/* 3 · whose */}
    <Shot f={f} a={C2} b={C3} k={2}>
      <Room f={f} horizon={660} />
      {AUTO_BRANDS.map((b, i) => (
        <BrandTile key={b.slug} x={62 + i * 226} y={286} s={1.02} slug={b.slug} name={b.name}
                   t={E(f, C2 + 2 + i * 5, C2 + 18 + i * 5, 0, 1, BACK)} z={26} />
      ))}
      <AChip y={132} text="GMAIL. SLACK. WHATSAPP. NOTION." c={BLUE} size={30} />
    </Shot>

    {/* 4 · it is a repo */}
    <Shot f={f} a={C3} b={9999} k={3}>
      <Room f={f} horizon={640} />
      <Halo f={f} cx={506} cy={336} r={300} z={6} />
      <Pedestal x={356} y={510} s={1.0} z={14} />
      <FileRelic f={f} x={396} y={220} s={1.0} z={20} />
      <Dev f={f} x={26} y={430} size={252} gaze={1} cheer={0.9} nodAmp={3.4} nodSpeed={9} z={24} />
      <Sparks f={f} cx={506} cy={336} r={258} n={4} z={22} />
      <RepoBadge y={690} />
    </Shot>
  </>);
};
