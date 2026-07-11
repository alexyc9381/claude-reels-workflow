import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing, Audio, Sequence, staticFile, Img } from "remotion";
import { fraunces, inter } from "./fonts";
import words from "./data/words_crew.json";

const CREAM = "#ECE9E2", INK = "#1A1813", SLATE = "#3A5C84", CLAY = "#D2724E", AMBER = "#CF9544", GOLD = "#E7B24C", GREEN = "#3F9E74", MUTE = "#9A968B", RED = "#C44A3A";
const TERM = "#0E1626", TERM2 = "#0A1120", PAPER = "#F7F3EA", META = "#0866FF", METALO = "#0A5AE0";
const mono = "ui-monospace,'SF Mono',Menlo,monospace";
const FPS = 30;
const fr = (s: number) => Math.round(s * FPS);
const grad = (a: string, b: string) => `linear-gradient(158deg, ${a} 0%, ${b} 100%)`;
const NAVYSH = "0 34px 66px -22px rgba(18,28,58,0.55), 0 10px 24px rgba(18,28,58,0.30)";

// scene starts (sec): hook, reveal, noban, rehook, before, commands, safety, future, cta
const L = [0, 6.88, 9.99, 14.71, 19.10, 24.31, 28.61, 34.08, 39.95, 47.56];
const Lf = L.map(fr);
const CUT = 48.33;
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

// ============================ CREW SCENES (warm animation style) ============================

const A_MIA = "#E05C9E", A_BEN = "#2E7BB0", A_KATE = "#E29A2E", A_LEO = "#3FAE82", A_MAX = "#2FA6C4", A_JACK = "#D0632E";

const CrewRays: React.FC<{ lf: number; color: string; op?: number }> = ({ lf, color, op = 0.16 }) => (
  <div style={{ position: "absolute", left: "50%", top: "44%", zIndex: 2, opacity: op }}>
    {Array.from({ length: 16 }, (_, i) => <div key={i} style={{ position: "absolute", left: 0, top: 0, width: 1000, height: 70, marginTop: -35, transformOrigin: "0 50%", transform: `rotate(${i * 22.5 + lf * 0.5}deg)`, background: `linear-gradient(90deg, ${color}, transparent 68%)`, clipPath: "polygon(0 42%, 100% 0, 100% 100%, 0 58%)" }} />)}
  </div>
);

const Sparkles: React.FC<{ lf: number; n?: number; color?: string }> = ({ lf, n = 12, color = "#FFF3D6" }) => (
  <>{Array.from({ length: n }, (_, i) => { const x = seed(i) * 1000; const y = ((seed(i * 2) * 760 + lf * (0.6 + seed(i))) % 800) - 40; const s = (0.5 + seed(i * 3) * 0.6) * (0.55 + 0.45 * Math.abs(Math.sin(lf / 5 + i))); return <div key={i} style={{ position: "absolute", left: x, top: y, width: 12 * s, height: 12 * s, zIndex: 3, background: color, clipPath: "polygon(50% 0, 61% 39%, 100% 50%, 61% 61%, 50% 100%, 39% 61%, 0 50%, 39% 39%)", opacity: 0.75 * s }} />; })}</>
);

const SpeedLines: React.FC<{ lf: number; color: string }> = ({ lf, color }) => (
  <div style={{ position: "absolute", inset: 0, zIndex: 34, overflow: "hidden", pointerEvents: "none" }}>
    {Array.from({ length: 16 }, (_, i) => { const y = (i / 16) * 820 + 20; const w = 180 + seed(i) * 420; const x = ((lf * 60 + i * 150) % 1500) - 320; return <div key={i} style={{ position: "absolute", left: x, top: y, width: w, height: 4, background: `linear-gradient(90deg, transparent, ${color}, transparent)`, opacity: 0.4, transform: "skewX(-22deg)" }} />; })}
  </div>
);

const ExecScene: React.FC<{ lf: number; num: number; name: string; title: string; tag: string; accent: string; bg: string; floor?: string; line?: string; bx2?: number; by2?: number; children: React.ReactNode }> = ({ lf, num, name, title, tag, accent, bg, floor, line, bx2, by2, children }) => {
  const bIn = over(lf, fr(0.2), fr(0.4), Easing.out(Easing.back(1.5)));
  const bOut = over(lf, fr(1.75), fr(0.5), Easing.in(Easing.cubic));
  const flash = lf < fr(0.45) ? Math.max(0, 1 - lf / fr(0.45)) : 0;
  const bx = -640 + bIn * 700 - bOut * 760;
  const speak = over(lf, fr(1.35), fr(0.32), Easing.out(Easing.back(2.2)));
  const speakOut = over(lf, fr(3.7), fr(0.4));
  const bob2 = Math.sin(lf / 6) * 3;
  return (
    <Panel label={`${num} / 6`}>
      <div style={{ position: "absolute", inset: 0, background: bg }} />
      {floor ? <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 190, background: floor }} /> : null}
      <CrewRays lf={lf} color={accent} />
      <Sparkles lf={lf} n={10} color="#FFF3D6" />
      <div style={{ position: "absolute", inset: 0, zIndex: 10 }}>{children}</div>
      {(bIn < 1 && bOut < 0.4) || flash > 0 ? <SpeedLines lf={lf} color={accent} /> : null}
      <div style={{ position: "absolute", left: bx, bottom: 78, zIndex: 40, transform: "skewX(-8deg)", display: "flex", alignItems: "stretch", filter: "drop-shadow(0 10px 22px rgba(10,16,34,0.45))" }}>
        <div style={{ background: accent, padding: "10px 22px", display: "flex", alignItems: "center", borderRadius: "8px 0 0 8px" }}><span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 62, color: "#FFF8EC", transform: "skewX(8deg)" }}>{num}</span></div>
        <div style={{ background: "#FBF3E4", borderTop: `6px solid ${accent}`, borderBottom: `6px solid ${accent}`, padding: "10px 34px 12px 26px", borderRadius: "0 8px 8px 0" }}>
          <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 54, color: INK, lineHeight: 0.95, transform: "skewX(8deg)" }}>{name}</div>
          <div style={{ transform: "skewX(8deg)", display: "flex", gap: 12, alignItems: "baseline" }}>
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 21, color: accent, letterSpacing: "0.06em" }}>{title}</span>
            <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 700, fontStyle: "italic", fontSize: 21, color: MUTE }}>"{tag}"</span>
          </div>
        </div>
      </div>
      {line && speak > 0.01 && speakOut < 0.99 ? (
        <div style={{ position: "absolute", left: bx2 ?? 340, top: (by2 ?? 120) + bob2, zIndex: 46, transform: `scale(${speak * (1 - speakOut)}) rotate(-3deg)`, transformOrigin: "24% 100%" }}>
          <div style={{ position: "relative", padding: "11px 22px", borderRadius: 16, background: "#FFFDF8", border: `4px solid ${accent}`, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 36, color: INK, whiteSpace: "nowrap", boxShadow: NAVYSH }}>
            {line}
            <div style={{ position: "absolute", left: 30, bottom: -18, width: 0, height: 0, borderLeft: "10px solid transparent", borderRight: "20px solid transparent", borderTop: `22px solid ${accent}` }} />
            <div style={{ position: "absolute", left: 34, bottom: -10, width: 0, height: 0, borderLeft: "7px solid transparent", borderRight: "14px solid transparent", borderTop: `14px solid #FFFDF8` }} />
          </div>
        </div>
      ) : null}
      {flash > 0 ? <AbsoluteFill style={{ background: "#FFF8EC", opacity: flash * 0.5, zIndex: 55 }} /> : null}
    </Panel>
  );
};

// ---- MIA: creative studio, wall of monitors ----

const MiaSkit: React.FC<{ lf: number }> = ({ lf }) => {
  // ---- timeline phases (30fps, 143 frames) ----
  const enter = over(lf, fr(0), fr(0.42), Easing.out(Easing.back(1.5)));     // suit drops in
  const boot = over(lf, fr(0.25), fr(0.6), Easing.out(Easing.cubic));        // arc reactor boots (early)
  const launch = over(lf, fr(0.55), fr(1.2), Easing.out(Easing.cubic));      // panels fly out (early)
  const blast = over(lf, fr(2.1), fr(0.8), Easing.out(Easing.cubic));        // repulsor blasts
  const snap = over(lf, fr(3.5), fr(0.9), Easing.out(Easing.back(1.4)));     // grid snaps
  const flare = over(lf, fr(4.0), fr(0.8), Easing.out(Easing.cubic));        // triumph flare

  const CYAN = "#F2C14E";
  const CYAN2 = "#FBE6B0";
  const REDA = "#C43A2E";
  const REDB = "#E0864A";

  // continuous pulses
  const pulse = 0.5 + 0.5 * Math.sin(lf * 0.42);
  const pulseFast = 0.5 + 0.5 * Math.sin(lf * 0.9);
  const spin = lf * 3.4;         // deg for orbit rings
  const spinR = -lf * 2.3;

  const CX = 506, CY = 402;      // mascot center anchor
  const mSize = 190;

  // hovering bob for the whole hero
  const bob = Math.sin(lf * 0.16) * 6 + (1 - enter) * -120;

  // ---- orbiting hologram panels ----
  const panels = [
    { a: -90, r: 250, w: 96, h: 120, kind: "post", c: SLATE },
    { a: -38, r: 285, w: 118, h: 78, kind: "graph", c: GREEN },
    { a: 12, r: 262, w: 104, h: 86, kind: "ad", c: CLAY },
    { a: 58, r: 288, w: 92, h: 118, kind: "reel", c: "#7A4FB0" },
    { a: 108, r: 258, w: 120, h: 82, kind: "wire", c: SLATE },
    { a: 152, r: 286, w: 96, h: 96, kind: "video", c: AMBER },
    { a: 200, r: 262, w: 100, h: 118, kind: "post", c: GREEN },
    { a: 248, r: 288, w: 116, h: 80, kind: "graph", c: CLAY },
    { a: -160, r: 300, w: 90, h: 92, kind: "reel", c: SLATE },
    { a: 300, r: 250, w: 104, h: 84, kind: "ad", c: "#7A4FB0" },
  ];

  // repulsor beams from palms
  const beams = [
    { x: CX - 128, y: CY + 20, ang: 210 },
    { x: CX + 128, y: CY + 20, ang: 330 },
  ];

  // energy particles
  const parts = Array.from({ length: 34 });
  // rising sparks
  const sparks = Array.from({ length: 20 });

  return (
    <>
      {/* ========== BG: screen-edge energy glow ========== */}
      <AbsoluteFill style={{
        background: "radial-gradient(circle at 50% 44%, rgba(231,178,76,0.10) 0%, rgba(231,178,76,0) 46%)",
        opacity: 0.55 + 0.45 * pulse,
      }} />
      <div style={{
        position: "absolute", inset: 0,
        boxShadow: "inset 0 0 160px 40px rgba(231,178,76,0.16), inset 0 0 60px 10px rgba(210,114,78,0.10)",
        opacity: 0.5 + 0.5 * boot,
      }} />

      {/* ========== BG: swirling PORTAL / vortex ========== */}
      <div style={{
        position: "absolute", left: CX, top: CY - 14, transform: "translate(-50%,-50%)",
        width: 640, height: 640, opacity: 0.30 + 0.5 * boot,
      }}>
        {[0, 1, 2, 3, 4].map((i) => {
          const rr = 620 - i * 116;
          const rot = spin * (1 + i * 0.4) + i * 30;
          return (
            <div key={"vor" + i} style={{
              position: "absolute", left: "50%", top: "50%",
              width: rr, height: rr, marginLeft: -rr / 2, marginTop: -rr / 2,
              borderRadius: "50%",
              border: `${3 + i}px solid rgba(231,178,76,${0.10 + 0.05 * (4 - i)})`,
              borderTopColor: `rgba(210,114,78,${0.22 + 0.05 * i})`,
              borderRightColor: `rgba(231,178,76,${0.30})`,
              transform: `rotate(${rot}deg) scale(${0.9 + 0.1 * pulse})`,
              filter: "blur(0.4px)",
            }} />
          );
        })}
        {/* portal glow core */}
        <div style={{
          position: "absolute", left: "50%", top: "50%", width: 260, height: 260,
          marginLeft: -130, marginTop: -130, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(231,178,76,0.35) 0%, rgba(210,114,78,0.12) 45%, rgba(0,0,0,0) 72%)",
          transform: `scale(${0.8 + 0.3 * pulse})`, filter: "blur(6px)",
        }} />
      </div>

      {/* ========== BG: faint crew silhouettes assembling ========== */}
      {[{ x: 150, y: 300, h: 210, hue: "rgba(90,140,200,0.16)" },
        { x: 862, y: 320, h: 190, hue: "rgba(200,110,150,0.15)" },
        { x: 250, y: 470, h: 150, hue: "rgba(80,170,140,0.13)" },
        { x: 780, y: 480, h: 160, hue: "rgba(210,160,90,0.13)" }].map((s, i) => {
        const ap = over(lf, fr(1.4 + i * 0.18), fr(0.6), Easing.out(Easing.cubic));
        return (
          <div key={"sil" + i} style={{
            position: "absolute", left: s.x, top: s.y - s.h, width: 70, height: s.h,
            opacity: ap * (0.5 + 0.3 * pulseFast),
            transform: `translateY(${(1 - ap) * 26}px)`,
          }}>
            <div style={{
              position: "absolute", left: 15, top: 0, width: 40, height: 40, borderRadius: "50%",
              background: s.hue, filter: "blur(2px)",
            }} />
            <div style={{
              position: "absolute", left: 0, top: 34, width: 70, height: s.h - 34,
              borderRadius: "30px 30px 8px 8px", background: s.hue, filter: "blur(2px)",
            }} />
          </div>
        );
      })}

      {/* ========== HUD ring system around hero ========== */}
      <div style={{
        position: "absolute", left: CX, top: CY + bob, transform: "translate(-50%,-50%)",
        opacity: 0.35 + 0.6 * boot,
      }}>
        {[{ r: 210, dash: "10 16", w: 2, rot: spin, c: CYAN },
          { r: 244, dash: "4 22", w: 3, rot: spinR, c: "rgba(210,114,78,0.7)" },
          { r: 300, dash: "26 40", w: 2, rot: spin * 0.6, c: "rgba(231,178,76,0.5)" }].map((h, i) => (
          <svg key={"hud" + i} width={h.r * 2} height={h.r * 2} style={{
            position: "absolute", left: -h.r, top: -h.r,
            transform: `rotate(${h.rot}deg)`,
          }}>
            <circle cx={h.r} cy={h.r} r={h.r - h.w} fill="none" stroke={h.c}
              strokeWidth={h.w} strokeDasharray={h.dash} opacity={0.8} />
          </svg>
        ))}
        {/* HUD tick markers */}
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2 + lf * 0.02;
          const rr = 224;
          return (
            <div key={"tick" + i} style={{
              position: "absolute", left: Math.cos(a) * rr, top: Math.sin(a) * rr,
              width: 3, height: 12, marginLeft: -1.5, marginTop: -6,
              background: CYAN, opacity: 0.5 + 0.4 * pulse,
              transform: `rotate(${(a * 180) / Math.PI + 90}deg)`,
              boxShadow: `0 0 6px ${CYAN}`,
            }} />
          );
        })}
      </div>

      {/* ========== orbiting hologram content panels ========== */}
      {panels.map((p, i) => {
        const appear = over(lf, fr(0.5 + (i % 6) * 0.08), fr(0.5), Easing.out(Easing.back(1.3)));
        const orbit = (p.a + spin * 0.8) * (Math.PI / 180);
        const rNow = p.r * (0.4 + 0.6 * launch);
        const px = CX + Math.cos(orbit) * rNow;
        const py = CY + bob + Math.sin(orbit) * rNow * 0.62;
        const scl = (0.5 + 0.5 * launch) * (0.9 + 0.15 * Math.sin(lf * 0.3 + i));
        const settle = 1 - snap * 0.15;
        return (
          <div key={"pan" + i} style={{
            position: "absolute", left: px, top: py, width: p.w, height: p.h,
            marginLeft: -p.w / 2, marginTop: -p.h / 2,
            transform: `scale(${scl * settle * appear}) rotate(${Math.sin(lf * 0.1 + i) * 4}deg)`,
            opacity: appear,
            borderRadius: 10,
            background: "linear-gradient(160deg, rgba(20,40,70,0.92), rgba(12,24,48,0.92))",
            border: `1.5px solid ${CYAN}`,
            boxShadow: `0 0 18px rgba(231,178,76,0.35), 0 8px 20px rgba(0,0,0,0.4)`,
            overflow: "hidden",
          }}>
            {/* holo scanline */}
            <div style={{
              position: "absolute", left: 0, right: 0, height: 2,
              top: `${((lf * 3 + i * 20) % 100)}%`,
              background: "rgba(231,178,76,0.5)",
            }} />
            {/* header bar */}
            <div style={{ position: "absolute", top: 6, left: 7, width: "55%", height: 6, borderRadius: 3, background: p.c, opacity: 0.9 }} />
            <div style={{ position: "absolute", top: 6, right: 7, width: 10, height: 10, borderRadius: "50%", background: CYAN2, boxShadow: `0 0 6px ${CYAN}` }} />
            {/* content by kind */}
            {p.kind === "graph" && (
              <svg width={p.w} height={p.h} style={{ position: "absolute", top: 0, left: 0 }}>
                <polyline points={`8,${p.h - 12} ${p.w * 0.28},${p.h - 34} ${p.w * 0.5},${p.h - 24} ${p.w * 0.72},${p.h - 46} ${p.w - 10},${p.h - 60}`}
                  fill="none" stroke={GREEN} strokeWidth={3} />
                <circle cx={p.w - 10} cy={p.h - 60} r={4} fill={CYAN2} />
              </svg>
            )}
            {p.kind === "post" && (
              <>
                <div style={{ position: "absolute", top: 22, left: 8, right: 8, height: p.h * 0.42, borderRadius: 5, background: `${p.c}55` }} />
                {[0, 1, 2].map((k) => (
                  <div key={k} style={{ position: "absolute", left: 8, right: 8 * (1 + k), bottom: 10 + k * 9, height: 4, borderRadius: 2, background: "rgba(200,220,255,0.4)" }} />
                ))}
              </>
            )}
            {p.kind === "reel" && (
              <div style={{ position: "absolute", inset: 20, borderRadius: 6, border: "2px solid rgba(200,220,255,0.35)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 0, height: 0, borderLeft: `14px solid ${CYAN2}`, borderTop: "9px solid transparent", borderBottom: "9px solid transparent", marginLeft: 4 }} />
              </div>
            )}
            {p.kind === "video" && (
              <div style={{ position: "absolute", inset: 18, borderRadius: 5, background: `${p.c}44`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 0, height: 0, borderLeft: `16px solid #fff`, borderTop: "10px solid transparent", borderBottom: "10px solid transparent" }} />
              </div>
            )}
            {p.kind === "ad" && (
              <>
                <div style={{ position: "absolute", top: 22, left: 8, right: 8, bottom: 22, borderRadius: 5, background: `${p.c}44` }} />
                <div style={{ position: "absolute", bottom: 8, left: 8, width: "45%", height: 8, borderRadius: 4, background: GOLD }} />
              </>
            )}
            {p.kind === "wire" && (
              <>
                <div style={{ position: "absolute", top: 20, left: 8, width: "40%", height: 8, background: "rgba(200,220,255,0.5)" }} />
                <div style={{ position: "absolute", top: 34, left: 8, right: 8, height: p.h * 0.3, background: "rgba(200,220,255,0.18)", borderRadius: 3 }} />
                <div style={{ position: "absolute", bottom: 10, left: 8, width: 30, height: 12, borderRadius: 3, background: CLAY }} />
              </>
            )}
          </div>
        );
      })}

      {/* ========== energy particles streaming into portal ========== */}
      {parts.map((_, i) => {
        const s = seed(i * 7 + 3);
        const s2 = seed(i * 13 + 1);
        const ang = s * Math.PI * 2 + lf * 0.03;
        const dist = 340 - ((lf * (2 + s2 * 3) + s * 300) % 340);
        const px = CX + Math.cos(ang) * dist;
        const py = CY + bob + Math.sin(ang) * dist * 0.7;
        const sz = 3 + s2 * 5;
        return (
          <div key={"pt" + i} style={{
            position: "absolute", left: px, top: py, width: sz, height: sz,
            marginLeft: -sz / 2, marginTop: -sz / 2, borderRadius: "50%",
            background: i % 3 === 0 ? "#E05C9E" : CYAN2,
            opacity: (0.2 + 0.7 * (1 - dist / 340)) * boot,
            boxShadow: `0 0 ${sz * 2}px ${i % 3 === 0 ? "#E05C9E" : CYAN}`,
          }} />
        );
      })}

      {/* ========== REPULSOR BLASTS from palms ========== */}
      {beams.map((b, i) => {
        const recoil = blast * (i === 0 ? -1 : 1);
        const beamLen = 150 * blast * (0.85 + 0.15 * pulseFast);
        return (
          <div key={"beam" + i} style={{
            position: "absolute", left: b.x + recoil * 6, top: b.y,
            transform: `translate(-50%,-50%) rotate(${b.ang}deg)`,
            transformOrigin: "left center", opacity: blast,
          }}>
            {/* core beam */}
            <div style={{
              position: "absolute", left: 0, top: -5, width: beamLen, height: 10,
              borderRadius: 6,
              background: `linear-gradient(90deg, ${CYAN2}, rgba(231,178,76,0.9) 40%, rgba(231,178,76,0))`,
              boxShadow: `0 0 22px ${CYAN}`,
            }} />
            {/* muzzle flash */}
            <div style={{
              position: "absolute", left: -14, top: -14, width: 28, height: 28, borderRadius: "50%",
              background: `radial-gradient(circle, #fff, ${CYAN2} 40%, rgba(231,178,76,0) 72%)`,
              transform: `scale(${0.8 + 0.5 * pulseFast})`,
            }} />
          </div>
        );
      })}

      {/* ========== HERO: MASCOT in full IRON MAN suit ========== */}
      <div style={{
        position: "absolute", left: CX, top: CY + bob, transform: "translate(-50%,-50%)",
      }}>
        {/* under-suit power glow */}
        <div style={{
          position: "absolute", left: "50%", top: "52%", width: 260, height: 260,
          transform: `translate(-50%,-50%) scale(${0.7 + 0.3 * pulse})`,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(231,178,76,0.30) 0%, rgba(210,114,78,0.12) 45%, rgba(0,0,0,0) 70%)",
          opacity: boot,
        }} />

        <div style={{ position: "relative", width: mSize, height: mSize, marginLeft: -mSize / 2, marginTop: -mSize / 2, transform: `scale(${0.7 + 0.3 * enter})` }}>
          {/* base clay critter */}
          <Mascot lf={lf} size={mSize} cheer={0.35 + 0.55 * flare} stern={1} gaze={0} />

          {/* ---- RED ARMOR: torso plate ---- */}
          <div style={{
            position: "absolute", left: mSize * 0.24, top: mSize * 0.44, width: mSize * 0.52, height: mSize * 0.42,
            borderRadius: "22px 22px 30px 30px",
            background: `linear-gradient(160deg, ${REDB} 0%, ${REDA} 60%, #9E2A20 100%)`,
            border: "2px solid rgba(0,0,0,0.25)",
            boxShadow: "inset 0 6px 12px rgba(255,255,255,0.18), inset 0 -8px 12px rgba(0,0,0,0.3)",
          }}>
            {/* abdominal plate lines */}
            <div style={{ position: "absolute", left: "20%", right: "20%", top: "60%", height: 2, background: "rgba(0,0,0,0.25)" }} />
            <div style={{ position: "absolute", left: "50%", top: "10%", bottom: "6%", width: 2, marginLeft: -1, background: "rgba(0,0,0,0.2)" }} />
          </div>

          {/* ---- ARC REACTOR (pulsing cyan) ---- */}
          <div style={{
            position: "absolute", left: "50%", top: mSize * 0.55, transform: "translate(-50%,-50%)",
            width: mSize * 0.24, height: mSize * 0.24, borderRadius: "50%",
            background: `radial-gradient(circle, #fff 0%, ${CYAN2} 26%, ${CYAN} 52%, #9A6A22 76%, #2A2010 100%)`,
            border: "3px solid rgba(230,250,255,0.85)",
            boxShadow: `0 0 ${18 + 16 * pulse}px ${8 + 8 * pulse}px rgba(231,178,76,${0.55 + 0.4 * pulse}), inset 0 0 8px #fff`,
          }}>
            {/* reactor triangle core */}
            <div style={{
              position: "absolute", left: "50%", top: "50%", transform: `translate(-50%,-50%) rotate(${lf * 4}deg)`,
              width: "46%", height: "46%",
            }}>
              {[0, 120, 240].map((a) => (
                <div key={a} style={{
                  position: "absolute", left: "50%", top: "50%", width: "100%", height: 3, marginTop: -1.5,
                  background: "#fff", transformOrigin: "left center",
                  transform: `rotate(${a}deg)`, boxShadow: "0 0 4px #fff",
                }} />
              ))}
            </div>
          </div>

          {/* ---- GOLD SHOULDER plates ---- */}
          {[{ x: mSize * 0.08, r: -18 }, { x: mSize * 0.70, r: 18 }].map((s, i) => (
            <div key={"sh" + i} style={{
              position: "absolute", left: s.x, top: mSize * 0.40, width: mSize * 0.24, height: mSize * 0.20,
              borderRadius: "16px 16px 8px 8px",
              background: `linear-gradient(150deg, ${GOLD} 0%, ${AMBER} 60%, #9A6A22 100%)`,
              border: "2px solid rgba(0,0,0,0.2)",
              boxShadow: "inset 0 4px 8px rgba(255,255,255,0.35), inset 0 -4px 8px rgba(0,0,0,0.25)",
              transform: `rotate(${s.r}deg)`,
            }} />
          ))}

          {/* ---- GOLD FOREARM / palm repulsors ---- */}
          {[{ x: mSize * 0.02, r: -14 }, { x: mSize * 0.80, r: 14 }].map((f, i) => (
            <div key={"fa" + i} style={{
              position: "absolute", left: f.x, top: mSize * 0.60, width: mSize * 0.18, height: mSize * 0.22,
              borderRadius: "8px 8px 12px 12px",
              background: `linear-gradient(160deg, ${GOLD}, #9A6A22)`,
              border: "2px solid rgba(0,0,0,0.2)",
              transform: `rotate(${f.r}deg)`,
            }}>
              {/* palm repulsor glow */}
              <div style={{
                position: "absolute", left: "50%", bottom: "8%", transform: "translateX(-50%)",
                width: mSize * 0.09, height: mSize * 0.09, borderRadius: "50%",
                background: `radial-gradient(circle, #fff, ${CYAN2} 40%, rgba(231,178,76,0) 78%)`,
                boxShadow: `0 0 ${8 + 10 * blast}px rgba(231,178,76,${0.6 + 0.4 * blast})`,
                opacity: 0.6 + 0.4 * blast,
              }} />
            </div>
          ))}

          {/* ---- GOLD HELMET / FACEPLATE ---- */}
          <div style={{
            position: "absolute", left: mSize * 0.22, top: mSize * 0.08, width: mSize * 0.56, height: mSize * 0.42,
            borderRadius: "30px 30px 26px 26px",
            background: `linear-gradient(160deg, ${GOLD} 0%, ${AMBER} 55%, #9A6A22 100%)`,
            border: "2px solid rgba(0,0,0,0.22)",
            boxShadow: "inset 0 5px 10px rgba(255,255,255,0.4), inset 0 -6px 10px rgba(0,0,0,0.3), 0 4px 10px rgba(0,0,0,0.35)",
            overflow: "visible",
          }}>
            {/* faceplate center ridge */}
            <div style={{ position: "absolute", left: "50%", top: "40%", bottom: "8%", width: 3, marginLeft: -1.5, background: "rgba(0,0,0,0.25)" }} />
            {/* brow */}
            <div style={{ position: "absolute", left: "12%", right: "12%", top: "42%", height: 3, background: "rgba(0,0,0,0.2)" }} />
            {/* TWO cyan eye slits */}
            {[{ x: "20%", r: 12 }, { x: "58%", r: -12 }].map((e, i) => (
              <div key={"eye" + i} style={{
                position: "absolute", left: e.x, top: "46%", width: "22%", height: "12%",
                borderRadius: 4, transform: `skewX(${e.r}deg)`,
                background: `linear-gradient(90deg, ${CYAN2}, #fff, ${CYAN2})`,
                boxShadow: `0 0 ${10 + 8 * pulseFast}px rgba(231,178,76,0.95), 0 0 4px #fff`,
                opacity: 0.75 + 0.25 * pulseFast,
              }} />
            ))}
            {/* red side plates on helmet */}
            <div style={{ position: "absolute", left: -mSize * 0.02, top: "18%", width: mSize * 0.10, height: mSize * 0.30, borderRadius: "12px 4px 4px 12px", background: `linear-gradient(160deg, ${REDB}, #9E2A20)`, border: "1.5px solid rgba(0,0,0,0.2)" }} />
            <div style={{ position: "absolute", right: -mSize * 0.02, top: "18%", width: mSize * 0.10, height: mSize * 0.30, borderRadius: "4px 12px 12px 4px", background: `linear-gradient(200deg, ${REDB}, #9E2A20)`, border: "1.5px solid rgba(0,0,0,0.2)" }} />
          </div>

          {/* helmet crown highlight */}
          <div style={{
            position: "absolute", left: mSize * 0.30, top: mSize * 0.10, width: mSize * 0.40, height: mSize * 0.12,
            borderRadius: "20px 20px 40px 40px",
            background: "linear-gradient(180deg, rgba(255,255,255,0.5), rgba(255,255,255,0))",
          }} />
        </div>
      </div>

      {/* ========== rising sparks (foreground) ========== */}
      {sparks.map((_, i) => {
        const s = seed(i * 5 + 9);
        const cyc = (lf * (1.4 + s * 2) + s * 200) % 200;
        const px = 120 + s * 780;
        const py = 720 - cyc * 3.6;
        const sz = 2 + seed(i * 3 + 2) * 3;
        return (
          <div key={"spk" + i} style={{
            position: "absolute", left: px, top: py, width: sz, height: sz, borderRadius: "50%",
            background: i % 4 === 0 ? "#E05C9E" : CYAN2,
            opacity: (0.15 + 0.6 * (1 - cyc / 200)) * boot,
            boxShadow: `0 0 6px ${i % 4 === 0 ? "#E05C9E" : CYAN}`,
          }} />
        );
      })}

      {/* ========== PAYOFF: snapped published grid (top-right cluster) ========== */}
      <div style={{
        position: "absolute", left: 748, top: 150, transform: `translate(-50%,-50%) scale(${snap})`,
        opacity: snap, width: 200, height: 200,
      }}>
        {Array.from({ length: 9 }).map((_, i) => {
          const gx = (i % 3) * 66, gy = Math.floor(i / 3) * 66;
          const cell = over(lf, fr(3.5 + i * 0.03), fr(0.3), Easing.out(Easing.back(1.5)));
          const cols = [SLATE, GREEN, CLAY, "#7A4FB0", AMBER, GREEN, SLATE, CLAY, "#7A4FB0"];
          return (
            <div key={"g" + i} style={{
              position: "absolute", left: gx, top: gy, width: 58, height: 58, borderRadius: 8,
              background: `linear-gradient(150deg, ${cols[i]}, rgba(12,24,48,0.9))`,
              border: `1.5px solid ${CYAN}`,
              boxShadow: `0 0 10px rgba(231,178,76,0.3)`,
              transform: `scale(${cell})`, opacity: cell,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <div style={{ color: CYAN2, fontSize: 18, fontFamily: mono, opacity: 0.85 }}>✓</div>
            </div>
          );
        })}
      </div>

      {/* ========== triumph FLARE burst ========== */}
      <div style={{
        position: "absolute", left: CX, top: CY - 8, transform: `translate(-50%,-50%) scale(${0.5 + flare * 2.4})`,
        width: 240, height: 240, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,255,255,0.85) 0%, rgba(231,178,76,0.4) 30%, rgba(210,114,78,0.2) 55%, rgba(0,0,0,0) 72%)",
        opacity: flare * (1 - flare) * 3.4,
        pointerEvents: "none",
      }} />
      {/* flare rays */}
      {flare > 0 && Array.from({ length: 16 }).map((_, i) => {
        const a = (i / 16) * 360;
        return (
          <div key={"ray" + i} style={{
            position: "absolute", left: CX, top: CY - 8, transformOrigin: "left center",
            transform: `translate(0,-2px) rotate(${a}deg) scaleX(${flare})`,
            width: 180 * (0.6 + 0.4 * seed(i)), height: 4, marginTop: -2,
            background: `linear-gradient(90deg, rgba(231,178,76,0.9), rgba(231,178,76,0))`,
            opacity: flare * (1 - flare) * 3.2,
          }} />
        );
      })}

      {/* ========== scene label: ASSEMBLE ========== */}
      <div style={{
        position: "absolute", left: 506, top: 96, transform: "translateX(-50%)",
        fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 46,
        letterSpacing: 8, color: CYAN2,
        opacity: 0.25 + 0.75 * boot,
        textShadow: `0 0 22px rgba(231,178,76,0.7), 0 2px 6px rgba(0,0,0,0.5)`,
        transform: `translateX(-50%) scale(${0.9 + 0.1 * snap})`,
      }}>
        ASSEMBLE
      </div>
    </>
  );
};

