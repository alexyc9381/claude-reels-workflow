import React from "react";
import { AbsoluteFill, Audio, Easing, Img, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { fraunces, frauncesItalic, inter } from "./fonts";
import wordsData from "./data/words_ask.json";

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
const EMPH = new Set(["stop", "20", "questions", "wrong", "five", "5", "rounds", "interrogation", "skill", "skill.", "interviews", "constraints", "nails", "first", "one", "ask", "ask,", "picture,"]);
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
    if (c.line === 6) return null;
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

// ============================ SCENE 0 — HOOK: commands barrage Claude → rejected → Claude erupts 20 "?" ============================
const Hook: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const lf = f - fr(s);
  const markIn = eOut(f, fr(s) + 2, 16);
  const cx = 490, cy = 248;
  const chips = [{ sx: -360, sy: 206, ix: 338, iy: 250, t: 4 }, { sx: 1340, sy: 296, ix: 644, iy: 250, t: 18 }, { sx: -320, sy: -16, ix: 350, iy: 200, t: 32 }];
  const mp = lf >= 50 && lf <= 64 ? 1 + Math.sin(ramp(lf, 50, 64) * Math.PI) * 0.09 : 1;       // ONE pulse on the flip
  const near = [[300, 250], [685, 250], [392, 142], [592, 142], [372, 364], [612, 364]];
  const mid = [[228, 168], [754, 168], [222, 340], [758, 340], [490, 108]];
  const far = [[168, 250], [820, 250], [490, 456]];
  const counter = Math.round(ramp(lf, 78, 94) * 20);
  const claygrow = ramp(lf, 52, 78);
  return (
    <Stage>
      <Bloom cx={cx} cy={cy} w={1000} h={760} color="rgba(58,92,132,0.22)" lf={lf} />
      <div style={{ position: "absolute", left: cx - 175, top: cy - 155, width: 350, height: 310, borderRadius: "50%", background: `radial-gradient(circle, rgba(210,114,78,${0.16 + claygrow * 0.2}), transparent 60%)`, opacity: 0.6 + Math.sin(lf / 9) * 0.2 }} />
      {/* FAR "?" tokens (behind, recede) */}
      {far.map((p, i) => { const t = eOut(f, fr(s) + 62 + i * 2, 20); if (t <= 0.02) return null; const x = cx + (p[0] - cx) * t, y = cy + (p[1] - cy) * t; return <div key={"f" + i} style={{ position: "absolute", left: x - 16, top: y - 16, opacity: t * 0.62, filter: "blur(1.4px)", transform: `scale(${0.5 + t * 0.5})` }}><QTok size={32} glow={0.25} /></div>; })}
      <Contact cx={cx} cy={cy + 146} w={200} sx={0.82} op={0.3} />
      {/* command chips barrage + red ban */}
      {chips.map((c, i) => { const fly = eOut(f, fr(s) + c.t, 11); const ban = over(f, fr(s) + c.t + 9, 11); const fade = eIn(lf, c.t + 15, 16); if (fade >= 1 || fly <= 0.01) return null; const x = c.sx + (c.ix - c.sx) * fly, y = c.sy + (c.iy - c.sy) * fly; const op = Math.min(1, fly * 2) * (1 - fade);
        return (<div key={"c" + i} style={{ position: "absolute", left: x - 125, top: y - 31, width: 250, height: 62, opacity: op, transform: `translateX(${ban > 0 && ban < 1 ? Math.sin(ban * 9) * 5 : 0}px)` }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: 14, background: grad("#FFFDF8", "#F2EEE4"), boxShadow: SH, borderLeft: `7px solid ${SLATE}`, display: "flex", alignItems: "center", padding: "0 14px", gap: 10 }}>
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 20, color: SLATE2 }}>{"›"}</span>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 7 }}><div style={{ height: 8, width: "78%", borderRadius: 99, background: "rgba(58,92,132,0.4)" }} /><div style={{ height: 6, width: "48%", borderRadius: 99, background: "rgba(58,92,132,0.22)" }} /></div>
            <Sheen r={14} />
          </div>
          {ban > 0.02 && <div style={{ position: "absolute", left: 92, top: -2, width: 66, height: 66, borderRadius: "50%", background: "#FFF", border: `5px solid ${RED}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 14px rgba(196,74,58,0.4)", transform: `scale(${ban})` }}><Ic t="ban" s={38} c={RED} /></div>}
        </div>); })}
      {/* Claude mark hero (pulses on the flip) */}
      <div style={{ position: "absolute", left: cx - 66, top: cy - 66 + Math.sin(lf / 20) * 4, transform: `scale(${markIn * mp})`, zIndex: 5 }}><ClaudeMark size={132} glow={0.36 + claygrow * 0.3 + Math.sin(lf / 8) * 0.1} /></div>
      {/* NEAR + MID "?" tokens erupt outward */}
      {[...near.map((p) => ({ p, sz: 56, t0: 56 })), ...mid.map((p) => ({ p, sz: 44, t0: 60 }))].map((o, i) => { const t = eOut(f, fr(s) + o.t0 + (i % 6) * 1.4, 18); if (t <= 0.02) return null; const x = cx + (o.p[0] - cx) * t, y = cy + (o.p[1] - cy) * t + Math.sin(lf / 16 + i) * 3; return <div key={"n" + i} style={{ position: "absolute", left: x - o.sz / 2, top: y - o.sz / 2, transform: `scale(${0.4 + t * 0.6})`, opacity: t, zIndex: 6 }}><QTok size={o.sz} glow={0.5} /></div>; })}
      {/* 20 questions pill */}
      {lf > 76 && <div style={{ position: "absolute", left: cx - 92, top: cy + 92, width: 184, height: 52, borderRadius: 26, background: grad("#FBF7EF", "#EFEADF"), boxShadow: SH, display: "flex", alignItems: "center", justifyContent: "center", gap: 9, transform: `scale(${over(f, fr(s) + 76, 12)})`, zIndex: 7 }}><span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 30, color: CLAY }}>{counter}</span><span style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 24, color: SLATE }}>questions</span><Sheen r={26} /></div>}
      <Dust lf={lf} n={6} seed={1} />
    </Stage>
  );
};

// front-elevation house (slate body + roof + door + lit windows + chimney); `off` = built wrong/off-register
const House: React.FC<{ w: number; lit: number; off?: boolean }> = ({ w, lit, off = false }) => {
  const s = w / 186; const id = Math.round(w * 10);
  return (
    <svg width={186 * s} height={200 * s} viewBox="0 0 186 200" style={{ overflow: "visible", filter: "drop-shadow(0 12px 24px rgba(20,26,45,0.26))" }}>
      <defs>
        <linearGradient id={"hb" + id} x1="0" y1="0" x2="1" y2="0.5"><stop offset="0" stopColor="#7088B0" /><stop offset="0.52" stopColor="#3A5C84" /><stop offset="1" stopColor="#2C466A" /></linearGradient>
        <linearGradient id={"hr" + id} x1="0.2" y1="0" x2="0.6" y2="1"><stop offset="0" stopColor="#46618C" /><stop offset="1" stopColor="#22344E" /></linearGradient>
        <radialGradient id={"hw" + id} cx="0.5" cy="0.38" r="0.75"><stop offset="0" stopColor="#FFEAC0" /><stop offset="1" stopColor="#CF9544" /></radialGradient>
      </defs>
      <rect x={124} y={16} width={24} height={54} rx={4} fill={`url(#hr${id})`} /><rect x={119} y={12} width={34} height={11} rx={4} fill="#22344E" />
      <polygon points="93,2 184,80 2,80" fill={`url(#hr${id})`} />
      <polygon points="93,2 2,80 93,80" fill="rgba(255,255,255,0.07)" />
      <line x1={93} y1={6} x2={93} y2={78} stroke="rgba(255,255,255,0.16)" strokeWidth={1.5} />
      <rect x={16} y={80} width={154} height={120} rx={8} fill={`url(#hb${id})`} />
      <rect x={16} y={80} width={154} height={15} rx={8} fill="rgba(255,255,255,0.13)" />
      <rect x={off ? 84 : 71} y={138} width={44} height={62} rx={6} fill="#1C2A40" /><circle cx={off ? 121 : 108} cy={172} r={3.2} fill="#CF9544" />
      {[[36, 102], [110, off ? 114 : 102]].map((p, i) => <g key={i}>
        <rect x={p[0]} y={p[1]} width={40} height={40} rx={6} fill={lit > 0.1 ? `url(#hw${id})` : "#1C2A40"} style={lit > 0.3 ? { filter: `drop-shadow(0 0 ${lit * 12}px rgba(207,149,68,0.75))` } : undefined} />
        <line x1={p[0] + 20} y1={p[1]} x2={p[0] + 20} y2={p[1] + 40} stroke="rgba(40,30,20,0.3)" strokeWidth={2} /><line x1={p[0]} y1={p[1] + 20} x2={p[0] + 40} y2={p[1] + 20} stroke="rgba(40,30,20,0.3)" strokeWidth={2} />
      </g>)}
    </svg>
  );
};
// ============================ SCENE 1 — PROBLEM: Claude (3D PRINTER) confidently prints the WRONG part → reprints 5× ============================
const Problem: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const lf = f - fr(s);
  const markIn = eOut(f, fr(s) + 2, 16); const feed = eOut(f, fr(s) + 14, 18);
  const print = ramp(lf, 16, 60);                       // cube builds bottom-up
  const done = over(f, fr(s) + 66, 12);                  // smug green DONE
  const mism = over(f, fr(s) + 86, 12);                  // red MISMATCH (the ONE pop)
  const red = ramp(lf, 86, 168);
  const scrape = ramp(lf, 106, 124);
  const loop = lf > 122; const round = lf < 126 ? 1 : Math.min(5, 1 + Math.floor(ramp(lf, 128, 180) * 4));
  const rp4 = ramp(lf, 128, 180) * 4; const cfrac = rp4 - Math.floor(rp4); const cpop = lf > 126 ? 1 + Math.max(0, 1 - cfrac * 5) * 0.16 : 1;
  const rebuild = ramp(lf, 124, 156);                  // a fresh WRONG cube re-rises (keeps the bed alive during reprints)
  const carT = ramp(lf, 18, 60); const carriageX = 560 + Math.sin(lf / 6) * 60 * carT;
  const BX = 560, GY = 388;
  const starPts = Array.from({ length: 10 }, (_, i) => { const r = i % 2 ? 19 : 46; const a = -Math.PI / 2 + i * Math.PI / 5; return `${50 + Math.cos(a) * r},${50 + Math.sin(a) * r}`; }).join(" ");
  return (
    <Stage>
      <Bloom cx={520} cy={238} w={1010} h={770} color={`rgba(${Math.round(58 + red * 92)},${Math.round(92 - red * 22)},${Math.round(132 - red * 68)},0.2)`} lf={lf} />
      <div style={{ position: "absolute", left: 30, top: 90, width: 160, height: 160, borderRadius: "50%", background: "radial-gradient(circle, rgba(210,114,78,0.14), transparent 62%)" }} />
      {/* claude mark — the over-eager printer's brain */}
      <div style={{ position: "absolute", left: 62, top: 152, transform: `scale(${markIn})` }}><ClaudeMark size={96} glow={0.34 + print * 0.16 + Math.sin(lf / 8) * 0.1} /></div>
      <svg width={980} height={560} style={{ position: "absolute", inset: 0 }}><line x1={158} y1={206} x2={158 + feed * 280} y2={232} stroke={SLATE2} strokeWidth={5} strokeLinecap="round" strokeDasharray="3 13" opacity={0.55} /></svg>
      {/* STAR spec ghost (you asked for THIS) */}
      <div style={{ position: "absolute", left: 132, top: 156, opacity: markIn * 0.92 }}>
        <svg width={128} height={128} viewBox="0 0 100 100"><polygon points={starPts} fill={mism > 0.2 ? "rgba(196,74,58,0.10)" : "none"} stroke={mism > 0.2 ? RED : SLATE2} strokeWidth={2.5} strokeDasharray="6 6" /></svg>
        <div style={{ position: "absolute", top: 110, left: 44, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 12, letterSpacing: "0.16em", color: SLATE2, opacity: 0.7 }}>SPEC</div>
      </div>
      {/* printer gantry */}
      <div style={{ position: "absolute", left: 432, top: 86, width: 16, height: 344, borderRadius: 6, background: grad("#6E83A4", "#2C466E"), boxShadow: SH }} />
      <div style={{ position: "absolute", left: 680, top: 86, width: 16, height: 344, borderRadius: 6, background: grad("#6E83A4", "#2C466E"), boxShadow: SH }} />
      <div style={{ position: "absolute", left: 432, top: 86, width: 264, height: 16, borderRadius: 6, background: grad("#7088B0", "#34507A"), boxShadow: SH }}><Sheen r={6} /></div>
      <div style={{ position: "absolute", left: 420, top: 424, width: 44, height: 18, borderRadius: 4, background: grad("#34507A", "#22344E") }} />
      <div style={{ position: "absolute", left: 664, top: 424, width: 44, height: 18, borderRadius: 4, background: grad("#34507A", "#22344E") }} />
      {/* carriage + nozzle on the rail — keeps sweeping all scene so the printer never looks frozen */}
      {lf > 14 && <div style={{ position: "absolute", left: carriageX - 32, top: 96, width: 64, height: 38, borderRadius: 8, background: grad("#6E83A4", "#34507A"), boxShadow: SH, zIndex: 7 }}>
        <div style={{ position: "absolute", left: 24, top: 36, width: 0, height: 0, borderLeft: "9px solid transparent", borderRight: "9px solid transparent", borderTop: "20px solid #CF9544" }} /><div style={{ position: "absolute", left: 28, top: 54, width: 8, height: 8, borderRadius: "50%", background: "#FFE9BF", boxShadow: "0 0 8px rgba(207,149,68,0.8)" }} /><Sheen r={8} />
      </div>}
      <Contact cx={BX} cy={GY + 30} w={290} sx={0.85} op={0.3} />
      {/* build plate */}
      <div style={{ position: "absolute", left: BX - 125, top: GY, width: 250, height: 26, borderRadius: 4, background: grad("#5C7CA8", "#34507A"), boxShadow: SH }}><Sheen r={4} /></div>
      {/* the WRONG cube — iso, builds up off the plate */}
      {print > 0.02 && <div style={{ position: "absolute", left: BX - 60, top: GY - 122, width: 120, height: 130, transformOrigin: "bottom center", transform: `scaleY(${print * (1 - scrape)}) translateX(${scrape * 220}px) rotate(${scrape * 26}deg)`, opacity: 1 - scrape, zIndex: 6 }}>
        <svg width={120} height={130} viewBox="0 0 120 130" style={{ filter: "drop-shadow(0 8px 16px rgba(20,26,45,0.22))" }}>
          <polygon points="60,6 112,36 60,66 8,36" fill="#7E96BE" /><polygon points="8,36 60,66 60,124 8,94" fill="#5C7CA8" /><polygon points="112,36 60,66 60,124 112,94" fill="#34507A" />
          <polyline points="8,36 60,66 112,36" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth={1.4} /><line x1={60} y1={66} x2={60} y2={124} stroke="rgba(0,0,0,0.12)" strokeWidth={1.4} />
        </svg>
      </div>}
      {/* green DONE chip */}
      {done > 0.02 && mism < 0.3 && <div style={{ position: "absolute", left: BX + 30, top: GY - 130, width: 64, height: 30, borderRadius: 999, background: grad("#56B488", "#3F9E74"), boxShadow: SH, display: "flex", alignItems: "center", justifyContent: "center", gap: 5, transform: `scale(${done})`, zIndex: 8 }}><Ic t="check" s={16} /><span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 13, color: "#fff" }}>DONE</span></div>}
      {/* red MISMATCH badge + star↔cube connector */}
      {mism > 0.02 && scrape < 0.7 && <><svg width={980} height={560} style={{ position: "absolute", inset: 0 }}><line x1={196} y1={220} x2={BX} y2={GY - 60} stroke={RED} strokeWidth={3} strokeDasharray="7 7" opacity={mism * 0.7} /></svg>
        <div style={{ position: "absolute", left: BX - 34, top: GY - 200, width: 68, height: 68, borderRadius: "50%", background: RED, boxShadow: "0 8px 18px rgba(196,74,58,0.5)", display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${mism})`, zIndex: 9 }}><svg width={34} height={34} viewBox="0 0 24 24"><path d="M6 6 L18 18 M18 6 L6 18" stroke="#fff" strokeWidth={3.6} strokeLinecap="round" /></svg></div></>}
      {/* scrape debris */}
      {scrape > 0.05 && scrape < 1 && [0, 1, 2, 3, 4].map((i) => { const dp = ramp(lf, 106 + i * 2, 126); return <div key={i} style={{ position: "absolute", left: BX - 30 + (rnd(i, 1) - 0.5) * 120, top: GY - 30 + dp * (50 + rnd(i, 2) * 26), width: 22, height: 16, borderRadius: 3, background: grad("#5C7CA8", "#34507A"), opacity: 1 - dp, transform: `rotate(${(rnd(i, 3) - 0.5) * 4 * dp * 90}deg)` }} />; })}
      {/* reprint phase: a fresh WRONG cube re-rises on the bed (bed stays alive — no frozen frame) */}
      {rebuild > 0.02 && scrape > 0.6 && <div style={{ position: "absolute", left: BX - 60, top: GY - 122, width: 120, height: 130, transformOrigin: "bottom center", transform: `scaleY(${rebuild})`, zIndex: 6 }}>
        <svg width={120} height={130} viewBox="0 0 120 130" style={{ filter: "drop-shadow(0 8px 16px rgba(20,26,45,0.22))" }}>
          <polygon points="60,6 112,36 60,66 8,36" fill="#7E96BE" /><polygon points="8,36 60,66 60,124 8,94" fill="#5C7CA8" /><polygon points="112,36 60,66 60,124 112,94" fill="#34507A" />
          <polyline points="8,36 60,66 112,36" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth={1.4} /><line x1={60} y1={66} x2={60} y2={124} stroke="rgba(0,0,0,0.12)" strokeWidth={1.4} />
        </svg>
      </div>}
      {/* continuous retry ring + orbiting ↻ + popping counter */}
      {loop && <>
        <svg width={980} height={560} style={{ position: "absolute", inset: 0 }}><circle cx={BX} cy={GY - 56} r={120} fill="none" stroke={RED} strokeWidth={4} strokeDasharray="6 18" opacity={0.3} transform={`rotate(${lf * 2.2} ${BX} ${GY - 56})`} /></svg>
        <div style={{ position: "absolute", left: BX + Math.cos(lf / 11 - 1.57) * 120 - 20, top: (GY - 56) + Math.sin(lf / 11 - 1.57) * 120 - 20, width: 40, height: 40, borderRadius: "50%", background: grad("#D2624C", "#A8392B"), boxShadow: SH, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 20, zIndex: 8 }}>↻</div>
        <div style={{ position: "absolute", left: BX - 70, top: GY + 78, width: 140, height: 48, borderRadius: 999, background: grad("#D2624C", "#A8392B"), boxShadow: SH, display: "flex", alignItems: "center", justifyContent: "center", gap: 9, transform: `scale(${over(f, fr(s) + 122, 12) * cpop})` }}><span style={{ fontFamily: fraunces.fontFamily, fontWeight: 800, fontSize: 24, color: "#fff" }}>{round}/5</span><span style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 12, letterSpacing: "0.1em", color: "rgba(255,255,255,0.85)" }}>REPRINTS</span><Sheen r={999} /></div>
      </>}
      <Dust lf={lf} n={5} seed={2} />
    </Stage>
  );
};

// ============================ SCENE 2 — SOLUTION: a brass KEY turns in Claude's keyhole → INTERROGATION unlocked ============================
const Solution: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const lf = f - fr(s);
  const cx = 490, cy = 248;
  const markIn = eOut(f, fr(s), 12);
  const fly = eOut(f, fr(s) + 4, 18);                  // key flies in + seats
  const turnR = ramp(lf, 30, 44);                      // turn 0→90°
  const unlock = ramp(lf, 36, 56); const power = ramp(lf, 36, 64);
  const core = over(f, fr(s) + 40, 14);                // clay "?" core rises
  const banner = over(f, fr(s) + 58, 13);
  const mp = lf >= 34 && lf <= 48 ? 1 + Math.sin(ramp(lf, 34, 48) * Math.PI) * 0.1 : 1;   // deadbolt thunk (ONE pop)
  const keyX = (1 - fly) * 380; const keyRot = (1 - fly) * -12 + turnR * 90;
  return (
    <Stage>
      <Bloom cx={cx} cy={cy} w={1010} h={770} color="rgba(58,92,132,0.2)" lf={lf} />
      <div style={{ position: "absolute", left: cx - 150, top: cy - 140, width: 300, height: 280, borderRadius: "50%", background: `radial-gradient(circle, rgba(210,114,78,${0.1 + power * 0.22}), transparent 60%)`, opacity: 0.6 + Math.sin(lf / 9) * 0.2 }} />
      <Contact cx={cx} cy={cy + 130} w={240 + unlock * 60} sx={1} op={0.32} />
      {/* Claude mark (the locked vessel) */}
      <div style={{ position: "absolute", left: cx - 82, top: cy - 82 + Math.sin(lf / 20) * 4, transform: `scale(${markIn * mp})`, zIndex: 5 }}><ClaudeMark size={164} glow={0.32 + power * 0.38 + Math.sin(lf / 8) * 0.1} /></div>
      {/* keyhole carved into the mark */}
      {core < 0.4 && <div style={{ position: "absolute", left: cx - 15, top: cy - 24, width: 30, height: 50, zIndex: 6 }}>
        <div style={{ position: "absolute", top: 0, left: 3, width: 24, height: 24, borderRadius: "50%", background: "radial-gradient(circle at 40% 35%, #2A1C12, #120A05)", boxShadow: "inset 0 2px 5px rgba(0,0,0,0.6)" }} />
        <div style={{ position: "absolute", top: 18, left: 10, width: 10, height: 30, background: "#160D06", clipPath: "polygon(0 0,100% 0,70% 100%,30% 100%)" }} />
      </div>}
      {/* clay "?" power core rising out */}
      {core > 0.02 && <div style={{ position: "absolute", left: cx - 32, top: cy - 46 + (1 - core) * 20, width: 64, height: 72, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${core})`, zIndex: 6 }}><span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 66, color: "#F6EFE6", textShadow: `0 0 ${power * 22}px rgba(210,114,78,0.85)` }}>?</span></div>}
      {/* unlock burst */}
      {unlock > 0 && unlock < 1 && [0, 1, 2, 3, 4, 5, 6, 7].map((i) => { const a = (i / 8) * Math.PI * 2; const d = 52 + unlock * 84; return <div key={i} style={{ position: "absolute", left: cx + Math.cos(a) * d - 3, top: cy + Math.sin(a) * d - 14, width: 6, height: 28, borderRadius: 3, background: AMBER, opacity: (1 - unlock) * 0.9, transform: `rotate(${a + 1.57}rad)`, zIndex: 4 }} />; })}
      {unlock > 0 && unlock < 1 && <div style={{ position: "absolute", left: cx - 160 * unlock, top: cy - 160 * unlock, width: 320 * unlock, height: 320 * unlock, borderRadius: "50%", border: `${5 * (1 - unlock)}px solid ${CLAY}`, opacity: (1 - unlock) * 0.6 }} />}
      {/* the brass skeleton key */}
      {fly > 0.01 && <div style={{ position: "absolute", left: cx - 60 + keyX, top: cy - 250, width: 120, height: 300, transformOrigin: "60px 250px", transform: `rotate(${keyRot}deg)`, zIndex: 8 }}>
        <svg width={120} height={300} viewBox="0 0 120 300" style={{ filter: "drop-shadow(0 6px 12px rgba(20,26,45,0.3))" }}>
          <defs><linearGradient id="brassk" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#EAC97C" /><stop offset="0.5" stopColor="#CF9544" /><stop offset="1" stopColor="#9A6A2E" /></linearGradient></defs>
          <circle cx={60} cy={44} r={34} fill="url(#brassk)" stroke="#F3DDA0" strokeWidth={1.5} /><circle cx={60} cy={44} r={17} fill="#EFE8D9" />
          <rect x={52} y={74} width={16} height={174} rx={6} fill="url(#brassk)" /><rect x={56} y={80} width={2} height={160} fill="rgba(110,74,30,0.5)" />
          <rect x={52} y={246} width={28} height={12} rx={2} fill="url(#brassk)" /><rect x={52} y={260} width={18} height={12} rx={2} fill="url(#brassk)" />
        </svg>
      </div>}
      {/* unlock banner */}
      {banner > 0.02 && <div style={{ position: "absolute", left: cx - 162, top: cy + 122, width: 324, height: 60, borderRadius: 30, background: grad("#FBF7EF", "#EFEADF"), border: "1.5px solid rgba(207,149,68,0.6)", boxShadow: SH, display: "flex", alignItems: "center", justifyContent: "center", gap: 11, transform: `scale(${banner})`, zIndex: 7 }}>
        <svg width={20} height={28} viewBox="0 0 120 300"><circle cx={60} cy={44} r={34} fill="#CF9544" /><circle cx={60} cy={44} r={17} fill="#EFE8D9" /><rect x={52} y={74} width={16} height={170} fill="#CF9544" /><rect x={52} y={246} width={26} height={12} fill="#CF9544" /></svg>
        <span style={{ fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 700, fontSize: 24, color: SLATE }}>interrogation skill</span><Sheen r={30} />
      </div>}
      <Dust lf={lf} n={6} seed={3} />
    </Stage>
  );
};

