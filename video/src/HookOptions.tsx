import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { fraunces, inter } from "./fonts";

const CREAM = "#ECE9E2", INK = "#1A1813", CLAY = "#D2724E", BLUE = "#3E6CF0", GREEN = "#3F9E74", RED = "#C44A3A", MUTE = "#9A968B";
const CLAUDE_PATH = "m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z";
const grad = (a: string, b: string) => `linear-gradient(158deg, ${a} 0%, ${b} 100%)`;
const SH = "inset 0 1.5px 0 rgba(255,255,255,0.5), 0 2px 4px rgba(34,30,24,0.18), 0 16px 34px rgba(34,30,24,0.20), 0 44px 80px rgba(20,26,45,0.26)";
const Sheen: React.FC<{ r: number | string }> = ({ r }) => (<div style={{ position: "absolute", inset: 0, borderRadius: r, background: "linear-gradient(125deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 34%)", pointerEvents: "none" }} />);
const Bg: React.FC = () => (<AbsoluteFill style={{ background: "radial-gradient(120% 90% at 50% 8%, #F3F1EB 0%, #ECE9E2 46%, #E4E0D6 100%)" }}><div style={{ position: "absolute", inset: -40, opacity: 0.5, backgroundImage: "linear-gradient(rgba(58,92,132,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(58,92,132,0.05) 1px, transparent 1px)", backgroundSize: "62px 62px" }} /></AbsoluteFill>);
const Bloom: React.FC<{ cx: number; cy: number; w: number; c: string }> = ({ cx, cy, w, c }) => (<div style={{ position: "absolute", left: cx - w / 2, top: cy - w / 2, width: w, height: w, borderRadius: "50%", background: `radial-gradient(circle at 50% 46%, ${c} 0%, transparent 62%)` }} />);
const ClaudeIcon: React.FC<{ size: number }> = ({ size }) => (<div style={{ width: size, height: size, borderRadius: size * 0.28, background: grad("#E08A66", "#C5603C"), boxShadow: `${SH}, 0 0 ${size * 0.3}px rgba(210,114,78,0.4)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, position: "relative" }}><svg viewBox="0 0 24 24" width={size * 0.6} height={size * 0.6}><path fill="#F6EFE6" d={CLAUDE_PATH} /></svg><Sheen r={size * 0.28} /></div>);
const ZIcon: React.FC<{ size: number }> = ({ size }) => (<div style={{ width: size, height: size, borderRadius: size * 0.26, overflow: "hidden", boxShadow: `${SH}, 0 0 ${size * 0.3}px rgba(62,108,240,0.4)`, flexShrink: 0 }}><Img src={staticFile("refs/zai_logo.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>);

// ===== A — the $200 charge (push notification) =====
export const HookCharge: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}><Bg />
    <Bloom cx={540} cy={640} w={1000} c="rgba(196,74,58,0.16)" />
    <div style={{ position: "absolute", top: 470, left: 70, right: 70 }}>
      <div style={{ position: "relative", borderRadius: 36, background: "rgba(252,250,246,0.96)", boxShadow: SH, padding: "34px 38px", display: "flex", gap: 26, alignItems: "flex-start" }}>
        <ClaudeIcon size={104} />
        <div style={{ flex: 1, paddingTop: 2 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontWeight: 800, fontSize: 28, color: INK, letterSpacing: "0.02em" }}>ANTHROPIC</span><span style={{ fontWeight: 600, fontSize: 26, color: MUTE }}>now</span></div>
          <div style={{ fontWeight: 800, fontSize: 38, color: INK, marginTop: 10 }}>Payment confirmed</div>
          <div style={{ fontWeight: 500, fontSize: 33, color: "#4b463d", marginTop: 8, lineHeight: 1.32 }}>You were charged <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 46, color: RED }}>$200.00</span> for Claude Code.</div>
        </div>
        <Sheen r={36} />
      </div>
    </div>
    <div style={{ position: "absolute", top: 800, left: 0, right: 0, textAlign: "center" }}>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 96, color: INK, lineHeight: 1.0 }}>Stop <span style={{ color: CLAY }}>overpaying.</span></div>
    </div>
  </AbsoluteFill>);

// ===== B — cancel the $200 subscription =====
export const HookSub: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}><Bg />
    <Bloom cx={540} cy={760} w={1040} c="rgba(196,74,58,0.14)" />
    <div style={{ position: "absolute", top: 286, left: 0, right: 0, textAlign: "center" }}><div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 62, color: INK, lineHeight: 1.04 }}>Stop overpaying for<br /><span style={{ color: CLAY }}>Claude Code</span></div></div>
    <div style={{ position: "absolute", top: 540, left: 110, right: 110, borderRadius: 34, background: "#FCFAF6", boxShadow: SH, overflow: "hidden", position: "absolute" }}>
      <div style={{ padding: "26px 34px", borderBottom: "1px solid rgba(0,0,0,0.07)", fontWeight: 700, fontSize: 30, color: MUTE }}>Subscriptions</div>
      <div style={{ padding: "30px 34px", display: "flex", alignItems: "center", gap: 22 }}>
        <ClaudeIcon size={86} />
        <div style={{ flex: 1 }}><div style={{ fontWeight: 800, fontSize: 36, color: INK }}>Claude Code</div><div style={{ fontWeight: 500, fontSize: 26, color: MUTE, marginTop: 4 }}>Renews monthly</div></div>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 50, color: RED }}>$200<span style={{ fontSize: 26, color: MUTE, fontFamily: inter.fontFamily }}>/mo</span></div>
      </div>
      <div style={{ margin: "6px 34px 34px", borderRadius: 16, background: RED, color: "#fff", fontWeight: 800, fontSize: 34, textAlign: "center", padding: "22px 0", position: "relative" }}>Cancel Subscription
        <div style={{ position: "absolute", right: 150, top: 64, width: 40, height: 40 }}><svg width={40} height={40} viewBox="0 0 24 24"><path d="M5 3 L5 19 L9.5 14.8 L12.5 21 L15 20 L12 14 L18 13.5 Z" fill="#fff" stroke="#222" strokeWidth={1.3} strokeLinejoin="round" /></svg></div>
      </div>
      <Sheen r={34} />
    </div>
  </AbsoluteFill>);

// ===== C — price-tag markdown =====
export const HookTag: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}><Bg />
    <Bloom cx={620} cy={760} w={980} c="rgba(210,114,78,0.16)" />
    <div style={{ position: "absolute", top: 300, left: 80, right: 80, textAlign: "left" }}><div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 86, color: INK, lineHeight: 1.0 }}>Stop<br />overpaying for<br /><span style={{ color: CLAY }}>Claude Code</span></div></div>
    {/* swing tag */}
    <div style={{ position: "absolute", top: 720, left: 300, width: 480, height: 320, transform: "rotate(-5deg)" }}>
      {/* string */}
      <div style={{ position: "absolute", left: 60, top: -120, width: 4, height: 150, background: "#B7AE9C", transform: "rotate(18deg)", transformOrigin: "top" }} />
      <div style={{ position: "relative", width: 480, height: 320, borderRadius: 26, background: grad("#FBF8F1", "#EFE7D7"), boxShadow: SH }}>
        {/* punch hole */}
        <div style={{ position: "absolute", left: 50, top: 36, width: 38, height: 38, borderRadius: "50%", background: CREAM, boxShadow: "inset 0 2px 5px rgba(0,0,0,0.25)" }} />
        <div style={{ padding: "44px 44px 0 110px", display: "flex", alignItems: "center", gap: 14 }}><div style={{ width: 52, height: 52, borderRadius: 14, background: grad("#E08A66", "#C5603C"), display: "flex", alignItems: "center", justifyContent: "center" }}><svg viewBox="0 0 24 24" width={30} height={30}><path fill="#F6EFE6" d={CLAUDE_PATH} /></svg></div><span style={{ fontWeight: 800, fontSize: 30, color: INK }}>Claude Code</span></div>
        <div style={{ padding: "10px 0 0 110px", fontWeight: 600, fontSize: 24, color: MUTE }}>per month</div>
        <div style={{ padding: "6px 0 0 108px", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 120, color: INK, lineHeight: 1 }}>$200</div>
        <Sheen r={26} />
      </div>
    </div>
  </AbsoluteFill>);