const BenSkit: React.FC<{ lf: number }> = ({ lf }) => {
  // ===== global rhythms =====
  const t = lf / 30; // seconds
  const swell = Math.sin(lf * 0.055);           // slow ocean swell -1..1
  const swell2 = Math.sin(lf * 0.09 + 1.1);     // faster chop
  const rock = swell * 3.4;                      // ship rotation deg
  const heave = swell * 14 + swell2 * 5;         // vertical bob px

  // entrance: ship slides up + settles in first ~0.5s
  const entry = over(lf, 0, fr(0.55), Easing.out(Easing.cubic));
  const shipInY = interpolate(entry, [0, 1], [230, 0]);
  const shipInScale = interpolate(entry, [0, 1], [0.82, 1]);
  const streak = over(lf, 0, fr(0.5), Easing.out(Easing.quad));

  // beat gates
  const bWheel = over(lf, fr(0.6), fr(0.5), Easing.out(Easing.cubic)); // hands to wheel
  const bChest = over(lf, fr(2.4), fr(0.6), Easing.out(Easing.back(1.7))); // treasure pops
  const bCheer = over(lf, fr(3.1), fr(0.5), Easing.out(Easing.cubic));  // captain triumph
  const bLabel = over(lf, fr(0.35), fr(0.45), Easing.out(Easing.back(1.5)));
  const bShip = over(lf, fr(3.5), fr(0.7), Easing.out(Easing.cubic));  // "SHIPPED" stamp

  const wheelSpin = lf * 2.4 + swell * 40; // steering wheel rotation

  // helper: a wave crest band
  const waveBand = (baseY, amp, speed, phase, col, op, h) => {
    const pts = [];
    const N = 14;
    for (let i = 0; i <= N; i++) {
      const x = (i / N) * 1012;
      const y = baseY + Math.sin(i * 0.9 + lf * speed + phase) * amp + swell * (amp * 0.4);
      pts.push([x, y]);
    }
    let d = `M -20 ${baseY + 200} L -20 ${pts[0][1]} `;
    pts.forEach((p, i) => {
      if (i === 0) { d += `L ${p[0]} ${p[1]} `; return; }
      const prev = pts[i - 1];
      const cx = (prev[0] + p[0]) / 2;
      d += `Q ${cx} ${prev[1]} ${p[0]} ${p[1]} `;
    });
    d += `L 1032 ${baseY + 200} Z`;
    return <path d={d} fill={col} opacity={op} />;
  };

  // foam spray particles at bow
  const sprayCount = 22;

  // crew sprites hauling ropes
  const crew = [
    { x: 250, y: 560, s: 66, ph: 0.0 },
    { x: 360, y: 585, s: 60, ph: 1.3 },
    { x: 690, y: 575, s: 64, ph: 2.2 },
    { x: 800, y: 595, s: 58, ph: 0.7 },
  ];

  // background gull silhouettes
  const gulls = [
    { x: 160, y: 120, s: 1.0, sp: 0.9 },
    { x: 300, y: 90, s: 0.7, sp: 1.2 },
    { x: 840, y: 150, s: 0.85, sp: 1.05 },
  ];

  return (
    <>
      {/* ===================== SKY LAYER ===================== */}
      {/* sun glow top-right */}
      <div style={{
        position: 'absolute', right: 60, top: 30, width: 300, height: 300,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,246,214,0.95) 0%, rgba(255,232,170,0.5) 35%, rgba(255,232,170,0) 70%)',
        filter: 'blur(2px)',
      }} />
      <div style={{
        position: 'absolute', right: 120, top: 90, width: 130, height: 130,
        borderRadius: '50%',
        background: 'radial-gradient(circle, #FFF6D6 0%, #FFE49A 55%, rgba(255,228,154,0) 78%)',
        boxShadow: '0 0 60px 20px rgba(255,232,170,0.55)',
      }} />

      {/* drifting clouds (parallax, slow) */}
      {[
        { x: -40, y: 70, w: 320, h: 70, op: 0.9, sp: 0.35 },
        { x: 420, y: 40, w: 260, h: 58, op: 0.75, sp: 0.5 },
        { x: 620, y: 130, w: 300, h: 64, op: 0.82, sp: 0.28 },
        { x: 120, y: 175, w: 220, h: 50, op: 0.6, sp: 0.62 },
      ].map((c, i) => {
        const cx = c.x + ((lf * c.sp) % (1120)) - (c.sp > 0 ? 0 : 0);
        const wrap = ((cx + 200) % 1220) - 200;
        return (
          <div key={'cl' + i} style={{
            position: 'absolute', left: wrap, top: c.y + swell * 2, width: c.w, height: c.h,
            background: 'linear-gradient(180deg,#FFFFFF,#E8F4FF)',
            borderRadius: c.h, opacity: c.op, filter: 'blur(1px)',
            boxShadow: 'inset 0 -8px 14px rgba(180,210,235,0.5)',
          }}>
            <div style={{ position: 'absolute', left: c.w * 0.18, top: -c.h * 0.4, width: c.w * 0.5, height: c.h * 0.9, background: '#FFFFFF', borderRadius: '50%', filter: 'blur(1px)' }} />
            <div style={{ position: 'absolute', left: c.w * 0.5, top: -c.h * 0.25, width: c.w * 0.42, height: c.h * 0.8, background: '#F4FAFF', borderRadius: '50%', filter: 'blur(1px)' }} />
          </div>
        );
      })}

      {/* gulls */}
      {gulls.map((g, i) => {
        const gx = g.x + Math.sin(lf * 0.02 * g.sp + i) * 40 + (lf * 0.4 * g.sp);
        const gy = g.y + Math.sin(lf * 0.06 + i) * 8;
        const flap = Math.sin(lf * 0.4 * g.sp + i) * 10;
        return (
          <svg key={'gull' + i} width={40 * g.s} height={20 * g.s} viewBox="0 0 40 20"
            style={{ position: 'absolute', left: (gx % 1000), top: gy, opacity: 0.5 }}>
            <path d={`M2 ${12 + flap * 0.4} Q12 ${2 - flap} 20 10 Q28 ${2 - flap} 38 ${12 + flap * 0.4}`}
              stroke="#22405C" strokeWidth="2.4" fill="none" strokeLinecap="round" />
          </svg>
        );
      })}

      {/* ===================== SEA (far) ===================== */}
      {waveBand(430, 8, 0.05, 0.0, '#3C79AA', 0.7, 200)}
      {waveBand(470, 11, 0.07, 1.5, '#2E6798', 0.85, 200)}
      {/* sun glitter on far sea */}
      {[...Array(16)].map((_, i) => {
        const gx = 80 + seed(i * 7 + 3) * 850;
        const gy = 440 + seed(i * 13 + 1) * 70;
        const tw = (Math.sin(lf * 0.2 + i) + 1) / 2;
        return <div key={'gl' + i} style={{
          position: 'absolute', left: gx, top: gy, width: 5, height: 3,
          background: '#FFF3C8', borderRadius: 2, opacity: 0.3 + tw * 0.5,
          transform: `scaleX(${0.5 + tw})`,
        }} />;
      })}

      {/* ===================== SHIP GROUP ===================== */}
      <div style={{
        position: 'absolute', left: 0, top: 0, width: 1012, height: 792,
        transform: `translateY(${shipInY + heave}px) scale(${shipInScale}) rotate(${rock}deg)`,
        transformOrigin: '506px 620px',
      }}>
        {/* ---- speed-streak on entrance ---- */}
        {streak < 1 && [...Array(6)].map((_, i) => (
          <div key={'st' + i} style={{
            position: 'absolute', left: 200 + i * 110, top: 250 + i * 30,
            width: interpolate(streak, [0, 1], [340, 0]), height: 5,
            background: 'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.8))',
            borderRadius: 4, opacity: (1 - streak) * 0.8,
          }} />
        ))}

        {/* ===== BACK MAST + SAIL (midground) ===== */}
        <div style={{ position: 'absolute', left: 616, top: 150, width: 14, height: 470, background: 'linear-gradient(90deg,#5A3B21,#3E2713)', borderRadius: 6, transformOrigin: 'bottom center', transform: `rotate(${swell * 0.6}deg)` }} />
        {/* rear billowing sail */}
        <div style={{
          position: 'absolute', left: 560, top: 200, width: 190, height: 150,
          background: 'linear-gradient(160deg,#EDE6D5,#CDBFA2)',
          borderRadius: '10px 10px 30px 30px',
          transform: `skewX(${swell * 4}deg) scaleX(${1 + swell2 * 0.05})`,
          transformOrigin: 'top center',
          boxShadow: 'inset -20px 0 30px rgba(120,100,70,0.4)',
          border: '2px solid #B9A985',
        }}>
          {/* patch/tatters */}
          <div style={{ position: 'absolute', bottom: -2, left: 30, width: 26, height: 22, background: '#1E4E78', clipPath: 'polygon(0 0,100% 0,60% 100%,20% 60%)', opacity: 0.5 }} />
        </div>

        {/* ===== MAIN MAST ===== */}
        <div style={{ position: 'absolute', left: 494, top: 60, width: 22, height: 580, background: 'linear-gradient(90deg,#6A4526,#3E2713,#5A3B21)', borderRadius: 8, transformOrigin: 'bottom center', transform: `rotate(${swell * 0.7}deg)`, boxShadow: '4px 0 8px rgba(0,0,0,0.3)' }} />
        {/* crossbeam / yard */}
        <div style={{ position: 'absolute', left: 330, top: 150, width: 360, height: 12, background: 'linear-gradient(90deg,#3E2713,#6A4526,#3E2713)', borderRadius: 6, transformOrigin: 'center', transform: `rotate(${swell * 1.3}deg)` }} />

        {/* ===== SKULL & CROSSBONES FLAG (top) ===== */}
        {(() => {
          const flagW = 150, flagH = 100;
          const flap = Math.sin(lf * 0.28) * 8 + swell2 * 5;
          return (
            <div style={{ position: 'absolute', left: 505, top: 60, width: flagW, height: flagH, transformOrigin: 'left center', transform: `rotate(${swell * 1.2}deg)` }}>
              <svg width={flagW} height={flagH} viewBox="0 0 150 100" style={{ filter: 'drop-shadow(3px 4px 5px rgba(0,0,0,0.35))' }}>
                <path d={`M0 0 Q40 ${8 + flap} 75 0 Q110 ${-8 - flap} 150 0 L150 100 Q110 ${92 - flap} 75 100 Q40 ${108 + flap} 0 100 Z`} fill="#14120E" stroke="#000" strokeWidth="1.5" />
                {/* skull */}
                <g transform="translate(75,44)" fill="#F2EEE2">
                  <ellipse cx="0" cy="-4" rx="20" ry="18" />
                  <rect x="-14" y="8" width="28" height="12" rx="4" />
                  <circle cx="-8" cy="-4" r="5.5" fill="#14120E" />
                  <circle cx="8" cy="-4" r="5.5" fill="#14120E" />
                  <polygon points="0,2 -4,10 4,10" fill="#14120E" />
                </g>
                {/* crossbones */}
                <g stroke="#F2EEE2" strokeWidth="7" strokeLinecap="round">
                  <line x1="52" y1="66" x2="98" y2="80" />
                  <line x1="98" y1="66" x2="52" y2="80" />
                </g>
                <g fill="#F2EEE2">
                  {[[52,66],[98,80],[98,66],[52,80]].map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="5" />)}
                </g>
              </svg>
            </div>
          );
        })()}

        {/* crow's nest */}
        <div style={{ position: 'absolute', left: 470, top: 128, width: 70, height: 30, background: 'linear-gradient(180deg,#6A4526,#3E2713)', borderRadius: '6px 6px 10px 10px', border: '2px solid #2A1B0E' }} />

        {/* ===== MAIN SAIL (front, big, billowing tattered) ===== */}
        <div style={{
          position: 'absolute', left: 335, top: 165, width: 350, height: 230,
          transformOrigin: 'top center',
          transform: `skewX(${swell * -5}deg) scaleX(${1 + swell2 * 0.06})`,
        }}>
          <svg width="350" height="230" viewBox="0 0 350 230">
            <defs>
              <linearGradient id="sailG" x1="0" y1="0" x2="1" y2="0.4">
                <stop offset="0" stopColor="#F4EEDE" />
                <stop offset="0.5" stopColor="#E0D4B8" />
                <stop offset="1" stopColor="#C4B491" />
              </linearGradient>
            </defs>
            {/* billow shape with tattered bottom */}
            <path d={`M6 4 Q175 ${-6 + swell * 6} 344 4
                      L344 150 Q360 170 340 176
                      L318 200 L300 176 L280 206 L258 180 L236 210
                      L214 182 L190 214 L166 184 L142 210 L118 182 L96 206 L74 178 L52 200 L30 172 L6 190 Z`}
              fill="url(#sailG)" stroke="#B3A17C" strokeWidth="2.5" />
            {/* reef seams */}
            {[55, 105, 155].map((y, i) => (
              <path key={i} d={`M12 ${y} Q175 ${y - 8 + swell * 4} 338 ${y}`} stroke="#BEAF8C" strokeWidth="2" fill="none" opacity="0.7" />
            ))}
            {/* shading billow */}
            <path d={`M6 4 Q175 ${-6} 344 4 L344 120 Q175 150 6 120 Z`} fill="rgba(255,255,255,0.25)" />
            <path d={`M240 4 Q300 90 344 150 L344 4 Z`} fill="rgba(120,100,70,0.28)" />
            {/* a couple of dark tatter holes */}
            <polygon points="120,150 135,158 128,172 110,164" fill="#2E6798" opacity="0.55" />
            <polygon points="230,140 246,150 238,164 222,156" fill="#2E6798" opacity="0.5" />
          </svg>
        </div>

        {/* rigging ropes from mast to deck */}
        {[[300, 150, 210, 560], [712, 150, 800, 560], [516, 90, 590, 300], [496, 90, 420, 300]].map((r, i) => (
          <svg key={'rig' + i} style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }} width="1012" height="792">
            <line x1={r[0]} y1={r[1]} x2={r[2]} y2={r[3]} stroke="#2A1B0E" strokeWidth="2.5" opacity="0.55" />
          </svg>
        ))}

        {/* ===================== HULL / DECK ===================== */}
        {/* deck floor */}
        <div style={{
          position: 'absolute', left: 150, top: 560, width: 712, height: 120,
          background: 'linear-gradient(180deg,#8A6239,#5E3F22)',
          clipPath: 'polygon(6% 0, 94% 0, 100% 100%, 0% 100%)',
          boxShadow: 'inset 0 8px 20px rgba(255,220,170,0.25)',
        }}>
          {/* deck planks */}
          {[...Array(9)].map((_, i) => (
            <div key={'pk' + i} style={{ position: 'absolute', left: `${i * 11 + 3}%`, top: 0, width: 2, height: '100%', background: 'rgba(40,25,12,0.4)' }} />
          ))}
        </div>

        {/* HULL body */}
        <div style={{
          position: 'absolute', left: 120, top: 636, width: 772, height: 150,
          background: 'linear-gradient(180deg,#7A4E2A,#4A3018)',
          clipPath: 'polygon(8% 0, 92% 0, 82% 96%, 50% 100%, 18% 96%)',
          boxShadow: 'inset 0 -20px 40px rgba(0,0,0,0.4), 0 20px 40px rgba(10,30,50,0.5)',
        }}>
          {/* gold trim rail */}
          <div style={{ position: 'absolute', top: 6, left: '8%', width: '84%', height: 8, background: 'linear-gradient(90deg,#B98A3E,#E7B24C,#B98A3E)', borderRadius: 4 }} />
          {/* planks */}
          {[...Array(5)].map((_, i) => (
            <div key={'hp' + i} style={{ position: 'absolute', top: 26 + i * 22, left: '10%', width: '80%', height: 2, background: 'rgba(20,10,5,0.35)' }} />
          ))}
          {/* cannon ports */}
          {[0.28, 0.5, 0.72].map((p, i) => (
            <div key={'cp' + i} style={{ position: 'absolute', top: 42, left: `${p * 100 - 4}%`, width: 34, height: 34, background: 'radial-gradient(circle,#1A0E06,#2E1B0C)', borderRadius: 8, border: '3px solid #6A4526', boxShadow: 'inset 0 0 8px #000' }}>
              <div style={{ position: 'absolute', left: 8, top: 10, width: 18, height: 12, background: '#0A0704', borderRadius: 6 }} />
            </div>
          ))}
        </div>

        {/* bow foam / bow wave crashing (front spray) */}
        {[...Array(sprayCount)].map((_, i) => {
          const cyc = (lf * 0.9 + i * 9) % 60;
          const p = cyc / 60;
          const side = i % 2 === 0 ? -1 : 1;
          const sx = 506 + side * (40 + p * 260) + Math.sin(i) * 20;
          const sy = 720 - p * 120 - Math.abs(Math.sin(i)) * 30;
          const sz = interpolate(p, [0, 0.3, 1], [3, 14, 2]);
          const op = interpolate(p, [0, 0.2, 0.8, 1], [0, 0.9, 0.7, 0]);
          return <div key={'spr' + i} style={{ position: 'absolute', left: sx, top: sy, width: sz, height: sz, background: '#FFFFFF', borderRadius: '50%', opacity: op, filter: 'blur(0.4px)' }} />;
        })}

        {/* ===================== CREW SPRITES ===================== */}
        {crew.map((c, i) => {
          const haul = Math.sin(lf * 0.22 + c.ph) * 10;
          return (
            <div key={'crew' + i} style={{ position: 'absolute', left: c.x, top: c.y - haul, transform: `translateY(${haul}px)` }}>
              <Mascot lf={lf + i * 7} size={c.s} nodAmp={4} nodSpeed={0.22} gaze={0.2} />
              {/* rope in hand */}
              <svg style={{ position: 'absolute', left: c.s * 0.3, top: -60 - haul, overflow: 'visible' }} width="40" height="120">
                <line x1={c.s * 0.2} y1={60 + haul} x2={c.s * 0.2 - 12} y2={-60} stroke="#2A1B0E" strokeWidth="3" opacity="0.6" />
              </svg>
            </div>
          );
        })}

        {/* ===== SHIP'S WHEEL (big) ===== */}
        <div style={{ position: 'absolute', left: 596, top: 470, width: 120, height: 120, transform: `rotate(${wheelSpin}deg)` }}>
          <svg width="120" height="120" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="46" fill="none" stroke="#6A4526" strokeWidth="9" />
            <circle cx="60" cy="60" r="46" fill="none" stroke="#8A5E33" strokeWidth="4" />
            <circle cx="60" cy="60" r="16" fill="#5A3B21" stroke="#8A5E33" strokeWidth="3" />
            <circle cx="60" cy="60" r="6" fill="#E7B24C" />
            {[...Array(8)].map((_, i) => {
              const a = (i / 8) * Math.PI * 2;
              const x2 = 60 + Math.cos(a) * 60, y2 = 60 + Math.sin(a) * 60;
              const xh = 60 + Math.cos(a) * 16, yh = 60 + Math.sin(a) * 16;
              return <g key={i}>
                <line x1={xh} y1={yh} x2={x2} y2={y2} stroke="#6A4526" strokeWidth="6" strokeLinecap="round" />
                <circle cx={x2} cy={y2} r="6" fill="#8A5E33" stroke="#5A3B21" strokeWidth="2" />
              </g>;
            })}
          </svg>
        </div>

        {/* ===== CAPTAIN BEN at the wheel ===== */}
        <div style={{ position: 'absolute', left: 566, top: 396, width: 180, height: 200, transform: `translateY(${-bCheer * 6}px)` }}>
          {/* tricorn hat OVER mascot */}
          <div style={{ position: 'absolute', left: 40, top: 6, zIndex: 5, transform: `rotate(${swell * 2}deg)` }}>
            <svg width="120" height="66" viewBox="0 0 120 66">
              <path d="M6 44 Q60 -8 114 44 Q98 58 60 52 Q22 58 6 44 Z" fill="#241A10" stroke="#12100A" strokeWidth="2" />
              <path d="M28 44 Q60 12 92 44 Q60 40 28 44 Z" fill="#3A2A19" />
              {/* skull cockade */}
              <circle cx="60" cy="30" r="9" fill="#EDE7D8" />
              <circle cx="56" cy="29" r="1.8" fill="#241A10" />
              <circle cx="64" cy="29" r="1.8" fill="#241A10" />
              <rect x="55" y="34" width="10" height="4" rx="1" fill="#EDE7D8" />
            </svg>
          </div>
          <div style={{ position: 'relative', top: 20, left: 20, transform: 'scaleX(-1)' }}>
            <Mascot lf={lf} size={150} beard={1} suit={0} cheer={bCheer} stern={1} nodAmp={2} nodSpeed={0.14} gaze={-0.35} />
          </div>
          <div style={{ position: 'absolute', left: 112, top: 62, width: 40, height: 46, zIndex: 6 }}>
            <div style={{ position: 'absolute', left: 4, top: 12, width: 26, height: 30, borderRadius: '52% 52% 50% 30%', background: '#3FAE5E' }} />
            <div style={{ position: 'absolute', left: 15, top: 2, width: 18, height: 18, borderRadius: '50%', background: '#4BC06E' }} />
            <div style={{ position: 'absolute', left: -2, top: 16, width: 18, height: 15, borderRadius: '50% 20% 50% 50%', background: '#2E8A48', transform: `rotate(${Math.sin(lf / 3) * 24}deg)`, transformOrigin: '85% 40%' }} />
            <div style={{ position: 'absolute', left: 28, top: 8, width: 9, height: 6, background: '#E7B24C', clipPath: 'polygon(0 0,100% 50%,0 100%)' }} />
            <div style={{ position: 'absolute', left: 22, top: 5, width: 4, height: 4, borderRadius: '50%', background: '#14140E' }} />
            <div style={{ position: 'absolute', left: 20, top: -2, width: 5, height: 8, background: '#E0503A', borderRadius: 3 }} />
          </div>
        </div>

        {/* captain's hands glow on wheel (grip beat) */}
        {bWheel > 0.1 && (
          <div style={{ position: 'absolute', left: 640, top: 520, width: 30, height: 30, borderRadius: '50%', background: 'radial-gradient(circle,rgba(231,178,76,0.6),transparent 70%)', opacity: bWheel * (0.5 + 0.5 * Math.sin(lf * 0.3)) }} />
        )}

        {/* ===================== TREASURE CHEST (payoff) ===================== */}
        <div style={{
          position: 'absolute', left: 210, top: 520,
          transform: `translateY(${interpolate(bChest, [0, 1], [80, 0])}px) scale(${bChest})`,
          opacity: bChest, transformOrigin: 'bottom center',
        }}>
          <svg width="200" height="150" viewBox="0 0 200 150" style={{ filter: 'drop-shadow(0 10px 14px rgba(0,20,40,0.5))' }}>
            {/* chest body */}
            <rect x="18" y="70" width="164" height="70" rx="8" fill="url(#chestW)" stroke="#3A2410" strokeWidth="4" />
            <defs>
              <linearGradient id="chestW" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#8A5A2E" /><stop offset="1" stopColor="#5A3A18" />
              </linearGradient>
              <linearGradient id="lidW" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#9A6A38" /><stop offset="1" stopColor="#6A4522" />
              </linearGradient>
            </defs>
            {/* lid open */}
            <path d="M12 74 Q100 20 188 74 L188 84 L12 84 Z" fill="url(#lidW)" stroke="#3A2410" strokeWidth="4" />
            {/* metal bands */}
            {[50, 100, 150].map((x, i) => <rect key={i} x={x - 4} y="70" width="8" height="70" fill="#C9A24A" opacity="0.85" />)}
            <rect x="14" y="66" width="172" height="8" fill="#C9A24A" rx="3" />
            {/* gold coins spilling */}
            {[...Array(14)].map((_, i) => {
              const gx = 40 + seed(i * 5 + 2) * 120;
              const gyBase = 60 + seed(i * 9 + 4) * 20;
              const bob = Math.sin(lf * 0.25 + i) * 3;
              return <g key={i}>
                <ellipse cx={gx} cy={gyBase - bob} rx="11" ry="8" fill="#F2C94C" stroke="#C9972E" strokeWidth="2" />
                <ellipse cx={gx} cy={gyBase - bob - 1} rx="6" ry="4" fill="#FFE9A0" />
              </g>;
            })}
            {/* sparkle glints on gold */}
            {[...Array(5)].map((_, i) => {
              const tw = (Math.sin(lf * 0.3 + i * 1.7) + 1) / 2;
              return <g key={'sp' + i} transform={`translate(${55 + i * 28},${52 + Math.sin(i) * 8})`} opacity={tw}>
                <path d="M0 -8 L2 -2 L8 0 L2 2 L0 8 L-2 2 L-8 0 L-2 -2 Z" fill="#FFF6D6" />
              </g>;
            })}
          </svg>
        </div>

        {/* barrels + ropes clutter foreground */}
        <div style={{ position: 'absolute', left: 760, top: 600 }}>
          <svg width="90" height="100" viewBox="0 0 90 100">
            <ellipse cx="45" cy="90" rx="34" ry="9" fill="rgba(0,0,0,0.25)" />
            <rect x="14" y="30" width="62" height="62" rx="10" fill="url(#barW)" stroke="#3A2410" strokeWidth="3" />
            <defs><linearGradient id="barW" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#7A4E2A" /><stop offset="0.5" stopColor="#9A6A38" /><stop offset="1" stopColor="#5A3A18" /></linearGradient></defs>
            {[42, 62].map((y, i) => <line key={i} x1="14" y1={y} x2="76" y2={y} stroke="#C9A24A" strokeWidth="4" opacity="0.7" />)}
          </svg>
        </div>
      </div>{/* end ship group */}

      {/* ===================== FOREGROUND WAVES (over hull) ===================== */}
      {waveBand(700, 16, 0.06, 0.0, '#265E8C', 0.95, 200)}
      {waveBand(740, 20, 0.08, 2.0, '#1E4E78', 1, 200)}
      {/* foreground foam crests */}
      {[...Array(20)].map((_, i) => {
        const fx = (i / 20) * 1012 + Math.sin(lf * 0.09 + i) * 14;
        const fy = 706 + Math.sin(i * 0.9 + lf * 0.06) * 16 + swell * 6;
        const tw = (Math.sin(lf * 0.15 + i * 2) + 1) / 2;
        return <div key={'ff' + i} style={{ position: 'absolute', left: fx, top: fy, width: 30, height: 10, background: 'rgba(255,255,255,0.7)', borderRadius: 8, opacity: 0.4 + tw * 0.4, filter: 'blur(1px)' }} />;
      })}

      {/* ===================== SCENE LABEL ===================== */}
      <div style={{
        position: 'absolute', left: 40, top: 40,
        transform: `translateX(${interpolate(bLabel, [0, 1], [-60, 0])}px) rotate(-3deg)`,
        opacity: bLabel,
      }}>
        <div style={{
          background: 'linear-gradient(180deg,#241A10,#12100A)',
          border: '3px solid #C9A24A', borderRadius: 8,
          padding: '10px 22px', boxShadow: '0 8px 18px rgba(0,20,40,0.5)',
        }}>
          <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 34, color: '#EDE7D8', letterSpacing: 1, textShadow: '0 2px 4px #000' }}>
            ALL HANDS ON DECK
          </div>
        </div>
      </div>

      {/* ===================== "SHIPPED" STAMP (final payoff) ===================== */}
      {bShip > 0.05 && (
        <div style={{
          position: 'absolute', left: 300, top: 350,
          transform: `translate(-50%,-50%) scale(${interpolate(bShip, [0, 0.6, 1], [2.2, 0.9, 1])}) rotate(-14deg)`,
          opacity: interpolate(bShip, [0, 0.3, 1], [0, 1, 1]),
        }}>
          <div style={{
            border: '6px solid #E7B24C', borderRadius: 14, padding: '8px 26px',
            background: 'rgba(30,78,120,0.35)', backdropFilter: 'blur(2px)',
            boxShadow: '0 0 30px rgba(231,178,76,0.6)',
          }}>
            <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 56, color: '#FFF3C8', letterSpacing: 4, textShadow: '0 3px 8px rgba(0,20,40,0.7)' }}>
              SHIPPED
            </div>
          </div>
        </div>
      )}

      {/* subtle vignette for depth */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 44%, transparent 55%, rgba(10,30,50,0.35) 100%)', pointerEvents: 'none' }} />
    </>
  );
};

