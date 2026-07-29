import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { inter, fraunces } from "./fonts";
import {
  Bg, Panel, ProgressBar, HookHeader, Caption, Mascot, AssemblyCtx,
  INK, CLAY, RED, GREEN, MUTE, CO, GOLD, SKY, AMBER, MONO, grad, hexA,
} from "./SlopKit";

// In the assembled reel the ROOT owns one continuous karaoke track, so a hook's
// own static caption must stand down (mirrors Bg/ProgressBar/KaraokeCaption).
const SoloCaption: React.FC<{ words: string[]; hot?: number }> = (p) =>
  React.useContext(AssemblyCtx) ? null : <Caption {...p} />;

/* =========================================================================
   REEL 79 · "OPEN" — 7 free open-source repos everyone is paying for.
   THREE HOOK VARIANTS. House chassis (SlopKit): cream Bg + status rail +
   dark Panel as the stage + white HookHeader pill + karaoke caption.
   Diorama lives INSIDE the Panel in panel-local coords (1012 x 792).
   Rules honoured: frame 0 is COMPLETE (header pre-settled via f+12, nothing
   animates in), the 7 items stay REDACTED (tease the count, never the
   payoff), pop-culture refs are GEOMETRIC, the Claude mascot is the hero.
   ========================================================================= */

const PINKISH = "#E27BA0";

/* ---------- shared props ---------- */

// a locked/redacted repo tile: the NAME is hidden, the ★ proof is not.
const RepoCard: React.FC<{ x?: number; y?: number; s?: number; stars: string; rot?: number; lit?: boolean }> = ({ x = 0, y = 0, s = 1, stars, rot = 0, lit = true }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 268, height: 158, transform: `scale(${s}) rotate(${rot}deg)`, transformOrigin: "50% 50%" }}>
    <div style={{ position: "absolute", inset: 0, borderRadius: 16, background: lit ? "linear-gradient(160deg,#FDF7E8,#F0E2C2)" : "linear-gradient(160deg,#2A3348,#1E263A)", border: `4px solid ${lit ? "#E7B24C" : "#3A4560"}`, boxShadow: lit ? `0 0 38px ${hexA(GOLD, 0.8)}, 0 14px 26px rgba(0,0,0,0.45)` : "0 10px 20px rgba(0,0,0,0.45)" }} />
    <div style={{ position: "absolute", left: 16, top: 16, display: "flex", alignItems: "center", gap: 9 }}>
      <div style={{ width: 30, height: 24, borderRadius: 5, background: lit ? CLAY : "#4A5670" }} />
      {[46, 30, 62].map((w, i) => <div key={i} style={{ width: w, height: 17, borderRadius: 4, background: lit ? "rgba(60,48,32,0.82)" : "rgba(160,175,205,0.5)" }} />)}
      <span style={{ fontSize: 19, lineHeight: 1 }}>{"🔒"}</span>
    </div>
    <div style={{ position: "absolute", left: 16, top: 58 }}>
      {[[70, 44, 54], [40, 66]].map((row, r) => (
        <div key={r} style={{ display: "flex", gap: 7, marginBottom: 8 }}>
          {row.map((w, i) => <div key={i} style={{ width: w, height: 11, borderRadius: 3, background: lit ? "rgba(90,74,50,0.34)" : "rgba(150,165,195,0.26)" }} />)}
        </div>
      ))}
    </div>
    <div style={{ position: "absolute", left: 16, bottom: 14, display: "flex", alignItems: "center", gap: 7, padding: "5px 12px", borderRadius: 999, background: lit ? "linear-gradient(180deg,#F0CB63,#D39A2A)" : "#323C55", border: `2px solid ${lit ? "#F6E4A0" : "#46536F"}` }}>
      <span style={{ fontSize: 17, color: lit ? "#3a2a05" : GOLD }}>{"★"}</span>
      <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 21, color: lit ? "#3a2a05" : GOLD }}>{stars}</span>
    </div>
    <div style={{ position: "absolute", right: 14, bottom: 16, fontFamily: MONO, fontWeight: 700, fontSize: 15, color: lit ? "rgba(90,74,50,0.6)" : "rgba(150,165,195,0.45)" }}>MIT</div>
  </div>
);

const Sparkle: React.FC<{ x: number; y: number; s?: number; c?: string; o?: number; rot?: number }> = ({ x, y, s = 1, c = "#F6E4A0", o = 1, rot = 0 }) => (
  <svg width={26 * s} height={26 * s} viewBox="0 0 26 26" style={{ position: "absolute", left: x, top: y, opacity: o, transform: `rotate(${rot}deg)` }}>
    <polygon points="13,0 15.6,10.4 26,13 15.6,15.6 13,26 10.4,15.6 0,13 10.4,10.4" fill={c} />
  </svg>
);

const Coin: React.FC<{ x: number; y: number; s?: number; rot?: number }> = ({ x, y, s = 1, rot = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 30 * s, height: 30 * s, borderRadius: "50%", background: grad("#F0CB63", "#B98C2C"), border: `${2 * s}px solid #8B6512`, transform: `rotate(${rot}deg)`, boxShadow: `0 ${3 * s}px ${6 * s}px rgba(0,0,0,0.45)` }}>
    <div style={{ position: "absolute", inset: 5 * s, borderRadius: "50%", border: `${1.6 * s}px solid rgba(139,101,18,0.55)` }} />
  </div>
);

