import React from "react";
import { AbsoluteFill, Audio, Easing, Img, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { fraunces, frauncesItalic, inter } from "./fonts";
import wordsData from "./data/words_seo.json";

/**
 * ClaudeSeoReel — "Steal your rival's Google traffic" (SEO, Alex VO).
 * Real-screen aesthetic: real website screenshots inside browser frames + realistic SEO-tool UIs.
 */
const CREAM = "#ECE9E2", INK = "#1A1813", SLATE = "#3A5C84", SLATE2 = "#4C7BB0", CLAY = "#D2724E", AMBER = "#CF9544", GREEN = "#3F9E74", MUTE = "#9A968B", RED = "#C44A3A";
const GBLUE = "#3A6FD8", GGREEN = "#2E9E5B", GRED = "#D2493B", GYEL = "#E6A019";
const FPS = 30; const fr = (s: number) => s * FPS; const CX = 540;
const eOut = (f: number, sF: number, d = 10) => interpolate(f, [sF, sF + d], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
const ramp = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const over = (f: number, sF: number, d = 12) => interpolate(f, [sF, sF + d * 0.5, sF + d], [0, 1.14, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
const grad = (a: string, b: string) => `linear-gradient(158deg, ${a} 0%, ${b} 100%)`;
const fmtN = (n: number) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const CLAUDE_PATH = "m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z";
const SH = "inset 0 1.5px 0 rgba(255,255,255,0.5), 0 2px 4px rgba(34,30,24,0.22), 0 12px 26px rgba(34,30,24,0.20), 0 34px 64px rgba(20,26,45,0.26)";
const IMSH = "0 14px 30px rgba(40,32,20,0.26), 0 4px 10px rgba(40,32,20,0.14)";
const CARDSH = "0 2px 4px rgba(40,32,20,0.10), 0 16px 36px rgba(40,48,68,0.18)";
const RIVAL = "refs/stripe_hero.jpg", YOURS = "refs/bh_site_a.jpg", SITE3 = "refs/bh_site_c.jpg", SITE4 = "refs/bh_site_h.jpg";

const Sheen: React.FC<{ r: number | string; o?: number }> = ({ r, o = 0.3 }) => (<div style={{ position: "absolute", inset: 0, borderRadius: r, background: `linear-gradient(125deg, rgba(255,255,255,${o}) 0%, rgba(255,255,255,0) 32%)`, pointerEvents: "none" }} />);
const Bloom: React.FC<{ cx: number; cy: number; w: number; color: string; lf: number; base?: number }> = ({ cx, cy, w, color, lf, base = 0.55 }) => (<div style={{ position: "absolute", left: cx - w / 2, top: cy - w / 2, width: w, height: w, borderRadius: "50%", background: `radial-gradient(circle at 50% 46%, ${color} 0%, transparent 62%)`, opacity: base + Math.sin(lf / 9) * 0.2, pointerEvents: "none" }} />);
const ClaudeMark: React.FC<{ size: number; glow?: number }> = ({ size, glow = 0.4 }) => (
  <div style={{ position: "relative", width: size, height: size, borderRadius: size * 0.28, background: grad("#E08A66", "#C5603C"), boxShadow: `${SH}, 0 0 ${Math.round(size * 0.34)}px rgba(210,114,78,${glow})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
    <svg viewBox="0 0 24 24" width={size * 0.58} height={size * 0.58}><path fill="#F6EFE6" d={CLAUDE_PATH} /></svg><Sheen r={size * 0.28} />
  </div>);
const Background: React.FC = () => { const f = useCurrentFrame(); const d = Math.sin(f / 100) * 5;
  return (<AbsoluteFill style={{ background: "radial-gradient(120% 90% at 50% 8%, #F3F1EB 0%, #ECE9E2 46%, #E4E0D6 100%)" }}>
    <div style={{ position: "absolute", inset: -40, opacity: 0.5, backgroundImage: "linear-gradient(rgba(58,92,132,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(58,92,132,0.05) 1px, transparent 1px)", backgroundSize: "62px 62px", transform: `translateY(${d}px)` }} />
  </AbsoluteFill>); };
const Browser: React.FC<{ w: number; h: number; url: string; children: React.ReactNode; glow?: number }> = ({ w, h, url, children, glow = 0 }) => (
  <div style={{ width: w, height: h, borderRadius: 20, background: "#fff", boxShadow: `${IMSH}${glow > 0 ? `, 0 0 ${glow * 34}px rgba(58,92,132,${glow * 0.5})` : ""}`, overflow: "hidden", position: "relative" }}>
    <div style={{ height: 44, background: grad("#F4F3EF", "#E9E7E0"), display: "flex", alignItems: "center", padding: "0 16px", gap: 7, borderBottom: "1px solid rgba(40,32,20,0.08)" }}>
      {["#E5816B", "#E7B14C", "#5DAE6E"].map((c, i) => <div key={i} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />)}
      <div style={{ flex: 1, marginLeft: 10, height: 27, borderRadius: 7, background: "#fff", border: "1px solid rgba(40,32,20,0.1)", display: "flex", alignItems: "center", padding: "0 13px", fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 17, color: MUTE }}>🔒 {url}</div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 44, bottom: 0 }}>{children}</div>
    <Sheen r={20} o={0.16} />
  </div>);
const Img2: React.FC<{ src: string; style?: React.CSSProperties }> = ({ src, style }) => (<Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block", ...style }} />);
const GoogleMark: React.FC<{ size: number }> = ({ size }) => (
  <span style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: size, letterSpacing: "-0.01em" }}>
    <span style={{ color: GBLUE }}>G</span><span style={{ color: GRED }}>o</span><span style={{ color: GYEL }}>o</span><span style={{ color: GBLUE }}>g</span><span style={{ color: GGREEN }}>l</span><span style={{ color: GRED }}>e</span>
  </span>);

// ===== HOOK-HEADER — on-brand (no clashing blue) =====
const HeroHeader: React.FC = () => { const f = useCurrentFrame(); const out = eOut(f, fr(L[1]) - 7, 7);
  return (<div style={{ position: "absolute", top: 250, left: 64, right: 64, opacity: 1 - out, transform: `translateY(${-out * 12}px)`, zIndex: 60 }}>
    <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 28, letterSpacing: "0.06em", color: MUTE, marginBottom: 10, textTransform: "uppercase" }}>Claude can now</div>
    <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 92, lineHeight: 0.96, letterSpacing: "-0.035em", color: INK, textShadow: "0 2px 18px rgba(236,233,226,0.96)" }}>
      <div><span style={{ color: CLAY }}>Steal</span> your rival's</div>
      <div>Google traffic.</div>
    </div></div>); };

const Scene: React.FC<{ s: number; e: number; children: React.ReactNode }> = ({ s, e, children }) => {
  const frame = useCurrentFrame(); const local = frame - fr(s); const lenF = fr(e - s); if (local < 0 || local > lenF) return null;
  const inF = s <= 0 ? 1 : eOut(frame, fr(s), 5); const op = Math.min(inF, 1 - eOut(frame, fr(e - 0.16), 6)); const inE = eOut(frame, fr(s), 12);
  return <AbsoluteFill style={{ opacity: op, transform: `scale(${0.99 + inE * 0.01})` }}>{children}</AbsoluteFill>; };

// ===== S0 — real Google SERP: rival ranks #1 with a real site preview + climbing traffic, you buried =====
const SerpHook: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s);
  const visits = Math.round(ramp(lf, 6, 70) * 48200); const steal = ramp(lf, 66, 100); const pulse = Math.max(0, Math.sin(lf / 7));
  return (<AbsoluteFill>
    <Bloom cx={CX} cy={920} w={1000} color="rgba(58,92,132,0.18)" lf={lf} base={0.4 + steal * 0.18} />
    <div style={{ position: "absolute", left: CX - 432, top: 552, width: 864 }}>
      <Browser w={864} h={628} url="google.com/search?q=best project tool" glow={0.3 + steal * 0.5}>
        <div style={{ padding: "24px 30px 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
            <GoogleMark size={32} />
            <div style={{ flex: 1, height: 44, borderRadius: 999, background: "#F4F3EF", border: "1px solid rgba(40,32,20,0.1)", display: "flex", alignItems: "center", padding: "0 20px", fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 22, color: INK }}>best project management tool<span style={{ marginLeft: "auto", color: GBLUE }}>🔍</span></div>
          </div>
          {/* rival #1 — rich result with REAL site preview + traffic */}
          <div style={{ position: "relative", display: "flex", gap: 18, padding: "14px 16px", borderRadius: 14, background: `rgba(58,111,216,${0.05 + pulse * 0.03})`, boxShadow: `inset 0 0 0 ${1.5 + steal * 1.5}px rgba(58,111,216,${0.28 + steal * 0.4})`, marginBottom: 16 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 5 }}>
                <div style={{ width: 26, height: 26, borderRadius: "50%", background: grad("#8A5BD8", "#6B3FC0"), display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 15 }}>R</div>
                <span style={{ fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 19, color: "#4A4A44" }}>rivalsite.com</span>
                <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 7, padding: "5px 13px", borderRadius: 999, background: grad("#3F9E74", "#2F7E5C"), color: "#fff", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 19, boxShadow: "0 4px 12px rgba(40,32,20,0.2)" }}>↑ {fmtN(visits)}<span style={{ opacity: 0.8, fontSize: 14 }}>/mo</span></span>
              </div>
              <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 29, color: GBLUE, lineHeight: 1.1 }}>The 11 Best Project Tools (2026)</div>
              <div style={{ fontFamily: inter.fontFamily, fontWeight: 500, fontSize: 17, color: "#5A5A52", marginTop: 5 }}>Ranked &amp; tested — the top project management tools this year…</div>
            </div>
            <div style={{ width: 168, height: 116, borderRadius: 11, overflow: "hidden", flexShrink: 0, boxShadow: "0 4px 12px rgba(40,32,20,0.2)" }}><Img2 src={RIVAL} /></div>
          </div>
          {[{ s: "another-rival.com", t: "Top Project Management Software" }, { s: "review-blog.com", t: "We Tested 30 PM Tools — Here's…" }].map((r, i) => { const dim = 1 - steal * 0.45;
            return (<div key={i} style={{ marginBottom: 14, opacity: over(f, fr(s) + 10 + i * 5, 12) * dim }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}><div style={{ width: 22, height: 22, borderRadius: "50%", background: grad("#5C7CA8", "#3A5C84") }} /><span style={{ fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 17, color: "#6A6A62" }}>{r.s}</span></div>
              <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 23, color: "#5570B8" }}>{r.t}</div></div>); })}
          <div style={{ marginTop: 6, padding: "11px 16px", borderRadius: 11, background: "rgba(196,74,58,0.08)", display: "flex", alignItems: "center", gap: 10, opacity: over(f, fr(s) + 26, 12) }}>
            <span style={{ padding: "3px 11px", borderRadius: 999, background: RED, color: "#fff", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 17 }}>you</span>
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 19, color: MUTE }}>yoursite.com · buried on page 4</span>
            <span style={{ marginLeft: "auto", fontSize: 24 }}>😞</span>
          </div>
        </div>
      </Browser>
    </div>
    {steal > 0.02 && <div style={{ position: "absolute", left: CX - 54, top: 1126, transform: `scale(${0.6 + steal * 0.4})`, opacity: steal, zIndex: 20 }}>
      <div style={{ position: "relative" }}><ClaudeMark size={108} glow={0.5 + pulse * 0.3} />
        <div style={{ position: "absolute", left: "50%", top: -32, transform: "translateX(-50%)", padding: "5px 16px", borderRadius: 999, background: grad(CLAY, "#A8392B"), color: "#fff", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 23, whiteSpace: "nowrap", boxShadow: "0 7px 20px rgba(40,32,20,0.34)", border: "2px solid rgba(255,255,255,0.5)" }}>↩ stealing it</div>
      </div></div>}
  </AbsoluteFill>); };

// ===== S1 — rival site ranks #1; pull their keywords + write content to outrank; replace $3k agency =====
const FindScene: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s);
  const kws = [{ k: "project management tool", v: "18,100" }, { k: "asana alternative", v: "9,300" }, { k: "free task tracker", v: "6,800" }, { k: "best pm software", v: "12,400" }];
  const rep = ramp(lf, 150, 200);
  return (<AbsoluteFill>
    <Bloom cx={CX} cy={900} w={980} color="rgba(63,158,116,0.15)" lf={lf} />
    {/* rival site ranking #1 (real screenshot) */}
    <div style={{ position: "absolute", left: 74, top: 580, width: 392, transform: `translateY(${(1 - over(f, fr(s) + 4, 12)) * 24}px)`, opacity: over(f, fr(s) + 4, 12) }}>
      <Browser w={392} h={300} url="rivalsite.com" glow={0.2}><Img2 src={RIVAL} /></Browser>
      <div style={{ position: "absolute", left: 14, top: -14, padding: "6px 15px", borderRadius: 999, background: grad("#3F9E74", "#2F7E5C"), color: "#fff", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 20, boxShadow: IMSH }}>🏆 ranks #1</div>
    </div>
    {/* their keywords pulled out */}
    <div style={{ position: "absolute", left: 74, top: 906, width: 392 }}>
      {kws.map((k, i) => { const e = over(f, fr(s) + 24 + i * 9, 12);
        return (<div key={i} style={{ display: "flex", alignItems: "center", gap: 11, padding: "12px 17px", borderRadius: 13, background: grad("#FBF7EF", "#EFEADF"), boxShadow: CARDSH, marginBottom: 11, opacity: e, transform: `translateX(${(1 - e) * -22}px)` }}>
          <span style={{ fontSize: 19 }}>🔑</span><span style={{ flex: 1, fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 22, color: INK }}>{k.k}</span><span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 21, color: GREEN }}>{k.v}</span>
        </div>); })}
    </div>
    {/* claude writes content to outrank */}
    <div style={{ position: "absolute", left: 506, top: 580, width: 478 }}>
      <Browser w={478} h={486} url="claude · drafting to outrank">
        <div style={{ padding: "24px 28px" }}>
          <div style={{ width: `${ramp(lf, 24, 64) * 88}%`, height: 28, borderRadius: 8, background: grad(GBLUE, SLATE2), marginBottom: 18 }} />
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => { const isH = i === 2 || i === 5; const e = ramp(lf, 36 + i * 7, 56 + i * 7);
            return <div key={i} style={{ width: `${(isH ? 52 : [98, 90, 0, 94, 82, 0, 96, 74][i]) * e}%`, height: isH ? 18 : 13, borderRadius: 5, background: isH ? grad("#3A5C84", "#5C7CA8") : "rgba(40,32,20,0.14)", marginBottom: isH ? 16 : 12, marginTop: isH ? 8 : 0 }} />; })}
          <div style={{ marginTop: 10, height: 42, borderRadius: 9, background: `rgba(63,158,116,${ramp(lf, 100, 124) * 0.16})`, border: `1.5px solid rgba(63,158,116,${ramp(lf, 100, 124) * 0.5})`, display: "flex", alignItems: "center", padding: "0 16px", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 19, color: GREEN, opacity: ramp(lf, 100, 124) }}>✓ built to outrank them</div>
        </div>
      </Browser>
    </div>
    {/* $3k agency replaced */}
    {rep > 0.02 && <div style={{ position: "absolute", left: CX - 230, top: 1108, width: 460, transform: `scale(${0.85 + rep * 0.15})`, opacity: rep, zIndex: 20 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 18, padding: "16px 28px", borderRadius: 18, background: "#fff", boxShadow: IMSH }}>
        <div style={{ position: "relative", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 40, color: MUTE }}>$3,000<span style={{ fontSize: 22 }}>/mo</span><div style={{ position: "absolute", left: -6, right: -6, top: "52%", height: 4, background: RED, transform: `scaleX(${rep})`, transformOrigin: "left" }} /></div>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 28, color: MUTE }}>→</span>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}><ClaudeMark size={50} glow={0.4} /><span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 34, color: CLAY }}>$0</span></div>
      </div>
      <div style={{ textAlign: "center", marginTop: 12, fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 600, fontSize: 25, color: MUTE }}>what an SEO agency charges to do this</div>
    </div>}
  </AbsoluteFill>); };

// ===== S2 — drop in your site + a rival (real screenshots) → find the gap =====
const SetupScene: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s);
  const scan = ramp(lf, 22, 58);
  const sites = [{ n: "yoursite.com", src: YOURS, you: true }, { n: "rivalsite.com", src: RIVAL }];
  return (<AbsoluteFill>
    <Bloom cx={CX} cy={880} w={920} color="rgba(58,92,132,0.16)" lf={lf} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 660, display: "flex", justifyContent: "center", gap: 44 }}>
      {sites.map((st, i) => { const e = over(f, fr(s) + 4 + i * 8, 13);
        return (<div key={i} style={{ width: 360, opacity: e, transform: `translateY(${(1 - e) * 26}px) scale(${0.92 + Math.min(e, 1) * 0.08})` }}>
          <Browser w={360} h={262} url={st.n} glow={st.you ? 0.2 : 0}><Img2 src={st.src} /></Browser>
          <div style={{ textAlign: "center", marginTop: 12, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 24, color: st.you ? CLAY : SLATE }}>{st.you ? "you" : "your rival"}</div>
        </div>); })}
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1058, display: "flex", justifyContent: "center", opacity: scan }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 32px", borderRadius: 999, background: grad("#26221C", "#15120E"), boxShadow: SH, transform: `scale(${0.9 + scan * 0.1})` }}>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 26, color: "#9FC0E8" }}>{">"}</span>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 30, color: "#F4EFE6" }}>find the gap</span>
        <span style={{ width: 12, height: 28, background: "#F6CDA0", opacity: Math.floor(lf / 8) % 2, marginLeft: 2 }} />
      </div>
    </div>
  </AbsoluteFill>); };

// ===== S3 — keyword opportunity BAR CHART (bars sized by traffic, color = difficulty) =====
const GapScene: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s);
  const rows = [
    { k: "free task tracker", v: 6800, kd: 8 }, { k: "asana alternative", v: 9300, kd: 14 },
    { k: "trello vs notion", v: 4200, kd: 11 }, { k: "project planning template", v: 5100, kd: 19 },
    { k: "best pm software", v: 12400, kd: 38 }, { k: "project management tool", v: 18100, kd: 64 },
  ];
  const maxV = 18100; const kdc = (kd: number) => kd < 20 ? GREEN : kd < 45 ? AMBER : RED;
  const cnt = Math.round(ramp(lf, 8, 66) * 47);
  return (<AbsoluteFill>
    <Bloom cx={CX} cy={940} w={980} color="rgba(63,158,116,0.16)" lf={lf} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 584, textAlign: "center" }}>
      <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 104, color: GREEN, lineHeight: 0.95 }}>{cnt}</span>
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 31, color: INK, marginTop: 2 }}>keywords you're missing</div>
    </div>
    <div style={{ position: "absolute", left: 92, right: 92, top: 768 }}>
      {rows.map((r, i) => { const e = over(f, fr(s) + 12 + i * 8, 11); const grow = ramp(lf, 16 + i * 6, 52 + i * 6); const win = r.kd < 20; const hl = win ? ramp(lf, 92, 118) : 0;
        const bw = Math.max((r.v / maxV) * grow * 100, 5); const c = kdc(r.kd);
        return (<div key={i} style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 17, opacity: e, transform: `translateX(${(1 - e) * -22}px)` }}>
          <span style={{ width: 236, fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 22, color: INK, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", textAlign: "right" }}>{r.k}</span>
          <div style={{ flex: 1, height: 48, borderRadius: 13, background: "rgba(40,32,20,0.06)", position: "relative" }}>
            <div style={{ height: "100%", width: `${bw}%`, borderRadius: 13, background: grad(c, c + "cc"), boxShadow: `${IMSH}${win ? `, 0 0 ${hl * 24}px ${c}` : ""}`, display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 15 }}>
              <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 23, color: "#fff" }}>{fmtN(r.v * grow)}</span>
            </div>
          </div>
          {win ? <span style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 12px", borderRadius: 999, background: grad(GREEN, "#2F7E5C"), color: "#fff", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 17, transform: `scale(${0.5 + hl * 0.5})`, opacity: hl, whiteSpace: "nowrap", boxShadow: "0 4px 12px rgba(40,32,20,0.25)" }}>✓ easy win</span> : <span style={{ width: 96, textAlign: "left", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 17, color: c, opacity: 0.7 }}>KD {r.kd}</span>}
        </div>); })}
    </div>
  </AbsoluteFill>); };

// ===== S4 — the win: traffic graph SHOOTS UP + you rank #1 (visual payoff) =====
const ArticleScene: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s);
  const W = 660, H = 300; const rev = ramp(lf, 26, 150); const yAt = (p: number) => H - (H - 16) * Math.pow(p, 1.7);
  const pts = Array.from({ length: 13 }, (_, i) => ({ x: (i / 12) * W, y: yAt(i / 12) }));
  const line = "M " + pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" L ");
  const area = line + ` L ${W},${H} L 0,${H} Z`; const dx = rev * W, dy = yAt(rev);
  const traffic = Math.round(ramp(lf, 26, 150) * 58420); const rankR = ramp(lf, 120, 160); const pulse = Math.max(0, Math.sin(lf / 8));
  const chips = ["title", "headings", "meta", "schema"];
  return (<AbsoluteFill>
    <Bloom cx={CX} cy={900} w={1000} color="rgba(63,158,116,0.16)" lf={lf} base={0.42 + rankR * 0.18} />
    <div style={{ position: "absolute", left: CX - 396, top: 580, width: 792 }}>
      <Browser w={792} h={470} url="search console · organic traffic" glow={0.25 + rankR * 0.4}>
        <div style={{ padding: "22px 30px 0", position: "relative" }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 14 }}>
            <div><div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 20, color: MUTE }}>Organic traffic</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}><span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 64, color: INK, lineHeight: 1 }}>{fmtN(traffic)}</span><span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 26, color: GREEN }}>↑ 312%</span></div></div>
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 9, padding: "8px 18px", borderRadius: 999, background: grad("#FBF7EF", "#EFEADF"), boxShadow: CARDSH, opacity: rankR, transform: `scale(${0.7 + rankR * 0.3})` }}>
              <span style={{ width: 34, height: 34, borderRadius: "50%", background: grad(GREEN, "#2F7E5C"), display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 19 }}>#1</span>
              <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 22, color: INK }}>on Google</span></div>
          </div>
          <svg width={W} height={H} style={{ marginTop: 12, overflow: "visible" }}>
            <defs><linearGradient id="tgrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={GREEN} stopOpacity="0.42" /><stop offset="1" stopColor={GREEN} stopOpacity="0" /></linearGradient>
              <clipPath id="trev"><rect x="0" y="-30" width={dx} height={H + 30} /></clipPath></defs>
            {[0.25, 0.5, 0.75].map((g, i) => <line key={i} x1="0" y1={H * g} x2={W} y2={H * g} stroke="rgba(40,32,20,0.06)" strokeWidth={1.5} />)}
            <g clipPath="url(#trev)"><path d={area} fill="url(#tgrad)" /><path d={line} fill="none" stroke={GREEN} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" /></g>
            <circle cx={dx} cy={dy} r={9} fill={GREEN} stroke="#fff" strokeWidth={3} style={{ filter: `drop-shadow(0 0 ${6 + pulse * 6}px ${GREEN})` }} />
          </svg>
        </div>
      </Browser>
    </div>
    {/* SEO ✓ chips (visual, minimal text) */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 1078, display: "flex", justifyContent: "center", gap: 14 }}>
      {chips.map((c, i) => { const e = over(f, fr(s) + 30 + i * 9, 11);
        return (<div key={i} style={{ display: "flex", alignItems: "center", gap: 9, padding: "11px 20px", borderRadius: 999, background: "#fff", boxShadow: CARDSH, opacity: e, transform: `scale(${0.8 + Math.min(e, 1) * 0.2})` }}>
          <div style={{ width: 26, height: 26, borderRadius: "50%", background: grad(GREEN, "#2F7E5C"), display: "flex", alignItems: "center", justifyContent: "center" }}><svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round"><path d="M4 12 L10 18 L20 6" /></svg></div>
          <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 23, color: INK }}>{c}</span></div>); })}
    </div>
  </AbsoluteFill>); };

// ===== S5 — no agency / no degree → one chat (icon-driven) =====
const CloseScene: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s);
  const items = [{ ic: "💸", t: "$3k/mo agency", at: 3 }, { ic: "🎓", t: "SEO degree", at: 11 }];
  const pulse = Math.max(0, Math.sin(lf / 8));
  return (<AbsoluteFill>
    <Bloom cx={CX} cy={920} w={920} color="rgba(210,114,78,0.16)" lf={lf} base={0.45 + pulse * 0.08} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 716, display: "flex", justifyContent: "center", gap: 32 }}>
      {items.map((it, i) => { const e = over(f, fr(s) + it.at, 11);
        return (<div key={i} style={{ position: "relative", width: 320, display: "flex", flexDirection: "column", alignItems: "center", gap: 12, padding: "26px 18px", borderRadius: 22, background: "#fff", boxShadow: CARDSH, opacity: e * (1 - over(f, fr(s) + it.at + 6, 14) * 0.32), transform: `scale(${0.86 + Math.min(e, 1) * 0.14})` }}>
          <div style={{ fontSize: 64, filter: "grayscale(0.3)" }}>{it.ic}</div>
          <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 800, fontSize: 32, color: MUTE, textAlign: "center" }}>{it.t}</span>
          <div style={{ position: "absolute", left: 22, right: 22, top: "50%", height: 6, borderRadius: 3, background: RED, transform: `scaleX(${over(f, fr(s) + it.at + 4, 12)}) rotate(-8deg)`, transformOrigin: "left", boxShadow: "0 2px 6px rgba(196,74,58,0.4)" }} />
        </div>); })}
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1006, display: "flex", justifyContent: "center", opacity: over(f, fr(s) + 24, 12) }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18, padding: "20px 40px", borderRadius: 22, background: grad("#FBF7EF", "#F1E9DA"), boxShadow: `${SH}, 0 0 ${40 + pulse * 18}px rgba(210,114,78,0.4)`, border: `2.5px solid ${CLAY}`, transform: `scale(${(0.86 + over(f, fr(s) + 24, 12) * 0.14) * (1 + pulse * 0.015)})` }}>
        <ClaudeMark size={68} glow={0.5 + pulse * 0.3} /><span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 56, color: INK }}>one chat.</span>
      </div>
    </div>
  </AbsoluteFill>); };

// ===== CTA =====
const CTA: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const local = f - fr(s); if (local < 0) return null; const a = eOut(f, fr(s) + 2, 12); const pulse = 1 + Math.sin(f / 7) * 0.03;
  return (<AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
    {Array.from({ length: 12 }, (_, i) => { const p = eOut(f, fr(s) + 4 + i, 26); const ang = (i / 12) * Math.PI * 2; if (p <= 0 || p >= 1) return null; return <div key={i} style={{ position: "absolute", left: 540 + Math.cos(ang) * p * 340, top: 900 + Math.sin(ang) * p * 340, fontSize: 26, opacity: Math.sin(p * Math.PI), color: [SLATE, CLAY, GREEN, AMBER][i % 4] }}>✦</div>; })}
    <div style={{ marginTop: -150, transform: `scale(${0.7 + a * 0.3})`, opacity: a }}><ClaudeMark size={168} glow={0.5 + Math.sin(local / 9) * 0.12} /></div>
    <div style={{ marginTop: 46, transform: `scale(${pulse})`, padding: "28px 56px", borderRadius: 999, background: GBLUE, color: "#fff", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 66, boxShadow: "0 24px 54px rgba(58,111,216,0.42)", opacity: a }}>💬 Comment "SEO"</div>
    <div style={{ marginTop: 28, fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 600, fontSize: 42, color: INK, opacity: a, textAlign: "center" }}>and I'll send you the exact setup</div>
  </AbsoluteFill>); };

// ===== Captions =====
type Word = { word: string; start: number; end: number; line: number };
const WORDS = wordsData as Word[];
const cleanw = (w: string) => w.toLowerCase().replace(/[^a-z0-9'$]/g, "");
const EMPH = new Set(["claude", "steal", "google", "traffic", "keywords", "outrank", "agencies", "grand", "minutes", "ranked", "win", "articles", "schema", "rank", "agency", "seo", "comment", "free", "gap", "rival"]);
const CHUNKS = (() => { const byLine: Record<number, Word[]> = {}; for (const w of WORDS) (byLine[w.line] ||= []).push(w);
  const out: { words: Word[]; start: number; line: number }[] = [];
  for (const li of Object.keys(byLine).map(Number).sort((a, b) => a - b)) { const ws = byLine[li]; for (let i = 0; i < ws.length; i += 3) { const g = ws.slice(i, i + 3); out.push({ words: g, start: g[0].start, line: li }); } }
  const aE = Math.max(...WORDS.map((w) => w.end)); return out.map((c, i) => ({ ...c, end: i + 1 < out.length ? out[i + 1].start : aE + 0.4 })); })();
const Captions: React.FC = () => { const frame = useCurrentFrame();
  return (<>{CHUNKS.map((c, i) => { if (frame < fr(c.start) || frame >= fr(c.end)) return null; if (c.line === 6) return null;
    return (<div key={i} style={{ position: "absolute", top: 1268, left: 64, right: 64, height: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "center", gap: "0 16px", width: 952, textAlign: "center" }}>
        {c.words.map((w, j) => { const g = EMPH.has(cleanw(w.word)); const shown = frame >= fr(w.start);
          return <span key={j} style={{ display: "inline-block", opacity: shown ? 1 : 0, fontFamily: g ? frauncesItalic.fontFamily : fraunces.fontFamily, fontStyle: g ? "italic" : "normal", fontWeight: g ? 700 : 600, fontSize: g ? 84 : 72, lineHeight: 1.04, color: g ? SLATE : INK, letterSpacing: "-0.02em", textShadow: "0 2px 16px rgba(236,233,226,0.95)" }}>{w.word}</span>; })}
      </div></div>); })}</>); };

const L = [0, 3.48, 10.94, 14.08, 21.25, 29.15, 30.98];
const Sfx: React.FC<{ at: number; src: string; v?: number }> = ({ at, src, v = 0.3 }) => (<Sequence from={fr(at)} durationInFrames={fr(2.5)}><Audio src={staticFile(`sfx/${src}`)} volume={v} /></Sequence>);

export const ClaudeSeoReel: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 16, 28], [1.0, 1.05, 1.0], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  return (<AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
    <Audio src={staticFile("vo_seo.wav")} />
    <Audio loop src={staticFile("seo_music.wav")} volume={(ff) => interpolate(ff, [0, fr(0.9), fr(L[6]) - 10, fr(L[6]) + 16, 99999], [0, 0.2, 0.2, 0.15, 0.15], { extrapolateRight: "clamp" })} />
    {/* opening — build retention hard */}
    <Sfx at={0} src="riser.wav" v={0.36} /><Sfx at={0} src="sub.wav" v={0.3} />
    <Sfx at={0.32} src="boom.wav" v={0.36} /><Sfx at={0.32} src="shimmer.wav" v={0.3} /><Sfx at={0.32} src="whoosh.wav" v={0.22} />
    <Sfx at={1.3} src="data.wav" v={0.2} /><Sfx at={2.6} src="swooshup.wav" v={0.26} />
    {/* scene transitions */}
    {L.slice(1).map((t, i) => <React.Fragment key={i}><Sfx at={t - 0.1} src="swish.wav" v={0.22} /><Sfx at={t + 0.5} src="pop.wav" v={0.2} /></React.Fragment>)}
    {/* beat accents — $3k drop, chart build, easy-win, traffic up, rank #1 */}
    <Sfx at={9.0} src="ding.wav" v={0.3} /><Sfx at={14.5} src="data.wav" v={0.2} /><Sfx at={16.8} src="chimehi.wav" v={0.26} />
    <Sfx at={22.0} src="swooshup.wav" v={0.24} /><Sfx at={25.6} src="ding.wav" v={0.3} />
    {/* CTA */}
    <Sfx at={L[6]} src="resolve.wav" v={0.34} /><Sfx at={L[6] + 0.2} src="angelic.wav" v={0.2} /><Sfx at={L[6] + 0.4} src="sparkle.wav" v={0.3} />
    <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "50% 46%" }}>
      <Background />
      <Scene s={L[0]} e={L[1]}><SerpHook s={L[0]} /></Scene>
      <Scene s={L[1]} e={L[2]}><FindScene s={L[1]} /></Scene>
      <Scene s={L[2]} e={L[3]}><SetupScene s={L[2]} /></Scene>
      <Scene s={L[3]} e={L[4]}><GapScene s={L[3]} /></Scene>
      <Scene s={L[4]} e={L[5]}><ArticleScene s={L[4]} /></Scene>
      <Scene s={L[5]} e={L[6]}><CloseScene s={L[5]} /></Scene>
      <CTA s={L[6]} />
      <HeroHeader />
      <Captions />
    </AbsoluteFill>
  </AbsoluteFill>); };
