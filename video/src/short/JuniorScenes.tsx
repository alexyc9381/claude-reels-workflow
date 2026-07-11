import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT } from "../brand";
import { AnimatedNumber, CheckIcon, CrossIcon, LogoChip } from "../components/primitives";
import { MeshBG, ParticleField, ShineSweep, Spotlight, TowersLayer } from "../components/fx";

const BLUE = COLORS.logoBlue;
const NAVY = COLORS.navy;
const W: React.CSSProperties = { fontFamily: FONT.sans, color: "#fff" };

const useExit = (dur: number, len = 8) => {
  const f = useCurrentFrame();
  return interpolate(f, [dur - len, dur], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
};
// short graphics sit in the upper third, bottom edge ~840px (above his head)
const Zone: React.FC<{ children: React.ReactNode; pb?: number }> = ({ children, pb = 1080 }) => (
  <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: pb }}>{children}</AbsoluteFill>
);
const Card: React.FC<{ children: React.ReactNode; w?: number; accent?: string; pad?: number }> = ({ children, w = 760, accent = BLUE, pad = 30 }) => (
  <div style={{ width: w, position: "relative", overflow: "hidden", borderRadius: 28, padding: pad, background: `linear-gradient(160deg, ${NAVY}, ${COLORS.navyDeep})`, border: "1px solid rgba(255,255,255,0.12)", boxShadow: "0 26px 70px rgba(0,0,0,0.5)" }}>
    <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 7, background: accent }} />
    {children}
  </div>
);
const Sico: React.FC<{ d: string; color?: string; size?: number }> = ({ d, color = "#fff", size = 30 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
);
const P = {
  flag: "M4 21V4 M4 4h13l-2 4 2 4H4",
  users: "M9 11a3 3 0 100-6 3 3 0 000 6z M2 20c0-3.5 3-5 7-5s7 1.5 7 5 M17 11a3 3 0 100-6 M16 15c3 .5 5 2 5 5",
  doc: "M7 3h7l4 4v14H7z M14 3v4h4 M10 12h6 M10 16h6",
  bolt: "M13 2L4 14h6l-1 8 9-12h-6z",
  bldg: "M4 21V5l8-3 8 3v16 M9 9h2 M13 9h2 M9 13h2 M13 13h2 M9 17h2 M13 17h2",
  hand: "M8 13V5a2 2 0 014 0v6 M12 11V4a2 2 0 014 0v8 M16 11a2 2 0 014 0v4a6 6 0 01-6 6h-2a6 6 0 01-5-3l-3-5a2 2 0 013-2l3 3",
  send: "M2 21l21-9L2 3v7l15 2-15 2z",
  check: "M4 12l5 5L20 6",
};

// 1. HOOK — present from frame 0 (no animate-in)
export const JuniorHook: React.FC<{ dur: number }> = ({ dur }) => {
  const exit = useExit(dur);
  return (
    <Zone>
      <div style={{ opacity: exit, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 12, background: COLORS.crossRed, borderRadius: 16, padding: "10px 24px" }}>
          <Sico d={P.flag} color="#fff" size={32} />
          <span style={{ ...W, fontWeight: 900, fontSize: 38, letterSpacing: 1 }}>JUNIORS, READ THIS</span>
        </div>
        <Card w={760} accent={COLORS.crossRed}>
          <div style={{ ...W, fontWeight: 700, fontSize: 32, opacity: 0.85, marginBottom: 14 }}>Your application:</div>
          {["Debate Club", "Key Club", "Volunteering"].map((c) => (
            <div key={c} style={{ display: "flex", alignItems: "center", gap: 14, background: "rgba(255,255,255,0.06)", borderRadius: 12, padding: "12px 18px", marginBottom: 10 }}>
              <div style={{ width: 12, height: 12, borderRadius: 6, background: "rgba(255,255,255,0.4)" }} />
              <span style={{ ...W, fontWeight: 700, fontSize: 30 }}>{c}</span>
            </div>
          ))}
          <div style={{ ...W, fontWeight: 900, fontSize: 40, color: "#ff8a8a", textAlign: "center", marginTop: 12 }}>Only clubs? Stop scrolling.</div>
        </Card>
      </div>
    </Zone>
  );
};

// 2. EXPECTED — clubs + volunteering are baseline now
export const ExpectedStamp: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const exit = useExit(dur);
  const stamp = spring({ frame: frame - 16, fps: 30, config: { damping: 130, stiffness: 170, mass: 0.6 } });
  return (
    <Zone>
      <div style={{ opacity: exit, position: "relative" }}>
        <Card w={720} accent={BLUE}>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", marginBottom: 8 }}>
            {["Clubs", "Volunteering"].map((c) => (
              <div key={c} style={{ flex: 1, background: "rgba(255,255,255,0.08)", borderRadius: 16, padding: "22px 12px", textAlign: "center" }}>
                <span style={{ ...W, fontWeight: 800, fontSize: 34 }}>{c}</span>
              </div>
            ))}
          </div>
        </Card>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: `translate(-50%,-50%) rotate(-10deg) scale(${interpolate(stamp, [0, 1], [1.8, 1])})`, opacity: interpolate(stamp, [0, 1], [0, 1]), border: "6px solid #9aa3b1", color: "#cfd6df", fontFamily: FONT.sans, fontWeight: 900, fontSize: 52, letterSpacing: 3, padding: "8px 26px", borderRadius: 12, background: "rgba(3,20,40,0.55)" }}>
          EXPECTED
        </div>
      </div>
    </Zone>
  );
};

