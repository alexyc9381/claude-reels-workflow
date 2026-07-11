import React from "react";
import { AbsoluteFill, Img, OffthreadVideo, useCurrentFrame, useVideoConfig, interpolate, Easing, Audio, Sequence, staticFile } from "remotion";
import { fraunces, inter } from "./fonts";
import words from "./data/words_unlock.json";

const CREAM = "#ECE9E2", INK = "#1A1813", SLATE = "#3A5C84", CLAY = "#D2724E", AMBER = "#CF9544", GOLD = "#E7B24C", GREEN = "#3F9E74", MUTE = "#9A968B", RED = "#C44A3A";
const NAVY = "#233250", NAVY2 = "#18233A", PAPER = "#F7F3EA";
const mono = "ui-monospace,'SF Mono',Menlo,monospace";
const FPS = 30;
const fr = (s: number) => Math.round(s * FPS);
const grad = (a: string, b: string) => `linear-gradient(158deg, ${a} 0%, ${b} 100%)`;
const NAVYSH = "0 34px 66px -22px rgba(18,28,58,0.55), 0 10px 24px rgba(18,28,58,0.30)";

// scene starts (sec): hook, move1, move2, move3, cta
const L = [0, 18.9, 31.8, 40.8, 53.6];
const Lf = L.map(fr);

const over = (f: number, start: number, dur: number, ease = Easing.out(Easing.cubic)) =>
  interpolate(f, [start, start + dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
const ramp = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const seed = (n: number) => { const x = Math.sin(n * 127.1 + 43.7) * 43758.5453; return x - Math.floor(x); };

// ---------------- background ----------------
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

// FAST-CUT MONTAGE of the real launch video: white-flash pop + zoom punch + rotation jitter on every cut
const MontageCard: React.FC<{ w: number; lf: number }> = ({ w, lf }) => {
  const vh = w * 720 / 1280;
  const CUT = 16.5;                                  // frames per montage cut (0.55s)
  const ci = Math.floor(lf / CUT);
  const cp = (lf % CUT) / CUT;
  const flash = Math.pow(Math.max(0, 1 - cp * 3.4), 2);   // white pop right at each cut
  const punch = 1 + flash * 0.07;
  const rot = (ci % 2 ? 1 : -1) * (1.4 * (1 - cp) * (flash > 0 ? 1 : 0.4));
  return (<div style={{ width: w, borderRadius: 20, overflow: "hidden", background: "#0E1524", boxShadow: `0 30px 60px -18px rgba(10,16,34,0.7), 0 0 ${46 + flash * 40}px rgba(231,178,76,${0.3 + flash * 0.4})`, position: "relative", border: "1px solid rgba(255,255,255,0.08)", transform: `scale(${punch}) rotate(${rot * 0.4}deg)` }}>
    <div style={{ position: "relative", width: w, height: vh }}>
      <OffthreadVideo src={staticFile("fable/fable_montage.mp4")} muted style={{ width: w, height: vh, display: "block", objectFit: "cover", transform: `scale(${1.04 + cp * 0.05})` }} />
      {/* white flash on each cut */}
      <div style={{ position: "absolute", inset: 0, background: "#fff", opacity: flash * 0.75, pointerEvents: "none" }} />
      {/* live chip */}
      <div style={{ position: "absolute", left: 14, top: 14, display: "flex", alignItems: "center", gap: 8, padding: "6px 12px", borderRadius: 999, background: "rgba(14,21,36,0.72)" }}>
        <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#FF3B30", opacity: 0.5 + Math.max(0, Math.sin(lf / 5)) * 0.5 }} />
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 15, color: "#fff", letterSpacing: 1 }}>LIVE</span>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 8, background: "rgba(255,255,255,0.25)" }}><div style={{ height: "100%", width: `${(lf / fr(7.5)) * 100}%`, background: "#FF3B30" }} /></div>
    </div>
    <div style={{ padding: "15px 22px", display: "flex", alignItems: "center", gap: 13, background: "#141C2A" }}>
      <div style={{ width: 36, height: 36, borderRadius: 10, background: grad("#E9825C", "#C7541F"), display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 24, color: "#fff", boxShadow: "inset 0 1px 2px rgba(255,255,255,0.4)" }}>*</div>
      <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 25, color: "#E9E2D4" }}>Introducing Claude Fable 5</span>
      <span style={{ marginLeft: "auto", fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 20, color: "#8a94a8" }}>Anthropic</span>
    </div>
  </div>);
};

