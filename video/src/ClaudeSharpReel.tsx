import React from "react";
import { AbsoluteFill, Img, useCurrentFrame, useVideoConfig, interpolate, Easing, Audio, Sequence, staticFile } from "remotion";
import { fraunces, frauncesItalic, inter } from "./fonts";
import words from "./data/words_sharp.json";

const CREAM = "#ECE9E2", INK = "#1A1813", SLATE = "#3A5C84", CLAY = "#D2724E", AMBER = "#CF9544", GOLD = "#E7B24C", GREEN = "#3F9E74", MUTE = "#9A968B", RED = "#C44A3A";
const NAVY = "#233250", NAVY2 = "#18233A", PAPER = "#F7F3EA";
const mono = "ui-monospace,'SF Mono',Menlo,monospace";
const FPS = 30;
const fr = (s: number) => Math.round(s * FPS);
const grad = (a: string, b: string) => `linear-gradient(158deg, ${a} 0%, ${b} 100%)`;
const NAVYSH = "0 34px 66px -22px rgba(18,28,58,0.55), 0 10px 24px rgba(18,28,58,0.30)";

// scene starts (sec): hook, m1, m2, m3, cta
const L = [0, 5.76, 10.52, 15.14, 25.22];
const Lf = L.map(fr);

const over = (f: number, start: number, dur: number, ease = Easing.out(Easing.cubic)) =>
  interpolate(f, [start, start + dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
const ramp = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const seed = (n: number) => { const x = Math.sin(n * 127.1 + 43.7) * 43758.5453; return x - Math.floor(x); };

const ClaudeMark: React.FC<{ size?: number }> = ({ size = 54 }) => (
  <div style={{ width: size, height: size, borderRadius: size * 0.26, background: grad("#E9825C", "#C7541F"), display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 20px rgba(199,84,31,0.45), inset 0 2px 3px rgba(255,255,255,0.4)" }}>
    <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: size * 0.6, color: "#fff", lineHeight: 1 }}>*</div>
  </div>
);

// ---------------- background ----------------
const Bg: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: grad("#EFEBE3", "#E4DFD4") }}>
      {/* warm/cool blooms */}
      <div style={{ position: "absolute", left: -140, top: 240, width: 640, height: 640, borderRadius: "50%", background: "radial-gradient(circle, rgba(210,114,78,0.16), transparent 62%)", filter: "blur(10px)" }} />
      <div style={{ position: "absolute", right: -170, top: 620, width: 720, height: 720, borderRadius: "50%", background: "radial-gradient(circle, rgba(58,92,132,0.14), transparent 62%)", filter: "blur(12px)" }} />
      {/* key light cone */}
      <div style={{ position: "absolute", left: -60, top: -60, width: 700, height: 700, background: "radial-gradient(circle at 30% 30%, rgba(255,248,235,0.5), transparent 60%)" }} />
      {/* dust motes */}
      {Array.from({ length: 16 }, (_, i) => { const s = seed(i + 3); const x = seed(i * 2.3) * 1080; const y = ((seed(i * 1.7) * 1920 + f * (0.3 + s * 0.5)) % 1920); return (
        <div key={i} style={{ position: "absolute", left: x, top: y, width: 3 + s * 3, height: 3 + s * 3, borderRadius: "50%", background: "rgba(255,255,255,0.5)", opacity: 0.25 + s * 0.3 }} />); })}
      {/* vignette */}
      <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 320px rgba(40,32,24,0.28)" }} />
    </AbsoluteFill>
  );
};

// ---------------- stage panel ----------------
const Stage: React.FC = () => (
  <div style={{ position: "absolute", left: 34, right: 34, top: 300, height: 838, borderRadius: 46, background: grad(NAVY, NAVY2), boxShadow: NAVYSH, overflow: "hidden" }}>
    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 24%, rgba(120,150,210,0.16), transparent 60%)" }} />
    <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 2px 0 rgba(255,255,255,0.08), inset 0 0 120px rgba(0,0,0,0.35)" }} />
    {/* console rail dots */}
    <div style={{ position: "absolute", left: 34, top: 30, display: "flex", gap: 12 }}>
      {[RED, AMBER, GREEN].map((c, i) => <div key={i} style={{ width: 16, height: 16, borderRadius: "50%", background: c, opacity: 0.85 }} />)}
    </div>
  </div>
);

// reusable card
const Card: React.FC<{ style?: React.CSSProperties; children?: React.ReactNode }> = ({ style, children }) => (
  <div style={{ position: "absolute", borderRadius: 26, background: PAPER, boxShadow: "0 22px 44px -16px rgba(10,16,34,0.6), inset 0 1px 0 rgba(255,255,255,0.7)", ...style }}>{children}</div>
);