const KateSkit: React.FC<{ lf: number }> = ({ lf }) => {
  // ===== THE ODYSSEY / 300 — Kate as a Greek war-general commanding a phalanx =====
  // Beat 1 (0-0.5s): she charges in from the right on the cliff, cape streaming, dust burst.
  // Beat 2 (0.6-2.8s): she raises the standard; a low sun pulses; ships row on the sea.
  // Beat 3 (2.9-5.4s): she thrusts the spear — the ranks raise spears in a rippling WAVE (payoff = order from chaos).

  const CLAY = "#D97757";
  const BRONZE = "#C9922E";
  const BRONZE_D = "#8F6415";
  const REDP = "#B33A2A";      // plume / cape red
  const REDP_D = "#8A2A1E";
  const CREAMY = "#ECE9E2";
  const INKY = "#1A1813";
  const SAND = "#B99154";
  const SEA = "#2E6E96";

  // ---- global scene breath ----
  const skyPulse = 0.5 + 0.5 * Math.sin(lf / 22);

  // ===== BACKDROP LAYERS =====

  // Low heroic sun with rays
  const sunRise = over(lf, fr(0.2), fr(1.2), Easing.out(Easing.cubic));
  const sunY = interpolate(sunRise, [0, 1], [230, 150]);
  const sunGlow = 0.7 + 0.3 * Math.sin(lf / 14);
  const sunEl = (
    <div key="sun" style={{ position: "absolute", left: 360, top: sunY, width: 280, height: 280, pointerEvents: "none" }}>
      {[...Array(16)].map((_, i) => {
        const ang = (i / 16) * Math.PI * 2 + lf / 120;
        const len = 210 + 40 * Math.sin(lf / 18 + i);
        return (
          <div key={i} style={{
            position: "absolute", left: 140, top: 140, width: len, height: 4,
            background: `linear-gradient(90deg, rgba(247,220,150,${0.55 * sunGlow}), rgba(247,220,150,0))`,
            transformOrigin: "0 50%", transform: `rotate(${ang}rad)`, borderRadius: 4,
          }} />
        );
      })}
      <div style={{
        position: "absolute", left: 60, top: 60, width: 160, height: 160, borderRadius: "50%",
        background: "radial-gradient(circle at 45% 40%, #FFF2CE 0%, #F6CE72 45%, #E7A63F 75%, rgba(231,166,63,0))",
        filter: `blur(1px)`, opacity: 0.9,
      }} />
    </div>
  );

  // Distant mountain / far shore ridgeline (parallax slow)
  const ridge = (
    <svg key="ridge" viewBox="0 0 1012 200" style={{ position: "absolute", left: 0, top: 250, width: 1012, height: 200, opacity: 0.55 }}>
      <path d="M0,150 L120,90 L230,140 L340,70 L470,130 L600,80 L740,135 L880,95 L1012,140 L1012,200 L0,200 Z"
        fill="#5E7E93" />
      <path d="M0,175 L160,130 L300,165 L460,120 L640,160 L820,125 L1012,165 L1012,200 L0,200 Z"
        fill="#4A6D86" />
    </svg>
  );

  // Sea band with rolling glints
  const seaBand = (
    <div key="sea" style={{
      position: "absolute", left: 0, top: 340, width: 1012, height: 190,
      background: `linear-gradient(180deg, #3B84A8 0%, ${SEA} 55%, #24597C 100%)`,
      overflow: "hidden",
    }}>
      {[...Array(18)].map((_, i) => {
        const yy = 20 + (i % 6) * 28 + seed(i) * 10;
        const xx = ((i * 90 + lf * (1.2 + (i % 3) * 0.4)) % 1120) - 60;
        return (
          <div key={i} style={{
            position: "absolute", left: xx, top: yy, width: 60 + seed(i + 9) * 40, height: 3,
            background: `rgba(200,228,240,${0.18 + 0.22 * Math.abs(Math.sin(lf / 12 + i))})`,
            borderRadius: 3,
          }} />
        );
      })}
    </div>
  );

  // Triremes on the sea (rowing / bobbing) — 3 ships, parallax depth
  const shipEl = (i: number, x: number, y: number, sc: number, delay: number) => {
    const enter = over(lf, fr(0.3 + delay), fr(1.0), Easing.out(Easing.cubic));
    const bob = Math.sin(lf / 15 + i * 1.3) * 4 * sc;
    const drift = interpolate(enter, [0, 1], [80, 0]);
    return (
      <div key={"ship" + i} style={{
        position: "absolute", left: x - drift, top: y + bob, width: 150 * sc, height: 90 * sc,
        opacity: enter, transformOrigin: "center bottom",
      }}>
        {/* hull */}
        <div style={{
          position: "absolute", left: 0, top: 40 * sc, width: 150 * sc, height: 26 * sc,
          background: `linear-gradient(180deg,#6B4E2A,#3E2C16)`, borderRadius: `4px 40px 40px 4px / 4px 28px 28px 4px`,
          boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
        }} />
        {/* prow eye */}
        <div style={{ position: "absolute", left: 130 * sc, top: 46 * sc, width: 10 * sc, height: 10 * sc, borderRadius: "50%", background: CREAMY, border: `${2 * sc}px solid ${INKY}` }} />
        {/* mast + sail */}
        <div style={{ position: "absolute", left: 66 * sc, top: 6 * sc, width: 4 * sc, height: 42 * sc, background: "#3E2C16" }} />
        <div style={{
          position: "absolute", left: 30 * sc, top: 4 * sc, width: 74 * sc, height: 34 * sc,
          background: `linear-gradient(180deg,#E7D8B4,#CBB588)`, borderRadius: 3,
          transform: `skewX(${Math.sin(lf / 16 + i) * 4}deg)`, boxShadow: "inset 0 -3px 6px rgba(0,0,0,0.15)",
        }} />
        {/* oars */}
        {[...Array(6)].map((_, k) => {
          const oa = Math.sin(lf / 8 + k * 0.6 + i) * 14;
          return <div key={k} style={{
            position: "absolute", left: (14 + k * 20) * sc, top: 60 * sc, width: 4 * sc, height: 22 * sc,
            background: "#2E2110", transformOrigin: "50% 0%", transform: `rotate(${oa}deg)`, borderRadius: 2,
          }} />;
        })}
      </div>
    );
  };

  // Wind-blown dust / grit particles across the whole scene
  const dust = [...Array(22)].map((_, i) => {
    const sp = 1 + seed(i) * 2.4;
    const xx = ((seed(i) * 1012 + lf * sp * 3) % 1080) - 40;
    const yy = 120 + seed(i + 40) * 640;
    const sz = 2 + seed(i + 12) * 5;
    return (
      <div key={"dust" + i} style={{
        position: "absolute", left: xx, top: yy + Math.sin(lf / 10 + i) * 8, width: sz, height: sz,
        borderRadius: "50%", background: `rgba(214,178,120,${0.15 + seed(i + 3) * 0.3})`,
        filter: "blur(0.5px)",
      }} />
    );
  });

  // ===== THE PHALANX (foreground army) =====
  // Grid of tiny hoplites. Spears raise in a rippling wave triggered at ~2.9s.
  const rows = 4;
  const cols = 9;
  const waveStart = fr(2.9);
  const warriors = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const depth = r / (rows - 1); // 0 back -> 1 front
      const sc = 0.62 + depth * 0.55;
      const baseX = 70 + c * 100 + r * 14 - depth * 8;
      const baseY = 560 + r * 46;
      const enter = over(lf, fr(0.4 + r * 0.08 + c * 0.02), fr(0.7), Easing.out(Easing.back(1.3)));
      const slideIn = interpolate(enter, [0, 1], [70, 0]);
      // wave ripple: front-left to back-right, keyed by column mostly
      const localWave = over(lf, waveStart + c * 3 + r * 1.5, fr(0.5), Easing.out(Easing.back(2.2)));
      const spearAng = interpolate(localWave, [0, 1], [26, -6]); // lower -> vertical raise
      const march = Math.sin(lf / 6 + c + r) * 1.5;
      const helmHue = c % 2 === 0 ? BRONZE : "#B98527";
      warriors.push(
        <div key={"w" + r + "_" + c} style={{
          position: "absolute", left: baseX + slideIn, top: baseY - march, width: 40 * sc, height: 74 * sc,
          opacity: enter, filter: `brightness(${0.7 + depth * 0.5}) saturate(${0.85 + depth * 0.3})`,
          zIndex: 100 + r * 10 + c,
        }}>
          {/* spear (raises in the wave) */}
          <div style={{
            position: "absolute", left: 30 * sc, top: -30 * sc, width: 3.4 * sc, height: 78 * sc,
            background: "linear-gradient(180deg,#6B4E2A,#3E2C16)", transformOrigin: "50% 92%",
            transform: `rotate(${spearAng}deg)`, borderRadius: 2,
            boxShadow: localWave > 0.1 ? `0 0 ${6 * localWave}px rgba(231,178,76,${0.6 * localWave})` : "none",
          }}>
            <div style={{ position: "absolute", left: -3 * sc, top: -8 * sc, width: 9 * sc, height: 14 * sc, background: "#E7D6A0", clipPath: "polygon(50% 0, 100% 100%, 0 100%)" }} />
          </div>
          {/* shield */}
          <div style={{
            position: "absolute", left: -4 * sc, top: 30 * sc, width: 26 * sc, height: 26 * sc, borderRadius: "50%",
            background: `radial-gradient(circle at 40% 35%, ${helmHue}, ${BRONZE_D})`,
            border: `${2 * sc}px solid #5C3F14`, boxShadow: "0 2px 3px rgba(0,0,0,0.35)",
          }}>
            <div style={{ position: "absolute", left: "50%", top: "50%", width: 8 * sc, height: 8 * sc, marginLeft: -4 * sc, marginTop: -4 * sc, borderRadius: "50%", background: REDP }} />
          </div>
          {/* body / tunic */}
          <div style={{ position: "absolute", left: 8 * sc, top: 26 * sc, width: 22 * sc, height: 34 * sc, borderRadius: `6px 6px 3px 3px`, background: `linear-gradient(180deg,#8A2A1E,#631E14)` }} />
          {/* legs */}
          <div style={{ position: "absolute", left: 11 * sc, top: 58 * sc, width: 6 * sc, height: 16 * sc, background: "#D9B58A", borderRadius: 2 }} />
          <div style={{ position: "absolute", left: 21 * sc, top: 58 * sc, width: 6 * sc, height: 16 * sc, background: "#C9A579", borderRadius: 2 }} />
          {/* helmet with plume */}
          <div style={{ position: "absolute", left: 9 * sc, top: 8 * sc, width: 20 * sc, height: 22 * sc, borderRadius: `10px 10px 6px 6px`, background: `linear-gradient(180deg,${helmHue},${BRONZE_D})`, border: `${1.5 * sc}px solid #5C3F14` }}>
            <div style={{ position: "absolute", left: 4 * sc, top: 8 * sc, width: 12 * sc, height: 7 * sc, background: INKY, borderRadius: 2, opacity: 0.7 }} />
          </div>
          {/* transverse plume */}
          <div style={{ position: "absolute", left: 6 * sc, top: 2 * sc, width: 26 * sc, height: 8 * sc, background: `linear-gradient(90deg,${REDP_D},${REDP},${REDP_D})`, borderRadius: `8px 8px 2px 2px`, transform: `skewX(-8deg)` }} />
        </div>
      );
    }
  }

  // ===== KATE — the general on the cliff (right side, elevated) =====
  const kEnter = over(lf, 0, fr(0.5), Easing.out(Easing.back(1.5)));
  const kX = interpolate(kEnter, [0, 1], [430, 0]); // slide in from right
  const kScale = interpolate(kEnter, [0, 1], [0.9, 1]);
  const kStandBob = Math.sin(lf / 20) * 3;

  // spear thrust for the command (beat 3)
  const thrust = over(lf, fr(2.75), fr(0.35), Easing.out(Easing.back(2.4)));
  const spearRaise = interpolate(thrust, [0, 1], [8, -18]);
  const spearLift = interpolate(thrust, [0, 1], [0, -14]);
  // subtle re-thrust rhythm after
  const rethrust = Math.sin(Math.max(0, lf - fr(3.4)) / 5) * (lf > fr(3.4) ? 4 : 0);

  // cape flutter
  const capePts = [...Array(5)].map((_, i) => 8 + Math.sin(lf / 9 + i * 0.8) * 10 + i * 2);

  const kateGeneral = (
    <div key="kate" style={{
      position: "absolute", left: 660 + kX, top: 250 + kStandBob, width: 300, height: 420,
      transform: `scale(${kScale})`, transformOrigin: "bottom center", zIndex: 400,
      filter: `drop-shadow(0 18px 22px rgba(20,24,30,0.45))`,
    }}>
      {/* speed streak on entry */}
      {kEnter < 1 && (
        <div style={{ position: "absolute", left: 190, top: 120, width: 260 * (1 - kEnter), height: 90, background: "linear-gradient(90deg, rgba(236,233,226,0), rgba(236,233,226,0.5))", borderRadius: 40, filter: "blur(3px)" }} />
      )}

      {/* red cape flowing behind */}
      <svg viewBox="0 0 200 300" style={{ position: "absolute", left: -40, top: 70, width: 200, height: 300, zIndex: -1 }}>
        <path d={`M120,10 C60,${40 + capePts[0]} 30,${120 + capePts[1]} ${20 + capePts[2]},${230}
          C${40 + capePts[3]},${250} ${90 + capePts[4]},${255} 130,240
          C120,160 130,80 120,10 Z`} fill={REDP} stroke={REDP_D} strokeWidth="4" />
        <path d={`M120,10 C80,${50 + capePts[1]} 70,${130 + capePts[2]} ${75},${220}`} stroke={REDP_D} strokeWidth="3" fill="none" opacity="0.6" />
      </svg>

      {/* the mascot general (girl + stern command) */}
      <div style={{ position: "absolute", left: 78, top: 120, width: 150, height: 150 }}>
        <Mascot lf={lf} size={150} girl={1} stern={1} cheer={thrust * 0.5} gaze={-0.4} nodAmp={2} nodSpeed={0.5} />
      </div>

      {/* Bronze Corinthian helmet w/ tall red plume — over the mascot's head */}
      <div style={{ position: "absolute", left: 108, top: 108, width: 92, height: 96 }}>
        {/* plume crest */}
        <div style={{
          position: "absolute", left: 30, top: -34, width: 34, height: 60,
          background: `linear-gradient(180deg,${REDP},${REDP_D})`,
          borderRadius: "20px 20px 6px 6px",
          transform: `skewX(${Math.sin(lf / 8) * 6}deg)`,
          boxShadow: "inset -4px 0 6px rgba(0,0,0,0.25)",
        }} />
        {/* plume base holder */}
        <div style={{ position: "absolute", left: 26, top: 18, width: 42, height: 10, background: BRONZE_D, borderRadius: 4 }} />
        {/* helmet dome */}
        <div style={{
          position: "absolute", left: 16, top: 24, width: 64, height: 52,
          borderRadius: "34px 34px 14px 14px",
          background: `linear-gradient(180deg,#E6B84E,${BRONZE},${BRONZE_D})`,
          border: "3px solid #5C3F14",
          boxShadow: "inset -6px -4px 10px rgba(0,0,0,0.3), inset 4px 3px 6px rgba(255,240,200,0.4)",
        }} />
        {/* nose guard */}
        <div style={{ position: "absolute", left: 44, top: 60, width: 9, height: 30, background: `linear-gradient(180deg,${BRONZE},${BRONZE_D})`, border: "2px solid #5C3F14", borderRadius: "3px 3px 5px 5px" }} />
        {/* cheek glint */}
        <div style={{ position: "absolute", left: 24, top: 34, width: 14, height: 22, background: "rgba(255,245,210,0.5)", borderRadius: "50%", filter: "blur(3px)" }} />
      </div>

      {/* round hoplite shield (left arm) */}
      <div style={{ position: "absolute", left: 30, top: 210, width: 96, height: 96, borderRadius: "50%",
        background: `radial-gradient(circle at 38% 32%, #E6B84E, ${BRONZE} 55%, ${BRONZE_D} 100%)`,
        border: "5px solid #5C3F14", boxShadow: "0 8px 14px rgba(0,0,0,0.4), inset 0 0 14px rgba(0,0,0,0.25)",
        transform: `rotate(${-6 + Math.sin(lf / 18) * 2}deg)` }}>
        <div style={{ position: "absolute", inset: 12, borderRadius: "50%", border: "3px solid #7A5518" }} />
        {/* lambda emblem */}
        <div style={{ position: "absolute", left: "50%", top: "22%", width: 8, height: 54, marginLeft: -4, background: REDP, transformOrigin: "50% 0%", transform: "rotate(20deg)", borderRadius: 3 }} />
        <div style={{ position: "absolute", left: "50%", top: "22%", width: 8, height: 54, marginLeft: -4, background: REDP, transformOrigin: "50% 0%", transform: "rotate(-20deg)", borderRadius: 3 }} />
      </div>

      {/* raised SPEAR / standard (right arm — the command) */}
      <div style={{ position: "absolute", left: 196, top: 60 + spearLift + rethrust, width: 16, height: 260,
        transformOrigin: "50% 90%", transform: `rotate(${spearRaise + rethrust}deg)` }}>
        <div style={{ position: "absolute", left: 5, top: 24, width: 6, height: 230, background: "linear-gradient(180deg,#7A5A32,#3E2C16)", borderRadius: 3 }} />
        {/* spear tip */}
        <div style={{ position: "absolute", left: -3, top: -6, width: 22, height: 40, background: `linear-gradient(180deg,#F3E4B0,#C9A94E)`, clipPath: "polygon(50% 0, 100% 100%, 0 100%)",
          filter: `drop-shadow(0 0 ${8 * thrust}px rgba(231,178,76,${0.9 * thrust}))` }} />
        {/* small pennant banner */}
        <div style={{ position: "absolute", left: 11, top: 40, width: 46, height: 30, background: `linear-gradient(180deg,${REDP},${REDP_D})`, clipPath: "polygon(0 0, 100% 0, 100% 100%, 60% 70%, 20% 100%, 0 70%)", transform: `skewX(${Math.sin(lf / 10) * 8}deg)`, transformOrigin: "0 0" }} />
      </div>

      {/* command shockwave ring on thrust */}
      {thrust > 0.05 && (
        <div style={{ position: "absolute", left: 120, top: 40, width: 40, height: 40, borderRadius: "50%",
          border: `4px solid rgba(231,178,76,${0.7 * (1 - thrust)})`,
          transform: `scale(${1 + thrust * 6})`, opacity: 1 - thrust }} />
      )}
    </div>
  );

  // banners / standards planted on the cliff behind Kate
  const standards = [0, 1].map((i) => {
    const bx = 900 + i * 60;
    const sway = Math.sin(lf / 11 + i) * 6;
    return (
      <div key={"std" + i} style={{ position: "absolute", left: bx, top: 300, width: 60, height: 220, zIndex: 350, opacity: over(lf, fr(0.5 + i * 0.2), fr(0.6)) }}>
        <div style={{ position: "absolute", left: 6, top: 0, width: 5, height: 220, background: "#3E2C16", borderRadius: 3 }} />
        <div style={{ position: "absolute", left: -2, top: -8, width: 20, height: 20, borderRadius: "50%", background: BRONZE, border: "2px solid #5C3F14" }} />
        <div style={{ position: "absolute", left: 10, top: 20, width: 54, height: 90, background: `linear-gradient(180deg,${REDP},${REDP_D})`, clipPath: "polygon(0 0,100% 0,100% 100%,70% 82%,35% 100%,0 82%)", transformOrigin: "0 0", transform: `skewX(${sway}deg)`, boxShadow: "inset -6px 0 10px rgba(0,0,0,0.2)" }}>
          <div style={{ position: "absolute", left: 20, top: 22, width: 14, height: 40, background: CREAMY, clipPath: "polygon(50% 0,100% 40%,80% 100%,20% 100%,0 40%)", opacity: 0.85 }} />
        </div>
      </div>
    );
  });

  // ===== SCENE LABEL "COMMAND" =====
  const labelIn = over(lf, fr(0.35), fr(0.5), Easing.out(Easing.back(1.7)));
  const labelPulse = 1 + 0.04 * Math.sin(lf / 8);
  const label = (
    <div key="label" style={{
      position: "absolute", left: 40, top: 60,
      transform: `translateY(${interpolate(labelIn, [0, 1], [-40, 0])}px) scale(${labelPulse})`,
      opacity: labelIn, transformOrigin: "left center",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 8, height: 54, background: "#D9A441", borderRadius: 4, boxShadow: "0 0 14px rgba(217,164,65,0.6)" }} />
        <div>
          <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 62, color: CREAMY, letterSpacing: 4, lineHeight: 0.9, textShadow: "0 4px 14px rgba(0,0,0,0.5)" }}>COMMAND</div>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 17, color: "#E7B24C", letterSpacing: 8, marginTop: 4 }}>ORDER FROM CHAOS</div>
        </div>
      </div>
    </div>
  );

  // battle-cry impact flashes when the wave hits each flank (beat 3)
  const cryFlashes = [0, 1, 2].map((i) => {
    const t = over(lf, waveStart + fr(0.2) + i * fr(0.5), fr(0.4));
    if (t <= 0 || t >= 1) return null;
    const fx = 150 + i * 300;
    return (
      <div key={"cry" + i} style={{ position: "absolute", left: fx, top: 520, width: 60, height: 60, transform: `translate(-50%,-50%) scale(${0.4 + t * 2})`, opacity: (1 - t) * 0.8, pointerEvents: "none" }}>
        <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,238,190,0.9), rgba(231,178,76,0))" }} />
      </div>
    );
  });

  // heat-haze / atmospheric vignette top
  const atmos = (
    <div key="atmos" style={{ position: "absolute", inset: 0, pointerEvents: "none",
      background: `radial-gradient(120% 80% at 50% 20%, rgba(247,220,150,${0.10 * skyPulse}) 0%, rgba(0,0,0,0) 45%), linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(30,24,18,0.18) 100%)` }} />
  );

  return (
    <>
      {sunEl}
      {ridge}
      {seaBand}
      {shipEl(0, 120, 360, 0.7, 0.0)}
      {shipEl(1, 560, 400, 0.95, 0.25)}
      {shipEl(2, 800, 370, 0.6, 0.15)}
      {atmos}
      {dust}
      {standards}
      {warriors}
      {kateGeneral}
      {cryFlashes}
      {label}
    </>
  );
};

