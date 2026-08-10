import { registerRoot } from "remotion";
import { TakesRoot } from "./TakesRoot";

// Isolated render entry for reel 62 TAKES:
//   npx remotion still  src/takes-index.ts ClaudeTakesReel out/f.png --frame=N
//   npx remotion render src/takes-index.ts ClaudeTakesReel out/takes_raw.mp4 --codec h264
registerRoot(TakesRoot);
