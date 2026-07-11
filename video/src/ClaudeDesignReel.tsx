import React, { useMemo } from "react";
import {
  AbsoluteFill,
  Audio,
  Easing,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { fraunces, frauncesItalic, inter } from "./fonts";
import wordsData from "./data/words.json";

/**
 * ClaudeDesignReel — ~36s Greg-Isenberg-style reel about Claude Design, narrated in
 * an ElevenLabs voice. Editorial serif captions synced word-for-word to the VO, over
 * a cream paper-grid background, with a 3D claymation scene that changes per story beat.
 */

const CREAM = "#ECE9E2";
const INK = "#1A1813";
const GREEN = "#3C6B52";
const BLUE = "#3E5C8A";

type Word = { word: string; start: number; end: number; line: number };
const WORDS = wordsData as Word[];

const clean = (w: string) => w.toLowerCase().replace(/[^a-z']/g, "");
// keyword emphasis per line (green + italic)
const EMPH: Record<number, string[]> = {
  0: ["figma", "nervous"],
  1: ["claude", "design"],
  2: ["landing", "page", "deck", "prototype"],
  3: ["seconds"],
  4: ["nobody's", "ready"],
  5: ["design", "system"],
  6: ["fixes", "mistakes"],
  7: ["can", "ai", "design"],
  8: ["time", "back"],
};

const easeOut = (frame: number, start: number, dur = 14) =>
  interpolate(frame, [start, start + dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

// fade 0->1->1->0 across a window (seconds), with eased edges
const windowFade = (t: number, start: number, end: number, edge = 0.32) => {
  if (t < start - 0.01 || t > end + 0.4) return 0;
  const up = interpolate(t, [start, start + edge], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const dn = interpolate(t, [end - edge, end], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) });
  return Math.min(up, dn);
};

// ---------------- line windows ----------------
const LINES = (() => {
  const byLine: Record<number, Word[]> = {};
  for (const w of WORDS) (byLine[w.line] ||= []).push(w);
  const ids = Object.keys(byLine).map(Number).sort((a, b) => a - b);
  const audioEnd = Math.max(...WORDS.map((w) => w.end));
  return ids.map((li, i) => {
    const ws = byLine[li];
    const start = Math.min(...ws.map((w) => w.start));
    const nextStart = i + 1 < ids.length ? Math.min(...byLine[ids[i + 1]].map((w) => w.start)) : audioEnd + 0.5;
    return { li, start, end: nextStart, words: ws };
  });
})();

// ---------------- CanvasTexture helpers ----------------
const useCanvasTex = (draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void, w = 512, h = 512, deps: any[] = []) =>
  useMemo(() => {
    const c = document.createElement("canvas");
    c.width = w; c.height = h;
    const ctx = c.getContext("2d")!;
    draw(ctx, w, h);
    const t = new THREE.CanvasTexture(c);
    t.anisotropy = 8;
    return t;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

const roundRect = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) => {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
};

const glyphDraw = (kind: string) => (ctx: CanvasRenderingContext2D, S: number) => {
  ctx.clearRect(0, 0, S, S);
  ctx.lineWidth = 26; ctx.lineCap = "round"; ctx.lineJoin = "round";
  const col = "#EFF3EE"; ctx.strokeStyle = col; ctx.fillStyle = col; const c = S / 2;
  if (kind === "spark") { const p = [[c,44],[150,106],[212,c],[150,150],[c,212],[106,150],[44,c],[106,106]]; ctx.beginPath(); p.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y)); ctx.closePath(); ctx.fill(); }
  else if (kind === "type") { ctx.font = "bold 150px Georgia, serif"; ctx.textAlign="center"; ctx.textBaseline="middle"; ctx.fillText("Aa", c, c+8); }
  else if (kind === "swatch") { roundRect(ctx, 78, 78, 100, 100, 22); ctx.fill(); }
  else if (kind === "btn") { roundRect(ctx, 60, 104, 136, 48, 24); ctx.fill(); }
  else if (kind === "grid") { for (let i=0;i<4;i++){ const x=82+(i%2)*60, y=82+Math.floor(i/2)*60; roundRect(ctx,x,y,44,44,10); ctx.fill(); } }
  else if (kind === "check") { ctx.lineWidth=34; ctx.beginPath(); ctx.moveTo(74,c+6); ctx.lineTo(c-12,c+58); ctx.lineTo(c+78,c-52); ctx.stroke(); }
  else { roundRect(ctx, 70, 70, S-140, S-140, 28); ctx.stroke(); }
};

const cardDraw = (mode: "wire" | "polished") => (ctx: CanvasRenderingContext2D, W: number, H: number) => {
  ctx.fillStyle = "#FBFAF6"; roundRect(ctx, 0, 0, W, H, 40); ctx.fill();
  const pad = 44;
  if (mode === "wire") {
    ctx.fillStyle = "#E3E1D9"; roundRect(ctx, pad, pad, W - pad * 2, 90, 16); ctx.fill();
    ctx.fillStyle = "#ECEAE3";
    [0, 1, 2].forEach((i) => { roundRect(ctx, pad, 180 + i * 70, W - pad * 2 - (i === 2 ? 120 : 0), 40, 12); ctx.fill(); });
    ctx.fillStyle = "#E3E1D9"; roundRect(ctx, pad, H - 150, W - pad * 2, 100, 18); ctx.fill();
  } else {
    ctx.fillStyle = GREEN; roundRect(ctx, pad, pad, W - pad * 2, 150, 20); ctx.fill();
    ctx.fillStyle = "#F2C14E"; roundRect(ctx, pad, pad + 30, 90, 90, 18); ctx.fill();
    ctx.fillStyle = "#2C3140"; [0,1].forEach(i=>{ roundRect(ctx, pad, 250 + i*60, W - pad*2 - (i?140:0), 36, 12); ctx.fill(); });
    ctx.fillStyle = BLUE; roundRect(ctx, pad, H - 150, 220, 90, 24); ctx.fill();
    ctx.fillStyle = "#E3E1D9"; roundRect(ctx, pad + 250, H - 150, W - pad*2 - 250, 90, 24); ctx.fill();
  }
};

// ---------------- 3D primitives ----------------
const Glyph: React.FC<{ kind: string; size?: number }> = ({ kind, size = 0.42 }) => {
  const tex = useCanvasTex((ctx, S) => glyphDraw(kind)(ctx, S), 256, 256, [kind]);
  return (<mesh position={[0, 0, 0.001]}><planeGeometry args={[size, size]} /><meshBasicMaterial map={tex} transparent toneMapped={false} /></mesh>);
};

const TileMesh: React.FC<{ dark?: boolean; size?: number; depth?: number; glyph?: string }> = ({ dark = true, size = 0.7, depth = 0.2, glyph }) => (
  <group>
    <RoundedBox args={[size, size, depth]} radius={0.08} smoothness={5} castShadow receiveShadow>
      <meshStandardMaterial color={dark ? "#2B4537" : "#F4F1EB"} roughness={0.82} metalness={0} />
    </RoundedBox>
    {glyph && <group position={[0, 0, depth / 2 + 0.002]}><Glyph kind={glyph} size={size * 0.55} /></group>}
  </group>
);

const Card: React.FC<{ mode: "wire" | "polished"; w?: number; h?: number }> = ({ mode, w = 1.0, h = 1.35 }) => {
  const tex = useCanvasTex((ctx, W, H) => cardDraw(mode)(ctx, W, H), 512, 690, [mode]);
  return (
    <group>
      <RoundedBox args={[w, h, 0.12]} radius={0.06} smoothness={5} castShadow receiveShadow>
        <meshStandardMaterial color={"#FBFAF6"} roughness={0.9} />
      </RoundedBox>
      <mesh position={[0, 0, 0.061]}><planeGeometry args={[w, h]} /><meshBasicMaterial map={tex} toneMapped={false} /></mesh>
    </group>
  );
};

// ---------------- scenes ----------------
const SceneWrap: React.FC<{ start: number; end: number; children: React.ReactNode }> = ({ start, end, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const f = windowFade(t, start, end, 0.4);
  if (f <= 0.001) return null;
  return <group scale={[f, f, f]}>{children}</group>;
};

const SceneOrbit: React.FC<{ start: number }> = ({ start }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - start * fps;
  const rot = local * 0.004;
  const tiles = ["spark", "type", "swatch", "btn", "grid", "spark"];
  return (
    <group position={[0, -0.55, 0]} rotation={[-0.12, Math.sin(local / 70) * 0.14, 0]}>
      <mesh position={[0, Math.sin(local / 30) * 0.04, 0.05]} castShadow>
        <sphereGeometry args={[0.5, 64, 64]} />
        <meshStandardMaterial color={"#24382E"} roughness={0.62} metalness={0.05} />
      </mesh>
      {tiles.map((g, i) => {
        const a = (-90 + i * 60) * (Math.PI / 180) + rot;
        const e = easeOut(frame, start * fps + 6 + i * 4, 22);
        const r = 1.15;
        return (
          <group key={i} position={[Math.cos(a) * r, Math.sin(a) * r + Math.sin((frame + i * 17) / 26) * 0.04, 0]} scale={0.5 + e * 0.5}>
            <TileMesh dark={i % 2 === 0} glyph={g} size={0.62} />
          </group>
        );
      })}
    </group>
  );
};

const SceneCards: React.FC<{ start: number }> = ({ start }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = start * fps;
  const spots: { x: number; mode: "wire" | "polished"; rot: number; d: number }[] = [
    { x: -1.15, mode: "wire", rot: 0.16, d: 4 },
    { x: 0, mode: "polished", rot: -0.04, d: 14 },
    { x: 1.15, mode: "wire", rot: -0.16, d: 24 },
  ];
  return (
    <group position={[0, -0.5, 0]} rotation={[-0.05, 0, 0]}>
      {spots.map((sp, i) => {
        const e = easeOut(frame, s + sp.d, 22);
        const bob = Math.sin((frame + i * 30) / 30) * 0.05;
        const y = bob + (1 - e) * -0.5;
        const z = sp.mode === "polished" ? 0.35 : 0;
        return (
          <group key={i} position={[sp.x, y, z]} rotation={[0, sp.x * 0.18, sp.rot]} scale={(sp.mode === "polished" ? 1.12 : 0.92) * (0.7 + e * 0.3)}>
            <Card mode={sp.mode} />
          </group>
        );
      })}
    </group>
  );
};

const SceneImport: React.FC<{ start: number }> = ({ start }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const s = start * fps;
  // central container tile
  const chips = [
    { g: "swatch", from: [-2.0, 1.3] },
    { g: "type", from: [2.1, 0.9] },
    { g: "btn", from: [-2.2, -0.6] },
    { g: "grid", from: [2.0, -1.2] },
    { g: "spark", from: [-1.6, -1.7] },
  ];
  const checkT = start + 7.4; // "checks its own work / fixes"
  const checkE = easeOut(frame, checkT * fps, 16);
  return (
    <group position={[0, -0.5, 0]} rotation={[-0.12, Math.sin((frame - s) / 80) * 0.1, 0]}>
      <RoundedBox args={[1.5, 1.5, 0.26]} radius={0.12} smoothness={5} castShadow receiveShadow>
        <meshStandardMaterial color={"#243A2F"} roughness={0.78} />
      </RoundedBox>
      <group position={[0, 0, 0.14]}><Glyph kind="grid" size={0.7} /></group>
      {chips.map((ch, i) => {
        const arrive = start + 1.0 + i * 0.55;
        const e = easeOut(frame, arrive * fps, 26);
        const x = interpolate(e, [0, 1], [ch.from[0], Math.cos((i / 5) * Math.PI * 2) * 0.0]);
        const y = interpolate(e, [0, 1], [ch.from[1], 0]);
        const sc = interpolate(e, [0, 1], [0.85, 0.0001]) + (1 - e) * 0; // shrink as it "enters" container
        const op = 1 - e;
        if (op < 0.02) return null;
        return (
          <group key={i} position={[x, y, 0.2 + (1 - e) * 0.3]} scale={0.42 * (0.6 + op)}>
            <TileMesh dark={i % 2 === 0} glyph={ch.g} size={0.62} depth={0.18} />
          </group>
        );
      })}
      {/* self-check badge */}
      {checkE > 0.01 && (
        <group position={[0.75, 0.78, 0.45]} scale={0.5 * checkE} rotation={[0, 0, -0.1]}>
          <mesh castShadow><sphereGeometry args={[0.55, 48, 48]} /><meshStandardMaterial color={GREEN} roughness={0.5} /></mesh>
          <group position={[0, 0, 0.5]}><Glyph kind="check" size={0.6} /></group>
        </group>
      )}
    </group>
  );
};

const SceneCloser: React.FC<{ start: number }> = ({ start }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - start * fps;
  return (
    <group position={[0, -0.4, 0]} rotation={[-0.1, Math.sin(local / 60) * 0.18, 0]}>
      <mesh position={[0, Math.sin(local / 28) * 0.05, 0]} castShadow>
        <sphereGeometry args={[0.72, 64, 64]} />
        <meshStandardMaterial color={"#24382E"} roughness={0.6} metalness={0.05} />
      </mesh>
      <group position={[0, 0, 0.74]}><Glyph kind="spark" size={0.5} /></group>
    </group>
  );
};

const ThreeScenes: React.FC = () => (
  <>
    <ambientLight intensity={0.85} />
    <directionalLight position={[2.6, 3.8, 3.2]} intensity={2.5} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} shadow-radius={9} shadow-bias={-0.0004} shadow-camera-near={0.5} shadow-camera-far={20} shadow-camera-left={-5} shadow-camera-right={5} shadow-camera-top={5} shadow-camera-bottom={-5} />
    <directionalLight position={[-3, 1, 2]} intensity={0.5} />
    <mesh position={[0, -0.5, -0.7]} receiveShadow><planeGeometry args={[20, 20]} /><shadowMaterial transparent opacity={0.13} /></mesh>
    <SceneWrap start={0} end={5.4}><SceneOrbit start={0} /></SceneWrap>
    <SceneWrap start={5.4} end={15.0}><SceneCards start={5.4} /></SceneWrap>
    <SceneWrap start={15.0} end={30.0}><SceneImport start={15.0} /></SceneWrap>
    <SceneWrap start={30.0} end={37.5}><SceneCloser start={30.0} /></SceneWrap>
  </>
);

// ---------------- captions ----------------
const CaptionLine: React.FC<{ line: typeof LINES[number] }> = ({ line }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const op = windowFade(t, line.start, line.end, 0.28);
  if (op <= 0.001) return null;
  const emph = EMPH[line.li] || [];
  return (
    <div style={{ position: "absolute", inset: 0, top: 210, height: 560, display: "flex", alignItems: "center", justifyContent: "center", opacity: op }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "center", gap: "0 18px", width: 920, textAlign: "center" }}>
        {line.words.map((w, i) => {
          if (/^[—–-]+$/.test(w.word)) return null;
          const green = emph.includes(clean(w.word));
          const e = easeOut(frame, w.start * fps, 7);
          return (
            <span key={i} style={{ display: "inline-block", transform: `translateY(${(1 - e) * 22}px)`, opacity: e, fontFamily: green ? frauncesItalic.fontFamily : fraunces.fontFamily, fontStyle: green ? "italic" : "normal", fontWeight: green ? 700 : 600, fontSize: green ? 82 : 70, lineHeight: 1.08, color: green ? GREEN : INK, letterSpacing: "-0.01em" }}>
              {w.word}
            </span>
          );
        })}
      </div>
    </div>
  );
};

// ---------------- background ----------------
const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame / 90) * 6;
  return (
    <AbsoluteFill style={{ backgroundColor: CREAM }}>
      <AbsoluteFill style={{ transform: `translate(${drift}px, ${drift * 0.6}px)`, backgroundImage: "linear-gradient(rgba(26,24,19,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(26,24,19,0.045) 1px, transparent 1px)", backgroundSize: "66px 66px" }} />
      <AbsoluteFill style={{ opacity: 0.05, mixBlendMode: "multiply" }}>
        <svg width="100%" height="100%"><filter id="paperR"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves={2} stitchTiles="stitch" /></filter><rect width="100%" height="100%" filter="url(#paperR)" /></svg>
      </AbsoluteFill>
      <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 44%, rgba(0,0,0,0) 55%, rgba(40,32,20,0.10) 100%)" }} />
    </AbsoluteFill>
  );
};

// ---------------- main ----------------
export const ClaudeDesignReel: React.FC = () => {
  const { width, height } = useVideoConfig();
  return (
    <AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
      <Audio src={staticFile("vo.mp3")} />
      <Background />
      <AbsoluteFill>
        <ThreeCanvas width={width} height={height} shadows gl={{ antialias: true, preserveDrawingBuffer: true }} camera={{ fov: 36, position: [0, 0, 9.2], near: 0.1, far: 50 }} style={{ position: "absolute" }}>
          <ThreeScenes />
        </ThreeCanvas>
      </AbsoluteFill>
      {LINES.map((l) => <CaptionLine key={l.li} line={l} />)}
      {/* small kicker label */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 1740, textAlign: "center", fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 600, fontSize: 32, color: INK, opacity: 0.62 }}>
        ✦ Claude Design — Anthropic Labs
      </div>
    </AbsoluteFill>
  );
};
