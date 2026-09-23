import React from "react";
import { AbsoluteFill } from "remotion";
import { fraunces, frauncesItalic, inter } from "./fonts";

// ============================================================================
// CAROUSEL POST CONCEPTS — 6 style directions for @nocodealex static carousels
// Design area = 1080x1350 (4:5). Review "plates" = 1080x1470 (design + label bar).
//
// House rules applied: ONE hero per slide + RICH environment (never a hero in a
// void) + margin satellites · dressed sprites, distinct costume per scene ·
// no emoji pictographs · no low-opacity content · no colliding components ·
// mute-readable claim · real numbers · gate the HOW.
// ============================================================================

export const CREAM = "#ECE9E2", INK = "#1A1813", SLATE = "#3A5C84", CLAY = "#D2724E", AMBER = "#CF9544", GOLD = "#E7B24C", GREEN = "#3F9E74", RED = "#C44A3A";
export const TERM = "#0E1626", TERM2 = "#0A1120", NAVY = "#222F4D", STAR = "#EAD9A4";
export const mono = "ui-monospace,'SF Mono',Menlo,monospace";
export const grad = (a: string, b: string) => `linear-gradient(158deg, ${a} 0%, ${b} 100%)`;
export const NAVYSH = "0 34px 66px -22px rgba(18,28,58,0.55), 0 10px 24px rgba(18,28,58,0.30)";
export const seed = (n: number) => { const x = Math.sin(n * 127.1 + 43.7) * 43758.5453; return x - Math.floor(x); };

// ------------------------------- primitives -------------------------------
export const Bloom: React.FC<{ x: number; y: number; r: number; c: string; o?: number }> = ({ x, y, r, c, o = 1 }) => (
  <div style={{ position: "absolute", left: x - r, top: y - r, width: r * 2, height: r * 2, borderRadius: "50%", background: `radial-gradient(circle, ${c}, transparent 66%)`, opacity: o, filter: "blur(8px)", pointerEvents: "none" }} />
);

// ⛔ `dark` is REQUIRED on the dark panel: an rgba(6,10,22) shadow on a #0E1626 panel is
// invisible (dark-on-dark), which reads to every critic as "the sprite has no shadow at all".
export const ContactShadow: React.FC<{ x: number; y: number; w: number; h?: number; o?: number; dark?: boolean }> = ({ x, y, w, h = 22, o = 0.5, dark }) => (
  <div style={{ position: "absolute", left: x - w / 2, top: y, width: w, height: h, borderRadius: "50%", background: dark ? `radial-gradient(ellipse, rgba(0,0,0,${Math.min(1, o + 0.35)}), transparent 72%)` : `radial-gradient(ellipse, rgba(6,10,22,${o}), transparent 70%)`, filter: "blur(5px)", pointerEvents: "none" }} />
);

// The art scenes are authored in a fixed 500x360 space; the card's art window is only
// ~378x301 (and smaller again on the fan). Without this every scene silently clipped
// past x~378 — which is what put the mast through Ben's head and halved Kate's discs.
export const ART_W = 500, ART_H = 360;
export const ScaledArt: React.FC<{ w: number; h: number; children: React.ReactNode }> = ({ w, h, children }) => (
  <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
    <div style={{ position: "absolute", left: 0, top: 0, width: ART_W, height: ART_H, transform: `scale(${w / ART_W}, ${h / ART_H})`, transformOrigin: "0 0" }}>{children}</div>
  </div>
);

export const Sheen: React.FC<{ r?: number }> = ({ r = 20 }) => (
  <div style={{ position: "absolute", inset: 0, borderRadius: r, background: "linear-gradient(125deg, rgba(255,255,255,0.30) 0%, transparent 33%)", pointerEvents: "none" }} />
);

export const GodRay: React.FC<{ x: number; w: number; h: number; deg?: number; c?: string }> = ({ x, w, h, deg = 14, c = "rgba(255,240,205,0.16)" }) => (
  <div style={{ position: "absolute", left: x, top: -40, width: w, height: h, background: `linear-gradient(to bottom, ${c}, transparent 78%)`, transform: `skewX(${deg}deg)`, filter: "blur(6px)", mixBlendMode: "screen", pointerEvents: "none" }} />
);

export const Dust: React.FC<{ n?: number; w: number; h: number; c?: string; s?: number }> = ({ n = 22, w, h, c = "rgba(240,230,205,0.85)", s = 0 }) => (
  <>
    {Array.from({ length: n }, (_, i) => {
      const sz = 2 + seed(i + s) * 4;
      return <div key={i} style={{ position: "absolute", left: seed(i * 2.7 + s) * w, top: seed(i * 1.9 + s) * h, width: sz, height: sz, borderRadius: "50%", background: c, opacity: 0.35 + seed(i * 3.1 + s) * 0.4 }} />;
    })}
  </>
);

