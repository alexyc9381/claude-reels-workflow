import { smooth } from "./explainer-motion";
import { naturalHop } from "./glass-motion";

export const REFINED_SECONDS = 17;
export const clamp = (v: number) => Math.max(0, Math.min(1, v));
// Entrance: decisive travel with a long deceleration. Layout moves use the
// shared quintic (zero velocity/acceleration at both ends), not character bounce.
export const arrive = (t: number, start: number, duration: number) =>
  1 - (1 - clamp((t - start) / duration)) ** 4;
export const windowAt = (t: number, start: number, end: number) =>
  smooth(t, start, 0.35) * (1 - smooth(t, end, 0.35));

export const refinedState = (t: number) => {
  const open = smooth(t, 2.8, 1.25);
  const close = smooth(t, 12.1, 1.35);
  const press = 10 * smooth(t, 6.65, 0.12) * (1 - smooth(t, 7.05, 0.5));
  const reply = smooth(t, 9.15, 1.1);
  const walk =
    windowAt(t, 4.2, 5.35) + windowAt(t, 7.8, 9.05) + windowAt(t, 12.1, 13.3);
  return {
    open,
    close,
    press,
    record: {
      x: 460 + 350 * open - 300 * close,
      y: 215,
      w: 1000 - 200 * open + 100 * close,
      h: 500,
    },
    source: {
      x: 420 - 110 * open + 160 * close,
      y: 215,
      w: 420,
      h: 500,
      opacity: open * (1 - close),
    },
    reply: {
      x: 520 + 396 * reply,
      y: 530 + 9 * reply - 100 * Math.sin(Math.PI * reply),
      scale: 1 - 0.48 * reply,
      opacity: windowAt(t, 8.9, 10.2),
    },
    filled: smooth(t, 10.25, 0.45),
    saved: smooth(t, 13.65, 0.7),
    sprite: {
      x:
        520 +
        240 * smooth(t, 4.2, 1.5) +
        125 * smooth(t, 5.8, 0.85) -
        285 * smooth(t, 7.8, 1.6) -
        200 * smooth(t, 12.1, 1.55),
      y: 674 + press,
      walk,
      pose: naturalHop(t, 5.8, 0.85, 105),
    },
  };
};
