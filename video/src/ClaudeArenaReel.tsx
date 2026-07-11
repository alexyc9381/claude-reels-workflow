import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing, Audio, Sequence, staticFile, Img } from "remotion";
import { fraunces, inter } from "./fonts";
import words from "./data/words_arena.json";

const CREAM = "#ECE9E2", INK = "#1A1813", SLATE = "#3A5C84", CLAY = "#D2724E", AMBER = "#CF9544", GOLD = "#E7B24C", GREEN = "#3F9E74", MUTE = "#9A968B", RED = "#C44A3A";
const TERM = "#0E1626", TERM2 = "#0A1120", PAPER = "#F7F3EA", META = "#0866FF", METALO = "#0A5AE0";
const mono = "ui-monospace,'SF Mono',Menlo,monospace";
const FPS = 30;
const fr = (s: number) => Math.round(s * FPS);
const grad = (a: string, b: string) => `linear-gradient(158deg, ${a} 0%, ${b} 100%)`;
const NAVYSH = "0 34px 66px -22px rgba(18,28,58,0.55), 0 10px 24px rgba(18,28,58,0.30)";

// scene starts (sec): hook, reframe(judge), arena(tournament), outlast(machine), cta
const L = [0.0, 3.70, 13.46, 26.50, 37.06];
const Lf = L.map(fr);
const CUT = 38.85;
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

// ============================ ARENA SCENES (sprite, tournament) ============================

