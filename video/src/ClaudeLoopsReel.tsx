import React, { useMemo } from "react";
import { AbsoluteFill, Audio, Easing, Img, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { fraunces, frauncesItalic, inter } from "./fonts";
import wordsData from "./data/words_loops.json";

/**
 * ClaudeLoopsReel — Greg-Isenberg / Claude-Design claymation style (cream paper,
 * editorial serif, matte 3D), but BRIGHT (vivid blue orbs/tiles, light terminal),
 * with a fast high-energy opening and lots of graphic switching. Alex's voice.
 */
// muted/editorial palette — the slate-blue that corresponds to Greg's forest green (not bright royal blue)
const CREAM = "#ECE9E2", INK = "#1A1813", BLUE = "#3A5C84", SKY = "#6E8CB0", LBLUE = "#A9BBD2", OFF = "#F7F5F0", AMBER = "#CF9544", GREEN = "#4A9E78";
type Word = { word: string; start: number; end: number; line: number };
const WORDS = wordsData as Word[];
const clean = (w: string) => w.toLowerCase().replace(/[^a-z']/g, "");
const EMPH = new Set(["not", "supposed", "prompt", "system", "itself", "loop", "wrong", "memory", "zero", "subagents", "parallel", "stop", "billing", "slowest", "once", "loops"]);
const FPS = 30; const fr = (s: number) => s * FPS;
const eOut = (frame: number, sF: number, dur = 10) => interpolate(frame, [sF, sF + dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
const frac = (x: number) => x - Math.floor(x); const rnd = (i: number, s = 0) => frac(Math.sin(i * 12.9898 + s * 78.233) * 43758.5453);

// ===== captions =====
const CHUNKS = (() => {
  const byLine: Record<number, Word[]> = {}; for (const w of WORDS) (byLine[w.line] ||= []).push(w);
  const out: { words: Word[]; start: number }[] = [];
  for (const li of Object.keys(byLine).map(Number).sort((a, b) => a - b)) { const ws = byLine[li].filter((w) => !/^[—–-]+$/.test(w.word)); for (let i = 0; i < ws.length; i += 3) { const g = ws.slice(i, i + 3); out.push({ words: g, start: g[0].start }); } }
  const aE = Math.max(...WORDS.map((w) => w.end));
  return out.map((c, i) => ({ ...c, end: i + 1 < out.length ? out[i + 1].start : aE + 0.4 }));
})();
const Captions: React.FC = () => {
  const frame = useCurrentFrame();
  return (<>{CHUNKS.map((c, i) => {
    const op = Math.min(eOut(frame, fr(c.start), 4), 1 - eOut(frame, fr(c.end - 0.13), 4)); if (op <= 0.001) return null;
    return (<div key={i} style={{ position: "absolute", top: 195, left: 70, right: 70, height: 350, display: "flex", alignItems: "center", justifyContent: "center", opacity: op }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "center", gap: "0 18px", width: 940, textAlign: "center" }}>
        {c.words.map((w, j) => { const g = EMPH.has(clean(w.word)); const e = eOut(frame, fr(w.start), 5);
          return <span key={j} style={{ display: "inline-block", transform: `translateY(${(1 - e) * 16}px)`, opacity: e, fontFamily: g ? frauncesItalic.fontFamily : fraunces.fontFamily, fontStyle: g ? "italic" : "normal", fontWeight: g ? 700 : 600, fontSize: g ? 102 : 88, lineHeight: 1.04, color: g ? BLUE : INK, letterSpacing: "-0.015em", textShadow: "0 2px 16px rgba(236,233,226,0.95)" }}>{w.word}</span>; })}
      </div></div>); })}</>);
};

// ===== canvas textures =====
const rr = (c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) => { c.beginPath(); c.roundRect(x, y, w, h, r); c.fill(); };
const useTex = (draw: (c: CanvasRenderingContext2D, w: number, h: number) => void, w: number, h: number, key: string) =>
  useMemo(() => { const cv = document.createElement("canvas"); cv.width = w; cv.height = h; draw(cv.getContext("2d")!, w, h); const t = new THREE.CanvasTexture(cv); t.anisotropy = 8; return t; }, [key]);
const glyphTex = (kind: string, col: string) => (c: CanvasRenderingContext2D, S: number) => {
  c.clearRect(0, 0, S, S); c.lineWidth = 22; c.lineCap = "round"; c.lineJoin = "round"; c.strokeStyle = col; c.fillStyle = col; const m = S / 2;
  if (kind === "chat") { c.beginPath(); c.roundRect(46, 56, 164, 110, 28); c.fill(); c.fillStyle = "#fff"; [88, m, 168].forEach((x) => { c.beginPath(); c.arc(x, 111, 11, 0, 7); c.fill(); }); }
  else if (kind === "spark") { const p = [[m, 38], [152, 104], [218, m], [152, 152], [m, 218], [104, 152], [38, m], [104, 104]]; c.beginPath(); p.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y)); c.closePath(); c.fill(); }
  else if (kind === "bot") { c.beginPath(); c.roundRect(64, 74, 128, 104, 26); c.fill(); c.fillStyle = "#fff"; c.beginPath(); c.arc(104, 126, 14, 0, 7); c.arc(152, 126, 14, 0, 7); c.fill(); c.fillStyle = col; c.fillRect(m - 4, 42, 8, 28); }
  else if (kind === "check") { c.lineWidth = 30; c.beginPath(); c.moveTo(72, m + 6); c.lineTo(m - 14, m + 56); c.lineTo(m + 80, m - 52); c.stroke(); }
  else if (kind === "file") { c.lineWidth = 18; c.beginPath(); c.moveTo(78, 48); c.lineTo(150, 48); c.lineTo(184, 82); c.lineTo(184, 208); c.lineTo(78, 208); c.closePath(); c.stroke(); c.beginPath(); c.moveTo(150, 48); c.lineTo(150, 82); c.lineTo(184, 82); c.stroke(); c.lineWidth = 13; [120, 150, 180].forEach((y) => { c.beginPath(); c.moveTo(100, y); c.lineTo(162, y); c.stroke(); }); }
  else if (kind === "loop") { c.lineWidth = 20; c.beginPath(); c.arc(m, m, 60, -0.3, Math.PI * 1.65); c.stroke(); const ea = Math.PI * 1.65; const ex = m + Math.cos(ea) * 60, ey = m + Math.sin(ea) * 60; c.beginPath(); c.moveTo(ex, ey); c.lineTo(ex - 28, ey - 4); c.moveTo(ex, ey); c.lineTo(ex - 4, ey - 30); c.stroke(); }
  else if (kind === "rocket") { c.lineWidth = 16; c.beginPath(); c.moveTo(m, 44); c.bezierCurveTo(m + 46, 90, m + 46, 150, m + 22, 188); c.lineTo(m - 22, 188); c.bezierCurveTo(m - 46, 150, m - 46, 90, m, 44); c.closePath(); c.stroke(); c.fillStyle = col; c.beginPath(); c.arc(m, 116, 14, 0, 7); c.fill(); }
};
const useGlyph = (kind: string, col: string) => useTex((c, S) => glyphTex(kind, col)(c, S), 256, 256, "g" + kind + col);
const drawFile = (c: CanvasRenderingContext2D, W: number, H: number) => {
  c.fillStyle = "#FBFAF6"; c.fillRect(0, 0, W, H); c.fillStyle = BLUE; rr(c, 0, 0, W, 92, 0);
  c.fillStyle = "#fff"; c.font = "bold 50px Arial"; c.fillText("◆ CLAUDE.md", 38, 60);
  c.fillStyle = "#9AA3BF"; c.font = "26px Arial"; c.fillText("# memory — never starts from zero", 40, 156);
  c.fillStyle = INK; c.font = "bold 38px Arial"; ["## context", "## rules", "## commands"].forEach((s, i) => c.fillText(s, 40, 230 + i * 92));
  c.fillStyle = "#DAD6CC"; [0, 1, 2].forEach((i) => rr(c, 40, 254 + i * 92, W - 110 - i * 56, 24, 8));
};
const drawTerminal = (c: CanvasRenderingContext2D, W: number, H: number) => {
  c.fillStyle = "#FBFAF6"; c.fillRect(0, 0, W, H); c.fillStyle = "#ECE9E2"; rr(c, 0, 0, W, 52, 0);
  c.fillStyle = "#FF6B6B"; c.beginPath(); c.arc(30, 26, 9, 0, 7); c.fill(); c.fillStyle = AMBER; c.beginPath(); c.arc(58, 26, 9, 0, 7); c.fill(); c.fillStyle = GREEN; c.beginPath(); c.arc(86, 26, 9, 0, 7); c.fill();
  c.font = "bold 23px monospace"; c.fillStyle = BLUE; c.fillText("$ claude --loop", 24, 108);
  c.fillStyle = GREEN; c.fillText("✓ reading CLAUDE.md", 24, 148); c.fillText("✓ 4 subagents live", 24, 184);
  c.fillStyle = "#C98A1E"; c.fillText("● step 7 / ∞", 24, 222); c.fillStyle = "#9AA3BF"; c.fillText("  self-prompting…", 24, 258);
};
const drawClockFace = (c: CanvasRenderingContext2D, S: number) => {
  c.clearRect(0, 0, S, S); const cx = S / 2; c.fillStyle = "#FBFAF6"; c.beginPath(); c.arc(cx, cx, cx - 8, 0, 7); c.fill(); c.strokeStyle = INK; c.lineWidth = 8; c.stroke();
  for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2; c.lineWidth = i % 3 === 0 ? 12 : 5; const r1 = cx - 40, r2 = cx - (i % 3 === 0 ? 70 : 56); c.beginPath(); c.moveTo(cx + Math.cos(a) * r1, cx + Math.sin(a) * r1); c.lineTo(cx + Math.cos(a) * r2, cx + Math.sin(a) * r2); c.stroke(); }
};
const Screen: React.FC<{ tex: THREE.Texture; w: number; h: number }> = ({ tex, w, h }) => (<mesh position={[0, 0, 0.061]}><planeGeometry args={[w, h]} /><meshBasicMaterial map={tex} toneMapped={false} /></mesh>);
const Glyph: React.FC<{ kind: string; size?: number; col?: string }> = ({ kind, size = 0.4, col = "#EFF1F7" }) => { const t = useGlyph(kind, col); return <mesh position={[0, 0, 0.001]}><planeGeometry args={[size, size]} /><meshBasicMaterial map={t} transparent toneMapped={false} /></mesh>; };

// bright blue orb (glossy, glowing)
const Orb: React.FC<{ r?: number; glyph?: string }> = ({ r = 0.62, glyph = "spark" }) => (
  <group><mesh castShadow receiveShadow><sphereGeometry args={[r, 64, 64]} /><meshStandardMaterial color={"#42628E"} roughness={0.62} metalness={0.04} /></mesh>
    <group position={[0, 0, r]}><Glyph kind={glyph} size={r} col={"#EFF3FF"} /></group></group>
);
const PromptTile: React.FC<{ size?: number }> = ({ size = 0.42 }) => (
  <group><RoundedBox args={[size, size, 0.16]} radius={0.08} smoothness={5} castShadow receiveShadow><meshStandardMaterial color={OFF} roughness={0.8} /></RoundedBox>
    <group position={[0, 0, 0.09]}><Glyph kind="chat" size={size * 0.62} col={BLUE} /></group></group>
);

// real Claude logo (drawn from its SVG path) in Claude's clay-orange — the brand centerpiece
const CLAUDE_PATH = "m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z";
const useClaudeTex = (col: string) => useTex((c, S) => { c.clearRect(0, 0, S, S); const P = new Path2D(CLAUDE_PATH); const pad = 0.15; const scale = (S * (1 - 2 * pad)) / 24; c.save(); c.translate(S * pad, S * pad); c.scale(scale, scale); c.fillStyle = col; c.fill(P); c.restore(); }, 256, 256, "claude" + col);
const ClaudeIcon: React.FC<{ size?: number; depth?: number; tile?: string; logo?: string }> = ({ size = 1.0, depth = 0.2, tile = "#F4EFE6", logo = "#D2724E" }) => {
  const tex = useClaudeTex(logo);
  return (<group>
    <RoundedBox args={[size, size, depth]} radius={size * 0.22} smoothness={6} castShadow receiveShadow><meshStandardMaterial color={tile} roughness={0.72} /></RoundedBox>
    <mesh position={[0, 0, depth / 2 + 0.002]}><planeGeometry args={[size * 0.72, size * 0.72]} /><meshBasicMaterial map={tex} transparent toneMapped={false} /></mesh>
  </group>);
};

const G3: React.FC<{ s: number; e: number; children: React.ReactNode }> = ({ s, e, children }) => {
  const frame = useCurrentFrame(); const local = frame - fr(s); const lenF = fr(e - s);
  if (local < 0 || local > lenF) return null;
  const pop = Math.min(eOut(frame, fr(s), 7), 1 - eOut(frame, fr(e - 0.16), 5));
  const punch = interpolate(local, [0, 4, 9], [0.07, 0, 0], { extrapolateRight: "clamp" }); // punchy cut-in
  const fy = Math.sin(local / 34) * 0.06, fx = Math.cos(local / 42) * 0.045, ry = Math.sin(local / 56) * 0.06;
  return <group position={[fx, fy, 0]} rotation={[0, ry, 0]} scale={0.9 + 0.1 * pop + punch}>{children}</group>;
};

// HOOK — FAST prompt barrage hits the orb (manual), then it spins up & flings them into a loop
const OrbPrompts: React.FC<{ s: number }> = ({ s }) => {
  const frame = useCurrentFrame(); const local = frame - fr(s);
  const tr = eOut(frame, fr(s) + 62, 14); const spin = Math.max(0, local - 66) * 0.06;
  let pulse = 1; for (let i = 0; i < 6; i++) { const hit = 8 + i * 6 + 10; const d = local - hit; if (d >= 0 && d < 8) pulse += (1 - d / 8) * 0.14 * Math.sin(d * 0.8); }
  const orbScale = (0.8 + eOut(frame, fr(s), 8) * 0.2) * pulse;
  return (
    <group position={[0, -0.35, 0]} rotation={[-0.16, 0, 0]}>
      <mesh rotation={[Math.PI / 2, 0, 0]} scale={tr}><torusGeometry args={[1.25, 0.05, 16, 80]} /><meshStandardMaterial color={BLUE} roughness={0.5} emissive={BLUE} emissiveIntensity={0.3} /></mesh>
      <group scale={orbScale}><ClaudeIcon size={1.05} /></group>
      {Array.from({ length: 6 }, (_, i) => {
        const baseA = -Math.PI / 2 + (i / 6) * Math.PI * 2; const fin = eOut(frame, fr(s) + 4 + i * 6, 10);
        const fromX = Math.cos(baseA) * 4.0, fromY = Math.sin(baseA) * 4.0; const hitX = Math.cos(baseA) * 0.78, hitY = Math.sin(baseA) * 0.78;
        const orbitX = Math.cos(baseA + spin) * 1.25, orbitY = Math.sin(baseA + spin) * 1.25;
        const x = interpolate(tr, [0, 1], [interpolate(fin, [0, 1], [fromX, hitX]), orbitX]);
        const y = interpolate(tr, [0, 1], [interpolate(fin, [0, 1], [fromY, hitY]), orbitY]);
        return <group key={i} position={[x, y, 0.22]} scale={0.35 + fin * 0.45}><PromptTile size={0.4} /></group>;
      })}
      {/* impact sparks */}
      {Array.from({ length: 6 }, (_, i) => { const hit = fr(s) + 4 + i * 6 + 10; const d = frame - hit; if (d < 0 || d > 8 || tr > 0.3) return null; const baseA = -Math.PI / 2 + (i / 6) * Math.PI * 2; const op = 1 - d / 8;
        return Array.from({ length: 4 }, (_, k) => { const a = baseA + (k - 1.5) * 0.5; const r = 0.78 + (d / 8) * 0.5; return <mesh key={i + "-" + k} position={[Math.cos(a) * r, Math.sin(a) * r, 0.32]}><sphereGeometry args={[0.04 * op, 6, 6]} /><meshStandardMaterial color={AMBER} emissive={AMBER} emissiveIntensity={0.7} /></mesh>; }); })}
    </group>
  );
};

// clean 4-step CYCLE flowchart (Prompt → Run → Check → Repeat) — distinct from the orbit
const LoopCycle: React.FC<{ s: number }> = ({ s }) => {
  const frame = useCurrentFrame(); const local = frame - fr(s); const R = 1.15;
  const nodes = [{ a: -90, g: "chat" }, { a: 0, g: "spark" }, { a: 90, g: "check" }, { a: 180, g: "loop" }];
  const seg = 22; const tp = (local % (seg * 4)) / seg; const si = Math.floor(tp) % 4; const sf = tp - Math.floor(tp);
  const aF = (-90 + si * 90) * Math.PI / 180, aT = (-90 + (si + 1) * 90) * Math.PI / 180; const dotA = aF + (aT - aF) * sf;
  return (
    <group position={[0, -0.32, 0]} rotation={[-0.08, 0, 0]}>
      {/* subtle connecting ring path */}
      <mesh position={[0, 0, -0.02]}><torusGeometry args={[R, 0.018, 12, 96]} /><meshStandardMaterial color={SKY} roughness={0.6} emissive={SKY} emissiveIntensity={0.12} /></mesh>
      {/* direction arrowheads at the 4 mid-arcs */}
      {[0, 1, 2, 3].map((i) => { const a = (-45 + i * 90) * Math.PI / 180; return (<mesh key={"ar" + i} position={[Math.cos(a) * R, Math.sin(a) * R, 0]} rotation={[0, 0, a - Math.PI / 2]}><coneGeometry args={[0.08, 0.2, 4]} /><meshStandardMaterial color={SKY} roughness={0.5} /></mesh>); })}
      {/* 4 static node tiles */}
      {nodes.map((n, i) => { const a = n.a * Math.PI / 180; const e = eOut(frame, fr(s) + 4 + i * 5, 12); const active = si === i; const pop = active ? 1 + Math.sin(local / 5) * 0.04 : 1;
        return (<group key={i} position={[Math.cos(a) * R, Math.sin(a) * R, 0.05]} scale={(0.55 + e * 0.45) * pop}>
          <RoundedBox args={[0.52, 0.52, 0.18]} radius={0.11} smoothness={5} castShadow><meshStandardMaterial color={active ? BLUE : OFF} roughness={0.6} /></RoundedBox>
          <group position={[0, 0, 0.1]}><Glyph kind={n.g} size={0.3} col={active ? "#EFF3FF" : BLUE} /></group>
        </group>); })}
      {/* one flowing dot traveling the cycle */}
      <mesh position={[Math.cos(dotA) * R, Math.sin(dotA) * R, 0.08]}><sphereGeometry args={[0.07, 12, 12]} /><meshStandardMaterial color={AMBER} emissive={AMBER} emissiveIntensity={0.7} /></mesh>
      {/* small Claude at center */}
      <group><ClaudeIcon size={0.5} /></group>
    </group>
  );
};

const MemoryMonitor: React.FC<{ s: number }> = ({ s }) => {
  const tex = useTex(drawFile, 600, 800, "file"); const frame = useCurrentFrame(); const local = frame - fr(s);
  return (
    <group position={[0, -0.4, 0]} rotation={[-0.05, 0, -0.03]}>
      <RoundedBox args={[1.4, 1.85, 0.12]} radius={0.07} smoothness={5} castShadow receiveShadow><meshStandardMaterial color={OFF} roughness={0.85} /></RoundedBox>
      <group position={[0, 0, 0.061]}><Screen tex={tex} w={1.3} h={1.74} /></group>
      {Array.from({ length: 5 }, (_, i) => { const a = local * 0.03 + (i / 5) * Math.PI * 2; const e = eOut(frame, fr(s + 0.4 + i * 0.14), 12); return (
        <RoundedBox key={i} args={[0.2, 0.2, 0.08]} radius={0.05} position={[Math.cos(a) * 1.2, Math.sin(a) * 1.2 * 0.6, 0.3]} scale={e} castShadow><meshStandardMaterial color={i % 2 ? SKY : AMBER} roughness={0.5} /></RoundedBox>); })}
    </group>
  );
};

const AgentSplit: React.FC<{ s: number }> = ({ s }) => {
  const frame = useCurrentFrame(); const local = frame - fr(s);
  const spots = [{ x: -1.15, y: 0.62 }, { x: 1.15, y: 0.62 }, { x: -1.3, y: -0.35 }, { x: 1.3, y: -0.35 }];
  return (
    <group position={[0, -0.3, 0]} rotation={[-0.06, 0, 0]}>
      <group><ClaudeIcon size={0.82} /></group>
      {spots.map((sp, i) => { const e = eOut(frame, fr(s + 0.3 + i * 0.28), 12); const x = sp.x * e, y = sp.y * e; const prog = eOut(frame, fr(s + 0.9 + i * 0.28), 24); const dist = Math.hypot(x, y); const ang = Math.atan2(y, x); const pk = ((local + i * 9) % 34) / 34;
        return (<group key={i}>
          <mesh position={[x / 2, y / 2, -0.05]} rotation={[0, 0, ang]}><planeGeometry args={[dist, 0.03]} /><meshBasicMaterial color={SKY} transparent opacity={0.55 * e} /></mesh>
          {e > 0.5 && <mesh position={[x * pk, y * pk, 0.05]}><sphereGeometry args={[0.045, 8, 8]} /><meshStandardMaterial color={AMBER} emissive={AMBER} emissiveIntensity={0.6} /></mesh>}
          <group position={[x, y, 0]} scale={0.55 + 0.45 * e}>
            <RoundedBox args={[0.6, 0.6, 0.2]} radius={0.1} smoothness={5} castShadow><meshStandardMaterial color={SKY} roughness={0.5} /></RoundedBox>
            <group position={[0, 0.04, 0.105]}><Glyph kind="bot" size={0.34} col={"#EFF3FF"} /></group>
            <mesh position={[-0.27 + (prog * 0.54) / 2, -0.24, 0.11]}><planeGeometry args={[prog * 0.46, 0.055]} /><meshBasicMaterial color={prog > 0.95 ? GREEN : AMBER} /></mesh>
          </group>
        </group>); })}
    </group>
  );
};

// clock + coins stacking up overnight (billing) + a STOP that caps it — richer, distinct
const BillingScene: React.FC<{ s: number }> = ({ s }) => {
  const tex = useTex(drawClockFace, 512, 512, "clk"); const frame = useCurrentFrame(); const local = frame - fr(s);
  const spin = eOut(frame, fr(s) + 6, fr(2.4)); const min = spin * Math.PI * 2 * 6, hr = spin * Math.PI * 2 * 1.5; const stopped = local > fr(2.6); const se = eOut(frame, fr(s) + 78, 8);
  const capCoin = stopped ? 6 : 99;
  return (
    <group position={[0, -0.38, 0]} rotation={[-0.05, 0, 0]}>
      {/* clock (left) */}
      <group position={[-0.92, 0, 0]} scale={0.8}>
        <mesh rotation={[Math.PI / 2, 0, 0]} castShadow><cylinderGeometry args={[0.8, 0.8, 0.16, 64]} /><meshStandardMaterial color={OFF} roughness={0.8} /></mesh>
        <mesh position={[0, 0, 0.083]}><planeGeometry args={[1.5, 1.5]} /><meshBasicMaterial map={tex} transparent toneMapped={false} /></mesh>
        <group position={[0, 0, 0.1]} rotation={[0, 0, -hr]}><RoundedBox args={[0.07, 0.38, 0.04]} radius={0.02} position={[0, 0.14, 0]}><meshStandardMaterial color={INK} /></RoundedBox></group>
        <group position={[0, 0, 0.12]} rotation={[0, 0, -min]}><RoundedBox args={[0.05, 0.56, 0.03]} radius={0.02} position={[0, 0.24, 0]}><meshStandardMaterial color={BLUE} /></RoundedBox></group>
        <mesh position={[0, 0, 0.14]}><sphereGeometry args={[0.07, 18, 18]} /><meshStandardMaterial color={AMBER} /></mesh>
      </group>
      {/* rising cost bar-chart (right) — climbs overnight, then capped */}
      <group position={[0.92, -0.52, 0]}>
        <mesh position={[0, -0.04, -0.06]}><planeGeometry args={[1.32, 0.045]} /><meshBasicMaterial color={"#D7D1C4"} /></mesh>
        {[0, 1, 2, 3, 4].map((i) => { const appear = eOut(frame, fr(s) + 6 + i * 5, 8); const grow = stopped ? 1 : eOut(frame, fr(s) + 6 + i * 5, 24); const maxH = 0.3 + i * 0.24; const h = Math.max(0.05, appear * grow * maxH); const red = i >= 3;
          return (<group key={i} position={[i * 0.27 - 0.54, h / 2, 0]} scale={appear}>
            <RoundedBox args={[0.2, h, 0.2]} radius={0.04} smoothness={4} castShadow><meshStandardMaterial color={red ? "#BC5440" : AMBER} roughness={0.74} /></RoundedBox>
          </group>); })}
      </group>
      {/* STOP badge slams in to cap it */}
      {stopped && <group position={[0.92, 0.92, 0.5]} scale={interpolate(se, [0, 1], [1.9, 1]) * 0.46} rotation={[0, 0, -0.1]}>
        <mesh><circleGeometry args={[0.6, 32]} /><meshBasicMaterial color={"#BC5440"} /></mesh>
        <mesh position={[0, 0, 0.01]}><planeGeometry args={[0.42, 0.15]} /><meshBasicMaterial color={"#fff"} /></mesh>
      </group>}
    </group>
  );
};

// a QUEUE of prompts inching toward Claude one at a time (the slow way) — distinct
const SlowQueue: React.FC<{ s: number }> = ({ s }) => {
  const frame = useCurrentFrame(); const local = frame - fr(s); const shift = local * 0.004;
  return (
    <group position={[0, -0.32, 0]} rotation={[-0.08, 0, 0]}>
      <group position={[1.05, 0, 0]}><ClaudeIcon size={0.92} /></group>
      <mesh position={[1.05, 0, 0.5]} rotation={[0, 0, -local * 0.05]}><torusGeometry args={[0.54, 0.035, 12, 40, Math.PI * 1.4]} /><meshStandardMaterial color={AMBER} emissive={AMBER} emissiveIntensity={0.45} /></mesh>
      {Array.from({ length: 5 }, (_, i) => { const e = eOut(frame, fr(s) + 2 + i * 3, 10); const x = -1.5 + i * 0.46 + shift; const bob = Math.sin((local + i * 14) / 20) * 0.03; return (
        <group key={i} position={[x, bob, 0]} scale={e * (i === 4 ? 1 : 0.9)}><PromptTile size={0.4} /></group>); })}
      <mesh position={[0.52, 0, 0]} rotation={[0, 0, -Math.PI / 2]}><coneGeometry args={[0.08, 0.2, 4]} /><meshStandardMaterial color={SKY} /></mesh>
    </group>
  );
};

// horizontal PIPELINE: Memory → Agents → Ship, with a loop-back arc — distinct from any ring
const Pipeline: React.FC<{ s: number }> = ({ s }) => {
  const frame = useCurrentFrame(); const local = frame - fr(s); const flow = (local % 30) / 30;
  const stages = [{ x: -1.4, g: "file" }, { x: 0, g: "bot" }, { x: 1.4, g: "rocket" }];
  return (
    <group position={[0, -0.3, 0]} rotation={[-0.06, 0, 0]}>
      {/* loop-back arc over the top (Ship → Memory) */}
      <mesh><torusGeometry args={[1.4, 0.024, 12, 64, Math.PI]} /><meshStandardMaterial color={AMBER} roughness={0.5} emissive={AMBER} emissiveIntensity={0.2} /></mesh>
      {(() => { const a = Math.PI * flow; return <mesh position={[Math.cos(a) * 1.4, Math.sin(a) * 1.4, 0.05]}><sphereGeometry args={[0.05, 8, 8]} /><meshStandardMaterial color={AMBER} emissive={AMBER} emissiveIntensity={0.6} /></mesh>; })()}
      {/* forward arrows + flow dots */}
      {[0, 1].map((i) => { const x = -0.7 + i * 1.4; return <mesh key={"a" + i} position={[x, 0, 0]} rotation={[0, 0, -Math.PI / 2]}><coneGeometry args={[0.09, 0.22, 4]} /><meshStandardMaterial color={SKY} /></mesh>; })}
      {[0, 1].map((i) => { const x = -1.4 + 1.4 * i + flow * 1.4; return <mesh key={"f" + i} position={[x, 0, 0.06]}><sphereGeometry args={[0.05, 8, 8]} /><meshStandardMaterial color={SKY} emissive={SKY} emissiveIntensity={0.5} /></mesh>; })}
      {/* 3 stage tiles */}
      {stages.map((st, i) => { const e = eOut(frame, fr(s) + 4 + i * 6, 12); const pulse = 1 + Math.sin((local + i * 10) / 9) * 0.04; return (
        <group key={i} position={[st.x, 0, 0]} scale={(0.7 + e * 0.3) * pulse}>
          <RoundedBox args={[0.66, 0.66, 0.2]} radius={0.13} smoothness={5} castShadow><meshStandardMaterial color={i === 1 ? BLUE : OFF} roughness={0.6} /></RoundedBox>
          <group position={[0, 0, 0.105]}><Glyph kind={st.g} size={0.38} col={i === 1 ? "#EFF3FF" : BLUE} /></group>
          <mesh position={[0.22, 0.22, 0.12]}><circleGeometry args={[0.05, 16]} /><meshBasicMaterial color={GREEN} /></mesh>
        </group>); })}
    </group>
  );
};

const Three: React.FC = () => (<>
  <hemisphereLight args={["#ffffff", "#ded7c6", 0.55]} />
  <ambientLight intensity={0.5} />
  <directionalLight position={[3, 4.6, 4]} intensity={2.0} castShadow shadow-mapSize-width={3072} shadow-mapSize-height={3072} shadow-radius={16} shadow-bias={-0.0004} shadow-camera-near={0.5} shadow-camera-far={20} shadow-camera-left={-5} shadow-camera-right={5} shadow-camera-top={5} shadow-camera-bottom={-5} />
  <directionalLight position={[-3.5, 1.5, 2.5]} intensity={0.4} color={"#CFE0FF"} />
  <directionalLight position={[0, 2.5, -4]} intensity={0.9} color={"#FFFFFF"} />
  <mesh position={[0, -0.5, -0.7]} receiveShadow><planeGeometry args={[20, 20]} /><shadowMaterial transparent opacity={0.1} /></mesh>
  <G3 s={0.0} e={5.2}><OrbPrompts s={0.0} /></G3>
  <G3 s={5.3} e={8.9}><LoopCycle s={5.3} /></G3>
  <G3 s={8.9} e={12.5}><MemoryMonitor s={8.9} /></G3>
  <G3 s={12.5} e={15.5}><AgentSplit s={12.5} /></G3>
  <G3 s={15.55} e={19.4}><BillingScene s={15.55} /></G3>
  <G3 s={19.45} e={23.5}><SlowQueue s={19.45} /></G3>
  <G3 s={23.55} e={26.6}><Pipeline s={23.55} /></G3>
</>);

// ===== 2D callout pops (more switching / identifiable info) =====
const Callout: React.FC<{ s: number; e: number; text: string; bg?: string; fg?: string; top: number }> = ({ s, e, text, bg = BLUE, fg = "#fff", top }) => {
  const frame = useCurrentFrame(); const local = frame - fr(s); const lenF = fr(e - s);
  if (local < 0 || local > lenF) return null;
  const inP = eOut(frame, fr(s), 6); const out = 1 - eOut(frame, fr(e - 0.2), 5); const bob = Math.sin(frame / 14) * 6;
  return (<div style={{ position: "absolute", top: top + bob, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: Math.min(inP, out), transform: `scale(${interpolate(inP, [0, 1], [1.3, 1])})` }}>
    <div style={{ padding: "16px 34px", borderRadius: 999, background: bg, color: fg, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 44, boxShadow: "0 14px 30px rgba(43,91,255,0.3)" }}>{text}</div>
  </div>);
};

// supplementary "satellite" elements floating in the side margins around the main graphic
const Sat: React.FC<{ s: number; e: number; x: number; y: number; delay?: number; children: React.ReactNode }> = ({ s, e, x, y, delay = 0, children }) => {
  const frame = useCurrentFrame(); const local = frame - fr(s); const lenF = fr(e - s);
  if (local < 0 || local > lenF) return null;
  const inP = eOut(frame, fr(s) + delay, 8); const out = 1 - eOut(frame, fr(e - 0.2), 5); const bob = Math.sin((frame + x) / 22) * 8;
  return <div style={{ position: "absolute", left: x, top: y + bob, opacity: Math.min(inP, out), transform: `scale(${0.55 + inP * 0.45})` }}>{children}</div>;
};
const chipBox: React.CSSProperties = { background: "linear-gradient(158deg,#FFFFFF 0%,#F3F5FC 100%)", borderRadius: 30, boxShadow: "0 26px 52px rgba(43,91,255,0.13), 0 8px 18px rgba(40,32,20,0.08), inset 0 1px 0 rgba(255,255,255,0.9)", border: "1.5px solid rgba(43,91,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center" };
const LogoChip: React.FC<{ name: string; size?: number }> = ({ name, size = 124 }) => (
  <div style={{ ...chipBox, width: size, height: size }}>
    {name === "claude"
      ? <svg viewBox="0 0 24 24" width={size * 0.56} height={size * 0.56}><path fill="#D2724E" d={CLAUDE_PATH} /></svg>
      : <Img src={staticFile(`img/logos/${name}.svg`)} style={{ width: size * 0.5, height: size * 0.5 }} />}
  </div>
);
const Pill: React.FC<{ text: string; bg?: string; fg?: string }> = ({ text, bg = "#fff", fg = INK }) => {
  const light = bg === "#fff";
  return (<div style={{ padding: "16px 30px", borderRadius: 999, background: light ? "linear-gradient(158deg,#FFFFFF,#F3F5FC)" : bg, color: fg, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 38, boxShadow: light ? "0 20px 40px rgba(43,91,255,0.13), 0 5px 12px rgba(40,32,20,0.07)" : "0 18px 38px rgba(0,0,0,0.16)", border: light ? "1.5px solid rgba(43,91,255,0.06)" : "none", whiteSpace: "nowrap", letterSpacing: "-0.01em" }}>{text}</div>);
};
const MiniTerm: React.FC = () => {
  const frame = useCurrentFrame(); const blink = Math.floor(frame / 10) % 2 === 0;
  return (<div style={{ width: 312, background: "linear-gradient(160deg,#FFFFFF,#F4F6FC)", borderRadius: 24, boxShadow: "0 26px 52px rgba(43,91,255,0.13), 0 8px 18px rgba(40,32,20,0.08)", border: "1.5px solid rgba(43,91,255,0.06)", padding: "18px 22px", fontFamily: "monospace", fontSize: 23, lineHeight: 1.5 }}>
    <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>{["#FF6B6B", AMBER, GREEN].map((c, i) => <div key={i} style={{ width: 12, height: 12, borderRadius: 7, background: c }} />)}</div>
    <div style={{ color: BLUE, fontWeight: 700 }}>$ claude --loop</div>
    <div style={{ color: "#13a06a", fontWeight: 700 }}>✓ self-prompting{blink ? "▋" : ""}</div>
  </div>);
};

const EndCard: React.FC<{ s: number }> = ({ s }) => {
  const frame = useCurrentFrame(); const local = frame - fr(s); if (local < 0) return null; const a = eOut(frame, fr(s) + 2, 12); const pulse = 1 + Math.sin(frame / 7) * 0.03;
  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      {Array.from({ length: 10 }, (_, i) => { const p = eOut(frame, fr(s) + 4 + i, 28); const ang = (i / 10) * Math.PI * 2; if (p <= 0 || p >= 1) return null; return <div key={i} style={{ position: "absolute", left: 540 + Math.cos(ang) * p * 340, top: 920 + Math.sin(ang) * p * 340, fontSize: 30, opacity: Math.sin(p * Math.PI), color: [BLUE, AMBER, GREEN, SKY][i % 4] }}>✦</div>; })}
      <div style={{ marginTop: 250, transform: `scale(${(0.8 + a * 0.2) * pulse})`, padding: "32px 64px", borderRadius: 999, background: BLUE, color: "#fff", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 76, boxShadow: "0 26px 60px rgba(43,91,255,0.4)", opacity: a }}>💬 Comment "LOOP"</div>
      <div style={{ marginTop: 36, fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 600, fontSize: 46, color: INK, opacity: a }}>and I'll send you my setup</div>
    </AbsoluteFill>
  );
};