// 3. SKIM — 80 applications a day, identical lists skimmed
export const SkimStat: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const exit = useExit(dur);
  const sweep = (frame % 36) / 36;
  return (
    <Zone>
      <div style={{ opacity: exit, textAlign: "center" }}>
        <div style={{ ...W, fontWeight: 900, fontSize: 110, lineHeight: 1 }}>
          <AnimatedNumber value={80} duration={26} />
        </div>
        <div style={{ ...W, fontWeight: 800, fontSize: 34, color: COLORS.boxFill, marginBottom: 20 }}>applications a day</div>
        <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 10, width: 560, margin: "0 auto", overflow: "hidden", borderRadius: 16 }}>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(255,255,255,0.9)", borderRadius: 12, padding: "12px 16px" }}>
              <Sico d={P.doc} color="#9aa3b1" size={26} />
              <div style={{ flex: 1, height: 8, background: "#d7dde6", borderRadius: 4 }} />
              <div style={{ height: 8, width: 70, background: "#d7dde6", borderRadius: 4 }} />
            </div>
          ))}
          {/* skim highlight bar */}
          <div style={{ position: "absolute", left: 0, right: 0, top: `${sweep * 100}%`, height: 4, background: "rgba(47,80,230,0.85)", boxShadow: "0 0 18px rgba(47,80,230,0.9)" }} />
        </div>
        <div style={{ ...W, fontWeight: 800, fontSize: 30, marginTop: 16 }}>Identical lists get <span style={{ color: "#ff8a8a" }}>skimmed</span></div>
      </div>
    </Zone>
  );
};

// 4. THE FIX — real professional experience
export const FixCard: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const exit = useExit(dur);
  const s = spring({ frame, fps: 30, config: { damping: 140, stiffness: 150, mass: 0.6 } });
  return (
    <Zone>
      <div style={{ opacity: interpolate(s, [0, 1], [0, 1]) * exit, transform: `scale(${interpolate(s, [0, 1], [0.85, 1])})` }}>
        <Card w={760} accent={COLORS.checkGreen}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(31,158,71,0.18)", border: `2px solid ${COLORS.checkGreen}`, borderRadius: 14, padding: "8px 18px", marginBottom: 16 }}>
            <span style={{ ...W, fontWeight: 900, fontSize: 26, color: "#7ee2a0", letterSpacing: 2 }}>THE FIX</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{ width: 76, height: 76, borderRadius: 20, background: "rgba(47,80,230,0.22)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Sico d={P.bldg} color={COLORS.boxFill} size={42} />
            </div>
            <div style={{ ...W, fontWeight: 900, fontSize: 44, lineHeight: 1.1 }}>Real professional <span style={{ color: COLORS.boxFill }}>experience</span></div>
          </div>
          <div style={{ ...W, fontWeight: 600, fontSize: 28, opacity: 0.8, marginTop: 14 }}>before senior year</div>
        </Card>
      </div>
    </Zone>
  );
};

