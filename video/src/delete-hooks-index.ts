import { registerRoot, Composition } from "remotion";
import React from "react";
import { DeleteHookA, DeleteHookB, DeleteHookC } from "./DeleteHooks";

const V = { fps: 30, width: 1080, height: 1920, durationInFrames: 150 };
const Root = () => React.createElement(React.Fragment, null,
  React.createElement(Composition as any, { id: "DeleteHookA", component: DeleteHookA, ...V }),
  React.createElement(Composition as any, { id: "DeleteHookB", component: DeleteHookB, ...V }),
  React.createElement(Composition as any, { id: "DeleteHookC", component: DeleteHookC, ...V }),
);
registerRoot(Root);
