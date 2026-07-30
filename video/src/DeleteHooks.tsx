import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing, OffthreadVideo, staticFile } from "remotion";
import { inter, fraunces } from "./fonts";
import {
  Bg, Panel, ProgressBar, HookHeader, Caption, Mascot, AssemblyCtx,
  INK, CLAY, CLAYD, RED, GREEN, MUTE, CO, GOLD, SKY, MONO, grad, hexA,
} from "./SlopKit";
import { ClipSlot, Chyron, Binder as WBinder, Lamp, LampPool, Bloom, Shafts, WALL_D, MOSS, OLIVE, SLATE } from "./DeleteWorld";

/* =========================================================================
   REEL 81 · "DELETE" — Claude Code's own creator says throw your setup out.
   THREE HOOK VARIANTS, three different hook families:
     A SHREDDER  contrarian   — destroy the thing you built, it gets smarter
     B TOWER     loss-frame   — the setup you keep adding to IS the bottleneck
     C KEYNOTE   proof-first  — the guy who builds it said this, on stage

   House rules honoured: MATTE animation palette (solid paints, dark shadows,
   ⛔ zero coloured glow, ⛔ zero low-opacity washes), frame 0 is COMPLETE
   (header pre-settled via f+12), the gated payoff (what to KEEP) stays hidden,
   pop-culture refs are geometric, the Claude mascot is the hero.
   ========================================================================= */

/* ---- matte palette ---- */
const WALL = "#3E4E5C", WALL_HI = "#48596A", WALL_LO = "#2B3844";
const WOOD = "#8A6242", WOOD_D = "#6E4A30", WOOD_L = "#A87C4C";
const PAPER = "#F7F5F0", PAPER2 = "#EDE7DA", PAPER3 = "#DED5C4", PAPER4 = "#C6BBA4";
const SH = "0 10px 22px rgba(26,24,19,0.34)", SH_D = "0 20px 38px rgba(26,24,19,0.46)";
const RED_M = "#B4534A", RED_D = "#7A2F2A", TEAL = "#2F6B63", PLUM = "#6E4257";

const OUT = Easing.out(Easing.cubic), IO = Easing.inOut(Easing.cubic), BACK = Easing.out(Easing.back(1.6));
const E = (f: number, a: number, b: number, va = 0, vb = 1, ez: any = OUT) =>
  b <= a ? (f >= b ? vb : va)
         : interpolate(f, [a, b], [va, vb], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ez });
const osc = (f: number, p: number, amp = 1, ph = 0) => Math.sin(f / p + ph) * amp;

// the reel's own karaoke track owns captions when assembled
const SoloCaption: React.FC<{ words: string[]; hot?: number }> = (p) =>
  React.useContext(AssemblyCtx) ? null : <Caption {...p} />;

/* ---- shared world: a warm painted room with a wooden work surface ---- */
const Room: React.FC<{ f: number; deskTop?: number; tint?: string }> = ({ f, deskTop = 560, tint }) => (<>
  <div style={{ position: "absolute", inset: 0, background: WALL }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 168, background: WALL_HI }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: 166, height: 8, background: WALL_LO }} />
  {/* wainscot panelling for texture */}
  {Array.from({ length: 8 }, (_, i) => (
    <div key={i} style={{ position: "absolute", left: 14 + i * 126, top: 196, width: 106, height: 118, borderRadius: 5, background: WALL_HI, boxShadow: "inset 0 -4px 0 rgba(26,24,19,0.18)" }} />
  ))}
  {/* the desk */}
  <div style={{ position: "absolute", left: -20, right: -20, top: deskTop, height: 26, borderRadius: 6, background: WOOD_L }} />
  <div style={{ position: "absolute", left: -20, right: -20, top: deskTop + 24, bottom: 0, background: WOOD }} />
  <div style={{ position: "absolute", left: -20, right: -20, top: deskTop + 26, height: 8, background: WOOD_D }} />
  {Array.from({ length: 8 }, (_, i) => (
    <div key={i} style={{ position: "absolute", left: 6 + i * 132, top: deskTop + 44, width: 108, height: 200, borderRadius: 5, background: WOOD_D, opacity: 0.4 }} />
  ))}
  {tint && <div style={{ position: "absolute", inset: 0, background: tint, opacity: 0.12 }} />}
