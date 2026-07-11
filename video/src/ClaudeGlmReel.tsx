import React from "react";
import { AbsoluteFill, Audio, Easing, Img, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { fraunces, frauncesItalic, inter } from "./fonts";
import wordsData from "./data/words_glm.json";

/** ClaudeGlmReel — "Stop overpaying for Claude Code: GLM-5.2 = Opus at 1/5 the price" (SWAP). Real-screen + Saraev annotations + editorial. */
const CREAM = "#ECE9E2", INK = "#1A1813", SLATE = "#3A5C84", CLAY = "#D2724E", AMBER = "#CF9544", GREEN = "#3F9E74", MUTE = "#9A968B", RED = "#C44A3A", BLUE = "#3E6CF0", GH = "#0D1117";
const FPS = 30; const fr = (s: number) => s * FPS; const CX = 540;
const eOut = (f: number, sF: number, d = 10) => interpolate(f, [sF, sF + d], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
const ramp = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const over = (f: number, sF: number, d = 12) => interpolate(f, [sF, sF + d * 0.5, sF + d], [0, 1.12, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
const eio = (f: number, a: number, b: number, va: number, vb: number) => interpolate(f, [a, b], [va, vb], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
const grad = (a: string, b: string) => `linear-gradient(158deg, ${a} 0%, ${b} 100%)`;
const CLAUDE_PATH = "m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z";
const SH = "inset 0 1.5px 0 rgba(255,255,255,0.5), 0 2px 4px rgba(34,30,24,0.22), 0 14px 30px rgba(34,30,24,0.22), 0 40px 74px rgba(20,26,45,0.30)";
const IMSH = "0 14px 30px rgba(40,32,20,0.26), 0 4px 10px rgba(40,32,20,0.14)";
const mono = "ui-monospace, 'SF Mono', Menlo, monospace";
const Sheen: React.FC<{ r: number | string; o?: number }> = ({ r, o = 0.3 }) => (<div style={{ position: "absolute", inset: 0, borderRadius: r, background: `linear-gradient(125deg, rgba(255,255,255,${o}) 0%, rgba(255,255,255,0) 32%)`, pointerEvents: "none" }} />);
const Glint: React.FC<{ lf: number; start: number; dur?: number; r: number | string }> = ({ lf, start, dur = 16, r }) => { const t = ramp(lf, start, start + dur); if (t <= 0 || t >= 1) return null; return (<div style={{ position: "absolute", inset: 0, borderRadius: r, overflow: "hidden", pointerEvents: "none" }}><div style={{ position: "absolute", top: "-30%", left: `${interpolate(t, [0, 1], [-40, 130])}%`, width: "34%", height: "160%", background: "linear-gradient(105deg, transparent, rgba(255,255,255,0.5), transparent)", transform: "rotate(9deg)" }} /></div>); };
const Bloom: React.FC<{ cx: number; cy: number; w: number; color: string; lf: number; base?: number }> = ({ cx, cy, w, color, lf, base = 0.55 }) => (<div style={{ position: "absolute", left: cx - w / 2, top: cy - w / 2, width: w, height: w, borderRadius: "50%", background: `radial-gradient(circle at 50% 46%, ${color} 0%, transparent 62%)`, opacity: base + Math.sin(lf / 9) * 0.18, pointerEvents: "none" }} />);
const ClaudeMark: React.FC<{ size: number; glow?: number }> = ({ size, glow = 0.4 }) => (<div style={{ position: "relative", width: size, height: size, borderRadius: size * 0.28, background: grad("#E08A66", "#C5603C"), boxShadow: `${SH}, 0 0 ${Math.round(size * 0.34)}px rgba(210,114,78,${glow})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><svg viewBox="0 0 24 24" width={size * 0.58} height={size * 0.58}><path fill="#F6EFE6" d={CLAUDE_PATH} /></svg><Sheen r={size * 0.28} /></div>);
const GlmMark: React.FC<{ size: number }> = ({ size }) => (<div style={{ position: "relative", width: size, height: size, borderRadius: size * 0.28, background: grad("#5A86FF", "#2E55D8"), boxShadow: `${SH}, 0 0 ${Math.round(size * 0.32)}px rgba(62,108,240,0.45)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: size * 0.42, color: "#fff", letterSpacing: "-0.04em" }}>GLM</span><Sheen r={size * 0.28} /></div>);
// REAL Claude logo — bare clay sunburst (no box), with bloom + soft depth
const ClaudeSun: React.FC<{ size: number; glow?: number; spin?: number }> = ({ size, glow = 0.5, spin = 0 }) => (<div style={{ position: "relative", width: size, height: size, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ position: "absolute", inset: -size * 0.34, borderRadius: "50%", background: `radial-gradient(circle, rgba(210,114,78,${glow * 0.55}) 0%, transparent 64%)` }} /><svg viewBox="0 0 24 24" width={size} height={size} style={{ transform: `rotate(${spin}deg)`, filter: `drop-shadow(0 ${size * 0.035}px ${size * 0.07}px rgba(170,72,44,0.4))` }}><path fill={CLAY} d={CLAUDE_PATH} /></svg></div>);
const ClaudeCodeLogo: React.FC<{ markSize: number; fontSize: number; label?: string; color?: string; glow?: number }> = ({ markSize, fontSize, label = "Claude Code", color = INK, glow = 0.5 }) => (<div style={{ display: "flex", alignItems: "center", gap: markSize * 0.26 }}><ClaudeSun size={markSize} glow={glow} /><span style={{ fontFamily: fraunces.fontFamily, fontWeight: 600, fontSize, color, letterSpacing: "-0.02em" }}>{label}</span></div>);
const Background: React.FC = () => { const f = useCurrentFrame(); const d = Math.sin(f / 100) * 5; return (<AbsoluteFill style={{ background: "radial-gradient(120% 90% at 50% 8%, #F3F1EB 0%, #ECE9E2 46%, #E4E0D6 100%)" }}><div style={{ position: "absolute", inset: -40, opacity: 0.5, backgroundImage: "linear-gradient(rgba(58,92,132,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(58,92,132,0.05) 1px, transparent 1px)", backgroundSize: "62px 62px", transform: `translateY(${d}px)` }} /></AbsoluteFill>); };

// ===== browser + annotations =====
const Browser: React.FC<{ w: number; h: number; url: string; children: React.ReactNode }> = ({ w, h, url, children }) => (
  <div style={{ width: w, height: h, borderRadius: 18, overflow: "hidden", background: "#fff", boxShadow: SH, position: "relative" }}>
    <div style={{ height: 50, background: "#E9E6DF", display: "flex", alignItems: "center", padding: "0 18px", gap: 8, borderBottom: "1px solid #d6d2c9" }}><div style={{ display: "flex", gap: 8 }}>{["#FF5F57", "#FEBC2E", "#28C840"].map((c) => <div key={c} style={{ width: 14, height: 14, borderRadius: "50%", background: c }} />)}</div><div style={{ flex: 1, marginLeft: 14, height: 32, borderRadius: 9, background: "#fff", display: "flex", alignItems: "center", padding: "0 16px", fontFamily: inter.fontFamily, fontSize: 18, fontWeight: 500, color: "#6b6b6b", border: "1px solid #dcdcdc" }}>🔒 {url}</div></div>
    <div style={{ position: "absolute", top: 50, left: 0, right: 0, bottom: 0, overflow: "hidden" }}>{children}</div><Sheen r={18} o={0.1} /></div>);
const HiBox: React.FC<{ x: number; y: number; w: number; h: number; lf: number; at: number; color?: string; label?: string; lblSide?: "top" | "bottom" }> = ({ x, y, w, h, lf, at, color = CLAY, label, lblSide = "top" }) => { const p = ramp(lf, at, at + 12); if (p <= 0) return null; const pulse = 1 + Math.sin(lf / 6) * 0.014; return (<div style={{ position: "absolute", left: x, top: y, width: w, height: h * p, transform: `scale(${pulse})`, borderRadius: 12, border: `4px solid ${color}`, boxShadow: `0 0 22px ${color}88, inset 0 0 16px ${color}33`, opacity: p, zIndex: 25 }}>{label && p > 0.6 && <div style={{ position: "absolute", left: -2, [lblSide]: -44, padding: "6px 15px", borderRadius: 8, background: grad("#26221C", "#15120E"), color: "#F4EFE6", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 22, whiteSpace: "nowrap", boxShadow: IMSH, borderLeft: `3px solid ${color}` }}>{label}</div>}</div>); };
const Cursor: React.FC<{ x: number; y: number; click?: boolean }> = ({ x, y, click }) => (<div style={{ position: "absolute", left: x, top: y, zIndex: 30, pointerEvents: "none" }}>{click && <div style={{ position: "absolute", left: -16, top: -16, width: 40, height: 40, borderRadius: "50%", border: `3px solid ${CLAY}`, opacity: 0.7 }} />}<svg width={34} height={34} viewBox="0 0 24 24" style={{ filter: "drop-shadow(0 3px 5px rgba(0,0,0,0.4))" }}><path d="M5 3 L5 19 L9.5 14.8 L12.5 21 L15 20 L12 14 L18 13.5 Z" fill="#fff" stroke="#222" strokeWidth={1.3} strokeLinejoin="round" /></svg></div>);

// ===== real-screen pan + real z.ai logo =====
const SHOT: Record<string, number> = { glm_zai_full: 6566 / 1280, bh_site_a: 900 / 1400 };
const Screen: React.FC<{ img: string; vw: number; vh: number; focus: number; scale: number; focusX?: number }> = ({ img, vw, vh, focus, scale, focusX = 0.5 }) => { const ar = SHOT[img]; const dispW = vw * scale; const dispH = dispW * ar; const top = vh / 2 - focus * dispH; const left = vw / 2 - focusX * dispW; return (<Img src={staticFile(`refs/${img}.jpg`)} style={{ position: "absolute", width: dispW, height: dispH, left, top }} />); };
const GlmLogo: React.FC<{ size: number }> = ({ size }) => (<div style={{ width: size, height: size, borderRadius: size * 0.26, overflow: "hidden", boxShadow: `${SH}, 0 0 ${Math.round(size * 0.3)}px rgba(62,108,240,0.4)`, flexShrink: 0, background: "#2A2A2A" }}><Img src={staticFile("refs/zai_logo.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>);

// ===== recreated z.ai GLM-5.2 page (tall, scroll-panned) =====
const BAR = [{ n: "Claude Opus 4.8", v: 73, c: CLAY }, { n: "GLM-5.2", v: 71, c: BLUE }, { n: "GPT-5.2", v: 68, c: "#10A37F" }, { n: "Gemini 3", v: 64, c: AMBER }];
const PLANS = [{ n: "Lite", p: "$10", d: "~400 prompts / wk", hot: false }, { n: "Pro", p: "$30", d: "~2,000 prompts / wk", hot: true }, { n: "Max", p: "$80", d: "~8,000 prompts / wk", hot: false }];
const GlmPage: React.FC<{ lf: number }> = ({ lf }) => (
  <div style={{ width: 1040, background: "#0B1020", color: "#fff", fontFamily: inter.fontFamily }}>
    {/* nav */}
    <div style={{ height: 78, display: "flex", alignItems: "center", padding: "0 44px", gap: 16, borderBottom: "1px solid #1c2440" }}><GlmMark size={40} /><span style={{ fontWeight: 900, fontSize: 30, letterSpacing: "-0.02em" }}>Z.ai</span><div style={{ marginLeft: "auto", display: "flex", gap: 28, color: "#9fb0d6", fontWeight: 600, fontSize: 22 }}><span>Models</span><span>Pricing</span><span>Docs</span></div></div>
    {/* hero */}
    <div style={{ padding: "64px 44px 40px", textAlign: "center" }}>
      <div style={{ display: "inline-block", padding: "8px 20px", borderRadius: 999, background: "rgba(62,108,240,0.18)", border: `1px solid ${BLUE}`, color: "#9db8ff", fontWeight: 700, fontSize: 22, marginBottom: 24 }}>New · June 2026</div>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 128, lineHeight: 0.92, letterSpacing: "-0.04em" }}>GLM-5.2</div>
      <div style={{ fontSize: 38, color: "#aebbd9", marginTop: 18, fontWeight: 500 }}>Frontier coding & agents. <span style={{ color: BLUE, fontWeight: 800 }}>One fifth the price.</span></div>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginTop: 32, padding: "16px 30px", borderRadius: 14, background: grad("#5A86FF", "#2E55D8"), fontWeight: 800, fontSize: 26 }}>Run it in Claude Code →</div>
    </div>
    {/* benchmark */}
    <div style={{ padding: "44px 56px", margin: "20px 44px", borderRadius: 22, background: "#101831", border: "1px solid #1c2440" }}>
      <div style={{ fontWeight: 800, fontSize: 28, color: "#cdd8f0", marginBottom: 4 }}>SWE-bench Verified</div>
      <div style={{ color: "#6f7ea3", fontSize: 21, marginBottom: 30 }}>real coding tasks, % solved</div>
      {BAR.map((b, i) => (<div key={i} style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 20 }}><div style={{ width: 280, fontWeight: 700, fontSize: 25, color: b.n === "GLM-5.2" ? "#fff" : "#9fb0d6" }}>{b.n}</div><div style={{ flex: 1, height: 38, borderRadius: 8, background: "#0B1020", overflow: "hidden" }}><div style={{ width: `${b.v}%`, height: "100%", background: b.c, borderRadius: 8 }} /></div><div style={{ width: 70, textAlign: "right", fontWeight: 800, fontSize: 26, color: b.c }}>{b.v}</div></div>))}
    </div>
    {/* pricing */}
    <div style={{ padding: "48px 44px 70px", textAlign: "center" }}>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 60, marginBottom: 8 }}>GLM Coding Plan</div>
      <div style={{ color: "#8a99bd", fontSize: 26, marginBottom: 40 }}>works with Claude Code, Cline, Roo & more</div>
      <div style={{ display: "flex", gap: 24, justifyContent: "center" }}>{PLANS.map((p, i) => (<div key={i} style={{ width: 280, padding: "34px 26px", borderRadius: 22, background: p.hot ? grad("#16224a", "#0e1733") : "#101831", border: `2px solid ${p.hot ? BLUE : "#1c2440"}`, boxShadow: p.hot ? `0 0 40px rgba(62,108,240,0.4)` : "none" }}>{p.hot && <div style={{ display: "inline-block", padding: "4px 14px", borderRadius: 999, background: BLUE, fontWeight: 800, fontSize: 18, marginBottom: 14 }}>POPULAR</div>}<div style={{ fontWeight: 800, fontSize: 30, color: "#cdd8f0" }}>{p.n}</div><div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 76, margin: "8px 0" }}>{p.p}<span style={{ fontSize: 28, color: "#8a99bd" }}>/mo</span></div><div style={{ color: "#8a99bd", fontSize: 22 }}>{p.d}</div></div>))}</div>
    </div>
  </div>);
