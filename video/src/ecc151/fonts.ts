import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadPlayfair } from "@remotion/google-fonts/PlayfairDisplay";
import { loadFont as loadMontserrat } from "@remotion/google-fonts/Montserrat";

// Heavy sans used for the Greg-Isenberg-style kinetic reel captions.
export const montserrat = loadMontserrat("normal", {
  weights: ["700", "800", "900"],
});

// Editorial serif (soft Didone w/ true italics) for the refined caption style.
import { loadFont as loadFraunces } from "@remotion/google-fonts/Fraunces";
export const fraunces = loadFraunces("normal", {
  weights: ["400", "500", "600", "700", "900"],
});
export const frauncesItalic = loadFraunces("italic", {
  weights: ["400", "600", "700", "900"],
});

// Load the two brand families. We grab the weights actually used in overlays.
export const inter = loadInter("normal", {
  weights: ["400", "500", "600", "700", "800", "900"],
});

export const playfair = loadPlayfair("normal", {
  weights: ["700", "800", "900"],
});

export const interItalic = loadInter("italic", { weights: ["400"] });
