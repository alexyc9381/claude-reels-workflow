import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT } from "../brand";

// Real institutional logos (official marks, downloaded for the client's video) on white cards.

export const SchoolEmblem: React.FC<{
  name: string;
  color: string;
  logo: string;
  stat: string;
  delay: number;
}> = ({ name, color, logo, stat, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 160, stiffness: 130, mass: 0.7 } });
  const sc = interpolate(s, [0, 1], [0.6, 1]);
  const op = interpolate(s, [0, 1], [0, 1]);
  const float = Math.sin((frame - delay) / 30 + delay) * 5;
  return (
    <div
      style={{
        transform: `scale(${sc}) translateY(${float}px)`,
        opacity: op,
        width: 230,
        height: 250,
        background: "#fff",
        borderRadius: 22,
        padding: "24px 18px 18px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 24px 60px rgba(0,0,0,0.45)",
      }}
    >
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
        <Img src={staticFile(logo)} style={{ maxHeight: 110, maxWidth: 150, objectFit: "contain" }} />
      </div>
      <div style={{ fontFamily: FONT.serif, fontWeight: 800, color, fontSize: 28, lineHeight: 1, textAlign: "center" }}>{name}</div>
      <div style={{ fontFamily: FONT.sans, fontWeight: 700, color: "#5b6470", fontSize: 18, marginTop: 4 }}>{stat}</div>
    </div>
  );
};

export const SCHOOLS: { name: string; color: string; logo: string; stat: string }[] = [
  { name: "Harvard", color: "#A41034", logo: "img/harvard.svg", stat: "~3% accepted" },
  { name: "Stanford", color: "#8C1515", logo: "img/stanford.svg", stat: "~4% accepted" },
  { name: "MIT", color: "#750014", logo: "img/mit.svg", stat: "~5% accepted" },
  { name: "Columbia", color: "#1D4F91", logo: "img/columbia.svg", stat: "~4% accepted" },
];
