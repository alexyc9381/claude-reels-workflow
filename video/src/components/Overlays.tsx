import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT } from "../brand";
import {
  AnimatedNumber,
  CheckIcon,
  CrossIcon,
  Kicker,
  LogoChip,
  Panel,
  PersonIcon,
  useEnter,
  useExitFade,
  VignetteBG,
} from "./primitives";

/* ============================ WRAPPERS ============================ */

// Opaque navy card that slides in from the left, vertically centered.
// Covers the busy left third while keeping the presenter's face (center-right) clear.
export const LeftPanel: React.FC<{
  children: React.ReactNode;
  dur: number;
  width?: number;
  accent?: string;
  top?: number;
}> = ({ children, dur, width = 760, accent = COLORS.logoBlue, top }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 200, stiffness: 110, mass: 0.8 } });
  const x = interpolate(s, [0, 1], [-60, 0]);
  const op = interpolate(s, [0, 1], [0, 1]) * useExitFade(dur, 14);
  return (
    <AbsoluteFill
      style={{
        justifyContent: top == null ? "center" : "flex-start",
        alignItems: "flex-start",
        padding: "0 0 0 56px",
        paddingTop: top,
      }}
    >
      <div style={{ width, transform: `translateX(${x}px)`, opacity: op }}>
        <Panel variant="navy" accent={accent} padding={40}>
          {children}
        </Panel>
      </div>
    </AbsoluteFill>
  );
};

// Full-bleed cutaway scene with its own background.
export const FullScene: React.FC<{
  children: React.ReactNode;
  dur: number;
  tone?: "light" | "navy";
}> = ({ children, dur, tone = "navy" }) => {
  const { opacity, scale } = useEnter(0, 0, 1.04);
  const exit = useExitFade(dur, 16);
  return (
    <AbsoluteFill style={{ opacity: opacity * exit }}>
      <VignetteBG tone={tone} />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          transform: `scale(${interpolate(scale, [1, 1.04], [1, 1.04])})`,
        }}
      >
        {children}
      </AbsoluteFill>
      {tone === "light" && (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 220,
            background:
              "linear-gradient(to top, rgba(3,46,88,0.55) 0%, rgba(3,46,88,0) 100%)",
          }}
        />
      )}
    </AbsoluteFill>
  );
};

// Top-area holder for badges / stamps (clears the presenter's head).
export const TopArea: React.FC<{ children: React.ReactNode; dur: number }> = ({
  children,
  dur,
}) => {
  const exit = useExitFade(dur, 12);
  return (
    <AbsoluteFill
      style={{ justifyContent: "flex-start", alignItems: "center", paddingTop: 70, opacity: exit }}
    >
      {children}
    </AbsoluteFill>
  );
};

/* ============================ PRIMITents ============================ */

const H1: React.CSSProperties = {
  fontFamily: FONT.serif,
  fontWeight: 800,
  color: COLORS.white,
  lineHeight: 1.05,
};
const SANS_WHITE: React.CSSProperties = { fontFamily: FONT.sans, color: COLORS.white };

// Staggered list of check/cross rows.
export const RevealList: React.FC<{
  items: { text: string; type?: "check" | "cross"; delay: number }[];
  fontSize?: number;
  gap?: number;
}> = ({ items, fontSize = 33, gap = 22 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap }}>
      {items.map((it, i) => {
        const s = spring({ frame: frame - it.delay, fps, config: { damping: 200, stiffness: 140, mass: 0.6 } });
        const op = interpolate(s, [0, 1], [0, 1]);
        const x = interpolate(s, [0, 1], [22, 0]);
        return (
          <div
            key={i}
            style={{ display: "flex", alignItems: "center", gap: 18, opacity: op, transform: `translateX(${x}px)` }}
          >
            {it.type === "cross" ? <CrossIcon size={40} /> : <CheckIcon size={40} />}
            <span style={{ ...SANS_WHITE, fontWeight: 700, fontSize }}>{it.text}</span>
          </div>
        );
      })}
    </div>
  );
};

/* ============================ COMPONENTS ============================ */

