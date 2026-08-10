import { registerRoot } from "remotion";
import React from "react";
import { Composition } from "remotion";
import { M1Deleted, M2Babysit, M3Scientist, M4TooHard, M5Breaks, M6Setup, M7TooSmall, M8LongBurn, M9Cta } from "./MissionScenes";

const P = { width: 1080, height: 1920, fps: 30 };
const C: [string, React.FC, number][] = [
  ["M1Deleted", M1Deleted, 108], ["M2Babysit", M2Babysit, 139], ["M3Scientist", M3Scientist, 109],
  ["M4TooHard", M4TooHard, 104], ["M5Breaks", M5Breaks, 60], ["M6Setup", M6Setup, 82],
  ["M7TooSmall", M7TooSmall, 66], ["M8LongBurn", M8LongBurn, 166], ["M9Cta", M9Cta, 78],
];
registerRoot(() => React.createElement(React.Fragment, null,
  ...C.map(([id, Comp, d]) => React.createElement(Composition, { key: id, id, component: Comp as any, durationInFrames: d, ...P }))));
