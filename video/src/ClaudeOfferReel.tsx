import React from "react";
import { AbsoluteFill, Audio, Easing, Img, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { fraunces, frauncesItalic, inter } from "./fonts";
import wordsData from "./data/words_offer.json";

/**
 * ClaudeAskReel — "Stop giving Claude instructions, make it ask you 20 questions first" (the INTERROGATION SKILL).
 * Premium system (shared w/ ClaudeNightReel): centered big heroes, 5 z-layers (Bloom→parallax→Contact→hero→Glint/Dust),
 * 158° gradients + stacked navy shadow + Sheen + Glint, ONE warm pop (clay), no dull grey, no container unless device,
 * escalate across full VO, tight end. Identity thread = the interrogation DESK-LAMP + clay "?" spark (NOT night/moon, NOT MD person+facets).
 */
const CREAM = "#ECE9E2", INK = "#1A1813", SLATE = "#3A5C84", SLATE2 = "#5C7CA8", CLAY = "#D2724E", AMBER = "#CF9544", GREEN = "#3F9E74", MUTE = "#9A968B", PAPER = "#FBF7EF", RED = "#C44A3A";
const FPS = 30; const fr = (s: number) => s * FPS;
const eOut = (f: number, sF: number, d = 10) => interpolate(f, [sF, sF + d], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
const eIn = (f: number, sF: number, d = 10) => interpolate(f, [sF, sF + d], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) });
const ramp = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const over = (f: number, sF: number, d = 12) => interpolate(f, [sF, sF + d * 0.5, sF + d], [0, 1.16, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
const frac = (x: number) => x - Math.floor(x); const rnd = (i: number, s = 0) => frac(Math.sin(i * 12.9898 + s * 78.233) * 43758.5453);
const grad = (a: string, b: string) => `linear-gradient(158deg, ${a} 0%, ${b} 100%)`;
const CLAUDE_PATH = "m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z";

const SH = "inset 0 1.5px 0 rgba(255,255,255,0.5), 0 2px 4px rgba(34,30,24,0.22), 0 10px 22px rgba(34,30,24,0.20), 0 30px 60px rgba(20,26,45,0.26)";
const SHN = "inset 0 1px 0 rgba(255,255,255,0.25), 0 2px 4px rgba(16,20,34,0.32), 0 12px 26px rgba(16,20,34,0.28), 0 30px 60px rgba(20,26,45,0.34)";
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
    target: <g fill="none" stroke={c} strokeWidth={2.6}><circle cx={15} cy={15} r={9} /><circle cx={15} cy={15} r={4} /><circle cx={15} cy={15} r={0.6} fill={c} /></g>,
    flag: <g fill="none" stroke={c} strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round"><line x1={9} y1={6} x2={9} y2={24} /><path d="M9 7 L22 10 L9 14 Z" fill={c} /></g>,
    shield: <path d="M15 6 L23 9 V15 C23 20 19 23 15 24 C11 23 7 20 7 15 V9 Z" fill="none" stroke={c} strokeWidth={2.6} strokeLinejoin="round" />,
    ban: <g fill="none" stroke={c} strokeWidth={2.8}><circle cx={15} cy={15} r={9} /><line x1={8.6} y1={8.6} x2={21.4} y2={21.4} /></g>,
    q: <text x={15} y={22} fontSize={22} fontWeight={900} fill={c} textAnchor="middle" fontFamily="Inter">?</text>,
    send: <path d="M7 15 L23 8 L17 23 L14 16 Z" fill={c} />,
    bolt: <path d="M16 5 L8 17 H14 L13 25 L22 12 H16 Z" fill={c} />,
    list: <g stroke={c} strokeWidth={2.6} strokeLinecap="round"><line x1={9} y1={11} x2={21} y2={11} /><line x1={9} y1={16} x2={21} y2={16} /><line x1={9} y1={21} x2={17} y2={21} /></g>,
  };
  return <svg width={s} height={s} viewBox="0 0 30 30" style={{ filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.25))" }}>{p[t]}</svg>;
};
// clay "?" token — the recurring identity thread
const QTok: React.FC<{ size: number; glow?: number }> = ({ size, glow = 0.4 }) => (
  <div style={{ position: "relative", width: size, height: size, borderRadius: size * 0.3, background: grad("#E08A66", "#C5603C"), boxShadow: `${SH}, 0 0 ${size * 0.4}px rgba(210,114,78,${glow})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
    <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: size * 0.6, color: "#F6EFE6" }}>?</span><Sheen r={size * 0.3} />
  </div>
);
// warm light cone (lamp signature)
const Cone: React.FC<{ hx: number; hy: number; tw: number; bw: number; by: number; op: number }> = ({ hx, hy, tw, bw, by, op }) => {
  const h = by - hy; const lpct = 50 - (tw / bw) * 50, rpct = 50 + (tw / bw) * 50;
  return <div style={{ position: "absolute", left: hx - bw / 2, top: hy, width: bw, height: h, opacity: op, background: "linear-gradient(to bottom, rgba(240,205,140,0.5), rgba(240,205,140,0.04))", clipPath: `polygon(${lpct}% 0, ${rpct}% 0, 100% 100%, 0% 100%)`, pointerEvents: "none" }} />;
};
// interrogation desk-lamp (base→elbow→head + bell + glow)
const Lamp: React.FC<{ bx: number; by: number; ex: number; ey: number; hx: number; hy: number; hdeg: number; glow: number; flip?: boolean }> = ({ bx, by, ex, ey, hx, hy, hdeg, glow, flip = false }) => (
  <>
    <svg width={980} height={560} style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      <path d={`M${bx} ${by} L${ex} ${ey} L${hx} ${hy}`} fill="none" stroke="#2C466E" strokeWidth={17} strokeLinecap="round" strokeLinejoin="round" />
      <path d={`M${bx} ${by} L${ex} ${ey} L${hx} ${hy}`} fill="none" stroke="#6E83A4" strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    <div style={{ position: "absolute", left: bx - 72, top: by - 18, width: 144, height: 38, borderRadius: "50%", background: grad("#5C7CA8", "#34507A"), boxShadow: SH }}><Sheen r="50%" o={0.2} /></div>
    <div style={{ position: "absolute", left: ex - 14, top: ey - 14, width: 28, height: 28, borderRadius: "50%", background: grad("#DDA85C", "#CF9544"), boxShadow: "0 2px 6px rgba(20,26,45,0.4)" }}><Sheen r="50%" o={0.3} /></div>
    <div style={{ position: "absolute", left: hx - 52, top: hy - 30, width: 104, height: 70, transform: `rotate(${hdeg}deg)${flip ? " scaleX(-1)" : ""}`, transformOrigin: "center" }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: "50% 50% 40% 40% / 70% 70% 38% 38%", background: grad("#6E83A4", "#34507A"), boxShadow: SH }} />
      <div style={{ position: "absolute", left: 22, bottom: 6, width: 60, height: 26, borderRadius: "0 0 50% 50% / 0 0 100% 100%", background: "radial-gradient(ellipse at 50% 30%, #FFF6DE, #CF9544)", boxShadow: `0 0 ${34 * glow}px rgba(240,190,132,${0.7 * glow})`, opacity: 0.4 + glow * 0.6 }} />
      <Sheen r={24} o={0.25} />
    </div>
  </>
);

type Word = { word: string; start: number; end: number; line: number };
const WORDS = wordsData as Word[];
const norm = (w: string) => w.toLowerCase().replace(/[.,!?"]/g, "");
const EMPH = new Set(["$297", "$297.", "$2,000", "tears", "buyer", "10", "calls", "switch", "cheerleader", "exact", "no", "pay", "sells", "free"]);
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
    if (c.line === 11) return null;
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

// ============================ SCENE 0 — HOOK: a real $297 product listing, cash flying in → slashed to FREE, money scatters ============================
const Hook: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const lf = f - fr(s);
  const cardIn = over(f, fr(s) + 2, 14); const coverGlint = ramp(lf, 18, 32);
  const pricePulse = 1 + (lf >= 60 && lf <= 74 ? Math.sin((lf - 60) / 14 * Math.PI) * 0.08 : 0);
  const slash = ramp(lf, 152, 160); const dim = ramp(lf, 154, 164);
  const stamp = over(f, fr(s) + 162, 12); const stampScale = (1.5 - 0.5 * eOut(f, fr(s) + 162, 3)) * stamp;
  const ring = ramp(lf, 162, 174); const scatter = ramp(lf, 160, 180); const free = ramp(lf, 158, 170); const freeGlint = ramp(lf, 166, 180);
  const cx = 490, cy = 255; const CL = 290, CT = 42, CW = 400, CH = 470;
  const starPath = "M50 5 L61 39 L97 39 L68 61 L79 95 L50 73 L21 95 L32 61 L3 39 L39 39 Z";
  const bills = [{ x: 212, y: 312, r: -11, t: 22 }, { x: 768, y: 300, r: 12, t: 30 }, { x: 216, y: 424, r: -6, t: 44 }, { x: 766, y: 428, r: 8, t: 56 }, { x: 490, y: 540, r: -3, t: 68 }];
  const coins = [{ x: 234, y: 212, t: 26 }, { x: 746, y: 206, t: 38 }, { x: 214, y: 470, t: 50 }, { x: 772, y: 474, t: 62 }];
  const flyPos = (m: any) => { const flyT = eOut(f, fr(s) + m.t, 24); const side = m.x < cx - 30 ? -340 : (m.x > cx + 30 ? 340 : 0); const sx = m.x + side, sy = m.y + (side === 0 ? 320 : 230); if (scatter > 0.02) { return { x: m.x + (m.x - cx) * scatter * 0.7, y: m.y + scatter * 360, op: 1 - scatter, extra: scatter * 90 }; } return { x: sx + (m.x - sx) * flyT, y: sy + (m.y - sy) * flyT - Math.sin(flyT * Math.PI) * 26, op: Math.min(1, flyT * 2), extra: 0 }; };
  return (
    <Stage>
      <Bloom cx={cx} cy={cy} w={1040} color={`rgba(${Math.round(58 + free * 130)},${Math.round(92 + (1 - free) * 30)},${Math.round(132 - free * 40)},0.2)`} lf={lf} base={0.5 + free * 0.12} />
      {coins.map((m, i) => { const p = flyPos(m); if (p.op <= 0.02) return null; return <div key={"c" + i} style={{ position: "absolute", left: p.x - 24, top: p.y - 24, width: 48, height: 48, borderRadius: "50%", background: grad("#E9C879", "#CF9544"), boxShadow: SH, border: "2px solid rgba(255,255,255,0.45)", display: "flex", alignItems: "center", justifyContent: "center", color: "#7A4A12", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 24, opacity: p.op, transform: `rotate(${p.extra * (i % 2 ? 1 : -1)}deg)`, zIndex: 3 }}>$</div>; })}
      <Contact cx={cx} cy={CT + CH + 6} w={360} sx={0.85 + Math.min(1, cardIn) * 0.15} op={0.26} />
      <div style={{ position: "absolute", left: CL, top: CT, width: CW, height: CH, borderRadius: 24, background: grad("#FFFDF8", "#F1ECE0"), boxShadow: SH, transform: `scale(${cardIn * 1.3})`, overflow: "hidden", zIndex: 5 }}>
        <Img src={staticFile("refs/product_cover.jpg")} style={{ position: "absolute", top: 14, left: 14, width: CW - 28, height: 196, borderRadius: 14, objectFit: "cover", objectPosition: "center" }} />
        <div style={{ position: "absolute", top: 26, left: 26, width: 40, height: 40, zIndex: 2 }}><ClaudeMark size={40} glow={0.34} /></div>
        <div style={{ position: "absolute", top: 226, left: 26, display: "flex", gap: 6 }}>{[0, 1, 2, 3, 4].map((i) => <svg key={i} width={23} height={23} viewBox="0 0 100 100"><path d={starPath} fill={AMBER} /></svg>)}</div>
        <div style={{ position: "absolute", top: 262, left: 26, width: 0.58 * CW, height: 16, borderRadius: 99, background: "rgba(58,92,132,0.32)" }} />
        <div style={{ position: "absolute", top: 288, left: 26, width: 0.38 * CW, height: 13, borderRadius: 99, background: "rgba(58,92,132,0.2)" }} />
        <div style={{ position: "absolute", top: 318, left: 24, transformOrigin: "left center", transform: `scale(${pricePulse})` }}><span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 58, color: dim > 0.3 ? "rgba(58,92,132,0.4)" : INK, letterSpacing: "-0.02em" }}>$297</span>
          <div style={{ position: "absolute", top: 33, left: 2, width: 168 * slash, height: 8, borderRadius: 5, background: RED, transform: "rotate(-7deg)", transformOrigin: "left", boxShadow: "0 2px 8px rgba(196,74,58,0.5)" }} />
        </div>
        <div style={{ position: "absolute", bottom: 22, left: 24, right: 24, height: 56, borderRadius: 14, background: grad("#E08A66", "#C5603C"), boxShadow: SH, display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
          <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M2 3 H5 L7 15 H19 L21 6 H6" /><circle cx={9} cy={20} r={1.5} fill="#fff" /><circle cx={18} cy={20} r={1.5} fill="#fff" /></svg>
          <div style={{ width: 96, height: 12, borderRadius: 99, background: "rgba(255,255,255,0.85)" }} />
        </div>
        <Sheen r={24} /><Glint r={24} t={coverGlint} />
      </div>
      {bills.map((m, i) => { const p = flyPos(m); if (p.op <= 0.02) return null; return <div key={"b" + i} style={{ position: "absolute", left: p.x - 42, top: p.y - 22, width: 84, height: 44, borderRadius: 7, background: grad("#5BB98C", "#3F9E74"), boxShadow: SH, border: "1.5px solid rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", opacity: p.op, transform: `rotate(${m.r + p.extra * (i % 2 ? 1 : -1) * 0.4}deg)`, zIndex: 6 }}>
        <div style={{ width: 26, height: 26, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.7)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 17 }}>$</div>
      </div>; })}
      {ring > 0 && ring < 1 && <div style={{ position: "absolute", left: cx - 30, top: cy - 30, width: 60, height: 60, borderRadius: "50%", border: `7px solid ${AMBER}`, opacity: (1 - ring) * 0.9, transform: `scale(${0.2 + ring * 5})`, boxShadow: "0 0 26px rgba(207,149,68,0.6)", zIndex: 7 }} />}
      {stamp > 0.001 && <div style={{ position: "absolute", left: cx - 175, top: cy + 18, width: 350, height: 134, transformOrigin: "50% 50%", transform: `scale(${stampScale}) rotate(-8deg)`, opacity: Math.min(1, ramp(lf, 161, 165)), zIndex: 9 }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: 24, background: grad("#E08A66", "#C5603C"), boxShadow: `${SH}, 0 0 60px rgba(210,114,78,0.6)`, border: "4px solid rgba(255,255,255,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 90, color: "#F6EFE6", letterSpacing: "0.02em" }}>FREE</span><Sheen r={24} /><Glint r={24} t={freeGlint} />
        </div>
      </div>}
      {stamp > 0.001 && [0, 1, 2, 3, 4, 5, 6, 7].map((k) => { const a = (k / 8) * Math.PI * 2; const p = ramp(lf, 163, 178); if (p <= 0 || p >= 1) return null; const d = 30 + p * 160; return <div key={k} style={{ position: "absolute", left: cx + Math.cos(a) * d - 5, top: cy + Math.sin(a) * d - 5, width: 10, height: 10, borderRadius: "50%", background: AMBER, boxShadow: "0 0 10px rgba(207,149,68,0.85)", opacity: (1 - p) * 0.95, zIndex: 10 }} />; })}
      <Dust lf={lf} n={6} seed={1} />
    </Stage>
  );
};
// ============================ SCENE 1 — FORESHADOW: Claude rips your offer document in two ============================
const Foreshadow: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const lf = f - fr(s);
  const markIn = eOut(f, fr(s) + 2, 16); const cardIn = eOut(f, fr(s) + 50, 16);
  const tabReach = eOut(f, fr(s) + 66, 12); const tr = ramp(lf, 92, 116); const heat = ramp(lf, 78, 116);
  const SX = 545, SY = 255; const rr = ramp(lf, 78, 92);
  const bcol = `rgba(${Math.round(58 + rr * 138)},${Math.round(92 - rr * 18)},${Math.round(132 - rr * 74)},1)`;
  const leftClip = "polygon(0 0, 54% 0, 49% 14%, 54% 28%, 48% 42%, 53% 56%, 48% 70%, 53% 84%, 49% 100%, 0 100%)";
  const rightClip = "polygon(54% 0, 100% 0, 100% 100%, 49% 100%, 53% 84%, 48% 70%, 53% 56%, 48% 42%, 54% 28%, 49% 14%)";
  const inner = (
    <>
      <div style={{ height: 24, width: 140, borderRadius: 7, background: grad("#5C7CA8", "#3A5C84"), marginBottom: 20 }} />
      {[0.9, 0.74, 0.82].map((w, i) => <div key={i} style={{ height: 13, width: `${w * 100}%`, borderRadius: 99, background: "rgba(58,92,132,0.2)", marginBottom: 15 }} />)}
    </>
  );
  const halfFace = (clip: string, dir: number) => (
    <div style={{ position: "absolute", left: SX - 150, top: SY - 110, width: 300, height: 220, clipPath: clip, transform: `translateX(${dir * tr * 72}px) rotate(${dir * tr * 8}deg)`, transformOrigin: dir < 0 ? "left center" : "right center" }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 16, background: grad("#FFFDF8", "#F1ECE0"), boxShadow: SH, border: `3px solid ${bcol}`, padding: 24 }}>{inner}</div>
      <div style={{ position: "absolute", top: 0, bottom: 0, [dir < 0 ? "right" : "left"]: 0, width: 7, background: grad("#F1ECE0", "#D8CFC0") } as React.CSSProperties} />
    </div>
  );
  return (
    <Stage>
      <Bloom cx={530} cy={255} w={1010} h={780} color={`rgba(${Math.round(58 + heat * 120)},${Math.round(92 - heat * 14)},${Math.round(132 - heat * 70)},0.2)`} lf={lf} />
      <Contact cx={SX} cy={405} w={300} sx={0.85 + Math.min(1, cardIn) * 0.15} op={0.28} />
      {cardIn > 0.02 && (tr < 0.02
        ? <div style={{ position: "absolute", left: SX - 150, top: SY - 110 + (1 - cardIn) * -28, width: 300, height: 220, borderRadius: 16, background: grad("#FFFDF8", "#F1ECE0"), boxShadow: SH, border: `3px solid ${bcol}`, padding: 24, transform: `translateY(${Math.sin(lf / 7) * 2}px) scale(${cardIn})` }}>{inner}<Sheen r={16} /></div>
        : <>{halfFace(leftClip, -1)}{halfFace(rightClip, 1)}</>)}
      <div style={{ position: "absolute", left: 150, top: 189 + Math.sin(lf / 8) * 4, transform: `scale(${markIn})`, zIndex: 6 }}><ClaudeMark size={132} glow={0.36 + heat * 0.3 + Math.sin(lf / 8) * 0.08} /></div>
      {tabReach > 0.02 && [{ x: 392, d: -1 }, { x: 672, d: 1 }].map((tb, i) => <div key={i} style={{ position: "absolute", left: tb.x, top: 150, width: 30, height: 18, borderRadius: 6, background: grad("#E08A66", "#C5603C"), boxShadow: SH, transform: `translateX(${tb.d * tr * 72}px) rotate(${tb.d * tr * 8}deg)`, opacity: tabReach, zIndex: 7 }} />)}
      {tr > 0.05 && tr < 1 && [0, 1, 2, 3, 4, 5, 6].map((i) => { const dp = ramp(lf, 92 + i * 2, 116 + i * 2); return <div key={i} style={{ position: "absolute", left: SX + (rnd(i, 1) - 0.5) * 30, top: SY - 90 + i * 28, width: 9, height: 9, borderRadius: "50%", background: AMBER, boxShadow: "0 0 8px rgba(207,149,68,0.7)", opacity: (1 - dp) * 0.85, transform: `translate(${(rnd(i, 2) - 0.5) * 120 * dp}px,${dp * 60}px)` }} />; })}
      <Dust lf={lf} n={6} seed={2} />
    </Stage>
  );
};

// ============================ SCENE 2 — EXAMPLE: the offer as a real website + $2,000 tag + 4-week calendar ============================
const Example: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const lf = f - fr(s);
  const browIn = eOut(f, fr(s) + 0, 18); const glintT = ramp(lf, 18, 30);
  const tagDrop = eOut(f, fr(s) + 30, 16); const tagPop = over(f, fr(s) + 44, 12);
  const calIn = eOut(f, fr(s) + 85, 16); const markIn = eOut(f, fr(s) + 60, 16);
  const cx = 490, cy = 255;
  return (
    <Stage>
      <Bloom cx={cx} cy={cy} w={1010} h={770} color="rgba(58,92,132,0.2)" lf={lf} base={0.5} />
      <Contact cx={cx} cy={478} w={470} sx={0.85 + Math.min(1, browIn) * 0.15} op={0.24} />
      <div style={{ position: "absolute", left: 200, top: 53, width: 580, height: 404, borderRadius: 22, background: grad("#FFFDF8", "#F1ECE0"), border: "2px solid rgba(58,92,132,0.9)", boxShadow: SH, transform: `translateY(${(1 - browIn) * 16}px) scale(${0.92 + browIn * 0.08 + Math.sin(lf / 26) * 0.004})`, transformOrigin: "50% 60%", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 52, background: grad("#5C7CA8", "#3A5C84"), display: "flex", alignItems: "center", paddingLeft: 22, gap: 11 }}>
          {["#3F9E74", "#CF9544", "#5C7CA8"].map((c, i) => <div key={i} style={{ width: 13, height: 13, borderRadius: "50%", background: c }} />)}
          <div style={{ marginLeft: 16, width: 330, height: 18, borderRadius: 99, background: "rgba(255,255,255,0.25)" }} />
        </div>
        <Img src={staticFile("refs/site_offer.jpg")} style={{ position: "absolute", top: 52, left: 0, width: 580, height: 352, objectFit: "cover", objectPosition: "center top" }} />
        <Sheen r={22} /><Glint r={22} t={glintT} />
      </div>
      {tagDrop > 0.02 && <><svg width={980} height={560} style={{ position: "absolute", inset: 0 }}><line x1={742} y1={66} x2={804} y2={120} stroke="#5C7CA8" strokeWidth={3} /></svg>
        <div style={{ position: "absolute", left: 726, top: 120 + (1 - tagDrop) * -34, width: 162, height: 78, transformOrigin: "78px -54px", transform: `rotate(${4 * Math.sin(lf / 22)}deg) scale(${tagDrop * tagPop})`, opacity: tagDrop, zIndex: 7 }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: 12, clipPath: "polygon(14% 0,100% 0,100% 100%,14% 100%,0 50%)", background: grad("#D2724E", "#C56A45"), boxShadow: SH, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 36, color: "#F6EFE6", paddingLeft: 20 }}>$2,000</span></div>
          <div style={{ position: "absolute", left: 26, top: 34, width: 10, height: 10, borderRadius: "50%", background: "#EFE8D9" }} />
        </div></>}
      {calIn > 0.02 && <div style={{ position: "absolute", left: 196, top: 372, width: 104, height: 116, borderRadius: 14, background: grad("#FFFDF8", "#EFE8D9"), boxShadow: SH, transform: `scale(${calIn})`, zIndex: 7, overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 22, background: grad("#5C7CA8", "#3A5C84") }} />
        <div style={{ position: "absolute", top: -4, left: 24, width: 6, height: 13, borderRadius: 3, background: "#EFE8D9" }} /><div style={{ position: "absolute", top: -4, left: 74, width: 6, height: 13, borderRadius: 3, background: "#EFE8D9" }} />
        <div style={{ position: "absolute", top: 36, left: 12, right: 12, display: "flex", flexDirection: "column", gap: 7 }}>{[0, 1, 2, 3].map((r) => <div key={r} style={{ display: "flex", gap: 7 }}>{[0, 1, 2, 3, 4].map((c) => <div key={c} style={{ width: 12, height: 12, borderRadius: 3, background: r === 1 ? "rgba(210,114,78,0.6)" : "rgba(58,92,132,0.18)" }} />)}</div>)}</div>
      </div>}
      {markIn > 0.02 && <div style={{ position: "absolute", left: 760, top: 462 + Math.sin(lf / 18) * 2, transform: `scale(${markIn})`, zIndex: 6 }}><ClaudeMark size={78} glow={0.42 + Math.sin(lf / 11) * 0.12} /></div>}
      <Dust lf={lf} n={5} seed={3} />
    </Stage>
  );
};

// ============================ SCENE 3 — OBJECTIONS: cold buyer-Claude throws 3 icon objections at the offer ============================
const Objections: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const lf = f - fr(s);
  const markIn = eOut(f, fr(s) + 2, 16); const cardIn = eOut(f, fr(s) + 2, 16); const heat = ramp(lf, 150, 302);
  const bx = 210, by = 250, cx = 560, cy = 250;
  const M = [{ strike: 154, icon: "clock", ty: 198 }, { strike: 193, icon: "tag", ty: 270 }, { strike: 257, icon: "person", ty: 342 }];
  const strikes = (lf >= 154 ? 1 : 0) + (lf >= 193 ? 1 : 0) + (lf >= 257 ? 1 : 0); const stateT = Math.min(1, strikes / 3);
  const recoil = (t0: number) => lf > t0 ? Math.sin((lf - t0) / 2) * Math.exp(-(lf - t0) / 9) * 6 : 0;
  const jit = recoil(154) + recoil(193) + recoil(257);
  const bcol = `rgba(${Math.round(58 + stateT * 138)},${Math.round(92 - stateT * 18)},${Math.round(132 - stateT * 74)},1)`;
  const icon = (t: string) => t === "clock" ? <g fill="none" stroke="#fff" strokeWidth={2.4}><circle cx={12} cy={12} r={8} /><path d="M12 7 V12 L16 14" strokeLinecap="round" /></g> : t === "tag" ? <g fill="none" stroke="#fff" strokeWidth={2.4} strokeLinejoin="round"><path d="M4 4 H12 L20 12 L12 20 L4 12 Z" /><circle cx={8} cy={8} r={1.6} fill="#fff" /></g> : <g fill="none" stroke="#fff" strokeWidth={2.4}><circle cx={12} cy={8} r={3.4} /><path d="M5 20 C5 15 19 15 19 20" strokeLinecap="round" /></g>;
  const tx = cx - 150;
  return (
    <Stage>
      <Bloom cx={490} cy={246} w={1040} h={790} color={`rgba(${Math.round(58 + heat * 150)},${Math.round(92 - heat * 18)},${Math.round(132 - heat * 92)},0.2)`} lf={lf} />
      <Bloom cx={bx} cy={by} w={300} color="rgba(92,124,168,0.30)" lf={lf} />
      <Contact cx={bx} cy={by + 96} w={196} sx={0.85} op={0.3} />
      <div style={{ position: "absolute", left: bx - 66, top: by - 66 + Math.sin(lf / 14) * 3, transform: `scale(${markIn}) rotate(${-3 - ramp(lf, 74, 104) * 4}deg)`, zIndex: 6 }}>
        <div style={{ position: "relative", width: 132, height: 132 }}>
          <ClaudeMark size={132} glow={0} />
          <div style={{ position: "absolute", inset: 0, borderRadius: 37, boxShadow: "0 0 26px rgba(92,124,168,0.55)" }} />
          <div style={{ position: "absolute", inset: 0, borderRadius: 37, background: "rgba(58,92,132,0.20)", mixBlendMode: "multiply" }} />
        </div>
      </div>
      <Contact cx={cx} cy={cy + 186} w={264} sx={0.85} op={0.28} />
      <div style={{ position: "absolute", left: cx - 140, top: cy - 170, width: 280, height: 340, borderRadius: 18, background: grad("#FFFDF8", "#F1ECE0"), boxShadow: SH, border: `3px solid ${bcol}`, padding: 24, transform: `translateX(${jit}px) translateY(${Math.sin(lf / 12) * 3}px) scale(${cardIn})` }}>
        <div style={{ height: 30, width: 150, borderRadius: 8, background: grad("#5C7CA8", "#3A5C84"), marginBottom: 26 }} />
        {[0.86, 0.62, 0.74].map((w, i) => { const hit = lf > M[i].strike && lf < M[i].strike + 12; return <div key={i} style={{ height: 14, width: `${w * 100}%`, borderRadius: 99, background: hit ? RED : "rgba(58,92,132,0.3)", marginBottom: 34 }} />; })}
        <Sheen r={18} /><Glint r={18} t={ramp(lf, 257, 281)} />
      </div>
      {M.map((m, i) => { const t = eOut(f, fr(s) + m.strike - 26, 22); if (t <= 0.02) return null; const mx = bx + (tx - bx) * t, my = by + (m.ty - by) * t - Math.sin(t * Math.PI) * 40; const post = lf - m.strike; const landed = post >= 0; const sc = landed ? (i < 2 ? 1 + Math.sin(post / 2) * Math.exp(-post / 8) * 0.18 : over(f, fr(s) + m.strike, 12)) : t; return <div key={i} style={{ position: "absolute", left: mx - 23, top: my - 23, width: 46, height: 46, borderRadius: "50%", background: grad("#D2624C", "#A8392B"), boxShadow: `${SH}${landed ? ", 0 0 18px rgba(196,74,58,0.5)" : ""}`, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${sc})`, zIndex: 8 }}><svg width={26} height={26} viewBox="0 0 24 24">{icon(m.icon)}</svg><Sheen r="50%" /></div>; })}
      {M.map((m, i) => { const burst = ramp(lf - m.strike, 0, 14); if (burst <= 0 || burst >= 1) return null; return <div key={i} style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 7 }}>{[0, 1, 2, 3, 4, 5].map((k) => { const a = (k / 6) * Math.PI * 2; return <div key={k} style={{ position: "absolute", left: tx + Math.cos(a) * burst * 28 - 3, top: m.ty + Math.sin(a) * burst * 28 - 3, width: 7, height: 7, borderRadius: "50%", background: AMBER, opacity: (1 - burst) * 0.9 }} />; })}</div>; })}
      <Dust lf={lf} n={6} seed={4} />
    </Stage>
  );
};

