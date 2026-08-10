import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { inter, fraunces } from "./fonts";
import { loadFont as loadMono } from "@remotion/google-fonts/JetBrainsMono";
import {
  Bg, ProgressBar, Panel, CaptionLine, Mascot, Confetti, hexA, CO, GREEN, RED, CLAY, GOLD, SectionHeader,
} from "./SlopKit";

const mono = loadMono("normal", { weights: ["400", "500", "700"] });
const MONO = mono.fontFamily, UI = inter.fontFamily;

/* palette for a light Chrome web app */
const CHROME = "#DEE1E6", CHROME2 = "#F1F3F4", INK = "#202124", DIM = "#5F6368", LINE = "#E3E5E9", CARD = "#FFFFFF";

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const ez = (f: number, a: number, b: number, ease = Easing.inOut(Easing.cubic)) => interpolate(f, [a, b], [0, 1], { ...clamp, easing: ease });

/* mac traffic lights */
const Traffic = () => (<div style={{ display: "flex", gap: 8 }}>{[["#FF5F57", "#E0443E"], ["#FEBC2E", "#DDA123"], ["#28C840", "#1DA92E"]].map(([c, b], i) => <div key={i} style={{ width: 13, height: 13, borderRadius: "50%", background: c as string, border: `0.5px solid ${b}` }} />)}</div>);

/* the pasted messy human text (typed in) */
const PASTE = "umm ok so what I actually wanted to say is, look, most people just tell it to write the thing and it comes out clean but it sounds like a robot, so don't, here's what actually fixed it for me...";

