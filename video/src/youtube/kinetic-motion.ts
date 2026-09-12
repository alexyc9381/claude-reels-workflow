import { duetState } from "./duet-motion";
import { smooth } from "./explainer-motion";
import { windowAt } from "./refined-motion";
import { naturalHop } from "./glass-motion";
export const KINETIC_RATE = 1.3;
export const KINETIC_SECONDS = 10;
// This is new overlapping blocking, not just a faster playback of v5.
// Times are in the shared 13s action clock, mapped to a 10s motion study.
export const kineticState = (t: number) => {
  const s = duetState(t);
  const reset = smooth(t, 5.8, 1.05),
    returnToTeam = smooth(t, 8.2, 1.05);
  const approach = 1 - smooth(t, 0.1, 1.7);
  const portrait = smooth(t, 1.4, 1.45),
    name = smooth(t, 2.4, 1.1);
  return {
    ...s,
    ax: s.ax - 190 * reset + 100 * returnToTeam,
    bx: s.bx + 190 * approach,
    aWalk: Math.min(1, s.aWalk + windowAt(t, 5.8, 6.5) + windowAt(t, 8.2, 8.9)),
    bWalk: windowAt(t, 0.1, 1.35),
    flap: s.flap * (1 - smooth(t, 6.85, 0.65)),
    book: smooth(t, 1.25, 1.45),
    closing: smooth(t, 6.85, 0.75),
    portrait: {
      x: 650 + 280 * portrait,
      y: 270 + 122 * portrait - 60 * Math.sin(Math.PI * portrait),
      size: 105 + 65 * portrait,
      p: portrait,
      opacity: windowAt(t, 1.12, 2.85),
    },
    name: {
      x: 770 + 405 * name,
      y: 280 + 24 * name - 40 * Math.sin(Math.PI * name),
      p: name,
      opacity: windowAt(t, 2.2, 3.5),
    },
    third: {
      x:
        1480 -
        70 * smooth(t, 0.2, 1.0) -
        60 * smooth(t, 3.25, 0.7) +
        60 * smooth(t, 4.7, 0.7) +
        45 * smooth(t, 5.9, 0.8) -
        95 * smooth(t, 8.35, 1.0),
      walk:
        windowAt(t, 0.2, 0.9) +
        windowAt(t, 3.25, 3.7) +
        windowAt(t, 4.7, 5.15) +
        windowAt(t, 5.9, 6.45) +
        windowAt(t, 8.35, 9.1),
      pose:
        t < 5
          ? naturalHop(t, 0.65, 0.6, 65)
          : t < 9
            ? naturalHop(t, 6.7, 0.6, 60)
            : naturalHop(t, 9.7, 0.6, 30),
    },
    tabs: smooth(t, 1.25, 0.8) * (1 - smooth(t, 7.3, 0.8)),
    pageTurn: smooth(t, 3.3, 0.9) * (1 - smooth(t, 5.2, 1.05)),
  };
};
