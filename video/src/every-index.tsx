import { registerRoot } from "remotion";
import React from "react";
import { Composition } from "remotion";
import {
  EveryHook1, EveryHook2, EveryHook3, EveryHook4, EveryHook5, EVERY_HOOK_LEN,
} from "./EveryHooks";

/* Reel 86 EVERYTHING — five candidate hooks, five hierarchy MECHANISMS:
   H1 convergence · H2 growth · H3 depth · H4 authority · H5 radial
   150 frames = 5.0s; re-timed to the measured onsets once the VO is re-recorded. */
const H = [EveryHook1, EveryHook2, EveryHook3, EveryHook4, EveryHook5];
registerRoot(() => React.createElement(React.Fragment, null,
  ...H.map((C, i) => React.createElement(Composition as any, {
    key: i, id: `EveryHook${i + 1}`, component: C, durationInFrames: EVERY_HOOK_LEN,
    width: 1080, height: 1920, fps: 30 })),
));
