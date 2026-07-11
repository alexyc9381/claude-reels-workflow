import React from "react";
import { AbsoluteFill, Audio, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame } from "remotion";
import { ShortCaptions } from "./short/ShortCaptions";
import { SHORT_TIMELINE } from "./short/shortTimeline";
import { LogoChip } from "./components/primitives";

export const MatchternShort: React.FC = () => {
  const frame = useCurrentFrame();
  // subtle constant push-in; origin near his face so the layout stays stable
  const scale = interpolate(frame, [0, 933], [1.0, 1.03]);
  const wmOp = interpolate(frame, [8, 24], [0, 0.92], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ backgroundColor: "#0b0d10" }}>
      <AbsoluteFill style={{ transform: `scale(${scale})`, transformOrigin: "50% 42%" }}>
        <OffthreadVideo src={staticFile("research_base.mp4")} muted />
      </AbsoluteFill>
      <Audio src={staticFile("research_base.mp4")} />

      {SHORT_TIMELINE.map((b, i) => (
        <Sequence key={i} from={b.from} durationInFrames={b.dur}>
          {b.el(b.dur)}
        </Sequence>
      ))}

      <ShortCaptions />

      {/* brand mark, bottom-left, clear of captions */}
      <div style={{ position: "absolute", left: 40, bottom: 48, opacity: wmOp }}>
        <LogoChip size={78} radius={18} />
      </div>
    </AbsoluteFill>
  );
};