export const Halftone: React.FC<{ o?: number; size?: number }> = ({ o = 0.16, size = 7 }) => (
  <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(circle, rgba(0,0,0,${o}) 1.3px, transparent 1.4px)`, backgroundSize: `${size}px ${size}px`, pointerEvents: "none" }} />
);

export const PaperGrain: React.FC = () => (
  <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 20% 30%, rgba(160,140,110,0.10) 0.8px, transparent 1px), radial-gradient(circle at 70% 60%, rgba(160,140,110,0.08) 0.7px, transparent 1px)", backgroundSize: "5px 5px, 7px 7px", pointerEvents: "none" }} />
);

// ------------------------------- backgrounds -------------------------------
export const CreamBg: React.FC = () => (
  <AbsoluteFill style={{ background: grad("#EFEBE3", "#E4DFD4") }}>
    <Bloom x={60} y={340} r={340} c="rgba(210,114,78,0.17)" />
    <Bloom x={1010} y={900} r={380} c="rgba(58,92,132,0.15)" />
    <div style={{ position: "absolute", left: -60, top: -60, width: 700, height: 700, background: "radial-gradient(circle at 30% 30%, rgba(255,248,235,0.5), transparent 60%)" }} />
    <PaperGrain />
    <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 300px rgba(40,32,24,0.24)" }} />
  </AbsoluteFill>
);

export const DarkBg: React.FC = () => (
  <AbsoluteFill style={{ background: grad("#101A30", TERM2) }}>
    {Array.from({ length: 9 }, (_, i) => <div key={`v${i}`} style={{ position: "absolute", left: 60 + i * 120, top: 0, bottom: 0, width: 1, background: "rgba(120,150,210,0.10)" }} />)}
    {Array.from({ length: 12 }, (_, i) => <div key={`h${i}`} style={{ position: "absolute", top: 60 + i * 120, left: 0, right: 0, height: 1, background: "rgba(120,150,210,0.10)" }} />)}
    <Bloom x={540} y={430} r={380} c="rgba(210,114,78,0.16)" />
    <Bloom x={980} y={1160} r={340} c="rgba(58,92,132,0.24)" />
    <Dust n={26} w={1080} h={1350} c="rgba(190,215,255,0.7)" s={11} />
    <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 340px rgba(0,0,0,0.55)" }} />
  </AbsoluteFill>
);

const BlueprintBg: React.FC = () => (
  <AbsoluteFill style={{ background: grad("#17253F", "#0F1930") }}>
    {Array.from({ length: 27 }, (_, i) => <div key={`v${i}`} style={{ position: "absolute", left: 40 + i * 40, top: 0, bottom: 0, width: 1, background: "rgba(190,215,255,0.07)" }} />)}
    {Array.from({ length: 34 }, (_, i) => <div key={`h${i}`} style={{ position: "absolute", top: 30 + i * 40, left: 0, right: 0, height: 1, background: "rgba(190,215,255,0.07)" }} />)}
    {Array.from({ length: 7 }, (_, i) => <div key={`V${i}`} style={{ position: "absolute", left: 40 + i * 160, top: 0, bottom: 0, width: 1.5, background: "rgba(190,215,255,0.16)" }} />)}
    {Array.from({ length: 9 }, (_, i) => <div key={`H${i}`} style={{ position: "absolute", top: 30 + i * 160, left: 0, right: 0, height: 1.5, background: "rgba(190,215,255,0.16)" }} />)}
    <Bloom x={520} y={640} r={420} c="rgba(140,175,235,0.16)" />
    <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 320px rgba(4,8,20,0.6)" }} />
  </AbsoluteFill>
);

// ------------------------- Mascot (canonical + costumes) -------------------------
export const Mascot: React.FC<{ lf?: number; size?: number; gaze?: number; shock?: number; cheer?: number; stern?: number; glasses?: number; wizard?: number; sherlock?: number; suit?: number; constr?: number; chef?: number; cop?: number; neo?: number; crown?: number; grad_?: number; ironman?: number; pirate?: number; greek?: number; spy?: number; tux?: number; wolf?: number }> = ({ lf = 20, size = 250, gaze = 0, shock = 0, cheer = 0, stern = 0, glasses = 0, wizard = 0, sherlock = 0, suit = 0, constr = 0, chef = 0, cop = 0, neo = 0, crown = 0, grad_ = 0, ironman = 0, pirate = 0, greek = 0, spy = 0, tux = 0, wolf = 0 }) => {
  const C = "#D97757";
  const blink = (lf % 84) < 5 && shock < 0.3 ? 0.15 : 1;
  const eyeH = (26 + shock * 16) * blink * (1 - stern * 0.5);
  const armY = 86 - cheer * 26;
  return (
    <div style={{ width: size, height: size, position: "relative" }}>
      <svg viewBox="0 0 200 200" width={size} height={size} shapeRendering="crispEdges" style={{ overflow: "visible" }}>
        {/* neo trench coat tails BEHIND body (stop above the legs so they don't read as extra limbs) */}
        {neo > 0 && <><rect x={20} y={98} width={22} height={54} fill="#14141A" /><rect x={158} y={98} width={22} height={54} fill="#14141A" /></>}
        {/* greek: red cape BEHIND the body */}
        {greek > 0 && <><rect x={14} y={56} width={24} height={116} fill="#9E2B2B" /><rect x={162} y={56} width={24} height={116} fill="#9E2B2B" /><rect x={14} y={164} width={24} height={8} fill="#7A1F1F" /><rect x={162} y={164} width={24} height={8} fill="#7A1F1F" /></>}
        <rect x={8 - cheer * 4} y={armY} width={26} height={26} fill={C} transform={cheer > 0.2 ? `rotate(${-cheer * 28} 21 ${armY + 13})` : undefined} />
        <rect x={166 + cheer * 4} y={armY} width={26} height={26} fill={C} transform={cheer > 0.2 ? `rotate(${cheer * 28} 179 ${armY + 13})` : undefined} />
        <rect x={34} y={44} width={132} height={102} fill={C} />
        <rect x={34} y={44} width={132} height={10} fill="rgba(255,255,255,0.16)" />
        {cop > 0 && <>
          <rect x={34} y={106} width={132} height={40} fill="#3E6FBF" /><rect x={34} y={106} width={132} height={6} fill="#2E55A3" />
          <rect x={96} y={116} width={9} height={9} fill={GOLD} /><rect x={96} y={130} width={9} height={9} fill={GOLD} />
          <rect x={48} y={114} width={13} height={13} fill={GOLD} /><rect x={51} y={111} width={7} height={4} fill={GOLD} />
        </>}
        {suit > 0 && <>
          <rect x={34} y={106} width={132} height={40} fill="#26324A" /><rect x={34} y={106} width={132} height={6} fill="#1A2438" />
          <rect x={88} y={106} width={24} height={40} fill="#F4F1EA" /><polygon points="88,106 100,124 112,106" fill="#26324A" />
          <rect x={95} y={116} width={10} height={28} fill="#8B2E2E" /><polygon points="95,116 100,110 105,116" fill="#8B2E2E" />
        </>}
        {neo > 0 && <>
          <rect x={34} y={100} width={132} height={46} fill="#22222C" /><rect x={34} y={100} width={132} height={6} fill="#14141A" />
          <rect x={86} y={100} width={28} height={46} fill="#4A4A5C" />
          <polygon points="86,100 100,124 114,100" fill="#14141A" />
          <rect x={60} y={104} width={11} height={42} fill="#33333F" /><rect x={129} y={104} width={11} height={42} fill="#33333F" />
        </>}
        {constr > 0 && <>
          <rect x={34} y={106} width={132} height={40} fill="#E4622B" />
          <rect x={44} y={113} width={112} height={5} fill="#F4F1EA" /><rect x={44} y={134} width={112} height={5} fill="#F4F1EA" />
          <rect x={92} y={106} width={16} height={40} fill="#C94E1C" />
        </>}
        {chef > 0 && <>
          <rect x={34} y={106} width={132} height={40} fill="#F4F1EA" /><rect x={34} y={106} width={132} height={6} fill="#E2DDD0" />
          <rect x={92} y={106} width={8} height={40} fill="#D8D2C4" />
          <rect x={70} y={116} width={7} height={7} fill="#3A4456" /><rect x={70} y={130} width={7} height={7} fill="#3A4456" /><rect x={123} y={116} width={7} height={7} fill="#3A4456" /><rect x={123} y={130} width={7} height={7} fill="#3A4456" />
        </>}
        {wizard > 0 && <>
          <rect x={34} y={102} width={132} height={44} fill="#4B3E8E" /><rect x={34} y={102} width={132} height={6} fill="#3A2F73" />
          <rect x={70} y={116} width={9} height={9} fill={GOLD} /><rect x={120} y={124} width={9} height={9} fill={GOLD} /><rect x={52} y={128} width={8} height={8} fill={GOLD} />
        </>}
        {sherlock > 0 && <>
          <rect x={30} y={98} width={140} height={26} fill="#9C7A50" /><rect x={30} y={120} width={140} height={5} fill="#7A5A3C" />
          <rect x={64} y={104} width={8} height={8} fill="#7A5A3C" /><rect x={126} y={106} width={8} height={8} fill="#7A5A3C" />
        </>}
        {grad_ > 0 && <>
          <rect x={34} y={104} width={132} height={42} fill="#2E2A44" /><rect x={34} y={104} width={132} height={6} fill="#221E36" />
          <rect x={92} y={104} width={16} height={42} fill="#F4F1EA" />
          <rect x={80} y={104} width={7} height={30} fill="#8B2E2E" transform="rotate(-8 83 119)" /><rect x={113} y={104} width={7} height={30} fill="#8B2E2E" transform="rotate(8 116 119)" />
        </>}
        {/* ---- CREW movie costumes (reel 33): torsos ---- */}
        {/* MIA — Iron Man: red/gold plate + arc reactor */}
        {ironman > 0 && <>
          <rect x={34} y={102} width={132} height={44} fill="#B33A2B" /><rect x={34} y={102} width={132} height={6} fill="#8E2B1F" />
          <rect x={34} y={102} width={26} height={44} fill="#E7B24C" /><rect x={140} y={102} width={26} height={44} fill="#E7B24C" />
          <rect x={34} y={140} width={132} height={6} fill="#E7B24C" />
          <circle cx={100} cy={122} r={13} fill="#0E2A3A" /><circle cx={100} cy={122} r={9} fill="#7FE8FF" /><circle cx={100} cy={122} r={4.5} fill="#EAFBFF" />
        </>}
        {/* JACK — sales floor: navy suit + red tie */}
        {wolf > 0 && <>
          <rect x={34} y={106} width={132} height={40} fill="#243456" /><rect x={34} y={106} width={132} height={6} fill="#1A2740" />
          <rect x={88} y={106} width={24} height={40} fill="#F4F1EA" /><polygon points="88,106 100,124 112,106" fill="#243456" />
          <rect x={95} y={116} width={10} height={28} fill="#C0392B" /><polygon points="95,116 100,110 105,116" fill="#C0392B" />
        </>}
        {/* MAX — heist tux: black tux + white shirt + bowtie */}
        {tux > 0 && <>
          <rect x={34} y={106} width={132} height={40} fill="#16161C" /><rect x={34} y={106} width={132} height={6} fill="#0C0C10" />
          <rect x={86} y={106} width={28} height={40} fill="#F7F5F0" />
          <polygon points="86,106 100,126 114,106" fill="#16161C" />
          <rect x={88} y={108} width={10} height={7} fill="#1A1A22" /><rect x={102} y={108} width={10} height={7} fill="#1A1A22" />
          <polygon points="98,110 88,105 88,117" fill="#8B1E1E" /><polygon points="102,110 112,105 112,117" fill="#8B1E1E" />
        </>}
        {/* BEN — pirate: dark coat + sash */}
        {pirate > 0 && <>
          <rect x={34} y={104} width={132} height={42} fill="#3E2A1C" /><rect x={34} y={104} width={132} height={6} fill="#2A1C12" />
          <rect x={88} y={104} width={24} height={42} fill="#E8E0CC" />
          <rect x={34} y={128} width={132} height={12} fill="#9E2B2B" />
          <rect x={62} y={112} width={8} height={8} fill="#E7B24C" /><rect x={130} y={112} width={8} height={8} fill="#E7B24C" />
        </>}
        {/* KATE — hoplite: bronze cuirass */}
        {greek > 0 && <>
          <rect x={34} y={104} width={132} height={42} fill="#B98A3E" /><rect x={34} y={104} width={132} height={6} fill="#8E672A" />
          <rect x={34} y={136} width={132} height={10} fill="#8E672A" />
          <rect x={70} y={112} width={60} height={4} fill="#8E672A" /><rect x={70} y={122} width={60} height={4} fill="#8E672A" />
          <rect x={92} y={104} width={16} height={32} fill="#D8AC5E" />
        </>}
        {/* LEO — spy: black turtleneck + harness */}
        {spy > 0 && <>
          <rect x={34} y={102} width={132} height={44} fill="#1A1A20" /><rect x={34} y={102} width={132} height={6} fill="#0E0E12" />
          <rect x={58} y={102} width={9} height={44} fill="#2E2E38" transform="rotate(-10 62 124)" />
          <rect x={133} y={102} width={9} height={44} fill="#2E2E38" transform="rotate(10 137 124)" />
          <rect x={34} y={124} width={132} height={7} fill="#2E2E38" />
          <rect x={92} y={121} width={16} height={13} fill="#4A4A58" />
        </>}
        <rect x={52} y={146} width={17} height={38} fill={C} /><rect x={77} y={146} width={17} height={38} fill={C} />
        <rect x={124} y={146} width={17} height={38} fill={C} /><rect x={149} y={146} width={17} height={38} fill={C} />
        {stern > 0.3 && <><rect x={68 + gaze} y={64} width={20} height={5} fill="#151312" transform={`rotate(12 78 66)`} /><rect x={112 + gaze} y={64} width={20} height={5} fill="#151312" transform={`rotate(-12 122 66)`} /></>}
        <rect x={70 + gaze - (shock > 0.4 ? 2 : 0)} y={70 + (26 - eyeH) / 2} width={15 + (shock > 0.4 ? 4 : 0)} height={eyeH} fill="#151312" />
        <rect x={116 + gaze - (shock > 0.4 ? 2 : 0)} y={70 + (26 - eyeH) / 2} width={15 + (shock > 0.4 ? 4 : 0)} height={eyeH} fill="#151312" />
        {shock > 0.4 && <rect x={93 + gaze} y={116} width={16} height={14} fill="#151312" />}
        {glasses > 0 && <>
          <rect x={62} y={64} width={32} height={28} fill="none" stroke="#151312" strokeWidth={5} /><rect x={108} y={64} width={32} height={28} fill="none" stroke="#151312" strokeWidth={5} />
          <rect x={94} y={74} width={14} height={5} fill="#151312" /><rect x={34} y={72} width={28} height={5} fill="#151312" /><rect x={140} y={72} width={26} height={5} fill="#151312" />
          <rect x={66} y={68} width={10} height={6} fill="rgba(255,255,255,0.45)" /><rect x={112} y={68} width={10} height={6} fill="rgba(255,255,255,0.45)" />
        </>}
        {/* neo round shades OVER the eyes */}
        {neo > 0 && <>
          <rect x={58} y={66} width={38} height={22} rx={9} fill="#0C0C10" /><rect x={104} y={66} width={38} height={22} rx={9} fill="#0C0C10" />
          <rect x={96} y={73} width={8} height={5} fill="#0C0C10" /><rect x={34} y={70} width={24} height={5} fill="#0C0C10" /><rect x={142} y={70} width={24} height={5} fill="#0C0C10" />
          <rect x={63} y={70} width={11} height={5} fill="rgba(120,255,180,0.5)" /><rect x={109} y={70} width={11} height={5} fill="rgba(120,255,180,0.5)" />
        </>}
        {sherlock > 0 && <>
          <rect x={26} y={32} width={148} height={10} fill="#8A6844" /><rect x={44} y={10} width={112} height={24} fill="#9C7A50" /><rect x={88} y={2} width={24} height={10} fill="#8A6844" />
          <rect x={60} y={16} width={8} height={8} fill="#7A5A3C" /><rect x={100} y={20} width={8} height={8} fill="#7A5A3C" /><rect x={132} y={14} width={8} height={8} fill="#7A5A3C" />
        </>}
        {cop > 0 && <>
          <rect x={46} y={14} width={108} height={24} fill="#3E6FBF" /><rect x={42} y={32} width={116} height={9} fill="#2E55A3" />
          <rect x={30} y={40} width={140} height={9} fill="#28497F" /><rect x={92} y={18} width={16} height={13} fill={GOLD} />
        </>}
        {constr > 0 && <>
          <polygon points="100,10 62,34 138,34" fill="#F5CE55" /><rect x={44} y={30} width={112} height={12} fill="#F5CE55" />
          <rect x={30} y={40} width={140} height={10} fill="#D9A626" /><rect x={94} y={16} width={12} height={16} fill="#E9BE3F" />
        </>}
        {chef > 0 && <>
          <rect x={54} y={28} width={92} height={20} fill="#F4F1EA" />
          <rect x={56} y={6} width={26} height={26} rx={10} fill="#F4F1EA" /><rect x={86} y={2} width={28} height={30} rx={12} fill="#F8F5EF" /><rect x={118} y={6} width={26} height={26} rx={10} fill="#F4F1EA" />
          <rect x={54} y={40} width={92} height={8} fill="#E2DDD0" />
        </>}
        {grad_ > 0 && <>
          <rect x={40} y={28} width={120} height={12} fill="#2E2A44" />
          <polygon points="100,4 34,30 100,42 166,30" fill="#232038" />
          <rect x={160} y={30} width={5} height={34} fill={GOLD} /><rect x={155} y={62} width={15} height={12} fill={GOLD} />
        </>}
        {crown > 0 && <>
          <polygon points="52,42 52,12 74,30 100,6 126,30 148,12 148,42" fill={GOLD} />
          <rect x={52} y={40} width={96} height={10} fill="#C89232" />
          <rect x={70} y={22} width={9} height={9} fill="#C44A3A" /><rect x={96} y={16} width={9} height={9} fill="#3F9E74" /><rect x={122} y={22} width={9} height={9} fill="#C44A3A" />
        </>}
        {/* ---- CREW movie costumes: headgear (drawn last; face stays readable) ---- */}
        {/* MIA — Iron Man helmet: red crown + gold cheek plates framing the Claude eyes */}
        {ironman > 0 && <>
          <rect x={32} y={30} width={136} height={22} fill="#B33A2B" /><rect x={32} y={30} width={136} height={5} fill="#D0503C" />
          <rect x={32} y={50} width={16} height={40} fill="#E7B24C" /><rect x={152} y={50} width={16} height={40} fill="#E7B24C" />
          <rect x={32} y={50} width={136} height={6} fill="#E7B24C" />
          <rect x={94} y={52} width={12} height={30} fill="#E7B24C" />
          <rect x={62} y={58} width={26} height={5} fill="#7FE8FF" /><rect x={112} y={58} width={26} height={5} fill="#7FE8FF" />
        </>}
        {/* BEN — pirate tricorn + green parrot on the shoulder */}
        {pirate > 0 && <>
          <rect x={24} y={30} width={152} height={11} fill="#2A1C12" />
          <polygon points="100,2 44,32 156,32" fill="#3E2A1C" />
          <rect x={44} y={26} width={112} height={8} fill="#2A1C12" />
          <rect x={92} y={12} width={16} height={12} fill="#E8E0CC" /><rect x={96} y={24} width={8} height={6} fill="#E8E0CC" />
          <ellipse cx={176} cy={72} rx={13} ry={17} fill="#3F9E74" />
          <circle cx={176} cy={58} r={9} fill="#4FB287" />
          <polygon points="185,56 196,60 185,64" fill="#E7B24C" />
          <rect x={172} y={55} width={4} height={4} fill="#151312" />
          <polygon points="168,74 158,92 172,86" fill="#2C7A52" />
        </>}
        {/* KATE — Corinthian helmet + red plume */}
        {greek > 0 && <>
          <rect x={40} y={26} width={120} height={16} fill="#B98A3E" />
          <polygon points="100,4 40,30 160,30" fill="#D8AC5E" />
          <rect x={40} y={40} width={18} height={44} fill="#B98A3E" /><rect x={142} y={40} width={18} height={44} fill="#B98A3E" />
          <rect x={94} y={40} width={12} height={38} fill="#B98A3E" />
          <rect x={86} y={-6} width={28} height={16} fill="#9E2B2B" /><rect x={80} y={6} width={40} height={9} fill="#9E2B2B" /><rect x={74} y={13} width={52} height={7} fill="#8A2424" />
        </>}
        {/* LEO — spy hood + eye strap */}
        {spy > 0 && <>
          <rect x={30} y={32} width={140} height={16} fill="#1A1A20" />
          <rect x={30} y={44} width={18} height={48} fill="#1A1A20" /><rect x={152} y={44} width={18} height={48} fill="#1A1A20" />
          <rect x={30} y={32} width={140} height={5} fill="#2E2E38" />
          <rect x={30} y={54} width={140} height={6} fill="#2E2E38" />
          <rect x={44} y={82} width={112} height={9} fill="#1A1A20" />
        </>}
        {/* JACK — sales headset */}
        {wolf > 0 && <>
          <rect x={54} y={28} width={92} height={7} fill="#1E2438" />
          <rect x={44} y={32} width={12} height={26} fill="#1E2438" /><rect x={144} y={32} width={12} height={26} fill="#1E2438" />
          <rect x={38} y={52} width={20} height={16} rx={4} fill="#2E3A56" /><rect x={142} y={52} width={20} height={16} rx={4} fill="#2E3A56" />
          <rect x={56} y={66} width={7} height={22} fill="#2E3A56" transform="rotate(18 59 77)" />
          <rect x={62} y={86} width={16} height={6} rx={3} fill="#4A5A78" />
        </>}
        {/* MAX — earpiece + slick hair */}
        {tux > 0 && <>
          <rect x={32} y={38} width={136} height={13} fill="#1E1E26" />
          <rect x={32} y={38} width={136} height={4} fill="#2E2E3A" />
          <rect x={32} y={51} width={13} height={16} fill="#1E1E26" /><rect x={155} y={51} width={13} height={16} fill="#1E1E26" />
          <rect x={44} y={51} width={44} height={8} fill="#1E1E26" /><rect x={88} y={51} width={70} height={6} fill="#1E1E26" />
          <rect x={162} y={62} width={11} height={14} rx={4} fill="#3A4456" />
          <rect x={166} y={76} width={4} height={14} fill="#3A4456" />
        </>}
        {wizard > 0 && <>
          <polygon points="100,0 62,40 138,40" fill="#4B3E8E" /><rect x={46} y={36} width={108} height={12} fill="#3A2F73" />
          <rect x={94} y={8} width={10} height={10} fill={GOLD} /><rect x={78} y={24} width={8} height={8} fill={GOLD} /><rect x={112} y={22} width={8} height={8} fill={GOLD} />
          <rect x={182} y={armY - 34} width={7} height={54} fill="#8A6844" transform={`rotate(26 185 ${armY + 8})`} />
          <rect x={196} y={armY - 46} width={14} height={14} fill={GOLD} transform={`rotate(26 203 ${armY - 39})`} />
          <rect x={200} y={armY - 42} width={6} height={6} fill="#FFF3D6" transform={`rotate(26 203 ${armY - 39})`} />
        </>}
      </svg>
      {shock > 0.4 && <div style={{ position: "absolute", right: size * 0.12, top: size * 0.14, width: size * 0.08, height: size * 0.11, borderRadius: "50% 50% 50% 50% / 62% 62% 40% 40%", background: "linear-gradient(160deg,#BFE3FF,#5FA8E8)", boxShadow: "0 2px 4px rgba(20,60,120,0.4)", transform: "rotate(8deg)" }} />}
    </div>
  );
};

export const ClaudeLogo: React.FC<{ size: number; color?: string }> = ({ size, color = "#D97757" }) => (
  <div style={{ width: size, height: size, filter: "drop-shadow(0 12px 26px rgba(217,119,87,0.45))" }}>
    <svg viewBox="-100 -100 200 200" width={size} height={size}>
      {Array.from({ length: 12 }, (_, i) => {
        const len = i % 2 ? 70 : 88, tip = i % 2 ? 7.5 : 9;
        return <path key={i} d={`M -5.5 -12 L 5.5 -12 L ${tip} ${-len} L ${-tip} ${-len} Z`} fill={color} stroke={color} strokeWidth={6} strokeLinejoin="round" transform={`rotate(${i * 30})`} />;
      })}
      <circle r={17} fill={color} />
    </svg>
  </div>
);

export const Padlock: React.FC<{ size?: number; color?: string }> = ({ size = 34, color = GOLD }) => (
  <svg width={size} height={size} viewBox="0 0 40 40">
    <rect x={7} y={17} width={26} height={19} rx={5} fill={color} />
    <rect x={12} y={5} width={16} height={18} rx={8} fill="none" stroke={color} strokeWidth={5} />
    <circle cx={20} cy={25} r={3.4} fill="#3A2A10" /><rect x={18.4} y={26} width={3.2} height={5.5} rx={1.4} fill="#3A2A10" />
  </svg>
);

export const Dots: React.FC<{ n: number; lit: number; y: number }> = ({ n, lit, y }) => (
  <div style={{ position: "absolute", top: y, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 14 }}>
    {Array.from({ length: n }, (_, i) => <div key={i} style={{ width: i === lit ? 34 : 12, height: 12, borderRadius: 999, background: i === lit ? CLAY : "#B9C3D2", boxShadow: i === lit ? "0 4px 10px rgba(210,114,78,0.4)" : "none" }} />)}
  </div>
);

export const Handle: React.FC<{ y: number; dark?: boolean }> = ({ y, dark }) => (
  <div style={{ position: "absolute", top: y, left: 0, right: 0, textAlign: "center", fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 25, letterSpacing: "0.14em", color: dark ? "rgba(200,214,240,0.85)" : "#6B675C" }}>@NOCODEALEX</div>
);

// small reusable shaded artifacts -------------------------------------------
export const ScoreGauge: React.FC<{ pct: number; label: string; size?: number; c?: string }> = ({ pct, label, size = 160, c = GREEN }) => (
  <div style={{ width: size, height: size, borderRadius: "50%", background: `conic-gradient(${c} 0deg ${pct / 100 * 360}deg, #2A3A5C ${pct / 100 * 360}deg 360deg)`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 18px 34px -12px rgba(6,12,26,0.8)" }}>
    <div style={{ width: size * 0.7, height: size * 0.7, borderRadius: "50%", background: grad("#1B2740", "#131D34"), display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: "1.5px solid rgba(150,175,225,0.3)" }}>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: size * 0.30, color: c === GREEN ? "#8FE7B6" : "#F3CE7E", lineHeight: 1 }}>{pct}</div>
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: size * 0.085, letterSpacing: "0.14em", color: "rgba(200,214,240,0.8)" }}>{label}</div>
    </div>
  </div>
);

