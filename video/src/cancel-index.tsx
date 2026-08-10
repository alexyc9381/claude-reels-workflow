import { registerRoot } from "remotion";
import React from "react";
import { Composition } from "remotion";
import {
  CancelHookA, CancelHookB, CancelHookC, CancelHookD, CancelHookE, CANCEL_HOOK_LEN,
} from "./CancelHooks";
import {
  CancelHookF, CancelHookG, CancelHookH, CancelHookI, CancelHookJ,
  HOOK2_LEN, BareCtx, BARE_W, BARE_H,
} from "./CancelHooks2";
import {
  CancelHookK, CancelHookL, CancelHookM, CancelHookN, CancelHookO,
} from "./CancelHooks3";
import { CancelHookP } from "./CancelHooks4";
import { CancelReel, CancelReelB, CancelReelC, CANCEL_TOTAL } from "./ClaudeCancelReel";

/* Reel 86 CANCEL.

   SET 2 (F-J) is the live set. Each is ONE nameable object that IS the ranking,
   in a dark hall, built from the real marks and the real star counts — the
   answer to "more hierarchical, related to the topic, simpler to understand
   immediately". Four shots, none under 1.1s.

   CancelBare<X> is the SAME component with the chassis switched off: panel
   content only, 1012x792, silent. For watching the animation on its own.

   SET 1 (A-E) is kept registered so the two can be compared side by side. Those
   were five genre worlds (toll plaza, subway, billing plant); they made the
   viewer decode the metaphor before the subject arrived. */
/* SET 3 (K-O) is the live set: a RITUAL that ranks, caught at the moment before
   the result is known. Scene 1 is the only thing that differs from set 2 —
   beats 2-4, palette, SFX and the Subject badge are shared. */
/* P is the chosen direction: the five real marks ARE the set, ranked in a
   staircase, each flipping $/mo -> FREE, under the total. */
const H4 = [["P", CancelHookP]] as const;
const H3 = [
  ["K", CancelHookK], ["L", CancelHookL], ["M", CancelHookM],
  ["N", CancelHookN], ["O", CancelHookO],
] as const;
const H2 = [
  ["F", CancelHookF], ["G", CancelHookG], ["H", CancelHookH],
  ["I", CancelHookI], ["J", CancelHookJ],
] as const;
const H1 = [
  ["A", CancelHookA], ["B", CancelHookB], ["C", CancelHookC],
  ["D", CancelHookD], ["E", CancelHookE],
] as const;

const bare = (C: React.FC): React.FC => () =>
  React.createElement(BareCtx.Provider, { value: true }, React.createElement(C));

registerRoot(() => React.createElement(React.Fragment, null,
  /* THE REEL */
  ...([["", CancelReel], ["B", CancelReelB], ["C", CancelReelC]] as const).map(([v, C]) =>
    React.createElement(Composition as any, {
      key: "reel" + v, id: `ClaudeCancelReel${v}`, component: C,
      durationInFrames: CANCEL_TOTAL, width: 1080, height: 1920, fps: 30,
    })),
  ...H4.map(([id, C]) => React.createElement(Composition as any, {
    key: id, id: `CancelHook${id}`, component: C, durationInFrames: HOOK2_LEN,
    width: 1080, height: 1920, fps: 30,
  })),
  ...H4.map(([id, C]) => React.createElement(Composition as any, {
    key: `bare${id}`, id: `CancelBare${id}`, component: bare(C),
    durationInFrames: HOOK2_LEN, width: BARE_W, height: BARE_H, fps: 30,
  })),
  ...H3.map(([id, C]) => React.createElement(Composition as any, {
    key: id, id: `CancelHook${id}`, component: C, durationInFrames: HOOK2_LEN,
    width: 1080, height: 1920, fps: 30,
  })),
  ...H3.map(([id, C]) => React.createElement(Composition as any, {
    key: `bare${id}`, id: `CancelBare${id}`, component: bare(C),
    durationInFrames: HOOK2_LEN, width: BARE_W, height: BARE_H, fps: 30,
  })),
  ...H2.map(([id, C]) => React.createElement(Composition as any, {
    key: id, id: `CancelHook${id}`, component: C, durationInFrames: HOOK2_LEN,
    width: 1080, height: 1920, fps: 30,
  })),
  ...H2.map(([id, C]) => React.createElement(Composition as any, {
    key: `bare${id}`, id: `CancelBare${id}`, component: bare(C),
    durationInFrames: HOOK2_LEN, width: BARE_W, height: BARE_H, fps: 30,
  })),
  ...H1.map(([id, C]) => React.createElement(Composition as any, {
    key: id, id: `CancelHook${id}`, component: C, durationInFrames: CANCEL_HOOK_LEN,
    width: 1080, height: 1920, fps: 30,
  })),
));
