import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing, Audio, Sequence, staticFile, Img } from "remotion";
import { fraunces, inter } from "./fonts";
import words from "./data/words_mint.json";

const CREAM = "#ECE9E2", INK = "#1A1813", SLATE = "#3A5C84", CLAY = "#D2724E", AMBER = "#CF9544", GOLD = "#E7B24C", GREEN = "#3F9E74", MUTE = "#9A968B", RED = "#C44A3A";
const TERM = "#0E1626", TERM2 = "#0A1120", PAPER = "#F7F3EA", META = "#0866FF", METALO = "#0A5AE0";
const mono = "ui-monospace,'SF Mono',Menlo,monospace";
const FPS = 30;
const fr = (s: number) => Math.round(s * FPS);
const grad = (a: string, b: string) => `linear-gradient(158deg, ${a} 0%, ${b} 100%)`;
const NAVYSH = "0 34px 66px -22px rgba(18,28,58,0.55), 0 10px 24px rgba(18,28,58,0.30)";

// scene starts (sec): hook, reveal, noban, rehook, before, commands, safety, future, cta
const L = [0.0, 5.75, 12.61, 15.55, 21.45, 27.4];
const Lf = L.map(fr);
const CUT = 28.14;
const CLOCK_START = CUT - 3.6;
const BURST = CUT + 1;

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

const Pill: React.FC<{ text: string; x: number; y: number; o?: number }> = ({ text, x, y, o = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, opacity: o, padding: "7px 16px", borderRadius: 999, background: "rgba(20,30,52,0.9)", border: "1.5px solid rgba(150,170,215,0.4)", fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 22, color: "rgba(190,205,235,0.92)", display: "flex", gap: 8, alignItems: "center", boxShadow: "0 8px 20px -8px rgba(0,0,0,0.6)", whiteSpace: "nowrap" }}>
    <span style={{ fontSize: 18 }}>◍</span>{text}
  </div>
);

const Chip: React.FC<{ text: string; bg: string; bd: string; fg: string; size?: number }> = ({ text, bg, bd, fg, size = 40 }) => (
  <div style={{ padding: `${size * 0.34}px ${size * 0.7}px`, borderRadius: 18, background: bg, border: `3px solid ${bd}`, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: size, color: fg, boxShadow: `0 18px 40px -14px rgba(10,16,34,0.7)`, whiteSpace: "nowrap", letterSpacing: "-0.01em" }}>{text}</div>
);

// pixel Claude mascot (canonical critter) + costumes
const Mascot: React.FC<{ lf: number; size?: number; gaze?: number; nodAmp?: number; nodSpeed?: number; shock?: number; cheer?: number; stern?: number; glasses?: number; brainHat?: number; sherlock?: number; wizard?: number; judge?: number; cop?: number; beard?: number; zuck?: number; zuckChain?: number; zuckCurly?: number; wang?: number; bikini?: number; prof?: number; girl?: number; suit?: number; dino?: number; constr?: number; chef?: number }> = ({ lf, size = 250, gaze = 0, nodAmp = 3.5, nodSpeed = 10, shock = 0, cheer = 0, stern = 0, glasses = 0, brainHat = 0, sherlock = 0, wizard = 0, judge = 0, cop = 0, beard = 0, zuck = 0, zuckChain = 0, zuckCurly = 0, wang = 0, bikini = 0, prof = 0, girl = 0, suit = 0, dino = 0, constr = 0, chef = 0 }) => {
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
      <svg viewBox="0 0 200 200" width={size} height={size} shapeRendering="crispEdges" style={{ overflow: "visible" }}>
        <rect x={8 - cheer * 4} y={armY} width={26} height={26} fill={C} transform={cheer > 0.2 ? `rotate(${-cheer * 28} 21 ${armY + 13})` : undefined} />
        <rect x={166 + cheer * 4} y={armY} width={26} height={26} fill={C} transform={cheer > 0.2 ? `rotate(${cheer * 28} 179 ${armY + 13})` : undefined} />
        <rect x={34} y={44} width={132} height={102} fill={C} />
        <rect x={34} y={44} width={132} height={10} fill="rgba(255,255,255,0.16)" />
        {/* white wise beard */}
        {beard > 0 && <>
          <rect x={44} y={98} width={112} height={26} fill="#F4EEE2" />
          <rect x={56} y={122} width={88} height={20} fill="#F4EEE2" />
          <rect x={74} y={140} width={52} height={16} fill="#F4EEE2" />
          <rect x={90} y={154} width={20} height={12} fill="#EDE6D6" />
        </>}
        {/* police uniform: bright blue jacket + gold buttons + badge */}
        {cop > 0 && <>
          <rect x={34} y={106} width={132} height={40} fill="#3E6FBF" />
          <rect x={34} y={106} width={132} height={6} fill="#2E55A3" />
          <rect x={96} y={116} width={9} height={9} fill="#E7B24C" />
          <rect x={96} y={130} width={9} height={9} fill="#E7B24C" />
          <rect x={48} y={114} width={13} height={13} fill="#E7B24C" />
          <rect x={51} y={111} width={7} height={4} fill="#E7B24C" />
        </>}
        {/* zuck tee + pale wash + optional gold chain */}
        {zuck > 0 && <>
          <rect x={34} y={44} width={132} height={102} fill="rgba(226,224,220,0.14)" />
          <rect x={34} y={106} width={132} height={40} fill="#B7BAC0" />
          <rect x={34} y={106} width={132} height={6} fill="#9DA1A8" />
          <rect x={34} y={140} width={132} height={6} fill="#A6AAB1" />
          <rect x={80} y={106} width={40} height={6} fill="#8C9098" />
          <rect x={86} y={112} width={28} height={5} fill="#8C9098" />
          <rect x={94} y={117} width={12} height={4} fill="#8C9098" />
        </>}
        {zuckChain > 0 && <>
          <rect x={78} y={112} width={8} height={4} fill="#E7B24C" />
          <rect x={84} y={116} width={8} height={4} fill="#E7B24C" />
          <rect x={92} y={119} width={16} height={4} fill="#E7B24C" />
          <rect x={106} y={116} width={8} height={4} fill="#E7B24C" />
          <rect x={114} y={112} width={8} height={4} fill="#E7B24C" />
          <rect x={98} y={121} width={4} height={4} fill="#F0CB63" />
        </>}
        {/* alexandr wang: black crew tee */}
        {wang > 0 && <>
          <rect x={34} y={44} width={132} height={102} fill="rgba(226,224,220,0.10)" />
          <rect x={34} y={106} width={132} height={40} fill="#2A2A32" />
          <rect x={34} y={106} width={132} height={6} fill="#1E1E24" />
          <rect x={34} y={140} width={132} height={6} fill="#232329" />
          <rect x={80} y={106} width={40} height={6} fill="#3A3A44" />
          <rect x={86} y={112} width={28} height={5} fill="#3A3A44" />
          <rect x={94} y={117} width={12} height={4} fill="#3A3A44" />
        </>}
        {/* bikini */}
        {bikini > 0 && <>
          <rect x={44} y={110} width={112} height={5} fill="#E23B86" />
          <rect x={44} y={114} width={112} height={13} fill="#FF4FA3" />
          <polygon points="60,114 80,114 70,130" fill="#FF4FA3" /><polygon points="120,114 140,114 130,130" fill="#FF4FA3" />
          <rect x={80} y={138} width={40} height={12} fill="#FF4FA3" />
        </>}
        {/* professor tweed blazer + collar */}
        {prof > 0 && <>
          <rect x={34} y={106} width={132} height={40} fill="#6E5A3C" />
          <rect x={34} y={106} width={132} height={6} fill="#57462A" />
          <rect x={92} y={106} width={16} height={40} fill="#EDE6D6" />
          <rect x={70} y={110} width={10} height={26} fill="#5A4A30" transform="rotate(6 75 123)" />
          <rect x={120} y={110} width={10} height={26} fill="#5A4A30" transform="rotate(-6 125 123)" />
          <rect x={94} y={112} width={12} height={9} fill="#8B2E2E" />
        </>}
        {/* business suit + tie */}
        {suit > 0 && <>
          <rect x={34} y={106} width={132} height={40} fill="#26324A" />
          <rect x={34} y={106} width={132} height={6} fill="#1A2438" />
          <rect x={88} y={106} width={24} height={40} fill="#F4F1EA" />
          <polygon points="88,106 100,124 112,106" fill="#26324A" />
          <rect x={95} y={116} width={10} height={28} fill="#8B2E2E" /><polygon points="95,116 100,110 105,116" fill="#8B2E2E" />
        </>}
        {/* dinosaur costume: green belly + tail */}
        {dino > 0 && <>
          <rect x={34} y={106} width={132} height={40} fill="#5FA85A" />
          <rect x={34} y={106} width={132} height={6} fill="#4A8C46" />
          <rect x={60} y={130} width={80} height={10} fill="#7CC276" />
          <polygon points="166,116 208,106 208,146 166,142" fill="#5FA85A" /><polygon points="188,108 196,102 196,110" fill="#3E7A3A" /><polygon points="198,110 206,105 206,113" fill="#3E7A3A" />
        </>}
        {/* construction hi-vis vest */}
        {constr > 0 && <>
          <rect x={34} y={106} width={132} height={40} fill="#E4622B" />
          <rect x={44} y={113} width={112} height={5} fill="#F4F1EA" /><rect x={44} y={134} width={112} height={5} fill="#F4F1EA" />
          <rect x={92} y={106} width={16} height={40} fill="#C94E1C" />
        </>}
        {/* chef jacket */}
        {chef > 0 && <>
          <rect x={34} y={106} width={132} height={40} fill="#F4F1EA" />
          <rect x={34} y={106} width={132} height={6} fill="#E2DDD0" />
          <rect x={92} y={106} width={8} height={40} fill="#D8D2C4" />
          <rect x={70} y={116} width={7} height={7} fill="#3A4456" /><rect x={70} y={130} width={7} height={7} fill="#3A4456" /><rect x={123} y={116} width={7} height={7} fill="#3A4456" /><rect x={123} y={130} width={7} height={7} fill="#3A4456" />
        </>}
        {/* wizard robe */}
        {wizard > 0 && <>
          <rect x={34} y={102} width={132} height={44} fill="#4B3E8E" />
          <rect x={34} y={102} width={132} height={6} fill="#3A2F73" />
          <rect x={70} y={116} width={9} height={9} fill="#E7B24C" />
          <rect x={120} y={124} width={9} height={9} fill="#E7B24C" />
          <rect x={52} y={128} width={8} height={8} fill="#E7B24C" />
        </>}
        {/* judge robe + collar + gavel */}
        {judge > 0 && <>
          <rect x={34} y={100} width={132} height={46} fill="#2A2438" />
          <rect x={34} y={100} width={132} height={6} fill="#1D1930" />
          <rect x={84} y={100} width={14} height={18} fill="#F4EEE2" />
          <rect x={102} y={100} width={14} height={18} fill="#F4EEE2" />
          <rect x={176} y={armY - 30} width={9} height={44} fill="#8A6844" transform={`rotate(24 180 ${armY - 8})`} />
          <rect x={168} y={armY - 44} width={30} height={17} fill="#6E5236" transform={`rotate(24 183 ${armY - 36})`} />
        </>}
        {/* sherlock cape */}
        {sherlock > 0 && <>
          <rect x={30} y={98} width={140} height={26} fill="#9C7A50" />
          <rect x={30} y={120} width={140} height={5} fill="#7A5A3C" />
          <rect x={64} y={104} width={8} height={8} fill="#7A5A3C" /><rect x={126} y={106} width={8} height={8} fill="#7A5A3C" />
        </>}
        <rect x={52} y={146 - legLift(0)} width={17} height={38} fill={C} />
        <rect x={77} y={146 - legLift(1)} width={17} height={38} fill={C} />
        <rect x={124} y={146 - legLift(0)} width={17} height={38} fill={C} />
        <rect x={149} y={146 - legLift(1)} width={17} height={38} fill={C} />
        {stern > 0.3 && <><rect x={68 + gaze} y={64} width={20} height={5} fill="#151312" transform={`rotate(12 78 66)`} /><rect x={112 + gaze} y={64} width={20} height={5} fill="#151312" transform={`rotate(-12 122 66)`} /></>}
        <rect x={70 + gaze - (shock > 0.4 ? 2 : 0)} y={70 + (26 - eyeH) / 2} width={15 + (shock > 0.4 ? 4 : 0)} height={eyeH} fill="#151312" />
        <rect x={116 + gaze - (shock > 0.4 ? 2 : 0)} y={70 + (26 - eyeH) / 2} width={15 + (shock > 0.4 ? 4 : 0)} height={eyeH} fill="#151312" />
        {shock > 0.4 && <rect x={93 + gaze} y={116} width={16} height={14} fill="#151312" />}
        {/* smart glasses */}
        {glasses > 0 && <>
          <rect x={62} y={64} width={32} height={28} fill="none" stroke="#151312" strokeWidth={5} />
          <rect x={108} y={64} width={32} height={28} fill="none" stroke="#151312" strokeWidth={5} />
          <rect x={94} y={74} width={14} height={5} fill="#151312" />
          <rect x={34} y={72} width={28} height={5} fill="#151312" />
          <rect x={140} y={72} width={26} height={5} fill="#151312" />
          <rect x={66} y={68} width={10} height={6} fill="rgba(255,255,255,0.45)" />
          <rect x={112} y={68} width={10} height={6} fill="rgba(255,255,255,0.45)" />
        </>}
        {/* extra brain on the head */}
        {brainHat > 0 && <>
          <rect x={58} y={20} width={84} height={26} fill="#E8A2B8" />
          <rect x={66} y={10} width={22} height={16} fill="#E8A2B8" />
          <rect x={92} y={4} width={24} height={20} fill="#E8A2B8" />
          <rect x={118} y={10} width={20} height={16} fill="#E8A2B8" />
          <rect x={72} y={18} width={56} height={4} fill="#C97F97" />
          <rect x={96} y={26} width={4} height={16} fill="#C97F97" />
        </>}
        {/* sherlock deerstalker */}
        {sherlock > 0 && <>
          <rect x={26} y={32} width={148} height={10} fill="#8A6844" />
          <rect x={44} y={10} width={112} height={24} fill="#9C7A50" />
          <rect x={88} y={2} width={24} height={10} fill="#8A6844" />
          <rect x={60} y={16} width={8} height={8} fill="#7A5A3C" /><rect x={100} y={20} width={8} height={8} fill="#7A5A3C" /><rect x={132} y={14} width={8} height={8} fill="#7A5A3C" />
        </>}
        {/* judge wig: white curls */}
        {judge > 0 && <>
          <rect x={40} y={24} width={120} height={20} fill="#F4EEE2" />
          <rect x={30} y={40} width={22} height={40} fill="#F4EEE2" />
          <rect x={148} y={40} width={22} height={40} fill="#F4EEE2" />
          <rect x={30} y={56} width={22} height={8} fill="#D9D2C2" />
          <rect x={148} y={56} width={22} height={8} fill="#D9D2C2" />
          <rect x={40} y={36} width={120} height={5} fill="#D9D2C2" />
        </>}
        {/* police cap: blue crown + band + visor + gold badge */}
        {cop > 0 && <>
          <rect x={46} y={14} width={108} height={24} fill="#3E6FBF" />
          <rect x={42} y={32} width={116} height={9} fill="#2E55A3" />
          <rect x={30} y={40} width={140} height={9} fill="#28497F" />
          <rect x={92} y={18} width={16} height={13} fill="#E7B24C" />
        </>}
        {/* zuck hair: signature straight fringe */}
        {zuck > 0 && <>
          <rect x={30} y={40} width={140} height={14} fill="#5A4632" />
          <rect x={30} y={40} width={140} height={5} fill="#4A3927" />
          <rect x={30} y={54} width={14} height={16} fill="#5A4632" />
          <rect x={156} y={54} width={14} height={16} fill="#5A4632" />
          {zuckCurly > 0 ? <>
            <rect x={40} y={54} width={120} height={10} fill="#5A4632" />
            <rect x={44} y={64} width={16} height={6} fill="#5A4632" />
            <rect x={68} y={64} width={16} height={4} fill="#5A4632" />
            <rect x={92} y={64} width={16} height={6} fill="#5A4632" />
            <rect x={116} y={64} width={16} height={4} fill="#5A4632" />
            <rect x={140} y={64} width={16} height={6} fill="#5A4632" />
          </> : <>
            <rect x={40} y={54} width={120} height={12} fill="#5A4632" />
            <rect x={58} y={66} width={18} height={3} fill="#5A4632" />
            <rect x={124} y={66} width={18} height={3} fill="#5A4632" />
          </>}
          <rect x={96} y={54} width={8} height={6} fill="#4A3927" />
          <rect x={46} y={56} width={40} height={3} fill="#6B5540" />
        </>}
        {/* alexandr wang: short black hair */}
        {wang > 0 && <>
          <rect x={32} y={38} width={136} height={14} fill="#1C1C22" />
          <rect x={32} y={38} width={136} height={5} fill="#0F0F14" />
          <rect x={32} y={52} width={12} height={15} fill="#1C1C22" />
          <rect x={156} y={52} width={12} height={15} fill="#1C1C22" />
          <rect x={44} y={52} width={38} height={9} fill="#1C1C22" />
          <rect x={82} y={52} width={46} height={7} fill="#1C1C22" />
          <rect x={128} y={52} width={30} height={9} fill="#1C1C22" />
          <rect x={58} y={61} width={22} height={4} fill="#1C1C22" />
          <rect x={102} y={59} width={16} height={4} fill="#1C1C22" />
          <rect x={88} y={50} width={22} height={4} fill="#2C2C36" />
        </>}
        {/* girl long hair */}
        {girl > 0 && <>
          <rect x={20} y={46} width={16} height={82} rx={6} fill="#6E4A2C" />
          <rect x={164} y={46} width={16} height={82} rx={6} fill="#6E4A2C" />
          <rect x={20} y={112} width={18} height={20} rx={8} fill="#5F4026" />
          <rect x={162} y={112} width={18} height={20} rx={8} fill="#5F4026" />
          <rect x={30} y={36} width={140} height={16} fill="#6E4A2C" />
          <rect x={30} y={36} width={140} height={5} fill="#5A3D24" />
          <rect x={44} y={50} width={112} height={7} fill="#6E4A2C" />
        </>}
        {/* dino head spikes */}
        {dino > 0 && <>
          <polygon points="66,44 78,24 90,44" fill="#3E7A3A" /><polygon points="90,44 102,20 114,44" fill="#3E7A3A" /><polygon points="114,44 126,24 138,44" fill="#3E7A3A" />
        </>}
        {/* construction hardhat */}
        {constr > 0 && <>
          <polygon points="100,10 62,34 138,34" fill="#F5CE55" />
          <rect x={44} y={30} width={112} height={12} fill="#F5CE55" />
          <rect x={30} y={40} width={140} height={10} fill="#D9A626" />
          <rect x={94} y={16} width={12} height={16} fill="#E9BE3F" />
        </>}
        {/* chef toque */}
        {chef > 0 && <>
          <rect x={54} y={28} width={92} height={20} fill="#F4F1EA" />
          <rect x={56} y={6} width={26} height={26} rx={10} fill="#F4F1EA" /><rect x={86} y={2} width={28} height={30} rx={12} fill="#F8F5EF" /><rect x={118} y={6} width={26} height={26} rx={10} fill="#F4F1EA" />
          <rect x={54} y={40} width={92} height={8} fill="#E2DDD0" />
        </>}
        {/* wizard hat */}
        {wizard > 0 && <>
          <polygon points="100,0 62,40 138,40" fill="#4B3E8E" />
          <rect x={46} y={36} width={108} height={12} fill="#3A2F73" />
          <rect x={94} y={8} width={10} height={10} fill="#E7B24C" />
          <rect x={78} y={24} width={8} height={8} fill="#E7B24C" />
          <rect x={112} y={22} width={8} height={8} fill="#E7B24C" />
          {/* the wand, held in the right nub */}
          <rect x={182} y={armY - 34} width={7} height={54} fill="#8A6844" transform={`rotate(26 185 ${armY + 8})`} />
          <rect x={196} y={armY - 46} width={14} height={14} fill="#E7B24C" transform={`rotate(26 203 ${armY - 39})`} />
          <rect x={200} y={armY - 42} width={6} height={6} fill="#FFF3D6" transform={`rotate(26 203 ${armY - 39})`} />
        </>}
      </svg>
      {shock > 0.4 && <div style={{ position: "absolute", right: size * 0.12, top: size * 0.14, width: size * 0.08, height: size * 0.11, borderRadius: "50% 50% 50% 50% / 62% 62% 40% 40%", background: "linear-gradient(160deg,#BFE3FF,#5FA8E8)", boxShadow: "0 2px 4px rgba(20,60,120,0.4)", opacity: Math.min(1, shock * 1.5), transform: "rotate(8deg)" }} />}
    </div>
  );
};

