import React from "react";
import { AbsoluteFill, Audio, Easing, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { fraunces, frauncesItalic, inter } from "./fonts";
import wordsData from "./data/words_books.json";

/** ClaudeBooksReel — "Claude did my books for $0" (CTA BOOKS). Nightshift split: dark stage holds one hero per beat, captions below. Reddit story → messy folder → 2-word prompt → P&L builds. */
const CREAM = "#ECE9E2", INK = "#1A1813", SLATE = "#3A5C84", CLAY = "#D2724E", AMBER = "#CF9544", GREEN = "#3F9E74", MUTE = "#9A968B", RED = "#C44A3A", ORANGE = "#FF4C22", BLUE = "#3E6CF0";
const FPS = 30; const fr = (s: number) => s * FPS; const CX = 540; const HCY = 690;
const mono = "ui-monospace, 'SF Mono', Menlo, monospace";
const eOut = (f: number, sF: number, d = 10) => interpolate(f, [sF, sF + d], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
const ramp = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const over = (f: number, sF: number, d = 12) => interpolate(f, [sF, sF + d * 0.5, sF + d], [0, 1.1, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
const grad = (a: string, b: string) => `linear-gradient(158deg, ${a} 0%, ${b} 100%)`;
const CLAUDE_PATH = "m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z";
const SH = "inset 0 1.5px 0 rgba(255,255,255,0.5), 0 2px 4px rgba(10,14,26,0.3), 0 18px 40px rgba(10,14,26,0.4)";
const IMSH = "0 14px 30px rgba(8,12,24,0.4), 0 4px 10px rgba(8,12,24,0.28)";
const Sheen: React.FC<{ r: number | string; o?: number }> = ({ r, o = 0.3 }) => (<div style={{ position: "absolute", inset: 0, borderRadius: r, background: `linear-gradient(125deg, rgba(255,255,255,${o}) 0%, rgba(255,255,255,0) 32%)`, pointerEvents: "none" }} />);
const Glint: React.FC<{ lf: number; start: number; dur?: number; r: number | string }> = ({ lf, start, dur = 16, r }) => { const t = ramp(lf, start, start + dur); if (t <= 0 || t >= 1) return null; return (<div style={{ position: "absolute", inset: 0, borderRadius: r, overflow: "hidden", pointerEvents: "none" }}><div style={{ position: "absolute", top: "-30%", left: `${interpolate(t, [0, 1], [-40, 130])}%`, width: "34%", height: "160%", background: "linear-gradient(105deg, transparent, rgba(255,255,255,0.5), transparent)", transform: "rotate(9deg)" }} /></div>); };
const Bloom: React.FC<{ cx: number; cy: number; w: number; color: string; lf: number; base?: number }> = ({ cx, cy, w, color, lf, base = 0.5 }) => (<div style={{ position: "absolute", left: cx - w / 2, top: cy - w / 2, width: w, height: w, borderRadius: "50%", background: `radial-gradient(circle at 50% 46%, ${color} 0%, transparent 62%)`, opacity: base + Math.sin(lf / 9) * 0.14, pointerEvents: "none" }} />);
const ClaudeMark: React.FC<{ size: number; glow?: number }> = ({ size, glow = 0.4 }) => (<div style={{ position: "relative", width: size, height: size, borderRadius: size * 0.28, background: grad("#E08A66", "#C5603C"), boxShadow: `${SH}, 0 0 ${Math.round(size * 0.4)}px rgba(210,114,78,${glow})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><svg viewBox="0 0 24 24" width={size * 0.58} height={size * 0.58}><path fill="#F6EFE6" d={CLAUDE_PATH} /></svg><Sheen r={size * 0.28} /></div>);

const Stage: React.FC = () => { const f = useCurrentFrame(); const out = ramp(f, fr(27.3), fr(28.1)); const drift = Math.sin(f / 120) * 6;
  return (<AbsoluteFill style={{ background: "radial-gradient(120% 90% at 50% 8%, #F3F1EB 0%, #ECE9E2 46%, #E4E0D6 100%)" }}>
    <div style={{ position: "absolute", inset: -40, opacity: 0.5, backgroundImage: "linear-gradient(rgba(58,92,132,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(58,92,132,0.05) 1px, transparent 1px)", backgroundSize: "62px 62px" }} />
    <div style={{ position: "absolute", left: 36, right: 36, top: 284, height: 820, borderRadius: 52, background: "linear-gradient(158deg, #2C3A54 0%, #1B2540 54%, #111A2C 100%)", boxShadow: "0 44px 96px rgba(12,18,36,0.44), inset 0 2px 0 rgba(255,255,255,0.08)", opacity: 1 - out, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.55, backgroundImage: "radial-gradient(rgba(130,160,210,0.10) 1.3px, transparent 1.3px)", backgroundSize: "30px 30px", transform: `translateY(${drift}px)` }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 260, background: "radial-gradient(100% 100% at 50% 0%, rgba(120,150,210,0.16), transparent)" }} />
      <div style={{ position: "absolute", bottom: -80, left: "50%", width: 900, height: 260, transform: "translateX(-50%)", background: "radial-gradient(circle, rgba(63,158,116,0.10), transparent 70%)" }} />
    </div>
  </AbsoluteFill>); };
const Marker: React.FC<{ x: number; y: number; w: number; h: number; lf: number; at: number; color?: string; dur?: number; label?: string; below?: boolean }> = ({ x, y, w, h, lf, at, color = AMBER, dur = 14, label, below }) => {
  const p = ramp(lf, at, at + dur); if (p <= 0) return null;
  return (<><div style={{ position: "absolute", left: x, top: y, width: w * p, height: h, borderRadius: 7, background: `${color}3A`, borderBottom: `4px solid ${color}`, boxShadow: `0 0 18px ${color}88`, zIndex: 15 }} />
    <div style={{ position: "absolute", left: x + w * p - 5, top: y - 4, width: 10, height: h + 8, borderRadius: 5, background: color, boxShadow: `0 0 14px ${color}`, opacity: p < 1 ? 1 : 0, zIndex: 16 }} />
    {label && p > 0.7 && <div style={{ position: "absolute", left: x, top: below ? y + h + 10 : y - 46, padding: "6px 14px", borderRadius: 9, background: grad("#26221C", "#15120E"), color: "#F4EFE6", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 22, whiteSpace: "nowrap", boxShadow: IMSH, borderLeft: `4px solid ${color}`, zIndex: 16 }}>{label}</div>}</>);
};
const Cursor: React.FC<{ x: number; y: number; click?: boolean }> = ({ x, y, click }) => (<div style={{ position: "absolute", left: x, top: y, zIndex: 30 }}>{click && <div style={{ position: "absolute", left: -16, top: -16, width: 40, height: 40, borderRadius: "50%", border: `3px solid ${CLAY}`, opacity: 0.7 }} />}<svg width={34} height={34} viewBox="0 0 24 24" style={{ filter: "drop-shadow(0 3px 5px rgba(0,0,0,0.5))" }}><path d="M5 3 L5 19 L9.5 14.8 L12.5 21 L15 20 L12 14 L18 13.5 Z" fill="#fff" stroke="#222" strokeWidth={1.3} strokeLinejoin="round" /></svg></div>);
const Scene: React.FC<{ s: number; e: number; children: React.ReactNode }> = ({ s, e, children }) => { const frame = useCurrentFrame(); const local = frame - fr(s); const lenF = fr(e - s); if (local < 0 || local > lenF) return null; const inF = s <= 0 ? 1 : eOut(frame, fr(s), 6); const op = Math.min(inF, 1 - eOut(frame, fr(e - 0.16), 6)); return <AbsoluteFill style={{ opacity: op }}>{children}</AbsoluteFill>; };

// ===== S0 HOOK — the viral Reddit post =====
const HookScene: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s); const hOut = eOut(f, fr(6.68) - 7, 7); const up = Math.round(interpolate(eOut(lf, 20, 40), [0, 1], [128, 4200]));
  return (<AbsoluteFill>
    <div style={{ position: "absolute", top: 336, left: 40, right: 40, textAlign: "center", opacity: 1 - hOut, transform: `translateY(${-hOut * 12}px)`, zIndex: 40 }}>
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 25, letterSpacing: "0.16em", color: "#93A6C4", marginBottom: 6, textTransform: "uppercase" }}>Claude did his taxes for</div>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 128, lineHeight: 0.9, letterSpacing: "-0.03em", color: "#F3EEE4" }}><span style={{ color: GREEN }}>$0</span></div>
    </div>
    <Bloom cx={CX} cy={840} w={900} color="rgba(255,76,34,0.14)" lf={lf} base={0.4} />
    {/* reddit post card */}
    <div style={{ position: "absolute", left: CX - 400, top: 546, width: 800, transform: `scale(${over(lf, 4, 12)})` }}>
      <div style={{ borderRadius: 22, background: "#fff", boxShadow: SH, overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 11, padding: "18px 26px 10px" }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: ORANGE, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: 24, fontFamily: fraunces.fontFamily }}>r/</div>
          <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 24, color: INK }}>r/ClaudeAI</span>
          <span style={{ fontFamily: inter.fontFamily, fontWeight: 500, fontSize: 22, color: MUTE }}>· 14h</span>
        </div>
        <div style={{ padding: "4px 26px 8px" }}><span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 40, lineHeight: 1.12, color: INK }}>I pointed Claude at my tax folder and it did my whole return in 15 minutes.</span></div>
        <div style={{ padding: "6px 26px 16px", fontFamily: inter.fontFamily, fontWeight: 500, fontSize: 25, lineHeight: 1.4, color: "#5e5950" }}>No accountant. No TurboTax. I just dropped the folder in and typed two words…</div>
        <div style={{ display: "flex", alignItems: "center", gap: 24, padding: "12px 26px 18px", borderTop: "1px solid #f2ede4" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 16px", borderRadius: 999, background: "rgba(255,76,34,0.12)" }}><span style={{ color: ORANGE, fontWeight: 900, fontSize: 24 }}>▲</span><span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 24, color: ORANGE }}>{(up / 1000).toFixed(1)}k</span><span style={{ color: MUTE, fontWeight: 900, fontSize: 24 }}>▼</span></div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: MUTE, fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 23 }}>💬 1.3k</div>
        </div>
      </div>
    </div>
    <Marker x={CX - 372} y={694} w={430} h={54} lf={lf} at={14} color={AMBER} label="15 minutes" below />
  </AbsoluteFill>); };

// ===== S1 PIVOT — your books, any month =====
const PivotScene: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s); const mo = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
  return (<AbsoluteFill>
    <Bloom cx={CX} cy={HCY} w={900} color="rgba(63,158,116,0.16)" lf={lf} />
    <div style={{ position: "absolute", left: CX - 70, top: 470 }}><ClaudeMark size={140} glow={0.6} /></div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 700, display: "flex", justifyContent: "center", gap: 14 }}>{mo.map((m, i) => { const e = over(lf, 6 + i * 2, 10); return <div key={i} style={{ width: 62, height: 78, borderRadius: 14, background: "#fff", boxShadow: IMSH, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: e, transform: `translateY(${(1 - e) * 20}px)` }}><span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 26, color: INK }}>{m}</span><span style={{ marginTop: 4, width: 22, height: 22, borderRadius: "50%", background: GREEN, color: "#fff", fontSize: 13, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center", opacity: ramp(lf, 14 + i * 2, 20 + i * 2) }}>✓</span></div>; })}</div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 906, textAlign: "center", opacity: ramp(lf, 30, 42) }}><span style={{ fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 600, fontSize: 40, color: "#C9D2E2" }}>any month of the year</span></div>
  </AbsoluteFill>); };

// ===== S2 PAIN — $300/mo bookkeeper OR a shoebox of receipts =====
const PainScene: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s); const a1 = over(lf, 6, 12), a2 = over(lf, 22, 12);
  return (<AbsoluteFill>
    <Bloom cx={CX} cy={HCY} w={980} color="rgba(196,74,58,0.12)" lf={lf} />
    {/* bookkeeper bill */}
    <div style={{ position: "absolute", left: 96, top: HCY - 150, width: 356, opacity: a1, transform: `scale(${0.88 + Math.min(a1, 1) * 0.12})` }}>
      <div style={{ borderRadius: 22, background: "#fff", boxShadow: SH, padding: "28px 30px", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 23, letterSpacing: "0.05em", color: MUTE, textTransform: "uppercase" }}>a bookkeeper</div>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 84, color: RED, lineHeight: 1 }}>$300<span style={{ fontSize: 32, color: "#B7B0A4" }}>/mo</span></div>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 22, color: MUTE }}>every single month</div>
      </div></div>
    <div style={{ position: "absolute", left: CX - 34, top: HCY - 44, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 52, color: "#9DA8BC", opacity: ramp(lf, 18, 28) }}>or</div>
    {/* shoebox of receipts */}
    <div style={{ position: "absolute", right: 96, top: HCY - 150, width: 356, opacity: a2, transform: `scale(${0.88 + Math.min(a2, 1) * 0.12})` }}>
      <div style={{ borderRadius: 22, background: "#fff", boxShadow: SH, padding: "28px 30px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 23, letterSpacing: "0.05em", color: MUTE, textTransform: "uppercase" }}>or a shoebox</div>
        <div style={{ position: "relative", width: 220, height: 130, marginTop: 4 }}>
          {[0, 1, 2, 3, 4].map((i) => { const e = ramp(lf, 26 + i * 3, 34 + i * 3); return <div key={i} style={{ position: "absolute", left: 40 + i * 26 + Math.sin(i) * 6, top: 8 - i * 4, width: 78, height: 100, borderRadius: 6, background: i % 2 ? "#F3EEE2" : "#FBF7EE", boxShadow: "0 4px 10px rgba(40,32,20,0.18)", transform: `rotate(${(i - 2) * 11}deg)`, opacity: e, border: "1px solid #e6dfd2" }}><div style={{ margin: "12px 8px 0", height: 4, background: "#d9d2c4", borderRadius: 2 }} /><div style={{ margin: "8px 8px 0", height: 4, width: "60%", background: "#d9d2c4", borderRadius: 2 }} /></div>; })}
          <div style={{ position: "absolute", left: 0, bottom: 0, width: 220, height: 66, borderRadius: "8px 8px 12px 12px", background: grad("#C98A52", "#A96E38"), boxShadow: IMSH }} />
        </div>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 22, color: RED, marginTop: 6 }}>ignored until April</div>
      </div></div>
  </AbsoluteFill>); };

// ===== S3 FOLDER — drop statements, receipts, exports into one folder =====
const FILES = [{ n: "Chase-Jan.pdf", c: RED, t: "PDF" }, { n: "receipts.zip", c: AMBER, t: "ZIP" }, { n: "Stripe.csv", c: GREEN, t: "CSV" }, { n: "Amex-Q2.pdf", c: RED, t: "PDF" }, { n: "invoice-88.pdf", c: RED, t: "PDF" }, { n: "payouts.csv", c: GREEN, t: "CSV" }];
const FolderScene: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s);
  return (<AbsoluteFill>
    <Bloom cx={CX} cy={HCY} w={960} color="rgba(62,108,240,0.14)" lf={lf} />
    <div style={{ position: "absolute", left: CX - 430, top: 396, width: 860 }}>
      <div style={{ borderRadius: 18, overflow: "hidden", background: "#F4F1EC", boxShadow: SH }}>
        <div style={{ height: 54, background: "#E7E3DB", display: "flex", alignItems: "center", padding: "0 20px", gap: 8, borderBottom: "1px solid #d6d2c9" }}><div style={{ display: "flex", gap: 8 }}>{["#FF5F57", "#FEBC2E", "#28C840"].map((c) => <div key={c} style={{ width: 14, height: 14, borderRadius: "50%", background: c }} />)}</div><span style={{ marginLeft: 14, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 22, color: "#6b6b6b", display: "flex", alignItems: "center", gap: 9 }}><span style={{ color: "#5B9BD5", fontSize: 24 }}>📁</span> Bookkeeping</span></div>
        <div style={{ padding: "34px 30px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "26px 20px", minHeight: 380, background: "#FCFAF6" }}>
          {FILES.map((fl, i) => { const e = over(lf, 8 + i * 6, 12); return (<div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, opacity: e, transform: `translateY(${(1 - e) * -50}px) scale(${0.8 + Math.min(e, 1) * 0.2})` }}>
            <div style={{ width: 92, height: 112, borderRadius: 10, background: "#fff", boxShadow: IMSH, position: "relative", overflow: "hidden", border: "1px solid #ece6da" }}><div style={{ position: "absolute", top: 0, right: 0, width: 30, height: 30, background: "#eee7da", clipPath: "polygon(0 0, 100% 100%, 100% 0)" }} /><div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 34, background: fl.c, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 18, letterSpacing: "0.04em" }}>{fl.t}</div><div style={{ padding: "14px 12px 0" }}>{[1, 0.8, 0.9, 0.6].map((w, j) => <div key={j} style={{ height: 4, width: `${w * 100}%`, background: "#e2dccf", borderRadius: 2, marginBottom: 6 }} />)}</div></div>
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 20, color: "#5e5950" }}>{fl.n}</span></div>); })}
        </div>
      </div>
    </div>
    <Cursor x={interpolate(ramp(lf, 4, 40), [0, 1], [820, 540])} y={interpolate(ramp(lf, 4, 40), [0, 1], [420, 700])} click={ramp(lf, 30, 40) > 0.5} />
  </AbsoluteFill>); };

// ===== S4 PROMPT — point Claude at it, two words =====
const PromptScene: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s); const q = "categorize everything"; const qn = Math.floor(ramp(lf, 8, 40) * q.length); const done = qn >= q.length;
  return (<AbsoluteFill>
    <Bloom cx={CX} cy={HCY} w={900} color="rgba(210,114,78,0.16)" lf={lf} />
    <div style={{ position: "absolute", left: 100, right: 100, top: 512 }}>
      <div style={{ borderRadius: 22, background: "#0E1524", boxShadow: `${SH}, 0 0 60px rgba(210,114,78,0.2)`, border: "1px solid rgba(130,160,210,0.18)", overflow: "hidden" }}>
        <div style={{ height: 56, background: "#18202F", display: "flex", alignItems: "center", padding: "0 22px", gap: 10, borderBottom: "1px solid rgba(130,160,210,0.12)" }}><ClaudeMark size={32} /><span style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 24, color: "#c7cee0" }}>Claude</span></div>
        <div style={{ padding: "30px 34px 36px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "10px 18px", borderRadius: 12, background: "rgba(62,108,240,0.16)", border: "1.5px solid rgba(90,134,255,0.5)", marginBottom: 22 }}><span style={{ fontSize: 24 }}>📁</span><span style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 24, color: "#B8CDE6" }}>Bookkeeping</span><span style={{ fontFamily: mono, fontSize: 20, color: "#7f8aa0" }}>6 files</span></div>
          <div style={{ fontFamily: inter.fontFamily, fontSize: 40, fontWeight: 600, color: "#EAE3D5" }}>{q.slice(0, qn)}{!done && lf % 16 < 8 ? "▋" : ""}</div>
        </div>
      </div>
    </div>
    {done && <div style={{ position: "absolute", left: 0, right: 0, top: 942, textAlign: "center", opacity: ramp(lf, 42, 52) }}><span style={{ fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 600, fontSize: 38, color: "#C9D2E2" }}>two words.</span></div>}
  </AbsoluteFill>); };

// ===== S5 RESULT — reconciles transactions → clean P&L (HERO) =====
const PL = [{ k: "Revenue", v: "$128,400", c: GREEN, exp: false }, { k: "Software", v: "$4,200", c: BLUE, exp: true }, { k: "Payroll", v: "$62,000", c: SLATE, exp: true }, { k: "Meals & Travel", v: "$3,850", c: AMBER, exp: true }, { k: "Rent", v: "$18,000", c: CLAY, exp: true }];
const ResultScene: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s);
  const recon = Math.round(interpolate(eOut(lf, 4, 44), [0, 1], [24, 1247])); const doneRecon = lf > 46;
  return (<AbsoluteFill>
    <Bloom cx={CX} cy={HCY} w={1000} color="rgba(63,158,116,0.16)" lf={lf} />
    <div style={{ position: "absolute", left: CX - 400, top: 356, width: 800 }}>
      <div style={{ borderRadius: 20, background: "#fff", boxShadow: SH, overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 28px", background: grad("#FBF8F2", "#F1E9DA"), borderBottom: "1px solid #e6dfd2" }}>
          <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 34, color: INK }}>Profit & Loss</span>
          <div style={{ display: "flex", alignItems: "center", gap: 9, fontFamily: mono, fontWeight: 700, fontSize: 22, color: doneRecon ? GREEN : SLATE }}><span style={{ width: 11, height: 11, borderRadius: "50%", background: doneRecon ? GREEN : SLATE, opacity: 0.5 + Math.abs(Math.sin(lf / 6)) * 0.5 }} />{doneRecon ? "✓ reconciled" : `⟳ ${recon} txns`}</div>
        </div>
        <div style={{ padding: "14px 28px 20px" }}>
          {PL.map((r, i) => { const e = over(lf, 20 + i * 7, 12); return (<div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px 4px", borderBottom: "1px solid #f4efe6", opacity: e, transform: `translateX(${(1 - e) * -20}px)` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}><span style={{ width: 14, height: 14, borderRadius: 4, background: r.c }} /><span style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 26, color: INK }}>{r.k}</span></div>
            <span style={{ fontFamily: mono, fontWeight: 700, fontSize: 26, color: r.exp ? "#8a8478" : GREEN }}>{r.exp ? "−" : ""}{r.v}</span></div>); })}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 4px 6px", marginTop: 6, borderTop: "2px solid #e6dfd2", opacity: ramp(lf, 62, 74) }}>
            <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 32, color: INK }}>Net Profit</span>
            <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 40, color: GREEN }}>$40,350</span></div>
        </div>
        <Glint lf={lf} start={66} r={20} />
      </div>
    </div>
    {lf > 70 && <div style={{ position: "absolute", left: 0, right: 0, top: 872, display: "flex", justifyContent: "center" }}><div style={{ transform: `rotate(-4deg) scale(${over(lf, 70, 12)})`, padding: "12px 30px", borderRadius: 14, border: `4px solid ${GREEN}`, background: "rgba(63,158,116,0.16)", color: GREEN, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 36, boxShadow: `${IMSH}, 0 0 26px rgba(63,158,116,0.4)` }}>✓ ready to file</div></div>}
  </AbsoluteFill>); };

// ===== S6 STAKE — a few-hundred-dollar job for $0, in the time it takes to make coffee =====
const CoffeeCup: React.FC<{ lf: number }> = ({ lf }) => (<svg width={220} height={220} viewBox="0 0 100 100">
  {[0, 1, 2].map((i) => { const t = ((lf / 22 + i * 0.33) % 1); return <path key={i} d={`M${38 + i * 12} ${34 - t * 14} q6 -6 0 -12`} fill="none" stroke="#C9D2E2" strokeWidth={3} strokeLinecap="round" opacity={(1 - t) * 0.7} />; })}
  <path d="M22 40 L26 82 a6 6 0 0 0 6 6 L60 88 a6 6 0 0 0 6 -6 L70 40 Z" fill="#fff" stroke="#E7E0D2" strokeWidth={2} />
  <path d="M70 48 q16 0 16 12 t-16 12" fill="none" stroke="#fff" strokeWidth={6} strokeLinecap="round" />
  <ellipse cx={46} cy={40} rx={24} ry={5} fill="#D2724E" /></svg>);
const StakeScene: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s); const flip = ramp(lf, 22, 36);
  return (<AbsoluteFill>
    <Bloom cx={CX} cy={HCY} w={900} color="rgba(63,158,116,0.2)" lf={lf} base={0.42} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 448, textAlign: "center", transform: `scale(${over(lf, 2, 12)})` }}>
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 26, letterSpacing: "0.08em", color: "#93A6C4", textTransform: "uppercase", marginBottom: 12 }}>a $300–$2,000 job</div>
      <div style={{ position: "relative", display: "inline-block" }}>
        <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 176, lineHeight: 0.9, color: GREEN, textShadow: "0 3px 30px rgba(63,158,116,0.5)" }}>$0</span>
      </div>
    </div>
    <div style={{ position: "absolute", left: CX - 110, top: 792 }}><CoffeeCup lf={lf} /></div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1024, textAlign: "center", opacity: ramp(lf, 24, 38) }}><span style={{ fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 600, fontSize: 40, color: "#C9D2E2" }}>in the time it takes to make coffee</span></div>
  </AbsoluteFill>); };

// ===== CTA =====
const CTA: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const local = f - fr(s); if (local < 0) return null; const a = eOut(f, fr(s) + 2, 12); const pillPop = over(local, 10, 14); const pulse = 1 + Math.sin(f / 7) * 0.03;
  return (<AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingBottom: 150 }}>
    {Array.from({ length: 16 }, (_, i) => { const wave = i < 12 ? 4 : 30; const p = eOut(f, fr(s) + wave + (i % 12), 28); const ang = (i / 8) * Math.PI; if (p <= 0 || p >= 1) return null; return <div key={i} style={{ position: "absolute", left: 540 + Math.cos(ang) * p * 360, top: 820 + Math.sin(ang) * p * 360, fontSize: 26, opacity: Math.sin(p * Math.PI), color: [SLATE, CLAY, GREEN, AMBER][i % 4] }}>✦</div>; })}
    <div style={{ marginTop: -140, transform: `scale(${0.7 + a * 0.3})`, opacity: a }}><ClaudeMark size={158} glow={0.5 + Math.sin(local / 9) * 0.12} /></div>
    <div style={{ marginTop: 44, transform: `scale(${(0.8 + pillPop * 0.2) * pulse})`, padding: "28px 56px", borderRadius: 999, background: CLAY, color: "#fff", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 68, boxShadow: "0 24px 54px rgba(210,114,78,0.42)", opacity: a }}>💬 Comment "BOOKS"</div>
    <div style={{ marginTop: 26, fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 600, fontSize: 42, color: INK, opacity: a, textAlign: "center" }}>and I'll send the exact prompt + setup</div>
  </AbsoluteFill>); };

// ===== Captions =====
type Word = { word: string; start: number; end: number; line: number };
const WORDS = wordsData as Word[];
const cleanw = (w: string) => w.toLowerCase().replace(/[^a-z0-9'$,.]/g, "");
const EMPH = new Set(["reddit", "claude,", "claude", "tax", "folder", "folder.", "15", "minutes", "turbotax.", "books", "books,", "month", "bookkeeper", "shoebox", "receipts,", "receipts", "april.", "bank", "statements,", "exports", "categorize", "everything.", "reconciles", "transaction,", "accountant", "profit", "loss", "file.", "hundred", "dollar", "nothing,", "coffee.", "comment"]);
const CHUNKS = (() => { const byLine: Record<number, Word[]> = {}; for (const w of WORDS) (byLine[w.line] ||= []).push(w);
  const out: { words: Word[]; start: number; line: number }[] = [];
  for (const li of Object.keys(byLine).map(Number).sort((a, b) => a - b)) { const ws = byLine[li]; for (let i = 0; i < ws.length; i += 3) { const g = ws.slice(i, i + 3); out.push({ words: g, start: g[0].start, line: li }); } }
  const aE = Math.max(...WORDS.map((w) => w.end)); return out.map((c, i) => ({ ...c, end: i + 1 < out.length ? out[i + 1].start : aE + 0.4 })); })();
const Captions: React.FC = () => { const frame = useCurrentFrame();
  return (<>{CHUNKS.map((c, i) => { if (frame < fr(c.start) || frame >= fr(c.end)) return null; if (c.line === 7) return null;
    return (<div key={i} style={{ position: "absolute", top: 1250, left: 64, right: 64, height: 170, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "center", gap: "0 15px", width: 952, textAlign: "center" }}>
        {c.words.map((w, j) => { const g = EMPH.has(cleanw(w.word)); const shown = frame >= fr(w.start);
          return <span key={j} style={{ display: "inline-block", opacity: shown ? 1 : 0, fontFamily: g ? frauncesItalic.fontFamily : fraunces.fontFamily, fontStyle: g ? "italic" : "normal", fontWeight: g ? 700 : 600, fontSize: g ? 74 : 64, lineHeight: 1.04, color: g ? SLATE : INK, letterSpacing: "-0.02em", textShadow: "0 2px 14px rgba(236,233,226,0.96), 0 1px 2px rgba(236,233,226,1)" }}>{w.word}</span>; })}
      </div></div>); })}</>); };

const ProgressBar: React.FC = () => { const f = useCurrentFrame(); const { durationInFrames } = useVideoConfig(); const p = Math.min(1, f / (durationInFrames - 1));
  return (<div style={{ position: "absolute", left: 46, right: 46, top: 200, height: 13, borderRadius: 999, zIndex: 120 }}>
    <div style={{ position: "absolute", inset: 0, background: "rgba(58,92,132,0.15)", borderRadius: 999 }} />
    <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${p * 100}%`, background: grad("#E08A66", "#C5603C"), borderRadius: 999, boxShadow: "0 2px 8px rgba(210,114,78,0.35)" }} />
    <div style={{ position: "absolute", left: `${p * 100}%`, top: -3, width: 19, height: 19, borderRadius: "50%", background: CLAY, border: "3px solid #F3EFE7", boxShadow: "0 0 12px rgba(210,114,78,0.9)", transform: "translateX(-50%)" }} /></div>); };

const L = [0, 6.68, 9.06, 13.52, 16.58, 18.74, 24.12, 27.62];
const Sfx: React.FC<{ at: number; src: string; v?: number; dur?: number }> = ({ at, src, v = 0.3, dur = 2.5 }) => (<Sequence from={fr(at)} durationInFrames={fr(dur)}><Audio src={staticFile(`sfx/${src}`)} volume={v} /></Sequence>);
const Ticks: React.FC<{ start: number; n: number; step: number; src?: string; v?: number }> = ({ start, n, step, src = "tick.wav", v = 0.24 }) => (<>{Array.from({ length: n }, (_, i) => <Sfx key={i} at={start + i * step} src={src} v={v} dur={0.5} />)}</>);

export const ClaudeBooksReel: React.FC = () => { const frame = useCurrentFrame(); const zoom = interpolate(frame, [0, 16, 28], [1.0, 1.03, 1.0], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  return (<AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
    <Audio src={staticFile("vo_books.wav")} />
    <Audio loop src={staticFile("seo_music.wav")} volume={(ff) => interpolate(ff, [0, fr(1.6), fr(L[7]) - 10, fr(L[7]) + 16, 99999], [0, 0.2, 0.2, 0.15, 0.15], { extrapolateRight: "clamp" })} />
    <Sfx at={0} src="metal_riser.wav" v={0.85} /><Sfx at={0} src="sub.wav" v={0.8} /><Sfx at={0.25} src="boom.wav" v={0.7} /><Sfx at={1.6} src="ding.wav" v={0.4} />
    {L.slice(1).map((t, i) => <React.Fragment key={i}><Sfx at={t - 0.1} src="swish.wav" v={0.44} /><Sfx at={t + 0.35} src="pop.wav" v={0.32} /></React.Fragment>)}
    <Ticks start={9.4} n={5} step={0.4} src="blip3.wav" v={0.22} />
    <Ticks start={13.9} n={6} step={0.4} src="pop.wav" v={0.24} /><Sfx at={16.3} src="snap.wav" v={0.4} />
    <Ticks start={16.9} n={11} step={0.11} src="key.wav" v={0.2} />
    <Sfx at={19.0} src="data.wav" v={0.45} /><Ticks start={19.2} n={5} step={0.7} src="blip3.wav" v={0.22} /><Sfx at={22.9} src="ding.wav" v={0.5} />
    <Sfx at={24.4} src="ding.wav" v={0.4} /><Sfx at={26.9} src="pop.wav" v={0.3} />
    <Sfx at={L[7]} src="resolve.wav" v={0.5} /><Sfx at={L[7] + 0.2} src="angelic.wav" v={0.4} dur={3.2} /><Sfx at={L[7] + 0.4} src="sparkle.wav" v={0.55} />
    <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "50% 44%" }}>
      <Stage />
      <Scene s={L[0]} e={L[1]}><HookScene s={L[0]} /></Scene>
      <Scene s={L[1]} e={L[2]}><PivotScene s={L[1]} /></Scene>
      <Scene s={L[2]} e={L[3]}><PainScene s={L[2]} /></Scene>
      <Scene s={L[3]} e={L[4]}><FolderScene s={L[3]} /></Scene>
      <Scene s={L[4]} e={L[5]}><PromptScene s={L[4]} /></Scene>
      <Scene s={L[5]} e={L[6]}><ResultScene s={L[5]} /></Scene>
      <Scene s={L[6]} e={L[7]}><StakeScene s={L[6]} /></Scene>
      <CTA s={L[7]} />
      <Captions />
    </AbsoluteFill>
    <ProgressBar />
  </AbsoluteFill>); };
