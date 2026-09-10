import React from "react";
import { ThreeCanvas } from "@remotion/three";
import { useVideoConfig } from "remotion";
import { characterPose, type ClaudeAction } from "./character-motion";
import type { FacePose } from "./face-motion";

// Extracted base silhouette from ClaudeCrewReel.tsx, also shared by the
// chenbuildsai Mascot.tsx. Keep the pixel silhouette and terracotta identity.
export const Claude2D: React.FC<{
  frame: number;
  size?: number;
  cheer?: number;
  armSwing?: number;
  face?: FacePose;
}> = ({ frame, size = 240, cheer = 0, armSwing = 0, face }) => {
  const blink = frame % 84 < 5 ? 0.15 : 1;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      shapeRendering="crispEdges"
      style={{ overflow: "visible" }}
    >
      <g fill="#D97757">
        <rect
          x="8"
          y={86 - cheer * 26}
          width="26"
          height="26"
          transform={`rotate(${-armSwing} 34 99)`}
        />
        <rect
          x="166"
          y={86 - cheer * 26}
          width="26"
          height="26"
          transform={`rotate(${armSwing} 166 99)`}
        />
        <rect x="34" y="44" width="132" height="102" />
        {[52, 77, 124, 149].map((x) => (
          <rect key={x} x={x} y="146" width="17" height="38" />
        ))}
      </g>
      <rect x="34" y="44" width="132" height="10" fill="white" opacity=".16" />
      {[70, 116].map((x, i) =>
        face ? (
          <g key={x} transform={`translate(${face.gazeX},${face.gazeY})`}>
            <rect
              x={x}
              y={83 - 13 * (i ? face.rightOpen : face.leftOpen)}
              width={15}
              height={26 * (i ? face.rightOpen : face.leftOpen)}
              fill="#151312"
              opacity={1 - face.happy}
            />
            <path
              d={`M${x - 1} 88 Q${x + 7.5} 74 ${x + 16} 88`}
              fill="none"
              stroke="#151312"
              strokeWidth={7}
              strokeLinecap="square"
              opacity={face.happy}
            />
          </g>
        ) : (
          <rect
            key={x}
            x={x}
            y={70 + (26 - 26 * blink) / 2}
            width="15"
            height={26 * blink}
            fill="#151312"
          />
        ),
      )}
    </svg>
  );
};

// Box geometry from chenbuildsai/src/character/Cube3D.tsx. Alpha-safe glow
// follows .cgi-proof/Creature.tsx: no full-canvas bloom pass.
// Orthographic camera: feet at world y=0 project to canvas y=size/2.
export const Claude3D: React.FC<{
  size: number;
  frame: number;
  fps: number;
  action?: ClaudeAction;
}> = ({ size, frame, fps, action = "idle" }) => {
  const p = characterPose(frame, fps, action);
  const { width } = useVideoConfig();
  const material = (
    <meshStandardMaterial
      color="#FF935C"
      emissive="#ED632F"
      emissiveIntensity={0.48}
      roughness={0.5}
    />
  );
  return (
    <ThreeCanvas
      width={size}
      height={size}
      dpr={Math.max(1, width / 1920)}
      orthographic
      camera={{ position: [0, 0, 8], zoom: size / 4.8, near: 0.1, far: 30 }}
      gl={{ alpha: true, premultipliedAlpha: false }}
      onCreated={({ gl }) => gl.setClearAlpha(0)}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={1.2} />
      <directionalLight position={[3, 4, 5]} intensity={3} color="#ffe0bd" />
      <directionalLight position={[-3, 1, -2]} intensity={1} color="#bdd5ff" />
      <group
        position={[0, p.y, 0]}
        rotation={[0, p.turn, p.tilt]}
        scale={[p.sx, p.sy, p.sx]}
      >
        <mesh position={[0, 0.81, 0]}>
          <boxGeometry args={[1, 0.86, 0.82]} />
          {material}
        </mesh>
        {[-1, 1].map((s) => (
          <group
            key={s}
            position={[s * 0.49, 0.79, 0.03]}
            rotation={[0, 0, s < 0 ? -p.armL : -p.armR]}
          >
            <mesh position={[s * 0.15, -0.06, 0]}>
              <boxGeometry args={[0.28, 0.24, 0.25]} />
              {material}
            </mesh>
          </group>
        ))}
        {[-0.29, 0.29].flatMap((x) =>
          [-0.23, 0.23].map((z) => (
            <group
              key={`${x}-${z}`}
              position={[x, 0.38, z]}
              rotation={[x < 0 ? p.legL : p.legR, 0, 0]}
            >
              <mesh position={[0, -0.19, 0]}>
                <boxGeometry args={[0.15, 0.38, 0.15]} />
                {material}
              </mesh>
            </group>
          )),
        )}
        {[-0.2, 0.2].map((x) => (
          <mesh key={x} position={[x, 0.9, 0.422]} scale={[1, p.eye, 1]}>
            <boxGeometry args={[0.12, 0.25, 0.035]} />
            <meshBasicMaterial color="#20120c" />
          </mesh>
        ))}
      </group>
    </ThreeCanvas>
  );
};
