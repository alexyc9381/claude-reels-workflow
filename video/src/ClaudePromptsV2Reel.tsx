import React from "react";
import { AbsoluteFill, Audio, Easing, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { fraunces, frauncesItalic, inter } from "./fonts";
import wordsData from "./data/words_promptsv2.json";

/**
 * ClaudePromptsV2Reel — "3 Claude prompts that feel illegal" (V2: customer digital-twin / money-leak audit / clone-your-closer).
 * Premium system (shared w/ ClaudeAskReel/SwarmReel): centered heroes, Bloom→Contact→hero→Sheen/Glint, 158° grads +
 * stacked navy shadow, ONE clay pop, no dull grey, no container unless device, escalate, NO overlap (zone-separated sub-beats).
 * Identity thread = the clay "classified/illegal" number-tab + redaction motif. Alex's recorded VO.
 */
const CREAM = "#ECE9E2", INK = "#1A1813", SLATE = "#3A5C84", SLATE2 = "#5C7CA8", CLAY = "#D2724E", AMBER = "#CF9544", GREEN = "#3F9E74", MUTE = "#9A968B", RED = "#C44A3A";
const FPS = 30; const fr = (s: number) => s * FPS;
const eOut = (f: number, sF: number, d = 10) => interpolate(f, [sF, sF + d], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
const eIn = (f: number, sF: number, d = 10) => interpolate(f, [sF, sF + d], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) });
const ramp = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const over = (f: number, sF: number, d = 12) => interpolate(f, [sF, sF + d * 0.5, sF + d], [0, 1.16, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
const frac = (x: number) => x - Math.floor(x); const rnd = (i: number, s = 0) => frac(Math.sin(i * 12.9898 + s * 78.233) * 43758.5453);
const grad = (a: string, b: string) => `linear-gradient(158deg, ${a} 0%, ${b} 100%)`;
const CLAUDE_PATH = "m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z";
const SH = "inset 0 1.5px 0 rgba(255,255,255,0.5), 0 2px 4px rgba(34,30,24,0.22), 0 10px 22px rgba(34,30,24,0.20), 0 30px 60px rgba(20,26,45,0.26)";
const Sheen: React.FC<{ r: number | string; o?: number }> = ({ r, o = 0.34 }) => (<div style={{ position: "absolute", inset: 0, borderRadius: r, background: `linear-gradient(125deg, rgba(255,255,255,${o}) 0%, rgba(255,255,255,0) 33%)`, pointerEvents: "none" }} />);
const Glint: React.FC<{ r: number | string; t: number }> = ({ r, t }) => { if (t <= 0 || t >= 1) return null; const sx = -60 + t * 220; return (<div style={{ position: "absolute", inset: 0, borderRadius: r, overflow: "hidden", pointerEvents: "none" }}><div style={{ position: "absolute", top: "-20%", height: "140%", width: "45%", left: `${sx}%`, transform: "skewX(-18deg)", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)", opacity: Math.sin(t * Math.PI) }} /></div>); };
const Contact: React.FC<{ cx: number; cy: number; w: number; sx?: number; op?: number }> = ({ cx, cy, w, sx = 1, op = 0.34 }) => (<div style={{ position: "absolute", left: cx - w / 2, top: cy - (w * 0.13) / 2, width: w, height: w * 0.13, borderRadius: "50%", background: `radial-gradient(ellipse, rgba(20,26,45,${op}), transparent 70%)`, filter: "blur(7px)", transform: `scaleX(${sx})`, pointerEvents: "none" }} />);
const Bloom: React.FC<{ cx: number; cy: number; w: number; h?: number; color: string; lf: number; base?: number }> = ({ cx, cy, w, h, color, lf, base = 0.7 }) => (<div style={{ position: "absolute", left: cx - w / 2, top: cy - (h || w) / 2, width: w, height: h || w, borderRadius: "50%", background: `radial-gradient(circle at 50% 44%, ${color} 0%, transparent 62%)`, opacity: base + Math.sin(lf / 9) * 0.3, pointerEvents: "none" }} />);
const Dust: React.FC<{ lf: number; n?: number; seed?: number }> = ({ lf, n = 7, seed = 0 }) => (<>{Array.from({ length: n }, (_, i) => { const x = rnd(i, seed) * 980, y = rnd(i, seed + 1) * 560; const edge = x < 235 || x > 745 || y < 123 || y > 414; if (!edge) return null; const tw = 0.3 + 0.7 * (Math.sin(lf / 8 + i) * 0.5 + 0.5); return <div key={i} style={{ position: "absolute", left: x, top: y, fontSize: 8 + rnd(i, seed + 2) * 8, color: [AMBER, SLATE2, CLAY][i % 3], opacity: tw * 0.32 }}>✦</div>; })}</>);
const ClaudeMark: React.FC<{ size: number; glow?: number }> = ({ size, glow = 0.34 }) => (
  <div style={{ position: "relative", width: size, height: size, borderRadius: size * 0.28, background: grad("#E08A66", "#C5603C"), boxShadow: `${SH}, 0 0 ${Math.round(size * 0.32)}px rgba(210,114,78,${glow})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
    <svg viewBox="0 0 24 24" width={size * 0.58} height={size * 0.58} style={{ filter: "drop-shadow(0 1px 1px rgba(120,40,20,0.25))" }}><path fill="#F6EFE6" d={CLAUDE_PATH} /></svg><Sheen r={size * 0.28} />
  </div>);
const Ic: React.FC<{ t: string; s?: number; c?: string }> = ({ t, s = 30, c = "#fff" }) => {
  const p: Record<string, React.ReactNode> = {
    check: <path d="M7 15 l5 5 L23 8" fill="none" stroke={c} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />,
    x: <g stroke={c} strokeWidth={3.2} strokeLinecap="round"><line x1={9} y1={9} x2={21} y2={21} /><line x1={21} y1={9} x2={9} y2={21} /></g>,
    star: <path d="M15 4 l3.2 6.5 7.2.6 -5.5 4.7 1.7 7 -6.6-3.8 -6.6 3.8 1.7-7 -5.5-4.7 7.2-.6Z" fill={c} />,
    phone: <path d="M9 5 q-3 0 -3 3.2 q0 11.8 11.8 11.8 q3.2 0 3.2-3.2 l0-2.2 -4-1.4 -2 2 q-3.4-1.6 -5-5 l2-2 -1.4-4 Z" fill={c} />,
    doc: <g fill="none" stroke={c} strokeWidth={2.4} strokeLinecap="round"><rect x={8} y={5} width={14} height={20} rx={2.5} /><line x1={11} y1={11} x2={19} y2={11} /><line x1={11} y1={15} x2={19} y2={15} /><line x1={11} y1={19} x2={16} y2={19} /></g>,
    person: <g fill={c}><circle cx={15} cy={11} r={5} /><path d="M5.5 26 q0-7.5 9.5-7.5 t9.5 7.5 Z" /></g>,
    dollar: <text x={15} y={22} fontSize={22} fontWeight={900} fill={c} textAnchor="middle" fontFamily="Inter">$</text>,
    q: <text x={15} y={22} fontSize={22} fontWeight={900} fill={c} textAnchor="middle" fontFamily="Inter">?</text>,
    chart: <g fill={c}><rect x={6} y={16} width={4} height={8} rx={1} /><rect x={13} y={10} width={4} height={14} rx={1} /><rect x={20} y={13} width={4} height={11} rx={1} /></g>,
    drop: <path d="M15 5 C20 13 22 16 22 19 a7 7 0 0 1-14 0 C8 16 10 13 15 5Z" fill={c} />,
    lock: <g><rect x={8} y={13} width={14} height={11} rx={2.5} fill={c} /><path d="M11 13 v-3 a4 4 0 0 1 8 0 v3" fill="none" stroke={c} strokeWidth={2.4} /></g>,
  };
  return <svg width={s} height={s} viewBox="0 0 30 30" style={{ filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.25))" }}>{p[t]}</svg>;
};
const nodeCol = (i: number): [string, string] => (i % 3 === 0 ? ["#E89A78", "#C5603C"] : i % 3 === 1 ? ["#6E8FBF", "#3A5C84"] : ["#DDA85C", "#CF9544"]);
const Counter: React.FC<{ cx: number; y: number; label: string; show: boolean; f: number; sF: number; w?: number; color?: [string, string] }> = ({ cx, y, label, show, f, sF, w = 170, color = ["#5C7CA8", "#3A5C84"] }) => show ? (<div style={{ position: "absolute", left: cx - w / 2, top: y, width: w, height: 54, borderRadius: 999, background: grad(color[0], color[1]), boxShadow: SH, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 30, color: "#fff", transform: `scale(${over(f, sF, 10)})` }}>{label}<Sheen r={999} /></div>) : null;
// a person figure (head + shoulders), tinted
const Figure: React.FC<{ x: number; y: number; w: number; e: number; col: [string, string]; lf: number; i?: number; hi?: boolean }> = ({ x, y, w, e, col, lf, i = 0, hi }) => (
  <div style={{ position: "absolute", left: x - w / 2, top: y, width: w, opacity: Math.min(1, e * 1.2), transform: `translateY(${(1 - e) * 16}px) scale(${0.7 + e * 0.3})`, transformOrigin: "bottom center" }}>
    <div style={{ width: w * 0.62, height: w * 0.62, borderRadius: "50%", margin: "0 auto", background: grad(col[0], col[1]), boxShadow: hi ? `${SH}, 0 0 24px rgba(210,114,78,0.5)` : SH }}><Sheen r="50%" o={0.25} /></div>
    <div style={{ width: w, height: w * 0.5, borderRadius: `${w * 0.5}px ${w * 0.5}px 14px 14px`, margin: `${w * 0.06}px auto 0`, background: grad(col[0], col[1]), boxShadow: SH }}><Sheen r={14} o={0.2} /></div>
  </div>);
// a small input chip (icon)
const Chip: React.FC<{ x: number; y: number; ic: string; e: number; col: [string, string]; s?: number }> = ({ x, y, ic, e, col, s = 54 }) => (
  <div style={{ position: "absolute", left: x - s / 2, top: y - s / 2, width: s, height: s, borderRadius: s * 0.28, background: grad(col[0], col[1]), boxShadow: SH, display: "flex", alignItems: "center", justifyContent: "center", opacity: e, transform: `scale(${0.6 + e * 0.4})` }}><Ic t={ic} s={s * 0.56} /><Sheen r={s * 0.28} /></div>);
const Bubble: React.FC<{ x: number; y: number; e: number; kind: "q" | "no" | "txt"; col?: [string, string] }> = ({ x, y, e, kind, col = ["#FBF7EF", "#EFEADF"] }) => (
  <div style={{ position: "absolute", left: x - 46, top: y - 36, width: 92, height: 64, borderRadius: 18, background: kind === "no" ? grad("#D2624C", "#A8392B") : grad(col[0], col[1]), boxShadow: SH, display: "flex", alignItems: "center", justifyContent: "center", opacity: e, transform: `scale(${0.5 + e * 0.5})` }}>
    {kind === "no" ? <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 30, color: "#fff" }}>no</span> : kind === "q" ? <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 32, color: SLATE }}>?</span> : <div style={{ display: "flex", flexDirection: "column", gap: 6, width: 56 }}>{[0.9, 0.6].map((w, i) => <div key={i} style={{ height: 6, width: `${w * 100}%`, borderRadius: 99, background: "rgba(58,92,132,0.3)" }} />)}</div>}
    <div style={{ position: "absolute", bottom: -8, left: 30, width: 0, height: 0, borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderTop: `10px solid ${kind === "no" ? "#A8392B" : "#EFEADF"}` }} /><Sheen r={18} />
  </div>);

type Word = { word: string; start: number; end: number; line: number };
const WORDS = wordsData as Word[];
const norm = (w: string) => w.toLowerCase().replace(/[.,!?"']/g, "");
const EMPH = new Set(["illegal", "illegal.", "illegal,", "second", "money", "digital", "twin", "customer", "customer.", "no", "no.", "leaks", "leaks,", "churn", "underpriced", "cash", "dollars", "dollars.", "questions", "objections", "closes", "script", "first", "first,", "second,", "third", "3", "all"]);
const CHUNKS = (() => {
  const byLine: Record<number, Word[]> = {}; for (const w of WORDS) (byLine[w.line] ||= []).push(w);
  const out: { words: Word[]; start: number; line: number }[] = [];
  for (const li of Object.keys(byLine).map(Number).sort((a, b) => a - b)) { const ws = byLine[li]; for (let i = 0; i < ws.length; i += 3) { const g = ws.slice(i, i + 3); out.push({ words: g, start: g[0].start, line: li }); } }
  const aE = Math.max(...WORDS.map((w) => w.end));
  return out.map((c, i) => ({ ...c, end: i + 1 < out.length ? out[i + 1].start : aE + 0.4 }));
})();
const Captions: React.FC = () => {
  const frame = useCurrentFrame();
  return (<>{CHUNKS.map((c, i) => {
    if (frame < fr(c.start) || frame >= fr(c.end)) return null;
    if (c.line === 4) return null;
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
const Stage: React.FC<{ children: React.ReactNode }> = ({ children }) => (<div style={{ position: "absolute", top: 522, left: "50%", marginLeft: -490, width: 980, height: 560 }}>{children}</div>);
// classified number tab (identity thread)
const Tab: React.FC<{ n: string; e: number }> = ({ n, e }) => (<div style={{ position: "absolute", left: 40, top: 18, display: "flex", alignItems: "center", gap: 12, opacity: e }}>
  <div style={{ width: 50, height: 50, borderRadius: 14, background: grad("#E08A66", "#C5603C"), boxShadow: SH, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 26, color: "#F6EFE6" }}>{n}<Sheen r={14} /></div>
  <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 999, background: "rgba(58,92,132,0.12)", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 15, letterSpacing: "0.18em", color: SLATE }}><Ic t="lock" s={16} c={SLATE} />CLASSIFIED</div>
</div>);

// ===== S0 — HOOK: a CLASSIFIED folder opens -> a CLASSIFIED paper lifts above the logo + 3 prompt files fan out =====
const RedactCard: React.FC<{ x: number; y: number; rot: number; n: number; e: number; lit: boolean; lf: number }> = ({ x, y, rot, n, e, lit, lf }) => {
  const W = 200, H = 264; const lines = [{ w: 0.92, red: false }, { w: 0.68, red: true }, { w: 0.86, red: false }, { w: 0.5, red: true }, { w: 0.78, red: false }];
  return (<div style={{ position: "absolute", left: x - W / 2, top: y - H / 2, width: W, height: H, borderRadius: 18, background: grad("#FDF9F1", "#ECE4D5"), boxShadow: lit ? `${SH}, 0 0 50px rgba(210,114,78,0.4)` : SH, transform: `rotate(${rot}deg)`, opacity: Math.min(1, e * 1.3), border: lit ? `2.5px solid ${CLAY}` : "1px solid rgba(40,32,20,0.05)", overflow: "hidden" }}>
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 48, background: grad(lit ? "#D2724E" : "#3A5C84", lit ? "#A8392B" : "#293A58"), display: "flex", alignItems: "center", padding: "0 14px", gap: 10 }}>
      <div style={{ width: 30, height: 30, borderRadius: 8, background: "rgba(255,255,255,0.94)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 18, color: lit ? "#A8392B" : "#293A58" }}>{n}</div>
      <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 14, letterSpacing: "0.15em", color: "rgba(255,255,255,0.94)" }}>PROMPT</span>
      <div style={{ marginLeft: "auto" }}><Ic t="lock" s={20} c="rgba(255,255,255,0.94)" /></div>
    </div>
    <div style={{ position: "absolute", top: 66, left: 16, right: 16, display: "flex", flexDirection: "column", gap: 12 }}>
      {lines.map((r, i) => <div key={i} style={{ height: 13, width: `${r.w * 100}%`, borderRadius: 4, background: r.red ? "#222E45" : grad("#7E9DC8", "#4A6E9C") }} />)}
    </div>
    <Sheen r={18} /><Glint r={18} t={ramp(lf, n * 9 + 22, n * 9 + 42)} />
  </div>);
};
const Hook: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const lf = f - fr(s);
  const folderIn = over(f, fr(s) + 2, 14); const lid = eOut(f, fr(s) + 18, 14);
  const files = [0, 1, 2].map((i) => over(f, fr(s) + 32 + i * 9, 15));
  const paper = over(f, fr(s) + 56, 16); const stamp = over(f, fr(s) + 76, 9);
  const cx = 490; const fY = 466;
  const fl = [{ x: 268, y: 352, r: -8 }, { x: 490, y: 334, r: 0 }, { x: 712, y: 352, r: 8 }];
  return (<Stage>
    <Bloom cx={cx} cy={300} w={1120} h={860} color={`rgba(${Math.round(58 + paper * 120)},${Math.round(92 + paper * 14)},132,0.22)`} lf={lf} base={0.55 + paper * 0.18} />
    {/* folder back panel + tab */}
    <Contact cx={cx} cy={fY + 118} w={446} sx={0.86} op={0.3} />
    <div style={{ position: "absolute", left: cx - 222, top: fY - 100, width: 444, height: 208, borderRadius: 18, background: grad("#E8C98E", "#C49452"), boxShadow: SH, transform: `scale(${folderIn})` }}>
      <div style={{ position: "absolute", top: -34, left: 28, width: 168, height: 42, borderRadius: "12px 12px 0 0", background: grad("#EDCF95", "#C49452"), display: "flex", alignItems: "center", gap: 9, paddingLeft: 12 }}><div style={{ width: 28, height: 28 }}><ClaudeMark size={28} glow={0.3} /></div><span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 13, letterSpacing: "0.14em", color: "rgba(80,54,20,0.82)" }}>PROMPTS</span></div>
      <Sheen r={18} o={0.18} />
    </div>
    {/* 3 prompt files rise out of the folder; bottoms tucked by the front pocket */}
    {fl.map((p, i) => files[i] > 0.02 ? <div key={i} style={{ transform: `translateY(${(1 - files[i]) * 150}px) scale(${0.86 + files[i] * 0.14})`, transformOrigin: "center bottom", opacity: files[i] }}><RedactCard x={p.x} y={p.y} rot={p.r} n={i + 1} e={files[i]} lit={i === 1} lf={lf} /></div> : null)}
    {/* folder FRONT pocket */}
    <div style={{ position: "absolute", left: cx - 222, top: fY + 38, width: 444, height: 100, borderRadius: "10px 10px 18px 18px", background: grad("#DFB877", "#B98A45"), boxShadow: "0 -8px 20px rgba(34,30,24,0.22), inset 0 2px 0 rgba(255,255,255,0.25)", transform: `scale(${folderIn}) translateY(${lid * 5}px)`, zIndex: 7 }}><Sheen r={14} o={0.2} /></div>
    {/* CLASSIFIED paper lifts to the top, above the folder */}
    {paper > 0.02 && (<div style={{ position: "absolute", left: cx - 134, top: interpolate(paper, [0, 1], [fY - 130, 8]), width: 268, height: 116, borderRadius: 10, background: grad("#FFFDF8", "#F1EBDD"), boxShadow: SH, transform: `rotate(${-5 + (1 - paper) * 12}deg) scale(${0.74 + paper * 0.26})`, zIndex: 9, opacity: paper }}>
      {[0.5, 0.78].map((w, i) => <div key={i} style={{ position: "absolute", top: 18 + i * 18, left: 22, width: `${w * 62}%`, height: 9, borderRadius: 3, background: "rgba(58,92,132,0.18)" }} />)}
      {stamp > 0.02 && <div style={{ position: "absolute", left: 30, top: 44, transform: `rotate(-10deg) scale(${interpolate(stamp, [0, 1], [1.7, 1])})`, padding: "8px 22px", borderRadius: 8, border: `4px solid ${RED}`, color: RED, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 33, letterSpacing: "0.1em", background: "rgba(196,74,58,0.07)" }}>CLASSIFIED</div>}
      <Sheen r={10} /><Glint r={10} t={ramp(lf, 60, 80)} />
    </div>)}
    {stamp > 0.02 && stamp < 0.7 && <div style={{ position: "absolute", left: cx - 100 * stamp, top: 76 - 100 * stamp, width: 200 * stamp, height: 200 * stamp, borderRadius: "50%", border: `${4 * (1 - stamp)}px solid ${RED}`, opacity: (1 - stamp) * 0.5, zIndex: 9 }} />}
    <Dust lf={lf} n={6} seed={1} />
  </Stage>);
};

// ===== S1 — PROMPT 1: reviews/calls/tickets FLY in + MATERIALIZE into a customer twin -> interview -> "no" =====
const Twin: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const lf = f - fr(s);
  const inputs = [0, 1, 2].map((i) => over(f, fr(s) + 8 + i * 8, 12));
  const converge = ramp(lf, 40, 70); const flash = ramp(lf, 64, 80); const mat = ramp(lf, 68, 106);
  const mic = over(f, fr(s) + 150, 18); const reject = over(f, fr(s) + 232, 12);
  const cx = 490, cy = 252; const figW = 204, figTop = cy - 98, figH = 250;
  const ins = [{ ic: "star", sx: 152, sy: 130 }, { ic: "phone", sx: 128, sy: 270 }, { ic: "doc", sx: 200, sy: 398 }];
  return (<Stage>
    <Tab n="1" e={over(f, fr(s) + 2, 12)} />
    <Bloom cx={cx} cy={262} w={1040} h={800} color={`rgba(${Math.round(96 + mat * 114)},${Math.round(132 + mat * 6)},${Math.round(196 - mat * 64)},0.22)`} lf={lf} base={0.5 + mat * 0.24} />
    {mat > 0.02 && <div style={{ position: "absolute", left: cx - 210, top: cy - 200, width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle, rgba(210,114,78,0.32), transparent 62%)", opacity: 0.5 + Math.sin(lf / 8) * 0.18 }} />}
    {/* input chips fly to center + leave trails */}
    {ins.map((it, i) => { const e = inputs[i]; if (e <= 0.02) return null; const op = e * (1 - ramp(converge, 0.72, 1)); if (op <= 0.02) return null; const xx = (cv: number) => interpolate(cv, [0, 1], [it.sx, cx], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) }); const yy = (cv: number) => interpolate(cv, [0, 1], [it.sy, cy + 8], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) });
      return <React.Fragment key={i}>
        {converge > 0.12 && [0.45, 0.22].map((tr, k) => { const c2 = Math.max(0, converge - 0.07 * (k + 1)); return <Chip key={k} x={xx(c2)} y={yy(c2)} ic={it.ic} e={op * tr} col={nodeCol(i)} s={62} />; })}
        <Chip x={xx(converge)} y={yy(converge)} ic={it.ic} e={op} col={nodeCol(i)} s={66} />
      </React.Fragment>; })}
    {flash > 0 && flash < 1 && <div style={{ position: "absolute", left: cx - 100, top: cy - 100, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,246,224,0.92), transparent 60%)", transform: `scale(${0.4 + flash * 1.5})`, opacity: Math.sin(flash * Math.PI) }} />}
    {/* the twin materializes bottom-up (holographic build) */}
    {mat > 0.02 && (<>
      <Contact cx={cx} cy={figTop + figH + 16} w={190} sx={0.8} op={0.3} />
      <div style={{ position: "absolute", inset: 0, clipPath: `inset(${(1 - mat) * 100}% 0 0 0)` }}><Figure x={cx} y={figTop} w={figW} e={1} col={["#7E9DC8", "#3A5C84"]} lf={lf} hi /></div>
      <div style={{ position: "absolute", left: cx - figW / 2, top: figTop, width: figW, height: figH, clipPath: `inset(${(1 - mat) * 100}% 0 0 0)`, backgroundImage: "repeating-linear-gradient(0deg, rgba(245,225,200,0.18) 0 2px, transparent 2px 7px)", opacity: 0.55, pointerEvents: "none", borderRadius: 30 }} />
      {mat < 0.99 && <div style={{ position: "absolute", left: cx - figW / 2 - 10, top: figTop + figH * (1 - mat) - 2, width: figW + 20, height: 4, borderRadius: 2, background: "rgba(240,200,150,0.95)", boxShadow: "0 0 16px rgba(240,190,120,0.95)" }} />}
      <div style={{ position: "absolute", left: cx - 102, top: figTop + figH + 26, padding: "7px 20px", borderRadius: 999, background: grad("#D2724E", "#A8392B"), boxShadow: SH, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 18, letterSpacing: "0.14em", color: "#fff", opacity: ramp(lf, 98, 112) }}>DIGITAL TWIN<Sheen r={999} /></div>
    </>)}
    {/* interview: a microphone extends to the twin */}
    {mic > 0.02 && (() => { const bob = Math.sin(lf / 11) * 4; return (
      <div style={{ position: "absolute", left: cx - 304, top: cy - 48 + bob, transform: `translateX(${(1 - mic) * -180}px) scale(${mic})`, transformOrigin: "left center", zIndex: 6 }}>
        <div style={{ position: "absolute", left: 0, top: 22, width: 168, height: 26, borderRadius: 13, background: grad("#46618A", "#222E45"), boxShadow: SH }}><Sheen r={13} o={0.18} /></div>
        <div style={{ position: "absolute", left: 150, top: 0, width: 86, height: 70, borderRadius: "20px 40px 40px 20px", background: grad("#7E9DC8", "#2A3F5E"), boxShadow: SH, overflow: "hidden" }}>{[0, 1, 2, 3, 4].map((i) => <div key={i} style={{ position: "absolute", top: 9, bottom: 9, left: 26 + i * 11, width: 4, borderRadius: 2, background: "rgba(255,255,255,0.22)" }} />)}<Sheen r={28} /></div>
      </div>); })()}
    {/* the twin's answer: a red ✗ (no) */}
    {reject > 0.02 && <div style={{ position: "absolute", left: cx + 90, top: cy - 142, width: 86, height: 86, borderRadius: "50%", background: grad("#D2624C", "#A8392B"), boxShadow: `${SH}, 0 0 28px rgba(196,74,58,0.55)`, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${reject})`, zIndex: 7 }}><Ic t="x" s={46} /><Sheen r="50%" /></div>}
    <Dust lf={lf} n={5} seed={2} />
  </Stage>);
};

// ===== S2 — PROMPT 2: money LEAK audit -> ranked $ list =====
const Money: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const lf = f - fr(s);
  const dash = over(f, fr(s) + 6, 14); const scan = ramp(lf, 52, 112); const leaks = [0, 1, 2].map((i) => over(f, fr(s) + 122 + i * 22, 14));
  const dcx = 232, dW = 300, dH = 270, dTop = 150;
  const rows = [{ ic: "person", amt: "$11k", c: ["#7E9DC8", "#3A5C84"] as [string, string] }, { ic: "chart", amt: "$7.4k", c: ["#E0B05E", "#CF9544"] as [string, string] }, { ic: "drop", amt: "$4.2k", c: ["#D2624C", "#A8392B"] as [string, string] }];
  return (<Stage>
    <Tab n="2" e={over(f, fr(s) + 2, 12)} />
    <Bloom cx={leaks[0] > 0.2 ? 712 : 420} cy={262} w={1040} h={780} color="rgba(207,149,68,0.16)" lf={lf} base={0.5 + leaks[2] * 0.2} />
    <Contact cx={dcx} cy={dTop + dH + 16} w={dW} sx={0.84} op={0.3} />
    <div style={{ position: "absolute", left: dcx - dW / 2, top: dTop, width: dW, height: dH, borderRadius: 22, background: grad("#FCF8F0", "#ECE4D5"), boxShadow: SH, transform: `scale(${dash})`, overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 44, background: grad("#5C7CA8", "#3A5C84"), display: "flex", alignItems: "center", paddingLeft: 16, gap: 8 }}>{[RED, AMBER, GREEN].map((c, i) => <div key={i} style={{ width: 12, height: 12, borderRadius: 6, background: c }} />)}<span style={{ marginLeft: 8, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 15, letterSpacing: "0.1em", color: "rgba(255,255,255,0.92)" }}>STRIPE · ADS</span></div>
      <div style={{ position: "absolute", top: 62, left: 20, right: 20, display: "flex", gap: 9, alignItems: "flex-end", height: 120 }}>{[0.5, 0.82, 0.4, 0.96, 0.58, 0.72, 0.46].map((h, i) => <div key={i} style={{ flex: 1, height: `${h * 100}%`, borderRadius: 7, background: grad(i === 3 ? "#E0B05E" : "#7E9DC8", i === 3 ? "#CF9544" : "#4A6E9C") }}><Sheen r={7} o={0.2} /></div>)}</div>
      <div style={{ position: "absolute", top: 202, left: 20, right: 20, display: "flex", gap: 10 }}>{[0, 1, 2].map((i) => <div key={i} style={{ flex: 1, height: 42, borderRadius: 10, background: grad("#7E9DC8", "#4A6E9C"), opacity: 0.55 }}><Sheen r={10} o={0.18} /></div>)}</div>
      {scan > 0.02 && scan < 1 && <div style={{ position: "absolute", top: 44, bottom: 0, left: `${scan * 100}%`, width: 5, background: "linear-gradient(180deg, transparent, rgba(210,114,78,0.85), transparent)", boxShadow: "0 0 16px rgba(210,114,78,0.7)" }} />}
      <Sheen r={22} />
    </div>
    {rows.map((r, i) => { const e = leaks[i]; if (e <= 0.02) return null; return (
      <div key={i} style={{ position: "absolute", left: 588, top: 160 + i * 90, width: 352, height: 78, borderRadius: 16, background: grad("#FCF8F0", "#ECE4D5"), boxShadow: SH, display: "flex", alignItems: "center", padding: "0 18px", gap: 16, opacity: e, transform: `translateX(${(1 - e) * 34}px) scale(${0.92 + e * 0.08})` }}>
        <div style={{ width: 52, height: 52, borderRadius: 14, background: grad(r.c[0], r.c[1]), display: "flex", alignItems: "center", justifyContent: "center", boxShadow: SH }}><Ic t={r.ic} s={28} /><Sheen r={14} o={0.2} /></div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 9 }}><div style={{ height: 11, width: "82%", borderRadius: 99, background: grad(r.c[0], r.c[1]) }} /><div style={{ height: 9, width: "54%", borderRadius: 99, background: "rgba(58,92,132,0.22)" }} /></div>
        <div style={{ padding: "8px 16px", borderRadius: 999, background: grad("#D2624C", "#A8392B"), boxShadow: SH, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 26, color: "#fff" }}>{r.amt}<Sheen r={999} /></div>
        <Glint r={16} t={ramp(lf, 122 + i * 22, 140 + i * 22)} />
      </div>); })}
    {scan > 0.4 && Array.from({ length: 7 }, (_, i) => { const p = ramp(lf, 72 + i * 4, 112 + i * 4); if (p <= 0 || p >= 1) return null; return <div key={i} style={{ position: "absolute", left: dcx - 50 + i * 17, top: dTop + dH - p * 52, width: 22, height: 22, borderRadius: "50%", background: grad("#F3CB5C", "#CF9544"), boxShadow: SH, opacity: 1 - p, display: "flex", alignItems: "center", justifyContent: "center" }}><Ic t="dollar" s={13} c="#7A4A12" /></div>; })}
    <Dust lf={lf} n={5} seed={3} />
  </Stage>);
};