const ScrollPage: React.FC<{ vw: number; vh: number; scrollY: number; children: React.ReactNode }> = ({ vw, vh, scrollY, children }) => (<div style={{ width: vw, height: vh, overflow: "hidden", position: "relative", background: "#0B1020" }}><div style={{ position: "absolute", top: -scrollY, left: 0 }}>{children}</div></div>);

// terminal frame
const TermFrame: React.FC<{ w: number; title: string; accent?: string; children: React.ReactNode; glow?: boolean }> = ({ w, title, accent = "#8a8479", children, glow }) => (
  <div style={{ width: w, borderRadius: 18, overflow: "hidden", background: "#15120E", boxShadow: `${SH}${glow ? `, 0 0 50px rgba(62,108,240,0.28)` : ""}`, fontFamily: mono }}>
    <div style={{ height: 48, background: "#221D18", display: "flex", alignItems: "center", padding: "0 18px", gap: 8 }}><div style={{ display: "flex", gap: 8 }}>{["#FF5F57", "#FEBC2E", "#28C840"].map((c) => <div key={c} style={{ width: 14, height: 14, borderRadius: "50%", background: c }} />)}</div><span style={{ marginLeft: 14, color: accent, fontSize: 21, fontWeight: 600 }}>{title}</span></div>
    <div>{children}</div></div>);

