import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing, Audio, Sequence, staticFile } from "remotion";
import { fraunces, inter } from "./fonts";
import words from "./data/words_attack.json";

const CREAM = "#ECE9E2", INK = "#1A1813", SLATE = "#3A5C84", CLAY = "#D2724E", AMBER = "#CF9544", GOLD = "#E7B24C", GREEN = "#3F9E74", MUTE = "#9A968B", RED = "#C44A3A";
const NAVY = "#233250", NAVY2 = "#18233A", PAPER = "#F7F3EA";
const mono = "ui-monospace,'SF Mono',Menlo,monospace";
const FPS = 30;
const fr = (s: number) => Math.round(s * FPS);
const grad = (a: string, b: string) => `linear-gradient(158deg, ${a} 0%, ${b} 100%)`;
const NAVYSH = "0 34px 66px -22px rgba(18,28,58,0.55), 0 10px 24px rgba(18,28,58,0.30)";

// scene starts (sec): hook, flip, prompt, flags, loop, everywhere, cta
const L = [0, 8.28, 12.40, 21.16, 27.26, 33.82, 38.70];
const Lf = L.map(fr);

const over = (f: number, start: number, dur: number, ease = Easing.out(Easing.cubic)) =>
  interpolate(f, [start, start + dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
const ramp = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const seed = (n: number) => { const x = Math.sin(n * 127.1 + 43.7) * 43758.5453; return x - Math.floor(x); };

const ClaudeMark: React.FC<{ size?: number }> = ({ size = 40 }) => (
  <div style={{ width: size, height: size, borderRadius: size * 0.26, background: grad("#E9825C", "#C7541F"), display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 14px rgba(199,84,31,0.45), inset 0 2px 3px rgba(255,255,255,0.4)", flexShrink: 0 }}>
    <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: size * 0.6, color: "#fff", lineHeight: 1 }}>*</div>
  </div>
);

const Bg: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: grad("#EFEBE3", "#E4DFD4") }}>
      <div style={{ position: "absolute", left: -140, top: 240, width: 640, height: 640, borderRadius: "50%", background: "radial-gradient(circle, rgba(210,114,78,0.16), transparent 62%)", filter: "blur(10px)" }} />
      <div style={{ position: "absolute", right: -170, top: 620, width: 720, height: 720, borderRadius: "50%", background: "radial-gradient(circle, rgba(58,92,132,0.14), transparent 62%)", filter: "blur(12px)" }} />
      <div style={{ position: "absolute", left: -60, top: -60, width: 700, height: 700, background: "radial-gradient(circle at 30% 30%, rgba(255,248,235,0.5), transparent 60%)" }} />
      {Array.from({ length: 16 }, (_, i) => { const s = seed(i + 3); const x = seed(i * 2.3) * 1080; const y = ((seed(i * 1.7) * 1920 + f * (0.3 + s * 0.5)) % 1920); return (
        <div key={i} style={{ position: "absolute", left: x, top: y, width: 3 + s * 3, height: 3 + s * 3, borderRadius: "50%", background: "rgba(255,255,255,0.5)", opacity: 0.25 + s * 0.3 }} />); })}
      <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 320px rgba(40,32,24,0.28)" }} />
    </AbsoluteFill>
  );
};

const Stage: React.FC = () => (
  <div style={{ position: "absolute", left: 34, right: 34, top: 300, height: 838, borderRadius: 46, background: grad(NAVY, NAVY2), boxShadow: NAVYSH, overflow: "hidden" }}>
    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 24%, rgba(120,150,210,0.16), transparent 60%)" }} />
    <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 2px 0 rgba(255,255,255,0.08), inset 0 0 120px rgba(0,0,0,0.35)" }} />
    <div style={{ position: "absolute", left: 34, top: 30, display: "flex", gap: 12 }}>
      {[RED, AMBER, GREEN].map((c, i) => <div key={i} style={{ width: 16, height: 16, borderRadius: "50%", background: c, opacity: 0.85 }} />)}
    </div>
  </div>
);

const Firework: React.FC<{ lf: number; at: number; x: number; y: number; hue?: number }> = ({ lf, at, x, y, hue = 0 }) => {
  const bl = lf - at;
  if (bl < 0 || bl > 32) return null;
  const pr = bl / 32;
  return (<>
    {Array.from({ length: 12 }, (_, k) => {
      const a = (k / 12) * Math.PI * 2 + seed(k + hue);
      const d = Math.pow(pr, 0.6) * (70 + seed(k * 3 + hue) * 60);
      const o = Math.max(0, 1 - pr * 1.2);
      const c = [GOLD, CLAY, "#F3E3A6", GREEN][(k + hue) % 4];
      return <div key={k} style={{ position: "absolute", left: x + Math.cos(a) * d, top: y + Math.sin(a) * d + pr * pr * 34, width: 8, height: 8, borderRadius: "50%", background: c, opacity: o, boxShadow: `0 0 10px ${c}`, zIndex: 40 }} />;
    })}
  </>);
};

