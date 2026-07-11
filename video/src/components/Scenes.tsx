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
  PersonIcon,
  useExitFade,
} from "./primitives";
import { FloatLayer, MeshBG, ParticleField, ShineSweep, Spotlight, TowersLayer } from "./fx";
import { AreaTrend, BarChartCompare, BellCurve, Funnel, Gauge } from "./dataviz";
import { SchoolEmblem, SCHOOLS } from "./school";

const W: React.CSSProperties = { fontFamily: FONT.sans, color: "#fff" };
const SERIF: React.CSSProperties = { fontFamily: FONT.serif, color: "#fff", fontWeight: 800 };

/* ===================== WRAPPERS ===================== */

export const Scene: React.FC<{ children: React.ReactNode; dur: number; tone?: "navy" | "light"; particles?: boolean; towers?: boolean }> = ({
  children,
  dur,
  tone = "navy",
  particles = true,
  towers = false,
}) => {
  const frame = useCurrentFrame();
  const inOp = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  const sc = interpolate(frame, [0, 16], [1.05, 1], { extrapolateRight: "clamp" });
  const exit = useExitFade(dur, 14);
  return (
    <AbsoluteFill style={{ opacity: inOp * exit }}>
      <MeshBG tone={tone} />
      {towers && <TowersLayer opacity={0.42} />}
      {particles && <ParticleField count={44} color={tone === "navy" ? "rgba(120,150,235,0.5)" : "rgba(3,46,88,0.25)"} opacity={0.6} />}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", transform: `scale(${sc})` }}>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};

type Pos = "left" | "right" | "center" | "top" | "bottom";
export const Holder: React.FC<{ pos: Pos; dur: number; children: React.ReactNode; padX?: number }> = ({ pos, dur, children, padX = 60 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 200, stiffness: 110, mass: 0.8 } });
  const op = interpolate(s, [0, 1], [0, 1]) * useExitFade(dur, 14);
  const off = interpolate(s, [0, 1], [pos === "right" ? 50 : pos === "top" || pos === "bottom" ? 0 : -50, 0]);
  const yoff = interpolate(s, [0, 1], [pos === "top" ? -30 : pos === "bottom" ? 30 : 0, 0]);
  const justify = pos === "right" ? "flex-end" : pos === "left" ? "flex-start" : "center";
  const align = pos === "top" ? "flex-start" : pos === "bottom" ? "flex-end" : "center";
  return (
    <AbsoluteFill style={{ justifyContent: align, alignItems: justify, padding: `70px ${padX}px` }}>
      <div style={{ transform: `translate(${off}px, ${yoff}px)`, opacity: op }}>{children}</div>
    </AbsoluteFill>
  );
};

// A premium card surface (navy glass with accent stripe + subtle shine).
const Card: React.FC<{ children: React.ReactNode; w?: number; accent?: string; pad?: number; glass?: boolean }> = ({
  children,
  w,
  accent = COLORS.logoBlue,
  pad = 34,
  glass = false,
}) => (
  <div
    style={{
      width: w,
      position: "relative",
      overflow: "hidden",
      borderRadius: 22,
      padding: pad,
      background: glass ? "rgba(6,26,52,0.72)" : `linear-gradient(160deg, ${COLORS.navy}, ${COLORS.navyDeep})`,
      backdropFilter: glass ? "blur(16px)" : undefined,
      border: "1px solid rgba(255,255,255,0.12)",
      boxShadow: "0 28px 70px rgba(0,0,0,0.5)",
    }}
  >
    <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 6, background: accent }} />
    <ShineSweep period={150} />
    {children}
  </div>
);

/* small inline icons */
const Ico: React.FC<{ d: string; color?: string; size?: number }> = ({ d, color = "#fff", size = 34 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);
const I = {
  eye: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z M12 9a3 3 0 100 6 3 3 0 000-6z",
  coffee: "M4 8h13v5a4 4 0 01-4 4H8a4 4 0 01-4-4z M17 9h2a2 2 0 010 4h-2 M6 2v2 M10 2v2 M14 2v2",
  rocket: "M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2M9 13l-2 2M12 12a8 8 0 016-9 8 8 0 01-9 6l-3 3a2 2 0 003 3z",
  doc: "M7 3h7l4 4v14H7z M14 3v4h4 M10 12h6 M10 16h6",
  chat: "M4 5h16v11H9l-4 4z",
  target: "M12 3a9 9 0 100 18 9 9 0 000-18z M12 8a4 4 0 100 8 4 4 0 000-8z M12 12h.01",
  spark: "M12 3v4 M12 17v4 M5 12H1 M23 12h-4 M6 6l2 2 M16 16l2 2 M6 18l2-2 M16 8l2-2",
  brief: "M3 8h18v12H3z M8 8V5h8v3",
  cal: "M3 5h18v16H3z M3 9h18 M8 3v4 M16 3v4",
  trophy: "M7 4h10v4a5 5 0 01-10 0z M7 6H4v1a3 3 0 003 3 M17 6h3v1a3 3 0 01-3 3 M9 14h6 M10 18h4 M12 14v4",
  hand: "M4 11l4-1 6 1 4 2v4l-7 3-7-2v-7z M8 10V6a2 2 0 014 0v3",
  up: "M3 17l6-6 4 4 8-8 M21 7v6 M21 7h-6",
};

/* ===================== CUTAWAY SCENES ===================== */

// HOOK — SAT bell curve + count-up in the tail
export const HookScene: React.FC<{ dur: number }> = ({ dur }) => (
  <Scene dur={dur} tone="navy">
    <div style={{ textAlign: "center" }}>
      <Kicker color={COLORS.boxFill}>Every single year</Kicker>
      <div style={{ ...W, fontWeight: 900, fontSize: 96, letterSpacing: -2, lineHeight: 1, margin: "6px 0 4px" }}>
        <AnimatedNumber value={35000} duration={46} />
      </div>
      <div style={{ ...W, fontWeight: 700, fontSize: 30, opacity: 0.9, marginBottom: 8 }}>
        students score <span style={{ color: COLORS.boxFill }}>1500+</span> on the SAT
      </div>
      <FloatLayer amp={5} speed={0.6}>
        <BellCurve delay={10} w={780} h={300} />
      </FloatLayer>
    </div>
  </Scene>
);

// SCHOOLS — emblems + 50,000 odometer + funnel
export const SchoolsScene: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  return (
    <Scene dur={dur} tone="navy">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 30 }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ ...W, fontWeight: 800, fontSize: 34, opacity: 0.85 }}>Harvard alone receives</div>
          <div style={{ ...W, fontWeight: 900, fontSize: 84, letterSpacing: -2, lineHeight: 1 }}>
            <AnimatedNumber value={50000} duration={40} suffix="+" /> <span style={{ fontSize: 40, opacity: 0.8 }}>applications</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 28 }}>
          {SCHOOLS.map((s, i) => (
            <SchoolEmblem key={s.name} {...s} delay={18 + i * 9} />
          ))}
        </div>
      </div>
    </Scene>
  );
};

