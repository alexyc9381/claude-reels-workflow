import React from "react";
import { AbsoluteFill, useCurrentFrame, Easing } from "remotion";
import { inter } from "./fonts";
import { Bg, Panel, ProgressBar, ScreenHead, Handle, Caption, Mascot, SlopBrick, Bubble, Star, RED, GREEN, CO, GOLD, MONO, grad, hexA, over } from "./SlopKit";

// V3 PULL THE PLUG. Warm late-night home recording studio diorama inside the Panel (panel-local 1012x792).
// FAR: foam wedge wall + waveform monitor + LED glow. MID: desk, interface+VU, edison lamp, plants, mug, cables.
// NEAR: mascot yanks the cord out of the cold grey AI SLOP robot (glitch, sparks, smoke) + grabs the warm mic.
const ROBO = "#8A8F9B", ROBOD = "#565B67", ROBODK = "#33373F", SCR = "#161A22", COOL = "#5FD0E6", WARM = "#FFC98A", WOOD = "#2A2119", WOODT = "#1B140E";
const sd = (n: number) => { const x = Math.sin(n * 91.7 + 19.3) * 43758.5453; return x - Math.floor(x); };

const FoamWall: React.FC = () => (
  <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 370, filter: "brightness(0.82) saturate(0.9)" }}>
    {Array.from({ length: 70 }, (_, k) => { const c = k % 14, r = (k / 14) | 0, v = sd(k) * 0.12; const hi = `rgba(${40 + v * 60},${46 + v * 60},${62 + v * 60},1)`, lo = "rgba(16,19,27,1)";
      return <div key={k} style={{ position: "absolute", left: c * 74, top: r * 74, width: 74, height: 74, background: `conic-gradient(from 45deg at 50% 50%, ${hi} 0deg 90deg, ${lo} 90deg 180deg, ${hi} 180deg 270deg, ${lo} 270deg 360deg)`, boxShadow: "inset 0 0 6px rgba(0,0,0,0.45)" }} />; })}
    <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 88% 30%, ${hexA("#FFB870", 0.16)}, transparent 55%), radial-gradient(circle at 6% 60%, ${hexA(COOL, 0.1)}, transparent 55%)` }} />
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 60, background: "linear-gradient(180deg, transparent, rgba(0,0,0,0.5))" }} />
  </div>
);

const Knob: React.FC<{ x: number; y: number; a: number; g?: string }> = ({ x, y, a, g = GOLD }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 32, height: 32, borderRadius: "50%", background: grad("#4A4F5A", "#23272F"), border: "2px solid #1B1E25", boxShadow: `0 2px 5px rgba(0,0,0,0.5), 0 0 8px ${hexA(g, 0.35)}` }}>
    <div style={{ position: "absolute", left: 14, top: 3, width: 4, height: 12, borderRadius: 2, background: g, transformOrigin: "50% 13px", transform: `rotate(${a}deg)` }} />
  </div>
);

const Interface: React.FC<{ f: number }> = ({ f }) => (
  <div style={{ position: "absolute", left: 636, top: 566, width: 286, height: 108, borderRadius: 14, background: grad("#20242C", "#14171D"), border: "2px solid #2E333C", boxShadow: "0 16px 26px -10px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05)", transform: "perspective(600px) rotateX(20deg)", transformOrigin: "50% 100%" }}>
    <div style={{ position: "absolute", left: 14, top: 9, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 12, letterSpacing: 2, color: hexA(WARM, 0.75) }}>STUDIO 01</div>
    <div style={{ position: "absolute", right: 12, top: 8, width: 9, height: 9, borderRadius: "50%", background: RED, boxShadow: `0 0 7px ${RED}`, opacity: 0.55 + 0.45 * Math.abs(Math.sin(f / 5)) }} />
    <Knob x={16} y={34} a={-60 + Math.sin(f / 40) * 20} g={CO} /><Knob x={58} y={34} a={30} g={GOLD} /><Knob x={100} y={34} a={110 + Math.sin(f / 33) * 14} g={GREEN} />
    {[0, 1].map((ch) => (<div key={ch} style={{ position: "absolute", left: 156, top: 30 + ch * 34, display: "flex", gap: 3 }}>
      {Array.from({ length: 11 }, (_, i) => { const on = i < 4 + Math.abs(Math.sin(f / 6 + ch * 1.3)) * 6, col = i > 8 ? RED : i > 6 ? GOLD : GREEN;
        return <div key={i} style={{ width: 8, height: 16, borderRadius: 2, background: on ? col : "#24282F", boxShadow: on ? `0 0 5px ${hexA(col, 0.7)}` : "none" }} />; })}
    </div>))}
  </div>
);

const WaveMonitor: React.FC<{ f: number }> = ({ f }) => { const t = 47 + ((f / 4) | 0);
  return (
    <div style={{ position: "absolute", left: 372, top: 92, width: 300, height: 224 }}>
      <div style={{ position: "absolute", left: 138, top: 172, width: 24, height: 44, background: grad("#2A2E36", "#181B21") }} />
      <div style={{ position: "absolute", left: 108, top: 210, width: 84, height: 12, borderRadius: 6, background: "#1B1E24" }} />
      <div style={{ position: "absolute", left: 0, top: 0, width: 300, height: 176, borderRadius: 14, background: "#05070B", border: "6px solid #23272F", boxShadow: `0 14px 30px -8px rgba(0,0,0,0.7), 0 0 34px ${hexA(CO, 0.18)}`, overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 12, top: 10, display: "flex", alignItems: "center", gap: 7 }}>
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: RED, boxShadow: `0 0 8px ${RED}`, opacity: 0.4 + 0.6 * Math.abs(Math.sin(f / 5)) }} />
          <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 14, color: "#fff", letterSpacing: 1 }}>REC</span>
          <span style={{ fontFamily: MONO, fontSize: 14, color: hexA(CO, 0.95) }}>0:{String(Math.min(90, t)).padStart(2, "0")}</span>
        </div>
        <svg width={276} height={110} style={{ position: "absolute", left: 6, top: 44 }}>
          <line x1={0} y1={55} x2={276} y2={55} stroke={hexA(CO, 0.25)} strokeWidth={1} />
          {Array.from({ length: 46 }, (_, i) => { const h = 6 + Math.abs(Math.sin(i * 0.7 + f / 4)) * 46 * (0.4 + 0.6 * Math.abs(Math.sin(i * 0.35)));
            return <rect key={i} x={i * 6} y={55 - h / 2} width={3} height={h} rx={1.5} fill={CO} opacity={0.55 + 0.45 * Math.abs(Math.sin(i + f / 7))} />; })}
        </svg>
      </div>
    </div>
  );
};

const Lamp: React.FC<{ f: number }> = ({ f }) => { const gl = 0.82 + 0.18 * Math.abs(Math.sin(f / 9));
  return (
    <div style={{ position: "absolute", left: 812, top: 150, width: 200, height: 470 }}>
      <div style={{ position: "absolute", left: 150, top: 300, width: 14, height: 150, background: grad("#3A3027", "#241C15"), borderRadius: 6 }} />
      <div style={{ position: "absolute", left: 62, top: 150, width: 110, height: 12, background: grad("#3A3027", "#241C15"), borderRadius: 6, transform: "rotate(34deg)", transformOrigin: "100% 50%" }} />
      <div style={{ position: "absolute", left: 20, top: 92, width: 180, height: 180, borderRadius: "50%", background: `radial-gradient(circle, ${hexA(WARM, 0.55 * gl)}, transparent 66%)`, filter: "blur(6px)" }} />
      <div style={{ position: "absolute", left: 70, top: 138, width: 56, height: 72, borderRadius: "44% 44% 46% 46% / 60% 60% 40% 40%", background: `radial-gradient(circle at 50% 40%, #FFF2C8, ${WARM} 55%, #E79A3F 90%)`, boxShadow: `0 0 40px ${hexA(WARM, 0.9 * gl)}`, opacity: gl }}>
        <div style={{ position: "absolute", left: 24, top: 16, width: 8, height: 34, borderRadius: 4, background: "#FFB24D", boxShadow: "0 0 6px #FFC98A" }} />
      </div>
      <div style={{ position: "absolute", left: 84, top: 118, width: 28, height: 22, borderRadius: "6px 6px 0 0", background: "#2A2119" }} />
    </div>
  );
};