const ClaudeLogo: React.FC<{ lf: number; size: number }> = ({ lf, size }) => {
  const s = interpolate(lf, [0, fr(0.6), fr(1.1)], [0.55, 1.28, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
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

// ---------------- the PYRAMID set (shared by scenes) ----------------
const PYR = { baseY: 640, midY: 470, topY: 300, cx: 506 };
const Pyramid: React.FC<{ lf: number; lit?: number[]; gateGlow?: number; assemble?: boolean }> = ({ lf, lit = [1, 1, 1], gateGlow = 0, assemble = false }) => {
  const lv = (_i: number) => 1;
  const W = [720, 500, 300];
  const Y = [PYR.baseY, PYR.midY, PYR.topY];
  return (<>
    {[0, 1, 2].map((i) => (
      <div key={i} style={{ position: "absolute", left: PYR.cx - (W[i] / 2), top: Y[i], width: W[i], height: 115, transform: `scale(${lv(i)})`, opacity: Math.min(1, lv(i) * 1.2) * (0.45 + lit[i] * 0.55), borderRadius: 14, background: `linear-gradient(180deg, ${["#31415F", "#3A4E74", "#44598A"][i]}, ${["#243149", "#2B3A57", "#334263"][i]})`, border: "2.5px solid rgba(150,175,220,0.4)", boxShadow: lit[i] > 0.6 ? "0 18px 40px -14px rgba(10,16,34,0.7), inset 0 2px 0 rgba(255,255,255,0.1)" : "inset 0 0 40px rgba(0,0,0,0.4)" }}>
        {/* stone seams */}
        {Array.from({ length: 3 }, (_, k) => <div key={k} style={{ position: "absolute", left: `${20 + k * 25}%`, top: k % 2 ? 8 : 62, width: 3, height: 50, background: "rgba(10,16,30,0.35)", borderRadius: 2 }} />)}
      </div>
    ))}
    {/* the GATES between levels */}
    {[0, 1].map((g) => {
      const gy = g === 0 ? 608 : 440;
      const gw = g === 0 ? 150 : 120;
      return (
        <div key={g} style={{ position: "absolute", left: PYR.cx - gw / 2, top: gy - 12, width: gw, height: 22, borderRadius: 8, background: gateGlow > 0.05 ? grad("#F0CB63", "#D39A2A") : "#1B2740", border: `2.5px solid ${gateGlow > 0.05 ? "#F6E4A0" : "rgba(231,178,76,0.5)"}`, boxShadow: gateGlow > 0.05 ? `0 0 ${18 + gateGlow * 26}px ${GOLD}` : `0 0 8px rgba(231,178,76,0.3)`, zIndex: 12 }}>
          <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-52%)", fontSize: 13, opacity: 0.9 }}>{gateGlow > 0.05 ? "🔓" : "🔒"}</div>
        </div>
      );
    })}
  </>);
};

// job card (the thing that moves through the pyramid)
const JobCard: React.FC<{ label?: string; hot?: number; w?: number }> = ({ label = "job", hot = 0, w = 92 }) => (
  <div style={{ width: w, borderRadius: 10, background: hot > 0.5 ? "rgba(196,74,58,0.2)" : PAPER, border: `2.5px solid ${hot > 0.5 ? "#E58072" : "#C9BCA4"}`, padding: "7px 0 5px", textAlign: "center", boxShadow: hot > 0.5 ? `0 0 18px ${RED}88` : "0 10px 22px -8px rgba(10,16,34,0.5)" }}>
    <div style={{ fontSize: 24, lineHeight: 1 }}>{hot > 0.5 ? "🔥" : "📋"}</div>
    <div style={{ fontFamily: mono, fontSize: 13, color: hot > 0.5 ? "#FFB4A6" : "#5A5346", marginTop: 2 }}>{label}</div>
  </div>
);

// ---------------- pixel buildings + swinging gate helpers ----------------
const House: React.FC<{ w: number; h: number; kind: "apartment" | "house" | "mansion" }> = ({ w, h, kind }) => (
  <div style={{ position: "relative", width: w, height: h }}>
    {/* roof */}
    {kind !== "apartment" && <div style={{ position: "absolute", left: -14, top: -h * 0.2, width: 0, height: 0, borderLeft: `${w / 2 + 14}px solid transparent`, borderRight: `${w / 2 + 14}px solid transparent`, borderBottom: `${h * 0.24}px solid ${kind === "mansion" ? "#8A5A9E" : "#B0603E"}` }} />}
    {kind === "apartment" && <div style={{ position: "absolute", left: -6, top: -14, width: w + 12, height: 16, background: "#5A6B85", borderRadius: 3 }} />}
    {/* body */}
    <div style={{ position: "absolute", inset: 0, background: kind === "mansion" ? "linear-gradient(180deg, #F0E6D2, #DFD0B4)" : kind === "house" ? "linear-gradient(180deg, #E8D5C0, #D6BEA4)" : "linear-gradient(180deg, #97A6BE, #7E8DA6)", border: "3px solid rgba(40,50,70,0.5)", borderRadius: 4 }} />
    {/* windows */}
    {Array.from({ length: kind === "mansion" ? 6 : kind === "house" ? 3 : 4 }, (_, i) => {
      const cols = kind === "mansion" ? 3 : 2;
      const cw = (w - 40) / cols;
      const x = 16 + (i % cols) * cw + cw / 2 - 13;
      const y = 18 + Math.floor(i / cols) * (kind === "apartment" ? h / 3.2 : h / 2.6);
      if (y > h - 46) return null;
      return <div key={i} style={{ position: "absolute", left: x, top: y, width: 26, height: 30, background: "#F6E4A0", border: "2.5px solid rgba(40,50,70,0.55)", borderRadius: 3 }} />;
    })}
    {/* door */}
    <div style={{ position: "absolute", left: "50%", bottom: 0, transform: "translateX(-50%)", width: kind === "mansion" ? 44 : 32, height: kind === "mansion" ? 62 : 46, background: "#6E4A2E", border: "2.5px solid rgba(40,50,70,0.55)", borderRadius: "6px 6px 0 0" }} />
    {/* mansion columns + gold trim */}
    {kind === "mansion" && <>
      <div style={{ position: "absolute", left: 12, bottom: 0, width: 14, height: h * 0.62, background: "#FBF6EC", border: "2px solid rgba(40,50,70,0.4)" }} />
      <div style={{ position: "absolute", right: 12, bottom: 0, width: 14, height: h * 0.62, background: "#FBF6EC", border: "2px solid rgba(40,50,70,0.4)" }} />
      <div style={{ position: "absolute", left: 0, top: h * 0.3, width: "100%", height: 6, background: "#E7B24C" }} />
    </>}
  </div>
);

const SwingGate: React.FC<{ open: number; glow: number; w?: number }> = ({ open, glow, w = 90 }) => (
  <div style={{ position: "relative", width: w, height: 110 }}>
    <div style={{ position: "absolute", left: 0, bottom: 0, width: 12, height: 110, background: "#6E5236", border: "2px solid rgba(40,50,70,0.5)", borderRadius: 3 }} />
    <div style={{ position: "absolute", right: 0, bottom: 0, width: 12, height: 110, background: "#6E5236", border: "2px solid rgba(40,50,70,0.5)", borderRadius: 3 }} />
    <div style={{ position: "absolute", left: 10, bottom: 4, width: w - 20, height: 86, transformOrigin: "0% 50%", transform: `rotateY(${open * 74}deg)`, background: glow > 0.05 ? grad("#F0CB63", "#D39A2A") : "#8A6844", border: `3px solid ${glow > 0.05 ? "#F6E4A0" : "#5E4630"}`, borderRadius: 6, boxShadow: glow > 0.05 ? `0 0 ${16 + glow * 20}px ${GOLD}` : "none" }}>
      {Array.from({ length: 4 }, (_, i) => <div key={i} style={{ position: "absolute", left: 8 + i * ((w - 40) / 4), top: 8, width: 6, height: 62, background: "rgba(40,30,15,0.35)", borderRadius: 3 }} />)}
    </div>
  </div>
);

// floating chat bubble over a listener
const Chat: React.FC<{ x: number; y: number; lf: number; delay: number; txt?: string }> = ({ x, y, lf, delay, txt = "💬" }) => {
  const ap = over(lf, delay, 8, Easing.out(Easing.back(1.8)));
  if (ap <= 0.01) return null;
  const bob = Math.sin(lf / 7 + delay) * 5;
  return (
    <div style={{ position: "absolute", left: x, top: y + bob, transform: `scale(${ap})`, opacity: ap, zIndex: 18 }}>
      <div style={{ padding: "5px 11px", borderRadius: 12, borderBottomLeftRadius: 3, background: "#EAF3ED", border: "2px solid #BFD8C7", fontSize: 20 }}>{txt}</div>
    </div>
  );
};

// ---- Meta brand assets (vector, editorial commentary) ----
// ---- Meta brand assets (original vector, editorial commentary — NOT the protected file) ----
// Faithful Mobius "∞": rounded filled-width blue ribbon with a real over-under center weave.
const MetaLogo: React.FC<{ size?: number }> = ({ size = 80 }) => {
  const uid = React.useId().replace(/:/g, ""); // instance-unique gradient/clip ids
  const gF = `mgF-${uid}`, gD = `mgD-${uid}`, cp = `mgC-${uid}`;
  return (
    <svg viewBox="0 0 128 76" width={size} height={(size * 76) / 128} style={{ display: "block", overflow: "visible" }}>
      <defs>
        {/* light top-left -> deep bottom-right, the Meta blue ramp */}
        <linearGradient id={gF} x1="8" y1="12" x2="120" y2="66" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#3DB4FF" />
          <stop offset="0.30" stopColor="#12A0FF" />
          <stop offset="0.70" stopColor="#0A74EE" />
          <stop offset="1" stopColor="#0A5AE0" />
        </linearGradient>
        {/* darker shade for the strand segment that dives UNDER at the crossover */}
        <linearGradient id={gD} x1="56" y1="30" x2="72" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#0A5AE0" />
          <stop offset="1" stopColor="#0645AE" />
        </linearGradient>
        {/* silhouette of the whole ribbon; clips the FRONT strand so it reads continuous on top */}
        <clipPath id={cp}>
          <path d="M64 38 C 70 27, 79 18, 91 18 C 106 18, 118 28, 118 42 C 118 56, 107 66, 93 66 C 80 66, 71 57, 64 46 C 57 57, 48 66, 35 66 C 21 66, 10 56, 10 42 C 10 28, 22 18, 37 18 C 49 18, 58 27, 64 38 Z" />
        </clipPath>
      </defs>

      {/* BACK strand: the loop that dips UNDER at the center (drawn first) */}
      <path
        d="M64 38 C 58 27, 49 18, 37 18 C 22 18, 10 28, 10 42 C 10 56, 21 66, 35 66 C 51 66, 60 53, 68 42 C 74 33, 81 26, 91 26 C 101 26, 108 33, 108 42 C 108 51, 101 58, 91 58 C 84 58, 78 53, 74 47"
        fill="none" stroke={`url(#${gF})`} strokeWidth={16} strokeLinecap="round" strokeLinejoin="round"
      />
      {/* shade the tiny segment where the back strand ducks beneath the front (fakes depth) */}
      <path d="M64 38 C 65 41, 67 43, 69 43" fill="none" stroke={`url(#${gD})`} strokeWidth={16} strokeLinecap="round" />

      {/* FRONT strand: the loop that passes OVER, clipped to the ribbon silhouette */}
      <g clipPath={`url(#${cp})`}>
        <path
          d="M64 38 C 70 27, 79 18, 91 18 C 106 18, 118 28, 118 42 C 118 56, 107 66, 93 66 C 77 66, 68 53, 60 42 C 54 33, 47 26, 37 26 C 27 26, 20 33, 20 42 C 20 51, 27 58, 37 58 C 44 58, 50 53, 54 47"
          fill="none" stroke={`url(#${gF})`} strokeWidth={16} strokeLinecap="round" strokeLinejoin="round"
        />
      </g>

      {/* soft top-left sheen along the upper edge — sells the ribbon volume */}
      <path d="M37 20 C 22 20, 12 30, 12 42" fill="none" stroke="rgba(255,255,255,0.30)" strokeWidth={3.2} strokeLinecap="round" />
      <path d="M91 20 C 106 20, 116 30, 116 42" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth={3.2} strokeLinecap="round" />
    </svg>
  );
};

// Optional glow/drop-shadow wrapper. `on` lets you animate the halo intensity (0..1).
const MetaLogoGlow: React.FC<{ size?: number; on?: number }> = ({ size = 80, on = 1 }) => (
  <div style={{
    display: "inline-flex",
    filter: `drop-shadow(0 0 ${10 + on * 16}px rgba(24,119,242,${0.35 + on * 0.5})) drop-shadow(0 6px 14px rgba(10,90,224,${0.30 + on * 0.25}))`,
  }}>
    <MetaLogo size={size} />
  </div>
);
const MetaMascot: React.FC<{ lf: number; size?: number; gaze?: number; nodAmp?: number; nodSpeed?: number; cheer?: number; shock?: number }> = ({ lf, size = 200, gaze = 0, nodAmp = 3, nodSpeed = 8, cheer = 0, shock = 0 }) => (
  <div style={{ position: "relative", width: size, height: size }}>
    <Mascot lf={lf} size={size} gaze={gaze} nodAmp={nodAmp} nodSpeed={nodSpeed} cheer={cheer} shock={shock} zuck={1} />
    <div style={{ position: "absolute", left: size * 0.36, top: size * 0.5, width: size * 0.28, height: size * 0.28, borderRadius: "50%", background: "#fff", border: `2px solid ${META}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 6px rgba(0,0,0,0.25)" }}>
      <MetaLogo size={size * 0.2} />
    </div>
  </div>
);
// ============================================================================
// MetaHQ — Menlo Park campus landmark (glass HQ + giant "Like" thumbs sign +
// "1 HACKER WAY" street sign + Zuck-caricature critter + hardhat/build nod).
// Crafted SVG/CSS only, NO emojis. Drop-in replacement; API unchanged: <MetaHQ lf={lf} />.
// Assumes shared infra in scope: fr, grad, seed, NAVYSH, META, METALO, inter.
// Reuses the MetaLogo defined above it in the file.
// ============================================================================
const Portrait: React.FC<{ who: "zuck" | "wang"; size?: number; lf?: number }> = ({ who, size = 96, lf = 0 }) => {
  const bob = Math.sin(lf / 11) * 2;
  const isZ = who === "zuck"; const isD = who === "dario";
  const ring = isD ? "#1E3A5F" : isZ ? "#B7BAC0" : "#2A2A32";
  return (
    <div style={{ width: size, height: size, transform: `translateY(${bob}px)`, filter: "drop-shadow(0 10px 18px rgba(10,16,34,0.45))" }}>
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <defs><clipPath id={`pc-${who}`}><circle cx="50" cy="50" r="43" /></clipPath></defs>
        <circle cx="50" cy="50" r="48" fill="#FBF8F1" />
        <circle cx="50" cy="50" r="45.5" fill="none" stroke={ring} strokeWidth="5" />
        <g clipPath={`url(#pc-${who})`}>
          <rect x="0" y="0" width="100" height="100" fill={isZ ? "#DCE7F5" : "#E7DBC9"} />
          {isD ? <>
            <rect x="22" y="83" width="56" height="26" rx="11" fill="#1E3A5F" />
            <rect x="42" y="71" width="16" height="15" fill="#E9C6A2" />
            <ellipse cx="50" cy="54" rx="21" ry="23" fill="#EFD3B8" />
            <circle cx="28.5" cy="56" r="4.5" fill="#E4BE99" /><circle cx="71.5" cy="56" r="4.5" fill="#E4BE99" />
            {[[30,41],[40,33],[50,30],[60,33],[70,41],[34,47],[66,47],[25,50],[75,50]].map((c, i) => <circle key={i} cx={c[0]} cy={c[1]} r="8.5" fill="#5A4632" />)}
            <circle cx="41" cy="55.5" r="7.4" fill="rgba(210,225,245,0.28)" stroke="#3A4456" strokeWidth="2.4" /><circle cx="59" cy="55.5" r="7.4" fill="rgba(210,225,245,0.28)" stroke="#3A4456" strokeWidth="2.4" />
            <rect x="48" y="54.5" width="4" height="2.2" fill="#3A4456" />
            <circle cx="41" cy="55.5" r="2.7" fill="#2A2A30" /><circle cx="59" cy="55.5" r="2.7" fill="#2A2A30" />
            <path d="M41 65 Q50 73 59 65" fill="none" stroke="#B06A4A" strokeWidth="3" strokeLinecap="round" />
          </> : isZ ? <>
            <rect x="23" y="83" width="54" height="26" rx="11" fill="#B7BAC0" />
            <rect x="42" y="70" width="16" height="16" fill="#E9C6A2" />
            <ellipse cx="50" cy="52" rx="22" ry="24" fill="#F1DAC1" />
            <circle cx="27.5" cy="54" r="4.5" fill="#E4BE99" /><circle cx="72.5" cy="54" r="4.5" fill="#E4BE99" />
            <path d="M26 46 C26 22 74 22 74 46 C74 40 71 36 66 35 L66 40 C58 34 42 34 34 40 L34 35 C29 36 26 40 26 46 Z" fill="#6E4A2C" />
            <rect x="27" y="37" width="46" height="9" rx="2" fill="#6E4A2C" /><rect x="27" y="45" width="46" height="2.6" fill="#805A38" />
            <rect x="35" y="49.5" width="11" height="2.6" rx="1.3" fill="#5A3D24" /><rect x="54" y="49.5" width="11" height="2.6" rx="1.3" fill="#5A3D24" />
            <ellipse cx="41" cy="55.5" rx="3.1" ry="3.5" fill="#2A2A30" /><ellipse cx="59" cy="55.5" rx="3.1" ry="3.5" fill="#2A2A30" />
            <path d="M50 57 L47.6 63 L52.4 63 Z" fill="#E2BC98" />
            <rect x="44" y="67.5" width="12" height="2.8" rx="1.4" fill="#BC866A" />
          </> : <>
            <rect x="23" y="83" width="54" height="26" rx="11" fill="#2A2A32" />
            <rect x="42" y="70" width="16" height="16" fill="#D8B084" />
            <ellipse cx="50" cy="52" rx="22" ry="24" fill="#E7BD91" />
            <circle cx="27.5" cy="54" r="4.5" fill="#D3A97C" /><circle cx="72.5" cy="54" r="4.5" fill="#D3A97C" />
            <path d="M26 47 C26 23 74 23 74 47 C74 39 70 34 62 34 C55 27 40 29 34 37 C29 39 26 42 26 47 Z" fill="#17171C" />
            <path d="M31 41 C42 31 60 31 70 40 C64 33 40 31 31 41 Z" fill="#0E0E12" />
            <rect x="35" y="50" width="11" height="2.6" rx="1.3" fill="#111116" /><rect x="54" y="50" width="11" height="2.6" rx="1.3" fill="#111116" />
            <path d="M37.5 55.5 Q41 52.6 45 55.5 Q41 57.8 37.5 55.5 Z" fill="#22222A" /><path d="M55 55.5 Q58.5 52.6 62.5 55.5 Q58.5 57.8 55 55.5 Z" fill="#22222A" />
            <path d="M50 57 L48 63 L52 63 Z" fill="#D6AC80" />
            <path d="M44 66.5 Q50 70.5 56 66.5" fill="none" stroke="#AE7850" strokeWidth="2.6" strokeLinecap="round" />
          </>}
        </g>
      </svg>
    </div>
  );
};

const FaceImg: React.FC<{ name: string; size?: number; lf?: number; ring?: string }> = ({ name, size = 96, lf = 0, ring = "#B7BAC0" }) => {
  const bob = Math.sin(lf / 11) * 2;
  return (
    <div style={{ width: size, height: size, transform: `translateY(${bob}px)`, filter: "drop-shadow(0 10px 18px rgba(10,16,34,0.45))" }}>
      <div style={{ width: size, height: size, borderRadius: "50%", overflow: "hidden", border: `${Math.max(4, size * 0.05)}px solid ${ring}`, background: "#FBF8F1" }}>
        <Img src={staticFile(`faces/${name}`)} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>
    </div>
  );
};
const MetaHQ: React.FC<{ lf: number }> = ({ lf }) => {
  // idle motion --------------------------------------------------------------
  const sway = Math.sin(lf / 22) * 1.1;               // whole-post gentle sway
  const thumbBob = Math.sin(lf / 15) * 2.4;           // sign lifts a touch
  const zuckBob = Math.max(0, Math.sin(lf / 12)) * 4; // proud little hop
  const beacon = (Math.sin(lf / 5) + 1) / 2;          // rooftop red beacon pulse
  const glint = ((lf / fr(3.4)) % 1);                 // sun sweep across glass
  const cloud = ((lf / fr(9)) % 1);                   // slow reflection drift

  // curtain-wall grid geometry ----------------------------------------------
  const COLS = 9, ROWS = 4;
  const winW = 40, winH = 34, gapX = 5, gapY = 7, padX = 16, padTop = 34;
  const bodyW = padX * 2 + COLS * winW + (COLS - 1) * gapX; // = 437
  const bodyH = padTop + ROWS * (winH + gapY) + 12;         // = 169

  return (
    <div style={{ position: "relative", width: 600, height: 322, transform: `translateY(${sway * 0.4}px)` }}>

      {/* ground shadow pad — grounds the whole campus */}
      <div style={{ position: "absolute", left: 46, bottom: 6, width: 512, height: 34, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(10,16,34,0.5), transparent 70%)", filter: "blur(6px)" }} />

      {/* ===================== THE GLASS HQ BUILDING ===================== */}
      <div style={{ position: "absolute", left: 62, bottom: 24, width: bodyW, height: bodyH }}>
        {/* rooftop parapet + HVAC + solar sliver + blinking beacon */}
        <div style={{ position: "absolute", left: -8, top: -20, width: bodyW + 16, height: 22, background: grad("#D7DEE9", "#AEB9C9"), border: "2px solid #8B97A9", borderRadius: "6px 6px 3px 3px", boxShadow: "0 4px 10px -4px rgba(10,16,34,0.5)" }} />
        {/* HVAC units on the roof */}
        <div style={{ position: "absolute", left: 60, top: -34, width: 46, height: 16, background: grad("#C3CBD8", "#9AA6B7"), border: "2px solid #7E8A9C", borderRadius: 3 }} />
        <div style={{ position: "absolute", left: 300, top: -34, width: 62, height: 16, background: grad("#C3CBD8", "#9AA6B7"), border: "2px solid #7E8A9C", borderRadius: 3 }} />
        {/* thin solar / skylight strip */}
        <div style={{ position: "absolute", left: 150, top: -30, width: 110, height: 12, background: grad("#2C4A78", "#16294B"), border: "1.5px solid #6E86AE", borderRadius: 2, opacity: 0.9 }} />
        {/* blinking safety beacon */}
        <div style={{ position: "absolute", left: 210, top: -46, width: 8, height: 16, background: "#7E8A9C", borderRadius: 2 }} />
        <div style={{ position: "absolute", left: 205, top: -52, width: 18, height: 10, borderRadius: "50%", background: `rgba(220,70,60,${0.35 + beacon * 0.65})`, boxShadow: `0 0 ${6 + beacon * 12}px rgba(220,70,60,${0.4 + beacon * 0.5})` }} />

        {/* building frame (aluminium curtain-wall mullions) */}
        <div style={{ position: "absolute", inset: 0, background: grad("#8B98AC", "#5E6D84"), border: "3px solid #4C5A70", borderRadius: "6px 6px 4px 4px", boxShadow: NAVYSH }} />
        {/* brand band under the parapet */}
        <div style={{ position: "absolute", left: 8, top: 6, right: 8, height: 22, borderRadius: 4, background: grad("#122A4E", "#0B1B34"), display: "flex", alignItems: "center", justifyContent: "center", gap: 8, border: "1.5px solid rgba(120,150,210,0.4)", overflow: "hidden" }}>
          <div style={{ transform: "scale(0.9)", display: "flex" }}><MetaLogo size={26} /></div>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 15, letterSpacing: "0.14em", color: "#BFD4FF" }}>MENLO PARK HQ</div>
          {/* faint reflection sweep across the sign */}
          <div style={{ position: "absolute", top: 0, bottom: 0, left: `${-30 + glint * 150}%`, width: 40, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)", transform: "skewX(-18deg)" }} />
        </div>

        {/* the glass curtain wall — grid of reflective panels */}
        <div style={{ position: "absolute", left: padX, top: padTop, right: padX, bottom: 12 }}>
          {Array.from({ length: COLS * ROWS }, (_, i) => {
            const c = i % COLS, r = Math.floor(i / COLS);
            const x = c * (winW + gapX);
            const y = r * (winH + gapY);
            // per-panel tint variance so the glass reads as real, not flat
            const v = seed(i * 2.3);
            const lit = seed(i * 5.1) > 0.86;             // a few warm-lit offices
            const topGlass = lit ? "#F4E3B0" : `rgba(${150 + v * 40},${190 + v * 30},${225 + v * 20},0.95)`;
            const botGlass = lit ? "#E7C878" : `rgba(${58 + v * 30},${96 + v * 34},${150 + v * 40},0.98)`;
            return (
              <div key={i} style={{ position: "absolute", left: x, top: y, width: winW, height: winH, borderRadius: 2, background: `linear-gradient(155deg, ${topGlass} 0%, ${botGlass} 100%)`, border: "1.5px solid rgba(30,44,70,0.55)", overflow: "hidden", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.35)" }}>
                {/* diagonal sky reflection streak in each pane */}
                <div style={{ position: "absolute", left: -6, top: -8, width: 14, height: winH + 16, background: "rgba(255,255,255,0.32)", transform: "rotate(20deg)" }} />
              </div>
            );
          })}
          {/* drifting cloud reflection band sweeping across the whole facade */}
          <div style={{ position: "absolute", top: "8%", left: `${-40 + cloud * 150}%`, width: "44%", height: "42%", background: "linear-gradient(100deg, transparent, rgba(255,255,255,0.34), transparent)", filter: "blur(4px)", transform: "skewX(-14deg)", pointerEvents: "none" }} />
          {/* long specular sun-glint that rakes over the glass */}
          <div style={{ position: "absolute", top: 0, bottom: 0, left: `${-20 + glint * 130}%`, width: 26, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)", transform: "skewX(-16deg)", pointerEvents: "none" }} />
        </div>

        {/* glass lobby / entrance at the base */}
        <div style={{ position: "absolute", left: bodyW / 2 - 34, bottom: 0, width: 68, height: 26, background: grad("#BFE0FF", "#5E8FC4"), border: "2px solid #4C5A70", borderRadius: "3px 3px 0 0" }}>
          <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 2, background: "rgba(30,44,70,0.5)" }} />
        </div>
      </div>

      {/* ===================== META LOGO PYLON (landmark, in place of the thumbs-up) ===================== */}
      <div style={{ position: "absolute", left: 92, bottom: 22, width: 52, height: 22, background: grad("#C7CDD6", "#9AA2AE"), border: "2px solid #7C8492", borderRadius: 3, zIndex: 7 }} />
      <div style={{ position: "absolute", left: 110, bottom: 42, width: 18, height: 104, transformOrigin: "50% 100%", transform: `rotate(${sway}deg)`, background: grad("#E9EDF3", "#B9C2CF"), border: "2px solid #8B93A2", borderRadius: 3, zIndex: 7 }} />
      <div style={{ position: "absolute", left: 44, bottom: 128 + thumbBob, transformOrigin: "50% 100%", transform: `rotate(${sway}deg)`, filter: "drop-shadow(0 14px 22px rgba(8,20,60,0.45))", zIndex: 8 }}>
        <div style={{ padding: "18px 20px", borderRadius: 24, background: "#FFFFFF", border: `5px solid ${META}`, boxShadow: `0 0 26px ${META}66, inset 0 2px 0 rgba(255,255,255,0.9)` }}>
          <MetaLogo size={112} />
        </div>
      </div>
      {/* ===================== "1 HACKER WAY" STREET SIGN ===================== */}
      <div style={{ position: "absolute", right: 58, bottom: 30, width: 8, height: 104, background: grad("#8A93A2", "#5B6472"), borderRadius: 2, zIndex: 8 }} />
      <div style={{ position: "absolute", right: 8, bottom: 108, transform: `translateY(${Math.sin(lf / 26) * 1.2}px)`, filter: "drop-shadow(0 8px 14px rgba(10,16,34,0.4))", zIndex: 9 }}>
        <div style={{ padding: "7px 15px", borderRadius: 6, background: grad("#2E9E63", "#1C7A48"), border: "3px solid #E9F3EC", boxShadow: "inset 0 2px 0 rgba(255,255,255,0.25)", textAlign: "center", whiteSpace: "nowrap" }}>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 24, color: "#F4FBF6", letterSpacing: "0.02em", lineHeight: 1 }}>1 HACKER WAY</div>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 10, color: "rgba(244,251,246,0.8)", letterSpacing: "0.2em", marginTop: 2 }}>MENLO PARK · CA</div>
        </div>
      </div>

      {/* ===================== POP-CULTURE TOUCH #1: proud Zuck-caricature critter ===================== */}
      {/* stands on the entrance plaza, grey hoodie, pale face, tiny proud bob */}
      <div style={{ position: "absolute", left: 262, bottom: 20 + zuckBob, transform: "translateZ(0)", zIndex: 9 }}>
        <svg viewBox="0 0 70 96" width={64} height={88} shapeRendering="crispEdges">
          {/* body = grey tee/hoodie */}
          <rect x="16" y="44" width="38" height="40" rx="4" fill="#C9CED6" />
          <rect x="16" y="44" width="38" height="7" fill="#DDE1E7" />
          {/* hoodie collar V */}
          <path d="M28 44 L35 54 L42 44 Z" fill="#AEB4BE" />
          {/* arms crossed (proud founder pose) */}
          <rect x="10" y="58" width="20" height="9" rx="4" fill="#C9CED6" />
          <rect x="40" y="58" width="20" height="9" rx="4" fill="#BFC5CE" />
          {/* pale round face */}
          <rect x="20" y="14" width="30" height="30" rx="9" fill="#F1E2D2" />
          {/* signature straight fringe */}
          <rect x="19" y="12" width="32" height="11" rx="5" fill="#7A5236" />
          <rect x="19" y="18" width="32" height="4" fill="#6A472E" />
          {/* wide unblinking eyes */}
          <rect x="27" y="26" width="5" height="7" fill="#22303F" />
          <rect x="38" y="26" width="5" height="7" fill="#22303F" />
          {/* flat little smile */}
          <rect x="30" y="37" width="10" height="3" rx="1" fill="#C58C6A" />
          {/* legs */}
          <rect x="21" y="84" width="10" height="10" fill="#3C4654" />
          <rect x="39" y="84" width="10" height="10" fill="#3C4654" />
        </svg>
        {/* proud speech chip: he built it himself — lifted above the head */}
        <div style={{ position: "absolute", left: -8, top: -26, padding: "3px 9px", borderRadius: 9, borderBottomLeftRadius: 2, background: "#EAF2FF", border: `2px solid ${META}`, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 12, color: METALO, whiteSpace: "nowrap", boxShadow: "0 4px 10px -4px rgba(10,16,34,0.5)" }}>we built it ourselves</div>
      </div>

      {/* ===================== POP-CULTURE TOUCH #2: "still building" hardhat + cone ===================== */}
      {/* a yellow hardhat resting on a crate — the perpetual-construction nod */}
      <div style={{ position: "absolute", right: 168, bottom: 22, width: 40, height: 22, background: grad("#8A6844", "#6E5236"), border: "2px solid #543E28", borderRadius: 3, zIndex: 5 }}>
        {/* plank seam on the crate */}
        <div style={{ position: "absolute", left: "50%", top: 2, bottom: 2, width: 2, background: "rgba(40,28,16,0.4)" }} />
      </div>
      {/* hardhat dome + brim */}
      <div style={{ position: "absolute", right: 170, bottom: 42, width: 36, height: 18, background: grad("#F5CE55", "#D9A626"), border: "2px solid #B4841E", borderRadius: "14px 14px 3px 3px", zIndex: 5 }}>
        <div style={{ position: "absolute", left: "50%", top: -4, transform: "translateX(-50%)", width: 10, height: 6, background: "#E9BE3F", border: "1.5px solid #B4841E", borderRadius: "4px 4px 0 0" }} />
        <div style={{ position: "absolute", left: -5, bottom: -3, width: 46, height: 6, background: grad("#F5CE55", "#D9A626"), border: "2px solid #B4841E", borderRadius: 4 }} />
      </div>
      {/* a small traffic cone beside it */}
      <div style={{ position: "absolute", right: 142, bottom: 22, zIndex: 5 }}>
        <div style={{ width: 0, height: 0, borderLeft: "11px solid transparent", borderRight: "11px solid transparent", borderBottom: "24px solid #E4622B" }} />
        <div style={{ position: "absolute", left: -4, top: 10, width: 30, height: 5, background: "#F4F1EC", borderRadius: 1 }} />
        <div style={{ position: "absolute", left: -7, bottom: -4, width: 36, height: 6, background: grad("#F07A3E", "#C24E1C"), borderRadius: 2 }} />
      </div>

      {/* ===================== SUBTLE CAMPUS DETAIL: topiary shrubs ===================== */}
      <div style={{ position: "absolute", left: 30, bottom: 22, zIndex: 4 }}>
        <div style={{ width: 34, height: 30, borderRadius: "50% 50% 40% 40%", background: grad("#4E8A54", "#2F5E36"), border: "2px solid #274F2D" }} />
        <div style={{ position: "absolute", left: 13, top: 26, width: 8, height: 14, background: "#5E4630", borderRadius: 2 }} />
      </div>
      <div style={{ position: "absolute", right: 30, bottom: 22, zIndex: 4 }}>
        <div style={{ width: 30, height: 26, borderRadius: "50% 50% 40% 40%", background: grad("#4E8A54", "#2F5E36"), border: "2px solid #274F2D" }} />
        <div style={{ position: "absolute", left: 11, top: 22, width: 8, height: 14, background: "#5E4630", borderRadius: 2 }} />
      </div>
    </div>
  );
};

const Tab: React.FC<{ w?: number }> = ({ w = 150 }) => (
  <div style={{ width: w, borderRadius: 8, background: "#F4F6FA", border: "2px solid #C9D3E0", overflow: "hidden", boxShadow: "0 8px 18px -8px rgba(10,16,34,0.4)" }}>
    <div style={{ height: 20, background: "#E4EAF2", display: "flex", alignItems: "center", padding: "0 8px", gap: 4 }}>
      {["#ED6A5E", "#F4BF4F", "#61C554"].map((c, i) => <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: c }} />)}
      <div style={{ marginLeft: 4, height: 8, borderRadius: 4, background: "#fff", flex: 1 }} />
    </div>
    <div style={{ padding: "8px 10px" }}>
      <div style={{ display: "flex", gap: 3, alignItems: "flex-end", height: 34 }}>
        {[0.5, 0.8, 0.4, 0.9, 0.6, 0.7].map((h, i) => <div key={i} style={{ flex: 1, height: `${h * 100}%`, background: i % 2 ? "#8FB0DE" : META, borderRadius: 2 }} />)}
      </div>
    </div>
  </div>
);
const AdsManager: React.FC<{ lf: number; highlightRow?: number; dimRows?: number[]; budget?: string }> = ({ lf, highlightRow = -1, dimRows = [], budget = "" }) => {
  const rows = [["Retargeting", "3.2x", "$412"], ["Lookalike 1%", "1.1x", "$380"], ["Broad AI", "2.7x", "$500"], ["Interest, fitness", "0.9x", "$210"], ["Creative test", "1.4x", "$150"]];
  return (
    <div style={{ width: "100%", borderRadius: 14, background: "#12151C", border: "2px solid rgba(120,150,210,0.3)", overflow: "hidden", boxShadow: NAVYSH }}>
      <div style={{ height: 46, background: "#1B2130", display: "flex", alignItems: "center", padding: "0 16px", gap: 10 }}>
        <MetaLogo size={26} />
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 20, color: "#E6ECF5" }}>Ads Manager</div>
        {budget ? <div style={{ marginLeft: "auto", fontFamily: mono, fontSize: 18, color: GREEN }}>{budget}</div> : null}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 0.7fr 0.7fr", padding: "6px 16px", fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 15, color: "rgba(180,195,225,0.6)" }}>
        <div>Ad set</div><div style={{ textAlign: "right" }}>ROAS</div><div style={{ textAlign: "right" }}>Spend</div>
      </div>
      {rows.map((r, i) => {
        const dim = dimRows.includes(i);
        const hi = highlightRow === i;
        return (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1.6fr 0.7fr 0.7fr", padding: "11px 16px", alignItems: "center", background: hi ? "rgba(63,158,116,0.16)" : "transparent", opacity: dim ? 0.32 : 1, borderTop: "1px solid rgba(120,150,210,0.12)", position: "relative" }}>
            <div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 19, color: dim ? "#8792A6" : "#DDE6F2", textDecoration: dim ? "line-through" : "none", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 30, height: 18, borderRadius: 9, background: dim ? "#3A4456" : (parseFloat(r[1]) >= 1.5 ? "rgba(63,158,116,0.3)" : "rgba(196,74,58,0.3)"), border: `1.5px solid ${dim ? "#556" : (parseFloat(r[1]) >= 1.5 ? GREEN : RED)}` }} />
              {r[0]}
            </div>
            <div style={{ textAlign: "right", fontFamily: mono, fontSize: 19, color: parseFloat(r[1]) >= 1.5 ? "#8FE0B0" : "#FFB4A6" }}>{r[1]}</div>
            <div style={{ textAlign: "right", fontFamily: mono, fontSize: 19, color: "rgba(205,220,245,0.85)" }}>{r[2]}</div>
          </div>
        );
      })}
    </div>
  );
};
const CmdBubble: React.FC<{ text: string; done: boolean; w?: number }> = ({ text, done, w = 520 }) => (
  <div style={{ width: w }}>
    <div style={{ padding: "12px 18px", borderRadius: 16, borderBottomRightRadius: 4, background: grad("#E9825C", "#C7541F"), fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 22, color: "#fff", boxShadow: "0 12px 26px -10px rgba(199,84,31,0.5)", marginLeft: "auto", maxWidth: "88%" }}>{text}</div>
    {done ? <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 8, justifyContent: "flex-end" }}><span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 20, color: "#8FE0B0" }}>✓ done</span></div> : null}
  </div>
);

// ===== v8 set-pieces: car, pogo, money gun, trophy, white Meta dashboard =====
const Car: React.FC<{ lf: number; size?: number }> = ({ lf, size = 130 }) => {
  const u = size / 130; const bnc = Math.sin(lf / 4) * 1.5;
  return (
    <div style={{ width: size, height: size * 0.62, position: "relative", transform: `translateY(${bnc}px)`, filter: "drop-shadow(0 8px 12px rgba(0,0,0,0.35))" }}>
      <div style={{ position: "absolute", left: 0, bottom: 14 * u, width: size, height: 32 * u, borderRadius: `${16 * u}px ${16 * u}px ${6 * u}px ${6 * u}px`, background: grad("#C44A3A", "#9A2F22") }} />
      <div style={{ position: "absolute", left: 26 * u, bottom: 38 * u, width: 66 * u, height: 28 * u, borderRadius: `${12 * u}px ${12 * u}px 0 0`, background: grad("#E9825C", "#C7541F") }} />
      <div style={{ position: "absolute", left: 36 * u, bottom: 42 * u, width: 46 * u, height: 20 * u, borderRadius: 6 * u, background: "#BFE0FF" }} />
      <div style={{ position: "absolute", left: 46 * u, bottom: 44 * u, width: 22 * u, height: 22 * u, borderRadius: 3, background: "#D97757" }}><div style={{ position: "absolute", left: 5 * u, top: 8 * u, width: 4 * u, height: 6 * u, background: "#151312" }} /><div style={{ position: "absolute", left: 13 * u, top: 8 * u, width: 4 * u, height: 6 * u, background: "#151312" }} /></div>
      <div style={{ position: "absolute", left: 16 * u, bottom: 0, width: 26 * u, height: 26 * u, borderRadius: "50%", background: "#1A1A1E", border: `${5 * u}px solid #55565C`, transform: `rotate(${lf * 22}deg)` }} />
      <div style={{ position: "absolute", right: 16 * u, bottom: 0, width: 26 * u, height: 26 * u, borderRadius: "50%", background: "#1A1A1E", border: `${5 * u}px solid #55565C`, transform: `rotate(${lf * 22}deg)` }} />
    </div>
  );
};
const Pogo: React.FC<{ lf: number; size?: number }> = ({ lf, size = 84 }) => {
  const bnc = Math.abs(Math.sin(lf / 4)) * 42;
  return (
    <div style={{ position: "relative", width: size, transform: `translateY(${-bnc}px)` }}>
      <Mascot lf={lf} size={size} cheer={0.6} nodAmp={0} nodSpeed={9} />
      <div style={{ position: "absolute", left: size / 2 - 4, top: size * 0.82, width: 8, height: 52, background: grad("#C44A3A", "#9A2F22"), borderRadius: 3 }} />
      <div style={{ position: "absolute", left: size / 2 - 16, top: size * 0.6, width: 32, height: 8, background: "#3A4456", borderRadius: 4 }} />
      <div style={{ position: "absolute", left: size / 2 - 15, top: size * 0.82 + 52, width: 30, height: 9, background: "#3A4456", borderRadius: 3 }} />
    </div>
  );
};
const MoneyGun: React.FC<{ lf: number; size?: number }> = ({ lf, size = 90 }) => {
  const u = size / 90;
  return (
    <div style={{ position: "relative", width: size * 3.4, height: size * 3.4, filter: "drop-shadow(0 8px 12px rgba(0,0,0,0.4))" }}>
      {/* the gun (aimed up-right) */}
      <div style={{ position: "absolute", left: 0, top: 44 * u, transform: "rotate(-28deg)", transformOrigin: "0% 50%" }}>
        <div style={{ width: 66 * u, height: 28 * u, borderRadius: 6 * u, background: grad("#3A4456", "#232B3C") }} />
        <div style={{ position: "absolute", left: 10 * u, top: 24 * u, width: 22 * u, height: 32 * u, borderRadius: 5 * u, background: grad("#3A4456", "#232B3C") }} />
        <div style={{ position: "absolute", left: 62 * u, top: 6 * u, width: 22 * u, height: 15 * u, background: "#232B3C" }} />
      </div>
      {/* bills fountain: launch up-right from the muzzle, then FALL with gravity */}
      {Array.from({ length: 14 }, (_, i) => {
        const t = ((lf * 1.15 + i * 7.3) % 74) / 74;
        const bx = 72 * u + t * 150 * u + Math.sin(i * 3) * 8 * u;
        const by = 30 * u - 190 * u * t + 470 * u * t * t;
        const op = t < 0.8 ? 1 : Math.max(0, (1 - t) / 0.2);
        return <div key={i} style={{ position: "absolute", left: bx, top: by, width: 28 * u, height: 17 * u, borderRadius: 3 * u, background: "linear-gradient(180deg,#BEE7C9,#8FCBA1)", border: `${1.5 * u}px solid #5FA277`, transform: `rotate(${i * 47 + lf * 5}deg)`, opacity: op, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 9 * u, color: "#2F7E5A" }}>$</div>;
      })}
    </div>
  );
};
const Trophy: React.FC<{ size?: number; lf?: number }> = ({ size = 90, lf = 0 }) => {
  const u = size / 90; const sh = Math.abs(Math.sin(lf / 6));
  return (
    <div style={{ width: size, height: size * 1.3, position: "relative", filter: `drop-shadow(0 0 ${10 + sh * 12}px ${GOLD})` }}>
      <div style={{ position: "absolute", left: 16 * u, top: 0, width: 58 * u, height: 48 * u, borderRadius: `${8 * u}px ${8 * u}px ${28 * u}px ${28 * u}px`, background: grad("#F0CB63", "#D39A2A"), border: `${2 * u}px solid #F6E4A0` }} />
      <div style={{ position: "absolute", left: 0, top: 8 * u, width: 18 * u, height: 24 * u, borderRadius: "50%", border: `${4 * u}px solid #E0B84E`, borderRight: "none" }} />
      <div style={{ position: "absolute", right: 0, top: 8 * u, width: 18 * u, height: 24 * u, borderRadius: "50%", border: `${4 * u}px solid #E0B84E`, borderLeft: "none" }} />
      <div style={{ position: "absolute", left: 38 * u, top: 48 * u, width: 14 * u, height: 20 * u, background: grad("#D39A2A", "#A6741A") }} />
      <div style={{ position: "absolute", left: 22 * u, top: 66 * u, width: 46 * u, height: 14 * u, borderRadius: 4 * u, background: grad("#8A6844", "#6E5236") }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 14 * u, textAlign: "center", fontSize: 22 * u, color: "#fff", lineHeight: 1 }}>★</div>
    </div>
  );
};
const MetaDash: React.FC<{ w?: number }> = ({ w = 150 }) => (
  <div style={{ width: w, borderRadius: 8, background: "#FFFFFF", border: "2px solid #DCE3EC", overflow: "hidden", boxShadow: "0 8px 18px -8px rgba(10,16,34,0.3)" }}>
    <div style={{ height: 22, background: "#F0F2F5", display: "flex", alignItems: "center", padding: "0 8px", gap: 6, borderBottom: "1px solid #E2E8F0" }}>
      <MetaLogo size={16} /><div style={{ height: 6, width: 44, borderRadius: 3, background: "#C9D3E0" }} />
    </div>
    <div style={{ padding: "8px 10px" }}>
      <div style={{ display: "flex", gap: 3, alignItems: "flex-end", height: 32 }}>
        {[0.5, 0.8, 0.4, 0.9, 0.6, 0.7].map((h, i) => <div key={i} style={{ flex: 1, height: `${h * 100}%`, background: i % 2 ? "#8FB0DE" : META, borderRadius: 2 }} />)}
      </div>
    </div>
  </div>
);
const SnailRacer: React.FC<{ size?: number; lf?: number; face?: string }> = ({ size = 120, lf = 0, face }) => (
  <div style={{ position: "relative", width: size, height: size * 0.66 }}>
    <Snail size={size} lf={lf} />
    {face ? <div style={{ position: "absolute", left: size * 0.16, top: -size * 0.04, zIndex: 3 }}><FaceImg name={face} size={size * 0.54} lf={lf} ring="#C44A3A" /></div> : null}
  </div>
);

const RocketSmoke: React.FC<{ p: number }> = ({ p }) => (
  <div style={{ position: "absolute", inset: 0, zIndex: 60, pointerEvents: "none" }}>
    {Array.from({ length: 28 }, (_, i) => {
      const a = seed(i) * Math.PI * 2;
      const spread = 0.15 + seed(i * 2) * 0.85;
      const dist = spread * p * 720;
      const cx = 540 + Math.cos(a) * dist * (0.7 + seed(i) * 0.8);
      const cy = 820 + Math.sin(a) * dist * 0.72 + p * 100 + spread * 130 * p;
      const sz = (72 + seed(i * 3) * 160) * (0.5 + p * 1.5);
      const op = Math.max(0, 0.85 - p * 0.68) * (0.5 + seed(i * 5) * 0.5);
      const g = 206 + Math.floor(seed(i) * 44);
      return <div key={i} style={{ position: "absolute", left: cx - sz / 2, top: cy - sz / 2, width: sz, height: sz, borderRadius: "50%", background: `radial-gradient(circle at 40% 38%, rgba(${g},${g},${g - 4},${op}), rgba(180,180,186,0) 70%)`, filter: "blur(5px)" }} />;
    })}
    {p < 0.45 ? <div style={{ position: "absolute", left: 420, top: 700, width: 240, height: 240, borderRadius: "50%", background: `radial-gradient(circle, rgba(255,232,160,${0.75 * (1 - p / 0.45)}), transparent 66%)`, filter: "blur(6px)" }} /> : null}
  </div>
);

