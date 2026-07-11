import React from "react";
import { AbsoluteFill, Audio, Easing, Img, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { fraunces, frauncesItalic, inter } from "./fonts";
import wordsData from "./data/words_brain.json";

/** ClaudeBrainReel — "Claude Code is now your second brain" (Karpathy method). Real GitHub screens + Nick-Saraev annotations + editorial style. */
const CREAM = "#ECE9E2", INK = "#1A1813", SLATE = "#3A5C84", SLATE2 = "#4C7BB0", CLAY = "#D2724E", AMBER = "#CF9544", GREEN = "#3F9E74", MUTE = "#9A968B", RED = "#C44A3A", GH = "#0D1117";
const FPS = 30; const fr = (s: number) => s * FPS; const CX = 540;
const eOut = (f: number, sF: number, d = 10) => interpolate(f, [sF, sF + d], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
const ramp = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const over = (f: number, sF: number, d = 12) => interpolate(f, [sF, sF + d * 0.5, sF + d], [0, 1.12, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
const eio = (f: number, a: number, b: number, va: number, vb: number) => interpolate(f, [a, b], [va, vb], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
const grad = (a: string, b: string) => `linear-gradient(158deg, ${a} 0%, ${b} 100%)`;
const CLAUDE_PATH = "m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z";
const SH = "inset 0 1.5px 0 rgba(255,255,255,0.5), 0 2px 4px rgba(34,30,24,0.22), 0 14px 30px rgba(34,30,24,0.22), 0 40px 74px rgba(20,26,45,0.30)";
const IMSH = "0 14px 30px rgba(40,32,20,0.26), 0 4px 10px rgba(40,32,20,0.14)";
const Sheen: React.FC<{ r: number | string; o?: number }> = ({ r, o = 0.3 }) => (<div style={{ position: "absolute", inset: 0, borderRadius: r, background: `linear-gradient(125deg, rgba(255,255,255,${o}) 0%, rgba(255,255,255,0) 32%)`, pointerEvents: "none" }} />);
const Bloom: React.FC<{ cx: number; cy: number; w: number; color: string; lf: number; base?: number }> = ({ cx, cy, w, color, lf, base = 0.55 }) => (<div style={{ position: "absolute", left: cx - w / 2, top: cy - w / 2, width: w, height: w, borderRadius: "50%", background: `radial-gradient(circle at 50% 46%, ${color} 0%, transparent 62%)`, opacity: base + Math.sin(lf / 9) * 0.18, pointerEvents: "none" }} />);
const ClaudeMark: React.FC<{ size: number; glow?: number }> = ({ size, glow = 0.4 }) => (
  <div style={{ position: "relative", width: size, height: size, borderRadius: size * 0.28, background: grad("#E08A66", "#C5603C"), boxShadow: `${SH}, 0 0 ${Math.round(size * 0.34)}px rgba(210,114,78,${glow})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
    <svg viewBox="0 0 24 24" width={size * 0.58} height={size * 0.58}><path fill="#F6EFE6" d={CLAUDE_PATH} /></svg><Sheen r={size * 0.28} /></div>);
const Background: React.FC = () => { const f = useCurrentFrame(); const d = Math.sin(f / 100) * 5;
  return (<AbsoluteFill style={{ background: "radial-gradient(120% 90% at 50% 8%, #F3F1EB 0%, #ECE9E2 46%, #E4E0D6 100%)" }}>
    <div style={{ position: "absolute", inset: -40, opacity: 0.5, backgroundImage: "linear-gradient(rgba(58,92,132,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(58,92,132,0.05) 1px, transparent 1px)", backgroundSize: "62px 62px", transform: `translateY(${d}px)` }} /></AbsoluteFill>); };

// ===== "second brain" knowledge-graph visual (interconnected note nodes) =====
const TAU = Math.PI * 2; const G_CX = 460, G_CY = 442;
const gnode = (ring: number, idx: number, count: number, r: number, label: string, big: boolean) => { const ang = -Math.PI / 2 + (idx / count) * TAU + ring * 0.35; const jit = Math.sin(idx * 2.3 + ring * 1.7) * 16; return { x: G_CX + Math.cos(ang) * (r + jit), y: G_CY + Math.sin(ang) * (r + jit), label, big, ring }; };
const G_INNER = ["pricing call", "meeting notes", "transcript", "product idea", "roadmap", "research"].map((l, i) => gnode(1, i, 6, 198, l, true));
const G_MID = Array.from({ length: 8 }, (_, i) => gnode(2, i, 8, 318, ["note", "", "call", "", "doc", "", "todo", ""][i], false));
const G_OUTER = Array.from({ length: 10 }, (_, i) => gnode(3, i, 10, 412, "", false));
const G_NODES = [...G_INNER, ...G_MID, ...G_OUTER];
const G_EDGES: number[][] = [];
G_INNER.forEach((n) => G_EDGES.push([G_CX, G_CY, n.x, n.y]));
G_INNER.forEach((n, i) => { G_EDGES.push([n.x, n.y, G_MID[(i + 1) % 8].x, G_MID[(i + 1) % 8].y]); G_EDGES.push([n.x, n.y, G_MID[(i + 5) % 8].x, G_MID[(i + 5) % 8].y]); });
G_MID.forEach((n, i) => { G_EDGES.push([n.x, n.y, G_OUTER[i % 10].x, G_OUTER[i % 10].y]); G_EDGES.push([n.x, n.y, G_OUTER[(i + 3) % 10].x, G_OUTER[(i + 3) % 10].y]); });
G_EDGES.push([G_INNER[0].x, G_INNER[0].y, G_INNER[2].x, G_INNER[2].y], [G_INNER[3].x, G_INNER[3].y, G_INNER[5].x, G_INNER[5].y]);
const NCOL = [SLATE, CLAY, GREEN, AMBER];
const BrainGraph: React.FC<{ lf: number; rv?: number }> = ({ lf, rv = 1 }) => {
  const float = (i: number) => Math.sin(lf / 26 + i) * 5;
  return (<div style={{ position: "relative", width: 920, height: 884 }}>
    <div style={{ position: "absolute", left: G_CX - 250, top: G_CY - 250, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(210,114,78,0.20) 0%, transparent 64%)", opacity: 0.7 + Math.max(0, Math.sin(lf / 9)) * 0.3 }} />
    <svg width={920} height={884} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
      <defs><linearGradient id="eg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={SLATE} stopOpacity="0.6" /><stop offset="1" stopColor={GREEN} stopOpacity="0.35" /></linearGradient></defs>
      {G_EDGES.map((e, i) => { const len = Math.hypot(e[2] - e[0], e[3] - e[1]); const dr = Math.max(0, Math.min(1, (rv - (i / G_EDGES.length) * 0.45) / 0.45));
        return <line key={i} x1={e[0]} y1={e[1]} x2={e[2]} y2={e[3]} stroke="url(#eg)" strokeWidth={2.4} strokeDasharray={len} strokeDashoffset={len * (1 - dr)} opacity={0.6} />; })}
      {/* brain-firing pulse rings from the hub */}
      {[0, 1, 2].map((k) => { if (rv < 0.85) return null; const rt = ((lf / 56 + k * 0.34) % 1); return <circle key={`ring${k}`} cx={G_CX} cy={G_CY} r={36 + rt * 412} fill="none" stroke={k === 1 ? GREEN : CLAY} strokeWidth={3.5} opacity={(1 - rt) * 0.32} />; })}
      {[0, 7, 14, 22, 3, 18, 11, 26].map((ei, k) => { const e = G_EDGES[ei % G_EDGES.length]; const t = ((lf / 26 + k * 0.18) % 1); if (rv < 0.9) return null; const x = e[0] + (e[2] - e[0]) * t, y = e[1] + (e[3] - e[1]) * t; return <circle key={k} cx={x} cy={y} r={6.5} fill={k % 2 ? CLAY : GREEN} opacity={Math.sin(t * Math.PI) * 0.95} />; })}
    </svg>
    {G_NODES.map((n, i) => { const sc = Math.max(0, Math.min(1, (rv - (i / G_NODES.length) * 0.4) / 0.4)); const col = NCOL[i % 4];
      if (n.big) return (<div key={i} style={{ position: "absolute", left: n.x, top: n.y + float(i), transform: `translate(-50%,-50%) scale(${0.6 + sc * 0.4})`, opacity: Math.min(1, sc * 1.5) }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "9px 16px", borderRadius: 13, background: "#fff", boxShadow: `0 8px 18px rgba(30,40,60,0.24), 0 0 18px ${col}55`, border: `2.5px solid ${col}`, whiteSpace: "nowrap" }}>
          <div style={{ width: 15, height: 15, borderRadius: 5, background: col }} /><span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 22, color: INK }}>{n.label}</span></div></div>);
      return (<div key={i} style={{ position: "absolute", left: n.x, top: n.y + float(i), transform: `translate(-50%,-50%) scale(${sc})`, opacity: Math.min(1, sc * 1.5) }}>
        <div style={{ width: n.ring === 2 ? 24 : 15, height: n.ring === 2 ? 24 : 15, borderRadius: "50%", background: col, boxShadow: `0 0 14px ${col}, 0 3px 7px rgba(0,0,0,0.18)` }} />{n.label && <span style={{ position: "absolute", left: 22, top: -2, fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 18, color: MUTE, whiteSpace: "nowrap" }}>{n.label}</span>}</div>); })}
    <div style={{ position: "absolute", left: G_CX, top: G_CY, transform: `translate(-50%,-50%) scale(${0.7 + Math.max(0, Math.min(1, (rv - 0.05) / 0.2)) * 0.3})` }}><ClaudeMark size={94} glow={0.6 + Math.max(0, Math.sin(lf / 7)) * 0.35} /></div>
  </div>); };
const ClaudeWordmark: React.FC<{ size: number; dark?: boolean }> = ({ size, dark }) => (<div style={{ display: "flex", alignItems: "center", gap: size * 0.32 }}><ClaudeMark size={size} /><span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: size * 0.92, color: dark ? "#fff" : INK, letterSpacing: "-0.025em" }}>Claude Code</span></div>);

// ===== "linked wiki" visual — actual markdown PAGES with [[wikilinks]] + #tags, wired together (DISTINCT from the hook graph) =====
const WCARDS = [
  { t: "Pricing Strategy", x: 8, y: 0, tags: ["#pricing", "#strategy"], body: [["we settled on ", "Annual-first"], ["after the ", "Q3 Call"]] },
  { t: "Q3 Call", x: 524, y: 150, tags: ["#calls"], body: [["fed into ", "Pricing"], ["and the ", "Roadmap"]] },
  { t: "Roadmap", x: 254, y: 432, tags: ["#roadmap", "#q1"], body: [["ship ", "Annual-first"], ["owner: ", "Pricing"]] },
];
const WLINKS = [[0, 1], [1, 2], [0, 2]]; const WCW = 388, WCH = 200;
const wcenter = (c: { x: number; y: number }) => ({ x: c.x + WCW / 2, y: c.y + WCH / 2 });
const WikiPages: React.FC<{ lf: number }> = ({ lf }) => (
  <div style={{ position: "relative", width: 920, height: 700 }}>
    <svg width={920} height={700} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
      {WLINKS.map((lk, i) => { const a = wcenter(WCARDS[lk[0]]), b = wcenter(WCARDS[lk[1]]); const len = Math.hypot(b.x - a.x, b.y - a.y); const dr = ramp(lf, 32 + i * 7, 32 + i * 7 + 16);
        return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={SLATE} strokeWidth={3} strokeDasharray={len} strokeDashoffset={len * (1 - dr)} opacity={0.42} />; })}
      {WLINKS.map((lk, i) => { if (lf < 54) return null; const a = wcenter(WCARDS[lk[0]]), b = wcenter(WCARDS[lk[1]]); const t = ((lf / 34 + i * 0.33) % 1); return <circle key={`p${i}`} cx={a.x + (b.x - a.x) * t} cy={a.y + (b.y - a.y) * t} r={7} fill={CLAY} opacity={Math.sin(t * Math.PI)} />; })}
    </svg>
    {WCARDS.map((c, i) => { const e = over(lf, 6 + i * 9, 13); const fl = Math.sin(lf / 24 + i) * 4;
      return (<div key={i} style={{ position: "absolute", left: c.x, top: c.y + fl, width: WCW, opacity: e, transform: `translateY(${(1 - e) * 26}px) scale(${0.84 + Math.min(e, 1) * 0.16})`, background: "#fff", borderRadius: 18, boxShadow: "0 3px 6px rgba(40,32,20,0.12), 0 22px 46px rgba(28,38,64,0.28)", padding: "22px 28px", border: "1px solid #efeae0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 14 }}><div style={{ width: 32, height: 36, borderRadius: 6, background: grad("#E08A66", "#C5603C"), position: "relative" }}><div style={{ position: "absolute", top: 6, left: 6, right: 6, height: 3, background: "rgba(255,255,255,0.7)", borderRadius: 2 }} /><div style={{ position: "absolute", top: 13, left: 6, right: 11, height: 3, background: "rgba(255,255,255,0.5)", borderRadius: 2 }} /></div><span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 35, color: INK }}>{c.t}</span></div>
        {c.body.map((line, j) => <div key={j} style={{ fontFamily: inter.fontFamily, fontWeight: 500, fontSize: 25, color: "#5e5950", lineHeight: 1.55 }}>{line[0]}<span style={{ color: SLATE, fontWeight: 700, background: "rgba(58,92,132,0.13)", padding: "1px 9px", borderRadius: 6 }}>[[{line[1]}]]</span></div>)}
        <div style={{ display: "flex", gap: 8, marginTop: 15 }}>{c.tags.map((t, k) => <span key={k} style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 21, color: GREEN, background: "rgba(63,158,116,0.13)", padding: "4px 13px", borderRadius: 999 }}>{t}</span>)}</div>
      </div>); })}
  </div>);

// ===== real-screen browser + Nick-Saraev annotation system =====
const SHOT: Record<string, number> = { gh_claudecode: 3800 / 2560, gh_knowledge: 3800 / 2560, gh_karpathy: 3400 / 2560, gh_garden: 3400 / 2800, gh_obsidian: 3400 / 2560, gh_obsrepo: 3400 / 2560 };
const Browser: React.FC<{ w: number; h: number; url: string; children: React.ReactNode }> = ({ w, h, url, children }) => (
  <div style={{ width: w, height: h, borderRadius: 18, overflow: "hidden", background: "#fff", boxShadow: SH, position: "relative" }}>
    <div style={{ height: 50, background: "#E9E6DF", display: "flex", alignItems: "center", padding: "0 18px", gap: 8, borderBottom: "1px solid #d6d2c9" }}>
      <div style={{ display: "flex", gap: 8 }}>{["#FF5F57", "#FEBC2E", "#28C840"].map((c) => <div key={c} style={{ width: 14, height: 14, borderRadius: "50%", background: c }} />)}</div>
      <div style={{ flex: 1, marginLeft: 14, height: 32, borderRadius: 9, background: "#fff", display: "flex", alignItems: "center", padding: "0 16px", fontFamily: inter.fontFamily, fontSize: 18, fontWeight: 500, color: "#6b6b6b", border: "1px solid #dcdcdc" }}>🔒 {url}</div>
    </div>
    <div style={{ position: "absolute", top: 50, left: 0, right: 0, bottom: 0, overflow: "hidden", background: GH }}>{children}</div>
    <Sheen r={18} o={0.12} />
  </div>);
// pan/zoom over a tall screenshot. focus = fraction of image height centered; scale >= 1
const Screen: React.FC<{ img: string; vw: number; vh: number; focus: number; scale: number; focusX?: number }> = ({ img, vw, vh, focus, scale, focusX = 0.5 }) => {
  const ar = SHOT[img]; const dispW = vw * scale; const dispH = dispW * ar; const top = vh / 2 - focus * dispH; const left = vw / 2 - focusX * dispW;
  return (<><Img src={staticFile(`refs/${img}.jpg`)} style={{ position: "absolute", width: dispW, height: dispH, left, top }} /></>);
};
// animated highlight box (draws in), screen-space coords within the browser viewport
const HiBox: React.FC<{ x: number; y: number; w: number; h: number; lf: number; at: number; color?: string; label?: string; lblSide?: "top" | "bottom" }> = ({ x, y, w, h, lf, at, color = CLAY, label, lblSide = "top" }) => {
  const p = ramp(lf, at, at + 12); if (p <= 0) return null; const pulse = 1 + Math.sin(lf / 6) * 0.015;
  return (<div style={{ position: "absolute", left: x, top: y, width: w, height: h * p, transform: `scale(${pulse})`, borderRadius: 12, border: `4px solid ${color}`, boxShadow: `0 0 22px ${color}88, inset 0 0 16px ${color}33`, opacity: p }}>
    {label && p > 0.6 && <div style={{ position: "absolute", left: -2, [lblSide]: -42, padding: "5px 14px", borderRadius: 8, background: grad("#26221C", "#15120E"), color: "#F4EFE6", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 22, whiteSpace: "nowrap", boxShadow: IMSH, borderLeft: `3px solid ${color}` }}>{label}</div>}
  </div>);
};
// mac cursor + click ripple
const Cursor: React.FC<{ x: number; y: number; click?: boolean }> = ({ x, y, click }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: 30, pointerEvents: "none" }}>
    {click && <div style={{ position: "absolute", left: -16, top: -16, width: 40, height: 40, borderRadius: "50%", border: `3px solid ${CLAY}`, opacity: 0.7 }} />}
    <svg width={34} height={34} viewBox="0 0 24 24" style={{ filter: "drop-shadow(0 3px 5px rgba(0,0,0,0.4))" }}><path d="M5 3 L5 19 L9.5 14.8 L12.5 21 L15 20 L12 14 L18 13.5 Z" fill="#fff" stroke="#222" strokeWidth={1.3} strokeLinejoin="round" /></svg>
  </div>);
// dark terminal window (for the ASK scene) — elevated
const Term: React.FC<{ w: number; lf: number }> = ({ w, lf }) => { const mono = "ui-monospace, 'SF Mono', Menlo, monospace";
  const q = "what did I decide on pricing?"; const qn = Math.floor(ramp(lf, 4, 22) * q.length); const ans = ramp(lf, 26, 38);
  return (<div style={{ width: w, borderRadius: 20, overflow: "hidden", background: "#15120E", boxShadow: `${SH}, 0 0 60px rgba(210,114,78,0.22)`, fontFamily: mono }}>
    <div style={{ height: 52, background: "#221D18", display: "flex", alignItems: "center", padding: "0 20px", gap: 8 }}><div style={{ display: "flex", gap: 9 }}>{["#FF5F57", "#FEBC2E", "#28C840"].map((c) => <div key={c} style={{ width: 15, height: 15, borderRadius: "50%", background: c }} />)}</div><span style={{ marginLeft: 14, color: "#8a8479", fontSize: 22, fontWeight: 600 }}>claude — your-brain</span></div>
    <div style={{ padding: "34px 38px 40px", fontSize: 33, lineHeight: 1.5 }}>
      <div style={{ color: "#7FB7E0" }}>$ claude <span style={{ color: "#E9E2D4" }}>"{q.slice(0, qn)}{qn < q.length && lf % 16 < 8 ? "▋" : ""}"</span></div>
      {ans > 0 && <div style={{ marginTop: 26, opacity: ans, transform: `translateY(${(1 - ans) * 14}px)` }}><div style={{ display: "flex", alignItems: "center", gap: 12 }}><ClaudeMark size={36} /><span style={{ color: CLAY, fontWeight: 700, fontFamily: fraunces.fontFamily, fontSize: 30 }}>Claude</span></div>
        <div style={{ color: "#D6CFC1", marginTop: 16, fontSize: 32, lineHeight: 1.45 }}>From <span style={{ color: GREEN, fontWeight: 700 }}>your notes</span>, you landed on <span style={{ background: "rgba(207,149,68,0.28)", color: "#F4DDA8", padding: "2px 10px", borderRadius: 6 }}>$49/mo, annual-first</span>.</div>
        <div style={{ display: "flex", gap: 12, marginTop: 20, flexWrap: "wrap" }}>{["pricing-call.md", "strategy.md", "roadmap.md"].map((fl, i) => <div key={i} style={{ opacity: ramp(lf, 34 + i * 3, 34 + i * 3 + 8), display: "flex", alignItems: "center", gap: 7, padding: "8px 15px", borderRadius: 9, background: "rgba(63,158,116,0.16)", border: `1.5px solid ${GREEN}66`, color: "#A7D9C0", fontSize: 23 }}><span style={{ color: GREEN }}>↳</span>{fl}</div>)}</div></div>}
    </div></div>); };

// Claude chat — a cursor DRAGS your files (Notes, Calls, Transcripts) into the chat
const DRAGF = [{ n: "Notes.md", c: SLATE }, { n: "Calls.md", c: GREEN }, { n: "Transcripts.md", c: CLAY }];
const FileCard: React.FC<{ n: string; c: string; dragging?: boolean }> = ({ n, c, dragging }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 11, padding: "13px 20px", borderRadius: 14, background: "#fff", border: `1.5px solid ${dragging ? c : "#e6dfd2"}`, boxShadow: dragging ? `0 14px 28px rgba(30,40,60,0.28), 0 0 16px ${c}55` : "0 4px 10px rgba(40,32,20,0.1)", whiteSpace: "nowrap" }}>
    <div style={{ width: 26, height: 30, borderRadius: 5, background: c, position: "relative" }}><div style={{ position: "absolute", top: 4, left: 5, right: 5, height: 3, background: "rgba(255,255,255,0.7)", borderRadius: 2 }} /><div style={{ position: "absolute", top: 11, left: 5, right: 9, height: 3, background: "rgba(255,255,255,0.5)", borderRadius: 2 }} /></div>
    <span style={{ fontFamily: "ui-monospace, Menlo, monospace", fontWeight: 700, fontSize: 25, color: INK }}>{n}</span></div>);
const ClaudeWindow: React.FC<{ w: number; lf: number }> = ({ w, lf }) => {
  const winTop = 196, winH = 318, dstart = 8, dstep = 18;
  const st = (i: number) => { const ds = dstart + i * dstep, de = ds + 13; const drag = Math.min(1, ramp(lf, ds, de));
    const sx = 64 + i * 264, sy = 8; const dx = w / 2 - 120, dy = winTop + 86; return { x: interpolate(drag, [0, 1], [sx, dx]), y: interpolate(drag, [0, 1], [sy, dy]), drag, de, landed: lf >= de }; };
  const activeI = [0, 1, 2].findIndex((i) => !st(i).landed); const cur = st(activeI < 0 ? 2 : activeI);
  const landed = [0, 1, 2].filter((i) => st(i).landed); const allDone = landed.length === 3; const reading = ramp(lf, dstart + 2 * dstep + 16, dstart + 2 * dstep + 30);
  return (<div style={{ position: "relative", width: w, height: 540 }}>
    {/* claude chat window */}
    <div style={{ position: "absolute", left: 0, top: winTop, width: w, height: winH, borderRadius: 22, background: "#FBF8F2", boxShadow: SH, overflow: "hidden" }}>
      <div style={{ height: 60, background: "#fff", borderBottom: "1px solid #ece6da", display: "flex", alignItems: "center", padding: "0 24px", gap: 13 }}><ClaudeMark size={34} /><span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 27, color: INK }}>Claude</span><div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 9, color: GREEN, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 21 }}><div style={{ width: 11, height: 11, borderRadius: "50%", background: GREEN, opacity: 0.4 + Math.abs(Math.sin(lf / 6)) * 0.6 }} />{allDone ? "reading" : "drop files"}</div></div>
      <div style={{ padding: "20px 26px" }}>
        <div style={{ minHeight: 90, borderRadius: 14, border: `2.5px dashed ${allDone ? "#d8d2c5" : CLAY}`, background: allDone ? "#fff" : "rgba(210,114,78,0.05)", display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", padding: "14px 16px" }}>
          {landed.map((i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 7, padding: "8px 14px", borderRadius: 10, background: "#fff", border: "1.5px solid #e6dfd2", fontFamily: "ui-monospace, Menlo, monospace", fontWeight: 600, fontSize: 22, color: SLATE }}><span style={{ color: GREEN, fontWeight: 800 }}>✓</span>{DRAGF[i].n}</div>)}
          {!allDone && landed.length === 0 && <span style={{ fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 24, color: CLAY, opacity: 0.7 }}>drop your folder here…</span>}</div>
        {allDone && <div style={{ marginTop: 16, opacity: reading }}><div style={{ height: 12, borderRadius: 999, background: "#ece6da", overflow: "hidden" }}><div style={{ height: "100%", width: `${reading * 100}%`, background: grad("#E08A66", "#C5603C"), borderRadius: 999 }} /></div>
          <div style={{ marginTop: 12, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 24, color: GREEN, opacity: ramp(lf, dstart + 2 * dstep + 28, dstart + 2 * dstep + 40) }}>✓ read 47 files · your wiki is live</div></div>}
      </div></div>
    {/* files still being dragged (cursor-held / waiting) */}
    {[0, 1, 2].map((i) => { const s = st(i); if (s.landed) return null; return (<div key={i} style={{ position: "absolute", left: s.x, top: s.y, transform: `rotate(${s.drag > 0 && s.drag < 1 ? -4 : 0}deg)`, zIndex: 20 }}><FileCard n={DRAGF[i].n} c={DRAGF[i].c} dragging={s.drag > 0 && s.drag < 1} /></div>); })}
    <Cursor x={cur.x + 124} y={cur.y + 30} click={cur.drag > 0 && cur.drag < 1} />
  </div>); };

const HeroHeader: React.FC = () => { const f = useCurrentFrame(); const out = eOut(f, fr(L[1]) - 7, 7);
  return (<div style={{ position: "absolute", top: 250, left: 60, right: 60, opacity: 1 - out, transform: `translateY(${-out * 14}px)`, zIndex: 60, textAlign: "center" }}>
    <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 28, letterSpacing: "0.07em", color: MUTE, marginBottom: 10, textTransform: "uppercase" }}>Claude Code is now your</div>
    <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 118, lineHeight: 0.92, letterSpacing: "-0.04em", color: INK, textShadow: "0 2px 20px rgba(236,233,226,0.98)" }}>second <span style={{ color: CLAY }}>brain</span></div>
    <div style={{ marginTop: 14, display: "inline-flex", alignItems: "center", gap: 10, padding: "8px 18px", borderRadius: 999, background: "#fff", boxShadow: IMSH, fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 26, color: INK }}>the <span style={{ color: SLATE }}>Karpathy</span> method</div></div>); };

const Scene: React.FC<{ s: number; e: number; children: React.ReactNode }> = ({ s, e, children }) => {
  const frame = useCurrentFrame(); const local = frame - fr(s); const lenF = fr(e - s); if (local < 0 || local > lenF) return null;
  const inF = s <= 0 ? 1 : eOut(frame, fr(s), 5); const op = Math.min(inF, 1 - eOut(frame, fr(e - 0.16), 6)); const inE = eOut(frame, fr(s), 12);
  return <AbsoluteFill style={{ opacity: op, transform: `scale(${0.99 + inE * 0.01})` }}>{children}</AbsoluteFill>; };

// ===== S0 HOOK — "second brain" knowledge-graph graphic + Karpathy + Claude (FULL frame 0) =====
const HookScene: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s); const pulse = Math.max(0, Math.sin(lf / 7)); const hOut = eOut(f, fr(L[1]) - 7, 7);
  return (<AbsoluteFill>
    <Bloom cx={CX} cy={1130} w={1280} color="rgba(210,114,78,0.18)" lf={lf} base={0.5 + pulse * 0.1} />
    {/* Claude Code logo badge — credibility */}
    <div style={{ position: "absolute", top: 232, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: (1 - hOut) * ramp(lf, 2, 14), transform: `translateY(${-hOut * 14}px)`, zIndex: 60 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 13, padding: "10px 26px 10px 12px", borderRadius: 999, background: "#fff", boxShadow: IMSH }}><ClaudeMark size={40} glow={0.45} /><span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 34, color: INK, letterSpacing: "-0.02em" }}>Claude Code</span></div></div>
    <div style={{ position: "absolute", top: 312, left: 50, right: 50, textAlign: "center", opacity: 1 - hOut, transform: `translateY(${-hOut * 14}px)`, zIndex: 60 }}>
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 24, letterSpacing: "0.12em", color: MUTE, marginBottom: 4, textTransform: "uppercase" }}>is now your entire</div>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 104, lineHeight: 0.9, letterSpacing: "-0.04em", color: INK, textShadow: "0 2px 20px rgba(236,233,226,0.98)" }}>second <span style={{ color: CLAY }}>brain</span></div>
    </div>
    {/* Karpathy attribution — prominent real photo */}
    <div style={{ position: "absolute", top: 486, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "center", gap: 22, opacity: ramp(lf, 8, 22), transform: `scale(${0.9 + Math.min(ramp(lf, 8, 22), 1) * 0.1})`, zIndex: 60 }}>
      <div style={{ width: 124, height: 124, borderRadius: "50%", overflow: "hidden", border: "5px solid #fff", boxShadow: `0 14px 34px rgba(30,40,60,0.34), 0 0 0 3px ${SLATE}55` }}><Img src={staticFile("refs/kp_avatar.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>
      <div style={{ textAlign: "left" }}>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 26, color: MUTE }}>the trick from</div>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 48, color: INK, lineHeight: 1.0, letterSpacing: "-0.02em" }}>Andrej <span style={{ color: SLATE }}>Karpathy</span></div></div></div>
    {/* the second-brain graph — FULL at frame 0, centered in eye-view */}
    <div style={{ position: "absolute", left: 540, top: 952, transform: "translate(-50%,-50%) scale(0.64)" }}><BrainGraph lf={lf} rv={1} /></div>
  </AbsoluteFill>); };

// ===== S1 INPUT — a folder of your raw notes (knowledge repo), highlight files =====
const InputScene: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s);
  const ghOut = ramp(lf, 50, 62); const clIn = ramp(lf, 52, 64);
  const focus = eio(lf, 2, fr(1.8), 0.058, 0.088); const scale = eio(lf, 0, fr(1.8), 1.68, 1.8);
  return (<AbsoluteFill>
    <Bloom cx={CX} cy={900} w={1100} color="rgba(58,92,132,0.16)" lf={lf} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 452, textAlign: "center" }}><span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 58, color: INK }}>{clIn > 0.5 ? <>drag it into <span style={{ color: CLAY }}>Claude</span></> : <>your <span style={{ color: SLATE }}>real notes folder</span></>}</span></div>
    {/* beat 1: real github repo zoomed on the TITLE */}
    <div style={{ position: "absolute", left: 96, top: 588, opacity: 1 - ghOut, transform: `translateY(${-ghOut * 44}px) scale(${1 - ghOut * 0.05})` }}>
      <Browser w={888} h={636} url="github.com/kepano/kepano-obsidian"><Screen img="gh_obsrepo" vw={888} vh={586} focus={focus} scale={scale} focusX={0.27} />
        <HiBox x={20} y={250} w={566} h={78} lf={lf} at={14} color={CLAY} label="a real folder of notes" lblSide="bottom" /></Browser></div>
    {/* beat 2: a cursor drags your files into Claude */}
    {clIn > 0.01 && <div style={{ position: "absolute", left: 130, top: 660, opacity: clIn, transform: `translateY(${(1 - clIn) * 36}px)` }}><ClaudeWindow w={820} lf={lf - 52} /></div>}
  </AbsoluteFill>); };

// ===== S2 WIKI — the brain graph BUILDS IN (every idea its own page, wired together) =====
const WikiScene: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s); const pulse = Math.max(0, Math.sin(lf / 7)); const rv = ramp(lf, 6, fr(2.6));
  return (<AbsoluteFill>
    <Bloom cx={CX} cy={1120} w={1240} color="rgba(63,158,116,0.16)" lf={lf} base={0.5 + pulse * 0.1} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 392, textAlign: "center" }}><span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 60, color: INK }}>into a <span style={{ color: GREEN }}>linked wiki</span></span><div style={{ fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 600, fontSize: 36, color: MUTE, marginTop: 8 }}>every idea its own page, wired to the rest</div></div>
    <div style={{ position: "absolute", left: 540, top: 920, transform: "translate(-50%,-50%) scale(0.78)" }}><WikiPages lf={lf} /></div>
  </AbsoluteFill>); };

// ===== S3 NO-RAG — no vector DB, no embeddings, no RAG (the part that breaks people) =====
const NoRagScene: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s);
  const items = ["vector database", "embeddings", "RAG setup"];
  return (<AbsoluteFill>
    <Bloom cx={CX} cy={960} w={980} color="rgba(196,74,58,0.13)" lf={lf} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 540, textAlign: "center" }}><span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 60, color: INK }}>and the wild part?</span></div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 720, display: "flex", flexDirection: "column", alignItems: "center", gap: 30 }}>
      {items.map((it, i) => { const e = over(f, fr(s) + 8 + i * 9, 12); const strike = ramp(lf, 8 + i * 9 + 8, 8 + i * 9 + 20);
        return (<div key={i} style={{ display: "flex", alignItems: "center", gap: 22, opacity: e, transform: `translateX(${(1 - e) * -40}px) scale(${0.9 + Math.min(e, 1) * 0.1})` }}>
          <div style={{ width: 58, height: 58, borderRadius: "50%", background: grad(RED, "#A83329"), display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: 32, boxShadow: IMSH }}>✕</div>
          <div style={{ position: "relative", fontFamily: fraunces.fontFamily, fontWeight: 800, fontSize: 76, color: MUTE }}>no {it}<div style={{ position: "absolute", left: -6, right: -6, top: "52%", height: 6, background: RED, width: `${strike * 100}%`, borderRadius: 3 }} /></div>
        </div>); })}</div>
  </AbsoluteFill>); };

// ===== S4 ASK — ask anything, answers from YOUR knowledge not the internet =====
const AskScene: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s);
  return (<AbsoluteFill>
    <Bloom cx={CX} cy={860} w={1140} color="rgba(210,114,78,0.16)" lf={lf} />
    <div style={{ position: "absolute", left: 540, top: 880, transform: "translate(-50%,-50%) scale(0.6)", opacity: 0.1 }}><BrainGraph lf={lf} rv={1} /></div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 452, textAlign: "center" }}><span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 58, color: INK }}>ask across <span style={{ color: CLAY }}>everything</span></span></div>
    <div style={{ position: "absolute", left: 90, right: 90, top: 588, display: "flex", justifyContent: "center" }}><Term w={900} lf={lf} /></div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1148, textAlign: "center", opacity: ramp(lf, 42, 54) }}><span style={{ fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 600, fontSize: 42, color: GREEN }}>from your knowledge, not the internet's</span></div>
  </AbsoluteFill>); };

// ===== S5 VALUE — paid apps do it worse, you get it free in 10 minutes (premium, no emoji) =====
const ValueScene: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s); const pulse = Math.max(0, Math.sin(lf / 8)); const a1 = over(f, fr(s) + 4, 12); const a2 = over(f, fr(s) + 16, 12);
  return (<AbsoluteFill>
    <Bloom cx={CX} cy={860} w={1040} color="rgba(210,114,78,0.16)" lf={lf} base={0.45 + pulse * 0.08} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 470, textAlign: "center" }}><span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 56, color: INK }}>they <span style={{ color: MUTE }}>charge</span> for this. <span style={{ color: CLAY }}>this is free.</span></span></div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 626, display: "flex", justifyContent: "center", gap: 26, alignItems: "stretch" }}>
      <div style={{ width: 372, padding: "30px 26px", borderRadius: 26, background: "#fff", boxShadow: SH, opacity: a1 * 0.96, transform: `scale(${0.88 + a1 * 0.12})`, display: "flex", flexDirection: "column" }}>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 24, letterSpacing: "0.04em", color: MUTE, textTransform: "uppercase", marginBottom: 18 }}>2nd-brain apps</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>{["Notion AI", "Mem", "Reflect", "Tana"].map((n, i) => <div key={i} style={{ opacity: ramp(lf, 8 + i * 3, 8 + i * 3 + 8), padding: "8px 15px", borderRadius: 10, background: "#F1EEE7", fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 24, color: "#8a8478" }}>{n}</div>)}</div>
        <div style={{ marginTop: "auto", paddingTop: 26 }}><div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 56, color: RED, textDecoration: "line-through", textDecorationColor: "rgba(196,74,58,0.5)" }}>$10–30<span style={{ fontSize: 30 }}>/mo</span></div><div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 25, color: MUTE, marginTop: 4 }}>and still does it worse</div></div></div>
      <div style={{ width: 372, padding: "30px 26px", borderRadius: 26, background: grad("#FBF7EF", "#F1E9DA"), boxShadow: `${SH}, 0 0 ${44 + pulse * 20}px rgba(210,114,78,0.46)`, border: `3px solid ${CLAY}`, opacity: a2, transform: `scale(${(0.88 + a2 * 0.12) * (1 + pulse * 0.012)})`, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}><ClaudeMark size={48} glow={0.5 + pulse * 0.3} /><span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 34, color: INK }}>Claude Code</span></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>{["reads your whole folder", "builds a linked wiki", "answers from your notes"].map((n, i) => <div key={i} style={{ opacity: ramp(lf, 20 + i * 3, 20 + i * 3 + 8), display: "flex", alignItems: "center", gap: 9, fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 23, color: INK }}><span style={{ color: GREEN, fontWeight: 900 }}>✓</span>{n}</div>)}</div>
        <div style={{ marginTop: "auto", paddingTop: 26 }}><div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 56, color: GREEN }}>$0<span style={{ fontSize: 30, color: INK }}> · 10 min</span></div><div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 25, color: INK, marginTop: 4 }}>and you own it forever</div></div></div>
    </div>
  </AbsoluteFill>); };

// ===== CTA =====
const CTA: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const local = f - fr(s); if (local < 0) return null; const a = eOut(f, fr(s) + 2, 12); const pillPop = over(local, 10, 14); const pulse = 1 + Math.sin(f / 7) * 0.03;
  return (<AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
    {Array.from({ length: 16 }, (_, i) => { const wave = i < 12 ? 4 : 30; const p = eOut(f, fr(s) + wave + (i % 12), 28); const ang = (i / 8) * Math.PI; if (p <= 0 || p >= 1) return null; return <div key={i} style={{ position: "absolute", left: 540 + Math.cos(ang) * p * 360, top: 900 + Math.sin(ang) * p * 360, fontSize: 26, opacity: Math.sin(p * Math.PI), color: [SLATE, CLAY, GREEN, AMBER][i % 4] }}>✦</div>; })}
    <div style={{ marginTop: -150, transform: `scale(${0.7 + a * 0.3})`, opacity: a }}><ClaudeMark size={168} glow={0.5 + Math.sin(local / 9) * 0.12} /></div>
    <div style={{ marginTop: 46, transform: `scale(${(0.8 + pillPop * 0.2) * pulse})`, padding: "28px 56px", borderRadius: 999, background: CLAY, color: "#fff", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 66, boxShadow: "0 24px 54px rgba(210,114,78,0.42)", opacity: a }}>💬 Comment "BRAIN"</div>
    <div style={{ marginTop: 28, fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 600, fontSize: 42, color: INK, opacity: a, textAlign: "center" }}>and I'll send the exact setup</div>
  </AbsoluteFill>); };

// ===== Captions =====
type Word = { word: string; start: number; end: number; line: number };
const WORDS = wordsData as Word[];
const cleanw = (w: string) => w.toLowerCase().replace(/[^a-z0-9'$]/g, "");
const EMPH = new Set(["claude", "code", "second", "brain", "karpathy", "folder", "raw", "notes", "calls", "transcripts", "wiki", "linked", "page", "tagged", "wired", "scattered", "vector", "embeddings", "rag", "anything", "everything", "knowledge", "internet's", "free", "10", "minutes", "comment"]);
const CHUNKS = (() => { const byLine: Record<number, Word[]> = {}; for (const w of WORDS) (byLine[w.line] ||= []).push(w);
  const out: { words: Word[]; start: number; line: number }[] = [];
  for (const li of Object.keys(byLine).map(Number).sort((a, b) => a - b)) { const ws = byLine[li]; for (let i = 0; i < ws.length; i += 3) { const g = ws.slice(i, i + 3); out.push({ words: g, start: g[0].start, line: li }); } }
  const aE = Math.max(...WORDS.map((w) => w.end)); return out.map((c, i) => ({ ...c, end: i + 1 < out.length ? out[i + 1].start : aE + 0.4 })); })();
const Captions: React.FC = () => { const frame = useCurrentFrame();
  return (<>{CHUNKS.map((c, i) => { if (frame < fr(c.start) || frame >= fr(c.end)) return null; if (c.line === 6) return null;
    return (<div key={i} style={{ position: "absolute", top: 1286, left: 64, right: 64, height: 170, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "center", gap: "0 15px", width: 952, textAlign: "center" }}>
        {c.words.map((w, j) => { const g = EMPH.has(cleanw(w.word)); const shown = frame >= fr(w.start);
          return <span key={j} style={{ display: "inline-block", opacity: shown ? 1 : 0, fontFamily: g ? frauncesItalic.fontFamily : fraunces.fontFamily, fontStyle: g ? "italic" : "normal", fontWeight: g ? 700 : 600, fontSize: g ? 76 : 66, lineHeight: 1.04, color: g ? SLATE : INK, letterSpacing: "-0.02em", textShadow: "0 2px 14px rgba(236,233,226,0.95), 0 1px 2px rgba(236,233,226,1)" }}>{w.word}</span>; })}
      </div></div>); })}</>); };

const ProgressBar: React.FC = () => { const f = useCurrentFrame(); const { durationInFrames } = useVideoConfig(); const p = Math.min(1, f / (durationInFrames - 1));
  return (<div style={{ position: "absolute", left: 46, right: 46, top: 162, height: 13, borderRadius: 999, zIndex: 120 }}>
    <div style={{ position: "absolute", inset: 0, background: "rgba(58,92,132,0.15)", borderRadius: 999 }} />
    <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${p * 100}%`, background: grad("#E08A66", "#C5603C"), borderRadius: 999, boxShadow: "0 2px 8px rgba(210,114,78,0.35)" }} />
    <div style={{ position: "absolute", left: `${p * 100}%`, top: -3, width: 19, height: 19, borderRadius: "50%", background: CLAY, border: "3px solid #F3EFE7", boxShadow: "0 0 12px rgba(210,114,78,0.9)", transform: "translateX(-50%)" }} /></div>); };

const L = [0, 4.53, 8.87, 15.47, 18.1, 22.6, 26.91];
const Sfx: React.FC<{ at: number; src: string; v?: number; dur?: number }> = ({ at, src, v = 0.3, dur = 2.5 }) => (<Sequence from={fr(at)} durationInFrames={fr(dur)}><Audio src={staticFile(`sfx/${src}`)} volume={v} /></Sequence>);
const Ticks: React.FC<{ start: number; n: number; step: number; src?: string; v?: number }> = ({ start, n, step, src = "tick.wav", v = 0.26 }) => (<>{Array.from({ length: n }, (_, i) => <Sfx key={i} at={start + i * step} src={src} v={v} dur={0.5} />)}</>);

export const ClaudeBrainReel: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 16, 28], [1.0, 1.04, 1.0], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  return (<AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
    <Audio src={staticFile("vo_brain.wav")} />
    <Audio loop src={staticFile("seo_music.wav")} volume={(ff) => interpolate(ff, [0, fr(1.6), fr(L[6]) - 10, fr(L[6]) + 16, 99999], [0, 0.2, 0.2, 0.15, 0.15], { extrapolateRight: "clamp" })} />
    <Sfx at={0} src="metal_riser.wav" v={0.85} /><Sfx at={0} src="sub.wav" v={0.8} /><Sfx at={0.25} src="boom.wav" v={0.7} /><Sfx at={0.25} src="shimmer.wav" v={0.5} /><Sfx at={1.7} src="ding.wav" v={0.4} />
    {L.slice(1).map((t, i) => <React.Fragment key={i}><Sfx at={t - 0.1} src="swish.wav" v={0.44} /><Sfx at={t + 0.35} src="pop.wav" v={0.34} /></React.Fragment>)}
    {/* input: file highlights */}<Sfx at={6.0} src="whoosh.wav" v={0.45} /><Sfx at={8.0} src="snap.wav" v={0.5} />
    {/* wiki: graph nodes light up */}<Ticks start={10.6} n={9} step={0.16} src="blip3.wav" v={0.26} /><Sfx at={11.8} src="data.wav" v={0.45} />
    {/* no-rag: strike beats */}<Sfx at={15.9} src="thock.wav" v={0.5} /><Sfx at={16.8} src="thock.wav" v={0.5} /><Sfx at={17.7} src="thock.wav" v={0.5} />
    {/* ask: typing + answer */}<Ticks start={18.6} n={14} step={0.1} src="key.wav" v={0.22} /><Sfx at={22.0} src="ding.wav" v={0.5} />
    {/* value */}<Sfx at={23.4} src="snap.wav" v={0.45} /><Sfx at={24.6} src="ding.wav" v={0.5} />
    <Sfx at={L[6]} src="resolve.wav" v={0.5} /><Sfx at={L[6] + 0.2} src="angelic.wav" v={0.4} dur={3.6} /><Sfx at={L[6] + 0.4} src="sparkle.wav" v={0.55} />
    <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "50% 46%" }}>
      <Background />
      <Scene s={L[0]} e={L[1]}><HookScene s={L[0]} /></Scene>
      <Scene s={L[1]} e={L[2]}><InputScene s={L[1]} /></Scene>
      <Scene s={L[2]} e={L[3]}><WikiScene s={L[2]} /></Scene>
      <Scene s={L[3]} e={L[4]}><NoRagScene s={L[3]} /></Scene>
      <Scene s={L[4]} e={L[5]}><AskScene s={L[4]} /></Scene>
      <Scene s={L[5]} e={L[6]}><ValueScene s={L[5]} /></Scene>
      <CTA s={L[6]} />
      <Captions />
    </AbsoluteFill>
    <ProgressBar />
  </AbsoluteFill>); };
