import { Easing, interpolate } from "remotion";

// Design coordinates are 1920x1080; the stage scales once for a 4K master.
export const DESIGN = {
  width: 1920,
  height: 1080,
  gradient:
    "radial-gradient(ellipse at 12% 95%, #ccd9ed 0%, transparent 55%), radial-gradient(ellipse at 90% 0%, #ebd4c9 0%, transparent 55%), linear-gradient(130deg,#eceef3,#e5e8ef)",
  ink: "#20242d",
  muted: "#737c8b",
  accent: "#D97757",
  screen: { left: 28, top: 28, width: 1864, height: 1024, radius: 22 },
  face: { width: 432, height: 360, radius: 26, left: 54, bottom: 54 },
};
export const premium = (frame: number, start: number, length: number) =>
  interpolate(frame, [start, start + Math.max(1, length)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });
