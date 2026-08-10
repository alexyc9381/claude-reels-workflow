import React from "react";
import { Composition } from "remotion";
import { ClaudeDesignStackReel } from "./ClaudeDesignStackReel";

export const DesignRoot: React.FC = () => (
  <>
    <Composition
      id="ClaudeDesignStackReel"
      component={ClaudeDesignStackReel}
      durationInFrames={1193}
      fps={30}
      width={1080}
      height={1920}
    />
  </>
);