// gauge geometry
const POL = (cx: number, cy: number, r: number, deg: number): [number, number] => { const a = (deg * Math.PI) / 180; return [cx + r * Math.cos(a), cy - r * Math.sin(a)]; };
const ARC = (cx: number, cy: number, r: number, d0: number, d1: number) => { const [x0, y0] = POL(cx, cy, r, d0); const [x1, y1] = POL(cx, cy, r, d1); const large = Math.abs(d1 - d0) > 180 ? 1 : 0; return `M ${x0} ${y0} A ${r} ${r} 0 ${large} 0 ${x1} ${y1}`; };
const BEZ = (p0: number[], p1: number[], p2: number[], p3: number[], t: number): [number, number] => { const u = 1 - t, a = u * u * u, b = 3 * u * u * t, c = 3 * u * t * t, d = t * t * t; return [a * p0[0] + b * p1[0] + c * p2[0] + d * p3[0], a * p0[1] + b * p1[1] + c * p2[1] + d * p3[1]]; };

// ===== S0 HOOK — REDLINE cost gauge slam =====
const HookGauge: React.FC<{ lf: number }> = ({ lf }) => {
  const CX2 = 540, CY = 794, RF = 284, RA = 230, SW = 34;
  const dOf = (v: number) => 180 - (v / 200) * 180;
  const jit = Math.sin(lf * 1.7) * interpolate(lf, [0, 42, 58], [2.2, 6, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const nd = lf < 60
    ? interpolate(lf, [0, 15, 42, 58], [-6, -8, -11, -13], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) + jit
    : interpolate(lf, [60, 88], [-13, dOf(12)], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const tip = POL(CX2, CY, RA - 6, nd), bl = POL(CX2, CY, 15, nd + 90), br = POL(CX2, CY, 15, nd - 90), tail = POL(CX2, CY, 46, nd + 180);
  const odo = Math.round(interpolate(lf, [60, 86], [200, 12], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const greenT = ramp(lf, 64, 92); const red = greenT < 0.45;
  const shake = interpolate(lf, [60, 63, 67, 71], [0, 7, -4, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const recoil = 1 + interpolate(lf, [60, 66, 74], [0, 0.04, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const set = over(lf, 0, 12); const lampOn = lf < 60 && Math.sin(lf * 0.85) > 0;
  const gz = POL(CX2, CY, RA, dOf(12)); const fly = over(lf, 42, 18); const ndCol = red ? "#EC5640" : "#49B98A";
  const lamp = POL(CX2, CY, RA - SW, dOf(186));
  return (<AbsoluteFill>
    <AbsoluteFill style={{ background: "radial-gradient(120% 80% at 50% 56%, transparent 40%, rgba(196,74,58,0.16) 100%)", opacity: (1 - greenT) * (0.7 + 0.3 * Math.sin(lf / 7)) }} />
    <AbsoluteFill style={{ background: "radial-gradient(120% 80% at 50% 56%, transparent 44%, rgba(63,158,116,0.16) 100%)", opacity: greenT }} />
    <Bloom cx={CX2} cy={CY} w={840} color={red ? "rgba(196,74,58,0.34)" : "rgba(63,158,116,0.34)"} lf={lf} base={0.5} />
    {/* headline */}
    <div style={{ position: "absolute", top: 266, left: 0, right: 0, textAlign: "center", transform: `scale(${0.93 + Math.min(set, 1) * 0.07})` }}>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 52, color: INK, letterSpacing: "-0.01em" }}>STOP OVERPAYING FOR</div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 6 }}><ClaudeSun size={64} glow={0.5} /><span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 88, color: INK, letterSpacing: "-0.03em" }}>Claude Code</span></div>
    </div>
    {/* instrument dial */}
    <div style={{ position: "absolute", inset: 0, transform: `translateX(${shake}px) scale(${recoil})`, transformOrigin: `${CX2}px ${CY}px` }}>
      <div style={{ position: "absolute", left: CX2 - RF, top: CY - RF, width: RF * 2, height: RF * 2, borderRadius: "50%", background: "radial-gradient(circle at 50% 30%, #2B3344 0%, #141A28 55%, #0A0D16 100%)", boxShadow: `${SH}, inset 0 4px 18px rgba(255,255,255,0.06), inset 0 -12px 34px rgba(0,0,0,0.6)`, border: "2px solid rgba(255,255,255,0.07)" }}><div style={{ position: "absolute", inset: 16, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.05)" }} /><Sheen r="50%" o={0.1} /></div>
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
        <defs><radialGradient id="hub"><stop offset="0%" stopColor="#EDEEF1" /><stop offset="52%" stopColor="#969cab" /><stop offset="100%" stopColor="#363b46" /></radialGradient></defs>
        <path d={ARC(CX2, CY, RA, 180, 0)} stroke="rgba(255,255,255,0.06)" strokeWidth={SW + 8} fill="none" strokeLinecap="round" />
        <path d={ARC(CX2, CY, RA, 180, 121)} stroke="#3F9E74" strokeWidth={SW} fill="none" strokeLinecap="round" />
        <path d={ARC(CX2, CY, RA, 119, 61)} stroke="#CF9544" strokeWidth={SW} fill="none" />
        <path d={ARC(CX2, CY, RA, 59, 0)} stroke="#D84A38" strokeWidth={SW} fill="none" strokeLinecap="round" />
        {red && <path d={ARC(CX2, CY, RA, 59, 0)} stroke="rgba(216,74,56,0.5)" strokeWidth={SW + 16} fill="none" strokeLinecap="round" opacity={0.45 + 0.4 * Math.sin(lf / 5)} />}
        {[0, 50, 100, 150, 200].map((v) => { const d = dOf(v); const a = POL(CX2, CY, RA - SW / 2 - 3, d), b = POL(CX2, CY, RA + SW / 2 + 3, d), l = POL(CX2, CY, RA + SW / 2 + 32, d); return (<g key={v}><line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="rgba(255,255,255,0.5)" strokeWidth={4} /><text x={l[0]} y={l[1]} fill="rgba(255,255,255,0.62)" fontSize={24} fontFamily={inter.fontFamily} fontWeight={700} textAnchor="middle" dominantBaseline="middle">${v}</text></g>); })}
        <polygon points={`${tip[0] + 3},${tip[1] + 4} ${br[0] + 3},${br[1] + 4} ${tail[0] + 3},${tail[1] + 4} ${bl[0] + 3},${bl[1] + 4}`} fill="rgba(0,0,0,0.4)" />
        <polygon points={`${tip[0]},${tip[1]} ${br[0]},${br[1]} ${tail[0]},${tail[1]} ${bl[0]},${bl[1]}`} fill={ndCol} />
        <circle cx={CX2} cy={CY} r={30} fill="#1a1e28" /><circle cx={CX2} cy={CY} r={21} fill="url(#hub)" />
      </svg>
      <div style={{ position: "absolute", left: tip[0] - 42, top: tip[1] - 42, width: 84, height: 84, borderRadius: "50%", background: `radial-gradient(circle, ${red ? "rgba(236,86,64,0.6)" : "rgba(73,185,138,0.6)"} 0%, transparent 64%)` }} />
      {lampOn && <div style={{ position: "absolute", left: lamp[0] - 11, top: lamp[1] - 11, width: 22, height: 22, borderRadius: "50%", background: RED, boxShadow: `0 0 20px ${RED}` }} />}
      {/* LCD readout */}
      <div style={{ position: "absolute", left: CX2 - 148, top: CY + 56, width: 296, height: 90, borderRadius: 14, background: "linear-gradient(#0A0D12,#05070A)", boxShadow: "inset 0 3px 10px rgba(0,0,0,0.7), inset 0 -1px 2px rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 62, color: greenT > 0.5 ? "#5BE0A4" : "#FF6A52", textShadow: `0 0 16px ${greenT > 0.5 ? "rgba(91,224,164,0.6)" : "rgba(255,106,82,0.6)"}`, letterSpacing: "-0.02em" }}>${odo}<span style={{ fontSize: 30, color: "rgba(255,255,255,0.5)" }}>/mo</span></span>
      </div>
    </div>
    {greenT > 0.6 && <div style={{ position: "absolute", top: 1100, left: 0, right: 0, textAlign: "center", opacity: ramp(lf, 90, 102), transform: `scale(${0.8 + ramp(lf, 90, 102) * 0.2})` }}><span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 36, color: "#fff", background: GREEN, padding: "9px 24px", borderRadius: 999, boxShadow: "0 8px 22px rgba(63,158,116,0.4)" }}>✓ one fifth the price</span></div>}
    {lf >= 42 && <div style={{ position: "absolute", left: interpolate(fly, [0, 1], [902, gz[0] - 46]), top: interpolate(fly, [0, 1], [610, gz[1] - 46]), opacity: ramp(lf, 42, 52), transform: `scale(${0.7 + fly * 0.3})` }}><GlmLogo size={92} /></div>}
  </AbsoluteFill>);
};

// ===== S0 HOOK — cancel the $200 Claude subscription, re-subscribe to GLM at $12 =====
const HookSubscription: React.FC<{ lf: number }> = ({ lf }) => {
  const set = over(lf, 0, 12);
  const press = interpolate(lf, [28, 35, 44], [0, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const greenT = ramp(lf, 58, 84);
  const odo = Math.round(interpolate(lf, [58, 84], [200, 12], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const claudeI = 1 - ramp(lf, 60, 76); const glmI = ramp(lf, 64, 82);
  const stamp = over(lf, 88, 16); const underline = ramp(lf, 102, 118);
  const shakeX = interpolate(lf, [30, 33, 37, 41, 58, 61, 65, 70], [0, 4, -3, 0, 0, 9, -6, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const flash = interpolate(lf, [56, 61, 73], [0, 0.32, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const pricePulse = greenT < 0.5 ? 1 + Math.max(0, Math.sin(lf / 5)) * 0.05 : 1;
  const CL = 110, CT = 716, CWd = 860, btnTop = 926;
  const curX = interpolate(lf, [0, 20], [700, 600], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const curY = interpolate(lf, [0, 20], [880, btnTop + 38], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const click = lf >= 30 && lf <= 44;
  return (<AbsoluteFill>
    <Bloom cx={540} cy={720} w={1060} color={greenT > 0.5 ? "rgba(63,158,116,0.16)" : "rgba(196,74,58,0.14)"} lf={lf} base={0.45} />
    <div style={{ position: "absolute", top: 470, left: 0, right: 0, textAlign: "center", transform: `scale(${0.94 + Math.min(set, 1) * 0.06})` }}>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 80, color: INK, lineHeight: 1.02, letterSpacing: "-0.02em" }}>Stop overpaying for<br /><span style={{ color: CLAY }}>Claude Code</span></div>
    </div>
    <div style={{ position: "absolute", left: CL, top: CT, width: CWd, borderRadius: 34, background: "#FCFAF6", boxShadow: SH, overflow: "hidden", transform: `translateX(${shakeX}px) scale(${0.96 + Math.min(set, 1) * 0.04})`, transformOrigin: "50% 40%" }}>
      <div style={{ padding: "24px 36px", borderBottom: "1px solid rgba(0,0,0,0.07)", fontWeight: 700, fontSize: 29, color: MUTE }}>Subscriptions</div>
      <div style={{ padding: "28px 36px", display: "flex", alignItems: "center", gap: 24 }}>
        <div style={{ position: "relative", width: 86, height: 86, flexShrink: 0 }}>
          <div style={{ position: "absolute", inset: 0, opacity: claudeI }}><ClaudeMark size={86} glow={0.4} /></div>
          <div style={{ position: "absolute", inset: 0, opacity: glmI, transform: `scale(${0.82 + glmI * 0.18})` }}><GlmLogo size={86} /></div>
        </div>
        <div style={{ flex: 1, position: "relative", height: 72 }}>
          <div style={{ position: "absolute", inset: 0, opacity: claudeI }}><div style={{ fontWeight: 800, fontSize: 37, color: INK }}>Claude Code</div><div style={{ fontWeight: 500, fontSize: 25, color: MUTE, marginTop: 5 }}>Renews monthly</div></div>
          <div style={{ position: "absolute", inset: 0, opacity: glmI }}><div style={{ fontWeight: 800, fontSize: 37, color: INK }}>GLM-5.2</div><div style={{ fontWeight: 500, fontSize: 25, color: MUTE, marginTop: 5 }}>in Claude Code</div></div>
        </div>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 54, color: greenT > 0.5 ? GREEN : RED, textAlign: "right", transform: `scale(${pricePulse})`, transformOrigin: "right center" }}>${odo}<span style={{ fontSize: 26, color: MUTE, fontFamily: inter.fontFamily }}>/mo</span>{underline > 0 && <div style={{ height: 5, background: GREEN, borderRadius: 3, width: `${underline * 100}%`, marginLeft: "auto", marginTop: 3 }} />}</div>
      </div>
      <div style={{ margin: "4px 36px 34px", position: "relative", height: 80 }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: 16, background: RED, color: "#fff", fontWeight: 800, fontSize: 34, display: "flex", alignItems: "center", justifyContent: "center", opacity: 1 - greenT, transform: `scale(${1 - press * 0.04})` }}>Cancel Subscription</div>
        <div style={{ position: "absolute", inset: 0, borderRadius: 16, background: GREEN, color: "#fff", fontWeight: 800, fontSize: 34, display: "flex", alignItems: "center", justifyContent: "center", gap: 12, opacity: greenT }}>Subscribed&nbsp;&nbsp;✓</div>
      </div>
      <Sheen r={34} />
    </div>
    {lf >= 88 && <div style={{ position: "absolute", left: 0, right: 0, top: 1072, textAlign: "center", opacity: ramp(lf, 88, 100), transform: `scale(${interpolate(stamp, [0, 0.6, 1], [1.4, 0.94, 1])}) rotate(-5deg)` }}><span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 40, color: "#fff", background: GREEN, padding: "12px 30px", borderRadius: 999, boxShadow: "0 10px 26px rgba(63,158,116,0.4)" }}>✓ one fifth the price</span></div>}
    {lf < 58 && <div style={{ position: "absolute", left: curX, top: curY, zIndex: 30 }}>{click && <div style={{ position: "absolute", left: -18, top: -18, width: 44, height: 44, borderRadius: "50%", border: `3px solid ${INK}`, opacity: 0.5 }} />}<svg width={38} height={38} viewBox="0 0 24 24" style={{ filter: "drop-shadow(0 3px 5px rgba(0,0,0,0.4))" }}><path d="M5 3 L5 19 L9.5 14.8 L12.5 21 L15 20 L12 14 L18 13.5 Z" fill="#fff" stroke="#222" strokeWidth={1.3} strokeLinejoin="round" /></svg></div>}
    {flash > 0 && <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 54%, rgba(150,180,255,0.5), rgba(255,255,255,0.22) 58%, transparent 75%)", opacity: flash, pointerEvents: "none" }} />}
  </AbsoluteFill>);
};

const Scene: React.FC<{ s: number; e: number; children: React.ReactNode }> = ({ s, e, children }) => { const frame = useCurrentFrame(); const local = frame - fr(s); const lenF = fr(e - s); if (local < 0 || local > lenF) return null; const inF = s <= 0 ? 1 : eOut(frame, fr(s), 5); const op = Math.min(inF, 1 - eOut(frame, fr(e - 0.16), 6)); const inE = eOut(frame, fr(s), 12); return <AbsoluteFill style={{ opacity: op, transform: `scale(${0.99 + inE * 0.01})` }}>{children}</AbsoluteFill>; };

// ===== S1 WHAT — real z.ai benchmark chart, circle GLM vs Claude =====
const BENCH = [
  { n: "AIME 25", v: [93.9, 85.4, 89.3, 74.3, 87.0], tools: 98.6 },
  { n: "GPQA", v: [81.0, 79.9, 79.9, 77.7, 83.4], tools: 82.9 },
  { n: "LiveCodeBench v6", v: [82.8, 63.3, 70.1, 48.9, 57.7], tools: 84.5 },
  { n: "HLE", v: [17.2, 14.4, 19.8, 9.6, 17.3], tools: 30.4 },
  { n: "BrowseComp", v: [45.1, 26.4, 40.1, 14.7, 19.6], tools: 0 },
  { n: "SWE-bench Verified", v: [68.0, 64.2, 67.8, 72.5, 77.2], tools: 0 },
  { n: "Terminal-Bench", v: [40.5, 37.5, 37.7, 35.5, 50.0], tools: 0 },
  { n: "τ²-Bench", v: [75.9, 67.5, 53.4, 66.0, 88.1], tools: 0 },
];
const BMODELS = [{ n: "GLM-4.6", c: "#3E6CF0" }, { n: "GLM-4.5", c: "#3F9E74" }, { n: "DeepSeek-V3.2", c: "#AAB0BA" }, { n: "Claude Sonnet 4", c: "#C8CDD4" }, { n: "Claude Sonnet 4.5", c: "#AEB4BD" }];
const isCmp = (i: number) => i === 0 || i === 4;
const GlmBenchChart: React.FC<{ hl: number }> = ({ hl }) => { const PH = 152;
  return (<div style={{ width: 1000, height: 770, background: "#fff", padding: "30px 36px 24px", fontFamily: inter.fontFamily, position: "relative" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 20 }}>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 33, color: INK, lineHeight: 1.08 }}>LLM Performance Evaluation:<br />Agentic, Reasoning and Coding</div>
      <div style={{ width: 46, height: 46, borderRadius: 11, overflow: "hidden", flexShrink: 0 }}><Img src={staticFile("refs/zai_logo.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>
    </div>
    <div style={{ fontSize: 16, color: "#73777e", marginTop: 10 }}>8 benchmarks · evaluation results under 128K context length</div>
    <div style={{ display: "flex", gap: 18, marginTop: 16, flexWrap: "wrap" }}>{BMODELS.map((m, i) => (<div key={i} style={{ display: "flex", alignItems: "center", gap: 8, position: "relative", padding: "4px 8px", opacity: hl > 0.35 && !isCmp(i) ? 0.32 : 1 }}><div style={{ width: 20, height: 20, borderRadius: 5, background: m.c }} /><span style={{ fontSize: 19, fontWeight: 700, color: INK }}>{m.n}</span>{isCmp(i) && <div style={{ position: "absolute", inset: -3, borderRadius: 13, border: `3.5px solid ${i === 0 ? "#3E6CF0" : "#C44A3A"}`, boxShadow: `0 0 16px ${i === 0 ? "#3E6CF0" : "#C44A3A"}77`, opacity: hl, transform: `scale(${0.9 + hl * 0.1})` }} />}</div>))}</div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "14px 16px", marginTop: 18 }}>
      {BENCH.map((b, bi) => (<div key={bi} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: PH }}>
          {b.v.map((val, mi) => { const h = (val / 100) * PH; const faded = hl > 0.35 && !isCmp(mi); return (
            <div key={mi} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", opacity: faded ? 0.22 : 1 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#52565d", marginBottom: 3 }}>{val}</span>
              <div style={{ width: 27, height: h, background: BMODELS[mi].c, borderRadius: "3px 3px 0 0", position: "relative" }}>{mi === 0 && b.tools > 0 && <div style={{ position: "absolute", left: 0, right: 0, bottom: h, height: ((b.tools - val) / 100) * PH, background: "#27439C", borderRadius: "3px 3px 0 0" }} />}</div>
            </div>); })}
        </div>
        <div style={{ fontSize: 15, fontWeight: 600, color: INK, marginTop: 9, textAlign: "center" }}>{b.n}</div>
      </div>))}
    </div>
  </div>);
};
const WhatScene: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s); const hl = ramp(lf, 116, 156);
  return (<AbsoluteFill>
    <Bloom cx={CX} cy={840} w={1180} color={hl > 0.4 ? "rgba(62,108,240,0.16)" : "rgba(62,108,240,0.12)"} lf={lf} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 524, display: "flex", justifyContent: "center" }}>
      <div style={{ transform: "scale(0.87)", transformOrigin: "top center", borderRadius: 20, boxShadow: SH, overflow: "hidden" }}><GlmBenchChart hl={hl} /></div>
    </div>
  </AbsoluteFill>); };

