import React from "react";
import { AbsoluteFill, Audio, Easing, Img, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { fraunces, frauncesItalic, inter } from "./fonts";
import wordsData from "./data/words_carousel2.json";

/**
 * ClaudeCarousel2Reel — "Claude can now build a whole Instagram carousel in one chat."
 * Clean people-photo carousel slides, strict no-overlap zones, big visuals, minimal text, value header.
 */
const CREAM = "#ECE9E2", INK = "#1A1813", SLATE = "#3A5C84", SLATE2 = "#4C7BB0", CLAY = "#D2724E", AMBER = "#CF9544", GREEN = "#3F9E74", MUTE = "#9A968B", RED = "#C44A3A";
const FPS = 30; const fr = (s: number) => s * FPS; const CX = 540;
const eOut = (f: number, sF: number, d = 10) => interpolate(f, [sF, sF + d], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
const ramp = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const over = (f: number, sF: number, d = 12) => interpolate(f, [sF, sF + d * 0.5, sF + d], [0, 1.14, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
const grad = (a: string, b: string) => `linear-gradient(158deg, ${a} 0%, ${b} 100%)`;
const inter9: React.CSSProperties = { fontFamily: inter.fontFamily, fontWeight: 900 };
const CLAUDE_PATH = "m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z";
const SH = "inset 0 1.5px 0 rgba(255,255,255,0.5), 0 2px 4px rgba(34,30,24,0.22), 0 12px 26px rgba(34,30,24,0.20), 0 34px 64px rgba(20,26,45,0.26)";
const IMSH = "0 16px 34px rgba(40,32,20,0.28), 0 4px 10px rgba(40,32,20,0.14)";

const Sheen: React.FC<{ r: number | string; o?: number }> = ({ r, o = 0.3 }) => (<div style={{ position: "absolute", inset: 0, borderRadius: r, background: `linear-gradient(125deg, rgba(255,255,255,${o}) 0%, rgba(255,255,255,0) 32%)`, pointerEvents: "none" }} />);
const Bloom: React.FC<{ cx: number; cy: number; w: number; color: string; lf: number; base?: number }> = ({ cx, cy, w, color, lf, base = 0.55 }) => (<div style={{ position: "absolute", left: cx - w / 2, top: cy - w / 2, width: w, height: w, borderRadius: "50%", background: `radial-gradient(circle at 50% 46%, ${color} 0%, transparent 62%)`, opacity: base + Math.sin(lf / 9) * 0.2, pointerEvents: "none" }} />);
const ClaudeMark: React.FC<{ size: number; glow?: number }> = ({ size, glow = 0.4 }) => (
  <div style={{ position: "relative", width: size, height: size, borderRadius: size * 0.28, background: grad("#E08A66", "#C5603C"), boxShadow: `${SH}, 0 0 ${Math.round(size * 0.34)}px rgba(210,114,78,${glow})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
    <svg viewBox="0 0 24 24" width={size * 0.58} height={size * 0.58}><path fill="#F6EFE6" d={CLAUDE_PATH} /></svg><Sheen r={size * 0.28} />
  </div>);
// a CLEAN designed Instagram carousel slide = a person photo + dark gradient + a serif headline + accent rule
const CarSlide: React.FC<{ src: string; w: number; h: number; head?: string; accent?: string; r?: number; glow?: number }> = ({ src, w, h, head, accent = CLAY, r = 18, glow = 0 }) => (
  <div style={{ position: "relative", width: w, height: h, borderRadius: r, overflow: "hidden", boxShadow: `${IMSH}${glow > 0 ? `, 0 0 ${glow * 32}px rgba(210,114,78,${glow * 0.7})` : ""}`, border: "4px solid #fff", background: "#000" }}>
    <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
    {head && <><div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(18,18,28,0.86) 0%, rgba(18,18,28,0.1) 52%, transparent 70%)" }} />
      <div style={{ position: "absolute", left: w * 0.09, right: w * 0.09, bottom: h * 0.07 }}>
        <div style={{ width: w * 0.16, height: 5, borderRadius: 3, background: accent, marginBottom: h * 0.035 }} />
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: w * 0.115, color: "#fff", lineHeight: 1.05, letterSpacing: "-0.01em" }}>{head}</div>
      </div></>}
    <Sheen r={r} />
  </div>);

const Background: React.FC = () => { const f = useCurrentFrame(); const d = Math.sin(f / 90) * 6;
  return (<AbsoluteFill style={{ backgroundColor: CREAM }}>
    <AbsoluteFill style={{ transform: `translate(${d}px,${d * 0.6}px)`, backgroundImage: "linear-gradient(rgba(26,24,19,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(26,24,19,0.07) 1px,transparent 1px)", backgroundSize: "68px 68px" }} />
    <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 46%, rgba(0,0,0,0) 55%, rgba(40,32,20,0.10) 100%)" }} />
  </AbsoluteFill>); };

type Word = { word: string; start: number; end: number; line: number };
const WORDS = wordsData as Word[];
const cleanw = (w: string) => w.toLowerCase().replace(/[^a-z0-9']/g, "");
const EMPH = new Set(["claude", "carousel", "chat", "slides", "words", "layout", "design", "topic", "post", "canva", "hours", "clean", "creators", "agencies", "few", "hundred", "comment", "workflow", "ai"]);
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

const HeroHeader: React.FC = () => { const f = useCurrentFrame(); if (f > 96) return null;
  const appear = eOut(f, 0, 9); const out = eOut(f, 80, 13); const op = appear * (1 - out);
  const ty = (1 - appear) * 22 - out * 14; const sc = 0.965 + appear * 0.035; const l2 = eOut(f, 11, 9);
  return (<div style={{ position: "absolute", top: 360, left: 76, right: 76, opacity: op, transform: `translateY(${ty}px) scale(${sc})`, transformOrigin: "left top", zIndex: 60 }}>
    <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 84, lineHeight: 1.02, letterSpacing: "-0.03em", color: INK, textShadow: "0 2px 18px rgba(236,233,226,0.96)" }}>
      <div>A whole <span style={{ color: CLAY }}>carousel</span>,</div>
      <div style={{ opacity: l2 }}>one <span style={{ color: CLAY }}>Claude</span> chat.</div>
    </div></div>); };

const Scene: React.FC<{ s: number; e: number; children: React.ReactNode }> = ({ s, e, children }) => {
  const frame = useCurrentFrame(); const local = frame - fr(s); const lenF = fr(e - s); if (local < 0 || local > lenF) return null;
  const op = Math.min(eOut(frame, fr(s), 5), 1 - eOut(frame, fr(e - 0.16), 6)); const inE = eOut(frame, fr(s), 12);
  return <AbsoluteFill style={{ opacity: op, transform: `scale(${0.99 + inE * 0.01})` }}>{children}</AbsoluteFill>; };

const HEADS = ["The 1 habit that\nchanged everything", "Why nobody\nfollows back", "Steal this\n3-step hook", "The mistake\nkilling your reach", "Read this before\nyou post again", "How I grew\nto 50k"];
const PHOTOS = ["refs/bp1.jpg", "refs/bp3.jpg", "refs/bp4.jpg", "refs/bp7.jpg", "refs/bp9.jpg", "refs/bp11.jpg"];

// ===== L0 HOOK — Claude chat -> a carousel materializes =====
const Hook: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s);
  const markIn = over(f, fr(s) + 2, 12); const build = ramp(lf, 26, 60);
  const slides = [{ x: -250, rot: -10 }, { x: 0, rot: 0 }, { x: 250, rot: 10 }];
  return (<AbsoluteFill><Bloom cx={CX} cy={930} w={820} color="rgba(210,114,78,0.2)" lf={lf} />
    <div style={{ position: "absolute", left: CX - 56, top: 600, transform: `scale(${markIn})`, zIndex: 10 }}><ClaudeMark size={112} glow={0.5 + Math.sin(lf / 9) * 0.12} /></div>
    {slides.map((sl, i) => { const e = over(f, fr(s) + 28 + i * 7, 13); const fl = Math.sin(lf / 20 + i) * 5;
      return (<div key={i} style={{ position: "absolute", left: CX + sl.x * e - 132, top: 1000 - (1 - e) * 80 + fl, transform: `rotate(${sl.rot * e}deg) scale(${0.5 + e * 0.5})`, opacity: e, zIndex: i === 1 ? 6 : 4 }}>
        <CarSlide src={PHOTOS[i]} w={264} h={330} head={HEADS[i]} accent={[CLAY, SLATE, AMBER][i]} glow={i === 1 ? build * 0.4 : 0} /></div>); })}
  </AbsoluteFill>); };

// ===== L1 "all of it" — a full fan of clean slides =====
const AllOfIt: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s);
  const slots = [{ x: -348, rot: -14 }, { x: -174, rot: -7 }, { x: 0, rot: 0 }, { x: 174, rot: 7 }, { x: 348, rot: 14 }];
  return (<AbsoluteFill><Bloom cx={CX} cy={880} w={860} color="rgba(58,92,132,0.16)" lf={lf} />
    {slots.map((sl, i) => { const e = over(f, fr(s) + 6 + i * 6, 13); const fl = Math.sin(lf / 19 + i) * 5;
      return (<div key={i} style={{ position: "absolute", left: CX + sl.x - 118, top: 880 - 148 + Math.abs(sl.x) * 0.04 + fl, transform: `rotate(${sl.rot * e}deg) scale(${0.5 + e * 0.5})`, opacity: e, zIndex: 5 - Math.abs(slots.length / 2 - i) }}>
        <CarSlide src={PHOTOS[i]} w={236} h={296} head={HEADS[i]} accent={[CLAY, SLATE, AMBER, GREEN, SLATE2][i]} /></div>); })}
  </AbsoluteFill>); };

// ===== L2 "topic -> ready to post" — topic chip flows to a phone =====
const DropTopic: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s);
  const chipIn = over(f, fr(s) + 4, 12); const flow = ramp(lf, 24, 50); const phoneIn = over(f, fr(s) + 30, 14); const ready = over(f, fr(s) + 70, 12);
  return (<AbsoluteFill><Bloom cx={CX} cy={900} w={760} color="rgba(63,158,116,0.16)" lf={lf} />
    {/* topic chip (left) */}
    <div style={{ position: "absolute", left: 130, top: 820, padding: "16px 26px", borderRadius: 18, background: grad("#FBF7EF", "#EFEADF"), boxShadow: SH, opacity: chipIn * (1 - flow * 0.5), transform: `scale(${chipIn})`, display: "flex", alignItems: "center", gap: 12 }}>
      <ClaudeMark size={40} /><span style={{ ...inter9, fontSize: 32, color: INK }}>your topic</span></div>
    <svg style={{ position: "absolute", inset: 0 }} width={1080} height={1920}><path d={`M310 850 Q480 900 ${560} 900`} stroke="rgba(63,158,116,0.4)" strokeWidth={5} fill="none" strokeDasharray={200} strokeDashoffset={200 * (1 - flow)} strokeLinecap="round" /></svg>
    {/* phone (right) with finished carousel */}
    <div style={{ position: "absolute", left: 600, top: 700, width: 330, height: 500, borderRadius: 44, background: grad("#26221C", "#15120E"), boxShadow: SH, padding: 13, transform: `scale(${phoneIn})`, transformOrigin: "center", opacity: phoneIn }}>
      <div style={{ width: "100%", height: "100%", borderRadius: 32, overflow: "hidden", position: "relative", background: CREAM }}>
        <Img src={staticFile("refs/bp9.jpg")} style={{ width: "100%", height: "82%", objectFit: "cover", display: "block" }} />
        <div style={{ position: "absolute", top: "82%", left: 0, right: 0, bottom: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>{[0, 1, 2, 3, 4].map((d) => <div key={d} style={{ width: 9, height: 9, borderRadius: "50%", background: d === 0 ? SLATE : "rgba(40,32,20,0.22)" }} />)}</div>
      </div><Sheen r={44} />
      {ready > 0.02 && <div style={{ position: "absolute", left: "50%", top: -28, marginLeft: -98, width: 196, padding: "10px 0", borderRadius: 999, background: grad(GREEN, "#2F7E5C"), color: "#fff", ...inter9, fontSize: 24, textAlign: "center", boxShadow: SH, transform: `scale(${ready})` }}>✓ ready to post</div>}
    </div>
  </AbsoluteFill>); };

// ===== L3 "old way: Canva, hours, text boxes" — the tedious contrast =====
const OldWay: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s);
  const inn = over(f, fr(s) + 4, 13); const nudge = Math.sin(lf / 8) * 10;
  return (<AbsoluteFill><Bloom cx={CX} cy={900} w={720} color="rgba(154,150,139,0.14)" lf={lf} base={0.4} />
    {/* a desaturated Canva-ish canvas with scattered text boxes */}
    <div style={{ position: "absolute", left: CX - 300, top: 720, width: 600, height: 420, borderRadius: 22, background: grad("#EAE7DF", "#DDD8CC"), boxShadow: SH, transform: `scale(${inn})`, transformOrigin: "center top", filter: "saturate(0.6)" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 46, borderRadius: "22px 22px 0 0", background: "#C9C3B5", display: "flex", alignItems: "center", paddingLeft: 16, gap: 8 }}>{["#B85B5B", "#C7A24E", "#7BA86A"].map((c, i) => <div key={i} style={{ width: 13, height: 13, borderRadius: "50%", background: c }} />)}</div>
      {/* scattered text boxes with selection handles, being nudged */}
      {[{ x: 50, y: 90, w: 230, h: 44 }, { x: 320, y: 150, w: 200, h: 36 }, { x: 90, y: 230, w: 180, h: 40 }, { x: 300, y: 300, w: 240, h: 36 }].map((b, i) => { const sel = i === 1; const dx = sel ? nudge : 0;
        return (<div key={i} style={{ position: "absolute", left: b.x + dx, top: b.y, width: b.w, height: b.h, borderRadius: 6, background: "#fff", border: sel ? `2px solid ${SLATE2}` : "1px solid rgba(40,32,20,0.18)", display: "flex", alignItems: "center", paddingLeft: 10 }}>
          <div style={{ height: 8, width: "70%", borderRadius: 4, background: "rgba(40,32,20,0.3)" }} />
          {sel && [[-5, -5], [b.w - 5, -5], [-5, b.h - 5], [b.w - 5, b.h - 5]].map((h, k) => <div key={k} style={{ position: "absolute", left: h[0], top: h[1], width: 10, height: 10, borderRadius: 2, background: "#fff", border: `2px solid ${SLATE2}` }} />)}</div>); })}
      <svg width={30} height={36} viewBox="0 0 30 36" style={{ position: "absolute", left: 320 + 200 + nudge, top: 150 + 24, filter: "drop-shadow(0 3px 5px rgba(0,0,0,0.3))" }}><path d="M2 2 L2 27 L9 21 L14 32 L19 30 L14 19 L23 19 Z" fill="#1A1813" stroke="#fff" strokeWidth={1.6} strokeLinejoin="round" /></svg>
    </div>
    {/* a clock = hours wasted */}
    {inn > 0.5 && <div style={{ position: "absolute", left: CX - 70, top: 1150, width: 140, padding: "12px 0", borderRadius: 999, background: grad("#C9533E", "#A8392B"), color: "#fff", ...inter9, fontSize: 30, textAlign: "center", boxShadow: SH, opacity: eOut(f, fr(s) + 30, 10) }}>⏳ hours</div>}
  </AbsoluteFill>); };

// ===== L4 "stop looking AI-made -> clean" — before/after =====
const CleanLook: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s);
  const aIn = over(f, fr(s) + 4, 12); const bIn = over(f, fr(s) + 40, 13);
  return (<AbsoluteFill><Bloom cx={CX + 150} cy={900} w={640} color="rgba(210,114,78,0.18)" lf={lf} />
    {/* BEFORE: generic 'AI-made' slide (left, marked X) */}
    <div style={{ position: "absolute", left: 110, top: 760, width: 300, height: 376, borderRadius: 18, background: grad("#3A3F4A", "#2A2E36"), boxShadow: SH, transform: `scale(${aIn}) rotate(-4deg)`, transformOrigin: "center", filter: "saturate(0.7)", overflow: "hidden" }}>
      {[0.8, 0.6, 0.9, 0.5].map((w, i) => <div key={i} style={{ position: "absolute", left: 28, top: 60 + i * 56, width: `${w * 70}%`, height: 18, borderRadius: 5, background: "rgba(255,255,255,0.32)" }} />)}
      <div style={{ position: "absolute", left: 28, bottom: 30, width: 90, height: 90, borderRadius: 12, background: "rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40 }}>🤖</div>
      <div style={{ position: "absolute", right: -18, top: -18, width: 64, height: 64, borderRadius: "50%", background: grad("#C9533E", "#A8392B"), display: "flex", alignItems: "center", justifyContent: "center", boxShadow: SH }}><svg viewBox="0 0 30 30" width={32} height={32}><g stroke="#fff" strokeWidth={3.4} strokeLinecap="round"><line x1={9} y1={9} x2={21} y2={21} /><line x1={21} y1={9} x2={9} y2={21} /></g></svg></div>
    </div>
    {/* AFTER: clean designed slide (right, marked check, glowing) */}
    {bIn > 0.02 && <div style={{ position: "absolute", left: 560, top: 740, transform: `scale(${bIn}) rotate(4deg)`, transformOrigin: "center" }}>
      <CarSlide src="refs/bp4.jpg" w={320} h={400} head={"Steal this\n3-step hook"} accent={CLAY} glow={0.6} />
      <div style={{ position: "absolute", right: -18, top: -18, width: 64, height: 64, borderRadius: "50%", background: grad(GREEN, "#2F7E5C"), display: "flex", alignItems: "center", justifyContent: "center", boxShadow: SH }}><svg viewBox="0 0 30 30" width={32} height={32}><path d="M7 15 l5 5 L23 8" fill="none" stroke="#fff" strokeWidth={3.4} strokeLinecap="round" strokeLinejoin="round" /></svg></div>
    </div>}
  </AbsoluteFill>); };

// ===== L5 social proof — slides stream + agency price tag =====
const SocialProof: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s);
  const stream = [{ x: -300, y: 800 }, { x: -110, y: 770 }, { x: 90, y: 800 }, { x: 290, y: 770 }];
  const tag = over(f, fr(s) + 64, 13);
  return (<AbsoluteFill><Bloom cx={CX} cy={870} w={800} color="rgba(63,158,116,0.16)" lf={lf} />
    {stream.map((p, i) => { const e = over(f, fr(s) + 6 + i * 7, 12); const fl = Math.sin(lf / 18 + i) * 5;
      return (<div key={i} style={{ position: "absolute", left: CX + p.x - 96, top: p.y - 120 + fl, transform: `rotate(${(i - 1.5) * 5}deg) scale(${0.5 + e * 0.5})`, opacity: e, zIndex: 4 }}>
        <CarSlide src={PHOTOS[i + 1]} w={192} h={240} head={HEADS[i + 1]} accent={[SLATE, AMBER, GREEN, CLAY][i]} /></div>); })}
    {/* agencies charge a few hundred a post */}
    {tag > 0.02 && <div style={{ position: "absolute", left: CX - 175, top: 1070, width: 350, padding: "18px 0", borderRadius: 18, background: grad("#FBF7EF", "#EFEADF"), boxShadow: SH, transform: `scale(${tag}) rotate(-3deg)`, display: "flex", alignItems: "center", justifyContent: "center", gap: 12, zIndex: 9 }}>
      <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 50, color: CLAY }}>$300</span><span style={{ ...inter9, fontSize: 30, color: INK }}>/post at an agency</span></div>}
  </AbsoluteFill>); };

const CTA: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const local = f - fr(s); if (local < 0) return null; const a = eOut(f, fr(s) + 2, 12); const pulse = 1 + Math.sin(f / 7) * 0.03;
  return (<AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
    {Array.from({ length: 12 }, (_, i) => { const p = eOut(f, fr(s) + 4 + i, 26); const ang = (i / 12) * Math.PI * 2; if (p <= 0 || p >= 1) return null; return <div key={i} style={{ position: "absolute", left: 540 + Math.cos(ang) * p * 340, top: 900 + Math.sin(ang) * p * 340, fontSize: 28, opacity: Math.sin(p * Math.PI), color: [SLATE, CLAY, AMBER, GREEN][i % 4] }}>✦</div>; })}
    <div style={{ marginTop: -150, transform: `scale(${0.7 + a * 0.3})`, opacity: a }}><ClaudeMark size={172} glow={0.5 + Math.sin(local / 9) * 0.12} /></div>
    <div style={{ marginTop: 46, transform: `scale(${pulse})`, padding: "28px 56px", borderRadius: 999, background: CLAY, color: "#fff", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 66, boxShadow: "0 24px 54px rgba(210,114,78,0.42)", opacity: a }}>💬 Comment "CAROUSEL"</div>
    <div style={{ marginTop: 28, fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 600, fontSize: 44, color: INK, opacity: a, textAlign: "center" }}>and I'll send you the workflow</div>
  </AbsoluteFill>); };

const L = [0, 3.81, 8.96, 14.21, 17.82, 23.21, 30.45];
const Sfx: React.FC<{ at: number; src: string; v?: number }> = ({ at, src, v = 0.3 }) => (<Sequence from={fr(at)} durationInFrames={fr(2.5)}><Audio src={staticFile(`sfx/${src}`)} volume={v} /></Sequence>);

export const ClaudeCarousel2Reel: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 16, 28], [1.0, 1.08, 1.0], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  return (<AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
    <Audio src={staticFile("vo_carousel2.wav")} />
    <Audio loop src={staticFile("ados_bed_loud.wav")} volume={(ff) => interpolate(ff, [0, fr(L[6]) - 12, fr(L[6]) + 18, 99999], [0.5, 0.5, 0.42, 0.42], { extrapolateRight: "clamp" })} />
    <Sfx at={0} src="riser.wav" /><Sfx at={0} src="swooshup.wav" /><Sfx at={0.5} src="boom.wav" v={0.34} /><Sfx at={0.5} src="shimmer.wav" />
    {L.slice(1).map((t, i) => <React.Fragment key={i}><Sfx at={t - 0.1} src="swish.wav" v={0.24} /><Sfx at={t + 0.7} src="pop.wav" v={0.22} /></React.Fragment>)}
    <Sfx at={L[6]} src="resolve.wav" v={0.34} /><Sfx at={L[6] + 0.5} src="sparkle.wav" v={0.3} />
    <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "50% 46%" }}>
      <Background />
      <Scene s={L[0]} e={L[1]}><Hook s={L[0]} /></Scene>
      <Scene s={L[1]} e={L[2]}><AllOfIt s={L[1]} /></Scene>
      <Scene s={L[2]} e={L[3]}><DropTopic s={L[2]} /></Scene>
      <Scene s={L[3]} e={L[4]}><OldWay s={L[3]} /></Scene>
      <Scene s={L[4]} e={L[5]}><CleanLook s={L[4]} /></Scene>
      <Scene s={L[5]} e={L[6]}><SocialProof s={L[5]} /></Scene>
      <CTA s={L[6]} />
      <HeroHeader />
      <Captions />
    </AbsoluteFill>
  </AbsoluteFill>); };