// 5. STAND OUT / STOP — venture-backed placement makes them stop
export const StandOutStop: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const exit = useExit(dur);
  const stop = spring({ frame: frame - 12, fps: 30, config: { damping: 130, stiffness: 160 } });
  return (
    <Zone>
      <div style={{ opacity: exit, width: 740, position: "relative", borderRadius: 28, overflow: "hidden", boxShadow: "0 26px 70px rgba(0,0,0,0.55)" }}>
        <div style={{ position: "relative", height: 360 }}>
          <TowersLayer opacity={0.6} />
          <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 14 }}>
            <div style={{ transform: `scale(${interpolate(stop, [0, 1], [0.6, 1])})`, width: 96, height: 96, borderRadius: 48, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 30px rgba(255,255,255,0.6)" }}>
              <Sico d={P.hand} color={NAVY} size={50} />
            </div>
            <div style={{ ...W, fontWeight: 900, fontSize: 46, textAlign: "center", textShadow: "0 4px 16px rgba(0,0,0,0.6)" }}>A venture-backed<br />placement makes them <span style={{ color: COLORS.boxFill }}>STOP</span></div>
          </AbsoluteFill>
        </div>
      </div>
    </Zone>
  );
};

// 6. BRAND — Matchtern mark (no wordmark)
export const BrandLogo: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const exit = useExit(dur);
  const s = spring({ frame, fps: 30, config: { damping: 150, stiffness: 130, mass: 0.7 } });
  return (
    <Zone pb={1010}>
      <div style={{ opacity: interpolate(s, [0, 1], [0, 1]) * exit, textAlign: "center" }}>
        <div style={{ transform: `scale(${interpolate(s, [0, 1], [0.5, 1])}) rotate(${interpolate(s, [0, 1], [-20, 0])}deg)`, display: "flex", justifyContent: "center", marginBottom: 16 }}>
          <LogoChip size={150} radius={34} />
        </div>
        <div style={{ ...W, fontWeight: 800, fontSize: 34, opacity: 0.92, textShadow: "0 4px 16px rgba(0,0,0,0.6)" }}>does just that</div>
      </div>
    </Zone>
  );
};

// 7. CTA — comment JUNIOR + action plan
export const CTAJunior: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const exit = useExit(dur);
  const s = spring({ frame, fps: 30, config: { damping: 140, stiffness: 140, mass: 0.7 } });
  const pulse = 1 + 0.03 * Math.sin(frame / 6);
  return (
    <Zone>
      <div style={{ opacity: interpolate(s, [0, 1], [0, 1]) * exit, textAlign: "center", width: 860 }}>
        <Card w={860} accent={BLUE} pad={26}>
          <div style={{ ...W, fontWeight: 700, fontSize: 28, opacity: 0.85, marginBottom: 12 }}>Get the full</div>
          <div style={{ ...W, fontWeight: 900, fontSize: 40, marginBottom: 16 }}>Junior Year Action Plan</div>
          {["Replace clubs with real experience", "Stand out before senior year", "Step-by-step timeline"].map((t, i) => {
            const op = interpolate(frame, [10 + i * 6, 18 + i * 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, opacity: op, marginBottom: 8, justifyContent: "flex-start" }}>
                <CheckIcon size={28} />
                <span style={{ ...W, fontWeight: 700, fontSize: 26 }}>{t}</span>
              </div>
            );
          })}
        </Card>
        <div style={{ marginTop: 18, display: "inline-flex", alignItems: "center", gap: 14, background: "#fff", borderRadius: 40, padding: "14px 14px 14px 30px", transform: `scale(${pulse})`, boxShadow: "0 18px 50px rgba(0,0,0,0.45)" }}>
          <span style={{ ...W, fontWeight: 700, fontSize: 30, color: "#6b7480" }}>Comment</span>
          <span style={{ fontFamily: FONT.sans, fontWeight: 900, fontSize: 46, color: BLUE }}>"JUNIOR"</span>
          <div style={{ width: 60, height: 60, borderRadius: 30, background: BLUE, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Sico d={P.send} color="#fff" size={30} />
          </div>
        </div>
      </div>
    </Zone>
  );
};
