import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing, Audio, Sequence, staticFile } from "remotion";
import { fraunces, inter } from "./fonts";
import words from "./data/words_worthy.json";

const CREAM = "#ECE9E2", INK = "#1A1813", SLATE = "#3A5C84", CLAY = "#D2724E", AMBER = "#CF9544", GOLD = "#E7B24C", GREEN = "#3F9E74", MUTE = "#9A968B", RED = "#C44A3A";
const NAVY = "#233250", NAVY2 = "#18233A", PAPER = "#F7F3EA", TERM = "#0E1626", TERM2 = "#0A1120";
const mono = "ui-monospace,'SF Mono',Menlo,monospace";
const FPS = 30;
const fr = (s: number) => Math.round(s * FPS);
const grad = (a: string, b: string) => `linear-gradient(158deg, ${a} 0%, ${b} 100%)`;
const NAVYSH = "0 34px 66px -22px rgba(18,28,58,0.55), 0 10px 24px rgba(18,28,58,0.30)";

// scene starts (sec): hook, swap, REHOOK, receipt, check+money, why/triggers, fix, cta
const L = [0, 7.22, 11.52, 17.66, 20.48, 27.82, 34.94, 46.98];
const Lf = L.map(fr);

const over = (f: number, start: number, dur: number, ease = Easing.out(Easing.cubic)) =>
  interpolate(f, [start, start + dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
const ramp = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const seed = (n: number) => { const x = Math.sin(n * 127.1 + 43.7) * 43758.5453; return x - Math.floor(x); };

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

// dark device panel (terminal / screen frame)
const Panel: React.FC<{ children?: React.ReactNode; tint?: string; label?: string }> = ({ children, tint, label }) => (
  <div style={{ position: "absolute", left: 34, right: 34, top: 384, height: 792, borderRadius: 40, background: grad(TERM, TERM2), boxShadow: NAVYSH, overflow: "hidden", border: `2px solid ${tint || "rgba(120,150,210,0.22)"}` }}>
    <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 2px 0 rgba(255,255,255,0.06), inset 0 0 130px rgba(0,0,0,0.45)" }} />
    <div style={{ position: "absolute", left: 30, top: 26, display: "flex", gap: 12, alignItems: "center" }}>
      {[RED, AMBER, GREEN].map((c, i) => <div key={i} style={{ width: 15, height: 15, borderRadius: "50%", background: c, opacity: 0.9 }} />)}
      {label && <div style={{ marginLeft: 14, fontFamily: mono, fontSize: 22, color: "rgba(190,205,235,0.6)" }}>{label}</div>}
    </div>
    {children}
  </div>
);

// hedge pill ("circulating on X" / "user reports")
const Pill: React.FC<{ text: string; x: number; y: number; o?: number }> = ({ text, x, y, o = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, opacity: o, padding: "7px 16px", borderRadius: 999, background: "rgba(20,30,52,0.9)", border: "1.5px solid rgba(150,170,215,0.4)", fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 22, color: "rgba(190,205,235,0.92)", display: "flex", gap: 8, alignItems: "center", boxShadow: "0 8px 20px -8px rgba(0,0,0,0.6)", whiteSpace: "nowrap" }}>
    <span style={{ fontSize: 18 }}>◍</span>{text}
  </div>
);

const Chip: React.FC<{ text: string; bg: string; bd: string; fg: string; size?: number }> = ({ text, bg, bd, fg, size = 40 }) => (
  <div style={{ padding: `${size * 0.34}px ${size * 0.7}px`, borderRadius: 18, background: bg, border: `3px solid ${bd}`, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: size, color: fg, boxShadow: `0 18px 40px -14px rgba(10,16,34,0.7)`, whiteSpace: "nowrap", letterSpacing: "-0.01em" }}>{text}</div>
);

// pixel Claude mascot (canonical critter)
const Mascot: React.FC<{ lf: number; size?: number; gaze?: number; nodAmp?: number; nodSpeed?: number; shock?: number; cheer?: number; stern?: number; cop?: number }> = ({ lf, size = 250, gaze = 0, nodAmp = 3.5, nodSpeed = 10, shock = 0, cheer = 0, stern = 0, cop = 0 }) => {
  const C = "#D97757";
  const hopP = Math.max(0, Math.sin(lf / (nodSpeed * 0.6)));
  const hop = hopP * nodAmp * 2.2 * (1 - shock);
  const squash = 1 - hopP * 0.045 * (1 - shock) + shock * 0.03;
  const blink = (lf % 84) < 5 && shock < 0.3 ? 0.15 : 1;
  const eyeH = (26 + shock * 16) * blink * (1 - stern * 0.5);
  const jump = shock > 0.05 ? Math.max(0, 1 - Math.abs(shock - 0.35) * 4) * 42 : 0;
  const legLift = (i: number) => (shock > 0.3 ? 0 : Math.max(0, Math.sin(lf / (nodSpeed * 0.6) + i * Math.PI)) * 7);
  const armY = 86 - hop * 0.4 - cheer * 26;
  return (
    <div style={{ width: size, height: size, position: "relative", transform: `translateY(${-hop - jump}px) scaleY(${squash})`, transformOrigin: "50% 100%" }}>
      <svg viewBox="0 0 200 200" width={size} height={size} shapeRendering="crispEdges">
        <rect x={8 - cheer * 4} y={armY} width={26} height={26} fill={C} transform={cheer > 0.2 ? `rotate(${-cheer * 28} 21 ${armY + 13})` : undefined} />
        <rect x={166 + cheer * 4} y={armY} width={26} height={26} fill={C} transform={cheer > 0.2 ? `rotate(${cheer * 28} 179 ${armY + 13})` : undefined} />
        <rect x={34} y={44} width={132} height={102} fill={C} />
        <rect x={34} y={44} width={132} height={10} fill="rgba(255,255,255,0.16)" />
        {/* police uniform: navy jacket band + gold buttons + chest badge */}
        {cop > 0 && <>
          <rect x={34} y={108} width={132} height={38} fill="#3E6FBF" />
          <rect x={34} y={108} width={132} height={6} fill="#2E55A3" />
          <rect x={96} y={118} width={9} height={9} fill="#E7B24C" />
          <rect x={96} y={132} width={9} height={9} fill="#E7B24C" />
          <rect x={48} y={116} width={12} height={12} fill="#E7B24C" />
          <rect x={51} y={113} width={6} height={4} fill="#E7B24C" />
        </>}
        {/* police cap: crown + darker band + visor + gold badge */}
        {cop > 0 && <>
          <rect x={46} y={16} width={108} height={24} fill="#3E6FBF" />
          <rect x={42} y={34} width={116} height={8} fill="#2E55A3" />
          <rect x={30} y={40} width={140} height={9} fill="#28497F" />
          <rect x={92} y={20} width={16} height={13} fill="#E7B24C" />
        </>}
        <rect x={52} y={146 - legLift(0)} width={17} height={38} fill={C} />
        <rect x={77} y={146 - legLift(1)} width={17} height={38} fill={C} />
        <rect x={124} y={146 - legLift(0)} width={17} height={38} fill={C} />
        <rect x={149} y={146 - legLift(1)} width={17} height={38} fill={C} />
        {/* stern brows */}
        {stern > 0.3 && <><rect x={68 + gaze} y={64} width={20} height={5} fill="#151312" transform={`rotate(12 78 66)`} /><rect x={112 + gaze} y={64} width={20} height={5} fill="#151312" transform={`rotate(-12 122 66)`} /></>}
        <rect x={70 + gaze - (shock > 0.4 ? 2 : 0)} y={70 + (26 - eyeH) / 2} width={15 + (shock > 0.4 ? 4 : 0)} height={eyeH} fill="#151312" />
        <rect x={116 + gaze - (shock > 0.4 ? 2 : 0)} y={70 + (26 - eyeH) / 2} width={15 + (shock > 0.4 ? 4 : 0)} height={eyeH} fill="#151312" />
        {shock > 0.4 && <rect x={93 + gaze} y={116} width={16} height={14} fill="#151312" />}
      </svg>
      {shock > 0.4 && <div style={{ position: "absolute", right: size * 0.1, top: size * 0.1, fontSize: size * 0.13, opacity: Math.min(1, shock * 1.5) }}>💧</div>}
    </div>
  );
};

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

const Sfx: React.FC<{ at: number; src: string; v?: number; dur?: number }> = ({ at, src, v = 0.35, dur = 2.2 }) => (
  <Sequence from={fr(at)} durationInFrames={fr(dur)}><Audio src={staticFile(`sfx/${src}`)} volume={v} /></Sequence>
);

// spinning Claude starburst logo: pops in small -> overshoots big -> settles normal, spinning throughout
const ClaudeLogo: React.FC<{ lf: number; size: number }> = ({ lf, size }) => {
  const s = interpolate(lf, [0, fr(0.6), fr(1.1)], [0.2, 1.28, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  return (
    <div style={{ width: size, height: size, transform: `scale(${s}) rotate(${lf * 1.7}deg)`, filter: "drop-shadow(0 16px 34px rgba(217,119,87,0.5))" }}>
      <svg viewBox="-100 -100 200 200" width={size} height={size}>
        {Array.from({ length: 12 }, (_, i) => {
          const len = i % 2 ? 70 : 88;
          const tip = i % 2 ? 7.5 : 9;
          return <path key={i} d={`M -5.5 -12 L 5.5 -12 L ${tip} ${-len} L ${-tip} ${-len} Z`} fill="#D97757" stroke="#D97757" strokeWidth={6} strokeLinejoin="round" transform={`rotate(${i * 30})`} />;
        })}
        <circle r={17} fill="#D97757" />
      </svg>
    </div>
  );
};

// ---------------- HOOK: spinning logo + two mascots watch the $200 membership get DOWNGRADED ----------------
const Hook: React.FC<{ lf: number }> = ({ lf }) => {
  const slamAt = fr(1.50);                                   // lands on "too dumb"
  const cardIn = over(lf, fr(0.55), fr(0.65), Easing.out(Easing.back(1.2)));
  const walk1 = over(lf, 4, 22);                             // mascots walk in from the edges
  const walk2 = over(lf, 9, 22);
  const stamp = over(lf, slamAt, fr(0.28), Easing.out(Easing.cubic));
  const stampScale = interpolate(stamp, [0, 1], [3.2, 1]);
  const shakeE = Math.max(0, 1 - (lf - slamAt) / 10);
  const shake = lf >= slamAt ? Math.sin((lf - slamAt) * 3.1) * 14 * shakeE * shakeE : 0;
  const flash = lf >= slamAt ? Math.max(0, 1 - (lf - slamAt) / 6) : 0;
  const shock = lf >= slamAt ? Math.min(1, (lf - slamAt) / 8) * 0.9 : 0;
  const flip = over(lf, fr(2.75), fr(0.5));                   // fable badge -> opus
  const dim = over(lf, fr(3.15), 8);                          // card yields to the word montage
  const MW: [string, number, number, number, number][] = [   // word, x, y, size, at
    ["fix", 300, 316, 44, 3.3], ["improve", 560, 300, 40, 3.62], ["rewrite", 292, 432, 42, 3.95],
    ["help", 646, 418, 40, 4.28], ["check", 452, 522, 40, 4.6], ["hook", 430, 386, 66, 5.28]];
  const tagAt = fr(6.4);
  const tagP = over(lf, tagAt, fr(0.3), Easing.out(Easing.back(2)));
  const waitC = over(lf, fr(6.78), 8);
  return (
    <Panel label="membership">
      <div style={{ position: "absolute", inset: 0, transform: `translateX(${shake}px)` }}>
        {/* spinning Claude logo, top center */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 34, display: "flex", justifyContent: "center" }}>
          <ClaudeLogo lf={lf} size={215} />
        </div>

        {/* the $200 membership card, center */}
        <div style={{ position: "absolute", left: 246, top: 292, width: 520, transform: `translateY(${(1 - cardIn) * 46}px) scale(${(0.85 + cardIn * 0.15) * (1 - dim * 0.06)})`, opacity: cardIn * (1 - dim * 0.82), transformOrigin: "50% 50%" }}>
          <div style={{ position: "relative", borderRadius: 26, padding: "26px 30px", background: grad("#26344F", "#151F33"), border: "2px solid rgba(120,150,210,0.35)", boxShadow: "0 40px 70px -24px rgba(0,0,0,0.75)", filter: flip > 0.5 ? "saturate(0.5) brightness(0.82)" : "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <div style={{ width: 84, height: 84, borderRadius: "50%", background: grad("#3A5C84", "#25314A"), border: "3px solid rgba(150,175,220,0.5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40 }}>🧑‍💻</div>
              <div>
                <div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 22, color: "rgba(170,195,235,0.65)" }}>YOU · Max member</div>
                <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 36, color: "#EAF0FA" }}>$200 / month</div>
              </div>
            </div>
            <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 21, color: "rgba(170,195,235,0.6)" }}>serving:</span>
              <div style={{ position: "relative", height: 54, flex: 1 }}>
                <div style={{ position: "absolute", opacity: 1 - flip, transform: `rotateX(${flip * 90}deg)` }}><Chip text="FABLE 5" bg={grad("#E9825C", "#C7541F")} bd="#F0A981" fg="#fff" size={30} /></div>
                <div style={{ position: "absolute", opacity: flip, transform: `rotateX(${(1 - flip) * -90}deg)` }}><Chip text="OPUS 4.8" bg={grad("#31415F", "#1C2740")} bd="#4A5E82" fg="#9DB0CE" size={30} /></div>
              </div>
            </div>
          </div>
        </div>

        {/* giant DOWNGRADED stamp slams across the card */}
        {stamp > 0.01 && (
          <div style={{ position: "absolute", left: 40, top: 330, width: 932, textAlign: "center", transform: `rotate(-11deg) scale(${stampScale})`, opacity: Math.min(1, stamp * 1.4) * (1 - dim * 0.82), zIndex: 30 }}>
            <div style={{ display: "inline-block", padding: "12px 32px", border: `7px solid ${RED}`, borderRadius: 16, color: RED, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 88, letterSpacing: "0.02em", background: "rgba(196,74,58,0.10)", boxShadow: `0 0 40px ${RED}66`, textShadow: `0 2px 10px rgba(196,74,58,0.4)` }}>DOWNGRADED</div>
          </div>
        )}

        {/* 3.2-6.6s: the everyday-words montage ("one word you're using every single day") */}
        {MW.map(([w, x, y, sz, at], i) => {
          const ap = over(lf, fr(at as number), 9, Easing.out(Easing.back(2.1)));
          if (ap <= 0.01) return null;
          const isHook = w === "hook";
          const fade = !isHook && tagP > 0.2 ? 0.35 : 1;
          return (
            <div key={i} style={{ position: "absolute", left: x as number, top: y as number, transform: `scale(${ap}) rotate(${(seed(i * 7) - 0.5) * 8}deg)`, opacity: ap * fade, zIndex: 34 }}>
              <div style={{ padding: "10px 22px", borderRadius: 14, background: isHook ? "rgba(217,119,87,0.16)" : "rgba(35,50,80,0.85)", border: `3px solid ${isHook ? "#F0A981" : "rgba(150,175,220,0.45)"}`, fontFamily: mono, fontWeight: 700, fontSize: sz as number, color: isHook ? "#FFD1C7" : "rgba(200,215,240,0.9)", boxShadow: isHook ? `0 0 26px rgba(240,169,129,0.5)` : "0 12px 26px -10px rgba(0,0,0,0.6)" }}>{w}</div>
              {isHook && tagP > 0.01 && (
                <div style={{ position: "absolute", right: -34, top: -26, transform: `rotate(-12deg) scale(${tagP})`, padding: "6px 16px", borderRadius: 9, background: RED, color: "#fff", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 26, border: "2.5px solid #E58072", boxShadow: `0 0 18px ${RED}`, whiteSpace: "nowrap" }}>TRIGGER ⚑</div>
              )}
            </div>);
        })}
        {/* wait-for-it cue riding into the next scene */}
        {waitC > 0.01 && (
          <div style={{ position: "absolute", left: 0, right: 0, top: 738, textAlign: "center", opacity: waitC, transform: `translateY(${(1 - waitC) * 10}px)`, zIndex: 36 }}>
            <span style={{ padding: "7px 18px", borderRadius: 999, background: "rgba(207,149,68,0.18)", border: `2px solid ${AMBER}`, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 24, color: "#F0D08A" }}>wait for it…</span>
          </div>
        )}
        {/* two mascots walk in from the edges, watch, then get shocked at the slam */}
        <div style={{ position: "absolute", left: 22, top: 548, transform: `translateX(${(1 - walk1) * -330}px)` }}>
          <Mascot lf={lf} size={225} gaze={7} nodAmp={3.2} nodSpeed={9} shock={shock} />
        </div>
        <div style={{ position: "absolute", right: 22, top: 548, transform: `translateX(${(1 - walk2) * 330}px)` }}>
          <Mascot lf={lf + 7} size={225} gaze={-7} nodAmp={3.2} nodSpeed={10.5} shock={shock} />
        </div>

        {/* the literal receipt line + hedge pill, centered between the mascots */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 660, textAlign: "center", opacity: over(lf, fr(4.0), 12) }}>
          <span style={{ fontFamily: mono, fontSize: 19, color: "rgba(255,150,135,0.85)" }}>routing_decision: "TOO_DUMB_TO_NEED_FABLE"</span>
        </div>
        <Pill text="circulating on X" x={398} y={706} o={over(lf, fr(4.4), 10)} />
      </div>
      {/* impact fireworks on the slam */}
      <Firework lf={lf} at={slamAt + 2} x={300} y={330} hue={1} />
      <Firework lf={lf} at={slamAt + 4} x={740} y={370} hue={3} />
      {/* red siren flash on slam */}
      {flash > 0 && <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 42%, rgba(196,74,58,0.4), transparent 60%)", opacity: flash }} />}
    </Panel>
  );
};

