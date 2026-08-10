import { registerRoot } from "remotion";
import React from "react";
import { Composition } from "remotion";
import { AiDiveA, AiDiveB, AiDiveC, AiDiveD, AiDiveB1, AiDiveB2, AiDiveB3, AiDiveOne, AI5_LEN } from "./AiHooks5";

/* Reel 89 "AI" — hook set 5, THE DIVE. A fall is the only camera move that is
   natively 9:16. B is the picked world; B1-B3 land it in tokens, not paper. */
const H = [["A", AiDiveA], ["B", AiDiveB], ["C", AiDiveC], ["D", AiDiveD],
           ["B1", AiDiveB1], ["B2", AiDiveB2], ["B3", AiDiveB3], ["One", AiDiveOne]] as const;

registerRoot(() => React.createElement(React.Fragment, null,
  ...H.map(([id, C]) => React.createElement(Composition as any, {
    key: id, id: `AiDive${id}`, component: C, durationInFrames: AI5_LEN,
    width: 1080, height: 1920, fps: 30,
  })),
));