// firework burst (dots exploding outward with gravity + fade)
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

// a browser scrolling the REAL "Prompting Claude Fable 5" docs page (screen-recording feel)
const ScrollBrowser: React.FC<{ lf: number; a: number; b: number; scroll: number }> = ({ lf, a, b, scroll }) => {
  const W = 726, VH = 468;
  const y = interpolate(lf, [a, b], [0, -scroll], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad) });
  return (
    <div style={{ width: W, borderRadius: 16, overflow: "hidden", background: "#fff", boxShadow: `${NAVYSH}, 0 0 40px rgba(210,114,78,0.18)`, border: "1px solid rgba(0,0,0,0.1)" }}>
      <div style={{ height: 50, background: "#E9E4DA", display: "flex", alignItems: "center", padding: "0 16px" }}>
        <div style={{ display: "flex", gap: 8 }}>{["#ED6A5E", "#F4BF4F", "#61C554"].map((c, i) => <div key={i} style={{ width: 14, height: 14, borderRadius: "50%", background: c }} />)}</div>
        <div style={{ marginLeft: 14, flex: 1, height: 30, borderRadius: 8, background: "#fff", display: "flex", alignItems: "center", padding: "0 14px", fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 17, color: "#6B6558", overflow: "hidden", whiteSpace: "nowrap" }}>platform.claude.com › prompting-claude-fable-5</div>
      </div>
      <div style={{ position: "relative", width: W, height: VH, overflow: "hidden", background: "#fff" }}>
        <Img src={staticFile("fable/guide.png")} style={{ position: "absolute", top: 0, left: 0, width: W, transform: `translateY(${y}px)` }} />
        {/* subtle scrollbar */}
        <div style={{ position: "absolute", right: 5, top: 6 + (-y / scroll) * (VH - 90), width: 6, height: 84, borderRadius: 3, background: "rgba(0,0,0,0.22)" }} />
      </div>
    </div>
  );
};

// steal-this prompt line box (the "worth stealing" payoff)
const StealBox: React.FC<{ line: string; lf: number; at: number; top: number }> = ({ line, lf, at, top }) => {
  const o = over(lf, at, 10);
  return (
    <div style={{ position: "absolute", left: 110, right: 110, top, opacity: o, transform: `translateY(${(1 - o) * 22}px) scale(${0.96 + o * 0.04})` }}>
      <div style={{ borderRadius: 18, background: "#121B2C", border: `2px solid ${CLAY}`, boxShadow: `0 22px 42px -16px rgba(10,16,34,0.7), 0 0 30px rgba(210,114,78,0.28)`, padding: "18px 24px" }}>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 16, letterSpacing: 2.5, color: CLAY, marginBottom: 10 }}>STEAL THIS PROMPT</div>
        <div style={{ fontFamily: mono, fontSize: 27, lineHeight: 1.36, color: "#EDE7DB" }}>{line}</div>
      </div>
    </div>
  );
};

