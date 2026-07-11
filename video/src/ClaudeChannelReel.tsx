import React from "react";
import { AbsoluteFill, Audio, Easing, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { fraunces, frauncesItalic, inter } from "./fonts";
import wordsData from "./data/words_channel.json";

/**
 * ClaudeChannelReel — "Claude + ElevenLabs run a faceless YouTube channel that pays $8k/month."
 * raycfu-form script. Faceless thumbnail motif (no people), money-math scenes, CHANNEL gate.
 */
const CREAM = "#ECE9E2", INK = "#1A1813", SLATE = "#3A5C84", SLATE2 = "#4C7BB0", CLAY = "#D2724E", AMBER = "#CF9544", GREEN = "#3F9E74", RED = "#C44A3A", GOLD = "#D9A441";
const FPS = 30; const fr = (s: number) => s * FPS; const CX = 540;
const eOut = (f: number, sF: number, d = 10) => interpolate(f, [sF, sF + d], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
const ramp = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const over = (f: number, sF: number, d = 12) => interpolate(f, [sF, sF + d * 0.5, sF + d], [0, 1.14, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
const grad = (a: string, b: string) => `linear-gradient(158deg, ${a} 0%, ${b} 100%)`;
const inter9: React.CSSProperties = { fontFamily: inter.fontFamily, fontWeight: 900 };
const CLAUDE_PATH = "m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z";
const SH = "inset 0 1.5px 0 rgba(255,255,255,0.5), 0 2px 4px rgba(34,30,24,0.22), 0 12px 26px rgba(34,30,24,0.20), 0 34px 64px rgba(20,26,45,0.26)";

const Sheen: React.FC<{ r: number | string; o?: number }> = ({ r, o = 0.3 }) => (<div style={{ position: "absolute", inset: 0, borderRadius: r, background: `linear-gradient(125deg, rgba(255,255,255,${o}) 0%, rgba(255,255,255,0) 32%)`, pointerEvents: "none" }} />);
const Bloom: React.FC<{ cx: number; cy: number; w: number; color: string; lf: number; base?: number }> = ({ cx, cy, w, color, lf, base = 0.55 }) => (<div style={{ position: "absolute", left: cx - w / 2, top: cy - w / 2, width: w, height: w, borderRadius: "50%", background: `radial-gradient(circle at 50% 46%, ${color} 0%, transparent 62%)`, opacity: base + Math.sin(lf / 9) * 0.2, pointerEvents: "none" }} />);
const ClaudeMark: React.FC<{ size: number; glow?: number }> = ({ size, glow = 0.4 }) => (
  <div style={{ position: "relative", width: size, height: size, borderRadius: size * 0.28, background: grad("#E08A66", "#C5603C"), boxShadow: `${SH}, 0 0 ${Math.round(size * 0.34)}px rgba(210,114,78,${glow})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
    <svg viewBox="0 0 24 24" width={size * 0.58} height={size * 0.58}><path fill="#F6EFE6" d={CLAUDE_PATH} /></svg><Sheen r={size * 0.28} />
  </div>);

// a faceless YouTube video card: bold graphic thumbnail (no people) + title bars + duration chip
const VidCard: React.FC<{ w: number; bgA: string; bgB: string; icon: React.ReactNode; label?: string; glow?: number; r?: number }> = ({ w, bgA, bgB, icon, label, glow = 0, r = 16 }) => {
  const h = w * 0.62;
  return (<div style={{ position: "relative", width: w, borderRadius: r, overflow: "visible" }}>
    <div style={{ position: "relative", width: w, height: h, borderRadius: r, background: grad(bgA, bgB), boxShadow: `${SH}${glow > 0 ? `, 0 0 ${glow * 34}px rgba(210,114,78,${glow * 0.65})` : ""}`, overflow: "hidden" }}>
      <div style={{ position: "absolute", left: w * 0.07, top: h * 0.16, fontSize: w * 0.22, lineHeight: 1, filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))" }}>{icon}</div>
      {label && <div style={{ position: "absolute", left: w * 0.07, bottom: h * 0.12, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: w * 0.115, color: "#fff", lineHeight: 1.02, letterSpacing: "-0.01em", whiteSpace: "pre-line", textShadow: "0 2px 10px rgba(0,0,0,0.35)" }}>{label}</div>}
      <div style={{ position: "absolute", right: 10, bottom: 10, padding: "3px 9px", borderRadius: 6, background: "rgba(0,0,0,0.72)", color: "#fff", ...inter9, fontSize: w * 0.052 }}>8:12</div>
      <Sheen r={r} />
    </div>
    <div style={{ marginTop: 10, display: "flex", gap: 9, alignItems: "center" }}>
      <div style={{ width: w * 0.105, height: w * 0.105, borderRadius: "50%", background: grad("#3A3F4A", "#23262D"), display: "flex", alignItems: "center", justifyContent: "center", color: "#9BA3AF", fontSize: w * 0.055, flexShrink: 0 }}>?</div>
      <div><div style={{ width: w * 0.62, height: w * 0.042, borderRadius: 4, background: "rgba(26,24,19,0.5)" }} /><div style={{ width: w * 0.4, height: w * 0.036, borderRadius: 4, background: "rgba(26,24,19,0.24)", marginTop: 6 }} /></div>
    </div>
  </div>);
};

const Background: React.FC = () => { const f = useCurrentFrame(); const d = Math.sin(f / 90) * 6;
  return (<AbsoluteFill style={{ backgroundColor: CREAM }}>
    <AbsoluteFill style={{ transform: `translate(${d}px,${d * 0.6}px)`, backgroundImage: "linear-gradient(rgba(26,24,19,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(26,24,19,0.07) 1px,transparent 1px)", backgroundSize: "68px 68px" }} />
    <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 46%, rgba(0,0,0,0) 55%, rgba(40,32,20,0.10) 100%)" }} />
  </AbsoluteFill>); };

type Word = { word: string; start: number; end: number; line: number };
const WORDS = wordsData as Word[];
const cleanw = (w: string) => w.toLowerCase().replace(/[^a-z0-9']/g, "");
const EMPH = new Set(["claude", "eleven", "labs", "faceless", "youtube", "channel", "eight", "grand", "month", "niche", "pays", "20", "entertainment", "five", "money", "prompt", "scores", "script", "hook", "loops", "200", "writer", "capcut", "stock", "footage", "titles", "tags", "affiliate", "600000", "ten", "ads", "guide", "comment"]);
const CHUNKS = (() => { const byLine: Record<number, Word[]> = {}; for (const w of WORDS) (byLine[w.line] ||= []).push(w);
  const out: { words: Word[]; start: number; line: number }[] = [];
  for (const li of Object.keys(byLine).map(Number).sort((a, b) => a - b)) { const ws = byLine[li]; for (let i = 0; i < ws.length; i += 3) { const g = ws.slice(i, i + 3); out.push({ words: g, start: g[0].start, line: li }); } }
  const aE = Math.max(...WORDS.map((w) => w.end)); return out.map((c, i) => ({ ...c, end: i + 1 < out.length ? out[i + 1].start : aE + 0.4 })); })();
const Captions: React.FC = () => { const frame = useCurrentFrame();
  return (<>{CHUNKS.map((c, i) => { if (frame < fr(c.start) || frame >= fr(c.end)) return null; if (c.line === 8) return null;
    return (<div key={i} style={{ position: "absolute", top: 1262, left: 64, right: 64, height: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "center", gap: "0 16px", width: 952, textAlign: "center" }}>
        {c.words.map((w, j) => { const g = EMPH.has(cleanw(w.word)); const shown = frame >= fr(w.start);
          return <span key={j} style={{ display: "inline-block", opacity: shown ? 1 : 0, fontFamily: g ? frauncesItalic.fontFamily : fraunces.fontFamily, fontStyle: g ? "italic" : "normal", fontWeight: g ? 700 : 600, fontSize: g ? 92 : 78, lineHeight: 1.04, color: g ? SLATE : INK, letterSpacing: "-0.02em", textShadow: "0 2px 16px rgba(236,233,226,0.95)" }}>{w.word}</span>; })}
      </div></div>); })}</>); };

const HeroHeader: React.FC = () => { const f = useCurrentFrame(); if (f > 258) return null;
  const appear = eOut(f, -7, 8); const out = eOut(f, 244, 13); const op = appear * (1 - out); // composed on frame 0
  const ty = (1 - appear) * 18 - out * 14; const l2 = eOut(f, -7, 8);
  return (<div style={{ position: "absolute", top: 392, left: 76, right: 76, opacity: op, transform: `translateY(${ty}px)`, transformOrigin: "left top", zIndex: 60 }}>
    <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 88, lineHeight: 1.02, letterSpacing: "-0.03em", color: INK, textShadow: "0 2px 18px rgba(236,233,226,0.96)" }}>
      <div><span style={{ color: GREEN }}>$8k</span> a month.</div>
      <div style={{ opacity: l2 }}>No face, just <span style={{ color: CLAY }}>Claude</span>.</div>
    </div></div>); };

// top progress bar + reward seal (teased from frame 0, unlocks at CTA)
const ProgressBar: React.FC<{ dur: number; cta: number }> = ({ dur, cta }) => { const f = useCurrentFrame();
  const p = Math.min(f / fr(dur), 1); const unlocked = f >= fr(cta); const pop = over(f, fr(cta), 14); const tease = 0.72 + Math.sin(f / 11) * 0.22;
  return (<div style={{ position: "absolute", top: 272, left: 84, right: 84, height: 12, zIndex: 70 }}>
    <div style={{ position: "absolute", inset: 0, borderRadius: 999, background: "rgba(26,24,19,0.13)" }} />
    <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${p * 100}%`, borderRadius: 999, background: grad(CLAY, "#B25537") }} />
    <div style={{ position: "absolute", right: -26, top: -20, width: 52, height: 52, borderRadius: "50%", background: unlocked ? grad(GOLD, "#B9832A") : "rgba(26,24,19,0.16)", border: `3px solid ${unlocked ? "#fff" : "rgba(26,24,19,0.25)"}`, boxShadow: unlocked ? `0 0 ${22 + pop * 16}px rgba(217,164,65,0.8), ${SH}` : `0 0 ${10 * tease}px rgba(217,164,65,${0.5 * tease})`, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${unlocked ? pop : 1})` }}>
      {unlocked ? <svg viewBox="0 0 30 30" width={26} height={26}><path d="M7 15 l5 5 L23 9" fill="none" stroke="#fff" strokeWidth={3.6} strokeLinecap="round" strokeLinejoin="round" /></svg>
        : <svg viewBox="0 0 24 24" width={20} height={20}><path d="M7 11 V8 a5 5 0 0 1 10 0 v3 M6 11 h12 v9 H6 Z" fill="none" stroke={`rgba(26,24,19,${0.35 + tease * 0.2})`} strokeWidth={2.2} strokeLinejoin="round" /></svg>}
    </div>
  </div>); };

const Scene: React.FC<{ s: number; e: number; children: React.ReactNode }> = ({ s, e, children }) => {
  const frame = useCurrentFrame(); const local = frame - fr(s); const lenF = fr(e - s); if (local < 0 || local > lenF) return null;
  const fadeIn = s === 0 ? 1 : eOut(frame, fr(s), 5); // first scene fully composed at frame 0 (thumbnail rule)
  const op = Math.min(fadeIn, 1 - eOut(frame, fr(e - 0.16), 6)); const inE = s === 0 ? 1 : eOut(frame, fr(s), 12);
  return <AbsoluteFill style={{ opacity: op, transform: `scale(${0.99 + inE * 0.01})` }}>{children}</AbsoluteFill>; };

// ===== L0 HOOK — faceless channel runs itself: Claude mark + video cards + $8k counter (frame 0 already composed) =====
const Hook: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s);
  const markIn = over(f, fr(s) - 8, 12); const c2 = over(f, fr(s) + 6, 13); const c3 = over(f, fr(s) + 13, 13);
  const money = ramp(lf, 138, 218); // counter climbs on "pays him eight grand" (~4.6-7.3s)
  const amt = Math.round(8000 * ramp(lf, 138, 210));
  const chip = over(f, fr(s) + 140, 12); // "three hours per week" (~4.7s)
  return (<AbsoluteFill><Bloom cx={CX} cy={940} w={860} color="rgba(210,114,78,0.2)" lf={lf} />
    <div style={{ position: "absolute", left: CX - 58, top: 606, transform: `scale(${Math.max(markIn, 0.001)})`, zIndex: 10 }}><ClaudeMark size={116} glow={0.5 + Math.sin(lf / 9) * 0.12} /></div>
    <div style={{ position: "absolute", left: CX - 366, top: 812, transform: `rotate(-6deg) scale(${0.6 + Math.max(c2, 0.42) * 0.4})`, opacity: Math.max(c2, 0.85), zIndex: 4 }}><VidCard w={320} bgA="#26315E" bgB="#17203F" icon={<span>📈</span>} label={"5 money rules\nnobody taught you"} /></div>
    <div style={{ position: "absolute", left: CX + 44, top: 812, transform: `rotate(6deg) scale(${0.6 + Math.max(c3, 0.42) * 0.4})`, opacity: Math.max(c3, 0.85), zIndex: 4 }}><VidCard w={320} bgA="#3E2B55" bgB="#241833" icon={<span>💳</span>} label={"the debt trick\nbanks hate"} /></div>
    {/* $/month counter — the receipt */}
    <div style={{ position: "absolute", left: CX - 205, top: 1102, width: 410, padding: "16px 0", borderRadius: 20, background: grad("#FBF7EF", "#EFEADF"), boxShadow: SH, display: "flex", alignItems: "center", justifyContent: "center", gap: 13, zIndex: 9, opacity: money > 0.01 ? 1 : 0, transform: `scale(${0.85 + Math.min(money, 1) * 0.15})` }}>
      <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 58, color: GREEN }}>${amt.toLocaleString()}</span><span style={{ ...inter9, fontSize: 30, color: INK }}>/month</span></div>
    {chip > 0.02 && <div style={{ position: "absolute", left: CX - 128, top: 736, width: 256, padding: "9px 0", borderRadius: 999, background: grad(SLATE, "#2E4A6B"), color: "#fff", ...inter9, fontSize: 24, textAlign: "center", boxShadow: SH, transform: `scale(${chip}) rotate(-2deg)`, zIndex: 11 }}>3 hours a week</div>}
  </AbsoluteFill>); };

// ===== L1 the mistake — niche you LIKE (x) vs niche that PAYS (check) =====
const NichePick: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s);
  const aIn = over(f, fr(s) + 3, 12); const xIn = over(f, fr(s) + 40, 11); const bIn = over(f, fr(s) + 86, 13);
  return (<AbsoluteFill><Bloom cx={CX} cy={920} w={780} color="rgba(196,74,58,0.14)" lf={lf} />
    <div style={{ position: "absolute", left: 108, top: 790, transform: `rotate(-5deg) scale(${aIn})`, transformOrigin: "center", filter: "saturate(0.72)" }}>
      <VidCard w={330} bgA="#4A4E58" bgB="#31343B" icon={<span>🎮</span>} label={"stuff I think\nis fun"} />
      {xIn > 0.02 && <div style={{ position: "absolute", right: -20, top: -20, width: 68, height: 68, borderRadius: "50%", background: grad("#C9533E", "#A8392B"), display: "flex", alignItems: "center", justifyContent: "center", boxShadow: SH, transform: `scale(${xIn})` }}><svg viewBox="0 0 30 30" width={34} height={34}><g stroke="#fff" strokeWidth={3.4} strokeLinecap="round"><line x1={9} y1={9} x2={21} y2={21} /><line x1={21} y1={9} x2={9} y2={21} /></g></svg></div>}
    </div>
    {bIn > 0.02 && <div style={{ position: "absolute", left: 570, top: 768, transform: `rotate(5deg) scale(${bIn})`, transformOrigin: "center" }}>
      <div style={{ position: "relative" }}>
        <VidCard w={344} bgA="#1E5C43" bgB="#123A2A" icon={<span>💰</span>} label={"one that\nactually pays"} glow={0.5} />
        <div style={{ position: "absolute", right: -20, top: -20, width: 68, height: 68, borderRadius: "50%", background: grad(GREEN, "#2F7E5C"), display: "flex", alignItems: "center", justifyContent: "center", boxShadow: SH }}><svg viewBox="0 0 30 30" width={34} height={34}><path d="M7 15 l5 5 L23 8" fill="none" stroke="#fff" strokeWidth={3.4} strokeLinecap="round" strokeLinejoin="round" /></svg></div>
      </div>
    </div>}
  </AbsoluteFill>); };

// ===== L2 RPM math — finance vs entertainment bars + 5x badge =====
const RpmBars: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s);
  const b1 = ramp(lf, 8, 40); const b2 = ramp(lf, 52, 84); const five = over(f, fr(s) + 118, 14);
  const H1 = 380, H2 = 96;
  return (<AbsoluteFill><Bloom cx={CX} cy={930} w={820} color="rgba(63,158,116,0.18)" lf={lf} />
    {/* baseline */}
    <div style={{ position: "absolute", left: 150, right: 150, top: 1148, height: 4, borderRadius: 2, background: "rgba(26,24,19,0.2)" }} />
    {/* finance bar */}
    <div style={{ position: "absolute", left: 240, top: 1148 - H1 * b1, width: 210, height: H1 * b1, borderRadius: "16px 16px 4px 4px", background: grad(GREEN, "#2F7E5C"), boxShadow: SH }}>
      <Sheen r={16} o={0.25} />
      <div style={{ position: "absolute", top: -74, left: 0, right: 0, textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 56, color: GREEN, opacity: b1 }}>$20</div>
    </div>
    <div style={{ position: "absolute", left: 240, top: 1170, width: 210, textAlign: "center", ...inter9, fontSize: 27, color: INK, opacity: b1 }}>finance</div>
    {/* entertainment bar */}
    <div style={{ position: "absolute", left: 630, top: 1148 - H2 * b2, width: 210, height: H2 * b2, borderRadius: "14px 14px 4px 4px", background: grad("#8E8878", "#6E6858"), boxShadow: SH }}>
      <div style={{ position: "absolute", top: -66, left: 0, right: 0, textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 44, color: "#6E6858", opacity: b2 }}>$3-8</div>
    </div>
    <div style={{ position: "absolute", left: 630, top: 1170, width: 210, textAlign: "center", ...inter9, fontSize: 27, color: INK, opacity: b2 }}>entertainment</div>
    {/* per 1,000 views tag + 5x badge */}
    <div style={{ position: "absolute", left: CX - 130, top: 664, width: 260, padding: "8px 0", borderRadius: 999, background: "rgba(26,24,19,0.08)", textAlign: "center", ...inter9, fontSize: 23, color: "rgba(26,24,19,0.6)", opacity: b1 }}>per 1,000 views</div>
    {five > 0.02 && <div style={{ position: "absolute", left: CX - 90, top: 852, transform: `scale(${five}) rotate(-4deg)`, width: 236, padding: "18px 0", borderRadius: 22, background: grad(CLAY, "#A8552F"), color: "#fff", textAlign: "center", boxShadow: `${SH}, 0 0 34px rgba(210,114,78,0.5)`, zIndex: 9 }}>
      <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 64 }}>5×</span><span style={{ ...inter9, fontSize: 26, marginLeft: 10 }}>the money</span></div>}
  </AbsoluteFill>); };

// ===== L3 the exact prompt — redacted prompt card + Claude scores niches =====
const NichePrompt: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s);
  const cardIn = over(f, fr(s) + 3, 12);
  const rows = [{ n: "finance", sc: "9.2", c: GREEN }, { n: "pet care", sc: "8.1", c: AMBER }, { n: "gaming", sc: "4.3", c: RED }];
  return (<AbsoluteFill><Bloom cx={CX} cy={920} w={780} color="rgba(58,92,132,0.18)" lf={lf} />
    {/* redacted prompt card — clearly a prompt: /, redaction blocks, lock */}
    <div style={{ position: "absolute", left: 128, top: 742, width: 386, borderRadius: 22, background: grad("#26221C", "#15120E"), boxShadow: SH, padding: "22px 24px", transform: `scale(${cardIn})`, transformOrigin: "center" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 34, color: CLAY }}>/</span>
        <span style={{ ...inter9, fontSize: 24, color: "#E8E2D4" }}>niche-picker</span>
        <svg viewBox="0 0 24 24" width={22} height={22} style={{ marginLeft: "auto" }}><path d="M7 11 V8 a5 5 0 0 1 10 0 v3 M6 11 h12 v9 H6 Z" fill="none" stroke={GOLD} strokeWidth={2.4} strokeLinejoin="round" /></svg>
      </div>
      {[0.92, 0.7, 0.84, 0.55].map((w, i) => <div key={i} style={{ height: 15, width: `${w * 100}%`, borderRadius: 5, background: "rgba(232,226,212,0.2)", marginBottom: 11 }} />)}
      <Sheen r={22} o={0.14} />
    </div>
    {/* score rows fly out */}
    {rows.map((r, i) => { const e = over(f, fr(s) + 28 + i * 13, 13);
      return (<div key={i} style={{ position: "absolute", left: 578, top: 762 + i * 108, width: 360, padding: "16px 22px", borderRadius: 18, background: grad("#FBF7EF", "#EFEADF"), boxShadow: SH, display: "flex", alignItems: "center", gap: 12, opacity: e, transform: `translateX(${(1 - e) * 60}px) scale(${0.9 + e * 0.1})` }}>
        <span style={{ ...inter9, fontSize: 28, color: INK }}>{r.n}</span>
        <span style={{ marginLeft: "auto", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 42, color: r.c }}>{r.sc}</span>
      </div>); })}
  </AbsoluteFill>); };

// ===== L4 Claude writes every script — doc streams in + spec chips + replaces $200 writer =====
const ScriptWrite: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s);
  const docIn = over(f, fr(s) + 3, 12); const write = ramp(lf, 12, 150);
  const chips = [{ t: "hook first", c: CLAY, at: 34 }, { t: "open loops", c: SLATE, at: 62 }, { t: "spoken English", c: GREEN, at: 92 }];
  const repl = over(f, fr(s) + 158, 14);
  const nLines = Math.round(9 * write);
  return (<AbsoluteFill><Bloom cx={CX} cy={920} w={800} color="rgba(210,114,78,0.16)" lf={lf} />
    {/* the script document */}
    <div style={{ position: "absolute", left: CX - 285, top: 700, width: 420, borderRadius: 22, background: grad("#FDFAF3", "#F1ECE0"), boxShadow: SH, padding: "26px 28px", transform: `scale(${docIn})`, transformOrigin: "center top", minHeight: 380 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}><ClaudeMark size={44} glow={0.3} /><span style={{ ...inter9, fontSize: 25, color: INK }}>video script</span></div>
      {Array.from({ length: nLines }, (_, i) => <div key={i} style={{ height: 13, width: `${[92, 68, 84, 55, 90, 74, 62, 88, 47][i]}%`, borderRadius: 5, background: i === 0 ? "rgba(210,114,78,0.55)" : "rgba(26,24,19,0.22)", marginBottom: 12 }} />)}
      <Sheen r={22} />
    </div>
    {/* spec chips */}
    {chips.map((c, i) => { const e = over(f, fr(s) + c.at, 12);
      return e > 0.02 ? <div key={i} style={{ position: "absolute", left: 700, top: 742 + i * 92, padding: "12px 22px", borderRadius: 999, background: grad(c.c, c.c), color: "#fff", ...inter9, fontSize: 25, boxShadow: SH, transform: `scale(${e}) rotate(${(i - 1) * 3}deg)`, whiteSpace: "nowrap" }}>{c.t}</div> : null; })}
    {/* replaces the $200 writer */}
    {repl > 0.02 && <div style={{ position: "absolute", left: CX - 232, top: 1136, width: 464, padding: "15px 0", borderRadius: 18, background: grad("#FBF7EF", "#EFEADF"), boxShadow: SH, transform: `scale(${repl}) rotate(-2deg)`, display: "flex", alignItems: "center", justifyContent: "center", gap: 12, zIndex: 9 }}>
      <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 44, color: RED, textDecoration: "line-through", textDecorationThickness: 5 }}>$200</span>
      <span style={{ ...inter9, fontSize: 27, color: INK }}>per-video writer</span>
      <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 40, color: GREEN }}>$0</span></div>}
  </AbsoluteFill>); };

// ===== L5 the pipeline — Claude -> ElevenLabs -> CapCut -> published card =====
const Pipeline: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s);
  const stops = [
    { x: 190, y: 800, el: <ClaudeMark size={96} glow={0.4} />, lab: "writes it", at: 2 },
    { x: 452, y: 800, el: (<div style={{ width: 96, height: 96, borderRadius: 27, background: grad("#26221C", "#111"), boxShadow: SH, display: "flex", alignItems: "center", justifyContent: "center" }}>{[16, 30, 44, 30, 16].map((h, i) => <div key={i} style={{ width: 7, height: h + Math.sin(lf / 5 + i) * 9, borderRadius: 4, background: "#fff", margin: "0 3px" }} />)}<Sheen r={27} /></div>), lab: "reads it", at: 26 },
    { x: 714, y: 800, el: (<div style={{ width: 96, height: 96, borderRadius: 27, background: grad("#111418", "#000"), boxShadow: SH, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 47 }}>✂️<Sheen r={27} /></div>), lab: "cuts it", at: 54 },
  ];
  const pub = over(f, fr(s) + 108, 14);
  return (<AbsoluteFill><Bloom cx={CX} cy={900} w={840} color="rgba(76,123,176,0.17)" lf={lf} />
    <svg style={{ position: "absolute", inset: 0 }} width={1080} height={1920}>
      <path d="M286 848 L404 848" stroke="rgba(210,114,78,0.5)" strokeWidth={6} strokeLinecap="round" strokeDasharray={120} strokeDashoffset={120 * (1 - ramp(lf, 18, 34))} />
      <path d="M548 848 L666 848" stroke="rgba(58,92,132,0.5)" strokeWidth={6} strokeLinecap="round" strokeDasharray={120} strokeDashoffset={120 * (1 - ramp(lf, 46, 62))} />
      <path d="M810 848 Q880 848 880 920 T760 1064" stroke="rgba(63,158,116,0.5)" strokeWidth={6} fill="none" strokeLinecap="round" strokeDasharray={330} strokeDashoffset={330 * (1 - ramp(lf, 92, 116))} />
    </svg>
    {stops.map((st, i) => { const e = over(f, fr(s) + st.at, 13);
      return (<div key={i} style={{ position: "absolute", left: st.x - 48, top: st.y, opacity: e, transform: `scale(${0.6 + e * 0.4})` }}>{st.el}
        <div style={{ marginTop: 12, textAlign: "center", ...inter9, fontSize: 22, color: "rgba(26,24,19,0.62)" }}>{st.lab}</div></div>); })}
    {/* published video card w/ stock strip + title/tags */}
    {pub > 0.02 && <div style={{ position: "absolute", left: CX - 350, top: 1010, transform: `scale(${pub})`, transformOrigin: "center", display: "flex", gap: 20, alignItems: "center", zIndex: 9 }}>
      <VidCard w={300} bgA="#1E5C43" bgB="#123A2A" icon={<span>💵</span>} label={"why saving\nfeels impossible"} glow={0.45} />
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {["title ✓", "tags ✓", "chapters ✓"].map((t, i) => { const e2 = over(f, fr(s) + 118 + i * 9, 10);
          return <div key={i} style={{ padding: "9px 18px", borderRadius: 999, background: grad("#FBF7EF", "#EFEADF"), boxShadow: SH, ...inter9, fontSize: 23, color: INK, opacity: e2, transform: `translateX(${(1 - e2) * 30}px)` }}>{t}</div>; })}
      </div>
    </div>}
  </AbsoluteFill>); };

// ===== L6 money peak — analytics: 600k views x $18 -> $10,800/mo counter =====
const MoneyPeak: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s);
  const panIn = over(f, fr(s) + 3, 13); const climb = ramp(lf, 40, 128);
  const amt = Math.round(10800 * climb); const aff = over(f, fr(s) + 20, 12);
  const bars = [0.28, 0.36, 0.33, 0.46, 0.55, 0.62, 0.78, 0.9, 1];
  return (<AbsoluteFill><Bloom cx={CX} cy={930} w={880} color="rgba(63,158,116,0.22)" lf={lf} />
    <div style={{ position: "absolute", left: CX - 330, top: 712, width: 660, borderRadius: 26, background: grad("#FDFAF3", "#F1ECE0"), boxShadow: SH, padding: "26px 30px", transform: `scale(${panIn})`, transformOrigin: "center top" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
        <span style={{ ...inter9, fontSize: 25, color: "rgba(26,24,19,0.55)" }}>views / month</span>
        <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 52, color: SLATE }}>{Math.round(600 * Math.max(climb, 0.25))}k</span>
        <span style={{ marginLeft: "auto", ...inter9, fontSize: 25, color: "rgba(26,24,19,0.55)" }}>× $18</span>
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 13, height: 190, marginTop: 20 }}>
        {bars.map((b, i) => { const e = ramp(lf, 16 + i * 7, 34 + i * 7);
          return <div key={i} style={{ flex: 1, height: 190 * b * e, borderRadius: "8px 8px 3px 3px", background: i >= 7 ? grad(GREEN, "#2F7E5C") : grad("#B9C4D6", "#93A3BC"), boxShadow: i >= 7 ? "0 6px 18px rgba(63,158,116,0.4)" : undefined }} />; })}
      </div>
      <Sheen r={26} />
    </div>
    {aff > 0.02 && <div style={{ position: "absolute", left: 116, top: 1050, padding: "11px 22px", borderRadius: 999, background: grad(AMBER, "#A87A2E"), color: "#fff", ...inter9, fontSize: 24, boxShadow: SH, transform: `scale(${aff}) rotate(-3deg)`, zIndex: 9 }}>+ affiliate links</div>}
    {/* the $10,800 counter — biggest number last */}
    <div style={{ position: "absolute", left: CX - 250, top: 1104, width: 500, padding: "18px 0", borderRadius: 22, background: grad("#1E5C43", "#123A2A"), boxShadow: `${SH}, 0 0 ${30 + climb * 26}px rgba(63,158,116,${0.35 + climb * 0.3})`, display: "flex", alignItems: "center", justifyContent: "center", gap: 14, zIndex: 10, opacity: climb > 0.01 ? 1 : 0, transform: `scale(${0.9 + climb * 0.1})` }}>
      <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 66, color: "#fff" }}>${amt.toLocaleString()}</span>
      <span style={{ ...inter9, fontSize: 27, color: "rgba(255,255,255,0.85)" }}>/month, ads alone</span>
      <Sheen r={22} o={0.2} />
    </div>
  </AbsoluteFill>); };

const CTA: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const local = f - fr(s); if (local < 0) return null; const a = eOut(f, fr(s) + 2, 12); const pulse = 1 + Math.sin(f / 7) * 0.03;
  return (<AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
    {Array.from({ length: 12 }, (_, i) => { const p = eOut(f, fr(s) + 4 + i, 26); const ang = (i / 12) * Math.PI * 2; if (p <= 0 || p >= 1) return null; return <div key={i} style={{ position: "absolute", left: 540 + Math.cos(ang) * p * 340, top: 900 + Math.sin(ang) * p * 340, fontSize: 28, opacity: Math.sin(p * Math.PI), color: [SLATE, CLAY, AMBER, GREEN][i % 4] }}>✦</div>; })}
    <div style={{ marginTop: -150, transform: `scale(${0.7 + a * 0.3})`, opacity: a }}><ClaudeMark size={172} glow={0.5 + Math.sin(local / 9) * 0.12} /></div>
    <div style={{ marginTop: 46, transform: `scale(${pulse})`, padding: "28px 56px", borderRadius: 999, background: CLAY, color: "#fff", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 64, boxShadow: "0 24px 54px rgba(210,114,78,0.42)", opacity: a }}>💬 Comment "CHANNEL"</div>
    <div style={{ marginTop: 28, fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 600, fontSize: 44, color: INK, opacity: a, textAlign: "center" }}>and I'll send you the guide</div>
  </AbsoluteFill>); };

const L = [0, 9.45, 14.86, 20.79, 24.49, 32.6, 37.91, 43.28];
const VEND = 47.21;
const Sfx: React.FC<{ at: number; src: string; v?: number }> = ({ at, src, v = 0.3 }) => (<Sequence from={fr(at)} durationInFrames={fr(2.5)}><Audio src={staticFile(`sfx/${src}`)} volume={v} /></Sequence>);

export const ClaudeChannelReel: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 16, 28], [1.0, 1.08, 1.0], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  return (<AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
    <Audio src={staticFile("vo_channel.wav")} />
    <Audio loop src={staticFile("ados_bed_loud.wav")} volume={(ff) => interpolate(ff, [0, fr(L[7]) - 12, fr(L[7]) + 18, 99999], [0.5, 0.5, 0.42, 0.42], { extrapolateRight: "clamp" })} />
    <Sfx at={0} src="riser.wav" /><Sfx at={0} src="swooshup.wav" /><Sfx at={0.5} src="boom.wav" v={0.34} /><Sfx at={0.5} src="shimmer.wav" />
    {L.slice(1).map((t, i) => <React.Fragment key={i}><Sfx at={t - 0.1} src="swish.wav" v={0.24} /><Sfx at={t + 0.7} src="pop.wav" v={0.22} /></React.Fragment>)}
    <Sfx at={L[7]} src="resolve.wav" v={0.34} /><Sfx at={L[7] + 0.5} src="sparkle.wav" v={0.3} />
    <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "50% 46%" }}>
      <Background />
      <Scene s={L[0]} e={L[1]}><Hook s={L[0]} /></Scene>
      <Scene s={L[1]} e={L[2]}><NichePick s={L[1]} /></Scene>
      <Scene s={L[2]} e={L[3]}><RpmBars s={L[2]} /></Scene>
      <Scene s={L[3]} e={L[4]}><NichePrompt s={L[3]} /></Scene>
      <Scene s={L[4]} e={L[5]}><ScriptWrite s={L[4]} /></Scene>
      <Scene s={L[5]} e={L[6]}><Pipeline s={L[5]} /></Scene>
      <Scene s={L[6]} e={L[7]}><MoneyPeak s={L[6]} /></Scene>
      <CTA s={L[7]} />
      <HeroHeader />
      <ProgressBar dur={VEND} cta={L[7]} />
      <Captions />
    </AbsoluteFill>
  </AbsoluteFill>); };