const LeoSkit: React.FC<{ lf: number }> = ({ lf }) => {
  // ===== TIMELINE (seconds) =====
  // 0.0-0.7  descend on cable from hatch
  // 0.7-2.6  weave through laser grid (twist, sweat)
  // 2.6-3.6  reach pedestal, grab glowing scroll
  // 3.6-4.4  ALARM near-miss (laser flicker, cameras swing, red flash)
  // 4.4-5.8  winched back up, escape clutching scroll

  const descend = over(lf, fr(0.0), fr(0.7), Easing.out(Easing.cubic));
  const atGrid = over(lf, fr(0.7), fr(1.9));
  const grab = over(lf, fr(2.6), fr(1.0), Easing.out(Easing.cubic));
  const alarm = over(lf, fr(3.6), fr(0.8));
  const ascend = over(lf, fr(4.4), fr(1.4), Easing.inOut(Easing.sin));

  // ===== HERO VERTICAL POSITION =====
  // starts high (hatch), settles at grid level, holds, then winched up
  const yDescend = interpolate(descend, [0, 1], [-140, 300]);
  const yAscend = interpolate(ascend, [0, 1], [0, -440]);
  const heroY = 300 + (heroBase => 0)(0) + (yDescend - 300) * 0 + 0; // placeholder guard
  // real hero Y:
  const gridSettleY = 300;
  const bodyY = descend < 1
    ? yDescend
    : gridSettleY + yAscend;

  // slight settle bounce when reaching grid
  const settle = over(lf, fr(0.62), fr(0.35), Easing.out(Easing.back(1.8)));
  const settleY = interpolate(settle, [0, 1], [0, 0]);

  // horizontal weave through lasers
  const weaveX = descend >= 1 && ascend <= 0
    ? Math.sin(lf * 0.14) * 34 + Math.sin(lf * 0.31) * 12
    : (ascend > 0 ? 0 : 0);
  const heroX = 506 + (ascend > 0 ? 0 : weaveX);

  // body contortion / twist while weaving
  const twist = descend >= 1 && ascend <= 0
    ? Math.sin(lf * 0.22) * 16
    : (ascend > 0 ? interpolate(ascend, [0, 1], [0, 4]) : 0);
  const crouch = descend >= 1 && ascend <= 0
    ? 0.86 + Math.abs(Math.sin(lf * 0.18)) * 0.14
    : 1;

  // cable length: from ceiling hatch (y~ -10) to carabiner just above hero head
  const hatchX = 506;
  const cableTopY = -6;
  const heroHeadY = bodyY - 6;

  // spotlight sway
  const spotSway = Math.sin(lf * 0.05) * 26;

  // sweat bead appears during weave tension, drips
  const sweatT = over(lf, fr(1.5), fr(0.9));
  const sweatY = interpolate(sweatT, [0, 1], [0, 40]);
  const sweatOp = sweatT > 0 && sweatT < 1 ? interpolate(sweatT, [0, 0.15, 0.85, 1], [0, 1, 1, 0]) : 0;

  // scroll: on pedestal until grabbed, then in hand
  const scrollGrabbed = grab > 0.35;
  const pedX = 506, pedTopY = 470;
  const scrollHandX = heroX + 34;
  const scrollHandY = bodyY + 66;
  const scrollX = scrollGrabbed ? scrollHandX : pedX + 40;
  const scrollY = scrollGrabbed ? scrollHandY : pedTopY - 6;
  const scrollGlow = 0.55 + Math.sin(lf * 0.2) * 0.25 + (grab > 0 ? grab * 0.4 : 0);

  // camera scan cones sweep back and forth; swing hard toward hero during alarm
  const camScanL = Math.sin(lf * 0.08) * 26;
  const camScanR = -Math.sin(lf * 0.08 + 1.1) * 26;
  const camAlarmSwingL = alarm > 0 && alarm < 1 ? interpolate(alarm, [0, 0.4, 1], [0, 34, 30]) : 0;
  const camAlarmSwingR = alarm > 0 && alarm < 1 ? interpolate(alarm, [0, 0.4, 1], [0, -34, -30]) : 0;

  // red alert flash flicker during alarm
  const alertFlash = alarm > 0 && alarm < 1
    ? (Math.sin(lf * 0.9) > 0 ? interpolate(alarm, [0, 0.2, 0.9, 1], [0, 0.5, 0.45, 0]) : 0.06)
    : 0;

  // laser flicker (one beam blinks) during alarm
  const laserFlick = alarm > 0 && alarm < 1 ? (Math.sin(lf * 1.4) > 0 ? 1 : 0.15) : 1;

  // REC dot blink
  const recBlink = Math.sin(lf * 0.4) > -0.2 ? 1 : 0.2;

  // ===== LASER GRID DEFINITIONS =====
  const beams = [
    { x1: 150, y1: 250, x2: 880, y2: 430, w: 3 },
    { x1: 180, y1: 470, x2: 900, y2: 250, w: 3 },
    { x1: 120, y1: 350, x2: 900, y2: 360, w: 2.5 },
    { x1: 260, y1: 210, x2: 720, y2: 560, w: 2.5 },
    { x1: 760, y1: 210, x2: 300, y2: 560, w: 2.5 },
    { x1: 100, y1: 560, x2: 920, y2: 500, w: 2 },
    { x1: 420, y1: 200, x2: 560, y2: 590, w: 2 },
    { x1: 620, y1: 200, x2: 480, y2: 590, w: 2 },
    { x1: 140, y1: 420, x2: 880, y2: 550, w: 2 },
  ];

  // floating dust motes
  const motes = [0,1,2,3,4,5,6,7,8,9,10,11];

  // laser intersection sparkle nodes
  const nodes = [
    { x: 320, y: 320 }, { x: 500, y: 355 }, { x: 640, y: 300 },
    { x: 420, y: 430 }, { x: 700, y: 420 }, { x: 260, y: 400 },
    { x: 560, y: 480 }, { x: 380, y: 520 },
  ];

  const gridOn = atGrid > 0 ? Math.min(1, atGrid * 4) : (descend > 0.5 ? (descend - 0.5) * 2 : 0);
  const gridVisible = descend > 0.4 && ascend < 0.9;

  return (
    <>
      {/* ===== BG: cool spotlight cone from ceiling ===== */}
      <div style={{ position: "absolute", left: 506 + spotSway - 300, top: -40, width: 600, height: 760,
        background: "radial-gradient(50% 62% at 50% 6%, rgba(120,160,220,0.20), rgba(120,160,220,0.06) 46%, transparent 72%)",
        filter: "blur(2px)", pointerEvents: "none" }} />

      {/* faint back-wall vertical scanlines for depth */}
      {[0,1,2,3,4,5,6,7].map(i => (
        <div key={"wl"+i} style={{ position: "absolute", left: 120 + i * 110, top: 40, width: 1, height: 620,
          background: "linear-gradient(180deg, transparent, rgba(90,120,170,0.10) 30%, rgba(90,120,170,0.05) 70%, transparent)" }} />
      ))}

      {/* ===== FLOOR grid (perspective-ish) ===== */}
      <div style={{ position: "absolute", left: 0, top: 620, width: 1012, height: 172,
        background: "linear-gradient(180deg, #0A0C14 0%, #05060B 100%)" }} />
      {[0,1,2,3,4].map(i => (
        <div key={"fh"+i} style={{ position: "absolute", left: 60 - i*8, top: 632 + i * 30, width: 892 + i*16, height: 1.5,
          background: "rgba(80,110,160,0.22)", boxShadow: "0 0 4px rgba(80,120,180,0.3)" }} />
      ))}
      {[0,1,2,3,4,5,6,7,8].map(i => {
        const cx = 506; const spread = (i - 4) * 60;
        return <div key={"fv"+i} style={{ position: "absolute", left: cx + spread*0.6, top: 632, width: 1.5, height: 150,
          transform: `skewX(${spread * 0.06}deg)`, transformOrigin: "top",
          background: "linear-gradient(180deg, rgba(80,110,160,0.05), rgba(80,120,180,0.28))" }} />;
      })}

      {/* ===== TOP-LEFT SECURITY CAMERA ===== */}
      <div style={{ position: "absolute", left: 40, top: 30 }}>
        {/* scan cone */}
        <div style={{ position: "absolute", left: 30, top: 46, width: 300, height: 360,
          transformOrigin: "40px 10px",
          transform: `rotate(${18 + camScanL + camAlarmSwingL}deg)`,
          background: "conic-gradient(from 60deg at 40px 10px, transparent 0deg, rgba(120,170,230,0.16) 14deg, rgba(120,170,230,0.05) 26deg, transparent 34deg)",
          filter: "blur(1px)", pointerEvents: "none" }} />
        {/* housing */}
        <div style={{ position: "absolute", left: 0, top: 0, width: 96, height: 52, borderRadius: 10,
          background: "linear-gradient(150deg, #2A3145, #12151F)", border: "2px solid #3A4358",
          boxShadow: "0 6px 14px rgba(0,0,0,0.5)" }} />
        {/* mount arm */}
        <div style={{ position: "absolute", left: 16, top: -14, width: 8, height: 18, background: "#2A3145", borderRadius: 3 }} />
        {/* lens */}
        <div style={{ position: "absolute", left: 62, top: 30, width: 40, height: 40, borderRadius: "50%",
          background: "radial-gradient(circle at 40% 35%, #6E86AE, #1A2536 70%)", border: "3px solid #0E1420",
          boxShadow: "0 0 10px rgba(120,170,230,0.4)" }} />
        <div style={{ position: "absolute", left: 74, top: 42, width: 10, height: 10, borderRadius: "50%",
          background: "radial-gradient(circle, #BFD4F0, #4A6488)" }} />
        {/* REC dot */}
        <div style={{ position: "absolute", left: 12, top: 14, width: 12, height: 12, borderRadius: "50%",
          background: "#E33B2E", opacity: recBlink, boxShadow: "0 0 8px rgba(227,59,46,0.9)" }} />
      </div>

      {/* ===== TOP-RIGHT SECURITY CAMERA ===== */}
      <div style={{ position: "absolute", left: 876, top: 30 }}>
        <div style={{ position: "absolute", left: -260, top: 46, width: 300, height: 360,
          transformOrigin: "56px 10px",
          transform: `rotate(${-18 + camScanR + camAlarmSwingR}deg)`,
          background: "conic-gradient(from 260deg at 56px 10px, transparent 0deg, rgba(120,170,230,0.16) 14deg, rgba(120,170,230,0.05) 26deg, transparent 34deg)",
          filter: "blur(1px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: 0, top: 0, width: 96, height: 52, borderRadius: 10,
          background: "linear-gradient(210deg, #2A3145, #12151F)", border: "2px solid #3A4358",
          boxShadow: "0 6px 14px rgba(0,0,0,0.5)" }} />
        <div style={{ position: "absolute", left: 72, top: -14, width: 8, height: 18, background: "#2A3145", borderRadius: 3 }} />
        <div style={{ position: "absolute", left: -6, top: 30, width: 40, height: 40, borderRadius: "50%",
          background: "radial-gradient(circle at 60% 35%, #6E86AE, #1A2536 70%)", border: "3px solid #0E1420",
          boxShadow: "0 0 10px rgba(120,170,230,0.4)" }} />
        <div style={{ position: "absolute", left: 12, top: 42, width: 10, height: 10, borderRadius: "50%",
          background: "radial-gradient(circle, #BFD4F0, #4A6488)" }} />
        <div style={{ position: "absolute", left: 74, top: 14, width: 12, height: 12, borderRadius: "50%",
          background: "#E33B2E", opacity: recBlink, boxShadow: "0 0 8px rgba(227,59,46,0.9)" }} />
      </div>

      {/* ===== CEILING HATCH ===== */}
      <div style={{ position: "absolute", left: hatchX - 54, top: -4, width: 108, height: 26, borderRadius: 6,
        background: "linear-gradient(180deg, #05060B, #10141F)", border: "2px solid #2A3245",
        boxShadow: "inset 0 -4px 10px rgba(0,0,0,0.7)" }} />
      <div style={{ position: "absolute", left: hatchX - 54, top: 18, width: 48, height: 8,
        transformOrigin: "left top", transform: "rotate(38deg)",
        background: "linear-gradient(90deg, #232A3A, #12151F)", borderRadius: 2, opacity: descend < 1 ? 1 : 0.5 }} />

      {/* ===== CABLE (rope) + carabiner ===== */}
      {bodyY < 260 || descend < 1 || ascend > 0 ? (
        <svg width="1012" height="792" viewBox="0 0 1012 792"
          style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none" }}>
          <line x1={hatchX} y1={cableTopY} x2={heroX} y2={heroHeadY}
            stroke="#8A929E" strokeWidth="2.5" strokeLinecap="round" />
          <line x1={hatchX} y1={cableTopY} x2={heroX} y2={heroHeadY}
            stroke="rgba(180,200,230,0.4)" strokeWidth="1" strokeLinecap="round" />
        </svg>
      ) : null}
      {/* carabiner clip just above head */}
      <div style={{ position: "absolute", left: heroX - 7, top: heroHeadY - 6, width: 14, height: 20,
        borderRadius: 7, border: "3px solid #C7CDD8", background: "transparent",
        boxShadow: "0 0 5px rgba(200,210,230,0.5)",
        opacity: (descend < 1 || ascend > 0 || bodyY < 320) ? 1 : 0.85 }} />

      {/* ===== LASER GRID ===== */}
      {gridVisible && (
        <svg width="1012" height="792" viewBox="0 0 1012 792"
          style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none", opacity: gridOn }}>
          <defs>
            <linearGradient id="lz" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#FF5A46" />
              <stop offset="0.5" stopColor="#FF2E1C" />
              <stop offset="1" stopColor="#FF5A46" />
            </linearGradient>
          </defs>
          {beams.map((b, i) => {
            const flick = i === 2 ? laserFlick : 1;
            return (
              <g key={"lb"+i} style={{ opacity: flick }}>
                <line x1={b.x1} y1={b.y1} x2={b.x2} y2={b.y2}
                  stroke="rgba(255,60,40,0.28)" strokeWidth={b.w + 8} strokeLinecap="round" />
                <line x1={b.x1} y1={b.y1} x2={b.x2} y2={b.y2}
                  stroke="url(#lz)" strokeWidth={b.w} strokeLinecap="round" />
                <line x1={b.x1} y1={b.y1} x2={b.x2} y2={b.y2}
                  stroke="rgba(255,220,210,0.85)" strokeWidth={b.w * 0.35} strokeLinecap="round" />
              </g>
            );
          })}
          {/* emitter dots at beam origins */}
          {beams.map((b, i) => (
            <circle key={"em"+i} cx={b.x1} cy={b.y1} r="3.5" fill="#FF3A28"
              style={{ opacity: 0.9 }} />
          ))}
          {/* sparkle at intersections */}
          {nodes.map((n, i) => {
            const tw = 0.4 + Math.abs(Math.sin(lf * 0.25 + i)) * 0.6;
            return <circle key={"nd"+i} cx={n.x} cy={n.y} r={2 + tw * 2}
              fill="rgba(255,180,160,0.9)" style={{ opacity: tw }} />;
          })}
        </svg>
      )}

      {/* ===== PEDESTAL (lit) ===== */}
      <div style={{ position: "absolute", left: pedX - 46, top: pedTopY + 6, width: 92, height: 150,
        background: "linear-gradient(180deg, #2A3040, #10131C)", borderRadius: "6px 6px 3px 3px",
        border: "1px solid #39415A", boxShadow: "0 10px 26px rgba(0,0,0,0.55)" }} />
      <div style={{ position: "absolute", left: pedX - 56, top: pedTopY - 6, width: 112, height: 20, borderRadius: 6,
        background: "linear-gradient(180deg, #3A4258, #222838)", border: "1px solid #4A5470" }} />
      {/* pedestal up-glow */}
      <div style={{ position: "absolute", left: pedX - 70, top: pedTopY - 90, width: 140, height: 130,
        background: "radial-gradient(50% 60% at 50% 90%, rgba(231,178,76,0.35), transparent 70%)",
        opacity: scrollGrabbed ? 0.25 : 0.8 + Math.sin(lf * 0.2) * 0.15, filter: "blur(3px)", pointerEvents: "none" }} />

      {/* ===== HERO (Leo) with mask overlay ===== */}
      <div style={{ position: "absolute", left: heroX - 60, top: bodyY - 60,
        transform: `rotate(${twist}deg) scaleY(${crouch})`, transformOrigin: "50% 30%" }}>
        <div style={{ position: "relative", width: 120, height: 120 }}>
          <Mascot lf={lf} size={120}
            suit={1}
            cheer={ascend > 0 ? interpolate(ascend, [0, 0.5], [0, 0.7]) : 0}
            shock={alarm > 0 && alarm < 1 ? interpolate(alarm, [0, 0.3, 1], [0, 1, 0.5]) : 0}
            gaze={weaveX / 40}
          />
          {/* black balaclava / stealth mask overlay covering top of head, eye slit */}
          <div style={{ position: "absolute", left: 24, top: 8, width: 72, height: 52, borderRadius: "34px 34px 20px 20px",
            background: "linear-gradient(180deg, #14161C, #05060A)", border: "1px solid #23262F" }} />
          {/* eye slit */}
          <div style={{ position: "absolute", left: 32, top: 30, width: 56, height: 13, borderRadius: 8,
            background: "#0A0B10", boxShadow: "inset 0 1px 2px rgba(255,255,255,0.06)" }} />
          {/* two glinting eyes in slit */}
          <div style={{ position: "absolute", left: 42, top: 34, width: 7, height: 7, borderRadius: "50%", background: "#DDE6F2" }} />
          <div style={{ position: "absolute", left: 71, top: 34, width: 7, height: 7, borderRadius: "50%", background: "#DDE6F2" }} />
        </div>
      </div>

      {/* sweat bead */}
      {sweatOp > 0 && (
        <div style={{ position: "absolute", left: heroX + 26, top: bodyY - 26 + sweatY, width: 8, height: 11,
          borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
          background: "radial-gradient(circle at 35% 30%, #DFF0FF, #7FB2E0)", opacity: sweatOp,
          transform: `rotate(${twist}deg)`, boxShadow: "0 0 4px rgba(180,220,255,0.6)" }} />
      )}

      {/* ===== GLOWING SCROLL (parchment) ===== */}
      <div style={{ position: "absolute", left: scrollX - 30, top: scrollY - 12,
        transform: `rotate(${scrollGrabbed ? twist - 8 : 0}deg)`, transformOrigin: "50% 50%" }}>
        {/* glow halo */}
        <div style={{ position: "absolute", left: -22, top: -22, width: 104, height: 68,
          background: "radial-gradient(50% 50% at 50% 50%, rgba(231,178,76,0.75), rgba(207,149,68,0.2) 55%, transparent 75%)",
          opacity: Math.min(1, scrollGlow), filter: "blur(3px)" }} />
        {/* rolled parchment body */}
        <div style={{ position: "absolute", left: 6, top: 4, width: 48, height: 20, borderRadius: 10,
          background: "linear-gradient(180deg, #F3E4BE, #D9BE84)", border: "1px solid #B99A56",
          boxShadow: "0 0 12px rgba(231,178,76,0.7)" }} />
        {/* end caps (rolled ends) */}
        <div style={{ position: "absolute", left: 0, top: 2, width: 16, height: 24, borderRadius: "50%",
          background: "radial-gradient(circle at 40% 40%, #F6EAC8, #C9AC6C)", border: "1px solid #B0904F" }} />
        <div style={{ position: "absolute", left: 44, top: 2, width: 16, height: 24, borderRadius: "50%",
          background: "radial-gradient(circle at 40% 40%, #F6EAC8, #C9AC6C)", border: "1px solid #B0904F" }} />
        {/* ribbon tie */}
        <div style={{ position: "absolute", left: 26, top: 0, width: 6, height: 28,
          background: "linear-gradient(180deg, #C44A3A, #8E2E22)", borderRadius: 2 }} />
        <div style={{ position: "absolute", left: 22, top: 24, width: 14, height: 8,
          background: "#C44A3A", borderRadius: 3, transform: "rotate(-14deg)" }} />
      </div>

      {/* ===== ALARM RED FLASH OVERLAY ===== */}
      {alertFlash > 0 && (
        <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792,
          background: "radial-gradient(120% 100% at 50% 50%, rgba(227,59,46,0.05), rgba(227,59,46,0.28) 100%)",
          opacity: alertFlash, pointerEvents: "none" }} />
      )}
      {/* corner alert strobes */}
      {alarm > 0 && alarm < 1 && [[30,30],[886,30],[30,700],[886,700]].map((p, i) => (
        <div key={"str"+i} style={{ position: "absolute", left: p[0], top: p[1], width: 90, height: 90, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,60,40,0.5), transparent 70%)",
          opacity: alertFlash, filter: "blur(2px)", pointerEvents: "none" }} />
      ))}

      {/* ===== FLOATING DUST MOTES (depth particles) ===== */}
      {motes.map(i => {
        const bx = 120 + seed(i * 3 + 1) * 780;
        const by = 120 + seed(i * 7 + 2) * 480;
        const drift = Math.sin(lf * 0.03 + i) * 14;
        const rise = ((lf * 0.4 + i * 40) % 200);
        const sz = 1.5 + seed(i) * 2.5;
        return <div key={"mote"+i} style={{ position: "absolute", left: bx + drift, top: by - rise * 0.3,
          width: sz, height: sz, borderRadius: "50%", background: "rgba(150,180,220,0.4)",
          opacity: 0.2 + seed(i * 2) * 0.4, filter: "blur(0.5px)" }} />;
      })}

      {/* ===== ESCAPE SPEED LINES on ascend ===== */}
      {ascend > 0.1 && [0,1,2,3,4].map(i => (
        <div key={"sp"+i} style={{ position: "absolute", left: heroX - 40 + i * 20, top: bodyY + 40,
          width: 2, height: interpolate(ascend, [0, 1], [10, 90]),
          background: "linear-gradient(180deg, transparent, rgba(63,174,130,0.55))",
          opacity: ascend * 0.8, borderRadius: 2 }} />
      ))}

      {/* success glint sparkles on escape */}
      {ascend > 0.4 && [0,1,2,3,4,5].map(i => {
        const a = (i / 6) * Math.PI * 2 + lf * 0.1;
        const r = interpolate(ascend, [0.4, 1], [10, 46]);
        return <div key={"gl"+i} style={{ position: "absolute",
          left: scrollX + 10 + Math.cos(a) * r, top: scrollY + Math.sin(a) * r,
          width: 4, height: 4, borderRadius: "50%", background: "#E7B24C",
          opacity: (ascend - 0.4) * 1.4, boxShadow: "0 0 6px rgba(231,178,76,0.9)" }} />;
      })}
    </>
  );
};