// ---------------- HOOK (flashy montage -> short animated playbook -> literal primer) ----------------
const Hook: React.FC<{ lf: number }> = ({ lf }) => {
  const inn = over(lf, 0, 9);
  const vs = ramp(lf, fr(6.9), fr(7.5));                 // montage fades out
  const book = over(lf, fr(7.5), 11);                    // playbook browser in
  const bookGone = ramp(lf, fr(11.9), fr(12.4));         // ...and out (short!)
  const primer = over(lf, fr(12.4), 11);                 // "exactly what you say" beat
  const primerGone = ramp(lf, fr(16.2), fr(16.9));
  const trans = over(lf, fr(16.8), 10);                  // "3 prompts worth stealing"
  const stamp = over(lf, fr(4.7), 9, Easing.out(Easing.back(2.2))); // "you're missing 3" slam
  const tPulse = 1 + Math.max(0, Math.sin(lf / 4.2)) * 0.02;
  return (
    <>
      {/* trend-jack title, from frame 0, pulsing, fades as the playbook takes over */}
      <div style={{ position: "absolute", left: 44, right: 44, top: 384, textAlign: "center", opacity: inn * (1 - book * 0.94), transform: `translateY(${(1 - inn) * -14 - book * 14}px) scale(${tPulse})`, zIndex: 34 }}>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 53, lineHeight: 1, letterSpacing: "-0.02em", color: "#F4EFE4", textShadow: "0 0 34px rgba(231,178,76,0.35)", whiteSpace: "nowrap" }}>
          Everyone's obsessed with <span style={{ color: AMBER }}>Fable 5</span>
        </div>
      </div>
      {/* MONTAGE: fast cuts + flashes */}
      {vs < 1 && (
        <div style={{ position: "absolute", left: "50%", top: 468, transform: `translateX(-50%) translateY(${vs * -26}px) scale(${1 - vs * 0.14})`, opacity: 1 - vs, transformOrigin: "50% 0", zIndex: 30 }}>
          <MontageCard w={780} lf={lf} />
        </div>
      )}
      {/* fireworks popping around the montage */}
      {lf < fr(7.4) && <>
        <Firework lf={lf} at={10} x={160} y={470} hue={0} />
        <Firework lf={lf} at={34} x={900} y={540} hue={1} />
        <Firework lf={lf} at={58} x={220} y={920} hue={2} />
        <Firework lf={lf} at={84} x={880} y={430} hue={3} />
        <Firework lf={lf} at={110} x={180} y={620} hue={4} />
        <Firework lf={lf} at={136} x={860} y={880} hue={5} />
        <Firework lf={lf} at={162} x={540} y={410} hue={6} />
        <Firework lf={lf} at={188} x={300} y={480} hue={7} />
      </>}
      {/* "you're missing 3 of them" slam (the open loop) */}
      {stamp > 0.01 && vs < 1 && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 942, textAlign: "center", opacity: Math.min(1, stamp) * (1 - vs), transform: `scale(${stamp}) rotate(${(1 - stamp) * 10 - 3}deg)`, zIndex: 36 }}>
          <span style={{ display: "inline-block", padding: "12px 32px", borderRadius: 999, background: RED, color: "#fff", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 44, boxShadow: "0 0 34px rgba(196,74,58,0.65)" }}>you're missing 3 of them</span>
        </div>
      )}
      {/* playbook kicker */}
      {book > 0.05 && bookGone < 1 && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 392, textAlign: "center", opacity: over(lf, fr(7.8), 8) * (1 - bookGone), zIndex: 28 }}>
          <span style={{ display: "inline-block", padding: "9px 26px", borderRadius: 999, background: CLAY, color: "#fff", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 27, letterSpacing: 0.4, boxShadow: "0 8px 18px rgba(199,84,31,0.42)" }}>Anthropic&rsquo;s Fable 5 playbook</span>
        </div>
      )}
      {/* CURATION: fast scroll of the real page + ✓ stamps snapping on as it finds the moves */}
      {book > 0 && bookGone < 1 && (
        <div style={{ position: "absolute", left: "50%", top: 470, transform: `translateX(-50%) translateY(${(1 - book) * 30 - bookGone * 26}px)`, opacity: book * (1 - bookGone), zIndex: 25 }}>
          <ScrollBrowser lf={lf} a={fr(7.9)} b={fr(11.7)} scroll={1150} />
          {/* ✓ stamps popping onto the page as the 3 moves get found */}
          {[fr(8.8), fr(9.6), fr(10.4)].map((at, i) => { const s = over(lf, at, 7, Easing.out(Easing.back(2.4))); if (s <= 0.01) return null; return (
            <div key={i} style={{ position: "absolute", left: 60 + i * 215, top: 150 + (i % 2) * 160, transform: `scale(${s}) rotate(${-8 + i * 7}deg)`, zIndex: 27 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 18px", borderRadius: 999, background: GREEN, boxShadow: `0 0 24px rgba(63,158,116,0.6)` }}>
                <span style={{ color: "#fff", fontWeight: 900, fontSize: 24 }}>✓</span>
                <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 21, color: "#fff" }}>move {i + 1}</span>
              </div>
            </div>); })}
          {over(lf, fr(11.0), 7) > 0.3 && <div style={{ position: "absolute", right: -22, top: -20, padding: "8px 22px", borderRadius: 999, background: CLAY, color: "#fff", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 22, boxShadow: "0 8px 18px rgba(199,84,31,0.45)", transform: `scale(${over(lf, fr(11.0), 7)}) rotate(-4deg)`, zIndex: 26 }}>pulled the 3 best</div>}
        </div>
      )}
      {/* PRIMER: "does exactly what you say, fast" */}
      {primer > 0.01 && primerGone < 1 && (() => {
        const pin = over(lf, fr(12.6), 10);                      // prompt pill in
        const zap = over(lf, fr(13.8), 6);                       // instant execution
        const exact = over(lf, fr(14.4), 8, Easing.out(Easing.back(2)));  // EXACTLY stamp
        return (
          <div style={{ opacity: primer * (1 - primerGone) }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 420, textAlign: "center", opacity: over(lf, fr(12.5), 8) }}>
              <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 54, color: "#F4EFE4" }}>it does <span style={{ color: AMBER }}>exactly</span> what you say</span>
            </div>
            {/* prompt pill */}
            <div style={{ position: "absolute", left: 120, top: 570, opacity: pin, transform: `translateX(${(1 - pin) * -60}px)` }}>
              <div style={{ padding: "16px 26px", borderRadius: 18, background: "#121B2C", border: `2px solid ${CLAY}`, boxShadow: "0 18px 36px -14px rgba(10,16,34,0.7)" }}>
                <span style={{ fontFamily: mono, fontSize: 28, color: "#EDE7DB" }}>"make the header navy"</span>
              </div>
            </div>
            {/* lightning + speed lines */}
            {zap > 0 && <div style={{ position: "absolute", left: 520, top: 660, fontSize: 62, opacity: Math.min(1, zap * 2), transform: `scale(${0.7 + zap * 0.5})`, zIndex: 20 }}>⚡</div>}
            {zap > 0.2 && Array.from({ length: 4 }, (_, k) => <div key={k} style={{ position: "absolute", left: 480 + k * 24, top: 640 + k * 22, width: 60 - k * 8, height: 5, borderRadius: 3, background: GOLD, opacity: (1 - zap) * 0.9, transform: "rotate(18deg)" }} />)}
            {/* result: header flips navy instantly */}
            <div style={{ position: "absolute", right: 110, top: 610, width: 360, opacity: over(lf, fr(13.6), 8) }}>
              <div style={{ borderRadius: 18, background: PAPER, boxShadow: "0 20px 40px -14px rgba(10,16,34,0.6)", overflow: "hidden", border: `3px solid ${zap > 0.6 ? GREEN : "#C3BAAA"}` }}>
                <div style={{ height: 64, background: zap > 0.6 ? grad(NAVY, NAVY2) : "#D8CDBB", transition: "none", display: "flex", alignItems: "center", padding: "0 18px" }}>
                  <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 20, color: zap > 0.6 ? "#fff" : MUTE }}>header</span>
                </div>
                <div style={{ padding: "16px 18px" }}>{[0, 1].map((i) => <div key={i} style={{ height: 12, borderRadius: 6, width: `${78 - i * 18}%`, background: "#D8CDBB", margin: "0 0 12px" }} />)}</div>
              </div>
              {exact > 0.01 && <div style={{ position: "absolute", right: -18, top: -24, transform: `scale(${exact}) rotate(6deg)` }}><span style={{ display: "inline-block", padding: "8px 20px", borderRadius: 999, background: GREEN, color: "#fff", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 27, boxShadow: `0 0 24px rgba(63,158,116,0.6)` }}>EXACTLY. instantly.</span></div>}
            </div>
            <div style={{ position: "absolute", left: 0, right: 0, top: 850, textAlign: "center", opacity: over(lf, fr(15.2), 9) }}>
              <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 30, color: "#C7CFDD" }}>the whole game: <span style={{ color: GOLD }}>steer it precisely</span></span>
            </div>
          </div>
        );
      })()}
      {/* TRANSITION: 3 prompts worth stealing */}
      {trans > 0 && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 600, textAlign: "center", opacity: trans, transform: `scale(${0.82 + trans * 0.18})` }}>
          <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 96, color: GOLD, lineHeight: 1, textShadow: `0 0 40px ${GOLD}66` }}>3</div>
          <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 60, color: "#F4EFE4", marginTop: 6 }}>prompts worth stealing</div>
          <Firework lf={lf} at={fr(17.0)} x={340} y={640} hue={2} />
          <Firework lf={lf} at={fr(17.2)} x={760} y={700} hue={5} />
        </div>
      )}
    </>
  );
};