// mini sales-page mock (title bar + hero + text lines + price)
const PageMock: React.FC<{ w: number; tint?: string; children?: React.ReactNode }> = ({ w, tint, children }) => (
  <div style={{ position: "relative", width: w, borderRadius: 20, background: PAPER, boxShadow: "0 24px 46px -16px rgba(10,16,34,0.6)", overflow: "hidden", border: `3px solid ${tint || "#D8CDBB"}` }}>
    <div style={{ height: 34, background: "#E9E4DA", display: "flex", alignItems: "center", padding: "0 12px", gap: 6 }}>
      {["#ED6A5E", "#F4BF4F", "#61C554"].map((c, i) => <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
      <div style={{ marginLeft: 8, height: 16, borderRadius: 6, background: "#fff", flex: 1 }} />
    </div>
    <div style={{ padding: "16px 20px" }}>{children}</div>
  </div>
);

// ---- the Claude mascot: the pixel critter (blocky body, square eyes, side nubs, four legs) ----
const Mascot: React.FC<{ lf: number; size?: number; gaze?: number; nodAmp?: number; nodSpeed?: number; shock?: number; cheer?: number }> = ({ lf, size = 250, gaze = 0, nodAmp = 3.5, nodSpeed = 10, shock = 0, cheer = 0 }) => {
  const C = "#D97757"; // Anthropic clay
  // agreement = excited little hops; hops get faster via nodSpeed, freeze on shock
  const hopP = Math.max(0, Math.sin(lf / (nodSpeed * 0.6)));
  const hop = hopP * nodAmp * 2.2 * (1 - shock);
  const squash = 1 - hopP * 0.045 * (1 - shock) + shock * 0.03;
  const blink = (lf % 84) < 5 && shock < 0.3 ? 0.15 : 1;
  const eyeH = (26 + shock * 16) * blink;      // eyes stretch tall on shock
  const jump = shock > 0.05 ? Math.max(0, 1 - Math.abs(shock - 0.35) * 4) * 42 : 0;   // startled pop-up
  // legs wiggle alternately while hopping
  const legLift = (i: number) => (shock > 0.3 ? 0 : Math.max(0, Math.sin(lf / (nodSpeed * 0.6) + i * Math.PI)) * 7);
  const armY = 86 - hop * 0.4 - cheer * 26;    // arms throw UP when cheering
  return (
    <div style={{ width: size, height: size, position: "relative", transform: `translateY(${-hop - jump}px) scaleY(${squash})`, transformOrigin: "50% 100%" }}>
      <svg viewBox="0 0 200 200" width={size} height={size} shapeRendering="crispEdges">
        {/* side nub arms (cheer = thrown up) */}
        <rect x={8 - cheer * 4} y={armY} width={26} height={26} fill={C} transform={cheer > 0.2 ? `rotate(${-cheer * 28} 21 ${armY + 13})` : undefined} />
        <rect x={166 + cheer * 4} y={armY} width={26} height={26} fill={C} transform={cheer > 0.2 ? `rotate(${cheer * 28} 179 ${armY + 13})` : undefined} />
        {/* body */}
        <rect x={34} y={44} width={132} height={102} fill={C} />
        {/* subtle top-light for depth (still flat/pixel) */}
        <rect x={34} y={44} width={132} height={10} fill="rgba(255,255,255,0.16)" />
        {/* four legs (two pairs), wiggling */}
        <rect x={52} y={146 - legLift(0)} width={17} height={38} fill={C} />
        <rect x={77} y={146 - legLift(1)} width={17} height={38} fill={C} />
        <rect x={124} y={146 - legLift(0)} width={17} height={38} fill={C} />
        <rect x={149} y={146 - legLift(1)} width={17} height={38} fill={C} />
        {/* square eyes (gaze toward the other mascot; stretch tall + wide-set on shock) */}
        <rect x={70 + gaze - (shock > 0.4 ? 2 : 0)} y={70 + (26 - eyeH) / 2} width={15 + (shock > 0.4 ? 4 : 0)} height={eyeH} fill="#151312" />
        <rect x={116 + gaze - (shock > 0.4 ? 2 : 0)} y={70 + (26 - eyeH) / 2} width={15 + (shock > 0.4 ? 4 : 0)} height={eyeH} fill="#151312" />
        {/* mouth only appears on shock: small square "o" */}
        {shock > 0.4 && <rect x={93 + gaze} y={116} width={16} height={14} fill="#151312" />}
      </svg>
      {/* sweat drop on shock */}
      {shock > 0.4 && <div style={{ position: "absolute", right: size * 0.1, top: size * 0.1, fontSize: size * 0.13, opacity: Math.min(1, shock * 1.5) }}>💧</div>}
    </div>
  );
};

// speech bubble for the mascots
const Bubble: React.FC<{ lf: number; at: number; side: "left" | "right"; text: string; dead?: number }> = ({ lf, at, side, text, dead = 0 }) => {
  const o = over(lf, at, 8, Easing.out(Easing.back(1.9)));
  if (o <= 0.01) return null;
  return (
    <div style={{ position: "absolute", [side]: 74, top: 0, maxWidth: 430, opacity: o * (1 - dead * 0.6), transform: `translateY(${(1 - o) * 18}px) scale(${0.9 + o * 0.1})` } as React.CSSProperties}>
      <div style={{ padding: "13px 22px", borderRadius: 18, [side === "left" ? "borderBottomLeftRadius" : "borderBottomRightRadius"]: 4, background: "#EAF3ED", border: "2px solid #BFD8C7", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 26, color: "#2C7A57", boxShadow: "0 12px 26px -10px rgba(10,16,34,0.55)", whiteSpace: "nowrap" } as React.CSSProperties}>{text}</div>
    </div>
  );
};

// ---------------- HOOK: two Claude mascots agreeing with each other ----------------
const Hook: React.FC<{ lf: number }> = ({ lf }) => {
  const inn = over(lf, 0, 9);
  const slam = over(lf, fr(5.9), 9, Easing.out(Easing.back(2.2)));
  const shock = over(lf, fr(5.9), 8);
  const mIn1 = over(lf, fr(0.3), 11, Easing.out(Easing.back(1.5)));
  const mIn2 = over(lf, fr(0.55), 11, Easing.out(Easing.back(1.5)));
  const dead = shock; // dims the agree-bubbles after the slam
  const tPulse = 1 + Math.max(0, Math.sin(lf / 4.2)) * 0.02;
  // nod speeds up as the agreement escalates
  const nodSpeed = interpolate(lf, [0, fr(5.5)], [11, 6], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <>
      {/* one-line title */}
      <div style={{ position: "absolute", left: 44, right: 44, top: 368, textAlign: "center", opacity: inn, transform: `scale(${tPulse})`, zIndex: 34 }}>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 52, lineHeight: 1, letterSpacing: "-0.02em", color: "#F4EFE4", textShadow: "0 0 34px rgba(231,178,76,0.3)", whiteSpace: "nowrap" }}>
          <span style={{ color: AMBER }}>Fable 5</span> agrees with everything
        </div>
      </div>
      {/* speech bubbles row (one slot per side, new bubble replaces old) */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 486, height: 90, zIndex: 22 }}>
        {over(lf, fr(3.8), 5) < 0.5 && <Bubble lf={lf} at={fr(1.0)} side="left" text="Looks great! ✓" dead={dead} />}
        {over(lf, fr(3.8), 5) >= 0.5 && <Bubble lf={lf} at={fr(3.8)} side="left" text="Your sales page? Perfect ✓" dead={dead} />}
        {over(lf, fr(4.9), 5) < 0.5 && <Bubble lf={lf} at={fr(2.1)} side="right" text="So true! ✓" dead={dead} />}
        {over(lf, fr(4.9), 5) >= 0.5 && <Bubble lf={lf} at={fr(4.9)} side="right" text="Ship it! ✓" dead={dead} />}
      </div>
      {/* the sales page they're agreeing about: floats up between them, gets "polished", dies at the slam */}
      {(() => { const pg = over(lf, fr(3.5), 12, Easing.out(Easing.back(1.4))); if (pg <= 0.01) return null; const shine = ramp(lf, fr(4.1), fr(5.4)); return (
        <div style={{ position: "absolute", left: "50%", top: 620, width: 260, transform: `translateX(-50%) translateY(${(1 - pg) * 60 + Math.sin(lf / 11) * 6 + shock * 40}px) rotate(${shock * 14}deg)`, opacity: pg, zIndex: 15 }}>
          <PageMock w={260} tint={shock > 0.4 ? RED : GOLD}>
            <div style={{ position: "relative", overflow: "hidden" }}>
              <div style={{ height: 15, borderRadius: 7, width: "70%", background: "#C9BEA9", marginBottom: 10 }} />
              {[0, 1].map((i) => <div key={i} style={{ height: 10, borderRadius: 5, width: `${86 - i * 12}%`, background: "#DCD2C0", marginBottom: 9 }} />)}
              <div style={{ height: 30, borderRadius: 8, width: 110, background: shock > 0.4 ? "#E5B3AC" : "#BFD8C7", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 15, color: shock > 0.4 ? RED : "#2C7A57" }}>Buy · $499</div>
              {/* polish shine sweep */}
              {shine > 0.02 && shine < 0.98 && <div style={{ position: "absolute", top: -10, bottom: -10, left: `${-30 + shine * 150}%`, width: "36%", background: "linear-gradient(105deg, transparent, rgba(255,255,255,0.75), transparent)" }} />}
            </div>
          </PageMock>
          {/* polish sparkles */}
          {shine > 0.05 && shine < 0.95 && Array.from({ length: 3 }, (_, k) => <div key={k} style={{ position: "absolute", left: 20 + shine * 190 + k * 14, top: 8 + seed(k) * 90, fontSize: 20 + seed(k + 2) * 8, opacity: 0.9 }}>✨</div>)}
          <div style={{ position: "absolute", left: -12, top: -18, padding: "5px 13px", borderRadius: 999, background: SLATE, color: "#fff", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 16, boxShadow: "0 6px 14px rgba(20,30,55,0.45)", transform: "rotate(-4deg)" }}>your sales page</div>
        </div>); })()}
      {/* the two mascots: WALK IN from the edges, hop faster as they agree, cheer on each bubble */}
      {(() => {
        const pulse = (at: number) => over(lf, at, 5) * (1 - ramp(lf, at + 12, at + 28));
        const cheerL = Math.min(1, pulse(fr(1.0)) + pulse(fr(3.8))) * (1 - shock);
        const cheerR = Math.min(1, pulse(fr(2.1)) + pulse(fr(4.9))) * (1 - shock);
        const walk1 = over(lf, 2, 26, Easing.out(Easing.cubic));
        const walk2 = over(lf, 8, 26, Easing.out(Easing.cubic));
        return (<>
          <div style={{ position: "absolute", left: 44, top: 566, transform: `translateX(${(1 - walk1) * -420}px)` }}>
            <Mascot lf={lf} size={400} gaze={10} nodAmp={4} nodSpeed={nodSpeed} shock={shock} cheer={cheerL} />
          </div>
          <div style={{ position: "absolute", right: 44, top: 566, transform: `translateX(${(1 - walk2) * 420}px)` }}>
            <Mascot lf={lf} size={400} gaze={-10} nodAmp={4} nodSpeed={nodSpeed * 1.12} shock={shock} cheer={cheerR} />
          </div>
          {/* name chips (fade at the slam) */}
          <div style={{ position: "absolute", left: 44, width: 400, top: 946, textAlign: "center", opacity: walk1 * (1 - slam) }}>
            <span style={{ padding: "5px 18px", borderRadius: 999, background: "rgba(233,130,92,0.2)", border: "2px solid rgba(233,130,92,0.55)", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 21, color: "#F0C4AC" }}>Claude</span>
          </div>
          <div style={{ position: "absolute", right: 44, width: 400, top: 946, textAlign: "center", opacity: walk2 * (1 - slam) }}>
            <span style={{ padding: "5px 18px", borderRadius: 999, background: "rgba(233,130,92,0.2)", border: "2px solid rgba(233,130,92,0.55)", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 21, color: "#F0C4AC" }}>also Claude</span>
          </div>
        </>);
      })()}
      {/* agree-particles floating up between them (✓ and ♥), pop away at the slam */}
      {shock < 0.5 && Array.from({ length: 8 }, (_, k) => {
        const born = fr(1.2) + k * 17; const bl = lf - born; if (bl < 0 || bl > 70) return null;
        const pr = bl / 70; const x = 450 + seed(k * 3) * 180; const y = 700 - pr * 200;
        return <div key={k} style={{ position: "absolute", left: x + Math.sin(bl / 9 + k) * 18, top: y, fontSize: 36 + seed(k) * 16, opacity: Math.min(1, bl / 8) * (1 - pr), zIndex: 18 }}>{k % 2 ? "✓" : "🧡"}</div>;
      })}
      {/* the slam */}
      {slam > 0.01 && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 1006, textAlign: "center", transform: `scale(${slam}) rotate(${(1 - slam) * 8 - 2}deg)`, zIndex: 36 }}>
          <span style={{ display: "inline-block", padding: "13px 34px", borderRadius: 999, background: RED, color: "#fff", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 45, boxShadow: "0 0 38px rgba(196,74,58,0.7)" }}>...and the page still won't sell</span>
        </div>
      )}
      <Firework lf={lf} at={fr(0.9)} x={160} y={664} hue={1} />
      <Firework lf={lf} at={fr(2.8)} x={920} y={700} hue={3} />
    </>
  );
};

