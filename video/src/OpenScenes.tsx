import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing, Img, staticFile } from "remotion";
import { inter, fraunces } from "./fonts";
import {
  Bg, Panel, ProgressBar, SectionHeader, HookHeader, Mascot,
  INK, CLAY, RED, GREEN, MUTE, CO, GOLD, SKY, MONO, grad, hexA,
} from "./SlopKit";
import {
  ArcadeRoom, Cabinet, Prize, Meter, Bar, Bubble, FeedTile, GuideCard, GithubPage, REPOS,
  PINK, PURPLE, CAB_R, CAB_RD,
} from "./OpenArcade";
import { DemoCaveman, DemoTaste, DemoAgency, DemoMemory, DemoFeeds, DemoMontage, DemoOrca } from "./OpenDemos";

/* =========================================================================
   REEL 79 "OPEN" — SCENES. Every tool scene runs the same two-beat screen:
   the REAL GitHub repo page paints in (real owner/stars/description pulled
   from the API), then the screen FLIPS in 3D to a demo of what it does,
   while the diorama around the cabinet keeps moving.
   ========================================================================= */

const OUT = Easing.out(Easing.cubic), IO = Easing.inOut(Easing.cubic), BACK = Easing.out(Easing.back(1.6));
const E = (f: number, a: number, b: number, va = 0, vb = 1, ez: any = OUT) =>
  // guard: remotion throws if the input range collapses, which is easy to hit when a
  // scene's flip frame is early and a lead-in is computed relative to it.
  b <= a ? (f >= b ? vb : va)
         : interpolate(f, [a, b], [va, vb], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ez });
const osc = (f: number, period: number, amp = 1, phase = 0) => Math.sin(f / period + phase) * amp;

/* a smooth 3D card flip between the GitHub page and the demo */
const Flip: React.FC<{ p: number; front: React.ReactNode; back: React.ReactNode }> = ({ p, front, back }) => {
  const rot = p * 180;
  return (
    <div style={{ position: "absolute", inset: 0, perspective: 1100 }}>
      <div style={{ position: "absolute", inset: 0, transform: `rotateY(${rot}deg)`, backfaceVisibility: "hidden", transformStyle: "preserve-3d" }}>{front}</div>
      <div style={{ position: "absolute", inset: 0, transform: `rotateY(${rot - 180}deg)`, backfaceVisibility: "hidden", transformStyle: "preserve-3d" }}>{back}</div>
    </div>
  );
};

/* scanlines + flicker so every cabinet screen reads as a real CRT */
const Crt: React.FC<{ f: number }> = () => (
  <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
    <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(180deg, rgba(26,24,19,0.05) 0 2px, transparent 2px 4px)" }} />
    <div style={{ position: "absolute", left: -60, top: -30, width: 130, bottom: -30, background: "rgba(255,255,255,0.14)", transform: "rotate(14deg)" }} />
  </div>
);

/* the prize that pops out of a cabinet when its repo is won */
const WonPrize: React.FC<{ f: number; at: number; x: number; y: number }> = ({ f, at, x, y }) => {
  const p = E(f, at, at + 22, 0, 1, BACK);
  if (p <= 0.001) return null;
  const rise = E(f, at, at + 34, 0, -46, OUT);
  return (
    <div style={{ position: "absolute", left: x, top: y + rise, transform: `scale(${p})`, transformOrigin: "50% 100%" }}>
      <Prize x={0} y={0} s={1.05} lit rot={osc(f, 16, 6)} />
      {Array.from({ length: 8 }, (_, i) => {
        const t = Math.max(0, Math.min(1, (f - at) / 30));
        const a = (i / 8) * Math.PI * 2;
        return <div key={i} style={{ position: "absolute", left: 32 + Math.cos(a) * t * 74, top: 32 + Math.sin(a) * t * 74, fontSize: 18, color: GOLD, opacity: 1 - t }}>{"★"}</div>;
      })}
    </div>
  );
};

/* a compact repo chip used by the hook's fast preview flip */
const RepoChip: React.FC<{ k: string; f: number }> = ({ k, f }) => {
  const r = REPOS[k];
  return (
    <div style={{ width: 300, height: 400, borderRadius: 16, background: "#fff", border: `4px solid ${GOLD}`, overflow: "hidden", boxShadow: "0 10px 22px rgba(26,24,19,0.34)" }}>
      <div style={{ height: 34, background: "#24292f", display: "flex", alignItems: "center", padding: "0 10px", gap: 7 }}>
        <Img src={staticFile("logos/github.svg")} style={{ width: 19, height: 19, filter: "invert(1)" }} />
        <div style={{ flex: 1, height: 16, borderRadius: 4, background: "#2f363d" }} />
      </div>
      <div style={{ padding: 12 }}>
        <Img src={staticFile(`gh/${r.key}.png`)} style={{ width: 44, height: 44, borderRadius: "50%" }} />
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 19, color: "#0969da", marginTop: 8, lineHeight: 1.1 }}>{r.name}</div>
        <div style={{ fontFamily: inter.fontFamily, fontSize: 12, color: "#59636e", marginTop: 6, lineHeight: 1.35, height: 66, overflow: "hidden" }}>{r.desc}</div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 8, padding: "5px 11px", borderRadius: 7, border: "1px solid #d1d9e0", background: "#f6f8fa" }}>
          <span style={{ color: "#eac54f", fontSize: 14 }}>{"★"}</span>
          <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 14, color: "#1F2328" }}>{(r.stars / 1000).toFixed(1)}k</span>
        </div>
        <div style={{ display: "flex", gap: 5, marginTop: 10, flexWrap: "wrap" }}>
          {r.topics.slice(0, 3).map((t) => <span key={t} style={{ padding: "2px 8px", borderRadius: 999, background: "#ddf4ff", color: "#0969da", fontFamily: inter.fontFamily, fontSize: 10, fontWeight: 700 }}>{t}</span>)}
        </div>
        {/* file rows + install line so the card is a real repo, not a half-empty tile */}
        <div style={{ marginTop: 12, borderTop: "2px solid #E4DED1", paddingTop: 9 }}>
          {r.files.slice(0, 3).map(([n], i) => (
            <div key={n} style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 7 }}>
              <span style={{ fontSize: 11 }}>{n.includes(".") ? "\ud83d\udcc4" : "\ud83d\udcc1"}</span>
              <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 700, color: "#3A342A" }}>{n}</span>
              <div style={{ flex: 1, height: 6, borderRadius: 3, background: "#E4DED1" }} />
            </div>
          ))}
        </div>
        <div style={{ marginTop: 6, padding: "7px 9px", borderRadius: 7, background: "#2B2620", display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontFamily: MONO, fontSize: 10, color: "#7FD1A4" }}>$</span>
          <span style={{ fontFamily: MONO, fontSize: 10, color: "#E4DCCB" }}>git clone {r.owner}/{r.name}</span>
        </div>
        <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: r.langColor, display: "inline-block" }} />
          <span style={{ fontFamily: inter.fontFamily, fontSize: 10, fontWeight: 700, color: "#59636e" }}>{r.lang}</span>
          <span style={{ fontFamily: inter.fontFamily, fontSize: 10, color: "#8A8172" }}>{r.license}</span>
        </div>
      </div>
    </div>
  );
};

