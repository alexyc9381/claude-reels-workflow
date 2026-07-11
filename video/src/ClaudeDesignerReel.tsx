import React from "react";
import { AbsoluteFill, Audio, Easing, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { fraunces, frauncesItalic, inter } from "./fonts";
import wordsData from "./data/words_design.json";
import { Gjibby, Grezo, Gspent, Gathlevo, Gmomento, Gviva, Gmentus, Gpiropo, Grouge, Gconverse, Gcoinbase, AdReal, ThumbReal, OnePager, BrandKit } from "./DesignSamples";

/** ClaudeDesignerReel v2 — "Claude designs what agencies charge $5,000 for" (DESIGN, Alex VO). Real product imagery, fixed framing, escalating motion, audible riser. */
const CREAM = "#ECE9E2", INK = "#1A1813", SLATE = "#3A5C84", CLAY = "#D2724E", AMBER = "#CF9544", GREEN = "#3F9E74", MUTE = "#9A968B", RED = "#C44A3A";
const FPS = 30; const fr = (s: number) => s * FPS; const CX = 540;
const eOut = (f: number, sF: number, d = 10) => interpolate(f, [sF, sF + d], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
const ramp = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const over = (f: number, sF: number, d = 12) => interpolate(f, [sF, sF + d * 0.5, sF + d], [0, 1.12, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
const grad = (a: string, b: string) => `linear-gradient(158deg, ${a} 0%, ${b} 100%)`;
const CLAUDE_PATH = "m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z";
const SH = "inset 0 1.5px 0 rgba(255,255,255,0.5), 0 2px 4px rgba(34,30,24,0.22), 0 12px 26px rgba(34,30,24,0.20), 0 34px 64px rgba(20,26,45,0.26)";
const IMSH = "0 14px 30px rgba(40,32,20,0.26), 0 4px 10px rgba(40,32,20,0.14)";
const CARDSH = "0 3px 6px rgba(40,32,20,0.16), 0 22px 48px rgba(28,38,64,0.30), 0 50px 90px rgba(20,26,45,0.20)";
const Sheen: React.FC<{ r: number | string; o?: number }> = ({ r, o = 0.3 }) => (<div style={{ position: "absolute", inset: 0, borderRadius: r, background: `linear-gradient(125deg, rgba(255,255,255,${o}) 0%, rgba(255,255,255,0) 32%)`, pointerEvents: "none" }} />);
// one diagonal highlight sweep across a card during [start,start+dur]
const Glint: React.FC<{ lf: number; start: number; dur?: number; r: number | string }> = ({ lf, start, dur = 16, r }) => { const t = ramp(lf, start, start + dur); if (t <= 0 || t >= 1) return null;
  return (<div style={{ position: "absolute", inset: 0, borderRadius: r, overflow: "hidden", pointerEvents: "none" }}><div style={{ position: "absolute", top: "-30%", left: `${interpolate(t, [0, 1], [-40, 130])}%`, width: "34%", height: "160%", background: "linear-gradient(105deg, transparent, rgba(255,255,255,0.55), transparent)", transform: "rotate(9deg)" }} /></div>); };
const Bloom: React.FC<{ cx: number; cy: number; w: number; color: string; lf: number; base?: number }> = ({ cx, cy, w, color, lf, base = 0.55 }) => (<div style={{ position: "absolute", left: cx - w / 2, top: cy - w / 2, width: w, height: w, borderRadius: "50%", background: `radial-gradient(circle at 50% 46%, ${color} 0%, transparent 62%)`, opacity: base + Math.sin(lf / 9) * 0.18, pointerEvents: "none" }} />);
const ClaudeMark: React.FC<{ size: number; glow?: number }> = ({ size, glow = 0.4 }) => (
  <div style={{ position: "relative", width: size, height: size, borderRadius: size * 0.28, background: grad("#E08A66", "#C5603C"), boxShadow: `${SH}, 0 0 ${Math.round(size * 0.34)}px rgba(210,114,78,${glow})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
    <svg viewBox="0 0 24 24" width={size * 0.58} height={size * 0.58}><path fill="#F6EFE6" d={CLAUDE_PATH} /></svg><Sheen r={size * 0.28} /></div>);
const Background: React.FC = () => { const f = useCurrentFrame(); const d = Math.sin(f / 100) * 5;
  return (<AbsoluteFill style={{ background: "radial-gradient(120% 90% at 50% 8%, #F3F1EB 0%, #ECE9E2 46%, #E4E0D6 100%)" }}>
    <div style={{ position: "absolute", inset: -40, opacity: 0.5, backgroundImage: "linear-gradient(rgba(58,92,132,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(58,92,132,0.05) 1px, transparent 1px)", backgroundSize: "62px 62px", transform: `translateY(${d}px)` }} /></AbsoluteFill>); };

// scales a base-size design into a display-width card (with depth shadow + sheen)
const Design: React.FC<{ w: number; bw: number; bh: number; r?: number; children: React.ReactNode; glow?: number }> = ({ w, bw, bh, r = 20, children, glow = 0 }) => { const h = w * bh / bw;
  return (<div style={{ width: w, height: h, borderRadius: r, overflow: "hidden", boxShadow: `${CARDSH}${glow > 0 ? `, 0 0 ${glow * 40}px rgba(210,114,78,${glow * 0.6})` : ""}`, background: "#fff", position: "relative" }}>
    <div style={{ width: bw, height: bh, transform: `scale(${w / bw})`, transformOrigin: "top left" }}>{children}</div><Sheen r={r} o={0.12} /></div>); };

const HeroHeader: React.FC = () => { const f = useCurrentFrame(); const out = eOut(f, fr(L[1]) - 7, 7);
  return (<div style={{ position: "absolute", top: 286, left: 60, right: 60, opacity: 1 - out, transform: `translateY(${-out * 14}px)`, zIndex: 60 }}>
    <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 28, letterSpacing: "0.07em", color: MUTE, marginBottom: 10, textTransform: "uppercase" }}>Claude can now</div>
    <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 84, lineHeight: 0.98, letterSpacing: "-0.035em", color: INK, textShadow: "0 2px 20px rgba(236,233,226,0.98)" }}>
      <div>Design what agencies</div><div>charge <span style={{ color: CLAY }}>$5,000</span> for.</div></div></div>); };

const Scene: React.FC<{ s: number; e: number; children: React.ReactNode }> = ({ s, e, children }) => {
  const frame = useCurrentFrame(); const local = frame - fr(s); const lenF = fr(e - s); if (local < 0 || local > lenF) return null;
  const inF = s <= 0 ? 1 : eOut(frame, fr(s), 5); const op = Math.min(inF, 1 - eOut(frame, fr(e - 0.16), 6)); const inE = eOut(frame, fr(s), 12);
  return <AbsoluteFill style={{ opacity: op, transform: `scale(${0.99 + inE * 0.01})` }}>{children}</AbsoluteFill>; };

// ===== S0 HOOK — designs DEAL OUT from a stack into a fan (blue hero center), $5k slam, sparkles =====
const FAN = [Gconverse, Gjibby, Grezo, Gviva, Gcoinbase];
const Spark: React.FC<{ cx: number; cy: number; at: number; lf: number; n?: number; spread?: number }> = ({ cx, cy, at, lf, n = 6, spread = 90 }) => (<>{Array.from({ length: n }, (_, i) => { const p = ramp(lf, at, at + 18); if (p <= 0 || p >= 1) return null; const ang = (i / n) * Math.PI * 2; const d = p * spread; return <div key={i} style={{ position: "absolute", left: cx + Math.cos(ang) * d, top: cy + Math.sin(ang) * d, fontSize: 22, opacity: Math.sin(p * Math.PI), color: [CLAY, AMBER, "#E7C572"][i % 3] }}>✦</div>; })}</>);
const DesignHook: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s); const cy = 948; const pulse = Math.max(0, Math.sin(lf / 7));
  const push = ramp(lf, 14, fr(3)) * 7; const stamp = over(lf, 30, 12); const stampPop = lf > 30 && lf < 46 ? 1 + Math.max(0, Math.sin((lf - 30) / 5)) * 0.06 : 1;
  return (<AbsoluteFill>
    <Bloom cx={CX} cy={cy} w={1120} color="rgba(210,114,78,0.22)" lf={lf} base={0.5 + pulse * 0.12} />
    {/* faint background density cards — present from frame 0 */}
    {[-1, 1].map((d, i) => (<div key={`b${i}`} style={{ position: "absolute", left: CX + d * 330 - 120, top: cy - 170 + d * 20, width: 240, height: 300, borderRadius: 18, background: i === 0 ? "#D7CDBA" : "#CFC4AF", opacity: 0.45, transform: `rotate(${d * 12}deg) scale(1.05)`, filter: "blur(2px)", boxShadow: CARDSH }} />))}
    {/* FRONT-LOADED fan: all 5 cards FULL at frame 0, just a subtle settle + escalation after */}
    {[0, 1, 2, 3, 4].map((i) => { const off = i - 2; const hero = i === 2; const w = hero ? 326 : Math.abs(off) === 1 ? 232 : 198; const Comp = FAN[i];
      const settle = over(lf, Math.abs(off) * 2, 9); // 0.9 -> 1 polish-in, but visible from f0
      const fx = CX + off * 178; const fy = cy + Math.abs(off) * 30 - (hero ? 26 : 0) + Math.sin(lf / 22 + i) * 4 - push;
      const rot = off * 6.5; const sc = 0.9 + Math.min(settle, 1) * 0.1;
      const land = Math.abs(off) * 2 + 9;
      return (<React.Fragment key={i}>
        <div style={{ position: "absolute", left: fx - w / 2, top: fy - w / 2, transform: `rotate(${rot}deg) scale(${sc})`, opacity: 1, zIndex: hero ? 9 : 5 - Math.abs(off) }}>
          <Design w={w} bw={1080} bh={1080} glow={hero ? 0.6 + pulse * 0.28 : 0}><Comp /></Design>
          {hero && <Glint lf={lf} start={34} dur={20} r={20} />}{!hero && <Glint lf={lf} start={44 + Math.abs(off) * 4} dur={16} r={20} />}</div>
        {!hero && <Spark cx={fx} cy={fy} at={land} lf={lf} n={5} spread={70} />}
      </React.Fragment>); })}
    {/* $5,000 price slam — 2nd act */}
    <div style={{ position: "absolute", left: CX, top: 1208, opacity: stamp, transform: `translateX(-50%) scale(${(0.6 + stamp * 0.4) * stampPop}) rotate(-7deg)`, transformOrigin: "center" }}>
      <div style={{ width: 300, padding: "14px 0", textAlign: "center", background: grad("#E08A66", "#C5603C"), borderRadius: 18, boxShadow: `${SH}, 0 0 36px rgba(210,114,78,0.5)`, position: "relative" }}>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 22, letterSpacing: "0.12em", color: "rgba(255,255,255,0.85)" }}>AGENCY PRICE</div>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 74, lineHeight: 0.92, color: "#fff", textDecoration: "line-through", textDecorationColor: "rgba(255,255,255,0.55)" }}>$5,000</div>
        <Sheen r={18} /></div>
      <Spark cx={150} cy={70} at={32} lf={lf} n={8} spread={150} /></div>
  </AbsoluteFill>); };

// ===== S1 CONTRAST — ugly generic templates get SWEPT AWAY, premium real designs slam in =====
const UGLY = [{ bg: "#e4e0d8", txt: "Your Brand" }, { bg: "#dde4e7", txt: "BRAND" }, { bg: "#e9e4dc", txt: "Company" }];
const PREMIUM = [Gspent, Gmomento, Gathlevo];
const ContrastScene: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s); const rev = ramp(lf, 52, 74); const sweep = ramp(lf, 50, 76); const pulse = Math.max(0, Math.sin(lf / 8));
  const cy = 960;
  return (<AbsoluteFill>
    <Bloom cx={CX} cy={cy} w={1000} color={`rgba(${rev > 0.5 ? "203,148,86" : "150,150,150"},0.16)`} lf={lf} />
    {/* transitioning label */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 506, textAlign: "center", height: 70 }}>
      <span style={{ position: "absolute", left: 0, right: 0, opacity: 1 - rev, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 52, color: MUTE }}>not those basic templates</span>
      <span style={{ position: "absolute", left: 0, right: 0, opacity: rev, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 52, color: INK }}>real, <span style={{ color: GREEN }}>premium</span> design</span></div>
    {/* before: ugly generic templates jitter, then get swept out */}
    {UGLY.map((u, i) => { const e = over(f, fr(s) + 4 + i * 3, 10); const jx = Math.sin(lf / 5 + i * 2) * 3, jy = Math.cos(lf / 6 + i) * 2; const exit = rev; const ex = (i - 1) * 318;
      return (<div key={`u${i}`} style={{ position: "absolute", left: CX + ex - 150 + jx + exit * (i - 1) * 80, top: cy - 190 + jy + exit * 120, width: 300, height: 380, opacity: e * (1 - exit), transform: `rotate(${(i - 1) * 4 - exit * (i - 1) * 14}deg) scale(${(0.9 + Math.min(e, 1) * 0.1) * (1 - exit * 0.3)})`, zIndex: 2 }}>
        <div style={{ width: "100%", height: "100%", borderRadius: 16, background: u.bg, border: "3px dashed #b9bdbf", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", boxShadow: IMSH }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#cdd0d2", marginBottom: 18 }} />
          <div style={{ fontFamily: "Arial", fontWeight: 700, fontSize: 36, color: "#888d94" }}>{u.txt}</div>
          <div style={{ width: 160, height: 13, background: "#cdd0d2", borderRadius: 4, marginTop: 18 }} /><div style={{ width: 120, height: 13, background: "#cdd0d2", borderRadius: 4, marginTop: 9 }} />
          <div style={{ marginTop: 22, padding: "9px 26px", background: "#9aa0a6", color: "#fff", borderRadius: 6, fontFamily: "Arial", fontWeight: 700, fontSize: 22 }}>BUY NOW</div></div></div>); })}
    {/* red X over the cluster (before) */}
    <div style={{ position: "absolute", left: CX - 30, top: cy - 250, width: 60, height: 60, borderRadius: "50%", background: grad(RED, "#A83329"), display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: 34, boxShadow: IMSH, opacity: (1 - rev) * over(f, fr(s) + 10, 10), zIndex: 8 }}>✕</div>
    {/* sweep flash */}
    {sweep > 0 && sweep < 1 && <div style={{ position: "absolute", left: interpolate(sweep, [0, 1], [-460, 1500]), top: 600, width: 360, height: 760, background: "linear-gradient(100deg, transparent, rgba(231,197,114,0.55), rgba(255,255,255,0.7), transparent)", transform: "skewX(-12deg)", zIndex: 6 }} />}
    {/* after: premium real designs slam in, fanned */}
    {PREMIUM.map((P, i) => { const off = i - 1; const p = over(lf, 60 + i * 5, 14); const w = i === 1 ? 320 : 268;
      return (<div key={`p${i}`} style={{ position: "absolute", left: CX + off * 250 - w / 2, top: cy - w / 2 + Math.abs(off) * 26 - (i === 1 ? 20 : 0) + Math.sin(lf / 22 + i) * 4, opacity: Math.min(1, p * 1.5), transform: `rotate(${off * 7}deg) scale(${0.5 + Math.min(p, 1) * 0.5})`, zIndex: i === 1 ? 9 : 7 }}>
        <Design w={w} bw={1080} bh={1080} glow={i === 1 ? 0.5 + pulse * 0.2 : 0}><P /></Design><Glint lf={lf} start={74 + i * 4} dur={18} r={20} /></div>); })}
    {/* green check (after) */}
    <div style={{ position: "absolute", left: CX - 30, top: cy - 256, width: 60, height: 60, borderRadius: "50%", background: grad(GREEN, "#2F7E5C"), display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${rev})`, boxShadow: IMSH, opacity: rev, zIndex: 12 }}><svg width={30} height={30} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round"><path d="M4 12 L10 18 L20 6" /></svg></div>
    <Spark cx={CX} cy={cy - 10} at={62} lf={lf} n={10} spread={300} />
  </AbsoluteFill>); };

// ===== S2 SETUP — your brand kit (tokens fly in) → your designer =====
const SetupScene: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s); const pulse = Math.max(0, Math.sin(lf / 8)); const arrow = ramp(lf, 56, 84); const kitIn = over(f, fr(s) + 4, 14);
  const tokens = [{ t: "logo", x: -300, y: -40, at: 18 }, { t: "colors", x: 300, y: -10, at: 26 }, { t: "type", x: -260, y: 70, at: 34 }, { t: "voice", x: 280, y: 90, at: 42 }];
  return (<AbsoluteFill>
    <Bloom cx={CX} cy={840} w={980} color="rgba(58,92,132,0.18)" lf={lf} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 472, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ position: "relative", opacity: kitIn, transform: `translateY(${(1 - kitIn) * 24}px) scale(${(0.9 + Math.min(kitIn, 1) * 0.1) + ramp(lf, 50, 110) * 0.02})` }}>
        <Design w={668} bw={1080} bh={820} r={26}><BrandKit /></Design><Glint lf={lf} start={48} dur={22} r={26} />
        {/* brand tokens fly into the kit (2nd act) */}
        {tokens.map((tk, i) => { const a = ramp(lf, tk.at, tk.at + 12); const fly = 1 - a; return (<div key={i} style={{ position: "absolute", left: 334 + tk.x * fly - 50, top: 254 + tk.y * fly, opacity: Math.sin(a * Math.PI), fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 26, color: SLATE, background: "#fff", padding: "8px 18px", borderRadius: 999, boxShadow: IMSH }}>{tk.t}</div>); })}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 34, opacity: arrow, transform: `scale(${0.85 + arrow * 0.15})` }}>
        <ClaudeMark size={76} glow={0.5 + pulse * 0.3} />
        <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 48, color: INK }}>becomes your <span style={{ color: CLAY }}>designer.</span></span></div>
    </div>
  </AbsoluteFill>); };

