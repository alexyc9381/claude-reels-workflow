import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Img, staticFile } from "remotion";
import { fraunces, inter } from "./fonts";
import { Mascot } from "./ClaudeOsReel";

/* =========================================================================
   NO-CODE ALEX  ·  "Beginners vs Professionals" AI-tool carousel
   Restyle of the reputeforge post into the nocodealex house look:
   cream textured paper + Fraunces/Inter + clay pixel-critter Mascot sprites
   + highlighter titles + hand-drawn underlines + real brand logos.
   Rendered as STILLS: one slide per frame (durationInFrames = SLIDES.length).
   ========================================================================= */

const CREAM = "#ECE9E2";
const CREAM2 = "#E3DDD0";
const INK = "#1A1813";
const CLAY = "#D97757";     // the nocodealex signature accent (Claude clay)
const MUTE = "#8B8578";
const PAPER = "#F5F1E8";
const mono = "ui-monospace,'SF Mono',Menlo,monospace";

const seed = (n: number) => { const x = Math.sin(n * 127.1 + 43.7) * 43758.5453; return x - Math.floor(x); };

/* ----------------------------------------------------------------- LOGOS */
// Official single-path marks (Simple Icons, viewBox 0 0 24 24) + faithful
// hand-built marks for the brands Simple Icons has removed for trademark.
const P = {
  claude: "m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z",
  cursor: "M11.503.131 1.891 5.678a.84.84 0 0 0-.42.726v11.188c0 .3.162.575.42.724l9.609 5.55a1 1 0 0 0 .998 0l9.61-5.55a.84.84 0 0 0 .42-.724V6.404a.84.84 0 0 0-.42-.726L12.497.131a1.01 1.01 0 0 0-.996 0M2.657 6.338h18.55c.263 0 .43.287.297.515L12.23 22.918c-.062.107-.229.064-.229-.06V12.335a.59.59 0 0 0-.295-.51l-9.11-5.257c-.109-.063-.064-.23.061-.23",
  make: "M13.38 3.498c-.27 0-.511.19-.566.465L9.85 18.986a.578.578 0 0 0 .453.678l4.095.826a.58.58 0 0 0 .682-.455l2.963-15.021a.578.578 0 0 0-.453-.678l-4.096-.826a.589.589 0 0 0-.113-.012zm-5.876.098a.576.576 0 0 0-.516.318L.062 17.697a.575.575 0 0 0 .256.774l3.733 1.877a.578.578 0 0 0 .775-.258l6.926-13.781a.577.577 0 0 0-.256-.776L7.762 3.658a.571.571 0 0 0-.258-.062zm11.74.115a.576.576 0 0 0-.576.576v15.426c0 .318.258.578.576.578h4.178a.58.58 0 0 0 .578-.578V4.287a.578.578 0 0 0-.578-.576Z",
  shopify: "M15.337 23.979l7.216-1.561s-2.604-17.613-2.625-17.73c-.018-.116-.114-.192-.211-.192s-1.929-.136-1.929-.136-1.275-1.274-1.439-1.411c-.045-.037-.075-.057-.121-.074l-.914 21.104h.023zM11.71 11.305s-.81-.424-1.774-.424c-1.447 0-1.504.906-1.504 1.141 0 1.232 3.24 1.715 3.24 4.629 0 2.295-1.44 3.76-3.406 3.76-2.354 0-3.54-1.465-3.54-1.465l.646-2.086s1.245 1.066 2.28 1.066c.675 0 .975-.545.975-.932 0-1.619-2.654-1.694-2.654-4.359-.034-2.237 1.571-4.416 4.827-4.416 1.257 0 1.875.361 1.875.361l-.945 2.715-.02.01zM11.17.83c.136 0 .271.038.405.135-.984.465-2.064 1.639-2.508 3.992-.656.213-1.293.405-1.889.578C7.697 3.75 8.951.84 11.17.84V.83zm1.235 2.949v.135c-.754.232-1.583.484-2.394.736.466-1.777 1.333-2.645 2.085-2.971.193.501.309 1.176.309 2.1zm.539-2.234c.694.074 1.141.867 1.429 1.755-.349.114-.735.231-1.158.366v-.252c0-.752-.096-1.371-.271-1.871v.002zm2.992 1.289c-.02 0-.06.021-.078.021s-.289.075-.714.21c-.423-1.233-1.176-2.37-2.508-2.37h-.115C12.135.209 11.669 0 11.265 0 8.159 0 6.675 3.877 6.21 5.846c-1.194.365-2.063.636-2.16.674-.675.213-.694.232-.772.87-.075.462-1.83 14.063-1.83 14.063L15.009 24l.927-21.166z",
  replit: "M2 1.5A1.5 1.5 0 0 1 3.5 0h7A1.5 1.5 0 0 1 12 1.5V8H3.5A1.5 1.5 0 0 1 2 6.5ZM12 8h8.5A1.5 1.5 0 0 1 22 9.5v5a1.5 1.5 0 0 1-1.5 1.5H12ZM2 17.5A1.5 1.5 0 0 1 3.5 16H12v6.5a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 2 22.5Z",
  perplexity: "M22.3977 7.0896h-2.3106V.0676l-7.5094 6.3542V.1577h-1.1554v6.1966L4.4904 0v7.0896H1.6023v10.3976h2.8882V24l6.932-6.3591v6.2005h1.1554v-6.0469l6.9318 6.1807v-6.4879h2.8882V7.0896zm-3.4657-4.531v4.531h-5.355l5.355-4.531zm-13.2862.0676 4.8691 4.4634H5.6458V2.6262zM2.7576 16.332V8.245h7.8476l-6.1149 6.1147v1.9723H2.7576zm2.8882 5.0404v-3.8852h.0001v-2.6488l5.7763-5.7764v7.0111l-5.7764 5.2993zm12.7086.0248-5.7766-5.1509V9.0618l5.7766 5.7766v6.5588zm2.8882-5.0652h-1.733v-1.9723L13.3948 8.245h7.8478v8.087z",
  gemini: "M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81",
  openai: "M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z",
};