// ---------------- FLIP: one instruction -> harshest editor ----------------
const Flip: React.FC<{ lf: number }> = ({ lf }) => {
  const rot = over(lf, fr(1.1), 16, Easing.inOut(Easing.cubic));   // card flips
  const deg = rot * 180;
  const front = deg < 90;
  const shake = rot >= 1 ? Math.sin(lf * 2.2) * Math.max(0, 1 - (lf - fr(1.1) - 16) / 14) * 4 : 0;
  const lab = over(lf, fr(2.3), 10);
  return (
    <>
      <div style={{ position: "absolute", left: 0, right: 0, top: 372, textAlign: "center", opacity: over(lf, 1, 8), zIndex: 30 }}>
        <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 60, color: "#F4EFE4" }}>one instruction <span style={{ color: AMBER }}>flips it</span></span>
      </div>
      <div style={{ position: "absolute", left: "50%", top: 520, width: 620, height: 400, transform: `translateX(-50%) translateX(${shake}px)`, perspective: 1400 }}>
        <div style={{ position: "absolute", inset: 0, transform: `rotateY(${deg}deg)`, transformStyle: "preserve-3d" }}>
          {front ? (
            <div style={{ position: "absolute", inset: 0, borderRadius: 24, background: PAPER, boxShadow: "0 26px 50px -16px rgba(10,16,34,0.6)", border: "3px solid #BFD8C7", padding: "26px 30px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}><ClaudeMark size={44} /><span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 32, color: INK }}>polite mode</span></div>
              <div style={{ padding: "14px 22px", borderRadius: 16, background: "#EAF3ED", border: "2px solid #BFD8C7", display: "inline-block", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 26, color: "#2C7A57" }}>Looks great! ✓</div>
              <div style={{ marginTop: 18, padding: "14px 22px", borderRadius: 16, background: "#EAF3ED", border: "2px solid #BFD8C7", display: "inline-block", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 26, color: "#2C7A57" }}>Nice work ✓</div>
            </div>
          ) : (
            <div style={{ position: "absolute", inset: 0, borderRadius: 24, background: "#1A1010", boxShadow: `0 26px 50px -16px rgba(10,16,34,0.7), 0 0 44px rgba(196,74,58,0.5)`, border: `3px solid ${RED}`, padding: "26px 30px", transform: "rotateY(180deg)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                <span style={{ fontSize: 44 }}>⚔️</span>
                <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 40, color: "#F5DEDA", letterSpacing: 1 }}>ATTACK MODE</span>
              </div>
              <div style={{ padding: "14px 22px", borderRadius: 16, background: "rgba(196,74,58,0.16)", border: `2px solid ${RED}`, display: "inline-block", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 25, color: "#F0B9B0" }}>This won't convert. Here's why:</div>
              {["weak headline", "no proof", "buried offer"].map((tx, i) => { const ap = over(lf, fr(2.0) + i * 6, 7); return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 14, opacity: ap, transform: `translateX(${(1 - ap) * -24}px)` }}>
                  <span style={{ fontSize: 26, color: RED }}>⚑</span>
                  <span style={{ fontFamily: mono, fontSize: 24, color: "#E8B7AE" }}>{tx}</span>
                  <div style={{ height: 10, borderRadius: 5, width: 120 - i * 24, background: "rgba(196,74,58,0.3)" }} />
                </div>); })}
            </div>
          )}
        </div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 968, textAlign: "center", opacity: lab }}>
        <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 42, color: "#F4EFE4" }}>the harshest editor you've ever had</span>
      </div>
    </>
  );
};

