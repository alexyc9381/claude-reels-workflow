import React from "react";
import { AbsoluteFill, Audio, Easing, Img, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { fraunces, frauncesItalic, inter } from "./fonts";
import wordsData from "./data/words_ads.json";

/**
 * ClaudeAdsReel — "Run your whole Meta ads team inside Claude" (ADS, Alex VO). Skill-stack format.
 * Hook (frame-0 COMPLETE) -> /spy -> /bulkcreative -> /adscore -> /angles -> /adsaudit -> CTA.
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
const IMSH = "0 14px 30px rgba(40,32,20,0.26), 0 4px 10px rgba(40,32,20,0.14)";

const Sheen: React.FC<{ r: number | string; o?: number }> = ({ r, o = 0.3 }) => (<div style={{ position: "absolute", inset: 0, borderRadius: r, background: `linear-gradient(125deg, rgba(255,255,255,${o}) 0%, rgba(255,255,255,0) 32%)`, pointerEvents: "none" }} />);
const Bloom: React.FC<{ cx: number; cy: number; w: number; color: string; lf: number; base?: number }> = ({ cx, cy, w, color, lf, base = 0.55 }) => (<div style={{ position: "absolute", left: cx - w / 2, top: cy - w / 2, width: w, height: w, borderRadius: "50%", background: `radial-gradient(circle at 50% 46%, ${color} 0%, transparent 62%)`, opacity: base + Math.sin(lf / 9) * 0.2, pointerEvents: "none" }} />);
const ClaudeMark: React.FC<{ size: number; glow?: number }> = ({ size, glow = 0.4 }) => (
  <div style={{ position: "relative", width: size, height: size, borderRadius: size * 0.28, background: grad("#E08A66", "#C5603C"), boxShadow: `${SH}, 0 0 ${Math.round(size * 0.34)}px rgba(210,114,78,${glow})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
    <svg viewBox="0 0 24 24" width={size * 0.58} height={size * 0.58}><path fill="#F6EFE6" d={CLAUDE_PATH} /></svg><Sheen r={size * 0.28} />
  </div>);

// REAL designer-made ecom ad creatives from Behance (beverage / skincare / footwear / tech / beauty) — shown clean; they already carry their own headline + offer + CTA
const AD_IMGS = ["refs/ad1.jpg", "refs/ad2.jpg", "refs/ad3.jpg", "refs/ad4.jpg", "refs/ad5.jpg", "refs/ad6.jpg", "refs/ad7.jpg", "refs/ad8.jpg", "refs/ad9.jpg", "refs/ad10.jpg"];
const AdCard: React.FC<{ w: number; h: number; i: number; r?: number; glow?: number; bd?: boolean; cta?: boolean }> = ({ w, h, i, r = 16, glow = 0, bd = true }) => {
  const idx = ((i % AD_IMGS.length) + AD_IMGS.length) % AD_IMGS.length;
  return (<div style={{ width: w, height: h, borderRadius: r, overflow: "hidden", position: "relative", background: "#fff", boxShadow: `${IMSH}${glow > 0 ? `, 0 0 ${glow * 30}px rgba(210,114,78,${glow * 0.7})` : ""}`, border: bd ? "3px solid #fff" : "none" }}>
    <Img src={staticFile(AD_IMGS[idx])} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
    <Sheen r={r} />
  </div>);
};

const Background: React.FC = () => { const f = useCurrentFrame(); const d = Math.sin(f / 90) * 6;
  return (<AbsoluteFill style={{ backgroundColor: CREAM }}>
    <AbsoluteFill style={{ transform: `translate(${d}px,${d * 0.6}px)`, backgroundImage: "linear-gradient(rgba(26,24,19,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(26,24,19,0.07) 1px,transparent 1px)", backgroundSize: "68px 68px" }} />
    <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 46%, rgba(0,0,0,0) 55%, rgba(40,32,20,0.10) 100%)" }} />
  </AbsoluteFill>); };

type Word = { word: string; start: number; end: number; line: number };
const WORDS = wordsData as Word[];
const cleanw = (w: string) => w.toLowerCase().replace(/[^a-z0-9'$]/g, "");
const EMPH = new Set(["claude", "meta", "ads", "free", "spy", "bulkcreative", "adscore", "adsaudit", "skill", "competitor's", "hooks", "offers", "20", "variations", "grades", "launch", "angles", "ranks", "186", "100", "comment", "stack", "agency", "team"]);
const CHUNKS = (() => { const byLine: Record<number, Word[]> = {}; for (const w of WORDS) (byLine[w.line] ||= []).push(w);
  const out: { words: Word[]; start: number; line: number }[] = [];
  for (const li of Object.keys(byLine).map(Number).sort((a, b) => a - b)) { const ws = byLine[li]; for (let i = 0; i < ws.length; i += 3) { const g = ws.slice(i, i + 3); out.push({ words: g, start: g[0].start, line: li }); } }
  const aE = Math.max(...WORDS.map((w) => w.end)); return out.map((c, i) => ({ ...c, end: i + 1 < out.length ? out[i + 1].start : aE + 0.4 })); })();
const Captions: React.FC = () => { const frame = useCurrentFrame();
  return (<>{CHUNKS.map((c, i) => { if (frame < fr(c.start) || frame >= fr(c.end)) return null; if (c.line === 6) return null;
    return (<div key={i} style={{ position: "absolute", top: 1264, left: 64, right: 64, height: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "center", gap: "0 16px", width: 952, textAlign: "center" }}>
        {c.words.map((w, j) => { const g = EMPH.has(cleanw(w.word)); const shown = frame >= fr(w.start);
          return <span key={j} style={{ display: "inline-block", opacity: shown ? 1 : 0, fontFamily: g ? frauncesItalic.fontFamily : fraunces.fontFamily, fontStyle: g ? "italic" : "normal", fontWeight: g ? 700 : 600, fontSize: g ? 84 : 72, lineHeight: 1.04, color: g ? SLATE : INK, letterSpacing: "-0.02em", textShadow: "0 2px 16px rgba(236,233,226,0.95)" }}>{w.word}</span>; })}
      </div></div>); })}</>); };

const HeroHeader: React.FC = () => { const f = useCurrentFrame(); if (f > 268) return null;
  const out = eOut(f, 252, 14); // FRAME-0: full header at f=0, fades only at the end of the hook
  return (<div style={{ position: "absolute", top: 300, left: 70, right: 70, opacity: 1 - out, transform: `translateY(${-out * 12}px)`, zIndex: 60 }}>
    <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 76, lineHeight: 1.03, letterSpacing: "-0.03em", color: INK, textShadow: "0 2px 18px rgba(236,233,226,0.96)" }}>
      <div>Run your whole</div>
      <div>Meta ads team in <span style={{ color: CLAY }}>Claude</span>.</div>
    </div></div>); };

const Scene: React.FC<{ s: number; e: number; children: React.ReactNode }> = ({ s, e, children }) => {
  const frame = useCurrentFrame(); const local = frame - fr(s); const lenF = fr(e - s); if (local < 0 || local > lenF) return null;
  const inF = s <= 0 ? 1 : eOut(frame, fr(s), 5); const op = Math.min(inF, 1 - eOut(frame, fr(e - 0.18), 6)); const inE = eOut(frame, fr(s), 12);
  return <AbsoluteFill style={{ opacity: op, transform: `scale(${0.99 + inE * 0.01})` }}>{children}</AbsoluteFill>; };

const CommandBar: React.FC<{ s: number; n: number; cmd: string; persona: string; color: string }> = ({ s, n, cmd, persona, color }) => {
  const f = useCurrentFrame(); const lf = f - fr(s); const inn = over(f, fr(s) + 2, 12);
  const typed = Math.min(cmd.length, Math.floor(ramp(lf, 8, 22) * cmd.length)); const sent = ramp(lf, 24, 32);
  return (<div style={{ position: "absolute", top: 590, left: 0, right: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 18, transform: `translateY(${(1 - inn) * -16}px)`, opacity: inn }}>
    <div style={{ width: 80, height: 80, borderRadius: "50%", background: grad(color, color + "cc"), boxShadow: SH, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 44, color: "#fff", position: "relative" }}>{n}<Sheen r="50%" /></div>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", padding: "12px 28px", borderRadius: 18, background: grad("#FBF7EF", "#EFEADF"), boxShadow: SH, border: sent > 0.4 ? `2px solid ${color}` : "2px solid transparent", position: "relative" }}>
      <span style={{ ...inter9, fontSize: 44, color, letterSpacing: "-0.01em", lineHeight: 1 }}>/{cmd.slice(0, typed)}<span style={{ opacity: typed < cmd.length && Math.floor(lf / 8) % 2 ? 1 : 0, color }}>|</span></span>
      <span style={{ fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 600, fontSize: 26, color: MUTE, marginTop: 5, opacity: sent, whiteSpace: "nowrap" }}>{persona}</span>
      <Sheen r={18} />
    </div></div>); };

// ===== HOOK — 5 real FB ecom ads fanned + climbing ad-results (frame-0 complete) =====
const fmtN = (n: number) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const Hook: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const lf = f - fr(s); const cy = 892; const markCy = 1150; const pulse = Math.max(0, Math.sin(lf / 7));
  // 3 acts: A reveal+results (0-3s) · B regenerate fresh variations (3-5.9s) · C a winner is crowned + ROAS surges (5.9-9s)
  const mp1 = ramp(lf, 6, 84); const mp2 = ramp(lf, 150, 240); const win = ramp(lf, 188, 230);
  const cyc = lf < 92 ? 0 : Math.min(3, Math.floor((lf - 92) / 28)); const swapAge = (lf - 92) % 28;
  const regen = lf >= 92 && lf < 178; const flash = regen && swapAge < 9 ? 1 - swapAge / 9 : 0; const pop = 1 + flash * 0.05;
  const spend = 9800 * mp1 + 14800 * mp2; const roas = 1.2 + 3.4 * mp1 + 3.8 * win; const sales = 1640 * mp1 + 2540 * mp2;
  const metrics = [{ l: "Ad spend", v: "$" + fmtN(spend), c: SLATE, surge: 0 }, { l: "ROAS", v: roas.toFixed(1) + "x", c: CLAY, hot: true, surge: win }, { l: "Sales", v: fmtN(sales), c: GREEN, surge: 0 }];
  return (<AbsoluteFill>
    <Bloom cx={CX} cy={946} w={940} color="rgba(210,114,78,0.2)" lf={lf} base={0.5 + pulse * 0.12 + win * 0.16} />
    {/* climbing ad-results metrics row */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 660, display: "flex", justifyContent: "center", gap: 16 }}>
      {metrics.map((m, i) => (<div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "12px 26px", borderRadius: 20, background: m.hot ? grad(CLAY, "#A8392B") : grad("#FBF7EF", "#EFEADF"), boxShadow: SH, border: m.hot ? "none" : `2px solid ${m.c}30`, minWidth: 168, transform: `scale(${1 + m.surge * 0.07})` }}>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 22, color: m.hot ? "rgba(255,255,255,0.85)" : MUTE }}>{m.l}</span>
        <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 46, color: m.hot ? "#fff" : INK, lineHeight: 1 }}>{m.v}</span>
      </div>))}
    </div>
    {/* rings from the mark — faster during regeneration */}
    {[0, 1, 2].map((k) => { const per = regen ? 56 : 96; const rp = ramp(((lf - k * (per / 3)) % per + per) % per, 0, per * 0.66); if (rp <= 0.02 || rp >= 1) return null; const rs = 60 + rp * 220; return <div key={"r" + k} style={{ position: "absolute", left: CX - rs / 2, top: markCy - rs / 2, width: rs, height: rs, borderRadius: "50%", border: `${3 * (1 - rp)}px solid ${CLAY}`, opacity: (1 - rp) * 0.34, zIndex: 8 }} />; })}
    {/* the fan: regenerates fresh ads (B), then the center wins + others recede (C) */}
    {[0, 1, 2, 3, 4].map((i) => { const off = i - 2; const isWin = i === 2;
      const fx = CX + off * 202 + (isWin ? 0 : win * 28 * Math.sign(off)); const fy = cy + Math.abs(off) * 28 + Math.sin(lf / 22 + i) * 4 - (isWin ? win * 5 : 0);
      const dim = isWin ? 1 : 1 - win * 0.58; const sc = (isWin ? 1 + win * 0.07 : 1 - win * 0.06) * pop;
      return (<div key={i} style={{ position: "absolute", left: fx - 95, top: fy - 119, transform: `rotate(${off * 6 * (1 - (isWin ? win : win * 0.2))}deg) scale(${sc})`, opacity: dim, zIndex: isWin ? 9 : 5 - Math.abs(off) }}>
        <AdCard i={i + cyc} w={190} h={238} cta glow={isWin ? 0.5 + pulse * 0.2 + win * 0.55 : 0} />
        {flash > 0 && <div style={{ position: "absolute", inset: 0, borderRadius: 16, background: "#fff", opacity: flash * 0.32, zIndex: 11 }} />}
        {isWin && win > 0.04 && <div style={{ position: "absolute", left: "50%", bottom: -30, transform: `translateX(-50%) scale(${ramp(lf, 196, 214)})`, padding: "6px 17px", borderRadius: 999, background: grad("#3F9E74", "#2F7E5C"), color: "#fff", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 23, whiteSpace: "nowrap", boxShadow: "0 7px 20px rgba(40,32,20,0.36)", border: "2px solid rgba(255,255,255,0.5)", zIndex: 12 }}>★ Winner · {roas.toFixed(1)}x</div>}
      </div>); })}
    {/* winner burst ring */}
    {win > 0.02 && win < 1 && <div style={{ position: "absolute", left: CX - (60 + win * 280) / 2, top: cy - 4 - (60 + win * 280) / 2, width: 60 + win * 280, height: 60 + win * 280, borderRadius: "50%", border: `${4 * (1 - win)}px solid #3F9E74`, opacity: (1 - win) * 0.5, zIndex: 7 }} />}
    <div style={{ position: "absolute", left: CX - 70, top: markCy - 70, transform: `scale(${1 + pulse * 0.05})`, zIndex: 10 }}><ClaudeMark size={140} glow={0.55 + pulse * 0.3} /></div>
  </AbsoluteFill>); };