// ===== S3 SOCIAL — a week of real on-brand posts laid out as a calendar (in-frame, day tags) =====
const SOCIAL = [Gjibby, Gpiropo, Gmentus, Grouge, Gmomento, Gconverse];
const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT"];
const SocialScene: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s); const W = 224; const GAPX = 244, GAPY = 252; const ROWY = 726;
  return (<AbsoluteFill>
    <Bloom cx={CX} cy={946} w={1000} color="rgba(203,148,86,0.13)" lf={lf} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 500, textAlign: "center" }}><span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 50, color: INK }}>a week of posts, <span style={{ color: GREEN }}>on brand</span></span></div>
    {SOCIAL.map((P, i) => { const col = i % 3, row = Math.floor(i / 3); const e = over(f, fr(s) + 6 + i * 5, 11); const fl = Math.sin(lf / 22 + i) * 3;
      const x = CX + (col - 1) * GAPX; const y = ROWY + row * GAPY; const left = x - W / 2; const top = y - W / 2;
      return (<div key={i} style={{ position: "absolute", left, top: top + (1 - e) * 22 + fl, opacity: e, transform: `scale(${0.72 + Math.min(e, 1) * 0.28})`, zIndex: 3 }}>
        <div style={{ position: "absolute", top: -14, left: 6, padding: "3px 12px", borderRadius: 999, background: "#fff", color: SLATE, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 17, letterSpacing: "0.08em", boxShadow: IMSH, opacity: ramp(lf, 6 + i * 5 + 6, 6 + i * 5 + 14), zIndex: 5 }}>{DAYS[i]}</div>
        <Design w={W} bw={1080} bh={1080} r={16}><P /></Design><Glint lf={lf} start={30 + i * 4} dur={16} r={16} /></div>); })}
    <div style={{ position: "absolute", left: 0, right: 0, top: 1196, textAlign: "center" }}>
      <span style={{ fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 600, fontSize: 34, color: MUTE }}>all designed in <span style={{ fontFamily: fraunces.fontFamily, fontStyle: "normal", fontWeight: 900, fontSize: 48, color: CLAY }}>{Math.round(ramp(lf, 18, 84) * 6)}</span> minutes</span></div>
  </AbsoluteFill>); };