const MaxSkit: React.FC<{ lf: number }> = ({ lf }) => {
  // ===== OCEAN'S ELEVEN — CRACK THE VAULT =====
  // Beat 1 (0-0.5s): Max slides in, earpiece tap, crew assembles.
  // Beat 2 (0.5-3.0s): dial spins, tumblers click, timer counts down, tension escalates.
  // Beat 3 (3.0-5.1s): VAULT CRACKS OPEN -> gold bars + chips + cash glow = SHIPPED.

  const CY = "#2FA6C4";

  // --- global entrance ---
  const enter = over(lf, fr(0), fr(0.5), Easing.out(Easing.back(1.5)));
  const maxX = interpolate(enter, [0, 1], [-360, 0]);
  const streak = over(lf, fr(0.02), fr(0.35), Easing.out(Easing.cubic));

  // --- vault dial spin: escalates then locks ---
  const spinStart = fr(0.55);
  const spinEnd = fr(2.95);
  const spinP = over(lf, spinStart, spinEnd - spinStart, Easing.inOut(Easing.sin));
  const dialRot = interpolate(spinP, [0, 1], [0, 1080]); // 3 full turns
  const dialWobble = Math.sin(lf * 0.9) * (1 - spinP) * 4;
  const locked = lf > spinEnd;

  // --- vault crack open ---
  const crackStart = fr(3.05);
  const doorP = over(lf, crackStart, fr(1.1), Easing.inOut(Easing.sin)); // door swing
  const boom = over(lf, crackStart, fr(0.3), Easing.out(Easing.cubic)); // impact flash
  const shake = (1 - Math.min(1, (lf - crackStart) / 8)) * (lf > crackStart ? 1 : 0);
  const shakeX = shake > 0 ? Math.sin(lf * 3.1) * 6 * shake : 0;
  const shakeY = shake > 0 ? Math.cos(lf * 2.7) * 4 * shake : 0;

  // --- gold reveal glow ---
  const goldP = over(lf, fr(3.4), fr(1.0), Easing.out(Easing.cubic));
  const shippedP = over(lf, fr(4.2), fr(0.5), Easing.out(Easing.back(1.7)));

  // --- countdown timer ---
  const totalSec = 5.1;
  const remain = Math.max(0, (totalSec - lf / 30));
  const mm = String(Math.floor(remain / 60)).padStart(2, "0");
  const ss = String(Math.floor(remain % 60)).padStart(2, "0");
  const cs = String(Math.floor((remain * 100) % 100)).padStart(2, "0");
  const timerHot = remain < 1.2;

  // --- tumbler lights (row that turns green as dial spins) ---
  const tumblers = [0, 1, 2, 3, 4, 5, 6];

  // --- crew of small suited sprites ---
  const crew = [
    { x: 120, y: 470, s: 96, d: 0, gaze: 0.5 },
    { x: 250, y: 520, s: 84, d: 6, gaze: -0.4 },
  ];

  // --- chandelier crystals ---
  const crystals = Array.from({ length: 9 });

  // --- floating casino chips (payoff particles) ---
  const chips = Array.from({ length: 14 });

  // --- cash bills fluttering out ---
  const bills = Array.from({ length: 8 });

  // --- ambient dust / dark motes ---
  const motes = Array.from({ length: 18 });

  const vaultCX = 720;
  const vaultCY = 400;
  const vaultR = 250;

  return (
    <>
      {/* ============ BACKGROUND: plush casino carpet pattern ============ */}
      <div style={{
        position: "absolute", left: 0, top: 470, width: 1012, height: 322,
        background: "linear-gradient(180deg,#3A1018,#22070C)",
        boxShadow: "inset 0 30px 60px rgba(0,0,0,0.55)",
      }} />
      {/* carpet diamonds */}
      {Array.from({ length: 22 }).map((_, i) => {
        const col = i % 11, row = Math.floor(i / 11);
        return (
          <div key={"cd" + i} style={{
            position: "absolute", left: 20 + col * 95, top: 540 + row * 120,
            width: 46, height: 46, transform: "rotate(45deg)",
            background: "rgba(207,149,68,0.06)", border: "1px solid rgba(231,178,76,0.10)",
          }} />
        );
      })}

      {/* ============ BACK WALL PANELS with gold trim ============ */}
      {[80, 300, 900].map((x, i) => (
        <div key={"wp" + i} style={{
          position: "absolute", left: x, top: 60, width: 120, height: 400,
          background: "linear-gradient(180deg,rgba(74,21,32,0.5),rgba(26,8,16,0.2))",
          border: "1px solid rgba(231,178,76,0.12)", borderRadius: 6,
          boxShadow: "inset 0 0 40px rgba(0,0,0,0.4)",
        }} />
      ))}

      {/* ============ CHANDELIER ============ */}
      <div style={{ position: "absolute", left: 430, top: 0, width: 160, height: 150 }}>
        <div style={{
          position: "absolute", left: 78, top: 0, width: 4, height: 40,
          background: GOLD, opacity: 0.6,
        }} />
        <div style={{
          position: "absolute", left: 20, top: 40, width: 120, height: 34,
          borderRadius: "50%", border: "3px solid " + GOLD, opacity: 0.75,
          boxShadow: "0 0 24px rgba(231,178,76,0.4)",
        }} />
        {crystals.map((_, i) => {
          const cx = 26 + i * 12;
          const tw = 0.5 + 0.5 * Math.sin(lf * 0.25 + i);
          return (
            <div key={"cr" + i} style={{
              position: "absolute", left: cx, top: 66 + (i % 3) * 10, width: 8, height: 16,
              background: "linear-gradient(180deg,#FFF6D8," + GOLD + ")",
              transform: "rotate(45deg)", borderRadius: 2,
              opacity: 0.4 + tw * 0.6, boxShadow: `0 0 ${6 + tw * 8}px rgba(255,240,200,0.7)`,
            }} />
          );
        })}
      </div>
      {/* chandelier ambient glow */}
      <div style={{
        position: "absolute", left: 360, top: 30, width: 300, height: 300,
        borderRadius: "50%", background: "radial-gradient(circle, rgba(231,178,76,0.14), transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* ============ AMBIENT DUST MOTES ============ */}
      {motes.map((_, i) => {
        const bx = seed(i * 3 + 1) * 1012;
        const by = 40 + seed(i * 7 + 2) * 700;
        const fl = Math.sin(lf * 0.05 + i) * 10;
        return (
          <div key={"mo" + i} style={{
            position: "absolute", left: bx + fl, top: by + Math.cos(lf * 0.04 + i) * 8,
            width: 3 + seed(i * 5) * 3, height: 3 + seed(i * 5) * 3, borderRadius: "50%",
            background: "rgba(231,178,76,0.35)", filter: "blur(0.5px)",
            opacity: 0.2 + 0.3 * (0.5 + 0.5 * Math.sin(lf * 0.1 + i)),
          }} />
        );
      })}

      {/* ============ SCENE LABEL ============ */}
      <div style={{
        position: "absolute", left: 40, top: 40, transform: `translateX(${interpolate(enter,[0,1],[-200,0])}px)`,
        opacity: enter,
      }}>
        <div style={{
          fontFamily: mono, fontSize: 20, letterSpacing: 4, color: CY,
          border: "1px solid " + CY, padding: "5px 12px", borderRadius: 4,
          background: "rgba(47,166,196,0.08)", boxShadow: "0 0 20px rgba(47,166,196,0.3)",
          display: "inline-block",
        }}>◆ CRACK THE VAULT</div>
      </div>

      {/* ============ SECURITY TIMER ============ */}
      <div style={{
        position: "absolute", right: 44, top: 40, textAlign: "right",
        opacity: enter, transform: `translateX(${interpolate(enter,[0,1],[120,0])}px)`,
      }}>
        <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: 3, color: MUTE }}>SECURITY LOCK</div>
        <div style={{
          fontFamily: mono, fontSize: 40, fontWeight: 700,
          color: timerHot ? RED : GOLD, letterSpacing: 2,
          textShadow: timerHot ? "0 0 20px rgba(196,74,58,0.8)" : "0 0 14px rgba(231,178,76,0.5)",
          transform: timerHot ? `scale(${1 + Math.abs(Math.sin(lf * 0.6)) * 0.08})` : "none",
        }}>{mm}:{ss}:{cs}</div>
      </div>

      {/* ============ THE VAULT (shakes on crack) ============ */}
      <div style={{
        position: "absolute", left: 0, top: 0, width: 1012, height: 792,
        transform: `translate(${shakeX}px,${shakeY}px)`,
      }}>
        {/* vault recess / frame ring */}
        <div style={{
          position: "absolute", left: vaultCX - vaultR - 34, top: vaultCY - vaultR - 34,
          width: (vaultR + 34) * 2, height: (vaultR + 34) * 2, borderRadius: "50%",
          background: "radial-gradient(circle,#2A1418,#160608)",
          border: "10px solid #0E0406",
          boxShadow: "inset 0 0 60px rgba(0,0,0,0.8), 0 30px 60px rgba(0,0,0,0.6)",
        }} />
        {/* bolt ring */}
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i / 24) * Math.PI * 2;
          const rr = vaultR + 14;
          return (
            <div key={"bolt" + i} style={{
              position: "absolute",
              left: vaultCX + Math.cos(a) * rr - 6, top: vaultCY + Math.sin(a) * rr - 6,
              width: 12, height: 12, borderRadius: "50%",
              background: "radial-gradient(circle at 35% 35%,#F3D48A," + AMBER + ")",
              boxShadow: "0 2px 3px rgba(0,0,0,0.5)",
            }} />
          );
        })}

        {/* ===== VAULT DOOR (swings open) ===== */}
        <div style={{
          position: "absolute", left: vaultCX - vaultR, top: vaultCY - vaultR,
          width: vaultR * 2, height: vaultR * 2,
          transformOrigin: "left center",
          transform: `perspective(1400px) rotateY(${interpolate(doorP,[0,1],[0,-115])}deg)`,
          transformStyle: "preserve-3d",
          zIndex: 6,
        }}>
          {/* door body */}
          <div style={{
            position: "absolute", inset: 0, borderRadius: "50%",
            background: "radial-gradient(circle at 40% 35%,#4E5A64,#2C343C 60%,#1A2026)",
            border: "8px solid #10151A",
            boxShadow: "inset 0 0 50px rgba(0,0,0,0.7), 0 0 40px rgba(0,0,0,0.5)",
          }} />
          {/* concentric grooves */}
          {[0.82, 0.62, 0.42].map((f, i) => (
            <div key={"gv" + i} style={{
              position: "absolute", left: vaultR * (1 - f), top: vaultR * (1 - f),
              width: vaultR * 2 * f, height: vaultR * 2 * f, borderRadius: "50%",
              border: "2px solid rgba(0,0,0,0.4)", boxShadow: "inset 0 0 12px rgba(0,0,0,0.5)",
            }} />
          ))}
          {/* tumbler light ring */}
          {tumblers.map((t, i) => {
            const a = (i / tumblers.length) * Math.PI * 2 - Math.PI / 2;
            const rr = vaultR * 0.72;
            const litThresh = i / tumblers.length;
            const lit = spinP > litThresh || locked;
            return (
              <div key={"tm" + i} style={{
                position: "absolute",
                left: vaultR + Math.cos(a) * rr - 9, top: vaultR + Math.sin(a) * rr - 9,
                width: 18, height: 18, borderRadius: "50%",
                background: lit ? GREEN : "#2A1418",
                border: "2px solid " + (lit ? "#7FE0B0" : "#3A2228"),
                boxShadow: lit ? "0 0 14px rgba(63,158,116,0.9)" : "inset 0 0 6px rgba(0,0,0,0.6)",
              }} />
            );
          })}

          {/* ===== CENTRAL DIAL (spins) ===== */}
          <div style={{
            position: "absolute", left: vaultR - 78, top: vaultR - 78, width: 156, height: 156,
            borderRadius: "50%",
            background: "radial-gradient(circle at 38% 34%,#6B7680,#39424A 55%,#222A30)",
            border: "6px solid #12171C",
            boxShadow: locked
              ? "0 0 30px rgba(63,158,116,0.6), inset 0 4px 8px rgba(255,255,255,0.15)"
              : "inset 0 4px 8px rgba(255,255,255,0.12), 0 6px 14px rgba(0,0,0,0.5)",
            transform: `rotate(${dialRot + dialWobble}deg)`,
          }}>
            {/* dial spokes */}
            {[0, 60, 120].map((deg) => (
              <div key={"sp" + deg} style={{
                position: "absolute", left: 74, top: 12, width: 4, height: 132,
                background: "linear-gradient(180deg,#0E1216,#5A656E,#0E1216)",
                transform: `rotate(${deg}deg)`, transformOrigin: "center", borderRadius: 2,
              }} />
            ))}
            {/* dial center cap */}
            <div style={{
              position: "absolute", left: 58, top: 58, width: 40, height: 40, borderRadius: "50%",
              background: "radial-gradient(circle at 35% 35%," + GOLD + "," + AMBER + ")",
              boxShadow: "0 2px 6px rgba(0,0,0,0.5), inset 0 0 8px rgba(255,255,255,0.3)",
            }} />
            {/* tick marks */}
            {Array.from({ length: 12 }).map((_, i) => {
              const a = (i / 12) * Math.PI * 2;
              return (
                <div key={"tk" + i} style={{
                  position: "absolute", left: 76 + Math.cos(a) * 62, top: 76 + Math.sin(a) * 62,
                  width: 3, height: 10, background: "#0C1014", transformOrigin: "center",
                  transform: `translate(-50%,-50%) rotate(${(i / 12) * 360}deg)`,
                }} />
              );
            })}
          </div>

          {/* big vault handle spokes over dial */}
          {[0, 90].map((deg) => (
            <div key={"hs" + deg} style={{
              position: "absolute", left: vaultR - 6, top: vaultR - 92, width: 12, height: 184,
              background: "linear-gradient(180deg,#3A434B,#1C2228)", borderRadius: 6,
              transform: `rotate(${deg + dialRot * 0.15}deg)`, transformOrigin: "center",
              boxShadow: "0 3px 6px rgba(0,0,0,0.5)",
            }} />
          ))}
          <div style={{
            position: "absolute", left: vaultR - 16, top: vaultR - 16, width: 32, height: 32,
            borderRadius: "50%", background: "radial-gradient(circle,#4A545C,#20262C)",
            border: "3px solid #10151A",
          }} />
        </div>

        {/* ===== VAULT INTERIOR (revealed as door swings) ===== */}
        <div style={{
          position: "absolute", left: vaultCX - vaultR + 10, top: vaultCY - vaultR + 10,
          width: (vaultR - 10) * 2, height: (vaultR - 10) * 2, borderRadius: "50%",
          overflow: "hidden",
          background: "radial-gradient(circle at 50% 45%,#5A3A12,#2A1806 70%,#160C04)",
          boxShadow: `inset 0 0 80px rgba(231,178,76,${0.3 + goldP * 0.5})`,
          opacity: doorP > 0.15 ? 1 : 0,
          zIndex: 3,
        }}>
          {/* golden halo behind loot */}
          <div style={{
            position: "absolute", left: "50%", top: "50%", width: 360, height: 360,
            transform: "translate(-50%,-50%)", borderRadius: "50%",
            background: `radial-gradient(circle,rgba(255,225,120,${0.35 * goldP}),transparent 65%)`,
            filter: "blur(6px)",
          }} />

          {/* GOLD BARS stack */}
          {Array.from({ length: 10 }).map((_, i) => {
            const row = Math.floor(i / 4), col = i % 4;
            const rowW = row === 2 ? 2 : 4;
            if (col >= rowW) return null;
            const pop = over(lf, fr(3.5) + i, fr(0.4), Easing.out(Easing.back(1.6)));
            const bx = 130 + col * 54 + (row === 2 ? 54 : 0);
            const by = 300 - row * 30;
            return (
              <div key={"gb" + i} style={{
                position: "absolute", left: bx, top: by,
                width: 50, height: 26, transform: `scale(${pop}) skewX(-8deg)`,
                background: "linear-gradient(160deg,#FFE58A 0%," + GOLD + " 45%," + AMBER + " 100%)",
                borderRadius: 3, border: "1px solid #FFF0BE",
                boxShadow: `0 4px 8px rgba(0,0,0,0.5), 0 0 ${10 * goldP}px rgba(231,178,76,0.7)`,
              }}>
                <div style={{ position: "absolute", left: 6, top: 3, width: 16, height: 8, borderRadius: "50%", background: "rgba(255,255,255,0.4)", filter: "blur(2px)" }} />
              </div>
            );
          })}

          {/* casino chip stacks inside */}
          {[[110, 200], [150, 210], [340, 205], [380, 215]].map((p, i) => (
            <div key={"cs" + i} style={{ position: "absolute", left: p[0], top: p[1], opacity: goldP }}>
              {Array.from({ length: 6 }).map((_, j) => {
                const cc = [CY, RED, GOLD, GREEN][(i + j) % 4];
                return (
                  <div key={j} style={{
                    position: "absolute", left: 0, top: -j * 7, width: 34, height: 12,
                    borderRadius: "50%", background: cc, border: "2px dashed rgba(255,255,255,0.5)",
                    boxShadow: "0 2px 3px rgba(0,0,0,0.4)",
                  }} />
                );
              })}
            </div>
          ))}

          {/* cash bundles */}
          {[[230, 340], [290, 345], [200, 360]].map((p, i) => (
            <div key={"cb" + i} style={{
              position: "absolute", left: p[0], top: p[1], width: 60, height: 26,
              background: "linear-gradient(180deg,#4E7A54,#356045)", borderRadius: 3,
              border: "1px solid #6FBF80", opacity: goldP,
              boxShadow: "0 3px 6px rgba(0,0,0,0.4)",
            }}>
              <div style={{ position: "absolute", left: 22, top: 5, width: 16, height: 16, borderRadius: "50%", border: "1px solid #9FE8B0", color: "#9FE8B0", fontFamily: mono, fontSize: 11, textAlign: "center", lineHeight: "16px" }}>$</div>
            </div>
          ))}
        </div>

        {/* impact flash on crack */}
        <div style={{
          position: "absolute", left: vaultCX - 200, top: vaultCY - 200, width: 400, height: 400,
          borderRadius: "50%", pointerEvents: "none",
          background: "radial-gradient(circle,rgba(255,240,190," + (boom * (1 - doorP)) + "),transparent 60%)",
          zIndex: 8,
        }} />
      </div>

      {/* ============ light rays bursting from opened vault ============ */}
      {goldP > 0 && Array.from({ length: 10 }).map((_, i) => {
        const a = -70 + i * 16;
        return (
          <div key={"ray" + i} style={{
            position: "absolute", left: vaultCX - 20, top: vaultCY,
            width: 500, height: 8, transformOrigin: "left center",
            transform: `rotate(${a}deg) scaleX(${goldP})`,
            background: "linear-gradient(90deg,rgba(255,225,120,0.5),transparent)",
            filter: "blur(3px)", opacity: 0.5 * goldP, zIndex: 4, pointerEvents: "none",
          }} />
        );
      })}

      {/* ============ FLOATING CHIPS (payoff particles) ============ */}
      {chips.map((_, i) => {
        const t = over(lf, fr(3.5) + seed(i) * 8, fr(1.4), Easing.out(Easing.cubic));
        if (t <= 0) return null;
        const startX = vaultCX + (seed(i * 3) - 0.5) * 120;
        const startY = vaultCY + (seed(i * 5) - 0.5) * 100;
        const ex = startX + (seed(i * 7) - 0.5) * 380;
        const ey = startY - 180 - seed(i * 9) * 180;
        const cc = [CY, RED, GOLD, GREEN, CREAM][i % 5];
        const rot = t * (200 + seed(i) * 300);
        return (
          <div key={"fc" + i} style={{
            position: "absolute", left: interpolate(t, [0, 1], [startX, ex]),
            top: interpolate(t, [0, 1], [startY, ey]),
            width: 26, height: 26, borderRadius: "50%",
            background: cc, border: "3px dashed rgba(255,255,255,0.6)",
            transform: `rotate(${rot}deg) scale(${0.7 + t * 0.5})`,
            boxShadow: "0 3px 6px rgba(0,0,0,0.4), 0 0 10px rgba(231,178,76,0.4)",
            opacity: interpolate(t, [0, 0.15, 0.85, 1], [0, 1, 1, 0]), zIndex: 12,
          }} />
        );
      })}

      {/* ============ CASH BILLS fluttering ============ */}
      {bills.map((_, i) => {
        const t = over(lf, fr(3.7) + seed(i * 2) * 10, fr(1.5), Easing.out(Easing.cubic));
        if (t <= 0) return null;
        const sx = vaultCX + (seed(i * 4) - 0.5) * 100;
        const ex = sx + (seed(i * 6) - 0.5) * 300;
        const ey = vaultCY - 120 - seed(i * 8) * 160;
        return (
          <div key={"bl" + i} style={{
            position: "absolute", left: interpolate(t, [0, 1], [vaultCX, ex]),
            top: interpolate(t, [0, 1], [vaultCY, ey]),
            width: 46, height: 22, borderRadius: 3,
            background: "linear-gradient(180deg,#5A8A60,#3D6A4C)",
            border: "1px solid #7FCF90",
            transform: `rotate(${Math.sin(lf * 0.4 + i) * 30}deg) scale(${0.8 + t * 0.3})`,
            opacity: interpolate(t, [0, 0.15, 0.85, 1], [0, 0.95, 0.95, 0]), zIndex: 11,
          }} />
        );
      })}

      {/* ============ speed streak on entrance ============ */}
      {streak < 1 && (
        <div style={{
          position: "absolute", left: interpolate(streak, [0, 1], [40, 320]), top: 560,
          width: interpolate(streak, [0, 1], [340, 40]), height: 90,
          background: `linear-gradient(90deg,rgba(47,166,196,${0.5 * (1 - streak)}),transparent)`,
          filter: "blur(6px)", borderRadius: 40, zIndex: 14, pointerEvents: "none",
        }} />
      )}

      {/* ============ CREW (small suited sprites) ============ */}
      {crew.map((c, i) => {
        const ce = over(lf, fr(0.15) + i * 3, fr(0.5), Easing.out(Easing.back(1.4)));
        const cheer = c.d === 0 ? shippedP : over(lf, fr(4.25), fr(0.4));
        return (
          <div key={"crew" + i} style={{
            position: "absolute", left: c.x, top: c.y,
            transform: `translateX(${interpolate(ce, [0, 1], [-200, 0])}px)`,
            opacity: ce, zIndex: 13,
          }}>
            {/* shadow */}
            <div style={{
              position: "absolute", left: c.s * 0.14, top: c.s * 0.92, width: c.s * 0.72, height: 14,
              borderRadius: "50%", background: "rgba(0,0,0,0.4)", filter: "blur(4px)",
            }} />
            <Mascot lf={lf + c.d} size={c.s} suit={1} gaze={c.gaze} cheer={cheer}
              nodAmp={locked ? 0 : 3} nodSpeed={4} />
          </div>
        );
      })}

      {/* ============ MAX (hero — CTO mastermind) ============ */}
      <div style={{
        position: "absolute", left: 330, top: 380,
        transform: `translateX(${maxX + shakeX * 0.5}px)`, zIndex: 15,
      }}>
        {/* ground shadow */}
        <div style={{
          position: "absolute", left: 24, top: 232, width: 130, height: 22,
          borderRadius: "50%", background: "rgba(0,0,0,0.45)", filter: "blur(6px)",
        }} />
        {/* earpiece glow ping */}
        <div style={{
          position: "absolute", left: 128, top: 44, width: 14, height: 14, borderRadius: "50%",
          background: CY, boxShadow: "0 0 14px " + CY,
          opacity: 0.4 + 0.6 * Math.abs(Math.sin(lf * 0.4)), zIndex: 3,
        }} />
        <Mascot
          lf={lf}
          size={190}
          suit={1}
          glasses={1}
          gaze={locked ? 0 : Math.sin(lf * 0.08) * 0.4}
          cheer={shippedP}
          stern={!locked ? 1 : 0}
          nodAmp={locked ? 0 : 2}
          nodSpeed={3}
        />
        {/* Max's hand reaching to dial pre-crack (a suited arm cue) */}
        {!locked && (
          <div style={{
            position: "absolute", left: 156, top: 116, width: 60, height: 16,
            background: "linear-gradient(90deg,#2C343C,#3A5C84)", borderRadius: 8,
            transform: `rotate(${-10 + Math.sin(lf * 0.5) * 8}deg)`, transformOrigin: "left center",
            boxShadow: "0 3px 6px rgba(0,0,0,0.4)", zIndex: 4,
          }}>
            <div style={{ position: "absolute", right: -6, top: -3, width: 20, height: 20, borderRadius: "50%", background: "#D97757", border: "2px solid #B85E42" }} />
          </div>
        )}
      </div>

      {/* ============ SHIPPED! stamp payoff ============ */}
      {shippedP > 0 && (
        <div style={{
          position: "absolute", left: 470, top: 150,
          transform: `translateX(-50%) scale(${interpolate(shippedP, [0, 1], [0.3, 1])}) rotate(${interpolate(shippedP,[0,1],[-14,-6])}deg)`,
          opacity: shippedP, zIndex: 20,
        }}>
          <div style={{
            fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 58, color: GOLD,
            textShadow: "0 0 30px rgba(231,178,76,0.7), 0 4px 0 rgba(0,0,0,0.3)",
            letterSpacing: 1, whiteSpace: "nowrap",
          }}>SHIPPED.</div>
          <div style={{
            marginTop: 4, textAlign: "center", fontFamily: mono, fontSize: 16, letterSpacing: 3,
            color: GREEN, textShadow: "0 0 12px rgba(63,158,116,0.6)",
          }}>▲ 0 BUGS · VAULT OPEN</div>
        </div>
      )}

      {/* ============ sparkle pops on payoff ============ */}
      {shippedP > 0 && Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        const rr = 60 + shippedP * 120;
        return (
          <div key={"spk" + i} style={{
            position: "absolute", left: 720 + Math.cos(a) * rr, top: 400 + Math.sin(a) * rr,
            width: 8, height: 8, borderRadius: "50%", background: CREAM,
            boxShadow: "0 0 12px " + GOLD, opacity: (1 - shippedP) * 0.9 + 0.1,
            transform: `scale(${0.5 + shippedP})`, zIndex: 19, pointerEvents: "none",
          }} />
        );
      })}

      {/* ============ vignette ============ */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 25,
        background: "radial-gradient(120% 100% at 60% 45%, transparent 55%, rgba(10,3,6,0.55) 100%)",
      }} />
    </>
  );
};