// ===== /spy: competitor ads scanned in a depth cluster → top angle flagged =====
const SpyScene: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s);
  const cards = [
    { x: -258, y: 872, sc: 0.80, blur: 1.7, i: 6, d: "47d", v: "1.2M" },
    { x: 256, y: 888, sc: 0.80, blur: 1.7, i: 8, d: "120d", v: "0.9M" },
    { x: 8, y: 826, sc: 0.90, blur: 0.8, i: 0, d: "63d", v: "1.7M" },
    { x: -134, y: 992, sc: 1.0, blur: 0, i: 2, d: "92d", v: "3.4M", top: true },
    { x: 158, y: 1000, sc: 1.0, blur: 0, i: 4, d: "31d", v: "2.1M" },
  ];
  const scanP = ramp(lf, 16, 66); const scanY = 770 + scanP * 320; const win = ramp(lf, 80, 106);
  return (<AbsoluteFill><Bloom cx={CX} cy={930} w={920} color="rgba(58,92,132,0.20)" lf={lf} base={0.46 + win * 0.12} />
    {cards.map((c, i) => { const e = over(f, fr(s) + 12 + i * 7, 14); const fl = Math.sin(lf / 20 + i) * (4 + c.blur * 3);
      const scanned = scanY > c.y - 30 || lf > 70; const lift = c.top ? win : 0; const dim = c.top ? 1 : 1 - win * 0.5;
      const cyy = c.y + fl - lift * 34; const scl = (c.sc + lift * 0.2) * (0.58 + Math.min(e, 1) * 0.42);
      return (<div key={i} style={{ position: "absolute", left: CX + c.x - 75, top: cyy - 94, transform: `rotate(${(i - 2) * 4 * (1 - lift)}deg) scale(${scl})`, opacity: e * dim, filter: c.blur && lift < 0.4 ? `blur(${c.blur * (1 - Math.min(e, 1) * 0.25) * (1 - lift)}px)` : "none", zIndex: c.top ? 12 : 4 + (c.sc > 0.95 ? 2 : 0) }}>
        <div style={{ position: "relative", borderRadius: 14, boxShadow: scanned ? `${IMSH}, 0 0 0 3px ${c.top ? GREEN : SLATE}, 0 0 ${c.top ? 36 : 18}px ${c.top ? "rgba(63,158,116,0.6)" : "rgba(58,92,132,0.4)"}` : IMSH }}>
          <AdCard i={c.i} w={150} h={188} r={14} />
          <div style={{ position: "absolute", left: 7, top: 7, padding: "3px 9px", borderRadius: 999, background: "rgba(22,19,14,0.82)", color: "#fff", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 13 }}>🔴 {c.d}</div>
        </div>
        {scanned && <div style={{ position: "absolute", left: "50%", bottom: -20, transform: `translateX(-50%) scale(${over(f, fr(s) + 22 + i * 6, 9)})`, padding: "4px 11px", borderRadius: 999, background: c.top ? grad(GREEN, "#2F7E5C") : grad("#FBF7EF", "#EFEADF"), color: c.top ? "#fff" : INK, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 15, boxShadow: SH, whiteSpace: "nowrap", border: c.top ? "none" : `1.5px solid ${SLATE}30` }}>👁 {c.v}</div>}
        {c.top && win > 0.1 && <div style={{ position: "absolute", left: "50%", top: -32, transform: `translateX(-50%) scale(${ramp(lf, 86, 106)})`, padding: "5px 15px", borderRadius: 999, background: grad(CLAY, "#A8392B"), color: "#fff", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 20, whiteSpace: "nowrap", boxShadow: "0 7px 20px rgba(40,32,20,0.36)", border: "2px solid rgba(255,255,255,0.5)", zIndex: 14 }}>⚡ Top angle</div>}
      </div>); })}
    {scanP > 0.01 && scanP < 1 && <div style={{ position: "absolute", left: 150, width: 780, top: scanY, height: 4, background: "linear-gradient(90deg, transparent, #9FC0E8, #F6CDA0, #9FC0E8, transparent)", boxShadow: "0 0 26px 7px rgba(120,150,200,0.55)", zIndex: 8 }} />}
  </AbsoluteFill>); };