</>);

/* ---- a labelled ring binder: the geometric stand-in for a saved setup ---- */
const Binder: React.FC<{ x: number; y: number; label: string; c?: string; s?: number; rot?: number; tabs?: number }> =
({ x, y, label, c = RED_M, s = 1, rot = 0, tabs = 3 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 168, height: 206, transform: `scale(${s}) rotate(${rot}deg)`, transformOrigin: "50% 100%" }}>
    <div style={{ position: "absolute", inset: 0, borderRadius: "5px 9px 9px 5px", background: c, boxShadow: SH }} />
    <div style={{ position: "absolute", left: 0, top: 0, width: 26, bottom: 0, borderRadius: "5px 0 0 5px", background: "rgba(26,24,19,0.22)" }} />
    {[0, 1, 2].map((i) => <div key={i} style={{ position: "absolute", left: 7, top: 34 + i * 62, width: 13, height: 13, borderRadius: "50%", background: PAPER3 }} />)}
    {/* the spine label */}
    <div style={{ position: "absolute", left: 40, top: 22, right: 16, padding: "9px 0", borderRadius: 5, background: PAPER, textAlign: "center" }}>
      <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 20, color: INK }}>{label}</span>
    </div>
    {/* index tabs sticking out of the side */}
    {Array.from({ length: tabs }, (_, i) => (
      <div key={i} style={{ position: "absolute", right: -13, top: 76 + i * 34, width: 26, height: 24, borderRadius: "0 5px 5px 0", background: [GOLD, TEAL, CLAY][i % 3] }} />
    ))}
    {[0, 1, 2, 3].map((i) => <div key={i} style={{ position: "absolute", left: 46, right: 22, top: 92 + i * 22, height: 8, borderRadius: 4, background: "rgba(247,245,240,0.5)" }} />)}
  </div>
);

/* ---- a paper strip, for shredder output ---- */
const Strip: React.FC<{ x: number; y: number; h?: number; rot?: number; c?: string }> = ({ x, y, h = 74, rot = 0, c = PAPER }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 11, height: h, borderRadius: 2, background: c, transform: `rotate(${rot}deg)`, boxShadow: "0 3px 6px rgba(26,24,19,0.22)" }} />
);

/* =========================================================================
   A · THE SHREDDER — destroy what you built and it gets smarter
   ========================================================================= */
