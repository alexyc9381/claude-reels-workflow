import React from "react";
import { AbsoluteFill, useCurrentFrame, Img, staticFile, Audio } from "remotion";
import { inter } from "./fonts";
import { Bg, Panel, ProgressBar, HookHeader, Caption, AssemblyCtx, hexA } from "./SlopKit";
import { Dev } from "./KeyWorld";
import {
  SkylineNight, AChip, BRAND_TASKS, CARD, INKD, RED, GO, A1, A3,
  NodeGraph, RepoCard, AUTO_CAT_ICONS,
} from "./AutoWorld";
import { E, OUT, IO, BACK } from "./MissionWorld";

/* =========================================================================
   REEL 85 "AUTO" · HOOK REBUILD — THE JAMMED QUEUE.

   WHY THIS, AND NOT THE TWO THINGS ALREADY IN THIS REPO:
   · v1's locked hook (AutoHook.tsx) is CardTowerV — a vertical perspective
     tower. It did 61,340 views. Rebuilding it would make the reel a re-WATCH
     on top of a re-READ, which is the whole reason v2 died at 6,078.
   · S1Belts (AutoScenes.tsx) is three parallel lanes FLOWING — that is the
     "sorts itself" payoff beat, positive, agentless. This is its opposite.

   The image: work ARRIVES on a belt faster than one pair of hands can stamp
   it. Claude is the bottleneck, at the head, and the backlog runs off the
   right edge of the panel. Horizontal, because the panel is 1012 x 792 —
   wide and tall, but the QUEUE reads as endless only if it exits frame.

   ⛔ Marks are 40px and every card carries its verb ("Sort inbox / needs
   you"). v2 shipped 20 logo tiles with three grey placeholder dashes where
   the label goes; that is the regression this file exists to undo. The card
   body below is CLONED from CardTowerV, not re-drawn.
   ⛔ ONE subject moves: the stamp. The belt is ambient, the queue growth is
   the transform.
   ========================================================================= */

/* ⛔ RE-TIMED TO THE VO HE IS ACTUALLY KEEPING. 167f/5.56s was v1's hook length;
   v2's recording is a different take and runs 24.37s, not 21.97s. Transcribed it
   (faster_whisper, word timestamps) — the first section ends at 7.28s where "So
   now your emails sort themselves" begins. Beats, measured:
       0.00-2.04  There's a GitHub repo with over 30,000 stars
       2.04-5.06  that gives you 280 pre-built automations, so you never
                  have to set one up yourself
       5.38-6.88  and it takes just one minute to set up
   Five shots across it, so nothing sits longer than ~2s. */
export const AUTO_HOOKQ_LEN = 218;                 // 7.27s @30fps

/* ⛔⛔ THE NOTE THAT SENT THIS BACK: "way too long and not interesting… even the
   original wasn't 5 seconds of just one scene." He was right and it was checkable
   — v1's locked hook carries AUTO_CUTS = [50, 96, 132]: FOUR shots of 1.67 /
   1.53 / 1.20 / 1.07s. I had shipped ONE 5.57s take. Every gate I had passed,
   because none of them measures the CUT RATE ([[too-basic-is-the-cut-rate]]).
   Same cut plan as the approved reel; different images in each slot. */
export const HQ_CUTS = [61, 108, 152, 186];   // 2.03 / 1.57 / 1.47 / 1.13 / 1.07s

/* ⛔⛔⭐ ROUND 2 NOTE: "needs more motion COMING IN … its too stale getting
   already." Neither cut-count nor motion energy explained it — my rebuild
   already moved MORE than ROAST (3.84 vs 2.03 mean frame-diff) and ROAST holds
   ONE 5.13s take at 216k views. Looking at ROAST's opening gave the answer:
   the CAST ASSEMBLES. A bulb alone at 0.0s; one judge enters at 0.5s; three by
   1.0s; five by 2.0s. A single shot stays alive because things ARRIVE in it.
   My belt cycled interchangeable cards, so 0.5s looked like 4.5s — lots of
   motion, zero arrival. Shot 1 now BUILDS: it opens nearly empty and the
   backlog flies in, tier by tier, faster than the sprite can clear it. */

export const BELT_Y = 556;                                 // rail top, panel-local
export const CARD_W = 262, CARD_H = 96;
export const GAP = 18;                                     // between queued cards
export const PITCH = CARD_W + GAP;
export const HEAD_X = 250;                                 // where the head card waits under the stamp

