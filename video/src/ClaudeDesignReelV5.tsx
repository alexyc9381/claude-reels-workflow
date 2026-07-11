import React, { useMemo } from "react";
import {
  AbsoluteFill, Audio, Easing, Img, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig,
} from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { fraunces, frauncesItalic, inter } from "./fonts";
import wordsData from "./data/words.json";

/**
 * ClaudeDesignReelV5 — no people. Each beat is a distinct, content-driven, beat-synced
 * animation (type-on, render/wipe, fan, spin-to-stop, snap-assemble, emit, scan-fix,
 * morph) instead of uniform edge-slides. Narrated + sound-designed, cream/editorial style.
 */
const CREAM = "#ECE9E2", INK = "#1A1813", GREEN = "#3C6B52", BLUE = "#3E5C8A", CORAL = "#D9794F";
type Word = { word: string; start: number; end: number; line: number };
const WORDS = wordsData as Word[];
const clean = (w: string) => w.toLowerCase().replace(/[^a-z']/g, "");
const EMPH = new Set(["figma","nervous","claude","design","landing","page","deck","prototype","seconds","nobody's","ready","system","github","fixes","mistakes","ai","back","time"]);
const FPS = 30;
const fr = (s: number) => s * FPS;
const eOut = (frame: number, sF: number, dur = 10) => interpolate(frame, [sF, sF + dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
const eInOut = (x: number, a: number, b: number) => interpolate(x, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });

// ===== captions =====
const CHUNKS = (() => {
  const byLine: Record<number, Word[]> = {};
  for (const w of WORDS) (byLine[w.line] ||= []).push(w);
  const out: { words: Word[]; start: number }[] = [];
  for (const li of Object.keys(byLine).map(Number).sort((a, b) => a - b)) {
    const ws = byLine[li].filter((w) => !/^[—–-]+$/.test(w.word));
    for (let i = 0; i < ws.length; i += 3) { const g = ws.slice(i, i + 3); out.push({ words: g, start: g[0].start }); }
  }
  const aE = Math.max(...WORDS.map((w) => w.end));
  return out.map((c, i) => ({ ...c, end: i + 1 < out.length ? out[i + 1].start : aE + 0.4 }));
})();
const Captions: React.FC = () => {
  const frame = useCurrentFrame(); const t = frame / FPS;
  return (<>{CHUNKS.map((c, i) => {
    const op = Math.min(eOut(frame, fr(c.start), 4), 1 - eOut(frame, fr(c.end - 0.13), 4));
    if (op <= 0.001) return null;
    return (
      <div key={i} style={{ position: "absolute", inset: 0, top: 225, height: 410, display: "flex", alignItems: "center", justifyContent: "center", opacity: op }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "center", gap: "0 18px", width: 940, textAlign: "center" }}>
          {c.words.map((w, j) => { const g = EMPH.has(clean(w.word)); const e = eOut(frame, fr(w.start), 5);
            return <span key={j} style={{ display: "inline-block", transform: `translateY(${(1 - e) * 16}px)`, opacity: e, fontFamily: g ? frauncesItalic.fontFamily : fraunces.fontFamily, fontStyle: g ? "italic" : "normal", fontWeight: g ? 700 : 600, fontSize: g ? 104 : 90, lineHeight: 1.05, color: g ? GREEN : INK, letterSpacing: "-0.015em", textShadow: "0 2px 16px rgba(236,233,226,0.95)" }}>{w.word}</span>; })}
        </div>
      </div>); })}</>);
};

// ===== canvas textures =====
const rr = (c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) => { c.beginPath(); c.roundRect(x, y, w, h, r); c.fill(); };
const useTex = (draw: (c: CanvasRenderingContext2D, w: number, h: number) => void, w: number, h: number, key: string) =>
  useMemo(() => { const cv = document.createElement("canvas"); cv.width = w; cv.height = h; draw(cv.getContext("2d")!, w, h); const t = new THREE.CanvasTexture(cv); t.anisotropy = 8; return t; }, [key]);
const drawDesignApp = (c: CanvasRenderingContext2D, W: number, H: number) => {
  c.fillStyle = "#0E1726"; c.fillRect(0, 0, W, H); c.fillStyle = "#172339"; rr(c, 0, 0, W, 56, 0);
  c.fillStyle = "#5BC8B0"; rr(c, 24, 16, 24, 24, 6); c.fillStyle = "#101a2e"; rr(c, 0, 56, 70, H - 56, 0);
  c.fillStyle = "#33425f"; [0,1,2,3].forEach(i => rr(c, 22, 86 + i * 52, 28, 28, 8));
  c.fillStyle = "#0a1322"; rr(c, 96, 86, W - 360, H - 130, 18); c.strokeStyle = "rgba(91,200,176,0.7)"; c.lineWidth = 3;
  for (let i = 0; i < 8; i++) { c.beginPath(); c.ellipse(W/2-120, H/2, 60+i*24, 150+i*15, 0.5, 0, 7); c.stroke(); }
  c.fillStyle = "#172339"; rr(c, W - 250, 86, 230, H - 130, 16); c.fillStyle = "#5BC8B0"; rr(c, W - 226, 120, 44, 30, 8);
  c.fillStyle = "#2c3a55"; [0,1,2,3,4].forEach(i => rr(c, W - 226, 180 + i * 56, 182, 14, 7));
};
const drawProto = (c: CanvasRenderingContext2D, W: number, H: number) => {
  c.fillStyle = "#15203A"; c.fillRect(0, 0, W, H); c.fillStyle = GREEN; rr(c, 0, 60, W, 180, 0);
  c.fillStyle = "#F2C14E"; c.beginPath(); c.arc(W/2, 150, 44, 0, 7); c.fill();
  c.fillStyle = "#22304f"; [0,1,2].forEach(i => rr(c, 40, 290 + i * 150, W - 80, 120, 22));
  c.fillStyle = "#0e1730"; rr(c, 0, H - 110, W, 110, 0); c.fillStyle = "#5b6f9c"; [0,1,2,3].forEach(i => rr(c, 60 + i * (W-120)/3 - 18, H - 78, 40, 40, 12));
};
const drawSlide = (i: number) => (c: CanvasRenderingContext2D, W: number, H: number) => {
  const cols = [GREEN, BLUE, CORAL]; c.fillStyle = "#FBFAF6"; c.fillRect(0, 0, W, H); c.fillStyle = cols[i % 3]; rr(c, 0, 0, W, 70, 0);
  c.fillStyle = "#23211C"; rr(c, 40, 110, W - 200, 40, 10); rr(c, 40, 170, W - 320, 28, 8);
  if (i === 1) { c.fillStyle = cols[1]; [0.4,0.7,0.5,0.9,0.6].forEach((h, k) => rr(c, 50 + k * 78, H - 60 - (H-280)*h, 54, (H-280)*h, 8)); }
  else { c.fillStyle = "#D8D5CC"; [0,1,2].forEach(k => rr(c, 40, 240 + k * 64, W - 80 - k*80, 36, 9)); }
};
const drawBoard = (c: CanvasRenderingContext2D, W: number, H: number) => {
  c.fillStyle = "#FBFAF6"; c.fillRect(0, 0, W, H); c.fillStyle = "#23211C"; c.font = "bold 56px Arial"; c.fillText("Design System", 44, 86);
  [GREEN, BLUE, CORAL, "#F2C14E", "#2B4537"].forEach((s, i) => { c.fillStyle = s; rr(c, 44 + i * 110, 130, 92, 92, 18); });
  c.fillStyle = "#23211C"; c.font = "bold 120px Georgia"; c.fillText("Aa", 44, 380);
  c.fillStyle = GREEN; rr(c, 320, 290, 200, 76, 24); c.fillStyle = "#FBFAF6"; c.font = "bold 34px Arial"; c.fillText("Button", 360, 338);
  c.strokeStyle = "#23211C"; c.lineWidth = 4; c.beginPath(); c.roundRect(550, 290, 200, 76, 24); c.stroke();
  c.fillStyle = "#E7E3D9"; [0,1,2].forEach(i => rr(c, 44 + i * (W/3-20), H - 200, W/3 - 60, 150, 18));
};
const drawClockFace = (c: CanvasRenderingContext2D, S: number) => {
  c.clearRect(0, 0, S, S); const cx = S/2; c.fillStyle = "#FBFAF6"; c.beginPath(); c.arc(cx, cx, cx - 8, 0, 7); c.fill();
  c.strokeStyle = "#23211C"; c.lineWidth = 8; c.stroke();
  for (let i = 0; i < 12; i++) { const a = (i/12)*Math.PI*2; c.lineWidth = i%3===0?12:5; const r1 = cx-40, r2 = cx-(i%3===0?70:56); c.beginPath(); c.moveTo(cx+Math.cos(a)*r1, cx+Math.sin(a)*r1); c.lineTo(cx+Math.cos(a)*r2, cx+Math.sin(a)*r2); c.stroke(); }
};
const Screen: React.FC<{ tex: THREE.Texture; w: number; h: number; opacity?: number }> = ({ tex, w, h, opacity = 1 }) => (
  <mesh position={[0, 0, 0.061]}><planeGeometry args={[w, h]} /><meshBasicMaterial map={tex} toneMapped={false} transparent opacity={opacity} /></mesh>
);

// ===== 3D mount gate (hard cut + tiny pop so it reads as an edit, not a zoom) =====
const G3: React.FC<{ s: number; e: number; children: React.ReactNode }> = ({ s, e, children }) => {
  const frame = useCurrentFrame(); const local = frame - fr(s); const lenF = fr(e - s);
  if (local < 0 || local > lenF) return null;
  // smoother entrance + continuous secondary motion (float, drift, gentle rotation) so nothing sits still
  const pop = Math.min(eOut(frame, fr(s), 8), 1 - eOut(frame, fr(e - 0.18), 6));
  const fy = Math.sin(local / 33) * 0.06;
  const fx = Math.cos(local / 41) * 0.045;
  const ry = Math.sin(local / 55) * 0.07;
  return <group position={[fx, fy, 0]} rotation={[0, ry, 0]} scale={0.9 + 0.1 * pop}>{children}</group>;
};

// ----- Monitor that powers on (screen renders in + scanline) -----
const Monitor: React.FC<{ kind: "design"; s: number }> = ({ kind, s }) => {
  const frame = useCurrentFrame(); const local = frame - fr(s);
  const tex = useTex(drawDesignApp, 900, 640, "mon" + kind);
  const on = eOut(frame, fr(s) + 4, 10);
  const scan = interpolate(local, [4, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <group position={[0, -0.4, 0]} rotation={[-0.06, 0, 0]}>
      <RoundedBox args={[2.05, 1.45, 0.12]} radius={0.07} smoothness={5} castShadow receiveShadow position={[0, 0.25, 0]}><meshStandardMaterial color={"#EFEDE6"} roughness={0.8} /></RoundedBox>
      <mesh position={[0, 0.25, 0.055]}><planeGeometry args={[1.86, 1.26]} /><meshBasicMaterial color={"#0C1018"} /></mesh>
      <group position={[0, 0.25, 0]}><Screen tex={tex} w={1.86} h={1.26} opacity={on} /></group>
      {scan < 1 && <mesh position={[0, 0.25 + (0.63 - scan * 1.26), 0.064]}><planeGeometry args={[1.86, 0.05]} /><meshBasicMaterial color={"#9fe8d6"} transparent opacity={0.85 * (1 - scan)} /></mesh>}
      <mesh position={[0, -0.62, -0.02]} castShadow><cylinderGeometry args={[0.08, 0.1, 0.4, 24]} /><meshStandardMaterial color={"#D9D5CB"} roughness={0.7} /></mesh>
      <RoundedBox args={[0.8, 0.06, 0.4]} radius={0.03} position={[0, -0.82, 0]} castShadow receiveShadow><meshStandardMaterial color={"#D9D5CB"} roughness={0.7} /></RoundedBox>
    </group>
  );
};

// ----- Slide deck that fans out from a stack -----
const DeckFan: React.FC<{ s: number }> = ({ s }) => {
  const frame = useCurrentFrame();
  const t0 = useTex(drawSlide(0), 760, 500, "s0"), t1 = useTex(drawSlide(1), 760, 500, "s1"), t2 = useTex(drawSlide(2), 760, 500, "s2");
  const p = eOut(frame, fr(s) + 2, 14);
  const slides = [{ tex: t2, x: 0.42, y: -0.22, r: -0.2 }, { tex: t1, x: 0.2, y: 0, r: -0.08 }, { tex: t0, x: -0.06, y: 0.24, r: 0.06 }];
  return (
    <group position={[0, -0.4, 0]} rotation={[-0.05, 0.05, 0]}>
      {slides.map((sl, i) => (
        <group key={i} position={[sl.x * p, sl.y * p, i * 0.06]} rotation={[0, 0, sl.r * p]}>
          <RoundedBox args={[1.5, 0.98, 0.06]} radius={0.05} smoothness={5} castShadow receiveShadow><meshStandardMaterial color={"#FBFAF6"} roughness={0.9} /></RoundedBox>
          <group position={[0, 0, 0.031]}><Screen tex={sl.tex} w={1.5} h={0.98} /></group>
        </group>
      ))}
    </group>
  );
};

// ----- Phone with a tap ripple + tab highlight moving (interaction) -----
const Phone: React.FC<{ s: number }> = ({ s }) => {
  const frame = useCurrentFrame(); const local = frame - fr(s);
  const tex = useTex(drawProto, 520, 1040, "proto");
  const tab = Math.floor((local / 8) % 4);
  const ripple = (local % 18) / 18;
  return (
    <group position={[0, -0.4, 0]} rotation={[-0.05, 0.18, 0]}>
      <RoundedBox args={[0.86, 1.7, 0.14]} radius={0.16} smoothness={6} castShadow receiveShadow><meshStandardMaterial color={"#23282E"} roughness={0.7} /></RoundedBox>
      <group position={[0, 0, 0.072]}><Screen tex={tex} w={0.74} h={1.56} /></group>
      {/* tab highlight */}
      <mesh position={[-0.27 + tab * 0.18, -0.72, 0.075]}><circleGeometry args={[0.07, 24]} /><meshBasicMaterial color={"#F2C14E"} transparent opacity={0.85} /></mesh>
      {/* tap ripple */}
      <mesh position={[-0.27 + tab * 0.18, -0.72, 0.078]}><ringGeometry args={[0.07 + ripple * 0.12, 0.09 + ripple * 0.12, 32]} /><meshBasicMaterial color={"#FFFFFF"} transparent opacity={0.6 * (1 - ripple)} /></mesh>
    </group>
  );
};

// ----- Clock: hands spin fast then decelerate to stop on "seconds" (14.07s) -----
const ClockSpin: React.FC<{ s: number; stopAt: number }> = ({ s, stopAt }) => {
  const frame = useCurrentFrame(); const t = frame / FPS;
  const tex = useTex(drawClockFace, 512, 512, "clock");
  const spin = eInOut(t, s + 0.3, stopAt); // 0..1 decelerating into the stop
  const min = spin * Math.PI * 2 * 5 + 0.6; // 5 fast turns then rest
  const hr = spin * Math.PI * 2 * 1.4 - 0.5;
  return (
    <group position={[0, -0.4, 0]} rotation={[-0.05, 0, 0]}>
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow><cylinderGeometry args={[0.86, 0.86, 0.16, 64]} /><meshStandardMaterial color={"#E7E3D9"} roughness={0.8} /></mesh>
      <mesh position={[0, 0, 0.083]}><planeGeometry args={[1.62, 1.62]} /><meshBasicMaterial map={tex} transparent toneMapped={false} /></mesh>
      <group position={[0, 0, 0.1]} rotation={[0, 0, -hr]}><RoundedBox args={[0.07, 0.42, 0.04]} radius={0.02} position={[0, 0.16, 0]} castShadow><meshStandardMaterial color={INK} /></RoundedBox></group>
      <group position={[0, 0, 0.12]} rotation={[0, 0, -min]}><RoundedBox args={[0.05, 0.64, 0.03]} radius={0.02} position={[0, 0.28, 0]} castShadow><meshStandardMaterial color={GREEN} /></RoundedBox></group>
      <mesh position={[0, 0, 0.14]}><sphereGeometry args={[0.07, 18, 18]} /><meshStandardMaterial color={CORAL} /></mesh>
    </group>
  );
};

// ----- Design-system board: chips fly in and SNAP into a grid -----
const BoardSnap: React.FC<{ s: number; build?: boolean }> = ({ s, build }) => {
  const frame = useCurrentFrame();
  const tex = useTex(drawBoard, 920, 700, "board");
  const chips = [{ c: GREEN, gx: -0.6, gy: -0.45, from: [-2.4, 1.6] }, { c: BLUE, gx: 0, gy: -0.45, from: [2.6, 1.2] }, { c: CORAL, gx: 0.6, gy: -0.45, from: [-2.6, -1.4] }, { c: "#F2C14E", gx: -0.3, gy: 0.15, from: [2.4, -1.6] }, { c: "#2B4537", gx: 0.3, gy: 0.15, from: [0, 2.2] }];
  return (
    <group position={[0, -0.45, 0]} rotation={[-0.08, 0, 0]}>
      <RoundedBox args={[2.0, 1.55, 0.12]} radius={0.08} smoothness={5} castShadow receiveShadow><meshStandardMaterial color={"#FBFAF6"} roughness={0.92} /></RoundedBox>
      <group position={[0, 0, 0.061]}><Screen tex={tex} w={1.86} h={1.42} /></group>
      {chips.map((ch, i) => {
        const arrive = s + (build ? 0.4 : 0.5) + i * (build ? 0.45 : 0.5);
        const e = eOut(frame, fr(arrive), build ? 12 : 16);
        const snap = e < 1 ? 0 : Math.sin((frame - fr(arrive) - (build ? 12 : 16)) * 0.5) * 0.04 * Math.max(0, 1 - (frame - fr(arrive) - (build ? 12 : 16)) / 8);
        const x = interpolate(e, [0, 1], [ch.from[0], ch.gx]); const y = interpolate(e, [0, 1], [ch.from[1], ch.gy]);
        return <RoundedBox key={i} args={[0.4, 0.4, 0.12]} radius={0.08} position={[x, y, 0.32 + (1 - e) * 0.4]} scale={(0.8 + 0.2 * e) + snap} castShadow><meshStandardMaterial color={ch.c} roughness={0.7} /></RoundedBox>;
      })}
    </group>
  );
};

// ----- Diff card: scan line sweeps down, rows flip red->green, badge pops on "fixes" -----
const ScanFix: React.FC<{ s: number; fixAt: number }> = ({ s, fixAt }) => {
  const frame = useCurrentFrame(); const t = frame / FPS;
  const checkTex = useMemo(() => { const cv = document.createElement("canvas"); cv.width = 256; cv.height = 256; const c = cv.getContext("2d")!; c.strokeStyle = "#EFF3EE"; c.lineWidth = 34; c.lineCap = "round"; c.lineJoin = "round"; c.beginPath(); c.moveTo(70, 134); c.lineTo(112, 186); c.lineTo(196, 74); c.stroke(); return new THREE.CanvasTexture(cv); }, []);
  const scanY = interpolate(t, [s + 0.4, fixAt], [0.42, -0.42], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const rows = [0.3, 0.02, -0.26];
  const badge = eOut(frame, fr(fixAt), 12);
  return (
    <group position={[0, -0.4, 0]} rotation={[-0.05, 0, -0.04]}>
      <RoundedBox args={[1.8, 1.15, 0.1]} radius={0.07} castShadow receiveShadow><meshStandardMaterial color={"#FBFAF6"} roughness={0.9} /></RoundedBox>
      {rows.map((ry, i) => { const fixed = scanY < ry; return <mesh key={i} position={[-0.35, ry, 0.052]}><planeGeometry args={[0.92 - i * 0.12, 0.2]} /><meshBasicMaterial color={fixed ? "#6FBF8E" : "#E59478"} toneMapped={false} /></mesh>; })}
      {/* scan line */}
      {scanY > -0.41 && scanY < 0.41 && <mesh position={[0, scanY, 0.06]}><planeGeometry args={[1.7, 0.03]} /><meshBasicMaterial color={"#3C6B52"} transparent opacity={0.9} /></mesh>}
      <group position={[0.62, 0.34, 0.5]} scale={0.46 * badge}>
        <mesh castShadow><sphereGeometry args={[0.85, 48, 48]} /><meshStandardMaterial color={GREEN} roughness={0.5} /></mesh>
        <mesh position={[0, 0, 0.86]}><planeGeometry args={[0.95, 0.95]} /><meshBasicMaterial map={checkTex} transparent toneMapped={false} /></mesh>
      </group>
    </group>
  );
};

// "the part nobody's ready for" — a charging vault: energy gathers, rays radiate,
// a glowing seam widens with component-chips peeking out, building to a burst.
const Reveal3D: React.FC<{ s: number }> = ({ s }) => {
  const frame = useCurrentFrame(); const local = frame - fr(s);
  const build = eOut(frame, fr(s), fr(1.8));
  const pulse = eOut(frame, fr(s + 1.6), 9);
  const glow = Math.min(1.4, 0.3 + build * 1.0 + pulse * 1.4);
  const rumble = Math.sin(local * 1.3) * 0.025 * build;
  const conv = eOut(frame, fr(s + 0.2), fr(1.5));
  return (
    <group position={[0, -0.4, 0]} rotation={[0, 0, rumble]}>
      {/* bright energy core behind, expanding into the burst */}
      <mesh position={[0, 0, -0.25]}><sphereGeometry args={[0.45 + build * 0.35 + pulse * 0.7, 48, 48]} /><meshBasicMaterial color={"#bdf3e4"} transparent opacity={0.45 * build + pulse * 0.55} /></mesh>
      {/* radiating light rays */}
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * Math.PI * 2 + local * 0.012; const len = 0.6 + build * 1.5 + pulse * 0.9;
        const op = (0.45 * build + pulse * 0.4) * (0.45 + 0.55 * Math.sin(local / 6 + i));
        return <group key={i} rotation={[0, 0, a]}><mesh position={[0, len / 2 + 0.55, -0.35]}><planeGeometry args={[0.05, len]} /><meshBasicMaterial color={"#9fe8d6"} transparent opacity={Math.max(0, op)} /></mesh></group>;
      })}
      {/* the matte vault */}
      <RoundedBox args={[1.2, 1.2, 1.2]} radius={0.16} smoothness={5} castShadow receiveShadow><meshStandardMaterial color={"#1B231F"} roughness={0.5} metalness={0.1} /></RoundedBox>
      {/* glowing seam across the front, widening as it "opens" */}
      <mesh position={[0, 0, 0.615]}><planeGeometry args={[1.0, 0.05 + build * 0.55]} /><meshBasicMaterial color={"#e6fff7"} transparent opacity={glow} /></mesh>
      {/* component chips peeking out of the seam (teasing the next beat) */}
      {[GREEN, BLUE, CORAL].map((c, i) => { const pk = eOut(frame, fr(s + 0.9 + i * 0.22), 10); if (pk <= 0.02) return null; return <RoundedBox key={i} args={[0.26, 0.26, 0.1]} radius={0.06} position={[-0.34 + i * 0.34, pk * 0.6, 0.6]} scale={pk} castShadow><meshStandardMaterial color={c} roughness={0.6} /></RoundedBox>; })}
      {/* energy particles pulled inward */}
      {Array.from({ length: 10 }, (_, i) => { const a = (i / 10) * Math.PI * 2; const r = (1 - conv) * 2.3 + 0.85; const op = (1 - conv) * 0.85; if (op < 0.04) return null; return <mesh key={"p" + i} position={[Math.cos(a) * r, Math.sin(a) * r, 0.25]}><boxGeometry args={[0.09, 0.09, 0.09]} /><meshStandardMaterial color={"#9fe8d6"} emissive={"#9fe8d6"} emissiveIntensity={0.6} /></mesh>; })}
    </group>
  );
};

const ThreeScenes: React.FC = () => (
  <>
    <ambientLight intensity={0.9} />
    <directionalLight position={[2.6, 4.0, 3.4]} intensity={2.4} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} shadow-radius={9} shadow-bias={-0.0004} shadow-camera-near={0.5} shadow-camera-far={20} shadow-camera-left={-5} shadow-camera-right={5} shadow-camera-top={5} shadow-camera-bottom={-5} />
    <directionalLight position={[-3, 1, 2]} intensity={0.5} />
    <mesh position={[0, -0.5, -0.7]} receiveShadow><planeGeometry args={[20, 20]} /><shadowMaterial transparent opacity={0.13} /></mesh>
    <G3 s={3.3} e={5.2}><Monitor kind="design" s={3.3} /></G3>
    <G3 s={8.4} e={9.2}><DeckFan s={8.4} /></G3>
    <G3 s={9.2} e={9.95}><Phone s={9.2} /></G3>
    <G3 s={12.3} e={14.8}><ClockSpin s={12.3} stopAt={14.07} /></G3>
    <G3 s={15.0} e={17.2}><Reveal3D s={15.0} /></G3>
    <G3 s={17.4} e={20.0}><BoardSnap s={17.4} /></G3>
    <G3 s={23.6} e={26.4}><BoardSnap s={23.6} build /></G3>
    <G3 s={26.4} e={29.7}><ScanFix s={26.4} fixAt={27.45} /></G3>
  </>
);