// ============================ SCENE 4 — REWRITE: a phone pulls in calls → "10" + green guarantee shield ============================
const Rewrite: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const lf = f - fr(s);
  const phoneIn = eOut(f, fr(s) + 0, 22); const green = ramp(lf, 0, 185);
  const tenIn = eOut(f, fr(s) + 40, 30); const tenPop = over(f, fr(s) + 120, 14); const tenGlint = ramp(lf, 120, 138);
  const shieldIn = eOut(f, fr(s) + 150, 22); const lock = ramp(lf, 170, 182); const markIn = eOut(f, fr(s) + 4, 16);
  const cx = 490, PHX = 396, PHY = 262;
  const bubbles = [{ t: 22, x: 900, y: 320 }, { t: 34, x: 920, y: 460 }, { t: 48, x: 880, y: 300 }, { t: 62, x: 930, y: 400 }, { t: 78, x: 870, y: 320 }, { t: 94, x: 910, y: 470 }];
  const bcol = `rgba(${Math.round(58 + green * 5)},${Math.round(92 + green * 66)},${Math.round(132 - green * 58)},0.2)`;
  return (
    <Stage>
      <Bloom cx={cx} cy={270} w={1020} h={780} color={bcol} lf={lf} base={0.5 + green * 0.08} />
      <Contact cx={PHX} cy={PHY + 216} w={250} sx={0.85} op={0.28} />
      <div style={{ position: "absolute", left: PHX - 100, top: PHY - 200, width: 200, height: 400, borderRadius: 34, background: grad("#4A6E9C", "#33507A"), boxShadow: SH, transform: `translateY(${(1 - phoneIn) * 24}px) rotate(${8 + Math.sin(lf / 26) * 0.8}deg) scale(${phoneIn})`, padding: 13 }}>
        <div style={{ position: "absolute", inset: 13, borderRadius: 24, background: grad("#33507A", "#274064") }}><div style={{ position: "absolute", top: 40, left: 26, right: 26, height: 10, borderRadius: 99, background: "rgba(120,150,190,0.3)" }} /></div><Sheen r={34} />
      </div>
      {bubbles.map((b, i) => { const t = eOut(f, fr(s) + b.t, 26); if (t <= 0.02 || t >= 1) return null; const mx = b.x + (PHX - b.x) * t, my = b.y + (PHY - b.y) * t - Math.sin(t * Math.PI) * 30; const sc = t < 0.85 ? 1 : 1 - (t - 0.85) / 0.15 * 0.3; return <div key={i} style={{ position: "absolute", left: mx - 28, top: my - 28, width: 56, height: 56, borderRadius: "50%", background: grad("#5C7CA8", "#3A5C84"), boxShadow: SH, display: "flex", alignItems: "center", justifyContent: "center", opacity: sc > 0.7 ? 1 : sc / 0.7, transform: `scale(${sc})`, zIndex: 6 }}><svg width={28} height={28} viewBox="0 0 24 24"><path d="M5 4 C5 4 8 4 9 7 C9.5 8.5 8 9 8 10 C8 13 11 16 14 16 C15 16 15.5 14.5 17 15 C20 16 20 19 20 19 C20 20.5 18.5 21 17 21 C10 21 3 14 3 7 C3 5.5 3.5 4 5 4 Z" fill="#fff" /></svg></div>; })}
      {bubbles.map((b, i) => { const burst = ramp(lf - (b.t + 26), 0, 14); if (burst <= 0 || burst >= 1) return null; return <div key={i} style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 7 }}>{[0, 1, 2, 3, 4].map((k) => { const a = (k / 5) * Math.PI * 2; return <div key={k} style={{ position: "absolute", left: PHX + Math.cos(a) * burst * 24 - 3, top: PHY + Math.sin(a) * burst * 24 - 3, width: 7, height: 7, borderRadius: "50%", background: AMBER, opacity: (1 - burst) * 0.85 }} />; })}</div>; })}
      {tenIn > 0.02 && <div style={{ position: "absolute", left: 556, top: 130, transform: `scale(${tenIn * tenPop})`, zIndex: 8 }}>
        <div style={{ position: "relative", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 216, lineHeight: 1, color: INK, letterSpacing: "-0.04em" }}>10<div style={{ position: "absolute", inset: 0, borderRadius: 20, overflow: "hidden" }}><Glint r={20} t={tenGlint} /></div></div>
      </div>}
      {shieldIn > 0.02 && <div style={{ position: "absolute", left: PHX - 64, top: PHY + 150 + (1 - shieldIn) * 44, width: 128, height: 136, transform: `scale(${shieldIn})`, opacity: shieldIn, zIndex: 8 }}>
        <svg width={128} height={136} viewBox="0 0 30 30"><defs><linearGradient id="shg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#48B083" /><stop offset="1" stopColor="#3F9E74" /></linearGradient></defs><path d="M15 3 L25 7 V15 C25 21 20 25 15 27 C10 25 5 21 5 15 V7 Z" fill="url(#shg)" stroke="rgba(255,255,255,0.4)" strokeWidth={1} />{lock > 0.1 && <path d="M10 15 l4 4 L21 11" fill="none" stroke="#fff" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" opacity={lock} />}</svg>
      </div>}
      <Contact cx={208} cy={356} w={148} sx={0.85} op={0.2} />
      <div style={{ position: "absolute", left: 164, top: 218 + Math.sin(lf / 24) * 4, transform: `scale(${markIn})`, zIndex: 6 }}><ClaudeMark size={88} glow={0.42 + ramp(lf, 22, 120) * 0.3 + Math.sin(lf / 11) * 0.1} /></div>
      <Dust lf={lf} n={5} seed={5} />
    </Stage>
  );
};

