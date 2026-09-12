import { smooth } from "./explainer-motion";
import { naturalHop, restingSprite } from "./glass-motion";
import { windowAt } from "./refined-motion";
export const DUET_SECONDS = 13;
// Named contact times also drive the soundtrack. All held-payload coordinates
// derive from the actor; there is one letter, never separate carry/flight copies.
export const DUET_EVENTS = {
  retrieve: 1.45,
  carry: 3.2,
  throw: 4.9,
  catch: 5.7,
  file: 7.65,
  celebrateA: 9.95,
  celebrateB: 10.25,
};
export const duetState = (t: number) => {
  const carry = smooth(t, 3.2, 1.25),
    toss = Math.max(0, Math.min(1, (t - 4.9) / 0.8)),
    file = smooth(t, 6.65, 1);
  const catchAge = Math.max(0, t - 5.7);
  const recoil =
    t >= 5.7
      ? Math.sin(catchAge * 12) *
        Math.exp(-catchAge * 6) *
        (1 - smooth(t, 6.4, 0.25))
      : 0;
  const ax = 490 + 250 * carry;
  const bx = 1020 + 16 * recoil;
  const aPose =
    t < 3
      ? naturalHop(t, 0.8, 0.65, 60)
      : t > 9
        ? naturalHop(t, 9.3, 0.65, 35)
        : restingSprite();
  const bPose =
    t > 9
      ? naturalHop(t, 9.55, 0.7, 45)
      : {
          ...restingSprite(),
          sx: 1 + 0.04 * recoil,
          sy: 1 - 0.04 * recoil,
          tilt: 4 * recoil,
        };
  const pickup = smooth(t, 2.25, 0.85);
  const reveal = smooth(t, 1.55, 0.55);
  let x = 540 + (ax + 95 - 540) * pickup,
    y = 450 - 190 * reveal + (627 - (450 - 190 * reveal)) * pickup;
  let scale = 1 - 0.25 * pickup,
    rotation = -5 * smooth(t, 2.25, 0.4) * (1 - pickup);
  if (t >= 4.9) {
    x = 835 + (bx + 110 - 835) * toss;
    y = 627 + (606 - 627) * toss - 620 * toss * (1 - toss) + 5 * recoil;
    rotation = -8 * Math.sin(Math.PI * toss);
    scale = 0.75;
  }
  if (t >= 6.65) {
    x = 1130 + 187 * file;
    y = 606 - 133 * file - 55 * Math.sin(Math.PI * file);
    scale = 0.75 - 0.38 * file;
    rotation = 0;
  }
  return {
    ax,
    bx,
    aPose,
    bPose,
    carry,
    reveal,
    pickup,
    toss,
    file,
    recoil,
    aWalk: windowAt(t, 3.2, 4.1),
    letter: { x, y, scale, rotation, opacity: 1 - smooth(t, 7.65, 0.2) },
    flap: smooth(t, 1.45, 0.6),
    book: smooth(t, 7.8, 1.1),
    filled: smooth(t, 7.65, 0.35),
  };
};