const HorseRider: React.FC<{ lf: number; size?: number; cos?: any }> = ({ lf, size = 120, cos = {} }) => {
  const u = size / 120; const gallop = Math.abs(Math.sin(lf / 3)) * 6;
  return (
    <div style={{ position: "relative", width: size * 1.5, height: size, transform: `translateY(${-gallop}px)`, filter: "drop-shadow(0 8px 12px rgba(0,0,0,0.35))" }}>
      <div style={{ position: "absolute", left: 20 * u, bottom: 20 * u, width: 112 * u, height: 46 * u, borderRadius: 20 * u, background: grad("#8A5A34", "#5E3C20") }} />
      <div style={{ position: "absolute", left: 120 * u, bottom: 42 * u, width: 26 * u, height: 42 * u, borderRadius: 8 * u, background: grad("#8A5A34", "#5E3C20"), transform: "rotate(-18deg)" }} />
      <div style={{ position: "absolute", left: 132 * u, bottom: 72 * u, width: 36 * u, height: 22 * u, borderRadius: 8 * u, background: grad("#8A5A34", "#5E3C20") }} />
      <div style={{ position: "absolute", left: 158 * u, bottom: 84 * u, width: 8 * u, height: 10 * u, background: "#8A5A34" }} />
      <div style={{ position: "absolute", left: 116 * u, bottom: 62 * u, width: 12 * u, height: 34 * u, background: "#3A2A18", transform: "rotate(-18deg)" }} />
      {[32, 58, 92, 116].map((x, i) => <div key={i} style={{ position: "absolute", left: x * u, bottom: 0, width: 12 * u, height: 24 * u, background: "#5E3C20", transformOrigin: "50% 0%", transform: `rotate(${(i % 2 ? 1 : -1) * gallop * 2}deg)` }} />)}
      <div style={{ position: "absolute", left: 8 * u, bottom: 24 * u, width: 14 * u, height: 32 * u, background: "#3A2A18", borderRadius: 6 * u, transform: "rotate(22deg)" }} />
      <div style={{ position: "absolute", left: 44 * u, bottom: 50 * u }}><Mascot lf={lf} size={size * 0.64} nodAmp={0} nodSpeed={9} cheer={0.4} {...cos} /></div>
    </div>
  );
};
const SpeechBubble: React.FC<{ text: string; color?: string; size?: number }> = ({ text, color = "#3A5C84", size = 18 }) => (
  <div style={{ position: "relative", padding: `${size * 0.4}px ${size * 0.75}px`, borderRadius: 12, background: "#FFFDF8", border: `2.5px solid ${color}`, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: size, color, whiteSpace: "nowrap", boxShadow: "0 6px 14px -6px rgba(10,16,34,0.4)" }}>
    {text}
    <div style={{ position: "absolute", left: 16, bottom: -9, width: 0, height: 0, borderLeft: "7px solid transparent", borderRight: "7px solid transparent", borderTop: `10px solid ${color}` }} />
  </div>
);
// ===== shared sprite prop for AUTOPILOT skits =====
const AdCard: React.FC<{ roas: string; good: boolean; w?: number; strike?: number; pump?: number }> = ({ roas, good, w = 150, strike = 0, pump = 0 }) => (
  <div style={{ width: w, borderRadius: 12, background: good ? "rgba(63,158,116,0.16)" : "rgba(196,74,58,0.16)", border: `2.5px solid ${good ? GREEN : RED}`, padding: "10px 14px", transform: `scale(${1 + pump * 0.3})`, boxShadow: good ? `0 0 ${10 + pump * 20}px ${GREEN}66` : "0 8px 18px -8px rgba(0,0,0,0.5)", position: "relative" }}>
    <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 15, color: "rgba(210,225,250,0.75)" }}>ad set</div>
    <div style={{ fontFamily: mono, fontWeight: 800, fontSize: 30, color: good ? "#8FE0B0" : "#FFB4A6" }}>{roas}</div>
    {strike > 0.1 ? <div style={{ position: "absolute", left: -4, right: -4, top: "54%", height: 4, background: RED, transform: "rotate(-10deg)", boxShadow: `0 0 8px ${RED}` }} /> : null}
  </div>
);

/* ============================================================================
   AUTOPILOT — crafted emoji-replacement props (house style: rects/paths +
   grad() + gold vocabulary F0CB63→D39A2A rim #F6E4A0 + NAVYSH + glow halos).
   Depends only on helpers already in AUTOPILOT: grad, seed, over, GOLD, CLAY,
   GREEN, RED, AMBER, META, SLATE, mono, fraunces, inter, Easing.
   Paste this block right after the AdCard component (~line 386).
   ========================================================================== */

/* -------- shared gold vocabulary (matches the coins/gates in all 4 reels) -- */
const GOLDA = "#F0CB63", GOLDB = "#D39A2A", GRIM = "#F6E4A0"; // rim highlight

/* ===== ROCKET (PRIORITY) — CLONE-style wizard-hat nose cone, all geometry ==
   `lift` adds a flame + thrust glow (COMMANDS $500/day). Without it, a clean
   idle rocket for the FUTURE orbit. ======================================== */
const RocketProp: React.FC<{ size?: number; lift?: boolean; glow?: boolean; lf?: number }> = ({ size = 120, lift = false, glow = false, lf = 0 }) => {
  const u = size / 120;                       // 120px design grid
  const flick = 1 + Math.sin(lf / 2.2) * 0.14;
  return (
    <div style={{ width: size, height: size * 1.5, position: "relative", filter: glow ? `drop-shadow(0 0 ${18 * u}px ${GOLD}) drop-shadow(0 14px 26px rgba(10,16,34,0.45))` : "drop-shadow(0 12px 22px rgba(10,16,34,0.4))" }}>
      {/* nose cone */}
      <div style={{ position: "absolute", left: 30 * u, top: 0, width: 0, height: 0, borderLeft: `${30 * u}px solid transparent`, borderRight: `${30 * u}px solid transparent`, borderBottom: `${44 * u}px solid ${CLAY}` }} />
      <div style={{ position: "absolute", left: 30 * u, top: 8 * u, width: 0, height: 0, borderLeft: `${18 * u}px solid transparent`, borderRight: `${18 * u}px solid transparent`, borderBottom: `${28 * u}px solid #E48F68` }} />
      {/* body (cream capsule, top-lit) */}
      <div style={{ position: "absolute", left: 30 * u, top: 42 * u, width: 60 * u, height: 88 * u, borderRadius: `${14 * u}px ${14 * u}px ${10 * u}px ${10 * u}px`, background: "linear-gradient(180deg,#FBF6EC,#DBCFB6)", border: `${2.5 * u}px solid rgba(40,50,70,0.4)`, boxShadow: `inset ${3 * u}px 0 ${8 * u}px rgba(255,255,255,0.5), inset -${5 * u}px 0 ${10 * u}px rgba(120,100,70,0.28)` }} />
      {/* porthole (Claude clay ring + glass) */}
      <div style={{ position: "absolute", left: 44 * u, top: 60 * u, width: 32 * u, height: 32 * u, borderRadius: "50%", background: "radial-gradient(circle at 38% 34%, #BFE0FF, #5C82B8)", border: `${4 * u}px solid ${CLAY}`, boxShadow: `0 0 ${8 * u}px rgba(217,119,87,0.5), inset 0 ${2 * u}px ${4 * u}px rgba(255,255,255,0.5)` }} />
      {/* body seam + gold band */}
      <div style={{ position: "absolute", left: 30 * u, top: 104 * u, width: 60 * u, height: 6 * u, background: grad(GOLDA, GOLDB), boxShadow: `0 0 ${6 * u}px ${GOLD}` }} />
      {/* fins (css border triangles, clay, shaded) */}
      <div style={{ position: "absolute", left: 4 * u, top: 96 * u, width: 0, height: 0, borderRight: `${28 * u}px solid #B85E3E`, borderTop: `${16 * u}px solid transparent`, borderBottom: `${18 * u}px solid transparent` }} />
      <div style={{ position: "absolute", right: 4 * u, top: 96 * u, width: 0, height: 0, borderLeft: `${28 * u}px solid #C56A47`, borderTop: `${16 * u}px solid transparent`, borderBottom: `${18 * u}px solid transparent` }} />
      {/* flame */}
      {lift && (
        <div style={{ position: "absolute", left: 44 * u, top: 128 * u, transform: `scaleY(${flick})`, transformOrigin: "50% 0%" }}>
          <div style={{ position: "absolute", left: 0, width: 0, height: 0, borderLeft: `${16 * u}px solid transparent`, borderRight: `${16 * u}px solid transparent`, borderTop: `${44 * u}px solid ${GOLD}`, filter: `blur(${0.5 * u}px)` }} />
          <div style={{ position: "absolute", left: 6 * u, width: 0, height: 0, borderLeft: `${10 * u}px solid transparent`, borderRight: `${10 * u}px solid transparent`, borderTop: `${30 * u}px solid ${CLAY}` }} />
          <div style={{ position: "absolute", left: 11 * u, width: 0, height: 0, borderLeft: `${5 * u}px solid transparent`, borderRight: `${5 * u}px solid transparent`, borderTop: `${18 * u}px solid #FFF3D6` }} />
        </div>
      )}
    </div>
  );
};

/* ===== COIN + PUFF (COMMANDS thrust particles) — one prop, `puff` = smoke === */
const CoinPuff: React.FC<{ size?: number; puff?: boolean; lf?: number }> = ({ size = 26, puff = false, lf = 0 }) =>
  puff ? (
    <div style={{ width: size * 1.3, height: size * 1.3, borderRadius: "50%", background: "radial-gradient(circle at 40% 38%, rgba(232,224,210,0.9), rgba(180,170,152,0.15) 68%)", filter: "blur(1.5px)" }} />
  ) : (
    <div style={{ width: size, height: size, borderRadius: "50%", background: grad(GOLDA, GOLDB), border: `2px solid ${GRIM}`, boxShadow: `0 0 10px ${GOLD}`, display: "flex", alignItems: "center", justifyContent: "center", transform: `rotateX(${(lf * 24) % 360}deg)` }}>
      <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: size * 0.62, color: "#7A5410", lineHeight: 1 }}>$</span>
    </div>
  );

/* ===== MONEY STACK (PRIORITY) — SAFETY: coins the guard blocks =============
   3 stacked coins with a rising bill behind. Reads as "money" without emoji. */
const MoneyStack: React.FC<{ size?: number }> = ({ size = 64 }) => {
  const u = size / 64;
  return (
    <div style={{ width: size, height: size * 1.05, position: "relative", filter: "drop-shadow(0 8px 16px rgba(10,16,34,0.4))" }}>
      {/* bill peeking up behind */}
      <div style={{ position: "absolute", left: 12 * u, top: 0, width: 40 * u, height: 26 * u, borderRadius: 4 * u, background: "linear-gradient(180deg,#BEE7C9,#8FCBA1)", border: `${2 * u}px solid #5FA277`, boxShadow: "inset 0 0 6px rgba(255,255,255,0.4)" }}>
        <div style={{ position: "absolute", inset: `${4 * u}px`, borderRadius: 3 * u, border: `${1.5 * u}px dashed rgba(47,126,90,0.6)`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 13 * u, color: "#2F7E5A" }}>$</div>
      </div>
      {/* 3 stacked coins, lightest on top */}
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ position: "absolute", left: 6 * u, top: (20 + i * 13) * u, width: 52 * u, height: 22 * u, borderRadius: "50%", background: grad(i === 0 ? GOLDA : "#EAC258", GOLDB), border: `${2.5 * u}px solid ${GRIM}`, boxShadow: `0 ${3 * u}px ${6 * u}px rgba(122,84,16,0.4)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {i === 0 && <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 14 * u, color: "#7A5410" }}>$</span>}
        </div>
      ))}
    </div>
  );
};

/* ===== VAULT LOCK (PRIORITY) — SAFETY: the spend padlock on a vault plate ===
   Padlock (shackle path + navy body + gold keyhole) seated on a bolted vault
   plate, with a green safety glow. ======================================== */
const VaultLock: React.FC<{ size?: number; glow?: boolean }> = ({ size = 200, glow = true }) => {
  const u = size / 200;
  return (
    <div style={{ width: size, height: size, position: "relative", filter: glow ? `drop-shadow(0 0 ${24 * u}px ${GREEN})` : "none" }}>
      {/* vault plate */}
      <div style={{ position: "absolute", left: 20 * u, top: 34 * u, width: 160 * u, height: 150 * u, borderRadius: 22 * u, background: grad("#3A4E74", "#26344F"), border: `${3 * u}px solid rgba(150,175,220,0.4)`, boxShadow: NAVYSH }} />
      {/* corner bolts */}
      {[[36, 50], [148, 50], [36, 158], [148, 158]].map(([x, y], i) => (
        <div key={i} style={{ position: "absolute", left: x * u, top: y * u, width: 14 * u, height: 14 * u, borderRadius: "50%", background: "radial-gradient(circle at 35% 30%,#B7C6E0,#5E6E8C)", border: `${2 * u}px solid #7E92BA` }} />
      ))}
      {/* padlock body */}
      <div style={{ position: "absolute", left: 62 * u, top: 92 * u, width: 76 * u, height: 62 * u, borderRadius: 14 * u, background: grad(GOLDA, GOLDB), border: `${3 * u}px solid ${GRIM}`, boxShadow: `0 ${6 * u}px ${14 * u}px rgba(122,84,16,0.45), inset 0 ${2 * u}px 0 rgba(255,255,255,0.4)` }} />
      {/* shackle (SVG path, metallic) */}
      <svg viewBox="0 0 200 200" width={size} height={size} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
        <path d={`M ${76 * u} ${96 * u} L ${76 * u} ${76 * u} A ${24 * u} ${24 * u} 0 0 1 ${124 * u} ${76 * u} L ${124 * u} ${96 * u}`} fill="none" stroke="#8FA2C4" strokeWidth={12 * u} strokeLinecap="round" />
        <path d={`M ${76 * u} ${96 * u} L ${76 * u} ${76 * u} A ${24 * u} ${24 * u} 0 0 1 ${124 * u} ${76 * u}`} fill="none" stroke="#C3D0E6" strokeWidth={4 * u} strokeLinecap="round" />
      </svg>
      {/* keyhole */}
      <div style={{ position: "absolute", left: 92 * u, top: 108 * u, width: 16 * u, height: 16 * u, borderRadius: "50%", background: "#5E4310" }} />
      <div style={{ position: "absolute", left: 96 * u, top: 118 * u, width: 8 * u, height: 20 * u, background: "#5E4310", borderRadius: 2 * u }} />
    </div>
  );
};

/* ===== CHAIN LINK (SAFETY: "$0 spent" flanked by chain) — inline, tiny ===== */
const ChainLink: React.FC<{ size?: number }> = ({ size = 22 }) => (
  <span style={{ display: "inline-block", width: size, height: size * 0.62, borderRadius: size, border: `${size * 0.2}px solid ${GRIM}`, background: "transparent", boxShadow: `inset 0 0 ${size * 0.15}px ${GOLDB}, 0 0 ${size * 0.2}px ${GOLD}66`, verticalAlign: "middle" }} />
);

/* ===== BAN STRIKE (PRIORITY) — NOBAN stamp + SAFETY no-spend =============== */
const BanStrike: React.FC<{ size?: number }> = ({ size = 150 }) => {
  const u = size / 150;
  return (
    <div style={{ width: size, height: size, position: "relative", filter: `drop-shadow(0 0 ${14 * u}px ${RED}) drop-shadow(0 8px 16px rgba(0,0,0,0.4))` }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: `${16 * u}px solid ${RED}`, background: "rgba(196,74,58,0.12)", boxShadow: `inset 0 0 ${10 * u}px rgba(196,74,58,0.4)` }} />
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: `${3 * u}px solid #E58072`, opacity: 0.6 }} />
      {/* the slash */}
      <div style={{ position: "absolute", left: 20 * u, top: (75 - 8) * u, width: 110 * u, height: 16 * u, borderRadius: 8 * u, background: RED, transform: "rotate(-45deg)", transformOrigin: "50% 50%", boxShadow: `0 0 ${8 * u}px ${RED}` }} />
    </div>
  );
};

/* ===== SHIELD BADGE (PRIORITY) — NOBAN "SAFE" ============================== */
const ShieldBadge: React.FC<{ size?: number; label?: string }> = ({ size = 120, label = "SAFE" }) => {
  const u = size / 120;
  return (
    <div style={{ width: size, textAlign: "center", filter: `drop-shadow(0 0 ${18 * u}px ${GREEN})` }}>
      <svg viewBox="0 0 120 138" width={size} height={size * 138 / 120} style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id="shg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#54B98C" /><stop offset="1" stopColor="#2E7B58" /></linearGradient>
        </defs>
        {/* shield outer */}
        <path d="M60 4 L112 24 L112 66 C112 100 88 122 60 134 C32 122 8 100 8 66 L8 24 Z" fill="url(#shg)" stroke="#8FE0B0" strokeWidth={4} />
        {/* inner bevel */}
        <path d="M60 16 L100 32 L100 66 C100 92 82 110 60 120 C38 110 20 92 20 66 L20 32 Z" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth={3} />
        {/* check */}
        <path d="M40 66 L54 82 L84 46" fill="none" stroke="#F4FBF6" strokeWidth={11} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {label && <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 36 * u, color: "#8FE0B0", marginTop: -6 * u }}>{label}</div>}
    </div>
  );
};

/* ===== SHADES (NOBAN bouncer) — geometric sunglasses ====================== */
const Shades: React.FC<{ size?: number }> = ({ size = 40 }) => {
  const u = size / 40;
  return (
    <svg viewBox="0 0 60 26" width={size * 1.5} height={size} style={{ filter: "drop-shadow(0 3px 5px rgba(0,0,0,0.4))" }}>
      <rect x={2} y={6} width={24} height={16} rx={5} fill="#14161C" stroke="#3A4456" strokeWidth={2} />
      <rect x={34} y={6} width={24} height={16} rx={5} fill="#14161C" stroke="#3A4456" strokeWidth={2} />
      <rect x={26} y={9} width={8} height={4} fill="#3A4456" />
      <rect x={6} y={9} width={9} height={4} rx={2} fill="rgba(120,170,230,0.55)" />
      <rect x={38} y={9} width={9} height={4} rx={2} fill="rgba(120,170,230,0.55)" />
    </svg>
  );
};

/* ===== SKULL TAG (NOBAN "SketchyBot" label glyph) — tiny inline mark ======= */
const SkullTag: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg viewBox="0 0 20 20" width={size} height={size} style={{ verticalAlign: "middle" }}>
    <path d="M10 2 C4 2 2 6 2 10 C2 13 4 14 4 16 L16 16 C16 14 18 13 18 10 C18 6 16 2 10 2 Z" fill="#C9D2E4" />
    <rect x={5} y={9} width={4} height={5} rx={2} fill="#1A2233" />
    <rect x={11} y={9} width={4} height={5} rx={2} fill="#1A2233" />
    <rect x={8} y={15} width={4} height={3} fill="#1A2233" />
  </svg>
);

/* ===== HAND STOP (SAFETY "needs YOU") — palm from rects ==================== */
const HandStop: React.FC<{ size?: number }> = ({ size = 40 }) => {
  const u = size / 40;
  return (
    <svg viewBox="0 0 40 44" width={size} height={size * 1.1} style={{ filter: "drop-shadow(0 3px 5px rgba(0,0,0,0.35))" }}>
      {/* fingers */}
      {[6, 13, 20, 27].map((x, i) => <rect key={i} x={x} y={4 + (i === 0 || i === 3 ? 4 : 0)} width={6} height={20 - (i === 0 || i === 3 ? 4 : 0)} rx={3} fill="#E8B48F" stroke="#C48F6A" strokeWidth={1.5} />)}
      {/* thumb */}
      <rect x={2} y={20} width={7} height={12} rx={3.5} fill="#E8B48F" stroke="#C48F6A" strokeWidth={1.5} transform="rotate(-28 5 26)" />
      {/* palm */}
      <rect x={5} y={20} width={28} height={20} rx={8} fill="#E8B48F" stroke="#C48F6A" strokeWidth={1.5} />
    </svg>
  );
};

/* ===== PEEK EYES (REHOOK "the quiet part") — two lidded eyes ============== */
const PeekEyes: React.FC<{ size?: number; lf?: number }> = ({ size = 64, lf = 0 }) => {
  const u = size / 64;
  const look = Math.sin(lf / 12) * 3 * u;
  return (
    <div style={{ display: "flex", gap: 10 * u, filter: "drop-shadow(0 4px 8px rgba(10,16,34,0.4))" }}>
      {[0, 1].map((i) => (
        <div key={i} style={{ width: 52 * u, height: 34 * u, borderRadius: "50%", background: "linear-gradient(180deg,#FFFFFF,#E6E2D8)", border: `${3 * u}px solid ${SLATE}`, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", left: 18 * u + look, top: 8 * u, width: 18 * u, height: 18 * u, borderRadius: "50%", background: "radial-gradient(circle at 38% 34%,#5C82B8,#1A2233)" }}>
            <div style={{ position: "absolute", left: 4 * u, top: 3 * u, width: 5 * u, height: 5 * u, borderRadius: "50%", background: "#fff" }} />
          </div>
          {/* upper lid */}
          <div style={{ position: "absolute", left: 0, right: 0, top: -14 * u, height: 16 * u, background: CLAY, borderRadius: "0 0 26px 26px" }} />
        </div>
      ))}
    </div>
  );
};

/* ===== PHONE with CLAUDE CHAT (PRIORITY) — REHOOK / optionally HOOK ========
   Bezel + notch + orange Claude header + one user bubble + one reply. ====== */
const PhoneClaude: React.FC<{ size?: number; lf?: number }> = ({ size = 124, lf = 0 }) => {
  const u = size / 124;
  return (
    <div style={{ width: size, height: size * 1.9, borderRadius: 26 * u, background: "linear-gradient(160deg,#20283A,#0E1420)", border: `${5 * u}px solid #2A3345`, boxShadow: NAVYSH, padding: 10 * u, position: "relative" }}>
      {/* notch */}
      <div style={{ position: "absolute", left: "50%", top: 8 * u, transform: "translateX(-50%)", width: 40 * u, height: 8 * u, borderRadius: 999, background: "#000" }} />
      {/* header */}
      <div style={{ marginTop: 10 * u, height: 34 * u, borderRadius: 10 * u, background: grad("#E9825C", "#C7541F"), display: "flex", alignItems: "center", gap: 6 * u, padding: `0 ${9 * u}px` }}>
        <div style={{ width: 18 * u, height: 18 * u, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {/* mini Claude burst */}
          <svg viewBox="-100 -100 200 200" width={13 * u} height={13 * u}>
            {Array.from({ length: 8 }, (_, i) => <path key={i} d="M -8 -14 L 8 -14 L 10 -78 L -10 -78 Z" fill="#D97757" transform={`rotate(${i * 45})`} />)}
            <circle r={20} fill="#D97757" />
          </svg>
        </div>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 13 * u, color: "#fff" }}>Claude</span>
      </div>
      {/* user bubble */}
      <div style={{ marginTop: 12 * u, marginLeft: "auto", width: "78%", padding: `${7 * u}px ${9 * u}px`, borderRadius: 12 * u, borderBottomRightRadius: 3 * u, background: grad("#E9825C", "#C7541F"), fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 12 * u, color: "#fff" }}>scale the winners</div>
      {/* reply bubble */}
      <div style={{ marginTop: 8 * u, width: "62%", padding: `${7 * u}px ${9 * u}px`, borderRadius: 12 * u, borderBottomLeftRadius: 3 * u, background: "#20283A", fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 12 * u, color: "#8FE0B0" }}>on it ✓</div>
      {/* typing dots */}
      <div style={{ marginTop: 8 * u, marginLeft: 6 * u, display: "flex", gap: 4 * u }}>
        {[0, 1, 2].map((i) => <div key={i} style={{ width: 6 * u, height: 6 * u, borderRadius: "50%", background: "#4A566E", opacity: 0.4 + 0.6 * Math.abs(Math.sin(lf / 6 + i)) }} />)}
      </div>
    </div>
  );
};

/* ===== TRASH CAN (COMMANDS "paused" bin) ================================== */
const TrashCan: React.FC<{ size?: number }> = ({ size = 70 }) => {
  const u = size / 70;
  return (
    <div style={{ width: size, height: size * 1.15, position: "relative", filter: "drop-shadow(0 8px 14px rgba(10,16,34,0.4))" }}>
      {/* lid + handle */}
      <div style={{ position: "absolute", left: 12 * u, top: 0, width: 28 * u, height: 5 * u, borderRadius: 999, background: "#5A6478", margin: "0 auto", left: "50%", transform: "translateX(-50%)" }} />
      <div style={{ position: "absolute", left: 4 * u, top: 6 * u, width: 62 * u, height: 10 * u, borderRadius: 5 * u, background: grad("#7E8AA2", "#5A6478"), border: `${2 * u}px solid #48526A` }} />
      {/* body (tapered) */}
      <div style={{ position: "absolute", left: 9 * u, top: 16 * u, width: 52 * u, height: 56 * u, borderRadius: `0 0 ${10 * u}px ${10 * u}px`, background: grad("#8A96AE", "#616B82"), border: `${2 * u}px solid #48526A`, clipPath: "polygon(4% 0, 96% 0, 88% 100%, 12% 100%)" }}>
        {/* ribs */}
        {[0, 1, 2].map((i) => <div key={i} style={{ position: "absolute", left: `${28 + i * 20}%`, top: 6 * u, width: 3 * u, height: 44 * u, background: "rgba(30,38,54,0.35)", borderRadius: 2 }} />)}
      </div>
    </div>
  );
};

/* ===== ALARM CLOCK (BEFORE "2h/day") ===================================== */
const AlarmClock: React.FC<{ size?: number; lf?: number }> = ({ size = 60, lf = 0 }) => {
  const u = size / 60;
  const tick = Math.sin(lf / 3) * 8;
  return (
    <div style={{ width: size, height: size * 1.2, position: "relative", transform: `rotate(${tick}deg)`, filter: "drop-shadow(0 6px 12px rgba(10,16,34,0.4))" }}>
      {/* bells */}
      <div style={{ position: "absolute", left: 4 * u, top: 0, width: 16 * u, height: 12 * u, borderRadius: "50% 50% 0 0", background: grad(GOLDA, GOLDB), border: `${2 * u}px solid ${GRIM}`, transform: "rotate(-24deg)" }} />
      <div style={{ position: "absolute", right: 4 * u, top: 0, width: 16 * u, height: 12 * u, borderRadius: "50% 50% 0 0", background: grad(GOLDA, GOLDB), border: `${2 * u}px solid ${GRIM}`, transform: "rotate(24deg)" }} />
      {/* face */}
      <div style={{ position: "absolute", left: 6 * u, top: 8 * u, width: 48 * u, height: 48 * u, borderRadius: "50%", background: "radial-gradient(circle at 40% 34%,#FBF6EC,#E2D6BE)", border: `${4 * u}px solid ${CLAY}`, boxShadow: `0 0 ${8 * u}px rgba(210,114,78,0.4)` }}>
        {/* hands (past showing ~2h) */}
        <div style={{ position: "absolute", left: "50%", top: "50%", width: 3 * u, height: 15 * u, background: RED, borderRadius: 2, transformOrigin: "50% 100%", transform: "translate(-50%,-100%) rotate(60deg)" }} />
        <div style={{ position: "absolute", left: "50%", top: "50%", width: 3 * u, height: 11 * u, background: "#3A2A18", borderRadius: 2, transformOrigin: "50% 100%", transform: "translate(-50%,-100%) rotate(-20deg)" }} />
        <div style={{ position: "absolute", left: "50%", top: "50%", width: 5 * u, height: 5 * u, borderRadius: "50%", background: "#3A2A18", transform: "translate(-50%,-50%)" }} />
      </div>
    </div>
  );
};

/* ===== HAMMER (FUTURE agent building) ===================================== */
const HammerProp: React.FC<{ size?: number }> = ({ size = 40 }) => {
  const u = size / 40;
  return (
    <svg viewBox="0 0 44 44" width={size} height={size} style={{ filter: "drop-shadow(0 4px 7px rgba(10,16,34,0.4))" }}>
      {/* handle */}
      <rect x={20} y={16} width={7} height={26} rx={3} fill="#8A6844" stroke="#5E4630" strokeWidth={1.5} transform="rotate(20 23 30)" />
      {/* head */}
      <rect x={6} y={8} width={30} height={13} rx={3} fill="url(#hmg)" stroke="#3A4456" strokeWidth={2} transform="rotate(20 21 14)" />
      <defs><linearGradient id="hmg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#B7C1D2" /><stop offset="1" stopColor="#79839A" /></linearGradient></defs>
    </svg>
  );
};

/* ===== TARGET (PRIORITY) — FUTURE audience targeting ====================== */
const TargetProp: React.FC<{ size?: number }> = ({ size = 52 }) => {
  const u = size / 52;
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", position: "relative", filter: "drop-shadow(0 6px 10px rgba(10,16,34,0.4))" }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#F4EEE2", border: `${2 * u}px solid #C9BCA4` }} />
      <div style={{ position: "absolute", inset: 6 * u, borderRadius: "50%", background: grad("#E9825C", "#C7541F") }} />
      <div style={{ position: "absolute", inset: 13 * u, borderRadius: "50%", background: "#F4EEE2" }} />
      <div style={{ position: "absolute", inset: 19 * u, borderRadius: "50%", background: RED, boxShadow: `0 0 ${6 * u}px ${RED}` }} />
      {/* dart */}
      <div style={{ position: "absolute", left: "50%", top: "50%", width: 3 * u, height: 4 * u, borderRadius: 2, background: "#F6E4A0", transform: "translate(-50%,-50%)" }} />
    </div>
  );
};

/* ===== MEGAPHONE (FUTURE distribution) =================================== */
const MegaphoneProp: React.FC<{ size?: number }> = ({ size = 52 }) => {
  const u = size / 52;
  return (
    <div style={{ width: size, height: size, position: "relative", filter: "drop-shadow(0 6px 10px rgba(10,16,34,0.4))" }}>
      {/* cone */}
      <div style={{ position: "absolute", left: 4 * u, top: 14 * u, width: 0, height: 0, borderTop: `${13 * u}px solid transparent`, borderBottom: `${13 * u}px solid transparent`, borderRight: `${30 * u}px solid ${CLAY}`, transform: "rotate(-8deg)" }} />
      <div style={{ position: "absolute", left: 30 * u, top: 16 * u, width: 12 * u, height: 20 * u, borderRadius: 4 * u, background: grad("#E9825C", "#C7541F"), border: `${2 * u}px solid #B85E3E`, transform: "rotate(-8deg)" }} />
      {/* sound waves */}
      {[0, 1, 2].map((i) => <div key={i} style={{ position: "absolute", right: 2 * u, top: (16 + i * 6) * u, width: (6 + i * 3) * u, height: (6 + i * 3) * u, borderRight: `${2.5 * u}px solid ${GOLD}`, borderTop: `${2.5 * u}px solid ${GOLD}`, borderRadius: "0 50% 0 0", opacity: 0.8 - i * 0.2 }} />)}
    </div>
  );
};

/* ===== CREATIVE TILE (FUTURE "image/creative") — a little poster ========== */
const CreativeTile: React.FC<{ size?: number }> = ({ size = 52 }) => {
  const u = size / 52;
  return (
    <div style={{ width: size, height: size, borderRadius: 8 * u, background: PAPER, border: `${2.5 * u}px solid #C9BCA4`, padding: 5 * u, position: "relative", filter: "drop-shadow(0 6px 10px rgba(10,16,34,0.4))", overflow: "hidden" }}>
      {/* sky */}
      <div style={{ position: "absolute", inset: 5 * u, borderRadius: 4 * u, background: "linear-gradient(180deg,#BFE0FF,#EAF4FF)" }} />
      {/* sun */}
      <div style={{ position: "absolute", left: 10 * u, top: 10 * u, width: 10 * u, height: 10 * u, borderRadius: "50%", background: grad(GOLDA, GOLDB), boxShadow: `0 0 ${5 * u}px ${GOLD}` }} />
      {/* mountains */}
      <div style={{ position: "absolute", left: 5 * u, bottom: 5 * u, width: 0, height: 0, borderLeft: `${14 * u}px solid transparent`, borderRight: `${14 * u}px solid transparent`, borderBottom: `${18 * u}px solid ${CLAY}` }} />
      <div style={{ position: "absolute", right: 5 * u, bottom: 5 * u, width: 0, height: 0, borderLeft: `${12 * u}px solid transparent`, borderRight: `${12 * u}px solid transparent`, borderBottom: `${14 * u}px solid #B85E3E` }} />
    </div>
  );
};

/* ===== DRINK (FUTURE relax) — cocktail glass ============================= */
const DrinkProp: React.FC<{ size?: number }> = ({ size = 40 }) => {
  const u = size / 40;
  return (
    <div style={{ width: size, height: size * 1.3, position: "relative", filter: "drop-shadow(0 4px 8px rgba(10,16,34,0.35))" }}>
      {/* bowl */}
      <div style={{ position: "absolute", left: 2 * u, top: 0, width: 0, height: 0, borderLeft: `${18 * u}px solid transparent`, borderRight: `${18 * u}px solid transparent`, borderTop: `${20 * u}px solid`, borderTopColor: "rgba(230,240,255,0.35)" }} />
      {/* liquid */}
      <div style={{ position: "absolute", left: 6 * u, top: 2 * u, width: 0, height: 0, borderLeft: `${14 * u}px solid transparent`, borderRight: `${14 * u}px solid transparent`, borderTop: `${14 * u}px solid ${CLAY}` }} />
      {/* cherry + pick */}
      <div style={{ position: "absolute", left: 26 * u, top: -6 * u, width: 2 * u, height: 14 * u, background: "#9A8F78", transform: "rotate(24deg)" }} />
      <div style={{ position: "absolute", left: 28 * u, top: -8 * u, width: 8 * u, height: 8 * u, borderRadius: "50%", background: RED, boxShadow: `0 0 ${4 * u}px ${RED}88` }} />
      {/* stem + base */}
      <div style={{ position: "absolute", left: "50%", top: 20 * u, width: 3 * u, height: 22 * u, background: "rgba(230,240,255,0.4)", transform: "translateX(-50%)" }} />
      <div style={{ position: "absolute", left: "50%", bottom: 0, width: 24 * u, height: 4 * u, borderRadius: 999, background: "rgba(230,240,255,0.4)", transform: "translateX(-50%)" }} />
    </div>
  );
};

/* ===== BEACH VIGNETTE (PRIORITY) — FUTURE relax base ======================
   Umbrella + sun-lounger sand strip. Sits low behind the walking mascot. == */
