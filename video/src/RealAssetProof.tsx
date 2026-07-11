import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { fraunces, frauncesItalic, inter } from "./fonts";

// proof of the real-asset editorial style: real app-icon tiles (logos) on cream paper + serif caption
const CREAM = "#ECE9E2", INK = "#1A1813", SLATE = "#3A5C84", CLAY = "#D2724E";
const CLAUDE_PATH = "m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z";
const eOut = (f: number, s: number, d = 8) => interpolate(f, [s, s + d], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

const AppIcon: React.FC<{ logo?: string; claude?: boolean; size: number; x: number; y: number; delay: number; dark?: boolean }> = ({ logo, claude, size, x, y, delay, dark = true }) => {
  const frame = useCurrentFrame(); const e = eOut(frame, delay, 9); const bob = Math.sin((frame + x) / 26) * 7;
  const bg = claude ? "linear-gradient(155deg,#E08A66 0%,#C5603C 100%)" : dark ? "linear-gradient(155deg,#3F5A82 0%,#293A58 100%)" : "linear-gradient(155deg,#FFFFFF,#EFEDE6)";
  return (
    <div style={{ position: "absolute", left: x - size / 2, top: y - size / 2 + bob, width: size, height: size, borderRadius: size * 0.235, background: bg, boxShadow: "0 36px 64px rgba(40,32,20,0.22), 0 12px 22px rgba(40,32,20,0.12), inset 0 2px 0 rgba(255,255,255,0.28)", border: "1px solid rgba(0,0,0,0.05)", display: "flex", alignItems: "center", justifyContent: "center", opacity: Math.min(1, e * 1.3), transform: `translateY(${(1 - e) * 34}px) scale(${0.66 + e * 0.34})` }}>
      {claude
        ? <svg viewBox="0 0 24 24" width={size * 0.58} height={size * 0.58}><path fill="#F6EFE6" d={CLAUDE_PATH} /></svg>
        : <Img src={staticFile(`img/logos/${logo}.svg`)} style={{ width: size * 0.5, height: size * 0.5, filter: dark ? "brightness(0) invert(1)" : "none" }} />}
    </div>
  );
};

export const RealAssetProof: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = 540, cy = 1140, R = 360;
  const tools = [
    { logo: "github", a: -90 }, { logo: "openai", a: -30 }, { logo: "n8n", a: 30 },
    { logo: "cursor", a: 90 }, { logo: "notion", a: 150 }, { logo: "slack", a: 210 },
  ];
  const drift = Math.sin(frame / 90) * 6;
  return (
    <AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
      {/* cream paper grid + grain */}
      <AbsoluteFill style={{ transform: `translate(${drift}px,${drift * 0.6}px)`, backgroundImage: "linear-gradient(rgba(26,24,19,0.045) 1px,transparent 1px),linear-gradient(90deg,rgba(26,24,19,0.045) 1px,transparent 1px)", backgroundSize: "66px 66px" }} />
      <AbsoluteFill style={{ opacity: 0.05, mixBlendMode: "multiply" }}><svg width="100%" height="100%"><filter id="pp"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves={2} stitchTiles="stitch" /></filter><rect width="100%" height="100%" filter="url(#pp)" /></svg></AbsoluteFill>
      <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 46%, rgba(0,0,0,0) 58%, rgba(40,32,20,0.09) 100%)" }} />

      {/* caption */}
      <div style={{ position: "absolute", top: 360, left: 70, right: 70, textAlign: "center" }}>
        <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 600, fontSize: 104, color: INK, letterSpacing: "-0.02em" }}>one </span>
        <span style={{ fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 700, fontSize: 104, color: SLATE, letterSpacing: "-0.02em" }}>system</span>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 600, fontSize: 104, color: INK, letterSpacing: "-0.02em", marginTop: 4 }}>— every tool.</div>
      </div>

      {/* connecting lines (the system) */}
      <svg style={{ position: "absolute", inset: 0 }} width={1080} height={1920}>
        {tools.map((t, i) => { const a = (t.a * Math.PI) / 180; const e = eOut(frame, 8 + i * 4, 14); const x2 = cx + Math.cos(a) * R * e, y2 = cy + Math.sin(a) * R * e;
          return <line key={i} x1={cx} y1={cy} x2={x2} y2={y2} stroke="rgba(58,92,132,0.4)" strokeWidth={4} strokeLinecap="round" />; })}
      </svg>

      {/* tool app-icons around */}
      {tools.map((t, i) => { const a = (t.a * Math.PI) / 180; return <AppIcon key={i} logo={t.logo} size={150} x={cx + Math.cos(a) * R} y={cy + Math.sin(a) * R} delay={12 + i * 4} dark />; })}
      {/* central Claude icon */}
      <AppIcon claude size={224} x={cx} y={cy} delay={2} />
    </AbsoluteFill>
  );
};
