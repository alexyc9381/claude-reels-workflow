import React, { useMemo } from "react";
import {
  AbsoluteFill,
  Audio,
  Easing,
  Img,
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
 * ClaudeDesignReelV2 — image-dense, fast-cut Greg-style reel about Claude Design.
 * Real images (brand logos + the real product screenshot, Ken-Burns panned in browser
 * cards) interleaved with 3D claymation beats. ~16 beats over 36s — the screen changes
 * roughly every second. Captions chunked to <=3 words per cut, synced to the VO.
 */

const CREAM = "#ECE9E2";
const INK = "#1A1813";
const GREEN = "#3C6B52";
const BLUE = "#3E5C8A";
const CORAL = "#D9794F";

type Word = { word: string; start: number; end: number; line: number };
const WORDS = wordsData as Word[];
const clean = (w: string) => w.toLowerCase().replace(/[^a-z']/g, "");
const EMPH = new Set([
  "figma", "nervous", "claude", "design", "landing", "page", "deck", "prototype",
  "seconds", "nobody's", "ready", "system", "github", "fixes", "mistakes", "ai", "back", "time",
]);

const FPS = 30;
const fr = (sec: number) => sec * FPS;

const eOut = (frame: number, startF: number, dur = 10) =>
  interpolate(frame, [startF, startF + dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

const winFade = (t: number, s: number, e: number, edge = 0.22) => {
  if (t < s - 0.01 || t > e + 0.3) return 0;
  const up = interpolate(t, [s, s + edge], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const dn = interpolate(t, [e - edge, e], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) });
  return Math.min(up, dn);
};

// ---------------- captions: <=3-word chunks ----------------
const CHUNKS = (() => {
  const byLine: Record<number, Word[]> = {};
  for (const w of WORDS) (byLine[w.line] ||= []).push(w);
  const out: { words: Word[]; start: number }[] = [];
  for (const li of Object.keys(byLine).map(Number).sort((a, b) => a - b)) {
    const ws = byLine[li].filter((w) => !/^[—–-]+$/.test(w.word));
    for (let i = 0; i < ws.length; i += 3) {
      const grp = ws.slice(i, i + 3);
      out.push({ words: grp, start: grp[0].start });
    }
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
        const op = winFade(t, c.start, c.end, 0.16);
        if (op <= 0.001) return null;
        return (
          <div key={i} style={{ position: "absolute", inset: 0, top: 250, height: 430, display: "flex", alignItems: "center", justifyContent: "center", opacity: op }}>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "center", gap: "0 20px", width: 940, textAlign: "center" }}>
              {c.words.map((w, j) => {
                const green = EMPH.has(clean(w.word));
                const e = eOut(frame, fr(w.start), 6);
                return (
                  <span key={j} style={{ display: "inline-block", transform: `translateY(${(1 - e) * 20}px)`, opacity: e, fontFamily: green ? frauncesItalic.fontFamily : fraunces.fontFamily, fontStyle: green ? "italic" : "normal", fontWeight: green ? 700 : 600, fontSize: green ? 108 : 92, lineHeight: 1.05, color: green ? GREEN : INK, letterSpacing: "-0.015em", textShadow: "0 2px 14px rgba(236,233,226,0.9)" }}>
                    {w.word}
                  </span>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};

// ---------------- 2D beat wrapper ----------------
const Beat: React.FC<{ s: number; e: number; children: React.ReactNode; from?: number }> = ({ s, e, children, from = 0.06 }) => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const op = winFade(t, s, e, 0.16);
  if (op <= 0.001) return null;
  const local = t - s;
  const sc = interpolate(local, [0, 0.4], [1 + from, 1], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  return <AbsoluteFill style={{ opacity: op, transform: `scale(${sc})`, display: "flex", alignItems: "center", justifyContent: "center" }}>{children}</AbsoluteFill>;
};

// ---------------- real-image components ----------------
const LogoTile: React.FC<{ name: string; x: number; y: number; size?: number; rot?: number; delay?: number; tint?: string }> = ({ name, x, y, size = 230, rot = 0, delay = 0, tint }) => {
  const frame = useCurrentFrame();
  const e = eOut(frame, delay, 9);
  const bob = Math.sin((frame + x) / 24) * 6;
  return (
    <div style={{ position: "absolute", left: x, top: y + bob, width: size, height: size, borderRadius: size * 0.24, background: "#fff", boxShadow: "0 26px 50px rgba(40,32,20,0.22)", display: "flex", alignItems: "center", justifyContent: "center", transform: `translateY(${(1 - e) * 40}px) scale(${0.6 + e * 0.4}) rotate(${rot}deg)`, opacity: e }}>
      <Img src={staticFile(`img/logos/${name}.svg`)} style={{ width: size * 0.5, height: size * 0.5, filter: tint ? `opacity(1)` : "none" }} />
    </div>
  );
};

// Browser card with the real product screenshot, Ken-Burns panned to a focus region.
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
  const sc = interpolate(t - s, [0, 0.4], [1.05, 1], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  return (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center", opacity: op }}>
      <div style={{ width: 880, height: 1020, borderRadius: 40, background: "#fff", boxShadow: "0 40px 90px rgba(40,32,20,0.32)", overflow: "hidden", transform: `scale(${sc}) rotate(-1deg)`, marginTop: 360 }}>
        <div style={{ height: 74, background: "#F3F1EA", display: "flex", alignItems: "center", gap: 12, padding: "0 28px", borderBottom: "2px solid #E6E3DA" }}>
          <div style={{ width: 18, height: 18, borderRadius: 9, background: "#E0795F" }} />
          <div style={{ width: 18, height: 18, borderRadius: 9, background: "#E9C15E" }} />
          <div style={{ width: 18, height: 18, borderRadius: 9, background: "#7BA87F" }} />
          <div style={{ marginLeft: 18, color: "#9A968B", fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 28 }}>claude.ai / design</div>
        </div>
        <div style={{ width: "100%", height: 946, backgroundImage: `url(${staticFile("img/claude-design-hero.jpg")})`, backgroundSize: `${sizePct}%`, backgroundPosition: `${bgX}% ${bgY}%`, backgroundRepeat: "no-repeat", backgroundColor: "#0C1018" }} />
      </div>
      {label && (
        <div style={{ position: "absolute", bottom: 250, padding: "14px 30px", borderRadius: 999, background: INK, color: CREAM, fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 600, fontSize: 40, boxShadow: "0 14px 28px rgba(40,32,20,0.3)" }}>{label}</div>
      )}
    </AbsoluteFill>
  );
};

// ---------------- 3D primitives ----------------
const roundRect = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) => { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); };
const glyphDraw = (kind: string) => (ctx: CanvasRenderingContext2D, S: number) => {
  ctx.clearRect(0, 0, S, S); ctx.lineWidth = 26; ctx.lineCap = "round"; ctx.lineJoin = "round";
  const col = "#EFF3EE"; ctx.strokeStyle = col; ctx.fillStyle = col; const c = S / 2;
  if (kind === "spark") { const p = [[c,44],[150,106],[212,c],[150,150],[c,212],[106,150],[44,c],[106,106]]; ctx.beginPath(); p.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y)); ctx.closePath(); ctx.fill(); }
  else if (kind === "type") { ctx.font = "bold 150px Georgia, serif"; ctx.textAlign="center"; ctx.textBaseline="middle"; ctx.fillText("Aa", c, c+8); }
  else if (kind === "swatch") { roundRect(ctx, 78, 78, 100, 100, 22); ctx.fill(); }
  else if (kind === "btn") { roundRect(ctx, 56, 104, 144, 48, 24); ctx.fill(); }
  else if (kind === "grid") { for (let i=0;i<4;i++){ const x=80+(i%2)*64, y=80+Math.floor(i/2)*64; roundRect(ctx,x,y,48,48,10); ctx.fill(); } }
  else if (kind === "check") { ctx.lineWidth=36; ctx.beginPath(); ctx.moveTo(72,c+8); ctx.lineTo(c-14,c+62); ctx.lineTo(c+84,c-56); ctx.stroke(); }
};
const useGlyphTex = (kind: string) => useMemo(() => { const cv = document.createElement("canvas"); cv.width = 256; cv.height = 256; glyphDraw(kind)(cv.getContext("2d")!, 256); const t = new THREE.CanvasTexture(cv); t.anisotropy = 8; return t; }, [kind]);

const Glyph: React.FC<{ kind: string; size?: number }> = ({ kind, size = 0.4 }) => {
  const tex = useGlyphTex(kind);
  return <mesh position={[0, 0, 0.001]}><planeGeometry args={[size, size]} /><meshBasicMaterial map={tex} transparent toneMapped={false} /></mesh>;
};
const TileMesh: React.FC<{ dark?: boolean; size?: number; depth?: number; glyph?: string }> = ({ dark = true, size = 0.62, depth = 0.2, glyph }) => (
  <group>
    <RoundedBox args={[size, size, depth]} radius={0.08} smoothness={5} castShadow receiveShadow><meshStandardMaterial color={dark ? "#2B4537" : "#F4F1EB"} roughness={0.82} /></RoundedBox>
    {glyph && <group position={[0, 0, depth / 2 + 0.002]}><Glyph kind={glyph} size={size * 0.55} /></group>}
  </group>
);

const S3D: React.FC<{ s: number; e: number; children: React.ReactNode }> = ({ s, e, children }) => {
  const frame = useCurrentFrame();
  const f = winFade(frame / FPS, s, e, 0.32);
  if (f <= 0.001) return null;
  return <group scale={[f, f, f]}>{children}</group>;
};

const Cards3D: React.FC<{ s: number }> = ({ s }) => {
  const frame = useCurrentFrame();
  const spots = [{ x: -1.2, c: "#F4F1EB", d: 2 }, { x: 0, c: GREEN, d: 8, big: true }, { x: 1.2, c: "#F4F1EB", d: 14 }];
  return (
    <group position={[0, -0.5, 0]} rotation={[-0.05, 0, 0]}>
      {spots.map((sp, i) => {
        const e = eOut(frame, fr(s) + sp.d, 18);
        const bob = Math.sin((frame + i * 30) / 28) * 0.05;
        return (
          <group key={i} position={[sp.x, bob + (1 - e) * -0.4, sp.big ? 0.4 : 0]} rotation={[0, sp.x * 0.2, i === 0 ? 0.12 : i === 2 ? -0.12 : 0]} scale={(sp.big ? 1.15 : 0.92) * (0.7 + e * 0.3)}>
            <RoundedBox args={[0.95, 1.3, 0.12]} radius={0.06} smoothness={5} castShadow receiveShadow><meshStandardMaterial color={sp.c} roughness={0.88} /></RoundedBox>
          </group>
        );
      })}
    </group>
  );
};

const Import3D: React.FC<{ s: number }> = ({ s }) => {
  const frame = useCurrentFrame();
  const chips = [{ g: "swatch", from: [-2, 1.3] }, { g: "type", from: [2.1, 0.9] }, { g: "btn", from: [-2.2, -0.6] }, { g: "grid", from: [2, -1.2] }, { g: "spark", from: [-1.6, -1.7] }];
  return (
    <group position={[0, -0.5, 0]} rotation={[-0.12, Math.sin((frame - fr(s)) / 80) * 0.1, 0]}>
      <RoundedBox args={[1.5, 1.5, 0.26]} radius={0.12} smoothness={5} castShadow receiveShadow><meshStandardMaterial color={"#243A2F"} roughness={0.78} /></RoundedBox>
      <group position={[0, 0, 0.14]}><Glyph kind="grid" size={0.7} /></group>
      {chips.map((ch, i) => {
        const e = eOut(frame, fr(s + 0.6 + i * 0.5), 22);
        const x = interpolate(e, [0, 1], [ch.from[0], 0]);
        const y = interpolate(e, [0, 1], [ch.from[1], 0]);
        const op = 1 - e;
        if (op < 0.03) return null;
        return <group key={i} position={[x, y, 0.25 + (1 - e) * 0.3]} scale={0.42 * (0.6 + op)}><TileMesh dark={i % 2 === 0} glyph={ch.g} /></group>;
      })}
    </group>
  );
};

const Check3D: React.FC<{ s: number }> = ({ s }) => {
  const frame = useCurrentFrame();
  const e = eOut(frame, fr(s + 0.2), 14);
  return (
    <group position={[0, -0.4, 0]} scale={e}>
      <mesh castShadow><sphereGeometry args={[0.85, 48, 48]} /><meshStandardMaterial color={GREEN} roughness={0.5} /></mesh>
      <group position={[0, 0, 0.86]}><Glyph kind="check" size={0.9} /></group>
    </group>
  );
};

const Sphere3D: React.FC<{ s: number }> = ({ s }) => {
  const frame = useCurrentFrame();
  const local = frame - fr(s);
  return (
    <group position={[0, -0.4, 0]} rotation={[-0.1, Math.sin(local / 60) * 0.18, 0]}>
      <mesh position={[0, Math.sin(local / 28) * 0.05, 0]} castShadow><sphereGeometry args={[0.78, 64, 64]} /><meshStandardMaterial color={"#24382E"} roughness={0.6} metalness={0.05} /></mesh>
      <group position={[0, 0, 0.8]}><Glyph kind="spark" size={0.5} /></group>
    </group>
  );
};

const Three: React.FC = () => (
  <>
    <ambientLight intensity={0.85} />
    <directionalLight position={[2.6, 3.8, 3.2]} intensity={2.5} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} shadow-radius={9} shadow-bias={-0.0004} shadow-camera-near={0.5} shadow-camera-far={20} shadow-camera-left={-5} shadow-camera-right={5} shadow-camera-top={5} shadow-camera-bottom={-5} />
    <directionalLight position={[-3, 1, 2]} intensity={0.5} />
    <mesh position={[0, -0.5, -0.7]} receiveShadow><planeGeometry args={[20, 20]} /><shadowMaterial transparent opacity={0.13} /></mesh>
    <S3D s={7.4} e={9.9}><Cards3D s={7.4} /></S3D>
    <S3D s={15.0} e={17.2}><Sphere3D s={15.0} /></S3D>
    <S3D s={17.4} e={20.0}><Import3D s={17.4} /></S3D>
    <S3D s={23.6} e={26.4}><Import3D s={23.6} /></S3D>
    <S3D s={26.4} e={29.7}><Check3D s={26.4} /></S3D>
    <S3D s={33.4} e={37.5}><Sphere3D s={33.4} /></S3D>
  </>
);

const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame / 90) * 6;
  return (
    <AbsoluteFill style={{ backgroundColor: CREAM }}>
      <AbsoluteFill style={{ transform: `translate(${drift}px, ${drift * 0.6}px)`, backgroundImage: "linear-gradient(rgba(26,24,19,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(26,24,19,0.045) 1px, transparent 1px)", backgroundSize: "66px 66px" }} />
      <AbsoluteFill style={{ opacity: 0.05, mixBlendMode: "multiply" }}><svg width="100%" height="100%"><filter id="pp"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves={2} stitchTiles="stitch" /></filter><rect width="100%" height="100%" filter="url(#pp)" /></svg></AbsoluteFill>
      <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 44%, rgba(0,0,0,0) 55%, rgba(40,32,20,0.10) 100%)" }} />
    </AbsoluteFill>
  );
};

export const ClaudeDesignReelV2: React.FC = () => {
  const { width, height } = useVideoConfig();
  return (
    <AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
      <Audio src={staticFile("vo.mp3")} />
      <Background />

      {/* 3D layer */}
      <AbsoluteFill>
        <ThreeCanvas width={width} height={height} shadows gl={{ antialias: true, preserveDrawingBuffer: true }} camera={{ fov: 36, position: [0, 0, 9.2], near: 0.1, far: 50 }} style={{ position: "absolute" }}>
          <Three />
        </ThreeCanvas>
      </AbsoluteFill>

      {/* 2D real-image beats */}
      <Beat s={0.0} e={1.7}>
        <LogoTile name="anthropic" x={300} y={760} size={250} rot={-6} delay={2} />
        <LogoTile name="claude" x={560} y={1000} size={250} rot={5} delay={9} />
      </Beat>
      <Beat s={1.7} e={3.3}>
        <LogoTile name="figma" x={425} y={840} size={300} rot={-3} delay={fr(1.75)} />
        <div style={{ position: "absolute", top: 1180, width: "100%", textAlign: "center", fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 700, fontSize: 64, color: CORAL }}>shaking.</div>
      </Beat>
      <Beat s={3.3} e={5.2}>
        <LogoTile name="claude" x={415} y={820} size={320} delay={fr(3.35)} />
        <div style={{ position: "absolute", top: 1190, width: "100%", textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 70, color: INK }}>Claude Design</div>
      </Beat>

      <HeroShot s={5.2} e={7.4} focus="full" label="describe it →" />
      {/* 7.4–9.9 handled by 3D Cards */}
      <HeroShot s={10.0} e={12.3} focus="globe" />
      <HeroShot s={12.3} e={14.8} focus="panel" label="on-brand, in seconds" />
      {/* 15–17.2 sphere (interrupt) */}

      <Beat s={20.0} e={23.1}>
        <LogoTile name="github" x={300} y={820} size={300} rot={-4} delay={fr(20.05)} />
        <LogoTile name="figma" x={620} y={1040} size={200} rot={6} delay={fr(20.5)} />
        <div style={{ position: "absolute", top: 1300, width: "100%", textAlign: "center", fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 600, fontSize: 44, color: INK, opacity: 0.7 }}>your components, imported</div>
      </Beat>

      <HeroShot s={30.1} e={32.9} focus="globe" />

      <Beat s={33.4} e={37.0} from={0.04}>
        <div style={{ position: "absolute", top: 1560, width: "100%", textAlign: "center" }}>
          <div style={{ fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 600, fontSize: 40, color: INK, opacity: 0.7 }}>✦ Claude Design — Anthropic Labs</div>
        </div>
      </Beat>

      {/* captions on top */}
      <Captions />
    </AbsoluteFill>
  );
};