// ===== S2 KEY — pricing, grab a key =====
const KeyScene: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s); const focus = eio(lf, 0, fr(2.4), 0.20, 0.243); const scale = 1.1;
  return (<AbsoluteFill>
    <Bloom cx={CX} cy={900} w={1100} color="rgba(63,158,116,0.15)" lf={lf} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 470, textAlign: "center" }}><span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 56, color: INK }}>grab a key, <span style={{ color: GREEN }}>a few bucks</span></span></div>
    <div style={{ position: "absolute", left: 96, top: 556, height: 624 }}>
      <Browser w={888} h={624} url="z.ai/subscribe"><Screen img="glm_zai_full" vw={888} vh={574} focus={focus} scale={scale} /><div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 25% 56%, transparent 15%, rgba(18,14,10,0.34) 56%)", opacity: ramp(lf, 26, 42) }} /></Browser></div>
  </AbsoluteFill>); };

// ===== S3 CONFIG — reroute patchbay (Claude Code's request cable re-plugs from Anthropic to GLM) =====
const ClaudeGlyph: React.FC<{ size: number; color?: string }> = ({ size, color = CLAY }) => (<svg viewBox="0 0 24 24" width={size} height={size} style={{ filter: `drop-shadow(0 ${size * 0.03}px ${size * 0.055}px rgba(170,72,44,0.28))` }}><path fill={color} d={CLAUDE_PATH} /></svg>);
const Tile: React.FC<{ cx: number; cy: number; size: number; g0: string; g1: string; glow: string; glowOn?: number; children?: React.ReactNode }> = ({ cx, cy, size, g0, g1, glow, glowOn = 1, children }) => (
  <div style={{ position: "absolute", left: cx - size / 2, top: cy - size / 2, width: size, height: size, borderRadius: size * 0.24, background: grad(g0, g1), boxShadow: `${SH}, 0 0 ${Math.round(36 * glowOn)}px ${glow}`, display: "flex", alignItems: "center", justifyContent: "center" }}><Sheen r={size * 0.24} o={0.45} />{children}</div>);
