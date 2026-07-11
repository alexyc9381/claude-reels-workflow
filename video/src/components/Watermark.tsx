import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { LogoChip } from "./primitives";

// Persistent brand mark, top-left over the dark curtain area (cleanest zone).
export const Watermark: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [10, 28], [0, 0.96], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div style={{ position: "absolute", top: 40, left: 44, opacity }}>
        <LogoChip size={66} radius={15} />
      </div>
    </AbsoluteFill>
  );
};
