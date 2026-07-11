import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing, Audio, Sequence, staticFile, Img } from "remotion";
import { fraunces, inter } from "./fonts";
import words from "./data/words_slash.json";

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
const L = [0.0, 2.71, 10.87, 19.13, 22.81, 28.27, 33.37];
const Lf = L.map(fr);
const CUT = 35.9;


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
              <polyline points={pts.slice(0, Math.max(2, Math.ceil(gp * 5))).map(([i, v]) => `${gx(i)},${gy(v)}`).join(" ")} fill="none" stroke={RED} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" style={{ filter: "drop-shadow(0 2px 6px rgba(196,74,58,0.4))" }} />
              {pts.map(([i, v], k) => gp > k / 5 ? <circle key={k} cx={gx(i)} cy={gy(v)} r="7" fill={k === 4 ? RED : "#D9906B"} /> : null)}
              {graph && [1, 2, 3, 4].map((k) => { const pk = Math.min(1, Math.max(0, (gp - k / 5) * 6)); return pk > 0 && pk < 1 ? <text key={`p${k}`} x={gx(k)} y={gy(pts[k][1]) - 16 - pk * 14} textAnchor="middle" fontFamily={mono} fontWeight="800" fontSize="15" fill="#B0552F" opacity={1 - pk}>+$10</text> : null; })}
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
const A0: React.FC<{ lf: number }> = ({ lf }) => {
  const slice = over(lf, fr(0.62), fr(0.24), Easing.out(Easing.cubic));     // blade sweep
  const split = over(lf, fr(0.82), fr(0.9), Easing.out(Easing.cubic));       // halves separate
  const chip = over(lf, fr(1.05), fr(0.4), Easing.out(Easing.back(2)));
  const bladeX = -260 + slice * 620;
  const tele = over(lf, fr(0.42), fr(0.18));                                 // perforation telegraph (right before slash)
  const kick = over(lf, fr(0.78), fr(0.3));                                  // slice impact
  const shake = kick > 0 && kick < 1 ? Math.sin(lf * 3.1) * 11 * (1 - kick) : 0;
  const hopP = Math.min(1, Math.max(0, (lf - fr(1.95)) / fr(0.45)));         // mascot victory hop
  const hopY = Math.sin(hopP * Math.PI) * -30;
  const dust = over(lf, fr(2.3), fr(0.4));
  const ow = over(lf, fr(1.35), fr(0.9));
  const restamp = over(lf, fr(2.45), fr(0.3));
  const dash = over(lf, 0, fr(0.4), Easing.out(Easing.cubic));
  const menace = lf < fr(0.78) ? 0.6 + 0.4 * Math.sin(lf / 3) : 0;
  const dead = over(lf, fr(0.82), fr(0.3));
  const lunge = over(lf, 0, fr(0.4), Easing.out(Easing.back(1.9)));
  const eat = over(lf, 0, fr(0.6));
  const vibrate = lf < fr(0.62) ? Math.sin(lf * 3.4) * 4 * (1 - lf / fr(0.62)) : 0;
  return (
    <>
      <Kicker lf={lf} text="SLASH YOUR BILLS" />
      {/* L0 bloom + L2 contact shadows */}
      <div style={{ position: "absolute", left: 246, top: 30, width: 520, height: 400, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(224,138,102,0.16), transparent 70%)", opacity: 0.75 + 0.25 * Math.sin(lf / 16), zIndex: 1 }} />
      <div style={{ position: "absolute", left: 356 - split * 40, top: 384, width: 300 + split * 160, height: 30, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(0,0,0,0.55), transparent 72%)", zIndex: 3 }} />
      <div style={{ position: "absolute", left: 805, top: 350, width: 150, height: 24, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(0,0,0,0.5), transparent 72%)", opacity: 0.85, zIndex: 7 }} />
      {/* red danger glow (villain menace) */}
      {menace > 0 && <div style={{ position: "absolute", left: 320, top: 70, width: 372, height: 320, borderRadius: 24, background: `radial-gradient(closest-side, rgba(238,107,85,${0.18 + menace * 0.22}), transparent 72%)`, filter: "blur(6px)", opacity: 1 - split, zIndex: 2, pointerEvents: "none" }} />}
      {/* perforation telegraph line */}
      <div style={{ position: "absolute", left: 526, top: 96, width: 5, height: 292, transformOrigin: "top center", transform: `rotate(9deg) scaleY(${tele})`, background: "repeating-linear-gradient(180deg, rgba(224,138,102,0.9) 0 12px, transparent 12px 22px)", borderRadius: 3, boxShadow: "0 0 8px rgba(224,138,102,0.5)", opacity: 1 - split, zIndex: 5 }} />
      {/* giant bill: two halves so it can split */}
      {[0, 1].map((half) => (
        <div key={half} style={{ position: "absolute", left: 506 - 150 + (half ? split * 74 : -split * 74) + shake, top: 96 + split * (half ? 26 : 8) + shake * 0.5, width: 300, height: 290, clipPath: half ? "polygon(58% 0, 100% 0, 100% 100%, 42% 100%)" : "polygon(0 0, 58% 0, 42% 100%, 0 100%)", transform: `scale(${1 + (1 - lunge) * 0.2}) translateY(${(1 - lunge) * -14 + vibrate}px) rotate(${(half ? split * 10 : -split * 7) + vibrate * 0.5}deg)`, transformOrigin: half ? "80% 90%" : "20% 90%", zIndex: 4 }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: 18, background: grad("#FFFDF8", "#F0E7D4"), border: "3px solid rgba(60,45,25,0.5)", boxShadow: "0 24px 50px -16px rgba(0,0,0,0.7), inset 0 2px 0 rgba(255,255,255,0.55)" }} />
          <div style={{ position: "absolute", left: "12%", right: "12%", top: 18, height: 34, borderRadius: 6, background: "#121212", display: "flex", alignItems: "center", paddingLeft: 10 }}><span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 20, color: "#fff", letterSpacing: -0.5 }}>xfinity</span></div>
          <div style={{ position: "absolute", left: "14%", top: 66, fontFamily: mono, fontWeight: 800, fontSize: 30, color: "#8E2F22" }}>$89.99<span style={{ fontSize: 16, color: "rgba(60,45,25,0.5)" }}>/mo</span></div>
        </div>
      ))}
      {/* the villain EATS your money: coins sucked in (0-0.6s) */}
      {eat > 0.02 && eat < 1 && Array.from({ length: 9 }).map((_, i) => { const a = (i / 9) * Math.PI * 2 + seed(i) * 1.2; const p = Math.min(1, eat * 1.15 - (i % 3) * 0.07); if (p <= 0 || p >= 1) return null; const r = (1 - p) * (150 + seed(i * 3) * 80); const cx = 506 + Math.cos(a) * r, cy = 240 + Math.sin(a) * r * 0.78; return (
        <div key={`eat${i}`} style={{ position: "absolute", left: cx - 12, top: cy - 12, width: 24, height: 24, borderRadius: "50%", background: grad("#F0CB63", "#D39A2A"), border: "2px solid #F6E4A0", boxShadow: "0 0 9px rgba(240,203,99,0.65)", opacity: p < 0.82 ? 1 : Math.max(0, (1 - p) * 5.5), display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 13, color: "#6B4A0C", zIndex: 5 }}>$</div>); })}
      {/* VILLAIN FACE on the bill: angry before slash, X_X after */}
      {(() => { const alive = 1 - Math.max(split * 2.2, 0); const cxb = 506, cyb = 262; return (<>
        {[-1, 1].map((sd, i) => (
          <div key={`ve${i}`} style={{ position: "absolute", left: cxb + sd * 44 - 17, top: cyb - 8, width: 30, height: 34, borderRadius: "50%", background: "#fff", border: "3px solid #2A1206", overflow: "hidden", zIndex: 6, opacity: alive, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {dead > 0.3 ? <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 26, color: "#C0392B" }}>×</span> : <div style={{ width: 15, height: 15, borderRadius: "50%", background: "#2A1206", transform: `translate(${sd * 2}px, 3px)` }} />}
          </div>
        ))}
        {[-1, 1].map((sd, i) => <div key={`vb${i}`} style={{ position: "absolute", left: cxb + sd * 44 - 22, top: cyb - 20, width: 44, height: 7, borderRadius: 3, background: "#2A1206", transform: `rotate(${sd * -22}deg)`, zIndex: 6, opacity: alive }} />)}
        <div style={{ position: "absolute", left: cxb - 34, top: cyb + 34, width: 68, height: 20 + (menace > 0 ? Math.abs(Math.sin(lf / 2.4)) * 12 : 0), zIndex: 6, opacity: alive, background: "repeating-linear-gradient(90deg, #2A1206 0 7px, transparent 7px 14px)", clipPath: "polygon(0 0, 100% 0, 100% 55%, 0 55%)" }} />
      </>); })()}
      {/* slash blade sweep */}
      {slice > 0.01 && slice < 1 && (
        <div style={{ position: "absolute", left: 506 + bladeX, top: 60, width: 14, height: 330, background: "linear-gradient(180deg, transparent, #FFE9C8, #E08A66, transparent)", borderRadius: 8, transform: "rotate(18deg)", filter: "blur(1px)", boxShadow: "0 0 26px rgba(240,190,120,0.9)", zIndex: 6 }} />
      )}
      {split > 0.05 && <div style={{ position: "absolute", left: 506 - 4, top: 90, width: 8, height: 300, background: "linear-gradient(180deg, transparent, rgba(255,230,180,0.55), transparent)", transform: "rotate(14deg)", filter: "blur(3px)", zIndex: 5, opacity: 1 - split }} />}
      {/* slice impact: expanding ring + 2-frame flash */}
      {/* anime speed lines on slash */}
      {kick > 0 && kick < 1 && Array.from({ length: 14 }).map((_, i) => { const a = (i / 14) * Math.PI * 2; const r0 = 60 + kick * 120; return <div key={`sl${i}`} style={{ position: "absolute", left: 506 + Math.cos(a) * r0, top: 240 + Math.sin(a) * r0 * 0.8, width: 60 * (1 - kick), height: 5, borderRadius: 3, background: "rgba(255,240,215,0.85)", transform: `rotate(${a}rad)`, transformOrigin: "left center", opacity: (1 - kick) * 0.9, zIndex: 6 }} />; })}
      {kick > 0 && kick < 1 && <div style={{ position: "absolute", left: 496 - kick * 130, top: 230 - kick * 130, width: 20 + kick * 260, height: 20 + kick * 260, borderRadius: "50%", border: "3px solid rgba(255,233,200,0.9)", opacity: 1 - kick, zIndex: 6 }} />}
      {kick > 0 && kick < 0.32 && <div style={{ position: "absolute", inset: 0, background: `rgba(255,246,228,${Math.max(0, 0.62 - (kick / 0.32) * 0.62)})`, zIndex: 10, pointerEvents: "none" }} />}
      {kick > 0 && kick < 0.5 && <div style={{ position: "absolute", left: 506 - kick * 320, top: 240 - kick * 320, width: kick * 640, height: kick * 640, borderRadius: "50%", background: `radial-gradient(closest-side, rgba(255,240,210,${(1 - kick) * 0.55}), transparent 62%)`, zIndex: 9, pointerEvents: "none" }} />}
      {/* gag: the sliced bill squeaks */}
      {ow > 0 && ow < 1 && <div style={{ position: "absolute", left: 470, top: 210 - ow * 70, fontFamily: mono, fontWeight: 700, fontSize: 26, color: "#C44A3A", opacity: Math.min(1, (1 - ow) * 2), transform: "rotate(-6deg)", zIndex: 7 }}>ow.</div>}
      {/* coins burst on split */}
      {Array.from({ length: 12 }).map((_, i) => { const d = Math.max(0, (lf - fr(0.85)) / fr(2.1)); if (d <= 0 || d > 1) return null; const a = (i / 9) * Math.PI * 2 + seed(i) * 0.8; const r = Math.pow(d, 0.6) * (95 + seed(i * 3) * 90); return (
        <div key={i} style={{ position: "absolute", left: 506 + Math.cos(a) * r - 13, top: 245 + Math.sin(a) * r * 0.7 - 13 + d * d * 60, width: 26, height: 26, borderRadius: "50%", background: grad("#F0CB63", "#D39A2A"), border: "2.5px solid #F6E4A0", boxShadow: "0 0 12px rgba(240,203,99,0.7)", opacity: Math.max(0, 1 - d * 1.15), display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 15, color: "#6B4A0C", zIndex: 7 }}>$</div>); })}
      {/* mascot swinging + victory hop */}
      {/* dash streak behind the mascot */}
      {dash > 0.02 && dash < 1 && <div style={{ position: "absolute", left: 820 + (1 - dash) * 220, top: 250, width: 260 * (1 - dash), height: 44, borderRadius: 22, background: "linear-gradient(90deg, transparent, rgba(240,203,99,0.5))", filter: "blur(3px)", zIndex: 7 }} />}
      <div style={{ position: "absolute", left: 785, top: 168, zIndex: 8, transform: `translateX(${(1 - dash) * 300}px) rotate(${(1 - slice) * -14 + slice * 6}deg) translateY(${hopY}px)` }}>
        <Mascot lf={lf} size={185} gaze={-2} cheer={split} nodAmp={2.5} />
        {/* NINJA headband (red band + knot + flapping tails) */}
        {(() => { const S = 185; return (
          <div style={{ position: "absolute", left: S * 0.05, top: S * 0.15, zIndex: 3, pointerEvents: "none" }}>
            <div style={{ width: S * 0.6, height: S * 0.13, borderRadius: 4, background: grad("#D23B2A", "#8E1F12"), boxShadow: "inset 0 -2px 0 rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.35)" }} />
            {/* dark ninja mask across the eyes hint */}
            <div style={{ position: "absolute", left: 0, top: S * 0.13, width: S * 0.6, height: S * 0.07, background: "rgba(20,10,6,0.28)" }} />
            {/* knot + two flapping tails trailing back-right */}
            <div style={{ position: "absolute", right: -S * 0.03, top: -S * 0.01, width: S * 0.11, height: S * 0.15, borderRadius: 4, background: grad("#D23B2A", "#8E1F12") }} />
            {[0, 1].map((k) => <div key={k} style={{ position: "absolute", right: -S * 0.06, top: S * 0.02 + k * S * 0.05, width: S * 0.36, height: S * 0.045, borderRadius: 3, background: grad("#D23B2A", "#8E1F12"), transformOrigin: "left center", transform: `rotate(${10 + k * 7 + Math.sin(lf / 4.5 + k * 1.4) * 13}deg)`, boxShadow: "0 1px 2px rgba(0,0,0,0.3)" }} />)}
          </div>); })()}
        {/* glowing katana in-hand, swings on the slash */}
        {lf < fr(2.0) && (() => { const sw = -58 + slice * 122; return (
          <div style={{ position: "absolute", left: 4, top: 104, transformOrigin: "right center", transform: `rotate(${sw}deg)`, zIndex: 9 }}>
            <div style={{ position: "absolute", right: 6, top: 0, width: 176, height: 9, borderRadius: 6, background: "linear-gradient(270deg, #C9D6E8, #FFFFFF, #EAF2FF)", boxShadow: "0 0 18px rgba(180,220,255,0.95), 0 0 4px #fff" }} />
            <div style={{ position: "absolute", right: -6, top: -6, width: 20, height: 21, borderRadius: 4, background: grad("#3A2E20", "#241B10") }} />
            <div style={{ position: "absolute", right: -2, top: -12, width: 8, height: 33, borderRadius: 3, background: grad(SUN, "#B8860B") }} />
          </div>); })()}
      </div>
      {/* landing dust */}
      {dust > 0 && dust < 1 && <>
        <div style={{ position: "absolute", left: 782, top: 344, width: 16 + dust * 26, height: 9, borderRadius: "50%", background: "rgba(235,215,190,0.5)", opacity: 1 - dust, transform: `translateX(${-dust * 18}px)`, zIndex: 7 }} />
        <div style={{ position: "absolute", left: 942, top: 344, width: 16 + dust * 26, height: 9, borderRadius: "50%", background: "rgba(235,215,190,0.5)", opacity: 1 - dust, transform: `translateX(${dust * 18}px)`, zIndex: 7 }} />
      </>}
      {/* -$500/yr chip (re-stamps + glints at 2.45s) */}
      <div style={{ position: "absolute", left: 92, top: 150, transform: `scale(${chip * (1 + Math.sin(lf / 8) * 0.035) * (1 + Math.sin(restamp * Math.PI) * 0.12)}) rotate(-5deg)`, zIndex: 9 }}>
        <Chip text="−$500/yr" bg={grad("#2E4A38", "#1B2E22")} bd="#4CAF7D" fg="#8FE0B0" size={46} />
      </div>
      {restamp > 0 && restamp < 1 && <div style={{ position: "absolute", left: 92 + restamp * 230, top: 146, width: 26, height: 62, transform: "rotate(18deg)", background: "linear-gradient(90deg, transparent, rgba(255,245,225,0.55), transparent)", zIndex: 10 }} />}
    </>
  );
};

