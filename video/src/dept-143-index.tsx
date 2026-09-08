import React from "react";
import { Composition, registerRoot } from "remotion";
import { Reel, DEPT_TOTAL, L } from "./ClaudeDept143Reel";

/* Reel 143 "DEPARTMENT". Board: storyboards/143-department.md.
   2132 frames = 71.07s. Eleven `cut cut` flubs cut from a 154.69s raw take,
   five of them on one sentence. Every scene boundary is the midpoint of a
   MEASURED silence in the delivered mix, so no cut lands inside a word.
   ⚠️ 71.07s is long against the house 22-29s range — it is what was recorded,
   and every sentence Alex said is in the cut. Flagged, not paid for by
   dropping content or by slowing the voice. */
const V = { fps: 30, width: 1080, height: 1920 } as const;

export const ReelMain: React.FC = () => <Reel />;
export const ReelQuiet: React.FC = () => <Reel quiet />;

/** ⭐ the hook, on its own, so it can be judged and re-cut without paying for a
    full render. ⛔ A solo hook comp has the reel's captions and progress rail by
    construction — say so when sending one (memory: reel-hook-preview-artifacts). */
const Root: React.FC = () => (<>
  <Composition id="dept-143" component={ReelMain} durationInFrames={DEPT_TOTAL} {...V} />
  <Composition id="dept-143-quiet" component={ReelQuiet} durationInFrames={DEPT_TOTAL} {...V} />
</>);

registerRoot(Root);
