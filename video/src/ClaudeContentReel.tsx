import React from "react";
import { AbsoluteFill, Audio, Easing, Img, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { fraunces, frauncesItalic, inter } from "./fonts";
import wordsData from "./data/words_content.json";

/**
 * ClaudeContentReel — "Run your entire content team inside Claude" (5 Claude content skills).
 * Scenes art-director-redesigned: each graphic SEMANTICALLY MATCHES its skill, real social-post
 * imagery (bc*), big premium device/card heroes, centered framing, value header, redacted hook.
 */
const CREAM = "#ECE9E2", INK = "#1A1813", SLATE = "#3A5C84", SLATE2 = "#4C7BB0", CLAY = "#D2724E", AMBER = "#CF9544", GREEN = "#3F9E74", MUTE = "#9A968B", RED = "#C44A3A", PAPER = "#FBF7EF";
const FPS = 30; const fr = (s: number) => s * FPS; const CX = 540;
const eOut = (f: number, sF: number, d = 10) => interpolate(f, [sF, sF + d], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
const ramp = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const over = (f: number, sF: number, d = 12) => interpolate(f, [sF, sF + d * 0.5, sF + d], [0, 1.14, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
const grad = (a: string, b: string) => `linear-gradient(158deg, ${a} 0%, ${b} 100%)`;
const inter9: React.CSSProperties = { fontFamily: inter.fontFamily, fontWeight: 900 };
const CLAUDE_PATH = "m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z";
const SH = "inset 0 1.5px 0 rgba(255,255,255,0.5), 0 2px 4px rgba(34,30,24,0.22), 0 12px 26px rgba(34,30,24,0.20), 0 34px 64px rgba(20,26,45,0.26)";
const IMSH = "0 14px 30px rgba(40,32,20,0.26), 0 4px 10px rgba(40,32,20,0.14)";

const Sheen: React.FC<{ r: number | string; o?: number }> = ({ r, o = 0.3 }) => (<div style={{ position: "absolute", inset: 0, borderRadius: r, background: `linear-gradient(125deg, rgba(255,255,255,${o}) 0%, rgba(255,255,255,0) 32%)`, pointerEvents: "none" }} />);
const Bloom: React.FC<{ cx: number; cy: number; w: number; color: string; lf: number; base?: number }> = ({ cx, cy, w, color, lf, base = 0.55 }) => (<div style={{ position: "absolute", left: cx - w / 2, top: cy - w / 2, width: w, height: w, borderRadius: "50%", background: `radial-gradient(circle at 50% 46%, ${color} 0%, transparent 62%)`, opacity: base + Math.sin(lf / 9) * 0.2, pointerEvents: "none" }} />);
const ClaudeMark: React.FC<{ size: number; glow?: number }> = ({ size, glow = 0.4 }) => (
  <div style={{ position: "relative", width: size, height: size, borderRadius: size * 0.28, background: grad("#E08A66", "#C5603C"), boxShadow: `${SH}, 0 0 ${Math.round(size * 0.34)}px rgba(210,114,78,${glow})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
    <svg viewBox="0 0 24 24" width={size * 0.58} height={size * 0.58}><path fill="#F6EFE6" d={CLAUDE_PATH} /></svg><Sheen r={size * 0.28} />
  </div>);
const Slide: React.FC<{ src: string; w: number; h: number; r?: number; glow?: number }> = ({ src, w, h, r = 16, glow = 0 }) => (
  <div style={{ width: w, height: h, borderRadius: r, overflow: "hidden", background: "#fff", boxShadow: `${IMSH}${glow > 0 ? `, 0 0 ${glow * 30}px rgba(210,114,78,${glow * 0.7})` : ""}`, border: "3px solid #fff" }}>
    <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
  </div>);

// face-free social-post mockups (no people) — varied carousel/stat/quote/chart cards
const POSTS: { bg: string; el: React.ReactNode }[] = [
  { bg: grad("#26211A", "#15120E"), el: (<><div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 30, lineHeight: 1.08, letterSpacing: "-0.02em", color: "#F4EFE6" }}>5 <span style={{ color: "#E89A78" }}>hooks</span> that stop the scroll</div><div style={{ position: "absolute", left: 20, bottom: 18, fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 13, letterSpacing: "0.14em", color: "rgba(255,255,255,0.5)" }}>1 / 8</div></>) },
  { bg: grad("#FBF7EF", "#EFE9DD"), el: (<><div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 27, color: "#1A1813", lineHeight: 1.05 }}>3 ways to <span style={{ color: "#D2724E" }}>grow</span></div><div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 12 }}>{[1, 2, 3].map((k) => <div key={k} style={{ display: "flex", alignItems: "center", gap: 10 }}><div style={{ width: 24, height: 24, borderRadius: 7, background: "#D2724E", color: "#fff", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>{k}</div><div style={{ height: 10, flex: 1, borderRadius: 5, background: "rgba(58,92,132,0.22)" }} /></div>)}</div></>) },
  { bg: grad("#E08A66", "#C5603C"), el: (<div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}><div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 60, color: "#fff", lineHeight: 0.9 }}>+240%</div><div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 16, color: "rgba(255,255,255,0.92)", marginTop: 10 }}>reach in 30 days</div></div>) },
  { bg: grad("#41648E", "#2E4A6E"), el: (<><div style={{ fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 700, fontSize: 28, color: "#fff", lineHeight: 1.15 }}>Post less. Say more.</div><div style={{ position: "absolute", left: 20, bottom: 22, width: 64, height: 9, borderRadius: 5, background: "rgba(255,255,255,0.4)" }} /></>) },
  { bg: grad("#FBF7EF", "#EFE9DD"), el: (<><div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 26, color: "#1A1813" }}>The <span style={{ color: "#3F9E74" }}>5-post</span> week</div><div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 11 }}>{[0, 1, 2, 3].map((k) => <div key={k} style={{ display: "flex", alignItems: "center", gap: 9 }}><div style={{ width: 20, height: 20, borderRadius: "50%", background: "#3F9E74", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={3.6} strokeLinecap="round" strokeLinejoin="round"><path d="M4 12 L10 18 L20 6" /></svg></div><div style={{ height: 9, flex: 1, borderRadius: 5, background: "rgba(40,32,20,0.14)" }} /></div>)}</div></>) },
  { bg: grad("#FBF7EF", "#EFE9DD"), el: (<><div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 25, color: "#1A1813" }}>What actually <span style={{ color: "#D2724E" }}>converts</span></div><div style={{ position: "absolute", left: 20, right: 20, bottom: 20, height: 130, display: "flex", alignItems: "flex-end", gap: 12 }}>{[0.45, 0.72, 0.55, 1].map((bh, k) => <div key={k} style={{ flex: 1, height: `${bh * 100}%`, borderRadius: "7px 7px 0 0", background: k === 3 ? "#D2724E" : "rgba(58,92,132,0.5)" }} />)}</div></>) },
  { bg: grad("#15120E", "#26211A"), el: (<><div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 13, letterSpacing: "0.16em", color: "#E89A78", marginBottom: 10 }}>STEAL THIS</div><div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 30, color: "#F4EFE6", lineHeight: 1.06 }}>The 3-line caption formula</div></>) },
  { bg: grad("#3F9E74", "#2F7E5C"), el: (<div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}><div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 56, color: "#fff", lineHeight: 0.9 }}>0→50k</div><div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 16, color: "rgba(255,255,255,0.92)", marginTop: 10 }}>followers in 90 days</div></div>) },
];
const PostCard: React.FC<{ w: number; h: number; i: number; r?: number; glow?: number; bd?: boolean }> = ({ w, h, i, r = 16, glow = 0, bd = true }) => {
  const p = POSTS[((i % POSTS.length) + POSTS.length) % POSTS.length]; const sc = Math.max(w / 200, h / 250);
  return (<div style={{ width: w, height: h, borderRadius: r, overflow: "hidden", position: "relative", background: "#fff", boxShadow: `${IMSH}${glow > 0 ? `, 0 0 ${glow * 30}px rgba(210,114,78,${glow * 0.7})` : ""}`, border: bd ? "3px solid #fff" : "none" }}>
    <div style={{ position: "absolute", left: "50%", top: "50%", width: 200, height: 250, marginLeft: -100, marginTop: -125, transform: `scale(${sc})`, transformOrigin: "center" }}>
      <div style={{ position: "absolute", inset: 0, background: p.bg, padding: 20, overflow: "hidden" }}>{p.el}</div>
    </div></div>);
};

const Background: React.FC = () => { const f = useCurrentFrame(); const d = Math.sin(f / 90) * 6;
  return (<AbsoluteFill style={{ backgroundColor: CREAM }}>
    <AbsoluteFill style={{ transform: `translate(${d}px,${d * 0.6}px)`, backgroundImage: "linear-gradient(rgba(26,24,19,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(26,24,19,0.07) 1px,transparent 1px)", backgroundSize: "68px 68px" }} />
    <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 46%, rgba(0,0,0,0) 55%, rgba(40,32,20,0.10) 100%)" }} />
  </AbsoluteFill>); };

type Word = { word: string; start: number; end: number; line: number };
const WORDS = wordsData as Word[];
const cleanw = (w: string) => w.toLowerCase().replace(/[^a-z0-9']/g, "");
const EMPH = new Set(["content", "team", "claude", "30", "hooks", "week", "carousels", "captions", "shorts", "flop", "trends", "month", "agency", "stack", "comment", "five", "editor", "grade", "calendar", "repurpose"]);
const CHUNKS = (() => { const byLine: Record<number, Word[]> = {}; for (const w of WORDS) (byLine[w.line] ||= []).push(w);
  const out: { words: Word[]; start: number; line: number }[] = [];
  for (const li of Object.keys(byLine).map(Number).sort((a, b) => a - b)) { const ws = byLine[li]; for (let i = 0; i < ws.length; i += 3) { const g = ws.slice(i, i + 3); out.push({ words: g, start: g[0].start, line: li }); } }
  const aE = Math.max(...WORDS.map((w) => w.end)); return out.map((c, i) => ({ ...c, end: i + 1 < out.length ? out[i + 1].start : aE + 0.4 })); })();
const Captions: React.FC = () => { const frame = useCurrentFrame();
  return (<>{CHUNKS.map((c, i) => { if (frame < fr(c.start) || frame >= fr(c.end)) return null; if (c.line === 6) return null;
    return (<div key={i} style={{ position: "absolute", top: 1262, left: 64, right: 64, height: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "center", gap: "0 16px", width: 952, textAlign: "center" }}>
        {c.words.map((w, j) => { const g = EMPH.has(cleanw(w.word)); const shown = frame >= fr(w.start);
          return <span key={j} style={{ display: "inline-block", opacity: shown ? 1 : 0, fontFamily: g ? frauncesItalic.fontFamily : fraunces.fontFamily, fontStyle: g ? "italic" : "normal", fontWeight: g ? 700 : 600, fontSize: g ? 92 : 78, lineHeight: 1.04, color: g ? SLATE : INK, letterSpacing: "-0.02em", textShadow: "0 2px 16px rgba(236,233,226,0.95)" }}>{w.word}</span>; })}
      </div></div>); })}</>); };

const HeroHeader: React.FC = () => { const f = useCurrentFrame(); if (f > 252) return null;
  const appear = eOut(f, 0, 9); const out = eOut(f, 236, 14); const op = appear * (1 - out);
  const ty = (1 - appear) * 22 - out * 14; const sc = 0.965 + appear * 0.035; const l2 = eOut(f, 9, 9); const l3 = eOut(f, 17, 9);
  return (<div style={{ position: "absolute", top: 344, left: 70, right: 70, opacity: op, transform: `translateY(${ty}px) scale(${sc})`, transformOrigin: "left top", zIndex: 60 }}>
    <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 74, lineHeight: 1.04, letterSpacing: "-0.03em", color: INK, textShadow: "0 2px 18px rgba(236,233,226,0.96)" }}>
      <div>1 <span style={{ color: CLAY }}>Claude</span> setup runs</div>
      <div style={{ opacity: l2 }}>your whole content team</div>
      <div style={{ opacity: l3 }}>for <span style={{ color: CLAY }}>$0</span>.</div>
    </div></div>); };

const Scene: React.FC<{ s: number; e: number; children: React.ReactNode }> = ({ s, e, children }) => {
  const frame = useCurrentFrame(); const local = frame - fr(s); const lenF = fr(e - s); if (local < 0 || local > lenF) return null;
  const op = Math.min(eOut(frame, fr(s), 5), 1 - eOut(frame, fr(e - 0.18), 6)); const inE = eOut(frame, fr(s), 12);
  return <AbsoluteFill style={{ opacity: op, transform: `scale(${0.99 + inE * 0.01})` }}>{children}</AbsoluteFill>; };

const CommandBar: React.FC<{ s: number; n: number; cmd: string; persona: string; color: string }> = ({ s, n, cmd, persona, color }) => {
  const f = useCurrentFrame(); const lf = f - fr(s); const inn = over(f, fr(s) + 2, 12);
  const typed = Math.min(cmd.length, Math.floor(ramp(lf, 8, 24) * cmd.length)); const sent = ramp(lf, 26, 34);
  return (<div style={{ position: "absolute", top: 590, left: 0, right: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 18, transform: `translateY(${(1 - inn) * -16}px)`, opacity: inn }}>
    <div style={{ width: 80, height: 80, borderRadius: "50%", background: grad(color, color + "cc"), boxShadow: SH, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 44, color: "#fff", position: "relative" }}>{n}<Sheen r="50%" /></div>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", padding: "12px 28px", borderRadius: 18, background: grad("#FBF7EF", "#EFEADF"), boxShadow: SH, border: sent > 0.4 ? `2px solid ${color}` : "2px solid transparent", position: "relative" }}>
      <span style={{ ...inter9, fontSize: 44, color, letterSpacing: "-0.01em", lineHeight: 1 }}>/{cmd.slice(0, typed)}<span style={{ opacity: typed < cmd.length && Math.floor(lf / 8) % 2 ? 1 : 0, color }}>|</span></span>
      <span style={{ fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 600, fontSize: 26, color: MUTE, marginTop: 5, opacity: sent, whiteSpace: "nowrap" }}>{persona}</span>
      <Sheen r={18} />
    </div></div>); };

// ===== HOOK: real social posts fan around Claude -> sucked in -> 5 redacted command pills =====
const slidesH = ["refs/bp1.jpg", "refs/bp4.jpg", "refs/bp6.jpg", "refs/bp9.jpg", "refs/bp11.jpg", "refs/bp3.jpg"];
const Hook: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const lf = f - fr(s); const cy = 872;
  const markCx = CX, markCy = 1158; const markIn = over(f, fr(s) + 2, 12);
  const pulse = Math.max(0, Math.sin(lf / 7));
  const order = [2, 1, 3, 0, 4]; const base = [0.4, 0.3, 0.9, 0.2, 0.6]; const grow = [4.1, 2.6, 6.2, 2.1, 3.7];
  return (<AbsoluteFill>
    <Bloom cx={CX} cy={946} w={900} color="rgba(210,114,78,0.2)" lf={lf} base={0.5 + pulse * 0.12} />
    {[0, 1].map((k) => { const rp = ramp(((lf - k * 34) % 96 + 96) % 96, 0, 64); if (rp <= 0.02 || rp >= 1) return null; const rs = 60 + rp * 210; return <div key={"r" + k} style={{ position: "absolute", left: markCx - rs / 2, top: markCy - rs / 2, width: rs, height: rs, borderRadius: "50%", border: `${3 * (1 - rp)}px solid ${CLAY}`, opacity: (1 - rp) * 0.38, zIndex: 8 }} />; })}
    {[0, 1, 2, 3, 4].map((i) => {
      const st = 2 + order[i] * 6; const e = over(f, fr(s) + st, 12);
      const off = i - 2; const fx = CX + off * 202; const fy = cy + Math.abs(off) * 32 + Math.sin(lf / 22 + i) * 4;
      const x = markCx + (fx - markCx) * e; const y = markCy + (fy - markCy) * e - Math.sin(e * Math.PI) * 46;
      const hero = i === 2; const mIn = over(f, fr(s) + st + 52, 10); const climb = ramp(lf, st + 52, 246);
      const val = (base[i] + climb * grow[i]).toFixed(1);
      return (<div key={i} style={{ position: "absolute", left: x - 95, top: y - 119, transform: `rotate(${off * 6 * e}deg) scale(${0.2 + e * 0.8})`, opacity: Math.min(1, e * 1.5), zIndex: 5 - Math.abs(off) }}>
        <PostCard i={i} w={190} h={238} glow={hero ? 0.5 + pulse * 0.2 : 0} />
        {mIn > 0.02 && <div style={{ position: "absolute", right: 7, bottom: 7, transform: `scale(${mIn})`, transformOrigin: "right bottom", padding: "4px 10px", borderRadius: 999, background: grad("#3F9E74", "#2F7E5C"), color: "#fff", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 18, boxShadow: "0 4px 12px rgba(40,32,20,0.3)", whiteSpace: "nowrap" }}>▲+{val}k</div>}
      </div>); })}
    <div style={{ position: "absolute", left: markCx - 72, top: markCy - 72, transform: `scale(${markIn * (1 + pulse * 0.05)})`, zIndex: 10 }}><ClaudeMark size={144} glow={0.55 + pulse * 0.3} /></div>
  </AbsoluteFill>); };

// ===== /hooks: clean person tiles fan out + giant 30 (no overlap) =====
const HTILES = ["refs/bp1.jpg", "refs/bp3.jpg", "refs/bp4.jpg", "refs/bp7.jpg", "refs/bp9.jpg"];
const HooksScene: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s); const cnt = Math.round(ramp(lf, 42, 70) * 30);
  return (<AbsoluteFill><Bloom cx={CX} cy={896} w={860} color="rgba(210,114,78,0.2)" lf={lf} />
    {HTILES.map((src, i) => { const e = over(f, fr(s) + 12 + i * 6, 12); const x = CX + (i - 2) * 172; const y = 824 + Math.abs(i - 2) * 22; const rot = (i - 2) * 7; const fl = Math.sin(lf / 20 + i) * 4;
      return (<div key={i} style={{ position: "absolute", left: x - 73, top: y - 93 + fl, transform: `rotate(${rot * e}deg) scale(${0.45 + e * 0.55})`, opacity: e, zIndex: 2 + (2 - Math.abs(i - 2)) }}><PostCard i={i} w={146} h={186} /></div>); })}
    <div style={{ position: "absolute", left: CX - 200, top: 1012, width: 400, textAlign: "center", zIndex: 20, transform: `scale(${over(f, fr(s) + 40, 12)})` }}>
      <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 196, color: CLAY, lineHeight: 0.9, textShadow: "0 12px 44px rgba(210,114,78,0.42), 0 3px 0 #FBF7EF" }}>{cnt}</span></div>
  </AbsoluteFill>); };

// ===== /repurpose: 1 video -> clean person tiles spread (no overlap with bar/captions) =====
const RTILES = [{ img: "refs/bp2.jpg", dx: 220, dy: -100, w: 150, h: 188 }, { img: "refs/bp5.jpg", dx: 324, dy: 22, w: 158, h: 198 }, { img: "refs/bp6.jpg", dx: 286, dy: 142, w: 150, h: 188 }, { img: "refs/bp10.jpg", dx: 128, dy: 152, w: 132, h: 210 }];
const RepurposeScene: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s); const fan = ramp(lf, 14, 44); const cy = 948;
  return (<AbsoluteFill><Bloom cx={CX} cy={cy} w={720} color="rgba(58,92,132,0.16)" lf={lf} />
    <svg style={{ position: "absolute", inset: 0 }} width={1080} height={1920}>{RTILES.map((o, i) => <line key={i} x1={470} y1={cy} x2={510 + o.dx * fan} y2={cy + o.dy * fan} stroke="rgba(58,92,132,0.26)" strokeWidth={4} strokeDasharray="2 14" strokeLinecap="round" />)}</svg>
    <div style={{ position: "absolute", left: 112, top: 758, width: 336, height: 420, borderRadius: 30, background: grad("#26303B", "#1A222C"), boxShadow: SH, overflow: "hidden", transform: `translateX(${(1 - over(f, fr(s) + 8, 12)) * -24}px) scale(${over(f, fr(s) + 8, 12)})` }}>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ width: 118, height: 118, borderRadius: "50%", background: grad("#FBF9F4", "#E7E3DA"), display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 12px 28px rgba(0,0,0,0.32)" }}><div style={{ width: 0, height: 0, borderTop: "24px solid transparent", borderBottom: "24px solid transparent", borderLeft: `40px solid ${SLATE}`, marginLeft: 9 }} /></div></div>
      <div style={{ position: "absolute", left: 22, bottom: 28, right: 22, height: 7, borderRadius: 4, background: "rgba(58,92,132,0.4)" }}><div style={{ height: "100%", width: "42%", borderRadius: 4, background: "#5C8AC0" }} /></div><Sheen r={30} />
    </div>
    {RTILES.map((o, i) => { const e = over(f, fr(s) + 16 + i * 5, 12); return (<div key={i} style={{ position: "absolute", left: 510 + o.dx * fan - o.w / 2, top: cy + o.dy * fan - o.h / 2, opacity: e * fan, transform: `rotate(${(i - 1.5) * 5}deg) scale(${0.55 + e * 0.45})`, zIndex: 5 - i }}><PostCard i={i} w={o.w} h={o.h} glow={i === 0 ? fan * 0.3 : 0} /></div>); })}
  </AbsoluteFill>); };

// ===== /grade: phone (clean person) LEFT + grade bars + WOULD FLOP RIGHT (nothing covers the post) =====
const GradeScene: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s);
  const phoneIn = over(f, fr(s) + 8, 14); const panelIn = over(f, fr(s) + 26, 13); const stamp = over(f, fr(s) + 54, 12);
  const bars = [{ v: 92, c: GREEN }, { v: 54, c: RED }, { v: 84, c: AMBER }];
  return (<AbsoluteFill><Bloom cx={CX} cy={950} w={800} color="rgba(207,149,68,0.18)" lf={lf} />
    <div style={{ position: "absolute", left: 150, top: 732 + (1 - phoneIn) * 24, width: 360, height: 448, borderRadius: 44, background: grad("#26221C", "#15120E"), boxShadow: SH, transform: `scale(${phoneIn})`, transformOrigin: "center", padding: 13 }}>
      <PostCard i={6} w={334} h={422} r={32} bd={false} /><Sheen r={44} />
    </div>
    {panelIn > 0.02 && <div style={{ position: "absolute", left: 562, top: 800, width: 372, display: "flex", flexDirection: "column", gap: 26, opacity: panelIn, transform: `translateX(${(1 - panelIn) * 30}px)` }}>
      {bars.map((b, i) => { const fl = ramp(lf, 28 + i * 8, 54 + i * 8); return (<div key={i} style={{ height: 28, borderRadius: 14, background: "rgba(40,32,20,0.12)", overflow: "hidden", boxShadow: "inset 0 2px 5px rgba(0,0,0,0.08)" }}><div style={{ height: "100%", width: `${b.v * fl}%`, borderRadius: 14, background: grad(b.c, b.c + "cc"), boxShadow: SH }} /></div>); })}
    </div>}
    {stamp > 0.02 && <div style={{ position: "absolute", left: 566, top: 1006, width: 340, height: 100, borderRadius: 18, background: grad("#D2624C", "#A8392B"), boxShadow: `${SH}, 0 0 32px rgba(196,74,58,0.6)`, transform: `scale(${interpolate(stamp, [0, 1], [1.45, 1])}) rotate(-6deg)`, transformOrigin: "center", display: "flex", alignItems: "center", justifyContent: "center", border: "4px solid rgba(255,255,255,0.36)", zIndex: 9 }}>
      <span style={{ ...inter9, fontSize: 46, color: "#F4EFE6" }}>WOULD FLOP</span></div>}
  </AbsoluteFill>); };

// ===== /trends: 3 clean people, #1 big + on fire (no card; badges in-tile, nothing reaches the bar) =====
const TrendsScene: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s);
  const items = [{ img: "refs/bp3.jpg", x: CX - 290, y: 1038, w: 176, h: 220, up: "+86%", hot: false }, { img: "refs/bp7.jpg", x: CX + 290, y: 1038, w: 176, h: 220, up: "+34%", hot: false }, { img: "refs/bp9.jpg", x: CX, y: 976, w: 244, h: 304, up: "+240%", hot: true }];
  return (<AbsoluteFill><Bloom cx={CX} cy={952} w={760} color="rgba(63,158,116,0.2)" lf={lf} />
    {items.map((it, k) => { const e = over(f, fr(s) + 18 + k * 8, 13); const bob = it.hot ? Math.sin(lf / 9) * 5 : Math.sin(lf / 16 + k) * 3;
      return (<div key={k} style={{ position: "absolute", left: it.x - it.w / 2, top: it.y - it.h / 2 + bob, transform: `scale(${0.5 + e * 0.5})`, opacity: e, zIndex: it.hot ? 6 : 3 }}>
        {it.hot && <Bloom cx={it.w / 2} cy={it.h / 2} w={it.w + 130} color="rgba(210,114,78,0.4)" lf={lf} base={0.5} />}
        <PostCard i={it.hot ? 2 : k + 3} w={it.w} h={it.h} glow={it.hot ? 0.7 : 0} />
        <div style={{ position: "absolute", right: 8, bottom: 10, padding: it.hot ? "9px 15px" : "6px 12px", borderRadius: 13, background: it.hot ? grad(CLAY, "#A8392B") : grad(GREEN, "#2F7E5C"), color: "#fff", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: it.hot ? 30 : 22, boxShadow: SH }}>▲{it.up}</div>
        {it.hot && <div style={{ position: "absolute", left: 8, top: 8, fontSize: 44, transform: `rotate(${Math.sin(lf / 7) * 8}deg)`, filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.4))" }}>🔥</div>}
      </div>); })}
  </AbsoluteFill>); };

// ===== /calendar: an open wall of clean people (no overlapping text) =====
const CALimg = ["refs/bp1.jpg", "refs/bp2.jpg", "refs/bp3.jpg", "refs/bp4.jpg", "refs/bp5.jpg", "refs/bp6.jpg", "refs/bp7.jpg", "refs/bp8.jpg", "refs/bp9.jpg", "refs/bp10.jpg", "refs/bp11.jpg", "refs/bp12.jpg"];
const GOALC = [CLAY, SLATE2, AMBER, GREEN];
const CalendarScene: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s);
  const cols = 5, rows = 4, total = 20; const tw = 150, th = 112, gx = 16, gy = 14;
  const gridW = cols * tw + (cols - 1) * gx; const startX = CX - gridW / 2; const startY = 770;
  return (<AbsoluteFill><Bloom cx={CX} cy={950} w={820} color="rgba(76,123,176,0.18)" lf={lf} />
    {Array.from({ length: total }, (_, i) => { const c = i % cols, r = Math.floor(i / cols); const e = over(f, fr(s) + 16 + i * 2.2, 9); const gc = GOALC[i % 4]; const fl = Math.sin(lf / 22 + i) * 3;
      return (<div key={i} style={{ position: "absolute", left: startX + c * (tw + gx), top: startY + r * (th + gy) + fl, width: tw, height: th, borderRadius: 13, overflow: "hidden", boxShadow: IMSH, border: "3px solid #fff", opacity: e, transform: `translateY(${(1 - e) * -12}px) scale(${0.6 + e * 0.4})` }}>
        <PostCard i={i} w={tw} h={th} r={13} bd={false} />
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 5, background: gc }} /><Sheen r={13} />
      </div>); })}
  </AbsoluteFill>); };

const CTA: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const local = f - fr(s); if (local < 0) return null; const a = eOut(f, fr(s) + 2, 12); const pulse = 1 + Math.sin(f / 7) * 0.03;
  return (<AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
    {Array.from({ length: 12 }, (_, i) => { const p = eOut(f, fr(s) + 4 + i, 26); const ang = (i / 12) * Math.PI * 2; if (p <= 0 || p >= 1) return null; return <div key={i} style={{ position: "absolute", left: 540 + Math.cos(ang) * p * 340, top: 900 + Math.sin(ang) * p * 340, fontSize: 28, opacity: Math.sin(p * Math.PI), color: [SLATE, CLAY, AMBER, GREEN][i % 4] }}>✦</div>; })}
    <div style={{ marginTop: -150, transform: `scale(${0.7 + a * 0.3})`, opacity: a }}><ClaudeMark size={172} glow={0.5 + Math.sin(local / 9) * 0.12} /></div>
    <div style={{ marginTop: 46, transform: `scale(${pulse})`, padding: "28px 56px", borderRadius: 999, background: CLAY, color: "#fff", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 66, boxShadow: "0 24px 54px rgba(210,114,78,0.42)", opacity: a }}>💬 Comment "CONTENT"</div>
    <div style={{ marginTop: 28, fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 600, fontSize: 42, color: INK, opacity: a, textAlign: "center", lineHeight: 1.3 }}>and I'll send the full install guide<br />for all five skills</div>
  </AbsoluteFill>); };

const L = [0, 8.97, 17.27, 25.71, 34.02, 41.81, 49.2];
const Sfx: React.FC<{ at: number; src: string; v?: number }> = ({ at, src, v = 0.3 }) => (<Sequence from={fr(at)} durationInFrames={fr(2.5)}><Audio src={staticFile(`sfx/${src}`)} volume={v} /></Sequence>);

export const ClaudeContentReel: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 16, 28], [1.0, 1.08, 1.0], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  return (<AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
    <Audio src={staticFile("vo_content.wav")} />
    <Audio loop src={staticFile("ados_bed_loud.wav")} volume={(ff) => interpolate(ff, [0, fr(L[6]) - 12, fr(L[6]) + 20, 99999], [0.2, 0.2, 0.15, 0.15], { extrapolateRight: "clamp" })} />
    <Sfx at={0} src="riser.wav" /><Sfx at={0} src="swooshup.wav" /><Sfx at={0.5} src="boom.wav" v={0.34} /><Sfx at={0.5} src="shimmer.wav" /><Sfx at={1.35} src="boom.wav" v={0.3} />
    {L.slice(1).map((t, i) => <React.Fragment key={i}><Sfx at={t - 0.1} src="swish.wav" v={0.24} /><Sfx at={t + 0.9} src="pop.wav" v={0.22} /></React.Fragment>)}
    <Sfx at={L[6]} src="resolve.wav" v={0.34} /><Sfx at={L[6] + 0.5} src="sparkle.wav" v={0.3} />
    <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "50% 46%" }}>
      <Background />
      <Scene s={L[0]} e={L[1]}><Hook s={L[0]} /></Scene>
      <Scene s={L[1]} e={L[2]}><CommandBar s={L[1]} n={1} cmd="hooks" persona="the hook writer" color={CLAY} /><HooksScene s={L[1]} /></Scene>
      <Scene s={L[2]} e={L[3]}><CommandBar s={L[2]} n={2} cmd="repurpose" persona="the repurposer" color={SLATE} /><RepurposeScene s={L[2]} /></Scene>
      <Scene s={L[3]} e={L[4]}><CommandBar s={L[3]} n={3} cmd="grade" persona="the critic" color={AMBER} /><GradeScene s={L[3]} /></Scene>
      <Scene s={L[4]} e={L[5]}><CommandBar s={L[4]} n={4} cmd="trends" persona="the trend scout" color={GREEN} /><TrendsScene s={L[4]} /></Scene>
      <Scene s={L[5]} e={L[6]}><CommandBar s={L[5]} n={5} cmd="calendar" persona="the planner" color={SLATE2} /><CalendarScene s={L[5]} /></Scene>
      <CTA s={L[6]} />
      <HeroHeader />
      <Captions />
    </AbsoluteFill>
  </AbsoluteFill>); };
