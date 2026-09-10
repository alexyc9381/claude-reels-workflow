// Seconds-based, pure choreography: identical under forward/backward seeking.
export const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
export const easeOut = (t: number, start: number, duration: number) =>
  1 - Math.pow(1 - clamp01((t - start) / duration), 4);
export const easeInOut = (t: number, start: number, duration: number) => {
  const p = clamp01((t - start) / duration);
  return p * p * (3 - 2 * p);
};
export const settle = (t: number, start: number, duration: number) => {
  const p = clamp01((t - start) / duration);
  // Single restrained overshoot for the sprite only; glass itself never bounces.
  return 1 + 2 * Math.pow(p - 1, 3) + Math.pow(p - 1, 2);
};
export const hop = (
  t: number,
  start: number,
  duration: number,
  height: number,
) => Math.sin(clamp01((t - start) / duration) * Math.PI) * height;
export const relayPosition = (t: number) => {
  const first = easeInOut(t, 1.7, 1.05);
  const second = easeInOut(t, 3.35, 1.15);
  return {
    x: 290 + first * 505 + second * 505,
    y: 610 - hop(t, 1.7, 1.05, 130) - hop(t, 3.35, 1.15, 115),
  };
};