const BeachVignette: React.FC<{ size?: number }> = ({ size = 90 }) => {
  const u = size / 90;
  return (
    <div style={{ width: size, height: size * 0.7, position: "relative", filter: "drop-shadow(0 8px 14px rgba(10,16,34,0.35))" }}>
      {/* sand mound */}
      <div style={{ position: "absolute", left: 0, bottom: 0, width: size, height: 20 * u, borderRadius: "50% 50% 8px 8px / 70% 70% 8px 8px", background: grad("#F0DFA8", "#D9C081") }} />
      {/* umbrella pole */}
      <div style={{ position: "absolute", left: 40 * u, bottom: 8 * u, width: 4 * u, height: 40 * u, background: "#9A8F78", transform: "rotate(8deg)", transformOrigin: "50% 100%" }} />
      {/* umbrella canopy (striped, css cone) */}
      <div style={{ position: "absolute", left: 14 * u, top: 0, width: 56 * u, height: 26 * u, borderRadius: "50% 50% 0 0", background: `repeating-conic-gradient(from 200deg at 50% 100%, ${CLAY} 0deg 20deg, #FBF6EC 20deg 40deg)`, boxShadow: `0 ${3 * u}px ${8 * u}px rgba(10,16,34,0.3)` }} />
      {/* lounger */}
      <div style={{ position: "absolute", right: 4 * u, bottom: 6 * u, width: 34 * u, height: 8 * u, borderRadius: 4 * u, background: grad("#E9825C", "#C7541F") }} />
      <div style={{ position: "absolute", right: 26 * u, bottom: 6 * u, width: 8 * u, height: 16 * u, borderRadius: 4 * u, background: grad("#E9825C", "#C7541F"), transform: "rotate(-32deg)", transformOrigin: "50% 100%" }} />
    </div>
  );
};
/* ===== EXTRA crafted props for AUTOPILOT (house style) ===== */
/* red notification badge — HOOK chaos (pings/alerts overload) */
const AlertBadge: React.FC<{ n?: string; size?: number }> = ({ n = "!", size = 52 }) => {
  const u = size / 52;
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: grad("#E8604A", "#BE3220"), border: `${3 * u}px solid #F2A99B`, boxShadow: `0 0 ${11 * u}px ${RED}, 0 ${8 * u}px ${16 * u}px -6px rgba(0,0,0,0.5)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 24 * u, color: "#fff" }}>{n}</span>
    </div>
  );
};
/* gold connector plug — REVEAL cable head */
const PlugProp: React.FC<{ size?: number }> = ({ size = 40 }) => {
  const u = size / 40;
  return (
    <div style={{ width: size, height: size * 0.8, position: "relative", filter: `drop-shadow(0 0 ${6 * u}px ${GOLD})` }}>
      <div style={{ position: "absolute", left: 10 * u, top: 5 * u, width: 24 * u, height: 22 * u, borderRadius: 5 * u, background: grad(GOLDA, GOLDB), border: `${2 * u}px solid ${GRIM}`, boxShadow: `inset 0 ${2 * u}px 0 rgba(255,255,255,0.4)` }} />
      <div style={{ position: "absolute", left: 0, top: 9 * u, width: 12 * u, height: 4 * u, borderRadius: 2, background: grad("#D7DEEA", "#9AA6BA") }} />
      <div style={{ position: "absolute", left: 0, top: 17 * u, width: 12 * u, height: 4 * u, borderRadius: 2, background: grad("#D7DEEA", "#9AA6BA") }} />
    </div>
  );
};
/* two-bar pause glyph — COMMANDS paused markers */
const PauseIcon: React.FC<{ size?: number }> = ({ size = 26 }) => {
  const u = size / 26;
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: "rgba(196,74,58,0.9)", border: `${2 * u}px solid #F2A99B`, boxShadow: `0 0 ${6 * u}px ${RED}`, display: "flex", alignItems: "center", justifyContent: "center", gap: 3 * u }}>
      <div style={{ width: 4 * u, height: 12 * u, borderRadius: 1, background: "#fff" }} />
      <div style={{ width: 4 * u, height: 12 * u, borderRadius: 1, background: "#fff" }} />
    </div>
  );
};
/* tiny paid-SaaS app tile — REHOOK pricey-tools cards */
const AppTile: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <div style={{ width: size, height: size, borderRadius: size * 0.28, background: grad("#5A6E9C", "#3A4E74"), border: "1.5px solid rgba(150,175,220,0.5)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 5px -1px rgba(0,0,0,0.45)" }}>
    <div style={{ width: size * 0.42, height: size * 0.42, borderRadius: 2, background: grad(GOLDA, GOLDB) }} />
  </div>
);

// ===== v6 set-pieces: countdown ring, snail, growing Meta mansion =====
const CountdownRing: React.FC<{ p: number; vanish: number; size?: number; label?: string }> = ({ p, vanish, size = 210, label }) => (
  <div style={{ width: size, height: size, position: "relative", opacity: 1 - vanish, transform: `scale(${1 + vanish * 0.5}) rotate(${vanish * 220}deg)`, filter: `drop-shadow(0 0 22px ${META})` }}>
    <div style={{ position: "absolute", inset: size * 0.15, borderRadius: "50%", background: "radial-gradient(circle, #15274A, #0A1220)", border: "2px solid rgba(120,150,210,0.35)", boxShadow: "inset 0 0 24px rgba(0,0,0,0.5)" }} />
    <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "rgba(120,150,210,0.18)", WebkitMask: "radial-gradient(circle, transparent 73%, #000 74%)", mask: "radial-gradient(circle, transparent 73%, #000 74%)" }} />
    <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: `conic-gradient(from -90deg, ${META}, #37C6FF ${p * 360}deg, transparent ${p * 360}deg, transparent)`, WebkitMask: "radial-gradient(circle, transparent 73%, #000 74%)", mask: "radial-gradient(circle, transparent 73%, #000 74%)" }} />
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: size * 0.34, color: "#EAF2FF", lineHeight: 1, textShadow: `0 0 16px ${META}` }}>{Math.max(0, Math.ceil(p * 60))}</div>
      {label ? <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: size * 0.09, color: "rgba(190,205,235,0.82)", marginTop: 2 }}>{label}</div> : null}
    </div>
  </div>
);
const Snail: React.FC<{ size?: number; lf?: number }> = ({ size = 130, lf = 0 }) => {
  const u = size / 130; const wob = Math.sin(lf / 5) * 2;
  return (
    <div style={{ width: size, height: size * 0.66, position: "relative", filter: "drop-shadow(0 8px 14px rgba(10,16,34,0.4))" }}>
      <div style={{ position: "absolute", left: 0, bottom: 0, width: 92 * u, height: 26 * u, borderRadius: `${18 * u}px ${18 * u}px 4px 4px`, background: grad("#C7E07A", "#8FB84E"), transform: `translateY(${wob}px)` }} />
      <div style={{ position: "absolute", left: 74 * u, bottom: 6 * u, width: 30 * u, height: 26 * u, borderRadius: "50% 50% 40% 40%", background: grad("#C7E07A", "#8FB84E") }} />
      <div style={{ position: "absolute", left: 82 * u, bottom: 28 * u, width: 3 * u, height: 16 * u, background: "#8FB84E", transformOrigin: "50% 100%", transform: "rotate(-12deg)" }}><div style={{ position: "absolute", top: -6 * u, left: -3 * u, width: 9 * u, height: 9 * u, borderRadius: "50%", background: "#2A2A30" }} /></div>
      <div style={{ position: "absolute", left: 92 * u, bottom: 28 * u, width: 3 * u, height: 16 * u, background: "#8FB84E", transformOrigin: "50% 100%", transform: "rotate(12deg)" }}><div style={{ position: "absolute", top: -6 * u, left: -3 * u, width: 9 * u, height: 9 * u, borderRadius: "50%", background: "#2A2A30" }} /></div>
      <div style={{ position: "absolute", left: 16 * u, bottom: 8 * u, width: 60 * u, height: 60 * u, borderRadius: "50%", background: "conic-gradient(from 200deg, #E9A65C, #C77A34, #E9A65C)", border: `${3 * u}px solid #A6631F`, boxShadow: `inset 0 0 ${10 * u}px rgba(120,60,10,0.5)` }}>
        <div style={{ position: "absolute", inset: 13 * u, borderRadius: "50%", border: `${3 * u}px solid rgba(166,99,31,0.7)` }} />
        <div style={{ position: "absolute", inset: 24 * u, borderRadius: "50%", border: `${3 * u}px solid rgba(166,99,31,0.7)` }} />
      </div>
    </div>
  );
};
const Mansion: React.FC<{ grow: number }> = ({ grow }) => {
  const floors = Math.max(1, Math.min(4, Math.floor(grow * 4) + 1)); const fh = 48; const W = 300;
  return (
    <div style={{ position: "relative", width: W, height: 44 + floors * fh, filter: "drop-shadow(0 16px 26px rgba(10,16,34,0.45))" }}>
      <div style={{ position: "absolute", left: -12, top: 4, width: 0, height: 0, borderLeft: `${W / 2 + 12}px solid transparent`, borderRight: `${W / 2 + 12}px solid transparent`, borderBottom: `42px solid ${METALO}` }} />
      <div style={{ position: "absolute", left: W / 2 - 22, top: -20, zIndex: 3 }}><div style={{ padding: 6, borderRadius: 12, background: "#fff", border: `3px solid ${META}` }}><MetaLogo size={34} /></div></div>
      {Array.from({ length: floors }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: 20, top: 44 + i * fh, width: W - 40, height: fh - 4, background: grad("#DDE7F5", "#B9CBE6"), border: `2px solid ${META}` }}>
          {[0, 1, 2, 3].map((w) => <div key={w} style={{ position: "absolute", left: 16 + w * 62, top: 10, width: 42, height: fh - 26, background: grad("#8FC0FF", "#3B7BE0"), border: "2px solid #2C5AA8", borderRadius: 3 }} />)}
        </div>
      ))}
      <div style={{ position: "absolute", left: W / 2 - 22, top: 44 + (floors - 1) * fh + 2, width: 44, height: fh - 8, background: grad("#2C5AA8", "#16336B"), borderRadius: "6px 6px 0 0" }} />
    </div>
  );
};

const WIN = "#FBFAF5";
// ============================ MINT SCENES (sprite, dark cinematic)

const ScreenHead: React.FC<{ lf: number; big: string; clay: string; chip?: boolean }> = ({ lf, big, clay, chip = true }) => { const p = over(lf, 0, fr(0.4), Easing.out(Easing.back(1.5))); return (<>
  {chip && (
  <div style={{ position: "absolute", right: 26, top: 22, zIndex: 46, transform: `scale(${1 + 0.035 * Math.abs(Math.sin(lf / 6))})`, display: "flex", alignItems: "center", gap: 7, padding: "7px 14px", borderRadius: 12, background: "linear-gradient(180deg,#E4643F,#B8351F)", border: "2px solid #FFD9A0", boxShadow: "0 6px 16px rgba(0,0,0,0.5), 0 0 12px rgba(228,100,63,0.55)" }}>
    <span style={{ fontSize: 15 }}>⏳</span>
    <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 15, color: "#FFFFFF", letterSpacing: 0.3 }}>FABLE 5 FREE · 4 DAYS</span>
  </div>)}
  <div style={{ position: "absolute", left: 0, right: 0, top: 70, textAlign: "center", zIndex: 46, transform: `scale(${p})`, opacity: p }}><span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 58, color: "#F4EEDF", textShadow: "0 3px 12px rgba(0,0,0,0.7), 0 0 10px rgba(0,0,0,0.5)" }}>{big} <span style={{ color: "#F0A878" }}>{clay}</span></span></div>
</>); };

// Big deadline countdown for the HOOK — full-opacity animation palette, ticking
const BigCountdown: React.FC<{ lf: number }> = ({ lf }) => {
  const p = over(lf, fr(0.66), fr(0.42), Easing.out(Easing.back(1.4)));
  // clean, readable alarm countdown: ticks down one number every ~4 frames
  const cs = String(59 - (Math.floor(lf / 4) % 60)).padStart(2, "0");
  const pulse = 0.5 + 0.5 * Math.sin(lf / 4.2);          // alarm blink
  const RED1 = "#FF2A17", RED2 = "#FF3623";              // true alarm-red (border, header)
  const cells = [
    { v: "04", l: "DAYS" },
    { v: "23", l: "HRS" },
    { v: "59", l: "MIN" },
    { v: cs, l: "SEC" },
  ];
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 150, display: "flex", flexDirection: "column", alignItems: "center", zIndex: 45, transform: `scale(${p})`, opacity: p }}>
      <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 9 }}>
        <span style={{ fontSize: 26, filter: `drop-shadow(0 0 8px rgba(255,42,22,${0.6 + pulse * 0.4}))` }}>⏰</span>
        <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 30, color: "#FF3E2A", letterSpacing: 0.5, textShadow: `0 2px 10px rgba(0,0,0,0.7), 0 0 13px rgba(255,42,22,${0.5 + pulse * 0.4})` }}>FREE FABLE 5 ENDS IN</span>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        {cells.map((c, i) => {
          const hot = i === 3; // seconds cell blinks brightest
          return (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: 96, height: 78, borderRadius: 12, background: "linear-gradient(180deg,#210A08,#100403)", border: `2.5px solid ${RED1}`, boxShadow: `0 8px 20px rgba(0,0,0,0.55), inset 0 2px 0 rgba(255,110,90,0.14), 0 0 ${hot ? 18 + pulse * 14 : 13}px rgba(255,42,22,${hot ? 0.6 + pulse * 0.4 : 0.5})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: mono, fontWeight: 800, fontSize: 44, color: hot ? "#FF5238" : "#FF3E2A", letterSpacing: -1, textShadow: `0 0 13px rgba(255,42,22,${hot ? 0.9 : 0.7}), 0 0 5px rgba(255,42,22,0.7), 0 2px 4px rgba(0,0,0,0.5)` }}>{c.v}</span>
              </div>
              <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 12, color: "#E8998C", letterSpacing: 2, marginTop: 6 }}>{c.l}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const HookScene: React.FC<{ lf: number }> = ({ lf }) => {
  // ===== TIMELINE (30fps, ~5.75s) =====
  // 0.0-0.55 : Fable CRASHES down from the sky into the piles (pattern interrupt)
  // 0.55-3.2 : Fable wields the giant gold cursor, SWEEPS the piles away (cards explode, checks rain)
  // 3.2-3.6  : CLEARED flash
  // 3.6-5.75 : dark BROWSER slides in, cursor CLICKS row-by-row ("click by click"), Fable operates it
  const F = (s: number) => fr(s);

  const crash = over(lf, F(0.05), F(0.5), Easing.in(Easing.quad));      // fall accelerates
  const land = over(lf, F(0.42), F(0.3), Easing.out(Easing.cubic));     // impact settle
  const sweep = over(lf, F(0.6), F(2.55), Easing.inOut(Easing.sin));    // cursor sweeps piles
  const cleared = over(lf, F(3.08), F(0.26), Easing.out(Easing.cubic));
  const clearedFade = over(lf, F(3.36), F(0.28), Easing.linear); // fully gone by ~3.64
  const browser = over(lf, F(3.68), F(0.46), Easing.out(Easing.back(1.2))); // appears AFTER cleared clears
  const breathe = 0.5 + 0.5 * Math.sin(lf * 0.09);

  // sweeping cursor position
  const sweepX = interpolate(sweep, [0, 1], [300, 850], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const sweepY = 470 + Math.sin(sweep * Math.PI * 1.6) * 70;

  // ---- the piles: 4 white paper stacks, varying heights, across the desk ----
  const piles = [
    { x: 275, cards: 8, cw: 150, tone: 0 },
    { x: 452, cards: 14, cw: 172, tone: 1 },
    { x: 640, cards: 6, cw: 138, tone: 2 },
    { x: 800, cards: 11, cw: 158, tone: 3 },
  ];
  const deskY = 648;

  // browser click-by-click
  const rowN = 6;
  const clkStart = F(4.0), clkGap = F(0.27);
  const clicked = (i: number) => lf >= clkStart + i * clkGap;
  const activeClick = Math.floor((lf - clkStart) / clkGap);
  const pressT = ((lf - clkStart) % clkGap) / clkGap; // 0..1 within a click
  const press = lf >= clkStart && activeClick < rowN ? Math.max(0, 1 - Math.abs(pressT - 0.25) * 4) : 0;

  return (
    <>
      {/* ============ BACKDROP: dark office at night ============ */}
      <AbsoluteFill style={{ background: "radial-gradient(120% 90% at 50% 22%, #1A2136 0%, #121829 44%, #120e08 80%, #0e0a06 100%)" }} />
      <AbsoluteFill style={{ background: "radial-gradient(80% 70% at 50% 58%, rgba(0,0,0,0) 42%, rgba(0,0,0,0.5) 100%)" }} />

      {/* full-width city skyline silhouette (mid layer, behind desk) */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 300, height: 360, overflow: "hidden" }}>
        {/* moon */}
        <div style={{ position: "absolute", right: 120, top: 6, width: 60, height: 60, borderRadius: "50%", background: "radial-gradient(circle,#F2E4B8 0%,#C9B274 58%,rgba(180,150,90,0) 74%)", boxShadow: "0 0 22px 12px rgba(220,200,140,0.22)" }} />
        {Array.from({ length: 16 }).map((_, i) => {
          const bw = 40 + seed(i * 5) * 44;
          const bh = 120 + seed(i * 9 + 3) * 190;
          const bx = i * 66 - 10;
          const tone = ["#12182A", "#0E1424", "#141C30"][i % 3];
          return (
            <div key={i} style={{ position: "absolute", left: bx, bottom: 0, width: bw, height: bh, background: tone, borderTop: "1px solid rgba(90,120,170,0.18)" }}>
              {Array.from({ length: 10 }).map((_, w) => {
                const on = seed(i * 13 + w * 7) > 0.5;
                return <div key={w} style={{ position: "absolute", left: 6 + (w % 3) * ((bw - 12) / 3), top: 10 + Math.floor(w / 3) * 18, width: 6, height: 8, background: on ? "#F2C877" : "rgba(50,70,100,0.5)", boxShadow: on ? "0 0 4px rgba(242,200,119,0.55)" : "none", opacity: on ? 0.9 : 0.5 }} />;
              })}
            </div>
          );
        })}
      </div>

      {/* warm lamp glow pooling on desk */}
      <div style={{ position: "absolute", left: 30, top: 420, width: 560, height: 360, background: "radial-gradient(circle at 30% 40%, rgba(207,149,68,0.30) 0%, rgba(207,149,68,0.10) 42%, rgba(0,0,0,0) 72%)", filter: "blur(6px)", opacity: 0.8 + 0.2 * breathe }} />
      {/* cool triumph light from right, grows on sweep */}
      <div style={{ position: "absolute", right: 0, top: 240, width: 640, height: 520, background: "radial-gradient(circle at 66% 45%, rgba(63,158,116,0.34) 0%, rgba(63,158,116,0.10) 46%, rgba(0,0,0,0) 72%)", opacity: 0.12 + sweep * 0.7 }} />

      {/* dust motes */}
      {Array.from({ length: 22 }).map((_, i) => {
        const bx = seed(i * 4 + 2) * 1012;
        const drift = Math.sin(lf * 0.02 + i) * 26;
        const by = (150 + seed(i * 9) * 560 + (lf * (0.3 + seed(i) * 0.5))) % 600 + 150;
        const s = 1.5 + seed(i * 7) * 3;
        return <div key={i} style={{ position: "absolute", left: bx + drift, top: by, width: s, height: s, borderRadius: "50%", background: "rgba(232,205,150,0.5)", boxShadow: "0 0 4px rgba(232,205,150,0.5)", opacity: 0.35 + 0.5 * seed(i * 2) }} />;
      })}

      {/* desk surface */}
      <div style={{ position: "absolute", left: -20, top: deskY, width: 1060, height: 160, background: "linear-gradient(180deg,#2A2016 0%,#181109 100%)", borderTop: "3px solid #46341F", boxShadow: "0 -14px 40px rgba(0,0,0,0.55), inset 0 30px 60px rgba(207,149,68,0.07)" }} />

      {/* ============ THE PILES (white paper stacks, varying heights) ============ */}
      {piles.map((pile, pi) => {
        // this pile clears when the sweep X passes its center
        const clearAt = interpolate(pile.x, [250, 850], [0.08, 0.9]);
        return (
          <div key={pi}>
            {/* pile base shadow */}
            <div style={{ position: "absolute", left: pile.x - pile.cw / 2, top: deskY - 6, width: pile.cw, height: 26, borderRadius: "50%", background: "radial-gradient(circle,rgba(0,0,0,0.55),rgba(0,0,0,0))", opacity: sweep < clearAt ? 1 : Math.max(0, 1 - (sweep - clearAt) * 6), filter: "blur(4px)" }} />
            {Array.from({ length: pile.cards }).map((_, i) => {
              const cardY = deskY - 20 - i * 24;
              const explodeThresh = clearAt - 0.02 + (i / pile.cards) * 0.06;
              const gone = sweep > explodeThresh;
              const local = interpolate(sweep, [explodeThresh, explodeThresh + 0.1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              const dir = (i + pi) % 2 === 0 ? 1 : -1;
              const ex = gone ? dir * (70 + seed(i + pi * 5) * 150) * local : 0;
              const ey = gone ? -(50 + seed(i * 3 + pi) * 140) * local : 0;
              const rot = gone ? dir * 100 * local : Math.sin(lf * 0.06 + i + pi) * 1.4;
              const opa = gone ? (1 - local) : 1;
              const sway = Math.sin(lf * 0.05 + i * 0.6 + pi) * (2 + i * 0.4);
              const w = pile.cw - (i % 3) * 18;
              const whites = ["#FDFCF8", "#F4F0E7", "#FFFFFF", "#F1EDE3"];
              const crashShift = (1 - land) * (pi === 1 ? 8 : 3) * Math.sin(i); // little jolt on impact
              return (
                <div key={i} style={{ position: "absolute", left: pile.x + sway - w / 2, top: cardY,
                  width: w, height: 22,
                  transform: `translate(${ex}px,${ey + crashShift}px) rotate(${rot}deg) scale(${gone ? 1 - local * 0.3 : 1})`,
                  opacity: opa, zIndex: 5 }}>
                  <div style={{ width: "100%", height: "100%", borderRadius: 5,
                    background: `linear-gradient(180deg,${whites[i % 4]},#E4DECF)`,
                    border: "1.5px solid rgba(70,58,42,0.24)",
                    boxShadow: "0 5px 13px rgba(0,0,0,0.42)",
                    display: "flex", alignItems: "center", padding: "0 8px", gap: 6 }}>
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#D2724E", flexShrink: 0 }} />
                    <div style={{ height: 4, flex: 1, borderRadius: 3, background: "rgba(60,52,40,0.32)" }} />
                    <div style={{ width: 20, height: 4, borderRadius: 3, background: "rgba(60,52,40,0.22)" }} />
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}

      {/* ============ CHECKMARKS raining during the sweep ============ */}
      {sweep > 0.02 && sweep < 0.99 && Array.from({ length: 20 }).map((_, i) => {
        const bornAt = seed(i * 3 + 1) * 0.8;
        if (sweep < bornAt) return null;
        const life = (sweep - bornAt) / (1 - bornAt);
        const cx = sweepX + (seed(i) - 0.5) * 120 + (seed(i * 5) - 0.5) * 120 * life;
        const cy = sweepY + life * (120 + seed(i * 2) * 150) - 40;
        const sc = interpolate(life, [0, 0.3], [0, 1], { extrapolateRight: "clamp" }) * (1 - Math.max(0, life - 0.7) / 0.3);
        return (
          <div key={i} style={{ position: "absolute", left: cx, top: cy, zIndex: 7, transform: `scale(${sc})`, opacity: sc }}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: "radial-gradient(circle at 35% 30%,#5FCF94,#2E7A56)", border: "2px solid #8FE7B8", boxShadow: "0 0 6px rgba(63,158,116,0.7), 0 3px 8px rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", color: "#EAFBF2", fontWeight: 900, fontSize: 17 }}>✓</div>
          </div>
        );
      })}

      {/* speed streaks behind the sweeping cursor */}
      {sweep > 0.05 && sweep < 0.97 && Array.from({ length: 11 }).map((_, i) => {
        const ly = sweepY - 54 + i * 11;
        const lenP = 60 + seed(i) * 110;
        const flick = 0.5 + 0.5 * Math.abs(Math.sin(lf * 0.6 + i));
        return <div key={i} style={{ position: "absolute", left: sweepX - lenP - 20, top: ly, width: lenP, height: 3, borderRadius: 2, zIndex: 6, background: "linear-gradient(90deg,rgba(231,178,76,0),rgba(231,178,76,0.95))", opacity: flick * (1 - sweep * 0.3) }} />;
      })}

      {/* ============ ONLOOKER SPRITES (crowd, lit by the action) ============ */}
      {(() => {
        const cheer = browser;
        const gasp = interpolate(sweep, [0, 0.4], [0, 1], { extrapolateRight: "clamp" });
        const lit = 0.5 + sweep * 0.55 + browser * 0.2;
        return (
          <>
            <div style={{ position: "absolute", left: 44, top: 566, zIndex: 8, filter: `brightness(${lit}) drop-shadow(0 6px 12px rgba(0,0,0,0.6))`, transform: `translateY(${-cheer * 16}px)` }}>
              <Mascot lf={lf} size={92} beard={1} shock={gasp * (1 - cheer)} cheer={cheer} gaze={0.5} />
            </div>
            <div style={{ position: "absolute", left: 150, top: 596, zIndex: 8, filter: `brightness(${lit}) drop-shadow(0 6px 12px rgba(0,0,0,0.6))`, transform: `translateY(${-cheer * 22}px)` }}>
              <Mascot lf={lf} size={80} girl={1} shock={gasp * (1 - cheer)} cheer={cheer} gaze={0.35} />
            </div>
            <div style={{ position: "absolute", right: 60, top: 596, zIndex: 8, filter: `brightness(${lit}) drop-shadow(0 6px 12px rgba(0,0,0,0.6))`, transform: `translateY(${-cheer * 14}px)` }}>
              <Mascot lf={lf} size={84} glasses={1} shock={gasp * (1 - cheer)} cheer={cheer} gaze={-0.3} />
            </div>
          </>
        );
      })()}

      {/* ============ THE DARK BROWSER — cursor clicks it row by row ============ */}
      {browser > 0.01 && (() => {
        const bw = 520, bh = 268, bx = 506 - bw / 2, byTop = 316;
        return (
          <div style={{ position: "absolute", left: bx, top: byTop, width: bw, height: bh, zIndex: 9, transform: `translateY(${(1 - browser) * 40}px) scale(${0.9 + browser * 0.1})`, opacity: browser, transformOrigin: "center top", borderRadius: 16, background: "linear-gradient(180deg,#141B2E,#0C1120)", border: "2px solid #2A3550", boxShadow: "0 26px 60px rgba(0,0,0,0.6), 0 0 24px rgba(231,178,76,0.18)", overflow: "hidden" }}>
            {/* title bar */}
            <div style={{ height: 40, display: "flex", alignItems: "center", gap: 8, padding: "0 14px", background: "linear-gradient(180deg,#1C2540,#141B2E)", borderBottom: "1px solid #2A3350" }}>
              <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#E4643F" }} />
              <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#E7B24C" }} />
              <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#3F9E74" }} />
              <div style={{ marginLeft: 12, flex: 1, height: 22, borderRadius: 11, background: "#0A0F1C", border: "1px solid #2A3350", display: "flex", alignItems: "center", padding: "0 12px" }}>
                <span style={{ fontFamily: mono, fontSize: 12, color: "#8FA8D8" }}>fable ▸ working…</span>
              </div>
            </div>
            {/* task rows (blurred / gated) */}
            <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 9 }}>
              {Array.from({ length: rowN }).map((_, i) => {
                const done = clicked(i);
                const isActive = activeClick === i && press > 0.1;
                return (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 11, padding: "7px 10px", borderRadius: 9, background: done ? "rgba(63,158,116,0.16)" : "rgba(120,150,210,0.06)", border: `1px solid ${done ? "rgba(63,158,116,0.5)" : "rgba(120,150,210,0.14)"}`, transform: `scale(${isActive ? 0.98 : 1})`, transition: "all .1s" }}>
                    {/* checkbox */}
                    <div style={{ width: 20, height: 20, borderRadius: 5, flexShrink: 0, background: done ? "linear-gradient(180deg,#5FCF94,#2E7A56)" : "#0A0F1C", border: `2px solid ${done ? "#8FE7B8" : "#3A4466"}`, display: "flex", alignItems: "center", justifyContent: "center", color: "#EAFBF2", fontWeight: 900, fontSize: 13, boxShadow: done ? "0 0 7px rgba(63,158,116,0.6)" : "none" }}>{done ? "✓" : ""}</div>
                    {/* blurred label bars */}
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 5, filter: "blur(2px)", opacity: done ? 0.5 : 0.8 }}>
                      <div style={{ height: 6, width: `${58 + (i % 3) * 12}%`, borderRadius: 3, background: done ? "#4E8F6A" : "#5A6A88" }} />
                      <div style={{ height: 5, width: `${34 + (i % 2) * 14}%`, borderRadius: 3, background: "#3A4A66" }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })()}

      {/* ============ THE GIANT GOLD CURSOR ============ */}
      {(() => {
        if (lf < F(0.45)) return null;
        let cx: number, cy: number, rot: number, scale: number;
        if (lf < F(0.6)) {
          // just landed with Fable, near the piles
          cx = 296; cy = 466; rot = -14; scale = 1;
        } else if (lf < F(3.15)) {
          cx = sweepX; cy = sweepY; rot = sweep * -8 - 6; scale = 1.12;
        } else {
          // move into the browser and click row by row (browser at left 246, top 316)
          const rowIdx = Math.min(rowN - 1, Math.max(0, activeClick));
          cx = 246 + 30;               // checkbox center x
          cy = 316 + 74 + rowIdx * 43; // ~ row center y
          rot = -8 - press * 6; scale = 1 - press * 0.12;
        }
        const glowPulse = 0.7 + 0.3 * Math.sin(lf * 0.4);
        return (
          <div style={{ position: "absolute", left: cx, top: cy, zIndex: 12, transform: `translate(-50%,-50%) scale(${scale}) rotate(${rot}deg)`, filter: `drop-shadow(0 0 ${26 * glowPulse}px rgba(231,178,76,0.9)) drop-shadow(0 0 22px rgba(207,149,68,0.55))` }}>
            <div style={{ position: "absolute", left: -66, top: -66, width: 190, height: 190, borderRadius: "50%", background: "radial-gradient(circle,rgba(231,178,76,0.5) 0%,rgba(207,149,68,0.14) 45%,rgba(0,0,0,0) 70%)" }} />
            {/* click ripple in browser phase */}
            {lf >= F(3.15) && press > 0.1 && (
              <div style={{ position: "absolute", left: 6, top: 6, width: 20 + press * 46, height: 20 + press * 46, marginLeft: -(press * 23), marginTop: -(press * 23), borderRadius: "50%", border: "3px solid rgba(231,178,76,0.8)", opacity: 1 - press }} />
            )}
            <svg width="112" height="130" viewBox="0 0 120 140" style={{ position: "relative" }}>
              <defs>
                <linearGradient id="hkCurG" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#FFE9A8" /><stop offset="0.5" stopColor="#E7B24C" /><stop offset="1" stopColor="#B8791F" />
                </linearGradient>
              </defs>
              <path d="M14 10 L14 108 L38 84 L54 120 L72 112 L56 76 L92 76 Z" fill="url(#hkCurG)" stroke="#FFF3D0" strokeWidth="3" strokeLinejoin="round" />
              <path d="M22 24 L22 78 L40 62 Z" fill="rgba(255,255,255,0.5)" />
            </svg>
          </div>
        );
      })()}

      {/* ============ FALLING motion streaks (behind crashing Fable) ============ */}
      {lf >= F(0.08) && lf < F(0.5) && Array.from({ length: 6 }).map((_, i) => {
        const fy = interpolate(crash, [0, 1], [-150, 440], { extrapolateRight: "clamp" });
        return <div key={i} style={{ position: "absolute", left: 236 + i * 12, top: fy - 90 - i * 16, width: 4, height: 60 + i * 8, borderRadius: 3, background: "linear-gradient(180deg,rgba(231,178,76,0),rgba(231,178,76,0.6))", opacity: (1 - crash) * 0.8, zIndex: 12 }} />;
      })}

      {/* ============ THE HERO FABLE — crashes from sky, then operates ============ */}
      {(() => {
        let hx: number, hy: number, hrot: number, hscale: number, flip: number;
        if (lf < F(0.6)) {
          // CRASH down onto the LEFT pile
          hx = 270;
          hy = interpolate(crash, [0, 1], [-190, 472], { extrapolateRight: "clamp" });
          hrot = interpolate(crash, [0, 1], [-46, 0]);
          hscale = 1 + (1 - crash) * 0.12;
          flip = 1;
        } else if (lf < F(3.15)) {
          hx = sweepX - 50; hy = sweepY + 6 + Math.sin(lf * 0.5) * 6; hrot = 0; hscale = 1; flip = 1;
        } else {
          hx = interpolate(browser, [0, 1], [sweepX - 50, 178], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
          hy = interpolate(browser, [0, 1], [sweepY + 6, 512], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
          hrot = 0; hscale = 1; flip = 1;
        }
        // squash on impact
        const squash = lf >= F(0.42) && lf < F(0.74) ? (1 - land) : 0;
        return (
          <div style={{ position: "absolute", left: hx, top: hy, zIndex: 13, transform: `translate(-50%,-50%) scale(${hscale}) rotate(${hrot}deg)` }}>
            <div style={{ position: "absolute", left: "50%", top: "50%", width: 210, height: 210, borderRadius: "50%", transform: "translate(-50%,-50%)", background: "radial-gradient(circle,rgba(231,178,76,0.34) 0%,rgba(207,149,68,0.1) 50%,rgba(0,0,0,0) 72%)", opacity: 0.6 + 0.4 * breathe }} />
            <div style={{ filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.5)) brightness(1.12)", transform: `scaleX(${flip}) scale(${1 + squash * 0.16}, ${1 - squash * 0.2})` }}>
              <Mascot lf={lf} size={150}
                cheer={lf < F(0.6) ? 0.3 : (lf < F(3.15) ? 0.7 : 0.9)}
                shock={0}
                gaze={lf >= F(3.15) ? 0.5 : (lf < F(3.15) && lf >= F(0.6) ? 0.35 : 0)}
                nodAmp={lf >= F(3.15) ? 5 : 0} nodSpeed={1.1} />
            </div>
          </div>
        );
      })()}

      {/* ============ CRASH IMPACT: double ring + debris + flying papers + flash ============ */}
      {lf >= F(0.4) && lf < F(1.05) && (() => {
        const t = interpolate(lf, [F(0.46), F(0.95)], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const IX = 270, IY = 566;
        return (
          <>
            {/* shock ring 1 */}
            <div style={{ position: "absolute", left: IX, top: IY, transform: "translate(-50%,-50%)", zIndex: 11 }}>
              <div style={{ width: 50 + t * 520, height: 24 + t * 170, borderRadius: "50%", border: `${6 - t * 4}px solid rgba(231,178,76,0.75)`, opacity: (1 - t) }} />
            </div>
            {/* shock ring 2 (delayed) */}
            <div style={{ position: "absolute", left: IX, top: IY, transform: "translate(-50%,-50%)", zIndex: 11 }}>
              <div style={{ width: 20 + t * 340, height: 12 + t * 110, borderRadius: "50%", border: "4px solid rgba(255,240,200,0.6)", opacity: (1 - t) * 0.85 }} />
            </div>
            {/* radial dust debris */}
            {Array.from({ length: 16 }).map((_, i) => {
              const ang = (i / 16) * Math.PI * 2;
              const r = t * (150 + seed(i) * 110);
              return <div key={i} style={{ position: "absolute", left: IX + Math.cos(ang) * r * 1.5, top: IY - 20 + Math.abs(Math.sin(ang)) * r * 0.6 - t * 60, width: 7 + seed(i * 3) * 5, height: 7 + seed(i * 3) * 5, borderRadius: "50%", background: "rgba(214,180,120,0.85)", opacity: (1 - t), zIndex: 11 }} />;
            })}
            {/* white papers knocked flying from the first pile */}
            {Array.from({ length: 7 }).map((_, i) => {
              const dir = i % 2 === 0 ? 1 : -1;
              const px = IX + dir * (40 + i * 26) * t;
              const py = IY - 30 - (120 + seed(i) * 90) * t + t * t * 120;
              const rot = dir * 220 * t;
              return <div key={`p${i}`} style={{ position: "absolute", left: px, top: py, width: 30, height: 20, borderRadius: 4, background: "linear-gradient(180deg,#FFFFFF,#E4DECF)", border: "1px solid rgba(70,58,42,0.2)", boxShadow: "0 3px 8px rgba(0,0,0,0.4)", transform: `rotate(${rot}deg)`, opacity: (1 - t) * 1, zIndex: 12 }} />;
            })}
            {/* flash */}
            <AbsoluteFill style={{ background: "radial-gradient(46% 36% at 27% 72%, rgba(255,240,200,0.6), rgba(255,240,200,0) 60%)", opacity: (1 - t) * 0.8 }} />
          </>
        );
      })()}

      {/* ============ CLEARED flash ============ */}
      {cleared > 0.01 && clearedFade < 0.9 && (
        <>
          <AbsoluteFill style={{ background: "radial-gradient(60% 50% at 55% 46%, rgba(255,246,220,0.85), rgba(255,246,220,0) 65%)", opacity: cleared * (1 - clearedFade) }} />
          <div style={{ position: "absolute", left: "50%", top: 356, transform: `translate(-50%,-50%) scale(${0.62 + cleared * 0.48})`, zIndex: 14, opacity: cleared * (1 - clearedFade) }}>
            <div style={{ display: "flex", alignItems: "center", gap: 13, padding: "11px 24px", borderRadius: 16, background: "linear-gradient(180deg,#2E7A56,#1C5238)", border: "3px solid #6FD39A", boxShadow: "0 0 26px rgba(63,158,116,0.7), 0 12px 30px rgba(0,0,0,0.5)" }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#EAFBF2", display: "flex", alignItems: "center", justifyContent: "center", color: "#2E7A56", fontWeight: 900, fontSize: 27 }}>✓</div>
              <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 54, color: "#FFFFFF", letterSpacing: 1, textShadow: "0 3px 12px rgba(0,0,0,0.4)" }}>CLEARED</span>
            </div>
          </div>
        </>
      )}

      {/* top+bottom safe-zone darkening */}
      <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 150, background: "linear-gradient(180deg,rgba(8,10,18,0.55),rgba(8,10,18,0))" }} />
      <div style={{ position: "absolute", left: 0, bottom: 0, width: "100%", height: 40, background: "linear-gradient(0deg,rgba(8,10,18,0.5),rgba(8,10,18,0))" }} />
    </>
  );
};

