import { registerRoot } from "remotion";
import React from "react";
import { Composition } from "remotion";
import { makeAiReel, AI_TOTAL } from "./ClaudeAiReel";

/* Every one of these carries the 17s fix. A0 is the un-fixed control.
   A sunset · B cold dawn · C dusk · D deep ocean · E teal · F night */
const V = ["A","B","C","D","E","F","A0"] as const;

registerRoot(() => React.createElement(React.Fragment, null,
  ...V.map((v) => React.createElement(Composition as any, {
    key: v, id: `ClaudeAiReel${v === "A" ? "" : v}`, component: makeAiReel(v),
    durationInFrames: AI_TOTAL, width: 1080, height: 1920, fps: 30,
  })),
));
