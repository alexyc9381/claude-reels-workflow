import type { YouTubeEditManifest } from "./types";
export const editTimeline = (manifest: YouTubeEditManifest) => {
  let sourceTotal = 0,
    outputTotal = 0;
  return manifest.segments.map((segment) => {
    if (
      segment.sourceStartFrame < 0 ||
      segment.sourceEndFrame <= segment.sourceStartFrame
    )
      throw new Error("Invalid source segment");
    sourceTotal += segment.sourceEndFrame - segment.sourceStartFrame;
    const end = Math.round(
      (sourceTotal / manifest.sourceFps) * manifest.outputFps,
    );
    const item = { segment, from: outputTotal, duration: end - outputTotal };
    outputTotal = end;
    if (item.duration < 1)
      throw new Error("Segment is shorter than an output frame");
    return item;
  });
};
export const durationInOutputFrames = (m: YouTubeEditManifest) =>
  editTimeline(m).reduce((n, s) => n + s.duration, 0);
/** Fast initial push, then a continuous, progressively slower settle. */
export const openingScale = (seconds: number) =>
  1 +
  0.055 * (1 - Math.exp(-Math.max(0, seconds) * 5)) +
  0.015 * (1 - Math.exp(-Math.max(0, seconds) * 0.5));