// ===== /bulkcreative: 20 ad variations spawn in a grid =====
const BulkScene: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s);
  const cols = 5, rows = 4, total = 20; const tw = 85, th = 106, gx = 12, gy = 8;
  const gridW = cols * tw + (cols - 1) * gx; const startX = CX - gridW / 2; const startY = 702; const cnt = Math.round(ramp(lf, 10, 80) * 20);
  const winners = [2, 9, 16]; const pick = ramp(lf, 86, 108);
  return (<AbsoluteFill><Bloom cx={CX} cy={930} w={860} color="rgba(210,114,78,0.16)" lf={lf} base={0.46 + pick * 0.12} />
    {Array.from({ length: total }, (_, i) => { const c = i % cols, r = Math.floor(i / cols); const e = over(f, fr(s) + 8 + i * 3, 9); const fl = Math.sin(lf / 22 + i) * 3;
      const isW = winners.includes(i); const g = isW ? pick : 0; const od = isW ? 1 : 1 - pick * 0.5;
      return (<div key={i} style={{ position: "absolute", left: startX + c * (tw + gx), top: startY + r * (th + gy) + fl, opacity: e * od, transform: `translateY(${(1 - e) * -12}px) scale(${(0.6 + Math.min(e, 1) * 0.4) + g * 0.14})`, zIndex: isW ? 6 : 1 }}>
        <div style={{ position: "relative", borderRadius: 11, boxShadow: g > 0.05 ? `0 0 0 3px ${GREEN}, 0 0 ${g * 24}px rgba(63,158,116,0.65)` : "none" }}>
          <AdCard i={i} w={tw} h={th} r={11} bd />
          {g > 0.3 && <div style={{ position: "absolute", right: -7, top: -7, width: 26, height: 26, borderRadius: "50%", background: grad(GREEN, "#2F7E5C"), display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 3px 9px rgba(40,32,20,0.32)", transform: `scale(${ramp(lf, 90, 106)})` }}><svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round"><path d="M4 12 L10 18 L20 6" /></svg></div>}
        </div>
      </div>); })}
    <div style={{ position: "absolute", left: 0, right: 0, top: 1166, textAlign: "center" }}>{pick < 0.4 ? <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 52, color: CLAY }}>{cnt}<span style={{ fontSize: 30, color: INK }}> variations · 10 min</span></span> : <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 46, color: GREEN, opacity: ramp(lf, 92, 104) }}>✓ top 3 auto-picked</span>}</div>
  </AbsoluteFill>); };

