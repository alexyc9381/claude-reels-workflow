import { registerRoot } from "remotion";
import React from "react";
import { Composition } from "remotion";
import { RolesHook, ROLES_HOOK_LEN } from "./RolesHook";
import { RolesReel, RolesReelB, RolesReelC, ROLES_TOTAL } from "./ClaudeRolesReel";

/* Reel 84 ROLES — draft night, three trial cuts.
   A · THE REPO       the GitHub page opens, the arena is revealed third
   B · ON THE CLOCK   a draining draft clock opens, the repo lands LAST
   C · THE EMPTY CHAT villain first, the compose box you stare at daily
   Each differs in hook, bed, camera offset, transition kit and caption band. */
registerRoot(() => React.createElement(React.Fragment, null,
  React.createElement(Composition as any, {
    id: "RolesHook", component: RolesHook, durationInFrames: ROLES_HOOK_LEN,
    width: 1080, height: 1920, fps: 30 }),
  React.createElement(Composition as any, {
    id: "ClaudeRolesReel", component: RolesReel, durationInFrames: ROLES_TOTAL,
    width: 1080, height: 1920, fps: 30 }),
  React.createElement(Composition as any, {
    id: "ClaudeRolesReelB", component: RolesReelB, durationInFrames: ROLES_TOTAL,
    width: 1080, height: 1920, fps: 30 }),
  React.createElement(Composition as any, {
    id: "ClaudeRolesReelC", component: RolesReelC, durationInFrames: ROLES_TOTAL,
    width: 1080, height: 1920, fps: 30 }),
));
