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
  type: "spec" | "step" | "tool" | "waited" | "note" | "definition";
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
  chromeCrop?: { top: number; right: number; bottom: number; left: number };
  segments: EditSegment[];
  overlays?: OverlayEvent[];
  presenter?: {
    source: string;
    fps: number;
    width: number;
    height: number;
    offsetSeconds?: number;
    side?: "left" | "right";
    positionY?: number;
    backgroundBlur?: number;
    foregroundFrames?: string[];
  };
  audioMaster?: "source" | "presenter" | "mute";
  openingSeconds?: number;
  graphics?: {
    kind: "workflow" | "context" | "sprite";
    fromFrame: number;
    durationInFrames: number;
    title?: string;
  }[];
  cgi?: {
    source: string;
    points: { frame: number; x: number; y: number }[];
    size: number;
    layer?: "front" | "behind-person";
    appearance?: "original" | "glowing-cube" | "glowing-ember" | "graphic";
    assetSource?: string;
    actions?: {
      fromFrame: number;
      durationInFrames: number;
      action: "idle" | "walk" | "hop" | "cheer" | "surprised";
      sound?: string;
      volume?: number;
    }[];
  };
};
