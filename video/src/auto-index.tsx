import { registerRoot } from "remotion";
import React from "react";
import { Composition } from "remotion";
import { AutoHook, AUTO_HOOK_LEN } from "./AutoHook";
import { AutoReel, AutoReelB, AutoReelC, AUTO_TOTAL } from "./ClaudeAutoReel";

/* Reel 85 AUTO — three split-test cuts.
   A · THE TOWER      depth      · room panels in S1, the dawn yard in S4
   B · THE CONVEYOR   direction  · three belts in S1
   C · THE OVERNIGHT  time       · a 6AM clock in S4                        */
registerRoot(() => React.createElement(React.Fragment, null,
  React.createElement(Composition as any, {
    id: "AutoHook", component: AutoHook, durationInFrames: AUTO_HOOK_LEN,
    width: 1080, height: 1920, fps: 30 }),
  ...[["", AutoReel], ["B", AutoReelB], ["C", AutoReelC]].map(([id, C]: any) =>
    React.createElement(Composition as any, {
      key: id, id: `ClaudeAutoReel${id}`, component: C, durationInFrames: AUTO_TOTAL,
      width: 1080, height: 1920, fps: 30 })),
));
