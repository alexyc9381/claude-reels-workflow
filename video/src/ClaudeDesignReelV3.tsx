import React, { useMemo } from "react";
import {
  AbsoluteFill,
  Audio,
  Easing,
  Img,
  Sequence,
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
 * ClaudeDesignReelV3 — image-dense, fast-cut, content-matched Greg-style reel about
 * Claude Design, narrated + sound-designed. A claymation PERSON appears on the
 * "you / nobody / what you'll do" lines; every beat shows a distinct, detailed 3D
 * object (laptop, phone, slide deck, design-system board, clock) or real imagery
 * (brand logos, the real product screenshot). Synthesized SFX on the cuts.
 */

const CREAM = "#ECE9E2";
const INK = "#1A1813";
const GREEN = "#3C6B52";
const BLUE = "#3E5C8A";
const CORAL = "#D9794F";
const SKIN = "#E8C7A6";

type Word = { word: string; start: number; end: number; line: number };
const WORDS = wordsData as Word[];
const clean = (w: string) => w.toLowerCase().replace(/[^a-z']/g, "");
const EMPH = new Set(["figma","nervous","claude","design","landing","page","deck","prototype","seconds","nobody's","ready","system","github","fixes","mistakes","ai","back","time"]);

const FPS = 30;
const fr = (sec: number) => sec * FPS;
const eOut = (frame: number, startF: number, dur = 10) => interpolate(frame, [startF, startF + dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
const winFade = (t: number, s: number, e: number, edge = 0.2) => {
  if (t < s - 0.01 || t > e + 0.3) return 0;
  const up = interpolate(t, [s, s + edge], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const dn = interpolate(t, [e - edge, e], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) });
  return Math.min(up, dn);
};

// ================= captions (<=3 words) =================
const CHUNKS = (() => {
  const byLine: Record<number, Word[]> = {};
  for (const w of WORDS) (byLine[w.line] ||= []).push(w);
  const out: { words: Word[]; start: number }[] = [];
  for (const li of Object.keys(byLine).map(Number).sort((a, b) => a - b)) {
    const ws = byLine[li].filter((w) => !/^[—–-]+$/.test(w.word));
    for (let i = 0; i < ws.length; i += 3) { const grp = ws.slice(i, i + 3); out.push({ words: grp, start: grp[0].start }); }
  }
  const audioEnd = Math.max(...WORDS.map((w) => w.end));
  return out.map((c, i) => ({ ...c, end: i + 1 < out.length ? out[i + 1].start : audioEnd + 0.4 }));
})();

const Captions: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  return (
    <>
      {CHUNKS.map((c, i) => {
        const op = winFade(t, c.start, c.end, 0.15);
        if (op <= 0.001) return null;
        return (
          <div key={i} style={{ position: "absolute", inset: 0, top: 235, height: 420, display: "flex", alignItems: "center", justifyContent: "center", opacity: op }}>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "center", gap: "0 18px", width: 940, textAlign: "center" }}>
              {c.words.map((w, j) => {
                const green = EMPH.has(clean(w.word));
                const e = eOut(frame, fr(w.start), 6);
                return <span key={j} style={{ display: "inline-block", transform: `translateY(${(1 - e) * 18}px)`, opacity: e, fontFamily: green ? frauncesItalic.fontFamily : fraunces.fontFamily, fontStyle: green ? "italic" : "normal", fontWeight: green ? 700 : 600, fontSize: green ? 104 : 90, lineHeight: 1.05, color: green ? GREEN : INK, letterSpacing: "-0.015em", textShadow: "0 2px 16px rgba(236,233,226,0.95)" }}>{w.word}</span>;
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};

// ================= canvas-texture screens =================
const rr = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) => { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); ctx.fill(); };
const useTex = (draw: (c: CanvasRenderingContext2D, w: number, h: number) => void, w: number, h: number, key: string) =>
  useMemo(() => { const cv = document.createElement("canvas"); cv.width = w; cv.height = h; draw(cv.getContext("2d")!, w, h); const t = new THREE.CanvasTexture(cv); t.anisotropy = 8; return t; }, [key]);

const drawDesignApp = (c: CanvasRenderingContext2D, W: number, H: number) => {
  c.fillStyle = "#0E1726"; c.fillRect(0, 0, W, H);
  c.fillStyle = "#172339"; rr(c, 0, 0, W, 56, 0); // topbar
  c.fillStyle = "#5BC8B0"; rr(c, 24, 16, 24, 24, 6);
  c.fillStyle = "#22304A"; rr(c, W - 220, 14, 120, 28, 14);
  c.fillStyle = "#101a2e"; rr(c, 0, 56, 70, H - 56, 0); // left tools
  c.fillStyle = "#33425f"; [0,1,2,3].forEach(i => rr(c, 22, 86 + i * 52, 28, 28, 8));
  // artboard
  c.fillStyle = "#0a1322"; rr(c, 96, 86, W - 360, H - 130, 18);
  c.strokeStyle = "rgba(91,200,176,0.7)"; c.lineWidth = 3;
  for (let i = 0; i < 9; i++) { c.beginPath(); c.ellipse(W/2-120, H/2, 60+i*22, 150+i*14, 0.5, 0, 7); c.stroke(); }
  c.fillStyle = "#5BC8B0"; [[0.3,0.4],[0.55,0.6],[0.45,0.3]].forEach(([px,py])=>{ c.beginPath(); c.arc(96+(W-360)*px, 86+(H-130)*py, 7, 0, 7); c.fill(); });
  // right panel
  c.fillStyle = "#172339"; rr(c, W - 250, 86, 230, H - 130, 16);
  c.fillStyle = "#5BC8B0"; rr(c, W - 226, 120, 44, 30, 8);
  c.fillStyle = "#2c3a55"; [0,1,2,3,4].forEach(i => rr(c, W - 226, 180 + i * 56, 182, 14, 7));
};
const drawLanding = (c: CanvasRenderingContext2D, W: number, H: number) => {
  c.fillStyle = "#FBFAF6"; c.fillRect(0, 0, W, H);
  c.fillStyle = GREEN; c.beginPath(); c.arc(60, 56, 18, 0, 7); c.fill();
  c.fillStyle = "#D8D5CC"; [0,1,2].forEach(i => rr(c, W - 280 + i * 90, 44, 64, 18, 9));
  c.fillStyle = "#23211C"; rr(c, 60, 150, W - 360, 56, 12); rr(c, 60, 224, W - 460, 56, 12);
  c.fillStyle = "#8A867C"; rr(c, 60, 312, W - 520, 22, 8); rr(c, 60, 350, W - 560, 22, 8);
  c.fillStyle = GREEN; rr(c, 60, 408, 230, 74, 22);
  c.fillStyle = "#1E2B45"; rr(c, W - 360, 150, 300, 340, 24);
  c.fillStyle = "#E7E3D9"; [0,1,2].forEach(i => rr(c, 60 + i * (W/3 - 20), H - 220, W/3 - 60, 170, 18));
};
const drawProto = (c: CanvasRenderingContext2D, W: number, H: number) => {
  c.fillStyle = "#15203A"; c.fillRect(0, 0, W, H);
  c.fillStyle = "#0e1730"; rr(c, 0, 0, W, 60, 0);
  c.fillStyle = GREEN; rr(c, 0, 60, W, 180, 0);
  c.fillStyle = "#F2C14E"; c.beginPath(); c.arc(W/2, 150, 44, 0, 7); c.fill();
  c.fillStyle = "#22304f"; [0,1,2].forEach(i => rr(c, 40, 290 + i * 150, W - 80, 120, 22));
  c.fillStyle = "#3a4d77"; [0,1,2].forEach(i => { rr(c, 70, 320 + i*150, 60, 60, 14); });
  c.fillStyle = "#0e1730"; rr(c, 0, H - 110, W, 110, 0);
  c.fillStyle = "#5b6f9c"; [0,1,2,3].forEach(i => rr(c, 60 + i * (W-120)/3 - 18, H - 78, 40, 40, 12));
};
const drawSlide = (i: number) => (c: CanvasRenderingContext2D, W: number, H: number) => {
  const cols = [GREEN, BLUE, CORAL];
  c.fillStyle = "#FBFAF6"; c.fillRect(0, 0, W, H);
  c.fillStyle = cols[i % 3]; rr(c, 0, 0, W, 70, 0);
  c.fillStyle = "#23211C"; rr(c, 40, 110, W - 200, 40, 10); rr(c, 40, 170, W - 320, 28, 8);
  if (i === 1) { c.fillStyle = cols[1]; [0.4,0.7,0.5,0.9,0.6].forEach((h, k) => rr(c, 50 + k * 78, H - 60 - (H-280)*h, 54, (H-280)*h, 8)); }
  else { c.fillStyle = "#D8D5CC"; [0,1,2].forEach(k => rr(c, 40, 240 + k * 64, W - 80 - k*80, 36, 9)); }
};
const drawBoard = (c: CanvasRenderingContext2D, W: number, H: number) => {
  c.fillStyle = "#FBFAF6"; c.fillRect(0, 0, W, H);
  c.fillStyle = "#23211C"; c.font = "bold 56px Arial"; c.fillText("Design System", 44, 86);
  const sw = [GREEN, BLUE, CORAL, "#F2C14E", "#2B4537"]; sw.forEach((s, i) => { c.fillStyle = s; rr(c, 44 + i * 110, 130, 92, 92, 18); });
  c.fillStyle = "#23211C"; c.font = "bold 120px Georgia"; c.fillText("Aa", 44, 380);
  c.fillStyle = GREEN; rr(c, 320, 290, 200, 76, 24); c.fillStyle = "#FBFAF6"; c.font = "bold 34px Arial"; c.fillText("Button", 360, 338);
  c.strokeStyle = "#23211C"; c.lineWidth = 4; c.beginPath(); c.roundRect(550, 290, 200, 76, 24); c.stroke();
  c.fillStyle = "#E7E3D9"; [0,1,2].forEach(i => rr(c, 44 + i * (W/3-20), H - 200, W/3 - 60, 150, 18));
};
const drawClockFace = (c: CanvasRenderingContext2D, S: number) => {
  c.clearRect(0, 0, S, S); const cx = S/2;
  c.fillStyle = "#FBFAF6"; c.beginPath(); c.arc(cx, cx, cx - 8, 0, 7); c.fill();
  c.strokeStyle = "#23211C"; c.lineWidth = 8; c.stroke();
  c.strokeStyle = "#23211C";
  for (let i = 0; i < 12; i++) { const a = (i/12) * Math.PI*2; c.lineWidth = i % 3 === 0 ? 12 : 5; const r1 = cx - 40, r2 = cx - (i%3===0?70:56); c.beginPath(); c.moveTo(cx + Math.cos(a)*r1, cx + Math.sin(a)*r1); c.lineTo(cx + Math.cos(a)*r2, cx + Math.sin(a)*r2); c.stroke(); }
};

// ================= 3D objects =================
const Screen: React.FC<{ tex: THREE.Texture; w: number; h: number }> = ({ tex, w, h }) => (
  <mesh position={[0, 0, 0.061]}><planeGeometry args={[w, h]} /><meshBasicMaterial map={tex} toneMapped={false} /></mesh>
);

const Monitor: React.FC<{ kind: "design" | "landing" }> = ({ kind }) => {
  const tex = useTex(kind === "design" ? drawDesignApp : drawLanding, 900, 640, "mon" + kind);
  return (
    <group position={[0, -0.4, 0]} rotation={[-0.06, 0, 0]}>
      <RoundedBox args={[2.05, 1.45, 0.12]} radius={0.07} smoothness={5} castShadow receiveShadow position={[0, 0.25, 0]}>
        <meshStandardMaterial color={"#EFEDE6"} roughness={0.8} />
      </RoundedBox>
      <group position={[0, 0.25, 0]}><Screen tex={tex} w={1.86} h={1.26} /></group>
      <mesh position={[0, -0.62, -0.02]} castShadow><cylinderGeometry args={[0.08, 0.1, 0.4, 24]} /><meshStandardMaterial color={"#D9D5CB"} roughness={0.7} /></mesh>
      <RoundedBox args={[0.8, 0.06, 0.4]} radius={0.03} position={[0, -0.82, 0]} castShadow receiveShadow><meshStandardMaterial color={"#D9D5CB"} roughness={0.7} /></RoundedBox>
    </group>
  );
};

const Phone: React.FC = () => {
  const tex = useTex(drawProto, 520, 1040, "proto");
  return (
    <group position={[0, -0.4, 0]} rotation={[-0.05, 0.25, 0]}>
      <RoundedBox args={[0.86, 1.7, 0.14]} radius={0.16} smoothness={6} castShadow receiveShadow>
        <meshStandardMaterial color={"#23282E"} roughness={0.7} />
      </RoundedBox>
      <group position={[0, 0, 0.072]}><Screen tex={tex} w={0.74} h={1.56} /></group>
    </group>
  );
};

const Deck: React.FC = () => {
  const t0 = useTex(drawSlide(0), 760, 500, "s0"); const t1 = useTex(drawSlide(1), 760, 500, "s1"); const t2 = useTex(drawSlide(2), 760, 500, "s2");
  const slides = [{ tex: t2, x: 0.34, y: -0.18, r: -0.14, z: -0.1 }, { tex: t1, x: 0.16, y: 0.0, r: -0.06, z: 0.05 }, { tex: t0, x: -0.05, y: 0.2, r: 0.04, z: 0.2 }];
  return (
    <group position={[0, -0.4, 0]} rotation={[-0.05, 0.05, 0]}>
      {slides.map((s, i) => (
        <group key={i} position={[s.x, s.y, s.z]} rotation={[0, 0, s.r]}>
          <RoundedBox args={[1.5, 0.98, 0.06]} radius={0.05} smoothness={5} castShadow receiveShadow><meshStandardMaterial color={"#FBFAF6"} roughness={0.9} /></RoundedBox>
          <group position={[0, 0, 0.031]}><Screen tex={s.tex} w={1.5} h={0.98} /></group>
        </group>
      ))}
    </group>
  );
};

const Board: React.FC = () => {
  const tex = useTex(drawBoard, 920, 700, "board");
  return (
    <group position={[0, -0.45, 0]} rotation={[-0.08, 0, 0]}>
      <RoundedBox args={[2.0, 1.55, 0.12]} radius={0.08} smoothness={5} castShadow receiveShadow><meshStandardMaterial color={"#FBFAF6"} roughness={0.92} /></RoundedBox>
      <group position={[0, 0, 0.061]}><Screen tex={tex} w={1.86} h={1.42} /></group>
    </group>
  );
};

const Clock: React.FC<{ s: number }> = ({ s }) => {
  const frame = useCurrentFrame();
  const tex = useTex(drawClockFace, 512, 512, "clock");
  const local = frame - fr(s);
  const min = local * 0.16, hr = local * 0.05;
  return (
    <group position={[0, -0.4, 0]} rotation={[-0.05, 0, 0]}>
      {/* body: cylinder rotated so its circular face points at the camera */}
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow><cylinderGeometry args={[0.86, 0.86, 0.16, 64]} /><meshStandardMaterial color={"#E7E3D9"} roughness={0.8} /></mesh>
      <mesh position={[0, 0, 0.083]}><planeGeometry args={[1.62, 1.62]} /><meshBasicMaterial map={tex} transparent toneMapped={false} /></mesh>
      <group position={[0, 0, 0.1]} rotation={[0, 0, -hr]}><RoundedBox args={[0.07, 0.42, 0.04]} radius={0.02} position={[0, 0.16, 0]} castShadow><meshStandardMaterial color={INK} /></RoundedBox></group>
      <group position={[0, 0, 0.12]} rotation={[0, 0, -min]}><RoundedBox args={[0.05, 0.64, 0.03]} radius={0.02} position={[0, 0.28, 0]} castShadow><meshStandardMaterial color={GREEN} /></RoundedBox></group>
      <mesh position={[0, 0, 0.14]}><sphereGeometry args={[0.07, 18, 18]} /><meshStandardMaterial color={CORAL} /></mesh>
    </group>
  );
};

// Greg-style "person": a dark matte blob with a glowing white belly + two dot eyes.
const Blob: React.FC<{ s: number; expr?: "neutral" | "surprised" | "think"; count?: number }> = ({ s, expr = "neutral", count = 1 }) => {
  const frame = useCurrentFrame();
  const local = frame - fr(s);
  const eyeR = expr === "surprised" ? 0.088 : 0.062;
  const one = (key: string, ox: number, oy: number, sc: number, ph: number) => {
    const bob = Math.sin((local + ph) / 22) * 0.05;
    return (
      <group key={key} position={[ox, oy + bob, 0]} scale={sc}>
        <mesh castShadow receiveShadow><sphereGeometry args={[0.72, 64, 64]} /><meshStandardMaterial color={"#1B231F"} roughness={0.5} metalness={0.05} /></mesh>
        {/* glowing white belly (bottom spherical cap) */}
        <mesh><sphereGeometry args={[0.732, 64, 64, 0, Math.PI * 2, 1.7, Math.PI - 1.7]} /><meshStandardMaterial color={"#F4F7F2"} roughness={0.45} emissive={"#FFFFFF"} emissiveIntensity={0.22} /></mesh>
        <mesh position={[-0.16, 0.12, 0.70]}><sphereGeometry args={[eyeR, 20, 20]} /><meshStandardMaterial color={"#14110D"} roughness={0.4} /></mesh>
        <mesh position={[0.16, 0.12, 0.70]}><sphereGeometry args={[eyeR, 20, 20]} /><meshStandardMaterial color={"#14110D"} roughness={0.4} /></mesh>
      </group>
    );
  };
  return (
    <group position={[0, -0.45, 0]}>
      {count === 1 && one("a", 0, 0, 1, 0)}
      {count === 3 && [one("a", -1.05, -0.12, 0.72, 11), one("b", 0, 0.12, 0.94, 0), one("c", 1.05, -0.12, 0.72, 20)]}
      {expr === "think" && <ExprGlyph kind="?" />}
      {expr === "surprised" && <ExprGlyph kind="!" />}
    </group>
  );
};
const ExprGlyph: React.FC<{ kind: string }> = ({ kind }) => {
  const frame = useCurrentFrame();
  const tex = useMemo(() => { const cv = document.createElement("canvas"); cv.width = 128; cv.height = 128; const c = cv.getContext("2d")!; c.fillStyle = GREEN; c.font = "bold 110px Georgia"; c.textAlign = "center"; c.textBaseline = "middle"; c.fillText(kind, 64, 70); const t = new THREE.CanvasTexture(cv); return t; }, [kind]);
  const bob = Math.sin(frame / 14) * 0.04;
  return <mesh position={[0.62, 0.9 + bob, 0.3]}><planeGeometry args={[0.42, 0.42]} /><meshBasicMaterial map={tex} transparent toneMapped={false} /></mesh>;
};

const Components: React.FC<{ s: number }> = ({ s }) => {
  const frame = useCurrentFrame();
  const tex = useTex(drawBoard, 920, 700, "board2");
  const chips = [{ c: GREEN, from: [-2, 1.3] }, { c: BLUE, from: [2.1, 0.9] }, { c: CORAL, from: [-2.2, -0.6] }, { c: "#F2C14E", from: [2, -1.2] }];
  return (
    <group position={[0, -0.45, 0]} rotation={[-0.08, 0, 0]}>
      <RoundedBox args={[2.0, 1.55, 0.12]} radius={0.08} smoothness={5} castShadow receiveShadow><meshStandardMaterial color={"#FBFAF6"} roughness={0.92} /></RoundedBox>
      <group position={[0, 0, 0.061]}><Screen tex={tex} w={1.86} h={1.42} /></group>
      {chips.map((ch, i) => {
        const e = eOut(frame, fr(s + 0.5 + i * 0.5), 22);
        const x = interpolate(e, [0, 1], [ch.from[0], -0.5 + (i % 2) * 1.0]);
        const y = interpolate(e, [0, 1], [ch.from[1], 0.1]);
        const op = 1 - e; if (op < 0.04) return null;
        return <RoundedBox key={i} args={[0.34, 0.34, 0.12]} radius={0.07} position={[x, y, 0.4 + (1 - e) * 0.3]} scale={0.7 + op} castShadow><meshStandardMaterial color={ch.c} roughness={0.7} /></RoundedBox>;
      })}
    </group>
  );
};

const CheckFix: React.FC<{ s: number }> = ({ s }) => {
  const frame = useCurrentFrame();
  const checkTex = useMemo(() => { const cv = document.createElement("canvas"); cv.width = 256; cv.height = 256; const c = cv.getContext("2d")!; c.strokeStyle = "#EFF3EE"; c.lineWidth = 34; c.lineCap = "round"; c.lineJoin = "round"; c.beginPath(); c.moveTo(70, 134); c.lineTo(112, 186); c.lineTo(196, 74); c.stroke(); const t = new THREE.CanvasTexture(cv); return t; }, []);
  const e = eOut(frame, fr(s + 0.3), 14);
  const fixE = eOut(frame, fr(s + 1.4), 16);
  return (
    <group position={[0, -0.4, 0]}>
      {/* a "diff" card behind */}
      <group position={[-0.1, 0, -0.2]} rotation={[-0.05, 0, -0.05]}>
        <RoundedBox args={[1.7, 1.1, 0.1]} radius={0.07} castShadow receiveShadow><meshStandardMaterial color={"#FBFAF6"} roughness={0.9} /></RoundedBox>
        <mesh position={[-0.4, 0.3, 0.051]}><planeGeometry args={[0.78, 0.2]} /><meshBasicMaterial color={fixE > 0.5 ? "#6FBF8E" : "#E59478"} toneMapped={false} /></mesh>
        <mesh position={[-0.3, 0.02, 0.051]}><planeGeometry args={[0.98, 0.2]} /><meshBasicMaterial color={"#DAD6CC"} toneMapped={false} /></mesh>
        <mesh position={[-0.46, -0.26, 0.051]}><planeGeometry args={[0.66, 0.2]} /><meshBasicMaterial color={fixE > 0.5 ? "#6FBF8E" : "#E59478"} toneMapped={false} /></mesh>
      </group>
      {/* check badge */}
      <group position={[0.55, 0.32, 0.5]} scale={0.5 * e}>
        <mesh castShadow><sphereGeometry args={[0.85, 48, 48]} /><meshStandardMaterial color={GREEN} roughness={0.5} /></mesh>
        <mesh position={[0, 0, 0.86]}><planeGeometry args={[0.95, 0.95]} /><meshBasicMaterial map={checkTex} transparent toneMapped={false} /></mesh>
      </group>
    </group>
  );
};

// ---- varied transitions (NOT all zoom) ----
type TType = "slideL" | "slideR" | "slideUp" | "slideDown" | "dropIn" | "flipY" | "spinIn" | "rise" | "scale";
const TR3 = (type: TType, inP: number, outP: number) => {
  const e = inP * outP;
  let x = 0, y = 0, z = 0, ry = 0, rz = 0, s = 1;
  if (type === "slideL") x = (1 - inP) * -6.5 + (1 - outP) * 6.5;
  else if (type === "slideR") x = (1 - inP) * 6.5 + (1 - outP) * -6.5;
  else if (type === "slideUp") y = (1 - inP) * -5.5 + (1 - outP) * 5.5;
  else if (type === "slideDown") y = (1 - inP) * 5.5 + (1 - outP) * -5.5;
  else if (type === "dropIn") y = (1 - inP) * 4.8 + (1 - outP) * -3.2;
  else if (type === "flipY") { ry = (1 - inP) * -1.5 + (1 - outP) * 1.5; s = 0.82 + 0.18 * e; }
  else if (type === "spinIn") { rz = (1 - inP) * 0.7 + (1 - outP) * -0.7; s = 0.55 + 0.45 * e; }
  else if (type === "rise") { y = (1 - inP) * 1.3 + (1 - outP) * -0.9; s = 0.93 + 0.07 * e; }
  else s = 0.55 + 0.45 * e;
  return { x, y, z, ry, rz, s };
};
const S3D: React.FC<{ s: number; e: number; t?: TType; children: React.ReactNode }> = ({ s, e, t = "scale", children }) => {
  const frame = useCurrentFrame();
  const local = frame - fr(s);
  const lenF = fr(e - s);
  if (local < 0 || local > lenF) return null;
  const inP = interpolate(local, [0, fr(0.42)], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const outP = 1 - interpolate(local, [lenF - fr(0.3), lenF], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) });
  const tr = TR3(t, inP, outP);
  return <group position={[tr.x, tr.y, tr.z]} rotation={[0, tr.ry, tr.rz]} scale={tr.s}>{children}</group>;
};

const Three: React.FC = () => (
  <>
    <ambientLight intensity={0.9} />
    <directionalLight position={[2.6, 4.0, 3.4]} intensity={2.4} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} shadow-radius={9} shadow-bias={-0.0004} shadow-camera-near={0.5} shadow-camera-far={20} shadow-camera-left={-5} shadow-camera-right={5} shadow-camera-top={5} shadow-camera-bottom={-5} />
    <directionalLight position={[-3, 1, 2]} intensity={0.5} />
    <mesh position={[0, -0.6, -0.7]} receiveShadow><planeGeometry args={[20, 20]} /><shadowMaterial transparent opacity={0.13} /></mesh>
    <S3D s={3.3} e={5.2} t="slideUp"><Monitor kind="design" /></S3D>
    <S3D s={5.2} e={7.4} t="slideR"><Blob s={5.2} expr="neutral" /></S3D>
    <S3D s={7.4} e={8.4} t="slideL"><Monitor kind="landing" /></S3D>
    <S3D s={8.4} e={9.2} t="flipY"><Deck /></S3D>
    <S3D s={9.2} e={9.95} t="dropIn"><Phone /></S3D>
    <S3D s={12.3} e={14.8} t="spinIn"><Clock s={12.3} /></S3D>
    <S3D s={15.0} e={17.2} t="dropIn"><Blob s={15.0} expr="surprised" count={3} /></S3D>
    <S3D s={17.4} e={20.0} t="slideUp"><Board /></S3D>
    <S3D s={23.6} e={26.4} t="slideL"><Components s={23.6} /></S3D>
    <S3D s={26.4} e={29.7} t="slideR"><CheckFix s={26.4} /></S3D>
    <S3D s={30.1} e={32.9} t="rise"><Blob s={30.1} expr="think" /></S3D>
    <S3D s={33.4} e={37.5} t="flipY"><Clock s={33.4} /></S3D>
  </>
);

// ================= 2D real-image beats =================
const TR2 = (type: TType, inP: number, outP: number) => {
  const e = inP * outP; let x = 0, y = 0, s = 1;
  if (type === "slideL") x = (1 - inP) * -1300 + (1 - outP) * 1300;
  else if (type === "slideR") x = (1 - inP) * 1300 + (1 - outP) * -1300;
  else if (type === "slideUp") y = (1 - inP) * 1500 + (1 - outP) * -1500;
  else if (type === "slideDown") y = (1 - inP) * -1500 + (1 - outP) * 1500;
  else if (type === "dropIn") y = (1 - inP) * -1300 + (1 - outP) * 900;
  else if (type === "rise") { y = (1 - inP) * 120 + (1 - outP) * -90; s = 0.97 + 0.03 * e; }
  else s = 0.9 + 0.1 * e;
  return { x, y, s };
};
const Beat: React.FC<{ s: number; e: number; tt?: TType; children: React.ReactNode }> = ({ s, e, tt = "rise", children }) => {
  const frame = useCurrentFrame();
  const local = frame - fr(s);
  const lenF = fr(e - s);
  if (local < 0 || local > lenF) return null;
  const inP = interpolate(local, [0, fr(0.4)], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const outP = 1 - interpolate(local, [lenF - fr(0.28), lenF], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) });
  const op = Math.min(interpolate(local, [0, fr(0.14)], [0, 1], { extrapolateRight: "clamp" }), interpolate(local, [lenF - fr(0.14), lenF], [1, 0], { extrapolateLeft: "clamp" }));
  const tr = TR2(tt, inP, outP);
  return <AbsoluteFill style={{ opacity: op, transform: `translate(${tr.x}px, ${tr.y}px) scale(${tr.s})`, display: "flex", alignItems: "center", justifyContent: "center" }}>{children}</AbsoluteFill>;
};
const LogoTile: React.FC<{ name: string; x: number; y: number; size?: number; rot?: number; delay?: number; shake?: boolean }> = ({ name, x, y, size = 240, rot = 0, delay = 0, shake }) => {
  const frame = useCurrentFrame();
  const e = eOut(frame, delay, 9);
  const bob = Math.sin((frame + x) / 24) * 6;
  const sh = shake ? Math.sin(frame / 2.2) * 5 * Math.max(0, 1 - (frame - delay) / 40) : 0;
  return (
    <div style={{ position: "absolute", left: x + sh, top: y + bob, width: size, height: size, borderRadius: size * 0.24, background: "#fff", boxShadow: "0 26px 50px rgba(40,32,20,0.22)", display: "flex", alignItems: "center", justifyContent: "center", transform: `translateY(${(1 - e) * 40}px) scale(${0.6 + e * 0.4}) rotate(${rot + sh * 0.2}deg)`, opacity: e }}>
      <Img src={staticFile(`img/logos/${name}.svg`)} style={{ width: size * 0.5, height: size * 0.5 }} />
    </div>
  );
};
const HeroShot: React.FC<{ s: number; e: number; focus: "full" | "globe" | "panel"; label?: string }> = ({ s, e, focus, label }) => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const op = winFade(t, s, e, 0.18);
  if (op <= 0.001) return null;
  const p = interpolate(t, [s, e], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sizePct = focus === "full" ? 116 : 188;
  const posStart = focus === "globe" ? [10, 70] : focus === "panel" ? [100, 18] : [44, 30];
  const posEnd = focus === "globe" ? [30, 50] : focus === "panel" ? [82, 40] : [56, 42];
  const bgX = interpolate(p, [0, 1], [posStart[0], posEnd[0]]);
  const bgY = interpolate(p, [0, 1], [posStart[1], posEnd[1]]);
  const inP = interpolate(t - s, [0, 0.42], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const outP = 1 - interpolate(t, [e - 0.28, e], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) });
  const tx = (1 - inP) * -1250 + (1 - outP) * 1250;
  return (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center", opacity: op }}>
      <div style={{ width: 880, height: 1010, borderRadius: 40, background: "#fff", boxShadow: "0 40px 90px rgba(40,32,20,0.32)", overflow: "hidden", transform: `translateX(${tx}px) rotate(-1.5deg)`, marginTop: 380 }}>
        <div style={{ height: 74, background: "#F3F1EA", display: "flex", alignItems: "center", gap: 12, padding: "0 28px", borderBottom: "2px solid #E6E3DA" }}>
          <div style={{ width: 18, height: 18, borderRadius: 9, background: "#E0795F" }} />
          <div style={{ width: 18, height: 18, borderRadius: 9, background: "#E9C15E" }} />
          <div style={{ width: 18, height: 18, borderRadius: 9, background: "#7BA87F" }} />
          <div style={{ marginLeft: 18, color: "#9A968B", fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 28 }}>claude.ai / design</div>
        </div>
        <div style={{ width: "100%", height: 936, backgroundImage: `url(${staticFile("img/claude-design-hero.jpg")})`, backgroundSize: `${sizePct}%`, backgroundPosition: `${bgX}% ${bgY}%`, backgroundRepeat: "no-repeat", backgroundColor: "#0C1018" }} />
      </div>
      {label && <div style={{ position: "absolute", bottom: 250, padding: "14px 30px", borderRadius: 999, background: INK, color: CREAM, fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 600, fontSize: 40, boxShadow: "0 14px 28px rgba(40,32,20,0.3)" }}>{label}</div>}
    </AbsoluteFill>
  );
};

// ================= SFX =================
const Sfx: React.FC<{ at: number; src: string; vol?: number }> = ({ at, src, vol = 0.5 }) => (
  <Sequence from={fr(at)} durationInFrames={fr(1.2)}><Audio src={staticFile(`sfx/${src}`)} volume={vol} /></Sequence>
);
const BEAT_STARTS = [0, 1.7, 3.3, 5.2, 7.4, 8.4, 9.2, 10.0, 12.3, 15.0, 17.4, 20.0, 23.6, 26.4, 30.1, 33.4];
const SfxTrack: React.FC = () => (
  <>
    {BEAT_STARTS.map((s, i) => <Sfx key={"w" + i} at={s} src="whoosh.wav" vol={0.32} />)}
    {CHUNKS.map((c, i) => <Sfx key={"p" + i} at={c.start} src="pop.wav" vol={0.14} />)}
    {[0.2, 1.0, 1.75, 20.05, 20.55].map((s, i) => <Sfx key={"t" + i} at={s} src="thock.wav" vol={0.45} />)}
    <Sfx at={15.0} src="boom.wav" vol={0.5} />
    <Sfx at={26.7} src="ding.wav" vol={0.42} />
    <Sfx at={33.4} src="ding.wav" vol={0.3} />
  </>
);

// ================= background =================
const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame / 90) * 6;
  return (
    <AbsoluteFill style={{ backgroundColor: CREAM }}>
      <AbsoluteFill style={{ transform: `translate(${drift}px, ${drift * 0.6}px)`, backgroundImage: "linear-gradient(rgba(26,24,19,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(26,24,19,0.045) 1px, transparent 1px)", backgroundSize: "66px 66px" }} />
      <AbsoluteFill style={{ opacity: 0.05, mixBlendMode: "multiply" }}><svg width="100%" height="100%"><filter id="ppv3"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves={2} stitchTiles="stitch" /></filter><rect width="100%" height="100%" filter="url(#ppv3)" /></svg></AbsoluteFill>
      <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 44%, rgba(0,0,0,0) 55%, rgba(40,32,20,0.10) 100%)" }} />
    </AbsoluteFill>
  );
};

