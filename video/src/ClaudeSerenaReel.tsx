import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing, Audio, Sequence, staticFile, Img } from "remotion";
import { fraunces, inter } from "./fonts";
import words from "./data/words_serena.json";

/* ============================================================ ARSENAL (reel 69)
   4 free GitHub repos that upgrade Claude. Cinematic gear-up arc, cloned from
   the CALLBACK chassis (Panel/Mascot/ScreenHead/ProgressBar/Captions verbatim). */

const CREAM = "#ECE9E2", INK = "#1A1813", SLATE = "#3A5C84", CLAY = "#D2724E", AMBER = "#CF9544", GOLD = "#E7B24C", GREEN = "#3F9E74", MUTE = "#9A968B", RED = "#C44A3A";
const TERM = "#0E1626", TERM2 = "#0A1120", PAPER = "#F7F3EA";
const mono = "ui-monospace,'SF Mono',Menlo,monospace";
const FPS = 30;
const fr = (s: number) => Math.round(s * FPS);
const grad = (a: string, b: string) => `linear-gradient(158deg, ${a} 0%, ${b} 100%)`;
const NAVYSH = "0 34px 66px -22px rgba(18,28,58,0.55), 0 10px 24px rgba(18,28,58,0.30)";

// scene onsets (sec, VO audible starts): hook, vault, router, repomix, graphiti, taskmaster, cta
const L = [0.0, 11.6635, 20.4327, 25.25, 32.7212, 36.3173, 40.5577]; // Serena hook/problem/card/mech/analogy/scale/payoff+cta
const Lf = L.map(fr);
const CUT = 50.106; // hard cut ~0.1s after "comment SERENA"
const CLOCK_START = CUT - 3.4;

const SERENA = { handle: "oraios/serena", owner: "oraios", repo: "serena", stars: "26.6k", name: "Serena", desc: "A powerful MCP toolkit for coding \u2014 semantic retrieval and editing, the IDE for your agent.", lang: "Python", langC: "#3572A5", logo: "refs/serena_mark.png" };
const REPOS = [SERENA, SERENA, SERENA, SERENA];
// real fact-checked screenshots of the live oraios/serena page
const SHOT = { repo: "refs/serena_repo.png", header: "refs/serena_header.png", readme: "refs/serena_readme.png", diagram: "refs/serena_diagram.png", langs: "refs/serena_langs.png", install: "refs/serena_install.png" };
const GH_LOGO = "logos/ar_github.png";
// warm house palette (NO neon)
const WARM = { cream: "#F3ECDD", card: "#FBF7EE", ink: "#231C12", sub: "#8A7B62", line: "#E5DBC6", wood1: "#4A3A28", wood2: "#2A2012", lampGold: "#FFD489" };

const over = (f: number, start: number, dur: number, ease = Easing.out(Easing.cubic)) =>
  interpolate(f, [start, start + dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
const ramp = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const seed = (n: number) => { const x = Math.sin(n * 127.1 + 43.7) * 43758.5453; return x - Math.floor(x); };
const CL = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
// a short white streak on a hard shot-cut so it reads as intentional editing
const CutFlash: React.FC<{ lf: number; at: number }> = ({ lf, at }) => { const d = lf - at; return d >= 0 && d < 4 ? <div style={{ position: "absolute", inset: 0, background: "#EAF2FF", opacity: (1 - d / 4) * 0.3, zIndex: 80, pointerEvents: "none" }} /> : null; };
// a small clay hand (for the buried-hero gag)
const ClayHand: React.FC<{ x: number; y: number; s?: number; wave?: number }> = ({ x, y, s = 40, wave = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: s, height: s * 1.4, transform: `rotate(${wave}deg)`, transformOrigin: "50% 100%", zIndex: 30 }}>
    <div style={{ position: "absolute", left: s * 0.3, top: s * 0.5, width: s * 0.4, height: s * 0.9, background: "#D97757", borderRadius: 4 }} />
    <div style={{ position: "absolute", left: s * 0.16, top: 0, width: s * 0.68, height: s * 0.6, background: "#D97757", borderRadius: "6px 6px 3px 3px" }} />
    {[0.22, 0.42, 0.62].map((f, i) => <div key={i} style={{ position: "absolute", left: s * f, top: -s * 0.1, width: s * 0.14, height: s * 0.28, background: "#D97757", borderRadius: 3 }} />)}
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

// pixel Claude mascot (canonical critter) + costumes - verbatim from CALLBACK chassis
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

const FEET = 0.92;
const Critter: React.FC<{ lf: number; x: number; groundY: number; size: number; shadow?: number; dim?: number } & Record<string, any>> = ({ lf, x, groundY, size, shadow = 1, dim = 0, ...rest }) => (
  <>
    <div style={{ position: "absolute", left: x - size * 0.56, top: groundY - 15, width: size * 1.12, height: 30, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(0,0,0,0.55), transparent 70%)", opacity: 0.7 * shadow, zIndex: 1 }} />
    <div style={{ position: "absolute", left: x - size * 0.31, top: groundY - 13, width: size * 0.62, height: 18, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(0,0,0,0.75), transparent 66%)", opacity: 0.85 * shadow, zIndex: 1 }} />
    <div style={{ position: "absolute", left: x - size / 2, top: groundY - size * FEET, width: size, height: size, zIndex: 5, filter: dim ? `grayscale(${dim}) brightness(${1 - dim * 0.32})` : undefined }}>
      <Mascot lf={lf} size={size} {...rest} />
    </div>
  </>
);

// wall-mounted repo monitor (a real prop in the room): handle + ★stars
const Monitor: React.FC<{ lf: number; x: number; y: number; w: number; repo: { handle: string; stars: string }; inAt?: number }> = ({ lf, x, y, w, repo, inAt = 0.2 }) => {
  const p = over(lf, fr(inAt), fr(0.5), Easing.out(Easing.back(1.2)));
  const h = w * 0.4;
  if (p <= 0.01) return null;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, transform: `scale(${p})`, transformOrigin: "50% 0%", opacity: Math.min(1, p * 1.4), zIndex: 22 }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 14, background: "linear-gradient(180deg,#0B1424,#070C16)", border: "3px solid #24324C", boxShadow: "0 12px 30px rgba(0,0,0,0.6), inset 0 0 26px rgba(0,0,0,0.5)" }} />
      <div style={{ position: "absolute", left: 14, top: 12, display: "flex", gap: 7 }}>{[RED, AMBER, GREEN].map((c, i) => <div key={i} style={{ width: 9, height: 9, borderRadius: "50%", background: c, opacity: 0.85 }} />)}</div>
      <div style={{ position: "absolute", left: 16, right: 16, top: 34, fontFamily: mono, fontSize: h * 0.14, color: "#8FB4E6", letterSpacing: 0.4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{repo.handle}</div>
      <div style={{ position: "absolute", left: 16, top: 34 + h * 0.24, display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ color: GOLD, fontSize: h * 0.26, lineHeight: 1 }}>★</span>
        <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: h * 0.26, color: "#F4EEDF" }}>{repo.stars}</span>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: h * 0.12, color: "#6E88AE", marginTop: h * 0.08 }}>stars</span>
      </div>
    </div>
  );
};

// real repo logo on a light chip (so the baked-bg Zep/taskmaster logos still read on the dark facility)
const RepoLogo: React.FC<{ src: string; w: number; h?: number; pad?: number; radius?: number }> = ({ src, w, h = w, pad = 0.18, radius = 0.22 }) => (
  <div style={{ width: w, height: h, borderRadius: Math.min(w, h) * radius, background: "#F7F3EA", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 16px rgba(0,0,0,0.45)", border: "2px solid rgba(255,255,255,0.55)", overflow: "hidden" }}>
    <Img src={staticFile(src)} style={{ width: w * (1 - pad), height: h * (1 - pad), objectFit: "contain" }} />
  </div>
);

// ===== a real GitHub REPO CARD (owner/repo, description, ★stars, language, Star button) - shown for each repo =====
const GitHubCard: React.FC<{ lf: number; repo: any; x: number; y: number; w?: number; inAt?: number; scale?: number }> = ({ lf, repo, x, y, w = 588, inAt = 0, scale = 1 }) => {
  const p = over(lf, fr(inAt), fr(0.42), Easing.out(Easing.back(1.15)));
  if (p <= 0.01) return null;
  const starDelta = lf - fr(inAt + 0.55);
  const starPop = starDelta >= 0 ? 1 + Math.max(0, 1 - starDelta * 0.13) * 0.4 : 1;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, transform: `translateY(${(1 - p) * 28}px) scale(${scale})`, opacity: Math.min(1, p * 1.5), transformOrigin: "50% 0%", zIndex: 44 }}>
      <div style={{ borderRadius: 18, background: WARM.card, border: `1px solid ${WARM.line}`, boxShadow: "0 26px 54px -18px rgba(28,18,8,0.55)", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "18px 22px 12px" }}>
          <div style={{ width: 54, height: 54, borderRadius: 13, background: "#fff", border: `1px solid ${WARM.line}`, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexShrink: 0 }}><Img src={staticFile(repo.logo)} style={{ width: 38, height: 38, objectFit: "contain" }} /></div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <Img src={staticFile(GH_LOGO)} style={{ width: 18, height: 18, objectFit: "contain" }} />
              <span style={{ fontFamily: mono, fontSize: 19, color: WARM.sub, whiteSpace: "nowrap" }}>{repo.owner}/<span style={{ color: "#2A6FDB", fontWeight: 700 }}>{repo.repo}</span></span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "8px 14px", borderRadius: 10, background: "#EFE9DB", border: `1px solid ${WARM.line}`, flexShrink: 0 }}>
            <span style={{ color: "#E0A008", fontSize: 18 }}>★</span><span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 18, color: WARM.ink }}>Star</span>
          </div>
        </div>
        <div style={{ padding: "0 22px 15px", fontFamily: inter.fontFamily, fontWeight: 500, fontSize: 23, color: "#4C4234", lineHeight: 1.32 }}>{repo.desc}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 24, padding: "13px 22px", borderTop: `1px solid ${WARM.line}`, background: "#F5EFE2" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ width: 15, height: 15, borderRadius: "50%", background: repo.langC, display: "inline-block" }} /><span style={{ fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 21, color: "#4C4234" }}>{repo.lang}</span></div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, transform: `scale(${starPop})`, transformOrigin: "0% 50%" }}><span style={{ color: "#E0A008", fontSize: 24 }}>★</span><span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 24, color: WARM.ink }}>{repo.stars}</span><span style={{ fontFamily: inter.fontFamily, fontWeight: 500, fontSize: 19, color: WARM.sub }}>stars</span></div>
        </div>
      </div>
    </div>
  );
};

// ===== RealShot - a GENUINE Serena screenshot dropped into the scene on a framed mac screen prop =====
// pan/zoom over the real capture (focus = fraction of image height centered; scale>=1 zooms) + optional highlight box.
const SHOT_AR: Record<string, number> = { repo: 3000 / 2560, header: 900 / 2560, readme: 3400 / 2560, diagram: 1500 / 2560, langs: 1500 / 2560, install: 1050 / 2560 };
const RealShot: React.FC<{ lf: number; shot: keyof typeof SHOT; x: number; y: number; w: number; vh: number; focus?: number; scale?: number; focusX?: number; inAt?: number; url?: string; hi?: { x: number; y: number; w: number; h: number; at: number; label?: string; color?: string; lblSide?: "top" | "bottom" } }> = ({ lf, shot, x, y, w, vh, focus = 0.5, scale = 1, focusX = 0.5, inAt = 0, url = "github.com/oraios/serena", hi }) => {
  const p = over(lf, fr(inAt), fr(0.44), Easing.out(Easing.back(1.12)));
  if (p <= 0.01) return null;
  const ar = SHOT_AR[shot]; const dispW = w * scale; const dispH = dispW * ar; const chrome = 46;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, transform: `translateY(${(1 - p) * 30}px) scale(${p})`, opacity: Math.min(1, p * 1.5), transformOrigin: "50% 0%", zIndex: 44 }}>
      <div style={{ borderRadius: 16, overflow: "hidden", background: "#0D1117", boxShadow: "0 30px 60px -18px rgba(10,16,30,0.7), 0 0 0 3px rgba(120,150,210,0.18)" }}>
        <div style={{ height: chrome, background: "#E9E6DF", display: "flex", alignItems: "center", padding: "0 16px", gap: 8, borderBottom: "1px solid #d6d2c9" }}>
          <div style={{ display: "flex", gap: 7 }}>{[RED, AMBER, GREEN].map((c) => <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />)}</div>
          <div style={{ flex: 1, marginLeft: 12, height: 26, borderRadius: 7, background: "#fff", display: "flex", alignItems: "center", padding: "0 14px", fontFamily: inter.fontFamily, fontSize: 15, fontWeight: 500, color: "#6b6b6b", border: "1px solid #dcdcdc" }}>🔒 {url}</div>
        </div>
        <div style={{ position: "relative", height: vh, overflow: "hidden" }}>
          <Img src={staticFile(SHOT[shot])} style={{ position: "absolute", width: dispW, height: dispH, left: w / 2 - focusX * dispW, top: vh / 2 - focus * dispH }} />
          {hi && (() => { const hp = ramp(lf, fr(inAt) + hi.at, fr(inAt) + hi.at + 12); if (hp <= 0) return null; const col = hi.color || CLAY;
            return (<div style={{ position: "absolute", left: hi.x, top: hi.y, width: hi.w, height: hi.h * hp, borderRadius: 10, border: `4px solid ${col}`, boxShadow: `0 0 22px ${col}99, inset 0 0 16px ${col}33`, opacity: hp }}>
              {hi.label && hp > 0.6 && <div style={{ position: "absolute", left: -2, [hi.lblSide || "top"]: -40, padding: "4px 12px", borderRadius: 8, background: grad("#26221C", "#15120E"), color: "#F4EFE6", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 20, whiteSpace: "nowrap", borderLeft: `3px solid ${col}` }}>{hi.label}</div>}
            </div>); })()}
        </div>
      </div>
    </div>
  );
};

// ===== DEN - a warm, cozy, NON-NEON room (SIMULATE-style): warm wood, soft lamp, soft vignette =====
const Den: React.FC<{ lf: number; wall1?: string; wall2?: string; floor1?: string; floor2?: string; lampX?: number; lampC?: string }> = ({ lf, wall1 = WARM.wood1, wall2 = WARM.wood2, floor1 = "#3A2C1C", floor2 = "#140D06", lampX = 150, lampC = "rgba(255,206,122," }) => (
  <>
    <div style={{ position: "absolute", inset: 0, background: `radial-gradient(132% 92% at 46% 38%, ${wall1} 0%, ${wall2} 60%, #160F08 100%)` }} />
    <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", left: 0, top: 0 }}>
      <defs><linearGradient id="denFloor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={floor1} /><stop offset="1" stopColor={floor2} /></linearGradient></defs>
      {[150, 250, 350, 450].map((y) => <line key={y} x1={0} y1={y} x2={1012} y2={y} stroke="#1A120A" strokeWidth={2} opacity={0.35} />)}
      {[190, 470, 790].map((x) => <line key={x} x1={x} y1={90} x2={x} y2={558} stroke="#231810" strokeWidth={2} opacity={0.28} />)}
      <rect x={0} y={560} width={1012} height={232} fill="url(#denFloor)" />
      <rect x={0} y={557} width={1012} height={3} fill="#5A4630" />
      {[100, 300, 506, 712, 912].map((x) => <line key={x} x1={x} y1={560} x2={x} y2={792} stroke="#20160C" strokeWidth={2} opacity={0.3} />)}
    </svg>
    <div style={{ position: "absolute", left: lampX - 260, top: 100, width: 520, height: 520, borderRadius: "50%", background: `radial-gradient(circle, ${lampC}${0.15 + Math.sin(lf / 24) * 0.015}), transparent 60%)`, filter: "blur(10px)" }} />
    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(100% 82% at 50% 46%, transparent 42%, rgba(18,11,5,0.58) 100%)", pointerEvents: "none" }} />
  </>
);

