import { registerRoot } from "remotion";
import React from "react";
import { Composition } from "remotion";
import { VerifyS0 } from "./tested/_verify";
registerRoot(() => React.createElement(React.Fragment, null,
  React.createElement(Composition, { id: "VerifyS0", component: VerifyS0, durationInFrames: 1296, fps: 30, width: 1080, height: 1920 })));
