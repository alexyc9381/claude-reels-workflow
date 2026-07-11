import React from "react";
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  spring,
  random,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { montserrat, inter } from "./fonts";

/**
 * GregStyleSampleV2 — motion-graphics reel sample (1080x1920, 5s @ 30fps).
 * Original copy + original mockups, built in the STYLE/grammar of the
 * "AI-tool / startup tip" reel genre (Greg-Isenberg-adjacent):
 *   - dense beats: a new graphic element lands every ~0.5s
 *   - animated UI cards / phone & app mockups that spring + slide in with shadows
 *   - floating chips, hand-drawn scribble circles & arrows, emoji + confetti bursts
 *   - whip zoom-punch cuts + camera shake on impacts + white flashes
 *   - top progress bar, animated mesh-gradient background, film grain
 * No footage reused; everything is generated.
 */

const RED = "#FF4D4D";
const GREEN = "#27E08A";
const YELLOW = "#FFD23F";
const BLUE = "#5B8CFF";
const INK = "#0E1116";

// ---------- shared animation helpers (spring() is pure, safe to call anywhere) ----------
type Pop = { scale: number; opacity: number; ty: number; tx: number; rot: number };
const pop = (
  frame: number,
  fps: number,
  start: number,
  o: { from?: number; ty?: number; tx?: number; rot?: number; damping?: number; stiffness?: number; mass?: number } = {}
): Pop => {
  const s = spring({
    frame: frame - start,
    fps,
    config: { damping: o.damping ?? 12, stiffness: o.stiffness ?? 170, mass: o.mass ?? 0.6 },
  });
  const op = interpolate(frame - start, [0, 4], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return {
    scale: interpolate(s, [0, 1], [o.from ?? 0.6, 1]),
    opacity: op,
    ty: interpolate(s, [0, 1], [o.ty ?? 0, 0]),
    tx: interpolate(s, [0, 1], [o.tx ?? 0, 0]),
    rot: interpolate(s, [0, 1], [o.rot ?? 0, 0]),
  };
};

// ---------- background ----------
const Grain: React.FC = () => {
  const frame = useCurrentFrame();
  const seed = Math.floor(frame / 3) % 14;
  return (
    <AbsoluteFill style={{ opacity: 0.07, mixBlendMode: "overlay" }}>
      <svg width="100%" height="100%">
        <filter id="g2">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={seed} stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#g2)" />
      </svg>
    </AbsoluteFill>
  );
};

const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const a = interpolate(frame, [0, durationInFrames], [0, 1]);
  const blob = (cx: number, cy: number, col: string, ph: number) => (
    <div
      style={{
        position: "absolute",
        width: 980,
        height: 980,
        left: cx + Math.sin((a + ph) * Math.PI * 2) * 70,
        top: cy + Math.cos((a + ph) * Math.PI * 2) * 90,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${col} 0%, rgba(0,0,0,0) 68%)`,
        filter: "blur(50px)",
      }}
    />
  );
  return (
    <AbsoluteFill style={{ background: "linear-gradient(160deg, #12152B 0%, #0A0B14 55%, #0E1A1C 100%)" }}>
      {blob(-160, 180, "rgba(91,140,255,0.40)", 0)}
      {blob(560, 1180, "rgba(39,224,138,0.30)", 0.4)}
      {blob(620, -120, "rgba(167,99,255,0.34)", 0.7)}
      {/* faint grid */}
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "90px 90px",
          maskImage: "radial-gradient(circle at 50% 45%, rgba(0,0,0,0.8), transparent 75%)",
        }}
      />
      <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 42%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.55) 100%)" }} />
      <Grain />
    </AbsoluteFill>
  );
};

const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const pct = interpolate(frame, [0, durationInFrames - 1], [0, 100], { extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", top: 96, left: 80, right: 80, height: 10, borderRadius: 10, background: "rgba(255,255,255,0.16)", overflow: "hidden" }}>
      <div style={{ width: `${pct}%`, height: "100%", borderRadius: 10, background: `linear-gradient(90deg, ${GREEN}, ${BLUE})` }} />
    </div>
  );
};

// ---------- reusable graphic units ----------
const Chip: React.FC<{ label: string; emoji: string; color: string; start: number; x: number; y: number; rot?: number }> = ({ label, emoji, color, start, x, y, rot = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = pop(frame, fps, start, { from: 0.3, ty: 36, damping: 10 });
  const bob = Math.sin((frame - start) / 11) * 7;
  return (
    <div
      style={{
        position: "absolute", left: x, top: y + bob,
        transform: `translateY(${p.ty}px) scale(${p.scale}) rotate(${rot}deg)`, opacity: p.opacity,
        display: "flex", alignItems: "center", gap: 14,
        padding: "16px 28px", borderRadius: 999,
        background: "rgba(255,255,255,0.96)", color: INK,
        fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 38,
        boxShadow: `0 18px 40px rgba(0,0,0,0.45), 0 0 0 4px ${color}`,
      }}
    >
      <span style={{ fontSize: 40 }}>{emoji}</span>{label}
    </div>
  );
};

const ScribbleCircle: React.FC<{ start: number; x: number; y: number; w: number; h: number; color: string }> = ({ start, x, y, w, h, color }) => {
  const frame = useCurrentFrame();
  const prog = interpolate(frame - start, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  // slightly wobbly hand-drawn ellipse, overshooting closed
  const d = `M ${w * 0.5} ${h * 0.06} C ${w * 0.95} ${h * 0.0}, ${w * 1.04} ${h * 0.72}, ${w * 0.52} ${h * 0.95} C ${w * 0.04} ${h * 1.06}, ${w * -0.06} ${h * 0.28}, ${w * 0.5} ${h * 0.06}`;
  return (
    <svg style={{ position: "absolute", left: x, top: y, overflow: "visible" }} width={w} height={h}>
      <path d={d} fill="none" stroke={color} strokeWidth={12} strokeLinecap="round" pathLength={100} strokeDasharray={100} strokeDashoffset={100 * (1 - prog)} />
    </svg>
  );
};

const Arrow: React.FC<{ start: number; x: number; y: number; color: string; flip?: boolean }> = ({ start, x, y, color, flip }) => {
  const frame = useCurrentFrame();
  const prog = interpolate(frame - start, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const head = interpolate(frame - start, [10, 16], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <svg style={{ position: "absolute", left: x, top: y, overflow: "visible", transform: flip ? "scaleX(-1)" : "none" }} width={220} height={200}>
      <path d="M 20 10 C 120 20, 180 90, 150 170" fill="none" stroke={color} strokeWidth={12} strokeLinecap="round" pathLength={100} strokeDasharray={100} strokeDashoffset={100 * (1 - prog)} />
      <path d={`M 150 170 L ${150 - 38 * head} ${170 - 14 * head} M 150 170 L ${150 - 10 * head} ${170 - 44 * head}`} fill="none" stroke={color} strokeWidth={12} strokeLinecap="round" opacity={head} />
    </svg>
  );
};

const Burst: React.FC<{ start: number; cx: number; cy: number; n?: number; spread?: number }> = ({ start, cx, cy, n = 22, spread = 360 }) => {
  const frame = useCurrentFrame();
  const local = frame - start;
  if (local < 0) return null;
  const cols = [RED, GREEN, YELLOW, BLUE, "#A763FF"];
  return (
    <>
      {Array.from({ length: n }).map((_, i) => {
        const ang = (random(`a${i}`) - 0.5) * (spread / 180) * Math.PI + (i / n) * Math.PI * 2;
        const dist = interpolate(local, [0, 24], [0, 260 + random(`d${i}`) * 260], { extrapolateRight: "clamp" });
        const op = interpolate(local, [0, 6, 26], [0, 1, 0], { extrapolateRight: "clamp" });
        const sz = 14 + random(`s${i}`) * 18;
        return (
          <div key={i} style={{ position: "absolute", left: cx + Math.cos(ang) * dist, top: cy + Math.sin(ang) * dist, width: sz, height: sz * 0.5, borderRadius: 3, background: cols[i % cols.length], opacity: op, transform: `rotate(${ang + local / 4}rad)` }} />
        );
      })}
    </>
  );
};

const KineticHook: React.FC<{ words: { t: string; c?: string }[]; step?: number; size?: number; top: number }> = ({ words, step = 7, size = 118, top }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ position: "absolute", top, left: 70, right: 70, textAlign: "center", fontFamily: montserrat.fontFamily, fontWeight: 800, fontSize: size, lineHeight: 1.02, letterSpacing: "-0.02em", textTransform: "uppercase", color: "#fff" }}>
      {words.map((w, i) => {
        const p = pop(frame, fps, i * step, { from: 0.4, ty: 18, damping: 11 });
        return (
          <span key={i} style={{ display: "inline-block", margin: "0 14px", color: w.c ?? "#fff", transform: `translateY(${p.ty}px) scale(${p.scale})`, opacity: p.opacity, textShadow: "0 6px 26px rgba(0,0,0,0.55)" }}>
            {w.t}
          </span>
        );
      })}
    </div>
  );
};

// A phone mockup that slides+rotates in.
const PhoneMock: React.FC<{ start: number; x: number; y: number }> = ({ start, x, y }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = pop(frame, fps, start, { from: 0.7, tx: 420, rot: 14, damping: 13, stiffness: 130 });
  const fill = interpolate(frame - start, [10, 34], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", left: x, top: y, transform: `translateX(${p.tx}px) rotate(${6 - p.rot}deg) scale(${p.scale})`, opacity: p.opacity }}>
      <div style={{ width: 300, height: 620, borderRadius: 52, background: "#04060A", padding: 14, boxShadow: "0 40px 90px rgba(0,0,0,0.6), 0 0 0 3px rgba(255,255,255,0.10)" }}>
        <div style={{ width: "100%", height: "100%", borderRadius: 40, background: "linear-gradient(165deg,#1A2238,#0C1020)", overflow: "hidden", position: "relative" }}>
          <div style={{ position: "absolute", top: 18, left: "50%", transform: "translateX(-50%)", width: 110, height: 26, borderRadius: 20, background: "#000" }} />
          <div style={{ padding: "70px 22px 0" }}>
            <div style={{ height: 18, width: "55%", borderRadius: 6, background: "rgba(255,255,255,0.7)" }} />
            <div style={{ height: 12, width: "80%", borderRadius: 6, background: "rgba(255,255,255,0.28)", marginTop: 14 }} />
            <div style={{ marginTop: 26, height: 150, borderRadius: 18, background: `linear-gradient(120deg, ${BLUE}, #A763FF)`, opacity: 0.9, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 64 }}>⚡</div>
            <div style={{ marginTop: 22, height: 54, width: `${fill * 100}%`, borderRadius: 14, background: GREEN }} />
            <div style={{ marginTop: 18, height: 46, borderRadius: 14, background: "rgba(255,255,255,0.14)" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

// An app/builder window with tasks checking off + a LIVE badge.
const BuilderWindow: React.FC<{ start: number }> = ({ start }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = pop(frame, fps, start, { from: 0.7, ty: 60, damping: 13, stiffness: 140 });
  const tasks = [
    { label: "Spin up database", at: start + 8 },
    { label: "Wire up auth", at: start + 18 },
    { label: "Ship to production", at: start + 28 },
  ];
  const progress = interpolate(frame, [start + 6, start + 34], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const live = pop(frame, fps, start + 34, { from: 0.2, damping: 9, stiffness: 200 });
  return (
    <div style={{ position: "absolute", left: 110, right: 110, top: 760, transform: `translateY(${p.ty}px) scale(${p.scale})`, opacity: p.opacity }}>
      <div style={{ borderRadius: 30, background: "#fff", boxShadow: "0 40px 90px rgba(0,0,0,0.55)", overflow: "hidden", fontFamily: inter.fontFamily }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "22px 28px", background: "#F3F4F8", borderBottom: "2px solid #E6E8EF" }}>
          <div style={{ width: 18, height: 18, borderRadius: 9, background: "#FF5F57" }} />
          <div style={{ width: 18, height: 18, borderRadius: 9, background: "#FEBC2E" }} />
          <div style={{ width: 18, height: 18, borderRadius: 9, background: "#28C840" }} />
          <div style={{ marginLeft: 16, color: "#8A90A2", fontWeight: 700, fontSize: 30 }}>build.new</div>
        </div>
        <div style={{ padding: 34 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "20px 24px", borderRadius: 16, background: "#F1F3FA", color: "#3A4054", fontWeight: 700, fontSize: 34 }}>
            <span style={{ fontSize: 38 }}>🤖</span> “build me a SaaS app”
          </div>
          {tasks.map((t, i) => {
            const done = frame >= t.at;
            const tp = pop(frame, fps, t.at, { from: 0.5, damping: 9, stiffness: 220 });
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 22, fontSize: 36, fontWeight: 700, color: done ? INK : "#AEB3C2" }}>
                <div style={{ width: 46, height: 46, borderRadius: 12, background: done ? GREEN : "#E6E8EF", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 30, transform: `scale(${done ? tp.scale : 1})` }}>{done ? "✓" : ""}</div>
                {t.label}
              </div>
            );
          })}
          <div style={{ marginTop: 30, height: 18, borderRadius: 10, background: "#E6E8EF", overflow: "hidden" }}>
            <div style={{ width: `${progress * 100}%`, height: "100%", background: `linear-gradient(90deg, ${BLUE}, ${GREEN})` }} />
          </div>
        </div>
      </div>
      {/* LIVE badge */}
      <div style={{ position: "absolute", right: -26, top: -34, transform: `scale(${live.scale}) rotate(-8deg)`, opacity: live.opacity, padding: "16px 30px", borderRadius: 18, background: GREEN, color: INK, fontFamily: montserrat.fontFamily, fontWeight: 900, fontSize: 40, boxShadow: "0 16px 36px rgba(0,0,0,0.4)" }}>● LIVE</div>
    </div>
  );
};

// A social-proof comment/notification card.
const NotifCard: React.FC<{ start: number }> = ({ start }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = pop(frame, fps, start, { from: 0.5, ty: 70, rot: -6, damping: 10, stiffness: 180 });
  return (
    <div style={{ position: "absolute", left: 150, right: 150, top: 980, transform: `translateY(${p.ty}px) scale(${p.scale}) rotate(${-3 + p.rot}deg)`, opacity: p.opacity }}>
      <div style={{ display: "flex", gap: 22, padding: 34, borderRadius: 28, background: "#fff", boxShadow: "0 36px 80px rgba(0,0,0,0.5)", fontFamily: inter.fontFamily }}>
        <div style={{ width: 92, height: 92, borderRadius: "50%", background: `linear-gradient(135deg, ${BLUE}, #A763FF)`, flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 800, fontSize: 38, color: INK }}>@indiefounder</div>
          <div style={{ fontWeight: 600, fontSize: 38, color: "#3A4054", marginTop: 8 }}>🔥 wait… this is actually insane</div>
          <div style={{ marginTop: 16, display: "flex", gap: 26, color: "#9097A8", fontWeight: 700, fontSize: 32 }}>
            <span>♥ 2.4k</span><span>↩ reply</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const CTAButton: React.FC<{ start: number }> = ({ start }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = pop(frame, fps, start, { from: 0.4, ty: 50, damping: 11, stiffness: 180 });
  const pulse = 1 + Math.sin((frame - start) / 6) * 0.03;
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 1180, display: "flex", flexDirection: "column", alignItems: "center", gap: 30, transform: `translateY(${p.ty}px) scale(${p.scale})`, opacity: p.opacity }}>
      <div style={{ transform: `scale(${pulse})`, padding: "34px 64px", borderRadius: 999, background: `linear-gradient(90deg, ${GREEN}, ${BLUE})`, color: INK, fontFamily: montserrat.fontFamily, fontWeight: 900, fontSize: 64, boxShadow: `0 24px 60px rgba(39,224,138,0.45)`, display: "flex", alignItems: "center", gap: 18 }}>
        💬 Comment “BUILD”
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "18px 36px", borderRadius: 999, background: "rgba(255,255,255,0.12)", border: "3px solid rgba(255,255,255,0.5)", color: "#fff", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 40 }}>
        ＋ Follow for more
      </div>
    </div>
  );
};

