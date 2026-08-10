import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { inter, fraunces } from "./fonts";
import {
  Bg, Panel, ProgressBar, ScreenHead, Handle, Caption, Mascot,
  SlopBrick, Bubble, BigPhone, HumanMeter, RobotRig, Confetti, Star,
  CREAM, INK, CLAY, RED, GREEN, MUTE, CO, GOLD, SKY, PINK, MONO, grad, hexA, over,
} from "./SlopKit";

/* The dark Panel is the STAGE; animated clay-mascot scenes live inside it (panel-local 1012x792).
   These are ANIMATED hooks (characters + props + motion), not UI mockups. */

const Stage: React.FC<{ children: React.ReactNode; glow?: string }> = ({ children, glow }) => (
  <Panel glow={glow}>
    {/* a soft floor + spotlight so the clay characters read on the dark stage */}
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 300, background: "linear-gradient(180deg, transparent, rgba(0,0,0,0.35))" }} />
    <div style={{ position: "absolute", left: "50%", top: -60, width: 720, height: 620, transform: "translateX(-50%)", borderRadius: "50%", background: "radial-gradient(ellipse at 50% 40%, rgba(255,220,170,0.16), transparent 66%)", filter: "blur(20px)" }} />
    {children}
  </Panel>
);
const Floor: React.FC<{ cx: number; w?: number }> = ({ cx, w = 300 }) => (
  <div style={{ position: "absolute", left: cx - w / 2, top: 660, width: w, height: 40, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(0,0,0,0.5), transparent 70%)" }} />
);

/* ============ HOOK 1 — THE VOICEMAIL (warm hero) ============ */
export const Hook1: React.FC = () => {
  const f = useCurrentFrame();
  const bub = (i: number) => over(f, 20 + i * 16, 12);
  return (
    <AbsoluteFill>
      <Bg /><Handle /><ProgressBar />
      <ScreenHead lf={f} big="I made Claude leave a" clay="voicemail" chip="NO AI SLOP" chipColor={CLAY} />
      <Stage glow={hexA(CO, 0.34)}>
        {/* discarded grey slop bricks crumbling on the left */}
        <SlopBrick x={40} y={470} w={150} lines={5} rot={-12} o={0.55} />
        <SlopBrick x={70} y={560} w={130} lines={4} rot={8} o={0.4} />
        {/* the big phone recording a voicemail */}
        <BigPhone x={600} y={150} f={f} s={1.0} />
        {/* the mascot leaning in, delighted, talking into it */}
        <div style={{ position: "absolute", left: 300, top: 300, filter: "drop-shadow(0 12px 18px rgba(0,0,0,0.4))" }}><Mascot lf={f} size={330} cheer={0.5} gaze={1} nodSpeed={8} /></div>
        <Floor cx={430} w={320} />
        {/* messy human speech bubbles floating up */}
        <div style={{ opacity: bub(0), transform: `translateY(${(1 - bub(0)) * 20}px)` }}><Bubble x={250} y={220} text="umm, so…" s={1.05} c="#FAF9F5" rot={-4} /></div>
        <div style={{ opacity: bub(1), transform: `translateY(${(1 - bub(1)) * 20}px)` }}><Bubble x={470} y={150} text="what I meant was…" s={1.0} c="#FFF3E6" rot={3} /></div>
        <div style={{ opacity: bub(2), transform: `translateY(${(1 - bub(2)) * 20}px)` }}><Bubble x={150} y={340} text="like, hold on—" s={0.95} c="#FAF9F5" rot={-2} /></div>
        <Star x={560} y={120} s={0.9} o={0.6 + 0.4 * Math.abs(Math.sin(f / 6))} />
      </Stage>
      <Caption words={["don't", "let", "it", "write."]} hot={1} />
    </AbsoluteFill>
  );
};

/* ============ HOOK 2 — ROBOT UNMASKS (the AI sound peels off) ============ */
export const Hook2: React.FC = () => {
  const f = useCurrentFrame();
  const peel = over(f, 26, 30, Easing.inOut(Easing.cubic));   // robot rig lifts off
  return (
    <AbsoluteFill>
      <Bg /><Handle /><ProgressBar />
      <ScreenHead lf={f} big="The AI sound" clay="peels right off" chip="HUMAN MODE" chipColor={GREEN} />
      <Stage glow={hexA(GREEN, 0.26)}>
        {/* left: grey robotic slop it USED to write, dissolving */}
        <SlopBrick x={70} y={300} w={150} lines={6} o={0.5 * (1 - peel) + 0.12} rot={-6} />
        {/* the mascot, robot rig lifting off to reveal the warm face */}
        <div style={{ position: "absolute", left: 360, top: 250, filter: "drop-shadow(0 12px 18px rgba(0,0,0,0.4))" }}>
          <Mascot lf={f} size={360} cheer={peel * 0.5} nodSpeed={8} />
          {/* the robot rig slides up + fades as it peels off */}
          <div style={{ transform: `translateY(${-peel * 210}px) rotate(${peel * -18}deg)`, opacity: 1 - peel * 0.9 }}>
            <RobotRig x={124} y={70} f={f} s={1.5} />
          </div>
        </div>
        <Floor cx={540} w={330} />
        {/* right: warm human bubbles pour out once revealed */}
        <div style={{ opacity: peel }}><Bubble x={640} y={250} text="so, umm, honestly…" s={1.05} c="#FFF3E6" rot={4} /></div>
        <div style={{ opacity: over(f, 44, 12) }}><Bubble x={690} y={360} text="you know what I mean?" s={0.95} c="#FAF9F5" rot={-3} /></div>
        {peel > 0.6 && <Confetti f={f} x={560} y={300} start={48} n={18} />}
      </Stage>
      <Caption words={["it", "sounds", "human", "again."]} hot={2} />
    </AbsoluteFill>
  );
};

/* ============ HOOK 3 — SLOP FIREHOSE SHUTOFF ============ */
export const Hook3: React.FC = () => {
  const f = useCurrentFrame();
  const pull = over(f, 30, 10, Easing.out(Easing.back(2)));   // lever pull
  return (
    <AbsoluteFill>
      <Bg /><Handle /><ProgressBar />
      <ScreenHead lf={f} big="Shut off the" clay="slop machine" chip="STOP THE SLOP" chipColor={RED} />
      <Stage glow={hexA(RED, 0.24)}>
        {/* the AI WRITE machine spewing grey slop bricks (slowing as the lever is pulled) */}
        <div style={{ position: "absolute", left: 40, top: 120, width: 250, height: 250, borderRadius: 24, background: grad("#2A2E38", "#181B22"), border: "3px solid #3A404C", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 10 }}>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 34, color: MUTE, letterSpacing: 2 }}>AI WRITE</div>
          <div style={{ fontFamily: MONO, fontSize: 22, color: "#61E0FF", opacity: 1 - pull }}>generating…</div>
          {/* nozzle */}
          <div style={{ position: "absolute", right: -18, top: 150, width: 40, height: 40, background: "#3A404C", borderRadius: 8 }} />
        </div>
        {/* grey slop bricks falling into a bin */}
        {[0, 1, 2, 3].map((i) => <SlopBrick key={i} x={310 + i * 6} y={230 + i * 74} w={120} lines={3} rot={i % 2 ? 8 : -8} o={(1 - pull) * 0.9 + 0.1} />)}
        <div style={{ position: "absolute", left: 300, top: 560, width: 210, height: 120, borderRadius: "0 0 14px 14px", background: "#20242E", border: "3px solid #3A404C", borderTop: "none" }} />
        {/* the mascot yanking a big red lever */}
        <div style={{ position: "absolute", left: 640, top: 300, filter: "drop-shadow(0 12px 18px rgba(0,0,0,0.4))" }}><Mascot lf={f} size={300} stern={0.4} gaze={-1} nodSpeed={9} /></div>
        <div style={{ position: "absolute", left: 620, top: 260, transformOrigin: "50% 100%", transform: `rotate(${-40 + pull * 70}deg)` }}>
          <div style={{ width: 12, height: 130, background: "#8790A0", borderRadius: 6 }} />
          <div style={{ position: "absolute", left: -12, top: -20, width: 36, height: 36, borderRadius: "50%", background: RED, boxShadow: `0 0 14px ${hexA(RED, 0.6)}` }} />
        </div>
        <Floor cx={780} w={300} />
        {pull > 0.5 && <div style={{ opacity: over(f, 44, 10) }}><Bubble x={560} y={200} text="stop. talk instead." s={1.0} c="#FFF3E6" rot={-4} /></div>}
      </Stage>
      <Caption words={["your", "AI", "writing", "is", "slop."]} hot={4} />
    </AbsoluteFill>
  );
};

