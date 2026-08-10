import { registerRoot } from "remotion";
import React from "react";
import { Composition } from "remotion";
import { S1Test } from "./__s1test";
const Root: React.FC = () => React.createElement(Composition as any, { id: "S1Test", component: S1Test, durationInFrames: 1663, fps: 30, width: 1080, height: 1920 });
registerRoot(Root);
