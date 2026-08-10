import React from "react";
import { registerRoot, Composition } from "remotion";
import { ClaudeHermesReel } from "./ClaudeHermesReel";
import "./fonts";

const HermesRoot: React.FC = () => (
  <>
    <Composition
      id="ClaudeHermesReel"
      component={ClaudeHermesReel}
      durationInFrames={1491}
      fps={30}
      width={1080}
      height={1920}
    />
  </>
);

registerRoot(HermesRoot);
