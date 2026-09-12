import { smooth } from "./explainer-motion";
import { naturalHop, restingSprite } from "./glass-motion";
export const STAGE_SECONDS = 21;
export const stageState = (t: number) => {
  const split = smooth(t, 2.15, 1.15);
  const push = smooth(t, 5, 1.2);
  const book = smooth(t, 11.8, 1.3);
  const first = smooth(t, 0.85, 0.9);
  const approach = smooth(t, 3.65, 1.1);
  const travel = smooth(t, 10.5, 1.8);
  const saveHop = smooth(t, 15.05, 0.85);
  const press = 12 * smooth(t, 1.75, 0.12) * (1 - smooth(t, 2.2, 0.45));
  const savePress = 18 * smooth(t, 15.9, 0.12) * (1 - smooth(t, 17, 0.45));
  let pose = restingSprite();
  if (t < 3) pose = naturalHop(t, 0.85, 0.9, 155);
  else if (t > 14.8) pose = naturalHop(t, 15.05, 0.85, 120);
  const walk =
    smooth(t, 3.65, 0.2) -
    smooth(t, 4.55, 0.2) +
    (smooth(t, 5, 0.2) - smooth(t, 6, 0.2)) +
    (smooth(t, 10.5, 0.25) - smooth(t, 12.05, 0.25));
  const x =
    140 +
    490 * first +
    150 * approach +
    250 * push +
    180 * travel +
    370 * saveHop;
  return {
    split,
    push,
    book,
    press,
    savePress,
    sprite: {
      x,
      y: 650 + press * (1 - smooth(t, 3.5, 0.15)) + savePress,
      pose,
      walk,
      lean: 8 * (smooth(t, 4.9, 0.15) - smooth(t, 6.25, 0.35)),
    },
    avatar: {
      x: 370 - 70 * split + 150 * book,
      y: 375 - 145 * split + 170 * book,
    },
    name: {
      x: 1120 - 180 * split + 480 * book,
      y: 300 - 80 * split + 90 * book,
      scale: 1 - 0.32 * split + 0.02 * book,
    },
    email: {
      x: 1120 + 190 * split + 250 * push - 140 * book,
      y: 535 + 210 * split - 220 * book,
      scale: 1 - 0.34 * split + 0.05 * book,
    },
    replied: t >= 9.65,
    saved: t >= 16.12,
  };
};