/* ⛔ NOT `Conveyor` from AutoWorld. That prop is STEEL_L/STEEL/STEEL_D — built
   for a lit room — and a full-width slab of it measured this panel at 86.7
   mean luma, WORSE than the v2 we are fixing (81.1) and double the approved
   v1 (43.6). The room is near-black; the rail is furniture and must recede.
   Same slat mechanic, house dark palette. */
export const Rail: React.FC<{ f: number; y: number; z?: number }> = ({ f, y, z = 10 }) => (<>
  <div style={{ position: "absolute", left: -40, top: y, width: 1092, height: 26,
    background: "#141C25", zIndex: z }} />
  <div style={{ position: "absolute", left: -40, top: y, width: 1092, height: 3,
    background: "#2B3947", zIndex: z + 1 }} />
  {Array.from({ length: 34 }, (_, i) => (
    <div key={i} style={{ position: "absolute", left: ((i * 38 - f * 3.0) % 1160) - 60,
      top: y + 7, width: 16, height: 12, borderRadius: 2,
      background: "#1D2833", zIndex: z + 2 }} />
  ))}
  {/* contact shadow — the cards sit ON it, they do not float */}
  <div style={{ position: "absolute", left: -40, top: y - 7, width: 1092, height: 7,
    background: "rgba(0,0,0,0.55)", zIndex: z + 3 }} />
</>);

/* Cloned from CardTowerV's card body — same geometry, same type ramp, same
   red dot. `done` swaps the dot for a tick and drains the type. */
export const QueueCard: React.FC<{
  i: number; x: number; y: number; k?: number; done?: number; ok?: number; z?: number;
}> = ({ i, x, y, k = 1, done = 0, ok = 0, z = 20 }) => {
  const b = BRAND_TASKS[i % BRAND_TASKS.length];
  return (
    <div style={{ position: "absolute", left: x, top: y + (CARD_H - CARD_H * k),
      width: CARD_W * k, height: CARD_H * k,
      borderRadius: 10 * k, background: CARD, zIndex: z,
      /* the cleared card leaves UPWARD, out of frame — dragging it left sent it
         straight through the sprite and read as a collision, not a hand-off */
      transform: `translate(${-done * 190}px, ${done * 118}px) rotate(${done * -22}deg) scale(${1 - done * 0.42})`,
      opacity: 1 - done * 0.75,
      boxShadow: `0 ${5 * k}px ${9 * k}px rgba(0,0,0,0.6)`, display: "flex", alignItems: "center",
      gap: 13 * k, paddingLeft: 15 * k, boxSizing: "border-box" }}>
      <Img src={staticFile(`logos/${b.slug}`)}
           style={{ width: 40 * k, height: 40 * k, objectFit: "contain", display: "block", flexShrink: 0 }} />
      <div style={{ minWidth: 0 }}>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 23 * k,
          color: INKD, whiteSpace: "nowrap" }}>{b.task}</div>
        {/* ⛔ below ~0.62 the subline is texture, not information (AutoHook.tsx) */}
        {k > 0.62 && (
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 15 * k,
            color: ok > 0.5 ? "#2E7D5B" : "#8E8677", whiteSpace: "nowrap" }}>
            {ok > 0.5 ? "done" : "needs you"}</div>
        )}
      </div>
      <div style={{ marginLeft: "auto", marginRight: 15 * k, width: 17 * k, height: 17 * k,
        borderRadius: "50%", background: ok > 0.5 ? "#2E7D5B" : RED, flexShrink: 0 }} />
    </div>
  );
};

const SoloCap: React.FC<{ words: string[]; hot?: number }> = (p) =>
  React.useContext(AssemblyCtx) ? null : <Caption {...p} />;

/* ⛔⛔ THE PUSH MUST SPAN THE SHOT. AutoHook.tsx eases this over a HARDCODED 26
   frames whatever the shot length, so a 35-frame shot finishes its camera move
   at frame 26 and then holds for 9 — dead_air failed S4 at exactly its last two
   segments. Same class as [[animation-ends-at-20pct-of-span]]: the animation was
   never wrong, its SPAN was. Eased across the real length instead. */