// ===== 2D motion-graphic beats =====
const Center: React.FC<{ s: number; e: number; children: React.ReactNode; fade?: number }> = ({ s, e, children, fade = 0.12 }) => {
  const frame = useCurrentFrame(); const local = frame - fr(s); const lenF = fr(e - s);
  if (local < 0 || local > lenF) return null;
  const op = Math.min(eOut(frame, fr(s), fr(fade)), 1 - eOut(frame, fr(e - fade), fr(fade)));
  return <AbsoluteFill style={{ opacity: op, display: "flex", alignItems: "center", justifyContent: "center" }}>{children}</AbsoluteFill>;
};

const LogoStamp: React.FC<{ name: string; x: number; y: number; size: number; rot: number; delay: number; shake?: boolean }> = ({ name, x, y, size, rot, delay, shake }) => {
  const frame = useCurrentFrame();
  const e = eOut(frame, delay, 7);
  const pop = interpolate(e, [0, 1], [1.5, 1]); // stamp down
  const sh = shake ? Math.sin(frame / 2) * 6 * Math.max(0, 1 - (frame - delay) / 46) : 0;
  return (
    <div style={{ position: "absolute", left: x + sh, top: y + Math.sin((frame + x) / 26) * 5, width: size, height: size, borderRadius: size * 0.24, background: "#fff", boxShadow: "0 26px 50px rgba(40,32,20,0.22)", display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${pop}) rotate(${rot + sh * 0.25}deg)`, opacity: Math.min(1, e * 1.4) }}>
      <Img src={staticFile(`img/logos/${name}.svg`)} style={{ width: size * 0.5, height: size * 0.5 }} />
    </div>
  );
};

// type-on prompt bar
const Typewriter: React.FC<{ s: number; e: number }> = ({ s, e }) => {
  const frame = useCurrentFrame(); const t = frame / FPS; const local = frame - fr(s); const lenF = fr(e - s);
  if (local < 0 || local > lenF) return null;
  const op = Math.min(eOut(frame, fr(s), 3), 1 - eOut(frame, fr(e - 0.12), 3));
  const full = "a landing page, a deck, a prototype…";
  const n = Math.round(interpolate(t, [s + 0.2, s + 1.7], [0, full.length], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const shown = full.slice(0, n);
  const cur = Math.floor(frame / 8) % 2 === 0;
  const done = n >= full.length;
  const gp = done ? 1 + Math.sin(frame / 6) * 0.04 : 1;
  return (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center", opacity: op }}>
      <div style={{ marginTop: 360, width: 820, background: "#fff", borderRadius: 36, boxShadow: "0 36px 80px rgba(40,32,20,0.28)", padding: 50, transform: `translateY(${Math.sin(frame / 27) * 9}px)` }}>
        <div style={{ fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontSize: 40, color: "#9A968B", marginBottom: 26 }}>Describe what you want…</div>
        <div style={{ background: "#F3F1EA", borderRadius: 22, padding: "34px 36px", display: "flex", alignItems: "center", minHeight: 70 }}>
          <span style={{ fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 50, color: INK }}>{shown}</span>
          <span style={{ width: 5, height: 56, background: GREEN, marginLeft: 4, opacity: cur ? 1 : 0 }} />
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 30 }}>
          <div style={{ transform: `scale(${gp})`, padding: "22px 44px", borderRadius: 999, background: GREEN, color: "#fff", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 42 }}>✦ Generate</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// landing page wireframe building (cascade)
const LandingBuild: React.FC<{ s: number; e: number }> = ({ s, e }) => {
  const frame = useCurrentFrame(); const local = frame - fr(s); const lenF = fr(e - s);
  if (local < 0 || local > lenF) return null;
  const op = Math.min(eOut(frame, fr(s), 3), 1 - eOut(frame, fr(e - 0.12), 3));
  const block = (d: number, h: number, w: string, col: string) => { const be = eOut(frame, fr(s) + d, 6); return <div style={{ height: h, width: w, borderRadius: 14, background: col, opacity: be, transform: `translateY(${(1 - be) * 24}px)` }} />; };
  return (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center", opacity: op }}>
      <div style={{ marginTop: 360, width: 760, height: 900, background: "#fff", borderRadius: 32, boxShadow: "0 36px 80px rgba(40,32,20,0.28)", padding: 46, display: "flex", flexDirection: "column", gap: 26 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>{block(2, 44, "120px", GREEN)}<div style={{ display: "flex", gap: 18 }}>{["64px","64px","64px"].map((w,i)=><div key={i} style={{height:18,width:w,borderRadius:9,background:"#DAD6CC",opacity:eOut(frame,fr(s)+4,6)}}/>)}</div></div>
        {block(8, 90, "84%", "#23211C")}
        {block(11, 44, "60%", "#8A867C")}
        {block(15, 84, "240px", GREEN)}
        <div style={{ display: "flex", gap: 22, marginTop: 10 }}>{[0,1,2].map(i=>block(19+i*3,200,"33%","#E7E3D9"))}</div>
      </div>
    </AbsoluteFill>
  );
};

// real product screenshot wiping in (clip-path) + ken burns
const HeroWipe: React.FC<{ s: number; e: number; designAt: number }> = ({ s, e, designAt }) => {
  const frame = useCurrentFrame(); const t = frame / FPS; const local = frame - fr(s); const lenF = fr(e - s);
  if (local < 0 || local > lenF) return null;
  const op = Math.min(eOut(frame, fr(s), 3), 1 - eOut(frame, fr(e - 0.14), 4));
  const wipe = interpolate(t, [s + 0.1, designAt + 0.4], [100, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  const p = interpolate(t, [s, e], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const bgX = interpolate(p, [0, 1], [12, 34]), bgY = interpolate(p, [0, 1], [66, 46]);
  return (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center", opacity: op }}>
      <div style={{ marginTop: 360, width: 880, height: 1000, borderRadius: 40, background: "#fff", boxShadow: "0 40px 90px rgba(40,32,20,0.32)", overflow: "hidden", transform: `rotate(-1.5deg) translateY(${Math.sin(frame / 30) * 10}px)` }}>
        <div style={{ height: 74, background: "#F3F1EA", display: "flex", alignItems: "center", gap: 12, padding: "0 28px", borderBottom: "2px solid #E6E3DA" }}>
          {["#E0795F","#E9C15E","#7BA87F"].map((c,i)=><div key={i} style={{width:18,height:18,borderRadius:9,background:c}}/>)}
          <div style={{ marginLeft: 18, color: "#9A968B", fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 28 }}>claude.ai / design</div>
        </div>
        <div style={{ width: "100%", height: 926, position: "relative", background: "#0C1018" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${staticFile("img/claude-design-hero.jpg")})`, backgroundSize: "175%", backgroundPosition: `${bgX}% ${bgY}%`, backgroundRepeat: "no-repeat", clipPath: `inset(0 ${wipe}% 0 0)` }} />
          {wipe > 0 && <div style={{ position: "absolute", top: 0, bottom: 0, left: `${100 - wipe}%`, width: 6, background: "#9fe8d6", boxShadow: "0 0 24px #9fe8d6" }} />}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// github emits component tiles (stream)
const GithubEmit: React.FC<{ s: number; e: number }> = ({ s, e }) => {
  const frame = useCurrentFrame(); const local = frame - fr(s); const lenF = fr(e - s);
  if (local < 0 || local > lenF) return null;
  const op = Math.min(eOut(frame, fr(s), 4), 1 - eOut(frame, fr(e - 0.14), 4));
  const cols = [GREEN, BLUE, CORAL, "#F2C14E", "#2B4537", GREEN, BLUE];
  return (
    <AbsoluteFill style={{ opacity: op }}>
      <LogoStamp name="github" x={390} y={760} size={300} rot={-3} delay={fr(s) + 2} />
      {cols.map((c, i) => {
        const st = fr(s) + 12 + i * 5; const e2 = eOut(frame, st, 30); if (e2 <= 0) return null;
        const ang = -1.1 + (i / cols.length) * 1.8;
        const x = 540 + Math.sin(ang) * (e2 * 560); const y = 980 + e2 * (520 + i * 20);
        return <div key={i} style={{ position: "absolute", left: x, top: y, width: 84, height: 84, borderRadius: 22, background: c, boxShadow: "0 12px 24px rgba(40,32,20,0.2)", opacity: 1 - e2 * 0.7, transform: `rotate(${e2 * 60}deg)` }} />;
      })}
      <div style={{ position: "absolute", top: 1340, width: "100%", textAlign: "center", fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 600, fontSize: 44, color: INK, opacity: 0.72 }}>straight from your repo</div>
    </AbsoluteFill>
  );
};

// dark slam pattern-interrupt
const Slam: React.FC<{ s: number; e: number }> = ({ s, e }) => {
  const frame = useCurrentFrame(); const t = frame / FPS; const local = frame - fr(s); const lenF = fr(e - s);
  if (local < 0 || local > lenF) return null;
  const flash = interpolate(local, [0, 2, 8], [0.5, 0.32, 0], { extrapolateRight: "clamp" });
  const slab = eOut(frame, fr(s) + 1, 5); const slabScale = interpolate(slab, [0, 1], [1.6, 1]);
  const op = Math.min(1, eOut(frame, fr(s), 2)) * (1 - eOut(frame, fr(e - 0.16), 4));
  const glint = Math.sin(local / 7) * 0.5 + 0.5;
  return (
    <AbsoluteFill style={{ opacity: op }}>
      <AbsoluteFill style={{ background: "#15140F", opacity: flash }} />
      <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ marginTop: 360, width: 640, height: 640, borderRadius: 60, background: "radial-gradient(circle at 38% 32%, #2A3A30, #12181400 72%), #14130F", boxShadow: "0 50px 110px rgba(0,0,0,0.5)", transform: `scale(${slabScale})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontSize: 150, color: "#F4F7F2", opacity: 0.5 + glint * 0.5, filter: `drop-shadow(0 0 ${20 * glint}px rgba(159,232,214,0.8))` }}>✦</div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// wireframe morphs into polished design
const Morph: React.FC<{ s: number; e: number; designAt: number }> = ({ s, e, designAt }) => {
  const frame = useCurrentFrame(); const t = frame / FPS; const local = frame - fr(s); const lenF = fr(e - s);
  if (local < 0 || local > lenF) return null;
  const op = Math.min(eOut(frame, fr(s), 3), 1 - eOut(frame, fr(e - 0.14), 4));
  const m = eInOut(t, designAt - 0.8, designAt + 0.5); // 0 wire -> 1 polished
  const card = (children: React.ReactNode) => <div style={{ position: "absolute", inset: 0, padding: 46, display: "flex", flexDirection: "column", gap: 24 }}>{children}</div>;
  return (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center", opacity: op }}>
      <div style={{ marginTop: 360, width: 760, height: 900, background: "#fff", borderRadius: 32, boxShadow: "0 36px 80px rgba(40,32,20,0.28)", overflow: "hidden", position: "relative", transform: `translateY(${Math.sin(frame / 29) * 10}px)` }}>
        <div style={{ opacity: 1 - m }}>{card(<>
          <div style={{ height: 70, width: "50%", border: "3px dashed #C9C5BB", borderRadius: 12 }} />
          <div style={{ height: 150, width: "100%", border: "3px dashed #C9C5BB", borderRadius: 12 }} />
          <div style={{ height: 40, width: "70%", border: "3px dashed #C9C5BB", borderRadius: 12 }} />
          <div style={{ height: 40, width: "55%", border: "3px dashed #C9C5BB", borderRadius: 12 }} />
          <div style={{ height: 70, width: "32%", border: "3px dashed #C9C5BB", borderRadius: 12 }} />
        </>)}</div>
        <div style={{ opacity: m }}>{card(<>
          <div style={{ height: 70, width: "50%", background: GREEN, borderRadius: 14 }} />
          <div style={{ height: 150, width: "100%", background: "linear-gradient(120deg,#1E2B45,#3E5C8A)", borderRadius: 14 }} />
          <div style={{ height: 40, width: "70%", background: "#23211C", borderRadius: 12 }} />
          <div style={{ height: 40, width: "55%", background: "#C9C5BB", borderRadius: 12 }} />
          <div style={{ height: 70, width: "32%", background: CORAL, borderRadius: 14 }} />
        </>)}</div>
        <div style={{ position: "absolute", right: 40, top: 36, fontSize: 70, opacity: m, filter: "drop-shadow(0 0 16px rgba(159,232,214,0.7))" }}>✦</div>
      </div>
    </AbsoluteFill>
  );
};

const EndCard: React.FC<{ s: number; e: number }> = ({ s, e }) => {
  const frame = useCurrentFrame(); const local = frame - fr(s); const lenF = fr(e - s);
  if (local < 0) return null;
  const a = eOut(frame, fr(s) + 2, 12); const b = eOut(frame, fr(s) + 10, 12);
  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <div style={{ marginTop: 200, width: 220, height: 220, borderRadius: 54, background: "#fff", boxShadow: "0 30px 60px rgba(40,32,20,0.22)", display: "flex", alignItems: "center", justifyContent: "center", opacity: a, transform: `scale(${0.7 + a * 0.3})` }}>
        <Img src={staticFile("img/logos/claude.svg")} style={{ width: 110, height: 110 }} />
      </div>
      <div style={{ marginTop: 50, fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 84, color: INK, opacity: b }}>Claude Design</div>
      <div style={{ marginTop: 14, fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 600, fontSize: 40, color: GREEN, opacity: b }}>by Anthropic Labs</div>
    </AbsoluteFill>
  );
};

// ===== dense, hard-hitting OPENING (0–3.3s) =====
const frac = (x: number) => x - Math.floor(x);
const rnd = (i: number, s = 0) => frac(Math.sin(i * 12.9898 + s * 78.233) * 43758.5453);
const Shock: React.FC<{ at: number; cx: number; cy: number; col?: string }> = ({ at, cx, cy, col = "60,107,82" }) => {
  const frame = useCurrentFrame(); const d = frame - fr(at);
  if (d < 0 || d > 20) return null;
  const p = d / 20; const sz = interpolate(p, [0, 1], [40, 1050]);
  return <div style={{ position: "absolute", left: cx - sz / 2, top: cy - sz / 2, width: sz, height: sz, borderRadius: "50%", border: `${interpolate(p, [0, 1], [14, 1])}px solid rgba(${col},${0.55 * (1 - p)})` }} />;
};
const Opening: React.FC = () => {
  const frame = useCurrentFrame(); const t = frame / FPS;
  if (t > 3.4) return null;
  const outer = 1 - eOut(frame, fr(3.1), 6);
  // screen shake spiking on impacts
  let sx = 0, sy = 0;
  for (const im of [{ t: 0.0, a: 6 }, { t: 1.0, a: 22 }, { t: 2.23, a: 11 }]) { const d = frame - fr(im.t); if (d >= 0 && d < 10) { const k = Math.max(0, 1 - d / 10); sx += Math.sin(d * 3.3) * im.a * k; sy += Math.cos(d * 2.9) * im.a * k; } }
  const fade = 1 - eOut(frame, fr(2.9), 10);
  const sweep = interpolate(t, [0.9, 1.6], [-1300, 1500], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sweepOp = t > 0.88 && t < 1.66 ? 0.5 * (1 - Math.abs(interpolate(t, [0.9, 1.6], [-1, 1]))) : 0;
  const aE = eOut(frame, 0, 6); const aPop = interpolate(aE, [0, 1], [1.5, 1]);
  const cE = eOut(frame, fr(0.8), 7); const cDropY = (1 - cE) * -760;
  const cSquash = interpolate(frame - fr(0.8), [7, 11, 18], [1.12, 0.92, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const figLocal = frame - fr(2.2); const figE = eOut(frame, fr(2.2), 6);
  const figShake = Math.sin(frame / 1.9) * 8 * Math.max(0, 1 - figLocal / 30);
  return (
    <AbsoluteFill style={{ transform: `translate(${sx}px, ${sy}px)`, opacity: outer }}>
      {/* screen-filling particle flurry */}
      {Array.from({ length: 22 }, (_, i) => {
        const x = 30 + rnd(i, 1) * 1010, y = 130 + rnd(i, 2) * 1660;
        const size = 22 + rnd(i, 3) * 62; const isSpark = rnd(i, 4) > 0.5;
        const col = [GREEN, BLUE, CORAL, INK, "#FFFFFF"][Math.floor(rnd(i, 5) * 5)];
        const delay = rnd(i, 6) * 1.25; const e = eOut(frame, fr(delay), 7);
        const prog = Math.max(0, t - delay); const dx = (rnd(i, 7) - 0.5) * 130, dy = (rnd(i, 8) - 0.5) * 130;
        const op = e * fade * (isSpark ? 0.95 : 0.6); if (op <= 0.01) return null;
        const rot = (rnd(i, 9) - 0.5) * 80 * (isSpark ? prog : 1);
        return isSpark
          ? <div key={i} style={{ position: "absolute", left: x + dx * prog, top: y + dy * prog, fontSize: size, color: col === "#FFFFFF" ? "#5fb89a" : col, opacity: op, transform: `scale(${e}) rotate(${rot}deg)` }}>✦</div>
          : <div key={i} style={{ position: "absolute", left: x + dx * prog, top: y + dy * prog, width: size, height: size, borderRadius: size * 0.28, background: col, opacity: op, transform: `scale(${e}) rotate(${rot}deg)`, boxShadow: "0 8px 18px rgba(40,32,20,0.12)" }} />;
      })}
      <Shock at={0.0} cx={420} cy={885} />
      <Shock at={1.0} cx={685} cy={1130} col="46,58,48" />
      <Shock at={2.23} cx={560} cy={1010} col="217,121,79" />
      {sweepOp > 0 && <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, transform: `translateX(${sweep}px) skewX(-18deg)`, width: 420, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)", opacity: sweepOp }} />}
      {/* Anthropic stamps in */}
      {t < 2.18 && <div style={{ position: "absolute", left: 300, top: 770, width: 250, height: 250, borderRadius: 60, background: "#fff", boxShadow: "0 26px 54px rgba(40,32,20,0.24)", display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${aPop}) rotate(-5deg)`, opacity: Math.min(1, aE * 1.6) }}><Img src={staticFile("img/logos/anthropic.svg")} style={{ width: 132, height: 132 }} /></div>}
      {/* Claude DROPS in on "dropped" */}
      {t >= 0.8 && t < 2.18 && <div style={{ position: "absolute", left: 560, top: 1010 + cDropY, width: 250, height: 250, borderRadius: 60, background: "#fff", boxShadow: "0 26px 54px rgba(40,32,20,0.24)", display: "flex", alignItems: "center", justifyContent: "center", transform: `rotate(6deg) scaleY(${cSquash}) scaleX(${2 - cSquash})` }}><Img src={staticFile("img/logos/claude.svg")} style={{ width: 132, height: 132 }} /></div>}
      {/* Figma slams + shakes nervously */}
      {t >= 2.2 && <>
        <div style={{ position: "absolute", left: 415 + figShake, top: 860, width: 300, height: 300, borderRadius: 72, background: "#fff", boxShadow: "0 26px 54px rgba(40,32,20,0.24)", display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${interpolate(figE, [0, 1], [1.45, 1])}) rotate(${figShake * 0.3}deg)`, opacity: Math.min(1, figE * 1.6) }}><Img src={staticFile("img/logos/figma.svg")} style={{ width: 150, height: 150 }} /></div>
        <div style={{ position: "absolute", top: 1240, width: "100%", textAlign: "center", fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 700, fontSize: 62, color: CORAL, opacity: figE }}>shaking.</div>
      </>}
    </AbsoluteFill>
  );
};

// ===== SFX =====
const Sfx: React.FC<{ at: number; src: string; vol?: number }> = ({ at, src, vol = 0.5 }) => (<Sequence from={fr(at)} durationInFrames={fr(1.2)}><Audio src={staticFile(`sfx/${src}`)} volume={vol} /></Sequence>);
// punchy, layered opening sound design
const OPEN_SFX = [
  { t: 0.0, s: "whoosh", v: 0.3 }, { t: 0.0, s: "sparkle", v: 0.4 }, { t: 0.0, s: "thock", v: 0.42 },
  { t: 0.28, s: "riser", v: 0.5 },
  { t: 0.95, s: "impact", v: 0.62 }, { t: 0.98, s: "sparkle", v: 0.45 }, { t: 1.0, s: "sub", v: 0.42 },
  { t: 1.3, s: "blip1", v: 0.24 }, { t: 1.55, s: "blip3", v: 0.22 }, { t: 1.8, s: "blip5", v: 0.2 },
  { t: 2.04, s: "swooshdn", v: 0.3 }, { t: 2.23, s: "thock", v: 0.46 }, { t: 2.4, s: "swish", v: 0.24 }, { t: 2.53, s: "sparkle", v: 0.34 },
];
// a DIFFERENT transition sound per beat (never the same twice in a row)
const TRANS_SFX = [
  { t: 3.3, s: "swooshup", v: 0.3 }, { t: 5.2, s: "swish", v: 0.3 }, { t: 7.4, s: "swooshup", v: 0.26 },
  { t: 8.4, s: "swish", v: 0.28 }, { t: 9.2, s: "blip3", v: 0.3 }, { t: 10.0, s: "swooshdn", v: 0.3 },
  { t: 12.3, s: "swish", v: 0.26 }, { t: 17.4, s: "swooshup", v: 0.3 }, { t: 20.0, s: "swish", v: 0.28 },
  { t: 23.6, s: "swooshup", v: 0.26 }, { t: 26.4, s: "swish", v: 0.3 }, { t: 30.1, s: "swooshdn", v: 0.3 }, { t: 33.4, s: "resolve", v: 0.32 },
];
// object-specific, event-synced sounds
const OBJ_SFX = [
  { t: 3.45, s: "chimelo", v: 0.3 },
  { t: 5.45, s: "key", v: 0.4 }, { t: 5.62, s: "key", v: 0.4 }, { t: 5.8, s: "key", v: 0.4 }, { t: 6.0, s: "key", v: 0.4 }, { t: 6.2, s: "key", v: 0.4 }, { t: 6.45, s: "key", v: 0.4 }, { t: 6.7, s: "key", v: 0.4 }, { t: 6.98, s: "chimehi", v: 0.32 },
  { t: 7.5, s: "blip1", v: 0.28 }, { t: 7.65, s: "blip2", v: 0.28 }, { t: 7.8, s: "blip3", v: 0.28 }, { t: 8.0, s: "blip4", v: 0.28 }, { t: 8.15, s: "blip5", v: 0.28 },
  { t: 8.5, s: "swish", v: 0.24 }, { t: 8.7, s: "swish", v: 0.22 }, { t: 9.35, s: "tick", v: 0.42 }, { t: 9.6, s: "blip4", v: 0.3 },
  { t: 10.66, s: "chimelo", v: 0.3 },
  { t: 12.6, s: "tick", v: 0.4 }, { t: 12.85, s: "tick", v: 0.4 }, { t: 13.1, s: "tick", v: 0.4 }, { t: 13.4, s: "tick", v: 0.4 }, { t: 13.72, s: "tick", v: 0.38 }, { t: 14.07, s: "chimehi", v: 0.42 },
  { t: 14.9, s: "swooshdn", v: 0.3 }, { t: 15.0, s: "sub", v: 0.34 }, { t: 15.5, s: "riser", v: 0.4 }, { t: 16.1, s: "riser", v: 0.46 }, { t: 16.8, s: "impact", v: 0.55 }, { t: 16.8, s: "shimmer", v: 0.42 }, { t: 16.86, s: "sparkle", v: 0.4 },
  { t: 17.9, s: "snap", v: 0.42 }, { t: 18.4, s: "snap", v: 0.42 }, { t: 18.9, s: "snap", v: 0.42 }, { t: 19.38, s: "snap", v: 0.46 },
  { t: 20.9, s: "thock", v: 0.4 }, { t: 21.0, s: "data", v: 0.42 }, { t: 21.4, s: "blip2", v: 0.26 }, { t: 21.8, s: "blip4", v: 0.26 }, { t: 22.2, s: "blip3", v: 0.26 },
  { t: 24.0, s: "blip1", v: 0.26 }, { t: 24.5, s: "blip3", v: 0.26 }, { t: 24.9, s: "blip5", v: 0.28 }, { t: 25.4, s: "blip2", v: 0.26 },
  { t: 26.7, s: "swish", v: 0.3 }, { t: 27.45, s: "ding", v: 0.44 }, { t: 27.62, s: "chimehi", v: 0.3 },
  { t: 31.99, s: "shimmer", v: 0.4 },
  { t: 35.42, s: "chimelo", v: 0.34 },
];
const SfxTrack: React.FC = () => (<>
  {[...OPEN_SFX, ...TRANS_SFX, ...OBJ_SFX].map((c, i) => <Sfx key={i} at={c.t} src={`${c.s}.wav`} vol={c.v} />)}
</>);

const Background: React.FC = () => {
  const frame = useCurrentFrame(); const drift = Math.sin(frame / 90) * 6;
  return (
    <AbsoluteFill style={{ backgroundColor: CREAM }}>
      <AbsoluteFill style={{ transform: `translate(${drift}px, ${drift * 0.6}px)`, backgroundImage: "linear-gradient(rgba(26,24,19,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(26,24,19,0.045) 1px, transparent 1px)", backgroundSize: "66px 66px" }} />
      <AbsoluteFill style={{ opacity: 0.05, mixBlendMode: "multiply" }}><svg width="100%" height="100%"><filter id="ppv5"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves={2} stitchTiles="stitch" /></filter><rect width="100%" height="100%" filter="url(#ppv5)" /></svg></AbsoluteFill>
      <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 44%, rgba(0,0,0,0) 55%, rgba(40,32,20,0.10) 100%)" }} />
    </AbsoluteFill>
  );
};

// continuous subtle motion across the whole reel so the screen is never static
const Ambient: React.FC = () => {
  const frame = useCurrentFrame(); const t = frame / FPS;
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {Array.from({ length: 18 }, (_, i) => {
        const baseX = rnd(i, 11) * 1060 + 10, baseY = rnd(i, 12) * 1880 + 20;
        const dx = Math.sin((t + i * 1.7) / (5 + rnd(i, 13) * 4)) * 46;
        const dy = Math.cos((t + i * 2.1) / (6 + rnd(i, 14) * 4)) * 40;
        const size = 7 + rnd(i, 15) * 20;
        const tw = 0.3 + 0.7 * (Math.sin(t * 1.4 + i * 2) * 0.5 + 0.5);
        const isSpark = rnd(i, 16) > 0.58;
        const col = [GREEN, BLUE, CORAL, "#9A968B"][Math.floor(rnd(i, 17) * 4)];
        return isSpark
          ? <div key={i} style={{ position: "absolute", left: baseX + dx, top: baseY + dy, fontSize: size, color: col, opacity: tw * 0.5, transform: `rotate(${t * 12 + i * 30}deg)` }}>✦</div>
          : <div key={i} style={{ position: "absolute", left: baseX + dx, top: baseY + dy, width: size, height: size, borderRadius: "50%", background: col, opacity: tw * 0.26 }} />;
      })}
    </AbsoluteFill>
  );
};

export const ClaudeDesignReelV5: React.FC = () => {
  const { width, height } = useVideoConfig();
  return (
    <AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
      <Audio src={staticFile("vo.mp3")} />
      <SfxTrack />
      <Background />
      <Ambient />
      <AbsoluteFill>
        <ThreeCanvas width={width} height={height} shadows gl={{ antialias: true, preserveDrawingBuffer: true }} camera={{ fov: 36, position: [0, 0, 9.2], near: 0.1, far: 50 }} style={{ position: "absolute" }}>
          <ThreeScenes />
        </ThreeCanvas>
      </AbsoluteFill>

      <Opening />
      <Typewriter s={5.2} e={7.4} />
      <LandingBuild s={7.4} e={8.4} />
      <HeroWipe s={10.0} e={12.3} designAt={10.66} />
      <GithubEmit s={20.0} e={23.1} />
      <Morph s={30.1} e={32.9} designAt={31.99} />
      <EndCard s={33.4} e={37.0} />

      <Captions />
    </AbsoluteFill>
  );
};