const Plant: React.FC<{ x: number; y: number; s?: number; flip?: boolean }> = ({ x, y, s = 1, flip }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 150 * s, height: 210 * s, transform: flip ? "scaleX(-1)" : undefined }}>
    <svg width={150 * s} height={210 * s} viewBox="0 0 150 210">
      {([["#2F6B45", -46], ["#357A4F", -20], ["#2C6340", 6], ["#3C875A", 30], ["#295C3A", 52]] as [string, number][]).map(([c, a], i) => <ellipse key={i} cx={75} cy={80} rx={20} ry={76} fill={c} transform={`rotate(${a} 75 150)`} />)}
      <path d="M42 150 h66 l-10 54 h-46 Z" fill="#7A4A32" /><path d="M42 150 h66 l-3 16 h-60 Z" fill="#5E3826" /><ellipse cx={75} cy={152} rx={33} ry={7} fill="#4A2C1C" />
    </svg>
  </div>
);

const Mic: React.FC = () => (
  <div style={{ position: "absolute", left: 600, top: 40, width: 340, height: 470, filter: "drop-shadow(0 14px 18px rgba(0,0,0,0.5))" }}>
    <svg width={340} height={470} viewBox="0 0 340 470">
      <line x1={330} y1={8} x2={210} y2={120} stroke="#20242B" strokeWidth={14} strokeLinecap="round" /><line x1={210} y1={120} x2={150} y2={210} stroke="#20242B" strokeWidth={14} strokeLinecap="round" />
      <circle cx={210} cy={120} r={11} fill="#3A404A" stroke="#14171C" strokeWidth={3} />
      <ellipse cx={110} cy={252} rx={74} ry={92} fill="none" stroke="#2C313A" strokeWidth={9} />
      {([[-1, 0.5], [-1, -0.5], [1, 0.5], [1, -0.5]] as [number, number][]).map(([sx, sy], i) => <line key={i} x1={110 + sx * 70} y1={252 + sy * 60} x2={110} y2={252 + sy * 34} stroke="#4A5058" strokeWidth={3} />)}
      <rect x={78} y={196} width={64} height={132} rx={26} fill="url(#micg)" stroke="#1A1D22" strokeWidth={3} />
      {Array.from({ length: 7 }, (_, i) => <line key={i} x1={84} y1={210 + i * 12} x2={136} y2={210 + i * 12} stroke="#3A404A" strokeWidth={2} />)}
      <rect x={78} y={196} width={20} height={132} rx={10} fill="rgba(255,255,255,0.18)" /><rect x={124} y={196} width={16} height={132} rx={8} fill={hexA(WARM, 0.35)} />
      <defs><linearGradient id="micg" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#C7CDD6" /><stop offset="0.5" stopColor="#8A909B" /><stop offset="1" stopColor="#565C66" /></linearGradient></defs>
      <line x1={40} y1={300} x2={78} y2={262} stroke="#2C313A" strokeWidth={7} strokeLinecap="round" />
      <ellipse cx={26} cy={300} rx={16} ry={54} fill="rgba(180,190,205,0.18)" stroke="rgba(200,210,225,0.5)" strokeWidth={3} /><ellipse cx={26} cy={300} rx={7} ry={44} fill="none" stroke="rgba(200,210,225,0.25)" strokeWidth={2} />
    </svg>
  </div>
);