// Anthropic's real "Introducing Claude Fable 5" release video, in a player frame (establishing shot)
const VideoCard: React.FC<{ w: number; lf: number }> = ({ w, lf }) => { const vh = w * 720 / 1280; const play = Math.max(0, Math.sin(lf / 8));
  return (<div style={{ width: w, borderRadius: 20, overflow: "hidden", background: "#0E1524", boxShadow: `0 30px 60px -18px rgba(10,16,34,0.7), 0 0 48px rgba(210,114,78,0.28)`, position: "relative", border: "1px solid rgba(255,255,255,0.08)" }}>
    <div style={{ position: "relative", width: w, height: vh }}>
      <Img src={staticFile("fable/fable_video.jpg")} style={{ width: w, height: vh, display: "block" }} />
      <div style={{ position: "absolute", left: "50%", top: "50%", transform: `translate(-50%,-50%) scale(${1 + play * 0.06})`, width: 108, height: 108, borderRadius: "50%", background: "rgba(20,26,45,0.66)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 24px rgba(0,0,0,0.45)" }}>
        <div style={{ width: 0, height: 0, borderTop: "22px solid transparent", borderBottom: "22px solid transparent", borderLeft: "36px solid #fff", marginLeft: 10 }} />
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 8, background: "rgba(255,255,255,0.25)" }}><div style={{ height: "100%", width: `${18 + (lf % 120) / 120 * 40}%`, background: "#FF3B30" }} /></div>
    </div>
    <div style={{ padding: "15px 22px", display: "flex", alignItems: "center", gap: 13, background: "#141C2A" }}>
      <div style={{ width: 36, height: 36, borderRadius: 10, background: grad("#E9825C", "#C7541F"), display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 24, color: "#fff", boxShadow: "inset 0 1px 2px rgba(255,255,255,0.4)" }}>*</div>
      <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 25, color: "#E9E2D4" }}>Introducing Claude Fable 5</span>
      <span style={{ marginLeft: "auto", fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 20, color: "#8a94a8" }}>Anthropic</span>
    </div>
  </div>);
};

// ---------------- HOOK ----------------
const Hook: React.FC<{ lf: number }> = ({ lf }) => {
  const vs = ramp(lf, fr(2.2), fr(2.9));       // release video shrinks + fades out
  const inn = over(lf, 0, 9);                  // header present from frame 0
  const pop90 = over(lf, fr(3.7), 10);         // "90% worse"
  const demo = over(lf, fr(2.9), 14);
  const yours = over(lf, fr(3.5), 14);
  return (
    <>
      {/* hook TITLE, present from the very start (above the establishing video) */}
      <div style={{ position: "absolute", left: 60, right: 60, top: 372, textAlign: "center", opacity: inn, transform: `translateY(${(1 - inn) * -14}px) scale(${0.96 + inn * 0.04})` }}>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 78, lineHeight: 0.98, letterSpacing: "-0.02em", color: "#F4EFE4" }}>
          3 mistakes with <span style={{ color: AMBER }}>Fable 5</span>
        </div>
      </div>
      {/* real Anthropic "Introducing Claude Fable 5" release video, establishing shot (below the title) */}
      {vs < 1 && <div style={{ position: "absolute", left: "50%", top: 486, transform: `translateX(-50%) translateY(${vs * -30}px) scale(${(0.97 + over(lf, 0, 6) * 0.03) * (1 - vs * 0.16)})`, opacity: 1 - vs, transformOrigin: "50% 0", zIndex: 30 }}><VideoCard w={706} lf={lf} /></div>}
      {/* 90% worse tag */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 480, textAlign: "center", opacity: pop90 * vs, transform: `scale(${0.7 + pop90 * 0.3}) rotate(-3deg)`, zIndex: 20 }}>
        <span style={{ display: "inline-block", padding: "10px 28px", borderRadius: 999, background: RED, color: "#fff", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 46, boxShadow: "0 0 26px rgba(196,74,58,0.6)" }}>#3 makes it 90% worse</span>
      </div>
      {/* split cards */}
      <div style={{ position: "absolute", left: 70, top: 585, width: 420, height: 380, opacity: demo, transform: `translateY(${(1 - demo) * 30}px)` }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: 26, background: PAPER, boxShadow: `0 22px 44px -16px rgba(10,16,34,0.6), 0 0 34px rgba(63,158,116,0.35)`, border: `3px solid ${GREEN}` }}>
          <div style={{ padding: "22px 24px 0" }}>
            {[0, 1, 2, 3].map((i) => <div key={i} style={{ height: 16, borderRadius: 8, margin: "0 0 15px", width: `${88 - i * 8}%`, background: i === 0 ? GREEN : "#C9D8CC" }} />)}
          </div>
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 20, textAlign: "center", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 26, color: GREEN }}>THE DEMO</div>
        </div>
      </div>
      <div style={{ position: "absolute", right: 70, top: 585, width: 420, height: 380, opacity: yours, transform: `translateY(${(1 - yours) * 30}px)` }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: 26, background: "#EDE7DD", boxShadow: "0 18px 36px -18px rgba(10,16,34,0.6)", border: "3px solid #B9AF9E", filter: "grayscale(0.5)" }}>
          <div style={{ padding: "22px 24px 0" }}>
            {[0, 1, 2, 3].map((i) => <div key={i} style={{ height: 16, borderRadius: 8, margin: "0 0 15px", width: `${60 + seed(i) * 30}%`, background: "#C3BAAA", transform: `skewX(${-6 + seed(i + 5) * 12}deg)` }} />)}
          </div>
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 20, textAlign: "center", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 26, color: MUTE }}>YOURS</div>
        </div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 748, textAlign: "center", opacity: Math.min(demo, yours), fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 58, color: "#F4EFE4" }}>vs</div>
    </>
  );
};