// ===== S4 MORE — ad + thumbnail + one-pager, cleanly separated zones (no overlap), escalating reveals =====
const MoreScene: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s);
  const items = [
    { C: AdReal, bw: 1080, bh: 1350, w: 232, cx: 312, cy: 942, at: 6, rot: -2, label: "ad creative" },
    { C: ThumbReal, bw: 1280, bh: 720, w: 392, cx: 742, cy: 748, at: 24, rot: 2, label: "thumbnail" },
    { C: OnePager, bw: 1280, bh: 820, w: 392, cx: 742, cy: 1022, at: 44, rot: -1.5, label: "one-pager" },
  ];
  return (<AbsoluteFill>
    <Bloom cx={CX} cy={900} w={1000} color="rgba(207,149,68,0.16)" lf={lf} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 506, textAlign: "center" }}><span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 50, color: INK }}>your whole <span style={{ color: AMBER }}>content suite</span></span></div>
    {items.map((it, i) => { const e = over(f, fr(s) + it.at, 13); const fl = Math.sin(lf / 22 + i) * 4; const hh = it.w * it.bh / it.bw;
      return (<div key={i} style={{ position: "absolute", left: it.cx - it.w / 2, top: it.cy - hh / 2 + (1 - e) * 26 + fl, opacity: e, transform: `rotate(${it.rot}deg) scale(${0.78 + Math.min(e, 1) * 0.22})`, zIndex: i + 2 }}>
        <Design w={it.w} bw={it.bw} bh={it.bh}><it.C /></Design><Glint lf={lf} start={it.at + 14} dur={18} r={20} />
        <div style={{ position: "absolute", left: 10, top: -13, padding: "5px 15px", borderRadius: 999, background: grad("#26221C", "#15120E"), color: "#F4EFE6", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 19, boxShadow: IMSH, opacity: ramp(lf, it.at + 6, it.at + 14) }}>{it.label}</div>
      </div>); })}
  </AbsoluteFill>); };

