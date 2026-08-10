import { registerRoot } from "remotion";
import { CallsRoot } from "./CallsRoot";

// Isolated render entry for reel 68 CALLS:
//   npx remotion still  src/calls-index.ts ClaudeCallsReel out/f.png --frame=N
//   npx remotion render src/calls-index.ts ClaudeCallsReel out/calls_raw.mp4 --codec h264
registerRoot(CallsRoot);
