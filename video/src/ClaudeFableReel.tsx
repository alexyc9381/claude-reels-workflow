import React from "react";
import { AbsoluteFill, Audio, Easing, Img, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { fraunces, frauncesItalic, inter } from "./fonts";
import wordsData from "./data/words_fable.json";

/** ClaudeFableReel v4 "The Lightcraft" — nightshift-caliber cohesive world. A persistent glowing CORE = the token meter (redlines in hook, dims to a cool ember at the -90% payoff); a throttle lever open loop planted frame-0; per-tip instruments dock on a console rail. Primary custom visuals, no doc dumps. */
const CREAM = "#ECE9E2", INK = "#1A1813", SLATE = "#3A5C84", CLAY = "#D2724E", AMBER = "#CF9544", GOLD = "#E7B24C", GREEN = "#3F9E74", MUTE = "#9A968B", RED = "#C44A3A";
const FPS = 30; const fr = (s: number) => s * FPS; const CX = 540;
const mono = "ui-monospace, 'SF Mono', Menlo, monospace";
const HK = fr(7.46), L1 = fr(7.46), L2 = fr(13.68), L3 = fr(21.88), T4 = fr(28.82), CTAf = fr(40.98);
const eOut = (f: number, sF: number, d = 10) => interpolate(f, [sF, sF + d], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
const ramp = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const over = (f: number, sF: number, d = 12) => interpolate(f, [sF, sF + d * 0.5, sF + d], [0, 1.1, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
const grad = (a: string, b: string) => `linear-gradient(158deg, ${a} 0%, ${b} 100%)`;
const mix = (a: number[], b: number[], t: number) => `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * t)).join(",")})`;
const CLAUDE_PATH = "m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z";
const SH = "0 2px 4px rgba(10,14,26,0.3), 0 20px 44px rgba(10,14,26,0.44)";
const IMSH = "0 14px 30px rgba(8,12,24,0.4), 0 4px 10px rgba(8,12,24,0.28)";
const Sheen: React.FC<{ r: number | string; o?: number }> = ({ r, o = 0.3 }) => (<div style={{ position: "absolute", inset: 0, borderRadius: r, background: `linear-gradient(125deg, rgba(255,255,255,${o}) 0%, rgba(255,255,255,0) 32%)`, pointerEvents: "none" }} />);
const ClaudeMark: React.FC<{ size: number; glow?: number }> = ({ size, glow = 0.4 }) => (<div style={{ position: "relative", width: size, height: size, borderRadius: size * 0.28, background: grad("#E08A66", "#C5603C"), boxShadow: `${SH}, 0 0 ${Math.round(size * 0.4)}px rgba(210,114,78,${glow})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><svg viewBox="0 0 24 24" width={size * 0.58} height={size * 0.58}><path fill="#F6EFE6" d={CLAUDE_PATH} /></svg><Sheen r={size * 0.28} /></div>);

// ===== THE CORE — the persistent engine = token meter. heat 1=redline -> 0=cool ember =====
const Core: React.FC<{ cx: number; cy: number; size: number; heat: number; lf: number }> = ({ cx, cy, size, heat, lf }) => {
  const hot = mix([63, 158, 116], [230, 120, 60], heat); // green-cool -> orange-hot
  const glow = mix([90, 120, 200], [232, 112, 48], heat);
  const pulse = 1 + Math.sin(lf / (heat > 0.7 ? 3 : 6)) * (0.03 + heat * 0.05);
  const rays = 20;
  return (<div style={{ position: "absolute", left: cx, top: cy, transform: `translate(-50%,-50%) scale(${pulse})` }}>
    <div style={{ position: "absolute", left: -size * 0.95, top: -size * 0.95, width: size * 1.9, height: size * 1.9, borderRadius: "50%", background: `radial-gradient(circle, rgba(${glow.slice(4, -1)},${0.42 + heat * 0.34}) 0%, transparent 62%)` }} />
    <svg width={size * 1.7} height={size * 1.7} viewBox="0 0 200 200" style={{ position: "absolute", left: -size * 0.85, top: -size * 0.85 }}>
      {Array.from({ length: rays }).map((_, i) => { const a = (i / rays) * Math.PI * 2 + lf * 0.006; const r1 = 66, r2 = 66 + (18 + heat * 40) * (0.55 + 0.45 * Math.sin(lf / 4 + i * 1.7)); return <line key={i} x1={100 + Math.cos(a) * r1} y1={100 + Math.sin(a) * r1} x2={100 + Math.cos(a) * r2} y2={100 + Math.sin(a) * r2} stroke={hot} strokeWidth={3.4} strokeLinecap="round" opacity={0.35 + heat * 0.4} />; })}
      <circle cx={100} cy={100} r={64} fill="none" stroke={hot} strokeWidth={2} opacity={0.5} />
    </svg>
    <div style={{ position: "absolute", left: -size / 2, top: -size / 2, width: size, height: size, borderRadius: "50%", background: `radial-gradient(circle at 42% 38%, ${mix([240, 220, 180], [255, 200, 120], heat)}, ${hot})`, boxShadow: `0 0 ${size * 0.4}px ${hot}, inset 0 0 ${size * 0.2}px rgba(255,255,255,0.4)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg viewBox="0 0 24 24" width={size * 0.5} height={size * 0.5} style={{ filter: "drop-shadow(0 2px 4px rgba(120,50,20,0.5))" }}><path fill="#FBF3E4" d={CLAUDE_PATH} /></svg>
    </div>
  </div>); };
// gauge ring around the core (the token gauge). val 0..1 -> needle in red zone
const Gauge: React.FC<{ cx: number; cy: number; r: number; val: number; heat: number }> = ({ cx, cy, r, val, heat }) => { const a0 = -220, a1 = 40; const na = interpolate(val, [0, 1], [a0, a1]);
  return (<svg width={r * 2.6} height={r * 2.6} viewBox="0 0 260 260" style={{ position: "absolute", left: cx - r * 1.3, top: cy - r * 1.3 }}>
    <path d={`M ${130 + Math.cos(a0 * Math.PI / 180) * 118} ${130 + Math.sin(a0 * Math.PI / 180) * 118} A 118 118 0 1 1 ${130 + Math.cos(a1 * Math.PI / 180) * 118} ${130 + Math.sin(a1 * Math.PI / 180) * 118}`} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth={10} strokeLinecap="round" />
    <path d={`M ${130 + Math.cos((a1 - 55) * Math.PI / 180) * 118} ${130 + Math.sin((a1 - 55) * Math.PI / 180) * 118} A 118 118 0 0 1 ${130 + Math.cos(a1 * Math.PI / 180) * 118} ${130 + Math.sin(a1 * Math.PI / 180) * 118}`} fill="none" stroke={RED} strokeWidth={10} strokeLinecap="round" opacity={0.5 + heat * 0.4} />
    <line x1={130} y1={130} x2={130 + Math.cos(na * Math.PI / 180) * 108} y2={130 + Math.sin(na * Math.PI / 180) * 108} stroke={heat > 0.5 ? RED : GREEN} strokeWidth={5} strokeLinecap="round" style={{ filter: `drop-shadow(0 0 8px ${heat > 0.5 ? RED : GREEN})` }} />
    <circle cx={130} cy={130} r={9} fill="#0E1524" stroke={heat > 0.5 ? RED : GREEN} strokeWidth={2.5} />
  </svg>); };
// the throttle lever = open loop. pos 1=forward/jammed, 0=pulled back; locked hides the -90%
const Throttle: React.FC<{ cx: number; cy: number; pos: number; reveal: number; lf: number }> = ({ cx, cy, pos, reveal, lf }) => {
  const knobY = interpolate(pos, [0, 1], [130, 8]); const hot = pos > 0.5;
  return (<div style={{ position: "absolute", left: cx, top: cy, transform: "translate(-50%,-50%)" }}>
    <div style={{ position: "absolute", left: -22, top: 0, width: 44, height: 150, borderRadius: 22, background: "linear-gradient(#1A2338,#0E1524)", border: "1px solid rgba(130,160,210,0.2)", boxShadow: "inset 0 4px 10px rgba(0,0,0,0.5)" }} />
    <div style={{ position: "absolute", left: -18, top: knobY, width: 36, height: 40, borderRadius: 10, background: hot ? grad("#E08A66", "#B4512E") : grad("#4FB98A", "#2E9268"), boxShadow: `${IMSH}, 0 0 16px ${hot ? "rgba(210,114,78,0.6)" : "rgba(63,158,116,0.7)"}` }} />
    {/* -90% tag */}
    <div style={{ position: "absolute", left: 40, top: 46, padding: "8px 16px", borderRadius: 10, background: reveal > 0.5 ? "rgba(63,158,116,0.18)" : "rgba(255,255,255,0.06)", border: `2px solid ${reveal > 0.5 ? GREEN : "rgba(63,158,116,0.5)"}`, whiteSpace: "nowrap" }}>
      <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 40, color: reveal > 0.5 ? GREEN : "rgba(120,200,160,0.7)", filter: `blur(${(1 - reveal) * 8}px)` }}>-90%</span>
    </div>
    <svg width={30} height={30} viewBox="0 0 24 24" style={{ position: "absolute", left: 6, top: 2 }}><path d={reveal > 0.5 ? "M8 10 V7 a4 4 0 0 1 8 0" : "M8 10 V7 a4 4 0 0 1 8 0 V10"} fill="none" stroke={reveal > 0.5 ? GREEN : AMBER} strokeWidth={2} /><rect x={6} y={10} width={12} height={8} rx={2} fill={reveal > 0.5 ? GREEN : AMBER} /></svg>
  </div>); };
const Spark: React.FC<{ lf: number; from: number[]; to: number[]; at: number; dur?: number }> = ({ lf, from, to, at, dur = 14 }) => { const t = ramp(lf, at, at + dur); if (t <= 0 || t >= 1) return null; const x = interpolate(t, [0, 1], [from[0], to[0]]); const y = interpolate(t, [0, 1], [from[1], to[1]]); const tx = interpolate(Math.max(0, t - 0.16), [0, 1], [from[0], to[0]]); const ty = interpolate(Math.max(0, t - 0.16), [0, 1], [from[1], to[1]]);
  return (<svg width={1080} height={1920} style={{ position: "absolute", inset: 0, zIndex: 20 }}><line x1={tx} y1={ty} x2={x} y2={y} stroke={CLAY} strokeWidth={5} strokeLinecap="round" opacity={0.9} /><circle cx={x} cy={y} r={7} fill={GOLD} /><circle cx={x} cy={y} r={14} fill="rgba(231,178,76,0.4)" /></svg>); };

// ===== global CraftWorld: cream + navy panel (color arc) + horizon starfield + rail + CORE + throttle =====
const Bloom: React.FC<{ cx: number; cy: number; w: number; color: string; lf: number; base?: number }> = ({ cx, cy, w, color, lf, base = 0.5 }) => (<div style={{ position: "absolute", left: cx - w / 2, top: cy - w / 2, width: w, height: w, borderRadius: "50%", background: `radial-gradient(circle at 50% 46%, ${color} 0%, transparent 62%)`, opacity: base + Math.sin(lf / 9) * 0.14, pointerEvents: "none" }} />);
// ===== shared premium-craft helpers (off-center perspective, extruded thickness, travelling specular, physics sparks) =====
const seed = (n: number) => { const x = Math.sin(n * 91.37) * 43758.5453; return x - Math.floor(x); };
const shakeXY = (lf: number, at: number, amp: number, dur = 8): [number, number] => { const t = lf - at; if (t < 0 || t > dur) return [0, 0]; const d = amp * (1 - t / dur); return [Math.sin(t * 7.3) * d, Math.cos(t * 9.1) * d]; };
const NAVYSH = "0 8px 24px rgba(16,22,40,0.55), 0 22px 60px rgba(16,22,40,0.45), 0 44px 120px rgba(207,114,78,0.16)";
const Plane: React.FC<{ lf: number; cx?: number; cy?: number; shakeAt?: number; shakeAmp?: number; children: React.ReactNode }> = ({ lf, cx = CX - 34, cy = 686, shakeAt = -999, shakeAmp = 0, children }) => {
  const [sx, sy] = shakeXY(lf, shakeAt, shakeAmp); const idle = Math.sin(lf / 24) * 0.6; const breath = 1 + Math.sin(lf / 40) * 0.008;
  return (<div style={{ position: "absolute", left: cx + sx, top: cy + sy, width: 0, height: 0, transform: `perspective(1400px) rotateX(9deg) rotateZ(${-3 + idle}deg) scale(${breath})`, transformStyle: "preserve-3d" }}>{children}</div>); };
const Spec: React.FC<{ lf: number; size: number; pop?: number }> = ({ lf, size, pop = 0 }) => (
  <div style={{ position: "absolute", left: -size * 0.18 + Math.sin(lf / 16) * size * 0.14, top: -size * 0.22 + Math.cos(lf / 20) * size * 0.1, width: size * 0.5, height: size * 0.5, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 65%)", opacity: 0.26 + pop * 0.6, mixBlendMode: "screen", pointerEvents: "none" }} />);
const Sparks: React.FC<{ lf: number; at: number; cx: number; cy: number; color: string; n?: number }> = ({ lf, at, cx, cy, color, n = 11 }) => { const t = lf - at; if (t < 0 || t > 42) return null;
  return (<>{Array.from({ length: n }).map((_, i) => { const ang = (i / n) * Math.PI * 2 + seed(i) * 0.8; const land = i % 4 === 0; const vx = Math.cos(ang) * (5 + seed(i + 3) * 6); const vy = -Math.abs(Math.sin(ang)) * (6 + seed(i + 9) * 5) - (land ? 0 : 2); const py = cy + vy * t + 0.16 * t * t; const grounded = land && py > cy + 130; const yy = grounded ? cy + 130 : py; const life = grounded ? interpolate(t, [20, 42], [1, 0]) : interpolate(t, [0, 28], [1, 0]); const rr = 6 - t * 0.08; if (life <= 0 || rr <= 1) return null;
    return <div key={i} style={{ position: "absolute", left: cx + vx * t - rr, top: yy - rr, width: rr * 2, height: rr * 2, borderRadius: 3, background: grad("#FFE39A", color), boxShadow: `0 0 ${rr}px ${color}`, opacity: life, transform: `rotate(${t * 20}deg)` }} />; })}</>); };

const CoreY = 720;
const CraftWorld: React.FC = () => { const f = useCurrentFrame(); const { durationInFrames } = useVideoConfig();
  const heat = interpolate(f, [0, HK - 8, HK, T4 + 4, T4 + 42, CTAf], [1, 1, 0.5, 0.5, 0.06, 0.06], { extrapolateRight: "clamp" });
  const coreSize = interpolate(f, [0, HK - 8, HK, T4 + 4, T4 + 42], [320, 320, 200, 200, 116], { extrapolateRight: "clamp" });
  const gVal = interpolate(f, [0, HK - 10, T4 + 6, T4 + 42], [0.4, 0.96, 0.96, 0.08], { extrapolateRight: "clamp" });
  const thrPos = interpolate(f, [T4 + 8, T4 + 40], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const reveal = interpolate(f, [T4 + 22, T4 + 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const out = ramp(f, CTAf - 0.3 * FPS, CTAf + 0.3 * FPS); const drift = Math.sin(f / 120) * 6; const streak = (f % 60) / 60;
  const hotBloom = interpolate(f, [0, HK, HK + 30], [1, 1, 0], { extrapolateRight: "clamp" });
  const coolBloom = interpolate(f, [T4, T4 + 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const tips = interpolate(f, [HK - 4, HK + 8, T4 - 8, T4 + 4], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (<AbsoluteFill style={{ background: "radial-gradient(120% 90% at 50% 8%, #F3F1EB 0%, #ECE9E2 46%, #E4E0D6 100%)" }}>
    <div style={{ position: "absolute", inset: -40, opacity: 0.4, backgroundImage: "linear-gradient(rgba(58,92,132,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(58,92,132,0.05) 1px, transparent 1px)", backgroundSize: "62px 62px" }} />
    <div style={{ position: "absolute", left: 36, right: 36, top: 284, height: 820, borderRadius: 52, background: "linear-gradient(158deg, #2A3752 0%, #1A2440 54%, #101828 100%)", boxShadow: "0 44px 96px rgba(12,18,36,0.44), inset 0 2px 0 rgba(255,255,255,0.08)", opacity: 1 - out, overflow: "hidden" }}>
      {/* speed-streak starfield */}
      {Array.from({ length: 30 }).map((_, i) => { const y = (i * 79 + 40) % 780 + 20; const sp = 0.4 + (i % 5) * 0.16; const x = ((1 - ((streak * sp * 1400 + i * 137) % 1400) / 1400)) * 1080 - 20; const len = 8 + heat * 40 * sp; return <div key={i} style={{ position: "absolute", left: x, top: y, width: len, height: 2, borderRadius: 2, background: "rgba(150,180,230,0.4)", opacity: (0.25 + heat * 0.3) * (1 - tips * 0.5) }} />; })}
      {/* color arc blooms */}
      <div style={{ position: "absolute", left: "50%", top: 480, width: 1000, height: 700, transform: "translateX(-50%)", background: "radial-gradient(circle, rgba(232,112,48,0.28), transparent 62%)", opacity: hotBloom * 0.9 }} />
      <div style={{ position: "absolute", left: "50%", top: 480, width: 1000, height: 700, transform: "translateX(-50%)", background: "radial-gradient(circle, rgba(90,150,230,0.2), rgba(231,178,76,0.14) 40%, transparent 70%)", opacity: coolBloom }} />
      {/* console rail */}
      <svg width={1008} height={820} style={{ position: "absolute", inset: 0 }}><path d="M 120 760 Q 504 700 888 760" fill="none" stroke="rgba(130,160,210,0.28)" strokeWidth={3} /></svg>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(130,160,210,0.06) 1px, transparent 1px)", backgroundSize: "34px 34px", transform: `translateY(${drift}px)`, opacity: 0.5 }} />
      {/* 3-point stage light: cool key upper-left + corner vignette + dust motes */}
      <div style={{ position: "absolute", left: -120, top: -80, width: 760, height: 760, background: "radial-gradient(circle at 22% 22%, rgba(238,246,255,0.08), transparent 58%)", filter: "blur(30px)" }} />
      <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 220px rgba(8,12,26,0.5)", borderRadius: 52 }} />
      {Array.from({ length: 8 }).map((_, i) => { const dy = (i * 97 + 30) % 720 + 30; const dx = (i * 173 + 60) % 950 + 24; return <div key={`d${i}`} style={{ position: "absolute", left: dx, top: dy + Math.sin(f / 40 + i) * 12, width: 3, height: 3, borderRadius: "50%", background: "rgba(220,230,255,0.55)", opacity: 0.16 }} />; })}
    </div>
    {/* the CORE + gauge (persistent, transforms) — dim way down during the middle tips so each tip hero is the one clear thing */}
    <div style={{ opacity: (1 - out) * (1 - tips) }}><Gauge cx={CX} cy={CoreY} r={coreSize * 0.62} val={gVal} heat={heat} /></div>
    <div style={{ opacity: (1 - out) * (1 - tips * 0.72) }}><Core cx={CX} cy={CoreY} size={coreSize} heat={heat} lf={f} /></div>
  </AbsoluteFill>); };

const Scene: React.FC<{ s: number; e: number; children: React.ReactNode }> = ({ s, e, children }) => { const frame = useCurrentFrame(); const local = frame - fr(s); const lenF = fr(e - s); if (local < 0 || local > lenF) return null; const inF = s <= 0 ? 1 : eOut(frame, fr(s), 6); const op = Math.min(inF, 1 - eOut(frame, fr(e - 0.16), 6)); return <AbsoluteFill style={{ opacity: op }}>{children}</AbsoluteFill>; };

// instrument that docks on the rail (upper-center focus)
const Instrument: React.FC<{ lf: number; children: React.ReactNode; y?: number }> = ({ lf, children, y = 500 }) => { const e = over(lf, 4, 12); return (<div style={{ position: "absolute", left: CX, top: y, transform: `translate(-50%,-50%) scale(${0.86 + Math.min(e, 1) * 0.14})`, opacity: e }}>{children}</div>); };
const Tag: React.FC<{ text: string; color: string; x: number; y: number; lf: number; at: number }> = ({ text, color, x, y, lf, at }) => { const e = over(lf, at, 10); if (e <= 0) return null; return <div style={{ position: "absolute", left: x, top: y, transform: `translate(-50%,-50%) scale(${e})`, padding: "6px 16px", borderRadius: 9, background: `${color}22`, border: `2px solid ${color}`, color: "#fff", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 24, whiteSpace: "nowrap", boxShadow: IMSH }}>{text}</div>; };

// Anthropic's real "Introducing Claude Fable 5" release video, in a player frame (a supplement)
const VideoCard: React.FC<{ w: number; lf: number }> = ({ w, lf }) => { const vh = w * 720 / 1280; const play = Math.max(0, Math.sin(lf / 8));
  return (<div style={{ width: w, borderRadius: 18, overflow: "hidden", background: "#0E1524", boxShadow: `${SH}, 0 0 44px rgba(210,114,78,0.22)`, position: "relative" }}>
    <div style={{ position: "relative", width: w, height: vh }}>
      <Img src={staticFile("fable/fable_video.jpg")} style={{ width: w, height: vh, display: "block" }} />
      <div style={{ position: "absolute", left: "50%", top: "50%", transform: `translate(-50%,-50%) scale(${1 + play * 0.06})`, width: 104, height: 104, borderRadius: "50%", background: "rgba(20,26,45,0.66)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 24px rgba(0,0,0,0.45)" }}>
        <div style={{ width: 0, height: 0, borderTop: "21px solid transparent", borderBottom: "21px solid transparent", borderLeft: "34px solid #fff", marginLeft: 9 }} />
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 7, background: "rgba(255,255,255,0.25)" }}><div style={{ height: "100%", width: `${18 + (lf % 120) / 120 * 40}%`, background: "#FF3B30" }} /></div>
    </div>
    <div style={{ padding: "13px 20px", display: "flex", alignItems: "center", gap: 12, background: "#141C2A" }}>
      <div style={{ width: 32, height: 32, borderRadius: "50%", background: grad("#E08A66", "#C5603C"), display: "flex", alignItems: "center", justifyContent: "center" }}><svg viewBox="0 0 24 24" width={17} height={17}><path fill="#F6EFE6" d={CLAUDE_PATH} /></svg></div>
      <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 23, color: "#E9E2D4" }}>Introducing Claude Fable 5</span>
      <span style={{ marginLeft: "auto", fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 18, color: "#8a94a8" }}>Anthropic</span>
    </div>
  </div>);
};

// ===== S0 HOOK — the redlining core (world does the work) + header + open loop already planted =====
const HookScene: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s); const hOut = eOut(f, HK - 7, 7);
  const embers = Array.from({ length: 16 }, (_, i) => { const t = ((lf * 0.03) + i / 16) % 1; const a = i * 2.3; return { x: CX + Math.cos(a) * (60 + t * 200), y: CoreY + Math.sin(a) * (50 + t * 150) - t * 60, o: (1 - t) * 0.9, r: 8 - t * 5 }; });
  return (<AbsoluteFill>
    <div style={{ position: "absolute", top: 326, left: 40, right: 40, textAlign: "center", opacity: (1 - hOut) * ramp(lf, 54, 72), transform: `translateY(${-hOut * 12}px)`, zIndex: 40 }}>
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 25, letterSpacing: "0.13em", color: "#93A6C4", marginBottom: 5, textTransform: "uppercase" }}>you're flying Fable 5 wrong</div>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 90, lineHeight: 0.92, letterSpacing: "-0.03em", color: "#F3EEE4" }}>burning <span style={{ color: AMBER }}>10x</span> the fuel</div>
    </div>
    {embers.map((e, i) => <div key={i} style={{ position: "absolute", left: e.x - e.r, top: e.y - e.r, width: e.r * 2, height: e.r * 2, borderRadius: "50%", background: grad("#F4D27A", "#D2724E"), boxShadow: `0 0 10px ${AMBER}`, opacity: e.o }} />)}
    <div style={{ position: "absolute", left: CX + 96, top: CoreY - 150, padding: "8px 22px", borderRadius: 999, background: RED, color: "#fff", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 46, boxShadow: `${IMSH}, 0 0 20px rgba(196,74,58,0.7)`, transform: `scale(${over(lf, 66, 12)}) rotate(-7deg)`, zIndex: 15 }}>×10</div>
    {/* Anthropic's real release video establishes it for ~2s, then hands off to the redlining core */}
    {(() => { const vs = ramp(lf, 62, 82); if (vs >= 1) return null; return (<div style={{ position: "absolute", left: CX - 372, top: interpolate(vs, [0, 1], [552, 506]), opacity: (1 - vs) * over(lf, 0, 10), transform: `scale(${interpolate(vs, [0, 1], [1, 0.84])})`, transformOrigin: "50% 0", zIndex: 30 }}><VideoCard w={744} lf={lf} /></div>); })()}
  </AbsoluteFill>); };

// ===== S1 TIP1 — a milled concentric TARGET; a gold dart THWACKS dead-center; a dim tangle misses =====
const RINGS: [number, string, string][] = [
  [238, "radial-gradient(circle at 40% 32%, #26334F, #1A2440 58%, #10162A)", "#0B1020"],
  [186, "radial-gradient(circle at 40% 32%, #6E90BE, #3A5C84 58%, #223B58)", "#182B45"],
  [136, "radial-gradient(circle at 40% 32%, #E4B36A, #CF9544 58%, #9C6A2C)", "#6B481D"],
  [90, "radial-gradient(circle at 40% 32%, #EC8E67, #D2724E 58%, #A9512F)", "#7A381E"],
  [48, "radial-gradient(circle at 46% 40%, #FFF7DA, #E7B24C 55%, #C9902F)", "#875C1D"],
];
const Tip1: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s); const impact = 30; const contact = lf >= impact;
  const tE = Math.min(1, interpolate(lf, [2, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.7)) }));
  const dartT = eOut(lf, 14, 16); const dartX = interpolate(dartT, [0, 1], [470, 0]); const dartY = interpolate(dartT, [0, 1], [-410, 0]);
  const quiver = contact ? Math.sin((lf - impact) / 1.5) * 6 * Math.exp(-(lf - impact) / 13) : 0;
  const punch = (i: number) => { if (!contact) return 1; const tt = lf - impact - i * 2; if (tt < 0 || tt > 10) return 1; return 1 + Math.sin(tt / 10 * Math.PI) * 0.05; };
  const vic = contact ? 1 + Math.max(0, Math.sin((lf - impact) / 9)) * 0.014 : 1;
  return (<AbsoluteFill>
    <Bloom cx={CX - 34} cy={686} w={560} color={contact ? "rgba(63,158,116,0.2)" : "rgba(231,178,76,0.3)"} lf={lf} base={0.42} />
    <Plane lf={lf} shakeAt={impact} shakeAmp={13}>
      <svg width={340} height={220} style={{ position: "absolute", left: -360, top: -270, opacity: (1 - ramp(lf, impact, impact + 8)) * 0.42, filter: "blur(0.6px)" }}><path d="M12 130 C 78 40, 66 160, 140 96 C 196 52, 172 150, 268 116" fill="none" stroke="#2E4256" strokeWidth={7} strokeDasharray="4 12" strokeLinecap="round" strokeDashoffset={340 * (1 - eOut(lf, 4, 16))} /></svg>
      {RINGS.map((rg, i) => <div key={i} style={{ position: "absolute", left: -rg[0], top: -rg[0], width: rg[0] * 2, height: rg[0] * 2, borderRadius: "50%", background: rg[1], boxShadow: `0 12px 0 ${rg[2]}, inset 9px 11px 18px rgba(255,244,206,0.22), inset -11px -13px 22px rgba(0,0,0,0.42)${i === 0 ? ", " + NAVYSH : ""}`, transform: `scale(${tE * punch(i) * vic})`, border: "1px solid rgba(255,244,206,0.1)" }} />)}
      {contact && [0, 1, 2].map((k) => { const rt = (lf - impact - 6 - k * 13) / 46; if (rt <= 0 || rt >= 1) return null; const r = 54 + rt * 400; return <div key={`sw${k}`} style={{ position: "absolute", left: -r, top: -r, width: r * 2, height: r * 2, borderRadius: "50%", border: `${Math.max(1, 6 * (1 - rt))}px solid ${GOLD}`, opacity: (1 - rt) * 0.55 }} />; })}
      <Spec lf={lf} size={480} pop={contact && lf - impact < 6 ? 1 : 0} />
      {dartT > 0.02 && <div style={{ position: "absolute", left: dartX, top: dartY, transform: `translate(-50%,-100%) rotate(${34 + quiver}deg)`, transformOrigin: "bottom center", zIndex: 6 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 1 }}>{[-1, 0, 1].map((k) => <div key={k} style={{ width: 15, height: 36, background: grad("#F0C868", "#C8922E"), clipPath: "polygon(50% 0,100% 100%,0 100%)", borderTop: "2px solid #FFF6D8", transform: `rotate(${k * 8}deg)` }} />)}</div>
          <div style={{ width: 9, height: 100, background: grad("#4A6E9C", "#2E4870"), boxShadow: "inset 1.5px 0 0 rgba(255,255,255,0.35)" }} />
          <div style={{ width: 22, height: 56, background: grad("#F3D48A", "#B9822E"), borderRadius: "3px 3px 50% 50%", boxShadow: "inset 3px 0 0 rgba(255,253,244,0.85), 2px 0 0 rgba(185,212,255,0.6), -2px 0 0 rgba(185,212,255,0.4)" }} />
        </div>
      </div>}
    </Plane>
    {/* continuous rising confetti (keeps it alive after the hit) */}
    {contact && Array.from({ length: 16 }).map((_, i) => { const t = ((lf - impact) * 0.016 + seed(i * 3)) % 1; if (t < 0.02) return null; const x = CX - 34 + (seed(i) - 0.5) * 360; const y = 686 - t * 460; const col = [GOLD, GREEN, CLAY, "#FFE39A"][i % 4]; return <div key={`cf${i}`} style={{ position: "absolute", left: x - 4, top: y, width: 8, height: 13, borderRadius: 2, background: col, opacity: (1 - t) * 0.85, transform: `rotate(${t * 420 + i * 40}deg)` }} />; })}
    <Sparks lf={lf} at={impact} cx={CX - 34} cy={686} color={GOLD} />
    {/* escalating celebration: BULLSEYE -> hit it, first try */}
    {lf >= 38 && lf < 86 && <div style={{ position: "absolute", left: 0, right: 0, top: 952, textAlign: "center", opacity: over(lf, 38, 8) * (1 - ramp(lf, 78, 86)), transform: `scale(${over(lf, 38, 8) * (1 + Math.max(0, Math.sin(lf / 6)) * 0.03)})` }}><span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 68, color: AMBER, textShadow: "0 2px 22px rgba(207,149,68,0.5)" }}>BULLSEYE!</span></div>}
    {lf >= 84 && <div style={{ position: "absolute", left: 0, right: 0, top: 950, textAlign: "center", opacity: over(lf, 84, 10) }}><div style={{ display: "inline-flex", alignItems: "center", gap: 14, padding: "12px 30px", borderRadius: 999, background: "rgba(63,158,116,0.16)", border: `3px solid ${GREEN}`, boxShadow: "0 0 30px rgba(63,158,116,0.4)", transform: `scale(${1 + Math.max(0, Math.sin(lf / 8)) * 0.02})` }}><span style={{ width: 44, height: 44, borderRadius: "50%", background: GREEN, color: "#fff", fontSize: 26, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center" }}>✓</span><span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 42, color: GREEN }}>hit it, first try</span></div></div>}
    <Tag text="the goal, not the steps" color={GREEN} x={CX} y={1078} lf={lf} at={92} />
  </AbsoluteFill>); };

// ===== S2 TIP2 — CLEAR: Claude claims "done", we catch it (0 tests), then it's verified for real =====
const Tip2: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s); const caught = lf >= 24; const verified = lf >= 46; const app = over(lf, 2, 12);
  return (<AbsoluteFill>
    <Bloom cx={CX} cy={694} w={640} color={verified ? "rgba(63,158,116,0.24)" : caught ? "rgba(196,74,58,0.2)" : "rgba(207,149,68,0.2)"} lf={lf} base={0.42} />
    <div style={{ position: "absolute", left: CX - 392, top: 476, width: 784, opacity: app, transform: `translateY(${(1 - Math.min(app, 1)) * 24}px)` }}>
      <div style={{ borderRadius: 26, background: "#fff", boxShadow: SH, overflow: "hidden" }}>
        <div style={{ padding: "24px 32px", display: "flex", alignItems: "center", gap: 14, borderBottom: "1px solid #efeae0", background: grad("#FBF8F2", "#F1E9DA") }}><ClaudeMark size={46} /><span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 36, color: INK }}>Did it actually finish?</span></div>
        <div style={{ padding: "40px 34px 46px", display: "flex", flexDirection: "column", alignItems: "center", gap: 22, minHeight: 320 }}>
          {/* the claim */}
          <div style={{ display: "flex", alignItems: "center", gap: 18, padding: "22px 34px", borderRadius: 18, width: "100%", justifyContent: "center", background: caught ? "rgba(196,74,58,0.08)" : "rgba(63,158,116,0.12)", border: `2.5px solid ${caught ? RED : GREEN}`, opacity: verified ? 0.45 : 1 }}>
            <div style={{ width: 52, height: 52, borderRadius: "50%", background: caught ? RED : GREEN, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 30, fontWeight: 900 }}>{caught ? "✕" : "✓"}</div>
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 36, color: caught ? RED : GREEN, textDecoration: caught ? "line-through" : "none" }}>Claude: “It’s all done.”</span>
          </div>
          {/* the catch */}
          {caught && !verified && <div style={{ display: "flex", alignItems: "center", gap: 14, opacity: over(lf, 26, 10) }}><span style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 30, color: RED }}>Actually? 0 tests run, nothing built.</span></div>}
          {/* verified for real */}
          {verified && <div style={{ display: "flex", alignItems: "center", gap: 18, padding: "22px 34px", borderRadius: 18, width: "100%", justifyContent: "center", background: "rgba(63,158,116,0.16)", border: `3px solid ${GREEN}`, boxShadow: "0 0 26px rgba(63,158,116,0.4)", opacity: over(lf, 46, 12), transform: `scale(${over(lf, 46, 12)})` }}><div style={{ width: 52, height: 52, borderRadius: "50%", background: GREEN, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 30, fontWeight: 900 }}>✓</div><span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 34, color: GREEN }}>Verified — 12/12 tests passed</span></div>}
        </div>
      </div>
    </div>
    <Tag text="make it prove its work" color={verified ? GREEN : SLATE} x={CX} y={1076} lf={lf} at={8} />
  </AbsoluteFill>); };

