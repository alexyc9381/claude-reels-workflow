import { registerRoot, Composition } from "remotion";
import React from "react";
import { OpenHookA, OpenHookB, OpenHookC } from "./OpenHooks";

const Root = () => React.createElement(React.Fragment, null,
  React.createElement(Composition as any, { id: "OpenHookA", component: OpenHookA, durationInFrames: 150, fps: 30, width: 1080, height: 1920 }),
  React.createElement(Composition as any, { id: "OpenHookB", component: OpenHookB, durationInFrames: 150, fps: 30, width: 1080, height: 1920 }),
  React.createElement(Composition as any, { id: "OpenHookC", component: OpenHookC, durationInFrames: 150, fps: 30, width: 1080, height: 1920 }),
);
registerRoot(Root);
