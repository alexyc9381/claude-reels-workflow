import React from "react";
import { AbsoluteFill, Audio, Easing, Img, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { fraunces, frauncesItalic, inter } from "./fonts";
import wordsData from "./data/words_site.json";

/**
 * ClaudeSiteReel — "Claude builds $10k websites from one chat" (Nate-modeled SITE script, Alex VO).
 * Beats: HOOK (premium site + $10k) -> PREMIUM (layout/animations/mobile) -> NO CODE ->
 * INPUTS->BUILD (business/logo/photos/ref link -> site) -> OLD WAY (struck) -> ONE AFTERNOON -> PAID PROOF -> CTA.
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
const SITESH = "0 44px 90px rgba(26,24,19,0.30), 0 0 70px rgba(210,114,78,0.10)";

const Sheen: React.FC<{ r: number | string; o?: number }> = ({ r, o = 0.3 }) => (<div style={{ position: "absolute", inset: 0, borderRadius: r, background: `linear-gradient(125deg, rgba(255,255,255,${o}) 0%, rgba(255,255,255,0) 32%)`, pointerEvents: "none" }} />);
const Bloom: React.FC<{ cx: number; cy: number; w: number; color: string; lf: number; base?: number }> = ({ cx, cy, w, color, lf, base = 0.55 }) => (<div style={{ position: "absolute", left: cx - w / 2, top: cy - w / 2, width: w, height: w, borderRadius: "50%", background: `radial-gradient(circle at 50% 46%, ${color} 0%, transparent 62%)`, opacity: base + Math.sin(lf / 9) * 0.2, pointerEvents: "none" }} />);
const ClaudeMark: React.FC<{ size: number; glow?: number }> = ({ size, glow = 0.4 }) => (
  <div style={{ position: "relative", width: size, height: size, borderRadius: size * 0.28, background: grad("#E08A66", "#C5603C"), boxShadow: `${SH}, 0 0 ${Math.round(size * 0.34)}px rgba(210,114,78,${glow})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
    <svg viewBox="0 0 24 24" width={size * 0.58} height={size * 0.58}><path fill="#F6EFE6" d={CLAUDE_PATH} /></svg><Sheen r={size * 0.28} />
  </div>);

// ===== REAL premium website screenshots (from Behance) inside a Mac browser frame =====
const SITES = { a: "refs/bh_site_a.jpg", b: "refs/bh_site_b.jpg", c: "refs/bh_site_c.jpg", d: "refs/bh_site_d.jpg", e: "refs/bh_site_e.jpg", f: "refs/bh_site_f.jpg", g: "refs/bh_site_g.jpg", h: "refs/bh_site_h.jpg", i: "refs/bh_site_i.jpg", j: "refs/bh_site_j.jpg", aTall: "refs/bh_site_a_tall.jpg" };
const BrowserBase: React.FC<{ src: string; scrollY?: number }> = ({ src, scrollY = 0 }) => (
  <div style={{ width: 864, background: "#fff", borderRadius: 26, overflow: "hidden", boxShadow: SITESH, border: "1px solid rgba(40,32,20,0.05)" }}>
    <div style={{ height: 54, background: "#F0ECE3", display: "flex", alignItems: "center", gap: 12, padding: "0 24px" }}>
      <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#E36A5C" }} /><div style={{ width: 16, height: 16, borderRadius: "50%", background: "#E8B44A" }} /><div style={{ width: 16, height: 16, borderRadius: "50%", background: "#5CB87E" }} />
      <div style={{ marginLeft: 14, flex: 1, height: 26, borderRadius: 13, background: "#fff", border: "1px solid rgba(40,32,20,0.06)" }} />
    </div>
    <div style={{ height: 556, overflow: "hidden", position: "relative", background: "#fff" }}>
      <Img src={staticFile(src)} style={{ position: "absolute", top: -scrollY, left: 0, width: 864, display: "block" }} />
      <Sheen r={0} o={0.1} />
    </div>
  </div>
);
const SiteHero: React.FC<{ src: string; w: number; scrollY?: number; glow?: number }> = ({ src, w, scrollY = 0, glow = 0 }) => (
  <div style={{ width: w, height: w * (610 / 864), position: "relative", filter: glow > 0 ? `drop-shadow(0 0 ${glow * 40}px rgba(210,114,78,${glow * 0.5}))` : undefined }}>
    <div style={{ position: "absolute", left: 0, top: 0, width: 864, transform: `scale(${w / 864})`, transformOrigin: "top left" }}><BrowserBase src={src} scrollY={scrollY} /></div>
  </div>
);
// real desktop screenshot cropped into a phone (mobile-look) — no squishing
const PhoneSite: React.FC<{ src: string; w: number; h: number }> = ({ src, w, h }) => (
  <div style={{ width: w, height: h, borderRadius: w * 0.17, background: grad("#26221C", "#15120E"), boxShadow: SH, padding: w * 0.045, position: "relative" }}>
    <div style={{ width: "100%", height: "100%", borderRadius: w * 0.12, overflow: "hidden", position: "relative", background: "#fff" }}>
      <Img src={staticFile(src)} style={{ position: "absolute", height: "100%", width: "auto", left: "50%", top: 0, transform: "translateX(-50%)", display: "block" }} />
    </div><Sheen r={w * 0.17} />
  </div>
);

const Background: React.FC = () => { const f = useCurrentFrame(); const d = Math.sin(f / 90) * 6;
  return (<AbsoluteFill style={{ backgroundColor: CREAM }}>
    <AbsoluteFill style={{ transform: `translate(${d}px,${d * 0.6}px)`, backgroundImage: "linear-gradient(rgba(26,24,19,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(26,24,19,0.07) 1px,transparent 1px)", backgroundSize: "68px 68px" }} />
    <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 46%, rgba(0,0,0,0) 55%, rgba(40,32,20,0.10) 100%)" }} />
  </AbsoluteFill>); };

// ===== captions (onset-anchored, word-by-word) =====
type Word = { word: string; start: number; end: number; line: number };
const WORDS = wordsData as Word[];
const cleanw = (w: string) => w.toLowerCase().replace(/[^a-z0-9']/g, "");
const EMPH = new Set(["claude", "websites", "10", "grand", "premium", "layout", "animations", "phone", "code", "chat", "business", "logo", "photos", "link", "designer", "weeks", "thousands", "afternoon", "clients", "paid", "comment", "site", "workflow", "free"]);
const CHUNKS = (() => { const byLine: Record<number, Word[]> = {}; for (const w of WORDS) (byLine[w.line] ||= []).push(w);
  const out: { words: Word[]; start: number; line: number }[] = [];
  for (const li of Object.keys(byLine).map(Number).sort((a, b) => a - b)) { const ws = byLine[li]; for (let i = 0; i < ws.length; i += 3) { const g = ws.slice(i, i + 3); out.push({ words: g, start: g[0].start, line: li }); } }
  const aE = Math.max(...WORDS.map((w) => w.end)); return out.map((c, i) => ({ ...c, end: i + 1 < out.length ? out[i + 1].start : aE + 0.4 })); })();
const Captions: React.FC = () => { const frame = useCurrentFrame();
  return (<>{CHUNKS.map((c, i) => { if (frame < fr(c.start) || frame >= fr(c.end)) return null; if (c.line === 7) return null;
    return (<div key={i} style={{ position: "absolute", top: 1268, left: 64, right: 64, height: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "center", gap: "0 16px", width: 952, textAlign: "center" }}>
        {c.words.map((w, j) => { const g = EMPH.has(cleanw(w.word)); const shown = frame >= fr(w.start);
          return <span key={j} style={{ display: "inline-block", opacity: shown ? 1 : 0, fontFamily: g ? frauncesItalic.fontFamily : fraunces.fontFamily, fontStyle: g ? "italic" : "normal", fontWeight: g ? 700 : 600, fontSize: g ? 90 : 76, lineHeight: 1.04, color: g ? SLATE : INK, letterSpacing: "-0.02em", textShadow: "0 2px 16px rgba(236,233,226,0.95)" }}>{w.word}</span>; })}
      </div></div>); })}</>); };

// ===== hook header — leads with Claude + keyword, holds through the hook =====
const HeroHeader: React.FC = () => { const f = useCurrentFrame(); if (f > 205) return null;
  const appear = eOut(f, 0, 9); const out = eOut(f, 188, 14); const op = appear * (1 - out);
  const ty = (1 - appear) * 22 - out * 14; const sc = 0.965 + appear * 0.035; const l2 = eOut(f, 3, 7);
  return (<div style={{ position: "absolute", top: 300, left: 70, right: 70, opacity: op, transform: `translateY(${ty}px) scale(${sc})`, transformOrigin: "left top", zIndex: 60 }}>
    <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 78, lineHeight: 1.02, letterSpacing: "-0.03em", color: INK, textShadow: "0 2px 18px rgba(236,233,226,0.96)" }}>
      <div><span style={{ color: CLAY }}>Claude</span> builds <span style={{ color: CLAY }}>$10K</span></div>
      <div style={{ opacity: l2 }}>websites from <span style={{ color: CLAY }}>one chat.</span></div>
    </div></div>); };

const Scene: React.FC<{ s: number; e: number; children: React.ReactNode }> = ({ s, e, children }) => {
  const frame = useCurrentFrame(); const local = frame - fr(s); const lenF = fr(e - s); if (local < 0 || local > lenF) return null;
  const op = Math.min(eOut(frame, fr(s), 5), 1 - eOut(frame, fr(e - 0.18), 6)); const inE = eOut(frame, fr(s), 12);
  return <AbsoluteFill style={{ opacity: op, transform: `scale(${0.99 + inE * 0.01})` }}>{children}</AbsoluteFill>; };

// ===== SCENE 0: HOOK — premium site fills frame + $10k =====
// two more REAL $10k sites slide in behind the main one at staged times (an event every ~2s)
const HOOKCARDS = [
  { src: SITES.f, dx: -210, dy: -52, rot: -8, w: 612, st: 58, z: 3, tag: "$8k", side: "left" as const },
  { src: SITES.d, dx: 212, dy: -46, rot: 8, w: 612, st: 120, z: 2, tag: "$12k", side: "right" as const },
];
const HookScene: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s);
  // RECEIPTS-FIRST: the finished $10k site is essentially present in frame 1 (settles by ~0.3s)
  const heroIn = eOut(f, fr(s), 9); const float = Math.sin(lf / 22) * 5;
  // continuous motion: the main site SCROLLS through the page + a slow zoom
  const scrollY = ramp(lf, 12, 196) * 820; const zoom = 1 + ramp(lf, 10, 196) * 0.04;
  const slam = over(f, fr(s) + 5, 9); const shk = slam > 0 && slam < 1 ? Math.sin((lf - 5) * 3.4) * (1 - slam) * 7 : 0; const bob = Math.sin(lf / 15) * 4;
  const mcy = 836;
  return (<AbsoluteFill>
    <Bloom cx={CX} cy={978} w={1060} color="rgba(210,114,78,0.18)" lf={lf} base={0.5} />
    {HOOKCARDS.map((c, i) => { const e = over(f, fr(s) + c.st, 14); if (e <= 0.01) return null; const h = c.w * (610 / 864); const dir = c.dx < 0 ? -1 : 1; const cfl = Math.sin(lf / 18 + i) * 4;
      return (<div key={i} style={{ position: "absolute", left: CX + c.dx - c.w / 2 + (1 - e) * dir * 160, top: mcy + c.dy - h / 2 + (1 - e) * 22 + cfl, transform: `rotate(${c.rot * e}deg) scale(${0.72 + e * 0.28})`, opacity: Math.min(1, e * 1.7), zIndex: c.z }}>
        <SiteHero src={c.src} w={c.w} />
        <div style={{ position: "absolute", top: 16, [c.side]: 16, transform: `rotate(${-c.rot}deg)`, background: "#2E2A24", color: "#fff", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 30, padding: "7px 15px", borderRadius: 12, boxShadow: "0 10px 22px rgba(0,0,0,0.34)" }}>{c.tag}</div>
      </div>); })}
    <div style={{ position: "absolute", left: CX - 360, top: 580 + (1 - heroIn) * 28 + float, transform: `scale(${(0.92 + heroIn * 0.08) * zoom})`, transformOrigin: "center top", opacity: Math.min(1, heroIn * 1.6), zIndex: 5 }}>
      <SiteHero src={SITES.aTall} w={720} scrollY={scrollY} glow={0.35} />
    </div>
    <div style={{ position: "absolute", right: 96, top: 502 + bob, transform: `translateX(${shk}px) rotate(7deg) scale(${slam})`, transformOrigin: "center", background: "#2E2A24", color: "#fff", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 72, padding: "16px 38px", borderRadius: 18, boxShadow: "0 22px 46px rgba(0,0,0,0.42)", zIndex: 8 }}>$10k</div>
  </AbsoluteFill>); };

// ===== SCENE 1: PREMIUM — site + phone + feature chips =====
const ProofChip: React.FC<{ x: number; y: number; e: number; icon: string; label: string; color: string }> = ({ x, y, e, icon, label, color }) => (
  <div style={{ position: "absolute", left: x, top: y, transform: `translateY(${(1 - e) * 18}px) scale(${e})`, opacity: e, display: "flex", alignItems: "center", gap: 12, padding: "14px 24px", borderRadius: 999, background: grad("#FBF7EF", "#EFEADF"), boxShadow: SH, border: `2px solid ${color}` }}>
    <div style={{ width: 36, height: 36, borderRadius: "50%", background: grad(color, color + "cc"), display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{icon}</div>
    <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 28, color: INK, whiteSpace: "nowrap" }}>{label}</span>
  </div>);
// a FAN of DISTINCT premium sites (none is the green hook site) flying out
// 5 sleek hero sites, symmetric fan, sleek e-commerce dead-center
const FAN = [
  { src: SITES.a, dx: -394, dy: 96, rot: -14, w: 300, st: 26 },   // green (outer L)
  { src: SITES.f, dx: -214, dy: 30, rot: -7, w: 344, st: 12 },    // ocean (inner L)
  { src: SITES.j, dx: 0, dy: -20, rot: 0, w: 432, st: 2 },        // LUXE e-commerce (CENTER, dead-center)
  { src: SITES.d, dx: 214, dy: 30, rot: 7, w: 344, st: 15 },      // dark AI (inner R)
  { src: SITES.h, dx: 394, dy: 96, rot: 14, w: 300, st: 29 },     // ocean wave (outer R)
];
const PremiumScene: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s);
  const cy = 912;
  return (<AbsoluteFill>
    <Bloom cx={CX} cy={930} w={1040} color="rgba(58,92,132,0.18)" lf={lf} base={0.5} />
    {FAN.map((c, i) => { const e = over(f, fr(s) + c.st, 13); if (e <= 0.01) return null; const h = c.w * (610 / 864); const fl = Math.sin(lf / 20 + i) * 3; const front = c.dx === 0;
      return (<div key={i} style={{ position: "absolute", left: CX + c.dx - c.w / 2, top: cy + c.dy - h / 2 + fl, transform: `rotate(${c.rot * e}deg) scale(${0.5 + e * 0.5})`, opacity: Math.min(1, e * 1.6), zIndex: front ? 9 : Math.abs(c.dx) < 250 ? 6 : 4 }}>
        <SiteHero src={c.src} w={c.w} glow={front ? 0.4 + Math.max(0, Math.sin(lf / 9)) * 0.22 : 0} />
      </div>); })}
  </AbsoluteFill>); };

// ===== SCENE 2: NO CODE =====
const NoCodeScene: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s);
  const codeIn = over(f, fr(s) + 2, 12); const stamp = over(f, fr(s) + 24, 12); const strike = ramp(lf, 30, 46);
  // abstract syntax bars (graphic, not readable text)
  const bars = [{ in: 0, w: 220, c: "#E89A78" }, { in: 1, w: 326, c: "#86A9D6" }, { in: 1, w: 252, c: "#7FB88B" }, { in: 2, w: 300, c: "#C7CDD6" }, { in: 1, w: 196, c: "#86A9D6" }, { in: 0, w: 138, c: "#E89A78" }];
  return (<AbsoluteFill>
    <Bloom cx={CX} cy={980} w={840} color="rgba(210,114,78,0.16)" lf={lf} />
    <div style={{ position: "absolute", left: CX - 360, top: 788, width: 720, borderRadius: 28, background: grad("#23272E", "#171A20"), boxShadow: SH, padding: "38px 46px", transform: `scale(${codeIn})`, transformOrigin: "center", opacity: codeIn }}>
      <div style={{ display: "flex", gap: 11, marginBottom: 30 }}>{["#E36A5C", "#E8B44A", "#5CB87E"].map((c) => <div key={c} style={{ width: 17, height: 17, borderRadius: "50%", background: c }} />)}</div>
      {bars.map((b, i) => { const be = ramp(lf, 6 + i * 4, 17 + i * 4); return (<div key={i} style={{ display: "flex", alignItems: "center", gap: 14, height: 22, marginBottom: 20, paddingLeft: b.in * 36 }}><div style={{ width: 15, height: 15, borderRadius: 4, background: b.c, opacity: 0.45 }} /><div style={{ height: 20, width: b.w * be, borderRadius: 10, background: b.c, opacity: 0.88 }} /></div>); })}
      <div style={{ position: "absolute", left: "7%", right: "7%", top: "52%", height: 9, borderRadius: 5, background: RED, transform: `scaleX(${strike})`, transformOrigin: "left center", boxShadow: "0 2px 12px rgba(196,74,58,0.7)" }} />
      <Sheen r={28} />
    </div>
    {stamp > 0.02 && <div style={{ position: "absolute", left: CX - 230, top: 1066, width: 460, height: 128, borderRadius: 24, background: grad("#E08A66", "#C5603C"), boxShadow: `${SH}, 0 0 40px rgba(210,114,78,0.65)`, transform: `scale(${interpolate(stamp, [0, 1], [1.5, 1])}) rotate(-5deg)`, transformOrigin: "center", display: "flex", alignItems: "center", justifyContent: "center", border: "5px solid rgba(255,255,255,0.42)", zIndex: 9 }}>
      <span style={{ ...inter9, fontSize: 62, color: "#fff", letterSpacing: "0.02em" }}>NO CODE</span></div>}
  </AbsoluteFill>); };

// ===== SCENE 3: INPUTS -> BUILD =====
const TILES: { label: string; el: React.ReactNode }[] = [
  { label: "logo", el: (<div style={{ width: 64, height: 64, borderRadius: 18, background: grad(SLATE, SLATE2), display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ width: 28, height: 28, borderRadius: "50%", border: "6px solid #fff" }} /></div>) },
  { label: "photos", el: (<div style={{ position: "relative", width: "100%", height: "100%" }}><Img src={staticFile("refs/ph_land.jpg")} style={{ position: "absolute", width: 88, height: 88, objectFit: "cover", borderRadius: 11, left: 8, top: 16, transform: "rotate(-7deg)", border: "3px solid #fff", boxShadow: IMSH }} /><Img src={staticFile("refs/ph_ocean.jpg")} style={{ position: "absolute", width: 88, height: 88, objectFit: "cover", borderRadius: 11, right: 8, top: 24, transform: "rotate(7deg)", border: "3px solid #fff", boxShadow: IMSH }} /></div>) },
  { label: "colors", el: (<div style={{ display: "flex", gap: 8 }}>{[CLAY, AMBER, GREEN, SLATE].map((c) => <div key={c} style={{ width: 21, height: 64, borderRadius: 7, background: c }} />)}</div>) },
  { label: "reference", el: (<Img src={staticFile("refs/bh_site_e.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }} />) },
];
const InputsScene: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s);
  const headIn = over(f, fr(s) + 2, 12); const mCx = CX, mCy = 606;
  const tStart = [14, 24, 34, 44]; const funnel = ramp(lf, 82, 120); const charge = ramp(lf, 100, 132);
  const asm = ramp(lf, 130, 186); const siteH = 740 * 610 / 864;
  const ring = lf > 96 ? (lf - 96) / 38 : -1; const flash = lf > 122 && lf < 140 ? 1 - (lf - 122) / 18 : 0;
  return (<AbsoluteFill>
    <Bloom cx={CX} cy={918} w={920} color="rgba(210,114,78,0.16)" lf={lf} base={0.5} />
    {/* claude prompt — the mark CHARGES as the inputs funnel in */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 552, display: "flex", alignItems: "center", justifyContent: "center", gap: 14, transform: `translateY(${(1 - headIn) * -14}px)`, opacity: headIn }}>
      <div style={{ transform: `scale(${1 + charge * 0.14 + Math.sin(lf / 6) * charge * 0.03})` }}><ClaudeMark size={64} glow={0.45 + charge * 0.65} /></div>
      <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 38, color: INK }}>Build me a website</span>
    </div>
    {ring > 0 && ring < 1 && <div style={{ position: "absolute", left: mCx - 240, top: mCy - 240, width: 480, height: 480, borderRadius: "50%", border: `${5 * (1 - ring)}px solid ${CLAY}`, opacity: (1 - ring) * 0.55, transform: `scale(${0.2 + ring * 0.85})` }} />}
    {/* tiles snap in, then FUNNEL into the mark */}
    {TILES.map((t, i) => { const e = over(f, fr(s) + tStart[i], 11); const hx = 279 + i * 174, hy = 772;
      const fx = hx + (mCx - hx) * funnel, fy = hy + (mCy - hy) * funnel;
      const sc = (0.7 + Math.min(e, 1) * 0.3) * (1 - funnel * 0.82); const op = Math.min(1, e * 1.6) * (1 - funnel);
      if (op < 0.02) return null;
      return (<div key={i} style={{ position: "absolute", left: fx - 80, top: fy - 92, width: 160, height: 184, transform: `scale(${sc}) rotate(${funnel * (i - 1.5) * 5}deg)`, opacity: op, borderRadius: 22, background: grad("#FBF7EF", "#EFEADF"), boxShadow: SH, padding: 13, display: "flex", flexDirection: "column", gap: 9 }}>
        <div style={{ flex: 1, width: "100%", borderRadius: 13, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", background: "#fff" }}>{t.el}</div>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 21, color: MUTE, textAlign: "center" }}>{t.label}</span>
        <Sheen r={22} />
      </div>); })}
    {/* the site SCAN-ASSEMBLES top-down (it "renders") */}
    {asm > 0.005 && <div style={{ position: "absolute", left: CX - 370, top: 656, width: 740 }}>
      <div style={{ clipPath: `inset(0 0 ${(1 - asm) * 100}% 0)` }}><SiteHero src={SITES.b} w={740} glow={0.5} /></div>
      {asm < 0.99 && <div style={{ position: "absolute", left: -8, right: -8, top: asm * siteH - 4, height: 9, borderRadius: 5, background: "#F6CDA0", boxShadow: "0 0 26px 7px rgba(210,114,78,0.75)" }} />}
    </div>}
    {flash > 0 && <AbsoluteFill style={{ background: `radial-gradient(circle at 50% 36%, rgba(246,205,160,${flash * 0.5}) 0%, transparent 52%)`, pointerEvents: "none" }} />}
  </AbsoluteFill>); };

