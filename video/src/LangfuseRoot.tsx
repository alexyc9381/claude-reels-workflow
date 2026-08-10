import React from "react";
import { Composition } from "remotion";
import { ClaudeLangfuseReel } from "./ClaudeLangfuseReel";
import { LangfuseCover } from "./LangfuseCover";

export const LangfuseRoot: React.FC = () => (
  <>
    <Composition
      id="ClaudeLangfuseReel"
      component={ClaudeLangfuseReel}
      durationInFrames={1200}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={{ headerIdx: 0 }}
    />
    <Composition
      id="LangfuseCover"
      component={LangfuseCover}
      durationInFrames={1}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={{ idx: 0 }}
    />
  </>
);