const Hook: React.FC<{ lf: number }> = ({ lf }) => <Panel label=""><HookScene lf={lf} /><ScreenHead lf={lf} big="AUTOMATE" clay="EVERYTHING" chip={false} /><BigCountdown lf={lf} /></Panel>;

const UseCasesScene: React.FC<{ lf: number }> = ({ lf }) => {
  // ---- timing: three vignettes, ~2.4s each with cross-fades ----
  const SEG = fr(2.5); // 75 frames per segment window
  const FADE = fr(0.35);
  // segment opacity helper (fade in / hold / fade out)
  const segOp = (start: number) => {
    const t = lf - start;
    if (t < 0) return 0;
    if (t < FADE) return interpolate(t, [0, FADE], [0, 1], { easing: Easing.out(Easing.cubic) });
    if (t > SEG - FADE) return interpolate(t, [SEG - FADE, SEG], [1, 0], { easing: Easing.in(Easing.quad) });
    return 1;
  };
  const s0 = 0;
  const s1 = SEG - FADE;          // start of studio while jobs fades
  const s2 = 2 * (SEG - FADE);    // start of vault while studio fades

  const jobsOp = segOp(s0);
  const postsOp = segOp(s1);
  const leadsOp = segOp(s2);

  // local frame within each segment (for internal escalation)
  const jf = lf - s0;
  const pf = lf - s1;
  const vf = lf - s2;

  // ---------- shared tiny sub-helpers ----------
  const Star: React.FC<{ x: number; y: number; d: number; sz: number; f: number }> = ({ x, y, d, sz, f }) => {
    const tw = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin((f + d * 30) / 9));
    return <div style={{ position: 'absolute', left: x, top: y, width: sz, height: sz, borderRadius: '50%', background: '#DCE6F5', opacity: tw * 0.8, boxShadow: '0 0 4px #9FBBE0' }} />;
  };

  const CounterChip: React.FC<{ x: number; y: number; label: string; value: string; tint: string; f: number }> = ({ x, y, label, value, tint, f }) => {
    const pop = interpolate(f, [0, 8], [0.7, 1], { easing: Easing.out(Easing.back(1.6)), extrapolateRight: 'clamp' });
    const pulse = 1 + 0.03 * Math.sin(f / 5);
    return (
      <div style={{ position: 'absolute', left: x, top: y, transform: `scale(${pop * pulse})`, display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', borderRadius: 14, background: 'rgba(12,16,26,0.82)', border: `1.5px solid ${tint}`, boxShadow: `0 0 9px ${tint}66, 0 8px 20px rgba(0,0,0,0.5)` }}>
        <span style={{ fontFamily: mono, fontSize: 30, fontWeight: 800, color: '#F4EEDF', letterSpacing: -0.5 }}>{value}</span>
        <span style={{ fontFamily: inter.fontFamily, fontSize: 12, fontWeight: 700, color: tint, letterSpacing: 1, textTransform: 'uppercase' }}>{label}</span>
      </div>
    );
  };

  const LiveTag: React.FC<{ x: number; y: number; text: string; color: string; f: number }> = ({ x, y, text, color, f }) => {
    const blink = 0.5 + 0.5 * Math.sin(f / 4);
    return (
      <div style={{ position: 'absolute', left: x, top: y, display: 'flex', alignItems: 'center', gap: 6, padding: '5px 11px', borderRadius: 20, background: 'rgba(10,10,14,0.85)', border: `1px solid ${color}88` }}>
        <div style={{ width: 9, height: 9, borderRadius: '50%', background: color, opacity: 0.4 + 0.6 * blink, boxShadow: `0 0 4px ${color}` }} />
        <span style={{ fontFamily: inter.fontFamily, fontSize: 12, fontWeight: 800, color: '#fff', letterSpacing: 1.5 }}>{text}</span>
      </div>
    );
  };

  // ============================================================
  // VIGNETTE 1 — JOBS: dark city skyline, paper-plane applications
  // ============================================================
  const towers = [
    { x: 70, w: 92, h: 300, hue: '#1B2740' }, { x: 168, w: 78, h: 380, hue: '#16203A' },
    { x: 250, w: 108, h: 320, hue: '#1E2A45' }, { x: 362, w: 74, h: 430, hue: '#141C33' },
    { x: 440, w: 96, h: 350, hue: '#1B2740' }, { x: 540, w: 82, h: 400, hue: '#17213B' },
    { x: 626, w: 110, h: 300, hue: '#1E2A45' }, { x: 740, w: 76, h: 460, hue: '#141C33' },
    { x: 820, w: 100, h: 340, hue: '#1B2740' }, { x: 924, w: 72, h: 390, hue: '#17213B' },
  ];
  // which towers are "APPLIED" and when (staggered)
  const appliedAt = [12, 20, 28, 34, 40, 46, 52, 58, 64, 70];
  const jobsCounter = Math.min(214, Math.round(interpolate(jf, [10, SEG - 6], [0, 214], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })));

  // paper planes: several in flight, staggered
  const planes = [0, 1, 2, 3, 4, 5].map((i) => {
    const launch = 8 + i * 9;
    const p = over(jf, launch, 26, Easing.inOut(Easing.sin));
    const tgt = towers[(i + 2) % towers.length];
    const sx = 500, sy = 560;
    const tx = tgt.x + tgt.w / 2, ty = 792 - tgt.h - 40;
    const cx = interpolate(p, [0, 1], [sx, tx]) + Math.sin(p * Math.PI) * 40 * (i % 2 ? 1 : -1);
    const cy = interpolate(p, [0, 1], [sy, ty]) - Math.sin(p * Math.PI) * 90;
    const ang = interpolate(p, [0, 1], [-20, 25]);
    return { p, cx, cy, ang, i };
  });

  // ============================================================
  // VIGNETTE 2 — POSTS: broadcast studio, spotlights, platforms
  // ============================================================
  const platforms = [
    { x: 150, label: 'IG', bg: '#C13584', at: 22 },
    { x: 430, label: '𝕏', bg: '#2A2A2A', at: 32 },
    { x: 710, label: 'in', bg: '#0A66C2', at: 42 },
  ];
  const blastP = over(pf, 14, 20, Easing.out(Easing.cubic)); // the glowing post flying out
  const reach = Math.min(48, Math.round(interpolate(pf, [12, SEG - 6], [0, 48], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })));

  // ============================================================
  // VIGNETTE 3 — LEADS: data vault, magnet pulling lead-orbs into CRM safe
  // ============================================================
  const orbGrid = [];
  for (let r = 0; r < 5; r++) for (let c = 0; c < 7; c++) orbGrid.push({ r, c, id: r * 7 + c });
  const leadsCounter = Math.min(100, Math.round(interpolate(vf, [10, SEG - 6], [0, 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })));
  const magnetPull = 0.5 + 0.5 * Math.sin(vf / 6);

  return (
    <>
      {/* ================= BACKDROP BASE (deep dark) ================= */}
      <AbsoluteFill style={{ background: '#0A0E18' }} />

      {/* =========================================================== */}
      {/* ================ VIGNETTE 1 : JOBS ======================== */}
      {/* =========================================================== */}
      <AbsoluteFill style={{ opacity: jobsOp }}>
        {/* night sky gradient */}
        <AbsoluteFill style={{ background: 'linear-gradient(180deg,#0B1226 0%,#111A33 45%,#1A2340 78%,#0E1424 100%)' }} />
        {/* moon glow */}
        <div style={{ position: 'absolute', right: 90, top: 90, width: 120, height: 120, borderRadius: '50%', background: 'radial-gradient(circle,#E9E2C6 0%,#C9BE95 40%,rgba(201,190,149,0) 72%)', opacity: 0.85, filter: 'blur(1px)' }} />
        <div style={{ position: 'absolute', right: 118, top: 118, width: 66, height: 66, borderRadius: '50%', background: '#F3EDD4', boxShadow: '0 0 21px rgba(243,237,212,0.5)' }} />
        {/* stars */}
        {Array.from({ length: 26 }).map((_, i) => (
          <Star key={i} x={40 + seed(i * 3.1) * 940} y={30 + seed(i * 7.7) * 200} d={i} sz={seed(i) > 0.7 ? 3 : 2} f={jf} />
        ))}
        {/* far haze layer */}
        <div style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', height: 260, background: 'linear-gradient(180deg,rgba(30,44,80,0) 0%,rgba(30,44,80,0.5) 100%)' }} />

        {/* SKYLINE TOWERS */}
        {towers.map((t, ti) => {
          const applied = jf >= appliedAt[ti];
          const flash = applied ? interpolate(jf - appliedAt[ti], [0, 6, 20], [0, 1, 0.55], { extrapolateRight: 'clamp' }) : 0;
          return (
            <div key={ti}>
              {/* tower body */}
              <div style={{ position: 'absolute', left: t.x, bottom: 0, width: t.w, height: t.h, background: `linear-gradient(180deg,${t.hue} 0%,#0D1424 100%)`, borderTop: '2px solid rgba(120,150,200,0.25)', boxShadow: 'inset -14px 0 24px rgba(0,0,0,0.5), inset 10px 0 16px rgba(120,150,200,0.06)' }} />
              {/* windows grid */}
              {Array.from({ length: Math.floor(t.h / 34) }).map((_, wy) =>
                Array.from({ length: Math.max(2, Math.floor(t.w / 26)) }).map((__, wx) => {
                  const lit = seed(ti * 13 + wy * 3.3 + wx * 1.7) > 0.42;
                  const warm = seed(ti + wy * 2 + wx) > 0.5;
                  return (
                    <div key={`${wy}-${wx}`} style={{ position: 'absolute', left: t.x + 10 + wx * 22, bottom: 20 + wy * 34, width: 12, height: 16, borderRadius: 2, background: lit ? (warm ? '#F2C877' : '#8FB4E6') : '#0B1220', opacity: lit ? (0.55 + 0.4 * (applied ? 1 : seed(ti + wy + wx))) : 0.5, boxShadow: lit ? `0 0 4px ${warm ? '#F2C87788' : '#8FB4E688'}` : 'none' }} />
                  );
                })
              )}
              {/* APPLIED flash label */}
              {applied && (
                <div style={{ position: 'absolute', left: t.x + t.w / 2, bottom: t.h + 6, transform: `translateX(-50%) scale(${0.7 + flash * 0.4})`, padding: '3px 8px', borderRadius: 8, background: 'rgba(63,158,116,0.92)', border: '1px solid #a6c98a', opacity: flash, boxShadow: '0 0 7px #3F9E7499', whiteSpace: 'nowrap' }}>
                  <span style={{ fontFamily: inter.fontFamily, fontSize: 11, fontWeight: 900, color: '#f4eedf', letterSpacing: 1 }}>APPLIED</span>
                </div>
              )}
              {/* roof glow on applied */}
              {applied && <div style={{ position: 'absolute', left: t.x - 8, bottom: t.h - 6, width: t.w + 16, height: 24, background: 'radial-gradient(ellipse,rgba(63,158,116,0.5),rgba(63,158,116,0))', opacity: flash }} />}
            </div>
          );
        })}

        {/* Fable sprite on foreground rooftop, launching planes */}
        <div style={{ position: 'absolute', left: 452, bottom: 120, filter: 'drop-shadow(0 14px 18px rgba(0,0,0,0.55))' }}>
          <Mascot lf={jf} size={132} suit={1} cheer={0.4 + 0.3 * Math.sin(jf / 5)} nodAmp={4} nodSpeed={3} gaze={0.2} />
        </div>
        {/* rooftop platform under sprite */}
        <div style={{ position: 'absolute', left: 420, bottom: 100, width: 200, height: 30, borderRadius: 8, background: 'linear-gradient(180deg,#2C3A5A,#151d30)', boxShadow: '0 10px 24px rgba(0,0,0,0.5), inset 0 2px 0 rgba(140,170,220,0.15)' }} />

        {/* PAPER-PLANE applications (glowing) */}
        {planes.map((pl) =>
          pl.p > 0 && pl.p < 1 ? (
            <div key={pl.i} style={{ position: 'absolute', left: pl.cx, top: pl.cy, transform: `rotate(${pl.ang}deg)`, filter: 'drop-shadow(0 0 4px rgba(231,178,76,0.8))' }}>
              <svg width="42" height="30" viewBox="0 0 42 30">
                <path d="M2 15 L40 3 L24 27 L20 18 Z" fill="#F4E6C8" stroke="#E7B24C" strokeWidth="1.5" />
                <path d="M20 18 L40 3 L24 27 Z" fill="#E7B24C" opacity="0.55" />
              </svg>
              {/* trail */}
              <div style={{ position: 'absolute', left: -34, top: 12, width: 40, height: 3, borderRadius: 3, background: 'linear-gradient(90deg,rgba(231,178,76,0),rgba(231,178,76,0.7))', opacity: Math.sin(pl.p * Math.PI) }} />
            </div>
          ) : null
        )}

        {/* retention counter (below the changing title) */}
        <CounterChip x={60} y={200} label="applied" value={`${jobsCounter} ▲`} tint="#3F9E74" f={jf} />
        <LiveTag x={60} y={256} text="AUTO-APPLY" color="#E7B24C" f={jf} />
      </AbsoluteFill>

      {/* =========================================================== */}
      {/* ================ VIGNETTE 2 : POSTS ======================= */}
      {/* =========================================================== */}
      <AbsoluteFill style={{ opacity: postsOp }}>
        {/* studio deep bg */}
        <AbsoluteFill style={{ background: 'linear-gradient(180deg,#150E22 0%,#1D1330 40%,#241640 72%,#120C1E 100%)' }} />
        {/* stage floor */}
        <div style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', height: 240, background: 'linear-gradient(180deg,#241640 0%,#17110b 100%)', boxShadow: 'inset 0 30px 60px rgba(0,0,0,0.5)' }} />
        {/* floor reflection stripe */}
        <div style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', height: 120, background: 'linear-gradient(180deg,rgba(120,90,200,0.12),rgba(0,0,0,0))' }} />

        {/* colored stage spotlights (beams from top) */}
        {[
          { x: 200, c: '#D2724E', d: 0 }, { x: 400, c: '#3A5C84', d: 1 }, { x: 620, c: '#3F9E74', d: 2 }, { x: 820, c: '#CF9544', d: 3 },
        ].map((sp, i) => {
          const sway = Math.sin(pf / 14 + sp.d) * 22;
          const flick = 0.55 + 0.25 * Math.sin(pf / 3 + sp.d * 2);
          return (
            <div key={i} style={{ position: 'absolute', left: sp.x + sway, top: -10, width: 130, height: 520, background: `linear-gradient(180deg,${sp.c}CC,${sp.c}22 60%,rgba(0,0,0,0))`, clipPath: 'polygon(42% 0,58% 0,100% 100%,0 100%)', opacity: flick * 0.7, filter: 'blur(3px)', transformOrigin: 'top center', transform: `rotate(${sway * 0.05}deg)` }} />
          );
        })}
        {/* light rig bar on top */}
        <div style={{ position: 'absolute', left: 40, top: 40, width: 932, height: 14, borderRadius: 6, background: 'linear-gradient(180deg,#3A3352,#181226)', boxShadow: '0 4px 10px rgba(0,0,0,0.5)' }} />
        {[120, 300, 480, 660, 840].map((lx, i) => (
          <div key={i} style={{ position: 'absolute', left: lx, top: 50, width: 26, height: 20, borderRadius: 4, background: '#17110b', border: '1px solid #4A4266' }}>
            <div style={{ position: 'absolute', left: 4, top: 4, width: 18, height: 12, borderRadius: 2, background: ['#D2724E', '#3A5C84', '#3F9E74', '#CF9544', '#C44A3A'][i], opacity: 0.6 + 0.4 * Math.sin(pf / 4 + i), boxShadow: `0 0 4px ${['#D2724E', '#3A5C84', '#3F9E74', '#CF9544', '#C44A3A'][i]}` }} />
          </div>
        ))}

        {/* MIXING DESK / console */}
        <div style={{ position: 'absolute', left: 380, bottom: 70, width: 260, height: 90, borderRadius: '10px 10px 6px 6px', background: 'linear-gradient(180deg,#2C2340,#15102270)', backgroundColor: '#241A38', border: '1px solid #4A3E66', boxShadow: '0 16px 30px rgba(0,0,0,0.55), inset 0 2px 0 rgba(160,140,210,0.15)', transform: 'perspective(400px) rotateX(28deg)' }}>
          {/* faders */}
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} style={{ position: 'absolute', left: 18 + i * 27, top: 16, width: 6, height: 44, borderRadius: 3, background: '#17110b' }}>
              <div style={{ position: 'absolute', left: -4, top: 6 + (0.5 + 0.5 * Math.sin(pf / 4 + i)) * 26, width: 14, height: 8, borderRadius: 2, background: ['#D2724E', '#3F9E74', '#3A5C84', '#CF9544'][i % 4], boxShadow: '0 0 4px rgba(255,255,255,0.2)' }} />
            </div>
          ))}
          {/* meter lights */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={`m${i}`} style={{ position: 'absolute', right: 14, top: 14 + i * 11, width: 8, height: 7, borderRadius: 2, background: i < 2 + Math.round(2 + 2 * Math.sin(pf / 3)) ? '#3F9E74' : '#1A2A22', boxShadow: i < 3 ? '0 0 4px #3F9E74' : 'none' }} />
          ))}
        </div>

        {/* Fable sprite at console with megaphone */}
        <div style={{ position: 'absolute', left: 452, bottom: 155, filter: 'drop-shadow(0 12px 16px rgba(0,0,0,0.5))' }}>
          <Mascot lf={pf} size={128} cheer={0.55 + 0.25 * Math.sin(pf / 4)} nodAmp={3} nodSpeed={4} gaze={0} />
        </div>
        {/* megaphone */}
        <div style={{ position: 'absolute', left: 560, bottom: 210, transform: `rotate(${-8 + Math.sin(pf / 6) * 3}deg)` }}>
          <svg width="90" height="60" viewBox="0 0 90 60">
            <path d="M6 22 L34 22 L74 6 L74 54 L34 38 L6 38 Z" fill="#D2724E" stroke="#B85A38" strokeWidth="2" />
            <rect x="0" y="24" width="10" height="12" rx="2" fill="#8A4028" />
            <path d="M74 6 L74 54 L86 46 L86 14 Z" fill="#E88A5E" />
          </svg>
        </div>

        {/* THE GLOWING POST flying out */}
        <div style={{ position: 'absolute', left: interpolate(blastP, [0, 1], [640, 500]), bottom: interpolate(blastP, [0, 1], [230, 420]), transform: `scale(${0.6 + blastP * 0.7}) rotate(${blastP * 10}deg)`, opacity: blastP > 0 ? 1 : 0, filter: 'drop-shadow(0 0 8px rgba(231,178,76,0.9))' }}>
          <div style={{ width: 96, height: 70, borderRadius: 10, background: 'linear-gradient(150deg,#F4EAD0,#E7B24C)', border: '2px solid #F6E9C0', boxShadow: '0 0 12px rgba(231,178,76,0.7)', padding: 8 }}>
            <div style={{ width: 44, height: 8, borderRadius: 4, background: '#B87A2E', marginBottom: 5 }} />
            <div style={{ width: 70, height: 5, borderRadius: 3, background: '#C99A54', marginBottom: 4 }} />
            <div style={{ width: 58, height: 5, borderRadius: 3, background: '#C99A54', marginBottom: 4 }} />
            <div style={{ width: 66, height: 5, borderRadius: 3, background: '#C99A54' }} />
          </div>
        </div>
        {/* radiating broadcast rings from the post origin */}
        {[0, 1, 2].map((ri) => {
          const rp = ((pf - 14 - ri * 6) % 34) / 34;
          if (rp < 0) return null;
          return <div key={ri} style={{ position: 'absolute', left: 545, bottom: 300, width: 40 + rp * 260, height: 40 + rp * 260, marginLeft: -(20 + rp * 130), marginBottom: -(20 + rp * 130), borderRadius: '50%', border: '2px solid #E7B24C', opacity: (1 - rp) * 0.5 }} />;
        })}

        {/* AUDIENCE platform sprites lighting up POSTED */}
        {platforms.map((pf2, i) => {
          const on = pf >= pf2.at;
          const pop = on ? interpolate(pf - pf2.at, [0, 6], [0.8, 1], { easing: Easing.out(Easing.back(1.4)), extrapolateRight: 'clamp' }) : 0.85;
          const glow = on ? 0.6 + 0.4 * Math.sin(pf / 4 + i) : 0;
          return (
            <div key={i} style={{ position: 'absolute', left: pf2.x, bottom: 90 }}>
              {/* tile / device */}
              <div style={{ width: 120, height: 120, borderRadius: 22, background: pf2.bg, border: `2px solid ${on ? '#F4EEDF' : '#5A5470'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${pop})`, boxShadow: on ? `0 0 11px ${pf2.bg}, 0 0 16px rgba(231,178,76,0.4)` : '0 10px 20px rgba(0,0,0,0.4)', opacity: 0.5 + glow * 0.5 }}>
                <span style={{ fontFamily: inter.fontFamily, fontSize: 46, fontWeight: 900, color: '#fff' }}>{pf2.label}</span>
              </div>
              {/* tiny mascot audience face peeking */}
              <div style={{ position: 'absolute', left: 78, top: -34, filter: 'drop-shadow(0 6px 8px rgba(0,0,0,0.5))' }}>
                <Mascot lf={pf + i * 7} size={54} shock={on ? 0.5 : 0} gaze={0.1} />
              </div>
              {on && (
                <div style={{ position: 'absolute', left: 60, top: 130, transform: `translateX(-50%) scale(${pop})`, padding: '3px 9px', borderRadius: 8, background: 'rgba(63,158,116,0.92)', border: '1px solid #a6c98a', boxShadow: '0 0 6px #3F9E7499' }}>
                  <span style={{ fontFamily: inter.fontFamily, fontSize: 11, fontWeight: 900, color: '#f4eedf', letterSpacing: 1 }}>POSTED</span>
                </div>
              )}
            </div>
          );
        })}

        {/* retention counter (below the changing title) */}
        <CounterChip x={60} y={200} label="channels" value={`${reach} ●`} tint="#D2724E" f={pf} />
        <LiveTag x={60} y={256} text="LIVE" color="#C44A3A" f={pf} />
      </AbsoluteFill>

      {/* =========================================================== */}
      {/* ================ VIGNETTE 3 : LEADS ======================= */}
      {/* =========================================================== */}
      <AbsoluteFill style={{ opacity: leadsOp }}>
        {/* data vault deep bg */}
        <AbsoluteFill style={{ background: 'linear-gradient(180deg,#08131A 0%,#0C1E28 42%,#0E2630 72%,#061016 100%)' }} />
        {/* perspective floor grid */}
        <div style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', height: 300, background: 'repeating-linear-gradient(90deg,rgba(78,143,106,0.12) 0 1px,transparent 1px 60px), repeating-linear-gradient(0deg,rgba(78,143,106,0.10) 0 1px,transparent 1px 46px)', transform: 'perspective(500px) rotateX(60deg)', transformOrigin: 'bottom', opacity: 0.7 }} />
        {/* ambient teal glow */}
        <div style={{ position: 'absolute', left: '50%', top: 120, width: 500, height: 400, marginLeft: -250, background: 'radial-gradient(ellipse,rgba(78,143,106,0.16),rgba(0,0,0,0))' }} />

        {/* GRID WALL of glowing lead-orbs (left) */}
        {orbGrid.map((o) => {
          const gx = 70 + o.c * 52;
          const gy = 200 + o.r * 52;
          // stagger: orbs get "pulled" toward magnet as time passes
          const pullStart = 14 + o.id * 1.1;
          const pull = over(vf, pullStart, 26, Easing.in(Easing.quad));
          const magX = 470, magY = 470; // magnet head
          const cx = interpolate(pull, [0, 1], [gx, magX]);
          const cy = interpolate(pull, [0, 1], [gy, magY]);
          const alive = pull < 0.96;
          const tw = 0.6 + 0.4 * Math.sin((vf + o.id * 4) / 6);
          const warm = seed(o.id) > 0.6;
          return alive ? (
            <div key={o.id} style={{ position: 'absolute', left: cx, top: cy, width: 20, height: 20, marginLeft: -10, marginTop: -10, borderRadius: '50%', background: warm ? 'radial-gradient(circle,#F2C877,#B87A2E)' : 'radial-gradient(circle,#E7B24C,#5a7048)', boxShadow: `0 0 ${8 + pull * 8}px ${warm ? '#F2C877' : '#E7B24C'}`, opacity: (0.7 + 0.3 * tw) * (pull > 0.85 ? interpolate(pull, [0.85, 0.96], [1, 0.2]) : 1) }} />
          ) : null;
        })}
        {/* vault wall frame around orb grid */}
        <div style={{ position: 'absolute', left: 42, top: 172, width: 372, height: 288, borderRadius: 12, border: '2px solid rgba(78,143,106,0.35)', boxShadow: 'inset 0 0 16px rgba(78,143,106,0.12)' }} />
        <div style={{ position: 'absolute', left: 42, top: 172, padding: '3px 9px', background: 'rgba(8,20,26,0.9)', borderRadius: 6, transform: 'translateY(-50%)', border: '1px solid rgba(78,143,106,0.4)' }}>
          <span style={{ fontFamily: mono, fontSize: 11, fontWeight: 700, color: '#E7B24C', letterSpacing: 1 }}>LEAD POOL</span>
        </div>

        {/* Fable sprite with BIG MAGNET */}
        <div style={{ position: 'absolute', left: 430, bottom: 210, filter: 'drop-shadow(0 12px 16px rgba(0,0,0,0.5))' }}>
          <Mascot lf={vf} size={126} stern={0.4} nodAmp={2} nodSpeed={2} gaze={-0.3} />
        </div>
        {/* magnet in sprite's hands */}
        <div style={{ position: 'absolute', left: 440, top: 440, transform: `rotate(${-24 + magnetPull * 6}deg) scale(${1 + magnetPull * 0.05})`, transformOrigin: 'bottom right', filter: 'drop-shadow(0 0 5px rgba(196,74,58,0.6))' }}>
          <svg width="72" height="72" viewBox="0 0 72 72">
            <path d="M20 8 A28 28 0 0 1 64 30 L64 30 L48 30 A16 16 0 0 0 34 16 Z" fill="#C44A3A" />
            <path d="M20 8 L34 16 A16 16 0 0 0 30 34 L14 34 A28 28 0 0 1 20 8 Z" fill="#3A5C84" />
            <rect x="46" y="30" width="18" height="18" fill="#C44A3A" />
            <rect x="8" y="30" width="18" height="18" fill="#3A5C84" />
            <rect x="46" y="46" width="18" height="8" fill="#D8D2C4" />
            <rect x="8" y="46" width="18" height="8" fill="#D8D2C4" />
          </svg>
        </div>
        {/* magnet field arcs pulling orbs */}
        {[0, 1, 2].map((ai) => {
          const ap = ((vf - ai * 5) % 26) / 26;
          return <div key={ai} style={{ position: 'absolute', left: 470, top: 470, width: 60 + ap * 180, height: 60 + ap * 180, marginLeft: -(30 + ap * 90), marginTop: -(30 + ap * 90), borderRadius: '50%', border: '2px dashed rgba(216,162,78,0.5)', opacity: (1 - ap) * 0.5, transform: `rotate(${vf * 2}deg)` }} />;
        })}

        {/* CRM SAFE (lit, right) — orbs funnel here */}
        <div style={{ position: 'absolute', right: 60, bottom: 150, width: 220, height: 260, borderRadius: 16, background: 'linear-gradient(180deg,#123038,#081820)', border: '3px solid #5a7048', boxShadow: '0 0 14px rgba(78,143,106,0.4), inset 0 0 12px rgba(0,0,0,0.5)' }}>
          {/* safe door ring */}
          <div style={{ position: 'absolute', left: '50%', top: '48%', width: 120, height: 120, marginLeft: -60, marginTop: -60, borderRadius: '50%', border: '5px solid #3F9E74', boxShadow: '0 0 8px rgba(78,143,106,0.5), inset 0 0 8px rgba(78,143,106,0.3)' }}>
            <div style={{ position: 'absolute', left: '50%', top: '50%', width: 60, height: 60, marginLeft: -30, marginTop: -30, borderRadius: '50%', border: '4px solid #E7B24C', transform: `rotate(${vf * 4}deg)` }} />
            {/* spokes */}
            {[0, 60, 120].map((deg) => (
              <div key={deg} style={{ position: 'absolute', left: '50%', top: '50%', width: 96, height: 4, marginLeft: -48, marginTop: -2, background: '#3F9E74', borderRadius: 2, transform: `rotate(${deg + vf * 4}deg)` }} />
            ))}
          </div>
          {/* CRM label */}
          <div style={{ position: 'absolute', left: '50%', top: 12, transform: 'translateX(-50%)', padding: '3px 10px', borderRadius: 7, background: 'rgba(78,143,106,0.2)', border: '1px solid #3F9E74' }}>
            <span style={{ fontFamily: mono, fontSize: 12, fontWeight: 800, color: '#F4EEDF', letterSpacing: 1 }}>CRM</span>
          </div>
          {/* fill meter at base */}
          <div style={{ position: 'absolute', left: 16, right: 16, bottom: 14, height: 12, borderRadius: 6, background: '#0A1A1E', overflow: 'hidden', border: '1px solid #5a7048' }}>
            <div style={{ height: '100%', width: `${leadsCounter}%`, background: 'linear-gradient(90deg,#5a7048,#E7B24C)', boxShadow: '0 0 5px #E7B24C' }} />
          </div>
        </div>

        {/* retention counter (upper-right, clear of the vault + title) */}
        <CounterChip x={704} y={200} label="leads" value={`${leadsCounter}`} tint="#E7B24C" f={vf} />
        <LiveTag x={704} y={256} text="ENRICHING" color="#3F9E74" f={vf} />
      </AbsoluteFill>

      {/* ================ CHANGING PER-TASK TITLE (jobs / content / CRM) ================ */}
      {[
        { op: jobsOp, big: 'APPLIES TO', clay: 'JOBS' },
        { op: postsOp, big: 'POSTS YOUR', clay: 'CONTENT' },
        { op: leadsOp, big: 'FILLS YOUR', clay: 'CRM' },
      ].map((t, i) => (
        <div key={i} style={{ position: 'absolute', left: 0, right: 0, top: 70, textAlign: 'center', zIndex: 47, opacity: t.op, transform: `translateY(${(1 - t.op) * -12}px)` }}>
          <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 58, color: '#F4EEDF', textShadow: '0 3px 12px rgba(0,0,0,0.7), 0 0 10px rgba(0,0,0,0.5)' }}>{t.big} <span style={{ color: '#F0A878' }}>{t.clay}</span></span>
        </div>
      ))}

      {/* ================ segment progress dots (bottom, retention) ================ */}
      <div style={{ position: 'absolute', left: '50%', bottom: 30, transform: 'translateX(-50%)', display: 'flex', gap: 10 }}>
        {[jobsOp, postsOp, leadsOp].map((op, i) => (
          <div key={i} style={{ width: op > 0.5 ? 28 : 10, height: 8, borderRadius: 5, background: op > 0.5 ? '#E7B24C' : 'rgba(200,200,200,0.3)', boxShadow: op > 0.5 ? '0 0 5px rgba(231,178,76,0.7)' : 'none', transition: 'all .2s' }} />
        ))}
      </div>

      {/* subtle top vignette so header stays clean */}
      <div style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: 120, background: 'linear-gradient(180deg,rgba(5,8,14,0.55),rgba(5,8,14,0))', pointerEvents: 'none' }} />
    </>
  );
};

const UseCases: React.FC<{ lf: number }> = ({ lf }) => <Panel label=""><UseCasesScene lf={lf} /><ScreenHead lf={lf} big="" clay="" /></Panel>;

