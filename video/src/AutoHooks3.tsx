import React from "react";
import { AbsoluteFill, useCurrentFrame, Img, staticFile } from "remotion";
import { inter } from "./fonts";
import { Bg, Panel, ProgressBar, HookHeader, Caption, AssemblyCtx, hexA } from "./SlopKit";
import { Dev } from "./KeyWorld";
import {
  NodeGraph, BrandTile, AChip, BrandStack, RepoCard, BRAND_TASKS, AUTO_BRANDS,
  SkylineNight, RackHall, ShadowFloor, CardTower, CardAvalanche, NotifWall,
  CardTowerV, HeroCard,
  A1, A2, A3, CARD, INKD, RED, GO, BLUE, N8N_ACCENT,
} from "./AutoWorld";
import { E, osc, rnd, OUT, IO, BACK, IN_Q } from "./MissionWorld";

/* =========================================================================
   REEL 85 "AUTO" · G VARIANTS — THREE WAYS TO SHOW THE SAME MOUNTAIN OF WORK.

   ⛔ THE NOTE: the opening scene needs a more interesting background and to be
   MORE hierarchical. On pure black there were only TWO tiers — the pile and the
   figure — so nothing receded and the frame read sparse rather than ranked.

   Every variant below adds a subordinate THIRD tier behind, and changes how the
   work itself is drawn. Beats 2-4 are identical across all three, so the only
   thing being compared is the opening image.

     G1 · THE TOWER      a column of branded cards leaving frame, against a night skyline
     G2 · THE AVALANCHE  a diagonal mass burying the figure, in a dim warehouse
     G3 · THE WALL       a scrolling feed floor-to-ceiling, the figure a silhouette before it
   ========================================================================= */

const SoloCap: React.FC<{ words: string[]; hot?: number }> = (p) =>
  React.useContext(AssemblyCtx) ? null : <Caption {...p} />;

const HEAD = { big: "280 AUTOMATIONS, FREE", hot: "ONE GITHUB REPO" };
export const AUTO_HOOK_LEN = 167;
export const G_CUTS = [50, 96, 132];

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

const BigCount: React.FC<{ f: number; at: number; top?: number }> = ({ f, at, top = 250 }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top, textAlign: "center",
    fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 150, lineHeight: 1,
    letterSpacing: "-0.05em", color: A1, zIndex: 30,
    transform: `scale(${E(f, at, at + 14, 0.6, 1, BACK)})` }}>280</div>
);

