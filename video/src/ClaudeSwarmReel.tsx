import React from "react";
import { AbsoluteFill, Audio, Easing, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { fraunces, frauncesItalic, inter } from "./fonts";
import wordsData from "./data/words_swarm.json";

/**
 * ClaudeSwarmReel — "One Claude command spawned a thousand agents and cleared a month of backlog in an afternoon"
 * (Opus 4.8 Dynamic Workflows / 1,000-subagent fan-out). Premium system shared w/ ClaudeAskReel/ClaudeNightReel:
 * centered big heroes, Bloom→Contact→hero→Sheen/Glint z-layers, 158° grads + stacked navy shadow, ONE clay pop,
 * no dull grey, no container unless device, escalate across the VO, tight end. Identity thread = the AGENT SWARM
 * (one command tile bursting into a cloud of clay/slate agent-nodes + an orchestration spine). Alex's recorded VO.
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
    <svg viewBox="0 0 24 24" width={size * 0.58} height={size * 0.58} style={{ filter: "drop-shadow(0 1px 1px rgba(120,40,20,0.25))" }}><path fill="#F6EFE6" d={CLAUDE_PATH} /></svg>
    <Sheen r={size * 0.28} />
  </div>
);
const Ic: React.FC<{ t: string; s?: number; c?: string }> = ({ t, s = 30, c = "#fff" }) => {
  const p: Record<string, React.ReactNode> = {
    check: <path d="M7 15 l5 5 L23 8" fill="none" stroke={c} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />,
    migrate: <g fill="none" stroke={c} strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round"><rect x={4} y={9} width={9} height={12} rx={1.5} /><rect x={17} y={9} width={9} height={12} rx={1.5} /><path d="M13 15 H17 M15 12.5 L17.6 15 L15 17.5" /></g>,
    broom: <g fill="none" stroke={c} strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 L11 15" /><path d="M7 22 C7 17 10 14 13 17 C16 20 13 23 9 23 Z" fill={c} stroke="none" /><path d="M12 16 L16 20" /></g>,
    grid: <g fill={c}><rect x={6} y={6} width={6} height={6} rx={1} /><rect x={18} y={6} width={6} height={6} rx={1} /><rect x={6} y={18} width={6} height={6} rx={1} /><rect x={18} y={18} width={6} height={6} rx={1} /></g>,
    bolt: <path d="M16 5 L8 17 H14 L13 25 L22 12 H16 Z" fill={c} />,
  };
  return <svg width={s} height={s} viewBox="0 0 30 30" style={{ filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.25))" }}>{p[t]}</svg>;
};
// a single agent-node (small Claude unit) — clay / slate / amber, never dull grey
const nodeCol = (i: number): [string, string] => (i % 3 === 0 ? ["#E89A78", "#C5603C"] : i % 3 === 1 ? ["#6E8FBF", "#3A5C84"] : ["#DDA85C", "#CF9544"]);
const Node: React.FC<{ x: number; y: number; size: number; i: number; e: number; mark?: boolean }> = ({ x, y, size, i, e, mark }) => { const c = nodeCol(i); return (
  <div style={{ position: "absolute", left: x - size / 2, top: y - size / 2, width: size, height: size, borderRadius: size * 0.3, background: grad(c[0], c[1]), boxShadow: SH, opacity: Math.min(1, e * 1.2), transform: `scale(${0.4 + e * 0.6})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
    {mark && size > 22 && <svg viewBox="0 0 24 24" width={size * 0.5} height={size * 0.5}><path fill="rgba(246,239,230,0.92)" d={CLAUDE_PATH} /></svg>}<Sheen r={size * 0.3} />
  </div>); };
// a swarm cloud of N nodes filling a disc, staggered reveal by progress p
const Swarm: React.FC<{ cx: number; cy: number; rx: number; ry: number; n: number; p: number; lf: number; seed?: number; size?: number }> = ({ cx, cy, rx, ry, n, p, lf, seed = 0, size = 30 }) => (<>{Array.from({ length: n }, (_, i) => {
  const ra = rnd(i, seed) * Math.PI * 2, rr = Math.sqrt(rnd(i, seed + 1));
  const tx = cx + Math.cos(ra) * rx * rr, ty = cy + Math.sin(ra) * ry * rr + Math.sin((lf + i * 9) / 16) * 3;
  const e = ramp(p * (n + 6) - i, 0, 1.6); if (e <= 0.02) return null;
  return <Node key={i} x={tx} y={ty} size={size * (0.7 + rnd(i, seed + 2) * 0.5)} i={i} e={e} mark={size > 26 && rnd(i, seed + 3) > 0.4} />;
})}</>);

type Word = { word: string; start: number; end: number; line: number };
const WORDS = wordsData as Word[];
const norm = (w: string) => w.toLowerCase().replace(/[.,!?"']/g, "");
const EMPH = new Set(["thousand", "agents", "month", "afternoon", "fan", "out.", "out", "setup.", "setup", "plan,", "plan", "hundreds", "check", "once", "cap", "migration,", "migration", "cleanup,", "competitor", "lunch.", "lunch", "swarm", "spawned"]);
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
    if (c.line === 5) return null;
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
const Counter: React.FC<{ cx: number; y: number; label: string; show: boolean; f: number; sF: number; w?: number; color?: [string, string] }> = ({ cx, y, label, show, f, sF, w = 180, color = ["#5C7CA8", "#3A5C84"] }) => show ? (<div style={{ position: "absolute", left: cx - w / 2, top: y, width: w, height: 56, borderRadius: 999, background: grad(color[0], color[1]), boxShadow: SH, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 32, color: "#fff", transform: `scale(${over(f, sF, 10)})` }}>{label}<Sheen r={999} /></div>) : null;
const tcCol = (i: number): [string, string] => (i % 3 === 0 ? ["#6E8FBF", "#3A5C84"] : i % 3 === 1 ? ["#DDA85C", "#CF9544"] : ["#E89A78", "#C5603C"]);
// a real ticket card — priority dot + 2 skeleton lines + Sheen + stacked shadow
const Ticket: React.FC<{ x: number; y: number; w: number; h: number; i: number; e: number; rot?: number; checked?: number; col?: [string, string] }> = ({ x, y, w, h, i, e, rot = 0, checked = 0, col }) => { const c = col || tcCol(i); return (
  <div style={{ position: "absolute", left: x - w / 2, top: y - h / 2, width: w, height: h, borderRadius: Math.min(10, h * 0.22), background: grad(c[0], c[1]), boxShadow: SH, opacity: e, transform: `scale(${0.6 + e * 0.4}) rotate(${rot}deg)`, padding: h * 0.18 }}>
    <div style={{ position: "absolute", top: h * 0.2, left: h * 0.2, width: h * 0.16, height: h * 0.16, borderRadius: "50%", background: AMBER }} />
    <div style={{ position: "absolute", top: h * 0.22, left: h * 0.5, right: w * 0.14, height: Math.max(3, h * 0.1), borderRadius: 99, background: "rgba(255,255,255,0.5)" }} />
    <div style={{ position: "absolute", top: h * 0.5, left: h * 0.5, right: w * 0.28, height: Math.max(3, h * 0.1), borderRadius: 99, background: "rgba(255,255,255,0.32)" }} />
    {checked > 0.02 && <div style={{ position: "absolute", right: -h * 0.28, top: -h * 0.28, width: h * 0.62, height: h * 0.62, borderRadius: "50%", background: GREEN, boxShadow: "0 4px 10px rgba(63,158,116,0.5)", display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${checked})` }}><Ic t="check" s={h * 0.42} /></div>}
    <Sheen r={Math.min(10, h * 0.22)} />
  </div>); };
// progress ring around a working node
const Ring: React.FC<{ cx: number; cy: number; r: number; p: number; done?: boolean }> = ({ cx, cy, r, p, done }) => { const C = 2 * Math.PI * r; return (
  <svg width={980} height={560} style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
    <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(58,92,132,0.18)" strokeWidth={5} />
    <circle cx={cx} cy={cy} r={r} fill="none" stroke={done ? GREEN : CLAY} strokeWidth={5} strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - p)} transform={`rotate(-90 ${cx} ${cy})`} />
  </svg>); };
// scrolling chevron belt/rail
const Chevron: React.FC<{ x: number; y: number; w: number; h: number; lf: number; col?: string }> = ({ x, y, w, h, lf, col = "#3A5C84" }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, borderRadius: h / 2, overflow: "hidden", background: `rgba(58,92,132,0.12)` }}>
    <div style={{ position: "absolute", inset: 0, backgroundImage: `repeating-linear-gradient(115deg, ${col}66 0 7px, transparent 7px 18px)`, backgroundPositionX: `${-(lf * 2.4) % 25}px` }} />
  </div>);

// ===== S0 — HOOK: command bursts into swarm -> swarm becomes a CONVEYOR that EATS the backlog; sun dawn->dusk (3 separated bands) =====
const Hook: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const lf = f - fr(s);
  const cmdIn = over(f, fr(s) + 2, 14); const charge = ramp(lf, 16, 34); const burst = ramp(lf, 34, 58);
  const magnet = ramp(lf, 60, 84); const conv = ramp(lf, 84, 100); const sun = ramp(lf, 92, 152); const dev = ramp(lf, 100, 144);
  const cx = 490, cyB = 332; const NA = 9; const ax = (i: number) => 292 + i * 52; const ay = 312;
  const remain = Math.round((1 - dev) * 12);
  const swY = interpolate(magnet, [0, 1], [cyB, ay]);
  return (
    <Stage>
      <Bloom cx={cx} cy={magnet > 0.5 ? 362 : cyB} w={1080} h={760} color={`rgba(${Math.round(58 + burst * 150)},${Math.round(92 + sun * 36)},${Math.round(132 - sun * 66)},0.2)`} lf={lf} base={0.55 + burst * 0.2} />
      {burst > 0.02 && burst < 0.6 && [0, 1].map((k) => { const b = ramp(lf, 34 + k * 5, 58 + k * 5); return <div key={k} style={{ position: "absolute", left: cx - 190 * b, top: cyB - 190 * b, width: 380 * b, height: 380 * b, borderRadius: "50%", border: `${5 * (1 - b)}px solid ${CLAY}`, opacity: (1 - b) * 0.5 }} />; })}
      {magnet < 0.96 && <div style={{ opacity: 1 - magnet }}><Swarm cx={cx} cy={swY} rx={440 * (1 - magnet * 0.55)} ry={250 * (1 - magnet * 0.72)} n={54} p={burst} lf={lf} seed={1} size={46 * (1 - magnet * 0.28)} /></div>}
      {magnet < 0.92 && <div style={{ position: "absolute", left: cx - 78 * (1 - magnet * 0.55), top: swY - 78 * (1 - magnet * 0.55) - charge * 6, width: 156 * (1 - magnet * 0.55), height: 156 * (1 - magnet * 0.55), transform: `scale(${cmdIn * (1 + charge * 0.05 - burst * 0.1)})`, opacity: 1 - magnet }}><ClaudeMark size={156 * (1 - magnet * 0.55)} glow={0.34 + charge * 0.4} /></div>}
      <Counter cx={820} y={40} label={`×${Math.round(ramp(lf, 50, 68) * 1000).toLocaleString()}`} show={lf > 50 && magnet < 0.35} f={f} sF={fr(s) + 50} />
      {/* BAND A — day-arc (y18-120) */}
      {conv > 0.02 && (() => { const bx = sun; const px = 130 + bx * 720; const py = 120 - Math.sin(bx * Math.PI) * 76; return (<>
        <svg width={980} height={560} style={{ position: "absolute", inset: 0 }}><path d="M130 120 Q490 42 850 120" fill="none" stroke="rgba(58,92,132,0.42)" strokeWidth={3} strokeDasharray="4 9" strokeDashoffset={interpolate(conv, [0, 1], [820, 0])} /></svg>
        <div style={{ position: "absolute", left: px - 17, top: py - 17, width: 34, height: 34, borderRadius: "50%", background: grad(bx > 0.62 ? "#E0A24E" : "#E89A78", bx > 0.62 ? "#C5603C" : "#CF9544"), boxShadow: `${SH}, 0 0 ${18 + bx * 18}px rgba(220,150,80,${0.4 + bx * 0.3})` }}><Sheen r="50%" /></div>
        <div style={{ position: "absolute", left: 130, top: 16, padding: "5px 15px", borderRadius: 999, background: grad("#5C7CA8", "#3A5C84"), boxShadow: SH, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 18, letterSpacing: "0.14em", color: "#fff", opacity: conv }}>{sun > 0.84 ? "AFTERNOON" : "MONTH"}<Sheen r={999} /></div>
      </>); })()}
      {/* BAND B — conveyor + agents + backlog (y300-461) */}
      {conv > 0.02 && (<>
        <Contact cx={cx} cy={406} w={520} sx={0.85} op={0.28} />
        <Chevron x={250} y={362} w={500} h={42} lf={lf} col="#9C5A34" />
        {Array.from({ length: NA }, (_, i) => { const beam = dev > 0.05 && Math.abs(((dev * 9 * 1.3) % NA) - i) < 0.7; return (<React.Fragment key={i}>
          <Node x={ax(i)} y={ay + Math.sin((lf + i * 7) / 9) * 3} size={42} i={i} e={Math.min(1, magnet * 1.2)} mark />
          {beam && <div style={{ position: "absolute", left: ax(i) - 7, top: ay + 22, width: 14, height: 38, background: "linear-gradient(180deg, rgba(240,190,120,0.55), transparent)", clipPath: "polygon(35% 0,65% 0,100% 100%,0 100%)" }} />}
        </React.Fragment>); })}
        {Array.from({ length: 12 }, (_, i) => { if (i >= remain) return null; const e = ramp(lf, 84 + i * 1.5, 96 + i * 1.5); return <Ticket key={i} x={176} y={434 - i * 12} w={108} h={26} i={i} e={Math.min(e, conv)} rot={(rnd(i, 9) - 0.5) * 4} />; })}
        {dev > 0.05 && dev < 0.98 && [0, 1].map((k) => { const rp = (dev * 6 + k * 0.5) % 1; const rx = 260 + rp * 470; return <Ticket key={"r" + k} x={rx} y={383} w={82} h={30} i={k + 3} e={1} checked={rp > 0.55 ? ramp(rp, 0.55, 0.82) : 0} />; })}
        <div style={{ position: "absolute", left: 250, top: 452, width: 500, height: 9, borderRadius: 5, background: "rgba(58,92,132,0.14)", opacity: conv }}><div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${dev * 100}%`, borderRadius: 5, background: grad("#E0A24E", "#C5603C") }} /></div>
      </>)}
      <Counter cx={836} y={232} label={Math.round(dev * 1248).toLocaleString()} show={lf > 100} f={f} sF={fr(s) + 100} w={150} />
      {remain <= 0 && conv > 0.5 && <div style={{ position: "absolute", left: 176 - 44, top: 360, width: 88, height: 88, borderRadius: "50%", background: GREEN, boxShadow: "0 8px 18px rgba(63,158,116,0.5)", display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${over(f, fr(s) + 144, 10)})` }}><Ic t="check" s={46} /></div>}
      <Dust lf={lf} n={5} seed={1} />
    </Stage>
  );
};

