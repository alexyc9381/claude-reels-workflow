import { registerRoot } from "remotion";
import React from "react";
import { Composition } from "remotion";
import { AiHookA, AiHookB, AiHookC, AiHookD, AI4_LEN } from "./AiHooks4";

/* Reel 89 "AI" — hook set 4. Claude TALKING, not application chrome.

     A · WHO ARE YOU AGAIN?  the briefing you already gave, sitting ignored
     B · THE RE-BRIEF        you push it in, it falls straight out the far side
     C · THE BLANK OUT       the answer physically falls out of the bubble
     D · THE QUEUE           five Claudes, five identical questions */
const H = [["A", AiHookA], ["B", AiHookB], ["C", AiHookC], ["D", AiHookD]] as const;

registerRoot(() => React.createElement(React.Fragment, null,
  ...H.map(([id, C]) => React.createElement(Composition as any, {
    key: id, id: `AiHook${id}`, component: C, durationInFrames: AI4_LEN,
    width: 1080, height: 1920, fps: 30,
  })),
));