// ===== S5 VALUE — a designer (1 asset, slow, $$) vs Claude (clean 2x2 set, one chat) =====
const SET = [Grezo, Gconverse, Gcoinbase, Gviva];
const ValueScene: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s); const pulse = Math.max(0, Math.sin(lf / 8)); const snap = over(lf, 56, 14); const mw = 102;
  return (<AbsoluteFill>
    <Bloom cx={CX} cy={916} w={980} color="rgba(210,114,78,0.17)" lf={lf} base={0.45 + pulse * 0.08} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 560, textAlign: "center" }}><span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 50, color: INK }}>hundreds <span style={{ color: MUTE }}>vs</span> <span style={{ color: CLAY }}>one chat</span></span></div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 668, display: "flex", justifyContent: "center", gap: 26, alignItems: "flex-start" }}>
      {/* designer: one asset, slow, struck-through price */}
      <div style={{ width: 360, padding: "30px 26px 32px", borderRadius: 26, background: "#fff", boxShadow: CARDSH, opacity: over(f, fr(s) + 4, 12) * 0.94, transform: `scale(${0.88 + over(f, fr(s) + 4, 12) * 0.12})`, textAlign: "center" }}>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 38, color: MUTE, marginBottom: 20 }}>a designer</div>
        <div style={{ display: "flex", justifyContent: "center", filter: "grayscale(0.4) saturate(0.8)", opacity: 0.9 }}><Design w={188} bw={1080} bh={1080} r={14}><Gpiropo /></Design></div>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 28, color: RED, marginTop: 22, textDecoration: "line-through", textDecorationColor: "rgba(196,74,58,0.55)" }}>hundreds each · a week</div></div>
      {/* claude: whole set, clean 2x2 grid (no overlap) */}
      <div style={{ width: 360, padding: "30px 26px 32px", borderRadius: 26, background: grad("#FBF7EF", "#F1E9DA"), boxShadow: `${SH}, 0 0 ${40 + pulse * 18}px rgba(210,114,78,0.42)`, border: `2.5px solid ${CLAY}`, opacity: over(f, fr(s) + 16, 12), transform: `scale(${(0.88 + over(f, fr(s) + 16, 12) * 0.12) * (1 + pulse * 0.012)})`, textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}><ClaudeMark size={60} glow={0.5 + pulse * 0.3} /></div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", width: mw * 2 + 12, margin: "0 auto" }}>{SET.map((P, i) => { const a = over(lf, 52 + i * 5, 12);
          return (<div key={i} style={{ opacity: a, transform: `scale(${0.4 + Math.min(a, 1) * 0.6})` }}><Design w={mw} bw={1080} bh={1080} r={10}><P /></Design></div>); })}</div>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 28, color: GREEN, marginTop: 18, opacity: snap }}>the whole set · one chat</div></div>
    </div>
  </AbsoluteFill>); };

