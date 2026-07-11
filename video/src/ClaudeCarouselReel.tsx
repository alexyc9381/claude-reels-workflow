import React from "react";
import { AbsoluteFill, Audio, Easing, Img, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { fraunces, frauncesItalic, inter } from "./fonts";
import wordsData from "./data/words_carousel.json";

/**
 * ClaudeCarouselReel — "This carousel looks like a $500 designer made it… with one Claude prompt."
 * Demonstrate-it-live workflow reel. VISUAL-HEAVY: premium carousel hook → brand kit → live 6-card
 * build → comment-to-refine → export to IG → payoff → CTA. Greg-Isenberg editorial style.
 */
const CREAM = "#ECE9E2", INK = "#1A1813", SLATE = "#3A5C84", SLATE2 = "#5C7CA8", CLAY = "#D2724E", AMBER = "#CF9544", GREEN = "#3F9E74", MUTE = "#9A968B", GOLD = "#FFE0A0", BUFF = "#C9B89A", PAPER = "#FBF7EF";
const FPS = 30; const fr = (s: number) => s * FPS;
const eOut = (f: number, sF: number, d = 10) => interpolate(f, [sF, sF + d], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
const ramp = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const over = (f: number, sF: number, d = 12) => interpolate(f, [sF, sF + d * 0.55, sF + d], [0, 1.14, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
const frac = (x: number) => x - Math.floor(x); const rnd = (i: number, s = 0) => frac(Math.sin(i * 12.9898 + s * 78.233) * 43758.5453);
const CLAUDE_PATH = "m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z";

const L = [0.0, 6.75, 11.78, 22.5, 26.0, 29.55, 34.07];
const VEND = 37.6;

type Word = { word: string; start: number; end: number; line: number };
const WORDS = wordsData as Word[];
const cleanw = (w: string) => w.toLowerCase().replace(/[^a-z']/g, "");
const EMPH = new Set(["500", "designer", "prompt", "brand", "live", "hook", "comment", "instagram", "minutes", "carousel", "template", "free", "once", "exact"]);

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
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "center", gap: "0 15px", width: 960, textAlign: "center" }}>
        {c.words.map((w, j) => { const g = EMPH.has(cleanw(w.word)); const shown = frame >= fr(w.start);
          return <span key={j} style={{ display: "inline-block", opacity: shown ? 1 : 0, fontFamily: g ? frauncesItalic.fontFamily : fraunces.fontFamily, fontStyle: g ? "italic" : "normal", fontWeight: g ? 700 : 600, fontSize: g ? 78 : 68, lineHeight: 1.05, color: g ? SLATE : INK, letterSpacing: "-0.02em", textShadow: "0 2px 16px rgba(236,233,226,0.95)" }}>{w.word}</span>; })}
      </div></div>); })}</>);
};

const Scene: React.FC<{ s: number; e: number; children: React.ReactNode }> = ({ s, e, children }) => {
  const frame = useCurrentFrame(); const local = frame - fr(s); const lenF = fr(e - s);
  if (local < 0 || local > lenF) return null;
  const op = Math.min(eOut(frame, fr(s), 4), 1 - eOut(frame, fr(e - 0.14), 5)); const inE = eOut(frame, fr(s), 12);
  return <AbsoluteFill style={{ opacity: op, transform: `scale(${0.98 + inE * 0.02})` }}>{children}</AbsoluteFill>;
};

const ClaudeMark: React.FC<{ size: number }> = ({ size }) => (
  <div style={{ width: size, height: size, borderRadius: size * 0.24, background: "linear-gradient(155deg,#E08A66,#C5603C)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 14px 30px rgba(197,96,60,0.3)" }}>
    <svg viewBox="0 0 24 24" width={size * 0.6} height={size * 0.6}><path fill="#F6EFE6" d={CLAUDE_PATH} /></svg>
  </div>
);
const Cursor: React.FC<{ x: number; y: number; o?: number }> = ({ x, y, o = 1 }) => (
  <svg width={30} height={36} viewBox="0 0 30 36" style={{ position: "absolute", left: x, top: y, opacity: o, filter: "drop-shadow(0 3px 5px rgba(0,0,0,0.3))", zIndex: 30 }}>
    <path d="M2 2 L2 27 L9 21 L14 32 L19 30 L14 19 L23 19 Z" fill="#1A1813" stroke="#fff" strokeWidth={1.6} strokeLinejoin="round" />
  </svg>
);
const Header: React.FC<{ n: number; s: number; text: string }> = ({ n, s, text }) => {
  const f = useCurrentFrame(); const e = eOut(f, fr(s) + 1, 8);
  return (
    <div style={{ position: "absolute", top: 372, left: 0, right: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 18, opacity: e }}>
      <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 76, height: 76, borderRadius: "50%", background: "linear-gradient(150deg,#E08A66,#C5603C)", color: "#fff", fontFamily: fraunces.fontFamily, fontWeight: 800, fontSize: 42, boxShadow: "0 14px 28px rgba(197,96,60,0.32)", transform: `scale(${0.5 + e * 0.5})` }}>{n}</span>
      <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 42, letterSpacing: "0.01em", color: INK, textTransform: "uppercase" }}>{text}</span>
    </div>
  );
};
const Stage: React.FC<{ children: React.ReactNode }> = ({ children }) => (<div style={{ position: "absolute", top: 540, left: 0, right: 0, height: 560, display: "flex", alignItems: "center", justifyContent: "center" }}>{children}</div>);

