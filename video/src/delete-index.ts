import { registerRoot } from "remotion";
import React from "react";
import { Composition } from "remotion";
import { DeleteReel, DeleteReelB, DeleteReelC, DELETE_TOTAL, DELETE_TOTAL_B, DELETE_TOTAL_C } from "./ClaudeDeleteReel";

const V = { width: 1080, height: 1920, fps: 30 };
registerRoot(() => React.createElement(React.Fragment, null,
  React.createElement(Composition as any, { id: "DeleteReel",  component: DeleteReel,  durationInFrames: DELETE_TOTAL,   ...V }),
  React.createElement(Composition as any, { id: "DeleteReelB", component: DeleteReelB, durationInFrames: DELETE_TOTAL_B, ...V }),
  React.createElement(Composition as any, { id: "DeleteReelC", component: DeleteReelC, durationInFrames: DELETE_TOTAL_C, ...V }),
));
