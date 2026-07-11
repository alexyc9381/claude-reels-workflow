import React from "react";
import { AbsoluteFill } from "remotion";

const SANS = "Helvetica Neue, Helvetica, Arial, sans-serif";
const NAVY = "#0A2540", SLATET = "#425466", INDIGO = "#635BFF";

// Faithful recreation of the stripe.com hero (for use as a real-site screenshot in the SEO reel)
export const StripeHero: React.FC = () => (
  <AbsoluteFill style={{ background: "#fff", fontFamily: SANS, overflow: "hidden" }}>
    {/* flowing mesh gradient (right side) */}
    <div style={{ position: "absolute", right: -260, top: -320, width: 1280, height: 1500, transform: "rotate(18deg)", filter: "blur(30px)", opacity: 0.95, background: "conic-gradient(from 150deg at 64% 46%, #5B9BFF 0deg, #635BFF 55deg, #C44AE0 110deg, #FF5A8A 165deg, #FF8A3D 220deg, #FFC24B 270deg, #FF7A59 320deg, #5B9BFF 360deg)" }} />
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, #fff 26%, rgba(255,255,255,0.0) 72%)" }} />
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, #fff 0%, rgba(255,255,255,0) 18%)" }} />

    {/* nav */}
    <div style={{ position: "absolute", top: 26, left: 24, right: 24, display: "flex", alignItems: "center", gap: 30 }}>
      <span style={{ fontWeight: 800, fontSize: 30, fontStyle: "italic", color: NAVY, letterSpacing: "-0.05em" }}>stripe</span>
      {["Products", "Solutions", "Developers", "Resources", "Pricing"].map((x, i) => (<span key={i} style={{ fontWeight: 600, fontSize: 18, color: NAVY }}>{x}{i < 4 ? " ▾" : ""}</span>))}
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 14 }}>
        <span style={{ background: "rgba(255,255,255,0.85)", borderRadius: 999, padding: "9px 18px", fontWeight: 600, fontSize: 18, color: NAVY }}>Sign in</span>
        <span style={{ background: NAVY, color: "#fff", borderRadius: 999, padding: "9px 18px", fontWeight: 600, fontSize: 18 }}>Contact sales ›</span>
      </div>
    </div>

    {/* hero copy */}
    <div style={{ position: "absolute", left: 120, top: 184, maxWidth: 960 }}>
      <div style={{ fontSize: 18, fontWeight: 500, color: SLATET, marginBottom: 30 }}>Global GDP running on Stripe: <span style={{ color: INDIGO }}>1.67104214%</span></div>
      <div style={{ fontSize: 74, fontWeight: 700, lineHeight: 1.06, letterSpacing: "-0.025em" }}>
        <span style={{ color: NAVY }}>Financial infrastructure to grow your revenue. </span>
        <span style={{ background: "linear-gradient(90deg, #0A2540 10%, #8E7FE8 55%, #E08AC0 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>Accept payments, offer financial services, and implement custom revenue models—from your first transaction to your billionth.</span>
      </div>
      <div style={{ display: "flex", gap: 16, marginTop: 42 }}>
        <span style={{ background: INDIGO, color: "#fff", borderRadius: 999, padding: "15px 28px", fontWeight: 600, fontSize: 21 }}>Get started ›</span>
        <span style={{ background: "#fff", color: NAVY, borderRadius: 999, padding: "15px 26px", fontWeight: 600, fontSize: 21, boxShadow: "0 2px 8px rgba(10,37,64,0.12)", display: "flex", alignItems: "center", gap: 11 }}>
          <span style={{ fontWeight: 800 }}><span style={{ color: "#4285F4" }}>G</span><span style={{ color: "#EA4335" }}>o</span><span style={{ color: "#FBBC05" }}>o</span><span style={{ color: "#4285F4" }}>g</span><span style={{ color: "#34A853" }}>l</span><span style={{ color: "#EA4335" }}>e</span></span> Sign up with Google</span>
      </div>
    </div>

    {/* customer logos bar */}
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 126, borderTop: "1px solid #EAECF0", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 60px", background: "#fff" }}>
      <span style={{ fontStyle: "italic", fontWeight: 800, fontSize: 30, color: "#1A3B8B", border: "2.5px solid #1A3B8B", borderRadius: "50%", padding: "4px 18px" }}>Ford</span>
      <span style={{ fontWeight: 700, fontSize: 30, color: "#0052FF" }}>● coinbase</span>
      <span style={{ fontWeight: 700, fontSize: 32 }}><span style={{ color: "#4285F4" }}>G</span><span style={{ color: "#EA4335" }}>o</span><span style={{ color: "#FBBC05" }}>o</span><span style={{ color: "#4285F4" }}>g</span><span style={{ color: "#34A853" }}>l</span><span style={{ color: "#EA4335" }}>e</span></span>
      <span style={{ fontWeight: 700, fontSize: 28, color: "#5E8E3E" }}>▢ shopify</span>
      <span style={{ fontWeight: 600, fontSize: 28, color: NAVY }}>mindbody</span>
      <span style={{ fontWeight: 800, fontSize: 28, color: "#0090DA" }}>MetLife</span>
      <span style={{ fontWeight: 700, fontSize: 30, color: NAVY }}>ramp ◣</span>
    </div>
  </AbsoluteFill>
);