// ===== Carousel slide (reusable) =====
const Slide: React.FC<{ w: number; h: number; accent: string; label?: string; num?: number; fill?: number; brand?: boolean; logo?: boolean; glow?: number }>
  = ({ w, h, accent, label, num, fill = 1, brand = true, logo = false, glow = 0 }) => {
    const headH = h * 0.42;
    return (
      <div style={{ width: w, height: h, borderRadius: 14, background: PAPER, boxShadow: `0 10px 26px rgba(40,32,20,0.18)${glow > 0 ? `, 0 0 ${glow * 26}px rgba(210,114,78,${glow * 0.7})` : ""}`, overflow: "hidden", position: "relative", flexShrink: 0, border: "1px solid rgba(40,32,20,0.05)" }}>
        {/* header / image band */}
        <div style={{ height: headH, background: `linear-gradient(150deg,${accent},${accent}cc)`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
          {brand && logo && <div style={{ position: "absolute", top: 8, left: 8, width: 16, height: 16, borderRadius: 4, background: "rgba(255,255,255,0.92)" }} />}
          {label && <span style={{ color: "#fff", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: w * 0.13, letterSpacing: "0.04em", opacity: fill }}>{label}</span>}
          {num !== undefined && <div style={{ width: w * 0.26, height: w * 0.26, borderRadius: "50%", background: "rgba(255,255,255,0.92)", color: accent, fontFamily: fraunces.fontFamily, fontWeight: 800, fontSize: w * 0.16, display: "flex", alignItems: "center", justifyContent: "center", opacity: fill }}>{num}</div>}
        </div>
        {/* body text lines */}
        <div style={{ padding: w * 0.08, display: "flex", flexDirection: "column", gap: h * 0.05 }}>
          {[0.92, 0.72, 0.5].map((wd, i) => { const lf = Math.max(0, Math.min(1, fill * 3 - i)); return <div key={i} style={{ width: `${wd * 100}%`, height: 6, borderRadius: 3, background: i === 0 ? INK : "rgba(40,32,20,0.22)", opacity: lf, transform: `scaleX(${lf})`, transformOrigin: "left" }} />; })}
        </div>
        {brand && logo && <div style={{ position: "absolute", bottom: 8, right: 8, width: 14, height: 14, borderRadius: "50%", background: accent }} />}
      </div>
    );
  };

// real carousel screenshot (user's actual Claude-made carousels)
const RealSlide: React.FC<{ src: string; w: number; h: number; glow?: number }> = ({ src, w, h, glow = 0 }) => (
  <div style={{ width: w, height: h, borderRadius: 12, overflow: "hidden", background: "#fff", boxShadow: `0 12px 28px rgba(40,32,20,0.24)${glow > 0 ? `, 0 0 ${glow * 28}px rgba(210,114,78,${glow * 0.7})` : ""}`, border: "1px solid rgba(40,32,20,0.06)", flexShrink: 0 }}>
    <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
  </div>
);

// ===== SCENE 0 — HOOK: premium carousel + $500 → 1 prompt =====
const Hook: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const lf = f - fr(s);
  // BEAT A — fanned $500 carousel  |  BEAT B — one Claude prompt → carousel
  const fanB = over(f, fr(s) + 0, 9), fanA = over(f, fr(s) + 3, 10), fanC = over(f, fr(s) + 5, 10);  // center hero lands first, on frame 1
  const tag = over(f, fr(s) + 6, 11);
  const burst = ramp(lf, 0, 22);
  const phase = ramp(lf, 100, 116);              // A -> B transition at ~3.4s
  const aOut = 1 - phase;
  const cross = ramp(lf, 86, 100);               // $500 crosses out just before the swap
  // beat B
  const promptIn = eOut(f, fr(s) + 108, 13);
  const arrowT = ramp(lf, 126, 144);
  const stackIn = eOut(f, fr(s) + 122, 16);
  const badge = over(f, fr(s) + 148, 12);
  const floatB = Math.sin(lf / 18) * 5;
  const cards = [
    { rot: -12, x: -248, fan: fanA, z: 1, src: "refs/c2_2.png" },
    { rot: 12, x: 248, fan: fanC, z: 2, src: "refs/c1_3.png" },
    { rot: 0, x: 0, fan: fanB, z: 3, src: "refs/c1_1.png" },
  ];
  const bCards = [{ rot: -9, dx: -190, src: "refs/c2_3.png" }, { rot: 9, dx: 190, src: "refs/c1_2.png" }, { rot: 0, dx: 0, src: "refs/c2_1.png" }];
  return (
    <Stage>
      <div style={{ position: "relative", width: 760, height: 480, transform: "translateY(6px)" }}>
        <div style={{ position: "absolute", left: "50%", top: "42%", width: 520, height: 520, marginLeft: -260, marginTop: -260, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,224,150,0.55) 0%, rgba(255,224,150,0) 62%)", opacity: Math.max(burst * 0.8 * aOut, stackIn * 0.6) }} />
        {/* ===== BEAT A ===== */}
        {aOut > 0.02 && <>
          {Array.from({ length: 14 }, (_, i) => { const t = ramp(lf, 0 + i * 0.5, 22 + i * 0.5); if (t <= 0 || t >= 1) return null; const a = (i / 14) * Math.PI * 2; const r = t * 250; return <div key={i} style={{ position: "absolute", left: 380 + Math.cos(a) * r, top: 230 + Math.sin(a) * r, fontSize: 22, color: i % 2 ? GOLD : CLAY, opacity: (1 - t) * 0.9 * aOut }}>✦</div>; })}
          {cards.map((c, i) => (
            <div key={i} style={{ position: "absolute", left: "50%", top: "50%", marginLeft: -215, marginTop: -269, transform: `translate(${c.x * c.fan}px, ${(1 - c.fan) * 50 - phase * 70}px) rotate(${c.rot * c.fan}deg) scale(${(0.82 + c.fan * 0.18) * (1 - phase * 0.4)})`, opacity: c.fan * aOut, zIndex: c.z }}>
              <RealSlide w={430} h={538} src={c.src} glow={c.z === 3 ? 0.7 : 0} />
            </div>
          ))}
          {tag > 0.02 && (
            <div style={{ position: "absolute", left: 560, top: -46, transform: `rotate(${(1 - tag) * -24 + 7}deg) scale(${tag * (1 - phase * 0.5)})`, transformOrigin: "top left", zIndex: 16, opacity: aOut }}>
              <div style={{ position: "relative", padding: "18px 30px 18px 44px", borderRadius: 14, background: "#2E2A24", color: "#fff", fontFamily: fraunces.fontFamily, fontWeight: 800, fontSize: 60, boxShadow: "0 16px 34px rgba(0,0,0,0.36)", whiteSpace: "nowrap" }}>
                <div style={{ position: "absolute", left: 16, top: "50%", marginTop: -9, width: 18, height: 18, borderRadius: "50%", background: CREAM }} />
                <span style={{ position: "relative" }}>$500<div style={{ position: "absolute", left: -6, right: -6, top: "52%", height: 6, background: "#C1503C", transform: `scaleX(${cross})`, transformOrigin: "left", borderRadius: 3 }} /></span>
              </div>
            </div>
          )}
        </>}
        {/* ===== BEAT B — one Claude prompt builds it ===== */}
        {phase > 0.02 && <>
          {/* prompt window */}
          <div style={{ position: "absolute", left: 150, top: -34, width: 460, height: 96, borderRadius: 18, background: PAPER, boxShadow: "0 14px 30px rgba(40,32,20,0.18)", display: "flex", alignItems: "center", gap: 16, padding: "0 22px", opacity: promptIn, transform: `translateY(${(1 - promptIn) * -24}px)`, zIndex: 12 }}>
            <ClaudeMark size={48} />
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 26, color: INK, filter: "blur(8px)", userSelect: "none" }}>Make me a branded carousel</span>
            <div style={{ marginLeft: "auto", width: 42, height: 42, borderRadius: 11, background: CLAY, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 22 }}>↑</div>
          </div>
          {/* badge */}
          {badge > 0.02 && <div style={{ position: "absolute", left: 540, top: -68, transform: `scale(${badge}) rotate(8deg)`, transformOrigin: "bottom left", padding: "10px 18px", borderRadius: 999, background: "linear-gradient(150deg,#E08A66,#C5603C)", color: "#fff", fontFamily: fraunces.fontFamily, fontWeight: 800, fontSize: 28, boxShadow: "0 10px 22px rgba(197,96,60,0.4)", zIndex: 14, whiteSpace: "nowrap" }}>✨ 1 prompt</div>}
          {/* flow arrow */}
          <svg width={60} height={70} viewBox="0 0 60 70" style={{ position: "absolute", left: 350, top: 74, opacity: arrowT, zIndex: 11 }}><path d="M30 4 L30 50 M14 38 L30 56 L46 38" stroke={CLAY} strokeWidth={7} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={120} strokeDashoffset={120 * (1 - arrowT)} /></svg>
          {/* carousel emerges */}
          {bCards.map((c, i) => (
            <div key={i} style={{ position: "absolute", left: "50%", top: 168, marginLeft: -113, transform: `translate(${c.dx * stackIn}px, ${(1 - stackIn) * -40 + floatB}px) rotate(${c.rot * stackIn}deg) scale(${0.6 + stackIn * 0.4})`, opacity: stackIn, zIndex: i === 2 ? 5 : 4 }}>
              <RealSlide w={226} h={282} src={c.src} glow={i === 2 ? stackIn * 0.6 : 0} />
            </div>
          ))}
        </>}
      </div>
    </Stage>
  );
};

