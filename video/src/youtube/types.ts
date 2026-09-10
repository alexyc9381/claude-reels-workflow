export type YouTubeProfile = "course" | "screen-demo" | "talking-head";

export type FocusRegion = {
  scale: number;
  x: number;
  y: number;
  target: string;
};

export type EditSegment = {
  sourceStartFrame: number;
  sourceEndFrame: number;
  reason?: string;
  focus?: FocusRegion;
};

export type OverlayEvent = {
  type: "spec" | "step" | "tool" | "waited" | "note";
  fromFrame: number;
  durationInFrames: number;
  title: string;
  detail?: string;
  anchor?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
};

export type YouTubeEditManifest = {
  version: 1;
  profile: YouTubeProfile;
  source: string;
  sourceFps: number;
  outputFps: number;
  sourceWidth?: number;
  sourceHeight?: number;
  chromeCrop?: {top: number; right: number; bottom: number; left: number};
  segments: EditSegment[];
  overlays?: OverlayEvent[];
};