// 1. Hook stat — count-up + building person grid + underline sweep.
export const HookStat: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const underline = interpolate(frame, [18, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cols = 8, rows = 4, total = cols * rows;
  return (
    <LeftPanel dur={dur} width={720} accent={COLORS.logoBlueBright}>
      <Kicker>Every single year</Kicker>
      <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginTop: 8 }}>
        <AnimatedNumber
          value={35000}
          duration={40}
          style={{ ...SANS_WHITE, fontFamily: FONT.sans, fontWeight: 900, fontSize: 104, letterSpacing: -2, lineHeight: 1 }}
        />
      </div>
      <div
        style={{
          height: 7,
          width: `${underline * 320}px`,
          background: COLORS.logoBlueBright,
          borderRadius: 4,
          marginTop: 4,
          marginBottom: 18,
        }}
      />
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 8, width: 360, marginBottom: 18 }}>
        {Array.from({ length: total }).map((_, i) => {
          const op = interpolate(frame, [8 + i * 1.1, 16 + i * 1.1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div key={i} style={{ opacity: op }}>
              <PersonIcon size={34} color={COLORS.white} />
            </div>
          );
        })}
      </div>
      <div style={{ ...SANS_WHITE, fontWeight: 800, fontSize: 30 }}>
        students score <span style={{ color: COLORS.boxFill }}>1500+</span> on the SAT
      </div>
    </LeftPanel>
  );
};

// 2. Universities + 50,000 applications
export const UniBoard: React.FC<{ dur: number }> = ({ dur }) => {
  const unis = ["Harvard", "Stanford", "MIT", "Columbia"];
  const frame = useCurrentFrame();
  return (
    <LeftPanel dur={dur} width={680}>
      <Kicker>Harvard alone</Kicker>
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginTop: 6, marginBottom: 16 }}>
        <AnimatedNumber value={50000} duration={36} suffix="+" style={{ ...SANS_WHITE, fontWeight: 900, fontSize: 88, letterSpacing: -2, lineHeight: 1 }} />
        <span style={{ ...SANS_WHITE, fontWeight: 800, fontSize: 30, opacity: 0.85 }}>applications</span>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
        {unis.map((u, i) => {
          const op = interpolate(frame, [16 + i * 7, 28 + i * 7], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const y = interpolate(frame, [16 + i * 7, 28 + i * 7], [14, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div key={u} style={{ opacity: op, transform: `translateY(${y}px)`, background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.20)", borderRadius: 12, padding: "10px 20px" }}>
              <span style={{ fontFamily: FONT.serif, fontWeight: 700, color: COLORS.white, fontSize: 30 }}>{u}</span>
            </div>
          );
        })}
      </div>
    </LeftPanel>
  );
};

// 3. Circular frosted badges (SAT / grades)
const Badge: React.FC<{ big: string; small?: string; sub?: string; delay: number }> = ({ big, small, sub, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 180, stiffness: 130, mass: 0.7 } });
  const sc = interpolate(s, [0, 1], [0.7, 1]);
  const op = interpolate(s, [0, 1], [0, 1]);
  return (
    <div
      style={{
        width: 188, height: 188, borderRadius: "50%",
        background: "rgba(7,28,56,0.58)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
        border: `3px solid ${COLORS.logoBlueBright}`,
        boxShadow: `0 0 40px rgba(47,80,230,0.45), 0 18px 40px rgba(0,0,0,0.4)`,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        transform: `scale(${sc})`, opacity: op,
      }}
    >
      {small && <span style={{ ...SANS_WHITE, fontWeight: 700, fontSize: 24, opacity: 0.85 }}>{small}</span>}
      <span style={{ ...SANS_WHITE, fontWeight: 900, fontSize: 52, lineHeight: 1 }}>{big}</span>
      {sub && <span style={{ ...SANS_WHITE, fontWeight: 600, fontSize: 20, opacity: 0.8 }}>{sub}</span>}
    </div>
  );
};
export const SatBadges: React.FC<{ dur: number }> = ({ dur }) => (
  <TopArea dur={dur}>
    <div style={{ display: "flex", gap: 40 }}>
      <Badge big="A+" small="GRADES" delay={4} />
      <Badge big="1500+" small="SAT" sub="score" delay={12} />
    </div>
  </TopArea>
);