// ===== CINEMATIC ROOM - one-point-perspective set with depth, reflective floor, rich lighting =====
// Panel-local 1012×792. Vanishing point ~ (506, 300). This is the reference-grade backdrop for every scene.
const VP = { x: 506, y: 296 };
const CineRoom: React.FC<{ lf: number; wallA: string; wallB: string; floorA: string; floorB: string; accent?: string; warm?: number; fogC?: string; seed0?: number }> = ({ lf, wallA, wallB, floorA, floorB, accent = "#3A78C0", warm = 0.5, fogC = "#0B1220", seed0 = 0 }) => {
  const bx0 = 372, bx1 = 640, by0 = 168, by1 = 452;   // the far "back wall" rectangle (end of the corridor)
  return (
    <>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(120% 90% at 50% 42%, ${wallA} 0%, ${wallB} 52%, ${fogC} 100%)` }} />
      <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", left: 0, top: 0 }}>
        <defs>
          <linearGradient id={`crWallL${seed0}`} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor={wallB} /><stop offset="1" stopColor={wallA} /></linearGradient>
          <linearGradient id={`crWallR${seed0}`} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor={wallA} /><stop offset="1" stopColor={wallB} /></linearGradient>
          <linearGradient id={`crFloor${seed0}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={floorA} /><stop offset="0.5" stopColor={floorB} /><stop offset="1" stopColor="#05070d" /></linearGradient>
          <linearGradient id={`crCeil${seed0}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#05070d" /><stop offset="1" stopColor={wallB} /></linearGradient>
          <radialGradient id={`crSheen${seed0}`} cx="0.5" cy="0" r="0.9"><stop offset="0" stopColor={warm > 0.4 ? "#E7B24C" : accent} stopOpacity="0.16" /><stop offset="1" stopColor="#000" stopOpacity="0" /></radialGradient>
        </defs>
        {/* ceiling */}
        <polygon points={`0,0 1012,0 ${bx1},${by0} ${bx0},${by0}`} fill={`url(#crCeil${seed0})`} />
        {/* side walls (recede to the back rect) */}
        <polygon points={`0,0 ${bx0},${by0} ${bx0},${by1} 0,792`} fill={`url(#crWallL${seed0})`} />
        <polygon points={`1012,0 ${bx1},${by0} ${bx1},${by1} 1012,792`} fill={`url(#crWallR${seed0})`} />
        {/* back wall */}
        <rect x={bx0} y={by0} width={bx1 - bx0} height={by1 - by0} fill={wallB} />
        <rect x={bx0} y={by0} width={bx1 - bx0} height={10} fill="#0A1120" opacity={0.6} />
        {/* wall panel lines converging to VP (left + right + back) */}
        {[0.22, 0.46, 0.72].map((f, i) => { const ly = by0 + (by1 - by0) * 0.05 + f * (792 - by0) * 0.5; return (
          <g key={i}>
            <line x1={0} y1={f * 792} x2={bx0} y2={by0 + f * (by1 - by0)} stroke="#0A0F1C" strokeWidth={2} opacity={0.5} />
            <line x1={1012} y1={f * 792} x2={bx1} y2={by0 + f * (by1 - by0)} stroke="#0A0F1C" strokeWidth={2} opacity={0.5} />
          </g>); })}
        {/* vertical wall studs */}
        {[80, 200, 320].map((x) => <line key={x} x1={x} y1={x / 320 * by0} x2={x} y2={792 - x / 320 * (792 - by1)} stroke="#0A0F1C" strokeWidth={2} opacity={0.35} />)}
        {[692, 812, 932].map((x) => <line key={x} x1={x} y1={(1012 - x) / 320 * by0} x2={x} y2={792 - (1012 - x) / 320 * (792 - by1)} stroke="#0A0F1C" strokeWidth={2} opacity={0.35} />)}
        {/* neon rim strips along the wall-floor seam (CHART look) */}
        <polyline points={`0,${by1 + 150} ${bx0},${by1}`} fill="none" stroke={accent} strokeWidth={5} opacity={0.5} style={{ filter: `drop-shadow(0 0 6px ${accent})` }} />
        <polyline points={`1012,${by1 + 150} ${bx1},${by1}`} fill="none" stroke={accent} strokeWidth={5} opacity={0.5} style={{ filter: `drop-shadow(0 0 6px ${accent})` }} />
        {/* FLOOR (reflective) */}
        <polygon points={`0,792 ${bx0},${by1} ${bx1},${by1} 1012,792`} fill={`url(#crFloor${seed0})`} />
        <polygon points={`0,792 ${bx0},${by1} ${bx1},${by1} 1012,792`} fill={`url(#crSheen${seed0})`} />
        {/* floor grid receding to VP */}
        {[-1, -0.62, -0.32, 0.32, 0.62, 1].map((d, i) => <line key={i} x1={VP.x + d * 506} y1={792} x2={bx0 + (d * 0.5 + 0.5) * (bx1 - bx0)} y2={by1} stroke="#0A0F1C" strokeWidth={2.5} opacity={0.4} />)}
        {[0.2, 0.5, 0.8].map((f, i) => { const y = by1 + f * (792 - by1); const w = (f) * 506; return <line key={i} x1={VP.x - 506 * f} y1={y} x2={VP.x + 506 * f} y2={y} stroke="#0A0F1C" strokeWidth={2} opacity={0.28} />; })}
      </svg>
      {/* atmospheric haze planes */}
      <div style={{ position: "absolute", left: 0, right: 0, top: by1 - 40, height: 120, background: `linear-gradient(180deg, ${fogC}00, ${fogC}66)`, filter: "blur(6px)", pointerEvents: "none" }} />
      {/* dust motes drifting in the light */}
      {Array.from({ length: 10 }).map((_, i) => { const s = seed(i * 4 + 2 + seed0); const x = 200 + s * 620; const y = ((seed(i * 2.1 + seed0) * 460 + lf * (0.25 + s * 0.4)) % 460) + 220; return <div key={i} style={{ position: "absolute", left: x, top: y, width: 3, height: 3, borderRadius: "50%", background: warm > 0.4 ? "#FFE9B8" : "#BFE3FF", opacity: 0.18 + s * 0.16 }} />; })}
      {/* vignette */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(96% 78% at 50% 46%, transparent 40%, rgba(0,0,0,0.66) 100%)", pointerEvents: "none" }} />
    </>
  );
};

// a floor reflection of a hero object: pass the same JSX, flipped + faded (cheap wet-floor look)
const Reflect: React.FC<{ x: number; groundY: number; w: number; h: number; children: React.ReactNode; op?: number }> = ({ x, groundY, w, h, children, op = 0.22 }) => (
  <div style={{ position: "absolute", left: x, top: groundY, width: w, height: h, transform: "scaleY(-1)", transformOrigin: "50% 0%", opacity: op, WebkitMaskImage: "linear-gradient(180deg, rgba(0,0,0,0.9), transparent 75%)", maskImage: "linear-gradient(180deg, rgba(0,0,0,0.9), transparent 75%)", filter: "blur(2px)", pointerEvents: "none", zIndex: 2 }}>{children}</div>
);

// hanging work lamp: fixture + bulb + warm cone + floor pool
const Lamp: React.FC<{ lf: number; x: number; drop?: number; color?: string; on?: number; coneY?: number }> = ({ lf, x, drop = 150, color = "#FFE9A8", on = 1, coneY = 560 }) => {
  const flick = on * (0.9 + 0.1 * Math.abs(Math.sin(lf / 11)));
  return (
    <div style={{ position: "absolute", left: x - 60, top: 70, width: 120, height: coneY, zIndex: 6, pointerEvents: "none" }}>
      <div style={{ position: "absolute", left: 58, top: 0, width: 4, height: drop - 30, background: "#1A2332" }} />
      <div style={{ position: "absolute", left: 24, top: drop - 34, width: 72, height: 30, borderRadius: "50% 50% 44% 44%", background: "linear-gradient(180deg,#3A465E,#161E2C)", border: "2px solid #46566F", boxShadow: "0 4px 10px rgba(0,0,0,0.5)" }} />
      <div style={{ position: "absolute", left: 46, top: drop - 12, width: 28, height: 16, borderRadius: "50%", background: `radial-gradient(circle,#FFF4D0 ${20 + flick * 40}%,${color} 85%)`, boxShadow: `0 0 ${34 * flick}px ${14 * flick}px ${color}88` }} />
      {/* warm cone */}
      <svg viewBox="0 0 120 700" width={120} height={coneY} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
        <defs><linearGradient id={`lampCone${Math.round(x)}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={color} stopOpacity={0.42 * flick} /><stop offset="1" stopColor={color} stopOpacity="0" /></linearGradient></defs>
        <polygon points={`44,${drop - 6} 76,${drop - 6} ${60 + (coneY - drop) * 0.5},${coneY} ${60 - (coneY - drop) * 0.5},${coneY}`} fill={`url(#lampCone${Math.round(x)})`} style={{ mixBlendMode: "screen" }} />
      </svg>
    </div>
  );
};

// brick FURNACE with fire glow (CALLBACK forge)
const Furnace: React.FC<{ lf: number; x: number; y: number; s?: number }> = ({ lf, x, y, s = 1 }) => {
  const fl = 0.8 + 0.2 * Math.abs(Math.sin(lf / 6));
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 150 * s, height: 210 * s, zIndex: 8 }}>
      <div style={{ position: "absolute", left: 40 * s, top: -70 * s, width: 40 * s, height: 74 * s, background: "linear-gradient(90deg,#2A2018,#171009)", border: "3px solid #3A2C1E" }} />
      <div style={{ position: "absolute", inset: 0, borderRadius: 8, background: "linear-gradient(180deg,#4A3524,#2A1D12)", border: `4px solid #5A4230`, boxShadow: "0 12px 26px rgba(0,0,0,0.5)" }} />
      {[0, 1, 2, 3].map((r) => Array.from({ length: 4 }).map((_, c) => <div key={`${r}-${c}`} style={{ position: "absolute", left: (10 + c * 34) * s, top: (14 + r * 30) * s, width: 30 * s, height: 24 * s, borderRadius: 2, background: "rgba(90,66,48,0.35)", border: "1px solid rgba(30,20,12,0.5)" }} />))}
      {/* arched mouth + fire */}
      <div style={{ position: "absolute", left: 34 * s, top: 78 * s, width: 82 * s, height: 96 * s, borderRadius: `${40 * s}px ${40 * s}px 6px 6px`, background: `radial-gradient(circle at 50% 70%, #FFE39A, #FF7A2A 40%, #C4361A 72%, #3A0E06)`, boxShadow: `0 0 ${40 * fl}px ${12 * fl}px rgba(255,120,40,${0.5 * fl}), inset 0 -10px 18px rgba(0,0,0,0.4)` }} />
      {[0, 1, 2].map((i) => { const h = (30 + Math.abs(Math.sin(lf / 5 + i)) * 24) * s; return <div key={i} style={{ position: "absolute", left: (48 + i * 22) * s, top: (150 * s - h), width: 16 * s, height: h, borderRadius: "50% 50% 40% 40%", background: "linear-gradient(180deg,#FFE39A,#FF7A2A)", opacity: 0.85, filter: "blur(1px)" }} />; })}
      <div style={{ position: "absolute", left: -40 * s, top: 40 * s, width: 220 * s, height: 200 * s, borderRadius: "50%", background: `radial-gradient(circle, rgba(255,120,40,${0.16 * fl}), transparent 62%)`, filter: "blur(8px)", pointerEvents: "none" }} />
    </div>
  );
};

// a dark riveted metal PLATE / nameplate with gold border + serif text
const Plate: React.FC<{ x: number; y: number; w: number; h?: number; children?: React.ReactNode; tone?: string }> = ({ x, y, w, h = 60, children, tone = "#111A28" }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, borderRadius: 8, background: `linear-gradient(180deg,${tone},#0A121E)`, border: "2px solid #C9A24A", boxShadow: "0 8px 18px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 22 }}>
    {[[8, 8], [w - 16, 8], [8, h - 16], [w - 16, h - 16]].map(([cx, cy], i) => <div key={i} style={{ position: "absolute", left: cx, top: cy, width: 8, height: 8, borderRadius: "50%", background: "radial-gradient(circle at 35% 35%,#E7C877,#8A6A28)" }} />)}
    {children}
  </div>
);

// wall clock
const WallClock: React.FC<{ lf: number; x: number; y: number; s?: number }> = ({ lf, x, y, s = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 64 * s, height: 64 * s, borderRadius: "50%", background: "radial-gradient(circle at 40% 34%,#F4EFE2,#CFC7B4)", border: "4px solid #2A3446", boxShadow: "0 6px 14px rgba(0,0,0,0.5)", zIndex: 8 }}>
    {Array.from({ length: 12 }).map((_, i) => { const a = (i / 12) * Math.PI * 2; return <div key={i} style={{ position: "absolute", left: 32 * s + Math.cos(a) * 24 * s - 1, top: 32 * s + Math.sin(a) * 24 * s - 1, width: 2, height: 2, background: "#5A5240" }} />; })}
    <div style={{ position: "absolute", left: 31 * s, top: 16 * s, width: 2, height: 16 * s, background: "#2A2418", transformOrigin: "50% 100%", transform: `rotate(${(lf / 40) % (Math.PI * 2)}rad)` }} />
    <div style={{ position: "absolute", left: 31 * s, top: 12 * s, width: 2, height: 20 * s, background: "#2A2418", transformOrigin: "50% 100%", transform: `rotate(${(lf / 6) % (Math.PI * 2)}rad)` }} />
  </div>
);

// hanging pipes / cables along the ceiling
const Pipes: React.FC<{ x: number; y: number; w: number }> = ({ x, y, w }) => (
  <svg viewBox={`0 0 ${w} 60`} width={w} height={60} style={{ position: "absolute", left: x, top: y, zIndex: 5 }}>
    <rect x={0} y={10} width={w} height={9} rx={4} fill="#1A2332" stroke="#0A0F1C" strokeWidth={2} />
    <rect x={0} y={26} width={w} height={6} rx={3} fill="#141C2A" />
    {[0.2, 0.5, 0.8].map((f, i) => <rect key={i} x={w * f} y={4} width={8} height={22} rx={3} fill="#232F44" />)}
  </svg>
);

// THE PILE - an avalanche/heap of dev work (folders/tickets/boxes) burying the hero. Shrinks with `clear`.
const WorkPile: React.FC<{ lf: number; cx: number; baseY: number; mass: number; w?: number; seedOff?: number }> = ({ lf, cx, baseY, mass, w = 520, seedOff = 0 }) => {
  if (mass <= 0.02) return null;
  const n = Math.round(6 + mass * 22);
  const H = 60 + mass * 300;
  const COL = ["#E7DFCB", "#D8CFB6", "#C7BDA0", "#EAD9B0"];
  return (
    <div style={{ position: "absolute", left: cx - w / 2, top: baseY - H, width: w, height: H, zIndex: 12 }}>
      {Array.from({ length: n }).map((_, i) => {
        const s = seed(i * 3.1 + 1 + seedOff), s2 = seed(i * 7.7 + 4 + seedOff);
        const bw = 46 + s * 26, bh = 34 + s2 * 14;
        const bx = w * 0.08 + s * w * 0.82;
        const by = H - (i / n) * H - bh + Math.sin(lf / 8 + i) * 1.5;
        const rot = (s2 - 0.5) * 26;
        return (
          <div key={i} style={{ position: "absolute", left: bx, top: by, width: bw, height: bh, borderRadius: 4, background: `linear-gradient(180deg, ${COL[i % 4]}, #A79B7E)`, border: "1.5px solid #8E836A", transform: `rotate(${rot}deg)`, boxShadow: "0 3px 6px rgba(0,0,0,0.4)" }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: bw * 0.34, height: bh * 0.3, background: "#C6A24E", borderRadius: "4px 0 6px 0" }} />
            <div style={{ position: "absolute", left: 6, top: bh * 0.5, width: bw * 0.6, height: 3, background: "#9A8E70" }} />
          </div>
        );
      })}
    </div>
  );
};

// TOKEN-COST METER on the wall - red bleeding money, flips green when Router is installed
const TokenMeter: React.FC<{ lf: number; pct: number; dollars: string; green?: number; x: number; y: number }> = ({ lf, pct, dollars, green = 0, x, y }) => {
  const alarm = green < 0.5 ? 0.6 + 0.4 * Math.abs(Math.sin(lf / 5)) : 1;
  const c = green > 0.5 ? GREEN : "#E5484D";
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 216, height: 96, borderRadius: 12, background: "linear-gradient(180deg,#0E1A2C,#08111E)", border: `2px solid ${green > 0.5 ? "#2E6E52" : "#5A2430"}`, boxShadow: green > 0.5 ? "none" : `0 0 ${10 + alarm * 12}px rgba(229,72,77,${0.4 * alarm})`, zIndex: 24 }}>
      <div style={{ position: "absolute", left: 14, top: 10, fontFamily: mono, fontSize: 15, color: "#7C90AE", letterSpacing: 1 }}>TOKEN COST</div>
      <div style={{ position: "absolute", left: 14, top: 28, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 40, color: c, textShadow: green > 0.5 ? "none" : `0 0 10px rgba(229,72,77,${0.5 * alarm})` }}>{dollars}</div>
      <div style={{ position: "absolute", left: 14, right: 14, bottom: 12, height: 9, borderRadius: 5, background: "rgba(60,80,120,0.3)", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${pct}%`, borderRadius: 5, background: green > 0.5 ? grad("#3F9E74", "#2E7C57") : grad("#E5484D", "#B01E24") }} />
      </div>
    </div>
  );
};

// the 4 loadout slots on the cabinet - light one per installed tool (diegetic power mechanic)
const LoadoutBar: React.FC<{ lf: number; filled: number; x: number; y: number; active?: number }> = ({ lf, filled, x, y, active = -1 }) => (
  <div style={{ position: "absolute", left: x, top: y, display: "flex", gap: 12, zIndex: 40 }}>
    {REPOS.map((r, i) => {
      const on = i < filled;
      const pop = i === active ? 1 + Math.max(0, 1 - (lf % 1000) * 0) * 0 : 1;
      return (
        <div key={i} style={{ width: 58, height: 58, borderRadius: 12, background: on ? "#F7F3EA" : "rgba(20,30,48,0.7)", border: `2.5px solid ${on ? GOLD : "#2A3A54"}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: on ? `0 0 12px ${GOLD}aa` : "inset 0 0 8px rgba(0,0,0,0.5)", transform: `scale(${pop})` }}>
          {on ? <Img src={staticFile(r.logo)} style={{ width: 40, height: 40, objectFit: "contain" }} /> : <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 22, color: "#3A4A64" }}>{i + 1}</span>}
        </div>
      );
    })}
  </div>
);

// an UPGRADE CRATE stamped with a repo's real logo (the thing Claude installs)
const UpCrate: React.FC<{ lf: number; x: number; y: number; s: number; logo: string; open?: number; glow?: number; rot?: number }> = ({ lf, x, y, s, logo, open = 0, glow = 1, rot = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: s, height: s, transform: `rotate(${rot}deg)`, zIndex: 16 }}>
    <div style={{ position: "absolute", inset: 0, borderRadius: s * 0.08, background: "linear-gradient(180deg,#6E5A3C,#4A3A24)", border: "3px solid #8A6E44", boxShadow: glow ? `0 0 ${16 * glow}px rgba(231,178,76,${0.5 * glow})` : "0 6px 14px rgba(0,0,0,0.5)" }} />
    {/* slats */}
    {[0.28, 0.72].map((f, i) => <div key={i} style={{ position: "absolute", left: 0, right: 0, top: s * f, height: 3, background: "#3A2E1A" }} />)}
    {/* the logo stamped on a light plate */}
    <div style={{ position: "absolute", left: s * 0.16, top: s * 0.16, width: s * 0.68, height: s * 0.68, borderRadius: s * 0.1, background: "#F7F3EA", border: "2px solid #E2D8C6", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      <Img src={staticFile(logo)} style={{ width: s * 0.5, height: s * 0.5, objectFit: "contain" }} />
    </div>
  </div>
);

// reusable cinematic ROOM: back wall + perspective floor + optional key-light cone + haze
const Room: React.FC<{ wall1: string; wall2: string; floor1: string; floor2: string; floorY?: number; beam?: number; beamX?: number; beamColor?: string; edge?: string }> = ({ wall1, wall2, floor1, floor2, floorY = 556, beam = 0, beamX = 300, beamColor = "#E7B24C", edge = "#26344E" }) => (
  <>
    <div style={{ position: "absolute", inset: 0, background: `radial-gradient(122% 82% at 50% 36%, ${wall1} 0%, ${wall2} 58%, #05070d 100%)` }} />
    <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", left: 0, top: 0 }}>
      <defs>
        <linearGradient id="arFloor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={floor1} /><stop offset="1" stopColor={floor2} /></linearGradient>
        <linearGradient id="arBeam" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={beamColor} stopOpacity="0.42" /><stop offset="1" stopColor={beamColor} stopOpacity="0" /></linearGradient>
      </defs>
      {/* wall seams for depth */}
      {[150, 380, 632, 862].map((x) => (<g key={x}><rect x={x - 3} y={120} width={6} height={floorY - 120} fill="#070C18" /><rect x={x + 3} y={120} width={2} height={floorY - 120} fill={edge} opacity={0.5} /></g>))}
      {/* floor */}
      <rect x={0} y={floorY} width={1012} height={792 - floorY} fill="url(#arFloor)" />
      <rect x={0} y={floorY - 2} width={1012} height={4} fill={edge} />
      {[-620, -340, -130, 130, 340, 620].map((d) => (<line key={d} x1={506 + d * 0.18} y1={floorY} x2={506 + d * 1.8} y2={792} stroke={edge} strokeWidth={3} opacity={0.55} />))}
      {/* key-light cone */}
      {beam > 0 && <polygon points={`${beamX - 40},120 ${beamX + 40},120 ${beamX + 470},792 ${beamX - 470},792`} fill="url(#arBeam)" opacity={beam} style={{ mixBlendMode: "screen" }} />}
    </svg>
  </>
);

// small drawn GitHub-repo crate (a folder-crate object; recognizable silhouette)
const Crate: React.FC<{ x: number; y: number; s: number; lit?: number; num?: number; scan?: number }> = ({ x, y, s, lit = 0, num, scan = 0 }) => {
  const gold = lit > 0.02;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: s, height: s * 0.82 }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: s * 0.1, background: gold ? "linear-gradient(180deg,#3A2E12,#241B08)" : "linear-gradient(180deg,#141C2C,#0C1220)", border: `2px solid ${gold ? "#E7B24C" : "#28354C"}`, boxShadow: gold ? `0 0 ${8 + lit * 16}px ${lit * 0.7}px rgba(231,178,76,0.7)` : "inset 0 0 10px rgba(0,0,0,0.5)" }} />
      {/* folder tab */}
      <div style={{ position: "absolute", left: s * 0.12, top: -s * 0.06, width: s * 0.34, height: s * 0.12, borderRadius: `${s * 0.05}px ${s * 0.05}px 0 0`, background: gold ? "#C98A2A" : "#22304A" }} />
      {/* git glyph: node + two branches */}
      <svg viewBox="0 0 40 40" width={s * 0.5} height={s * 0.5} style={{ position: "absolute", left: s * 0.25, top: s * 0.16 }}>
        <line x1="12" y1="8" x2="12" y2="32" stroke={gold ? "#F4EEDF" : "#3C4E6E"} strokeWidth="3.5" />
        <line x1="12" y1="20" x2="28" y2="20" stroke={gold ? "#F4EEDF" : "#3C4E6E"} strokeWidth="3.5" />
        <circle cx="12" cy="8" r="4.5" fill={gold ? GOLD : "#4A5E82"} /><circle cx="12" cy="32" r="4.5" fill={gold ? GOLD : "#4A5E82"} /><circle cx="28" cy="20" r="4.5" fill={gold ? GOLD : "#4A5E82"} />
      </svg>
      {gold && num != null && <div style={{ position: "absolute", right: s * 0.1, bottom: s * 0.06, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: s * 0.28, color: "#0B1220", background: GOLD, borderRadius: "50%", width: s * 0.34, height: s * 0.34, display: "flex", alignItems: "center", justifyContent: "center" }}>{num}</div>}
      {lit < 0.02 && lit >= -1 && scan < 0 && <div style={{ position: "absolute", right: s * 0.14, bottom: s * 0.12, color: "#7C4A44", fontSize: s * 0.24, fontWeight: 900 }}>✕</div>}
    </div>
  );
};