/* ============ S0 · HOOK ============================================
   Gate A pattern interrupt. Frame 0 is COMPLETE (claw already gripping a
   prize). At f14 the grip SLIPS and the prize CRASHES — hard camera shake,
   cabinet squash, coins jump, MISS stamp. f30 whip-pan right, f44 the free
   crate BURSTS. f62 a fast flip through all 7 real repos. Something new
   every ~0.4s through the first three seconds.
   ================================================================== */
export const S0Hook: React.FC = () => {
  const f = useCurrentFrame();
  const KEYS = ["caveman", "uiux", "agency", "memory", "last30", "montage", "orca"];

  const SLAM = 14, PAN = 30, BURST = 44, FLIP_IN = 60, FLIP_OUT = 138;
  // hard decaying camera shake off the impact
  const shakeAmt = Math.max(0, 1 - (f - SLAM) / 16);
  const shake = f >= SLAM && f < SLAM + 16 ? shakeAmt : 0;
  const shX = shake * Math.sin(f * 2.9) * 20;
  const shY = shake * Math.cos(f * 3.7) * 13;
  const squash = 1 + shake * 0.06;

  const drop = E(f, 4, SLAM, 0, 1, Easing.in(Easing.quad));   // the prize falls, accelerating
  const stamp = E(f, SLAM + 3, SLAM + 15, 0, 1, BACK);        // MISS slams on
  const pan = E(f, PAN, PAN + 14, 0, 1, IO);                  // whip-pan right
  const panBlur = Math.sin(Math.max(0, Math.min(1, (f - PAN) / 14)) * Math.PI) * 9;
  const burst = E(f, BURST, BURST + 16, 0, 1, BACK);
  const flip = E(f, FLIP_IN, FLIP_IN + 10, 0, 1, OUT) * (1 - E(f, FLIP_OUT, FLIP_OUT + 10, 0, 1, OUT));
  // arcade selector: HOLD on each card, then SNAP to the next with a little overshoot
  const STEP = 11;
  const raw = Math.max(0, (f - FLIP_IN) / STEP);
  const i0 = Math.floor(raw), frac = raw - i0;
  const ob = (t: number) => 1 + 2.9 * Math.pow(t - 1, 3) + 1.9 * Math.pow(t - 1, 2);
  const snap = frac < 0.55 ? 0 : ob(Math.min(1, (frac - 0.55) / 0.45));
  const pos = Math.min(6, i0 + snap);
  const STARS = [94.1, 111.3, 137.4, 25.9, 54.8, 43.6, 32.2];
  const starTotal = Math.round(STARS.slice(0, Math.min(7, Math.round(pos) + 1)).reduce((a, b) => a + b, 0));
  const spent = 2388 + Math.round(E(f, SLAM, SLAM + 10, 0, 49.99, OUT)) + (f > SLAM ? 0 : 0);

  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <HookHeader f={f + 12} big="STOP PAYING FOR" hot="7 FREE CLAUDE TOOLS" />
      <Panel glow={hexA(CO, 0.32)}>
        <div style={{ position: "absolute", inset: 0, transform: `translate(${shX - pan * 172}px, ${shY}px) scale(${squash})`, transformOrigin: "50% 60%", filter: panBlur > 0.4 ? `blur(${panBlur}px)` : undefined }}>
          {/* painted backdrop wider than the panel so the whip-pan never exposes a void */}
          <div style={{ position: "absolute", left: -60, top: 0, width: 1420, bottom: 0, background: "#3E4E5C" }} />
          <div style={{ position: "absolute", left: -60, top: 0, width: 1420, height: 150, background: "#48596A" }} />
          <div style={{ position: "absolute", left: -60, top: 596, width: 1420, bottom: 0, background: "#7A4A3E" }} />
          <div style={{ position: "absolute", left: -60, top: 596, width: 1420, height: 10, background: "#5E362D" }} />
          <ArcadeRoom f={f} shift={osc(f, 90, 26)} />

          {/* ---------- the paid claw machine ---------- */}
          <div style={{ position: "absolute", left: 22, top: 118, width: 404, height: 566, transform: `scaleY(${1 - shake * 0.05}) scaleX(${1 + shake * 0.04})`, transformOrigin: "50% 100%" }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: 16, background: CAB_R, border: `6px solid ${CAB_RD}`, boxShadow: "0 20px 38px rgba(26,24,19,0.46)" }} />
            <div style={{ position: "absolute", left: 6, top: 6, right: 6, height: 12, borderRadius: "10px 10px 0 0", background: "rgba(255,255,255,0.16)" }} />
            <div style={{ position: "absolute", left: 14, top: 12, right: 14, height: 68, borderRadius: 10, background: "#F7F5F0", border: `5px solid ${GOLD}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "inset 0 -5px 0 rgba(26,24,19,0.12)" }}>
              <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 38, color: "#B8501F" }}>AI TOOLS</span>
            </div>
            {Array.from({ length: 8 }, (_, i) => <div key={i} style={{ position: "absolute", left: 24 + i * 50, top: 88, width: 13, height: 13, borderRadius: "50%", background: Math.abs(Math.sin(f / 5 + i)) > 0.45 ? "#FFEFC0" : "#C79A3C", border: "2px solid #8A6A22" }} />)}
            {/* glass */}
            <div style={{ position: "absolute", left: 22, top: 112, right: 22, height: 318, borderRadius: 10, background: "#8FA6B4", border: `5px solid #4A2A26`, overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, background: "#6E8798" }} />
              <div style={{ position: "absolute", left: -70, top: -40, width: 150, bottom: -40, background: "rgba(255,255,255,0.18)", transform: "rotate(16deg)" }} />
              <div style={{ position: "absolute", left: 8, right: 8, top: 10, height: 9, borderRadius: 4, background: "#5A6B7A" }} />
              {/* the claw: gripping at frame 0, then OPEN after the slip */}
              <div style={{ position: "absolute", left: 168, top: 18, width: 6, height: 92, background: "#8697A6" }} />
              <div style={{ position: "absolute", left: 138, top: 106, width: 66, height: 22, borderRadius: 5, background: "#B7C4D0" }} />
              <div style={{ position: "absolute", left: 134, top: 124, width: 14, height: 56, background: "#8697A6", transform: `rotate(${f < SLAM ? 8 : 34}deg)`, transformOrigin: "50% 0%" }} />
              <div style={{ position: "absolute", left: 190, top: 124, width: 14, height: 56, background: "#8697A6", transform: `rotate(${f < SLAM ? -8 : -34}deg)`, transformOrigin: "50% 0%" }} />
              {/* the prize it drops */}
              <div style={{ position: "absolute", left: 152, top: 152 + drop * 128, transform: `rotate(${drop * 46}deg)` }}>
                <div style={{ width: 66, height: 66, borderRadius: 12, background: "#6C7A8C", border: "3px solid #4E5C6E", boxShadow: "0 8px 16px rgba(26,24,19,0.4)" }}>
                  <div style={{ position: "absolute", left: 0, right: 0, top: 27, height: 9, background: "#8A97A8" }} />
                  <div style={{ position: "absolute", left: 0, right: 0, top: 16, textAlign: "center", fontSize: 28 }}>{"🔒"}</div>
                </div>
              </div>
              {/* impact dust at the base */}
              {shake > 0 && Array.from({ length: 9 }, (_, i) => (
                <div key={i} style={{ position: "absolute", left: 120 + i * 22, top: 262 - (1 - shakeAmt) * 26, width: 20 + i % 3 * 8, height: 12, borderRadius: 8, background: "#B7C4D0", opacity: shakeAmt * 0.7 }} />
              ))}
              {/* heap */}
              {[[4, 216, 0.92], [72, 232, 0.86], [210, 234, 0.82], [272, 218, 0.9], [40, 178, 0.74]].map(([px, py, ps], i) => (
                <div key={i} style={{ position: "absolute", left: px as number, top: (py as number) + shake * Math.sin(f * 3 + i) * 5, width: 72 * (ps as number), height: 72 * (ps as number), borderRadius: 12, background: "#6C7A8C", border: "3px solid #4E5C6E" }}>
                  <div style={{ position: "absolute", left: 0, right: 0, top: "36%", textAlign: "center", fontSize: 24 }}>{"🔒"}</div>
                </div>
              ))}
              {/* the MISS stamp */}
              {stamp > 0.01 && (
                <div style={{ position: "absolute", left: 30, top: 96, transform: `scale(${0.4 + stamp * 0.6}) rotate(-13deg)`, opacity: Math.min(1, stamp * 1.4) }}>
                  <div style={{ padding: "8px 26px", borderRadius: 10, background: "#C44A3A", border: "5px solid #8E3125" }}>
                    <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 54, color: "#FBEDE6", letterSpacing: 3 }}>MISS</span>
                  </div>
                </div>
              )}
            </div>
            <div style={{ position: "absolute", left: 22, top: 444, right: 22, height: 60, borderRadius: 10, background: CAB_RD, border: "3px solid #4A2A26", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", boxShadow: "inset 0 4px 0 rgba(255,255,255,0.12)" }}>
              <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 30, color: "#FBEDE6" }}>$49.99</span>
              <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 18, color: "#F0C6BC", letterSpacing: 1 }}>PER GRAB</span>
            </div>
            <div style={{ position: "absolute", left: 22, top: 514, width: 232, height: 42, borderRadius: 8, background: "#F7F5F0", border: "3px solid #4A2A26", display: "flex", alignItems: "center", justifyContent: "center", gap: 9 }}>
              <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 14, color: "#8A8172" }}>SPENT</span>
              <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 26, color: "#C44A3A" }}>${spent.toLocaleString()}</span>
            </div>
          </div>

          {/* the mascot — coin in, then recoils on the slam */}
          <div style={{ position: "absolute", left: 404, top: 424 + shake * 8, filter: "drop-shadow(0 16px 22px rgba(26,24,19,0.5))" }}>
            <Mascot lf={f} size={228} shock={f < SLAM ? 0.15 : 0.72} gaze={-2} nodAmp={2} nodSpeed={12} />
          </div>
          {/* coins jumping off the stack on impact */}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} style={{ position: "absolute", left: 372 + (i % 2) * 5, top: 690 - i * 13 - shake * (14 + i * 4), width: 56, height: 18, borderRadius: "50%", background: "#E9B84A", border: "3px solid #A87C22", transform: `rotate(${shake * (i % 2 ? 16 : -16)}deg)` }} />
          ))}

          {/* ---------- the free crate, revealed by the pan, then BURSTING ---------- */}
          <div style={{ position: "absolute", left: 662, top: 396, width: 330, height: 250 }}>
            <div style={{ position: "absolute", left: -78, top: 62, width: 96, height: 178, borderRadius: 6, background: "#9A7346", border: "5px solid #4A3419", transform: `rotate(${-14 - burst * 16}deg) translateY(${-burst * 18}px)` }} />
            <div style={{ position: "absolute", left: 0, top: 62, width: 330, height: 178, borderRadius: 8, background: "#A87C4C", border: "5px solid #4A3419", boxShadow: "0 20px 38px rgba(26,24,19,0.46)" }}>
              <div style={{ position: "absolute", left: 0, right: 0, top: 8, height: 11, background: "#6E4A30" }} />
              <div style={{ position: "absolute", left: 0, right: 0, top: 44, textAlign: "center", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 33, letterSpacing: 2, color: "#3B2A12" }}>OPEN SOURCE</div>
              <div style={{ position: "absolute", left: 0, right: 0, top: 88, textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 52, color: "#2C7A5B" }}>FREE</div>
            </div>
            {/* prizes ERUPT upward out of the crate */}
            {[[14, -9], [100, 5], [190, 13], [258, -6], [56, 8], [222, -12]].map(([px, pr], i) => {
              const t = E(f, BURST + i * 3, BURST + 30 + i * 3, 0, 1, OUT);
              return (
                <div key={i} style={{ position: "absolute", left: (px as number) + (i - 2.5) * t * 26, top: 4 - t * (150 + (i % 3) * 54) + osc(f, 20, 5, i) }}>
                  <Prize x={0} y={0} s={1.02} lit rot={(pr as number) + t * 120} />
                </div>
              );
            })}
          </div>
        </div>

        {/* ---------- ARCADE ATTRACT MODE: a prize-select carousel of all 7 real repos.
             Not a smooth glide — it SNAPS card to card like a character-select screen,
             with a selector bracket, chase bulbs and a ticket counter racking up stars. */}
        {flip > 0.01 && (
          <div style={{ position: "absolute", inset: 0, opacity: flip }}>
            {/* warm painted cabinet interior, not a flat scrim */}
            <div style={{ position: "absolute", inset: 0, background: "#3E4E5C" }} />
            <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 210, background: "#48596A" }} />
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 190, background: "#7A4A3E" }} />
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 186, height: 10, background: "#5E362D" }} />

            {/* marquee band */}
            <div style={{ position: "absolute", left: 46, right: 46, top: 118, height: 62, borderRadius: 12, background: "#F7F5F0", border: `5px solid ${GOLD}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "inset 0 -5px 0 rgba(26,24,19,0.12)" }}>
              <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 34, color: "#B8501F", letterSpacing: 1 }}>SELECT YOUR TOOL</span>
              <span style={{ marginLeft: 16, padding: "4px 14px", borderRadius: 999, background: "#2C7A5B", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 18, color: "#F2FBF6" }}>ALL FREE</span>
            </div>

            {/* chase bulbs down both sides of the cabinet glass */}
            {[46, 966].map((bx) => Array.from({ length: 9 }, (_, i) => (
              <div key={`${bx}-${i}`} style={{ position: "absolute", left: bx, top: 190 + i * 52, width: 15, height: 15, borderRadius: "50%", background: Math.abs(Math.sin(f / 4 + i + (bx > 500 ? 1.6 : 0))) > 0.45 ? "#FFEFC0" : "#C79A3C", border: "2px solid #8A6A22" }} />
            )))}

            {/* the card track */}
            <div style={{ position: "absolute", left: 78, right: 78, top: 186, height: 452, overflow: "hidden" }}>
              <div style={{ position: "absolute", left: 0, right: 0, top: 214, height: 12, background: "#5A4636", borderRadius: 6 }} />
              <div style={{ position: "absolute", left: 292 - pos * 336, top: 8, display: "flex", gap: 36 }}>
                {KEYS.map((k, i) => {
                  const d = Math.abs(pos - i);
                  const on = d < 0.5;
                  return (
                    <div key={k} style={{ position: "relative", transform: `translateY(${on ? -10 : 8}px) scale(${on ? 1.0 : 0.86})`, opacity: on ? 1 : 0.82, transformOrigin: "50% 50%" }}>
                      <RepoChip k={k} f={f} />
                      {/* selector brackets on the highlighted card */}
                      {on && [[-14, -14, "6px 0 0 6px"], [286, -14, "0 6px 6px 0"]].map(([bxp, byp], q) => (
                        <React.Fragment key={q}>
                          <div style={{ position: "absolute", left: bxp as number, top: byp as number, width: 28, height: 8, background: GOLD }} />
                          <div style={{ position: "absolute", left: q ? (bxp as number) + 20 : bxp as number, top: byp as number, width: 8, height: 28, background: GOLD }} />
                          <div style={{ position: "absolute", left: bxp as number, top: 400, width: 28, height: 8, background: GOLD }} />
                          <div style={{ position: "absolute", left: q ? (bxp as number) + 20 : bxp as number, top: 380, width: 8, height: 28, background: GOLD }} />
                        </React.Fragment>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ticket counter racking up the combined stars */}
            <div style={{ position: "absolute", left: 0, right: 0, top: 654, display: "flex", justifyContent: "center", alignItems: "center", gap: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 11, padding: "10px 26px", borderRadius: 14, background: "#2B3440", border: `4px solid ${GOLD}` }}>
                <span style={{ fontSize: 28, color: GOLD }}>{"★"}</span>
                <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 34, color: "#FFEFC0" }}>{starTotal}k</span>
                <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 15, color: "#C0CBD6", letterSpacing: 2 }}>STARS</span>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                {KEYS.map((_, i) => (
                  <div key={i} style={{ width: 14, height: 14, borderRadius: "50%", background: i <= Math.round(pos) ? GOLD : "#8A7F6A", border: "2px solid rgba(26,24,19,0.35)" }} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* impact flash on the slam — a solid paper wash, no bloom */}
        {shake > 0.55 && <div style={{ position: "absolute", inset: 0, background: "#F7F5F0", opacity: (shake - 0.55) * 0.5 }} />}
      </Panel>
    </AbsoluteFill>
  );
};

/* ============ S1 · THE TURN — tens of thousands of stars ============ */
export const S1Turn: React.FC = () => {
  const f = useCurrentFrame();
  const pop = E(f, 2, 16, 0, 1, BACK);
  const count = Math.round(E(f, 6, 56, 0, 499, IO));
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <SectionHeader f={f} badge={<span style={{ fontSize: 44 }}>{"★"}</span>} l1="Every one has" l2={<span style={{ color: CLAY }}>tens of thousands of ★</span>} size={40} />
      <Panel glow={hexA(GOLD, 0.36)}>
        <ArcadeRoom f={f} shift={osc(f, 80, 20) + 40} />
        <div style={{ position: "absolute", left: 300, top: 120, width: 420, height: 520, background: `linear-gradient(180deg, ${hexA("#FFE9A8", 0.5)}, transparent 78%)`, clipPath: "polygon(36% 0%, 64% 0%, 100% 100%, 0% 100%)", filter: "blur(14px)" }} />
        <div style={{ position: "absolute", left: 316, top: 452, width: 392, height: 200, borderRadius: 10, background: grad("#A87C4C", "#75552C"), border: "5px solid #4A3419", boxShadow: "0 22px 34px rgba(0,0,0,0.6)", transform: `translateY(${osc(f, 40, 3)}px)` }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 10, height: 12, background: "rgba(74,52,25,0.6)" }} />
          <div style={{ position: "absolute", left: 0, right: 0, top: 56, textAlign: "center", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 32, letterSpacing: 2, color: "#3B2A12" }}>OPEN SOURCE</div>
          <div style={{ position: "absolute", left: 0, right: 0, top: 100, textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 50, color: "#2FA97C" }}>FREE</div>
        </div>
        {Array.from({ length: 34 }, (_, i) => {
          const a = -Math.PI / 2 + (i / 33 - 0.5) * 2.6;
          const t = ((f * 2.4 + i * 11) % 150) / 150;
          const r = t * 420;
          return <div key={i} style={{ position: "absolute", left: 500 + Math.cos(a) * r * 1.1, top: 470 + Math.sin(a) * r * 0.95, fontSize: 18 + (i % 4) * 13, color: GOLD, opacity: (1 - t) * 0.95, transform: `rotate(${f * 2 + i * 40}deg)` }}>{"★"}</div>;
        })}
        <div style={{ position: "absolute", left: 286, top: 224, transform: `scale(${pop}) translateY(${osc(f, 26, 4)}px)`, transformOrigin: "50% 50%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "18px 36px", borderRadius: 22, background: "linear-gradient(180deg,#161E33,#0B1120)", border: `5px solid ${GOLD}`, boxShadow: "0 10px 22px rgba(26,24,19,0.34)" }}>
            <span style={{ fontSize: 52, color: GOLD }}>{"★"}</span>
            <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 62, color: "#FFF3C8" }}>{count}k</span>
          </div>
          <div style={{ textAlign: "center", marginTop: 8, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 19, letterSpacing: 3, color: "#F3D9A6" }}>COMBINED GITHUB STARS</div>
        </div>
        <div style={{ position: "absolute", left: 76, top: 384, filter: "drop-shadow(0 16px 22px rgba(0,0,0,0.65))" }}>
          <Mascot lf={f} size={236} shock={0.55} gaze={2} nodAmp={2} nodSpeed={11} />
        </div>
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} style={{ position: "absolute", left: 60 + i * 42, top: 690 + (i % 2) * 22, width: 46, height: 15, borderRadius: "50%", background: grad("#F0CB63", "#B98C2C"), border: "2px solid #8B6512", transform: `rotate(${i * 24}deg)` }} />
        ))}
      </Panel>
    </AbsoluteFill>
  );
};

/* ---- shared shell for the 7 tool scenes: cabinet + GitHub page -> demo flip ---- */
const ToolScene: React.FC<{
  f: number; repo: string; title: string; accent: string; badge?: string; badgeColor?: string;
  shift: number; header: React.ReactNode; glow: string; flipAt: number; demo: React.ReactNode;
  cab?: { x: number; y: number; w: number; h: number }; side?: React.ReactNode;
}> = ({ f, repo, title, accent, badge, badgeColor, shift, header, glow, flipAt, demo, cab, side }) => {
  const r = REPOS[repo];
  const box = cab || { x: 40, y: 100, w: 932, h: 604 };
  const load = E(f, 4, 30, 0, 1, OUT);
  const starP = E(f, 12, 42, 0, 1, OUT);
  const flip = E(f, flipAt, flipAt + 20, 0, 1, IO);
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      {header}
      <Panel glow={glow}>
        <ArcadeRoom f={f} shift={shift + osc(f, 100, 18)} />
        <Cabinet f={f} x={box.x} y={box.y} w={box.w} h={box.h} title={title} accent={accent} badge={badge} badgeColor={badgeColor}>
          <Flip p={flip}
            front={<><GithubPage f={f} repo={r} load={load} starP={starP} scroll={E(f, Math.max(30, flipAt - 34), flipAt, 0, 26, IO)} /><Crt f={f} /></>}
            back={<><div style={{ position: "absolute", inset: 0, background: "#EDE7DA" }}>{demo}</div><Crt f={f} /></>} />
        </Cabinet>
        {side}
      </Panel>
    </AbsoluteFill>
  );
};

/* ============ S2 · #1 CAVEMAN ============ */
export const S2Caveman: React.FC = () => {
  const f = useCurrentFrame();
  const FLIP = 92;
  const swing = Math.sin(Math.max(0, Math.min(1, (f - FLIP - 16) / 18)) * Math.PI);
  const smashed = f > FLIP + 30;
  const tok = E(f, FLIP + 30, FLIP + 96, 100, 35, OUT);
  const laugh = f < 176;
  return (
    <ToolScene f={f} repo="caveman" title="CAVEMAN" accent="#B23A34" shift={180} glow={hexA(CO, 0.3)} flipAt={FLIP}
      badge={smashed ? "-65%" : "100%"} badgeColor={smashed ? GREEN : RED}
      header={<SectionHeader f={f} badge={<span style={{ fontSize: 44 }}>🪨</span>} l1="1 · Caveman" l2={<span style={{ color: CLAY }}>cuts 65% of tokens</span>} size={42} />}
      demo={<DemoCaveman f={f} flip={FLIP} smashed={smashed} tok={tok} />}
      side={<>
        <div style={{ position: "absolute", left: 44, top: 522, filter: "drop-shadow(0 18px 24px rgba(0,0,0,0.75))", zIndex: 9 }}>
          <Mascot lf={f} size={252} cheer={smashed ? 0.5 : 0} gaze={-2} nodAmp={2} nodSpeed={12} />
        </div>
        <div style={{ position: "absolute", left: 246, top: 566, width: 150, height: 34, opacity: E(f, FLIP - 6, FLIP + 8, 0, 1, OUT), transform: `rotate(${-70 + swing * 78}deg)`, transformOrigin: "10% 50%" }}>
          <div style={{ position: "absolute", left: 0, top: 10, width: 104, height: 15, borderRadius: 4, background: grad("#7A5433", "#4E3117") }} />
          <div style={{ position: "absolute", left: 96, top: -8, width: 54, height: 50, borderRadius: 12, background: grad("#8E96A8", "#5D6577"), border: "3px solid #444C5C" }} />
        </div>
        <div style={{ position: "absolute", left: 618, top: 620, zIndex: 9 }}><Mascot lf={f + 40} size={128} tint="#8E96A8" cheer={laugh ? 0.6 : 0} shock={laugh ? 0 : 0.6} nodSpeed={9} /></div>
        <div style={{ position: "absolute", left: 712, top: 652, zIndex: 9 }}><Mascot lf={f + 80} size={112} tint="#7C88A2" cheer={laugh ? 0.6 : 0} shock={laugh ? 0 : 0.6} nodSpeed={11} /></div>
        <div style={{ opacity: laugh ? 1 : 0 }}><Bubble x={584} y={604} text="ha ha" s={0.85} rot={-4} /></div>
        <div style={{ opacity: laugh ? 0 : 1 }}><Bubble x={584} y={604} text="oh." s={0.9} c="#FFE9A8" rot={-3} /></div>
        <WonPrize f={f} at={196} x={572} y={716} />
      </>} />
  );
};

/* ============ S3 · #2 UI/UX PRO MAX ============ */
export const S3Taste: React.FC = () => {
  const f = useCurrentFrame();
  const FLIP = 74;
  const wipe = E(f, FLIP + 18, FLIP + 54, 0, 1, IO);
  const taste = E(f, FLIP + 20, FLIP + 76, 12, 96, OUT);
  const SW = 492;
  return (
    <ToolScene f={f} repo="uiux" title="UI/UX PRO MAX" accent="#6E4BA8" shift={330} glow={hexA(PINK, 0.28)} flipAt={FLIP}
      badge={`${Math.round(taste)}`} badgeColor={PINK}
      header={<SectionHeader f={f} badge={<span style={{ fontSize: 44 }}>🎨</span>} l1="2 · UI/UX Pro Max" l2={<span style={{ color: CLAY }}>kills the purple slop</span>} size={40} />}
      demo={<DemoTaste f={f} wipe={wipe} />}
      side={<>
        <Meter x={640} y={718} w={330} label="DESIGN TASTE" val={taste} c={PINK} />
        <div style={{ position: "absolute", left: 56, top: 526, filter: "drop-shadow(0 18px 24px rgba(0,0,0,0.75))", zIndex: 9 }}>
          <Mascot lf={f} size={250} cheer={wipe > 0.8 ? 0.7 : 0.15} gaze={-2} nodAmp={2.4} nodSpeed={11} />
        </div>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ position: "absolute", left: 300 + i * 66, top: 668 + (i % 2) * 18 + osc(f, 30, 3, i), width: 62, height: 62, borderRadius: 10, background: "linear-gradient(150deg,#6D3BD6,#B14BE8)", border: "3px solid #4A2A8E", transform: `rotate(${(i - 1) * 14}deg)`, opacity: 0.85 }}>
            <div style={{ position: "absolute", left: -4, right: -4, top: 27, height: 6, background: RED, transform: "rotate(-24deg)" }} />
          </div>
        ))}
        <WonPrize f={f} at={152} x={520} y={720} />
      </>} />
  );
};

/* ============ S4 · #3 AGENCY AGENTS ============ */
export const S4Agents: React.FC = () => {
  const f = useCurrentFrame();
  const FLIP = 80;
  const n = Math.round(E(f, FLIP + 8, FLIP + 78, 0, 267, OUT));
  const ROLES: { c: any; label: string }[] = [
    { c: { girl: 1 }, label: "Designer" }, { c: { constr: 1 }, label: "Engineer" },
    { c: { prof: 1 }, label: "Copywriter" }, { c: { suit: 1 }, label: "Strategist" },
  ];
  return (
    <ToolScene f={f} repo="agency" title="AGENCY AGENTS" accent="#C74E43" shift={480} glow={hexA(GOLD, 0.3)} flipAt={FLIP}
      badge={`${n}`} badgeColor={GOLD} cab={{ x: 40, y: 100, w: 932, h: 604 }}
      header={<SectionHeader f={f} badge={<span style={{ fontSize: 44 }}>🎯</span>} l1="3 · Agency Agents" l2={<span style={{ color: CLAY }}>267 expert roles</span>} size={42} />}
      demo={<DemoAgency f={f} flip={FLIP} n={n} />}
      side={<>
        {ROLES.map((r, i) => {
          const st = FLIP + 16 + i * 16;
          const open = E(f, st + 14, st + 28, 0, 1, BACK);
          const roll = E(f, st, st + 16, 0, 1, OUT);
          return (
            <div key={i} style={{ position: "absolute", left: 232 + i * 132, top: 590, zIndex: 9 }}>
              <div style={{ position: "absolute", left: (1 - roll) * -320, top: 0, opacity: roll }}>
                <div style={{ position: "absolute", left: 6, top: 54, width: 92, height: 46, borderRadius: "0 0 46px 46px", background: [CLAY, GOLD, GREEN, SKY][i], transform: `translateY(${open * 22}px)` }} />
                <div style={{ position: "absolute", left: 6, top: 6, width: 92, height: 46, borderRadius: "46px 46px 0 0", background: [CLAY, GOLD, GREEN, SKY][i], opacity: 1 - open, transform: `translateY(${-open * 44}px) rotate(${open * -24}deg)` }} />
                <div style={{ position: "absolute", left: 10, top: 2, opacity: open, transform: `scale(${0.6 + open * 0.4})`, transformOrigin: "50% 100%" }}>
                  <Mascot lf={f + i * 17} size={88} nodAmp={2.6} nodSpeed={9} cheer={0.4} {...r.c} />
                </div>
                <div style={{ position: "absolute", left: -6, top: 112, width: 112, textAlign: "center", opacity: open }}>
                  <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 15, color: "#F4EEE2", background: "rgba(12,18,32,0.88)", padding: "5px 8px", borderRadius: 7, border: "2px solid #2C3652", whiteSpace: "nowrap" }}>{r.label}</span>
                </div>
              </div>
            </div>
          );
        })}
        <div style={{ position: "absolute", left: 200, top: 742, right: 60, height: 12, borderRadius: 6, background: "#26324C" }} />
        <WonPrize f={f} at={168} x={54} y={716} />
      </>} />
  );
};

/* ============ S5 · #4 AGENT MEMORY ============ */
export const S5Memory: React.FC = () => {
  const f = useCurrentFrame();
  const FLIP = 76;
  const insert = E(f, FLIP + 10, FLIP + 32, 0, 1, IO);
  const DAYS = ["MON", "TUE", "WED", "THU", "FRI"];
  return (
    <ToolScene f={f} repo="memory" title="AGENT MEMORY" accent="#2F5DA8" shift={640} glow={hexA(SKY, 0.3)} flipAt={FLIP}
      badge="SAVED" badgeColor={GREEN} cab={{ x: 40, y: 100, w: 932, h: 604 }}
      header={<SectionHeader f={f} badge={<span style={{ fontSize: 44 }}>💾</span>} l1="4 · Agent Memory" l2={<span style={{ color: CLAY }}>stop re-explaining</span>} size={42} />}
      demo={<DemoMemory f={f} flip={FLIP} />}
      side={<>
        <div style={{ position: "absolute", left: 700 - insert * 96, top: 646, width: 132, height: 96, borderRadius: 10, background: grad("#C9D2E6", "#7C88A2"), border: "4px solid #4E5C7E", boxShadow: `0 0 ${18 + insert * 26}px ${hexA(SKY, 0.75)}` }}>
          <div style={{ position: "absolute", left: 12, top: 12, right: 12, height: 30, borderRadius: 5, background: "#3A4560" }} />
          {[0, 1, 2].map((i) => <div key={i} style={{ position: "absolute", left: 14 + i * 36, bottom: 12, width: 26, height: 18, borderRadius: 3, background: GOLD }} />)}
        </div>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ position: "absolute", left: 246 + i * 34, top: 632 + i * 26, width: 190, height: 54, borderRadius: 8, background: "#22293C", border: "2px solid #39435C", transform: `rotate(${(i - 1) * 7}deg) translateY(${osc(f, 34, 3, i)}px)`, opacity: 0.9 }}>
            <div style={{ position: "absolute", left: 12, top: 14, width: 120, height: 10, borderRadius: 3, background: "#4E5C7E" }} />
            <div style={{ position: "absolute", left: 12, top: 32, width: 84, height: 8, borderRadius: 3, background: "#3A4560" }} />
            <div style={{ position: "absolute", left: -6, right: -6, top: 24, height: 5, background: RED, transform: "rotate(-8deg)", boxShadow: "0 10px 22px rgba(26,24,19,0.34)" }} />
          </div>
        ))}
        <div style={{ position: "absolute", left: 44, top: 566, filter: "drop-shadow(0 18px 24px rgba(0,0,0,0.75))", zIndex: 9 }}>
          <Mascot lf={f} size={210} cheer={0.5} gaze={-1} nodAmp={2.4} nodSpeed={10} />
        </div>
        <WonPrize f={f} at={160} x={880} y={716} />
      </>} />
  );
};

/* ============ S6 · #5 LAST 30 DAYS ============ */
export const S6Feeds: React.FC = () => {
  const f = useCurrentFrame();
  const FLIP = 72;
  const FEEDS = ["reddit", "x", "youtube", "ycombinator"];
  const card = E(f, FLIP + 46, FLIP + 66, 0, 1, BACK);
  return (
    <ToolScene f={f} repo="last30" title="LAST 30 DAYS" accent="#2E7D5B" shift={790} glow={hexA(GREEN, 0.26)} flipAt={FLIP}
      badge="1 DOC" badgeColor={GREEN} cab={{ x: 40, y: 100, w: 932, h: 604 }}
      header={<SectionHeader f={f} badge={<span style={{ fontSize: 44 }}>📡</span>} l1="5 · Last 30 Days" l2={<span style={{ color: CLAY }}>4 feeds, 1 summary</span>} size={42} />}
      demo={<DemoFeeds f={f} flip={FLIP} card={card} />}
      side={<>
        <div style={{ position: "absolute", left: 60, top: 588, filter: "drop-shadow(0 18px 24px rgba(0,0,0,0.75))", zIndex: 9 }}>
          <Mascot lf={f} size={192} glasses={1} cheer={0.4} gaze={-2} nodAmp={2.2} nodSpeed={10} />
        </div>
        <WonPrize f={f} at={152} x={860} y={716} />
      </>} />
  );
};

/* ============ S7 · #6 OPEN MONTAGE ============ */
export const S7Montage: React.FC = () => {
  const f = useCurrentFrame();
  const FLIP = 26;
  const belt = (f * 3.6) % 120;
  return (
    <ToolScene f={f} repo="montage" title="OPEN MONTAGE" accent="#5A3FA0" shift={940} glow={hexA(PURPLE, 0.3)} flipAt={FLIP}
      badge="RENDER" badgeColor={PINK} cab={{ x: 40, y: 100, w: 932, h: 604 }}
      header={<SectionHeader f={f} badge={<span style={{ fontSize: 44 }}>🎬</span>} l1="6 · Open Montage" l2={<span style={{ color: CLAY }}>video, run by agents</span>} size={42} />}
      demo={<DemoMontage f={f} flip={FLIP} />}
      side={<WonPrize f={f} at={88} x={462} y={730} />} />
  );
};

/* ============ S8 · #7 ORCA ============ */
export const S8Orca: React.FC = () => {
  const f = useCurrentFrame();
  const FLIP = 66;
  const LANES = 8;
  return (
    <ToolScene f={f} repo="orca" title="ORCA · PARALLEL" accent="#26547C" shift={1090} glow={hexA(SKY, 0.34)} flipAt={FLIP}
      badge={`×${LANES}`} badgeColor={SKY} cab={{ x: 40, y: 100, w: 932, h: 604 }}
      header={<SectionHeader f={f} badge={<span style={{ fontSize: 44 }}>🐋</span>} l1="7 · Orca" l2={<span style={{ color: CLAY }}>a whole fleet at once</span>} size={42} />}
      demo={<DemoOrca f={f} flip={FLIP} />}
      side={<>
        <div style={{ position: "absolute", left: 396, top: 574, filter: "drop-shadow(0 18px 24px rgba(0,0,0,0.75))", zIndex: 9 }}>
          <Mascot lf={f} size={206} cheer={0.85} gaze={0} nodAmp={2.6} nodSpeed={10} />
        </div>
        <WonPrize f={f} at={146} x={836} y={726} />
      </>} />
  );
};

/* ============ S9 · CTA ============ */
export const S9Cta: React.FC = () => {
  const f = useCurrentFrame();
  const NAMES = ["Caveman", "UI/UX Pro Max", "Agency Agents", "Agent Memory", "Last 30 Days", "Open Montage", "Orca"];
  const flip = E(f, 20, 38, 0, 1, BACK);
  const doc = E(f, 8, 30, 0, 1, BACK);
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <SectionHeader f={f} badge={<span style={{ fontSize: 42 }}>🎟️</span>} l1="All 7 in one doc" l2={<span style={{ color: CLAY }}>comment OPEN</span>} size={44} />
      <Panel glow={hexA(GOLD, 0.4)}>
        <ArcadeRoom f={f} shift={1240 + osc(f, 90, 16)} tint="#FFD9A0" />
        <div style={{ position: "absolute", left: 44, top: 150, width: 470, height: 300 }}>
          <div style={{ position: "absolute", left: 0, top: 118, width: 470, height: 14, background: "#2B354C", boxShadow: "0 6px 0 #1A2133" }} />
          <div style={{ position: "absolute", left: 0, top: 286, width: 470, height: 14, background: "#2B354C", boxShadow: "0 6px 0 #1A2133" }} />
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} style={{ position: "absolute", left: 14 + i * 116, top: 40 + osc(f, 24, 4, i), transform: `scale(${E(f, 4 + i * 5, 18 + i * 5, 0, 1, BACK)})` }}><Prize x={0} y={0} s={1.02} lit /></div>
          ))}
          {Array.from({ length: 3 }, (_, i) => (
            <div key={`b${i}`} style={{ position: "absolute", left: 14 + i * 116, top: 208 + osc(f, 26, 4, i + 2), transform: `scale(${E(f, 24 + i * 5, 38 + i * 5, 0, 1, BACK)})` }}><Prize x={0} y={0} s={1.02} lit /></div>
          ))}
          <div style={{ position: "absolute", left: 356, top: 196, width: 108, height: 96, borderRadius: "40px 40px 8px 8px", background: grad("#6E4BA8", "#3B2A6E"), border: "3px solid #2A1E52" }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 40, textAlign: "center", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 30, color: "#E6DEFF" }}>+3</div>
          </div>
        </div>
        <div style={{ position: "absolute", left: 60, top: 494, width: 434, height: 88, borderRadius: 12, background: "#5C1714", border: "4px solid #3E0E0C", display: "flex", alignItems: "center", justifyContent: "space-around" }}>
          <div style={{ position: "relative" }}>
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 40, color: "#F3B9A6" }}>$49.99</span>
            <div style={{ position: "absolute", left: -8, right: -8, top: 26, height: 7, borderRadius: 4, background: RED, transform: `scaleX(${flip})`, transformOrigin: "0 50%", boxShadow: "0 10px 22px rgba(26,24,19,0.34)" }} />
          </div>
          <span style={{ fontSize: 34, color: "#F3B9A6" }}>→</span>
          <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 56, color: "#5BE0A8", transform: `scale(${0.6 + flip * 0.4})` }}>$0.00</span>
        </div>
        <div style={{ transform: `scale(${doc}) translateY(${(1 - doc) * 40}px)`, transformOrigin: "70% 100%" }}>
          <GuideCard x={584} y={168} s={1.02} rot={-3} names={NAMES} hidden={3} />
        </div>
        <div style={{ position: "absolute", left: 190, top: 570, filter: "drop-shadow(0 16px 22px rgba(0,0,0,0.65))" }}>
          <Mascot lf={f} size={216} cheer={1} gaze={0} nodAmp={3} nodSpeed={9} />
        </div>
        {Array.from({ length: 26 }, (_, i) => {
          const t = ((f * 2.2 + i * 13) % 120) / 120;
          return <div key={i} style={{ position: "absolute", left: 40 + ((i * 83) % 940), top: 720 - t * 660, fontSize: 16 + (i % 3) * 10, color: [GOLD, PINK, GREEN, SKY][i % 4], opacity: (1 - t) * 0.9, transform: `rotate(${f * 2 + i * 30}deg)` }}>{i % 2 ? "★" : "◆"}</div>;
        })}
      </Panel>
    </AbsoluteFill>
  );
};
