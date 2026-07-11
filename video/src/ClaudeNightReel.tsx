import React from "react";
import { AbsoluteFill, Audio, Easing, Img, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { fraunces, frauncesItalic, inter } from "./fonts";
import wordsData from "./data/words_night.json";

/**
 * ClaudeNightReel — "8 hours of work while you sleep → one page by 7am" (overnight agent).
 * REVAMP v2 (premium): every scene = one BIG, optically-centered hero on x=490,y≈248, built in
 * named z-layers (Bloom → back-parallax MoonStars → ContactShadow → frosted hero → Glint/dust),
 * every surface ships gradient + stacked navy-tinted shadow + Sheen + rim + inner-highlight.
 * Night identity (crescent moon/stars/navy) recurs; dawn warmth grows scene→scene (night→7am).
 */
const CREAM = "#ECE9E2", INK = "#1A1813", SLATE = "#3A5C84", SLATE2 = "#5C7CA8", CLAY = "#D2724E", AMBER = "#CF9544", GREEN = "#3F9E74", MUTE = "#9A968B", PAPER = "#FBF7EF";
const NAVY = "#2A3A5E", NAVY2 = "#16203A", STAR = "#EAD9A4", DAWN = "#F0BE84";
const FPS = 30; const fr = (s: number) => s * FPS;
const eOut = (f: number, sF: number, d = 10) => interpolate(f, [sF, sF + d], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
const eIn = (f: number, sF: number, d = 10) => interpolate(f, [sF, sF + d], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) });
const ramp = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const over = (f: number, sF: number, d = 12) => interpolate(f, [sF, sF + d * 0.5, sF + d], [0, 1.16, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
const frac = (x: number) => x - Math.floor(x); const rnd = (i: number, s = 0) => frac(Math.sin(i * 12.9898 + s * 78.233) * 43758.5453);
const lerpC = (a: string, b: string, t: number): string => { const tt = Math.max(0, Math.min(1, t)); const pa = [parseInt(a.slice(1, 3), 16), parseInt(a.slice(3, 5), 16), parseInt(a.slice(5, 7), 16)]; const pb = [parseInt(b.slice(1, 3), 16), parseInt(b.slice(3, 5), 16), parseInt(b.slice(5, 7), 16)]; const c = pa.map((v, i) => Math.round(v + (pb[i] - v) * tt)); return `rgb(${c[0]},${c[1]},${c[2]})`; };
const grad = (a: string, b: string) => `linear-gradient(158deg, ${a} 0%, ${b} 100%)`;
const CLAUDE_PATH = "m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z";

// ===== shared premium tokens / primitives =====
const SH = "inset 0 1.5px 0 rgba(255,255,255,0.5), 0 2px 4px rgba(34,30,24,0.22), 0 10px 22px rgba(34,30,24,0.20), 0 30px 60px rgba(20,26,45,0.26)";
const SHN = "inset 0 1px 0 rgba(234,217,164,0.20), 0 2px 4px rgba(16,20,34,0.32), 0 12px 26px rgba(16,20,34,0.28), 0 30px 60px rgba(20,26,45,0.34)";
const Sheen: React.FC<{ r: number | string; o?: number }> = ({ r, o = 0.34 }) => (<div style={{ position: "absolute", inset: 0, borderRadius: r, background: `linear-gradient(125deg, rgba(255,255,255,${o}) 0%, rgba(255,255,255,0) 33%)`, pointerEvents: "none" }} />);
const Glint: React.FC<{ r: number | string; t: number }> = ({ r, t }) => { if (t <= 0 || t >= 1) return null; const sx = -60 + t * 220; return (<div style={{ position: "absolute", inset: 0, borderRadius: r, overflow: "hidden", pointerEvents: "none" }}><div style={{ position: "absolute", top: "-20%", height: "140%", width: "45%", left: `${sx}%`, transform: "skewX(-18deg)", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)", opacity: Math.sin(t * Math.PI) }} /></div>); };
const Contact: React.FC<{ cx: number; cy: number; w: number; sx?: number; op?: number }> = ({ cx, cy, w, sx = 1, op = 0.34 }) => (<div style={{ position: "absolute", left: cx - w / 2, top: cy - (w * 0.13) / 2, width: w, height: w * 0.13, borderRadius: "50%", background: `radial-gradient(ellipse, rgba(20,26,45,${op}), transparent 70%)`, filter: "blur(7px)", transform: `scaleX(${sx})`, pointerEvents: "none" }} />);
const Bloom: React.FC<{ cx: number; cy: number; w: number; h?: number; color: string; lf: number; base?: number }> = ({ cx, cy, w, h, color, lf, base = 0.7 }) => (<div style={{ position: "absolute", left: cx - w / 2, top: cy - (h || w) / 2, width: w, height: h || w, borderRadius: "50%", background: `radial-gradient(circle at 50% 44%, ${color} 0%, transparent 62%)`, opacity: base + Math.sin(lf / 9) * 0.3, pointerEvents: "none" }} />);
const Dust: React.FC<{ lf: number; n?: number; seed?: number; w?: number; h?: number }> = ({ lf, n = 7, seed = 0, w = 980, h = 560 }) => (<>{Array.from({ length: n }, (_, i) => { const x = rnd(i, seed) * w, y = rnd(i, seed + 1) * h; const edge = x < w * 0.24 || x > w * 0.76 || y < h * 0.22 || y > h * 0.74; if (!edge) return null; const tw = 0.3 + 0.7 * (Math.sin(lf / 8 + i) * 0.5 + 0.5); return <div key={i} style={{ position: "absolute", left: x, top: y, fontSize: 8 + rnd(i, seed + 2) * 8, color: [STAR, AMBER, SLATE2][i % 3], opacity: tw * 0.34 }}>✦</div>; })}</>);
const MoonStars: React.FC<{ lf: number; x: number; y: number; size?: number; color?: string; n?: number; night?: number; spread?: number }> = ({ lf, x, y, size = 40, color = STAR, n = 6, night = 1, spread = 220 }) => (
  <div style={{ position: "absolute", inset: 0, filter: "blur(1.2px)", opacity: 0.55 * night, pointerEvents: "none" }}>
    <div style={{ position: "absolute", left: x - size / 2 + Math.sin(lf / 40) * 6, top: y - size / 2 }}><Moon size={size} color={color} glow={0.5 * night} /></div>
    {Array.from({ length: n }, (_, i) => { const sx = x - spread / 2 + rnd(i, 3) * spread, sy = y - 30 + rnd(i, 4) * 110; const tw = 0.3 + 0.7 * (Math.sin(lf / 8 + i) * 0.5 + 0.5); return <div key={i} style={{ position: "absolute", left: sx, top: sy, fontSize: 7 + rnd(i, 5) * 7, color, opacity: tw * night }}>✦</div>; })}
  </div>
);

type Word = { word: string; start: number; end: number; line: number };
const WORDS = wordsData as Word[];
const norm = (w: string) => w.toLowerCase().replace(/[.,!?"]/g, "");
const EMPH = new Set(["sleep", "8", "hours", "7am", "overnight.", "decision,", "drafted.", "carousel", "voice,", "100", "one", "page", "page,", "changed,", "decide,", "ship.", "ahead", "once", "night.", "night", "tabs."]);
const CHUNKS = (() => {
  const byLine: Record<number, Word[]> = {}; for (const w of WORDS) (byLine[w.line] ||= []).push(w);
  const out: { words: Word[]; start: number; line: number }[] = [];
  for (const li of Object.keys(byLine).map(Number).sort((a, b) => a - b)) { const ws = byLine[li]; for (let i = 0; i < ws.length; i += 3) { const g = ws.slice(i, i + 3); out.push({ words: g, start: g[0].start, line: li }); } }
  const aE = Math.max(...WORDS.map((w) => w.end));
  return out.map((c, i) => ({ ...c, end: i + 1 < out.length ? out[i + 1].start : aE + 0.4 }));
})();
const Captions: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame < 138) return null;
  return (<>{CHUNKS.map((c, i) => {
    if (frame < fr(c.start) || frame >= fr(c.end)) return null;
    if (c.line === 7) return null;
    return (<div key={i} style={{ position: "absolute", top: 1180, left: 70, right: 70, height: 220, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "center", gap: "0 15px", width: 980, textAlign: "center" }}>
        {c.words.map((w, j) => { const g = EMPH.has(w.word) || EMPH.has(norm(w.word)); const shown = frame >= fr(w.start);
          return <span key={j} style={{ display: "inline-block", opacity: shown ? 1 : 0, fontFamily: g ? frauncesItalic.fontFamily : fraunces.fontFamily, fontStyle: g ? "italic" : "normal", fontWeight: g ? 700 : 600, fontSize: g ? 76 : 66, lineHeight: 1.05, color: g ? SLATE : INK, letterSpacing: "-0.02em", textShadow: "0 2px 16px rgba(236,233,226,0.95)" }}>{w.word}</span>; })}
      </div></div>); })}</>);
};

const Scene: React.FC<{ s: number; e: number; children: React.ReactNode }> = ({ s, e, children }) => {
  const frame = useCurrentFrame(); const local = frame - fr(s); const lenF = fr(e - s);
  if (local < 0 || local > lenF) return null;
  const op = Math.min(eOut(frame, fr(s), 4), 1 - eOut(frame, fr(e - 0.14), 5));
  const push = (1 - eOut(frame, fr(s), 8)) * 6 - eIn(frame, fr(e - 0.18), 6) * 6;
  return <AbsoluteFill style={{ opacity: op, transform: `translateX(${push}px)` }}>{children}</AbsoluteFill>;
};
// 980x560 centered stage; all scene coords are local to it (optical center 490, ~248)
const Stage: React.FC<{ children: React.ReactNode }> = ({ children }) => (<div style={{ position: "absolute", top: 522, left: "50%", marginLeft: -490, width: 980, height: 560 }}>{children}</div>);

const ClaudeMark: React.FC<{ size: number; glow?: number }> = ({ size, glow = 0.34 }) => (
  <div style={{ position: "relative", width: size, height: size, borderRadius: size * 0.28, background: grad("#E08A66", "#C5603C"), boxShadow: `${SH}, 0 0 ${Math.round(size * 0.26)}px rgba(210,114,78,${glow})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
    <svg viewBox="0 0 24 24" width={size * 0.58} height={size * 0.58} style={{ filter: "drop-shadow(0 1px 1px rgba(120,40,20,0.25))" }}><path fill="#F6EFE6" d={CLAUDE_PATH} /></svg>
    <Sheen r={size * 0.28} />
  </div>
);
const Moon: React.FC<{ size: number; color?: string; glow?: number }> = ({ size, color = STAR, glow = 0 }) => (
  <div style={{ position: "relative", width: size, height: size }}>
    {glow > 0 && <div style={{ position: "absolute", left: -size * 0.35, top: -size * 0.35, width: size * 1.7, height: size * 1.7, borderRadius: "50%", background: `radial-gradient(circle, ${color}66, transparent 64%)`, opacity: glow }} />}
    <svg width={size} height={size} viewBox="0 0 100 100"><defs><linearGradient id={`mg${Math.round(size)}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={STAR} /><stop offset="1" stopColor={color === STAR ? AMBER : color} /></linearGradient></defs><path d="M70 6 A47 47 0 1 0 70 94 A37 47 0 1 1 70 6 Z" fill={`url(#mg${Math.round(size)})`} /></svg>
  </div>
);
const Clock: React.FC<{ size: number; spin: number }> = ({ size, spin }) => (
  <div style={{ position: "relative", width: size, height: size, borderRadius: "50%", background: "radial-gradient(circle at 38% 30%, rgba(251,247,239,0.18), rgba(22,32,58,0.30))", border: "1px solid rgba(255,255,255,0.35)", boxShadow: "inset 0 1px 0 rgba(234,217,164,0.2), 0 6px 16px rgba(16,20,34,0.4)" }}>
    <svg width={size} height={size} viewBox="0 0 100 100">
      {Array.from({ length: 12 }, (_, i) => { const a = (i / 12) * Math.PI * 2; return <line key={i} x1={50 + Math.cos(a) * 38} y1={50 + Math.sin(a) * 38} x2={50 + Math.cos(a) * 44} y2={50 + Math.sin(a) * 44} stroke={STAR} strokeWidth={i % 3 === 0 ? 3.5 : 2} opacity={0.7} />; })}
      <line x1={50} y1={50} x2={50 + Math.cos(spin * 0.0837 - 1.57) * 20} y2={50 + Math.sin(spin * 0.0837 - 1.57) * 20} stroke={SLATE2} strokeWidth={5} strokeLinecap="round" />
      <line x1={50} y1={50} x2={50 + Math.cos(spin - 1.57) * 30} y2={50 + Math.sin(spin - 1.57) * 30} stroke={CLAY} strokeWidth={3.5} strokeLinecap="round" />
      <circle cx={50} cy={50} r={4.5} fill={CLAY} />
    </svg>
    <Sheen r="50%" o={0.18} />
  </div>
);
const Ic: React.FC<{ t: string; s?: number; c?: string }> = ({ t, s = 30, c = "#fff" }) => {
  const p: Record<string, React.ReactNode> = {
    dollar: <text x={15} y={22} fontSize={21} fontWeight={900} fill={c} textAnchor="middle" fontFamily="Inter">$</text>,
    list: <g stroke={c} strokeWidth={2.6} strokeLinecap="round"><line x1={8} y1={10} x2={22} y2={10} /><line x1={8} y1={15} x2={22} y2={15} /><line x1={8} y1={20} x2={18} y2={20} /></g>,
    case: <g fill={c}><rect x={7} y={12} width={16} height={11} rx={2} /><rect x={11} y={8} width={8} height={4} rx={1.5} fill="none" stroke={c} strokeWidth={2.4} /></g>,
    mail: <g fill="none" stroke={c} strokeWidth={2.6} strokeLinejoin="round"><rect x={6} y={9} width={18} height={13} rx={2} /><path d="M6 11 L15 17 L24 11" /></g>,
    reply: <g fill="none" stroke={c} strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round"><path d="M7 8 h16 a2 2 0 0 1 2 2 v7 a2 2 0 0 1 -2 2 h-9 l-5 4 v-4 h-2 a2 2 0 0 1 -2 -2 v-7 a2 2 0 0 1 2 -2 z" /></g>,
    note: <g fill="none" stroke={c} strokeWidth={2.6} strokeLinecap="round"><line x1={9} y1={11} x2={21} y2={11} /><line x1={9} y1={16} x2={21} y2={16} /><line x1={9} y1={21} x2={16} y2={21} /></g>,
    delta: <path d="M15 8 L23 22 L7 22 Z" fill="none" stroke={c} strokeWidth={2.6} strokeLinejoin="round" />,
    branch: <g fill={c} stroke={c} strokeWidth={2.4}><circle cx={9} cy={15} r={2.4} /><circle cx={21} cy={9} r={2.4} /><circle cx={21} cy={21} r={2.4} /><line x1={11} y1={15} x2={19} y2={9} /><line x1={11} y1={15} x2={19} y2={21} /></g>,
    ship: <path d="M9 21 L21 9 M21 9 H13 M21 9 V17" fill="none" stroke={c} strokeWidth={2.8} strokeLinecap="round" strokeLinejoin="round" />,
    wave: <g stroke={c} strokeWidth={2.6} strokeLinecap="round"><line x1={7} y1={15} x2={7} y2={15} /><line x1={11} y1={11} x2={11} y2={19} /><line x1={15} y1={7} x2={15} y2={23} /><line x1={19} y1={11} x2={19} y2={19} /><line x1={23} y1={14} x2={23} y2={16} /></g>,
    quote: <g fill={c}><path d="M9 18 q-2 0 -2 -2 v-3 q0 -3 3 -4 l1 2 q-2 1 -2 2 h1 q1 0 1 1 v2 q0 2 -3 2 z" /><path d="M18 18 q-2 0 -2 -2 v-3 q0 -3 3 -4 l1 2 q-2 1 -2 2 h1 q1 0 1 1 v2 q0 2 -3 2 z" /></g>,
    send: <path d="M7 15 L23 8 L17 23 L14 16 Z" fill={c} />,
    check: <path d="M7 15 l5 5 L23 8" fill="none" stroke={c} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />,
    radar: <g fill="none" stroke={c} strokeWidth={2.4}><circle cx={15} cy={15} r={8} /><circle cx={15} cy={15} r={3.5} /></g>,
  };
  return <svg width={s} height={s} viewBox="0 0 30 30" style={{ filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.25))" }}>{p[t]}</svg>;
};
const Chip: React.FC<{ t: string; a: string; b: string; size: number; r?: number; glow?: number; gt?: number }> = ({ t, a, b, size, r, glow = 0, gt }) => (
  <div style={{ position: "relative", width: size, height: size, borderRadius: r ?? size * 0.28, background: grad(a, b), boxShadow: `${SH}${glow > 0 ? `, 0 0 ${size * 0.5}px ${a}${Math.round(glow * 255).toString(16).padStart(2, "0")}` : ""}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
    <Ic t={t} s={size * 0.6} />
    <Sheen r={r ?? size * 0.28} />
    {gt !== undefined && <Glint r={r ?? size * 0.28} t={gt} />}
  </div>
);
// the "one page" Brief — signature payoff object
const Brief: React.FC<{ w: number; lit?: [number, number, number]; glow?: number; gt?: number }> = ({ w, lit = [0, 0, 0], glow = 0.4, gt }) => {
  const h = w * 1.38; const secs = [{ t: "delta", c: SLATE }, { t: "branch", c: AMBER }, { t: "ship", c: GREEN }];
  return (
    <div style={{ position: "relative", width: w, height: h, borderRadius: w * 0.06, background: grad("#FFFDF8", "#F2EEE4"), border: `${Math.max(2, w * 0.009)}px solid ${CLAY}`, boxShadow: `${SH}, inset 0 0 0 1px rgba(255,255,255,0.4)${glow > 0 ? `, 0 0 ${glow * w * 0.2}px rgba(210,114,78,${glow * 0.6})` : ""}`, overflow: "hidden" }}>
      <div style={{ position: "absolute", top: w * 0.06, left: w * 0.07, right: w * 0.07, display: "flex", alignItems: "center", gap: w * 0.05 }}>
        <Moon size={w * 0.12} color={CLAY} /><div style={{ flex: 1, height: w * 0.045, borderRadius: 99, background: grad("#CBB89A", "#E2DCCF") }} /><div style={{ width: w * 0.2, height: w * 0.07, borderRadius: 99, background: "rgba(234,217,164,0.5)", border: "1px solid rgba(207,149,68,0.5)" }} />
      </div>
      <div style={{ position: "absolute", top: w * 0.26, left: w * 0.07, right: w * 0.07, height: 1.5, background: "rgba(58,92,132,0.18)" }} />
      <div style={{ position: "absolute", top: w * 0.32, left: w * 0.07, right: w * 0.07, display: "flex", flexDirection: "column", gap: w * 0.05 }}>
        {secs.map((s, i) => { const e = lit[i]; return (
          <div key={i} style={{ position: "relative", display: "flex", alignItems: "center", gap: w * 0.05, padding: w * 0.022, borderRadius: w * 0.035, background: e > 0.05 ? "rgba(255,255,255,0.5)" : "transparent", boxShadow: e > 0.3 ? `0 0 ${e * w * 0.1}px ${s.c}55` : "none", opacity: 0.42 + e * 0.58 }}>
            <div style={{ width: w * 0.16, height: w * 0.16, borderRadius: w * 0.04, background: e > 0.05 ? grad(s.c, s.c) : grad("#D8CBB0", "#CBB89A"), display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${0.9 + e * 0.1})` }}><Ic t={s.t} s={w * 0.1} /></div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: w * 0.022 }}>
              <div style={{ width: `${62 + i * 10}%`, height: w * 0.03, borderRadius: 99, background: e > 0.05 ? grad(s.c, lerpC(s.c.slice(0, 7), "#ffffff", 0.25)) : "#D8CBB0", transform: `scaleX(${0.4 + e * 0.6})`, transformOrigin: "left" }} />
              <div style={{ width: `${44 + i * 8}%`, height: w * 0.024, borderRadius: 99, background: "#D8CBB0" }} />
            </div>
          </div>); })}
      </div>
      <Sheen r={w * 0.06} />
      {gt !== undefined && <Glint r={w * 0.06} t={gt} />}
    </div>
  );
};

