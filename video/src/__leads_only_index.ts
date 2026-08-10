import { registerRoot, Composition } from "remotion";
import React from "react";
import { ClaudeLeadsReel } from "./ClaudeLeadsReel";
const Root: React.FC = () => React.createElement(Composition, { id: "ClaudeLeadsReel", component: ClaudeLeadsReel as React.FC, durationInFrames: 699, fps: 30, width: 1080, height: 1920 });
registerRoot(Root);
