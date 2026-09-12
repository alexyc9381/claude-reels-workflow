import { kineticState } from "./kinetic-motion";
import { castMotion } from "./cast-motion";
import { smooth } from "./explainer-motion";
import { windowAt } from "./refined-motion";
import { restingSprite } from "./glass-motion";

// Source -> shared handoff -> destination. Supporting motion continues at a
// lower amplitude, but never launches an unrelated focal event across the frame.
export const hierarchyState = (t: number) => {
  const k = kineticState(t);
  return {
    ...k,
    book: smooth(t, 5.85, 0.95),
    tabs: windowAt(t, 5.95, 7.6) * 0.6,
    pageTurn: windowAt(t, 6.15, 7.2) * 0.45,
    portrait: { ...k.portrait, opacity: 0 },
    name: { ...k.name, opacity: 0 },
    aPose: t < 8.5 ? k.aPose : restingSprite(),
    bPose: t < 8.5 ? k.bPose : restingSprite(),
    third: {
      ...k.third,
      x: 1440 - 45 * smooth(t, 5.9, 0.85) + 20 * smooth(t, 8.3, 0.65),
      walk: windowAt(t, 5.9, 6.45) + windowAt(t, 8.3, 8.7),
      pose: restingSprite(),
    },
  };
};

export const hierarchyFocus = (t: number) => {
  const receive = smooth(t, 5.5, 0.7);
  return {
    source: 1 - 0.46 * smooth(t, 6.2, 0.85),
    book: 0.5 + 0.5 * receive,
    portrait: smooth(t, 6.45, 0.4),
    name: smooth(t, 6.9, 0.35),
    courier: 1 - 0.22 * smooth(t, 8.1, 0.6),
    archivist: 0.66 + 0.34 * smooth(t, 3.4, 0.65),
    operator: 0.58 + 0.27 * receive,
  };
};

export const hierarchyGestures = (t: number) => {
  const c = castMotion(t);
  const work = windowAt(t, 6.05, 7.45);
  const crank = 0.45 * Math.sin((t - 6.05) * 5.2) * work;
  return {
    ...c,
    crank,
    courier: c.courier * (1 - 0.75 * smooth(t, 4.65, 0.25)),
    archivist: c.archivist * (0.25 + 0.65 * smooth(t, 4.0, 0.5)),
    operator: crank + 0.22 * Math.sin((t - 8.2) * 4) * windowAt(t, 8.2, 9.0),
    seal: c.seal * 0.3,
    sealTurn: c.sealTurn * 0.3,
  };
};
