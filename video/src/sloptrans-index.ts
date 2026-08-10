import { registerRoot, Composition } from "remotion";
import React from "react";
import { SlopTransDemo } from "./SlopTransDemo";
registerRoot(() => React.createElement(Composition as any, { id: "SlopTransDemo", component: SlopTransDemo, durationInFrames: 150, fps: 30, width: 1080, height: 1920 }));
