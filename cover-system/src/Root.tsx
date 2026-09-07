/**
 * Root.tsx - a MINIMAL standalone root for the cover system.
 *
 * The parent project's Root.tsx registers ~120 compositions across every reel
 * ever made. This one registers only the covers, so `cover-system/` builds and
 * renders on its own.
 *
 * All covers are 1080x1920 stills. This project has no <Still>; a still is a
 * 2-frame <Composition> rendered with --frame=0.
 *
 * Adding a cover is a one-line change to the tuple array. Keep the composition
 * id identical to the exported component name so the render command is
 * predictable: `npx remotion still src/index.ts CoverFoo out/FOO_cover.png`.
 */
import React from "react";
import { Composition } from "remotion";

import { Cover52A, Cover52B, Cover51, CoverHermes } from "./ReelCovers";
import { CoverOS, CoverRamsay } from "./ReelCovers2";
import {
  CoverOSv2, CoverTakes, CoverCarousel, CoverDesign,
  CoverCallback, CoverPurge, CoverPlugins,
} from "./ReelCovers3";
import {
  CoverPowers, CoverEvolve, CoverStack, CoverArena, CoverVault, CoverMint,
  CoverCrew, CoverBlueprint, CoverClone, CoverWorthy, CoverAttack,
  CoverFactory, CoverSol,
} from "./ReelCovers4";
import { CoverBoss, CoverFree131, CoverJudge, CoverBuild } from "./ReelCovers5";
import { CoverLibrary, CoverUnlazy, CoverFree131v2 } from "./ReelCovers6";
/* ⛔ reel 134 AGENTS was registered here from an untracked `ReelCovers7.tsx`
   that was lost on 2026-09-05. The delivered PNG survives (out/AGENTS134_cover.png,
   Drive Faceless/134 - AGENTS/) but the scene must be rebuilt to re-render it. */
import { CoverJob } from "./ReelCovers9";
import { CoverUnlazyV2, CoverSquad, CoverSims, CoverAgency135, CoverRepos, CoverAdhd, CoverMistake, CoverHardware, CoverWeb } from "./ReelCovers8";
import "./fonts";

const covers: [string, React.FC][] = [
  // set 1 - the original chassis exploration
  ["Cover52A", Cover52A], ["Cover52B", Cover52B],
  ["Cover51", Cover51], ["CoverHermes", CoverHermes],
  // set 2
  ["CoverOS", CoverOS], ["CoverRamsay", CoverRamsay],
  ["CoverOSv2", CoverOSv2], ["CoverTakes", CoverTakes],
  ["CoverCarousel", CoverCarousel], ["CoverDesign", CoverDesign],
  ["CoverCallback", CoverCallback], ["CoverPurge", CoverPurge],
  ["CoverPlugins", CoverPlugins],
  // set 3
  ["CoverPowers", CoverPowers], ["CoverEvolve", CoverEvolve],
  ["CoverStack", CoverStack], ["CoverArena", CoverArena],
  ["CoverVault", CoverVault], ["CoverMint", CoverMint],
  ["CoverCrew", CoverCrew], ["CoverBlueprint", CoverBlueprint],
  ["CoverClone", CoverClone], ["CoverWorthy", CoverWorthy],
  ["CoverAttack", CoverAttack], ["CoverFactory", CoverFactory],
  // set 5 - reel 128
  ["CoverBoss", CoverBoss], ["CoverFree131", CoverFree131],
  // set 6 - reel 132
  ["CoverJudge", CoverJudge],
  // set 7 - reel 133
  ["CoverBuild", CoverBuild],
  ["CoverLibrary", CoverLibrary], ["CoverUnlazy", CoverUnlazy],
  ["CoverFree131v2", CoverFree131v2],
  // sets 12-15
  ["CoverUnlazyV2", CoverUnlazyV2], ["CoverSquad", CoverSquad],
  ["CoverSims", CoverSims], ["CoverAgency135", CoverAgency135],
  ["CoverRepos", CoverRepos], ["CoverAdhd", CoverAdhd],
  ["CoverMistake", CoverMistake], ["CoverHardware", CoverHardware], ["CoverWeb", CoverWeb],
  // set 21 - reel 139 JOB
  ["CoverJob", CoverJob],
  ["CoverSol", CoverSol],
];

export const RemotionRoot: React.FC = () => (
  <>
    {covers.map(([id, Comp]) => (
      <Composition
        key={id}
        id={id}
        component={Comp}
        durationInFrames={2}
        fps={30}
        width={1080}
        height={1920}
      />
    ))}
  </>
);