// ===== S3 — PROMPT 3: clone your CLOSER -> script every rep runs =====
const Clone: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const lf = f - fr(s);
  const rep = over(f, fr(s) + 6, 14); const script = over(f, fr(s) + 98, 16); const fanout = ramp(lf, 182, 270); const callsOut = ramp(lf, 100, 118);
  const scX = 520; const scrScale = interpolate(fanout, [0, 1], [1, 0.56]); const scrY = interpolate(fanout, [0, 1], [110, 30]);
  const reps = [304, 444, 584, 724];
  return (<Stage>
    <Tab n="3" e={over(f, fr(s) + 2, 12)} />
    <Bloom cx={fanout > 0.4 ? 490 : script > 0.3 ? scX : 320} cy={fanout > 0.4 ? 300 : 262} w={1040} h={780} color="rgba(210,114,78,0.16)" lf={lf} base={0.5 + script * 0.2} />
    {callsOut < 1 && (<div style={{ opacity: 1 - callsOut }}>
      <Figure x={150} y={132} w={150} e={rep} col={["#E08A66", "#C5603C"]} lf={lf} hi />
      <div style={{ position: "absolute", left: 150 - 56, top: 310, padding: "6px 16px", borderRadius: 999, background: grad("#E08A66", "#C5603C"), boxShadow: SH, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 15, letterSpacing: "0.1em", color: "#fff", opacity: rep }}>TOP REP<Sheen r={999} /></div>
      {[0, 1, 2].map((i) => { const e = ramp(lf, 36 + i * 8, 58 + i * 8); return <div key={i} style={{ position: "absolute", left: 270 - 75, top: 126 + i * 64, width: 150, height: 50, borderRadius: 14, background: grad("#5C7CA8", "#3A5C84"), boxShadow: SH, display: "flex", alignItems: "center", justifyContent: "center", gap: 4, opacity: e }}>{Array.from({ length: 11 }, (_, k) => <div key={k} style={{ width: 4.5, height: `${28 + Math.abs(Math.sin((lf + k * 5 + i * 9) / 5)) * 44}%`, minHeight: 6, borderRadius: 3, background: "rgba(255,255,255,0.8)" }} />)}<Sheen r={14} /></div>; })}
    </div>)}
    {script > 0.02 && (<div>
      <Contact cx={scX} cy={scrY + 390 * scrScale + 14} w={290 * scrScale} sx={0.84} op={0.3} />
      <div style={{ position: "absolute", left: scX - 146, top: scrY, width: 292, height: 390, borderRadius: 18, background: grad("#FCF8F0", "#ECE4D5"), boxShadow: `${SH}, 0 0 44px rgba(210,114,78,0.22)`, border: `2.5px solid ${CLAY}`, transform: `scale(${script * scrScale})`, transformOrigin: "top center" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 46, borderRadius: "16px 16px 0 0", background: grad("#D2724E", "#A8392B"), display: "flex", alignItems: "center", paddingLeft: 18, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 15, letterSpacing: "0.14em", color: "rgba(255,255,255,0.94)" }}>THE SCRIPT</div>
        {[{ ic: "q", c: ["#7E9DC8", "#3A5C84"] as [string, string] }, { ic: "x", c: ["#E0B05E", "#CF9544"] as [string, string] }, { ic: "check", c: ["#56B488", "#3F9E74"] as [string, string] }].map((sec, i) => { const e = ramp(lf, 104 + i * 16, 128 + i * 16); return (
          <div key={i} style={{ position: "absolute", top: 66 + i * 106, left: 18, right: 18, height: 92, borderRadius: 14, background: "rgba(255,255,255,0.62)", boxShadow: e > 0.4 ? `0 0 18px ${sec.c[1]}55` : "none", display: "flex", alignItems: "center", gap: 14, padding: "0 16px", opacity: 0.3 + e * 0.7, transform: `scale(${0.95 + e * 0.05})` }}>
            <div style={{ width: 50, height: 50, borderRadius: 13, background: grad(sec.c[0], sec.c[1]), display: "flex", alignItems: "center", justifyContent: "center", boxShadow: SH }}><Ic t={sec.ic} s={26} /></div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 9 }}>{[0.86, 0.6].map((w, j) => <div key={j} style={{ height: 10, width: `${w * 100 * (0.4 + e * 0.6)}%`, borderRadius: 99, background: grad(sec.c[0], sec.c[1]) }} />)}</div>
          </div>); })}
        <Sheen r={18} /><Glint r={18} t={ramp(lf, 98, 120)} />
      </div>
    </div>)}
    {fanout > 0.02 && reps.map((x, i) => { const e = ramp(lf, 186 + i * 6, 212 + i * 6); return (<React.Fragment key={i}>
      <svg width={980} height={560} style={{ position: "absolute", inset: 0 }}><line x1={scX} y1={scrY + 390 * scrScale} x2={x} y2={392} stroke="rgba(210,114,78,0.36)" strokeWidth={3.5} strokeLinecap="round" strokeDasharray={300} strokeDashoffset={300 * (1 - e)} /></svg>
      <Figure x={x} y={394} w={112} e={e} col={nodeCol(i)} lf={lf} />
      {ramp(lf, 216 + i * 6, 228 + i * 6) > 0.4 && <div style={{ position: "absolute", left: x - 21, top: 360, width: 42, height: 42, borderRadius: 11, background: grad("#FCF8F0", "#ECE4D5"), boxShadow: SH, display: "flex", alignItems: "center", justifyContent: "center", opacity: e }}><Ic t="doc" s={22} c={CLAY} /></div>}
    </React.Fragment>); })}
    <Dust lf={lf} n={5} seed={4} />
  </Stage>);
};

