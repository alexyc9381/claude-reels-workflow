import { registerRoot, Composition } from "remotion";
import React from "react";
import { Hook1, Hook2, Hook3, Hook4, Hook5 } from "./SlopHooks";
const Root = () => React.createElement(React.Fragment, null,
  React.createElement(Composition as any, { id: "Hook1", component: Hook1, durationInFrames: 150, fps: 30, width: 1080, height: 1920 }),
  React.createElement(Composition as any, { id: "Hook2", component: Hook2, durationInFrames: 150, fps: 30, width: 1080, height: 1920 }),
  React.createElement(Composition as any, { id: "Hook3", component: Hook3, durationInFrames: 150, fps: 30, width: 1080, height: 1920 }),
  React.createElement(Composition as any, { id: "Hook4", component: Hook4, durationInFrames: 150, fps: 30, width: 1080, height: 1920 }),
  React.createElement(Composition as any, { id: "Hook5", component: Hook5, durationInFrames: 150, fps: 30, width: 1080, height: 1920 }),
);
registerRoot(Root);
