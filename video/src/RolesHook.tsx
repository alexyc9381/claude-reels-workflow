import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { inter } from "./fonts";
import { Bg, Panel, ProgressBar, HookHeader, Caption, AssemblyCtx, hexA } from "./SlopKit";
import { Worker } from "./RolesWorld";
import {
  Arena, Lamp, Spot, BigBoard, Podium, PickCard, Lower, DChip, Confetti, PICKS, DEPTS, PW, PH,
  NIGHT, NIGHT_D, DECK, DECK_L, POOL, BOARD_L, BOARDC, CARD, INKD, MUTE,
  RED, RED_D, AMBER, GO, BLUE, PLUM, TRUSS_D,
} from "./DraftWorld";
import { RepoPage, Jumbotron, Octocat, REPO_STARS } from "./RolesGitHub";
import { E, osc, rnd, OUT, IO, BACK, SH_D } from "./MissionWorld";

const SoloCap: React.FC<{ words: string[]; hot?: number }> = (p) =>
  React.useContext(AssemblyCtx) ? null : <Caption {...p} />;

/* =========================================================================
   REEL 84 "ROLES" · HOOK · DRAFT NIGHT, OPENED ON THE REPO.

   Two notes built this version.

   1. "EASILY hierarchical." The roster-wall version failed that and the failure
      was MEASURED, not felt: a 1.27 top-decile-vs-mean brightness ratio against
      the 1.84 reel 83's relic hit. A cream room cannot rank anything, because
      nothing in it can be brighter than the room. So the world is DARK and the
      hierarchy is a spotlight — the most legible ranking device there is.

   2. "The first few are horrible, we need to see more related to the GitHub
      repo." The draft carried the drama but the claim — ONE REPO — was nowhere
      on screen. So shots 1-2 ARE the repo, and shot 3 pulls back to find it
      hanging on the arena jumbotron. The file tree of 20 division folders and
      the draft board are the same object.

   ⛔ Frame 0 = GitHub's LIGHT theme, which clears the 140 luma bar and obeys the
      light-paper-UI rule. A dark-theme repo page opens at ~30 and fails outright.
   ========================================================================= */

/* 0.80 · 0.87 · 0.87 · 0.80 · 0.80 · 0.80 s — none under the 0.70 floor */
export const ROLES_CUTS = [24, 50, 76, 100, 124];
export const ROLES_HOOK_LEN = 148;          // 4.94s, the measured onset of "An engineer…"

const Shot: React.FC<{ f: number; a: number; b: number; k?: number; children: React.ReactNode }> =
  ({ f, a, b, k = 0, children }) => {
  if (f < a || f >= b) return null;
  const t = Math.min(1, (f - a) / 22), e = t * t * (3 - 2 * t);
  const z = [1.07 - e * 0.06, 1.02 + e * 0.05, 1.05 - e * 0.04, 1.02 + e * 0.05][k % 4];
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden",
      transform: `scale(${z})`, transformOrigin: "50% 56%" }}>{children}</div>
  );
};

const Flash: React.FC<{ f: number; cuts: number[] }> = ({ f, cuts }) => (<>
  {cuts.map((cf) => {
    const k = f - cf;
    if (k < 0 || k > 2) return null;
    return <div key={cf} style={{ position: "absolute", inset: 0, background: "#FFF8ED",
      opacity: (1 - k / 2) * 0.3, zIndex: 44 }} />;
  })}
</>);

