import { interpolate } from "remotion";

export type ClaudeAction = "idle" | "walk" | "hop" | "cheer" | "surprised";
const keys = (t: number, at: number[], values: number[]) =>
  interpolate(t, at, values, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
/** Pure, frame-addressable poses. y=0 is always the planted foot plane. */
export const characterPose = (
  frame: number,
  fps: number,
  action: ClaudeAction = "idle",
) => {
  const t = Math.max(0, frame / fps);
  const gait = Math.sin(t * 12);
  const pose = {
    y: Math.sin(t * 2.6) * 0.012,
    sx: 1,
    sy: 1,
    tilt: Math.sin(t * 1.8) * 0.025,
    turn: 0.28 + Math.sin(t * 1.4) * 0.06,
    armL: Math.sin(t * 2) * 0.05,
    armR: -Math.sin(t * 2) * 0.05,
    legL: 0,
    legR: 0,
    eye: 1,
  };
  if (action === "walk")
    Object.assign(pose, {
      y: Math.abs(gait) * 0.085,
      tilt: gait * 0.06,
      armL: gait * 0.4,
      armR: -gait * 0.4,
      legL: gait * 0.38,
      legR: -gait * 0.38,
      sy: 1 - Math.abs(gait) * 0.035,
    });
  if (action === "hop") {
    const a = [0, 0.2, 0.32, 0.56, 0.82, 0.94, 1.08, 1.3];
    pose.y = keys(t, a, [0, 0, 0.1, 0.62, 0.1, 0, 0.025, 0]);
    pose.sy = keys(t, a, [1, 0.76, 1.16, 1.06, 1.15, 0.73, 1.08, 1]);
    pose.sx = 1 / Math.sqrt(pose.sy);
    pose.armL = keys(t, a, [0, -0.25, 0.6, 0.9, 0.5, -0.3, 0.18, 0]);
    pose.armR = -pose.armL;
    pose.tilt = keys(t, a, [0, -0.06, -0.08, 0.04, 0.08, -0.03, 0.015, 0]);
  }
  if (action === "cheer") {
    const q = Math.min(1, t / 0.35);
    pose.armL = q * (1.15 + Math.sin(t * 12) * 0.18);
    pose.armR = -pose.armL;
    pose.y = Math.abs(Math.sin(t * 7)) * 0.1 * q;
    pose.sy = 1 + Math.sin(t * 7) * 0.035 * q;
  }
  if (action === "surprised") {
    pose.sy = keys(t, [0, 0.15, 0.32, 0.7, 1.1], [1, 0.88, 1.17, 1.06, 1]);
    pose.sx = 1 / Math.sqrt(pose.sy);
    pose.y = keys(t, [0, 0.2, 0.4, 0.7, 1.1], [0, 0, 0.13, 0.04, 0]);
    pose.eye = keys(t, [0, 0.25, 0.8, 1.2], [1, 1.25, 1.25, 1]);
    pose.armL = keys(t, [0, 0.3, 0.8, 1.2], [0, 0.75, 0.75, 0]);
    pose.armR = -pose.armL;
  }
  if (frame % Math.round(fps * 3.4) < Math.round(fps * 0.1)) pose.eye = 0.12;
  return pose;
};
