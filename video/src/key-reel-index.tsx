import { registerRoot } from "remotion";
import React from "react";
import { Composition } from "remotion";
import { KeyReel, KeyReelB, KeyReelC, KeyReelD, KeyReelE, KeyReelF, KEY_TOTAL } from "./ClaudeKeyReel";

/* Reel 83 KEY — the relic, three trial cuts.
   A · THE RELIC  object first, the gem on its pedestal
   B · THE PRICE  villain first, the bill climbs before any gem exists
   C · THE COUNT  quantity first, one gem becomes 134 then collapses back
   D/E/F reuse A/B/C's openings and separate on bed, transition kit, in-panel
   camera and caption band — six postable cuts off one build. */
registerRoot(() => React.createElement(React.Fragment, null,
  React.createElement(Composition as any, {
    id: "KeyReel", component: KeyReel, durationInFrames: KEY_TOTAL,
    width: 1080, height: 1920, fps: 30 }),
  React.createElement(Composition as any, {
    id: "KeyReelB", component: KeyReelB, durationInFrames: KEY_TOTAL,
    width: 1080, height: 1920, fps: 30 }),
  React.createElement(Composition as any, {
    id: "KeyReelC", component: KeyReelC, durationInFrames: KEY_TOTAL,
    width: 1080, height: 1920, fps: 30 }),
  React.createElement(Composition as any, {
    id: "KeyReelD", component: KeyReelD, durationInFrames: KEY_TOTAL,
    width: 1080, height: 1920, fps: 30 }),
  React.createElement(Composition as any, {
    id: "KeyReelE", component: KeyReelE, durationInFrames: KEY_TOTAL,
    width: 1080, height: 1920, fps: 30 }),
  React.createElement(Composition as any, {
    id: "KeyReelF", component: KeyReelF, durationInFrames: KEY_TOTAL,
    width: 1080, height: 1920, fps: 30 }),
));