const CShadow: React.FC<{ cx: number; cy: number; w: number }> = ({ cx, cy, w }) => (<div style={{ position: "absolute", left: cx - w / 2, top: cy, width: w, height: w * 0.2, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(20,26,45,0.22), transparent 70%)" }} />);
const ConfigScene: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s);
  const flip = ramp(lf, 22, 44); const claudeCheck = 1 - ramp(lf, 22, 36); const glmCheck = over(lf, 24, 14);
  const env1 = over(lf, 52, 14), env2 = over(lf, 66, 14); const confirm = over(lf, 94, 16);
  const press = interpolate(lf, [20, 25, 32], [0, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const DL = 160, DT = 600, DW = 760;
  const curX = interpolate(lf, [0, 18], [650, 560], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const curY = interpolate(lf, [0, 18], [884, 786], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (<AbsoluteFill>
    <Bloom cx={540} cy={782} w={1160} color={flip > 0.4 ? "rgba(62,108,240,0.16)" : "rgba(210,114,78,0.13)"} lf={lf} base={0.45} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 478, textAlign: "center" }}><span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 56, color: INK }}>point Claude Code at <span style={{ color: BLUE }}>GLM</span></span></div>
    <div style={{ position: "absolute", left: DL, top: DT, width: DW, borderRadius: 26, background: "#FCFAF6", boxShadow: SH, overflow: "hidden" }}>
      <div style={{ padding: "20px 30px 4px", fontWeight: 700, fontSize: 25, color: MUTE }}>Model</div>
      <div style={{ margin: "6px 16px", borderRadius: 16, padding: "16px 20px", display: "flex", alignItems: "center", gap: 18, background: `rgba(210,114,78,${0.1 * (1 - flip)})`, opacity: 1 - flip * 0.55 }}>
        <ClaudeMark size={62} glow={0.3} />
        <div style={{ flex: 1 }}><div style={{ fontWeight: 800, fontSize: 32, color: INK }}>Claude Opus</div><div style={{ fontFamily: mono, fontSize: 21, color: MUTE }}>api.anthropic.com</div></div>
        <span style={{ fontSize: 36, fontWeight: 900, color: CLAY, opacity: claudeCheck }}>✓</span>
      </div>
      <div style={{ margin: "6px 16px 18px", borderRadius: 16, padding: "16px 20px", display: "flex", alignItems: "center", gap: 18, background: `rgba(62,108,240,${0.13 * flip})`, border: `2px solid rgba(62,108,240,${0.5 * flip})`, transform: `scale(${1 - press * 0.02})` }}>
        <GlmLogo size={62} />
        <div style={{ flex: 1 }}><div style={{ fontWeight: 800, fontSize: 32, color: INK }}>GLM-5.2</div><div style={{ fontFamily: mono, fontSize: 21, color: flip > 0.4 ? "#3E6CF0" : MUTE }}>api.z.ai</div></div>
        <span style={{ fontSize: 36, fontWeight: 900, color: BLUE, opacity: glmCheck, transform: `scale(${0.5 + glmCheck * 0.5})` }}>✓</span>
      </div>
      <Sheen r={26} />
    </div>
    {[{ n: "ANTHROPIC_BASE_URL", v: "https://api.z.ai/api/anthropic", t: env1, y: 846 }, { n: "ANTHROPIC_AUTH_TOKEN", v: "z-ai-key ••••••••", t: env2, y: 908 }].map((c, i) => c.t > 0 && (
      <div key={i} style={{ position: "absolute", left: 540 - 360, top: c.y, width: 720, height: 52, borderRadius: 13, background: grad("#FCF9F3", "#F1EBDD"), borderLeft: `4px solid ${BLUE}`, boxShadow: IMSH, display: "flex", alignItems: "center", padding: "0 22px", gap: 12, opacity: Math.min(c.t, 1), transform: `translateY(${(1 - c.t) * 18}px)` }}>
        <span style={{ fontFamily: mono, fontSize: 19, fontWeight: 700, color: SLATE }}>{c.n}</span><span style={{ fontFamily: mono, fontSize: 19, color: "#5b554a", marginLeft: "auto" }}>{c.v}</span><span style={{ color: GREEN, fontSize: 22, fontWeight: 900 }}>✓</span>
      </div>))}
    {lf >= 94 && <div style={{ position: "absolute", left: 0, right: 0, top: 992, textAlign: "center", opacity: ramp(lf, 94, 106), transform: `scale(${interpolate(confirm, [0, 0.6, 1], [1.3, 0.95, 1])})` }}><span style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "12px 30px", borderRadius: 999, background: GREEN, color: "#fff", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 33, boxShadow: "0 8px 22px rgba(63,158,116,0.42)" }}>Now using GLM-5.2 ✓</span></div>}
    {lf < 44 && <div style={{ position: "absolute", left: curX, top: curY, zIndex: 30 }}>{(lf >= 20 && lf <= 32) && <div style={{ position: "absolute", left: -18, top: -18, width: 44, height: 44, borderRadius: "50%", border: `3px solid ${INK}`, opacity: 0.5 }} />}<svg width={38} height={38} viewBox="0 0 24 24" style={{ filter: "drop-shadow(0 3px 5px rgba(0,0,0,0.4))" }}><path d="M5 3 L5 19 L9.5 14.8 L12.5 21 L15 20 L12 14 L18 13.5 Z" fill="#fff" stroke="#222" strokeWidth={1.3} strokeLinejoin="round" /></svg></div>}
  </AbsoluteFill>); };