const RehookScene: React.FC<{ lf: number }> = ({ lf }) => {
  // ===== timing (3.7s @30fps = 111 frames) =====
  const T = (s: number) => s * 30;

  // human taps happen at these frames
  const taps = [T(0.55), T(0.95), T(1.35)];
  // learning arc particles travel after each tap
  // eyes flash + LEARNED payoff
  const flashF = T(2.35);
  const learnedF = T(2.7);

  // ---- helpers ----
  const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
  const lerp = (a: number, b: number, t: number) => a + (b - a) * clamp01(t);
  const rnd = (n: number) => seed(n);

  // gentle ambient breathing for lamp
  const lampFlicker =
    0.86 +
    0.09 * Math.sin(lf * 0.5) +
    0.05 * Math.sin(lf * 1.7 + 1.2);

  // scene entrance
  const sceneIn = over(lf, 0, 12, Easing.out(Easing.cubic));

  // ===== ENVIRONMENT LAYER PALETTE =====
  const DEEP = "#0E1220"; // deepest bg
  const NAVY = "#141A2C";
  const NAVY2 = "#1B2338";
  const WARM = "#CF9544"; // amber lamp
  const WARMGLOW = "rgba(231,178,76,0.55)";
  const CLAYC = "#D97757";

  // ===== dust motes (ambient particles in lamp light) =====
  const motes = Array.from({ length: 22 }).map((_, i) => {
    const bx = 120 + rnd(i * 3.1) * 780;
    const by = 200 + rnd(i * 7.7) * 520;
    const drift = Math.sin(lf * 0.03 + i) * 14;
    const rise = ((lf * (0.3 + rnd(i) * 0.5) + i * 40) % 560);
    const y = by - rise * 0.25 + drift * 0.4;
    const x = bx + Math.sin(lf * 0.04 + i * 2) * 10;
    // brighter near lamp (upper-left desk area ~ x 300, y 300)
    const dToLamp = Math.hypot(x - 330, y - 300);
    const glow = clamp01(1 - dToLamp / 460);
    const op = (0.08 + glow * 0.4) * sceneIn;
    const sz = 1.5 + rnd(i * 5) * 3 + glow * 2;
    return { x, y, op, sz, glow };
  });

  // ===== shelf items (background, in shadow) =====
  const books = [
    { x: 60, w: 22, h: 96, c: "#2A3350" },
    { x: 84, w: 18, h: 110, c: "#243052" },
    { x: 104, w: 26, h: 84, c: "#2E2740" },
    { x: 132, w: 20, h: 104, c: "#22304A" },
    { x: 154, w: 24, h: 92, c: "#2B3A56" },
    { x: 180, w: 16, h: 112, c: "#26314C" },
  ];
  const books2 = [
    { x: 812, w: 20, h: 100, c: "#243052" },
    { x: 834, w: 26, h: 88, c: "#2E2740" },
    { x: 862, w: 18, h: 108, c: "#22304A" },
    { x: 882, w: 24, h: 94, c: "#2B3A56" },
    { x: 908, w: 20, h: 104, c: "#26314C" },
  ];

  // ===== TAP button glows on the control panel =====
  const tapGlow = (idx: number) => {
    const tf = taps[idx];
    const g = clamp01(1 - Math.abs(lf - tf) / 8);
    return g;
  };
  const pressAny = Math.max(tapGlow(0), tapGlow(1), tapGlow(2));

  // human hand poke: which button is being pressed, hand goes down
  const handTarget = (() => {
    // pick the nearest upcoming/active tap for hand position
    let idx = 0;
    for (let i = 0; i < taps.length; i++) {
      if (lf >= taps[i] - 10) idx = i;
    }
    return idx;
  })();
  const handPress = pressAny; // 0..1

  // ===== learning sparkles: arc from human panel -> fable notepad =====
  // launch one burst per tap
  const sparkParticles: {
    x: number;
    y: number;
    op: number;
    sz: number;
    hot: number;
  }[] = [];
  taps.forEach((tf, ti) => {
    const startX = 372; // panel button location
    const startY = 508;
    const endX = 690; // fable notepad
    const endY = 470;
    for (let k = 0; k < 5; k++) {
      const delay = tf + k * 2.2;
      const p = clamp01((lf - delay) / 20);
      if (p <= 0 || p >= 1) continue;
      const ez = Easing.inOut(Easing.sin)(p);
      // arc: quadratic bezier with control point up high
      const cx = (startX + endX) / 2 + (ti - 1) * 14;
      const cy = 360 - 40 * Math.sin(k);
      const mt = ez;
      const x =
        (1 - mt) * (1 - mt) * startX +
        2 * (1 - mt) * mt * cx +
        mt * mt * endX;
      const y =
        (1 - mt) * (1 - mt) * startY +
        2 * (1 - mt) * mt * cy +
        mt * mt * endY;
      const op = Math.sin(p * Math.PI) * 0.95;
      sparkParticles.push({
        x,
        y,
        op,
        sz: 3 + (1 - p) * 3,
        hot: 1 - p,
      });
    }
  });

  // dotted glowing arc guide
  const arcDots = Array.from({ length: 14 }).map((_, i) => {
    const t = i / 13;
    const startX = 388,
      startY = 500,
      endX = 676,
      endY = 476,
      cx = 532,
      cy = 350;
    const x =
      (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * cx + t * t * endX;
    const y =
      (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * cy + t * t * endY;
    // travelling shimmer
    const phase = ((lf * 0.04) % 1);
    const near = clamp01(1 - Math.abs(((t - phase + 1) % 1) - 0) * 3);
    const arcOn = clamp01((lf - taps[0]) / 12);
    const op = (0.18 + near * 0.6) * arcOn;
    return { x, y, op, sz: 2.5 + near * 3 };
  });

  // ===== REC halo pulse over fable =====
  const recPulse = 0.5 + 0.5 * Math.sin(lf * 0.34);
  const recBlink = (Math.floor(lf / 12) % 2 === 0) ? 1 : 0.35;

  // ===== eyes flash =====
  const eyeFlash = clamp01(1 - Math.abs(lf - flashF) / 6);

  // ===== LEARNED popup =====
  const learnedIn = over(lf, learnedF, 10, Easing.out(Easing.back(1.7)));
  const learnedGlow = 0.6 + 0.4 * Math.sin(lf * 0.5);
  const bulbOn = clamp01((lf - flashF) / 8);

  // ===== retention counter: "steps learned" ticking up with taps =====
  const stepsLearned = taps.filter((tf) => lf >= tf).length;
  const counterPop = (() => {
    let g = 0;
    taps.forEach((tf) => {
      g = Math.max(g, clamp01(1 - Math.abs(lf - tf) / 6));
    });
    return g;
  })();

  // ===== fable lean-in (watches intently, leans toward human) =====
  const fableLean = 2 * Math.sin(lf * 0.12) + lerp(0, 4, over(lf, 20, 40));
  const fableExcite = eyeFlash; // shock/pop at flash

  // human tap arm bob
  const humanArm = handPress;

  // vignette
  const vig = 0.55;

  return (
    <>
      {/* ================= DARK CINEMATIC ENVIRONMENT ================= */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(120% 90% at 34% 42%, ${NAVY2} 0%, ${NAVY} 40%, ${DEEP} 100%)`,
        }}
      />
      {/* back wall subtle warm bloom from lamp */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(46% 42% at 33% 34%, ${WARMGLOW} 0%, rgba(231,178,76,0.10) 34%, rgba(0,0,0,0) 62%)`,
          opacity: lampFlicker * 0.9 * sceneIn,
          mixBlendMode: "screen",
        }}
      />

      {/* ---- BACKGROUND LAYER: window w/ moonlight (far) ---- */}
      <div
        style={{
          position: "absolute",
          left: 470,
          top: 120,
          width: 210,
          height: 250,
          borderRadius: 8,
          background:
            "linear-gradient(180deg,#1C2740 0%,#141C30 60%,#0F1524 100%)",
          border: "3px solid #232D46",
          boxShadow: "0 0 16px rgba(90,120,180,0.18)",
          opacity: 0.9 * sceneIn,
        }}
      >
        {/* window mullions */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            width: 3,
            height: "100%",
            background: "#232D46",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            height: 3,
            width: "100%",
            background: "#232D46",
          }}
        />
        {/* moon */}
        <div
          style={{
            position: "absolute",
            right: 26,
            top: 26,
            width: 40,
            height: 40,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 38% 38%,#E8ECF5,#AEB9D0 70%,#8C97B4)",
            boxShadow: "0 0 10px rgba(200,214,240,0.5)",
          }}
        />
        {/* tiny city dots far below window */}
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={"cty" + i}
            style={{
              position: "absolute",
              bottom: 8 + (i % 3) * 6,
              left: 10 + i * 22,
              width: 3,
              height: 3,
              borderRadius: 1,
              background: "#7E8FB8",
              opacity: 0.5 + 0.5 * ((Math.floor(lf / 20) + i) % 2),
            }}
          />
        ))}
      </div>

      {/* ---- MIDGROUND: shelves in shadow (left + right) ---- */}
      <div
        style={{
          position: "absolute",
          left: 36,
          top: 150,
          width: 190,
          height: 14,
          background: "#1A2236",
          borderRadius: 3,
          boxShadow: "0 8px 20px rgba(0,0,0,0.5)",
          opacity: sceneIn,
        }}
      />
      {books.map((b, i) => (
        <div
          key={"bk" + i}
          style={{
            position: "absolute",
            left: b.x,
            top: 150 - b.h,
            width: b.w,
            height: b.h,
            background: b.c,
            borderRadius: 2,
            borderTop: "3px solid rgba(255,255,255,0.05)",
            boxShadow: "inset -3px 0 6px rgba(0,0,0,0.4)",
            opacity: 0.92 * sceneIn,
          }}
        />
      ))}
      <div
        style={{
          position: "absolute",
          left: 792,
          top: 150,
          width: 170,
          height: 14,
          background: "#1A2236",
          borderRadius: 3,
          boxShadow: "0 8px 20px rgba(0,0,0,0.5)",
          opacity: sceneIn,
        }}
      />
      {books2.map((b, i) => (
        <div
          key={"bk2" + i}
          style={{
            position: "absolute",
            left: b.x,
            top: 150 - b.h,
            width: b.w,
            height: b.h,
            background: b.c,
            borderRadius: 2,
            borderTop: "3px solid rgba(255,255,255,0.05)",
            boxShadow: "inset -3px 0 6px rgba(0,0,0,0.4)",
            opacity: 0.9 * sceneIn,
          }}
        />
      ))}

      {/* ---- POTTED PLANT in shadow (right of window) ---- */}
      <div
        style={{
          position: "absolute",
          left: 726,
          top: 300,
          opacity: 0.95 * sceneIn,
        }}
      >
        {/* pot */}
        <div
          style={{
            position: "absolute",
            left: 8,
            top: 96,
            width: 58,
            height: 54,
            background: "linear-gradient(180deg,#2A2334,#1C1826)",
            borderRadius: "6px 6px 12px 12px",
            boxShadow: "0 10px 22px rgba(0,0,0,0.55)",
          }}
        />
        {/* leaves */}
        {[
          { r: -34, x: 6, y: 6, h: 100 },
          { r: -12, x: 22, y: 0, h: 118 },
          { r: 10, x: 38, y: 2, h: 110 },
          { r: 30, x: 52, y: 10, h: 92 },
        ].map((l, i) => (
          <div
            key={"lf" + i}
            style={{
              position: "absolute",
              left: l.x,
              top: l.y,
              width: 20,
              height: l.h,
              borderRadius: "50% 50% 50% 50% / 70% 70% 30% 30%",
              background:
                "linear-gradient(180deg,#3F6E58 0%,#2C4E3E 70%,#22382E 100%)",
              transform: `rotate(${
                l.r + Math.sin(lf * 0.05 + i) * 2.5
              }deg)`,
              transformOrigin: "50% 100%",
              boxShadow: "inset -4px 0 8px rgba(0,0,0,0.35)",
            }}
          />
        ))}
      </div>

      {/* ---- wire from lamp trailing down (detail) ---- */}
      <svg
        style={{ position: "absolute", left: 0, top: 0, opacity: 0.6 * sceneIn }}
        width="1012"
        height="792"
      >
        <path
          d="M300 360 Q 260 470 300 560 T 340 720"
          stroke="#20283C"
          strokeWidth="4"
          fill="none"
        />
      </svg>

      {/* ================= DESK (foreground surface) ================= */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 560,
          width: "100%",
          height: 232,
          background:
            "linear-gradient(180deg,#241C16 0%,#1A140F 55%,#120D0A 100%)",
          boxShadow: "0 -14px 40px rgba(0,0,0,0.5)",
          opacity: sceneIn,
        }}
      />
      {/* desk warm sheen where lamp hits */}
      <div
        style={{
          position: "absolute",
          left: 120,
          top: 566,
          width: 560,
          height: 150,
          background:
            "radial-gradient(60% 80% at 40% 10%, rgba(231,178,76,0.28), rgba(231,178,76,0) 70%)",
          opacity: lampFlicker * sceneIn,
          mixBlendMode: "screen",
          filter: "blur(4px)",
        }}
      />

      {/* ================= DESK LAMP (hero light source, upper-left) ================= */}
      <div
        style={{
          position: "absolute",
          left: 250,
          top: 250,
          opacity: sceneIn,
        }}
      >
        {/* arm */}
        <div
          style={{
            position: "absolute",
            left: 30,
            top: 120,
            width: 10,
            height: 200,
            background: "#2C3040",
            borderRadius: 6,
            transformOrigin: "bottom",
            transform: "rotate(-16deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 6,
            top: 34,
            width: 10,
            height: 120,
            background: "#2C3040",
            borderRadius: 6,
            transformOrigin: "bottom",
            transform: "rotate(28deg)",
          }}
        />
        {/* base */}
        <div
          style={{
            position: "absolute",
            left: 6,
            top: 306,
            width: 78,
            height: 16,
            background: "#232838",
            borderRadius: "50%",
            boxShadow: "0 8px 16px rgba(0,0,0,0.5)",
          }}
        />
        {/* shade */}
        <div
          style={{
            position: "absolute",
            left: -14,
            top: 8,
            width: 74,
            height: 42,
            background: "linear-gradient(180deg,#3A3A44,#23242E)",
            borderRadius: "40px 40px 8px 8px",
            transform: "rotate(24deg)",
            boxShadow: "0 6px 14px rgba(0,0,0,0.4)",
          }}
        />
        {/* bulb glow */}
        <div
          style={{
            position: "absolute",
            left: 14,
            top: 40,
            width: 26,
            height: 26,
            borderRadius: "50%",
            background: `radial-gradient(circle,#FFF2CE, ${WARM} 70%)`,
            filter: "blur(1px)",
            boxShadow: `0 0 16px 12px ${WARMGLOW}`,
            opacity: lampFlicker,
          }}
        />
      </div>
      {/* lamp light CONE onto desk */}
      <div
        style={{
          position: "absolute",
          left: 210,
          top: 300,
          width: 380,
          height: 320,
          background:
            "linear-gradient(174deg, rgba(255,226,150,0.30) 0%, rgba(231,178,76,0.10) 45%, rgba(231,178,76,0) 78%)",
          clipPath: "polygon(30% 0%, 60% 0%, 100% 100%, 0% 100%)",
          opacity: lampFlicker * 0.9 * sceneIn,
          mixBlendMode: "screen",
          filter: "blur(3px)",
        }}
      />

      {/* ================= DUST MOTES ================= */}
      {motes.map((m, i) => (
        <div
          key={"mote" + i}
          style={{
            position: "absolute",
            left: m.x,
            top: m.y,
            width: m.sz,
            height: m.sz,
            borderRadius: "50%",
            background: m.glow > 0.4 ? "#FFE7AE" : "#8FA0C4",
            opacity: m.op,
            boxShadow:
              m.glow > 0.4
                ? `0 0 ${4 + m.glow * 6}px rgba(255,226,150,0.8)`
                : "none",
          }}
        />
      ))}

      {/* ================= LEFT: HUMAN WORKER + CONTROL PANEL ================= */}
      {/* human shadow on desk */}
      <div
        style={{
          position: "absolute",
          left: 250,
          top: 640,
          width: 200,
          height: 34,
          background: "rgba(0,0,0,0.45)",
          borderRadius: "50%",
          filter: "blur(9px)",
          opacity: sceneIn,
        }}
      />
      {/* HUMAN sprite (simple cel-shaded person) */}
      <div
        style={{
          position: "absolute",
          left: 268,
          top: 400,
          transform: `translateY(${(1 - sceneIn) * 18}px)`,
          opacity: sceneIn,
        }}
      >
        {/* head */}
        <div
          style={{
            position: "absolute",
            left: 44,
            top: 0,
            width: 66,
            height: 66,
            borderRadius: "50%",
            background: "linear-gradient(180deg,#C98A63,#A86E4C)",
            boxShadow: "inset -6px -4px 10px rgba(0,0,0,0.28)",
          }}
        />
        {/* hair */}
        <div
          style={{
            position: "absolute",
            left: 42,
            top: -6,
            width: 70,
            height: 40,
            borderRadius: "40px 40px 0 0",
            background: "linear-gradient(180deg,#2A211B,#1A1512)",
          }}
        />
        {/* body / hoodie */}
        <div
          style={{
            position: "absolute",
            left: 20,
            top: 58,
            width: 116,
            height: 130,
            borderRadius: "40px 40px 14px 14px",
            background: "linear-gradient(180deg,#39506F,#28405C)",
            boxShadow: "inset -8px -6px 16px rgba(0,0,0,0.3)",
          }}
        />
        {/* warm rim light on shoulder from lamp */}
        <div
          style={{
            position: "absolute",
            left: 18,
            top: 60,
            width: 22,
            height: 120,
            borderRadius: 20,
            background:
              "linear-gradient(180deg, rgba(231,178,76,0.5), rgba(231,178,76,0))",
            filter: "blur(2px)",
            mixBlendMode: "screen",
          }}
        />
        {/* left arm resting */}
        <div
          style={{
            position: "absolute",
            left: 6,
            top: 96,
            width: 34,
            height: 78,
            borderRadius: 18,
            background: "linear-gradient(180deg,#324A68,#26405C)",
            transform: "rotate(10deg)",
          }}
        />
        {/* RIGHT arm reaching to panel (animated poke) */}
        <div
          style={{
            position: "absolute",
            left: 108,
            top: 92,
            width: 32,
            height: 90,
            borderRadius: 16,
            background: "linear-gradient(180deg,#324A68,#26405C)",
            transformOrigin: "top center",
            transform: `rotate(${34 + humanArm * 12}deg) translateY(${
              humanArm * 8
            }px)`,
          }}
        >
          {/* hand */}
          <div
            style={{
              position: "absolute",
              left: 4,
              bottom: -14,
              width: 26,
              height: 26,
              borderRadius: "50%",
              background: "linear-gradient(180deg,#C98A63,#A86E4C)",
              boxShadow: handPress > 0.3 ? `0 0 5px ${WARMGLOW}` : "none",
            }}
          />
        </div>
      </div>

      {/* CONTROL PANEL (glowing buttons the human taps) */}
      <div
        style={{
          position: "absolute",
          left: 300,
          top: 486,
          width: 150,
          height: 84,
          borderRadius: 12,
          background: "linear-gradient(180deg,#1F2740,#141A2C)",
          border: "2px solid #2C3654",
          boxShadow: `0 10px 24px rgba(0,0,0,0.5), 0 0 10px ${
            pressAny > 0.2 ? "rgba(231,178,76,0.4)" : "rgba(60,92,132,0.25)"
          }`,
          opacity: sceneIn,
          padding: 12,
          display: "flex",
          gap: 10,
          alignItems: "center",
        }}
      >
        {[0, 1, 2].map((b) => {
          const g = tapGlow(b);
          const done = lf >= taps[b];
          return (
            <div
              key={"btn" + b}
              style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                background: g > 0.15
                  ? "radial-gradient(circle,#FFE7AE,#CF9544)"
                  : done
                  ? "linear-gradient(180deg,#3F9E74,#5a7048)"
                  : "linear-gradient(180deg,#2A3350,#1E2540)",
                border: "1px solid rgba(255,255,255,0.12)",
                boxShadow:
                  g > 0.15
                    ? `0 0 ${8 + g * 18}px rgba(231,178,76,0.9)`
                    : done
                    ? "0 0 4px rgba(63,158,116,0.5)"
                    : "inset 0 2px 4px rgba(0,0,0,0.4)",
                transform: `translateY(${g * 3}px) scale(${1 - g * 0.08})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: mono,
                fontSize: 14,
                color: done ? "#ede6d4" : "#7E8FB8",
              }}
            >
              {done ? "✓" : b + 1}
            </div>
          );
        })}
      </div>
      {/* panel label */}
      <div
        style={{
          position: "absolute",
          left: 300,
          top: 462,
          fontFamily: mono,
          fontSize: 13,
          letterSpacing: 1,
          color: "#8FA0C4",
          opacity: 0.85 * sceneIn,
        }}
      >
        YOU · once
      </div>

      {/* ================= DOTTED GLOWING LEARNING ARC ================= */}
      {arcDots.map((d, i) => (
        <div
          key={"arc" + i}
          style={{
            position: "absolute",
            left: d.x,
            top: d.y,
            width: d.sz,
            height: d.sz,
            borderRadius: "50%",
            background: "#FFE7AE",
            opacity: d.op,
            boxShadow: `0 0 4px rgba(231,178,76,0.8)`,
          }}
        />
      ))}
      {/* travelling learning sparkles */}
      {sparkParticles.map((s, i) => (
        <div
          key={"sp" + i}
          style={{
            position: "absolute",
            left: s.x,
            top: s.y,
            width: s.sz,
            height: s.sz,
            borderRadius: "50%",
            background: s.hot > 0.5 ? "#FFF2CE" : "#E7B24C",
            opacity: s.op,
            boxShadow: `0 0 ${6 + s.sz}px rgba(231,178,76,0.95)`,
            transform: "translate(-50%,-50%)",
          }}
        />
      ))}

      {/* ================= RIGHT: FABLE SPRITE (watching intently) ================= */}
      {/* fable shadow */}
      <div
        style={{
          position: "absolute",
          left: 600,
          top: 646,
          width: 210,
          height: 34,
          background: "rgba(0,0,0,0.42)",
          borderRadius: "50%",
          filter: "blur(9px)",
          opacity: sceneIn,
        }}
      />
      {/* REC halo over fable */}
      <div
        style={{
          position: "absolute",
          left: 636,
          top: 372,
          display: "flex",
          alignItems: "center",
          gap: 7,
          padding: "5px 12px",
          borderRadius: 20,
          background: "rgba(196,74,58,0.16)",
          border: "1.5px solid rgba(196,74,58,0.55)",
          boxShadow: `0 0 ${12 + recPulse * 18}px rgba(196,74,58,${
            0.35 + recPulse * 0.4
          })`,
          transform: `scale(${1 + recPulse * 0.05})`,
          opacity: sceneIn,
          zIndex: 6,
        }}
      >
        <div
          style={{
            width: 11,
            height: 11,
            borderRadius: "50%",
            background: "#E8564A",
            opacity: recBlink,
            boxShadow: "0 0 4px rgba(232,86,74,0.9)",
          }}
        />
        <span
          style={{
            fontFamily: mono,
            fontSize: 13,
            letterSpacing: 2,
            color: "#F0B4AC",
            fontWeight: 700,
          }}
        >
          REC
        </span>
      </div>

      {/* Fable Mascot with lean + excite */}
      <div
        style={{
          position: "absolute",
          left: 618,
          top: 470,
          transform: `translate(${-fableLean}px, ${
            (1 - sceneIn) * 18 - fableExcite * 6
          }px) rotate(${-fableLean * 0.4}deg)`,
          transformOrigin: "bottom center",
          zIndex: 5,
          filter: `drop-shadow(0 14px 22px rgba(0,0,0,0.45))`,
        }}
      >
        {/* warm rim light behind fable */}
        <div
          style={{
            position: "absolute",
            left: -18,
            top: -10,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(231,178,76,0.22), rgba(231,178,76,0) 65%)",
            filter: "blur(4px)",
          }}
        />
        <Mascot
          lf={lf}
          size={168}
          gaze={-0.5}
          nodAmp={2}
          nodSpeed={0.5}
          shock={fableExcite}
        />
        {/* big glowing eyes overlay (intense focus) */}
        <div
          style={{
            position: "absolute",
            left: 52,
            top: 60,
            width: 24,
            height: 24,
            borderRadius: "50%",
            background: "radial-gradient(circle,#FFF6DE,#E7B24C 70%)",
            opacity: 0.35 + eyeFlash * 0.6,
            filter: "blur(1px)",
            boxShadow: `0 0 ${8 + eyeFlash * 22}px rgba(231,178,76,${
              0.5 + eyeFlash * 0.5
            })`,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 92,
            top: 60,
            width: 24,
            height: 24,
            borderRadius: "50%",
            background: "radial-gradient(circle,#FFF6DE,#E7B24C 70%)",
            opacity: 0.35 + eyeFlash * 0.6,
            filter: "blur(1px)",
            boxShadow: `0 0 ${8 + eyeFlash * 22}px rgba(231,178,76,${
              0.5 + eyeFlash * 0.5
            })`,
          }}
        />
      </div>

      {/* GLOWING NOTEPAD in fable's hands */}
      <div
        style={{
          position: "absolute",
          left: 690,
          top: 566,
          width: 96,
          height: 62,
          borderRadius: 8,
          background: "linear-gradient(180deg,#F5EFE0,#E4DAC4)",
          border: "2px solid #C9BC9C",
          boxShadow: `0 8px 18px rgba(0,0,0,0.4), 0 0 ${
            14 + pressAny * 20
          }px rgba(231,178,76,${0.4 + pressAny * 0.4})`,
          transform: `translateY(${-fableExcite * 4}px) rotate(-6deg)`,
          zIndex: 6,
          overflow: "hidden",
          opacity: sceneIn,
        }}
      >
        {/* written lines appear per tap */}
        {[0, 1, 2].map((r) => {
          const on = clamp01((lf - taps[r] - 4) / 8);
          return (
            <div
              key={"ln" + r}
              style={{
                position: "absolute",
                left: 10,
                top: 12 + r * 15,
                height: 4,
                width: `${on * (54 - r * 8)}px`,
                borderRadius: 2,
                background: "#8A6A3C",
                opacity: 0.85,
              }}
            />
          );
        })}
        {/* check when all learned */}
        <div
          style={{
            position: "absolute",
            right: 8,
            bottom: 6,
            fontFamily: mono,
            fontSize: 16,
            color: "#3F9E74",
            fontWeight: 800,
            opacity: bulbOn,
          }}
        >
          ✓
        </div>
      </div>

      {/* ================= PAYOFF: LIGHTBULB "✓ LEARNED" ================= */}
      <div
        style={{
          position: "absolute",
          left: 660,
          top: 340,
          transform: `translateY(${(1 - learnedIn) * 20}px) scale(${
            0.6 + learnedIn * 0.4
          })`,
          opacity: learnedIn,
          zIndex: 9,
        }}
      >
        {/* burst rays */}
        {learnedIn > 0.1 &&
          Array.from({ length: 8 }).map((_, i) => {
            const a = (i / 8) * Math.PI * 2;
            const len = 22 + learnedGlow * 8;
            return (
              <div
                key={"ray" + i}
                style={{
                  position: "absolute",
                  left: 66,
                  top: 20,
                  width: len,
                  height: 3,
                  background:
                    "linear-gradient(90deg,rgba(231,178,76,0.9),rgba(231,178,76,0))",
                  transformOrigin: "left center",
                  transform: `rotate(${(a * 180) / Math.PI}deg)`,
                  opacity: learnedIn * 0.9,
                }}
              />
            );
          })}
        {/* lightbulb */}
        <div
          style={{
            position: "absolute",
            left: 52,
            top: -18,
            width: 30,
            height: 30,
            borderRadius: "50%",
            background: "radial-gradient(circle at 40% 38%,#FFF6D8,#F0C25A)",
            boxShadow: `0 0 ${16 + learnedGlow * 16}px rgba(231,178,76,0.95)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 60,
            top: 10,
            width: 14,
            height: 8,
            background: "#B08A3A",
            borderRadius: "0 0 4px 4px",
          }}
        />
        {/* LEARNED pill */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 34,
            padding: "8px 16px",
            borderRadius: 22,
            background: "linear-gradient(180deg,#3F9E74,#5a7048)",
            border: "2px solid rgba(255,255,255,0.25)",
            boxShadow: `0 8px 20px rgba(0,0,0,0.4), 0 0 ${
              10 + learnedGlow * 14
            }px rgba(63,158,116,0.6)`,
            display: "flex",
            alignItems: "center",
            gap: 8,
            whiteSpace: "nowrap",
          }}
        >
          <span
            style={{
              fontFamily: mono,
              fontSize: 18,
              color: "#ede6d4",
              fontWeight: 800,
            }}
          >
            ✓
          </span>
          <span
            style={{
              fontFamily: fraunces.fontFamily,
              fontSize: 20,
              color: "#FFFFFF",
              fontWeight: 700,
              letterSpacing: 0.5,
            }}
          >
            LEARNED
          </span>
        </div>
      </div>

      {/* ================= LABEL: "watched once" ================= */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 178,
          display: "flex",
          justifyContent: "center",
          opacity: over(lf, 6, 12) * (1 - over(lf, 100, 8) * 0.15),
        }}
      >
        <div
          style={{
            padding: "8px 20px",
            borderRadius: 24,
            background: "rgba(20,26,44,0.72)",
            border: "1.5px solid rgba(231,178,76,0.4)",
            boxShadow: "0 6px 18px rgba(0,0,0,0.4)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span style={{ fontSize: 16 }}>👁️</span>
          <span
            style={{
              fontFamily: fraunces.fontFamily,
              fontSize: 24,
              fontWeight: 700,
              color: "#F3ECDC",
              letterSpacing: 0.3,
            }}
          >
            watched <span style={{ color: WARM, fontStyle: "italic" }}>once</span>
          </span>
        </div>
      </div>

      {/* ================= RETENTION COUNTER: steps learned ================= */}
      <div
        style={{
          position: "absolute",
          right: 40,
          top: 220,
          transform: `scale(${1 + counterPop * 0.12})`,
          opacity: over(lf, 10, 10),
          zIndex: 7,
        }}
      >
        <div
          style={{
            padding: "10px 14px",
            borderRadius: 14,
            background: "rgba(15,20,34,0.8)",
            border: "1.5px solid rgba(63,158,116,0.45)",
            boxShadow: `0 6px 16px rgba(0,0,0,0.45), 0 0 ${
              8 + counterPop * 16
            }px rgba(63,158,116,${0.3 + counterPop * 0.4})`,
            textAlign: "center",
            minWidth: 92,
          }}
        >
          <div
            style={{
              fontFamily: mono,
              fontSize: 11,
              letterSpacing: 1.5,
              color: "#a0b384",
            }}
          >
            STEPS LEARNED
          </div>
          <div
            style={{
              fontFamily: fraunces.fontFamily,
              fontSize: 40,
              fontWeight: 800,
              color: "#ede6d4",
              lineHeight: 1,
              marginTop: 2,
            }}
          >
            {stepsLearned}
            <span style={{ fontSize: 20, color: "#a0b384" }}>/3</span>
          </div>
          {/* live tag */}
          <div
            style={{
              marginTop: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
            }}
          >
            <span
              style={{
                width: 0,
                height: 0,
                borderLeft: "5px solid transparent",
                borderRight: "5px solid transparent",
                borderBottom: "8px solid #3F9E74",
                opacity: recBlink,
              }}
            />
            <span
              style={{
                fontFamily: mono,
                fontSize: 10,
                letterSpacing: 1.5,
                color: "#3F9E74",
              }}
            >
              live
            </span>
          </div>
        </div>
      </div>

      {/* ================= VIGNETTE (cinematic edges) ================= */}
      <AbsoluteFill
        style={{
          pointerEvents: "none",
          background:
            "radial-gradient(120% 100% at 50% 46%, rgba(0,0,0,0) 52%, rgba(0,0,0,0.5) 100%)",
          opacity: vig,
        }}
      />
      {/* top + bottom safe darkening for header/captions */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: 60,
          background: "linear-gradient(180deg,rgba(0,0,0,0.4),rgba(0,0,0,0))",
        }}
      />
    </>
  );
};

const Rehook: React.FC<{ lf: number }> = ({ lf }) => <Panel label=""><RehookScene lf={lf} /><ScreenHead lf={lf} big="YOU TEACH IT" clay="ONCE" /></Panel>;