// ===== S3 TIP3 — CLEAR: an actual memory.md file fills with lessons; next run it's smarter (1x->3x) =====
const LESSONS = ["always use annual pricing", "the API caps at 100 req/s", "prefer server components here"];
const Tip3: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s); const app = over(lf, 2, 12); const mult = Math.min(3, 1 + Math.floor(ramp(lf, 20, 56) * 3));
  return (<AbsoluteFill>
    <Bloom cx={CX} cy={670} w={640} color="rgba(210,114,78,0.2)" lf={lf} base={0.42} />
    <div style={{ position: "absolute", left: CX - 384, top: 452, width: 768, opacity: app, transform: `translateY(${(1 - Math.min(app, 1)) * 24}px)` }}>
      <div style={{ borderRadius: 20, overflow: "hidden", background: "#0E1524", boxShadow: SH, border: "1px solid rgba(130,160,210,0.2)" }}>
        <div style={{ height: 56, background: "#18202F", display: "flex", alignItems: "center", padding: "0 22px", gap: 12 }}><span style={{ fontSize: 24 }}>📄</span><span style={{ fontFamily: mono, fontWeight: 700, fontSize: 26, color: "#c7cee0" }}>memory.md</span><span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8, color: GREEN, fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 20 }}><span style={{ width: 10, height: 10, borderRadius: "50%", background: GREEN, opacity: 0.5 + Math.abs(Math.sin(lf / 6)) * 0.5 }} />saving</span></div>
        <div style={{ padding: "30px 34px 38px", fontFamily: mono, fontSize: 30, lineHeight: 1.75, minHeight: 300 }}>
          <div style={{ color: "#7f8aa0", marginBottom: 8 }}># what I learned</div>
          {LESSONS.map((l, i) => { const e = ramp(lf, 12 + i * 12, 22 + i * 12); const typing = lf < 22 + i * 12; return <div key={i} style={{ color: "#A7D9C0", opacity: e }}>- {l}{typing && lf >= 12 + i * 12 && lf % 16 < 8 ? " ▋" : ""}</div>; })}
        </div>
      </div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1010, display: "flex", justifyContent: "center", opacity: ramp(lf, 22, 34) }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 30px", borderRadius: 999, background: grad("#FBF7EF", "#EFE6D4"), border: `3px solid ${GREEN}`, boxShadow: "0 0 26px rgba(63,158,116,0.3)" }}><span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 52, color: GREEN, transform: `scale(${1 + Math.max(0, Math.sin(lf / 5)) * 0.05})` }}>{mult}x</span><span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 26, color: INK }}>smarter every run</span></div>
    </div>
    <Tag text="give it a memory file" color={CLAY} x={CX} y={1136} lf={lf} at={8} />
  </AbsoluteFill>); };