// ===== /adscore: one ad creative graded with bars + a score =====
const ScoreScene: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s);
  const cardIn = over(f, fr(s) + 8, 14); const panelIn = over(f, fr(s) + 24, 13); const scoreIn = over(f, fr(s) + 50, 12);
  const bars = [{ l: "Hook", v: 91, c: GREEN }, { l: "Copy", v: 78, c: AMBER }, { l: "Offer", v: 64, c: AMBER, imp: true }]; const score = Math.round(ramp(lf, 50, 78) * 84);
  const verdict = ramp(lf, 84, 104); const pulse = Math.max(0, Math.sin(lf / 8)); const flo = Math.sin(lf / 26) * 5;
  return (<AbsoluteFill><Bloom cx={CX} cy={950} w={820} color="rgba(207,149,68,0.18)" lf={lf} base={0.46 + pulse * 0.06} />
    {[0, 1, 2, 3, 4, 5].map((i) => { const a = (i / 6) * Math.PI * 2 + lf / 60; const rr = 230 + Math.sin(lf / 18 + i) * 26; const px = 310 + Math.cos(a) * rr, py = 940 + Math.sin(a) * rr * 0.7; return <div key={"p" + i} style={{ position: "absolute", left: px, top: py, fontSize: 18, opacity: 0.5 + Math.sin(lf / 12 + i) * 0.3, color: [AMBER, CLAY, GREEN][i % 3], zIndex: 1 }}>✦</div>; })}
    <div style={{ position: "absolute", left: 150, top: 740 + flo, width: 320, height: 400, borderRadius: 26, background: grad("#26221C", "#15120E"), boxShadow: `${SH}, 0 26px 60px rgba(40,32,20,0.3)`, transform: `scale(${cardIn}) rotate(${(1 - cardIn) * -4 + Math.sin(lf / 30) * 0.6}deg)`, padding: 12, zIndex: 3 }}><AdCard i={2} w={296} h={376} r={18} bd={false} /><Sheen r={26} /></div>
    {panelIn > 0.02 && <div style={{ position: "absolute", left: 530, top: 766, width: 386, display: "flex", flexDirection: "column", gap: 20, opacity: panelIn, transform: `translateX(${(1 - panelIn) * 28}px)`, zIndex: 4 }}>
      {bars.map((b, i) => { const fl = ramp(lf, 26 + i * 8, 52 + i * 8); return (<div key={i}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 24, color: INK, marginBottom: 6 }}><span>{b.l} {b.imp && verdict > 0.15 && <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 16, color: CLAY, opacity: ramp(lf, 88, 100) }}>· rewrite ↑</span>}</span><span style={{ color: b.c }}>{Math.round(b.v * fl)}</span></div><div style={{ height: 22, borderRadius: 11, background: "rgba(40,32,20,0.12)", overflow: "hidden", boxShadow: "inset 0 1px 3px rgba(40,32,20,0.14)" }}><div style={{ height: "100%", width: `${b.v * fl}%`, borderRadius: 11, background: grad(b.c, b.c + "cc") }} /></div></div>); })}
    </div>}
    {scoreIn > 0.02 && <div style={{ position: "absolute", left: 566, top: 1008, width: 300, height: 92, borderRadius: 18, background: grad(GREEN, "#2F7E5C"), boxShadow: `${SH}, 0 0 ${28 + pulse * 12}px rgba(63,158,116,${0.45 + pulse * 0.18})`, transform: `scale(${interpolate(scoreIn, [0, 1], [1.4, 1]) * (1 + pulse * 0.022)})`, display: "flex", alignItems: "center", justifyContent: "center", border: "4px solid rgba(255,255,255,0.36)", zIndex: 5 }}>
      <span style={{ ...inter9, fontSize: 44, color: "#fff" }}>{score}/100 ✓</span></div>}
    {verdict > 0.05 && <div style={{ position: "absolute", left: 566, top: 1120, width: 300, transform: `scale(${ramp(lf, 84, 100)})`, transformOrigin: "center", display: "flex", justifyContent: "center", zIndex: 5 }}><div style={{ padding: "8px 20px", borderRadius: 999, background: "#FBF7EF", boxShadow: SH, border: `2px solid ${GREEN}`, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 26, color: GREEN, whiteSpace: "nowrap" }}>✓ ready to scale</div></div>}
  </AbsoluteFill>); };

