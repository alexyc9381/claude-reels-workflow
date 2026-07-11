import React, { useMemo } from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { fraunces, frauncesItalic, inter } from "./fonts";

/**
 * GregStyle3D — Greg-Isenberg-style reel with REAL 3D claymation graphics.
 * 3D objects (matte rounded tiles + sphere, soft shadow-mapped, perspective depth)
 * rendered via @remotion/three, composited over the cream paper-grid background and
 * under the editorial serif/italic captions. Smooth eased motion, no bounce.
 */

const CREAM = "#ECE9E2";
const INK = "#1A1813";
const GREEN = "#3C6B52";

const easeOut = (frame: number, start: number, dur = 18) =>
  interpolate(frame, [start, start + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

// ---------- glyph -> CanvasTexture (crisp icon on tile face) ----------
const drawGlyph = (ctx: CanvasRenderingContext2D, kind: string, color: string) => {
  const S = 256;
  ctx.clearRect(0, 0, S, S);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 22;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  const c = S / 2;
  if (kind === "spark") {
    ctx.beginPath();
    const pts = [[c, 40], [148, 108], [216, c], [148, 148], [c, 216], [108, 148], [40, c], [108, 108]];
    pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
    ctx.closePath();
    ctx.fill();
  } else if (kind === "chat") {
    ctx.beginPath();
    ctx.roundRect(48, 56, 160, 110, 26);
    ctx.moveTo(96, 166);
    ctx.lineTo(86, 210);
    ctx.lineTo(132, 166);
    ctx.stroke();
  } else if (kind === "code") {
    ctx.beginPath();
    ctx.moveTo(104, 78); ctx.lineTo(50, c); ctx.lineTo(104, 178);
    ctx.moveTo(152, 78); ctx.lineTo(206, c); ctx.lineTo(152, 178);
    ctx.stroke();
  } else if (kind === "nodes") {
    [[64, 188], [192, 188], [c, 70]].forEach(([x, y]) => { ctx.beginPath(); ctx.arc(x, y, 26, 0, 7); ctx.stroke(); });
    ctx.beginPath();
    ctx.moveTo(80, 168); ctx.lineTo(116, 92);
    ctx.moveTo(140, 92); ctx.lineTo(176, 168);
    ctx.moveTo(90, 188); ctx.lineTo(166, 188);
    ctx.stroke();
  } else if (kind === "play") {
    ctx.beginPath();
    ctx.moveTo(96, 72); ctx.lineTo(192, c); ctx.lineTo(96, 184);
    ctx.closePath();
    ctx.fill();
  } else { // layers
    ctx.beginPath();
    ctx.moveTo(c, 60); ctx.lineTo(206, 116); ctx.lineTo(c, 172); ctx.lineTo(50, 116); ctx.closePath();
    ctx.moveTo(64, 150); ctx.lineTo(c, 200); ctx.lineTo(192, 150);
    ctx.stroke();
  }
};

const useGlyphTexture = (kind: string, color: string) =>
  useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d")!;
    drawGlyph(ctx, kind, color);
    const tex = new THREE.CanvasTexture(canvas);
    tex.anisotropy = 8;
    return tex;
  }, [kind, color]);

// ---------- a single 3D tile ----------
const Tile: React.FC<{ kind: string; dark: boolean; angle: number; radius: number; index: number }> = ({ kind, dark, angle, radius, index }) => {
  const frame = useCurrentFrame();
  const e = easeOut(frame, 14 + index * 4, 22);
  const a = (angle * Math.PI) / 180;
  const r = radius + (1 - e) * 0.55; // assemble outward->in
  const bob = Math.sin((frame + index * 17) / 26) * 0.045;
  const x = Math.cos(a) * r;
  const y = Math.sin(a) * r + bob;
  const tex = useGlyphTexture(kind, dark ? "#EFF3EE" : "#2A3F34");
  const faceColor = dark ? "#2B4537" : "#F4F1EB";
  const sz = 0.68;
  const depth = 0.2;
  return (
    <group position={[x, y, 0]} scale={0.6 + e * 0.4}>
      <RoundedBox args={[sz, sz, depth]} radius={0.075} smoothness={5} castShadow receiveShadow>
        <meshStandardMaterial color={faceColor} roughness={0.82} metalness={0} />
      </RoundedBox>
      <mesh position={[0, 0, depth / 2 + 0.001]}>
        <planeGeometry args={[sz * 0.62, sz * 0.62]} />
        <meshBasicMaterial map={tex} transparent toneMapped={false} />
      </mesh>
    </group>
  );
};

