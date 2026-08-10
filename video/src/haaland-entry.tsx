import React from "react";
import { registerRoot, Composition } from "remotion";
import { ClaudeHaalandReel } from "./ClaudeHaalandReel";
import "./fonts";

const HaalandRoot: React.FC = () => (
  <>
    <Composition
      id="ClaudeHaalandReel"
      component={ClaudeHaalandReel}
      durationInFrames={1290}
      fps={30}
      width={1080}
      height={1920}
    />
  </>
);

registerRoot(HaalandRoot);
