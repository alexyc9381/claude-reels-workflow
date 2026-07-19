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