/* ============ HOOK 4 — THE HUMAN-O-METER ============ */
export const Hook4: React.FC = () => {
  const f = useCurrentFrame();
  const swing = over(f, 28, 26, Easing.inOut(Easing.cubic));   // needle SLOP -> HUMAN
  return (
    <AbsoluteFill>
      <Bg /><Handle /><ProgressBar />
      <ScreenHead lf={f} big="Even the detector says" clay="human" chip="AI CHECK" chipColor={GREEN} />
      <Stage glow={hexA(GREEN, 0.28)}>
        <div style={{ position: "absolute", left: 296, top: 150 }}><HumanMeter x={0} y={0} val={swing} s={1.0} /></div>
        {/* the voicemail card the mascot just fed in */}
        <div style={{ position: "absolute", left: 120, top: 440, width: 190, transform: "rotate(-6deg)", padding: "16px", borderRadius: 14, background: "#FFF3E6", boxShadow: "0 8px 18px rgba(0,0,0,0.3)" }}>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 20, color: CO, marginBottom: 8 }}>▶ voicemail.m4a</div>
          {[0, 1, 2].map((i) => <div key={i} style={{ height: 6, borderRadius: 3, marginBottom: 8, width: i === 2 ? "60%" : "100%", background: "#E4D8C6" }} />)}
        </div>
        {/* mascot cheering at the result */}
        <div style={{ position: "absolute", left: 620, top: 380, filter: "drop-shadow(0 12px 18px rgba(0,0,0,0.4))" }}><Mascot lf={f} size={300} cheer={swing * 0.7} shock={0} nodSpeed={8} /></div>
        <Floor cx={760} w={300} />
        {swing > 0.7 && <Confetti f={f} x={506} y={280} start={54} n={22} />}
        <Star x={470} y={130} s={1.0} o={swing} /><Star x={560} y={110} s={0.7} o={swing} />
      </Stage>
      <Caption words={["it", "passes", "as", "human."]} hot={3} />
    </AbsoluteFill>
  );
};