/** beats 2-4, identical in all three so ONLY the opening image is compared */
const gTail = (f: number) => {
  const [C1, C2, C3] = G_CUTS;
  return (<>
    {/* 2 · it sorts itself, and the repo is named while it happens */}
    <Shot f={f} a={C1} b={C2} k={1}>
      <div style={{ position: "absolute", inset: 0, background: "#080C12" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 650, height: 6,
        background: "#1B2530", zIndex: 6 }} />
      <BrandStack f={f} x={452} y={606} n={20}
                  left={1 - E(f, C1 + 4, C1 + 36, 0, 1, IO)} w={310} z={16} />
      {Array.from({ length: 16 }, (_, i) => {
        const t = E(f, C1 + 4 + i * 3.6, C1 + 30 + i * 3.6, 0, 1, OUT);
        if (t <= 0.02 || t >= 1) return null;
        return (
          <div key={i} style={{ position: "absolute", left: 452 + t * (60 + i * 30),
            top: 590 - i * 26 - t * 300, width: 58, height: 58, borderRadius: 10,
            background: GO, zIndex: 30, opacity: 1 - t * 0.7,
            transform: `rotate(${t * (i % 2 ? 40 : -40)}deg)`, display: "flex",
            alignItems: "center", justifyContent: "center", fontFamily: inter.fontFamily,
            fontWeight: 900, fontSize: 28, color: "#EAFBF3" }}>✓</div>
        );
      })}
      {Array.from({ length: 14 }, (_, i) => {
        const t = E(f, C1 + 16 + i * 2.4, C1 + 24 + i * 2.4, 0, 1, BACK);
        if (t <= 0.02) return null;
        return (
          <div key={`d${i}`} style={{ position: "absolute", left: 640 + (i % 7) * 48,
            top: 566 - Math.floor(i / 7) * 44, width: 42, height: 38, borderRadius: 7,
            background: GO, transform: `scale(${t})`, zIndex: 20, display: "flex",
            alignItems: "center", justifyContent: "center", fontFamily: inter.fontFamily,
            fontWeight: 900, fontSize: 21, color: "#EAFBF3" }}>✓</div>
        );
      })}
      <Dev f={f} x={132} y={462} size={186} gaze={2} cheer={0.85} nodAmp={3.4} nodSpeed={10} z={24} />
      <RepoCard f={f} x={270} y={132} s={1.0} t={E(f, C1 + 12, C1 + 28, 0, 1, BACK)} z={34} />
      <AChip y={694} text="SORTED WITHOUT YOU" c={GO} size={34} />
    </Shot>

    {/* 3 · which automations */}
    <Shot f={f} a={C2} b={C3} k={2}>
      <div style={{ position: "absolute", inset: 0, background: "#080C12" }} />
      {AUTO_BRANDS.map((b, i) => (
        <BrandTile key={b.slug} x={62 + i * 226} y={300} s={1.02} slug={b.slug} name={b.name}
                   t={E(f, C2 + 1 + i * 3, C2 + 14 + i * 3, 0, 1, BACK)} z={26} />
      ))}
      <AChip y={146} text="GMAIL. SLACK. WHATSAPP. NOTION." c={BLUE} size={30} />
      <BigCount f={f} at={C2 + 12} top={520} />
    </Shot>

    {/* 4 · what one of them actually is */}
    <Shot f={f} a={C3} b={9999} k={3}>
      <div style={{ position: "absolute", inset: 0, background: "#080C12" }} />
      <NodeGraph f={f} x={140} y={262} w={730} h={340} at={C3} z={20} />
      <Dev f={f} x={22} y={462} size={226} gaze={1} cheer={0.9} nodAmp={3.4} nodSpeed={9} z={24} />
      <RepoCard f={f} x={272} y={150} s={0.94} t={1} z={34} />
    </Shot>
  </>);
};

const wrap = (f: number, children: React.ReactNode) => (
  <AbsoluteFill>
    <Bg /><ProgressBar />
    <HookHeader f={f + 12} big={HEAD.big} hot={HEAD.hot} />
    <Panel glow={hexA(RED, 0.30)}>
      {children}
      {gTail(f)}
      <Flash f={f} cuts={G_CUTS} />
    </Panel>
    <SoloCap words={["There's", "a", "GitHub", "repo"]} hot={2} />
  </AbsoluteFill>
);

/* ================================================================ G1 · TOWER ==
   Three tiers: the tower (hero) ≫ the skyline (world) ≫ the figure (scale ref).
   The column leaves the top of frame, so the eye cannot find its end.
   ============================================================================ */
export const AutoHookG1: React.FC = () => {
  const f = useCurrentFrame();
  return wrap(f, (
    <Shot f={f} a={0} b={G_CUTS[0]} k={0}>
      <SkylineNight f={f} z={3} />
      <CardTower f={f} x={392} base={E(f, 0, 22, 660, 604, OUT)} n={30} left={1} w={250} z={16} />
      <Dev f={f} x={92} y={470} size={176} gaze={2} shock={0.7} nodAmp={2} nodSpeed={16} z={30} />
      <AChip y={694} text="EVERY MORNING. BY HAND." c={RED} size={32} />
    </Shot>
  ));
};

/* ============================================================ G2 · AVALANCHE ==
   Three tiers: the mass (hero) ≫ the racking (world) ≫ the figure, braced.
   The diagonal gives the frame a direction the vertical stack never had.
   ============================================================================ */
export const AutoHookG2: React.FC = () => {
  const f = useCurrentFrame();
  return wrap(f, (
    <Shot f={f} a={0} b={G_CUTS[0]} k={0}>
      <RackHall f={f} z={3} />
      <CardAvalanche f={f} n={46} left={E(f, 0, 26, 0.25, 1, OUT)} z={16} />
      <Dev f={f} x={54} y={468} size={190} gaze={2} shock={0.85} nodAmp={2.4} nodSpeed={14} z={40} />
      <AChip y={694} text="EVERY MORNING. BY HAND." c={RED} size={32} />
    </Shot>
  ));
};