// ============================ SCENE 0 — HOOK (v3: sealed-brief curiosity gap) ============================
const NightHook: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const lf = f - fr(s);
  const kicker = eOut(lf, 0, 7);
  const l2on = (i: number) => Math.max(0, Math.min(1, (lf - (6 + i * 1.6)) / 3));
  const somePop = over(lf, 12, 8);
  const l3 = eOut(lf, 20, 8);
  const briefUp = over(lf, 22, 14);
  const briefOp = eOut(lf, 22, 10);
  const unread = over(lf, 33, 9);
  const dawn = ramp(lf, 74, 134);
  const bob = Math.sin(lf / 22) * 5;
  const l2words = ["Claude", "left", "something", "on", "your", "desk."];
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: 80, top: 540, width: 920, height: 780, borderRadius: "50%", background: "radial-gradient(circle at 50% 42%, rgba(58,78,120,0.30) 0%, transparent 62%)", opacity: 0.7 + Math.sin(lf / 9) * 0.22 }} />
      <div style={{ position: "absolute", left: 80, top: 540, width: 920, height: 780, borderRadius: "50%", background: "radial-gradient(circle at 50% 56%, rgba(224,160,90,0.26) 0%, transparent 60%)", opacity: dawn }} />
      <div style={{ position: "absolute", left: 868, top: 300, opacity: 0.5 * (1 - dawn * 0.6) }}><Moon size={62} color={STAR} glow={0.4} /></div>
      {Array.from({ length: 9 }, (_, i) => { const x = 130 + rnd(i, 1) * 800, y = 250 + rnd(i, 2) * 1000; const tw = 0.4 + 0.6 * (Math.sin(lf / 8 + i) * 0.5 + 0.5); return <div key={i} style={{ position: "absolute", left: x, top: y, width: 3 + rnd(i, 3) * 3, height: 3 + rnd(i, 3) * 3, borderRadius: "50%", background: STAR, opacity: 0.5 * tw * (1 - dawn * 0.5) }} />; })}

      <div style={{ position: "absolute", left: 84, top: 300, opacity: kicker, transform: `translateX(${(1 - kicker) * -16}px)`, fontFamily: fraunces.fontFamily, fontWeight: 600, fontSize: 42, letterSpacing: "0.08em", color: SLATE }}>BY THE TIME YOU'RE UP</div>

      <div style={{ position: "absolute", left: 84, top: 360, width: 884, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 74, lineHeight: 1.02, letterSpacing: "-0.02em" }}>
        {l2words.map((w, i) => { const on = l2on(i); const isClaude = w === "Claude"; const isSome = w === "something"; return (
          <span key={i} style={{ display: "inline-block", marginRight: 16, opacity: on, transform: isSome ? `scale(${0.9 + somePop * 0.1})` : `translateY(${(1 - on) * 10}px)`, transformOrigin: "left bottom", color: isClaude || isSome ? CLAY : INK, fontStyle: isSome ? "italic" : "normal", fontFamily: isSome ? frauncesItalic.fontFamily : fraunces.fontFamily, textShadow: "0 2px 16px rgba(236,233,226,0.92)" }}>{w}</span>); })}
      </div>

      <div style={{ position: "absolute", left: 86, top: 526, opacity: l3, transform: `translateY(${(1 - l3) * 10}px)`, fontFamily: fraunces.fontFamily, fontWeight: 500, fontSize: 40, color: INK, lineHeight: 1.22, textShadow: "0 2px 14px rgba(236,233,226,0.92)" }}>
        8 hours of work.<br /><span style={{ fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", color: SLATE }}>You haven't opened it yet.</span>
      </div>

      <div style={{ position: "absolute", left: 340, top: 690, width: 400, opacity: briefOp, transform: `translateY(${(1 - briefUp) * 72 + bob}px) rotate(-3deg) scale(${0.92 + briefUp * 0.08})`, transformOrigin: "50% 100%" }}>
        <div style={{ position: "relative", borderRadius: 18, overflow: "hidden", background: grad("#FBF7EF", "#EFE7D6"), boxShadow: SHN }}>
          <div style={{ height: 92, background: grad("#26354F", "#1A2740"), display: "flex", alignItems: "center", padding: "0 22px", gap: 12 }}>
            <div style={{ width: 42, height: 42, borderRadius: 11, background: grad("#E08A66", "#C5603C"), display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 6px rgba(0,0,0,0.3)" }}>
              <svg width={24} height={24} viewBox="0 0 24 24"><g stroke="#FBF1E6" strokeWidth={2.2} strokeLinecap="round"><line x1="12" y1="4" x2="12" y2="20" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="6.3" y1="6.3" x2="17.7" y2="17.7" /><line x1="6.3" y1="17.7" x2="17.7" y2="6.3" /></g></svg>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 27, color: STAR, letterSpacing: "0.02em" }}>DAILY BRIEF</span>
              <span style={{ fontFamily: inter.fontFamily, fontWeight: 500, fontSize: 14, color: "rgba(234,217,164,0.72)" }}>prepared overnight · 7:00 AM</span>
            </div>
          </div>
          <div style={{ padding: "26px 24px 30px", filter: "blur(7px)" }}>
            {[0, 1, 2, 3, 4, 5, 6].map((i) => { const w = [92, 78, 88, 64, 84, 72, 50][i]; const head = i === 0 || i === 4; return <div key={i} style={{ height: head ? 15 : 11, width: `${w}%`, borderRadius: 5, background: head ? SLATE : "#C2C9D4", marginBottom: 13, marginTop: head && i > 0 ? 12 : 0 }} />; })}
          </div>
          <Sheen r={18} o={0.24} />
          <Glint r={18} t={ramp(lf, 30, 48)} />
        </div>
        <div style={{ position: "absolute", top: 110, right: 18, padding: "8px 16px", borderRadius: 999, background: grad("#E7B45A", "#CF9544"), boxShadow: "0 5px 12px rgba(120,80,10,0.42)", zIndex: 6, transform: `rotate(4deg) scale(${0.6 + unread * 0.4})`, opacity: Math.min(1, unread * 1.3) }}><span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 18, letterSpacing: "0.1em", color: "#5A3A0A" }}>UNREAD</span></div>
      </div>
    </AbsoluteFill>
  );
};