// ============================================================ SCENE 0 - HOOK (buried + burning money)
const ArHookBody: React.FC<{ lf: number }> = ({ lf }) => {
  // ===== TIMING / ESCALATION =====
  const burn = over(lf, 40, 260, Easing.inOut(Easing.cubic)); // 0..1 across the escalation
  const turn = over(lf, 300, 22, Easing.out(Easing.cubic));   // 0..1 across the relief flip
  const green = ramp(lf, 300, 316);                            // meter flips green
  const stampT = over(lf, 306, 16, Easing.out(Easing.back(1.5)));   // -80% stamp slam

  // meter climbs 30%->96% during burn, drops to ~18% on the turn
  const meterPct = Math.round((30 + burn * 66) * (1 - turn) + 18 * turn);
  const meterDollars = Math.round((120 + burn * 358) * (1 - turn) + 92 * turn);

  // sprite emotion: stress ramps in, flips to cheer on the turn
  const shockV = burn * (1 - turn);
  const cheerV = turn;

  // furnace shrinks on the turn
  const furnaceScale = 1 * (1 - turn * 0.55);

  // ===== ROOM GEOMETRY =====
  const floorY = 556;
  const groundY = floorY + 118;

  // ===== CODE WALL (the monitor) =====
  const monX = 470, monY = 172, monW = 400, monH = 320;
  const codeScroll = (lf * 2.2) % 26; // px per line block, continuous stream
  const codeLines = [];
  for (let i = 0; i < 16; i++) {
    const cy = monY + 44 + i * 26 - codeScroll;
    if (cy < monY + 34 || cy > monY + monH - 20) continue;
    const s = seed(i * 3 + 1);
    const lw = 60 + Math.round(seed(i * 7 + 2) * 200);
    const indent = Math.round(seed(i * 5) * 3) * 14;
    const active = i % 4 === 0;
    const streamPush = active ? Math.sin((lf + i * 9) * 0.14) * 6 : 0;
    codeLines.push(
      <div key={"cl" + i} style={{
        position: "absolute", left: monX + 22 + indent + streamPush, top: cy,
        width: lw, height: 8, borderRadius: 3,
        background: active ? CLAY : (s > 0.6 ? SLATE : "#33465F"),
        opacity: active ? 0.95 : 0.6,
      }} />
    );
  }

  // token counter on the monitor 2k -> 48k
  const tokCount = Math.round((2000 + burn * 46000) * (1 - turn) + 4200 * turn);
  const tokStr = tokCount >= 1000 ? (tokCount / 1000).toFixed(1) + "k" : String(tokCount);

  // ===== CASH FLYING INTO FURNACE =====
  const furnaceX = 176, furnaceY = 372;
  const notes = [];
  const noteCount = 7;
  for (let n = 0; n < noteCount; n++) {
    const period = 46;
    const phase = (lf * (1 + turn * 0 ) + n * (period / noteCount) * 1.7) % period;
    const p = phase / period; // 0..1 flight
    const intensity = (0.4 + burn * 0.6) * (1 - turn * 0.7);
    const sx = monX - 40 - seed(n) * 60;
    const sy = monY + 200 + seed(n * 2) * 80;
    const tx = furnaceX + 4;
    const ty = furnaceY - 40;
    const nx = sx + (tx - sx) * p;
    const arc = Math.sin(p * Math.PI) * 70;
    const ny = sy + (ty - sy) * p - arc;
    const nScale = (1 - p * 0.55);
    const nOp = intensity * (p > 0.85 ? (1 - p) / 0.15 : 1);
    if (nOp <= 0.02) continue;
    notes.push(
      <div key={"nt" + n} style={{
        position: "absolute", left: nx, top: ny,
        width: 40 * nScale, height: 24 * nScale, borderRadius: 3,
        background: grad("#3F9E74", "#2E7d59"),
        border: "1px solid rgba(255,255,255,0.25)",
        transform: "rotate(" + (p * 220 + n * 40) + "deg)",
        opacity: nOp, display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: mono, fontSize: 14 * nScale, color: "rgba(255,255,255,0.85)", fontWeight: 700,
        boxShadow: "0 2px 5px rgba(0,0,0,0.35)",
      }}>$</div>
    );
  }

  // ===== FREE TOOL CRATE (slides onto desk on the turn) =====
  const crateIn = over(lf, 300, 20, Easing.out(Easing.cubic));
  const crateX = 560 + (1 - crateIn) * 480; // slides in from the right
  const crateY = floorY + 6;

  return (
    <>
      {/* ROOM — warm dev den */}
      <Room wall1="#2A2038" wall2="#160F22" floor1="#241B12" floor2="#0C0803" floorY={floorY} beam={0.5} beamX={300} beamColor="#E7B24C" edge="#3A2C1E" />
      <Lamp lf={lf} x={470} drop={140} color="#FFE9A8" on={1} coneY={520} />

      {/* DESK slab */}
      <div style={{ position: "absolute", left: 300, top: floorY + 40, width: 560, height: 26, borderRadius: 6, background: grad("#3A2A1C", "#20140C"), boxShadow: "0 12px 26px rgba(0,0,0,0.5)" }} />
      <div style={{ position: "absolute", left: 322, top: floorY + 62, width: 26, height: 96, background: "#1A100A", borderRadius: 3 }} />
      <div style={{ position: "absolute", left: 812, top: floorY + 62, width: 26, height: 96, background: "#1A100A", borderRadius: 3 }} />

      {/* MONITOR — the code wall (their entire project) */}
      <div style={{ position: "absolute", left: monX - 14, top: monY - 14, width: monW + 28, height: monH + 28, borderRadius: 16, background: "#050810", boxShadow: "0 18px 40px rgba(0,0,0,0.55)", border: "2px solid #1B2942" }} />
      <div style={{ position: "absolute", left: monX, top: monY, width: monW, height: monH, borderRadius: 10, background: grad(TERM, TERM2), overflow: "hidden", border: "1px solid #22334E" }} />
      {/* screen glow that reddens with the burn */}
      <div style={{ position: "absolute", left: monX, top: monY, width: monW, height: monH, borderRadius: 10, background: "radial-gradient(circle at 50% 40%, rgba(207,84,50," + (0.05 + burn * 0.28 * (1 - turn)) + "), transparent 70%)" }} />
      {/* prompt label */}
      <div style={{ position: "absolute", left: monX + 20, top: monY + 12, fontFamily: mono, fontSize: 13, letterSpacing: 1, color: "#7FA0C8", fontWeight: 700 }}>
        prompt · your whole project
      </div>
      <div style={{ position: "absolute", left: monX + 20, top: monY + 12, width: monW - 40, height: 1, background: "#233650", marginTop: 22 }} />
      {codeLines}
      {/* token counter chip on the screen */}
      <div style={{ position: "absolute", left: monX + monW - 118, top: monY + monH - 40, width: 100, height: 26, borderRadius: 6, background: "rgba(207,84,50," + (0.2 + burn * 0.5 * (1 - turn)) + ")", border: "1px solid " + (turn > 0.5 ? GREEN : CLAY), display: "flex", alignItems: "center", justifyContent: "center", fontFamily: mono, fontSize: 14, fontWeight: 800, color: turn > 0.5 ? "#BDF0D5" : "#FFD9CC" }}>
        {tokStr} tok
      </div>

      {/* TOKEN COST wall meter */}
      <TokenMeter lf={lf} pct={meterPct} dollars={meterDollars} green={green} x={760} y={188} />

      {/* FURNACE burning cash */}
      <div style={{ position: "absolute", left: furnaceX - 78, top: furnaceY - 150, width: 156, height: 210, transformOrigin: "50% 100%", transform: "scale(" + furnaceScale + ")", opacity: 0.4 + furnaceScale * 0.6 }}>
        <Furnace lf={lf} x={78} y={150} s={1} />
      </div>
      {notes}

      {/* FREE TOOL crate sliding onto the desk */}
      {crateIn > 0.01 && (
        <div style={{ position: "absolute", left: crateX, top: crateY, width: 150, height: 92, transformOrigin: "50% 100%" }}>
          <div style={{ position: "absolute", left: 0, top: 0, width: 150, height: 92, borderRadius: 10, background: grad("#E7B24C", "#B9821F"), boxShadow: "0 14px 30px rgba(0,0,0,0.5)", border: "2px solid #F4D488" }} />
          <div style={{ position: "absolute", left: 12, top: 14, width: 126, height: 30, borderRadius: 5, background: "#1A1813", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 22, color: GOLD, letterSpacing: 1 }}>SERENA</div>
          <div style={{ position: "absolute", left: 12, top: 52, width: 126, height: 26, borderRadius: 5, background: GREEN, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 16, color: "#08130D", letterSpacing: 2 }}>FREE</div>
          {/* landing pop glow */}
          <div style={{ position: "absolute", left: -20, top: -20, width: 190, height: 132, borderRadius: 16, background: "radial-gradient(circle, rgba(231,178,76," + (0.5 * (1 - crateIn)) + "), transparent 70%)", pointerEvents: "none" }} />
        </div>
      )}

      {/* THE DEV — Claude sprite, grounded at the desk */}
      <Critter lf={lf} x={636} groundY={groundY} size={228} shadow={1} glasses={1} shock={shockV} cheer={cheerV} gaze={monX + 200} />

      {/* -80% TOKENS STAMP */}
      {stampT > 0.01 && (
        <div style={{ position: "absolute", left: 506, top: 400, width: 0, height: 0 }}>
          <div style={{ position: "absolute", left: -230, top: -70, width: 460, height: 150, transformOrigin: "50% 50%", transform: "translateZ(0) scale(" + (1.5 - 0.5 * stampT) + ") rotate(" + (-8 + (1 - stampT) * 6) + "deg)", opacity: stampT }}>
            <div style={{ width: 460, height: 150, borderRadius: 14, background: grad("#D2724E", "#A9502F"), border: "5px solid #F0C9B6", boxShadow: "0 20px 50px rgba(0,0,0,0.55)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 78, color: "#FFF3EC", lineHeight: 0.9, letterSpacing: -1 }}>-80%</div>
              <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 26, color: "#FDE4D8", letterSpacing: 6, marginTop: 2 }}>TOKENS</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const ArVaultBody: React.FC<{ lf: number }> = ({ lf }) => {
  const floorY = 556;
  const pX = 322, pY = 196, pW = 468, pH = 344, pYb = pY + pH;
  const dump = over(lf, 4, 62, Easing.out(Easing.cubic));
  const tokens = Math.round(2000 + over(lf, 8, 60, Easing.out(Easing.cubic)) * 46000);
  const tokStr = tokens.toLocaleString('en-US');
  const tokRed = tokens > 30000;
  const grey = over(lf, 72, 40);
  const stamp = over(lf, 96, 16, Easing.out(Easing.back(1.5)));
  const cShock = over(lf, 12, 14) * (1 - over(lf, 72, 22));
  const cStern = over(lf, 80, 20);
  const lines = [...Array(10)];
  return (
    <>
      <Room wall1="#2A2038" wall2="#160F22" floor1="#241B12" floor2="#0C0803" floorY={floorY} beam={0.5} beamX={430} beamColor="#E7B24C" edge="#3A2C1E" />
      <Lamp lf={lf} x={556} drop={140} color="#FFE9A8" on={1} coneY={520} />

      {/* the prompt / terminal panel */}
      <div style={{ position: 'absolute', left: pX, top: pY, width: pW, height: pH, background: grad('#0E1626', '#0A1120'), borderRadius: 14, border: '2px solid rgba(231,178,76,0.5)', boxShadow: '0 24px 60px rgba(0,0,0,0.55)' }} />
      <div style={{ position: 'absolute', left: pX, top: pY, width: pW, height: 34, background: 'rgba(255,255,255,0.05)', borderRadius: '14px 14px 0 0', borderBottom: '1px solid rgba(231,178,76,0.25)' }} />
      <div style={{ position: 'absolute', left: pX + 16, top: pY + 12, width: 11, height: 11, borderRadius: 6, background: '#C44A3A' }} />
      <div style={{ position: 'absolute', left: pX + 33, top: pY + 12, width: 11, height: 11, borderRadius: 6, background: '#CF9544' }} />
      <div style={{ position: 'absolute', left: pX + 50, top: pY + 12, width: 11, height: 11, borderRadius: 6, background: '#3F9E74' }} />
      <div style={{ position: 'absolute', left: pX + 74, top: pY + 9, width: pW - 90, color: '#8FA0B8', fontFamily: 'mono', fontSize: 14, fontWeight: 700, letterSpacing: 0.5, whiteSpace: 'nowrap' }}>prompt.txt — your ENTIRE codebase</div>

      {/* code lines: top read, rest greyed */}
      {lines.map((_, i) => {
        const isRead = i < 2;
        const w = 130 + Math.round(seed(i * 2 + 3) * 250);
        const ind = Math.round(seed(i + 5) * 42);
        const col = isRead ? '#7FCF9E' : 'rgba(154,150,139,' + (1 - grey * 0.55).toFixed(3) + ')';
        return <div key={'l' + i} style={{ position: 'absolute', left: pX + 22 + ind, top: 250 + i * 15, width: w, height: 6, borderRadius: 3, background: col, opacity: isRead ? 0.95 : (1 - grey * 0.45) }} />;
      })}

      {/* dim overlay over the ~85% never read */}
      <div style={{ position: 'absolute', left: pX + 12, top: 278, width: pW - 24, height: pYb - 278 - 12, background: '#0A0F18', opacity: grey * 0.52, borderRadius: 8 }} />

      {/* the codebase being shoved in */}
      <WorkPile lf={lf} cx={556} baseY={pYb - 16} mass={0.2 + dump * 0.62} w={300} seedOff={4} />

      {/* burning green $ notes curling up */}
      {[...Array(4)].map((_, i) => {
        const t = over(lf, 84 + i * 7, 66);
        const yb = 500 - i * 8;
        const x0 = 452 + i * 50;
        const op = Math.sin(t * Math.PI);
        const sway = Math.sin(lf / 9 + i) * 14;
        return <div key={'m' + i} style={{ position: 'absolute', left: x0 + sway, top: yb - t * 168, width: 34, height: 22, background: grad('#3F9E74', '#2F7D5B'), border: '1px solid rgba(255,255,255,0.4)', borderRadius: 4, opacity: op * 0.9, transform: 'rotate(' + (t * 40 - 10).toFixed(1) + 'deg)', color: '#EAFFF2', fontFamily: 'inter', fontWeight: 900, fontSize: 15, textAlign: 'center', lineHeight: '22px', boxShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>$</div>;
      })}

      {/* embers for continuing motion */}
      {[...Array(7)].map((_, i) => {
        const s = seed(i * 3 + 1);
        const cyc = ((lf * 0.9 + s * 90) % 90) / 90;
        const ex = pX + 90 + s * 300 + Math.sin(lf / 16 + i) * 10;
        const ey = pYb - 10 - cyc * 150;
        const op = (1 - cyc) * 0.5 * ramp(lf, 60, 80);
        return <div key={'e' + i} style={{ position: 'absolute', left: ex, top: ey, width: 4, height: 4, borderRadius: 2, background: '#CF9544', opacity: op, boxShadow: '0 0 6px #CF9544' }} />;
      })}

      {/* NEVER READ stamp */}
      <div style={{ position: 'absolute', left: 556 - 160, top: 334, width: 320, transform: 'rotate(-9deg) scale(' + (0.6 + stamp * 0.4).toFixed(3) + ')', opacity: stamp, border: '5px solid #C44A3A', color: '#C44A3A', borderRadius: 8, padding: '6px 0', textAlign: 'center', fontFamily: 'inter', fontWeight: 900, fontSize: 44, letterSpacing: 4, background: 'rgba(196,74,58,0.12)', textShadow: '0 2px 8px rgba(0,0,0,0.6)', boxShadow: '0 0 24px rgba(196,74,58,0.4)' }}>NEVER READ</div>
      <div style={{ position: 'absolute', left: 556 - 210, top: 402, width: 420, textAlign: 'center', opacity: ramp(lf, 110, 124), color: '#E9C3BC', fontFamily: 'mono', fontSize: 17, fontWeight: 700, letterSpacing: 0.3 }}>~85% of your bill · burned for nothing</div>

      {/* climbing token counter */}
      <div style={{ position: 'absolute', left: 802, top: 206, width: 158, height: 96, background: grad('#1A1813', '#0E0C08'), border: '2px solid ' + (tokRed ? '#C44A3A' : '#E7B24C'), borderRadius: 12, boxShadow: tokRed ? '0 0 ' + (18 + Math.sin(lf / 5) * 8).toFixed(1) + 'px rgba(196,74,58,0.6)' : '0 8px 24px rgba(0,0,0,0.4)' }} />
      <div style={{ position: 'absolute', left: 814, top: 216, width: 140, color: '#9A968B', fontFamily: 'mono', fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>TOKENS IN PROMPT</div>
      <div style={{ position: 'absolute', left: 814, top: 236, width: 140, color: tokRed ? '#C44A3A' : '#E7B24C', fontFamily: 'inter', fontWeight: 900, fontSize: 34, letterSpacing: 0.5, fontVariantNumeric: 'tabular-nums' }}>{tokStr}</div>

      {/* Claude sprite reacting, grounded in the foreground */}
      <Critter lf={lf} x={150} groundY={676} size={200} shadow={1} glasses={1} shock={cShock} stern={cStern} gaze={55} />
    </>
  );
};

const ArRouterBody: React.FC<{ lf: number }> = ({ lf }) => {
  const CA = 60, CB = 135;                 // ~2.0s / ~4.5s cuts inside a ~190f scene
  const shot = lf < CA ? 0 : lf < CB ? 1 : 2;
  const s0 = lf, s1 = lf - CA, s2 = lf - CB;
  const GY = 700;
  const deskTop = GY - 18;                  // 682

  // ---------- the money BONFIRE (callback to the hook): a heap of burning cash, warm-orange flames that SHRINK ----------
  const Bonfire = ({ cx, baseY, fire }: { cx: number; baseY: number; fire: number }) => {
    const scale = Math.max(0, Math.min(1, fire));
    const fl = 0.86 + 0.14 * Math.abs(Math.sin(lf / 5));
    const H = 34 + 156 * scale;             // flame column height
    const W = 340, HH = 320;
    const nEmber = Math.round(3 + 11 * scale);
    return (
      <div style={{ position: "absolute", left: cx - W / 2, top: baseY - HH, width: W, height: HH, zIndex: 14, pointerEvents: "none" }}>
        {/* warm ground glow */}
        <div style={{ position: "absolute", left: W / 2 - (150 + 150 * scale), top: HH - (110 + 90 * scale), width: 300 + 300 * scale, height: 150 + 120 * scale, borderRadius: "50%", background: `radial-gradient(ellipse, rgba(255,150,58,${0.32 * scale * fl}), transparent 66%)`, filter: "blur(12px)" }} />
        {/* charred logs at the base */}
        {[-1, 1].map((d) => (
          <div key={d} style={{ position: "absolute", left: W / 2 + d * 30 - 44, top: HH - 44, width: 88, height: 22, borderRadius: 11, background: "linear-gradient(180deg,#3A2A18,#1A1108)", border: "2px solid #24180C", transform: `rotate(${d * 16}deg)`, transformOrigin: "50% 50%", boxShadow: `inset 0 -4px 8px rgba(255,120,40,${0.4 * fl})` }} />
        ))}
        {/* burning cash bills (olive-green, charred corners eating the note, $) */}
        {[[-58, 8, -22], [44, 4, 20], [-14, 20, -6], [70, 24, 32], [-72, 26, 10]].map(([bx, by, rot], i) => {
          const burn = 0.4 + 0.6 * Math.abs(Math.sin(lf / 6 + i));
          return (
            <div key={"bill" + i} style={{ position: "absolute", left: W / 2 + bx - 30, top: HH - 40 - by, width: 60, height: 30, borderRadius: 4, background: "linear-gradient(160deg,#8FA268 0%,#5E7048 70%,#2A2214 100%)", border: "1.5px solid #3A3018", transform: `rotate(${rot}deg)`, boxShadow: "0 2px 6px rgba(0,0,0,0.4), inset 0 0 8px rgba(0,0,0,0.45)", opacity: 0.7 + 0.3 * scale }}>
              <div style={{ position: "absolute", inset: 3, borderRadius: 2, border: "1px solid rgba(40,44,26,0.6)" }} />
              <div style={{ position: "absolute", left: 0, right: 0, top: 6, textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 16, color: "#3A4022" }}>$</div>
              <div style={{ position: "absolute", right: -2, top: -2, width: 24, height: 22, borderRadius: 4, background: `radial-gradient(circle at 100% 0%, rgba(20,12,6,${burn}), transparent 70%)` }} />
            </div>
          );
        })}
        {/* flame tongues */}
        {[0, 1, 2, 3, 4].map((i) => {
          const off = i - 2;
          const fx = W / 2 + off * 30;
          const fh = (0.52 + 0.48 * Math.abs(Math.sin(lf / 4 + i * 1.25))) * H * (i === 2 ? 1.14 : 0.78);
          const fw = (26 + 8 * scale) * (i === 2 ? 1.08 : 0.84);
          return (
            <div key={"fl" + i} style={{ position: "absolute", left: fx - fw / 2, top: HH - 40 - fh, width: fw, height: fh, borderRadius: "50% 50% 42% 42% / 68% 68% 38% 38%", background: "linear-gradient(180deg,#FFE7A6 0%,#FF9A3C 46%,#D24A1E 82%,#9A2E12 100%)", filter: "blur(1px)", opacity: 0.92, mixBlendMode: "screen", transform: `translateX(${Math.sin(lf / 6 + i) * 4}px)` }} />
          );
        })}
        {/* bright inner core */}
        {scale > 0.06 && <div style={{ position: "absolute", left: W / 2 - 15, top: HH - 40 - H * 0.5, width: 30, height: H * 0.5, borderRadius: "50% 50% 42% 42% / 66% 66% 40% 40%", background: "linear-gradient(180deg,#FFF6D2,#FFC24E 60%,#FF8A34)", filter: "blur(1px)", opacity: 0.9 * fl, mixBlendMode: "screen" }} />}
        {/* embers rising */}
        {Array.from({ length: nEmber }).map((_, k) => {
          const s = seed(k * 3.3 + 2);
          const p = ((lf * (0.5 + s * 0.7) + k * 9) % 100) / 100;
          const ex = W / 2 + (s - 0.5) * (60 + 90 * scale);
          const ey = HH - 44 - p * (150 + 90 * scale);
          const sz = 2 + s * 3;
          return <div key={"e" + k} style={{ position: "absolute", left: ex, top: ey, width: sz, height: sz, borderRadius: "50%", background: "#FFB255", opacity: (1 - p) * 0.75 * (0.3 + scale), boxShadow: "0 0 6px rgba(255,150,60,0.8)" }} />;
        })}
        {/* smoke wisps as it goes out */}
        {scale < 0.6 && [0, 1, 2].map((j) => {
          const p = ((lf * 0.4 + j * 33) % 100) / 100;
          return <div key={"sm" + j} style={{ position: "absolute", left: W / 2 - 14 + (j - 1) * 16, top: HH - 60 - p * 150, width: 22 + p * 26, height: 22 + p * 26, borderRadius: "50%", background: `rgba(150,140,128,${(1 - scale) * (1 - p) * 0.28})`, filter: "blur(6px)" }} />;
        })}
      </div>
    );
  };

  // ---------- the growing pile of SAVED CASH the cheap helper banks (banknote bundles + gold coins) ----------
  const CoinMound = ({ cx, baseY, coins, bundles }: { cx: number; baseY: number; coins: number; bundles: number }) => (
    <div style={{ position: "absolute", left: cx - 90, top: baseY - 130, width: 180, height: 130, zIndex: 13 }}>
      {Array.from({ length: Math.max(0, bundles) }).map((_, i) => {
        const s = seed(i * 4 + 5);
        return (
          <div key={"bd" + i} style={{ position: "absolute", left: 26 + (i % 3) * 40 + (s - 0.5) * 8, top: 100 - Math.floor(i / 3) * 16, width: 56, height: 20, borderRadius: 3, background: "linear-gradient(180deg,#9FB277,#6E8250)", border: "1.5px solid #4E6038", transform: `rotate(${(s - 0.5) * 8}deg)`, boxShadow: "0 3px 6px rgba(0,0,0,0.35)" }}>
            <div style={{ position: "absolute", left: 6, top: 3, right: 6, bottom: 3, borderRadius: 2, border: "1px solid rgba(40,52,28,0.5)" }} />
            <div style={{ position: "absolute", left: 0, right: 0, top: 5, textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 12, color: "rgba(51,64,32,0.55)" }}>$</div>
          </div>
        );
      })}
      {Array.from({ length: Math.max(0, coins) }).map((_, i) => {
        const s = seed(i * 5.1 + 9);
        const col = i % 5, row = Math.floor(i / 5);
        const ckx = 22 + col * 30 + row * 12 + (s - 0.5) * 6;
        const cky = 90 - row * 15 - (col % 2) * 5;
        return (
          <div key={"co" + i} style={{ position: "absolute", left: ckx, top: cky, width: 24, height: 24, borderRadius: "50%", background: "radial-gradient(circle at 38% 34%,#F5DE96,#B9892C)", border: "2px solid #8A6A28", boxShadow: "0 2px 4px rgba(0,0,0,0.4)" }}>
            <div style={{ position: "absolute", inset: 5, borderRadius: "50%", border: "1.5px solid #D8B24E" }} />
            <div style={{ position: "absolute", left: 0, right: 0, top: 3, textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 12, color: "#8A6A28" }}>$</div>
          </div>
        );
      })}
    </div>
  );

  // ---------- shared cozy dev DEN furniture (camera-locked, identical every shot) ----------
  const Room = () => (<>
    {/* back window - warm night city, twinkling amber panes (right wall) */}
    <div style={{ position: "absolute", left: 716, top: 176, width: 224, height: 176, borderRadius: 6, border: `7px solid ${WARM.wood1}`, background: "linear-gradient(180deg,#2A1E12,#0E0A05)", boxShadow: "inset 0 0 26px rgba(0,0,0,0.6), 0 8px 20px rgba(0,0,0,0.4)", overflow: "hidden", zIndex: 3 }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#3C2A18 0%,#1A1108 72%)" }} />
      {[[6, 92, 34], [44, 70, 30], [78, 112, 42], [126, 58, 30], [160, 98, 34], [196, 74, 26]].map(([bx, bh, bw], i) => (
        <div key={i} style={{ position: "absolute", left: bx, bottom: 0, width: bw, height: bh, background: "#120C05", borderRadius: "2px 2px 0 0" }} />
      ))}
      {Array.from({ length: 20 }).map((_, i) => { const s = seed(i * 5 + 1); const wx = 12 + (i % 6) * 36 + s * 6; const wy = 52 + Math.floor(i / 6) * 30 + s * 6; const tw = 0.3 + 0.55 * Math.abs(Math.sin(lf / (16 + s * 22) + i)); return <div key={i} style={{ position: "absolute", left: wx, top: wy, width: 6, height: 8, background: "#FFCE7A", opacity: tw, borderRadius: 1 }} />; })}
      <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 5, marginLeft: -2, background: WARM.wood1, opacity: 0.9 }} />
      <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 5, marginTop: -2, background: WARM.wood1, opacity: 0.9 }} />
    </div>

    {/* left nook - a small warm monitor (warm code lines + blinking cursor) over a shelf of books */}
    <div style={{ position: "absolute", left: 76, top: 176, width: 122, height: 86, borderRadius: 8, background: "linear-gradient(180deg,#241A10,#0E0A05)", border: `5px solid ${WARM.wood1}`, boxShadow: "0 8px 18px rgba(0,0,0,0.45)", overflow: "hidden", zIndex: 3 }}>
      <div style={{ position: "absolute", inset: 5, borderRadius: 4, background: "linear-gradient(180deg,#2A2416,#171207)" }} />
      {[64, 44, 54, 34].map((w, i) => <div key={i} style={{ position: "absolute", left: 14, top: 16 + i * 15, width: w, height: 6, borderRadius: 2, background: i === 0 ? "#C6A277" : "#8A7B62", opacity: 0.9 }} />)}
      <div style={{ position: "absolute", left: 52, top: 61, width: 8, height: 6, background: "#E7C877", opacity: (lf % 30) < 15 ? 0.9 : 0.15 }} />
    </div>
    <div style={{ position: "absolute", left: 70, top: 286, width: 134, height: 60, background: `linear-gradient(180deg,${WARM.wood1},#221809)`, border: "3px solid #2A2012", boxShadow: "0 8px 16px rgba(0,0,0,0.4)", zIndex: 3, display: "flex", alignItems: "flex-end", gap: 5, padding: "0 8px 8px" }}>
      {["#7A4A34", "#4E6A50", "#7A6A3A", "#5A4A6A", "#8A5A34"].map((c, i) => <div key={i} style={{ width: 16, height: 34 + (i % 3) * 8, background: c, borderRadius: "2px 2px 0 0", boxShadow: "inset -2px 0 0 rgba(0,0,0,0.25)" }} />)}
    </div>

    {/* hanging warm bulb, gentle sway */}
    <div style={{ position: "absolute", left: 506, top: 96, transformOrigin: "50% 0%", transform: `rotate(${Math.sin(lf / 42) * 1.6}deg)`, zIndex: 6 }}>
      <div style={{ position: "absolute", left: -1.5, top: 0, width: 3, height: 64, background: "#2A2012" }} />
      <div style={{ position: "absolute", left: -16, top: 60, width: 32, height: 20, borderRadius: "0 0 44% 44%", background: "linear-gradient(180deg,#3A2C1A,#241A0E)" }} />
      <div style={{ position: "absolute", left: -9, top: 76, width: 18, height: 15, borderRadius: "50%", background: "radial-gradient(circle,#FFF0C4,#FFCE7A)", boxShadow: "0 0 42px 15px rgba(255,206,122,0.38)" }} />
    </div>

    {/* desk plank + apron + legs */}
    <div style={{ position: "absolute", left: 96, top: 682, width: 820, height: 52, borderRadius: 8, background: "linear-gradient(180deg,#6A4E30,#3E2C18)", border: "2px solid #7A5A38", boxShadow: "0 16px 28px rgba(0,0,0,0.42)", zIndex: 9 }} />
    <div style={{ position: "absolute", left: 96, top: 732, width: 820, height: 13, background: "#2A1E10", zIndex: 9 }} />
    {[150, 860].map((x) => <div key={x} style={{ position: "absolute", left: x, top: 744, width: 16, height: 42, background: "linear-gradient(180deg,#3E2C18,#241809)", zIndex: 8 }} />)}

    {/* plant */}
    <div style={{ position: "absolute", left: 150, top: 634, width: 40, height: 52, zIndex: 10 }}>
      <div style={{ position: "absolute", left: 6, bottom: 0, width: 28, height: 22, borderRadius: "4px 4px 7px 7px", background: "#8A5A34" }} />
      {[0, 1, 2, 3].map((i) => <div key={i} style={{ position: "absolute", left: 12 + i * 5, bottom: 18, width: 8, height: 30 - (i % 2) * 8, borderRadius: 6, background: "#4E7A44", transform: `rotate(${(i - 1.5) * 20}deg)`, transformOrigin: "50% 100%" }} />)}
    </div>

    {/* coffee mug + rising steam */}
    <div style={{ position: "absolute", left: 636, top: 654, width: 34, height: 30, borderRadius: "5px 5px 8px 8px", background: "linear-gradient(180deg,#C6532E,#9A3E22)", zIndex: 10 }}>
      <div style={{ position: "absolute", right: -9, top: 6, width: 13, height: 15, borderRadius: "0 8px 8px 0", border: "3px solid #C6532E" }} />
      <div style={{ position: "absolute", left: 3, top: 3, right: 3, height: 5, borderRadius: 3, background: "#7A2E18" }} />
    </div>
    {[0, 1, 2].map((i) => { const t = (lf / (30 + i * 7)) % 1; const op = Math.sin(t * Math.PI) * 0.32; return <div key={i} style={{ position: "absolute", left: 642 + i * 8, top: 654 - t * 30, width: 9 - i * 1.5, height: 9 - i * 1.5, borderRadius: "50%", background: `rgba(240,225,200,${op})`, filter: "blur(2px)", zIndex: 11 }} />; })}
  </>);

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Den lf={lf} wall1="#463524" wall2="#281C10" floor1="#3A2C1C" floor2="#140D06" lampX={506} />
      <Room />

      {shot === 0 && (() => {
        // the repo gets NAMED -> its GitHub card slides in big & central; the money BONFIRE burns cash behind it;
        // a big RED token-cost meter reads $478; both Claudes stare up at the card, dismayed.
        const react = over(s0, fr(0.5), fr(0.5));
        const alarm = 0.6 + 0.4 * Math.abs(Math.sin(s0 / 5));
        return (<>
          <Bonfire cx={506} baseY={686} fire={1} />
          <GitHubCard lf={s0} repo={REPOS[0]} x={506 - 294} y={168} inAt={0.15} />
          {/* red TOKEN-COST meter, high, right above the fire */}
          <Plate x={386} y={402} w={240} h={80} tone="#2E140E">
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: mono, fontSize: 15, color: "#E1A78C", letterSpacing: 2 }}>TOKEN COST</div>
              <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 46, color: "#E5484D", lineHeight: 1, textShadow: `0 0 ${8 + alarm * 10}px rgba(229,72,77,${0.5 * alarm})` }}>$478</div>
            </div>
          </Plate>
          <Critter lf={s0} x={172} groundY={GY} size={140} nodAmp={1.6} nodSpeed={7} gaze={4} glasses={1} shock={0.12 + react * 0.14} />
          <Critter lf={s0} x={846} groundY={GY} size={150} nodAmp={1.5} nodSpeed={6} gaze={-4} shock={0.14 + react * 0.16} />
        </>);
      })()}

      {shot === 1 && (() => {
        // Claude flips the ROUTER lever -> the flood of easy jobs is REROUTED away from the fire, down a CHEAP lane
        // to a greyed helper who runs them for a coin each; one hard job stays with the hero. The FIRE shrinks, the
        // SAVED-CASH mound grows, and the token-cost counter ticks DOWN from red $478 to a warm-green number.
        const install = over(s1, 0, fr(0.5), Easing.out(Easing.back(1.5)));
        const lever = interpolate(s1, [0, fr(0.5)], [0, 1], CL);
        const engage = over(s1, fr(0.35), fr(0.2));
        const fireS1 = Math.max(0, 1 - over(s1, fr(0.3), fr(1.3)));
        const routerBob = Math.sin(s1 / 7) * 2.5;

        const cost = Math.round(interpolate(s1, [fr(0.4), fr(1.9)], [478, 62], CL));
        const ct = interpolate(s1, [fr(0.4), fr(1.9)], [0, 1], CL);
        const costC = `rgb(${Math.round(224 + (127 - 224) * ct)},${Math.round(101 + (176 - 101) * ct)},${Math.round(90 + (105 - 90) * ct)})`;

        const EASY = 8, gap = fr(0.22), travel = fr(0.74), t0 = fr(0.18);
        const spawnX = 506, spawnY = 452, helperX = 170, catchY = 604, heroX = 812, heroY = 582;
        let stacked = 0, catchPulse = 0, sendPulse = 0;
        const easyCards: React.ReactNode[] = [];
        for (let i = 0; i < EASY; i++) {
          const st = t0 + i * gap;
          if (s1 < st) continue;
          const t = (s1 - st) / travel;
          if (t >= 1) { stacked++; continue; }
          const e = t * t * (3 - 2 * t);
          const x = spawnX + (helperX - spawnX) * e;
          const y = spawnY + (catchY - spawnY) * e - Math.sin(e * Math.PI) * 70;
          const rot = -e * 46;
          if (t < 0.16) sendPulse = Math.max(sendPulse, 1 - t / 0.16);
          if (t > 0.8) catchPulse = Math.max(catchPulse, 1 - (t - 0.8) / 0.2);
          easyCards.push(
            <div key={`e${i}`} style={{ position: "absolute", left: x - 25, top: y - 18, width: 50, height: 36, borderRadius: 6, background: "linear-gradient(180deg,#F3E8CF,#D6BE93)", border: "2px solid #B99A5E", transform: `rotate(${rot}deg)`, boxShadow: "0 5px 10px rgba(0,0,0,0.32)", zIndex: 17 }}>
              <div style={{ position: "absolute", left: 8, top: 9, width: 22, height: 4, borderRadius: 2, background: "#B39A66" }} />
              <div style={{ position: "absolute", left: 8, top: 18, width: 16, height: 4, borderRadius: 2, background: "#C4AE80" }} />
              <div style={{ position: "absolute", right: 6, top: 6, width: 9, height: 9, borderRadius: "50%", background: "#7FB069" }} />
            </div>
          );
        }
        stacked = Math.min(stacked, 8);

        const hst = fr(0.4), hardT = Math.max(0, Math.min(1, (s1 - hst) / fr(0.7)));
        const he = hardT * hardT * (3 - 2 * hardT);
        const hx = spawnX + (heroX - spawnX) * he;
        const hy = spawnY + (heroY - spawnY) * he - Math.sin(he * Math.PI) * 54 + (hardT >= 1 ? Math.sin(s1 / 6) * 4 : 0);

        return (<>
          {/* the money fire, now shrinking behind the router */}
          <Bonfire cx={506} baseY={686} fire={fireS1} />

          {/* CHEAP lane sign, arrow to the helper */}
          <div style={{ position: "absolute", left: 214, top: 500, transform: `translateY(${(1 - install) * 10}px)`, opacity: install, zIndex: 21 }}>
            <div style={{ position: "relative", padding: "5px 12px", borderRadius: 8, background: "linear-gradient(180deg,#5A4630,#3A2C1C)", border: `2px solid ${GOLD}`, fontFamily: mono, fontWeight: 800, fontSize: 15, letterSpacing: 2, color: "#F0DFA8", boxShadow: "0 6px 14px rgba(0,0,0,0.4)" }}>CHEAP
              <div style={{ position: "absolute", left: -13, top: "50%", marginTop: -8, width: 0, height: 0, borderTop: "8px solid transparent", borderBottom: "8px solid transparent", borderRight: `13px solid ${GOLD}`, opacity: 0.5 + sendPulse * 0.5 }} />
            </div>
          </div>

          {/* the ROUTER signpost + lever Claude just flipped (carries REPOS[0].logo) */}
          <div style={{ position: "absolute", left: 466, top: 448 + routerBob, width: 88, height: 156, transform: `scale(${0.7 + install * 0.3})`, transformOrigin: "50% 100%", zIndex: 20 }}>
            <div style={{ position: "absolute", left: 36, top: 58, width: 12, height: 98, background: "linear-gradient(180deg,#5A4630,#3A2C1C)" }} />
            <div style={{ position: "absolute", left: 4, top: 4, width: 76, height: 62, borderRadius: 10, background: "linear-gradient(180deg,#7A5A38,#4A3524)", border: "2px solid #9A784C", boxShadow: `0 8px 16px rgba(0,0,0,0.45), 0 0 ${engage * 20}px rgba(231,178,76,${engage * 0.6})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 46, height: 46, borderRadius: 9, background: "#F7F3EA", border: "2px solid #E2D8C6", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                <Img src={staticFile(REPOS[0].logo)} style={{ width: 33, height: 33, objectFit: "contain" }} />
              </div>
            </div>
            {/* the lever: up -> down as it engages */}
            <div style={{ position: "absolute", left: 72, top: 66, width: 8, height: 34, borderRadius: 4, background: "#3A2C1C", transformOrigin: "50% 100%", transform: `rotate(${-70 + lever * 70}deg)` }}>
              <div style={{ position: "absolute", left: -5, top: -8, width: 18, height: 18, borderRadius: "50%", background: "radial-gradient(circle at 38% 34%,#F0D488,#B9892C)", border: "2px solid #8A6A28" }} />
            </div>
            {/* output arrows: strong LEFT (cheap), faint RIGHT (hard) */}
            <div style={{ position: "absolute", left: -12, top: 30, width: 0, height: 0, borderTop: "10px solid transparent", borderBottom: "10px solid transparent", borderRight: "14px solid #C9A24A", opacity: 0.35 + sendPulse * 0.55 }} />
            <div style={{ position: "absolute", right: -12, top: 30, width: 0, height: 0, borderTop: "9px solid transparent", borderBottom: "9px solid transparent", borderLeft: "13px solid #C98A5A", opacity: 0.3 + (hardT > 0 && hardT < 0.34 ? 0.5 : 0) }} />
          </div>

          {/* the flood of easy jobs streaming to the cheap helper */}
          {easyCards}

          {/* the SAVED-CASH mound the helper banks (grows with the rerouted flood) */}
          <CoinMound cx={286} baseY={deskTop + 2} coins={Math.min(14, stacked * 2)} bundles={Math.min(4, Math.ceil(stacked / 2))} />

          {/* the one hard job stays in the hero's hands */}
          {s1 >= hst && (
            <div style={{ position: "absolute", left: hx - 31, top: hy - 23, width: 62, height: 46, borderRadius: 7, background: "linear-gradient(180deg,#F4EAD2,#D8C199)", border: "2px solid #B08A4E", transform: `rotate(${he * 18}deg)`, boxShadow: "0 6px 12px rgba(0,0,0,0.4)", zIndex: 18 }}>
              <div style={{ position: "absolute", left: 9, top: 10, width: 30, height: 5, borderRadius: 2, background: "#A98A52" }} />
              <div style={{ position: "absolute", left: 9, top: 21, width: 22, height: 5, borderRadius: 2, background: "#BFA576" }} />
              <div style={{ position: "absolute", right: 7, top: 7, width: 11, height: 11, borderRadius: "50%", background: "#D2724E" }} />
            </div>
          )}

          {/* the greyed cheap-model helper - catches the easy work */}
          <Critter lf={s1} x={170} groundY={GY} size={112} nodAmp={2.8} nodSpeed={7} gaze={3} dim={0.35} cheer={0.14 + catchPulse * 0.42} />
          {/* the hero - keeps the hard one, relieved */}
          <Critter lf={s1} x={812} groundY={GY} size={150} nodAmp={2.2} nodSpeed={10} gaze={-3} cheer={hardT >= 1 ? 0.24 + Math.abs(Math.sin(s1 / 6)) * 0.12 : 0.06} />

          {/* TOKEN COST plate, ticking red -> warm green */}
          <Plate x={376} y={250} w={260} h={98} tone="#2A1E12">
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: mono, fontSize: 16, color: "#C6A277", letterSpacing: 2 }}>TOKEN COST</div>
              <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 50, color: costC, lineHeight: 1.05 }}>${cost}</div>
            </div>
          </Plate>
        </>);
      })()}

      {shot === 2 && (() => {
        // the warm payoff: the fire is OUT, a mound of saved gold coins, YOU SAVED 87% + the first loadout slot lit;
        // hero relaxed & cheering, the cheap helper cheering too.
        const pop = over(s2, fr(0.12), fr(0.5), Easing.out(Easing.back(1.6)));
        const g = over(s2, fr(0.2), fr(0.7));
        const heroCheer = g * 0.5 + Math.abs(Math.sin(s2 / 6)) * 0.12;
        const nCoins = Math.round(over(s2, 0, fr(1.0)) * 14);
        return (<>
          {/* the fire is out - a last curl of smoke over cold ashes */}
          <Bonfire cx={506} baseY={686} fire={0.05} />
          {/* YOU SAVED 87% */}
          <Plate x={341} y={214} w={330} h={132} tone="#22301E">
            <div style={{ textAlign: "center", transform: `scale(${0.6 + pop * 0.4})` }}>
              <div style={{ fontFamily: mono, fontSize: 18, color: "#B9C79A", letterSpacing: 3 }}>YOU SAVED</div>
              <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 82, color: "#7FB069", lineHeight: 1 }}>87%</div>
            </div>
          </Plate>
          {/* the mound of saved gold coins on the desk (by the helper) */}
          <CoinMound cx={300} baseY={deskTop + 2} coins={nCoins} bundles={4} />
          <LoadoutBar lf={s2} filled={1} x={430} y={560} active={0} />
          <Critter lf={s2} x={196} groundY={GY} size={116} nodAmp={2.4} nodSpeed={8} gaze={3} dim={0.35} cheer={0.22 + g * 0.3} />
          <Critter lf={s2} x={812} groundY={GY} size={156} nodAmp={2.6} nodSpeed={9} gaze={-2} cheer={heroCheer} />
        </>);
      })()}

      <CutFlash lf={lf} at={CA} /><CutFlash lf={lf} at={CB} />
    </AbsoluteFill>
  );
};

// ============================================================ SCENE 3 - REPOMIX (a mountain of files -> one cube)
const ArRepomixBody: React.FC<{ lf: number }> = ({ lf }) => {
  const CA = 66, CB = 141;               // ~2.2s / ~4.7s cuts inside a ~211f scene
  const shot = lf < CA ? 0 : lf < CB ? 1 : 2;
  const s0 = lf, s1 = lf - CA, s2 = lf - CB;
  const GY = 700;
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  // ---------- THE MOUNTAIN OF CODE (deterministic triangular pile; identical layout in shot0 & shot1) ----------
  const MTN_N = 128;
  const mCx = 506, mBaseY = 688, mApexY = 150, mBaseHW = 336;
  const mtn = Array.from({ length: MTN_N }, (_, i) => {
    const r = seed(i * 1.7 + 3);
    const t = 1 - Math.sqrt(1 - r);                         // 0 = base .. 1 = apex (area-weighted, base-biased)
    const y = mBaseY - t * (mBaseY - mApexY);
    const hw = mBaseHW * (1 - t) * (0.42 + 0.58 * seed(i * 9.3 + 5));
    const x = mCx + (seed(i * 2.3 + 8) * 2 - 1) * hw;
    const sc = 0.58 + (1 - t) * 0.56;
    const rot = (seed(i * 4.1 + 2) - 0.5) * 34;
    const folder = seed(i * 5.9 + 1) < 0.34;
    const z = 4 + Math.round((y / mBaseY) * 12);            // low cards (large y) sit in front
    return { x, y, hw, sc, rot, folder, t, z };
  });

  // one warm code-file tile (paper + fold + faux code lines via box-shadow - 2 nodes only)
  const CodeFile = (x: number, y: number, sc: number, rot: number, op: number, z: number, k: string) => (
    <div key={k} style={{ position: "absolute", left: x - 21, top: y - 26, width: 42, height: 52, transform: `rotate(${rot}deg) scale(${sc})`, transformOrigin: "50% 100%", opacity: op, zIndex: z,
      background: "linear-gradient(180deg,#FBEFD2,#E4C98F)", border: "1.5px solid #B98A46", borderRadius: 3, boxShadow: "0 3px 7px rgba(60,24,4,0.4)" }}>
      <div style={{ position: "absolute", right: 0, top: 0, width: 12, height: 12, background: "#D8B36A", clipPath: "polygon(0 0,100% 100%,0 100%)" }} />
      <div style={{ position: "absolute", left: 6, top: 14, width: 24, height: 2.5, borderRadius: 1, background: "#C68A3E", boxShadow: "0 8px 0 -0.3px #C9A05A, 0 15px 0 -0.3px #C9A05A, 0 22px 0 -0.3px #E0A85A" }} />
    </div>
  );
  // one warm folder tile (tab + body)
  const Folder = (x: number, y: number, sc: number, rot: number, op: number, z: number, k: string) => (
    <div key={k} style={{ position: "absolute", left: x - 24, top: y - 22, width: 48, height: 40, transform: `rotate(${rot}deg) scale(${sc})`, transformOrigin: "50% 100%", opacity: op, zIndex: z }}>
      <div style={{ position: "absolute", left: 3, top: -6, width: 22, height: 10, borderRadius: "3px 3px 0 0", background: "#C98A3E" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 2, bottom: 0, borderRadius: 4, background: "linear-gradient(180deg,#E9C982,#CBA257)", border: "1.5px solid #A9803E", boxShadow: "0 3px 7px rgba(60,24,4,0.4)" }} />
    </div>
  );
  const tile = (m: (typeof mtn)[number], x: number, y: number, sc: number, rot: number, op: number, k: string) =>
    m.folder ? Folder(x, y, sc, rot, op, m.z, k) : CodeFile(x, y, sc, rot, op, m.z, k);

  // ---- the faceted amber GEM (warm amber glow, NEVER neon) ----
  const Gem = (cx: number, cy: number, s: number, glow: number, rot: number, tw: number, z = 32) => (
    <div style={{ position: "absolute", left: cx - s / 2, top: cy - s * 0.55, width: s, height: s * 1.12, transform: `rotate(${rot}deg)`, transformOrigin: "50% 46%", zIndex: z }}>
      {/* warm halo */}
      <div style={{ position: "absolute", left: s * 0.5 - s * 1.05, top: s * 0.56 - s * 1.05, width: s * 2.1, height: s * 2.1, borderRadius: "50%", background: `radial-gradient(circle, rgba(255,206,122,${0.34 + glow * 0.34}), rgba(231,178,76,${0.12 * glow}) 40%, transparent 68%)`, filter: "blur(3px)" }} />
      <svg viewBox="0 0 100 112" width={s} height={s * 1.12} style={{ overflow: "visible", filter: "drop-shadow(0 8px 18px rgba(70,34,4,0.55))" }}>
        <defs>
          <linearGradient id="gemTbl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFE7A6" /><stop offset="1" stopColor="#E7B24C" /></linearGradient>
          <linearGradient id="gemPav" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#E7B24C" /><stop offset="1" stopColor="#A5711C" /></linearGradient>
        </defs>
        {/* crown */}
        <polygon points="32,14 68,14 84,40 16,40" fill="url(#gemTbl)" stroke="#8A5A18" strokeWidth="1.4" strokeLinejoin="round" />
        <polygon points="16,40 32,14 50,40" fill="#F2CE7C" />
        <polygon points="84,40 68,14 50,40" fill="#D9A648" />
        {/* pavilion */}
        <polygon points="16,40 50,40 50,106" fill="url(#gemPav)" stroke="#8A5A18" strokeWidth="1.2" strokeLinejoin="round" />
        <polygon points="84,40 50,40 50,106" fill="#9A671A" stroke="#8A5A18" strokeWidth="1.2" strokeLinejoin="round" />
        {/* facet edges */}
        <line x1="32" y1="14" x2="16" y2="40" stroke="#FFF0C4" strokeWidth="1" opacity="0.7" />
        <line x1="50" y1="40" x2="50" y2="106" stroke="#7A5214" strokeWidth="1" opacity="0.5" />
        {/* bright table highlight + sparkle (twinkles) */}
        <polygon points="40,18 58,18 60,34 42,34" fill="#FFF6DC" opacity={0.5 + 0.32 * tw} />
        <circle cx="60" cy="25" r={2 + tw * 2.2} fill="#FFFDF2" opacity={0.45 + 0.5 * tw} />
      </svg>
    </div>
  );

  // ---- cozy den dressing (bulb sway, plant, mug + rising steam - motion every frame) ----
  const Dress = () => (<>
    <div style={{ position: "absolute", left: 506, top: 84, transformOrigin: "50% 0%", transform: `rotate(${Math.sin(lf / 42) * 1.6}deg)`, zIndex: 3 }}>
      <div style={{ position: "absolute", left: -1.5, top: 0, width: 3, height: 64, background: "#2A2012" }} />
      <div style={{ position: "absolute", left: -16, top: 60, width: 32, height: 20, borderRadius: "0 0 44% 44%", background: "linear-gradient(180deg,#3A2C1A,#241A0E)" }} />
      <div style={{ position: "absolute", left: -9, top: 76, width: 18, height: 15, borderRadius: "50%", background: "radial-gradient(circle,#FFF0C4,#FFCE7A)", boxShadow: "0 0 42px 15px rgba(255,206,122,0.32)" }} />
    </div>
    {/* plant (far left) */}
    <div style={{ position: "absolute", left: 86, top: 632, width: 40, height: 56, zIndex: 9 }}>
      <div style={{ position: "absolute", left: 6, bottom: 0, width: 28, height: 22, borderRadius: "4px 4px 7px 7px", background: "#8A5A34" }} />
      {[0, 1, 2, 3].map((i) => <div key={i} style={{ position: "absolute", left: 12 + i * 5, bottom: 18, width: 8, height: 32 - (i % 2) * 8, borderRadius: 6, background: "#4E7A44", transform: `rotate(${(i - 1.5) * 20}deg)`, transformOrigin: "50% 100%" }} />)}
    </div>
    {/* coffee mug (far right) + steam */}
    <div style={{ position: "absolute", left: 928, top: 648, width: 34, height: 30, borderRadius: "5px 5px 8px 8px", background: "linear-gradient(180deg,#C6532E,#9A3E22)", zIndex: 9 }}>
      <div style={{ position: "absolute", right: -9, top: 6, width: 13, height: 15, borderRadius: "0 8px 8px 0", border: "3px solid #C6532E" }} />
      <div style={{ position: "absolute", left: 3, top: 3, right: 3, height: 5, borderRadius: 3, background: "#7A2E18" }} />
    </div>
    {[0, 1, 2].map((i) => { const t = (lf / (30 + i * 7)) % 1; const op = Math.sin(t * Math.PI) * 0.3; return <div key={i} style={{ position: "absolute", left: 934 + i * 8, top: 648 - t * 30, width: 9 - i * 1.5, height: 9 - i * 1.5, borderRadius: "50%", background: `rgba(240,225,200,${op})`, filter: "blur(2px)", zIndex: 10 }} />; })}
  </>);

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Den lf={lf} wall1="#463524" wall2="#281C10" floor1="#3A2C1C" floor2="#140D06" lampX={506} />
      <Dress />

      {/* ============ SHOT 0 - repo NAMED: card slides in; a TOWERING mountain of code looms, dwarfing the hero ============ */}
      {shot === 0 && (() => {
        const react = s0 > fr(1.2) ? 0.44 : (s0 > fr(0.85) ? 0.22 : 0);
        const lean = Math.sin(s0 / 26) * 2.2;                                  // whole-mountain teeter
        return (<>
          {/* the towering, teetering mountain (assembles base-up, then sways) */}
          {mtn.map((m, i) => {
            const app = over(s0, fr(0.0) + m.t * fr(0.35), fr(0.3), Easing.out(Easing.back(1.05)));
            const sway = Math.sin(s0 / (13 + (i % 5)) + i) * (1.2 + m.t * 2.6); // wobble grows toward the apex
            const lx = m.x + lean * m.t * 6;
            const ly = m.y - (1 - app) * 26 + sway;
            return tile(m, lx, ly, m.sc, m.rot + lean * m.t * 2, app, `m0-${i}`);
          })}
          {/* a few loose pages still fluttering down (ongoing motion) */}
          {[0, 1, 2, 3, 4].map((j) => { const p = ((s0 / 34 + j * 0.21) % 1); const op = 1 - (p > 0.85 ? (p - 0.85) / 0.15 : 0); return CodeFile(300 + j * 108, 160 + p * 300, 0.7, p * 220, op, 18, `fl-${j}`); })}
          {/* the named repo's real GitHub card - big & central, on top */}
          <GitHubCard lf={s0} repo={REPOS[1]} x={506 - 294} y={196} inAt={0.15} />
          {/* the "8,412 files" tally */}
          <Plate x={70} y={612} w={228} h={54} tone="#3A2410">
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 30, color: "#E79A56" }}>8,412</span>
              <span style={{ fontFamily: mono, fontSize: 16, color: "#C6A277", letterSpacing: 1 }}>files</span>
            </div>
          </Plate>
          {/* tiny hero at the base, dwarfed (wrapped high so it reads in FRONT of the pile) */}
          <div style={{ position: "absolute", inset: 0, zIndex: 20 }}>
            <Critter lf={s0} x={176} groundY={GY} size={92} nodAmp={2.2} nodSpeed={9} gaze={4} shock={react} />
          </div>
          {/* the build-helper straining against the pile (leans in, wobbling) */}
          <div style={{ position: "absolute", inset: 0, zIndex: 20, transform: `rotate(${-4 + Math.sin(s0 / 4.5) * 2}deg)`, transformOrigin: "868px 700px" }}>
            <Critter lf={s0} x={868} groundY={GY} size={116} constr={1} nodAmp={1.4} nodSpeed={9} gaze={-4} />
          </div>
        </>);
      })()}

      {/* ============ SHOT 1 - Claude taps REPOMIX; the whole mountain VACUUMS inward and collapses into one GEM ============ */}
      {shot === 1 && (() => {
        const gemX = 506, gemY = 430;
        const tap = over(s1, fr(0.05), fr(0.22), Easing.out(Easing.back(2)));    // Claude taps REPOMIX (button pop)
        const vac = over(s1, fr(0.28), fr(1.1));                                 // the vacuum/collapse envelope
        const spin = 2.6;                                                        // vortex turns
        const gemP = over(s1, fr(0.95), fr(0.55), Easing.out(Easing.back(1.5))); // gem forms + grows
        const drop = over(s1, fr(1.5), fr(0.7), Easing.out(Easing.cubic));       // gem drops into the hero's hand
        const gx = lerp(gemX, 356, drop), gy = lerp(gemY, 500, drop);
        const cnt = s1 < fr(0.35) ? 8412 : Math.round(interpolate(s1, [fr(0.35), fr(1.3)], [8412, 1], CL));
        const cntDone = cnt <= 1;
        const glow = gemP * (0.7 + 0.3 * Math.abs(Math.sin(s1 / 4)));
        const spark = 0.5 + 0.5 * Math.abs(Math.sin(s1 / 3.2));
        return (<>
          {/* the entire mountain spirals/funnels inward and compresses to the collapse point */}
          {mtn.map((m, i) => {
            const st = fr(0.28) + (1 - m.t) * fr(0.26) + (i % 7) * 0.6;          // base cards leave a touch first
            const p = ramp(s1, st, st + fr(0.7));
            if (p >= 1) return null;
            const e = p * p * (3 - 2 * p);
            const dx = m.x - gemX, dy = m.y - gemY;
            const ang = Math.atan2(dy, dx) + e * spin;
            const rad = Math.hypot(dx, dy) * (1 - e);
            const cx = gemX + Math.cos(ang) * rad;
            const cy = gemY + Math.sin(ang) * rad;
            const op = 1 - ramp(p, 0.72, 1);
            return tile(m, cx, cy, m.sc * (1 - e * 0.9), m.rot + e * 260, op, `m1-${i}`);
          })}
          {/* warm vortex core glow at the collapse point (NOT neon) */}
          <div style={{ position: "absolute", left: gemX - 150, top: gemY - 150, width: 300, height: 300, borderRadius: "50%", background: `radial-gradient(circle, rgba(255,206,122,${0.24 * vac * (1 - gemP)}), transparent 62%)`, filter: "blur(6px)", zIndex: 26, pointerEvents: "none" }} />
          {/* the gem forms and drops toward the hero's hand */}
          {gemP > 0.01 && Gem(gx, gy, 46 + gemP * 46, glow, s1 * 3, spark)}
          {/* the REPOMIX sign the hero taps (pops + lights on the tap) */}
          <div style={{ position: "absolute", left: 384, top: 556 - tap * 4, transform: `scale(${0.9 + tap * 0.16})`, transformOrigin: "50% 100%", zIndex: 22, display: "flex", alignItems: "center", gap: 8, padding: "9px 16px", borderRadius: 12, background: "linear-gradient(180deg,#7A5A38,#4A3524)", border: "2px solid #C9A24A", boxShadow: tap > 0.4 ? "0 0 18px rgba(231,178,76,0.6)" : "0 8px 16px rgba(0,0,0,0.45)" }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: "#F7F3EA", border: "1px solid #E2D8C6", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}><Img src={staticFile(REPOS[1].logo)} style={{ width: 20, height: 20, objectFit: "contain" }} /></div>
            <span style={{ fontFamily: mono, fontWeight: 700, fontSize: 16, color: "#F4EEDF", letterSpacing: 1 }}>REPOMIX</span>
          </div>
          {/* the 8,412 -> 1 collapse counter */}
          <Plate x={70} y={612} w={248} h={54} tone={cntDone ? "#243A18" : "#3A2410"}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 9 }}>
              <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 26, color: cntDone ? "#8FCB76" : "#E79A56" }}>{cnt.toLocaleString()}</span>
              <span style={{ fontFamily: mono, fontSize: 18, color: "#9A7B52" }}>&rarr;</span>
              <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 26, color: "#8FCB76" }}>1</span>
              <span style={{ fontFamily: mono, fontSize: 14, color: "#C6A277", letterSpacing: 1, marginLeft: 2 }}>gem</span>
            </div>
          </Plate>
          {/* hero taps + catches the gem */}
          <div style={{ position: "absolute", inset: 0, zIndex: 20 }}>
            <Critter lf={s1} x={300} groundY={GY} size={150} nodAmp={2.4} nodSpeed={9} gaze={3} cheer={0.1 + gemP * 0.42} />
          </div>
          {/* helper marvels at the collapse */}
          <div style={{ position: "absolute", inset: 0, zIndex: 20 }}>
            <Critter lf={s1} x={824} groundY={GY} size={124} constr={1} nodAmp={2.6} nodSpeed={8} gaze={-4} cheer={vac * 0.3} shock={s1 < fr(0.5) ? 0.2 : 0} />
          </div>
        </>);
      })()}

      {/* ============ SHOT 2 - the hero holds the glowing GEM aloft; terminal loads the whole repo ============ */}
      {shot === 2 && (() => {
        const lift = over(s2, 0, fr(0.5), Easing.out(Easing.back(1.4)));
        const heroC = 0.4 + over(s2, 0, fr(0.5)) * 0.35 + Math.abs(Math.sin(s2 / 6)) * 0.1;
        const bob = Math.sin(s2 / 7) * 6;
        const gx = 300, gy = lerp(470, 344, lift) + bob;                        // raised high above the hero
        const glow = 0.7 + 0.3 * Math.abs(Math.sin(s2 / 5));
        const spark = 0.5 + 0.5 * Math.abs(Math.sin(s2 / 3));
        const loaded = over(s2, fr(0.5), fr(0.85));
        const done = loaded > 0.92;
        const bars = Math.round(loaded * 10);
        const marvel = over(s2, fr(0.3), fr(0.6));
        return (<>
          {/* the gem, held aloft, glowing warm */}
          {Gem(gx, gy, 92, glow, s2 * 2, spark, 30)}
          {/* warm terminal: whole repo loaded */}
          <div style={{ position: "absolute", left: 560, top: 296, width: 352, height: 214, borderRadius: 14, zIndex: 24,
            background: "linear-gradient(180deg,#241A0E,#160F06)", border: `3px solid ${done ? "#7FB069" : "#5A4228"}`,
            boxShadow: done ? "0 20px 44px -14px rgba(0,0,0,0.6), 0 0 22px rgba(127,176,105,0.45)" : "0 20px 44px -14px rgba(0,0,0,0.6), inset 0 0 30px rgba(0,0,0,0.5)" }}>
            <div style={{ position: "absolute", left: 16, top: 14, display: "flex", gap: 8 }}>{[RED, AMBER, GREEN].map((c, i) => <div key={i} style={{ width: 9, height: 9, borderRadius: "50%", background: c, opacity: 0.9 }} />)}</div>
            <div style={{ position: "absolute", left: 14, top: 36 }}><RepoLogo src={REPOS[1].logo} w={26} /></div>
            <div style={{ position: "absolute", left: 50, top: 42, fontFamily: mono, fontSize: 15, color: "#E7C57E" }}>{REPOS[1].handle.split("/")[1]}</div>
            <div style={{ position: "absolute", left: 16, top: 78, fontFamily: mono, fontSize: 14, color: "#C6A277" }}>$ npx repomix .</div>
            <div style={{ position: "absolute", left: 16, top: 104, fontFamily: mono, fontSize: 14, color: "#9A7B52" }}>packed 8,412 files &rarr; 1</div>
            <div style={{ position: "absolute", left: 16, top: 132, fontFamily: mono, fontSize: 14, color: "#C6A277", letterSpacing: 1 }}>[{"■".repeat(bars)}{"□".repeat(10 - bars)}] {Math.round(loaded * 100)}%</div>
            <div style={{ position: "absolute", left: 16, top: 166, fontFamily: mono, fontSize: 17, fontWeight: 700, color: done ? "#8FCB76" : "#8A6E44" }}>{done ? "✓ whole repo loaded" : "packing…"}</div>
          </div>
          {/* loadout: slot 2 lit */}
          <LoadoutBar lf={s2} filled={2} x={360} y={636} active={1} />
          {/* hero holds it up */}
          <div style={{ position: "absolute", inset: 0, zIndex: 20 }}>
            <Critter lf={s2} x={300} groundY={GY} size={150} nodAmp={2.6} nodSpeed={9} gaze={2} cheer={heroC} />
          </div>
          {/* the glasses helper marvels up at the gem */}
          <div style={{ position: "absolute", inset: 0, zIndex: 20 }}>
            <Critter lf={s2} x={500} groundY={GY} size={120} glasses={1} nodAmp={1.6} nodSpeed={12} gaze={-4} cheer={marvel * 0.4} />
          </div>
        </>);
      })()}

      <CutFlash lf={lf} at={CA} /><CutFlash lf={lf} at={CB} />
    </AbsoluteFill>
  );
};

// ============================================================ SCENE 4 - GRAPHITI (forgets -> remembers)
const ArGraphitiBody: React.FC<{ lf: number }> = ({ lf }) => {
  // ~164f. SHOT0 0-1.7s (repo NAMED + the goldfish "before": Claude forgets) | SHOT1 1.7-3.5s (install -> a glowing amber SECOND BRAIN blooms above its head) | SHOT2 3.5s-end (it remembers everything; hero taps head, the brain answers)
  const CA = 51, CB = 105;
  const shot = lf < CA ? 0 : lf < CB ? 1 : 2;
  const s0 = lf, s1 = lf - CA, s2 = lf - CB;
  const GY = 700;

  // ---------- the SECOND-BRAIN constellation geometry (panel-local). node 0 = the graphiti CORE ----------
  const BX = 506, BY = 306;
  const NODES: [number, number][] = [
    [506, 306], // 0 core / hub
    [452, 242], // 1
    [406, 306], // 2
    [452, 370], // 3
    [506, 392], // 4
    [560, 370], // 5
    [606, 306], // 6
    [560, 242], // 7
    [506, 224], // 8
  ];
  const SPOKES: [number, number][] = [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8]];
  const RING: [number, number][] = [[8, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8]];
  // WARM amber palette ONLY (⛔ no neon / no blue)
  const EDGE = "#C98A3E", EDGE_HI = "#F4CE86", NC1 = "#F5E9CD", NC2 = "#E6CB90";

  // a memory-node = a tiny warm fact-card with an amber glow
  const NodeChip = (nx: number, ny: number, lit: number, glowK: number, k: string) => {
    if (lit <= 0.02) return null;
    const sc = 0.5 + Math.min(1, lit) * 0.5;
    const g = Math.min(1, lit) * (0.5 + 0.5 * glowK);
    return (
      <div key={k} style={{ position: "absolute", left: nx - 23, top: ny - 16, width: 46, height: 32, transform: `scale(${sc})`, transformOrigin: "50% 50%", opacity: Math.min(1, lit * 1.5), zIndex: 16, background: `linear-gradient(180deg,${NC1},${NC2})`, borderRadius: 5, border: "1.5px solid #C79A54", boxShadow: `0 0 ${7 + g * 15}px rgba(240,190,110,${0.32 + g * 0.42}), 0 4px 8px rgba(40,22,8,0.4)` }}>
        <div style={{ position: "absolute", left: 6, top: 7, width: 22, height: 3, borderRadius: 2, background: "rgba(120,80,32,0.58)" }} />
        <div style={{ position: "absolute", left: 6, top: 14, width: 30, height: 3, borderRadius: 2, background: "rgba(120,80,32,0.42)" }} />
        <div style={{ position: "absolute", left: 6, top: 21, width: 16, height: 3, borderRadius: 2, background: "rgba(120,80,32,0.36)" }} />
        <div style={{ position: "absolute", right: 5, top: 5, width: 8, height: 8, borderRadius: "50%", background: "#E7B24C", boxShadow: `0 0 ${4 + g * 6}px rgba(231,178,76,${0.6 + g * 0.4})` }} />
      </div>
    );
  };
  // one glowing amber synapse; endpoint grown by p (wires itself together)
  const edge = (a: number, b: number, p: number, k: string, wide = false) => {
    if (p <= 0.01) return null;
    const [ax, ay] = NODES[a], [bx2, by2] = NODES[b];
    const ex = ax + (bx2 - ax) * p, ey = ay + (by2 - ay) * p;
    return (
      <g key={k} style={{ filter: `drop-shadow(0 0 ${wide ? 5 : 3}px rgba(224,164,84,0.6))` }}>
        <line x1={ax} y1={ay} x2={ex} y2={ey} stroke={EDGE} strokeWidth={wide ? 4 : 2.6} strokeLinecap="round" opacity={0.92} />
        <line x1={ax} y1={ay} x2={ex} y2={ey} stroke={EDGE_HI} strokeWidth={wide ? 1.6 : 1} strokeLinecap="round" opacity={0.85} />
      </g>
    );
  };

  const glow = shot === 0 ? 0 : shot === 1 ? over(s1, 0, fr(0.7)) : 1;

  // ---------- warm room furniture (cloned from the sibling warm template) ----------
  const Window = () => (
    <div style={{ position: "absolute", left: 838, top: 152, width: 138, height: 176, borderRadius: 6, background: "linear-gradient(180deg,#241A0F,#120B05)", border: "7px solid #5A4228", boxShadow: "0 12px 26px rgba(0,0,0,0.5), inset 0 0 26px rgba(0,0,0,0.6)", overflow: "hidden", zIndex: 7 }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(70,44,22,0.5), rgba(30,18,8,0.2))" }} />
      {Array.from({ length: 22 }).map((_, i) => { const s = seed(i * 2.7 + 1); const x = 8 + s * 118; const y = 70 + seed(i * 1.3) * 92; const tw = 0.5 + 0.5 * Math.abs(Math.sin(lf / 22 + i)); return <div key={i} style={{ position: "absolute", left: x, top: y, width: 5 + s * 4, height: 6 + s * 6, borderRadius: 1, background: "#FFD489", opacity: (0.4 + s * 0.4) * tw }} />; })}
      <div style={{ position: "absolute", left: 62, top: 0, bottom: 0, width: 4, background: "#5A4228" }} />
      <div style={{ position: "absolute", top: 82, left: 0, right: 0, height: 4, background: "#5A4228" }} />
    </div>
  );
  const Shelf = () => (
    <div style={{ position: "absolute", left: 42, top: 300, width: 138, height: 148, borderRadius: 5, background: "linear-gradient(180deg,#4E3A22,#2E2010)", border: "3px solid #5E4626", boxShadow: "0 10px 22px rgba(0,0,0,0.45)", zIndex: 7 }}>
      {[10, 78].map((sy, r) => (<React.Fragment key={r}>
        {[["#9B5B3A", 22], ["#6E7A46", 16], ["#8A6E3C", 20], ["#7A4A44", 18], ["#8A6A3C", 14]].map((bk, i) => <div key={i} style={{ position: "absolute", left: 10 + i * 24, top: sy + (r ? 2 : 4), width: bk[1] as number, height: 54 - (i % 2) * 8, background: bk[0] as string, borderRadius: 2, boxShadow: "inset -2px 0 3px rgba(0,0,0,0.3)" }} />)}
        <div style={{ position: "absolute", left: 4, top: sy + 62, width: 130, height: 5, background: "#5E4626" }} />
      </React.Fragment>))}
    </div>
  );
  const Desk = () => (<>
    <div style={{ position: "absolute", left: 120, top: GY - 18, width: 772, height: 54, borderRadius: 8, background: "linear-gradient(180deg,#6A4E30,#3E2C18)", border: "2px solid #7A5A38", boxShadow: "0 14px 26px rgba(0,0,0,0.4)", zIndex: 9 }} />
    {/* plant */}
    <div style={{ position: "absolute", left: 150, top: GY - 66, width: 40, height: 48, zIndex: 10 }}>
      <div style={{ position: "absolute", left: 6, bottom: 0, width: 28, height: 20, borderRadius: "4px 4px 6px 6px", background: "#8A5A34" }} />
      {[0, 1, 2].map((i) => <div key={i} style={{ position: "absolute", left: 12 + i * 6, bottom: 16, width: 8, height: 30 - (i % 2) * 8, borderRadius: 6, background: "#4E7A44", transform: `rotate(${(i - 1) * 24}deg)` }} />)}
    </div>
    {/* coffee mug (left of centre, clear of both heroes) */}
    <div style={{ position: "absolute", left: 250, top: GY - 40, width: 30, height: 28, borderRadius: 6, background: "#C6532E", zIndex: 10 }}><div style={{ position: "absolute", right: -8, top: 6, width: 12, height: 14, borderRadius: "0 8px 8px 0", border: "3px solid #C6532E" }} /></div>
    {/* warm hanging bulb */}
    <div style={{ position: "absolute", left: 505, top: 96, width: 3, height: 70, background: "#2A2012", zIndex: 6 }} />
    <div style={{ position: "absolute", left: 490, top: 160, width: 34, height: 20, borderRadius: "0 0 40% 40%", background: "#3A2C1A", zIndex: 6 }} />
    <div style={{ position: "absolute", left: 498, top: 176, width: 18, height: 14, borderRadius: "50%", background: "radial-gradient(circle,#FFF0C4,#FFCE7A)", boxShadow: `0 0 ${36 + Math.sin(lf / 11) * 6}px 14px rgba(255,206,122,0.4)`, zIndex: 6 }} />
  </>);

  // a literal little goldfish bowl on the desk (the "before" gag) - a fish swims side to side
  const Fishbowl = () => {
    const fx = Math.sin(s0 / 9) * 12, dir = Math.cos(s0 / 9);
    return (
      <div style={{ position: "absolute", left: 636, top: 636, width: 52, height: 50, zIndex: 11 }}>
        <div style={{ position: "absolute", left: 12, bottom: 0, width: 28, height: 9, borderRadius: "0 0 7px 7px", background: "linear-gradient(180deg,#C79A54,#8A6A34)" }} />
        <div style={{ position: "absolute", left: 2, top: 4, width: 48, height: 42, borderRadius: "46% 46% 50% 50%", background: "linear-gradient(180deg, rgba(214,236,240,0.30), rgba(150,196,206,0.42))", border: "2px solid rgba(224,242,246,0.55)", overflow: "hidden", boxShadow: "0 5px 12px rgba(0,0,0,0.35)" }}>
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 30, background: "linear-gradient(180deg, rgba(120,182,200,0.42), rgba(78,148,172,0.55))" }} />
          {/* goldfish */}
          <div style={{ position: "absolute", left: 22 + fx, top: 22 + Math.sin(s0 / 6) * 3, width: 13, height: 8, transform: `scaleX(${dir >= 0 ? 1 : -1})`, transformOrigin: "50% 50%" }}>
            <div style={{ position: "absolute", left: 3, top: 0, width: 10, height: 8, borderRadius: "50%", background: "#E68A34" }} />
            <div style={{ position: "absolute", left: -1, top: 1, width: 0, height: 0, borderTop: "3px solid transparent", borderBottom: "3px solid transparent", borderRight: "6px solid #D97430" }} />
            <div style={{ position: "absolute", left: 9, top: 2.5, width: 2.5, height: 2.5, borderRadius: "50%", background: "#2A1A0C" }} />
          </div>
          {/* glass highlight */}
          <div style={{ position: "absolute", left: 8, top: 6, width: 7, height: 16, borderRadius: "50%", background: "rgba(255,255,255,0.4)", transform: "rotate(18deg)" }} />
        </div>
      </div>
    );
  };

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Den lf={lf} wall1="#463524" wall2="#281C10" floor1="#3A2C1C" floor2="#140D06" lampX={506} />
      <Window />
      <Shelf />

      {/* the warm amber aura the second-brain throws (wakes up as it ignites) */}
      {glow > 0.01 && <div style={{ position: "absolute", left: BX - 240, top: BY - 210, width: 480, height: 440, borderRadius: "50%", background: `radial-gradient(50% 50% at 50% 50%, rgba(255,196,110,${0.10 + glow * 0.20}), transparent 68%)`, filter: "blur(20px)", zIndex: 7, pointerEvents: "none" }} />}

      {/* the BRAIN SILHOUETTE (top-down: two bumpy lobes + central fissure) - draws in during the bloom, holds after */}
      {glow > 0.01 && (() => {
        const silP = shot === 1 ? over(s1, fr(0.05), fr(0.55), Easing.out(Easing.cubic)) : 1;
        return (
          <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", left: 0, top: 0, zIndex: 10, opacity: silP, transform: `scale(${0.7 + silP * 0.3})`, transformOrigin: `${BX}px ${BY}px` }}>
            <defs><radialGradient id="brFill" cx="0.5" cy="0.45" r="0.62"><stop offset="0" stopColor="#F2C879" stopOpacity="0.22" /><stop offset="1" stopColor="#C98A3E" stopOpacity="0.05" /></radialGradient></defs>
            <path d="M506 200 C556 184 606 196 626 232 C648 262 646 300 626 332 C650 356 640 392 606 406 C582 418 552 410 534 398 C526 410 486 410 478 398 C460 410 430 418 406 406 C372 392 362 356 386 332 C366 300 364 262 386 232 C406 196 456 184 506 200 Z" fill="url(#brFill)" stroke="#E4A85A" strokeWidth={2.5} opacity={0.9} style={{ filter: "drop-shadow(0 0 8px rgba(224,164,84,0.5))" }} />
            <path d="M506 208 C498 244 516 280 506 306 C498 332 516 368 506 390" fill="none" stroke="#E4A85A" strokeWidth={2} opacity={0.7} strokeLinecap="round" />
          </svg>
        );
      })()}

      {/* ============================ SHOT 0 - repo NAMED + the goldfish "before": Claude forgets ============================ */}
      {shot === 0 && (() => {
        const cyc = (s0 % 30) / 30;                       // the single memory keeps flickering out
        const memOp = interpolate(cyc, [0, 0.12, 0.58, 0.72, 0.82], [0, 1, 1, 1, 0], CL);
        const memSc = interpolate(cyc, [0, 0.12, 0.58, 0.72, 0.82], [0.3, 1, 1, 1.7, 0.4], CL);   // holds -> POPS -> vanishes
        const poof = interpolate(cyc, [0.72, 0.9], [0, 1], CL);
        const think = over(s0, fr(0.5), fr(0.42));
        return (<>
          {/* the repo gets NAMED -> its real GitHub card slides in, big & central */}
          <GitHubCard lf={s0} repo={REPOS[2]} x={506 - 302} y={198} inAt={0.15} />

          {/* the hero Claude - forgetting */}
          <Critter lf={s0} x={506} groundY={GY} size={150} nodAmp={1.6} nodSpeed={11} gaze={2} />

          {/* the big EMPTY thought-bubble above its head */}
          {think > 0.02 && <>
            <div style={{ position: "absolute", left: 500, top: 528, width: 16, height: 16, borderRadius: "50%", background: "#F1E4C6", border: "2px solid #E0CE9E", opacity: think, zIndex: 24 }} />
            <div style={{ position: "absolute", left: 494, top: 548, width: 10, height: 10, borderRadius: "50%", background: "#F1E4C6", border: "2px solid #E0CE9E", opacity: think, zIndex: 24 }} />
            <div style={{ position: "absolute", left: 506 - 78, top: 414, width: 156, height: 108, borderRadius: "50% 50% 48% 48%", background: "radial-gradient(60% 60% at 46% 40%, #FBF3E1, #F1E4C6)", border: "3px solid #E0CE9E", boxShadow: "0 8px 20px rgba(40,22,8,0.3)", opacity: think, transform: `scale(${0.8 + think * 0.2})`, transformOrigin: "50% 100%", zIndex: 24 }}>
              {/* the one tiny memory, flickering: fades in, POPS, VANISHES */}
              {memOp > 0.01 && <div style={{ position: "absolute", left: 56, top: 38, width: 44, height: 32, transform: `scale(${memSc})`, transformOrigin: "50% 50%", opacity: memOp, background: "linear-gradient(180deg,#F3E7CC,#E4C88E)", borderRadius: 5, border: "1.5px solid #C79A54", boxShadow: "0 0 10px rgba(231,178,76,0.5)" }}>
                <div style={{ position: "absolute", left: 6, top: 8, width: 22, height: 3, borderRadius: 2, background: "rgba(120,80,32,0.55)" }} />
                <div style={{ position: "absolute", left: 6, top: 15, width: 28, height: 3, borderRadius: 2, background: "rgba(120,80,32,0.4)" }} />
                <div style={{ position: "absolute", right: 5, top: 5, width: 8, height: 8, borderRadius: "50%", background: "#E7B24C" }} />
              </div>}
              {/* poof ring as it vanishes */}
              {poof > 0.01 && poof < 1 && <div style={{ position: "absolute", left: 74, top: 50, width: 8, height: 8, borderRadius: "50%", border: "2px solid rgba(231,178,76,0.85)", transform: `scale(${1 + poof * 5})`, opacity: (1 - poof) * 0.85 }} />}
            </div>
          </>}

          {/* the literal goldfish-bowl gag on the desk */}
          <Fishbowl />
        </>);
      })()}

      {/* ============================ SHOT 1 - install GRAPHITI -> the SECOND BRAIN blooms above its head ============================ */}
      {shot === 1 && (() => {
        const coreP = over(s1, fr(0.05), fr(0.4), Easing.out(Easing.back(1.5)));
        const nodeP = (i: number) => over(s1, fr(0.32) + (i - 1) * 3.4, fr(0.3), Easing.out(Easing.back(1.6)));
        const spokeP = (i: number) => over(s1, fr(0.32) + (i - 1) * 3.4 + 5, fr(0.32));
        const ringP = (i: number) => over(s1, 28 + i * 2.6, fr(0.26));
        const igniteGlow = 0.4 + 0.6 * Math.abs(Math.sin(s1 / 4));   // nodes flicker awake
        return (<>
          {/* the hero installs it - a little wonder */}
          <Critter lf={s1} x={506} groundY={GY} size={152} nodAmp={2} nodSpeed={9} gaze={0} cheer={over(s1, fr(0.1), fr(0.6)) * 0.4} />

          {/* install-energy sparks streaming up from the head into the forming brain */}
          {[1, 8, 7, 4, 5, 2].map((ni, j) => { const fly = over(s1, 4 + j * 4.5, fr(0.5), Easing.inOut(Easing.cubic)); if (fly <= 0.02 || fly >= 1) return null; const [nx, ny] = NODES[ni]; const fx = interpolate(fly, [0, 1], [512, nx], CL); const fy = interpolate(fly, [0, 1], [560, ny], CL) - Math.sin(Math.PI * fly) * 64; return <div key={"sp" + j} style={{ position: "absolute", left: fx - 6, top: fy - 6, width: 12, height: 12, borderRadius: "50%", background: "radial-gradient(circle,#FFF0C4,#E7B24C)", boxShadow: "0 0 12px rgba(231,178,76,0.8)", opacity: Math.sin(Math.PI * fly), zIndex: 18 }} />; })}

          {/* the synapses wire themselves together */}
          <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", left: 0, top: 0, zIndex: 12 }}>
            {SPOKES.map(([a, b], i) => edge(a, b, spokeP(i + 1), "sp" + i, true))}
            {RING.map(([a, b], i) => edge(a, b, ringP(i), "rg" + i))}
          </svg>

          {/* the memory nodes ignite one after another */}
          {NODES.map(([nx, ny], i) => i === 0 ? null : NodeChip(nx, ny, nodeP(i), igniteGlow, "n" + i))}

          {/* the graphiti CORE lights at the centre of the web */}
          <div style={{ position: "absolute", left: BX - 28, top: BY - 28, transform: `scale(${0.4 + coreP * 0.6})`, transformOrigin: "50% 50%", opacity: Math.min(1, coreP * 1.4), zIndex: 17, filter: "drop-shadow(0 0 14px rgba(231,178,76,0.7))" }}><RepoLogo src={REPOS[2].logo} w={56} /></div>
        </>);
      })()}

      {/* ============================ SHOT 2 - it remembers everything; hero taps head, the brain answers ============================ */}
      {shot === 2 && (() => {
        const pulseT = (s2 % 44) / 44;                              // the recurring recall pulse
        const tapUp = Math.max(0, 1 - Math.abs(pulseT - 0.08) / 0.13);
        const answer = interpolate(pulseT, [0.08, 0.22, 0.5, 1], [0, 1, 0.28, 0.12], CL);  // brain flashes just after the tap
        const nodeGlow = 0.5 + 0.22 * Math.abs(Math.sin(s2 / 9)) + answer * 0.5;
        const coreBreathe = 1 + Math.sin(s2 / 8) * 0.035 + answer * 0.05;
        const plate = over(s2, fr(0.15), fr(0.45), Easing.out(Easing.back(1.4)));
        const barPop = over(s2, fr(0.4), fr(0.4), Easing.out(Easing.back(1.5)));
        const tx = 786, ty = 566;                                   // hero temple (hero stands right)
        const sparkP = interpolate(pulseT, [0.1, 0.42], [0, 1], CL);
        const showSpark = pulseT > 0.1 && pulseT < 0.44;
        const sparkX = tx + (BX - tx) * sparkP, sparkY = ty + (BY - ty) * sparkP - Math.sin(Math.PI * sparkP) * 26;
        return (<>
          {/* full synapse web + amber recall-beads travelling it (something always moving) */}
          <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", left: 0, top: 0, zIndex: 12 }}>
            {SPOKES.map(([a, b], i) => edge(a, b, 1, "sp" + i, true))}
            {RING.map(([a, b], i) => edge(a, b, 1, "rg" + i))}
            {[...SPOKES, ...RING].map(([a, b], i) => { const [ax, ay] = NODES[a], [bx2, by2] = NODES[b]; const tp = ((s2 / 22) + i * 0.11) % 1; return <circle key={"bd" + i} cx={ax + (bx2 - ax) * tp} cy={ay + (by2 - ay) * tp} r={3.2} fill="#F4CE86" opacity={0.9} style={{ filter: "drop-shadow(0 0 4px rgba(224,164,84,0.7))" }} />; })}
          </svg>

          {/* the memory nodes, lit + gently pulsing */}
          {NODES.map(([nx, ny], i) => i === 0 ? null : NodeChip(nx, ny, 1, nodeGlow, "n" + i))}

          {/* a few amber motes orbiting the brain */}
          {Array.from({ length: 6 }).map((_, i) => { const a = (s2 / 46 + i / 6) * Math.PI * 2; const r = 118 + Math.sin(s2 / 20 + i) * 10; return <div key={"mote" + i} style={{ position: "absolute", left: BX + Math.cos(a) * r - 2, top: BY + Math.sin(a) * r * 0.82 - 2, width: 4, height: 4, borderRadius: "50%", background: "#F4CE86", opacity: 0.45 + 0.3 * Math.sin(s2 / 6 + i), boxShadow: "0 0 6px rgba(231,178,76,0.7)", zIndex: 15 }} />; })}

          {/* the graphiti CORE, breathing */}
          <div style={{ position: "absolute", left: BX - 28, top: BY - 28, transform: `scale(${coreBreathe})`, transformOrigin: "50% 50%", zIndex: 17, filter: `drop-shadow(0 0 ${12 + answer * 16}px rgba(231,178,76,${0.6 + answer * 0.4}))` }}><RepoLogo src={REPOS[2].logo} w={56} /></div>

          {/* the tap fires a warm pulse from the head up into the brain */}
          {showSpark && <div style={{ position: "absolute", left: sparkX - 7, top: sparkY - 7, width: 14, height: 14, borderRadius: "50%", background: "radial-gradient(circle,#FFF4D6,#E7B24C)", boxShadow: "0 0 16px rgba(231,178,76,0.9)", opacity: Math.sin(Math.PI * sparkP), zIndex: 19 }} />}

          {/* the hero taps its own head; the brain answers */}
          <Critter lf={s2} x={812} groundY={GY} size={150} nodAmp={2.2} nodSpeed={9} gaze={-4} cheer={0.16 + answer * 0.24} />
          <ClayHand x={tx - 20} y={ty - tapUp * 12} s={40} wave={-8 + tapUp * 10} />

          {/* warm brass readout of the benefit */}
          <div style={{ transform: `scale(${plate})`, transformOrigin: "50% 50%" }}>
            <Plate x={506 - 152} y={476} w={304} h={70} tone="#2A1C0E"><div style={{ textAlign: "center" }}><div style={{ fontFamily: mono, fontSize: 14, color: "#C6A277", letterSpacing: 1 }}>PROJECT MEMORY</div><div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 33, color: "#7FB069" }}>48 facts linked</div></div></Plate>
          </div>
          {/* the loadout - slot 3 now lit */}
          <div style={{ transform: `scale(${barPop})`, transformOrigin: "50% 50%" }}>
            <LoadoutBar lf={s2} filled={3} x={372} y={566} active={2} />
          </div>
        </>);
      })()}

      <Desk />
      <CutFlash lf={lf} at={CA} /><CutFlash lf={lf} at={CB} />
    </AbsoluteFill>
  );
};

// ============================================================ SCENE 5 - TASKMASTER (one goal -> self-finishing checklist)
const ArTaskmasterBody: React.FC<{ lf: number }> = ({ lf }) => {
  const CA = 54, CB = 117;                 // ~1.8s / ~3.9s cuts inside a ~195f scene
  const shot = lf < CA ? 0 : lf < CB ? 1 : 2;
  const s0 = lf, s1 = lf - CA, s2 = lf - CB;
  const GY = 700;
  const PX = 770, PBASE = 682, PW = 250;   // the task-MOUNTAIN, camera-locked (on the desk, right-of-centre)
  const OX = 455, OY = 596;                 // the goal-ORB rest point (centre, on the desk)

  // the ARMY: 8 mini-Claude clones (two depth rows so they never merge). Mixed costumes.
  const ARMY = [
    { tx: 372, gy: 690, size: 60, cos: { glasses: 1 } },
    { tx: 452, gy: 718, size: 76, cos: { constr: 1 } },
    { tx: 524, gy: 688, size: 60, cos: {} },
    { tx: 590, gy: 716, size: 74, cos: { glasses: 1 } },
    { tx: 652, gy: 690, size: 62, cos: { constr: 1 } },
    { tx: 712, gy: 718, size: 74, cos: {} },
    { tx: 766, gy: 692, size: 60, cos: { constr: 1 } },
    { tx: 812, gy: 714, size: 72, cos: { glasses: 1 } },
  ];

  // ---------- a warm ceramic coffee mug with LIVE rising steam (relaxed-hero prop) ----------
  const Mug: React.FC<{ x: number; y: number; s?: number; f: number }> = ({ x, y, s = 1, f }) => (
    <div style={{ position: "absolute", left: x, top: y, width: 34 * s, height: 40 * s, zIndex: 20 }}>
      {[0, 1, 2].map((i) => { const up = ((f * 0.9 + i * 20) % 60) / 60; return (
        <div key={i} style={{ position: "absolute", left: 5 * s + i * 7 * s + Math.sin(f / 7 + i) * 3, top: -12 * s - up * 22 * s, width: 5 * s, height: 11 * s, borderRadius: 5, background: "rgba(255,240,214,0.5)", opacity: (1 - up) * 0.55, filter: "blur(1.4px)" }} />); })}
      <div style={{ position: "absolute", left: 0, top: 5 * s, width: 26 * s, height: 30 * s, borderRadius: "5px 5px 11px 11px", background: "linear-gradient(180deg,#F3E7CE,#D8B77C)", border: `${2 * s}px solid #B8894A`, boxShadow: "0 4px 9px rgba(0,0,0,0.4)" }} />
      <div style={{ position: "absolute", right: -8 * s, top: 11 * s, width: 12 * s, height: 15 * s, borderRadius: "0 8px 8px 0", border: `${3 * s}px solid #B8894A`, borderLeft: "none" }} />
      <div style={{ position: "absolute", left: 3 * s, top: 7 * s, width: 20 * s, height: 5 * s, borderRadius: 3, background: "#4E3218" }} />
    </div>
  );

  // ---------- THE GOAL-ORB: a warm glowing sphere carrying the single objective ----------
  const GoalOrb: React.FC<{ x: number; y: number; r: number; glow: number; op?: number; label?: boolean }> = ({ x, y, r, glow, op = 1, label = true }) => (
    <div style={{ position: "absolute", left: x - r, top: y - r, width: r * 2, height: r * 2, opacity: op, zIndex: 18 }}>
      <div style={{ position: "absolute", left: -r * 0.6, top: -r * 0.6, width: r * 3.2, height: r * 3.2, borderRadius: "50%", background: `radial-gradient(circle, rgba(255,206,122,${0.45 * glow}), transparent 62%)`, filter: "blur(7px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "radial-gradient(circle at 38% 32%, #FFF3D4 0%, #F6CE7A 34%, #E7A63C 66%, #B9741E 100%)", border: "3px solid #F4D493", boxShadow: `0 14px 30px rgba(60,30,6,0.5), 0 0 ${18 + glow * 30}px rgba(255,196,96,${0.4 + glow * 0.45}), inset 0 -10px 22px rgba(120,60,10,0.42), inset 0 9px 18px rgba(255,246,216,0.6)` }} />
      <div style={{ position: "absolute", left: r * 0.5, top: r * 0.4, width: r * 0.5, height: r * 0.34, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.85), transparent 70%)" }} />
      {label && (
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: r * 0.2, letterSpacing: 2, color: "#7A4A0E" }}>ONE&nbsp;GOAL</div>
          <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: r * 0.32, color: "#5E3308", lineHeight: 1.02, textAlign: "center" }}>SHIP<br />THE&nbsp;APP</div>
        </div>
      )}
    </div>
  );

  // ---------- a small dev task-card (grabbed by a clone / flying off with a ✓) ----------
  const TaskCard = (cx: number, cy: number, rot: number, op: number, stamp: number, key: string, s = 1) => (
    <div key={key} style={{ position: "absolute", left: cx - 20 * s, top: cy - 15 * s, width: 40 * s, height: 30 * s, borderRadius: 5, background: "linear-gradient(180deg,#F4EAD2,#DAC79A)", border: "1.5px solid #B99A5E", transform: `rotate(${rot}deg)`, opacity: op, boxShadow: "0 4px 8px rgba(0,0,0,0.35)", zIndex: 19 }}>
      <div style={{ position: "absolute", left: 6 * s, top: 7 * s, width: 20 * s, height: 3, borderRadius: 2, background: "#B39A66" }} />
      <div style={{ position: "absolute", left: 6 * s, top: 15 * s, width: 14 * s, height: 3, borderRadius: 2, background: "#C4AE80" }} />
      {stamp > 0.02 && <div style={{ position: "absolute", right: -7 * s, top: -7 * s, width: 21 * s, height: 21 * s, borderRadius: "50%", background: "#3F8A61", border: "2px solid #EAF6EE", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 13 * s, fontWeight: 900, transform: `scale(${stamp})`, boxShadow: "0 2px 6px rgba(0,0,0,0.35)" }}>✓</div>}
    </div>
  );

  // ---------- the cozy dev den: bookshelf + warm night window + desk + plant + book stack + bulb ----------
  const Room = () => (
    <>
      <div style={{ position: "absolute", left: 44, top: 322, width: 150, height: 15, borderRadius: 2, background: "linear-gradient(180deg,#5A4630,#2E2012)", border: "2px solid #6A4E30", boxShadow: "0 8px 16px rgba(0,0,0,0.4)", zIndex: 4 }} />
      {[{ c: "#B4633B", h: 34 }, { c: "#6E5236", h: 40 }, { c: "#C9B48A", h: 30 }, { c: "#A9762F", h: 42 }, { c: "#7A5236", h: 34 }, { c: "#C99A3E", h: 38 }].map((b, i) => (
        <div key={i} style={{ position: "absolute", left: 52 + i * 22, top: 322 - b.h + 2, width: 16, height: b.h, borderRadius: 2, background: b.c, boxShadow: "inset -3px 0 0 rgba(0,0,0,0.18)", zIndex: 4 }} />
      ))}
      <div style={{ position: "absolute", left: 838, top: 214, width: 132, height: 150, borderRadius: 6, background: "linear-gradient(180deg,#1F160C 0%,#2A1D0F 62%,#3A2A16 100%)", border: "6px solid #3A2C1A", boxShadow: "0 10px 22px rgba(0,0,0,0.5), inset 0 0 22px rgba(0,0,0,0.55)", overflow: "hidden", zIndex: 3 }}>
        {Array.from({ length: 20 }).map((_, i) => { const s = seed(i * 5 + 2); const x = 8 + seed(i * 3.1) * 112; const y = 60 + seed(i * 1.9) * 74; return (
          <div key={i} style={{ position: "absolute", left: x, top: y, width: 4 + s * 4, height: 4 + s * 5, borderRadius: 1, background: i % 3 === 0 ? "#E7B85F" : "#C99A55", opacity: 0.34 + s * 0.3 }} />); })}
        <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 5, marginLeft: -2.5, background: "#3A2C1A" }} />
        <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 5, marginTop: -2.5, background: "#3A2C1A" }} />
      </div>
      {/* DESK */}
      <div style={{ position: "absolute", left: 120, top: GY - 18, width: 772, height: 54, borderRadius: 8, background: "linear-gradient(180deg,#6A4E30,#3E2C18)", border: "2px solid #7A5A38", boxShadow: "0 14px 26px rgba(0,0,0,0.4)", zIndex: 9 }} />
      {/* potted plant */}
      <div style={{ position: "absolute", left: 150, top: GY - 66, width: 40, height: 48, zIndex: 10 }}>
        <div style={{ position: "absolute", left: 6, bottom: 0, width: 28, height: 20, borderRadius: "4px 4px 6px 6px", background: "#8A5A34" }} />
        {[0, 1, 2].map((i) => <div key={i} style={{ position: "absolute", left: 12 + i * 6, bottom: 16, width: 8, height: 30 - (i % 2) * 8, borderRadius: 6, background: "#4E7A44", transform: `rotate(${(i - 1) * 24}deg)` }} />)}
      </div>
      {/* warm hanging bulb (centre) */}
      <div style={{ position: "absolute", left: 505, top: 96, width: 3, height: 70, background: "#2A2012", zIndex: 6 }} />
      <div style={{ position: "absolute", left: 490, top: 160, width: 34, height: 20, borderRadius: "0 0 40% 40%", background: "#3A2C1A", zIndex: 6 }} />
      <div style={{ position: "absolute", left: 498, top: 176, width: 18, height: 14, borderRadius: "50%", background: "radial-gradient(circle,#FFF0C4,#FFCE7A)", boxShadow: "0 0 40px 14px rgba(255,206,122,0.4)", zIndex: 6 }} />
    </>
  );

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Den lf={lf} wall1="#463524" wall2="#281C10" floor1="#3A2C1C" floor2="#140D06" lampX={506} />
      <Room />

      {/* ==================== SHOT 0 - repo NAMED · hero drops the ONE goal-ORB · the task-mountain looms ==================== */}
      {shot === 0 && (() => {
        const drop = over(s0, fr(0.5), fr(0.55), Easing.out(Easing.back(1.2)));
        const settle = s0 >= fr(1.05) ? Math.max(0, 1 - (s0 - fr(1.05)) / 10) : 0;
        const orbY = OY - (1 - drop) * 150;
        const orbGlow = 0.4 + drop * 0.45 + settle * 0.35;
        const pm = 0.30 + over(s0, fr(0.15), fr(1.35)) * 0.30;   // the mountain grows / looms
        return (
          <div style={{ position: "absolute", inset: 0, transform: `translateY(${Math.sin(s0 * 3.2) * 3.5 * settle}px)` }}>
            {/* the undone task-mountain, right-of-centre */}
            <WorkPile lf={s0} cx={PX} baseY={PBASE} mass={pm} w={PW} />
            {/* the repo is named -> its real GitHub card slides in, big & central */}
            <GitHubCard lf={s0} repo={REPOS[3]} x={506 - 294} y={198} inAt={0.15} />
            {/* the single glowing goal-ORB dropped onto the desk */}
            <div style={{ transform: `scale(${0.66 + drop * 0.34})`, transformOrigin: `${OX}px ${OY + 60}px` }}>
              <GoalOrb x={OX} y={orbY} r={66} glow={orbGlow} />
            </div>
            {/* landing dust puff */}
            {settle > 0.02 && Array.from({ length: 8 }).map((_, k) => { const a = Math.PI + (k / 7 - 0.5) * Math.PI * 1.15, d = (1 - settle) * (26 + seed(k) * 40); return <div key={k} style={{ position: "absolute", left: OX + Math.cos(a) * d, top: OY + 60 + Math.sin(a) * d * 0.4, width: 6, height: 6, borderRadius: "50%", background: "rgba(214,190,140,0.7)", opacity: settle * 0.8, zIndex: 15 }} />; })}
            {/* the hero (left) sets the goal down */}
            <Critter lf={s0} x={232} groundY={GY} size={150} nodAmp={1.9} nodSpeed={12} gaze={4} cheer={0.1 + (1 - drop) * 0.34} />
          </div>
        );
      })()}

      {/* ==================== SHOT 1 - the goal-ORB BURSTS -> an ARMY of mini-Claude clones pours out ==================== */}
      {shot === 1 && (() => {
        const burst = over(s1, 0, fr(0.28));
        const ring = over(s1, 0, fr(0.55));
        const pm = 0.62 + over(s1, 0, fr(0.4)) * 0.26;
        const spawned = ARMY.filter((_, i) => s1 >= fr(0.14) + i * fr(0.075)).length;
        const tally = over(s1, fr(0.2), fr(0.42), Easing.out(Easing.back(1.4)));
        return (
          <div style={{ position: "absolute", inset: 0 }}>
            <WorkPile lf={s1} cx={PX} baseY={PBASE} mass={pm} w={PW} />

            {/* the burst: warm flash + shockwave ring + sparks + the orb flaring out */}
            {burst < 1 && <div style={{ position: "absolute", left: OX - 260, top: OY - 260, width: 520, height: 520, borderRadius: "50%", background: `radial-gradient(circle, rgba(255,214,140,${0.5 * (1 - burst)}), transparent 60%)`, filter: "blur(8px)", zIndex: 16, pointerEvents: "none" }} />}
            {ring < 1 && <div style={{ position: "absolute", left: OX - 40 - ring * 220, top: OY - 40 - ring * 220, width: 80 + ring * 440, height: 80 + ring * 440, borderRadius: "50%", border: `${Math.max(1, 8 * (1 - ring))}px solid rgba(255,206,122,${0.6 * (1 - ring)})`, opacity: 1 - ring, zIndex: 17, pointerEvents: "none" }} />}
            {burst < 0.9 && <GoalOrb x={OX} y={OY} r={66 * (1 + burst * 0.6)} glow={1} op={1 - burst} label={burst < 0.4} />}
            {burst < 1 && Array.from({ length: 14 }).map((_, k) => { const a = (k / 14) * Math.PI * 2, d = burst * (60 + seed(k) * 120); return <div key={`sp${k}`} style={{ position: "absolute", left: OX + Math.cos(a) * d, top: OY + Math.sin(a) * d, width: 8, height: 8, borderRadius: "50%", background: k % 2 ? "#E7B24C" : "#F6CE7A", opacity: 1 - burst, transform: `rotate(${burst * 260}deg)`, zIndex: 18 }} />; })}

            {/* the ARMY pours out of the orb and marches to a task-card each */}
            {ARMY.map((a, i) => {
              const st = fr(0.14) + i * fr(0.075);
              if (s1 < st) return null;
              const t = Math.min(1, (s1 - st) / fr(0.5));
              const e = t * t * (3 - 2 * t);
              const cx = OX + (a.tx - OX) * e;
              const cy = OY + (a.gy - OY) * e - Math.sin(e * Math.PI) * 66;
              const sc = 0.24 + e * 0.76;
              const landed = t >= 0.98;
              const grab = landed ? over(s1 - st - fr(0.5), 0, fr(0.3)) : 0;
              return (
                <React.Fragment key={i}>
                  <Critter lf={s1 + i * 9} x={cx} groundY={cy} size={a.size * sc} shadow={landed ? 1 : 0} gaze={2} nodAmp={landed ? 3 : 1} nodSpeed={7} cheer={0.1 + grab * 0.42} {...a.cos} />
                  {grab > 0.05 && TaskCard(cx, cy - a.size * 0.52, (seed(i) - 0.5) * 22, grab, 0, `g${i}`, 0.9)}
                </React.Fragment>
              );
            })}

            {/* the dramatic "1 -> N" tally */}
            <Plate x={330} y={248} w={352} h={86} tone="#2A1E12">
              <div style={{ display: "flex", alignItems: "center", gap: 18, transform: `scale(${0.68 + tally * 0.32})` }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: 2, color: "#C6A277" }}>GOAL</div>
                  <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 40, color: "#E7B24C", lineHeight: 1 }}>1</div>
                </div>
                <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 34, color: "#C6A277" }}>&rarr;</span>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: 2, color: "#C6A277" }}>AGENTS</div>
                  <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 40, color: "#7FB069", lineHeight: 1 }}>{spawned}</div>
                </div>
              </div>
            </Plate>

            {/* the hero watches his one goal become an army */}
            <Critter lf={s1} x={178} groundY={GY} size={148} nodAmp={2.0} nodSpeed={11} gaze={4} cheer={0.16 + tally * 0.2} />
          </div>
        );
      })()}

      {/* ==================== SHOT 2 - the army SWARM-CLEARS the mountain · hero kicks back · SHIPPED ✓ ==================== */}
      {shot === 2 && (() => {
        const clear = over(s2, fr(0.15), fr(1.75), Easing.inOut(Easing.cubic));
        const pm = 0.88 * (1 - clear);
        const allDone = clear > 0.98 ? 1 : 0;
        const badge = over(s2, fr(1.95), fr(0.42), Easing.out(Easing.back(1.4)));

        // a stream of task-cards yanked off the mountain, ✓-stamped mid-flight, flung to the "done" corner
        const cards: React.ReactNode[] = [];
        for (let i = 0; i < 11; i++) {
          const cst = fr(0.18) + i * fr(0.15);
          if (s2 < cst) continue;
          const t = (s2 - cst) / fr(0.62);
          if (t >= 1) continue;
          const e = t * t * (3 - 2 * t);
          const j = seed(i * 3 + 1);
          const sx = 700 + j * 130, sy = 428 - j * 46;
          const ex = 250 + seed(i * 5) * 70, ey = 300 + seed(i * 7) * 130;
          const cx = sx + (ex - sx) * e;
          const cy = sy + (ey - sy) * e - Math.sin(e * Math.PI) * 74;
          const stamp = t > 0.4 ? Math.min(1, (t - 0.4) / 0.2) : 0;
          cards.push(TaskCard(cx, cy, -e * 34, 1 - Math.max(0, (t - 0.82) / 0.18), stamp, `f${i}`, 1));
        }

        return (
          <div style={{ position: "absolute", inset: 0 }}>
            <WorkPile lf={s2} cx={PX} baseY={PBASE} mass={pm} w={PW} />

            {/* green ✓ pops on the shrinking mountain */}
            {pm > 0.04 && Array.from({ length: 5 }).map((_, k) => { const at = fr(0.3) + k * fr(0.3); const tt = s2 - at; if (tt < 0 || tt > 14) return null; const pop = Math.max(0, 1 - Math.abs(tt - 5) / 5); const jx = PX + (seed(k * 3) - 0.5) * 170, jy = 476 + seed(k * 5) * 120; return (
              <div key={`pk${k}`} style={{ position: "absolute", left: jx - 16, top: jy - 16, width: 32, height: 32, borderRadius: "50%", background: "#3F8A61", border: "2px solid #EAF6EE", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 18, fontWeight: 900, transform: `scale(${pop})`, opacity: pop, zIndex: 21, boxShadow: "0 3px 8px rgba(0,0,0,0.4)" }}>✓</div>); })}

            {cards}

            {/* the ARMY still swarming - arms pumping as they clear it */}
            {ARMY.map((a, i) => { const work = 0.2 + 0.34 * Math.abs(Math.sin((s2 + i * 13) / 6)); return (
              <Critter key={i} lf={s2 + i * 9} x={a.tx} groundY={a.gy} size={a.size} gaze={i % 2 ? -2 : 2} nodAmp={3.4} nodSpeed={6} cheer={allDone ? 0.5 : work} {...a.cos} />); })}

            {/* the HERO kicks back (left) on a crate with a steaming mug, watching them work */}
            <div style={{ position: "absolute", left: 132, top: 668, width: 66, height: 38, borderRadius: 6, background: "linear-gradient(180deg,#6E5A3C,#42341F)", border: "2px solid #8A6E44", zIndex: 10 }} />
            <Mug x={252} y={588} s={1} f={lf} />
            <Critter lf={s2} x={186} groundY={GY} size={150} nodAmp={1.1} nodSpeed={16} gaze={3} cheer={0.4 + badge * 0.28} />

            {/* the SHIPPED ✓ warm stamp lands over the cleared desk */}
            {badge > 0.02 && (
              <div style={{ position: "absolute", left: 430, top: 402, width: 168, height: 74, transform: `scale(${badge}) rotate(-10deg)`, transformOrigin: "50% 50%", zIndex: 24 }}>
                <div style={{ position: "absolute", inset: 0, borderRadius: 12, border: "4px solid #4E9670", background: "rgba(93,169,126,0.16)", boxShadow: "0 6px 16px rgba(0,0,0,0.3)" }} />
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 9 }}>
                  <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 28, color: "#3F8A61", letterSpacing: 1 }}>SHIPPED</span>
                  <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 28, color: "#3F8A61" }}>✓</span>
                </div>
              </div>
            )}
            {/* warm, muted completion confetti */}
            {allDone > 0 && Array.from({ length: 12 }).map((_, k) => { const a = (k / 12) * Math.PI * 2, d = badge * (58 + seed(k + 9) * 112); return <div key={`cf${k}`} style={{ position: "absolute", left: 514 + Math.cos(a) * d, top: 439 + Math.sin(a) * d, width: 6 + seed(k) * 5, height: 6 + seed(k) * 5, borderRadius: 2, background: k % 3 === 0 ? "#E7B24C" : k % 3 === 1 ? "#C6532E" : "#5FA97E", opacity: 1 - badge * 0.4, transform: `rotate(${badge * 300}deg)`, zIndex: 23 }} />; })}

            {/* light the 4th loadout slot */}
            <LoadoutBar lf={s2} filled={4} x={372} y={728} active={3} />
          </div>
        );
      })()}

      <CutFlash lf={lf} at={CA} /><CutFlash lf={lf} at={CB} />
    </AbsoluteFill>
  );
};