// a rich, "finished object" resume: chrome header, keyword rows, signature, fold
export const ResumeDoc: React.FC<{ w?: number; h?: number; tilt?: number; scanned?: boolean }> = ({ w = 330, h = 420, tilt = 0, scanned = true }) => (
  <div style={{ position: "relative", width: w, height: h, transform: `rotate(${tilt}deg)` }}>
    <div style={{ position: "absolute", inset: 0, borderRadius: 20, background: grad("#FDFBF5", "#EDE8DC"), boxShadow: NAVYSH, border: "1.5px solid rgba(120,110,90,0.28)", overflow: "hidden" }}>
      {/* header chrome */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: h * 0.16, background: grad("#33507A", "#243A5C") }}>
        <div style={{ position: "absolute", left: 18, top: h * 0.032, width: h * 0.095, height: h * 0.095, borderRadius: "50%", background: grad("#E5A37F", CLAY), border: "2px solid rgba(255,255,255,0.6)" }} />
        <div style={{ position: "absolute", left: 18 + h * 0.095 + 14, top: h * 0.048, width: w * 0.38, height: 12, borderRadius: 6, background: "rgba(255,255,255,0.92)" }} />
        <div style={{ position: "absolute", left: 18 + h * 0.095 + 14, top: h * 0.048 + 20, width: w * 0.26, height: 8, borderRadius: 4, background: "rgba(200,220,250,0.7)" }} />
        <div style={{ position: "absolute", right: 16, top: h * 0.055, width: 30, height: 30 }}><ClaudeLogo size={30} color="#F6D9C8" /></div>
      </div>
      {/* section chip */}
      <div style={{ position: "absolute", left: 20, top: h * 0.20, padding: "5px 14px", borderRadius: 7, background: grad(SLATE, "#2E4A70"), fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 13, letterSpacing: "0.12em", color: "#F0F4FC" }}>EXPERIENCE</div>
      {/* body rows: clay = injected keyword rows, slate = normal */}
      {Array.from({ length: 8 }, (_, i) => {
        const key = i === 0 || i === 3 || i === 6;
        return (
          <div key={i} style={{ position: "absolute", left: 20, top: h * 0.275 + i * (h * 0.062) }}>
            <div style={{ width: (w - 74) * (key ? 0.9 : i % 2 ? 0.72 : 0.84), height: 11, borderRadius: 6, background: key ? grad("#E08A63", CLAY) : grad("#7C94B6", "#5E7BA2") }} />
          </div>
        );
      })}
      {/* green ticks on the keyword rows */}
      {scanned && [0, 3, 6].map((i) => (
        <div key={i} style={{ position: "absolute", right: 18, top: h * 0.268 + i * (h * 0.062), width: 22, height: 22, borderRadius: 6, background: grad("#4FB287", GREEN), display: "flex", alignItems: "center", justifyContent: "center", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 14, color: "#EAFBF2" }}>{"✓"}</div>
      ))}
      {/* signature squiggle */}
      <svg style={{ position: "absolute", left: 22, bottom: 24 }} width={w * 0.44} height={34} viewBox="0 0 150 34">
        <path d="M2 24 C 18 4, 26 30, 40 16 S 66 2, 78 22 S 104 26, 120 8 L 146 18" fill="none" stroke="#2F3B52" strokeWidth={3} strokeLinecap="round" />
      </svg>
      <div style={{ position: "absolute", right: 20, bottom: 22, padding: "6px 14px", borderRadius: 999, background: grad("#4FB287", GREEN), fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 15, color: "#EAFBF2", letterSpacing: "0.06em" }}>PARSED</div>
      <Sheen r={20} />
    </div>
    {/* corner fold */}
    <div style={{ position: "absolute", right: 0, top: 0, width: 0, height: 0, borderTop: `34px solid rgba(180,168,140,0.55)`, borderLeft: "34px solid transparent", borderTopRightRadius: 20 }} />
  </div>
);

// ============================================================================
// CONCEPT 1 — TERMINAL BRIEF · cream page + ONE dark IDE panel (reel chassis)
// ============================================================================
// FLOOR_Y is the single source of truth for where things stand. A sprite's feet are at
// top + size*0.92 (the Mascot viewBox has ~8% empty below the legs), so every sprite is
// placed with `top = FLOOR_Y - size*0.92` and its shadow sits at FLOOR_Y.
export const FLOOR_Y = 556;
export const feetAt = (size: number, floor = FLOOR_Y) => floor - size * 0.92;

export const IdeEnv: React.FC<{ tab: string; tab2: string; floorY?: number; children?: React.ReactNode }> = ({ tab, tab2, floorY = FLOOR_Y, children }) => (
  <>
    {/* left rail */}
    <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 74, background: grad("#0B1120", "#080D18"), borderRight: "1px solid rgba(120,150,210,0.18)" }}>
      {[CLAY, SLATE, SLATE, SLATE].map((c, i) => (
        <div key={i} style={{ position: "absolute", left: 20, top: 96 + i * 52, width: 34, height: 34, borderRadius: 9, background: i === 0 ? grad(c, "#B85A38") : grad("#1D2B45", "#16223A"), border: `1.5px solid ${i === 0 ? "rgba(255,200,175,0.5)" : "rgba(120,150,210,0.28)"}` }} />
      ))}
    </div>
    {/* tab strip */}
    <div style={{ position: "absolute", left: 74, right: 0, top: 62, height: 46, background: "#0B1322", borderBottom: "1px solid rgba(120,150,210,0.22)" }}>
      <div style={{ position: "absolute", left: 18, top: 6, padding: "7px 18px", borderRadius: "8px 8px 0 0", background: grad("#1B2942", "#152134"), borderBottom: `3px solid ${CLAY}`, fontFamily: mono, fontWeight: 700, fontSize: 19, color: "#DCE4F4" }}>{tab}</div>
      <div style={{ position: "absolute", left: 210, top: 6, padding: "7px 18px", borderRadius: "8px 8px 0 0", background: "#0F1828", fontFamily: mono, fontWeight: 700, fontSize: 19, color: "#7C90B4" }}>{tab2}</div>
      <div style={{ position: "absolute", left: 372, top: 12, fontFamily: mono, fontSize: 22, color: "#5E739A" }}>+</div>
    </div>
    {/* environment depth */}
    <GodRay x={620} w={210} h={470} />
    <Bloom x={430} y={360} r={300} c="rgba(210,114,78,0.18)" />
    <Bloom x={790} y={420} r={230} c="rgba(58,92,132,0.30)" />
    {/* the floor: a real surface, not a wash. It was so faint that every critic read the
        bottom ~80px of the panel as a dead empty band, and the contact shadows had
        nothing to land on. */}
    <div style={{ position: "absolute", left: 74, right: 0, top: floorY, bottom: 0, background: "linear-gradient(to bottom, #16223C, #0B1220)" }} />
    <div style={{ position: "absolute", left: 74, right: 0, top: floorY, height: 2.5, background: "linear-gradient(to right, transparent, rgba(160,190,240,0.75), transparent)" }} />
    <div style={{ position: "absolute", left: 74, right: 0, top: floorY + 2, height: 26, background: "linear-gradient(to bottom, rgba(150,180,235,0.12), transparent)" }} />
    {/* receding floor lines = the panel reads as a room with depth */}
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <div key={i} style={{ position: "absolute", left: 74 + i * 160 - 40, top: floorY, width: 1.5, height: 84, background: "linear-gradient(to bottom, rgba(150,180,235,0.22), transparent 70%)", transform: `skewX(${-26 + i * 10}deg)`, transformOrigin: "50% 0" }} />
    ))}
    <Dust n={16} w={968} h={560} c="rgba(220,235,255,0.6)" s={4} />
    {children}
  </>
);

export const C1Frame: React.FC<{ kicker: string; headline: React.ReactNode; tab: string; tab2?: string; dots: number; panelTop?: number; panelH?: number; floorY?: number; overlay?: React.ReactNode; children: React.ReactNode }> = ({ kicker, headline, tab, tab2 = "job-post.txt", dots, panelTop = 548, panelH = 595, floorY = FLOOR_Y, overlay, children }) => (
  <AbsoluteFill>
    <CreamBg />
    <div style={{ position: "absolute", top: 74, left: 64, right: 64, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ padding: "9px 22px", borderRadius: 999, background: grad(CLAY, "#B85A38"), color: "#FFF6EE", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 25, letterSpacing: "0.14em", boxShadow: "0 12px 26px -10px rgba(150,70,40,0.5)" }}>{kicker}</div>
      <div style={{ fontFamily: mono, fontWeight: 700, fontSize: 25, color: "#6B675C", letterSpacing: "0.06em" }}>@nocodealex</div>
    </div>
    <div style={{ position: "absolute", top: 158, left: 64, right: 64 }}>{headline}</div>
    {/* CONTENT slides pass a higher panelTop (~370) + taller panelH so the slide is just
        kicker + ONE headline + a big hero panel (one takeaway). Intro slides (cover/CTA,
        which carry a subhead) keep the default top 548. Scene coords stay PANEL-LOCAL. */}
    <div style={{ position: "absolute", left: 56, right: 56, top: panelTop, height: panelH, borderRadius: 40, background: grad(TERM, TERM2), boxShadow: NAVYSH, overflow: "hidden", border: "2px solid rgba(120,150,210,0.22)" }}>
      <IdeEnv tab={tab} tab2={tab2} floorY={floorY}>{children}</IdeEnv>
      <div style={{ position: "absolute", left: 30, top: 24, display: "flex", gap: 12, alignItems: "center", zIndex: 20 }}>
        {[RED, AMBER, GREEN].map((c, i) => <div key={i} style={{ width: 15, height: 15, borderRadius: "50%", background: c }} />)}
      </div>
      <div style={{ position: "absolute", inset: 0, borderRadius: 40, boxShadow: "inset 0 2px 0 rgba(255,255,255,0.07), inset 0 0 140px rgba(0,0,0,0.5)", pointerEvents: "none" }} />
    </div>
    {overlay}
    <Dots n={8} lit={dots} y={1188} />
    <Handle y={1233} />
  </AbsoluteFill>
);

export const CarC1Cover: React.FC = () => (
  <C1Frame kicker="SYSTEM Nº 052" tab="resume.md" dots={0}
    headline={
      <>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 88, lineHeight: 1.04, color: INK, letterSpacing: "-0.02em" }}>
          Your resume gets rejected in <span style={{ fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", color: CLAY }}>6 seconds.</span>
        </div>
        <div style={{ marginTop: 22, fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 33, color: "#4A5568", lineHeight: 1.35 }}>
          One Claude chat rebuilds it to beat the hiring bot.
          <br />
          <span style={{ fontWeight: 800, color: SLATE }}>41% to 96% match.</span>
        </div>
      </>
    }>
    <ContactShadow x={278} y={556} w={300} o={0.6} />
    <ContactShadow x={800} y={552} w={230} o={0.55} />
    <div style={{ position: "absolute", left: 128, top: 140, zIndex: 10 }}><ResumeDoc w={300} h={416} /></div>
    <div style={{ position: "absolute", left: 470, top: 196, zIndex: 10 }}><ScoreGauge pct={96} label="MATCH" size={168} /></div>
    <div style={{ position: "absolute", left: 466, top: 392, zIndex: 10, padding: "9px 18px", borderRadius: 11, background: grad("#2A1518", "#1E0F11"), border: `2.5px solid ${RED}`, fontFamily: mono, fontWeight: 800, fontSize: 23, color: "#E88A78", textDecoration: "line-through", transform: "rotate(-3deg)" }}>was 41%</div>
    <div style={{ position: "absolute", left: 462, top: 452, zIndex: 10, width: 182, borderRadius: 13, background: grad("#1B2942", "#141F36"), border: "1.5px solid rgba(150,175,225,0.32)", padding: "12px 14px", boxShadow: "0 14px 28px -12px rgba(0,0,0,0.7)" }}>
      <div style={{ fontFamily: mono, fontSize: 16, color: "#8AA0C6", letterSpacing: "0.1em" }}>KEYWORDS</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 3 }}>
        <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 34, color: "#8FE7B6" }}>6</span>
        <span style={{ fontFamily: mono, fontSize: 19, color: "#7C90B4" }}>/ 6 hit</span>
      </div>
      <div style={{ marginTop: 8, height: 8, borderRadius: 4, background: "rgba(58,92,132,0.4)" }}><div style={{ width: "100%", height: "100%", borderRadius: 4, background: grad("#4FB287", GREEN) }} /></div>
    </div>
    <div style={{ position: "absolute", left: 668, top: 288, zIndex: 10 }}><Mascot size={262} suit={1} cheer={1} gaze={-4} /></div>
    <div style={{ position: "absolute", right: 30, top: 584, zIndex: 10, padding: "12px 26px", borderRadius: 999, background: grad(CLAY, "#B85A38"), color: "#FFF6EE", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 26, letterSpacing: "0.08em", boxShadow: "0 14px 30px -8px rgba(140,60,35,0.7)" }}>SWIPE {"→"}</div>
  </C1Frame>
);

export const CarC1Step: React.FC = () => (
  <C1Frame kicker="STEP 02 / 05" tab="job-post.txt" tab2="resume.md" dots={2}
    headline={
      <>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 74, lineHeight: 1.06, color: INK, letterSpacing: "-0.02em" }}>
          Make it interrogate <span style={{ fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", color: SLATE }}>the job post.</span>
        </div>
        <div style={{ marginTop: 20, fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 31, color: "#4A5568", lineHeight: 1.35 }}>
          Claude pulls what the screening bot actually ranks, before you rewrite a single line.
        </div>
      </>
    }>
    <ContactShadow x={262} y={550} w={270} o={0.6} />
    <ContactShadow x={806} y={548} w={210} o={0.55} />
    {/* HERO: the job post under a scanner beam */}
    <div style={{ position: "absolute", left: 126, top: 150, width: 272, height: 396, borderRadius: 18, background: grad("#F6F2E7", "#E4DED0"), boxShadow: NAVYSH, border: "1.5px solid rgba(120,110,90,0.3)", overflow: "hidden", zIndex: 10 }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 52, background: grad("#2C3E5E", "#1F2C46"), display: "flex", alignItems: "center", paddingLeft: 16, gap: 10 }}>
        <div style={{ width: 20, height: 20, borderRadius: 5, background: grad("#5C7CA8", SLATE) }} />
        <div style={{ fontFamily: mono, fontWeight: 700, fontSize: 17, color: "#CBD9F0", letterSpacing: "0.06em" }}>SENIOR PM {"·"} REQS</div>
      </div>
      {Array.from({ length: 11 }, (_, i) => {
        const hit = [1, 4, 6, 9].includes(i);
        return <div key={i} style={{ position: "absolute", left: 18, top: 74 + i * 29, width: (236) * (hit ? 0.86 : i % 2 ? 0.62 : 0.76), height: 10, borderRadius: 5, background: hit ? grad("#E08A63", CLAY) : "rgba(58,92,132,0.42)" }} />;
      })}
      {/* scan beam */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 236, height: 5, background: "linear-gradient(to right, transparent, #8FE7B6, transparent)", boxShadow: "0 0 22px rgba(143,231,182,0.9)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 236, height: 130, background: "linear-gradient(to bottom, rgba(143,231,182,0.22), transparent)" }} />
      <Sheen r={18} />
    </div>
    {/* extracted keyword chips flying to a stack */}
    {["roadmap", "SQL", "A/B tests", "stakeholder"].map((t, i) => (
      <div key={i} style={{ position: "absolute", left: 442 + (i % 2) * 14, top: 178 + i * 62, zIndex: 10, padding: "10px 18px", borderRadius: 10, background: grad("#1F2E4A", "#17233A"), border: `2px solid ${CLAY}`, fontFamily: mono, fontWeight: 700, fontSize: 21, color: "#F0BFA6", boxShadow: "0 12px 24px -10px rgba(0,0,0,0.75)", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: CLAY }} />{t}
      </div>
    ))}
    <div style={{ position: "absolute", left: 442, top: 440, zIndex: 10, padding: "8px 16px", borderRadius: 9, background: grad("#14301F", "#0E2417"), border: `2px solid ${GREEN}`, fontFamily: mono, fontWeight: 800, fontSize: 21, color: "#8FE7B6" }}>+ 2 more</div>
    {/* gated prompt row */}
    <div style={{ position: "absolute", left: 128, top: 566, zIndex: 10, display: "flex", alignItems: "center", gap: 12, padding: "9px 18px", borderRadius: 11, background: "rgba(231,178,76,0.12)", border: `2px solid ${GOLD}` }}>
      <Padlock size={24} />
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 21, color: "#F3CE7E", letterSpacing: "0.05em" }}>THE EXACT PROMPT IS IN THE GUIDE</div>
    </div>
    <div style={{ position: "absolute", left: 690, top: 306, zIndex: 10 }}><Mascot size={240} sherlock={1} gaze={-5} /></div>
  </C1Frame>
);