// ============================ SCENE 1 — SETUP (3 jobs) ============================
const Setup3: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const lf = f - fr(s);
  const panelIn = over(f, fr(s) + 2, 15); const land = ramp(lf, 2, 16);
  const brainIn = over(f, fr(s) + 14, 13);
  const cx = 490, cy = 248, PW = 768, PH = 432;
  const ringSpin = lf * 2.4; const dawn = ramp(lf, 46, 110);
  const jobs = [{ t: "radar", a: "#4A6E9C", b: "#34507A", g: GREEN }, { t: "mail", a: "#DDA85C", b: "#CF9544", g: AMBER }, { t: "wave", a: "#56B488", b: "#3F9E74", g: GREEN }];
  const pulse = ramp(lf, 88, 104);
  return (
    <Stage>
      <Bloom cx={cx} cy={232} w={1180} h={740} color={lerpC("rgba(34,47,77,0.22)", "rgba(210,114,78,0.2)", dawn).replace("rgb", "rgba").replace(")", ",0.22)")} lf={lf} />
      <div style={{ position: "absolute", left: cx - 590, top: 232 - 370, width: 1180, height: 740, borderRadius: "50%", background: `radial-gradient(circle at 50% 42%, rgba(58,92,132,0.2) 0%, transparent 58%), radial-gradient(circle at 50% 40%, rgba(210,114,78,${0.14 + dawn * 0.08}) 0%, transparent 52%)`, opacity: 0.7 + Math.sin(lf / 9) * 0.3 }} />
      {/* cron orbit (back) */}
      <svg width={980} height={560} style={{ position: "absolute", inset: 0 }}>
        <ellipse cx={cx} cy={cy} rx={336} ry={126} fill="none" stroke={SLATE2} strokeWidth={6} strokeDasharray="3 14" opacity={0.4 * panelIn} />
        <ellipse cx={cx} cy={cy} rx={336} ry={126} fill="none" stroke={GREEN} strokeWidth={3} strokeDasharray={`60 ${2 * Math.PI * 230}`} strokeDashoffset={-ringSpin * 4} opacity={0.5 * panelIn} style={{ filter: "drop-shadow(0 0 8px rgba(63,158,116,0.5))" }} />
      </svg>
      <MoonStars lf={lf} x={250} y={120} size={46} color={STAR} n={5} spread={160} />
      <div style={{ position: "absolute", left: cx + Math.cos(-ringSpin / 26 - 1.6) * 336 - 24, top: cy + Math.sin(-ringSpin / 26 - 1.6) * 126 - 24 }}><Moon size={48} color={STAR} glow={0.5} /></div>
      {/* no container frame — the brain / orbit / job cards float on the soft night bloom */}
      {/* time pill */}
      <div style={{ position: "absolute", left: cx - 104, top: 202, width: 208, height: 48, borderRadius: 999, background: grad("rgba(42,58,94,0.7)", "rgba(22,32,58,0.66)"), border: "1px solid rgba(234,217,164,0.25)", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, opacity: brainIn, boxShadow: "inset 0 1px 0 rgba(234,217,164,0.18)" }}>
        <Moon size={22} color={STAR} /><span style={{ fontFamily: fraunces.fontFamily, fontWeight: 600, fontSize: 22, letterSpacing: "0.06em", color: STAR }}>NIGHTLY</span><Sheen r={999} />
      </div>
      {/* brain */}
      <div style={{ position: "absolute", left: cx - 69, top: 66, transform: `scale(${brainIn * (1 + pulse * (1 - pulse) * 0.32)})` }}><ClaudeMark size={138} glow={0.34 + Math.sin(lf / 8) * 0.12} /></div>
      {/* conduits + cards */}
      {jobs.map((j, i) => { const x = cx + (i - 1) * 238; const dock = over(f, fr(s) + 30 + i * 8, 13); if (dock <= 0.02) return null; const conn = ramp(lf, 26 + i * 8, 44 + i * 8); const fill = ramp(lf, 56 + i * 6, 80 + i * 6); const relit = ramp(lf, 92 + i * 5, 104 + i * 5);
        return (<React.Fragment key={i}>
          <svg width={980} height={560} style={{ position: "absolute", inset: 0, pointerEvents: "none" }}><path d={`M${cx} 256 L${cx} 272 L${x} 286 L${x} 294`} fill="none" stroke={j.a} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" opacity={0.55} strokeDasharray={200} strokeDashoffset={200 * (1 - conn)} /></svg>
          <div style={{ position: "absolute", left: x - 100, top: 294 - (1 - dock) * 6, width: 200, height: 152, borderRadius: 18, background: grad("#FFFCF5", "#F7F0E2"), border: "1px solid rgba(255,255,255,0.45)", boxShadow: `${SH}, inset 0 0 0 1px rgba(255,255,255,0.3)`, transform: `scale(${dock})`, transformOrigin: "top center" }}>
            <div style={{ position: "absolute", top: 14, left: 72, width: 56, height: 56, borderRadius: 16, background: grad(j.a, j.b), display: "flex", alignItems: "center", justifyContent: "center", boxShadow: (fill > 0.3 ? `0 0 18px ${j.g}88` : "none") }}><Ic t={j.t} s={34} /></div>
            <div style={{ position: "absolute", top: 12, left: 12, width: 30, height: 30, borderRadius: 9, background: grad("#FFFDF8", "#F2EEE4"), boxShadow: SH, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 800, fontSize: 18, color: INK }}>{i + 1}</div>
            <div style={{ position: "absolute", bottom: 26, left: 24, right: 24, display: "flex", flexDirection: "column", gap: 9 }}>
              <div style={{ height: 8, borderRadius: 99, background: "rgba(58,92,132,0.18)", overflow: "hidden" }}><div style={{ height: "100%", width: `${Math.max(fill, relit) * 100}%`, background: grad(j.a, j.b), borderRadius: 99 }} /></div>
              <div style={{ height: 8, width: "70%", borderRadius: 99, background: "rgba(58,92,132,0.18)", overflow: "hidden" }}><div style={{ height: "100%", width: `${Math.max(fill, relit) * 100}%`, background: grad(j.a, j.b), borderRadius: 99, opacity: 0.7 }} /></div>
            </div>
            <Sheen r={18} /><Glint r={18} t={over(f, fr(s) + 56 + i * 6, 16) > 0 ? ramp(lf, 56 + i * 6, 74 + i * 6) : 0} />
          </div>
        </React.Fragment>); })}
      {/* every-night pulse ring */}
      {pulse > 0 && pulse < 1 && <div style={{ position: "absolute", left: cx - 200 * pulse, top: cy - 80 * pulse, width: 400 * pulse, height: 160 * pulse, borderRadius: "50%", border: `${3 * (1 - pulse)}px solid ${CLAY}`, opacity: (1 - pulse) * 0.7 }} />}
      <Dust lf={lf} n={7} seed={4} />
    </Stage>
  );
};

