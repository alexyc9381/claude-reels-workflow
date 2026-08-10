import { registerRoot, Composition } from "remotion";
import React from "react";
import { ClaudeRec } from "./SlopRec";
registerRoot(() => React.createElement(Composition as any, { id: "ClaudeRec", component: ClaudeRec, durationInFrames: 150, fps: 30, width: 1080, height: 1920 }));
