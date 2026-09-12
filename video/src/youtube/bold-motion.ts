import {
  hierarchyState,
  hierarchyFocus,
  hierarchyGestures,
} from "./hierarchy-motion";
import { smooth } from "./explainer-motion";
import { clamp01, type SpriteLandingPose } from "./glass-motion";

// Opt-in color extension requested for this study; original brand stays intact.
export const CAST_ACCENTS = {
  teal: "#267D78",
  blue: "#315F79",
  gold: "#E8AD38",
  mint: "#8DC7B3",
  orange: "#DE7140",
} as const;
export const BOLD_SIZES = { courier: 230, archivist: 260, operator: 170 };

export const settle = (t: number, at: number, frequency = 12) => {
  const age = Math.max(0, t - at);
  return (
    Math.sin(age * frequency) *
    Math.exp(-age * 4.5) *
    (1 - smooth(age, 1.0, 0.3))
  );
};
// Settle the envelope's parent transform BEFORE the payload changes draw layers.
// Otherwise a larger source wrapper would visibly jump the extracted letter.
export const sourceResponse = (t: number) => ({
  rotation: 3 * settle(t, 1.45) * (1 - smooth(t, 1.8, 0.35)),
  scaleOffset:
    0.08 * (1 - smooth(t, 1.45, 0.7)) -
    0.07 * settle(t, 1.45) * (1 - smooth(t, 1.8, 0.35)),
});
const amplify = (p: SpriteLandingPose, amount: number): SpriteLandingPose => ({
  ...p,
  lift: p.lift * 1.35,
  sx: 1 + (p.sx - 1) * amount,
  sy: 1 + (p.sy - 1) * amount,
  tilt: p.tilt * amount,
  armSwing: p.armSwing * amount,
});
export const boldState = (t: number) => {
  const k = hierarchyState(t);
  const held = smooth(t, 2.25, 0.85) * (1 - smooth(t, 6.65, 1));
  const flight = clamp01((t - 4.9) / 0.8);
  return {
    ...k,
    ax: k.ax - 20,
    bx: k.bx - 20,
    aPose: amplify(k.aPose, 1.65),
    bPose: amplify(k.bPose, 2.0),
    third: { ...k.third, x: k.third.x - 20 },
    book: k.book + 0.1 * settle(t, 6.8, 10),
    tabs: k.tabs * 1.45,
    pageTurn: k.pageTurn * 1.4,
    letter: {
      ...k.letter,
      y: k.letter.y - 95 * held - 65 * Math.sin(Math.PI * flight),
      scale: k.letter.scale + 0.35 * held,
      rotation: k.letter.rotation * 1.8 + 6 * settle(t, 5.7),
    },
  };
};
export const boldFocus = (t: number) => {
  const f = hierarchyFocus(t);
  return {
    ...f,
    source: 0.3 + 0.7 * f.source,
    book: 0.28 + 0.72 * f.book,
    courier: 1,
    archivist: 1,
    operator: 1,
  };
};
export const boldGestures = (t: number) => {
  const c = hierarchyGestures(t);
  return {
    ...c,
    courier: c.courier * 1.5,
    archivist: c.archivist * 1.4,
    operator: c.operator * 1.4,
    crank: c.crank * 1.4,
  };
};