// ============================================================ SCENE 6 - CTA (overpowered Claude, comment ARSENAL)
const ArCTABody: React.FC<{ lf: number }> = ({ lf }) => {
  const CA = 42;                                   // ~1.4s cozy DEN reveal, then blur + keyword
  const shot = lf < CA ? 0 : 1;
  const s0 = lf, s1 = lf - CA;
  const GY = 700;
  const kw = "ARSENAL";
  const typed = Math.min(kw.length, Math.floor(over(s1, fr(0.55), fr(0.8)) * 7));

  // warm ceramic mug with LIVE rising steam (hero's relaxed prop)
  const Mug: React.FC<{ x: number; y: number; s?: number; f: number }> = ({ x, y, s = 1, f }) => (
    <div style={{ position: "absolute", left: x, top: y, width: 34 * s, height: 40 * s, zIndex: 20 }}>
      {[0, 1, 2].map((i) => { const up = ((f * 0.9 + i * 20) % 60) / 60; return (
        <div key={i} style={{ position: "absolute", left: 5 * s + i * 7 * s + Math.sin(f / 7 + i) * 3, top: -12 * s - up * 22 * s, width: 5 * s, height: 11 * s, borderRadius: 5, background: "rgba(255,240,214,0.55)", opacity: (1 - up) * 0.6, filter: "blur(1.4px)" }} />); })}
      <div style={{ position: "absolute", left: 0, top: 5 * s, width: 26 * s, height: 30 * s, borderRadius: "5px 5px 11px 11px", background: "linear-gradient(180deg,#F3E7CE,#D8B77C)", border: `${2 * s}px solid #B8894A`, boxShadow: "0 4px 9px rgba(0,0,0,0.4)" }} />
      <div style={{ position: "absolute", right: -8 * s, top: 11 * s, width: 12 * s, height: 15 * s, borderRadius: "0 8px 8px 0", border: `${3 * s}px solid #B8894A`, borderLeft: "none" }} />
      <div style={{ position: "absolute", left: 3 * s, top: 7 * s, width: 20 * s, height: 5 * s, borderRadius: 3, background: "#4E3218" }} />
    </div>
  );

  // ===== the cozy DEN scene - TIDY + thriving (crisp in shot 0, blurred behind the keyword in shot 1) =====
  const DenScene = (f: number) => (
    <>
      <Den lf={f} wall1="#463524" wall2="#281C10" floor1="#3A2C1C" floor2="#140D06" lampX={506} />
      {/* soft warm wash - calm + thriving (the payoff to the chaotic hook) */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(78% 60% at 50% 40%, rgba(255,214,140,0.16), transparent 72%)", mixBlendMode: "screen", pointerEvents: "none", zIndex: 4 }} />
      {/* warm hanging bulb */}
      <div style={{ position: "absolute", left: 505, top: 92, width: 3, height: 74, background: "#2A2012", zIndex: 6 }} />
      <div style={{ position: "absolute", left: 490, top: 162, width: 34, height: 20, borderRadius: "0 0 40% 40%", background: "#3A2C1A", zIndex: 6 }} />
      <div style={{ position: "absolute", left: 498, top: 178, width: 18, height: 14, borderRadius: "50%", background: "radial-gradient(circle,#FFF0C4,#FFCE7A)", boxShadow: `0 0 44px 16px rgba(255,206,122,${0.34 + Math.sin(f / 22) * 0.03})`, zIndex: 6 }} />

      {/* ===== the loadout SHELF holding the 4 repo logos (the 'arsenal', earned) ===== */}
      <div style={{ position: "absolute", left: 288, top: 316, width: 436, height: 18, borderRadius: 5, background: "linear-gradient(180deg,#6A4E30,#3A2A18)", border: "2px solid #7A5A38", boxShadow: "0 12px 22px rgba(0,0,0,0.42)", zIndex: 12 }} />
      {[300, 712].map((bx, i) => <div key={i} style={{ position: "absolute", left: bx, top: 334, width: 12, height: 26, background: "linear-gradient(180deg,#5A4228,#2E2010)", zIndex: 11 }} />)}
      <div style={{ position: "absolute", left: 288, top: 288, width: 436, textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 15, letterSpacing: 3, color: "#E4C489", opacity: 0.85, zIndex: 12 }}>YOUR&nbsp;LOADOUT</div>
      {REPOS.map((r, i) => { const p = over(f, fr(0.12) + i * 3, fr(0.42), Easing.out(Easing.back(1.5))); if (p <= 0.02) return null; const cx = 306 + i * 100; return (
        <div key={i} style={{ position: "absolute", left: cx, top: 316 - 66 * p, transform: `scale(${p})`, transformOrigin: "50% 100%", zIndex: 13 }}><RepoLogo src={r.logo} w={66} /></div>); })}

      {/* desk */}
      <div style={{ position: "absolute", left: 110, top: GY - 16, width: 792, height: 54, borderRadius: 8, background: "linear-gradient(180deg,#6A4E30,#3E2C18)", border: "2px solid #7A5A38", boxShadow: "0 14px 26px rgba(0,0,0,0.4)", zIndex: 9 }} />
      {/* plant */}
      <div style={{ position: "absolute", left: 148, top: GY - 74, width: 46, height: 58, zIndex: 10 }}>
        <div style={{ position: "absolute", left: 8, bottom: 0, width: 30, height: 22, borderRadius: "4px 4px 7px 7px", background: "#8A5A34" }} />
        {[0, 1, 2, 3].map((i) => <div key={i} style={{ position: "absolute", left: 14 + i * 5, bottom: 18, width: 9, height: 34 - (i % 2) * 10, borderRadius: 6, background: "#4E7A44", transformOrigin: "50% 100%", transform: `rotate(${(i - 1.5) * 20}deg)` }} />)}
      </div>
      {/* small warm monitor on the desk showing a calm 'ready' screen (dev den detail) */}
      <div style={{ position: "absolute", left: 306, top: GY - 132, width: 118, height: 82, zIndex: 14 }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: 10, background: "linear-gradient(180deg,#2A2012,#150E06)", border: "3px solid #5A4230", boxShadow: "0 10px 20px rgba(0,0,0,0.5)" }} />
        <div style={{ position: "absolute", left: 12, top: 14, display: "flex", alignItems: "center", gap: 7 }}>
          <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#3F9E74", boxShadow: "0 0 6px rgba(63,158,116,0.5)" }} />
          <span style={{ fontFamily: mono, fontSize: 14, color: "#E4C489", letterSpacing: 1 }}>READY</span>
        </div>
        {[0.5, 0.72].map((fy, i) => <div key={i} style={{ position: "absolute", left: 12, top: 82 * fy, width: [70, 48][i], height: 4, borderRadius: 2, background: "rgba(228,196,137,0.32)" }} />)}
      </div>
      {/* monitor stand */}
      <div style={{ position: "absolute", left: 357, top: GY - 50, width: 16, height: 34, background: "#3A2A18", borderRadius: "0 0 3px 3px", zIndex: 13 }} />

      {/* ===== the trio: two happy helpers flanking a relaxed hero ===== */}
      {/* left helper - hard hat, gently nodding, watching the hero */}
      <Critter lf={f} x={208} groundY={GY} size={130} nodAmp={2.0} nodSpeed={9} gaze={3} cheer={0.14} constr={1} />
      {/* HERO - relaxed at the desk with a mug (calm, contented) */}
      <Critter lf={f} x={506} groundY={GY} size={156} nodAmp={1.5} nodSpeed={11} gaze={1} cheer={0.05} />
      <Mug x={556} y={GY - 60} s={1.25} f={f} />
      {/* right helper - glasses, WAVING hello (arms rise + fall gently = the one clear mover) */}
      <Critter lf={f} x={800} groundY={GY} size={130} nodAmp={2.2} nodSpeed={9} gaze={-3} cheer={0.3 + 0.12 * Math.abs(Math.sin(f / 6))} glasses={1} />

      {/* extra warm vignette to pull focus centre */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(96% 80% at 50% 48%, transparent 44%, rgba(18,11,5,0.5) 100%)", pointerEvents: "none", zIndex: 15 }} />
    </>
  );

  const veil = over(s1, 0, fr(0.28));
  const ctaIn = over(s1, fr(0.12), fr(0.42), Easing.out(Easing.back(1.1)));
  const kwPulse = 1 + Math.sin(lf / 3.4) * 0.03;

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      {shot === 0 && <>{DenScene(s0)}</>}
      {shot === 1 && (<>
        {/* the SAME den, now BLURRED + a warm dark scrim, with the keyword over it (CHART/POSTS ending) */}
        <div style={{ position: "absolute", inset: 0, filter: "blur(7px)", transform: "scale(1.05)", transformOrigin: "50% 50%" }}>{DenScene(lf)}</div>
        <div style={{ position: "absolute", inset: 0, background: `rgba(20,12,6,${0.4 + 0.15 * veil})`, zIndex: 50 }} />
        {/* comment keyword overlay - muted 'comment' + big CLAY 'ARSENAL' + a warm comment pill */}
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 60, transform: `translateY(${(1 - ctaIn) * 26}px)`, opacity: Math.min(1, ctaIn * 1.4) }}>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 30, color: WARM.sub, letterSpacing: 2, marginBottom: 4 }}>comment</div>
          <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 100, color: CLAY, letterSpacing: "-0.02em", lineHeight: 1, textShadow: "0 8px 40px rgba(0,0,0,0.5)", transform: `scale(${kwPulse})` }}>ARSENAL</div>
          {/* the comment pill: clay dot + live typing + blinking cursor */}
          <div style={{ marginTop: 30, display: "inline-flex", alignItems: "center", gap: 13, padding: "13px 24px", borderRadius: 999, background: "rgba(251,247,238,0.96)", border: `1.5px solid ${WARM.line}`, boxShadow: "0 18px 40px -16px rgba(12,7,3,0.7)" }}>
            <span style={{ width: 14, height: 14, borderRadius: "50%", background: CLAY, boxShadow: "0 0 0 4px rgba(210,114,78,0.18)", flexShrink: 0 }} />
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 28, color: WARM.ink, letterSpacing: 0.6 }}>{kw.slice(0, typed)}<span style={{ opacity: lf % 16 < 8 ? 1 : 0.15, color: CLAY }}>|</span></span>
          </div>
        </div>
      </>)}
      <CutFlash lf={lf} at={CA} />
    </AbsoluteFill>
  );
};

