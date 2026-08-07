import { registerRoot, Composition } from "remotion";
import React from "react";
import { OpenReel, OPEN_TOTAL } from "./OpenReel";
import { S0Hook, S1Turn, S2Caveman, S3Taste, S4Agents, S5Memory, S6Feeds, S7Montage, S8Orca, S9Cta } from "./OpenScenes";

const V = { fps: 30, width: 1080, height: 1920 };
const scene = (id: string, component: any, durationInFrames = 150) =>
  React.createElement(Composition as any, { id, component, durationInFrames, ...V });

const Root = () => React.createElement(React.Fragment, null,
  React.createElement(Composition as any, { id: "OpenReel", component: OpenReel, durationInFrames: OPEN_TOTAL, ...V }),
  scene("OpenS0Hook", S0Hook, 160),
  scene("OpenS1Turn", S1Turn, 80),
  scene("OpenS2Caveman", S2Caveman, 250),
  scene("OpenS3Taste", S3Taste, 178),
  scene("OpenS4Agents", S4Agents, 205),
  scene("OpenS5Memory", S5Memory, 195),
  scene("OpenS6Feeds", S6Feeds, 180),
  scene("OpenS7Montage", S7Montage, 101),
  scene("OpenS8Orca", S8Orca, 172),
  scene("OpenS9Cta", S9Cta, 138),
);
registerRoot(Root);