/* ============ HOOK 5 — SLOP MOUNTAIN vs VOICEMAIL ============ */
export const Hook5: React.FC = () => {
  const f = useCurrentFrame();
  const toss = over(f, 24, 16, Easing.inOut(Easing.cubic));
  return (
    <AbsoluteFill>
      <Bg /><Handle /><ProgressBar />
      <ScreenHead lf={f} big="Trash the" clay="AI slop" chip="COMMENT SLOP" chipColor={CLAY} />
      <Stage glow={hexA(CO, 0.3)}>
        {/* a mountain of identical grey slop bricks being shoved toward a shredder */}
        {[[60, 470, -8], [120, 400, 6], [70, 330, -3], [180, 460, 4], [150, 380, -6], [220, 430, 8]].map(([x, y, r], i) => (
          <SlopBrick key={i} x={x + toss * 40} y={y} w={130} lines={4} rot={r as number} o={0.9 - toss * 0.5} />
        ))}
        {/* shredder */}
        <div style={{ position: "absolute", left: 300, top: 560, width: 260, height: 90, borderRadius: 12, background: "#20242E", border: "3px solid #3A404C", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
          {Array.from({ length: 12 }, (_, i) => <div key={i} style={{ width: 8, height: 40, background: "#12141B" }} />)}
        </div>
        {/* the mascot holding up a phone with a warm waveform */}
        <div style={{ position: "absolute", left: 640, top: 320, filter: "drop-shadow(0 12px 18px rgba(0,0,0,0.4))" }}><Mascot lf={f} size={300} cheer={0.35} gaze={-1} nodSpeed={8} /></div>
        <div style={{ position: "absolute", left: 820, top: 250, width: 120, height: 210, borderRadius: 20, background: "#0B0C12", border: "6px solid #23262F", boxShadow: "0 10px 22px rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width={90} height={70}>{Array.from({ length: 12 }, (_, i) => { const h = 8 + Math.abs(Math.sin(i + f / 4)) * 52; return <rect key={i} x={i * 7} y={35 - h / 2} width={3.5} height={h} rx={2} fill={CO} />; })}</svg>
        </div>
        <Floor cx={780} w={300} />
      </Stage>
      <Caption words={["kill", "the", "robot", "voice."]} hot={2} />
    </AbsoluteFill>
  );
};