// ===== S4 RUN — engine-core hot-swap + falling bill =====
const RunScene: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s);
  const rot = interpolate(lf, [0, 190], [0, 150]);
  const clayOut = ramp(lf, 60, 80); const glmIn = over(lf, 66, 18); const coreBlue = ramp(lf, 66, 86);
  const rowsOut = ramp(lf, 118, 132);
  const ROWS = ["Read auth.ts", "Edit auth.ts", "npm test"];
  const FLOOR = 1150, TH = 30, N = 10;
  const stamp = over(lf, 168, 16); const eyeOut = ramp(lf, 118, 132);
  return (<AbsoluteFill>
    <Bloom cx={540} cy={646} w={1080} color={lf > 150 ? "rgba(63,158,116,0.16)" : (coreBlue > 0.5 ? "rgba(62,108,240,0.16)" : "rgba(210,114,78,0.15)")} lf={lf} base={0.5} />
    {/* eyebrow */}
    <div style={{ position: "absolute", top: 404, left: 0, right: 0, textAlign: "center" }}><span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 52, color: INK }}>same Claude Code, <span style={{ color: GREEN, fontFamily: frauncesItalic.fontFamily, fontStyle: "italic" }}>same workflow</span></span></div>
    {/* engine socket + core (stays through the bill crash) */}
    <>
      <div style={{ position: "absolute", left: 540 - 120, top: 646 - 120, width: 240, height: 240, borderRadius: "50%", background: "radial-gradient(circle at 50% 36%, #23272F, #0E1014)", boxShadow: `inset 0 8px 20px rgba(0,0,0,0.6), ${SH}` }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: "50%", overflow: "hidden" }}>
          <div style={{ position: "absolute", left: 120 - 76, top: 120 - 76, opacity: 1 - clayOut, transform: `translateY(${-clayOut * 130}px) scale(${1 + clayOut * 0.3})` }}><div style={{ width: 152, height: 152, borderRadius: "50%", background: "radial-gradient(circle at 50% 38%, #FBF7EF, #E8E1D2)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "inset 0 3px 10px rgba(120,80,50,0.16)" }}><ClaudeSun size={104} glow={0.12} spin={rot} /></div></div>
          {lf >= 62 && <div style={{ position: "absolute", left: 120 - 60, top: 120 - 60, opacity: ramp(lf, 66, 82), transform: `translateX(${(1 - glmIn) * 210}px) scale(${0.82 + glmIn * 0.18})` }}><GlmLogo size={120} /></div>}
        </div>
        <Sheen r="50%" />
      </div>
      {/* model chip — shell stays Claude Code, model flips */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 786, textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 11, padding: "9px 22px", borderRadius: 999, background: "#fff", boxShadow: IMSH }}>
          <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 27, color: INK }}>Claude Code</span>
          <span style={{ width: 1.5, height: 24, background: "rgba(0,0,0,0.14)" }} />
          {coreBlue < 0.5 ? <span style={{ display: "flex", alignItems: "center", gap: 7 }}><ClaudeSun size={24} glow={0.4} /><span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 24, color: CLAY }}>Opus</span></span>
            : <span style={{ display: "flex", alignItems: "center", gap: 7 }}><GlmLogo size={24} /><span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 24, color: BLUE }}>GLM-5.2</span></span>}
        </div>
      </div>
      {/* live agent work rows (never pause through the swap) */}
      {ROWS.map((t, i) => { const appear = ramp(lf, 8 + i * 5, 18 + i * 5); const done = ((lf + 34 - i * 11) % 56) > 26; const col = coreBlue > 0.5 ? BLUE : CLAY; return (
        <div key={i} style={{ position: "absolute", left: 540 - 228, top: 854 + i * 58, width: 456, height: 50, borderRadius: 13, background: grad("#FBF8F1", "#EFEADF"), boxShadow: IMSH, display: "flex", alignItems: "center", padding: "0 20px", gap: 12, opacity: appear * (1 - rowsOut), transform: `translateY(${rowsOut * -28}px)` }}>
          <div style={{ width: 9, height: 9, borderRadius: "50%", background: col }} />
          <span style={{ fontFamily: mono, fontSize: 23, color: INK, fontWeight: 600 }}>{t}</span>
          <div style={{ marginLeft: "auto" }}>{done ? <span style={{ color: GREEN, fontSize: 25, fontWeight: 900 }}>✓</span> : <div style={{ width: 20, height: 20, borderRadius: "50%", border: "3px solid rgba(58,92,132,0.25)", borderTopColor: SLATE, transform: `rotate(${lf * 17}deg)` }} />}</div>
        </div>); })}
      <div style={{ position: "absolute", left: 0, right: 0, top: 1044, textAlign: "center", opacity: ramp(lf, 42, 56) * (1 - rowsOut) }}><span style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "10px 24px", borderRadius: 999, background: "rgba(63,158,116,0.14)", fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 25, color: GREEN }}><span style={{ fontWeight: 900 }}>✓</span> build passing — same commands</span></div>
    </>
    {/* ACT3 — the monthly bill drops ~80% (clean money column + $ counter + seal) */}
    {lf >= 114 && (() => {
      const billed = ramp(lf, 116, 130);
      const shrink = interpolate(lf, [150, 180], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
      const colH = interpolate(shrink, [0, 1], [236, 46]); const colTop = 1150 - colH;
      const dollar = Math.round(interpolate(shrink, [0, 1], [200, 12])); const isGreen = shrink > 0.55;
      return (<>
        <div style={{ position: "absolute", top: 828, left: 0, right: 0, textAlign: "center", opacity: billed }}><span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 27, color: MUTE, letterSpacing: "0.05em" }}>YOUR MONTHLY BILL</span></div>
        <div style={{ position: "absolute", top: 862, left: 0, right: 0, textAlign: "center", opacity: billed }}><span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 96, color: isGreen ? GREEN : RED }}>${dollar}<span style={{ fontSize: 42, color: INK }}>/mo</span></span></div>
        <div style={{ position: "absolute", left: 540 - 95, top: 1150, width: 190, height: 16, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(20,26,45,0.28), transparent 72%)" }} />
        <div style={{ position: "absolute", left: 540 - 92, top: colTop, width: 184, height: colH, borderRadius: 12, background: isGreen ? grad("#5E8F73", "#3C6B54") : grad("#C9564A", "#9E3B30"), boxShadow: SH, overflow: "hidden", opacity: billed }}>
          {Array.from({ length: 7 }).map((_, i) => <div key={i} style={{ position: "absolute", left: 14, right: 14, top: 16 + i * 32, height: 3, borderRadius: 2, background: "rgba(255,255,255,0.18)" }} />)}
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 4, background: AMBER }} /><Sheen r={12} />
        </div>
        {lf >= 172 && <div style={{ position: "absolute", left: 540 - 82, top: 956, width: 164, height: 164, borderRadius: "50%", background: grad("#4FB286", "#2F8F66"), boxShadow: `${SH}, 0 0 46px rgba(63,158,116,0.5)`, display: "flex", alignItems: "center", justifyContent: "center", opacity: ramp(lf, 172, 182), transform: `scale(${interpolate(over(lf, 172, 16), [0, 0.6, 1], [1.5, 0.92, 1])}) rotate(-7deg)` }}><span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 60, color: "#fff" }}>−80%</span><Sheen r="50%" /></div>}
      </>);
    })()}
  </AbsoluteFill>); };