export const CarC1CtaPill: React.FC = () => (
  <C1Frame kicker="GET THE SYSTEM" tab="callback.md" tab2="resume.md" dots={7} panelH={545}
    overlay={
      <div style={{ position: "absolute", left: 0, right: 0, top: 1082, display: "flex", justifyContent: "center" }}>
        <div style={{ padding: "18px 54px", borderRadius: 999, background: grad(CLAY, "#B85A38"), boxShadow: "0 20px 44px -12px rgba(210,114,78,0.65)", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 46, color: "#FFF6EE" }}>
          Comment {"“"}CALLBACK{"”"}
        </div>
      </div>
    }
    headline={
      <>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 82, lineHeight: 1.05, color: INK, letterSpacing: "-0.02em" }}>
          Want the exact <span style={{ fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", color: CLAY }}>skill file?</span>
        </div>
        <div style={{ marginTop: 20, fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 32, color: "#4A5568", lineHeight: 1.35 }}>
          The full 5-step setup, word for word. Free in your DMs.
        </div>
      </>
    }>
    <ContactShadow x={268} y={508} w={280} o={0.6} />
    <ContactShadow x={800} y={508} w={220} o={0.55} />
    {/* HERO: the gated file on a lit pedestal */}
    <div style={{ position: "absolute", left: 128, top: 132, width: 280, height: 362, borderRadius: 20, background: grad("#1C2B4A", "#141F38"), border: "2px solid rgba(150,175,225,0.4)", boxShadow: "0 30px 56px -18px rgba(0,0,0,0.85)", overflow: "hidden", zIndex: 10 }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 56, background: grad(CLAY, "#B85A38"), display: "flex", alignItems: "center", justifyContent: "center", fontFamily: mono, fontWeight: 800, fontSize: 25, color: "#FFF6EE", letterSpacing: "0.04em" }}>CALLBACK.md</div>
      {Array.from({ length: 5 }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: 26, top: 84 + i * 40, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 20, height: 20, borderRadius: 5, background: grad("#3A5C84", "#2C486B") }} />
          <div style={{ width: 190 * (i % 2 ? 0.66 : 0.92), height: 12, borderRadius: 6, background: "#2E4468" }} />
        </div>
      ))}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 84, display: "flex", alignItems: "center", justifyContent: "center", gap: 12, background: grad("#2A2312", "#1E190C"), borderTop: `2px solid ${GOLD}` }}>
        <Padlock size={32} />
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 22, color: GOLD, letterSpacing: "0.08em" }}>UNLOCKS IN DMs</div>
      </div>
      <Sheen r={20} />
    </div>
    {/* the DM phone */}
    <div style={{ position: "absolute", left: 452, top: 152, width: 184, height: 344, borderRadius: 26, background: "#05080F", border: "4px solid #26324A", boxShadow: "0 26px 50px -16px rgba(0,0,0,0.85)", overflow: "hidden", zIndex: 10 }}>
      <div style={{ position: "absolute", left: 58, top: 6, width: 68, height: 14, borderRadius: 999, background: "#0C1220" }} />
      <div style={{ position: "absolute", inset: 0, top: 28, background: grad("#121B2E", "#0A111E") }}>
        <div style={{ position: "absolute", left: 12, top: 12, right: 12, height: 34, borderRadius: 9, background: "#1A2438", display: "flex", alignItems: "center", paddingLeft: 8, gap: 7 }}>
          <div style={{ width: 20, height: 20, borderRadius: "50%", background: grad("#E5A37F", CLAY) }} />
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 12, color: "#CBD9F0" }}>@nocodealex</div>
        </div>
        <div style={{ position: "absolute", right: 12, top: 62, padding: "8px 12px", borderRadius: "12px 12px 3px 12px", background: grad(CLAY, "#B85A38"), fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 14, color: "#FFF6EE" }}>CALLBACK</div>
        <div style={{ position: "absolute", left: 12, top: 112, width: 128, borderRadius: "12px 12px 12px 3px", background: "#1D2942", padding: "9px 11px" }}>
          <div style={{ width: 100, height: 8, borderRadius: 4, background: "#31456B" }} />
          <div style={{ width: 74, height: 8, borderRadius: 4, background: "#31456B", marginTop: 6 }} />
        </div>
        <div style={{ position: "absolute", left: 12, top: 176, width: 140, borderRadius: 10, background: grad("#22304E", "#1A2540"), border: `1.5px solid ${GOLD}`, padding: "9px 10px", display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 24, height: 30, borderRadius: 4, background: grad(CLAY, "#B85A38") }} />
          <div>
            <div style={{ fontFamily: mono, fontWeight: 700, fontSize: 11, color: "#F3CE7E" }}>CALLBACK.md</div>
            <div style={{ fontFamily: mono, fontSize: 10, color: "#7C90B4" }}>5 steps {"·"} free</div>
          </div>
        </div>
        <div style={{ position: "absolute", left: 12, top: 240, width: 26, height: 26, borderRadius: 7, background: grad("#4FB287", GREEN), display: "flex", alignItems: "center", justifyContent: "center", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 16, color: "#EAFBF2" }}>{"✓"}</div>
      </div>
    </div>
    <div style={{ position: "absolute", left: 682, top: 252, zIndex: 10 }}><Mascot size={250} crown={1} cheer={1} /></div>
  </C1Frame>
);

// ============================================================================
// CONCEPT 2 — CLAUDE COMICS · illustrated room scenes, halftone, bubbles
// ============================================================================
const ComicFrame: React.FC<{ children: React.ReactNode; masthead: string; ep: string; caption: React.ReactNode; dots: number }> = ({ children, masthead, ep, caption, dots }) => (
  <AbsoluteFill>
    <CreamBg />
    <div style={{ position: "absolute", top: 66, left: 60, right: 60, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ padding: "10px 26px", borderRadius: 12, background: INK, color: "#F6F1E6", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 32, letterSpacing: "0.05em", boxShadow: "0 10px 24px -8px rgba(20,16,10,0.5)" }}>{masthead}</div>
      <div style={{ padding: "10px 22px", borderRadius: 12, background: grad(CLAY, "#B85A38"), color: "#FFF6EE", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 27, letterSpacing: "0.1em" }}>{ep}</div>
    </div>
    <div style={{ position: "absolute", left: 56, right: 56, top: 170, height: 850, borderRadius: 26, border: `6px solid ${INK}`, boxShadow: "10px 12px 0 rgba(26,24,19,0.9), 0 30px 60px -20px rgba(30,24,16,0.4)", overflow: "hidden" }}>
      {children}
      <Halftone o={0.15} size={7} />
    </div>
    <div style={{ position: "absolute", left: 64, right: 64, top: 1068, textAlign: "center" }}>{caption}</div>
    <Dots n={7} lit={dots} y={1230} />
    <Handle y={1272} />
  </AbsoluteFill>
);

const Bubble: React.FC<{ x: number; y: number; w: number; text: string; tailLeft?: boolean; fs?: number }> = ({ x, y, w, text, tailLeft, fs = 32 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, zIndex: 30 }}>
    <div style={{ position: "relative", background: "#FDFBF4", border: `5px solid ${INK}`, borderRadius: 26, padding: "18px 24px", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: fs, lineHeight: 1.28, color: INK, boxShadow: "6px 7px 0 rgba(26,24,19,0.85)" }}>
      {text}
      <div style={{ position: "absolute", bottom: -26, [tailLeft ? "left" : "right"]: 54, width: 0, height: 0, borderLeft: "16px solid transparent", borderRight: "16px solid transparent", borderTop: `26px solid ${INK}` }} />
      <div style={{ position: "absolute", bottom: -16, [tailLeft ? "left" : "right"]: 59, width: 0, height: 0, borderLeft: "11px solid transparent", borderRight: "11px solid transparent", borderTop: "18px solid #FDFBF4" }} />
    </div>
  </div>
);

const SpeedLines: React.FC<{ cx: number; cy: number; n?: number; r0: number; r1: number; c?: string }> = ({ cx, cy, n = 14, r0, r1, c = "rgba(255,255,255,0.30)" }) => (
  <svg style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none" }} width={968} height={850}>
    {Array.from({ length: n }, (_, i) => {
      const a = (i / n) * Math.PI * 2 + 0.2;
      return <line key={i} x1={cx + Math.cos(a) * r0} y1={cy + Math.sin(a) * r0} x2={cx + Math.cos(a) * r1} y2={cy + Math.sin(a) * r1} stroke={c} strokeWidth={4 + seed(i) * 5} strokeLinecap="round" />;
    })}
  </svg>
);

const RejectStamp: React.FC<{ x: number; y: number; rot: number; s?: number }> = ({ x, y, rot, s = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, transform: `rotate(${rot}deg) scale(${s})`, padding: "6px 14px", border: `4px solid ${RED}`, borderRadius: 9, color: "#E8624E", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 24, letterSpacing: "0.12em", background: "rgba(60,18,14,0.5)", boxShadow: "0 6px 14px rgba(0,0,0,0.4)" }}>REJECTED</div>
);

// a shaded moai (pop-culture desk prop, drawn — no emoji)
const Moai: React.FC<{ size?: number }> = ({ size = 60 }) => (
  <svg width={size} height={size * 1.35} viewBox="0 0 60 81">
    <path d="M14 78 L10 34 Q10 8 30 8 Q50 8 50 34 L46 78 Z" fill="#7C8189" />
    <path d="M14 78 L10 34 Q10 8 30 8 L30 78 Z" fill="#8D939C" />
    <rect x={10} y={38} width={40} height={7} fill="#6A6F77" />
    <ellipse cx={20} cy={33} rx={6} ry={4} fill="#4A4E55" /><ellipse cx={40} cy={33} rx={6} ry={4} fill="#4A4E55" />
    <path d="M22 58 Q30 63 38 58" stroke="#5A5F66" strokeWidth={3} fill="none" strokeLinecap="round" />
    <path d="M30 40 L26 52 L34 52 Z" fill="#6A6F77" />
  </svg>
);

export const CarC2Cover: React.FC = () => (
  <ComicFrame masthead="CLAUDE COMICS" ep="EP. 12" dots={0}
    caption={
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 56, lineHeight: 1.1, color: INK, letterSpacing: "-0.015em" }}>
        47 rejections. Then you hire <span style={{ fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", color: CLAY }}>the critter.</span> {"→"}
      </div>
    }>
    {/* ---- ROOM: late-night bedroom office ---- */}
    <div style={{ position: "absolute", inset: 0, background: grad("#2B3A5C", "#16203A") }} />
    <Bloom x={790} y={140} r={210} c="rgba(234,217,164,0.34)" />
    <Bloom x={740} y={560} r={250} c="rgba(58,92,132,0.44)" />
    {/* wall panelling */}
    {Array.from({ length: 6 }, (_, i) => <div key={i} style={{ position: "absolute", left: 40 + i * 160, top: 0, width: 2, height: 700, background: "rgba(150,180,235,0.08)" }} />)}
    {/* window + moon (top-right, above the bubble zone) */}
    <div style={{ position: "absolute", right: 56, top: 44, width: 208, height: 172, borderRadius: 10, background: grad("#0F1A33", "#0A1226"), border: "8px solid #3A4A6B", boxShadow: "inset 0 0 40px rgba(0,0,0,0.7)", overflow: "hidden" }}>
      <div style={{ position: "absolute", right: 22, top: 18, width: 62, height: 62, borderRadius: "50%", background: "radial-gradient(circle at 38% 34%, #FFF8E2, #EAD9A4 62%, #D9C285)", boxShadow: "0 0 44px rgba(234,217,164,0.75)" }} />
      {Array.from({ length: 14 }, (_, i) => <div key={i} style={{ position: "absolute", left: seed(i) * 178 + 6, top: seed(i * 3) * 144 + 6, width: 3, height: 3, borderRadius: "50%", background: STAR }} />)}
      <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 6, background: "#3A4A6B" }} />
      <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 6, background: "#3A4A6B" }} />
    </div>
    {/* corkboard with rejections */}
    <div style={{ position: "absolute", left: 56, top: 50, width: 392, height: 344, borderRadius: 10, background: grad("#8A6A44", "#6B5133"), border: "9px solid #4E3A22", boxShadow: "0 18px 34px -12px rgba(0,0,0,0.7)" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(60,42,22,0.5) 1.2px, transparent 1.4px)", backgroundSize: "9px 9px" }} />
      <RejectStamp x={18} y={22} rot={-8} />
      <RejectStamp x={168} y={74} rot={6} />
      <RejectStamp x={32} y={136} rot={3} />
      <RejectStamp x={180} y={190} rot={-5} />
      <RejectStamp x={40} y={244} rot={-2} />
      <div style={{ position: "absolute", right: 16, bottom: 14, padding: "7px 16px", borderRadius: 9, background: grad("#D8503C", "#A83525"), color: "#FFF2EE", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 34, transform: "rotate(-4deg)", boxShadow: "0 8px 18px rgba(0,0,0,0.5)" }}>{"×"}47</div>
    </div>
    {/* desk: slab + a solid front panel that fills the bottom band */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 700, height: 150, background: grad("#6B5133", "#3E2E1C") }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 700, height: 46, background: grad("#9A7850", "#6B5133"), boxShadow: "0 16px 30px -8px rgba(0,0,0,0.8)" }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 746, height: 3, background: "rgba(0,0,0,0.34)" }} />
    {Array.from({ length: 5 }, (_, i) => <div key={i} style={{ position: "absolute", left: 30 + i * 210, top: 762, width: 160, height: 3, borderRadius: 2, background: "rgba(0,0,0,0.16)" }} />)}
    {/* laptop on the desk */}
    <div style={{ position: "absolute", left: 128, top: 540, width: 236, height: 160, borderRadius: "10px 10px 3px 3px", background: grad("#2A3550", "#1B2438"), border: "5px solid #3E4E70", boxShadow: "0 18px 30px -10px rgba(0,0,0,0.75)", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 6, borderRadius: 5, background: grad("#0E1626", "#0A1120") }}>
        <div style={{ position: "absolute", left: 12, top: 12, width: 90, height: 8, borderRadius: 4, background: "rgba(210,114,78,0.85)" }} />
        {[0, 1, 2, 3].map((i) => <div key={i} style={{ position: "absolute", left: 12, top: 32 + i * 16, width: 130 * (i % 2 ? 0.6 : 0.9), height: 6, borderRadius: 3, background: "rgba(120,150,210,0.55)" }} />)}
        <div style={{ position: "absolute", right: 12, bottom: 12, padding: "3px 8px", borderRadius: 5, background: RED, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 11, color: "#FFF2EE" }}>0 REPLIES</div>
      </div>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(120deg, rgba(180,215,255,0.16) 0%, transparent 42%)" }} />
    </div>
    {/* moai desk prop (pop-culture) + coffee */}
    <div style={{ position: "absolute", left: 408, top: 618, zIndex: 6 }}><Moai size={62} /></div>
    <div style={{ position: "absolute", left: 502, top: 648, width: 52, height: 50, borderRadius: "6px 6px 12px 12px", background: grad("#E8E2D4", "#C7BFAC"), boxShadow: "0 8px 16px -4px rgba(0,0,0,0.55)", zIndex: 6 }}>
      <div style={{ position: "absolute", left: 6, top: 6, right: 6, height: 8, borderRadius: 4, background: "#5A3A22" }} />
    </div>
    <div style={{ position: "absolute", left: 552, top: 660, width: 20, height: 24, borderRadius: "0 12px 12px 0", border: "5px solid #C7BFAC", borderLeft: "none", zIndex: 6 }} />
    {/* the hero: slumped mascot standing BEHIND the desk (slab covers the feet) */}
    <div style={{ position: "absolute", left: 628, top: 462, zIndex: 5 }}><Mascot size={250} suit={1} shock={0.6} gaze={4} /></div>
    <Bubble x={470} y={268} w={412} text="Zero callbacks. The bot never even read it." tailLeft={false} />
  </ComicFrame>
);