// A1 — FEED + WEIGH: three bill sprites fly into Claude's scale; $89 vs $49 orbs weigh
const A1: React.FC<{ lf: number }> = ({ lf }) => {
  const s2 = over(lf, fr(3.7), fr(0.9), Easing.inOut(Easing.cubic));  // scale phase in ("digs up" ~2.6 local)
  const tilt = over(lf, fr(4.4), fr(1.2), Easing.inOut(Easing.cubic)) * 13; // beam tilts heavy-left
  const flash = over(lf, fr(7.35), fr(0.35));  // "like this" 10.44 abs = 7.48 local
  const bills: [string, number, string][] = [["WIFI", 0, SKY], ["PHONE", 1, CORAL], ["INSUR", 2, TEAL]];
  let hop = 0;
  [1.15, 1.7, 2.25].forEach((t0) => { hop += Math.sin(over(lf, fr(t0), fr(0.3)) * Math.PI) * 10; });
  const wob = lf > fr(5.6) ? Math.sin((lf - fr(5.6)) / 4.5) * 3 * Math.max(0, 1 - (lf - fr(5.6)) / fr(0.9)) : 0;
  const tiltW = tilt + wob;
  return (
    <>
      <Kicker lf={lf} text="THE HIDDEN GAP" />
      {/* L0 blooms behind both phases */}
      <div style={{ position: "absolute", left: 560, top: 40, width: 380, height: 320, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(217,119,87,0.16), transparent 70%)", opacity: 1 - s2, zIndex: 1 }} />
      <div style={{ position: "absolute", left: 206, top: 30, width: 600, height: 340, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(240,203,99,0.12), transparent 72%)", opacity: s2 * (0.8 + 0.2 * Math.sin(lf / 14)), zIndex: 1 }} />
      {/* L2 mascot contact shadow */}
      <div style={{ position: "absolute", left: 698, top: 298, width: 150, height: 24, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(0,0,0,0.5), transparent 70%)", transform: `translateX(${s2 * 74}px) scaleX(${1 - s2 * 0.42})`, opacity: 1 - s2 * 0.4, zIndex: 2 }} />
      {/* phase 1: bills fly to mascot center */}
      {bills.map(([lab, i, btone]) => { const p = over(lf, fr(0.25 + (i as number) * 0.55), fr(0.9), Easing.inOut(Easing.cubic)); const sx = 250 + (i as number) * 122, sy = 308; const ex = 352 + (i as number) * 96, ey = 190 - (i as number) * 12; const x = sx + (ex - sx) * p, y = sy + (ey - sy) * p - Math.sin(p * Math.PI) * (56 + i * 34); const sc = 1 - p * 0.3; const lift = Math.sin(p * Math.PI); const ring = over(lf, fr(0.25 + i * 0.55 + 0.82), fr(0.35)); return (
        <React.Fragment key={i}>
          <div style={{ position: "absolute", left: x + 34, top: 356, width: 80 * (1 - lift * 0.45), height: 16, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(0,0,0,0.35), transparent 70%)", opacity: (1 - s2) * (0.5 - lift * 0.25), zIndex: 2 }} />
          <div style={{ position: "absolute", left: x, top: y, transform: `scale(${(1 - s2) * sc})`, opacity: 1 - s2, zIndex: 5 }}>
            <BillSprite lf={lf} w={148} label={lab as string} mood="scared" tone={btone as string} sweat />
          </div>
          {ring > 0 && ring < 1 && <div style={{ position: "absolute", left: ex + 40, top: ey + 150, width: 70, height: 22, borderRadius: "50%", border: "2.5px solid rgba(240,220,180,0.5)", transform: `scale(${0.4 + ring * 1.1})`, opacity: (1 - ring) * (1 - s2), zIndex: 4 }} />}
        </React.Fragment>); })}
      {/* magnifier scan sweep across the bills */}
      {s2 < 0.5 && (() => { const sw = (lf / 26) % 1; return <div style={{ position: "absolute", left: 220 + sw * 460, top: 150, width: 120, height: 200, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(90,160,222,0.22), transparent 70%)", filter: "blur(3px)", opacity: (1 - s2) * 0.8, zIndex: 3, pointerEvents: "none" }} />; })()}
      <div style={{ position: "absolute", left: 632, top: 116, zIndex: 6, opacity: 1 - s2 * 0.4, transform: `translateX(${s2 * 74}px) scale(${1 - s2 * 0.42}) translateY(${-hop}px)` }}>
        <Mascot lf={lf} size={196} gaze={-3} sherlock={1} cheer={flash} />
      </div>
      {/* phase 2: balance scale (hero-sized) */}
      {s2 > 0.02 && (
        <div style={{ position: "absolute", left: 506 - 220, top: 58, width: 440, height: 320, opacity: s2, zIndex: 4 }}>
          <div style={{ position: "absolute", left: 110, top: 286, width: 220, height: 24, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(0,0,0,0.5), transparent 70%)" }} />
          <div style={{ position: "absolute", left: 120, top: 260, width: 200, height: 20, borderRadius: 10, background: grad("#C98F4A", "#8A5E2E"), boxShadow: "0 8px 18px -6px rgba(0,0,0,0.5)" }} />
          <div style={{ position: "absolute", left: 220 - 9, top: 56, width: 18, height: 208, borderRadius: 8, background: grad("#C98F4A", "#8A5E2E") }} />
          <div style={{ position: "absolute", left: 220 - 17, top: 42, width: 34, height: 22, borderRadius: 8, background: grad(SUN, "#D39A2A"), boxShadow: `0 0 14px ${SUN}` }} />
          <div style={{ position: "absolute", left: 220 - 165, top: 48, width: 330, height: 14, borderRadius: 7, background: grad("#E0A85C", "#A6763A"), transform: `rotate(${tiltW}deg)`, transformOrigin: "center", boxShadow: "0 8px 16px -6px rgba(0,0,0,0.5)" }} />
          {/* pans */}
          {[-1, 1].map((sd, i) => { const py = 56 + sd * Math.sin((tiltW * Math.PI) / 180) * 158; const heavy = sd < 0; return (
            <div key={i} style={{ position: "absolute", left: 220 + sd * 158 - 62, top: py, width: 124, textAlign: "center", transform: sd > 0 ? `translateY(${-Math.sin(flash * Math.PI) * 8}px)` : undefined }}>
              <div style={{ width: 3, height: 50, background: "rgba(190,150,90,0.7)", margin: "0 auto" }} />
              <div style={{ width: 124, height: 22, borderRadius: "0 0 999px 999px", background: grad("#C98F4A", "#8A5E2E"), boxShadow: "0 10px 20px -6px rgba(0,0,0,0.5)" }} />
              <div style={{ position: "absolute", left: 62 - 42, top: heavy ? -30 : -22, width: 84, height: 84, borderRadius: "50%", background: `radial-gradient(circle at 32% 28%, rgba(255,255,255,0.4), transparent 45%), ${heavy ? grad("#F0654E", "#C0392B") : grad("#3FC894", "#2E9D63")}`, border: `4px solid ${heavy ? "#F7BBAE" : "#AEECCB"}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 29, color: "#fff", boxShadow: flash > 0.05 ? `0 0 ${26 * flash}px ${SUN}` : "0 14px 28px -8px rgba(0,0,0,0.5), inset 0 3px 0 rgba(255,255,255,0.35), inset 0 -4px 8px rgba(0,0,0,0.22)", transform: `scale(${1 + flash * 0.12})` }}>
                {heavy ? "$89" : "$49"}
                {heavy && tiltW > 10 && [0, 1].map((k) => <div key={k} style={{ position: "absolute", ...(k === 0 ? { left: 12 } : { right: 12 }), top: 14 + ((lf * 0.8 + k * 11) % 22), width: 7, height: 10, borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%", background: "rgba(243,232,214,0.9)", opacity: 0.9 - ((lf * 0.8 + k * 11) % 22) / 26 }} />)}
              </div>
            </div>); })}
          <div style={{ position: "absolute", left: 220 - 95, top: 294, padding: "5px 16px", borderRadius: 999, background: "rgba(30,20,10,0.9)", border: `2px solid ${SUN}`, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 20, color: "#F3E8D6", opacity: over(lf, fr(4.6), fr(0.4)), width: 190, textAlign: "center" }}>same plan 🤨</div>
        </div>
      )}
    </>
  );
};

// A2 — CREEP: the bill sprite GROWS year by year; insurance twin joins
const A2: React.FC<{ lf: number }> = ({ lf }) => {
  const steps = [0.28, 0.42, 0.56, 0.70].map((t, i) => over(lf, fr(1.7 + i * 0.62), fr(0.4), Easing.out(Easing.back(1.6))));
  const growth = 1 + steps.reduce((a, b) => a + b, 0) * 0.26;
  const ins = over(lf, fr(6.0), fr(0.7), Easing.out(Easing.back(1.4)));   // insurance renewal (creep tightened)
  const insGrow = 1 + over(lf, fr(6.6), fr(1.2), Easing.out(Easing.cubic)) * 0.5;
  const ghost = over(lf, fr(3.1), fr(0.5), Easing.out(Easing.cubic));    // $49 ghost twin
  const wHero = 132 * growth ** 0.78;                                     // hero bill width, bottom-anchored
  const fl = Math.sin(over(lf, fr(6.15), fr(0.55)) * Math.PI);            // GEKKO-landing flinch
  const tt = Math.sin(over(lf, fr(7.6), fr(0.5)) * Math.PI);              // synchronized smug puff-up
  const dp = over(lf, fr(6.25), fr(0.6), Easing.out(Easing.cubic));       // landing dust
  return (
    <>
      <Kicker lf={lf} text="IT CREEPS UP" tone={RED} />
      {/* L0 bloom + L2 contact shadows */}
      <div style={{ position: "absolute", left: 200, top: 50, width: 460, height: 340, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(196,90,58,0.16), transparent 70%)", opacity: 0.7 + 0.3 * Math.sin(lf / 19), zIndex: 1 }} />
      <div style={{ position: "absolute", left: 300, top: 388, width: wHero, height: 16, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(0,0,0,0.5), transparent 72%)", filter: "blur(2px)", zIndex: 4 }} />
      <div style={{ position: "absolute", left: 672, top: 388, width: 112 * insGrow ** 0.8, height: 16, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(0,0,0,0.5), transparent 72%)", filter: "blur(2px)", opacity: ins, zIndex: 4 }} />
      <div style={{ position: "absolute", left: 872, top: 372, width: 108, height: 16, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(0,0,0,0.5), transparent 72%)", filter: "blur(2px)", opacity: 0.85, zIndex: 4 }} />
      {/* year pips */}
      <div style={{ position: "absolute", left: 506 - 228, top: 14, display: "flex", gap: 14, zIndex: 3 }}>
        {["2022", "2023", "2024", "2025", "2026"].map((y, i) => { const on = i === 0 ? 1 : steps[i - 1] || 0; return (
          <div key={y} style={{ padding: "4px 13px", borderRadius: 999, background: on > 0.4 ? grad("#C44A3A", "#992E22") : "rgba(40,30,18,0.8)", border: `2px solid ${on > 0.4 ? "#E8B7AC" : "rgba(210,150,90,0.3)"}`, fontFamily: mono, fontWeight: 700, fontSize: 19, color: on > 0.4 ? "#fff" : "rgba(235,215,190,0.55)", transform: `scale(${1 + (on > 0 && on < 1 ? (1 - on) * 0.3 : 0)})`, boxShadow: on > 0.4 ? `0 0 ${10 + 4 * Math.sin(lf / 6)}px rgba(196,74,58,0.55)` : undefined }}>{y}</div>); })}
      </div>
      {/* growing bloated bill (bottom-anchored hero) */}
      <div style={{ position: "absolute", left: 300, top: Math.max(72, 385 - wHero * 1.28), zIndex: 5, transformOrigin: "50% 100%", transform: `rotate(${Math.sin(lf / 16) * 2.2}deg) scale(${1 + Math.sin(lf / 13) * 0.015}) rotate(${-fl * 6}deg) translateY(${-fl * 10}px) scaleY(${1 + tt * 0.07}) scaleX(${1 - tt * 0.04})` }}>
        <BillSprite lf={lf} w={wHero} label="WIFI BILL" price={["$49", "$59", "$69", "$79", "$89"][steps.filter((s) => s > 0.5).length]} mood="smug" tone={ROSE} horns mustache />
        {/* +$10 tick pops riding the growth */}
        {[0, 1, 2, 3].map((i) => { const p = over(lf, fr(1.7 + i * 0.62), fr(0.55), Easing.out(Easing.cubic)); return p > 0.01 && p < 1 ? (
          <div key={i} style={{ position: "absolute", left: "50%", marginLeft: -26, top: -34 - p * 48, opacity: 1 - p, transform: `scale(${0.7 + 0.5 * Math.min(1, p * 3)})`, fontFamily: mono, fontWeight: 900, fontSize: 23, color: "#F0CB63", textShadow: "0 2px 8px rgba(0,0,0,0.65)" }}>+$10</div>) : null; })}
      </div>
      {/* $49 ghost (what new customers pay) — spectral */}
      <div style={{ position: "absolute", left: 116, top: 252, opacity: ghost * (0.68 + 0.14 * Math.sin(lf / 7)), zIndex: 4, filter: "saturate(0.85) blur(0.4px)", transform: `translateY(${Math.sin(lf / 9) * 6 - 4}px)` }}>
        <BillSprite lf={lf} w={104} label="NEW GUY" price="$49" mood="happy" tone={MINT} />
      </div>
      <div style={{ position: "absolute", left: 116, top: 396, width: 120, height: 13, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(120,200,150,0.30), transparent 70%)", filter: "blur(3px)", opacity: ghost, zIndex: 3 }} />
      {/* insurance twin */}
      {ins > 0.02 && (
        <div style={{ position: "absolute", left: 672, top: Math.max(96, 385 - 152 * insGrow ** 0.8 - 82), transform: `scale(${ins}) rotate(${Math.sin(lf / 14 + 2) * 2.4}deg) scaleY(${1 + tt * 0.07}) scaleX(${1 - tt * 0.04})`, transformOrigin: "50% 100%", zIndex: 5 }}>
          <BillSprite lf={lf} w={112 * insGrow ** 0.8} label="GEKKO INS." price="+$25" mood="smug" tone={GRAPE} horns />
        </div>
      )}
      {/* GEKKO landing dust */}
      {dp > 0.01 && dp < 1 && [-1, 0, 1].map((s) => (
        <div key={s} style={{ position: "absolute", left: 728 + s * 36 * dp - 13, top: 384, width: 26 * (0.5 + dp), height: 10, borderRadius: "50%", background: "rgba(215,185,145,0.55)", opacity: (1 - dp) * 0.8, filter: "blur(1px)", zIndex: 4 }} />))}
      {/* hero flyby gag (background cameo) */}
      {(() => { const fp = over(lf, fr(4.6), fr(1.2), Easing.inOut(Easing.cubic)); if (fp <= 0.01 || fp >= 1) return null; const hx = -80 + fp * 1150; const hy = 84 - Math.sin(fp * Math.PI) * 26; return (
        <div style={{ position: "absolute", left: hx, top: hy, zIndex: 2, transform: "rotate(8deg)" }}>
          <div style={{ position: "absolute", left: -74, top: 12, width: 74, height: 6, borderRadius: 3, background: "linear-gradient(90deg, transparent, rgba(240,203,99,0.8))", filter: "blur(1px)" }} />
          <div style={{ width: 30, height: 20, borderRadius: 6, background: grad("#C0392B", "#8E1F12"), border: "1.5px solid rgba(255,200,120,0.6)" }} />
          <div style={{ position: "absolute", left: 21, top: -8, width: 14, height: 12, borderRadius: 4, background: grad("#F0CB63", "#D39A2A") }} />
          <div style={{ position: "absolute", left: 24, top: -5, width: 8, height: 3, borderRadius: 2, background: "#7FD4F0" }} />
        </div>); })()}
      {/* shocked mascot */}
      <div style={{ position: "absolute", left: 832, top: 236, zIndex: 6 }}>
        <Mascot lf={lf} size={128} gaze={-4} shock={Math.min(1, steps[2] + ins)} glasses={1} />
      </div>
    </>
  );
};

// A3 — RANK: podium; biggest gap gets the crown + TONIGHT flag
const A3: React.FC<{ lf: number }> = ({ lf }) => {
  const hop = (i: number) => over(lf, fr(0.22 + i * 0.3), fr(0.55), Easing.out(Easing.back(1.3)));
  const flag = over(lf, fr(2.5), fr(0.45), Easing.out(Easing.back(2)));   // "call to make tonight" ~24.1 abs = 2.6 local
  const pod = [[506, 168, 1, "WIFI", "$40 gap", "#F0CB63"], [286, 118, 2, "INSUR", "$25 gap", "#C8CDD6"], [726, 86, 3, "PHONE", "$8 gap", "#C9976B"]] as const;
  return (
    <>
      <Kicker lf={lf} text="WORST FIRST" tone={GOLD} />
      {/* L0 gold bloom */}
      <div style={{ position: "absolute", left: 506 - 320, top: 130, width: 640, height: 300, background: "radial-gradient(ellipse at center, rgba(240,203,99,0.14), transparent 68%)", zIndex: 1 }} />
      {pod.map(([x, ph, rank, lab, gap, tone], i) => { const hp = hop(i); const bonk = i === 0 ? Math.sin(Math.min(1, over(lf, fr(1.32), fr(0.3))) * Math.PI) * 0.12 : 0; return (
        <React.Fragment key={i}>
          <div style={{ position: "absolute", left: x - 105, top: 392, width: 210, height: 22, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(0,0,0,0.45), transparent 70%)", opacity: hp, zIndex: 2 }} />
          <div style={{ position: "absolute", left: x - 92, top: 400 - ph, width: 184, height: ph, background: grad("#4A3A26", "#2E2114"), borderRadius: "10px 10px 0 0", border: "2.5px solid rgba(210,150,90,0.4)", borderBottom: "none", boxShadow: "0 -6px 26px -10px rgba(0,0,0,0.5), inset 0 2px 0 rgba(255,240,210,0.22), inset 0 0 0 1px rgba(255,240,210,0.08)", zIndex: 3 }}>
            <div style={{ position: "absolute", left: 0, top: 0, right: 0, height: 12, borderRadius: "10px 10px 0 0", background: grad("#6A5436", "#4A3A26") }} />
            <div style={{ position: "absolute", inset: 0, borderRadius: "10px 10px 0 0", background: "linear-gradient(158deg, transparent 42%, rgba(255,240,210,0.07) 50%, transparent 58%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", left: "50%", top: 10, transform: "translateX(-50%)", width: 46, height: 46, borderRadius: "50%", background: grad(tone as string, "#8A6A42"), border: "3px solid rgba(255,240,210,0.7)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 26, color: "#2E2114", overflow: "hidden" }}>
              {rank}
              <div style={{ position: "absolute", top: -6, width: 14, height: 60, background: "rgba(255,250,235,0.75)", transform: `translateX(${-20 + over(lf, fr(2.0 + i * 0.15), fr(0.3)) * 80}px) rotate(20deg)` }} />
            </div>
          </div>
          <div style={{ position: "absolute", left: x - 60, top: 400 - ph - 148 - hp * 8, transform: `translateY(${(1 - hp) * -60}px) scale(${(0.6 + hp * 0.4) * (1 + bonk * 0.5)}, ${(0.6 + hp * 0.4) * (1 - bonk)})`, transformOrigin: "bottom center", opacity: Math.min(1, hp * 2), zIndex: 5 }}>
            <><BillSprite lf={lf} w={i === 0 ? 124 : 104} label={`${lab}`} price={gap as string} mood={i === 0 ? "scared" : "smug"} tone={[ROSE, GRAPE, SKY][i]} horns={i === 0} crown={i === 0} />{i === 2 && <div style={{ position: "absolute", left: 30, top: 66 + ((lf * 1.6) % 22), width: 9, height: 13, borderRadius: "50% 50% 60% 60%", background: "#9FD3F0", opacity: 0.85 }} />}</>
          </div>
          {i === 0 && hp > 0.8 && (
            <div style={{ position: "absolute", left: x - 74, top: 400 - ph - 224 - Math.sin(lf / 9) * 4, fontSize: 46, transform: `scale(${over(lf, fr(1.15), fr(0.35), Easing.out(Easing.back(2.6)))}) rotate(-14deg)`, zIndex: 6, filter: "drop-shadow(0 4px 10px rgba(240,203,99,0.6))" }}>👑</div>
          )}
        </React.Fragment>); })}
      {/* paparazzi flashes on the crown */}
      {[1.35, 1.62, 1.95].map((ft, k) => { const d = lf - fr(ft); if (d < 0 || d > 8) return null; const o = Math.pow(1 - d / 8, 2); return (
        <div key={`fl${k}`} style={{ position: "absolute", left: 300 + k * 170, top: 66 + (k % 2) * 40, width: 52, height: 52, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,250,235,0.95), transparent 70%)", opacity: o, zIndex: 7 }} />); })}
      {/* referee mascot (judges, then cheers at the flag) + tonight flag */}
      <div style={{ position: "absolute", left: 872, top: 388, width: 110, height: 18, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(0,0,0,0.45), transparent 70%)", zIndex: 5 }} />
      <div style={{ position: "absolute", left: 856, top: 268, zIndex: 6, transform: `translateY(${Math.sin(lf / 11) * 3}px)` }}>
        <Mascot lf={lf} size={128} gaze={-4} judge={1} cheer={flag} />
      </div>
      <div style={{ position: "absolute", left: 380, top: 44, transform: `scale(${flag}) rotate(-3deg)`, transformOrigin: "center", zIndex: 8 }}>
        <Chip text="📞 CALL TONIGHT" bg={grad("#C44A3A", "#992E22")} bd="#E8B7AC" fg="#fff" size={34} />
      </div>
      {/* gold confetti burst after the flag */}
      {[0, 1, 2, 3, 4, 5].map((k) => { const cf = over(lf, fr(2.6), fr(0.9)); return cf <= 0 ? null : (
        <div key={`cf${k}`} style={{ position: "absolute", left: 380 + k * 38 + Math.sin(k * 3 + lf / 6) * 8, top: 60 + cf * 220 + k * 12, width: 7, height: 11, background: k % 2 ? "#F0CB63" : "#EFE7DA", transform: `rotate(${lf * 6 + k * 50}deg)`, opacity: 1 - cf, zIndex: 7 }} />); })}
    </>
  );
};

// A4 — THE SCRIPT: mascot reads a glowing script; provider tower's price tag drops 89 -> 49
const A4: React.FC<{ lf: number }> = ({ lf }) => {
  const scroll = over(lf, fr(0.45), fr(0.5), Easing.out(Easing.back(1.5)));
  const waves = ramp(lf, fr(1.2), fr(4.4));
  const dropAt = 3.9; // "gets the price dropped" 29.5 abs ≈ 4.3 local; start slightly before
  const dropped = over(lf, fr(dropAt), fr(0.5), Easing.out(Easing.back(1.6)));
  const sweat = over(lf, fr(2.2), fr(0.6));
  return (
    <>
      <Kicker lf={lf} text="THE MAGIC WORDS" tone={GOLD} />
      {/* mascot with script */}
      <div style={{ position: "absolute", left: 118, top: 176, zIndex: 6 }}>
        <Mascot lf={lf} size={168} gaze={4} nodAmp={4.5} nodSpeed={13} suit={1} />
      </div>
      <div style={{ position: "absolute", left: 252, top: 232, transform: `scale(${scroll}) rotate(5deg)`, transformOrigin: "left center", zIndex: 7 }}>
        <div style={{ width: 150, height: 168, borderRadius: 10, background: grad("#FDF6E4", "#EFE2C4"), border: "2.5px solid rgba(120,90,40,0.55)", boxShadow: "0 16px 34px -10px rgba(0,0,0,0.6), 0 0 26px rgba(240,203,99,0.35)", padding: "12px 12px" }}>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 15, color: "#8E5A1E", marginBottom: 7 }}>📜 CALL SCRIPT</div>
          {[86, 108, 70, 96, 60].map((wv, i) => <div key={i} style={{ width: wv, height: 8, borderRadius: 4, background: i === 2 ? grad("#E9B44C", "#C98A20") : "rgba(90,64,28,0.35)", marginBottom: 8, boxShadow: i === 2 ? "0 0 8px rgba(233,180,76,0.7)" : "none" }} />)}
        </div>
      </div>
      {/* speech waves */}
      {Array.from({ length: 3 }).map((_, i) => { const wp = (waves * 3.2 + i * 0.33) % 1; if (waves <= 0.01) return null; return (
        <div key={i} style={{ position: "absolute", left: 420 + wp * 230, top: 226 - 14 - wp * 6, width: 28 + wp * 30, height: 56 + wp * 40, borderRadius: "50%", borderRight: "4px solid rgba(240,203,99,0.7)", borderTop: "4px solid transparent", borderBottom: "4px solid transparent", borderLeft: "4px solid transparent", opacity: (1 - wp) * 0.75, zIndex: 5 }} />); })}
      {/* provider tower */}
      <div style={{ position: "absolute", left: 700, top: 116, zIndex: 4 }}>
        <div style={{ width: 190, height: 264, borderRadius: "14px 14px 0 0", background: grad("#3E4A5E", "#252E3E"), border: "2.5px solid rgba(150,170,210,0.4)", boxShadow: "0 22px 44px -14px rgba(0,0,0,0.7)", position: "relative", overflow: "hidden" }}>
          {Array.from({ length: 12 }).map((_, i) => <div key={i} style={{ position: "absolute", left: 22 + (i % 3) * 54, top: 48 + Math.floor(i / 3) * 50, width: 32, height: 32, borderRadius: 5, background: seed(i) > 0.4 ? "rgba(240,214,150,0.75)" : "rgba(120,140,175,0.3)" }} />)}
          <div style={{ position: "absolute", left: 0, right: 0, top: 6, textAlign: "center", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 19, color: "rgba(220,230,250,0.9)" }}>XFINITY HQ</div>
          {/* sweat drops */}
          {sweat > 0.1 && [0, 1].map((i) => <div key={i} style={{ position: "absolute", right: 16 + i * 26, top: 30 + ((lf * (2 + i)) % 46), width: 11, height: 15, borderRadius: "50% 50% 60% 60%", background: "#9FD3F0", opacity: sweat * 0.9 }} />)}
        </div>
        {/* price tag flip */}
        <div style={{ position: "absolute", left: 46, top: -46, transform: `rotate(${-4 + dropped * 7}deg)` }}>
          <div style={{ padding: "7px 18px", borderRadius: 12, background: dropped > 0.5 ? grad("#57B884", "#2E7D5B") : grad("#D96A55", "#A63A28"), border: `3px solid ${dropped > 0.5 ? "#A6E5C4" : "#F0B4A6"}`, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 33, color: "#fff", boxShadow: dropped > 0.5 ? "0 0 24px rgba(87,184,132,0.6)" : "0 12px 26px -8px rgba(0,0,0,0.55)", transform: `scale(${1 + (dropped > 0 && dropped < 1 ? (1 - Math.abs(dropped - 0.5) * 2) * 0.18 : 0)})` }}>
            {dropped > 0.5 ? "$49.99 ✓" : "$89.99"}
          </div>
          {dropped > 0.5 && <div style={{ position: "absolute", left: -8, top: -30, fontFamily: mono, fontWeight: 800, fontSize: 21, color: "#8FE0B0", opacity: Math.min(1, (dropped - 0.5) * 3), transform: `translateY(${-(dropped - 0.5) * 22}px)` }}>−$40/mo</div>}
        </div>
      </div>
    </>
  );
};

// A5 — SENTRY: calendar ring + radar sweep mascot catches a creeping price
const A5: React.FC<{ lf: number }> = ({ lf }) => {
  const cx = 506, cy = 218, R = 158;
  const sweepAng = (lf * 4.2) % 360;
  const creepP = over(lf, fr(1.0), fr(1.6), Easing.inOut(Easing.cubic));      // red sprite rises
  const catchAt = 2.9; // "because these prices always creep back up" ~33.6-35.4 abs
  const caught = over(lf, fr(catchAt), fr(0.45), Easing.out(Easing.cubic));
  const zap = over(lf, fr(catchAt), fr(0.3));
  return (
    <>
      <Kicker lf={lf} text="EVERY MONTH" tone={GREEN} />
      {/* calendar ring */}
      {Array.from({ length: 12 }).map((_, i) => { const a = (i / 12) * Math.PI * 2 - Math.PI / 2; const on = ((sweepAng + 90) / 360 * 12) % 12 > i; return (
        <div key={i} style={{ position: "absolute", left: cx + Math.cos(a) * R - 17, top: cy + Math.sin(a) * R * 0.82 - 13, padding: "2px 8px", borderRadius: 7, background: on ? "rgba(76,175,125,0.25)" : "rgba(40,30,18,0.85)", border: `2px solid ${on ? "#4CAF7D" : "rgba(210,150,90,0.3)"}`, fontFamily: mono, fontSize: 14, fontWeight: 700, color: on ? "#8FE0B0" : "rgba(235,215,190,0.5)", zIndex: 3 }}>{["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"][i]}</div>); })}
      {/* rotating sweep */}
      <div style={{ position: "absolute", left: cx - R, top: cy - R * 0.82, width: R * 2, height: R * 1.64, borderRadius: "50%", background: `conic-gradient(from ${sweepAng}deg, rgba(76,175,125,0.4), transparent 24%)`, opacity: 0.75, zIndex: 2 }} />
      <div style={{ position: "absolute", left: cx - R, top: cy - R * 0.82, width: R * 2, height: R * 1.64, borderRadius: "50%", border: "2.5px solid rgba(76,175,125,0.45)", zIndex: 2 }} />
      {/* sentry mascot */}
      <div style={{ position: "absolute", left: cx - 62, top: cy - 66, zIndex: 6 }}>
        <Mascot lf={lf} size={124} cop={1} gaze={creepP > 0.5 && caught < 0.5 ? 4 : 0} stern={0.6} cheer={caught} />
      </div>
      {/* creeping price sprite (rises at 4 o'clock, gets zapped) */}
      {(() => { const a = 0.55; const px = cx + Math.cos(a) * (R + 26), py = cy + Math.sin(a) * R * 0.82; const rise = creepP * (1 - caught); return (
        <div style={{ position: "absolute", left: px - 44, top: py - 20 - rise * 46, transform: `scale(${0.4 + rise * 0.6})`, opacity: Math.max(0.15, 1 - caught * 1.1), zIndex: 5 }}>
          <BillSprite lf={lf} w={92} label="+$6 creep" price="😈" mood="smug" tone="#E8C9C2" />
        </div>); })()}
      {/* zap beam + check */}
      {zap > 0.02 && zap < 1 && (() => { const a = 0.55; const px = cx + Math.cos(a) * (R + 10), py = cy + Math.sin(a) * R * 0.82 - 40; return (
        <svg width="1012" height="420" style={{ position: "absolute", inset: 0, zIndex: 7, overflow: "visible" }}>
          <line x1={cx} y1={cy} x2={px} y2={py} stroke="#8FE0B0" strokeWidth={7 * (1 - zap)} strokeLinecap="round" style={{ filter: "drop-shadow(0 0 10px #4CAF7D)" }} />
        </svg>); })()}
      {zap > 0.2 && zap < 1 && (() => { const a = 0.55; const px = 506 + Math.cos(a) * (158 + 26), py = 218 + Math.sin(a) * 158 * 0.82; return (
        <div style={{ position: "absolute", left: px + 30, top: py - 96, padding: "5px 13px", borderRadius: 12, background: "#FFF6E6", border: "2.5px solid #C44A3A", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 22, color: "#C44A3A", transform: `scale(${Math.min(1, zap * 2)}) rotate(-5deg)`, zIndex: 9 }}>ow!</div>); })()}
      {caught > 0.6 && (
        <div style={{ position: "absolute", left: cx + 168, top: cy + 66, transform: `scale(${over(lf, fr(catchAt + 0.3), fr(0.35), Easing.out(Easing.back(2.2)))})`, zIndex: 8 }}>
          <Chip text="✓ caught" bg={grad("#2E4A38", "#1B2E22")} bd="#4CAF7D" fg="#8FE0B0" size={30} />
        </div>
      )}
      {/* counter */}
      <div style={{ position: "absolute", left: 68, top: 328, zIndex: 8, opacity: over(lf, fr(0.6), fr(0.4)) }}>
        <div style={{ padding: "6px 16px", borderRadius: 999, background: "rgba(20,14,8,0.85)", border: "2px solid rgba(210,150,90,0.5)", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 21, color: "#F3E8D6" }}>re-checks all 3 bills · auto</div>
      </div>
    </>
  );
};

// ================================ SCREEN B BODIES (practical / real UI) ================================

// B0 — the real bill, circled + stickered (mute-readable receipt at frame 0)
const B0: React.FC<{ lf: number }> = ({ lf }) => (
  <>
    {/* L0 bloom + L2 contact shadow + L1 parallax coins */}
    <div style={{ position: "absolute", left: 146, top: 16, width: 720, height: 380, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(240,215,170,0.10), transparent 70%)" }} />
    <div style={{ position: "absolute", left: 206, top: 306, width: 600, height: 34, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(0,0,0,0.5), transparent 72%)" }} />
    <div style={{ position: "absolute", left: 84, top: 92, width: 42, height: 42, borderRadius: "50%", background: "rgba(211,154,42,0.20)", filter: "blur(6px)", transform: `translateX(${Math.sin(lf / 30) * -14}px)` }} />
    <div style={{ position: "absolute", left: 892, top: 272, width: 42, height: 42, borderRadius: "50%", background: "rgba(211,154,42,0.20)", filter: "blur(6px)", transform: `translateX(${Math.sin(lf / 30 + 2) * 14}px)` }} />
    <div style={{ position: "absolute", left: 506 - 340, top: 44 }}>
      <BillDoc lf={lf} sticker w={680} />
    </div>
    {/* micro-beat at 2.0s: paid-36-months amber tag */}
    {(() => { const paid = over(lf, fr(2.0), fr(0.35), Easing.out(Easing.cubic)); return (
      <div style={{ position: "absolute", left: 60, top: 328, transform: `rotate(-4deg) scale(${0.8 + paid * 0.2})`, opacity: paid, padding: "6px 14px", borderRadius: 10, background: grad("#3A2E20", "#241B10"), border: `2.5px solid ${AMBER}`, boxShadow: "0 10px 24px -8px rgba(0,0,0,0.6)", fontFamily: mono, fontWeight: 700, fontSize: 19, color: "#F0CB63", zIndex: 5 }}>paid 36 months straight</div>); })()}
    <div style={{ position: "absolute", right: 30, bottom: 22, opacity: over(lf, fr(1.2), fr(0.5)), fontFamily: mono, fontSize: 17, color: "rgba(235,215,190,0.55)" }}>your real statement →</div>
  </>
);

// B1 — Claude chat: 3 bill PDFs in, gated prompt, then the side-by-side proof
const B1: React.FC<{ lf: number }> = ({ lf }) => {
  const files = [["internet.pdf", 0.35], ["phone.pdf", 0.75], ["insurance.pdf", 1.15]] as const;
  const cmp = over(lf, fr(3.4), fr(0.7), Easing.out(Easing.cubic));     // side-by-side slides in on "digs up"
  const flash = over(lf, fr(7.35), fr(0.35));                            // "like this"
  return (
    <>
      <MoveChip lf={lf} n={1} at={2.7} label="find the gap" />
      <ChatWindow lf={lf} prompt="Compare every charge on these 3 bills to the price new customers get, then " gatedFrom={48} h={388} w={680} x={166}>
        <div style={{ display: "flex", gap: 9, marginTop: 2, position: "relative" }}>
          {files.map(([n, t], i) => { const p = over(lf, fr(t), fr(0.4), Easing.out(Easing.back(1.8))); return (
            <div key={i} style={{ transform: `scale(${p})`, display: "inline-flex", alignItems: "center", gap: 7, padding: "6px 12px", borderRadius: 10, background: "linear-gradient(158deg, #352F27, #241F19)", border: "1.5px solid #4A4238", boxShadow: "inset 0 1.5px 0 rgba(255,241,220,0.10), 0 6px 14px -6px rgba(0,0,0,0.5)" }}>
              <span style={{ fontSize: 16 }}>📄</span><span style={{ fontFamily: mono, fontSize: 16, color: "#D8CDBA" }}>{n}</span><span style={{ color: "#8FE0B0", fontSize: 15, display: "inline-block", transform: `scale(${over(lf, fr(t + 0.55), fr(0.3), Easing.out(Easing.back(2)))})`, textShadow: "0 0 8px rgba(143,224,176,0.8)" }}>✓</span>
            </div>); })}
          <div style={{ position: "absolute", top: -4, bottom: -4, width: 60, left: -80 + over(lf, fr(1.7), fr(1.5), Easing.inOut(Easing.cubic)) * 740, background: "linear-gradient(100deg, transparent, rgba(240,200,140,0.16), transparent)", pointerEvents: "none" }} />
        </div>
        {cmp > 0.02 && (
          <div style={{ marginTop: 6, opacity: cmp, transform: `translateY(${(1 - cmp) * 16}px)` }}>
            <div style={{ display: "flex", gap: 12 }}>
              {[["YOUR BILL", "$89.99", "#D96A55", "Blast! Internet · 400 Mbps"], ["NEW CUSTOMERS", "$49.99", "#57B884", "same plan · xfinity.com/deals"]].map(([h, pr, c, sub], i) => (
                <div key={i} style={{ flex: 1, position: "relative", overflow: i === 1 ? "hidden" : undefined, borderRadius: 12, background: "linear-gradient(158deg, #2B251E, #1A1611)", border: `2.5px solid ${c}`, padding: "6px 12px", boxShadow: flash > 0.05 && i === 1 ? `inset 0 1.5px 0 rgba(255,241,220,0.08), 0 10px 22px -10px rgba(0,0,0,0.6), 0 0 ${22 * flash}px rgba(87,184,132,0.8)` : "inset 0 1.5px 0 rgba(255,241,220,0.08), 0 10px 22px -10px rgba(0,0,0,0.6)", transform: `scale(${1 + (i === 1 ? flash * 0.05 : 0)})` }}>
                  <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 15, color: c as string, marginBottom: 3 }}>{h}</div>
                  <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 32, color: "#F3EADB", lineHeight: 1, position: "relative" }}>
                    {pr}
                    {i === 0 && <div style={{ position: "absolute", left: 0, top: "52%", height: 4, borderRadius: 2, width: `${flash * 100}%`, background: "#D96A55", transform: "rotate(-4deg)", boxShadow: "0 0 8px rgba(217,106,85,0.7)" }} />}
                  </div>
                  <div style={{ fontFamily: mono, fontSize: 13.5, color: "rgba(220,205,180,0.6)", marginTop: 2 }}>{sub}</div>
                  {i === 1 && flash > 0.02 && <div style={{ position: "absolute", top: -6, bottom: -6, width: 44, left: -60 + flash * 380, background: "linear-gradient(105deg, transparent, rgba(255,255,255,0.22), transparent)" }} />}
                </div>
              ))}
            </div>
            {(() => { const gp = over(lf, fr(4.6), fr(0.45), Easing.out(Easing.back(2))); return (
              <div style={{ display: "flex", justifyContent: "center", marginTop: -12, transform: `scale(${gp})` }}>
                <div style={{ padding: "5px 16px", borderRadius: 999, background: grad("#C44A3A", "#992E22"), border: "2.5px solid #E8B7AC", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 22, color: "#fff", boxShadow: "0 10px 24px -8px rgba(0,0,0,0.6)" }}>you overpay $40/mo</div>
              </div>); })()}
          </div>
        )}
      </ChatWindow>
    </>
  );
};

// B2 — price-creep graph ON the bill + insurance renewal stamp
const B2: React.FC<{ lf: number }> = ({ lf }) => {
  const ins = over(lf, fr(6.0), fr(0.6), Easing.out(Easing.cubic));
  return (
    <>
      {/* L0 bloom + L1 parallax $ glyphs filling the right void */}
      <div style={{ position: "absolute", left: 90, top: 70, width: 560, height: 340, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(214,150,90,0.13), transparent 70%)", zIndex: 0 }} />
      <div style={{ position: "absolute", left: 756, top: 70 - lf * 0.14, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 150, color: "rgba(240,203,99,0.09)", filter: "blur(5px)", opacity: (1 - ins) * 0.9, pointerEvents: "none" }}>$</div>
      <div style={{ position: "absolute", left: 872, top: 260 - lf * 0.22, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 110, color: "rgba(240,203,99,0.09)", filter: "blur(5px)", opacity: (1 - ins) * 0.9, pointerEvents: "none" }}>$</div>
      <div style={{ position: "absolute", left: 66, top: 20, transform: `translateX(${ins * -36}px)` }}>
        <BillDoc lf={lf} graph circleAt={3.4} w={600} />
      </div>
      {/* insurance renewal letter */}
      {ins > 0.02 && (
        <div style={{ position: "absolute", right: 44, top: 66, width: 300, opacity: ins, transform: `translateX(${(1 - ins) * 90}px) rotate(3deg)` }}>
          <div style={{ borderRadius: 14, background: "linear-gradient(158deg, #FFFDF8, #F0E9D6)", border: "2px solid #D8D0BE", boxShadow: `${NAVYSH}, inset 0 1.5px 0 rgba(255,255,255,0.85), inset 0 0 0 1px rgba(255,255,255,0.35)`, overflow: "hidden", position: "relative" }}>
            <div style={{ height: 44, background: "#1D6B4F", display: "flex", alignItems: "center", padding: "0 16px" }}>
              <span style={{ fontSize: 20, marginRight: 7 }}>🦎</span><span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 19, color: "#fff", letterSpacing: 0.5 }}>GEKKO <span style={{ fontWeight: 600, opacity: 0.85 }}>insurance</span></span>
            </div>
            <div style={{ padding: "12px 16px" }}>
              <div style={{ fontFamily: mono, fontSize: 14, color: "#8A8272" }}>RENEWAL NOTICE · sample</div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
                <span style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 18, color: "#5E5640" }}>last year</span>
                <span style={{ fontFamily: mono, fontWeight: 700, fontSize: 19, color: "#5E5640" }}>$118/mo</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 18, color: "#20180E" }}>this year</span>
                {(() => { const tk = over(lf, fr(6.5), fr(0.9)); return (
                  <span style={{ fontFamily: mono, fontWeight: 900, fontSize: 21, color: RED, display: "inline-block", transform: `scale(${1 + (tk > 0 && tk < 1 ? 0.22 * Math.abs(Math.sin(tk * Math.PI * 5)) : 0)})`, transformOrigin: "right center" }}>{`$${Math.round(118 + tk * 25)}/mo`}</span>); })()}
              </div>
              {(() => { const sp = over(lf, fr(6.8), fr(0.35), Easing.out(Easing.back(2.4))); return (
                <div style={{ marginTop: 10, display: "inline-block", transform: `rotate(-4deg) scale(${sp})`, padding: "5px 13px", borderRadius: 9, background: "rgba(196,74,58,0.14)", border: `2.5px solid ${RED}`, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 21, color: RED, boxShadow: `0 0 ${8 + 6 * Math.sin(lf / 7)}px rgba(196,74,58,0.4)` }}>+$25/mo · same coverage</div>); })()}
            </div>
            {/* glint sweep on reveal */}
            {(() => { const g = over(lf, fr(7.5), fr(0.6)); return g > 0 && g < 1 ? (
              <div style={{ position: "absolute", top: -20, bottom: -20, width: 70, left: -80 + g * 440, background: "linear-gradient(100deg, transparent, rgba(255,255,255,0.55), transparent)", filter: "blur(6px)", pointerEvents: "none" }} />) : null; })()}
          </div>
        </div>
      )}
    </>
  );
};

// B3 — ranked list (chat output): rows reorder biggest gap first
const B3: React.FC<{ lf: number }> = ({ lf }) => {
  const sortP = over(lf, fr(0.7), fr(0.8), Easing.inOut(Easing.cubic));
  const rows = [
    ["🌐", "xfinity internet", "$40/mo over", 0, "#D96A55"],
    ["🦎", "GEKKO insurance", "$25/mo over", 1, "#CF9544"],
    ["📱", "Vorizon phone", "$8/mo over", 2, "#8FA8C8"],
  ] as const;
  const startOrder = [1, 2, 0];  // pre-sort order → sorted
  const flag = over(lf, fr(2.55), fr(0.4), Easing.out(Easing.back(2)));
  const tot = over(lf, fr(1.2), fr(0.4));
  const shud = lf > fr(2.55) && lf < fr(2.95) ? Math.sin(lf * 2.4) * 3 * (1 - (lf - fr(2.55)) / fr(0.4)) : 0;
  return (
    <>
      <MoveChip lf={lf} n={2} at={0.25} label="rank the damage" />
      {/* L0 bloom + L1 parallax $ glyphs */}
      <div style={{ position: "absolute", left: 506 - 410, top: 20, width: 820, height: 380, background: "radial-gradient(ellipse at center, rgba(207,149,68,0.10), transparent 70%)", zIndex: 0 }} />
      <span style={{ position: "absolute", left: 60 - lf * 0.18, top: 52, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 96, color: "#EFE7DA", opacity: 0.07, filter: "blur(6px)", zIndex: 0 }}>$</span>
      <span style={{ position: "absolute", left: 920 + lf * 0.14, top: 292, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 96, color: "#EFE7DA", opacity: 0.07, filter: "blur(6px)", zIndex: 0 }}>$</span>
      <div style={{ position: "absolute", left: 506 - 390, top: 30, width: 780, zIndex: 2 }}>
        <div style={{ borderRadius: 18, background: grad("#26231F", "#1B1815"), border: "2px solid #3A342C", boxShadow: NAVYSH, overflow: "hidden" }}>
          <div style={{ height: 52, background: "#211E1A", borderBottom: "1px solid #38322A", display: "flex", alignItems: "center", gap: 10, padding: "0 18px" }}>
            <ClaudeLogo lf={lf} size={26} />
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 22, color: "#EFE7DA" }}>your bills, ranked</span>
            <div style={{ flex: 1 }} />
            <span style={{ fontFamily: mono, fontSize: 14, color: "#8C8578", opacity: sortP }}>biggest gap first</span>
          </div>
          <div style={{ position: "relative", height: 240, padding: "10px 14px" }}>
            {rows.map(([ic, name, gap, rank, tone], i) => {
              const y0 = startOrder[i] * 74, y1 = rank * 74;
              const y = y0 + (y1 - y0) * sortP;
              const gl = over(lf, fr(1.55), fr(0.35));
              return (
                <div key={i} style={{ position: "absolute", left: 14, right: 14, top: 10 + y, height: 64, borderRadius: 12, background: rank === 0 ? "linear-gradient(158deg, rgba(217,106,85,0.20), rgba(217,106,85,0.08))" : "linear-gradient(158deg, #2A251F, #1E1A16)", border: `2px solid ${rank === 0 ? "#D96A55" : "#3A342C"}`, boxShadow: "inset 0 1px 0 rgba(255,240,210,0.08), 0 6px 14px -8px rgba(0,0,0,0.6)", overflow: "hidden", display: "flex", alignItems: "center", gap: 12, padding: "0 16px", transform: rank === 0 ? `translateX(${shud}px)` : undefined }}>
                  <span style={{ fontSize: 28, display: "inline-block", transform: rank === 1 ? `rotate(${-14 * over(lf, fr(2.6), fr(0.25))}deg)` : undefined }}>{ic}</span>
                  <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 24, color: "#EFE7DA" }}>{name}</span>
                  <div style={{ flex: 1 }} />
                  <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 27, color: tone as string }}>{gap}</span>
                  {rank === 0 && flag > 0.05 && <div style={{ transform: `scale(${flag})`, padding: "4px 12px", borderRadius: 999, background: grad("#C44A3A", "#992E22"), fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 16, color: "#fff" }}>CALL TONIGHT</div>}
                  {rank === 0 && gl > 0 && gl < 1 && <div style={{ position: "absolute", top: -8, width: 60, height: 80, background: "linear-gradient(90deg, transparent, rgba(255,250,235,0.22), transparent)", transform: `translateX(${-70 + gl * 820}px) skewX(-18deg)` }} />}
                </div>
              );
            })}
          </div>
          <div style={{ height: 54, borderTop: "1px solid #38322A", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, opacity: tot }}>
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 21, color: "#B8AE9C" }}>total leak</span>
            {(() => { const cnt = Math.round(73 * over(lf, fr(1.2), fr(0.55), Easing.out(Easing.cubic))); const tick = Math.abs(Math.sin(cnt * 1.7)) * (cnt < 73 ? 0.1 : 0); const yr = over(lf, fr(1.85), fr(0.3)); return (
              <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 30, color: "#F0CB63" }}>
                <span style={{ display: "inline-block", transform: `scale(${1 + tick})` }}>{`$${cnt}/mo`}</span>
                <span style={{ display: "inline-block", opacity: yr, transform: `scale(${0.7 + yr * 0.3})`, textShadow: "0 0 18px rgba(240,203,99,0.45)" }}>&nbsp;· $876 a year</span>
              </span>); })()}
          </div>
        </div>
      </div>
    </>
  );
};

// B4 — Claude drafts the call script (gated blur on the money line)
const B4: React.FC<{ lf: number }> = ({ lf }) => {
  const lines = [
    ["Hi, I'm calling about my internet bill.", 0.42, false],
    ["I see new customers pay $49.99 for my exact plan.", 1.6, false],
    ["I'd like to cancel my service today, unless…", 2.7, true],
    ["████ ██ █████ ███████ ████ █████ ██████", 3.6, true],
  ] as const;
  return (
    <>
      <MoveChip lf={lf} n={3} at={0.6} label="your call script" />
      <div style={{ position: "absolute", left: 506 - 330, top: 26, width: 660 }}>
        <div style={{ borderRadius: 18, background: grad("#26231F", "#1B1815"), border: "2px solid #3A342C", boxShadow: NAVYSH, overflow: "hidden" }}>
          <div style={{ height: 52, background: "#211E1A", borderBottom: "1px solid #38322A", display: "flex", alignItems: "center", gap: 10, padding: "0 18px" }}>
            <ClaudeLogo lf={lf} size={26} />
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 20, color: "#EFE7DA" }}>call script — internet</span>
            <div style={{ flex: 1 }} />
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 14, color: "#8C8578", padding: "4px 11px", borderRadius: 999, background: "#2E2A24", border: "1px solid #3E382F" }}>word-for-word</span>
          </div>
          <div style={{ padding: "14px 20px 12px" }}>
            {lf < fr(0.42) && <div style={{ display: "flex", gap: 6, padding: "4px 2px 10px" }}>{[0, 1, 2].map((k) => <span key={k} style={{ width: 10, height: 10, borderRadius: "50%", background: "#B8AE9C", opacity: 0.35 + 0.6 * Math.abs(Math.sin(lf / 6 + k)) }} />)}</div>}
            {lines.map(([txt, at, gated], i) => { const p = over(lf, fr(at as number), fr(0.45)); const hl = i === 2; return (
              <div key={i} style={{ marginBottom: 9, opacity: p, transform: `translateY(${(1 - p) * 10}px)`, position: "relative", padding: hl ? "8px 12px" : "2px 0", borderRadius: 10, background: hl ? "rgba(233,180,76,0.14)" : "transparent", border: hl ? "2px solid rgba(233,180,76,0.65)" : "none" }}>
                <span style={{ fontFamily: mono, fontSize: 20, lineHeight: 1.45, color: gated && !hl ? "#B8AE9C" : "#E9E0D2", filter: i === 3 ? "blur(6px)" : hl ? "blur(0px)" : "none" }}>
                  {hl ? (<>
                    <span>I'd like to cancel my service today, unless </span>
                    <span style={{ filter: "blur(5px)", color: "#E9B44C" }}>you can march the new</span>
                  </>) : txt}
                </span>
                {hl && p > 0.7 && <div style={{ position: "absolute", right: -12, top: -16, transform: "rotate(4deg)", padding: "3px 10px", borderRadius: 999, background: grad("#E9B44C", "#C98A20"), fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 14, color: "#3A2705" }}>the magic line 🔒</div>}
              </div>); })}
            {(() => { const p = over(lf, fr(4.3), fr(0.4)); return (
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 999, background: "rgba(217,119,87,0.16)", opacity: p, transform: `scale(${0.8 + p * 0.2})` }}>
                <span style={{ fontSize: 15 }}>🔒</span>
                <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 16, color: "#D97757" }}>full scripts in the guide · comment SLASH</span>
              </div>); })()}
          </div>
        </div>
      </div>
    </>
  );
};

// B5 — monthly auto re-check panel: crept price caught + re-filed
const B5: React.FC<{ lf: number }> = ({ lf }) => {
  const scanP = ramp(lf, fr(0.4), fr(2.2));
  const catchP = over(lf, fr(2.4), fr(0.45), Easing.out(Easing.back(1.6)));
  const fixP = over(lf, fr(3.4), fr(0.45), Easing.out(Easing.cubic));
  const rows = [["🌐 xfinity", "$49.99", "locked ✓", GREEN], ["🦎 GEKKO", "$118/mo", "locked ✓", GREEN], ["📱 Vorizon", "$26 → $34", "creep!", RED]] as const;
  return (
    <>
      <MoveChip lf={lf} n={4} at={0.4} label="auto re-check" />
      <div style={{ position: "absolute", left: 506 - 300, top: 28, width: 600 }}>
        <div style={{ borderRadius: 18, background: grad("#26231F", "#1B1815"), border: "2px solid #3A342C", boxShadow: NAVYSH, overflow: "hidden" }}>
          <div style={{ height: 52, background: "#211E1A", borderBottom: "1px solid #38322A", display: "flex", alignItems: "center", gap: 10, padding: "0 18px" }}>
            <ClaudeLogo lf={lf} size={26} />
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 20, color: "#EFE7DA" }}>monthly re-check</span>
            <div style={{ flex: 1 }} />
            <span style={{ fontFamily: mono, fontSize: 15, color: "#8FE0B0" }}>runs Aug 1 · auto</span>
          </div>
          <div style={{ position: "relative", padding: "12px 16px" }}>
            {/* scan bar */}
            <div style={{ position: "absolute", left: 16, right: 16, top: 12 + Math.min(1, scanP) * 156, height: 40, borderRadius: 10, background: "linear-gradient(180deg, rgba(143,224,176,0.14), transparent)", borderTop: "2px solid rgba(143,224,176,0.7)", opacity: scanP < 1 ? 1 : 0.25 }} />
            {rows.map(([n, pr, st, tone], i) => { const creep = i === 2; return (
              <div key={i} style={{ height: 56, borderRadius: 12, background: creep && catchP > 0.3 ? "rgba(196,74,58,0.13)" : "#221E19", border: `2px solid ${creep && catchP > 0.3 ? RED : "#3A342C"}`, display: "flex", alignItems: "center", gap: 12, padding: "0 16px", marginBottom: 8 }}>
                <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 20, color: "#EFE7DA" }}>{n}</span>
                <div style={{ flex: 1 }} />
                <span style={{ fontFamily: mono, fontWeight: 700, fontSize: 19, color: creep ? (fixP > 0.5 ? "#8FE0B0" : "#F0B4A6") : "#B8AE9C" }}>{creep && fixP > 0.5 ? "$26 restored" : pr}</span>
                <span style={{ padding: "3px 11px", borderRadius: 999, background: creep ? (fixP > 0.5 ? "rgba(76,175,125,0.18)" : "rgba(196,74,58,0.18)") : "rgba(76,175,125,0.12)", border: `2px solid ${creep ? (fixP > 0.5 ? GREEN : RED) : "rgba(76,175,125,0.5)"}`, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 15, color: creep ? (fixP > 0.5 ? "#8FE0B0" : "#F0B4A6") : "#8FE0B0", transform: creep ? `scale(${1 + Math.max(catchP - 0.5, 0) * (1 - fixP) * 0.25})` : "none" }}>{creep ? (fixP > 0.5 ? "re-filed ✓" : "creep!") : st}</span>
              </div>); })}
            <div style={{ display: "flex", justifyContent: "center", marginTop: 2, opacity: over(lf, fr(3.9), fr(0.4)) }}>
              <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 18, color: "#B8AE9C" }}>it never sneaks back up 💪</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// ================================ CTA (full-frame, simple) ================================
const SlashCTA: React.FC<{ lf: number }> = ({ lf }) => {
  const inP = Math.max(0.92, over(lf, 0, fr(0.15), Easing.out(Easing.cubic)));
  const kwP = Math.max(0.7, over(lf, 0, fr(0.35), Easing.out(Easing.back(1.4))));
  const kwPulse = 1 + Math.sin(Math.max(0, lf - fr(0.7)) / 7) * 0.02;
  const cardP = over(lf, fr(0.22), fr(0.4), Easing.out(Easing.cubic));
  const checks = [0.35, 0.55, 0.75];
  const pillsP = over(lf, fr(1.5), fr(0.45), Easing.out(Easing.back(1.8)));
  return (
    <div style={{ position: "absolute", left: 34, right: 34, top: 360, height: 866, borderRadius: 34, background: grad("#2A2118", "#17110B"), boxShadow: NAVYSH, overflow: "hidden", border: "2px solid rgba(210,150,90,0.24)", opacity: inP }}>
      <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 2px 0 rgba(255,241,220,0.07), inset 0 0 150px rgba(0,0,0,0.5)" }} />
      <div style={{ position: "absolute", left: "50%", top: "40%", width: 860, height: 640, marginLeft: -430, marginTop: -320, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(210,120,70,0.15), transparent 70%)", opacity: 0.7 + 0.25 * Math.sin(lf / 20) }} />
      {/* wordmark */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 96, textAlign: "center", transform: `scale(${kwP * kwPulse})` }}>
        <div style={{ position: "relative", display: "inline-block", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 150, color: CLAY, letterSpacing: "-0.02em", lineHeight: 1, textShadow: "0 10px 30px rgba(0,0,0,0.6)" }}>
          SLASH
          <div style={{ position: "absolute", inset: 0, overflow: "hidden", mixBlendMode: "screen" }}>
            <div style={{ position: "absolute", top: 0, bottom: 0, left: `${((lf * 6) % 220) - 60}%`, width: "30%", background: "linear-gradient(100deg, transparent, rgba(255,230,190,0.34), transparent)" }} />
          </div>
          {/* slash strike through */}
          {over(lf, fr(0.55), fr(0.35)) > 0.03 && <svg width="560" height="150" viewBox="0 0 560 150" style={{ position: "absolute", left: -20, top: 0, overflow: "visible" }}>
            <line x1="0" y1="118" x2={538 * over(lf, fr(0.55), fr(0.35), Easing.inOut(Easing.cubic))} y2="38" stroke="#F0CB63" strokeWidth="10" strokeLinecap="round" style={{ filter: "drop-shadow(0 0 14px rgba(240,203,99,0.8))" }} />
          </svg>}
        </div>
      </div>
      {/* guide card */}
      <div style={{ position: "absolute", left: "50%", top: 306, transform: `translateX(-50%) translateY(${(1 - cardP) * 30}px)`, width: 640, opacity: cardP }}>
        <div style={{ borderRadius: 22, overflow: "hidden", background: "#FDFBF6", boxShadow: NAVYSH, border: "2px solid #E4DCC8" }}>
          <div style={{ height: 78, background: grad("#E9825C", "#C7541F"), display: "flex", alignItems: "center", padding: "0 24px", gap: 12 }}>
            <ClaudeLogo lf={lf} size={32} />
            <div>
              <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 18, color: "rgba(255,255,255,0.85)" }}>THE SLASH GUIDE</div>
              <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 25, color: "#fff" }}>4 prompts + the call scripts</div>
            </div>
          </div>
          <div style={{ padding: "14px 24px 16px" }}>
            {["the 4 word-for-word prompts", "call scripts: internet · phone · insurance", "the monthly re-check automation"].map((t, i) => { const p = over(lf, fr(checks[i]), fr(0.35), Easing.out(Easing.back(1.8))); return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8, opacity: Math.min(1, p * 1.4) }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: grad("#57B884", "#2E7D5B"), display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: 19, transform: `scale(${p})` }}>✓</div>
                <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 24, color: "#33291A" }}>{t}</span>
              </div>); })}
          </div>
        </div>
      </div>
      {/* pills */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 636, display: "flex", justifyContent: "center", gap: 20, transform: `scale(${pillsP})` }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 999, background: "rgba(255,251,243,0.12)", border: "2.5px solid rgba(240,203,99,0.7)", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 27, color: "#F3E8D6" }}>🔖 save this</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 999, background: grad("#E9825C", "#C7541F"), border: "2.5px solid #F3B292", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 27, color: "#fff", boxShadow: "0 0 26px rgba(233,130,92,0.5)" }}>💬 comment SLASH</span>
      </div>
      {/* mascot */}
      <div style={{ position: "absolute", left: "50%", top: 742, transform: "translateX(-50%)" }}>
        <Mascot lf={lf} size={104} cheer={1} nodAmp={3} />
      </div>
    </div>
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
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 42, letterSpacing: -0.5, color: INK, textAlign: "center" }}>Claude can cut your bills by <span style={{ color: CLAY }}>$500 a year</span> 💸</span>
      </div>
    </div>
  );
};

const ProgressBar: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const VIRT = 33.37;
  const p = Math.min(1, t / VIRT);
  const marks = [10.87, 19.13, 28.27];
  const STARS = [3.8, 14.5, 23.0, 40.0];
  const TOTAL = VIRT;
  const PELLETS = [3, 7, 13, 16, 21, 26, 31, 40];
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
        const wake = interpolate(t, [30.9, 33.37], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const opened = t >= 33.6; const od = Math.max(0, t - 33.6);
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
      {(() => { const cheerV = Math.max(t >= L[6] ? 1 : 0, incPop * 0.75); return (
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
export const ClaudeSlashReel: React.FC = () => {
  const frame = useCurrentFrame();
  let punch = 0;
  for (const b of Lf.slice(1)) { const d = frame - b; if (d >= 0 && d < 9) punch = Math.max(punch, Math.pow(1 - d / 9, 2)); }
  const KICKS = [0.8, L[1] + 3.5, L[1] + 7.48, L[2] + 3.6, L[2] + 7.2, L[3] + 2.6, L[4] + 4.2, L[5] + 2.9, CUT - 2.6, CUT - 1.4];
  for (const k of KICKS) { const d = frame - fr(k); if (d >= 0 && d < 7) punch = Math.max(punch, Math.pow(1 - d / 7, 2) * 0.7); }
  const zoom = interpolate(frame, [0, 16, 28], [1.0, 1.02, 1.0], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) }) + punch * 0.028;
  const scene = (i: number) => frame >= Lf[i] && (i === Lf.length - 1 || frame < Lf[i + 1]);
  const As = [A0, A1, A2, A3, A4, A5];
  const ATHEME = [[CORAL, SUN, TEAL], [TEAL, SKY, SUN], [ROSE, GRAPE, SUN], [SUN, AMBER, MINT], [GREEN, SUN, SKY], [TEAL, MINT, SKY]];
  const Bs = [B0, B1, B2, B3, B4, B5];
  
  const BLAB = ["your real bill", "claude · fable 5", "", "claude · fable 5", "claude · fable 5", "autopilot"];
  return (
    <AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
      <Audio src={staticFile("slash_vo.wav")} />
      <Audio loop src={staticFile("erase_bed.wav")} volume={(ff) => interpolate(ff, [0, fr(0.5), fr(CUT) - 20, fr(CUT), 99999], [0.17, 0.17, 0.17, 0.06, 0.06], { extrapolateRight: "clamp" })} />
      {/* ==== SFX (cheat-sheet: whoosh=zoom | pop+click=pop-up | riser=suspense | camera-shutter=transition | magic-reveal=reveal) ==== */}
      <Sfx at={0} src="lib_deep_whoosh.wav" v={0.72} dur={0.9} />
      <Sfx at={0.16} src="lib_boom.wav" v={0.5} dur={1.4} />
      <Sfx at={0.05} src="lib_whoosh.wav" v={0.4} dur={0.5} />
      <Sfx at={0.02} src="boing.wav" v={0.34} dur={0.5} />
      <Sfx at={0.62} src="slash.wav" v={0.62} dur={0.5} />
      <Sfx at={0.62} src="lib_whoosh_fast.wav" v={0.44} dur={0.4} />
      <Sfx at={0.9} src="crash.wav" v={0.4} dur={0.7} />
      <Sfx at={0.9} src="lib_cinematic_hit.wav" v={0.42} dur={0.9} />
      <Sfx at={0.78} src="vine_boom.wav" v={0.6} dur={0.9} />
      <Sfx at={0.85} src="lib_pop.wav" v={0.36} dur={0.6} />
      <Sfx at={1.0} src="sparkle.wav" v={0.3} dur={0.7} />
      <Sfx at={1.2} src="cash-register.mp3" v={0.4} dur={1.2} />
      <Sfx at={1.15} src="ding.wav" v={0.26} dur={0.5} />
      {/* transitions: riser into each cut + shutter on the cut */}
      {[L[1], L[2], L[3], L[4], L[5], L[6]].map((tt, i) => <React.Fragment key={`tr${i}`}><Sfx at={tt - 1.5} src="lib_riser.wav" v={0.46} dur={1.5} /><Sfx at={tt} src="lib_camera_shutter.wav" v={0.48} dur={0.5} /><Sfx at={tt + 0.02} src="lib_whoosh.wav" v={0.3} dur={0.6} /></React.Fragment>)}
      {/* S1: files whoosh in + typing + side-by-side reveal on "like this" */}
      {[0.35, 0.75, 1.15].map((d, i) => <Sfx key={`f${i}`} at={L[1] + d} src="lib_whoosh_fast.wav" v={0.3} dur={0.5} />)}
      <Sfx at={L[1] + 0.15} src="lib_typing.wav" v={0.3} dur={2.2} />
      <Sfx at={L[1] + 3.4} src="lib_pop2.wav" v={0.36} />
      <Sfx at={L[1] + 4.7} src="cash-register.mp3" v={0.36} dur={1.2} />
      <Sfx at={L[1] + 7.4} src="lib_magic_reveal.wav" v={0.44} dur={1.0} /><Sfx at={L[1] + 7.5} src="ding.wav" v={0.32} />
      {/* S2: creep steps tick + insurance stamp */}
      <Sfx at={L[2] + 6.05} src="vine_boom.wav" v={0.4} dur={0.9} />
      <Sfx at={L[2] + 0.5} src="digital-loading.wav" v={0.18} dur={2.4} />
      <Sfx at={L[2] + 7.1} src="lib_whoosh.wav" v={0.36} dur={0.5} />
      <Sfx at={L[2] + 7.9} src="lib_pop.wav" v={0.34} dur={0.6} />
      {/* S3: podium hops + crown + flag */}
      {[0.5, 1.18].map((d, i) => <Sfx key={`h${i}`} at={L[3] + d} src="lib_pop.wav" v={0.32} dur={0.6} />)}
      <Sfx at={L[3] + 1.15} src="lib_magic_reveal.wav" v={0.36} dur={0.8} />
      <Sfx at={L[3] + 1.2} src="crowd_cheers2.wav" v={0.2} dur={1.4} />
      {[1.35, 1.95].map((d, i) => <Sfx key={`pz${i}`} at={L[3] + d} src="lib_camera_shutter.wav" v={0.2} dur={0.45} />)}
      <Sfx at={L[3] + 2.55} src="lib_cinematic_hit.wav" v={0.34} />
      <Sfx at={L[3] + 1.2} src="vine_boom.wav" v={0.4} dur={0.9} />
      {/* S4: script typing + waves + price-drop ding */}
      <Sfx at={L[4] + 0.3} src="lib_mactype.wav" v={0.34} dur={3.6} />
      <Sfx at={L[4] + 3.9} src="lib_whoosh_fast.wav" v={0.36} dur={0.4} />
      <Sfx at={L[4] + 4.25} src="lib_correct.wav" v={0.42} dur={0.6} /><Sfx at={L[4] + 4.32} src="cash-register.mp3" v={0.4} dur={1.2} /><Sfx at={L[4] + 4.5} src="sparkle.wav" v={0.26} dur={0.7} />
      {/* S5: radar sweep + catch zap */}
      <Sfx at={L[5] + 0.4} src="digital-loading.wav" v={0.16} dur={2.0} />
      <Sfx at={L[5] + 2.85} src="lib_whoosh_fast.wav" v={0.34} dur={0.3} />
      <Sfx at={L[5] + 2.95} src="bonk.mp3" v={0.4} dur={0.9} />
      <Sfx at={L[5] + 3.0} src="boing.wav" v={0.3} dur={0.4} />
      <Sfx at={L[5] + 3.15} src="lib_correct.wav" v={0.34} dur={0.5} />
      <Sfx at={L[5] + 3.3} src="sparkle.wav" v={0.24} dur={0.6} />
      {/* CTA */}
      <Sfx at={L[6] + 0.1} src="lib_magic_reveal.wav" v={0.46} dur={1.1} />
      <Sfx at={L[6] + 0.62} src="vine_boom.wav" v={0.5} dur={0.9} />
      <Sfx at={L[6] + 0.8} src="lib_whoosh_fast.wav" v={0.36} dur={0.4} />
      {[0.95, 1.25, 1.55].map((d, i) => <Sfx key={`k${i}`} at={L[6] + d} src="ding.wav" v={0.32} dur={0.4} />)}
      <Sfx at={L[6] + 1.55} src="sparkle.wav" v={0.32} dur={0.8} />
      <Sfx at={L[6] + 2.4} src="chimehi.wav" v={0.22} dur={0.6} />
      
      <Bg />
      <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "50% 46%" }}>
        {[0, 1, 2, 3, 4, 5].map((i) => scene(i) ? (
          <React.Fragment key={i}>
            <PanelShell top={A_TOP} light theme={ATHEME[i]}>{React.createElement(As[i], { lf: frame - Lf[i] })}</PanelShell>
            <PanelShell top={B_TOP} label={BLAB[i]} tint="rgba(120,150,210,0.28)">{React.createElement(Bs[i], { lf: frame - Lf[i] })}</PanelShell>
          </React.Fragment>
        ) : null)}
        {scene(6) ? <SlashCTA lf={frame - Lf[6]} /> : null}
        <Captions />
      </AbsoluteFill>
      <HeroHeader f={frame} />
      <ProgressBar />
      {(() => { let fl = 0; for (const b of Lf.slice(1)) { const d = frame - b; if (d >= 0 && d < 7) fl = Math.max(fl, Math.pow(1 - d / 7, 2)); } return fl > 0 ? <AbsoluteFill style={{ background: "#FFF6E6", opacity: fl * 0.5, zIndex: 200, pointerEvents: "none" }} /> : null; })()}
    </AbsoluteFill>
  );
};
