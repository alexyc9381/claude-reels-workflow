import { loadFont as loadFraunces } from "@remotion/google-fonts/Fraunces";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

// Existing No Code Alex short-form families: video/src/fonts.ts and ClaudeCrewReel.tsx.
// Load only the weights/subset this landscape gallery uses, with no OS-font fallback.
export const displayFont = loadFraunces("normal", {
  weights: ["600", "700", "900"],
  subsets: ["latin"],
}).fontFamily;
export const bodyFont = loadInter("normal", {
  weights: ["400", "500", "600", "700"],
  subsets: ["latin"],
}).fontFamily;
export const BRAND = {
  cream: "#ECE9E2",
  ink: "#1A1813",
  clay: "#D2724E",
  clayDark: "#B8501F",
  amber: "#CF9544",
} as const;