export const CarC2Beat: React.FC = () => (
  <ComicFrame masthead="CLAUDE COMICS" ep="4 / 7" dots={3}
    caption={
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 56, lineHeight: 1.1, color: INK, letterSpacing: "-0.015em" }}>
        It rewrites for the bot, <span style={{ fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", color: SLATE }}>not the human.</span>
      </div>
    }>
    {/* ---- ROOM: the wizard's workshop ---- */}
    <div style={{ position: "absolute", inset: 0, background: grad("#3E2F5C", "#201838") }} />
    <Bloom x={690} y={460} r={310} c="rgba(201,180,255,0.34)" />
    <Bloom x={150} y={180} r={190} c="rgba(231,178,76,0.24)" />
    {/* stone wall */}
    {Array.from({ length: 9 }, (_, r) => Array.from({ length: 7 }, (_, c) => (
      <div key={`${r}-${c}`} style={{ position: "absolute", left: (r % 2 ? -60 : 0) + c * 150, top: r * 84, width: 142, height: 76, borderRadius: 6, background: "rgba(255,255,255,0.028)", border: "1px solid rgba(255,255,255,0.045)" }} />
    )))}
    {/* hanging lantern */}
    <div style={{ position: "absolute", left: 152, top: 0, width: 3, height: 64, background: "#5A4A32" }} />
    <div style={{ position: "absolute", left: 126, top: 64, width: 56, height: 66, borderRadius: 8, background: grad("#8A6A44", "#5A4530"), border: "2px solid #4A3722", boxShadow: "0 0 40px rgba(231,178,76,0.5)" }}>
      <div style={{ position: "absolute", inset: 8, borderRadius: 4, background: "radial-gradient(circle, #FFF3D6, #E7B24C)" }} />
    </div>
    {/* shelf with potion jars */}
    <div style={{ position: "absolute", left: 240, top: 252, width: 232, height: 12, borderRadius: 3, background: grad("#7A5A3C", "#54402A"), boxShadow: "0 10px 18px -6px rgba(0,0,0,0.7)" }} />
    {[{ c: "#4FB287", h: 56 }, { c: "#E7B24C", h: 44 }, { c: "#C9B4FF", h: 62 }].map((j, i) => (
      <div key={i} style={{ position: "absolute", left: 262 + i * 68, top: 252 - j.h, width: 42, height: j.h, borderRadius: "6px 6px 8px 8px", background: `linear-gradient(160deg, ${j.c}, rgba(0,0,0,0.35))`, border: "2px solid rgba(255,255,255,0.22)", boxShadow: `0 0 18px ${j.c}44` }}>
        <div style={{ position: "absolute", left: 12, top: -8, width: 18, height: 10, borderRadius: 3, background: "#7A5A3C" }} />
        <div style={{ position: "absolute", left: 6, top: 8, width: 7, height: j.h * 0.4, borderRadius: 4, background: "rgba(255,255,255,0.4)" }} />
      </div>
    ))}
    {/* workbench: slab + solid front filling the bottom band */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 700, height: 150, background: grad("#5A4430", "#33251A") }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 700, height: 44, background: grad("#8A6A44", "#5E4629"), boxShadow: "0 16px 30px -8px rgba(0,0,0,0.8)" }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 744, height: 3, background: "rgba(0,0,0,0.34)" }} />
    {Array.from({ length: 5 }, (_, i) => <div key={i} style={{ position: "absolute", left: 30 + i * 210, top: 762, width: 160, height: 3, borderRadius: 2, background: "rgba(0,0,0,0.16)" }} />)}
    {/* HERO: magic circle lifting the resume */}
    <svg style={{ position: "absolute", left: 520, top: 272, zIndex: 8 }} width={370} height={370} viewBox="0 0 370 370">
      <circle cx={185} cy={185} r={162} fill="none" stroke="#C9B4FF" strokeWidth={3} opacity={0.55} />
      <circle cx={185} cy={185} r={136} fill="none" stroke={GOLD} strokeWidth={2} strokeDasharray="12 9" opacity={0.75} />
      <circle cx={185} cy={185} r={110} fill="none" stroke="#C9B4FF" strokeWidth={2} strokeDasharray="4 12" opacity={0.5} />
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return <rect key={i} x={185 + Math.cos(a) * 150 - 7} y={185 + Math.sin(a) * 150 - 7} width={14} height={14} fill={GOLD} transform={`rotate(45 ${185 + Math.cos(a) * 150} ${185 + Math.sin(a) * 150})`} opacity={0.9} />;
      })}
    </svg>
    <div style={{ position: "absolute", left: 606, top: 320, zIndex: 12 }}><ResumeDoc w={200} h={272} tilt={5} /></div>
    <div style={{ position: "absolute", left: 806, top: 250, zIndex: 14, padding: "9px 18px", borderRadius: 11, background: grad("#4FB287", GREEN), fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 32, color: "#0C2C1E", boxShadow: "0 12px 26px -8px rgba(0,0,0,0.7)", transform: "rotate(4deg)" }}>96%</div>
    {/* sparks around the circle */}
    {Array.from({ length: 7 }, (_, i) => {
      const a = -2.0 + i * 0.42, r = 178 + seed(i) * 30;
      return <div key={i} style={{ position: "absolute", left: 705 + Math.cos(a) * r * 0.92, top: 457 + Math.sin(a) * r * 0.92, width: 12 + seed(i + 4) * 10, height: 12 + seed(i + 4) * 10, background: i % 2 ? GOLD : "#C9B4FF", transform: `rotate(${seed(i) * 90}deg)`, boxShadow: `0 0 14px ${i % 2 ? "rgba(231,178,76,0.9)" : "rgba(201,180,255,0.9)"}`, zIndex: 10 }} />;
    })}
    {/* the wizard, standing BEHIND the bench */}
    <div style={{ position: "absolute", left: 120, top: 452, zIndex: 5 }}><Mascot size={262} wizard={1} cheer={0.6} gaze={5} /></div>
    <Bubble x={70} y={296} w={382} text="Six keywords in. Format the scanner can parse." tailLeft />
  </ComicFrame>
);

// ============================================================================
// CONCEPT 3 — FIELD NOTES · cream printed magazine, type-led, no dark panel
// ============================================================================
const C3Frame: React.FC<{ children: React.ReactNode; page: string }> = ({ children, page }) => (
  <AbsoluteFill>
    <AbsoluteFill style={{ background: grad("#F1EEE6", "#E6E1D4") }}>
      <Bloom x={100} y={480} r={330} c="rgba(210,114,78,0.11)" />
      <Bloom x={980} y={1000} r={300} c="rgba(58,92,132,0.09)" />
      <PaperGrain />
      <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 260px rgba(40,32,24,0.18)" }} />
    </AbsoluteFill>
    <div style={{ position: "absolute", inset: 46, border: `2.5px solid ${CLAY}`, borderRadius: 6 }} />
    <div style={{ position: "absolute", inset: 58, border: "1px solid rgba(58,92,132,0.45)", borderRadius: 4 }} />
    {/* corner crop marks */}
    {[[70, 70], [1010, 70], [70, 1280], [1010, 1280]].map(([x, y], i) => (
      <React.Fragment key={i}><div style={{ position: "absolute", left: x - 14, top: y, width: 28, height: 1.5, background: "rgba(26,24,19,0.4)" }} /><div style={{ position: "absolute", left: x, top: y - 14, width: 1.5, height: 28, background: "rgba(26,24,19,0.4)" }} /></React.Fragment>
    ))}
    <div style={{ position: "absolute", top: 96, left: 0, right: 0, textAlign: "center", fontFamily: mono, fontWeight: 700, fontSize: 24, letterSpacing: "0.3em", color: "#59564C" }}>
      NO CODE ALEX {"·"} FIELD NOTES {"·"} VOL. 07
    </div>
    <div style={{ position: "absolute", top: 148, left: 200, right: 200, height: 1.5, background: "rgba(26,24,19,0.4)" }} />
    {children}
    <div style={{ position: "absolute", bottom: 96, left: 120, fontFamily: mono, fontWeight: 700, fontSize: 26, color: "#59564C", letterSpacing: "0.12em" }}>{page}</div>
  </AbsoluteFill>
);