// Official brand logos sourced via API — svgl.app (vector) + gstatic faviconV2 (app-icons),
// stored in public/logos_official/. Rendered full-color inside a white badge on each bar.
const LOGO_EXT: Record<string, "svg" | "png"> = {
  openai: "svg", claude: "svg", cursor: "svg", lovable: "svg", gemini: "svg",
  perplexity: "svg", shopify: "svg", replit: "svg",
  make: "png", zapier: "png", capcut: "png", higgsfield: "png", invideo: "png", emergent: "png",
};
const Logo: React.FC<{ brand: string; size: number }> = ({ brand, size }) => (
  <Img
    src={staticFile(`logos_official/${brand}.${LOGO_EXT[brand] || "svg"}`)}
    style={{ width: size, height: size, objectFit: "contain", display: "block" }}
  />
);

/* --------------------------------------------------------- hand-drawn ink */
const Squiggle: React.FC<{ w: number; color?: string; sw?: number; v?: number }> = ({ w, color = INK, sw = 3, v = 0 }) => {
  const paths = [
    "M2 7 C 26 2, 52 11, 78 6 S 128 2, 158 7",
    "M2 6 C 30 10, 60 2, 92 8 S 140 10, 158 5",
    "M2 8 C 40 3, 70 12, 100 6 S 150 3, 158 8",
  ];
  return (
    <svg width={w} height={14} viewBox="0 0 160 14" preserveAspectRatio="none" style={{ display: "block", overflow: "visible" }}>
      <path d={paths[v % 3]} fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" />
    </svg>
  );
};

// underlined label ("Beginners" / "Professionals") with a hand squiggle
const Label: React.FC<{ text: string; color?: string; size?: number; v?: number }> = ({ text, color = INK, size = 40, v = 0 }) => (
  <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
    <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 600, fontSize: size, color, letterSpacing: "-0.01em" }}>{text}</div>
    <Squiggle w={text.length * size * 0.52} color={color} sw={size > 34 ? 3.2 : 2.4} v={v} />
  </div>
);

