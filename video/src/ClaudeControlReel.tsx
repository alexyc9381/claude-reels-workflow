import React from "react";
import { AbsoluteFill, Audio, Easing, Img, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { fraunces, frauncesItalic, inter } from "./fonts";
import wordsData from "./data/words_control.json";

/**
 * ClaudeControlReel — "Claude can now control your computer" (CONTROL, Alex VO).
 * A persistent Mac browser that Claude DRIVES: an animated cursor moves, clicks, fills forms;
 * content morphs site -> form -> tasks (forms/dashboards/pricing) -> done -> hours-saved -> CTA.
 * Frame 0 is COMPLETE (browser + cursor + working pill + header all on screen); then it animates.
 */
const CREAM = "#ECE9E2", INK = "#1A1813", SLATE = "#3A5C84", SLATE2 = "#4C7BB0", CLAY = "#D2724E", AMBER = "#CF9544", GREEN = "#3F9E74", MUTE = "#9A968B", RED = "#C44A3A";
const FPS = 30; const fr = (s: number) => s * FPS; const CX = 540;
const eOut = (f: number, sF: number, d = 10) => interpolate(f, [sF, sF + d], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
const ramp = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const over = (f: number, sF: number, d = 12) => interpolate(f, [sF, sF + d * 0.5, sF + d], [0, 1.14, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
const path = (f: number, ks: number[], vs: number[]) => interpolate(f, ks, vs, { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
const grad = (a: string, b: string) => `linear-gradient(158deg, ${a} 0%, ${b} 100%)`;
const inter9: React.CSSProperties = { fontFamily: inter.fontFamily, fontWeight: 900 };
const CLAUDE_PATH = "m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z";
const SH = "inset 0 1.5px 0 rgba(255,255,255,0.5), 0 2px 4px rgba(34,30,24,0.22), 0 12px 26px rgba(34,30,24,0.20), 0 34px 64px rgba(20,26,45,0.26)";
const BROWSH = "0 44px 90px rgba(26,24,19,0.30), 0 0 0 1px rgba(40,32,20,0.06)";

const Sheen: React.FC<{ r: number | string; o?: number }> = ({ r, o = 0.3 }) => (<div style={{ position: "absolute", inset: 0, borderRadius: r, background: `linear-gradient(125deg, rgba(255,255,255,${o}) 0%, rgba(255,255,255,0) 32%)`, pointerEvents: "none" }} />);
const Bloom: React.FC<{ cx: number; cy: number; w: number; color: string; lf: number; base?: number }> = ({ cx, cy, w, color, lf, base = 0.55 }) => (<div style={{ position: "absolute", left: cx - w / 2, top: cy - w / 2, width: w, height: w, borderRadius: "50%", background: `radial-gradient(circle at 50% 46%, ${color} 0%, transparent 62%)`, opacity: base + Math.sin(lf / 9) * 0.18, pointerEvents: "none" }} />);
const ClaudeMark: React.FC<{ size: number; glow?: number }> = ({ size, glow = 0.4 }) => (
  <div style={{ position: "relative", width: size, height: size, borderRadius: size * 0.28, background: grad("#E08A66", "#C5603C"), boxShadow: `${SH}, 0 0 ${Math.round(size * 0.34)}px rgba(210,114,78,${glow})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
    <svg viewBox="0 0 24 24" width={size * 0.58} height={size * 0.58}><path fill="#F6EFE6" d={CLAUDE_PATH} /></svg><Sheen r={size * 0.28} />
  </div>);

// ===== the cursor Claude drives =====
const Cursor: React.FC<{ x: number; y: number; click?: number }> = ({ x, y, click = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: 60, transform: `scale(${1 - click * 0.16})`, pointerEvents: "none" }}>
    {click > 0.02 && <div style={{ position: "absolute", left: -4, top: -4, width: 8, height: 8, borderRadius: "50%", border: `3px solid ${CLAY}`, opacity: (1 - click) * 0.85, transform: `translate(-50%,-50%) scale(${1 + click * 7})` }} />}
    <svg width={32} height={34} viewBox="0 0 24 26" style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.38))" }}><path d="M3 2 L20 13 L12 14.2 L8 23 Z" fill="#fff" stroke="#1A1813" strokeWidth={1.5} strokeLinejoin="round" /></svg>
  </div>);

// ===== persistent Mac browser frame Claude is controlling =====
const BL = CX - 412, BT = 596, BW = 824, BARH = 52, CONTH = 552; // content area = BL..BL+BW, top BT+BARH
const Browser: React.FC<{ children: React.ReactNode; lf: number; url?: string }> = ({ children, lf, url = "app.claude.ai" }) => (
  <div style={{ position: "absolute", left: BL, top: BT, width: BW, borderRadius: 24, overflow: "hidden", background: "#fff", boxShadow: BROWSH }}>
    <div style={{ height: BARH, background: "#F0ECE3", display: "flex", alignItems: "center", gap: 12, padding: "0 22px" }}>
      <div style={{ width: 15, height: 15, borderRadius: "50%", background: "#E36A5C" }} /><div style={{ width: 15, height: 15, borderRadius: "50%", background: "#E8B44A" }} /><div style={{ width: 15, height: 15, borderRadius: "50%", background: "#5CB87E" }} />
      <div style={{ marginLeft: 12, flex: 1, height: 30, borderRadius: 15, background: "#fff", border: "1px solid rgba(40,32,20,0.07)", display: "flex", alignItems: "center", padding: "0 16px", fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 17, color: MUTE }}>{url}</div>
      {/* the "Claude is working" pill */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 14px", borderRadius: 999, background: grad("#E08A66", "#C5603C"), boxShadow: "0 4px 12px rgba(210,114,78,0.4)" }}>
        <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#fff", opacity: 0.6 + Math.abs(Math.sin(lf / 6)) * 0.4 }} />
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 16, color: "#fff", whiteSpace: "nowrap" }}>Claude</span>
      </div>
    </div>
    <div style={{ height: CONTH, position: "relative", overflow: "hidden", background: "#fff" }}>{children}</div>
    <Sheen r={24} o={0.16} />
  </div>);

// content helpers (coords are inside the content area, 0..BW wide, 0..CONTH tall)
const Field: React.FC<{ y: number; label: string; val: string; fill: number; active: boolean }> = ({ y, label, val, fill, active }) => (
  <div style={{ position: "absolute", left: 44, top: y, width: BW - 88 }}>
    <div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 18, color: MUTE, marginBottom: 8 }}>{label}</div>
    <div style={{ height: 56, borderRadius: 13, background: "#F7F4EE", border: `2px solid ${active ? CLAY : "rgba(40,32,20,0.1)"}`, display: "flex", alignItems: "center", padding: "0 18px", fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 23, color: INK }}>
      {val.slice(0, Math.floor(fill * val.length))}{active && fill < 1 ? <span style={{ opacity: 0.6 }}>|</span> : null}
    </div>
  </div>);

// ===== captions =====
type Word = { word: string; start: number; end: number; line: number };
const WORDS = wordsData as Word[];
const cleanw = (w: string) => w.toLowerCase().replace(/[^a-z0-9']/g, "");
const EMPH = new Set(["claude", "screen", "computer", "cursor", "clicks", "websites", "forms", "dashboards", "pricing", "watch", "hours", "week", "afternoon", "crazy", "person", "comment", "control", "setup"]);
const CHUNKS = (() => { const byLine: Record<number, Word[]> = {}; for (const w of WORDS) (byLine[w.line] ||= []).push(w);
  const out: { words: Word[]; start: number; line: number }[] = [];
  for (const li of Object.keys(byLine).map(Number).sort((a, b) => a - b)) { const ws = byLine[li]; for (let i = 0; i < ws.length; i += 3) { const g = ws.slice(i, i + 3); out.push({ words: g, start: g[0].start, line: li }); } }
  const aE = Math.max(...WORDS.map((w) => w.end)); return out.map((c, i) => ({ ...c, end: i + 1 < out.length ? out[i + 1].start : aE + 0.4 })); })();
const Captions: React.FC = () => { const frame = useCurrentFrame();
  return (<>{CHUNKS.map((c, i) => { if (frame < fr(c.start) || frame >= fr(c.end)) return null; if (c.line === 6) return null;
    return (<div key={i} style={{ position: "absolute", top: 1276, left: 64, right: 64, height: 180, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "center", gap: "0 16px", width: 952, textAlign: "center" }}>
        {c.words.map((w, j) => { const g = EMPH.has(cleanw(w.word)); const shown = frame >= fr(w.start);
          return <span key={j} style={{ display: "inline-block", opacity: shown ? 1 : 0, fontFamily: g ? frauncesItalic.fontFamily : fraunces.fontFamily, fontStyle: g ? "italic" : "normal", fontWeight: g ? 700 : 600, fontSize: g ? 84 : 72, lineHeight: 1.04, color: g ? SLATE : INK, letterSpacing: "-0.02em", textShadow: "0 2px 16px rgba(236,233,226,0.95)" }}>{w.word}</span>; })}
      </div></div>); })}</>); };

const HeroHeader: React.FC = () => { const f = useCurrentFrame(); if (f > 112) return null;
  const out = eOut(f, 96, 14); // FRAME-0 RULE: full header on screen at frame 0, only fades OUT at the end
  return (<div style={{ position: "absolute", top: 318, left: 70, right: 70, opacity: 1 - out, transform: `translateY(${-out * 12}px)`, zIndex: 70 }}>
    <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 80, lineHeight: 1.02, letterSpacing: "-0.03em", color: INK, textShadow: "0 2px 18px rgba(236,233,226,0.96)" }}>
      <div><span style={{ color: CLAY }}>Claude</span> can now</div>
      <div>control your computer.</div>
    </div></div>); };

const Background: React.FC = () => { const f = useCurrentFrame(); const d = Math.sin(f / 90) * 6;
  return (<AbsoluteFill style={{ backgroundColor: CREAM }}>
    <AbsoluteFill style={{ transform: `translate(${d}px,${d * 0.6}px)`, backgroundImage: "linear-gradient(rgba(26,24,19,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(26,24,19,0.07) 1px,transparent 1px)", backgroundSize: "68px 68px" }} />
    <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 44%, rgba(0,0,0,0) 55%, rgba(40,32,20,0.10) 100%)" }} />
  </AbsoluteFill>); };

const Scene: React.FC<{ s: number; e: number; children: React.ReactNode }> = ({ s, e, children }) => {
  const frame = useCurrentFrame(); const local = frame - fr(s); const lenF = fr(e - s); if (local < 0 || local > lenF) return null;
  const inF = s <= 0 ? 1 : eOut(frame, fr(s), 5); // FRAME-0 RULE: the hook (scene 0) is fully present at frame 0, no fade-in
  const op = Math.min(inF, 1 - eOut(frame, fr(e - 0.16), 5));
  return <AbsoluteFill style={{ opacity: op }}>{children}</AbsoluteFill>; };

// abs coords for cursor (content-local x,y -> frame coords)
const ax = (cx: number) => BL + cx; const ay = (cy: number) => BT + BARH + cy;

// a glowing box on the element Claude is targeting
const Target: React.FC<{ x: number; y: number; w: number; h: number; flash: number; lf: number }> = ({ x, y, w, h, flash, lf }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, borderRadius: 14, border: `3px solid ${CLAY}`, boxShadow: `0 0 ${16 + flash * 36}px rgba(210,114,78,${0.35 + flash * 0.45})`, background: `rgba(210,114,78,${0.05 + flash * 0.16})`, opacity: 0.55 + Math.abs(Math.sin(lf / 8)) * 0.45, zIndex: 6 }} />);

// live activity feed — Claude's actions streaming in (the "lots going on")
const ACTS = [{ d: 0, t: "Opened acme.io", done: 1 }, { d: 22, t: "Clicked “Get started”", done: 1 }, { d: 50, t: "Scrolled to pricing", done: 1 }, { d: 78, t: "Reading the page…", done: 0 }];
const ActivityFeed: React.FC<{ lf: number }> = ({ lf }) => (
  <div style={{ position: "absolute", right: 16, bottom: 16, width: 318, borderRadius: 16, background: "rgba(22,19,14,0.86)", padding: "13px 15px", boxShadow: "0 14px 34px rgba(0,0,0,0.34)", zIndex: 8, border: "1px solid rgba(255,255,255,0.08)" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
      <div style={{ width: 16, height: 16, borderRadius: 5, background: grad("#E08A66", "#C5603C") }} />
      <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 16, color: "#fff" }}>Claude</span>
      <span style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 13, color: "rgba(255,255,255,0.45)", letterSpacing: "0.1em" }}>· LIVE</span>
    </div>
    {ACTS.map((a, i) => { const e = over(lf, a.d, 11); if (e <= 0.02) return null; const fresh = lf < a.d + 24;
      return (<div key={i} style={{ display: "flex", alignItems: "center", gap: 9, marginTop: 7, opacity: Math.min(1, e * 1.5), transform: `translateY(${(1 - Math.min(e, 1)) * 8}px)` }}>
        {a.done ? <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#5CC79A" strokeWidth={3.4} strokeLinecap="round" strokeLinejoin="round"><path d="M4 12 L10 18 L20 6" /></svg>
          : <div style={{ width: 14, height: 14, borderRadius: "50%", border: "2.5px solid rgba(255,255,255,0.3)", borderTopColor: "#E89A78", transform: `rotate(${lf * 12}deg)` }} />}
        <span style={{ fontFamily: inter.fontFamily, fontWeight: a.done ? 600 : 700, fontSize: 17, color: a.done ? "rgba(255,255,255,0.72)" : "#fff" }}>{a.t}</span>
        {fresh && a.done ? <span style={{ marginLeft: "auto", width: 7, height: 7, borderRadius: "50%", background: "#5CC79A" }} /> : null}
      </div>); })}
  </div>);

// ===== SCENE 0: HOOK — Claude actively driving a COMPLETE site (scrolls), live activity (frame-0 complete) =====
const HookScene: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s);
  const scrollY = ramp(lf, 6, 96) * 300; // scroll the full page (it's a complete, tall site)
  const cx = path(lf, [0, 20, 28, 52, 60, 100], [430, 250, 250, 600, 600, 540]);
  const cy = path(lf, [0, 20, 28, 52, 60, 100], [230, 330, 330, 180, 180, 250]);
  const clk = (c: number) => (lf > c && lf < c + 12 ? 1 - (lf - c) / 12 : 0);
  const tgt = lf < 46 ? { x: cx - 90, y: cy - 34 } : { x: cx - 110, y: cy - 50 };
  return (<AbsoluteFill>
    <Bloom cx={CX} cy={900} w={1040} color="rgba(210,114,78,0.16)" lf={lf} base={0.5} />
    <Browser lf={lf} url="app.claude.ai · controlling chrome">
      <Img src={staticFile("refs/bh_site_a_tall.jpg")} style={{ position: "absolute", left: 0, top: -scrollY, width: BW, display: "block" }} />
      <Target x={tgt.x} y={tgt.y} w={lf < 46 ? 200 : 230} h={lf < 46 ? 64 : 100} flash={Math.max(clk(28), clk(60))} lf={lf} />
      <ActivityFeed lf={lf} />
    </Browser>
    <Cursor x={ax(cx)} y={ay(cy)} click={Math.max(clk(28), clk(60))} />
  </AbsoluteFill>); };

// ===== SCENE 1: CONTROL — it clicks, then FILLS a form by itself =====
const ControlScene: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s);
  const formIn = eOut(lf, 8, 8);
  const cx = path(lf, [0, 18, 60, 110, 150, 184], [250, 250, 120, 120, 230, 360]);
  const cy = path(lf, [0, 18, 60, 110, 150, 184], [300, 300, 150, 250, 360, 430]);
  const clk = (c: number) => (lf > c && lf < c + 12 ? 1 - (lf - c) / 12 : 0);
  const f1 = ramp(lf, 34, 60), f2 = ramp(lf, 66, 92), f3 = ramp(lf, 98, 124); const done = over(lf, 176, 10);
  return (<AbsoluteFill>
    <Bloom cx={CX} cy={900} w={1000} color="rgba(58,92,132,0.16)" lf={lf} base={0.5} />
    <Browser lf={lf} url="acme.io/onboarding">
      <div style={{ position: "absolute", inset: 0, opacity: formIn, transform: `translateY(${(1 - formIn) * 14}px)`, padding: "30px 0" }}>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 32, color: INK, marginLeft: 44, marginBottom: 8 }}>New client onboarding</div>
        <Field y={70} label="Full name" val="Acme Studios Inc." fill={f1} active={f1 > 0 && f1 < 1} />
        <Field y={186} label="Work email" val="hello@acmestudios.io" fill={f2} active={f2 > 0 && f2 < 1} />
        <Field y={302} label="Company size" val="11–50 employees" fill={f3} active={f3 > 0 && f3 < 1} />
        <div style={{ position: "absolute", left: 44, top: 426, width: 240, height: 60, borderRadius: 14, background: done > 0.5 ? grad(GREEN, "#2F7E5C") : grad(CLAY, "#A8392B"), display: "flex", alignItems: "center", justifyContent: "center", gap: 10, boxShadow: "0 10px 24px rgba(210,114,78,0.34)", transform: `scale(${1 - clk(168) * 0.06})` }}>
          <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 23, color: "#fff" }}>{done > 0.5 ? "✓ Submitted" : "Submit"}</span>
        </div>
      </div>
    </Browser>
    <Cursor x={ax(cx)} y={ay(cy)} click={Math.max(clk(20), clk(168))} />
  </AbsoluteFill>); };

// ===== SCENE 2: BUSYWORK — "the crazy part": a queue of multi-step tasks Claude takes on =====
const QUEUE = [{ icon: "📝", t: "Fill out 12 onboarding forms" }, { icon: "📊", t: "Pull numbers from 8 dashboards" }, { icon: "🏷️", t: "Check 15 competitor prices" }, { icon: "📥", t: "Sort 40 inbox replies" }];
const BusyScene: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s);
  const cx = path(lf, [0, 60, 120], [240, 250, 250]); const cy = path(lf, [0, 60, 120], [120, 250, 250]);
  return (<AbsoluteFill>
    <Bloom cx={CX} cy={900} w={1000} color="rgba(210,114,78,0.16)" lf={lf} base={0.5} />
    <Browser lf={lf} url="app.claude.ai · running tasks">
      <div style={{ position: "absolute", inset: 0, padding: "34px 44px" }}>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 30, color: INK, marginBottom: 6 }}>Today's busywork <span style={{ color: MUTE, fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 22 }}>· handed to Claude</span></div>
        {QUEUE.map((q, i) => { const e = over(lf, 10 + i * 14, 12); const run = ramp(lf, 16 + i * 14, 70 + i * 10);
          return (<div key={i} style={{ transform: `translateX(${(1 - e) * -24}px) scale(${0.92 + Math.min(e, 1) * 0.08})`, opacity: Math.min(1, e * 1.6), display: "flex", alignItems: "center", gap: 16, padding: "16px 20px", marginTop: 14, borderRadius: 16, background: "#F7F4EE", border: "2px solid rgba(40,32,20,0.07)" }}>
            <span style={{ fontSize: 34 }}>{q.icon}</span>
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 25, color: INK, flex: 1 }}>{q.t}</span>
            <div style={{ width: 132, height: 12, borderRadius: 6, background: "rgba(40,32,20,0.1)", overflow: "hidden" }}><div style={{ height: "100%", width: `${run * 100}%`, borderRadius: 6, background: grad(CLAY, "#A8392B") }} /></div>
          </div>); })}
      </div>
    </Browser>
    <Cursor x={ax(cx)} y={ay(cy)} click={0} />
  </AbsoluteFill>); };

// ===== SCENE 3: TASKS — 3 fast vignettes (form / dashboard / pricing) =====
const Dash: React.FC<{ lf: number }> = ({ lf }) => { const hl = ramp(lf, 8, 26); const bars = [0.5, 0.78, 0.62, 1, 0.84];
  return (<div style={{ position: "absolute", inset: 0, background: grad("#1B2430", "#11161E"), padding: "30px 40px" }}>
    <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 22, color: "#9FB0C4" }}>Q3 Revenue</div>
    <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 64, color: "#fff", marginTop: 4 }}>$<span style={{ background: `rgba(63,158,116,${hl * 0.3})`, borderRadius: 6, padding: "0 6px" }}>284,910</span></div>
    <div style={{ position: "absolute", left: 40, right: 40, bottom: 36, height: 200, display: "flex", alignItems: "flex-end", gap: 22 }}>
      {bars.map((b, i) => <div key={i} style={{ flex: 1, height: `${b * ramp(lf, 4, 24) * 100}%`, borderRadius: "8px 8px 0 0", background: i === 3 ? grad("#5CC79A", "#3F9E74") : "rgba(120,160,200,0.4)" }} />)}
    </div>
  </div>); };
const Pricing: React.FC<{ lf: number }> = ({ lf }) => { const tiers = [["Starter", "$29"], ["Growth", "$89"], ["Scale", "$249"]];
  return (<div style={{ position: "absolute", inset: 0, background: "#fff", padding: "30px 36px" }}>
    <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 28, color: INK, marginBottom: 22 }}>Competitor pricing</div>
    <div style={{ display: "flex", gap: 18 }}>{tiers.map((t, i) => { const hl = over(lf, 8 + i * 9, 10);
      return (<div key={i} style={{ flex: 1, borderRadius: 18, border: `2px solid ${hl > 0.4 ? CLAY : "rgba(40,32,20,0.1)"}`, background: "#F7F4EE", padding: "22px 18px", transform: `scale(${0.94 + Math.min(hl, 1) * 0.06})` }}>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 21, color: MUTE }}>{t[0]}</div>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 50, color: INK, marginTop: 6, background: hl > 0.4 ? `rgba(210,114,78,${hl * 0.18})` : "transparent", borderRadius: 8, display: "inline-block", padding: "0 6px" }}>{t[1]}</div>
        <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 9 }}>{[0, 1, 2].map((k) => <div key={k} style={{ height: 9, borderRadius: 5, background: "rgba(40,32,20,0.12)", width: `${90 - k * 16}%` }} />)}</div>
      </div>); })}</div>
  </div>); };
const TasksScene: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s);
  const p = lf; const showForm = p < 52, showDash = p >= 48 && p < 104, showPrice = p >= 100;
  const cx = path(lf, [0, 26, 52, 78, 104, 150], [200, 360, 200, 420, 250, 480]); const cy = path(lf, [0, 26, 52, 78, 104, 150], [150, 300, 120, 220, 160, 300]);
  const clk = (c: number) => (lf > c && lf < c + 12 ? 1 - (lf - c) / 12 : 0);
  return (<AbsoluteFill>
    <Bloom cx={CX} cy={900} w={1000} color="rgba(58,92,132,0.16)" lf={lf} base={0.5} />
    <Browser lf={lf} url={showForm ? "acme.io/forms" : showDash ? "metrics.app/q3" : "rivals.io/pricing"}>
      {showForm && <div style={{ position: "absolute", inset: 0, opacity: 1 - eOut(lf, 44, 8), background: "#fff", padding: "30px 44px" }}>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 30, color: INK }}>Lead form</div>
        {[0, 1, 2].map((i) => <div key={i} style={{ marginTop: 22, height: 54, borderRadius: 13, background: "#F7F4EE", border: "2px solid rgba(40,32,20,0.1)", display: "flex", alignItems: "center", padding: "0 18px", fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 22, color: INK }}>{["Jordan Lee", "jordan@firm.com", "Marketing Director"][i].slice(0, Math.floor(ramp(lf, 6 + i * 10, 22 + i * 10) * 20))}</div>)}
        <div style={{ position: "absolute", right: 44, top: 34, display: "flex", alignItems: "center", gap: 8, color: GREEN, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 22, opacity: over(lf, 38, 8) }}>✓ done</div>
      </div>}
      {showDash && <div style={{ position: "absolute", inset: 0, opacity: Math.min(eOut(lf, 48, 7), 1 - eOut(lf, 96, 8)) }}><Dash lf={lf - 48} /></div>}
      {showPrice && <div style={{ position: "absolute", inset: 0, opacity: eOut(lf, 100, 7) }}><Pricing lf={lf - 100} /></div>}
    </Browser>
    <Cursor x={ax(cx)} y={ay(cy)} click={Math.max(clk(24), clk(76), clk(126))} />
  </AbsoluteFill>); };

// ===== SCENE 4: AUTONOMOUS — all done, you just watched =====
const DoneScene: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s);
  const items = ["Forms filled", "Dashboards pulled", "Pricing checked"];
  return (<AbsoluteFill>
    <Bloom cx={CX} cy={900} w={1000} color="rgba(63,158,116,0.18)" lf={lf} base={0.5} />
    <Browser lf={lf} url="app.claude.ai · complete">
      <div style={{ position: "absolute", inset: 0, padding: "40px 48px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 22 }}>
        {items.map((it, i) => { const e = over(lf, 6 + i * 12, 12);
          return (<div key={i} style={{ transform: `scale(${0.9 + Math.min(e, 1) * 0.1})`, opacity: Math.min(1, e * 1.6), display: "flex", alignItems: "center", gap: 20, padding: "20px 26px", borderRadius: 18, background: "#F4FAF6", border: `2px solid ${GREEN}` }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", background: grad("#5CC79A", "#3F9E74"), display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={3.6} strokeLinecap="round" strokeLinejoin="round"><path d="M4 12 L10 18 L20 6" /></svg></div>
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 30, color: INK }}>{it}</span>
          </div>); })}
      </div>
    </Browser>
  </AbsoluteFill>); };

// ===== SCENE 5: FOMO — hours back =====
const FomoScene: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const lf = f - fr(s);
  const countP = ramp(lf, 30, 78); const hrs = Math.round(countP * 12); const inE = over(lf, 6, 14);
  return (<AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
    <Bloom cx={CX} cy={930} w={980} color="rgba(63,158,116,0.18)" lf={lf} base={0.5} />
    <div style={{ marginTop: -150, fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 600, fontSize: 50, color: MUTE, opacity: eOut(lf, 2, 12) }}>barely anyone knows yet</div>
    <div style={{ marginTop: 30, transform: `scale(${inE})`, position: "relative" }}>
      <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 168, color: GREEN, lineHeight: 1, letterSpacing: "-0.02em" }}>+{hrs}</span>
      <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 60, color: GREEN }}> hrs</span>
    </div>
    <div style={{ marginTop: 6, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 40, color: INK, opacity: eOut(lf, 40, 10) }}>back every week</div>
  </AbsoluteFill>); };

const CTA: React.FC<{ s: number }> = ({ s }) => { const f = useCurrentFrame(); const local = f - fr(s); if (local < 0) return null; const a = eOut(f, fr(s) + 2, 12); const pulse = 1 + Math.sin(f / 7) * 0.03;
  return (<AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
    {Array.from({ length: 12 }, (_, i) => { const p = eOut(f, fr(s) + 4 + i, 26); const ang = (i / 12) * Math.PI * 2; if (p <= 0 || p >= 1) return null; return <div key={i} style={{ position: "absolute", left: 540 + Math.cos(ang) * p * 340, top: 900 + Math.sin(ang) * p * 340, fontSize: 28, opacity: Math.sin(p * Math.PI), color: [SLATE, CLAY, AMBER, GREEN][i % 4] }}>✦</div>; })}
    <div style={{ marginTop: -150, transform: `scale(${0.7 + a * 0.3})`, opacity: a }}><ClaudeMark size={172} glow={0.5 + Math.sin(local / 9) * 0.12} /></div>
    <div style={{ marginTop: 46, transform: `scale(${pulse})`, padding: "28px 56px", borderRadius: 999, background: CLAY, color: "#fff", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 66, boxShadow: "0 24px 54px rgba(210,114,78,0.42)", opacity: a }}>💬 Comment "CONTROL"</div>
    <div style={{ marginTop: 28, fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 600, fontSize: 42, color: INK, opacity: a, textAlign: "center" }}>and I'll send you the exact setup</div>
  </AbsoluteFill>); };

const L = [0, 3.42, 10.08, 14.9, 20.24, 23.02, 28.24];
const Sfx: React.FC<{ at: number; src: string; v?: number }> = ({ at, src, v = 0.3 }) => (<Sequence from={fr(at)} durationInFrames={fr(2.5)}><Audio src={staticFile(`sfx/${src}`)} volume={v} /></Sequence>);

export const ClaudeControlReel: React.FC = () => {
  return (<AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
    <Audio src={staticFile("vo_control.wav")} />
    <Audio loop src={staticFile("ados_bed_loud.wav")} volume={(ff) => interpolate(ff, [0, fr(L[6]) - 12, fr(L[6]) + 20, 99999], [0.19, 0.19, 0.15, 0.15], { extrapolateRight: "clamp" })} />
    <Sfx at={0} src="key.wav" v={0.2} />
    {[1.0, 6.0, 9.4, 15.6, 17.6].map((t, i) => <Sfx key={i} at={t} src="tick.wav" v={0.26} />)}
    {L.slice(1).map((t, i) => <Sfx key={"s" + i} at={t - 0.08} src="blip2.wav" v={0.2} />)}
    <Sfx at={L[6]} src="pop.wav" v={0.3} /><Sfx at={L[6] + 0.4} src="blip4.wav" v={0.26} />
    <Background />
    <Scene s={L[0]} e={L[1]}><HookScene s={L[0]} /></Scene>
    <Scene s={L[1]} e={L[2]}><ControlScene s={L[1]} /></Scene>
    <Scene s={L[2]} e={L[3]}><BusyScene s={L[2]} /></Scene>
    <Scene s={L[3]} e={L[4]}><TasksScene s={L[3]} /></Scene>
    <Scene s={L[4]} e={L[5]}><DoneScene s={L[4]} /></Scene>
    <Scene s={L[5]} e={L[6]}><FomoScene s={L[5]} /></Scene>
    <CTA s={L[6]} />
    <HeroHeader />
    <Captions />
  </AbsoluteFill>); };