// ===== SCENE 1 — BRAND KIT carries into everything =====
const Brand: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const lf = f - fr(s);
  const panel = eOut(f, fr(s) + 2, 12);
  const swatches = [CLAY, SLATE, AMBER, INK];
  const carry = ramp(lf, 70, 96);     // brand flies into the cards
  const applied = ramp(lf, 88, 110);  // cards adopt brand
  return (
    <Stage>
      <div style={{ position: "relative", width: 940, height: 420 }}>
        {/* brand kit panel (left) */}
        <div style={{ position: "absolute", left: 0, top: 40, width: 360, height: 330, borderRadius: 18, background: PAPER, boxShadow: "0 16px 36px rgba(40,32,20,0.18)", opacity: panel, transform: `translateY(${(1 - panel) * 24}px)`, padding: 26 }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>{["#E0655A", "#E5B94A", "#5BB97C"].map((c, i) => <div key={i} style={{ width: 13, height: 13, borderRadius: "50%", background: c }} />)}</div>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 22, color: MUTE, letterSpacing: "0.08em", marginBottom: 20 }}>BRAND KIT</div>
          {/* color swatches pop in */}
          <div style={{ display: "flex", gap: 14, marginBottom: 26 }}>{swatches.map((c, i) => { const sw = over(f, fr(s) + 16 + i * 6, 10); return <div key={i} style={{ width: 56, height: 56, borderRadius: 12, background: c, transform: `scale(${sw})`, boxShadow: "0 6px 14px rgba(0,0,0,0.18)" }} />; })}</div>
          {/* font sample */}
          <div style={{ opacity: eOut(f, fr(s) + 42, 10), display: "flex", alignItems: "baseline", gap: 16, marginBottom: 22 }}><span style={{ fontFamily: fraunces.fontFamily, fontWeight: 800, fontSize: 52, color: INK }}>Aa</span><span style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 22, color: MUTE }}>Fraunces</span></div>
          {/* logo */}
          <div style={{ opacity: eOut(f, fr(s) + 54, 10), display: "flex", alignItems: "center", gap: 14 }}><ClaudeMark size={48} /><span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 24, color: INK }}>logo</span></div>
        </div>
        {/* flying brand particles */}
        {carry > 0 && carry < 1 && swatches.map((c, i) => { const p = ramp(lf, 70 + i * 3, 96 + i * 3); return <div key={i} style={{ position: "absolute", left: 200 + p * 480, top: 150 + Math.sin(p * Math.PI) * -60 + i * 12, width: 18, height: 18, borderRadius: 5, background: c, opacity: Math.sin(p * Math.PI), zIndex: 12 }} />; })}
        {/* 3 cards on the right adopt the brand */}
        {[0, 1, 2].map((i) => { const inn = eOut(f, fr(s) + 20 + i * 6, 12); const acc = applied > 0.2 ? CLAY : MUTE; return (
          <div key={i} style={{ position: "absolute", left: 560 + i * 70, top: 60 + i * 18, transform: `translateY(${(1 - inn) * 30}px) scale(${0.9 + inn * 0.1})`, opacity: inn, zIndex: 3 - i, filter: `saturate(${0.2 + applied * 0.8})` }}>
            <Slide w={170} h={222} accent={i === 0 ? CLAY : i === 1 ? SLATE : AMBER} logo={applied > 0.3} fill={1} glow={i === 0 ? applied * 0.5 : 0} />
          </div>); })}
      </div>
    </Stage>
  );
};