// ---------------- MOVE header ----------------
const MoveHeader: React.FC<{ n: number; name: string; lf: number; color?: string; tag?: string }> = ({ n, name, lf, color = CLAY, tag }) => {
  const o = over(lf, 1, 8);
  return (
    <div style={{ position: "absolute", left: 50, right: 50, top: 358, textAlign: "center", opacity: o, transform: `translateY(${(1 - o) * -16}px)` }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 18 }}>
        <span style={{ width: 74, height: 74, borderRadius: "50%", background: color, color: "#fff", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 42, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 22px ${color}66` }}>{n}</span>
        <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 56, color: "#F4EFE4", letterSpacing: "-0.02em" }}>{name}</span>
      </div>
      {tag && <div style={{ marginTop: 10 }}><span style={{ padding: "6px 20px", borderRadius: 999, background: RED, color: "#fff", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 22, boxShadow: "0 6px 14px rgba(196,74,58,0.4)" }}>{tag}</span></div>}
    </div>
  );
};

// ---------------- MOVE 1: the boundary line ----------------
const M1: React.FC<{ lf: number }> = ({ lf }) => {
  const ov = over(lf, fr(1.8), 12);      // it over-executes (extra red actions)
  const rein = over(lf, fr(9.2), 12);    // boundary reins it in
  const extras = ["also refactored 4 other files", "also renamed your variables", "also rewrote the config"];
  return (
    <>
      <MoveHeader n={1} name="The boundary line" lf={lf} />
      <div style={{ position: "absolute", left: 130, right: 130, top: 486 }}>
        <div style={{ borderRadius: 22, background: PAPER, boxShadow: "0 22px 44px -16px rgba(10,16,34,0.6)", border: `3px solid ${rein > 0.5 ? GREEN : "#D8CDBB"}`, padding: "22px 28px" }}>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 22, color: MUTE, marginBottom: 16 }}>you asked: fix one bug</div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
            <span style={{ width: 36, height: 36, borderRadius: "50%", background: GREEN, color: "#fff", fontSize: 20, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>✓</span>
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 28, color: INK }}>Fixed the bug</span>
          </div>
          {extras.map((tx, i) => { const app = ov > (i + 1) * 0.24 ? 1 : 0; const vis = app * (1 - rein); const h = vis * 58; return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, height: h, marginBottom: vis * 14, opacity: vis, overflow: "hidden", transform: `translateX(${(1 - vis) * -30}px)` }}>
              <span style={{ width: 36, height: 36, borderRadius: "50%", background: RED, color: "#fff", fontSize: 24, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>+</span>
              <span style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 25, color: RED }}>{tx}</span>
            </div>); })}
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 24, color: GREEN, marginTop: rein * 6, height: rein * 34, opacity: rein }}>and stopped. nothing else touched.</div>
        </div>
      </div>
      <StealBox line={"Do exactly this, nothing else. Show me your take first, then stop."} lf={lf} at={fr(4.8)} top={812} />
    </>
  );
};

// ---------------- MOVE 2: the rules-first stack ----------------
const M2: React.FC<{ lf: number }> = ({ lf }) => {
  const flip = over(lf, fr(3.4), 16, Easing.out(Easing.back(1.15)));  // rules jump to the top
  return (
    <>
      <MoveHeader n={2} name="The rules-first stack" lf={lf} color={SLATE} />
      <div style={{ position: "absolute", left: 140, right: 140, top: 486, height: 300 }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: 22, background: PAPER, boxShadow: "0 22px 44px -16px rgba(10,16,34,0.6)", overflow: "hidden" }}>
          {/* TASK block */}
          <div style={{ position: "absolute", left: 26, right: 26, top: 24 + flip * 168 }}>
            <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 19, letterSpacing: 1, color: MUTE, marginBottom: 10 }}>TASK</div>
            {[0, 1].map(i => <div key={i} style={{ height: 14, borderRadius: 7, width: `${82 - i * 16}%`, background: "#D2C9B8", margin: "0 0 12px" }} />)}
          </div>
          {/* RULES block, slides bottom -> top */}
          <div style={{ position: "absolute", left: 26, right: 26, top: 24 + (1 - flip) * 176, borderRadius: 14, background: flip > 0.5 ? "rgba(63,158,116,0.12)" : "rgba(154,150,139,0.16)", border: `2px solid ${flip > 0.5 ? GREEN : "#C3BAAA"}`, padding: "14px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 20, letterSpacing: 1, color: flip > 0.5 ? GREEN : MUTE }}>RULES {flip > 0.5 ? "· obeyed" : "· ignored"}</span>
              <span style={{ color: flip > 0.5 ? GREEN : RED, fontSize: 22, fontWeight: 900 }}>{flip > 0.5 ? "✓" : "✗"}</span>
            </div>
            {["never touch X", "always do Y", "format: Z"].map((r, i) => <div key={i} style={{ fontFamily: mono, fontSize: 22, color: flip > 0.5 ? "#2C7A57" : "#8A8172", margin: "0 0 3px" }}>· {r}</div>)}
          </div>
        </div>
      </div>
      <StealBox line={"Rules first: never X, always Y, format Z. Then the task."} lf={lf} at={fr(5)} top={818} />
    </>
  );
};

// ---------------- MOVE 3: the cold-read check (the big one) ----------------
const M3: React.FC<{ lf: number }> = ({ lf }) => {
  const self = over(lf, fr(1.6), 12);        // self-review card
  const sweep = over(lf, fr(5.4), 46, Easing.inOut(Easing.cubic)); // magnifier sweeps L -> R (visible ~1.5s)
  const fresh = over(lf, fr(6.7), 12);       // fresh-read card lights
  const caught = over(lf, fr(7.3), 12);      // bug circled red
  const magX = 200 + sweep * 540;
  return (
    <>
      <MoveHeader n={3} name="The cold-read check" lf={lf} color={GOLD} tag="the big one" />
      {/* self-review card (left) */}
      <div style={{ position: "absolute", left: 100, top: 506, width: 408, opacity: self, transform: `translateY(${(1 - self) * 20}px)` }}>
        <div style={{ borderRadius: 20, background: PAPER, boxShadow: "0 18px 36px -16px rgba(10,16,34,0.6)", border: "3px solid #B9AF9E", padding: "20px 24px", minHeight: 168 }}>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 20, color: MUTE, marginBottom: 14 }}>it checks its own work</div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <span style={{ width: 34, height: 34, borderRadius: "50%", background: "#B9AF9E", color: "#fff", fontSize: 19, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>✓</span>
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 28, color: MUTE }}>&ldquo;Looks good&rdquo;</span>
          </div>
          <div style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 27 }}>🐛</span>
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 21, color: caught > 0.3 ? RED : "#B0A692" }}>{caught > 0.3 ? "missed this bug" : "a bug is hiding"}</span>
            {caught > 0.04 && <div style={{ position: "absolute", left: -8, top: -9, width: 54, height: 52, borderRadius: "50%", border: `4px solid ${RED}`, opacity: Math.min(1, caught * 1.5), transform: `scale(${0.6 + caught * 0.4}) rotate(${(1 - caught) * 40}deg)` }} />}
          </div>
        </div>
      </div>
      {/* fresh-read card (right) */}
      <div style={{ position: "absolute", right: 100, top: 506, width: 408, opacity: fresh, transform: `translateY(${(1 - fresh) * 20}px) scale(${0.95 + fresh * 0.05})` }}>
        <div style={{ borderRadius: 20, background: PAPER, boxShadow: `0 18px 36px -16px rgba(10,16,34,0.6), 0 0 ${caught * 32}px rgba(63,158,116,0.45)`, border: `3px solid ${GREEN}`, padding: "20px 24px", minHeight: 168 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 20, color: GREEN }}>a fresh read</span>
            <span style={{ padding: "3px 10px", borderRadius: 999, background: "rgba(47,126,90,0.14)", fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 14, color: GREEN }}>Anthropic-backed</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
            <span style={{ width: 34, height: 34, borderRadius: "50%", background: GREEN, color: "#fff", fontSize: 20, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>!</span>
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 28, color: INK }}>&ldquo;Found it&rdquo;</span>
          </div>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 19, color: GREEN, opacity: caught }}>catches what self-review can&rsquo;t</div>
        </div>
      </div>
      {/* magnifier sweeping across to catch the bug */}
      {sweep > 0.02 && sweep < 0.99 && (
        <div style={{ position: "absolute", left: magX, top: 556, fontSize: 68, transform: `rotate(${-8 + Math.sin(lf / 4) * 6}deg)`, filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.35))", zIndex: 20 }}>🔍</div>
      )}
      <StealBox line={"Review this as if someone else wrote it. List what's wrong."} lf={lf} at={fr(7.4)} top={790} />
    </>
  );
};

// ---------------- CTA (the 9-prompt playbook guide) ----------------
const CTA: React.FC<{ lf: number }> = ({ lf }) => {
  const doc = over(lf, fr(0.2), 13, Easing.out(Easing.back(1.3)));
  const o = over(lf, fr(0.7), 12);
  const key = over(lf, fr(1.2), 14, Easing.out(Easing.back(1.5)));
  const shine = ((lf - fr(1.6)) % 42) / 42;
  const items = ["The boundary line", "The rules-first stack", "The cold-read check"];
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-start", paddingTop: 300 }}>
      {Array.from({ length: 18 }, (_, k) => { const a = (k / 18) * Math.PI * 2 + seed(k); const d = 150 + seed(k) * 320 * over(lf, 1, 34); const o2 = Math.max(0, 1 - over(lf, 4, 40)); const c = k % 3 === 0 ? CLAY : (k % 3 === 1 ? GOLD : GREEN); return (<div key={k} style={{ position: "absolute", left: "50%", top: 500, width: 11, height: 11, borderRadius: "50%", background: c, opacity: o2 * 0.85, transform: `translate(${Math.cos(a) * d}px, ${Math.sin(a) * d}px)`, boxShadow: `0 0 9px ${c}` }} />); })}
      <div style={{ position: "relative", width: 452, opacity: doc, transform: `translateY(${(1 - doc) * -44}px) scale(${0.9 + doc * 0.1})`, marginBottom: 40 }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: 24, background: "#E7DECC", transform: "rotate(3.4deg) translate(17px, 13px)", boxShadow: "0 22px 42px -18px rgba(10,16,34,0.32)" }} />
        <div style={{ position: "absolute", inset: 0, borderRadius: 24, background: "#F1EADA", transform: "rotate(-2.6deg) translate(-13px, 7px)", boxShadow: "0 18px 34px -18px rgba(10,16,34,0.26)" }} />
        <div style={{ position: "relative", borderRadius: 24, background: "#FFFDF8", border: `3px solid ${GOLD}`, boxShadow: "0 38px 68px -18px rgba(10,16,34,0.42), 0 0 64px rgba(231,178,76,0.45)", padding: "28px 34px 32px", textAlign: "left" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <span style={{ padding: "8px 18px", borderRadius: 999, background: CLAY, color: "#fff", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 20, letterSpacing: 1.5, boxShadow: "0 6px 14px rgba(199,84,31,0.4)" }}>FREE PLAYBOOK</span>
            <span style={{ fontSize: 46, filter: "drop-shadow(0 3px 5px rgba(120,70,10,0.35))" }}>🎁</span>
          </div>
          <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 50, lineHeight: 0.95, color: INK, letterSpacing: "-0.02em" }}>The Fable 5 Playbook</div>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 24, color: SLATE, marginTop: 10, marginBottom: 16 }}>9 prompts worth stealing</div>
          <div style={{ height: 3, background: GOLD, borderRadius: 2, opacity: 0.6, marginBottom: 18 }} />
          {items.map((tx, i) => { const ap = over(lf, fr(0.55) + i * 4, 9); return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 15, marginBottom: 14, opacity: ap, transform: `translateX(${(1 - ap) * -18}px)` }}>
              <span style={{ width: 34, height: 34, borderRadius: "50%", background: GREEN, color: "#fff", fontSize: 19, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 4px 10px rgba(63,158,116,0.4)" }}>✓</span>
              <span style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 27, color: INK }}>{tx}</span>
            </div>); })}
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 24, color: CLAY, marginTop: 2, opacity: over(lf, fr(1.6), 8) }}>+ 6 more inside</div>
        </div>
      </div>
      <div style={{ opacity: o, transform: `translateY(${(1 - o) * 24}px)`, textAlign: "center" }}>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 54, color: SLATE, marginBottom: 12 }}>Comment</div>
        <div style={{ position: "relative", display: "inline-block", padding: "17px 54px", borderRadius: 999, background: grad("#E9825C", "#C7541F"), boxShadow: "0 20px 40px -10px rgba(199,84,31,0.7), inset 0 2px 3px rgba(255,255,255,0.35)", transform: `scale(${0.82 + key * 0.18})`, overflow: "hidden" }}>
          <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 90, color: "#fff", letterSpacing: "0.03em" }}>UNLOCK</span>
          <div style={{ position: "absolute", top: 0, bottom: 0, left: `${-40 + shine * 180}%`, width: "34%", background: "linear-gradient(105deg, transparent, rgba(255,255,255,0.55), transparent)", opacity: shine < 0.9 ? 1 : 0 }} />
        </div>
        <div style={{ marginTop: 20, fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 32, color: SLATE }}>and I'll send you all nine</div>
      </div>
    </AbsoluteFill>
  );
};

// ---------------- progress bar + reward ----------------
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
      {(() => { const sp = 0.83; const lit = t >= sp * TOTAL; const pop = lit ? 1 + Math.max(0, 1 - (t - sp * TOTAL) * 3) * 0.4 : 1; return (
        <div style={{ position: "absolute", left: `${sp * 100}%`, top: 9, transform: `translateX(-50%) scale(${pop})`, width: 48, height: 48, borderRadius: "50%", background: lit ? grad("#F0CB63", "#D39A2A") : "#242F45", border: `4px solid ${lit ? "#F6E4A0" : AMBER}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: lit ? `0 0 18px ${GOLD}` : `0 0 12px ${AMBER}77`, zIndex: 122 }}>
          <span style={{ fontSize: 26, lineHeight: 1, color: lit ? "#fff" : AMBER, opacity: lit ? 1 : 0.8 }}>★</span>
        </div>); })()}
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
  if (t >= L[4] - 0.05) return null;
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