/* ================================================================= G3 · WALL ==
   Three tiers: the feed (hero) ≫ the spill on the floor (world) ≫ the figure,
   seen from behind so the wall is what you are looking at, not him.
   ============================================================================ */
export const AutoHookG3: React.FC = () => {
  const f = useCurrentFrame();
  return wrap(f, (
    <Shot f={f} a={0} b={G_CUTS[0]} k={0}>
      <div style={{ position: "absolute", inset: 0, background: "#070A10" }} />
      <NotifWall f={f} speed={1.8} cols={3} z={12} />
      <ShadowFloor f={f} cx={506} z={20} />
      {/* the counter that never stops climbing — the number moves to its value */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 636, textAlign: "center",
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 62, letterSpacing: "-0.03em",
        color: RED, zIndex: 30 }}>
        {(1284 + Math.floor(f * 1.7)).toLocaleString("en-US")} WAITING
      </div>
      <Dev f={f} x={404} y={556} size={198} gaze={0} stern={0.6} nodAmp={1.6} nodSpeed={20} z={28} />
      <AChip y={716} text="EVERY MORNING. BY HAND." c={RED} size={30} />
    </Shot>
  ));
};

/* =========================================================================
   TOWER VARIANTS — the logos have to be READABLE.

   ⛔ "For the towering one the logos are hard to see, so they'd just scroll."
   v1 stacked 30 cards at 250x40 with 23px marks: that is texture, not
   information. These three each solve it a different way, and each keeps the
   tower's mass rather than trading it away.

     T1 · BIG BLOCKS   fewer, larger cards — legibility by SIZE
     T2 · THE CLIMB    the camera tracks up the tower — legibility by TIME
     T3 · PERSPECTIVE  cards shrink with height — legibility by DEPTH
   ========================================================================= */

/** T1 · fewer and bigger. Eleven cards instead of thirty, marks at 40px. */
export const AutoHookT1: React.FC = () => {
  const f = useCurrentFrame();
  return wrap(f, (
    <Shot f={f} a={0} b={G_CUTS[0]} k={0}>
      <SkylineNight f={f} z={3} />
      <CardTowerV f={f} x={560} base={E(f, 0, 22, 700, 648, OUT)} n={11} w={412} h={80} z={16} />
      <Dev f={f} x={44} y={470} size={182} gaze={2} shock={0.7} nodAmp={2} nodSpeed={16} z={30} />
      <AChip y={706} text="EVERY MORNING. BY HAND." c={RED} size={30} />
    </Shot>
  ));
};

/** T2 · the camera climbs, so each card passes camera at readable size and the
    tower reads as endless — you never see the top. */
export const AutoHookT2: React.FC = () => {
  const f = useCurrentFrame();
  return wrap(f, (
    <Shot f={f} a={0} b={G_CUTS[0]} k={0}>
      <SkylineNight f={f} z={3} />
      {/* the skyline drifts down a fraction of the tower's speed = parallax */}
      <div style={{ position: "absolute", inset: 0, transform: `translateY(${f * 0.9}px)`, zIndex: 4 }} />
      <CardTowerV f={f} x={560} base={742} climb={f * 5.2} n={44} w={420} h={86} z={16} />
      <Dev f={f} x={44} y={470} size={182} gaze={2} shock={0.7} nodAmp={2} nodSpeed={16} z={30} />
      <AChip y={706} text="IT NEVER ENDS" c={RED} size={32} />
    </Shot>
  ));
};

/** T3 · perspective. The nearest cards are big enough to read; the far ones
    recede into mass. Depth ranks the frame harder than a uniform stack. */
export const AutoHookT3: React.FC = () => {
  const f = useCurrentFrame();
  return wrap(f, (
    <Shot f={f} a={0} b={G_CUTS[0]} k={0}>
      <SkylineNight f={f} z={3} />
      <CardTowerV f={f} x={548} base={E(f, 0, 22, 706, 660, OUT)} n={20} w={470} h={96}
                  persp={0.042} z={16} />
      <Dev f={f} x={40} y={478} size={176} gaze={2} shock={0.7} nodAmp={2} nodSpeed={16} z={30} />
      <AChip y={716} text="EVERY MORNING. BY HAND." c={RED} size={30} />
    </Shot>
  ));
};
