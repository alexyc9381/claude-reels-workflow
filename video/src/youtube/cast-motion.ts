import { windowAt } from "./refined-motion";
import { smooth } from "./explainer-motion";
import type { FacePose } from "./face-motion";
import type { SpriteLandingPose } from "./glass-motion";

// Shared action clock: each job has an anticipation, working stroke and recovery.
// The operator's working stroke also drives the folio dividers and handheld tool.
export const castMotion = (t: number) => {
  const work = windowAt(t, 2.65, 6.5);
  const crank = Math.sin((t - 2.65) * 5.2) * work;
  const seal = windowAt(t, 7.05, 7.65);
  return {
    crank,
    seal,
    courier:
      0.65 * Math.sin(t * 4.1) * windowAt(t, 1.9, 4.6) -
      seal +
      0.6 * Math.sin(t * 5) * windowAt(t, 10.7, 12.5),
    archivist:
      -0.7 * windowAt(t, 2.1, 3.05) +
      0.85 * windowAt(t, 4.25, 5.5) +
      0.7 * windowAt(t, 6.55, 7.65) +
      0.65 * Math.sin((t - 8) * 6) * windowAt(t, 8, 9.1),
    operator: crank + 0.65 * Math.sin(t * 6) * windowAt(t, 10.6, 12.6),
    sheen: smooth(t, 7.6, 1.1),
    sealTurn: 22 * Math.sin(Math.PI * smooth(t, 6.8, 1.1)),
  };
};

export const dressedPose = (
  p: SpriteLandingPose,
  gesture: number,
  t: number,
  role: number,
): SpriteLandingPose => ({
  ...p,
  // Feet remain planted during weight shifts. Existing ballistic hops are retained.
  tilt: p.tilt + gesture * (role === 2 ? 7 : 4),
  sx: p.sx * (1 + gesture * 0.016),
  sy: p.sy * (1 - gesture * 0.016),
  armSwing:
    p.armSwing +
    gesture * 22 +
    Math.sin(t * 3.5 + role) * 3 * windowAt(t, 0.4, 12.4),
});

export const characterFace = (
  face: FacePose,
  t: number,
  role: number,
): FacePose => {
  const blinkTimes = [
    [2.0, 6.3, 11.9],
    [1.3, 3.5, 8.9],
    [2.4, 5.0, 11.5],
  ][role];
  const blink = Math.max(
    ...blinkTimes.map((at) => Math.exp(-Math.pow((t - at) / 0.085, 2))),
  );
  const inspect = windowAt(t, 2.4 + role * 0.2, 4.1 + role * 0.2);
  return {
    ...face,
    leftOpen: face.leftOpen * (1 - 0.9 * blink),
    rightOpen: face.rightOpen * (1 - 0.9 * blink),
    gazeY: face.gazeY - 4 * inspect,
    gazeX: face.gazeX + (role === 0 ? 3 : -3) * windowAt(t, 9.8, 11.7),
  };
};