// ============================ SCENE 2 — RADAR INTEL ============================
const RadarIntel: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const lf = f - fr(s);
  const scopeIn = over(f, fr(s) + 2, 14); const land = ramp(lf, 2, 14);
  const sweep = lf * 3.0; const dawn = ramp(lf, 120, 150);
  const cx = 490, cy = 250, RR = 205, GR = 178;
  const cards = [
    { id: "A", t: "dollar", a: "#DDA85C", b: "#CF9544", x: 262, y: 150, rot: -7, fire: 56, flag: 112, moved: true },
    { id: "B", t: "note", a: "#4A6E9C", b: "#34507A", x: 718, y: 150, rot: 7, fire: 69, flag: 0, moved: false },
    { id: "C", t: "case", a: "#5C7CA8", b: "#3A5C84", x: 490, y: 452, rot: 0, fire: 92, flag: 134, moved: true },
  ];
  const shock = ramp(lf, 133, 150);
  return (
    <Stage>
      <div style={{ position: "absolute", left: cx - 390, top: 244 - 360, width: 780, height: 720, borderRadius: "50%", background: `radial-gradient(circle at 50% 44%, rgba(63,158,116,0.24) 0%, rgba(58,92,132,0.16) 34%, rgba(34,47,77,0.18) 52%, transparent 64%), radial-gradient(circle at 50% 50%, rgba(210,114,78,${dawn * 0.22}) 0%, transparent 50%)`, opacity: 0.7 + Math.sin(lf / 9) * 0.3 }} />
      <MoonStars lf={lf} x={cx} y={64} size={42} color={STAR} n={6} spread={500} night={1 - dawn * 0.5} />
      <Contact cx={cx} cy={cy + 220} w={RR * 1.6} sx={0.75 + land * 0.25} op={0.4} />
      {/* leader lines + nodes */}
      <svg width={980} height={560} style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {cards.map((c, i) => { const lit = lf > c.fire; const nx = cx + Math.cos((i === 2 ? 90 : i === 0 ? -125 : -55) * Math.PI / 180) * GR; const ny = cy + Math.sin((i === 2 ? 90 : i === 0 ? -125 : -55) * Math.PI / 180) * GR; return <g key={i} opacity={lit ? 0.6 : 0.25}><line x1={c.x} y1={c.y} x2={nx} y2={ny} stroke={SLATE2} strokeWidth={2} strokeDasharray="3 12" /><circle cx={nx} cy={ny} r={5} fill="none" stroke={lit ? GREEN : SLATE2} strokeWidth={2} /></g>; })}
      </svg>
      {/* instrument */}
      <div style={{ position: "absolute", left: cx - RR, top: cy - RR, width: RR * 2, height: RR * 2, transform: `scale(${0.92 + scopeIn * 0.08})`, opacity: scopeIn }}>
        {/* bezel */}
        <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: grad("#2A3A5E", "#16203A"), border: "1px solid rgba(234,217,164,0.22)", boxShadow: `${SHN}, 0 0 44px rgba(63,158,116,0.3)` }} />
        {/* ticks */}
        <svg width={RR * 2} height={RR * 2} style={{ position: "absolute", inset: 0 }}>{Array.from({ length: 12 }, (_, i) => { const a = (i / 12) * Math.PI * 2; return <line key={i} x1={RR + Math.cos(a) * (RR - 8)} y1={RR + Math.sin(a) * (RR - 8)} x2={RR + Math.cos(a) * (RR - 18)} y2={RR + Math.sin(a) * (RR - 18)} stroke={STAR} strokeWidth={2} opacity={0.5} />; })}</svg>
        {/* glass well */}
        <div style={{ position: "absolute", left: RR - GR, top: RR - GR, width: GR * 2, height: GR * 2, borderRadius: "50%", overflow: "hidden", background: "radial-gradient(circle at 50% 38%, #1B2942 0%, #0E1730 100%)", boxShadow: "inset 0 0 40px rgba(0,0,0,0.5)" }}>
          {/* graticule */}
          <svg width={GR * 2} height={GR * 2} style={{ position: "absolute", inset: 0 }}>
            {[GR - 4, GR * 0.72, GR * 0.48, GR * 0.24].map((r, i) => <circle key={i} cx={GR} cy={GR} r={r} fill="none" stroke="rgba(63,158,116,0.3)" strokeWidth={2} />)}
            <line x1={GR} y1={6} x2={GR} y2={GR * 2 - 6} stroke="rgba(63,158,116,0.2)" strokeWidth={1} /><line x1={6} y1={GR} x2={GR * 2 - 6} y2={GR} stroke="rgba(63,158,116,0.2)" strokeWidth={1} />
          </svg>
          {/* phosphor sweep */}
          <div style={{ position: "absolute", inset: 0, background: `conic-gradient(from ${sweep}deg, rgba(63,158,116,0.5) 0deg, rgba(63,158,116,0.12) 24deg, transparent 70deg)`, borderRadius: "50%" }} />
          <svg width={GR * 2} height={GR * 2} style={{ position: "absolute", inset: 0 }}><line x1={GR} y1={GR} x2={GR + Math.cos(sweep * Math.PI / 180) * (GR - 6)} y2={GR + Math.sin(sweep * Math.PI / 180) * (GR - 6)} stroke="rgba(120,255,190,0.9)" strokeWidth={3} style={{ filter: "drop-shadow(0 0 10px rgba(63,158,116,0.85))" }} /></svg>
          {/* hub */}
          <div style={{ position: "absolute", left: GR - 9, top: GR - 9, width: 18, height: 18, borderRadius: "50%", background: grad("#E08A66", "#CF9544"), boxShadow: `0 0 14px rgba(210,114,78,${0.5 + Math.sin(lf / 8) * 0.3})` }} />
          {/* dome specular */}
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 38% 26%, rgba(255,255,255,0.28), transparent 58%)" }} />
        </div>
      </div>
      {/* competitor cards */}
      {cards.map((c, i) => { const lit = ramp(lf, c.fire, c.fire + 8); const cin = c.id === "C" ? over(f, fr(s) + c.fire - 6, 14) : scopeIn; const flag = c.moved ? over(f, fr(s) + c.flag, 12) : 0;
        return (<div key={i} style={{ position: "absolute", left: c.x - 98, top: c.y - 32, width: 196, height: 64, borderRadius: 18, background: lit > 0.5 ? grad("#FFFDF8", "#F2EEE4") : grad("rgba(251,247,239,0.55)", "rgba(236,233,226,0.5)"), border: "1px solid rgba(255,255,255,0.45)", boxShadow: SH, transform: `rotate(${c.rot}deg) scale(${cin})`, display: "flex", alignItems: "center", padding: "0 14px", gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 11, background: grad(c.a, c.b), display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.5 + lit * 0.5, boxShadow: lit > 0.5 ? `0 0 12px ${c.a}88` : "none" }}><Ic t={c.t} s={24} /></div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 7 }}><div style={{ height: 8, width: "85%", borderRadius: 99, background: lit > 0.4 ? grad(c.a, c.b) : "rgba(74,110,156,0.2)", transform: `scaleX(${0.5 + lit * 0.5})`, transformOrigin: "left" }} /><div style={{ height: 7, width: "55%", borderRadius: 99, background: "rgba(58,92,132,0.18)" }} /></div>
          <Sheen r={18} /><Glint r={18} t={ramp(lf, c.fire, c.fire + 14)} />
          {flag > 0.02 && <div style={{ position: "absolute", right: -14, top: -26, transform: `scale(${flag})`, transformOrigin: "bottom left" }}><svg width={42} height={48} viewBox="0 0 42 48"><line x1={5} y1={6} x2={5} y2={46} stroke={INK} strokeWidth={4} strokeLinecap="round" /><path d="M5 6 L36 13 L5 24 Z" fill={CLAY} style={{ filter: "drop-shadow(0 2px 4px rgba(210,114,78,0.4))" }} /></svg></div>}
        </div>); })}
      {/* lock-on shockwave */}
      {shock > 0 && shock < 1 && <div style={{ position: "absolute", left: cx - 230 * shock, top: cy - 230 * shock, width: 460 * shock, height: 460 * shock, borderRadius: "50%", border: `${4 * (1 - shock)}px solid ${CLAY}`, opacity: (1 - shock) * 0.7 }} />}
      {/* tally */}
      {shock > 0.2 && <div style={{ position: "absolute", left: cx - 22, top: 70, width: 44, height: 44, borderRadius: 12, background: grad("#FFFDF8", "#F2EEE4"), boxShadow: SH, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 800, fontSize: 24, color: CLAY, transform: `scale(${ramp(lf, 134, 146)})` }}>2</div>}
      <Dust lf={lf} n={7} seed={6} />
    </Stage>
  );
};