// ===== SCENE 2 — BUILD LIVE: prompt → 6 cards generate =====
const Build: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const lf = f - fr(s);
  const promptTxt = "Build me a 6-card carousel on this topic";
  const typed = Math.floor(ramp(lf, 8, 62) * promptTxt.length);
  const sent = ramp(lf, 64, 72);
  const cards = [
    { label: "HOOK", accent: CLAY }, { num: 1, accent: SLATE2 }, { num: 2, accent: SLATE2 },
    { num: 3, accent: SLATE2 }, { num: 4, accent: SLATE2 }, { label: "CTA", accent: SLATE },
  ];
  const cardW = 132, cardH = 188, gap = 18; const totalW = cards.length * cardW + (cards.length - 1) * gap; const startX = (980 - totalW) / 2;
  const lblHook = eOut(f, fr(s) + 196, 10), lblPts = eOut(f, fr(s) + 222, 10), lblCta = eOut(f, fr(s) + 250, 10);
  return (
    <Stage>
      <div style={{ position: "relative", width: 980, height: 460 }}>
        {/* prompt bar */}
        <div style={{ position: "absolute", left: 90, top: 4, width: 800, minHeight: 64, borderRadius: 16, background: PAPER, boxShadow: `0 10px 24px rgba(40,32,20,0.16)${sent > 0 ? `, 0 0 ${sent * 22}px rgba(210,114,78,0.5)` : ""}`, display: "flex", alignItems: "center", gap: 16, padding: "0 22px", border: sent > 0.4 ? `2px solid ${CLAY}` : "2px solid transparent" }}>
          <ClaudeMark size={40} />
          <span style={{ fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 27, color: INK, filter: "blur(8px)" }}>{promptTxt.slice(0, typed)}<span style={{ opacity: typed < promptTxt.length && Math.floor(lf / 8) % 2 ? 1 : (typed >= promptTxt.length ? 0 : 0.3), color: CLAY }}>|</span></span>
          <div style={{ marginLeft: "auto", width: 44, height: 44, borderRadius: 12, background: typed >= promptTxt.length ? CLAY : "rgba(40,32,20,0.12)", display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${1 + sent * 0.12})`, transition: "background 0.2s" }}><span style={{ color: "#fff", fontSize: 22 }}>↑</span></div>
        </div>
        {/* 6 cards generate live */}
        {cards.map((c, i) => {
          const t0 = 78 + i * 17; const pop = over(f, fr(s) + t0, 12); const fill = ramp(lf, t0 + 6, t0 + 26); const scan = lf > t0 && lf < t0 + 22;
          return (
            <div key={i} style={{ position: "absolute", left: startX + i * (cardW + gap), top: 150, transform: `translateY(${(1 - pop) * 40}px) scale(${pop})`, opacity: Math.min(1, pop * 1.3) }}>
              <div style={{ position: "relative" }}>
                <Slide w={cardW} h={cardH} accent={c.accent} label={c.label} num={c.num} fill={fill} logo glow={c.label === "HOOK" ? Math.max(0, 0.6 - ramp(lf, t0 + 30, t0 + 70) * 0.6) : 0} />
                {scan && <div style={{ position: "absolute", left: 0, right: 0, top: `${ramp(lf, t0, t0 + 22) * cardH}px`, height: 5, background: "rgba(255,255,255,0.9)", boxShadow: "0 0 14px rgba(255,255,255,0.9)" }} />}
              </div>
            </div>
          );
        })}
        {/* labels */}
        {lblHook > 0 && <div style={{ position: "absolute", left: startX - 6, top: 110, opacity: lblHook, transform: `translateY(${(1 - lblHook) * -10}px)` }}><span style={{ fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 700, fontSize: 26, color: CLAY }}>hook ↓</span></div>}
        {lblPts > 0 && <div style={{ position: "absolute", left: startX + (cardW + gap) * 1, width: (cardW + gap) * 4 - gap, top: 354, opacity: lblPts, textAlign: "center" }}>
          <div style={{ height: 12, borderLeft: `3px solid ${SLATE}`, borderRight: `3px solid ${SLATE}`, borderBottom: `3px solid ${SLATE}`, borderRadius: "0 0 8px 8px" }} />
          <span style={{ fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 700, fontSize: 24, color: SLATE }}>1 point per card</span>
        </div>}
        {lblCta > 0 && <div style={{ position: "absolute", left: startX + (cardW + gap) * 5 - 10, top: 110, opacity: lblCta, transform: `translateY(${(1 - lblCta) * -10}px)` }}><span style={{ fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 700, fontSize: 26, color: SLATE }}>CTA ↓</span></div>}
      </div>
    </Stage>
  );
};

// mini filmstrip used by Comment + Export
const MiniStrip: React.FC<{ scale?: number; refresh?: number; accents?: string[] }> = ({ scale = 1, refresh = 0, accents }) => {
  const cards = accents || [CLAY, SLATE2, SLATE2, SLATE2, SLATE2, SLATE];
  const cw = 118 * scale, ch = 168 * scale, gap = 14 * scale;
  return (
    <div style={{ display: "flex", gap, alignItems: "center" }}>
      {cards.map((a, i) => { const wave = Math.max(0, 1 - Math.abs(refresh * 7 - i)); return (
        <div key={i} style={{ transform: `translateY(${-wave * 14}px)`, filter: `brightness(${1 + wave * 0.25})` }}>
          <div style={{ position: "relative" }}>
            <Slide w={cw} h={ch} accent={a} label={i === 0 ? "HOOK" : i === 5 ? "CTA" : undefined} num={i > 0 && i < 5 ? i : undefined} logo />
            {wave > 0.05 && <div style={{ position: "absolute", inset: 0, borderRadius: 14, background: "rgba(255,255,255,0.4)", opacity: wave * 0.6 }} />}
          </div>
        </div>); })}
    </div>
  );
};

// ===== SCENE 3 — COMMENT to refine, all update at once =====
const Comment: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const lf = f - fr(s);
  const inn = eOut(f, fr(s) + 2, 12);
  const bubble = over(f, fr(s) + 24, 12);
  const refresh = ramp(lf, 52, 86);
  const done = ramp(lf, 80, 95);
  return (
    <Stage>
      <div style={{ position: "relative", width: 940, height: 420, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${0.92 + inn * 0.08})` }}>
        <MiniStrip scale={1} refresh={refresh > 0 && refresh < 1 ? refresh : 0} />
        {/* cursor + comment bubble on card 2 */}
        {bubble > 0.02 && (
          <div style={{ position: "absolute", left: 318, top: 56, transform: `scale(${bubble})`, transformOrigin: "bottom left", zIndex: 20 }}>
            <div style={{ position: "relative", padding: "14px 20px", borderRadius: "14px 14px 14px 2px", background: SLATE, color: "#fff", fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 24, boxShadow: "0 12px 26px rgba(40,32,20,0.3)", whiteSpace: "nowrap" }}>💬 “make it punchier”</div>
          </div>
        )}
        {bubble > 0.3 && <Cursor x={360} y={150} o={1 - done} />}
        {/* updated badge */}
        {done > 0.1 && <div style={{ position: "absolute", top: 8, right: 40, padding: "10px 22px", borderRadius: 999, background: GREEN, color: "#fff", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 26, opacity: done, transform: `scale(${over(f, fr(s) + 80, 10)})`, boxShadow: "0 10px 22px rgba(63,158,116,0.4)" }}>↻ all updated</div>}
      </div>
    </Stage>
  );
};

