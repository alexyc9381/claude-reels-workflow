import React from "react";
import { AbsoluteFill, Audio, Easing, Img, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { fraunces, frauncesItalic, inter } from "./fonts";
import wordsData from "./data/words_leads.json";

/** ClaudeLeadsReel — "The Free Lead Machine" (CTA LEADS). Nightshift-style SPLIT: a dark "screen" stage holds ONE calm hero per beat, captions clearly separated below. Real repo + Saraev left-to-right marker. */
const CREAM = "#ECE9E2", INK = "#1A1813", SLATE = "#3A5C84", CLAY = "#D2724E", AMBER = "#CF9544", GREEN = "#3F9E74", MUTE = "#9A968B", RED = "#C44A3A", GH = "#0D1117", NAVY = "#141D30";
const FPS = 30; const fr = (s: number) => s * FPS; const CX = 540; const HCY = 690;
const mono = "ui-monospace, 'SF Mono', Menlo, monospace";
const eOut = (f: number, sF: number, d = 10) => interpolate(f, [sF, sF + d], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
const ramp = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const over = (f: number, sF: number, d = 12) => interpolate(f, [sF, sF + d * 0.5, sF + d], [0, 1.1, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
const eio = (f: number, a: number, b: number, va: number, vb: number) => interpolate(f, [a, b], [va, vb], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
const grad = (a: string, b: string) => `linear-gradient(158deg, ${a} 0%, ${b} 100%)`;
const CLAUDE_PATH = "m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z";
const SH = "inset 0 1.5px 0 rgba(255,255,255,0.5), 0 2px 4px rgba(10,14,26,0.3), 0 18px 40px rgba(10,14,26,0.4)";
const IMSH = "0 14px 30px rgba(8,12,24,0.4), 0 4px 10px rgba(8,12,24,0.28)";
const Sheen: React.FC<{ r: number | string; o?: number }> = ({ r, o = 0.3 }) => (<div style={{ position: "absolute", inset: 0, borderRadius: r, background: `linear-gradient(125deg, rgba(255,255,255,${o}) 0%, rgba(255,255,255,0) 32%)`, pointerEvents: "none" }} />);
const Bloom: React.FC<{ cx: number; cy: number; w: number; color: string; lf: number; base?: number }> = ({ cx, cy, w, color, lf, base = 0.5 }) => (<div style={{ position: "absolute", left: cx - w / 2, top: cy - w / 2, width: w, height: w, borderRadius: "50%", background: `radial-gradient(circle at 50% 46%, ${color} 0%, transparent 62%)`, opacity: base + Math.sin(lf / 9) * 0.14, pointerEvents: "none" }} />);
const ClaudeMark: React.FC<{ size: number; glow?: number }> = ({ size, glow = 0.4 }) => (<div style={{ position: "relative", width: size, height: size, borderRadius: size * 0.28, background: grad("#E08A66", "#C5603C"), boxShadow: `${SH}, 0 0 ${Math.round(size * 0.4)}px rgba(210,114,78,${glow})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><svg viewBox="0 0 24 24" width={size * 0.58} height={size * 0.58}><path fill="#F6EFE6" d={CLAUDE_PATH} /></svg><Sheen r={size * 0.28} /></div>);

// ===== STAGE — the dark "screen" that holds every hero (top zone); captions sit clearly below on cream (nightshift split) =====
const Stage: React.FC = () => { const f = useCurrentFrame(); const out = ramp(f, fr(28.7), fr(29.5)); const drift = Math.sin(f / 120) * 6;
  return (<AbsoluteFill style={{ background: "radial-gradient(120% 90% at 50% 8%, #F3F1EB 0%, #ECE9E2 46%, #E4E0D6 100%)" }}>
    <div style={{ position: "absolute", inset: -40, opacity: 0.5, backgroundImage: "linear-gradient(rgba(58,92,132,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(58,92,132,0.05) 1px, transparent 1px)", backgroundSize: "62px 62px" }} />
    <div style={{ position: "absolute", left: 36, right: 36, top: 284, height: 820, borderRadius: 52, background: "linear-gradient(158deg, #2C3A54 0%, #1B2540 54%, #111A2C 100%)", boxShadow: "0 44px 96px rgba(12,18,36,0.44), inset 0 2px 0 rgba(255,255,255,0.08)", opacity: 1 - out, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.55, backgroundImage: "radial-gradient(rgba(130,160,210,0.10) 1.3px, transparent 1.3px)", backgroundSize: "30px 30px", transform: `translateY(${drift}px)` }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 260, background: "radial-gradient(100% 100% at 50% 0%, rgba(120,150,210,0.16), transparent)" }} />
      <div style={{ position: "absolute", bottom: -80, left: "50%", width: 900, height: 260, transform: "translateX(-50%)", background: "radial-gradient(circle, rgba(63,158,116,0.10), transparent 70%)" }} />
    </div>
  </AbsoluteFill>); };

const Browser: React.FC<{ w: number; h: number; url: string; children: React.ReactNode }> = ({ w, h, url, children }) => (
  <div style={{ width: w, height: h, borderRadius: 18, overflow: "hidden", background: "#fff", boxShadow: SH, position: "relative" }}>
    <div style={{ height: 50, background: "#E9E6DF", display: "flex", alignItems: "center", padding: "0 18px", gap: 8, borderBottom: "1px solid #d6d2c9" }}>
      <div style={{ display: "flex", gap: 8 }}>{["#FF5F57", "#FEBC2E", "#28C840"].map((c) => <div key={c} style={{ width: 14, height: 14, borderRadius: "50%", background: c }} />)}</div>
      <div style={{ flex: 1, marginLeft: 14, height: 32, borderRadius: 9, background: "#fff", display: "flex", alignItems: "center", padding: "0 16px", fontFamily: inter.fontFamily, fontSize: 18, fontWeight: 500, color: "#6b6b6b", border: "1px solid #dcdcdc" }}>🔒 {url}</div>
    </div>
    <div style={{ position: "absolute", top: 50, left: 0, right: 0, bottom: 0, overflow: "hidden", background: GH }}>{children}</div>
    <Sheen r={18} o={0.08} />
  </div>);
// Saraev left-to-right highlighter marker over a key phrase
const Marker: React.FC<{ x: number; y: number; w: number; h: number; lf: number; at: number; color?: string; dur?: number; label?: string; below?: boolean }> = ({ x, y, w, h, lf, at, color = AMBER, dur = 14, label, below }) => {
  const p = ramp(lf, at, at + dur); if (p <= 0) return null;
  return (<><div style={{ position: "absolute", left: x, top: y, width: w * p, height: h, borderRadius: 7, background: `${color}3A`, borderBottom: `4px solid ${color}`, boxShadow: `0 0 18px ${color}88`, zIndex: 15 }} />
    <div style={{ position: "absolute", left: x + w * p - 5, top: y - 4, width: 10, height: h + 8, borderRadius: 5, background: color, boxShadow: `0 0 14px ${color}`, opacity: p < 1 ? 1 : 0, zIndex: 16 }} />
    {label && p > 0.7 && <div style={{ position: "absolute", left: x, top: below ? y + h + 10 : y - 46, padding: "6px 14px", borderRadius: 9, background: grad("#26221C", "#15120E"), color: "#F4EFE6", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 22, whiteSpace: "nowrap", boxShadow: IMSH, borderLeft: `4px solid ${color}`, zIndex: 16 }}>{label}</div>}</>);
};
const Cursor: React.FC<{ x: number; y: number; click?: boolean }> = ({ x, y, click }) => (<div style={{ position: "absolute", left: x, top: y, zIndex: 30 }}>{click && <div style={{ position: "absolute", left: -16, top: -16, width: 40, height: 40, borderRadius: "50%", border: `3px solid ${CLAY}`, opacity: 0.7 }} />}<svg width={34} height={34} viewBox="0 0 24 24" style={{ filter: "drop-shadow(0 3px 5px rgba(0,0,0,0.5))" }}><path d="M5 3 L5 19 L9.5 14.8 L12.5 21 L15 20 L12 14 L18 13.5 Z" fill="#fff" stroke="#222" strokeWidth={1.3} strokeLinejoin="round" /></svg></div>);

const Scene: React.FC<{ s: number; e: number; children: React.ReactNode }> = ({ s, e, children }) => { const frame = useCurrentFrame(); const local = frame - fr(s); const lenF = fr(e - s); if (local < 0 || local > lenF) return null; const inF = s <= 0 ? 1 : eOut(frame, fr(s), 6); const op = Math.min(inF, 1 - eOut(frame, fr(e - 0.16), 6)); return <AbsoluteFill style={{ opacity: op }}>{children}</AbsoluteFill>; };

// ===== S0 HOOK — a premium $2,000 lead list, zapped free =====
const HookScene: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s); const hOut = eOut(f, fr(5.08) - 7, 7);
  const slash = ramp(lf, 40, 54); const free = over(lf, 56, 14); const pulse = Math.max(0, Math.sin(lf / 7)); const rows = [{ b: "Bright Smile Dental", }, { b: "Lone Star Orthodontics" }, { b: "Barton Springs Dental" }];
  return (<AbsoluteFill>
    <div style={{ position: "absolute", top: 344, left: 40, right: 40, textAlign: "center", opacity: 1 - hOut, transform: `translateY(${-hOut * 12}px)`, zIndex: 40 }}>
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 25, letterSpacing: "0.16em", color: "#93A6C4", marginBottom: 6, textTransform: "uppercase" }}>stop paying for</div>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 96, lineHeight: 0.92, letterSpacing: "-0.03em", color: "#F3EEE4" }}>a <span style={{ color: CLAY }}>$2,000</span> lead list</div>
    </div>
    <Bloom cx={CX} cy={820} w={820} color="rgba(210,114,78,0.28)" lf={lf} base={0.4 + pulse * 0.1} />
    {/* premium leads card */}
    <div style={{ position: "absolute", left: CX - 320, top: 548, width: 640, transform: `scale(${over(lf, 4, 12)})` }}>
      <div style={{ borderRadius: 22, background: "#fff", boxShadow: SH, overflow: "hidden", position: "relative" }}>
        <div style={{ padding: "20px 28px", display: "flex", alignItems: "center", gap: 12, borderBottom: "1px solid #efeae0", background: grad("#FBF8F2", "#F3ECDD") }}><div style={{ width: 13, height: 13, borderRadius: "50%", background: GREEN }} /><span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 26, color: INK }}>500 local leads</span><span style={{ marginLeft: "auto", fontFamily: mono, fontSize: 20, color: MUTE }}>with emails</span></div>
        {rows.map((r, i) => (<div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 150px", alignItems: "center", padding: "17px 28px", borderBottom: "1px solid #f4efe6", background: i % 2 ? "#fcfaf6" : "#fff" }}>
          <span style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 23, color: INK }}>{r.b}</span>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ width: 18, height: 18, borderRadius: "50%", background: GREEN, color: "#fff", fontSize: 12, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center" }}>✓</span><span style={{ fontFamily: mono, fontSize: 18, color: GREEN, filter: "blur(4px)" }}>●●●●●●●</span></div></div>))}
        <div style={{ padding: "13px 28px", fontFamily: inter.fontFamily, fontSize: 20, color: MUTE, textAlign: "center", filter: "blur(3px)" }}>+ 497 more…</div>
      </div>
      {/* price ribbon */}
      <div style={{ position: "absolute", right: -20, top: -26, transform: "rotate(6deg)" }}>
        <div style={{ position: "relative", padding: "12px 26px", borderRadius: 14, background: free > 0.05 ? grad("#4FB98A", "#2E9268") : grad("#D2724E", "#B4512E"), boxShadow: IMSH }}>
          <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 46, color: "#fff" }}>{free > 0.5 ? "FREE" : "$2,000"}</span>
          {free <= 0.5 && <div style={{ position: "absolute", left: 6, right: 6, top: "52%", height: 7, background: "#fff", width: `${slash * 100}%`, borderRadius: 4, transform: "rotate(-6deg)" }} />}
        </div>
      </div>
    </div>
    {/* claude zap */}
    <div style={{ position: "absolute", left: CX - 44, top: 968, opacity: ramp(lf, 30, 44), transform: `scale(${1 + pulse * 0.06})` }}><ClaudeMark size={88} glow={0.6 + pulse * 0.3} /></div>
  </AbsoluteFill>); };

// ===== S1 INPUT — one line in Claude Code =====
const InputScene: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s);
  const q = "get me every dentist in Austin — with their email"; const qn = Math.floor(ramp(lf, 14, 60) * q.length); const done = qn >= q.length;
  return (<AbsoluteFill>
    <Bloom cx={CX} cy={HCY} w={900} color="rgba(90,134,255,0.14)" lf={lf} />
    <div style={{ position: "absolute", left: 90, right: 90, top: 470 }}>
      <div style={{ borderRadius: 20, overflow: "hidden", background: "#0E1524", boxShadow: `${SH}, 0 0 60px rgba(210,114,78,0.16)`, border: "1px solid rgba(130,160,210,0.18)", fontFamily: mono }}>
        <div style={{ height: 52, background: "#18202F", display: "flex", alignItems: "center", padding: "0 20px", gap: 8, borderBottom: "1px solid rgba(130,160,210,0.12)" }}><div style={{ display: "flex", gap: 9 }}>{["#FF5F57", "#FEBC2E", "#28C840"].map((c) => <div key={c} style={{ width: 15, height: 15, borderRadius: "50%", background: c }} />)}</div><span style={{ marginLeft: 14, color: "#8a94a8", fontSize: 22, fontWeight: 600, display: "flex", alignItems: "center", gap: 9 }}><span style={{ width: 22, height: 22, borderRadius: 6, background: grad("#E08A66", "#C5603C"), display: "inline-flex", alignItems: "center", justifyContent: "center" }}><svg viewBox="0 0 24 24" width={13} height={13}><path fill="#F6EFE6" d={CLAUDE_PATH} /></svg></span>claude — leads</span></div>
        <div style={{ padding: "42px 40px 48px", fontSize: 35, lineHeight: 1.5, minHeight: 230 }}>
          <div style={{ color: "#7FB7E0" }}>&gt; <span style={{ color: "#EAE3D5" }}>{q.slice(0, qn)}{!done && lf % 16 < 8 ? "▋" : ""}</span></div>
          {done && <div style={{ marginTop: 30, display: "flex", gap: 14, opacity: ramp(lf, 62, 74) }}>
            <div style={{ padding: "9px 20px", borderRadius: 11, background: "rgba(58,92,132,0.28)", border: `1.5px solid ${SLATE}`, color: "#B8CDE6", fontSize: 27, fontWeight: 700 }}>niche: dentists</div>
            <div style={{ padding: "9px 20px", borderRadius: 11, background: "rgba(63,158,116,0.2)", border: `1.5px solid ${GREEN}`, color: "#A7D9C0", fontSize: 27, fontWeight: 700 }}>city: Austin</div>
          </div>}
        </div>
      </div>
    </div>
  </AbsoluteFill>); };

// ===== S2 SCRAPE — real free repo (L-to-R marker) → the leads table fills calmly (HERO) =====
const ROWS = [
  { b: "Bright Smile Dental", p: "(512) 555-0142", e: "hello@brightsmileatx.com" },
  { b: "Lone Star Orthodontics", p: "(512) 555-0188", e: "front@lonestarortho.com" },
  { b: "Barton Springs Dental", p: "(512) 555-0203", e: "info@bartondental.com" },
  { b: "Zilker Family Dental", p: "(512) 555-0251", e: "care@zilkerdental.com" },
  { b: "Congress Ave Smiles", p: "(512) 555-0197", e: "team@congresssmiles.com" },
  { b: "Hill Country Dental", p: "(512) 555-0164", e: "hello@hillcountrydds.com" },
];
const LeadsTable: React.FC<{ lf: number; start: number }> = ({ lf, start }) => { const cols = "1fr 168px 300px";
  const count = Math.round(interpolate(eOut(lf, start, 80), [0, 1], [24, 512]));
  const newest = Math.floor(ramp(lf, start + 6, start + 6 + ROWS.length * 10) * ROWS.length);
  return (<div style={{ width: 900, borderRadius: 20, background: "#fff", boxShadow: SH, overflow: "hidden" }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "17px 26px", background: grad("#FBF8F2", "#F3ECDD"), borderBottom: "1px solid #e6dfd2" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 11 }}><div style={{ width: 12, height: 12, borderRadius: "50%", background: GREEN, boxShadow: `0 0 10px ${GREEN}` }} /><span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 25, color: INK }}>leads.csv</span></div>
      <div style={{ fontFamily: mono, fontWeight: 800, fontSize: 27, color: GREEN }}>{count} found</div>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: cols, padding: "13px 26px", borderBottom: "2px solid #efeae0", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 20, color: MUTE, textTransform: "uppercase", letterSpacing: "0.04em" }}><div>Business</div><div>Phone</div><div>Email</div></div>
    {ROWS.map((r, i) => { const rs = start + 6 + i * 10; const e = eOut(lf, rs, 10); const emailIn = ramp(lf, rs + 6, rs + 14); const isNew = i === newest - 1;
      return (<div key={i} style={{ display: "grid", gridTemplateColumns: cols, alignItems: "center", padding: "16px 26px", borderBottom: "1px solid #f2ede4", opacity: e, transform: `translateY(${(1 - e) * 12}px)`, background: isNew ? "rgba(63,158,116,0.08)" : i % 2 ? "#fcfaf6" : "#fff" }}>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 23, color: INK, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.b}</div>
        <div style={{ fontFamily: mono, fontWeight: 500, fontSize: 20, color: SLATE }}>{r.p}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ width: 20, height: 20, borderRadius: "50%", background: GREEN, color: "#fff", fontSize: 13, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center", opacity: emailIn, flexShrink: 0 }}>✓</span><span style={{ fontFamily: mono, fontWeight: 500, fontSize: 18, color: emailIn > 0.5 ? GREEN : "#cfc9be", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.e}</span></div>
      </div>); })}
  </div>);
};
const ScrapeScene: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s);
  const RW = 968; const sc = RW / 2800; const bar = 50;
  const headH = bar + RW * 1240 / 2800; const howH = bar + RW * 1480 / 2800;
  const toHow = ramp(lf, 42, 54); const toTable = ramp(lf, 84, 96); const headOp = 1 - toHow; const howOp = toHow - toTable; const tableIn = ramp(lf, 86, 100);
  return (<AbsoluteFill>
    <Bloom cx={CX} cy={HCY} w={1020} color="rgba(63,158,116,0.14)" lf={lf} />
    {/* real repo — the NAME + stars */}
    {headOp > 0.01 && <div style={{ position: "absolute", left: CX - RW / 2, top: 700 - headH / 2, opacity: headOp, transform: `translateY(${-(1 - headOp) * 30}px)` }}>
      <Browser w={RW} h={headH} url="github.com/gosom/google-maps-scraper">
        <Img src={staticFile("leads/repo_head.png")} style={{ width: RW, height: RW * 1240 / 2800 }} />
        <Marker x={48 * sc} y={bar + 40 * sc} w={540 * sc} h={62 * sc} lf={lf} at={10} color={CLAY} label="free · open source" below />
        <Marker x={2452 * sc} y={bar + 40 * sc} w={300 * sc} h={62 * sc} lf={lf} at={24} color={AMBER} label="4.6k stars" below />
      </Browser></div>}
    {/* real repo — HOW IT WORKS (README + AI Agent Skill) */}
    {howOp > 0.01 && <div style={{ position: "absolute", left: CX - RW / 2, top: 700 - howH / 2, opacity: howOp, transform: `translateY(${interpolate(toHow, [0, 1], [40, 0])}px)` }}>
      <Browser w={RW} h={howH} url="github.com/gosom/google-maps-scraper#readme">
        <Img src={staticFile("leads/repo_how.png")} style={{ width: RW, height: RW * 1480 / 2800 }} />
        <Marker x={90 * sc} y={bar + 258 * sc} w={760 * sc} h={118 * sc} lf={lf} at={58} color={CLAY} label="how it works" below />
        <Marker x={1150 * sc} y={bar + 940 * sc} w={520 * sc} h={66 * sc} lf={lf} at={72} color={GREEN} label="Claude runs it" />
      </Browser></div>}
    {/* leads table hero (calm) */}
    {tableIn > 0.01 && <div style={{ position: "absolute", left: CX - 450, top: 360, opacity: tableIn, transform: `translateY(${(1 - tableIn) * 36}px)` }}><LeadsTable lf={lf} start={88} /></div>}
  </AbsoluteFill>); };

// ===== S3 EMAIL — a personalized cold email per row =====
const EmailScene: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s);
  const body = "Hi Bright Smile team — you're one of Austin's top-rated dentists, but your booking page is doing the heavy lifting. One idea to fill more chairs next month:"; const bn = Math.floor(ramp(lf, 24, 100) * body.length);
  return (<AbsoluteFill>
    <Bloom cx={CX} cy={HCY} w={960} color="rgba(210,114,78,0.14)" lf={lf} />
    <div style={{ position: "absolute", left: CX - 420, top: 366, width: 840 }}>
      <div style={{ borderRadius: 20, background: "#fff", boxShadow: SH, overflow: "hidden" }}>
        <div style={{ padding: "18px 28px", borderBottom: "1px solid #efeae0", display: "flex", alignItems: "center", gap: 12, background: grad("#FBF8F2", "#F3ECDD") }}><ClaudeMark size={34} /><span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 24, color: INK }}>New message</span><span style={{ marginLeft: "auto", fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 21, color: GREEN, display: "flex", alignItems: "center", gap: 7 }}><span style={{ width: 9, height: 9, borderRadius: "50%", background: GREEN, opacity: 0.5 + Math.abs(Math.sin(lf / 6)) * 0.5 }} />writing…</span></div>
        <div style={{ padding: "10px 28px", borderBottom: "1px solid #f2ede4", fontFamily: inter.fontFamily, fontSize: 24, color: "#5e5950" }}>To: <span style={{ color: SLATE, fontWeight: 700 }}>hello@brightsmileatx.com</span></div>
        <div style={{ padding: "10px 28px", borderBottom: "1px solid #f2ede4", fontFamily: inter.fontFamily, fontSize: 24, color: "#5e5950" }}>Subject: <span style={{ color: INK, fontWeight: 700 }}>quick idea for <span style={{ background: "rgba(207,149,68,0.3)", padding: "1px 8px", borderRadius: 6 }}>Bright Smile Dental</span></span></div>
        <div style={{ padding: "24px 28px 40px", fontFamily: inter.fontFamily, fontSize: 27, lineHeight: 1.52, color: INK, minHeight: 260 }}>{body.slice(0, bn)}{bn < body.length && lf % 16 < 8 ? "▋" : ""}</div>
      </div>
    </div>
  </AbsoluteFill>); };

// ===== S4 PAYOFF — hundreds of leads WITH emails, no monthly bill (visual) =====
const Envelope: React.FC<{ size: number }> = ({ size }) => (<div style={{ width: size, height: size * 0.68, borderRadius: size * 0.1, background: "#fff", boxShadow: IMSH, position: "relative", overflow: "hidden", border: "1px solid #e8e2d6" }}><svg width={size} height={size * 0.68} style={{ position: "absolute", inset: 0 }}><path d={`M2 2 L${size / 2} ${size * 0.37} L${size - 2} 2`} fill="none" stroke={GREEN} strokeWidth={Math.max(2, size * 0.05)} /></svg><div style={{ position: "absolute", right: size * 0.07, bottom: size * 0.07, width: size * 0.28, height: size * 0.28, borderRadius: "50%", background: GREEN, color: "#fff", fontSize: size * 0.17, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center" }}>✓</div></div>);
const PriceStrike: React.FC<{ name: string; price: string; lf: number; at: number }> = ({ name, price, lf, at }) => { const e = over(lf, at, 12); const x = ramp(lf, at + 10, at + 24);
  return (<div style={{ position: "relative", padding: "20px 34px", borderRadius: 18, background: "#fff", boxShadow: IMSH, opacity: e, transform: `scale(${0.84 + Math.min(e, 1) * 0.16})`, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
    <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 42, color: "#8a8478" }}>{name}</span>
    <span style={{ fontFamily: mono, fontWeight: 700, fontSize: 28, color: "#B7B0A4" }}>{price}</span>
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}><line x1={12} y1={14} x2={88} y2={86} stroke={RED} strokeWidth={8} strokeLinecap="round" strokeDasharray={200} strokeDashoffset={200 * (1 - Math.min(1, x * 2))} /><line x1={88} y1={14} x2={12} y2={86} stroke={RED} strokeWidth={8} strokeLinecap="round" strokeDasharray={200} strokeDashoffset={200 * (1 - Math.max(0, x * 2 - 1))} /></svg>
  </div>); };
const PayoffScene: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s); const pulse = Math.max(0, Math.sin(lf / 8));
  const num = Math.round(interpolate(eOut(lf, 4, 34), [0, 1], [40, 512]));
  return (<AbsoluteFill>
    <Bloom cx={CX} cy={560} w={900} color="rgba(63,158,116,0.28)" lf={lf} base={0.42 + pulse * 0.1} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 372, textAlign: "center", transform: `scale(${over(lf, 2, 12)})` }}>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 188, lineHeight: 0.86, color: "#63D6A0", textShadow: "0 3px 34px rgba(63,158,116,0.55)" }}>{num}</div>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 46, color: "#F3EEE4", marginTop: 8 }}>leads, <span style={{ color: AMBER }}>emails included</span></div>
    </div>
    {/* envelopes flying up = emails included */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 690, display: "flex", justifyContent: "center", gap: 22 }}>{[0, 1, 2, 3, 4].map((i) => { const e = over(lf, 20 + i * 4, 12); const fl = Math.sin(lf / 14 + i) * 8; return <div key={i} style={{ opacity: e, transform: `translateY(${(1 - e) * 40 + fl}px) rotate(${(i - 2) * 4}deg)` }}><Envelope size={104} /></div>; })}</div>
    {/* competitors struck = no monthly bill */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 890, display: "flex", justifyContent: "center", alignItems: "center", gap: 40 }}>
      <PriceStrike name="Clay" price="$500/mo" lf={lf} at={44} />
      <PriceStrike name="Apollo" price="$99/mo" lf={lf} at={54} />
      <div style={{ opacity: over(lf, 66, 12), transform: `scale(${over(lf, 66, 12)})`, padding: "20px 34px", borderRadius: 18, background: grad("#FBF7EF", "#EFE6D4"), border: `3px solid ${GREEN}`, boxShadow: `${IMSH}, 0 0 30px rgba(63,158,116,0.4)`, display: "flex", flexDirection: "column", alignItems: "center" }}><span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 48, color: GREEN }}>$0</span><span style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 22, color: INK }}>you own it</span></div>
    </div>
  </AbsoluteFill>); };

// ===== S5 FOMO — agencies charge six figures for this; you: one chat (visual transform) =====
const FomoScene: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s); const pulse = Math.max(0, Math.sin(lf / 8));
  const a1 = over(lf, 4, 12); const strike = ramp(lf, 26, 40); const zap = ramp(lf, 30, 40); const a2 = over(lf, 40, 14);
  return (<AbsoluteFill>
    <Bloom cx={CX} cy={HCY} w={1000} color="rgba(210,114,78,0.14)" lf={lf} base={0.4 + pulse * 0.08} />
    {/* agency price tag (left) — struck */}
    <div style={{ position: "absolute", left: 84, top: HCY - 150, width: 360, opacity: a1, transform: `scale(${0.88 + Math.min(a1, 1) * 0.12}) translateX(${-(1 - a1) * 30}px)` }}>
      <div style={{ position: "relative", padding: "34px 30px", borderRadius: 26, background: "#fff", boxShadow: SH, display: "flex", flexDirection: "column", alignItems: "center", gap: 12, filter: `grayscale(${strike})`, opacity: 1 - strike * 0.35 }}>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 24, letterSpacing: "0.06em", color: MUTE, textTransform: "uppercase" }}>a lead-gen agency</div>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 66, color: RED, lineHeight: 0.95, textAlign: "center" }}>six<br />figures<span style={{ fontSize: 30, color: "#B7B0A4" }}> /yr</span></div>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}><line x1={12} y1={16} x2={88} y2={84} stroke={RED} strokeWidth={6} strokeLinecap="round" strokeDasharray={200} strokeDashoffset={200 * (1 - strike)} /></svg>
      </div></div>
    {/* claude zap (center) */}
    <div style={{ position: "absolute", left: CX - 52, top: HCY - 52, transform: `scale(${1 + pulse * 0.08})`, zIndex: 5 }}><ClaudeMark size={104} glow={0.55 + zap * 0.4 + pulse * 0.2} /></div>
    {zap > 0.01 && <div style={{ position: "absolute", left: CX + 40, top: HCY - 6, width: 160 * zap, height: 10, borderRadius: 6, background: grad("#F0C27A", "#D2724E"), boxShadow: `0 0 20px ${CLAY}`, opacity: zap < 1 ? 1 : 1 - ramp(lf, 44, 54) }} />}
    {/* one chat bubble (right) */}
    <div style={{ position: "absolute", right: 84, top: HCY - 140, width: 360, opacity: a2, transform: `scale(${0.86 + Math.min(a2, 1) * 0.14}) translateX(${(1 - a2) * 30}px)` }}>
      <div style={{ padding: "34px 30px 40px", borderRadius: "26px 26px 26px 8px", background: grad("#FBF7EF", "#EFE6D4"), border: `3px solid ${GREEN}`, boxShadow: `${SH}, 0 0 ${44 + pulse * 22}px rgba(63,158,116,0.5)`, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 11 }}><ClaudeMark size={40} glow={0.5} /><span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 24, color: MUTE, textTransform: "uppercase", letterSpacing: "0.06em" }}>you</span></div>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 62, color: GREEN, lineHeight: 0.95, textAlign: "center" }}>one<br />chat</div>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 24, color: INK }}>$0 · you own it</div>
      </div></div>
  </AbsoluteFill>); };

// ===== CTA =====
const CTA: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const local = f - fr(s); if (local < 0) return null; const a = eOut(f, fr(s) + 2, 12); const pillPop = over(local, 10, 14); const pulse = 1 + Math.sin(f / 7) * 0.03;
  return (<AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingBottom: 150 }}>
    {Array.from({ length: 16 }, (_, i) => { const wave = i < 12 ? 4 : 30; const p = eOut(f, fr(s) + wave + (i % 12), 28); const ang = (i / 8) * Math.PI; if (p <= 0 || p >= 1) return null; return <div key={i} style={{ position: "absolute", left: 540 + Math.cos(ang) * p * 360, top: 820 + Math.sin(ang) * p * 360, fontSize: 26, opacity: Math.sin(p * Math.PI), color: [SLATE, CLAY, GREEN, AMBER][i % 4] }}>✦</div>; })}
    <div style={{ marginTop: -140, transform: `scale(${0.7 + a * 0.3})`, opacity: a }}><ClaudeMark size={158} glow={0.5 + Math.sin(local / 9) * 0.12} /></div>
    <div style={{ marginTop: 44, transform: `scale(${(0.8 + pillPop * 0.2) * pulse})`, padding: "28px 56px", borderRadius: 999, background: CLAY, color: "#fff", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 68, boxShadow: "0 24px 54px rgba(210,114,78,0.42)", opacity: a }}>💬 Comment "LEADS"</div>
    <div style={{ marginTop: 26, fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 600, fontSize: 42, color: INK, opacity: a, textAlign: "center" }}>and I'll send the exact free tool</div>
  </AbsoluteFill>); };

// ===== Captions =====
type Word = { word: string; start: number; end: number; line: number };
const WORDS = wordsData as Word[];
const cleanw = (w: string) => w.toLowerCase().replace(/[^a-z0-9'$,.]/g, "");
const EMPH = new Set(["stop", "$2,000", "free", "tool", "claude", "code", "niche", "city", "dentists", "austin", "gyms", "miami", "scraper", "table", "live", "name,", "phone,", "email", "cold", "personalized", "hundreds", "leads,", "emails", "clay,", "apollo,", "monthly", "bill.", "six-figure", "agencies,", "chat.", "comment"]);
const CHUNKS = (() => { const byLine: Record<number, Word[]> = {}; for (const w of WORDS) (byLine[w.line] ||= []).push(w);
  const out: { words: Word[]; start: number; line: number }[] = [];
  for (const li of Object.keys(byLine).map(Number).sort((a, b) => a - b)) { const ws = byLine[li]; for (let i = 0; i < ws.length; i += 3) { const g = ws.slice(i, i + 3); out.push({ words: g, start: g[0].start, line: li }); } }
  const aE = Math.max(...WORDS.map((w) => w.end)); return out.map((c, i) => ({ ...c, end: i + 1 < out.length ? out[i + 1].start : aE + 0.4 })); })();
const Captions: React.FC = () => { const frame = useCurrentFrame();
  return (<>{CHUNKS.map((c, i) => { if (frame < fr(c.start) || frame >= fr(c.end)) return null; if (c.line === 6) return null;
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

const L = [0, 5.08, 9.56, 14.56, 18.74, 24.74, 29.00];
const Sfx: React.FC<{ at: number; src: string; v?: number; dur?: number }> = ({ at, src, v = 0.3, dur = 2.5 }) => (<Sequence from={fr(at)} durationInFrames={fr(dur)}><Audio src={staticFile(`sfx/${src}`)} volume={v} /></Sequence>);
const Ticks: React.FC<{ start: number; n: number; step: number; src?: string; v?: number }> = ({ start, n, step, src = "tick.wav", v = 0.24 }) => (<>{Array.from({ length: n }, (_, i) => <Sfx key={i} at={start + i * step} src={src} v={v} dur={0.5} />)}</>);

export const ClaudeLeadsReel: React.FC = () => { const frame = useCurrentFrame(); const zoom = interpolate(frame, [0, 16, 28], [1.0, 1.03, 1.0], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  return (<AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
    <Audio src={staticFile("vo_leads.wav")} />
    <Audio loop src={staticFile("seo_music.wav")} volume={(ff) => interpolate(ff, [0, fr(1.6), fr(L[6]) - 10, fr(L[6]) + 16, 99999], [0, 0.2, 0.2, 0.15, 0.15], { extrapolateRight: "clamp" })} />
    <Sfx at={0} src="metal_riser.wav" v={0.85} /><Sfx at={0} src="sub.wav" v={0.8} /><Sfx at={0.25} src="boom.wav" v={0.7} /><Sfx at={1.6} src="ding.wav" v={0.4} />
    <Sfx at={2.9} src="swish.wav" v={0.42} /><Sfx at={3.4} src="snap.wav" v={0.55} />
    {L.slice(1).map((t, i) => <React.Fragment key={i}><Sfx at={t - 0.1} src="swish.wav" v={0.44} /><Sfx at={t + 0.35} src="pop.wav" v={0.32} /></React.Fragment>)}
    <Ticks start={5.6} n={16} step={0.12} src="key.wav" v={0.2} /><Sfx at={7.7} src="pop.wav" v={0.34} />
    <Sfx at={10.6} src="data.wav" v={0.45} /><Sfx at={11.1} src="pop.wav" v={0.3} /><Ticks start={11.4} n={6} step={0.34} src="blip3.wav" v={0.24} />
    <Ticks start={15.4} n={13} step={0.15} src="key.wav" v={0.2} />
    <Sfx at={19.0} src="data.wav" v={0.4} /><Sfx at={20.6} src="ding.wav" v={0.5} /><Sfx at={22.4} src="thock.wav" v={0.48} /><Sfx at={23.0} src="thock.wav" v={0.48} />
    <Sfx at={25.0} src="snap.wav" v={0.4} /><Sfx at={26.4} src="ding.wav" v={0.45} />
    <Sfx at={L[6]} src="resolve.wav" v={0.5} /><Sfx at={L[6] + 0.2} src="angelic.wav" v={0.4} dur={3.2} /><Sfx at={L[6] + 0.4} src="sparkle.wav" v={0.55} />
    <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "50% 44%" }}>
      <Stage />
      <Scene s={L[0]} e={L[1]}><HookScene s={L[0]} /></Scene>
      <Scene s={L[1]} e={L[2]}><InputScene s={L[1]} /></Scene>
      <Scene s={L[2]} e={L[3]}><ScrapeScene s={L[2]} /></Scene>
      <Scene s={L[3]} e={L[4]}><EmailScene s={L[3]} /></Scene>
      <Scene s={L[4]} e={L[5]}><PayoffScene s={L[4]} /></Scene>
      <Scene s={L[5]} e={L[6]}><FomoScene s={L[5]} /></Scene>
      <CTA s={L[6]} />
      <Captions />
    </AbsoluteFill>
    <ProgressBar />
  </AbsoluteFill>); };
