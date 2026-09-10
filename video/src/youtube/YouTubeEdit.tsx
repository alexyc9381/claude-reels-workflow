import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  Sequence,
  staticFile,
  useVideoConfig,
} from "remotion";
import type {EditSegment, OverlayEvent, YouTubeEditManifest} from "./types";
import {PROFILE_PRESETS} from "./profiles";

const ACCENT = "#E36336";
const PAPER = "#EFF0EA";
const INK = "#242424";

const clampFocus = (segment: EditSegment) => {
  const focus = segment.focus ?? {scale: 1, x: 0.5, y: 0.5, target: "full frame"};
  return {
    scale: Math.max(1, Math.min(2, focus.scale)),
    x: Math.max(0, Math.min(1, focus.x)),
    y: Math.max(0, Math.min(1, focus.y)),
  };
};

const Anchor: Record<NonNullable<OverlayEvent["anchor"]>, React.CSSProperties> = {
  "top-left": {top: 54, left: 64},
  "top-right": {top: 54, right: 64},
  "bottom-left": {bottom: 64, left: 64},
  "bottom-right": {bottom: 64, right: 64},
};

const OverlayCard: React.FC<{event: OverlayEvent}> = ({event}) => (
  <div
    style={{
      position: "absolute",
      ...(Anchor[event.anchor ?? "top-right"]),
      maxWidth: 560,
      padding: "18px 22px",
      borderRadius: 14,
      color: PAPER,
      background: "rgba(20, 20, 20, 0.88)",
      borderLeft: `7px solid ${ACCENT}`,
      boxShadow: "0 14px 36px rgba(0,0,0,0.28)",
      fontFamily: "Inter, Helvetica Neue, sans-serif",
    }}
  >
    <div style={{fontSize: 18, fontWeight: 800, letterSpacing: "0.12em", color: ACCENT}}>
      {event.type.toUpperCase()}
    </div>
    <div style={{fontSize: 34, fontWeight: 750, lineHeight: 1.12, marginTop: 5}}>
      {event.title}
    </div>
    {event.detail ? (
      <div style={{fontSize: 22, lineHeight: 1.25, marginTop: 7, opacity: 0.84}}>
        {event.detail}
      </div>
    ) : null}
  </div>
);

export const durationInOutputFrames = (manifest: YouTubeEditManifest): number =>
  manifest.segments.reduce((total, segment) => {
    const sourceFrames = segment.sourceEndFrame - segment.sourceStartFrame;
    return total + Math.round((sourceFrames / manifest.sourceFps) * manifest.outputFps);
  }, 0);

export const YouTubeEdit: React.FC<{manifest: YouTubeEditManifest}> = ({manifest}) => {
  const {fps} = useVideoConfig();
  const preset = PROFILE_PRESETS[manifest.profile];
  const sourceWidth = manifest.sourceWidth ?? 1920;
  const sourceHeight = manifest.sourceHeight ?? 1080;
  const crop = manifest.chromeCrop;
  const clipPath = crop
    ? `inset(${(crop.top / sourceHeight) * 100}% ${(crop.right / sourceWidth) * 100}% ${(crop.bottom / sourceHeight) * 100}% ${(crop.left / sourceWidth) * 100}%)`
    : undefined;
  if (Math.abs(fps - manifest.outputFps) > 0.001) {
    throw new Error(`Composition fps ${fps} does not match manifest outputFps ${manifest.outputFps}`);
  }

  let cursor = 0;
  const clips = manifest.segments.map((segment, index) => {
    const sourceDuration = segment.sourceEndFrame - segment.sourceStartFrame;
    const duration = Math.round((sourceDuration / manifest.sourceFps) * manifest.outputFps);
    const from = cursor;
    cursor += duration;
    const focus = clampFocus(segment);
    const startFrom = Math.round((segment.sourceStartFrame / manifest.sourceFps) * manifest.outputFps);
    return (
      <Sequence key={`${segment.sourceStartFrame}-${index}`} from={from} durationInFrames={duration}>
        <AbsoluteFill style={{backgroundColor: preset.screenInset ? PAPER : INK}}>
          <div
            style={preset.screenInset ? {
              position: "absolute",
              top: 38,
              right: 56,
              bottom: 92,
              left: 56,
              overflow: "hidden",
              borderRadius: 18,
              backgroundColor: INK,
              boxShadow: "0 18px 46px rgba(0,0,0,0.24)",
            } : {
              position: "absolute",
              inset: 0,
              overflow: "hidden",
              backgroundColor: INK,
            }}
          >
            <div style={{position: "absolute", inset: 0, clipPath}}>
              <OffthreadVideo
                src={staticFile(manifest.source)}
                startFrom={startFrom}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transform: `scale(${focus.scale})`,
                  transformOrigin: `${focus.x * 100}% ${focus.y * 100}%`,
                }}
              />
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>
    );
  });

  return (
    <AbsoluteFill style={{backgroundColor: INK}}>
      {clips}
      {(manifest.overlays ?? []).map((event, index) => (
        <Sequence key={`${event.type}-${event.fromFrame}-${index}`} from={event.fromFrame} durationInFrames={event.durationInFrames}>
          <OverlayCard event={event}/>
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
