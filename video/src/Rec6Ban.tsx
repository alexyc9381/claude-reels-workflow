import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { inter, fraunces } from "./fonts";
import {
  Bg, ProgressBar, Panel, CaptionLine, Mascot, TrafficLights, ClaudeSpark, hexA, CO, GREEN, RED, CLAY, GOLD, APP_BG, APP_INK, APP_DIM, APP_LINE, SectionHeader,
} from "./SlopKit";

const UI = inter.fontFamily, SERIF = fraunces.fontFamily;
const INK = APP_INK, DIM = APP_DIM, LINE = APP_LINE;

// smooth clamped ramp helper
const ramp = (f: number, a: number, b: number, ease = Easing.out(Easing.cubic)) =>
  interpolate(f, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });

/* one draft line. When struck, a red rule sweeps across the text and a
   little "removed" tag slides in on the right. prog 0..1 drives it. */
const DraftLine: React.FC<{
  text: string; struck?: boolean; prog?: number; tag?: string; indent?: number; kept?: boolean;
}> = ({ text, struck = false, prog = 0, tag, indent = 0, kept = false }) => {
  const dim = struck ? 0.34 + 0.66 * (1 - Math.min(1, prog * 1.3)) : 1;
  const tagP = struck ? Math.max(0, Math.min(1, (prog - 0.45) / 0.55)) : 0;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 11, paddingLeft: indent }}>
      <div style={{ position: "relative", display: "inline-block" }}>
        <span style={{ fontFamily: SERIF, fontSize: 24, lineHeight: 1.4, color: kept ? INK : struck ? "#7A756B" : INK, opacity: struck ? dim : 1, fontWeight: 400 }}>{text}</span>
        {struck && (
          <div style={{ position: "absolute", left: -2, top: "52%", height: 3.5, borderRadius: 2, width: `${prog * 100}%`, background: RED, boxShadow: `0 0 8px ${hexA(RED, 0.6)}` }} />
        )}
      </div>
      {struck && tag && (
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "3px 11px", borderRadius: 999, background: hexA(RED, 0.12), border: `1.5px solid ${hexA(RED, 0.55)}`, opacity: tagP, transform: `translateX(${(1 - tagP) * 14}px)`, whiteSpace: "nowrap" }}>
          <svg width={12} height={12} viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" stroke={RED} strokeWidth={3.4} strokeLinecap="round" /></svg>
          <span style={{ fontFamily: UI, fontWeight: 700, fontSize: 14, color: RED, letterSpacing: 0.2 }}>removed</span>
          <span style={{ fontFamily: UI, fontWeight: 500, fontSize: 14, color: "#9A5548" }}>{tag}</span>
        </div>
      )}
    </div>
  );
};

/* the legit Claude desktop app: a follow-up message then the draft gets
   scanned and three AI moves are struck out. Fills the panel at scale 1. */