// ---------------- PROMPT: the steal-box types in ----------------
const Prompt: React.FC<{ lf: number }> = ({ lf }) => {
  const LINE = "Attack this page. List every reason someone closes the tab without buying.";
  const chars = Math.max(0, Math.floor((lf - fr(1.3)) * 0.52));   // synced to the VO reading it (~13.9s -> 19.5s)
  const typed = LINE.slice(0, chars);
  const done = chars >= LINE.length;
  const glow = 0.25 + Math.max(0, Math.sin(lf / 6)) * 0.2;
  const blunt = over(lf, fr(7.3), 10, Easing.out(Easing.back(1.6)));  // "stops being polite"
  return (
    <>
      <div style={{ position: "absolute", left: 0, right: 0, top: 372, textAlign: "center", opacity: over(lf, 1, 8) }}>
        <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 56, color: "#F4EFE4" }}>say this instead:</span>
      </div>
      <div style={{ position: "absolute", left: 100, right: 100, top: 496 }}>
        <div style={{ borderRadius: 20, background: "#121B2C", border: `3px solid ${CLAY}`, boxShadow: `0 24px 46px -16px rgba(10,16,34,0.7), 0 0 34px rgba(210,114,78,${glow})`, padding: "22px 28px" }}>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 17, letterSpacing: 2.5, color: CLAY, marginBottom: 12 }}>STEAL THIS PROMPT</div>
          <div style={{ fontFamily: mono, fontSize: 34, lineHeight: 1.4, color: "#EDE7DB", minHeight: 144 }}>
            {typed}<span style={{ opacity: Math.sin(lf / 3) > 0 && !done ? 1 : 0 }}>▌</span>
          </div>
        </div>
        {/* save trigger, pinned once the prompt is fully typed */}
        {(() => { const s = over(lf, fr(6.4), 9, Easing.out(Easing.back(2))); if (s <= 0.01) return null; return (
          <div style={{ position: "absolute", right: -16, top: -22, transform: `scale(${s}) rotate(4deg)` }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 18px", borderRadius: 999, background: GOLD, color: "#3A2A08", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 21, boxShadow: `0 0 22px rgba(231,178,76,0.6)` }}>🔖 save this</span>
          </div>); })()}
      </div>
      {/* polite bubble gets slashed -> blunt reply */}
      {blunt > 0.01 && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 852, display: "flex", justifyContent: "center", gap: 26, alignItems: "center" }}>
          <div style={{ position: "relative", padding: "12px 22px", borderRadius: 16, background: "#EAF3ED", border: "2px solid #BFD8C7", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 24, color: "#7FA98D", opacity: 0.75 }}>
            Looks great ✓
            <div style={{ position: "absolute", left: -8, right: -8, top: "50%", height: 6, background: RED, borderRadius: 3, transform: `rotate(-7deg) scaleX(${blunt})`, transformOrigin: "left center", boxShadow: `0 0 12px ${RED}` }} />
          </div>
          <span style={{ fontSize: 40, color: "#F4EFE4", opacity: blunt }}>→</span>
          <div style={{ padding: "12px 22px", borderRadius: 16, background: "rgba(196,74,58,0.18)", border: `2px solid ${RED}`, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 24, color: "#F0B9B0", opacity: blunt, transform: `scale(${0.85 + blunt * 0.15})` }}>7 reasons this fails ⚑</div>
        </div>
      )}
    </>
  );
};