const DoingScene: React.FC<{ lf: number }> = ({ lf }) => {
  // ===== timing / helpers =====
  const T = (s: number) => fr(s);
  const ov = (start: number, dur: number, ease?: any) => over(lf, start, dur, ease);

  // deep cinematic night command-center palette
  const BG_TOP = "#0A0E1C";
  const BG_MID = "#0E1526";
  const BG_LOW = "#10182C";
  const WALL = "#141C30";
  const WALL_HI = "#1B2540";
  const CONSOLE = "#16203A";
  const BLUE_GLOW = "#3E6FB0";
  const AMBER_GLOW = "#CF9544";
  const GREEN_DONE = "#3F9E74";
  const GREEN_BRIGHT = "#57C58C";

  // scene phases (0..6.7s):
  //  0.0-0.6 room fades up + booting
  //  0.6-1.4 console/operator sprite settles, first task pings out
  //  1.4-4.6 waves of tasks fly out, monitors flip green, counter climbs
  //  4.6-5.6 climax: whole wall goes green in a sweep
  //  5.6-6.7 payoff hold: counter locks ~240, "on autopilot" pulses

  const roomIn = ov(0, 18, Easing.out(Easing.cubic));
  const bootFlicker = 0.5 + 0.5 * Math.sin(lf * 0.9);

  // ===== global master counter (retention) =====
  // climbs fast then eases into ~240
  const countPhase = ov(20, 130, Easing.out(Easing.cubic));
  const tasksDone = Math.min(240, Math.round(interpolate(countPhase, [0, 1], [3, 240])));

  // progress bar
  const barPct = interpolate(ov(24, 128, Easing.out(Easing.cubic)), [0, 1], [0.02, 1]);

  // ===== MONITOR WALL grid =====
  // curved wall: 6 cols x 4 rows = 24 screens, plus flanks
  const COLS = 6;
  const ROWS = 4;
  const monitors: { c: number; r: number; idx: number; doneAt: number }[] = [];
  let mi = 0;
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      // completion staggered in waves, sweeping left->right, top->bottom
      const wave = c * 4 + r * 3;
      const doneAt = 34 + wave * 3 + Math.floor(seed(mi * 7 + 3) * 6);
      monitors.push({ c, r, idx: mi, doneAt });
      mi++;
    }
  }
  // climax sweep: force ALL green by ~5.4s
  const CLIMAX = T(4.6);
  const monDoneFrame = (m: { doneAt: number }) => Math.min(m.doneAt, CLIMAX + 6);

  // curved wall geometry — screens pushed onto an arc
  const wallCX = 506;
  const monW = 118;
  const monH = 78;
  const gapX = 8;
  const gapY = 12;
  const wallTop = 176;
  const rowLift = (r: number) => Math.sin((r / (ROWS - 1)) * Math.PI) * 0; // rows flat vertically
  const arcCurve = (c: number) => {
    // arc: center cols closer, edge cols recede + rotate
    const t = (c - (COLS - 1) / 2) / ((COLS - 1) / 2); // -1..1
    return t;
  };

  // ===== waves of "task packets" flying from console to wall =====
  const packets: any[] = [];
  const NPK = 22;
  for (let p = 0; p < NPK; p++) {
    const launch = 24 + p * 6 + Math.floor(seed(p * 13 + 1) * 5);
    const targetMon = monitors[Math.floor(seed(p * 31 + 5) * monitors.length)];
    packets.push({ p, launch, targetMon });
  }

  // console emitter origin (operator hands)
  const emitX = 506;
  const emitY = 640;

  // ambient dust motes
  const motes = Array.from({ length: 26 }, (_, i) => i);

  // ceiling spot beams
  const beams = [
    { x: 250, hue: BLUE_GLOW, delay: 2 },
    { x: 506, hue: AMBER_GLOW, delay: 6 },
    { x: 760, hue: BLUE_GLOW, delay: 10 },
  ];

  // cabling on floor
  const cables = Array.from({ length: 7 }, (_, i) => i);

  // small side status readouts
  const readouts = ["NET OK", "GPU 92%", "QUEUE", "LATENCY", "AUTH"];

  // operator subtle gesture cycle
  const gestureUp = 0.12 + 0.1 * (0.5 + 0.5 * Math.sin(lf * 0.16 + 1));
  const consoleGaze = Math.sin(lf * 0.05) * 0.5;

  // sleeping human bob (breathing)
  const sleepBob = Math.sin(lf * 0.08) * 3;

  // Zzz float
  const zzz = [0, 1, 2];

  // label "on autopilot"
  const labelIn = ov(30, 16, Easing.out(Easing.back(1.4)));
  const labelPulse = 0.85 + 0.15 * (0.5 + 0.5 * Math.sin(lf * 0.13));

  // payoff whole-wall glow bloom
  const bloom = ov(CLIMAX - 2, 40, Easing.out(Easing.cubic));
  const finLock = ov(T(5.6), 20, Easing.out(Easing.cubic));

  // counter pop at lock
  const counterPop = 1 + 0.08 * ov(T(5.6), 8, Easing.out(Easing.back(2))) * (1 - ov(T(5.9), 8));

  // helper: a single wall monitor
  const WallMon: React.FC<{ m: any }> = ({ m }) => {
    const t = arcCurve(m.c);
    const recede = Math.abs(t); // 0 center .. 1 edge
    const x = wallCX + t * ((monW + gapX) * (COLS - 1)) / 2 * 0.62 - monW / 2 + t * recede * 26;
    const y = wallTop + m.r * (monH + gapY) - recede * 10;
    const rotY = t * 26; // degrees
    const scale = 1 - recede * 0.1;
    const df = monDoneFrame(m);
    const flipT = ov(df, 9, Easing.out(Easing.cubic));
    const isDone = lf >= df;
    // pre-done: scrolling task lines in blue/amber; post-done: green ✓ DONE
    const scan = (lf * 2 + m.idx * 9) % monH;
    const brightness = 0.55 + 0.45 * flipT + recede * -0.06;
    const doneCol = isDone ? GREEN_DONE : WALL_HI;
    const lines = 4;
    return (
      <div
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: monW,
          height: monH,
          transform: `perspective(900px) rotateY(${rotY}deg) scale(${scale})`,
          transformOrigin: "center",
          filter: `brightness(${brightness})`,
        }}
      >
        {/* bezel */}
        <div
          style={{
            position: "absolute",
            inset: -3,
            borderRadius: 8,
            background: "#080B14",
            boxShadow: `0 6px 16px rgba(0,0,0,0.6), inset 0 0 0 4px rgba(255,255,255,0.04)`,
          }}
        />
        {/* screen */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 6,
            overflow: "hidden",
            background: isDone
              ? `linear-gradient(160deg, #123024, #0E241C)`
              : `linear-gradient(160deg, #0E1830, #0C1424)`,
            boxShadow: isDone
              ? `0 0 ${10 + 16 * flipT}px rgba(63,158,116,${0.5 * flipT + 0.15}), inset 0 0 0 4px rgba(87,197,140,${0.35 * flipT})`
              : `0 0 4px rgba(62,111,176,0.25), inset 0 0 0 4px rgba(62,111,176,0.22)`,
          }}
        >
          {/* pre-done scrolling code lines */}
          {!isDone &&
            Array.from({ length: lines }).map((_, li) => {
              const ly = ((scan + li * 20) % (monH + 20)) - 10;
              const w = 30 + seed(m.idx * 5 + li) * 55;
              const amber = seed(m.idx + li * 3) > 0.7;
              return (
                <div
                  key={li}
                  style={{
                    position: "absolute",
                    left: 8,
                    top: ly,
                    width: w,
                    height: 4,
                    borderRadius: 2,
                    background: amber ? AMBER_GLOW : BLUE_GLOW,
                    opacity: 0.55,
                  }}
                />
              );
            })}
          {/* running task tag pre-done */}
          {!isDone && (
            <div
              style={{
                position: "absolute",
                left: 7,
                bottom: 6,
                fontFamily: mono,
                fontSize: 7,
                letterSpacing: 0.5,
                color: BLUE_GLOW,
                opacity: 0.7,
              }}
            >
              ▲ run
            </div>
          )}
          {/* DONE state */}
          {isDone && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 3,
                opacity: flipT,
                transform: `scale(${0.8 + 0.2 * flipT})`,
              }}
            >
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  background: GREEN_BRIGHT,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `0 0 ${8 + 10 * flipT}px rgba(87,197,140,0.8)`,
                }}
              >
                <span style={{ color: "#0E241C", fontSize: 13, fontWeight: 900 }}>✓</span>
              </div>
              <div
                style={{
                  fontFamily: mono,
                  fontSize: 8,
                  fontWeight: 800,
                  letterSpacing: 1,
                  color: GREEN_BRIGHT,
                }}
              >
                DONE
              </div>
            </div>
          )}
          {/* scanline sheen */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(180deg, rgba(255,255,255,0.05), transparent 40%)`,
              pointerEvents: "none",
            }}
          />
        </div>
        {/* flip burst ring */}
        {flipT > 0 && flipT < 1 && (
          <div
            style={{
              position: "absolute",
              inset: -6,
              borderRadius: 12,
              border: `2px solid rgba(87,197,140,${(1 - flipT) * 0.9})`,
              transform: `scale(${1 + flipT * 0.5})`,
              pointerEvents: "none",
            }}
          />
        )}
      </div>
    );
  };

  return (
    <>
      {/* ============ DARK CINEMATIC ENVIRONMENT BACKDROP ============ */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(120% 90% at 50% 15%, ${BG_MID} 0%, ${BG_TOP} 55%, #070A14 100%)`,
          opacity: roomIn,
        }}
      />
      {/* deep floor plane */}
      <AbsoluteFill>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 300,
            background: `linear-gradient(180deg, transparent, ${BG_LOW} 40%, #090D18 100%)`,
            transform: "perspective(700px) rotateX(48deg)",
            transformOrigin: "bottom",
            opacity: roomIn,
          }}
        />
        {/* floor grid lines for depth */}
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${8 + i * 11}%`,
              bottom: 0,
              width: 1,
              height: 170,
              background: `linear-gradient(180deg, transparent, rgba(62,111,176,0.14))`,
              transform: `perspective(700px) rotateX(48deg)`,
              transformOrigin: "bottom",
              opacity: roomIn * 0.8,
            }}
          />
        ))}
      </AbsoluteFill>

      {/* ceiling spot beams */}
      {beams.map((b, i) => {
        const on = ov(b.delay, 14, Easing.out(Easing.cubic));
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: b.x,
              top: 60,
              width: 300,
              height: 620,
              marginLeft: -150,
              background: `linear-gradient(180deg, ${b.hue}44, transparent 70%)`,
              clipPath: "polygon(38% 0, 62% 0, 100% 100%, 0% 100%)",
              filter: "blur(6px)",
              opacity: on * (0.28 + 0.06 * Math.sin(lf * 0.1 + i)),
              mixBlendMode: "screen",
            }}
          />
        );
      })}

      {/* curved wall base structure behind monitors */}
      <div
        style={{
          position: "absolute",
          left: 40,
          right: 40,
          top: 150,
          height: 400,
          borderRadius: "50% 50% 12px 12px / 22% 22% 12px 12px",
          background: `linear-gradient(180deg, ${WALL} 0%, ${WALL_HI} 60%, ${WALL} 100%)`,
          boxShadow: `inset 0 30px 60px rgba(0,0,0,0.5), inset 0 -10px 30px rgba(62,111,176,0.08)`,
          opacity: roomIn,
        }}
      />
      {/* wall ambient blue wash */}
      <div
        style={{
          position: "absolute",
          left: 40,
          right: 40,
          top: 150,
          height: 400,
          background: `radial-gradient(80% 60% at 50% 40%, rgba(62,111,176,${0.14 + 0.1 * bloom}), transparent 70%)`,
          opacity: roomIn,
          mixBlendMode: "screen",
        }}
      />

      {/* ============ MONITOR WALL (24 screens on arc) ============ */}
      <div style={{ position: "absolute", inset: 0, opacity: roomIn }}>
        {monitors.map((m) => (
          <WallMon key={m.idx} m={m} />
        ))}
      </div>

      {/* payoff: whole-wall green bloom sweep */}
      <div
        style={{
          position: "absolute",
          left: 40,
          right: 40,
          top: 150,
          height: 400,
          background: `radial-gradient(70% 55% at 50% 45%, rgba(63,158,116,${0.22 * bloom}), transparent 72%)`,
          mixBlendMode: "screen",
          pointerEvents: "none",
        }}
      />

      {/* ============ CABLING on floor from wall to console ============ */}
      <svg
        style={{ position: "absolute", inset: 0, opacity: roomIn }}
        width="1012"
        height="792"
        viewBox="0 0 1012 792"
      >
        {cables.map((c) => {
          const sx = 160 + c * 120;
          const path = `M ${sx} 552 C ${sx} 620, ${480 + (c - 3) * 20} 630, 506 656`;
          const flow = (lf * 3 + c * 20) % 100;
          return (
            <g key={c}>
              <path d={path} stroke="#100c08" strokeWidth={6} fill="none" opacity={0.8} />
              <path
                d={path}
                stroke={c % 2 ? AMBER_GLOW : BLUE_GLOW}
                strokeWidth={2}
                fill="none"
                opacity={0.4}
                strokeDasharray="6 14"
                strokeDashoffset={-flow}
              />
            </g>
          );
        })}
      </svg>

      {/* ============ CENTRAL GLOWING CONSOLE ============ */}
      <div
        style={{
          position: "absolute",
          left: 506,
          top: 596,
          width: 340,
          height: 150,
          marginLeft: -170,
          opacity: roomIn,
        }}
      >
        {/* console glow pool */}
        <div
          style={{
            position: "absolute",
            left: -40,
            top: -30,
            right: -40,
            bottom: -20,
            background: `radial-gradient(60% 60% at 50% 30%, rgba(62,111,176,0.35), transparent 70%)`,
            filter: "blur(4px)",
            mixBlendMode: "screen",
          }}
        />
        {/* desk slab */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 40,
            width: 340,
            height: 100,
            borderRadius: 14,
            background: `linear-gradient(180deg, ${CONSOLE}, #0C1424)`,
            boxShadow: `0 20px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(62,111,176,0.3)`,
            transform: "perspective(500px) rotateX(30deg)",
            transformOrigin: "top",
          }}
        />
        {/* console holographic panels */}
        {[0, 1, 2].map((k) => {
          const bp = k === 1 ? barPct : ov(28 + k * 10, 40, Easing.out(Easing.cubic));
          return (
            <div
              key={k}
              style={{
                position: "absolute",
                left: 44 + k * 92,
                top: 50,
                width: 74,
                height: 40,
                borderRadius: 6,
                background: `linear-gradient(160deg, rgba(62,111,176,0.28), rgba(62,111,176,0.08))`,
                boxShadow: `inset 0 0 0 4px rgba(62,111,176,0.4), 0 0 5px rgba(62,111,176,0.25)`,
                transform: "perspective(500px) rotateX(30deg)",
                transformOrigin: "top",
                overflow: "hidden",
              }}
            >
              {/* mini progress inside a panel */}
              <div
                style={{
                  position: "absolute",
                  left: 6,
                  bottom: 8,
                  width: 62,
                  height: 5,
                  borderRadius: 3,
                  background: "rgba(255,255,255,0.08)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: 6,
                  bottom: 8,
                  width: 62 * bp,
                  height: 5,
                  borderRadius: 3,
                  background: k === 1 ? GREEN_BRIGHT : AMBER_GLOW,
                  boxShadow: `0 0 4px ${k === 1 ? GREEN_BRIGHT : AMBER_GLOW}`,
                }}
              />
              {Array.from({ length: 3 }).map((_, l) => (
                <div
                  key={l}
                  style={{
                    position: "absolute",
                    left: 6,
                    top: 6 + l * 7,
                    width: 30 + seed(k * 3 + l) * 30,
                    height: 3,
                    borderRadius: 2,
                    background: BLUE_GLOW,
                    opacity: 0.5,
                  }}
                />
              ))}
            </div>
          );
        })}
      </div>

      {/* ============ OPERATOR SPRITE at console ============ */}
      <div
        style={{
          position: "absolute",
          left: 506,
          top: 560,
          marginLeft: -70,
          opacity: roomIn,
        }}
      >
        {/* seat glow */}
        <div
          style={{
            position: "absolute",
            left: 10,
            top: 60,
            width: 120,
            height: 60,
            borderRadius: "50%",
            background: "radial-gradient(50% 50% at 50% 50%, rgba(62,111,176,0.4), transparent 70%)",
            filter: "blur(3px)",
          }}
        />
        <div
          style={{
            transform: `translateY(${Math.sin(lf * 0.09) * 2}px)`,
          }}
        >
          <Mascot
            lf={lf}
            size={140}
            glasses={1}
            suit={1}
            cheer={gestureUp}
            gaze={consoleGaze}
            nodAmp={0.25}
            nodSpeed={0.6}
          />
        </div>
        {/* "OPERATOR" nameplate */}
        <div
          style={{
            position: "absolute",
            left: 8,
            top: 128,
            fontFamily: mono,
            fontSize: 9,
            letterSpacing: 2,
            color: BLUE_GLOW,
            opacity: 0.7,
          }}
        >
          OPERATOR · HANDS-FREE
        </div>
      </div>

      {/* ============ TASK PACKETS flying console -> wall ============ */}
      {packets.map((pk) => {
        const t = ov(pk.launch, 18, Easing.inOut(Easing.sin));
        if (t <= 0 || t >= 1) return null;
        const m = pk.targetMon;
        const tt = arcCurve(m.c);
        const tx =
          wallCX + tt * ((monW + gapX) * (COLS - 1)) / 2 * 0.62 + tt * Math.abs(tt) * 26;
        const ty = wallTop + m.r * (monH + gapY) + monH / 2 - Math.abs(tt) * 10;
        const px = interpolate(t, [0, 1], [emitX, tx]);
        const py = interpolate(t, [0, 1], [emitY, ty]) - Math.sin(t * Math.PI) * 60;
        const sc = interpolate(t, [0, 1], [1, 0.4]);
        return (
          <div
            key={pk.p}
            style={{
              position: "absolute",
              left: px,
              top: py,
              width: 14,
              height: 14,
              marginLeft: -7,
              marginTop: -7,
              borderRadius: 4,
              background: seed(pk.p) > 0.5 ? AMBER_GLOW : GREEN_BRIGHT,
              boxShadow: `0 0 5px ${seed(pk.p) > 0.5 ? AMBER_GLOW : GREEN_BRIGHT}`,
              transform: `scale(${sc}) rotate(45deg)`,
              opacity: Math.sin(t * Math.PI),
            }}
          />
        );
      })}

      {/* ============ SLEEPING HUMAN off to the side ============ */}
      <div
        style={{
          position: "absolute",
          left: 118,
          top: 548,
          opacity: roomIn,
        }}
      >
        {/* recliner chair */}
        <div
          style={{
            position: "absolute",
            left: -18,
            top: 74,
            width: 150,
            height: 84,
            borderRadius: "40px 40px 16px 16px",
            background: `linear-gradient(180deg, #1A2236, #101828)`,
            boxShadow: "0 16px 30px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.05)",
            transform: "rotate(-4deg)",
          }}
        />
        {/* dim lamp glow (relaxed) */}
        <div
          style={{
            position: "absolute",
            left: -30,
            top: 40,
            width: 160,
            height: 120,
            borderRadius: "50%",
            background: "radial-gradient(50% 50% at 40% 40%, rgba(207,149,68,0.18), transparent 70%)",
            filter: "blur(4px)",
          }}
        />
        <div style={{ transform: `translateY(${sleepBob}px) rotate(-8deg)` }}>
          <Mascot lf={lf} size={120} beard={1} stern={0} nodAmp={0.05} nodSpeed={0.2} gaze={0} />
        </div>
        {/* closed-eye rest line */}
        <div
          style={{
            position: "absolute",
            left: 34,
            top: 132,
            fontFamily: mono,
            fontSize: 9,
            letterSpacing: 1,
            color: MUTE,
            opacity: 0.6,
          }}
        >
          you · asleep
        </div>
        {/* Zzz floating */}
        {zzz.map((z) => {
          const zt = ((lf * 0.6 + z * 22) % 66) / 66;
          return (
            <div
              key={z}
              style={{
                position: "absolute",
                left: 78 + z * 14 + zt * 18,
                top: 46 - zt * 46,
                fontFamily: fraunces.fontFamily,
                fontWeight: 900,
                fontSize: 16 + z * 6,
                color: "#8FA6C8",
                opacity: (1 - zt) * 0.8,
                transform: `rotate(${zt * 12}deg)`,
              }}
            >
              Z
            </div>
          );
        })}
      </div>

      {/* ============ BIG LIVE COUNTER (retention) ============ */}
      <div
        style={{
          position: "absolute",
          right: 44,
          top: 300,
          width: 210,
          textAlign: "right",
          transform: `scale(${counterPop})`,
          transformOrigin: "right center",
          opacity: roomIn,
        }}
      >
        <div
          style={{
            fontFamily: mono,
            fontSize: 13,
            letterSpacing: 3,
            color: GREEN_BRIGHT,
            marginBottom: 2,
            textTransform: "uppercase",
          }}
        >
          Tasks Done
        </div>
        <div
          style={{
            fontFamily: fraunces.fontFamily,
            fontWeight: 900,
            fontSize: 88,
            lineHeight: 0.9,
            color: CREAM,
            textShadow: `0 0 ${18 + 20 * bloom}px rgba(87,197,140,${0.5 + 0.3 * bloom}), 0 6px 20px rgba(0,0,0,0.6)`,
          }}
        >
          {tasksDone}
        </div>
        {/* live tag */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            marginTop: 6,
            padding: "3px 10px",
            borderRadius: 20,
            background: "rgba(63,158,116,0.15)",
            boxShadow: "inset 0 0 0 4px rgba(87,197,140,0.4)",
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: GREEN_BRIGHT,
              boxShadow: `0 0 4px ${GREEN_BRIGHT}`,
              opacity: 0.6 + 0.4 * Math.sin(lf * 0.4),
            }}
          />
          <span
            style={{
              fontFamily: mono,
              fontSize: 11,
              letterSpacing: 1,
              color: GREEN_BRIGHT,
            }}
          >
            ▲ LIVE
          </span>
        </div>
      </div>

      {/* master progress bar under counter zone */}
      <div
        style={{
          position: "absolute",
          right: 44,
          left: 560,
          top: 470,
          height: 12,
          borderRadius: 8,
          background: "rgba(255,255,255,0.06)",
          boxShadow: "inset 0 0 0 4px rgba(62,111,176,0.25)",
          opacity: roomIn,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: `${barPct * 100}%`,
            borderRadius: 8,
            background: `linear-gradient(90deg, ${BLUE_GLOW}, ${GREEN_BRIGHT})`,
            boxShadow: `0 0 5px rgba(87,197,140,0.6)`,
          }}
        />
        {/* moving sheen */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: `${((lf * 2) % 120) - 20}%`,
            width: 40,
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          right: 44,
          top: 486,
          fontFamily: mono,
          fontSize: 10,
          letterSpacing: 2,
          color: MUTE,
          opacity: roomIn,
        }}
      >
        QUEUE {Math.round((1 - barPct) * 240)} REMAINING
      </div>

      {/* ============ SIDE STATUS READOUTS (dense detail) ============ */}
      {readouts.map((r, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: 44,
            top: 176 + i * 46,
            width: 96,
            padding: "5px 8px",
            borderRadius: 6,
            background: "rgba(62,111,176,0.1)",
            boxShadow: "inset 0 0 0 4px rgba(62,111,176,0.28)",
            opacity: roomIn * ov(4 + i * 3, 10),
          }}
        >
          <div style={{ fontFamily: mono, fontSize: 9, letterSpacing: 1, color: BLUE_GLOW }}>{r}</div>
          <div
            style={{
              marginTop: 4,
              height: 4,
              borderRadius: 2,
              background: "rgba(255,255,255,0.08)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${40 + 55 * (0.5 + 0.5 * Math.sin(lf * 0.15 + i))}%`,
                height: "100%",
                background: i % 2 ? AMBER_GLOW : GREEN_BRIGHT,
                opacity: 0.8,
              }}
            />
          </div>
        </div>
      ))}

      {/* ============ DUST MOTES / particles for atmosphere ============ */}
      {motes.map((i) => {
        const mx = seed(i * 3 + 1) * 1012;
        const drift = ((lf * (0.3 + seed(i) * 0.5) + i * 40) % 800);
        const my = 700 - drift;
        const sz = 1.5 + seed(i * 5) * 2.5;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: mx,
              top: my,
              width: sz,
              height: sz,
              borderRadius: "50%",
              background: seed(i) > 0.6 ? AMBER_GLOW : "#9FB6D8",
              opacity: (0.15 + 0.35 * seed(i * 7)) * roomIn,
              filter: "blur(0.5px)",
            }}
          />
        );
      })}

      {/* ============ "on autopilot" LABEL ============ */}
      <div
        style={{
          position: "absolute",
          left: 506,
          top: 726,
          marginLeft: -140,
          width: 280,
          textAlign: "center",
          transform: `translateY(${(1 - labelIn) * 20}px) scale(${labelIn})`,
          opacity: labelIn * labelPulse,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 20px",
            borderRadius: 30,
            background: "linear-gradient(90deg, rgba(63,158,116,0.2), rgba(62,111,176,0.2))",
            boxShadow: `inset 0 0 0 1.5px rgba(87,197,140,0.5), 0 0 ${16 + 16 * bloom}px rgba(63,158,116,${0.3 + 0.3 * bloom})`,
          }}
        >
          <span style={{ fontSize: 16 }}>⚙️</span>
          <span
            style={{
              fontFamily: fraunces.fontFamily,
              fontWeight: 900,
              fontSize: 26,
              letterSpacing: 0.5,
              color: CREAM,
              textShadow: "0 2px 8px rgba(0,0,0,0.5)",
            }}
          >
            on autopilot
          </span>
        </div>
      </div>

      {/* payoff: ALL-GREEN confirmation flash sweep across wall */}
      {finLock > 0 && (
        <div
          style={{
            position: "absolute",
            left: 40,
            right: 40,
            top: 150,
            height: 400,
            borderRadius: "50% 50% 12px 12px / 22% 22% 12px 12px",
            boxShadow: `inset 0 0 25px rgba(87,197,140,${0.25 * finLock})`,
            pointerEvents: "none",
          }}
        />
      )}

      {/* subtle vignette for cinematic depth */}
      <AbsoluteFill
        style={{
          background: "radial-gradient(130% 100% at 50% 45%, transparent 55%, rgba(0,0,0,0.55) 100%)",
          pointerEvents: "none",
        }}
      />
    </>
  );
};

const Doing: React.FC<{ lf: number }> = ({ lf }) => <Panel label=""><DoingScene lf={lf} /><ScreenHead lf={lf} big="IT RUNS IT" clay="ITSELF" /></Panel>;