// ===== CTA =====
const CTA: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const local = f - fr(s); if (local < 0) return null; const a = eOut(f, fr(s) + 2, 12); const pillPop = over(local, 10, 14); const pulse = 1 + Math.sin(f / 7) * 0.03;
  return (<AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
    {Array.from({ length: 16 }, (_, i) => { const wave = i < 12 ? 4 : 30; const p = eOut(f, fr(s) + wave + (i % 12), 28); const ang = (i / 8) * Math.PI; if (p <= 0 || p >= 1) return null; return <div key={i} style={{ position: "absolute", left: 540 + Math.cos(ang) * p * 360, top: 900 + Math.sin(ang) * p * 360, fontSize: 26, opacity: Math.sin(p * Math.PI), color: [SLATE, CLAY, GREEN, AMBER][i % 4] }}>✦</div>; })}
    <div style={{ marginTop: -150, transform: `scale(${0.7 + a * 0.3})`, opacity: a }}><ClaudeMark size={168} glow={0.5 + Math.sin(local / 9) * 0.12} /></div>
    <div style={{ marginTop: 46, transform: `scale(${(0.8 + pillPop * 0.2) * pulse})`, padding: "28px 56px", borderRadius: 999, background: CLAY, color: "#fff", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 66, boxShadow: "0 24px 54px rgba(210,114,78,0.42)", opacity: a }}>💬 Comment "DESIGN"</div>
    <div style={{ marginTop: 28, fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 600, fontSize: 42, color: INK, opacity: a, textAlign: "center" }}>and I'll send you the exact setup</div>
  </AbsoluteFill>); };