// ============================ SCENE 3 — MECHANISM: Claude INTERROGATES you — 4 question bubbles build your profile ============================
const Mechanism: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const lf = f - fr(s);
  const markIn = eOut(f, fr(s) + 2, 16); const youIn = eOut(f, fr(s) + 10, 16); const seam = ramp(lf, 0, 30);
  const qs = [
    { t: 80, ic: "target", c1: "#5C7CA8", c2: "#3A5C84", y: 152, ty: 166 },
    { t: 114, ic: "flag", c1: "#DDA85C", c2: "#CF9544", y: 214, ty: 224 },
    { t: 165, ic: "shield", c1: "#4A6E9C", c2: "#34507A", y: 286, ty: 282 },
    { t: 205, ic: "ban", c1: "#D2624C", c2: "#A8392B", y: 348, ty: 340 },
  ];
  const done = qs.filter((q) => lf > q.t + 18).length;
  const finalChk = over(f, fr(s) + 240, 12);
  const MX = 176, MY = 248, YX = 792, YY = 236;
  return (
    <Stage>
      <Bloom cx={490} cy={246} w={1040} h={790} color="rgba(58,92,132,0.2)" lf={lf} />
      <div style={{ position: "absolute", left: 489, top: 116, width: 2, height: 290, background: "rgba(58,92,132,0.14)", opacity: seam }} />
      {/* Claude — the interrogator (talking) */}
      <Contact cx={MX} cy={MY + 128} w={210} sx={0.85} op={0.3} />
      <div style={{ position: "absolute", left: MX - 66, top: MY - 66 + Math.sin(lf / 20) * 4, transform: `scale(${markIn})`, zIndex: 5 }}><ClaudeMark size={132} glow={0.36 + Math.sin(lf / 8) * 0.12} /></div>
      <div style={{ position: "absolute", left: MX + 38, top: MY + 40 + Math.sin(lf / 9) * 2, width: 42, height: 28, borderRadius: "14px 14px 14px 4px", background: grad("#E08A66", "#C5603C"), boxShadow: SH, opacity: markIn, zIndex: 5 }} />
      <div style={{ position: "absolute", left: MX - 24, top: MY + 164, width: 48, height: 30, borderRadius: 999, background: grad("#D2624C", "#A8392B"), boxShadow: SH, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 800, fontSize: 16, color: "#fff", opacity: markIn }}>{done}/4</div>
      {/* YOU — the subject */}
      <Contact cx={YX} cy={YY + 132} w={188} sx={0.85} op={0.3} />
      <div style={{ position: "absolute", left: YX - 75, top: YY - 75, width: 150, height: 150, borderRadius: 22, background: grad("#FFFDF8", "#F2EEE4"), boxShadow: SH, transform: `scale(${youIn})`, zIndex: 4 }}>
        <svg width={150} height={108} viewBox="0 0 150 108" style={{ position: "absolute", top: 12, left: 0 }}><circle cx={75} cy={40} r={22} fill={done > 0 ? SLATE2 : "#B4AFA2"} /><path d="M44 94 Q75 64 106 94 Z" fill={done > 0 ? SLATE2 : "#B4AFA2"} /></svg>
        <div style={{ position: "absolute", bottom: 12, left: 27, width: 96, height: 28, borderRadius: 8, background: grad("#5C7CA8", "#3A5C84"), display: "flex", alignItems: "center", justifyContent: "center", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 14, letterSpacing: "0.2em", color: "#fff" }}>YOU</div>
        <Sheen r={22} />
        {finalChk > 0.02 && <div style={{ position: "absolute", top: -16, right: -14, width: 50, height: 50, borderRadius: "50%", background: GREEN, boxShadow: "0 8px 16px rgba(63,158,116,0.5)", display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${finalChk})` }}><Ic t="check" s={28} /></div>}
      </div>
      {/* fact-tags clipping onto YOU's right (the profile builds) */}
      {qs.map((q, i) => { const tg = over(f, fr(s) + q.t + 16, 12); if (tg <= 0.02) return null; return <div key={"t" + i} style={{ position: "absolute", left: 814, top: q.ty, width: 128, height: 30, borderRadius: 999, background: grad(q.c1, q.c2), boxShadow: SH, display: "flex", alignItems: "center", padding: "0 8px", gap: 7, transform: `scale(${tg})`, transformOrigin: "left center", zIndex: 6 }}><div style={{ width: 19, height: 19, borderRadius: 6, background: "rgba(255,255,255,0.28)", display: "flex", alignItems: "center", justifyContent: "center" }}><Ic t={q.ic} s={12} /></div><div style={{ flex: 1, height: 6, borderRadius: 99, background: "rgba(255,255,255,0.62)" }} /><Sheen r={999} /></div>; })}
      {/* question bubbles fly Claude → YOU (one in flight) */}
      {qs.map((q, i) => { const tr = eOut(f, fr(s) + q.t, 16); const fade = eIn(lf, q.t + 22, 14); if (tr <= 0.01 || fade >= 1) return null; const x = 300 + (560 - 300) * tr; const pop = over(f, fr(s) + q.t, 11); const big = i === 3 ? 1.06 : 1; return (
        <div key={"q" + i} style={{ position: "absolute", left: x - 125, top: q.y - 32, width: 250, height: 64, borderRadius: 16, background: grad("#FFFDF8", "#F2EEE4"), boxShadow: SH, opacity: Math.min(1, tr * 2) * (1 - fade), transform: `scale(${pop * big})`, transformOrigin: "left center", zIndex: 7 }}>
          <div style={{ position: "absolute", left: -8, top: 38, width: 0, height: 0, borderTop: "11px solid transparent", borderBottom: "11px solid transparent", borderRight: "11px solid #FFFDF8" }} />
          <div style={{ position: "absolute", left: 13, top: 13, width: 38, height: 38, borderRadius: 10, background: grad(q.c1, q.c2), display: "flex", alignItems: "center", justifyContent: "center" }}><Ic t={q.ic} s={22} /></div>
          <div style={{ position: "absolute", left: 62, top: 17, right: 16, display: "flex", flexDirection: "column", gap: 8 }}><div style={{ height: 9, width: "74%", borderRadius: 99, background: grad(q.c1, q.c2) }} /><div style={{ height: 7, width: "50%", borderRadius: 99, background: "rgba(58,92,132,0.2)" }} /></div>
          <Sheen r={16} /><Glint r={16} t={ramp(lf, q.t, q.t + 14)} />
        </div>); })}
      <Dust lf={lf} n={6} seed={4} />
    </Stage>
  );
};

// ============================ SCENE 4 — PAYOFF: 20 questions → build → ✓ first try ============================
// the assembled "deliverable" picture that the jigsaw pieces carry (396x252)
const Deliv: React.FC<{ green: number }> = ({ green }) => (
  <div style={{ width: 396, height: 252, position: "relative", background: grad("#FFFDF8", "#F2EEE4") }}>
    <div style={{ position: "absolute", left: 16, top: 18, width: 42, height: 42 }}><ClaudeMark size={42} glow={0.3} /></div>
    <div style={{ position: "absolute", left: 70, top: 30, width: 150, height: 16, borderRadius: 99, background: grad("#5C7CA8", "#3A5C84") }} />
    <div style={{ position: "absolute", left: 16, top: 92, width: 360, height: 13, borderRadius: 99, background: "rgba(58,92,132,0.4)" }} />
    <div style={{ position: "absolute", left: 16, top: 120, width: 300, height: 13, borderRadius: 99, background: "rgba(58,92,132,0.3)" }} />
    <div style={{ position: "absolute", left: 16, top: 156, width: 150, height: 13, borderRadius: 99, background: grad("#DDA85C", "#CF9544") }} />
    <div style={{ position: "absolute", left: 16, top: 200, width: 320, height: 18, borderRadius: 99, background: "rgba(58,92,132,0.18)", overflow: "hidden" }}><div style={{ position: "absolute", inset: 0, width: `${green * 100}%`, background: grad("#56B488", "#3F9E74") }} /></div>
  </div>
);
// ============================ SCENE 4 — PAYOFF: 20 question-pieces lock into the FULL PICTURE → first try seal ============================
const Payoff: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const lf = f - fr(s);
  const boardIn = over(f, fr(s) + 2, 14); const land = ramp(lf, 2, 16);
  const cnt = Math.round(ramp(lf, 4, 34) * 20);
  const green = ramp(lf, 50, 66); const whole = ramp(lf, 113, 137); const warm = ramp(lf, 100, 150);
  const seal = over(f, fr(s) + 140, 14); const sealRing = ramp(lf, 140, 164);
  const BL = 268, BT = 82, WL = 292, WT = 112;     // board, well
  return (
    <Stage>
      <Bloom cx={490} cy={238} w={1040} h={790} color={`rgba(${Math.round(58 + warm * 30)},${Math.round(92 + warm * 60)},${Math.round(132 - warm * 24)},0.2)`} lf={lf} base={0.7 + warm * 0.1} />
      {/* claude builder + feed (delivers, no loop) */}
      <div style={{ position: "absolute", left: 74, top: 204 + Math.sin(lf / 22) * 3, transform: `scale(${eOut(f, fr(s) + 2, 14)})` }}><ClaudeMark size={92} glow={0.34 + Math.sin(lf / 8) * 0.1} /></div>
      <svg width={980} height={560} style={{ position: "absolute", inset: 0 }}><line x1={150} y1={250} x2={268} y2={238} stroke={SLATE2} strokeWidth={4} strokeLinecap="round" strokeDasharray="2 8" opacity={0.5} /></svg>
      <Contact cx={490} cy={GYpay()} w={360} sx={0.8 + Math.min(1, boardIn) * 0.2} op={0.3} />
      {/* board frame */}
      <div style={{ position: "absolute", left: BL, top: BT, width: 444, height: 300, borderRadius: 22, background: grad("#FFFCF5", "#EFE8DA"), border: `2px solid ${CLAY}`, boxShadow: `${SH}${whole > 0.1 ? `, 0 0 ${whole * 44}px rgba(210,114,78,0.22)` : ""}`, transform: `scale(${boardIn})` }}>
        {/* empty sockets grid */}
        <svg width={396} height={252} viewBox="0 0 396 252" style={{ position: "absolute", left: 24, top: 30 }}>{Array.from({ length: 12 }, (_, i) => { const c = i % 4, r = Math.floor(i / 4); return <rect key={i} x={c * 99 + 3} y={r * 84 + 3} width={93} height={78} rx={6} fill="none" stroke="rgba(58,92,132,0.16)" strokeWidth={2} strokeDasharray="5 6" />; })}</svg>
        <Sheen r={22} />
      </div>
      {/* 12 jigsaw pieces fly in L→R wave, each carries its picture fragment */}
      {Array.from({ length: 12 }, (_, i) => { const c = i % 4, r = Math.floor(i / 4); const fly = eOut(f, fr(s) + 6 + i * 1.6, 14); if (fly <= 0.02) return null; const cellX = WL + c * 99, cellY = WT + r * 84; const x = 120 + (cellX - 120) * fly, y = 250 + (cellY - 250) * fly; const snap = ramp(lf, 6 + i * 1.6 + 12, 6 + i * 1.6 + 18); return (
        <div key={i} style={{ position: "absolute", left: x, top: y, width: 99, height: 84, overflow: "hidden", borderRadius: 6, boxShadow: fly < 1 ? `${SH}` : "inset 0 0 0 1px rgba(255,255,255,0.18), inset 0 0 0 2px rgba(58,92,132,0.06)", opacity: Math.min(1, fly * 2.2), transform: `scale(${fly < 1 ? 1.04 : 1})`, zIndex: 4 }}>
          <div style={{ position: "absolute", left: -c * 99, top: -r * 84 }}><Deliv green={green} /></div>
          {snap > 0 && snap < 1 && <div style={{ position: "absolute", inset: 0, borderRadius: 6, boxShadow: `inset 0 0 ${snap * 14}px rgba(207,149,68,0.6)` }} />}
        </div>); })}
      {/* full-picture glint */}
      {whole > 0.05 && whole < 1 && <div style={{ position: "absolute", left: WL, top: WT, width: 396, height: 252, borderRadius: 8, overflow: "hidden", zIndex: 5 }}><Glint r={8} t={whole} /></div>}
      {/* 20 counter */}
      <div style={{ position: "absolute", left: 196, top: 474, width: 150, height: 52, borderRadius: 999, background: grad("#D2724E", "#C5603C"), boxShadow: SH, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transform: `scale(${over(f, fr(s) + 4, 12)})`, zIndex: 6 }}><span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 28, color: "#fff" }}>{cnt}</span><span style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 19, color: "rgba(255,255,255,0.9)" }}>Qs</span><Sheen r={999} /></div>
      {/* FIRST TRY wax seal (the one pop) */}
      {seal > 0.02 && <div style={{ position: "absolute", left: 636, top: 336, width: 96, height: 96, borderRadius: "50%", background: grad("#56B488", "#3F9E74"), border: "3px solid rgba(255,255,255,0.45)", boxShadow: `${SH}, 0 0 30px rgba(63,158,116,0.5)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", transform: `scale(${seal}) rotate(${(1 - seal) * 30 - 6}deg)`, zIndex: 9 }}><Ic t="check" s={30} /><span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 11, letterSpacing: "0.08em", color: "#fff", marginTop: 1 }}>FIRST TRY</span></div>}
      {sealRing > 0 && sealRing < 1 && <div style={{ position: "absolute", left: 684 - 150 * sealRing, top: 384 - 150 * sealRing, width: 300 * sealRing, height: 300 * sealRing, borderRadius: "50%", border: `${4 * (1 - sealRing)}px solid ${GREEN}`, opacity: (1 - sealRing) * 0.6 }} />}
      <Dust lf={lf} n={6} seed={5} />
    </Stage>
  );
};
function GYpay() { return 398; }

// ============================ SCENE 5 — RESULT: 5 → 1 stack-slam ============================
const Result: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const lf = f - fr(s);
  const charge = ramp(lf, 12, 22); const bolt = ramp(lf, 22, 27); const collapse = ramp(lf, 24, 31); const flash = ramp(lf, 28, 38);
  const card1 = over(f, fr(s) + 31, 12); const check = over(f, fr(s) + 34, 9); const one = over(f, fr(s) + 33, 12); const slam = ramp(lf, 28, 44);
  const cx = 490;
  const dc = lf < 22 ? 5 : Math.max(1, 5 - Math.floor(ramp(lf, 12, 22) * 4));
  return (
    <Stage>
      <Bloom cx={cx} cy={238} w={1020} h={760} color={`rgba(${Math.round(58 + slam * 90)},${Math.round(92 + slam * 8)},${Math.round(132 - slam * 34)},0.2)`} lf={lf} />
      <Contact cx={cx} cy={400} w={300} sx={0.6 + card1 * 0.4} op={0.34} />
      {/* stack */}
      {collapse < 1 && [0, 1, 2, 3, 4].map((i) => { const inn = over(f, fr(s) + i * 1.0, 7); const lean = (rnd(i, 1) - 0.5) * 5 + Math.sin((lf + i * 7) / 3) * (3 * (1 - collapse) + charge * 4); const baseY = 360 - i * 44; const y = baseY + (318 - baseY) * collapse; const x = cx + (i - 2) * 9 * (1 - collapse); if (inn <= 0.02) return null; return (
        <div key={i} style={{ position: "absolute", left: x - 150, top: y - 66, width: 300, height: 132, borderRadius: 18, background: grad("#FFFDF8", "#F2EEE4"), boxShadow: SH, transform: `rotate(${lean * (1 - collapse)}deg) scale(${(1 - i * 0.014) * inn * (1 - collapse * 0.0)})`, opacity: inn * (1 - collapse * 0.7), zIndex: i }}>
          <div style={{ position: "absolute", top: 14, left: 14, width: 44, height: 44, borderRadius: 13, background: grad("#D2624C", "#A8392B"), display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 24, color: "#fff" }}>{i === 4 ? dc : 5 - i}</div>
          {i === 4 && <div style={{ position: "absolute", top: 22, right: 16, fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 11, letterSpacing: "0.14em", color: SLATE }}>ROUNDS</div>}
          <div style={{ position: "absolute", bottom: 22, left: 70, right: 16, display: "flex", flexDirection: "column", gap: 8 }}>{[0.62, 0.44].map((w, j) => <div key={j} style={{ height: 8, width: `${w * 100}%`, borderRadius: 99, background: "rgba(58,92,132,0.28)" }} />)}</div>
          <Sheen r={18} />
        </div>); })}
      {/* bolt */}
      {bolt > 0 && bolt < 1 && <div style={{ position: "absolute", left: cx - 4, top: 120, width: 8, height: 300 * bolt, background: "linear-gradient(180deg,#FFF6DE,#CF9544)", boxShadow: "0 0 20px rgba(207,149,68,0.8)", opacity: 1 - flash }} />}
      {charge > 0.1 && <div style={{ position: "absolute", left: cx - 16, top: 110, width: 32, height: 32, borderRadius: "50%", background: "radial-gradient(circle,#FFF6DE,#CF9544)", boxShadow: "0 0 24px rgba(240,190,132,0.9)", opacity: charge * (1 - bolt) }} />}
      {flash > 0 && flash < 1 && <div style={{ position: "absolute", left: cx - 130, top: 318 - 130, width: 260, height: 260, borderRadius: "50%", background: "radial-gradient(circle,rgba(255,255,255,0.9),transparent 60%)", transform: `scale(${0.4 + flash * 1.3})`, opacity: Math.sin(flash * Math.PI) }} />}
      {/* giant 1 */}
      {one > 0.02 && <div style={{ position: "absolute", left: cx - 50, top: 92 + Math.sin(lf / 7) * 2, transform: `scale(${one})`, transformOrigin: "center bottom", fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 900, fontSize: 216, color: CLAY, textShadow: "0 2px 16px rgba(236,233,226,0.95)", lineHeight: 1, zIndex: 8 }}>1</div>}
      {/* merged card */}
      {card1 > 0.02 && <div style={{ position: "absolute", left: cx - 150, top: 318 - 75, width: 300, height: 150, borderRadius: 18, background: grad("#FFFDF8", "#F2EEE4"), border: `2px solid ${CLAY}`, boxShadow: `${SH}, 0 0 40px rgba(210,114,78,0.2)`, transform: `scale(${card1})`, zIndex: 10 }}>
        <div style={{ position: "absolute", top: 30, left: 30, right: 90, display: "flex", flexDirection: "column", gap: 12 }}>{[0.8, 0.6, 0.45].map((w, j) => <div key={j} style={{ height: 10, width: `${w * 100}%`, borderRadius: 99, background: j === 0 ? grad("#4A6E9C", "#34507A") : "rgba(58,92,132,0.2)" }} />)}</div>
        <div style={{ position: "absolute", bottom: 14, right: 14, width: 40, height: 40 }}><ClaudeMark size={40} glow={0.34} /></div>
        {check > 0.02 && <div style={{ position: "absolute", top: -18, right: -14, width: 58, height: 58, borderRadius: "50%", background: GREEN, boxShadow: `0 8px 18px rgba(63,158,116,0.5)`, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${check})` }}><Ic t="check" s={32} /></div>}
        <Sheen r={18} /><Glint r={18} t={ramp(lf, 31, 48)} />
      </div>}
      <Dust lf={lf} n={6} seed={6} />
    </Stage>
  );
};

// ============================ SCENE 6 — CTA: a Claude phone DM — "ASK" → reply delivers the skill ============================
const CTA: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const lf = f - fr(s); if (lf < 0) return null;
  const phoneIn = over(f, fr(s) + 2, 14); const land = ramp(lf, 2, 16);
  const ask = over(f, fr(s) + 10, 12);                  // ASK bubble pops (the ONE pop)
  const reply = lf > 22; const replyIn = over(f, fr(s) + 22, 12);
  const chk = over(f, fr(s) + 34, 11); const green = ramp(lf, 32, 44);
  const cx = 490, cy = 290, PX = 340, PY = 46;
  return (
    <>
      <Stage>
        <Bloom cx={cx} cy={cy - 36} w={1010} h={780} color={`rgba(58,${Math.round(92 + green * 58)},${Math.round(132 - green * 12)},0.2)`} lf={lf} />
        <div style={{ position: "absolute", left: cx - 160, top: cy - 200, width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(210,114,78,0.1), transparent 62%)" }} />
        <Contact cx={cx} cy={528} w={250} sx={0.8 + land * 0.2} op={0.32} />
        {/* phone */}
        <div style={{ position: "absolute", left: PX, top: PY, width: 300, height: 470, borderRadius: 46, background: grad("#FBF7EF", "#E7E1D4"), border: "3px solid #2C3E5A", boxShadow: SH, transform: `scale(${0.94 + phoneIn * 0.06}) translateY(${(1 - phoneIn) * 26}px)`, opacity: phoneIn }}>
          <div style={{ position: "absolute", left: 105, top: 16, width: 90, height: 11, borderRadius: 99, background: "#2C3E5A" }} />
          <div style={{ position: "absolute", left: 14, right: 14, top: 34, bottom: 14, borderRadius: 32, background: grad("#FFFDF8", "#F2EEE4"), overflow: "hidden", boxShadow: "inset 0 2px 8px rgba(34,30,24,0.1)" }}>
            {/* status / identity bar — unmistakably a Claude DM */}
            <div style={{ position: "absolute", top: 14, left: 16, right: 16, height: 30, display: "flex", alignItems: "center", gap: 8 }}><div style={{ width: 26, height: 26 }}><ClaudeMark size={26} glow={0.3} /></div><div style={{ width: 72, height: 15, borderRadius: 99, background: grad("#5C7CA8", "#3A5C84") }} /><div style={{ marginLeft: "auto", display: "flex", gap: 4 }}>{[0, 1].map((i) => <div key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(58,92,132,0.4)" }} />)}</div></div>
            <div style={{ position: "absolute", top: 54, left: 14, right: 14, height: 1, background: "rgba(58,92,132,0.14)" }} />
            {/* greeting bubble (left) */}
            <div style={{ position: "absolute", top: 74, left: 14, display: "flex", alignItems: "flex-end", gap: 6 }}><div style={{ width: 20, height: 20 }}><ClaudeMark size={20} glow={0.2} /></div><div style={{ width: 150, height: 44, borderRadius: "16px 16px 16px 4px", background: grad("#5C7CA8", "#3A5C84"), display: "flex", flexDirection: "column", justifyContent: "center", gap: 6, padding: "0 12px" }}><div style={{ height: 6, width: "80%", borderRadius: 99, background: "rgba(255,255,255,0.55)" }} /><div style={{ height: 6, width: "55%", borderRadius: 99, background: "rgba(255,255,255,0.4)" }} /></div></div>
            {/* HERO outgoing "ASK" bubble (right) */}
            {ask > 0.02 && <div style={{ position: "absolute", top: 150, right: 14, width: 132, height: 62, borderRadius: "18px 18px 4px 18px", background: grad("#E08A66", "#C5603C"), display: "flex", alignItems: "center", justifyContent: "center", boxShadow: SH, transform: `scale(${ask})`, transformOrigin: "bottom right" }}><span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 40, color: "#F6EFE6" }}>ASK</span><Sheen r={18} /></div>}
            {/* reply SKILL file card (left) */}
            {reply && <div style={{ position: "absolute", top: 240, left: 14, width: 224, height: 84, borderRadius: 16, background: grad("#FFFDF8", "#F2EEE4"), border: "1px solid rgba(255,255,255,0.6)", boxShadow: `${SH}${green > 0.3 ? `, 0 0 ${green * 24}px rgba(63,158,116,0.4)` : ""}`, display: "flex", alignItems: "center", gap: 11, padding: "0 14px", transform: `translateX(${(1 - replyIn) * -44}px)`, opacity: replyIn }}>
              <div style={{ width: 50, height: 50, borderRadius: 14, background: grad("#E08A66", "#C5603C"), display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 ${green * 14}px rgba(210,114,78,0.5)` }}><span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 29, color: "#F6EFE6" }}>?</span></div>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}><div style={{ height: 10, width: "88%", borderRadius: 99, background: grad("#4A6E9C", "#34507A") }} /><div style={{ height: 7, width: "55%", borderRadius: 99, background: "rgba(58,92,132,0.3)" }} /></div>
              {chk > 0.02 && <div style={{ width: 24, height: 24, borderRadius: "50%", background: GREEN, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${chk})` }}><Ic t="check" s={15} /></div>}
              <Sheen r={16} />
            </div>}
            {/* input bar */}
            <div style={{ position: "absolute", bottom: 12, left: 14, right: 14, height: 34, borderRadius: 999, background: grad("#FBF7EF", "#EFE6D6"), display: "flex", alignItems: "center", padding: "0 6px 0 14px" }}><div style={{ flex: 1, height: 6, borderRadius: 99, background: "rgba(58,92,132,0.2)" }} /><div style={{ width: 28, height: 28, borderRadius: "50%", background: grad("#E08A66", "#C5603C"), display: "flex", alignItems: "center", justifyContent: "center", marginLeft: 6 }}><Ic t="send" s={16} /></div></div>
            <Sheen r={32} />
          </div>
          <Sheen r={46} />
        </div>
        {green > 0.1 && green < 0.9 && [0, 1, 2].map((i) => { const a = (i / 3) * Math.PI * 2; const p = ramp(lf, 34, 46); return <div key={i} style={{ position: "absolute", left: cx - 80 + Math.cos(a) * p * 50, top: cy + 50 + Math.sin(a) * p * 50, fontSize: 20, color: CLAY, opacity: 1 - p }}>✦</div>; })}
        <Dust lf={lf} n={6} seed={7} />
      </Stage>
      <div style={{ position: "absolute", top: 1138, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 16, opacity: eOut(f, fr(s) + 6, 14) }}>
        <div style={{ position: "relative", transform: `scale(${1 + Math.sin(lf / 7) * 0.025})`, padding: "22px 50px", borderRadius: 999, background: grad("#E08A66", "#C5603C"), boxShadow: `${SH}, 0 0 44px rgba(210,114,78,0.42)`, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 56, color: "#fff", display: "flex", alignItems: "center", gap: 14, whiteSpace: "nowrap" }}>💬 Comment “ASK”<Sheen r={999} /></div>
        <div style={{ fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 600, fontSize: 44, color: INK, textShadow: "0 2px 16px rgba(236,233,226,0.95)" }}>and I’ll send you the skill</div>
      </div>
    </>
  );
};

// ===== audio / ambience / bg =====
const Sfx: React.FC<{ at: number; src: string; vol?: number }> = ({ at, src, vol = 0.4 }) => (<Sequence from={fr(at)} durationInFrames={fr(4)}><Audio src={staticFile(`sfx/${src}`)} volume={vol} /></Sequence>);
const SfxTrack: React.FC = () => (<>
  <Sfx at={L[0]} src="riser.wav" vol={0.3} /><Sfx at={L[0]} src="swooshup.wav" vol={0.3} /><Sfx at={L[0] + 0.5} src="boom.wav" vol={0.4} /><Sfx at={L[0] + 1.0} src="snap.wav" vol={0.3} />{[0, 1, 2, 3, 4].map((i) => <Sfx key={i} at={L[0] + 1.7 + i * 0.26} src="blip3.wav" vol={0.2} />)}
  <Sfx at={L[1] - 1.8} src="metal_riser.wav" vol={0.8} /><Sfx at={L[1] + 2.0} src="impact.wav" vol={0.32} />{[0, 1, 2, 3, 4].map((i) => <Sfx key={i} at={L[1] + 3.7 + i * 0.3} src="thock.wav" vol={0.24} />)}
  <Sfx at={L[2] + 0.95} src="swooshdn.wav" vol={0.3} /><Sfx at={L[2] + 1.3} src="snap.wav" vol={0.34} /><Sfx at={L[2] + 1.6} src="sparkle.wav" vol={0.3} />
  <Sfx at={L[3]} src="swish.wav" vol={0.22} />{[80, 113, 163, 203].map((t, i) => <Sfx key={i} at={L[3] + t / 30} src="blip2.wav" vol={0.24} />)}<Sfx at={L[3] + 8.2} src="resolve.wav" vol={0.3} />
  <Sfx at={L[4]} src="swish.wav" vol={0.22} /><Sfx at={L[4] + 1.4} src="snap.wav" vol={0.3} /><Sfx at={L[4] + 4.7} src="impact.wav" vol={0.32} /><Sfx at={L[4] + 4.8} src="resolve.wav" vol={0.3} />
  <Sfx at={L[5] + 0.73} src="boom.wav" vol={0.4} /><Sfx at={L[5] + 1.05} src="resolve.wav" vol={0.32} />
  <Sfx at={L[6] + 0.75} src="thock.wav" vol={0.34} /><Sfx at={L[6] + 1.4} src="sparkle.wav" vol={0.3} />
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

const L = [0.0, 3.81, 10.12, 13.04, 21.9, 28.73, 30.35];
const VEND = 31.85;

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
        <div>Make <span style={{ color: CLAY }}>Claude</span></div>
        <div style={{ opacity: l2 }}>read your <span style={{ color: CLAY }}>mind.</span></div>
      </div>
    </div>
  );
};

export const ClaudeAskReel: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 16, 28], [1.0, 1.09, 1.0], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  return (
    <AbsoluteFill style={{ backgroundColor: "#EFE8D9", fontFamily: inter.fontFamily }}>
      <Audio src={staticFile("vo_ask.wav")} />
      <Audio src={staticFile("music_ask.wav")} volume={0.25} />
      <SfxTrack />
      <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "50% 46%" }}>
        <Background />
        <Ambient />
        <Scene s={L[0]} e={L[1]}><Hook s={L[0]} /></Scene>
        <Scene s={L[1]} e={L[2]}><Problem s={L[1]} /></Scene>
        <Scene s={L[2]} e={L[3]}><Solution s={L[2]} /></Scene>
        <Scene s={L[3]} e={L[4]}><Mechanism s={L[3]} /></Scene>
        <Scene s={L[4]} e={L[5]}><Payoff s={L[4]} /></Scene>
        <Scene s={L[5]} e={L[6]}><Result s={L[5]} /></Scene>
        <CTA s={L[6]} />
        <HeroHeader />
        <Captions />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
