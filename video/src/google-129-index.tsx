import React from "react";
import { Composition, registerRoot } from "remotion";
import {
  ClaudeGoogle129Reel, ClaudeGoogle129ReelAmber, ClaudeGoogle129ReelSteel,
  ClaudeGoogle129ReelQuiet, GOOGLE_TOTAL,
} from "./ClaudeGoogle129Reel";

/* Reel 129 "GOOGLE" — THE SHUTTER ROW. Board: storyboards/129-google.md.
   1383 frames = 46.10s at 30fps, x1.00 with NO speedup. */
const V = { fps: 30, width: 1080, height: 1920 } as const;

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="GoogleReel" component={ClaudeGoogle129Reel}
      durationInFrames={GOOGLE_TOTAL} {...V} />
    <Composition id="GoogleReelAmber" component={ClaudeGoogle129ReelAmber}
      durationInFrames={GOOGLE_TOTAL} {...V} />
    <Composition id="GoogleReelSteel" component={ClaudeGoogle129ReelSteel}
      durationInFrames={GOOGLE_TOTAL} {...V} />
    <Composition id="GoogleReelQuiet" component={ClaudeGoogle129ReelQuiet}
      durationInFrames={GOOGLE_TOTAL} {...V} />
  </>
);
registerRoot(RemotionRoot);