// ===== /angles: winning hooks ranked on a live leaderboard =====
const AnglesScene: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s);
  const rows = [{ h: "“Stop wasting ad spend”", v: 94, i: 2, hot: true }, { h: "“The 5-minute fix”", v: 81, i: 4 }, { h: "“Why everyone switched”", v: 73, i: 6 }, { h: "“Free until it works”", v: 66, i: 8 }];
  const medals = ["#E0A23C", "#B7BCC6", "#C2895A", "#9AA0AA"];
  return (<AbsoluteFill><Bloom cx={CX} cy={940} w={860} color="rgba(63,158,116,0.16)" lf={lf} />
    <div style={{ position: "absolute", left: 92, right: 92, top: 742, display: "flex", flexDirection: "column", gap: 17 }}>
      {rows.map((r, i) => { const e = over(f, fr(s) + 12 + i * 11, 13); const grow = ramp(lf, 20 + i * 8, 56 + i * 8); const lift = r.hot ? ramp(lf, 62, 88) : 0;
        return (<div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 22px", borderRadius: 20, background: r.hot ? grad("#FBF7EF", "#F3ECDC") : grad("#FBF7EF", "#EFEADF"), boxShadow: r.hot ? `${SH}, 0 0 ${20 + lift * 28}px rgba(210,114,78,${0.3 + lift * 0.32})` : IMSH, border: r.hot ? `2.5px solid ${CLAY}` : "2.5px solid transparent", transform: `translateX(${(1 - e) * -30}px) scale(${0.93 + Math.min(e, 1) * 0.07 + lift * 0.045})`, opacity: e, position: "relative", zIndex: r.hot ? 6 : 4 }}>
          <div style={{ width: 50, height: 50, borderRadius: "50%", background: r.hot ? grad(CLAY, "#A8392B") : grad(medals[i], medals[i] + "bb"), display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 26, color: "#fff", flexShrink: 0, boxShadow: "0 4px 11px rgba(40,32,20,0.26)" }}>{i + 1}</div>
          <div style={{ flexShrink: 0, borderRadius: 9, boxShadow: IMSH }}><AdCard i={r.i} w={50} h={62} r={9} /></div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 600, fontSize: 27, color: INK, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.h}</div>
            <div style={{ marginTop: 8, height: 10, borderRadius: 6, background: "rgba(40,32,20,0.1)", overflow: "hidden" }}><div style={{ height: "100%", width: `${r.v * grow}%`, borderRadius: 6, background: r.hot ? grad(CLAY, "#E08A66") : grad(SLATE, SLATE2) }} /></div>
          </div>
          <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 36, color: r.hot ? CLAY : MUTE, flexShrink: 0, minWidth: 52, textAlign: "right" }}>{Math.round(r.v * grow)}</div>
          {r.hot && lift > 0.1 && <div style={{ position: "absolute", right: -6, top: -16, transform: `scale(${ramp(lf, 64, 88)}) rotate(${Math.sin(lf / 9) * 8}deg)`, fontSize: 36 }}>🏆</div>}
        </div>); })}
    </div>
  </AbsoluteFill>); };