export const ClaudeUnlockReel: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 16, 28], [1.0, 1.03, 1.0], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  const scene = (i: number) => frame >= Lf[i] && (i === Lf.length - 1 || frame < Lf[i + 1]);
  return (
    <AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
      <Audio src={staticFile("vo_unlock.wav")} />
      <Audio loop src={staticFile("seo_music.wav")} volume={(ff) => interpolate(ff, [0, fr(1.4), fr(L[4]) - 8, fr(L[4]) + 14, 99999], [0, 0.11, 0.11, 0.08, 0.08], { extrapolateRight: "clamp" })} />
      <Sfx at={0} src="metal_riser.wav" v={0.65} /><Sfx at={0.2} src="boom.wav" v={0.5} />
      <Sfx at={10.4} src="ding.wav" v={0.4} /><Sfx at={16.8} src="whoosh.wav" v={0.4} />
      {L.slice(1).map((tt, i) => <React.Fragment key={i}><Sfx at={tt - 0.08} src="swish.wav" v={0.42} /><Sfx at={tt + 0.28} src="pop.wav" v={0.28} /></React.Fragment>)}
      <Sfx at={28.4} src="thock.wav" v={0.42} /><Sfx at={35.6} src="ding.wav" v={0.34} /><Sfx at={47.8} src="resolve.wav" v={0.45} />
      <Sfx at={L[4]} src="resolve.wav" v={0.5} /><Sfx at={L[4] + 0.3} src="sparkle.wav" v={0.5} /><Sfx at={L[4] + 0.2} src="angelic.wav" v={0.35} dur={3} />

      <Bg />
      <AbsoluteFill style={{ transform: `translateY(90px) scale(${zoom})`, transformOrigin: "50% 44%" }}>
        <AbsoluteFill style={{ opacity: interpolate(frame, [Lf[4] - 4, Lf[4] + 6], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}><Stage /></AbsoluteFill>
        {scene(0) && <Hook lf={frame - Lf[0]} />}
        {scene(1) && <M1 lf={frame - Lf[1]} />}
        {scene(2) && <M2 lf={frame - Lf[2]} />}
        {scene(3) && <M3 lf={frame - Lf[3]} />}
        {scene(4) && <CTA lf={frame - Lf[4]} />}
        <Captions />
      </AbsoluteFill>
      <ProgressBar />
      {/* white flash pop at each scene boundary (retention energy) */}
      {(() => { let fl = 0; for (const b of Lf.slice(1)) { const d = frame - b; if (d >= 0 && d < 7) fl = Math.max(fl, Math.pow(1 - d / 7, 2)); } return fl > 0 ? <AbsoluteFill style={{ background: "#FFF6E6", opacity: fl * 0.5, zIndex: 200, pointerEvents: "none" }} /> : null; })()}
    </AbsoluteFill>
  );
};