export const CarC3Cover: React.FC = () => (
  <C3Frame page="01 / 08">
    {/* coffee ring stain + paperclip = printed-object texture */}
    <div style={{ position: "absolute", left: 690, top: 226, width: 190, height: 190, borderRadius: "50%", border: "9px solid rgba(150,110,64,0.13)", transform: "rotate(12deg) scaleY(0.92)" }} />
    <div style={{ position: "absolute", left: 726, top: 262, width: 118, height: 118, borderRadius: "50%", border: "3px solid rgba(150,110,64,0.09)" }} />
    <svg style={{ position: "absolute", left: 116, top: 196 }} width={54} height={126} viewBox="0 0 54 126">
      <path d="M16 118 L16 26 Q16 8 30 8 Q44 8 44 26 L44 100 Q44 112 34 112 Q24 112 24 100 L24 34" fill="none" stroke="#9A9384" strokeWidth={6} strokeLinecap="round" />
    </svg>
    <div style={{ position: "absolute", top: 264, left: 110, right: 110, textAlign: "center" }}>
      <div style={{ fontFamily: mono, fontWeight: 700, fontSize: 23, letterSpacing: "0.26em", color: CLAY }}>THE JOB HUNT FILES</div>
      <div style={{ marginTop: 30, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 132, lineHeight: 1.0, color: INK, letterSpacing: "-0.03em" }}>
        Beat the
        <br />
        <span style={{ fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", color: SLATE }}>resume bot.</span>
      </div>
      <div style={{ margin: "38px auto 0", width: 130, height: 5, borderRadius: 3, background: CLAY }} />
      <div style={{ marginTop: 34, fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 33, lineHeight: 1.5, color: "#3C3A32" }}>
        A 5-step Claude system.
        <br />
        From a 41% match to 96%, in one evening.
      </div>
    </div>
    {/* FIG.1 — the printed figure: before/after score plate */}
    <div style={{ position: "absolute", left: 176, top: 806, width: 480, height: 226, borderRadius: 8, background: "#FBF9F2", border: "2px solid rgba(26,24,19,0.5)", boxShadow: "7px 8px 0 rgba(26,24,19,0.12)" }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 40, background: INK, display: "flex", alignItems: "center", paddingLeft: 16 }}>
        <span style={{ fontFamily: mono, fontWeight: 700, fontSize: 18, letterSpacing: "0.16em", color: "#F1EDE2" }}>FIG. 1 {"·"} ATS SCORE</span>
      </div>
      <div style={{ position: "absolute", left: 34, top: 66, width: 150 }}>
        <div style={{ height: 62, borderRadius: 6, background: "rgba(196,74,58,0.16)", border: `2.5px solid ${RED}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 44, color: RED }}>41%</div>
        <div style={{ marginTop: 10, textAlign: "center", fontFamily: mono, fontWeight: 700, fontSize: 17, letterSpacing: "0.1em", color: "#6B675C" }}>BEFORE</div>
      </div>
      <svg style={{ position: "absolute", left: 200, top: 78 }} width={90} height={40} viewBox="0 0 90 40">
        <path d="M2 20 L74 20" stroke={INK} strokeWidth={3} strokeDasharray="8 6" /><polygon points="88,20 70,11 70,29" fill={INK} />
      </svg>
      <div style={{ position: "absolute", left: 296, top: 66, width: 150 }}>
        <div style={{ height: 62, borderRadius: 6, background: "rgba(63,158,116,0.16)", border: `2.5px solid ${GREEN}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 44, color: GREEN }}>96%</div>
        <div style={{ marginTop: 10, textAlign: "center", fontFamily: mono, fontWeight: 700, fontSize: 17, letterSpacing: "0.1em", color: "#6B675C" }}>AFTER</div>
      </div>
      <div style={{ position: "absolute", left: 34, bottom: 16, fontFamily: inter.fontFamily, fontStyle: "italic", fontWeight: 600, fontSize: 19, color: "#6B675C" }}>Same experience. One rewrite pass.</div>
    </div>
    {/* handwritten margin annotation */}
    <svg style={{ position: "absolute", left: 676, top: 848 }} width={122} height={104} viewBox="0 0 122 104">
      <path d="M112 92 C 78 88, 46 62, 22 24" fill="none" stroke={CLAY} strokeWidth={3.5} strokeLinecap="round" />
      <polygon points="16,12 32,30 10,32" fill={CLAY} />
    </svg>
    <div style={{ position: "absolute", left: 774, top: 906, width: 176, fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 600, fontSize: 26, lineHeight: 1.3, color: CLAY, transform: "rotate(-4deg)" }}>the bot never saw the difference</div>
    <div style={{ position: "absolute", top: 1078, left: 0, right: 0, textAlign: "center", fontFamily: mono, fontWeight: 700, fontSize: 23, letterSpacing: "0.2em", color: "#59564C" }}>
      INSIDE {"·"} 5 STEPS {"·"} THE SCORE TEST {"·"} THE PROMPTS
    </div>
    <div style={{ position: "absolute", right: 108, bottom: 90, width: 152, height: 152, borderRadius: "50%", background: grad(CLAY, "#B85A38"), boxShadow: "0 18px 36px -12px rgba(150,70,40,0.55)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 130, height: 130, borderRadius: "50%", border: "2px dashed rgba(255,246,238,0.75)", display: "flex", alignItems: "flex-end", justifyContent: "center", overflow: "hidden" }}>
        <Mascot size={112} grad_={1} />
      </div>
    </div>
  </C3Frame>
);

export const CarC3Step: React.FC = () => (
  <C3Frame page="03 / 08">
    <div style={{ position: "absolute", top: 200, left: 110, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 250, lineHeight: 1, color: "#C9D2E0", letterSpacing: "-0.04em" }}>02</div>
    <div style={{ position: "absolute", top: 232, left: 372, right: 110 }}>
      <div style={{ fontFamily: mono, fontWeight: 700, fontSize: 22, letterSpacing: "0.22em", color: CLAY }}>STEP TWO</div>
      <div style={{ marginTop: 12, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 76, lineHeight: 1.02, color: INK, letterSpacing: "-0.02em" }}>
        Interrogate <span style={{ fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", color: CLAY }}>the job post.</span>
      </div>
      <div style={{ marginTop: 14, width: 110, height: 5, borderRadius: 3, background: CLAY }} />
    </div>
    {/* drop-cap body */}
    <div style={{ position: "absolute", top: 494, left: 110, right: 430 }}>
      <div style={{ float: "left", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 112, lineHeight: 0.82, color: SLATE, marginRight: 16, marginTop: 8 }}>C</div>
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 30, lineHeight: 1.5, color: "#3C3A32" }}>
        laude pulls the 6 keywords the screening bot ranks resumes by, then shows the 3 gaps in yours. Ranked by weight.
      </div>
    </div>
    {/* FIG.2 — the printed keyword table */}
    <div style={{ position: "absolute", right: 108, top: 486, width: 296, borderRadius: 8, background: "#FBF9F2", border: "2px solid rgba(26,24,19,0.5)", boxShadow: "7px 8px 0 rgba(26,24,19,0.12)", overflow: "hidden" }}>
      <div style={{ height: 40, background: INK, display: "flex", alignItems: "center", paddingLeft: 14 }}>
        <span style={{ fontFamily: mono, fontWeight: 700, fontSize: 17, letterSpacing: "0.14em", color: "#F1EDE2" }}>FIG. 2 {"·"} WHAT IT RANKS</span>
      </div>
      {[{ t: "roadmap", w: 92 }, { t: "SQL", w: 78 }, { t: "A/B tests", w: 64 }, { t: "stakeholder", w: 51 }].map((r, i) => (
        <div key={i} style={{ padding: "13px 14px", borderBottom: i < 3 ? "1px solid rgba(26,24,19,0.14)" : "none", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 26, fontFamily: mono, fontWeight: 700, fontSize: 17, color: "#8A867A" }}>{i + 1}.</div>
          <div style={{ flex: 1, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 22, color: INK }}>{r.t}</div>
          <div style={{ width: 72, height: 11, borderRadius: 6, background: "rgba(58,92,132,0.2)", overflow: "hidden" }}><div style={{ width: `${r.w}%`, height: "100%", background: grad("#E08A63", CLAY) }} /></div>
        </div>
      ))}
      <div style={{ padding: "11px 14px", background: "rgba(58,92,132,0.08)", borderTop: "2px solid rgba(26,24,19,0.5)", fontFamily: mono, fontWeight: 700, fontSize: 17, color: "#59564C", letterSpacing: "0.06em" }}>+ 2 MORE {"·"} 3 GAPS FOUND</div>
    </div>
    {/* pull quote */}
    <div style={{ position: "absolute", left: 110, top: 806, right: 430, paddingLeft: 26, borderLeft: `5px solid ${CLAY}` }}>
      <div style={{ fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", fontWeight: 700, fontSize: 39, lineHeight: 1.26, color: INK }}>
        {"“"}You are not writing for a recruiter. You are writing for a parser.{"”"}
      </div>
    </div>
    {/* the gated stamp */}
    <div style={{ position: "absolute", left: 110, top: 984, display: "flex", alignItems: "center", gap: 14, padding: "14px 24px", borderRadius: 8, border: `3px solid ${GOLD}`, background: "rgba(231,178,76,0.13)", transform: "rotate(-1.5deg)" }}>
      <Padlock size={30} color="#B98A22" />
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 24, color: "#8A6412", letterSpacing: "0.08em" }}>FULL PROMPT {"·"} IN THE GUIDE</div>
    </div>
    <div style={{ position: "absolute", right: 122, top: 1042 }}><Mascot size={186} sherlock={1} gaze={-4} /></div>
  </C3Frame>
);

// ============================================================================
// CONCEPT 4 — RECEIPTS · full dark, data-dense dashboard + gold numbers
// ============================================================================
export const CarC4Cover: React.FC = () => (
  <AbsoluteFill>
    <DarkBg />
    <GodRay x={300} w={300} h={700} c="rgba(231,178,76,0.10)" />
    <div style={{ position: "absolute", top: 78, left: 0, right: 0, textAlign: "center", fontFamily: mono, fontWeight: 700, fontSize: 26, letterSpacing: "0.28em", color: GOLD }}>
      RECEIPTS {"·"} ONE CLAUDE CHAT
    </div>
    <div style={{ position: "absolute", top: 118, left: 0, right: 0, textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 196, letterSpacing: "-0.03em", color: "#F3E7C8", textShadow: "0 12px 44px rgba(231,178,76,0.32)", lineHeight: 1.05 }}>
      41{"→"}96
    </div>
    <div style={{ position: "absolute", top: 356, left: 130, right: 130, textAlign: "center", fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 36, lineHeight: 1.38, color: "#E8EDF8" }}>
      What the hiring bot scored the same resume, before and after Claude.
    </div>
    {/* ---- the dashboard (zoned: gauge column | tiles + chart column) ---- */}
    <div style={{ position: "absolute", left: 74, right: 74, top: 468, height: 522, borderRadius: 26, background: grad("#1A2540", "#111A2E"), border: "2px solid rgba(150,175,225,0.3)", boxShadow: "0 40px 80px -22px rgba(0,0,0,0.85)", overflow: "hidden" }}>
      {/* sidebar */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 66, background: "#0C1424", borderRight: "1px solid rgba(150,175,225,0.2)" }}>
        {[GOLD, SLATE, SLATE, SLATE].map((c, i) => <div key={i} style={{ position: "absolute", left: 17, top: 84 + i * 46, width: 32, height: 32, borderRadius: 8, background: i === 0 ? grad(c, "#C89232") : grad("#1D2B45", "#16223A"), border: `1.5px solid ${i === 0 ? "rgba(255,235,180,0.5)" : "rgba(120,150,210,0.3)"}` }} />)}
      </div>
      {/* header */}
      <div style={{ position: "absolute", left: 66, right: 0, top: 0, height: 58, background: "#0F1828", borderBottom: "1px solid rgba(150,175,225,0.22)", display: "flex", alignItems: "center", paddingLeft: 22, gap: 14 }}>
        <div style={{ fontFamily: mono, fontWeight: 700, fontSize: 22, color: "#DCE4F4", letterSpacing: "0.1em" }}>ATS MATCH REPORT</div>
        <div style={{ padding: "4px 12px", borderRadius: 6, background: "rgba(63,158,116,0.2)", border: `1.5px solid ${GREEN}`, fontFamily: mono, fontWeight: 700, fontSize: 15, color: "#8FE7B6" }}>PASSED</div>
        <div style={{ marginLeft: "auto", marginRight: 20, fontFamily: mono, fontSize: 17, color: "#6E82A6" }}>run 03 {"·"} 12m 04s</div>
      </div>
      <Bloom x={230} y={230} r={180} c="rgba(63,158,116,0.22)" />
      {/* LEFT column: gauge + keyword checks + before chip */}
      <div style={{ position: "absolute", left: 106, top: 92 }}><ScoreGauge pct={96} label="MATCH" size={186} /></div>
      {["roadmap", "SQL", "A/B tests"].map((t, i) => (
        <div key={i} style={{ position: "absolute", left: 106, top: 302 + i * 46, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 28, height: 28, borderRadius: 7, background: grad("#2A6B4E", GREEN), display: "flex", alignItems: "center", justifyContent: "center", color: "#EAFBF2", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 18 }}>{"✓"}</div>
          <div style={{ fontFamily: mono, fontWeight: 700, fontSize: 22, color: "#DCE4F4" }}>{t}</div>
        </div>
      ))}
      <div style={{ position: "absolute", left: 106, top: 452, padding: "8px 16px", borderRadius: 10, border: `2px solid ${RED}`, color: "#E88A78", fontFamily: mono, fontWeight: 800, fontSize: 21, background: "rgba(196,74,58,0.12)", textDecoration: "line-through" }}>before: 41%</div>
      {/* RIGHT column: metric tiles */}
      {[{ t: "KEYWORDS", v: "6/6", c: GREEN }, { t: "PARSE RATE", v: "100%", c: GREEN }, { t: "GAPS LEFT", v: "0", c: GOLD }].map((m, i) => (
        <div key={i} style={{ position: "absolute", left: 350 + i * 186, top: 92, width: 170, height: 100, borderRadius: 13, background: grad("#22304E", "#1A2540"), border: "1.5px solid rgba(150,175,225,0.28)", padding: "12px 14px", boxShadow: "0 12px 24px -10px rgba(0,0,0,0.7)" }}>
          <div style={{ fontFamily: mono, fontSize: 15, color: "#7C90B4", letterSpacing: "0.1em" }}>{m.t}</div>
          <div style={{ marginTop: 4, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 38, color: m.c === GREEN ? "#8FE7B6" : "#F3CE7E" }}>{m.v}</div>
          <div style={{ position: "absolute", left: 14, right: 14, bottom: 12, height: 6, borderRadius: 3, background: "rgba(58,92,132,0.4)" }}><div style={{ width: i === 2 ? "100%" : "92%", height: "100%", borderRadius: 3, background: m.c }} /></div>
        </div>
      ))}
      {/* RIGHT column: score-by-pass chart */}
      <div style={{ position: "absolute", left: 350, top: 214, width: 542, height: 158, borderRadius: 13, background: grad("#22304E", "#1A2540"), border: "1.5px solid rgba(150,175,225,0.28)", padding: "12px 16px" }}>
        <div style={{ fontFamily: mono, fontSize: 15, color: "#7C90B4", letterSpacing: "0.1em" }}>SCORE BY PASS</div>
        <div style={{ position: "absolute", left: 16, right: 16, bottom: 14, height: 96, display: "flex", alignItems: "flex-end", gap: 16 }}>
          {[41, 58, 79, 96].map((v, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
              <div style={{ fontFamily: mono, fontWeight: 700, fontSize: 16, color: i === 3 ? "#8FE7B6" : "#8AA0C6" }}>{v}</div>
              <div style={{ width: "100%", height: v * 0.72, borderRadius: "5px 5px 2px 2px", background: i === 3 ? grad("#4FB287", GREEN) : i === 0 ? grad("#8A4A40", "#6B372F") : grad("#4A6A99", "#37507A") }} />
            </div>
          ))}
        </div>
      </div>
      {/* RIGHT column: run log strip */}
      <div style={{ position: "absolute", left: 350, top: 394, width: 542, height: 96, borderRadius: 13, background: grad("#22304E", "#1A2540"), border: "1.5px solid rgba(150,175,225,0.28)", padding: "10px 16px" }}>
        <div style={{ fontFamily: mono, fontSize: 15, color: "#7C90B4", letterSpacing: "0.1em" }}>RUN LOG</div>
        <div style={{ marginTop: 7, fontFamily: mono, fontSize: 18, lineHeight: 1.5, color: "#7ED6A6" }}>
          <div>{"✓"} rewrite pass 3 {"·"} +17 pts</div>
          <div style={{ color: "#5E739A" }}>closed 00:12:04 {"·"} 0 errors</div>
        </div>
      </div>
      <Sheen r={26} />
    </div>
    {/* the sprite presents the dashboard from the page, its own band */}
    <ContactShadow x={196} y={1180} w={200} o={0.5} />
    <div style={{ position: "absolute", left: 96, top: 996, zIndex: 10 }}><Mascot size={200} neo={1} /></div>
    <div style={{ position: "absolute", left: 330, top: 1074, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 30, color: "rgba(200,214,240,0.92)", letterSpacing: "0.04em" }}>
      Swipe for the receipts {"→"}
    </div>
    <Handle y={1276} dark />
  </AbsoluteFill>
);

export const CarC4Receipt: React.FC = () => (
  <AbsoluteFill>
    <DarkBg />
    <div style={{ position: "absolute", top: 80, left: 0, right: 0, textAlign: "center", fontFamily: mono, fontWeight: 700, fontSize: 26, letterSpacing: "0.28em", color: GOLD }}>RECEIPT 02 / 05</div>
    <div style={{ position: "absolute", top: 138, left: 90, right: 90, textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 78, lineHeight: 1.06, color: "#F2F0E8", letterSpacing: "-0.02em" }}>
      12 minutes. <span style={{ fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", color: "#F3CE7E" }}>Zero code.</span>
    </div>
    {/* terminal */}
    <div style={{ position: "absolute", left: 88, right: 88, top: 296, height: 560, borderRadius: 26, background: grad(TERM, TERM2), border: "2px solid rgba(120,150,210,0.3)", boxShadow: "0 40px 80px -22px rgba(0,0,0,0.85)", overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 54, background: "#0A101C", borderBottom: "1px solid rgba(120,150,210,0.25)" }}>
        <div style={{ position: "absolute", left: 26, top: 19, display: "flex", gap: 11 }}>{[RED, AMBER, GREEN].map((c, i) => <div key={i} style={{ width: 14, height: 14, borderRadius: "50%", background: c }} />)}</div>
        <div style={{ position: "absolute", left: 108, top: 15, fontFamily: mono, fontSize: 21, color: "rgba(190,205,235,0.75)" }}>claude {"·"} callback session</div>
      </div>
      <Bloom x={360} y={280} r={240} c="rgba(63,158,116,0.16)" />
      <div style={{ position: "absolute", left: 44, top: 82, right: 44, fontFamily: mono, fontSize: 27, lineHeight: 1.92 }}>
        <div style={{ color: "rgba(190,205,235,0.95)" }}><span style={{ color: GOLD }}>{">"}</span> claude run callback.md</div>
        <div style={{ color: "#7ED6A6" }}>{"✓"} 6 keywords injected</div>
        <div style={{ color: "#7ED6A6" }}>{"✓"} format the scanner can parse</div>
        <div style={{ color: "#7ED6A6" }}>{"✓"} 3 gap fixes written in</div>
        <div style={{ color: "#7ED6A6" }}>{"✓"} re-scored against the job post</div>
        <div style={{ color: "#5E739A" }}>session closed {"·"} 00:12:04</div>
      </div>
      {/* progress rail */}
      <div style={{ position: "absolute", left: 44, right: 44, top: 402, height: 10, borderRadius: 5, background: "rgba(58,92,132,0.35)", overflow: "hidden" }}>
        <div style={{ width: "100%", height: "100%", background: `linear-gradient(to right, ${SLATE}, ${GREEN})` }} />
      </div>
      <div style={{ position: "absolute", left: 44, top: 428, fontFamily: mono, fontSize: 18, color: "#6E82A6", letterSpacing: "0.08em" }}>4 / 4 PASSES COMPLETE</div>
      <div style={{ position: "absolute", left: 44, bottom: 36, display: "flex", gap: 18, alignItems: "center" }}>
        <div style={{ padding: "11px 24px", borderRadius: 13, background: grad(CLAY, "#B85A38"), fontFamily: mono, fontWeight: 800, fontSize: 26, color: "#FFF6EE", boxShadow: "0 14px 30px -10px rgba(140,60,35,0.7)" }}>CALLBACK.md</div>
        <div style={{ padding: "11px 24px", borderRadius: 13, background: "rgba(231,178,76,0.14)", border: `2.5px solid ${GOLD}`, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 28, color: "#F3CE7E" }}>12 min total</div>
      </div>
      <ContactShadow x={782} y={480} w={190} o={0.6} />
      <div style={{ position: "absolute", right: 46, top: 280, zIndex: 10 }}><Mascot size={200} glasses={1} gaze={-5} /></div>
      <Sheen r={26} />
    </div>
    <div style={{ position: "absolute", bottom: 152, left: 0, right: 0, textAlign: "center", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 29, color: "rgba(200,214,240,0.9)", letterSpacing: "0.04em" }}>
      Next: what it found in the job post {"→"}
    </div>
    <Handle y={1276} dark />
  </AbsoluteFill>
);

// ============================================================================
// CONCEPT 5 — CREW CARDS · collectible foil cards, costume-led
// ============================================================================
export const CrewCard: React.FC<{ name: string; role: string; num: string; mascot: React.ReactNode; art: React.ReactNode; stats: { label: string; val: number; c: string }[]; chip: string; w?: number; h?: number }> = ({ name, role, num, mascot, art, stats, chip, w = 550, h = 800 }) => (
  <div style={{ position: "relative", width: w, height: h, borderRadius: 34, background: `linear-gradient(135deg, #F0B08E 0%, #C05F38 26%, #E8A37F 48%, #A94F2C 72%, #E0906A 100%)`, padding: 11, boxShadow: "0 44px 84px -24px rgba(120,50,25,0.6), 0 14px 30px rgba(60,30,15,0.34)" }}>
    <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 26, background: grad("#1D2B49", "#131D34"), overflow: "hidden", border: "2px solid rgba(255,220,190,0.4)" }}>
      {/* name plate */}
      <div style={{ position: "absolute", top: 22, left: 26, right: 26, height: 62, borderRadius: 12, background: grad("#2A3A5C", "#1C2740"), border: "1.5px solid rgba(255,220,190,0.28)", display: "flex", alignItems: "center", paddingLeft: 20 }}>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: h * 0.062, color: "#F6EBDD", letterSpacing: "0.02em" }}>{name}</div>
        <div style={{ marginLeft: "auto", marginRight: 16, display: "flex", gap: 6 }}>
          {[GOLD, GOLD, "#4A5A78"].map((c, i) => <div key={i} style={{ width: 12, height: 12, borderRadius: "50%", background: c, border: "1px solid rgba(0,0,0,0.3)" }} />)}
        </div>
      </div>
      {/* art window: scaled scene + a real floor + a landed shadow, THEN the sprite */}
      <div style={{ position: "absolute", top: 98, left: 26, right: 26, height: h * 0.42, borderRadius: 14, background: grad("#0F1A30", "#0A1120"), border: "2px solid rgba(255,220,190,0.3)", overflow: "hidden" }}>
        <ScaledArt w={w - 74} h={h * 0.42}>{art}</ScaledArt>
        {/* the ground the sprite stands on (the shadow needs something to land on) */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: h * 0.42 * 0.17, background: "linear-gradient(to top, rgba(0,0,0,0.62), transparent)", zIndex: 6 }} />
        <div style={{ position: "absolute", left: 0, right: 0, bottom: h * 0.42 * 0.115, height: 1.5, background: "rgba(255,220,190,0.22)", zIndex: 6 }} />
        <div style={{ position: "absolute", left: "27%", right: "27%", bottom: h * 0.42 * 0.085, height: 13, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(0,0,0,0.85), transparent 72%)", filter: "blur(4px)", zIndex: 7 }} />
        {/* paddingBottom keeps the feet ON the floor line instead of amputated by the border */}
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 10, paddingBottom: h * 0.42 * 0.055 }}>{mascot}</div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(118deg, transparent 26%, rgba(255,255,255,0.13) 40%, transparent 52%)", zIndex: 11, pointerEvents: "none" }} />
      </div>
      {/* role banner */}
      <div style={{ position: "absolute", top: 98 + h * 0.42 + 12, left: 26, right: 26, padding: "8px 0", textAlign: "center", borderRadius: 999, background: grad("#4A2A1E", "#331C13"), border: `2px solid ${CLAY}`, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: h * 0.025, letterSpacing: "0.14em", color: "#F0B08E" }}>{role}</div>
      {/* stats + the pips row, in FLOW so the count never collides with the chip */}
      <div style={{ position: "absolute", left: 40, right: 40, top: 98 + h * 0.42 + 66 }}>
        {stats.map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 15 }}>
            <div style={{ width: 108, fontFamily: mono, fontWeight: 700, fontSize: h * 0.024, letterSpacing: "0.08em", color: "rgba(200,214,240,0.9)" }}>{s.label}</div>
            {/* solid dark track (was a 0.4 slate wash, which made a SLATE fill invisible on it) */}
            <div style={{ flex: 1, height: 15, borderRadius: 8, background: "#141E33", overflow: "hidden", border: "1px solid rgba(150,175,225,0.28)" }}>
              <div style={{ width: `${s.val}%`, height: "100%", borderRadius: 8, background: grad(s.c === SLATE ? "#6E93C4" : s.c, s.c === SLATE ? "#4E74A8" : s.c) }} />
            </div>
            <div style={{ width: 34, textAlign: "right", fontFamily: mono, fontWeight: 700, fontSize: h * 0.022, color: "rgba(200,214,240,0.75)" }}>{s.val}</div>
          </div>
        ))}
        <div style={{ display: "flex", gap: 7, alignItems: "center", marginTop: 6 }}>
          <div style={{ fontFamily: mono, fontWeight: 700, fontSize: h * 0.02, color: "rgba(200,214,240,0.6)", letterSpacing: "0.1em", marginRight: 4 }}>RUNS ON</div>
          {[GOLD, GOLD, "#3A4A68"].map((c, i) => <div key={i} style={{ width: h * 0.021, height: h * 0.021, borderRadius: "50%", background: c, border: "1.5px solid rgba(0,0,0,0.35)" }} />)}
        </div>
      </div>
      {/* ability chip — single line, its own zone */}
      <div style={{ position: "absolute", left: 26, right: 26, bottom: 50, padding: `${h * 0.014}px 0`, textAlign: "center", borderRadius: 999, background: grad(GOLD, "#C89232"), fontFamily: inter.fontFamily, fontWeight: 900, fontSize: h * 0.0225, color: "#2E2108", letterSpacing: "0.02em", boxShadow: "0 12px 26px -8px rgba(140,100,20,0.7)", whiteSpace: "nowrap", overflow: "hidden" }}>{chip}</div>
      {/* set line */}
      <div style={{ position: "absolute", left: 34, bottom: 20, fontFamily: mono, fontWeight: 700, fontSize: h * 0.02, color: "rgba(200,214,240,0.55)", letterSpacing: "0.1em" }}>{num}</div>
      <div style={{ position: "absolute", right: 34, bottom: 18, width: h * 0.03, height: h * 0.03 }}><ClaudeLogo size={h * 0.03} color="#8AA0C6" /></div>
    </div>
  </div>
);