// ===== S1 — SHIFT: throughput console — 1x single-file grind -> 6-wide parallel array drain (fixed zones) =====
const Shift: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const lf = f - fr(s);
  const guides = ramp(lf, 2, 16); const hero = over(f, fr(s) + 40, 14); const grind = ramp(lf, 55, 90);
  const split = ramp(lf, 90, 106); const fan = ramp(lf, 106, 130); const flood = ramp(lf, 130, 151); const settle = ramp(lf, 151, 160);
  const grid = [[400, 188], [600, 188], [800, 188], [400, 358], [600, 358], [800, 358]];
  const clearedQ = Math.floor(ramp(lf, 60, 90) * 1.8) + Math.round(flood * 6);
  const queued = Math.max(0, Math.round(ramp(lf, 16, 38) * 6) - clearedQ);
  const tps = flood > 0.3 ? "6x" : "1x";
  const leadX = interpolate(split, [0, 1], [600, grid[0][0]]), leadY = interpolate(split, [0, 1], [250, grid[0][1]]);
  return (
    <Stage>
      <Bloom cx={split > 0.4 ? 600 : 600} cy={275} w={1040} h={780} color={`rgba(${Math.round(58 + flood * 90)},${Math.round(92 + flood * 30)},132,0.18)`} lf={lf} base={0.5 + (hero + flood) * 0.14} />
      {/* zone guides (zero-fill) + labels */}
      <div style={{ position: "absolute", left: 68, top: 72, width: 184, height: 420, borderRadius: 18, border: `2px dashed rgba(210,114,78,${0.16 * guides})` }} />
      <div style={{ position: "absolute", left: 95, top: 48, width: 130, height: 30, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 999, background: grad("#5C7CA8", "#3A5C84"), boxShadow: SH, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 15, letterSpacing: "0.16em", color: "#fff", opacity: guides }}>QUEUE<Sheen r={999} /></div>
      {/* queue tickets */}
      {Array.from({ length: 6 }, (_, i) => { if (i >= queued) return null; const e = ramp(lf, 16 + i * 3.5, 30 + i * 3.5); return <Ticket key={i} x={160} y={112 + i * 60} w={150} h={48} i={3} e={e} col={["#5C7CA8", "#3A5C84"]} />; })}
      <Counter cx={160} y={500} label={`${queued}`} show={lf > 18} f={f} sF={fr(s) + 18} w={68} />
      <Counter cx={838} y={12} label={tps} show={lf > 42} f={f} sF={fr(s) + 42} w={92} color={tps === "6x" ? ["#56B488", "#3F9E74"] : grind > 0.1 && split < 0.4 ? ["#D2624C", "#A8392B"] : ["#5C7CA8", "#3A5C84"]} />
      {/* connector rail */}
      {split < 0.5 && <Chevron x={252} y={244} w={288} h={12} lf={lf} />}
      {/* ZONE-W: lone hero before split */}
      {split < 0.5 && grind > 0.05 && grind < 0.95 && (() => { const rp = (grind * 1.7) % 1; return <Ticket x={252 + rp * 288} y={250} w={116} h={42} i={3} e={1} col={["#5C7CA8", "#3A5C84"]} checked={rp > 0.85 ? 1 : 0} />; })()}
      {split < 0.5 && grind > 0.05 && <Ring cx={600} cy={250} r={78} p={ramp(lf, 60, 88)} done={ramp(lf, 84, 90) > 0.5} />}
      {/* nodes: lead hero (morphs to node 1) + 5 siblings */}
      {grid.map((g, i) => { const lead = i === 0; const e = lead ? hero : over(f, fr(s) + 92 + i * 2.4, 12); if (e <= 0.02) return null; const gx = lead ? leadX : g[0], gy = lead ? leadY : g[1]; const sz = lead ? 116 : 100; const ring = flood > 0.02 && split > 0.6;
        return (<React.Fragment key={i}>
          <Contact cx={gx} cy={gy + (sz / 2) + 8} w={sz * 0.92} sx={0.8} op={0.24} />
          <div style={{ position: "absolute", left: gx - sz / 2, top: gy - sz / 2 + Math.sin((lf + i * 11) / 12) * 3, width: sz, height: sz, transform: `scale(${e})`, opacity: Math.min(1, e * 1.2) }}>{lead ? <ClaudeMark size={sz} glow={0.34} /> : <Node x={sz / 2} y={sz / 2} size={sz} i={i} e={1} mark />}</div>
          {fan > 0.02 && split > 0.6 && <svg width={980} height={560} style={{ position: "absolute", inset: 0 }}><line x1={160} y1={470} x2={g[0]} y2={g[1] + 58} stroke={CLAY} strokeWidth={3} strokeOpacity={0.38} strokeDasharray={520} strokeDashoffset={520 * (1 - ramp(lf, 106 + i * 3, 128 + i * 3))} /></svg>}
          {ring && <Ring cx={g[0]} cy={g[1]} r={62} p={ramp(lf, 130, 148)} done={ramp(lf, 145 + i, 150 + i) > 0.5} />}
        </React.Fragment>); })}
      {/* DONE bar (HUD-bottom) */}
      {flood > 0.05 && <div style={{ position: "absolute", left: 300, top: 512, width: 610, height: 30, display: "flex", gap: 6 }}>{Array.from({ length: 6 }, (_, i) => { const fc = ramp(lf, 138 + i * 2, 148 + i * 2); return <div key={i} style={{ flex: 1, borderRadius: 8, background: fc > 0.5 ? grad("#56B488", "#3F9E74") : "rgba(58,92,132,0.16)", display: "flex", alignItems: "center", justifyContent: "center", opacity: flood }}>{fc > 0.5 && <Ic t="check" s={16} />}</div>; })}</div>}
      {settle > 0.05 && <div style={{ position: "absolute", left: 0, right: 0, top: 548, textAlign: "center", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 19, letterSpacing: "0.22em", color: SLATE, opacity: settle }}>PARALLEL</div>}
      <Dust lf={lf} n={5} seed={2} />
    </Stage>
  );
};