// ---------- main ----------
const B1_START = 0, B2_START = 38, B3_START = 80, B4_START = 110;
const IMPACTS = [0, B2_START, B3_START, B4_START];

export const GregStyleSampleV2: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // global camera: slow push-in + zoom-punch + shake + flash at each beat impact
  let punch = 0, shakeX = 0, shakeY = 0, flash = 0;
  for (const im of IMPACTS) {
    const d = frame - im;
    if (d >= 0 && d <= 8) {
      const k = Math.max(0, 1 - d / 8);
      punch = Math.max(punch, k * 0.07);
      shakeX += Math.sin(d * 3.1) * k * 7;
      shakeY += Math.cos(d * 2.7) * k * 6;
    }
    if (d >= 0 && d <= 5) flash = Math.max(flash, interpolate(d, [0, 1, 5], [0, 0.18, 0], { extrapolateRight: "clamp" }));
  }
  const pushIn = interpolate(frame, [0, durationInFrames], [1, 1.05]);
  const camScale = pushIn + punch;

  return (
    <AbsoluteFill style={{ backgroundColor: INK }}>
      <Background />
      <AbsoluteFill style={{ transform: `translate(${shakeX}px, ${shakeY}px) scale(${camScale})` }}>
        {/* BEAT 1 — hook + phone mockup + scribble */}
        <Sequence from={B1_START} durationInFrames={B2_START + 6 - B1_START}>
          <KineticHook top={360} size={120} words={[{ t: "I" }, { t: "BUILT" }, { t: "AN" }, { t: "APP" }, { t: "IN" }, { t: "7", c: YELLOW }, { t: "MINUTES", c: YELLOW }]} />
          <ScribbleCircle start={20} x={612} y={500} w={360} h={150} color={YELLOW} />
          <PhoneMock start={6} x={690} y={760} />
          <Chip start={16} x={120} y={820} label="no code" emoji="⚡" color={BLUE} rot={-5} />
          <Chip start={24} x={150} y={1180} label="AI did it" emoji="🤖" color={GREEN} rot={4} />
        </Sequence>

        {/* BEAT 2 — builder window doing the work */}
        <Sequence from={B2_START} durationInFrames={B3_START + 4 - B2_START}>
          <KineticHook top={300} size={104} words={[{ t: "WATCH" }, { t: "IT" }, { t: "BUILD" }, { t: "ITSELF", c: GREEN }]} />
          <BuilderWindow start={0} />
          <Chip start={6} x={120} y={560} label="0 → live" emoji="🚀" color={GREEN} rot={-6} />
        </Sequence>

        {/* BEAT 3 — social proof + arrow + emoji burst */}
        <Sequence from={B3_START} durationInFrames={B4_START + 6 - B3_START}>
          <KineticHook top={360} size={108} words={[{ t: "THE" }, { t: "INTERNET" }, { t: "LOST", c: RED }, { t: "IT", c: RED }]} />
          <NotifCard start={4} />
          <Arrow start={12} x={150} y={820} color={YELLOW} />
          <Burst start={6} cx={540} cy={1080} n={20} />
        </Sequence>

        {/* BEAT 4 — CTA + confetti */}
        <Sequence from={B4_START} durationInFrames={durationInFrames - B4_START}>
          <KineticHook top={420} size={116} words={[{ t: "YOUR" }, { t: "TURN", c: GREEN }]} />
          <CTAButton start={4} />
          <Burst start={10} cx={540} cy={1260} n={26} spread={300} />
        </Sequence>
      </AbsoluteFill>

      {/* global overlays (outside camera so they stay crisp/edge-anchored) */}
      <ProgressBar />
      <AbsoluteFill style={{ backgroundColor: "#fff", opacity: flash }} />
    </AbsoluteFill>
  );
};