// ===== S4 TIP4 — CLEAR: an Effort slider drops xHIGH -> LOW; tokens fall 90%; quality unchanged =====
const Tip4: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s); const app = over(lf, 2, 12); const slide = eOut(lf, 20, 40); const segs = ["LOW", "MED", "HIGH", "xHIGH"]; const active = Math.round(interpolate(slide, [0, 1], [3, 0])); const tokens = Math.round(interpolate(slide, [0, 1], [1200000, 120000]));
  return (<AbsoluteFill>
    <Bloom cx={CX} cy={640} w={640} color={slide > 0.5 ? "rgba(63,158,116,0.22)" : "rgba(207,149,68,0.22)"} lf={lf} base={0.42} />
    <div style={{ position: "absolute", left: CX - 396, top: 446, width: 792, opacity: app, transform: `translateY(${(1 - Math.min(app, 1)) * 24}px)` }}>
      <div style={{ borderRadius: 26, background: "#fff", boxShadow: SH, padding: "34px 38px" }}>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 36, color: INK, marginBottom: 24 }}>Effort setting</div>
        <div style={{ display: "flex", gap: 10, marginBottom: 30 }}>{segs.map((sg, i) => { const on = active === i; return <div key={i} style={{ flex: 1, height: 82, borderRadius: 16, background: on ? (i === 0 ? grad("#4FB98A", "#2E9268") : grad("#E08A66", "#C5603C")) : "#F1EEE7", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: on ? IMSH : "none", border: on ? "none" : "1px solid #e6e0d3", transform: `scale(${on ? 1.04 : 1})` }}><span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 28, color: on ? "#fff" : "#a39d90" }}>{sg}</span></div>; })}</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #efeae0", paddingTop: 22 }}>
          <span style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 28, color: MUTE }}>tokens per task</span>
          <span style={{ fontFamily: mono, fontWeight: 800, fontSize: 40, color: slide > 0.5 ? GREEN : AMBER }}>{tokens.toLocaleString()}</span>
        </div>
      </div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1012, display: "flex", justifyContent: "center", gap: 16, opacity: over(lf, 44, 12), transform: `scale(${over(lf, 44, 12)})` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 30px", borderRadius: 16, background: "rgba(63,158,116,0.16)", border: `3px solid ${GREEN}`, boxShadow: "0 0 30px rgba(63,158,116,0.4)" }}><span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 54, color: GREEN }}>-90%</span><span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 26, color: INK }}>tokens · same quality</span></div>
    </div>
    <Tag text="turn the effort down" color={GREEN} x={CX} y={1130} lf={lf} at={8} />
  </AbsoluteFill>); };