// ===== S2 — SETUP: orchestration forge — job in -> self-writing plan -> hundred-agent swarm -> peer-check -> converge (4 zones) =====
const PLAN_IC = ["migrate", "grid", "broom", "bolt", "check"];
const Setup: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const lf = f - fr(s);
  const rail = ramp(lf, 2, 15); const coreIn = over(f, fr(s) + 4, 12);
  const jobIn = over(f, fr(s) + 16, 14); const eat = ramp(lf, 48, 63);
  const board = ramp(lf, 66, 80); const swarm = ramp(lf, 120, 168); const cnt = Math.round(ramp(lf, 124, 178) * 248);
  const peer = ramp(lf, 186, 226); const conv = ramp(lf, 232, 256);
  const boardDim = ramp(lf, 120, 134); // recede to legend
  const coreX = 185, coreY = 280; const swCx = 720, swCy = 268;
  // ~78 swarm node positions (disc)
  const SN = 78; const np = (i: number) => { const a = rnd(i, 5) * 6.283, r = Math.sqrt(rnd(i, 6)); return { x: swCx + Math.cos(a) * 188 * r, y: swCy + Math.sin(a) * 184 * r }; };
  return (
    <Stage>
      <Bloom cx={conv > 0.3 ? swCx : swarm > 0.3 ? swCx : board > 0.3 ? 340 : coreX} cy={conv > 0.3 ? swCy : 268} w={760} h={620} color={`rgba(210,114,78,${0.12 + (board + swarm * 0.4) * 0.05})`} lf={lf} base={0.5 + (swarm + conv) * 0.16} />
      {/* console rail */}
      <svg width={980} height={560} style={{ position: "absolute", inset: 0 }}><line x1={40} y1={500} x2={940} y2={500} stroke="rgba(58,92,132,0.3)" strokeWidth={2} strokeDasharray="3 7" strokeDashoffset={interpolate(rail, [0, 1], [900, 0])} /></svg>
      {/* persistent core (Zone A/B seam), breathes; dims after plan */}
      <div style={{ position: "absolute", left: coreX - 48, top: coreY - 48, width: 96, height: 96, transform: `scale(${coreIn * (1 + Math.sin(lf / 16) * 0.02)})`, opacity: 1 - boardDim * 0.55 }}><ClaudeMark size={96} glow={0.34 + (eat) * 0.4} /></div>
      {/* BEAT 1 — JOB slab slides down ZONE A, absorbed by core */}
      {eat < 1 && (() => { const drop = over(f, fr(s) + 16, 16); const y = interpolate(drop, [0, 1], [-140, 200]); const k = eat; return (
        <div style={{ position: "absolute", left: interpolate(k, [0, 1], [105, coreX]) - (75 - k * 67), top: interpolate(k, [0, 1], [y, coreY]) - (95 - k * 87), width: 150 - k * 134, height: 190 - k * 170, borderRadius: 16, background: grad("#5C7CA8", "#3A5C84"), boxShadow: SH, opacity: jobIn * (1 - k * 0.95), transform: `rotate(${-k * 14}deg)` }}>
          <div style={{ position: "absolute", top: 16, left: 0, right: 0, textAlign: "center", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 22, letterSpacing: "0.14em", color: "rgba(255,255,255,0.92)", opacity: 1 - k }}>JOB</div>
          <div style={{ position: "absolute", top: 56, left: 16, right: 16, display: "flex", flexDirection: "column", gap: 9, opacity: 1 - k }}>{[0.85, 0.6, 0.72, 0.5].map((w, i) => <div key={i} style={{ height: 8, width: `${w * 100}%`, borderRadius: 99, background: "rgba(255,255,255,0.45)" }} />)}</div><Sheen r={16} />
        </div>); })()}
      {eat > 0.4 && eat < 1 && <div style={{ position: "absolute", left: coreX - 60 * eat, top: coreY - 60 * eat, width: 120 * eat, height: 120 * eat, borderRadius: "50%", border: `${3 * (1 - eat)}px solid ${CLAY}`, opacity: (1 - eat) * 0.6 }} />}
      {/* BEAT 2 — self-writing PLAN board (Zone B), recedes to legend after */}
      {board > 0.02 && (<div style={{ position: "absolute", left: 214, top: 84, width: 248, height: 372, borderRadius: 16, background: grad("#FBF7EF", "#EFEADF"), boxShadow: SH, transform: `scale(${(0.96 + board * 0.04) * (1 - boardDim * 0.2)}) translateX(${-boardDim * 8}px)`, opacity: board * (1 - boardDim * 0.62) }}>
        <div style={{ position: "absolute", top: 18, left: 22, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 14, letterSpacing: "0.16em", color: SLATE }}>PLAN</div>
        {[0, 1, 2, 3, 4].map((i) => { const rt = 78 + i * 13; const w = ramp(lf, rt, rt + 11); const doneRow = lf > rt + 13; const caret = lf > rt && lf < rt + 13 && Math.floor(lf / 4) % 2 === 0; return (
          <div key={i} style={{ position: "absolute", top: 56 + i * 60, left: 18, right: 18, height: 48, borderRadius: 10, background: w > 0.05 ? "rgba(255,255,255,0.55)" : "transparent", display: "flex", alignItems: "center", gap: 10, padding: "0 10px", opacity: 0.4 + w * 0.6 }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: grad(doneRow ? "#56B488" : "#DDA85C", doneRow ? "#3F9E74" : "#CF9544"), display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 800, fontSize: 14, color: "#fff" }}>{`0${i + 1}`}</div>
            <div style={{ flex: 1, height: 8, borderRadius: 99, background: w > 0.2 ? grad("#4A6E9C", "#5C7CA8") : "rgba(58,92,132,0.16)", transform: `scaleX(${0.15 + w * 0.85})`, transformOrigin: "left" }} />
            {caret && <div style={{ width: 3, height: 22, background: CLAY }} />}
            <div style={{ width: 30, height: 30, borderRadius: 8, background: w > 0.3 ? grad("#6E8FBF", "#3A5C84") : "rgba(58,92,132,0.14)", display: "flex", alignItems: "center", justifyContent: "center" }}><Ic t={PLAN_IC[i]} s={18} /></div>
          </div>); })}
        <Sheen r={16} />
      </div>)}
      {/* BEAT 3 — task seeds stream to Zone C, swarm cascades; Counter ticks */}
      {swarm > 0.02 && Array.from({ length: SN }, (_, i) => { const e = ramp(lf, 120 + i * 0.7, 134 + i * 0.7); if (e <= 0.02) return null; const p = np(i); const bob = Math.sin((lf + i * 9) / 14) * 3; const pulse = peer < 0.1 ? 0.85 + 0.15 * Math.sin((lf - i * 2) / 6) : 1; const ck = peer > 0.02 && lf > 188 + ((p.x - 532) / 376 + (p.y - 84) / 368) * 38; return (
        <div key={i} style={{ position: "absolute", left: p.x - 15, top: p.y - 15 + bob, width: 30, height: 30 }}>
          <Node x={15} y={15} size={28 * pulse} i={i} e={e} />
          {ck && <div style={{ position: "absolute", top: -6, right: -6, width: 16, height: 16, borderRadius: "50%", background: GREEN, display: "flex", alignItems: "center", justifyContent: "center" }}><Ic t="check" s={10} /></div>}
        </div>); })}
      {/* peer-check arcs (inside Zone C lattice gaps) */}
      {peer > 0.05 && conv < 0.4 && <svg width={980} height={560} style={{ position: "absolute", inset: 0 }}>{Array.from({ length: 14 }, (_, i) => { const a = np(i * 3), b = np(i * 3 + 5); const e = ramp(lf, 188 + i * 2.4, 202 + i * 2.4); if (e <= 0) return null; return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="rgba(58,92,132,0.4)" strokeWidth={2} strokeDasharray="4 5" strokeDashoffset={interpolate(e, [0, 1], [50, 0])} opacity={e * (1 - conv * 2)} />; })}</svg>}
      {/* Zone D counter -> verified */}
      {swarm > 0.05 && <Counter cx={868} y={26} label={peer > 0.5 ? `${Math.round(Math.min(1, peer * 1.3) * 100)}%` : cnt.toLocaleString()} show={true} f={f} sF={fr(s) + 124} w={140} color={peer > 0.5 ? ["#56B488", "#3F9E74"] : ["#5C7CA8", "#3A5C84"]} />}
      {/* BEAT 5 — CONVERGE into one hero */}
      {conv > 0.02 && (<>
        <Contact cx={swCx} cy={swCy + 78} w={150} sx={0.85} op={0.32} />
        <div style={{ position: "absolute", left: swCx - 62, top: swCy - 62, width: 124, height: 124, borderRadius: 30, background: grad("#7FB48E", "#3F9E74"), boxShadow: `${SH}, 0 0 40px rgba(63,158,116,0.45)`, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${over(f, fr(s) + 232, 14)})` }}><Ic t="check" s={62} /><Sheen r={30} /><Glint r={30} t={ramp(lf, 234, 252)} /></div>
      </>)}
      <Dust lf={lf} n={6} seed={3} />
    </Stage>
  );
};

// ===== S3 — CAVEAT: usage gauge spikes -> CAP slams in -> holds, swarm keeps running =====
const Caveat: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const lf = f - fr(s);
  const inn = over(f, fr(s) + 2, 12); const burn = ramp(lf, 10, 44); const cap = over(f, fr(s) + 46, 12); const held = ramp(lf, 58, 90);
  const cx = 490, cy = 250; const level = burn * (1 - held * 0.32); // climbs then capped
  return (
    <Stage>
      <Bloom cx={cx} cy={cy} w={1020} h={760} color={`rgba(${Math.round(196 - held * 138)},${Math.round(74 + held * 75)},${Math.round(58 + held * 74)},0.2)`} lf={lf} />
      {/* gauge frame (a screen/device -> container allowed) */}
      <Contact cx={cx} cy={cy + 150} w={360} sx={0.8} op={0.3} />
      <div style={{ position: "absolute", left: cx - 200, top: cy - 130, width: 400, height: 250, borderRadius: 24, background: grad("#FBF7EF", "#EFEADF"), boxShadow: SH, transform: `scale(${inn})`, overflow: "hidden" }}>
        {/* fill bar */}
        <div style={{ position: "absolute", left: 0, bottom: 0, right: 0, height: `${level * 100}%`, background: held > 0.2 ? grad("#E0A24E", "#CF9544") : grad("#D2624C", "#A8392B"), transition: "none" }}><div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, rgba(255,255,255,0.12), transparent)" }} /></div>
        {/* cap line */}
        {cap > 0.02 && <div style={{ position: "absolute", left: 0, right: 0, top: `${(1 - 0.68) * 100}%`, height: 8, background: SLATE, boxShadow: "0 2px 8px rgba(20,26,45,0.4)", transform: `scaleX(${cap})` }}><div style={{ position: "absolute", right: 12, top: -34, width: 64, height: 30, borderRadius: 8, background: grad("#5C7CA8", "#3A5C84"), display: "flex", alignItems: "center", justifyContent: "center", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 15, letterSpacing: "0.1em", color: "#fff" }}>CAP</div></div>}
        {/* running agents inside, under the cap */}
        {held > 0.05 && [0, 1, 2, 3].map((i) => <div key={i} style={{ position: "absolute", left: 40 + i * 88, bottom: 18, width: 30, height: 30, borderRadius: 9, background: grad(...nodeCol(i)), opacity: held, transform: `translateY(${Math.sin((lf + i * 8) / 7) * 4}px)`, boxShadow: SH }}><Sheen r={9} /></div>)}
        <Sheen r={24} />
      </div>
      {/* burning sparks while spiking */}
      {burn > 0.1 && held < 0.4 && [0, 1, 2].map((i) => { const a = -0.4 - i * 0.5; const p = (lf % 18) / 18; return <div key={i} style={{ position: "absolute", left: cx + Math.cos(a) * (60 + p * 70), top: cy - 70 - p * 80, fontSize: 20, color: RED, opacity: 1 - p }}>✦</div>; })}
      <Dust lf={lf} n={5} seed={4} />
    </Stage>
  );
};

// ===== S4 — POINT-IT-AT: 3 jobs devoured by the swarm -> done before lunch =====
const PointAt: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const lf = f - fr(s);
  const jobs = [{ t: 8, ic: "migrate", c: ["#4A6E9C", "#34507A"], label: "" }, { t: 56, ic: "broom", c: ["#56B488", "#3F9E74"], label: "1,000" }, { t: 104, ic: "grid", c: ["#E08A66", "#C5603C"], label: "500" }];
  const clock = ramp(lf, 158, 200); const cx = 490, cy = 240;
  return (
    <Stage>
      <Bloom cx={cx} cy={cy} w={1060} h={800} color={`rgba(${Math.round(58 + clock * 150)},${Math.round(92 + clock * 57)},${Math.round(132 - clock * 60)},0.2)`} lf={lf} base={0.6 + clock * 0.2} />
      {/* three job targets in a row, each devoured by a mini-swarm then ✓ */}
      {jobs.map((j, i) => { const inn = over(f, fr(s) + j.t, 12); const hit = ramp(lf, j.t + 14, j.t + 34); const done = lf > j.t + 30; const jx = cx + (i - 1) * 290; if (inn <= 0.02) return null; return (
        <React.Fragment key={i}>
          <Contact cx={jx} cy={cy + 110} w={170} sx={0.8} op={0.28} />
          <div style={{ position: "absolute", left: jx - 85, top: cy - 90, width: 170, height: 180, borderRadius: 22, background: grad("#FFFDF8", "#F2EEE4"), boxShadow: SH, transform: `scale(${inn}) rotate(${(1 - inn) * -6}deg)`, opacity: 1 - hit * 0.12 }}>
            <div style={{ position: "absolute", top: 22, left: 55, width: 60, height: 60, borderRadius: 16, background: grad(j.c[0], j.c[1]), display: "flex", alignItems: "center", justifyContent: "center" }}><Ic t={j.ic} s={34} /></div>
            <div style={{ position: "absolute", top: 96, left: 18, right: 18, display: "flex", flexDirection: "column", gap: 8 }}>{[0.8, 0.55].map((w, k) => <div key={k} style={{ height: 8, width: `${w * 100}%`, borderRadius: 99, background: "rgba(58,92,132,0.22)" }} />)}</div>
            {j.label && <div style={{ position: "absolute", top: 26, right: -10, padding: "4px 12px", borderRadius: 999, background: grad("#5C7CA8", "#3A5C84"), fontFamily: fraunces.fontFamily, fontWeight: 800, fontSize: 22, color: "#fff", boxShadow: SH }}>{j.label}</div>}
            <Sheen r={22} /><Glint r={22} t={ramp(lf, j.t, j.t + 16)} />
            {done && <div style={{ position: "absolute", top: -16, right: -14, width: 52, height: 52, borderRadius: "50%", background: GREEN, boxShadow: "0 8px 18px rgba(63,158,116,0.5)", display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${over(f, fr(s) + j.t + 30, 9)})` }}><Ic t="check" s={28} /></div>}
          </div>
          {/* mini-swarm devouring */}
          {hit > 0.02 && hit < 1 && <Swarm cx={jx} cy={cy} rx={120} ry={110} n={12} p={hit} lf={lf} seed={i * 3 + 7} size={20} />}
        </React.Fragment>); })}
      {/* clock barely moves */}
      {clock > 0.02 && <div style={{ position: "absolute", left: cx - 56, top: 430, width: 112, height: 112, borderRadius: "50%", background: grad("#FBF7EF", "#EFEADF"), boxShadow: SH, transform: `scale(${over(f, fr(s) + 158, 12)})`, opacity: clock }}>
        <div style={{ position: "absolute", inset: 10, borderRadius: "50%", border: "3px solid rgba(58,92,132,0.25)" }} />
        <div style={{ position: "absolute", left: "50%", top: "50%", width: 4, height: 30, marginLeft: -2, marginTop: -30, borderRadius: 2, background: SLATE, transformOrigin: "bottom center", transform: `rotate(${clock * 30}deg)` }} />
        <div style={{ position: "absolute", left: "50%", top: "50%", width: 4, height: 38, marginLeft: -2, marginTop: -38, borderRadius: 2, background: CLAY, transformOrigin: "bottom center", transform: `rotate(${clock * 8}deg)` }} />
        <div style={{ position: "absolute", left: "50%", top: "50%", width: 10, height: 10, marginLeft: -5, marginTop: -5, borderRadius: "50%", background: SLATE }} />
        <Sheen r="50%" />
      </div>}
      <Dust lf={lf} n={6} seed={6} />
    </Stage>
  );
};