// EVERYONE — wall of near-identical (but varied) top profiles
const SAT_SCORES = [1500, 1520, 1530, 1540, 1550, 1560, 1570, 1580, 1590, 1510, 1535, 1565];
const GRADES = ["A+", "A", "A+", "A", "A+", "A-", "A", "A+", "A", "A+", "A-", "A"];
export const EveryoneScene: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const cols = 7, rows = 3;
  return (
    <Scene dur={dur} tone="navy" particles={false}>
      <div style={{ textAlign: "center" }}>
        <div style={{ ...SERIF, fontSize: 52, marginBottom: 24 }}>Everyone already has this</div>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 16, width: 1180 }}>
          {Array.from({ length: cols * rows }).map((_, i) => {
            const op = interpolate(frame, [4 + i * 1.4, 12 + i * 1.4], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const sat = SAT_SCORES[(i * 5 + 3) % SAT_SCORES.length];
            const gr = GRADES[(i * 7 + 2) % GRADES.length];
            return (
              <div key={i} style={{ opacity: op * 0.92, background: "rgba(255,255,255,0.92)", borderRadius: 12, padding: "12px 10px", filter: "grayscale(0.25)" }}>
                <div style={{ fontFamily: FONT.sans, fontWeight: 900, color: COLORS.navy, fontSize: 30, lineHeight: 1 }}>{gr}</div>
                <div style={{ height: 5, background: "#c7cfdb", borderRadius: 3, margin: "8px 0" }} />
                <div style={{ fontFamily: FONT.sans, fontWeight: 800, color: "#6b7480", fontSize: 18 }}>{sat} SAT</div>
              </div>
            );
          })}
        </div>
      </div>
    </Scene>
  );
};

// APPLICANTS — dense crowd push-in, one ignites
export const ApplicantsScene: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const cols = 16, rows = 7, total = cols * rows;
  const hero = 3 * cols + 9;
  const push = interpolate(frame, [0, dur], [1, 1.12]);
  return (
    <Scene dur={dur} tone="navy" particles={false}>
      <Spotlight x={56} y={44} size={42} />
      <div style={{ textAlign: "center", transform: `scale(${push})` }}>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 11, width: 1180, marginBottom: 26 }}>
          {Array.from({ length: total }).map((_, i) => {
            const op = interpolate(frame, [2 + i * 0.18, 7 + i * 0.18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const isHero = i === hero;
            const glow = isHero ? spring({ frame: frame - 40, fps: 30, config: { damping: 140, stiffness: 150 } }) : 0;
            return (
              <div key={i} style={{ opacity: op, transform: `scale(${isHero ? 1 + 0.5 * glow : 1})`, zIndex: isHero ? 5 : 1, filter: isHero ? "drop-shadow(0 0 14px rgba(47,80,230,0.95))" : "none" }}>
                <PersonIcon size={46} color={isHero ? COLORS.logoBlueBright : "rgba(255,255,255,0.16)"} />
              </div>
            );
          })}
        </div>
        <div style={{ ...W, fontWeight: 800, fontSize: 36, opacity: 0.92 }}>
          Just another name in <span style={{ color: COLORS.boxFill }}>50,000</span>
        </div>
      </div>
    </Scene>
  );
};

// BRAND — towers photo + logo-blade assembly + wordmark
export const BrandScene: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logoS = spring({ frame, fps, config: { damping: 170, stiffness: 120, mass: 0.8 } });
  const sc = interpolate(logoS, [0, 1], [0.5, 1]);
  const rot = interpolate(logoS, [0, 1], [-25, 0]);
  const word = interpolate(frame, [14, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const tag = interpolate(frame, [26, 44], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <Scene dur={dur} tone="navy" towers particles>
      <div style={{ textAlign: "center" }}>
        <div style={{ transform: `scale(${sc}) rotate(${rot}deg)`, display: "flex", justifyContent: "center", marginBottom: 22 }}>
          <LogoChip size={160} radius={34} />
        </div>
        <div style={{ ...W, fontWeight: 900, fontSize: 78, letterSpacing: -1, opacity: word }}>Matchtern</div>
        <div style={{ ...W, fontWeight: 600, fontSize: 30, color: COLORS.boxFill, marginTop: 12, opacity: tag }}>
          Real companies. Real projects. Real experience.
        </div>
      </div>
    </Scene>
  );
};

// OUTCOMES — four outcome cards with icons building
export const OutcomesScene: React.FC<{ dur: number; items: { icon: keyof typeof I; label: string; delay: number }[] }> = ({ dur, items }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Scene dur={dur} tone="navy">
      <div style={{ width: 1200 }}>
        <div style={{ ...SERIF, fontSize: 52, textAlign: "center", marginBottom: 30 }}>What your child walks away with</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 22 }}>
          {items.map((it, i) => {
            const s = spring({ frame: frame - it.delay, fps, config: { damping: 160, stiffness: 140, mass: 0.6 } });
            const op = interpolate(s, [0, 1], [0, 1]);
            const y = interpolate(s, [0, 1], [30, 0]);
            return (
              <FloatLayer key={i} amp={5} speed={0.5} phase={i}>
                <div style={{ opacity: op, transform: `translateY(${y}px)`, position: "relative", overflow: "hidden", background: "linear-gradient(160deg,#0a356b,#021f3c)", borderRadius: 18, padding: 24, border: "1px solid rgba(255,255,255,0.12)", boxShadow: "0 20px 50px rgba(0,0,0,0.45)", height: 230 }}>
                  <div style={{ width: 60, height: 60, borderRadius: 14, background: "rgba(47,80,230,0.22)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                    <Ico d={I[it.icon]} color={COLORS.boxFill} size={34} />
                  </div>
                  <div style={{ ...W, fontWeight: 800, fontSize: 25, lineHeight: 1.2 }}>{it.label}</div>
                  <div style={{ position: "absolute", bottom: 18, left: 24 }}><CheckIcon size={30} /></div>
                </div>
              </FloatLayer>
            );
          })}
        </div>
      </div>
    </Scene>
  );
};