const JackSkit: React.FC<{ lf: number }> = ({ lf }) => {
  // ===== global entrance / beats =====
  const deskIn = over(lf, fr(0.05), fr(0.5), Easing.out(Easing.cubic));
  const jackRise = over(lf, fr(0.35), fr(0.55), Easing.out(Easing.back(1.5)));
  const floorWake = over(lf, fr(0.6), fr(0.7), Easing.out(Easing.cubic));
  const boardIn = over(lf, fr(0.5), fr(0.6), Easing.out(Easing.back(1.4)));
  const payoff = over(lf, fr(2.9), fr(1.0), Easing.out(Easing.cubic));
  const finalPump = over(lf, fr(3.0), fr(0.8), Easing.out(Easing.back(2.0)));

  const t = lf / 30;
  const bob = Math.sin(lf * 0.28) * 4;

  // ===== BACKGROUND: gold light beams + window skyline =====
  const beams = [0, 1, 2, 3, 4].map((i) => {
    const bx = 120 + i * 200;
    const sway = Math.sin(lf * 0.05 + i) * 18;
    return (
      <div key={"beam" + i} style={{
        position: "absolute", left: bx + sway, top: -60, width: 120, height: 520,
        background: "linear-gradient(180deg, rgba(231,178,76,0.20), rgba(231,178,76,0))",
        transform: "skewX(-12deg)", filter: "blur(8px)",
        opacity: 0.5 + 0.3 * Math.sin(lf * 0.08 + i), mixBlendMode: "screen",
      }} />
    );
  });

  // City skyline silhouette (far background)
  const skyline = [...Array(11)].map((_, i) => {
    const h = 90 + seed(i * 3 + 1) * 150;
    const w = 60 + seed(i * 7 + 2) * 30;
    const x = 20 + i * 90;
    return (
      <div key={"bld" + i} style={{
        position: "absolute", left: x, top: 300 - h, width: w, height: h,
        background: "linear-gradient(180deg,#3A3320,#211B10)", opacity: 0.55,
        boxShadow: "inset 0 0 0 1px rgba(231,178,76,0.08)",
      }}>
        {[...Array(6)].map((__, k) => (
          <div key={k} style={{
            position: "absolute", left: 6 + (k % 3) * (w / 3), top: 10 + Math.floor(k / 3) * 26,
            width: 8, height: 12,
            background: seed(i * 13 + k) > 0.5 ? "rgba(231,178,76,0.55)" : "rgba(231,178,76,0.12)",
          }} />
        ))}
      </div>
    );
  });

  // ===== BIG BOARD: SELL SELL SELL =====
  const boardBlink = 0.55 + 0.45 * Math.abs(Math.sin(lf * 0.5));
  const board = (
    <div style={{
      position: "absolute", left: 300, top: 40 - (1 - boardIn) * 80, width: 412, height: 96,
      transform: `scale(${0.6 + boardIn * 0.4})`, transformOrigin: "50% 0%",
      opacity: boardIn,
      background: "linear-gradient(180deg,#241C10,#160F07)",
      border: "3px solid " + AMBER, borderRadius: 12,
      boxShadow: "0 0 40px rgba(207,149,68,0.5), inset 0 0 20px rgba(0,0,0,0.6)",
      display: "flex", alignItems: "center", justifyContent: "center", gap: 14,
    }}>
      {["SELL", "SELL", "SELL"].map((w, i) => (
        <span key={i} style={{
          fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 44, letterSpacing: 2,
          color: RED, textShadow: `0 0 ${8 + boardBlink * 14}px rgba(196,74,58,0.9)`,
          opacity: 0.55 + 0.45 * Math.abs(Math.sin(lf * 0.5 + i * 0.6)),
        }}>{w}</span>
      ))}
      <div style={{ position: "absolute", right: 12, top: 8, width: 12, height: 12, borderRadius: 6, background: GREEN, boxShadow: "0 0 10px " + GREEN, opacity: boardBlink }} />
    </div>
  );

  // ===== STOCK TICKER (scrolling) =====
  const tickItems = ["ACME +42%", "▲ CLOSED", "MOON +88%", "BULL +19%", "DEAL WON", "GAINS +7%", "SOLD ✓", "PROFIT +55%"];
  const tickerScroll = -((lf * 5) % 1400);
  const ticker = (
    <div style={{
      position: "absolute", left: 20, top: 150, width: 972, height: 40,
      background: "linear-gradient(180deg,#120D06,#0A0704)", borderTop: "1px solid rgba(231,178,76,0.4)",
      borderBottom: "1px solid rgba(231,178,76,0.4)", overflow: "hidden",
      display: "flex", alignItems: "center", opacity: floorWake,
    }}>
      <div style={{ position: "absolute", left: tickerScroll, whiteSpace: "nowrap", display: "flex", gap: 44 }}>
        {[...tickItems, ...tickItems, ...tickItems].map((tk, i) => (
          <span key={i} style={{
            fontFamily: mono, fontSize: 20, fontWeight: 700,
            color: tk.includes("-") ? RED : GREEN, textShadow: "0 0 6px rgba(63,158,116,0.4)",
          }}>{tk}</span>
        ))}
      </div>
    </div>
  );

  // ===== CROWD: broker-sprites screaming, raised fists =====
  const brokers = [
    { x: 70, y: 470, s: 92, d: 0 }, { x: 210, y: 500, s: 84, d: 1 },
    { x: 770, y: 500, s: 84, d: 2 }, { x: 900, y: 470, s: 92, d: 3 },
    { x: 150, y: 560, s: 76, d: 4 }, { x: 840, y: 560, s: 76, d: 5 },
  ].map((b, i) => {
    const wake = over(lf, fr(0.6 + i * 0.06), fr(0.5), Easing.out(Easing.back(1.5)));
    const fistPump = Math.max(0, Math.sin(lf * 0.4 + b.d * 1.3)) * 22;
    const jump = Math.max(0, Math.sin(lf * 0.35 + b.d)) * 10;
    const cheerAmt = 0.4 + 0.6 * Math.abs(Math.sin(lf * 0.3 + b.d));
    return (
      <div key={"brk" + i} style={{
        position: "absolute", left: b.x, top: b.y - jump - fistPump * 0.3,
        opacity: wake, transform: `scale(${0.5 + wake * 0.5})`, transformOrigin: "50% 100%",
      }}>
        {/* shadow */}
        <div style={{ position: "absolute", left: b.s * 0.15, top: b.s + jump, width: b.s * 0.7, height: 10, borderRadius: "50%", background: "rgba(0,0,0,0.35)", filter: "blur(3px)" }} />
        <Mascot lf={lf + i * 5} size={b.s} suit={1} cheer={cheerAmt} nodAmp={0} gaze={0.2 * Math.sin(lf * 0.2 + i)} />
        {/* shout burst */}
        <div style={{
          position: "absolute", left: b.s * 0.5, top: -10,
          fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 18, color: GOLD,
          opacity: cheerAmt, textShadow: "0 0 8px rgba(231,178,76,0.6)",
          transform: `translateY(${-fistPump * 0.4}px)`,
        }}>SELL!</div>
      </div>
    );
  });

  // ===== MID-GROUND DESK (Jack stands on it) =====
  const deskX = interpolate(deskIn, [0, 1], [-500, 0]);
  const desk = (
    <div style={{ position: "absolute", left: 300 + deskX, top: 600, width: 412, height: 130 }}>
      {/* speed streak on entrance */}
      {deskIn < 1 && (
        <div style={{
          position: "absolute", left: -160, top: 20, width: 200, height: 90,
          background: "linear-gradient(90deg, rgba(231,178,76,0), rgba(231,178,76,0.5))",
          filter: "blur(6px)", opacity: (1 - deskIn) * 0.9, borderRadius: 20,
        }} />
      )}
      <div style={{
        position: "absolute", left: 0, top: 0, width: 412, height: 44, borderRadius: "6px 6px 0 0",
        background: "linear-gradient(180deg,#6E4A28,#4A3018)",
        boxShadow: "0 -6px 20px rgba(0,0,0,0.5), inset 0 3px 0 rgba(231,178,76,0.35)",
      }} />
      <div style={{
        position: "absolute", left: 24, top: 44, width: 364, height: 86,
        background: "linear-gradient(180deg,#3B2714,#241609)",
      }} />
      {/* desk clutter: monitors */}
      {[40, 300].map((mx, i) => (
        <div key={"mon" + i} style={{
          position: "absolute", left: mx, top: -34, width: 74, height: 42, borderRadius: 4,
          background: "linear-gradient(180deg,#0E2A1C,#06140C)", border: "2px solid #1F3A2A",
          boxShadow: "0 0 12px rgba(63,158,116,0.3)",
        }}>
          {[...Array(4)].map((_, k) => (
            <div key={k} style={{ position: "absolute", left: 6, top: 6 + k * 8, width: 30 + seed(i * 5 + k) * 30, height: 3, background: GREEN, opacity: 0.7 }} />
          ))}
        </div>
      ))}
      {/* scattered papers flying off desk */}
      {[...Array(5)].map((_, i) => {
        const fly = over(lf, fr(0.5 + i * 0.1), fr(1.2), Easing.out(Easing.cubic));
        return (
          <div key={"pp" + i} style={{
            position: "absolute", left: 60 + i * 70, top: 20 - fly * (60 + seed(i) * 80),
            width: 26, height: 34, background: CREAM, borderRadius: 2,
            transform: `rotate(${(seed(i * 3) - 0.5) * 120 * fly}deg)`,
            opacity: 0.85 * (1 - fly * 0.5), boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
          }} />
        );
      })}
    </div>
  );

  // ===== JACK — the hero, standing on desk =====
  const jackY = interpolate(jackRise, [0, 1], [80, 0]);
  const jackScale = 0.7 + jackRise * 0.3;
  const jackBob = bob + finalPump * -14;
  const jackCheer = 0.3 + 0.4 * Math.abs(Math.sin(lf * 0.35)) + finalPump * 0.5;
  const chestThump = Math.max(0, Math.sin(lf * 0.6)) * 8;
  const jack = (
    <div style={{
      position: "absolute", left: 400, top: 380 + jackY + jackBob,
      transform: `scale(${jackScale})`, transformOrigin: "50% 100%", opacity: jackRise,
    }}>
      {/* glow halo */}
      <div style={{
        position: "absolute", left: -40, top: -30, width: 280, height: 280, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(231,178,76,0.35), rgba(231,178,76,0))",
        filter: "blur(6px)", opacity: 0.6 + finalPump * 0.4,
      }} />
      <Mascot lf={lf} size={200} suit={1} cheer={jackCheer} nodAmp={0} gaze={0} />
      {/* loosened tie */}
      <div style={{
        position: "absolute", left: 92, top: 96, width: 16, height: 46,
        background: "linear-gradient(180deg,#C44A3A,#8A2E22)",
        clipPath: "polygon(50% 0, 100% 22%, 78% 100%, 22% 100%, 0 22%)",
        transform: `rotate(${8 + Math.sin(lf * 0.2) * 4}deg)`, transformOrigin: "50% 0",
      }} />
      {/* landline phone at ear */}
      <div style={{ position: "absolute", left: 150, top: 60, transform: `rotate(${-18 + Math.sin(lf * 0.3) * 3}deg)` }}>
        <div style={{ width: 20, height: 56, borderRadius: 10, background: "linear-gradient(180deg,#2A2A2E,#141416)", boxShadow: "0 2px 6px rgba(0,0,0,0.5)" }} />
        <div style={{ position: "absolute", left: -4, top: -6, width: 28, height: 14, borderRadius: 8, background: "#1C1C20" }} />
        <div style={{ position: "absolute", left: -4, top: 48, width: 28, height: 14, borderRadius: 8, background: "#1C1C20" }} />
        {/* coiled cord */}
        <svg width="60" height="80" style={{ position: "absolute", left: -50, top: 40 }}>
          <path d={`M55,10 q-30,${10 + chestThump},-20,30 q10,20,-25,30`} stroke="#141416" strokeWidth="3" fill="none" />
        </svg>
      </div>
      {/* chest-thump fist glow */}
      <div style={{
        position: "absolute", left: 40, top: 108 - chestThump, width: 30, height: 30, borderRadius: 8,
        background: "radial-gradient(circle,#E8A063,#C4623A)", opacity: 0.8,
        boxShadow: "0 0 " + (6 + chestThump * 2) + "px rgba(210,99,46,0.6)",
      }} />
      {/* shout label */}
      <div style={{
        position: "absolute", left: 200, top: 10,
        transform: `scale(${0.8 + 0.3 * Math.abs(Math.sin(lf * 0.5))})`, transformOrigin: "0 50%",
        fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 30, color: GOLD,
        textShadow: "0 0 12px rgba(231,178,76,0.7)", whiteSpace: "nowrap",
      }}>CLOSE IT!</div>
    </div>
  );

  // ===== DEAL TICKETS popping "$1,000,000 CLOSED" =====
  const tickets = [
    { x: 130, y: 260, at: 1.0, r: -8 }, { x: 720, y: 240, at: 1.5, r: 7 },
    { x: 180, y: 380, at: 2.1, r: -5 }, { x: 700, y: 400, at: 2.6, r: 6 },
  ].map((tk, i) => {
    const pop = over(lf, fr(tk.at), fr(0.4), Easing.out(Easing.back(2.2)));
    const drift = over(lf, fr(tk.at), fr(2.0), Easing.out(Easing.cubic));
    if (pop <= 0) return null;
    return (
      <div key={"tick" + i} style={{
        position: "absolute", left: tk.x, top: tk.y - drift * 40,
        transform: `scale(${pop}) rotate(${tk.r}deg)`, opacity: pop * (1 - drift * 0.3),
        background: "linear-gradient(180deg,#F4EEDF,#E7DFC8)", borderRadius: 8, padding: "8px 14px",
        border: "2px solid " + AMBER, boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
        fontFamily: mono, textAlign: "center",
      }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: GREEN }}>$1,000,000</div>
        <div style={{ fontSize: 13, fontWeight: 700, color: CLAY, letterSpacing: 3 }}>CLOSED ✓</div>
      </div>
    );
  });

  // ===== CASH RAIN (thick, building) =====
  const cashCount = 34;
  const cash = [...Array(cashCount)].map((_, i) => {
    const startAt = 0.7 + seed(i) * 2.6;
    const speed = 60 + seed(i * 2) * 70;
    const px = 20 + seed(i * 3) * 950;
    const cy = ((t - startAt) * speed) % 900;
    if (cy < 0) return null;
    const sway = Math.sin((t + i) * 2) * 24;
    const rot = (t * 120 + i * 40) % 360;
    const flip = Math.abs(Math.cos((t + i) * 1.5));
    return (
      <div key={"cash" + i} style={{
        position: "absolute", left: px + sway, top: -40 + cy, width: 42, height: 22,
        transform: `rotate(${rot}deg) scaleX(${0.3 + flip * 0.7})`,
        background: "linear-gradient(180deg,#5FA86E,#3F7D52)", borderRadius: 3,
        border: "1px solid #2E5C3C", boxShadow: "0 2px 4px rgba(0,0,0,0.25)",
        display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.92,
      }}>
        <span style={{ fontFamily: mono, fontSize: 13, fontWeight: 800, color: "#D8F0DC" }}>$</span>
      </div>
    );
  });

  // ===== COINS (mixed with cash for density) =====
  const coins = [...Array(16)].map((_, i) => {
    const startAt = 1.0 + seed(i * 5) * 2.4;
    const speed = 90 + seed(i * 7) * 80;
    const px = 40 + seed(i * 11) * 920;
    const cy = ((t - startAt) * speed) % 860;
    if (cy < 0) return null;
    const sway = Math.sin((t + i) * 2.4) * 18;
    return (
      <div key={"coin" + i} style={{
        position: "absolute", left: px + sway, top: -30 + cy,
        width: 20 + seed(i) * 10, height: 20 + seed(i) * 10, borderRadius: "50%",
        transform: `scaleX(${0.4 + Math.abs(Math.sin((t + i) * 3)) * 0.6})`,
        background: "radial-gradient(circle at 35% 30%,#F6D26A,#C7952F)",
        border: "1.5px solid #A6791F", boxShadow: "0 0 8px rgba(231,178,76,0.5)",
      }} />
    );
  });

  // ===== CHAMPAGNE SPRAY (from sides) =====
  const champ = [...Array(18)].map((_, i) => {
    const spray = over(lf, fr(1.3 + (i % 6) * 0.15), fr(1.2), Easing.out(Easing.cubic));
    if (spray <= 0) return null;
    const side = i % 2 === 0 ? 1 : -1;
    const originX = side === 1 ? 120 : 900;
    const dx = side * spray * (120 + seed(i) * 160);
    const dy = -spray * (100 + seed(i * 2) * 90) + spray * spray * 200;
    return (
      <div key={"ch" + i} style={{
        position: "absolute", left: originX + dx, top: 220 + dy,
        width: 8 + seed(i) * 6, height: 8 + seed(i) * 6, borderRadius: "50%",
        background: "radial-gradient(circle,#FBF3D8,#E7C97A)", opacity: (1 - spray) * 0.9,
        boxShadow: "0 0 6px rgba(251,243,216,0.6)",
      }} />
    );
  });

  // ===== PAYOFF: CASH EXPLOSION burst =====
  const explosion = [...Array(28)].map((_, i) => {
    if (payoff <= 0) return null;
    const ang = (i / 28) * Math.PI * 2;
    const dist = payoff * (240 + seed(i) * 200);
    const bx = 506 + Math.cos(ang) * dist;
    const by = 340 + Math.sin(ang) * dist * 0.8 + payoff * payoff * 160;
    const isBill = i % 2 === 0;
    return (
      <div key={"exp" + i} style={{
        position: "absolute", left: bx, top: by,
        width: isBill ? 44 : 22, height: isBill ? 24 : 22, borderRadius: isBill ? 3 : "50%",
        transform: `rotate(${i * 47 + lf * 8}deg)`, opacity: 1 - payoff * 0.4,
        background: isBill ? "linear-gradient(180deg,#5FA86E,#3F7D52)" : "radial-gradient(circle at 35% 30%,#F6D26A,#C7952F)",
        border: isBill ? "1px solid #2E5C3C" : "1.5px solid #A6791F",
        boxShadow: "0 0 8px rgba(231,178,76,0.4)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>{isBill && <span style={{ fontFamily: mono, fontSize: 12, fontWeight: 800, color: "#D8F0DC" }}>$</span>}</div>
    );
  });

  // shockwave ring on payoff
  const ring = payoff > 0 ? (
    <div style={{
      position: "absolute", left: 506, top: 340, width: 40, height: 40, borderRadius: "50%",
      transform: `translate(-50%,-50%) scale(${1 + payoff * 14})`,
      border: "4px solid rgba(231,178,76,0.6)", opacity: (1 - payoff) * 0.8,
    }} />
  ) : null;

  // ===== CLOSED payoff seal =====
  const sealPop = over(lf, fr(3.3), fr(0.5), Easing.out(Easing.back(2.0)));
  const seal = sealPop > 0 ? (
    <div style={{
      position: "absolute", left: 640, top: 120, transform: `scale(${sealPop}) rotate(-12deg)`,
      transformOrigin: "50% 50%", opacity: sealPop,
    }}>
      <div style={{
        width: 150, height: 150, borderRadius: "50%",
        background: "radial-gradient(circle,#D0632E,#9E3F1C)",
        border: "5px double #F4EEDF", boxShadow: "0 0 30px rgba(208,99,46,0.7)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      }}>
        <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 30, color: CREAM, letterSpacing: 1 }}>DEAL</span>
        <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 30, color: CREAM, letterSpacing: 1 }}>CLOSED</span>
        <span style={{ fontFamily: mono, fontSize: 15, color: GOLD, marginTop: 2 }}>✓ SIGNED</span>
      </div>
    </div>
  ) : null;

  // confetti on seal
  const confetti = sealPop > 0 ? [...Array(20)].map((_, i) => {
    const cf = over(lf, fr(3.35 + i * 0.01), fr(1.0), Easing.out(Easing.cubic));
    const ang = (i / 20) * Math.PI * 2;
    const cols = [GOLD, CLAY, GREEN, CREAM, AMBER];
    return (
      <div key={"cf" + i} style={{
        position: "absolute", left: 715 + Math.cos(ang) * cf * 180,
        top: 195 + Math.sin(ang) * cf * 160 + cf * cf * 120,
        width: 10, height: 14, background: cols[i % 5],
        transform: `rotate(${i * 60 + lf * 12}deg)`, opacity: 1 - cf * 0.6,
      }} />
    );
  }) : null;

  return (
    <>
      {beams}
      {skyline}
      {board}
      {ticker}
      {brokers}
      {champ}
      {tickets}
      {desk}
      {cash}
      {coins}
      {jack}
      {ring}
      {explosion}
      {seal}
      {confetti}
    </>
  );
};

const Mia: React.FC<{ lf: number }> = ({ lf }) => <ExecScene lf={lf} num={1} name="Mia" title="CMO" tag="THE MASTERMIND" accent="#E05C9E" bg="radial-gradient(circle at 50% 42%, #33344F 0%, #26263E 52%, #1B1B2C 100%)" line="HEY, JARVIS!" bx2={548} by2={140}><MiaSkit lf={lf} /></ExecScene>;

const Ben: React.FC<{ lf: number }> = ({ lf }) => <ExecScene lf={lf} num={4} name="Ben" title="COO" tag="THE CAPTAIN" accent="#2E7BB0" bg="linear-gradient(180deg, #BFE6FF 0%, #8FC9F0 26%, #4E8BBE 52%, #2C6394 74%, #1E4E78 100%)" line="HEAVE HO!" bx2={300} by2={98}><BenSkit lf={lf} /></ExecScene>;

const Kate: React.FC<{ lf: number }> = ({ lf }) => <ExecScene lf={lf} num={5} name="Kate" title="CHIEF OF STAFF" tag="THE COMMANDER" accent="#D9A441" bg="linear-gradient(180deg,#F3C98A 0%,#E9B368 18%,#3E82A6 44%,#2E6E96 62%,#C8A46A 78%,#A9854E 100%)" floor="linear-gradient(180deg,#C8A46A,#A9854E)" line="TO CARTHAGE!" bx2={520} by2={158}><KateSkit lf={lf} /></ExecScene>;

const Leo: React.FC<{ lf: number }> = ({ lf }) => <ExecScene lf={lf} num={6} name="Leo" title="CSO" tag="THE INFILTRATOR" accent="#3FAE82" bg="radial-gradient(circle at 52% 34%, #2A3350 0%, #22283C 42%, #10131F 72%, #0A0C14 100%)" floor="linear-gradient(180deg, #0F1320 0%, #0A0C14 60%, #06070C 100%)" line="WE’RE IN." bx2={300} by2={104}><LeoSkit lf={lf} /></ExecScene>;

const Max: React.FC<{ lf: number }> = ({ lf }) => <ExecScene lf={lf} num={3} name="Max" title="CTO" tag="THE HACKER" accent="#2FA6C4" bg="radial-gradient(120% 90% at 68% 40%, #4A1520 0%, #2A0C12 55%, #1A0810 100%)" floor="linear-gradient(180deg,#3A1018,#22070C)" line="JACKPOT!" bx2={112} by2={150}><MaxSkit lf={lf} /></ExecScene>;

const Jack: React.FC<{ lf: number }> = ({ lf }) => <ExecScene lf={lf} num={2} name="Jack" title="VP OF SALES" tag="THE CLOSER" accent="#D0632E" bg="radial-gradient(120% 100% at 50% 22%, #2E2718 0%, #201A0E 45%, #14110A 100%)" floor="linear-gradient(180deg,#B98830 0%,#8A5A2E 60%,#5E3D1F 100%)" line="SELL! SELL!" bx2={520} by2={106}><JackSkit lf={lf} /></ExecScene>;

const CrewSprite: React.FC<{ lf: number; size?: number; role: string; cheer?: number; nodAmp?: number; nodSpeed?: number }> = ({ lf, size = 110, role, cheer = 0.5, nodAmp = 1.5, nodSpeed = 7 }) => {
  const S = size; const P = (v: number) => (v / 100) * S;
  const base: any = {}; if (role === "max" || role === "jack") base.suit = 1;
  const pulse = 0.6 + 0.4 * Math.sin(lf / 5);
  return (
    <div style={{ position: "relative", width: S, height: S }}>
      <Mascot lf={lf} size={S} cheer={cheer} nodAmp={nodAmp} nodSpeed={nodSpeed} {...base} />
      {role === "mia" && (<>
        <div style={{ position: "absolute", left: P(24), top: P(40), width: P(52), height: P(34), background: "linear-gradient(160deg,#D8483A,#A82C22)", borderRadius: P(6) }} />
        <div style={{ position: "absolute", left: P(15), top: P(41), width: P(17), height: P(17), background: "linear-gradient(160deg,#F0C24A,#C79420)", borderRadius: P(6) }} />
        <div style={{ position: "absolute", left: P(68), top: P(41), width: P(17), height: P(17), background: "linear-gradient(160deg,#F0C24A,#C79420)", borderRadius: P(6) }} />
        <div style={{ position: "absolute", left: P(27), top: P(21), width: P(46), height: P(30), background: "linear-gradient(160deg,#F2C650,#CC9A24)", borderRadius: "44% 44% 32% 32%" }}>
          <div style={{ position: "absolute", left: P(7), top: P(13), width: P(12), height: P(4), background: "#9CF6FF", boxShadow: "0 0 6px #9CF6FF", transform: "skewX(-12deg)" }} />
          <div style={{ position: "absolute", right: P(7), top: P(13), width: P(12), height: P(4), background: "#9CF6FF", boxShadow: "0 0 6px #9CF6FF", transform: "skewX(12deg)" }} />
        </div>
        <div style={{ position: "absolute", left: P(43), top: P(50), width: P(14), height: P(14), borderRadius: "50%", background: "radial-gradient(circle,#EAFDFF,#5FE0FF 55%,#1A8FB0)", boxShadow: `0 0 ${P(10)}px #5FE0FF`, transform: `scale(${pulse})` }} />
      </>)}
      {role === "ben" && (<>
        <div style={{ position: "absolute", left: P(8), top: P(15), width: P(84), height: P(13), background: "#241A12", borderRadius: 999, boxShadow: "0 2px 3px rgba(0,0,0,0.3)" }} />
        <div style={{ position: "absolute", left: P(20), top: P(-2), width: P(60), height: P(22), background: "#2C2016", borderRadius: "48% 48% 22% 22%" }} />
        <div style={{ position: "absolute", left: P(20), top: P(16), width: P(60), height: P(4), background: "#C79A3A", borderRadius: 999 }} />
        <div style={{ position: "absolute", left: P(43), top: P(3), width: P(14), height: P(13), borderRadius: "50% 50% 45% 45%", background: "#EBE4CE" }} />
        <div style={{ position: "absolute", left: P(70), top: P(30), width: P(24), height: P(26) }}>
          <div style={{ position: "absolute", left: P(2), top: P(6), width: P(16), height: P(18), borderRadius: "50% 50% 50% 30%", background: "#3FAE5E" }} />
          <div style={{ position: "absolute", left: P(9), top: P(0), width: P(11), height: P(11), borderRadius: "50%", background: "#4BC06E" }} />
          <div style={{ position: "absolute", left: P(-2), top: P(8), width: P(12), height: P(10), borderRadius: "50% 20% 50% 50%", background: "#2E8A48", transform: `rotate(${Math.sin(lf / 3) * 22}deg)`, transformOrigin: "80% 40%" }} />
          <div style={{ position: "absolute", left: P(17), top: P(4), width: P(6), height: P(4), background: "#E7B24C", clipPath: "polygon(0 0,100% 50%,0 100%)" }} />
          <div style={{ position: "absolute", left: P(13), top: P(2), width: P(3), height: P(3), borderRadius: "50%", background: "#14140E" }} />
        </div>
      </>)}
      {role === "kate" && (<>
        <div style={{ position: "absolute", left: P(14), top: P(36), width: P(72), height: P(52), background: "linear-gradient(180deg,#C63A2C,#8A2418)", borderRadius: "42% 42% 24% 24%", zIndex: -1 }} />
        <div style={{ position: "absolute", left: P(24), top: P(16), width: P(52), height: P(42), background: "linear-gradient(160deg,#E0AE44,#A87A28)", borderRadius: "48% 48% 40% 40%" }} />
        <div style={{ position: "absolute", left: P(47), top: P(28), width: P(6), height: P(26), background: "#3A2A14" }} />
        <div style={{ position: "absolute", left: P(34), top: P(30), width: P(32), height: P(6), background: "#3A2A14" }} />
        <div style={{ position: "absolute", left: P(40), top: P(-1), width: P(20), height: P(20), background: "linear-gradient(90deg,#C63A2C,#E0503A)", borderRadius: "60% 60% 20% 20%", transform: "scaleX(0.7)" }} />
      </>)}
      {role === "leo" && (<>
        <div style={{ position: "absolute", left: P(16), top: P(8), width: P(68), height: P(30), background: "#191921", borderRadius: "50% 50% 12% 12%", zIndex: -1 }} />
        <div style={{ position: "absolute", left: P(22), top: P(20), width: P(56), height: P(8), background: "#14141C" }} />
        <div style={{ position: "absolute", left: P(22), top: P(47), width: P(56), height: P(20), background: "#14141C", borderRadius: "20% 20% 30% 30%" }} />
      </>)}
      {role === "max" && (<>
        <div style={{ position: "absolute", left: P(26), top: P(14), width: P(48), height: P(14), background: "#221A12", borderRadius: "50% 50% 0 0" }} />
        <div style={{ position: "absolute", left: P(42), top: P(52), width: P(16), height: P(9), background: "#14141C", clipPath: "polygon(0 0,50% 40%,0 100%,100% 100%,50% 60%,100% 0)" }} />
        <div style={{ position: "absolute", left: P(75), top: P(34), width: P(7), height: P(7), borderRadius: "50%", background: "#2A2A34" }} />
        <div style={{ position: "absolute", left: P(76), top: P(40), width: P(3), height: P(10), background: "#2A2A34", borderRadius: 2 }} />
      </>)}
      {role === "jack" && (<>
        <div style={{ position: "absolute", left: P(26), top: P(14), width: P(48), height: P(13), background: "#2A1E12", borderRadius: "50% 50% 0 0" }} />
        <div style={{ position: "absolute", left: P(46), top: P(50), width: P(8), height: P(22), background: "#C0392B", clipPath: "polygon(0 0,100% 0,78% 100%,22% 100%)" }} />
        <div style={{ position: "absolute", left: P(20), top: P(30), width: P(4), height: P(16), background: "#222", borderRadius: 2, transform: "rotate(-18deg)" }} />
        <div style={{ position: "absolute", left: P(18), top: P(44), width: P(8), height: P(5), borderRadius: 3, background: "#333" }} />
      </>)}
    </div>
  );
};