// ===== S5 — CTA: swarm condenses to one tile + stamp "SWARM" =====
const CTA: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const lf = f - fr(s); if (lf < 0) return null;
  const cardIn = over(f, fr(s) + 2, 14); const condense = ramp(lf, 6, 30); const ink = over(f, fr(s) + 28, 12); const sent = over(f, fr(s) + 42, 12);
  const cx = 490, cy = 280;
  return (<>
    <Stage>
      <Bloom cx={cx} cy={246} w={1020} h={780} color="rgba(210,114,78,0.2)" lf={lf} base={0.7} />
      {/* swarm condensing back into the tile */}
      {condense < 1 && Array.from({ length: 18 }, (_, i) => { const ra = rnd(i, 9) * Math.PI * 2, rr = Math.sqrt(rnd(i, 10)); const sx = cx + Math.cos(ra) * 360 * rr, sy = cy + Math.sin(ra) * 200 * rr; const x = sx + (cx - sx) * condense, y = sy + (cy - 120 - sy) * condense; return <Node key={i} x={x} y={y} size={24 * (1 - condense * 0.4)} i={i} e={1 - condense} />; })}
      {/* comment card */}
      <Contact cx={cx} cy={cy + 150} w={460} sx={0.8} op={0.3} />
      <div style={{ position: "absolute", left: cx - 250, top: cy - 140, width: 500, height: 290, borderRadius: 14, background: grad("#FFFDF8", "#F2EEE4"), boxShadow: "inset 0 2px 10px rgba(34,30,24,0.12), 0 18px 40px rgba(20,26,45,0.24)", transform: `rotate(-3deg) scale(${cardIn})`, padding: 30 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}><div style={{ width: 56, height: 56 }}><ClaudeMark size={56} glow={0.34} /></div><div style={{ flex: 1, height: 12, borderRadius: 99, background: grad("#5C7CA8", "#3A5C84") }} /></div>
        {["#4A6E9C", "#CF9544", "#3F9E74"].map((c, i) => <div key={i} style={{ height: 9, width: `${[80, 60, 45][i]}%`, borderRadius: 99, background: c, opacity: 0.5, marginBottom: 12 }} />)}
        {ink > 0.02 && <div style={{ position: "absolute", left: 96, top: 150, transform: `rotate(-3deg) scale(${ink})` }}><span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 78, letterSpacing: "0.03em", color: "rgba(197,96,60,0.94)" }}>SWARM</span></div>}
        {sent > 0.02 && <div style={{ position: "absolute", bottom: -16, right: -14, width: 56, height: 56, borderRadius: "50%", background: GREEN, boxShadow: "0 8px 18px rgba(63,158,116,0.5)", display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${sent})` }}><Ic t="check" s={32} /></div>}
        <Sheen r={14} />
      </div>
      <Dust lf={lf} n={6} seed={7} />
    </Stage>
    <div style={{ position: "absolute", top: 1138, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 16, opacity: eOut(f, fr(s) + 6, 14) }}>
      <div style={{ position: "relative", transform: `scale(${1 + Math.sin(lf / 7) * 0.025})`, padding: "22px 50px", borderRadius: 999, background: grad("#E08A66", "#C5603C"), boxShadow: `${SH}, 0 0 44px rgba(210,114,78,0.42)`, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 56, color: "#fff", display: "flex", alignItems: "center", gap: 14, whiteSpace: "nowrap" }}>💬 Comment “SWARM”<Sheen r={999} /></div>
      <div style={{ fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 600, fontSize: 44, color: INK, textShadow: "0 2px 16px rgba(236,233,226,0.95)" }}>and I’ll send you the whole setup</div>
    </div>
  </>);
};

// ===== audio / ambience / bg =====
const Sfx: React.FC<{ at: number; src: string; vol?: number }> = ({ at, src, vol = 0.4 }) => (<Sequence from={fr(at)} durationInFrames={fr(4)}><Audio src={staticFile(`sfx/${src}`)} volume={vol} /></Sequence>);
const SfxTrack: React.FC = () => (<>
  <Sfx at={L[0]} src="riser.wav" vol={0.3} /><Sfx at={L[0]} src="swooshup.wav" vol={0.3} /><Sfx at={L[0] + 1.2} src="boom.wav" vol={0.42} />{[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <Sfx key={i} at={L[0] + 1.25 + i * 0.07} src="blip3.wav" vol={0.16} />)}<Sfx at={L[0] + 3.3} src="swooshdn.wav" vol={0.28} />
  <Sfx at={L[1] - 0.3} src="swish.wav" vol={0.24} />{[0, 1, 2, 3, 4].map((i) => <Sfx key={i} at={L[1] + 2.4 + i * 0.18} src="thock.wav" vol={0.2} />)}
  <Sfx at={L[2] - 1.4} src="metal_riser.wav" vol={0.8} /><Sfx at={L[2] + 0.2} src="snap.wav" vol={0.32} />{[0, 1, 2].map((i) => <Sfx key={i} at={L[2] + 1.6 + i * 0.27} src="blip2.wav" vol={0.22} />)}<Sfx at={L[2] + 3.4} src="data.wav" vol={0.26} /><Sfx at={L[2] + 5.4} src="resolve.wav" vol={0.26} />
  <Sfx at={L[3] + 0.3} src="screech.wav" vol={0.2} /><Sfx at={L[3] + 1.5} src="snap.wav" vol={0.34} />
  {[0, 1, 2].map((i) => <Sfx key={i} at={L[4] + 0.5 + i * 1.6} src="impact.wav" vol={0.3} />)}{[0, 1, 2].map((i) => <Sfx key={i} at={L[4] + 1.4 + i * 1.6} src="resolve.wav" vol={0.26} />)}<Sfx at={L[4] + 5.4} src="tick.wav" vol={0.3} />
  <Sfx at={L[5] + 0.9} src="thock.wav" vol={0.36} /><Sfx at={L[5] + 1.4} src="sparkle.wav" vol={0.3} />
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
    <AbsoluteFill style={{ opacity: 0.05, mixBlendMode: "multiply" }}><svg width="100%" height="100%"><filter id="ppS"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves={2} stitchTiles="stitch" /></filter><rect width="100%" height="100%" filter="url(#ppS)" /></svg></AbsoluteFill>
    <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 42%, rgba(0,0,0,0) 58%, rgba(86,62,34,0.06) 100%)" }} />
  </AbsoluteFill>);
};

const L = [0.0, 5.64, 10.96, 19.6, 22.67, 29.69];

// hero hook-header (raycfu-style, opening only) — mute-readable hook as a title
const HeroHeader: React.FC = () => {
  const f = useCurrentFrame();
  if (f > 110) return null;
  const appear = eOut(f, 0, 9);
  const out = eOut(f, 94, 13);
  const op = appear * (1 - out);
  const ty = (1 - appear) * 22 - out * 14;
  const sc = 0.965 + appear * 0.035;
  const l2 = eOut(f, 9, 9);
  const l3 = eOut(f, 16, 9);
  return (
    <div style={{ position: "absolute", top: 318, left: 74, right: 74, opacity: op, transform: `translateY(${ty}px) scale(${sc})`, transformOrigin: "left top", zIndex: 60 }}>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 64, lineHeight: 1.05, letterSpacing: "-0.03em", color: INK, textShadow: "0 2px 18px rgba(236,233,226,0.96)" }}>
        <div>1 <span style={{ color: CLAY }}>Claude</span> command.</div>
        <div style={{ opacity: l2 }}><span style={{ color: CLAY }}>1,000</span> agents.</div>
        <div style={{ opacity: l3 }}>A month of work by lunch.</div>
      </div>
    </div>
  );
};

export const ClaudeSwarmReel: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 16, 28], [1.0, 1.09, 1.0], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  return (
    <AbsoluteFill style={{ backgroundColor: "#EFE8D9", fontFamily: inter.fontFamily }}>
      <Audio src={staticFile("vo_swarm.wav")} />
      <Audio src={staticFile("ados_bed_loud.wav")} volume={0.18} />
      <SfxTrack />
      <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "50% 46%" }}>
        <Background />
        <Ambient />
        <Scene s={L[0]} e={L[1]}><Hook s={L[0]} /></Scene>
        <Scene s={L[1]} e={L[2]}><Shift s={L[1]} /></Scene>
        <Scene s={L[2]} e={L[3]}><Setup s={L[2]} /></Scene>
        <Scene s={L[3]} e={L[4]}><Caveat s={L[3]} /></Scene>
        <Scene s={L[4]} e={L[5]}><PointAt s={L[4]} /></Scene>
        <CTA s={L[5]} />
        <HeroHeader />
        <Captions />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