// ============================================================ SCENE WRAPPERS
const ArHook = ({ lf }: { lf: number }) => <Panel label=""><ArHookBody lf={lf} /><ScreenHead lf={lf} big="CLAUDE CODE IS" clay="BURNING YOUR TOKENS" chip={false} /></Panel>;
const ArVault = ({ lf }: { lf: number }) => <Panel label=""><ArVaultBody lf={lf} /><ScreenHead lf={lf} big="IT SHOVES IN YOUR" clay="WHOLE CODEBASE" /></Panel>;
const ArRouter = ({ lf }: { lf: number }) => <Panel label=""><ArRouterBody lf={lf} /><ScreenHead lf={lf} big="STOP OVERPAYING" clay="FOR TOKENS" /></Panel>;
const ArRepomix = ({ lf }: { lf: number }) => <Panel label=""><ArRepomixBody lf={lf} /><ScreenHead lf={lf} big="YOUR WHOLE REPO," clay="ONE FILE" /></Panel>;
const ArGraphiti = ({ lf }: { lf: number }) => <Panel label=""><ArGraphitiBody lf={lf} /><ScreenHead lf={lf} big="CLAUDE STOPS" clay="FORGETTING" /></Panel>;
const ArTaskmaster = ({ lf }: { lf: number }) => <Panel label=""><ArTaskmasterBody lf={lf} /><ScreenHead lf={lf} big="ONE GOAL," clay="IT FINISHES IT" /></Panel>;
const ArCTA = ({ lf }: { lf: number }) => <Panel label=""><ArCTABody lf={lf} /></Panel>;