const SLOT = [{ x: 30, c: A_MIA }, { x: 192, c: A_JACK }, { x: 354, c: A_MAX }, { x: 516, c: A_BEN }, { x: 678, c: A_KATE }, { x: 840, c: A_LEO }];

const Hook: React.FC<{ lf: number }> = ({ lf }) => {
  const shatterAt = fr(3.0);
  const shatter = over(lf, shatterAt, fr(0.6), Easing.in(Easing.quad));
  const wizIn = over(lf, fr(0.2), fr(0.6), Easing.out(Easing.back(1.5)));
  const wizGone = over(lf, shatterAt, fr(0.3));
  const flash = lf >= shatterAt && lf < shatterAt + 9 ? Math.max(0, 1 - (lf - shatterAt) / 9) : 0;
  const cursor = Math.floor((lf / 8) % 6);
  const titlePop = over(lf, 0, fr(0.4), Easing.out(Easing.back(2)));
  const totalSec = 5 * 86400 + 11 * 3600 + 42 * 60 + 58 - Math.floor(lf / 30);
  const cd = [{ v: Math.floor(totalSec / 86400), l: "DAYS" }, { v: Math.floor((totalSec % 86400) / 3600), l: "HRS" }, { v: Math.floor((totalSec % 3600) / 60), l: "MIN" }, { v: totalSec % 60, l: "SEC" }];
  const timerPop = over(lf, fr(0.25), fr(0.5), Easing.out(Easing.back(1.6)));
  return (
    <Panel label="player select">
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 40%, #3A2E5E, #1A1630)" }} />
      <CrewRays lf={lf} color={GOLD} op={0.18} />
      <Sparkles lf={lf} n={16} color="#FFE9A0" />
      <div style={{ position: "absolute", left: 0, right: 0, top: 66, textAlign: "center", zIndex: 20, transform: `scale(${titlePop})` }}>
        <span style={{ display: "inline-block", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 58, color: "#FFF3D6", textShadow: "0 4px 0 #C7541F, 0 6px 16px rgba(0,0,0,0.5)", transform: `rotate(${Math.sin(lf / 8) * 1.5}deg)` }}>ASSEMBLE YOUR CREW</span>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 152, display: "flex", justifyContent: "center", zIndex: 26, transform: `scale(${timerPop})` }}>
        <div>
          <div style={{ textAlign: "center", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 15, color: "#FFC9BE", letterSpacing: "0.14em", marginBottom: 7 }}>FABLE 5 FREE ACCESS ENDS IN</div>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "14px 20px", borderRadius: 18, background: "linear-gradient(180deg,#2A1016,#120609)", border: `4px solid ${RED}`, boxShadow: `0 0 34px ${RED}55, ${NAVYSH}`, transform: `scale(${1 + 0.02 * Math.abs(Math.sin(lf / 6))})` }}>
            {cd.map((u, i) => <React.Fragment key={i}>
              {i > 0 ? <div style={{ fontFamily: mono, fontSize: 46, fontWeight: 900, color: "#6A2A2A", lineHeight: 1, marginTop: 4 }}>:</div> : null}
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: mono, fontSize: 54, fontWeight: 900, color: "#FF6250", lineHeight: 1, textShadow: "0 0 14px #FF625099", background: "#1A0A0E", padding: "4px 10px", borderRadius: 9, minWidth: 82, border: "1px solid rgba(255,98,80,0.25)" }}>{String(u.v).padStart(2, "0")}</div>
                <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 13, color: "#C98878", marginTop: 6, letterSpacing: "0.1em" }}>{u.l}</div>
              </div>
            </React.Fragment>)}
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", left: 44, top: 306, zIndex: 22, padding: "7px 16px", borderRadius: 10, background: A_MIA, transform: "rotate(-7deg)", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 24, color: "#fff", boxShadow: "0 6px 14px -4px rgba(0,0,0,0.5)" }}>6 HIRES</div>
      <div style={{ position: "absolute", right: 44, top: 306, zIndex: 22, padding: "7px 16px", borderRadius: 10, background: A_LEO, transform: "rotate(6deg)", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 24, color: "#fff", boxShadow: "0 6px 14px -4px rgba(0,0,0,0.5)" }}>1 SETUP</div>
      {SLOT.map((s, i) => { const charge = over(lf, shatterAt + fr(0.2) + i * 2, 8); const hot = cursor === i && lf < shatterAt; return (
        <div key={i} style={{ position: "absolute", left: s.x, top: 424, width: 142, height: 296, borderRadius: 14, background: "linear-gradient(180deg,#2A2448,#1A1530)", border: `4px solid ${charge > 0.1 ? s.c : hot ? "#FFF3D6" : "#4A4266"}`, boxShadow: hot ? "0 0 20px #FFF3D6aa" : charge > 0.1 ? `0 0 16px ${s.c}88` : "0 8px 18px -6px rgba(0,0,0,0.5)", transform: `scale(${hot ? 1.05 : 1})`, zIndex: 12, overflow: "hidden" }}>
          <div style={{ position: "absolute", left: "50%", top: 130, transform: "translateX(-50%)", filter: charge > 0.1 ? "brightness(0.12)" : "brightness(0.09)" }}><Mascot lf={lf + i * 6} size={122} nodAmp={2.4} nodSpeed={7 + i} /></div>
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 18, textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 62, color: charge > 0.1 ? s.c : "#3A3358" }}>?</div>
        </div>
      ); })}
      {wizGone < 1 ? (
        <div style={{ position: "absolute", left: 506, top: 402, transform: `translate(-50%,-50%) scale(${wizIn * (1 - wizGone) * (1 + shatter * 0.35)})`, zIndex: 25, filter: `drop-shadow(0 0 ${22 + shatter * 30}px #FFD764)` }}>
          <Mascot lf={lf} size={200} wizard={1} cheer={0.3} nodAmp={2.4} nodSpeed={7} />
        </div>
      ) : null}
      {shatter > 0.01 ? SLOT.map((s, i) => { const tx = 506 + (s.x + 71 - 506) * shatter; const ty = 402 + (500 - 402) * shatter; return (
        <div key={"sh" + i} style={{ position: "absolute", left: tx, top: ty, width: 30, height: 30, borderRadius: "50%", background: s.c, boxShadow: `0 0 16px ${s.c}`, transform: `scale(${1 - shatter * 0.4})`, opacity: 1 - shatter, zIndex: 28 }}>
          <div style={{ position: "absolute", left: 6, top: 6, width: 12, height: 12, borderRadius: "50%", background: "#fff", opacity: 0.7 }} />
        </div>
      ); }) : null}
      {/* ---- post-shatter: shockwave + per-slot color bursts + confetti + light sweep ---- */}
      {shatter > 0.15 ? (() => { const sw = over(lf, shatterAt + fr(0.12), fr(0.75), Easing.out(Easing.cubic)); return sw < 1 ? <div style={{ position: "absolute", left: 506, top: 480, width: 60 + sw * 980, height: 40 + sw * 600, marginLeft: -(30 + sw * 490), marginTop: -(20 + sw * 300), borderRadius: "50%", border: `${7 * (1 - sw)}px solid #FFE9A0`, boxShadow: `0 0 24px rgba(255,233,160,${(1 - sw) * 0.6})`, opacity: (1 - sw) * 0.85, zIndex: 22 }} /> : null; })() : null}
      {SLOT.map((s, i) => { const burst = over(lf, shatterAt + fr(0.25) + i * 3, 11, Easing.out(Easing.cubic)); if (burst <= 0.02 || burst >= 1) return null; const cx = s.x + 71; return (
        <React.Fragment key={"bst" + i}>
          <div style={{ position: "absolute", left: cx - (12 + burst * 80), top: 500 - (12 + burst * 80), width: 24 + burst * 160, height: 24 + burst * 160, borderRadius: "50%", border: `${5 * (1 - burst)}px solid ${s.c}`, opacity: 1 - burst, zIndex: 26 }} />
          {[0, 1, 2, 3, 4, 5, 6, 7].map((k) => { const a = (k / 8) * Math.PI * 2; const d = burst * 74; return <div key={k} style={{ position: "absolute", left: cx + Math.cos(a) * d - 3, top: 500 + Math.sin(a) * d - 3, width: 6 * (1 - burst) + 2, height: 6 * (1 - burst) + 2, borderRadius: 2, background: s.c, opacity: 1 - burst, zIndex: 26, boxShadow: `0 0 6px ${s.c}` }} />; })}
        </React.Fragment>
      ); })}
      {lf > shatterAt + fr(0.5) ? Array.from({ length: 26 }, (_, i) => { const t = ((lf - shatterAt - fr(0.5) + i * 5) % 70) / 70; const cc = SLOT[i % 6].c; const x = 30 + seed(i) * 950; const y = 250 + t * 490; const sway = Math.sin(lf / 8 + i) * 16; return <div key={"cf" + i} style={{ position: "absolute", left: x + sway, top: y, width: 12, height: 8, borderRadius: 2, background: cc, opacity: (1 - t) * 0.9, transform: `rotate(${i * 40 + lf * 6}deg)`, zIndex: 24 }} />; }) : null}
      {(() => { const sweep = over(lf, shatterAt + fr(0.55), fr(0.7)); return sweep > 0.02 && sweep < 0.99 ? <div style={{ position: "absolute", left: 20 + sweep * 980, top: 424, width: 90, height: 296, background: "linear-gradient(90deg, transparent, rgba(255,247,214,0.5), transparent)", zIndex: 27, transform: "skewX(-12deg)" }} /> : null; })()}
      {/* comedic: a whole flurry of stray Fables get flung clean off-screen (fills the ~5s lull) */}
      {[
        { t: 4.05, dir: 1, y0: 560, arc: 360, size: 128, sp: 760, sk: 0.5 },
        { t: 4.45, dir: -1, y0: 620, arc: 300, size: 104, sp: -700, sk: 0.45 },
        { t: 4.85, dir: 1, y0: 500, arc: 440, size: 118, sp: 900, sk: 0.5 },
        { t: 5.2, dir: -1, y0: 600, arc: 330, size: 96, sp: -740, sk: 0.4 },
        { t: 5.55, dir: 1, y0: 660, arc: 300, size: 112, sp: 820, sk: 0.5 },
      ].map((f, i) => { const fl = over(lf, fr(f.t), fr(1.05), Easing.in(Easing.quad)); if (fl <= 0.001 || fl >= 0.999) return null; const x = f.dir === 1 ? -180 + fl * 1400 : 1200 - fl * 1400; const y = f.y0 - Math.sin(fl * Math.PI) * f.arc; const rot = fl * f.sp; return (
        <React.Fragment key={"fling" + i}>
          <div style={{ position: "absolute", left: x - f.dir * 40 * (1 - fl), top: y + 22, width: 60, height: 10, borderRadius: 6, background: "rgba(255,247,214,0.4)", transform: `rotate(${rot * 0.3}deg)`, zIndex: 35, filter: "blur(2px)" }} />
          <div style={{ position: "absolute", left: x, top: y, transform: `rotate(${rot}deg)`, zIndex: 36 }}>
            <Mascot lf={lf + i * 4} size={f.size} wizard={1} shock={f.sk} nodAmp={0} nodSpeed={9} />
          </div>
        </React.Fragment>
      ); })}
      {flash > 0 ? <AbsoluteFill style={{ background: "#FFF6E6", opacity: flash * 0.6, zIndex: 40 }} /> : null}
    </Panel>
  );
};

const RehookScene: React.FC<{ lf: number }> = ({ lf }) => {
  // ===== REFERENCE: "one setup becomes six" — a single clay mascot CLONES/splits
  // into 6 tinted crew, fanning into a confident hero lineup, each getting a
  // name tag that snaps in. Celebratory ensemble-poster energy. ==========

  const crew = [
    { name: "Mia",  role: "CMO",             tag: "#E05C9E", cm: { girl: 1 }, crole: "mia" },
    { name: "Jack", role: "VP Sales",        tag: "#D0632E", cm: { cop: 1 }, crole: "jack" },
    { name: "Max",  role: "CTO",             tag: "#2FA6C4", cm: { prof: 1 }, crole: "max" },
    { name: "Ben",  role: "COO",             tag: "#2E7BB0", cm: { suit: 1 }, crole: "ben" },
    { name: "Kate", role: "Chief of Staff",  tag: "#D9A441", cm: { glasses: 1 }, crole: "kate" },
    { name: "Leo",  role: "CSO",             tag: "#3FAE82", cm: { beard: 1 }, crole: "leo" },
  ];

  // Lineup geometry: 6 heroes fanned across, arced (ends slightly lower for poster feel)
  const CX = 506, CY = 402;
  const spread = 156;          // horizontal gap between heroes
  const lineY = [30, -6, -26, -26, -6, 30]; // arc offsets (px, + = lower)
  const heroSize = 168;

  // Timeline (frames, 30fps, scene ~97f)
  const F_ORB    = fr(0.0);   // single sprite lands
  const F_CHARGE = fr(0.5);   // it pulses / charges to split
  const F_SPLIT  = fr(0.9);   // clones burst outward
  const F_SETTLE = fr(1.55);  // heroes settle into lineup
  const F_TAGS   = fr(1.7);   // name tags snap in (staggered)
  const F_TITLE  = fr(0.15);  // scene title in
  const F_PAYOFF = fr(2.5);   // final unify pulse / cheer

  // scene title "MEET THE CREW"
  const titleP = over(lf, F_TITLE, fr(0.45), Easing.out(Easing.back(1.5)));
  const titleY = interpolate(titleP, [0, 1], [-46, 0]);

  // ---- background layers ----
  // soft vignette wash pulse
  const bgPulse = 0.5 + 0.5 * Math.sin(lf / 9);

  // radial "energy" ring that expands at the split moment
  const ringP = over(lf, F_SPLIT - fr(0.08), fr(0.9), Easing.out(Easing.cubic));
  const ringScale = interpolate(ringP, [0, 1], [0.2, 2.4]);
  const ringOp = interpolate(ringP, [0, 0.15, 1], [0, 0.55, 0]);

  // a second shock ring at payoff
  const ring2P = over(lf, F_PAYOFF, fr(0.7), Easing.out(Easing.cubic));
  const ring2Scale = interpolate(ring2P, [0, 1], [0.3, 2.0]);
  const ring2Op = interpolate(ring2P, [0, 0.2, 1], [0, 0.4, 0]);

  // ---- single center sprite (before split) ----
  const orbIn = over(lf, F_ORB, fr(0.42), Easing.out(Easing.back(1.8)));
  const chargeP = over(lf, F_CHARGE, fr(0.42), Easing.inOut(Easing.sin));
  // charge wobble/squash right before burst
  const chargeSquash = lf < F_SPLIT
    ? 1 + 0.14 * Math.sin(lf * 1.4) * chargeP
    : 1;
  const orbGone = over(lf, F_SPLIT, fr(0.22), Easing.in(Easing.quad));
  const orbOpacity = orbIn * (1 - orbGone);
  const orbScale = orbIn * (1 - 0.35 * orbGone) * chargeSquash;
  const orbGlow = 0.4 + 0.6 * chargeP;

  // ghost copies that "peel off" the center at split (motion trails)
  const peelCount = 6;

  // confetti (dense, festive)
  const confN = 46;

  // sparkle burst at split
  const sparkN = 20;

  return (
    <>
      {/* ============ BACKDROP (paint it) ============ */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(120% 100% at 50% 30%, #2E2850 0%, #211B3E 55%, #17132C 100%)",
        }}
      />
      {/* subtle animated vignette bloom */}
      <div
        style={{
          position: "absolute",
          left: 506 - 620,
          top: 396 - 560,
          width: 1240,
          height: 1120,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(231,178,76,0.18) 0%, rgba(231,178,76,0.06) 40%, rgba(0,0,0,0) 70%)",
          opacity: 0.5 + 0.5 * bgPulse,
          filter: "blur(6px)",
          pointerEvents: "none",
        }}
      />

      {/* faint back-stage dotted grid for depth (background layer) */}
      {Array.from({ length: 30 }).map((_, i) => {
        const gx = 60 + (i % 10) * 96;
        const gy = 120 + Math.floor(i / 10) * 190;
        const tw = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(lf / 12 + i));
        return (
          <div
            key={"grid" + i}
            style={{
              position: "absolute",
              left: gx,
              top: gy,
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: "rgba(231,178,76,0.5)",
              opacity: 0.12 * tw,
              filter: "blur(0.5px)",
            }}
          />
        );
      })}

      {/* energy ring (expanding at split) */}
      <div
        style={{
          position: "absolute",
          left: CX - 220,
          top: CY - 220,
          width: 440,
          height: 440,
          borderRadius: "50%",
          border: "6px solid rgba(231,178,76,0.9)",
          boxShadow: "0 0 40px rgba(231,178,76,0.6), inset 0 0 30px rgba(231,178,76,0.4)",
          transform: "scale(" + ringScale + ")",
          opacity: ringOp,
          pointerEvents: "none",
        }}
      />
      {/* payoff shock ring */}
      <div
        style={{
          position: "absolute",
          left: CX - 220,
          top: CY - 220,
          width: 440,
          height: 440,
          borderRadius: "50%",
          border: "4px solid rgba(255,255,255,0.85)",
          transform: "scale(" + ring2Scale + ")",
          opacity: ring2Op,
          pointerEvents: "none",
        }}
      />

      {/* ============ SCENE TITLE ============ */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 46 + titleY,
          textAlign: "center",
          opacity: titleP,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            display: "inline-block",
            fontFamily: fraunces.fontFamily,
            fontWeight: 900,
            fontSize: 70,
            letterSpacing: 2,
            color: CREAM,
            textShadow:
              "0 4px 0 rgba(0,0,0,0.35), 0 0 30px rgba(231,178,76,0.5)",
          }}
        >
          MEET THE <span style={{ color: GOLD }}>CREW</span>
        </div>
        <div
          style={{
            marginTop: 6,
            fontFamily: inter.fontFamily,
            fontWeight: 700,
            fontSize: 20,
            letterSpacing: 5,
            color: "rgba(236,233,226,0.6)",
          }}
        >
          ONE SETUP · SIX HIRES
        </div>
      </div>

      {/* small "x1 → x6" counter chip that flips at split */}
      {(() => {
        const chipIn = over(lf, F_CHARGE - fr(0.1), fr(0.35), Easing.out(Easing.back(1.6)));
        const flipped = lf >= F_SPLIT;
        const pop = flipped ? over(lf, F_SPLIT, fr(0.3), Easing.out(Easing.back(2))) : 0;
        const s = 1 + 0.25 * pop;
        return (
          <div
            style={{
              position: "absolute",
              left: CX - 58,
              top: 214,
              width: 116,
              opacity: chipIn,
              transform: "scale(" + s + ")",
              transformOrigin: "center",
              display: "flex",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                padding: "6px 16px",
                borderRadius: 999,
                background: flipped ? GOLD : "rgba(255,255,255,0.12)",
                border: "2px solid rgba(231,178,76,0.8)",
                color: flipped ? INK : CREAM,
                fontFamily: mono,
                fontWeight: 800,
                fontSize: 26,
                letterSpacing: 1,
                boxShadow: flipped ? "0 0 22px rgba(231,178,76,0.7)" : "none",
              }}
            >
              {flipped ? "×6" : "×1"}
            </div>
          </div>
        );
      })()}

      {/* ============ SINGLE CENTER SPRITE (pre-split) ============ */}
      {orbOpacity > 0.01 && (
        <div
          style={{
            position: "absolute",
            left: CX - heroSize / 2,
            top: CY - heroSize / 2,
            width: heroSize,
            height: heroSize,
            transform:
              "scaleX(" + orbScale + ") scaleY(" + (orbIn * (1 - 0.35 * orbGone) * (2 - chargeSquash)) + ")",
            transformOrigin: "center bottom",
            opacity: orbOpacity,
          }}
        >
          {/* charge glow behind it */}
          <div
            style={{
              position: "absolute",
              inset: -30,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(231,178,76," + (0.5 * orbGlow) + ") 0%, rgba(231,178,76,0) 65%)",
              filter: "blur(4px)",
            }}
          />
          <Mascot lf={lf} size={heroSize} nodAmp={2} nodSpeed={5} />
        </div>
      )}

      {/* ghost peel trails at the split moment (midground energy) */}
      {lf >= F_SPLIT - fr(0.05) && lf < F_SETTLE + fr(0.2) &&
        Array.from({ length: peelCount }).map((_, i) => {
          const tx = CX + (i - 2.5) * spread + lineY.length; // toward slots
          const targetX = CX + (i - 2.5) * spread;
          const p = over(lf, F_SPLIT, fr(0.7), Easing.out(Easing.cubic));
          const gx = interpolate(p, [0, 1], [CX, targetX]);
          const gop = interpolate(p, [0, 0.4, 1], [0.5, 0.3, 0]);
          const gs = interpolate(p, [0, 1], [0.5, 0.9]);
          return (
            <div
              key={"ghost" + i}
              style={{
                position: "absolute",
                left: gx - (heroSize * gs) / 2,
                top: CY - (heroSize * gs) / 2 + lineY[i],
                width: heroSize * gs,
                height: heroSize * gs,
                opacity: gop,
                filter: "blur(3px)",
                mixBlendMode: "screen",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 24,
                  background:
                    "radial-gradient(circle at 50% 40%, " + crew[i].tag + "aa 0%, transparent 70%)",
                }}
              />
            </div>
          );
        })}

      {/* ============ SPARKLE BURST at split ============ */}
      {Array.from({ length: sparkN }).map((_, i) => {
        const ang = (i / sparkN) * Math.PI * 2;
        const p = over(lf, F_SPLIT, fr(0.55), Easing.out(Easing.cubic));
        const dist = interpolate(p, [0, 1], [10, 260 + seed(i) * 120]);
        const sx = CX + Math.cos(ang) * dist;
        const sy = CY + Math.sin(ang) * dist * 0.7;
        const sop = interpolate(p, [0, 0.3, 1], [0, 0.9, 0]);
        const ss = 4 + seed(i + 9) * 8;
        return (
          <div
            key={"spark" + i}
            style={{
              position: "absolute",
              left: sx - ss / 2,
              top: sy - ss / 2,
              width: ss,
              height: ss,
              borderRadius: "50%",
              background: i % 2 ? GOLD : CREAM,
              boxShadow: "0 0 10px " + (i % 2 ? "rgba(231,178,76,0.9)" : "rgba(236,233,226,0.9)"),
              opacity: sop,
              pointerEvents: "none",
            }}
          />
        );
      })}

      {/* ============ HERO LINEUP (the 6 crew) ============ */}
      {crew.map((c, i) => {
        // each hero flies from center to its slot
        const targetX = CX + (i - 2.5) * spread;
        const targetY = CY + lineY[i];

        // stagger the outward burst slightly per index (from center outward)
        const order = Math.abs(i - 2.5); // center-most first
        const startDelay = F_SPLIT + order * fr(0.05);
        const flyP = over(lf, startDelay, fr(0.7), Easing.out(Easing.back(1.4)));

        // position interp: center -> slot
        const hx = interpolate(flyP, [0, 1], [CX, targetX]);
        const hy = interpolate(flyP, [0, 1], [CY, targetY]);

        // entrance scale + a settle bob
        const appear = over(lf, startDelay, fr(0.4), Easing.out(Easing.cubic));
        const bob = Math.sin((lf - startDelay) / 6 + i) * 3 * appear;

        // idle desync after settle
        const settled = lf > F_SETTLE;

        // payoff: everyone cheers / hops together
        const payoffP = over(lf, F_PAYOFF, fr(0.5), Easing.out(Easing.back(1.6)));
        const cheerAmt = payoffP;
        const payoffHop = -14 * Math.sin(payoffP * Math.PI);

        if (appear <= 0.001) return null;

        // depth: center heroes slightly larger / in front
        const depthScale = 1 - order * 0.028;
        const z = 100 - Math.round(order * 10);

        return (
          <React.Fragment key={"hero" + i}>
            {/* spotlight cone behind each hero (background depth) */}
            <div
              style={{
                position: "absolute",
                left: hx - 90,
                top: hy - 40,
                width: 180,
                height: 260,
                background:
                  "radial-gradient(ellipse 50% 60% at 50% 20%, " + c.tag + "44 0%, transparent 70%)",
                opacity: appear * 0.9,
                filter: "blur(8px)",
                zIndex: z - 5,
                pointerEvents: "none",
              }}
            />

            {/* contact shadow ellipse */}
            <div
              style={{
                position: "absolute",
                left: hx - 66 * depthScale,
                top: hy + heroSize / 2 * depthScale - 10,
                width: 132 * depthScale,
                height: 30 * depthScale,
                borderRadius: "50%",
                background: "rgba(0,0,0,0.45)",
                filter: "blur(7px)",
                opacity: appear * 0.8,
                zIndex: z - 4,
              }}
            />

            {/* the mascot */}
            <div
              style={{
                position: "absolute",
                left: hx - (heroSize * depthScale) / 2,
                top:
                  hy - (heroSize * depthScale) / 2 +
                  bob +
                  (settled ? payoffHop : 0),
                width: heroSize * depthScale,
                height: heroSize * depthScale,
                transform: "scale(" + appear + ")",
                transformOrigin: "center bottom",
                zIndex: z,
                filter:
                  "drop-shadow(0 12px 18px rgba(10,8,24,0.55))",
              }}
            >
              {/* tinted rim glow to differentiate each copy */}
              <div
                style={{
                  position: "absolute",
                  inset: -6,
                  borderRadius: 30,
                  boxShadow: "0 0 26px " + c.tag + "88",
                  opacity: appear,
                }}
              />
              <CrewSprite
                lf={lf + i * 3}
                size={heroSize * depthScale}
                role={c.crole}
                nodAmp={settled ? 1.6 : 0}
                nodSpeed={4 + i * 0.3}
                cheer={settled ? cheerAmt : 0}
              />
            </div>

            {/* NAME TAG snaps in (staggered after settle) */}
            {(() => {
              const tagP = over(
                lf,
                F_TAGS + i * fr(0.07),
                fr(0.34),
                Easing.out(Easing.back(2.2))
              );
              if (tagP <= 0.001) return null;
              const tagY = interpolate(tagP, [0, 1], [26, 0]);
              const tagScale = interpolate(tagP, [0, 1], [0.4, 1]);
              return (
                <div
                  style={{
                    position: "absolute",
                    left: targetX - 78,
                    top: targetY + (heroSize * depthScale) / 2 + 4,
                    width: 156,
                    opacity: Math.min(1, tagP),
                    transform:
                      "translateY(" + tagY + "px) scale(" + tagScale + ")",
                    transformOrigin: "center top",
                    zIndex: 120,
                    pointerEvents: "none",
                  }}
                >
                  {/* connector notch */}
                  <div
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: -8,
                      width: 14,
                      height: 14,
                      marginLeft: -7,
                      background: c.tag,
                      transform: "rotate(45deg)",
                      borderRadius: 2,
                    }}
                  />
                  <div
                    style={{
                      background:
                        "linear-gradient(180deg," + c.tag + " 0%, " + c.tag + "cc 100%)",
                      borderRadius: 12,
                      padding: "8px 6px 9px",
                      textAlign: "center",
                      boxShadow:
                        "0 8px 18px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.35)",
                      border: "2px solid rgba(255,255,255,0.25)",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: fraunces.fontFamily,
                        fontWeight: 900,
                        fontSize: 30,
                        color: "#fff",
                        lineHeight: 1,
                        textShadow: "0 2px 3px rgba(0,0,0,0.4)",
                      }}
                    >
                      {c.name}
                    </div>
                    <div
                      style={{
                        marginTop: 3,
                        fontFamily: inter.fontFamily,
                        fontWeight: 800,
                        fontSize: 15,
                        letterSpacing: 1.5,
                        color: "rgba(255,255,255,0.92)",
                        textTransform: "uppercase",
                      }}
                    >
                      {c.role}
                    </div>
                  </div>
                </div>
              );
            })()}
          </React.Fragment>
        );
      })}

      {/* ============ CONFETTI (foreground, festive, escalates) ============ */}
      {Array.from({ length: confN }).map((_, i) => {
        // confetti starts falling right at split, continues; extra burst at payoff
        const burstStart = i < 24 ? F_SPLIT : F_PAYOFF;
        const life = over(lf, burstStart + seed(i) * fr(0.2), fr(2.2), Easing.linear);
        if (life <= 0.001) return null;
        const startX = i < 24 ? CX : CX + (seed(i + 3) - 0.5) * 900;
        const drift = (seed(i + 1) - 0.5) * 420;
        const cx = startX + drift * life;
        const cy = interpolate(life, [0, 1], [i < 24 ? CY : 40, 812]);
        const rot = (seed(i + 2) * 360 + lf * (5 + seed(i) * 8)) % 360;
        const w = 9 + seed(i + 4) * 9;
        const h = 5 + seed(i + 5) * 8;
        const palette = ["#E05C9E", "#2E7BB0", "#D9A441", "#3FAE82", "#2FA6C4", "#D0632E", GOLD, CREAM];
        const col = palette[i % palette.length];
        const cop = interpolate(life, [0, 0.1, 0.85, 1], [0, 1, 1, 0]);
        return (
          <div
            key={"conf" + i}
            style={{
              position: "absolute",
              left: cx,
              top: cy,
              width: w,
              height: h,
              background: col,
              opacity: cop,
              transform: "rotate(" + rot + "deg)",
              borderRadius: 2,
              boxShadow: "0 1px 2px rgba(0,0,0,0.25)",
              zIndex: 130,
              pointerEvents: "none",
            }}
          />
        );
      })}

      {/* ============ PAYOFF: cream banner ribbon under lineup ============ */}
      {(() => {
        const banP = over(lf, F_PAYOFF - fr(0.1), fr(0.5), Easing.out(Easing.back(1.5)));
        if (banP <= 0.001) return null;
        const banScale = interpolate(banP, [0, 1], [0.6, 1]);
        return (
          <div
            style={{
              position: "absolute",
              left: CX - 260,
              top: 690,
              width: 520,
              opacity: Math.min(1, banP),
              transform: "scale(" + banScale + ")",
              transformOrigin: "center",
              display: "flex",
              justifyContent: "center",
              zIndex: 140,
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                background: "linear-gradient(180deg,#F4F1E9,#E4DFD1)",
                borderRadius: 14,
                padding: "12px 30px",
                boxShadow: "0 12px 30px rgba(0,0,0,0.5), inset 0 1px 0 #fff",
                border: "2px solid rgba(231,178,76,0.6)",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  fontFamily: fraunces.fontFamily,
                  fontWeight: 900,
                  fontSize: 34,
                  color: INK,
                  letterSpacing: 1,
                }}
              >
                YOUR C-SUITE
              </div>
              <div
                style={{
                  fontFamily: mono,
                  fontWeight: 800,
                  fontSize: 30,
                  color: CLAY,
                }}
              >
                ×6
              </div>
            </div>
          </div>
        );
      })()}
    </>
  );
};

