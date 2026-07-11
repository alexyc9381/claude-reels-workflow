import React from "react";
import { AbsoluteFill, Audio, Easing, Sequence, interpolate, interpolateColors, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { fraunces, frauncesItalic, inter } from "./fonts";
import wordsData from "./data/words_nightshift.json";

/** ClaudeNightshiftReel — "The Long Night": one night→dawn world, 6 morphing hero objects, low text, continuous motion. */
const CREAM = "#ECE9E2", INK = "#1A1813", SLATE = "#3A5C84", CLAY = "#D2724E", AMBER = "#CF9544", GREEN = "#3F9E74", MUTE = "#9A968B", BLUE = "#3E6CF0", NAVY = "#1B2640", NAVY2 = "#0E1626", RED = "#C44A3A";
const FPS = 30; const fr = (s: number) => s * FPS; const CX = 540, EYE = 840;
const eOut = (f: number, sF: number, d = 10) => interpolate(f, [sF, sF + d], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
const ramp = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const over = (f: number, sF: number, d = 12) => interpolate(f, [sF, sF + d * 0.5, sF + d], [0, 1.12, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
const grad = (a: string, b: string) => `linear-gradient(158deg, ${a} 0%, ${b} 100%)`;
const CLAUDE_PATH = "m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z";
const SH = "0 2px 4px rgba(20,26,45,0.22), 0 16px 34px rgba(20,26,45,0.26), 0 44px 78px rgba(20,26,45,0.30)";
const IMSH = "0 12px 28px rgba(20,26,45,0.24), 0 4px 10px rgba(20,26,45,0.16)";
const mono = "ui-monospace, 'SF Mono', Menlo, monospace";
const Sheen: React.FC<{ r: number | string; o?: number }> = ({ r, o = 0.32 }) => (<div style={{ position: "absolute", inset: 0, borderRadius: r, background: `linear-gradient(125deg, rgba(255,255,255,${o}) 0%, rgba(255,255,255,0) 32%)`, pointerEvents: "none" }} />);
const Glint: React.FC<{ lf: number; start: number; dur?: number; r: number | string }> = ({ lf, start, dur = 16, r }) => { const t = ramp(lf, start, start + dur); if (t <= 0 || t >= 1) return null; return (<div style={{ position: "absolute", inset: 0, borderRadius: r, overflow: "hidden", pointerEvents: "none" }}><div style={{ position: "absolute", top: "-30%", left: `${interpolate(t, [0, 1], [-40, 130])}%`, width: "34%", height: "160%", background: "linear-gradient(105deg, transparent, rgba(255,255,255,0.55), transparent)", transform: "rotate(9deg)" }} /></div>); };
const Bloom: React.FC<{ cx: number; cy: number; w: number; color: string; lf?: number; base?: number }> = ({ cx, cy, w, color, lf = 0, base = 0.6 }) => (<div style={{ position: "absolute", left: cx - w / 2, top: cy - w / 2, width: w, height: w, borderRadius: "50%", background: `radial-gradient(circle at 50% 46%, ${color} 0%, transparent 62%)`, opacity: base + Math.sin(lf / 9) * 0.14, pointerEvents: "none" }} />);
const ClaudeSun: React.FC<{ size: number; glow?: number; spin?: number }> = ({ size, glow = 0.5, spin = 0 }) => (<div style={{ position: "relative", width: size, height: size, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ position: "absolute", inset: -size * 0.4, borderRadius: "50%", background: `radial-gradient(circle, rgba(224,138,102,${glow}) 0%, transparent 64%)` }} /><svg viewBox="0 0 24 24" width={size} height={size} style={{ transform: `rotate(${spin}deg)`, filter: `drop-shadow(0 ${size * 0.03}px ${size * 0.07}px rgba(170,72,44,0.45))` }}><path fill={CLAY} d={CLAUDE_PATH} /></svg></div>);
const ClaudeChip: React.FC<{ size: number }> = ({ size }) => (<div style={{ width: size, height: size, borderRadius: size * 0.28, background: grad("#E08A66", "#C5603C"), boxShadow: `${SH}, 0 0 ${size * 0.3}px rgba(210,114,78,0.45)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, position: "relative" }}><svg viewBox="0 0 24 24" width={size * 0.6} height={size * 0.6}><path fill="#F6EFE6" d={CLAUDE_PATH} /></svg><Sheen r={size * 0.28} /></div>);
const ContactShadow: React.FC<{ cx: number; cy: number; w: number; o?: number }> = ({ cx, cy, w, o = 0.3 }) => (<div style={{ position: "absolute", left: cx - w / 2, top: cy, width: w, height: w * 0.16, borderRadius: "50%", background: `radial-gradient(ellipse, rgba(14,18,30,${o}), transparent 70%)` }} />);

// ===== global world: night-sky panel warming to dawn + stars + sweeping clock-ring + horizon =====
const SkyWorld: React.FC = () => { const f = useCurrentFrame(); const { durationInFrames } = useVideoConfig();
  const nightOp = interpolate(f, [0, fr(22.5), fr(26.2)], [1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const amberOp = interpolate(f, [fr(22.8), fr(24.4), fr(28)], [0, 0.85, 0.55], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const handDeg = interpolate(f, [0, durationInFrames], [-90, 270]);
  const horizon = interpolate(f, [0, fr(24), fr(26.5)], [1280, 1180, 760], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (<AbsoluteFill style={{ background: "radial-gradient(120% 90% at 50% 8%, #F3F1EB 0%, #ECE9E2 46%, #E4E0D6 100%)" }}>
    <div style={{ position: "absolute", inset: -40, opacity: 0.45, backgroundImage: "linear-gradient(rgba(58,92,132,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(58,92,132,0.05) 1px, transparent 1px)", backgroundSize: "62px 62px" }} />
    {/* night sky panel behind hero */}
    <div style={{ position: "absolute", left: -60, right: -60, top: 300, height: 760, borderRadius: 80, background: `radial-gradient(120% 90% at 50% 40%, ${NAVY} 0%, ${NAVY2} 70%, transparent 100%)`, opacity: nightOp * 0.92 }} />
    {/* stars */}
    <div style={{ position: "absolute", inset: 0, opacity: nightOp }}>{Array.from({ length: 34 }).map((_, i) => { const x = (i * 71 + 50) % 1040 + 20; const y = (i * 113 + 70) % 660 + 330; const tw = 0.35 + 0.65 * Math.abs(Math.sin((f + i * 37) / 20)); const big = i % 5 === 0; return <div key={i} style={{ position: "absolute", left: x, top: y, width: big ? 4 : 2.5, height: big ? 4 : 2.5, borderRadius: "50%", background: "#fff", opacity: tw * 0.85 }} />; })}</div>
    {/* sweeping clock-ring */}
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      <circle cx={CX} cy={EYE} r={500} fill="none" stroke={`rgba(${nightOp > 0.5 ? "200,210,235" : "120,120,120"},0.10)`} strokeWidth={2} />
      {Array.from({ length: 12 }).map((_, i) => { const a = (i / 12) * Math.PI * 2 - Math.PI / 2; return <line key={i} x1={CX + Math.cos(a) * 488} y1={EYE + Math.sin(a) * 488} x2={CX + Math.cos(a) * 500} y2={EYE + Math.sin(a) * 500} stroke="rgba(160,170,200,0.16)" strokeWidth={3} />; })}
      <line x1={CX} y1={EYE} x2={CX + Math.cos(handDeg * Math.PI / 180) * 470} y2={EYE + Math.sin(handDeg * Math.PI / 180) * 470} stroke={`rgba(210,114,78,${0.12 + amberOp * 0.1})`} strokeWidth={4} strokeLinecap="round" />
    </svg>
    {/* dawn warm wash */}
    <div style={{ position: "absolute", left: -60, right: -60, top: 300, height: 800, borderRadius: 80, background: "radial-gradient(120% 90% at 50% 70%, rgba(207,149,68,0.5) 0%, rgba(231,196,140,0.22) 50%, transparent 85%)", opacity: amberOp }} />
    {/* rising horizon line */}
    <div style={{ position: "absolute", left: 0, right: 0, top: horizon, height: 3, background: `linear-gradient(90deg, transparent, rgba(207,149,68,${0.3 + amberOp * 0.5}), transparent)`, opacity: interpolate(f, [fr(20), fr(24)], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }} />
  </AbsoluteFill>); };

const Moon: React.FC<{ size: number; cx: number; cy: number; glow?: number }> = ({ size, cx, cy, glow = 1 }) => (<div style={{ position: "absolute", left: cx - size / 2, top: cy - size / 2, width: size, height: size }}><div style={{ position: "absolute", inset: -size * 0.3, borderRadius: "50%", background: `radial-gradient(circle, rgba(224,138,102,${0.4 * glow}) 0%, transparent 62%)` }} /><div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "radial-gradient(circle at 40% 36%, #FBF3E0, #E7D6B2)", boxShadow: `inset -${size * 0.2}px -${size * 0.14}px 0 ${size * 0.02}px rgba(27,38,64,0.55), 0 0 ${size * 0.5}px rgba(248,240,210,0.4)` }} /></div>);
const Thread: React.FC<{ lf: number; from: number[]; to: number[]; at: number; dur?: number; w?: number }> = ({ lf, from, to, at, dur = 16, w = 5 }) => { const t = ramp(lf, at, at + dur); if (t <= 0) return null; const x = interpolate(t, [0, 1], [from[0], to[0]]); const y = interpolate(t, [0, 1], [from[1], to[1]]); const tail = Math.max(0, t - 0.18); const tx = interpolate(tail, [0, 1], [from[0], to[0]]); const ty = interpolate(tail, [0, 1], [from[1], to[1]]); return (<svg width={1080} height={1920} style={{ position: "absolute", inset: 0, opacity: t < 1 ? 1 : 1 - ramp(lf, at + dur, at + dur + 10) }}><line x1={tx} y1={ty} x2={x} y2={y} stroke={CLAY} strokeWidth={w} strokeLinecap="round" opacity={0.9} /><circle cx={x} cy={y} r={w + 3} fill={CLAY} /><circle cx={x} cy={y} r={w + 10} fill="rgba(210,114,78,0.3)" /></svg>); };

// ===== S0 HOOK — the moon (Claude's light) =====
const MoonScene: React.FC<{ lf: number }> = ({ lf }) => { const set = over(lf, 0, 12); const breathe = 1 + Math.sin(lf / 7) * 0.02;
  return (<AbsoluteFill>
    <div style={{ position: "absolute", top: 372, left: 0, right: 0, textAlign: "center", transform: `scale(${0.95 + Math.min(set, 1) * 0.05})` }}>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 80, color: "#F3EEE4", lineHeight: 1.0, letterSpacing: "-0.02em", textShadow: "0 2px 20px rgba(10,14,30,0.5)" }}>Claude works the<br /><span style={{ color: CLAY }}>night shift</span> now.</div>
    </div>
    <Bloom cx={CX} cy={EYE} w={620} color="rgba(224,138,102,0.5)" lf={lf} base={0.55} />
    <div style={{ transform: `scale(${breathe})`, transformOrigin: `${CX}px ${EYE}px` }}>
      <Moon size={300} cx={CX} cy={EYE} glow={1} />
      <div style={{ position: "absolute", left: CX - 52, top: EYE - 52 }}><ClaudeSun size={104} glow={0.85} spin={lf * 0.8} /></div>
    </div>
    {/* sleeping skyline silhouette */}
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}><path d="M0 1090 L0 1040 L80 1040 L80 1000 L150 1000 L150 1040 L260 1040 L260 980 L330 980 L330 1040 L470 1040 L470 1010 L560 1010 L560 1040 L700 1040 L700 990 L770 990 L770 1040 L900 1040 L900 1015 L990 1015 L990 1040 L1080 1040 L1080 1090 Z" fill="rgba(20,28,48,0.7)" /></svg>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1100, textAlign: "center", opacity: ramp(lf, 36, 54) }}><span style={{ fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 600, fontSize: 36, color: "#c7cbe0" }}>you sleep. it works.</span></div>
    <Thread lf={lf} from={[CX + 40, EYE]} to={[1080, 760]} at={fr(3.6)} dur={20} />
  </AbsoluteFill>); };

// ===== S1 CHORE — the weekly treadmill =====
const TreadmillScene: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s);
  const TW = 220; const speed = interpolate(lf, [0, 60, 180], [1.4, 2.6, 5.2], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const off = (lf * speed) % TW; const set = over(lf, 4, 14);
  const count = Math.min(4, 1 + Math.floor(ramp(lf, 70, 200) * 4)); const loopSpin = lf * (3 + speed);
  return (<AbsoluteFill>
    <Bloom cx={CX} cy={EYE} w={1040} color="rgba(58,92,132,0.28)" lf={lf} base={0.4} />
    <Thread lf={lf} from={[60, 760]} to={[CX, 640]} at={0} dur={14} />
    <div style={{ position: "absolute", top: 470, left: 0, right: 0, textAlign: "center", opacity: ramp(lf, 6, 18) }}><span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 56, color: "#F0EBDF" }}>the same job, <span style={{ color: CLAY }}>every week</span></span></div>
    {/* loop arrow */}
    <div style={{ position: "absolute", left: CX - 40, top: 600, width: 80, height: 80, opacity: ramp(lf, 10, 24) }}><svg width={80} height={80} viewBox="0 0 24 24" style={{ transform: `rotate(${loopSpin}deg)` }}><path d="M12 4 a8 8 0 1 1 -7 4" fill="none" stroke={CLAY} strokeWidth={2.4} strokeLinecap="round" /><path d="M3 5 L5 9 L9 7 Z" fill={CLAY} /></svg></div>
    {/* treadmill track */}
    <div style={{ position: "absolute", left: 0, right: 0, top: EYE - 90, height: 200, overflow: "hidden", opacity: Math.min(set, 1) }}>
      <div style={{ position: "absolute", left: -TW + 30 - off, top: 0, display: "flex", gap: 30 }}>
        {Array.from({ length: 8 }).map((_, i) => { const hot = i % 3 === 1; return (
          <div key={i} style={{ width: TW - 30, height: 184, borderRadius: 20, background: hot ? grad("#F6E7CF", "#EAD3A8") : grad("#EEF0F4", "#DCE0E8"), boxShadow: IMSH, border: hot ? `2px solid ${AMBER}` : "1px solid rgba(20,26,45,0.08)", padding: "16px 18px", flexShrink: 0, position: "relative" }}>
            <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 22, color: hot ? "#8a6326" : MUTE, letterSpacing: "0.06em" }}>MON</div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 64, marginTop: 14 }}>{[34, 52, 28, 46].map((h, j) => <div key={j} style={{ width: 22, height: h, borderRadius: "3px 3px 0 0", background: hot ? AMBER : SLATE, opacity: 0.85 }} />)}</div>
            <div style={{ position: "absolute", right: 14, bottom: 14, width: 44, height: 44, borderRadius: "50%", border: `4px solid ${hot ? AMBER : "rgba(58,92,132,0.3)"}`, borderTopColor: "transparent", transform: "rotate(45deg)" }} />
          </div>); })}
      </div>
    </div>
    {/* 90 min + counter */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 1000, textAlign: "center", opacity: ramp(lf, 60, 78) }}>
      <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 46, color: "#F0EBDF" }}>90 min, every week</span><span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 36, color: AMBER, marginLeft: 18 }}>×{count}</span>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1064, textAlign: "center", opacity: ramp(lf, 150, 174) }}><span style={{ fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 700, fontSize: 40, color: CLAY }}>…forever.</span></div>
  </AbsoluteFill>); };

// ===== S2 SCHEDULE — hand it once, set to AUTO =====
const DialScene: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s);
  const hand = over(lf, 6, 18); const morph = ramp(lf, 26, 40); const auto = ramp(lf, 42, 56);
  const ringT = ramp(lf, 56, 130); const lid = ramp(lf, 70, 86);
  const tileX = interpolate(hand, [0, 1], [180, CX]); const tileY = interpolate(hand, [0, 1], [560, EYE]); const tileScale = interpolate(hand, [0, 1], [1, 0.2]);
  return (<AbsoluteFill>
    <Bloom cx={CX} cy={EYE} w={1080} color={auto > 0.5 ? "rgba(63,158,116,0.26)" : "rgba(62,108,240,0.22)"} lf={lf} base={0.42} />
    <Thread lf={lf} from={[1080, 760]} to={[CX, EYE]} at={0} dur={14} />
    <div style={{ position: "absolute", top: 460, left: 0, right: 0, textAlign: "center", opacity: ramp(lf, 4, 16) }}><span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 56, color: "#F0EBDF" }}>hand it over <span style={{ color: BLUE }}>once</span></span></div>
    {/* flying tile */}
    {hand < 1 && <div style={{ position: "absolute", left: tileX - 70, top: tileY - 70, width: 140, height: 140, borderRadius: 20, background: grad("#EEF0F4", "#DCE0E8"), boxShadow: IMSH, opacity: 1 - morph, transform: `scale(${tileScale})` }} />}
    {/* dial */}
    <div style={{ position: "absolute", left: CX - 150, top: EYE - 150, width: 300, height: 300, opacity: morph, transform: `scale(${0.7 + morph * 0.3})` }}>
      <ContactShadow cx={150} cy={300} w={260} />
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: grad("#2A3550", "#15203A"), boxShadow: SH }}>
        {/* timer rings */}
        <svg width={300} height={300} style={{ position: "absolute", inset: 0 }}>
          <circle cx={150} cy={150} r={128} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={8} />
          <circle cx={150} cy={150} r={128} fill="none" stroke={GREEN} strokeWidth={8} strokeLinecap="round" strokeDasharray={2 * Math.PI * 128} strokeDashoffset={2 * Math.PI * 128 * (1 - ringT)} transform="rotate(-90 150 150)" opacity={auto} />
          {auto > 0.3 && <circle cx={150 + Math.cos((ringT * 6.28 - 1.57)) * 128} cy={150 + Math.sin((ringT * 6.28 - 1.57)) * 128} r={9} fill={GREEN} />}
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6 }}>
          <ClaudeSun size={66} glow={0.7} spin={lf} />
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 30, letterSpacing: "0.14em", color: auto > 0.5 ? GREEN : "#8a93ad", transform: `scale(${1 + (auto > 0.5 ? Math.max(0, Math.sin(lf / 6)) * 0.04 : 0)})` }}>{auto > 0.5 ? "AUTO" : "MANUAL"}</div>
        </div>
        <Sheen r="50%" o={0.14} />
      </div>
    </div>
    {/* closed laptop — Claude still working inside (Zzz; the caption carries the words) */}
    <div style={{ position: "absolute", left: CX - 92, top: EYE + 188, opacity: ramp(lf, 62, 80), transform: `scale(${0.86 + ramp(lf, 62, 84) * 0.14})` }}>
      <div style={{ width: 184, height: 120, borderRadius: 18, background: grad("#2E3A56", "#1A2440"), boxShadow: `${SH}, 0 0 ${Math.round(34 * lid)}px rgba(210,114,78,0.5)`, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 13, height: 13, borderRadius: "50%", background: CLAY, boxShadow: `0 0 18px ${CLAY}`, opacity: 0.45 + 0.45 * Math.sin(lf / 6) }} />
        <Sheen r={18} />
      </div>
      <div style={{ width: 208, height: 12, borderRadius: "0 0 14px 14px", background: "#141D33", marginLeft: -12 }} />
      {[0, 1, 2].map((i) => { const zt = ramp(lf, 78 + i * 9, 96 + i * 9); return <span key={i} style={{ position: "absolute", left: 176 + i * 14, top: -4 - i * 24 - zt * 12, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 22 + i * 9, color: "#a6b0cc", opacity: zt * (1 - ramp(lf, 122 + i * 9, 142 + i * 9)) }}>z</span>; })}
    </div>
  </AbsoluteFill>); };

// ===== S3 NIGHT — data stream becomes a document =====
const StreamDocScene: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s);
  const build = ramp(lf, 18, 78); const fold = ramp(lf, 92, 108); const set = over(lf, 0, 12);
  return (<AbsoluteFill>
    <Bloom cx={CX} cy={EYE} w={1000} color="rgba(62,108,240,0.3)" lf={lf} base={0.4} />
    <div style={{ position: "absolute", top: 462, left: 0, right: 0, textAlign: "center", opacity: ramp(lf, 4, 16) }}><span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 54, color: "#F0EBDF" }}>2 AM — it gets to <span style={{ color: CLAY }}>work</span></span></div>
    {/* data particles streaming through sunburst into doc */}
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>{Array.from({ length: 26 }).map((_, i) => { const t = ((lf * 0.04) + i / 26) % 1; const ang = (i * 2.4); const r = interpolate(t, [0, 1], [460, 0]); const x = CX + Math.cos(ang) * r; const y = EYE + Math.sin(ang) * r * 0.7; const col = [SLATE, GREEN, AMBER][i % 3]; return <circle key={i} cx={x} cy={y} r={interpolate(t, [0, 1], [7, 2])} fill={col} opacity={(1 - t) * 0.9} />; })}</svg>
    <div style={{ position: "absolute", left: CX - 46, top: EYE - 180, transform: `scale(${1 + Math.sin(lf / 4) * 0.06})` }}><ClaudeSun size={92} glow={0.9} spin={lf * 2} /></div>
    {/* building document */}
    <div style={{ position: "absolute", left: CX - 170, top: EYE - 30, width: 340, borderRadius: 16, background: "#fff", boxShadow: SH, padding: "22px 24px", opacity: Math.min(set, 1), transform: `translateY(${fold * 120}px) scale(${1 - fold * 0.5})` }}>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 26, color: INK, opacity: ramp(lf, 18, 28) }}>Weekly Report</div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 80, marginTop: 16 }}>{[60, 78, 48, 70, 88].map((h, j) => <div key={j} style={{ width: 40, height: h * Math.min(1, ramp(lf, 30 + j * 6, 44 + j * 6)), borderRadius: "4px 4px 0 0", background: grad("#5A86FF", "#3E6CF0") }} />)}</div>
      {[1, 0.8, 0.6].map((wd, j) => <div key={j} style={{ height: 9, width: `${wd * 100}%`, borderRadius: 5, background: "rgba(20,26,45,0.1)", marginTop: 12, transform: `scaleX(${ramp(lf, 50 + j * 6, 62 + j * 6)})`, transformOrigin: "left" }} />)}
      <Glint lf={lf} start={70} r={16} />
    </div>
    {/* folder */}
    <div style={{ position: "absolute", left: CX - 70, top: EYE + 150, width: 140, height: 100, opacity: ramp(lf, 86, 98) }}><div style={{ width: 140, height: 96, borderRadius: "6px 14px 14px 14px", background: grad("#E3A24F", "#C5832F"), boxShadow: `${IMSH}, 0 0 ${fold * 30}px rgba(207,149,68,0.6)` }}><div style={{ width: 64, height: 16, borderRadius: "6px 6px 0 0", background: "#E3A24F", marginTop: -12 }} /></div></div>
  </AbsoluteFill>); };

// ===== S4 PAYOFF — sunrise, it's done =====
const SunriseScene: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s);
  const rise = eOut(lf, 4, 30); const check = over(lf, 40, 16); const sunY = interpolate(rise, [0, 1], [EYE + 220, EYE - 110]);
  return (<AbsoluteFill>
    <Bloom cx={CX} cy={sunY} w={900} color="rgba(207,149,68,0.55)" lf={lf} base={0.6} />
    {/* sun (sunburst becomes sun) */}
    <div style={{ position: "absolute", left: CX - 70, top: sunY - 70 }}>
      <svg width={420} height={420} style={{ position: "absolute", left: -140, top: -140 }}>{Array.from({ length: 16 }).map((_, i) => { const a = (i / 16) * Math.PI * 2 + lf * 0.01; const r1 = 110, r2 = 110 + 50 * (0.6 + 0.4 * Math.sin(lf / 6 + i)); return <line key={i} x1={210 + Math.cos(a) * r1} y1={210 + Math.sin(a) * r1} x2={210 + Math.cos(a) * r2} y2={210 + Math.sin(a) * r2} stroke="rgba(207,149,68,0.5)" strokeWidth={5} strokeLinecap="round" opacity={rise} />; })}</svg>
      <ClaudeSun size={140} glow={1.0} spin={lf * 0.6} />
    </div>
    <div style={{ position: "absolute", top: 466, left: 0, right: 0, textAlign: "center", opacity: ramp(lf, 2, 16) }}><span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 58, color: INK }}>you wake up — <span style={{ color: AMBER }}>done.</span></span></div>
    {/* finished doc */}
    <div style={{ position: "absolute", left: CX - 150, top: EYE + 60, width: 300, borderRadius: 16, background: "#fff", boxShadow: SH, padding: "20px 22px", opacity: ramp(lf, 10, 24), transform: `scale(${0.9 + ramp(lf, 10, 26) * 0.1})` }}>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 24, color: INK }}>Weekly Report</div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 9, height: 56, marginTop: 12 }}>{[50, 66, 40, 60].map((h, j) => <div key={j} style={{ width: 36, height: h, borderRadius: "3px 3px 0 0", background: grad("#E3A24F", "#C5832F") }} />)}</div>
      <Glint lf={lf} start={14} r={16} />
    </div>
    {lf >= 40 && <div style={{ position: "absolute", left: CX - 46, top: EYE + 200, width: 92, height: 92, borderRadius: "50%", background: GREEN, border: "5px solid #FCFAF6", boxShadow: "0 10px 24px rgba(63,158,116,0.5)", display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${interpolate(check, [0, 0.6, 1], [1.5, 0.9, 1])}) rotate(${interpolate(check, [0, 1], [-14, -6])}deg)`, opacity: ramp(lf, 40, 50) }}><span style={{ color: "#fff", fontSize: 52, fontWeight: 900 }}>✓</span></div>}
  </AbsoluteFill>); };

// ===== CTA =====
const CTA: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const local = f - fr(s); if (local < 0) return null; const a = eOut(f, fr(s) + 2, 12); const pillPop = over(local, 12, 14); const pulse = 1 + Math.sin(f / 7) * 0.03;
  return (<AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingBottom: 210 }}>
    {Array.from({ length: 14 }, (_, i) => { const p = eOut(f, fr(s) + 4 + (i % 12), 28); const ang = (i / 7) * Math.PI; if (p <= 0 || p >= 1) return null; return <div key={i} style={{ position: "absolute", left: 540 + Math.cos(ang) * p * 360, top: 820 + Math.sin(ang) * p * 360, fontSize: 26, opacity: Math.sin(p * Math.PI), color: [SLATE, CLAY, GREEN, AMBER][i % 4] }}>✦</div>; })}
    <div style={{ marginTop: -150, transform: `scale(${0.7 + a * 0.3})`, opacity: a }}><ClaudeSun size={132} glow={0.7} /></div>
    <div style={{ marginTop: 40, transform: `scale(${(0.8 + pillPop * 0.2) * pulse})`, padding: "26px 54px", borderRadius: 999, background: CLAY, color: "#fff", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 62, boxShadow: "0 24px 54px rgba(210,114,78,0.42)", opacity: a }}>💬 Comment "NIGHTSHIFT"</div>
    <div style={{ marginTop: 26, fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 600, fontSize: 42, color: INK, opacity: a, textAlign: "center" }}>and I'll send the exact setup</div>
  </AbsoluteFill>); };