// 5. Center stamp — bold word(s), optional cross
export const Stamp: React.FC<{
  dur: number;
  lines: string[];
  cross?: boolean;
  color?: string;
  size?: number;
  serif?: boolean;
  top?: boolean;
}> = ({ dur, lines, cross, color = COLORS.white, size = 96, serif, top }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 160, stiffness: 150, mass: 0.6 } });
  const sc = interpolate(s, [0, 1], [0.82, 1]);
  const op = interpolate(s, [0, 1], [0, 1]) * useExitFade(dur, 12);
  return (
    <AbsoluteFill style={{ justifyContent: top ? "flex-start" : "center", alignItems: "center", paddingTop: top ? 90 : 0 }}>
      <div style={{ transform: `scale(${sc})`, opacity: op, textAlign: "center" }}>
        {cross && (
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
            <CrossIcon size={84} />
          </div>
        )}
        {lines.map((l, i) => (
          <div
            key={i}
            style={{
              fontFamily: serif ? FONT.serif : FONT.sans,
              fontWeight: serif ? 800 : 900,
              fontSize: size,
              color,
              lineHeight: 1.05,
              letterSpacing: serif ? 0 : -1,
              textShadow: "0 6px 26px rgba(0,0,0,0.55)",
            }}
          >
            {l}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// 6/7. Document/resume reject card
export const RejectCard: React.FC<{ dur: number; title: string; lines: string[]; stamp: string }> = ({ dur, title, lines, stamp }) => {
  const frame = useCurrentFrame();
  const stampS = spring({ frame: frame - 22, fps: 30, config: { damping: 140, stiffness: 170, mass: 0.6 } });
  const stampSc = interpolate(stampS, [0, 1], [1.6, 1]);
  const stampOp = interpolate(stampS, [0, 1], [0, 1]);
  return (
    <LeftPanel dur={dur} width={620} accent={COLORS.crossRed}>
      <Kicker color={COLORS.boxFill}>{title}</Kicker>
      <div style={{ marginTop: 16, background: "rgba(255,255,255,0.96)", borderRadius: 12, padding: "26px 26px", position: "relative" }}>
        <div style={{ height: 18, background: COLORS.navy, width: "55%", borderRadius: 6, marginBottom: 18 }} />
        {[88, 96, 80, 92, 70].map((w, i) => (
          <div key={i} style={{ height: 11, background: "#cdd6e2", width: `${w}%`, borderRadius: 6, marginBottom: 13 }} />
        ))}
        <div
          style={{
            position: "absolute", top: "46%", left: "50%",
            transform: `translate(-50%,-50%) rotate(-12deg) scale(${stampSc})`,
            opacity: stampOp,
            border: `5px solid ${COLORS.crossRed}`, color: COLORS.crossRed,
            fontFamily: FONT.sans, fontWeight: 900, fontSize: 40, letterSpacing: 2,
            padding: "6px 20px", borderRadius: 10, background: "rgba(255,255,255,0.4)",
          }}
        >
          {stamp}
        </div>
      </div>
    </LeftPanel>
  );
};

// 10. Applicants pile — full scene grid of identical figures
export const ApplicantsPile: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const cols = 12, rows = 6, total = cols * rows;
  return (
    <FullScene dur={dur} tone="light">
      <div style={{ textAlign: "center" }}>
        <div style={{ fontFamily: FONT.serif, fontWeight: 800, color: COLORS.navy, fontSize: 60, marginBottom: 8 }}>
          50,000 applicants
        </div>
        <div style={{ fontFamily: FONT.sans, fontWeight: 600, color: COLORS.bodyGray, fontSize: 28, marginBottom: 30 }}>
          and they all look the same
        </div>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 12, width: 980 }}>
          {Array.from({ length: total }).map((_, i) => {
            const op = interpolate(frame, [6 + i * 0.5, 12 + i * 0.5], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <div key={i} style={{ opacity: op }}>
                <PersonIcon size={56} color={COLORS.navyText} />
              </div>
            );
          })}
        </div>
      </div>
    </FullScene>
  );
};

// 11. Brand reveal — Matchtern logo + tagline
export const BrandReveal: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logoS = spring({ frame, fps, config: { damping: 180, stiffness: 120, mass: 0.8 } });
  const logoSc = interpolate(logoS, [0, 1], [0.6, 1]);
  const wordOp = interpolate(frame, [12, 26], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const tagOp = interpolate(frame, [22, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <FullScene dur={dur} tone="navy">
      <div style={{ textAlign: "center" }}>
        <div style={{ transform: `scale(${logoSc})`, marginBottom: 22, display: "flex", justifyContent: "center" }}>
          <LogoChip size={150} radius={30} />
        </div>
        <div style={{ fontFamily: FONT.sans, fontWeight: 900, color: COLORS.white, fontSize: 72, letterSpacing: -1, opacity: wordOp }}>
          Matchtern
        </div>
        <div style={{ fontFamily: FONT.sans, fontWeight: 600, color: COLORS.boxFill, fontSize: 30, marginTop: 12, opacity: tagOp }}>
          Real projects. Real teams. Real experience.
        </div>
      </div>
    </FullScene>
  );
};

// 13. Numbered training steps (left panel)
export const NumberedSteps: React.FC<{ dur: number; title: string; steps: { label: string; delay: number }[] }> = ({ dur, title, steps }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <LeftPanel dur={dur} width={780}>
      <Kicker color={COLORS.boxFill}>{title}</Kicker>
      <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 18 }}>
        {steps.map((st, i) => {
          const s = spring({ frame: frame - st.delay, fps, config: { damping: 200, stiffness: 140, mass: 0.6 } });
          const op = interpolate(s, [0, 1], [0, 1]);
          const x = interpolate(s, [0, 1], [22, 0]);
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 18, opacity: op, transform: `translateX(${x}px)` }}>
              <div style={{ width: 50, height: 50, borderRadius: 12, background: COLORS.logoBlue, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT.sans, fontWeight: 900, color: "#fff", fontSize: 26, flexShrink: 0 }}>{i + 1}</div>
              <span style={{ fontFamily: FONT.sans, fontWeight: 700, color: "#fff", fontSize: 31 }}>{st.label}</span>
            </div>
          );
        })}
      </div>
    </LeftPanel>
  );
};