// ===== SCENE 4 — EXPORT to Instagram size =====
const ExportScene: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const lf = f - fr(s);
  const square = ramp(lf, 14, 40);          // cards morph toward square
  const drop = ramp(lf, 48, 74);            // drop into phone
  const ready = over(f, fr(s) + 78, 12);
  const phoneX = 250 - drop * 0;
  return (
    <Stage>
      <div style={{ position: "relative", width: 940, height: 460 }}>
        {/* export button */}
        <div style={{ position: "absolute", left: 70, top: 30, padding: "16px 30px", borderRadius: 14, background: SLATE, color: "#fff", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 28, boxShadow: "0 12px 26px rgba(58,92,132,0.4)", transform: `scale(${1 + Math.sin(lf / 8) * 0.03})`, opacity: 1 - drop * 0.4 }}>Export ↓ <span style={{ opacity: 0.7, fontSize: 22 }}>1080×1080</span></div>
        {/* morphing cards (left) fade as they drop */}
        <div style={{ position: "absolute", left: 60, top: 120, display: "flex", gap: 12, opacity: 1 - drop }}>
          {["refs/c1_1.png", "refs/c2_2.png", "refs/c1_3.png"].map((src, i) => { const w = 150 - square * 8, h = 150 + (1 - square) * 60; return <div key={i} style={{ transform: `translateY(${i * 10}px)` }}><RealSlide w={w} h={h} src={src} /></div>; })}
        </div>
        {/* phone mockup (right) */}
        <div style={{ position: "absolute", right: 90, top: 20, width: 300, height: 420, borderRadius: 38, background: "#23252B", boxShadow: "0 20px 44px rgba(40,32,20,0.32)", padding: 12, transform: `translateY(${(1 - eOut(f, fr(s) + 6, 12)) * 30}px)`, opacity: eOut(f, fr(s) + 6, 12) }}>
          <div style={{ width: "100%", height: "100%", borderRadius: 28, background: CREAM, overflow: "hidden", position: "relative" }}>
            {/* IG top bar */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 12px 8px" }}><div style={{ width: 26, height: 26, borderRadius: "50%", background: "linear-gradient(135deg,#E08A66,#C5603C)" }} /><div style={{ width: 90, height: 8, borderRadius: 4, background: "rgba(40,32,20,0.2)" }} /></div>
            {/* the square slide */}
            <div style={{ margin: "0 12px", height: 252, borderRadius: 8, overflow: "hidden", position: "relative", opacity: drop, transform: `scale(${0.8 + drop * 0.2})` }}>
              <Img src={staticFile("refs/c1_1.png")} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
            {/* carousel dots */}
            <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 12, opacity: drop }}>{[0, 1, 2, 3, 4, 5].map((i) => <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: i === 0 ? SLATE : "rgba(40,32,20,0.25)" }} />)}</div>
            {/* like/comment bar */}
            <div style={{ display: "flex", gap: 14, padding: "14px 16px", opacity: drop }}><span style={{ fontSize: 22 }}>♥</span><span style={{ fontSize: 22 }}>💬</span><span style={{ fontSize: 22 }}>➤</span></div>
          </div>
        </div>
        {/* flying card from left to phone */}
        {drop > 0 && drop < 1 && <div style={{ position: "absolute", left: 130 + drop * 470, top: 150 - Math.sin(drop * Math.PI) * 70, transform: `scale(${1 - drop * 0.5}) rotate(${drop * 12}deg)`, opacity: 1 - drop * 0.3, zIndex: 15 }}><RealSlide w={120} h={150} src="refs/c1_1.png" /></div>}
        {/* ready badge */}
        {ready > 0.05 && <div style={{ position: "absolute", right: 110, bottom: 6, padding: "12px 24px", borderRadius: 999, background: GREEN, color: "#fff", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 26, transform: `scale(${ready})`, boxShadow: "0 10px 22px rgba(63,158,116,0.4)" }}>✓ ready to post</div>}
      </div>
    </Stage>
  );
};