// ---------------- FLAGS: it flags the real problems ----------------
const Flags: React.FC<{ lf: number }> = ({ lf }) => {
  const flags = [
    { at: fr(0.6), y: 118, tx: "price, no reason to believe it", short: "PRICE ⚑" },
    { at: fr(2.4), y: 208, tx: "a guarantee nobody believes", short: "GUARANTEE ⚑" },
    { at: fr(3.9), y: 22, tx: "3 paragraphs before the offer", short: "WALL OF TEXT ⚑" },
  ];
  return (
    <>
      <div style={{ position: "absolute", left: 0, right: 0, top: 368, textAlign: "center", opacity: over(lf, 1, 8) }}>
        <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 58, color: "#F4EFE4" }}>it flags what <span style={{ color: RED }}>actually hurts</span></span>
      </div>
      <div style={{ position: "absolute", left: "50%", top: 496, width: 560, transform: "translateX(-50%)" }}>
        <PageMock w={560}>
          {/* wall of text block */}
          <div style={{ position: "relative", padding: "4px 2px 0" }}>
            {[0, 1, 2].map((i) => <div key={i} style={{ height: 13, borderRadius: 6, width: `${90 - i * 7}%`, background: over(lf, flags[2].at, 6) > 0.4 ? "#E8C4BC" : "#DCD2C0", marginBottom: 10 }} />)}
            {/* price row */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, margin: "16px 0" }}>
              <div style={{ height: 44, borderRadius: 10, width: 170, background: over(lf, flags[0].at, 6) > 0.4 ? "#E8C4BC" : "#D5E4DA", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 21, color: over(lf, flags[0].at, 6) > 0.4 ? RED : "#2C7A57" }}>$499</div>
              <div style={{ height: 12, borderRadius: 6, flex: 1, background: "#DCD2C0" }} />
            </div>
            {/* guarantee row */}
            <div style={{ height: 40, borderRadius: 10, width: 300, background: over(lf, flags[1].at, 6) > 0.4 ? "#E8C4BC" : "#EDE5D5", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 18, color: over(lf, flags[1].at, 6) > 0.4 ? RED : MUTE }}>"100% guarantee!!"</div>
          </div>
        </PageMock>
        {/* flag pins slam in from the right */}
        {flags.map((f, i) => { const s = over(lf, f.at, 8, Easing.out(Easing.back(2.2))); if (s <= 0.01) return null; return (
          <div key={i} style={{ position: "absolute", right: -34, top: f.y, transform: `scale(${s}) rotate(${3 - i * 3}deg)`, transformOrigin: "right center", zIndex: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 20px", borderRadius: 999, background: RED, boxShadow: `0 0 26px rgba(196,74,58,0.6)` }}>
              <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 22, color: "#fff", whiteSpace: "nowrap" }}>{f.short}</span>
            </div>
          </div>); })}
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 952, textAlign: "center", opacity: over(lf, fr(4.6), 9) }}>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 28, color: "#C7CFDD" }}>the stuff your friends are too nice to say</span>
      </div>
    </>
  );
};