export const HookT3: React.FC = () => {
  const f = useCurrentFrame();
  const pull = over(f, 20, 12, Easing.out(Easing.back(2)));
  const gap = pull * 120;
  const die = over(f, 30, 16, Easing.out(Easing.cubic));
  const flick = f > 28 && f < 46 ? (sd(f) > 0.4 ? 1 : 0.28) : 1;
  const alive = 1 - die;
  const spark = f - 30;
  const smoke = over(f, 34, 34);
  const bub = over(f, 46, 12, Easing.out(Easing.back(1.6)));
  const iX = 322, iY = 452, hX = 372, hY = 446;
  return (
    <AbsoluteFill>
      <Bg /><Handle />
      <Panel glow={hexA(CO, 0.3)} top={430} height={860} pushIn>
        <FoamWall />
        <div style={{ position: "absolute", left: 0, right: 0, top: 300, bottom: 0, background: grad("#241D18", "#14100C") }} />
        <div style={{ position: "absolute", left: 40, right: 40, top: 356, height: 10, borderRadius: 6, background: `linear-gradient(90deg, ${hexA(COOL, 0.6)}, ${hexA(CO, 0.55)}, ${hexA(WARM, 0.6)})`, filter: "blur(3px)", opacity: 0.4 + 0.35 * Math.abs(Math.sin(f / 12)) }} />
        <WaveMonitor f={f} />
        <div style={{ position: "absolute", left: -20, right: -20, top: 560, height: 60, background: grad("#33291F", WOOD), boxShadow: "0 -2px 0 rgba(255,220,170,0.08), 0 14px 30px rgba(0,0,0,0.5)" }} />
        <div style={{ position: "absolute", left: -20, right: -20, top: 620, height: 172, background: grad(WOOD, WOODT) }} />
        <div style={{ position: "absolute", left: 150, top: 690, width: 720, height: 96, borderRadius: "50%", background: `radial-gradient(ellipse, ${hexA("#7A3B2E", 0.6)}, ${hexA("#4A241C", 0.5)} 70%, transparent 74%)`, boxShadow: "inset 0 0 40px rgba(0,0,0,0.4)" }} />
        <Lamp f={f} /><Plant x={-34} y={392} s={1.05} /><Plant x={906} y={410} s={0.9} flip /><Interface f={f} />
        <div style={{ position: "absolute", left: 560, top: 566, width: 52, height: 50 }}>
          <div style={{ position: "absolute", left: 0, top: 8, width: 46, height: 42, borderRadius: "6px 6px 10px 10px", background: grad("#D8CDBB", "#B7A88F") }} />
          <div style={{ position: "absolute", left: 42, top: 16, width: 18, height: 20, borderRadius: "0 10px 10px 0", border: "5px solid #C7BAA3", borderLeft: "none" }} />
          <div style={{ position: "absolute", left: 12, top: -2, width: 6, height: 14, borderRadius: 3, background: hexA("#fff", 0.18), filter: "blur(2px)", opacity: 0.5 + 0.4 * Math.abs(Math.sin(f / 10)) }} />
        </div>
        <svg width={1012} height={230} style={{ position: "absolute", left: 0, top: 560 }}>
          <path d="M120 6 C 150 120, 90 150, 140 226" fill="none" stroke="#15120E" strokeWidth={7} strokeLinecap="round" opacity={0.8} />
          <path d="M700 4 C 760 90, 680 150, 730 226" fill="none" stroke="#15120E" strokeWidth={6} strokeLinecap="round" opacity={0.7} />
        </svg>
        <div style={{ position: "absolute", left: 60, top: 300, width: 268, height: 336, filter: "drop-shadow(0 16px 20px rgba(0,0,0,0.55))" }}>
          <div style={{ position: "absolute", left: -18, top: 20, width: 60, height: 300, borderRadius: 30, background: `radial-gradient(ellipse, ${hexA(COOL, 0.35 * alive + 0.05)}, transparent 70%)`, filter: "blur(8px)" }} />
          <div style={{ position: "absolute", left: 10, top: 40, width: 244, height: 292, borderRadius: 22, background: grad(ROBO, ROBOD), border: `3px solid ${ROBODK}`, boxShadow: "inset 0 2px 0 rgba(255,255,255,0.12)" }} />
          <div style={{ position: "absolute", left: 66, top: 8, width: 5, height: 38, background: ROBOD }} />
          <div style={{ position: "absolute", left: 62, top: -2, width: 13, height: 13, borderRadius: "50%", background: COOL, boxShadow: `0 0 8px ${COOL}`, opacity: (0.4 + 0.6 * Math.abs(Math.sin(f / 4))) * alive }} />
          <div style={{ position: "absolute", left: 190, top: 12, width: 5, height: 34, background: ROBOD }} />
          <div style={{ position: "absolute", left: 186, top: 2, width: 13, height: 13, borderRadius: "50%", background: COOL, boxShadow: `0 0 8px ${COOL}`, opacity: (0.4 + 0.6 * Math.abs(Math.sin(f / 4 + 1))) * alive }} />
          <div style={{ position: "absolute", left: 30, top: 62, width: 204, height: 176, borderRadius: 12, background: SCR, border: `2px solid ${ROBODK}`, overflow: "hidden", opacity: 0.35 + 0.65 * alive * flick }}>
            <div style={{ position: "absolute", left: 12, top: 10, fontFamily: MONO, fontSize: 15, color: hexA(COOL, alive) }}>{die > 0.5 ? "generat" : "generating..."}</div>
            <div style={{ position: "absolute", left: 12, top: 40, transform: `translateX(${die * -30}px)` }}><SlopBrick x={0} y={0} w={176} lines={6} c="#6E727C" o={alive} /></div>
            {die > 0.15 && die < 0.9 && <div style={{ position: "absolute", left: 0, top: 40 + sd(f) * 100, width: "100%", height: 8 + sd(f + 3) * 10, background: hexA(COOL, 0.5), transform: `translateX(${(sd(f) - 0.5) * 40}px)` }} />}
            {die > 0.85 && <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.72)" }} />}
          </div>
          <div style={{ position: "absolute", left: 30, top: 250, width: 204, height: 30, borderRadius: 8, background: ROBODK, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 17, letterSpacing: 3, color: hexA("#C7CBD3", 0.5 + 0.5 * alive) }}>AI SLOP</div>
          <div style={{ position: "absolute", left: 244, top: 140, width: 22, height: 34, borderRadius: 4, background: ROBODK, border: "2px solid #23262D" }} />
        </div>
        <svg width={1012} height={792} style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none" }}>
          <path d={`M ${iX + gap} ${iY} C ${iX + gap + 20} ${iY + 40}, ${hX - 30} ${hY + 40}, ${hX} ${hY}`} fill="none" stroke="#14120F" strokeWidth={9} strokeLinecap="round" />
          <g transform={`translate(${iX + gap - 6} ${iY - 12})`}><rect x={0} y={0} width={26} height={26} rx={5} fill="#1C1A16" /><rect x={-8} y={4} width={9} height={5} rx={2} fill="#C9A24A" /><rect x={-8} y={16} width={9} height={5} rx={2} fill="#C9A24A" /></g>
        </svg>
        {die > 0.02 && spark < 26 && (
          <svg width={120} height={120} style={{ position: "absolute", left: iX - 40, top: iY - 54, pointerEvents: "none" }}>
            {Array.from({ length: 12 }, (_, i) => { const a = (i / 12) * Math.PI * 2 + i, d = Math.min(48, spark * 3.4 + (i % 4) * 5), x = 46 + Math.cos(a) * d, y = 54 + Math.sin(a) * d;
              return <line key={i} x1={46} y1={54} x2={x} y2={y} stroke={i % 2 ? "#FFE08A" : "#FFF4D2"} strokeWidth={3} strokeLinecap="round" opacity={Math.max(0, 1 - spark / 22)} />; })}
            <circle cx={46} cy={54} r={8 * Math.max(0, 1 - spark / 10)} fill="#FFF4D2" opacity={Math.max(0, 1 - spark / 10)} />
          </svg>
        )}
        {smoke > 0.01 && Array.from({ length: 5 }, (_, i) => <div key={i} style={{ position: "absolute", left: 190 + i * 14 - smoke * 10, top: 360 - smoke * (90 + i * 22), width: 30 + smoke * (40 + i * 8), height: 30 + smoke * (40 + i * 8), borderRadius: "50%", background: hexA("#B7BAC2", 0.28 * (1 - smoke)), filter: "blur(7px)", pointerEvents: "none" }} />)}
        <div style={{ position: "absolute", left: 356, top: 300, filter: "drop-shadow(0 16px 20px rgba(0,0,0,0.5))" }}><Mascot lf={f} size={340} cheer={0.36} gaze={-1} nodSpeed={8} /></div>
        <Mic />
        <div style={{ position: "absolute", left: 560, top: 320, width: 260, height: 300, borderRadius: "50%", background: `radial-gradient(circle at 70% 40%, ${hexA(WARM, 0.16)}, transparent 62%)`, pointerEvents: "none" }} />
        <div style={{ opacity: bub, transform: `translateY(${(1 - bub) * 18}px) scale(${0.9 + bub * 0.1})` }}><Bubble x={470} y={220} text="finally, me talking..." s={1.08} c="#FFF3E6" rot={-4} /></div>
        <Star x={640} y={250} s={0.95} o={bub * (0.6 + 0.4 * Math.abs(Math.sin(f / 6)))} />
        <Star x={520} y={330} s={0.6} o={bub * (0.5 + 0.5 * Math.abs(Math.sin(f / 5 + 1)))} c={GOLD} />
      </Panel>
      <Caption words={["cut", "the", "AI", "sound."]} hot={2} top={1340} />
    </AbsoluteFill>
  );
};