// STANDOUT — crowd parallax, hero card lifts with spotlight
export const StandoutScene: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const cols = 15, rows = 6;
  const hero = 3 * cols + 7;
  const title = interpolate(frame, [16, 34], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <Scene dur={dur} tone="navy" particles={false}>
      <Spotlight x={50} y={42} size={46} />
      <div style={{ textAlign: "center" }}>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols},1fr)`, gap: 13, width: 1140, marginBottom: 34 }}>
          {Array.from({ length: cols * rows }).map((_, i) => {
            const isHero = i === hero;
            const op = interpolate(frame, [2 + i * 0.2, 8 + i * 0.2], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const pop = isHero ? spring({ frame: frame - 22, fps: 30, config: { damping: 130, stiffness: 150 } }) : 0;
            const sc = isHero ? interpolate(pop, [0, 1], [1, 1.7]) : 1;
            const yy = isHero ? interpolate(pop, [0, 1], [0, -10]) : 0;
            return (
              <div key={i} style={{ opacity: isHero ? 1 : op * 0.5, transform: `translateY(${yy}px) scale(${sc})`, zIndex: isHero ? 6 : 1, filter: isHero ? "drop-shadow(0 0 18px rgba(47,80,230,1))" : "none" }}>
                <PersonIcon size={48} color={isHero ? COLORS.logoBlueBright : "rgba(255,255,255,0.18)"} />
              </div>
            );
          })}
        </div>
        <div style={{ ...SERIF, fontSize: 70, opacity: title }}>
          A <span style={{ color: COLORS.boxFill }}>standout</span> applicant.
        </div>
      </div>
    </Scene>
  );
};

// ADVANTAGE — area trend chart
export const AdvantageScene: React.FC<{ dur: number }> = ({ dur }) => (
  <Scene dur={dur} tone="navy">
    <div style={{ textAlign: "center" }}>
      <div style={{ ...SERIF, fontSize: 50, marginBottom: 8 }}>The earlier they start,</div>
      <div style={{ ...W, fontWeight: 700, fontSize: 30, color: COLORS.boxFill, marginBottom: 22 }}>the bigger the advantage</div>
      <AreaTrend delay={8} w={860} h={340} />
      <div style={{ display: "flex", justifyContent: "space-between", width: 860, ...W, fontWeight: 700, fontSize: 22, opacity: 0.7, marginTop: 6 }}>
        <span>Freshman year</span><span>Application day</span>
      </div>
    </div>
  </Scene>
);

// BENEFITS — bar chart with/without, towers bg
export const BenefitsScene: React.FC<{ dur: number }> = ({ dur }) => (
  <Scene dur={dur} tone="navy" towers>
    <div style={{ textAlign: "center" }}>
      <div style={{ ...SERIF, fontSize: 48, marginBottom: 26 }}>And it pays off for life</div>
      <BarChartCompare
        delay={8}
        w={780}
        h={320}
        bars={[
          { label: "Everyone else", value: 38, color: "rgba(255,255,255,0.35)" },
          { label: "Your child", value: 100, color: COLORS.logoBlueBright },
        ]}
      />
      <div style={{ display: "flex", gap: 40, justifyContent: "center", ...W, fontWeight: 700, fontSize: 24, opacity: 0.9, marginTop: 10 }}>
        <span>Negotiation power</span><span>·</span><span>Job offers</span><span>·</span><span>Earnings</span>
      </div>
    </div>
  </Scene>
);

// GUARANTEE — embossed seal with shine
export const GuaranteeScene: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 150, stiffness: 120, mass: 0.8 } });
  const sc = interpolate(s, [0, 1], [0.7, 1]);
  const wob = Math.sin(frame / 22) * 3;
  return (
    <Scene dur={dur} tone="navy">
      <div style={{ display: "flex", alignItems: "center", gap: 60 }}>
        <div style={{ position: "relative", overflow: "hidden", transform: `scale(${sc}) rotate(${wob}deg)`, width: 300, height: 300, borderRadius: "50%", border: `8px solid ${COLORS.checkGreen}`, background: "radial-gradient(circle at 38% 32%, #1f9e47 0%, #0d5e29 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", boxShadow: "0 0 60px rgba(31,158,71,0.5), inset 0 0 30px rgba(0,0,0,0.3)" }}>
          <ShineSweep period={70} angle={25} />
          <CheckIcon size={86} color="#fff" />
          <div style={{ ...W, fontWeight: 900, fontSize: 30, marginTop: 10, textAlign: "center", lineHeight: 1.05 }}>100%<br />MONEY-BACK</div>
        </div>
        <div style={{ maxWidth: 600, textAlign: "left" }}>
          <div style={{ ...SERIF, fontSize: 58 }}>Satisfaction<br />guarantee</div>
          <div style={{ ...W, fontWeight: 600, fontSize: 28, opacity: 0.85, marginTop: 16 }}>
            For the entire program. Not satisfied at any point, and you get your money back.
          </div>
        </div>
      </div>
    </Scene>
  );
};

// FINAL CTA
export const FinalScene: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logoS = spring({ frame, fps, config: { damping: 180, stiffness: 120 } });
  const sc = interpolate(logoS, [0, 1], [0.7, 1]);
  const line = interpolate(frame, [12, 26], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const btnS = spring({ frame: frame - 22, fps, config: { damping: 150, stiffness: 140 } });
  const btnSc = interpolate(btnS, [0, 1], [0.8, 1]);
  const pulse = 1 + 0.02 * Math.sin(frame / 6);
  return (
    <Scene dur={dur} tone="navy" towers>
      <div style={{ textAlign: "center" }}>
        <div style={{ transform: `scale(${sc})`, display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <LogoChip size={120} radius={26} />
        </div>
        <div style={{ ...SERIF, fontSize: 60, opacity: line }}>
          Make your child a <span style={{ color: COLORS.boxFill }}>standout</span> applicant.
        </div>
        <div style={{ transform: `scale(${btnSc * pulse})`, marginTop: 34, display: "inline-block", position: "relative", overflow: "hidden", borderRadius: 16 }}>
          <div style={{ background: COLORS.logoBlue, color: "#fff", fontFamily: FONT.sans, fontWeight: 800, fontSize: 36, padding: "20px 52px", boxShadow: "0 16px 44px rgba(36,64,189,0.6)" }}>
            Apply now &nbsp;→&nbsp; matchtern.org
          </div>
          <ShineSweep period={80} />
        </div>
      </div>
    </Scene>
  );
};

/* ===================== TALKING-HEAD OVERLAYS ===================== */

// SAT score card (right)
export const ReportCardOverlay: React.FC<{ dur: number }> = ({ dur }) => (
  <Holder pos="right" dur={dur}>
    <Card w={400} accent={COLORS.logoBlue} glass>
      <Kicker color={COLORS.boxFill}>Top SAT scores</Kicker>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
        <Gauge delay={4} value={1540} max={1600} label="out of 1600" size={250} color={COLORS.logoBlueBright} />
      </div>
      <div style={{ ...W, textAlign: "center", fontWeight: 700, fontSize: 22, opacity: 0.85, marginTop: 2 }}>Top 1% of all test-takers</div>
    </Card>
  </Holder>
);

// Award rosette seal with ribbon tails
const Rosette: React.FC<{ size?: number }> = ({ size = 96 }) => {
  const frame = useCurrentFrame();
  const spin = Math.sin(frame / 30) * 4;
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 100 140" style={{ filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.3))" }}>
      <path d="M38 78 L30 130 L50 116 L70 130 L62 78 Z" fill={COLORS.logoBlue} />
      <g transform={`rotate(${spin} 50 50)`}>
        {Array.from({ length: 12 }).map((_, i) => (
          <ellipse key={i} cx="50" cy="50" rx="9" ry="46" fill={i % 2 ? "#D4A017" : "#E8B923"} transform={`rotate(${i * 30} 50 50)`} />
        ))}
        <circle cx="50" cy="50" r="30" fill="#D4A017" />
        <circle cx="50" cy="50" r="26" fill="#F2C744" />
        <text x="50" y="58" textAnchor="middle" fontFamily={FONT.serif} fontWeight={800} fontSize="26" fill="#7a5b00">A+</text>
      </g>
    </svg>
  );
};

// Stellar grades transcript with ribbon + shine (left)
export const StellarGradesOverlay: React.FC<{ dur: number }> = ({ dur }) => {
  const rows: [string, string][] = [
    ["AP Calculus", "A+"], ["AP Physics", "A"], ["English Lit", "A+"],
    ["AP Chemistry", "A-"], ["U.S. History", "A"], ["Computer Sci", "A+"],
  ];
  const frame = useCurrentFrame();
  return (
    <Holder pos="left" dur={dur}>
      <div style={{ position: "relative", width: 480 }}>
        <div style={{ position: "relative", overflow: "hidden", background: "#fdfdfb", borderRadius: 14, padding: "26px 28px 30px", boxShadow: "0 30px 70px rgba(0,0,0,0.5)" }}>
          <div style={{ fontFamily: FONT.serif, fontWeight: 800, color: COLORS.navy, fontSize: 26 }}>Official Transcript</div>
          <div style={{ fontFamily: FONT.sans, fontWeight: 700, color: COLORS.checkGreen, fontSize: 18, marginBottom: 14 }}>GPA 4.0 · Stellar grades</div>
          {rows.map(([s, g], i) => {
            const op = interpolate(frame, [6 + i * 4, 14 + i * 4], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <div key={s} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderBottom: i < rows.length - 1 ? "1px solid #eef1f5" : "none", opacity: op }}>
                <span style={{ fontFamily: FONT.sans, fontWeight: 600, color: "#3a424d", fontSize: 21 }}>{s}</span>
                <span style={{ fontFamily: FONT.sans, fontWeight: 900, color: g === "A-" ? "#5b8c3e" : COLORS.checkGreen, fontSize: 23 }}>{g}</span>
              </div>
            );
          })}
          <ShineSweep period={110} angle={18} />
        </div>
        <div style={{ position: "absolute", top: -18, right: -14 }}><Rosette size={92} /></div>
      </div>
    </Holder>
  );
};

// NOT ENOUGH — clean threshold meter: grades+SAT fills but can't reach "STAND OUT"
export const NotEnoughOverlay: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const fill = interpolate(frame, [6, 34], [0, 0.62], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const colH = 300;
  const labelOp = interpolate(frame, [30, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <Holder pos="left" dur={dur}>
      <Card w={520} accent={COLORS.crossRed} glass>
        <Kicker color={COLORS.boxFill}>The basics, maxed out</Kicker>
        <div style={{ display: "flex", gap: 26, marginTop: 18, alignItems: "flex-end" }}>
          {/* meter column */}
          <div style={{ position: "relative", width: 130, height: colH, background: "rgba(255,255,255,0.08)", borderRadius: 14, overflow: "hidden", flexShrink: 0 }}>
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: `${fill * 100}%`, background: `linear-gradient(180deg, ${COLORS.crossRed}, #9c1414)`, borderRadius: 14 }} />
            <div style={{ position: "absolute", left: 0, right: 0, bottom: `${fill * 100}%`, transform: "translateY(50%)", textAlign: "center", ...W, fontWeight: 900, fontSize: 30 }}>68%</div>
            {/* threshold line */}
            <div style={{ position: "absolute", left: -6, right: -6, top: "12%", borderTop: `3px dashed ${COLORS.boxFill}` }} />
          </div>
          <div style={{ flex: 1, height: colH, display: "flex", flexDirection: "column", justifyContent: "space-between", paddingBottom: 6 }}>
            <div>
              <div style={{ ...W, fontWeight: 800, fontSize: 26, color: COLORS.boxFill }}>STAND OUT</div>
              <div style={{ ...W, fontWeight: 500, fontSize: 18, opacity: 0.6 }}>where you need to be</div>
            </div>
            <div style={{ opacity: labelOp }}>
              <div style={{ display: "inline-block", background: COLORS.crossRed, ...W, fontWeight: 900, fontSize: 28, padding: "8px 18px", borderRadius: 10, letterSpacing: 1 }}>NOT ENOUGH</div>
              <div style={{ ...W, fontWeight: 600, fontSize: 20, opacity: 0.8, marginTop: 8 }}>Grades + SAT alone</div>
            </div>
          </div>
        </div>
      </Card>
    </Holder>
  );
};

