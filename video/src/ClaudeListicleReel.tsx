import React from "react";
import { AbsoluteFill, Audio, Easing, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { fraunces, frauncesItalic, inter } from "./fonts";
import wordsData from "./data/words_listicle.json";

/**
 * ClaudeListicleReel — "7 things Claude does for your business that feel illegal".
 * VISUAL-HEAVY: each item = a kicker HEADER + a detailed animated app-window mockup
 * (cursors, counting numbers, status flips, typing). Caption below carries the words.
 */
const CREAM = "#ECE9E2", INK = "#1A1813", SLATE = "#3A5C84", SLATE2 = "#5C7CA8", CLAY = "#D2724E", OFF = "#F7F5F0", AMBER = "#CF9544", GREEN = "#3F9E74", MUTE = "#9A968B", RED = "#C1503C", PAPER = "#FBFAF7";
const FPS = 30; const fr = (s: number) => s * FPS;
const eOut = (f: number, sF: number, d = 10) => interpolate(f, [sF, sF + d], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
const ramp = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const frac = (x: number) => x - Math.floor(x); const rnd = (i: number, s = 0) => frac(Math.sin(i * 12.9898 + s * 78.233) * 43758.5453);
const CLAUDE_PATH = "m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z";

const L = [0.0, 3.09, 9.71, 14.60, 19.70, 24.68, 29.13, 34.64, 39.64, 44.75];
const VEND = 48.0;

type Word = { word: string; start: number; end: number; line: number };
const WORDS = wordsData as Word[];
const clean = (w: string) => w.toLowerCase().replace(/[^a-z']/g, "");
const EMPH = new Set(["illegal", "competitor's", "competitors", "roadmap", "revenue", "objection", "weak", "content", "churned", "linkedin", "bot", "steal", "agencies", "better", "reverse"]);

// ===== captions =====
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
    if (c.line === 9) return null;
    return (<div key={i} style={{ position: "absolute", top: 1175, left: 70, right: 70, height: 225, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "center", gap: "0 15px", width: 960, textAlign: "center" }}>
        {c.words.map((w, j) => { const g = EMPH.has(clean(w.word)); const shown = frame >= fr(w.start);
          return <span key={j} style={{ display: "inline-block", opacity: shown ? 1 : 0, fontFamily: g ? frauncesItalic.fontFamily : fraunces.fontFamily, fontStyle: g ? "italic" : "normal", fontWeight: g ? 700 : 600, fontSize: g ? 80 : 70, lineHeight: 1.05, color: g ? SLATE : INK, letterSpacing: "-0.02em", textShadow: "0 2px 16px rgba(236,233,226,0.95)" }}>{w.word}</span>; })}
      </div></div>); })}</>);
};

const Scene: React.FC<{ s: number; e: number; children: React.ReactNode }> = ({ s, e, children }) => {
  const frame = useCurrentFrame(); const local = frame - fr(s); const lenF = fr(e - s);
  if (local < 0 || local > lenF) return null;
  const op = Math.min(eOut(frame, fr(s), 4), 1 - eOut(frame, fr(e - 0.14), 5)); const inE = eOut(frame, fr(s), 12);
  return <AbsoluteFill style={{ opacity: op, transform: `scale(${0.98 + inE * 0.02})` }}>{children}</AbsoluteFill>;
};

