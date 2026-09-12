import React from "react";
import { ThreeCanvas } from "@remotion/three";
import { useVideoConfig } from "remotion";
import { characterPose, type ClaudeAction } from "./character-motion";
import type { FacePose } from "./face-motion";
import { CAST_ACCENTS } from "./bold-motion";

// Extracted base silhouette from ClaudeCrewReel.tsx, also shared by the
// chenbuildsai Mascot.tsx. Keep the pixel silhouette and terracotta identity.
export const Claude2D: React.FC<{
  frame: number;
  size?: number;
  cheer?: number;
  armSwing?: number;
  face?: FacePose;
  gait?: { phase: number; amount: number };
  outfit?: "courier" | "archivist" | "operator";
  gesture?: number;
  colorful?: boolean;
  leftArmAngle?: number;
  rightArmAngle?: number;
}> = ({
  frame,
  size = 240,
  cheer = 0,
  armSwing = 0,
  face,
  gait,
  outfit,
  gesture = 0,
  colorful = false,
  leftArmAngle,
  rightArmAngle,
}) => {
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
          transform={`rotate(${leftArmAngle ?? -armSwing} 34 99)`}
        />
        <rect
          x="166"
          y={86 - cheer * 26}
          width="26"
          height="26"
          transform={`rotate(${rightArmAngle ?? armSwing} 166 99)`}
        />
        <rect x="34" y="44" width="132" height="102" />
        {[52, 77, 124, 149].map((x, i) => {
          const step = gait
            ? Math.sin(gait.phase + (i % 2) * Math.PI) * gait.amount
            : 0;
          return (
            <rect
              key={x}
              x={x + step * 4}
              y="146"
              width="17"
              height={38 - Math.max(0, step) * 11}
            />
          );
        })}
      </g>
      <rect x="34" y="44" width="132" height="10" fill="white" opacity=".16" />
      {outfit === "courier" && (
        <g shapeRendering="geometricPrecision">
          <g transform={`rotate(${gesture * 4} 100 45)`}>
            <path
              d="M46 44V29Q100 2 151 29V44Z"
              fill={colorful ? CAST_ACCENTS.teal : "#F9EDD8"}
              stroke="#9D5738"
              strokeWidth="3"
            />
            <path d="M42 44H174Q184 52 169 55H42Z" fill="#AC5737" />
            <path d="M87 23H111V39H87Z" fill="#D97757" />
          </g>
          <path d="M38 110L160 137" stroke="#75442E" strokeWidth="10" />
          <g transform={`rotate(${-gesture * 10} 134 126)`}>
            <rect
              x="122"
              y="128"
              width="45"
              height="32"
              rx="5"
              fill={colorful ? CAST_ACCENTS.mint : "#F8E6C8"}
              stroke="#9D5738"
              strokeWidth="3"
            />
            <path
              d="M128 133L144 145L162 133"
              fill="none"
              stroke="#9D5738"
              strokeWidth="3"
            />
          </g>
          <path
            d={`M39 112Q${5 - gesture * 8} ${100 + gesture * 12} ${-3 - gesture * 7} ${124 + gesture * 8}L25 131L44 122Z`}
            fill={colorful ? CAST_ACCENTS.gold : "#F8E6C8"}
          />
          <path
            d="M35 106H165V120H35Z"
            fill={colorful ? CAST_ACCENTS.gold : "#F8E6C8"}
          />
        </g>
      )}
      {outfit === "archivist" && (
        <g shapeRendering="geometricPrecision">
          <path
            d="M34 108H67L99 138L132 108H166V146H34Z"
            fill={colorful ? CAST_ACCENTS.blue : "#855138"}
          />
          <path d="M67 108L99 119L132 108L115 146H84Z" fill="#FFF4DE" />
          <path
            d={`M94 120H106L${111 + gesture * 3} 141L101 148L90 141Z`}
            fill="#D97757"
          />
          <circle cx="144" cy="130" r="5" fill="#EACB91" />
        </g>
      )}
      {outfit === "operator" && (
        <g shapeRendering="geometricPrecision">
          <g transform={`rotate(${-18 - gesture * 25} 178 102)`}>
            <path
              d="M175 108V54H187V108Z"
              fill="#C4A178"
              stroke="#765039"
              strokeWidth="2"
            />
            <path
              d="M175 58Q157 51 165 31L174 42H186L195 31Q205 53 187 58Z"
              fill="#FAEACD"
              stroke="#765039"
              strokeWidth="3"
            />
            <rect x="172" y="96" width="19" height="18" rx="4" fill="#9B6944" />
          </g>
          <path
            d="M40 118H160V146H40Z"
            fill={colorful ? CAST_ACCENTS.teal : "#F4DFB8"}
          />
          <path
            d="M54 101V135M146 101V135"
            stroke={colorful ? CAST_ACCENTS.teal : "#F4DFB8"}
            strokeWidth="13"
          />
          <path d="M77 123H126V140H77Z" fill="#C28B52" />
          <g transform={`rotate(${gesture * 5} 100 48)`}>
            <path
              d="M40 47Q47 13 102 13Q155 13 162 47Z"
              fill={colorful ? CAST_ACCENTS.gold : "#E8BB72"}
              stroke="#AB713A"
              strokeWidth="3"
            />
            <path d="M28 47H174V56H28Z" fill="#FFF0CF" />
            <path d="M98 16V43" stroke="#FFF0CF" strokeWidth="7" />
          </g>
        </g>
      )}
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
      {outfit === "archivist" && (
        <g
          shapeRendering="geometricPrecision"
          transform={`translate(0,${-gesture * 3})`}
          fill="none"
          stroke="#633E2B"
          strokeWidth="4"
        >
          <rect x="59" y="66" width="38" height="34" rx="9" />
          <rect x="107" y="66" width="38" height="34" rx="9" />
          <path d="M97 77Q102 73 107 77M49 73L59 76M145 76L157 72" />
          <path
            d="M64 71L73 71M112 71L121 71"
            stroke="#FFF8E9"
            strokeWidth="2"
          />
        </g>
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
