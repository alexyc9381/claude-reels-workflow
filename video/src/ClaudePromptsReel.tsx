import React from "react";
import { AbsoluteFill, Audio, Easing, Sequence, interpolate, interpolateColors, staticFile, useCurrentFrame } from "remotion";
import { fraunces, frauncesItalic, inter } from "./fonts";
import wordsData from "./data/words_prompts.json";

/**
 * ClaudePromptsReel — "3 Claude prompts that feel illegal to know" (competitive espionage).
 * VISUAL-HEAVY, action-driven, near-zero text. Hook = glowing classified envelope + spy;
 * ① fortress under siege; ② customer defection (competitor collapses); ③ decoder → roadmap + rocket.
 */
const CREAM = "#ECE9E2", INK = "#1A1813", SLATE = "#3A5C84", SLATE2 = "#5C7CA8", CLAY = "#D2724E", AMBER = "#CF9544", GREEN = "#3F9E74", MUTE = "#9A968B", RED = "#C1503C", GOLD = "#FFE0A0";
const FPS = 30; const fr = (s: number) => s * FPS;
const eOut = (f: number, sF: number, d = 10) => interpolate(f, [sF, sF + d], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
const ramp = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const over = (f: number, sF: number, d = 12) => interpolate(f, [sF, sF + d * 0.55, sF + d], [0, 1.14, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
const frac = (x: number) => x - Math.floor(x); const rnd = (i: number, s = 0) => frac(Math.sin(i * 12.9898 + s * 78.233) * 43758.5453);
const CLAUDE_PATH = "m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z";

const L = [0.0, 5.02, 16.71, 26.98, 35.1];
const VEND = 36.88;

type Word = { word: string; start: number; end: number; line: number };
const WORDS = wordsData as Word[];
const cleanw = (w: string) => w.toLowerCase().replace(/[^a-z']/g, "");
const EMPH = new Set(["illegal", "espionage", "red", "team", "playbook", "weakness", "steal", "customers", "positioning", "roadmap", "reverse", "confession", "strategy", "war", "competitor's", "rival's"]);

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
    if (c.line === 4) return null;
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
const Header: React.FC<{ n: number; s: number; text: string; illegal?: boolean }> = ({ n, s, text, illegal }) => {
  const f = useCurrentFrame(); const e = eOut(f, fr(s) + 1, 8); const pop = 1 + (illegal ? Math.sin(f / 7) * 0.03 : 0);
  return (
    <div style={{ position: "absolute", top: 392, left: 0, right: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 20, opacity: e }}>
      <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 86, height: 86, borderRadius: "50%", background: illegal ? "linear-gradient(150deg,#E08A66,#B24A2C)" : "linear-gradient(150deg,#4A6B96,#324B6E)", color: "#fff", fontFamily: fraunces.fontFamily, fontWeight: 800, fontSize: 48, boxShadow: illegal ? "0 14px 32px rgba(178,74,44,0.42)" : "0 14px 28px rgba(40,32,20,0.24)", transform: `scale(${(0.5 + e * 0.5) * pop})` }}>{n}</span>
      <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 46, letterSpacing: "0.01em", color: illegal ? CLAY : INK, textTransform: "uppercase" }}>{text}</span>
    </div>
  );
};
const Stage: React.FC<{ children: React.ReactNode }> = ({ children }) => (<div style={{ position: "absolute", top: 560, left: 0, right: 0, height: 540, display: "flex", alignItems: "center", justifyContent: "center" }}>{children}</div>);

// ===== HOOK — glowing classified envelope + spy =====
const Spy: React.FC = () => (
  <div style={{ position: "relative", width: 150, height: 170 }}>
    <div style={{ position: "absolute", bottom: 0, left: 14, width: 122, height: 112, borderRadius: "62px 62px 0 0", background: "#33414F" }} />
    <div style={{ position: "absolute", bottom: 78, left: 30, width: 90, height: 44, borderRadius: "44px 44px 0 0", background: "#3E4E5E" }} />
    <div style={{ position: "absolute", top: 38, left: 44, width: 62, height: 62, borderRadius: "50%", background: "#E2C09C" }} />
    <div style={{ position: "absolute", top: 62, left: 50, width: 50, height: 15, borderRadius: 8, background: "#15181C", boxShadow: "0 0 8px rgba(255,255,255,0.4) inset" }} />
    <div style={{ position: "absolute", top: 32, left: 30, width: 90, height: 20, borderRadius: "50%", background: "#202C38" }} />
    <div style={{ position: "absolute", top: 8, left: 47, width: 56, height: 32, borderRadius: "12px 12px 4px 4px", background: "#27343F" }} />
    <div style={{ position: "absolute", top: 31, left: 47, width: 56, height: 8, background: "#1A242E" }} />
  </div>
);
const Hook: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const lf = f - fr(s);
  const flap = interpolate(lf, [5, 22], [0, -168], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const glow = eOut(f, fr(s) + 3, 13);
  const paperY = interpolate(lf, [15, 44], [30, -200], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const paperO = eOut(f, fr(s) + 14, 9);
  const stamp = over(f, fr(s) + 48, 11);
  const spy = eOut(f, fr(s) + 44, 14);
  const flash = 1 - ramp(lf, 2, 17);
  return (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ position: "relative", marginTop: -70, width: 600, height: 520, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "absolute", left: "50%", top: "46%", width: 660, height: 660, marginLeft: -330, marginTop: -330, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,224,150,0.85) 0%, rgba(255,210,130,0.32) 32%, rgba(255,210,130,0) 66%)", opacity: glow * 0.9, filter: "blur(3px)" }} />
        <div style={{ position: "absolute", left: "50%", top: "44%", opacity: glow * 0.55, transform: `translate(-50%,-50%) rotate(${lf * 0.5}deg)` }}>
          {Array.from({ length: 12 }, (_, i) => (<div key={i} style={{ position: "absolute", left: -5, top: -280, width: 10, height: 280, transformOrigin: "5px 280px", transform: `rotate(${i * 30}deg)`, background: "linear-gradient(rgba(255,225,150,0.5), rgba(255,225,150,0))" }} />))}
        </div>
        {spy > 0.01 && <div style={{ position: "absolute", left: "50%", top: -168, transform: `translateX(-50%) translateY(${(1 - spy) * 280}px) scale(2.15)`, transformOrigin: "center top", opacity: spy, zIndex: 2 }}><Spy /></div>}
        <div style={{ position: "absolute", left: "50%", marginLeft: -172, top: `calc(52% + ${paperY}px)`, width: 344, height: 300, borderRadius: 16, background: "#FBF7EF", boxShadow: `0 0 ${28 + glow * 34}px rgba(255,208,128,0.75), 0 26px 50px rgba(40,32,20,0.2)`, opacity: paperO, zIndex: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ position: "absolute", top: -22, left: 26 }}><ClaudeMark size={58} /></div>
          {stamp > 0.01 && <div style={{ padding: "14px 28px", border: `5px solid ${RED}`, borderRadius: 12, color: RED, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 50, letterSpacing: "0.07em", transform: `rotate(-8deg) scale(${stamp})`, opacity: 0.95 }}>CLASSIFIED</div>}
          <div style={{ position: "absolute", bottom: 18, right: 22, width: 72, height: 72, borderRadius: "50%", background: "radial-gradient(circle at 38% 32%, #E89B79, #B24A2C)", boxShadow: "inset 0 4px 8px rgba(0,0,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: fraunces.fontFamily, fontWeight: 800, fontSize: 44, opacity: paperO }}>3</div>
        </div>
        <div style={{ position: "absolute", left: "50%", marginLeft: -200, top: "52%", width: 400, height: 256 }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: "6px 6px 16px 16px", background: "linear-gradient(160deg,#E0CDA6,#CBB68C)", boxShadow: "0 30px 60px rgba(40,32,20,0.24)", zIndex: 3 }} />
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 130, transformOrigin: "top", transform: `perspective(800px) rotateX(${flap}deg)`, zIndex: 4 }}>
            <div style={{ width: 0, height: 0, margin: "0 auto", borderLeft: "200px solid transparent", borderRight: "200px solid transparent", borderTop: "128px solid #D3BF96" }} />
          </div>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 188, borderRadius: "12px 12px 16px 16px", background: "linear-gradient(160deg,#D8C49A,#C3AD83)", boxShadow: "inset 0 3px 6px rgba(255,255,255,0.25)", zIndex: 8 }} />
        </div>
        {/* opening flash ring */}
        {flash > 0.01 && <div style={{ position: "absolute", left: "50%", top: "46%", width: 40 + (1 - flash) * 600, height: 40 + (1 - flash) * 600, marginLeft: -(20 + (1 - flash) * 300), marginTop: -(20 + (1 - flash) * 300), borderRadius: "50%", border: `5px solid rgba(255,220,140,${flash * 0.85})`, zIndex: 10 }} />}
        {/* fireworks burst — two radiating waves of sparkles */}
        {Array.from({ length: 24 }, (_, i) => { const k = i % 12; const wave = i < 12 ? 3 : 11; const t = ramp(lf, wave + k * 0.5, wave + 24 + k * 0.5); if (t <= 0 || t >= 1) return null; const a = (k / 12) * Math.PI * 2 + (i < 12 ? 0 : 0.26); const r = t * (170 + rnd(i, 9) * 170); const star = i % 3 === 0; return <div key={"b" + i} style={{ position: "absolute", left: 300 + Math.cos(a) * r, top: 250 + Math.sin(a) * r, fontSize: star ? 24 : undefined, width: star ? undefined : 9, height: star ? undefined : 9, borderRadius: star ? undefined : "50%", background: star ? "transparent" : (i % 2 ? GOLD : "#FFF3D6"), color: GOLD, opacity: (1 - t) * 0.95, zIndex: 10 }}>{star ? "✦" : ""}</div>; })}
        {/* drifting gold dust */}
        {Array.from({ length: 18 }, (_, i) => { const t = ramp(lf, 4 + i * 2, 74 + i * 2); if (t <= 0) return null; const a = rnd(i, 5) * Math.PI * 2; const r = 30 + rnd(i, 6) * 210; return <div key={i} style={{ position: "absolute", left: 290 + Math.cos(a) * r * t, top: 240 - t * 200 - rnd(i, 7) * 50, width: 7 + rnd(i, 8) * 9, height: 7 + rnd(i, 8) * 9, borderRadius: "50%", background: i % 2 ? GOLD : "#F6EFE6", opacity: (1 - t) * Math.min(1, glow + 0.2), zIndex: 9 }} />; })}
      </div>
    </AbsoluteFill>
  );
};