/* ----------------------------------------------------------- popsicle bar */
const Bar: React.FC<{ h: number; w: number; color: string; brand: string; logoColor?: string; name: string; nameV?: number; delayPose?: number }> = ({ h, w, color, brand, name, nameV = 0 }) => {
  const badge = Math.min(w * 0.68, 98);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* the bar: rounded-top pill sitting on the baseline */}
      <div style={{
        width: w, height: h,
        background: `linear-gradient(168deg, ${color} 0%, ${shade(color, -0.14)} 100%)`,
        borderRadius: `${w / 2}px ${w / 2}px 6px 6px`,
        boxShadow: `0 18px 34px -14px ${hexA(color, 0.55)}, inset 0 2px 0 rgba(255,255,255,0.22), inset 0 -18px 40px rgba(0,0,0,0.12)`,
        position: "relative", display: "flex", justifyContent: "center",
      }}>
        {/* white app-badge holding the official full-color logo (guarantees contrast on any bar) */}
        <div style={{
          position: "absolute", top: w * 0.17, width: badge, height: badge, borderRadius: badge * 0.28,
          background: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 10px 20px -8px rgba(0,0,0,0.38), inset 0 0 0 1px rgba(0,0,0,0.05)",
        }}>
          <Logo brand={brand} size={badge * 0.7} />
        </div>
        {/* soft top sheen */}
        <div style={{ position: "absolute", top: 6, left: w * 0.2, width: w * 0.34, height: w * 0.34, borderRadius: "50%", background: "rgba(255,255,255,0.16)", filter: "blur(2px)" }} />
      </div>
      {/* name + hand underline, below the baseline */}
      <div style={{ marginTop: 20, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 500, fontSize: 30, color: INK }}>{name}</div>
        <Squiggle w={name.length * 17 + 12} color={CLAY} sw={2.6} v={nameV} />
      </div>
    </div>
  );
};

/* --------------------------------------------------------------- helpers */
function hexToRgb(hex: string) { const h = hex.replace("#", ""); return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16) }; }
function hexA(hex: string, a: number) { const { r, g, b } = hexToRgb(hex); return `rgba(${r},${g},${b},${a})`; }
function shade(hex: string, amt: number) { const { r, g, b } = hexToRgb(hex); const f = (c: number) => Math.max(0, Math.min(255, Math.round(c + amt * 255))); return `rgb(${f(r)},${f(g)},${f(b)})`; }

/* ----------------------------------------------------------- background */
const Bg: React.FC = () => (
  <AbsoluteFill style={{ background: `linear-gradient(158deg, #EFEBE3 0%, ${CREAM2} 100%)` }}>
    <div style={{ position: "absolute", left: -140, top: 220, width: 620, height: 620, borderRadius: "50%", background: "radial-gradient(circle, rgba(217,119,87,0.14), transparent 62%)", filter: "blur(12px)" }} />
    <div style={{ position: "absolute", right: -180, bottom: 120, width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(58,92,132,0.12), transparent 62%)", filter: "blur(14px)" }} />
    <div style={{ position: "absolute", left: -40, top: -40, width: 640, height: 640, background: "radial-gradient(circle at 30% 30%, rgba(255,248,235,0.55), transparent 60%)" }} />
    {/* paper speckle */}
    {Array.from({ length: 26 }, (_, i) => (
      <div key={i} style={{ position: "absolute", left: seed(i * 2.3) * 1080, top: seed(i * 1.7) * 1350, width: 2 + seed(i) * 3, height: 2 + seed(i) * 3, borderRadius: "50%", background: i % 2 ? "rgba(120,110,95,0.10)" : "rgba(255,255,255,0.5)" }} />
    ))}
    <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 260px rgba(60,50,38,0.16)" }} />
  </AbsoluteFill>
);

/* --------------------------------------------------------------- chrome */
const ProgressRail: React.FC<{ i: number; n: number }> = ({ i, n }) => (
  <div style={{ position: "absolute", top: 54, left: 60, right: 60, display: "flex", gap: 8, alignItems: "center" }}>
    {Array.from({ length: n }, (_, k) => (
      <div key={k} style={{ flex: 1, height: 7, borderRadius: 4, background: k <= i ? CLAY : "rgba(26,24,19,0.14)", boxShadow: k === i ? `0 0 0 3px ${hexA(CLAY, 0.18)}` : undefined }} />
    ))}
  </div>
);

const CountChip: React.FC<{ i: number; n: number }> = ({ i, n }) => (
  <div style={{ position: "absolute", top: 78, right: 56, padding: "8px 16px", borderRadius: 999, background: INK, color: PAPER, fontFamily: mono, fontSize: 24, fontWeight: 700, letterSpacing: 1, boxShadow: "0 10px 24px -8px rgba(0,0,0,0.5)" }}>
    {i + 1}/{n}
  </div>
);

const Handle: React.FC = () => (
  <div style={{ position: "absolute", bottom: 46, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "center", opacity: 0.85 }}>
    <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 28, color: INK, letterSpacing: "-0.01em" }}>@nocodealex</div>
  </div>
);