// hook header (verbatim)
const ScreenHead: React.FC<{ lf: number; big: string; clay: string; chip?: boolean }> = ({ lf, big, clay, chip = true }) => { const p = over(lf, 0, fr(0.4), Easing.out(Easing.back(1.5)));
  const _len = (big + " " + clay).length;
  const _fs = _len > 30 ? 56 : _len > 24 ? 62 : _len > 19 ? 66 : 72;
  return (<>
  {chip && (
  <div style={{ position: "absolute", right: 26, top: 22, zIndex: 46, transform: `scale(${1 + 0.035 * Math.abs(Math.sin(lf / 6))})`, display: "flex", alignItems: "center", gap: 7, padding: "7px 14px", borderRadius: 12, background: "linear-gradient(180deg,#14B88F,#0C7D62)", border: "2px solid #7FE8CE", boxShadow: "0 6px 16px rgba(0,0,0,0.5), 0 0 12px rgba(16,163,127,0.55)" }}>
    <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#EAFFF7", boxShadow: `0 0 8px #EAFFF7`, opacity: 0.6 + 0.4 * Math.abs(Math.sin(lf / 5)) }} />
    <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 15, color: "#FFFFFF", letterSpacing: 0.3 }}>CLAUDE · LIVE</span>
  </div>)}
  <div style={{ position: "absolute", left: 40, right: 40, top: 58, textAlign: "center", zIndex: 46 }}><span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: _fs, lineHeight: 1.08, display: "inline-block", color: "#F4EEDF", textShadow: "0 4px 16px rgba(0,0,0,0.85), 0 2px 6px rgba(0,0,0,0.7), 0 0 22px rgba(0,0,0,0.5)" }}>{big} <span style={{ color: "#F0A878" }}>{clay}</span></span></div>