const CTA: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const local = f - fr(s); if (local < 0) return null; const a = eOut(f, fr(s) + 2, 12); const pillPop = over(local, 10, 14);
  return (<AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingBottom: 150 }}>
    {Array.from({ length: 14 }, (_, i) => { const p = eOut(f, fr(s) + 6 + i, 26); const ang = (i / 7) * Math.PI; if (p <= 0 || p >= 1) return null; return <div key={i} style={{ position: "absolute", left: 540 + Math.cos(ang) * p * 340, top: 820 + Math.sin(ang) * p * 340, fontSize: 25, opacity: Math.sin(p * Math.PI), color: [SLATE, CLAY, GREEN, GOLD][i % 4] }}>✦</div>; })}
    <div style={{ marginTop: -150, transform: `scale(${0.7 + a * 0.3})`, opacity: a }}><ClaudeMark size={150} glow={0.5 + Math.sin(local / 9) * 0.12} /></div>
    <div style={{ marginTop: 40, transform: `scale(${(0.8 + pillPop * 0.2) * (1 + Math.sin(f / 7) * 0.03)})`, padding: "26px 54px", borderRadius: 999, background: CLAY, color: "#fff", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 66, boxShadow: "0 24px 54px rgba(210,114,78,0.42)", opacity: a }}>💬 Comment "FABLE"</div>
    <div style={{ marginTop: 26, fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 600, fontSize: 42, color: INK, opacity: a, textAlign: "center" }}>and I'll send the exact Fable guide</div>
  </AbsoluteFill>); };