// ===== chrome / primitives =====
const ClaudeMark: React.FC<{ size: number }> = ({ size }) => (
  <div style={{ width: size, height: size, borderRadius: size * 0.24, background: "linear-gradient(155deg,#E08A66,#C5603C)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 14px 30px rgba(197,96,60,0.3)" }}>
    <svg viewBox="0 0 24 24" width={size * 0.6} height={size * 0.6}><path fill="#F6EFE6" d={CLAUDE_PATH} /></svg>
  </div>
);
const AppWindow: React.FC<{ w: number; h: number; title: string; icon?: React.ReactNode; children: React.ReactNode }> = ({ w, h, title, icon, children }) => (
  <div style={{ width: w, height: h, borderRadius: 28, background: "#fff", boxShadow: "0 44px 90px rgba(40,32,20,0.22), 0 14px 28px rgba(40,32,20,0.1)", border: "1px solid rgba(40,32,20,0.06)", overflow: "hidden", position: "relative" }}>
    <div style={{ height: 58, background: "#F4F1EA", borderBottom: "2px solid #E6E2D8", display: "flex", alignItems: "center", gap: 9, padding: "0 22px" }}>
      <div style={{ width: 13, height: 13, borderRadius: 7, background: "#E08A66" }} /><div style={{ width: 13, height: 13, borderRadius: 7, background: AMBER }} /><div style={{ width: 13, height: 13, borderRadius: 7, background: GREEN }} />
      <div style={{ marginLeft: 12, display: "flex", alignItems: "center", gap: 9, fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 25, color: MUTE }}>{icon}{title}</div>
    </div>
    <div style={{ position: "relative", width: "100%", height: h - 58, background: PAPER }}>{children}</div>
  </div>
);
const Cursor: React.FC<{ x: number; y: number; click?: boolean }> = ({ x, y, click }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: 40, pointerEvents: "none" }}>
    {click && <div style={{ position: "absolute", left: -8, top: -8, width: 52, height: 52, borderRadius: "50%", border: "3px solid rgba(58,92,132,0.45)" }} />}
    <svg width="42" height="42" viewBox="0 0 24 24"><path d="M5 2l16 9.6-6.9 1.2 3.9 7.1-3.3 1.6-3.9-7.2-5 4.2z" fill="#1A1813" stroke="#fff" strokeWidth="1.3" strokeLinejoin="round" /></svg>
  </div>
);
const Header: React.FC<{ n: number; s: number; text: string; illegal?: boolean }> = ({ n, s, text, illegal }) => {
  const f = useCurrentFrame(); const e = eOut(f, fr(s) + 1, 8); const pop = 1 + (illegal ? Math.sin(f / 7) * 0.03 : 0);
  return (
    <div style={{ position: "absolute", top: 394, left: 0, right: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 20, opacity: e }}>
      <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 86, height: 86, borderRadius: "50%", background: illegal ? "linear-gradient(150deg,#E08A66,#B24A2C)" : "linear-gradient(150deg,#4A6B96,#324B6E)", color: "#fff", fontFamily: fraunces.fontFamily, fontWeight: 800, fontSize: 48, boxShadow: illegal ? "0 14px 32px rgba(178,74,44,0.42)" : "0 14px 28px rgba(40,32,20,0.24)", transform: `scale(${(0.5 + e * 0.5) * pop})` }}>{n}</span>
      <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 47, letterSpacing: "0.01em", color: illegal ? CLAY : INK, textTransform: "uppercase" }}>{text}</span>
    </div>
  );
};
const Mock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ position: "absolute", top: 540, left: 0, right: 0, display: "flex", justifyContent: "center" }}>{children}</div>
);
const Pill: React.FC<{ bg: string; col: string; children: React.ReactNode; size?: number; style?: React.CSSProperties }> = ({ bg, col, children, size = 26, style }) => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 15px", borderRadius: 999, background: bg, color: col, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: size, ...style }}>{children}</span>
);

const WIN_W = 712, WIN_H = 512;

// ===== ITEM 1 — competitor teardown: load → scan → 3 flags w/ cursor → verdict =====
const M1: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const lf = f - fr(s);
  const load = ramp(lf, 3, 15);
  const scanOn = lf > 15 && lf < 47; const scanY = interpolate(lf, [15, 45], [66, 358], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const flagDefs = [
    { at: 25, top: 86, left: 28, w: 452, h: 126, tag: "⚠ vague", tagTop: 92, tagLeft: 498 },
    { at: 37, top: 256, left: 26, w: 196, h: 62, tag: "weak CTA", tagTop: 268, tagLeft: 236 },
    { at: 47, top: 232, left: 468, w: 206, h: 80, tag: "no proof", tagTop: 194, tagLeft: 470 },
  ];
  const cx = interpolate(lf, [12, 25, 37, 47, 55], [430, 300, 150, 560, 560], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cy = interpolate(lf, [12, 25, 37, 47, 55], [120, 150, 286, 270, 270], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AppWindow w={WIN_W} h={WIN_H} title="rival.com" icon={<span>🔒</span>}>
      <div style={{ position: "absolute", top: 0, left: 0, height: 5, width: `${load * 100}%`, background: SLATE, opacity: 1 - ramp(lf, 14, 19) }} />
      <div style={{ padding: "24px 34px", opacity: load }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <div style={{ width: 34, height: 34, borderRadius: 9, background: SLATE2 }} /><span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 30, color: INK }}>RIVAL</span>
          <div style={{ marginLeft: "auto", display: "flex", gap: 22 }}>{["Product", "Pricing", "Docs"].map((t) => <span key={t} style={{ fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 24, color: MUTE }}>{t}</span>)}</div>
        </div>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 54, color: INK, lineHeight: 1.08 }}>The all-in-one<br />platform</div>
        <div style={{ marginTop: 16, fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 25, color: MUTE }}>for teams of every size, everywhere.</div>
        <div style={{ marginTop: 22, display: "inline-block", padding: "13px 28px", borderRadius: 12, background: SLATE2, color: "#fff", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 25 }}>Get started</div>
      </div>
      {scanOn && <div style={{ position: "absolute", left: 0, right: 0, top: scanY, height: 44, background: "linear-gradient(rgba(58,92,132,0),rgba(58,92,132,0.16),rgba(58,92,132,0))", borderTop: "2px solid rgba(58,92,132,0.45)" }} />}
      {flagDefs.map((fl, i) => { const e = eOut(f, fr(s) + fl.at, 6); if (e <= 0.02) return null; return (<React.Fragment key={i}>
        <div style={{ position: "absolute", top: fl.top, left: fl.left, width: fl.w, height: fl.h, border: `3px solid ${RED}`, borderRadius: 10, opacity: e, boxShadow: `0 0 0 5px rgba(193,80,60,${0.1 * e})` }} />
        <div style={{ position: "absolute", top: fl.tagTop, left: fl.tagLeft, opacity: e, transform: `translateX(${(1 - e) * 12}px)`, zIndex: 6 }}><Pill bg="#F6E2DC" col={RED} size={22}>{fl.tag}</Pill></div>
      </React.Fragment>); })}
      {lf > 12 && <Cursor x={cx} y={cy} click={[25, 37, 47].some((a) => lf > a && lf < a + 6)} />}
    </AppWindow>
  );
};