// ===== SCENE 4: OLD WAY (struck) =====
// the cost CLIMBS $0 -> $10,000 (with a rising ▲), then a red slash KILLS it. floats centered, no card to overflow.
const CostChip: React.FC<{ e: number; icon: string; label: string }> = ({ e, icon, label }) => (
  <div style={{ transform: `translateY(${(1 - e) * 16}px) scale(${0.8 + e * 0.2})`, opacity: e, display: "flex", alignItems: "center", gap: 13, padding: "15px 30px", borderRadius: 999, background: grad("#FBF7EF", "#EFEADF"), boxShadow: SH }}>
    <span style={{ fontSize: 40, lineHeight: 1 }}>{icon}</span>
    <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 33, color: "#5C564C", whiteSpace: "nowrap" }}>{label}</span>
  </div>);
const fmtC = (n: number) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const OldWayScene: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s);
  const labelIn = over(f, fr(s) + 2, 12); const chipA = over(f, fr(s) + 12, 10); const chipB = over(f, fr(s) + 24, 10);
  const priceIn = over(f, fr(s) + 22, 12); const countP = ramp(lf, 26, 80); const val = countP * 10000;
  const slash = over(f, fr(s) + 88, 11); const dim = ramp(lf, 90, 106); const drop = ramp(lf, 88, 102) * 16;
  const climbing = countP > 0.01 && countP < 0.985; const pulse = climbing ? 1 + Math.sin(lf * 1.6) * 0.018 : 1;
  return (<AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
    <Bloom cx={CX} cy={952} w={960} color="rgba(196,74,58,0.16)" lf={lf} base={0.42} />
    <div style={{ marginTop: -158, fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 600, fontSize: 50, color: MUTE, opacity: labelIn, transform: `translateY(${(1 - labelIn) * -10}px)` }}>the old way</div>
    <div style={{ marginTop: 36, display: "flex", gap: 20 }}>
      <CostChip e={chipA} icon="🎨" label="a designer" />
      <CostChip e={chipB} icon="📅" label="2 weeks" />
    </div>
    <div style={{ marginTop: 48, position: "relative", opacity: priceIn, transform: `translateY(${drop}px) scale(${(0.72 + Math.min(priceIn, 1) * 0.28) * pulse})`, filter: `saturate(${1 - dim * 0.5}) brightness(${1 - dim * 0.05})` }}>
      <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 152, color: INK, letterSpacing: "-0.02em", lineHeight: 1, textShadow: "0 8px 34px rgba(196,74,58,0.2)" }}>${fmtC(val)}</span>
      {climbing && <span style={{ position: "absolute", right: -62, top: 14, fontSize: 50, color: "#C44A3A", transform: `translateY(${-Math.sin(lf / 4) * 6}px)` }}>▲</span>}
      <div style={{ position: "absolute", left: -30, right: -30, top: "52%", height: 15, borderRadius: 8, background: grad("#D2624C", "#A8392B"), transform: `scaleX(${slash}) rotate(-7deg)`, transformOrigin: "left center", boxShadow: "0 4px 20px rgba(196,74,58,0.65)" }} />
    </div>
  </AbsoluteFill>); };