// ===== SFX =====
const Sfx: React.FC<{ at: number; src: string; vol?: number }> = ({ at, src, vol = 0.5 }) => (<Sequence from={fr(at)} durationInFrames={fr(1.2)}><Audio src={staticFile(`sfx/${src}`)} volume={vol} /></Sequence>);
const SFX_CUES = [
  { t: 0.0, s: "swooshup", v: 0.32 }, { t: 0.2, s: "sparkle", v: 0.3 },
  { t: 0.5, s: "thock", v: 0.34 }, { t: 0.7, s: "thock", v: 0.32 }, { t: 0.9, s: "thock", v: 0.32 }, { t: 1.1, s: "thock", v: 0.32 }, { t: 1.3, s: "thock", v: 0.3 }, { t: 1.5, s: "thock", v: 0.3 },
  { t: 2.3, s: "swooshup", v: 0.32 }, { t: 2.5, s: "chimehi", v: 0.32 }, { t: 3.0, s: "data", v: 0.28 },
  { t: 5.3, s: "swooshup", v: 0.32 }, { t: 5.7, s: "data", v: 0.3 },
  { t: 8.9, s: "swish", v: 0.28 }, { t: 9.3, s: "key", v: 0.32 }, { t: 9.7, s: "key", v: 0.32 }, { t: 10.1, s: "key", v: 0.32 }, { t: 11.5, s: "chimelo", v: 0.32 },
  { t: 12.5, s: "swooshup", v: 0.3 }, { t: 13.0, s: "snap", v: 0.34 }, { t: 13.4, s: "snap", v: 0.34 }, { t: 13.8, s: "snap", v: 0.34 }, { t: 14.2, s: "snap", v: 0.32 }, { t: 14.6, s: "ding", v: 0.34 },
  { t: 15.55, s: "swish", v: 0.28 }, { t: 15.9, s: "tick", v: 0.3 }, { t: 16.4, s: "tick", v: 0.3 }, { t: 16.9, s: "tick", v: 0.3 }, { t: 17.4, s: "tick", v: 0.28 }, { t: 18.1, s: "thock", v: 0.36 }, { t: 18.3, s: "chimehi", v: 0.32 },
  { t: 19.45, s: "blip2", v: 0.24 }, { t: 20.4, s: "tick", v: 0.24 }, { t: 21.6, s: "tick", v: 0.22 },
  { t: 23.55, s: "swooshup", v: 0.32 }, { t: 24.0, s: "data", v: 0.3 }, { t: 24.8, s: "chimehi", v: 0.32 },
  { t: 26.82, s: "resolve", v: 0.34 }, { t: 28.0, s: "sparkle", v: 0.3 },
];
const SfxTrack: React.FC = () => (<>{SFX_CUES.map((c, i) => <Sfx key={i} at={c.t} src={`${c.s}.wav`} vol={c.v} />)}</>);