// ---------------- LOOP: fix -> paste -> zero -> READY ----------------
const Loop: React.FC<{ lf: number }> = ({ lf }) => {
  const spin = lf * 4;
  const st1 = over(lf, fr(0.9), 8);     // fix + paste back
  const st2 = over(lf, fr(2.6), 8, Easing.out(Easing.back(1.8)));   // finds more
  const st3 = over(lf, fr(4.6), 8);     // comes back with nothing
  const ready = over(lf, fr(5.9), 9, Easing.out(Easing.back(2)));   // READY seal
  return (
    <>
      <div style={{ position: "absolute", left: 0, right: 0, top: 368, textAlign: "center", opacity: over(lf, 1, 8) }}>
        <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 58, color: "#F4EFE4" }}>fix it, <span style={{ color: AMBER }}>paste it back</span></span>
      </div>
      {/* cycle: page card with orbiting arrow */}
      <div style={{ position: "absolute", left: "50%", top: 540, transform: "translateX(-50%)", width: 420 }}>
        <PageMock w={420} tint={ready > 0.4 ? GREEN : undefined}>
          <div style={{ height: 18, borderRadius: 8, width: "70%", background: "#C9BEA9", marginBottom: 12 }} />
          {[0, 1, 2].map((i) => <div key={i} style={{ height: 11, borderRadius: 6, width: `${85 - i * 10}%`, background: "#DCD2C0", marginBottom: 9 }} />)}
        </PageMock>
        {/* orbiting refresh arrow */}
        {ready < 0.3 && <div style={{ position: "absolute", left: "50%", top: "46%", width: 0, height: 0 }}>
          <div style={{ position: "absolute", left: Math.cos(spin / 18) * 260 - 26, top: Math.sin(spin / 18) * 150 - 26, fontSize: 52, transform: `rotate(${spin * 2}deg)`, opacity: 0.9 }}>🔁</div>
        </div>}
        {/* status chips */}
        <div style={{ position: "absolute", left: -180, top: 40, opacity: st1, transform: `translateX(${(1 - st1) * -30}px)` }}>
          <span style={{ padding: "9px 18px", borderRadius: 999, background: GREEN, color: "#fff", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 21, boxShadow: "0 8px 18px rgba(63,158,116,0.4)", whiteSpace: "nowrap" }}>fixed ✓ pasted ↩</span>
        </div>
        <div style={{ position: "absolute", right: -196, top: 120, opacity: st2, transform: `scale(${st2}) rotate(3deg)` }}>
          <span style={{ padding: "9px 18px", borderRadius: 999, background: RED, color: "#fff", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 21, boxShadow: "0 0 22px rgba(196,74,58,0.55)", whiteSpace: "nowrap" }}>found 2 more ⚑</span>
        </div>
        <div style={{ position: "absolute", left: -172, bottom: -6, opacity: st3, transform: `translateX(${(1 - st3) * -30}px)` }}>
          <span style={{ padding: "9px 18px", borderRadius: 999, background: "#25314A", color: "#C7CFDD", border: `2px solid ${SLATE}`, fontFamily: mono, fontWeight: 700, fontSize: 20, whiteSpace: "nowrap" }}>0 issues found</span>
        </div>
        {/* READY seal */}
        {ready > 0.01 && (
          <div style={{ position: "absolute", left: "50%", top: "36%", transform: `translate(-50%,-50%) scale(${ready}) rotate(-8deg)`, zIndex: 25 }}>
            <div style={{ padding: "16px 42px", borderRadius: 20, background: GREEN, border: "5px solid #DFF2E6", boxShadow: `0 0 46px rgba(63,158,116,0.75)` }}>
              <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 62, color: "#fff", letterSpacing: 2 }}>READY ✓</span>
            </div>
          </div>
        )}
      </div>
      <Firework lf={lf} at={fr(6.1)} x={300} y={560} hue={2} />
      <Firework lf={lf} at={fr(6.3)} x={800} y={640} hue={4} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 962, textAlign: "center", opacity: over(lf, fr(2.8), 9) }}>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 28, color: "#C7CFDD" }}>repeat until it finds <span style={{ color: GOLD }}>nothing</span></span>
      </div>
    </>
  );
};

// ---------------- EVERYWHERE ----------------
const Everywhere: React.FC<{ lf: number }> = ({ lf }) => {
  const chips = [
    { at: fr(1.0), icon: "📄", tx: "your proposal" },
    { at: fr(3.0), icon: "✉️", tx: "your pricing email" },
    { at: fr(4.1), icon: "🖥", tx: "your landing page" },
  ];
  return (
    <>
      <div style={{ position: "absolute", left: 0, right: 0, top: 380, textAlign: "center", opacity: over(lf, 1, 8) }}>
        <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 58, color: "#F4EFE4" }}>same trick, <span style={{ color: AMBER }}>everything</span></span>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 540, display: "flex", flexDirection: "column", alignItems: "center", gap: 26 }}>
        {chips.map((c, i) => { const o = over(lf, c.at, 9, Easing.out(Easing.back(1.7))); if (o <= 0.01) return null; return (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 18, padding: "18px 34px", borderRadius: 22, background: PAPER, boxShadow: "0 18px 36px -14px rgba(10,16,34,0.55)", opacity: o, transform: `translateY(${(1 - o) * 26}px) scale(${0.92 + o * 0.08})`, width: 560 }}>
            <span style={{ fontSize: 44 }}>{c.icon}</span>
            <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 36, color: INK }}>{c.tx}</span>
            <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 26, color: RED, opacity: 1 - over(lf, c.at + 10, 8) }}>⚑</span>
              <span style={{ width: 34, height: 34, borderRadius: "50%", background: GREEN, color: "#fff", fontSize: 19, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center", opacity: over(lf, c.at + 10, 8) }}>✓</span>
            </span>
          </div>); })}
      </div>
      {/* share trigger */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 972, textAlign: "center", opacity: over(lf, fr(4.4), 9) }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "9px 22px", borderRadius: 999, background: "rgba(58,92,132,0.28)", border: "2px solid rgba(122,152,196,0.5)", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 24, color: "#C7CFDD" }}>📤 send this to someone who sells stuff</span>
      </div>
    </>
  );
};