export const RadarArt: React.FC = () => (
  <>
    <Bloom x={250} y={170} r={170} c="rgba(58,92,132,0.5)" />
    {[52, 92, 132].map((r, i) => <div key={i} style={{ position: "absolute", left: 250 - r, top: 180 - r, width: r * 2, height: r * 2, borderRadius: "50%", border: "2px solid rgba(120,190,235,0.3)" }} />)}
    <div style={{ position: "absolute", left: 250, top: 48, width: 2, height: 132, background: "rgba(120,190,235,0.35)" }} />
    <div style={{ position: "absolute", left: 118, top: 179, width: 264, height: 2, background: "rgba(120,190,235,0.35)" }} />
    <div style={{ position: "absolute", left: 250, top: 180, width: 130, height: 130, background: "conic-gradient(from 0deg, rgba(120,220,190,0.4), transparent 60deg)", borderRadius: "0 100% 0 0", transformOrigin: "0 0" }} />
    {[[196, 118], [318, 148], [292, 236]].map(([x, y], i) => <div key={i} style={{ position: "absolute", left: x, top: y, width: 13, height: 13, borderRadius: "50%", background: i === 0 ? RED : GREEN, boxShadow: `0 0 12px ${i === 0 ? "rgba(196,74,58,0.9)" : "rgba(63,158,116,0.9)"}` }} />)}
  </>
);

export const StageArt: React.FC<{ c1: string; c2: string }> = ({ c1, c2 }) => (
  <>
    <Bloom x={250} y={190} r={180} c={c1} />
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 66, background: `linear-gradient(to top, ${c2}, transparent)` }} />
    {Array.from({ length: 9 }, (_, i) => (
      <div key={i} style={{ position: "absolute", left: 250, top: 20, width: 3, height: 300, background: "rgba(255,255,255,0.06)", transformOrigin: "50% 0", transform: `rotate(${-58 + i * 14.5}deg)` }} />
    ))}
  </>
);

export const CarC5Cover: React.FC = () => (
  <AbsoluteFill>
    <CreamBg />
    <div style={{ position: "absolute", top: 82, left: 0, right: 0, textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 84, color: INK, letterSpacing: "-0.02em", lineHeight: 1.04 }}>
      Claude, hired <span style={{ fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", color: CLAY }}>5 times.</span>
    </div>
    <div style={{ position: "absolute", top: 190, left: 0, right: 0, textAlign: "center", fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 33, color: "#4A5568" }}>
      Your whole C-suite, one model. Collect all 5 {"→"}
    </div>
    {/* spotlight stage */}
    <Bloom x={540} y={730} r={430} c="rgba(210,114,78,0.20)" />
    <ContactShadow x={540} y={1092} w={720} h={44} o={0.32} />
    <div style={{ position: "absolute", left: 96, top: 372, transform: "rotate(-10deg)", filter: "brightness(0.76) saturate(0.85)" }}>
      <CrewCard name="NOVA" role="CHIEF SPY" num="002 / 005" mascot={<div style={{ marginBottom: -14 }}><Mascot size={188} sherlock={1} /></div>} art={<RadarArt />} chip="BRIEFING BY 7AM" w={404} h={580}
        stats={[{ label: "INTEL", val: 92, c: SLATE }, { label: "STEALTH", val: 86, c: AMBER }]} />
    </div>
    <div style={{ position: "absolute", right: 96, top: 372, transform: "rotate(10deg)", filter: "brightness(0.76) saturate(0.85)" }}>
      <CrewCard name="REMY" role="CHIEF CONTENT" num="004 / 005" mascot={<div style={{ marginBottom: -14 }}><Mascot size={188} chef={1} /></div>} art={<StageArt c1="rgba(63,158,116,0.45)" c2="rgba(30,80,60,0.7)" />} chip="7 POSTS / WEEK" w={404} h={580}
        stats={[{ label: "OUTPUT", val: 95, c: GREEN }, { label: "VOICE", val: 88, c: CLAY }]} />
    </div>
    <div style={{ position: "absolute", left: 290, top: 316, zIndex: 10 }}>
      <CrewCard name="OTTO" role="CHIEF OPERATING OFFICER" num="001 / 005" mascot={<div style={{ marginBottom: -16 }}><Mascot size={224} suit={1} cheer={0.4} /></div>} art={<StageArt c1="rgba(231,178,76,0.42)" c2="rgba(90,60,20,0.75)" />} chip="$0.03 / TASK" w={500} h={720}
        stats={[{ label: "OPS", val: 96, c: GREEN }, { label: "SPEED", val: 90, c: GOLD }, { label: "COST", val: 12, c: SLATE }]} />
    </div>
    <Dots n={6} lit={0} y={1226} />
    <Handle y={1268} />
  </AbsoluteFill>
);

export const CarC5Card: React.FC = () => (
  <AbsoluteFill>
    <CreamBg />
    <div style={{ position: "absolute", top: 84, left: 0, right: 0, textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 68, color: INK, letterSpacing: "-0.02em" }}>
      {"№"}2 {"·"} the one that <span style={{ fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", color: SLATE }}>spies.</span>
    </div>
    <Bloom x={540} y={660} r={400} c="rgba(58,92,132,0.20)" />
    {/* holo rays behind the card */}
    {Array.from({ length: 11 }, (_, i) => (
      <div key={i} style={{ position: "absolute", left: 540, top: 640, width: 4, height: 460, background: i % 2 ? "rgba(210,114,78,0.10)" : "rgba(58,92,132,0.10)", transformOrigin: "50% 0", transform: `rotate(${-150 + i * 30}deg)` }} />
    ))}
    <ContactShadow x={540} y={1058} w={470} h={36} o={0.4} />
    <div style={{ position: "absolute", left: 265, top: 216, zIndex: 10 }}>
      <CrewCard name="NOVA" role="CHIEF SPY · COMPETITOR INTEL" num="002 / 005 · HOLO" mascot={<div style={{ marginBottom: -18 }}><Mascot size={240} sherlock={1} gaze={-5} /></div>} art={<RadarArt />} chip="BRIEFING ON YOUR DESK BY 7AM" w={550} h={820}
        stats={[{ label: "INTEL", val: 92, c: SLATE }, { label: "STEALTH", val: 86, c: AMBER }, { label: "RECEIPTS", val: 90, c: GREEN }]} />
    </div>
    <div style={{ position: "absolute", top: 1084, left: 140, right: 140, textAlign: "center", fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 30, lineHeight: 1.42, color: "#3C3A32" }}>
      Watches every competitor move overnight. Flags the 3 that matter.
    </div>
    <Dots n={6} lit={1} y={1226} />
    <Handle y={1268} />
  </AbsoluteFill>
);

// ============================================================================
// CONCEPT 6 — BLUEPRINT · navy drafting sheet, system-as-hero, spec gated
// ============================================================================
const BpNode: React.FC<{ x: number; y: number; w: number; h: number; title: string; gold?: boolean; children?: React.ReactNode }> = ({ x, y, w, h, title, gold, children }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, borderRadius: 14, border: `3px solid ${gold ? GOLD : "rgba(220,235,255,0.85)"}`, background: gold ? "rgba(90,70,26,0.5)" : "rgba(16,26,48,0.72)", boxShadow: gold ? "0 12px 30px -10px rgba(0,0,0,0.7)" : "0 10px 26px -10px rgba(0,0,0,0.55)" }}>
    <div style={{ position: "absolute", top: -18, left: 16, padding: "3px 13px", borderRadius: 7, background: gold ? GOLD : "#22304E", border: gold ? "none" : "2px solid rgba(220,235,255,0.7)", fontFamily: mono, fontWeight: 800, fontSize: 20, letterSpacing: "0.1em", color: gold ? "#2E2108" : "#E4ECFB" }}>{title}</div>
    {children}
  </div>
);

const BpWire: React.FC<{ x1: number; y1: number; x2: number; y2: number; gold?: boolean }> = ({ x1, y1, x2, y2, gold }) => {
  const midX = (x1 + x2) / 2;
  return (
    <svg style={{ position: "absolute", left: 0, top: 0 }} width={1080} height={1350}>
      <path d={`M ${x1} ${y1} L ${midX} ${y1} L ${midX} ${y2} L ${x2} ${y2}`} fill="none" stroke={gold ? GOLD : "rgba(220,235,255,0.8)"} strokeWidth={3} strokeDasharray="10 7" />
      <polygon points={`${x2},${y2} ${x2 - 14},${y2 - 8} ${x2 - 14},${y2 + 8}`} fill={gold ? GOLD : "rgba(220,235,255,0.9)"} />
    </svg>
  );
};

const Callout: React.FC<{ x: number; y: number; n: string }> = ({ x, y, n }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 38, height: 38, borderRadius: "50%", border: `2.5px solid ${GOLD}`, background: "#14203A", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: mono, fontWeight: 800, fontSize: 20, color: GOLD }}>{n}</div>
);

const DimLine: React.FC<{ x: number; y: number; w: number; label: string }> = ({ x, y, w, label }) => (
  <>
    <svg style={{ position: "absolute", left: x, top: y - 10 }} width={w} height={20}>
      <line x1={0} y1={10} x2={w} y2={10} stroke="rgba(190,215,255,0.6)" strokeWidth={1.5} />
      <polygon points={`0,10 12,5 12,15`} fill="rgba(190,215,255,0.8)" /><polygon points={`${w},10 ${w - 12},5 ${w - 12},15`} fill="rgba(190,215,255,0.8)" />
      <line x1={0} y1={0} x2={0} y2={20} stroke="rgba(190,215,255,0.5)" strokeWidth={1.5} /><line x1={w} y1={0} x2={w} y2={20} stroke="rgba(190,215,255,0.5)" strokeWidth={1.5} />
    </svg>
    <div style={{ position: "absolute", left: x + w / 2 - 50, top: y - 34, width: 100, textAlign: "center", fontFamily: mono, fontSize: 17, color: "#BFD2F2", background: "#152341", padding: "1px 0" }}>{label}</div>
  </>
);