const Ambient: React.FC = () => {
  const frame = useCurrentFrame(); const t = frame / FPS;
  return (<AbsoluteFill style={{ pointerEvents: "none" }}>{Array.from({ length: 18 }, (_, i) => {
    const x = rnd(i, 11) * 1060 + 10, y = rnd(i, 12) * 1880 + 20; const dx = Math.sin((t + i * 1.7) / (5 + rnd(i, 13) * 4)) * 48, dy = Math.cos((t + i * 2.1) / (6 + rnd(i, 14) * 4)) * 42;
    const size = 7 + rnd(i, 15) * 16; const tw = 0.35 + 0.65 * (Math.sin(t * 1.5 + i * 2) * 0.5 + 0.5); const isSpark = rnd(i, 16) > 0.5; const col = [BLUE, SKY, AMBER, GREEN][Math.floor(rnd(i, 17) * 4)];
    return isSpark
      ? <div key={i} style={{ position: "absolute", left: x + dx, top: y + dy, fontSize: size, color: col, opacity: tw * 0.5, transform: `rotate(${t * 11 + i * 30}deg)` }}>✦</div>
      : <div key={i} style={{ position: "absolute", left: x + dx, top: y + dy, width: size, height: size, borderRadius: "50%", background: col, opacity: tw * 0.24 }} />;
  })}</AbsoluteFill>);
};

