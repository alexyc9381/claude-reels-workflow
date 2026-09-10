import React from "react";
import { ThreeCanvas } from "@remotion/three";
import { RoundedBox } from "@react-three/drei";
import { useVideoConfig } from "remotion";
import { characterPose, type ClaudeAction } from "./character-motion";

// Core-to-shell radiance: spatial shading, not a uniformly orange surface.
// Deliberately alpha-safe: postprocessing bloom previously made a visible rectangle.
const vertex = `varying vec3 vP; varying vec3 vN; varying vec3 vV;
void main(){vP=position;vec4 p=modelViewMatrix*vec4(position,1.);vN=normalize(normalMatrix*normal);vV=normalize(-p.xyz);gl_Position=projectionMatrix*p;}`;
const fragment = `varying vec3 vP; varying vec3 vN; varying vec3 vV; uniform float pulse;
void main(){vec3 n=normalize(vN);float facing=max(dot(n,normalize(vV)),0.);float rim=pow(1.-facing,2.);
float core=exp(-dot(vP.xy-vec2(-.1,.1),vP.xy-vec2(-.1,.1))*7.5);
float key=.72+.28*max(dot(n,normalize(vec3(-.4,.8,1.))),0.);
vec3 amber=mix(vec3(1.,.19,.014),vec3(1.,.83,.39),core*.92);
vec3 color=amber*key*pulse+vec3(1.,.43,.04)*rim*.48;
gl_FragColor=vec4(color,1.);}`;

export const GlowingClaude: React.FC<{
  size: number;
  frame: number;
  fps: number;
  action?: ClaudeAction;
  form?: "cube" | "ember";
  glow?: number;
}> = ({ size, frame, fps, action = "idle", form = "cube", glow = 1 }) => {
  const p = characterPose(frame, fps, action),
    { width } = useVideoConfig();
  const bodyY = 0.5 - (p.y + 0.81 * p.sy) / 4.8,
    pulse = 1 + Math.sin((frame / fps) * 3) * 0.055;
  const mat = () => (
    <shaderMaterial
      vertexShader={vertex}
      fragmentShader={fragment}
      uniforms={{ pulse: { value: pulse } }}
      toneMapped={false}
    />
  );
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <div
        style={{
          position: "absolute",
          left: size * 0.12,
          top: bodyY * size - size * 0.38,
          width: size * 0.76,
          height: size * 0.76,
          background:
            "radial-gradient(ellipse,#ffcf764a 0%,#ff871b35 20%,#ff650817 39%,#ff650800 68%)",
          opacity: glow * pulse,
          mixBlendMode: "screen",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          filter: `drop-shadow(0 0 ${size * 0.008}px #ffbc58bb) drop-shadow(0 0 ${size * 0.024}px #ff790b88)`,
        }}
      >
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
          <group
            position={[0, p.y, 0]}
            rotation={[0, p.turn, p.tilt]}
            scale={[p.sx, p.sy, p.sx]}
          >
            {form === "cube" ? (
              <RoundedBox
                args={[1, 0.86, 0.82]}
                radius={0.065}
                smoothness={4}
                position={[0, 0.81, 0]}
              >
                {mat()}
              </RoundedBox>
            ) : (
              <mesh position={[0, 0.77, 0]}>
                <sphereGeometry args={[0.6, 48, 48]} />
                {mat()}
              </mesh>
            )}
            {[-1, 1].map((s) => (
              <group
                key={s}
                position={[s * 0.49, 0.79, 0.03]}
                rotation={[0, 0, s < 0 ? -p.armL : -p.armR]}
              >
                <RoundedBox
                  args={[0.29, 0.24, 0.25]}
                  radius={0.055}
                  smoothness={3}
                  position={[s * 0.15, -0.06, 0]}
                >
                  {mat()}
                </RoundedBox>
              </group>
            ))}
            {[-0.29, 0.29].flatMap((x) =>
              (form === "cube" ? [-0.23, 0.23] : [0.14]).map((z) => (
                <group
                  key={`${x}-${z}`}
                  position={[x, 0.38, z]}
                  rotation={[x < 0 ? p.legL : p.legR, 0, 0]}
                >
                  <RoundedBox
                    args={[0.17, 0.38, 0.19]}
                    radius={0.06}
                    smoothness={3}
                    position={[0, -0.19, 0]}
                  >
                    {mat()}
                  </RoundedBox>
                </group>
              )),
            )}
            {[-0.2, 0.2].map((x) => (
              <RoundedBox
                key={x}
                args={form === "cube" ? [0.12, 0.25, 0.035] : [0.14, 0.2, 0.08]}
                radius={0.015}
                smoothness={3}
                position={[x, 0.9, form === "cube" ? 0.428 : 0.56]}
                scale={[1, p.eye, 1]}
              >
                <meshBasicMaterial color="#200b02" toneMapped={false} />
              </RoundedBox>
            ))}
          </group>
        </ThreeCanvas>
      </div>
    </div>
  );
};

/** Light and shadow remain on the contact plane while the character leaves it. */
export const ContactLight: React.FC<{
  size: number;
  frame: number;
  fps: number;
  action?: ClaudeAction;
}> = ({ size, frame, fps, action = "idle" }) => {
  const p = characterPose(frame, fps, action),
    contact = 1 - Math.min(1, p.y / 0.65);
  return (
    <div
      style={{
        position: "absolute",
        width: size,
        height: size * 0.23,
        left: -size / 2,
        top: -size * 0.09,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse,#ffa43f${Math.round(
            (0.17 + 0.18 * contact) * 255,
          )
            .toString(16)
            .padStart(2, "0")} 0%,#ff760f22 35%,transparent 70%)`,
          mixBlendMode: "screen",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "28%",
          top: "40%",
          width: "44%",
          height: "26%",
          borderRadius: "50%",
          background: "#231006",
          filter: "blur(5px)",
          opacity: 0.15 + 0.4 * contact,
          transform: `scale(${0.75 + 0.25 * contact})`,
        }}
      />
    </div>
  );
};