// ===== SCENE 5 — PAYOFF: 5 min, no designer/subscription =====
const Payoff: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const lf = f - fr(s);
  const clock = eOut(f, fr(s) + 2, 14);
  const mins = Math.round(interpolate(lf, [4, 26], [1, 5], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const b1 = over(f, fr(s) + 44, 12), b2 = over(f, fr(s) + 58, 12);
  const cross = ramp(lf, 64, 80);
  return (
    <Stage>
      <div style={{ position: "relative", width: 880, height: 420, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 30 }}>
        {/* big timer */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 16, opacity: clock, transform: `scale(${0.7 + clock * 0.3})` }}>
          <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 800, fontSize: 150, color: CLAY, lineHeight: 1 }}>{mins}</span>
          <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 52, color: INK }}>min</span>
        </div>
        {/* crossed-out badges */}
        <div style={{ display: "flex", gap: 28 }}>
          {[{ t: "🧑‍🎨 Designer $500", v: b1 }, { t: "💳 Subscription", v: b2 }].map((x, i) => (
            <div key={i} style={{ position: "relative", padding: "16px 28px", borderRadius: 14, background: PAPER, boxShadow: "0 10px 24px rgba(40,32,20,0.16)", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 30, color: MUTE, transform: `scale(${x.v})`, opacity: x.v }}>
              {x.t}
              <div style={{ position: "absolute", left: 8, right: 8, top: "52%", height: 5, background: "#C1503C", borderRadius: 3, transform: `scaleX(${cross})`, transformOrigin: "left" }} />
            </div>
          ))}
        </div>
      </div>
    </Stage>
  );
};