// ===== ITEM 2 — objections + follow-up =====
const M2: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const lf = f - fr(s);
  const objs = [{ t: "💰 too expensive", at: 14 }, { t: "⏰ no time right now", at: 22 }, { t: "🤔 already use a tool", at: 30 }];
  const sent = eOut(f, fr(s) + 44, 8);
  return (
    <AppWindow w={WIN_W} h={WIN_H} title="Sales call · 32:14" icon={<span>📞</span>}>
      <div style={{ padding: "24px 30px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
          <div style={{ width: 46, height: 46, borderRadius: "50%", background: SLATE2 }} />
          <div><div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 26, color: INK }}>Discovery — Acme Co</div><div style={{ fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 21, color: MUTE }}>transcript analyzed</div></div>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 4, height: 38 }}>{[0, 1, 2, 3, 4, 5, 6, 7].map((i) => { const h = 10 + Math.abs(Math.sin((f / 4) + i * 0.6)) * 28; return <div key={i} style={{ width: 5, height: h, borderRadius: 3, background: i % 2 ? SLATE2 : SLATE }} />; })}</div>
        </div>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 22, color: MUTE, marginBottom: 12, letterSpacing: "0.04em" }}>OBJECTIONS FOUND</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>{objs.map((o, i) => { const e = eOut(f, fr(s) + o.at, 7); return <div key={i} style={{ opacity: e, transform: `translateX(${(1 - e) * -20}px)` }}><Pill bg="#FBEEE9" col={CLAY} size={27}>{o.t}</Pill></div>; })}</div>
        <div style={{ marginTop: 16, padding: "14px 18px", borderRadius: 14, background: "#fff", border: "2px solid #E6E2D8", display: "flex", alignItems: "center", gap: 12, opacity: eOut(f, fr(s) + 38, 8) }}>
          <ClaudeMark size={36} /><div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 23, color: INK }}>Follow-up drafted →</div>
          <div style={{ marginLeft: "auto" }}>{sent > 0.5 ? <Pill bg="#E7F0EA" col={GREEN} size={25}>✓ Sent</Pill> : <Pill bg={SLATE} col="#fff" size={25}>Send ▶</Pill>}</div>
        </div>
      </div>
    </AppWindow>
  );
};

// ===== ITEM 3 — features ranked by revenue =====
const M3: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const rows = [{ name: "SSO / SAML", v: 100, dollars: 48, c: GREEN }, { name: "Public API", v: 66, dollars: 31, c: SLATE }, { name: "Mobile app", v: 40, dollars: 12, c: SLATE2 }];
  return (
    <AppWindow w={WIN_W} h={WIN_H} title="Feedback insights" icon={<span>📊</span>}>
      <div style={{ padding: "26px 34px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 26 }}>
          <div style={{ fontSize: 36, color: AMBER, letterSpacing: 3 }}>★★★★★</div><span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 26, color: MUTE }}>240 reviews → ranked by revenue</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>{rows.map((r, i) => { const e = eOut(f, fr(s) + 16 + i * 5, 12); const dv = Math.round(ramp(f, fr(s) + 16 + i * 5, fr(s) + 36 + i * 5) * r.dollars);
          return (<div key={i}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}><span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 28, color: INK }}>{r.name}</span><span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 30, color: r.c }}>+${dv}k</span></div>
            <div style={{ height: 32, borderRadius: 10, background: "#EDEAE2", overflow: "hidden" }}><div style={{ width: `${r.v * e}%`, height: "100%", background: r.c, borderRadius: 10 }} /></div>
          </div>); })}</div>
      </div>
    </AppWindow>
  );
};