const TitleBlock: React.FC<{ sheet: string; rev: string }> = ({ sheet, rev }) => (
  <div style={{ position: "absolute", right: 60, bottom: 128, width: 356, borderRadius: 6, border: "2px solid rgba(190,215,255,0.6)", background: "rgba(12,20,38,0.85)", overflow: "hidden" }}>
    <div style={{ display: "flex", borderBottom: "1.5px solid rgba(190,215,255,0.4)" }}>
      <div style={{ flex: 1, padding: "8px 12px", borderRight: "1.5px solid rgba(190,215,255,0.4)" }}>
        <div style={{ fontFamily: mono, fontSize: 13, color: "#7C90B4", letterSpacing: "0.1em" }}>DRAWN BY</div>
        <div style={{ fontFamily: mono, fontWeight: 700, fontSize: 18, color: "#DCE7FA" }}>@nocodealex</div>
      </div>
      <div style={{ width: 118, padding: "8px 12px" }}>
        <div style={{ fontFamily: mono, fontSize: 13, color: "#7C90B4", letterSpacing: "0.1em" }}>SHEET</div>
        <div style={{ fontFamily: mono, fontWeight: 700, fontSize: 18, color: "#DCE7FA" }}>{sheet}</div>
      </div>
    </div>
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1, padding: "8px 12px", borderRight: "1.5px solid rgba(190,215,255,0.4)" }}>
        <div style={{ fontFamily: mono, fontSize: 13, color: "#7C90B4", letterSpacing: "0.1em" }}>SYSTEM</div>
        <div style={{ fontFamily: mono, fontWeight: 700, fontSize: 18, color: "#DCE7FA" }}>CALLBACK Nº052</div>
      </div>
      <div style={{ width: 118, padding: "8px 12px" }}>
        <div style={{ fontFamily: mono, fontSize: 13, color: "#7C90B4", letterSpacing: "0.1em" }}>REV</div>
        <div style={{ fontFamily: mono, fontWeight: 700, fontSize: 18, color: GOLD }}>{rev}</div>
      </div>
    </div>
  </div>
);

export const CarC6Cover: React.FC = () => (
  <AbsoluteFill>
    <BlueprintBg />
    <div style={{ position: "absolute", top: 84, left: 90, fontFamily: mono, fontWeight: 700, fontSize: 27, letterSpacing: "0.26em", color: "#BFD2F2" }}>
      SYSTEM BLUEPRINT {"·"} {"№"} 052
    </div>
    <div style={{ position: "absolute", top: 76, right: 90, padding: "10px 24px", borderRadius: 12, background: grad(GOLD, "#C89232"), fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 30, color: "#2E2108", transform: "rotate(3deg)", boxShadow: "0 14px 30px -10px rgba(140,100,20,0.7)" }}>96% MATCH</div>
    <div style={{ position: "absolute", top: 152, left: 90, right: 90, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 100, lineHeight: 1.03, color: "#F2F0E8", letterSpacing: "-0.02em" }}>
      The Callback <span style={{ fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", color: "#F3CE7E" }}>Machine.</span>
    </div>
    <Bloom x={520} y={600} r={280} c="rgba(217,119,87,0.20)" />
    <DimLine x={92} y={432} w={874} label="12 MIN" />
    <BpWire x1={252} y1={575} x2={420} y2={575} />
    <BpWire x1={660} y1={575} x2={766} y2={480} />
    <BpWire x1={660} y1={575} x2={766} y2={608} gold />
    <BpWire x1={660} y1={575} x2={766} y2={736} />
    <BpWire x1={866} y1={786} x2={716} y2={926} gold />
    <BpNode x={92} y={502} w={160} h={146} title="INPUT">
      <div style={{ position: "absolute", left: 44, top: 30, width: 72, height: 90, borderRadius: 8, border: "3px solid rgba(220,235,255,0.85)", background: "rgba(16,26,48,0.5)" }}>
        {[0, 1, 2].map((i) => <div key={i} style={{ position: "absolute", left: 10, top: 14 + i * 20, width: 44 * (i === 1 ? 0.7 : 1), height: 7, borderRadius: 4, background: "rgba(220,235,255,0.8)" }} />)}
      </div>
    </BpNode>
    <div style={{ position: "absolute", left: 420, top: 462, width: 240, height: 226, borderRadius: "50%", border: "3px solid rgba(220,235,255,0.85)", background: "radial-gradient(circle, rgba(217,119,87,0.3), rgba(16,26,48,0.75) 72%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <ClaudeLogo size={150} />
    </div>
    {[{ y: 432, t: "SCAN", n: "1" }, { y: 560, t: "REWRITE", n: "2", g: true }, { y: 688, t: "SCORE", n: "3" }].map((m, i) => (
      <React.Fragment key={i}>
        <BpNode x={766} y={m.y} w={200} h={96} title={m.t} gold={m.g}>
          <div style={{ position: "absolute", left: 18, top: 34, right: 60, height: 9, borderRadius: 5, background: m.g ? "rgba(231,178,76,0.75)" : "rgba(220,235,255,0.5)" }} />
          <div style={{ position: "absolute", left: 18, top: 54, right: 96, height: 9, borderRadius: 5, background: m.g ? "rgba(231,178,76,0.5)" : "rgba(220,235,255,0.3)" }} />
        </BpNode>
        <Callout x={932} y={m.y + 30} n={m.n} />
      </React.Fragment>
    ))}
    <BpNode x={300} y={860} w={416} h={126} title="OUTPUT" gold>
      <div style={{ position: "absolute", left: 26, top: 30, display: "flex", alignItems: "center", gap: 18 }}>
        <div style={{ padding: "10px 22px", borderRadius: 12, background: grad(CLAY, "#B85A38"), fontFamily: mono, fontWeight: 800, fontSize: 27, color: "#FFF6EE" }}>CALLBACK.md</div>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 40, color: "#F3CE7E" }}>96%</div>
      </div>
    </BpNode>
    {/* detail circle */}
    <div style={{ position: "absolute", left: 88, top: 672, width: 186, height: 186, borderRadius: "50%", border: "2.5px dashed rgba(190,215,255,0.6)" }}>
      <div style={{ position: "absolute", left: 36, top: 56, fontFamily: mono, fontWeight: 700, fontSize: 15, color: "#BFD2F2", lineHeight: 1.7 }}>
        <div>{"·"} 6 keywords</div>
        <div>{"·"} 3 passes</div>
        <div>{"·"} 0 code</div>
      </div>
      <div style={{ position: "absolute", right: -8, top: -8, width: 32, height: 32, borderRadius: "50%", background: "#14203A", border: `2px solid ${GOLD}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: mono, fontWeight: 800, fontSize: 17, color: GOLD }}>A</div>
    </div>
    {/* legend / parts list fills the lower-left sheet */}
    <div style={{ position: "absolute", left: 90, top: 1014, width: 430, borderRadius: 6, border: "2px solid rgba(190,215,255,0.55)", background: "rgba(12,20,38,0.72)", overflow: "hidden" }}>
      <div style={{ padding: "7px 14px", borderBottom: "1.5px solid rgba(190,215,255,0.4)", fontFamily: mono, fontWeight: 700, fontSize: 16, letterSpacing: "0.16em", color: "#9FC0F0" }}>LEGEND</div>
      {[
        { n: "1", t: "scan  ·  reads the ranking rules" },
        { n: "2", t: "rewrite  ·  the gated module" },
        { n: "3", t: "score  ·  re-runs until 90+" },
      ].map((r, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 14px", borderBottom: i < 2 ? "1px solid rgba(190,215,255,0.16)" : "none" }}>
          <div style={{ width: 24, height: 24, borderRadius: "50%", border: `2px solid ${i === 1 ? GOLD : "rgba(190,215,255,0.7)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: mono, fontWeight: 800, fontSize: 14, color: i === 1 ? GOLD : "#BFD2F2" }}>{r.n}</div>
          <div style={{ fontFamily: mono, fontSize: 17, color: i === 1 ? "#F3CE7E" : "#BFD2F2" }}>{r.t}</div>
        </div>
      ))}
    </div>
    <ContactShadow x={866} y={1160} w={190} o={0.4} />
    <div style={{ position: "absolute", right: 108, top: 950 }}><Mascot size={214} constr={1} gaze={-5} /></div>
    <div style={{ position: "absolute", bottom: 96, left: 90, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 29, color: "#DCE7FA", letterSpacing: "0.03em" }}>
      Swipe to zoom each module {"→"}
    </div>
    <Handle y={1284} dark />
  </AbsoluteFill>
);

export const CarC6Detail: React.FC = () => (
  <AbsoluteFill>
    <BlueprintBg />
    <div style={{ position: "absolute", top: 84, left: 90, fontFamily: mono, fontWeight: 700, fontSize: 27, letterSpacing: "0.26em", color: "#BFD2F2" }}>
      SHEET 3 / 6 {"·"} MODULE DETAIL
    </div>
    <div style={{ position: "absolute", top: 150, left: 90, right: 90, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 86, lineHeight: 1.04, color: "#F2F0E8", letterSpacing: "-0.02em" }}>
      The rewrite <span style={{ fontFamily: frauncesItalic.fontFamily, fontStyle: "italic", color: "#F3CE7E" }}>engine.</span>
    </div>
    <Bloom x={520} y={620} r={330} c="rgba(231,178,76,0.14)" />
    <DimLine x={132} y={330} w={816} label="MODULE 02" />
    <div style={{ position: "absolute", left: 130, right: 130, top: 372, height: 596, borderRadius: 20, border: `3.5px solid ${GOLD}`, background: "rgba(16,26,48,0.75)", boxShadow: "0 30px 60px -20px rgba(0,0,0,0.75)" }}>
      <div style={{ position: "absolute", top: -20, left: 30, padding: "5px 16px", borderRadius: 7, background: GOLD, fontFamily: mono, fontWeight: 800, fontSize: 22, letterSpacing: "0.12em", color: "#2E2108" }}>MODULE 02 {"·"} REWRITE</div>
      {[
        { t: "reads the bot's ranking rules", locked: false },
        { t: "injects the 6 keywords, naturally", locked: false },
        { t: "", locked: true },
        { t: "", locked: true },
      ].map((r, i) => (
        <div key={i} style={{ position: "absolute", left: 44, right: 44, top: 62 + i * 106, height: 82, borderRadius: 13, background: grad("#243254", "#1A2540"), border: "2px solid rgba(150,175,225,0.32)", display: "flex", alignItems: "center", paddingLeft: 24, gap: 18 }}>
          <div style={{ width: 42, height: 42, borderRadius: 10, background: r.locked ? grad("#4A3A14", "#33280D") : grad("#2A6B4E", GREEN), border: `2.5px solid ${r.locked ? GOLD : GREEN}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {r.locked ? <Padlock size={24} /> : <span style={{ color: "#EAFBF2", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 24 }}>{"✓"}</span>}
          </div>
          {r.locked ? (
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 290, height: 24, borderRadius: 7, background: "#2E4468" }} />
              <div style={{ width: 124, height: 24, borderRadius: 7, background: "#2E4468" }} />
            </div>
          ) : (
            <div style={{ fontFamily: mono, fontWeight: 700, fontSize: 27, color: "#DCE4F4" }}>{r.t}</div>
          )}
          <div style={{ marginLeft: "auto", marginRight: 18, fontFamily: mono, fontSize: 17, color: "#5E739A" }}>0{i + 1}</div>
        </div>
      ))}
      <div style={{ position: "absolute", left: 44, bottom: 34, display: "flex", alignItems: "center", gap: 12, padding: "12px 24px", borderRadius: 11, background: "rgba(231,178,76,0.15)", border: `2.5px solid ${GOLD}` }}>
        <Padlock size={24} />
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 25, color: "#F3CE7E", letterSpacing: "0.05em" }}>FULL SPEC {"·"} COMMENT {"“"}CALLBACK{"”"}</div>
      </div>
    </div>
    <Callout x={962} y={430} n="2" />
    <ContactShadow x={196} y={1176} w={180} o={0.4} />
    <div style={{ position: "absolute", left: 100, top: 994 }}><Mascot size={192} constr={1} cheer={0.4} /></div>
    <TitleBlock sheet="3 / 6" rev="B" />
    <Handle y={1284} dark />
  </AbsoluteFill>
);

// ============================================================================
// REVIEW PLATES — design (1080x1350) + a label bar so concepts are identifiable
// ============================================================================
export const plate = (Comp: React.FC, concept: string, name: string, slide: string, tint: string): React.FC => () => (
  <AbsoluteFill style={{ background: "#0B0D12" }}>
    <div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1350, overflow: "hidden" }}>
      <Comp />
    </div>
    <div style={{ position: "absolute", left: 0, top: 1350, width: 1080, height: 120, background: "#0B0D12", display: "flex", alignItems: "center", paddingLeft: 34, gap: 20 }}>
      <div style={{ padding: "10px 20px", borderRadius: 10, background: tint, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 30, color: "#0B0D12", letterSpacing: "0.06em" }}>{concept}</div>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 42, color: "#F2F0E8", letterSpacing: "0.01em" }}>{name}</div>
      <div style={{ marginLeft: "auto", marginRight: 36, fontFamily: mono, fontWeight: 700, fontSize: 27, color: "#7C90B4", letterSpacing: "0.1em" }}>{slide}</div>
    </div>
  </AbsoluteFill>
);

export const PlateC1Cover = plate(CarC1Cover, "CONCEPT 1", "TERMINAL BRIEF", "SLIDE 1 · COVER", "#D2724E");
export const PlateC1Step = plate(CarC1Step, "CONCEPT 1", "TERMINAL BRIEF", "SLIDE 3 · STEP", "#D2724E");
export const PlateC1Cta = plate(CarC1CtaPill, "CONCEPT 1", "TERMINAL BRIEF", "SLIDE 8 · CTA", "#D2724E");
export const PlateC2Cover = plate(CarC2Cover, "CONCEPT 2", "CLAUDE COMICS", "SLIDE 1 · COVER", "#E7B24C");
export const PlateC2Beat = plate(CarC2Beat, "CONCEPT 2", "CLAUDE COMICS", "SLIDE 4 · BEAT", "#E7B24C");
export const PlateC3Cover = plate(CarC3Cover, "CONCEPT 3", "FIELD NOTES", "SLIDE 1 · COVER", "#3F9E74");
export const PlateC3Step = plate(CarC3Step, "CONCEPT 3", "FIELD NOTES", "SLIDE 3 · STEP", "#3F9E74");
export const PlateC4Cover = plate(CarC4Cover, "CONCEPT 4", "RECEIPTS", "SLIDE 1 · COVER", "#5C7CA8");
export const PlateC4Receipt = plate(CarC4Receipt, "CONCEPT 4", "RECEIPTS", "SLIDE 2 · RECEIPT", "#5C7CA8");
export const PlateC5Cover = plate(CarC5Cover, "CONCEPT 5", "CREW CARDS", "SLIDE 1 · COVER", "#C9B4FF");
export const PlateC5Card = plate(CarC5Card, "CONCEPT 5", "CREW CARDS", "SLIDE 2 · CARD", "#C9B4FF");
export const PlateC6Cover = plate(CarC6Cover, "CONCEPT 6", "BLUEPRINT", "SLIDE 1 · COVER", "#9FC0F0");
export const PlateC6Detail = plate(CarC6Detail, "CONCEPT 6", "BLUEPRINT", "SLIDE 3 · DETAIL", "#9FC0F0");
