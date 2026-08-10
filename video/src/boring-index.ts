import { registerRoot } from "remotion";
import { BoringRoot } from "./BoringRoot";

// Isolated render entry for THE BORING MILLION series covers:
//   npx remotion still src/boring-index.ts BoringMillionCover out/boring-1.png --frame=0
registerRoot(BoringRoot);