// ---------------- CTA ----------------
const CTA: React.FC<{ lf: number }> = ({ lf }) => {
  const doc = over(lf, fr(0.2), 13, Easing.out(Easing.back(1.3)));
  const o = over(lf, fr(0.7), 12);
  const key = over(lf, fr(1.2), 14, Easing.out(Easing.back(1.5)));
  const shine = ((lf - fr(1.6)) % 42) / 42;
  const items = ["The attack prompt", "The fix + paste loop", "Works on anything"];
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-start", paddingTop: 306 }}>
      {Array.from({ length: 18 }, (_, k) => { const a = (k / 18) * Math.PI * 2 + seed(k); const d = 150 + seed(k) * 320 * over(lf, 1, 34); const o2 = Math.max(0, 1 - over(lf, 4, 40)); const c = k % 3 === 0 ? CLAY : (k % 3 === 1 ? GOLD : GREEN); return (<div key={k} style={{ position: "absolute", left: "50%", top: 500, width: 11, height: 11, borderRadius: "50%", background: c, opacity: o2 * 0.85, transform: `translate(${Math.cos(a) * d}px, ${Math.sin(a) * d}px)`, boxShadow: `0 0 9px ${c}` }} />); })}
      <div style={{ position: "relative", width: 452, opacity: doc, transform: `translateY(${(1 - doc) * -44}px) scale(${0.9 + doc * 0.1})`, marginBottom: 38 }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: 24, background: "#E7DECC", transform: "rotate(3.4deg) translate(17px, 13px)", boxShadow: "0 22px 42px -18px rgba(10,16,34,0.32)" }} />
        <div style={{ position: "absolute", inset: 0, borderRadius: 24, background: "#F1EADA", transform: "rotate(-2.6deg) translate(-13px, 7px)", boxShadow: "0 18px 34px -18px rgba(10,16,34,0.26)" }} />
        <div style={{ position: "relative", borderRadius: 24, background: "#FFFDF8", border: `3px solid ${GOLD}`, boxShadow: "0 38px 68px -18px rgba(10,16,34,0.42), 0 0 64px rgba(231,178,76,0.45)", padding: "28px 34px 32px", textAlign: "left" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <span style={{ padding: "8px 18px", borderRadius: 999, background: CLAY, color: "#fff", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 20, letterSpacing: 1.5, boxShadow: "0 6px 14px rgba(199,84,31,0.4)" }}>FREE GUIDE</span>
            <span style={{ fontSize: 46, filter: "drop-shadow(0 3px 5px rgba(120,70,10,0.35))" }}>🎁</span>
          </div>
          <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 50, lineHeight: 0.95, color: INK, letterSpacing: "-0.02em" }}>The Attack Guide</div>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 24, color: SLATE, marginTop: 10, marginBottom: 16 }}>the exact attack prompts</div>
          <div style={{ height: 3, background: GOLD, borderRadius: 2, opacity: 0.6, marginBottom: 18 }} />
          {items.map((tx, i) => { const ap = over(lf, fr(0.55) + i * 4, 9); return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 15, marginBottom: i < 2 ? 15 : 0, opacity: ap, transform: `translateX(${(1 - ap) * -18}px)` }}>
              <span style={{ width: 34, height: 34, borderRadius: "50%", background: GREEN, color: "#fff", fontSize: 19, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 4px 10px rgba(63,158,116,0.4)" }}>✓</span>
              <span style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 27, color: INK }}>{tx}</span>
            </div>); })}
        </div>
      </div>
      <div style={{ opacity: o, transform: `translateY(${(1 - o) * 24}px)`, textAlign: "center" }}>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 54, color: SLATE, marginBottom: 12 }}>Comment</div>
        <div style={{ position: "relative", display: "inline-block", padding: "17px 54px", borderRadius: 999, background: grad("#E9825C", "#C7541F"), boxShadow: "0 20px 40px -10px rgba(199,84,31,0.7), inset 0 2px 3px rgba(255,255,255,0.35)", transform: `scale(${0.82 + key * 0.18})`, overflow: "hidden" }}>
          <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 92, color: "#fff", letterSpacing: "0.03em" }}>ATTACK</span>
          <div style={{ position: "absolute", top: 0, bottom: 0, left: `${-40 + shine * 180}%`, width: "34%", background: "linear-gradient(105deg, transparent, rgba(255,255,255,0.55), transparent)", opacity: shine < 0.9 ? 1 : 0 }} />
        </div>
        <div style={{ marginTop: 20, fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 32, color: SLATE }}>and I'll send it to you</div>
      </div>
    </AbsoluteFill>
  );
};