const OutlastScene: React.FC<{ lf: number }> = ({ lf }) => {
  // ===== timing (6.8s @30fps = 204 frames) =====
  const dividerIn = over(lf, fr(0.1), fr(0.7), Easing.out(Easing.cubic));
  const leftIn = over(lf, fr(0.2), fr(0.8), Easing.out(Easing.cubic));
  const rightIn = over(lf, fr(0.4), fr(0.9), Easing.out(Easing.cubic));
  const labelsIn = over(lf, fr(0.6), fr(0.7), Easing.out(Easing.back(1.6)));

  // Fable finishes work -> scroll forms (0.9-2.0)
  const workGlow = over(lf, fr(0.9), fr(1.0), Easing.inOut(Easing.sin));
  const scrollForm = over(lf, fr(1.4), fr(0.8), Easing.out(Easing.back(1.4)));
  // toss arc across divider (2.3 - 3.5)
  const toss = over(lf, fr(2.3), fr(1.2), Easing.inOut(Easing.sin));
  // catch + unroll (3.5 - 4.4)
  const caught = over(lf, fr(3.5), fr(0.5), Easing.out(Easing.back(1.5)));
  const unroll = over(lf, fr(3.9), fr(0.8), Easing.out(Easing.cubic));
  // replay panel runs (4.4 - end), coins rain, escalate
  const replay = over(lf, fr(4.4), fr(1.6), Easing.linear);
  const coinsOn = over(lf, fr(4.6), fr(2.0), Easing.out(Easing.cubic));
  const payoff = over(lf, fr(5.6), fr(1.0), Easing.out(Easing.cubic));

  const PANW = 1012, PANH = 792, MIDX = 506;

  // colors
  const DARKL = "#161B2E"; // left deep navy
  const DARKR = "#12141C"; // right deeper/cooler
  const GOLD = "#E7B24C", AMBER = "#CF9544", CLAY = "#D2724E";
  const CREAM = "#ECE9E2", MUTE = "#9A968B", GREEN = "#3F9E74";

  // retention counter: runs replayed
  const runCount = Math.floor(over(lf, fr(4.4), fr(2.2), Easing.out(Easing.cubic)) * 47);
  // coins saved counter
  const saved = (over(lf, fr(4.5), fr(2.1), Easing.out(Easing.cubic)) * 1.88).toFixed(2);

  // ---- scroll world-position along toss arc ----
  // start: left sprite hands ~ (300, 470). end: right sprite hands ~ (700, 470)
  const sx = interpolate(toss, [0, 1], [320, 690]);
  const arcY = 470 - Math.sin(toss * Math.PI) * 210;
  const scrollRot = interpolate(toss, [0, 1], [-8, 190]);

  // dust motes
  const motes = Array.from({ length: 26 }, (_, i) => {
    const s = seed(i * 3.7);
    const s2 = seed(i * 9.1);
    const bx = s * PANW;
    const drift = Math.sin(lf / (24 + s2 * 30) + i) * 16;
    const by = ((s2 * PANH + lf * (0.25 + s * 0.5)) % PANH);
    const side = bx < MIDX;
    return { x: bx + drift, y: by, r: 1 + s2 * 2.4, o: 0.10 + s * 0.22, side };
  });

  // shelf items generator
  const Shelf = ({ x, y, w, warm }: any) => (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: 14, background: warm ? "#2A2418" : "#1B1E28", borderRadius: 3, boxShadow: "0 6px 12px rgba(0,0,0,0.5)" }}>
      {Array.from({ length: Math.floor(w / 26) }).map((_, i) => {
        const hh = 22 + (seed(i + x) * 26);
        const cols = warm ? ["#5A4526", "#7A5A2C", "#463618", "#8A6A34"] : ["#2C3140", "#232733", "#343A4C", "#1E222E"];
        return <div key={i} style={{ position: "absolute", left: 6 + i * 26, top: -hh, width: 18, height: hh, background: cols[i % 4], borderRadius: "2px 2px 0 0", boxShadow: "inset -2px 0 0 rgba(0,0,0,0.3)" }} />;
      })}
    </div>
  );

  // little coin
  const Coin = ({ x, y, s, o }: any) => (
    <div style={{ position: "absolute", left: x, top: y, width: s, height: s, transform: `scaleX(${0.5 + Math.abs(Math.sin(lf / 6 + x)) * 0.5})`, opacity: o }}>
      <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: `radial-gradient(circle at 35% 30%, #FBE39A, ${GOLD} 55%, ${AMBER})`, border: `2px solid ${AMBER}`, boxShadow: `0 0 4px rgba(231,178,76,0.6)`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: mono, fontSize: s * 0.5, color: "#7A5410", fontWeight: 800 }}>$</div>
    </div>
  );

  return (
    <>
      {/* ===== DETAILED DARK ENVIRONMENT BACKDROP ===== */}
      <AbsoluteFill style={{ background: DARKR }}>
        {/* left half deep navy room */}
        <div style={{ position: "absolute", left: 0, top: 0, width: MIDX, height: PANH, background: `radial-gradient(120% 90% at 30% 20%, #23294240 0%, transparent 60%), linear-gradient(160deg, ${DARKL} 0%, #0E1120 100%)` }} />
        {/* right half cool room */}
        <div style={{ position: "absolute", left: MIDX, top: 0, width: MIDX, height: PANH, background: `radial-gradient(120% 90% at 70% 25%, #1C2A3830 0%, transparent 60%), linear-gradient(200deg, ${DARKR} 0%, #0A0C12 100%)` }} />

        {/* warm ambient lamp glow left (top) */}
        <div style={{ position: "absolute", left: 40, top: -40, width: 520, height: 420, background: `radial-gradient(circle at 40% 40%, rgba(231,178,76,${0.20 + workGlow * 0.10}) 0%, transparent 65%)`, filter: "blur(4px)" }} />
        {/* cool ambient glow right */}
        <div style={{ position: "absolute", left: 520, top: -20, width: 520, height: 420, background: `radial-gradient(circle at 60% 40%, rgba(96,130,180,${0.10 + replay * 0.10}) 0%, transparent 65%)`, filter: "blur(4px)" }} />

        {/* floor plane */}
        <div style={{ position: "absolute", left: 0, top: 640, width: PANW, height: 152, background: "linear-gradient(180deg, #0C0E18 0%, #060709 100%)", boxShadow: "inset 0 20px 40px rgba(0,0,0,0.6)" }} />
        {/* floor reflection lines */}
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} style={{ position: "absolute", left: 0, top: 660 + i * 20, width: PANW, height: 1, background: `rgba(255,255,255,${0.03 - i * 0.003})` }} />
        ))}

        {/* back wall shelves */}
        <Shelf x={30} y={250} w={210} warm />
        <Shelf x={40} y={410} w={180} warm />
        <Shelf x={780} y={250} w={200} warm={false} />
        <Shelf x={800} y={410} w={170} warm={false} />

        {/* hanging wires / cables from ceiling */}
        {[120, 210, 880, 930].map((x, i) => (
          <div key={i} style={{ position: "absolute", left: x, top: 0, width: 2, height: 90 + seed(i) * 50, background: "#2A2E3A" }} />
        ))}
        {/* small hanging lamps warm-left */}
        {[150, 250].map((x, i) => (
          <div key={i} style={{ position: "absolute", left: x - 10, top: 100 + seed(i + 2) * 40, width: 22, height: 14, background: "radial-gradient(circle at 50% 30%, #FBE39A, #A87A2E)", borderRadius: "50% 50% 40% 40%", boxShadow: "0 0 10px rgba(231,178,76,0.5)" }} />
        ))}

        {/* dust motes both sides */}
        {motes.map((m, i) => (
          <div key={i} style={{ position: "absolute", left: m.x, top: m.y, width: m.r, height: m.r, borderRadius: "50%", background: m.side ? "#F4D98A" : "#8FA6C4", opacity: m.o, filter: "blur(0.4px)" }} />
        ))}

        {/* ===== GLOWING CENTER DIVIDER ===== */}
        <div style={{ position: "absolute", left: MIDX - 2, top: 0, width: 4, height: PANH, transformOrigin: "center top", transform: `scaleY(${dividerIn})`, background: `linear-gradient(180deg, transparent, ${GOLD} 20%, ${AMBER} 50%, ${GOLD} 80%, transparent)`, boxShadow: `0 0 10px ${GOLD}, 0 0 20px rgba(231,178,76,0.5)` }} />
        {/* divider pulse nodes */}
        {[180, 370, 470, 560].map((y, i) => {
          const p = (Math.sin(lf / 10 + i * 1.4) + 1) / 2;
          return <div key={i} style={{ position: "absolute", left: MIDX - 5, top: y, width: 10, height: 10, borderRadius: "50%", background: GOLD, opacity: dividerIn * (0.4 + p * 0.6), boxShadow: `0 0 5px ${GOLD}` }} />;
        })}

        {/* ===== TOP LABELS ===== */}
        <div style={{ position: "absolute", left: 60, top: 60, opacity: labelsIn, transform: `translateY(${(1 - labelsIn) * -14}px)` }}>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 15, letterSpacing: 2, color: GOLD }}>THIS WEEK</div>
          <div style={{ fontFamily: mono, fontWeight: 700, fontSize: 13, color: CREAM, marginTop: 2, background: "rgba(231,178,76,0.16)", border: `1px solid ${AMBER}`, borderRadius: 6, padding: "2px 8px", display: "inline-block", boxShadow: "0 0 6px rgba(231,178,76,0.4)" }}>· FREE ·</div>
        </div>
        <div style={{ position: "absolute", left: 560, top: 60, opacity: labelsIn, transform: `translateY(${(1 - labelsIn) * -14}px)` }}>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 15, letterSpacing: 2, color: "#8FA6C4" }}>AFTER JULY 12</div>
          <div style={{ fontFamily: mono, fontWeight: 700, fontSize: 13, color: "#B9C4D4", marginTop: 2, background: "rgba(96,130,180,0.14)", border: "1px solid #3A5C84", borderRadius: 6, padding: "2px 8px", display: "inline-block" }}>cheap model</div>
        </div>

        {/* ===== LEFT SIDE: premium Fable sprite + desk ===== */}
        <div style={{ position: "absolute", left: 130, top: 300, opacity: leftIn, transform: `translateY(${(1 - leftIn) * 40}px)` }}>
          {/* desk */}
          <div style={{ position: "absolute", left: -20, top: 210, width: 300, height: 22, background: "linear-gradient(180deg, #3A2E18, #241C0E)", borderRadius: 5, boxShadow: "0 14px 26px rgba(0,0,0,0.6)" }} />
          {/* warm rim spotlight behind sprite */}
          <div style={{ position: "absolute", left: -40, top: -40, width: 260, height: 300, background: `radial-gradient(circle at 50% 40%, rgba(231,178,76,${0.22 + workGlow * 0.12}) 0%, transparent 60%)`, filter: "blur(6px)" }} />
          <div style={{ position: "relative", filter: `drop-shadow(0 0 7px rgba(231,178,76,${0.4 + workGlow * 0.3}))` }}>
            <Mascot lf={lf} size={150} wizard={1} cheer={workGlow * 0.5 + toss * 0.4} nodAmp={2} nodSpeed={0.8} gaze={toss > 0.1 ? 0.6 : 0} />
          </div>
          {/* crown sparkle */}
          {[0, 1, 2].map((i) => {
            const p = (Math.sin(lf / 7 + i * 2) + 1) / 2;
            return <div key={i} style={{ position: "absolute", left: 50 + i * 24, top: 6 + i * 4, width: 6, height: 6, background: GOLD, opacity: 0.4 + p * 0.6, transform: "rotate(45deg)", boxShadow: `0 0 4px ${GOLD}` }} />;
          })}
        </div>

        {/* ===== the GOLDEN WORKFLOW SCROLL (.MINT) traveling ===== */}
        {(scrollForm > 0.01) && (
          <div style={{ position: "absolute", left: toss > 0.01 ? sx : 300, top: toss > 0.01 ? arcY : 470, transform: `rotate(${toss > 0.01 ? scrollRot : 0}deg) scale(${scrollForm * (0.9 + caught * 0.2)})`, transformOrigin: "center", filter: `drop-shadow(0 0 6px rgba(231,178,76,0.7))` }}>
            {/* scroll body */}
            <div style={{ width: unroll > 0.02 ? 40 + unroll * 120 : 46, height: 64, background: `linear-gradient(180deg, #F6E4B0, ${GOLD} 60%, ${AMBER})`, borderRadius: 6, border: `2px solid ${AMBER}`, position: "relative", boxShadow: "inset 0 0 4px rgba(255,255,255,0.4)" }}>
              {/* rolled ends */}
              <div style={{ position: "absolute", left: -6, top: -4, width: 12, height: 72, borderRadius: 8, background: `linear-gradient(90deg, ${AMBER}, #7A5410)` }} />
              <div style={{ position: "absolute", right: -6, top: -4, width: 12, height: 72, borderRadius: 8, background: `linear-gradient(90deg, #7A5410, ${AMBER})` }} />
              {/* text lines appear on unroll */}
              {unroll > 0.3 && Array.from({ length: 4 }).map((_, i) => (
                <div key={i} style={{ position: "absolute", left: 10, top: 12 + i * 11, width: (30 + i * 20) * unroll, height: 3, background: "#7A5410", opacity: 0.6, borderRadius: 2 }} />
              ))}
              {/* .MINT tag */}
              <div style={{ position: "absolute", left: "50%", top: -20, transform: "translateX(-50%)", fontFamily: mono, fontWeight: 800, fontSize: 12, color: "#7A5410", background: "#F6E4B0", padding: "1px 6px", borderRadius: 4, border: `1px solid ${AMBER}`, whiteSpace: "nowrap" }}>.MINT</div>
            </div>
          </div>
        )}
        {/* gold trail along toss arc */}
        {toss > 0.02 && toss < 0.99 && Array.from({ length: 8 }).map((_, i) => {
          const t = Math.max(0, toss - i * 0.05);
          const tx = interpolate(t, [0, 1], [320, 690]);
          const ty = 470 - Math.sin(t * Math.PI) * 210;
          return <div key={i} style={{ position: "absolute", left: tx + 20, top: ty + 30, width: 8 - i * 0.7, height: 8 - i * 0.7, borderRadius: "50%", background: GOLD, opacity: (0.5 - i * 0.06), boxShadow: `0 0 4px ${GOLD}`, filter: "blur(0.5px)" }} />;
        })}

        {/* ===== RIGHT SIDE: cheap sprite + replay panel + coins ===== */}
        <div style={{ position: "absolute", left: 620, top: 320, opacity: rightIn, transform: `translateY(${(1 - rightIn) * 40}px)` }}>
          {/* desk */}
          <div style={{ position: "absolute", left: -10, top: 190, width: 260, height: 20, background: "linear-gradient(180deg, #232733, #14161E)", borderRadius: 5, boxShadow: "0 12px 22px rgba(0,0,0,0.6)" }} />
          {/* cool spotlight */}
          <div style={{ position: "absolute", left: -20, top: -10, width: 220, height: 250, background: `radial-gradient(circle at 50% 45%, rgba(96,130,180,${0.14 + replay * 0.12}) 0%, transparent 60%)`, filter: "blur(6px)" }} />
          {/* catch bounce */}
          <div style={{ position: "relative", transform: `translateY(${caught > 0.01 ? -Math.sin(caught * Math.PI) * 14 : 0}px)`, filter: `drop-shadow(0 0 4px rgba(96,130,180,0.4))` }}>
            <Mascot lf={lf} size={112} glasses={1} cheer={payoff * 0.9} nodAmp={payoff > 0.1 ? 3 : 1} nodSpeed={1.4} shock={caught > 0.05 && caught < 0.6 ? (1 - caught) * 0.5 : 0} />
          </div>
        </div>

        {/* replay panel (little glowing screen) */}
        {unroll > 0.4 && (
          <div style={{ position: "absolute", left: 640, top: 470, width: 210, height: 130, opacity: Math.min(1, (unroll - 0.4) * 3), transform: `scale(${0.9 + Math.min(1, (unroll - 0.4) * 3) * 0.1})`, background: "linear-gradient(160deg, #1A2030, #0C0F18)", borderRadius: 10, border: "1px solid #2E3A52", boxShadow: `0 0 12px rgba(96,130,180,${0.2 + replay * 0.25}), 0 16px 30px rgba(0,0,0,0.6)`, overflow: "hidden" }}>
            {/* window bar */}
            <div style={{ height: 20, background: "#151A28", display: "flex", alignItems: "center", paddingLeft: 8, gap: 5 }}>
              {["#C44A3A", "#CF9544", "#3F9E74"].map((c, i) => <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: c }} />)}
              <div style={{ marginLeft: 8, fontFamily: mono, fontSize: 9, color: MUTE }}>replay · run</div>
            </div>
            {/* task lines with checks */}
            <div style={{ padding: "10px 12px" }}>
              {["open browser", "fill form", "submit", "export"].map((t, i) => {
                const done = replay * 4 > i + 0.5;
                return (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8, opacity: replay * 4 > i - 0.5 ? 1 : 0.3 }}>
                    <div style={{ width: 13, height: 13, borderRadius: 3, border: `1.5px solid ${done ? GREEN : "#3A4358"}`, background: done ? GREEN : "transparent", color: "#fff", fontSize: 10, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800 }}>{done ? "✓" : ""}</div>
                    <div style={{ fontFamily: mono, fontSize: 11, color: done ? CREAM : MUTE }}>{t}</div>
                  </div>
                );
              })}
            </div>
            {/* blinking cursor */}
            <div style={{ position: "absolute", left: 32 + (replay * 40) % 60, top: 34 + Math.floor(replay * 4) * 21, width: 2, height: 12, background: GREEN, opacity: (Math.sin(lf / 4) + 1) / 2 }} />
            {/* $ tag */}
            <div style={{ position: "absolute", right: 8, bottom: 6, fontFamily: mono, fontWeight: 800, fontSize: 13, color: GOLD, background: "rgba(231,178,76,0.14)", border: `1px solid ${AMBER}`, borderRadius: 5, padding: "2px 6px", boxShadow: `0 0 5px rgba(231,178,76,${0.3 + coinsOn * 0.3})` }}>$0.04 / run</div>
          </div>
        )}

        {/* ===== GOLD COINS RAINING right side ===== */}
        {coinsOn > 0.01 && Array.from({ length: 22 }).map((_, i) => {
          const s = seed(i * 5.3);
          const cx = 560 + s * 400;
          const fall = ((coinsOn * 520) + s * 600 + i * 30) % 620;
          const cy = 130 + fall;
          const sz = 16 + seed(i * 2.1) * 12;
          // pile near bottom
          const piled = cy > 560;
          const py = piled ? 560 + (seed(i) * 40) : cy;
          const px = piled ? 600 + (seed(i * 7) * 320) : cx;
          return <Coin key={i} x={px} y={py} s={sz} o={0.5 + s * 0.5} />;
        })}
        {/* coin pile mound glow */}
        {payoff > 0.05 && (
          <div style={{ position: "absolute", left: 600, top: 588, width: 320, height: 60, background: `radial-gradient(ellipse at 50% 30%, rgba(231,178,76,${0.25 * payoff}), transparent 70%)`, filter: "blur(4px)" }} />
        )}

        {/* ===== RETENTION COUNTERS ===== */}
        {/* "▲ live" runs counter center-top */}
        {runCount > 0 && (
          <div style={{ position: "absolute", left: MIDX - 78, top: 150, width: 156, textAlign: "center", opacity: Math.min(1, runCount / 5) }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(63,158,116,0.16)", border: `1px solid ${GREEN}`, borderRadius: 20, padding: "4px 12px", boxShadow: `0 0 7px rgba(63,158,116,${0.3 + (Math.sin(lf / 6) + 1) / 2 * 0.3})` }}>
              <span style={{ color: GREEN, fontSize: 11 }}>▲</span>
              <span style={{ fontFamily: mono, fontWeight: 800, fontSize: 15, color: CREAM }}>{runCount} runs replayed</span>
            </div>
          </div>
        )}
        {/* saved $ ticker bottom-right */}
        {coinsOn > 0.02 && (
          <div style={{ position: "absolute", left: 700, top: 700, opacity: coinsOn, transform: `scale(${0.9 + payoff * 0.15})` }}>
            <div style={{ fontFamily: mono, fontWeight: 800, fontSize: 22, color: GOLD, textShadow: `0 0 6px rgba(231,178,76,0.7)` }}>+ ${saved} saved</div>
          </div>
        )}

        {/* ===== bottom center LABEL ===== */}
        <div style={{ position: "absolute", left: MIDX - 150, top: 730, width: 300, textAlign: "center", opacity: labelsIn * (0.7 + payoff * 0.3) }}>
          <div style={{ display: "inline-block", fontFamily: fraunces.fontFamily, fontWeight: 900, fontStyle: "italic", fontSize: 22, color: GOLD, textShadow: `0 0 8px rgba(231,178,76,${0.4 + payoff * 0.4})`, transform: `scale(${1 + payoff * 0.06})` }}>you keep it forever</div>
        </div>

        {/* vignette */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(130% 100% at 50% 45%, transparent 55%, rgba(0,0,0,0.55) 100%)", pointerEvents: "none" }} />
      </AbsoluteFill>
    </>
  );
};

const Outlast: React.FC<{ lf: number }> = ({ lf }) => <Panel label=""><OutlastScene lf={lf} /><ScreenHead lf={lf} big="SAVE IT" clay="ONCE" /></Panel>;
// ============================ END MINT SCENES ============================ ============================ ============================ ============================ ============================

const CTA: React.FC<{ lf: number }> = ({ lf }) => {
  const inP = over(lf, 0.06, fr(0.22), Easing.out(Easing.back(1.4)));
  const kw = "MINT"; const typed = Math.floor(over(lf, fr(0.2), fr(0.5)) * kw.length);
  const arrowBob = Math.abs(Math.sin(lf / 5)) * 14; const kwPulse = 1 + Math.sin(lf / 3.4) * 0.05;
  return (
    <AbsoluteFill style={{ opacity: Math.min(1, inP * 1.3) }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 366, textAlign: "center", transform: `scale(${inP})` }}><span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 30, color: SLATE }}>the exact setup</span></div>
      <div style={{ position: "absolute", left: 220, right: 220, top: 440, transform: `scale(${inP})`, transformOrigin: "50% 0%" }}>
        <div style={{ borderRadius: 22, background: WIN, boxShadow: "0 30px 60px -20px rgba(10,16,34,0.5)", overflow: "hidden", border: "1px solid #E2D8C6" }}>
          <div style={{ height: 84, background: grad("#E9825C", "#C7541F"), display: "flex", alignItems: "center", padding: "0 26px", gap: 12 }}><ClaudeLogo lf={lf} size={34} /><div><div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 20, color: "rgba(255,255,255,0.85)" }}>THE MINT SETUP</div><div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 27, color: "#fff" }}>teach it once, it clicks forever</div></div></div>
          <div style={{ padding: "18px 28px", display: "flex", flexDirection: "column", gap: 11 }}>{["Record your task once", "The exact browser-agent prompts", "The guardrails so it can't misclick"].map((t, i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 24, color: INK }}><span style={{ width: 28, height: 28, borderRadius: 8, background: GREEN, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>✓</span>{t}</div>)}</div>
        </div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 796 + arrowBob, display: "flex", justifyContent: "center", opacity: inP }}><div style={{ width: 0, height: 0, borderLeft: "17px solid transparent", borderRight: "17px solid transparent", borderTop: `22px solid ${CLAY}` }} /></div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 856, textAlign: "center", transform: `scale(${inP})` }}>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 30, color: MUTE, marginBottom: 10 }}>comment</div>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 108, color: CLAY, letterSpacing: "-0.02em", lineHeight: 1, textShadow: `0 0 40px rgba(210,114,78,0.45)`, transform: `scale(${kwPulse})` }}>MINT</div>
        <div style={{ marginTop: 22, display: "inline-flex", alignItems: "center", gap: 14, padding: "15px 24px", borderRadius: 999, background: "#fff", border: "2px solid #E2D8C6", boxShadow: "0 16px 34px -16px rgba(10,16,34,0.35)" }}><span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 30, color: INK }}>{kw.slice(0, typed)}<span style={{ opacity: lf % 16 < 8 ? 1 : 0.2, color: CLAY }}>|</span></span><span style={{ width: 44, height: 44, borderRadius: "50%", background: grad("#E9825C", "#C7541F"), display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ width: 0, height: 0, borderTop: "9px solid transparent", borderBottom: "9px solid transparent", borderLeft: "14px solid #fff", marginLeft: 3 }} /></span></div>
      </div>
    </AbsoluteFill>
  );
};
const ClockCTA: React.FC<{ lf: number }> = ({ lf }) => (<><CTA lf={lf} />{lf >= 0 ? <SnackLane lf={Math.min(lf, fr(8) - 1)} /> : null}</>);

const SnackLane: React.FC<{ lf: number }> = ({ lf }) => {
  const total = fr(5);
  const pr = Math.min(1, lf / (fr(8)));
  const secLeft = Math.max(1, 5 - Math.floor(lf / FPS));
  const decP = Math.max(0, 1 - (lf % FPS) / 8);
  const inP = over(lf, 0, 8, Easing.out(Easing.back(1.4)));
  const laneL = 180, laneR = 800;
  const cx = laneL - 30 + pr * (laneR - laneL + 30);
  const lastSec = secLeft === 1;
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 1448, height: 130, opacity: inP, zIndex: 95, transform: `translateY(${(1 - inP) * 20}px)` }}>
      {/* lane track */}
      <div style={{ position: "absolute", left: 150, width: 700, top: 78, height: 10, borderRadius: 999, background: "rgba(58,92,132,0.25)" }} />
      <div style={{ position: "absolute", left: 150, width: Math.max(0, (cx - 150)), top: 78, height: 10, borderRadius: 999, background: grad("#E08A66", "#C5603C") }} />
      {/* pellets */}
      {Array.from({ length: 5 }, (_, k) => {
        const px = laneL + ((k + 0.6) / 5) * (laneR - laneL);
        const eatAt = (k + 1) * FPS - 6;
        const de = lf - eatAt;
        if (de > 14) return null;
        return (
          <div key={k} style={{ position: "absolute", left: px, top: 83 }}>
            {de < 0 && <div style={{ position: "absolute", left: -13, top: -13, width: 26, height: 26, borderRadius: "50%", background: grad("#F0CB63", "#D39A2A"), border: "3px solid #F6E4A0", boxShadow: `0 0 10px ${GOLD}`, transform: `scale(${1 + Math.sin(lf / 6 + k * 2) * 0.14})` }} />}
            {de >= 0 && <>
              <div style={{ position: "absolute", left: -13, top: -13, width: 26, height: 26, borderRadius: "50%", border: `3px solid ${GOLD}`, transform: `scale(${1 + de * 0.3})`, opacity: Math.max(0, 1 - de / 11) }} />
              {Array.from({ length: 5 }, (_, j) => { const aa = (j / 5) * Math.PI * 2; const dd = de * 3.4; return <div key={j} style={{ position: "absolute", left: Math.cos(aa) * dd - 3, top: Math.sin(aa) * dd - 3, width: 6, height: 6, borderRadius: "50%", background: [GOLD, CLAY, "#F3E3A6"][j % 3], opacity: Math.max(0, 1 - de / 12) }} />; })}
            </>}
          </div>);
      })}
      {/* the critter runs the lane eating */}
      {(() => { const chompP = Math.max(0, 1 - (lf % FPS) / 9); return (
        <div style={{ position: "absolute", left: cx, top: 26, transform: "translateX(-50%)", zIndex: 30 }}>
          <Mascot lf={lf} size={62} nodAmp={3.4} nodSpeed={4.5} cheer={chompP * 0.85} gaze={4} />
        </div>); })()}
      {/* numeral dial at the finish */}
      <div style={{ position: "absolute", left: 856, top: 34, width: 92, height: 92 }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: grad("#233250", "#18233A"), boxShadow: "0 10px 24px -8px rgba(18,28,58,0.5)" }} />
        <div style={{ position: "absolute", inset: 4, borderRadius: "50%", background: `conic-gradient(from 0deg, ${lastSec ? GOLD : CLAY}${lastSec ? "dd" : "aa"} ${pr * 360}deg, rgba(120,150,210,0.15) ${pr * 360}deg)`, WebkitMask: "radial-gradient(circle, transparent 58%, #000 59%)", mask: "radial-gradient(circle, transparent 58%, #000 59%)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", transform: `scale(${1 + decP * 0.2})` }}>
          <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 44, lineHeight: 0.9, color: lastSec ? "#F6E4A0" : "#F4EEE2", textShadow: lastSec ? `0 0 18px ${GOLD}` : "none" }}>{secLeft}</div>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 12, color: "rgba(190,205,235,0.7)" }}>sec</div>
        </div>
      </div>
    </div>
  );
};



// ---------------- progress bar (standing game-arc) ----------------
const ProgressBar: React.FC = () => {
  const f = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const t = f / FPS;
  const VIRT = 37;
  const p = Math.min(1, t / VIRT);
  const marks = [7.0, 17.0, 28.0];
  const STARS = [3.0, 11.0, 21.0, 30.0];
  const TOTAL = VIRT;
  const PELLETS = [1.5, 5, 9, 13, 18, 23, 27, 31];
  const score = PELLETS.filter((pt) => t >= pt).length + marks.filter((m) => t >= m).length * 3 + STARS.filter((m) => t >= m).length * 2;
  const incTimes = [...PELLETS, ...marks, ...STARS].filter((x) => t >= x);
  const lastInc = incTimes.length ? Math.max(...incTimes) : -9;
  const incPop = Math.max(0, 1 - (t - lastInc) * 3);
  const allItems = [...PELLETS, ...marks, ...STARS];
  const eaten = allItems.filter((x) => t >= x).length;

  return (
    <div style={{ position: "absolute", left: 46, right: 46, top: 272, height: 60, zIndex: 120 }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 20, height: 22, background: "rgba(58,92,132,0.22)", borderRadius: 999, boxShadow: "inset 0 1px 3px rgba(0,0,0,0.15)" }} />
      <div style={{ position: "absolute", left: 0, top: 20, height: 22, width: `${p * 100}%`, background: grad("#E08A66", "#C5603C"), borderRadius: 999, boxShadow: "0 3px 12px rgba(210,114,78,0.6)" }} />
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
      {STARS.map((m, i) => {
        const np = m / TOTAL; const passed = t >= m; const dt = passed ? t - m : 0;
        const pop = passed ? 1 + Math.max(0, 1 - dt * 2.0) * 0.6 * (1 + Math.sin(Math.min(dt, 0.5) * 24) * 0.3) : 1 + Math.sin(t * 2.6) * 0.06;
        return (
          <div key={`st${i}`} style={{ position: "absolute", left: `${np * 100}%`, top: 7, transform: "translateX(-50%)", width: 48, height: 48 }}>
            <div style={{ position: "absolute", inset: 0, transform: `scale(${pop})`, borderRadius: "50%", background: passed ? grad("#F0CB63", "#D39A2A") : "#25314A", border: `4px solid ${passed ? "#F6E4A0" : GOLD}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, color: passed ? "#fff" : GOLD, boxShadow: passed ? (dt < 0.5 ? `0 0 ${Math.max(6, 28 - dt * 40)}px ${GOLD}` : `0 0 14px ${GOLD}99`) : `0 0 12px ${GOLD}66` }}>★</div>
          </div>); })}
      {marks.map((m, i) => {
        const np = m / TOTAL; const passed = t >= m; const dt = passed ? t - m : 0; const teased = i === 2 && !passed;
        const pop = passed ? 1 + Math.max(0, 1 - dt * 2.0) * 0.62 * (1 + Math.sin(Math.min(dt, 0.5) * 24) * 0.3) : 1;
        return (
          <div key={i} style={{ position: "absolute", left: `${np * 100}%`, top: 2, transform: "translateX(-50%)", width: 56, height: 56 }}>
            <div style={{ position: "absolute", inset: 0, transform: `scale(${pop})`, borderRadius: "50%", background: passed ? GREEN : (teased ? "#25314A" : "#EDE7DB"), border: `4px solid ${passed ? GREEN : (teased ? AMBER : CLAY)}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 26, color: passed ? "#fff" : (teased ? AMBER : CLAY), boxShadow: passed ? (dt < 0.5 ? `0 0 ${Math.max(6, 30 - dt * 44)}px ${GOLD}` : `0 0 18px ${GREEN}`) : (teased ? `0 0 16px ${AMBER}99` : "0 2px 6px rgba(0,0,0,0.2)") }}>{passed ? "✓" : i + 1}</div>
          </div>); })}
      {/* teased gift at the end (stays teased; loop-cut ships before unlock) */}
      <div style={{ position: "absolute", right: -24, top: -22, width: 96, height: 96, transform: `translateY(${Math.sin(t * 2.4) * 3}px)`, zIndex: 131 }}>
        <div style={{ position: "absolute", inset: 10, borderRadius: "50%", background: `radial-gradient(circle, ${GOLD}44, transparent 66%)`, filter: "blur(3px)", boxShadow: `0 0 14px ${GOLD}66` }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 58, lineHeight: 1, filter: "grayscale(0.6) brightness(0.85)", opacity: 0.6, transform: "scale(0.84)" }}>🎁</div>
      </div>
      {(() => {
        const cs = 24 + Math.min(1, eaten / 16) * 46;
        const cc: any = {};
        if (eaten >= 4) cc.glasses = 1;
        if (eaten >= 9) { cc.wizard = 1; cc.glasses = 0; }
        if (eaten >= 14) cc.beard = 1;
        const cpop = Math.max(0, 1 - (t - lastInc) * 4) * 0.2;
        return (
          <div style={{ position: "absolute", left: `${p * 100}%`, top: -6 - cs, transform: `translateX(-50%) scale(${1 + cpop})`, zIndex: 127, filter: `drop-shadow(0 0 8px ${GOLD}99)` }}>
            <Mascot lf={f} size={cs} nodAmp={3} nodSpeed={6} cheer={0.35} gaze={2} {...cc} />
          </div>
        );
      })()}
      {(() => { const slamShock = t >= 2.35 && t < 3.4 ? Math.min(1, (t - 2.35) / 0.25) * 0.9 : 0; const cheerV = Math.max(t >= CLOCK_START ? 1 : 0, incPop * 0.75); return (
        <div style={{ position: "absolute", left: `${p * 100}%`, top: -10, transform: "translateX(-50%)", zIndex: 126 }}>
          <div style={{ position: "absolute", inset: -6, borderRadius: "50%", background: "#FBF8F1", border: `5px solid ${GREEN}`, boxShadow: incPop > 0.05 ? `0 0 ${14 + incPop * 16}px ${GOLD}` : `0 0 10px ${GREEN}66, 0 5px 14px rgba(26,24,19,0.4)` }} />

          <div style={{ position: "relative" }}><Mascot lf={f} size={66} nodAmp={2.2 + incPop * 2.4} nodSpeed={6.5} shock={slamShock} cheer={cheerV} gaze={2} /></div>
          <div style={{ position: "absolute", left: "50%", top: 64, transform: `translateX(-50%) scale(${1 + incPop * 0.38})`, padding: "3px 12px", borderRadius: 999, background: grad("#F0CB63", "#D39A2A"), border: "2px solid #F6E4A0", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 20, color: "#3a2a05", whiteSpace: "nowrap", boxShadow: incPop > 0.05 ? `0 0 12px ${GOLD}` : "0 3px 8px rgba(26,24,19,0.3)" }}>{"\u2605 " + score}</div>
        </div>); })()}
      {[...marks, ...STARS].map((m, i) => {
        const dt = t >= m ? t - m : 99;
        if (dt > 0.85) return null;
        const np = m / TOTAL;
        return (
          <div key={`cel${i}`} style={{ position: "absolute", left: `${np * 100}%`, top: 2, transform: "translateX(-50%)", width: 56, height: 56, zIndex: 129, pointerEvents: "none" }}>
            {dt < 0.65 && <div style={{ position: "absolute", left: 28, top: 28, width: 14, height: 14, marginLeft: -7, marginTop: -7, borderRadius: "50%", border: `4px solid ${GREEN}`, transform: `scale(${1 + dt * 13})`, opacity: Math.max(0, 1 - dt * 1.7) }} />}
            {dt > 0.08 && dt < 0.75 && <div style={{ position: "absolute", left: 28, top: 28, width: 14, height: 14, marginLeft: -7, marginTop: -7, borderRadius: "50%", border: `3px solid ${GOLD}`, transform: `scale(${1 + (dt - 0.08) * 11})`, opacity: Math.max(0, 1 - (dt - 0.08) * 1.6) }} />}
            {Array.from({ length: 12 }, (_, k) => { const a = (k / 12) * Math.PI * 2 + seed(k + i * 3); const d = Math.pow(Math.min(1, dt / 0.8), 0.55) * (46 + seed(k * 2 + i) * 36); const o = Math.max(0, 1 - dt * 1.5); const c = [GOLD, CLAY, "#F3E3A6", GREEN][k % 4]; return <div key={k} style={{ position: "absolute", left: 28 + Math.cos(a) * d, top: 28 + Math.sin(a) * d + dt * dt * 26, width: 8, height: 8, borderRadius: "50%", background: c, opacity: o, boxShadow: `0 0 9px ${c}` }} />; })}
          </div>); })}
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
  const lead = 0.12;
  let cur = clines[0];
  for (let i = 0; i < clines.length; i++) {
    const ln = clines[i];
    const gate = i > 0 ? Math.max(ln.start, Math.min(clines[i - 1].end + 0.05, ln.start + 0.5)) : 0;
    if (t + lead >= gate) cur = ln;
  }
  const done = t + lead >= cur.end;
  return (
    <div style={{ position: "absolute", left: 44, right: 44, top: 1256, textAlign: "center", zIndex: 90 }}>
      <div style={{ display: "inline-flex", flexWrap: "wrap", justifyContent: "center", gap: "0 16px" }}>
        {cur.words.map((w, i) => { const on = done || t + lead >= w.start; const active = !done && on && (i === cur.words.length - 1 || t + lead < cur.words[i + 1].start); return (
          <span key={i} style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 74, lineHeight: 1.12, letterSpacing: "-0.01em", color: on ? (active ? "#B8501F" : CLAY) : "transparent", transform: active ? "translateY(-3px) scale(1.04)" : "none", display: "inline-block", textShadow: "0 2px 12px rgba(255,251,244,0.9), 0 1px 2px rgba(120,56,26,0.35)" }}>{w.word.trim()}</span>); })}
      </div>
    </div>
  );
};

export const ClaudeMintReel: React.FC = () => {
  const frame = useCurrentFrame();
  let punch = 0;
  for (const b of Lf.slice(1)) { const d = frame - b; if (d >= 0 && d < 9) punch = Math.max(punch, Math.pow(1 - d / 9, 2)); }
  const KICKS = [1.0, 2.2, 2.8, L[1] + 1.6, L[1] + 2.8, L[2] + 1.2, L[3] + 0.5, L[3] + 2.2, L[4] + 0.2, L[5] + 1.9, L[5] + 5.9, L[5] + 9.4, L[6] + 1.4, L[7] + 2.0, L[8] + 0.3, CLOCK_START + 1, CLOCK_START + 2, CLOCK_START + 3];
  for (const k of KICKS) { const d = frame - fr(k); if (d >= 0 && d < 7) punch = Math.max(punch, Math.pow(1 - d / 7, 2) * 0.7); }
  const zoom = interpolate(frame, [0, 16, 28], [1.0, 1.02, 1.0], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) }) + punch * 0.028;
  const scene = (i: number) => frame >= Lf[i] && (i === Lf.length - 1 || frame < Lf[i + 1]);
  return (
    <AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
      <Audio src={staticFile("vo_mint.wav")} />
      <Audio loop src={staticFile("seo_music.wav")} volume={(ff) => interpolate(ff, [0, fr(1.4), fr(L[4]) - 8, fr(L[4]) + 14, 99999], [0, 0.11, 0.11, 0.08, 0.08], { extrapolateRight: "clamp" })} />
      <Sfx at={0} src="metal_riser.wav" v={0.4} dur={1.5} /><Sfx at={0.42} src="whoosh.wav" v={0.42} dur={0.5} /><Sfx at={0.52} src="thock.wav" v={0.5} />
      {[0.95, 1.55, 2.2, 2.8].map((t, i) => <Sfx key={`hsw${i}`} at={t} src="swish.wav" v={0.24} dur={0.4} />)}
      <Sfx at={3.18} src="pop.wav" v={0.36} dur={0.4} /><Sfx at={3.22} src="ding.wav" v={0.34} />
      {[4.0, 4.27, 4.54, 4.81, 5.08, 5.35].map((t, i) => <Sfx key={`hck${i}`} at={t} src="tick.wav" v={0.32} dur={0.2} />)}
      {L.slice(1).map((tt, i) => <React.Fragment key={`tr${i}`}><Sfx at={tt - 0.08} src="swish.wav" v={0.32} /><Sfx at={tt + 0.02} src="pop.wav" v={0.26} dur={0.4} /></React.Fragment>)}
      {[0.6, 1.0, 1.4, 2.6, 3.0, 3.4, 4.8, 5.2, 5.6].map((d, i) => <Sfx key={`uc${i}`} at={L[1] + d} src="tick.wav" v={0.22} dur={0.25} />)}{[1.6, 3.7, 6.6].map((d, i) => <Sfx key={`uk${i}`} at={L[1] + d} src="chimehi.wav" v={0.3} dur={0.7} />)}
      <Sfx at={L[2] + 0.3} src="blip1.wav" v={0.3} dur={0.4} />{[1.0, 1.8, 2.6].map((d, i) => <Sfx key={`rc${i}`} at={L[2] + d} src="tick.wav" v={0.3} dur={0.25} />)}
      {[0.3, 0.9, 1.5, 2.2, 3.0].map((d, i) => <Sfx key={`dc${i}`} at={L[3] + d} src="tick.wav" v={0.3} dur={0.25} />)}<Sfx at={L[3] + 2.9} src="riser.wav" v={0.4} dur={1.0} /><Sfx at={L[3] + 3.1} src="thock.wav" v={0.44} /><Sfx at={L[3] + 3.2} src="ding.wav" v={0.34} />
      <Sfx at={L[4] + 0.6} src="thock.wav" v={0.34} /><Sfx at={L[4] + 2.6} src="swooshup.wav" v={0.34} />{[4.4, 4.9, 5.4].map((d, i) => <Sfx key={`ol${i}`} at={L[4] + d} src="ding.wav" v={0.26} />)}<Sfx at={L[4] + 3.6} src="shimmer.wav" v={0.3} dur={1.0} />
      <Sfx at={L[5]} src="resolve.wav" v={0.5} />
      {[3.0, 7.0, 11.0, 17.0, 21.0, 28.0, 30.0].map((tt, i) => <Sfx key={`mk${i}`} at={tt + 0.05} src="chimehi.wav" v={0.26} dur={0.6} />)}
      {[1.5, 5, 9, 13, 18, 23, 27, 31].map((tt, i) => <Sfx key={`pt${i}`} at={tt} src="tick.wav" v={0.12} dur={0.25} />)}
      {[0, 1, 2].map((n) => <Sfx key={`cl${n}`} at={CLOCK_START + n} src="tick.wav" v={0.2} dur={0.25} />)}

      <Bg />
      <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "50% 46%" }}>
        {scene(0) ? <Hook lf={frame - Lf[0]} /> : null}
        {scene(1) ? <UseCases lf={frame - Lf[1]} /> : null}
        {scene(2) ? <Rehook lf={frame - Lf[2]} /> : null}
        {scene(3) ? <Doing lf={frame - Lf[3]} /> : null}
        {scene(4) ? <Outlast lf={frame - Lf[4]} /> : null}
        {scene(5) ? <ClockCTA lf={frame - Lf[5]} /> : null}
        <Captions />
      </AbsoluteFill>
      {(() => { const sv = over(frame, fr(5), fr(0.4), Easing.out(Easing.back(1.6))) * (1 - over(frame, fr(11), fr(0.5))); return sv > 0.02 ? (
        <div style={{ position: "absolute", left: 0, right: 0, top: 344, textAlign: "center", zIndex: 140, opacity: sv, transform: `scale(${0.9 + sv * 0.1 + Math.sin(frame / 6) * 0.03})` }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "9px 20px", borderRadius: 999, background: "#1A2233", border: `2px solid ${GOLD}`, boxShadow: `0 0 18px ${GOLD}66` }}>
            <div style={{ width: 15, height: 21, background: GOLD, clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 76%, 0 100%)" }} />
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 21, color: "#F6E4A0" }}>save this for later</span>
          </div>
        </div>
      ) : null; })()}
      <ProgressBar />
      {(() => { let fl = 0; for (const b of Lf.slice(1)) { const d = frame - b; if (d >= 0 && d < 7) fl = Math.max(fl, Math.pow(1 - d / 7, 2)); } return fl > 0 ? <AbsoluteFill style={{ background: "#FFF6E6", opacity: fl * 0.5, zIndex: 200, pointerEvents: "none" }} /> : null; })()}
    </AbsoluteFill>
  );
};