// ============================ SCENE 3 — INBOX FUNNEL ============================
const InboxFunnel: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const lf = f - fr(s);
  const winIn = over(f, fr(s) + 2, 15); const land = ramp(lf, 2, 16);
  const squeegee = ramp(lf, 64, 86); const dawn = ramp(lf, 150, 200);
  const cx = 490, cy = 250, WW = 560, WH = 470;
  const wx = cx - WW / 2, wy = cy - WH / 2;
  return (
    <Stage>
      <Bloom cx={cx} cy={cy} w={950} h={800} color={lerpC("rgba(58,92,132,0.24)", "rgba(210,114,78,0.18)", dawn).replace("rgb", "rgba").replace(")", ",0.22)")} lf={lf} />
      <div style={{ position: "absolute", left: cx - 475, top: cy - 400, width: 950, height: 800, borderRadius: "50%", background: `radial-gradient(circle at 50% 44%, rgba(58,92,132,0.22) 0%, transparent 60%), radial-gradient(circle at 50% 64%, rgba(210,114,78,${dawn * 0.18}) 0%, transparent 50%)`, opacity: 0.7 + Math.sin(lf / 9) * 0.3 }} />
      <MoonStars lf={lf} x={cx} y={130} size={42} color={STAR} n={6} spread={420} />
      <Contact cx={cx} cy={cy + 236} w={WW * 0.8} sx={0.75 + land * 0.25} op={0.32} />
      {/* window */}
      <div style={{ position: "absolute", left: wx, top: wy, width: WW, height: WH, borderRadius: 28, background: grad("#FFFDF8", "#F2EEE4"), border: "1px solid rgba(255,255,255,0.45)", boxShadow: SH, overflow: "hidden", transform: `scale(${0.94 + winIn * 0.06})`, opacity: winIn }}>
        {/* title bar */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 46, background: grad("#FBF7EF", "#EFEADF"), borderBottom: "1px solid rgba(40,32,20,0.08)", display: "flex", alignItems: "center", padding: "0 18px", gap: 9 }}>
          {[CLAY, AMBER, GREEN].map((c, i) => <div key={i} style={{ width: 13, height: 13, borderRadius: "50%", background: grad(c, c), opacity: 0.85 }} />)}
          <div style={{ marginLeft: "auto", padding: "5px 14px", borderRadius: 99, background: grad("#4A6E9C", "#34507A"), boxShadow: SH, fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 18, color: "#fff" }}>{squeegee < 0.5 ? Math.round(interpolate(lf, [12, 60], [1284, 1284], { extrapolateRight: "clamp" })) : 3}</div>
        </div>
        {/* flood + survivors */}
        {Array.from({ length: 12 }, (_, i) => { const surv = i < 3; const ap = over(f, fr(s) + 4 + i * 1.2, 11); const baseY = 64 + i * 30; const front = i < 4; const fall = surv ? 0 : eIn(lf, 66 + i * 1.5, 16); const jit = squeegee < 1 ? Math.sin((lf + i * 9) / 16) * 3 : 0;
          if (surv) return null;
          const y = baseY + fall * 460; const op = ap * (1 - fall);
          if (op <= 0.02) return null;
          return <div key={i} style={{ position: "absolute", left: 22, top: y + jit, width: WW - 44, height: 64, borderRadius: 14, background: grad("#FFFDF8", "#F2EEE4"), border: "1px solid rgba(40,32,20,0.06)", boxShadow: front ? "0 3px 8px rgba(58,92,132,0.18)" : "none", opacity: op, filter: front ? "none" : "blur(2.5px) saturate(0.7)", display: "flex", alignItems: "center", padding: "0 14px", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: grad("#5C7CA8", "#3A5C84"), display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.7 }}><Ic t="mail" s={22} /></div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}><div style={{ height: 7, width: "80%", borderRadius: 99, background: "rgba(74,110,156,0.22)" }} /><div style={{ height: 6, width: "55%", borderRadius: 99, background: "rgba(74,110,156,0.16)" }} /></div>
          </div>; })}
        {/* squeegee */}
        {squeegee > 0 && squeegee < 1 && <div style={{ position: "absolute", left: 0, right: 0, top: 60 + squeegee * 360, height: 20, background: grad("#E08A66", "#C5603C"), boxShadow: "0 0 50px rgba(210,114,78,0.5)", opacity: Math.sin(squeegee * Math.PI) }} />}
        {/* trough */}
        <div style={{ position: "absolute", left: 16, right: 16, bottom: 8, height: 24, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(20,26,45,0.3), transparent 70%)", filter: "blur(8px)", opacity: squeegee }} />
        {/* survivors — 3 clean threads, each with one drafted-reply chip */}
        {[0, 1, 2].map((i) => { const landS = over(f, fr(s) + 96 + i * 6, 14); const y = 86 + i * 100; const reply = over(f, fr(s) + 150 + i * 6, 13);
          if (landS <= 0.02) return null;
          return (<div key={"k" + i} style={{ position: "absolute", left: 24, top: y, width: WW - 48, height: 86, borderRadius: 16, background: grad("#FFFDF8", "#F2EEE4"), border: "1px solid rgba(255,255,255,0.45)", boxShadow: `${SH}, 0 0 26px rgba(210,114,78,0.1)`, display: "flex", alignItems: "center", padding: "0 18px", gap: 14, transform: `scale(${landS})` }}>
            <div style={{ width: 48, height: 48, borderRadius: 13, background: grad("#E08A66", "#C5603C"), display: "flex", alignItems: "center", justifyContent: "center" }}><Ic t="mail" s={26} /></div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 9 }}><div style={{ height: 9, width: "64%", borderRadius: 99, background: grad("#4A6E9C", "#5C7CA8") }} /><div style={{ height: 7, width: "42%", borderRadius: 99, background: "rgba(74,110,156,0.2)" }} /></div>
            {reply > 0.02 && <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 999, background: grad("#56B488", "#3F9E74"), boxShadow: SH, opacity: reply, transform: `scale(${reply})` }}><Ic t="reply" s={20} /><div style={{ width: 24, height: 7, borderRadius: 99, background: "rgba(255,255,255,0.78)" }} /></div>}
            <Sheen r={16} /><Glint r={16} t={ramp(lf, 96 + i * 6, 112 + i * 6)} />
          </div>); })}
        <Sheen r={28} /><Glint r={28} t={ramp(lf, 8, 24)} />
      </div>
      <Dust lf={lf} n={7} seed={8} />
    </Stage>
  );
};