// ---------------- progress bar + gift reward ----------------
const ProgressBar: React.FC = () => {
  const f = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const p = Math.min(1, f / (durationInFrames - 1));
  const t = f / FPS;
  const marks = [L[1], L[3], L[4]];
  const TOTAL = durationInFrames / FPS;
  return (
    <div style={{ position: "absolute", left: 46, right: 46, top: 272, height: 60, zIndex: 120 }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 20, height: 22, background: "rgba(58,92,132,0.22)", borderRadius: 999, boxShadow: "inset 0 1px 3px rgba(0,0,0,0.15)" }} />
      <div style={{ position: "absolute", left: 0, top: 20, height: 22, width: `${p * 100}%`, background: grad("#E08A66", "#C5603C"), borderRadius: 999, boxShadow: "0 3px 12px rgba(210,114,78,0.6)" }} />
      {marks.map((m, i) => { const np = m / TOTAL; const passed = t >= m; const teased = i === 2 && !passed; const pop = passed ? 1 + Math.max(0, 1 - (t - m) * 3) * 0.35 : 1; return (
        <div key={i} style={{ position: "absolute", left: `${np * 100}%`, top: 2, transform: `translateX(-50%) scale(${pop})`, width: 56, height: 56, borderRadius: "50%", background: passed ? GREEN : (teased ? "#25314A" : "#EDE7DB"), border: `4px solid ${passed ? GREEN : (teased ? AMBER : CLAY)}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 26, color: passed ? "#fff" : (teased ? AMBER : CLAY), boxShadow: passed ? `0 0 18px ${GREEN}` : (teased ? `0 0 16px ${AMBER}99` : "0 2px 6px rgba(0,0,0,0.2)") }}>{passed ? "✓" : i + 1}</div>); })}
      {(() => { const sp = 0.85; const lit = t >= sp * TOTAL; const pop = lit ? 1 + Math.max(0, 1 - (t - sp * TOTAL) * 3) * 0.4 : 1; return (
        <div style={{ position: "absolute", left: `${sp * 100}%`, top: 9, transform: `translateX(-50%) scale(${pop})`, width: 48, height: 48, borderRadius: "50%", background: lit ? grad("#F0CB63", "#D39A2A") : "#242F45", border: `4px solid ${lit ? "#F6E4A0" : AMBER}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: lit ? `0 0 18px ${GOLD}` : `0 0 12px ${AMBER}77`, zIndex: 122 }}>
          <span style={{ fontSize: 26, lineHeight: 1, color: lit ? "#fff" : AMBER, opacity: lit ? 1 : 0.8 }}>★</span>
        </div>); })()}
      {(() => { const unlocked = t >= L[6]; const uu = unlocked ? Math.min(1, (t - L[6]) / 0.5) : 0; const eu = 1 - Math.pow(1 - uu, 3); const pt = 1 - uu; const pulse = 1 + Math.sin(t * 3.0) * 0.06 * pt; const pop = 1 + Math.max(0, 1 - Math.abs((t - L[6]) - 0.14) * 4) * 0.55; const sc = pulse * pop; const bob = Math.sin(t * 2.4) * 3 * pt; return (
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
const cw: W[] = (() => {
  const out: W[] = [];
  (words as W[]).forEach((w) => {
    const tk = w.word.trim();
    const frag = tk === "" || /^[%\-.,!?;:)]/.test(tk);
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
  if (t >= L[6] - 0.05) return null;
  const lead = 0.10;
  let cur = lines[0];
  for (const ln of lines) if (t + lead >= ln.start) cur = ln;
  return (
    <div style={{ position: "absolute", left: 80, right: 80, top: 1206, textAlign: "center", zIndex: 90 }}>
      <div style={{ display: "inline-flex", flexWrap: "wrap", justifyContent: "center", gap: "0 16px" }}>
        {cur.words.map((w, i) => { const on = t + lead >= w.start; const active = on && (i === cur.words.length - 1 || t + lead < cur.words[i + 1].start); return (
          <span key={i} style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 64, lineHeight: 1.12, letterSpacing: "-0.01em", color: on ? (active ? "#B8501F" : CLAY) : "transparent", transform: active ? "translateY(-3px) scale(1.04)" : "none", display: "inline-block", textShadow: "0 2px 12px rgba(255,251,244,0.9), 0 1px 2px rgba(120,56,26,0.35)" }}>{w.word.trim()}</span>); })}
      </div>
    </div>
  );
};

const Sfx: React.FC<{ at: number; src: string; v?: number; dur?: number }> = ({ at, src, v = 0.35, dur = 2.2 }) => (
  <Sequence from={fr(at)} durationInFrames={fr(dur)}><Audio src={staticFile(`sfx/${src}`)} volume={v} /></Sequence>
);

export const ClaudeAttackReel: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 16, 28], [1.0, 1.03, 1.0], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  const scene = (i: number) => frame >= Lf[i] && (i === Lf.length - 1 || frame < Lf[i + 1]);
  return (
    <AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
      <Audio src={staticFile("vo_attack.wav")} />
      <Audio loop src={staticFile("seo_music.wav")} volume={(ff) => interpolate(ff, [0, fr(1.4), fr(L[6]) - 8, fr(L[6]) + 14, 99999], [0, 0.11, 0.11, 0.08, 0.08], { extrapolateRight: "clamp" })} />
      <Sfx at={0} src="metal_riser.wav" v={0.65} /><Sfx at={0.2} src="boom.wav" v={0.5} />
      {[1.1, 2.3, 3.4, 4.4].map((tt, i) => <Sfx key={`b${i}`} at={tt} src="pop.wav" v={0.3} dur={0.6} />)}
      <Sfx at={5.9} src="thock.wav" v={0.5} />
      {L.slice(1).map((tt, i) => <React.Fragment key={i}><Sfx at={tt - 0.08} src="swish.wav" v={0.42} /><Sfx at={tt + 0.28} src="pop.wav" v={0.26} /></React.Fragment>)}
      <Sfx at={9.6} src="whoosh.wav" v={0.45} />
      {[21.8, 23.6, 25.1].map((tt, i) => <Sfx key={`f${i}`} at={tt} src="snap.wav" v={0.42} dur={0.6} />)}
      <Sfx at={33.2} src="resolve.wav" v={0.5} />
      <Sfx at={L[6]} src="resolve.wav" v={0.5} /><Sfx at={L[6] + 0.3} src="sparkle.wav" v={0.5} /><Sfx at={L[6] + 0.2} src="angelic.wav" v={0.35} dur={3} />

      <Bg />
      <AbsoluteFill style={{ transform: `translateY(90px) scale(${zoom})`, transformOrigin: "50% 44%" }}>
        <AbsoluteFill style={{ opacity: interpolate(frame, [Lf[6] - 4, Lf[6] + 6], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}><Stage /></AbsoluteFill>
        {scene(0) && <Hook lf={frame - Lf[0]} />}
        {scene(1) && <Flip lf={frame - Lf[1]} />}
        {scene(2) && <Prompt lf={frame - Lf[2]} />}
        {scene(3) && <Flags lf={frame - Lf[3]} />}
        {scene(4) && <Loop lf={frame - Lf[4]} />}
        {scene(5) && <Everywhere lf={frame - Lf[5]} />}
        {scene(6) && <CTA lf={frame - Lf[6]} />}
        <Captions />
      </AbsoluteFill>
      <ProgressBar />
      {(() => { let fl = 0; for (const b of Lf.slice(1)) { const d = frame - b; if (d >= 0 && d < 7) fl = Math.max(fl, Math.pow(1 - d / 7, 2)); } return fl > 0 ? <AbsoluteFill style={{ background: "#FFF6E6", opacity: fl * 0.5, zIndex: 200, pointerEvents: "none" }} /> : null; })()}
    </AbsoluteFill>
  );
};