export const Shot: React.FC<{ f: number; a: number; b: number; k?: number; len?: number;
                             children: React.ReactNode }> =
  ({ f, a, b, k = 0, len = AUTO_HOOKQ_LEN, children }) => {
  if (f < a || f >= b) return null;
  const span = Math.max(1, Math.min(b, len) - a);
  const t = Math.min(1, (f - a) / span);
  /* ⛔⛔ THE PUSH IS LINEAR, NOT SMOOTHSTEP. `t*t*(3-2*t)` is FLAT as t->1, so the
     camera stopped in the last fifth of EVERY shot — which is exactly why
     dead_air's failing segment was always the last one (`f4-5`), on 9 of 19
     shots at once. Same lesson as the belt: an eased move is flat at both ends,
     and a shot that has to keep moving until the cut cannot use one. A camera
     push reads fine linear. */
  const e = t;
  const z = [1.13 - e * 0.12, 1.01 + e * 0.11, 1.11 - e * 0.10, 1.02 + e * 0.12][k % 4];
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden",
      transform: `scale(${z})`, transformOrigin: "50% 54%" }}>{children}</div>
  );
};

export const Flash: React.FC<{ f: number; cuts: number[] }> = ({ f, cuts }) => (<>
  {cuts.map((cf) => {
    const k = f - cf;
    if (k < 0 || k > 2) return null;
    return <div key={cf} style={{ position: "absolute", inset: 0, background: "#FFF6E2",
      opacity: (1 - k / 2) * 0.3, zIndex: 44 }} />;
  })}
</>);

/* the four rails + their cards, shared by shots 1 and 2 so the world is continuous
   across the cut. `flip` turns the whole line green, right to left. */
export const Tiers: React.FC<{ f: number; slide: number; beat: number; done: number;
                       flip?: number; build?: number }> =
  ({ f, slide, beat, done, flip = 0, build = -1 }) => (<>
    {[3, 2, 1, 0].map((tier) => (
      <Rail key={tier} f={f * (tier === 1 ? -1 : 1)} y={BELT_Y - tier * 112} z={8 + tier} />
    ))}
    {(() => {
      const out: React.ReactNode[] = [];
      const K = [1, 0.90, 0.81, 0.73];
      K.forEach((k, tier) => {
        const y = BELT_Y - tier * 112 - CARD_H * k - 4;
        const pitch = PITCH * k;
        const rtl = tier === 1;
        const off = (rtl ? -slide : slide) * k;
        for (let i = 0; i < 12; i++) {
          const x = rtl ? 1010 - i * pitch + off - CARD_W * k
                        : HEAD_X * (tier ? 0.12 : 1) + i * pitch - off;
          /* ARRIVAL. build >= 0 puts the shot in assemble mode: each card has a
             spawn frame and flies in from off the right edge until it lands. */
          let xa = x;
          if (build >= 0) {
            const spawn = 2 + tier * 4 + i * 4.4;
            const late = Math.max(0, spawn - build);
            if (late > 26) continue;                    // not born yet
            xa = x + late * 46;
          }
          if (xa > 1035 || xa + CARD_W * k < -20) continue;
          if (tier === 0 && xa + CARD_W * k < HEAD_X - 30) continue;
          /* the green wave sweeps right -> left, so the far end is done first */
          const w = flip <= 0 ? 0 : Math.max(0, Math.min(1, (flip * 1400 - x) / 240));
          out.push(
            <QueueCard key={`t${tier}-${beat}-${i}`} i={beat * 3 + i + tier * 7}
                       x={xa} y={y} k={k} ok={w}
                       done={tier === 0 && i === 0 && !flip ? done : 0}
                       z={30 - tier * 8 - i} />
          );
        }
      });
      return out;
    })()}
  </>);