export const RolesHook: React.FC = () => {
  const f = useCurrentFrame();
  const [C1, C2, C3, C4, C5] = ROLES_CUTS;

  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <HookHeader f={f + 10} big="268 EXPERTS, FREE" hot="ONE GITHUB REPO" />
      <Panel glow={hexA(AMBER, 0.24)}>

        {/* 1 · THE REPO. The star counter TICKS to 18,585 — the number moves to
              its value, it is never typeset at it. */}
        <Shot f={f} a={0} b={C1} k={0}>
          <RepoPage f={f} x={0} y={0} w={PW} h={PH} starA={2} starB={21} z={10} />
          <DChip y={694} text="18,585 STARS" c={RED} size={38} />
        </Shot>

        {/* 2 · THE DIVISIONS. The tree scrolls; one folder highlights.
              This file tree IS the draft board, three shots early. */}
        <Shot f={f} a={C1} b={C2} k={1}>
          <RepoPage f={f} x={0} y={0} w={PW} h={PH} starA={-99} starB={-99}
                    scroll={E(f, C1, C2, 0, 168, IO)}
                    hi={Math.min(4, Math.floor((f - C1) / 6))} z={10} />
          <DChip y={694} text="20 DIVISIONS" c={PLUM} size={38} />
        </Shot>

        {/* 3 · THE PULL BACK. The repo is hanging over a packed arena. */}
        <Shot f={f} a={C2} b={C3} k={2}>
          <Arena f={f} horizon={628} detail cams
                 banners={[DEPTS[0], DEPTS[1], DEPTS[2], DEPTS[3]]} />
          <Jumbotron f={f} x={196} y={E(f, C2, C2 + 18, -290, 176, OUT)} w={620} h={300}
                     starA={C2} starB={C2 + 16} z={16} />
          <DChip y={700} text="IT IS A DRAFT BOARD" c={AMBER} size={36} />
        </Shot>

        {/* 4 · THE PODIUM. House lights drop to one cone. */}
        <Shot f={f} a={C3} b={C4} k={3}>
          <Arena f={f} horizon={598} detail cams={false}
                 banners={[DEPTS[4], DEPTS[5], DEPTS[6], DEPTS[7]]} />
          <BigBoard f={f} x={120} y={186} w={772} h={196} cols={20} rows={6} dim z={9} />
          <Lamp x={488} y={96} on z={12} />
          <Spot cx={506} top={126} floor={598} w={430} spread={0.16} z={10} />
          <Worker f={f} x={396} y={266} size={228} prop="suit" gaze={0} stern={0.4}
                  nodAmp={2.4} nodSpeed={12} z={18} />
          <Podium f={f} x={382} y={452} s={1} c={RED_D} z={20} />
          <DChip y={706} text="THE FIRST PICK" c={AMBER} size={38} />
        </Shot>

        {/* 5 · THE CARD. One object, huge, the only lit thing in frame. */}
        <Shot f={f} a={C4} b={C5} k={0}>
          <Arena f={f} horizon={640} detail cams
                 banners={[DEPTS[8], DEPTS[9], DEPTS[10], DEPTS[11]]} />
          <Spot cx={506} top={110} floor={640} w={620} spread={0.22} z={10} />
          {/* ⛔ the offset goes on `y` directly. A transform on a static wrapper makes
                it a stacking context at z-index 0 and the pool (z=11) paints over it —
                REEL-BUILD-LEARNINGS §7, third time this trap has cost a cycle. */}
          <PickCard x={226} y={222 - (1 - E(f, C4 + 1, C4 + 18, 0, 1, BACK)) * 380}
                    w={560} h={300} no="01" name="DESIGNER" dept="DESIGN"
                    c={PLUM} tilt={-1.5} z={26} />
        </Shot>

        {/* 6 · THEY WALK OUT. Three pools, three specialists, the ribbon running. */}
        <Shot f={f} a={C5} b={9999} k={1}>
          <Arena f={f} horizon={604} detail cams={false}
                 banners={[DEPTS[1], DEPTS[0], DEPTS[2], DEPTS[3]]}
                 ribbon="ON THE CLOCK · 268 AGENTS · 20 DIVISIONS · " />
          {[0, 1, 2].map((i) => <Lamp key={`l${i}`} x={172 + i * 306} y={96} on z={12} />)}
          {[0, 1, 2].map((i) => (
            <Spot key={`s${i}`} cx={190 + i * 306} top={126} floor={604} w={272} spread={0.16} z={10} />
          ))}
          {[PICKS[0], PICKS[1], PICKS[2]].map((r, i) => {
            const t = E(f, C5 + 1 + i * 4, C5 + 14 + i * 4, 0, 1, BACK);
            return (
              <React.Fragment key={r.name}>
                <Worker f={f + i * 9} x={82 + i * 306} y={368 + (1 - t) * 250} size={222}
                        prop={r.prop} gaze={0} cheer={0.75} nodAmp={3} nodSpeed={10 + i} z={20 + i} />
                <Lower x={62 + i * 306} y={638} w={252} name={r.name} c={r.c}
                       t={E(f, C5 + 7 + i * 3, C5 + 13 + i * 3, 0, 1, OUT)} z={30} />
              </React.Fragment>
            );
          })}
          <Confetti f={f} at={C5 + 8} n={40} z={38} />
          <DChip y={132} text="THEY SPLIT THE JOB" c={GO} size={36} />
        </Shot>

        <Flash f={f} cuts={ROLES_CUTS} />
      </Panel>
      <SoloCap words={["There", "is", "a", "GitHub"]} hot={3} />
    </AbsoluteFill>
  );
};