// ESSAY — realistic application doc with REJECTED stamp slam
export const EssayOverlay: React.FC<{ dur: number; title: string; stamp: string }> = ({ dur, title, stamp }) => {
  const frame = useCurrentFrame();
  const stampS = spring({ frame: frame - 24, fps: 30, config: { damping: 130, stiffness: 180, mass: 0.6 } });
  const stampSc = interpolate(stampS, [0, 1], [2.2, 1]);
  const stampOp = interpolate(stampS, [0, 1], [0, 1]);
  const tilt = Math.sin(frame / 40) * 1.2;
  return (
    <Holder pos="left" dur={dur}>
      <div style={{ transform: `rotate(${tilt}deg)`, width: 470, background: "#fdfdfb", borderRadius: 8, padding: "30px 30px 38px", boxShadow: "0 30px 70px rgba(0,0,0,0.55)", position: "relative" }}>
        <div style={{ fontFamily: FONT.serif, fontWeight: 800, color: COLORS.navy, fontSize: 26, marginBottom: 6 }}>{title}</div>
        <div style={{ height: 2, background: "#e2e6ec", marginBottom: 16 }} />
        {[97, 100, 94, 99, 90, 96, 88].map((w, i) => (
          <div key={i} style={{ height: 9, background: "#d7dde6", width: `${w}%`, borderRadius: 4, marginBottom: 12 }} />
        ))}
        <div style={{ position: "absolute", top: "44%", left: "50%", transform: `translate(-50%,-50%) rotate(-14deg) scale(${stampSc})`, opacity: stampOp, border: `6px solid ${COLORS.crossRed}`, color: COLORS.crossRed, fontFamily: FONT.sans, fontWeight: 900, fontSize: 44, letterSpacing: 3, padding: "8px 26px", borderRadius: 12, background: "rgba(255,255,255,0.25)" }}>
          {stamp}
        </div>
      </div>
    </Holder>
  );
};