// ============================ SCENE 4 — NOTES → CAROUSEL ============================
const NotesCarousel: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const lf = f - fr(s);
  const padIn = over(f, fr(s) + 2, 14); const land = ramp(lf, 2, 16);
  const peel = ramp(lf, 55, 96); const padFade = 1 - ramp(lf, 92, 110);
  const voice = over(f, fr(s) + 130, 13); const dawn = ramp(lf, 70, 130);
  const cx = 490, cy = 250;
  const cards = [{ rot: -10, x: 384, z: 1, sc: 0.92, img: "c1_3.png" }, { rot: 10, x: 596, z: 1, sc: 0.92, img: "c1_5.png" }, { rot: 0, x: 490, z: 3, sc: 1, img: "c1_1.png" }];
  return (
    <Stage>
      <div style={{ position: "absolute", left: cx - 590, top: cy - 360, width: 1180, height: 720, borderRadius: "50%", background: `radial-gradient(circle at 50% 42%, rgba(58,92,132,0.22) 0%, transparent 60%), radial-gradient(circle at 50% 44%, rgba(210,114,78,${dawn * 0.24}) 0%, transparent 52%)`, opacity: 0.7 + Math.sin(lf / 9) * 0.3 }} />
      <MoonStars lf={lf} x={300} y={120} size={40} color={STAR} n={5} spread={180} />
      {/* no desk shelf — notepad / cards float on the warm bloom */}
      <Contact cx={cx} cy={460} w={300} sx={0.75 + land * 0.25} op={0.3} />
      {/* notepad */}
      <div style={{ position: "absolute", left: cx - 150, top: 110, width: 300, height: 380, transform: `rotate(-3deg) scale(${padIn * (1 - peel * 0.35)})`, opacity: padIn * padFade }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: 10, background: grad("#F7DF92", "#E9C75C"), border: "1px solid rgba(255,255,255,0.5)", boxShadow: `${SH}, 0 0 40px rgba(207,149,68,0.28)`, overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 30, bottom: 0, width: 2.5, background: "rgba(210,114,78,0.65)" }} />
          {Array.from({ length: 10 }, (_, i) => <div key={i} style={{ position: "absolute", left: 18, right: 18, top: 70 + i * 30, height: 1.5, background: "rgba(58,92,132,0.2)" }} />)}
          {[0, 1, 2, 3].map((i) => { const dr = ramp(lf, 8 + i * 8, 30 + i * 8); const col = [SLATE, CLAY, GREEN, SLATE][i]; return <div key={i} style={{ position: "absolute", left: 44, top: 84 + i * 60, width: `${(50 + rnd(i, 1) * 35) * dr}%`, height: 5, borderRadius: 4, background: col, opacity: 0.8 }} />; })}
          {/* clay sticky-corner for color */}
          <div style={{ position: "absolute", top: -2, right: 18, width: 52, height: 40, borderRadius: "0 0 8px 8px", background: grad("#E08A66", "#C5603C"), boxShadow: "0 4px 10px rgba(210,114,78,0.35)" }} />
          <Sheen r={10} />
        </div>
        {/* coils */}
        {Array.from({ length: 11 }, (_, i) => <div key={i} style={{ position: "absolute", top: -8, left: 14 + i * 26, width: 16, height: 18, borderRadius: "50%", background: grad("#FBF7EF", "#B9A488"), boxShadow: "inset 0 -2px 3px rgba(0,0,0,0.3)" }} />)}
      </div>
      {/* ink arc */}
      {peel > 0 && peel < 1 && Array.from({ length: 16 }, (_, i) => { const p = ramp(lf, 55 + i * 1.4, 96 + i * 1.4); if (p <= 0 || p >= 1) return null; const sxp = cx - 110, syp = 200; const exp = cx, eyp = 240; const mx = cx - 40, my = 110; const x = (1 - p) * (1 - p) * sxp + 2 * (1 - p) * p * mx + p * p * exp; const y = (1 - p) * (1 - p) * syp + 2 * (1 - p) * p * my + p * p * eyp; return <div key={i} style={{ position: "absolute", left: x, top: y, width: 6 - p * 4, height: 6 - p * 4, borderRadius: "50%", background: lerpC("#3A5C84", "#EAD9A4", p), opacity: Math.sin(p * Math.PI) }} />; })}
      {/* carousel cards — REAL carousel-post screenshots (public/refs/c1_*) */}
      {cards.map((c, i) => { const cin = over(f, fr(s) + 72 + (i === 2 ? 16 : i * 8), 14); const bob = Math.sin((lf + i * 8) / 18) * 5; const badge = over(f, fr(s) + 100, 12); if (cin <= 0.02) return null;
        return (<div key={i} style={{ position: "absolute", left: c.x - 111, top: cy - 142 + bob, width: 222, height: 274, transform: `rotate(${c.rot}deg) scale(${cin * c.sc})`, transformOrigin: "bottom center", zIndex: c.z, opacity: i < 2 ? 0.95 : 1 }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: 18, overflow: "hidden", border: "2px solid rgba(255,255,255,0.6)", boxShadow: `${SH}${i === 2 ? ", 0 0 52px rgba(58,92,132,0.32)" : ""}` }}>
            <Img src={staticFile("refs/" + c.img)} style={{ width: "100%", height: "100%", objectFit: "cover", filter: i < 2 ? "saturate(0.95) brightness(0.95)" : "none" }} />
            <Sheen r={18} o={0.2} /><Glint r={18} t={ramp(lf, 72 + i * 8, 90 + i * 8)} />
          </div>
          {i === 2 && badge > 0.02 && <div style={{ position: "absolute", bottom: -12, right: -12, transform: `scale(${badge})`, zIndex: 5 }}><ClaudeMark size={48} glow={0.42 + Math.sin(lf / 8) * 0.12} /></div>}
        </div>); })}
      {/* pager */}
      {ramp(lf, 120, 132) > 0 && <div style={{ position: "absolute", left: cx - 26, top: 398, display: "flex", gap: 8, opacity: ramp(lf, 120, 132) }}>{[0, 1, 2].map((i) => <div key={i} style={{ width: i === 2 ? 22 : 10, height: 10, borderRadius: 99, background: i === 2 ? grad("#E08A66", "#C5603C") : "rgba(40,32,20,0.18)" }} />)}</div>}
      {/* voice plate */}
      {voice > 0.02 && <div style={{ position: "absolute", left: cx - 150, top: 432, width: 300, height: 56, borderRadius: 999, background: grad("#2A3A5E", "#16203A"), border: "1px solid rgba(234,217,164,0.22)", boxShadow: SHN, display: "flex", alignItems: "center", gap: 12, padding: "0 18px", transform: `scale(${voice})` }}>
        <div style={{ width: 30, height: 30, borderRadius: 9, background: grad("#E08A66", "#C5603C"), display: "flex", alignItems: "center", justifyContent: "center" }}><svg viewBox="0 0 24 24" width={17} height={17}><path fill="#F6EFE6" d={CLAUDE_PATH} /></svg></div>
        <div style={{ flex: 1, display: "flex", gap: 3.5, alignItems: "center", height: 30 }}>{Array.from({ length: 26 }, (_, i) => { const h = 6 + Math.abs(Math.sin(lf * 0.3 + i * 0.5)) * 22; return <div key={i} style={{ width: 3.5, height: h, borderRadius: 2, background: grad("#56B488", "#3F9E74"), boxShadow: "0 0 5px rgba(63,158,116,0.5)" }} />; })}</div>
        <Sheen r={999} />
      </div>}
      <Dust lf={lf} n={7} seed={10} />
    </Stage>
  );
};