// ===== captions =====
type Word = { word: string; start: number; end: number; line: number };
const WORDS = wordsData as Word[];
const cleanw = (w: string) => w.toLowerCase().replace(/[^a-z0-9'$.]/g, "");
const EMPH = new Set(["night", "shift", "sleep", "asleep", "schedule", "agent", "timer", "week", "every", "forever", "90", "minutes", "2am", "report", "folder", "7", "done", "prompt", "babysitting", "comment", "nightshift", "setup", "claude", "once", "automatically"]);
const CHUNKS = (() => { const byLine: Record<number, Word[]> = {}; for (const w of WORDS) (byLine[w.line] ||= []).push(w); const out: { words: Word[]; start: number; line: number }[] = []; for (const li of Object.keys(byLine).map(Number).sort((a, b) => a - b)) { const ws = byLine[li]; for (let i = 0; i < ws.length; i += 3) { const g = ws.slice(i, i + 3); out.push({ words: g, start: g[0].start, line: li }); } } const aE = Math.max(...WORDS.map((w) => w.end)); return out.map((c, i) => ({ ...c, end: i + 1 < out.length ? out[i + 1].start : aE + 0.4 })); })();
const Captions: React.FC = () => { const frame = useCurrentFrame();
  return (<>{CHUNKS.map((c, i) => { if (frame < fr(c.start) || frame >= fr(c.end)) return null; if (c.line === 5) return null;
    return (<div key={i} style={{ position: "absolute", top: 1244, left: 64, right: 64, height: 170, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "center", gap: "0 15px", width: 952, textAlign: "center" }}>
        {c.words.map((w, j) => { const g = EMPH.has(cleanw(w.word)); const shown = frame >= fr(w.start); return <span key={j} style={{ display: "inline-block", opacity: shown ? 1 : 0, fontFamily: g ? frauncesItalic.fontFamily : fraunces.fontFamily, fontStyle: g ? "italic" : "normal", fontWeight: g ? 700 : 600, fontSize: g ? 76 : 66, lineHeight: 1.04, color: g ? SLATE : INK, letterSpacing: "-0.02em", textShadow: "0 2px 14px rgba(236,233,226,0.96), 0 1px 2px rgba(236,233,226,1)" }}>{w.word}</span>; })}
      </div></div>); })}</>); };

const ProgressBar: React.FC = () => { const f = useCurrentFrame(); const { durationInFrames } = useVideoConfig(); const p = Math.min(1, f / (durationInFrames - 1));
  return (<div style={{ position: "absolute", left: 46, right: 46, top: 200, height: 13, borderRadius: 999, zIndex: 120 }}><div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.16)", borderRadius: 999 }} /><div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${p * 100}%`, background: grad("#E08A66", "#C5603C"), borderRadius: 999, boxShadow: "0 2px 8px rgba(210,114,78,0.45)" }} /><div style={{ position: "absolute", left: `${p * 100}%`, top: -3, width: 19, height: 19, borderRadius: "50%", background: CLAY, border: "3px solid #F3EFE7", boxShadow: "0 0 12px rgba(210,114,78,0.9)", transform: "translateX(-50%)" }} /></div>); };

const L = [0, 5.64, 13.28, 20.12, 23.86, 26.68];
const Scene: React.FC<{ s: number; e: number; children: React.ReactNode }> = ({ s, e, children }) => { const frame = useCurrentFrame(); const local = frame - fr(s); const lenF = fr(e - s); if (local < 0 || local > lenF) return null; const inF = s <= 0 ? 1 : eOut(frame, fr(s), 6); const op = Math.min(inF, 1 - eOut(frame, fr(e - 0.14), 5)); return <AbsoluteFill style={{ opacity: op }}>{children}</AbsoluteFill>; };
const Sfx: React.FC<{ at: number; src: string; v?: number; dur?: number }> = ({ at, src, v = 0.3, dur = 2.5 }) => (<Sequence from={fr(at)} durationInFrames={fr(dur)}><Audio src={staticFile(`sfx/${src}`)} volume={v} /></Sequence>);
const Ticks: React.FC<{ start: number; n: number; step: number; src?: string; v?: number }> = ({ start, n, step, src = "key.wav", v = 0.22 }) => (<>{Array.from({ length: n }, (_, i) => <Sfx key={i} at={start + i * step} src={src} v={v} dur={0.5} />)}</>);

export const ClaudeNightshiftReel: React.FC = () => { const lf = useCurrentFrame(); const zoom = interpolate(lf, [0, 16, 28], [1.0, 1.03, 1.0], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  return (<AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
    <Audio src={staticFile("vo_nightshift.wav")} />
    <Audio loop src={staticFile("seo_music.wav")} volume={(ff) => interpolate(ff, [0, fr(1.6), fr(L[5]) - 10, fr(L[5]) + 16, 99999], [0, 0.19, 0.19, 0.14, 0.14], { extrapolateRight: "clamp" })} />
    <Sfx at={0} src="metal_riser.wav" v={0.7} /><Sfx at={0} src="sub.wav" v={0.7} /><Sfx at={0.3} src="shimmer.wav" v={0.5} /><Sfx at={1.5} src="ding.wav" v={0.4} />
    {L.slice(1).map((t, i) => <React.Fragment key={i}><Sfx at={t - 0.12} src="swish.wav" v={0.42} /><Sfx at={t + 0.3} src="pop.wav" v={0.3} /></React.Fragment>)}
    <Sfx at={15.6} src="snap.wav" v={0.42} /><Ticks start={20.6} n={3} step={0.9} src="blip3.wav" v={0.28} />
    <Sfx at={24.0} src="ding.wav" v={0.5} /><Sfx at={24.4} src="resolve.wav" v={0.4} />
    <Sfx at={L[5]} src="resolve.wav" v={0.5} /><Sfx at={L[5] + 0.2} src="angelic.wav" v={0.4} dur={3.4} /><Sfx at={L[5] + 0.4} src="sparkle.wav" v={0.5} />
    <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "50% 46%" }}>
      <SkyWorld />
      <Scene s={L[0]} e={L[1]}><MoonScene lf={lf} /></Scene>
      <Scene s={L[1]} e={L[2]}><TreadmillScene s={L[1]} /></Scene>
      <Scene s={L[2]} e={L[3]}><DialScene s={L[2]} /></Scene>
      <Scene s={L[3]} e={L[4]}><StreamDocScene s={L[3]} /></Scene>
      <Scene s={L[4]} e={L[5]}><SunriseScene s={L[4]} /></Scene>
      <CTA s={L[5]} />
      <Captions />
    </AbsoluteFill>
    <ProgressBar />
  </AbsoluteFill>); };
