import React from "react";
import { Composition } from "remotion";
import { ClaudeOsReel } from "./ClaudeOsReel";
import { VillainTest } from "./VillainTest";

export const OsRoot: React.FC = () => (
  <>
    <Composition
      id="ClaudeOsReel"
      component={ClaudeOsReel}
      durationInFrames={1663}
      fps={30}
      width={1080}
      height={1920}
    />
    <Composition id="VillainTest" component={VillainTest} durationInFrames={90} fps={30} width={1440} height={620} />
  </>
);