// ---------------- MISTAKE SCAFFOLD ----------------
const MistakeLabel: React.FC<{ n: number; text: string; lf: number; color?: string }> = ({ n, text, lf, color = CLAY }) => {
  const o = over(lf, 2, 8);
  return (
    <div style={{ position: "absolute", left: 70, right: 70, top: 330, textAlign: "center", opacity: o, transform: `translateY(${(1 - o) * -16}px)` }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 18 }}>
        <span style={{ width: 74, height: 74, borderRadius: "50%", background: color, color: "#fff", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 42, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 22px ${color}66` }}>{n}</span>
        <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 60, color: "#F4EFE4", letterSpacing: "-0.02em" }}>{text}</span>
      </div>
    </div>
  );
};

// ---------------- MISTAKE 1: no example ----------------
const M1: React.FC<{ lf: number }> = ({ lf }) => {
  const exIn = over(lf, fr(1.4), 12);      // example card thunks in
  const beam = over(lf, fr(2.5), 20);      // scan beam sweeps left -> right
  const done = over(lf, fr(3.9), 9);       // matched
  const beamX = 140 + beam * 760;
  return (
    <>
      <MistakeLabel n={1} text="No example" lf={lf} />
      {/* example card (left) */}
      <div style={{ position: "absolute", left: 110, top: 476, width: 400, height: 322, opacity: exIn, transform: `translateX(${(1 - exIn) * -70}px) scale(${0.94 + exIn * 0.06})` }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: 24, background: PAPER, boxShadow: "0 22px 44px -16px rgba(10,16,34,0.6)", border: `3px solid ${CLAY}` }}>
          <div style={{ padding: "20px 24px", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 24, color: CLAY, display: "flex", alignItems: "center", gap: 10 }}><span style={{ fontSize: 26 }}>⭐</span> your example</div>
          <div style={{ padding: "0 24px" }}>{[0, 1, 2].map((i) => <div key={i} style={{ height: 19, borderRadius: 10, margin: "0 0 20px", width: `${86 - i * 12}%`, background: "#D8CDBB" }} />)}</div>
        </div>
      </div>
      {/* output card (right): lines snap into a match, staggered, as the beam passes */}
      <div style={{ position: "absolute", right: 110, top: 476, width: 400, height: 322 }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: 24, background: PAPER, boxShadow: `0 22px 44px -16px rgba(10,16,34,0.6), 0 0 ${done * 36}px rgba(63,158,116,${done * 0.5})`, border: `3px solid ${done > 0.5 ? GREEN : (beam > 0.1 ? AMBER : "#C0554A")}` }}>
          <div style={{ padding: "20px 24px", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 24, color: done > 0.5 ? GREEN : "#C0554A" }}>its output {done < 0.5 ? "✗" : ""}</div>
          <div style={{ padding: "0 24px" }}>{[0, 1, 2].map((i) => { const snap = over(lf, fr(2.5) + i * 5, 8); const w0 = 48 + seed(i + 9) * 34, w1 = 86 - i * 12; const w = w0 + (w1 - w0) * snap; const sk = (1 - snap) * (-10 + seed(i + 2) * 20); const col = snap > 0.6 ? "#BFD8C7" : (snap > 0.06 ? "#E7C4A0" : "#DDB2AA"); return (
            <div key={i} style={{ height: 19, borderRadius: 10, margin: "0 0 20px", width: `${w}%`, background: col, transform: `skewX(${sk}deg) translateY(${(1 - snap) * (i % 2 ? 5 : -5)}px)` }} />); })}</div>
        </div>
        {done > 0.4 && <div style={{ position: "absolute", right: -16, top: -18, width: 60, height: 60, borderRadius: "50%", background: GREEN, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34, fontWeight: 900, boxShadow: `0 0 24px ${GREEN}`, transform: `scale(${over(lf, fr(3.9), 8)})` }}>✓</div>}
      </div>
      {/* scan beam sweeping across */}
      <div style={{ position: "absolute", left: beamX, top: 470, width: 10, height: 334, background: `linear-gradient(to bottom, transparent, ${GOLD}, transparent)`, boxShadow: `0 0 26px ${GOLD}`, opacity: beam > 0.02 && beam < 0.98 ? 0.95 : 0, borderRadius: 5 }} />
      {/* sparkles trailing the beam */}
      {beam > 0.04 && beam < 0.96 && Array.from({ length: 5 }, (_, k) => { const yy = 500 + k * 62; const jx = (seed(k) - 0.5) * 30; return (<div key={k} style={{ position: "absolute", left: beamX + jx, top: yy, width: 8, height: 8, borderRadius: "50%", background: k % 2 ? GOLD : CLAY, opacity: 0.85, boxShadow: `0 0 9px ${GOLD}` }} />); })}
      {/* copy chevrons */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 606, textAlign: "center", opacity: exIn * (1 - done) * 0.9, fontSize: 46, color: GOLD, letterSpacing: 8 }}>▸▸▸</div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 836, textAlign: "center", opacity: over(lf, fr(3.7), 10), fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 42, color: "#F4EFE4" }}>now it matches your sample</div>
    </>
  );
};

// ---------------- MISTAKE 2: lead with the answer ----------------
const M2: React.FC<{ lf: number }> = ({ lf }) => {
  const pile = over(lf, fr(0.3), 15, Easing.linear); // rambling lines pile up + word count climbs
  const flip = over(lf, fr(2.1), 15, Easing.out(Easing.back(1.4))); // snap-collapse to answer-first
  const nLines = 7;
  return (
    <>
      <MistakeLabel n={2} text="It rambles" lf={lf} color={SLATE} />
      <div style={{ position: "absolute", left: 150, right: 150, top: 466, height: 384 }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: 26, background: PAPER, boxShadow: "0 22px 44px -16px rgba(10,16,34,0.6)", overflow: "hidden" }}>
          {/* rambling wall of text piling up (collapses on flip) */}
          <div style={{ opacity: 1 - flip, transform: `translateY(${flip * -46}px) scaleY(${1 - flip * 0.4})`, transformOrigin: "top" }}>
            <div style={{ padding: "18px 26px 8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 22, color: MUTE }}>its answer</span>
              <span style={{ fontFamily: mono, fontWeight: 700, fontSize: 24, color: RED, opacity: pile }}>{Math.round(pile * 340)} words</span>
            </div>
            <div style={{ padding: "0 26px" }}>{Array.from({ length: nLines }, (_, i) => { const app = over(lf, fr(0.3) + i * 3.2, 5); return (<div key={i} style={{ height: 14, borderRadius: 7, margin: "0 0 14px", width: `${94 - seed(i) * 38}%`, background: "#D2C9B8", opacity: app, transform: `translateY(${(1 - app) * 12}px)` }} />); })}</div>
          </div>
          {/* answer-first, launches up from below */}
          <div style={{ position: "absolute", left: 28, right: 28, top: 30, opacity: flip, transform: `translateY(${(1 - flip) * 90}px)` }}>
            <div style={{ height: 88, borderRadius: 16, background: grad("#FBF7EF", "#EFE6D4"), border: `3px solid ${GREEN}`, display: "flex", alignItems: "center", gap: 16, padding: "0 24px", boxShadow: flip > 0.6 ? `0 0 28px rgba(63,158,116,0.4)` : "none" }}>
              <span style={{ width: 52, height: 52, borderRadius: "50%", background: GREEN, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, fontWeight: 900 }}>✓</span>
              <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 40, color: INK }}>The answer, first</span>
            </div>
            <div style={{ marginTop: 26, paddingLeft: 4 }}>{[0, 1, 2].map((i) => <div key={i} style={{ height: 12, borderRadius: 6, margin: "0 0 15px", width: `${72 - i * 12}%`, background: "#D2C9B8" }} />)}</div>
            <div style={{ position: "absolute", right: 4, top: 104, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 19, color: MUTE }}>details after</div>
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 872, textAlign: "center", opacity: over(lf, fr(2.9), 10), fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 42, color: "#F4EFE4" }}>“lead with the answer”</div>
    </>
  );
};

// ---------------- MISTAKE 3: over-instructing (peak) ----------------
const M3: React.FC<{ lf: number }> = ({ lf }) => {
  const steps = over(lf, fr(1.6), 12);          // step list drops in
  const cageT = over(lf, fr(3.6), 12);          // "boxes it in"
  const drop = over(lf, fr(5.0), 16);           // "drag the quality down"
  const fixT = over(lf, fr(8.64), 12);          // "Give it the goal" @23.78 -> lf ~8.64
  const shake = cageT > 0 && fixT < 0.1 ? Math.sin(lf * 1.6) * (1 - drop) * 3 : 0;
  const qual = 1 - drop * 0.8 + fixT * 0.85;     // quality bar height fraction
  const qcolor = fixT > 0.4 ? GREEN : (drop > 0.4 ? RED : AMBER);
  return (
    <>
      <MistakeLabel n={3} text="Over-instructing" lf={lf} color={RED} />
      {/* left: prompt that changes */}
      <div style={{ position: "absolute", left: 90, top: 460, width: 560, height: 400, transform: `translateX(${shake}px)` }}>
        {/* step-by-step cage (mistake) */}
        <div style={{ position: "absolute", inset: 0, borderRadius: 24, background: NAVY2, border: `3px solid ${fixT > 0.3 ? GREEN : RED}`, boxShadow: `0 20px 40px -16px rgba(10,16,34,0.7)`, opacity: 1, overflow: "hidden" }}>
          {/* mistake content */}
          <div style={{ opacity: 1 - fixT, transform: `translateY(${fixT * -30}px)` }}>
            <div style={{ padding: "18px 22px 8px", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 22, color: "#E7A79A" }}>your prompt</div>
            {[1, 2, 3, 4, 5].map((i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "0 22px", margin: "0 0 12px", opacity: steps > i * 0.14 ? 1 : 0 }}>
              <span style={{ fontFamily: mono, fontSize: 20, color: "#8FA5C7", fontWeight: 700 }}>{i}.</span>
              <div style={{ height: 14, borderRadius: 7, width: `${78 - i * 6}%`, background: "#3A4A66" }} />
            </div>)}
          </div>
          {/* fix content (goal card) */}
          <div style={{ position: "absolute", inset: 0, padding: "34px 26px", opacity: fixT, transform: `translateY(${(1 - fixT) * 30}px)`, display: "flex", flexDirection: "column", justifyContent: "center", gap: 20 }}>
            <div style={{ fontFamily: mono, fontSize: 26, color: "#BFE3CE" }}>Goal: <span style={{ color: "#fff" }}>____</span></div>
            <div style={{ fontFamily: mono, fontSize: 26, color: "#BFE3CE" }}>Done when: <span style={{ color: "#fff" }}>____</span></div>
            <div style={{ marginTop: 8, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 22, color: GREEN }}>let it own the how</div>
          </div>
        </div>
        {/* cage brackets clamp in */}
        {[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([sx, sy], i) => (
          <div key={i} style={{ position: "absolute", [sx < 0 ? "left" : "right"]: -10 + (1 - cageT) * (sx * -40), [sy < 0 ? "top" : "bottom"]: -10 + (1 - cageT) * (sy * -40), width: 60, height: 60, borderLeft: sx < 0 ? `7px solid ${RED}` : "none", borderRight: sx > 0 ? `7px solid ${RED}` : "none", borderTop: sy < 0 ? `7px solid ${RED}` : "none", borderBottom: sy > 0 ? `7px solid ${RED}` : "none", borderRadius: 8, opacity: cageT * (1 - fixT) } as React.CSSProperties} />
        ))}
      </div>
      {/* right: quality bar */}
      <div style={{ position: "absolute", right: 110, top: 470, width: 150, height: 380 }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: 18, background: "rgba(255,255,255,0.08)", border: "2px solid rgba(255,255,255,0.16)" }} />
        <div style={{ position: "absolute", left: 8, right: 8, bottom: 8, height: `${Math.max(8, qual * 92)}%`, borderRadius: 12, background: grad(qcolor, qcolor), boxShadow: `0 0 24px ${qcolor}88`, transition: "none" }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: -46, textAlign: "center", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 24, color: "#F4EFE4" }}>quality</div>
        {drop > 0.3 && fixT < 0.3 && <div style={{ position: "absolute", left: -6, right: -6, top: "48%", textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 40, color: RED, opacity: drop * (1 - fixT) }}>-90%</div>}
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 878, textAlign: "center", opacity: fixT, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 40, color: "#F4EFE4" }}>the goal, not the script</div>
    </>
  );
};

// ---------------- CTA ----------------
const CTA: React.FC<{ lf: number }> = ({ lf }) => {
  const doc = over(lf, fr(0.2), 13, Easing.out(Easing.back(1.3)));
  const o = over(lf, fr(0.7), 12);
  const key = over(lf, fr(1.2), 14, Easing.out(Easing.back(1.5)));
  const shine = ((lf - fr(1.6)) % 42) / 42;
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-start", paddingTop: 322 }}>
      {/* celebration burst */}
      {Array.from({ length: 18 }, (_, k) => { const a = (k / 18) * Math.PI * 2 + seed(k); const d = 150 + seed(k) * 320 * over(lf, 1, 34); const o2 = Math.max(0, 1 - over(lf, 4, 40)); const c = k % 3 === 0 ? CLAY : (k % 3 === 1 ? GOLD : GREEN); return (<div key={k} style={{ position: "absolute", left: "50%", top: 500, width: 11, height: 11, borderRadius: "50%", background: c, opacity: o2 * 0.85, transform: `translate(${Math.cos(a) * d}px, ${Math.sin(a) * d}px)`, boxShadow: `0 0 9px ${c}` }} />); })}
      {/* the reward = a full FABLE 5 GUIDE cover (stacked pages for depth) */}
      <div style={{ position: "relative", width: 440, opacity: doc, transform: `translateY(${(1 - doc) * -44}px) scale(${0.9 + doc * 0.1})`, marginBottom: 40 }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: 24, background: "#E7DECC", transform: "rotate(3.4deg) translate(17px, 13px)", boxShadow: "0 22px 42px -18px rgba(10,16,34,0.32)" }} />
        <div style={{ position: "absolute", inset: 0, borderRadius: 24, background: "#F1EADA", transform: "rotate(-2.6deg) translate(-13px, 7px)", boxShadow: "0 18px 34px -18px rgba(10,16,34,0.26)" }} />
        <div style={{ position: "relative", borderRadius: 24, background: "#FFFDF8", border: `3px solid ${GOLD}`, boxShadow: "0 38px 68px -18px rgba(10,16,34,0.42), 0 0 64px rgba(231,178,76,0.45)", padding: "28px 34px 32px", textAlign: "left" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <span style={{ padding: "8px 18px", borderRadius: 999, background: CLAY, color: "#fff", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 20, letterSpacing: 1.5, boxShadow: "0 6px 14px rgba(199,84,31,0.4)" }}>FREE GUIDE</span>
            <span style={{ fontSize: 46, filter: "drop-shadow(0 3px 5px rgba(120,70,10,0.35))" }}>🎁</span>
          </div>
          <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 52, lineHeight: 0.95, color: INK, letterSpacing: "-0.02em" }}>The Fable 5 Guide</div>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 24, color: SLATE, marginTop: 10, marginBottom: 18 }}>3 fixes for sharper answers</div>
          <div style={{ height: 3, background: GOLD, borderRadius: 2, opacity: 0.6, marginBottom: 20 }} />
          {["Give it an example", "Lead with the answer", "Skip the step-by-step"].map((tx, i) => { const ap = over(lf, fr(0.55) + i * 5, 9); return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 15, marginBottom: i < 2 ? 17 : 0, opacity: ap, transform: `translateX(${(1 - ap) * -18}px)` }}>
              <span style={{ width: 36, height: 36, borderRadius: "50%", background: GREEN, color: "#fff", fontSize: 20, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 4px 10px rgba(63,158,116,0.4)" }}>✓</span>
              <span style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 28, color: INK }}>{tx}</span>
            </div>); })}
        </div>
      </div>
      {/* comment SHARP */}
      <div style={{ opacity: o, transform: `translateY(${(1 - o) * 24}px)`, textAlign: "center" }}>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 56, color: SLATE, marginBottom: 14 }}>Comment</div>
        <div style={{ position: "relative", display: "inline-block", padding: "17px 56px", borderRadius: 999, background: grad("#E9825C", "#C7541F"), boxShadow: "0 20px 40px -10px rgba(199,84,31,0.7), inset 0 2px 3px rgba(255,255,255,0.35)", transform: `scale(${0.82 + key * 0.18})`, overflow: "hidden" }}>
          <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 96, color: "#fff", letterSpacing: "0.04em" }}>SHARP</span>
          <div style={{ position: "absolute", top: 0, bottom: 0, left: `${-40 + shine * 180}%`, width: "34%", background: "linear-gradient(105deg, transparent, rgba(255,255,255,0.55), transparent)", opacity: shine < 0.9 ? 1 : 0 }} />
        </div>
        <div style={{ marginTop: 20, fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 33, color: SLATE }}>and I'll DM it to you</div>
      </div>
    </AbsoluteFill>
  );
};

// ---------------- progress bar + reward seal ----------------
const ProgressBar: React.FC = () => {
  const f = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const p = Math.min(1, f / (durationInFrames - 1));
  const t = f / FPS;
  const marks = [L[1], L[2], L[3]];
  const TOTAL = durationInFrames / FPS;
  return (
    <div style={{ position: "absolute", left: 46, right: 46, top: 272, height: 60, zIndex: 120 }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 20, height: 22, background: "rgba(58,92,132,0.22)", borderRadius: 999, boxShadow: "inset 0 1px 3px rgba(0,0,0,0.15)" }} />
      <div style={{ position: "absolute", left: 0, top: 20, height: 22, width: `${p * 100}%`, background: grad("#E08A66", "#C5603C"), borderRadius: 999, boxShadow: "0 3px 12px rgba(210,114,78,0.6)" }} />
      {marks.map((m, i) => { const np = m / TOTAL; const passed = t >= m; const teased = i === 2 && !passed; const pop = passed ? 1 + Math.max(0, 1 - (t - m) * 3) * 0.35 : 1; return (
        <div key={i} style={{ position: "absolute", left: `${np * 100}%`, top: 2, transform: `translateX(-50%) scale(${pop})`, width: 56, height: 56, borderRadius: "50%", background: passed ? GREEN : (teased ? "#25314A" : "#EDE7DB"), border: `4px solid ${passed ? GREEN : (teased ? AMBER : CLAY)}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 26, color: passed ? "#fff" : (teased ? AMBER : CLAY), boxShadow: passed ? `0 0 18px ${GREEN}` : (teased ? `0 0 16px ${AMBER}99` : "0 2px 6px rgba(0,0,0,0.2)") }}>{passed ? "✓" : i + 1}</div>); })}
      {/* mid-bar reward-tease star (fills the gap to the finish) */}
      {(() => { const sp = 0.77; const lit = t >= sp * TOTAL; const pop = lit ? 1 + Math.max(0, 1 - (t - sp * TOTAL) * 3) * 0.4 : 1; return (
        <div style={{ position: "absolute", left: `${sp * 100}%`, top: 9, transform: `translateX(-50%) scale(${pop})`, width: 48, height: 48, borderRadius: "50%", background: lit ? grad("#F0CB63", "#D39A2A") : "#242F45", border: `4px solid ${lit ? "#F6E4A0" : AMBER}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: lit ? `0 0 18px ${GOLD}` : `0 0 12px ${AMBER}77`, zIndex: 122 }}>
          <span style={{ fontSize: 26, lineHeight: 1, color: lit ? "#fff" : AMBER, opacity: lit ? 1 : 0.8 }}>★</span>
        </div>); })()}
      {/* finish-line GIFT reward */}
      {(() => { const unlocked = t >= L[4]; const uu = unlocked ? Math.min(1, (t - L[4]) / 0.5) : 0; const eu = 1 - Math.pow(1 - uu, 3); const pt = 1 - uu; const pulse = 1 + Math.sin(t * 3.0) * 0.06 * pt; const pop = 1 + Math.max(0, 1 - Math.abs((t - L[4]) - 0.14) * 4) * 0.55; const sc = pulse * pop; const bob = Math.sin(t * 2.4) * 3 * pt; return (
        <div style={{ position: "absolute", right: -24, top: -22, width: 96, height: 96, transform: `translateY(${bob}px) scale(${sc})`, zIndex: 131 }}>
          <div style={{ position: "absolute", inset: 10, borderRadius: "50%", background: `radial-gradient(circle, ${GOLD}${unlocked ? "cc" : "44"}, transparent 66%)`, filter: "blur(3px)", boxShadow: unlocked ? `0 0 36px ${GOLD}` : `0 0 14px ${GOLD}66` }} />
          {unlocked && Array.from({ length: 11 }, (_, k) => { const a = (k / 11) * Math.PI * 2; const d = 22 + eu * 28; const o = Math.max(0, 1 - uu * 1.05); return (<div key={k} style={{ position: "absolute", left: 48, top: 48, width: 8, height: 8, marginLeft: -4, marginTop: -4, borderRadius: "50%", background: k % 2 ? "#F3E3A6" : CLAY, opacity: o, transform: `translate(${Math.cos(a) * d}px, ${Math.sin(a) * d}px)`, boxShadow: `0 0 8px ${GOLD}` }} />); })}
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 58, lineHeight: 1, filter: unlocked ? "drop-shadow(0 3px 6px rgba(120,70,10,0.4))" : "grayscale(0.6) brightness(0.85)", opacity: unlocked ? 1 : 0.6, transform: `scale(${unlocked ? 0.9 + eu * 0.22 : 0.84})` }}>🎁</div>
        </div>); })()}
      <div style={{ position: "absolute", left: `${p * 100}%`, top: 11, width: 38, height: 38, borderRadius: "50%", background: CLAY, border: "5px solid #F3EFE7", boxShadow: "0 0 18px rgba(210,114,78,0.95)", transform: "translateX(-50%)" }} />
    </div>
  );
};

// ---------------- captions ----------------
type W = { start: number; end: number; word: string };
// merge whisper fragments ("%", "-by", "-step", stray punctuation) into the previous word
const cw: W[] = (() => {
  const out: W[] = [];
  (words as W[]).forEach((w) => {
    const tk = w.word.trim();
    const frag = tk === "" || /^[%\-.,!?;:)%]/.test(tk);
    if (frag && out.length) { const p = out[out.length - 1]; out[out.length - 1] = { ...p, word: p.word + w.word, end: w.end }; }
    else out.push({ ...w });
  });
  return out;
})();
const lines: { words: W[]; start: number; end: number }[] = (() => {
  const out: { words: W[]; start: number; end: number }[] = [];
  let cur: W[] = [];
  cw.forEach((w, i) => {
    cur.push(w);
    const next = cw[i + 1];
    const gap = next ? next.start - w.end : 99;
    const endsSent = /[.!?]$/.test(w.word.trim());
    if (cur.length >= 4 || gap > 0.34 || endsSent) { out.push({ words: cur, start: cur[0].start, end: w.end }); cur = []; }
  });
  if (cur.length) out.push({ words: cur, start: cur[0].start, end: cur[cur.length - 1].end });
  return out;
})();

const Captions: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  if (t >= L[4] - 0.05) return null; // CTA speaks for itself
  const lead = 0.10;
  let cur = lines[0];
  for (const ln of lines) if (t + lead >= ln.start) cur = ln;
  if (t + lead < cur.start || t > cur.end + 0.5) { /* still show last */ }
  return (
    <div style={{ position: "absolute", left: 80, right: 80, top: 1206, textAlign: "center", zIndex: 90 }}>
      <div style={{ display: "inline-flex", flexWrap: "wrap", justifyContent: "center", gap: "0 16px" }}>
        {cur.words.map((w, i) => { const on = t + lead >= w.start; const active = on && (i === cur.words.length - 1 || t + lead < cur.words[i + 1].start); return (
          <span key={i} style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 66, lineHeight: 1.12, letterSpacing: "-0.01em", color: on ? (active ? "#B8501F" : CLAY) : "transparent", transform: active ? "translateY(-3px) scale(1.04)" : "none", display: "inline-block", textShadow: "0 2px 12px rgba(255,251,244,0.9), 0 1px 2px rgba(120,56,26,0.35)" }}>{w.word.trim()}</span>); })}
      </div>
    </div>
  );
};

// ---------------- SFX ----------------
const Sfx: React.FC<{ at: number; src: string; v?: number; dur?: number }> = ({ at, src, v = 0.35, dur = 2.2 }) => (
  <Sequence from={fr(at)} durationInFrames={fr(dur)}><Audio src={staticFile(`sfx/${src}`)} volume={v} /></Sequence>
);

export const ClaudeSharpReel: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 16, 28], [1.0, 1.03, 1.0], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  const scene = (i: number) => frame >= Lf[i] && (i === Lf.length - 1 || frame < Lf[i + 1]);
  return (
    <AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
      <Audio src={staticFile("vo_sharp.wav")} />
      <Audio loop src={staticFile("seo_music.wav")} volume={(ff) => interpolate(ff, [0, fr(1.4), fr(L[4]) - 8, fr(L[4]) + 14, 99999], [0, 0.19, 0.19, 0.14, 0.14], { extrapolateRight: "clamp" })} />
      <Sfx at={0} src="metal_riser.wav" v={0.7} /><Sfx at={0.2} src="boom.wav" v={0.55} />
      <Sfx at={3.86} src="ding.wav" v={0.4} />
      {L.slice(1).map((tt, i) => <React.Fragment key={i}><Sfx at={tt - 0.08} src="swish.wav" v={0.42} /><Sfx at={tt + 0.28} src="pop.wav" v={0.28} /></React.Fragment>)}
      <Sfx at={9.4} src="snap.wav" v={0.4} /><Sfx at={13.9} src="ding.wav" v={0.34} />
      <Sfx at={18.8} src="thock.wav" v={0.5} /><Sfx at={23.9} src="resolve.wav" v={0.5} />
      <Sfx at={L[4]} src="resolve.wav" v={0.5} /><Sfx at={L[4] + 0.3} src="sparkle.wav" v={0.5} /><Sfx at={L[4] + 0.2} src="angelic.wav" v={0.35} dur={3} />

      <Bg />
      <AbsoluteFill style={{ transform: `translateY(90px) scale(${zoom})`, transformOrigin: "50% 44%" }}>
        {/* navy stage fades out for the CTA so it sits on the light background */}
        <AbsoluteFill style={{ opacity: interpolate(frame, [Lf[4] - 4, Lf[4] + 6], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}><Stage /></AbsoluteFill>
        {scene(0) && <Hook lf={frame - Lf[0]} />}
        {scene(1) && <M1 lf={frame - Lf[1]} />}
        {scene(2) && <M2 lf={frame - Lf[2]} />}
        {scene(3) && <M3 lf={frame - Lf[3]} />}
        {scene(4) && <CTA lf={frame - Lf[4]} />}
        <Captions />
      </AbsoluteFill>
      <ProgressBar />
    </AbsoluteFill>
  );
};
