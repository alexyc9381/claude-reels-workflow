import { clamp01 } from "./glass-motion";

export type FacePose = {
  leftOpen: number;
  rightOpen: number;
  gazeX: number;
  gazeY: number;
  happy: number;
};
export const facePresets = {
  neutral: { leftOpen: 1, rightOpen: 1, gazeX: 0, gazeY: 0, happy: 0 },
  curious: { leftOpen: 1.13, rightOpen: 0.7, gazeX: 3, gazeY: -2, happy: 0 },
  focused: { leftOpen: 0.62, rightOpen: 0.62, gazeX: 3, gazeY: 2, happy: 0 },
  alert: { leftOpen: 1.25, rightOpen: 1.25, gazeX: 3, gazeY: -2, happy: 0 },
  impact: { leftOpen: 0.14, rightOpen: 0.14, gazeX: 1, gazeY: 3, happy: 0 },
  pleased: { leftOpen: 0.68, rightOpen: 0.68, gazeX: 0, gazeY: -1, happy: 1 },
} satisfies Record<string, FacePose>;
export type FaceReaction = keyof typeof facePresets;
export const blendFace = (a: FacePose, b: FacePose, p: number): FacePose => {
  const q = clamp01(p),
    s = q * q * (3 - 2 * q);
  return Object.fromEntries(
    Object.keys(a).map((k) => [
      k,
      a[k as keyof FacePose] +
        (b[k as keyof FacePose] - a[k as keyof FacePose]) * s,
    ]),
  ) as FacePose;
};
/** Expression is driven by the same takeoff/contact clock as body and SFX. */
export const hopFace = (
  t: number,
  start: number,
  duration: number,
): FacePose => {
  const u = t - start;
  const keys: [number, FaceReaction][] = [
    [-0.25, "neutral"],
    [-0.05, "focused"],
    [0.14, "alert"],
    [duration - 0.07, "alert"],
    [duration + 0.04, "impact"],
    [duration + 0.15, "impact"],
    [duration + 0.4, "pleased"],
    [duration + 0.8, "pleased"],
    [duration + 1.18, "neutral"],
  ];
  if (u <= keys[0][0]) return facePresets.neutral;
  for (let i = 1; i < keys.length; i++)
    if (u < keys[i][0]) {
      const [a, prev] = keys[i - 1],
        [b, next] = keys[i];
      return blendFace(facePresets[prev], facePresets[next], (u - a) / (b - a));
    }
  return facePresets.neutral;
};

// Bridge the first recovery into the next anticipation without switching poses.
export const relayFace = (t: number) =>
  blendFace(hopFace(t, 1.7, 1.05), hopFace(t, 4, 1.15), (t - 3.72) / 0.26);