// warm rim-light + vignette so the clay props read on the dark stage
const StageLight: React.FC<{ c?: string }> = ({ c = "#FFD9A0" }) => (<>
  <div style={{ position: "absolute", left: "50%", top: -120, width: 900, height: 620, marginLeft: -450, borderRadius: "50%", background: `radial-gradient(ellipse at 50% 40%, ${hexA(c, 0.14)}, transparent 68%)`, filter: "blur(24px)" }} />
  <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 160px rgba(0,0,0,0.65)", pointerEvents: "none" }} />
</>);

/* =========================================================================
   VARIANT A — "ITEM GET"  (Zelda dungeon: 7 chests, you already own them)
   ========================================================================= */
export const OpenHookA: React.FC = () => {
  const f = useCurrentFrame();
  const flick = 0.82 + 0.18 * Math.sin(f / 3.1) + 0.06 * Math.sin(f / 1.7);
  const bob = Math.sin(f / 11) * 5;
  const beam = 0.4 + 0.08 * Math.sin(f / 9);

  const Torch: React.FC<{ x: number; y: number }> = ({ x, y }) => (
    <div style={{ position: "absolute", left: x, top: y, width: 70, height: 150 }}>
      <div style={{ position: "absolute", left: -150, top: -130, width: 370, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${hexA(AMBER, 0.34 * flick)}, transparent 64%)`, filter: "blur(16px)" }} />
      <div style={{ position: "absolute", left: 22, top: 58, width: 24, height: 84, background: grad("#5C4A33", "#3A2C1B"), borderRadius: 4 }} />
      <div style={{ position: "absolute", left: 6, top: 46, width: 56, height: 20, borderRadius: 5, background: "#6B573C" }} />
      <div style={{ position: "absolute", left: 2, top: 66, width: 66, height: 10, borderRadius: 4, background: "#4A3A28" }} />
      <div style={{ position: "absolute", left: 12, top: -14 - flick * 12, width: 44, height: 74 * flick, borderRadius: "50% 50% 40% 40%", background: grad("#F7D97A", "#E4622B"), filter: "blur(1px)" }} />
      <div style={{ position: "absolute", left: 24, top: 6 - flick * 7, width: 20, height: 40 * flick, borderRadius: "50%", background: "#FFF3C8" }} />
      {[0, 1, 2].map((i) => <Sparkle key={i} x={16 + i * 16} y={-46 - ((f * 2.4 + i * 30) % 60)} s={0.42} c="#F7D97A" o={0.55} rot={f * 3} />)}
    </div>
  );

  const Chest: React.FC<{ x: number; y: number; s?: number; n: number }> = ({ x, y, s = 1, n }) => (
    <div style={{ position: "absolute", left: x, top: y, width: 132, height: 108, transform: `scale(${s})`, transformOrigin: "50% 100%" }}>
      <div style={{ position: "absolute", left: 4, top: 94, width: 124, height: 18, borderRadius: "50%", background: "rgba(0,0,0,0.55)", filter: "blur(5px)" }} />
      <div style={{ position: "absolute", left: 0, top: 40, width: 132, height: 60, borderRadius: "0 0 8px 8px", background: grad("#7A5433", "#553719"), border: "3px solid #3E2712" }} />
      <div style={{ position: "absolute", left: 0, top: 8, width: 132, height: 38, borderRadius: "16px 16px 0 0", background: grad("#8C6039", "#63401F"), border: "3px solid #3E2712" }} />
      <div style={{ position: "absolute", left: 0, top: 42, width: 132, height: 8, background: "#3E2712" }} />
      {[16, 106].map((bx, i) => <div key={i} style={{ position: "absolute", left: bx, top: 10, width: 11, height: 88, background: grad("#E7C463", "#B98C2C") }} />)}
      <div style={{ position: "absolute", left: 50, top: 48, width: 32, height: 34, borderRadius: 5, background: grad("#E7C463", "#B98C2C"), border: "3px solid #7C5B17" }} />
      <div style={{ position: "absolute", left: 60, top: 58, width: 12, height: 12, borderRadius: "50%", background: "#5A3F0E" }} />
      <div style={{ position: "absolute", left: 63, top: 68, width: 6, height: 10, background: "#5A3F0E" }} />
      <div style={{ position: "absolute", left: 44, top: -34, width: 46, height: 28, borderRadius: 7, background: "#1B2337", border: `3px solid ${GOLD}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 19, color: GOLD }}>{n}</div>
    </div>
  );

  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <HookHeader f={f + 12} big="7 CLAUDE TOOLS" hot="YOU ALREADY OWN" />
      <Panel glow={hexA(GOLD, 0.3)}>
        {/* ---- stone dungeon wall ---- */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#1B2338 0%,#141A2B 62%,#0D1220 100%)" }} />
        {Array.from({ length: 10 }, (_, r) => (
          <div key={r} style={{ position: "absolute", left: r % 2 ? -60 : 0, top: r * 56, display: "flex", gap: 5 }}>
            {Array.from({ length: 10 }, (_, c) => (
              <div key={c} style={{ width: 118, height: 50, borderRadius: 4, background: (r + c) % 3 === 0 ? "#252E45" : (r + c) % 3 === 1 ? "#202839" : "#232C42", boxShadow: "inset 0 -3px 0 rgba(0,0,0,0.32), inset 0 2px 0 rgba(255,255,255,0.045)" }} />
            ))}
          </div>
        ))}
        {/* moss + cracks + iron rings for texture */}
        {[[80, 190], [640, 96], [930, 300]].map(([mx, my], i) => (
          <div key={i} style={{ position: "absolute", left: mx, top: my, width: 84, height: 26, borderRadius: 10, background: hexA(GREEN, 0.16), filter: "blur(4px)" }} />
        ))}
        {[[300, 60], [790, 214]].map(([cx, cy], i) => (
          <div key={i} style={{ position: "absolute", left: cx, top: cy, width: 4, height: 88, background: "rgba(8,12,22,0.75)", transform: `rotate(${i ? 12 : -9}deg)` }} />
        ))}
        {[[196, 262], [826, 262]].map(([rx, ry], i) => (
          <div key={i} style={{ position: "absolute", left: rx, top: ry, width: 34, height: 34, borderRadius: "50%", border: "6px solid #3A4560" }} />
        ))}
        {/* hanging chain */}
        {Array.from({ length: 7 }, (_, i) => (
          <div key={i} style={{ position: "absolute", left: 474, top: -6 + i * 22, width: 16, height: 20, borderRadius: "50%", border: "4px solid #39435C" }} />
        ))}

        {/* ---- floor ---- */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 542, height: 250, background: "linear-gradient(180deg,#151C2E,#080C16)" }} />
        {Array.from({ length: 4 }, (_, r) => (
          <div key={r} style={{ position: "absolute", left: -40 - r * 30, right: -40 - r * 30, top: 556 + r * 60, height: 3, background: "rgba(120,145,190,0.10)" }} />
        ))}
        {Array.from({ length: 9 }, (_, c) => (
          <div key={c} style={{ position: "absolute", left: 506 + (c - 4) * 120, top: 542, width: 3, height: 250, background: "rgba(120,145,190,0.08)", transform: `rotate(${(c - 4) * 3.6}deg)`, transformOrigin: "50% 0%" }} />
        ))}

        <StageLight />
        <Torch x={22} y={300} /><Torch x={920} y={60} />

        {/* ---- shop sign, mounted RIGHT under the chest shelves (clear of the header) ---- */}
        <div style={{ position: "absolute", left: 706, top: 452, width: 218, transform: "rotate(-5deg)" }}>
          <div style={{ position: "absolute", left: 100, top: -26, width: 6, height: 28, background: "#4A3A28" }} />
          <div style={{ padding: "12px 0 14px", borderRadius: 10, background: grad("#6B4C2E", "#4A331B"), border: "4px solid #35230F", textAlign: "center", boxShadow: "0 14px 24px rgba(0,0,0,0.55)" }}>
            <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 15, color: "#D9C3A0", letterSpacing: 2 }}>SHOP PRICE</div>
            <div style={{ position: "relative", display: "inline-block", marginTop: 4 }}>
              <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 46, color: "#F0E2C2" }}>$49</span>
              <div style={{ position: "absolute", left: -10, right: -10, top: 30, height: 8, borderRadius: 4, background: RED, transform: "rotate(-10deg)", boxShadow: `0 0 14px ${hexA(RED, 0.95)}` }} />
            </div>
            <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 40, color: GREEN, marginTop: 2, textShadow: `0 0 18px ${hexA(GREEN, 0.8)}` }}>$0</div>
          </div>
        </div>

        {/* ---- the 6 still-locked chests on the back ledge, RIGHT ---- */}
        <div style={{ position: "absolute", left: 566, top: 402, width: 446, height: 18, background: "#2B354C", boxShadow: "0 7px 0 #1A2133" }} />
        {[0, 1, 2].map((i) => <Chest key={i} x={584 + i * 148} y={320} s={0.62} n={i + 2} />)}
        {[0, 1, 2].map((i) => <Chest key={`b${i}`} x={584 + i * 148} y={196} s={0.5} n={i + 5} />)}
        <div style={{ position: "absolute", left: 566, top: 282, width: 446, height: 14, background: "#232C42", boxShadow: "0 6px 0 #161D2E" }} />

        {/* ---- light column out of chest #1 ---- */}
        <div style={{ position: "absolute", left: 150, top: -40, width: 380, height: 660, background: `linear-gradient(180deg, ${hexA(GOLD, 0)} 0%, ${hexA("#FFE9A8", beam)} 56%, ${hexA("#FFF3C8", beam + 0.18)} 100%)`, clipPath: "polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)", filter: "blur(10px)" }} />

        {/* ---- the lid, flung back BEHIND the chest ---- */}
        <div style={{ position: "absolute", left: 64, top: 470, width: 232, height: 70, borderRadius: "18px 18px 6px 6px", background: grad("#7A5433", "#4E3117"), border: "5px solid #3E2712", transform: "rotate(-34deg)", boxShadow: "0 12px 20px rgba(0,0,0,0.55)" }}>
          {[36, 176].map((bx, i) => <div key={i} style={{ position: "absolute", left: bx, top: -2, width: 15, height: 70, background: grad("#C9A24A", "#96721E") }} />)}
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 10, background: "#3E2712" }} />
        </div>

        {/* ---- the mascot, item-get pose (the chest is drawn OVER its feet) ---- */}
        <div style={{ position: "absolute", left: 176, top: 296, filter: "drop-shadow(0 18px 24px rgba(0,0,0,0.6))" }}>
          <Mascot lf={f} size={286} cheer={1} gaze={0} nodAmp={2} nodSpeed={13} />
        </div>
        {/* ---- the prize, held overhead, name redacted ---- */}
        <div style={{ position: "absolute", left: 186, top: 120 + bob }}>
          <RepoCard s={1.05} stars="48.2k" rot={-3} lit />
        </div>

        {/* ---- chest #1, already burst open, IN FRONT of the mascot ---- */}
        <div style={{ position: "absolute", left: 196, top: 512, width: 306, height: 150 }}>
          <div style={{ position: "absolute", left: 6, top: 130, width: 294, height: 32, borderRadius: "50%", background: "rgba(0,0,0,0.6)", filter: "blur(8px)" }} />
          <div style={{ position: "absolute", left: 0, top: 26, width: 306, height: 116, borderRadius: "0 0 12px 12px", background: grad("#7A5433", "#553719"), border: "5px solid #3E2712" }} />
          <div style={{ position: "absolute", left: 12, top: 18, width: 282, height: 32, borderRadius: 9, background: "#FFF3C8", boxShadow: `0 0 58px ${hexA("#FFE9A8", 1)}` }} />
          {[34, 246].map((bx, i) => <div key={i} style={{ position: "absolute", left: bx, top: 28, width: 20, height: 114, background: grad("#E7C463", "#B98C2C") }} />)}
          <div style={{ position: "absolute", left: 136, top: 66, width: 34, height: 36, borderRadius: 5, background: grad("#E7C463", "#B98C2C"), border: "3px solid #7C5B17" }} />
        </div>

        {/* ---- gold spilling on the floor (density) ---- */}
        <Coin x={120} y={706} s={1.15} rot={12} /><Coin x={168} y={730} s={0.9} rot={-24} />
        <Coin x={62} y={742} s={1.0} rot={40} /><Coin x={214} y={700} s={0.8} rot={8} />
        <Coin x={470} y={716} s={1.05} rot={-14} /><Coin x={528} y={742} s={0.85} rot={30} />
        <Coin x={412} y={748} s={0.95} rot={-6} /><Coin x={618} y={718} s={0.8} rot={22} />
        <Coin x={690} y={744} s={1.0} rot={-32} /><Coin x={846} y={726} s={0.9} rot={16} />
        {[[300, 736, SKY], [760, 706, PINKISH], [900, 750, GREEN]].map(([gx, gy, gc], i) => (
          <div key={i} style={{ position: "absolute", left: gx as number, top: gy as number, width: 26, height: 26, background: gc as string, transform: "rotate(45deg)", boxShadow: `0 0 16px ${gc as string}` }} />
        ))}

        {/* ---- star burst ---- */}
        {Array.from({ length: 26 }, (_, i) => {
          const a = (i / 26) * Math.PI * 2;
          const rad = 156 + (i % 5) * 44 + Math.sin(f / 8 + i) * 12;
          return <Sparkle key={i} x={326 + Math.cos(a) * rad * 1.2} y={206 + Math.sin(a) * rad * 0.8} s={0.5 + (i % 4) * 0.24} o={0.42 + 0.5 * Math.abs(Math.sin(f / 9 + i * 1.3))} rot={f * 1.4 + i * 30} />;
        })}

        {/* ---- foreground rubble for depth ---- */}
        <div style={{ position: "absolute", left: -34, bottom: -26, width: 268, height: 112, borderRadius: 10, background: "#080C16", transform: "rotate(4deg)" }} />
        <div style={{ position: "absolute", right: -44, bottom: -34, width: 310, height: 124, borderRadius: 10, background: "#080C16", transform: "rotate(-3deg)" }} />
      </Panel>
      <SoloCaption words={["Everyone", "is", "paying"]} hot={2} />
    </AbsoluteFill>
  );
};