const BanDeskApp: React.FC = () => {
  const f = useCurrentFrame();

  const userIn = ramp(f, 6, 18);
  const thinking = f >= 24 && f < 42;

  const reply = "Done. Scanned your draft and cut all three:";
  const budget = Math.max(0, Math.floor((f - 42) * 2.0));
  const shownReply = f >= 42 ? reply.slice(0, budget) : "";
  const typingReply = f >= 42 && budget < reply.length;

  const cardIn = ramp(f, 58, 72, Easing.out(Easing.back(1.3)));
  // scan sweep line travels down the draft card
  const scanRaw = ramp(f, 70, 138, Easing.inOut(Easing.quad));
  const scanning = f >= 70 && f < 142;

  // each AI move strikes as the scan passes it
  const introP = ramp(f, 82, 96);
  const listP = ramp(f, 100, 116);
  const concP = ramp(f, 120, 134);

  const chats: [string, boolean][] = [
    ["Voicemail draft", true], ["Landing page copy", false], ["Cold email rewrite", false], ["Blog intro", false],
  ];

  return (
    <AbsoluteFill style={{ background: APP_BG }}>
      {/* mac title bar */}
      <div style={{ height: 42, background: "#EDE9DF", display: "flex", alignItems: "center", padding: "0 16px", borderBottom: `1px solid ${LINE}` }}>
        <TrafficLights pad={0} />
        <div style={{ flex: 1, textAlign: "center", fontFamily: UI, fontSize: 17, fontWeight: 600, color: "#9A958B" }}>Claude</div>
        <div style={{ width: 60 }} />
      </div>

      <div style={{ position: "absolute", top: 42, left: 0, right: 0, bottom: 0, display: "flex" }}>
        {/* sidebar */}
        <div style={{ width: 262, background: "#F1ECE1", borderRight: `1px solid ${LINE}`, padding: "16px 12px", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 6px 14px" }}><ClaudeSpark s={20} /><span style={{ fontFamily: UI, fontWeight: 700, fontSize: 21, color: INK }}>Claude</span></div>
          <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "9px 12px", borderRadius: 11, border: `1px solid ${LINE}`, background: "#fff", marginBottom: 16 }}><span style={{ fontSize: 20, color: CO, fontWeight: 700 }}>+</span><span style={{ fontFamily: UI, fontWeight: 600, fontSize: 16, color: INK }}>New chat</span></div>
          <div style={{ fontFamily: UI, fontSize: 13, fontWeight: 600, color: DIM, padding: "0 6px 8px" }}>Recents</div>
          {chats.map(([t, a], i) => <div key={i} style={{ padding: "9px 12px", borderRadius: 9, background: a ? "#E4DCCC" : "transparent", fontFamily: UI, fontSize: 15, color: a ? INK : "#6E6A60", fontWeight: a ? 600 : 400, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginBottom: 2 }}>{t}</div>)}
          <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 9, padding: "8px 6px" }}><div style={{ width: 30, height: 30, borderRadius: "50%", background: CO, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: UI, fontWeight: 700, fontSize: 15 }}>A</div><span style={{ fontFamily: UI, fontSize: 15, color: INK, fontWeight: 500 }}>Alex</span></div>
        </div>

        {/* chat area */}
        <div style={{ flex: 1, position: "relative" }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 88, padding: "22px 40px", overflow: "hidden" }}>
            <div style={{ maxWidth: 650, margin: "0 auto" }}>
              {/* follow-up user message */}
              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 18, opacity: userIn, transform: `translateY(${(1 - userIn) * 14}px)` }}>
                <div style={{ maxWidth: 560, background: "#EFEAE0", border: `1px solid ${LINE}`, borderRadius: "18px 18px 5px 18px", padding: "13px 18px", fontFamily: UI, fontSize: 19, lineHeight: 1.45, color: INK }}>
                  Now scan your draft and rip out these AI moves: the <b>throat-clearing intro</b>, the <b>rule of three</b>, and the <b>tidy conclusion</b>.
                </div>
              </div>

              {/* claude answer */}
              {f >= 24 && (
                <div style={{ display: "flex", gap: 13 }}>
                  <div style={{ marginTop: 3, flexShrink: 0 }}><ClaudeSpark s={26} /></div>
                  <div style={{ flex: 1 }}>
                    {thinking && <div style={{ display: "flex", gap: 7, paddingTop: 8 }}>{[0, 1, 2].map(i => <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: DIM, opacity: 0.35 + 0.65 * Math.abs(Math.sin((f - 24) / 6 + i * 0.7)) }} />)}</div>}
                    {!thinking && f >= 42 && (
                      <>
                        <p style={{ fontFamily: UI, fontSize: 20, lineHeight: 1.5, color: INK, margin: "2px 0 14px", fontWeight: 500 }}>{shownReply}{typingReply && <span style={{ opacity: (f % 16) < 9 ? 1 : 0, color: CO }}>▍</span>}</p>

                        {/* the DRAFT card */}
                        {cardIn > 0.02 && (
                          <div style={{ position: "relative", background: "#fff", border: `1.5px solid ${LINE}`, borderRadius: 16, boxShadow: "0 6px 20px rgba(0,0,0,0.05)", opacity: Math.min(1, cardIn), transform: `translateY(${(1 - cardIn) * 16}px) scale(${0.98 + cardIn * 0.02})`, overflow: "hidden" }}>
                            {/* card header */}
                            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", borderBottom: `1px solid ${LINE}`, background: "#FBFAF6" }}>
                              <svg width={16} height={16} viewBox="0 0 24 24"><path d="M6 2h9l5 5v15H6z" fill="none" stroke={DIM} strokeWidth={1.8} strokeLinejoin="round" /><path d="M15 2v5h5" fill="none" stroke={DIM} strokeWidth={1.8} strokeLinejoin="round" /></svg>
                              <span style={{ fontFamily: UI, fontSize: 15, fontWeight: 600, color: "#736E64" }}>voicemail-post.md</span>
                              {scanning && <span style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 6, fontFamily: UI, fontSize: 13, fontWeight: 700, color: GREEN }}><span style={{ width: 8, height: 8, borderRadius: "50%", background: GREEN, opacity: 0.5 + 0.5 * Math.abs(Math.sin(f / 4)) }} />scanning</span>}
                            </div>

                            {/* card body + a sweeping scan line over it */}
                            <div style={{ position: "relative", padding: "18px 22px" }}>
                              <DraftLine text="In today's fast-paced world, everyone wants an edge." struck prog={introP} tag="intro" />
                              <DraftLine text="So I stopped letting the model write for me." kept />
                              <DraftLine text="I leave a voicemail first, then cut the ums." kept />
                              <DraftLine text="1. It saves time." struck prog={listP} tag="rule of three" indent={8} />
                              <DraftLine text="2. It sounds human." struck prog={Math.max(0, listP - 0.1)} indent={8} />
                              <DraftLine text="3. It just lands." struck prog={Math.max(0, listP - 0.2)} indent={8} />
                              <DraftLine text="That messy take is the whole point." kept />
                              <DraftLine text="In conclusion, the possibilities are endless." struck prog={concP} tag="conclusion" />

                              {scanning && (
                                <div style={{ position: "absolute", left: 0, right: 0, top: `${8 + scanRaw * 84}%`, height: 30, transform: "translateY(-50%)", pointerEvents: "none" }}>
                                  <div style={{ position: "absolute", left: 0, right: 0, top: "50%", height: 2, background: hexA(GREEN, 0.85), boxShadow: `0 0 14px ${hexA(GREEN, 0.7)}` }} />
                                  <div style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0, background: `linear-gradient(180deg, transparent, ${hexA(GREEN, 0.12)}, transparent)` }} />
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* input box */}
          <div style={{ position: "absolute", left: 40, right: 40, bottom: 20, maxWidth: 650, margin: "0 auto", background: "#fff", border: `1.5px solid ${LINE}`, borderRadius: 16, padding: "12px 16px", display: "flex", alignItems: "center", boxShadow: "0 4px 14px rgba(0,0,0,0.04)" }}>
            <span style={{ fontFamily: UI, fontSize: 18, color: DIM, flex: 1 }}>Reply to Claude…</span>
            <span style={{ fontFamily: UI, fontSize: 14, color: DIM, fontWeight: 600, background: "#F0ECE3", padding: "5px 11px", borderRadius: 999, marginRight: 10 }}>Opus 4.8 ⌄</span>
            <div style={{ width: 38, height: 38, borderRadius: "50%", background: CO, display: "flex", alignItems: "center", justifyContent: "center" }}><svg width={19} height={19} viewBox="0 0 24 24"><path d="M12 20V5M6 11l6-6 6 6" stroke="#fff" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
          </div>
        </div>
      </div>

      {/* ===== two costumed clay mascots leaning IN from the SIDE EDGES, acting ON the draft ===== */}
      {/* (bodies sit above y660 so the global tutorial status bar at the panel bottom stays clear) */}
      {(() => {
        // a clean 0..1 pulse over a strike window [a,b], guarded so it never goes NaN
        const pulse = (a: number, b: number) => Math.max(0, ramp(f, a - 4, a + 4) - ramp(f, b, b + 10));
        const pIntro = pulse(82, 96);   // "throat-clearing intro" struck
        const pList = pulse(100, 116);  // "rule of three" struck
        const pConc = pulse(120, 134);  // "tidy conclusion" struck
        const react = Math.max(pIntro, pList, pConc);          // fires on each strike
        const approve = ramp(f, 84, 138);                       // approval grows as cuts land
        const keepP = ramp(f, 90, 128);                         // buddy endorses the KEPT line
        const done = ramp(f, 132, 146);                         // all three gone -> big finish

        const profIn = ramp(f, 72, 86);   // professor leans in from the LEFT edge
        const buddyIn = ramp(f, 56, 70);  // buddy leans in from the RIGHT edge a touch earlier

        // a springy stamping lunge each time a line gets struck (guarded, never NaN)
        const hopPop = (p: number) => Math.sin(Math.max(0, Math.min(1, p)) * Math.PI);
        const lunge = hopPop(react);                            // 0..1 stamp thrust each strike
        const buddyHop = (hopPop(pList) * 0.6 + hopPop(pConc)) * 16;

        // struck-line anchors in panel-local coords (the three banned moves)
        const XI = 356, YI = 311;   // "...fast-paced world" intro line
        const YL = 487;             // rule-of-three block (centered on line 2 of 3)
        const YC = 619;             // "In conclusion..." line
        // whichever move is striking right now drives the reaching marker's tip
        const ay = (pConc >= pIntro && pConc >= pList) ? YC : (pList >= pIntro ? YL : YI);

        // professor's marking line switches per strike (punchy + short)
        const profLine = pConc > 0.12 ? "and… GONE" : pList > 0.12 ? "textbook slop" : pIntro > 0.12 ? "banned ✗" : "mark it wrong";
        // buddy's approval line grows warmer as the cuts land
        const buddyLine = done > 0.5 ? "SO human 🙌" : approve > 0.55 ? "keep those" : "ooh nice";

        // a red ✗ that STAMPS onto a banned line and STAYS (prog persists 0..1)
        const XStamp = (x: number, y: number, prog: number, pop: number) => prog > 0.01 ? (
          <div style={{ position: "absolute", left: x, top: y, width: 52, height: 52, transform: `translate(-50%,-50%) rotate(${-13 + (1 - pop) * 22}deg) scale(${0.55 + Math.min(1, prog) * 0.45 + pop * 0.35})`, opacity: Math.min(1, prog * 1.7), zIndex: 44, pointerEvents: "none" }}>
            <svg width={52} height={52} viewBox="0 0 24 24"><path d="M5 5l14 14M19 5L5 19" stroke={RED} strokeWidth={4.6} strokeLinecap="round" /></svg>
            {pop > 0.04 && <div style={{ position: "absolute", inset: -10, borderRadius: "50%", border: `3px solid ${hexA(RED, 0.55 * pop)}`, transform: `scale(${1 + pop * 0.9})` }} />}
          </div>
        ) : null;

        // the reaching marker pen the professor jabs from the LEFT edge onto the active line
        const penX = 104, penY = 470, tipX = 344;
        const pdx = tipX - penX, pdy = ay - penY;
        const plen = Math.sqrt(pdx * pdx + pdy * pdy) * (0.62 + 0.38 * react);
        const pang = Math.atan2(pdy, pdx) * 180 / Math.PI;

        return (
          <>
            {/* persistent red ✗ marks landing on each banned move exactly as it strikes */}
            {XStamp(XI, YI, introP, pIntro)}
            {XStamp(XI, YL, listP, pList)}
            {XStamp(XI, YC, concP, pConc)}

            {/* the professor's marker reaching IN to strike the active line */}
            {react > 0.02 && (
              <div style={{ position: "absolute", left: penX, top: penY - 6, width: plen, height: 12, transformOrigin: "0% 50%", transform: `rotate(${pang}deg)`, opacity: Math.min(1, react * 1.4), zIndex: 43, pointerEvents: "none" }}>
                <div style={{ position: "absolute", left: 0, right: 16, top: 2, height: 8, borderRadius: 4, background: "linear-gradient(90deg,#7A4A2E,#B26B3E)", boxShadow: "0 2px 5px rgba(0,0,0,0.3)" }} />
                <div style={{ position: "absolute", right: 0, top: -1, width: 18, height: 14, borderRadius: 3, background: RED, boxShadow: `0 0 8px ${hexA(RED, 0.7)}` }} />
              </div>
            )}

            {/* LEFT edge — the strict PROFESSOR (tweed + glasses): stamps every AI move WRONG */}
            {profIn > 0.01 && (
              <div style={{ position: "absolute", left: -8, top: 428, zIndex: 40, opacity: profIn, transform: `translate(${lunge * 12}px, ${(1 - profIn) * 30 - lunge * 8}px)` }}>
                {/* marking speech nub — switches per struck line, pops on each strike */}
                <div style={{ position: "absolute", left: 96, top: -8, padding: "6px 14px", borderRadius: 13, background: CO, boxShadow: "0 6px 14px rgba(0,0,0,0.28)", fontFamily: UI, fontWeight: 800, fontSize: 17, color: "#fff", whiteSpace: "nowrap", opacity: Math.min(1, 0.5 + react * 0.5) * profIn, transform: `scale(${0.86 + react * 0.2})`, transformOrigin: "0% 100%", zIndex: 42 }}>
                  {profLine}
                  <div style={{ position: "absolute", left: 12, bottom: -8, width: 0, height: 0, borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderTop: `9px solid ${CO}` }} />
                </div>
                <Mascot lf={f} size={118} prof={1} glasses={1} stern={0.35 + react * 0.4} nodAmp={2.2 + react * 2.4} nodSpeed={5} gaze={3} cheer={0.55 + react * 0.4} shock={pList * 0.5} tint="#D97757" />
              </div>
            )}

            {/* buddy's green ✓ endorsing the KEPT human line, tapped in from the right edge */}
            {keepP > 0.02 && (
              <div style={{ position: "absolute", left: 892, top: 570, width: 44, height: 44, transform: `translate(-50%,-50%) scale(${0.6 + Math.min(1, keepP) * 0.5})`, opacity: Math.min(1, keepP * 1.5), zIndex: 44, pointerEvents: "none" }}>
                <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: hexA(GREEN, 0.16), border: `2.5px solid ${GREEN}` }} />
                <svg width={44} height={44} viewBox="0 0 24 24" style={{ position: "relative" }}><path d="M6 12l4 4 8-9" stroke={GREEN} strokeWidth={3.4} fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
            )}

            {/* RIGHT edge — the APPROVING BUDDY (suit + curly perm): nods along, ✓'s the keeper */}
            {buddyIn > 0.01 && (
              <div style={{ position: "absolute", right: -6, top: 452, zIndex: 40, opacity: buddyIn, transform: `translateY(${(1 - buddyIn) * 26 - buddyHop}px)` }}>
                {/* green approval nub, warmer text once the draft is clean */}
                <div style={{ position: "absolute", right: 84, top: -8, padding: "6px 14px", borderRadius: 13, background: GREEN, boxShadow: "0 6px 14px rgba(0,0,0,0.28)", fontFamily: UI, fontWeight: 800, fontSize: 17, color: "#fff", whiteSpace: "nowrap", opacity: Math.min(1, 0.35 + approve * 0.65) * buddyIn, transform: `scale(${0.84 + approve * 0.18 + done * 0.06})`, transformOrigin: "100% 100%", zIndex: 42 }}>
                  {buddyLine}
                  <div style={{ position: "absolute", right: 12, bottom: -8, width: 0, height: 0, borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderTop: `9px solid ${GREEN}` }} />
                </div>
                <Mascot lf={f + 14} size={110} suit={1} fro={1} nodAmp={3.2 + approve * 2.4} nodSpeed={5.5} gaze={-3} cheer={0.2 + approve * 0.5 + done * 0.3} shock={pConc * 0.4} tint="#D97757" />
              </div>
            )}
          </>
        );
      })()}
    </AbsoluteFill>
  );
};

export const Rec6Ban: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Bg />
      <ProgressBar />
      <SectionHeader f={f} badge="🚫" l1={<>BAN ITS</>} l2={<span style={{ color: CLAY }}>3 AI MOVES</span>} />
      <Panel>
        <BanDeskApp />
      </Panel>
      <CaptionLine words={["ban", "the", "AI", "MOVES"]} hot={3} top={1240} />
    </AbsoluteFill>
  );
};
