import React from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  OffthreadVideo,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { Captions, BottomScrim } from "./components/Captions";
import { Watermark } from "./components/Watermark";
import { TIMELINE } from "./data/timeline";

// Gentle breathing zoom + small punch-ins on emphasis beats (talking-head sections).
const PUNCHES = [24.7, 48.9, 126.4, 143.0, 182.4].map((s) => Math.round(s * 30));
function videoScale(frame: number): number {
  const breathe = interpolate(frame, [0, 5822], [1.02, 1.06]);
  let punch = 0;
  for (const p of PUNCHES) {
    punch += interpolate(
      frame,
      [p - 6, p + 4, p + 30, p + 44],
      [0, 0.035, 0.035, 0],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );
  }
  return breathe + punch;
}

export const MatchternLongform: React.FC = () => {
  const frame = useCurrentFrame();
  const scale = videoScale(frame);
  return (
    <AbsoluteFill style={{ backgroundColor: "#02101f" }}>
      {/* Base video */}
      <AbsoluteFill style={{ transform: `scale(${scale})`, transformOrigin: "50% 42%" }}>
        <OffthreadVideo src={staticFile("base.mp4")} muted />
      </AbsoluteFill>

      {/* Original audio */}
      <Audio src={staticFile("base.mp4")} />

      {/* Branded end-card sound effect (whoosh into chime) at the sign-off */}
      <Sequence from={5820}>
        <Audio src={staticFile("sfx_end.wav")} volume={0.55} />
      </Sequence>

      {/* Caption contrast anchor */}
      <BottomScrim />

      {/* Timed overlay graphics */}
      {TIMELINE.map((b, i) => (
        <Sequence key={i} from={b.from} durationInFrames={b.dur}>
          {b.el(b.dur)}
        </Sequence>
      ))}

      {/* Captions + persistent brand mark on top */}
      <Captions />
      <Watermark />
    </AbsoluteFill>
  );
};