// ===== Captions =====
type Word = { word: string; start: number; end: number; line: number };
const WORDS = wordsData as Word[];
const cleanw = (w: string) => w.toLowerCase().replace(/[^a-z0-9'$,.%]/g, "");
const EMPH = new Set(["fable", "5", "wrong,", "10", "tokens", "90%.", "goal.", "steps", "outcome,", "done,", "work.", "prove", "claim", "result", "anthropic", "memory", "file.", "lesson", "3", "smarter", "effort", "dial.", "maxed", "low,", "high", "opus.", "quality", "tenth", "comment", "90%"]);
const CHUNKS = (() => { const byLine: Record<number, Word[]> = {}; for (const w of WORDS) (byLine[w.line] ||= []).push(w);
  const out: { words: Word[]; start: number; line: number }[] = [];
  for (const li of Object.keys(byLine).map(Number).sort((a, b) => a - b)) { const ws = byLine[li]; for (let i = 0; i < ws.length; i += 3) { const g = ws.slice(i, i + 3); out.push({ words: g, start: g[0].start, line: li }); } }
  const aE = Math.max(...WORDS.map((w) => w.end)); return out.map((c, i) => ({ ...c, end: i + 1 < out.length ? out[i + 1].start : aE + 0.4 })); })();
const Captions: React.FC = () => { const frame = useCurrentFrame();
  return (<>{CHUNKS.map((c, i) => { if (frame < fr(c.start) || frame >= fr(c.end)) return null; if (c.line === 5) return null;
    return (<div key={i} style={{ position: "absolute", top: 1256, left: 64, right: 64, height: 160, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "center", gap: "0 15px", width: 952, textAlign: "center" }}>
        {c.words.map((w, j) => { const g = EMPH.has(cleanw(w.word)); const shown = frame >= fr(w.start);
          return <span key={j} style={{ display: "inline-block", opacity: shown ? 1 : 0, fontFamily: g ? frauncesItalic.fontFamily : fraunces.fontFamily, fontStyle: g ? "italic" : "normal", fontWeight: g ? 700 : 600, fontSize: g ? 72 : 62, lineHeight: 1.04, color: g ? SLATE : INK, letterSpacing: "-0.02em", textShadow: "0 2px 14px rgba(236,233,226,0.96), 0 1px 2px rgba(236,233,226,1)" }}>{w.word}</span>; })}
      </div></div>); })}</>); };

const L = [0, 7.46, 13.68, 21.88, 28.82, 40.98]; const TOTAL = 43.8;
const ProgressBar: React.FC = () => { const f = useCurrentFrame(); const { durationInFrames } = useVideoConfig(); const p = Math.min(1, f / (durationInFrames - 1)); const t = f / FPS; const marks = [L[1], L[2], L[3], L[4]];
  return (<div style={{ position: "absolute", left: 46, right: 46, top: 272, height: 56, zIndex: 120 }}>
    <div style={{ position: "absolute", left: 0, right: 0, top: 18, height: 22, background: "rgba(58,92,132,0.22)", borderRadius: 999, boxShadow: "inset 0 1px 3px rgba(0,0,0,0.15)" }} />
    <div style={{ position: "absolute", left: 0, top: 18, height: 22, width: `${p * 100}%`, background: grad("#E08A66", "#C5603C"), borderRadius: 999, boxShadow: "0 3px 12px rgba(210,114,78,0.6)" }} />
    {marks.map((m, i) => { const np = m / TOTAL; const passed = t >= m; const teased = i === 3 && !passed; const pop = passed ? 1 + Math.max(0, 1 - (t - m) * 3) * 0.35 : 1; return (
      <div key={i} style={{ position: "absolute", left: `${np * 100}%`, top: 0, transform: `translateX(-50%) scale(${pop})`, width: 56, height: 56, borderRadius: "50%", background: passed ? GREEN : (teased ? "#25314A" : "#EDE7DB"), border: `4px solid ${passed ? GREEN : (teased ? AMBER : CLAY)}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 26, color: passed ? "#fff" : (teased ? AMBER : CLAY), boxShadow: passed ? `0 0 18px ${GREEN}` : (teased ? `0 0 16px ${AMBER}99` : "0 2px 6px rgba(0,0,0,0.2)") }}>{passed ? "✓" : i + 1}</div>); })}
    {(() => { const unlocked = t >= L[5]; const uu = unlocked ? Math.min(1, (t - L[5]) / 0.45) : 0; const eu = 1 - Math.pow(1 - uu, 3); const pt = 1 - uu; const pulse = 1 + Math.sin(t * 3.2) * 0.05 * pt; const pop = 1 + Math.max(0, 1 - Math.abs((t - L[5]) - 0.12) * 4.5) * 0.42; const sc = pulse * pop; const glow = unlocked ? `0 0 32px ${GOLD}, 0 0 12px ${GOLD}` : `0 0 ${12 + Math.sin(t * 3.2) * 5 * pt}px ${GOLD}bb`; return (
      <div style={{ position: "absolute", right: -14, top: -8, width: 72, height: 72, transform: `scale(${sc})`, zIndex: 131 }}>
        {unlocked && Array.from({ length: 9 }, (_, k) => { const a = (k / 9) * Math.PI * 2; const d = 16 + eu * 24; const o = Math.max(0, 1 - uu * 1.05); return (<div key={k} style={{ position: "absolute", left: 36, top: 36, width: 6, height: 6, marginLeft: -3, marginTop: -3, borderRadius: "50%", background: "#F3E3A6", opacity: o, transform: `translate(${Math.cos(a) * d}px, ${Math.sin(a) * d}px)`, boxShadow: `0 0 7px ${GOLD}` }} />); })}
        <div style={{ position: "absolute", inset: 4, borderRadius: "50%", background: unlocked ? grad("#F0CB63", "#C98A22") : "rgba(30,25,14,0.9)", border: `4px solid ${unlocked ? "#F6E4A0" : GOLD}`, boxShadow: glow, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 36, lineHeight: 1, color: unlocked ? "#fff" : GOLD, opacity: unlocked ? 1 : 0.5, transform: `scale(${unlocked ? eu : 1})`, textShadow: unlocked ? "0 1px 3px rgba(0,0,0,0.3)" : "none" }}>✓</div>
        </div>
      </div>); })()}
    <div style={{ position: "absolute", left: `${p * 100}%`, top: 9, width: 38, height: 38, borderRadius: "50%", background: CLAY, border: "5px solid #F3EFE7", boxShadow: "0 0 18px rgba(210,114,78,0.95)", transform: "translateX(-50%)" }} /></div>); };

const Sfx: React.FC<{ at: number; src: string; v?: number; dur?: number }> = ({ at, src, v = 0.3, dur = 2.5 }) => (<Sequence from={fr(at)} durationInFrames={fr(dur)}><Audio src={staticFile(`sfx/${src}`)} volume={v} /></Sequence>);
const Ticks: React.FC<{ start: number; n: number; step: number; src?: string; v?: number }> = ({ start, n, step, src = "tick.wav", v = 0.24 }) => (<>{Array.from({ length: n }, (_, i) => <Sfx key={i} at={start + i * step} src={src} v={v} dur={0.5} />)}</>);

export const ClaudeFableReel: React.FC = () => { const frame = useCurrentFrame(); const zoom = interpolate(frame, [0, 16, 28], [1.0, 1.03, 1.0], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  return (<AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
    <Audio src={staticFile("vo_fable.wav")} />
    <Audio loop src={staticFile("seo_music.wav")} volume={(ff) => interpolate(ff, [0, fr(1.6), fr(L[5]) - 10, fr(L[5]) + 16, 99999], [0, 0.2, 0.2, 0.15, 0.15], { extrapolateRight: "clamp" })} />
    <Sfx at={0} src="metal_riser.wav" v={0.85} /><Sfx at={0} src="sub.wav" v={0.8} /><Sfx at={0.25} src="boom.wav" v={0.6} /><Sfx at={1.6} src="ding.wav" v={0.4} />
    {L.slice(1).map((tt, i) => <React.Fragment key={i}><Sfx at={tt - 0.1} src="swish.wav" v={0.44} /><Sfx at={tt + 0.3} src="pop.wav" v={0.3} /></React.Fragment>)}
    <Sfx at={10.6} src="snap.wav" v={0.4} /><Sfx at={17.8} src="thock.wav" v={0.5} /><Sfx at={24.8} src="ding.wav" v={0.45} />
    <Sfx at={31.0} src="whoosh.wav" v={0.4} /><Sfx at={38.8} src="resolve.wav" v={0.5} />
    <Sfx at={L[5]} src="resolve.wav" v={0.5} /><Sfx at={L[5] + 0.2} src="angelic.wav" v={0.4} dur={3.0} /><Sfx at={L[5] + 0.4} src="sparkle.wav" v={0.55} />
    <AbsoluteFill style={{ transform: `translateY(90px) scale(${zoom})`, transformOrigin: "50% 44%" }}>
      <CraftWorld />
      <Scene s={L[0]} e={L[1]}><HookScene s={L[0]} /></Scene>
      <Scene s={L[1]} e={L[2]}><Tip1 s={L[1]} /></Scene>
      <Scene s={L[2]} e={L[3]}><Tip2 s={L[2]} /></Scene>
      <Scene s={L[3]} e={L[4]}><Tip3 s={L[3]} /></Scene>
      <Scene s={L[4]} e={L[5]}><Tip4 s={L[4]} /></Scene>
      <CTA s={L[5]} />
      <Captions />
    </AbsoluteFill>
    <ProgressBar />
  </AbsoluteFill>); };
