import { registerRoot } from "remotion";
import { ChartRoot } from "./ChartRoot";

// Isolated render entry for reel 69 CHART:
//   npx remotion still  src/chart-index.ts ClaudeChartReel out/f.png --frame=N
//   npx remotion render src/chart-index.ts ClaudeChartReel out/chart_raw.mp4 --codec h264
registerRoot(ChartRoot);