// ===== /adsaudit: a live account audit — issues found, then fixed; score climbs =====
const AuditScene: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s);
  const items = [{ t: "Creative fatigue", fix: 34 }, { t: "Audience overlap", fix: 50 }, { t: "Budget pacing", fix: 66 }];
  const p = ramp(lf, 14, 88); const score = Math.round(p * 92); const checks = Math.round(ramp(lf, 8, 74) * 214);
  const R = 145, C = 2 * Math.PI * R; const dash = C * (p * 0.92); const pulse = Math.max(0, Math.sin(lf / 8));
  return (<AbsoluteFill><Bloom cx={CX} cy={900} w={940} color="rgba(63,158,116,0.18)" lf={lf} base={0.5 + pulse * 0.08} />
    <div style={{ position: "absolute", left: CX - 175, top: 720, width: 350, height: 350 }}>
      <div style={{ position: "absolute", inset: -14, borderRadius: "50%", background: "radial-gradient(circle, rgba(63,158,116,0.16), transparent 68%)" }} />
      <svg width={350} height={350} style={{ position: "absolute", transform: "rotate(-90deg)" }}>
        <circle cx={175} cy={175} r={R} fill="none" stroke="rgba(40,32,20,0.09)" strokeWidth={26} />
        <circle cx={175} cy={175} r={R} fill="none" stroke="url(#ag)" strokeWidth={26} strokeLinecap="round" strokeDasharray={`${dash} ${C}`} style={{ filter: "drop-shadow(0 0 11px rgba(63,158,116,0.55))" }} />
        <defs><linearGradient id="ag" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#5CC79A" /><stop offset="1" stopColor="#2F7E5C" /></linearGradient></defs>
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 124, color: INK, lineHeight: 1, textShadow: "0 4px 22px rgba(63,158,116,0.22)" }}>{score}</span>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 24, color: MUTE, letterSpacing: "0.02em" }}>ads health · /100</span>
        <span style={{ fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 600, fontSize: 23, color: GREEN, marginTop: 6 }}>{checks} checks run</span>
      </div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1098, display: "flex", justifyContent: "center", gap: 15 }}>
      {items.map((it, i) => { const e = over(f, fr(s) + 16 + i * 9, 11); const fixed = lf > it.fix; const flip = ramp(lf, it.fix, it.fix + 11);
        return (<div key={i} style={{ position: "relative", display: "flex", alignItems: "center", gap: 11, padding: "13px 20px", borderRadius: 16, background: "#FBF7EF", boxShadow: `${IMSH}, inset 0 0 0 2px ${fixed ? "rgba(63,158,116,0.42)" : "rgba(210,114,78,0.36)"}`, opacity: e, transform: `scale(${(0.84 + Math.min(e, 1) * 0.16) * (1 + flip * (1 - flip) * 0.5)})`, overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: fixed ? "linear-gradient(135deg, rgba(63,158,116,0.13), rgba(47,126,92,0.06))" : "linear-gradient(135deg, rgba(210,114,78,0.13), rgba(168,57,43,0.05))" }} />
          <div style={{ position: "relative", width: 30, height: 30, borderRadius: "50%", background: fixed ? grad(GREEN, "#2F7E5C") : grad(CLAY, "#A8392B"), display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 3px 8px rgba(40,32,20,0.22)" }}>
            {fixed ? <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={3.8} strokeLinecap="round" strokeLinejoin="round"><path d="M4 12 L10 18 L20 6" /></svg> : <span style={{ color: "#fff", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 19 }}>!</span>}
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 21, color: INK, whiteSpace: "nowrap" }}>{it.t}</div>
            <div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 15, color: fixed ? GREEN : CLAY }}>{fixed ? "optimized" : "detected"}</div>
          </div>
        </div>); })}
    </div>
  </AbsoluteFill>); };