export const DeleteHookA: React.FC = () => {
  const f = useCurrentFrame();
  const feed = E(f, 0, 1, 1, 1);                 // frame 0 is already mid-shred
  const jitter = osc(f, 2.6, 3);                 // the machine working
  const gauge = 82 + osc(f, 26, 5);
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <HookHeader f={f + 12} big="DELETE YOUR CLAUDE.MD" hot="AND IT GETS SMARTER" />
      <Panel glow={hexA(CO, 0.3)}>
        <Room f={f} deskTop={548} />

        {/* wall chart: pages DOWN, model speed UP */}
        <div style={{ position: "absolute", left: 640, top: 196, width: 336, height: 250, borderRadius: 9, background: PAPER, border: `6px solid ${WOOD}`, boxShadow: SH }}>
          <div style={{ position: "absolute", left: 16, top: 14, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 17, color: MUTE, letterSpacing: 1.6 }}>SETUP vs SPEED</div>
          {/* axes */}
          <div style={{ position: "absolute", left: 22, top: 46, width: 5, height: 168, background: PAPER4 }} />
          <div style={{ position: "absolute", left: 22, top: 210, right: 20, height: 5, background: PAPER4 }} />
          {/* pages falling */}
          <svg width={276} height={168} style={{ position: "absolute", left: 30, top: 46 }}>
            <polyline points="0,18 46,34 92,62 138,96 184,126 230,146 268,154" fill="none" stroke={RED_M} strokeWidth={7} strokeLinecap="round" />
            <polyline points="0,152 46,140 92,116 138,84 184,52 230,28 268,16" fill="none" stroke={TEAL} strokeWidth={7} strokeLinecap="round" />
          </svg>
          <div style={{ position: "absolute", left: 40, bottom: 12, display: "flex", gap: 12 }}>
            {[["PAGES", RED_M], ["SPEED", TEAL]].map(([t, c]) => (
              <span key={t as string} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 14, color: INK }}>
                <span style={{ width: 16, height: 6, borderRadius: 3, background: c as string }} />{t}
              </span>
            ))}
          </div>
        </div>

        {/* the SHREDDER on the desk */}
        <div style={{ position: "absolute", left: 226, top: 372 + jitter * 0.4, width: 400, height: 190 }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: 12, background: RED_M, boxShadow: SH_D }} />
          <div style={{ position: "absolute", left: 8, top: 8, right: 8, height: 12, borderRadius: "8px 8px 0 0", background: "rgba(247,245,240,0.2)" }} />
          {/* the intake slot */}
          <div style={{ position: "absolute", left: 40, top: 34, right: 40, height: 34, borderRadius: 5, background: "#3A1F1C", boxShadow: "inset 0 5px 0 rgba(26,24,19,0.5)" }} />
          {/* teeth */}
          {Array.from({ length: 15 }, (_, i) => (
            <div key={i} style={{ position: "absolute", left: 48 + i * 21, top: 40, width: 12, height: 20, borderRadius: 2, background: PAPER4 }} />
          ))}
          <div style={{ position: "absolute", left: 40, top: 96, right: 40, height: 60, borderRadius: 6, background: RED_D }} />
          <div style={{ position: "absolute", left: 56, top: 112, width: 96, height: 28, borderRadius: 4, background: PAPER, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 17, color: RED_D }}>SHRED</span>
          </div>
          <div style={{ position: "absolute", right: 56, top: 106, width: 40, height: 40, borderRadius: "50%", background: TEAL, border: "4px solid rgba(26,24,19,0.35)" }} />
          <div style={{ position: "absolute", right: 112, top: 112, width: 30, height: 28, borderRadius: 4, background: GOLD, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: MONO, fontWeight: 900, fontSize: 15, color: "#5A4310" }}>{Math.round(gauge)}</div>
        </div>

        {/* the binder going IN, already half-eaten at frame 0 */}
        <div style={{ position: "absolute", left: 336, top: 212, transform: `rotate(${-4 + jitter * 0.6}deg)` }}>
          <Binder x={0} y={0} label="CLAUDE.md" c={RED_M} s={1.0} tabs={3} />
        </div>
        {/* strips pouring out below the desk line */}
        {Array.from({ length: 26 }, (_, i) => {
          const t = ((f * 3 + i * 17) % 120) / 120;
          return <Strip key={i} x={242 + (i * 37) % 372} y={556 + t * 190} h={60 + (i % 4) * 22} rot={(i % 2 ? 1 : -1) * (6 + (i % 5) * 5)} c={i % 5 === 0 ? PAPER2 : PAPER} />;
        })}
        {/* the pile of shredded setup on the floor */}
        {Array.from({ length: 20 }, (_, i) => (
          <Strip key={`p${i}`} x={224 + (i * 41) % 400} y={694 + (i % 3) * 16} h={48 + (i % 3) * 14} rot={70 + (i % 7) * 14} c={i % 4 === 0 ? PAPER2 : PAPER} />
        ))}

        {/* the mascot feeding it, and the queue of binders still to go */}
        <div style={{ position: "absolute", left: 46, top: 336, filter: "drop-shadow(0 18px 24px rgba(26,24,19,0.5))" }}>
          <Mascot lf={f} size={244} cheer={0.45} gaze={2} nodAmp={2.4} nodSpeed={11} />
        </div>
        <div style={{ position: "absolute", left: 706, top: 470 }}><Binder x={0} y={0} label="SKILLS" c={PLUM} s={0.6} rot={-7} tabs={2} /></div>
        <div style={{ position: "absolute", left: 812, top: 484 }}><Binder x={0} y={0} label="HOOKS" c={TEAL} s={0.56} rot={5} tabs={2} /></div>

        <SoloCaption words={["just", "told", "everyone"]} hot={1} />
      </Panel>
    </AbsoluteFill>
  );
};

/* =========================================================================
   B · THE TOWER — the setup you keep adding to IS the bottleneck
   ========================================================================= */
