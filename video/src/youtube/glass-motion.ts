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

export type SpriteLandingPose = {
  lift: number;
  sx: number;
  sy: number;
  tilt: number;
  armSwing: number;
  carry: number;
};
export const restingSprite = (): SpriteLandingPose => ({
  lift: 0,
  sx: 1,
  sy: 1,
  tilt: 0,
  armSwing: 0,
  carry: 0,
});

// Original 200px sprite: soles at y=184, outer foot edges x=52 and x=166.
// Lift the pivot just enough that a tilted foot never goes below the plane.
export const footClearance = (degrees: number, size: number, sx = 1) => {
  const s = Math.sin((degrees * Math.PI) / 180);
  return Math.max(s * -0.24, s * 0.33) * size * sx;
};

// A damped recovery with zero velocity at compression/recovery hand-off.
// Fade the already-small tail smoothly to rest; don't truncate a moving spring.
const recovery = (u: number) => {
  const tail = 1 - easeInOut(u, 0.55, 0.3);
  return Math.exp(-7 * u) * (Math.cos(14 * u) + 0.5 * Math.sin(14 * u)) * tail;
};
const hermite = (p: number, a: number, b: number, va = 0, vb = 0) =>
  (2 * p * p * p - 3 * p * p + 1) * a +
  (p * p * p - 2 * p * p + p) * va +
  (-2 * p * p * p + 3 * p * p) * b +
  (p * p * p - p * p) * vb;

/** Takeoff time, ballistic flight, .11s impact absorption, .85s damped recovery.
 * Feet stay planted during deformation. The only velocity discontinuity is the
 * physical foot contact; body compression continues after contact, not a freeze. */
export const naturalHop = (
  t: number,
  start: number,
  duration: number,
  height: number,
): SpriteLandingPose => {
  const local = t - start;
  const landing = local - duration;
  if (local < -0.18 || landing >= 1.005) return restingSprite();
  let sy = 1,
    lift = 0,
    tilt = 0,
    armSwing = 0,
    carry = 0;
  if (local < 0) {
    const q = easeInOut(local, -0.18, 0.18);
    sy = 1 - 0.09 * q;
    tilt = -3 * q;
    armSwing = -7 * q;
  } else if (local < duration) {
    const p = local / duration;
    lift = 4 * height * p * (1 - p);
    // Launch stretch resolves before contact; compact silhouette near the apex.
    sy =
      p < 0.16
        ? hermite(p / 0.16, 0.91, 1.09)
        : p < 0.7
          ? hermite((p - 0.16) / 0.54, 1.09, 1)
          : hermite((p - 0.7) / 0.3, 1, 1.035);
    tilt = hermite(p, -3, 4, 16, 0);
    armSwing = hermite(p, -7, 9, -12, 0);
  } else if (landing < 0.11) {
    const p = landing / 0.11;
    sy = hermite(p, 1.035, 0.86, -0.18, 0);
    tilt = hermite(p, 4, 6, 0, 0);
    armSwing = hermite(p, 9, 14, 0, 0);
    carry = hermite(p, 0, 7, 0, 0);
  } else {
    const u = landing - 0.11;
    const r = recovery(u);
    sy = 1 - 0.14 * r;
    tilt = 6 * r;
    carry = 7 * r;
    // Arms trail the body's recovery slightly, but remain continuous at the join.
    armSwing = 14 * recovery(Math.max(0, u - 0.045));
  }
  return { lift, sx: 1 / Math.sqrt(sy), sy, tilt, armSwing, carry };
};

export const relayLandingPose = (t: number): SpriteLandingPose => {
  const a = naturalHop(t, 1.7, 1.05, 130),
    b = naturalHop(t, 4, 1.15, 115);
  // The first recovery finishes before the second anticipation begins.
  return {
    lift: a.lift + b.lift,
    sx: a.sx * b.sx,
    sy: a.sy * b.sy,
    tilt: a.tilt + b.tilt,
    armSwing: a.armSwing + b.armSwing,
    carry: a.carry + b.carry,
  };
};
export const relayPosition = (t: number) => {
  const first = easeInOut(t, 1.7, 1.05);
  const second = easeInOut(t, 4, 1.15);
  const pose = relayLandingPose(t);
  return {
    x: 290 + first * 505 + second * 505 + pose.carry,
    y: 610 - pose.lift,
  };
};