// ===== CTA =====
const CTA: React.FC<{ s: number }> = ({ s }) => {
  const frame = useCurrentFrame(); const local = frame - fr(s); if (local < 0) return null; const a = eOut(frame, fr(s) + 2, 12); const pulse = 1 + Math.sin(frame / 7) * 0.03;
  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      {Array.from({ length: 12 }, (_, i) => { const p = eOut(frame, fr(s) + 4 + i, 26); const ang = (i / 12) * Math.PI * 2; if (p <= 0 || p >= 1) return null; return <div key={i} style={{ position: "absolute", left: 540 + Math.cos(ang) * p * 340, top: 820 + Math.sin(ang) * p * 340, fontSize: 28, opacity: Math.sin(p * Math.PI), color: [SLATE, CLAY, AMBER, GREEN][i % 4] }}>✦</div>; })}
      <div style={{ marginTop: -120, opacity: a, transform: `scale(${0.7 + a * 0.3})` }}><ClaudeMark size={176} /></div>
      <div style={{ marginTop: 44, transform: `scale(${pulse})`, padding: "28px 56px", borderRadius: 999, background: CLAY, color: "#fff", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 64, boxShadow: "0 24px 54px rgba(210,114,78,0.42)", opacity: a }}>💬 Comment "CAROUSEL"</div>
      <div style={{ marginTop: 28, fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 600, fontSize: 40, color: INK, opacity: a, textAlign: "center", lineHeight: 1.3 }}>and I'll send the prompt + editable template</div>
    </AbsoluteFill>
  );
};

const Sfx: React.FC<{ at: number; src: string; vol?: number }> = ({ at, src, vol = 0.4 }) => (<Sequence from={fr(at)} durationInFrames={fr(4)}><Audio src={staticFile(`sfx/${src}`)} volume={vol} /></Sequence>);
const SfxTrack: React.FC = () => (<>
  {/* opening ZOOM-IN: riser builds -> impact lands on the punch (~0.5s) */}
  <Sfx at={L[0]} src="riser.wav" vol={0.3} /><Sfx at={L[0]} src="swooshup.wav" vol={0.3} /><Sfx at={L[0] + 0.52} src="boom.wav" vol={0.34} /><Sfx at={L[0] + 0.5} src="shimmer.wav" vol={0.3} /><Sfx at={L[0] + 2.4} src="snap.wav" vol={0.3} />
  {/* real metallic RISER (popular-riser-metallic) — climax lands ON the transition (STANDING engagement element) */}
  <Sfx at={L[1] - 1.8} src="metal_riser.wav" vol={0.82} />
  <Sfx at={L[1]} src="boom.wav" vol={0.24} /><Sfx at={L[1] + 0.6} src="pop.wav" vol={0.24} /><Sfx at={L[1] + 3} src="whoosh.wav" vol={0.24} />
  <Sfx at={L[2] - 1.8} src="metal_riser.wav" vol={0.5} /><Sfx at={L[2]} src="swish.wav" vol={0.22} />{[0, 1, 2, 3, 4, 5].map((i) => <Sfx key={i} at={L[2] + 2.6 + i * 0.57} src="blip3.wav" vol={0.2} />)}<Sfx at={L[2] + 2.3} src="key.wav" vol={0.22} />
  <Sfx at={L[3]} src="swish.wav" vol={0.24} /><Sfx at={L[3] + 0.9} src="pop.wav" vol={0.26} /><Sfx at={L[3] + 2.7} src="shimmer.wav" vol={0.28} />
  <Sfx at={L[4]} src="swish.wav" vol={0.24} /><Sfx at={L[4] + 1.7} src="thock.wav" vol={0.26} /><Sfx at={L[4] + 2.7} src="ding.wav" vol={0.3} />
  <Sfx at={L[5]} src="swish.wav" vol={0.24} /><Sfx at={L[5] + 1.6} src="tick.wav" vol={0.22} /><Sfx at={L[5] + 2.1} src="tick.wav" vol={0.22} />
  <Sfx at={L[6]} src="resolve.wav" vol={0.34} /><Sfx at={L[6] + 0.5} src="sparkle.wav" vol={0.3} />
</>);