const CTA: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const local = f - fr(s); if (local < 0) return null; const a = eOut(f, fr(s) + 2, 12); const pulse = 1 + Math.sin(f / 7) * 0.03;
  return (<AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
    {Array.from({ length: 12 }, (_, i) => { const p = eOut(f, fr(s) + 4 + i, 26); const ang = (i / 12) * Math.PI * 2; if (p <= 0 || p >= 1) return null; return <div key={i} style={{ position: "absolute", left: 540 + Math.cos(ang) * p * 340, top: 900 + Math.sin(ang) * p * 340, fontSize: 28, opacity: Math.sin(p * Math.PI), color: [SLATE, CLAY, AMBER, GREEN][i % 4] }}>✦</div>; })}
    <div style={{ marginTop: -150, transform: `scale(${0.7 + a * 0.3})`, opacity: a }}><ClaudeMark size={172} glow={0.5 + Math.sin(local / 9) * 0.12} /></div>
    <div style={{ marginTop: 46, transform: `scale(${pulse})`, padding: "28px 56px", borderRadius: 999, background: CLAY, color: "#fff", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 66, boxShadow: "0 24px 54px rgba(210,114,78,0.42)", opacity: a }}>💬 Comment "ADS"</div>
    <div style={{ marginTop: 28, fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 600, fontSize: 42, color: INK, opacity: a, textAlign: "center", lineHeight: 1.3 }}>and I'll send the full install guide<br />for all five skills</div>
  </AbsoluteFill>); };