// bottom-right "keep swiping" cue: label + trailing chevrons building into a clay arrow button
const SwipeCue: React.FC = () => (
  <div style={{ position: "absolute", bottom: 40, right: 44, display: "flex", alignItems: "center", gap: 7 }}>
    <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 19, letterSpacing: 2, color: MUTE, textTransform: "uppercase", marginRight: 3 }}>swipe</span>
    {[0.22, 0.45].map((o, k) => (
      <svg key={k} width={13} height={22} viewBox="0 0 13 22"><path d="M3 3l7 8-7 8" stroke={CLAY} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" fill="none" opacity={o} /></svg>
    ))}
    <div style={{ width: 62, height: 62, borderRadius: "50%", background: CLAY, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 12px 24px -6px ${hexA(CLAY, 0.6)}`, position: "relative" }}>
      <div style={{ position: "absolute", inset: -7, borderRadius: "50%", border: `2px solid ${hexA(CLAY, 0.28)}` }} />
      <svg width={30} height={24} viewBox="0 0 30 24"><path d="M4 12h19M16 4l8 8-8 8" stroke="#fff" strokeWidth={3.4} strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
    </div>
  </div>
);

// topic doodle icons (hand-drawn, ink stroke)
const Doodle: React.FC<{ kind: string; size?: number }> = ({ kind, size = 76 }) => {
  const s: React.SVGProps<SVGSVGElement> = { width: size, height: size, viewBox: "0 0 48 48", fill: "none", stroke: INK, strokeWidth: 2.4 as any, strokeLinecap: "round" as any, strokeLinejoin: "round" as any };
  switch (kind) {
    case "pen": return <svg {...s}><rect x={10} y={8} width={22} height={28} rx={2} /><path d="M34 10l5 5-16 16-6 1 1-6z" fill={PAPER} /><path d="M31 13l3 3" /></svg>;
    case "code": return <svg {...s}><path d="M17 16l-8 8 8 8" /><path d="M31 16l8 8-8 8" /><path d="M27 12l-6 24" /></svg>;
    case "video": return <svg {...s}><rect x={8} y={16} width={24} height={18} rx={2} /><path d="M32 22l8-4v14l-8-4z" /><path d="M10 12l6 4M18 12l5 4M26 12l5 4" /></svg>;
    case "gear": return <svg {...s}><circle cx={24} cy={24} r={8.5} /><circle cx={24} cy={24} r={3.4} fill={PAPER} /><path d="M24 9.5v4M24 34.5v4M9.5 24h4M34.5 24h4M14 14l2.8 2.8M31.2 31.2l2.8 2.8M34 14l-2.8 2.8M16.8 31.2 14 34" /></svg>;
    case "web": return <svg {...s}><circle cx={24} cy={24} r={16} /><path d="M8 24h32M24 8c5 5 5 27 0 32M24 8c-5 5-5 27 0 32" /></svg>;
    case "search": return <svg {...s}><circle cx={21} cy={21} r={12} /><path d="M30 30l8 8" /><path d="M21 15v12M15 21h12" /></svg>;
    case "atom": return <svg {...s}><circle cx={24} cy={24} r={3.5} fill={INK} /><ellipse cx={24} cy={24} rx={16} ry={7} /><ellipse cx={24} cy={24} rx={16} ry={7} transform="rotate(60 24 24)" /><ellipse cx={24} cy={24} rx={16} ry={7} transform="rotate(120 24 24)" /></svg>;
    case "spark": return <svg {...s}><path d="M24 6l4 12 12 4-12 4-4 12-4-12-12-4 12-4z" /></svg>;
    default: return <svg {...s} />;
  }
};

/* --------------------------------------------------------------- SLIDES */
type BarT = { brand: string; name: string; color: string; logoColor?: string };
type TopicSlide = {
  type: "topic"; icon: string; pre: string; hi: string; hiColor: string;
  begin: BarT[]; pro: BarT[]; costume: Record<string, number>; heroPose: number;
};
type CoverSlide = { type: "cover" };
type StackSlide = { type: "stack"; bars: (BarT & { level: "b" | "p" })[] };
type CtaSlide = { type: "cta" };
type Slide = TopicSlide | CoverSlide | StackSlide | CtaSlide;

const C = {
  chatgpt: "#5E9E80", claude: CLAY, cursor: "#17171A", lovable: "#17171A", invideo: "#2F6BE0",
  capcut: "#101014", higgs: "#CDEB4E", make: "#6D48E6", zapier: "#E86B3A", shopify: "#7DB43F",
  replit: "#EA6A2E", emergent: "#141416", gemini: "#1B1C24", perplexity: "#21808D",
};

const CHATGPT = (): BarT => ({ brand: "openai", name: "ChatGPT", color: C.chatgpt });

const SLIDES: Slide[] = [
  { type: "topic", icon: "pen", pre: "For", hi: "Writing", hiColor: "#F4E24A",
    begin: [CHATGPT()], pro: [{ brand: "claude", name: "Claude", color: C.claude }],
    costume: { beret: 1 }, heroPose: 30 },
  { type: "topic", icon: "code", pre: "For", hi: "Coding", hiColor: "#A9D8EE",
    begin: [CHATGPT(), { brand: "lovable", name: "Lovable", color: C.lovable, logoColor: "grad" }],
    pro: [{ brand: "cursor", name: "Cursor", color: C.cursor }], costume: { glasses: 1 }, heroPose: 12 },
  { type: "topic", icon: "video", pre: "Video", hi: "Creation", hiColor: "#C7EB6A",
    begin: [{ brand: "invideo", name: "InVideo", color: C.invideo }, { brand: "capcut", name: "CapCut", color: C.capcut }],
    pro: [{ brand: "higgsfield", name: "Higgsfield", color: C.higgs, logoColor: "#17171A" }], costume: { shades: 1 }, heroPose: 44 },
  { type: "topic", icon: "gear", pre: "Task", hi: "Automation", hiColor: "#CBB8F2",
    begin: [{ brand: "make", name: "Make", color: C.make }],
    pro: [{ brand: "zapier", name: "Zapier", color: C.zapier }], costume: { hardHat: 1 }, heroPose: 20 },
  { type: "topic", icon: "web", pre: "Building", hi: "Websites", hiColor: "#F4E24A",
    begin: [{ brand: "shopify", name: "Shopify", color: C.shopify }, { brand: "replit", name: "Replit", color: C.replit }],
    pro: [{ brand: "emergent", name: "Emergent", color: C.emergent, logoColor: "#4FD1C5" }], costume: { capBack: 1 }, heroPose: 8 },
  { type: "topic", icon: "search", pre: "For", hi: "Research", hiColor: "#C7EB6A",
    begin: [{ brand: "gemini", name: "Gemini", color: C.gemini, logoColor: "grad" }, CHATGPT()],
    pro: [{ brand: "perplexity", name: "Perplexity", color: C.perplexity }], costume: { sherlock: 1 }, heroPose: 36 },
  { type: "stack", bars: [
    { brand: "openai", name: "ChatGPT", color: C.chatgpt, level: "b" },
    { brand: "claude", name: "Claude", color: C.claude, level: "p" },
    { brand: "cursor", name: "Cursor", color: C.cursor, level: "p" },
    { brand: "higgsfield", name: "Higgsfield", color: C.higgs, logoColor: "#17171A", level: "p" },
    { brand: "zapier", name: "Zapier", color: C.zapier, level: "p" },
    { brand: "perplexity", name: "Perplexity", color: C.perplexity, level: "p" },
  ] },
  { type: "cta" },
];
const N = SLIDES.length;

/* ------------------------------------------------------- title block */
const TitleBlock: React.FC<{ icon: string; pre: string; hi: string; hiColor: string }> = ({ icon, pre, hi, hiColor }) => (
  <div style={{ position: "absolute", top: 168, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
    <Doodle kind={icon} />
    <div style={{ display: "flex", alignItems: "baseline", gap: 20, fontFamily: fraunces.fontFamily, fontWeight: 600, fontSize: 78, color: INK, letterSpacing: "-0.02em" }}>
      <span>{pre}</span>
      <span style={{ position: "relative", padding: "0 8px" }}>
        <span style={{ position: "absolute", left: 0, right: 0, top: "38%", bottom: "6%", background: hiColor, borderRadius: 4, transform: "rotate(-1.2deg)", zIndex: 0, opacity: 0.9 }} />
        <span style={{ position: "relative", zIndex: 1 }}>{hi}</span>
      </span>
    </div>
  </div>
);

/* ------------------------------------------------------ topic slide */
const BASE_Y = 1112;            // baseline the bars stand on
const PRO_H = 512, BEGIN_H = 210, BAR_W = 150, BEGIN_W = 138;

const TopicSlideView: React.FC<{ s: TopicSlide; lf: number }> = ({ s, lf }) => {
  const beginGroupW = s.begin.length * BEGIN_W + (s.begin.length - 1) * 26;
  return (
    <>
      <TitleBlock icon={s.icon} pre={s.pre} hi={s.hi} hiColor={s.hiColor} />

      {/* baseline */}
      <div style={{ position: "absolute", left: 78, right: 78, top: BASE_Y, height: 4, background: INK, borderRadius: 2 }} />
      <svg style={{ position: "absolute", left: 60, top: BASE_Y - 3, width: 40, height: 16 }} viewBox="0 0 40 16"><path d="M2 8h36" stroke={INK} strokeWidth={3} strokeLinecap="round" /></svg>

      {/* BEGINNERS group (left) */}
      <div style={{ position: "absolute", left: 150, top: BASE_Y - BEGIN_H - 92, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        <Label text="Beginners" size={38} v={1} />
      </div>
      <div style={{ position: "absolute", left: 150, top: BASE_Y - BEGIN_H, display: "flex", alignItems: "flex-end", gap: 26 }}>
        {s.begin.map((b, i) => <Bar key={i} h={BEGIN_H} w={BEGIN_W} color={b.color} brand={b.brand} logoColor={b.logoColor} name={b.name} nameV={i} />)}
      </div>

      {/* PROFESSIONALS (right, tall) */}
      <div style={{ position: "absolute", right: 172, top: BASE_Y - PRO_H - 92, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
        <Label text="Professionals" size={40} v={2} color={INK} />
      </div>
      <div style={{ position: "absolute", right: 150, top: BASE_Y - PRO_H, display: "flex", alignItems: "flex-end" }}>
        {s.pro.map((b, i) => <Bar key={i} h={PRO_H} w={BAR_W} color={b.color} brand={b.brand} logoColor={b.logoColor} name={b.name} nameV={2} />)}
      </div>

      {/* the clay critter, costumed for the topic, cheering the pro pick.
          top offset 344 leaves a ~50px gap above the "Beginners" label (feet ~y760, label ~y810). */}
      <div style={{ position: "absolute", left: 150 + beginGroupW / 2 - 110, top: BASE_Y - BEGIN_H - 344 }}>
        <Mascot lf={s.heroPose} size={220} cheer={0.7} gaze={4} {...s.costume} />
      </div>
    </>
  );
};

/* ------------------------------------------------------ stack slide */
const StackSlideView: React.FC<{ s: StackSlide }> = ({ s }) => {
  const w = 128;
  const heights = s.bars.map((b) => (b.level === "p" ? 470 : 214));
  const baseY = 1120;
  return (
    <>
      <div style={{ position: "absolute", top: 172, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        <Doodle kind="atom" />
        <div style={{ display: "flex", alignItems: "baseline", gap: 18, fontFamily: fraunces.fontFamily, fontWeight: 600, fontSize: 66, color: INK, letterSpacing: "-0.02em" }}>
          <span>Business</span>
          <span style={{ position: "relative", padding: "0 8px" }}>
            <span style={{ position: "absolute", left: 0, right: 0, top: "40%", bottom: "6%", background: "#A9D8EE", borderRadius: 4, transform: "rotate(-1deg)", opacity: 0.9 }} />
            <span style={{ position: "relative" }}>AI Stack</span>
          </span>
        </div>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 600, fontSize: 27, color: MUTE, marginTop: 2 }}>the full pro loadout, one screenshot</div>
      </div>

      {/* labels — staggered in the empty band above the bars (beginner low-left, pros high-center).
          Beginner label is centered over the ChatGPT bar's exact x-span (78..206) so it can't clip the tall Claude bar. */}
      <div style={{ position: "absolute", left: 78, width: 128, top: baseY - 214 - 128, display: "flex", justifyContent: "center", zIndex: 5 }}><Label text="Beginner" size={29} v={1} color={MUTE} /></div>
      <div style={{ position: "absolute", left: 0, right: 0, top: baseY - 470 - 132, display: "flex", justifyContent: "center", paddingLeft: 150, zIndex: 5 }}><Label text="Professionals" size={40} v={2} /></div>

      <div style={{ position: "absolute", left: 62, right: 62, top: baseY, height: 4, background: INK, borderRadius: 2 }} />
      <div style={{ position: "absolute", left: 78, right: 78, top: baseY - 470, height: 470, display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        {s.bars.map((b, i) => (
          <Bar key={i} h={heights[i]} w={w} color={b.color} brand={b.brand} logoColor={b.logoColor} name={b.name} nameV={i} />
        ))}
      </div>
    </>
  );
};

/* ------------------------------------------------------ cover slide */
const CoverView: React.FC<{ lf: number }> = ({ lf }) => (
  <>
    <div style={{ position: "absolute", top: 150, left: 78, right: 78, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 27, letterSpacing: 4, textTransform: "uppercase", color: CLAY }}>The AI Skill Ladder</div>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 600, fontSize: 92, lineHeight: 1.02, color: INK, textAlign: "center", letterSpacing: "-0.03em", marginTop: 8 }}>
        The AI you use<br />
        <span style={{ position: "relative", padding: "0 10px" }}>
          <span style={{ position: "absolute", left: 0, right: 0, top: "36%", bottom: "8%", background: "#F4E24A", borderRadius: 6, transform: "rotate(-1.4deg)", opacity: 0.92 }} />
          <span style={{ position: "relative" }}>gives you away</span>
        </span>
      </div>
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 500, fontSize: 34, color: MUTE, textAlign: "center", marginTop: 22, maxWidth: 780 }}>
        Beginners reach for one tool. Pros reach for another. Here is the whole ladder, task by task.
      </div>
    </div>

    {/* two critters: a beginner (plain) looking up at a pro (glasses) on a taller block */}
    <div style={{ position: "absolute", left: 208, top: 792 }}>
      <Mascot lf={10} size={210} gaze={6} />
      <div style={{ position: "absolute", left: 12, top: 208, width: 176, height: 34, background: hexA(INK, 0.14), borderRadius: 8 }} />
      <div style={{ position: "absolute", left: 40, top: 250, fontFamily: fraunces.fontFamily, fontWeight: 600, fontSize: 30, color: MUTE }}>beginner</div>
    </div>
    <div style={{ position: "absolute", right: 176, top: 660 }}>
      <div style={{ position: "absolute", left: 24, top: 236, width: 196, height: 96, background: `linear-gradient(168deg, #33424F, #232E38)`, borderRadius: "16px 16px 6px 6px", boxShadow: "0 18px 34px -14px rgba(20,28,40,0.55)" }} />
      <div style={{ position: "relative", zIndex: 2 }}><Mascot lf={44} size={244} cheer={0.75} glasses={1} /></div>
      <div style={{ position: "absolute", left: 88, top: 262, zIndex: 3, fontFamily: fraunces.fontFamily, fontWeight: 700, fontSize: 32, color: "#F5F1E8" }}>pro</div>
    </div>

    <div style={{ position: "absolute", bottom: 118, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 30px", borderRadius: 999, background: INK, color: PAPER, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 30, boxShadow: "0 14px 30px -10px rgba(0,0,0,0.5)" }}>
        swipe the ladder <span style={{ fontSize: 34 }}>→</span>
      </div>
    </div>
  </>
);

/* ------------------------------------------------------ cta slide */
const CtaView: React.FC = () => (
  <>
    <div style={{ position: "absolute", top: 236, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <Mascot lf={26} size={320} wizard={1} cheer={0.4} gaze={2} />
    </div>
    <div style={{ position: "absolute", top: 628, left: 84, right: 84, display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 600, fontSize: 84, color: INK, textAlign: "center", letterSpacing: "-0.02em", lineHeight: 1.04 }}>
        Turn AI into<br />
        <span style={{ position: "relative", padding: "0 12px" }}>
          <span style={{ position: "absolute", left: 0, right: 0, top: "34%", bottom: "8%", background: "#C7EB6A", borderRadius: 6, transform: "rotate(-1.2deg)", opacity: 0.92 }} />
          <span style={{ position: "relative" }}>real income.</span>
        </span>
      </div>
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 500, fontSize: 33, color: MUTE, textAlign: "center", maxWidth: 830, marginTop: 8, lineHeight: 1.32 }}>
        Follow <span style={{ color: INK, fontWeight: 700 }}>@nocodealex</span> if you want to make real money with AI and grow your business. I post about exactly how.
      </div>
      <div style={{ display: "flex", gap: 16, marginTop: 28 }}>
        <div style={{ padding: "16px 28px", borderRadius: 16, background: INK, color: PAPER, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 29 }}>🔖 Save the stack</div>
        <div style={{ padding: "16px 30px", borderRadius: 16, background: CLAY, color: "#fff", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 29, boxShadow: `0 14px 30px -10px ${hexA(CLAY, 0.7)}` }}>+ Follow @nocodealex</div>
      </div>
    </div>
  </>
);

/* ------------------------------------------------------ composition */
export const NoCodeStackCarousel: React.FC = () => {
  const frame = useCurrentFrame();
  const i = Math.max(0, Math.min(N - 1, Math.floor(frame)));
  const s = SLIDES[i];
  const lf = interpolate(frame, [0, N], [0, 60]); // any nonzero pose seed
  return (
    <AbsoluteFill style={{ fontFamily: inter.fontFamily }}>
      <Bg />
      {s.type === "cover" && <CoverView lf={lf} />}
      {s.type === "topic" && <TopicSlideView s={s} lf={lf} />}
      {s.type === "stack" && <StackSlideView s={s} />}
      {s.type === "cta" && <CtaView />}
      <ProgressRail i={i} n={N} />
      <CountChip i={i} n={N} />
      {s.type !== "cover" && <Handle />}
      {s.type !== "cta" && <SwipeCue />}
    </AbsoluteFill>
  );
};

export const NOCODE_SLIDES = N;
