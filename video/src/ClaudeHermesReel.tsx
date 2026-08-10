import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing, Audio, Sequence, staticFile, Img } from "remotion";
import { fraunces, inter } from "./fonts";
import words from "./data/words_hermes.json";

const CREAM = "#ECE9E2", INK = "#1A1813", SLATE = "#3A5C84", CLAY = "#D2724E", AMBER = "#CF9544", GOLD = "#E7B24C", GREEN = "#3F9E74", MUTE = "#9A968B", RED = "#C44A3A";
// animation palette — bright, saturated, playful (for the top storytelling screen)
const CORAL = "#F2895F", TEAL = "#2FB79A", SKY = "#5AA0DE", SUN = "#F5BE47", GRAPE = "#9E76CF", MINT = "#6FD3AE", ROSE = "#EE7E86";
const TERM = "#0E1626", TERM2 = "#0A1120", PAPER = "#F7F3EA", META = "#0866FF", METALO = "#0A5AE0";
const mono = "ui-monospace,'SF Mono',Menlo,monospace";
const FPS = 30;
const fr = (s: number) => Math.round(s * FPS);
const grad = (a: string, b: string) => `linear-gradient(158deg, ${a} 0%, ${b} 100%)`;
const NAVYSH = "0 34px 66px -22px rgba(18,28,58,0.55), 0 10px 24px rgba(18,28,58,0.30)";



// beat onsets (sec, measured from slash_vo.wav): hook / feed+compare / creep / rank / script / monthly / cta
const L = [0.0, 2.75, 9.42, 16.93, 22.08, 25.03, 31.33, 38.63, 44.95];
const Lf = L.map(fr);
const CUT = 49.69;


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

const Pill: React.FC<{ text: string; x: number; y: number; o?: number }> = ({ text, x, y, o = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, opacity: o, padding: "7px 16px", borderRadius: 999, background: "rgba(20,30,52,0.9)", border: "1.5px solid rgba(150,170,215,0.4)", fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 22, color: "rgba(190,205,235,0.92)", display: "flex", gap: 8, alignItems: "center", boxShadow: "0 8px 20px -8px rgba(0,0,0,0.6)", whiteSpace: "nowrap" }}>
    <span style={{ fontSize: 18 }}>◍</span>{text}
  </div>
);

const Chip: React.FC<{ text: string; bg: string; bd: string; fg: string; size?: number }> = ({ text, bg, bd, fg, size = 40 }) => (
  <div style={{ padding: `${size * 0.34}px ${size * 0.7}px`, borderRadius: 18, background: bg, border: `3px solid ${bd}`, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: size, color: fg, boxShadow: `0 18px 40px -14px rgba(10,16,34,0.7)`, whiteSpace: "nowrap", letterSpacing: "-0.01em" }}>{text}</div>
);

// ============================== the big dark game-screen PANEL (house chassis — single hero per scene) ==============================
// diorama coords are Panel-local: 1012 wide × 792 tall, cx≈506, floor≈700.
const Panel: React.FC<{ children?: React.ReactNode; tint?: string; label?: string }> = ({ children, tint, label }) => (
  <div style={{ position: "absolute", left: 34, right: 34, top: 384, height: 792, borderRadius: 40, background: grad(TERM, TERM2), boxShadow: NAVYSH, overflow: "hidden", border: `2px solid ${tint || "rgba(120,150,210,0.22)"}` }}>
    <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 2px 0 rgba(255,255,255,0.06), inset 0 0 130px rgba(0,0,0,0.45)" }} />
    <div style={{ position: "absolute", left: 30, top: 26, display: "flex", gap: 12, alignItems: "center", zIndex: 60 }}>
      {[RED, AMBER, GREEN].map((c, i) => <div key={i} style={{ width: 15, height: 15, borderRadius: "50%", background: c, opacity: 0.9 }} />)}
      {label && <div style={{ marginLeft: 14, fontFamily: mono, fontSize: 22, color: "rgba(190,205,235,0.6)" }}>{label}</div>}
    </div>
    {children}
  </div>
);

const Mascot: React.FC<{ lf: number; size?: number; gaze?: number; nodAmp?: number; nodSpeed?: number; shock?: number; cheer?: number; stern?: number; glasses?: number; brainHat?: number; sherlock?: number; wizard?: number; judge?: number; cop?: number; beard?: number; zuck?: number; zuckChain?: number; zuckCurly?: number; wang?: number; bikini?: number; prof?: number; girl?: number; suit?: number; dino?: number; constr?: number; chef?: number; robber?: number }> = ({ lf, size = 250, gaze = 0, nodAmp = 3.5, nodSpeed = 10, shock = 0, cheer = 0, stern = 0, glasses = 0, brainHat = 0, sherlock = 0, wizard = 0, judge = 0, cop = 0, beard = 0, zuck = 0, zuckChain = 0, zuckCurly = 0, wang = 0, bikini = 0, prof = 0, girl = 0, suit = 0, dino = 0, constr = 0, chef = 0, robber = 0 }) => {
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
        {/* robber: black beanie + eye-mask band (eyes draw on top) + striped jumper */}
        {robber > 0 && <>
          <rect x={34} y={30} width={132} height={20} fill="#22262E" />
          <rect x={34} y={46} width={132} height={5} fill="#15181E" />
          <rect x={34} y={60} width={132} height={28} fill="#22262E" />
          <rect x={60} y={63} width={34} height={22} fill="#E8E4DA" />
          <rect x={106} y={63} width={34} height={22} fill="#E8E4DA" />
          <rect x={34} y={106} width={132} height={40} fill="#E8E4DA" />
          <rect x={34} y={108} width={132} height={9} fill="#22262E" />
          <rect x={34} y={126} width={132} height={9} fill="#22262E" />
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


const Sfx: React.FC<{ at: number; src: string; v?: number; dur?: number }> = ({ at, src, v = 0.35, dur = 2.2 }) => {
  const D = fr(dur);
  return (
    <Sequence from={fr(at)} durationInFrames={D}>
      <Audio src={staticFile(`sfx/${src}`)} volume={(f) => interpolate(f, [0, 1, Math.max(2, D - 6), D - 1], [0, v, v, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
    </Sequence>
  );
};

// ---------------- the PYRAMID set (shared by scenes) ----------------

const ChatWindow: React.FC<{ lf: number; prompt: string; gatedFrom: number; children?: React.ReactNode; h?: number; w?: number; x?: number }> = ({ lf, prompt, gatedFrom, children, h = 470, w = 700, x = 190 }) => {
  const winP = lf <= 0 ? 1 : Math.max(0.92, over(lf, 0, fr(0.2), Easing.out(Easing.cubic)));  // window solid at scene start
  const typedFrac = lf <= 0 ? 0.55 : Math.min(1, 0.55 + over(lf, 0, fr(0.4), Easing.linear) * 0.45);  // prompt already ~half-typed at open
  const typed = Math.floor(typedFrac * prompt.length);
  const shown = prompt.slice(0, typed);
  const sent = lf <= 0 ? 1 : Math.max(0.85, over(lf, 0, fr(0.22), Easing.out(Easing.cubic)));  // reply zone present at open
  return (
    <div style={{ position: "absolute", left: x, top: 14, transform: `translateY(${(1 - winP) * 12}px)`, width: w, height: h, borderRadius: 20, background: "#211F1C", border: "1.5px solid #35322C", boxShadow: NAVYSH, overflow: "hidden", opacity: winP, zIndex: 5 }}>
      {/* claude.ai top bar: window dots + centered wordmark + model selector */}
      <div style={{ height: 50, background: "#1A1917", borderBottom: "1px solid #302D28", display: "flex", alignItems: "center", padding: "0 16px", gap: 10 }}>
        <div style={{ display: "flex", gap: 7 }}>{["#E86C5A", "#E0A94A", "#4CAF7D"].map((c, i) => <div key={i} style={{ width: 11, height: 11, borderRadius: "50%", background: c, opacity: 0.9 }} />)}</div>
        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", gap: 8 }}>
          <ClaudeLogo lf={lf} size={22} />
          <span style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 19, color: "#D8D1C4" }}>Claude</span>
        </div>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 14, color: "#9A9384", padding: "5px 11px", borderRadius: 9, background: "#2A2723", border: "1px solid #3A362F", display: "inline-flex", gap: 6, alignItems: "center" }}>Fable 5 <span style={{ fontSize: 10, color: "#6E685C" }}>&#9662;</span></span>
      </div>
      {/* conversation */}
      <div style={{ padding: "16px 20px 0" }}>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 13 }}>
          <div style={{ maxWidth: 546, padding: "12px 16px", borderRadius: 16, borderBottomRightRadius: 5, background: "#302D27", border: "1px solid #3C382F", boxShadow: "0 4px 12px -6px rgba(0,0,0,0.4)" }}>
            <span style={{ fontFamily: inter.fontFamily, fontSize: 18, lineHeight: 1.46, color: "#EDE6D8" }}>
              {shown.slice(0, gatedFrom)}
              {typed > gatedFrom && <span style={{ filter: "blur(5px)", color: "#B8AE9C" }}>{shown.slice(gatedFrom)}</span>}
              {typed < prompt.length && <span style={{ opacity: (lf % 18) < 10 ? 1 : 0.12, color: "#D97757", fontWeight: 700 }}>|</span>}
            </span>
            {typed >= prompt.length && <div style={{ marginTop: 8, display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 11px", borderRadius: 999, background: "rgba(217,119,87,0.15)" }}><span style={{ fontSize: 13 }}>&#128274;</span><span style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 14, color: "#D97757" }}>full prompt in the guide &middot; comment SLASH</span></div>}
          </div>
        </div>
        {sent > 0.05 && <div style={{ display: "flex", gap: 12, opacity: sent, transform: `translateY(${(1 - sent) * 8}px)` }}>
          <div style={{ flexShrink: 0, marginTop: 2 }}><ClaudeLogo lf={lf} size={26} /></div>
          <div style={{ flex: 1 }}>{children}</div>
        </div>}
      </div>
      {/* compose bar (realism) */}
      <div style={{ position: "absolute", left: 16, right: 16, bottom: 13, height: 42, borderRadius: 13, background: "#262420", border: "1.5px solid #38342C", display: "flex", alignItems: "center", padding: "0 14px", gap: 10 }}>
        <span style={{ fontFamily: inter.fontFamily, fontSize: 15, color: "#6E685C", flex: 1 }}>Reply to Claude&hellip;</span>
        <div style={{ width: 29, height: 29, borderRadius: 9, background: grad("#E9825C", "#C7541F"), display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 15, fontWeight: 900 }}>&uarr;</div>
      </div>
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
    const lastw = w.word.trim().toLowerCase().replace(/[^a-z']/g, "");
    const dangling = ["i", "a", "the", "to", "of", "and", "is", "it", "an", "you"].includes(lastw);
    if ((cur.length >= 3 || gap > 0.34 || endsSent) && !(dangling && !endsSent && next)) { out.push({ words: cur, start: cur[0].start, end: w.end }); cur = []; }
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
          <span key={i} style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 74, lineHeight: 1.12, letterSpacing: "-0.01em", color: on ? (active ? "#B8501F" : CLAY) : "rgba(120,56,26,0.5)", transform: active ? "translateY(-3px) scale(1.04)" : "none", display: "inline-block", textShadow: "0 2px 12px rgba(255,251,244,0.9), 0 1px 2px rgba(120,56,26,0.35)" }}>{w.word.trim()}</span>); })}
      </div>
    </div>
  );
};


// ============================== SLASH (reel 41) — TWO-SCREEN STACKED FORMAT ==============================
// Screen A (top, abstract sprite storytelling) + Screen B (bottom, practical real UI), captions below B.
// Panels are PANEL-LOCAL coords: 0..PANEL_H vertical, 0..1012 horizontal, cx = 506.

const PANEL_H = 420;
const A_TOP = 360, B_TOP = 806;

const PanelShell: React.FC<{ top: number; children?: React.ReactNode; tint?: string; label?: string; light?: boolean; theme?: string[] }> = ({ top, children, tint, label, light, theme = [CORAL, TEAL, SUN] }) => {
  const f = useCurrentFrame();
  if (light) {
    return (
      <div style={{ position: "absolute", left: 34, right: 34, top, height: PANEL_H, borderRadius: 34, background: "linear-gradient(158deg, #FFF6E6 0%, #FCE9D6 56%, #FBE2EC 100%)", boxShadow: NAVYSH, overflow: "hidden", border: `2px solid ${tint || "rgba(255,255,255,0.6)"}` }}>
        <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 2px 0 rgba(255,255,255,0.7), inset 0 0 80px rgba(255,214,168,0.28)", pointerEvents: "none" }} />
        {/* colorful drifting blobs */}
        <div style={{ position: "absolute", left: -70 + Math.sin(f / 42 + top) * 30, top: -60, width: 380, height: 380, borderRadius: "50%", background: `radial-gradient(closest-side, ${theme[0]}66, transparent 72%)`, filter: "blur(4px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: -50 - Math.sin(f / 36 + top) * 26, top: 30, width: 340, height: 340, borderRadius: "50%", background: `radial-gradient(closest-side, ${theme[1]}5A, transparent 72%)`, filter: "blur(4px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: "38%", bottom: -140, width: 420, height: 320, borderRadius: "50%", background: `radial-gradient(closest-side, ${theme[2]}4E, transparent 74%)`, filter: "blur(6px)", pointerEvents: "none" }} />
        {/* light sweep */}
        <div style={{ position: "absolute", top: -20, bottom: -20, left: ((f * 4 + top) % 1400) - 260, width: 220, background: "linear-gradient(100deg, transparent, rgba(255,255,255,0.22), transparent)", filter: "blur(22px)", pointerEvents: "none" }} />
        {/* floating sparkle motes */}
        {Array.from({ length: 11 }).map((_, i) => { const sx = (i * 137 % 1000) / 1000, sy = (i * 331 % 1000) / 1000; const yy = PANEL_H + 10 - ((f * 0.3 + sy * (PANEL_H + 20)) % (PANEL_H + 30)); return <div key={i} style={{ position: "absolute", left: 30 + sx * 940, top: yy, width: 4, height: 4, borderRadius: "50%", background: "rgba(255,255,255,0.9)", opacity: 0.3 + 0.45 * Math.sin(f / 18 + i * 1.3 + top), boxShadow: "0 0 7px rgba(255,236,200,0.8)", pointerEvents: "none" }} />; })}
        {label && <div style={{ position: "absolute", left: 26, top: 18, fontFamily: mono, fontSize: 19, color: "rgba(110,84,52,0.5)", zIndex: 2 }}>{label}</div>}
        {children}
      </div>
    );
  }
  return (
    <div style={{ position: "absolute", left: 34, right: 34, top, height: PANEL_H, borderRadius: 34, background: grad("#2A2118", "#17110B"), boxShadow: NAVYSH, overflow: "hidden", border: `2px solid ${tint || "rgba(210,150,90,0.24)"}` }}>
      <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 2px 0 rgba(255,241,220,0.07), inset 0 0 110px rgba(0,0,0,0.5)" }} />
      <div style={{ position: "absolute", left: "50%", top: "50%", width: 760, height: 420, marginLeft: -380, marginTop: -210, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(210,120,70,0.12), transparent 70%)", opacity: 0.6 + 0.25 * Math.sin(f / 22 + top), pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: -20, bottom: -20, left: ((f * 4 + top) % 1400) - 260, width: 200, background: "linear-gradient(100deg, transparent, rgba(240,200,140,0.06), transparent)", filter: "blur(24px)", pointerEvents: "none" }} />
      {Array.from({ length: 10 }).map((_, i) => { const sx = (i * 137 % 1000) / 1000, sy = (i * 331 % 1000) / 1000; const yy = PANEL_H + 10 - ((f * 0.3 + sy * (PANEL_H + 20)) % (PANEL_H + 30)); return <div key={i} style={{ position: "absolute", left: 30 + sx * 940, top: yy, width: 3, height: 3, borderRadius: "50%", background: "rgba(235,190,130,0.35)", opacity: 0.25 + 0.35 * Math.sin(f / 18 + i * 1.3 + top), pointerEvents: "none" }} />; })}
      {label && <div style={{ position: "absolute", left: 26, top: 18, fontFamily: mono, fontSize: 19, color: "rgba(235,215,190,0.5)", zIndex: 2 }}>{label}</div>}
      {children}
    </div>
  );
};

// scene kicker (inside screen A, top-left) — 1-3 word mute label
const Kicker: React.FC<{ lf: number; text: string; tone?: string }> = ({ lf, text, tone = CLAY }) => {
  const p = lf <= 0 ? 1 : Math.max(0.9, over(lf, 0, fr(0.35), Easing.out(Easing.back(1.6))));
  return (
    <div style={{ position: "absolute", left: 26, top: 16, zIndex: 30, transform: `scale(${p})`, transformOrigin: "left top" }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "7px 18px", borderRadius: 999, background: grad("#3A2E20", "#241B10"), border: `2.5px solid ${tone}`, boxShadow: "0 10px 26px -8px rgba(0,0,0,0.6)" }}>
        <span style={{ width: 11, height: 11, borderRadius: "50%", background: tone, boxShadow: `0 0 10px ${tone}` }} />
        <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 27, letterSpacing: "0.02em", color: "#F3E8D6" }}>{text}</span>
      </div>
    </div>
  );
};

// numbered move chip (screen B, top-right) — earns "all four prompts" at the CTA
const MoveChip: React.FC<{ lf: number; n: number; at?: number; label: string }> = ({ lf, n, at = 0.2, label }) => {
  const p = over(lf, fr(at), fr(0.4), Easing.out(Easing.back(2)));
  if (p <= 0.01) return null;
  return (
    <div style={{ position: "absolute", right: 24, top: 16, zIndex: 30, transform: `scale(${p})`, transformOrigin: "right top" }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "7px 16px", borderRadius: 999, background: grad("#2E4A38", "#1B2E22"), border: "2.5px solid #4CAF7D", boxShadow: "0 0 18px rgba(76,175,125,0.35)" }}>
        <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 24, color: "#8FE0B0" }}>PROMPT {n}/4</span>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 19, color: "rgba(210,235,215,0.85)" }}>{label}</span>
      </div>
    </div>
  );
};

// -------- shared sprites --------
// a bill with a face (the recurring character of screen A)
const BillSprite: React.FC<{ lf: number; w?: number; label?: string; price?: string; mood?: "smug" | "scared" | "happy"; tone?: string; grow?: number; horns?: boolean; mustache?: boolean; sweat?: boolean; crown?: boolean }> = ({ lf, w = 150, label = "BILL", price, mood = "smug", tone = "#E8DFCE", grow = 1, horns = false, mustache = false, sweat = false, crown = false }) => {
  const h = w * 1.28;
  const bob = Math.sin(lf / 11 + w) * 3;
  const eyeY = mood === "scared" ? -2 : 0;
  const browTilt = mood === "smug" ? -12 : mood === "scared" ? 16 : 0;
  return (
    <div style={{ position: "relative", width: w, height: h, transform: `translateY(${bob}px) scale(${grow})`, transformOrigin: "50% 100%" }}>
      {/* horns */}
      {horns && [-1, 1].map((s, i) => <div key={`hn${i}`} style={{ position: "absolute", left: s < 0 ? "4%" : "80%", top: -w * 0.1, width: 0, height: 0, borderLeft: `${w * 0.055}px solid transparent`, borderRight: `${w * 0.055}px solid transparent`, borderBottom: `${w * 0.17}px solid #8E2F22`, transform: `rotate(${s * 24}deg)`, zIndex: 1, filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.4))" }} />)}
      {crown && <div style={{ position: "absolute", left: "50%", top: -w * 0.2, transform: "translateX(-50%)", fontSize: w * 0.28, zIndex: 3, filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.35))" }}>👑</div>}
      {/* body with dimensional shading */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 14, background: tone, border: "3px solid rgba(40,26,12,0.5)", boxShadow: "0 18px 38px -12px rgba(0,0,0,0.5)", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(255,255,255,0.42) 0%, transparent 28%, transparent 64%, rgba(0,0,0,0.22) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(125deg, rgba(255,255,255,0.34) 0%, transparent 32%)" }} />
      </div>
      <div style={{ position: "absolute", left: "12%", right: "12%", top: "9%", height: w * 0.1, borderRadius: 4, background: "rgba(35,22,10,0.6)" }} />
      {[0.30, 0.42].map((yy, i) => <div key={i} style={{ position: "absolute", left: "14%", width: `${46 - i * 10}%`, top: `${yy * 100}%`, height: w * 0.045, borderRadius: 3, background: "rgba(35,22,10,0.28)" }} />)}
      {/* face — googly eyes */}
      {[-1, 1].map((s, i) => (
        <div key={i} style={{ position: "absolute", left: `${50 + s * 16 - 7}%`, top: `${56 + eyeY}%`, width: w * 0.14, height: w * 0.16, borderRadius: "50%", background: "#fff", border: "2px solid rgba(35,22,10,0.45)", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: "46%", height: "46%", borderRadius: "50%", background: "#241B10", transform: `translate(${mood === "scared" ? 0 : s}px, ${mood === "scared" ? -1 : 1}px)` }} />
        </div>
      ))}
      {[-1, 1].map((s, i) => <div key={`b${i}`} style={{ position: "absolute", left: `${50 + s * 16 - 9}%`, top: "49%", width: w * 0.18, height: 5, borderRadius: 2, background: "#241B10", transform: `rotate(${s * browTilt}deg)` }} />)}
      <div style={{ position: "absolute", left: "50%", top: "74%", width: mood === "scared" ? w * 0.12 : w * 0.2, height: mood === "scared" ? w * 0.12 : 5, marginLeft: mood === "scared" ? -w * 0.06 : -w * 0.1, borderRadius: mood === "scared" ? "50%" : 3, background: "#241B10", ...(mood === "happy" ? { height: w * 0.09, borderRadius: "0 0 999px 999px" } : {}) }} />
      {/* villain mustache */}
      {mustache && [-1, 1].map((s, i) => <div key={`m${i}`} style={{ position: "absolute", left: `${50 + s * 6 - 5}%`, top: "67%", width: w * 0.13, height: w * 0.055, borderRadius: s < 0 ? "70% 10% 40% 60%" : "10% 70% 60% 40%", background: "#241B10", transform: `rotate(${s * 10}deg)` }} />)}
      {/* sweat drop */}
      {sweat && <div style={{ position: "absolute", right: "6%", top: `${32 + ((lf * 2) % 42)}%`, width: w * 0.08, height: w * 0.11, borderRadius: "50% 50% 60% 60%", background: "#9FD3F0", opacity: 0.9, boxShadow: "0 0 4px rgba(120,190,230,0.6)" }} />}
      <div style={{ position: "absolute", left: "50%", bottom: -14, transform: "translateX(-50%)", padding: "3px 12px", borderRadius: 999, background: grad("#3A2E20", "#241B10"), border: "2px solid rgba(240,200,140,0.55)", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: w * 0.11, color: "#F3E8D6", whiteSpace: "nowrap", boxShadow: "0 6px 14px -4px rgba(0,0,0,0.5)" }}>{label}</div>
      {price && <div style={{ position: "absolute", left: "50%", top: -16, transform: "translateX(-50%) rotate(-4deg)", padding: "3px 11px", borderRadius: 9, background: grad("#C44A3A", "#992E22"), fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: w * 0.14, color: "#fff", boxShadow: "0 8px 18px -6px rgba(0,0,0,0.6)", whiteSpace: "nowrap", zIndex: 4 }}>{price}</div>}
    </div>
  );
};

// realistic provider bill document (screen B hero, scenes 0 & 2)
const BillDoc: React.FC<{ lf: number; circleAt?: number; sticker?: boolean; graph?: boolean; w?: number }> = ({ lf, circleAt = 0.1, sticker = false, graph = false, w = 620 }) => {
  const drawn = over(lf, fr(circleAt), fr(0.7));
  const rows = graph ? [["Blast! Internet — 400 Mbps", "$89.99"]] : [
    ["Blast! Internet — 400 Mbps", "$89.99"],
    ["Equipment rental", "$14.00"],
    ["Taxes, fees & surcharges", "$8.42"],
  ];
  const gp = graph ? over(lf, fr(0.5), fr(2.2), Easing.inOut(Easing.cubic)) : 0;
  const pts = [[0, 49], [1, 59], [2, 69], [3, 79], [4, 89]];
  const gx = (i: number) => 30 + i * 118, gy = (v: number) => 118 - (v - 45) * 1.8;
  const GP = pts.map(([i, v]) => [gx(i), gy(v)]);
  const smoothD = (() => { let d = `M ${GP[0][0]} ${GP[0][1]}`; for (let i = 0; i < GP.length - 1; i++) { const p0 = GP[i - 1] || GP[i], p1 = GP[i], p2 = GP[i + 1], p3 = GP[i + 2] || p2; d += ` C ${p1[0] + (p2[0] - p0[0]) / 6} ${p1[1] + (p2[1] - p0[1]) / 6} ${p2[0] - (p3[0] - p1[0]) / 6} ${p2[1] - (p3[1] - p1[1]) / 6} ${p2[0]} ${p2[1]}`; } return d; })();
  const seg = Math.min(GP.length - 1.0001, Math.max(0, gp) * (GP.length - 1)), ek = Math.floor(seg), ef = seg - ek;
  const endDot = [GP[ek][0] + (GP[ek + 1][0] - GP[ek][0]) * ef, GP[ek][1] + (GP[ek + 1][1] - GP[ek][1]) * ef];
  return (
    <div style={{ position: "relative", width: w, borderRadius: 18, overflow: "hidden", background: "#FDFBF6", border: "2px solid #D8D0BE", boxShadow: NAVYSH }}>
      <div style={{ height: 56, background: "#121212", display: "flex", alignItems: "center", padding: "0 22px", gap: 10 }}>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 26, color: "#fff", letterSpacing: -0.5 }}>xfinity</span>
        <div style={{ flex: 1 }} />
        <span style={{ fontFamily: mono, fontSize: 15, color: "rgba(255,255,255,0.65)" }}>statement · Jul 2026</span>
      </div>
      <div style={{ padding: "14px 22px 16px" }}>
        <div style={{ fontFamily: mono, fontSize: 14, color: "#8A8272", marginBottom: 8 }}>ACCOUNT 8471 03 · AUTOPAY ON</div>
        {rows.map((r, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid #EAE3D2", position: "relative" }}>
            <span style={{ fontFamily: inter.fontFamily, fontWeight: i === 0 ? 800 : 600, fontSize: 20, color: i === 0 ? "#20180E" : "#6E664F" }}>{r[0]}</span>
            <span style={{ fontFamily: mono, fontWeight: 700, fontSize: 21, color: i === 0 ? "#20180E" : "#6E664F" }}>{r[1]}</span>
            {i === 0 && (
              <svg width="150" height="52" viewBox="0 0 150 52" style={{ position: "absolute", right: -34, top: -9, overflow: "visible" }}>
                <g style={{ transform: `scale(${1 + Math.sin(over(lf, fr(circleAt + 0.75), fr(0.35)) * Math.PI) * 0.07})`, transformOrigin: "75px 26px" }}>
                  <ellipse cx="75" cy="26" rx="66" ry="22" fill="none" stroke={RED} strokeWidth="5" strokeLinecap="round" strokeDasharray={290} strokeDashoffset={290 * (1 - drawn)} transform="rotate(-3 75 26)" style={{ filter: "drop-shadow(0 2px 5px rgba(196,74,58,0.5))" }} />
                </g>
                {drawn > 0 && drawn < 1 && <circle cx={75 + 66 * Math.cos(drawn * Math.PI * 2)} cy={26 + 22 * Math.sin(drawn * Math.PI * 2)} r="6" fill={RED} transform="rotate(-3 75 26)" style={{ filter: "drop-shadow(0 0 6px rgba(196,74,58,0.8))" }} />}
              </svg>
            )}
          </div>
        ))}
        {!graph && <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 9 }}>
          <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 21, color: "#20180E" }}>Total due</span>
          <span style={{ fontFamily: mono, fontWeight: 800, fontSize: 22, color: "#20180E" }}>$112.41</span>
        </div>}
        {graph && (
          <div style={{ marginTop: 10, borderRadius: 12, background: "#F4EEDF", border: "1.5px solid #E2D9C2", padding: "8px 10px 4px", position: "relative" }}>
            <svg width={w - 66} height="140" viewBox={`0 0 ${w - 66} 140`}>
              <path d={smoothD} fill="none" stroke={RED} strokeWidth="7" strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - gp} style={{ filter: "drop-shadow(0 2px 6px rgba(196,74,58,0.4))" }} />
              {gp > 0.03 && <circle cx={endDot[0]} cy={endDot[1]} r={gp >= 0.99 ? 8 : 7} fill={RED} style={{ filter: "drop-shadow(0 0 8px rgba(196,74,58,0.85))" }} />}
              {pts.map(([i], k) => <text key={`t${k}`} x={gx(i)} y="136" textAnchor="middle" fontFamily={mono} fontSize="14" fill="#8A8272">{2022 + k}</text>)}
              {gp > 0.05 && <text x={gx(0)} y={gy(49) - 12} textAnchor="middle" fontFamily={mono} fontWeight="800" fontSize="17" fill={GREEN}>$49</text>}
              {gp > 0.92 && <text x={gx(4)} y={gy(89) - 12} textAnchor="middle" fontFamily={mono} fontWeight="900" fontSize="19" fill={RED}>$89</text>}
            </svg>
            <div style={{ position: "absolute", right: 12, top: 8, padding: "3px 10px", borderRadius: 999, background: "rgba(196,74,58,0.12)", border: `1.5px solid ${RED}`, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 15, color: RED }}>creeping up every year</div>
          </div>
        )}
      </div>
      {sticker && (() => { const sp = over(lf, fr(0.55), fr(0.35), Easing.out(Easing.back(2.4))); return (
        <div style={{ position: "absolute", left: 352, top: 140, transform: `rotate(-6deg) scale(${sp})`, transformOrigin: "center", padding: "7px 14px", borderRadius: 12, background: grad("#C44A3A", "#992E22"), border: "3px solid #E8B7AC", boxShadow: "0 14px 30px -8px rgba(0,0,0,0.55)" }}>
          <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 25, color: "#fff", lineHeight: 1.05, textAlign: "center" }}>$40/mo<br /><span style={{ fontSize: 16, opacity: 0.92 }}>TOO HIGH</span></div>
        </div>); })()}
    </div>
  );
};

// ================================ SCREEN A BODIES (abstract) ================================

// A0 — HOOK: mascot slashes a giant bill in half, coins burst, "-$500/yr" chip
// ============================== HERMES (reel 59) — TWO-SCREEN STACKED ==============================
// A = STORY (top, bright sprite theatre) · B = PROOF (top-dark real UI). Panel-local 0..1012 x 0..420, cx=506.
const HGOLD = "#E7B24C", HPUR = "#9E76CF", HGRN = "#4CAF7D";
// dark proof app-window (fills the bottom panel), one focal element + big number
const Win: React.FC<{ lf: number; app: string; accent?: string; children?: React.ReactNode }> = ({ lf, app, accent = SKY, children }) => {
  const p = lf <= 0 ? 1 : Math.max(0.94, over(lf, 0, fr(0.22), Easing.out(Easing.cubic)));
  return (
    <div style={{ position: "absolute", left: 78, top: 14, width: 856, height: 392, borderRadius: 18, background: "#1C1A17", border: "1.5px solid #34302A", boxShadow: NAVYSH, overflow: "hidden", opacity: p, transform: `translateY(${(1 - p) * 10}px)`, zIndex: 5 }}>
      <div style={{ height: 44, background: "#161513", borderBottom: "1px solid #2E2B26", display: "flex", alignItems: "center", padding: "0 15px", gap: 9 }}>
        {["#E86C5A", "#E0A94A", "#4CAF7D"].map((c, i) => <div key={i} style={{ width: 11, height: 11, borderRadius: "50%", background: c, opacity: 0.9 }} />)}
        <span style={{ marginLeft: 8, width: 9, height: 9, borderRadius: 2, background: accent }} />
        <span style={{ fontFamily: mono, fontSize: 17, color: "#9A9384" }}>{app}</span>
      </div>
      <div style={{ position: "relative", height: 348 }}>{children}</div>
    </div>
  );
};
// big receipt number (bottom panel focal)
const Receipt: React.FC<{ big: string; sub?: string; x?: number; y?: number; c?: string; s?: number }> = ({ big, sub, x = 506, y = 210, c = HGRN, s = 92 }) => (
  <div style={{ position: "absolute", left: x, top: y, transform: "translate(-50%,-50%)", textAlign: "center", zIndex: 8 }}>
    <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: s, color: c, lineHeight: 0.9, textShadow: `0 0 24px ${c}55` }}>{big}</div>
    {sub && <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 22, color: "rgba(220,225,235,0.7)", marginTop: 10 }}>{sub}</div>}
  </div>
);
// a faceted gem (RPG trophy)
const Gem: React.FC<{ s?: number; c?: string }> = ({ s = 54, c = HGRN }) => (
  <svg viewBox="0 0 60 68" width={s} height={s * 1.13} style={{ filter: `drop-shadow(0 0 10px ${c}aa)` }}>
    <polygon points="30,2 56,22 30,66 4,22" fill={c} /><polygon points="30,2 56,22 30,26 4,22" fill="rgba(255,255,255,0.45)" /><polygon points="4,22 30,26 30,66" fill="rgba(0,0,0,0.14)" />
  </svg>
);
// a sweeping shine across the panel
const Glint: React.FC<{ lf: number; at: number; dur: number }> = ({ lf, at, dur }) => {
  const p = over(lf, fr(at), fr(dur), Easing.inOut(Easing.cubic));
  if (p <= 0 || p >= 1) return null;
  return <div style={{ position: "absolute", left: -200 + p * 1400, top: -40, width: 160, height: 500, transform: "rotate(16deg)", background: "linear-gradient(90deg, transparent, rgba(255,250,235,0.5), transparent)", filter: "blur(4px)", zIndex: 30, pointerEvents: "none" }} />;
};
// a glass fishbowl with the Claude mascot as a goldfish inside
const Fishbowl: React.FC<{ lf: number; faint?: number }> = ({ lf, faint = 0 }) => (
  <div style={{ position: "relative", width: 260, height: 240 }}>
    <div style={{ position: "absolute", left: 20, bottom: 0, width: 220, height: 200, borderRadius: "0 0 50% 50% / 0 0 46% 46%", background: "linear-gradient(180deg, rgba(150,210,235,0.28), rgba(120,180,220,0.5))", border: "5px solid rgba(210,235,245,0.7)", boxShadow: "inset 0 8px 22px rgba(255,255,255,0.4)" }} />
    <div style={{ position: "absolute", left: 60, top: 0, width: 140, height: 26, borderRadius: "50%", border: "5px solid rgba(210,235,245,0.75)" }} />
    {/* goldfish = mascot tinted orange + fins */}
    <div style={{ position: "absolute", left: 62, top: 54, transform: `rotate(${faint ? 175 : Math.sin(lf / 12) * 6}deg) translateY(${faint ? 34 : 0}px)`, transformOrigin: "50% 60%" }}>
      <svg viewBox="0 0 120 120" width={132} height={132} style={{ overflow: "visible" }}>
        <polygon points="8,60 -22,38 -22,82" fill="#E8862C" /><polygon points="60,10 44,-14 78,-14" fill="#E8862C" />
        <rect x={20} y={30} width={80} height={62} rx={20} fill="#F0972F" />
        <rect x={20} y={30} width={80} height={12} rx={6} fill="rgba(255,255,255,0.25)" />
        {faint ? <><path d="M40 60 l14 14 M54 60 l-14 14" stroke="#3A2410" strokeWidth={5} strokeLinecap="round" /><path d="M78 60 l14 14 M92 60 l-14 14" stroke="#3A2410" strokeWidth={5} strokeLinecap="round" /></>
          : <><rect x={40} y={54} width={13} height={16} fill="#2A1B0E" /><rect x={78} y={54} width={13} height={16} fill="#2A1B0E" /></>}
      </svg>
    </div>
    {faint === 0 && [0, 1, 2].map((k) => <div key={k} style={{ position: "absolute", left: 150 + k * 8, top: 70 - ((lf * 2 + k * 20) % 60), width: 8 - k * 2, height: 8 - k * 2, borderRadius: "50%", background: "rgba(255,255,255,0.6)" }} />)}
  </div>
);

const A0: React.FC<{ lf: number }> = ({ lf }) => {
  const slam = lf >= fr(0.55);
  const drain = over(lf, fr(0.6), fr(0.5));
  const faint = over(lf, fr(1.0), fr(0.4));
  const curX = interpolate(over(lf, 0, fr(0.55), Easing.in(Easing.cubic)), [0, 1], [820, 660]);
  return (
    <>
      <Kicker lf={lf} text="GOLDFISH" tone={SKY} />
      {/* the chat window taped to a laptop */}
      <div style={{ position: "absolute", left: 560, top: 96, width: 360, height: 230, borderRadius: 14, background: "#20303F", border: "5px solid #38506A", zIndex: 4 }}>
        <div style={{ position: "absolute", left: 14, top: 12, right: 14, height: 22, borderRadius: 6, background: "rgba(255,255,255,0.14)" }} />
        {[0, 1, 2].map((k) => <div key={k} style={{ position: "absolute", left: 14, top: 44 + k * 22, width: 200 - k * 40, height: 10, borderRadius: 5, background: "rgba(255,255,255,0.16)", opacity: 1 - drain }} />)}
        {/* red X close button */}
        <div style={{ position: "absolute", right: 10, top: 8, width: 34, height: 34, borderRadius: "50%", background: slam ? "#E0503C" : "#C44A3A", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: 22, transform: `scale(${slam ? 0.86 : 1})` }}>×</div>
      </div>
      {/* giant cursor mid-swing at the X */}
      <div style={{ position: "absolute", left: curX, top: 60, zIndex: 20, transform: `rotate(-24deg) scale(${slam ? 0.9 : 1})` }}><svg viewBox="0 0 40 52" width={70} height={90}><polygon points="2,2 2,44 13,34 20,50 27,47 20,31 34,31" fill="#fff" stroke="#1A1813" strokeWidth={2.5} /></svg></div>
      {/* memory thought-bubble draining */}
      <div style={{ position: "absolute", left: 150, top: 40, zIndex: 12, opacity: 1 - drain, transform: `scale(${1 - drain * 0.2})` }}>
        <div style={{ width: 150, height: 96, borderRadius: 22, background: "#fff", border: "3px solid #E6DCC8", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: "0 8px 18px rgba(0,0,0,0.12)" }}>{["🗂️", "🎨", "📏"].map((e, i) => <span key={i} style={{ fontSize: 30 }}>{e}</span>)}</div>
        <div style={{ position: "absolute", left: 20, top: 92, width: 18, height: 18, borderRadius: "50%", background: "#fff", border: "3px solid #E6DCC8" }} />
      </div>
      {drain > 0.5 && <div style={{ position: "absolute", left: 190, top: 34, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 40, color: "#C44A3A", zIndex: 13, transform: `scale(${over(lf, fr(0.9), fr(0.3), Easing.out(Easing.back(1.8)))})` }}>???</div>}
      {/* the goldfish */}
      <div style={{ position: "absolute", left: 120, top: 150, zIndex: 10 }}><Fishbowl lf={lf} faint={faint > 0.5 ? 1 : 0} /></div>
      <div style={{ position: "absolute", left: 130, bottom: 6, width: 250, height: 20, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(40,30,18,0.18), transparent 70%)" }} />
    </>
  );
};
const B0: React.FC<{ lf: number }> = ({ lf }) => (
  <Win lf={lf} app="Claube — New chat" accent="#E86C5A">
    <div style={{ position: "absolute", left: 20, top: 16, display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 12px", borderRadius: 999, background: "rgba(196,74,58,0.16)", border: "1px solid rgba(196,74,58,0.5)" }}><span style={{ width: 8, height: 8, borderRadius: "50%", background: "#E0503C" }} /><span style={{ fontFamily: mono, fontSize: 16, color: "#F0A9A0" }}>chat closed → reopened</span></div>
    <Receipt big="0" sub="messages remembered · Memory 0 KB" c="#E0503C" y={170} s={130} />
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 22, textAlign: "center", fontFamily: mono, fontSize: 17, color: "rgba(220,200,190,0.55)" }}>🐟 AttentionSpan: 3 sec</div>
  </Win>
);

const A1: React.FC<{ lf: number }> = ({ lf }) => {
  const slot = lf >= fr(1.4);
  const lvl = Math.min(47, Math.floor(over(lf, fr(1.6), fr(1.4)) * 47));
  const xp = over(lf, fr(1.6), fr(1.4));
  return (
    <>
      <Kicker lf={lf} text="REAL MEMORY" tone={HGRN} />
      {/* the mascot with a winged courier helmet slamming a cartridge into its head-port */}
      <div style={{ position: "absolute", left: 280, top: 92, zIndex: 10 }}>
        <Mascot lf={lf} size={230} gaze={0} nodAmp={slot ? 3 : 1.5} shock={slot && lf < fr(1.6) ? 0.5 : 0} />
        {/* winged helmet */}
        <svg viewBox="0 0 140 90" width={150} height={96} style={{ position: "absolute", left: 40, top: -30, zIndex: 12 }}><path d="M30 60 q40 -54 80 0 z" fill="#E7B24C" stroke="#B8862A" strokeWidth={3} /><rect x={28} y={56} width={84} height={10} rx={4} fill="#C9932A" /><path d="M24 46 q-26 -8 -30 -30 q22 6 34 24z" fill="#F4EEE2" stroke="#C9BFA8" strokeWidth={2.5} /><path d="M116 46 q26 -8 30 -30 q-22 6 -34 24z" fill="#F4EEE2" stroke="#C9BFA8" strokeWidth={2.5} /></svg>
        {/* HERMES cartridge slamming into a temple port */}
        {lf < fr(1.5) && <div style={{ position: "absolute", left: interpolate(over(lf, fr(0.5), fr(0.9), Easing.in(Easing.cubic)), [0, 1], [-120, 6]), top: 30, zIndex: 14 }}><div style={{ width: 84, height: 58, borderRadius: 7, background: grad("#F0B49B", "#D97757"), border: "3px solid #A65B3E", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: mono, fontWeight: 900, fontSize: 15, color: "#3A211A", boxShadow: "0 0 14px rgba(231,178,76,0.8)" }}>HERMES</div>{[0, 1, 2, 3].map((k) => <div key={k} style={{ position: "absolute", bottom: -6, left: 12 + k * 18, width: 7, height: 8, background: "#C9A24A" }} />)}</div>}
      </div>
      {/* save-slots lighting up */}
      <div style={{ position: "absolute", left: 560, top: 96, display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, width: 300, zIndex: 8 }}>{Array.from({ length: 12 }).map((_, i) => { const on = xp > i / 12; return <div key={i} style={{ height: 40, borderRadius: 7, background: on ? grad("#8FD0F5", "#2F7FC9") : "#DCE6EE", border: "2px solid rgba(0,0,0,0.06)", boxShadow: on ? "0 0 10px rgba(90,160,222,0.6)" : "none", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: "#0E3A5E" }}>{on ? "✓" : ""}</div>; })}</div>
      {/* XP bar + LV (blue 8-bit — INSTALL palette, distinct from S3 green LOOP) */}
      <div style={{ position: "absolute", left: 560, top: 250, width: 300, zIndex: 8 }}>
        <div style={{ height: 26, borderRadius: 999, background: "#DCE6EE", overflow: "hidden", border: "2px solid rgba(0,0,0,0.06)" }}><div style={{ height: "100%", width: `${xp * 100}%`, background: grad("#8FD0F5", "#2F7FC9") }} /></div>
        <div style={{ marginTop: 8, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 40, color: "#2F7FC9" }}>LV. {lvl}</div>
      </div>
      {slot && <Glint lf={lf} at={1.4} dur={0.5} />}
    </>
  );
};
const B1: React.FC<{ lf: number }> = ({ lf }) => (
  <Win lf={lf} app="memory.md — hermes" accent={HGRN}>
    <div style={{ position: "absolute", left: 22, top: 18, fontFamily: mono, fontSize: 18, color: "rgba(200,235,215,0.8)", lineHeight: 1.7 }}>{["✓ prefers no em-dashes", "✓ ships reels to Drive, not Downloads", "✓ house-chassis reels only", "✓ learning your style…"].map((t, i) => <div key={i} style={{ opacity: over(lf, fr(0.3 + i * 0.35), fr(0.3)) }}>{t}<span style={{ opacity: i === 3 && (lf % 16) < 8 ? 1 : 0, color: HGRN }}>_</span></div>)}</div>
    <div style={{ position: "absolute", right: 22, top: 18, textAlign: "right" }}><div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 70, color: HGRN }}>47</div><div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 20, color: "rgba(220,225,235,0.7)" }}>memories</div><div style={{ marginTop: 8, display: "inline-block", padding: "3px 10px", borderRadius: 8, background: "rgba(76,175,125,0.18)", fontFamily: mono, fontSize: 16, color: "#8FE0B0" }}>+18 today</div></div>
  </Win>
);

const A2: React.FC<{ lf: number }> = ({ lf }) => {
  const wake = lf >= fr(0.1);
  const burn = over(lf, fr(1.2), fr(2.0));
  const rake = lf >= fr(4.0) && lf < fr(5.2);
  const bonk = lf >= fr(4.4) && lf < fr(4.7);
  return (
    <>
      <Kicker lf={lf} text="GROUNDHOG DAY" tone={ROSE} />
      {/* jumbo flip-clock 6:00 AGAIN */}
      <div style={{ position: "absolute", left: 60, top: 40, zIndex: 12 }}>
        <div style={{ width: 200, height: 96, borderRadius: 12, background: "#1A1712", border: "3px solid #3A342A", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 58, color: "#F2C14E", transform: `scale(${bonk ? 1.05 : 1})` }}>6:00</div>
        <div style={{ marginTop: 6, textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 26, color: "#EE7E86" }}>AGAIN</div>
      </div>
      {/* amnesiac mascot bolts up, re-reads MY SETUP scroll */}
      <div style={{ position: "absolute", left: 360, top: 120, zIndex: 10, transform: `translateY(${wake ? 0 : 40}px)` }}><Mascot lf={lf} size={210} gaze={-2} nodAmp={2} shock={bonk ? 0.6 : 0} /></div>
      <div style={{ position: "absolute", left: 320, top: 100, width: 70, height: 230, background: "#F4EDDC", border: "3px solid #C9B98E", borderRadius: 6, zIndex: 9 }}>{[0, 1, 2, 3, 4].map((k) => <div key={k} style={{ position: "absolute", left: 10, top: 14 + k * 26, width: 46, height: 6, borderRadius: 3, background: "#B8A882" }} />)}<div style={{ position: "absolute", left: 8, top: 6, fontFamily: mono, fontSize: 11, color: "#8A7A5A" }}>MY SETUP</div></div>
      {/* burning token coins */}
      <div style={{ position: "absolute", left: 590, top: 210, zIndex: 11 }}>{Array.from({ length: 6 }).map((_, i) => <div key={i} style={{ position: "absolute", left: (i % 3) * 34, top: Math.floor(i / 3) * 30, width: 40, height: 40, borderRadius: "50%", background: grad("#F5D06A", "#C9932A"), border: "2px solid #B8862A", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 18, color: "#8A6420" }}>$</div>)}{burn > 0.1 && [0, 1, 2, 3, 4].map((k) => <div key={k} style={{ position: "absolute", left: 6 + k * 22, top: -30 - Math.abs(Math.sin(lf / 4 + k)) * 26, width: 16, height: 34, borderRadius: "50% 50% 40% 40%", background: k % 2 ? "#FF7A1A" : "#F2C14E", opacity: burn, filter: "blur(1px)" }} />)}</div>
      {/* the same rake to the face */}
      {rake && <div style={{ position: "absolute", left: 560, top: 250, zIndex: 14 }}><svg viewBox="0 0 40 120" width={40} height={120} style={{ transform: `rotate(${bonk ? -30 : 0}deg)` }}><rect x={16} y={20} width={8} height={100} fill="#8A6844" /><rect x={2} y={12} width={36} height={10} fill="#6E5A3C" />{[0, 1, 2, 3].map((k) => <rect key={k} x={4 + k * 10} y={2} width={4} height={14} fill="#6E5A3C" />)}</svg>{bonk && <div style={{ position: "absolute", left: -20, top: -10, fontSize: 40 }}>💥</div>}</div>}
    </>
  );
};
const B2: React.FC<{ lf: number }> = ({ lf }) => (
  <Win lf={lf} app="Claube — New chat (again)" accent="#E86C5A">
    <div style={{ position: "absolute", left: 22, top: 18, display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 12px", borderRadius: 8, background: "#242017", border: "1px solid #3A342A", fontFamily: mono, fontSize: 16, color: "#C9B98E" }}>📎 my-setup-context.md · 47 lines (re-pasted)</div>
    <Receipt big="$0.94" sub="wasted · 47,102 tokens · 3rd time today" c="#E0A94A" y={150} s={84} />
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 26, textAlign: "center" }}><span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 8, background: "rgba(196,74,58,0.16)", border: "1px solid rgba(196,74,58,0.5)", fontFamily: mono, fontSize: 18, color: "#F0A9A0" }}>● BUG #17 — REOPENED <span style={{ opacity: 0.7 }}>(you fixed this yesterday)</span></span></div>
  </Win>
);

const A3: React.FC<{ lf: number }> = ({ lf }) => {
  const save = over(lf, fr(0.8), fr(0.7), Easing.in(Easing.cubic));
  const load = over(lf, fr(2.6), fr(0.8), Easing.out(Easing.cubic));
  return (
    <>
      <Kicker lf={lf} text="SAVE + RELOAD" tone={HGRN} />
      {/* knight mascot on a glowing save pad */}
      <div style={{ position: "absolute", left: 130, top: 150, zIndex: 10 }}><Mascot lf={lf} size={200} gaze={2} nodAmp={2} /></div>
      <div style={{ position: "absolute", left: 120, bottom: 24, width: 220, height: 40, borderRadius: "50%", background: `radial-gradient(ellipse, ${HGRN}88, transparent 70%)`, zIndex: 8 }} />
      {/* floppy disk hovering, two-way beam */}
      <div style={{ position: "absolute", left: 470, top: 60, zIndex: 12, transform: `translateY(${Math.sin(lf / 10) * 6}px)` }}>
        <svg viewBox="0 0 100 100" width={130} height={130}><rect x={8} y={8} width={84} height={84} rx={8} fill="#2E7452" stroke="#1E4A38" strokeWidth={4} /><rect x={24} y={8} width={44} height={30} fill="#1E4A38" /><rect x={54} y={12} width={9} height={20} fill="#8FE0B0" /><rect x={22} y={50} width={56} height={34} rx={3} fill="#D8F0E2" /></svg>
      </div>
      {/* gems: green worked + red didn't */}
      <div style={{ position: "absolute", left: 380, top: 220, zIndex: 11, opacity: 1 - save, transform: `translateY(${save * -120}px) scale(${1 - save})` }}><Gem s={54} c={HGRN} /></div>
      <div style={{ position: "absolute", left: 620, top: 220, zIndex: 11, opacity: 1 - save, transform: `translateY(${save * -120}px) scale(${1 - save})` }}><Gem s={54} c="#C44A3A" /></div>
      {/* reload beam pours back */}
      {load > 0 && <div style={{ position: "absolute", left: 300, top: 90, width: 60, height: 200, background: `linear-gradient(180deg, ${HGRN}, transparent)`, opacity: load * (1 - load) * 4, zIndex: 9, filter: "blur(3px)" }} />}
      <div style={{ position: "absolute", left: 500, top: 300, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 30, color: save > 0.9 && load < 0.5 ? "#2E7452" : "rgba(46,116,82,0.35)", zIndex: 13 }}>{load > 0.4 ? "LOADED ↺" : "SAVED ✓"}</div>
    </>
  );
};
const B3: React.FC<{ lf: number }> = ({ lf }) => (
  <Win lf={lf} app="hermes-memory.md" accent={HGRN}>
    <div style={{ position: "absolute", left: 22, top: 16, fontFamily: mono, fontSize: 18, lineHeight: 1.7 }}>
      <div style={{ color: "#C9B98E", opacity: over(lf, fr(0.2), fr(0.3)) }}>## job #0472 — auth-refactor ✅</div>
      <div style={{ color: "#8FE0B0", opacity: over(lf, fr(0.6), fr(0.3)) }}>+ worked: reused session helper → one-shot</div>
      <div style={{ color: "#F0A9A0", opacity: over(lf, fr(1.0), fr(0.3)) }}>+ avoid: DON'T regen schema (broke 3 tests yesterday)</div>
    </div>
    <div style={{ position: "absolute", right: 22, bottom: 22, textAlign: "right" }}><div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 56, color: HGRN }}>47 → 48</div><div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 20, color: "rgba(220,225,235,0.7)" }}>entries · +1 saved (0.3s)</div></div>
    <div style={{ position: "absolute", left: 22, bottom: 22, display: "inline-flex", gap: 8, padding: "6px 12px", borderRadius: 8, background: "rgba(76,175,125,0.16)", fontFamily: mono, fontSize: 16, color: "#8FE0B0" }}>↺ 48 loaded before next job</div>
  </Win>
);

// ============================== HERMES A4-A7 / B4-B7 / CTA ==============================

// S4 — LEARNS YOUR STYLE — bespoke tailor (tight 3.26s: protect the 41→96% meter)
const A4: React.FC<{ lf: number }> = ({ lf }) => {
  const shove = over(lf, 0, fr(0.55), Easing.out(Easing.cubic));
  const stitch = over(lf, fr(0.7), fr(1.6));
  const done = over(lf, fr(2.2), fr(0.5), Easing.out(Easing.back(1.6)));
  return (
    <>
      <Kicker lf={lf} text="YOUR STYLE" tone={GRAPE} />
      {/* rack of dull identical FACTS suits, shoved left off-frame */}
      <div style={{ position: "absolute", left: 40 - shove * 320, top: 70, display: "flex", gap: 10, zIndex: 6, opacity: 1 - shove * 0.7 }}>{[0, 1, 2].map((k) => <div key={k} style={{ width: 74, height: 210, borderRadius: "40px 40px 10px 10px", background: grad("#B9B4AB", "#8F8A80"), border: "3px solid #6E6A61", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 12, fontFamily: mono, fontSize: 12, color: "#EDEBE6" }}>FACTS</div>)}<div style={{ position: "absolute", left: 8, top: -14, width: 240, height: 8, borderRadius: 4, background: "#6E6A61" }} /></div>
      {/* tailor mascot mid-stitch */}
      <div style={{ position: "absolute", left: 300, top: 150, zIndex: 10 }}><Mascot lf={lf} size={200} gaze={3} suit={1} nodAmp={2} cheer={done} /></div>
      {/* YOU mannequin wearing the bespoke clay+gold jacket */}
      <div style={{ position: "absolute", left: 640, top: 92, zIndex: 8 }}>
        <div style={{ width: 150, height: 250, position: "relative" }}>
          <div style={{ position: "absolute", left: 55, top: 0, width: 40, height: 40, borderRadius: "50%", background: "#D8CBB6" }} />
          <div style={{ position: "absolute", left: 40, top: 42, width: 70, height: 130, borderRadius: "30px 30px 12px 12px", background: grad(CLAY, "#A6552F"), border: `3px solid ${GOLD}`, clipPath: `inset(${(1 - stitch) * 100}% 0 0 0)` }} />
          <div style={{ position: "absolute", left: 72, top: 52, width: 6, height: 108, background: GOLD, opacity: stitch }} />
          <div style={{ position: "absolute", left: 44, top: 172, width: 62, height: 70, background: "#5C5750", borderRadius: "0 0 8px 8px" }} />
          {/* YOU luggage tag */}
          <div style={{ position: "absolute", left: 96, top: 40, padding: "3px 9px", borderRadius: 6, background: "#fff", border: `2px solid ${GOLD}`, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 15, color: INK, transform: `rotate(8deg) scale(${done})` }}>YOU</div>
          {/* sparkle-stitches */}
          {stitch > 0.05 && stitch < 1 && [0, 1, 2].map((k) => <div key={k} style={{ position: "absolute", left: 60 + Math.sin(lf / 3 + k) * 20, top: 60 + (stitch * 100 + k * 30) % 100, fontSize: 20, opacity: 0.8 }}>✦</div>)}
        </div>
      </div>
      {done > 0.4 && <Glint lf={lf} at={2.2} dur={0.6} />}
    </>
  );
};
const B4: React.FC<{ lf: number }> = ({ lf }) => {
  const pct = Math.round(interpolate(over(lf, fr(0.6), fr(1.6), Easing.out(Easing.cubic)), [0, 1], [41, 96]));
  return (
    <Win lf={lf} app="style.md — learned from you" accent={GRAPE}>
      <div style={{ position: "absolute", left: 24, top: 22, fontFamily: mono, fontSize: 20, lineHeight: 1.9, color: "#C9B0E0" }}>{[["no em-dashes", true], ["tone: dry, direct", true]].map(([t, ok], i) => <div key={i} style={{ opacity: over(lf, fr(0.3 + i * 0.4), fr(0.3)) }}>{t} <span style={{ color: "#8FE0B0" }}>{ok ? "✓" : ""}</span></div>)}<div style={{ opacity: over(lf, fr(1.1), fr(0.3)), color: "rgba(200,175,224,0.6)" }}>17 preferences learned</div></div>
      <div style={{ position: "absolute", right: 26, top: 30, textAlign: "right" }}>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 96, color: GRAPE, lineHeight: 0.9, textShadow: `0 0 26px ${GRAPE}66` }}>{pct}<span style={{ fontSize: 44 }}>%</span></div>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 22, color: "rgba(220,215,235,0.75)" }}>style match ▲ <span style={{ color: "rgba(200,175,224,0.55)" }}>(was 41%)</span></div>
      </div>
    </Win>
  );
};

// S5 — SAVES MONEY — the $100→$10 price tag (first HARD number, land it big)
const A5: React.FC<{ lf: number }> = ({ lf }) => {
  const slap = over(lf, fr(1.6), fr(0.35), Easing.out(Easing.back(2)));
  const flip = over(lf, fr(2.2), fr(0.6), Easing.inOut(Easing.cubic));
  const deflate = over(lf, fr(2.9), fr(1.2), Easing.in(Easing.cubic));
  const price = flip < 0.5 ? "$100" : "$10";
  return (
    <>
      <Kicker lf={lf} text="10× CHEAPER" tone={GREEN} />
      {/* premium gold robot deflating */}
      <div style={{ position: "absolute", left: 640, top: 110, zIndex: 6, transform: `scaleY(${1 - deflate * 0.7}) rotate(${deflate * 14}deg)`, transformOrigin: "50% 100%", opacity: 1 - deflate * 0.5 }}>
        <div style={{ width: 150, height: 180, borderRadius: 20, background: grad("#F0D264", "#C9A02A"), border: "4px solid #B8862A", position: "relative" }}>
          <div style={{ position: "absolute", left: 30, top: 40, width: 24, height: deflate > 0.3 ? 6 : 24, borderRadius: 6, background: "#3A2F10" }} /><div style={{ position: "absolute", right: 30, top: 40, width: 24, height: deflate > 0.3 ? 6 : 24, borderRadius: 6, background: "#3A2F10" }} />
          <div style={{ position: "absolute", left: 40, top: 96, width: 70, height: 10, borderRadius: 5, background: "#3A2F10", transform: deflate > 0.3 ? "rotate(180deg)" : "none", transformOrigin: "center" }} />
          <div style={{ position: "absolute", left: 30, top: -22, fontFamily: mono, fontSize: 13, color: "#8A6420", fontWeight: 800 }}>GPT-ULTRA</div>
        </div>
      </div>
      {/* big swinging price tag */}
      <div style={{ position: "absolute", left: 240, top: 60, zIndex: 12, transformOrigin: "top center", transform: `rotate(${Math.sin(lf / 8) * 4 + (flip < 0.5 ? 0 : 3)}deg)` }}>
        <div style={{ width: 4, height: 60, background: "#8A6844", margin: "0 auto" }} />
        <div style={{ width: 230, height: 150, borderRadius: 18, background: flip < 0.5 ? grad("#FFF6E2", "#F0E2C4") : grad("#DAF3E4", "#B6E6C8"), border: `4px solid ${flip < 0.5 ? "#C9A24A" : GREEN}`, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: NAVYSH, transform: `scale(${flip > 0.5 && flip < 0.9 ? 1.08 : 1})` }}>
          <div style={{ position: "absolute", left: 16, top: 16, width: 20, height: 20, borderRadius: "50%", border: "3px solid #8A6844" }} />
          <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 84, color: flip < 0.5 ? "#8E2F22" : "#1E7A46", textDecoration: flip < 0.5 ? "none" : "none" }}>{price}</span>
        </div>
      </div>
      {/* thrifty shopper mascot slapping the MEMORY coupon */}
      <div style={{ position: "absolute", left: 60, top: 170, zIndex: 10 }}><Mascot lf={lf} size={190} gaze={2} cheer={flip > 0.5 ? 0.5 : 0} nodAmp={2} /></div>
      <div style={{ position: "absolute", left: 250, top: 128, zIndex: 14, transform: `scale(${slap * (flip > 0.6 ? 0 : 1)}) rotate(-10deg)`, padding: "6px 12px", borderRadius: 8, background: grad("#7BE0A0", "#2FA968"), border: "2px solid #1E7A46", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 22, color: "#0E3A24" }}>MEMORY −90%</div>
      {flip > 0.6 && <Glint lf={lf} at={2.4} dur={0.6} />}
    </>
  );
};
const B5: React.FC<{ lf: number }> = ({ lf }) => {
  const total = (interpolate(over(lf, fr(2.2), fr(0.9), Easing.out(Easing.cubic)), [0, 1], [100, 10])).toFixed(2);
  const dropped = over(lf, fr(2.9), fr(0.4), Easing.out(Easing.back(2)));
  return (
    <Win lf={lf} app="CLODE Console — Billing" accent={GREEN}>
      <div style={{ position: "absolute", left: 24, top: 20, fontFamily: mono, fontSize: 18, lineHeight: 1.9 }}>
        <div style={{ color: "rgba(180,175,165,0.5)", textDecoration: "line-through" }}>○ Deep-Think Ultra (premium)</div>
        <div style={{ color: "#8FE0B0", opacity: over(lf, fr(0.5), fr(0.4)) }}>◉ Deep-Think Mini <span style={{ color: "#8FD0F5" }}>+ Memory</span> ✓</div>
      </div>
      <div style={{ position: "absolute", right: 26, top: 24, textAlign: "right" }}>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 18, color: "rgba(220,225,235,0.6)" }}>invoice total</div>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 88, color: GREEN, lineHeight: 0.95, textShadow: `0 0 26px ${GREEN}55` }}>${total}</div>
        <div style={{ display: "inline-block", marginTop: 6, padding: "4px 14px", borderRadius: 999, background: "rgba(76,175,125,0.2)", border: `2px solid ${GREEN}`, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 26, color: "#8FE0B0", transform: `scale(${0.6 + dropped * 0.4})` }}>−90%</div>
      </div>
      <div style={{ position: "absolute", left: 24, bottom: 20, fontFamily: mono, fontSize: 17, color: "rgba(200,225,210,0.7)" }}>Quality score: <span style={{ color: "#8FE0B0", fontWeight: 800 }}>98%</span> (no drop)</div>
    </Win>
  );
};

// S6 — COMMAND CENTER — Obsidian self-wiring wall (broaden read: "your workspace organizes itself")
const A6: React.FC<{ lf: number }> = ({ lf }) => {
  const plug = over(lf, fr(0.6), fr(0.4), Easing.out(Easing.back(1.6)));
  const wire = over(lf, fr(1.4), fr(2.2), Easing.inOut(Easing.cubic));
  const nodes = [[506, 180], [360, 110], [650, 120], [300, 240], [710, 250], [430, 300], [590, 300], [506, 60]];
  return (
    <>
      <Kicker lf={lf} text="COMMAND CENTER" tone={GRAPE} />
      {/* purple war-room glow */}
      <div style={{ position: "absolute", left: 180, top: 20, width: 660, height: 380, borderRadius: 24, background: `radial-gradient(closest-side, rgba(158,118,207,${0.1 + wire * 0.22}), transparent 72%)`, zIndex: 1, filter: "blur(4px)" }} />
      {/* the constellation: hub + nodes + links */}
      <svg viewBox="0 0 1012 420" width={1012} height={420} style={{ position: "absolute", left: 0, top: 0, zIndex: 5, pointerEvents: "none" }}>
        {nodes.slice(1).map(([x, y], k) => { const p = over(lf, fr(1.4 + k * 0.18), fr(0.5)); return <line key={k} x1={506} y1={180} x2={506 + (x - 506) * p} y2={180 + (y - 180) * p} stroke={GRAPE} strokeWidth={3} opacity={p * 0.7} />; })}
        {nodes.map(([x, y], k) => { const isHub = k === 0; const p = isHub ? plug : over(lf, fr(1.4 + (k - 1) * 0.18), fr(0.4), Easing.out(Easing.back(1.8))); return <circle key={k} cx={x} cy={y} r={isHub ? 26 : 13} fill={isHub ? GRAPE : "#C9A8E8"} opacity={p} style={{ filter: isHub ? `drop-shadow(0 0 14px ${GRAPE})` : "none" }} />; })}
      </svg>
      <div style={{ position: "absolute", left: 466, top: 150, zIndex: 6, fontFamily: mono, fontSize: 15, color: "#fff", fontWeight: 800, opacity: plug }}>HUB</div>
      {/* mission-control mascot, arms watching after the plug */}
      <div style={{ position: "absolute", left: 60, top: 200, zIndex: 10 }}><Mascot lf={lf} size={180} gaze={-2} cop={1} nodAmp={1.5} cheer={wire > 0.6 ? 0.4 : 0} /></div>
      {/* purple jack cable into port */}
      <div style={{ position: "absolute", left: 236, top: 268, width: 60 * plug, height: 12, borderRadius: 6, background: grad("#B98FE0", "#7B4FB0"), zIndex: 9, transformOrigin: "left" }} />
    </>
  );
};
const B6: React.FC<{ lf: number }> = ({ lf }) => {
  const links = Math.round(over(lf, fr(0.6), fr(2.0)) * 892);
  return (
    <Win lf={lf} app="Obsidiam — graph view" accent={GRAPE}>
      {/* left file tree */}
      <div style={{ position: "absolute", left: 22, top: 20, fontFamily: mono, fontSize: 17, lineHeight: 1.8, color: "rgba(200,180,224,0.85)" }}>{["▸ Plans/", "▸ Tasks/", "▸ Projects/", "📌 CURRENT FOCUS"].map((t, i) => <div key={i} style={{ opacity: over(lf, fr(0.3 + i * 0.25), fr(0.3)), color: i === 3 ? "#C9A8E8" : undefined, fontWeight: i === 3 ? 800 : 400 }}>{t}</div>)}</div>
      {/* mini graph */}
      <svg viewBox="0 0 300 200" width={300} height={200} style={{ position: "absolute", right: 30, top: 24 }}>{[[150, 100], [80, 50], [220, 60], [70, 150], [230, 150], [150, 30]].map(([x, y], k) => <React.Fragment key={k}>{k > 0 && <line x1={150} y1={100} x2={x} y2={y} stroke={GRAPE} strokeWidth={2} opacity={over(lf, fr(0.5 + k * 0.2), fr(0.4)) * 0.7} />}<circle cx={x} cy={y} r={k === 0 ? 14 : 8} fill={k === 0 ? GRAPE : "#C9A8E8"} opacity={over(lf, fr(0.3 + k * 0.2), fr(0.3))} /></React.Fragment>)}</svg>
      <div style={{ position: "absolute", left: 22, bottom: 18, display: "inline-flex", gap: 8, padding: "6px 12px", borderRadius: 8, background: "rgba(158,118,207,0.18)", border: `1px solid ${GRAPE}`, fontFamily: mono, fontSize: 16, color: "#C9A8E8" }}>⚡ auto-linked <b style={{ color: "#fff" }}>&nbsp;41 notes</b></div>
      <div style={{ position: "absolute", right: 26, bottom: 18, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 30, color: GRAPE }}>214 notes · {links} links</div>
    </Win>
  );
};

// S7 — SCHEDULE — the graveyard shift (TRUE CLIMAX: DONE-stack climbing is the hero motion)
const A7: React.FC<{ lf: number }> = ({ lf }) => {
  const done = Math.min(5, Math.floor(over(lf, fr(0.8), fr(3.6)) * 5));
  const dawn = over(lf, fr(4.6), fr(1.4));
  const tickA = (Math.floor(lf / 12) / 7) * 360;
  return (
    <>
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, rgba(40,54,96,${0.5 - dawn * 0.4}), rgba(30,40,70,${0.4 - dawn * 0.35}))`, zIndex: 0 }} />
      <Kicker lf={lf} text="AUTOPILOT" tone={SKY} />
      {/* MON→SUN cron dial clock */}
      <div style={{ position: "absolute", left: 60, top: 44, width: 150, height: 150, borderRadius: "50%", background: "#161E30", border: `5px solid ${SKY}`, zIndex: 8 }}>
        {["M", "T", "W", "T", "F", "S", "S"].map((d, k) => { const a = (k / 7) * Math.PI * 2 - Math.PI / 2; return <div key={k} style={{ position: "absolute", left: 69 + Math.cos(a) * 58, top: 69 + Math.sin(a) * 58, transform: "translate(-50%,-50%)", fontFamily: mono, fontSize: 15, color: "rgba(180,205,235,0.8)" }}>{d}</div>; })}
        <div style={{ position: "absolute", left: 71, top: 24, width: 4, height: 48, background: SUN, transformOrigin: "50% 100%", transform: `rotate(${tickA}deg)`, borderRadius: 2 }} />
        <div style={{ position: "absolute", left: 67, top: 67, width: 12, height: 12, borderRadius: "50%", background: SUN }} />
      </div>
      {/* sleeping viewer-you */}
      <div style={{ position: "absolute", left: 300, top: 250, zIndex: 9 }}>
        <div style={{ width: 220, height: 90, borderRadius: "16px 16px 6px 6px", background: grad("#5A6E9E", "#3E4E76"), position: "relative" }}>
          <div style={{ position: "absolute", left: 18, top: -34, width: 60, height: 60, borderRadius: "50%", background: CLAY, border: "3px solid #A6552F" }} />
          <div style={{ position: "absolute", left: 30, top: -24, fontSize: 16 }}>😴</div>
          <div style={{ position: "absolute", left: 78, top: 8, right: 12, height: 40, borderRadius: 8, background: "#8090BE" }} />
          <div style={{ position: "absolute", left: 60, top: -54, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 26, color: "rgba(200,215,240,0.8)", transform: `translateY(${-((lf * 1.5) % 30)}px)`, opacity: 0.7 }}>z</div>
        </div>
      </div>
      {/* night-watchman mascot working */}
      <div style={{ position: "absolute", left: 600, top: 180, zIndex: 10 }}><Mascot lf={lf} size={170} gaze={-2} constr={1} nodAmp={2.5} /></div>
      {/* growing ✓ DONE stack on the nightstand */}
      <div style={{ position: "absolute", left: 800, top: 150, zIndex: 11 }}>{Array.from({ length: done }).map((_, k) => <div key={k} style={{ position: "absolute", left: k * 3, top: 130 - k * 32, width: 130, height: 28, borderRadius: 6, background: grad("#7BE0A0", "#2FA968"), border: "2px solid #1E7A46", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: mono, fontWeight: 800, fontSize: 15, color: "#0E3A24", boxShadow: "0 4px 10px rgba(0,0,0,0.3)", transform: `scale(${over(lf, fr(0.8 + k * 0.7), fr(0.3), Easing.out(Easing.back(2)))})` }}>✓ DONE</div>)}</div>
      {/* $0.00 sticker */}
      <div style={{ position: "absolute", left: 470, top: 60, zIndex: 12, transform: "rotate(-8deg)", padding: "8px 16px", borderRadius: 12, background: grad("#F5BE47", "#D39A2A"), border: "3px solid #B8862A", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 34, color: "#4A3410", boxShadow: NAVYSH }}>$0.00 · FREE</div>
      {/* dawn crack at right edge */}
      {dawn > 0 && <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 200 * dawn, background: `linear-gradient(90deg, transparent, rgba(245,190,71,${dawn * 0.4}))`, zIndex: 3 }} />}
    </>
  );
};
const B7: React.FC<{ lf: number }> = ({ lf }) => (
  <Win lf={lf} app="kronos ⏰ — Scheduled Tasks" accent={SKY}>
    <div style={{ position: "absolute", left: 24, top: 22, right: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", borderRadius: 12, background: "#242730", border: "1px solid #34383F", opacity: over(lf, fr(0.3), fr(0.4)) }}>
        <div><div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 22, color: "#E8ECF2" }}>Weekly report → Obsidian</div><div style={{ fontFamily: mono, fontSize: 16, color: "rgba(180,205,235,0.7)", marginTop: 4 }}>Every Mon · 6:00 AM</div></div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 999, background: "rgba(76,175,125,0.2)", border: `1px solid ${GREEN}`, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 17, color: "#8FE0B0" }}>✓ ran while you slept</div>
      </div>
    </div>
    <Receipt big="$0.00" sub="last ran 6:02 AM · 0 credits" c={SKY} y={230} s={80} />
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 20, textAlign: "center" }}><span style={{ display: "inline-block", padding: "5px 14px", borderRadius: 8, background: "rgba(90,160,222,0.16)", fontFamily: mono, fontSize: 17, color: "#9FC8F0" }}>🔥 12 runs · 0 missed</span></div>
  </Win>
);

// CTA — jigsaw clicks · comment Hermes (full-frame single-hero; front-load envelope+keyword)
const HermesCTA: React.FC<{ lf: number }> = ({ lf }) => {
  const kw = Math.max(0.7, over(lf, 0, fr(0.35), Easing.out(Easing.back(1.4))));
  const snap = over(lf, fr(0.5), fr(0.4), Easing.out(Easing.back(2)));
  const ignite = over(lf, fr(0.9), fr(0.7));
  const fly = over(lf, fr(1.0), fr(1.4), Easing.in(Easing.cubic));
  const icons = ["🧠", "🪙", "🔮", "⏰"];
  return (
    <AbsoluteFill style={{ zIndex: 40 }}>
      {/* gold ignition wash */}
      <div style={{ position: "absolute", left: 140, top: 300, width: 800, height: 800, borderRadius: "50%", background: `radial-gradient(circle, rgba(231,178,76,${ignite * 0.3}), transparent 62%)`, filter: "blur(10px)" }} />
      {/* jigsaw board: 4 icons ringing a Hermes crest */}
      <div style={{ position: "absolute", left: 290, top: 430, width: 500, height: 500 }}>
        <div style={{ position: "absolute", left: 170, top: 170, width: 160, height: 160, borderRadius: 28, background: grad(GOLD, "#C9932A"), border: "5px solid #F6E4A0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 90, boxShadow: `0 0 ${ignite * 50}px ${GOLD}`, transform: `scale(${0.9 + snap * 0.1})` }}>🪽</div>
        {icons.map((ic, k) => { const a = (k / 4) * Math.PI * 2 - Math.PI / 2; const on = over(lf, fr(1.0 + k * 0.14), fr(0.3)); return <div key={k} style={{ position: "absolute", left: 250 + Math.cos(a) * 200 - 55, top: 250 + Math.sin(a) * 200 - 55, width: 110, height: 110, borderRadius: 22, background: "#FFFDF8", border: `4px solid ${on > 0.5 ? GOLD : "#E0D8C6"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 56, boxShadow: on > 0.5 ? `0 0 24px ${GOLD}aa` : "0 10px 24px rgba(0,0,0,0.14)", transform: `scale(${on})` }}>{ic}</div>; })}
        {/* the final winged puzzle piece snapping in (top slot) */}
        <div style={{ position: "absolute", left: 195, top: -70 + snap * 70, opacity: snap < 1 ? 1 : 0, transform: `scale(${1.1 - snap * 0.1})` }}><div style={{ width: 110, height: 110, borderRadius: 22, background: grad("#F0B49B", "#D97757"), border: "4px solid #A65B3E", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 50 }}>🧩</div></div>
      </div>
      {/* mascot with winged helmet pointing */}
      <div style={{ position: "absolute", left: 90, top: 560, zIndex: 20 }}><Mascot lf={lf} size={230} gaze={2} cheer={ignite} /></div>
      {/* winged envelope flying at camera */}
      <div style={{ position: "absolute", left: 470 + fly * 40, top: 620 + fly * 620, zIndex: 30, transform: `scale(${0.5 + fly * 1.8})`, opacity: fly > 0.05 ? 1 : 0 }}>
        <div style={{ width: 120, height: 84, borderRadius: 10, background: "#FFFDF8", border: "3px solid #C9A24A", position: "relative", boxShadow: `0 0 30px ${GOLD}aa` }}><div style={{ position: "absolute", inset: 0, clipPath: "polygon(0 0, 50% 55%, 100% 0)", background: "#F0E2C4" }} /><div style={{ position: "absolute", left: -30, top: 20, fontSize: 30 }}>🪽</div></div>
      </div>
      {/* Instaglam comment composer (bottom proof) */}
      <div style={{ position: "absolute", left: 90, right: 90, bottom: 210, zIndex: 25 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "22px 26px", borderRadius: 22, background: "#1C1A17", border: "2px solid #34302A", boxShadow: NAVYSH }}>
          <span style={{ width: 46, height: 46, borderRadius: "50%", background: grad(CLAY, "#A6552F") }} />
          <div style={{ flex: 1, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 40, color: "#fff" }}>Hermes<span style={{ opacity: (lf % 16) < 8 ? 1 : 0, color: GOLD }}>|</span></div>
          <div style={{ padding: "12px 30px", borderRadius: 999, background: grad("#5AA0DE", "#3A7FC9"), fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 32, color: "#fff", transform: `scale(${1 + Math.sin(lf / 7) * 0.04})` }}>Post</div>
        </div>
        <div style={{ marginTop: 14, textAlign: "center", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 26, color: MUTE }}>💬 comment <b style={{ color: CLAY }}>"Hermes"</b> for the full build → auto-DM'd to you</div>
      </div>
      {/* keyword pill */}
      <div style={{ position: "absolute", left: "50%", top: 360, transform: `translateX(-50%) scale(${kw})`, zIndex: 26 }}><Chip text="comment HERMES" bg={grad("#2E4A38", "#1B2E22")} bd={GOLD} fg="#F6E4A0" size={44} /></div>
    </AbsoluteFill>
  );
};


// ============================================================================
// ===================== SINGLE-HERO SCENES (Cinematic Blueprint house style) ==
// Each scene = one <Panel> diorama, dense shaded props + recostumed clay mascot +
// the on-screen receipt baked in as a prop. Panel-local coords 1012 × 792.
// ============================================================================

// ===================== CALLBACK-spec scene furniture (title banner / live pill / sub-label / spotlight / receipt meter / speech) =====================
// big 2-line Fraunces headline on the panel — first part cream, accent word gold/coral
const SceneTitle: React.FC<{ lf: number; a: string; b: string; accent?: string; size?: number }> = ({ lf, a, b, accent = GOLD, size = 54 }) => {
  const p = lf <= 0 ? 1 : Math.max(0.92, over(lf, 0, fr(0.4), Easing.out(Easing.back(1.5))));
  return (
    <div style={{ position: "absolute", left: 30, right: 30, top: 38, textAlign: "center", zIndex: 55, transform: `scale(${p})`, opacity: Math.min(1, p * 1.4) }}>
      <span style={{ display: "inline-block", whiteSpace: "nowrap", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: size, lineHeight: 1.0, letterSpacing: "-0.02em", color: "#F4EEE2", textShadow: "0 3px 0 rgba(0,0,0,0.35), 0 10px 28px rgba(0,0,0,0.5)" }}>{a} <span style={{ color: accent }}>{b}</span></span>
    </div>
  );
};
// "● HERMES · LIVE" green pill, top-right of the panel
const LivePill: React.FC<{ lf: number; text?: string }> = ({ lf, text = "HERMES · LIVE" }) => (
  <div style={{ position: "absolute", right: 24, top: 22, display: "inline-flex", alignItems: "center", gap: 9, padding: "8px 16px", borderRadius: 999, background: "rgba(38,120,86,0.92)", border: "1.5px solid rgba(120,224,176,0.5)", zIndex: 58, boxShadow: "0 6px 16px rgba(0,0,0,0.35)" }}>
    <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#8FE0B0", opacity: 0.5 + 0.5 * Math.abs(Math.sin(lf / 8)), boxShadow: "0 0 8px #8FE0B0" }} />
    <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 18, letterSpacing: "0.06em", color: "#EAFBF1" }}>{text}</span>
  </div>
);
// letter-spaced mono sub-label, bottom-center of the panel
const SubLabel: React.FC<{ text: string }> = ({ text }) => (
  <div style={{ position: "absolute", left: 20, right: 20, bottom: 26, textAlign: "center", zIndex: 55, whiteSpace: "nowrap", overflow: "hidden", fontFamily: mono, fontSize: 20, fontWeight: 700, letterSpacing: "0.14em", color: "rgba(150,172,214,0.5)" }}>{text}</div>
);
// caged spotlight fixture + volumetric warm cone onto the floor
const SpotCone: React.FC<{ x: number; topY?: number; floorY?: number; spread?: number; hue?: string; lit?: number }> = ({ x, topY = 150, floorY = 660, spread = 210, hue = "#FBE3A0", lit = 1 }) => (
  <>
    <div style={{ position: "absolute", left: x - 26, top: topY - 34, width: 52, height: 34, borderRadius: "8px 8px 4px 4px", background: grad("#2A3346", "#1A2130"), border: "2px solid #3A4658", zIndex: 6 }} />
    <div style={{ position: "absolute", left: x - 20, top: topY - 8, width: 40, height: 16, borderRadius: "50%", background: `radial-gradient(circle, ${hue}, #C99A3A)`, boxShadow: `0 0 22px ${hue}`, zIndex: 6 }} />
    <div style={{ position: "absolute", left: x - spread / 2, top: topY, width: spread, height: floorY - topY, clipPath: "polygon(42% 0, 58% 0, 100% 100%, 0% 100%)", background: `linear-gradient(180deg, ${hue}${Math.round(lit * 90).toString(16).padStart(2, "0")}, transparent)`, opacity: 0.6 * lit, zIndex: 4, pointerEvents: "none", filter: "blur(2px)" }} />
    <div style={{ position: "absolute", left: x - spread * 0.42, top: floorY - 24, width: spread * 0.84, height: 42, borderRadius: "50%", background: `radial-gradient(ellipse, ${hue}44, transparent 70%)`, opacity: lit, zIndex: 4 }} />
  </>
);
// the recurring receipt: a dark card with label + big % + state chip + progress bar
const MatchMeter: React.FC<{ lf: number; x?: number; y?: number; label?: string; pct: number; state?: string; stateColor?: string; barColor?: string; big?: number }> = ({ lf, x = 720, y = 120, label = "HERMES MEMORY", pct, state, stateColor = GREEN, barColor = GREEN, big = 60 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 262, padding: "14px 18px", borderRadius: 16, background: "rgba(16,20,30,0.92)", border: "2px solid rgba(120,150,210,0.3)", boxShadow: NAVYSH, zIndex: 30 }}>
    <div style={{ fontFamily: mono, fontSize: 16, letterSpacing: "0.1em", color: "rgba(170,190,225,0.7)" }}>{label}</div>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 4 }}>
      <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: big, color: barColor, lineHeight: 1, textShadow: `0 0 18px ${barColor}44` }}>{Math.round(pct)}%</span>
      {state && <span style={{ padding: "5px 12px", borderRadius: 8, background: stateColor, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 18, color: "#fff", boxShadow: `0 0 12px ${stateColor}66` }}>{state}</span>}
    </div>
    <div style={{ marginTop: 10, height: 12, borderRadius: 999, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}><div style={{ height: "100%", width: `${Math.max(0, Math.min(100, pct))}%`, background: grad(barColor, barColor), boxShadow: `0 0 10px ${barColor}` }} /></div>
  </div>
);
// dark speech bubble with a colored border + tail
const Speech: React.FC<{ x: number; y: number; text: string; accent?: string; size?: number; s?: number }> = ({ x, y, text, accent = CLAY, size = 30, s = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, transform: `scale(${s})`, transformOrigin: "50% 120%", zIndex: 28 }}>
    <div style={{ padding: "10px 20px", borderRadius: 16, background: "#141A28", border: `2.5px solid ${accent}`, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: size, color: "#F4EEE2", boxShadow: "0 10px 24px rgba(0,0,0,0.5)", whiteSpace: "nowrap" }}>{text}</div>
    <div style={{ position: "absolute", left: 30, bottom: -9, width: 18, height: 18, background: "#141A28", borderRight: `2.5px solid ${accent}`, borderBottom: `2.5px solid ${accent}`, transform: "rotate(45deg)" }} />
  </div>
);
// subtle tiled-wall texture for a room diorama (overlay inside a Panel)
const RoomWall: React.FC<{ hue?: string; tile?: number }> = ({ hue = "rgba(90,120,170,0.10)", tile = 92 }) => (
  <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${hue} 1.5px, transparent 1.5px), linear-gradient(90deg, ${hue} 1.5px, transparent 1.5px)`, backgroundSize: `${tile}px ${tile}px`, zIndex: 1, pointerEvents: "none" }} />
);
// a raised floor / stage with contact shadow (the diorama ground plane)
const StageFloor: React.FC<{ top?: number; hue1?: string; hue2?: string }> = ({ top = 560, hue1 = "#1E2740", hue2 = "#141A2C" }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top, bottom: 0, background: grad(hue1, hue2), boxShadow: "inset 0 30px 60px rgba(0,0,0,0.4)", zIndex: 2 }}>
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 4, background: "rgba(255,255,255,0.05)" }} />
  </div>
);

// small shaded props ---------------------------------------------------------
const Bubbles: React.FC<{ lf: number; x: number; y: number; n?: number; spread?: number }> = ({ lf, x, y, n = 7, spread = 90 }) => (
  <>{Array.from({ length: n }).map((_, i) => { const s = seed(i * 3.1); const rise = ((lf * (1.1 + s) + i * 40) % 240); const bx = x + Math.sin((rise / 40) + i) * 14 + (s - 0.5) * spread; return <div key={i} style={{ position: "absolute", left: bx, top: y - rise, width: 6 + s * 12, height: 6 + s * 12, borderRadius: "50%", background: "rgba(200,235,250,0.16)", border: "2px solid rgba(220,245,255,0.4)", opacity: Math.max(0, 1 - rise / 240) }} />; })}</>
);
const Seaweed: React.FC<{ lf: number; x: number; h: number; hue?: string }> = ({ lf, x, h, hue = "#3FA36E" }) => (
  <svg viewBox="0 0 40 200" width={40} height={h} style={{ position: "absolute", left: x, top: 700 - h, transformOrigin: "bottom center" }}>
    {[0, 1, 2].map((k) => <path key={k} d={`M${14 + k * 6} 200 Q${4 + k * 6 + Math.sin(lf / 16 + k) * 10} 130 ${16 + k * 4} 70 Q${26 + Math.sin(lf / 14 + k) * 8} 30 ${18 + k * 3} 2`} stroke={hue} strokeWidth={7 - k} fill="none" strokeLinecap="round" opacity={0.85 - k * 0.2} />)}
  </svg>
);
// hero glass fish TANK with the Claude-goldfish inside
// S0 HOOK — "the memory drain": one dramatic action — close chat opens a vortex that
// sucks every memory (project/style/rules/name) down the drain; the fish reboots blank.
// S0 HOOK — "the memory kill": a HUGE glowing memory-network (the AI's mind) fills the frame,
// then the [X]-slam violently kills it — links snap, nodes die, the whole graph collapses to a dead 0.
// Hierarchy: the luminous network IS the hero; goldfish + receipt are small subordinates.
const HookHero: React.FC<{ lf: number }> = ({ lf }) => {
  const HX = 496, HY = 388;
  // ---- BEAT CLOCK (84f / 2.81s) — something new lands every ~0.4s ----
  const slamAt = fr(0.72);      // B1: the [X] kills the mind
  const implodeAt = fr(1.15);   // B2: hub collapses to a point
  const zeroAt = fr(1.4);       // B3: giant red 0 slams in
  const fishAt = fr(1.75);      // B4: goldfish eyes pop
  const deadAt = fr(2.05);      // B4b: X_X
  const tagAt = fr(2.25);       // B5: receipt stamps

  const impact = lf >= slamAt ? Math.max(0, 1 - (lf - slamAt) / 9) : 0;
  const impact2 = lf >= zeroAt ? Math.max(0, 1 - (lf - zeroAt) / 7) : 0;
  const shakeAmp = impact * impact * 15 + impact2 * impact2 * 9;
  const shake = shakeAmp > 0 ? Math.sin(lf * 5.1) * shakeAmp : 0;
  const kill = over(lf, slamAt, fr(0.9), Easing.in(Easing.cubic));
  const implode = over(lf, implodeAt, fr(0.22), Easing.in(Easing.cubic));
  const zero = over(lf, zeroAt, fr(0.36), Easing.out(Easing.back(2.4)));
  const zeroSettle = over(lf, zeroAt + fr(0.36), fr(0.5), Easing.out(Easing.cubic));
  const tag = over(lf, tagAt, fr(0.34), Easing.out(Easing.back(1.9)));
  const dead = kill > 0.55;
  const flick = 0.86 + 0.14 * Math.abs(Math.sin(lf * 1.7) * Math.sin(lf * 0.61));

  // cursor is ALREADY on-frame and flying in at frame 0 (cold open, no dead air)
  const curP = over(lf, -fr(0.5), fr(1.22), Easing.in(Easing.cubic));
  const curX = interpolate(curP, [0, 1], [948, 792]);
  const curY = interpolate(curP, [0, 1], [92, 214]);
  const curKick = impact > 0 ? impact * 26 : 0;

  const NODES = [
    { a: -1.5, r: 214, ic: "🗂️", c: "#5AA0DE" }, { a: -0.5, r: 236, ic: "🎨", c: "#9E76CF" },
    { a: 0.42, r: 206, ic: "📏", c: "#2FB79A" }, { a: 1.35, r: 232, ic: "💬", c: "#F5BE47" },
    { a: 2.25, r: 200, ic: "⭐", c: "#EE7E86" }, { a: 3.05, r: 228, ic: "🧠", c: "#6FD3AE" },
    { a: 3.95, r: 210, ic: "📌", c: "#5AA0DE" }, { a: 4.9, r: 234, ic: "🔑", c: "#9E76CF" },
  ];
  // spins FAST from frame 0, then the kill rips the momentum out of it
  const phase = lf <= slamAt ? lf * 0.036 : slamAt * 0.036 + (lf - slamAt) * 0.036 * Math.max(0, 1 - (lf - slamAt) / 9);
  const pos = (n: { a: number; r: number }) => [HX + Math.cos(n.a + phase) * n.r, HY + Math.sin(n.a + phase) * n.r * 0.74];
  const snapP = (i: number) => over(lf, slamAt + i * 1.1, fr(0.26), Easing.out(Easing.cubic));
  const fallP = (i: number) => over(lf, slamAt + 3 + i * 1.1, fr(1.0), Easing.in(Easing.quad));
  const life = (i: number) => 1 - snapP(i);

  return (
    <Panel tint="rgba(90,160,222,0.4)">
      {/* ================= QUIET RECEDING BACKDROP (z 0..8) ================= */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 90% at 50% 34%, #16304F 0%, #0B1A2E 52%, #050B14 100%)", zIndex: 0 }} />
      <RoomWall hue="rgba(90,150,210,0.05)" tile={90} />
      {/* layered receding architecture — three silhouette arch rings, low contrast */}
      {[0, 1, 2].map((k) => {
        const w = 900 - k * 190, h = 560 - k * 120;
        const par = Math.sin((lf + k * 26) / 64) * (3 - k) * 1.4 - shake * 0.06 * (3 - k);
        return (
          <div key={"arch" + k} style={{ position: "absolute", left: HX - w / 2 + par, top: 150 + k * 40, width: w, height: h, borderRadius: `${w / 2}px ${w / 2}px 0 0`, border: `${3 - k * 0.6}px solid rgba(120,175,235,${(0.09 - k * 0.022).toFixed(3)})`, borderBottom: "none", background: `linear-gradient(180deg, rgba(12,26,46,0), rgba(9,20,36,${(0.22 - k * 0.06).toFixed(3)}))`, zIndex: 1 + k * 0.1, pointerEvents: "none" }} />
        );
      })}
      {/* pillar silhouettes flanking, in shadow */}
      {[54, 132, 880, 958].map((px, k) => (
        <div key={"pil" + k} style={{ position: "absolute", left: px, top: 176, width: 46 - (k % 2) * 12, height: 430, borderRadius: "8px 8px 0 0", background: "linear-gradient(180deg, rgba(24,46,76,0.5), rgba(6,14,26,0.75))", boxShadow: "inset 2px 0 0 rgba(130,180,235,0.06)", zIndex: 2, pointerEvents: "none" }} />
      ))}
      {/* soft god-rays raking down from above the hero */}
      <SpotCone x={496} topY={128} floorY={620} spread={360} hue="#8FC4F5" lit={0.34 * (1 - kill * 0.75) + impact * 0.5} />
      <SpotCone x={196} topY={140} floorY={660} spread={180} hue="#7FB2E8" lit={0.2} />
      <SpotCone x={824} topY={140} floorY={660} spread={180} hue="#7FB2E8" lit={0.2} />
      <StageFloor top={604} hue1="#132038" hue2="#08101E" />
      {/* floor reflection of the hero — smears + dies with it */}
      <div style={{ position: "absolute", left: HX - 190, top: 606, width: 380, height: 120, borderRadius: "50%", background: dead ? "radial-gradient(ellipse, rgba(224,80,60,0.20), transparent 70%)" : "radial-gradient(ellipse, rgba(90,160,222,0.26), transparent 70%)", filter: "blur(14px)", opacity: 0.5 + Math.sin(lf / 9) * 0.07, zIndex: 3, pointerEvents: "none" }} />
      {/* ambient glow pools on the floor */}
      {[[210, 660], [800, 664]].map(([gx, gy], k) => (
        <div key={"pool" + k} style={{ position: "absolute", left: gx - 90, top: gy - 26, width: 180, height: 52, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(120,180,240,0.14), transparent 72%)", filter: "blur(8px)", opacity: 0.6 + Math.sin((lf + k * 30) / 17) * 0.12, zIndex: 3, pointerEvents: "none" }} />
      ))}
      {/* drifting dust — never stops */}
      {Array.from({ length: 24 }).map((_, i) => {
        const s = seed(i * 3.1);
        const dy = ((lf * (0.5 + s * 0.8) + i * 44) % 560);
        return <div key={`m${i}`} style={{ position: "absolute", left: 50 + s * 920 + Math.sin((lf + i * 21) / 30) * 9, top: 700 - dy, width: 2 + s * 3.4, height: 2 + s * 3.4, borderRadius: "50%", background: "rgba(180,215,245,0.55)", opacity: (0.14 + s * 0.3) * (1 - kill * 0.65) * (0.5 + 0.5 * Math.sin((lf + i * 9) / 11)), zIndex: 4, pointerEvents: "none" }} />;
      })}
      {/* hero bloom (breathes, then dies) */}
      <div style={{ position: "absolute", left: HX - 300, top: HY - 300, width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, rgba(90,160,222,${(0.32 * (1 - kill) * (0.9 + Math.sin(lf / 7) * 0.1)).toFixed(3)}), transparent 62%)`, filter: "blur(16px)", zIndex: 5, pointerEvents: "none" }} />
      {dead && <div style={{ position: "absolute", left: HX - 260, top: HY - 260, width: 520, height: 520, borderRadius: "50%", background: `radial-gradient(circle, rgba(224,80,60,${(0.18 * kill * flick).toFixed(3)}), transparent 62%)`, filter: "blur(18px)", zIndex: 5, pointerEvents: "none" }} />}
      <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 180px rgba(2,6,14,0.72)", zIndex: 8, pointerEvents: "none" }} />

      {/* ================= HERO + FOREGROUND (z >= 20) ================= */}
      <div style={{ position: "absolute", inset: 0, transform: `translate(${shake}px, ${shake * 0.4}px)`, zIndex: 20 }}>
        {/* --- links, data pulses feeding the hub, snap-recoil whips, shards --- */}
        <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", left: 0, top: 0, zIndex: 21, overflow: "visible" }}>
          {NODES.map((n, i) => {
            const [px, py] = pos(n);
            const sp = snapP(i), fp = fallP(i);
            const dx = px + (px - HX) * fp * 0.4, dy = py + fp * 190;
            if (sp < 0.02) {
              return <line key={`l${i}`} x1={HX} y1={HY} x2={px} y2={py} stroke={n.c} strokeWidth={4} opacity={0.85} style={{ filter: `drop-shadow(0 0 7px ${n.c})` }} />;
            }
            // RECOIL WHIP: the severed cable lashes back toward its node
            const whip = Math.sin(sp * 15) * (1 - sp) * 62;
            const mx = (px + HX) / 2, my = (py + HY) / 2;
            const nx = -(py - HY), ny = (px - HX);
            const len = Math.max(1, Math.hypot(nx, ny));
            const cxw = mx + (nx / len) * whip, cyw = my + (ny / len) * whip;
            const tipX = px + (dx - px) * 0.6, tipY = py + (dy - py) * 0.6;
            const stubX = HX + (px - HX) * 0.22 * (1 - sp);
            const stubY = HY + (py - HY) * 0.22 * (1 - sp);
            return (
              <g key={`l${i}`}>
                <path d={`M${tipX} ${tipY} Q${cxw} ${cyw} ${px + (tipX - px) * 0.1} ${py + (tipY - py) * 0.1}`} stroke={n.c} strokeWidth={3} fill="none" strokeLinecap="round" opacity={(1 - sp) * 0.7} />
                <line x1={HX} y1={HY} x2={stubX} y2={stubY} stroke="#5A3028" strokeWidth={2.5} opacity={(1 - sp) * 0.6} />
              </g>
            );
          })}
          {/* DATA PULSES travelling node -> hub: the mind is alive and being fed */}
          {NODES.map((n, i) => {
            const [px, py] = pos(n);
            const alive = life(i);
            if (alive < 0.15) return null;
            return [0, 1].map((k) => {
              const t = (((lf * 0.055) + i * 0.17 + k * 0.5) % 1);
              const e = t * t;
              const qx = px + (HX - px) * e, qy = py + (HY - py) * e;
              return <circle key={`p${i}_${k}`} cx={qx} cy={qy} r={3.4 + (1 - t) * 3.6} fill="#EAF6FF" opacity={alive * (0.35 + 0.65 * (1 - t))} style={{ filter: `drop-shadow(0 0 8px ${n.c})` }} />;
            });
          })}
          {/* SHARDS: nodes shatter, fall, fade */}
          {NODES.map((n, i) => {
            const sp = snapP(i);
            if (sp < 0.05) return null;
            const [px, py] = pos(n);
            return Array.from({ length: 5 }).map((_, k) => {
              const s = seed(i * 7.3 + k * 2.9);
              const ang = s * Math.PI * 2;
              const t = sp;
              const sx = px + Math.cos(ang) * 60 * t;
              const sy = py + Math.sin(ang) * 44 * t + t * t * 150;
              const sz = 5 + s * 9;
              return <rect key={`s${i}_${k}`} x={sx - sz / 2} y={sy - sz / 2} width={sz} height={sz * 0.7} rx={1.5} fill={n.c} opacity={Math.max(0, 1 - t * 1.15) * 0.9} transform={`rotate(${s * 720 * t} ${sx} ${sy})`} style={{ filter: `drop-shadow(0 0 5px ${n.c}aa)` }} />;
            });
          })}
        </svg>

        {/* --- the memory NODES --- */}
        {NODES.map((n, i) => {
          const [px, py] = pos(n);
          const sp = snapP(i), fp = fallP(i), li = life(i);
          const dx = px + (px - HX) * fp * 0.4, dy = py + fp * 190;
          const breathe = 1 + Math.sin(lf / 6 + i) * 0.05;
          return (
            <div key={`n${i}`} style={{ position: "absolute", left: dx - 34, top: dy - 34, width: 68, height: 68, borderRadius: "50%", background: li > 0.1 ? `radial-gradient(circle at 34% 30%, #fff, ${n.c})` : "#2A1A16", border: `3px solid ${li > 0.1 ? "rgba(255,255,255,0.7)" : "rgba(120,70,60,0.5)"}`, boxShadow: li > 0.1 ? `0 0 ${22 + Math.sin(lf / 6 + i) * 8}px ${n.c}, 0 8px 18px rgba(0,0,0,0.4)` : "none", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, zIndex: 24, transform: `scale(${(li > 0.1 ? breathe : 1) * (1 - sp * 0.55)}) rotate(${sp * (i % 2 ? 54 : -54)}deg)`, opacity: Math.max(0, 1 - fp * 1.3) * (li > 0.05 ? 1 : 0.5), filter: li > 0.1 ? "none" : "grayscale(1) brightness(0.45)" }}>{n.ic}</div>
          );
        })}

        {/* --- the HUB: the mind. breathes, then implodes --- */}
        {implode < 0.99 && (
          <div style={{ position: "absolute", left: HX - 78, top: HY - 78, width: 156, height: 156, borderRadius: "50%", zIndex: 26, background: dead ? "radial-gradient(circle at 36% 32%, #4A2A24, #1A0E0C)" : "radial-gradient(circle at 36% 32%, #EAF6FF, #5AA0DE 62%, #2E64A8)", border: `5px solid ${dead ? "rgba(140,80,70,0.5)" : "rgba(255,255,255,0.75)"}`, boxShadow: dead ? "inset 0 0 30px rgba(0,0,0,0.6)" : `0 0 ${46 + Math.sin(lf / 5) * 16}px rgba(90,160,222,0.9)`, transform: `scale(${(1 - kill * 0.3) * (1 - implode) * (1 + impact * 0.18)})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {!dead && <div style={{ width: 92, height: 92, borderRadius: "50%", border: "3px solid rgba(255,255,255,0.4)", transform: `scale(${1 + Math.sin(lf / 5) * 0.09})` }} />}
            {!dead && <div style={{ position: "absolute", width: 124, height: 124, borderRadius: "50%", border: "2px solid rgba(180,225,255,0.28)", transform: `rotate(${lf * 4}deg) scale(${1 + Math.sin(lf / 8 + 1) * 0.05})`, borderStyle: "dashed" }} />}
          </div>
        )}
        {/* implosion suck-ring */}
        {implode > 0.02 && implode < 1 && <div style={{ position: "absolute", left: HX - 110, top: HY - 110, width: 220, height: 220, borderRadius: "50%", border: "5px solid rgba(255,190,120,0.85)", transform: `scale(${1 - implode * 0.94})`, opacity: 1 - implode * 0.5, zIndex: 27, boxShadow: "0 0 30px rgba(255,180,110,0.7)" }} />}

        {/* --- BEAT 3: the dead ZERO slams in where the mind was --- */}
        {zero > 0.02 && (
          <div style={{ position: "absolute", left: HX - 90, top: HY - 118, width: 180, textAlign: "center", zIndex: 30, transform: `scale(${zero * (1 + impact2 * 0.1)}) translateY(${(1 - zeroSettle) * -4}px)`, opacity: flick }}>
            <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 196, lineHeight: 1, color: "#E0503C", textShadow: `0 0 ${44 + Math.sin(lf / 6) * 14}px rgba(224,80,60,0.8), 0 6px 0 rgba(0,0,0,0.4)` }}>0</span>
          </div>
        )}

        {/* --- CHROMATIC shockwaves (slam + zero-slam) --- */}
        {impact > 0 && (
          <>
            {[["rgba(255,90,70,0.9)", 1.0, -6], ["rgba(90,220,255,0.9)", 0.94, 6], ["rgba(255,244,225,0.95)", 0.97, 0]].map(([col, mul, off], k) => (
              <div key={"cw" + k} style={{ position: "absolute", left: HX + (off as number), top: HY, width: 20, height: 20, marginLeft: -10, marginTop: -10, borderRadius: "50%", border: `7px solid ${col as string}`, transform: `scale(${1 + (1 - impact) * 31 * (mul as number)})`, opacity: impact * 0.9, zIndex: 41, mixBlendMode: "screen", pointerEvents: "none" }} />
            ))}
            <div style={{ position: "absolute", inset: 0, background: `rgba(255,246,228,${impact * 0.55})`, zIndex: 42, pointerEvents: "none" }} />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(90deg, rgba(255,60,40,${impact * 0.18}), transparent 40%, transparent 60%, rgba(60,200,255,${impact * 0.18}))`, zIndex: 42, mixBlendMode: "screen", pointerEvents: "none" }} />
          </>
        )}
        {impact2 > 0 && (
          <>
            <div style={{ position: "absolute", left: HX, top: HY, width: 20, height: 20, marginLeft: -10, marginTop: -10, borderRadius: "50%", border: "6px solid rgba(255,120,95,0.9)", transform: `scale(${1 + (1 - impact2) * 24})`, opacity: impact2 * 0.85, zIndex: 41, pointerEvents: "none" }} />
            <div style={{ position: "absolute", inset: 0, background: `rgba(255,160,130,${impact2 * 0.2})`, zIndex: 42, pointerEvents: "none" }} />
          </>
        )}

        {/* --- SUBORDINATE: the [X], the cursor --- */}
        <div style={{ position: "absolute", left: 786, top: 150, zIndex: 30 }}>
          <div style={{ width: 54, height: 54, borderRadius: "50%", background: impact > 0.3 ? "#E0503C" : "#C44A3A", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: 32, boxShadow: `0 0 ${14 + impact * 26}px rgba(224,80,60,0.7)`, transform: `scale(${impact > 0.3 ? 0.8 : 1 + Math.sin(lf / 6) * 0.04})`, border: "3px solid rgba(255,255,255,0.28)" }}>×</div>
          <div style={{ marginTop: 6, textAlign: "center", fontFamily: mono, fontSize: 13, color: "rgba(205,210,225,0.6)" }}>close chat</div>
        </div>
        {/* speed streak — sells that the cursor is already mid-flight at frame 0 */}
        {curP < 0.97 && <div style={{ position: "absolute", left: curX + 26, top: curY + 16 + curKick, width: 34 + (1 - curP) * 104, height: 5, borderRadius: 3, background: "linear-gradient(90deg, rgba(255,250,235,0.55), transparent)", transform: "rotate(-38deg)", transformOrigin: "0% 50%", opacity: (1 - curP) * 0.75, filter: "blur(1.5px)", zIndex: 39, pointerEvents: "none" }} />}
        <div style={{ position: "absolute", left: curX, top: curY + curKick, zIndex: 40, transform: `rotate(${-22 - impact * 8}deg) scale(${impact > 0.4 ? 0.86 : 1})` }}>
          <svg viewBox="0 0 46 58" width={76} height={96}><polygon points="3,3 3,48 16,37 23,55 31,51 24,34 39,34" fill="#FBF7EE" stroke="#1A1813" strokeWidth={3.2} /></svg>
        </div>

        {/* --- BEAT 4: the goldfish (the Claude mascot in its goldfish costume) reacts --- */}
        <div style={{ position: "absolute", left: 92, top: 512, zIndex: 28, transform: `translateY(${Math.sin(lf / 14) * 3}px)` }}>
          <div style={{ position: "relative", width: 156, height: 150 }}>
            <div style={{ position: "absolute", left: 8, top: 22, width: 140, height: 124, borderRadius: "14px 14px 46% 46% / 14px 14px 42% 42%", background: "linear-gradient(180deg, rgba(130,200,235,0.24), rgba(60,140,200,0.4))", border: "4px solid rgba(220,242,252,0.5)", boxShadow: "inset 0 8px 20px rgba(255,255,255,0.3)", overflow: "hidden" }}>
              <Bubbles lf={lf} x={104} y={120} n={5} spread={40} />
              <div style={{ position: "absolute", left: 30, top: 34, transform: `rotate(${lf >= deadAt ? 176 : Math.sin(lf / 12) * 6 - (lf >= fishAt ? 8 : 0)}deg) translateY(${lf >= deadAt ? 16 : 0}px) scale(${1 + over(lf, fishAt, fr(0.14), Easing.out(Easing.back(3))) * 0.14 * (lf < deadAt ? 1 : 0)})`, transformOrigin: "50% 60%" }}>
                <svg viewBox="0 0 120 90" width={82} height={62} style={{ overflow: "visible" }}>
                  <polygon points="10,45 -14,26 -14,64" fill="#E07E22" /><polygon points="56,10 42,-10 74,-10" fill="#E8862C" />
                  <rect x={20} y={22} width={72} height={48} rx={18} fill="#F0972F" />
                  <rect x={20} y={22} width={72} height={10} rx={5} fill="rgba(255,255,255,0.25)" />
                  {lf >= deadAt
                    ? <><path d="M36 40 l11 11 M47 40 l-11 11" stroke="#2A1B0E" strokeWidth={4} strokeLinecap="round" /><path d="M66 40 l11 11 M77 40 l-11 11" stroke="#2A1B0E" strokeWidth={4} strokeLinecap="round" /></>
                    : lf >= fishAt
                      ? <>
                        <circle cx={41} cy={43} r={11 * (0.7 + over(lf, fishAt, fr(0.14), Easing.out(Easing.back(3))) * 0.3)} fill="#FBF7EE" stroke="#2A1B0E" strokeWidth={2.5} />
                        <circle cx={71} cy={43} r={11 * (0.7 + over(lf, fishAt, fr(0.14), Easing.out(Easing.back(3))) * 0.3)} fill="#FBF7EE" stroke="#2A1B0E" strokeWidth={2.5} />
                        <circle cx={41} cy={44} r={4.5} fill="#2A1B0E" /><circle cx={71} cy={44} r={4.5} fill="#2A1B0E" />
                      </>
                      : <><rect x={36} y={36} width={11} height={15} rx={3} fill="#2A1B0E" /><rect x={66} y={36} width={11} height={15} rx={3} fill="#2A1B0E" /></>}
                </svg>
              </div>
            </div>
            <div style={{ position: "absolute", left: 26, top: 12, width: 104, height: 18, borderRadius: "50%", border: "4px solid rgba(220,242,252,0.55)" }} />
          </div>
        </div>

        {/* --- BEAT 5: the ONE receipt stamps in --- */}
        {tag > 0.02 && <div style={{ position: "absolute", left: 744, top: 470, zIndex: 32, transform: `scale(${tag}) rotate(${-4 - (1 - tag) * 10}deg)`, padding: "9px 16px", borderRadius: 10, background: "#12151C", border: "2.5px solid #E0503C", fontFamily: mono, fontWeight: 800, fontSize: 18, color: "#F6B0A5", boxShadow: `0 10px 22px rgba(0,0,0,0.5), 0 0 ${10 + Math.sin(lf / 5) * 6}px rgba(224,80,60,0.4)` }}>MEMORY: 0 KB</div>}
      </div>

      <Glint lf={lf} at={0.72} dur={0.36} />
      <SceneTitle lf={lf} a="CLAUDE IS A" b="GOLDFISH" accent="#5AA0DE" size={48} />
      <LivePill lf={lf} text="CLAUBE · LIVE" />
      <SubLabel text="IT FORGETS THE SECOND YOU CLOSE" />
    </Panel>
  );
};

// ===== RealMemory (CALLBACK-bar single-hero, workflow-authored) =====
// polished winged-Hermes CREST emblem (the in-house Hermes "logo")
const HermesCrest: React.FC<{ size?: number; glow?: number; lf?: number }> = ({ size = 90, glow = 0, lf = 0 }) => {
  const flap = Math.sin(lf / 7) * 2.4;
  const feather = (dir: number) => (
    <g transform={`translate(60 50) scale(${dir} 1)`}>
      {[0, 1, 2, 3, 4].map((k) => {
        const len = 42 - k * 6;
        return (
          <polygon
            key={k}
            points={`4,${-14 + k * 7} ${4 + len},${-20 + k * 7 - flap} ${4 + len * 0.6},${-8 + k * 7} `}
            fill={k % 2 ? "#F7F1E2" : "#EADFC6"}
            stroke="#D3C6A6"
            strokeWidth={1}
          />
        );
      })}
    </g>
  );
  return (
    <svg viewBox="0 0 120 104" width={size} height={size * 104 / 120} style={{ overflow: "visible", filter: `drop-shadow(0 0 ${5 + glow * 28}px rgba(240,203,99,${(0.3 + glow * 0.6).toFixed(2)})) drop-shadow(0 4px 9px rgba(0,0,0,0.4))` }}>
      {feather(-1)}
      {feather(1)}
      {/* medallion ring */}
      <circle cx={60} cy={56} r={30} fill="#8A6420" />
      <circle cx={60} cy={56} r={28} fill={GOLD} />
      <circle cx={60} cy={56} r={28} fill="none" stroke="#F6E4A0" strokeWidth={2.5} />
      <path d="M36 46 A28 28 0 0 1 84 46" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth={3} strokeLinecap="round" />
      {/* winged-helmet H glyph */}
      <rect x={49} y={42} width={7} height={28} rx={2} fill="#20345A" />
      <rect x={64} y={42} width={7} height={28} rx={2} fill="#20345A" />
      <rect x={49} y={52} width={22} height={7} rx={2} fill="#20345A" />
      {/* crest nub */}
      <rect x={56} y={20} width={8} height={12} rx={3} fill="#F6E4A0" stroke="#C99A2E" strokeWidth={1.5} />
    </svg>
  );
};

// S1 REAL MEMORY — hero = a MASSIVE HERMES cartridge slamming home + a giant igniting LV.47.
// Hierarchy: cartridge + LV.47 are the only bright things; cabinets recede; mascot small.
// S1 REAL MEMORY — hero = a MASSIVE HERMES cartridge slamming home + a giant igniting LV.47.
// Hierarchy: cartridge + LV.47 are the only bright things; cabinets recede; mascot small.
// Beats: anticipation -> SLAM -> level-up -> shard stream -> hologram ring -> power-up + goldfish callback.
const RealMemory: React.FC<{ lf: number }> = ({ lf }) => {
  // ---------- beat clock (303 frames / 10.11s) ----------
  const slamAt = fr(1.25);
  const lift = over(lf, slamAt - fr(0.95), fr(0.45), Easing.out(Easing.cubic));      // B1 anticipation
  const drop = over(lf, slamAt - fr(0.5), fr(0.5), Easing.in(Easing.cubic));         // B1 descend
  const seated = lf >= slamAt;                                                        // B2 slam
  const impact = seated ? Math.max(0, 1 - (lf - slamAt) / 10) : 0;
  const lvP = over(lf, slamAt + fr(0.12), fr(1.9), Easing.out(Easing.cubic));        // B3 level up
  const lv = Math.round(lvP * 47);
  const xp = lvP;
  const cheer = over(lf, slamAt + fr(0.1), fr(0.7));
  const slots = 6;

  // B4 — memory shards streaming in from off-frame and absorbed by the cartridge
  const SHARD = [
    { t: 3.40, sx: -140, sy: 250, tag: "PROJECT", c: "#7FC0F2" },
    { t: 3.72, sx: 1150, sy: 316, tag: "STYLE", c: "#E7B24C" },
    { t: 4.04, sx: -140, sy: 540, tag: "RULES", c: "#8FE0B0" },
    { t: 4.36, sx: 1150, sy: 168, tag: "PREFS", c: "#9E76CF" },
    { t: 4.68, sx: -140, sy: 150, tag: "REPO", c: "#7FC0F2" },
    { t: 5.00, sx: 1150, sy: 540, tag: "TONE", c: "#EE7E86" },
  ];
  const shardHit = (k: number) => fr(SHARD[k].t) + fr(0.6);
  let lvKick = 0;
  for (let k = 0; k < SHARD.length; k++) { const h = shardHit(k); if (lf >= h) lvKick = Math.max(lvKick, Math.max(0, 1 - (lf - h) / 9)); }
  const absorbed = SHARD.filter((_, k) => lf >= shardHit(k)).length;

  // B5 — hologram ring of remembered facts
  const ringP = over(lf, fr(5.5), fr(0.85), Easing.out(Easing.back(1.3)));
  const beamP = over(lf, fr(5.45), fr(0.6));
  const ringRot = lf / 42;
  const FACTS = ["repo: hermes", "tone: dry", "no jargon", "ships fri", "dark mode", "calls me al"];
  const ringLock = over(lf, fr(8.55), fr(0.55), Easing.out(Easing.cubic));

  // B6 — mascot power-up + SAVED FOREVER stamp + goldfish callback
  const aura = over(lf, fr(7.5), fr(0.7), Easing.out(Easing.cubic));
  const stampP = over(lf, fr(8.15), fr(0.42), Easing.out(Easing.back(2.6)));
  const stampHit = Math.max(0, 1 - Math.abs(lf - (fr(8.15) + fr(0.42))) / 8);
  const bowlWake = over(lf, fr(9.05), fr(0.45), Easing.out(Easing.back(1.8)));
  const salute = over(lf, fr(9.35), fr(0.5));
  const saluteWave = Math.sin(lf / 3.2) * 22 * salute;

  // ---------- continuous ambient ----------
  const power = seated ? Math.min(1, (lf - slamAt) / fr(0.4)) * (0.76 + 0.24 * Math.sin(lf / 9)) : 0;
  const breathe = 1 + Math.sin(lf / 16) * 0.028;
  const parallax = Math.sin(lf / 70) * 5;
  const shake = (impact > 0 ? Math.sin(lf * 4.9) * 12 * impact * impact : 0) + (lvKick > 0 ? Math.sin(lf * 5.6) * 3 * lvKick * lvKick : 0) + (stampHit > 0 ? Math.sin(lf * 5.2) * 5 * stampHit : 0);
  const flash = impact * 0.4 + stampHit * 0.12;

  const cartBaseY = 96 - lift * 28;
  const cartY = interpolate(drop, [0, 1], [cartBaseY, 300]) + (drop <= 0 ? Math.sin(lf / 7) * 5 : 0);
  const cartTilt = (1 - drop) * (lift * -3.5) + (seated ? 0 : Math.sin(lf / 9) * 1.2);
  const sqY = seated ? 1 - Math.max(0, 1 - (lf - slamAt) / 11) * 0.13 : 1;
  const sqX = seated ? 1 + Math.max(0, 1 - (lf - slamAt) / 11) * 0.11 : 1;
  const lvPop = seated ? 1 + Math.max(0, 1 - (lf - slamAt) / 9) * 0.5 + lvKick * 0.13 : 0;

  return (
    <Panel tint="rgba(90,160,222,0.4)">
      {/* ================= BACKGROUND (z 0..8) — quiet, receding, built from light + depth ================= */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 90% at 50% 34%, #1A3355 0%, #0D1D33 54%, #060D18 100%)", zIndex: 0 }} />
      <RoomWall hue="rgba(90,150,210,0.05)" tile={86} />

      {/* far receding arcade arches, silhouette, very low contrast */}
      <div style={{ position: "absolute", left: 96 + parallax * 0.4, top: 128, width: 820, height: 330, borderRadius: "300px 300px 0 0", border: "3px solid rgba(90,150,210,0.07)", background: "linear-gradient(180deg, rgba(20,42,70,0.42), rgba(8,16,30,0.1))", zIndex: 1 }} />
      <div style={{ position: "absolute", left: 196 + parallax * 0.7, top: 186, width: 620, height: 280, borderRadius: "240px 240px 0 0", border: "3px solid rgba(90,150,210,0.09)", background: "linear-gradient(180deg, rgba(24,50,82,0.4), rgba(8,16,30,0.08))", zIndex: 1 }} />

      {/* far cabinet row (deep) */}
      {Array.from({ length: 9 }).map((_, i) => { const h = 74 + seed(i * 7.1) * 46; return (
        <div key={`fc${i}`} style={{ position: "absolute", left: -20 + i * 118 + parallax * 0.5, top: 470 - h - 44, width: 96, height: h, borderRadius: "6px 6px 0 0", background: grad("#0E1D33", "#07101D"), border: "1.5px solid rgba(90,140,200,0.06)", zIndex: 2, opacity: 0.55 }} />); })}

      {/* near cabinet row (the original arcade wall) */}
      {Array.from({ length: 7 }).map((_, i) => { const h = 110 + seed(i * 4.3) * 80; return (
        <div key={`c${i}`} style={{ position: "absolute", left: 18 + i * 144 + parallax, top: 470 - h, width: 118, height: h, borderRadius: "8px 8px 0 0", background: grad("#132743", "#0A1626"), border: "1.5px solid rgba(90,140,200,0.09)", boxShadow: "inset 0 -26px 44px rgba(0,0,0,0.5)", zIndex: 2, opacity: 0.7 }}>
          <div style={{ position: "absolute", left: 14, right: 14, top: 16, height: 44, borderRadius: 5, background: `rgba(90,160,222,${(0.05 + power * 0.07 + over(lf, slamAt + fr(0.5 + i * 0.11), fr(0.3)) * 0.06).toFixed(3)})`, border: "1px solid rgba(90,150,210,0.10)" }} />
          <div style={{ position: "absolute", left: 46, bottom: 10, width: 26, height: 4, borderRadius: 2, background: `rgba(120,190,245,${(0.08 + power * 0.14).toFixed(3)})` }} />
        </div>); })}

      {/* soft god-rays raking down from the ceiling — light, not clutter */}
      {[0, 1, 2].map((k) => (
        <div key={`ray${k}`} style={{ position: "absolute", left: 190 + k * 250, top: 84, width: 108, height: 470, background: `linear-gradient(180deg, rgba(150,205,245,${(0.055 + power * 0.05 + ringP * 0.03).toFixed(3)}), transparent 76%)`, transform: `rotate(${k === 1 ? 0 : k === 0 ? 8 : -8}deg)`, transformOrigin: "50% 0%", filter: "blur(9px)", zIndex: 3, pointerEvents: "none" }} />
      ))}

      {/* ambient glow pools */}
      <div style={{ position: "absolute", left: 156, top: 130, width: 700, height: 470, borderRadius: "50%", background: `radial-gradient(circle, rgba(90,160,222,${(0.14 + power * 0.22).toFixed(3)}), transparent 66%)`, filter: "blur(22px)", zIndex: 3 }} />
      <div style={{ position: "absolute", left: 596, top: 152, width: 430, height: 380, borderRadius: "50%", background: `radial-gradient(circle, rgba(231,178,76,${(0.05 + lvP * 0.16 + ringLock * 0.1).toFixed(3)}), transparent 68%)`, filter: "blur(24px)", zIndex: 3 }} />

      <StageFloor top={562} hue1="#152740" hue2="#08101C" />
      <div style={{ position: "absolute", left: 0, right: 0, top: 559, height: 6, background: `linear-gradient(180deg, rgba(120,190,245,${(0.1 + power * 0.16).toFixed(3)}), transparent)`, zIndex: 5 }} />

      {/* floor reflection smear of the hero + pooled contact glow */}
      <div style={{ position: "absolute", left: 352, top: 566, width: 240, height: 160, background: `linear-gradient(180deg, rgba(110,180,240,${(0.04 + power * 0.2).toFixed(3)}), transparent 74%)`, filter: "blur(13px)", zIndex: 6, opacity: seated ? 1 : 0.35 }} />
      <div style={{ position: "absolute", left: 286, top: 548, width: 440, height: 84, borderRadius: "50%", background: `radial-gradient(ellipse, rgba(120,190,245,${(0.12 + power * 0.26).toFixed(3)}), transparent 70%)`, filter: "blur(12px)", zIndex: 6 }} />

      <SpotCone x={470} topY={140} floorY={566} spread={400} hue="#BFDCF7" lit={0.55 + power * 0.4} />

      {/* drifting dust motes — always alive */}
      {Array.from({ length: 16 }).map((_, i) => { const s = seed(i * 5.7); const rise = ((lf * (0.4 + s * 0.6) + i * 44) % 340); return <div key={`d${i}`} style={{ position: "absolute", left: 70 + s * 870 + Math.sin(rise / 30 + i) * 12, top: 566 - rise, width: 3 + s * 3, height: 3 + s * 3, borderRadius: "50%", background: "rgba(190,224,247,0.5)", boxShadow: "0 0 6px rgba(160,210,245,0.5)", opacity: Math.max(0, 1 - rise / 340) * (0.32 + 0.22 * Math.abs(Math.sin(lf / 14 + i))), zIndex: 4 }} />; })}

      {/* ================= FOREGROUND / HERO (single stacking context, z 20) ================= */}
      <div style={{ position: "absolute", inset: 0, transform: `translate(${shake}px, ${shake * 0.4}px)`, zIndex: 20 }}>

        {/* ---- hero halo behind the cartridge (breathes) ---- */}
        <div style={{ position: "absolute", left: 276, top: 200, width: 388, height: 390, borderRadius: "50%", background: `radial-gradient(closest-side, rgba(120,190,245,${(0.08 + power * 0.2).toFixed(3)}), transparent 72%)`, filter: "blur(16px)", zIndex: 1, transform: `scale(${breathe})` }} />

        {/* ---- console + port the cartridge slams into ---- */}
        <div style={{ position: "absolute", left: 300, top: 470, width: 340, height: 92, borderRadius: 14, background: grad("#27466B", "#122238"), border: `3px solid ${seated ? "#7FC0F2" : "#3E6392"}`, boxShadow: `0 22px 40px -14px rgba(0,0,0,0.7), 0 0 ${power * 40}px rgba(90,160,222,${power * 0.7})`, zIndex: 2 }}>
          {/* the port mouth — iris opens during anticipation, ignites on slam */}
          <div style={{ position: "absolute", left: 78, top: -8, width: 184, height: 16, borderRadius: 5, background: "#060D18", boxShadow: `inset 0 3px 6px rgba(0,0,0,0.9), 0 0 ${6 + lift * 10 + power * 22}px rgba(120,190,245,${0.25 + lift * 0.4 + power})` }} />
          <div style={{ position: "absolute", left: 18, bottom: 14, fontFamily: mono, fontSize: 14, letterSpacing: "0.16em", color: "rgba(150,195,240,0.75)" }}>◆ SAVE STATION</div>
          <div style={{ position: "absolute", right: 18, bottom: 12, display: "flex", alignItems: "center", gap: 7 }}>
            <span style={{ fontFamily: mono, fontSize: 14, letterSpacing: "0.16em", color: seated ? "#8FE0B0" : "rgba(150,195,240,0.5)" }}>SAVE</span>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: seated ? "#6FD3AE" : "#C44A3A", boxShadow: `0 0 ${seated ? 10 + lvKick * 10 : 10}px ${seated ? "#6FD3AE" : "#C44A3A"}`, opacity: 0.6 + 0.4 * Math.abs(Math.sin(lf / 7)) }} />
          </div>
          {/* slot row lights in sequence after the slam, then ticks again per absorbed shard */}
          <div style={{ position: "absolute", left: 96, top: 22, display: "flex", gap: 8 }}>
            {Array.from({ length: slots }).map((_, i) => {
              const on = over(lf, slamAt + fr(0.45 + i * 0.13), fr(0.2)) > 0.5;
              const tick = lf >= shardHit(i) ? Math.max(0, 1 - (lf - shardHit(i)) / 8) : 0;
              return <div key={i} style={{ width: 24, height: 24, borderRadius: 5, background: on ? grad("#7FC0F2", "#2E64A8") : "#122238", border: `2px solid ${tick > 0.1 ? "#FFF6DC" : on ? "#BFE0FB" : "#2C4966"}`, boxShadow: on ? `0 0 ${10 + tick * 16}px rgba(120,190,245,0.9)` : "none", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "#EAF4FF", transform: `scale(${1 + tick * 0.28})` }}>{on ? "✓" : ""}</div>;
            })}
          </div>
        </div>

        {/* ---- B1 drop-guide rails light during anticipation ---- */}
        {lift > 0.02 && drop < 0.98 && [0, 1].map((k) => (
          <div key={`rail${k}`} style={{ position: "absolute", left: k ? 578 : 352, top: cartY + 150, width: 6, height: Math.max(0, 470 - (cartY + 150)), background: `linear-gradient(180deg, rgba(120,190,245,${0.1 + lift * 0.5}), rgba(120,190,245,0.05))`, borderRadius: 3, zIndex: 2, opacity: lift * (1 - drop) }} />
        ))}

        {/* ================= HERO: the MASSIVE HERMES cartridge ================= */}
        <div style={{ position: "absolute", left: 356, top: cartY, width: 228, height: 190, zIndex: 6, transform: `scale(${sqX}, ${sqY}) rotate(${cartTilt}deg)`, transformOrigin: "50% 100%", filter: `drop-shadow(0 20px 34px rgba(0,0,0,0.6)) drop-shadow(0 0 ${22 + power * 40 + lvKick * 26}px rgba(90,160,222,${0.4 + power * 0.5}))` }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: "18px 18px 6px 6px", background: grad("#4A82C6", "#1C3C6C"), border: `4px solid ${power > 0.1 ? "#9FCDF3" : "#6FA4DD"}`, boxShadow: "inset 0 5px 0 rgba(255,255,255,0.26), inset 0 -20px 40px rgba(10,24,48,0.6)" }} />
          <div style={{ position: "absolute", left: 26, top: 18, right: 26, height: 96, borderRadius: 10, background: grad("#F9F4E7", "#E2D5B8"), border: "3px solid #C9A24A", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "inset 0 3px 0 rgba(255,255,255,0.7)" }}>
            <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 34, color: "#2A1B0E", letterSpacing: "0.04em" }}>HERMES</span>
          </div>
          {/* absorb flare on the label when a shard lands */}
          {lvKick > 0.02 && <div style={{ position: "absolute", left: 26, top: 18, right: 26, height: 96, borderRadius: 10, background: `rgba(255,250,230,${lvKick * 0.55})`, pointerEvents: "none" }} />}
          {Array.from({ length: 8 }).map((_, i) => <div key={i} style={{ position: "absolute", bottom: 6, left: 34 + i * 21, width: 12, height: 22, borderRadius: 2, background: grad("#E7C879", "#9C7526"), boxShadow: `0 0 ${power * 8 + lvKick * 10}px rgba(231,200,121,${power})` }} />)}
        </div>

        {/* ---- B2 slam: shockwave ring + kicked dust + white flash ---- */}
        {impact > 0 && <>
          <div style={{ position: "absolute", left: 470, top: 480, width: 20, height: 20, marginLeft: -10, marginTop: -10, borderRadius: "50%", border: "6px solid rgba(191,224,251,0.9)", transform: `scale(${1 + (1 - impact) * 26})`, opacity: impact, zIndex: 12 }} />
          <div style={{ position: "absolute", left: 470, top: 486, width: 20, height: 20, marginLeft: -10, marginTop: -10, borderRadius: "50%", border: "3px solid rgba(231,178,76,0.8)", transform: `scale(${1 + (1 - impact) * 40})`, opacity: impact * 0.7, zIndex: 12 }} />
          {Array.from({ length: 10 }).map((_, k) => { const s = seed(k * 3.3); const d = (1 - impact) * (60 + s * 90); const side = k % 2 ? 1 : -1; return <div key={`kd${k}`} style={{ position: "absolute", left: 470 + side * d, top: 486 - (1 - impact) * (18 + s * 34), width: 5 + s * 4, height: 5 + s * 4, borderRadius: "50%", background: "rgba(200,230,250,0.8)", opacity: impact * 0.8, zIndex: 12 }} />; })}
        </>}
        {flash > 0.005 && <div style={{ position: "absolute", inset: 0, background: `rgba(230,244,255,${flash})`, zIndex: 14, pointerEvents: "none" }} />}

        {/* ================= HERO NUMBER: giant LV. 47 ================= */}
        {seated && <div style={{ position: "absolute", left: 638, top: 200, zIndex: 10, transform: `scale(${lvPop})`, transformOrigin: "0% 50%" }}>
          <div style={{ fontFamily: mono, fontWeight: 800, fontSize: 26, letterSpacing: "0.1em", color: "#8FC3F0", marginBottom: -6 }}>LV.</div>
          <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 152, lineHeight: 0.88, color: GOLD, textShadow: `0 0 ${34 + power * 26 + lvKick * 34}px rgba(231,178,76,${0.8}), 0 5px 0 rgba(0,0,0,0.35)` }}>{lv}</div>
          <div style={{ marginTop: 10, width: 224, height: 20, borderRadius: 999, background: "#0E1D30", border: `2px solid ${lvKick > 0.1 ? "#FFE9A8" : "#2C4E74"}`, overflow: "hidden", boxShadow: "inset 0 2px 5px rgba(0,0,0,0.6)" }}>
            <div style={{ height: "100%", width: `${xp * 100}%`, background: grad("#8FD0F5", "#2F7FC9"), boxShadow: `0 0 ${12 + lvKick * 14}px rgba(120,190,245,0.9)` }} />
          </div>
          {/* memory-shard counter ticks up as shards land */}
          {absorbed > 0 && <div style={{ marginTop: 10, display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 12px", borderRadius: 8, background: "rgba(90,160,222,0.18)", border: "1.5px solid rgba(127,192,242,0.6)", fontFamily: mono, fontSize: 15, letterSpacing: "0.08em", color: "#BFE0FB", transform: `scale(${1 + lvKick * 0.1})`, transformOrigin: "0% 50%" }}>
            ◈ MEMORIES <b style={{ color: "#FFF6DC" }}>&nbsp;{absorbed}/6</b>
          </div>}
        </div>}

        {/* ================= B4: memory-shards streaming in and being absorbed ================= */}
        {SHARD.map((sh, k) => {
          const p = over(lf, fr(sh.t), fr(0.6), Easing.in(Easing.cubic));
          if (p <= 0 || p >= 1) return null;
          const x = sh.sx + (470 - sh.sx) * p;
          const y = sh.sy + (395 - sh.sy) * p + Math.sin(p * Math.PI) * -28;
          const sc = 1 - p * 0.6;
          const op = p < 0.86 ? 1 : Math.max(0, (1 - p) / 0.14);
          return (
            <div key={`sh${k}`} style={{ position: "absolute", left: x - 46, top: y - 26, zIndex: 8, transform: `scale(${sc}) rotate(${(1 - p) * (sh.sx < 0 ? -14 : 14)}deg)`, opacity: op }}>
              {/* comet trail */}
              <div style={{ position: "absolute", left: sh.sx < 0 ? -84 : 92, top: 18, width: 84, height: 10, borderRadius: 6, background: `linear-gradient(${sh.sx < 0 ? "90deg" : "270deg"}, transparent, ${sh.c})`, opacity: 0.5, filter: "blur(3px)" }} />
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 10, background: "rgba(10,20,36,0.92)", border: `2.5px solid ${sh.c}`, boxShadow: `0 0 20px ${sh.c}99`, whiteSpace: "nowrap" }}>
                <span style={{ width: 14, height: 14, background: sh.c, transform: "rotate(45deg)", borderRadius: 3, boxShadow: `0 0 10px ${sh.c}` }} />
                <span style={{ fontFamily: mono, fontWeight: 800, fontSize: 16, letterSpacing: "0.1em", color: "#EAF4FF" }}>{sh.tag}</span>
              </div>
            </div>
          );
        })}

        {/* ================= B5: hologram ring of remembered facts ================= */}
        {beamP > 0.02 && <div style={{ position: "absolute", left: 300, top: 158, width: 340, height: 330, clipPath: "polygon(38% 0, 62% 0, 100% 100%, 0% 100%)", background: `linear-gradient(0deg, rgba(127,192,242,${(0.18 * beamP).toFixed(3)}), transparent 84%)`, filter: "blur(5px)", zIndex: 3, pointerEvents: "none" }} />}
        {ringP > 0.02 && <>
          <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", left: 0, top: 0, zIndex: 4, pointerEvents: "none", overflow: "visible" }}>
            <ellipse cx={470} cy={200} rx={196 * ringP} ry={54 * ringP} fill="none" stroke={ringLock > 0.3 ? GOLD : "#7FC0F2"} strokeWidth={ringLock > 0.3 ? 3.5 : 2.5} opacity={0.35 + ringP * 0.4} strokeDasharray="10 14" strokeDashoffset={-lf * 1.6} style={{ filter: `drop-shadow(0 0 ${8 + ringLock * 16}px ${ringLock > 0.3 ? "rgba(231,178,76,0.8)" : "rgba(127,192,242,0.7)"})` }} />
            <ellipse cx={470} cy={200} rx={162 * ringP} ry={44 * ringP} fill="none" stroke={ringLock > 0.3 ? "#F6E4A0" : "#BFE0FB"} strokeWidth={1.5} opacity={(0.18 + ringP * 0.22) * breathe} />
          </svg>
          {FACTS.map((t, k) => {
            const inP = over(lf, fr(5.6 + k * 0.16), fr(0.35), Easing.out(Easing.back(1.7)));
            if (inP <= 0.02) return null;
            const a = ringRot + (k * Math.PI * 2) / FACTS.length;
            const x = 470 + Math.cos(a) * 196;
            const y = 200 + Math.sin(a) * 54;
            const depth = 0.62 + (Math.sin(a) + 1) / 2 * 0.38;
            return (
              <div key={`fx${k}`} style={{ position: "absolute", left: x, top: y, zIndex: Math.sin(a) > 0 ? 5 : 3, transform: `translate(-50%, -50%) scale(${depth * inP})`, opacity: depth * inP * 0.95 }}>
                <div style={{ padding: "5px 11px", borderRadius: 8, background: "rgba(10,22,40,0.86)", border: `1.5px solid ${ringLock > 0.3 ? "rgba(231,178,76,0.75)" : "rgba(127,192,242,0.6)"}`, fontFamily: mono, fontWeight: 700, fontSize: 15, letterSpacing: "0.04em", color: ringLock > 0.3 ? "#F6E4A0" : "#BFE0FB", whiteSpace: "nowrap", boxShadow: `0 0 ${10 + ringLock * 12}px rgba(90,160,222,0.4)` }}>{t}</div>
              </div>
            );
          })}
          {ringLock > 0.05 && <div style={{ position: "absolute", left: 470, top: 200, zIndex: 6, transform: `translate(-50%,-50%) scale(${ringLock})`, fontFamily: mono, fontWeight: 900, fontSize: 15, letterSpacing: "0.18em", color: "#F6E4A0", textShadow: `0 0 14px rgba(231,178,76,0.9)`, opacity: 0.55 + 0.45 * Math.abs(Math.sin(lf / 9)) }}>🔒 LOCKED</div>}
        </>}

        {/* ================= B6: mascot power-up (professor archivist, costumed) ================= */}
        <div style={{ position: "absolute", left: 74, top: 400, zIndex: 9 }}>
          {/* aura */}
          {aura > 0.02 && <div style={{ position: "absolute", left: -46, top: -40, width: 240, height: 240, borderRadius: "50%", background: `radial-gradient(circle, rgba(231,178,76,${(aura * 0.34 * breathe).toFixed(3)}), transparent 66%)`, filter: "blur(12px)" }} />}
          {/* rising power sparks */}
          {aura > 0.1 && Array.from({ length: 7 }).map((_, k) => { const s = seed(k * 2.9); const rise = ((lf * (1.1 + s * 0.9) + k * 21) % 120); return <div key={`sp${k}`} style={{ position: "absolute", left: 8 + s * 130, top: 150 - rise, width: 4 + s * 4, height: 4 + s * 4, borderRadius: "50%", background: "#F6E4A0", boxShadow: "0 0 8px rgba(246,228,160,0.9)", opacity: aura * Math.max(0, 1 - rise / 120) }} />; })}
          <div style={{ position: "relative", width: 148, height: 148 }}>
            <Mascot lf={lf} size={148} gaze={3} nodAmp={2.4} cheer={Math.max(cheer * 0.5, aura)} prof={1} glasses={1} />
            {/* costume overlay: gold memory-circlet with a glowing chip gem (shares the 0..200 mascot space) */}
            <svg viewBox="0 0 200 200" width={148} height={148} style={{ position: "absolute", left: 0, top: 0, overflow: "visible", pointerEvents: "none", zIndex: 2 }}>
              <rect x={38} y={44} width={124} height={9} rx={3} fill="#E7B24C" stroke="#A67A1E" strokeWidth={1.5} />
              <rect x={88} y={32} width={24} height={20} rx={4} fill="#1C3C6C" stroke="#7FC0F2" strokeWidth={2.5} />
              <rect x={95} y={39} width={10} height={6} rx={1} fill="#BFE0FB" opacity={0.55 + 0.45 * Math.abs(Math.sin(lf / 6))} />
              <rect x={80} y={38} width={8} height={3} fill="#7FC0F2" />
              <rect x={112} y={38} width={8} height={3} fill="#7FC0F2" />
            </svg>
          </div>
          {cheer > 0.3 && <div style={{ position: "absolute", left: 6, top: -34, padding: "5px 12px", borderRadius: 9, background: "#FBF7EE", border: "2.5px solid #C9A24A", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 17, color: INK, whiteSpace: "nowrap", transform: `scale(${over(lf, slamAt + fr(0.2), fr(0.3), Easing.out(Easing.back(2)))})` }}>LEVEL UP!</div>}
        </div>

        {/* ================= B6: SAVED FOREVER stamp ================= */}
        {stampP > 0.02 && <div style={{ position: "absolute", left: 592, top: 618, zIndex: 11, transform: `rotate(-8deg) scale(${stampP * (1 + stampHit * 0.12)})`, transformOrigin: "50% 50%" }}>
          <div style={{ padding: "10px 20px", borderRadius: 10, border: `4px solid ${GOLD}`, background: "rgba(20,26,40,0.72)", boxShadow: `0 0 ${18 + stampHit * 30}px rgba(231,178,76,0.6)`, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 34, letterSpacing: "0.06em", color: "#F6E4A0", whiteSpace: "nowrap", textShadow: "0 0 16px rgba(231,178,76,0.7)" }}>SAVED FOREVER</div>
        </div>}

        {/* ================= B6 CALLBACK: the retired goldfish bowl graduates ================= */}
        <div style={{ position: "absolute", left: 834, top: 486, zIndex: 8, transform: `scale(${0.42 + bowlWake * 0.05})`, transformOrigin: "0% 100%", opacity: 0.42 + bowlWake * 0.58, filter: `drop-shadow(0 0 ${bowlWake * 18}px rgba(231,178,76,0.5))` }}>
          <div style={{ position: "relative" }}>
            <Fishbowl lf={lf} faint={0} />
            {/* tiny graduation cap + fin salute */}
            {bowlWake > 0.05 && <svg viewBox="0 0 260 240" width={260} height={240} style={{ position: "absolute", left: 0, top: 0, overflow: "visible", pointerEvents: "none" }}>
              <g transform={`translate(0 ${(1 - bowlWake) * -40})`} opacity={bowlWake}>
                <polygon points="86,66 178,66 132,44 40,44" fill="#1C1A24" transform="translate(46 0)" />
                <rect x={112} y={62} width={40} height={14} rx={3} fill="#2A2634" />
                <rect x={128} y={44} width={7} height={26} fill="#E7B24C" transform="translate(46 0)" />
                <circle cx={177} cy={72} r={6} fill="#E7B24C" />
              </g>
              <g transform={`rotate(${saluteWave} 92 120)`} opacity={salute}>
                <polygon points="92,120 58,96 58,140" fill="#F0972F" stroke="#C97220" strokeWidth={2} />
              </g>
            </svg>}
          </div>
        </div>
        {bowlWake > 0.1 && <div style={{ position: "absolute", left: 828, top: 452, zIndex: 9, fontFamily: mono, fontWeight: 800, fontSize: 14, letterSpacing: "0.14em", color: "#8FE0B0", opacity: bowlWake * (0.6 + 0.4 * Math.abs(Math.sin(lf / 8))), textShadow: "0 0 10px rgba(143,224,176,0.7)" }}>RETIRED ✓</div>}
      </div>

      {/* ring-lock shimmer sweep */}
      <Glint lf={lf} at={8.7} dur={0.75} />

      <SceneTitle lf={lf} a="REAL" b="MEMORY" accent={GOLD} size={60} />
      <LivePill lf={lf} text="HERMES · INSTALLED" />
      <SubLabel text="PERSISTENT MEMORY · LV.0 → LV.47" />
    </Panel>
  );
};


// ===== Groundhog (CALLBACK-bar single-hero, workflow-authored) =====
// S2 — GROUNDHOG DAY, EVERY CHAT — 6am amnesiac bedroom loop (single-hero, HookHero mold)
const Groundhog: React.FC<{ lf: number }> = ({ lf }) => {
  // ===================== BEAT MAP — 200f / 6.68s, nothing ever sits still =====================
  // B1  0.00–0.55  the GIANT flip-clock SLAMS down to 6:00   (white flash + shockwave + screen shake)
  // B2  0.55–1.25  the pyjama'd mascot BOLTS upright in bed  (nightcap whips, "!" sparks, "who are you?")
  // B3  1.30–4.35  the token-coins ignite ONE BY ONE, scream and DIE (one topples in; souls puff up)
  // B4  1.60–4.35  the $0.94 wasted tag ticks up
  // B5  5.00–5.62  the lower card FLIPS to AGAIN             (second impact: flash + ring + shake)
  // B6  5.72–6.60  loop-arrow spins in, mascot flops back down, nightcap droops over its eyes
  // Continuous under all of it: fire flicker, embers, dust motes, hero glow breathing, idle bob, parallax.

  // ---- B1: the slam ----
  const drop = over(lf, 0, fr(0.34), Easing.in(Easing.cubic));
  const clockY = (1 - drop) * -330;
  const HIT1 = fr(0.34);
  const hit1 = lf >= HIT1 ? Math.max(0, 1 - (lf - HIT1) / 13) : 0;
  const ring1 = over(lf, HIT1, fr(0.62), Easing.out(Easing.cubic));
  const buzz = Math.max(0, 1 - lf / fr(0.95));

  // ---- B2: the bolt upright ----
  const bolt = over(lf, fr(0.5), fr(0.42), Easing.out(Easing.back(2.0)));
  const alertEyes = over(lf, fr(0.58), fr(0.22));
  const capWhip = Math.sin(Math.max(0, lf - fr(0.5)) / 4.2) * Math.max(0, 1 - Math.max(0, lf - fr(0.5)) / fr(1.5));
  const speechPop = over(lf, fr(0.86), fr(0.3), Easing.out(Easing.back(1.7)));
  const speechOut = 1 - over(lf, fr(2.0), fr(0.3));

  // ---- B3: the pyre ----
  const burn = over(lf, fr(1.25), fr(1.5));
  const TOPPLE_AT = fr(2.75);
  const topple = over(lf, TOPPLE_AT, fr(0.78), Easing.in(Easing.cubic));

  // ---- B4: the receipt ----
  const wasteP = over(lf, fr(1.6), fr(2.75), Easing.out(Easing.cubic));
  const tagIn = over(lf, fr(1.7), fr(0.45), Easing.out(Easing.back(1.6)));
  const dollars = (wasteP * 0.94).toFixed(2);

  // ---- B5: the AGAIN flip (the button) ----
  const bandFlip = over(lf, fr(5.0), fr(0.5), Easing.inOut(Easing.cubic));
  const bandTxt = bandFlip < 0.5 ? "DAY 1" : "AGAIN";
  const bandScale = Math.max(0.04, Math.abs(Math.cos(bandFlip * Math.PI)));
  const HIT2 = fr(5.5);
  const hit2 = lf >= HIT2 ? Math.max(0, 1 - (lf - HIT2) / 13) : 0;
  const ring2 = over(lf, HIT2, fr(0.7), Easing.out(Easing.cubic));
  const againOn = over(lf, fr(5.5), fr(0.5), Easing.out(Easing.cubic));

  // ---- B6: the loop button ----
  const loopIn = over(lf, fr(5.72), fr(0.42), Easing.out(Easing.back(2.2)));
  const loopSpin = over(lf, fr(5.8), fr(0.8), Easing.inOut(Easing.cubic));
  const groan = over(lf, fr(4.4), fr(0.7));
  const collapse = over(lf, fr(5.82), fr(0.55), Easing.in(Easing.quad));
  const digitJit = lf >= fr(6.3) ? Math.sin(lf * 3.1) * 3 * Math.max(0, 1 - (lf - fr(6.3)) / 11) : 0;

  // ---- continuous ambience ----
  const breathe = 1 + Math.sin(lf / 9) * 0.045;
  const flick = 0.86 + Math.abs(Math.sin(lf / 3.4)) * 0.14;
  const par = Math.sin(lf / 62) * 3;
  const idle = Math.sin(lf / 9) * 2.4;
  const shake = (buzz > 0 ? Math.sin(lf * 4.6) * 8 * buzz : 0) + Math.sin(lf * 2.3) * 13 * hit1 + Math.sin(lf * 2.1) * 9 * hit2;
  const flash = Math.min(0.55, hit1 * 0.5 + hit2 * 0.4);
  const clockTxt = lf < fr(0.2) ? "5:59" : "6:00";

  // ---- the nine token-coins: each one is a little guy about to have a very bad morning ----
  const COINS: number[][] = [[8, 122], [64, 128], [122, 120], [36, 88], [92, 92], [148, 84], [64, 52], [120, 54], [92, 18]];
  const coinBeat = (i: number) => {
    const t0 = i === 8 ? TOPPLE_AT + fr(0.5) : fr(1.3 + i * 0.3);
    return {
      wide: over(lf, t0, fr(0.16)),                                       // eyes go wide
      scream: over(lf, t0 + fr(0.09), fr(0.2)),                           // mouth opens, it screams
      char: over(lf, t0 + fr(0.3), fr(0.5), Easing.inOut(Easing.cubic)),  // melt, blacken, curl, die
    };
  };
  // rising souls, staggered so the 4.2–5.2 lull is never empty
  const SOULS: number[][] = [[452, 578, 2.15], [506, 552, 3.05], [386, 620, 3.55], [518, 522, 4.25], [430, 566, 4.95]];

  return (
    <Panel tint="rgba(238,126,134,0.42)">
      {/* ==================== QUIET RECEDING BACKGROUND (z 0..8) ==================== */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #241A2C 0%, #1B1424 44%, #100B16 100%)", zIndex: 0 }} />
      <RoomWall hue="rgba(190,120,140,0.045)" tile={104} />

      {/* --- deep layer: far-wall silhouettes, barely there --- */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1, transform: `translateX(${par * 0.4}px)`, opacity: 0.55 }}>
        {[[236, 250], [700, 236], [886, 268]].map(([fx, fy], i) => (
          <div key={"frm" + i} style={{ position: "absolute", left: fx, top: fy, width: 58 + i * 10, height: 74 + i * 6, borderRadius: 4, background: "#1E1729", border: "4px solid #271E34" }} />
        ))}
        <div style={{ position: "absolute", left: 620, top: 388, width: 210, height: 180, borderRadius: "6px 6px 0 0", background: "linear-gradient(180deg, #221A2E, #171122)", border: "3px solid #2A2138" }}>
          <div style={{ position: "absolute", left: 16, top: 24, right: 16, height: 4, background: "#2C2338" }} />
          <div style={{ position: "absolute", left: 16, top: 78, right: 16, height: 4, background: "#2C2338" }} />
        </div>
      </div>

      {/* --- mid layer: window frame + door frame + dresser --- */}
      <div style={{ position: "absolute", left: 54, top: 122, width: 150, height: 196, borderRadius: 10, background: "linear-gradient(180deg, #2A2038, #191325)", border: "6px solid #2C2338", boxShadow: "inset 0 0 40px rgba(0,0,0,0.6)", zIndex: 2, opacity: 0.85, transform: `translateX(${par * 0.7}px)` }}>
        <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 5, marginLeft: -2.5, background: "#2C2338" }} />
        <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 5, marginTop: -2.5, background: "#2C2338" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(150deg, rgba(140,120,200,0.16), transparent 62%)" }} />
      </div>
      <div style={{ position: "absolute", left: 812, top: 112, width: 156, height: 456, borderRadius: "10px 10px 0 0", background: "linear-gradient(180deg, #221A30, #171122)", border: "6px solid #2A2136", zIndex: 2, opacity: 0.8, transform: `translateX(${par * 0.7}px)` }}>
        <div style={{ position: "absolute", left: 18, top: 30, right: 18, bottom: 150, borderRadius: 4, border: "3px solid #2E2440" }} />
        <div style={{ position: "absolute", left: 24, top: 300, width: 12, height: 12, borderRadius: "50%", background: "#3A2E4C" }} />
      </div>
      <div style={{ position: "absolute", left: 296, top: 452, width: 118, height: 116, borderRadius: 6, background: "linear-gradient(180deg, #241B32, #191223)", border: "3px solid #2C2338", zIndex: 2, opacity: 0.75 }}>
        <div style={{ position: "absolute", left: 12, top: 22, right: 12, height: 3, background: "#332748" }} />
        <div style={{ position: "absolute", left: 12, top: 64, right: 12, height: 3, background: "#332748" }} />
      </div>

      {/* --- god-rays leaking in from the window --- */}
      {[0, 1, 2].map((k) => (
        <div key={"ray" + k} style={{ position: "absolute", left: 128 + k * 54, top: 130, width: 66 + k * 10, height: 470, background: `linear-gradient(180deg, rgba(220,190,255,${0.07 - k * 0.015}), transparent 78%)`, filter: "blur(14px)", transform: `rotate(${11 + k * 2}deg) translateX(${par}px)`, transformOrigin: "50% 0%", zIndex: 3, opacity: 0.6 + 0.2 * Math.sin(lf / 26 + k), pointerEvents: "none" }} />
      ))}

      {/* --- ambient glow pools (light, not objects) --- */}
      <div style={{ position: "absolute", left: 176, top: 90, width: 660, height: 520, borderRadius: "50%", background: `radial-gradient(circle, rgba(245,194,78,${0.1 + againOn * 0.06}), transparent 68%)`, filter: "blur(20px)", zIndex: 3 }} />
      <div style={{ position: "absolute", left: 306, top: 330, width: 420, height: 380, borderRadius: "50%", background: `radial-gradient(circle, rgba(255,132,32,${(0.05 + burn * 0.26) * flick}), transparent 70%)`, filter: "blur(22px)", zIndex: 3 }} />
      <div style={{ position: "absolute", left: 30, top: 300, width: 380, height: 340, borderRadius: "50%", background: "radial-gradient(circle, rgba(238,126,134,0.08), transparent 70%)", filter: "blur(18px)", zIndex: 3 }} />

      {/* --- drifting dust in the light --- */}
      {Array.from({ length: 18 }).map((_, i) => {
        const s = seed(i * 3.7);
        const y0 = 140 + seed(i * 1.9) * 420 - ((lf * (0.28 + s * 0.55)) % 280);
        return <div key={"dust" + i} style={{ position: "absolute", left: 160 + s * 700 + Math.sin(lf / 22 + i) * 7, top: y0 < 110 ? y0 + 280 : y0, width: 2.5 + s * 3, height: 2.5 + s * 3, borderRadius: "50%", background: "rgba(250,220,170,0.6)", boxShadow: "0 0 7px rgba(250,214,150,0.7)", opacity: 0.14 + 0.28 * Math.abs(Math.sin(lf / 15 + i)), zIndex: 4 }} />;
      })}

      <StageFloor top={566} hue1="#2A2038" hue2="#140E1D" />
      <div style={{ position: "absolute", left: 0, right: 0, top: 562, height: 7, background: "linear-gradient(180deg, rgba(245,194,78,0.15), transparent)", zIndex: 5 }} />
      {/* --- floor reflection of the hero + the pyre --- */}
      <div style={{ position: "absolute", left: 300, top: 566, width: 412, height: 180, background: `linear-gradient(180deg, rgba(245,194,78,${0.05 + againOn * 0.05}), transparent 76%)`, filter: "blur(18px)", zIndex: 5, opacity: 0.8 }} />
      <div style={{ position: "absolute", left: 336, top: 566, width: 360, height: 170, background: `linear-gradient(180deg, rgba(255,140,40,${(0.05 + burn * 0.3) * flick}), transparent 78%)`, filter: "blur(16px)", zIndex: 6, transform: "scaleY(-1)", transformOrigin: "50% 0%", opacity: 0.9 }} />
      <div style={{ position: "absolute", left: 300, top: 592, width: 432, height: 96, borderRadius: "50%", background: `radial-gradient(ellipse, rgba(255,150,50,${(0.07 + burn * 0.34) * flick}), transparent 72%)`, filter: "blur(12px)", zIndex: 6 }} />

      {/* ==================== FOREGROUND — single stacking context, z 20 ==================== */}
      <div style={{ position: "absolute", inset: 0, zIndex: 20, transform: `translate(${shake}px, ${shake * 0.34}px)` }}>

        {/* ---- hero halo, breathing ---- */}
        <div style={{ position: "absolute", left: 216, top: 96, width: 580, height: 400, borderRadius: 40, background: `radial-gradient(closest-side, rgba(245,194,78,${0.1 + againOn * 0.22}), transparent 72%)`, filter: "blur(18px)", zIndex: 1, transform: `scale(${breathe})` }} />

        {/* ---- impact shockwave rings ---- */}
        {ring1 > 0 && ring1 < 1 && <div style={{ position: "absolute", left: 506 - 420 * ring1, top: 454 - 126 * ring1, width: 840 * ring1, height: 252 * ring1, borderRadius: "50%", border: `${Math.max(1, 9 * (1 - ring1))}px solid rgba(245,194,78,${(1 - ring1) * 0.75})`, zIndex: 2 }} />}
        {ring2 > 0 && ring2 < 1 && <div style={{ position: "absolute", left: 506 - 440 * ring2, top: 300 - 440 * ring2, width: 880 * ring2, height: 880 * ring2, borderRadius: "50%", border: `${Math.max(1, 8 * (1 - ring2))}px solid rgba(238,126,134,${(1 - ring2) * 0.7})`, zIndex: 2 }} />}

        {/* ==================== HERO: the GIANT flip-clock — 6:00 / AGAIN ==================== */}
        <div style={{ position: "absolute", left: 246, top: 118, width: 520, height: 336, zIndex: 4, transform: `translateY(${clockY}px) scale(${(1 + hit1 * 0.1 + hit2 * 0.05) * breathe}, ${(1 - hit1 * 0.13 - hit2 * 0.06) * breathe})`, transformOrigin: "50% 100%" }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: 26, background: grad("#241C16", "#0E0906"), border: "6px solid #3E3026", boxShadow: `0 40px 80px -22px rgba(0,0,0,0.85), 0 0 ${44 + buzz * 40 + burn * 34 + againOn * 44}px rgba(245,194,78,${0.3 + againOn * 0.16}), inset 0 3px 0 rgba(255,241,220,0.10)`, overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(255,255,255,0.10), transparent 38%, rgba(0,0,0,0.5) 100%)" }} />

            {/* upper card — the 6:00 digits */}
            <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 214, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 152, lineHeight: 1, letterSpacing: "0.01em", color: "#F5C24E", textShadow: "0 0 48px rgba(245,194,78,0.75), 0 0 14px rgba(245,194,78,0.9), 0 5px 0 rgba(0,0,0,0.45)", transform: `translateX(${digitJit}px) scaleY(${1 - hit1 * 0.12})` }}>{clockTxt}</span>
            </div>

            {/* flip seam */}
            <div style={{ position: "absolute", left: 0, right: 0, top: 214, height: 4, background: "rgba(0,0,0,0.75)", boxShadow: "0 2px 0 rgba(255,241,220,0.07)" }} />

            {/* lower card — flips DAY 1 → AGAIN on the button */}
            <div style={{ position: "absolute", left: 0, right: 0, top: 218, bottom: 0, background: "linear-gradient(180deg, #1C1510, #0B0704)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
              <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 76, letterSpacing: "0.18em", color: bandFlip < 0.5 ? "rgba(200,150,70,0.55)" : "#F0BE58", opacity: 0.4 + againOn * 0.6, textShadow: `0 0 ${16 + againOn * 32}px rgba(240,190,88,0.85)`, transform: `scaleY(${bandScale})` }}>{bandTxt}</span>
              <div style={{ position: "absolute", left: 0, right: 0, top: "50%", height: 2, background: "rgba(0,0,0,0.6)" }} />
            </div>

            {/* sickly scanlines across the whole face */}
            <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,0,0,0.22) 2px, transparent 2px)", backgroundSize: "6px 6px", opacity: 0.5, pointerEvents: "none" }} />
          </div>

          {/* buzz arcs off the alarm */}
          {buzz > 0 && [0, 1].map((k) => (
            <div key={"bz" + k} style={{ position: "absolute", left: 526, top: 34 + k * 54, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 44, color: "#F5C24E", textShadow: "0 0 18px rgba(245,194,78,0.9)", opacity: buzz * (0.45 + 0.55 * Math.abs(Math.sin(lf * 3 + k))), transform: `rotate(${k ? 20 : -20}deg)` }}>♪</div>
          ))}

          {/* B6: the loop arrow snaps on beside the clock */}
          {loopIn > 0.02 && (
            <div style={{ position: "absolute", left: 452, top: 240, zIndex: 3, transform: `scale(${loopIn}) rotate(${loopSpin * 360}deg)`, opacity: loopIn }}>
              <svg viewBox="0 0 60 60" width={78} height={78} style={{ overflow: "visible" }}>
                <path d="M30 8 A22 22 0 1 1 12 18" stroke="#F0BE58" strokeWidth={7} fill="none" strokeLinecap="round" style={{ filter: "drop-shadow(0 0 12px rgba(240,190,88,0.9))" }} />
                <polygon points="30,0 30,16 44,8" fill="#F0BE58" style={{ filter: "drop-shadow(0 0 10px rgba(240,190,88,0.9))" }} />
              </svg>
            </div>
          )}
        </div>

        {/* ==================== THE PYRE: token-coins that scream and DIE ==================== */}
        <div style={{ position: "absolute", left: 398, top: 486, width: 216, height: 176, zIndex: 5 }}>
          {/* flames whooshing up into the clock's underside */}
          {burn > 0.03 && Array.from({ length: 9 }).map((_, k) => {
            const h = (52 + Math.abs(Math.sin(lf / 3.2 + k * 1.3)) * 96) * burn;
            const w = 26 + seed(k * 2.3) * 12;
            return <div key={"fl" + k} style={{ position: "absolute", left: 2 + k * 24, top: 52 - h, width: w, height: h, borderRadius: "50% 50% 40% 40%", background: k % 2 ? grad("#FF7A1A", "#F7D46E") : grad("#FFC152", "#FF5A00"), opacity: burn * (0.66 + 0.34 * Math.sin(lf / 4 + k)), filter: "blur(2px)", transformOrigin: "50% 100%", transform: `scaleY(${0.8 + Math.sin(lf / 3 + k) * 0.24}) rotate(${Math.sin(lf / 6 + k) * 4}deg)` }} />;
          })}
          {burn > 0.1 && <div style={{ position: "absolute", left: 46, top: 10, width: 128, height: 84, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,235,180,0.85), rgba(255,140,40,0.25) 58%, transparent 76%)", filter: "blur(8px)", opacity: burn * flick }} />}

          {/* ---- the coin CHARACTERS: wide eyes → scream → char → curl → X-eyed dead ---- */}
          {COINS.map((p, i) => {
            const b = coinBeat(i);
            const isTop = i === 8;
            const tx = isTop ? -84 * topple : 0;
            const ty = isTop ? 118 * topple : b.char * 15;
            const rot = (isTop ? topple * 560 : 0) + b.char * 18;
            const sy = 1 - b.char * 0.5;
            const eyeS = 1 + b.wide * 0.9 - b.char * 0.5;
            const mouthH = 3 + b.scream * 13 - b.char * 2;
            const dead = b.char > 0.82;
            const fade = isTop && topple > 0.9 ? Math.max(0, 1 - (topple - 0.9) * 6) : 1;
            return (
              <div key={"cn" + i} style={{ position: "absolute", left: p[0], top: p[1], width: 54, height: 54, opacity: fade, transform: `translate(${tx}px, ${ty}px) rotate(${rot}deg) scaleY(${sy})`, transformOrigin: "50% 100%", zIndex: isTop ? 3 : 2 }}>
                <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: grad("#F7D46E", "#B8862A"), border: "3px solid #8A5F1E", boxSizing: "border-box", boxShadow: `0 6px 14px -4px rgba(0,0,0,0.6), inset 0 3px 0 rgba(255,255,255,0.45), 0 0 ${burn * 16}px rgba(255,140,40,0.6)` }} />
                {/* the charring creeps over the poor thing */}
                <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "radial-gradient(circle at 50% 90%, #14100C, #2A2018 70%)", opacity: b.char * 0.94, border: "3px solid #0E0A07", boxSizing: "border-box" }} />
                {/* face */}
                <div style={{ position: "absolute", left: 12, top: 15, width: 30, height: 26 }}>
                  {!dead && <>
                    <div style={{ position: "absolute", left: 4, top: 4, width: 5 * eyeS, height: 5 * eyeS, borderRadius: "50%", background: b.char > 0.4 ? "#0C0906" : "#5E3F0C" }} />
                    <div style={{ position: "absolute", right: 4, top: 4, width: 5 * eyeS, height: 5 * eyeS, borderRadius: "50%", background: b.char > 0.4 ? "#0C0906" : "#5E3F0C" }} />
                    {b.scream < 0.12
                      ? <div style={{ position: "absolute", left: 8, bottom: 3, width: 14, height: 5, borderRadius: "0 0 9px 9px", border: "2.5px solid #5E3F0C", borderTop: "none" }} />
                      : <div style={{ position: "absolute", left: 11, bottom: 2, width: 9, height: mouthH, borderRadius: "50%", background: b.char > 0.4 ? "#0C0906" : "#4A2F08" }} />}
                  </>}
                  {dead && <>
                    {[0, 1].map((e) => (
                      <React.Fragment key={"x" + e}>
                        <div style={{ position: "absolute", left: e ? 20 : 2, top: 5, width: 9, height: 2.4, background: "#6E5A44", transform: "rotate(45deg)" }} />
                        <div style={{ position: "absolute", left: e ? 20 : 2, top: 5, width: 9, height: 2.4, background: "#6E5A44", transform: "rotate(-45deg)" }} />
                      </React.Fragment>
                    ))}
                    <div style={{ position: "absolute", left: 10, bottom: 3, width: 11, height: 3, background: "#6E5A44", borderRadius: 2 }} />
                  </>}
                </div>
                {/* the panic sweat-bead right before it goes */}
                {b.wide > 0.4 && b.char < 0.3 && <div style={{ position: "absolute", right: -3, top: 6, width: 6, height: 8, borderRadius: "50% 50% 50% 50% / 62% 62% 40% 40%", background: "linear-gradient(160deg,#BFE3FF,#5FA8E8)", opacity: Math.max(0, 1 - b.char * 3.3) }} />}
              </div>
            );
          })}

          {/* embers drifting off the fire */}
          {burn > 0.2 && Array.from({ length: 9 }).map((_, k) => {
            const s = seed(k * 4.1);
            const t = ((lf * (1.1 + s)) % 120) / 120;
            return <div key={"em" + k} style={{ position: "absolute", left: 18 + s * 176 + Math.sin(lf / 8 + k) * 12, top: 48 - t * 156, width: 3.5 + s * 3, height: 3.5 + s * 3, borderRadius: "50%", background: "#FFB347", boxShadow: "0 0 9px #FF8A1A", opacity: burn * (1 - t) * 0.9, zIndex: 4 }} />;
          })}
          <div style={{ position: "absolute", left: -6, top: 158, width: 226, height: 30, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(0,0,0,0.55), transparent 70%)" }} />
        </div>

        {/* ---- the little SOULS puffing up out of the dead coins ---- */}
        {SOULS.map(([sx, sy, at], k) => {
          const g = over(lf, fr(at), fr(1.15), Easing.out(Easing.cubic));
          if (g <= 0.01 || g >= 1) return null;
          const op = Math.min(1, g * 4) * (1 - g) * 0.9;
          return (
            <div key={"soul" + k} style={{ position: "absolute", left: sx + Math.sin(lf / 7 + k) * 9, top: sy - g * 104, width: 30, height: 36, zIndex: 7, opacity: op, transform: `scale(${0.6 + g * 0.6})` }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: "16px 16px 7px 7px", background: "rgba(240,232,255,0.85)", boxShadow: "0 0 16px rgba(220,205,255,0.7)" }} />
              <div style={{ position: "absolute", left: 7, top: 12, width: 4, height: 5, borderRadius: "50%", background: "#3A2E4C" }} />
              <div style={{ position: "absolute", right: 7, top: 12, width: 4, height: 5, borderRadius: "50%", background: "#3A2E4C" }} />
              <div style={{ position: "absolute", left: 12, top: 22, width: 6, height: 6, borderRadius: "50%", background: "#3A2E4C", opacity: 0.7 }} />
            </div>
          );
        })}

        {/* ==================== STORYTELLER: the rumpled amnesiac in bed (small, lower-left) ==================== */}
        <div style={{ position: "absolute", left: 30, top: 654, width: 288, height: 26, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(0,0,0,0.5), transparent 70%)", zIndex: 2 }} />
        <div style={{ position: "absolute", left: 40, top: 492, width: 44, height: 172, borderRadius: "12px 6px 6px 12px", background: grad("#5A3C46", "#3A242C"), border: "3px solid #664450", zIndex: 2 }} />
        <div style={{ position: "absolute", left: 74, top: 578, width: 240, height: 84, borderRadius: "8px 12px 12px 12px", background: grad("#3C5068", "#26344A"), border: "3px solid #4A6080", boxShadow: "0 16px 30px -14px rgba(0,0,0,0.65), inset 0 3px 0 rgba(255,255,255,0.10)", zIndex: 3 }} />
        <div style={{ position: "absolute", left: 84, top: 560, width: 96, height: 40, borderRadius: 14, background: grad("#E4DCCC", "#B9AE99"), border: "3px solid #F0E9DB", zIndex: 3, transform: `rotate(${-4 + collapse * 3}deg)` }} />
        <div style={{ position: "absolute", left: 186, top: 566 - collapse * 6, width: 132, height: 100, borderRadius: "40% 30% 20% 30%", background: grad("#C46B74", "#8E434C"), border: "3px solid #D98A92", boxShadow: "inset 0 5px 12px rgba(255,255,255,0.16), inset 0 -8px 16px rgba(90,28,36,0.35)", zIndex: 5 }} />

        {/* the mascot, COSTUMED: nightcap + striped pyjamas + bed-head droopy eyes */}
        <div style={{ position: "absolute", left: 84, top: 488 + (1 - bolt) * 76 + groan * 10 + collapse * 26, zIndex: 4, transform: `translateY(${idle}px) rotate(${(1 - bolt) * -8 + groan * 4 + collapse * 56}deg)`, transformOrigin: "40% 100%" }}>
          <div style={{ position: "relative", width: 132, height: 132 }}>
            <Mascot lf={lf} size={132} gaze={2} nodAmp={0} nodSpeed={9} shock={bolt > 0.4 && lf < fr(1.9) ? 0.5 : 0.1} />
            {/* ---- costume overlay: shares the mascot's 0..200 viewBox ---- */}
            <svg viewBox="0 0 200 200" width={132} height={132} style={{ position: "absolute", left: 0, top: 0, overflow: "visible", pointerEvents: "none", zIndex: 2 }}>
              {/* striped pyjama top */}
              <rect x={34} y={104} width={132} height={42} fill="#4E5F96" />
              <rect x={34} y={104} width={132} height={6} fill="#3B4A79" />
              {[0, 1, 2, 3].map((s) => <rect key={"st" + s} x={34} y={112 + s * 10} width={132} height={4} fill="#93A6DC" opacity={0.85} />)}
              <rect x={96} y={104} width={7} height={42} fill="#3B4A79" />
              <rect x={78} y={104} width={18} height={16} fill="#E8E2D4" transform="rotate(-16 87 112)" />
              <rect x={104} y={104} width={18} height={16} fill="#E8E2D4" transform="rotate(16 113 112)" />
              <rect x={106} y={124} width={5} height={5} fill="#E8E2D4" />
              <rect x={106} y={136} width={5} height={5} fill="#E8E2D4" />
              {/* pyjama sleeves over the nubs */}
              <rect x={8} y={86} width={26} height={16} fill="#4E5F96" />
              <rect x={166} y={86} width={26} height={16} fill="#4E5F96" />
              {/* bed-head tufts poking out from under the cap */}
              <polygon points="40,44 34,30 48,40" fill="#D97757" />
              <polygon points="160,44 168,29 152,40" fill="#D97757" />
              {/* droopy just-woken lids — they snap open on the bolt, sag shut at the end */}
              <rect x={68} y={68} width={19} height={Math.max(0, 16 - alertEyes * 13 + collapse * 12)} fill="#D97757" />
              <rect x={114} y={68} width={19} height={Math.max(0, 16 - alertEyes * 13 + collapse * 12)} fill="#D97757" />
              <rect x={68} y={66} width={19} height={3} fill="#C4643F" />
              <rect x={114} y={66} width={19} height={3} fill="#C4643F" />
              {/* ---- the NIGHTCAP: droopy cone + white cuff + pom ---- */}
              <g transform={`rotate(${-3 + capWhip * 16 + collapse * 12} 100 44)`}>
                <path d="M58 40 Q 96 -20 148 8 Q 170 20 174 42 L 158 48 Q 152 26 136 17 Q 102 -1 76 42 Z" fill="#C1566A" />
                <path d="M64 38 Q 96 -8 138 12" stroke="#DD7C8C" strokeWidth={4} fill="none" opacity={0.7} />
                <rect x={40} y={34} width={122} height={15} rx={6} fill="#F2ECDE" />
                <rect x={40} y={44} width={122} height={5} rx={2} fill="#DCD4C2" />
                <circle cx={172} cy={48 + capWhip * 5} r={11} fill="#F2ECDE" />
                <circle cx={168} cy={44 + capWhip * 5} r={3.4} fill="#FFFFFF" opacity={0.8} />
              </g>
            </svg>
          </div>
        </div>

        {/* startled sparks off the bolt */}
        {lf > fr(0.5) && lf < fr(1.6) && [0, 1].map((k) => (
          <div key={"sp" + k} style={{ position: "absolute", left: 212 + k * 28, top: 466 + k * 36, zIndex: 6, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 28, color: "#F5C24E", textShadow: "0 0 10px rgba(245,194,78,0.8)", opacity: Math.max(0, bolt - Math.max(0, lf - fr(0.5)) / fr(1.1)), transform: `rotate(${k ? 16 : -14}deg) scale(${0.7 + bolt * 0.4})` }}>!</div>
        ))}
        {/* the amnesiac's line */}
        {speechPop > 0.02 && speechOut > 0.02 && <Speech x={168} y={430} text="wait… who are you?" accent={ROSE} size={24} s={speechPop * speechOut} />}

        {/* ==================== THE ONE RECEIPT: $0.94 wasted — small, right edge ==================== */}
        <div style={{ position: "absolute", left: 782, top: 588, zIndex: 8, transform: `scale(${0.7 + tagIn * 0.3})`, transformOrigin: "100% 50%", opacity: tagIn }}>
          <div style={{ padding: "12px 18px", borderRadius: 14, background: "rgba(18,12,18,0.94)", border: "2px solid rgba(224,169,74,0.55)", boxShadow: `0 18px 36px -14px rgba(0,0,0,0.8), 0 0 ${tagIn * 20}px rgba(224,169,74,0.28)` }}>
            <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 52, lineHeight: 0.94, color: AMBER, textShadow: `0 0 22px ${AMBER}66` }}>${dollars}</div>
            <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 17, letterSpacing: "0.04em", color: "rgba(224,169,74,0.8)", marginTop: 3 }}>wasted</div>
            <div style={{ marginTop: 9, width: 152, height: 8, borderRadius: 999, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${wasteP * 100}%`, background: grad("#F5C24E", "#C9932A"), boxShadow: `0 0 9px ${AMBER}` }} />
            </div>
          </div>
        </div>
      </div>

      {/* ==================== impact FLASH + glint on the AGAIN button ==================== */}
      {flash > 0.01 && <div style={{ position: "absolute", inset: 0, background: "rgba(255,246,222,1)", opacity: flash, zIndex: 30, pointerEvents: "none" }} />}
      <Glint lf={lf} at={5.5} dur={0.5} />

      {/* ==================== chassis overlays ==================== */}
      <SceneTitle lf={lf} a="GROUNDHOG" b="DAY" accent={ROSE} size={58} />
      <LivePill lf={lf} text="CLAUBE · NO MEMORY" />
      <SubLabel text="STARTS FROM ZERO · YOU PAY TWICE" />
    </Panel>
  );
};


// ===== SaveReload (CALLBACK-bar single-hero, workflow-authored) =====
// S3 — IT SAVES + RELOADS — green retro-RPG save-point dungeon (5.72s / 172f)
const SaveReload: React.FC<{ lf: number }> = ({ lf }) => {
  const cx = 506;

  // ---------- beat clock (5.15s = 155f) ----------
  const padOn = over(lf, 0, fr(0.38));
  const knightIn = over(lf, fr(0.10), fr(0.5), Easing.out(Easing.back(1.5)));
  const floppyIn = over(lf, fr(0.18), fr(0.58), Easing.out(Easing.back(1.55)));
  const donePop = over(lf, fr(0.36), fr(0.3), Easing.out(Easing.back(1.8))) * (1 - over(lf, fr(1.25), fr(0.22)));
  const beamUpO = over(lf, fr(1.24), fr(0.16)) * (1 - over(lf, fr(1.86), fr(0.22)));
  const beamDnO = over(lf, fr(2.94), fr(0.16)) * (1 - over(lf, fr(3.64), fr(0.22)));
  const beamOn = Math.max(beamUpO, beamDnO);
  const up = beamUpO >= beamDnO;
  const saved = over(lf, fr(1.86), fr(0.3));
  const tick = over(lf, fr(2.35), fr(0.32));
  const tickPop = over(lf, fr(2.42), fr(0.3));
  const oldDim = over(lf, fr(2.5), fr(0.45));
  const freshIn = over(lf, fr(3.16), fr(0.42), Easing.out(Easing.back(2.0)));
  const loaded = over(lf, fr(3.9), fr(0.32));
  const salute = over(lf, fr(3.98), fr(0.34), Easing.out(Easing.back(2.2)));
  const speechPop = over(lf, fr(4.05), fr(0.3), Easing.out(Easing.back(1.7)));
  const arcA = over(lf, fr(4.25), fr(0.38), Easing.inOut(Easing.cubic));
  const arcB = over(lf, fr(4.58), fr(0.4), Easing.inOut(Easing.cubic));
  const loopTag = over(lf, fr(4.88), fr(0.24), Easing.out(Easing.back(2.0)));

  // ---------- impacts ----------
  const kick = (at: number, len: number) => (lf >= at && lf < at + len ? 1 - (lf - at) / len : 0);
  const K1 = kick(fr(1.86), 12);
  const K2 = kick(fr(3.9), 10);
  const shakeK = K1 + K2 * 0.7;
  const shX = Math.sin(lf * 2.4) * 9 * shakeK;
  const shY = Math.cos(lf * 3.1) * 7 * shakeK;
  const flash = Math.min(0.62, K1 * 0.55 + K2 * 0.34);
  const heat = Math.max(beamOn, saved * (1 - saved) * 3.4, loaded * (1 - loaded) * 3.4, K1, K2 * 0.8);
  const hover = Math.sin(lf / 11) * 7;

  // ---------- shutter: open -> SNAP shut at 1.86 -> snap open at 3.0 ----------
  const shutC = Math.max(0, Math.min(1.08, over(lf, fr(1.8), fr(0.13), Easing.out(Easing.back(3.0))) - over(lf, fr(2.86), fr(0.2), Easing.out(Easing.cubic))));
  const shutterX = 120 * (1 - shutC);

  // ---------- gem path (pop -> pad -> spiral up -> spiral down -> into fresh knight) ----------
  const HOME: number[][] = [[424, 566], [528, 566]];
  const HAND = [352, 556];
  const SEAT: number[][] = [[466, 398], [486, 398]];
  const FRESH = [630, 548];
  const gemAt = (i: number, f: number) => {
    const p0 = over(f, fr(0.52), fr(0.5), Easing.out(Easing.back(2.4)));
    const p1 = over(f, fr(1.3), fr(0.56), Easing.in(Easing.cubic));
    const p2 = over(f, fr(3.0), fr(0.62), Easing.out(Easing.cubic));
    const p3 = over(f, fr(3.62), fr(0.28), Easing.in(Easing.cubic));
    const home = HOME[i], seat = SEAT[i];
    let x = HAND[0] + (home[0] - HAND[0]) * p0;
    let y = HAND[1] + (home[1] - HAND[1]) * p0 - Math.sin(Math.PI * p0) * 92;
    let s = 0.18 + 0.82 * p0;
    let rot = (1 - p0) * (i ? 240 : -240);
    if (i === 1) {
      const w = over(f, fr(1.02), fr(0.3)) * (1 - over(f, fr(1.3), fr(0.14)));
      x += Math.sin(f / 2.6) * 34 * w;
      rot += Math.sin(f / 2.6) * 26 * w;
    }
    if (p1 > 0) {
      const th = i * Math.PI + p1 * Math.PI * 3.2;
      const r = 74 * (1 - p1);
      x = home[0] + (seat[0] - home[0]) * p1 + Math.cos(th) * r;
      y = home[1] + (seat[1] - home[1]) * p1 + Math.sin(th) * r * 0.3;
      s = 1 - p1 * 0.6;
      rot = p1 * 340 * (i ? -1 : 1);
    }
    if (p2 > 0) {
      const th = i * Math.PI + (1 - p2) * Math.PI * 3.2;
      const r = 74 * p2;
      x = seat[0] + (home[0] - seat[0]) * p2 + Math.cos(th) * r;
      y = seat[1] + (home[1] - seat[1]) * p2 + Math.sin(th) * r * 0.3;
      s = 0.4 + p2 * 0.6;
      rot = (1 - p2) * 340 * (i ? 1 : -1);
    }
    if (p3 > 0) {
      x = home[0] + (FRESH[0] - home[0]) * p3;
      y = home[1] + (FRESH[1] - home[1]) * p3 - Math.sin(Math.PI * p3) * 56;
      s = 1 - p3 * 0.82;
      rot = p3 * 200;
    }
    const hidden = (p1 >= 0.995 && p2 <= 0.004) || p3 >= 0.995 || p0 <= 0.004;
    return { x, y, s, rot, hidden };
  };

  return (
    <Panel tint="rgba(63,158,116,0.42)">
      {/* ===== z0..8 : deep, quiet, receding SAVE-VAULT ===== */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(178deg, #061310 0%, #0A1D15 44%, #050F09 100%)", zIndex: 0 }} />
      <RoomWall hue="rgba(70,175,125,0.045)" tile={84} />
      {/* far rank of arches (deepest, faintest) */}
      {[{ x: 16, w: 130, h: 206 }, { x: 190, w: 130, h: 206 }, { x: 692, w: 130, h: 206 }, { x: 866, w: 130, h: 206 }].map((a, i) => (
        <div key={"far" + i} style={{ position: "absolute", left: a.x, top: 548 - a.h, width: a.w, height: a.h, borderRadius: `${a.w / 2}px ${a.w / 2}px 0 0`, background: "linear-gradient(180deg, #030C08 0%, #061410 100%)", border: "2px solid rgba(60,130,96,0.10)", opacity: 0.5, zIndex: 1 }} />
      ))}
      {/* mid rank of arches */}
      {[{ x: 88, w: 196, h: 306, o: 0.6 }, { x: 380, w: 252, h: 372, o: 0.46 }, { x: 728, w: 196, h: 306, o: 0.6 }].map((a, i) => (
        <div key={"arch" + i} style={{ position: "absolute", left: a.x, top: 548 - a.h, width: a.w, height: a.h, borderRadius: `${a.w / 2}px ${a.w / 2}px 0 0`, background: "linear-gradient(180deg, #04100B 0%, #071710 100%)", boxShadow: "inset 0 0 60px rgba(0,0,0,0.7)", border: "2px solid rgba(60,130,96,0.14)", opacity: a.o, zIndex: 3 }} />
      ))}
      {/* silhouette pillars flanking the hero column */}
      {[188, 824].map((px, i) => (
        <div key={"pil" + i} style={{ position: "absolute", left: px - 21, top: 178, width: 42, height: 372, background: "linear-gradient(90deg, #030D09, #0A1C14 46%, #030D09)", border: "1.5px solid rgba(60,130,96,0.12)", borderRadius: 5, opacity: 0.72, zIndex: 3 }} />
      ))}
      <StageFloor top={548} hue1="#0F2A1E" hue2="#050F09" />
      {/* faint floor grid running to the vanishing point */}
      {[0, 1, 2, 3].map((i) => (
        <div key={"fg" + i} style={{ position: "absolute", left: 0, right: 0, top: 566 + i * i * 13 + i * 22, height: 1.5, background: "rgba(111,211,174,0.055)", zIndex: 3 }} />
      ))}
      {/* ambient glow pools on the far wall */}
      <div style={{ position: "absolute", left: 46, top: 296, width: 310, height: 268, borderRadius: "50%", background: "radial-gradient(circle, rgba(63,158,116,0.13), transparent 70%)", filter: "blur(18px)", zIndex: 4, opacity: 0.7 + 0.3 * Math.abs(Math.sin(lf / 21)) }} />
      <div style={{ position: "absolute", left: 654, top: 276, width: 330, height: 290, borderRadius: "50%", background: "radial-gradient(circle, rgba(63,158,116,0.11), transparent 70%)", filter: "blur(18px)", zIndex: 4, opacity: 0.7 + 0.3 * Math.abs(Math.sin(lf / 19 + 1.4)) }} />
      {/* soft god-rays drifting down the vault */}
      {[0, 1, 2].map((i) => (
        <div key={"ray" + i} style={{ position: "absolute", left: 130 + i * 300 + Math.sin(lf / 44 + i) * 16, top: 76, width: 130, height: 470, background: "linear-gradient(180deg, rgba(155,235,198,0.075), transparent 82%)", transform: `rotate(${i === 1 ? 0 : i === 0 ? 7 : -7}deg)`, filter: "blur(12px)", zIndex: 5, opacity: 0.5 + heat * 0.35, pointerEvents: "none" }} />
      ))}
      {/* the hero's own ambient bloom (breathes + swells on heat) */}
      <div style={{ position: "absolute", left: cx - 330, top: 110, width: 660, height: 600, borderRadius: "50%", background: `radial-gradient(circle, rgba(76,175,125,${0.15 + heat * 0.22 + Math.abs(Math.sin(lf / 15)) * 0.03}), transparent 66%)`, filter: "blur(22px)", zIndex: 5 }} />
      {/* drifting dust motes */}
      {Array.from({ length: 16 }).map((_, i) => {
        const dx = 150 + seed(i * 1.7) * 720;
        const dy = 150 + ((seed(i * 3.3) * 500 + lf * (0.4 + seed(i) * 0.9)) % 500);
        const sz = 3 + seed(i * 5.1) * 3;
        return <div key={"mote" + i} style={{ position: "absolute", left: dx + Math.sin(lf / 17 + i) * 7, top: dy, width: sz, height: sz, borderRadius: "50%", background: "#CFF6E4", opacity: 0.08 + 0.18 * Math.abs(Math.sin(lf / 14 + i)), zIndex: 6 }} />;
      })}
      {/* floor reflection of the hero column */}
      <div style={{ position: "absolute", left: cx - 230, top: 556, width: 460, height: 180, background: `linear-gradient(180deg, rgba(111,211,174,${0.13 + heat * 0.14}), transparent 78%)`, filter: "blur(16px)", zIndex: 6, pointerEvents: "none" }} />
      <SpotCone x={cx} topY={150} floorY={664} spread={360} hue="#9BEBC6" lit={0.38 + heat * 0.5} />

      {/* ===== z20 : HERO — radiant SAVE PAD ===== */}
      <div style={{ position: "absolute", left: 316, top: 588, width: 380, zIndex: 20, opacity: padOn, transform: `translate(${shX * 0.5}px, ${shY * 0.5}px) scale(${0.9 + padOn * 0.1})`, transformOrigin: "50% 50%" }}>
        <div style={{ position: "absolute", left: -40, top: -32, width: 460, height: 172, borderRadius: "50%", background: `radial-gradient(ellipse, ${HGRN}aa, transparent 68%)`, filter: "blur(10px)", opacity: 0.62 + 0.3 * Math.abs(Math.sin(lf / 12)) + heat * 0.2 }} />
        <div style={{ position: "absolute", left: 0, top: 8, width: 380, height: 96, borderRadius: "50%", background: grad("#2F6B4E", "#123021"), border: `3px solid ${MINT}`, boxShadow: `inset 0 10px 22px rgba(0,0,0,0.5), 0 18px 36px -8px rgba(0,0,0,0.7), 0 0 ${22 + heat * 40}px ${HGRN}88` }} />
        {[0, 1, 2].map((k) => { const p = (lf / (26 - heat * 12) + k / 3) % 1; return (
          <div key={k} style={{ position: "absolute", left: 190 - 180 * (0.3 + p * 0.7), top: 56 - 24 * (0.3 + p * 0.7), width: 360 * (0.3 + p * 0.7), height: 48 * (0.3 + p * 0.7), borderRadius: "50%", border: `3px solid ${MINT}`, opacity: (1 - p) * (0.5 + heat * 0.4) }} />); })}
        <svg viewBox="0 0 140 80" width={140} height={80} style={{ position: "absolute", left: 120, top: 20 }}>
          <polygon points="70,8 114,34 114,58 70,72 26,58 26,34" fill="none" stroke={MINT} strokeWidth={3} opacity={0.9} />
          <polygon points="70,22 96,38 70,54 44,38" fill={HGRN} opacity={0.5 + 0.45 * Math.abs(Math.sin(lf / 10)) + heat * 0.2} />
        </svg>
      </div>

      {/* ===== z21 : the LOOP-ARROW cycle (final beat; passes behind the floppy) ===== */}
      <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", left: 0, top: 0, zIndex: 21, pointerEvents: "none" }}>
        <path d="M306 672 C 190 640, 176 400, 288 258" stroke={MINT} strokeWidth={6} fill="none" strokeLinecap="round" strokeDasharray={640} strokeDashoffset={640 * (1 - arcA)} opacity={arcA * 0.62} style={{ filter: `drop-shadow(0 0 9px ${HGRN})` }} />
        {arcA > 0.9 && <polygon points="288,244 302,274 274,274" fill={MINT} opacity={(arcA - 0.9) * 10 * 0.85} style={{ filter: `drop-shadow(0 0 8px ${HGRN})` }} />}
        <path d="M726 258 C 838 400, 824 640, 706 672" stroke={MINT} strokeWidth={6} fill="none" strokeLinecap="round" strokeDasharray={640} strokeDashoffset={640 * (1 - arcB)} opacity={arcB * 0.62} style={{ filter: `drop-shadow(0 0 9px ${HGRN})` }} />
        {arcB > 0.9 && <polygon points="700,686 690,656 718,662" fill={MINT} opacity={(arcB - 0.9) * 10 * 0.85} style={{ filter: `drop-shadow(0 0 8px ${HGRN})` }} />}
      </svg>

      {/* ===== z23 : HERO — the ONE two-way light BEAM ===== */}
      {beamOn > 0.02 && (
        <div style={{ position: "absolute", left: cx - 84, top: 452, width: 168, height: 200, zIndex: 23, pointerEvents: "none", opacity: Math.min(1, beamOn), transform: `translate(${shX * 0.4}px, 0px)` }}>
          <div style={{ position: "absolute", inset: 0, background: up ? `linear-gradient(0deg, ${HGRN}, ${MINT}00)` : `linear-gradient(180deg, ${MINT}, ${HGRN}00)`, filter: "blur(5px)", clipPath: "polygon(4% 100%, 96% 100%, 70% 0, 30% 0)" }} />
          <div style={{ position: "absolute", left: 54, top: 0, width: 60, height: "100%", background: "rgba(232,255,244,0.55)", filter: "blur(3px)", clipPath: "polygon(14% 100%, 86% 100%, 64% 0, 36% 0)" }} />
          <div style={{ position: "absolute", left: 30, top: -18, width: 108, height: 46, borderRadius: "50%", background: `radial-gradient(ellipse, rgba(232,255,244,0.85), transparent 70%)`, filter: "blur(5px)" }} />
          {Array.from({ length: 9 }).map((_, i) => { const p = (((lf * (up ? -1 : 1) * 0.035 + i / 9) % 1) + 1) % 1; return (
            <div key={i} style={{ position: "absolute", left: 80 + Math.sin(i * 2 + lf / 6) * (10 + p * 32), top: `${p * 100}%`, width: 8, height: 8, borderRadius: "50%", background: "#EAFFF4", boxShadow: `0 0 10px ${MINT}`, opacity: 0.85 }} />); })}
        </div>
      )}

      {/* ===== z25 : the ✓ / ✗ gems + lagged ghost trails (slide behind the floppy) ===== */}
      {[0, 1].map((i) => (
        <React.Fragment key={"gem" + i}>
          {[7, 4].map((lag, t) => { const g = gemAt(i, lf - lag); if (g.hidden || beamOn < 0.15) return null; return (
            <div key={"tr" + t} style={{ position: "absolute", left: g.x, top: g.y, zIndex: 24, transform: `scale(${g.s * 0.9}) rotate(${g.rot}deg)`, transformOrigin: "50% 50%", opacity: t === 0 ? 0.14 : 0.3, pointerEvents: "none" }}>
              <Gem s={64} c={i === 0 ? HGRN : RED} />
            </div>); })}
          {(() => { const g = gemAt(i, lf); if (g.hidden) return null; return (
            <div style={{ position: "absolute", left: g.x + shX * 0.3, top: g.y, zIndex: 25, transform: `scale(${g.s}) rotate(${g.rot}deg)`, transformOrigin: "50% 50%" }}>
              <Gem s={64} c={i === 0 ? HGRN : RED} />
              <div style={{ position: "absolute", left: 19, top: 20, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 32, color: i === 0 ? "#0E2418" : "#2A0E08", textShadow: "0 1px 0 rgba(255,255,255,0.45)" }}>{i === 0 ? "✓" : "✗"}</div>
            </div>); })()}
        </React.Fragment>
      ))}

      {/* ===== z26 : HERO — the GIANT luminous FLOPPY monolith (shutter-down) ===== */}
      <div style={{ position: "absolute", left: 326, top: 106, width: 360, zIndex: 26, opacity: floppyIn, transform: `translate(${shX}px, ${(1 - floppyIn) * -46 + hover + shY}px)` }}>
        <div style={{ position: "relative", width: 360, height: 360, borderRadius: 32, overflow: "hidden", background: grad("#4FBE87", "#154430"), border: "6px solid #0C2418", boxShadow: `0 40px 80px -18px rgba(0,0,0,0.75), inset 0 5px 0 rgba(190,255,222,0.30), inset 0 -40px 70px rgba(0,0,0,0.35), 0 0 ${34 + heat * 66}px ${HGRN}${heat > 0.1 ? "cc" : "66"}`, transform: `rotate(${Math.sin(lf / 16) * 1.5}deg) scale(${1 + K1 * 0.06}, ${1 - K1 * 0.07})`, transformOrigin: "50% 100%" }}>
          {/* paper label (top) */}
          <div style={{ position: "absolute", left: 30, top: 26, right: 30, height: 118, borderRadius: 10, background: grad("#F9F5EC", "#E2DAC6"), boxShadow: "0 6px 16px rgba(0,0,0,0.35), inset 0 2px 0 rgba(255,255,255,0.8)", padding: "14px 18px" }}>
            <div style={{ fontFamily: mono, fontWeight: 800, fontSize: 30, color: "#154430", letterSpacing: "0.03em" }}>HERMES.sav</div>
            <div style={{ marginTop: 12, height: 9, borderRadius: 5, background: "#C9BFA8" }} />
            <div style={{ marginTop: 9, height: 9, width: "68%", borderRadius: 5, background: "#C9BFA8" }} />
          </div>
          {/* write-protect notch */}
          <div style={{ position: "absolute", left: 22, top: 160, width: 30, height: 30, borderRadius: 6, background: "#08170F", boxShadow: "inset 0 3px 6px rgba(0,0,0,0.7)" }} />
          {/* activity LED */}
          <div style={{ position: "absolute", right: 24, top: 164, width: 18, height: 18, borderRadius: "50%", background: MINT, boxShadow: `0 0 ${8 + heat * 20}px ${MINT}`, opacity: 0.35 + heat * 0.65 }} />
          {/* dark intake SLOT (recess) */}
          <div style={{ position: "absolute", left: 128, bottom: 0, width: 104, height: 118, borderRadius: "8px 8px 0 0", background: "#04100A", boxShadow: `inset 0 -8px 22px rgba(0,0,0,0.9), inset 0 0 ${10 + beamOn * 26}px ${HGRN}` }}>
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 60, background: `linear-gradient(0deg, rgba(111,211,174,${0.25 + beamOn * 0.6}), transparent)` }} />
          </div>
          {/* metal SHUTTER that physically snaps shut */}
          <div style={{ position: "absolute", left: 116 + shutterX, bottom: -4, width: 128, height: 130, borderRadius: "6px 6px 4px 4px", background: grad("#DCE6F0", "#8A97A6"), boxShadow: "inset 0 5px 0 rgba(255,255,255,0.6), inset 0 -6px 12px rgba(0,0,0,0.35), 0 4px 14px rgba(0,0,0,0.5)" }}>
            <div style={{ position: "absolute", left: 50, top: 16, width: 28, height: 94, background: "#5E6B7A", borderRadius: 3 }} />
            <div style={{ position: "absolute", left: 10, top: 10, width: 6, height: 106, background: "rgba(255,255,255,0.35)", borderRadius: 3 }} />
          </div>
          {/* save/load bloom inside the disk */}
          <div style={{ position: "absolute", inset: 0, borderRadius: 26, background: `radial-gradient(circle, rgba(214,251,232,${Math.max(saved * (1 - saved) * 3.2, loaded * (1 - loaded) * 2.4, K1 * 0.5)}), transparent 66%)`, pointerEvents: "none" }} />
        </div>
      </div>

      {/* ===== z27 : shockwave rings on impacts ===== */}
      {K1 > 0 && <div style={{ position: "absolute", left: cx - 40 - (1 - K1) * 300, top: 286 - 40 - (1 - K1) * 300, width: 80 + (1 - K1) * 600, height: 80 + (1 - K1) * 600, borderRadius: "50%", border: `${2 + K1 * 8}px solid ${MINT}`, opacity: K1 * 0.8, zIndex: 27, pointerEvents: "none" }} />}
      {K2 > 0 && <div style={{ position: "absolute", left: 668 - 30 - (1 - K2) * 190, top: 566 - 30 - (1 - K2) * 190, width: 60 + (1 - K2) * 380, height: 60 + (1 - K2) * 380, borderRadius: "50%", border: `${2 + K2 * 6}px solid ${MINT}`, opacity: K2 * 0.75, zIndex: 27, pointerEvents: "none" }} />}

      {/* ===== z28 : sparkle bursts ===== */}
      {K1 > 0 && Array.from({ length: 12 }).map((_, i) => { const a = (i / 12) * Math.PI * 2; const d = (1 - K1) * 170; return (
        <div key={"sp1" + i} style={{ position: "absolute", left: cx + Math.cos(a) * d - 4, top: 440 + Math.sin(a) * d * 0.7 - 4, width: 8, height: 8, borderRadius: "50%", background: i % 3 === 0 ? "#FFFFFF" : MINT, boxShadow: `0 0 10px ${MINT}`, opacity: K1, zIndex: 28 }} />); })}
      {K2 > 0 && Array.from({ length: 10 }).map((_, i) => { const a = (i / 10) * Math.PI * 2; const d = (1 - K2) * 120; return (
        <div key={"sp2" + i} style={{ position: "absolute", left: 668 + Math.cos(a) * d - 4, top: 566 + Math.sin(a) * d * 0.7 - 4, width: 7, height: 7, borderRadius: "50%", background: i % 3 === 0 ? "#FFFFFF" : MINT, boxShadow: `0 0 10px ${MINT}`, opacity: K2, zIndex: 28 }} />); })}
      {/* the "ka-CHUNK" stamp */}
      {K1 > 0.02 && <div style={{ position: "absolute", left: 700, top: 452, zIndex: 29, transform: `rotate(-8deg) scale(${0.7 + (1 - K1) * 0.5})`, opacity: Math.min(1, K1 * 2.2) }}>
        <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 34, color: "#EAFFF4", textShadow: `0 0 16px ${HGRN}, 0 3px 0 rgba(0,0,0,0.5)` }}>ka-CHUNK</span>
      </div>}

      {/* ===== z24 : the KNIGHT mascot (helmet + visor + plume overlay) — dims out after the save ===== */}
      <div style={{ position: "absolute", left: 262, top: 496, zIndex: 24, opacity: knightIn * (1 - oldDim * 0.78), transform: `translate(${shX * 0.5}px, ${(1 - knightIn) * 26 + shY * 0.5}px)` }}>
        <div style={{ position: "relative", width: 144, height: 144 }}>
          <Mascot lf={lf} size={144} gaze={1} nodAmp={1.7} nodSpeed={11} stern={1} />
          <svg viewBox="0 0 212 212" width={144} height={144} style={{ position: "absolute", left: 0, top: 0, overflow: "visible", zIndex: 3 }}>
            <path d="M112 6 q30 8 12 38 q-7 11 -16 6 q12 -22 -2 -38 z" fill={HGRN} opacity={0.95} />
            <rect x={30} y={30} width={154} height={30} rx={7} fill="#9AA6B6" />
            <rect x={30} y={30} width={154} height={7} rx={3.5} fill="#CBD5E1" />
            <rect x={30} y={54} width={154} height={6} fill="#5E6B7A" />
            <rect x={44} y={62} width={126} height={20} rx={4} fill="#7C8899" opacity={0.9} />
            {[0, 1, 2, 3].map((k) => <rect key={k} x={54 + k * 30} y={64} width={8} height={16} rx={2} fill="#2A3644" />)}
            <rect x={101} y={80} width={10} height={12} rx={2} fill="#8A97A6" />
          </svg>
        </div>
      </div>
      <div style={{ position: "absolute", left: 270, top: 630, width: 128, height: 22, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(0,0,0,0.4), transparent 70%)", zIndex: 21, opacity: knightIn * (1 - oldDim * 0.8) }} />
      {donePop > 0.02 && <Speech x={196} y={438} text="done." accent={MINT} size={24} s={donePop} />}

      {/* ===== z24 : the FRESH knight the floppy pours back into — lights up + salutes ===== */}
      {freshIn > 0.01 && (
        <>
          <div style={{ position: "absolute", left: 598, top: 500, width: 140, height: 140, borderRadius: "50%", background: `radial-gradient(circle, rgba(111,211,174,${0.2 + loaded * 0.55}), transparent 68%)`, filter: "blur(12px)", zIndex: 22, opacity: freshIn }} />
          <div style={{ position: "absolute", left: 596, top: 496, zIndex: 24, opacity: freshIn, transform: `translate(${shX * 0.5}px, ${(1 - freshIn) * 24 + shY * 0.5}px) scale(${1 + K2 * 0.1})`, transformOrigin: "50% 100%" }}>
            <div style={{ position: "relative", width: 144, height: 144, filter: `drop-shadow(0 0 ${loaded * 16}px ${MINT})` }}>
              <Mascot lf={lf} size={144} gaze={-1} nodAmp={2.2} nodSpeed={9} cheer={salute} />
              <svg viewBox="0 0 212 212" width={144} height={144} style={{ position: "absolute", left: 0, top: 0, overflow: "visible", zIndex: 3 }}>
                <path d="M112 6 q30 8 12 38 q-7 11 -16 6 q12 -22 -2 -38 z" fill={MINT} opacity={0.95} />
                <rect x={30} y={30} width={154} height={30} rx={7} fill="#B6C2D2" />
                <rect x={30} y={30} width={154} height={7} rx={3.5} fill="#EAF2FA" />
                <rect x={30} y={54} width={154} height={6} fill="#6E7B8C" />
                <rect x={44} y={62} width={126} height={20} rx={4} fill="#93A0B1" opacity={0.9} />
                {[0, 1, 2, 3].map((k) => <rect key={k} x={54 + k * 30} y={64} width={8} height={16} rx={2} fill="#2A3644" />)}
                {/* saluting gauntlet snapping to the visor */}
                <g opacity={salute} transform={`translate(${(1 - salute) * 34}, ${(1 - salute) * 46})`}>
                  <rect x={150} y={60} width={30} height={22} rx={6} fill="#DCE6F0" stroke="#5E6B7A" strokeWidth={3} />
                  <rect x={162} y={78} width={16} height={30} rx={5} fill="#B6C2D2" stroke="#5E6B7A" strokeWidth={2.5} />
                </g>
              </svg>
            </div>
          </div>
          <div style={{ position: "absolute", left: 604, top: 630, width: 128, height: 22, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(0,0,0,0.4), transparent 70%)", zIndex: 21, opacity: freshIn }} />
        </>
      )}
      {speechPop > 0.02 && <Speech x={620} y={434} text="kept it." accent={MINT} size={24} s={speechPop} />}

      {/* ===== z40 : impact WHITE FLASH ===== */}
      {flash > 0.005 && <div style={{ position: "absolute", inset: 0, background: "#EAFFF4", opacity: flash, zIndex: 40, pointerEvents: "none" }} />}
      <Glint lf={lf} at={1.9} dur={0.5} />

      {/* ===== z22 : TINY SIGN — SAVED ✓ / LOADED ↺ ===== */}
      <div style={{ position: "absolute", left: 60, top: 128, width: 226, height: 54, borderRadius: 12, background: grad("#0C1F16", "#060F0A"), border: "2px solid #23503A", boxShadow: `0 0 ${14 + heat * 20}px rgba(76,175,125,0.45), inset 0 0 20px rgba(0,0,0,0.5)`, zIndex: 22, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, opacity: padOn, transform: `translateY(${(1 - padOn) * -12}px) scale(${1 + saved * (1 - saved) * 1.4 + loaded * (1 - loaded) * 1.2})` }}>
        <span style={{ width: 9, height: 9, borderRadius: "50%", background: MINT, boxShadow: `0 0 8px ${MINT}`, opacity: 0.5 + 0.5 * Math.abs(Math.sin(lf / 6)) }} />
        <span style={{ fontFamily: mono, fontWeight: 900, fontSize: 26, letterSpacing: "0.10em", color: saved > 0.25 ? "#8FE0B0" : "rgba(143,224,176,0.32)", textShadow: saved > 0.25 ? "0 0 14px rgba(80,224,140,0.7)" : "none" }}>{loaded > 0.25 ? "LOADED ↺" : "SAVED ✓"}</span>
      </div>
      {/* SAVE ⟳ LOAD tag — the cycle's name, lands with the loop arrows */}
      {loopTag > 0.02 && (
        <div style={{ position: "absolute", left: 60, top: 194, zIndex: 22, transform: `scale(${loopTag})`, transformOrigin: "left top", display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 999, background: "rgba(63,158,116,0.2)", border: `1.5px solid ${HGRN}`, fontFamily: mono, fontWeight: 900, fontSize: 17, letterSpacing: "0.08em", color: "#9FE9C2" }}>SAVE ⟳ LOAD</div>
      )}

      {/* ===== z22 : ONE RECEIPT — the 47 → 48 plate ===== */}
      <div style={{ position: "absolute", left: 748, top: 468, width: 226, zIndex: 22, opacity: over(lf, fr(0.35), fr(0.4)), transform: `translateY(${(1 - over(lf, fr(0.35), fr(0.4))) * 14}px)` }}>
        <div style={{ borderRadius: 14, background: "rgba(8,19,13,0.94)", border: "2px solid rgba(76,175,125,0.4)", boxShadow: `${NAVYSH}, 0 0 ${18 + tickPop * 20}px rgba(63,158,116,0.24)`, padding: "12px 16px 14px" }}>
          <div style={{ fontFamily: mono, fontSize: 15, letterSpacing: "0.1em", color: "rgba(150,207,174,0.7)" }}>memory.md</div>
          <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 46, lineHeight: 1.05, color: HGRN, textShadow: `0 0 18px ${HGRN}55`, opacity: tick, transform: `scale(${1 + tickPop * (1 - tickPop) * 1.5})`, transformOrigin: "left center" }}>47 → 48</div>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 15, color: "rgba(220,225,235,0.7)", marginTop: 4, opacity: tick }}>+1 saved · 0.3s</div>
        </div>
      </div>

      <SceneTitle lf={lf} a="SAVE" b="+ RELOAD" accent={GREEN} size={58} />
      <LivePill lf={lf} text="HERMES · SAVING" />
      <SubLabel text="SAVE POINT · KEEPS WHAT WORKS" />
    </Panel>
  );
};


// ===== Style (CALLBACK-bar single-hero, workflow-authored) =====
// ===== Style (CALLBACK-bar single-hero, workflow-authored) =====
// S4 — LEARNS YOUR STYLE — 2.95s / 89f. Beats: (1) ghost "one-size" suit flicked away →
// (2) tailor whips the needle, sparkle-stitches TRACE the seams → (3) jacket SNAPS tailored
// (overshoot + flash + shockwave + shimmer sweep) → (4) YOU tag pops + meter races 41→96 →
// (5) PASS stamp slams. Hierarchy: the luminous spotlit mannequin IS the hero; tailor + receipt subordinate.
const Style: React.FC<{ lf: number }> = ({ lf }) => {
  const GRAPEL = "#C29BE8";
  const MX = 376, MY = 138;           // hero mannequin box origin (panel-local)

  // ---------------- BEAT CLOCK (89 frames / 2.95s) ----------------
  const enter = over(lf, fr(0.04), fr(0.40), Easing.out(Easing.back(1.5)));      // B1 mannequin rises
  const flick = over(lf, fr(0.02), fr(0.42), Easing.in(Easing.cubic));           // B1 ghost one-size suit flicked out
  const swoosh = over(lf, 0, fr(0.28), Easing.out(Easing.cubic));                // B1 the flick arc
  const stitch = over(lf, fr(0.38), fr(1.05), Easing.inOut(Easing.quad));        // B2 needle traces the seams
  const snapAt = fr(1.50);
  const antic = over(lf, fr(1.30), fr(0.20), Easing.inOut(Easing.cubic));        // B3 anticipation squeeze
  const snap = over(lf, snapAt, fr(0.42), Easing.out(Easing.back(3.2)));         // B3 tailored SNAP (overshoot)
  const impact = lf >= snapAt ? Math.max(0, 1 - (lf - snapAt) / 9) : 0;
  const tagPop = over(lf, fr(1.85), fr(0.30), Easing.out(Easing.back(2.6)));     // B4 YOU tag pops
  const race = over(lf, fr(1.90), fr(0.75), Easing.out(Easing.cubic));           // B4 meter races
  const stampAt = fr(2.45);
  const stamp = over(lf, stampAt, fr(0.34), Easing.out(Easing.back(2.4)));       // B5 PASS stamp slams
  const impact2 = lf >= stampAt ? Math.max(0, 1 - (lf - stampAt) / 8) : 0;
  const cheer = over(lf, fr(2.52), fr(0.34));                                    // B5 tailor reacts
  const finale = over(lf, fr(2.55), fr(0.40));

  // ---------------- CONTINUOUS AMBIENT (no frozen frames) ----------------
  const sway = Math.sin(lf / 16) * 1.6;                       // cloth sway
  const breathe = 0.86 + 0.14 * Math.sin(lf / 9);             // hero halo breathing
  const flicker = 0.94 + 0.06 * Math.sin(lf / 3.7);           // spotlight flicker
  const needleBob = Math.sin(lf / 2.1) * 4;                   // needle whip
  const shake = (impact > 0 ? Math.sin(lf * 5.2) * 12 * impact * impact : 0) + (impact2 > 0 ? Math.sin(lf * 4.4) * 8 * impact2 * impact2 : 0);
  const flash = Math.max(impact * 0.16, impact2 * 0.11);

  // ---------------- the SEAM the needle traces ----------------
  const SEAM: number[][] = [[410, 522], [410, 300], [470, 250], [506, 332], [542, 250], [602, 300], [602, 522], [410, 522]];
  const SEG: number[] = [];
  let TOT = 0;
  for (let i = 0; i < SEAM.length - 1; i++) { const d = Math.hypot(SEAM[i + 1][0] - SEAM[i][0], SEAM[i + 1][1] - SEAM[i][1]); SEG.push(d); TOT += d; }
  const seamPt = (t: number): number[] => {
    let d = Math.max(0, Math.min(1, t)) * TOT;
    for (let i = 0; i < SEG.length; i++) {
      if (d <= SEG[i] || i === SEG.length - 1) { const u = Math.max(0, Math.min(1, d / SEG[i])); return [SEAM[i][0] + (SEAM[i + 1][0] - SEAM[i][0]) * u, SEAM[i][1] + (SEAM[i + 1][1] - SEAM[i][1]) * u]; }
      d -= SEG[i];
    }
    return SEAM[SEAM.length - 1];
  };
  const SEAM_D = "M410 522 L410 300 L470 250 L506 332 L542 250 L602 300 L602 522 L410 522";
  const np = seamPt(stitch);
  const needleX = np[0], needleY = np[1] + needleBob;
  const needleLive = stitch > 0.005 && snap < 0.7;
  const HANDX = 209, HANDY = 530;

  // ---------------- THE ONE RECEIPT ----------------
  const pct = interpolate(race, [0, 1], [41, 96]);
  const pass = pct >= 92;

  return (
    <Panel tint="rgba(158,118,207,0.42)">
      {/* ================= BACKGROUND (z 0..8) — deep, quiet, receding ================= */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(168deg, #221730 0%, #150E1F 46%, #0B0711 100%)", zIndex: 0 }} />
      <RoomWall hue="rgba(158,118,207,0.05)" tile={110} />

      {/* layered receding atelier architecture — near-black silhouettes, parallax drift */}
      <div style={{ position: "absolute", left: 22 + Math.sin(lf / 60) * 3, top: 176, width: 210, height: 430, borderRadius: "104px 104px 12px 12px", background: "linear-gradient(180deg, rgba(52,34,72,0.30), rgba(12,8,18,0.04))", zIndex: 1, opacity: 0.5 }} />
      <div style={{ position: "absolute", left: 800 - Math.sin(lf / 66) * 3, top: 190, width: 198, height: 416, borderRadius: "98px 98px 12px 12px", background: "linear-gradient(180deg, rgba(48,32,68,0.28), rgba(12,8,18,0.04))", zIndex: 1, opacity: 0.46 }} />
      <div style={{ position: "absolute", left: 36, top: 196, width: 172, height: 404, borderRadius: "86px 86px 12px 12px", background: "linear-gradient(180deg, rgba(66,44,88,0.42), rgba(14,10,20,0.10))", zIndex: 3, opacity: 0.55 }} />
      <div style={{ position: "absolute", left: 812, top: 214, width: 164, height: 386, borderRadius: "82px 82px 12px 12px", background: "linear-gradient(180deg, rgba(60,40,82,0.36), rgba(14,10,20,0.08))", zIndex: 3, opacity: 0.5 }} />
      {/* quiet fabric-roll silhouettes leaning in the far dark */}
      {[0, 1, 2, 3].map((k) => (
        <div key={"roll" + k} style={{ position: "absolute", left: 842 + k * 32, top: 330 + k * 14, width: 22, height: 270 - k * 16, borderRadius: 11, background: "linear-gradient(180deg, rgba(84,58,112,0.40), rgba(12,8,18,0.05))", transform: `rotate(${-8 + k * 5 + Math.sin(lf / 34 + k) * 0.5}deg)`, transformOrigin: "50% 100%", zIndex: 3, opacity: 0.58 }} />
      ))}
      {/* quiet mirror + dress-rail silhouettes, far left dark */}
      <div style={{ position: "absolute", left: 74, top: 268, width: 98, height: 236, borderRadius: "49px 49px 8px 8px", border: "3px solid rgba(96,68,126,0.34)", background: "linear-gradient(180deg, rgba(52,36,72,0.28), rgba(10,7,16,0.04))", zIndex: 3, opacity: 0.55 }} />
      <div style={{ position: "absolute", left: 46, top: 246, width: 152, height: 4, borderRadius: 2, background: "rgba(110,80,142,0.22)", zIndex: 2 }} />
      {[0, 1, 2].map((k) => <div key={"hang" + k} style={{ position: "absolute", left: 58 + k * 44, top: 250, width: 30, height: 108 - k * 10, borderRadius: "15px 15px 4px 4px", background: "linear-gradient(180deg, rgba(70,48,96,0.26), rgba(10,7,16,0.02))", transform: `rotate(${Math.sin(lf / 40 + k * 2) * 1.2}deg)`, transformOrigin: "50% 0%", zIndex: 2, opacity: 0.5 }} />)}

      {/* soft god-rays raking down from the fixture — low contrast */}
      {[0, 1, 2].map((k) => <div key={"ray" + k} style={{ position: "absolute", left: 350 + k * 108, top: 120, width: 46, height: 460, background: "linear-gradient(180deg, rgba(226,206,250,0.09), transparent 76%)", transform: `rotate(${-6 + k * 6}deg)`, transformOrigin: "50% 0%", filter: "blur(9px)", opacity: (0.4 + 0.24 * Math.sin(lf / 21 + k)) * flicker, zIndex: 4 }} />)}

      {/* soft ambient glow pools — depth through light, not clutter */}
      <div style={{ position: "absolute", left: 306, top: 108, width: 400, height: 470, borderRadius: "50%", background: `radial-gradient(circle, rgba(158,118,207,${(0.24 + snap * 0.12).toFixed(3)}), transparent 68%)`, filter: "blur(20px)", zIndex: 4, opacity: breathe }} />
      <div style={{ position: "absolute", left: 60, top: 400, width: 300, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(231,178,76,0.10), transparent 70%)", filter: "blur(22px)", zIndex: 4 }} />
      <div style={{ position: "absolute", left: 700, top: 380, width: 320, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(158,118,207,0.09), transparent 70%)", filter: "blur(24px)", zIndex: 4 }} />

      <StageFloor top={600} hue1="#241830" hue2="#0E0912" />

      {/* single hero spotlight onto the mannequin */}
      <SpotCone x={506} topY={148} floorY={648} spread={352} hue="#E7CFF7" lit={(0.5 + enter * 0.42 + snap * 0.08) * flicker} />

      {/* drifting dust motes in the beam */}
      {Array.from({ length: 18 }).map((_, i) => {
        const s = seed(i * 4.7);
        const dx = 336 + s * 330;
        const dy = 172 + ((lf * (0.26 + s * 0.5) + i * 39) % 420);
        return <div key={"mote" + i} style={{ position: "absolute", left: dx + Math.sin(lf / 30 + i) * 11, top: dy, width: 3 + s * 3, height: 3 + s * 3, borderRadius: "50%", background: "rgba(238,222,252,0.5)", boxShadow: "0 0 6px rgba(220,196,248,0.6)", opacity: (0.16 + s * 0.3) * (0.6 + 0.4 * Math.sin(lf / 15 + i)), zIndex: 6 }} />;
      })}

      {/* soft floor reflection of the hero + contact shadow */}
      <div style={{ position: "absolute", left: 396, top: 604, width: 220, height: 120, background: `linear-gradient(180deg, rgba(210,114,78,${(0.14 + snap * 0.12).toFixed(3)}), transparent 78%)`, filter: "blur(11px)", borderRadius: "0 0 60px 60px", zIndex: 7, opacity: enter * 0.85, transform: `scaleX(${1 + Math.sin(lf / 16) * 0.02})` }} />
      <div style={{ position: "absolute", left: 386, top: 632, width: 240, height: 44, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(0,0,0,0.58), transparent 72%)", zIndex: 8, opacity: enter }} />
      <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 210px rgba(0,0,0,0.7)", zIndex: 8, pointerEvents: "none" }} />

      {/* ================= FOREGROUND (z 20+) — shake rig ================= */}
      <div style={{ position: "absolute", inset: 0, transform: `translate(${shake}px, ${shake * 0.4}px)`, zIndex: 20 }}>

        {/* ---------- BEAT 1: the ghosted grey "ONE-SIZE" suit, flicked out of frame ---------- */}
        {flick < 0.99 && (
          <div style={{ position: "absolute", left: 262 - flick * 470, top: 296 + flick * 42, width: 96, height: 258, zIndex: 21, transform: `rotate(${-flick * 54}deg)`, transformOrigin: "50% 0%", opacity: (1 - flick) * 0.55 }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: "46px 46px 10px 10px", background: "linear-gradient(180deg, rgba(126,122,116,0.55), rgba(46,44,50,0.2))", border: "2px solid rgba(150,146,140,0.3)", filter: "blur(0.6px)" }} />
            <div style={{ position: "absolute", left: 44, top: 34, width: 6, height: 190, background: "rgba(60,58,56,0.4)" }} />
            <div style={{ position: "absolute", left: -4, top: -30, width: 104, height: 24, borderRadius: 6, background: "rgba(30,28,34,0.7)", border: "1.5px solid rgba(140,136,130,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: mono, fontWeight: 800, fontSize: 13, letterSpacing: "0.16em", color: "rgba(190,186,180,0.8)" }}>ONE-SIZE</div>
          </div>
        )}
        {/* the flick arc off the tailor's cuff */}
        {swoosh > 0.02 && swoosh < 0.99 && (
          <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", inset: 0, zIndex: 23, pointerEvents: "none", opacity: Math.max(0, 1 - swoosh) }}>
            <path d="M212 512 C 268 452, 340 452, 396 500" stroke="#FFE9AE" strokeWidth={5} fill="none" strokeLinecap="round" strokeDasharray="200" strokeDashoffset={200 - swoosh * 200} opacity={0.8} />
            <path d="M216 534 C 272 476, 344 476, 400 522" stroke={GOLD} strokeWidth={2.5} fill="none" strokeLinecap="round" strokeDasharray="200" strokeDashoffset={200 - swoosh * 200} opacity={0.5} />
          </svg>
        )}

        {/* ---------- STORYTELLER (z 22): the tailor mascot — small, subordinate ---------- */}
        <div style={{ position: "absolute", left: 74, top: 458 + sway, zIndex: 22, transform: `translateY(${(1 - enter) * 20}px) rotate(${needleLive ? Math.sin(lf / 2.1) * 1.6 : 0}deg)`, transformOrigin: "50% 100%", opacity: enter }}>
          <div style={{ position: "absolute", left: 18, top: 140, width: 120, height: 24, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(0,0,0,0.5), transparent 70%)" }} />
          <Mascot lf={lf} size={150} gaze={3} suit={1} nodAmp={2} nodSpeed={11} cheer={cheer} />
          {/* costume: measuring-tape scarf */}
          <div style={{ position: "absolute", left: 50, top: 82, width: 13, height: 38, borderRadius: 4, background: "#F2C744", backgroundImage: "repeating-linear-gradient(0deg, rgba(40,28,8,0.55) 0 2px, transparent 2px 11px)", transform: `rotate(${8 + sway * 0.9}deg)`, transformOrigin: "50% 0%", boxShadow: "0 4px 10px rgba(0,0,0,0.3), inset 0 2px 3px rgba(255,255,255,0.4)", zIndex: 2 }} />
          <div style={{ position: "absolute", left: 90, top: 82, width: 13, height: 31, borderRadius: 4, background: "#F2C744", backgroundImage: "repeating-linear-gradient(0deg, rgba(40,28,8,0.55) 0 2px, transparent 2px 11px)", transform: `rotate(${-10 - sway * 0.9}deg)`, transformOrigin: "50% 0%", boxShadow: "0 4px 10px rgba(0,0,0,0.3), inset 0 2px 3px rgba(255,255,255,0.4)", zIndex: 2 }} />
          <div style={{ position: "absolute", left: 46, top: 76, width: 60, height: 11, borderRadius: 6, background: "#E7B93A", backgroundImage: "repeating-linear-gradient(90deg, rgba(40,28,8,0.5) 0 2px, transparent 2px 12px)", transform: `rotate(${sway * 0.5}deg)`, boxShadow: "inset 0 2px 3px rgba(255,255,255,0.35)", zIndex: 2 }} />
          {/* costume: pincushion cuff on the needle hand */}
          <div style={{ position: "absolute", left: 122, top: 58, width: 27, height: 27, borderRadius: "50%", background: "radial-gradient(circle at 34% 30%, #E4707E, #8E2436)", border: "2px solid #F3B7BF", boxShadow: "0 4px 9px rgba(0,0,0,0.45)", zIndex: 3, transform: `rotate(${needleBob * 0.6}deg)` }}>
            {[0, 1, 2, 3].map((k) => { const a = -0.9 + k * 0.62; return <React.Fragment key={"pin" + k}>
              <div style={{ position: "absolute", left: 13 + Math.cos(a) * 4, top: 13 + Math.sin(a) * 4, width: 15, height: 2, background: "#DCE4EE", transform: `rotate(${(a * 180) / Math.PI}deg)`, transformOrigin: "0% 50%", boxShadow: "0 0 3px rgba(255,255,255,0.6)" }} />
              <div style={{ position: "absolute", left: 13 + Math.cos(a) * 18, top: 12 + Math.sin(a) * 18, width: 5, height: 5, borderRadius: "50%", background: k % 2 ? GOLD : GRAPEL, boxShadow: `0 0 5px ${k % 2 ? GOLD : GRAPE}` }} />
            </React.Fragment>; })}
          </div>
        </div>

        {/* ---------- HERO (z 24): the big spotlit bespoke mannequin ---------- */}
        <div style={{ position: "absolute", left: MX, top: MY, width: 260, height: 500, zIndex: 24, transform: `translateY(${(1 - enter) * 22}px) rotate(${sway * 0.24}deg)`, transformOrigin: "50% 96%", opacity: Math.min(1, enter * 1.3) }}>
          {/* luminous rim-halo behind the silhouette — breathes, swells on the snap */}
          <div style={{ position: "absolute", left: -56, top: 40, width: 372, height: 420, borderRadius: "50%", background: `radial-gradient(circle, rgba(231,178,76,${(0.14 + stitch * 0.08 + snap * 0.16).toFixed(3)}), transparent 66%)`, filter: "blur(16px)", transform: `scale(${breathe * 0.5 + 0.72})` }} />
          {/* wooden tripod stand */}
          <div style={{ position: "absolute", left: 118, top: 388, width: 24, height: 100, borderRadius: 6, background: grad("#8A6640", "#4E3A22"), boxShadow: "0 8px 18px rgba(0,0,0,0.45)" }} />
          <div style={{ position: "absolute", left: 66, top: 466, width: 128, height: 15, borderRadius: 8, background: grad("#7A5836", "#3E2C18"), transform: "rotate(7deg)" }} />
          <div style={{ position: "absolute", left: 66, top: 466, width: 128, height: 15, borderRadius: 8, background: grad("#7A5836", "#3E2C18"), transform: "rotate(-7deg)" }} />
          {/* wooden head + neck */}
          <div style={{ position: "absolute", left: 88, top: 0, width: 84, height: 84, borderRadius: "50%", background: grad("#EBDCC0", "#A88F68"), boxShadow: "inset 0 7px 14px rgba(255,255,255,0.36), inset 0 -10px 18px rgba(80,58,34,0.42), 0 10px 22px rgba(0,0,0,0.4)" }} />
          <div style={{ position: "absolute", left: 114, top: 74, width: 32, height: 38, background: grad("#D6C29C", "#9A8360") }} />

          {/* JACKET — reveals under the traced seam, then SNAPS tailored with overshoot */}
          <div style={{ position: "absolute", left: 20, top: 104, width: 220, height: 292, transformOrigin: "50% 100%", transform: `scaleY(${1 - antic * 0.05 + snap * 0.05}) scaleX(${1 + antic * 0.03 - snap * 0.03}) scale(${interpolate(snap, [0, 1], [0.96, 1])})` }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: "82px 82px 20px 20px", background: grad(CLAY, "#8E4526"), border: `4px solid ${GOLD}`, boxShadow: `0 22px 48px rgba(0,0,0,0.5), 0 0 ${20 + stitch * 22 + snap * 30 + impact * 40}px rgba(231,178,76,${(0.24 + snap * 0.2).toFixed(3)}), inset 0 12px 24px rgba(255,220,190,0.28), inset 0 -34px 56px rgba(90,40,24,0.55)`, clipPath: `inset(${(1 - stitch) * 100}% 0 0 0)`, overflow: "hidden" }}>
              <div style={{ position: "absolute", left: 102, top: 10, width: 14, height: 262, background: GOLD, opacity: 0.9, boxShadow: `0 0 12px ${GOLD}88` }} />
              <div style={{ position: "absolute", left: 18, top: 8, width: 82, height: 132, background: "#B85E33", clipPath: "polygon(0 0, 100% 10%, 40% 100%)" }} />
              <div style={{ position: "absolute", right: 18, top: 8, width: 82, height: 132, background: "#B85E33", clipPath: "polygon(0 10%, 100% 0, 60% 100%)" }} />
              {[0, 1, 2].map((k) => <div key={k} style={{ position: "absolute", left: 103, top: 138 + k * 42, width: 18, height: 18, borderRadius: "50%", background: grad("#FFEBA8", GOLD), boxShadow: `0 3px 6px rgba(0,0,0,0.45), 0 0 ${8 + snap * 8}px ${GOLD}88` }} />)}
              {/* shimmer sweep across the cloth on the snap */}
              {snap > 0.02 && snap < 0.999 && <div style={{ position: "absolute", top: -40, bottom: -40, left: -160 + snap * 420, width: 110, background: "linear-gradient(100deg, transparent, rgba(255,250,232,0.75), transparent)", filter: "blur(6px)", transform: "rotate(14deg)" }} />}
            </div>
          </div>

          {/* couture label sewn into the lapel */}
          <div style={{ position: "absolute", left: -30, top: 182, transform: `scale(${over(lf, fr(1.10), fr(0.34), Easing.out(Easing.back(2)))}) rotate(-7deg)`, transformOrigin: "0 50%", padding: "6px 12px", borderRadius: 8, background: grad("#1C1526", "#0E0A16"), border: `2px solid ${GOLD}`, boxShadow: `0 8px 18px rgba(0,0,0,0.55), 0 0 ${14 + snap * 12}px ${GRAPE}66`, zIndex: 3 }}>
            <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 15, letterSpacing: "0.04em", color: GOLD, whiteSpace: "nowrap" }}>MAISON HERMEZ</div>
            <div style={{ fontFamily: mono, fontWeight: 700, fontSize: 10, letterSpacing: "0.2em", color: GRAPEL }}>· BESPOKE ·</div>
          </div>

          {/* ---------- BEAT 4: the YOU tag pops ---------- */}
          <div style={{ position: "absolute", left: 182, top: 74, transform: `rotate(${9 - (1 - tagPop) * 22}deg) scale(${tagPop})`, transformOrigin: "0% 50%", padding: "5px 14px", borderRadius: 8, background: "#FBF7EE", border: `3px solid ${GOLD}`, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 22, color: INK, boxShadow: `0 10px 20px rgba(0,0,0,0.4), 0 0 ${tagPop * 20}px ${GOLD}66`, zIndex: 3, opacity: tagPop }}>
            <span style={{ position: "absolute", left: -18, top: 12, width: 18, height: 3, background: "#B99A46" }} />YOU
          </div>
          {/* tag pop ring */}
          {tagPop > 0.02 && tagPop < 0.99 && <div style={{ position: "absolute", left: 196, top: 62, width: 56 + tagPop * 90, height: 56 + tagPop * 90, marginLeft: -(tagPop * 45), marginTop: -(tagPop * 45), borderRadius: "50%", border: `3px solid ${GOLD}`, opacity: (1 - tagPop) * 0.7, zIndex: 2 }} />}

          {/* finale sparkle drift around the finished piece */}
          {finale > 0.05 && [0, 1, 2, 3, 4, 5].map((k) => <div key={"fl" + k} style={{ position: "absolute", left: -14 + seed(k) * 274, top: 54 + seed(k + 9) * 320 - finale * 16, fontSize: 13 + seed(k) * 13, color: k % 2 ? GRAPEL : "#FFE9AE", textShadow: `0 0 10px ${k % 2 ? GRAPE : GOLD}`, opacity: finale * (0.35 + 0.65 * Math.abs(Math.sin(lf / 4 + k))) }}>✦</div>)}
        </div>

        {/* ---------- BEAT 2: the glowing sparkle-stitch TRACE around the seams (z 26) ---------- */}
        <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", inset: 0, zIndex: 26, pointerEvents: "none", opacity: enter * (1 - Math.max(0, (snap - 0.55) / 0.45)) }}>
          {/* soft glow underlay of the traced seam */}
          <path d={SEAM_D} pathLength={1} stroke={GOLD} strokeWidth={11} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1 1" strokeDashoffset={1 - stitch} opacity={0.28} style={{ filter: "blur(6px)" }} />
          {/* the crisp stitch dashes */}
          <path d={SEAM_D} pathLength={1} stroke="#FFE9AE" strokeWidth={3.2} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1 1" strokeDashoffset={1 - stitch} opacity={0.95} />
          <path d={SEAM_D} pathLength={1} stroke="#0E0A16" strokeWidth={1.2} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="0.006 0.01" strokeDashoffset={-lf * 0.004} opacity={stitch > 0.02 ? 0.5 : 0} />
        </svg>
        {/* the sparkle beads left behind by each stitch */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((k) => {
          const t = (k + 0.5) / 10;
          const p = seamPt(t);
          const on = ramp(stitch, t - 0.03, t + 0.02);
          const tw = 0.5 + 0.5 * Math.abs(Math.sin(lf / 5 + k * 1.3));
          return <div key={"sk" + k} style={{ position: "absolute", left: p[0] - 12, top: p[1] - 13, width: 24, textAlign: "center", fontSize: 22, lineHeight: 1, color: "#FFE9AE", textShadow: `0 0 14px ${GOLD}, 0 0 28px rgba(231,178,76,0.6)`, opacity: on * tw * (1 - Math.max(0, (snap - 0.6) / 0.4)), zIndex: 27 }}>✦</div>;
        })}

        {/* ---------- the whipping NEEDLE + thread from the tailor's cuff (z 28) ---------- */}
        {needleLive && (
          <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", inset: 0, zIndex: 28, pointerEvents: "none", opacity: enter * (1 - Math.max(0, (snap - 0.3) / 0.4)) }}>
            <line x1={HANDX} y1={HANDY} x2={needleX} y2={needleY} stroke={GOLD} strokeWidth={2.5} strokeDasharray="5 5" strokeDashoffset={-lf * 1.6} opacity={0.85} />
            <g transform={`rotate(${34 + Math.sin(lf / 2.1) * 14} ${needleX} ${needleY})`}>
              <rect x={needleX - 3} y={needleY} width={6} height={30} rx={3} fill="#F3EFE4" />
              <rect x={needleX - 1.4} y={needleY + 4} width={2.8} height={8} rx={1.4} fill="#8E8878" />
            </g>
            {/* needle glints — continuous */}
            <circle cx={needleX} cy={needleY} r={6 + 2 * Math.abs(Math.sin(lf / 3))} fill="#FFF6D6" opacity={0.75 + 0.25 * Math.abs(Math.sin(lf / 3))} style={{ filter: `drop-shadow(0 0 10px ${GOLD})` }} />
            <path d={`M${needleX - 15} ${needleY} L${needleX + 15} ${needleY} M${needleX} ${needleY - 15} L${needleX} ${needleY + 15}`} stroke="#FFF6D6" strokeWidth={1.6} opacity={0.35 + 0.4 * Math.abs(Math.sin(lf / 3.4))} />
          </svg>
        )}

        {/* ---------- BEAT 3: the SNAP — shockwave ring + burst ---------- */}
        {impact > 0.02 && [0, 1].map((k) => { const rr = 96 + (1 - impact) * (330 + k * 90); return <div key={"ring" + k} style={{ position: "absolute", left: 506 - rr, top: 388 - rr, width: rr * 2, height: rr * 2, borderRadius: "50%", border: `${1.5 + impact * 3}px solid rgba(255,236,180,${(impact * 0.4 - k * 0.12).toFixed(3)})`, zIndex: 40, pointerEvents: "none" }} />; })}
        {impact > 0.02 && Array.from({ length: 12 }).map((_, i) => { const a = (i / 12) * Math.PI * 2; const d = 70 + (1 - impact) * 210; return <div key={"bs" + i} style={{ position: "absolute", left: 506 + Math.cos(a) * d, top: 388 + Math.sin(a) * d * 0.85, width: 10, height: 10, borderRadius: "50%", background: i % 2 ? "#FFE9AE" : GRAPEL, boxShadow: `0 0 12px ${i % 2 ? GOLD : GRAPE}`, opacity: impact, zIndex: 41 }} />; })}
        {/* full-panel shimmer sweep right after the snap */}
        <Glint lf={lf} at={1.58} dur={0.5} />

        {/* ---------- BEAT 5: the PASS stamp slams onto the work ---------- */}
        {stamp > 0.02 && (
          <>
            <div style={{ position: "absolute", left: 588, top: 424, zIndex: 42, transform: `rotate(-13deg) scale(${interpolate(stamp, [0, 1], [2.6, 1])})`, transformOrigin: "50% 50%", opacity: Math.min(1, stamp * 2.4) }}>
              <div style={{ padding: "10px 26px", borderRadius: 12, border: `6px solid ${GREEN}`, background: "rgba(14,26,20,0.72)", boxShadow: `0 0 ${20 + impact2 * 34}px rgba(63,158,116,0.75), 0 14px 28px rgba(0,0,0,0.55)` }}>
                <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 46, letterSpacing: "0.08em", color: "#8FE0B0", lineHeight: 1, textShadow: `0 0 18px ${GREEN}` }}>PASS</div>
                <div style={{ fontFamily: mono, fontWeight: 700, fontSize: 11, letterSpacing: "0.2em", color: "rgba(160,220,190,0.75)", textAlign: "center", marginTop: 2 }}>TAILORED · 96%</div>
              </div>
            </div>
            {/* chime-pop ring off the stamp */}
            {impact2 > 0.02 && <div style={{ position: "absolute", left: 668 - (40 + (1 - impact2) * 190), top: 470 - (40 + (1 - impact2) * 190), width: (40 + (1 - impact2) * 190) * 2, height: (40 + (1 - impact2) * 190) * 2, borderRadius: "50%", border: `${2 + impact2 * 5}px solid rgba(143,224,176,${(impact2 * 0.8).toFixed(3)})`, zIndex: 41, pointerEvents: "none" }} />}
            {impact2 > 0.02 && Array.from({ length: 8 }).map((_, i) => { const a = (i / 8) * Math.PI * 2 + 0.4; const d = (1 - impact2) * 130; return <div key={"cf" + i} style={{ position: "absolute", left: 668 + Math.cos(a) * d, top: 470 + Math.sin(a) * d * 0.8, width: 8, height: 8, borderRadius: 2, background: i % 2 ? "#8FE0B0" : GOLD, transform: `rotate(${lf * 12 + i * 40}deg)`, opacity: impact2, zIndex: 42 }} />; })}
          </>
        )}

        {/* tailor's payoff line */}
        {cheer > 0.05 && <Speech x={166} y={432} text="cut to fit." accent={GRAPE} size={24} s={over(lf, fr(2.52), fr(0.3), Easing.out(Easing.back(1.8)))} />}

        {/* impact white flashes */}
        {flash > 0.005 && <div style={{ position: "absolute", inset: 0, background: `rgba(255,248,232,${flash.toFixed(3)})`, zIndex: 46, pointerEvents: "none" }} />}
      </div>

      {/* ================= THE ONE RECEIPT: style match 41 -> 96% ================= */}
      <MatchMeter lf={lf} x={702} y={140} label="STYLE MATCH" pct={pct} state={pass ? "PASS" : undefined} stateColor={GRAPE} barColor={GRAPE} big={56} />
      <div style={{ position: "absolute", left: 702, top: 254, width: 262, textAlign: "right", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 16, color: "rgba(200,175,224,0.7)", zIndex: 31 }}>▲ was 41%</div>

      <SceneTitle lf={lf} a="LEARNS" b="YOUR STYLE" accent={GRAPE} size={52} />
      <LivePill lf={lf} text="STYLE · LEARNED" />
      <SubLabel text="MAISON HERMEZ · BESPOKE" />
    </Panel>
  );
};


// ===== Money (CALLBACK-bar single-hero, workflow-authored) =====
// ===== Money (CALLBACK-bar single-hero, workflow-authored) =====
// S5 — 10x CHEAPER — the enormous luminous $100 PRICE TAG is the hero; a NINJA mascot
// dashes in and SLICES it in half: the $100 top tumbles away, the remaining half glows $10.
// Beats: 1 tag swings in + smug robot · 2 lights flicker + ninja shadow streaks · 3 DASH-IN
// · 4 SLASH (hit-stop + flash + shockwave) · 5 SPLIT + $10 reveal + −90% · 6 robot DEFLATES
// · 7 sheathe + pose. Nothing is ever static: sway, motes, glow-breathing, idle bob.
const Money: React.FC<{ lf: number }> = ({ lf }) => {
  const SL = fr(2.35);               // the SLASH frame
  const post = Math.max(0, lf - SL);

  // ---- beat 1: tag swings in, robot struts in smug -------------------------
  const railIn = over(lf, 0, fr(0.3), Easing.out(Easing.cubic));
  const tagIn = over(lf, fr(0.05), fr(0.6), Easing.out(Easing.back(1.25)));
  const robotIn = over(lf, fr(0.35), fr(0.5), Easing.out(Easing.back(1.1)));
  const consoleIn = over(lf, fr(0.5), fr(0.6), Easing.out(Easing.cubic));
  const robotSay = over(lf, fr(0.75), fr(0.3), Easing.out(Easing.back(1.7))) * (1 - ramp(lf, fr(1.35), fr(1.55)));

  // ---- beat 2: the warning — light flicker + a ninja shadow crossing --------
  const shadow = over(lf, fr(0.95), fr(0.5), Easing.inOut(Easing.cubic));
  const flick = lf > fr(1.02) && lf < fr(1.9) ? (Math.sin(lf * 3.4) > 0 ? 0.72 : 1) : 1;

  // ---- beat 3: he LURKS — two eyes + a blade gleam in the dark, right edge --
  const lurk = over(lf, fr(1.45), fr(0.24), Easing.out(Easing.cubic)) * (1 - ramp(lf, fr(1.86), fr(1.96)));

  // ---- beat 4: the DASH-IN (right -> tag), arriving exactly on the slash ----
  const dIn = over(lf, fr(1.9), fr(0.45), Easing.in(Easing.cubic));
  const dOut = over(lf, SL + 4, fr(0.4), Easing.out(Easing.cubic));   // 4-frame hit-stop first
  const ninjaVis = lf >= fr(1.9) ? 1 : 0;
  const dashing = ninjaVis > 0 && dOut < 0.62;
  const nx = dOut > 0 ? 506 + (46 - 506) * dOut : 1120 + (506 - 1120) * dIn;
  const ny = dOut > 0 ? 292 + (468 - 292) * dOut : 300 + (292 - 300) * dIn;
  const face = dOut < 0.62 ? -1 : 1;

  // ---- beat 4: the SLASH — anticipation -> impact -> overshoot -> settle ----
  const antic = over(lf, SL - fr(0.3), fr(0.3), Easing.in(Easing.quad));
  const arc = over(lf, SL - 3, fr(0.14), Easing.out(Easing.cubic));
  const arcFade = 1 - ramp(lf, SL + 2, SL + fr(0.26));
  const impact = lf >= SL ? Math.max(0, 1 - post / 10) : 0;
  const flash = lf >= SL ? Math.max(0, 1 - post / 7) : 0;
  const wave = over(lf, SL, fr(0.42), Easing.out(Easing.cubic));
  const shake = impact > 0 ? Math.sin(lf * 4.9) * 11 * impact : 0;

  // ---- beat 5: the SPLIT + the $10 reveal ----------------------------------
  const tumble = over(lf, SL + 4, fr(1.15), Easing.inOut(Easing.quad));       // top half flies off
  const topOp = 1 - ramp(lf, SL + fr(0.78), SL + fr(1.15));
  const drop = over(lf, SL + 4, fr(0.5), Easing.out(Easing.back(1.7)));       // bottom half settles
  const swell = over(lf, SL + fr(0.45), fr(0.6), Easing.out(Easing.back(1.5))); // survivor reclaims the frame
  const reveal = over(lf, SL + 5, fr(0.14), Easing.out(Easing.cubic));         // instant transmutation
  const tenPop = over(lf, SL + fr(0.16), fr(0.44), Easing.out(Easing.back(2.2)));
  const billTotal = interpolate(lf, [SL + fr(0.2), SL + fr(1.1)], [100, 10], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const badgePop = over(lf, SL + fr(0.9), fr(0.45), Easing.out(Easing.back(2)));
  const chipScale = (0.4 + badgePop * 0.6) * (badgePop > 0.9 ? 1 + Math.sin(lf / 7) * 0.03 : 1);

  // ---- beat 6: the robot panics, then DEFLATES ------------------------------
  const panic = over(lf, SL, fr(0.22), Easing.out(Easing.cubic)) * (1 - ramp(lf, SL + fr(1.0), SL + fr(1.15)));
  const deflate = over(lf, SL + fr(1.05), fr(1.2), Easing.in(Easing.quad));
  const jitter = panic > 0.1 ? Math.sin(lf * 5.4) * 4 * panic : 0;
  const rBob = Math.sin(lf / 13) * 3 * (1 - deflate);

  // ---- beat 7: the landing, the sheathe, the pose ---------------------------
  const land = over(lf, SL + fr(0.3), fr(0.5), Easing.out(Easing.back(2)));
  const squash = lf >= SL + fr(0.3) ? Math.max(0, 1 - (lf - (SL + fr(0.3))) / 8) : 0;
  const sheath = over(lf, fr(4.9), fr(0.4), Easing.inOut(Easing.cubic));
  const click = over(lf, fr(5.28), fr(0.34), Easing.out(Easing.cubic));
  const cheer = over(lf, fr(5.3), fr(0.5));
  const speechPop = over(lf, fr(5.15), fr(0.32), Easing.out(Easing.back(1.7)));

  // ---- continuous ambient motion (never a frozen frame) --------------------
  const preSway = Math.sin(lf / 12) * 6 * (1 - ramp(lf, SL - 10, SL));
  const recoil = lf >= SL ? Math.sin(post / 3.4) * 15 * Math.exp(-post / 22) : 0;
  const idleSway = lf >= SL ? Math.sin(lf / 14) * 2.6 * ramp(lf, SL + fr(1.1), SL + fr(1.8)) : 0;
  const tagRot = preSway + recoil + idleSway;
  const hover = Math.sin(lf / 11) * 3 * ramp(lf, SL + fr(0.6), SL + fr(1.1));
  const breathe = 1 + Math.sin(lf / 9) * 0.05;

  const G = "#F0C24C", GD = "#C98F26", GH = "#FBE39C";                        // robot golds
  const bloom = 0.16 + tagIn * 0.22 + reveal * 0.62;                          // hero luminosity
  const CUT_TOP = "polygon(0px 0px, 420px 0px, 420px 138px, 0px 162px)";
  const CUT_BOT = "polygon(0px 162px, 420px 138px, 420px 330px, 0px 330px)";
  const kLen = (54 + impact * 24) * (1 - sheath);
  const kRot = interpolate(land, [0, 1], [-24, 26]) + sheath * -152;

  return (
    <Panel tint="rgba(63,158,116,0.42)">
      {/* ================= BACKGROUND (z 0..8) — quiet, deep, receding ================= */}
      <div style={{ position: "absolute", inset: 0, background: grad("#132019", "#080D0B"), zIndex: 0 }} />
      <RoomWall hue="rgba(90,150,120,0.05)" tile={104} />
      {/* layered receding architecture — flat silhouettes, low contrast, parallaxing on shake */}
      {[[-16, 150, 210, 420, 0.9], [838, 128, 200, 440, 0.9], [206, 214, 108, 330, 0.66], [716, 198, 96, 348, 0.66]].map(([sx, sy, sw, sh, dp], i) => (
        <div key={"arch" + i} style={{ position: "absolute", left: (sx as number) + shake * (dp as number) * 0.18, top: sy as number, width: sw as number, height: sh as number, borderRadius: 10, background: `rgba(8,15,12,${0.6 + (dp as number) * 0.28})`, border: "1px solid rgba(120,190,158,0.05)", zIndex: 1 + i * 0.1 }} />
      ))}
      {/* far shelving inside the silhouettes — barely-there rails, reads as depth not clutter */}
      {[212, 296, 380, 462].map((ry, i) => (
        <React.Fragment key={"rail" + i}>
          <div style={{ position: "absolute", left: 8, width: 186, top: ry, height: 4, borderRadius: 2, background: `rgba(130,200,168,${0.055 + (i % 2) * 0.02})`, zIndex: 2 }} />
          <div style={{ position: "absolute", left: 856, width: 168, top: ry + 14, height: 4, borderRadius: 2, background: `rgba(130,200,168,${0.05 + (i % 2) * 0.02})`, zIndex: 2 }} />
        </React.Fragment>
      ))}
      {/* two soft ambient glow pools, breathing */}
      <div style={{ position: "absolute", left: 176, top: 60, width: 660, height: 600, borderRadius: "50%", background: `radial-gradient(circle, rgba(63,158,116,${(0.09 + bloom * 0.17 * breathe).toFixed(3)}), transparent 68%)`, filter: "blur(22px)", zIndex: 3 }} />
      <div style={{ position: "absolute", left: -60, top: 300, width: 460, height: 460, borderRadius: "50%", background: "radial-gradient(circle, rgba(90,160,222,0.07), transparent 66%)", filter: "blur(26px)", zIndex: 3 }} />
      {/* soft god-rays raking down from the rail */}
      {[[352, -9], [506, 0], [664, 9]].map(([gx, gr], i) => (
        <div key={"ray" + i} style={{ position: "absolute", left: (gx as number) - 46, top: 96, width: 92, height: 470, transform: `rotate(${gr}deg)`, transformOrigin: "50% 0", background: `linear-gradient(180deg, rgba(190,240,215,${(0.05 + bloom * 0.05).toFixed(3)}), transparent 78%)`, filter: "blur(9px)", zIndex: 4, pointerEvents: "none" }} />
      ))}
      <StageFloor top={560} hue1="#152220" hue2="#0A1210" />
      {/* floor reflection of the hero tag — smeared, dim, follows the swing */}
      <div style={{ position: "absolute", left: 306, top: 566, width: 400, height: 96, borderRadius: 20, background: `linear-gradient(180deg, ${reveal > 0.5 ? "rgba(63,158,116,0.20)" : "rgba(240,194,76,0.16)"}, transparent 76%)`, filter: "blur(13px)", transform: `translateX(${tagRot * 1.6}px) scaleY(-1)`, opacity: tagIn * (0.5 + bloom * 0.5), zIndex: 4 }} />
      <div style={{ position: "absolute", left: 236, top: 552, width: 560, height: 132, borderRadius: "50%", background: `radial-gradient(ellipse, rgba(120,224,176,${(0.05 + bloom * 0.14).toFixed(3)}), transparent 70%)`, filter: "blur(14px)", zIndex: 4 }} />
      {/* one soft key light on the hero — flickers as the ninja passes */}
      <SpotCone x={506} topY={128} floorY={640} spread={392} hue="#CFEEDD" lit={(0.3 + bloom * 0.44) * flick} />
      {/* the ninja's SHADOW crossing the back wall (beat 2 — the warning) */}
      {shadow > 0 && shadow < 1 && (
        <div style={{ position: "absolute", left: 1010 - shadow * 1240, top: 130, width: 190, height: 470, transform: "skewX(-9deg)", background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.6), transparent)", filter: "blur(11px)", zIndex: 6, pointerEvents: "none" }} />
      )}
      {/* drifting dust motes */}
      {Array.from({ length: 14 }).map((_, i) => { const s = seed(i * 5.1); const x = 110 + seed(i * 2.7) * 800 + Math.sin(lf / (22 + s * 16) + i) * 12; const y = 110 + ((seed(i * 1.9) * 540 + lf * (0.2 + s * 0.44)) % 540); return (
        <div key={"mote" + i} style={{ position: "absolute", left: x, top: y, width: 2 + s * 3, height: 2 + s * 3, borderRadius: "50%", background: "rgba(200,240,220,0.5)", opacity: 0.12 + s * 0.24, zIndex: 7 }} />); })}
      <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 220px rgba(0,0,0,0.72)", zIndex: 8, pointerEvents: "none" }} />

      {/* ================= FOREGROUND (z >= 20) ================= */}
      <div style={{ position: "absolute", inset: 0, transform: `translate(${shake}px, ${shake * 0.35}px)`, zIndex: 20 }}>

        {/* hanging rail */}
        <div style={{ position: "absolute", left: 306, top: 94, width: 400, height: 6, borderRadius: 3, background: grad("#4C6157", "#2A3730"), zIndex: 22, opacity: railIn, transform: `scaleX(${railIn})` }} />
        {/* luminous halo behind the hero tag — gold before the cut, green after */}
        <div style={{ position: "absolute", left: 226, top: 168, width: 560, height: 428, borderRadius: "50%", background: `radial-gradient(closest-side, ${reveal > 0.5 ? "rgba(63,158,116," : "rgba(240,194,76,"}${(0.15 + bloom * 0.42 * breathe - antic * 0.06).toFixed(3)}), transparent 74%)`, filter: "blur(16px)", zIndex: 23, opacity: tagIn, pointerEvents: "none" }} />

        {/* ================= HERO: the ENORMOUS PRICE TAG ================= */}
        <div style={{ position: "absolute", left: 296, top: 100, width: 420, height: 430, zIndex: 26, transformOrigin: "50% 0", transform: `rotate(${tagRot}deg) scale(${(0.9 + tagIn * 0.1) * (1 - antic * 0.03) * (1 + impact * 0.05)})`, opacity: tagIn }}>

          {/* --- TOP GROUP: ring + string + the $100 half that gets sliced off --- */}
          <div style={{ position: "absolute", left: 0, top: 0, width: 420, height: 426, transform: `translate(${tumble * -216}px, ${-Math.sin(tumble * Math.PI) * 118 + tumble * 424}px) rotate(${tumble * -264}deg)`, transformOrigin: "50% 62%", opacity: topOp }}>
            {/* hanger ring */}
            <div style={{ position: "absolute", left: 197, top: 0, width: 26, height: 26, borderRadius: "50%", border: "5px solid #9AB3A6", boxShadow: "0 3px 8px rgba(0,0,0,0.5)" }} />
            {/* string */}
            <div style={{ position: "absolute", left: 207, top: 24, width: 5, height: 64, background: grad("#D3E2DA", "#8FA79A"), boxShadow: "0 0 6px rgba(0,0,0,0.4)" }} />
            {/* string collar */}
            <div style={{ position: "absolute", left: 196, top: 84, width: 28, height: 10, borderRadius: 4, background: grad("#9AB3A6", "#5E7369") }} />
            {/* the gold card — TOP half only (clipped along the cut) */}
            <div style={{ position: "absolute", left: 0, top: 96, width: 420, height: 330, clipPath: CUT_TOP }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: 34, background: grad("#FFF6E2", "#E7CFA2"), border: "7px solid #C9A24A", boxShadow: `0 34px 66px -18px rgba(0,0,0,0.66), 0 0 ${40 + impact * 64}px rgba(240,194,76,0.42), inset 0 6px 0 rgba(255,255,255,0.7)` }}>
                <div style={{ position: "absolute", top: 20, left: 193, width: 34, height: 34, borderRadius: "50%", border: "7px solid #C9A24A", background: "#0A130F", boxShadow: "inset 0 3px 7px rgba(0,0,0,0.6)" }} />
                <span style={{ position: "absolute", left: 0, right: 0, top: 80, textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 152, lineHeight: 0.92, letterSpacing: "-0.05em", color: RED, textShadow: "0 5px 0 rgba(120,32,22,0.35)" }}>$100</span>
                <span style={{ position: "absolute", left: 0, right: 0, top: 236, textAlign: "center", fontFamily: mono, fontSize: 24, fontWeight: 800, color: "#8E2F22", letterSpacing: "0.34em" }}>PER JOB</span>
              </div>
              {/* white-hot cut edge on the severed face */}
              <div style={{ position: "absolute", left: -10, top: 149, width: 440, height: 7, transform: "rotate(-3.27deg)", background: `rgba(240,255,246,${0.2 + impact * 0.8})`, boxShadow: `0 0 ${10 + impact * 22}px rgba(200,255,228,${0.5 + impact * 0.5})`, opacity: lf >= SL ? 1 : 0 }} />
            </div>
          </div>

          {/* --- BOTTOM GROUP: the surviving half that becomes $10 (swells to own the frame) --- */}
          <div style={{ position: "absolute", left: 0, top: 96, width: 420, height: 330, transform: `scale(${1 + swell * 0.3})`, transformOrigin: "50% 100%" }}>
          <div style={{ position: "absolute", inset: 0, clipPath: CUT_BOT, transform: `translateY(${drop * 24 + hover}px) rotate(${drop * 2.4}deg)`, transformOrigin: "50% 0" }}>
            {/* gold state (the bottom of the old $100) — crossfades out */}
            <div style={{ position: "absolute", inset: 0, borderRadius: 34, background: grad("#FFF6E2", "#E7CFA2"), border: "7px solid #C9A24A", boxShadow: "0 34px 66px -18px rgba(0,0,0,0.66), inset 0 6px 0 rgba(255,255,255,0.7)", opacity: 1 - reveal }}>
              <span style={{ position: "absolute", left: 0, right: 0, top: 80, textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 152, lineHeight: 0.92, letterSpacing: "-0.05em", color: RED, textShadow: "0 5px 0 rgba(120,32,22,0.35)" }}>$100</span>
              <span style={{ position: "absolute", left: 0, right: 0, top: 236, textAlign: "center", fontFamily: mono, fontSize: 24, fontWeight: 800, color: "#8E2F22", letterSpacing: "0.34em" }}>PER JOB</span>
            </div>
            {/* green state — the $10 reveal */}
            <div style={{ position: "absolute", inset: 0, borderRadius: 34, background: grad("#E7FAF0", "#A9DFC4"), border: `7px solid ${GREEN}`, boxShadow: `0 34px 66px -18px rgba(0,0,0,0.66), 0 0 ${44 + bloom * 62 * breathe}px rgba(63,158,116,0.6), inset 0 6px 0 rgba(255,255,255,0.75)`, opacity: reveal }}>
              <span style={{ position: "absolute", left: 0, right: 0, top: 160, textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 132, lineHeight: 0.92, letterSpacing: "-0.05em", color: "#1F7A50", textShadow: `0 5px 0 rgba(20,84,54,0.3), 0 0 ${18 + bloom * 20}px rgba(63,158,116,0.55)`, transform: `scale(${0.5 + tenPop * 0.5})`, transformOrigin: "50% 50%", opacity: tenPop }}>$10</span>
              <span style={{ position: "absolute", left: 0, right: 0, top: 290, textAlign: "center", fontFamily: mono, fontSize: 24, fontWeight: 800, color: "#1F7A50", letterSpacing: "0.34em", opacity: tenPop }}>PER JOB</span>
            </div>
            {/* white-hot cut edge on the surviving face */}
            <div style={{ position: "absolute", left: -10, top: 149, width: 440, height: 7, transform: "rotate(-3.27deg)", background: `rgba(240,255,246,${0.22 + impact * 0.78})`, boxShadow: `0 0 ${10 + impact * 24}px rgba(200,255,228,${0.5 + impact * 0.5})`, opacity: lf >= SL ? 1 : 0 }} />
          </div>
          </div>
        </div>

        {/* the BLADE ARC sweeping through the tag */}
        {arc > 0 && arcFade > 0.02 && (
          <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", left: 0, top: 0, zIndex: 29, pointerEvents: "none", opacity: arcFade }}>
            <path d="M978 172 Q506 400 42 452" stroke="rgba(150,255,214,0.5)" strokeWidth={54} fill="none" strokeLinecap="round" strokeDasharray="1160 1160" strokeDashoffset={1160 * (1 - arc)} style={{ filter: "blur(18px)" }} />
            <path d="M978 172 Q506 400 42 452" stroke="rgba(226,255,242,0.9)" strokeWidth={18} fill="none" strokeLinecap="round" strokeDasharray="1160 1160" strokeDashoffset={1160 * (1 - arc)} style={{ filter: "blur(5px)" }} />
            <path d="M978 172 Q506 400 42 452" stroke="#FFFFFF" strokeWidth={6} fill="none" strokeLinecap="round" strokeDasharray="1160 1160" strokeDashoffset={1160 * (1 - arc)} />
          </svg>
        )}
        {/* expanding SHOCKWAVE ring off the impact */}
        {wave > 0 && wave < 1 && (
          <div style={{ position: "absolute", left: 506 - (24 + wave * 286), top: 348 - (24 + wave * 286) * 0.78, width: (24 + wave * 286) * 2, height: (24 + wave * 286) * 1.56, borderRadius: "50%", border: `${Math.max(1, 14 - wave * 12)}px solid rgba(240,255,248,${0.95 * (1 - wave)})`, boxShadow: `0 0 40px rgba(120,224,176,${0.8 * (1 - wave)}), inset 0 0 30px rgba(120,224,176,${0.5 * (1 - wave)})`, zIndex: 29, pointerEvents: "none" }} />
        )}
        {/* impact sparkle burst */}
        {impact > 0.02 && Array.from({ length: 12 }).map((_, i) => { const a = (i / 12) * Math.PI * 2; const d = (1 - impact) * 168; return <div key={`sp${i}`} style={{ position: "absolute", left: 502 + Math.cos(a) * d, top: 340 + Math.sin(a) * d * 0.78, width: 11, height: 11, borderRadius: "50%", background: i % 2 ? GH : "#9FD9BB", opacity: impact, boxShadow: `0 0 14px ${GREEN}`, zIndex: 30 }} />; })}

        {/* ================= SUBORDINATE: GPT-ULTRA robot — panics, then deflates ================= */}
        <div style={{ position: "absolute", left: 742, top: 300, width: 252, height: 262, zIndex: 21, transformOrigin: "50% 100%", transform: `scale(0.66) translate(${deflate * 8 + jitter}px, ${deflate * 54 + rBob + (1 - robotIn) * -30}px) rotate(${deflate * 20}deg) scaleX(${1 + deflate * 0.34}) scaleY(${1 - deflate * 0.64})`, opacity: robotIn * (1 - deflate * 0.2), filter: `saturate(${0.72 - deflate * 0.42}) brightness(${0.78 - deflate * 0.18})` }}>
          {/* antenna */}
          <div style={{ position: "absolute", left: 122, top: -2, width: 4, height: 26, background: GD }} />
          <div style={{ position: "absolute", left: 116, top: -14, width: 16, height: 16, borderRadius: "50%", background: `radial-gradient(circle at 35% 30%, ${GH}, ${GD})`, boxShadow: `0 0 ${8 + panic * 12}px ${panic > 0.3 ? "#E86C5A" : G}`, opacity: (1 - deflate) * (0.55 + 0.45 * Math.abs(Math.sin(lf / (panic > 0.3 ? 3 : 10)))) }} />
          {/* head */}
          <div style={{ position: "absolute", left: 74, top: 22, width: 104, height: 82, borderRadius: 18, background: grad(GH, GD), border: "3px solid #FBEBB4", boxShadow: `inset 0 4px 0 rgba(255,255,255,0.4), inset 0 -10px 22px rgba(120,84,10,0.5), 0 10px 22px -8px rgba(0,0,0,0.5)` }}>
            <div style={{ position: "absolute", left: 12, top: 24, width: 80, height: 34, borderRadius: 12, background: grad("#12201B", "#0A140F"), border: "2px solid #3A4A40", boxShadow: "inset 0 3px 8px rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "space-around" }}>
              {deflate > 0.35 ? (
                <>{[26, 46].map((ex, i) => <svg key={i} width={20} height={20} viewBox="0 0 20 20" style={{ position: "absolute", left: ex }}><path d="M4 4 L16 16 M16 4 L4 16" stroke="#E86C5A" strokeWidth={4} strokeLinecap="round" /></svg>)}</>
              ) : panic > 0.25 ? (
                <>{[0, 1].map((i) => <div key={i} style={{ width: 20 + panic * 6, height: 20 + panic * 6, borderRadius: "50%", background: "#F6FFF9", border: "2px solid #E86C5A", boxShadow: "0 0 12px #E86C5A", display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ width: 6, height: 6, borderRadius: "50%", background: "#12201B" }} /></div>)}</>
              ) : (
                <>{[0, 1].map((i) => <div key={i} style={{ width: 20, height: 12, borderRadius: 4, background: "#E86C5A", boxShadow: "0 0 10px #E86C5A", opacity: 0.55 + 0.45 * Math.abs(Math.sin(lf / 9 + i)) }} />)}</>
              )}
            </div>
          </div>
          {/* torso */}
          <div style={{ position: "absolute", left: 60, top: 104, width: 132, height: 116, borderRadius: 20, background: grad(GH, GD), border: "3px solid #FBEBB4", boxShadow: `inset 0 5px 0 rgba(255,255,255,0.38), inset 0 -14px 26px rgba(120,84,10,0.55), 0 14px 30px -10px rgba(0,0,0,0.6)` }}>
            <div style={{ position: "absolute", left: 18, top: 18, right: 18, height: 46, borderRadius: 10, background: grad("#14211C", "#0A130F"), border: "2px solid #3A4A40", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", boxShadow: "inset 0 2px 8px rgba(0,0,0,0.6)" }}>
              <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 22, color: GH, letterSpacing: "0.02em", lineHeight: 1 }}>GPT-ULTRA</span>
              <span style={{ fontFamily: mono, fontSize: 11, color: "rgba(240,220,160,0.6)", letterSpacing: "0.14em" }}>OmniAI</span>
            </div>
            {[[16, 78], [110, 78], [16, 96], [110, 96]].map(([rx, ry], i) => <div key={i} style={{ position: "absolute", left: rx, top: ry, width: 8, height: 8, borderRadius: "50%", background: grad("#FBEBB4", GD), boxShadow: "inset 0 -1px 2px rgba(120,84,10,0.6)" }} />)}
          </div>
          {/* arms — fly up in panic, flop on deflate */}
          <div style={{ position: "absolute", left: 34, top: 118, width: 40, height: 22, borderRadius: 11, background: grad(GH, GD), border: "2px solid #FBEBB4", transformOrigin: "100% 50%", transform: `rotate(${14 - panic * 74 + deflate * 100}deg)` }} />
          <div style={{ position: "absolute", left: 22, top: 132, width: 22, height: 22, borderRadius: "50%", background: grad(GH, GD), border: "2px solid #FBEBB4", boxShadow: "inset 0 -3px 6px rgba(120,84,10,0.5)", transform: `translate(${panic * 10 - deflate * 6}px, ${-panic * 34 + deflate * 30}px)` }} />
          <div style={{ position: "absolute", right: 30, top: 120, width: 40, height: 22, borderRadius: 11, background: grad(GH, GD), border: "2px solid #FBEBB4", transformOrigin: "0% 50%", transform: `rotate(${-12 + panic * 70 - deflate * 96}deg)` }} />
          {/* legs */}
          <div style={{ position: "absolute", left: 82, top: 214, width: 24, height: 34, borderRadius: 7, background: grad(GD, "#8E6410") }} />
          <div style={{ position: "absolute", left: 146, top: 214, width: 24, height: 34, borderRadius: 7, background: grad(GD, "#8E6410") }} />
        </div>
        {/* robot panic "!" */}
        {panic > 0.15 && <div style={{ position: "absolute", left: 900, top: 366 - panic * 12, zIndex: 23, opacity: panic, transform: `scale(${0.6 + panic * 0.5}) rotate(${Math.sin(lf * 4) * 8}deg)`, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 44, color: "#E86C5A", textShadow: "0 0 16px rgba(232,108,90,0.7)" }}>!</div>}
        {/* deflate AIR-JET puffs, tight to the robot */}
        {deflate > 0.05 && deflate < 0.92 && Array.from({ length: 5 }).map((_, i) => {
          const a = (i / 5) * Math.PI * 2 + seed(i) * 2;
          const d = deflate * (24 + seed(i * 2) * 30);
          return <div key={`pf${i}`} style={{ position: "absolute", left: 862 + Math.cos(a) * d, top: 492 + Math.sin(a) * d, width: 12 + seed(i) * 10, height: 12 + seed(i) * 10, borderRadius: "50%", background: "rgba(210,230,220,0.4)", border: "2px solid rgba(255,255,255,0.3)", opacity: Math.max(0, 0.72 - deflate), zIndex: 22 }} />;
        })}
        <div style={{ position: "absolute", left: 782, top: 548, width: 172, height: 22, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(0,0,0,0.5), transparent 70%)", zIndex: 20, opacity: robotIn * (1 - deflate * 0.5) }} />
        {robotSay > 0.02 && <Speech x={690} y={248} text="premium tier." accent={G} size={20} s={robotSay} />}

        {/* he LURKS in the dark at the right edge — two eyes + a blade gleam */}
        {lurk > 0.02 && (
          <div style={{ position: "absolute", left: 906, top: 286, zIndex: 25, opacity: lurk, transform: `translateX(${(1 - lurk) * 40}px)` }}>
            {[0, 34].map((ex, i) => (
              <div key={"eye" + i} style={{ position: "absolute", left: ex, top: 0, width: 22, height: 7, borderRadius: 4, background: "#F2FFF8", boxShadow: "0 0 14px rgba(190,255,224,0.9)", transform: `rotate(${i ? 8 : -8}deg)`, opacity: 0.7 + 0.3 * Math.abs(Math.sin(lf / 4)) }} />
            ))}
            <div style={{ position: "absolute", left: 8, top: 26, width: 74, height: 3, borderRadius: 2, background: "rgba(226,255,242,0.85)", boxShadow: "0 0 12px rgba(143,224,176,0.9)", transform: "rotate(-32deg)", opacity: 0.4 + 0.6 * Math.abs(Math.sin(lf / 3.2)) }} />
          </div>
        )}

        {/* ================= THE NINJA MASCOT — dashes in, slashes, lands, sheathes ================= */}
        {dashing && dIn > 0.12 && (
          <>
            {/* speed streak */}
            <div style={{ position: "absolute", left: nx + 70, top: ny + 62, width: 300 + dIn * 210, height: 30, borderRadius: 15, background: "linear-gradient(90deg, transparent, rgba(210,114,78,0.34))", filter: "blur(6px)", zIndex: 27, pointerEvents: "none" }} />
            {/* speed lines */}
            {[0, 1, 2, 3, 4].map((i) => <div key={"ln" + i} style={{ position: "absolute", left: nx + 130 + i * 46, top: ny + 20 + seed(i * 3.3) * 120, width: 90 + seed(i) * 120, height: 3, borderRadius: 2, background: "rgba(230,250,240,0.3)", zIndex: 27, opacity: 0.4 + seed(i * 1.7) * 0.4 }} />)}
            {/* afterimages */}
            {[1, 2, 3].map((k) => <div key={"ai" + k} style={{ position: "absolute", left: nx + k * 52, top: ny + k * 3, width: 150, height: 150, borderRadius: "42% 42% 46% 46%", background: `radial-gradient(circle at 45% 40%, rgba(210,114,78,${0.3 / k}), transparent 68%)`, filter: "blur(3px)", zIndex: 27, pointerEvents: "none" }} />)}
          </>
        )}
        {ninjaVis > 0 && (
          <div style={{ position: "absolute", left: nx, top: ny, zIndex: 27, transform: `scaleX(${face}) scale(${1 + squash * 0.12}, ${1 - squash * 0.14})`, transformOrigin: "50% 100%" }}>
            <div style={{ position: "relative", width: 166, height: 166 }}>
              <Mascot lf={lf} size={166} gaze={face < 0 ? -4 : 4} nodAmp={dashing ? 1.2 : 3} nodSpeed={9} cheer={cheer} robber={1} />
              {/* NINJA overlay: red headband + fluttering tails (mascot-local 0..200 viewBox) */}
              <svg viewBox="0 0 200 200" width={166} height={166} style={{ position: "absolute", left: 0, top: 0, overflow: "visible", pointerEvents: "none", zIndex: 2 }}>
                {/* dark ninja GI over the striped jumper + red obi sash */}
                <rect x={34} y={104} width={132} height={44} fill="#1E232B" />
                <rect x={34} y={104} width={132} height={4} fill="#2E3540" />
                <rect x={34} y={128} width={132} height={11} fill="#C0392B" />
                <rect x={92} y={126} width={16} height={15} rx={2} fill="#A32E22" />
                <path d="M100 141 L94 158 M100 141 L107 157" stroke="#C0392B" strokeWidth={4} strokeLinecap="round" fill="none" />
                {/* headband */}
                <rect x={34} y={52} width={132} height={11} fill="#C0392B" />
                <rect x={34} y={52} width={132} height={3} fill="#E86C5A" opacity={0.7} />
                <circle cx={100} cy={57} r={7} fill="#F2FFF8" opacity={0.9} />
                <circle cx={100} cy={57} r={3.4} fill="#C0392B" />
                <path d={`M40 58 Q${14 + Math.sin(lf / 5) * 8} ${72 + Math.cos(lf / 6) * 7} ${-8 + Math.sin(lf / 4) * 10} ${58 + Math.sin(lf / 5.5) * 12}`} stroke="#C0392B" strokeWidth={8} fill="none" strokeLinecap="round" />
                <path d={`M40 62 Q${18 + Math.cos(lf / 4.4) * 9} ${92 + Math.sin(lf / 5) * 8} ${-2 + Math.cos(lf / 3.6) * 11} ${104 + Math.cos(lf / 6) * 10}`} stroke="#A32E22" strokeWidth={6} fill="none" strokeLinecap="round" />
                {/* back scabbard */}
                <rect x={150} y={92} width={9} height={62} rx={4} fill="#1A1F1B" stroke="#3F5A4C" strokeWidth={1.5} transform="rotate(24 154 122)" opacity={0.9} />
              </svg>
              {/* the KATANA */}
              {kLen > 1 && (
                <svg viewBox="0 0 200 200" width={166} height={166} style={{ position: "absolute", left: 0, top: 0, overflow: "visible", pointerEvents: "none", zIndex: 3, transform: `rotate(${kRot}deg)`, transformOrigin: "56% 64%" }}>
                  <rect x={96} y={120} width={30} height={9} rx={4} fill="#241C14" stroke="#5A4630" strokeWidth={1.5} />
                  <rect x={124} y={115} width={7} height={19} rx={2} fill="#C9A24A" stroke="#8E6410" strokeWidth={1} />
                  <path d={`M131 121 L${131 + kLen} ${121 - kLen * 0.36} L${131 + kLen - 7} ${121 - kLen * 0.36 + 9} L131 130 Z`} fill="#EEFBF4" stroke="#9AB3A6" strokeWidth={1.5} style={{ filter: `drop-shadow(0 0 ${4 + impact * 12}px rgba(190,255,224,0.8))` }} />
                  <path d={`M133 123 L${131 + kLen - 5} ${121 - kLen * 0.36 + 3}`} stroke="rgba(255,255,255,0.95)" strokeWidth={1.4} fill="none" />
                </svg>
              )}
            </div>
          </div>
        )}
        {/* landing dust puff */}
        {land > 0.05 && land < 0.85 && [0, 1, 2].map((i) => <div key={"dp" + i} style={{ position: "absolute", left: 40 + i * 52 - land * (i - 1) * 32, top: 618 - land * 12, width: 16 + land * 22, height: 10 + land * 12, borderRadius: "50%", background: "rgba(190,220,206,0.24)", filter: "blur(3px)", opacity: Math.max(0, 0.8 - land), zIndex: 22 }} />)}
        {/* ninja contact shadow */}
        <div style={{ position: "absolute", left: 54, top: 622, width: 150, height: 20, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(0,0,0,0.42), transparent 70%)", zIndex: 20, opacity: land }} />
        {/* the sheathe CLICK spark */}
        {click > 0.02 && click < 1 && <div style={{ position: "absolute", left: 176, top: 494, zIndex: 31, opacity: 1 - click, transform: `scale(${0.5 + click * 1.1}) rotate(${click * 90}deg)`, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 34, color: "#EEFBF4", textShadow: "0 0 18px #8FE0B0" }}>✦</div>}
        {speechPop > 0.02 && <Speech x={60} y={414} text="same brain." accent={GREEN} size={24} s={speechPop} />}

        {/* ================= ONE RECEIPT — small, bottom-right edge ================= */}
        <div style={{ position: "absolute", left: 664, top: 600, width: 314, zIndex: 30, transform: `translateY(${(1 - consoleIn) * 16}px)`, opacity: consoleIn }}>
          <div style={{ borderRadius: 14, background: "rgba(12,20,17,0.94)", border: `2px solid ${GREEN}55`, boxShadow: NAVYSH, padding: "12px 16px" }}>
            <div style={{ fontFamily: mono, fontSize: 13, letterSpacing: "0.14em", color: "rgba(150,200,178,0.62)" }}>INVOICE · PER JOB</div>
            <div style={{ marginTop: 5, display: "flex", alignItems: "baseline", gap: 9 }}>
              <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 26, color: "#7C8A82", textDecoration: "line-through" }}>$100</span>
              <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 20, color: "rgba(180,215,198,0.7)" }}>→</span>
              <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 42, color: GREEN, lineHeight: 1, textShadow: `0 0 18px ${GREEN}66` }}>${Math.round(billTotal)}</span>
            </div>
          </div>
        </div>
        {/* ================= lone accent: the −90% chip ================= */}
        <div style={{ position: "absolute", left: 690, top: 552, zIndex: 32, transform: `rotate(-7deg) scale(${chipScale.toFixed(3)})`, transformOrigin: "left center", opacity: badgePop }}>
          <Chip text="−90%" bg={grad(GREEN, "#2C6E4E")} bd="#8FE0B0" fg="#EAFBF1" size={30} />
        </div>

        {/* the sheathe glint sweeping the finished $10 tag */}
        <Glint lf={lf} at={5.45} dur={0.5} />
        {/* the SLASH white flash */}
        {flash > 0 && <div style={{ position: "absolute", inset: 0, background: `rgba(236,255,246,${flash * 0.46})`, zIndex: 44, pointerEvents: "none" }} />}
      </div>

      <SceneTitle lf={lf} a="10×" b="CHEAPER" accent={GREEN} size={58} />
      <LivePill lf={lf} text="CLODE · BILLING" />
      <SubLabel text="SAME BRAIN · CHEAPER MODEL" />
    </Panel>
  );
};


// ===== Command (CALLBACK-bar single-hero, workflow-authored) =====
// S6 — YOUR COMMAND CENTER — NASA mission-control war-room, workspace self-wires into a purple constellation
const Command: React.FC<{ lf: number }> = ({ lf }) => {
  const enter = over(lf, 0, fr(0.4), Easing.out(Easing.cubic));
  const plug = over(lf, fr(0.6), fr(0.4), Easing.out(Easing.back(1.6)));
  const snap = lf >= fr(1.0) ? Math.max(0, 1 - (lf - fr(1.0)) / 11) : 0;
  const armsCross = over(lf, fr(1.1), fr(0.35), Easing.out(Easing.back(1.4)));
  const wire = over(lf, fr(1.4), fr(2.4), Easing.inOut(Easing.cubic));
  const winIn = over(lf, fr(0.9), fr(0.5), Easing.out(Easing.cubic));
  const pillIn = over(lf, fr(2.2), fr(0.4), Easing.out(Easing.back(1.5)));
  const topple = over(lf, fr(2.7), fr(1.1), Easing.in(Easing.cubic));
  const links = Math.round(over(lf, fr(1.8), fr(2.6)) * 892);
  const hubPulse = 1 + Math.sin(lf / 7) * 0.06;
  const speechPop = over(lf, fr(1.25), fr(0.32), Easing.out(Easing.back(1.7)));
  // hub + 8 satellite notes (Panel-local coords)
  const sat: number[][] = [[362, 172], [648, 172], [300, 292], [712, 292], [430, 130], [582, 130], [468, 360], [560, 356]];
  const WX = 452, WY = 452, WW = 496; // Obsidiam window box

  return (
    <Panel tint="rgba(158,118,207,0.42)">
      <RoomWall hue="rgba(150,118,207,0.09)" tile={86} />
      <StageFloor top={548} hue1="#1B203A" hue2="#111528" />

      {/* ===== back command WALL ===== */}
      <div style={{ position: "absolute", left: 40, right: 40, top: 116, height: 320, borderRadius: 20, background: grad("#152140", "#0B1224"), border: "2px solid rgba(120,96,180,0.35)", boxShadow: "inset 0 3px 0 rgba(180,150,230,0.14), inset 0 -30px 60px rgba(0,0,0,0.5)", zIndex: 2, opacity: enter, backgroundImage: "linear-gradient(rgba(150,118,207,0.06) 1.5px,transparent 1.5px),linear-gradient(90deg,rgba(150,118,207,0.06) 1.5px,transparent 1.5px)", backgroundSize: "64px 64px" }} />
      {/* purple energy glow that swells as the wall wires up */}
      <div style={{ position: "absolute", left: 210, top: 120, width: 600, height: 320, borderRadius: "50%", background: `radial-gradient(closest-side, rgba(158,118,207,${0.08 + wire * 0.26}), transparent 72%)`, filter: "blur(12px)", zIndex: 3 }} />

      {/* ===== glowing HOUSTON mission-control sign ===== */}
      <div style={{ position: "absolute", left: 66, top: 132, width: 232, height: 56, borderRadius: 12, background: grad("#0E1526", "#060B16"), border: "2px solid #2A3A5A", boxShadow: `0 0 ${16 + wire * 14}px rgba(120,200,150,0.45), inset 0 0 20px rgba(0,0,0,0.5)`, zIndex: 4, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, opacity: enter, transform: `translateY(${(1 - enter) * -12}px)` }}>
        <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#4FE08C", boxShadow: "0 0 8px #4FE08C", opacity: 0.5 + 0.5 * Math.abs(Math.sin(lf / 6)) }} />
        <span style={{ fontFamily: mono, fontWeight: 900, fontSize: 30, letterSpacing: "0.14em", color: "#7DE8AE", textShadow: "0 0 14px rgba(80,224,140,0.7)" }}>HOUSTON</span>
        <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#F5BE47", boxShadow: "0 0 8px #F5BE47", opacity: 0.5 + 0.5 * Math.abs(Math.sin(lf / 6 + 1.5)) }} />
      </div>

      {/* ===== row of tiny mission-control console screens along wall base ===== */}
      {Array.from({ length: 6 }).map((_, i) => { const on = over(lf, fr(0.2 + i * 0.08), fr(0.3)); return (
        <div key={"scr" + i} style={{ position: "absolute", left: 92 + i * 138, top: 392, width: 72, height: 36, borderRadius: 6, background: "#0A1120", border: "1.5px solid #23304C", zIndex: 3, opacity: on * 0.9, overflow: "hidden" }}>
          {[0, 1, 2].map((k) => <div key={k} style={{ position: "absolute", left: 8 + k * 20, bottom: 6, width: 12, height: 6 + (seed(i * 3 + k) * 20), background: k % 2 ? "#5AA0DE" : GRAPE, borderRadius: 2, opacity: 0.8 }} />)}
        </div>); })}

      {/* ===== SPOTLIGHTS ===== */}
      <SpotCone x={506} topY={150} floorY={440} spread={320} hue="#CBA9EC" lit={0.5 + wire * 0.5} />
      <SpotCone x={205} topY={150} floorY={690} spread={230} hue="#FBE3A0" lit={0.7} />

      {/* ===== the self-wiring CONSTELLATION ===== */}
      <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", left: 0, top: 0, zIndex: 5, pointerEvents: "none" }}>
        {/* hub → note spokes */}
        {sat.map(([x, y], k) => { const lp = over(lf, fr(1.6 + k * 0.13), fr(0.5)); return <line key={"sp" + k} x1={506} y1={250} x2={506 + (x - 506) * lp} y2={250 + (y - 250) * lp} stroke={GRAPE} strokeWidth={3} opacity={lp * 0.8} />; })}
        {/* faint inter-note web (the 892-links density) */}
        {sat.map(([x, y], k) => { const nx = sat[(k + 1) % sat.length]; const lp = over(lf, fr(2.3 + k * 0.09), fr(0.5)); return <line key={"web" + k} x1={x} y1={y} x2={x + (nx[0] - x) * lp} y2={y + (nx[1] - y) * lp} stroke="#7B57A8" strokeWidth={1.5} opacity={lp * 0.32} />; })}
        {/* satellite note-dots */}
        {sat.map(([x, y], k) => { const np = over(lf, fr(1.5 + k * 0.13), fr(0.4), Easing.out(Easing.back(1.8))); return <circle key={"nd" + k} cx={x} cy={y} r={12} fill="#C9A8E8" opacity={np} style={{ filter: `drop-shadow(0 0 8px ${GRAPE}aa)` }} />; })}
        {/* pulsing HUB */}
        <circle cx={506} cy={250} r={32 * hubPulse} fill="none" stroke={GRAPE} strokeWidth={2} opacity={plug * 0.45} />
        <circle cx={506} cy={250} r={22 * hubPulse} fill={GRAPE} opacity={plug} style={{ filter: `drop-shadow(0 0 20px ${GRAPE})` }} />
        <circle cx={499} cy={243} r={6} fill="rgba(255,255,255,0.55)" opacity={plug} />
      </svg>
      <div style={{ position: "absolute", left: 476, top: 292, zIndex: 6, fontFamily: mono, fontSize: 14, fontWeight: 800, letterSpacing: "0.08em", color: "#E6D6F6", opacity: plug }}>FOCUS</div>

      {/* ===== storm of loose task / plan / project papers flying into the wall ===== */}
      {sat.map(([nx, ny], k) => {
        const p = over(lf, fr(1.15 + k * 0.1), fr(0.72), Easing.inOut(Easing.cubic));
        const sx0 = 300, sy0 = 588;
        const x = sx0 + (nx - sx0) * p - 23;
        const y = sy0 + (ny - sy0) * p - 28;
        const sc = 1 - p * 0.6;
        const rot = (seed(k * 2.1) * 44 - 22) * (1 - p);
        const op = p < 0.85 ? enter : Math.max(0, (1 - p) / 0.15);
        const type = k % 3;
        return (
          <div key={"pap" + k} style={{ position: "absolute", left: x, top: y, width: 46, height: 56, transform: `scale(${sc}) rotate(${rot}deg)`, opacity: op, zIndex: 8, borderRadius: 5, background: grad("#FBF7EE", "#E9E1CE"), border: "1.5px solid #CFC4A8", boxShadow: "0 6px 14px rgba(0,0,0,0.35)", overflow: "hidden" }}>
            <div style={{ height: 12, background: type === 0 ? CLAY : type === 1 ? GRAPE : SKY, opacity: 0.85 }} />
            {type === 0 && [0, 1, 2].map((r) => <div key={r} style={{ position: "absolute", left: 6, top: 18 + r * 10, display: "flex", gap: 4, alignItems: "center" }}><div style={{ width: 6, height: 6, borderRadius: 2, border: "1.5px solid #2FA968" }} /><div style={{ width: 26, height: 3, borderRadius: 2, background: "#B8A882" }} /></div>)}
            {type === 1 && [0, 1, 2].map((r) => <div key={r} style={{ position: "absolute", left: 6 + r * 6, top: 20 + r * 11, width: 26 - r * 4, height: 5, borderRadius: 3, background: GRAPE, opacity: 0.7 }} />)}
            {type === 2 && <div style={{ position: "absolute", left: 8, top: 22, width: 30, height: 22, borderRadius: "3px 6px 4px 4px", background: grad("#9CC0EC", "#5AA0DE") }}><div style={{ position: "absolute", left: 2, top: -5, width: 14, height: 6, borderRadius: "3px 3px 0 0", background: "#5AA0DE" }} /></div>}
          </div>
        );
      })}

      {/* ===== toppling red-string CORK-BOARD (the manual way, outclassed) ===== */}
      <div style={{ position: "absolute", left: 28, top: 452, zIndex: 7, transformOrigin: "0% 100%", transform: `rotate(${topple * 80}deg) translateY(${topple * 22}px)`, opacity: enter }}>
        <div style={{ width: 158, height: 128, borderRadius: 10, background: grad("#7A5A38", "#5A4128"), border: "6px solid #4A3320", boxShadow: "0 14px 26px rgba(0,0,0,0.4)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 6, borderRadius: 4, background: grad("#C9A46A", "#A8834E") }} />
          {/* pinned notes */}
          <div style={{ position: "absolute", left: 18, top: 20, width: 42, height: 34, background: "#F4EEDC", transform: "rotate(-6deg)", boxShadow: "0 3px 6px rgba(0,0,0,0.25)" }} />
          <div style={{ position: "absolute", left: 92, top: 30, width: 40, height: 32, background: "#EFE3C6", transform: "rotate(7deg)", boxShadow: "0 3px 6px rgba(0,0,0,0.25)" }} />
          <div style={{ position: "absolute", left: 52, top: 70, width: 44, height: 30, background: "#F4EEDC", transform: "rotate(3deg)", boxShadow: "0 3px 6px rgba(0,0,0,0.25)" }} />
          {/* red string */}
          <svg viewBox="0 0 158 128" width={158} height={128} style={{ position: "absolute", left: 0, top: 0 }}>
            <path d="M40 32 L112 44 L74 84 L40 32" stroke="#C0392B" strokeWidth={2.5} fill="none" opacity={0.85} />
          </svg>
          {/* push-pins */}
          {[[40, 30], [112, 44], [74, 84]].map(([px, py], i) => <div key={i} style={{ position: "absolute", left: px - 4, top: py - 4, width: 9, height: 9, borderRadius: "50%", background: i === 0 ? "#E0503C" : i === 1 ? "#5AA0DE" : "#F5BE47", boxShadow: "0 1px 2px rgba(0,0,0,0.4)" }} />)}
        </div>
      </div>
      {/* pins popping off as it topples */}
      {topple > 0.15 && [0, 1].map((k) => <div key={"pin" + k} style={{ position: "absolute", left: 70 + k * 40, top: 470 - topple * 60 + k * 20, width: 8, height: 8, borderRadius: "50%", background: k ? "#5AA0DE" : "#E0503C", zIndex: 9, opacity: 1 - topple }} />)}

      {/* ===== CONSOLE desk with glowing purple port ===== */}
      <div style={{ position: "absolute", left: 58, top: 600, width: 306, height: 90, zIndex: 12, opacity: enter }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: "14px 14px 10px 10px", background: grad("#26304A", "#161D30"), border: "2px solid #33405E", boxShadow: "0 -6px 20px rgba(0,0,0,0.35), inset 0 3px 0 rgba(180,200,240,0.12)" }} />
        {/* button row */}
        {[GREEN, GOLD, "#5AA0DE", RED].map((c, i) => <div key={i} style={{ position: "absolute", left: 22 + i * 26, top: 20, width: 15, height: 15, borderRadius: "50%", background: c, boxShadow: `0 0 8px ${c}`, opacity: 0.55 + 0.45 * Math.abs(Math.sin(lf / 5 + i)) }} />)}
        {/* slider ticks */}
        {[0, 1, 2].map((i) => <div key={"sl" + i} style={{ position: "absolute", left: 150 + i * 20, top: 16, width: 8, height: 40, borderRadius: 4, background: "#0E1526", border: "1px solid #2A3550" }} />)}
        {/* glowing purple PORT */}
        <div style={{ position: "absolute", right: 22, top: 22, width: 40, height: 36, borderRadius: 8, background: "#0A0F1C", border: "2px solid #6B4FA0", boxShadow: `inset 0 0 10px rgba(158,118,207,${0.4 + plug * 0.5}), 0 0 ${8 + plug * 14}px rgba(158,118,207,0.6)` }} />
      </div>
      {/* fat purple JACK sliding into the port */}
      <div style={{ position: "absolute", left: 236 + plug * 78, top: 636, zIndex: 13, opacity: enter }}>
        <div style={{ width: 56, height: 30, borderRadius: 7, background: grad("#B98FE0", "#7B4FB0"), border: "2px solid #5A3A88", boxShadow: `0 0 ${6 + plug * 12}px rgba(158,118,207,0.7)` }} />
        <div style={{ position: "absolute", left: -46, top: 10, width: 50, height: 10, borderRadius: 6, background: grad("#7B4FB0", "#5A3A88") }} />
      </div>
      {/* purple CABLE feeding the wall constellation */}
      <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", left: 0, top: 0, zIndex: 4, pointerEvents: "none", opacity: plug }}>
        <path d="M338 614 C 420 560, 440 360, 506 272" stroke="#8A5FC0" strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.55} />
        <path d="M338 614 C 420 560, 440 360, 506 272" stroke="#D6BEF2" strokeWidth={2} fill="none" strokeLinecap="round" strokeDasharray="6 22" strokeDashoffset={-lf * 3} opacity={0.9} />
      </svg>

      {/* ===== the MASCOT commander (cop uniform + headset) ===== */}
      <div style={{ position: "absolute", left: 108, top: 428, zIndex: 11, transform: `translateY(${(1 - enter) * 34}px)`, opacity: enter }}>
        <div style={{ position: "relative", width: 195, height: 195 }}>
          <Mascot lf={lf} size={195} cop={1} gaze={3} stern={armsCross > 0.5 ? 0.6 : 0} nodAmp={1.4} nodSpeed={12} />
          {/* headset earcups + mic boom (shares mascot's 0..200 viewBox space) */}
          <svg viewBox="0 0 200 200" width={195} height={195} style={{ position: "absolute", left: 0, top: 0, overflow: "visible", pointerEvents: "none", zIndex: 2 }}>
            <rect x={26} y={70} width={20} height={30} rx={7} fill="#1E2A3E" stroke="#33455E" strokeWidth={2} />
            <rect x={154} y={70} width={20} height={30} rx={7} fill="#1E2A3E" stroke="#33455E" strokeWidth={2} />
            <path d="M36 96 Q26 126 66 132" stroke="#1E2A3E" strokeWidth={6} fill="none" strokeLinecap="round" />
            <circle cx={70} cy={132} r={8} fill="#3A4E6A" stroke="#5A7090" strokeWidth={2} />
          </svg>
        </div>
      </div>
      {/* the SNAP spark */}
      {snap > 0 && <div style={{ position: "absolute", left: 300, top: 528, zIndex: 14, opacity: snap, transform: `scale(${1 + (1 - snap) * 0.6})` }}>
        <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 40, color: GOLD, textShadow: `0 0 18px ${GOLD}` }}>✦</span>
      </div>}
      {/* commander line */}
      {speechPop > 0.02 && <Speech x={214} y={452} text="hands off." accent={GRAPE} size={26} s={speechPop} />}
      {/* mascot contact shadow */}
      <div style={{ position: "absolute", left: 120, top: 646, width: 210, height: 26, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(0,0,0,0.34), transparent 70%)", zIndex: 6, opacity: enter }} />

      {/* ===== knockoff OBSIDIAM window (the receipt: 41 auto-linked · 214 notes · 892 links) ===== */}
      <div style={{ position: "absolute", left: WX, top: WY, width: WW, height: 232, zIndex: 15, transform: `translateY(${(1 - winIn) * 24}px)`, opacity: winIn }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: 16, background: "#100C18", border: "4px solid #4A3A66", boxShadow: NAVYSH, overflow: "hidden" }}>
          {/* title bar */}
          <div style={{ height: 40, background: "#0A0712", borderBottom: "1px solid #2A2340", display: "flex", alignItems: "center", padding: "0 14px", gap: 8 }}>
            {["#E86C5A", "#E0A94A", "#4CAF7D"].map((c, i) => <div key={i} style={{ width: 11, height: 11, borderRadius: "50%", background: c }} />)}
            <div style={{ marginLeft: 8, display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 16, height: 16, background: grad("#B98FE0", "#7B4FB0"), transform: "rotate(45deg)", borderRadius: 3, boxShadow: `0 0 8px ${GRAPE}` }} />
              <span style={{ fontFamily: mono, fontSize: 16, color: "#C9A8E8", fontWeight: 700 }}>Obsidiam — graph view</span>
            </div>
          </div>
          {/* file tree */}
          <div style={{ position: "absolute", left: 18, top: 52, fontFamily: mono, fontSize: 16, lineHeight: 1.72, color: "rgba(200,180,224,0.85)" }}>
            {["▸ Plans/", "▸ Tasks/", "▸ Projects/", "📌 CURRENT FOCUS"].map((t, i) => <div key={i} style={{ opacity: over(lf, fr(0.9 + i * 0.22), fr(0.3)), color: i === 3 ? "#E6D6F6" : undefined, fontWeight: i === 3 ? 800 : 400 }}>{t}</div>)}
          </div>
          {/* live purple graph */}
          <svg viewBox="0 0 214 130" width={214} height={130} style={{ position: "absolute", right: 20, top: 54 }}>
            {[[107, 66], [46, 30], [168, 36], [40, 106], [176, 100], [107, 16]].map(([x, y], k) => <React.Fragment key={k}>
              {k > 0 && <line x1={107} y1={66} x2={x} y2={y} stroke={GRAPE} strokeWidth={2} opacity={over(lf, fr(1.1 + k * 0.16), fr(0.4)) * 0.7} />}
              <circle cx={x} cy={y} r={k === 0 ? 13 : 7} fill={k === 0 ? GRAPE : "#C9A8E8"} opacity={over(lf, fr(0.9 + k * 0.16), fr(0.3))} style={{ filter: k === 0 ? `drop-shadow(0 0 8px ${GRAPE})` : "none" }} />
            </React.Fragment>)}
          </svg>
          {/* status pill: auto-linked 41 notes */}
          <div style={{ position: "absolute", left: 18, bottom: 16, display: "inline-flex", alignItems: "center", gap: 7, padding: "6px 12px", borderRadius: 8, background: "rgba(158,118,207,0.2)", border: `1px solid ${GRAPE}`, fontFamily: mono, fontSize: 15, color: "#C9A8E8", transform: `scale(${pillIn})`, transformOrigin: "left" }}>⚡ auto-linked <b style={{ color: "#fff" }}>&nbsp;41 notes</b></div>
          {/* running totals */}
          <div style={{ position: "absolute", right: 20, bottom: 14, textAlign: "right" }}>
            <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 30, color: GRAPE, lineHeight: 1, textShadow: `0 0 16px ${GRAPE}55` }}>214<span style={{ color: "rgba(200,180,224,0.55)", fontSize: 22 }}> notes</span></div>
            <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 22, color: "#C9A8E8" }}>{links} links</div>
          </div>
        </div>
      </div>

      <SceneTitle lf={lf} a="COMMAND" b="CENTER" accent={GRAPE} size={56} />
      <LivePill lf={lf} text="OBSIDIAM · LINKED" />
      <SubLabel text="YOUR WORKSPACE ORGANIZES ITSELF" />
    </Panel>
  );
};


// ===== Night (CALLBACK-bar single-hero, workflow-authored) =====
// S7 SCHEDULE — the graveyard shift (climax; growing ✓ DONE stack is the hero motion)
// ===== Night (CALLBACK-bar single-hero, workflow-authored) =====
// S7 SCHEDULE — the graveyard shift (HERO: glowing MON→SUN cron-dial firing ✓DONE cards onto a climbing stack)
const Night: React.FC<{ lf: number }> = ({ lf }) => {
  // ---------- BEAT CLOCK (190 frames / 6.32s) ----------
  const roomIn = over(lf, 0, fr(0.5));
  const settle = over(lf, 0, fr(0.62), Easing.inOut(Easing.cubic));   // B1: warm light dies -> moonlight
  const walkIn = over(lf, fr(0.12), fr(0.9), Easing.out(Easing.cubic)); // B1: watchman tiptoes in
  const autoOn = ramp(lf, fr(0.6), fr(1.05));
  const handProg = over(lf, fr(0.9), fr(3.9));                        // B2: MON -> SUN sweep, ends 4.8s
  const handAngle = handProg * 360;
  const N = 6;
  const roll = over(lf, fr(2.6), fr(0.62), Easing.inOut(Easing.cubic)); // B3: sleeper rolls over
  const puff = over(lf, fr(2.9), fr(0.9), Easing.out(Easing.cubic));    // B3: Zzz burst
  const tagIn = over(lf, fr(4.85), fr(0.45), Easing.out(Easing.back(2.1))); // B4: $0.00 pops
  const dawn = over(lf, fr(5.2), fr(1.1), Easing.inOut(Easing.cubic));  // B5: dawn creeps
  const bloom = over(lf, fr(5.55), fr(0.75), Easing.out(Easing.cubic)); // B5: finished stack glows
  const stampIn = over(lf, fr(5.75), fr(0.5), Easing.out(Easing.back(2.2)));

  // ---------- CONTINUOUS AMBIENT ----------
  const bob = Math.sin(lf / 22) * 3;
  const moonBreath = 0.86 + 0.14 * Math.sin(lf / 27);
  const hubPulse = 0.5 + 0.5 * Math.abs(Math.sin(handProg * N * Math.PI));
  const curtain = Math.sin(lf / 34) * 2.2;
  const torchFlick = 0.72 + 0.28 * Math.abs(Math.sin(lf / 5.5 + Math.sin(lf / 2.3)));

  const CX = 600, CY = 246;

  // ---------- IMPACT ENGINE (fire / land per card) ----------
  const fireF = (k: number) => fr(1.0 + k * 0.62);
  const FLIGHT = fr(0.55);
  const landF = (k: number) => fireF(k) + FLIGHT;

  let shake = 0, flash = 0;
  for (let k = 0; k < N; k++) {
    const d = lf - landF(k);
    if (d >= 0 && d < 9) { shake += Math.sin(d * 2.3) * (1 - d / 9) * 4.2; flash = Math.max(flash, (1 - d / 5) * 0.20); }
  }
  if (flash < 0) flash = 0;
  const shx = shake, shy = shake * 0.55;

  const slotX = (k: number) => 328 + k * 3;
  const slotY = (k: number) => 632 - k * 36;

  return (
    <Panel tint="rgba(90,120,180,0.45)">
      {/* ============ BACKGROUND (z 0..8) — quiet, receding, depth via light ============ */}
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, rgba(30,44,84,${0.62 - dawn * 0.30}) 0%, rgba(20,30,58,${0.72 - dawn * 0.26}) 58%, rgba(12,18,36,0.82) 100%)`, zIndex: 0 }} />
      <RoomWall hue="rgba(110,140,205,0.05)" tile={110} />

      {/* B1 — the warm room lamp still on, dying down to moonlight */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 22% 40%, rgba(245,190,71,0.22), transparent 62%)", zIndex: 1, opacity: (1 - settle) * 0.9, pointerEvents: "none" }} />

      {/* layered receding architecture — silhouettes, very low contrast, subtle parallax */}
      <div style={{ position: "absolute", left: 150 + shx * 0.15, top: 150, width: 720, height: 250, background: "linear-gradient(180deg, rgba(20,29,54,0.55), rgba(13,19,38,0.65))", borderRadius: 12, border: "2px solid rgba(70,95,150,0.08)", zIndex: 2, opacity: roomIn * 0.8 }} />
      {[0, 1, 2, 3, 4].map((i) => (
        <div key={"col" + i} style={{ position: "absolute", left: 178 + i * 168 + shx * 0.25, top: 150, width: 26, height: 246, background: "linear-gradient(180deg, rgba(30,42,74,0.55), rgba(14,21,42,0.7))", zIndex: 2, opacity: roomIn * 0.7 }} />
      ))}
      <div style={{ position: "absolute", left: 62 + shx * 0.4, top: 96, width: 150, height: 300, borderRadius: "10px 10px 0 0", background: "linear-gradient(180deg, rgba(24,34,62,0.85), rgba(14,20,40,0.9))", border: "2px solid rgba(70,95,150,0.16)", zIndex: 3, opacity: roomIn * (1 - dawn * 0.25) }} />
      {/* moon disc inside the left window + breathing glow */}
      <div style={{ position: "absolute", left: 104, top: 138, width: 66, height: 66, borderRadius: "50%", background: "radial-gradient(circle at 38% 34%, #E9F1FF, #A9C2EC)", boxShadow: `0 0 ${26 + moonBreath * 26}px rgba(170,205,255,${0.35 * moonBreath})`, zIndex: 4, opacity: roomIn * (1 - dawn * 0.75) }} />
      {/* swaying curtains on the left window */}
      {[0, 1].map((i) => (
        <div key={"cur" + i} style={{ position: "absolute", left: i ? 168 : 64, top: 96, width: 46, height: 288, background: `linear-gradient(90deg, rgba(38,50,86,0.85), rgba(22,31,58,0.7))`, borderRadius: i ? "0 8px 4px 4px" : "8px 0 4px 4px", transformOrigin: "50% 0%", transform: `rotate(${(i ? -curtain : curtain)}deg) skewX(${(i ? curtain : -curtain) * 0.6}deg)`, zIndex: 5, opacity: roomIn * 0.9, boxShadow: "inset 0 0 22px rgba(0,0,0,0.4)" }} />
      ))}
      <div style={{ position: "absolute", left: 820 + shx * 0.3, top: 130, width: 132, height: 264, borderRadius: "8px 8px 0 0", background: "linear-gradient(180deg, rgba(22,32,58,0.8), rgba(13,19,38,0.9))", border: "2px solid rgba(70,95,150,0.13)", zIndex: 3, opacity: roomIn * (1 - dawn * 0.3) }} />
      <div style={{ position: "absolute", left: 240, top: 372, width: 540, height: 7, borderRadius: 4, background: "linear-gradient(90deg, rgba(60,84,136,0.0), rgba(60,84,136,0.30), rgba(60,84,136,0.0))", zIndex: 3, opacity: roomIn }} />

      {/* soft god-rays slanting from the left window — low contrast */}
      {[0, 1, 2].map((i) => (
        <div key={"ray" + i} style={{ position: "absolute", left: 96 + i * 54, top: 130, width: 58, height: 470, background: "linear-gradient(180deg, rgba(160,196,252,0.13), transparent 78%)", transform: `rotate(${13 + i * 2}deg)`, transformOrigin: "50% 0%", filter: "blur(7px)", zIndex: 4, opacity: roomIn * moonBreath * (1 - dawn * 0.7), pointerEvents: "none" }} />
      ))}

      {/* moon light pool spilling in from the left (breathing) */}
      <div style={{ position: "absolute", left: -110, top: 40, width: 520, height: 480, borderRadius: "50%", background: `radial-gradient(closest-side, rgba(150,185,245,${0.20 * moonBreath}), transparent 74%)`, filter: "blur(10px)", zIndex: 4, opacity: roomIn * (1 - dawn * 0.5) }} />
      {/* ambient halo behind the hero clock */}
      <div style={{ position: "absolute", left: 356, top: 34, width: 500, height: 440, borderRadius: "50%", background: `radial-gradient(closest-side, rgba(245,190,71,${0.06 + autoOn * 0.16 + hubPulse * 0.05}), transparent 72%)`, filter: "blur(14px)", zIndex: 5 }} />

      {/* B5 — dawn wash rising at the right edge */}
      {dawn > 0 && <>
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 190, background: `linear-gradient(90deg, transparent, rgba(245,190,71,${dawn * 0.30}))`, zIndex: 5 }} />
        <div style={{ position: "absolute", right: -40, top: 470 - dawn * 70, width: 210, height: 210, borderRadius: "50%", background: `radial-gradient(circle at 40% 45%, rgba(251,233,176,${dawn * 0.55}), transparent 70%)`, filter: "blur(6px)", zIndex: 5 }} />
      </>}

      {/* floor + reflections */}
      <StageFloor top={596} hue1="#18223C" hue2="#0D1428" />
      {/* B5 — dawn light CREEPING across the floor, left to right */}
      {dawn > 0 && <div style={{ position: "absolute", left: 1012 - dawn * 1080, top: 596, width: 620, height: 196, background: `linear-gradient(90deg, transparent, rgba(250,206,120,${dawn * 0.26}) 55%, rgba(255,232,170,${dawn * 0.34}))`, filter: "blur(9px)", zIndex: 7, pointerEvents: "none" }} />}
      <div style={{ position: "absolute", left: 210, top: 596, width: 470, height: 132, background: `linear-gradient(180deg, rgba(245,190,71,${0.10 + autoOn * 0.12}), transparent 78%)`, filter: "blur(12px)", zIndex: 7, pointerEvents: "none" }} />
      <div style={{ position: "absolute", left: 700, top: 596, width: 300, height: 118, background: `linear-gradient(180deg, rgba(150,185,245,${0.07 + dawn * 0.10}), transparent 76%)`, filter: "blur(12px)", zIndex: 7, pointerEvents: "none" }} />

      {/* drifting dust motes in the beam air */}
      {Array.from({ length: 18 }).map((_, i) => {
        const s = seed(i * 4.7), s2 = seed(i * 9.1);
        const x = 250 + s * 520 + Math.sin(lf / (26 + s * 20) + i) * 9;
        const y = 250 + s2 * 380 - ((lf * (0.25 + s * 0.5) * 12) % 340);
        return <div key={"dm" + i} style={{ position: "absolute", left: x, top: y < 180 ? y + 340 : y, width: 3 + s * 3, height: 3 + s * 3, borderRadius: "50%", background: "rgba(245,225,175,0.55)", opacity: (0.18 + s2 * 0.35) * (0.4 + autoOn * 0.6), boxShadow: "0 0 6px rgba(245,215,150,0.5)", zIndex: 6 }} />;
      })}

      {/* ============ HERO 1 — the BIG luminous MON→SUN cron-dial (z 24) ============ */}
      <div style={{ position: "absolute", left: 594 + shx * 0.5, top: 70, width: 10, height: 40, borderRadius: 4, background: grad("#3E4A68", "#232C40"), zIndex: 23, opacity: roomIn }} />
      <div style={{ position: "absolute", left: CX - 138 + shx, top: CY - 138 + shy, width: 276, height: 276, zIndex: 24, opacity: roomIn, transform: `scale(${(0.92 + roomIn * 0.08) * (1 + hubPulse * 0.012)}) rotate(${Math.sin(lf / 30) * 0.5}deg)` }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "radial-gradient(circle at 40% 32%, #253150, #0C1120)", border: "8px solid #54679A", boxShadow: `0 26px 54px -14px rgba(0,0,0,0.75), inset 0 0 46px rgba(0,0,0,0.65), 0 0 ${26 + hubPulse * 30 + autoOn * 18 + bloom * 22}px rgba(245,190,71,0.55), 0 0 90px rgba(90,160,222,0.28)` }}>
          {/* MON..SUN day marks — each ignites on its tick */}
          {["M", "T", "W", "T", "F", "S", "S"].map((d, k) => {
            const a = (k / 7) * Math.PI * 2 - Math.PI / 2;
            const on = handProg * 7 >= k + 0.5;
            const justOn = on && handProg * 7 < k + 1.1;
            return <div key={"d" + k} style={{ position: "absolute", left: 130 + Math.cos(a) * 98, top: 130 + Math.sin(a) * 98, transform: `translate(-50%,-50%) scale(${justOn ? 1.35 : 1})`, fontFamily: mono, fontWeight: 900, fontSize: 30, color: on ? SUN : "rgba(150,175,215,0.42)", textShadow: on ? `0 0 ${justOn ? 26 : 16}px ${SUN}` : "none" }}>{d}</div>;
          })}
          {Array.from({ length: 28 }).map((_, k) => {
            const a = (k / 28) * Math.PI * 2;
            return <div key={"tk" + k} style={{ position: "absolute", left: 130 + Math.cos(a) * 122, top: 130 + Math.sin(a) * 122, width: 3, height: k % 4 === 0 ? 14 : 7, background: "rgba(160,190,235,0.45)", transform: `translate(-50%,-50%) rotate(${(a * 180) / Math.PI + 90}deg)`, borderRadius: 2 }} />;
          })}
          {/* sweep hand + its trailing ghost (secondary motion) */}
          <div style={{ position: "absolute", left: 126, top: 42, width: 8, height: 88, borderRadius: 4, background: grad("#FBE49C", SUN), transformOrigin: "50% 100%", transform: `rotate(${handAngle - 9}deg)`, opacity: 0.22, filter: "blur(3px)" }} />
          <div style={{ position: "absolute", left: 126, top: 42, width: 8, height: 88, borderRadius: 4, background: grad("#FBE49C", SUN), transformOrigin: "50% 100%", transform: `rotate(${handAngle}deg)`, boxShadow: `0 0 22px ${SUN}` }} />
          <div style={{ position: "absolute", left: 104, top: 104, width: 52, height: 52, borderRadius: "50%", border: `3px solid ${SUN}`, opacity: hubPulse * 0.6, transform: `scale(${0.7 + hubPulse * 0.9})` }} />
          <div style={{ position: "absolute", left: 117, top: 117, width: 26, height: 26, borderRadius: "50%", background: SUN, boxShadow: `0 0 ${26 + hubPulse * 16}px ${SUN}` }} />
        </div>
        <div style={{ position: "absolute", left: "50%", top: 288, transform: "translateX(-50%)", padding: "6px 20px", borderRadius: 999, background: "rgba(12,17,30,0.92)", border: `2px solid ${SKY}`, fontFamily: mono, fontWeight: 900, fontSize: 20, letterSpacing: "0.1em", color: "#A9D2F5", whiteSpace: "nowrap", boxShadow: "0 8px 20px rgba(0,0,0,0.5)" }}>MON → SUN</div>
      </div>

      {/* B2 — ANTICIPATION: the muzzle charge-up ring at the dial mouth before each fire */}
      {Array.from({ length: N }).map((_, k) => {
        const d = lf - fireF(k);
        if (d < -8 || d > 3) return null;
        const c = d < 0 ? 1 + d / 8 : 1;
        const blast = d >= 0 ? d / 3 : 0;
        return <div key={"chg" + k} style={{ position: "absolute", left: CX - 98 - 40 + shx, top: CY - 40 + shy, width: 80, height: 80, borderRadius: "50%", border: `3px solid ${MINT}`, transform: `scale(${d < 0 ? 1.5 - c * 0.9 : 0.6 + blast * 1.9})`, opacity: d < 0 ? c * 0.75 : (1 - blast) * 0.8, zIndex: 25, boxShadow: `0 0 22px ${MINT}` }} />;
      })}

      {/* ============ HERO — the beam (z 21) ============ */}
      <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", left: 0, top: 0, zIndex: 21, pointerEvents: "none", filter: "blur(3px)" }}>
        <defs>
          <linearGradient id="nightBeam" x1="0.62" y1="0" x2="0.34" y2="1">
            <stop offset="0%" stopColor={SUN} stopOpacity={0.42} />
            <stop offset="100%" stopColor={SUN} stopOpacity={0} />
          </linearGradient>
        </defs>
        <polygon points="576,372 630,372 556,700 252,700" fill="url(#nightBeam)" opacity={0.35 + autoOn * 0.65} />
      </svg>
      <div style={{ position: "absolute", left: 262, top: 592, width: 330, height: 96, borderRadius: "50%", background: `radial-gradient(ellipse, rgba(111,211,174,${0.16 + autoOn * 0.22 + bloom * 0.26}), transparent 72%)`, filter: "blur(8px)", zIndex: 21 }} />
      <div style={{ position: "absolute", left: 300, top: 656, width: 250, height: 24, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(0,0,0,0.5), transparent 70%)", zIndex: 22 }} />

      {/* B2 — IMPACT shockwave rings at each landing slot */}
      {Array.from({ length: N }).map((_, k) => {
        const d = lf - landF(k);
        if (d < 0 || d > 14) return null;
        const p = d / 14;
        return <div key={"sw" + k} style={{ position: "absolute", left: slotX(k) + 98 - 90, top: slotY(k) + 21 - 90, width: 180, height: 180, borderRadius: "50%", border: `4px solid ${MINT}`, transform: `scale(${0.25 + p * 1.5}) scaleY(0.45)`, opacity: (1 - p) * 0.8, zIndex: 23, boxShadow: `0 0 24px ${MINT}` }} />;
      })}

      {/* ============ HERO — the climbing ✓ DONE stack (z 26) ============ */}
      <div style={{ position: "absolute", inset: 0, zIndex: 26, pointerEvents: "none", transform: `translate(${shx}px, ${shy}px)` }}>
        {Array.from({ length: N }).map((_, k) => {
          const p = over(lf, fireF(k), FLIGHT, Easing.out(Easing.cubic));
          if (p <= 0) return null;
          const sX = slotX(k), sY = slotY(k);
          const x = CX - 98 + (sX - (CX - 98)) * p;
          const baseY = CY + (sY - CY) * p - Math.sin(p * Math.PI) * 86;
          const rot = (1 - p) * 18 * (k % 2 ? 1 : -1);
          const flying = p < 1;
          // overshoot -> settle squash on landing (secondary motion)
          const d = lf - landF(k);
          const bnc = d >= 0 && d < 13 ? Math.sin((d / 13) * Math.PI * 2) * (1 - d / 13) : 0;
          const sc = (0.55 + 0.45 * p) * (1 + bnc * 0.10);
          const sy2 = 1 - bnc * 0.20;
          const y = baseY + bnc * 5 + (flying ? 0 : Math.sin(lf / 24 + k) * 0.8);
          const done = !flying;
          return (
            <div key={k} style={{ position: "absolute", left: x, top: y, width: 196, height: 42, borderRadius: 10, background: grad("#8CEDB0", "#2FA968"), border: "3px solid #1E7A46", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: mono, fontWeight: 900, fontSize: 21, letterSpacing: "0.08em", color: "#08301B", boxShadow: flying ? `0 0 34px ${MINT}, 0 12px 22px rgba(0,0,0,0.5)` : `inset 0 3px 0 rgba(255,255,255,0.3), 0 8px 16px rgba(0,0,0,0.5), 0 0 ${10 + autoOn * 10 + bloom * 26}px rgba(111,211,174,${0.35 + bloom * 0.5})`, transform: `scale(${sc}) scaleY(${sy2}) rotate(${rot}deg)`, opacity: Math.min(1, p * 3), filter: done && bloom > 0 ? `brightness(${1 + bloom * 0.18})` : "none" }}>✓ DONE</div>
          );
        })}
      </div>

      {/* B2 — white FLASH on impact (z 28) */}
      {flash > 0.005 && <div style={{ position: "absolute", inset: 0, background: "#FFFFFF", opacity: flash, zIndex: 28, pointerEvents: "none", mixBlendMode: "screen" }} />}

      {/* B5 — the finished stack's final stamp (z 27) */}
      {stampIn > 0.02 && (
        <div style={{ position: "absolute", left: 292, top: 396, transform: `rotate(-7deg) scale(${stampIn})`, transformOrigin: "50% 100%", zIndex: 27 }}>
          <div style={{ padding: "7px 18px", borderRadius: 10, background: "rgba(10,42,26,0.92)", border: `3px solid ${MINT}`, fontFamily: mono, fontWeight: 900, fontSize: 22, letterSpacing: "0.1em", color: "#BFF5DA", boxShadow: `0 0 26px rgba(111,211,174,0.6), ${NAVYSH}`, whiteSpace: "nowrap" }}>✓ ALL 7 DAYS</div>
        </div>
      )}

      {/* ============ STORYTELLER — sleeping mascot (nightcap + blanket), small, lower-left (z 20) ============ */}
      <div style={{ position: "absolute", left: 40, top: 524, width: 268, height: 200, zIndex: 20, transformOrigin: "0% 0%", transform: `scale(0.7) translateY(${(1 - roomIn) * 26}px)`, opacity: roomIn * 0.96 }}>
        <div style={{ position: "absolute", left: 18, top: 176, width: 250, height: 30, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(0,0,0,0.45), transparent 70%)" }} />
        <div style={{ position: "absolute", left: 0, top: 8, width: 46, height: 156, borderRadius: "16px 8px 8px 16px", background: grad("#3E4E78", "#242F4E"), boxShadow: "inset 3px 0 0 rgba(255,255,255,0.07)" }} />
        <div style={{ position: "absolute", left: 30, top: 104, width: 232, height: 76, borderRadius: 12, background: grad("#2F3C60", "#1D2740"), boxShadow: "0 18px 30px -10px rgba(0,0,0,0.6), inset 0 3px 0 rgba(255,255,255,0.05)" }} />
        {/* BLANKET — heaves with breath, then humps as he rolls over */}
        <div style={{ position: "absolute", left: 122, top: 88 - Math.sin(lf / 19) * 1.6 - roll * 4, width: 148, height: 66 + roll * 6, borderRadius: "18px 18px 8px 8px", background: grad("#4E659A", "#334372"), boxShadow: "inset 0 7px 0 rgba(255,255,255,0.08), inset 0 -12px 22px rgba(0,0,0,0.34)", transform: `rotate(${roll * -2.5}deg)` }} />
        <div style={{ position: "absolute", left: 44, top: 82, width: 78, height: 46, borderRadius: 15, background: grad("#C3CBDD", "#98A2BE"), boxShadow: "0 7px 14px rgba(0,0,0,0.4)", transform: `rotate(${-4 + roll * 5}deg)` }} />
        {/* HEAD + NIGHTCAP — rolls over mid-scene */}
        <div style={{ position: "absolute", left: 58, top: 54, width: 68, height: 66, zIndex: 3, transformOrigin: "50% 90%", transform: `translateX(${roll * 12}px) rotate(${roll * 16}deg)` }}>
          <div style={{ position: "absolute", left: 4, top: 20, width: 58, height: 52, borderRadius: "20px 20px 22px 22px", background: grad("#C87A56", "#9C4E2C"), boxShadow: "inset 0 -8px 14px rgba(120,50,20,0.35), 0 5px 12px rgba(0,0,0,0.4)" }} />
          <div style={{ position: "absolute", left: 18, top: 46, width: 12, height: 4, borderRadius: 3, background: "#2A1B0E" }} />
          <div style={{ position: "absolute", left: 38, top: 46, width: 12, height: 4, borderRadius: 3, background: "#2A1B0E" }} />
          <div style={{ position: "absolute", left: 2, top: 2, width: 60, height: 32, borderRadius: "30px 30px 0 0", background: grad("#4A5C90", "#30406C"), boxShadow: "inset 0 4px 0 rgba(255,255,255,0.1)" }} />
          {/* nightcap tail + pom (secondary motion: swings on the roll) */}
          <div style={{ position: "absolute", left: 46, top: -12, width: 40, height: 26, borderRadius: 20, background: grad("#5C6EA6", "#3C4C7C"), transformOrigin: "0% 50%", transform: `rotate(${20 + Math.sin(lf / 16) * 4 + roll * 22}deg)` }} />
          <div style={{ position: "absolute", left: 78, top: -10, width: 18, height: 18, borderRadius: "50%", background: grad("#DCD1B8", "#B4A78C"), transform: `translate(${roll * 10}px, ${Math.sin(lf / 16 + 1) * 3}px)` }} />
        </div>
        {/* continuous drifting z's */}
        {[0, 1, 2].map((k) => { const t = ((lf * 1.3 + k * 20) % 60) / 60; return <div key={"z" + k} style={{ position: "absolute", left: 116 + k * 16, top: 40 - t * 44, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 20 + k * 8, color: "rgba(170,195,240,0.8)", opacity: (1 - t) * 0.85, transform: `rotate(${8 - k * 3}deg)` }}>z</div>; })}
        {/* B3 — the big Zzz PUFF burst on the roll-over */}
        {puff > 0 && [0, 1, 2].map((k) => (
          <div key={"pz" + k} style={{ position: "absolute", left: 126 + k * 26 + puff * 16, top: 30 - puff * (54 + k * 14), fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 26 + k * 10, color: "rgba(200,222,255,0.95)", opacity: Math.min(1, puff * 2) * (1 - puff) * 1.6, transform: `rotate(${-10 + k * 9}deg) scale(${0.6 + puff * 0.7})`, textShadow: "0 0 14px rgba(150,190,250,0.7)" }}>Z</div>
        ))}
      </div>

      {/* ============ STORYTELLER — night-watchman Mascot (hard-hat + hi-vis vest + torch), right edge (z 20) ============ */}
      {(() => {
        const wx = 812 + (1 - walkIn) * 172;
        const tip = walkIn < 1 ? Math.abs(Math.sin(lf / 3.0)) * -7 : 0;
        return (
          <>
            {/* torch cone sweeping toward the stack — flickers continuously */}
            <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", left: 0, top: 0, zIndex: 22, pointerEvents: "none", filter: "blur(5px)", opacity: walkIn * torchFlick * (1 - dawn * 0.7) }}>
              <polygon points={`${wx + 18},${566 + bob + tip} ${wx + 30},${588 + bob + tip} ${wx - 236},${700} ${wx - 268},${648}`} fill="rgba(251,233,176,0.20)" />
            </svg>
            <div style={{ position: "absolute", left: wx - 6, top: 452, width: 210, height: 32, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(0,0,0,0.4), transparent 70%)", transform: "translateY(140px)", zIndex: 19, opacity: roomIn * walkIn }} />
            <div style={{ position: "absolute", left: wx, top: 452, width: 148, height: 148, zIndex: 20, transform: `translateY(${bob + tip}px)`, opacity: roomIn * 0.94 * Math.min(1, walkIn * 3), filter: `saturate(0.82) brightness(${0.86 + dawn * 0.2})` }}>
              <Mascot lf={lf} size={148} gaze={-2} constr={1} nodAmp={2.2} nodSpeed={7} stern={0.15} />
              {/* hi-vis VEST + TORCH overlay (mascot's 0..200 viewBox space) */}
              <svg viewBox="0 0 200 200" width={148} height={148} style={{ position: "absolute", left: 0, top: 0, overflow: "visible", pointerEvents: "none", zIndex: 2 }}>
                <path d="M72 128 L92 122 L96 190 L70 190 Z" fill="#E8F55A" opacity={0.9} stroke="#8A9A1E" strokeWidth={2} />
                <path d="M128 128 L108 122 L104 190 L130 190 Z" fill="#E8F55A" opacity={0.9} stroke="#8A9A1E" strokeWidth={2} />
                <rect x={68} y={152} width={64} height={9} fill="#EFEFEF" opacity={0.85} />
                <rect x={68} y={170} width={64} height={9} fill="#EFEFEF" opacity={0.85} />
                {/* tiny torch in the hand */}
                <g transform="translate(26,150) rotate(-24)">
                  <rect x={-4} y={-6} width={26} height={13} rx={4} fill="#2A3550" stroke="#4A5B7E" strokeWidth={2} />
                  <circle cx={24} cy={0} r={7} fill={SUN} opacity={torchFlick} style={{ filter: `drop-shadow(0 0 9px ${SUN})` }} />
                </g>
              </svg>
            </div>
            <div style={{ opacity: over(lf, fr(0.85), fr(0.35)) * (1 - over(lf, fr(2.3), fr(0.4))) * 0.9, zIndex: 27 }}><Speech x={742} y={420} text="shhh…" accent={SKY} size={20} s={0.8} /></div>
          </>
        );
      })()}

      {/* ============ THE ONE RECEIPT — small $0.00 tag at the right edge (z 25) ============ */}
      <div style={{ position: "absolute", left: 800, top: 622, transform: `rotate(${-6 + (1 - tagIn) * 9}deg) scale(${tagIn})`, transformOrigin: "50% 0%", zIndex: 25 }}>
        <div style={{ position: "relative", padding: "8px 18px", borderRadius: 12, background: "rgba(12,17,30,0.94)", border: `2px solid ${SKY}`, boxShadow: NAVYSH, textAlign: "center", overflow: "hidden" }}>
          <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 34, lineHeight: 1, color: SKY, textShadow: `0 0 18px ${SKY}55` }}>$0.00</div>
          <div style={{ fontFamily: mono, fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", color: "rgba(175,200,235,0.65)", marginTop: 4 }}>OVERTIME</div>
          <Glint lf={lf} at={fr(5.15)} dur={fr(0.5)} />
        </div>
      </div>

      {/* ---- chassis overlays ---- */}
      <SceneTitle lf={lf} a="THE NIGHT" b="SHIFT" accent={SKY} size={54} />
      <LivePill lf={lf} text="KRONOS · AUTOPILOT" />
      <SubLabel text="IT WORKS WHILE YOU SLEEP" />
    </Panel>
  );
};


// ===== Cta (CALLBACK-bar single-hero, workflow-authored) =====
const Cta: React.FC<{ lf: number }> = ({ lf }) => {
  const BX = 506, BY = 340, R = 152;

  // ---------------- BEAT CLOCK (142 frames / 4.74s) ----------------
  const cardIn = over(lf, fr(0.06), fr(0.44), Easing.out(Easing.cubic));                 // B1 board arrives
  const snap = over(lf, fr(0.22), fr(0.44), Easing.out(Easing.back(2.4)));               // B2 final piece slams home
  const IMP1 = fr(0.66);
  const ignite = over(lf, fr(0.72), fr(0.78), Easing.out(Easing.cubic));                 // B3 board ignites gold
  const badgeIn = over(lf, fr(1.95), fr(0.42), Easing.out(Easing.back(2.2)));            // B4 HERMES badge slams in
  const IMP2 = fr(2.24);
  const fly = over(lf, fr(2.75), fr(1.30), Easing.in(Easing.cubic));                     // B5 envelope at camera
  const barBadge = over(lf, fr(3.35), fr(0.34), Easing.out(Easing.back(2.6)));           // B6 badge into comment bar
  const typed = over(lf, fr(3.5), fr(0.62), Easing.inOut(Easing.cubic));                 // B6 "Hermes" types
  const press = over(lf, fr(4.45), fr(0.2), Easing.out(Easing.cubic));                   // B6 Post pressed

  // ---------------- impacts: shake + flash + shockwaves ----------------
  const hit1 = lf >= IMP1 ? Math.max(0, 1 - (lf - IMP1) / 13) : 0;
  const hit2 = lf >= IMP2 ? Math.max(0, 1 - (lf - IMP2) / 16) : 0;
  const shk = hit1 * 0.9 + hit2 * 1.5;
  const sx = Math.sin(lf * 3.3) * 8 * shk;
  const sy = Math.cos(lf * 2.45) * 6 * shk;
  const flash = Math.max(
    lf >= IMP1 ? Math.max(0, 1 - (lf - IMP1) / 6) * 0.34 : 0,
    lf >= IMP2 ? Math.max(0, 1 - (lf - IMP2) / 7) * 0.5 : 0
  );

  // ---------------- continuous ambient ----------------
  const breathe = 1 + Math.sin(lf / 11) * 0.018;                                          // hero pulse
  const flick = 0.9 + Math.abs(Math.sin(lf / 5.3)) * 0.1;                                 // light flicker
  const flap = Math.sin(lf / 3.1) * 4.2;                                                  // badge feather flap
  const eflap = Math.sin(lf / 3.0) * 24;                                                  // envelope wing flap
  const cur = (lf % 16) < 8;

  const icons = [
    { e: "🧠", c: "#E8A2B8" },
    { e: "🪙", c: "#E7B24C" },
    { e: "💎", c: "#9E76CF" },
    { e: "⏰", c: "#5AA0DE" },
  ];
  const icPos = (k: number) => { const a = (k / 4) * Math.PI * 2 - Math.PI / 2; return { a, cx: BX + Math.cos(a) * R, cy: BY + Math.sin(a) * R }; };
  const iconOn = (k: number) => over(lf, fr(0.92 + k * 0.18), fr(0.3), Easing.out(Easing.back(1.8)));

  // ---- THE HERMES BRAND MARK: solid clay circle + lighter rim + clean WHITE winged mark ----
  const wingsBadge = (size: number, glow: number, uid: string, fl: number) => (
    <svg viewBox="0 0 120 120" width={size} height={size} style={{ overflow: "visible", display: "block", filter: `drop-shadow(0 0 ${7 + glow * 34}px rgba(217,119,87,${(0.34 + glow * 0.5).toFixed(2)})) drop-shadow(0 8px 18px rgba(0,0,0,0.5))` }}>
      <defs>
        <radialGradient id={"hbg" + uid} cx="36%" cy="28%" r="80%">
          <stop offset="0%" stopColor="#F49B76" />
          <stop offset="58%" stopColor="#D97757" />
          <stop offset="100%" stopColor="#9E4C2B" />
        </radialGradient>
      </defs>
      <circle cx={60} cy={60} r={57} fill="#F3B79B" opacity={0.34 + glow * 0.3} />
      <circle cx={60} cy={60} r={52} fill={`url(#hbg${uid})`} stroke="#F6C3AA" strokeWidth={3.5} />
      <path d="M23 44 A52 52 0 0 1 79 17" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth={4} strokeLinecap="round" />
      {[-1, 1].map((dir) => (
        <g key={dir} transform={`translate(60 63) scale(${dir} 1)`}>
          {[0, 1, 2, 3].map((k) => {
            const len = 39 - k * 7.4;
            return <polygon key={k} points={`3,${-11 + k * 6} ${3 + len},${-17 + k * 6 - fl} ${3 + len * 0.56},${-3 + k * 6}`} fill={k % 2 ? "#FFFFFF" : "#FCEFE9"} stroke="rgba(255,255,255,0.9)" strokeWidth={1} strokeLinejoin="round" />;
          })}
        </g>
      ))}
      <rect x={57} y={38} width={6} height={36} rx={3} fill="#FFFFFF" />
      <circle cx={60} cy={36} r={5.5} fill="#FFFFFF" />
      <circle cx={60} cy={60} r={52} fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth={1.5} />
    </svg>
  );

  return (
    <Panel tint="rgba(231,178,76,0.45)">
      {/* ===================== BACKGROUND (z 0..8) — quiet, deep, receding ===================== */}
      <div style={{ position: "absolute", inset: 0, background: grad("#241B0E", "#0B0805"), zIndex: 0 }} />
      <RoomWall hue="rgba(231,178,76,0.04)" tile={104} />

      {/* layered receding architecture in silhouette (4 arch rings + side pillars) */}
      {[0, 1, 2, 3].map((i) => {
        const w = 760 - i * 152, h = 520 - i * 106;
        return (
          <div key={"arch" + i} style={{ position: "absolute", left: BX - w / 2 + sx * 0.12 * (3 - i), top: 96 + i * 38, width: w, height: h, borderRadius: `${w / 2}px ${w / 2}px 0 0`, border: `2px solid rgba(231,178,76,${0.05 + i * 0.018})`, background: `rgba(255,206,118,${0.012 + i * 0.011})`, zIndex: 1, pointerEvents: "none" }} />
        );
      })}
      {[0, 1].map((s) => [0, 1].map((i) => (
        <div key={"pil" + s + i} style={{ position: "absolute", left: s ? 906 - i * 64 : 42 + i * 64, top: 150 + i * 32, width: 44 - i * 12, height: 470 - i * 40, borderRadius: "8px 8px 0 0", background: `linear-gradient(90deg, rgba(255,214,132,${0.035 - i * 0.012}), rgba(0,0,0,0.0))`, border: `1.5px solid rgba(231,178,76,${0.05 - i * 0.016})`, zIndex: 1, pointerEvents: "none" }} />
      )))}

      {/* ambient glow pools */}
      <div style={{ position: "absolute", left: BX - 400, top: BY - 350, width: 800, height: 700, borderRadius: "50%", background: `radial-gradient(circle, rgba(245,190,71,${(0.13 + ignite * 0.1) * flick}), transparent 62%)`, filter: "blur(28px)", zIndex: 2, pointerEvents: "none" }} />
      <div style={{ position: "absolute", left: -100, top: 296, width: 470, height: 430, borderRadius: "50%", background: "radial-gradient(circle, rgba(217,119,87,0.10), transparent 66%)", filter: "blur(30px)", zIndex: 2, pointerEvents: "none" }} />
      <div style={{ position: "absolute", left: 700, top: 130, width: 420, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(158,118,207,0.07), transparent 68%)", filter: "blur(32px)", zIndex: 2, pointerEvents: "none" }} />

      {/* soft god-rays raking down behind the hero */}
      {[0, 1, 2, 3, 4].map((i) => (
        <div key={"gr" + i} style={{ position: "absolute", left: 150 + i * 168, top: 78, width: 66 + (i % 2) * 24, height: 470, transformOrigin: "50% 0%", transform: `rotate(${-9 + i * 4.5}deg)`, background: `linear-gradient(180deg, rgba(250,222,152,${(0.055 + ignite * 0.035) * flick}), transparent 78%)`, filter: "blur(11px)", zIndex: 3, pointerEvents: "none" }} />
      ))}

      {/* floor + rail + reflection */}
      <StageFloor top={620} hue1="#2C2110" hue2="#0E0A05" />
      <div style={{ position: "absolute", left: 0, right: 0, top: 616, height: 10, background: grad("#7A5A2E", "#3A2911"), boxShadow: "0 4px 16px rgba(0,0,0,0.55)", zIndex: 3 }} />
      <div style={{ position: "absolute", left: BX - 230, top: 622, width: 460, height: 116, background: `radial-gradient(ellipse at 50% 0%, rgba(231,178,76,${0.08 + ignite * 0.22 + badgeIn * 0.06}), transparent 72%)`, filter: "blur(11px)", zIndex: 4, pointerEvents: "none" }} />
      <div style={{ position: "absolute", left: BX - 78, top: 622, width: 156, height: 90, background: `radial-gradient(ellipse at 50% 0%, rgba(217,119,87,${badgeIn * 0.3}), transparent 70%)`, filter: "blur(9px)", zIndex: 4, pointerEvents: "none" }} />

      {/* drifting dust motes (never frozen) */}
      {Array.from({ length: 22 }).map((_, i) => {
        const s = seed(i * 5.7), s2 = seed(i * 2.3 + 9);
        const drift = ((lf * (0.16 + s * 0.24) + i * 27) % 330);
        return <div key={"mote" + i} style={{ position: "absolute", left: 90 + s * 840 + Math.sin(lf / 24 + i) * 7, top: 592 - drift + s2 * 92, width: 2 + s2 * 4, height: 2 + s2 * 4, borderRadius: "50%", background: "rgba(250,225,160,0.55)", opacity: (0.1 + s * 0.3) * Math.max(0, 1 - drift / 330) * (0.7 + ignite * 0.5), zIndex: 5, pointerEvents: "none" }} />;
      })}

      {/* one quiet spotlight onto the hero */}
      <SpotCone x={BX} topY={104} floorY={618} spread={400} hue="#F7D98C" lit={(0.3 + ignite * 0.36) * flick} />

      {/* ===================== HERO GLOW + RAYS (z 18..19) ===================== */}
      <div style={{ position: "absolute", left: BX - 330 + sx * 0.4, top: BY - 330 + sy * 0.4, width: 660, height: 660, borderRadius: "50%", background: `radial-gradient(circle, rgba(231,178,76,${(0.09 + ignite * 0.4) * flick}), transparent 60%)`, filter: "blur(16px)", zIndex: 18, pointerEvents: "none" }} />
      {ignite > 0.12 && Array.from({ length: 14 }).map((_, i) => { const a = (i / 14) * Math.PI * 2 + lf / 220; const len = 236 + Math.sin(i * 2.1 + lf / 15) * 40; return (
        <div key={"ray" + i} style={{ position: "absolute", left: BX + sx * 0.4, top: BY - 3 + sy * 0.4, width: len * ignite, height: 6, transformOrigin: "left center", transform: `rotate(${(a * 180) / Math.PI}deg)`, background: `linear-gradient(90deg, ${GOLD}, transparent)`, opacity: 0.3 * ignite * flick, zIndex: 19, filter: "blur(2px)", pointerEvents: "none" }} />); })}

      {/* ===================== HERO: THE IGNITING BOARD (z 20+) ===================== */}
      <div style={{ position: "absolute", left: BX - 232 + sx, top: BY - 232 + sy, width: 464, height: 464, borderRadius: 40, background: grad("#6B4E28", "#38290F"), border: "7px solid #8C6733", boxShadow: `0 34px 62px -20px rgba(0,0,0,0.72), inset 0 0 52px rgba(0,0,0,0.55), 0 0 ${16 + ignite * 78 * flick}px ${GOLD}aa`, zIndex: 20, transform: `translateY(${(1 - cardIn) * 22}px) scale(${(0.965 + cardIn * 0.035) * breathe})`, opacity: cardIn }}>
        <div style={{ position: "absolute", inset: 10, borderRadius: 30, background: grad("#241B0C", "#100B06"), boxShadow: "inset 0 8px 24px rgba(0,0,0,0.68)" }} />
        <div style={{ position: "absolute", inset: 10, borderRadius: 30, background: `radial-gradient(circle, rgba(247,217,140,${ignite * 0.5 * flick}), rgba(231,178,76,${ignite * 0.15}) 58%, transparent 76%)` }} />
        {[1, 2].map((n) => (<React.Fragment key={n}>
          <div style={{ position: "absolute", left: 10 + (444 / 3) * n, top: 10, bottom: 10, width: 2, background: `rgba(247,217,140,${0.09 + ignite * 0.16 * flick})` }} />
          <div style={{ position: "absolute", top: 10 + (444 / 3) * n, left: 10, right: 10, height: 2, background: `rgba(247,217,140,${0.09 + ignite * 0.16 * flick})` }} />
        </React.Fragment>))}
        <div style={{ position: "absolute", inset: 0, borderRadius: 40, background: "linear-gradient(152deg, rgba(255,255,255,0.14), transparent 42%)", pointerEvents: "none" }} />
      </div>

      {/* connector threads: crest → each slot (light in sequence) */}
      {icons.map((ic, k) => { const p = icPos(k); const on = iconOn(k); return (
        <div key={"ln" + k} style={{ position: "absolute", left: BX + sx, top: BY - 3 + sy, width: R * Math.max(snap, 0.18), height: 6, transformOrigin: "left center", transform: `rotate(${(p.a * 180) / Math.PI}deg)`, background: `linear-gradient(90deg, ${on > 0.4 ? GOLD : "rgba(247,217,140,0.22)"}, ${on > 0.4 ? "#F6E4A0" : "rgba(247,217,140,0.08)"})`, borderRadius: 999, boxShadow: on > 0.5 ? `0 0 ${12 + on * 8 * flick}px ${GOLD}` : "none", opacity: 0.3 + on * 0.7, zIndex: 21 }} />); })}
      {/* energy pips crawling the threads once lit */}
      {icons.map((ic, k) => { const p = icPos(k); const on = iconOn(k); if (on < 0.5) return null; const t = ((lf / 26) + k * 0.25) % 1; return (
        <div key={"pip" + k} style={{ position: "absolute", left: BX + (p.cx - BX) * t - 5 + sx, top: BY + (p.cy - BY) * t - 5 + sy, width: 10, height: 10, borderRadius: "50%", background: "#FFF6DA", boxShadow: `0 0 12px ${GOLD}`, opacity: 0.85 * on, zIndex: 21 }} />); })}

      {/* four module-icon tiles (sequential light-up, each with a pop) */}
      {icons.map((ic, k) => { const p = icPos(k); const on = iconOn(k); const lit = on > 0.5; const pop = k === 0 ? snap : Math.min(1, cardIn * 1.15); const kick = lit ? 1 + Math.max(0, 1 - (lf - fr(0.92 + k * 0.18) - fr(0.3)) / 9) * 0.1 : 1; return (
        <div key={"tile" + k} style={{ position: "absolute", left: p.cx - 48 + sx, top: p.cy - 48 + sy, width: 96, height: 96, borderRadius: 20, background: lit ? grad("#FFFBF1", "#F4E9CC") : grad("#2A2418", "#181205"), border: `4px solid ${lit ? GOLD : "#463A20"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 50, transform: `scale(${pop * kick}) translateY(${Math.sin(lf / 13 + k * 1.7) * 2.2}px)`, boxShadow: lit ? `0 0 ${24 + flick * 12}px ${ic.c}cc, 0 12px 24px rgba(0,0,0,0.45)` : "0 8px 18px rgba(0,0,0,0.55)", zIndex: 22 }}>
          <span style={{ filter: lit ? "none" : "grayscale(0.85) brightness(0.5)" }}>{ic.e}</span>
          <div style={{ position: "absolute", inset: 0, borderRadius: 16, background: "linear-gradient(150deg, rgba(255,255,255,0.28), transparent 46%)" }} />
        </div>); })}
      {/* per-icon light-up shockwave */}
      {icons.map((ic, k) => { const p = icPos(k); const at = fr(0.92 + k * 0.18) + fr(0.3); const r = lf >= at ? Math.max(0, 1 - (lf - at) / 11) : 0; return r > 0 ? (
        <div key={"iw" + k} style={{ position: "absolute", left: p.cx + sx, top: p.cy + sy, width: 20, height: 20, marginLeft: -10, marginTop: -10, borderRadius: "50%", border: `4px solid ${ic.c}`, transform: `scale(${1 + (1 - r) * 6})`, opacity: r * 0.8, zIndex: 23, pointerEvents: "none" }} />) : null; })}

      {/* ===================== the EMPTY CREST SOCKET → HERMES BADGE SLAM (z 23..27) ===================== */}
      {badgeIn < 0.02 && (
        <div style={{ position: "absolute", left: BX - 74 + sx, top: BY - 74 + sy, width: 148, height: 148, borderRadius: "50%", border: `4px dashed rgba(247,217,140,${0.18 + ignite * 0.3})`, background: "radial-gradient(circle, rgba(0,0,0,0.55), transparent 72%)", zIndex: 23, transform: `scale(${breathe})`, opacity: cardIn, pointerEvents: "none" }} />
      )}
      {badgeIn > 0.02 && (
        <div style={{ position: "absolute", left: BX - 78 + sx, top: BY - 78 + sy, width: 156, height: 156, zIndex: 26, transform: `scale(${(0.2 + badgeIn * 0.8) * breathe}) rotate(${(1 - badgeIn) * -22}deg)`, transformOrigin: "50% 50%", opacity: fly > 0.2 ? Math.max(0.24, 1 - fly * 1.3) : 1 }}>
          {wingsBadge(156, 0.4 + ignite * 0.6, "big", flap)}
        </div>
      )}
      {/* badge slam shockwaves (clay + gold) */}
      {hit2 > 0 && (<React.Fragment>
        <div style={{ position: "absolute", left: BX + sx, top: BY + sy, width: 24, height: 24, marginLeft: -12, marginTop: -12, borderRadius: "50%", border: `8px solid ${CLAY}`, transform: `scale(${1 + (1 - hit2) * 22})`, opacity: hit2 * 0.9, zIndex: 27, pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: BX + sx, top: BY + sy, width: 24, height: 24, marginLeft: -12, marginTop: -12, borderRadius: "50%", border: `4px solid ${GOLD}`, transform: `scale(${1 + (1 - hit2) * 33})`, opacity: hit2 * 0.55, zIndex: 27, pointerEvents: "none" }} />
      </React.Fragment>)}
      {/* badge slam sparks */}
      {hit2 > 0.05 && Array.from({ length: 12 }).map((_, i) => { const a = (i / 12) * Math.PI * 2; const d = (1 - hit2) * 190; return (
        <div key={"sp2" + i} style={{ position: "absolute", left: BX + Math.cos(a) * d - 3 + sx, top: BY + Math.sin(a) * d - 3 + sy, width: 6, height: 6, borderRadius: "50%", background: i % 2 ? "#FFF3D6" : CLAY, boxShadow: `0 0 10px ${GOLD}`, opacity: hit2, zIndex: 27, pointerEvents: "none" }} />); })}

      {/* ===================== the FINAL winged puzzle piece snapping into the top slot ===================== */}
      {snap < 0.995 && (() => { const p = icPos(0); return (
        <div style={{ position: "absolute", left: p.cx - 50, top: (p.cy - 50) - (1 - snap) * 150, zIndex: 28, transform: `scale(${1.16 - snap * 0.16}) rotate(${(1 - snap) * -12}deg)`, filter: `drop-shadow(0 ${20 * (1 - snap) + 4}px ${22 * (1 - snap) + 6}px rgba(0,0,0,0.6))` }}>
          {/* trailing streak (secondary motion) */}
          <div style={{ position: "absolute", left: 40, top: -70 * (1 - snap), width: 18, height: 90 * (1 - snap), borderRadius: 9, background: `linear-gradient(180deg, transparent, ${GOLD}66)`, filter: "blur(3px)", opacity: 1 - snap }} />
          <div style={{ width: 100, height: 100, borderRadius: 20, background: grad("#F0B49B", "#D97757"), border: "4px solid #A65B3E", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48, position: "relative", boxShadow: `0 0 ${snap * 26}px ${GOLD}88` }}>
            🧩
            <div style={{ position: "absolute", left: 38, bottom: -14, width: 26, height: 26, borderRadius: "50%", background: grad("#F0B49B", "#D97757"), border: "4px solid #A65B3E", borderTop: "none" }} />
          </div>
        </div>); })()}
      {/* snap impact ring + sparks */}
      {hit1 > 0 && (() => { const p = icPos(0); return (<React.Fragment>
        <div style={{ position: "absolute", left: p.cx + sx, top: p.cy + sy, width: 16, height: 16, marginLeft: -8, marginTop: -8, borderRadius: "50%", border: `6px solid ${GOLD}`, transform: `scale(${1 + (1 - hit1) * 20})`, opacity: hit1, zIndex: 29, pointerEvents: "none" }} />
        {Array.from({ length: 8 }).map((_, i) => { const a = (i / 8) * Math.PI * 2; const d = (1 - hit1) * 120; return (
          <div key={"sp1" + i} style={{ position: "absolute", left: p.cx + Math.cos(a) * d - 3 + sx, top: p.cy + Math.sin(a) * d - 3 + sy, width: 6, height: 6, borderRadius: "50%", background: "#FFF3D6", boxShadow: `0 0 8px ${GOLD}`, opacity: hit1, zIndex: 29, pointerEvents: "none" }} />); })}
      </React.Fragment>); })()}

      {/* ===================== HERO PART 2: the winged ENVELOPE launching at camera ===================== */}
      {fly > 0.02 && fly < 0.995 && (
        <div style={{ position: "absolute", left: interpolate(fly, [0, 1], [BX - 72, 424]), top: interpolate(fly, [0, 1], [BY - 50, 386]), zIndex: 34, transform: `scale(${0.4 + fly * 1.9}) rotate(${Math.sin(lf / 6) * 3.5}deg)`, transformOrigin: "50% 50%" }}>
          {/* speed lines behind it */}
          {[0, 1, 2, 3].map((i) => (
            <div key={"sl" + i} style={{ position: "absolute", left: -80 + i * 74, top: -66 - i * 4, width: 5, height: 60 + fly * 90, borderRadius: 3, background: `linear-gradient(180deg, transparent, rgba(255,240,200,${0.36 * fly}))`, filter: "blur(1.5px)" }} />
          ))}
          {[0, 1].map((s) => (
            <svg key={s} width={70} height={50} viewBox="0 0 70 50" style={{ position: "absolute", left: s ? 96 : -50, top: 14, transform: `scaleX(${s ? -1 : 1}) rotate(${(s ? 1 : -1) * -eflap}deg)`, transformOrigin: s ? "0% 60%" : "100% 60%", filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.45))" }}>
              <polygon points="66,28 6,4 26,24" fill="#FFFFFF" stroke="#C9A24A" strokeWidth={2} />
              <polygon points="66,30 2,22 28,34" fill="#F6EEDC" stroke="#C9A24A" strokeWidth={2} />
              <polygon points="66,32 12,40 30,42" fill="#EADCB6" stroke="#C9A24A" strokeWidth={2} />
            </svg>))}
          <div style={{ width: 144, height: 100, borderRadius: 12, background: grad("#FFFDF8", "#F0E6CE"), border: "3px solid #C9A24A", position: "relative", boxShadow: `0 20px 40px -10px rgba(0,0,0,0.62), 0 0 ${26 + ignite * 36}px ${GOLD}aa` }}>
            <div style={{ position: "absolute", inset: 0, clipPath: "polygon(0 0, 50% 56%, 100% 0)", background: grad("#EAD9B0", "#D8C596"), borderRadius: "12px 12px 0 0" }} />
            {/* the envelope CARRIES the Hermes crest as its seal */}
            <div style={{ position: "absolute", left: "50%", top: "56%", transform: "translate(-50%,-42%)", zIndex: 2 }}>
              {wingsBadge(46, 0.5, "env", flap)}
            </div>
          </div>
        </div>)}

      {/* ===================== STORYTELLER: small costumed courier mascot, low-left ===================== */}
      <div style={{ position: "absolute", left: 34, top: 468, width: 208, height: 208, transformOrigin: "0% 0%", transform: `scale(0.74) translateY(${(1 - cardIn) * 26 + Math.sin(lf / 15) * 2.6}px)`, opacity: cardIn, zIndex: 24 }}>
        <Mascot lf={lf} size={208} nodAmp={1.1} nodSpeed={11} gaze={3} cheer={Math.max(ignite * 0.5, badgeIn)} />
        {/* winged courier helmet (costume overlay) */}
        <div style={{ position: "absolute", left: 46, top: 20, width: 116, height: 54, borderRadius: "58px 58px 8px 8px", background: grad("#F6E4A0", "#C99A3A"), border: "3px solid #B9871F", boxShadow: "inset 0 6px 10px rgba(255,255,255,0.5), 0 6px 14px rgba(0,0,0,0.4)", zIndex: 2 }}>
          <div style={{ position: "absolute", left: 44, top: -14, width: 26, height: 18, borderRadius: "8px 8px 0 0", background: grad("#F6E4A0", "#C99A3A"), border: "3px solid #B9871F", borderBottom: "none" }} />
        </div>
        <div style={{ position: "absolute", left: 40, top: 60, width: 128, height: 13, borderRadius: 6, background: grad("#E7B24C", "#9E7420"), zIndex: 2, boxShadow: "0 2px 5px rgba(0,0,0,0.4)" }} />
        {[0, 1].map((s) => (
          <svg key={s} width={58} height={40} viewBox="0 0 58 40" style={{ position: "absolute", left: s ? 150 : 4, top: 44, zIndex: 2, transform: `${s ? "scaleX(-1) " : ""}rotate(${(s ? 1 : -1) * -flap * 0.7}deg)`, transformOrigin: s ? "0% 60%" : "100% 60%", filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.35))" }}>
            <polygon points="56,22 4,3 22,20" fill="#FFFFFF" stroke="#B9871F" strokeWidth={1.5} />
            <polygon points="56,24 2,18 24,28" fill="#F6E4A0" stroke="#B9871F" strokeWidth={1.5} />
            <polygon points="56,26 10,32 28,32" fill="#E7B24C" stroke="#B9871F" strokeWidth={1.5} />
          </svg>))}
        {/* courier mail satchel with the clay Hermes disc */}
        <div style={{ position: "absolute", left: 118, top: 128, width: 62, height: 48, borderRadius: 9, background: grad("#8A5C33", "#523venture".slice(0, 7)), border: "3px solid #6A431F", zIndex: 3, boxShadow: "0 5px 12px rgba(0,0,0,0.45)", transform: `rotate(${Math.sin(lf / 15) * 2}deg)` }}>
          <div style={{ position: "absolute", left: 20, top: 10, width: 22, height: 22, borderRadius: "50%", background: grad("#F29B78", "#B0592F"), border: "2px solid #F6C3AA" }} />
        </div>
        <div style={{ position: "absolute", left: 56, top: 108, width: 106, height: 10, borderRadius: 5, background: grad("#6A431F", "#3E2712"), transform: "rotate(20deg)", zIndex: 2 }} />
      </div>
      <div style={{ position: "absolute", left: 44, top: 610, width: 168, height: 22, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(0,0,0,0.48), transparent 70%)", zIndex: 6, opacity: cardIn }} />

      {/* leftover piece on the floor — hops on the badge slam (small gag) */}
      <div style={{ position: "absolute", left: 866, top: 634 - hit2 * 26, width: 52, height: 52, borderRadius: 12, background: grad("#3A2E1B", "#221909"), border: "3px solid #55431F", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, transform: `rotate(${-11 + hit2 * 26}deg)`, boxShadow: "0 8px 16px rgba(0,0,0,0.5)", zIndex: 20, opacity: 0.85 * cardIn }}>
        <span style={{ filter: "grayscale(0.6) brightness(0.8)" }}>🧩</span>
      </div>

      {/* ===================== THE ONE RECEIPT: badge + "Hermes" + Post composer bar ===================== */}
      <div style={{ position: "absolute", left: 274, top: 658, width: 464, height: 68, borderRadius: 18, background: grad("#211B14", "#120E08"), border: `2px solid ${GOLD}66`, display: "flex", alignItems: "center", padding: "0 12px", gap: 11, boxShadow: `${NAVYSH}, 0 0 ${10 + ignite * 18 + press * 26}px ${GOLD}44`, zIndex: 30, transform: `scale(${Math.max(0.85, over(lf, fr(0.08), fr(0.34), Easing.out(Easing.back(1.5))))})`, transformOrigin: "50% 50%" }}>
        {/* the HERMES BRAND MARK, immediately LEFT of the word */}
        <div style={{ width: 46, height: 46, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${0.15 + barBadge * 0.85}) rotate(${(1 - barBadge) * -30}deg)` }}>
          {wingsBadge(46, 0.3 + barBadge * 0.5, "bar", flap)}
        </div>
        <div style={{ flex: 1, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 28, color: "#F4EEE2", letterSpacing: 0.2 }}>
          {"Hermes".slice(0, Math.round(typed * 6))}<span style={{ color: GOLD, opacity: typed >= 1 ? (cur ? 1 : 0) : 1 }}>|</span>
        </div>
        <div style={{ padding: "10px 24px", borderRadius: 999, background: grad(META, METALO), fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 23, color: "#fff", boxShadow: `0 0 ${12 + Math.abs(Math.sin(lf / 7)) * 12 + typed * 10}px rgba(8,102,255,0.75)`, transform: `scale(${(1 + Math.sin(lf / 7) * 0.04 + typed * 0.05) * (1 - press * 0.1)})` }}>Post</div>
      </div>
      {/* Post PRESSED pulse ring — the last beat */}
      {press > 0.02 && (
        <div style={{ position: "absolute", left: 668, top: 692, width: 22, height: 22, marginLeft: -11, marginTop: -11, borderRadius: "50%", border: "5px solid rgba(8,102,255,0.9)", transform: `scale(${1 + press * 7})`, opacity: 1 - press, zIndex: 31, pointerEvents: "none" }} />
      )}

      {/* white impact flashes */}
      {flash > 0.01 && <div style={{ position: "absolute", inset: 0, background: "#FFF6E2", opacity: flash, zIndex: 40, pointerEvents: "none", mixBlendMode: "screen" }} />}

      {/* shimmer sweeps: board ignition + the badge landing */}
      <Glint lf={lf} at={1.75} dur={0.5} />
      <Glint lf={lf} at={2.35} dur={0.55} />

      <SceneTitle lf={lf} a="COMMENT" b="HERMES" accent={GOLD} size={56} />
      <LivePill lf={lf} text="INSTAGLAM · LIVE" />
      <SubLabel text="FULL BUILD → AUTO-DM'D TO YOU" />
    </Panel>
  );
};

// ================================ overlays ================================
const HeroHeader: React.FC<{ f: number }> = ({ f }) => {
  const settle = over(f, 0, fr(0.45), Easing.out(Easing.cubic));
  const out = 1 - over(f, fr(L[1] - 0.3), fr(0.3));
  if (out <= 0.02) return null;
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 330, display: "flex", justifyContent: "center", zIndex: 200, opacity: out, transform: `translateY(${(1 - settle) * -14}px)` }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "16px 30px", borderRadius: 999, background: "#FFFFFF", border: "3px solid #E7E2D6", boxShadow: "0 18px 44px -12px rgba(20,26,45,0.4)", maxWidth: 950 }}>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 44, letterSpacing: -0.5, color: INK, textAlign: "center" }}>Your AI is a <span style={{ color: CLAY }}>goldfish</span> 🐟</span>
      </div>
    </div>
  );
};

const ProgressBar: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const VIRT = CUT;
  const p = Math.min(1, t / VIRT);
  const marks = [9.42, 25.03, 38.63];
  const STARS = [2.75, 16.93, 31.33, 44.95];
  const TOTAL = VIRT;
  const PELLETS = [6, 10, 15, 21, 28, 35, 42, 47];
  const score = PELLETS.filter((pt) => t >= pt).length + marks.filter((m) => t >= m).length * 3 + STARS.filter((m) => t >= m).length * 2;
  const incTimes = [...PELLETS, ...marks, ...STARS].filter((x) => t >= x);
  const lastInc = incTimes.length ? Math.max(...incTimes) : -9;
  const incPop = Math.max(0, 1 - (t - lastInc) * 3);
  const allItems = [...PELLETS, ...marks, ...STARS];
  const eaten = allItems.filter((x) => t >= x).length;
  return (
    <div style={{ position: "absolute", left: 46, right: 46, top: 258, height: 60, zIndex: 120 }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 20, height: 22, background: "rgba(58,92,132,0.22)", borderRadius: 999, boxShadow: "inset 0 1px 3px rgba(0,0,0,0.15)" }} />
      <div style={{ position: "absolute", left: 0, top: 20, height: 22, width: `${p * 100}%`, background: grad("#E08A66", "#C5603C"), borderRadius: 999, boxShadow: "0 3px 12px rgba(210,114,78,0.6)" }} />
      {PELLETS.map((pt, i) => {
        const np = pt / TOTAL;
        const de = t - pt;
        if (de > 0.55 || np > 1) return null;
        return (
          <div key={`pl${i}`} style={{ position: "absolute", left: `${np * 100}%`, top: 31, transform: "translate(-50%, -50%)" }}>
            {de < 0 && <div style={{ width: 13, height: 13, borderRadius: "50%", background: GOLD, border: "2px solid #F6E4A0", boxShadow: `0 0 9px ${GOLD}`, opacity: 0.9, transform: `scale(${1 + Math.sin(f / 7 + i * 2) * 0.16})` }} />}
            {de >= 0 && <>
              <div style={{ position: "absolute", left: -7, top: -7, width: 14, height: 14, borderRadius: "50%", border: `3px solid ${GOLD}`, transform: `scale(${1 + de * 7})`, opacity: Math.max(0, 1 - de * 2.1) }} />
              <div style={{ position: "absolute", left: -3, top: -3, width: 6, height: 6, borderRadius: "50%", background: "#F6E4A0", transform: `scale(${Math.max(0, 1 - de * 2.5)})`, opacity: Math.max(0, 1 - de * 2) }} />
            </>}
          </div>); })}
      {STARS.map((m, i) => {
        if (m / TOTAL > 1.02) return null;
        const np = Math.min(1, m / TOTAL); const passed = t >= m; const dt = passed ? t - m : 0;
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
      {/* reward gift wakes as the CTA nears */}
      {(() => {
        const wake = interpolate(t, [42.0, 44.95], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const opened = t >= 45.2; const od = Math.max(0, t - 45.2);
        const rattle = wake * Math.sin(t * 26) * 4;
        return (
          <div style={{ position: "absolute", right: -24, top: -22, width: 96, height: 96, transform: `translate(${rattle}px, ${Math.sin(t * 2.4) * 3 - wake * 3}px) rotate(${rattle * 0.6}deg)`, zIndex: 131 }}>
            <div style={{ position: "absolute", inset: 10, borderRadius: "50%", background: `radial-gradient(circle, ${GOLD}${wake > 0.3 ? "88" : "44"}, transparent 66%)`, filter: "blur(3px)", boxShadow: `0 0 ${14 + wake * 26}px ${GOLD}${wake > 0.3 ? "aa" : "66"}` }} />
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 58, lineHeight: 1, filter: `grayscale(${0.6 - wake * 0.6}) brightness(${0.85 + wake * 0.35})`, opacity: 0.6 + wake * 0.4, transform: `scale(${opened ? 1.06 + Math.min(od, 0.3) * 0.4 : 0.84 + wake * 0.2})` }}>{opened ? "📜" : "🎁"}</div>
            {opened && od < 0.9 && Array.from({ length: 10 }).map((_, k) => { const a = (k / 10) * Math.PI * 2 + seed(k); const d = Math.pow(Math.min(1, od / 0.9), 0.6) * (34 + seed(k * 2) * 30); return <div key={`op${k}`} style={{ position: "absolute", left: 48 + Math.cos(a) * d - 4, top: 48 + Math.sin(a) * d - 4, width: 8, height: 8, borderRadius: "50%", background: [GOLD, CLAY, "#F3E3A6", GREEN][k % 4], opacity: Math.max(0, 1 - od * 1.2), boxShadow: `0 0 9px ${GOLD}` }} />; })}
            {opened && <div style={{ position: "absolute", left: "50%", top: 88, transform: "translateX(-50%)", padding: "2px 10px", borderRadius: 999, background: grad("#F0CB63", "#D39A2A"), border: "2px solid #F6E4A0", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 15, color: "#3a2a05", whiteSpace: "nowrap" }}>the guide!</div>}
            {wake > 0.15 && Array.from({ length: 5 }).map((_, k) => {
              const a = (k / 5) * Math.PI * 2 + t * 1.5;
              const rr = 30 + Math.sin(t * 4 + k) * 6;
              return <div key={k} style={{ position: "absolute", left: 48 + Math.cos(a) * rr, top: 48 + Math.sin(a) * rr, width: 7, height: 7, marginLeft: -3.5, marginTop: -3.5, borderRadius: "50%", background: "#F6E4A0", opacity: wake * (0.5 + 0.5 * Math.sin(t * 6 + k * 2)), boxShadow: `0 0 8px ${GOLD}` }} />;
            })}
          </div>
        );
      })()}
      {(() => {
        const cs = 24 + Math.min(1, eaten / 15) * 44;
        const cc: any = {};
        if (eaten >= 4) cc.glasses = 1;
        if (eaten >= 9) { cc.cop = 1; cc.glasses = 0; }
        if (eaten >= 13) cc.beard = 1;
        const cpop = Math.max(0, 1 - (t - lastInc) * 4) * 0.2;
        return (
          <div style={{ position: "absolute", left: `${Math.min(p, 0.9) * 100}%`, top: -6 - cs, transform: `translateX(-50%) scale(${1 + cpop})`, zIndex: 127, filter: `drop-shadow(0 0 8px ${GOLD}99)` }}>
            <Mascot lf={f} size={cs} nodAmp={3} nodSpeed={6} cheer={0.35} gaze={2} {...cc} />
          </div>
        );
      })()}
      {(() => { const cheerV = Math.max(t >= L[8] ? 1 : 0, incPop * 0.75); return (
        <div style={{ position: "absolute", left: `${Math.min(p, 0.9) * 100}%`, top: -10, transform: "translateX(-50%)", zIndex: 126 }}>
          <div style={{ position: "absolute", inset: -6, borderRadius: "50%", background: "#FBF8F1", border: `5px solid ${GREEN}`, boxShadow: incPop > 0.05 ? `0 0 ${14 + incPop * 16}px ${GOLD}` : `0 0 10px ${GREEN}66, 0 5px 14px rgba(26,24,19,0.4)` }} />
          <div style={{ position: "relative" }}><Mascot lf={f} size={66} nodAmp={2.2 + incPop * 2.4} nodSpeed={6.5} cheer={cheerV} gaze={2} /></div>
          <div style={{ position: "absolute", left: "50%", top: 64, transform: `translateX(-50%) scale(${1 + incPop * 0.38})`, padding: "3px 12px", borderRadius: 999, background: grad("#F0CB63", "#D39A2A"), border: "2px solid #F6E4A0", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 20, color: "#3a2a05", whiteSpace: "nowrap", boxShadow: incPop > 0.05 ? `0 0 12px ${GOLD}` : "0 3px 8px rgba(26,24,19,0.3)" }}>{"★ " + score}</div>
        </div>); })()}
      {[...marks, ...STARS.filter((s) => s <= TOTAL)].map((m, i) => {
        const dt = t >= m ? t - m : 99;
        if (dt > 0.85) return null;
        const np = Math.min(1, m / TOTAL);
        return (
          <div key={`cel${i}`} style={{ position: "absolute", left: `${np * 100}%`, top: 2, transform: "translateX(-50%)", width: 56, height: 56, zIndex: 129, pointerEvents: "none" }}>
            {dt < 0.65 && <div style={{ position: "absolute", left: 28, top: 28, width: 14, height: 14, marginLeft: -7, marginTop: -7, borderRadius: "50%", border: `4px solid ${GREEN}`, transform: `scale(${1 + dt * 13})`, opacity: Math.max(0, 1 - dt * 1.7) }} />}
            {Array.from({ length: 12 }, (_, k) => { const a = (k / 12) * Math.PI * 2 + seed(k + i * 3); const d = Math.pow(Math.min(1, dt / 0.8), 0.55) * (46 + seed(k * 2 + i) * 36); const o = Math.max(0, 1 - dt * 1.5); const c = [GOLD, CLAY, "#F3E3A6", GREEN][k % 4]; return <div key={k} style={{ position: "absolute", left: 28 + Math.cos(a) * d, top: 28 + Math.sin(a) * d + dt * dt * 26, width: 8, height: 8, borderRadius: "50%", background: c, opacity: o, boxShadow: `0 0 9px ${c}` }} />; })}
          </div>); })}
    </div>
  );
};

// ================================ MAIN ================================
export const ClaudeHermesReel: React.FC = () => {
  const frame = useCurrentFrame();
  let punch = 0;
  for (const b of Lf.slice(1)) { const d = frame - b; if (d >= 0 && d < 9) punch = Math.max(punch, Math.pow(1 - d / 9, 2)); }
  const KICKS = [0.8, L[1] + 3.5, L[1] + 7.48, L[2] + 3.6, L[2] + 7.2, L[3] + 2.6, L[4] + 4.2, L[5] + 2.9, CUT - 2.6, CUT - 1.4];
  for (const k of KICKS) { const d = frame - fr(k); if (d >= 0 && d < 7) punch = Math.max(punch, Math.pow(1 - d / 7, 2) * 0.7); }
  const zoom = interpolate(frame, [0, 16, 28], [1.0, 1.02, 1.0], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) }) + punch * 0.028;
  const scene = (i: number) => frame >= Lf[i] && (i === Lf.length - 1 || frame < Lf[i + 1]);
  return (
    <AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
      <Audio src={staticFile("hermes_vo.wav")} />
      <Audio loop src={staticFile("breathing_bed.mp3")} volume={(ff) => interpolate(ff, [0, fr(0.25), fr(CUT) - 6, fr(CUT), 99999], [0.12, 0.17, 0.17, 0.05, 0.05], { extrapolateRight: "clamp" })} />
      {/* ==== SFX — Hermes sound design v2: beat-locked, layered ==== */}
      {/* transitions: riser into each cut + shutter + whoosh */}
      {[L[1], L[2], L[3], L[4], L[5], L[6], L[7], L[8]].map((tt, i) => <React.Fragment key={`tr${i}`}><Sfx at={tt - 1.3} src="lib_riser.wav" v={0.36} dur={1.3} /><Sfx at={tt} src="lib_camera_shutter.wav" v={0.34} dur={0.4} /><Sfx at={tt + 0.02} src="lib_whoosh.wav" v={0.26} dur={0.5} /></React.Fragment>)}

      {/* ---- S0 HOOK: living mind → executed ---- */}
      <Sfx at={0} src="lib_deep_whoosh.wav" v={0.6} dur={0.9} />
      <Sfx at={0} src="digital-loading.wav" v={0.2} dur={0.75} />
      {[0.12, 0.3, 0.5].map((d, i) => <Sfx key={`hb${i}`} at={d} src={`blip${i + 1}.wav`} v={0.2} dur={0.25} />)}
      <Sfx at={0.72} src="thock.wav" v={0.5} dur={0.4} />
      <Sfx at={0.72} src="lib_cinematic_hit.wav" v={0.46} dur={0.9} />
      <Sfx at={0.74} src="crash.wav" v={0.4} dur={0.7} />
      {[0.82, 0.94, 1.06].map((d, i) => <Sfx key={`sn${i}`} at={d} src="snap.wav" v={0.3} dur={0.3} />)}
      <Sfx at={0.9} src="twang.wav" v={0.26} dur={0.5} />
      <Sfx at={1.15} src="swooshdn.wav" v={0.38} dur={0.5} />
      <Sfx at={1.4} src="lib_boom.wav" v={0.5} dur={1.1} />
      <Sfx at={1.42} src="impact.wav" v={0.34} dur={0.5} />
      <Sfx at={1.75} src="pop.wav" v={0.26} dur={0.3} />
      <Sfx at={2.25} src="thock.wav" v={0.24} dur={0.3} />

      {/* ---- GROUNDHOG (now scene 1): alarm → bolt → coins burn + die → sad register ---- */}
      <Sfx at={L[1]} src="alarm.wav" v={0.42} dur={1.3} />
      <Sfx at={L[1] + 0.18} src="thock.wav" v={0.34} dur={0.3} />
      <Sfx at={L[1] + 0.5} src="c_jump.wav" v={0.28} dur={0.4} />
      <Sfx at={L[1] + 1.2} src="twang.wav" v={0.26} dur={0.5} />
      <Sfx at={L[1] + 2.0} src="crash.wav" v={0.3} dur={0.8} />
      <Sfx at={L[1] + 2.05} src="lib_whoosh.wav" v={0.28} dur={0.6} />
      {[2.5, 3.05, 3.6].map((d, i) => <Sfx key={`die${i}`} at={L[1] + d} src="chimelo.wav" v={0.24} dur={0.6} />)}
      <Sfx at={L[1] + 3.2} src="screech.wav" v={0.14} dur={0.4} />
      <Sfx at={L[1] + 4.2} src="cash-register.mp3" v={0.22} dur={0.9} />
      <Sfx at={L[1] + 5.6} src="thock.wav" v={0.3} dur={0.3} />

      {/* ---- REAL MEMORY (now scene 2): slam → level-up → shards → hologram → locked ---- */}
      <Sfx at={L[2] + 0.26} src="lib_whoosh_fast.wav" v={0.34} dur={0.5} />
      <Sfx at={L[2] + 0.92} src="c_stomp.wav" v={0.44} dur={0.4} />
      <Sfx at={L[2] + 0.92} src="thock.wav" v={0.42} dur={0.4} />
      <Sfx at={L[2] + 0.94} src="lib_cinematic_hit.wav" v={0.36} dur={0.8} />
      <Sfx at={L[2] + 0.99} src="c_powerbig.wav" v={0.4} dur={1.1} />
      <Sfx at={L[2] + 1.19} src="c_1up.wav" v={0.42} dur={1.0} />
      {[1.36, 1.51, 1.66, 1.81, 1.95, 2.1].map((d, i) => <Sfx key={`sl${i}`} at={L[2] + d} src="c_coin.wav" v={0.19} dur={0.28} />)}
      {[2.51, 2.91, 3.32, 3.69].map((d, i) => <React.Fragment key={`sh${i}`}><Sfx at={L[2] + d} src="lib_whoosh_fast.wav" v={0.24} dur={0.35} /><Sfx at={L[2] + d + 0.12} src={`blip${(i % 4) + 1}.wav`} v={0.2} dur={0.25} /></React.Fragment>)}
      <Sfx at={L[2] + 4.13} src="shimmer.wav" v={0.32} dur={1.0} />
      {[4.57, 4.86, 5.16].map((d, i) => <Sfx key={`hd${i}`} at={L[2] + d} src="data.wav" v={0.17} dur={0.3} />)}
      <Sfx at={L[2] + 5.67} src="c_fanfare.wav" v={0.3} dur={1.1} />
      <Sfx at={L[2] + 6.12} src="ding.wav" v={0.22} dur={0.4} />

      {/* ---- S3 SAVE + RELOAD: clear → gems → suck → ka-CHUNK → SAVED → reload ---- */}
      <Sfx at={L[3]} src="c_clear.wav" v={0.34} dur={1.1} />
      {[0.5, 0.68].map((d, i) => <Sfx key={`gp${i}`} at={L[3] + d} src="pop.wav" v={0.28} dur={0.3} />)}
      <Sfx at={L[3] + 1.0} src="swooshup.wav" v={0.34} dur={0.5} />
      <Sfx at={L[3] + 1.5} src="thock.wav" v={0.4} dur={0.35} />
      <Sfx at={L[3] + 1.54} src="snap.wav" v={0.34} dur={0.3} />
      <Sfx at={L[3] + 1.8} src="c_collect.wav" v={0.34} dur={0.5} />
      <Sfx at={L[3] + 2.8} src="c_power.wav" v={0.34} dur={0.8} />
      <Sfx at={L[3] + 3.6} src="resolve.wav" v={0.3} dur={0.8} />

      {/* ---- S4 STYLE: snip → stitches → snap → 96% ---- */}
      <Sfx at={L[4] + 0.2} src="swish.wav" v={0.32} dur={0.35} />
      {[0.5, 0.75, 1.0, 1.25].map((d, i) => <Sfx key={`st${i}`} at={L[4] + d} src="tick.wav" v={0.2} dur={0.22} />)}
      <Sfx at={L[4] + 1.6} src="shimmer.wav" v={0.3} dur={0.8} />
      <Sfx at={L[4] + 2.0} src="chimehi.wav" v={0.3} dur={0.6} />

      {/* ---- S5 MONEY: swing → ninja dash → SLASH → split → $10 → robot deflates ---- */}
      <Sfx at={L[5] + 0.3} src="fling.wav" v={0.26} dur={0.4} />
      <Sfx at={L[5] + 1.2} src="lib_whoosh_fast.wav" v={0.4} dur={0.4} />
      <Sfx at={L[5] + 1.24} src="swish.wav" v={0.3} dur={0.3} />
      <Sfx at={L[5] + 1.6} src="slash.wav" v={0.62} dur={0.5} />
      <Sfx at={L[5] + 1.62} src="lib_cinematic_hit.wav" v={0.44} dur={0.9} />
      <Sfx at={L[5] + 1.64} src="impact.wav" v={0.3} dur={0.4} />
      <Sfx at={L[5] + 2.0} src="c_break.wav" v={0.34} dur={0.5} />
      <Sfx at={L[5] + 2.25} src="c_coin.wav" v={0.3} dur={0.4} />
      <Sfx at={L[5] + 2.3} src="ding.wav" v={0.26} dur={0.4} />
      <Sfx at={L[5] + 2.85} src="swooshdn.wav" v={0.36} dur={0.7} />
      <Sfx at={L[5] + 3.0} src="c_bump.wav" v={0.24} dur={0.4} />
      <Sfx at={L[5] + 3.6} src="snap.wav" v={0.28} dur={0.3} />

      {/* ---- S6 COMMAND: jack → power-on → nodes wire → hub ---- */}
      <Sfx at={L[6] + 0.6} src="thock.wav" v={0.4} dur={0.4} />
      <Sfx at={L[6] + 0.68} src="lib_boom.wav" v={0.34} dur={1.0} />
      <Sfx at={L[6] + 0.9} src="c_warp.wav" v={0.22} dur={0.6} />
      {[1.4, 1.7, 2.0, 2.3, 2.6, 2.9, 3.2].map((d, i) => <Sfx key={`nd${i}`} at={L[6] + d} src="data.wav" v={0.18} dur={0.28} />)}
      <Sfx at={L[6] + 3.6} src="pop.wav" v={0.26} dur={0.4} />
      <Sfx at={L[6] + 4.4} src="shimmer.wav" v={0.24} dur={0.8} />

      {/* ---- S7 NIGHT: dim → ticks → DONE cards land → dawn ---- */}
      <Sfx at={L[7]} src="swooshdn.wav" v={0.3} dur={0.8} />
      {[0.9, 1.9, 2.9, 3.9].map((d, i) => <React.Fragment key={`dn${i}`}><Sfx at={L[7] + d} src="tick.wav" v={0.18} dur={0.22} /><Sfx at={L[7] + d + 0.14} src="c_collect.wav" v={0.22} dur={0.35} /></React.Fragment>)}
      <Sfx at={L[7] + 5.0} src="shimmer.wav" v={0.28} dur={0.9} />
      <Sfx at={L[7] + 5.3} src="chimehi.wav" v={0.2} dur={0.6} />

      {/* ---- CTA: piece click → ignite → wings badge slam → envelope → type → post ---- */}
      <Sfx at={L[8] + 0.4} src="c_unlock.wav" v={0.4} dur={0.7} />
      <Sfx at={L[8] + 0.44} src="snap.wav" v={0.3} dur={0.3} />
      <Sfx at={L[8] + 0.7} src="c_fanfare.wav" v={0.34} dur={1.2} />
      {[1.0, 1.2, 1.4, 1.6].map((d, i) => <Sfx key={`ic${i}`} at={L[8] + d} src="ding.wav" v={0.24} dur={0.3} />)}
      <Sfx at={L[8] + 1.8} src="lib_cinematic_hit.wav" v={0.4} dur={0.9} />
      <Sfx at={L[8] + 1.84} src="magic-reveal.mp3" v={0.3} dur={0.9} />
      <Sfx at={L[8] + 2.2} src="lib_whoosh_fast.wav" v={0.36} dur={0.4} />
      {[2.6, 2.75, 2.9, 3.05].map((d, i) => <Sfx key={`ky${i}`} at={L[8] + d} src="key.wav" v={0.2} dur={0.2} />)}
      <Sfx at={L[8] + 3.3} src="ding.wav" v={0.26} dur={0.4} />
      <Sfx at={L[8] + 3.5} src="sparkle.wav" v={0.3} dur={0.8} />
      <Sfx at={L[8] + 3.9} src="angelic.wav" v={0.18} dur={1.0} />
      <Bg />
      <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "50% 46%" }}>
        {scene(0) ? <HookHero lf={frame - Lf[0]} /> : null}
        {scene(1) ? <Groundhog lf={frame - Lf[1]} /> : null}
        {scene(2) ? <RealMemory lf={(frame - Lf[2]) * 1.356} /> : null}
        {scene(3) ? <SaveReload lf={frame - Lf[3]} /> : null}
        {scene(4) ? <Style lf={frame - Lf[4]} /> : null}
        {scene(5) ? <Money lf={frame - Lf[5]} /> : null}
        {scene(6) ? <Command lf={frame - Lf[6]} /> : null}
        {scene(7) ? <Night lf={frame - Lf[7]} /> : null}
        {scene(8) ? <Cta lf={frame - Lf[8]} /> : null}
        <Captions />
      </AbsoluteFill>
      <ProgressBar />
      {(() => { let fl = 0; for (const b of Lf.slice(1)) { const d = frame - b; if (d >= 0 && d < 7) fl = Math.max(fl, Math.pow(1 - d / 7, 2)); } return fl > 0 ? <AbsoluteFill style={{ background: "#FFF6E6", opacity: fl * 0.5, zIndex: 200, pointerEvents: "none" }} /> : null; })()}
    </AbsoluteFill>
  );
};