const Scene: React.FC = () => {
  const frame = useCurrentFrame();
  const sphereE = easeOut(frame, 4, 22);
  const groupRot = Math.sin(frame / 70) * 0.16; // gentle sway
  const tiles = [
    { kind: "spark", dark: true },
    { kind: "chat", dark: false },
    { kind: "code", dark: true },
    { kind: "nodes", dark: false },
    { kind: "play", dark: true },
    { kind: "layers", dark: false },
  ];
  const sphereBob = Math.sin(frame / 30) * 0.04;
  return (
    <>
      <ambientLight intensity={0.85} />
      <directionalLight
        position={[2.6, 3.8, 3.2]}
        intensity={2.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-radius={9}
        shadow-bias={-0.0004}
        shadow-camera-near={0.5}
        shadow-camera-far={20}
        shadow-camera-left={-4}
        shadow-camera-right={4}
        shadow-camera-top={4}
        shadow-camera-bottom={-4}
      />
      <directionalLight position={[-3, 1, 2]} intensity={0.5} />

      {/* transparent shadow catcher: lets the cream grid show through, only renders shadows */}
      <mesh position={[0, -0.85, -0.45]} receiveShadow>
        <planeGeometry args={[16, 16]} />
        <shadowMaterial transparent opacity={0.13} />
      </mesh>

      <group position={[0, -0.85, 0]} rotation={[-0.13, groupRot, 0]}>
        {/* center matte sphere */}
        <mesh position={[0, sphereBob, 0.05]} scale={0.55 + sphereE * 0.45} castShadow>
          <sphereGeometry args={[0.5, 64, 64]} />
          <meshStandardMaterial color={"#24382E"} roughness={0.62} metalness={0.05} />
        </mesh>
        {/* orbiting tiles */}
        {tiles.map((t, i) => (
          <Tile key={i} kind={t.kind} dark={t.dark} angle={-90 + i * 60} radius={1.05} index={i} />
        ))}
      </group>
    </>
  );
};

// ---------- cream paper background (HTML, behind canvas) ----------
const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame / 90) * 6;
  return (
    <AbsoluteFill style={{ backgroundColor: CREAM }}>
      <AbsoluteFill
        style={{
          transform: `translate(${drift}px, ${drift * 0.6}px)`,
          backgroundImage:
            "linear-gradient(rgba(26,24,19,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(26,24,19,0.045) 1px, transparent 1px)",
          backgroundSize: "66px 66px",
        }}
      />
      <AbsoluteFill style={{ opacity: 0.05, mixBlendMode: "multiply" }}>
        <svg width="100%" height="100%">
          <filter id="paper3d">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves={2} stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#paper3d)" />
        </svg>
      </AbsoluteFill>
      <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 46%, rgba(0,0,0,0) 55%, rgba(40,32,20,0.10) 100%)" }} />
    </AbsoluteFill>
  );
};

// ---------- editorial caption (HTML, above canvas) ----------
type W = { t: string; x: number; y: number; size: number; green?: boolean; italic?: boolean; start: number };
const CaptionWord: React.FC<W> = ({ t, x, y, size, green, italic, start }) => {
  const frame = useCurrentFrame();
  const e = easeOut(frame, start, 16);
  return (
    <div style={{ position: "absolute", left: x, top: y, opacity: e, transform: `translateY(${(1 - e) * 26}px)`, fontFamily: italic ? frauncesItalic.fontFamily : fraunces.fontFamily, fontStyle: italic ? "italic" : "normal", fontWeight: italic ? 700 : 600, fontSize: size, lineHeight: 1, color: green ? GREEN : INK, letterSpacing: "-0.01em" }}>
      {t}
    </div>
  );
};

const Caption: React.FC = () => {
  const words: W[] = [
    { t: "every", x: 150, y: 230, size: 104, start: 6 },
    { t: "tool", x: 470, y: 330, size: 104, start: 13 },
    { t: "you", x: 210, y: 450, size: 104, start: 21 },
    { t: "need.", x: 470, y: 540, size: 150, green: true, italic: true, start: 30 },
  ];
  return <>{words.map((w, i) => <CaptionWord key={i} {...w} />)}</>;
};

const Pill: React.FC = () => {
  const frame = useCurrentFrame();
  const e = easeOut(frame, 84, 22);
  return (
    <div style={{ position: "absolute", left: 540 - 118, top: 1792, opacity: e, transform: `translateY(${(1 - e) * 16}px)`, padding: "12px 26px", borderRadius: 999, background: INK, color: CREAM, fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 600, fontSize: 34, boxShadow: "0 12px 24px rgba(40,32,20,0.25)" }}>
      ✦ AI-native
    </div>
  );
};

export const GregStyle3D: React.FC = () => {
  const { width, height } = useVideoConfig();
  return (
    <AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
      <Background />
      <AbsoluteFill>
        <ThreeCanvas
          width={width}
          height={height}
          shadows
          gl={{ antialias: true, preserveDrawingBuffer: true }}
          camera={{ fov: 34, position: [0, 0, 9.0], near: 0.1, far: 50 }}
          style={{ position: "absolute" }}
        >
          <Scene />
        </ThreeCanvas>
      </AbsoluteFill>
      <Caption />
      <Pill />
    </AbsoluteFill>
  );
};