// ---------------- SWAP: fable chip shoved off by opus ----------------
const Swap: React.FC<{ lf: number }> = ({ lf }) => {
  const shove = over(lf, fr(0.9), fr(1.5), Easing.inOut(Easing.cubic));
  const fableX = -shove * 470;   // fable slides out left
  const opusX = (1 - over(lf, fr(1.0), fr(1.3), Easing.out(Easing.back(1.3)))) * 520; // opus slides in from right
  const fableTilt = shove * -16;
  return (
    <Panel label="model router">
      <div style={{ position: "absolute", left: 0, right: 0, top: 250, display: "flex", justifyContent: "center", alignItems: "center", height: 200 }}>
        {/* slot */}
        <div style={{ position: "absolute", width: 560, height: 128, borderRadius: 24, border: "2px dashed rgba(150,170,215,0.35)" }} />
        {/* fable chip (glowing, getting shoved) */}
        <div style={{ position: "absolute", transform: `translateX(${fableX}px) rotate(${fableTilt}deg)`, opacity: 1 - shove * 0.5, filter: `drop-shadow(0 0 ${18 - shove * 14}px ${CLAY})` }}>
          <Chip text="FABLE 5" bg={grad("#E9825C", "#C7541F")} bd="#F0A981" fg="#fff" size={52} />
        </div>
        {/* speed streaks while the shove is happening */}
        {opusX > 12 && Array.from({ length: 4 }, (_, k) => (
          <div key={k} style={{ position: "absolute", left: `calc(50% + ${opusX + 210 + k * 34}px)`, top: -30 + k * 24, width: 60 + seed(k) * 40, height: 6, borderRadius: 4, background: "rgba(150,175,220,0.4)", opacity: Math.min(1, opusX / 120) }} />
        ))}
        {/* opus chip (navy, shoving in) */}
        <div style={{ position: "absolute", transform: `translateX(${opusX}px)`, filter: "drop-shadow(0 20px 30px rgba(10,16,34,0.6))" }}>
          <Chip text="OPUS 4.8" bg={grad("#31415F", "#1C2740")} bd="#4A5E82" fg="#C3D2EC" size={52} />
        </div>
        {/* the stern router mascot doing the pushing, riding right behind the chip */}
        <div style={{ position: "absolute", transform: `translateX(${opusX + 282}px) translateY(-6px)` }}>
          <Mascot lf={lf} size={172} stern={0.9} gaze={-8} nodAmp={1.8} nodSpeed={8} cop={1} />
        </div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 470, textAlign: "center", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 30, color: "rgba(190,205,235,0.55)", opacity: over(lf, fr(1.8), 10) }}>quietly swaps the model you paid for</div>
      <Pill text="user reports" x={470} y={556} o={over(lf, fr(2.2), 10)} />
    </Panel>
  );
};