// ============================ SCENE 5 — PAYOFF ============================
const Payoff: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const lf = f - fr(s);
  const collapse = ramp(lf, 70, 104); const flash = ramp(lf, 100, 118);
  const briefIn = over(f, fr(s) + 104, 18); const land = ramp(lf, 104, 120);
  const litA = ramp(lf, 144, 160), litB = ramp(lf, 176, 192), litC = ramp(lf, 208, 224);
  const dawn = ramp(lf, 150, 250); const meter = over(f, fr(s) + 226, 16); const race = ramp(lf, 232, 280);
  const cx = 490, cy = 250;
  const bloomC = lerpC("#2a3a52", "#d2724e", dawn);
  return (
    <Stage>
      <div style={{ position: "absolute", left: cx - 320, top: cy - 290, width: 640, height: 600, borderRadius: "50%", background: `radial-gradient(circle at 50% 46%, ${bloomC}${Math.round((0.24 + dawn * 0.08) * 255).toString(16).padStart(2, "0")} 0%, transparent 62%)`, opacity: 0.7 + Math.sin(lf / 9) * 0.3 }} />
      <MoonStars lf={lf} x={140} y={90} size={40} color={STAR} n={7} spread={760} night={1 - dawn * 0.6} />
      {/* tab cloud (golden angle) */}
      {Array.from({ length: 22 }, (_, i) => { const ap = over(f, fr(s) + 2 + i * 0.8, 10); const a = i * 137.5 * Math.PI / 180; const shell = i % 3; const r = 150 + shell * 90 + rnd(i, 1) * 50; const gx = cx + Math.cos(a) * r, gy = cy + Math.sin(a) * r * 0.82; const jit = collapse < 1 ? Math.sin((lf + i * 9) / 6) * 6 : 0; const x = gx + (cx - gx) * collapse, y = gy + (cy - gy) * collapse; const op = ap * (1 - collapse); const col = [SLATE2, AMBER, GREEN, CLAY][i % 4];
        if (op <= 0.02) return null;
        return (<div key={i} style={{ position: "absolute", left: x - 58 + jit, top: y - 35, width: 116, height: 70, borderRadius: 12, background: grad("#FFFDF8", "#EEE9DD"), border: "1px solid rgba(40,32,20,0.08)", boxShadow: "0 5px 12px rgba(20,26,45,0.16)", opacity: op, filter: shell === 2 ? "blur(2px)" : shell === 1 ? "blur(0.8px)" : "none", transform: `scale(${(0.9 + ap * 0.1) * (1 - collapse * 0.6)}) rotate(${Math.sin(lf / 30 + i) * 2}deg)`, overflow: "hidden" }}>
          <div style={{ height: 16, background: grad(col, col), opacity: 0.85 }} />
          <div style={{ padding: 8, display: "flex", flexDirection: "column", gap: 6 }}><div style={{ width: "70%", height: 5, borderRadius: 3, background: "#D2C3A4" }} /><div style={{ width: "45%", height: 5, borderRadius: 3, background: "#DDCFB4" }} /></div>
          {rnd(i, 7) > 0.5 && <div style={{ position: "absolute", right: 5, top: 4, width: 14, height: 14, borderRadius: "50%", background: grad("#E24B4A", "#A32D2D"), color: "#fff", fontSize: 10, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: inter.fontFamily, boxShadow: "0 2px 4px rgba(0,0,0,0.2)" }}>!</div>}
        </div>); })}
      {/* convergence flash */}
      {flash > 0 && flash < 1 && <div style={{ position: "absolute", left: cx - 110, top: cy - 110, width: 220, height: 220, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.9), rgba(210,114,78,0))", transform: `scale(${0.4 + flash * 1.3})`, opacity: Math.sin(flash * Math.PI) }} />}
      <Contact cx={cx} cy={cy + 220} w={250} sx={0.75 + land * 0.25} op={0.34} />
      {/* brief */}
      {briefIn > 0.02 && <div style={{ position: "absolute", left: cx - 147, top: cy - 192, transform: `scale(${briefIn})`, opacity: briefIn }}><Brief w={294} lit={[litA, litB, litC]} glow={0.4 + (litA + litB + litC) * 0.1} gt={ramp(lf, 104, 122)} /></div>}
      {/* dawn meter */}
      {meter > 0.02 && <div style={{ position: "absolute", left: cx - 260, top: 470, width: 520, transform: `scale(${meter})`, transformOrigin: "center" }}>
        <div style={{ position: "relative", height: 26, borderRadius: 999, background: grad("rgba(255,255,255,0.5)", "rgba(236,233,226,0.6)"), border: "1px solid rgba(255,255,255,0.5)", boxShadow: SH, overflow: "visible" }}>
          {/* ghosts */}
          {[0.34, 0.26, 0.2].map((p, i) => <div key={i} style={{ position: "absolute", left: `${p * 100}%`, top: 3, marginLeft: -10, width: 20, height: 20, borderRadius: "50%", background: SLATE2, opacity: 0.36, filter: "blur(1px)" }} />)}
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${(0.2 + race * 0.72) * 100}%`, borderRadius: 999, background: grad("#E08A66", "#F0BE84") }} />
          <div style={{ position: "absolute", left: `${(0.2 + race * 0.72) * 100}%`, top: -3, marginLeft: -16, width: 32, height: 32 }}><ClaudeMark size={32} glow={0.4} /></div>
          <div style={{ position: "absolute", left: `${(0.2 + race * 0.72) * 100}%`, top: -36, marginLeft: -8, fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 700, fontSize: 28, color: CLAY, opacity: race > 0.3 ? 1 : 0 }}>ahead</div>
        </div>
      </div>}
      <Dust lf={lf} n={8} seed={12} />
    </Stage>
  );
};

// ============================ SCENE 6 — NIGHT LOOP ============================
const NightLoop: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const lf = f - fr(s);
  const panelIn = over(f, fr(s) + 2, 15); const land = ramp(lf, 8, 22);
  const sw = over(f, fr(s) + 30, 14); const loop = ramp(lf, 60, 110); const dawn = ramp(lf, 46, 108);
  const cx = 490, cy = 238, PW = 760, PH = 452, R = 174;
  const spin = lf * 2.4; const conduit = ramp(lf, 52, 64);
  const lapPulse = ramp(lf, 108, 122);
  return (
    <Stage>
      <div style={{ position: "absolute", left: cx - 590, top: cy - 360, width: 1180, height: 720, borderRadius: "50%", background: `radial-gradient(circle at 50% 44%, rgba(58,92,132,0.22) 0%, transparent 60%), radial-gradient(circle at 50% 44%, rgba(210,114,78,${dawn * 0.26}) 0%, transparent 50%)`, opacity: 0.7 + Math.sin(lf / 9) * 0.3 }} />
      <MoonStars lf={lf} x={250} y={120} size={50} color={SLATE2} n={6} spread={170} />
      {[0, 1, 2].map((i) => { const zp = (lf / 30 + i * 0.33) % 1; return <div key={i} style={{ position: "absolute", left: 200 + i * 24, top: 150 - zp * 50, fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 800, fontSize: 22 + i * 7, color: SLATE2, opacity: (1 - zp) * 0.3 }}>z</div>; })}
      {/* no container frame — the loop + agent + toggle float on the soft night bloom */}
      {/* ring */}
      <svg width={980} height={560} style={{ position: "absolute", inset: 0 }}>
        <circle cx={cx} cy={cy} r={R} fill="none" stroke="rgba(92,124,168,0.3)" strokeWidth={6} opacity={panelIn} />
        <defs><linearGradient id="ringg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={GREEN} /><stop offset="1" stopColor={CLAY} /></linearGradient></defs>
        <circle cx={cx} cy={cy} r={R} fill="none" stroke="url(#ringg)" strokeWidth={9} strokeLinecap="round" strokeDasharray={2 * Math.PI * R} strokeDashoffset={2 * Math.PI * R * (1 - loop)} transform={`rotate(-90 ${cx} ${cy})`} opacity={0.5} style={{ filter: "blur(4px)" }} />
        <circle cx={cx} cy={cy} r={R} fill="none" stroke="url(#ringg)" strokeWidth={6} strokeLinecap="round" strokeDasharray={2 * Math.PI * R} strokeDashoffset={2 * Math.PI * R * (1 - loop)} transform={`rotate(-90 ${cx} ${cy})`} />
        {loop > 0.02 && <circle cx={cx + Math.cos((-90 + 360 * loop) * Math.PI / 180) * R} cy={cy + Math.sin((-90 + 360 * loop) * Math.PI / 180) * R} r={7} fill="#fff" style={{ filter: "drop-shadow(0 0 12px rgba(63,158,116,0.9))" }} />}
      </svg>
      {/* conduit */}
      <div style={{ position: "absolute", left: cx - 2, top: cy + R - 4, width: 4, height: 162, background: conduit > 0.5 ? grad("rgba(207,149,68,0.5)", "rgba(207,149,68,0.2)") : "rgba(92,124,168,0.25)" }} />
      {conduit > 0 && conduit < 1 && <div style={{ position: "absolute", left: cx - 5, top: cy + R + 158 - conduit * 162, width: 10, height: 10, borderRadius: "50%", background: STAR, boxShadow: "0 0 12px rgba(234,217,164,0.7)" }} />}
      {/* moon nodes */}
      {[0, 1, 2].map((i) => { const a = (-90 + 120 * i + spin) * Math.PI / 180; const x = cx + Math.cos(a) * R, y = cy + Math.sin(a) * R; const dim = loop * (0.55 + 0.45 * Math.max(0, Math.sin(a))); return <div key={i} style={{ position: "absolute", left: x - 28, top: y - 28, width: 56, height: 56, borderRadius: "50%", background: grad("rgba(60,86,124,0.6)", "rgba(22,32,58,0.7)"), border: "1px solid rgba(234,217,164,0.25)", display: "flex", alignItems: "center", justifyContent: "center", opacity: dim, boxShadow: "0 4px 8px rgba(20,26,45,0.4)" }}><Moon size={32} color={STAR} /><Sheen r="50%" o={0.2} /></div>; })}
      <Contact cx={cx} cy={cy + 108} w={170} sx={0.75 + land * 0.25} op={0.4} />
      {/* agent */}
      <div style={{ position: "absolute", left: cx - 98, top: cy - 98, transform: `scale(${(panelIn) * (1 + lapPulse * (1 - lapPulse) * 0.24)})` }}><ClaudeMark size={196} glow={0.4 + Math.sin(lf / 8) * 0.12} /></div>
      {lapPulse > 0 && lapPulse < 1 && <div style={{ position: "absolute", left: cx - 112 * lapPulse - 0, top: cy - 112 * lapPulse, width: 224 * lapPulse, height: 224 * lapPulse, borderRadius: "50%", border: `${3 * (1 - lapPulse)}px solid ${CLAY}`, opacity: (1 - lapPulse) * 0.6, transform: "translate(-0px,0px)" }} />}
      {/* toggle */}
      <div style={{ position: "absolute", left: cx - 84, top: cy + R + 38, width: 168, height: 76, borderRadius: 999, background: sw > 0.5 ? grad("#56B488", "#3F9E74") : grad("#4A6E9C", "#34507A"), boxShadow: `inset 0 2px 6px rgba(0,0,0,0.22)${sw > 0.5 ? ", 0 0 22px rgba(63,158,116,0.55)" : ""}`, transform: `scale(${over(f, fr(s) + 16, 12)})` }}>
        <div style={{ position: "absolute", top: 8, left: 8 + sw * 92, width: 60, height: 60, borderRadius: "50%", background: grad("#FFFFFF", "#EDEAE2"), boxShadow: "0 4px 10px rgba(20,26,45,0.35)" }}><Sheen r="50%" /></div>
        {sw > 0.6 && <div style={{ position: "absolute", left: 22, top: 26, opacity: ramp(lf, 38, 50) }}><Ic t="check" s={24} c="rgba(255,255,255,0.8)" /></div>}
        <Sheen r={999} o={0.25} />
      </div>
      <Dust lf={lf} n={7} seed={14} />
    </Stage>
  );
};

// ============================ SCENE 7 — CTA (glass phone) ============================
const CTA: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const lf = f - fr(s); if (lf < 0) return null;
  const phoneIn = over(f, fr(s) + 2, 14); const land = ramp(lf, 2, 16);
  const typed = Math.floor(ramp(lf, 2, 14) * 5); const caret = lf % 18 < 9;
  const fire = ramp(lf, 18, 30); const reply = lf > 30; const done = lf > 40; const dawn = ramp(lf, 14, 56);
  const cx = 490, cy = 248, PWB = 300, PHB = 460;
  const px = cx - PWB / 2, py = cy - PHB / 2;
  return (
    <><Stage>
      <div style={{ position: "absolute", left: cx - 280, top: cy - 280, width: 560, height: 560, borderRadius: "50%", background: `radial-gradient(circle at 50% 44%, ${lerpC("#2a3a52", "#d2724e", dawn)}${Math.round((0.24 + dawn * 0.06) * 255).toString(16).padStart(2, "0")} 0%, transparent 62%), radial-gradient(circle at 50% 50%, rgba(207,149,68,0.13), transparent 55%)`, opacity: 0.7 + Math.sin(lf / 9) * 0.3 }} />
      <MoonStars lf={lf} x={770} y={90} size={48} color={STAR} n={5} spread={180} night={1 - dawn * 0.5} />
      {/* ghost bubbles */}
      {[150, 830].map((gx, i) => <div key={i} style={{ position: "absolute", left: gx - 70, top: cy - 40, width: 140, height: 80, borderRadius: 22, background: grad("#FFFDF8", "#EEE9DD"), filter: "blur(2.5px) saturate(0.8)", opacity: 0.32 * phoneIn, boxShadow: "0 8px 20px rgba(20,26,45,0.2)" }} />)}
      <Contact cx={cx} cy={cy + 232} w={240} sx={0.75 + land * 0.25} op={0.34} />
      {/* phone */}
      <div style={{ position: "absolute", left: px, top: py, width: PWB, height: PHB, borderRadius: 46, background: grad("#FBF7EF", "#E7E1D4"), border: "1px solid rgba(255,255,255,0.45)", boxShadow: `${SH}`, transform: `scale(${0.93 + phoneIn * 0.07})`, opacity: phoneIn }}>
        {/* screen */}
        <div style={{ position: "absolute", inset: 16, borderRadius: 32, background: grad("#FFFDF8", "#F2EEE4"), overflow: "hidden", boxShadow: "inset 0 2px 10px rgba(34,30,24,0.12)" }}>
          {/* status moon */}
          <div style={{ position: "absolute", top: 14, left: 0, right: 0, height: 28, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}><Moon size={16} color={STAR} />{[0, 1, 2].map((i) => <div key={i} style={{ width: 3, height: 3, borderRadius: "50%", background: STAR, opacity: 0.4 + 0.6 * (Math.sin(lf / 8 + i) * 0.5 + 0.5) }} />)}</div>
          {/* header sky */}
          <div style={{ position: "absolute", top: 42, left: 0, right: 0, height: 96, background: grad(lerpC("#2A3A5E", "#5A5478", dawn * 0.5), lerpC("#16203A", "#3a3050", dawn * 0.4)), boxShadow: "inset 0 1px 0 rgba(234,217,164,0.18)", display: "flex", alignItems: "center", justifyContent: "center" }}><Moon size={44} color={STAR} glow={0.5 * (1 - dawn * 0.5)} /></div>
          {/* comment field */}
          <div style={{ position: "absolute", left: 14, right: 14, top: 196, height: 60, borderRadius: 30, background: grad("#FFFDF8", "#F2EEE4"), boxShadow: "inset 0 2px 6px rgba(34,30,24,0.14)", display: "flex", alignItems: "center", padding: "0 12px", gap: 10, transform: `translateY(${fire > 0.2 ? -fire * 8 : 0}px)`, opacity: fire > 0.6 ? 1 - (fire - 0.6) * 1.2 : 1 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: grad("#E08A66", "#C5603C"), boxShadow: "0 0 20px rgba(210,114,78,0.34)", display: "flex", alignItems: "center", justifyContent: "center" }}><svg viewBox="0 0 24 24" width={19} height={19}><path fill="#F6EFE6" d={CLAUDE_PATH} /></svg></div>
            <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 26, color: INK }}>{"night".slice(0, typed)}{caret && typed < 5 ? "|" : ""}</span>
            <Sheen r={30} />
          </div>
          {/* send chip */}
          <div style={{ position: "absolute", right: 18, top: 204, width: 46, height: 46, borderRadius: "50%", background: grad("#E08A66", "#C5603C"), boxShadow: `${SH}, 0 0 ${fire * 20}px rgba(210,114,78,0.5)`, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${over(f, fr(s) + 14, 12) * (1 - fire * 0.06)})`, opacity: fire > 0.7 ? 0 : 1 }}><Ic t="send" s={26} /><Sheen r="50%" /></div>
          {/* reply card */}
          {reply && <div style={{ position: "absolute", left: 14, right: 14, top: 298, height: 92, borderRadius: 18, background: grad("#F7ECE4", "#EFDDD0"), border: "1px solid rgba(255,255,255,0.45)", boxShadow: `${SH}${done ? ", 0 0 30px rgba(63,158,116,0.3)" : ""}`, display: "flex", alignItems: "center", padding: "0 16px", gap: 10, transform: `scale(${over(f, fr(s) + 30, 12)})` }}>
            <div style={{ width: 30, height: 30, borderRadius: 9, background: grad("#E08A66", "#C5603C"), display: "flex", alignItems: "center", justifyContent: "center" }}><svg viewBox="0 0 24 24" width={17} height={17}><path fill="#F6EFE6" d={CLAUDE_PATH} /></svg></div>
            {done ? <div style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 700, fontSize: 24, color: SLATE }}>setup</span><div style={{ width: 28, height: 28, borderRadius: "50%", background: GREEN, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${over(f, fr(s) + 40, 10)})` }}><Ic t="check" s={18} /></div></div>
              : <div style={{ display: "flex", gap: 6 }}>{[0, 1, 2].map((i) => <div key={i} style={{ width: 9, height: 9, borderRadius: "50%", background: SLATE2, transform: `translateY(${Math.sin(lf / 6 + i * 0.8) * 3}px)` }} />)}</div>}
            <Sheen r={18} /><Glint r={18} t={done ? ramp(lf, 42, 56) : 0} />
          </div>}
          <Glint r={32} t={ramp(lf, 8, 22)} />
        </div>
        <Sheen r={46} />
      </div>
      {/* send fire ring */}
      {fire > 0 && fire < 1 && <div style={{ position: "absolute", left: cx + 80 - 100 * fire, top: cy + 8 - 100 * fire, width: 200 * fire, height: 200 * fire, borderRadius: "50%", border: `${3 * (1 - fire)}px solid ${CLAY}`, opacity: (1 - fire) * 0.7 }} />}
      <Dust lf={lf} n={7} seed={16} />
    </Stage>
    <div style={{ position: "absolute", top: 1138, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 16, opacity: eOut(f, fr(s) + 6, 14) }}>
      <div style={{ position: "relative", transform: `scale(${1 + Math.sin(lf / 7) * 0.025})`, padding: "22px 50px", borderRadius: 999, background: grad("#E08A66", "#C5603C"), boxShadow: `${SH}, 0 0 44px rgba(210,114,78,0.42)`, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 56, color: "#fff", display: "flex", alignItems: "center", gap: 14, whiteSpace: "nowrap" }}>💬 Comment “NIGHT”<Sheen r={999} /></div>
      <div style={{ fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 600, fontSize: 44, color: INK, textShadow: "0 2px 16px rgba(236,233,226,0.95)" }}>for the full setup</div>
    </div>
    </>
  );
};

// ===== audio / ambience / bg =====
const Sfx: React.FC<{ at: number; src: string; vol?: number }> = ({ at, src, vol = 0.4 }) => (<Sequence from={fr(at)} durationInFrames={fr(4)}><Audio src={staticFile(`sfx/${src}`)} volume={vol} /></Sequence>);
const SfxTrack: React.FC = () => (<>
  <Sfx at={L[0]} src="riser.wav" vol={0.3} /><Sfx at={L[0]} src="swooshup.wav" vol={0.3} /><Sfx at={L[0] + 0.5} src="boom.wav" vol={0.4} /><Sfx at={L[0] + 0.5} src="shimmer.wav" vol={0.3} />
  {[0, 1, 2, 3].map((i) => <Sfx key={i} at={L[0] + 1.0 + i * 0.4} src="tick.wav" vol={0.22} />)}<Sfx at={L[0] + 3.5} src="sparkle.wav" vol={0.3} /><Sfx at={L[0] + 3.7} src="ding.wav" vol={0.26} />
  <Sfx at={L[1] - 1.8} src="metal_riser.wav" vol={0.82} /><Sfx at={L[1]} src="boom.wav" vol={0.26} />{[0, 1, 2].map((i) => <Sfx key={i} at={L[1] + 1.0 + i * 0.27} src="pop.wav" vol={0.24} />)}<Sfx at={L[1] + 3.0} src="resolve.wav" vol={0.24} />
  <Sfx at={L[2]} src="swish.wav" vol={0.24} />{[0, 1, 2].map((i) => <Sfx key={i} at={L[2] + 1.88 + i * 0.4} src="blip3.wav" vol={0.22} />)}<Sfx at={L[2] + 3.75} src="snap.wav" vol={0.3} /><Sfx at={L[2] + 4.5} src="impact.wav" vol={0.26} />
  <Sfx at={L[3]} src="whoosh.wav" vol={0.26} /><Sfx at={L[3] + 2.3} src="swish.wav" vol={0.26} />{[0, 1, 2].map((i) => <Sfx key={i} at={L[3] + 5.2 + i * 0.28} src="pop.wav" vol={0.24} />)}{[0, 1, 2].map((i) => <Sfx key={i} at={L[3] + 7.0 + i * 0.3} src="blip2.wav" vol={0.2} />)}
  <Sfx at={L[4]} src="swish.wav" vol={0.24} /><Sfx at={L[4] + 3.5} src="snap.wav" vol={0.26} /><Sfx at={L[4] + 5.2} src="resolve.wav" vol={0.28} />
  <Sfx at={L[5]} src="whoosh.wav" vol={0.28} /><Sfx at={L[5] + 3.4} src="impact.wav" vol={0.3} /><Sfx at={L[5] + 4.8} src="ding.wav" vol={0.26} /><Sfx at={L[5] + 5.9} src="ding.wav" vol={0.26} /><Sfx at={L[5] + 6.9} src="ding.wav" vol={0.26} /><Sfx at={L[5] + 7.7} src="resolve.wav" vol={0.3} />
  <Sfx at={L[6] + 1.0} src="snap.wav" vol={0.3} /><Sfx at={L[6] + 2.0} src="resolve.wav" vol={0.28} />
  <Sfx at={L[7]} src="key.wav" vol={0.22} /><Sfx at={L[7] + 1.3} src="swish.wav" vol={0.24} /><Sfx at={L[7] + 2.6} src="sparkle.wav" vol={0.3} />
</>);
const Ambient: React.FC = () => {
  const frame = useCurrentFrame(); const t = frame / FPS;
  return (<AbsoluteFill style={{ pointerEvents: "none" }}>{Array.from({ length: 10 }, (_, i) => {
    const x = rnd(i, 11) * 1060 + 10, y = rnd(i, 12) * 1880 + 20; const dx = Math.sin((t + i * 1.7) / (5 + rnd(i, 13) * 4)) * 40, dy = Math.cos((t + i * 2.1) / (6 + rnd(i, 14) * 4)) * 36;
    const size = 6 + rnd(i, 15) * 10; const tw = 0.3 + 0.7 * (Math.sin(t * 1.4 + i * 2) * 0.5 + 0.5); const isSpark = rnd(i, 16) > 0.5; const col = [SLATE, AMBER, STAR, CLAY][Math.floor(rnd(i, 17) * 4)];
    return isSpark ? <div key={i} style={{ position: "absolute", left: x + dx, top: y + dy, fontSize: size, color: col, opacity: tw * 0.28 }}>✦</div> : <div key={i} style={{ position: "absolute", left: x + dx, top: y + dy, width: size, height: size, borderRadius: "50%", background: col, opacity: tw * 0.13 }} />;
  })}</AbsoluteFill>);
};
const Background: React.FC = () => {
  const frame = useCurrentFrame(); const drift = Math.sin(frame / 90) * 6;
  return (<AbsoluteFill style={{ backgroundColor: "#EFE8D9" }}>
    <AbsoluteFill style={{ transform: `translate(${drift}px,${drift * 0.6}px)`, backgroundImage: "linear-gradient(rgba(96,74,46,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(96,74,46,0.06) 1px,transparent 1px)", backgroundSize: "66px 66px" }} />
    <AbsoluteFill style={{ opacity: 0.05, mixBlendMode: "multiply" }}><svg width="100%" height="100%"><filter id="ppN"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves={2} stitchTiles="stitch" /></filter><rect width="100%" height="100%" filter="url(#ppN)" /></svg></AbsoluteFill>
    <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 42%, rgba(0,0,0,0) 58%, rgba(86,62,34,0.06) 100%)" }} />
  </AbsoluteFill>);
};

const L = [0.0, 4.64, 8.64, 14.4, 21.4, 27.3, 36.92, 41.12];
const VEND = 42.8;


export const ClaudeNightReel: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 16, 28], [1.0, 1.09, 1.0], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  return (
    <AbsoluteFill style={{ backgroundColor: "#EFE8D9", fontFamily: inter.fontFamily }}>
      <Audio src={staticFile("vo_night.wav")} />
      {/* music bed removed for clean export — add licensed audio in-app on upload */}
      <SfxTrack />
      <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "50% 46%" }}>
        <Background />
        <Ambient />
        <Scene s={L[0]} e={L[1]}><NightHook s={L[0]} /></Scene>
        <Scene s={L[1]} e={L[2]}><Setup3 s={L[1]} /></Scene>
        <Scene s={L[2]} e={L[3]}><RadarIntel s={L[2]} /></Scene>
        <Scene s={L[3]} e={L[4]}><InboxFunnel s={L[3]} /></Scene>
        <Scene s={L[4]} e={L[5]}><NotesCarousel s={L[4]} /></Scene>
        <Scene s={L[5]} e={L[6]}><Payoff s={L[5]} /></Scene>
        <Scene s={L[6]} e={L[7]}><NightLoop s={L[6]} /></Scene>
        <CTA s={L[7]} />
        <Captions />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