// Generic left-panel checklist (outcomes/benefits/who-qualifies/compare)
export const PanelList: React.FC<{ dur: number; title: string; items: { text: string; type?: "check" | "cross"; delay: number }[]; accent?: string; width?: number }> = ({ dur, title, items, accent, width = 800 }) => (
  <LeftPanel dur={dur} width={width} accent={accent}>
    <Kicker color={COLORS.boxFill}>{title}</Kicker>
    <div style={{ marginTop: 20 }}>
      <RevealList items={items} />
    </div>
  </LeftPanel>
);

// 15. Full-scene checklist (outcomes hero)
export const OutcomesScene: React.FC<{ dur: number; title: string; items: { text: string; type?: "check" | "cross"; delay: number }[] }> = ({ dur, title, items }) => (
  <FullScene dur={dur} tone="navy">
    <div style={{ width: 1100 }}>
      <div style={{ ...H1, fontSize: 56, marginBottom: 34, textAlign: "center" }}>{title}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 26, alignItems: "flex-start", margin: "0 auto", width: 820 }}>
        <RevealList items={items} fontSize={40} gap={26} />
      </div>
    </div>
  </FullScene>
);

// 16. Standout hero — one highlighted figure among crowd
export const StandoutHero: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const cols = 14, rows = 6;
  const heroIndex = 3 * cols + 6;
  const titleOp = interpolate(frame, [10, 28], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <FullScene dur={dur} tone="navy">
      <div style={{ textAlign: "center" }}>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 12, width: 1080, marginBottom: 34 }}>
          {Array.from({ length: cols * rows }).map((_, i) => {
            const isHero = i === heroIndex;
            const op = interpolate(frame, [4 + i * 0.25, 10 + i * 0.25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const pop = isHero ? spring({ frame: frame - 24, fps: 30, config: { damping: 140, stiffness: 160 } }) : 0;
            const sc = isHero ? interpolate(pop, [0, 1], [1, 1.5]) : 1;
            return (
              <div key={i} style={{ opacity: op, transform: `scale(${sc})`, zIndex: isHero ? 5 : 1, filter: isHero ? "drop-shadow(0 0 16px rgba(47,80,230,0.9))" : "none" }}>
                <PersonIcon size={50} color={isHero ? COLORS.logoBlueBright : "rgba(255,255,255,0.22)"} />
              </div>
            );
          })}
        </div>
        <div style={{ ...H1, fontSize: 68, opacity: titleOp }}>
          A <span style={{ color: COLORS.boxFill }}>standout</span> applicant.
        </div>
      </div>
    </FullScene>
  );
};

