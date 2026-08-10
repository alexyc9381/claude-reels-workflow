import { registerRoot } from "remotion";
import React from "react";
import { Composition } from "remotion";
import { KeyPopA, KeyPopB, KeyPopC } from "./KeyPop";
import { KeyFactoryHook } from "./KeyFactory";
import { KeySecretHook } from "./KeySecret";
import { KeyRelicHook } from "./KeyRelic";

/* Reel 83 KEY — hook CONCEPTS for approval (docs/THE-OPEN.md step 1).
   Round 1 (toll plaza / vault / meter yard, in KeyHooks.tsx) was rejected as
   "way too boring" — no pop-culture anchor. These are round 2.
   157 frames each = the 5.24s open, so a chosen concept drops into an assembly
   without a re-time. */
const V = { durationInFrames: 157, width: 1080, height: 1920, fps: 30 };

registerRoot(() => React.createElement(
  React.Fragment, null,
  React.createElement(Composition as any, { id: "KeyPopA", component: KeyPopA, ...V }),
  React.createElement(Composition as any, { id: "KeyPopB", component: KeyPopB, ...V }),
  React.createElement(Composition as any, { id: "KeyPopC", component: KeyPopC, ...V }),
  React.createElement(Composition as any, { id: "KeyFactoryHook", component: KeyFactoryHook, ...V }),
  React.createElement(Composition as any, { id: "KeySecretHook", component: KeySecretHook, ...V }),
  React.createElement(Composition as any, { id: "KeyRelicHook", component: KeyRelicHook, ...V }),
));