// ---------------- REHOOK (~11s): "here's the part everyone misses" ----------------
const Rehook: React.FC<{ lf: number }> = ({ lf }) => {
  const spin = over(lf, 2, fr(0.8), Easing.out(Easing.cubic)) * 360;   // mascot whips around
  const line1 = over(lf, fr(0.15), 10, Easing.out(Easing.back(1.3)));
  const line2 = over(lf, fr(1.6), 10, Easing.out(Easing.back(1.2)));
  const tease = over(lf, fr(4.85), fr(0.4), Easing.out(Easing.back(1.8)));
  const pulse = 1 + Math.sin(lf / 3.2) * 0.04;
  const GHOSTS: [number, number, number][] = [[128, 148, 2.2], [742, 136, 2.65], [116, 288, 3.1]];
  return (
    <Panel label="wait">
      {/* mascot whips around to face you */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 96, display: "flex", justifyContent: "center" }}>
        <div style={{ transform: `rotateY(${360 - spin}deg)` }}>
          <Mascot lf={lf} size={250} nodAmp={4} nodSpeed={7} gaze={0} />
        </div>
      </div>
      {/* the re-engage line, huge */}
      <div style={{ position: "absolute", left: 40, right: 40, top: 366, textAlign: "center", opacity: line1, transform: `scale(${0.9 + line1 * 0.1})` }}>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 74, lineHeight: 1.04, color: "#F4EEE2", letterSpacing: "-0.015em" }}>
          everyone <span style={{ color: "#F0A981" }}>misses</span> this part
        </div>
      </div>
      <div style={{ position: "absolute", left: 60, right: 60, top: 542, textAlign: "center", opacity: line2, transform: `translateY(${(1 - line2) * 18}px)` }}>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 34, color: "rgba(200,215,240,0.85)" }}>
          most people have <span style={{ color: "#FF9C8A" }}>no idea</span> they're downgraded
        </div>
      </div>
      {/* "most people have no idea" ghost users popping around the mascot */}
      {GHOSTS.map(([x, y, at], i) => {
        const ap = over(lf, fr(at), 8, Easing.out(Easing.back(1.9)));
        if (ap <= 0.01) return null;
        return (
          <div key={i} style={{ position: "absolute", left: x, top: y, transform: `scale(${ap})`, opacity: ap * (1 - tease * 0.85), zIndex: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 16px", borderRadius: 14, background: "rgba(35,50,80,0.8)", border: "2px solid rgba(150,175,220,0.35)", boxShadow: "0 10px 24px -10px rgba(0,0,0,0.6)" }}>
              <div style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(150,175,220,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 22, color: "rgba(200,215,240,0.9)" }}>?</div>
              <span style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 22, color: "rgba(200,215,240,0.75)" }}>no idea</span>
            </div>
          </div>);
      })}
      {/* the teased 5-second check */}
      {tease > 0.01 && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 640, display: "flex", justifyContent: "center", transform: `scale(${tease * pulse})`, opacity: tease }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 14, padding: "14px 30px", borderRadius: 999, background: grad("#F0CB63", "#D39A2A"), border: "3px solid #F6E4A0", boxShadow: `0 0 34px ${GOLD}`, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 34, color: "#3a2a05" }}>
            ⏱ the 5-second check <span style={{ fontSize: 30 }}>→</span>
          </div>
        </div>
      )}
    </Panel>
  );
};

// ---------------- RECEIPT: the circulating post ----------------
const Receipt: React.FC<{ lf: number }> = ({ lf }) => {
  const rise = over(lf, fr(0.1), fr(0.6), Easing.out(Easing.back(1.1)));
  const zoom = 1 + over(lf, fr(0.8), fr(1.6)) * 0.14;
  const hi = over(lf, fr(1.9), fr(0.6));
  const stamp = over(lf, fr(0.85), fr(0.5), Easing.out(Easing.back(2)));
  return (
    <Panel label="x.com / thread">
      <div style={{ position: "absolute", left: 60, right: 60, top: 150, transform: `translateY(${(1 - rise) * 40}px) scale(${zoom})`, transformOrigin: "42% 40%", opacity: rise }}>
        <div style={{ borderRadius: 22, background: "#141B28", border: "1.5px solid rgba(120,150,210,0.3)", padding: "26px 30px", boxShadow: "0 30px 60px -20px rgba(0,0,0,0.7)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: grad("#3A5C84", "#25314A") }} />
            <div>
              <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 28, color: "#EAF0FA" }}>dev · @builds</div>
              <div style={{ fontFamily: inter.fontFamily, fontSize: 22, color: "rgba(170,190,225,0.6)" }}>found this in my logs 👀</div>
            </div>
          </div>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 30, color: "rgba(200,215,240,0.92)", lineHeight: 1.5 }}>
            paying <span style={{ color: GOLD, fontWeight: 900 }}>$200/mo</span>. then I checked my logs:
          </div>
          <div style={{ position: "relative", marginTop: 18, padding: "18px 20px", borderRadius: 12, background: "#0C1220", fontFamily: mono, fontSize: 26, color: "#FFD1C7" }}>
            <div style={{ position: "absolute", inset: -3, borderRadius: 12, border: `3px solid ${RED}`, opacity: hi, boxShadow: `0 0 22px ${RED}` }} />
            <span style={{ fontWeight: 800 }}>"TOO_DUMB_TO_NEED_FABLE"</span>
          </div>
        </div>
        {/* $200 stamp */}
        <div style={{ position: "absolute", right: -18, top: -26, transform: `scale(${stamp}) rotate(-9deg)`, opacity: stamp }}>
          <div style={{ padding: "10px 22px", borderRadius: 14, background: grad("#F0CB63", "#D39A2A"), fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 40, color: "#3a2a05", boxShadow: `0 0 26px ${GOLD}`, border: "3px solid #F6E4A0" }}>$200 / mo</div>
        </div>
      </div>
      <Pill text="circulating on X · unverified" x={430} y={706} o={over(lf, fr(0.5), 10)} />
    </Panel>
  );
};