// ===== ITEM 4 — one post → 30 days =====
const M4: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const plat = [SLATE, INK, CLAY, GREEN];
  return (
    <AppWindow w={WIN_W} h={WIN_H} title="Content engine" icon={<span>🗓️</span>}>
      <div style={{ display: "flex", alignItems: "center", height: "100%", padding: "0 32px", gap: 24 }}>
        <div style={{ flexShrink: 0, opacity: eOut(f, fr(s) + 4, 8) }}>
          <svg width={132} height={164} viewBox="0 0 80 100"><path d="M14 6h36l22 22v66a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4V10a4 4 0 0 1 4-4z" fill="#fff" stroke="#DCD8CC" strokeWidth="2" /><path d="M50 6v22h22" fill="#EFEAE0" /><rect x="22" y="42" width="36" height="5" rx="2.5" fill="#E2DED4" /><rect x="22" y="54" width="44" height="5" rx="2.5" fill="#E2DED4" /><rect x="22" y="66" width="30" height="5" rx="2.5" fill="#E2DED4" /></svg>
          <div style={{ textAlign: "center", marginTop: 10, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 24, color: MUTE }}>1 post</div>
        </div>
        <div style={{ fontSize: 50, color: SLATE, fontWeight: 900, opacity: eOut(f, fr(s) + 12, 8) }}>→</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 11, flex: 1 }}>{Array.from({ length: 24 }, (_, i) => { const e = eOut(f, fr(s) + 16 + i * 1.3, 8); return <div key={i} style={{ height: 52, borderRadius: 10, background: "#fff", border: "1px solid rgba(40,32,20,0.06)", boxShadow: "0 4px 10px rgba(40,32,20,0.06)", display: "flex", alignItems: "center", justifyContent: "center", opacity: e, transform: `scale(${0.4 + e * 0.6})` }}><div style={{ width: 18, height: 18, borderRadius: 5, background: plat[i % 4] }} /></div>; })}</div>
      </div>
      <div style={{ position: "absolute", bottom: 18, right: 26, opacity: eOut(f, fr(s) + 46, 8), transform: `translateY(${(1 - eOut(f, fr(s) + 46, 8)) * 12}px)` }}><Pill bg="#E7F0EA" col={GREEN} size={26}>✓ a month, scheduled</Pill></div>
    </AppWindow>
  );
};

// ===== ITEM 5 — steal the roadmap (illegal) =====
const M5: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const lf = f - fr(s);
  const jobs = [{ t: "Infrastructure Engineer", c: "×3" }, { t: "Billing Product Manager", c: "" }, { t: "ML Platform Lead", c: "" }];
  const mile = [{ q: "Q3", t: "Scale infra", c: SLATE }, { q: "Q3", t: "Usage-based billing", c: SLATE }, { q: "Q4", t: "AI features", c: CLAY }];
  const flip = ramp(lf, 24, 36);
  return (
    <AppWindow w={WIN_W} h={WIN_H} title="rival.com/careers" icon={<span>🔓</span>}>
      <div style={{ padding: "24px 32px", position: "relative", height: "100%" }}>
        <div style={{ opacity: 1 - flip, transform: `translateX(${-flip * 60}px)`, position: "absolute", left: 32, right: 32, top: 24 }}>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 24, color: MUTE, marginBottom: 14 }}>OPEN ROLES</div>
          {jobs.map((j, i) => { const e = eOut(f, fr(s) + 6 + i * 4, 8); return <div key={i} style={{ opacity: e, display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", marginBottom: 11, borderRadius: 12, background: "#fff", border: "1px solid rgba(40,32,20,0.06)" }}><div style={{ width: 34, height: 34, borderRadius: 8, background: SLATE2 }} /><span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 26, color: INK }}>{j.t}</span>{j.c && <Pill bg="#F6E2DC" col={CLAY} size={22}>{j.c}</Pill>}</div>; })}
        </div>
        <div style={{ opacity: flip, transform: `translateX(${(1 - flip) * 60}px)`, position: "absolute", left: 32, right: 32, top: 24 }}>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 24, color: CLAY, marginBottom: 18 }}>↳ THEIR 2026 ROADMAP</div>
          {mile.map((m, i) => { const e = eOut(f, fr(s) + 30 + i * 5, 8); return <div key={i} style={{ opacity: e, display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}><div style={{ width: 56, height: 56, borderRadius: "50%", background: m.c, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 800, fontSize: 24 }}>{m.q}</div><span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 30, color: INK }}>{m.t}</span></div>; })}
        </div>
      </div>
    </AppWindow>
  );
};