const L = [0, 8.68, 17.04, 23.84, 31.3, 36.06, 44.52];
const Sfx: React.FC<{ at: number; src: string; v?: number }> = ({ at, src, v = 0.3 }) => (<Sequence from={fr(at)} durationInFrames={fr(2.5)}><Audio src={staticFile(`sfx/${src}`)} volume={v} /></Sequence>);

export const ClaudeAdsReel: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 16, 28], [1.0, 1.06, 1.0], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  return (<AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
    <Audio src={staticFile("vo_ads.wav")} />
    <Audio loop src={staticFile("ados_bed_loud.wav")} volume={(ff) => interpolate(ff, [0, fr(L[6]) - 12, fr(L[6]) + 20, 99999], [0.2, 0.2, 0.15, 0.15], { extrapolateRight: "clamp" })} />
    <Sfx at={0} src="riser.wav" /><Sfx at={0} src="swooshup.wav" /><Sfx at={0.4} src="boom.wav" v={0.32} /><Sfx at={0.4} src="shimmer.wav" />
    {L.slice(1).map((t, i) => <React.Fragment key={i}><Sfx at={t - 0.1} src="swish.wav" v={0.24} /><Sfx at={t + 0.9} src="pop.wav" v={0.22} /></React.Fragment>)}
    <Sfx at={L[6]} src="resolve.wav" v={0.34} /><Sfx at={L[6] + 0.5} src="sparkle.wav" v={0.3} />
    <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "50% 46%" }}>
      <Background />
      <Scene s={L[0]} e={L[1]}><Hook s={L[0]} /></Scene>
      <Scene s={L[1]} e={L[2]}><CommandBar s={L[1]} n={1} cmd="spy" persona="the spy" color={SLATE} /><SpyScene s={L[1]} /></Scene>
      <Scene s={L[2]} e={L[3]}><CommandBar s={L[2]} n={2} cmd="bulkcreative" persona="the copywriter" color={CLAY} /><BulkScene s={L[2]} /></Scene>
      <Scene s={L[3]} e={L[4]}><CommandBar s={L[3]} n={3} cmd="adscore" persona="the critic" color={AMBER} /><ScoreScene s={L[3]} /></Scene>
      <Scene s={L[4]} e={L[5]}><CommandBar s={L[4]} n={4} cmd="angles" persona="the strategist" color={GREEN} /><AnglesScene s={L[4]} /></Scene>
      <Scene s={L[5]} e={L[6]}><CommandBar s={L[5]} n={5} cmd="adsaudit" persona="the auditor" color={SLATE2} /><AuditScene s={L[5]} /></Scene>
      <CTA s={L[6]} />
      <HeroHeader />
      <Captions />
    </AbsoluteFill>
  </AbsoluteFill>); };
