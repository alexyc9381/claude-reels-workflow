import { registerRoot, Composition } from "remotion";
import React from "react";
import { HookT1 } from "./SlopHookT1";
import { HookT2 } from "./SlopHookT2";
import { HookT3 } from "./SlopHookT3";
const Root = () => React.createElement(React.Fragment, null,
  React.createElement(Composition as any, { id: "HookT1", component: HookT1, durationInFrames: 150, fps: 30, width: 1080, height: 1920 }),
  React.createElement(Composition as any, { id: "HookT2", component: HookT2, durationInFrames: 165, fps: 30, width: 1080, height: 1920 }),
  React.createElement(Composition as any, { id: "HookT3", component: HookT3, durationInFrames: 150, fps: 30, width: 1080, height: 1920 }),
);
registerRoot(Root);