// ---------------- CHECK: /status types itself + money math ----------------
const Check: React.FC<{ lf: number }> = ({ lf }) => {
  const cmd = "/status";
  const typed = Math.floor(over(lf, fr(0.2), fr(0.9)) * cmd.length);
  const showOut = lf > fr(1.2);
  const rows = [
    ["Account", "Max · $200/mo"],
    ["Model", "opus-4.8"],
  ];
  const modelHi = over(lf, fr(2.4), fr(0.6));
  // money-math phase (~ when VO hits "it means opus, your 200 bought the old model") local ~ 4.1s in
  const money = over(lf, fr(4.3), fr(0.8), Easing.out(Easing.back(1.4)));
  return (
    <Panel label="Claude Code">
      <div style={{ position: "absolute", left: 50, right: 50, top: 104, fontFamily: mono }}>
        <div style={{ fontSize: 42, color: "#8FE0B0" }}>
          <span style={{ color: "rgba(150,180,225,0.7)" }}>❯ </span>{cmd.slice(0, typed)}<span style={{ opacity: lf % 16 < 8 ? 1 : 0.2 }}>▌</span>
        </div>
        {showOut && <div style={{ marginTop: 30 }}>
          {rows.map((r, i) => { const ap = over(lf, fr(1.4) + i * 4, 7); const isModel = i === 1; return (
            <div key={i} style={{ display: "flex", opacity: ap, margin: "16px 0", fontSize: 36, position: "relative" }}>
              <div style={{ width: 230, color: "rgba(160,185,225,0.7)" }}>{r[0]}</div>
              <div style={{ position: "relative", color: isModel ? "#fff" : "rgba(205,220,245,0.92)", fontWeight: isModel ? 800 : 500 }}>
                {isModel && <div style={{ position: "absolute", inset: "-8px -16px", borderRadius: 10, border: `3px solid ${GREEN}`, background: "rgba(63,158,116,0.16)", opacity: modelHi, boxShadow: `0 0 20px ${GREEN}88` }} />}
                <span style={{ position: "relative" }}>{r[1]}</span>
              </div>
            </div>); })}
        </div>}
        {/* arrow + 5s chip */}
        <div style={{ position: "absolute", left: 490, top: 156, opacity: modelHi, fontSize: 34, color: GREEN, fontFamily: inter.fontFamily, fontWeight: 800 }}>← read this line</div>
        {(() => {
          const t0 = fr(0.4), step = fr(0.5);
          const started = lf >= t0;
          const n = Math.max(0, 5 - Math.floor((lf - t0) / step) - (lf >= t0 ? 0 : 0));
          const done = lf >= t0 + step * 5;
          const tickP = started && !done ? Math.max(0, 1 - ((lf - t0) % step) / 8) : 0;
          return (
            <div style={{ position: "absolute", right: 0, top: 4, opacity: over(lf, t0 - 4, 8), transform: `scale(${1 + tickP * 0.22})`, transformOrigin: "100% 50%", padding: "8px 20px", borderRadius: 999, background: done ? "rgba(63,158,116,0.28)" : "rgba(63,158,116,0.16)", border: `2.5px solid ${GREEN}`, color: "#8FE0B0", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 27, display: "flex", alignItems: "center", gap: 10, boxShadow: done ? `0 0 20px ${GREEN}88` : (tickP > 0.4 ? `0 0 16px ${GREEN}66` : "none") }}>
              <span style={{ fontSize: 22 }}>⏱</span>
              {done ? <span>that fast ✓</span> : <span><span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 34, color: "#B9F0D2" }}>{started ? n : 5}</span> sec</span>}
            </div>);
        })()}
      </div>
      {/* money math card */}
      <div style={{ position: "absolute", left: 60, right: 60, top: 420, transform: `translateY(${(1 - money) * 30}px) scale(${0.9 + money * 0.1})`, opacity: money }}>
        <div style={{ borderRadius: 20, background: "rgba(196,74,58,0.12)", border: `2px solid ${RED}`, padding: "24px 30px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: `0 20px 44px -18px rgba(0,0,0,0.6)` }}>
          <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 54, color: "#FFB4A6" }}>$200<span style={{ fontSize: 28, color: "rgba(255,180,166,0.7)", fontWeight: 700 }}> /mo</span></div>
          <div style={{ fontSize: 46, color: "rgba(255,180,166,0.7)" }}>→</div>
          <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 44, color: "#FFD1C7" }}>the old model</div>
        </div>
      </div>
      {/* -$200 loss float off the money card */}
      {(() => { const fl = over(lf, fr(5.75), fr(0.9)); if (fl <= 0.01) return null; return (
        <div style={{ position: "absolute", left: 0, right: 0, top: 400 - fl * 70, textAlign: "center", opacity: Math.min(1, fl * 4) * (1 - Math.pow(fl, 2)), zIndex: 30 }}>
          <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 58, color: "#FF8A76", textShadow: `0 0 22px ${RED}` }}>−$200</span>
        </div>); })()}
      {/* shocked mascot reacting to the money math */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 574, display: "flex", justifyContent: "center", opacity: over(lf, fr(4.4), 8) }}>
        <Mascot lf={lf} size={200} shock={over(lf, fr(4.55), fr(0.4)) * 0.9} nodAmp={2} nodSpeed={9} />
      </div>
    </Panel>
  );
};

