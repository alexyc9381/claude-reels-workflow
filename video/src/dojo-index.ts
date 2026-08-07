import { registerRoot } from "remotion";
import React from "react";
import { Composition } from "remotion";
import { DojoHook } from "./DojoHook";
import { D1Strap, D2Cut, D3Founder, D4Posts, D5Short, D6Bell, D7Shop, D8Belt } from "./DojoScenes";

const P = { width: 1080, height: 1920, fps: 30 };
const C: [string, React.FC, number][] = [
  ["DojoHook", DojoHook, 150],
  ["D1Strap", D1Strap, 77], ["D2Cut", D2Cut, 77], ["D3Founder", D3Founder, 129],
  ["D4Posts", D4Posts, 134], ["D5Short", D5Short, 88], ["D6Bell", D6Bell, 199],
  ["D7Shop", D7Shop, 141], ["D8Belt", D8Belt, 104],
];

registerRoot(() => React.createElement(React.Fragment, null,
  ...C.map(([id, Comp, d]) =>
    React.createElement(Composition, { key: id, id, component: Comp as any, durationInFrames: d, ...P }))
));