// ===== ITEM 1 — YOUR COMPANY (office tower) ATTACKED → weak points exposed =====
const M1: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const lf = f - fr(s);
  const asm = over(f, fr(s) + 4, 14); const cIn = eOut(f, fr(s) + 50, 12);
  const strikes = [122, 170, 218]; const bX = 470, bY = 50, cX = 70, cY = 250;
  const weak = [{ x: 58, y: 130 }, { x: 178, y: 210 }, { x: 110, y: 290 }];
  const lit = strikes.map((l) => lf > l + 18);
  const lean = ramp(lf, 256, 320) * 4;
  const shudder = strikes.some((l) => lf > l + 16 && lf < l + 26) ? Math.sin(lf * 3) * 7 : 0;
  const firing = strikes.some((l) => lf >= l - 3 && lf < l + 6);
  return (
    <Stage>
      <div style={{ position: "relative", width: 920, height: 480 }}>
        {/* your company = modern office tower */}
        <div style={{ position: "absolute", left: bX, top: bY, width: 240, height: 374, transform: `translateX(${shudder}px) rotate(${lean}deg) scale(${0.76 + asm * 0.24})`, transformOrigin: "bottom center", opacity: Math.min(1, asm * 1.3) }}>
          <div style={{ position: "absolute", top: 6, left: "50%", marginLeft: -42, width: 84, height: 30, borderRadius: 8, background: "#33506F", boxShadow: "0 6px 14px rgba(40,32,20,0.18)" }}><div style={{ width: 22, height: 22, borderRadius: 6, background: "#fff", margin: "4px auto" }} /></div>
          <div style={{ position: "absolute", top: 38, left: 0, right: 0, bottom: 0, borderRadius: "8px 8px 5px 5px", background: "linear-gradient(160deg,#507099,#33506F)", boxShadow: "0 26px 48px rgba(40,32,20,0.24)" }} />
          <div style={{ position: "absolute", top: 56, left: 22, right: 22, bottom: 16, display: "grid", gridTemplateColumns: "repeat(4,1fr)", gridAutoRows: "30px", gap: 11 }}>{Array.from({ length: 28 }, (_, i) => <div key={i} style={{ borderRadius: 4, background: "rgba(255,255,255,0.5)" }} />)}</div>
          {weak.map((w, i) => lit[i] && (<div key={i} style={{ position: "absolute", left: w.x, top: w.y }}>
            <svg width={66} height={66} style={{ position: "absolute", left: -33, top: -33 }}><path d="M33 8 l-7 17 l11 8 l-9 17 l13 9" stroke="#C1503C" strokeWidth={3.5} fill="none" strokeLinecap="round" /></svg>
            <div style={{ position: "absolute", left: -24, top: -24, width: 48, height: 48, borderRadius: "50%", background: "#fff", border: "3px solid #C1503C", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, boxShadow: `0 0 ${12 + Math.sin((f + i * 9) / 6) * 9}px rgba(193,80,60,0.55)`, transform: `scale(${over(f, fr(s) + strikes[i] + 18, 8)})` }}>⚠️</div>
          </div>))}
        </div>
        {/* Claude red-team (attacker) */}
        <div style={{ position: "absolute", left: cX, top: cY, opacity: cIn, transform: `translateX(${(1 - cIn) * -34}px)` }}>
          <div style={{ position: "absolute", left: -22, top: -22, width: 150, height: 150, borderRadius: "50%", background: "radial-gradient(circle, rgba(193,80,60,0.28), rgba(193,80,60,0))", opacity: firing ? 1 : 0.4 }} />
          <ClaudeMark size={108} />
        </div>
        {/* attack pulses from Claude to the weak points */}
        {strikes.map((l, i) => { const t = ramp(lf, l, l + 18); if (t <= 0 || t >= 1) return null; const x0 = cX + 110, y0 = cY + 40, x1 = bX + weak[i].x, y1 = bY + weak[i].y; const x = x0 + t * (x1 - x0), y = y0 + t * (y1 - y0); return <div key={i} style={{ position: "absolute", left: x - 14, top: y - 14, width: 28, height: 28, borderRadius: "50%", background: "radial-gradient(circle,#ff6a4d,#C1503C)", boxShadow: "0 0 18px rgba(193,80,60,0.7)" }} />; })}
        {strikes.map((l, i) => { const d = lf - (l + 16); if (d < 0 || d > 10) return null; return <div key={"im" + i} style={{ position: "absolute", left: bX + weak[i].x - 36, top: bY + weak[i].y - 36, fontSize: 70, opacity: 1 - d / 10, transform: `scale(${0.8 + d / 10})` }}>💥</div>; })}
      </div>
    </Stage>
  );
};