const Rehook: React.FC<{ lf: number }> = ({ lf }) => (
  <Panel label="meet the crew">
    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 40%, #2E2850, #17132C)" }} />
    <RehookScene lf={lf} />
    {(() => { const sw = ((lf / 30) % 2.0) / 2.0; return <div style={{ position: "absolute", left: -200 + sw * 1420, top: 0, bottom: 0, width: 150, background: "linear-gradient(90deg, transparent, rgba(255,240,200,0.09), transparent)", transform: "skewX(-14deg)", zIndex: 5, pointerEvents: "none" }} />; })()}
  </Panel>
);

const Outlast: React.FC<{ lf: number }> = ({ lf }) => {
  const inP = over(lf, fr(0.1), fr(0.4), Easing.out(Easing.back(1.2)));
  const meter = over(lf, fr(0.8), fr(4.4), Easing.linear);
  const roles = ["mia", "jack", "max", "ben", "kate", "leo"];
  const taskIcon = ["◨", "$", "◈", "⚓", "⚑", "🗝"];
  return (
    <Panel label="after jul 12">
      <div style={{ position: "absolute", left: 0, width: "50%", top: 0, bottom: 0, background: "linear-gradient(180deg,#3A2430,#221420)" }} />
      <div style={{ position: "absolute", right: 0, width: "50%", top: 0, bottom: 0, background: "radial-gradient(circle at 50% 42%,#2E5240,#152A1E)" }} />
      <div style={{ position: "absolute", left: "50%", top: 34, bottom: 26, width: 4, marginLeft: -2, background: "linear-gradient(180deg,#FBF3E4,#E7B24C)", zIndex: 30, borderRadius: 2, boxShadow: "0 0 14px rgba(231,178,76,0.7)" }} />
      {/* LEFT — everyone else, bleak + draining money */}
      <div style={{ position: "absolute", left: 0, width: "48%", top: 80, textAlign: "center", zIndex: 20, opacity: inP }}><div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 30, color: "#FFB4A6" }}>EVERYONE ELSE</div></div>
      <div style={{ position: "absolute", left: 130, top: 470, zIndex: 18, opacity: inP, padding: "4px 12px", borderRadius: 999, background: "rgba(196,74,58,0.28)", border: `2px solid ${RED}`, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 16, color: "#FFC4B8" }}>DUMB AI</div>
      <div style={{ position: "absolute", left: 150, top: 300, opacity: inP, filter: "grayscale(0.55) brightness(0.72)", zIndex: 14 }}><Mascot lf={lf} size={150} nodAmp={1} nodSpeed={12} shock={0.28} stern={0.5} /></div>
      {(() => { const bp = over(lf, fr(0.9), fr(0.34), Easing.out(Easing.back(2.2))); const bob = Math.sin(lf / 6) * 3; return bp > 0.02 ? (
        <div style={{ position: "absolute", left: 116, top: 222 + bob, zIndex: 24, transform: `scale(${bp}) rotate(-3deg)`, transformOrigin: "34% 100%" }}>
          <div style={{ position: "relative", padding: "10px 18px", borderRadius: 15, background: "#FFFDF8", border: `4px solid ${RED}`, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 27, color: INK, whiteSpace: "nowrap", boxShadow: NAVYSH }}>
            Why am I so expensive?!
            <div style={{ position: "absolute", left: 42, bottom: -17, width: 0, height: 0, borderLeft: "9px solid transparent", borderRight: "19px solid transparent", borderTop: `21px solid ${RED}` }} />
            <div style={{ position: "absolute", left: 46, bottom: -9, width: 0, height: 0, borderLeft: "6px solid transparent", borderRight: "13px solid transparent", borderTop: `13px solid #FFFDF8` }} />
          </div>
        </div>
      ) : null; })()}
      {Array.from({ length: 9 }, (_, i) => { const t = ((lf + i * 8) % 52) / 52; const x = 40 + (i % 4) * 96 + Math.sin(i) * 12; const y = 300 + t * 420; return <div key={"bl" + i} style={{ position: "absolute", left: x, top: y, width: 32, height: 19, borderRadius: 3, background: "linear-gradient(180deg,#7FA98C,#527A62)", border: "1.5px solid #3A5646", transform: `rotate(${i * 44 + lf * 3}deg)`, opacity: (1 - t) * 0.6, zIndex: 12, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 10, color: "#2E4A3A" }}>$</div>; })}
      <div style={{ position: "absolute", left: 70, top: 520, width: 300, height: 46, borderRadius: 12, background: "rgba(196,74,58,0.22)", border: `3px solid ${RED}`, zIndex: 16, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${meter * 100}%`, background: grad("#E8604A", "#BE3220") }} />
        <div style={{ position: "absolute", left: 12, top: 10, fontFamily: mono, fontWeight: 800, fontSize: 23, color: "#fff" }}>${Math.floor(meter * 480)}/mo ↑</div>
      </div>
      {/* RIGHT — YOU, the costumed crew all working for pennies */}
      <div style={{ position: "absolute", right: 0, width: "50%", top: 80, textAlign: "center", zIndex: 20, opacity: inP }}><div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 30, color: "#9BE8B8" }}>YOU</div></div>
      {Array.from({ length: 13 }, (_, i) => { const t = ((lf + i * 6) % 58) / 58; const x = 540 + (i % 7) * 66 + Math.sin(i * 2) * 8; const y = 740 - t * 700; return <div key={"co" + i} style={{ position: "absolute", left: x, top: y, width: 20, height: 20, borderRadius: "50%", background: "radial-gradient(circle at 40% 34%,#FCE9A6,#E7B24C 60%,#B98320)", border: "2px solid #C79A3A", zIndex: 12, opacity: 0.9 * (1 - t * 0.35), display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 11, color: "#8A5A1E" }}>$</div>; })}
      {roles.map((r, i) => { const col = i % 3, row = Math.floor(i / 3); const pop = over(lf, fr(0.5) + i * 3, 9, Easing.out(Easing.back(1.6))); const cc = SLOT[i].c; const x = 546 + col * 150; const y = 288 + row * 176; return (
        <div key={r} style={{ position: "absolute", left: x, top: y, transform: `scale(${pop})`, opacity: pop, zIndex: 16 }}>
          <div style={{ position: "relative", width: 130, height: 152, borderRadius: 14, background: "linear-gradient(180deg,#FBF3E4,#EFE3CC)", border: `4px solid ${cc}`, boxShadow: `0 10px 20px -8px rgba(10,16,34,0.5), 0 0 15px ${cc}55`, display: "flex", alignItems: "flex-end", justifyContent: "center", overflow: "hidden" }}>
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 24, background: cc, opacity: 0.9 }} />
            <div style={{ position: "absolute", right: 8, top: 7, width: 22, height: 22, borderRadius: 6, background: cc, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "#fff" }}>{taskIcon[i]}</div>
            <div style={{ position: "absolute", left: 8, top: 8, width: 18, height: 18, borderRadius: "50%", background: GREEN, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#fff" }}>✓</div>
            <div style={{ marginBottom: 14 }}><CrewSprite lf={lf + i * 5} size={92} role={r} cheer={0.42 + 0.5 * over(lf, fr(4.3), fr(0.6))} nodAmp={2} nodSpeed={5 + i * 0.4} /></div>
          </div>
        </div>
      ); })}
      {/* victory shockwave on the YOU side as the money contrast lands */}
      {(() => { const wp = over(lf, fr(4.5), fr(0.9), Easing.out(Easing.cubic)); return wp > 0.02 && wp < 1 ? <div style={{ position: "absolute", left: 760, top: 420, width: 60 + wp * 620, height: 60 + wp * 620, marginLeft: -(30 + wp * 310), marginTop: -(30 + wp * 310), borderRadius: "50%", border: `${7 * (1 - wp)}px solid #E7B24C`, boxShadow: `0 0 24px rgba(231,178,76,${(1 - wp) * 0.55})`, opacity: (1 - wp) * 0.85, zIndex: 21 }} /> : null; })()}
      {/* extra gold burst — coins spray up on the win beat */}
      {lf > fr(4.5) ? Array.from({ length: 10 }, (_, i) => { const t = ((lf - fr(4.5)) + i * 3) / 40; if (t > 1) return null; const a = -Math.PI / 2 + (i - 4.5) * 0.16; const d = t * 300; return <div key={"wb" + i} style={{ position: "absolute", left: 760 + Math.cos(a) * d, top: 430 + Math.sin(a) * d + t * t * 260, width: 20, height: 20, borderRadius: "50%", background: "radial-gradient(circle at 40% 34%,#FCE9A6,#E7B24C 60%,#B98320)", border: "2px solid #C79A3A", opacity: 1 - t, zIndex: 23, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 11, color: "#8A5A1E" }}>$</div>; }) : null}
      <div style={{ position: "absolute", left: 636, top: 648, zIndex: 22, opacity: inP, transform: `scale(${1 + 0.06 * over(lf, fr(4.5), fr(0.4)) * Math.abs(Math.sin(lf / 5))})` }}><Chip text="$0.30 / mo" bg="rgba(63,158,116,0.24)" bd={GREEN} fg="#9BE8B8" size={26} /></div>
    </Panel>
  );
};

// ============================ END CREW SCENES ============================

const CTA: React.FC<{ lf: number }> = ({ lf }) => {
  const inP = over(lf, 0.06, fr(0.22), Easing.out(Easing.back(1.4)));
  const kw = "CREW";
  const typed = Math.floor(over(lf, fr(0.2), fr(0.5)) * kw.length);
  const arrowBob = Math.abs(Math.sin(lf / 5)) * 14;
  const kwPulse = 1 + Math.sin(lf / 3.4) * 0.05;
  return (
    <AbsoluteFill style={{ opacity: Math.min(1, inP * 1.3) }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 372, textAlign: "center", transform: `scale(${inP})` }}>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 30, color: SLATE }}>the exact setup for all 6</span>
      </div>
      <div style={{ position: "absolute", left: 210, right: 210, top: 446, transform: `scale(${inP})`, transformOrigin: "50% 0%" }}>
        <div style={{ borderRadius: 22, background: PAPER, boxShadow: "0 30px 60px -20px rgba(10,16,34,0.5)", overflow: "hidden", border: "1px solid #E2D8C6" }}>
          <div style={{ height: 84, background: grad("#E9825C", "#C7541F"), display: "flex", alignItems: "center", padding: "0 26px", gap: 12 }}><ClaudeLogo lf={lf} size={34} /><div><div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 20, color: "rgba(255,255,255,0.85)" }}>THE CREW SETUP</div><div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 28, color: "#fff" }}>hire all 6 in one go</div></div></div>
          <div style={{ padding: "18px 28px", display: "flex", flexDirection: "column", gap: 11 }}>
            {["The 6 exec prompts", "One setup, plays all 6", "Runs on cheap models after"].map((t, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 25, color: INK }}><span style={{ width: 28, height: 28, borderRadius: 8, background: GREEN, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>✓</span>{t}</div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 800 + arrowBob, display: "flex", justifyContent: "center", opacity: inP }}><div style={{ width: 0, height: 0, borderLeft: "17px solid transparent", borderRight: "17px solid transparent", borderTop: `22px solid ${CLAY}` }} /></div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 858, textAlign: "center", transform: `scale(${inP})` }}>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 30, color: MUTE, marginBottom: 10 }}>comment</div>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 104, color: CLAY, letterSpacing: "-0.02em", lineHeight: 1, textShadow: `0 0 40px rgba(210,114,78,0.45)`, transform: `scale(${kwPulse})` }}>CREW</div>
        <div style={{ marginTop: 22, display: "inline-flex", alignItems: "center", gap: 14, padding: "15px 24px", borderRadius: 999, background: "#fff", border: "2px solid #E2D8C6", boxShadow: "0 16px 34px -16px rgba(10,16,34,0.35)" }}>
          <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 30, color: INK }}>{kw.slice(0, typed)}<span style={{ opacity: lf % 16 < 8 ? 1 : 0.2, color: CLAY }}>|</span></span>
          <span style={{ width: 44, height: 44, borderRadius: "50%", background: grad("#E9825C", "#C7541F"), display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ width: 0, height: 0, borderTop: "9px solid transparent", borderBottom: "9px solid transparent", borderLeft: "14px solid #fff", marginLeft: 3 }} /></span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
const ClockCTA: React.FC<{ lf: number }> = ({ lf }) => (<>
  <CTA lf={lf} />
  {lf >= 0 ? <SnackLane lf={Math.min(lf, fr(8) - 1)} /> : null}
</>);

// ---------------- SNACK LANE: 5s countdown at the BOTTOM, below the captions (non-interrupting) ----------------
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
  const VIRT = 56;
  const p = Math.min(1, t / VIRT);
  const marks = [9.0, 24.0, 40.0];
  const STARS = [4.0, 16.0, 31.0, 46.0];
  const TOTAL = VIRT;
  const PELLETS = [2, 6.5, 12, 19, 27, 34, 42, 48];
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

export const ClaudeCrewReel: React.FC = () => {
  const frame = useCurrentFrame();
  let punch = 0;
  for (const b of Lf.slice(1)) { const d = frame - b; if (d >= 0 && d < 9) punch = Math.max(punch, Math.pow(1 - d / 9, 2)); }
  const KICKS = [1.0, 2.2, 2.8, L[1] + 1.6, L[1] + 2.8, L[2] + 1.2, L[3] + 0.5, L[3] + 2.2, L[4] + 0.2, L[5] + 1.9, L[5] + 5.9, L[5] + 9.4, L[6] + 1.4, L[7] + 2.0, L[8] + 0.3, CLOCK_START + 1, CLOCK_START + 2, CLOCK_START + 3];
  for (const k of KICKS) { const d = frame - fr(k); if (d >= 0 && d < 7) punch = Math.max(punch, Math.pow(1 - d / 7, 2) * 0.7); }
  const zoom = interpolate(frame, [0, 16, 28], [1.0, 1.02, 1.0], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) }) + punch * 0.028;
  const scene = (i: number) => frame >= Lf[i] && (i === Lf.length - 1 || frame < Lf[i + 1]);
  return (
    <AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
      <Audio src={staticFile("vo_crew.wav")} />
      <Audio loop src={staticFile("seo_music.wav")} volume={(ff) => interpolate(ff, [0, fr(1.4), fr(L[8]) - 8, fr(L[8]) + 14, 99999], [0, 0.11, 0.11, 0.08, 0.08], { extrapolateRight: "clamp" })} />
      <Sfx at={0} src="metal_riser.wav" v={0.5} dur={3.1} />
      <Sfx at={2.95} src="crash.wav" v={0.55} /><Sfx at={2.97} src="boom.wav" v={0.45} /><Sfx at={3.0} src="sparkle.wav" v={0.4} dur={1.2} /><Sfx at={3.05} src="angelic.wav" v={0.4} dur={1.5} />
      {[4.05, 4.45, 4.85, 5.2, 5.55].map((t, i) => <Sfx key={`fl${i}`} at={t} src={i % 2 ? "fling.wav" : "whoosh.wav"} v={0.3} />)}<Sfx at={5.0} src="riser.wav" v={0.5} dur={1.9} /><Sfx at={6.7} src="pop.wav" v={0.34} dur={0.5} />
      {[L[2], L[3], L[4], L[5], L[6], L[7]].map((tt, i) => <React.Fragment key={`slam${i}`}><Sfx at={tt - 0.1} src="swooshdn.wav" v={0.48} /><Sfx at={tt + 0.02} src="boom.wav" v={0.4} /><Sfx at={tt + 0.05} src="pop.wav" v={0.3} dur={0.5} /></React.Fragment>)}
      {L.slice(1).map((tt, i) => <Sfx key={`sw${i}`} at={tt - 0.06} src="swish.wav" v={0.3} />)}
      <Sfx at={L[8] - 0.06} src="swooshup.wav" v={0.4} />
      {/* ===== themed per-scene SFX layer (retention) ===== */}
      {/* Mia (2) — Iron Man / Avengers */}
      <Sfx at={L[2] + 0.4} src="shimmer.wav" v={0.34} dur={0.8} /><Sfx at={L[2] + 0.55} src="twang.wav" v={0.3} />
      <Sfx at={L[2] + 2.15} src="impact.wav" v={0.42} /><Sfx at={L[2] + 2.5} src="impact.wav" v={0.34} /><Sfx at={L[2] + 3.6} src="shimmer.wav" v={0.34} dur={0.9} />
      {/* Jack (3) — Wolf of Wall Street */}
      <Sfx at={L[3] + 0.3} src="crowd_cheers2.wav" v={0.3} dur={1.8} />{[0.9, 1.7, 2.5, 3.2].map((d, i) => <Sfx key={`jc${i}`} at={L[3] + d} src="ding.wav" v={0.3} />)}<Sfx at={L[3] + 3.5} src="crowd_cheer.wav" v={0.3} dur={1.0} />
      {/* Max (4) — Ocean's Eleven vault */}
      {[0.8, 1.3, 1.8, 2.3].map((d, i) => <Sfx key={`mv${i}`} at={L[4] + d} src="thock.wav" v={0.3} />)}
      <Sfx at={L[4] + 2.9} src="boom.wav" v={0.4} /><Sfx at={L[4] + 3.05} src="chimehi.wav" v={0.36} dur={1.0} /><Sfx at={L[4] + 3.2} src="ding.wav" v={0.34} />
      {/* Ben (5) — pirate ship */}
      <Sfx at={L[5] + 0.4} src="ding.wav" v={0.3} /><Sfx at={L[5] + 1.5} src="whoosh.wav" v={0.28} /><Sfx at={L[5] + 2.3} src="boom.wav" v={0.34} /><Sfx at={L[5] + 3.1} src="crowd_cheer.wav" v={0.26} dur={1.0} />
      {/* Kate (6) — Greek army */}
      <Sfx at={L[6] + 0.5} src="crowd_run.wav" v={0.3} dur={1.4} /><Sfx at={L[6] + 1.9} src="impact.wav" v={0.34} /><Sfx at={L[6] + 2.5} src="crowd_cheer.wav" v={0.34} dur={1.2} /><Sfx at={L[6] + 3.7} src="boom.wav" v={0.3} />
      {/* Leo (7) — Mission Impossible */}
      {[0.6, 1.3, 2.0, 2.7].map((d, i) => <Sfx key={`lz${i}`} at={L[7] + d} src={`blip${(i % 5) + 1}.wav`} v={0.24} dur={0.35} />)}
      <Sfx at={L[7] + 3.3} src="alarm.wav" v={0.3} dur={0.8} /><Sfx at={L[7] + 3.7} src="thock.wav" v={0.4} /><Sfx at={L[7] + 4.5} src="swooshup.wav" v={0.34} />
      {/* Outlast (8) */}
      <Sfx at={L[8] + 0.5} src="chimelo.wav" v={0.3} dur={0.9} />{[1.2, 2.0, 2.8, 3.6, 4.4, 5.2].map((d, i) => <Sfx key={`oc${i}`} at={L[8] + d} src="ding.wav" v={0.24} />)}<Sfx at={L[8] + 5.4} src="shimmer.wav" v={0.3} dur={1.0} />
      {[4.0, 9.0, 16.0, 24.0, 31.0, 40.0, 46.0].map((tt, i) => <Sfx key={`mk${i}`} at={tt + 0.05} src="chimehi.wav" v={0.3} dur={0.7} />)}
      {[2, 6.5, 12, 19, 27, 34, 42, 48].map((tt, i) => <Sfx key={`pt${i}`} at={tt} src="tick.wav" v={0.14} dur={0.3} />)}
      <Sfx at={L[9]} src="resolve.wav" v={0.5} />
      {[0, 1, 2, 3, 4].map((n) => <React.Fragment key={`cl${n}`}><Sfx at={CLOCK_START + n + 0.86} src={`blip${n + 1}.wav`} v={0.34} dur={0.4} /><Sfx at={CLOCK_START + n} src="tick.wav" v={0.22} dur={0.3} /></React.Fragment>)}

      <Bg />
      <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "50% 46%" }}>
        {scene(0) ? <Hook lf={frame - Lf[0]} /> : null}
        {scene(1) ? <Rehook lf={frame - Lf[1]} /> : null}
        {scene(2) ? <Mia lf={frame - Lf[2]} /> : null}
        {scene(3) ? <Jack lf={frame - Lf[3]} /> : null}
        {scene(4) ? <Max lf={frame - Lf[4]} /> : null}
        {scene(5) ? <Ben lf={frame - Lf[5]} /> : null}
        {scene(6) ? <Kate lf={frame - Lf[6]} /> : null}
        {scene(7) ? <Leo lf={frame - Lf[7]} /> : null}
        {scene(8) ? <Outlast lf={frame - Lf[8]} /> : null}
        {scene(9) ? <ClockCTA lf={frame - Lf[9]} /> : null}
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