// 25. Guarantee seal
export const GuaranteeSeal: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 150, stiffness: 120, mass: 0.8 } });
  const sc = interpolate(s, [0, 1], [0.7, 1]);
  const rot = interpolate(frame, [0, dur], [-4, 4]);
  return (
    <FullScene dur={dur} tone="navy">
      <div style={{ display: "flex", alignItems: "center", gap: 56 }}>
        <div style={{ transform: `scale(${sc}) rotate(${rot}deg)`, width: 280, height: 280, borderRadius: "50%", border: `6px solid ${COLORS.checkGreen}`, background: "rgba(31,158,71,0.12)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", boxShadow: "0 0 50px rgba(31,158,71,0.4)" }}>
          <CheckIcon size={92} />
          <div style={{ ...SANS_WHITE, fontWeight: 900, fontSize: 34, marginTop: 12, textAlign: "center", lineHeight: 1.05 }}>100%<br />MONEY<br />BACK</div>
        </div>
        <div style={{ maxWidth: 620 }}>
          <div style={{ ...H1, fontSize: 60 }}>Satisfaction<br />guarantee</div>
          <div style={{ ...SANS_WHITE, fontWeight: 600, fontSize: 30, opacity: 0.85, marginTop: 16 }}>
            For the entire program. Not satisfied at any point, and you get your money back.
          </div>
        </div>
      </div>
    </FullScene>
  );
};

// 28. Final CTA
export const FinalCTA: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logoS = spring({ frame, fps, config: { damping: 180, stiffness: 120 } });
  const logoSc = interpolate(logoS, [0, 1], [0.7, 1]);
  const lineOp = interpolate(frame, [12, 26], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const btnS = spring({ frame: frame - 24, fps, config: { damping: 150, stiffness: 140 } });
  const btnSc = interpolate(btnS, [0, 1], [0.8, 1]);
  const pulse = 1 + 0.02 * Math.sin(frame / 6);
  return (
    <FullScene dur={dur} tone="navy">
      <div style={{ textAlign: "center" }}>
        <div style={{ transform: `scale(${logoSc})`, display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <LogoChip size={120} radius={26} />
        </div>
        <div style={{ ...H1, fontSize: 62, opacity: lineOp }}>
          Make your child a <span style={{ color: COLORS.boxFill }}>standout</span> applicant.
        </div>
        <div style={{ transform: `scale(${btnSc * pulse})`, marginTop: 36, display: "inline-block" }}>
          <div style={{ background: COLORS.logoBlue, color: "#fff", fontFamily: FONT.sans, fontWeight: 800, fontSize: 36, padding: "20px 52px", borderRadius: 16, boxShadow: "0 16px 40px rgba(36,64,189,0.55)" }}>
            Apply now &nbsp;→&nbsp; matchtern.org
          </div>
        </div>
      </div>
    </FullScene>
  );
};

// Small pill badge centered (selective / limited / internship)
export const PillBadge: React.FC<{ dur: number; label: string; sub?: string; color?: string; top?: boolean }> = ({ dur, label, sub, color = COLORS.logoBlue, top }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 160, stiffness: 140, mass: 0.6 } });
  const sc = interpolate(s, [0, 1], [0.8, 1]);
  const op = interpolate(s, [0, 1], [0, 1]) * useExitFade(dur, 12);
  return (
    <AbsoluteFill style={{ justifyContent: top ? "flex-start" : "center", alignItems: "center", paddingTop: top ? 84 : 0 }}>
      <div style={{ transform: `scale(${sc})`, opacity: op, background: color, borderRadius: 18, padding: "18px 40px", textAlign: "center", boxShadow: "0 16px 44px rgba(0,0,0,0.45)" }}>
        <div style={{ ...SANS_WHITE, fontWeight: 900, fontSize: 46, letterSpacing: 1 }}>{label}</div>
        {sub && <div style={{ ...SANS_WHITE, fontWeight: 600, fontSize: 26, opacity: 0.9, marginTop: 4 }}>{sub}</div>}
      </div>
    </AbsoluteFill>
  );
};

// CTA lower bar (apply prompt) that keeps presenter visible
export const ApplyBar: React.FC<{ dur: number; text: string }> = ({ dur, text }) => {
  const { opacity, translateY } = useEnter(0, 30);
  const exit = useExitFade(dur, 12);
  const frame = useCurrentFrame();
  const pulse = 1 + 0.015 * Math.sin(frame / 6);
  return (
    <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", paddingTop: 96 }}>
      <div style={{ opacity: opacity * exit, transform: `translateY(${translateY}px) scale(${pulse})`, background: COLORS.logoBlue, borderRadius: 16, padding: "16px 40px", boxShadow: "0 16px 40px rgba(36,64,189,0.5)", display: "flex", alignItems: "center", gap: 16 }}>
        <span style={{ ...SANS_WHITE, fontWeight: 800, fontSize: 34 }}>{text}</span>
        <span style={{ ...SANS_WHITE, fontWeight: 900, fontSize: 34 }}>↓</span>
      </div>
    </AbsoluteFill>
  );
};