// RESUME — ATS scanner UI rejecting on missing credentials
export const ATSOverlay: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const scan = interpolate(frame % 60, [0, 60], [0, 100]);
  const rejectOp = interpolate(frame, [40, 54], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <Holder pos="left" dur={dur}>
      <Card w={520} accent={COLORS.crossRed} glass>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <div style={{ width: 12, height: 12, borderRadius: 6, background: "#ff5f57" }} />
          <div style={{ width: 12, height: 12, borderRadius: 6, background: "#febc2e" }} />
          <div style={{ width: 12, height: 12, borderRadius: 6, background: "#28c840" }} />
          <span style={{ ...W, fontWeight: 700, fontSize: 18, opacity: 0.7, marginLeft: 8 }}>Applicant Review</span>
        </div>
        <div style={{ position: "relative", background: "rgba(255,255,255,0.96)", borderRadius: 10, padding: 18, overflow: "hidden" }}>
          {["Cover letter", "Resume template", "Strong grades"].map((r) => (
            <div key={r} style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ fontFamily: FONT.sans, fontWeight: 700, color: "#3a424d", fontSize: 19 }}>{r}</span>
              <CheckIcon size={22} />
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 6, borderTop: "1px solid #e7ebf1" }}>
            <span style={{ fontFamily: FONT.sans, fontWeight: 800, color: COLORS.crossRed, fontSize: 19 }}>Real experience</span>
            <CrossIcon size={22} />
          </div>
          <div style={{ position: "absolute", top: 0, left: `${scan}%`, width: 3, height: "100%", background: "rgba(47,80,230,0.6)", boxShadow: "0 0 14px rgba(47,80,230,0.8)" }} />
        </div>
        <div style={{ marginTop: 14, textAlign: "center", opacity: rejectOp }}>
          <span style={{ background: COLORS.crossRed, color: "#fff", fontFamily: FONT.sans, fontWeight: 900, fontSize: 26, padding: "8px 24px", borderRadius: 10, letterSpacing: 1 }}>NOT HIRED</span>
        </div>
      </Card>
    </Holder>
  );
};

// kinetic centered serif lines (extracurricular / real results / risk)
export const Kinetic: React.FC<{ dur: number; lines: { t: string; hl?: boolean }[]; size?: number; pos?: Pos }> = ({ dur, lines, size = 78, pos = "center" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Holder pos={pos} dur={dur}>
      <div style={{ textAlign: "center" }}>
        {lines.map((l, i) => {
          const s = spring({ frame: frame - i * 7, fps, config: { damping: 150, stiffness: 150, mass: 0.6 } });
          const op = interpolate(s, [0, 1], [0, 1]);
          const y = interpolate(s, [0, 1], [26, 0]);
          return (
            <div key={i} style={{ ...SERIF, fontSize: size, lineHeight: 1.06, opacity: op, transform: `translateY(${y}px)`, color: l.hl ? COLORS.boxFill : "#fff", textShadow: "0 6px 26px rgba(0,0,0,0.5)" }}>
              {l.t}
            </div>
          );
        })}
      </div>
    </Holder>
  );
};

// icon row cards (no-shadowing / now-has trio / not-cert compare)
export const IconCards: React.FC<{ dur: number; title?: string; cards: { icon: keyof typeof I; label: string; type?: "check" | "cross"; delay: number }[]; pos?: Pos }> = ({ dur, title, cards, pos = "left" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Holder pos={pos} dur={dur}>
      <Card w={640} glass pad={30}>
        {title && <Kicker color={COLORS.boxFill}>{title}</Kicker>}
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: title ? 18 : 0 }}>
          {cards.map((c, i) => {
            const s = spring({ frame: frame - c.delay, fps, config: { damping: 180, stiffness: 150, mass: 0.6 } });
            const op = interpolate(s, [0, 1], [0, 1]);
            const x = interpolate(s, [0, 1], [24, 0]);
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, opacity: op, transform: `translateX(${x}px)`, background: "rgba(255,255,255,0.06)", borderRadius: 14, padding: "12px 16px" }}>
                <div style={{ width: 50, height: 50, borderRadius: 12, background: c.type === "cross" ? "rgba(211,47,47,0.2)" : "rgba(47,80,230,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Ico d={I[c.icon]} color={c.type === "cross" ? "#ff8a8a" : COLORS.boxFill} size={28} />
                </div>
                <span style={{ ...W, fontWeight: 700, fontSize: 27, flex: 1 }}>{c.label}</span>
                {c.type === "cross" ? <CrossIcon size={30} /> : <CheckIcon size={30} />}
              </div>
            );
          })}
        </div>
      </Card>
    </Holder>
  );
};