const Background: React.FC = () => {
  const frame = useCurrentFrame(); const drift = Math.sin(frame / 90) * 6;
  return (<AbsoluteFill style={{ backgroundColor: CREAM }}>
    <AbsoluteFill style={{ transform: `translate(${drift}px, ${drift * 0.6}px)`, backgroundImage: "linear-gradient(rgba(26,24,19,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(26,24,19,0.045) 1px, transparent 1px)", backgroundSize: "66px 66px" }} />
    <div style={{ position: "absolute", width: 640, height: 640, left: -140, top: 140, borderRadius: "50%", background: "radial-gradient(circle, rgba(43,91,255,0.08), transparent 70%)" }} />
    <div style={{ position: "absolute", width: 560, height: 560, right: -120, bottom: 220, borderRadius: "50%", background: "radial-gradient(circle, rgba(224,162,61,0.07), transparent 70%)" }} />
    <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 44%, rgba(0,0,0,0) 58%, rgba(40,32,20,0.08) 100%)" }} />
  </AbsoluteFill>);
};

export const ClaudeLoopsReel: React.FC = () => {
  const { width, height } = useVideoConfig();
  return (
    <AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
      <Audio src={staticFile("vo_loops.mp3")} />
      <SfxTrack />
      <Background />
      <Ambient />
      <AbsoluteFill>
        <ThreeCanvas width={width} height={height} shadows gl={{ antialias: true, preserveDrawingBuffer: true }} camera={{ fov: 36, position: [0, 0, 9.2], near: 0.1, far: 50 }} style={{ position: "absolute" }}>
          <Three />
        </ThreeCanvas>
      </AbsoluteFill>
      {/* callout pops for more on-screen switching */}
      <Callout s={1.0} e={2.1} text="✗ doing it manually" bg="#FF5B5B" top={1430} />
      <Callout s={6.4} e={8.2} text="↻ runs itself" top={1430} />
      <Callout s={10.4} e={12.3} text="0 → ∞ context" bg={GREEN} top={1430} />
      <Callout s={13.4} e={15.3} text="× 4 in parallel ⚡" bg={AMBER} fg={INK} top={1500} />
      <Callout s={17.2} e={19.3} text="$312/night → STOP" bg="#FF5B5B" top={1430} />
      <Callout s={24.2} e={26.4} text="● running itself" bg={GREEN} top={1430} />
      {/* supplementary satellites (logos + stats) around each graphic */}
      <Sat s={5.7} e={8.7} x={56} y={600}><MiniTerm /></Sat>
      <Sat s={6.1} e={8.7} x={852} y={700} delay={6}><LogoChip name="github" /></Sat>
      <Sat s={9.2} e={12.3} x={850} y={650}><LogoChip name="github" /></Sat>
      <Sat s={9.8} e={12.3} x={70} y={720} delay={6}><Pill text="from your repo" /></Sat>
      <Sat s={13.0} e={15.4} x={64} y={660}><LogoChip name="github" size={112} /></Sat>
      <Sat s={13.5} e={15.4} x={858} y={680} delay={6}><LogoChip name="claude" size={112} /></Sat>
      <Sat s={16.1} e={19.3} x={70} y={700}><Pill text="💸 no cap set" bg="#FF5B5B" fg="#fff" /></Sat>
      <Sat s={20.1} e={23.4} x={760} y={680}><Pill text="🐌 1 / turn" /></Sat>
      <Sat s={24.0} e={26.5} x={72} y={680}><LogoChip name="claude" /></Sat>
      <Sat s={24.5} e={26.5} x={860} y={700} delay={6}><LogoChip name="github" /></Sat>
      <EndCard s={26.6} />
      <Captions />
    </AbsoluteFill>
  );
};
