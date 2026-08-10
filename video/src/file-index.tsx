import React from "react";
import { Composition, registerRoot } from "remotion";
import {
  FileHook1, FileHook2, FileHook3, FileHook4, FileHook5, FILE_HOOK_LEN,
} from "./FileHooks";
import { FileReel, FileReelB, FileReelC, FILE_TOTAL } from "./ClaudeFileReel";
import {
  S1Grid, S2File, S3GodMode, S4Download, S5App, S6Grid,
  S7NoLogin, S8Turn, S9Classic, S10Race, S11Cta,
} from "./FileScenes";

/* Reel 88 "FILE". The reel itself, plus every scene solo for inspection and
   the five hook candidates that were bake-offed before H1 (RACE) was locked. */
const V = { fps: 30, width: 1080, height: 1920 } as const;

const Root: React.FC = () => (<>
  <Composition id="FileReel"  component={FileReel}  durationInFrames={FILE_TOTAL} {...V} />
  <Composition id="FileReelB" component={FileReelB} durationInFrames={FILE_TOTAL} {...V} />
  <Composition id="FileReelC" component={FileReelC} durationInFrames={FILE_TOTAL} {...V} />

  {([["FileHook1", FileHook1], ["FileHook2", FileHook2], ["FileHook3", FileHook3],
     ["FileHook4", FileHook4], ["FileHook5", FileHook5]] as const).map(([id, C]) => (
    <Composition key={id} id={id} component={C} durationInFrames={FILE_HOOK_LEN} {...V} />
  ))}

  {([["s01Grid", S1Grid, 62], ["s02File", S2File, 98], ["s03GodMode", S3GodMode, 36],
     ["s04Download", S4Download, 66], ["s05App", S5App, 94], ["s06Grid", S6Grid, 32],
     ["s07NoLogin", S7NoLogin, 82], ["s08Turn", S8Turn, 36], ["s09Classic", S9Classic, 64],
     ["s10Race", S10Race, 94], ["s11Cta", S11Cta, 86]] as const).map(([id, C, len]) => (
    <Composition key={id} id={id} component={C} durationInFrames={len} {...V} />
  ))}
</>);

registerRoot(Root);