// ===== S5 PROOF — the OUTPUT side by side (real rendered site, not code) =====
const ProofScene: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s); const reveal = ramp(lf, 48, 62);
  const Pane: React.FC<{ mark: React.ReactNode; label: string; col: string; at: number; glow?: boolean }> = ({ mark, label, col, at, glow }) => { const e = over(f, fr(s) + at, 12);
    return (<div style={{ width: 420, opacity: e, transform: `translateY(${(1 - e) * 22}px) scale(${0.9 + Math.min(e, 1) * 0.1})` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, justifyContent: "center" }}>{mark}<span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 28, color: col }}>{label}</span></div>
      <div style={{ width: 420, height: 304, borderRadius: 16, overflow: "hidden", background: "#fff", boxShadow: `${SH}${glow ? `, 0 0 36px rgba(62,108,240,0.3)` : ""}`, position: "relative" }}>
        <div style={{ height: 34, background: "#E9E6DF", display: "flex", alignItems: "center", padding: "0 13px", gap: 6 }}>{["#FF5F57", "#FEBC2E", "#28C840"].map((c) => <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}</div>
        <div style={{ position: "absolute", top: 34, left: 0, right: 0, bottom: 0, overflow: "hidden" }}><Img src={staticFile("refs/bh_site_a.jpg")} style={{ width: "100%", position: "absolute", top: 0 }} /></div><Sheen r={16} o={0.1} /></div></div>); };
  return (<AbsoluteFill>
    <Bloom cx={CX} cy={860} w={1120} color="rgba(210,114,78,0.15)" lf={lf} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 536, textAlign: "center" }}><span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 54, color: INK }}>same prompt, <span style={{ color: GREEN }}>same result</span></span></div>
    <div style={{ position: "absolute", left: 56, right: 56, top: 680, display: "flex", gap: 24, justifyContent: "center" }}>
      <Pane mark={<ClaudeSun size={40} glow={0.45} />} label="Opus · $200" col={INK} at={4} />
      <Pane mark={<GlmLogo size={32} />} label="GLM-5.2 · $12" col={BLUE} at={8} glow />
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1130, textAlign: "center", opacity: reveal, transform: `scale(${0.8 + reveal * 0.2})` }}><div style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "13px 32px", borderRadius: 999, background: grad("#FBF7EF", "#F1E9DA"), border: `2.5px solid ${GREEN}`, boxShadow: SH }}><span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 38, color: GREEN }}>✓ identical</span><span style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 28, color: INK }}>can't tell which built it</span></div></div>
  </AbsoluteFill>); };

// ===== CTA =====
const CTA: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const local = f - fr(s); if (local < 0) return null; const a = eOut(f, fr(s) + 2, 12); const pillPop = over(local, 10, 14); const pulse = 1 + Math.sin(f / 7) * 0.03;
  return (<AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingBottom: 210 }}>
    {Array.from({ length: 16 }, (_, i) => { const wave = i < 12 ? 4 : 30; const p = eOut(f, fr(s) + wave + (i % 12), 28); const ang = (i / 8) * Math.PI; if (p <= 0 || p >= 1) return null; return <div key={i} style={{ position: "absolute", left: 540 + Math.cos(ang) * p * 360, top: 820 + Math.sin(ang) * p * 360, fontSize: 26, opacity: Math.sin(p * Math.PI), color: [SLATE, CLAY, GREEN, BLUE][i % 4] }}>✦</div>; })}
    <div style={{ marginTop: -150, display: "flex", gap: 26, alignItems: "center", transform: `scale(${0.7 + a * 0.3})`, opacity: a }}><ClaudeSun size={132} glow={0.6} /><span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 60, color: MUTE }}>+</span><GlmLogo size={120} /></div>
    <div style={{ marginTop: 46, transform: `scale(${(0.8 + pillPop * 0.2) * pulse})`, padding: "28px 56px", borderRadius: 999, background: CLAY, color: "#fff", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 66, boxShadow: "0 24px 54px rgba(210,114,78,0.42)", opacity: a }}>💬 Comment "SWAP"</div>
    <div style={{ marginTop: 28, fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 600, fontSize: 42, color: INK, opacity: a, textAlign: "center" }}>and I'll send the exact setup</div>
  </AbsoluteFill>); };

