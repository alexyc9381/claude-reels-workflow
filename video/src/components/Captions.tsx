import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT } from "../brand";
import captions from "../data/captions.json";

type Cap = { text: string; from: number; to: number };

// Faux outline + drop shadow so white reads on any background, like the reference.
const STROKE =
  "0 0 1px rgba(0,0,0,0.55), 2px 2px 0 rgba(0,0,0,0.30), -1px 1px 0 rgba(0,0,0,0.30), 1px -1px 0 rgba(0,0,0,0.30), 0 4px 14px rgba(0,0,0,0.55)";

export const Captions: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const list = captions as Cap[];
  const active = list.find((c) => frame >= c.from && frame < c.to);
  if (!active) return null;

  const pop = spring({
    frame: frame - active.from,
    fps,
    config: { damping: 200, mass: 0.5, stiffness: 200 },
  });
  const scale = interpolate(pop, [0, 1], [0.965, 1]);
  const opacity = interpolate(pop, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 86,
      }}
    >
      <div
        style={{
          maxWidth: 1180,
          textAlign: "center",
          transform: `scale(${scale})`,
          opacity,
          fontFamily: FONT.sans,
          fontWeight: 800,
          fontSize: 52,
          lineHeight: 1.15,
          color: COLORS.white,
          letterSpacing: -0.2,
          textShadow: STROKE,
          padding: "0 40px",
        }}
      >
        {active.text}
      </div>
    </AbsoluteFill>
  );
};

// Subtle gradient anchor at the very bottom so captions always have contrast.
export const BottomScrim: React.FC = () => (
  <AbsoluteFill style={{ pointerEvents: "none" }}>
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 320,
        background:
          "linear-gradient(to top, rgba(2,15,30,0.62) 0%, rgba(2,15,30,0.30) 38%, rgba(2,15,30,0) 100%)",
      }}
    />
  </AbsoluteFill>
);