/* =========================================================================
   VARIANT B — "THE CLAW"  (arcade: $49.99 a grab, free crate right beside it)
   ========================================================================= */
export const OpenHookB: React.FC = () => {
  const f = useCurrentFrame();
  const neon = 0.72 + 0.28 * Math.abs(Math.sin(f / 13));
  const spot = 0.52 + 0.08 * Math.sin(f / 17);

  const Prize: React.FC<{ x: number; y: number; s?: number; lit?: boolean; rot?: number }> = ({ x, y, s = 1, lit = false, rot = 0 }) => (
    <div style={{ position: "absolute", left: x, top: y, width: 72, height: 72, transform: `scale(${s}) rotate(${rot}deg)` }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 12, background: lit ? grad("#F7D97A", "#D39A2A") : grad("#3B4A66", "#26314A"), border: `3px solid ${lit ? "#FFF0BE" : "#4E5C7E"}`, boxShadow: lit ? `0 0 28px ${hexA(GOLD, 0.9)}` : "0 6px 12px rgba(0,0,0,0.45)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 30, height: 9, background: lit ? "rgba(255,255,255,0.6)" : "rgba(150,170,208,0.22)" }} />
      <div style={{ position: "absolute", left: 31, top: 0, bottom: 0, width: 9, background: lit ? "rgba(255,255,255,0.6)" : "rgba(150,170,208,0.22)" }} />
      {lit
        ? <div style={{ position: "absolute", left: 0, right: 0, top: 17, textAlign: "center", fontSize: 34, lineHeight: 1, color: "#7A5410" }}>{"★"}</div>
        : <div style={{ position: "absolute", left: 0, right: 0, top: 20, textAlign: "center", fontSize: 26, lineHeight: 1, filter: "grayscale(0.35) brightness(0.85)" }}>{"🔒"}</div>}
    </div>
  );

  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <HookHeader f={f + 12} big="STOP PAYING FOR" hot="7 FREE CLAUDE TOOLS" />
      <Panel glow={hexA(CO, 0.32)}>
        {/* ---- arcade back wall + silhouetted cabinets ---- */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#141C33 0%,#0E1424 58%,#080C16 100%)" }} />
        {[[16, 0], [138, 1], [260, 0], [382, 1]].map(([x, k], i) => (
          <div key={i} style={{ position: "absolute", left: x as number, top: 52, width: 104, height: 268, borderRadius: "14px 14px 0 0", background: "#151D30", border: "3px solid #1E2942" }}>
            <div style={{ position: "absolute", left: 11, top: 20, right: 11, height: 70, borderRadius: 6, background: k ? hexA(SKY, 0.28) : hexA(PINKISH, 0.26), boxShadow: `0 0 20px ${k ? hexA(SKY, 0.45) : hexA(PINKISH, 0.4)}` }} />
            <div style={{ position: "absolute", left: 18, top: 108, right: 18, height: 8, borderRadius: 4, background: "#26324C" }} />
            <div style={{ position: "absolute", left: 26, top: 130, width: 18, height: 18, borderRadius: "50%", background: "#B23A34" }} />
            <div style={{ position: "absolute", left: 56, top: 130, width: 18, height: 18, borderRadius: "50%", background: "#3E6FBF" }} />
          </div>
        ))}
        {/* neon strip + hanging pennants */}
        <div style={{ position: "absolute", left: 30, right: 30, top: 22, height: 9, borderRadius: 6, background: grad("#F06E9A", "#7C6BE8"), opacity: neon, boxShadow: `0 0 30px ${hexA(PINKISH, 0.85 * neon)}` }} />
        {Array.from({ length: 13 }, (_, i) => (
          <div key={i} style={{ position: "absolute", left: 26 + i * 78, top: 34, width: 0, height: 0, borderLeft: "22px solid transparent", borderRight: "22px solid transparent", borderTop: `30px solid ${[GOLD, PINKISH, SKY, GREEN][i % 4]}`, opacity: 0.55 }} />
        ))}
        {/* ceiling lamp */}
        <div style={{ position: "absolute", left: 700, top: -30, width: 190, height: 84, borderRadius: "0 0 90px 90px", background: grad("#2A3450", "#18203A"), border: "3px solid #35415E" }} />
        <div style={{ position: "absolute", left: 726, top: 42, width: 138, height: 20, borderRadius: 10, background: "#FFE9A8", filter: "blur(3px)", opacity: 0.8 }} />

        {/* ---- arcade carpet ---- */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 592, height: 200, background: "linear-gradient(180deg,#1A1233,#0D0A1C)" }} />
        {Array.from({ length: 34 }, (_, i) => (
          <div key={i} style={{ position: "absolute", left: (i * 71) % 1010, top: 604 + ((i * 37) % 176), width: 16, height: 7, borderRadius: 3, background: [SKY, PINKISH, GOLD, GREEN][i % 4], opacity: 0.42, transform: `rotate(${(i * 43) % 180}deg)` }} />
        ))}

        {/* ================= the claw machine ================= */}
        <div style={{ position: "absolute", left: 22, top: 118, width: 404, height: 566 }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: 16, background: grad("#B23A34", "#7C2420"), border: "5px solid #5C1714", boxShadow: "0 26px 44px rgba(0,0,0,0.65)" }} />
          <div style={{ position: "absolute", left: 14, top: 12, right: 14, height: 68, borderRadius: 10, background: grad("#20283E", "#141B2C"), border: `3px solid ${GOLD}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 26px ${hexA(GOLD, 0.55)}` }}>
            <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 38, color: "#FFE9A8", textShadow: `0 0 20px ${hexA(GOLD, 0.95)}` }}>AI TOOLS</span>
          </div>
          {Array.from({ length: 8 }, (_, i) => <div key={i} style={{ position: "absolute", left: 24 + i * 50, top: 88, width: 13, height: 13, borderRadius: "50%", background: i % 2 ? "#FFF3C8" : GOLD, opacity: 0.45 + 0.55 * Math.abs(Math.sin(f / 6 + i)), boxShadow: `0 0 12px ${GOLD}` }} />)}
          {/* glass box — pale, reads as glass */}
          <div style={{ position: "absolute", left: 22, top: 112, right: 22, height: 318, borderRadius: 10, background: "linear-gradient(160deg, rgba(196,226,245,0.30), rgba(120,170,215,0.14))", border: "4px solid #5C1714", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "rgba(12,22,44,0.72)" }} />
            <div style={{ position: "absolute", left: -70, top: -40, width: 150, height: 430, background: "rgba(255,255,255,0.16)", transform: "rotate(16deg)" }} />
            <div style={{ position: "absolute", left: 8, right: 8, top: 10, height: 9, borderRadius: 4, background: "#8A96AE" }} />
            <div style={{ position: "absolute", left: 168, top: 18, width: 6, height: 104, background: "#9AA6BE" }} />
            <div style={{ position: "absolute", left: 138, top: 118, width: 66, height: 22, borderRadius: 5, background: grad("#C6D0E2", "#7C88A2") }} />
            <div style={{ position: "absolute", left: 134, top: 136, width: 14, height: 56, background: "#9AA6BE", transform: "rotate(26deg)", transformOrigin: "50% 0%" }} />
            <div style={{ position: "absolute", left: 190, top: 136, width: 14, height: 56, background: "#9AA6BE", transform: "rotate(-26deg)", transformOrigin: "50% 0%" }} />
            <div style={{ position: "absolute", left: 164, top: 136, width: 14, height: 50, background: "#8A96AE" }} />
            <Prize x={4} y={216} s={0.92} rot={-8} /><Prize x={72} y={232} s={0.86} rot={6} />
            <Prize x={136} y={220} s={0.98} rot={-3} /><Prize x={210} y={234} s={0.82} rot={11} />
            <Prize x={272} y={218} s={0.9} rot={-6} /><Prize x={40} y={178} s={0.74} rot={14} />
            <Prize x={188} y={180} s={0.72} rot={-12} /><Prize x={252} y={160} s={0.62} rot={20} />
          </div>
          {/* coin plate + spend counter + joystick */}
          <div style={{ position: "absolute", left: 22, top: 444, right: 22, height: 60, borderRadius: 10, background: "#5C1714", border: "3px solid #3E0E0C", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px" }}>
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 30, color: "#FFE9A8" }}>$49.99</span>
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 18, color: "#F3B9A6", letterSpacing: 1 }}>PER GRAB</span>
          </div>
          <div style={{ position: "absolute", left: 22, top: 514, width: 208, height: 42, borderRadius: 8, background: "#120C1E", border: "3px solid #3E0E0C", display: "flex", alignItems: "center", justifyContent: "center", gap: 9 }}>
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 14, color: "#8A7FA6" }}>SPENT</span>
            <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 26, color: RED, textShadow: `0 0 14px ${hexA(RED, 0.95)}` }}>$2,388</span>
          </div>
          <div style={{ position: "absolute", left: 300, top: 528, width: 12, height: 34, background: "#3E0E0C", transform: "rotate(-14deg)", transformOrigin: "50% 100%" }} />
          <div style={{ position: "absolute", left: 290, top: 514, width: 32, height: 32, borderRadius: "50%", background: grad("#E9645C", "#B23A34"), border: "3px solid #5C1714" }} />
          <div style={{ position: "absolute", left: 250, top: 522, width: 34, height: 12, borderRadius: 3, background: "#2A0908", boxShadow: "inset 0 2px 5px rgba(0,0,0,0.85)" }} />
        </div>

        {/* ---- the mascot, still feeding it coins, FULLY visible on the carpet ---- */}
        <div style={{ position: "absolute", left: 404, top: 424, filter: "drop-shadow(0 16px 22px rgba(0,0,0,0.65))", zIndex: 6 }}>
          <Mascot lf={f} size={228} shock={0.44} gaze={-2} nodAmp={2} nodSpeed={12} />
        </div>
        {/* coin stack + receipt at its feet */}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} style={{ position: "absolute", left: 372 + (i % 2) * 5, top: 690 - i * 13, width: 56, height: 18, borderRadius: "50%", background: grad("#F0CB63", "#B98C2C"), border: "2px solid #8B6512", zIndex: 7 }} />
        ))}
        <div style={{ position: "absolute", left: 250, top: 688, width: 100, height: 150, background: "#F4F1EA", transform: "rotate(-13deg)", boxShadow: "0 10px 18px rgba(0,0,0,0.55)", zIndex: 7, clipPath: "polygon(0 0,100% 0,100% 96%,86% 100%,72% 96%,58% 100%,44% 96%,30% 100%,16% 96%,0 100%)" }}>
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} style={{ position: "absolute", left: 11, right: 11, top: 16 + i * 24, display: "flex", justifyContent: "space-between", fontFamily: MONO, fontSize: 13, fontWeight: 700, color: "#6B6154" }}>
              <span>AI</span><span>49.99</span>
            </div>
          ))}
        </div>

        {/* ================= the free crate, ignored ================= */}
        <div style={{ position: "absolute", left: 636, top: 150, width: 330, height: 470, background: `linear-gradient(180deg, ${hexA("#FFE9A8", spot * 0.45)}, transparent 76%)`, clipPath: "polygon(34% 0%, 66% 0%, 100% 100%, 0% 100%)", filter: "blur(12px)" }} />
        <div style={{ position: "absolute", left: 662, top: 396, width: 330, height: 250 }}>
          <div style={{ position: "absolute", left: 10, top: 228, width: 310, height: 30, borderRadius: "50%", background: "rgba(0,0,0,0.6)", filter: "blur(8px)" }} />
          {/* lid leaning against the crate, clearly a lid */}
          <div style={{ position: "absolute", left: -78, top: 62, width: 96, height: 178, borderRadius: 6, background: grad("#9A7346", "#63481F"), border: "5px solid #4A3419", transform: "rotate(-14deg)", boxShadow: "0 12px 20px rgba(0,0,0,0.5)" }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 40, height: 12, background: "rgba(74,52,25,0.7)" }} />
            <div style={{ position: "absolute", left: 0, right: 0, top: 118, height: 12, background: "rgba(74,52,25,0.7)" }} />
          </div>
          {/* crate body */}
          <div style={{ position: "absolute", left: 0, top: 62, width: 330, height: 178, borderRadius: 8, background: grad("#A87C4C", "#75552C"), border: "5px solid #4A3419", boxShadow: "0 20px 32px rgba(0,0,0,0.6)" }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 8, height: 11, background: "rgba(74,52,25,0.6)" }} />
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 20, height: 11, background: "rgba(74,52,25,0.6)" }} />
            <div style={{ position: "absolute", left: 0, right: 0, top: 44, textAlign: "center", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 33, letterSpacing: 2, color: "#3B2A12", textShadow: "0 1px 0 rgba(255,235,190,0.4)" }}>OPEN SOURCE</div>
            <div style={{ position: "absolute", left: 0, right: 0, top: 88, textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 52, color: "#2FA97C", textShadow: `0 0 22px ${hexA(GREEN, 0.85)}` }}>FREE</div>
          </div>
          {/* the SAME prizes, glowing, spilling out */}
          <Prize x={14} y={-4} s={1.08} lit rot={-9} />
          <Prize x={100} y={-36} s={1.18} lit rot={5} />
          <Prize x={190} y={-14} s={1.02} lit rot={13} />
          <Prize x={258} y={8} s={0.94} lit rot={-6} />
          <Prize x={-40} y={214} s={0.88} lit rot={18} />
          <Prize x={286} y={210} s={0.92} lit rot={-14} />
        </div>
        {Array.from({ length: 14 }, (_, i) => (
          <Sparkle key={i} x={640 + ((i * 97) % 340)} y={286 + ((i * 61) % 210)} s={0.5 + (i % 3) * 0.3} o={0.4 + 0.5 * Math.abs(Math.sin(f / 8 + i))} rot={f + i * 40} />
        ))}
        <StageLight c="#FFC9C0" />
      </Panel>
      <SoloCaption words={["that", "already", "exist"]} hot={1} />
    </AbsoluteFill>
  );
};