// ===== Captions =====
type Word = { word: string; start: number; end: number; line: number };
const WORDS = wordsData as Word[];
const cleanw = (w: string) => w.toLowerCase().replace(/[^a-z0-9'$.]/g, "");
const EMPH = new Set(["overpaying", "claude", "code", "model", "fifth", "price", "glm", "5.2", "opus", "fraction", "swap", "key", "dollars", "$200", "environment", "variables", "endpoint", "token", "80%", "side", "limits", "credits", "move", "comment", "free"]);
const CHUNKS = (() => { const byLine: Record<number, Word[]> = {}; for (const w of WORDS) (byLine[w.line] ||= []).push(w); const out: { words: Word[]; start: number; line: number }[] = []; for (const li of Object.keys(byLine).map(Number).sort((a, b) => a - b)) { const ws = byLine[li]; for (let i = 0; i < ws.length; i += 3) { const g = ws.slice(i, i + 3); out.push({ words: g, start: g[0].start, line: li }); } } const aE = Math.max(...WORDS.map((w) => w.end)); return out.map((c, i) => ({ ...c, end: i + 1 < out.length ? out[i + 1].start : aE + 0.4 })); })();
const Captions: React.FC = () => { const frame = useCurrentFrame();
  return (<>{CHUNKS.map((c, i) => { if (frame < fr(c.start) || frame >= fr(c.end)) return null; if (c.line === 6) return null;
    return (<div key={i} style={{ position: "absolute", top: 1244, left: 64, right: 64, height: 170, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "center", gap: "0 15px", width: 952, textAlign: "center" }}>
        {c.words.map((w, j) => { const g = EMPH.has(cleanw(w.word)); const shown = frame >= fr(w.start); return <span key={j} style={{ display: "inline-block", opacity: shown ? 1 : 0, fontFamily: g ? frauncesItalic.fontFamily : fraunces.fontFamily, fontStyle: g ? "italic" : "normal", fontWeight: g ? 700 : 600, fontSize: g ? 76 : 66, lineHeight: 1.04, color: g ? SLATE : INK, letterSpacing: "-0.02em", textShadow: "0 2px 14px rgba(236,233,226,0.95), 0 1px 2px rgba(236,233,226,1)" }}>{w.word}</span>; })}
      </div></div>); })}</>); };

const ProgressBar: React.FC = () => { const f = useCurrentFrame(); const { durationInFrames } = useVideoConfig(); const p = Math.min(1, f / (durationInFrames - 1));
  return (<div style={{ position: "absolute", left: 46, right: 46, top: 200, height: 13, borderRadius: 999, zIndex: 120 }}><div style={{ position: "absolute", inset: 0, background: "rgba(58,92,132,0.15)", borderRadius: 999 }} /><div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${p * 100}%`, background: grad("#E08A66", "#C5603C"), borderRadius: 999, boxShadow: "0 2px 8px rgba(210,114,78,0.35)" }} /><div style={{ position: "absolute", left: `${p * 100}%`, top: -3, width: 19, height: 19, borderRadius: "50%", background: CLAY, border: "3px solid #F3EFE7", boxShadow: "0 0 12px rgba(210,114,78,0.9)", transform: "translateX(-50%)" }} /></div>); };

const L = [0, 3.98, 12.06, 15.74, 21.04, 27.35, 33.92];
const Sfx: React.FC<{ at: number; src: string; v?: number; dur?: number }> = ({ at, src, v = 0.3, dur = 2.5 }) => (<Sequence from={fr(at)} durationInFrames={fr(dur)}><Audio src={staticFile(`sfx/${src}`)} volume={v} /></Sequence>);
const Ticks: React.FC<{ start: number; n: number; step: number; src?: string; v?: number }> = ({ start, n, step, src = "key.wav", v = 0.22 }) => (<>{Array.from({ length: n }, (_, i) => <Sfx key={i} at={start + i * step} src={src} v={v} dur={0.5} />)}</>);

export const ClaudeGlmReel: React.FC = () => { const frame = useCurrentFrame(); const lf = frame; const zoom = interpolate(frame, [0, 16, 28], [1.0, 1.04, 1.0], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  return (<AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
    <Audio src={staticFile("vo_glm.wav")} />
    <Audio loop src={staticFile("seo_music.wav")} volume={(ff) => interpolate(ff, [0, fr(1.6), fr(L[6]) - 10, fr(L[6]) + 16, 99999], [0, 0.2, 0.2, 0.15, 0.15], { extrapolateRight: "clamp" })} />
    <Sfx at={0} src="metal_riser.wav" v={0.85} /><Sfx at={0} src="sub.wav" v={0.8} /><Sfx at={0.25} src="boom.wav" v={0.7} /><Sfx at={0.25} src="shimmer.wav" v={0.5} /><Sfx at={1.7} src="ding.wav" v={0.45} />
    <Sfx at={2.0} src="snap.wav" v={0.55} /><Sfx at={2.06} src="boom.wav" v={0.45} /><Sfx at={2.9} src="ding.wav" v={0.4} />
    {L.slice(1).map((t, i) => <React.Fragment key={i}><Sfx at={t - 0.1} src="swish.wav" v={0.44} /><Sfx at={t + 0.35} src="pop.wav" v={0.34} /></React.Fragment>)}
    <Sfx at={5} src="whoosh.wav" v={0.42} /><Sfx at={9} src="data.wav" v={0.4} />
    <Sfx at={13} src="ding.wav" v={0.45} />
    <Ticks start={16.0} n={10} step={0.18} src="key.wav" v={0.22} /><Sfx at={19.4} src="snap.wav" v={0.45} />
    <Ticks start={21.6} n={6} step={0.16} src="blip3.wav" v={0.26} /><Sfx at={23.15} src="snap.wav" v={0.42} /><Sfx at={23.6} src="ding.wav" v={0.5} />
    <Sfx at={26.75} src="boom.wav" v={0.52} /><Sfx at={26.82} src="ding.wav" v={0.46} />
    <Sfx at={28.0} src="snap.wav" v={0.45} /><Sfx at={31.5} src="ding.wav" v={0.55} />
    <Sfx at={L[6]} src="resolve.wav" v={0.5} /><Sfx at={L[6] + 0.2} src="angelic.wav" v={0.4} dur={3.6} /><Sfx at={L[6] + 0.4} src="sparkle.wav" v={0.55} />
    <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "50% 46%" }}>
      <Background />
      <Scene s={L[0]} e={L[1]}><HookSubscription lf={lf} /></Scene>
      <Scene s={L[1]} e={L[2]}><WhatScene s={L[1]} /></Scene>
      <Scene s={L[2]} e={L[3]}><KeyScene s={L[2]} /></Scene>
      <Scene s={L[3]} e={L[4]}><ConfigScene s={L[3]} /></Scene>
      <Scene s={L[4]} e={L[5]}><RunScene s={L[4]} /></Scene>
      <Scene s={L[5]} e={L[6]}><ProofScene s={L[5]} /></Scene>
      <CTA s={L[6]} />
      <Captions />
    </AbsoluteFill>
    <ProgressBar />
  </AbsoluteFill>); };