// roadmap path with nodes (training)
export const Roadmap: React.FC<{ dur: number; title: string; nodes: { icon: keyof typeof I; label: string; delay: number }[] }> = ({ dur, title, nodes }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Holder pos="left" dur={dur}>
      <Card w={680} pad={32}>
        <Kicker color={COLORS.boxFill}>{title}</Kicker>
        <div style={{ position: "relative", marginTop: 22, paddingLeft: 10 }}>
          <div style={{ position: "absolute", left: 34, top: 8, bottom: 8, width: 3, background: "rgba(255,255,255,0.18)" }} />
          {nodes.map((n, i) => {
            const s = spring({ frame: frame - n.delay, fps, config: { damping: 180, stiffness: 150, mass: 0.6 } });
            const op = interpolate(s, [0, 1], [0, 1]);
            const sc = interpolate(s, [0, 1], [0.6, 1]);
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: i < nodes.length - 1 ? 20 : 0, opacity: op }}>
                <div style={{ width: 50, height: 50, borderRadius: 25, background: COLORS.logoBlue, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${sc})`, flexShrink: 0, zIndex: 2, boxShadow: "0 0 16px rgba(47,80,230,0.6)" }}>
                  <Ico d={I[n.icon]} color="#fff" size={26} />
                </div>
                <span style={{ ...W, fontWeight: 700, fontSize: 28 }}>{n.label}</span>
              </div>
            );
          })}
        </div>
      </Card>
    </Holder>
  );
};

// match animation (internship): student card <-> company card connect
export const MatchOverlay: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const join = spring({ frame: frame - 16, fps, config: { damping: 150, stiffness: 120 } });
  const gap = interpolate(join, [0, 1], [60, 16]);
  const pulse = interpolate(frame % 40, [0, 20, 40], [0.4, 1, 0.4]);
  const chip = (label: string, icon: keyof typeof I) => (
    <div style={{ background: "rgba(255,255,255,0.95)", borderRadius: 16, padding: "18px 22px", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, width: 160 }}>
      <div style={{ width: 54, height: 54, borderRadius: 14, background: "rgba(47,80,230,0.16)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Ico d={I[icon]} color={COLORS.logoBlue} size={30} />
      </div>
      <span style={{ fontFamily: FONT.sans, fontWeight: 800, color: COLORS.navy, fontSize: 20 }}>{label}</span>
    </div>
  );
  return (
    <Holder pos="top" dur={dur}>
      <Card w={620} pad={26}>
        <div style={{ ...W, fontWeight: 800, fontSize: 24, textAlign: "center", marginBottom: 18 }}>Matched for a <span style={{ color: COLORS.boxFill }}>3-month internship</span></div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap }}>
          {chip("Your child", "trophy")}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", opacity: pulse }}>
            <Ico d={I.spark} color={COLORS.boxFill} size={34} />
          </div>
          {chip("Company", "brief")}
        </div>
      </Card>
    </Holder>
  );
};

// who-qualifies gate
export const GateOverlay: React.FC<{ dur: number; title: string; items: { label: string; delay: number }[] }> = ({ dur, title, items }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Holder pos="left" dur={dur}>
      <Card w={620} accent={COLORS.checkGreen} glass>
        <Kicker color={COLORS.boxFill}>{title}</Kicker>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 18 }}>
          {items.map((it, i) => {
            const s = spring({ frame: frame - it.delay, fps, config: { damping: 180, stiffness: 150, mass: 0.6 } });
            const op = interpolate(s, [0, 1], [0, 1]);
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, opacity: op }}>
                <CheckIcon size={38} />
                <span style={{ ...W, fontWeight: 700, fontSize: 30 }}>{it.label}</span>
              </div>
            );
          })}
        </div>
      </Card>
    </Holder>
  );
};

// selective funnel overlay
export const SelectiveOverlay: React.FC<{ dur: number }> = ({ dur }) => (
  <Holder pos="left" dur={dur}>
    <Card w={520} accent={COLORS.logoBlue} glass>
      <div style={{ ...W, fontWeight: 900, fontSize: 40, letterSpacing: 1, marginBottom: 4 }}>SELECTIVE</div>
      <div style={{ ...W, fontWeight: 600, fontSize: 24, opacity: 0.8, marginBottom: 10 }}>We don't accept everyone</div>
      <Funnel delay={6} topLabel="Many apply" bottomLabel="Few accepted" w={440} h={260} />
    </Card>
  </Holder>
);

// apply CTA bar (bottom)
export const ApplyOverlay: React.FC<{ dur: number; text: string }> = ({ dur, text }) => {
  const frame = useCurrentFrame();
  const pulse = 1 + 0.02 * Math.sin(frame / 6);
  const click = interpolate(frame % 50, [0, 8, 16], [1, 0.92, 1], { extrapolateRight: "clamp" });
  return (
    <Holder pos="top" dur={dur}>
      <div style={{ transform: `scale(${pulse * click})`, position: "relative", overflow: "hidden", background: COLORS.logoBlue, borderRadius: 16, padding: "18px 44px", boxShadow: "0 16px 44px rgba(36,64,189,0.6)", display: "flex", alignItems: "center", gap: 16 }}>
        <span style={{ ...W, fontWeight: 800, fontSize: 34 }}>{text}</span>
        <span style={{ ...W, fontWeight: 900, fontSize: 32 }}>↓</span>
        <ShineSweep period={70} />
      </div>
    </Holder>
  );
};

// limited spots badge (legacy, unused)
export const LimitedOverlay: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const pulse = interpolate(frame % 36, [0, 18, 36], [1, 1.05, 1]);
  return (
    <Holder pos="top" dur={dur}>
      <div style={{ transform: `scale(${pulse})`, background: COLORS.crossRed, borderRadius: 16, padding: "16px 40px", textAlign: "center", boxShadow: "0 16px 44px rgba(211,47,47,0.5)" }}>
        <div style={{ ...W, fontWeight: 900, fontSize: 42, letterSpacing: 1 }}>LIMITED SPOTS</div>
        <div style={{ ...W, fontWeight: 600, fontSize: 22, opacity: 0.9 }}>Only a few each cohort</div>
      </div>
    </Holder>
  );
};

// BRANDED END CARD — sign-off after the VO ends (with SFX in the main comp)
export const EndCard: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logoS = spring({ frame: frame - 2, fps, config: { damping: 130, stiffness: 130, mass: 0.9 } });
  const logoSc = interpolate(logoS, [0, 1], [0.3, 1]);
  const logoRot = interpolate(logoS, [0, 1], [-30, 0]);
  const word = interpolate(frame, [14, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const wordY = interpolate(frame, [14, 30], [24, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const divider = interpolate(frame, [26, 42], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const tag = interpolate(frame, [36, 52], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const url = interpolate(frame, [46, 62], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const float = Math.sin(frame / 30) * 6;
  return (
    <AbsoluteFill style={{ opacity: interpolate(frame, [0, 8], [0, 1], { extrapolateRight: "clamp" }) }}>
      <MeshBG tone="navy" />
      <ParticleField count={50} color="rgba(120,150,235,0.55)" opacity={0.6} />
      <Spotlight x={50} y={42} size={48} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ textAlign: "center", transform: `translateY(${float}px)` }}>
          <div style={{ transform: `scale(${logoSc}) rotate(${logoRot}deg)`, display: "flex", justifyContent: "center", marginBottom: 26 }}>
            <LogoChip size={170} radius={36} />
          </div>
          <div style={{ ...W, fontWeight: 900, fontSize: 96, letterSpacing: -2, opacity: word, transform: `translateY(${wordY}px)` }}>Matchtern</div>
          <div style={{ width: divider * 360, height: 3, background: COLORS.stripeBlue, margin: "20px auto", borderRadius: 2 }} />
          <div style={{ ...SERIF, fontSize: 38, opacity: tag }}>Make your child a <span style={{ color: COLORS.boxFill }}>standout</span> applicant.</div>
          <div style={{ marginTop: 26, display: "inline-block", position: "relative", overflow: "hidden", borderRadius: 14, opacity: url }}>
            <div style={{ background: COLORS.logoBlue, color: "#fff", fontFamily: FONT.sans, fontWeight: 800, fontSize: 32, padding: "16px 44px", boxShadow: "0 14px 40px rgba(36,64,189,0.6)" }}>
              matchtern.org
            </div>
            <ShineSweep period={80} />
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* ===================== NEW / UPGRADED GRAPHICS ===================== */

// inline icon helper (stroke)
const Sico: React.FC<{ d: string; color?: string; size?: number; fill?: string }> = ({ d, color = "#fff", size = 30, fill = "none" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
);
const PATH = {
  cap: "M2 8l10-4 10 4-10 4z M6 10v5c0 1.5 3 3 6 3s6-1.5 6-3v-5 M22 8v6",
  brief: "M3 8h18v12H3z M8 8V5h8v3 M3 13h18",
  up: "M3 17l6-6 4 4 8-8 M21 7v6 M21 7h-6",
  dollar: "M12 2v20 M17 6c0-2-2.5-3-5-3s-5 1-5 3.5S9 10 12 10s5 1 5 3.5S14.5 21 12 21s-5-1-5-3",
  bldg: "M4 21V5l8-3 8 3v16 M9 9h2 M13 9h2 M9 13h2 M13 13h2 M9 17h2 M13 17h2",
  team: "M9 11a3 3 0 100-6 3 3 0 000 6z M2 20c0-3.5 3-5 7-5s7 1.5 7 5 M17 11a3 3 0 100-6 M16 15c3 .5 5 2 5 5",
  shield: "M12 2l8 3v6c0 5-3.5 8-8 11-4.5-3-8-6-8-11V5z",
  shieldCheck: "M12 2l8 3v6c0 5-3.5 8-8 11-4.5-3-8-6-8-11V5z M8.5 11.5l2.5 2.5 5-5",
};

// DECIDING FACTOR — right card, experience is the missing piece (≈0:34–0:38)
export const DecidingFactorOverlay: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const rows = [
    { label: "Top grades", ok: true, delay: 4 },
    { label: "High SAT", ok: true, delay: 12 },
    { label: "A great essay", ok: true, delay: 20 },
    { label: "Meaningful extracurriculars", ok: false, delay: 34 },
  ];
  return (
    <Holder pos="right" dur={dur}>
      <Card w={540} accent={COLORS.crossRed} glass>
        <Kicker color={COLORS.boxFill}>What actually decides it</Kicker>
        <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
          {rows.map((r, i) => {
            const op = interpolate(frame, [r.delay, r.delay + 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", opacity: op, background: r.ok ? "rgba(255,255,255,0.06)" : "rgba(211,47,47,0.18)", borderRadius: 12, padding: "12px 18px", border: r.ok ? "none" : `1px solid ${COLORS.crossRed}` }}>
                <span style={{ ...W, fontWeight: 700, fontSize: 24 }}>{r.label}</span>
                {r.ok ? <CheckIcon size={30} /> : <CrossIcon size={32} />}
              </div>
            );
          })}
        </div>
        <div style={{ ...W, fontWeight: 800, fontSize: 22, color: "#ff9a9a", marginTop: 14, textAlign: "center" }}>Without one, they won't stand out</div>
      </Card>
    </Holder>
  );
};

// STANDOUT EXTRACURRICULAR — one bar rises and glows above a flat baseline (≈0:51)
export const StandoutBarsOverlay: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const rise = interpolate(frame, [4, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const heights = [40, 46, 42, 150, 44, 48, 41]; // index 3 is the standout
  return (
    <Holder pos="left" dur={dur}>
      <Card w={560} accent={COLORS.logoBlueBright}>
        <Kicker color={COLORS.boxFill}>What makes them stand out</Kicker>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 14, height: 190, marginTop: 18 }}>
          {heights.map((h, i) => {
            const isStar = i === 3;
            const hh = isStar ? 60 + (h - 60) * rise : h;
            return (
              <div key={i} style={{ width: 40, height: hh, borderRadius: 8, background: isStar ? COLORS.logoBlueBright : "rgba(255,255,255,0.22)", filter: isStar ? "drop-shadow(0 0 16px rgba(47,80,230,0.9))" : "none", position: "relative" }}>
                {isStar && rise > 0.6 && <div style={{ position: "absolute", top: -34, left: "50%", transform: "translateX(-50%)" }}><Sico d={PATH.up} color={COLORS.boxFill} size={28} /></div>}
              </div>
            );
          })}
        </div>
        <div style={{ ...W, fontWeight: 800, fontSize: 28, textAlign: "center", marginTop: 14 }}>A standout <span style={{ color: COLORS.boxFill }}>extracurricular</span></div>
      </Card>
    </Holder>
  );
};

// REAL TRIAD — company / team / results pillars (≈1:48)
export const RealTriadOverlay: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const items: { icon: keyof typeof PATH; t: string }[] = [
    { icon: "bldg", t: "Real company" },
    { icon: "team", t: "Real team" },
    { icon: "up", t: "Real results" },
  ];
  return (
    <Holder pos="top" dur={dur}>
      <div style={{ display: "flex", gap: 26 }}>
        {items.map((it, i) => {
          const s = spring({ frame: frame - i * 9, fps, config: { damping: 150, stiffness: 150, mass: 0.6 } });
          const op = interpolate(s, [0, 1], [0, 1]);
          const y = interpolate(s, [0, 1], [40, 0]);
          return (
            <div key={i} style={{ opacity: op, transform: `translateY(${y}px)`, width: 230, background: "linear-gradient(160deg,#0a356b,#021f3c)", borderRadius: 20, padding: "30px 22px", textAlign: "center", border: "1px solid rgba(255,255,255,0.14)", boxShadow: "0 22px 56px rgba(0,0,0,0.5)" }}>
              <div style={{ width: 74, height: 74, borderRadius: 18, background: "rgba(47,80,230,0.22)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                <Sico d={PATH[it.icon]} color={COLORS.boxFill} size={40} />
              </div>
              <div style={{ ...W, fontWeight: 800, fontSize: 28 }}>{it.t}</div>
            </div>
          );
        })}
      </div>
    </Holder>
  );
};

// LIFE BENEFITS — compounding advantage over a lifetime (≈2:16)
export const LifeBenefitsScene: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const milestones = [
    { x: 0.10, y: 0.74, icon: "cap" as const, t: "Into a better university", delay: 14 },
    { x: 0.38, y: 0.56, icon: "brief" as const, t: "Stronger first job offers", delay: 36 },
    { x: 0.64, y: 0.36, icon: "up" as const, t: "Faster promotions", delay: 58 },
    { x: 0.88, y: 0.16, icon: "dollar" as const, t: "Higher lifetime earnings", delay: 80 },
  ];
  const cw = 1280, ch = 560;
  return (
    <Scene dur={dur} tone="navy" towers>
      <div style={{ textAlign: "center" }}>
        <div style={{ ...SERIF, fontSize: 50, marginBottom: 4 }}>It compounds for the rest of their life</div>
        <div style={{ ...W, fontWeight: 600, fontSize: 26, color: COLORS.boxFill, marginBottom: 14 }}>A better university, and bigger financial rewards for decades</div>
        <div style={{ position: "relative", width: cw, height: ch }}>
          <svg width={cw} height={ch} viewBox={`0 0 ${cw} ${ch}`} style={{ position: "absolute", inset: 0 }}>
            <defs>
              <linearGradient id="life" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={COLORS.logoBlueBright} stopOpacity="0.5" />
                <stop offset="100%" stopColor={COLORS.logoBlueBright} stopOpacity="0.02" />
              </linearGradient>
            </defs>
            {(() => {
              const N = 90;
              const t = interpolate(frame, [6, 80], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              const drawn = Math.max(2, Math.floor(N * t));
              const pts: [number, number][] = [];
              for (let i = 0; i <= N; i++) { const x = i / N; pts.push([x * cw, ch - 30 - Math.pow(x, 1.8) * (ch - 90)]); }
              const seg = pts.slice(0, drawn);
              const line = seg.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
              const area = line + ` L${seg[seg.length - 1][0].toFixed(1)},${ch} L0,${ch} Z`;
              return (<><path d={area} fill="url(#life)" /><path d={line} fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" /></>);
            })()}
          </svg>
          {milestones.map((m, i) => {
            const op = interpolate(frame, [m.delay, m.delay + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const sc = interpolate(frame, [m.delay, m.delay + 12], [0.6, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <div key={i} style={{ position: "absolute", left: m.x * cw, top: m.y * ch, transform: `translate(-50%,-50%) scale(${sc})`, opacity: op, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <div style={{ width: 64, height: 64, borderRadius: 32, background: COLORS.logoBlue, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 20px rgba(47,80,230,0.7)", border: "3px solid #fff" }}>
                  <Sico d={PATH[m.icon]} color="#fff" size={32} />
                </div>
                <div style={{ background: "rgba(3,20,40,0.85)", borderRadius: 10, padding: "6px 14px", ...W, fontWeight: 700, fontSize: 22, whiteSpace: "nowrap" }}>{m.t}</div>
              </div>
            );
          })}
        </div>
      </div>
    </Scene>
  );
};

// MONEY-BACK guarantee — finance seal with shield + dollar + return arrow (≈2:58)
export const MoneyBackScene: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 150, stiffness: 120, mass: 0.8 } });
  const sc = interpolate(s, [0, 1], [0.7, 1]);
  const arc = interpolate(frame, [10, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <Scene dur={dur} tone="navy">
      <div style={{ display: "flex", alignItems: "center", gap: 64 }}>
        <div style={{ position: "relative", transform: `scale(${sc})`, width: 300, height: 300 }}>
          {/* return arrow ring */}
          <svg width="300" height="300" viewBox="0 0 300 300" style={{ position: "absolute", inset: 0 }}>
            <circle cx="150" cy="150" r="138" fill="none" stroke="rgba(31,158,71,0.25)" strokeWidth="10" />
            <path d={`M150 12 A138 138 0 ${arc > 0.5 ? 1 : 0} 1 ${150 + 138 * Math.sin(arc * 2 * Math.PI)} ${150 - 138 * Math.cos(arc * 2 * Math.PI)}`} fill="none" stroke={COLORS.checkGreen} strokeWidth="10" strokeLinecap="round" />
            <polygon points="150,0 138,20 162,20" fill={COLORS.checkGreen} />
          </svg>
          {/* shield with dollar */}
          <div style={{ position: "absolute", inset: 44, borderRadius: "50%", background: "radial-gradient(circle at 38% 32%, #1f9e47, #0d5e29)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", boxShadow: "inset 0 0 24px rgba(0,0,0,0.35), 0 0 50px rgba(31,158,71,0.5)", overflow: "hidden" }}>
            <ShineSweep period={70} angle={25} />
            <Sico d={PATH.dollar} color="#fff" size={64} />
            <div style={{ ...W, fontWeight: 900, fontSize: 30, marginTop: 6 }}>100%</div>
            <div style={{ ...W, fontWeight: 800, fontSize: 18, letterSpacing: 1, opacity: 0.95 }}>MONEY-BACK</div>
          </div>
        </div>
        <div style={{ maxWidth: 560, textAlign: "left" }}>
          <div style={{ ...SERIF, fontSize: 56 }}>Risk-free,<br />money-back guarantee</div>
          <div style={{ ...W, fontWeight: 600, fontSize: 28, opacity: 0.85, marginTop: 16 }}>
            For the entire program. Not satisfied at any point, and every dollar comes back.
          </div>
        </div>
      </div>
    </Scene>
  );
};

// RISK SHIELD — left card, clears the presenter's face (≈3:05)
export const RiskShieldOverlay: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const pulse = 1 + 0.04 * Math.sin(frame / 8);
  return (
    <Holder pos="left" dur={dur}>
      <Card w={560} accent={COLORS.logoBlueBright} glass>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ width: 100, height: 100, flexShrink: 0, transform: `scale(${pulse})` }}>
            <svg width="100" height="100" viewBox="0 0 24 24" style={{ filter: "drop-shadow(0 0 18px rgba(47,80,230,0.9))" }}>
              <path d={PATH.shield} fill={COLORS.logoBlueBright} stroke="#fff" strokeWidth="0.6" />
              <path d="M8.5 12l2.5 2.5 5-5" fill="none" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div style={{ ...SERIF, fontSize: 46, lineHeight: 1.12 }}>We take on the <span style={{ color: COLORS.boxFill }}>risk</span></div>
        </div>
      </Card>
    </Holder>
  );
};

// LIMITED SEATS — grid of seats, most filled, few remaining + counter (≈3:09)
export const LimitedSeatsOverlay: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const cols = 6, rows = 3, total = cols * rows;
  const open = 3; // remaining
  return (
    <Holder pos="left" dur={dur}>
      <Card w={480} accent={COLORS.crossRed} glass pad={28}>
        <div style={{ ...W, fontWeight: 900, fontSize: 30, letterSpacing: 1 }}>LIMITED SPOTS</div>
        <div style={{ ...W, fontWeight: 700, fontSize: 20, color: "#ff9a9a", marginBottom: 16 }}>This cohort is almost full</div>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols},1fr)`, gap: 12 }}>
          {Array.from({ length: total }).map((_, i) => {
            const isOpen = i >= total - open;
            const fillFrame = i * 1.8;
            const op = interpolate(frame, [fillFrame, fillFrame + 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const blink = isOpen ? interpolate(frame % 30, [0, 15, 30], [0.5, 1, 0.5]) : 1;
            return (
              <div key={i} style={{ opacity: isOpen ? blink : op, display: "flex", justifyContent: "center" }}>
                <Sico d={PATH.team} color={isOpen ? COLORS.crossRed : "rgba(120,150,235,0.95)"} size={42} fill={isOpen ? "none" : "rgba(47,80,230,0.3)"} />
              </div>
            );
          })}
        </div>
        <div style={{ ...W, fontWeight: 800, fontSize: 24, textAlign: "center", marginTop: 16 }}>Only <span style={{ color: "#ff9a9a" }}>{open} spots</span> left</div>
      </Card>
    </Holder>
  );
};