/* A LEGIT Chrome browser running an AI-detector web app (fills the panel, natural proportions). */
const DetectorBrowser: React.FC = () => {
  const f = useCurrentFrame();

  // 1) type the text into the box (fast, so it is in before the Analyze click)
  const typed = PASTE.slice(0, Math.max(0, Math.floor(f * 6)));
  const typing = typed.length < PASTE.length;

  // 2) press Analyze
  const clickAt = 22;
  const press = interpolate(f, [clickAt, clickAt + 3, clickAt + 8], [1, 0.94, 1], { ...clamp, easing: Easing.out(Easing.quad) });
  const analyzing = f >= clickAt;

  // 3) scan sweep across the pasted text
  const scan = ez(f, clickAt + 4, clickAt + 28);
  const scanning = f >= clickAt + 4 && scan < 1;

  // 4) meter animates AI (red) -> 100% HUMAN (green). Timed so the 100% HUMAN reveal
  //    lands on the VO word "human" (~local frame 69) and then HOLDS the rest of the scene.
  const flip = ez(f, 50, 70, Easing.inOut(Easing.cubic));
  const revealed = f >= 48;
  const isAI = flip < 0.5;                                              // flips at local frame 60
  const c = isAI ? RED : GREEN;

  // ---- TENSION while analyzing: a racing, flickering % that never settles until it locks ----
  const analyzingMeter = f >= clickAt + 2 && f < 48;
  const raceNum = Math.round(52 + 46 * Math.abs(Math.sin(f * 0.9) * Math.cos(f * 0.41 + 1))); // jitters ~52..98
  const analyzePulse = 0.5 + 0.5 * Math.abs(Math.sin(f / 3.2));

  // ---- reveal numbers: a nervous HIGH "AI" read, then a HARD SNAP to 100% HUMAN ----
  const aiJit = Math.round(Math.abs(Math.sin(f * 1.7)) * 3);            // 0..3 nervous flicker
  const aiShown = 96 + aiJit;                                          // 96..99% while it reads AI
  const humanShown = Math.round(interpolate(f, [60, 66], [95, 100], { ...clamp })); // races up + locks
  const shownPct = isAI ? aiShown : humanShown;
  const ring = shownPct;                                               // arc fills to the shown %

  // ---- the FLIP is a MOMENT: a scale-overshoot punch + a flash + a slam stamp ----
  const flipPunch = interpolate(f, [59, 60, 64, 69], [1, 1.17, 0.97, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const ringGlow = isAI ? 0 : interpolate(f, [60, 66], [0, 1], { ...clamp });
  const flash = interpolate(f, [59, 61, 73], [0, 0.9, 0], { ...clamp });
  const stampScale = interpolate(f, [59, 61, 64, 69], [2.7, 1, 1.09, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const stampO = interpolate(f, [59, 60.5, 84, 92], [0, 1, 1, 0], { ...clamp });

  // 5) the Human-written badge pops in as HUMAN lands
  const badge = interpolate(f, [66, 78], [0, 1], { ...clamp, easing: Easing.out(Easing.back(1.7)) });

  const bookmarks = ["Detector", "Rewrite AI", "Humanize", "Grammar", "Docs"];

  // ----- clay-DETECTIVE reactions that ACT ON the meter -----
  // isAI holds until the flip crosses at local frame 60 (flip = ez(f,50,70) === 0.5 @ 60).
  const human = !isAI;                                                   // === f >= 60

  /* ---- INSPECT phase: two detectives flank the RESULT meter and inspect it ---- */
  // furrow-brow stern as they lean in during the scan (drops the instant it reads human)
  const sternV = human ? 0 : interpolate(f, [24, 34], [0, 0.7], { ...clamp });
  // DOUBLE-TAKES: quick shock pulses as the scanner reads it AI (staggered between the two)
  const dtDet = human ? 0 : interpolate(f, [26, 30, 41], [0, 0.62, 0], { ...clamp, easing: Easing.inOut(Easing.quad) });
  const dtCop = human ? 0 : interpolate(f, [31, 35, 46], [0, 0.58, 0], { ...clamp, easing: Easing.inOut(Easing.quad) });
  // gaze glued to the meter while inspecting; snaps forward on the party
  const gazeDet = human ? 0 : -3;                                        // right detective peers LEFT at the meter
  const gazeCop = human ? 0 : 3;                                         // left cop peers RIGHT at the meter
  // a magnifying glass the DETECTIVE holds right up to the meter, bobbing while it scans
  const magBob = Math.sin(f / 4) * 5;
  const magShow = interpolate(f, [8, 18], [0, 1], { ...clamp }) * (human ? interpolate(f, [56, 62], [1, 0], { ...clamp }) : 1);
  // a pointer stick the COP taps against the meter from the other side while it scans
  const ptBob = Math.sin(f / 3.4 + 1) * 4;
  const ptShow = interpolate(f, [12, 22], [0, 1], { ...clamp }) * (human ? interpolate(f, [56, 62], [1, 0], { ...clamp }) : 1);

  /* ---- PARTY phase the instant it reads HUMAN (local frame 60) ---- */
  // burst arm-pump the instant it flips
  const cheerV = interpolate(f, [60, 67], [0, 0.82], { ...clamp, easing: Easing.out(Easing.back(1.6)) });
  // exaggerated HOP-SCALE combo as they jump for joy (staggered between the two)
  const popDet = human ? interpolate(f, [60, 65, 71, 78], [1, 1.24, 0.97, 1.05], { ...clamp, easing: Easing.out(Easing.cubic) }) : interpolate(f, [24, 30], [1, 1.04], { ...clamp });
  const popCop = human ? interpolate(f, [61, 66, 72, 79], [1, 1.24, 0.97, 1.05], { ...clamp, easing: Easing.out(Easing.cubic) }) : interpolate(f, [25, 31], [1, 1.05], { ...clamp });
  // a literal little jump off the floor on the win (damped over time)
  const jumpDet = human ? -Math.abs(Math.sin((f - 60) / 5.2)) * 26 * interpolate(f, [60, 92], [1, 0.35], { ...clamp }) : 0;
  const jumpCop = human ? -Math.abs(Math.sin((f - 61) / 5.0)) * 26 * interpolate(f, [61, 93], [1, 0.35], { ...clamp }) : 0;

  /* ---- speech bubbles ---- */
  // INSPECT bubbles (fade out right before the flip)
  const insBub = human ? 0 : interpolate(f, [15, 23], [0, 1], { ...clamp, easing: Easing.out(Easing.back(2)) }) * interpolate(f, [53, 59], [1, 0], { ...clamp });
  // WIN bubbles (staggered pop-in on the flip)
  const bubDet = interpolate(f, [61, 69], [0, 1], { ...clamp, easing: Easing.out(Easing.back(2)) });
  const bubCop = interpolate(f, [64, 72], [0, 1], { ...clamp, easing: Easing.out(Easing.back(2)) });

  return (
    <AbsoluteFill style={{ background: CHROME2 }}>
      {/* ===== Chrome chrome ===== */}
      {/* tab strip */}
      <div style={{ height: 44, background: CHROME, display: "flex", alignItems: "flex-end", paddingLeft: 16, gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", height: "100%", paddingBottom: 12 }}><Traffic /></div>
        <div style={{ display: "flex", alignItems: "center", gap: 9, height: 34, background: CHROME2, borderRadius: "10px 10px 0 0", padding: "0 14px 0 13px", marginLeft: 6, maxWidth: 240 }}>
          <div style={{ width: 15, height: 15, borderRadius: 4, background: CO, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: UI, fontWeight: 900, fontSize: 10 }}>A</div>
          <span style={{ fontFamily: UI, fontSize: 14, color: INK, fontWeight: 500, whiteSpace: "nowrap" }}>AI Detector</span>
          <span style={{ marginLeft: 6, color: DIM, fontSize: 15, lineHeight: 1 }}>×</span>
        </div>
        <div style={{ color: DIM, fontSize: 20, marginBottom: 15, marginLeft: 2 }}>+</div>
      </div>
      {/* toolbar with URL bar */}
      <div style={{ height: 46, background: CHROME2, display: "flex", alignItems: "center", gap: 14, padding: "0 16px", borderBottom: `1px solid ${LINE}` }}>
        {["‹", "›", "⟳"].map((g, i) => <span key={i} style={{ fontFamily: UI, fontSize: 21, color: i === 0 ? DIM : "#B7BBC1", width: 18, textAlign: "center" }}>{g}</span>)}
        <div style={{ flex: 1, height: 32, background: "#EBEDF0", borderRadius: 999, display: "flex", alignItems: "center", padding: "0 15px", gap: 9 }}>
          <svg width={13} height={13} viewBox="0 0 24 24" fill="none"><rect x="5" y="11" width="14" height="9" rx="2" fill={DIM} /><path d="M8 11V8a4 4 0 0 1 8 0v3" stroke={DIM} strokeWidth="2" /></svg>
          <span style={{ fontFamily: UI, fontSize: 14.5, color: INK }}>ai-content-detector.io</span>
          <span style={{ marginLeft: "auto", color: "#C2C6CC", fontSize: 15 }}>☆</span>
        </div>
        <div style={{ width: 26, height: 26, borderRadius: "50%", background: grad2, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: UI, fontWeight: 700, fontSize: 12, color: "#fff" }}>A</div>
      </div>
      {/* bookmarks strip */}
      <div style={{ height: 32, background: CHROME2, display: "flex", alignItems: "center", gap: 20, padding: "0 18px", borderBottom: `1px solid ${LINE}` }}>
        {bookmarks.map((b, i) => (<div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 12, height: 12, borderRadius: 3, background: [CO, "#5AA0DE", GREEN, GOLD, "#9A968B"][i] }} />
          <span style={{ fontFamily: UI, fontSize: 12.5, color: DIM }}>{b}</span>
        </div>))}
      </div>

      {/* ===== the web app page ===== */}
      <div style={{ position: "absolute", top: 154, left: 0, right: 0, bottom: 0, background: "#F7F8FA", overflow: "hidden" }}>
        <div style={{ padding: "26px 40px 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: CO, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: UI, fontWeight: 900, fontSize: 15 }}>✓</div>
            <span style={{ fontFamily: UI, fontWeight: 800, fontSize: 22, color: INK }}>AI Content Detector</span>
          </div>
          <div style={{ fontFamily: UI, fontSize: 14, color: DIM, marginBottom: 20 }}>Paste your text to check if it was written by AI or a human.</div>

          <div style={{ display: "flex", gap: 28 }}>
            {/* left: paste box + analyze */}
            <div style={{ width: 560 }}>
              <div style={{ fontFamily: UI, fontWeight: 700, fontSize: 13, color: DIM, marginBottom: 8, letterSpacing: 0.3 }}>YOUR TEXT</div>
              <div style={{ position: "relative", background: CARD, border: `1px solid ${LINE}`, borderRadius: 12, padding: "18px 20px", height: 250, overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                <p style={{ fontFamily: fraunces.fontFamily, fontSize: 19, lineHeight: 1.62, color: "#3C4048", margin: 0 }}>
                  {typed}{typing && <span style={{ opacity: (f % 16) < 9 ? 1 : 0, color: CO, fontWeight: 700 }}>|</span>}
                </p>
                {/* scan sweep line */}
                {scanning && (<>
                  <div style={{ position: "absolute", left: 0, right: 0, top: `${8 + scan * 84}%`, height: 30, background: `linear-gradient(180deg, transparent, ${hexA(CO, 0.16)}, transparent)` }} />
                  <div style={{ position: "absolute", left: 0, right: 0, top: `${8 + scan * 84}%`, height: 2, background: CO, boxShadow: `0 0 10px ${CO}` }} />
                </>)}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 16 }}>
                <div style={{ padding: "11px 30px", borderRadius: 10, background: analyzing ? "#B0562F" : CO, fontFamily: UI, fontWeight: 700, fontSize: 16, color: "#fff", transform: `scale(${press})`, boxShadow: `0 4px 12px ${hexA(CO, 0.35)}`, display: "flex", alignItems: "center", gap: 9 }}>
                  {scanning ? <><span style={{ width: 13, height: 13, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", transform: `rotate(${f * 22}deg)`, display: "inline-block" }} /> Analyzing</> : "Analyze"}
                </div>
                <span style={{ fontFamily: UI, fontSize: 13, color: DIM }}>{PASTE.length} / 5000 chars</span>
              </div>
            </div>

            {/* right: result meter */}
            <div style={{ flex: 1, background: CARD, border: `1px solid ${LINE}`, borderRadius: 14, padding: "22px 20px", display: "flex", flexDirection: "column", alignItems: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div style={{ fontFamily: UI, fontWeight: 700, fontSize: 13, color: DIM, letterSpacing: 0.4, marginBottom: 18 }}>RESULT</div>
              {!revealed ? (
                analyzingMeter ? (
                  /* ANALYZING — a spinning ring + a % that RACES and flickers (tension before the lock) */
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ position: "relative", width: 176, height: 176 }}>
                      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "10px solid #EDEFF3", borderTopColor: CO, borderRightColor: hexA(CO, 0.5), transform: `rotate(${f * 26}deg)` }} />
                      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontFamily: UI, fontWeight: 900, fontSize: 38, color: "#7A8090", lineHeight: 1, transform: `translateY(${Math.sin(f / 2) * 1.5}px)` }}>{raceNum}%</span>
                        <span style={{ fontFamily: UI, fontWeight: 900, fontSize: 15, color: "#9AA0AC", letterSpacing: 3, marginTop: 3 }}>?</span>
                      </div>
                    </div>
                    <span style={{ fontFamily: UI, fontSize: 14, color: CO, marginTop: 16, fontWeight: 800, letterSpacing: 0.5, opacity: analyzePulse }}>analyzing{".".repeat(1 + (Math.floor(f / 6) % 3))}</span>
                  </div>
                ) : (
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: 0.55 }}>
                    <div style={{ width: 150, height: 150, borderRadius: "50%", border: `10px solid #EDEFF3` }} />
                    <span style={{ fontFamily: UI, fontSize: 14, color: DIM, marginTop: 16 }}>Awaiting scan…</span>
                  </div>
                )
              ) : (<>
                <div style={{ position: "relative", width: 176, height: 176, borderRadius: "50%", background: `conic-gradient(${c} ${ring}%, #EDEFF3 ${ring}%)`, display: "flex", alignItems: "center", justifyContent: "center", transition: "none", transform: `scale(${flipPunch})`, boxShadow: ringGlow > 0.01 ? `0 0 ${ringGlow * 48}px ${hexA(GREEN, 0.65 * ringGlow)}` : "none" }}>
                  <div style={{ width: 140, height: 140, borderRadius: "50%", background: CARD, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontFamily: UI, fontWeight: 900, fontSize: 38, color: c, lineHeight: 1 }}>{shownPct}%</span>
                    <span style={{ fontFamily: UI, fontWeight: 800, fontSize: 13, color: c, letterSpacing: 2, marginTop: 3 }}>{isAI ? "AI" : "HUMAN"}</span>
                  </div>
                </div>
                <div style={{ height: 52, display: "flex", alignItems: "center", marginTop: 18 }}>
                  {badge > 0.02 && !isAI && (
                    <div style={{ padding: "9px 20px", borderRadius: 999, background: hexA(GREEN, 0.12), border: `2px solid ${GREEN}`, fontFamily: UI, fontWeight: 800, fontSize: 16, color: GREEN, transform: `scale(${badge})`, display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 17 }}>✓</span> Human-written
                    </div>
                  )}
                  {isAI && <div style={{ padding: "9px 20px", borderRadius: 999, background: hexA(RED, 0.1), border: `2px solid ${RED}`, fontFamily: UI, fontWeight: 800, fontSize: 16, color: RED, display: "flex", alignItems: "center", gap: 8 }}><span>✕</span> Likely AI</div>}
                </div>
                <div style={{ fontFamily: UI, fontSize: 12.5, color: DIM, textAlign: "center", marginTop: 4, lineHeight: 1.5 }}>Detected as {shownPct}% {isAI ? "AI-generated" : "human"}.<br />Passes all detectors.</div>
              </>)}
            </div>
          </div>
        </div>

      </div>

      {/* ===== clay-DETECTIVE Mascots flanking the RESULT meter and ACTING ON it =====
          They sit HIGH beside the meter (panel-local y~344-476, well above the tutorial
          status bar along the panel bottom) so nothing is clipped. Two varied outfits: a
          glasses DETECTIVE on the right holds a MAGNIFIER right up to the meter while it
          scans, and a POLICE-cop partner on the left taps a POINTER stick against it. They
          double-take while it reads AI, then RIP INTO PARTY MODE the instant it flips to
          100% HUMAN (local frame 60): arm-pump, hop, confetti. Both props retract on the
          reveal so the 100% HUMAN readout is never covered; they act at the meter's EDGE
          and never touch the pasted-text column. */}
      {/* FLIP FLASH — a punchy white-green flash across the panel on the turnaround */}
      {flash > 0.01 && <AbsoluteFill style={{ background: `radial-gradient(circle at 62% 42%, ${hexA("#FFFFFF", flash)}, ${hexA(GREEN, flash * 0.42)} 52%, transparent 74%)`, zIndex: 55, pointerEvents: "none" }} />}

      {/* the HUMAN ✓ / PASSED stamp SLAMS in on the flip (scale-overshoot), then fades to reveal the clean 100% green meter */}
      {stampO > 0.01 && (
        <div style={{ position: "absolute", left: "50%", top: "46%", transform: `translate(-50%,-50%) rotate(-11deg) scale(${stampScale})`, opacity: stampO, zIndex: 58, pointerEvents: "none", textAlign: "center" }}>
          <div style={{ padding: "16px 46px", border: `10px solid ${GREEN}`, borderRadius: 18, background: hexA(GREEN, 0.1), boxShadow: `0 12px 34px rgba(0,0,0,0.28), 0 0 46px ${hexA(GREEN, 0.5)}` }}>
            <div style={{ fontFamily: UI, fontWeight: 900, fontSize: 82, color: GREEN, letterSpacing: 2, lineHeight: 1 }}>HUMAN ✓</div>
            <div style={{ fontFamily: UI, fontWeight: 900, fontSize: 30, color: GREEN, letterSpacing: 9, marginTop: 8 }}>PASSED</div>
          </div>
        </div>
      )}

      {/* confetti bursts flanking + over the meter on the win (bigger) */}
      {human && <Confetti f={f} x={664} y={360} start={60} n={30} />}
      {human && <Confetti f={f} x={950} y={406} start={60} n={30} />}
      {human && <Confetti f={f} x={806} y={296} start={62} n={24} />}

      {/* LEFT — POLICE cop partner: stands in the gutter left of the meter, taps a pointer on it */}
      <div style={{ position: "absolute", left: 606, top: 344, zIndex: 30, transform: `translateY(${jumpCop}px) scale(${popCop})`, transformOrigin: "50% 100%" }}>
        <Mascot lf={f + 14} size={92} cop={1} stern={sternV} nodAmp={human ? 4.4 : 1.6} nodSpeed={human ? 4.6 : 7} cheer={cheerV} shock={dtCop} gaze={gazeCop} />
        {/* pointer stick tapped against the meter while it scans */}
        {ptShow > 0.02 && (
          <div style={{ position: "absolute", left: 70, top: 26 + ptBob, transform: `rotate(6deg) scale(${0.72 + 0.28 * ptShow})`, transformOrigin: "0% 50%", opacity: ptShow, zIndex: 32 }}>
            <div style={{ width: 84, height: 9, borderRadius: 5, background: "#7A5636", boxShadow: "0 2px 5px rgba(0,0,0,0.28)" }} />
            <div style={{ position: "absolute", right: -12, top: -4.5, width: 0, height: 0, borderTop: "9px solid transparent", borderBottom: "9px solid transparent", borderLeft: "16px solid #5C3F26" }} />
          </div>
        )}
        {/* INSPECT bubble */}
        {insBub > 0.02 && (
          <div style={{ position: "absolute", left: 12, top: -42, transform: `scale(${insBub})`, transformOrigin: "0% 100%", padding: "6px 14px", borderRadius: 14, background: "#2E2A24", fontFamily: UI, fontWeight: 800, fontSize: 15, color: "#F4EEE2", whiteSpace: "nowrap", boxShadow: "0 5px 12px rgba(0,0,0,0.3)", zIndex: 31 }}>
            AI or not?
          </div>
        )}
        {/* WIN bubble */}
        {bubCop > 0.02 && (
          <div style={{ position: "absolute", left: 14, top: -46, transform: `scale(${bubCop})`, transformOrigin: "0% 100%", padding: "7px 15px", borderRadius: 15, background: CLAY, fontFamily: UI, fontWeight: 900, fontSize: 16, color: "#fff", letterSpacing: 0.4, whiteSpace: "nowrap", boxShadow: "0 5px 12px rgba(0,0,0,0.28)", zIndex: 31 }}>
            SO real! 🎉
          </div>
        )}
      </div>

      {/* RIGHT — glasses DETECTIVE: peeks from the right edge, magnifier held onto the meter */}
      <div style={{ position: "absolute", right: 4, top: 372, zIndex: 30, transform: `translateY(${jumpDet}px) scale(${popDet})`, transformOrigin: "50% 100%" }}>
        <Mascot lf={f} size={104} glasses={1} stern={sternV} nodAmp={human ? 4.4 : 1.5} nodSpeed={human ? 4.4 : 7.5} cheer={cheerV} shock={dtDet} gaze={gazeDet} />
        {/* magnifying glass held right up to the meter while it scans */}
        {magShow > 0.02 && (
          <svg width={84} height={84} viewBox="0 0 84 84" style={{ position: "absolute", left: -132 + magBob, top: -4 + magBob * 0.5, transform: `rotate(-20deg) scale(${0.72 + 0.28 * magShow})`, transformOrigin: "30% 30%", opacity: magShow, zIndex: 32 }}>
            <circle cx={30} cy={30} r={22} fill="rgba(150,195,255,0.26)" stroke="#3A342C" strokeWidth={7} />
            <rect x={44} y={44} width={34} height={11} rx={5} fill="#7A5636" transform="rotate(45 46 46)" />
            <circle cx={22} cy={22} r={6} fill="rgba(255,255,255,0.62)" />
          </svg>
        )}
        {/* INSPECT bubble */}
        {insBub > 0.02 && (
          <div style={{ position: "absolute", right: 10, top: -42, transform: `scale(${insBub})`, transformOrigin: "100% 100%", padding: "6px 14px", borderRadius: 14, background: "#2E2A24", fontFamily: UI, fontWeight: 800, fontSize: 15, color: "#F4EEE2", whiteSpace: "nowrap", boxShadow: "0 5px 12px rgba(0,0,0,0.3)", zIndex: 31 }}>
            scanning… 🔍
          </div>
        )}
        {/* WIN bubble */}
        {bubDet > 0.02 && (
          <div style={{ position: "absolute", right: 12, top: -46, transform: `scale(${bubDet})`, transformOrigin: "100% 100%", padding: "7px 15px", borderRadius: 15, background: GREEN, fontFamily: UI, fontWeight: 900, fontSize: 16, color: "#fff", letterSpacing: 0.4, whiteSpace: "nowrap", boxShadow: "0 5px 12px rgba(0,0,0,0.28)", zIndex: 31 }}>
            HUMAN! ✓
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

const grad2 = `linear-gradient(150deg, ${GOLD}, ${CLAY})`;

export const Rec8Detector: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Bg />
      <ProgressBar />
      <SectionHeader f={f} badge="🔬" l1={<>RUN THE</>} l2={<span style={{ color: CLAY }}>DETECTOR</span>} />
      <Panel><DetectorBrowser /></Panel>
      <CaptionLine words={["it", "reads", "HUMAN"]} hot={2} top={1240} />
    </AbsoluteFill>
  );
};