export const DeleteHookB: React.FC = () => {
  const f = useCurrentFrame();
  const lean = osc(f, 15, 1.5);                    // the whole stack wobbles
  const BLOCKS: [string, string][] = [
    ["MEMORY", "#5A7A6A"], ["COMMANDS", CLAY], ["RULES", "#7A6A4A"], ["AGENTS", GOLD],
    ["MCP", "#4A6A8C"], ["HOOKS", TEAL], ["SKILLS", PLUM], ["CLAUDE.md", RED_M],
  ];                                               // index 0 = TOP of the tower
  const BW = 296, BH = 48, GAP = 5;
  const BASE = 566;                                // desk surface
  const CX = 470;
  const pull = 104;                                // the base block already dragged out
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <HookHeader f={f + 12} big="YOUR CLAUDE SETUP" hot="IS THE BOTTLENECK" />
      <Panel glow={hexA(GOLD, 0.28)}>
        <Room f={f} deskTop={BASE} />

        {/* two meters, on the LEFT WALL clear of the tower */}
        <div style={{ position: "absolute", left: 26, top: 196, width: 250, padding: 16, borderRadius: 9, background: PAPER, boxShadow: SH }}>
          {[["SETUP SIZE", 94, RED_M], ["ACTUAL SPEED", 26, TEAL]].map(([t, v, c], i) => (
            <div key={t as string} style={{ marginBottom: i ? 0 : 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 15, color: MUTE, letterSpacing: 1.1 }}>{t}</span>
                <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 17, color: c as string }}>{v}%</span>
              </div>
              <div style={{ height: 18, borderRadius: 9, background: PAPER3, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${v}%`, background: c as string }} />
              </div>
            </div>
          ))}
        </div>

        {/* the tower — offset courses so it reads as stacked bricks with depth */}
        <div style={{ position: "absolute", left: 0, top: 0, right: 0, bottom: 0, transform: `rotate(${lean}deg)`, transformOrigin: `${CX}px ${BASE}px` }}>
          {BLOCKS.map(([label, c], i) => {
            const k = BLOCKS.length - 1 - i;                    // 0 = bottom course
            const isBase = k === 0;
            const stagger = isBase ? -pull : (k % 2 ? 16 : -16) + osc(f, 20, 3, k);
            const top = BASE - (k + 1) * (BH + GAP);
            return (
              <div key={label} style={{ position: "absolute", left: CX - BW / 2 + stagger, top, width: BW, height: BH, borderRadius: 6, background: c, boxShadow: SH }}>
                <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 9, borderRadius: "6px 6px 0 0", background: "rgba(247,245,240,0.24)" }} />
                <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 7, background: "rgba(26,24,19,0.26)" }} />
                <div style={{ position: "absolute", left: 0, right: 0, top: 13, textAlign: "center" }}>
                  <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 21, color: PAPER, letterSpacing: 1 }}>{label}</span>
                </div>
              </div>
            );
          })}
          {/* the gap the pulled base leaves, and dust off it */}
          <div style={{ position: "absolute", left: CX - BW / 2, top: BASE - BH - GAP + 4, width: BW - 40, height: BH - 8, borderRadius: 5, background: WOOD_D }} />
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} style={{ position: "absolute", left: CX - BW / 2 - pull - 26 - i * 17, top: BASE - 42 + (i % 3) * 11, width: 24 + i * 5, height: 12, borderRadius: 7, background: PAPER3 }} />
          ))}
        </div>

        {/* the creator's hand dragging the base course out */}
        <div style={{ position: "absolute", left: 66, top: BASE - 58, width: 220, height: 62 }}>
          <div style={{ position: "absolute", left: 0, top: 16, width: 152, height: 30, borderRadius: 15, background: CLAY, boxShadow: SH }} />
          <div style={{ position: "absolute", left: 134, top: 4, width: 58, height: 54, borderRadius: 11, background: CLAY, boxShadow: SH }} />
          <div style={{ position: "absolute", left: 182, top: 16, width: 26, height: 30, borderRadius: 6, background: CLAYD }} />
        </div>

        {/* the mascot on a stool, still reaching up to add ONE MORE */}
        <div style={{ position: "absolute", left: 742, top: 466, width: 150, height: 100 }}>
          <div style={{ position: "absolute", left: 0, top: 0, width: 150, height: 22, borderRadius: 6, background: WOOD_L, boxShadow: SH }} />
          <div style={{ position: "absolute", left: 16, top: 22, width: 20, height: 78, background: WOOD_D }} />
          <div style={{ position: "absolute", left: 114, top: 22, width: 20, height: 78, background: WOOD_D }} />
          <div style={{ position: "absolute", left: 30, top: 52, width: 90, height: 12, background: WOOD_D }} />
        </div>
        <div style={{ position: "absolute", left: 726, top: 258, filter: "drop-shadow(0 18px 24px rgba(26,24,19,0.5))" }}>
          <Mascot lf={f} size={216} shock={0.5} cheer={0.3} gaze={-2} nodAmp={2} nodSpeed={12} />
        </div>
        <div style={{ position: "absolute", left: 736, top: 196 + osc(f, 16, 4), width: 186, height: 46, borderRadius: 6, background: "#6A5A7A", boxShadow: SH }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 8, borderRadius: "6px 6px 0 0", background: "rgba(247,245,240,0.24)" }} />
          <div style={{ position: "absolute", left: 0, right: 0, top: 13, textAlign: "center", fontFamily: MONO, fontWeight: 900, fontSize: 19, color: PAPER }}>+1 MORE</div>
        </div>

        <SoloCaption words={["build", "a", "bigger", "setup"]} hot={2} />
      </Panel>
    </AbsoluteFill>
  );
};

/* =========================================================================
   C · THE KEYNOTE — the guy who builds it said this, on stage.

   ⬛ THE CLIP SLOT. The real Y Combinator recording drops in here:
        1. put the file at  video/public/delete_clip.mp4
        2. flip HAS_CLIP to true
      Until then the slot renders a labelled placeholder so the composition is
      laid out for real footage from the start (16:9, 452x254 panel-local).
   ========================================================================= */
const HAS_CLIP = false;
const CLIP_SRC = "delete_clip.mp4";

const ClipSlot: React.FC<{ f: number; x: number; y: number; w: number; h: number }> = ({ f, x, y, w, h }) => {
  const play = ((f * 2.2) % 100) / 100;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h }}>
      {/* bezel */}
      <div style={{ position: "absolute", left: -12, top: -12, right: -12, bottom: -12, borderRadius: 12, background: "#2B3844", boxShadow: SH_D }} />
      <div style={{ position: "absolute", left: -12, top: -12, right: -12, height: 10, borderRadius: "12px 12px 0 0", background: "#3E4E5C" }} />
      <div style={{ position: "absolute", inset: 0, borderRadius: 5, overflow: "hidden", background: "#4A5A66" }}>
        {HAS_CLIP ? (
          <OffthreadVideo src={staticFile(CLIP_SRC)} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <>
            {/* placeholder that still reads as footage of a talk */}
            <div style={{ position: "absolute", inset: 0, background: "#55656F" }} />
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: h * 0.34, background: "#3E4E5C" }} />
            {[0.18, 0.42, 0.68].map((k, i) => (
              <div key={i} style={{ position: "absolute", left: w * k, bottom: h * 0.3, width: 58, height: 74 + i * 12, borderRadius: "26px 26px 5px 5px", background: i === 1 ? CLAY : "#7C88A2" }} />
            ))}
            <div style={{ position: "absolute", left: w / 2 - 24, top: h / 2 - 34, width: 0, height: 0, borderTop: "26px solid transparent", borderBottom: "26px solid transparent", borderLeft: `42px solid ${PAPER}` }} />
            <div style={{ position: "absolute", left: 12, top: 12, padding: "5px 11px", borderRadius: 5, background: PAPER, fontFamily: MONO, fontWeight: 900, fontSize: 14, color: RED_D }}>THE CLIP</div>
          </>
        )}
        {/* player chrome, so it reads as a recording either way */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 30, background: "#2B3844", display: "flex", alignItems: "center", gap: 9, padding: "0 11px" }}>
          <div style={{ width: 0, height: 0, borderTop: "7px solid transparent", borderBottom: "7px solid transparent", borderLeft: `11px solid ${PAPER}` }} />
          <div style={{ flex: 1, height: 6, borderRadius: 3, background: "#55656F" }}>
            <div style={{ height: "100%", width: `${play * 100}%`, borderRadius: 3, background: CLAY }} />
          </div>
          <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 12, color: PAPER3 }}>YC · 2026</span>
        </div>
      </div>
    </div>
  );
};

export const DeleteHookC: React.FC = () => {
  const f = useCurrentFrame();
  /* -----------------------------------------------------------------------
     HOOK · five beats in five seconds, almost no type. The visual carries it.
       f0-14   the tower of your setup stands, lit, watchers admiring it
       f14     THE CUT: the projector snaps on — his face fills the room
       f22     the beam sweeps the room, watchers turn toward it
       f34     the tower TOPPLES, binders tumble off the desk
       f52     one binder is left spinning in the light, everyone frozen
     Pop culture: the drive-in / projector reveal. Warm light does the work.
     --------------------------------------------------------------------- */
  const SNAP = 14, SWEEP = 22, FALL = 34;
  const proj = E(f, SNAP, SNAP + 5, 0, 1, OUT);              // projector kicks on, hard
  const flash = f >= SNAP && f < SNAP + 4 ? 1 - (f - SNAP) / 4 : 0;
  const sweep = E(f, SWEEP, SWEEP + 20, 0, 1, IO);
  const fall = E(f, FALL, FALL + 30, 0, 1, Easing.in(Easing.quad));
  const shake = f >= FALL + 6 && f < FALL + 20 ? (1 - (f - FALL - 6) / 14) : 0;
  const shX = shake * Math.sin(f * 3.1) * 13;

  const BLOCKS: [string, string][] = [
    ["MEMORY", MOSS], ["RULES", OLIVE], ["MCP", SLATE], ["HOOKS", TEAL], ["SKILLS", PLUM], ["CLAUDE.md", RED_M],
  ];
  const BW = 344, BH = 54, GAP = 6, BASE = 604, CX = 506;

  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <HookHeader f={f + 12} big="CLAUDE CODE'S CREATOR" hot="DELETE YOUR SETUP" />
      <Panel glow={hexA(SKY, 0.28)}>
        <div style={{ position: "absolute", inset: 0, transform: `translateX(${shX}px)` }}>
          {/* ---- the room, before and after the projector ---- */}
          <div style={{ position: "absolute", inset: 0, background: WALL_D }} />
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 150, background: WALL }} />
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} style={{ position: "absolute", left: 10 + i * 126, top: 180, width: 104, height: 118, borderRadius: 5, background: WALL, boxShadow: "inset 0 -4px 0 rgba(26,24,19,0.18)" }} />
          ))}
          <div style={{ position: "absolute", left: -20, right: -20, top: BASE, height: 24, borderRadius: 6, background: WOOD_L }} />
          <div style={{ position: "absolute", left: -20, right: -20, top: BASE + 22, bottom: 0, background: WOOD }} />
          <div style={{ position: "absolute", left: -20, right: -20, top: BASE + 24, height: 8, background: WOOD_D }} />

          {/* practical light source, on before the projector */}
          <Lamp f={f} x={54} y={-16} s={0.95} />
          <Shafts f={f} n={3} from={128} />
          <LampPool x={264} y={BASE - 56} w={520} h={132} />
          <LampPool x={-70} y={BASE - 30} w={300} h={92} />
          <Bloom x={506} y={BASE - 150} r={280} o={0.34 * (1 - proj * 0.5)} />

          {/* ---- 2 · THE PROJECTOR REVEAL: his face fills the wall ---- */}
          <div style={{ position: "absolute", left: 168, top: 92, width: 676, height: 380, opacity: proj }}>
            <Bloom x={338} y={190} r={430} o={0.72 * proj} />
            <ClipSlot f={f} x={0} y={0} w={676} h={380} label="" />
          </div>
          {/* the beam, sweeping the room */}
          {proj > 0.05 && (
            <div style={{ position: "absolute", left: 168 + sweep * 46, top: 92, width: 676, height: 700, opacity: 0.5 * proj,
              background: "linear-gradient(180deg, rgba(255,224,168,0.72) 0%, rgba(255,224,168,0.3) 44%, rgba(255,224,168,0) 86%)",
              clipPath: `polygon(${18 - sweep * 8}% 48%, ${82 + sweep * 8}% 48%, 128% 100%, -28% 100%)` }} />
          )}

          {/* ---- 1 · the tower of your setup, then it goes ---- */}
          <div style={{ position: "absolute", inset: 0 }}>
            {BLOCKS.map(([label, c], i) => {
              const k = BLOCKS.length - 1 - i;                       // 0 = bottom
              const t = Math.max(0, Math.min(1, (fall - k * 0.06) / (1 - k * 0.06)));
              const dropX = t * (110 + k * 96) * (k % 2 ? 1 : -1);
              const dropY = t * t * (330 + k * 74);
              const spin = t * (k % 2 ? 150 : -170);
              return (
                <div key={label} style={{ position: "absolute",
                  left: CX - BW / 2 + (k % 2 ? 13 : -13) + dropX,
                  top: BASE - (k + 1) * (BH + GAP) + dropY,
                  width: BW, height: BH, borderRadius: 6, background: c, boxShadow: SH,
                  transform: `rotate(${osc(f, 22, 1.6, k) + spin}deg)` }}>
                  <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 8, borderRadius: "6px 6px 0 0", background: "rgba(247,245,240,0.24)" }} />
                  <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 6, background: "rgba(26,24,19,0.26)" }} />
                  <div style={{ position: "absolute", left: 0, right: 0, top: 12, textAlign: "center", fontFamily: MONO, fontWeight: 900, fontSize: 23, color: PAPER, letterSpacing: 0.8 }}>{label}</div>
                </div>
              );
            })}
          </div>
          {/* dust kicked up by the collapse */}
          {fall > 0.15 && Array.from({ length: 12 }, (_, i) => {
            const t = Math.min(1, (fall - 0.15) / 0.85);
            return <div key={i} style={{ position: "absolute", left: 120 + i * 44 - t * 22 * (i % 3), top: BASE - 18 + (i % 3) * 12, width: 30 + i * 3, height: 13, borderRadius: 8, background: PAPER3, opacity: (1 - t) * 0.85 }} />;
          })}

          {/* ---- 3 · the watchers: admiring, then turned toward the light ---- */}
          {[[16, 208, 0.62], [768, 214, 0.58], [906, 176, 0.5]].map(([wx, sz, sh], i) => (
            <div key={i} style={{ position: "absolute", left: wx as number, top: BASE - (sz as number) * 0.8, zIndex: 7 }}>
              <div style={{ filter: "drop-shadow(0 16px 20px rgba(26,24,19,0.52))" }}>
                <Mascot lf={f + i * 21} size={sz as number} shock={proj > 0.4 ? (sh as number) : 0.1}
                        gaze={proj > 0.4 ? (i ? -2 : 2) : 0} nodAmp={1.7} nodSpeed={9 + i} />
              </div>
              <div style={{ position: "absolute", left: (sz as number) * 0.6, top: (sz as number) * 0.3,
                width: (sz as number) * 0.28, height: (sz as number) * 0.34, borderRadius: 4,
                background: [RED_M, PLUM, TEAL][i % 3], boxShadow: SH,
                transform: `rotate(${(i % 2 ? 1 : -1) * 12 + fall * 40}deg) translateY(${fall * 120}px)` }} />
            </div>
          ))}

          {/* ---- 5 · one binder left spinning in the beam ---- */}
          {fall > 0.5 && (
            <div style={{ position: "absolute", left: 430, top: 486, zIndex: 9,
              transform: `rotate(${(f - FALL) * 9}deg) scale(${E(f, FALL + 18, FALL + 30, 0.6, 1, BACK)})`, transformOrigin: "50% 50%" }}>
              <Bloom x={84} y={104} r={150} o={0.6} />
              <Binder x={0} y={0} label="CLAUDE.md" c={RED_M} s={1.0} tabs={3} />
            </div>
          )}

          {/* ---- his name, the only type in the scene besides the header ---- */}
          {proj > 0.6 && (
            <div style={{ position: "absolute", left: 168, top: 492, zIndex: 11, opacity: E(f, SNAP + 10, SNAP + 22, 0, 1, OUT) }}>
              <Chyron x={0} y={0} s={0.9} />
            </div>
          )}
        </div>
        {/* the projector snap, as a warm flash rather than a cut to white */}
        {flash > 0.02 && <div style={{ position: "absolute", inset: 0, background: "#FFEFC0", opacity: flash * 0.6 }} />}
      </Panel>
    </AbsoluteFill>
  );
};