// ===== ITEM 6 — win back churn =====
const M6: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const lf = f - fr(s); const won = ramp(lf, 24, 34); const won11 = Math.round(ramp(lf, 36, 50) * 11);
  return (
    <AppWindow w={WIN_W} h={WIN_H} title="Customers" icon={<span>↩️</span>}>
      <div style={{ padding: "30px 34px" }}>
        <div style={{ padding: "24px 26px", borderRadius: 18, background: "#fff", border: `2px solid ${won > 0.5 ? "#CDE6D8" : "#F0CFC6"}`, boxShadow: "0 14px 30px rgba(40,32,20,0.1)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 60, height: 60, borderRadius: "50%", background: won > 0.5 ? GREEN : RED }} />
            <div><div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 30, color: INK }}>Acme Co.</div><div style={{ fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 22, color: MUTE }}>$1,200 / mo plan</div></div>
            <div style={{ marginLeft: "auto" }}>{won > 0.5 ? <Pill bg="#E7F0EA" col={GREEN} size={28}>✓ Reactivated</Pill> : <Pill bg="#F6E2DC" col={RED} size={28}>✕ Cancelled</Pill>}</div>
          </div>
        </div>
        <div style={{ marginTop: 20, padding: "18px 22px", borderRadius: 16, background: PAPER, border: "2px solid #E6E2D8", opacity: eOut(f, fr(s) + 14, 8), transform: `translateY(${(1 - eOut(f, fr(s) + 14, 8)) * 16}px)` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}><ClaudeMark size={32} /><span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 23, color: MUTE }}>win-back email</span></div>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 25, color: INK }}>"We fixed the exact thing you left over—"</div>
        </div>
        <div style={{ marginTop: 16, textAlign: "right", opacity: eOut(f, fr(s) + 34, 8) }}><Pill bg="#E7F0EA" col={GREEN} size={28}>{won11} of 38 won back</Pill></div>
      </div>
    </AppWindow>
  );
};

// ===== ITEM 7 — human cold email =====
const M7: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const lf = f - fr(s);
  const txt = "Saw you're scaling the SDR team to 5 — most teams hit the same ramp problem at that size."; const n = Math.max(0, Math.min(txt.length, Math.floor((lf - 22) * 1.7))); const blink = Math.floor(lf / 9) % 2 === 0;
  return (
    <AppWindow w={WIN_W} h={WIN_H} title="Compose" icon={<span>✉️</span>}>
      <div style={{ padding: "24px 30px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", borderRadius: 14, background: "#fff", border: "1px solid rgba(40,32,20,0.06)", opacity: eOut(f, fr(s) + 4, 8) }}>
          <div style={{ width: 52, height: 52, borderRadius: "50%", background: SLATE2 }} />
          <div><div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 26, color: INK }}>Jordan Lee · VP Growth</div><div style={{ fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 21, color: MUTE }}>📌 posted: "hiring 5 SDRs this quarter"</div></div>
          <div style={{ marginLeft: "auto", width: 40, height: 40, borderRadius: 9, background: "#2867B2", color: "#fff", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 24, display: "flex", alignItems: "center", justifyContent: "center" }}>in</div>
        </div>
        <div style={{ marginTop: 18, padding: "20px 22px", borderRadius: 16, background: "#fff", border: "2px solid #E6E2D8", minHeight: 170 }}>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 22, color: MUTE, marginBottom: 12 }}>To: jordan@saasco.com</div>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 28, color: INK, lineHeight: 1.4 }}>{txt.slice(0, n)}<span style={{ opacity: blink ? 1 : 0, color: SLATE }}>|</span></div>
        </div>
        <div style={{ marginTop: 14, textAlign: "right", opacity: eOut(f, fr(s) + 50, 8) }}><Pill bg="#E7F0EA" col={GREEN} size={27}>✓ sounds human, not a bot</Pill></div>
      </div>
    </AppWindow>
  );
};