// ===== Captions =====
type Word = { word: string; start: number; end: number; line: number };
const WORDS = wordsData as Word[];
const cleanw = (w: string) => w.toLowerCase().replace(/[^a-z0-9'$]/g, "");
const EMPH = new Set(["claude", "design", "designs", "designer", "brand", "visuals", "agencies", "grand", "premium", "graphics", "social", "posts", "ad", "creative", "thumbnails", "one-pagers", "pitch", "slides", "minutes", "week", "comment", "setup", "style"]);
const CHUNKS = (() => { const byLine: Record<number, Word[]> = {}; for (const w of WORDS) (byLine[w.line] ||= []).push(w);
  const out: { words: Word[]; start: number; line: number }[] = [];
  for (const li of Object.keys(byLine).map(Number).sort((a, b) => a - b)) { const ws = byLine[li]; for (let i = 0; i < ws.length; i += 3) { const g = ws.slice(i, i + 3); out.push({ words: g, start: g[0].start, line: li }); } }
  const aE = Math.max(...WORDS.map((w) => w.end)); return out.map((c, i) => ({ ...c, end: i + 1 < out.length ? out[i + 1].start : aE + 0.4 })); })();
const Captions: React.FC = () => { const frame = useCurrentFrame();
  return (<>{CHUNKS.map((c, i) => { if (frame < fr(c.start) || frame >= fr(c.end)) return null; if (c.line === 6) return null;
    return (<div key={i} style={{ position: "absolute", top: 1276, left: 64, right: 64, height: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "center", gap: "0 16px", width: 952, textAlign: "center" }}>
        {c.words.map((w, j) => { const g = EMPH.has(cleanw(w.word)); const shown = frame >= fr(w.start);
          return <span key={j} style={{ display: "inline-block", opacity: shown ? 1 : 0, fontFamily: g ? frauncesItalic.fontFamily : fraunces.fontFamily, fontStyle: g ? "italic" : "normal", fontWeight: g ? 700 : 600, fontSize: g ? 84 : 72, lineHeight: 1.04, color: g ? SLATE : INK, letterSpacing: "-0.02em", textShadow: "0 2px 16px rgba(236,233,226,0.95)" }}>{w.word}</span>; })}
      </div></div>); })}</>); };

// moving progress bar (top safe-zone) — retention cue; inset from edge + thick rounded pill
const ProgressBar: React.FC = () => { const f = useCurrentFrame(); const { durationInFrames } = useVideoConfig(); const p = Math.min(1, f / (durationInFrames - 1));
  return (<div style={{ position: "absolute", left: 46, right: 46, top: 42, height: 13, borderRadius: 999, overflow: "visible", zIndex: 120 }}>
    <div style={{ position: "absolute", inset: 0, background: "rgba(58,92,132,0.15)", borderRadius: 999 }} />
    <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${p * 100}%`, background: grad("#E08A66", "#C5603C"), borderRadius: 999, boxShadow: "0 2px 8px rgba(210,114,78,0.35)" }} />
    <div style={{ position: "absolute", left: `${p * 100}%`, top: -3, width: 19, height: 19, borderRadius: "50%", background: CLAY, border: "3px solid #F3EFE7", boxShadow: "0 0 12px rgba(210,114,78,0.9)", transform: "translateX(-50%)" }} /></div>); };

const L = [0, 3.12, 7.78, 12.38, 15.52, 22.71, 27.56];
const Sfx: React.FC<{ at: number; src: string; v?: number; dur?: number }> = ({ at, src, v = 0.3, dur = 2.5 }) => (<Sequence from={fr(at)} durationInFrames={fr(dur)}><Audio src={staticFile(`sfx/${src}`)} volume={v} /></Sequence>);
// a tick on each staggered card reveal (texture / engagement)
const Ticks: React.FC<{ start: number; n: number; step: number; src?: string; v?: number }> = ({ start, n, step, src = "tick.wav", v = 0.28 }) => (<>{Array.from({ length: n }, (_, i) => <Sfx key={i} at={start + i * step} src={src} v={v} dur={0.5} />)}</>);

export const ClaudeDesignerReel: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 16, 28], [1.0, 1.05, 1.0], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  return (<AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
    <Audio src={staticFile("vo_design.wav")} />
    <Audio loop src={staticFile("seo_music.wav")} volume={(ff) => interpolate(ff, [0, fr(1.6), fr(L[6]) - 10, fr(L[6]) + 16, 99999], [0, 0.2, 0.2, 0.15, 0.15], { extrapolateRight: "clamp" })} />
    {/* opening sting — audible riser (louder asset) + sub + boom on the slam */}
    <Sfx at={0} src="metal_riser.wav" v={0.85} /><Sfx at={0} src="sub.wav" v={0.8} />
    <Sfx at={0.25} src="boom.wav" v={0.7} /><Sfx at={0.25} src="shimmer.wav" v={0.5} /><Sfx at={0.25} src="whoosh.wav" v={0.5} />
    <Ticks start={0.3} n={5} step={0.16} src="blip2.wav" v={0.22} /><Sfx at={0.8} src="impact.wav" v={0.5} /><Sfx at={1.6} src="ding.wav" v={0.4} /><Sfx at={1.9} src="snap.wav" v={0.6} />
    {/* scene transitions */}
    {L.slice(1).map((t, i) => <React.Fragment key={i}><Sfx at={t - 0.1} src="swish.wav" v={0.44} /><Sfx at={t + 0.35} src="pop.wav" v={0.36} /></React.Fragment>)}
    {/* contrast flip */}<Sfx at={4.6} src="whoosh.wav" v={0.48} /><Sfx at={5.0} src="thock.wav" v={0.45} />
    {/* setup tokens fly in */}<Ticks start={8.4} n={4} step={0.27} src="blip3.wav" v={0.3} /><Sfx at={9.8} src="ding.wav" v={0.5} />
    {/* social: 6 posts deal in + counter */}<Ticks start={12.7} n={6} step={0.17} src="tick.wav" v={0.34} /><Sfx at={14.3} src="data.wav" v={0.45} />
    {/* more: 3 formats reveal */}<Sfx at={15.9} src="snap.wav" v={0.5} /><Sfx at={16.5} src="key.wav" v={0.4} /><Sfx at={18.4} src="snap.wav" v={0.48} /><Sfx at={20.4} src="snap.wav" v={0.48} />
    {/* value: set snaps in */}<Sfx at={23.0} src="thock.wav" v={0.42} /><Ticks start={24.4} n={4} step={0.17} src="blip4.wav" v={0.34} /><Sfx at={25.4} src="ding.wav" v={0.55} />
    <Sfx at={L[6]} src="resolve.wav" v={0.5} /><Sfx at={L[6] + 0.2} src="angelic.wav" v={0.4} dur={3.6} /><Sfx at={L[6] + 0.4} src="sparkle.wav" v={0.55} />
    <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "50% 46%" }}>
      <Background />
      <Scene s={L[0]} e={L[1]}><DesignHook s={L[0]} /></Scene>
      <Scene s={L[1]} e={L[2]}><ContrastScene s={L[1]} /></Scene>
      <Scene s={L[2]} e={L[3]}><SetupScene s={L[2]} /></Scene>
      <Scene s={L[3]} e={L[4]}><SocialScene s={L[3]} /></Scene>
      <Scene s={L[4]} e={L[5]}><MoreScene s={L[4]} /></Scene>
      <Scene s={L[5]} e={L[6]}><ValueScene s={L[5]} /></Scene>
      <CTA s={L[6]} />
      <HeroHeader />
      <Captions />
    </AbsoluteFill>
    <ProgressBar />
  </AbsoluteFill>); };