// ---------------- WHY / TRIGGERS: mascot router bouncer ----------------
const TRIGS = ["VULNERABLE", "UNSAFE", "HOOK"];
const Triggers: React.FC<{ lf: number }> = ({ lf }) => {
  const chipAt = [fr(4.45), fr(5.5), fr(6.2)]; // vulnerable / unsafe / hook, on the VO
  const BELT: [string, number][] = [["plan", 0.55], ["draft", 1.45], ["email", 2.35], ["notes", 3.25]];
  const catchP = Math.max(...[fr(4.45), fr(5.5), fr(6.2)].map((a) => Math.max(0, 1 - Math.abs(lf - a - 5) / 10)));
  const beltOn = lf < fr(4.4);
  const shakeX = catchP > 0.02 ? Math.sin(lf * 3.4) * 5 * catchP : 0;
  return (
    <Panel label="the algorithm">
      {/* scan beam sweeping from the booth over the conveyor */}
      <div style={{ position: "absolute", left: 356, top: 420, width: 380, height: 150, clipPath: "polygon(0 22%, 100% 0, 100% 100%, 0 60%)", background: catchP > 0.15 ? `linear-gradient(90deg, rgba(196,74,58,0.4), rgba(196,74,58,0.05))` : `linear-gradient(90deg, rgba(63,158,116,0.34), rgba(63,158,116,0.04))`, opacity: (beltOn || catchP > 0.05 ? 0.75 : 0.25) + Math.sin(lf * 1.9) * 0.14, zIndex: 12 }} />
      {/* booth */}
      <div style={{ position: "absolute", left: 60, top: 150, width: 300, height: 470, borderRadius: 24, background: grad("#1B2740", "#111A2E"), border: "2px solid rgba(120,150,210,0.3)", boxShadow: "inset 0 0 60px rgba(0,0,0,0.5)", transform: `translateX(${shakeX}px)` }}>
        {/* siren lamp: spins up on every catch */}
        <div style={{ position: "absolute", left: "50%", top: -30, width: 44, height: 30, marginLeft: -22 }}>
          <div style={{ position: "absolute", left: 4, bottom: 0, width: 36, height: 12, borderRadius: 5, background: "#1B2740", border: "2px solid rgba(120,150,210,0.4)" }} />
          <div style={{ position: "absolute", left: 8, bottom: 9, width: 28, height: 20, borderRadius: "14px 14px 4px 4px", background: catchP > 0.05 ? RED : "#5A2A24", boxShadow: catchP > 0.05 ? `0 0 ${22 * catchP}px ${RED}, 0 0 44px ${RED}66` : "none", opacity: 0.6 + catchP * 0.4 }} />
          {catchP > 0.05 && <div style={{ position: "absolute", left: -32, bottom: 4, width: 108, height: 30, background: `conic-gradient(from ${lf * 24}deg, transparent 0deg, ${RED}55 24deg, transparent 60deg, transparent 180deg, ${RED}55 204deg, transparent 240deg)`, opacity: catchP, borderRadius: "50%" }} />}
        </div>
        <div style={{ position: "absolute", top: 18, left: 0, right: 0, textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 30, color: catchP > 0.15 ? "#FFB4A6" : "#C3D2EC", letterSpacing: "0.04em" }}>ALGORITHM</div>
        {/* scanning status line */}
        <div style={{ position: "absolute", top: 62, left: 0, right: 0, textAlign: "center", fontFamily: mono, fontSize: 19, color: catchP > 0.15 ? "#FF8A76" : "#8FE0B0", opacity: 0.85 }}>{catchP > 0.15 ? "⚑ FLAGGED" : `scanning${".".repeat(1 + (Math.floor(lf / 9) % 3))}`}</div>
        <div style={{ position: "absolute", bottom: 30, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
          <Mascot lf={lf} size={230} stern={0.9} nodAmp={2 + catchP * 3.5} nodSpeed={catchP > 0.3 ? 6 : 9} gaze={beltOn ? 9 : 4} cheer={catchP * 0.9} cop={1} />
        </div>
      </div>
      {/* red alert wash on every catch */}
      {catchP > 0.03 && <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 22% 40%, rgba(196,74,58,0.3), transparent 55%)", opacity: catchP, zIndex: 25, pointerEvents: "none" }} />}
      {/* checkpoint conveyor: everyday prompts stream through the scanner and pass green */}
      {BELT.map(([w, at], i) => {
        const tr = over(lf, fr(at as number), fr(1.05), Easing.inOut(Easing.cubic));
        if (tr <= 0.001 || tr >= 0.999) return null;
        const x = 940 - tr * 560;
        const zap = tr > 0.86;
        return (
          <div key={i} style={{ position: "absolute", left: x, top: 486, opacity: Math.min(1, tr * 8) * (zap ? 1 - (tr - 0.86) * 5 : 1), zIndex: 18 }}>
            <div style={{ padding: "8px 18px", borderRadius: 12, background: zap ? "rgba(63,158,116,0.25)" : "rgba(35,50,80,0.8)", border: `2.5px solid ${zap ? GREEN : "rgba(150,175,220,0.4)"}`, fontFamily: mono, fontWeight: 700, fontSize: 26, color: zap ? "#8FE0B0" : "rgba(200,215,240,0.85)", boxShadow: zap ? `0 0 18px ${GREEN}99` : "none", whiteSpace: "nowrap" }}>{w}{zap ? " ✓" : ""}</div>
          </div>);
      })}
      {/* trigger chips slam in + get DOWNGRADED stamp */}
      <div style={{ position: "absolute", left: 400, top: 176, display: "flex", flexDirection: "column", gap: 30 }}>
        {TRIGS.map((tg, i) => {
          const at = chipAt[i];
          const slam = over(lf, at, fr(0.35), Easing.out(Easing.back(2.2)));
          if (slam <= 0.01) return null;
          const stamp = over(lf, at + fr(0.4), fr(0.4), Easing.out(Easing.back(2)));
          return (
            <div key={i} style={{ position: "relative", transform: `translateX(${(1 - slam) * 120}px) scale(${slam})`, opacity: slam }}>
              <Chip text={tg} bg="#141B28" bd={CLAY} fg="#F0C9B6" size={44} />
              {/* red downgraded stamp */}
              <div style={{ position: "absolute", right: -14, top: -18, transform: `rotate(-11deg) scale(${stamp})`, opacity: stamp, padding: "5px 14px", borderRadius: 8, background: RED, color: "#fff", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 22, border: "2px solid #E58072", boxShadow: `0 0 16px ${RED}` }}>DOWNGRADED</div>
            </div>
          );
        })}
      </div>
    </Panel>
  );
};

// ---------------- FIX: claude.ai compose before/after ----------------
const Fix: React.FC<{ lf: number }> = ({ lf }) => {
  const bad = "fix your weak hook";
  const good = "Rewrite the first line of this sales page so people stop scrolling";
  const badTyped = Math.floor(over(lf, fr(0.3), fr(1.0)) * bad.length);
  const strike = over(lf, fr(1.55), fr(0.5));
  const badTag = over(lf, fr(1.45), fr(0.4), Easing.out(Easing.back(2)));
  const goodTyped = Math.floor(over(lf, fr(4.1), fr(2.6)) * good.length);
  const pass = over(lf, fr(11.15), fr(0.6), Easing.out(Easing.back(1.6)));
  const share = over(lf, fr(7.0), fr(0.6), Easing.out(Easing.back(1.6)));
  const emph = over(lf, fr(8.1), 10);
  const sameChip = over(lf, fr(9.3), fr(0.4), Easing.out(Easing.back(1.9)));
  return (
    <Panel label="claude.ai">
      {/* before box */}
      <div style={{ position: "absolute", left: 54, right: 54, top: 120, transform: `scale(${1 - emph * 0.06}) translateY(${-emph * 8}px)`, opacity: 1 - emph * 0.45 }}>
        <div style={{ position: "relative", borderRadius: 18, background: "#141B28", border: `2px solid ${badTag > 0.3 ? RED : "rgba(120,150,210,0.3)"}`, padding: "20px 24px", minHeight: 60 }}>
          <span style={{ fontFamily: mono, fontSize: 30, color: "rgba(205,220,245,0.9)", textDecoration: strike > 0.4 ? "line-through" : "none", textDecorationColor: RED }}>{bad.slice(0, badTyped)}{badTyped < bad.length && <span style={{ opacity: lf % 16 < 8 ? 1 : 0.2 }}>▌</span>}</span>
          {badTag > 0.1 && <div style={{ position: "absolute", right: -10, top: -20, transform: `rotate(-8deg) scale(${badTag})`, padding: "5px 14px", borderRadius: 8, background: RED, color: "#fff", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 22, boxShadow: `0 0 14px ${RED}` }}>trigger word</div>}
        </div>
      </div>
      {/* arrow */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 268, textAlign: "center", fontSize: 40, color: "rgba(160,185,225,0.6)", opacity: over(lf, fr(2.0), 8) }}>↓ say what you actually want</div>
      {/* after box */}
      <div style={{ position: "absolute", left: 54, right: 54, top: 330, transform: `scale(${1 + emph * 0.05})` }}>
        <div style={{ position: "relative", borderRadius: 18, background: "#101A12", border: `2px solid ${pass > 0.3 ? GREEN : "rgba(63,158,116,0.4)"}`, padding: "20px 24px", minHeight: 120, boxShadow: pass > 0.3 ? `0 0 30px rgba(63,158,116,0.35)` : "none" }}>
          <span style={{ fontFamily: mono, fontSize: 30, color: "#DCEFE2", lineHeight: 1.5 }}>{good.slice(0, goodTyped)}{goodTyped < good.length && goodTyped > 0 && <span style={{ opacity: lf % 16 < 8 ? 1 : 0.2 }}>▌</span>}</span>
          {pass > 0.1 && <div style={{ position: "absolute", right: 18, bottom: 16, transform: `scale(${pass})`, display: "flex", alignItems: "center", gap: 8, color: "#8FE0B0", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 26 }}><span style={{ width: 30, height: 30, borderRadius: "50%", background: GREEN, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>✓</span> stays on Fable</div>}
        </div>
      </div>
      <Firework lf={lf} at={fr(11.45)} x={820} y={430} hue={2} />
      {/* same ask, new words chip */}
      {sameChip > 0.01 && (
        <div style={{ position: "absolute", left: 270, right: 30, top: 566, textAlign: "center", transform: `scale(${sameChip})`, opacity: sameChip, zIndex: 22 }}>
          <span style={{ padding: "8px 20px", borderRadius: 999, background: "rgba(63,158,116,0.16)", border: `2px solid ${GREEN}`, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 25, color: "#8FE0B0" }}>same ask · new words</span>
        </div>
      )}
      {/* the router mascot: stern at the trigger word, cheering when the rewrite passes */}
      <div style={{ position: "absolute", left: 46, top: 566, opacity: over(lf, fr(1.5), 10) }}>
        <Mascot lf={lf} size={205} stern={badTag * (1 - pass)} cheer={pass} gaze={6} nodAmp={pass > 0.5 ? 4.5 : 2} nodSpeed={pass > 0.5 ? 6.5 : 9} />
      </div>
      {/* share chip (compensates the dropped share VO line) */}
      {share > 0.1 && <div style={{ position: "absolute", left: 270, right: 30, top: 640, textAlign: "center", transform: `translateY(${(1 - share) * 16}px)`, opacity: share }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "10px 22px", borderRadius: 999, background: "rgba(207,149,68,0.16)", border: `2px solid ${AMBER}`, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 26, color: "#F0D08A" }}>📤 send this to someone paying $200</span>
      </div>}
    </Panel>
  );
};

// ---------------- CTA ----------------
const CTA: React.FC<{ lf: number }> = ({ lf }) => {
  const save = over(lf, fr(0.2), fr(0.5), Easing.out(Easing.back(2.2)));
  const doc = over(lf, fr(0.25), fr(0.6), Easing.out(Easing.back(1.2)));
  const kw = "WORTHY";
  const typed = Math.floor(over(lf, fr(0.7), fr(1.4)) * kw.length);
  const big = over(lf, fr(0.3), fr(0.7), Easing.out(Easing.back(1.4)));
  return (
    <AbsoluteFill>
      {/* save bookmark pop */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 380, textAlign: "center", transform: `scale(${save})`, opacity: save }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 12, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 34, color: SLATE }}>🔖 save this before your next prompt</span>
      </div>
      {/* doc mock */}
      <div style={{ position: "absolute", left: 200, right: 200, top: 470, transform: `translateY(${(1 - doc) * 30}px) scale(${doc})`, opacity: doc }}>
        <div style={{ borderRadius: 22, background: PAPER, boxShadow: "0 30px 60px -20px rgba(10,16,34,0.5)", overflow: "hidden", border: "1px solid #E2D8C6" }}>
          <div style={{ height: 90, background: grad("#E9825C", "#C7541F"), display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 30px" }}>
            <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 22, color: "rgba(255,255,255,0.85)" }}>THE WORTHY GUIDE</div>
            <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 34, color: "#fff" }}>Trigger words + rephrase patterns</div>
          </div>
          <div style={{ padding: "22px 30px", display: "flex", flexDirection: "column", gap: 14 }}>
            {["The 5-second /status check", "The trigger-word list", "Name-the-output rephrases"].map((t, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 27, color: INK, opacity: over(lf, fr(0.5), 8) }}>
                <span style={{ width: 30, height: 30, borderRadius: 8, background: GREEN, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>✓</span>{t}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* comment prompt */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 860, textAlign: "center", transform: `scale(${big})`, opacity: big }}>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 34, color: MUTE, marginBottom: 14 }}>comment</div>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 130, color: CLAY, letterSpacing: "-0.02em", lineHeight: 1, textShadow: `0 0 40px rgba(210,114,78,0.45)` }}>WORTHY</div>
        {/* comment field typing */}
        <div style={{ marginTop: 28, display: "inline-flex", alignItems: "center", gap: 14, padding: "16px 26px", borderRadius: 999, background: "#fff", border: "2px solid #E2D8C6", boxShadow: "0 16px 34px -16px rgba(10,16,34,0.35)" }}>
          <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 34, color: INK }}>{kw.slice(0, typed)}<span style={{ opacity: lf % 16 < 8 ? 1 : 0.2, color: CLAY }}>|</span></span>
          <span style={{ width: 46, height: 46, borderRadius: "50%", background: grad("#E9825C", "#C7541F"), color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>➤</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---------------- hook-header (opening title, mute-readable) ----------------
const HookHeader: React.FC = () => {
  const f = useCurrentFrame();
  const o = interpolate(f, [2, 11, fr(2.4), fr(2.95)], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  if (o <= 0.01) return null;
  const rise = over(f, 2, 12, Easing.out(Easing.back(1.1)));
  return (
    <div style={{ position: "absolute", left: 60, right: 60, top: 520, textAlign: "center", zIndex: 130, opacity: o, transform: `translateY(${(1 - rise) * 20}px)` }}>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 104, lineHeight: 1.02, letterSpacing: "-0.02em", color: "#F4EEE2", textShadow: "0 6px 30px rgba(0,0,0,0.55)" }}>
        Claude thinks you're <span style={{ color: "#F0A981" }}>too dumb</span> for <span style={{ color: "#F0A981" }}>Fable 5</span>
      </div>
    </div>
  );
};

// ---------------- progress bar with reward seal ----------------
const ProgressBar: React.FC = () => {
  const f = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const p = Math.min(1, f / (durationInFrames - 1));
  const t = f / FPS;
  const marks = [L[3], L[5], L[6]];
  const TOTAL = durationInFrames / FPS;
  const PELLETS = [1.5, 4.4, 7.22, 11.52, 14.6, 20.5, 24.2, 30.6, 38.5, 41.5, 44.0];
  const hitT = L[7] + 0.82;
  const dashP = t >= L[7] ? Math.min(1, (t - L[7]) / 0.8) : 0;
  const dashE = 1 - Math.pow(1 - dashP, 3);
  const pos = p + (0.988 - p) * dashE;             // critter sprints to the gift at the CTA
  const hit = t >= hitT;
  const score = PELLETS.filter((pt) => t >= pt).length + marks.filter((m) => t >= m).length * 3;
  const incTimes = [...PELLETS, ...marks].filter((x) => t >= x);
  const lastInc = incTimes.length ? Math.max(...incTimes) : -9;
  const incPop = Math.max(0, 1 - (t - lastInc) * 3);
  return (
    <div style={{ position: "absolute", left: 46, right: 46, top: 272, height: 60, zIndex: 120 }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 20, height: 22, background: "rgba(58,92,132,0.22)", borderRadius: 999, boxShadow: "inset 0 1px 3px rgba(0,0,0,0.15)" }} />
      <div style={{ position: "absolute", left: 0, top: 20, height: 22, width: `${p * 100}%`, background: grad("#E08A66", "#C5603C"), borderRadius: 999, boxShadow: "0 3px 12px rgba(210,114,78,0.6)" }} />
      {/* pellet dots the mascot eats along the way (micro-rewards between milestones) */}
      {PELLETS.map((pt, i) => {
        const np = pt / TOTAL;
        const de = t - pt;
        if (de > 0.55) return null;
        return (
          <div key={`pl${i}`} style={{ position: "absolute", left: `${np * 100}%`, top: 31, transform: "translate(-50%, -50%)" }}>
            {de < 0 && <div style={{ width: 13, height: 13, borderRadius: "50%", background: GOLD, border: "2px solid #F6E4A0", boxShadow: `0 0 9px ${GOLD}`, opacity: 0.9, transform: `scale(${1 + Math.sin(f / 7 + i * 2) * 0.16})` }} />}
            {de >= 0 && <>
              <div style={{ position: "absolute", left: -7, top: -7, width: 14, height: 14, borderRadius: "50%", border: `3px solid ${GOLD}`, transform: `scale(${1 + de * 7})`, opacity: Math.max(0, 1 - de * 2.1) }} />
              <div style={{ position: "absolute", left: -3, top: -3, width: 6, height: 6, borderRadius: "50%", background: "#F6E4A0", transform: `scale(${Math.max(0, 1 - de * 2.5)})`, opacity: Math.max(0, 1 - de * 2) }} />
            </>}
          </div>); })}
      {marks.map((m, i) => {
        const np = m / TOTAL; const passed = t >= m; const dt = passed ? t - m : 0; const teased = i === 2 && !passed;
        // elastic celebration pop with a wobble, then settle
        const pop = passed ? 1 + Math.max(0, 1 - dt * 2.0) * 0.62 * (1 + Math.sin(Math.min(dt, 0.5) * 24) * 0.3) : 1;
        return (
          <div key={i} style={{ position: "absolute", left: `${np * 100}%`, top: 2, transform: "translateX(-50%)", width: 56, height: 56 }}>
            <div style={{ position: "absolute", inset: 0, transform: `scale(${pop})`, borderRadius: "50%", background: passed ? GREEN : (teased ? "#25314A" : "#EDE7DB"), border: `4px solid ${passed ? GREEN : (teased ? AMBER : CLAY)}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 26, color: passed ? "#fff" : (teased ? AMBER : CLAY), boxShadow: passed ? (dt < 0.5 ? `0 0 ${Math.max(6, 30 - dt * 44)}px ${GOLD}` : `0 0 18px ${GREEN}`) : (teased ? `0 0 16px ${AMBER}99` : "0 2px 6px rgba(0,0,0,0.2)") }}>{passed ? "✓" : i + 1}</div>
          </div>); })}
      {(() => { const unlocked = t >= hitT; const uu = unlocked ? Math.min(1, (t - hitT) / 0.5) : 0; const eu = 1 - Math.pow(1 - uu, 3); const pt = 1 - uu; const pulse = 1 + Math.sin(t * 3.0) * 0.06 * pt; const pop = 1 + Math.max(0, 1 - Math.abs((t - hitT) - 0.14) * 4) * 0.9; const sc = pulse * pop; const bob = Math.sin(t * 2.4) * 3 * pt; return (
        <div style={{ position: "absolute", right: -24, top: -22, width: 96, height: 96, transform: `translateY(${bob}px) scale(${sc})`, zIndex: 131 }}>
          <div style={{ position: "absolute", inset: 10, borderRadius: "50%", background: `radial-gradient(circle, ${GOLD}${unlocked ? "cc" : "44"}, transparent 66%)`, filter: "blur(3px)", boxShadow: unlocked ? `0 0 36px ${GOLD}` : `0 0 14px ${GOLD}66` }} />
          {unlocked && Array.from({ length: 11 }, (_, k) => { const a = (k / 11) * Math.PI * 2; const d = 22 + eu * 28; const o = Math.max(0, 1 - uu * 1.05); return (<div key={k} style={{ position: "absolute", left: 48, top: 48, width: 8, height: 8, marginLeft: -4, marginTop: -4, borderRadius: "50%", background: k % 2 ? "#F3E3A6" : CLAY, opacity: o, transform: `translate(${Math.cos(a) * d}px, ${Math.sin(a) * d}px)`, boxShadow: `0 0 8px ${GOLD}` }} />); })}
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 58, lineHeight: 1, filter: unlocked ? "drop-shadow(0 3px 6px rgba(120,70,10,0.4))" : "grayscale(0.6) brightness(0.85)", opacity: unlocked ? 1 : 0.6, transform: `scale(${unlocked ? 0.9 + eu * 0.22 : 0.84})` }}>🎁</div>
        </div>); })()}
      {(() => { const slamShock = t >= 1.50 && t < 2.6 ? Math.min(1, (t - 1.50) / 0.25) * 0.9 : 0; const party = t >= L[7] ? 1 : 0; const cheerV = Math.max(party, incPop * 0.75); return (
        <div style={{ position: "absolute", left: `${pos * 100}%`, top: -10, transform: "translateX(-50%)", zIndex: 126 }}>
          <div style={{ position: "absolute", inset: -5, borderRadius: "50%", background: "#FBF8F1", border: "3px solid #2B2620", boxShadow: incPop > 0.05 ? `0 0 ${14 + incPop * 16}px ${GOLD}` : "0 5px 14px rgba(26,24,19,0.4)" }} />
          <div style={{ position: "relative" }}><Mascot lf={f} size={66} nodAmp={2.2 + incPop * 2.4} nodSpeed={party ? 4.5 : 6.5} shock={slamShock} cheer={cheerV} gaze={2} /></div>
          {/* the running score the critter collects */}
          <div style={{ position: "absolute", left: "50%", top: 64, transform: `translateX(-50%) scale(${1 + incPop * 0.38})`, opacity: hit ? Math.max(0, 1 - (t - hitT) * 3) : 1, padding: "3px 12px", borderRadius: 999, background: grad("#F0CB63", "#D39A2A"), border: "2px solid #F6E4A0", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 20, color: "#3a2a05", whiteSpace: "nowrap", boxShadow: incPop > 0.05 ? `0 0 12px ${GOLD}` : "0 3px 8px rgba(26,24,19,0.3)" }}>★ {score}</div>
        </div>); })()}
      {/* milestone celebration burst: rings + confetti explode AROUND the walking mascot */}
      {marks.map((m, i) => {
        const dt = t >= m ? t - m : 99;
        if (dt > 0.85) return null;
        const np = m / TOTAL;
        return (
          <div key={`cel${i}`} style={{ position: "absolute", left: `${np * 100}%`, top: 2, transform: "translateX(-50%)", width: 56, height: 56, zIndex: 129, pointerEvents: "none" }}>
            {dt < 0.65 && <div style={{ position: "absolute", left: 28, top: 28, width: 14, height: 14, marginLeft: -7, marginTop: -7, borderRadius: "50%", border: `4px solid ${GREEN}`, transform: `scale(${1 + dt * 13})`, opacity: Math.max(0, 1 - dt * 1.7) }} />}
            {dt > 0.08 && dt < 0.75 && <div style={{ position: "absolute", left: 28, top: 28, width: 14, height: 14, marginLeft: -7, marginTop: -7, borderRadius: "50%", border: `3px solid ${GOLD}`, transform: `scale(${1 + (dt - 0.08) * 11})`, opacity: Math.max(0, 1 - (dt - 0.08) * 1.6) }} />}
            {Array.from({ length: 12 }, (_, k) => { const a = (k / 12) * Math.PI * 2 + seed(k + i * 3); const d = Math.pow(Math.min(1, dt / 0.8), 0.55) * (46 + seed(k * 2 + i) * 36); const o = Math.max(0, 1 - dt * 1.5); const c = [GOLD, CLAY, "#F3E3A6", GREEN][k % 4]; return <div key={k} style={{ position: "absolute", left: 28 + Math.cos(a) * d, top: 28 + Math.sin(a) * d + dt * dt * 26, width: 8, height: 8, borderRadius: "50%", background: c, opacity: o, boxShadow: `0 0 9px ${c}` }} />; })}
          </div>); })}
      {/* GIFT FINALE: the critter slams into the gift -> shockwaves + confetti rain + the guide pops out */}
      {hit && (() => { const dt2 = t - hitT; if (dt2 > 2.2) return null; return (<>
        {dt2 < 0.8 && <div style={{ position: "absolute", left: "calc(100% - 24px)", top: 26, width: 12, height: 12, marginLeft: -6, marginTop: -6, borderRadius: "50%", border: `5px solid ${GOLD}`, transform: `scale(${1 + dt2 * 16})`, opacity: Math.max(0, 1 - dt2 * 1.4), zIndex: 132 }} />}
        {dt2 > 0.05 && dt2 < 1.0 && <div style={{ position: "absolute", left: "calc(100% - 24px)", top: 26, width: 12, height: 12, marginLeft: -6, marginTop: -6, borderRadius: "50%", border: "4px solid #fff", transform: `scale(${1 + (dt2 - 0.05) * 13})`, opacity: Math.max(0, 1 - (dt2 - 0.05) * 1.5), zIndex: 132 }} />}
        {Array.from({ length: 30 }, (_, k) => { const sx = 1000 - seed(k * 3.1) * 560; const fall = dt2 * (200 + seed(k) * 210); const drift = Math.sin(dt2 * 4 + k) * 26; const o = Math.max(0, 1.1 - dt2 * 0.7); const c = [GOLD, CLAY, "#F3E3A6", GREEN, "#fff"][k % 5]; return <div key={k} style={{ position: "absolute", left: sx + drift, top: 8 + fall, width: 8, height: 13, background: c, opacity: o, transform: `rotate(${dt2 * 320 + k * 40}deg)`, borderRadius: 2, zIndex: 131 }} />; })}
        <div style={{ position: "absolute", left: "calc(100% - 84px)", top: 26 - Math.min(1, dt2 / 0.6) * 44, opacity: Math.min(1, dt2 * 3), transform: `rotate(${-6 + Math.sin(dt2 * 3) * 4}deg) scale(${0.6 + Math.min(1, dt2 / 0.6) * 0.4})`, zIndex: 133 }}>
          <div style={{ width: 118, borderRadius: 10, overflow: "hidden", boxShadow: `0 14px 30px -10px rgba(26,24,19,0.5), 0 0 24px ${GOLD}66`, border: "2px solid #F6E4A0" }}>
            <div style={{ height: 26, background: grad("#E9825C", "#C7541F"), display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 14, color: "#fff" }}>THE GUIDE</div>
            <div style={{ background: "#FBF8F1", padding: "7px 10px", display: "flex", flexDirection: "column", gap: 4 }}>
              {[0, 1, 2].map((r) => <div key={r} style={{ height: 5, borderRadius: 3, background: "#E4DCCB", width: `${88 - r * 18}%` }} />)}
            </div>
          </div>
        </div>
      </>); })()}
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
const clines: { words: W[]; start: number; end: number }[] = (() => {
  const out: { words: W[]; start: number; end: number }[] = [];
  let cur: W[] = [];
  cw.forEach((w, i) => {
    cur.push(w);
    const next = cw[i + 1];
    const gap = next ? next.start - w.end : 99;
    const endsSent = /[.!?]$/.test(w.word.trim());
    if (cur.length >= 3 || gap > 0.34 || endsSent) { out.push({ words: cur, start: cur[0].start, end: w.end }); cur = []; }
  });
  if (cur.length) out.push({ words: cur, start: cur[0].start, end: cur[cur.length - 1].end });
  return out;
})();

const Captions: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  if (t >= L[7] - 0.05) return null;
  const lead = 0.12;
  // a line only takes over once the PREVIOUS line's last word has finished sounding,
  // so sentence-final words ("used", "misses") never get cut off mid-speech
  let cur = clines[0];
  for (let i = 0; i < clines.length; i++) {
    const ln = clines[i];
    const gate = i > 0 ? Math.max(ln.start, Math.min(clines[i - 1].end + 0.05, ln.start + 0.5)) : 0;
    if (t + lead >= gate) cur = ln;
  }
  const done = t + lead >= cur.end; // whole line spoken -> keep every word fully lit
  return (
    <div style={{ position: "absolute", left: 44, right: 44, top: 1256, textAlign: "center", zIndex: 90 }}>
      <div style={{ display: "inline-flex", flexWrap: "wrap", justifyContent: "center", gap: "0 16px" }}>
        {cur.words.map((w, i) => { const on = done || t + lead >= w.start; const active = !done && on && (i === cur.words.length - 1 || t + lead < cur.words[i + 1].start); return (
          <span key={i} style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 74, lineHeight: 1.12, letterSpacing: "-0.01em", color: on ? (active ? "#B8501F" : CLAY) : "transparent", transform: active ? "translateY(-3px) scale(1.04)" : "none", display: "inline-block", textShadow: "0 2px 12px rgba(255,251,244,0.9), 0 1px 2px rgba(120,56,26,0.35)" }}>{w.word.trim()}</span>); })}
      </div>
    </div>
  );
};

export const ClaudeWorthyReel: React.FC = () => {
  const frame = useCurrentFrame();
  let punch = 0;
  for (const b of Lf.slice(1)) { const d = frame - b; if (d >= 0 && d < 9) punch = Math.max(punch, Math.pow(1 - d / 9, 2)); }
  // beat kicks: a micro zoom hit on every content beat so no 1-3s window is static
  const KICKS = [1.5, 3.3, 4.6, 6.42, 8.4, L[2] + 0.2, L[2] + 1.7, L[2] + 4.9, L[3] + 0.9, L[4] + 0.45, L[4] + 2.45, L[4] + 4.3, L[4] + 5.78, L[5] + 0.6, L[5] + 3.45, L[5] + 4.5, L[5] + 5.55, L[5] + 6.25, L[6] + 1.55, L[6] + 4.15, L[6] + 8.15, L[6] + 9.3, L[6] + 11.35];
  for (const k of KICKS) { const d = frame - fr(k); if (d >= 0 && d < 7) punch = Math.max(punch, Math.pow(1 - d / 7, 2) * 0.7); }
  const zoom = interpolate(frame, [0, 16, 28], [1.0, 1.02, 1.0], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) }) + punch * 0.028;
  const scene = (i: number) => frame >= Lf[i] && (i === Lf.length - 1 || frame < Lf[i + 1]);
  return (
    <AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
      <Audio src={staticFile("vo_worthy.wav")} />
      <Sfx at={0} src="metal_riser.wav" v={0.6} /><Sfx at={0.12} src="boom.wav" v={0.42} />
      <Sfx at={0.1} src="pop.wav" v={0.3} dur={0.6} /><Sfx at={0.35} src="pop.wav" v={0.26} dur={0.6} />
      <Sfx at={1.50} src="thock.wav" v={0.55} /><Sfx at={1.54} src="boom.wav" v={0.3} />
      <Sfx at={2.75} src="snap.wav" v={0.4} dur={0.6} />
      <Sfx at={3.3} src="blip1.wav" v={0.3} dur={0.4} /><Sfx at={3.62} src="blip2.wav" v={0.3} dur={0.4} /><Sfx at={3.95} src="blip3.wav" v={0.3} dur={0.4} /><Sfx at={4.28} src="blip4.wav" v={0.3} dur={0.4} /><Sfx at={4.6} src="blip5.wav" v={0.3} dur={0.4} /><Sfx at={5.28} src="pop.wav" v={0.34} dur={0.5} />
      <Sfx at={6.4} src="thock.wav" v={0.46} />
      <Sfx at={6.8} src="tick.wav" v={0.3} dur={0.5} />
      <Sfx at={L[2] + 2.2} src="blip2.wav" v={0.26} dur={0.4} /><Sfx at={L[2] + 2.65} src="blip3.wav" v={0.26} dur={0.4} /><Sfx at={L[2] + 3.1} src="blip4.wav" v={0.26} dur={0.4} />
      <Sfx at={L[4] + 5.75} src="thock.wav" v={0.38} />
      <Sfx at={L[5] + 1.4} src="tick.wav" v={0.28} dur={0.4} /><Sfx at={L[5] + 2.3} src="tick.wav" v={0.28} dur={0.4} /><Sfx at={L[5] + 3.2} src="tick.wav" v={0.28} dur={0.4} /><Sfx at={L[5] + 4.1} src="tick.wav" v={0.28} dur={0.4} />
      <Sfx at={L[6] + 8.1} src="swish.wav" v={0.34} /><Sfx at={L[6] + 9.3} src="pop.wav" v={0.3} dur={0.5} />
      {L.slice(1).map((tt, i) => <React.Fragment key={`b${i}`}><Sfx at={tt - 0.08} src="swish.wav" v={0.4} /><Sfx at={tt + 0.26} src="pop.wav" v={0.24} dur={0.6} /></React.Fragment>)}
      <Sfx at={L[2] + 0.15} src="whoosh.wav" v={0.42} />
      <Sfx at={L[2] + 4.9} src="sparkle.wav" v={0.45} />
      <Sfx at={L[3] + 0.9} src="snap.wav" v={0.4} dur={0.6} />
      {[L[3], L[5], L[6]].map((tt, i) => <Sfx key={`mk${i}`} at={tt + 0.05} src="chimehi.wav" v={0.32} dur={0.8} />)}
      <Sfx at={L[5] + 4.5} src="sub.wav" v={0.3} dur={0.5} /><Sfx at={L[5] + 5.55} src="sub.wav" v={0.3} dur={0.5} /><Sfx at={L[5] + 6.25} src="sub.wav" v={0.34} dur={0.5} />
      <Sfx at={L[4] + 0.3} src="key.wav" v={0.3} dur={0.9} />
      {[0.4, 0.9, 1.4, 1.9].map((tt, i) => <Sfx key={`cd${i}`} at={L[4] + tt} src="tick.wav" v={0.22} dur={0.35} />)}
      <Sfx at={L[4] + 2.42} src="ding.wav" v={0.4} dur={0.9} />
      <Sfx at={L[4] + 4.3} src="thock.wav" v={0.42} />
      <Sfx at={L[5] + 4.5} src="snap.wav" v={0.44} dur={0.6} /><Sfx at={L[5] + 5.55} src="snap.wav" v={0.44} dur={0.6} /><Sfx at={L[5] + 6.25} src="snap.wav" v={0.48} dur={0.6} />
      <Sfx at={L[6] + 0.4} src="key.wav" v={0.28} dur={0.9} />
      <Sfx at={L[6] + 1.5} src="screech.wav" v={0.3} dur={0.8} />
      <Sfx at={L[6] + 4.15} src="key.wav" v={0.26} dur={1.6} />
      <Sfx at={L[6] + 11.35} src="resolve.wav" v={0.5} />
      <Sfx at={L[7]} src="resolve.wav" v={0.5} /><Sfx at={L[7] + 0.82} src="boom.wav" v={0.42} /><Sfx at={L[7] + 0.86} src="sparkle.wav" v={0.55} /><Sfx at={L[7] + 0.9} src="angelic.wav" v={0.38} dur={3} /><Sfx at={L[7] + 0.98} src="chimehi.wav" v={0.4} dur={1} />
      {[4.4, 14.6, 20.5, 24.2, 30.6, 38.5, 41.5, 44.0].map((tt, i) => <Sfx key={`pt${i}`} at={tt} src="tick.wav" v={0.17} dur={0.3} />)}
      <Audio loop src={staticFile("seo_music.wav")} volume={(ff) => interpolate(ff, [0, fr(1.4), fr(L[7]) - 8, fr(L[7]) + 14, 99999], [0, 0.11, 0.11, 0.08, 0.08], { extrapolateRight: "clamp" })} />

      <Bg />
      <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "50% 46%" }}>
        {scene(0) && <Hook lf={frame - Lf[0]} />}
        {scene(1) && <Swap lf={frame - Lf[1]} />}
        {scene(2) && <Rehook lf={frame - Lf[2]} />}
        {scene(3) && <Receipt lf={frame - Lf[3]} />}
        {scene(4) && <Check lf={frame - Lf[4]} />}
        {scene(5) && <Triggers lf={frame - Lf[5]} />}
        {scene(6) && <Fix lf={frame - Lf[6]} />}
        {scene(7) && <CTA lf={frame - Lf[7]} />}
        <Captions />
      </AbsoluteFill>
      <ProgressBar />
      {(() => { let fl = 0; for (const b of Lf.slice(1)) { const d = frame - b; if (d >= 0 && d < 7) fl = Math.max(fl, Math.pow(1 - d / 7, 2)); } return fl > 0 ? <AbsoluteFill style={{ background: "#FFF6E6", opacity: fl * 0.5, zIndex: 200, pointerEvents: "none" }} /> : null; })()}
    </AbsoluteFill>
  );
};