const Ambient: React.FC = () => {
  const frame = useCurrentFrame(); const t = frame / FPS;
  return (<AbsoluteFill style={{ pointerEvents: "none" }}>{Array.from({ length: 11 }, (_, i) => {
    const x = rnd(i, 11) * 1060 + 10, y = rnd(i, 12) * 1880 + 20; const dx = Math.sin((t + i * 1.7) / (5 + rnd(i, 13) * 4)) * 40, dy = Math.cos((t + i * 2.1) / (6 + rnd(i, 14) * 4)) * 36;
    const size = 6 + rnd(i, 15) * 10; const tw = 0.3 + 0.7 * (Math.sin(t * 1.4 + i * 2) * 0.5 + 0.5); const isSpark = rnd(i, 16) > 0.55; const col = [SLATE, SLATE2, AMBER, MUTE][Math.floor(rnd(i, 17) * 4)];
    return isSpark ? <div key={i} style={{ position: "absolute", left: x + dx, top: y + dy, fontSize: size, color: col, opacity: tw * 0.3 }}>✦</div> : <div key={i} style={{ position: "absolute", left: x + dx, top: y + dy, width: size, height: size, borderRadius: "50%", background: col, opacity: tw * 0.14 }} />;
  })}</AbsoluteFill>);
};
const Background: React.FC = () => {
  const frame = useCurrentFrame(); const drift = Math.sin(frame / 90) * 6;
  return (<AbsoluteFill style={{ backgroundColor: CREAM }}>
    <AbsoluteFill style={{ transform: `translate(${drift}px,${drift * 0.6}px)`, backgroundImage: "linear-gradient(rgba(26,24,19,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(26,24,19,0.08) 1px,transparent 1px)", backgroundSize: "66px 66px" }} />
    <AbsoluteFill style={{ opacity: 0.05, mixBlendMode: "multiply" }}><svg width="100%" height="100%"><filter id="ppCar"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves={2} stitchTiles="stitch" /></filter><rect width="100%" height="100%" filter="url(#ppCar)" /></svg></AbsoluteFill>
    <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 42%, rgba(0,0,0,0) 58%, rgba(40,32,20,0.09) 100%)" }} />
  </AbsoluteFill>);
};

// hero hook-header (raycfu-style top-third headline, opening only) — makes the hook mute-readable as a TITLE; enticing/withhold copy, clay Claude keyword
const HeroHeader: React.FC = () => {
  const f = useCurrentFrame();
  if (f > 106) return null;
  const appear = eOut(f, 0, 8);          // lands on frame 1, not faded in
  const out = eOut(f, 92, 12);
  const op = appear * (1 - out);
  const ty = (1 - appear) * 20 - out * 14;
  const sc = 0.965 + appear * 0.035;
  const l2 = eOut(f, 12, 9);             // the twist line snaps in within the first ~0.5s
  return (
    <div style={{ position: "absolute", top: 336, left: 78, right: 78, opacity: op, transform: `translateY(${ty}px) scale(${sc})`, transformOrigin: "left top", zIndex: 40 }}>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 80, lineHeight: 1.04, letterSpacing: "-0.03em", color: INK, textShadow: "0 2px 18px rgba(236,233,226,0.96)" }}>
        <div>1 <span style={{ color: CLAY }}>Claude</span> prompt.</div>
        <div style={{ opacity: l2 }}>No designer, no Canva.</div>
      </div>
    </div>
  );
};

export const ClaudeCarouselReel: React.FC = () => {
  const frame = useCurrentFrame();
  // opening ZOOM-IN punch (first ~0.8s) — pairs with the riser/whoosh/impact SFX to hook the viewer
  const zoom = interpolate(frame, [0, 16, 28], [1.0, 1.09, 1.0], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  return (
    <AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
      <Audio src={staticFile("vo_carousel.wav")} />
      <Audio src={staticFile("music_bed.wav")} volume={0.25} />
      <SfxTrack />
      <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "50% 46%" }}>
      <Background />
      <Ambient />
      <Scene s={L[0]} e={L[1]}><Hook s={L[0]} /></Scene>
      <Scene s={L[1]} e={L[2]}><Header n={1} s={L[1]} text="Set your brand once" /><Brand s={L[1]} /></Scene>
      <Scene s={L[2]} e={L[3]}><Header n={2} s={L[2]} text="Give it one line" /><Build s={L[2]} /></Scene>
      <Scene s={L[3]} e={L[4]}><Header n={3} s={L[3]} text="Comment to refine" /><Comment s={L[3]} /></Scene>
      <Scene s={L[4]} e={L[5]}><Header n={4} s={L[4]} text="Export to post" /><ExportScene s={L[4]} /></Scene>
      <Scene s={L[5]} e={L[6]}><Payoff s={L[5]} /></Scene>
      <CTA s={L[6]} />
      <HeroHeader />
      <Captions />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