// ===== HOOK 1 — premium Claude chat, the boring default =====
const Hook1: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const lf = f - fr(s); const e = eOut(f, fr(s), 9); const push = 1 + ramp(f, fr(s), fr(s) + fr(2.8)) * 0.09;
  const typed = "Hi — just circling back on my last email to see if you had any"; const n = Math.max(0, Math.min(typed.length, Math.floor((lf - 12) * 2.0))); const blink = Math.floor(lf / 8) % 2 === 0;
  return (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ marginTop: -150, opacity: e, transform: `scale(${push})` }}>
        <AppWindow w={760} h={560} title="Claude" icon={<ClaudeMark size={30} />}>
          <div style={{ padding: "30px 34px", display: "flex", flexDirection: "column", gap: 22 }}>
            <div style={{ alignSelf: "flex-end", maxWidth: 460, padding: "18px 24px", borderRadius: "22px 22px 6px 22px", background: SLATE, color: "#fff", fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 30 }}>write me a follow-up email</div>
            <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
              <ClaudeMark size={52} />
              <div style={{ maxWidth: 540, padding: "20px 26px", borderRadius: "22px 22px 22px 6px", background: "#fff", border: "2px solid #E6E2D8", fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 31, color: INK, lineHeight: 1.42 }}>{typed.slice(0, n)}<span style={{ opacity: blink ? 1 : 0, color: CLAY }}>|</span></div>
            </div>
            <div style={{ marginTop: 8, alignSelf: "center", opacity: eOut(f, fr(s) + 56, 8) }}><Pill bg="#ECEAE3" col={MUTE} size={28}>🥱 ...and most people stop here</Pill></div>
          </div>
        </AppWindow>
      </div>
    </AbsoluteFill>
  );
};

// ===== HOOK 2 — sequenced: tiles burst → agency invoice → KARATE KICK → #5 zoom+glow =====
const ICONS = ["🌐", "📞", "⭐", "🗓️", "💼", "↩️", "✉️"];
const Hook2: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const lf = f - fr(s); const tiles = [1, 2, 3, 4, 5, 6, 7];
  const invIn = eOut(f, fr(s) + 36, 9);              // agency invoice drops in (~1.2s)
  const kick = ramp(lf, 66, 80);                     // boot swings in
  const fly = ramp(lf, 79, 100);                     // invoice flies off after impact
  const impact = lf > 77 && lf < 92;
  const five = eOut(f, fr(s) + 92, 14); const glow = 0.5 + Math.sin(f / 7) * 0.5;   // #5 zoom after kick
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: 0, right: 0, top: 460, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 22, padding: "0 96px" }}>
        {tiles.map((n, i) => { const e = eOut(f, fr(s) + 6 + i * 3, 8); const hot = n === 5; const bob = Math.sin((f + i * 30) / 22) * 5;
          const z = hot ? 1 + five * 0.6 : 1; const lift = hot ? five : 0; const dim = !hot ? 1 - five * 0.35 : 1;
          return (
            <div key={n} style={{ position: "relative", zIndex: hot ? 30 : 1, width: 184, height: 184, borderRadius: 40, background: hot ? "linear-gradient(150deg,#E89B79,#B24A2C)" : "linear-gradient(150deg,#FFFFFF,#EFEDE6)", border: hot ? "none" : "1px solid rgba(40,32,20,0.06)", boxShadow: hot ? `0 ${24 + lift * 22}px ${48 + lift * 34}px rgba(178,74,44,${0.34 + glow * 0.34 * (0.4 + five)})` : "0 18px 34px rgba(40,32,20,0.14)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, opacity: Math.min(1, e * 1.3) * dim, transform: `translateY(${(1 - e) * 34 + bob - lift * 26}px) scale(${(0.7 + e * 0.3) * z})` }}>
              <div style={{ fontSize: hot ? 60 : 56 }}>{hot ? "🔒" : ICONS[n - 1]}</div>
              <div style={{ position: "absolute", top: 12, left: 16, fontFamily: fraunces.fontFamily, fontWeight: 800, fontSize: 34, color: hot ? "#fff" : SLATE2 }}>{n}</div>
              {hot && five > 0.4 && <div style={{ position: "absolute", bottom: -42, left: 0, right: 0, textAlign: "center", fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 800, fontSize: 32, color: CLAY, opacity: five }}>illegal</div>}
            </div>
          ); })}
      </div>
      {/* the $5k/mo agency invoice — gets kicked away */}
      {invIn > 0.02 && fly < 1 && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 910, display: "flex", justifyContent: "center" }}>
          <div style={{ transform: `translate(${-fly * 760}px, ${fly * 130}px) rotate(${fly * -42}deg) scale(${(0.6 + invIn * 0.4) * (1 + (impact ? 0.06 : 0))})`, opacity: invIn * (1 - ramp(fly, 0.7, 1)) }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 28px", borderRadius: 16, background: "#fff", border: "2px solid #E6E2D8", boxShadow: "0 18px 36px rgba(40,32,20,0.16)", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 42, color: INK }}>🧾 $5,000/mo agency</span>
          </div>
        </div>
      )}
      {kick > 0.01 && fly < 0.55 && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 868, display: "flex", justifyContent: "center" }}>
          <div style={{ fontSize: 150, transform: `translateX(${interpolate(kick, [0, 1], [520, 40])}px) rotate(${interpolate(kick, [0, 1], [44, -12])}deg) scaleX(-1)` }}>🦵</div>
        </div>
      )}
      {impact && <div style={{ position: "absolute", left: 0, right: 0, top: 880, textAlign: "center", fontSize: 100, opacity: 1 - ramp(lf, 88, 92) }}>💥</div>}
    </AbsoluteFill>
  );
};

