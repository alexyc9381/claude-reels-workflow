import React from "react";
import { Loop, OffthreadVideo, staticFile, useVideoConfig } from "remotion";

/** The existing ChenBuildsAI ProRes asset, NOT a recreated mesh.
 * Source SHA256: 0e9263ca447bb7e652bba4d1fcce7fb54e047d8024ad236e5c25530b773973aa
 * 1024x1024, 30fps, 90 frames, ProRes 4444 with alpha.
 * Grade copied from src/patterns/companion.tsx; original pixels stay in cube.mov.
 */
export const OriginalClaude: React.FC<{
  size: number;
  source?: string;
  productionGrade?: boolean;
}> = ({ size, source = "cube.mov", productionGrade = true }) => {
  const { fps } = useVideoConfig();
  return (
    <div
      style={{
        width: size,
        height: size,
        opacity: productionGrade ? 0.96 : 1,
        filter: productionGrade
          ? `brightness(1.22) saturate(1.2) drop-shadow(0 0 ${(size * 34) / 300}px rgba(255,150,60,.95)) drop-shadow(0 0 ${(size * 80) / 300}px rgba(255,110,20,.6))`
          : undefined,
      }}
    >
      <Loop durationInFrames={Math.round(3 * fps)}>
        <OffthreadVideo
          src={staticFile(source)}
          muted
          transparent
          style={{ width: "100%", height: "100%" }}
        />
      </Loop>
    </div>
  );
};