/* =========================================================================
   VARIANT C — "THE SHOWCASE"  (game show: how much are you paying? → $0)
   ========================================================================= */
export const OpenHookC: React.FC = () => {
  const f = useCurrentFrame();
  const chase = (i: number) => 0.35 + 0.65 * Math.abs(Math.sin(f / 5 + i * 0.7));

  const Booth: React.FC<{ x: number; n: number; open?: boolean }> = ({ x, n, open }) => (
    <div style={{ position: "absolute", left: x, top: 434, width: 92, height: 196 }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: "8px 8px 0 0", background: grad("#1D2438", "#0E1424"), border: "3px solid #2C3652" }} />
      {open ? (
        <>
          <div style={{ position: "absolute", left: 5, top: 5, right: 5, bottom: 5, borderRadius: 5, background: `radial-gradient(circle at 50% 44%, ${hexA("#FFE9A8", 0.6)}, transparent 72%)` }} />
          {/* mini redacted repo tile — name hidden, ★ proof shown */}
          <div style={{ position: "absolute", left: 8, top: 52, width: 74, height: 92, borderRadius: 8, background: "linear-gradient(160deg,#FDF7E8,#F0E2C2)", border: `3px solid ${GOLD}`, boxShadow: `0 0 26px ${hexA(GOLD, 0.9)}` }}>
            <div style={{ position: "absolute", left: 7, top: 8, display: "flex", gap: 4, alignItems: "center" }}>
              <div style={{ width: 13, height: 11, borderRadius: 2, background: CLAY }} />
              <div style={{ width: 18, height: 8, borderRadius: 2, background: "rgba(60,48,32,0.8)" }} />
              <span style={{ fontSize: 11, lineHeight: 1 }}>{"🔒"}</span>
            </div>
            {[[30, 20], [22, 30]].map((row, r) => (
              <div key={r} style={{ position: "absolute", left: 7, top: 28 + r * 12, display: "flex", gap: 4 }}>
                {row.map((w, i) => <div key={i} style={{ width: w, height: 6, borderRadius: 2, background: "rgba(90,74,50,0.3)" }} />)}
              </div>
            ))}
            <div style={{ position: "absolute", left: 7, bottom: 8, display: "flex", alignItems: "center", gap: 3, padding: "3px 7px", borderRadius: 999, background: "linear-gradient(180deg,#F0CB63,#D39A2A)", border: "2px solid #F6E4A0" }}>
              <span style={{ fontSize: 10, color: "#3a2a05" }}>{"★"}</span>
              <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 13, color: "#3a2a05" }}>48.2k</span>
            </div>
          </div>
          {[0, 1, 2, 3].map((i) => <Sparkle key={i} x={4 + i * 24} y={14 + ((i * 37) % 34)} s={0.44} o={0.5 + 0.5 * Math.abs(Math.sin(f / 7 + i))} rot={f * 2} />)}
        </>
      ) : (
        <>
          <div style={{ position: "absolute", left: 4, top: 4, right: 4, bottom: 0, borderRadius: "6px 6px 0 0", background: grad("#B23A34", "#6E1F1B") }} />
          {Array.from({ length: 6 }, (_, i) => <div key={i} style={{ position: "absolute", left: 8 + i * 13, top: 4, width: 7, bottom: 0, background: "rgba(0,0,0,0.24)" }} />)}
          <div style={{ position: "absolute", left: 0, right: 0, top: 84, textAlign: "center", fontSize: 30, lineHeight: 1 }}>{"🔒"}</div>
        </>
      )}
      <div style={{ position: "absolute", left: -4, top: open ? -40 : -12, width: 100, height: 40, borderRadius: 6, background: grad("#C9463F", "#8A2823"), border: "3px solid #5C1714" }} />
      <div style={{ position: "absolute", left: 27, top: -78, width: 38, height: 32, borderRadius: 8, background: "#F4F1EA", border: `3px solid ${GOLD}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 21, color: INK }}>{n}</div>
      {/* footlight */}
      <div style={{ position: "absolute", left: 22, top: 190, width: 48, height: 14, borderRadius: "50%", background: hexA(GOLD, 0.5), filter: "blur(5px)" }} />
    </div>
  );

  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <HookHeader f={f + 12} big="7 CLAUDE TOOLS" hot="THAT COST YOU $0" />
      <Panel glow={hexA(GOLD, 0.34)}>
        {/* ---- studio: deep stage + chase-light arcs ---- */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 26%, #2A2350 0%, #171232 48%, #0B0819 100%)" }} />
        {[0, 1, 2].map((r) => (
          <div key={r} style={{ position: "absolute", left: "50%", top: -320 + r * 60, width: 1220 - r * 160, height: 660 - r * 92, marginLeft: -(1220 - r * 160) / 2, borderRadius: "50%", border: `4px solid ${hexA(GOLD, 0.14)}` }} />
        ))}
        {Array.from({ length: 24 }, (_, i) => {
          const a = Math.PI + (i / 23) * Math.PI;
          return <div key={i} style={{ position: "absolute", left: 500 + Math.cos(a) * 496, top: 236 + Math.sin(a) * 250, width: 20, height: 20, borderRadius: "50%", background: i % 2 ? "#FFF3C8" : GOLD, opacity: chase(i), boxShadow: `0 0 18px ${hexA(GOLD, chase(i))}` }} />;
        })}
        {/* spotlight beams from the rig */}
        {[[190, -40], [820, -40]].map(([bx, by], i) => (
          <div key={i} style={{ position: "absolute", left: bx as number, top: by as number, width: 260, height: 520, background: `linear-gradient(180deg, ${hexA("#FFE9A8", 0.2)}, transparent 74%)`, clipPath: i ? "polygon(40% 0%, 60% 0%, 8% 100%, 0% 86%)" : "polygon(40% 0%, 60% 0%, 100% 86%, 92% 100%)", filter: "blur(10px)" }} />
        ))}

        {/* ---- glossy stage floor ---- */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 604, height: 188, background: "linear-gradient(180deg,#241C46,#0B0819)" }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 604, height: 5, background: hexA(GOLD, 0.4) }} />

        {/* ---- the price board (sits BELOW the header pill) ---- */}
        <div style={{ position: "absolute", left: 300, top: 128, width: 412, height: 208 }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: 16, background: grad("#151C30", "#0B1120"), border: `5px solid ${GOLD}`, boxShadow: `0 0 44px ${hexA(GOLD, 0.45)}, 0 20px 32px rgba(0,0,0,0.65)` }} />
          <div style={{ position: "absolute", left: 0, right: 0, top: 16, textAlign: "center", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 21, letterSpacing: 4, color: "#F3B9A6" }}>YOU ARE PAYING</div>
          <div style={{ position: "absolute", left: 0, right: 0, top: 52, display: "flex", justifyContent: "center", gap: 7 }}>
            {["$", "2", ",", "3", "8", "8"].map((d, i) => (
              <div key={i} style={{ width: d === "," || d === "$" ? 32 : 56, height: 90, borderRadius: 8, background: "#08101E", border: "3px solid #24314C", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: MONO, fontWeight: 900, fontSize: 54, color: RED, textShadow: `0 0 18px ${hexA(RED, 0.95)}` }}>{d}</div>
            ))}
          </div>
          <div style={{ position: "absolute", left: 0, right: 0, top: 156, textAlign: "center", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 23, letterSpacing: 3, color: MUTE }}>A YEAR</div>
        </div>

        {/* ---- 7 numbered booths, 6 still curtained ---- */}
        <Booth x={324} n={1} open />
        {[1, 2, 3, 4, 5, 6].map((i) => <Booth key={i} x={324 + i * 96} n={i + 1} />)}

        {/* ---- the contestant, then the podium OVER its lower half ---- */}
        <div style={{ position: "absolute", left: 62, top: 400, filter: "drop-shadow(0 16px 22px rgba(0,0,0,0.65))" }}>
          <Mascot lf={f} size={230} shock={0.5} gaze={1} nodAmp={2} nodSpeed={12} />
        </div>
        <div style={{ position: "absolute", left: 34, top: 606, width: 272, height: 186, borderRadius: "12px 12px 0 0", background: grad("#332A6A", "#161138"), border: `4px solid ${hexA(GOLD, 0.55)}`, boxShadow: "0 -10px 30px rgba(0,0,0,0.7)" }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 14, textAlign: "center", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 20, letterSpacing: 3, color: hexA("#FFE9A8", 0.9) }}>YOU</div>
          <div style={{ position: "absolute", left: 92, top: 48, width: 84, height: 84, borderRadius: "50%", background: grad("#E9645C", "#A82D28"), border: "6px solid #F4F1EA", boxShadow: `0 0 30px ${hexA(RED, 0.75)}, inset 0 -8px 0 rgba(0,0,0,0.25)` }} />
        </div>

        {/* ---- audience silhouette: heads + shoulders ---- */}
        {Array.from({ length: 13 }, (_, i) => (
          <div key={i} style={{ position: "absolute", left: -10 + i * 84, bottom: -30 + ((i % 3) - 1) * 10 }}>
            <div style={{ position: "absolute", left: 16, top: -34, width: 46, height: 46, borderRadius: "50%", background: "#05070E" }} />
            <div style={{ position: "absolute", left: -4, top: 4, width: 86, height: 70, borderRadius: "40px 40px 0 0", background: "#05070E" }} />
          </div>
        ))}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: -40, height: 70, background: "#05070E" }} />
        <StageLight c="#FFE0B0" />
      </Panel>
      <SoloCaption words={["for", "AI", "tools"]} hot={0} />
    </AbsoluteFill>
  );
};
