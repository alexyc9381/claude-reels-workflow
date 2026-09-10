import type {YouTubeProfile} from "./types";

export type ProfilePreset = {
  maxPauseSeconds: number;
  sentenceEndRestoreSeconds: number;
  screenInset: boolean;
  captionsByDefault: boolean;
};

export const PROFILE_PRESETS: Record<YouTubeProfile, ProfilePreset> = {
  course: {
    maxPauseSeconds: 0.5,
    sentenceEndRestoreSeconds: 0.35,
    screenInset: true,
    captionsByDefault: true,
  },
  "screen-demo": {
    maxPauseSeconds: 0.5,
    sentenceEndRestoreSeconds: 0,
    screenInset: false,
    captionsByDefault: true,
  },
  "talking-head": {
    maxPauseSeconds: 0.65,
    sentenceEndRestoreSeconds: 0,
    screenInset: false,
    captionsByDefault: false,
  },
};