// ===== CTA =====
const CTA: React.FC<{ s: number }> = ({ s }) => {
  const frame = useCurrentFrame(); const local = frame - fr(s); if (local < 0) return null; const a = eOut(frame, fr(s) + 2, 12); const pulse = 1 + Math.sin(frame / 7) * 0.03;
  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      {Array.from({ length: 10 }, (_, i) => { const p = eOut(frame, fr(s) + 4 + i, 26); const ang = (i / 10) * Math.PI * 2; if (p <= 0 || p >= 1) return null; return <div key={i} style={{ position: "absolute", left: 540 + Math.cos(ang) * p * 330, top: 820 + Math.sin(ang) * p * 330, fontSize: 28, opacity: Math.sin(p * Math.PI), color: [SLATE, CLAY, AMBER, GREEN][i % 4] }}>✦</div>; })}
      <div style={{ marginTop: -120, opacity: a, transform: `scale(${0.7 + a * 0.3})` }}><ClaudeMark size={176} /></div>
      <div style={{ marginTop: 44, transform: `scale(${pulse})`, padding: "28px 56px", borderRadius: 999, background: SLATE, color: "#fff", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 70, boxShadow: "0 24px 54px rgba(58,92,132,0.4)", opacity: a }}>💬 Comment "STEAL"</div>
      <div style={{ marginTop: 28, fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 600, fontSize: 42, color: INK, opacity: a }}>and I'll send all 7 prompts to your inbox</div>
    </AbsoluteFill>
  );
};

// ===== SFX / bg =====
const Sfx: React.FC<{ at: number; src: string; vol?: number }> = ({ at, src, vol = 0.4 }) => (<Sequence from={fr(at)} durationInFrames={fr(1.2)}><Audio src={staticFile(`sfx/${src}`)} volume={vol} /></Sequence>);
const ITEM_SOUNDS = ["swish", "swooshup", "swish", "swooshup", "swish", "swooshup", "swish"];
const SfxTrack: React.FC = () => (<>
  <Sfx at={L[0]} src="swooshup.wav" vol={0.3} />{[0, 1, 2, 3, 4].map((i) => <Sfx key={i} at={L[0] + 0.5 + i * 0.12} src="key.wav" vol={0.16} />)}
  <Sfx at={L[1]} src="swooshup.wav" vol={0.3} />{[0, 1, 2, 3, 4, 5, 6].map((i) => <Sfx key={i} at={L[1] + 0.4 + i * 0.18} src="pop.wav" vol={0.18} />)}<Sfx at={L[1] + 3.4} src="impact.wav" vol={0.26} />
  {[2, 3, 4, 5, 6, 7, 8].map((b, i) => (<React.Fragment key={b}>
    <Sfx at={L[b]} src={`${ITEM_SOUNDS[i]}.wav`} vol={0.28} />
    <Sfx at={L[b] + 0.8} src="blip3.wav" vol={0.22} />
    <Sfx at={L[b] + 1.6} src={b === 6 ? "chimehi.wav" : "tick.wav"} vol={0.22} />
  </React.Fragment>))}
  <Sfx at={L[9]} src="resolve.wav" vol={0.34} /><Sfx at={L[9] + 0.6} src="sparkle.wav" vol={0.3} />
</>);
const Ambient: React.FC = () => {
  const frame = useCurrentFrame(); const t = frame / FPS;
  return (<AbsoluteFill style={{ pointerEvents: "none" }}>{Array.from({ length: 11 }, (_, i) => {
    const x = rnd(i, 11) * 1060 + 10, y = rnd(i, 12) * 1880 + 20; const dx = Math.sin((t + i * 1.7) / (5 + rnd(i, 13) * 4)) * 40, dy = Math.cos((t + i * 2.1) / (6 + rnd(i, 14) * 4)) * 36;
    const size = 6 + rnd(i, 15) * 10; const tw = 0.3 + 0.7 * (Math.sin(t * 1.4 + i * 2) * 0.5 + 0.5); const isSpark = rnd(i, 16) > 0.55; const col = [SLATE, SLATE2, AMBER, MUTE][Math.floor(rnd(i, 17) * 4)];
    return isSpark ? <div key={i} style={{ position: "absolute", left: x + dx, top: y + dy, fontSize: size, color: col, opacity: tw * 0.32 }}>✦</div> : <div key={i} style={{ position: "absolute", left: x + dx, top: y + dy, width: size, height: size, borderRadius: "50%", background: col, opacity: tw * 0.15 }} />;
  })}</AbsoluteFill>);
};
const Background: React.FC = () => {
  const frame = useCurrentFrame(); const drift = Math.sin(frame / 90) * 6;
  return (<AbsoluteFill style={{ backgroundColor: CREAM }}>
    <AbsoluteFill style={{ transform: `translate(${drift}px,${drift * 0.6}px)`, backgroundImage: "linear-gradient(rgba(26,24,19,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(26,24,19,0.08) 1px,transparent 1px)", backgroundSize: "66px 66px" }} />
    <AbsoluteFill style={{ opacity: 0.05, mixBlendMode: "multiply" }}><svg width="100%" height="100%"><filter id="ppLi"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves={2} stitchTiles="stitch" /></filter><rect width="100%" height="100%" filter="url(#ppLi)" /></svg></AbsoluteFill>
    <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 42%, rgba(0,0,0,0) 58%, rgba(40,32,20,0.09) 100%)" }} />
  </AbsoluteFill>);
};

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
        <div><span style={{ color: CLAY }}>7</span> jobs you can stop</div>
        <div style={{ opacity: l2 }}><span style={{ color: CLAY }}>paying</span> agencies for.</div>
      </div>
    </div>
  );
};

