import { registerRoot } from "remotion";
import React from "react";
import { Composition } from "remotion";
import { NinjaHook } from "./NinjaHook";
import { N1Armory, N2Master, N3Founder, N4Yards, N5Short, N6Reset, N7Summit, N8Market, N9Gate } from "./NinjaScenes";

const P = { width: 1080, height: 1920, fps: 30 };
const C: [string, React.FC, number][] = [
  ["NinjaHook", NinjaHook, 134],
  ["N1Armory", N1Armory, 69], ["N2Master", N2Master, 74], ["N3Founder", N3Founder, 113],
  ["N4Yards", N4Yards, 123], ["N5Short", N5Short, 84], ["N6Reset", N6Reset, 133],
  ["N7Summit", N7Summit, 59], ["N8Market", N8Market, 133], ["N9Gate", N9Gate, 101],
];
registerRoot(() => React.createElement(React.Fragment, null,
  ...C.map(([id, Comp, d]) =>
    React.createElement(Composition, { key: id, id, component: Comp as any, durationInFrames: d, ...P }))
));