</>); };

const Sfx: React.FC<{ at: number; src: string; v?: number; dur?: number }> = ({ at, src, v = 0.35, dur = 2.2 }) => (
  <Sequence from={fr(at)} durationInFrames={fr(dur)}><Audio src={staticFile(`sfx/${src}`)} volume={v} /></Sequence>
);

// ---------------- progress bar (standing game-arc) - retuned for 38.6s reel ----------------
const ProgressBar: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const VIRT = 40.0;
  const p = Math.min(1, t / VIRT);
  const marks = [9.66, 23.02, 34.5];
  const STARS = [3.0, 15.98, 28.48, 36.5];
  const TOTAL = VIRT;
  const PELLETS = [1.5, 6.5, 12, 19, 26, 31, 37];
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
        const np = pt / TOTAL; const de = t - pt; if (de > 0.55) return null;
        return (<div key={`pl${i}`} style={{ position: "absolute", left: `${np * 100}%`, top: 31, transform: "translate(-50%, -50%)" }}>
          {de < 0 && <div style={{ width: 13, height: 13, borderRadius: "50%", background: GOLD, border: "2px solid #F6E4A0", boxShadow: `0 0 9px ${GOLD}`, opacity: 0.9, transform: `scale(${1 + Math.sin(f / 7 + i * 2) * 0.16})` }} />}
          {de >= 0 && <><div style={{ position: "absolute", left: -7, top: -7, width: 14, height: 14, borderRadius: "50%", border: `3px solid ${GOLD}`, transform: `scale(${1 + de * 7})`, opacity: Math.max(0, 1 - de * 2.1) }} /></>}
        </div>); })}
      {STARS.map((m, i) => {
        const np = m / TOTAL; const passed = t >= m; const dt = passed ? t - m : 0;
        const pop = passed ? 1 + Math.max(0, 1 - dt * 2.0) * 0.6 * (1 + Math.sin(Math.min(dt, 0.5) * 24) * 0.3) : 1 + Math.sin(t * 2.6) * 0.06;
        return (<div key={`st${i}`} style={{ position: "absolute", left: `${np * 100}%`, top: 7, transform: "translateX(-50%)", width: 48, height: 48 }}>
          <div style={{ position: "absolute", inset: 0, transform: `scale(${pop})`, borderRadius: "50%", background: passed ? grad("#F0CB63", "#D39A2A") : "#25314A", border: `4px solid ${passed ? "#F6E4A0" : GOLD}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, color: passed ? "#fff" : GOLD, boxShadow: passed ? (dt < 0.5 ? `0 0 ${Math.max(6, 28 - dt * 40)}px ${GOLD}` : `0 0 14px ${GOLD}99`) : `0 0 12px ${GOLD}66` }}>★</div>
        </div>); })}
      {marks.map((m, i) => {
        const np = m / TOTAL; const passed = t >= m; const dt = passed ? t - m : 0; const teased = i === 2 && !passed;
        const pop = passed ? 1 + Math.max(0, 1 - dt * 2.0) * 0.62 * (1 + Math.sin(Math.min(dt, 0.5) * 24) * 0.3) : 1;
        return (<div key={i} style={{ position: "absolute", left: `${np * 100}%`, top: 2, transform: "translateX(-50%)", width: 56, height: 56 }}>
          <div style={{ position: "absolute", inset: 0, transform: `scale(${pop})`, borderRadius: "50%", background: passed ? GREEN : (teased ? "#25314A" : "#EDE7DB"), border: `4px solid ${passed ? GREEN : (teased ? AMBER : CLAY)}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 26, color: passed ? "#fff" : (teased ? AMBER : CLAY), boxShadow: passed ? (dt < 0.5 ? `0 0 ${Math.max(6, 30 - dt * 44)}px ${GOLD}` : `0 0 18px ${GREEN}`) : (teased ? `0 0 16px ${AMBER}99` : "0 2px 6px rgba(0,0,0,0.2)") }}>{passed ? "✓" : i + 1}</div>
        </div>); })}
      {(() => {
        const cs = 24 + Math.min(1, eaten / 16) * 42;
        const cc: any = {};
        if (eaten >= 5) cc.glasses = 1;
        if (eaten >= 10) { cc.constr = 1; cc.glasses = 0; }
        const cpop = Math.max(0, 1 - (t - lastInc) * 4) * 0.2;
        return (<div style={{ position: "absolute", left: `${p * 100}%`, top: -6 - cs, transform: `translateX(-50%) scale(${1 + cpop})`, zIndex: 127, filter: `drop-shadow(0 0 8px ${GOLD}99)` }}>
          <Mascot lf={f} size={cs} nodAmp={3} nodSpeed={6} cheer={0.35} gaze={2} {...cc} />
        </div>);
      })()}
      {(() => { const cheerV = Math.max(t >= CLOCK_START ? 1 : 0, incPop * 0.75); return (
        <div style={{ position: "absolute", left: `${p * 100}%`, top: -10, transform: "translateX(-50%)", zIndex: 126 }}>
          <div style={{ position: "absolute", inset: -6, borderRadius: "50%", background: "#FBF8F1", border: `5px solid ${GREEN}`, boxShadow: incPop > 0.05 ? `0 0 ${14 + incPop * 16}px ${GOLD}` : `0 0 10px ${GREEN}66, 0 5px 14px rgba(26,24,19,0.4)` }} />
          <div style={{ position: "relative" }}><Mascot lf={f} size={66} nodAmp={2.2 + incPop * 2.4} nodSpeed={6.5} cheer={cheerV} gaze={2} /></div>
          <div style={{ position: "absolute", left: "50%", top: 64, transform: `translateX(-50%) scale(${1 + incPop * 0.38})`, padding: "3px 12px", borderRadius: 999, background: grad("#F0CB63", "#D39A2A"), border: "2px solid #F6E4A0", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 20, color: "#3a2a05", whiteSpace: "nowrap", boxShadow: incPop > 0.05 ? `0 0 12px ${GOLD}` : "0 3px 8px rgba(26,24,19,0.3)" }}>{"★ " + score}</div>
        </div>); })()}
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