export const ClaudeListicleReel: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 16, 28], [1.0, 1.09, 1.0], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  return (
    <AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
      <Audio src={staticFile("vo_listicle.wav")} />
      <Audio src={staticFile("ados_bed.wav")} volume={0.25} />
      <SfxTrack />
      {/* engagement audio (STANDING): opening zoom punch SFX + post-hook metallic riser */}
      <Sequence from={0} durationInFrames={fr(1)}><Audio src={staticFile("sfx/riser.wav")} volume={0.3} /></Sequence>
      <Sequence from={0} durationInFrames={fr(1)}><Audio src={staticFile("sfx/swooshup.wav")} volume={0.3} /></Sequence>
      <Sequence from={fr(0.5)} durationInFrames={fr(1)}><Audio src={staticFile("sfx/boom.wav")} volume={0.34} /></Sequence>
      <Sequence from={fr(0.5)} durationInFrames={fr(1)}><Audio src={staticFile("sfx/shimmer.wav")} volume={0.3} /></Sequence>
      <Sequence from={fr(Math.max(0, L[1] - 1.8))} durationInFrames={fr(2.3)}><Audio src={staticFile("sfx/metal_riser.wav")} volume={0.82} /></Sequence>
      <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "50% 46%" }}>
      <Background />
      <Ambient />

      <Scene s={L[0]} e={L[1]}><Hook1 s={L[0]} /></Scene>
      <Scene s={L[1]} e={L[2]}><Hook2 s={L[1]} /></Scene>

      <Scene s={L[2]} e={L[3]}><Header n={1} s={L[2]} text="Teardown their pitch" /><Mock><M1 s={L[2]} /></Mock></Scene>
      <Scene s={L[3]} e={L[4]}><Header n={2} s={L[3]} text="Kill every objection" /><Mock><M2 s={L[3]} /></Mock></Scene>
      <Scene s={L[4]} e={L[5]}><Header n={3} s={L[4]} text="Rank features by $" /><Mock><M3 s={L[4]} /></Mock></Scene>
      <Scene s={L[5]} e={L[6]}><Header n={4} s={L[5]} text="1 post → 30 days" /><Mock><M4 s={L[5]} /></Mock></Scene>
      <Scene s={L[6]} e={L[7]}><Header n={5} s={L[6]} text="Steal their roadmap" illegal /><Mock><M5 s={L[6]} /></Mock></Scene>
      <Scene s={L[7]} e={L[8]}><Header n={6} s={L[7]} text="Win back churn" /><Mock><M6 s={L[7]} /></Mock></Scene>
      <Scene s={L[8]} e={L[9]}><Header n={7} s={L[8]} text="Human cold email" /><Mock><M7 s={L[8]} /></Mock></Scene>

      <CTA s={L[9]} />
      <HeroHeader />
      <Captions />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