// ===== ITEM 2 — DEFECTION: crowd leaves competitor (it collapses) for you =====
const Figure: React.FC<{ x: number; y: number; col: string; coin: boolean; sc: number }> = ({ x, y, col, coin, sc }) => (
  <div style={{ position: "absolute", left: x, bottom: y, transform: `scale(${sc})` }}>
    {coin && <div style={{ width: 22, height: 22, borderRadius: "50%", background: GREEN, color: "#fff", fontWeight: 900, fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 3px" }}>$</div>}
    <div style={{ width: 28, height: 28, borderRadius: "50%", background: col, margin: "0 auto" }} />
    <div style={{ width: 36, height: 42, borderRadius: "15px 15px 8px 8px", background: col, marginTop: 2 }} />
  </div>
);
const M2: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const lf = f - fr(s);
  const inB = over(f, fr(s) + 4, 12); const N = 9; const startX = 250, endX = 690, mid = (startX + endX) / 2;
  const arrived = Array.from({ length: N }).filter((_, i) => ramp(lf, 34 + i * 13, 132 + i * 13) >= 0.99).length;
  const decline = ramp(lf, 250, 320);
  return (
    <Stage>
      <div style={{ position: "relative", width: 920, height: 470 }}>
        {/* competitor (cold) — collapses as customers leave */}
        <div style={{ position: "absolute", left: 30, bottom: 60, width: 220, height: 300, borderRadius: 16, background: "linear-gradient(160deg,#5C7CA8,#3A5C84)", boxShadow: "0 24px 46px rgba(40,32,20,0.2)", transform: `translateY(${(1 - inB) * 40}px) rotate(${decline * 7}deg)`, transformOrigin: "bottom right", opacity: Math.min(1, inB * 1.3) }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, padding: 26 }}>{Array.from({ length: 9 }, (_, i) => { const dark = ramp(lf, 70 + i * 22, 90 + i * 22); return <div key={i} style={{ height: 34, borderRadius: 5, background: `rgba(255,255,255,${0.24 * (1 - dark) + 0.04})` }} />; })}</div>
          {decline > 0.4 && <div style={{ position: "absolute", top: -54, left: "50%", marginLeft: -24, fontSize: 54, opacity: decline }}>📉</div>}
        </div>
        {/* your building (warm) — grows */}
        <div style={{ position: "absolute", right: 30, bottom: 60, width: 244, height: 322, borderRadius: 20, background: "linear-gradient(160deg,#E89B79,#C5603C)", boxShadow: `0 24px 54px rgba(197,96,60,${0.32 + Math.sin(f / 8) * 0.08 + arrived * 0.03})`, transform: `translateY(${(1 - inB) * 40}px) scale(${1 + arrived * 0.012})`, transformOrigin: "bottom center", opacity: Math.min(1, inB * 1.3) }}>
          <div style={{ position: "absolute", top: -58, left: "50%", marginLeft: -46, transform: `translateY(${Math.sin(f / 6) * 5}px) scale(${1 + Math.sin(f / 8) * 0.06})` }}><ClaudeMark size={92} /></div>
          <div style={{ position: "absolute", bottom: 0, left: "50%", marginLeft: -38, width: 76, height: 100, borderRadius: "12px 12px 0 0", background: "radial-gradient(circle at 50% 30%, #FFE7C2, #F2B985)", boxShadow: `0 0 ${40 + arrived * 6}px rgba(255,200,120,0.8)` }} />
        </div>
        {/* flowing path */}
        <div style={{ position: "absolute", left: startX, right: 234, bottom: 96, height: 6, backgroundImage: "repeating-linear-gradient(90deg,#C9B89A 0 18px,transparent 18px 34px)", backgroundPositionX: `${-(lf * 2.4) % 34}px`, opacity: 0.7 }} />
        {/* crowd */}
        {Array.from({ length: N }, (_, i) => { const t = ramp(lf, 34 + i * 13, 132 + i * 13); if (t <= 0 || t >= 1) return null; const x = startX + t * (endX - startX); const bob = Math.sin((lf + i * 18) / 5) * 6; const col = interpolateColors(x, [mid - 60, mid + 60], [SLATE2, CLAY]);
          return <Figure key={i} x={x} y={100 + bob} col={col} coin={i % 3 === 0} sc={0.85 + t * 0.25} />; })}
        {/* counter — top center, clear of buildings */}
        {arrived > 0 && <div style={{ position: "absolute", left: 0, right: 0, top: -28, textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 800, fontSize: 54, color: GREEN }}>+{arrived}</div>}
      </div>
    </Stage>
  );
};

// ===== ITEM 3 — DECODER WORKFLOW → roadmap + rocket =====
const Gear: React.FC<{ x: number; y: number; r: number; dir: number; f: number; col: string }> = ({ x, y, r, dir, f, col }) => (
  <g transform={`rotate(${f * dir * 2} ${x} ${y})`}>{Array.from({ length: 8 }, (_, i) => { const a = (i / 8) * Math.PI * 2; return <rect key={i} x={x - 3} y={y - r - 5} width={6} height={8} fill={col} transform={`rotate(${(i / 8) * 360} ${x} ${y})`} />; })}<circle cx={x} cy={y} r={r} fill={col} /><circle cx={x} cy={y} r={r * 0.4} fill="#fff" /></g>
);
// Arc-length sampler for the EXACT roadmap path "M42 266 Q156 266 214 168 T396 76 L470 76"
// so pins/rocket sit ON the curve (the smooth T reflects the prior control -> Q272,70 396,76).
const RM_PTS = (() => {
  const q = (p0: number[], p1: number[], p2: number[], u: number): [number, number] => [
    (1 - u) * (1 - u) * p0[0] + 2 * (1 - u) * u * p1[0] + u * u * p2[0],
    (1 - u) * (1 - u) * p0[1] + 2 * (1 - u) * u * p1[1] + u * u * p2[1],
  ];
  const pts: [number, number][] = []; const S = 48;
  for (let i = 0; i <= S; i++) pts.push(q([42, 266], [156, 266], [214, 168], i / S));
  for (let i = 1; i <= S; i++) pts.push(q([214, 168], [272, 70], [396, 76], i / S));
  for (let i = 1; i <= S; i++) pts.push([396 + (470 - 396) * (i / S), 76]);
  const cl = [0];
  for (let i = 1; i < pts.length; i++) cl.push(cl[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  return { pts, cl, total: cl[cl.length - 1] };
})();
const rmAt = (t: number): [number, number] => {
  const { pts, cl, total } = RM_PTS;
  const target = Math.max(0, Math.min(1, t)) * total;
  let i = 1; while (i < cl.length && cl[i] < target) i++;
  const i0 = i - 1; const seg = cl[i] - cl[i0] || 1; const fr2 = (target - cl[i0]) / seg;
  return [pts[i0][0] + (pts[i][0] - pts[i0][0]) * fr2, pts[i0][1] + (pts[i][1] - pts[i0][1]) * fr2];
};

const M3: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame(); const lf = f - fr(s);
  const unroll = ramp(lf, 90, 116); const draw = ramp(lf, 122, 198);
  const pins = [{ d: 0.36, e: "🚩" }, { d: 0.64, e: "🌐" }, { d: 0.95, e: "🔑" }];
  const BPL = 400, BPT = 66, BPW = 500, BPH = 312;
  const pinXY = rmAt;
  const rocketT = ramp(lf, 152, 226); const [rx, ry] = pinXY(rocketT);
  const scanning = lf > 40 && lf < 120;
  return (
    <Stage>
      <div style={{ position: "relative", width: 980, height: 470 }}>
        {/* conveyor belt */}
        <div style={{ position: "absolute", left: 0, top: 256, width: 196, height: 18, borderRadius: 9, background: "#D8D2C4", overflow: "hidden" }}>
          <div style={{ width: "200%", height: "100%", backgroundImage: "repeating-linear-gradient(90deg,#BDB6A6 0 14px,#D8D2C4 14px 28px)", transform: `translateX(${-(lf * 3) % 28}px)` }} />
        </div>
        {/* job cards feeding in */}
        {[0, 1, 2].map((i) => { const e = eOut(f, fr(s) + 6 + i * 7, 8); const feed = ramp(lf, 6 + i * 26, 56 + i * 26); const x = 2 + i * 11 + feed * 150; const gone = feed > 0.9 ? 1 - ramp(lf, 54 + i * 26, 68 + i * 26) : 1;
          return <div key={i} style={{ position: "absolute", left: x, top: 134 - i * 10, width: 118, height: 102, borderRadius: 14, background: "linear-gradient(155deg,#E89B79,#C5603C)", boxShadow: "0 12px 26px rgba(40,32,20,0.16)", opacity: Math.min(1, e * 1.3) * gone, transform: `translateY(${(1 - e) * 18}px)`, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 6 }}>
            <div style={{ fontSize: 34 }}>💼</div>
            <div style={{ width: 68, height: 6, borderRadius: 3, background: "rgba(255,255,255,0.5)" }} /><div style={{ width: 48, height: 6, borderRadius: 3, background: "rgba(255,255,255,0.4)" }} />
          </div>; })}
        {/* BIGGER decoder machine */}
        <div style={{ position: "absolute", left: 178, top: 100, width: 208, height: 240, borderRadius: 26, background: "linear-gradient(160deg,#4A6B96,#2E4668)", boxShadow: "0 24px 46px rgba(40,32,20,0.24)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
          <svg style={{ position: "absolute", top: 10, left: 10 }} width={54} height={54}><Gear x={27} y={27} r={12} dir={1} f={f} col="rgba(255,255,255,0.32)" /></svg>
          <svg style={{ position: "absolute", bottom: 8, right: 10 }} width={44} height={44}><Gear x={22} y={22} r={9} dir={-1} f={f} col="rgba(255,255,255,0.26)" /></svg>
          <div style={{ width: 128, height: 128, borderRadius: "50%", background: "rgba(0,0,0,0.18)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: scanning ? "0 0 32px rgba(255,255,255,0.5) inset" : "none" }}><ClaudeMark size={90} /></div>
          {scanning && <div style={{ position: "absolute", left: 0, right: 0, top: `${((lf * 4) % 240)}px`, height: 6, background: "rgba(255,255,255,0.85)", boxShadow: "0 0 18px rgba(255,255,255,0.9)" }} />}
        </div>
        {/* OUTPUT — their secret blueprint unrolls */}
        {unroll > 0.02 && <div style={{ position: "absolute", left: BPL, top: BPT, width: BPW, height: BPH, transformOrigin: "left center", transform: `scaleX(${unroll})` }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: 12, backgroundColor: "#34536F", boxShadow: "0 20px 40px rgba(40,32,20,0.24)", backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.1) 1px,transparent 1px)", backgroundSize: "34px 34px" }} />
          <div style={{ position: "absolute", top: 14, left: 16, width: 30, height: 30, borderRadius: 8, background: CLAY }} />
          <svg style={{ position: "absolute", inset: 0, overflow: "visible" }} width={BPW} height={BPH} viewBox={`0 0 ${BPW} ${BPH}`}>
            <path d="M42 266 Q156 266 214 168 T396 76 L470 76" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth={8} strokeLinecap="round" strokeDasharray="2 14" />
            <path d="M42 266 Q156 266 214 168 T396 76 L470 76" fill="none" stroke={CLAY} strokeWidth={8} strokeLinecap="round" pathLength={100} strokeDasharray={100} strokeDashoffset={100 * (1 - draw)} style={{ filter: "drop-shadow(0 0 8px rgba(210,114,78,0.6))" }} />
          </svg>
          {/* milestone nodes sit EXACTLY on the path points (centered on the curve) */}
          {pins.map((pn, i) => { const lit = draw >= pn.d ? over(f, fr(s) + 122 + pn.d * 74, 10) : 0; const [px, py] = pinXY(pn.d); const ringT = draw >= pn.d ? ramp(lf, 122 + pn.d * 74, 148 + pn.d * 74) : 0; const RW = 56 * (1 + ringT * 1.6);
            return (<div key={i} style={{ position: "absolute", left: px, top: py, opacity: Math.min(1, lit) }}>
              {ringT > 0 && ringT < 1 && <div style={{ position: "absolute", left: -RW / 2, top: -RW / 2, width: RW, height: RW, borderRadius: "50%", border: "3px solid #fff", opacity: 1 - ringT }} />}
              <div style={{ position: "absolute", left: -28, top: -28, width: 56, height: 56, borderRadius: "50%", background: "#FBF7EF", border: `4px solid ${CLAY}`, boxShadow: "0 6px 16px rgba(0,0,0,0.32)", transform: `scale(${lit})`, transformOrigin: "50% 50%", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: 28 }}>{pn.e}</span></div>
            </div>); })}
          {rocketT > 0.02 && rocketT < 0.99 && <div style={{ position: "absolute", left: rx - 20, top: ry - 20, fontSize: 40, transform: "rotate(-32deg)", filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))" }}>🚀</div>}
        </div>}
        {/* roll cylinder at the unrolling edge */}
        {unroll > 0.02 && unroll < 0.99 && <div style={{ position: "absolute", left: BPL + BPW * unroll - 16, top: BPT - 12, width: 32, height: BPH + 24, borderRadius: 16, background: "linear-gradient(90deg,#E89B79,#B24A2C)", boxShadow: "0 8px 18px rgba(40,32,20,0.24)", zIndex: 5 }} />}
      </div>
    </Stage>
  );
};

// ===== CTA =====
const CTA: React.FC<{ s: number }> = ({ s }) => {
  const frame = useCurrentFrame(); const local = frame - fr(s); if (local < 0) return null; const a = eOut(frame, fr(s) + 2, 12); const pulse = 1 + Math.sin(frame / 7) * 0.03;
  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      {Array.from({ length: 10 }, (_, i) => { const p = eOut(frame, fr(s) + 4 + i, 26); const ang = (i / 10) * Math.PI * 2; if (p <= 0 || p >= 1) return null; return <div key={i} style={{ position: "absolute", left: 540 + Math.cos(ang) * p * 330, top: 820 + Math.sin(ang) * p * 330, fontSize: 28, opacity: Math.sin(p * Math.PI), color: [SLATE, CLAY, AMBER, GREEN][i % 4] }}>✦</div>; })}
      <div style={{ marginTop: -120, opacity: a, transform: `scale(${0.7 + a * 0.3})` }}><ClaudeMark size={176} /></div>
      <div style={{ marginTop: 44, transform: `scale(${pulse})`, padding: "28px 56px", borderRadius: 999, background: SLATE, color: "#fff", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 72, boxShadow: "0 24px 54px rgba(58,92,132,0.4)", opacity: a }}>💬 Comment "WAR"</div>
      <div style={{ marginTop: 28, fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 600, fontSize: 42, color: INK, opacity: a }}>and I'll send you all 3 prompts</div>
    </AbsoluteFill>
  );
};

const Sfx: React.FC<{ at: number; src: string; vol?: number }> = ({ at, src, vol = 0.4 }) => (<Sequence from={fr(at)} durationInFrames={fr(4)}><Audio src={staticFile(`sfx/${src}`)} volume={vol} /></Sequence>);
const SfxTrack: React.FC = () => (<>
  <Sfx at={L[0] + 0.6} src="swooshup.wav" vol={0.26} /><Sfx at={L[0] + 0.7} src="angelic.wav" vol={0.5} /><Sfx at={L[0] + 2.9} src="shimmer.wav" vol={0.3} />
  {[1, 2, 3].map((b) => (<React.Fragment key={b}>
    <Sfx at={L[b]} src="swish.wav" vol={0.28} /><Sfx at={L[b] + 2.6} src="data.wav" vol={0.22} /><Sfx at={L[b] + 5} src="blip3.wav" vol={0.2} /><Sfx at={L[b] + 8.5} src={b === 3 ? "chimehi.wav" : "tick.wav"} vol={0.22} />
  </React.Fragment>))}
  {/* siege impacts */}
  <Sfx at={L[1] + 4.0} src="impact.wav" vol={0.3} /><Sfx at={L[1] + 5.6} src="impact.wav" vol={0.3} /><Sfx at={L[1] + 7.3} src="boom.wav" vol={0.26} />
  <Sfx at={L[4]} src="resolve.wav" vol={0.34} /><Sfx at={L[4] + 0.6} src="sparkle.wav" vol={0.3} />
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
    <AbsoluteFill style={{ opacity: 0.05, mixBlendMode: "multiply" }}><svg width="100%" height="100%"><filter id="ppPr"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves={2} stitchTiles="stitch" /></filter><rect width="100%" height="100%" filter="url(#ppPr)" /></svg></AbsoluteFill>
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
        <div>Spy on a <span style={{ color: CLAY }}>competitor</span></div>
        <div style={{ opacity: l2 }}>in <span style={{ color: CLAY }}>3 prompts.</span></div>
      </div>
    </div>
  );
};

export const ClaudePromptsReel: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 16, 28], [1.0, 1.09, 1.0], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  return (
    <AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
      <Audio src={staticFile("vo_prompts.wav")} />
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
      <Scene s={L[0]} e={L[1]}><Hook s={L[0]} /></Scene>
      <Scene s={L[1]} e={L[2]}><Header n={1} s={L[1]} text="Attack your own company" /><M1 s={L[1]} /></Scene>
      <Scene s={L[2]} e={L[3]}><Header n={2} s={L[2]} text="Steal their customers" /><M2 s={L[2]} /></Scene>
      <Scene s={L[3]} e={L[4]}><Header n={3} s={L[3]} text="Read their roadmap" illegal /><M3 s={L[3]} /></Scene>
      <CTA s={L[4]} />
      <HeroHeader />
      <Captions />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