// ============================ SCENE 5 — PEAK: a switch — Claude slides off "approve-everything" 👍 onto the buyer ✗ ============================
const Peak: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const lf = f - fr(s);
  const railIn = eOut(f, fr(s) + 0, 26); const slide = eOut(f, fr(s) + 80, 30); const seat = over(f, fr(s) + 104, 12);
  const rim = ramp(lf, 100, 114); const glintT = ramp(lf, 104, 120); const tagIn = eOut(f, fr(s) + 6, 24); const tagStrike = ramp(lf, 10, 34);
  const cx = 490, cy = 285; const knobCx = (cx - 130) + slide * 260 + Math.max(0, seat - 1) * 40;
  const lDim = slide > 0.5 ? 0.45 : 1;
  const thumb = "M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z";
  const gr = Math.round(63 + slide * 133), gg = Math.round(158 - slide * 100), gb = Math.round(116 - slide * 71);
  return (
    <Stage>
      <Bloom cx={cx} cy={cy - 10} w={1010} h={780} color={`rgba(${Math.round(207 - slide * 149)},${Math.round(149 - slide * 57)},${Math.round(68 + slide * 64)},0.2)`} lf={lf} />
      {tagIn > 0.02 && <div style={{ position: "absolute", left: 686, top: 96, transform: `scale(${tagIn}) rotate(${Math.sin(lf / 22) * 3}deg)`, zIndex: 8 }}>
        <div style={{ position: "relative", padding: "8px 22px", borderRadius: 12, background: grad("#D2724E", "#C5603C"), boxShadow: SH, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 40, color: "#F6EFE6" }}>$297<div style={{ position: "absolute", left: 10, top: 34, width: 88 * tagStrike, height: 6, borderRadius: 4, background: RED, transform: "rotate(-8deg)", transformOrigin: "left" }} /><Sheen r={12} /></div>
      </div>}
      <Contact cx={cx} cy={cy + 100} w={500} sx={0.9} op={0.28} />
      {/* recessed switch track */}
      <div style={{ position: "absolute", left: cx - 240, top: cy - 58, width: 480, height: 116, borderRadius: 58, background: grad("#FFFDF8", "#EFE7D7"), boxShadow: `${SH}, inset 0 9px 22px rgba(26,24,19,0.22)`, transform: `scale(${railIn})`, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: 58, background: `radial-gradient(circle at ${10 + slide * 80}% 50%, rgba(${gr},${gg},${gb},0.28), transparent 60%)` }} />
        <Sheen r={58} />
      </div>
      {/* LEFT end-marker: cheerleader 👍 (small, flat, recessed) */}
      <div style={{ position: "absolute", left: cx - 200 - 28, top: cy - 28, width: 56, height: 56, borderRadius: "50%", background: grad("#56B488", "#3F9E74"), boxShadow: "inset 0 2px 5px rgba(26,24,19,0.25)", display: "flex", alignItems: "center", justifyContent: "center", opacity: lDim * railIn, filter: slide > 0.5 ? "saturate(0.55)" : "none", zIndex: 4 }}><svg width={30} height={30} viewBox="0 0 24 24" fill="#fff"><path d={thumb} /></svg></div>
      {/* RIGHT end-marker: the buyer ✗ (slate→red as Claude arrives) */}
      <div style={{ position: "absolute", left: cx + 200 - 28, top: cy - 28, width: 56, height: 56, borderRadius: "50%", background: rim > 0.4 ? grad("#D2624C", "#A8392B") : grad("#5C7CA8", "#3A5C84"), boxShadow: `inset 0 2px 5px rgba(26,24,19,0.25)${rim > 0.4 ? ", 0 0 18px rgba(196,74,58,0.5)" : ""}`, display: "flex", alignItems: "center", justifyContent: "center", opacity: (0.6 + rim * 0.4) * railIn, zIndex: 4 }}><svg width={28} height={28} viewBox="0 0 24 24"><path d="M6 6 L18 18 M18 6 L6 18" stroke="#fff" strokeWidth={3.8} strokeLinecap="round" /></svg></div>
      {/* Claude KNOB — the big raised slider */}
      <div style={{ position: "absolute", left: knobCx - 78, top: cy + 56, width: 156, height: 30, borderRadius: "50%", background: `radial-gradient(ellipse, rgba(20,26,45,0.32), transparent 70%)`, filter: "blur(6px)", zIndex: 5 }} />
      <div style={{ position: "absolute", left: knobCx - 90, top: cy - 90, width: 180, height: 180, borderRadius: "50%", background: `radial-gradient(circle, rgba(${gr},${gg},${gb},0.30), transparent 62%)`, zIndex: 5 }} />
      <div style={{ position: "absolute", left: knobCx - 56, top: cy - 56, width: 112, height: 112, zIndex: 7 }}>
        <div style={{ position: "relative", width: 112, height: 112, transform: `rotate(${rim * 4}deg)`, filter: "drop-shadow(0 10px 18px rgba(20,26,45,0.4))" }}>
          <ClaudeMark size={112} glow={(1 - rim) * (0.44 + Math.sin(lf / 14) * 0.1)} />
          <div style={{ position: "absolute", inset: 0, borderRadius: 32, boxShadow: "0 0 24px rgba(92,124,168,0.65)", opacity: rim }} />
        </div>
        <div style={{ position: "absolute", inset: 0, borderRadius: 32, overflow: "hidden" }}><Glint r={32} t={glintT} /></div>
      </div>
      <Dust lf={lf} n={6} seed={6} />
    </Stage>
  );
};
// ============================ SCENE 6 — CTA: a comment row types OFFER → the prompt file is sent ============================
const CTA: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const lf = f - fr(s); if (lf < 0) return null;
  const rowIn = eOut(f, fr(s) + 0, 14); const caret = Math.sin(lf / 4) > 0;
  const typed = ramp(lf, 10, 26); const nch = Math.floor(typed * 5); const fire = over(f, fr(s) + 26, 10);
  const fileIn = over(f, fr(s) + 30, 16); const green = ramp(lf, 30, 46); const chk = over(f, fr(s) + 40, 10); const glintT = ramp(lf, 32, 46);
  const cx = 490, cy = 270;
  return (
    <>
      <Stage>
        <Bloom cx={cx} cy={cy} w={1010} h={780} color={`rgba(58,${Math.round(92 + green * 56)},${Math.round(132 - green * 12)},0.2)`} lf={lf} />
        {fileIn > 0.02 && <div style={{ position: "absolute", left: cx - 112, top: cy - 130 + (1 - fileIn) * 56, width: 224, height: 92, borderRadius: 18, background: grad("#FFFDF8", "#F1ECE0"), boxShadow: `${SH}${green > 0.3 ? `, 0 0 ${green * 22}px rgba(63,158,116,0.4)` : ""}`, padding: "0 18px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 9, transform: `scale(${fileIn})`, zIndex: 7 }}>
          <div style={{ height: 11, width: "82%", borderRadius: 99, background: grad("#4A6E9C", "#34507A") }} /><div style={{ height: 8, width: "52%", borderRadius: 99, background: "rgba(58,92,132,0.3)" }} />
          {chk > 0.02 && <div style={{ position: "absolute", top: -12, right: -10, width: 30, height: 30, borderRadius: "50%", background: GREEN, boxShadow: "0 6px 14px rgba(63,158,116,0.5)", display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${chk})` }}><Ic t="check" s={18} /></div>}
          <Sheen r={18} /><div style={{ position: "absolute", inset: 0, borderRadius: 18, overflow: "hidden" }}><Glint r={18} t={glintT} /></div>
        </div>}
        <Contact cx={cx} cy={cy + 78} w={320} sx={0.8 + Math.min(1, rowIn) * 0.2} op={0.28} />
        <div style={{ position: "absolute", left: 152, top: cy - 38, width: 76, height: 76, borderRadius: "50%", background: grad("#A6B8D2", "#5C7CA8"), boxShadow: SH, transform: `scale(${rowIn})`, overflow: "hidden", zIndex: 5 }}><svg width={76} height={76} viewBox="0 0 76 76"><circle cx={38} cy={30} r={15} fill="#EFE8D9" /><path d="M14 70 Q38 46 62 70 Z" fill="#EFE8D9" /></svg><Sheen r="50%" /></div>
        <div style={{ position: "absolute", left: cx - 200, top: cy - 48, width: 520, height: 96, borderRadius: 999, background: grad("#FFFDF8", "#EFE6D6"), border: "2px solid rgba(58,92,132,0.45)", boxShadow: SH, display: "flex", alignItems: "center", padding: "0 14px 0 30px", transform: `scale(${rowIn})`, zIndex: 4 }}>
          <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 48, color: CLAY, letterSpacing: "0.03em" }}>{"OFFER".slice(0, nch)}</span>
          <span style={{ opacity: caret ? 0.7 : 0, fontSize: 46, color: CLAY, fontWeight: 300, marginLeft: 2 }}>|</span>
          <div style={{ marginLeft: "auto", width: 72, height: 72, transform: `scale(${1 + (fire > 1 ? (fire - 1) * 0.4 : 0)})` }}><ClaudeMark size={72} glow={0.4 + (nch >= 5 ? 0.2 : 0) + Math.sin(lf / 8) * 0.08} /></div>
        </div>
        <Dust lf={lf} n={6} seed={7} />
      </Stage>
      <div style={{ position: "absolute", top: 1138, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 16, opacity: eOut(f, fr(s) + 6, 14) }}>
        <div style={{ position: "relative", transform: `scale(${1 + Math.sin(lf / 7) * 0.025})`, padding: "22px 50px", borderRadius: 999, background: grad("#E08A66", "#C5603C"), boxShadow: `${SH}, 0 0 44px rgba(210,114,78,0.42)`, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 56, color: "#fff", display: "flex", alignItems: "center", gap: 14, whiteSpace: "nowrap" }}>💬 Comment “OFFER”<Sheen r={999} /></div>
        <div style={{ fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 600, fontSize: 44, color: INK, textShadow: "0 2px 16px rgba(236,233,226,0.95)" }}>and I’ll send you the exact prompt</div>
      </div>
    </>
  );
};

const Sfx: React.FC<{ at: number; src: string; vol?: number }> = ({ at, src, vol = 0.4 }) => (<Sequence from={fr(at)} durationInFrames={fr(4)}><Audio src={staticFile(`sfx/${src}`)} volume={vol} /></Sequence>);
const SfxTrack: React.FC = () => (<>
  <Sfx at={L[0]} src="riser.wav" vol={0.26} /><Sfx at={L[0]} src="swooshup.wav" vol={0.28} /><Sfx at={L[0] + 5.0} src="snap.wav" vol={0.34} /><Sfx at={L[0] + 5.45} src="boom.wav" vol={0.4} /><Sfx at={L[0] + 5.5} src="sparkle.wav" vol={0.3} />
  <Sfx at={L[1] + 0.3} src="swish.wav" vol={0.24} /><Sfx at={L[1] + 3.0} src="swooshdn.wav" vol={0.3} /><Sfx at={L[1] + 3.07} src="impact.wav" vol={0.34} />
  <Sfx at={L[2] + 0.1} src="thock.wav" vol={0.32} /><Sfx at={L[2] + 0.55} src="blip3.wav" vol={0.24} /><Sfx at={L[2] + 1.15} src="blip3.wav" vol={0.24} />
  <Sfx at={L[3] + 4.0} src="snap.wav" vol={0.3} />{[154, 193, 257].map((t, i) => <Sfx key={i} at={L[3] + t / 30} src="blip2.wav" vol={0.26} />)}
  <Sfx at={L[4] + 1.9} src="swooshup.wav" vol={0.26} /><Sfx at={L[4] + 6.8} src="resolve.wav" vol={0.32} /><Sfx at={L[4] + 6.85} src="sparkle.wav" vol={0.28} />
  <Sfx at={L[5] + 0.3} src="boom.wav" vol={0.36} /><Sfx at={L[5] + 5.27} src="snap.wav" vol={0.34} /><Sfx at={L[5] + 5.6} src="resolve.wav" vol={0.3} />
  <Sfx at={L[6] + 1.0} src="sparkle.wav" vol={0.3} /><Sfx at={L[6] + 1.05} src="thock.wav" vol={0.3} />
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
    <AbsoluteFill style={{ opacity: 0.05, mixBlendMode: "multiply" }}><svg width="100%" height="100%"><filter id="ppA"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves={2} stitchTiles="stitch" /></filter><rect width="100%" height="100%" filter="url(#ppA)" /></svg></AbsoluteFill>
    <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 42%, rgba(0,0,0,0) 58%, rgba(86,62,34,0.06) 100%)" }} />
  </AbsoluteFill>);
};

const L = [0.0, 6.08, 11.59, 15.25, 25.75, 33.49, 40.56];
const VEND = 43.0;

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
        <div>People sell this 1 <span style={{ color: CLAY }}>Claude</span> prompt</div>
        <div style={{ opacity: l2 }}>for <span style={{ color: CLAY }}>$297</span>. Here it's free.</div>
      </div>
    </div>
  );
};

export const ClaudeOfferReel: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 16, 28], [1.0, 1.09, 1.0], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  return (
    <AbsoluteFill style={{ backgroundColor: "#EFE8D9", fontFamily: inter.fontFamily }}>
      <Audio src={staticFile("vo_offer.wav")} />
      <Audio src={staticFile("music_offer.wav")} volume={0.25} />
      <SfxTrack />
      <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "50% 46%" }}>
        <Background />
        <Ambient />
        <Scene s={L[0]} e={L[1]}><Hook s={L[0]} /></Scene>
        <Scene s={L[1]} e={L[2]}><Foreshadow s={L[1]} /></Scene>
        <Scene s={L[2]} e={L[3]}><Example s={L[2]} /></Scene>
        <Scene s={L[3]} e={L[4]}><Objections s={L[3]} /></Scene>
        <Scene s={L[4]} e={L[5]}><Rewrite s={L[4]} /></Scene>
        <Scene s={L[5]} e={L[6]}><Peak s={L[5]} /></Scene>
        <CTA s={L[6]} />
        <HeroHeader />
        <Captions />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