export const AutoHookQueue: React.FC = () => {
  const f = useCurrentFrame();
  const [C1, C2, C3, C4] = HQ_CUTS;

  const CYC = 46;
  const fx = f + 9;                       // open mid-gesture; an ease-in starts too slow
  const beat = Math.floor(fx / CYC);
  const b0 = beat * CYC;
  const done  = E(fx, b0, b0 + 22, 0, 1, IO);
  /* ⛔ a belt does not ease — an eased slide is flat at both ends and dead_air
     failed it three times. Constant velocity, wrapping every cycle. */
  const slide = ((fx % CYC) / CYC) * PITCH;

  const Room = ({ k = 1 }: { k?: number }) => (<>
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: BELT_Y + 30,
      overflow: "hidden", zIndex: 3 }}>
      <SkylineNight f={f} z={3} />
      <div style={{ position: "absolute", inset: 0, background: "#080C12", opacity: 0.62 }} />
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: BELT_Y + 30, bottom: 0,
      background: "#070B10", zIndex: 4 }} />
  </>);

  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <HookHeader f={f + 12} big="280 AUTOMATIONS, FREE" hot="ONE GITHUB REPO" />
      <Panel glow={hexA(RED, 0.30)}>

        {/* 1 · THE JAMMED QUEUE — the pain, on screen at frame 0 */}
        <Shot f={f} a={0} b={C1} k={0}>
          <Room />
          <Tiers f={f} slide={slide} beat={beat} done={done} build={f} />
          <Dev f={f} x={28} y={392} size={196} gaze={2} shock={0.55}
               nodAmp={2.2} nodSpeed={14} z={60} />
          {Array.from({ length: Math.min(4, 1 + Math.round(f / 14)) }, (_, i) => {
            const b = BRAND_TASKS[(i + 5) % BRAND_TASKS.length];
            return (
              <div key={`cl${i}`} style={{ position: "absolute", left: 50 + i * 132,
                top: 622, width: 122, height: 46, borderRadius: 8, background: "#D8D2C6",
                zIndex: 20, display: "flex", alignItems: "center", gap: 8, paddingLeft: 10,
                boxSizing: "border-box", transform: `rotate(${(i % 2 ? 1.6 : -1.6)}deg)`,
                boxShadow: "0 4px 8px rgba(0,0,0,0.6)" }}>
                <Img src={staticFile(`logos/${b.slug}`)}
                     style={{ width: 24, height: 24, objectFit: "contain", display: "block",
                       flexShrink: 0, filter: "grayscale(1)", opacity: 0.75 }} />
                <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 13,
                  color: "#5C5749", whiteSpace: "nowrap", overflow: "hidden" }}>{b.task}</div>
                <div style={{ marginLeft: "auto", marginRight: 9, width: 13, height: 13,
                  borderRadius: "50%", background: "#2E7D5B", flexShrink: 0 }} />
              </div>
            );
          })}
          <div style={{ position: "absolute", left: 44, top: 592, fontFamily: inter.fontFamily,
            fontWeight: 900, fontSize: 18, letterSpacing: "0.12em", color: "#8FA0B0", zIndex: 26 }}>
            CLEARED <span style={{ color: "#4FBF8B" }}>{1 + Math.round(f / 30)}</span>
            <span style={{ color: "#3E4B57" }}>{"  /  "}</span>
            STILL WAITING <span style={{ color: "#E06A4E" }}>
              {Math.round(18 + f * 5.6)}</span>
          </div>
          <AChip y={706} text="EVERY MORNING. BY HAND." c={RED} size={30} />
        </Shot>

        {/* 2 · THE SAME LINE, RUNNING ITSELF — a green wave sweeps right to left
              across every tier while the sprite stands with his hands down. The
              world is continuous across the cut; only the AGENCY changes. */}
        <Shot f={f} a={C1} b={C2} k={1}>
          <Room />
          <Tiers f={f} slide={slide * 2.4} beat={beat} done={0}
                 flip={E(f, C1 + 2, C2 - 6, 0, 1.1, IO)} />
          <Dev f={f} x={28} y={392} size={196} gaze={2} cheer={0.85}
               nodAmp={3.2} nodSpeed={10} z={60} />
          <AChip y={706} text="NOBODY TOUCHED IT" c={GO} size={32} />
        </Shot>

        {/* 3 · THE COUNT — pull back off the line onto the whole shelf. A wall of
              real category marks, and 280 on its own dark plate (cream-on-cream
              was unreadable on v1 and the fix is logged in AutoHook.tsx). */}
        <Shot f={f} a={C2} b={C3} k={2}>
          <div style={{ position: "absolute", inset: 0, background: "#080C12" }} />
          {Array.from({ length: 48 }, (_, i) => {
            const t = E(f, C2 + 1 + i * 0.56, C2 + 13 + i * 0.56, 0, 1, BACK);
            if (t <= 0.02) return null;
            const ic = AUTO_CAT_ICONS[i % AUTO_CAT_ICONS.length];
            return (
              <div key={i} style={{ position: "absolute", left: 14 + (i % 8) * 126,
                top: 118 + Math.floor(i / 8) * 104, width: 112, height: 88, borderRadius: 10,
                background: CARD, transform: `scale(${t})`, zIndex: 14,
                boxShadow: "0 6px 10px rgba(0,0,0,0.6)" }}>
                <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 5,
                  borderRadius: "8px 8px 0 0", background: A3 }} />
                <div style={{ position: "absolute", left: 0, right: 0, top: 24,
                  display: "flex", justifyContent: "center" }}>
                  <Img src={staticFile(`logos/${ic.slug}`)}
                       style={{ width: 42, height: 42, objectFit: "contain", display: "block" }} />
                </div>
              </div>
            );
          })}
          <div style={{ position: "absolute", left: 246, top: 292, width: 520, height: 208,
            borderRadius: 20, background: "#0B1017", zIndex: 28,
            border: `6px solid ${A3}`, boxShadow: "0 16px 26px rgba(0,0,0,0.8)",
            transform: `scale(${E(f, C2 + 8, C2 + 22, 0.6, 1, BACK)})` }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 14, textAlign: "center",
              fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 132, lineHeight: 1,
              /* ⛔ Math.round, never floor — a count-up under motion blur samples
                 three different numbers per frame and floor() straddles them. */
              letterSpacing: "-0.05em", color: A1 }}>
              {Math.round(280 * E(f, C2 + 4, C3 - 2, 0, 1, OUT))}</div>
            <div style={{ position: "absolute", left: 0, right: 0, top: 156, textAlign: "center",
              fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 25, letterSpacing: "0.2em",
              color: A3 }}>AUTOMATIONS</div>
          </div>
          <AChip y={700} text="ALREADY BUILT FOR YOU" c={GO} size={34} />
        </Shot>

        {/* 4 · WHAT ONE ACTUALLY IS — the real n8n canvas. ⛔ APPROVED = THE REAL
              THING: NodeGraph is the artifact, not a symbol for it. */}
        <Shot f={f} a={C3} b={C4} k={3}>
          <div style={{ position: "absolute", inset: 0, background: "#080C12" }} />
          <NodeGraph f={f} x={140} y={262} w={730} h={340} at={C3} z={20} />
          {(() => {
            const K = 730 / 880, NW = 168 * K, NH = 92 * K, GX = 140, GY = 262;
            const P = [[26, 96], [246, 214], [466, 96], [686, 214]]
              .map(([a, b]) => ({ nx: a * K, ny: b * K }));
            const t = Math.max(0, Math.min(0.999, (f - C3 - 4) / 30));
            const seg = Math.floor(t * 3), u = t * 3 - seg;
            const a = P[seg], b = P[seg + 1];
            const x1 = GX + a.nx + NW, y1 = GY + a.ny + NH / 2;
            const x2 = GX + b.nx,      y2 = GY + b.ny + NH / 2;
            const px = x1 + (x2 - x1) * u, py = y1 + (y2 - y1) * u;
            return (<>
              {P.map((p, i) => {
                const lit = i <= seg || (i === seg + 1 && u > 0.86);
                if (!lit) return null;
                return (
                  <div key={i} style={{ position: "absolute", left: GX + p.nx - 5,
                    top: GY + p.ny - 5, width: NW + 10, height: NH + 10, borderRadius: 14,
                    border: `3px solid ${GO}`, boxShadow: `0 0 16px ${hexA(GO, 0.55)}`,
                    zIndex: 30, pointerEvents: "none" }} />
                );
              })}
              <div style={{ position: "absolute", left: px - 11, top: py - 11, width: 22,
                height: 22, borderRadius: "50%", background: "#EAFBF3",
                boxShadow: `0 0 22px ${GO}, 0 0 8px #FFF`, zIndex: 32 }} />
            </>);
          })()}
          <Dev f={f} x={22} y={462} size={226} gaze={1} cheer={0.9} nodAmp={3.4} nodSpeed={9} z={24} />
          <RepoCard f={f} x={272} y={150} s={0.94} t={1} z={34} />
        </Shot>

        {/* 5 · "and it takes just one minute to set up" — the clock is the claim */}
        <Shot f={f} a={C4} b={9999} k={0}>
          <div style={{ position: "absolute", inset: 0, background: "#080C12" }} />
          <NodeGraph f={f} x={120} y={180} w={780} h={330} at={C4 - 6} z={20} />
          <div style={{ position: "absolute", left: 0, right: 0, top: 548, textAlign: "center",
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 116, lineHeight: 1,
            letterSpacing: "-0.04em", color: A1, zIndex: 30 }}>
            {(Math.max(0, 60 - Math.round((f - C4) * 1.9))).toString().padStart(2, "0")}s
          </div>
          <div style={{ position: "absolute", left: 0, right: 0, top: 672, textAlign: "center",
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 21, letterSpacing: "0.18em",
            color: A3, zIndex: 30 }}>TO SET ONE RUNNING</div>
          <Dev f={f} x={26} y={470} size={208} gaze={1} cheer={0.9} nodAmp={3.4} nodSpeed={9} z={24} />
        </Shot>

        <Flash f={f} cuts={HQ_CUTS} />
      </Panel>
      <Audio src={staticFile("auto85_vo_v2.wav")} />
      <SoloCap words={["There's", "a", "GitHub", "repo"]} hot={2} />
    </AbsoluteFill>
  );
};