const HookBody: React.FC<{ lf: number }> = ({ lf }) => (
<>
      {(() => {
        // ===== TIMELINE (frames @30fps, total 109) =====
        // 0..22   dark tension: judge on podium, torches low, spotlight narrows
        // 22..30  GAVEL RAISE
        // 30      SLAM: flash + shockwave + screen-shake
        // 30..48  arena ERUPTS: floodlights, banners drop, torches flare
        // 34..70  20 cards crash into lower arc + bracket line ignites between them
        // 40..58  trophy/belt drops on chain from top, gleams
        // 52..78  two hero cards rise + CLASH with VS spark
        // 46..109 embers/confetti rain, continuous push-in
        // 84..109 "20 ENTER · 1 LEAVES" ribbon stamps + settle
        const T = lf;

        // global camera push-in (whole scene scales up a few %)
        const camScale = interpolate(T,[0,30,109],[1.0,1.02,1.075],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
        // slam screen-shake
        const slam = over(T,30,10,Easing.out(Easing.cubic));
        const shakeAmp = interpolate(T,[30,33,44],[16,10,0],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
        const shakeX = Math.sin(T*3.1)*shakeAmp*(1-slam*0.2);
        const shakeY = Math.cos(T*2.6)*shakeAmp*0.7;
        // white flash on slam
        const flash = interpolate(T,[30,31,38],[0,0.9,0],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
        // arena eruption brightness
        const erupt = over(T,30,18,Easing.out(Easing.cubic));

        const cx = 506;

        return (
          <AbsoluteFill style={{overflow:"hidden"}}>
            {/* ============ WORLD (camera group) ============ */}
            <div style={{position:"absolute",left:0,top:0,width:1012,height:792,
              transform:`translate(${shakeX}px,${shakeY}px) scale(${camScale})`,transformOrigin:"506px 480px"}}>

              {/* navy night sky */}
              <div style={{position:"absolute",left:0,top:0,width:1012,height:792,
                background:`radial-gradient(120% 90% at 50% 8%, #14243F 0%, #0D1626 55%, #080D18 100%)`}}/>
              {/* moon */}
              <div style={{position:"absolute",left:770,top:60,width:96,height:96,borderRadius:"50%",
                background:`radial-gradient(circle at 38% 34%, #F7F3EA, #CBB98E 70%, #9C875A)`,
                boxShadow:`0 0 60px 12px rgba(231,178,76,${0.18+erupt*0.14})`}}/>
              {/* stars */}
              {[...Array(20)].map((_,i)=>(
                <div key={"st"+i} style={{position:"absolute",left:40+seed(i*7+1)*920,top:20+seed(i*3+5)*160,
                  width:2+seed(i)*2,height:2+seed(i)*2,borderRadius:"50%",background:"#F7F3EA",
                  opacity:0.3+0.5*Math.abs(Math.sin(T*0.08+i))}}/>
              ))}

              {/* colosseum tiered stone wall (back arc) */}
              <div style={{position:"absolute",left:-40,top:150,width:1092,height:360,
                borderRadius:"50% 50% 0 0 / 70% 70% 0 0",
                background:`linear-gradient(180deg, #2B2A28 0%, #201F1D 60%, #191816 100%)`,
                boxShadow:"inset 0 18px 40px rgba(0,0,0,0.5)"}}/>
              {/* arch arcade (crowd tier) */}
              {[...Array(9)].map((_,i)=>{
                const ax=70+i*106;
                const lit=erupt*(0.4+0.6*seed(i*5+2));
                return (
                  <div key={"arch"+i} style={{position:"absolute",left:ax,top:214,width:78,height:92,
                    borderRadius:"40px 40px 8px 8px",
                    background:`linear-gradient(180deg, #14202E, #0C1420)`,
                    boxShadow:`inset 0 0 18px rgba(0,0,0,0.7), 0 0 ${10+lit*22}px rgba(231,178,76,${0.10+lit*0.35})`,
                    border:"3px solid #26251F"}}>
                    {/* crowd silhouettes doing a wave */}
                    {[...Array(4)].map((_,j)=>{
                      const wave=Math.sin(T*0.22 - i*0.5 + j*0.4);
                      const up=erupt*Math.max(0,wave)*8;
                      return <div key={j} style={{position:"absolute",left:8+j*16,bottom:14-up,width:12,height:20,
                        borderRadius:"6px 6px 0 0",background:"#070B12",opacity:0.85}}/>;
                    })}
                  </div>
                );
              })}

              {/* gold banners dropping in on eruption */}
              {[...Array(6)].map((_,i)=>{
                const bx=90+i*158;
                const drop=over(T,32+i*2,14,Easing.out(Easing.back(1.4)));
                const sway=Math.sin(T*0.12+i)*4;
                return (
                  <div key={"ban"+i} style={{position:"absolute",left:bx+sway,top:172,width:52,height:60+drop*118,
                    transformOrigin:"top center",transform:`scaleY(${0.15+drop*0.85})`,
                    background:`linear-gradient(180deg, #E7B24C, #CF9544 70%, #A9752F)`,
                    clipPath:"polygon(0 0,100% 0,100% 82%,50% 100%,0 82%)",
                    boxShadow:"0 6px 14px rgba(0,0,0,0.45)",opacity:0.2+drop*0.8}}>
                    <div style={{position:"absolute",left:"50%",top:22,transform:"translateX(-50%)",
                      width:22,height:22,borderRadius:"50%",border:"3px solid #7A5217",opacity:drop}}/>
                  </div>
                );
              })}

              {/* side torches with flaring flames */}
              {[[54,340],[912,340],[26,470],[940,470]].map((p,i)=>{
                const fl=0.5+0.5*Math.abs(Math.sin(T*0.5+i*1.3));
                const flare=0.4+erupt*0.9;
                return (
                  <div key={"tor"+i} style={{position:"absolute",left:p[0],top:p[1]}}>
                    <div style={{position:"absolute",left:2,top:34,width:14,height:60,borderRadius:6,
                      background:"linear-gradient(#4A4136,#2A251E)"}}/>
                    <div style={{position:"absolute",left:-10,top:-6,width:34,height:52,borderRadius:"50% 50% 45% 45%",
                      background:`radial-gradient(circle at 50% 70%, #FFE39A, #CF9544 55%, #C44A3A 90%)`,
                      transform:`scaleY(${1+fl*0.25}) translateY(${-fl*4}px)`,
                      filter:`blur(0.5px)`,
                      boxShadow:`0 0 ${26*flare}px ${8*flare}px rgba(207,149,68,${0.35*flare})`,opacity:0.85+fl*0.15}}/>
                  </div>
                );
              })}

              {/* warm sand floor with light pool */}
              <div style={{position:"absolute",left:0,top:470,width:1012,height:322,
                background:`radial-gradient(80% 120% at 50% 30%, #C9A46A 0%, #9C7C4C 45%, #5E4B2E 100%)`}}/>
              {/* elliptical arena ring on sand */}
              <div style={{position:"absolute",left:126,top:520,width:760,height:250,borderRadius:"50%",
                border:"6px solid rgba(231,178,76,0.28)",boxShadow:"inset 0 0 60px rgba(0,0,0,0.35)"}}/>

              {/* floodlight beams sweeping after eruption */}
              {[...Array(4)].map((_,i)=>{
                const sweep=Math.sin(T*0.16+i*1.6);
                return (
                  <div key={"beam"+i} style={{position:"absolute",left:120+i*230,top:180,
                    width:120,height:520,transformOrigin:"top center",
                    transform:`rotate(${sweep*10-5}deg)`,
                    background:`linear-gradient(180deg, rgba(231,178,76,${0.12*erupt}) 0%, rgba(231,178,76,0) 78%)`,
                    filter:"blur(6px)",opacity:erupt}}/>
                );
              })}

              {/* ====== SPOTLIGHT on judge (narrows in tension, blooms on slam) ====== */}
              <div style={{position:"absolute",left:cx-160,top:300,width:320,height:260,
                background:`radial-gradient(circle at 50% 40%, rgba(247,243,234,${interpolate(T,[0,20,30,40],[0.10,0.18,0.42,0.22],{extrapolateLeft:"clamp",extrapolateRight:"clamp"})}) 0%, rgba(247,243,234,0) 70%)`,
                transform:`scale(${interpolate(T,[0,22,30],[1.25,0.9,1.4],{extrapolateLeft:"clamp",extrapolateRight:"clamp"})})`}}/>

              {/* ====== RAISED PODIUM (back-center) ====== */}
              <div style={{position:"absolute",left:cx-118,top:452,width:236,height:120,
                background:`linear-gradient(180deg, #3A382F 0%, #26241E 100%)`,
                borderRadius:"14px 14px 6px 6px",
                boxShadow:"0 14px 26px rgba(0,0,0,0.5), inset 0 3px 0 rgba(231,178,76,0.25)"}}>
                <div style={{position:"absolute",left:20,top:22,right:20,height:0,borderTop:"3px solid rgba(231,178,76,0.35)"}}/>
                <div style={{position:"absolute",left:0,right:0,top:44,textAlign:"center",
                  fontFamily:mono,fontSize:15,letterSpacing:3,color:"#E7B24C",opacity:0.7}}>JUDGE</div>
              </div>

              {/* ====== JUDGE MASCOT (fully visible, y330..470) ====== */}
              <div style={{position:"absolute",left:cx-92,top:322,width:184,height:184,zIndex:6,
                transform:`translateY(${-slam*6}px)`}}>
                <Mascot lf={T} size={184} judge stern
                  gaze={interpolate(T,[0,20,30],[0.2,0,-0.05],{extrapolateLeft:"clamp",extrapolateRight:"clamp"})}
                  nodAmp={T>30?4:1} nodSpeed={T>30?0.5:0.16}/>
              </div>

              {/* ====== GAVEL (raises 22..30, SLAMS at 30) ====== */}
              {(() => {
                const raise=interpolate(T,[18,29],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
                const strike=interpolate(T,[29,30.5],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
                const ang = -18*raise + 44*strike; // up then down
                return (
                  <div style={{position:"absolute",left:cx+70,top:430,width:120,height:120,zIndex:7,
                    transformOrigin:"18px 96px",transform:`rotate(${ang}deg)`}}>
                    <div style={{position:"absolute",left:8,top:80,width:80,height:14,borderRadius:8,
                      background:"linear-gradient(#8A5A22,#5C3A14)"}}/>
                    <div style={{position:"absolute",left:56,top:52,width:56,height:44,borderRadius:12,
                      background:"linear-gradient(180deg,#C98B3A,#8A5A22)",
                      boxShadow:"0 4px 8px rgba(0,0,0,0.4), inset 0 3px 0 rgba(255,255,255,0.25)"}}/>
                  </div>
                );
              })()}
              {/* strike block */}
              <div style={{position:"absolute",left:cx+150,top:522,width:70,height:26,borderRadius:8,zIndex:5,
                background:"linear-gradient(#8A5A22,#5C3A14)",boxShadow:"0 6px 10px rgba(0,0,0,0.4)"}}/>

              {/* ====== SHOCKWAVE ring from slam ====== */}
              {T>=30 && (
                <div style={{position:"absolute",left:cx+185,top:535,zIndex:8,
                  width:20,height:20,borderRadius:"50%",transform:`translate(-50%,-50%) scale(${1+slam*22})`,
                  border:`${6*(1-slam)+1}px solid rgba(255,54,35,${0.7*(1-slam)})`,opacity:1-slam*0.6}}/>
              )}

              {/* ====== CHAMPION TROPHY drops on chain from top ====== */}
              {(() => {
                const dropStart=40;
                const dp=over(T,dropStart,16,Easing.out(Easing.back(1.2)));
                const bob=Math.sin(T*0.24)*4*dp;
                const gleam=0.5+0.5*Math.sin(T*0.5);
                const ty = interpolate(dp,[0,1],[-160,300],{extrapolateLeft:"clamp",extrapolateRight:"clamp"})+bob;
                return (
                  <div style={{position:"absolute",left:cx-42,top:ty,width:84,zIndex:9,opacity:dp>0?1:0}}>
                    {/* chain */}
                    <div style={{position:"absolute",left:39,top:-320-ty+ty,width:6,height:Math.max(0,ty+40),
                      left:39,top:-(ty+40),background:"repeating-linear-gradient(#B98A3A 0 6px,#7A5217 6px 12px)",opacity:0.8}}/>
                    {/* cup */}
                    <div style={{position:"absolute",left:8,top:8,width:68,height:52,
                      borderRadius:"14px 14px 34px 34px",
                      background:`linear-gradient(180deg,#F2D488,#E7B24C 45%,#A9752F)`,
                      boxShadow:`0 0 ${18+gleam*20}px rgba(231,178,76,0.6), inset 0 4px 0 rgba(255,255,255,0.5)`}}/>
                    {/* handles */}
                    <div style={{position:"absolute",left:-4,top:16,width:20,height:30,borderRadius:"50%",
                      border:"6px solid #CF9544",borderRight:"none"}}/>
                    <div style={{position:"absolute",left:68,top:16,width:20,height:30,borderRadius:"50%",
                      border:"6px solid #CF9544",borderLeft:"none"}}/>
                    {/* stem + base */}
                    <div style={{position:"absolute",left:36,top:56,width:12,height:16,background:"#A9752F"}}/>
                    <div style={{position:"absolute",left:22,top:70,width:40,height:12,borderRadius:4,
                      background:"linear-gradient(#CF9544,#8A5A22)"}}/>
                    {/* gleam streak */}
                    <div style={{position:"absolute",left:24,top:14,width:10,height:34,borderRadius:6,
                      background:"rgba(255,255,255,0.75)",transform:`translateX(${gleam*8}px) rotate(12deg)`,
                      filter:"blur(1px)",opacity:0.6+gleam*0.4}}/>
                  </div>
                );
              })()}

              {/* ====== 20 CONTENDER CARDS crash into lower arc (y560..770) ====== */}
              {[...Array(20)].map((_,i)=>{
                const start=34+i*1.1;
                const land=over(T,start,10,Easing.out(Easing.cubic));
                // arc positions
                const ang = Math.PI*(0.08 + (i/19)*0.84); // spread across
                const rx=340, ry=118;
                const px = cx + Math.cos(ang)*rx - 33;
                const py = 665 + Math.sin(ang)*ry - 44 - 90; // lower arc band
                const fromY = py-320;
                const y = interpolate(land,[0,1],[fromY,py],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
                const impact = interpolate(land,[0.75,0.9,1],[0,-8,0],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
                const rot = interpolate(land,[0,1],[seed(i)*40-20,0],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
                return (
                  <div key={"card"+i} style={{position:"absolute",left:px,top:y+impact,width:66,height:88,zIndex:4,
                    transform:`rotate(${rot}deg)`,opacity:land>0?1:0}}>
                    <div style={{width:66,height:88,borderRadius:8,
                      background:"#F7F3EA",border:"3px solid #E7B24C",
                      boxShadow:"0 8px 14px rgba(0,0,0,0.45)"}}>
                      <div style={{height:20,background:"#D2724E",borderRadius:"5px 5px 0 0"}}/>
                      {[0,1,2].map(l=>(
                        <div key={l} style={{margin:"7px 8px 0",height:5,borderRadius:3,
                          background:"rgba(26,24,19,0.18)",filter:"blur(1.2px)",width:`${70-l*14}%`}}/>
                      ))}
                    </div>
                    {/* landing dust */}
                    {land>0.7 && land<1 && (
                      <div style={{position:"absolute",left:0,bottom:-6,width:66,height:10,borderRadius:"50%",
                        background:"rgba(201,164,106,0.55)",filter:"blur(3px)",
                        transform:`scaleX(${1+ (land-0.7)*3})`,opacity:1-(land-0.7)*3}}/>
                    )}
                  </div>
                );
              })}

              {/* ====== BRACKET LINE ignites snaking between cards ====== */}
              <svg viewBox="0 0 1012 792" style={{position:"absolute",left:0,top:0,width:1012,height:792,zIndex:5,pointerEvents:"none"}}>
                {(() => {
                  const pts=[];
                  for(let i=0;i<20;i++){
                    const ang=Math.PI*(0.08+(i/19)*0.84);
                    pts.push([cx+Math.cos(ang)*340, 665+Math.sin(ang)*118 - 90 + 44]);
                  }
                  const d="M "+pts.map(p=>p[0].toFixed(0)+" "+p[1].toFixed(0)).join(" L ");
                  const ig=over(T,58,26,Easing.inOut(Easing.cubic));
                  return (
                    <>
                      <path d={d} fill="none" stroke="rgba(231,178,76,0.25)" strokeWidth="3"
                        strokeDasharray="1400" strokeDashoffset={1400*(1-Math.min(1,ig*1.05))}/>
                      <path d={d} fill="none" stroke="#FFE39A" strokeWidth="4"
                        strokeDasharray="1400" strokeDashoffset={1400*(1-ig)}
                        style={{filter:"drop-shadow(0 0 8px rgba(231,178,76,0.9))"}}/>
                    </>
                  );
                })()}
              </svg>

              {/* ====== TWO HERO CARDS rise and CLASH with VS spark ====== */}
              {(() => {
                const rise=over(T,52,14,Easing.out(Easing.cubic));
                const clash=interpolate(T,[66,72,80],[0,1,0.7],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
                const gapClose=interpolate(clash,[0,1],[70,14],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
                const spark=interpolate(T,[70,73,84],[0,1,0],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
                const y=interpolate(rise,[0,1],[560,470],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
                const shakeC=Math.sin(T*2.2)*clash*3;
                const HeroCard=({side})=>(
                  <div style={{position:"absolute",top:y+shakeC,
                    left: side<0 ? cx-90-gapClose : cx+24+gapClose,
                    width:86,height:112,zIndex:8,opacity:rise>0?1:0,
                    transform:`rotate(${side*(6-clash*4)}deg)`}}>
                    <div style={{width:86,height:112,borderRadius:10,background:"#F7F3EA",
                      border:"4px solid #E7B24C",
                      boxShadow:`0 10px 20px rgba(0,0,0,0.5), 0 0 ${14*clash}px rgba(255,54,35,${clash*0.6})`}}>
                      <div style={{height:26,background:side<0?"#3A5C84":"#C44A3A",borderRadius:"6px 6px 0 0"}}/>
                      {[0,1,2].map(l=>(
                        <div key={l} style={{margin:"9px 10px 0",height:6,borderRadius:3,
                          background:"rgba(26,24,19,0.2)",filter:"blur(1.4px)",width:`${72-l*16}%`}}/>
                      ))}
                    </div>
                  </div>
                );
                return (
                  <>
                    <HeroCard side={-1}/>
                    <HeroCard side={1}/>
                    {/* clash spark burst at center between the two (no text overlap on cards) */}
                    {spark>0 && (
                      <div style={{position:"absolute",left:cx,top:y+44,zIndex:9,transform:"translate(-50%,-50%)"}}>
                        <div style={{position:"absolute",left:-40,top:-40,width:80,height:80,borderRadius:"50%",
                          background:"radial-gradient(circle, rgba(255,227,154,0.95), rgba(255,54,35,0) 70%)",
                          transform:`scale(${0.4+spark})`,opacity:spark}}/>
                        {[...Array(10)].map((_,i)=>{
                          const a=(i/10)*Math.PI*2;
                          const len=10+spark*38;
                          return <div key={i} style={{position:"absolute",left:0,top:0,width:4,height:len,
                            background:"linear-gradient(#FFE39A,#C44A3A)",borderRadius:2,
                            transformOrigin:"top center",transform:`rotate(${a}rad) translateY(-2px)`,opacity:spark}}/>;
                        })}
                      </div>
                    )}
                    {/* VS badge appears above the spark, clear gap from cards */}
                    {clash>0.1 && (
                      <div style={{position:"absolute",left:cx,top:y-46,zIndex:10,transform:`translate(-50%,0) scale(${0.6+clash*0.55})`,
                        fontFamily:fraunces.fontFamily,fontWeight:900,fontSize:38,color:"#FFE39A",
                        WebkitTextStroke:"2px #C44A3A",textShadow:"0 4px 10px rgba(0,0,0,0.5)",
                        opacity:clash}}>VS</div>
                    )}
                  </>
                );
              })()}

              {/* ====== PYRO EMBER JETS on sides ====== */}
              {[cx-360,cx+360].map((jx,s)=>{
                const jet=over(T,30,10,Easing.out(Easing.cubic));
                return (
                  <div key={"jet"+s} style={{position:"absolute",left:jx,top:560,zIndex:7}}>
                    {[...Array(9)].map((_,i)=>{
                      const life=((T-30-i*2)%40)/40;
                      if(T<30||life<0) return null;
                      const yy=-life*220;
                      const xx=(seed(i+s*5)-0.5)*40*life;
                      return <div key={i} style={{position:"absolute",left:xx,top:yy,
                        width:6-life*4,height:6-life*4,borderRadius:"50%",
                        background:i%2?"#E7B24C":"#C44A3A",
                        boxShadow:"0 0 8px rgba(231,178,76,0.7)",opacity:(1-life)*jet}}/>;
                    })}
                  </div>
                );
              })}

              {/* ====== CONFETTI + EMBERS rain ====== */}
              {[...Array(34)].map((_,i)=>{
                const st=46+seed(i*3)*20;
                if(T<st) return null;
                const t=(T-st);
                const fx=40+seed(i*7+1)*920;
                const fy=200 + ((t*(3+seed(i)*3)) % 620);
                const sway=Math.sin(t*0.15+i)*14;
                const cols=["#E7B24C","#C44A3A","#3F9E74","#F7F3EA","#CF9544"];
                return <div key={"cf"+i} style={{position:"absolute",left:fx+sway,top:fy,zIndex:9,
                  width:6,height:10,borderRadius:2,background:cols[i%5],
                  transform:`rotate(${t*12+i*30}deg)`,opacity:0.85}}/>;
              })}

            </div>{/* end camera group */}

            {/* ====== SLAM WHITE FLASH (screen-space, above world) ====== */}
            <div style={{position:"absolute",left:0,top:0,width:1012,height:792,zIndex:20,
              background:"#FFF7E6",opacity:flash,pointerEvents:"none",mixBlendMode:"screen"}}/>

            {/* ====== "20 ENTER · 1 LEAVES" RIBBON stamps in (y740, below action) ====== */}
            {(() => {
              const stamp=interpolate(T,[84,90],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
              const settle=interpolate(T,[84,88,92],[0,-1,0],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
              const sc=interpolate(T,[84,90,94],[1.6,0.96,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
              const glint=(T*0.06)%1;
              return (
                <div style={{position:"absolute",left:cx,top:742+settle*4,zIndex:15,
                  transform:`translate(-50%,-50%) scale(${sc})`,opacity:stamp}}>
                  <div style={{position:"relative",padding:"12px 34px",borderRadius:12,
                    background:"linear-gradient(180deg,#C44A3A,#9A3527)",
                    border:"3px solid #E7B24C",boxShadow:"0 10px 22px rgba(0,0,0,0.5)",
                    fontFamily:fraunces.fontFamily,fontWeight:900,fontSize:34,letterSpacing:2,
                    color:"#F7F3EA",whiteSpace:"nowrap",textShadow:"0 2px 4px rgba(0,0,0,0.5)"}}>
                    20 ENTER
                    <span style={{color:"#E7B24C",margin:"0 12px"}}>·</span>
                    1 LEAVES
                    {/* glint sweep */}
                    <div style={{position:"absolute",left:`${-30+glint*160}%`,top:0,width:"30%",height:"100%",
                      background:"linear-gradient(100deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 100%)",
                      transform:"skewX(-18deg)",pointerEvents:"none"}}/>
                  </div>
                </div>
              );
            })()}

          </AbsoluteFill>
        );
      })()}
    </>
);

const ReframeBody: React.FC<{ lf: number }> = ({ lf }) => (
<>
  {(() => {
    // ===== phase clocks =====
    const act1 = over(lf, 0, 102);              // grind
    const flip = over(lf, 102, 36, Easing.out(Easing.cubic)); // 102-138
    const judge = over(lf, 138, 155);           // 138-293
    const isJudge = lf >= 138;

    // bench rise: little desk (act1) grows into tall bench (act3). progress 0..1 across f96..150
    const rise = over(lf, 96, 54, Easing.inOut(Easing.cubic));
    const benchTop = interpolate(rise, [0, 1], [472, 430]);
    const benchBot = interpolate(rise, [0, 1], [548, 566]);
    const benchLeft = interpolate(rise, [0, 1], [430, 372]);
    const benchRight = interpolate(rise, [0, 1], [590, 640]);
    const benchW = benchRight - benchLeft;
    const benchH = benchBot - benchTop;

    // sprite sits behind bench; head rises as bench rises
    const spriteHeadY = interpolate(rise, [0, 1], [452, 388]);
    const spriteX = interpolate(rise, [0, 1], [510, 506]);
    const bob = isJudge ? Math.sin((lf - 138) * 0.14) * 3 : 0;

    // ACT3 gavel bang cadence
    const bangs = [150, 168, 186, 204, 222, 240, 258, 276];
    let gAng = 0;
    bangs.forEach((b) => {
      const d = lf - b;
      if (d >= -8 && d < 10) {
        if (d < 0) gAng = Math.max(gAng, interpolate(d, [-8, 0], [0, -46]));
        else gAng = Math.max(gAng, interpolate(Math.min(d, 9), [0, 4, 9], [-46, 14, 0]));
      }
    });
    if (isJudge) gAng += Math.sin((lf - 138) * 0.1) * 4;

    // 20 cards on floor band y600..770
    const N = 20;
    const winnerIdx = 9;
    const elimOrder = [0, 19, 4, 15, 2, 11, 7, 17];
    const cardState = (i) => {
      let ei = elimOrder.indexOf(i);
      if (ei === -1) return { elimF: null };
      return { elimF: bangs[ei] };
    };

    return (
      <>
        {/* ============ TORCH-LIT COURTROOM BACKDROP ============ */}
        <div style={{ position: "absolute", left: 0, top: 150, width: 1012, height: 642, background: "linear-gradient(#241C16, #17110C 60%, #0F0B07)", zIndex: 0 }} />
        {[120, 892].map((px, i) => (
          <div key={"pil" + i} style={{ position: "absolute", left: px - 46, top: 150, width: 92, height: 642, background: "linear-gradient(90deg,#2E241B,#3A2E22,#241C15)", boxShadow: "inset 0 0 30px rgba(0,0,0,.5)", zIndex: 1 }} />
        ))}
        {[120, 892].map((px) => [0, 1, 2, 3, 4, 5, 6].map((r) => (
          <div key={"blk" + px + r} style={{ position: "absolute", left: px - 46, top: 150 + r * 92, width: 92, height: 2, background: "rgba(0,0,0,.35)", zIndex: 2 }} />
        )))}
        {[120, 892].map((px, i) => {
          const fl = 0.7 + Math.sin(lf * 0.35 + i * 2) * 0.15 + seed(i + Math.floor(lf / 3)) * 0.15;
          return (
            <React.Fragment key={"tor" + i}>
              <div style={{ position: "absolute", left: px - 10, top: 250, width: 20, height: 40, background: "linear-gradient(#3A2E22,#231A12)", borderRadius: 4, zIndex: 3 }} />
              <div style={{ position: "absolute", left: px - 22, top: 205 - fl * 14, width: 44, height: 60 + fl * 20, background: "radial-gradient(ellipse at 50% 70%, #FFD46A, #F0902E 45%, rgba(207,69,42,0) 75%)", filter: "blur(2px)", opacity: 0.55 + fl * 0.3, zIndex: 4 }} />
              <div style={{ position: "absolute", left: px - 70, top: 210, width: 140, height: 140, background: "radial-gradient(circle, rgba(231,178,76,.28), rgba(231,178,76,0) 70%)", opacity: fl, zIndex: 2 }} />
            </React.Fragment>
          );
        })}
        <div style={{ position: "absolute", left: 466, top: 172, width: 80, height: 80, borderRadius: "50%", background: "radial-gradient(circle at 40% 40%, #F7F3EA, #C9C2B0)", boxShadow: "0 0 40px rgba(247,243,234,.35)", zIndex: 1 }} />

        {/* ============ ACT1 GRIND: crumpled REJECTED drafts blizzard + drifts ============ */}
        {act1 < 1 && Array.from({ length: 26 }).map((_, i) => {
          const s = seed(i * 7 + 1);
          const born = i * 3.2;
          const t = (lf - born);
          if (t < 0) return null;
          const life = ((t) % 70) / 70;
          const ox = 210 + s * 620;
          const arcX = ox + Math.sin(t * 0.12 + i) * 60;
          const arcY = interpolate(life, [0, 1], [230 + s * 40, 640 + s * 60]);
          const rot = t * (6 + s * 8);
          const sz = 20 + s * 16;
          const settle = life > 0.85 ? 1 : 0;
          return (
            <div key={"crmp" + i} style={{ position: "absolute", left: arcX, top: arcY, width: sz, height: sz, borderRadius: "46% 54% 60% 40%", background: settle ? "#D9CFBC" : "#E7DFCD", boxShadow: "inset -3px -4px 0 rgba(0,0,0,.18), 2px 3px 4px rgba(0,0,0,.3)", transform: `rotate(${rot}deg)`, opacity: 1 - (life > 0.9 ? (life - 0.9) * 3 : 0), zIndex: 6 }} />
          );
        })}
        {act1 < 1 && [ [250, 700, 200], [560, 720, 260], [760, 710, 170] ].map((d, i) => {
          const grow = over(lf, 20 + i * 14, 70);
          return (
            <div key={"drift" + i} style={{ position: "absolute", left: d[0] - (d[2] * grow) / 2, top: d[1], width: d[2] * grow, height: 46 * grow, borderRadius: "50% 50% 12% 12%", background: "linear-gradient(#E7DFCD,#CFC5B0)", boxShadow: "inset 0 6px 0 rgba(255,255,255,.25), 3px 4px 6px rgba(0,0,0,.35)", zIndex: 5 }} />
          );
        })}

        {/* ============ DESK -> BENCH (single object that grows) ============ */}
        <div style={{ position: "absolute", left: benchLeft, top: benchTop, width: benchW, height: benchH, background: "linear-gradient(#6E4A2C,#4E3420 55%,#3A2617)", borderRadius: "10px 10px 6px 6px", boxShadow: "0 14px 0 rgba(0,0,0,.35), inset 0 3px 0 rgba(255,255,255,.12), inset 0 -8px 12px rgba(0,0,0,.4)", border: "3px solid #2E1E12", zIndex: 30 }} />
        <div style={{ position: "absolute", left: benchLeft - 14, top: benchTop - 12, width: benchW + 28, height: 20, background: "linear-gradient(#8A5E38,#5E3F26)", borderRadius: 6, boxShadow: "0 4px 6px rgba(0,0,0,.4), inset 0 2px 0 rgba(255,255,255,.18)", zIndex: 32 }} />
        {rise > 0.4 && (
          <div style={{ position: "absolute", left: benchLeft + benchW / 2 - 42, top: benchTop + 22, width: 84, height: benchH - 40, border: "3px solid rgba(46,30,18,.7)", borderRadius: 8, boxShadow: "inset 0 0 0 3px rgba(138,94,56,.4)", opacity: (rise - 0.4) * 1.6, zIndex: 31 }} />
        )}
        <div style={{ position: "absolute", left: benchLeft, top: benchTop, width: benchW, height: benchH, background: "radial-gradient(ellipse at 50% -20%, rgba(231,178,76,.25), rgba(231,178,76,0) 70%)", zIndex: 33 }} />

        {/* ============ THE ONE FABLE SPRITE (writer -> judge, same sprite) ============ */}
        {lf < 120 && (() => {
          const throwT = over(lf, 104, 16, Easing.in(Easing.cubic));
          const penX = interpolate(throwT, [0, 1], [560, 720]);
          const penY = interpolate(throwT, [0, 1], [452, 620]);
          const penRot = 30 + throwT * 520 + (throwT < 0.01 ? Math.sin(lf * 0.9) * 10 : 0);
          const penOp = 1 - over(lf, 116, 6);
          return (
            <div style={{ position: "absolute", left: penX, top: penY, width: 46, height: 8, background: "linear-gradient(90deg,#E7B24C,#8A5E38)", borderRadius: 4, transform: `rotate(${penRot}deg)`, opacity: penOp, boxShadow: "1px 2px 3px rgba(0,0,0,.4)", zIndex: 40 }} />
          );
        })()}
        {act1 < 1 && Array.from({ length: 5 }).map((_, i) => {
          const c = (lf + i * 9) % 40;
          const sp = over(c, 0, 40);
          if (sp <= 0) return null;
          return (
            <div key={"swt" + i} style={{ position: "absolute", left: 452 + i * 6 + Math.sin(i) * 30 + sp * (i % 2 ? 40 : -40), top: 400 - sp * 40 + sp * sp * 90, width: 8, height: 12, borderRadius: "50% 50% 50% 50%/60% 60% 40% 40%", background: "#7FB6E0", opacity: 1 - sp, zIndex: 41 }} />
          );
        })}

        {/* the sprite itself - bench (z30) occludes lower half */}
        <div style={{ position: "absolute", left: spriteX, top: spriteHeadY + bob, transform: "translate(-50%,-50%)", zIndex: 20 }}>
          <Mascot
            lf={lf}
            size={140}
            stern={isJudge ? 1 : 0}
            shock={0}
            judge={isJudge ? 1 : 0}
            suit={rise > 0.5 ? 1 : 0}
            gaze={isJudge ? 0.4 : 0}
            nodAmp={act1 < 1 ? 5 : 1}
            nodSpeed={act1 < 1 ? 2.2 : 0.6}
          />
        </div>

        {/* GOLD GAVEL - drops in flip, held + bangs in act3 */}
        {lf >= 104 && (() => {
          const drop = over(lf, 104, 18, Easing.out(Easing.bounce));
          const gy = interpolate(drop, [0, 1], [180, spriteHeadY - 6]);
          const gx = spriteX + 78;
          const flash = 1 - over(lf, 118, 10);
          return (
            <div style={{ position: "absolute", left: gx, top: gy + bob, transform: `translate(-50%,-50%) rotate(${gAng}deg)`, transformOrigin: "50% 90%", zIndex: 34 }}>
              <div style={{ position: "absolute", left: -5, top: 0, width: 10, height: 62, background: "linear-gradient(90deg,#B77E2E,#E7B24C,#8A5E38)", borderRadius: 5, boxShadow: "1px 2px 4px rgba(0,0,0,.5)" }} />
              <div style={{ position: "absolute", left: -30, top: -22, width: 60, height: 30, background: "linear-gradient(#F0C662,#C98F30)", borderRadius: 8, border: "2px solid #8A5E38", boxShadow: "0 4px 6px rgba(0,0,0,.5), inset 0 3px 0 rgba(255,255,255,.4)" }} />
              {[-30, 22].map((cx, i) => (
                <div key={i} style={{ position: "absolute", left: cx, top: -24, width: 8, height: 34, background: "#B77E2E", borderRadius: 3 }} />
              ))}
              {flash > 0 && (
                <div style={{ position: "absolute", left: -60, top: -52, width: 120, height: 120, background: "radial-gradient(circle,#FFF3CC,rgba(255,243,204,0) 65%)", opacity: flash, transform: `scale(${0.5 + (1 - flash) * 1.2})`, zIndex: 2 }} />
              )}
            </div>
          );
        })()}

        {/* ============ $0 crossed-out coin, upper-right ============ */}
        {(() => {
          const pop = over(lf, 60, 20, Easing.out(Easing.back(2)));
          if (pop <= 0) return null;
          const wob = Math.sin(lf * 0.12) * 4;
          return (
            <div style={{ position: "absolute", left: 858, top: 208, transform: `translate(-50%,-50%) scale(${pop}) rotate(${wob}deg)`, zIndex: 45 }}>
              <div style={{ position: "absolute", left: -42, top: -42, width: 84, height: 84, borderRadius: "50%", background: "radial-gradient(circle at 38% 34%, #F0C662, #B77E2E 70%)", border: "4px solid #8A5E38", boxShadow: "0 6px 10px rgba(0,0,0,.5), inset 0 0 0 5px rgba(247,243,234,.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 46, color: "#4E3420" }}>$0</span>
              </div>
              <div style={{ position: "absolute", left: -52, top: -4, width: 104, height: 9, background: "#FF3623", borderRadius: 5, transform: "rotate(-32deg)", boxShadow: "0 2px 4px rgba(0,0,0,.5)" }} />
            </div>
          );
        })()}

        {/* ============ ACT1 DRAFT counter + REJECTED stamp ============ */}
        {lf < 118 && (() => {
          const n = 51 + Math.floor(over(lf, 0, 100) * 47);
          const j = Math.sin(lf * 0.9) * 2;
          return (
            <div style={{ position: "absolute", left: 176, top: 196, transform: `rotate(${-4 + j * 0.3}deg)`, zIndex: 46 }}>
              <div style={{ fontFamily: mono, fontWeight: 700, fontSize: 30, color: "#E7B24C", letterSpacing: 1, textShadow: "2px 2px 0 rgba(0,0,0,.5)" }}>DRAFT {n}</div>
            </div>
          );
        })()}
        {lf < 116 && (() => {
          const cyc = lf % 30;
          const slam = over(cyc, 0, 8, Easing.out(Easing.cubic));
          const fade = 1 - over(cyc, 12, 16);
          const sc = interpolate(slam, [0, 1], [2.4, 1]);
          if (fade <= 0) return null;
          return (
            <div style={{ position: "absolute", left: 300 + (lf % 90), top: 300 + ((lf * 7) % 120), transform: `translate(-50%,-50%) rotate(-16deg) scale(${sc})`, opacity: fade * 0.92, zIndex: 47 }}>
              <div style={{ padding: "6px 16px", border: "5px solid #C44A3A", borderRadius: 8, color: "#C44A3A", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 34, letterSpacing: 2, background: "rgba(196,74,58,.08)", boxShadow: "0 4px 10px rgba(0,0,0,.4)" }}>REJECTED</div>
            </div>
          );
        })()}

        {/* ============ ACT3 CONTENDER CARDS on floor y600..770 ============ */}
        {isJudge && Array.from({ length: N }).map((_, i) => {
          const row = Math.floor(i / 10);
          const col = i % 10;
          const cx = 96 + col * 90 + row * 22;
          const cyBase = 612 + row * 84;
          const appear = over(lf, 138 + col * 2 + row * 4, 14, Easing.out(Easing.back(1.6)));
          if (appear <= 0) return null;

          const st = cardState(i);
          const isWinner = i === winnerIdx;
          let elimP = 0, gone = false;
          if (st.elimF != null && lf >= st.elimF) {
            elimP = over(lf, st.elimF, 14, Easing.in(Easing.cubic));
            if (lf > st.elimF + 16) gone = true;
          }
          if (gone) return null;

          const winP = isWinner ? over(lf, 262, 24, Easing.out(Easing.back(1.4))) : 0;
          const dropY = elimP * 220;
          const dropRot = elimP * (i % 2 ? 40 : -40);
          const riseY = winP * 46;
          const scl = interpolate(appear, [0, 1], [0.4, 1]) * (1 + winP * 0.18);
          const flashRed = st.elimF != null && lf >= st.elimF && lf < st.elimF + 8;
          const cardBg = isWinner && winP > 0.15 ? "#EAF6EE" : "#F7F3EA";
          const borderC = isWinner && winP > 0.15 ? "#3F9E74" : (flashRed ? "#C44A3A" : "#E7B24C");

          return (
            <div key={"card" + i} style={{ position: "absolute", left: cx, top: cyBase + dropY - riseY, width: 74, height: 96, transform: `rotate(${dropRot}deg) scale(${scl})`, opacity: 1 - elimP * 0.6, zIndex: isWinner ? 60 : 12 + (10 - col) }}>
              <div style={{ width: "100%", height: "100%", background: cardBg, borderRadius: 8, border: `3px solid ${borderC}`, boxShadow: isWinner && winP > 0.3 ? "0 0 22px rgba(63,158,116,.7), 0 8px 12px rgba(0,0,0,.4)" : "0 6px 8px rgba(0,0,0,.45)", overflow: "hidden" }}>
                <div style={{ height: 20, background: "#D2724E", borderBottom: "2px solid rgba(0,0,0,.15)" }} />
                <div style={{ padding: "8px 8px 0" }}>
                  {[0.9, 0.7, 0.85, 0.55].map((w, k) => (
                    <div key={k} style={{ height: 6, width: `${w * 100}%`, marginBottom: 6, background: "#C9BFA8", borderRadius: 3, filter: "blur(1.4px)" }} />
                  ))}
                </div>
              </div>
              {flashRed && (
                <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", fontSize: 60, color: "#C44A3A", fontWeight: 900, textShadow: "0 2px 4px rgba(0,0,0,.5)" }}>✕</div>
              )}
              {isWinner && winP > 0.2 && (
                <div style={{ position: "absolute", left: "50%", top: -14, transform: `translate(-50%,0) scale(${winP})`, width: 40, height: 40, borderRadius: "50%", background: "#3F9E74", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 8px rgba(0,0,0,.4)", zIndex: 3 }}>
                  <span style={{ color: "#F7F3EA", fontSize: 26, fontWeight: 900 }}>✓</span>
                </div>
              )}
            </div>
          );
        })}

        {/* winner confetti burst */}
        {isJudge && lf > 268 && Array.from({ length: 16 }).map((_, i) => {
          const t = over(lf, 268, 26);
          const ang = (i / 16) * Math.PI * 2;
          const r = t * 120;
          const cols = ["#E7B24C", "#3F9E74", "#D2724E", "#F7F3EA"];
          return (
            <div key={"cf" + i} style={{ position: "absolute", left: 366 + Math.cos(ang) * r, top: 560 + Math.sin(ang) * r * 0.7 - t * 30, width: 12, height: 8, background: cols[i % 4], borderRadius: 2, transform: `rotate(${i * 40 + lf * 6}deg)`, opacity: 1 - t, zIndex: 62 }} />
          );
        })}

        {/* scanning beam sweep */}
        {isJudge && lf < 250 && (() => {
          const sweep = ((lf - 138) % 60) / 60;
          const bx = interpolate(sweep, [0, 1], [110, 900]);
          return (
            <div style={{ position: "absolute", left: bx, top: 600, width: 40, height: 176, background: "linear-gradient(90deg,rgba(231,178,76,0),rgba(231,178,76,.5),rgba(231,178,76,0))", filter: "blur(3px)", zIndex: 55 }} />
          );
        })()}

        {/* ============ PUNCHY LABELS (not VO transcript) ============ */}
        {lf < 108 && (() => {
          const a = over(lf, 8, 12) * (1 - over(lf, 100, 8));
          return (
            <div style={{ position: "absolute", left: 506, top: 700, transform: "translate(-50%,0)", opacity: a, zIndex: 70 }}>
              <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 40, color: "#ECE9E2", textShadow: "0 3px 8px rgba(0,0,0,.6)", letterSpacing: 1 }}>WRITING = A GRIND</div>
            </div>
          );
        })()}
        {lf >= 112 && lf < 176 && (() => {
          const l1 = over(lf, 112, 8) * (1 - over(lf, 150, 10));
          const l2 = over(lf, 132, 8) * (1 - over(lf, 168, 8));
          return (
            <>
              <div style={{ position: "absolute", left: 506, top: 162, transform: `translate(-50%,0) scale(${0.9 + l1 * 0.1})`, opacity: l1, zIndex: 71 }}>
                <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 44, color: "#C44A3A", textShadow: "0 3px 8px rgba(0,0,0,.6)" }}>NOT A WRITER.</div>
              </div>
              <div style={{ position: "absolute", left: 506, top: 212, transform: `translate(-50%,0) scale(${0.9 + l2 * 0.1})`, opacity: l2, zIndex: 71 }}>
                <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 56, color: "#E7B24C", textShadow: "0 4px 10px rgba(0,0,0,.7)", letterSpacing: 1 }}>THE JUDGE.</div>
              </div>
            </>
          );
        })()}
        {isJudge && lf < 264 && (() => {
          const a = over(lf, 150, 10) * (1 - over(lf, 256, 8));
          return (
            <div style={{ position: "absolute", left: 792, top: 176, transform: "translate(-50%,0)", opacity: a, zIndex: 70 }}>
              <div style={{ fontFamily: mono, fontWeight: 700, fontSize: 26, color: "#C44A3A", letterSpacing: 2, textShadow: "0 2px 6px rgba(0,0,0,.6)" }}>ELIMINATING</div>
            </div>
          );
        })()}
        {isJudge && lf >= 262 && (() => {
          const a = over(lf, 262, 12);
          return (
            <div style={{ position: "absolute", left: 506, top: 176, transform: `translate(-50%,0) scale(${0.85 + a * 0.15})`, opacity: a, zIndex: 72 }}>
              <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 48, color: "#3F9E74", textShadow: "0 4px 10px rgba(0,0,0,.7)", letterSpacing: 1 }}>THE WINNER</div>
            </div>
          );
        })()}
      </>
    );
  })()}
</>
);

const ArenaBody: React.FC<{ lf: number }> = ({ lf }) => (
<>
    {/* ===================== DEEP ARENA BACKDROP ===================== */}
    <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, overflow: "hidden", background: "linear-gradient(#0E1830 0%, #17233F 46%, #241C22 100%)" }}>
      {/* moon */}
      {(() => {
        const g = 0.55 + 0.45 * Math.sin(lf / 20);
        return (
          <div style={{ position: "absolute", left: 812, top: 40, width: 78, height: 78, borderRadius: "50%", background: "radial-gradient(circle at 38% 34%, #FBF3D8, #E7B24C)", boxShadow: `0 0 ${44 + g * 22}px ${16 + g * 8}px rgba(231,178,76,0.32)`, zIndex: 1 }} />
        );
      })()}
      {/* stars */}
      {Array.from({ length: 34 }).map((_, i) => {
        const x = seed(i * 3 + 1) * 1012;
        const y = seed(i * 7 + 2) * 180;
        const tw = 0.4 + 0.6 * Math.sin(lf / 8 + seed(i) * 9);
        return <div key={"st" + i} style={{ position: "absolute", left: x, top: y, width: 3, height: 3, borderRadius: "50%", background: "#F7F3EA", opacity: 0.3 + 0.5 * tw, zIndex: 1 }} />;
      })}
      {/* colosseum tiers (elliptical stone bowl) */}
      {Array.from({ length: 4 }).map((_, i) => {
        const w = 1180 - i * 150;
        const h = 560 - i * 96;
        const tint = ["#3A2E28", "#4A3A30", "#5C483A", "#6E5646"][i];
        return (
          <div key={"tier" + i} style={{ position: "absolute", left: 506 - w / 2, top: 300 - h / 2 + 190, width: w, height: h, borderRadius: "50%", border: `${20 - i * 3}px solid ${tint}`, boxShadow: "inset 0 8px 24px rgba(0,0,0,0.4)", zIndex: 2 }} />
        );
      })}
      {/* tier seat dashes (crowd) */}
      {Array.from({ length: 46 }).map((_, i) => {
        const a = (i / 46) * Math.PI - Math.PI * 0.02;
        const rx = 520, ry = 232;
        const x = 506 + Math.cos(a) * rx;
        const y = 300 + 190 - Math.sin(a) * ry;
        if (y > 470) return null;
        const cheer = Math.sin(lf / 5 + i) > 0.3 ? 1 : 0;
        return <div key={"cr" + i} style={{ position: "absolute", left: x, top: y - cheer * 4, width: 12, height: 14, borderRadius: 4, background: i % 3 === 0 ? "#CF9544" : i % 3 === 1 ? "#9A968B" : "#B07A5A", opacity: 0.55, zIndex: 3 }} />;
      })}
      {/* arena floor sand ellipse */}
      <div style={{ position: "absolute", left: 506 - 430, top: 430, width: 860, height: 320, borderRadius: "50%", background: "radial-gradient(ellipse at 50% 38%, #C9A46F 0%, #A97F4E 60%, #6E4F30 100%)", boxShadow: "inset 0 -12px 40px rgba(0,0,0,0.45)", zIndex: 4 }} />
      {/* gold banners */}
      {[120, 300, 700, 880].map((bx, i) => (
        <div key={"ban" + i} style={{ position: "absolute", left: bx, top: 150, width: 46, height: 120 + Math.sin(lf / 12 + i) * 4, background: "linear-gradient(#E7B24C,#CF9544)", clipPath: "polygon(0 0,100% 0,100% 86%,50% 100%,0 86%)", boxShadow: "0 4px 10px rgba(0,0,0,0.35)", zIndex: 5 }}>
          <div style={{ position: "absolute", left: 15, top: 22, width: 16, height: 16, borderRadius: "50%", border: "3px solid #7A4A1E" }} />
        </div>
      ))}
      {/* torches */}
      {[64, 948].map((tx, i) => {
        const fl = 0.7 + 0.3 * Math.sin(lf / 4 + i * 2);
        return (
          <div key={"tor" + i} style={{ position: "absolute", left: tx, top: 300, zIndex: 6 }}>
            <div style={{ position: "absolute", left: 8, top: 40, width: 12, height: 90, background: "#5C483A", borderRadius: 3 }} />
            <div style={{ position: "absolute", left: 0, top: 8, width: 28, height: 40, borderRadius: "50% 50% 50% 50%/60% 60% 40% 40%", background: "radial-gradient(circle at 50% 70%, #FBE3A0, #CF7A2E)", filter: "blur(1px)", transform: `scaleY(${fl})`, boxShadow: `0 0 ${34 * fl}px ${12 * fl}px rgba(207,122,46,0.5)` }} />
          </div>
        );
      })}
      {/* ambient torch glow floor wash */}
      <div style={{ position: "absolute", left: 0, top: 250, width: 1012, height: 542, background: "radial-gradient(ellipse at 50% 70%, rgba(207,149,68,0.18), transparent 62%)", zIndex: 6 }} />
    </div>

    {/* ===================== JUDGE (presides) ===================== */}
    {(() => {
      const jIn = over(lf, 6, 16, Easing.out(Easing.back(1.4)));
      const bang = fr(2.0), bangEvts = [fr(3.4), fr(4.6), fr(5.8), fr(7.0)];
      let g = 0;
      bangEvts.forEach((b) => { const p = over(lf, b, 8); const q = over(lf, b + 8, 8); g = Math.max(g, p - q); });
      const gavelRot = -18 - g * 34;
      return (
        <div style={{ position: "absolute", left: 40, top: 486, transform: `translateY(${(1 - jIn) * 60}px) scale(${0.7 + jIn * 0.3})`, opacity: jIn, zIndex: 40 }}>
          <Mascot lf={lf} size={132} judge={1} stern={0.9} gaze={0.2} nodAmp={2} nodSpeed={0.15} />
          {/* gavel */}
          <div style={{ position: "absolute", left: 96, top: 30, transformOrigin: "10px 40px", transform: `rotate(${gavelRot}deg)` }}>
            <div style={{ position: "absolute", left: 8, top: 34, width: 8, height: 50, background: "#7A4A1E", borderRadius: 4 }} />
            <div style={{ position: "absolute", left: -10, top: 14, width: 44, height: 26, background: "linear-gradient(#8A5A28,#5C3A18)", borderRadius: 6, boxShadow: "0 2px 4px rgba(0,0,0,0.4)" }} />
          </div>
          {/* bang shockwave */}
          {g > 0.05 && <div style={{ position: "absolute", left: 92, top: 92, width: 60 * g + 10, height: 60 * g + 10, marginLeft: -(30 * g), marginTop: -(30 * g), borderRadius: "50%", border: `3px solid rgba(231,178,76,${0.7 * (1 - g)})`, zIndex: 39 }} />}
          <div style={{ position: "absolute", left: -6, top: 128, width: 150, height: 18, background: "radial-gradient(ellipse,rgba(0,0,0,0.4),transparent 70%)", zIndex: -1 }} />
        </div>
      );
    })()}

    {/* ===================== ACT 1: HERO CARD DROP + BURST ===================== */}
    {(() => {
      const drop = over(lf, 0, 20, Easing.out(Easing.cubic));
      const burstAt = fr(2.0);
      const held = lf < burstAt;
      if (!held) return null;
      const y = interpolate(drop, [0, 1], [-160, 300], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
      const pop = over(lf, fr(1.7), 8);
      const scl = 1 + pop * 0.12;
      return (
        <div style={{ position: "absolute", left: 406, top: y, width: 200, height: 250, zIndex: 45, transform: `scale(${scl})` }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: 14, background: "#F7F3EA", border: "5px solid #E7B24C", boxShadow: "0 18px 40px rgba(0,0,0,0.5)" }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 40, background: "#D2724E", borderRadius: "9px 9px 0 0" }} />
            {Array.from({ length: 5 }).map((_, i) => <div key={i} style={{ position: "absolute", left: 18, top: 60 + i * 26, width: i % 2 ? 120 : 160, height: 12, borderRadius: 6, background: "#C9C3B4", filter: "blur(2.5px)" }} />)}
          </div>
          <div style={{ position: "absolute", left: 44, top: -18, background: "#1A1813", color: "#E7B24C", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 15, padding: "5px 14px", borderRadius: 20, letterSpacing: 1, boxShadow: "0 4px 10px rgba(0,0,0,0.4)" }}>YOUR AD</div>
        </div>
      );
    })()}

    {/* burst flash at split */}
    {(() => {
      const b = over(lf, fr(1.95), 10);
      const f = b * (1 - b) * 4;
      if (f < 0.02) return null;
      return <div style={{ position: "absolute", left: 506 - 220, top: 300 - 220, width: 440, height: 440, borderRadius: "50%", background: "radial-gradient(circle,rgba(231,178,76,0.7),transparent 68%)", opacity: f, zIndex: 44 }} />;
    })()}

    {/* ===================== BRACKET STRUCTURE + CARDS (ACT 1->3) ===================== */}
    {(() => {
      const N = 16;
      // bracket columns x positions and per-round card slots
      const cols = [175, 355, 545, 735, 900]; // 16,8,4,2,1
      const colY = (round, idx) => {
        const count = [16, 8, 4, 2, 1][round];
        const top = 210, bottom = 690;
        const step = (bottom - top) / (count + 1);
        return top + step * (idx + 1);
      };
      // round timing (frames): reveal after burst, then eliminate rounds
      const scatterStart = fr(2.0), scatterDur = 16;
      const roundStart = [fr(3.4), fr(4.6), fr(5.8), fr(7.0)]; // R1..R4 (16->8,8->4,4->2,2->1)
      const roundDur = 30;

      // survivor index per round: keep even indices repeatedly (idx // 2)
      const survivesRound = (round, idx) => {
        // at round r, a card at slot idx of that round's SOURCE count survives if idx even
        return idx % 2 === 0;
      };

      // For a starting card i (0..15), compute which round it dies (or 4 = champion)
      const dieRound = (i) => {
        let idx = i;
        for (let r = 0; r < 4; r++) {
          if (idx % 2 !== 0) return r; // odd loses at round r
          idx = idx / 2;
        }
        return 4; // champion
      };

      return (
        <>
          {/* bracket connector lines */}
          {[0, 1, 2, 3].map((r) => {
            const srcCount = [16, 8, 4, 2][r];
            const lineOn = over(lf, scatterStart + 6, 14);
            return Array.from({ length: srcCount / 2 }).map((_, p) => {
              const yA = colY(r, p * 2), yB = colY(r, p * 2 + 1);
              const xL = cols[r] + 60, xR = cols[r + 1] - 6;
              const midX = (xL + xR) / 2;
              return (
                <React.Fragment key={"ln" + r + "_" + p}>
                  <div style={{ position: "absolute", left: xL, top: yA + 30, width: (midX - xL), height: 3, background: "rgba(231,178,76,0.5)", opacity: lineOn, zIndex: 10 }} />
                  <div style={{ position: "absolute", left: xL, top: yB + 30, width: (midX - xL), height: 3, background: "rgba(231,178,76,0.5)", opacity: lineOn, zIndex: 10 }} />
                  <div style={{ position: "absolute", left: midX, top: Math.min(yA, yB) + 30, width: 3, height: Math.abs(yB - yA), background: "rgba(231,178,76,0.5)", opacity: lineOn, zIndex: 10 }} />
                  <div style={{ position: "absolute", left: midX, top: (yA + yB) / 2 + 30, width: (xR - midX), height: 3, background: "rgba(231,178,76,0.5)", opacity: lineOn, zIndex: 10 }} />
                </React.Fragment>
              );
            });
          })}

          {/* the 16 cards animating through the bracket */}
          {Array.from({ length: N }).map((_, i) => {
            const dr = dieRound(i);
            const champion = dr === 4;
            // scatter in
            const scatter = over(lf, scatterStart + (i % 8) * 0.6, scatterDur, Easing.out(Easing.cubic));
            const startX = 456, startY = 300;
            // current position: advance along rounds it survives, until it dies
            let curRound = 0, curIdx = i;
            let advanced = 0;
            for (let r = 0; r < 4; r++) {
              const rp = over(lf, roundStart[r], roundDur, Easing.inOut(Easing.cubic));
              if (dr > r) {
                // survives round r: slides from col r slot -> col r+1 slot
                curRound = r + (rp > 0 ? rp : 0);
                if (rp >= 1) { curIdx = curIdx / 2; }
                advanced = r;
                if (rp < 1 && rp > 0) {
                  // interpolate mid-slide handled below
                }
              } else {
                break;
              }
            }
            // compute smooth position by finding highest fully/partly done round
            let baseRound = 0, baseIdx = i;
            for (let r = 0; r < 4; r++) {
              const rp = over(lf, roundStart[r], roundDur, Easing.inOut(Easing.cubic));
              if (dr > r && rp > 0) {
                const fromY = colY(r, baseIdx);
                const toIdx = baseIdx / 2;
                const toY = colY(r + 1, toIdx);
                const fromX = cols[r], toX = cols[r + 1];
                var slideX = interpolate(rp, [0, 1], [fromX, toX], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
                var slideY = interpolate(rp, [0, 1], [fromY, toY], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
                if (rp >= 1) baseIdx = toIdx;
                baseRound = r + 1;
              } else break;
            }
            const restX = cols[Math.min(baseRound, 4)];
            const restY = colY(Math.min(baseRound, 4), baseIdx);
            const px = (typeof slideX !== "undefined") ? slideX : restX;
            const py = (typeof slideY !== "undefined") ? slideY : restY;

            // death: at roundStart[dr] the card loses
            const dieAt = dr < 4 ? roundStart[dr] : 9999;
            const dead = over(lf, dieAt + 6, 14);
            const isDyingNow = lf >= dieAt + 4 && lf < dieAt + 24;
            // champion hides after final clash (act 3 takes over)
            const champHideAt = roundStart[3] + 20;
            if (champion && lf >= champHideAt) return null;

            // position: scatter from center to col0 slot first
            const col0Y = colY(0, i);
            const cx = interpolate(scatter, [0, 1], [startX, cols[0]], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const cy = interpolate(scatter, [0, 1], [startY, col0Y], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const finalX = baseRound > 0 || (typeof slideX !== "undefined") ? px : cx;
            const finalY = baseRound > 0 || (typeof slideY !== "undefined") ? py : cy;

            const w = 92, h = 116;
            const dieScale = 1 - dead * 0.5;
            const dieRot = dead * (i % 2 ? 24 : -24);
            const winGlow = (dr > baseRound && baseRound > 0) || champion;
            const bornBig = champion && baseRound >= 1;

            return (
              <div key={"cd" + i} style={{ position: "absolute", left: finalX, top: finalY, width: w, height: h, transform: `scale(${scatter * dieScale * (bornBig ? 1.12 : 1)}) rotate(${dieRot}deg)`, opacity: scatter * (1 - dead), zIndex: 20 + (winGlow ? 4 : 0) }}>
                <div style={{ position: "absolute", inset: 0, borderRadius: 9, background: "#F7F3EA", border: `4px solid ${winGlow ? "#3F9E74" : "#E7B24C"}`, boxShadow: winGlow ? "0 6px 18px rgba(63,158,116,0.5)" : "0 6px 14px rgba(0,0,0,0.4)" }}>
                  <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 20, background: winGlow ? "#3F9E74" : "#D2724E", borderRadius: "5px 5px 0 0" }} />
                  {Array.from({ length: 3 }).map((_, k) => <div key={k} style={{ position: "absolute", left: 10, top: 32 + k * 18, width: k % 2 ? 44 : 62, height: 7, borderRadius: 4, background: "#C9C3B4", filter: "blur(1.6px)" }} />)}
                </div>
                {/* winner check */}
                {winGlow && <div style={{ position: "absolute", right: -10, top: -10, width: 30, height: 30, borderRadius: "50%", background: "#3F9E74", color: "#F7F3EA", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 3px 8px rgba(0,0,0,0.4)" }}>✓</div>}
                {/* loser X + shatter shards */}
                {dead > 0.02 && (
                  <>
                    <div style={{ position: "absolute", left: "50%", top: "40%", transform: "translate(-50%,-50%)", color: "#C44A3A", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 46, opacity: 1 - dead }}>✕</div>
                    {Array.from({ length: 5 }).map((_, s) => {
                      const ang = seed(i * 9 + s) * 6.28;
                      const dist = dead * 46;
                      return <div key={s} style={{ position: "absolute", left: 40 + Math.cos(ang) * dist, top: 50 + Math.sin(ang) * dist, width: 12, height: 12, background: "#C44A3A", opacity: (1 - dead) * 0.9, transform: `rotate(${dead * 200}deg)` }} />;
                    })}
                  </>
                )}
                {/* clash spark when dying */}
                {isDyingNow && <div style={{ position: "absolute", left: w / 2 - 26, top: -20, width: 52, height: 52, borderRadius: "50%", background: "radial-gradient(circle,rgba(255,220,120,0.95),transparent 70%)", zIndex: 30 }} />}
              </div>
            );
          })}

          {/* MERGE / BREED flourish: at each round completion show a fuse "+" near winners */}
          {[0, 1, 2].map((r) => {
            const rp = over(lf, roundStart[r] + roundDur - 6, 12);
            const fade = over(lf, roundStart[r] + roundDur + 8, 10);
            const on = rp - fade;
            if (on < 0.03) return null;
            const count = [8, 4, 2][r];
            return Array.from({ length: Math.min(count, 4) }).map((_, p) => {
              const yy = colY(r + 1, p);
              return <div key={"mg" + r + p} style={{ position: "absolute", left: cols[r + 1] + 30, top: yy - 20, color: "#E7B24C", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 30 + on * 8, opacity: on, textShadow: "0 2px 8px rgba(0,0,0,0.5)", transform: `scale(${0.6 + on * 0.4})`, zIndex: 33 }}>+</div>;
            });
          })}
        </>
      );
    })()}

    {/* ===================== ACT 3: CHAMPION PEDESTAL ===================== */}
    {(() => {
      const champStart = fr(8.0);
      if (lf < champStart - 6) return null;
      const rise = over(lf, champStart, 22, Easing.out(Easing.back(1.3)));
      const beam = over(lf, champStart + 6, 16);
      const px = 506, floorY = 560;
      return (
        <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, zIndex: 55 }}>
          {/* light beam */}
          <div style={{ position: "absolute", left: px - 130, top: 150, width: 260, height: 460, background: "linear-gradient(rgba(231,178,76,0.42),rgba(231,178,76,0.04))", clipPath: "polygon(38% 0,62% 0,100% 100%,0 100%)", opacity: beam, filter: "blur(2px)" }} />
          {/* pedestal */}
          <div style={{ position: "absolute", left: px - 90, top: floorY - 6, width: 180, height: 80, transform: `translateY(${(1 - rise) * 40}px)`, opacity: rise }}>
            <div style={{ position: "absolute", left: 20, top: 0, width: 140, height: 30, background: "linear-gradient(#E7B24C,#CF9544)", borderRadius: "6px 6px 0 0", boxShadow: "inset 0 3px 6px rgba(255,255,255,0.3)" }} />
            <div style={{ position: "absolute", left: 0, top: 26, width: 180, height: 54, background: "linear-gradient(#8A5A28,#5C3A18)", borderRadius: "0 0 8px 8px" }} />
            <div style={{ position: "absolute", left: 60, top: 42, color: "#F7F3EA", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 20, letterSpacing: 3 }}>Nº1</div>
          </div>
          {/* champion card */}
          <div style={{ position: "absolute", left: px - 82, top: floorY - 220, width: 164, height: 210, transform: `translateY(${(1 - rise) * 80}px) scale(${0.85 + rise * 0.15})`, opacity: rise }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: 14, background: "#F7F3EA", border: "6px solid #E7B24C", boxShadow: `0 0 ${30 + beam * 26}px rgba(231,178,76,0.7), 0 16px 34px rgba(0,0,0,0.5)` }}>
              <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 34, background: "#3F9E74", borderRadius: "8px 8px 0 0" }} />
              {Array.from({ length: 5 }).map((_, k) => <div key={k} style={{ position: "absolute", left: 16, top: 52 + k * 22, width: k % 2 ? 90 : 128, height: 10, borderRadius: 5, background: "#C9C3B4", filter: "blur(2px)" }} />)}
              <div style={{ position: "absolute", right: -14, top: -14, width: 40, height: 40, borderRadius: "50%", background: "#3F9E74", color: "#F7F3EA", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 24, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 10px rgba(0,0,0,0.4)" }}>✓</div>
            </div>
            {/* crown / laurel */}
            {(() => {
              const cr = over(lf, champStart + 14, 12, Easing.out(Easing.back(2)));
              return (
                <div style={{ position: "absolute", left: 40, top: -46, transform: `scale(${cr}) translateY(${(1 - cr) * 20}px)`, opacity: cr }}>
                  <svg width="84" height="56" viewBox="0 0 84 56">
                    <path d="M6 50 L14 16 L28 38 L42 8 L56 38 L70 16 L78 50 Z" fill="#E7B24C" stroke="#B0842E" strokeWidth="2" />
                    <circle cx="14" cy="14" r="5" fill="#CF9544" /><circle cx="42" cy="6" r="6" fill="#F0C868" /><circle cx="70" cy="14" r="5" fill="#CF9544" />
                    <rect x="6" y="48" width="72" height="8" rx="3" fill="#CF9544" />
                  </svg>
                </div>
              );
            })()}
          </div>
          {/* confetti burst gold/clay/cream */}
          {Array.from({ length: 40 }).map((_, i) => {
            const start = champStart + 12 + (i % 6);
            const p = over(lf, start, 46);
            if (p <= 0) return null;
            const ang = seed(i) * 6.28;
            const spd = 120 + seed(i * 3) * 200;
            const cx = px + Math.cos(ang) * spd * p;
            const cy = (floorY - 150) + Math.sin(ang) * spd * p * 0.7 + p * p * 160;
            const col = ["#E7B24C", "#D2724E", "#F7F3EA", "#3F9E74"][i % 4];
            return <div key={"cf" + i} style={{ position: "absolute", left: cx, top: cy, width: 9, height: 14, background: col, opacity: 1 - p * 0.7, transform: `rotate(${p * 420 + i * 30}deg)`, borderRadius: 2 }} />;
          })}
          {/* crowd-wild flash */}
          {(() => { const fx = over(lf, champStart + 12, 8) * (1 - over(lf, champStart + 20, 10)); return fx > 0.02 ? <div style={{ position: "absolute", left: 0, top: 150, width: 1012, height: 500, background: "radial-gradient(ellipse at 50% 40%,rgba(255,240,200,0.35),transparent 60%)", opacity: fx }} /> : null; })()}
        </div>
      );
    })()}

    {/* ===================== HUD LABELS (ACT-BY-ACT) ===================== */}
    {(() => {
      // ROUND chip + cards-left, only during rounds
      const rStart = [fr(3.4), fr(4.6), fr(5.8), fr(7.0)];
      const cardsLeft = [16, 8, 4, 2, 1];
      let round = 0;
      for (let r = 0; r < 4; r++) if (lf >= rStart[r]) round = r + 1;
      const show = lf >= fr(2.2) && lf < fr(8.0);
      if (!show) return null;
      const inA = over(lf, fr(2.2), 8);
      const left = cardsLeft[round];
      return (
        <div style={{ position: "absolute", left: 700, top: 168, opacity: inA, zIndex: 60 }}>
          <div style={{ background: "#1A1813", border: "2px solid #E7B24C", borderRadius: 10, padding: "8px 16px", boxShadow: "0 6px 16px rgba(0,0,0,0.4)" }}>
            <div style={{ color: "#E7B24C", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 22, letterSpacing: 1 }}>ROUND {Math.max(round, 1)}<span style={{ color: "#9A968B", fontSize: 15 }}> /4</span></div>
          </div>
          <div style={{ marginTop: 8, background: "#C44A3A", borderRadius: 8, padding: "5px 12px", display: "inline-block", boxShadow: "0 4px 10px rgba(0,0,0,0.35)" }}>
            <span style={{ color: "#F7F3EA", fontFamily: mono, fontWeight: 800, fontSize: 16 }}>{left} LEFT</span>
          </div>
        </div>
      );
    })()}

    {/* ACT-1 "YOUR AD" -> ACT-3 "CHAMPION" big label */}
    {(() => {
      const champStart = fr(8.0);
      const on = over(lf, champStart + 8, 12);
      if (on < 0.02) return null;
      return (
        <div style={{ position: "absolute", left: 0, top: 176, width: 1012, textAlign: "center", zIndex: 62, opacity: on, transform: `scale(${0.9 + on * 0.1})` }}>
          <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 44, color: "#E7B24C", textShadow: "0 3px 12px rgba(0,0,0,0.6)", letterSpacing: 2 }}>CHAMPION</span>
        </div>
      );
    })()}

    {/* ===================== ARENA NAME-STAMP SLAM (final beat) ===================== */}
    {(() => {
      const stampAt = fr(10.4);
      if (lf < stampAt) return null;
      const slam = over(lf, stampAt, 7, Easing.out(Easing.back(2.2)));
      const settle = over(lf, stampAt + 7, 6);
      const scl = interpolate(slam, [0, 1], [2.6, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
      const ring = slam * (1 - settle);
      return (
        <div style={{ position: "absolute", left: 0, top: 350, width: 1012, textAlign: "center", zIndex: 70 }}>
          <div style={{ display: "inline-block", position: "relative", transform: `scale(${scl})` }}>
            <div style={{ background: "#C44A3A", border: "5px solid #E7B24C", borderRadius: 16, padding: "16px 46px", boxShadow: "0 14px 40px rgba(0,0,0,0.6)" }}>
              <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 74, color: "#F7F3EA", letterSpacing: 6, textShadow: "0 3px 0 #7A2A1E" }}>ARENA</span>
            </div>
            {ring > 0.02 && <div style={{ position: "absolute", left: "50%", top: "50%", width: 400 * (1 + ring), height: 400 * (1 + ring), marginLeft: -(200 * (1 + ring)), marginTop: -(200 * (1 + ring)), borderRadius: "50%", border: `4px solid rgba(231,178,76,${0.6 * (1 - ring)})` }} />}
          </div>
        </div>
      );
    })()}
  </>
);

const OutlastBody: React.FC<{ lf: number }> = ({ lf }) => (
<>
    {/* ===================== BACKDROP: colosseum tiers, moon, torches (150..300) ===================== */}
    {/* deep navy sky wash behind the back wall */}
    <div style={{position:"absolute", left:0, top:150, width:1012, height:170, background:"linear-gradient(180deg,#1a2740 0%,#243453 55%,#2c3a52 100%)", opacity:interpolate(over(lf,0,18,Easing.out(Easing.cubic)),[0,1],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"})}} />
    {/* moon top-right */}
    {(()=>{const a=over(lf,4,22);return (
      <div style={{position:"absolute", left:820, top:168, width:70, height:70, borderRadius:35, background:"radial-gradient(circle at 38% 34%,#FBF3D8,#E7C97A 62%,#C7A24E)", boxShadow:"0 0 34px rgba(231,178,76,0.55), inset -6px -6px 0 rgba(160,120,50,0.30)", opacity:a, transform:`scale(${interpolate(a,[0,1],[0.7,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"})})`}} />
    )})()}
    {/* back stone wall with arched tiers */}
    <div style={{position:"absolute", left:24, top:206, width:964, height:112, borderRadius:22, background:"linear-gradient(180deg,#5b4a38 0%,#4a3a2a 100%)", boxShadow:"inset 0 8px 0 rgba(255,220,150,0.10), 0 8px 0 rgba(0,0,0,0.30)", opacity:interpolate(over(lf,6,18),[0,1],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"})}} />
    {/* row of lit arches */}
    {Array.from({length:9}).map((_,i)=>{const ap=over(lf,10+i*1.4,14);const flick=0.72+0.28*Math.abs(Math.sin(lf*0.14+i*1.3));return (
      <div key={"arch"+i} style={{position:"absolute", left:52+i*104, top:224, width:70, height:78, borderRadius:"36px 36px 12px 12px", background:"radial-gradient(circle at 50% 30%,rgba(231,178,76,"+(0.55*flick).toFixed(2)+"),rgba(120,70,30,0.12) 66%),#2a2016", boxShadow:"inset 0 0 14px rgba(0,0,0,0.5)", opacity:ap}} />
    );})}
    {/* banners hanging between arches */}
    {[150,360,570,780].map((x,i)=>{const bp=over(lf,16+i*2,16);return (
      <div key={"ban"+i} style={{position:"absolute", left:x, top:206, width:52, height:70, background:"linear-gradient(180deg,#C44A3A,#9c3123)", clipPath:"polygon(0 0,100% 0,100% 78%,50% 100%,0 78%)", boxShadow:"0 4px 0 rgba(0,0,0,0.35)", opacity:bp, transform:`translateY(${interpolate(bp,[0,1],[-14,0],{extrapolateLeft:"clamp",extrapolateRight:"clamp"})}px)`}}>
        <div style={{position:"absolute", left:0, right:0, top:20, textAlign:"center", color:"#E7B24C", fontFamily:"serif", fontWeight:900, fontSize:26}}>V</div>
      </div>
    );})}
    {/* two torches flanking the wall */}
    {[36,940].map((x,i)=>{const flick=0.7+0.3*Math.abs(Math.sin(lf*0.22+i*2));return (
      <div key={"torch"+i} style={{position:"absolute", left:x, top:214, width:34, height:96, opacity:interpolate(over(lf,8,14),[0,1],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"})}}>
        <div style={{position:"absolute", left:12, top:34, width:10, height:60, background:"#3a2a1a", borderRadius:5}} />
        <div style={{position:"absolute", left:2, top:0, width:30, height:40, borderRadius:"50% 50% 42% 42%", background:"radial-gradient(circle at 50% 70%,#FBE6A0,#E7B24C 45%,#CF6a2c 80%)", filter:"blur(0.4px)", transform:`scaleY(${flick})`, boxShadow:"0 0 24px rgba(231,150,60,0.6)"}} />
      </div>
    );})}

    {/* ===================== GROUND / SAND (600..770) ===================== */}
    <div style={{position:"absolute", left:0, top:600, width:1012, height:192, background:"linear-gradient(180deg,#c9a86e 0%,#b8965b 60%,#a5824c 100%)", boxShadow:"inset 0 10px 22px rgba(90,60,20,0.28)"}} />
    {/* sand shading streaks for depth */}
    {Array.from({length:7}).map((_,i)=>(
      <div key={"sand"+i} style={{position:"absolute", left:40+i*140, top:640+((i%2)*22), width:120, height:10, borderRadius:6, background:"rgba(120,80,30,0.16)"}} />
    ))}

    {/* ===================== THE MACHINE (300..600) ===================== */}
    {/* machine assembly progress */}
    {(()=>{const build=over(lf,20,40,Easing.out(Easing.cubic));const rise=interpolate(build,[0,1],[40,0],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
    // speed ramps up after worker swap (~frame 138)
    const speed=interpolate(lf,[0,138,168,287],[1,1,2.0,2.4],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
    const belt=(lf*3.0*speed)%56;
    return (
    <div style={{position:"absolute", left:0, top:0, width:1012, height:792, opacity:build, transform:`translateY(${rise}px)`}}>

      {/* ---- FEED-IN CHUTE (left) ---- */}
      <div style={{position:"absolute", left:36, top:322, width:150, height:150}}>
        <div style={{position:"absolute", left:0, top:0, width:150, height:60, borderRadius:"16px 16px 8px 8px", background:"linear-gradient(180deg,#6a5540,#4a3826)", boxShadow:"0 6px 0 rgba(0,0,0,0.32), inset 0 6px 0 rgba(255,220,150,0.12)"}} />
        <div style={{position:"absolute", left:22, top:56, width:106, height:96, background:"linear-gradient(180deg,#5a4632,#3c2c1c)", clipPath:"polygon(0 0,100% 0,72% 100%,28% 100%)", boxShadow:"inset 0 0 14px rgba(0,0,0,0.45)"}} />
        <div style={{position:"absolute", left:14, top:-30, width:122, textAlign:"center", color:"#E7B24C", fontFamily:"monospace", fontWeight:800, fontSize:19, letterSpacing:1, textShadow:"0 2px 0 rgba(0,0,0,0.4)"}}>FEED IN</div>
      </div>

      {/* falling feed cards into the chute */}
      {["PAGE","AD","HOOK","EMAIL","PAGE","AD"].map((lbl,i)=>{const per=44/speed;const t=((lf+i*9)%per)/per;const drop=over(lf,26,6);
        return (
        <div key={"feed"+i} style={{position:"absolute", left:74+((i%2)*22), top:250+t*84, width:40, height:52, borderRadius:8, background:"linear-gradient(180deg,#F7F3EA,#E9E1CF)", border:"3px solid #E7B24C", boxShadow:"0 5px 0 rgba(90,60,20,0.30)", opacity:drop*interpolate(t,[0,0.82,1],[1,1,0],{extrapolateLeft:"clamp",extrapolateRight:"clamp"}), transform:`rotate(${(seed(i*7)-0.5)*24}deg)`}}>
          <div style={{position:"absolute", left:4, top:4, right:4, height:11, borderRadius:3, background:"#D2724E"}} />
          <div style={{position:"absolute", left:5, top:20, right:5, height:4, borderRadius:2, background:"rgba(60,50,40,0.28)"}} />
          <div style={{position:"absolute", left:5, top:28, right:12, height:4, borderRadius:2, background:"rgba(60,50,40,0.20)"}} />
          <div style={{position:"absolute", left:0, right:0, top:37, textAlign:"center", fontFamily:"monospace", fontWeight:800, fontSize:8, color:"#3A5C84"}}>{lbl}</div>
        </div>
      );})}

      {/* ---- CONVEYOR (thick rounded, rollers + teeth, perspective) ---- */}
      <div style={{position:"absolute", left:150, top:452, width:560, height:64, borderRadius:18, background:"linear-gradient(180deg,#3a4a5e,#26313e)", boxShadow:"0 10px 0 rgba(0,0,0,0.34), inset 0 5px 0 rgba(255,255,255,0.08)"}} />
      {/* moving belt teeth */}
      <div style={{position:"absolute", left:150, top:502, width:560, height:14, overflow:"hidden", borderRadius:"0 0 14px 14px"}}>
        {Array.from({length:16}).map((_,i)=>(
          <div key={"tooth"+i} style={{position:"absolute", left:(i*56-belt), top:2, width:26, height:10, borderRadius:4, background:"#5a6b7d", boxShadow:"inset 0 2px 0 rgba(255,255,255,0.12)"}} />
        ))}
      </div>
      {/* rollers */}
      {[150,690].map((x,i)=>(
        <div key={"roll"+i} style={{position:"absolute", left:x-4, top:456, width:36, height:56, borderRadius:18, background:"radial-gradient(circle at 40% 35%,#7C8DDA,#3a4a5e)", boxShadow:"0 8px 0 rgba(0,0,0,0.3)"}}>
          <div style={{position:"absolute", left:14, top:12, width:8, height:32, borderRadius:4, background:"rgba(0,0,0,0.35)", transform:`rotate(${(belt*6)+(i*40)}deg)`, transformOrigin:"50% 50%"}} />
        </div>
      ))}

      {/* cards riding the conveyor toward the gauntlet */}
      {Array.from({length:6}).map((_,i)=>{const per=52/speed;const t=((lf+i*(52/6))%per)/per;const x=170+t*330;const lbls=["AD","HOOK","EMAIL","PAGE","AD","HOOK"];
        // fade as it enters the funnel
        const near=interpolate(t,[0.78,1],[1,0],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
        return (
        <div key={"belt"+i} style={{position:"absolute", left:x, top:430, width:42, height:54, borderRadius:8, background:"linear-gradient(180deg,#F7F3EA,#E9E1CF)", border:"3px solid #E7B24C", boxShadow:"0 6px 0 rgba(90,60,20,0.28)", opacity:near, transform:`translateY(${Math.sin(lf*0.3+i)*2}px)`}}>
          <div style={{position:"absolute", left:4, top:4, right:4, height:12, borderRadius:3, background:"#D2724E"}} />
          <div style={{position:"absolute", left:0, right:0, top:38, textAlign:"center", fontFamily:"monospace", fontWeight:800, fontSize:8, color:"#3A5C84"}}>{lbls[i]}</div>
        </div>
      );})}

      {/* ---- THE GAUNTLET funnel (center) ---- */}
      {(()=>{const gp=over(lf,34,16);
        // spark flashes when a card passes (~every 52/speed frames)
        const per=52/speed;const phase=(lf%per)/per;const flash=interpolate(phase,[0.72,0.8,0.9],[0,1,0],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
        return (
        <div style={{position:"absolute", left:470, top:360, width:150, height:200, opacity:gp}}>
          {/* bracket intake top */}
          <div style={{position:"absolute", left:6, top:70, width:138, height:24, background:"#2c3a52", borderRadius:6, clipPath:"polygon(0 0,100% 0,74% 100%,26% 100%)"}} />
          {/* glowing funnel body */}
          <div style={{position:"absolute", left:30, top:92, width:90, height:96, background:"linear-gradient(180deg,#CF9544,#C44A3A)", clipPath:"polygon(0 0,100% 0,66% 100%,34% 100%)", boxShadow:`0 0 ${28+flash*30}px rgba(231,178,76,${0.5+flash*0.4})`, filter:"saturate(1.1)"}} />
          {/* inner glow core */}
          <div style={{position:"absolute", left:52, top:100, width:46, height:70, background:"radial-gradient(circle at 50% 30%,#FBE6A0,#E7B24C 60%,rgba(231,150,60,0))", clipPath:"polygon(0 0,100% 0,60% 100%,40% 100%)", opacity:0.6+flash*0.4}} />
          {/* bracket teeth on the intake */}
          {[36,90].map((x,i)=>(
            <div key={"br"+i} style={{position:"absolute", left:x, top:60, width:26, height:30, border:"5px solid #E7B24C", borderBottom:"none", borderRadius:"8px 8px 0 0", opacity:0.9}} />
          ))}
          {/* spark burst */}
          {flash>0.05 && Array.from({length:7}).map((_,k)=>{const ang=(k/7)*Math.PI*2;const r=14+flash*30;return (
            <div key={"spk"+k} style={{position:"absolute", left:75+Math.cos(ang)*r, top:118+Math.sin(ang)*r, width:6, height:6, borderRadius:3, background:"#FBE6A0", opacity:flash, boxShadow:"0 0 8px #E7B24C"}} />
          );})}
          {/* label */}
          <div style={{position:"absolute", left:-24, top:-4, width:200, textAlign:"center", color:"#F7F3EA", fontFamily:"serif", fontWeight:900, fontSize:24, letterSpacing:1, textShadow:"0 2px 0 rgba(0,0,0,0.5), 0 0 18px rgba(231,178,76,0.6)"}}>THE GAUNTLET</div>
        </div>
      );})()}

      {/* ---- BIG FABLE JUDGE cranking lever (steps aside after swap) ---- */}
      {(()=>{const swap=over(lf,120,26,Easing.inOut(Easing.cubic));const jx=interpolate(swap,[0,1],[646,712],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});const jScale=interpolate(swap,[0,1],[1,0.9],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});const jFade=interpolate(swap,[0,1],[1,0.85],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
        return (
        <div style={{position:"absolute", left:jx, top:398, transform:`scale(${jScale})`, transformOrigin:"50% 100%", opacity:jFade, zIndex:6}}>
          <Mascot lf={lf} size={124} judge stern gaze={interpolate(swap,[0,1],[-0.4,0.5],{extrapolateLeft:"clamp",extrapolateRight:"clamp"})} nodAmp={0.12} nodSpeed={1.4} />
        </div>
      );})()}

      {/* ---- SMALL CHEAP WORKER critter takes the crank ---- */}
      {(()=>{const arrive=over(lf,126,24,Easing.out(Easing.cubic));const wx=interpolate(arrive,[0,1],[560,632],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
        return (
        <div style={{position:"absolute", left:wx, top:452, transform:`scale(1)`, opacity:arrive, zIndex:7, filter:"saturate(0.62) brightness(0.96)"}}>
          <Mascot lf={lf} size={78} nodAmp={0.2} nodSpeed={2.4+((lf%40<20)?0.6:0)} gaze={-0.2} />
          {/* coin / cheap tag */}
          <div style={{position:"absolute", left:44, top:-14, background:"#3F9E74", color:"#F7F3EA", fontFamily:"monospace", fontWeight:800, fontSize:12, padding:"3px 8px", borderRadius:8, boxShadow:"0 3px 0 rgba(0,0,0,0.3)"}}>CHEAP</div>
          {/* little spinning coin */}
          <div style={{position:"absolute", left:-14, top:8, width:20, height:20, borderRadius:10, background:"radial-gradient(circle at 38% 34%,#FBE6A0,#E7B24C 65%,#C7A24E)", boxShadow:"0 2px 0 rgba(120,90,30,0.5)", transform:`scaleX(${Math.abs(Math.sin(lf*0.3))})`}} />
        </div>
      );})()}

      {/* ---- LEVER / CRANK (turns faster after swap) ---- */}
      {(()=>{const cp=over(lf,32,14);const crankAng=(lf*4.2*speed);
        return (
        <div style={{position:"absolute", left:604, top:492, width:60, height:60, opacity:cp, zIndex:5}}>
          <div style={{position:"absolute", left:24, top:24, width:16, height:16, borderRadius:8, background:"#3a4a5e", boxShadow:"0 4px 0 rgba(0,0,0,0.3)"}} />
          <div style={{position:"absolute", left:28, top:6, width:9, height:26, borderRadius:5, background:"#6a5540", transformOrigin:"50% 100%", transform:`rotate(${crankAng}deg)`, boxShadow:"0 0 0 rgba(0,0,0,0.2)"}}>
            <div style={{position:"absolute", left:-4, top:-8, width:18, height:16, borderRadius:6, background:"#E7B24C", boxShadow:"0 3px 0 rgba(120,90,30,0.4)"}} />
          </div>
        </div>
      );})()}

      {/* ---- FREE -> 1 CENT price tag (flips ~frame 120) ---- */}
      {(()=>{const flip=over(lf,118,20,Easing.inOut(Easing.cubic));const show=over(lf,40,10);
        const scaleX=Math.abs(Math.cos(flip*Math.PI));const isFree=flip<0.5;
        return (
        <div style={{position:"absolute", left:214, top:352, opacity:show, zIndex:8, transform:`scaleX(${0.14+scaleX*0.86})`, transformOrigin:"50% 50%"}}>
          {isFree ? (
            <div style={{background:"linear-gradient(180deg,#3A5C84,#2c466a)", color:"#F7F3EA", fontFamily:"serif", fontWeight:900, fontSize:26, padding:"8px 18px", borderRadius:12, boxShadow:"0 6px 0 rgba(0,0,0,0.3)", position:"relative"}}>
              FREE
              <div style={{position:"absolute", left:-8, top:16, width:14, height:14, borderRadius:7, background:"#1A1813", border:"2px solid #F7F3EA"}} />
            </div>
          ) : (
            <div style={{background:"linear-gradient(180deg,#3F9E74,#2f7d5b)", color:"#F7F3EA", fontFamily:"serif", fontWeight:900, fontSize:24, padding:"8px 16px", borderRadius:12, boxShadow:"0 6px 0 rgba(0,0,0,0.3), 0 0 22px rgba(63,158,116,0.5)", position:"relative", textAlign:"center"}}>
              1¢ <span style={{fontSize:12}}>run</span>
              <div style={{fontFamily:"monospace", fontWeight:700, fontSize:10, opacity:0.9, marginTop:-2}}>per run</div>
              <div style={{position:"absolute", left:-8, top:16, width:14, height:14, borderRadius:7, background:"#1A1813", border:"2px solid #F7F3EA"}} />
            </div>
          )}
        </div>
      );})()}

      {/* ---- OUTPUT: champion crowned cards ejecting right ---- */}
      {Array.from({length:5}).map((_,i)=>{const per=46/speed;const t=((lf+i*(46/5))%per)/per;const startF=60;if(lf<startF)return null;const x=700+t*150;const y=430-t*4;const eject=interpolate(t,[0,0.12,1],[0,1,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});const drop=interpolate(t,[0.55,1],[0,64],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
        return (
        <div key={"out"+i} style={{position:"absolute", left:x, top:y+drop, width:46, height:58, borderRadius:9, background:"linear-gradient(180deg,#FBF3D8,#F0E4BE)", border:"3px solid #E7B24C", boxShadow:"0 6px 0 rgba(120,90,30,0.35), 0 0 16px rgba(231,178,76,0.4)", opacity:eject, zIndex:4, transform:`rotate(${(t-0.5)*20}deg)`}}>
          {/* crown */}
          <div style={{position:"absolute", left:9, top:-13, width:28, height:14, background:"#E7B24C", clipPath:"polygon(0 100%,15% 30%,32% 70%,50% 10%,68% 70%,85% 30%,100% 100%)", filter:"drop-shadow(0 2px 0 rgba(120,90,30,0.5))"}} />
          {/* green check badge */}
          <div style={{position:"absolute", left:26, top:30, width:20, height:20, borderRadius:10, background:"#3F9E74", boxShadow:"0 2px 0 rgba(0,0,0,0.3)", display:"flex", alignItems:"center", justifyContent:"center", color:"#F7F3EA", fontWeight:900, fontSize:13}}>✓</div>
        </div>
      );})}

    </div>
    );})()}

    {/* ===================== OUTPUT PILE + COUNTER (right, 560..720) ===================== */}
    {(()=>{const pileStart=over(lf,70,20);
      // pile grows over time; more layers appear as counter climbs
      const grown=interpolate(lf,[70,138,287],[2,6,13],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
      const nLayers=Math.floor(grown);
      // pedestal base
      return (
      <div style={{position:"absolute", left:790, top:388, width:190, height:330, opacity:pileStart, zIndex:9}}>
        {/* pedestal */}
        <div style={{position:"absolute", left:20, top:246, width:150, height:40, borderRadius:12, background:"linear-gradient(180deg,#7a6244,#584330)", boxShadow:"0 8px 0 rgba(0,0,0,0.3), inset 0 4px 0 rgba(255,220,150,0.14)"}} />
        <div style={{position:"absolute", left:34, top:236, width:122, height:16, borderRadius:8, background:"#8a6f4c", boxShadow:"inset 0 3px 0 rgba(255,220,150,0.16)"}} />
        {/* stacked champion cards */}
        {Array.from({length:nLayers}).map((_,i)=>{const app=over(lf,72+i*13,10);const w=118-i*3;const off=(seed(i*3)-0.5)*16;return (
          <div key={"pile"+i} style={{position:"absolute", left:36+((190-w)/2)-36+off, top:224-i*17, width:w, height:20, borderRadius:6, background:"linear-gradient(180deg,#FBF3D8,#EAD8A0)", border:"2.5px solid #E7B24C", boxShadow:"0 3px 0 rgba(120,90,30,0.3), 0 0 10px rgba(231,178,76,0.3)", opacity:app, transform:`translateY(${interpolate(app,[0,1],[-10,0],{extrapolateLeft:"clamp",extrapolateRight:"clamp"})}px) rotate(${off*0.4}deg)`}}>
            <div style={{position:"absolute", left:6, top:6, width:8, height:8, borderRadius:4, background:"#3F9E74"}} />
          </div>
        );})}
        {/* top crown on the pile */}
        {(()=>{const topY=224-(nLayers-1)*17-16;const cp=over(lf,90,14);return (
          <div style={{position:"absolute", left:70, top:topY, width:44, height:22, background:"#E7B24C", clipPath:"polygon(0 100%,15% 30%,32% 70%,50% 8%,68% 70%,85% 30%,100% 100%)", opacity:cp, filter:"drop-shadow(0 3px 0 rgba(120,90,30,0.5)) drop-shadow(0 0 12px rgba(231,178,76,0.6))"}} />
        );})()}
        {/* counter */}
        {(()=>{const cShow=over(lf,74,12);const count=Math.round(interpolate(lf,[74,138,168,287],[0,12,22,58],{extrapolateLeft:"clamp",extrapolateRight:"clamp"}));const pulse=1+0.04*Math.sin(lf*0.5);return (
          <div style={{position:"absolute", left:-6, top:-8, width:200, textAlign:"center", opacity:cShow}}>
            <div style={{fontFamily:"monospace", fontWeight:800, fontSize:12, letterSpacing:2, color:"#3F9E74"}}>CHAMPIONS</div>
            <div style={{fontFamily:"serif", fontWeight:900, fontSize:56, color:"#F7F3EA", textShadow:"0 3px 0 rgba(0,0,0,0.4), 0 0 20px rgba(231,178,76,0.55)", transform:`scale(${pulse})`}}>{count}</div>
          </div>
        );})()}
      </div>
    );})()}

    {/* ===================== PUNCHY LABELS (escalating) ===================== */}
    {/* "every launch runs through it" under the machine */}
    {(()=>{const l=over(lf,54,14);return (
      <div style={{position:"absolute", left:150, top:548, width:420, opacity:l, transform:`translateY(${interpolate(l,[0,1],[10,0],{extrapolateLeft:"clamp",extrapolateRight:"clamp"})}px)`, fontFamily:"sans-serif", fontWeight:800, fontSize:17, color:"#ECE9E2", textShadow:"0 2px 0 rgba(0,0,0,0.4)"}}>every launch runs through it</div>
    );})()}
    {/* "1 cent per run" appears with the flip */}
    {(()=>{const l=over(lf,132,14);return (
      <div style={{position:"absolute", left:150, top:576, opacity:l, background:"linear-gradient(180deg,#3F9E74,#2f7d5b)", color:"#F7F3EA", fontFamily:"monospace", fontWeight:800, fontSize:15, padding:"5px 12px", borderRadius:9, boxShadow:"0 4px 0 rgba(0,0,0,0.3)"}}>1 cent per run</div>
    );})()}
    {/* "runs for months" appears late */}
    {(()=>{const l=over(lf,200,16);const pulse=1+0.03*Math.sin(lf*0.4);return (
      <div style={{position:"absolute", left:320, top:576, opacity:l, transform:`scale(${pulse})`, transformOrigin:"left center", background:"linear-gradient(180deg,#CF9544,#b87d2e)", color:"#1A1813", fontFamily:"monospace", fontWeight:900, fontSize:15, padding:"5px 12px", borderRadius:9, boxShadow:"0 4px 0 rgba(90,60,20,0.4), 0 0 16px rgba(231,178,76,0.4)"}}>runs for months</div>
    );})()}

    {/* rising ember particles for atmosphere (escalate density late) */}
    {Array.from({length:18}).map((_,i)=>{const density=interpolate(lf,[0,168,287],[8,14,18],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});if(i>=density)return null;const per=80+seed(i*5)*60;const t=((lf+i*17)%per)/per;const x=90+seed(i*3)*820;const y=700-t*380;return (
      <div key={"emb"+i} style={{position:"absolute", left:x+Math.sin(lf*0.05+i)*10, top:y, width:5, height:5, borderRadius:3, background:i%3===0?"#E7B24C":"#CF6a2c", opacity:interpolate(t,[0,0.2,0.85,1],[0,0.8,0.5,0],{extrapolateLeft:"clamp",extrapolateRight:"clamp"}), boxShadow:"0 0 6px rgba(231,150,60,0.6)"}} />
    );})}
  </>
);

const Hook: React.FC<{ lf: number }> = ({ lf }) => <Panel label=""><HookBody lf={lf} /><ScreenHead lf={lf} big="GET A PROVEN" clay="WINNER" chip={false} /><BigCountdown lf={lf} /></Panel>;
const Reframe: React.FC<{ lf: number }> = ({ lf }) => <Panel label=""><ReframeBody lf={lf} /><ScreenHead lf={lf} big="FABLE PICKS" clay="THE WINNER" /></Panel>;
const Arena: React.FC<{ lf: number }> = ({ lf }) => <Panel label=""><ArenaBody lf={lf} /><ScreenHead lf={lf} big="20 FIGHT," clay="1 WINS" /></Panel>;
const Outlast: React.FC<{ lf: number }> = ({ lf }) => <Panel label=""><OutlastBody lf={lf} /><ScreenHead lf={lf} big="TEST EVERY" clay="LAUNCH" /></Panel>;

// ============================ END MINT SCENES ============================ ============================ ============================ ============================ ============================

const CTA: React.FC<{ lf: number }> = ({ lf }) => {
  const inP = over(lf, 0.06, fr(0.22), Easing.out(Easing.back(1.4)));
  const kw = "ARENA"; const typed = Math.floor(over(lf, fr(0.2), fr(0.5)) * kw.length);
  const arrowBob = Math.abs(Math.sin(lf / 5)) * 14; const kwPulse = 1 + Math.sin(lf / 3.4) * 0.05;
  return (
    <AbsoluteFill style={{ opacity: Math.min(1, inP * 1.3) }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 366, textAlign: "center", transform: `scale(${inP})` }}><span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 30, color: SLATE }}>the exact setup</span></div>
      <div style={{ position: "absolute", left: 220, right: 220, top: 440, transform: `scale(${inP})`, transformOrigin: "50% 0%" }}>
        <div style={{ borderRadius: 22, background: WIN, boxShadow: "0 30px 60px -20px rgba(10,16,34,0.5)", overflow: "hidden", border: "1px solid #E2D8C6" }}>
          <div style={{ height: 84, background: grad("#E9825C", "#C7541F"), display: "flex", alignItems: "center", padding: "0 26px", gap: 12 }}><ClaudeLogo lf={lf} size={34} /><div><div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 20, color: "rgba(255,255,255,0.85)" }}>THE ARENA SETUP</div><div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 27, color: "#fff" }}>one prompt, a proven winner</div></div></div>
          <div style={{ padding: "18px 28px", display: "flex", flexDirection: "column", gap: 11 }}>{["The tournament prompt", "The head-to-head scoring rubric", "The breed-and-stress-test loop"].map((t, i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 24, color: INK }}><span style={{ width: 28, height: 28, borderRadius: 8, background: GREEN, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>✓</span>{t}</div>)}</div>
        </div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 796 + arrowBob, display: "flex", justifyContent: "center", opacity: inP }}><div style={{ width: 0, height: 0, borderLeft: "17px solid transparent", borderRight: "17px solid transparent", borderTop: `22px solid ${CLAY}` }} /></div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 856, textAlign: "center", transform: `scale(${inP})` }}>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 30, color: MUTE, marginBottom: 10 }}>comment</div>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 108, color: CLAY, letterSpacing: "-0.02em", lineHeight: 1, textShadow: `0 0 40px rgba(210,114,78,0.45)`, transform: `scale(${kwPulse})` }}>ARENA</div>
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
  const VIRT = 38.85;
  const p = Math.min(1, t / VIRT);
  const marks = [10.0, 20.0, 31.0];
  const STARS = [4.0, 15.0, 26.0, 35.0];
  const TOTAL = VIRT;
  const PELLETS = [2, 7, 12, 18, 23, 29, 34, 38];
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

export const ClaudeArenaReel: React.FC = () => {
  const frame = useCurrentFrame();
  let punch = 0;
  for (const b of Lf.slice(1)) { const d = frame - b; if (d >= 0 && d < 9) punch = Math.max(punch, Math.pow(1 - d / 9, 2)); }
  const KICKS = [0.46, 0.7, 1.1, L[1] + 2.4, L[1] + 5.2, L[2] + 0.4, L[2] + 1.0, L[2] + 9.4, L[2] + 11.0, L[3] + 0.5, L[3] + 4.7, L[4] + 0.2, CLOCK_START + 1, CLOCK_START + 2, CLOCK_START + 3];
  for (const k of KICKS) { const d = frame - fr(k); if (d >= 0 && d < 7) punch = Math.max(punch, Math.pow(1 - d / 7, 2) * 0.7); }
  const zoom = interpolate(frame, [0, 16, 28], [1.0, 1.02, 1.0], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) }) + punch * 0.028;
  const scene = (i: number) => frame >= Lf[i] && (i === Lf.length - 1 || frame < Lf[i + 1]);
  return (
    <AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
      <Audio src={staticFile("vo_arena.wav")} />
      <Audio loop src={staticFile("seo_music.wav")} volume={(ff) => interpolate(ff, [0, fr(1.4), fr(CUT) - 18, fr(CUT), 99999], [0, 0.11, 0.11, 0.05, 0.05], { extrapolateRight: "clamp" })} />
      {/* ===== HOOK: riser -> gavel SLAM -> eruption -> 20 cards crash ===== */}
      <Sfx at={0} src="metal_riser.wav" v={0.4} dur={1.5} />
      <Sfx at={0.46} src="boom.wav" v={0.42} /><Sfx at={0.48} src="crash.wav" v={0.28} /><Sfx at={0.5} src="whoosh.wav" v={0.36} dur={0.6} /><Sfx at={0.52} src="crowd_cheer.wav" v={0.22} dur={1.8} />
      {[0.62, 0.86, 1.1, 1.34, 1.58].map((t, i) => <Sfx key={`hcr${i}`} at={t} src="impact.wav" v={0.22} />)}
      <Sfx at={1.9} src="twang.wav" v={0.22} dur={0.3} /><Sfx at={2.0} src="alarm.wav" v={0.18} dur={0.6} /><Sfx at={2.9} src="ding.wav" v={0.3} /><Sfx at={2.95} src="sparkle.wav" v={0.22} dur={0.6} />
      {/* ===== REFRAME: writer frenzy -> TRANSFORM (riser) -> judging gavel bangs -> winner ===== */}
      {[0.4, 0.9, 1.4, 1.9, 2.4].map((d, i) => <Sfx key={`rw${i}`} at={L[1] + d} src="blip1.wav" v={0.16} dur={0.2} />)}
      <Sfx at={L[1] + 2.9} src="screech.wav" v={0.24} dur={0.4} /><Sfx at={L[1] + 3.0} src="thock.wav" v={0.3} />
      <Sfx at={L[1] + 3.2} src="riser.wav" v={0.4} dur={1.6} /><Sfx at={L[1] + 4.5} src="sparkle.wav" v={0.3} dur={0.8} /><Sfx at={L[1] + 4.6} src="ding.wav" v={0.32} />
      {[5.4, 5.9, 6.4, 6.9, 7.4, 7.9].map((d, i) => <Sfx key={`rj${i}`} at={L[1] + d} src="thock.wav" v={0.24} />)}
      <Sfx at={L[1] + 8.6} src="ding.wav" v={0.36} /><Sfx at={L[1] + 8.7} src="sparkle.wav" v={0.26} dur={0.7} /><Sfx at={L[1] + 8.8} src="crowd_cheer.wav" v={0.18} dur={1.0} />
      {/* ===== ARENA (lf-scaled): drop -> burst -> clashes -> RISER -> CHAMPION ===== */}
      <Sfx at={L[2] + 0.46} src="fling.wav" v={0.36} /><Sfx at={L[2] + 1.15} src="crash.wav" v={0.28} /><Sfx at={L[2] + 1.2} src="pop.wav" v={0.24} dur={0.4} />
      {[2.5, 4.0, 5.5, 7.0, 8.4].map((d, i) => <Sfx key={`acl${i}`} at={L[2] + d} src="impact.wav" v={0.22} />)}
      <Sfx at={L[2] + 10.4} src="riser.wav" v={0.44} dur={1.6} />
      <Sfx at={L[2] + 12.15} src="boom.wav" v={0.46} /><Sfx at={L[2] + 12.2} src="crowd_cheers2.wav" v={0.3} dur={2.0} /><Sfx at={L[2] + 12.27} src="angelic.wav" v={0.26} dur={1.4} /><Sfx at={L[2] + 12.45} src="shimmer.wav" v={0.3} dur={1.4} />
      {/* ===== OUTLAST (lf-scaled): machine + champions + price flip + build riser ===== */}
      <Sfx at={L[3] + 0.5} src="construction.wav" v={0.2} dur={1.4} /><Sfx at={L[3] + 0.6} src="swooshup.wav" v={0.28} />
      {[2.7, 4.0, 5.4].map((d, i) => <Sfx key={`co${i}`} at={L[3] + d} src="ding.wav" v={0.2} />)}
      <Sfx at={L[3] + 5.3} src="snap.wav" v={0.28} /><Sfx at={L[3] + 5.35} src="alarm.wav" v={0.16} dur={0.4} />
      <Sfx at={L[3] + 6.6} src="riser.wav" v={0.3} dur={1.2} />
      {[6.9, 8.2, 9.4].map((d, i) => <React.Fragment key={`co2${i}`}><Sfx at={L[3] + d} src="ding.wav" v={0.22} /><Sfx at={L[3] + d + 0.02} src="sparkle.wav" v={0.12} dur={0.3} /></React.Fragment>)}
      {/* ===== CTA ===== */}
      <Sfx at={L[4]} src="resolve.wav" v={0.46} /><Sfx at={L[4] + 0.4} src="ding.wav" v={0.28} /><Sfx at={L[4] + 0.55} src="sparkle.wav" v={0.26} dur={0.7} />
      {/* progress-bar pellet ticks + clock */}
      {[2, 7, 12, 18, 23, 29, 34, 38].map((tt, i) => <Sfx key={`pt${i}`} at={tt} src="tick.wav" v={0.09} dur={0.2} />)}
      {[0, 1, 2].map((n) => <Sfx key={`clk${n}`} at={CLOCK_START + n} src="tick.wav" v={0.14} dur={0.2} />)}<Sfx at={L[1] + 7.2} src="ding.wav" v={0.34} />
      {/* ARENA: drop -> burst -> clashes -> finale -> champion */}
      <Sfx at={L[2] + 0.4} src="thock.wav" v={0.44} /><Sfx at={L[2] + 1.0} src="pop.wav" v={0.34} dur={0.5} />
      {[2.2, 3.0, 3.8, 4.6, 5.4, 6.2, 7.0].map((d, i) => <Sfx key={`ac${i}`} at={L[2] + d} src="swish.wav" v={0.28} dur={0.3} />)}
      {[2.6, 3.4, 4.2, 5.0, 5.8, 6.6].map((d, i) => <Sfx key={`ae${i}`} at={L[2] + d} src="tick.wav" v={0.24} dur={0.2} />)}
      <Sfx at={L[2] + 8.4} src="riser.wav" v={0.42} dur={1.4} /><Sfx at={L[2] + 10.0} src="thock.wav" v={0.5} /><Sfx at={L[2] + 10.15} src="ding.wav" v={0.4} /><Sfx at={L[2] + 10.35} src="shimmer.wav" v={0.34} dur={1.2} />
      {/* OUTLAST: machine + champions out + price flip */}
      <Sfx at={L[3] + 0.5} src="swooshup.wav" v={0.3} />
      {[1.5, 2.5, 3.5, 5.0, 6.0, 7.0, 8.0].map((d, i) => <Sfx key={`ml${i}`} at={L[3] + d} src="tick.wav" v={0.2} dur={0.2} />)}
      {[2.0, 3.0, 4.0, 5.5, 6.5, 7.5].map((d, i) => <Sfx key={`co${i}`} at={L[3] + d} src="ding.wav" v={0.2} />)}<Sfx at={L[3] + 4.6} src="blip1.wav" v={0.3} dur={0.4} />
      {/* CTA */}
      <Sfx at={L[4]} src="resolve.wav" v={0.5} />
      {[2, 6, 11, 16, 21, 26, 30, 33].map((tt, i) => <Sfx key={`pt${i}`} at={tt} src="tick.wav" v={0.1} dur={0.2} />)}
      {[0, 1, 2].map((n) => <Sfx key={`clk${n}`} at={CLOCK_START + n} src="tick.wav" v={0.18} dur={0.2} />)}

      <Bg />
      <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "50% 46%" }}>
        {scene(0) ? <Hook lf={frame - Lf[0]} /> : null}
        {scene(1) ? <Reframe lf={frame - Lf[1]} /> : null}
        {scene(2) ? <Arena lf={(frame - Lf[2]) * 0.905} /> : null}
        {scene(3) ? <Outlast lf={(frame - Lf[3]) * 0.905} /> : null}
        {scene(4) ? <ClockCTA lf={frame - Lf[4]} /> : null}
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