// ===== SCENE 5: ONE AFTERNOON =====
const AfternoonScene: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s);
  const inE = over(f, fr(s) + 2, 12); const spin = lf * 9;
  return (<AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
    <Bloom cx={CX} cy={960} w={840} color="rgba(63,158,116,0.2)" lf={lf} base={0.5} />
    <div style={{ marginTop: -120, transform: `scale(${inE})`, position: "relative", width: 150, height: 150 }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: grad("#3F9E74", "#2F7E5C"), boxShadow: `${SH}, 0 0 40px rgba(63,158,116,0.5)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width={84} height={84} viewBox="0 0 24 24"><circle cx="12" cy="13" r="9" fill="none" stroke="#fff" strokeWidth="2" /><path d="M9 2 h6 M12 13 V8 M12 13 l4 2" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none" transform={`rotate(${spin} 12 13)`} /></svg></div>
    </div>
    <div style={{ marginTop: 56, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 132, color: INK, opacity: inE, transform: `scale(${0.9 + inE * 0.1})`, lineHeight: 0.95, textAlign: "center", textShadow: "0 6px 30px rgba(236,233,226,0.9)" }}>one<br /><span style={{ color: GREEN }}>afternoon.</span></div>
  </AbsoluteFill>); };

// ===== SCENE 6: PAID PROOF =====
const PaidCard: React.FC<{ x: number; y: number; e: number; rot: number; lf: number; amt: string; climb: number; src: string }> = ({ x, y, e, rot, lf, amt, climb, src }) => (
  <div style={{ position: "absolute", left: x, top: y, transform: `rotate(${rot * e}deg) scale(${0.5 + e * 0.5})`, opacity: e, zIndex: 3 }}>
    <SiteHero src={src} w={236} />
    <div style={{ position: "absolute", right: -10, bottom: -14, transform: `scale(${climb > 0 ? 1 : 0})`, padding: "8px 16px", borderRadius: 999, background: grad("#3F9E74", "#2F7E5C"), color: "#fff", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 26, boxShadow: "0 8px 20px rgba(40,32,20,0.34)", whiteSpace: "nowrap" }}>✓ PAID {amt}</div>
  </div>);
const ProofScene: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s);
  return (<AbsoluteFill>
    <Bloom cx={CX} cy={960} w={860} color="rgba(63,158,116,0.18)" lf={lf} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 648, textAlign: "center" }}><span style={{ fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 600, fontSize: 44, color: MUTE, opacity: over(f, fr(s) + 2, 10) }}>real client sites</span></div>
    <PaidCard x={92} y={760} e={over(f, fr(s) + 8, 12)} rot={-6} lf={lf} amt="$4k" climb={ramp(lf, 36, 48)} src={SITES.a} />
    <PaidCard x={612} y={760} e={over(f, fr(s) + 26, 12)} rot={6} lf={lf} amt="$6k" climb={ramp(lf, 54, 66)} src={SITES.d} />
    <PaidCard x={352} y={1004} e={over(f, fr(s) + 44, 12)} rot={-3} lf={lf} amt="$10k" climb={ramp(lf, 72, 84)} src={SITES.c} />
  </AbsoluteFill>); };

// ===== CTA =====
const CTA: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const local = f - fr(s); if (local < 0) return null; const a = eOut(f, fr(s) + 2, 12); const pulse = 1 + Math.sin(f / 7) * 0.03;
  return (<AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
    {Array.from({ length: 12 }, (_, i) => { const p = eOut(f, fr(s) + 4 + i, 26); const ang = (i / 12) * Math.PI * 2; if (p <= 0 || p >= 1) return null; return <div key={i} style={{ position: "absolute", left: 540 + Math.cos(ang) * p * 340, top: 900 + Math.sin(ang) * p * 340, fontSize: 28, opacity: Math.sin(p * Math.PI), color: [SLATE, CLAY, AMBER, GREEN][i % 4] }}>✦</div>; })}
    <div style={{ marginTop: -150, transform: `scale(${0.7 + a * 0.3})`, opacity: a }}><ClaudeMark size={172} glow={0.5 + Math.sin(local / 9) * 0.12} /></div>
    <div style={{ marginTop: 46, transform: `scale(${pulse})`, padding: "28px 56px", borderRadius: 999, background: CLAY, color: "#fff", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 66, boxShadow: "0 24px 54px rgba(210,114,78,0.42)", opacity: a }}>💬 Comment "SITE"</div>
    <div style={{ marginTop: 28, fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 600, fontSize: 42, color: INK, opacity: a, textAlign: "center", lineHeight: 1.3 }}>and I'll send you<br />the full $10k-site workflow</div>
  </AbsoluteFill>); };

const L = [0, 6.76, 12.32, 15.28, 22.4, 27.09, 28.92, 32.16];
const Sfx: React.FC<{ at: number; src: string; v?: number }> = ({ at, src, v = 0.3 }) => (<Sequence from={fr(at)} durationInFrames={fr(2.5)}><Audio src={staticFile(`sfx/${src}`)} volume={v} /></Sequence>);

export const ClaudeSiteReel: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 16, 28], [1.0, 1.08, 1.0], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  return (<AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
    <Audio src={staticFile("vo_site.wav")} />
    <Audio loop src={staticFile("ados_bed_loud.wav")} volume={(ff) => interpolate(ff, [0, fr(L[7]) - 12, fr(L[7]) + 20, 99999], [0.2, 0.2, 0.16, 0.16], { extrapolateRight: "clamp" })} />
    <Sfx at={0} src="riser.wav" /><Sfx at={0} src="swooshup.wav" /><Sfx at={0.3} src="boom.wav" v={0.34} /><Sfx at={0.3} src="shimmer.wav" />
    {L.slice(1).map((t, i) => <React.Fragment key={i}><Sfx at={t - 0.1} src="swish.wav" v={0.24} /><Sfx at={t + 0.7} src="pop.wav" v={0.22} /></React.Fragment>)}
    <Sfx at={12.7} src="snap.wav" v={0.3} /><Sfx at={22.4} src="impact.wav" v={0.22} />
    <Sfx at={L[7]} src="resolve.wav" v={0.34} /><Sfx at={L[7] + 0.5} src="sparkle.wav" v={0.3} />
    <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "50% 46%" }}>
      <Background />
      <Scene s={L[0]} e={L[1]}><HookScene s={L[0]} /></Scene>
      <Scene s={L[1]} e={L[2]}><PremiumScene s={L[1]} /></Scene>
      <Scene s={L[2]} e={L[3]}><NoCodeScene s={L[2]} /></Scene>
      <Scene s={L[3]} e={L[4]}><InputsScene s={L[3]} /></Scene>
      <Scene s={L[4]} e={L[5]}><OldWayScene s={L[4]} /></Scene>
      <Scene s={L[5]} e={L[6]}><AfternoonScene s={L[5]} /></Scene>
      <Scene s={L[6]} e={L[7]}><ProofScene s={L[6]} /></Scene>
      <CTA s={L[7]} />
      <HeroHeader />
      <Captions />
    </AbsoluteFill>
  </AbsoluteFill>); };