// ============================================================ MAIN
export const ClaudeSerenaReel: React.FC = () => {
  const frame = useCurrentFrame();
  let punch = 0;
  for (const b of Lf.slice(1)) { const d = frame - b; if (d >= 0 && d < 9) punch = Math.max(punch, Math.pow(1 - d / 9, 2)); }
  const zoom = interpolate(frame, [0, 16, 28], [1.0, 1.02, 1.0], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) }) + punch * 0.024;
  const scene = (i: number) => frame >= Lf[i] && (i === Lf.length - 1 || frame < Lf[i + 1]);
  const bedVol = (ff: number) => interpolate(ff, [fr(0), fr(2), fr(5.6), fr(9.6), fr(20), fr(28.4), fr(34.9), fr(37), fr(38.5)], [0.20, 0.22, 0.17, 0.16, 0.15, 0.16, 0.15, 0.08, 0.04], CL);
  return (
    <AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
      <Audio src={staticFile("69_serena_vo.wav")} />
      <Audio src={staticFile("seo_music.wav")} volume={bedVol} />

      {/* ===== ARSENAL SOUND DESIGN - synced to physical action; at = L[i] + local seconds ===== */}
      {[L[1], L[2], L[3], L[4], L[5], L[6]].map((tt, i) => <Sfx key={`ct${i}`} at={tt} src="lib_whoosh_fast.wav" v={0.14} dur={0.25} />)}
      {/* HOOK - avalanche SLAM buries Claude (3-deep) + money climbs + chute dumps */}
      <Sfx at={L[0] + 0.5} src="impact.wav" v={0.5} dur={0.6} />
      <Sfx at={L[0] + 0.5} src="lib_boom.wav" v={0.4} dur={0.9} />
      <Sfx at={L[0] + 0.52} src="sub.wav" v={0.3} dur={0.7} />
      <Sfx at={L[0] + 0.55} src="construction.wav" v={0.14} dur={0.6} />
      <Sfx at={L[0] + 1.7} src="glitch_counter.mp3" v={0.15} dur={1.2} />
      <Sfx at={L[0] + 3.4} src="lib_deep_whoosh.wav" v={0.16} dur={0.5} />
      <Sfx at={L[0] + 3.75} src="m_bump.wav" v={0.24} dur={0.4} />
      {/* VAULT - cabinet swings open, 4 crates THUD in */}
      <Sfx at={L[1] + 0.5} src="lib_whoosh.wav" v={0.18} dur={0.5} />
      <Sfx at={L[1] + 0.7} src="m_bump.wav" v={0.22} dur={0.4} />
      {[0, 1, 2, 3].map((i) => <Sfx key={`vt${i}`} at={L[1] + 2.37 + i * 0.27} src="thock.wav" v={0.24 + i * 0.02} dur={0.3} />)}
      <Sfx at={L[1] + 3.2} src="m_powerup.wav" v={0.2} dur={0.6} />
      {/* ROUTER - flood redlines, install, sorter, meter flips green + SAVED */}
      <Sfx at={L[2] + 0.2} src="glitch_counter.mp3" v={0.15} dur={1.4} />
      <Sfx at={L[2] + 1.95} src="lib_click.wav" v={0.2} dur={0.3} />
      <Sfx at={L[2] + 2.05} src="construction.wav" v={0.1} dur={2.2} />
      {[2.3, 2.9, 3.5].map((d, i) => <Sfx key={`rs${i}`} at={L[2] + d} src="swish.wav" v={0.16} dur={0.35} />)}
      {[2.5, 3.1, 3.7].map((d, i) => <Sfx key={`rc${i}`} at={L[2] + d} src="m_coin.wav" v={0.16} dur={0.3} />)}
      <Sfx at={L[2] + 4.5} src="glitch_counter.mp3" v={0.16} dur={1.0} />
      <Sfx at={L[2] + 5.5} src="cash-register.mp3" v={0.22} dur={0.7} />
      {/* REPOMIX - spill, install, compactor SLAM (3-deep, riser 1), cube loads */}
      <Sfx at={L[3] + 0.2} src="lib_paper.wav" v={0.16} dur={1.3} />
      <Sfx at={L[3] + 2.0} src="metal_riser.wav" v={0.4} dur={1.25} />
      <Sfx at={L[3] + 3.25} src="impact.wav" v={0.5} dur={0.6} />
      <Sfx at={L[3] + 3.25} src="lib_boom.wav" v={0.38} dur={0.9} />
      <Sfx at={L[3] + 3.27} src="sub.wav" v={0.3} dur={0.7} />
      <Sfx at={L[3] + 4.8} src="shimmer.wav" v={0.2} dur={0.7} />
      <Sfx at={L[3] + 5.9} src="lib_confirm.wav" v={0.22} dur={0.6} />
      {/* GRAPHITI - squeegee wipe, install, web springs, bounce */}
      <Sfx at={L[4] + 0.4} src="swish.wav" v={0.2} dur={0.6} />
      <Sfx at={L[4] + 0.5} src="downer.mp3" v={0.16} dur={0.7} />
      <Sfx at={L[4] + 1.9} src="lib_magic_reveal.wav" v={0.2} dur={1.0} />
      {[0, 1, 2, 3].map((i) => <Sfx key={`gp${i}`} at={L[4] + 2.1 + i * 0.22} src={`blip${i + 1}.wav`} v={0.16} dur={0.22} />)}
      <Sfx at={L[4] + 4.3} src="boing.wav" v={0.2} dur={0.5} />
      {/* TASKMASTER - goal drops, checklist unspools, cascading checks */}
      <Sfx at={L[5] + 0.8} src="thock.wav" v={0.26} dur={0.3} />
      <Sfx at={L[5] + 2.0} src="lib_paper.wav" v={0.16} dur={1.0} />
      {[0, 1, 2, 3, 4, 5].map((i) => <Sfx key={`tm${i}`} at={L[5] + 4.1 + i * 0.16} src="lib_click.wav" v={0.16} dur={0.2} />)}
      <Sfx at={L[5] + 5.2} src="lib_correct.wav" v={0.2} dur={0.6} />
      {/* CTA - sweep the pile, 4 logos snap, riser 2, keyword */}
      <Sfx at={L[6] + 0.1} src="lib_deep_whoosh.wav" v={0.2} dur={0.6} />
      {[0, 1, 2, 3].map((i) => <Sfx key={`cs${i}`} at={L[6] + 0.2 + i * 0.13} src="snap.wav" v={0.2} dur={0.3} />)}
      <Sfx at={L[6] + 0.4} src="metal_riser.wav" v={0.38} dur={1.0} />
      <Sfx at={L[6] + 1.7} src="m_1up.wav" v={0.24} dur={0.8} />
      <Sfx at={L[6] + 1.8} src="resolve.wav" v={0.24} dur={1.1} />
      <Bg />
      <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "50% 46%" }}>
        {scene(0) ? <ArHook lf={frame - Lf[0]} /> : null}
        {scene(1) ? <ArVault lf={frame - Lf[1]} /> : null}
        {scene(2) ? <ArRouter lf={frame - Lf[2]} /> : null}
        {scene(3) ? <ArRepomix lf={frame - Lf[3]} /> : null}
        {scene(4) ? <ArGraphiti lf={frame - Lf[4]} /> : null}
        {scene(5) ? <ArTaskmaster lf={frame - Lf[5]} /> : null}
        {scene(6) ? <ArCTA lf={frame - Lf[6]} /> : null}
        <Captions />
      </AbsoluteFill>
      <ProgressBar />
      {(() => { let fl = 0; for (const b of Lf.slice(1)) { const d = frame - b; if (d >= 0 && d < 7) fl = Math.max(fl, Math.pow(1 - d / 7, 2)); } return fl > 0 ? <AbsoluteFill style={{ background: "#FFF6E6", opacity: fl * 0.4, zIndex: 200, pointerEvents: "none" }} /> : null; })()}
    </AbsoluteFill>
  );
};