// ===== S4 — CTA: comment ILLEGAL =====
const CTA: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const lf = f - fr(s); if (lf < 0) return null;
  const cardIn = over(f, fr(s) + 2, 14); const ink = over(f, fr(s) + 20, 12); const sent = over(f, fr(s) + 34, 12);
  const cx = 490, cy = 280;
  return (<>
    <Stage>
      <Bloom cx={cx} cy={246} w={1020} h={780} color="rgba(210,114,78,0.2)" lf={lf} base={0.7} />
      <Contact cx={cx} cy={cy + 150} w={460} sx={0.8} op={0.3} />
      <div style={{ position: "absolute", left: cx - 250, top: cy - 140, width: 500, height: 290, borderRadius: 14, background: grad("#FBF7EF", "#EFEADF"), boxShadow: "inset 0 2px 10px rgba(34,30,24,0.12), 0 18px 40px rgba(20,26,45,0.24)", transform: `rotate(-3deg) scale(${cardIn})`, padding: 30 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}><div style={{ width: 56, height: 56 }}><ClaudeMark size={56} glow={0.34} /></div><div style={{ flex: 1, height: 12, borderRadius: 99, background: grad("#5C7CA8", "#3A5C84") }} /></div>
        {["#4A6E9C", "#CF9544", "#3F9E74"].map((c, i) => <div key={i} style={{ height: 9, width: `${[80, 60, 45][i]}%`, borderRadius: 99, background: c, opacity: 0.5, marginBottom: 12 }} />)}
        {ink > 0.02 && <div style={{ position: "absolute", left: 92, top: 150, transform: `rotate(-3deg) scale(${ink})` }}><span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 72, letterSpacing: "0.03em", color: "rgba(197,96,60,0.94)" }}>ILLEGAL</span></div>}
        {sent > 0.02 && <div style={{ position: "absolute", bottom: -16, right: -14, width: 56, height: 56, borderRadius: "50%", background: GREEN, boxShadow: "0 8px 18px rgba(63,158,116,0.5)", display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${sent})` }}><Ic t="check" s={32} /></div>}
        <Sheen r={14} />
      </div>
      <Dust lf={lf} n={6} seed={5} />
    </Stage>
    <div style={{ position: "absolute", top: 1138, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 16, opacity: eOut(f, fr(s) + 6, 14) }}>
      <div style={{ position: "relative", transform: `scale(${1 + Math.sin(lf / 7) * 0.025})`, padding: "22px 50px", borderRadius: 999, background: grad("#E08A66", "#C5603C"), boxShadow: `${SH}, 0 0 44px rgba(210,114,78,0.42)`, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 56, color: "#fff", display: "flex", alignItems: "center", gap: 14, whiteSpace: "nowrap" }}>💬 Comment “ILLEGAL”<Sheen r={999} /></div>
      <div style={{ fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 600, fontSize: 44, color: INK, textShadow: "0 2px 16px rgba(236,233,226,0.95)" }}>and I’ll send you all 3</div>
    </div>
  </>);
};

const Sfx: React.FC<{ at: number; src: string; vol?: number }> = ({ at, src, vol = 0.4 }) => (<Sequence from={fr(at)} durationInFrames={fr(4)}><Audio src={staticFile(`sfx/${src}`)} volume={vol} /></Sequence>);
const SfxTrack: React.FC = () => (<>
  <Sfx at={L[0]} src="riser.wav" vol={0.3} /><Sfx at={L[0]} src="swooshup.wav" vol={0.3} /><Sfx at={L[0] + 0.8} src="snap.wav" vol={0.32} />{[0, 1, 2].map((i) => <Sfx key={i} at={L[0] + 0.8 + i * 0.27} src="blip3.wav" vol={0.2} />)}<Sfx at={L[0] + 2.5} src="sparkle.wav" vol={0.3} />
  <Sfx at={L[1] - 1.5} src="metal_riser.wav" vol={0.78} /><Sfx at={L[1] + 2.8} src="snap.wav" vol={0.3} /><Sfx at={L[1] + 8.5} src="thock.wav" vol={0.34} />
  <Sfx at={L[2] + 0.2} src="swish.wav" vol={0.22} /><Sfx at={L[2] + 1.7} src="data.wav" vol={0.26} />{[0, 1, 2].map((i) => <Sfx key={i} at={L[2] + 4.0 + i * 0.7} src="blip2.wav" vol={0.22} />)}
  <Sfx at={L[3] + 0.2} src="swish.wav" vol={0.22} /><Sfx at={L[3] + 3.2} src="resolve.wav" vol={0.28} /><Sfx at={L[3] + 6.0} src="snap.wav" vol={0.28} />
  <Sfx at={L[4] + 0.7} src="thock.wav" vol={0.36} /><Sfx at={L[4] + 1.3} src="sparkle.wav" vol={0.3} />
</>);
const Ambient: React.FC = () => {
  const frame = useCurrentFrame(); const t = frame / FPS;
  return (<AbsoluteFill style={{ pointerEvents: "none" }}>{Array.from({ length: 10 }, (_, i) => {
    const x = rnd(i, 11) * 1060 + 10, y = rnd(i, 12) * 1880 + 20; const dx = Math.sin((t + i * 1.7) / (5 + rnd(i, 13) * 4)) * 40, dy = Math.cos((t + i * 2.1) / (6 + rnd(i, 14) * 4)) * 36;
    const size = 6 + rnd(i, 15) * 10; const tw = 0.3 + 0.7 * (Math.sin(t * 1.4 + i * 2) * 0.5 + 0.5); const isSpark = rnd(i, 16) > 0.5; const col = [SLATE, AMBER, CLAY, SLATE2][Math.floor(rnd(i, 17) * 4)];
    return isSpark ? <div key={i} style={{ position: "absolute", left: x + dx, top: y + dy, fontSize: size, color: col, opacity: tw * 0.28 }}>✦</div> : <div key={i} style={{ position: "absolute", left: x + dx, top: y + dy, width: size, height: size, borderRadius: "50%", background: col, opacity: tw * 0.13 }} />;
  })}</AbsoluteFill>);
};
const Background: React.FC = () => {
  const frame = useCurrentFrame(); const drift = Math.sin(frame / 90) * 6;
  return (<AbsoluteFill style={{ backgroundColor: "#EFE8D9" }}>
    <AbsoluteFill style={{ transform: `translate(${drift}px,${drift * 0.6}px)`, backgroundImage: "linear-gradient(rgba(96,74,46,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(96,74,46,0.06) 1px,transparent 1px)", backgroundSize: "66px 66px" }} />
    <AbsoluteFill style={{ opacity: 0.05, mixBlendMode: "multiply" }}><svg width="100%" height="100%"><filter id="ppP2"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves={2} stitchTiles="stitch" /></filter><rect width="100%" height="100%" filter="url(#ppP2)" /></svg></AbsoluteFill>
    <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 42%, rgba(0,0,0,0) 58%, rgba(86,62,34,0.06) 100%)" }} />
  </AbsoluteFill>);
};

const L = [0.0, 4.96, 15.62, 24.7, 34.28];
// hero hook-header (raycfu-style, opening only) — mute-readable hook as a title
const HeroHeader: React.FC = () => {
  const f = useCurrentFrame();
  if (f > 110) return null;
  const appear = eOut(f, 0, 9);
  const out = eOut(f, 94, 13);
  const op = appear * (1 - out);
  const ty = (1 - appear) * 22 - out * 14;
  const sc = 0.965 + appear * 0.035;
  const l2 = eOut(f, 11, 9);
  return (
    <div style={{ position: "absolute", top: 340, left: 74, right: 74, opacity: op, transform: `translateY(${ty}px) scale(${sc})`, transformOrigin: "left top", zIndex: 60 }}>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 68, lineHeight: 1.04, letterSpacing: "-0.03em", color: INK, textShadow: "0 2px 18px rgba(236,233,226,0.96)" }}>
        <div><span style={{ color: CLAY }}>3 prompts</span> that find</div>
        <div style={{ opacity: l2 }}>money you're <span style={{ color: CLAY }}>losing.</span></div>
      </div>
    </div>
  );
};

export const ClaudePromptsV2Reel: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 16, 28], [1.0, 1.09, 1.0], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  return (
    <AbsoluteFill style={{ backgroundColor: "#EFE8D9", fontFamily: inter.fontFamily }}>
      <Audio src={staticFile("vo_promptsv2.wav")} />
      <Audio src={staticFile("ados_bed_loud.wav")} volume={0.18} />
      <SfxTrack />
      <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "50% 46%" }}>
        <Background />
        <Ambient />
        <Scene s={L[0]} e={L[1]}><Hook s={L[0]} /></Scene>
        <Scene s={L[1]} e={L[2]}><Twin s={L[1]} /></Scene>
        <Scene s={L[2]} e={L[3]}><Money s={L[2]} /></Scene>
        <Scene s={L[3]} e={L[4]}><Clone s={L[3]} /></Scene>
        <CTA s={L[4]} />
        <HeroHeader />
        <Captions />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