export const ClaudeDesignReelV3: React.FC = () => {
  const { width, height } = useVideoConfig();
  return (
    <AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
      <Audio src={staticFile("vo.mp3")} />
      <SfxTrack />
      <Background />
      <AbsoluteFill>
        <ThreeCanvas width={width} height={height} shadows gl={{ antialias: true, preserveDrawingBuffer: true }} camera={{ fov: 36, position: [0, 0, 9.2], near: 0.1, far: 50 }} style={{ position: "absolute" }}>
          <Three />
        </ThreeCanvas>
      </AbsoluteFill>

      <Beat s={0.0} e={1.7} tt="rise"><LogoTile name="anthropic" x={300} y={780} size={250} rot={-6} delay={2} /><LogoTile name="claude" x={560} y={1020} size={250} rot={5} delay={9} /></Beat>
      <Beat s={1.7} e={3.3} tt="slideUp"><LogoTile name="figma" x={415} y={870} size={300} rot={0} delay={fr(1.75)} shake /><div style={{ position: "absolute", top: 1230, width: "100%", textAlign: "center", fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 700, fontSize: 60, color: CORAL }}>shaking.</div></Beat>
      <HeroShot s={10.0} e={12.3} focus="globe" />
      <Beat s={20.0} e={23.1} tt="slideR"><LogoTile name="github" x={300} y={840} size={300} rot={-4} delay={fr(20.05)} /><LogoTile name="figma" x={620} y={1060} size={200} rot={6} delay={fr(20.55)} /><div style={{ position: "absolute", top: 1330, width: "100%", textAlign: "center", fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 600, fontSize: 44, color: INK, opacity: 0.7 }}>your components, imported</div></Beat>

      <Beat s={33.4} e={37.0} tt="rise"><div style={{ position: "absolute", top: 1600, width: "100%", textAlign: "center", fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 600, fontSize: 40, color: INK, opacity: 0.72 }}>✦ Claude Design — Anthropic Labs</div></Beat>

      <Captions />
    </AbsoluteFill>
  );
};
