import { registerRoot, Composition } from "remotion";
import React from "react";
import { DeleteReel, DELETE_TOTAL } from "./DeleteReel";
import { DeleteHookC } from "./DeleteHooks";
import { S1Bigger, S2Throw, S3Who, S4Older, S5InTheWay, S6Rule, S7Weekend, S8Cta } from "./DeleteScenes";

const V = { fps: 30, width: 1080, height: 1920 };
const scene = (id: string, component: any, durationInFrames = 150) =>
  React.createElement(Composition as any, { id, component, durationInFrames, ...V });

const Root = () => React.createElement(React.Fragment, null,
  React.createElement(Composition as any, { id: "DeleteReel", component: DeleteReel, durationInFrames: DELETE_TOTAL, ...V }),
  scene("DelS0Hook", DeleteHookC, 150),
  scene("DelS1Bigger", S1Bigger, 78),
  scene("DelS2Throw", S2Throw, 78),
  scene("DelS3Who", S3Who, 130),
  scene("DelS4Older", S4Older, 136),
  scene("DelS5InTheWay", S5InTheWay, 90),
  scene("DelS6Rule", S6Rule, 200),
  scene("DelS7Weekend", S7Weekend, 142),
  scene("DelS8Cta", S8Cta, 104),
);
registerRoot(Root);
