import React from "react";
import { AbsoluteFill, useCurrentFrame, Img, staticFile, Audio } from "remotion";
import { inter } from "./fonts";
import { Bg, Panel, ProgressBar, HookHeader, Caption, hexA } from "./SlopKit";
import { Dev } from "./KeyWorld";
import {
  SkylineNight, RackHall, AChip, BRAND_TASKS, CARD, INKD, RED, GO, A1, A3,
  NodeGraph, RepoCard, AUTO_CAT_ICONS, AUTO_CATS, MailStack, LogoWall, DoneCard,
  WallClock, DoorRow, HeroCard,
} from "./AutoWorld";
import { E, OUT, IO, BACK } from "./MissionWorld";
import { Shot, Flash, Tiers, QueueCard, Rail, BELT_Y, CARD_W, CARD_H, PITCH, HEAD_X } from "./AutoHookQueue";

/* =========================================================================
   REEL 85 "AUTO" — THE FULL CUT, RE-BOARDED ON THE v2 RECORDING.

   ⛔ The VO is unchanged (his call). It was transcribed with word timestamps
   and EVERY cut below sits on a measured phrase boundary, not on a guess:

     0.00 There's a GitHub repo with over 30,000 stars
     2.04 that gives you 280 pre-built automations, so you never set one up
     5.38 and it takes just one minute to set up
     7.28 So now your emails sort themselves
     8.52 your leads get followed up on while you sleep
     9.82 your content gets posted to every social media platform
    12.42 Gmail Slack WhatsApp YouTube Stripe over 18 categories of
    15.20 automations in total
    16.40 and you don't have to build any of them
    17.96 Grab one file
    18.82 click Import and it runs immediately
    20.52 Everyone else is still spending hours doing all of
    22.16 this by hand every day
    23.28 comment AUTO for the repo

   19 shots / 24.37s = 1.28s average, against v1's 1.69s. The note that drove
   it: "too stale getting already" — and the fix that mattered was ARRIVAL, so
   every shot here introduces something that was not in the frame before it.
   ========================================================================= */

export const AUTO_REELQ_LEN = 731;                 // 24.37s @30

export const RQ_CUTS = [61, 108, 152, 186, 218, 256, 295, 334, 373, 415,
                        456, 492, 539, 565, 601, 616, 665, 698];

const L = (t: number) => Math.round(t * 30);

/* ⛔⛔ SPREAD ARRIVALS ACROSS THE SHOT, NEVER ON A FIXED OFFSET.
   dead_air failed 9 of 19 shots, almost all at `f4-5` — the last sampled
   segment. Cause: every stagger was written as `C[n] + 2 + i * 7` while shot
   lengths here run 15 to 61 frames, so anything short finished its arrivals
   well before the cut and then held. Same family as the hardcoded /26 push in
   the Shot wrapper. `sp` places item i of n across the shot's OWN span. */
const sp = (a: number, b: number, n: number, i: number) =>
  a + 2 + (i * (b - a - 16)) / Math.max(1, n);

/* ⛔ LINEAR ramp across a shot. Every `E(..., IO)` used to span a shot was flat
   at its end, which is the same defect as the smoothstep camera push: the shot
   stopped before its cut. Use this whenever the move must last until the cut. */
/* ══════════════════════════════════════════════════════════════════════════
   THE TWO MISSING MOTION LAYERS.

   [[reel-compound-objects-three-layers]]: every shot runs THREE simultaneous
   layers at different speeds — (1) assembly, parts arriving staggered, (2)
   satellites, small badges crossing on arcs and exiting, (3) backdrop, large
   angular wedges rotating slowly behind everything — plus exactly ONE event.
   This reel had assembly only, which is precisely why three rounds of notes all
   said the same thing. The test in that law: pause mid-shot; if everything is at
   rest and arrived at the same instant, it is a slideshow.

   ⛔ Both layers are deliberately LOW CONTRAST. They add choreography without
   stealing hero_share — the backdrop sits under the content at 5-7% lightness
   over the ground, the satellites are small and semi-transparent.
   ══════════════════════════════════════════════════════════════════════════ */

/* LAYER 3 · BACKDROP — big angular wedges, slow counter-rotation, always on. */
const Wedges: React.FC<{ f: number; tint?: string; z?: number }> =
  ({ f, tint = "#16202B", z = 5 }) => (
  <svg width={1012} height={792} viewBox="0 0 1012 792"
       style={{ position: "absolute", inset: 0, zIndex: z, pointerEvents: "none" }}>
    <g transform={`rotate(${f * 0.06} 250 300)`} opacity={0.55}>
      <path d="M-180 120 L360 -60 L470 220 L-120 400 Z" fill={tint} />
    </g>
    <g transform={`rotate(${-f * 0.042} 830 520)`} opacity={0.45}>
      <path d="M660 250 L1180 120 L1240 470 L720 610 Z" fill={tint} />
    </g>
    <g transform={`rotate(${f * 0.028} 520 760)`} opacity={0.38}>
      <path d="M180 640 L860 560 L900 900 L140 900 Z" fill={tint} />
    </g>
  </svg>
);

/* LAYER 2 · SATELLITES — small marks crossing on arcs and leaving. Never land. */
const Satellites: React.FC<{ f: number; at: number; n?: number; z?: number }> =
  ({ f, at, n = 5, z = 8 }) => (<>
    {Array.from({ length: n }, (_, i) => {
      const period = 74 + i * 13;
      const u = (((f - at) + i * 21) % period) / period;
      const y0 = 120 + ((i * 137) % 520);
      const dir = i % 2 ? 1 : -1;
      const x = dir > 0 ? -110 + u * 1240 : 1120 - u * 1240;
      const y = y0 - Math.sin(u * Math.PI) * (90 + i * 22);
      return (
        <div key={i} style={{ position: "absolute", left: x, top: y, width: 58, height: 46,
          borderRadius: 9, background: "#26333F", zIndex: z,
          transform: `rotate(${u * 200 * dir}deg)`,
          boxShadow: "0 3px 6px rgba(0,0,0,0.5)" }}>
          <div style={{ position: "absolute", left: 9, top: 15, width: 13, height: 13,
            borderRadius: "50%", background: "#3B4C5C" }} />
          <div style={{ position: "absolute", left: 28, top: 19, width: 21, height: 6,
            borderRadius: 3, background: "#3B4C5C" }} />
        </div>
      );
    })}
  </>);

const lin = (f: number, a: number, b: number, from = 0, to = 1) =>
  from + (to - from) * Math.max(0, Math.min(1, (f - a) / Math.max(1, b - a)));

export const AutoReelQueue: React.FC = () => {
  const f = useCurrentFrame();
  const C = RQ_CUTS;
  const LEN = AUTO_REELQ_LEN;
  const S = (a: number, b: number, k: number, children: React.ReactNode) => (
    <Shot f={f} a={a} b={b} k={k} len={LEN}>{children}</Shot>
  );

  const CYC = 46, fx = f + 9, beat = Math.floor(fx / CYC), b0 = beat * CYC;
  const done = E(fx, b0, b0 + 22, 0, 1, IO);
  const slide = ((fx % CYC) / CYC) * PITCH;

  const Room = () => (<>
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: BELT_Y + 30,
      overflow: "hidden", zIndex: 3 }}>
      <SkylineNight f={f} z={3} />
      <div style={{ position: "absolute", inset: 0, background: "#080C12", opacity: 0.62 }} />
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: BELT_Y + 30, bottom: 0,
      background: "#070B10", zIndex: 4 }} />
    <Wedges f={f} z={5} />
    <Satellites f={f} at={0} n={7} z={6} />
  </>);

  /* ⛔⛔ L3 ANTICIPATION at ~1s. [[dopamine-ladder]] L3 and the reel-123 R11 note:
     an open needs BEFORE / TRIGGER / TRAVEL and NO ARRIVAL — grade it on what is
     still outstanding at the cut, not on motion. Everything in this hook landed
     the instant it appeared, so nothing was ever outstanding and it read as
     "it just happens".

     Now: a wobble at f22 (the BEFORE), the whole backlog starts tipping toward
     the sprite at f28 (the TRIGGER, ~0.93s) and keeps going (the TRAVEL) — and
     it NEVER falls. We cut away at 2.03s and again at 3.6s with the tower still
     coming down on him. ⛔ The lean is a pure function of f so it is identical
     either side of the 2s cut: an anticipation beat must not be a reset. */
  const lean = Math.min(16, Math.pow(Math.max(0, f - 28) / 80, 1.5) * 20);
  const wob = f > 22 && f < 30 ? Math.sin((f - 22) * 1.5) * 1.6 : 0;

  const Dark = () => (<>
    <div style={{ position: "absolute", inset: 0, background: "#080C12" }} />
    <Wedges f={f} z={5} />
    <Satellites f={f} at={0} n={7} z={6} />
  </>);

  /* one arriving brand mark — the shape every "things show up" beat is built on */
  const Mark = ({ slug, x, y, at, s = 1, label }:
    { slug: string; x: number; y: number; at: number; s?: number; label?: string }) => {
    const t = E(f, at, at + 12, 0, 1, BACK);
    if (t <= 0.02) return null;
    return (
      <div style={{ position: "absolute", left: x, top: y, width: 150 * s, height: 132 * s,
        borderRadius: 14 * s, background: CARD, zIndex: 24, transform: `scale(${t})`,
        boxShadow: `0 ${8 * s}px ${12 * s}px rgba(0,0,0,0.6)` }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 24 * s,
          display: "flex", justifyContent: "center" }}>
          <Img src={staticFile(`logos/${slug}`)}
               style={{ width: 62 * s, height: 62 * s, objectFit: "contain", display: "block" }} />
        </div>
        {label && (
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 12 * s, textAlign: "center",
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 15 * s,
            letterSpacing: "0.06em", color: "#6E6656" }}>{label}</div>
        )}
      </div>
    );
  };

  const header =
    f < C[4]  ? { big: "280 AUTOMATIONS, FREE", hot: "ONE GITHUB REPO" } :
    f < C[8]  ? { big: "IT RUNS WHILE", hot: "YOU ARE ASLEEP" } :
    f < C[11] ? { big: "18 CATEGORIES", hot: "EVERY TOOL YOU USE" } :
    f < C[15] ? { big: "YOU BUILD NONE", hot: "IMPORT ONE FILE" } :
                { big: "EVERYONE ELSE", hot: "IS STILL DOING IT BY HAND" };

  return (
    <AbsoluteFill>
      <Bg /><ProgressBar />
      <HookHeader f={f + 12} big={header.big} hot={header.hot} />
      <Panel glow={hexA(RED, 0.30)}>

        {/* ══ HOOK ══ 1 · the backlog assembles faster than one pair of hands */}
        {S(0, C[0], 0, <>
          <Room />
          <div style={{ position: "absolute", inset: 0, zIndex: 10,
            transform: `rotate(${-(lean + wob)}deg)`, transformOrigin: "88% 104%" }}>
            <Tiers f={f} slide={slide} beat={beat} done={done} build={f} />
          </div>
          {/* the shadow it throws as it comes over him — the threat, not the event */}
          <div style={{ position: "absolute", left: -20, top: 300, width: 470, height: 470,
            background: "radial-gradient(ellipse at 30% 60%, rgba(0,0,0,0.72), rgba(0,0,0,0) 68%)",
            opacity: Math.min(1, lean / 7), zIndex: 55, pointerEvents: "none" }} />
          <Dev f={f} x={22} y={452} size={188} gaze={2} shock={Math.min(1, 0.55 + lean / 12)}
               nodAmp={2.2 + lean * 0.3} nodSpeed={14 + lean} z={60} />
          {Array.from({ length: Math.min(4, 1 + Math.round(f / 15)) }, (_, i) => {
            const b = BRAND_TASKS[(i + 5) % BRAND_TASKS.length];
            return (
              <div key={`cl${i}`} style={{ position: "absolute", left: 50 + i * 132, top: 640,
                width: 122, height: 46, borderRadius: 8, background: "#D8D2C6", zIndex: 26,
                display: "flex", alignItems: "center", gap: 8, paddingLeft: 10,
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
          <div style={{ position: "absolute", left: 44, top: 604, fontFamily: inter.fontFamily,
            fontWeight: 900, fontSize: 18, letterSpacing: "0.12em", color: "#8FA0B0", zIndex: 26 }}>
            CLEARED <span style={{ color: "#4FBF8B" }}>{1 + Math.round(f / 30)}</span>
            <span style={{ color: "#3E4B57" }}>{"  /  "}</span>
            STILL WAITING <span style={{ color: "#E06A4E" }}>{Math.round(18 + f * 5.6)}</span>
          </div>
          <AChip y={706} text="EVERY MORNING. BY HAND." c={RED} size={30} />
        </>)}

        {/* 2 · the same line, running itself — green sweeps right to left */}
        {S(C[0], C[1], 1, <>
          <Room />
          {(() => {
            const j = lin(f, C[0], C[0] + 9);              // the jump out
            const k = 1 - j * 0.56;                        // 1.00 -> 0.44
            return (
              <div style={{ position: "absolute", inset: 0, zIndex: 10,
                transform: `scale(${k}) translateY(${j * -18}px)`, transformOrigin: "50% 46%" }}>
                {[-1, 0, 1].map((row) => (
                  <div key={row} style={{ position: "absolute", inset: 0,
                    transform: `translateY(${row * 620 * j}px) rotate(${-lean * (row ? 0.5 : 1)}deg)`,
                    transformOrigin: "88% 104%",
                    opacity: row === 0 ? 1 : j * 0.85 }}>
                    <Tiers f={f + row * 137} slide={slide} beat={beat + row} done={0} build={f}
                           flip={lin(f, C[0] + 1, C[1] - 4, 0, 1.15)} />
                  </div>
                ))}
              </div>
            );
          })()}
          {/* the number lands ON the reveal, which is what makes it magnitude
              rather than a zoom */}
          <div style={{ position: "absolute", left: 296, top: 236, width: 420, height: 168,
            borderRadius: 18, background: "#0B1017", border: `6px solid ${A3}`, zIndex: 40,
            transform: `scale(${E(f, C[0] + 8, C[0] + 18, 0.3, 1, BACK)}) rotate(-3deg)`,
            boxShadow: "0 18px 28px rgba(0,0,0,0.8)" }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 10, textAlign: "center",
              fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 104, lineHeight: 1,
              letterSpacing: "-0.05em", color: A1 }}>
              {Math.round(280 * lin(f, C[0] + 8, C[1] - 6))}</div>
            <div style={{ position: "absolute", left: 0, right: 0, top: 122, textAlign: "center",
              fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 20, letterSpacing: "0.2em",
              color: A3 }}>ALREADY BUILT</div>
          </div>
          {/* the backlog keeps ARRIVING through this shot too — it does not stop
              being a queue just because it started clearing itself */}
          <Dev f={f} x={22} y={452} size={188} gaze={2} cheer={0.85} nodAmp={3.2} nodSpeed={10} z={60} />
          <div style={{ position: "absolute", left: 44, top: 604, fontFamily: inter.fontFamily,
            fontWeight: 900, fontSize: 18, letterSpacing: "0.12em", color: "#8FA0B0", zIndex: 26 }}>
            CLEARED <span style={{ color: "#4FBF8B" }}>
              {Math.round(lin(f, C[0], C[1], 3, 186))}</span>
            <span style={{ color: "#3E4B57" }}>{"  /  "}</span>
            STILL WAITING <span style={{ color: "#E06A4E" }}>
              {Math.round(lin(f, C[0], C[1], 186, 3))}</span>
          </div>
          <AChip y={706} text="NOBODY TOUCHED IT" c={GO} size={32} />
        </>)}

        {/* 3 · THE COUNT */}
        {S(C[1], C[2], 2, <>
          <Dark />
          {Array.from({ length: 48 }, (_, i) => {
            const t = E(f, sp(C[1], C[2], 48, i), sp(C[1], C[2], 48, i) + 12, 0, 1, BACK);
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
            borderRadius: 20, background: "#0B1017", zIndex: 28, border: `6px solid ${A3}`,
            boxShadow: "0 16px 26px rgba(0,0,0,0.8)",
            transform: `scale(${E(f, C[1] + 8, C[1] + 22, 0.6, 1, BACK)})` }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 14, textAlign: "center",
              fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 132, lineHeight: 1,
              letterSpacing: "-0.05em", color: A1 }}>
              {Math.round(280 * E(f, C[1] + 4, C[2] - 2, 0, 1, OUT))}</div>
            <div style={{ position: "absolute", left: 0, right: 0, top: 156, textAlign: "center",
              fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 25, letterSpacing: "0.2em",
              color: A3 }}>AUTOMATIONS</div>
          </div>
          <AChip y={700} text="ALREADY BUILT FOR YOU" c={GO} size={34} />
        </>)}

        {/* 4 · what ONE of them actually is */}
        {S(C[2], C[3], 3, <>
          <Dark />
          <NodeGraph f={f} x={140} y={262} w={730} h={340} at={C[2]} z={20} />
          <Dev f={f} x={22} y={462} size={226} gaze={1} cheer={0.9} nodAmp={3.4} nodSpeed={9} z={24} />
          <RepoCard f={f} x={272} y={150} s={0.94} t={1} z={34} />
        </>)}

        {/* 5 · one minute to set one running */}
        {S(C[3], C[4], 0, <>
          <Dark />
          <NodeGraph f={f} x={120} y={180} w={780} h={330} at={C[3] - 6} z={20} />
          <div style={{ position: "absolute", left: 0, right: 0, top: 548, textAlign: "center",
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 116, lineHeight: 1,
            letterSpacing: "-0.04em", color: A1, zIndex: 30 }}>
            {Math.max(0, 60 - Math.round((f - C[3]) * 1.9)).toString().padStart(2, "0")}s</div>
          <div style={{ position: "absolute", left: 0, right: 0, top: 672, textAlign: "center",
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 21, letterSpacing: "0.18em",
            color: A3, zIndex: 30 }}>TO SET ONE RUNNING</div>
          <Dev f={f} x={26} y={470} size={208} gaze={1} cheer={0.9} nodAmp={3.4} nodSpeed={9} z={24} />
        </>)}

        {/* ══ BODY ══ 6 · "your emails sort themselves" */}
        {S(C[4], C[5], 1, <>
          <Dark />
          <MailStack f={f} x={110} y={540} n={26}
                     left={1 - lin(f, C[4] + 2, C[5] - 2)} z={16} />
          {/* THE SORTER — envelopes keep falling into three labelled trays for the
              whole shot, and each tray counts. A stream, not a burst. */}
          {["INBOX", "LEADS", "SPAM"].map((lb, c) => (
            <React.Fragment key={lb}>
              <div style={{ position: "absolute", left: 440 + c * 190, top: 542, width: 158,
                height: 96, borderRadius: 10, background: "#141C25",
                border: "3px solid #26323E", zIndex: 22 }} />
              <div style={{ position: "absolute", left: 440 + c * 190, top: 648, width: 158,
                textAlign: "center", fontFamily: inter.fontFamily, fontWeight: 900,
                fontSize: 15, letterSpacing: "0.14em", color: "#7C8B9B", zIndex: 24 }}>{lb}</div>
              <div style={{ position: "absolute", left: 440 + c * 190, top: 566, width: 158,
                textAlign: "center", fontFamily: inter.fontFamily, fontWeight: 900,
                fontSize: 44, color: A1, zIndex: 24 }}>
                {Math.round(lin(f, C[4], C[5], 0, 14 - c * 4))}</div>
            </React.Fragment>
          ))}
          {Array.from({ length: 14 }, (_, i) => {
            const born = C[4] + 2 + i * 2.6, c = i % 3;
            const u = lin(f, born, born + 26);
            if (u <= 0 || u >= 1) return null;
            return <DoneCard key={i} x={470 + c * 190 - 30 + Math.sin(u * 3) * 14}
                             y={210 + u * 330} s={0.5} slug="gmail.svg"
                             rot={(i % 2 ? 1 : -1) * (1 - u) * 40} op={1} z={30} />;
          })}
          <Dev f={f} x={40} y={430} size={190} gaze={2} cheer={0.8} nodAmp={3} nodSpeed={11} z={40} />
          <AChip y={706} text="INBOX, SORTED" c={GO} size={32} />
        </>)}

        {/* 7 · "your leads get followed up on while you sleep" */}
        {S(C[5], C[6], 2, <>
          <div style={{ position: "absolute", inset: 0, background: "#060A14" }} />
          <SkylineNight f={f} z={3} />
          <div style={{ position: "absolute", inset: 0, background: "#050912", opacity: 0.6, zIndex: 4 }} />
          {Array.from({ length: 6 }, (_, i) => (
            <Mark key={i} slug="whatsapp.svg" x={300 + (i % 3) * 200} y={180 + Math.floor(i / 3) * 170}
                  at={sp(C[5], C[6], 6, i)} s={0.86} label="REPLIED" />
          ))}
          <Dev f={f} x={54} y={470} size={196} gaze={2} nodAmp={1.2} nodSpeed={5} z={40} />
          <div style={{ position: "absolute", left: 214, top: 452, fontFamily: inter.fontFamily,
            fontWeight: 900, fontSize: 38, color: "#4C5A6B", zIndex: 40 }}>z z z</div>
          <AChip y={706} text="WHILE YOU SLEEP" c={GO} size={32} />
        </>)}

        {/* 8-9 · "your content gets posted to every social media platform" */}
        {S(C[6], C[7], 3, <>
          <Dark />
          <LogoWall f={f} cols={7} rows={6} dim={0.22} z={5} />
          <HeroCard f={f} x={330} y={300} idx={1} s={1.25} t={E(f, C[6] + 2, C[6] + 16, 0, 1, BACK)} z={34} />
          <AChip y={706} text="ONE POST" c={A3} size={32} />
        </>)}
        {S(C[7], C[8], 0, <>
          <Dark />
          <LogoWall f={f} cols={7} rows={6} dim={0.2} z={5} />
          {["instagram.svg", "x.svg", "youtube.svg", "wordpress.svg"].map((sl, i) => (
            <Mark key={sl} slug={sl} x={92 + i * 230} y={318} at={sp(C[7], C[8], 4, i)} s={1.05} />
          ))}
          {/* the ONE post keeps peeling copies of itself off toward the marks —
              a clone every 4 frames for the whole shot, so nothing ever settles */}
          {Array.from({ length: 12 }, (_, i) => {
            const born = C[7] + 2 + i * 3.4;
            const u = lin(f, born, born + 24);
            if (u <= 0 || u >= 1) return null;
            const tx = 92 + (i % 4) * 230 + 32;
            const sl = ["instagram.svg", "x.svg", "youtube.svg", "wordpress.svg"][i % 4];
            const sz = 1 - u * 0.42;
            return (
              <div key={i} style={{ position: "absolute",
                left: 452 + (tx - 452) * u, top: 560 - 200 * u - Math.sin(u * Math.PI) * 74,
                width: 96 * sz, height: 76 * sz, borderRadius: 9,
                background: CARD, opacity: 1 - u * 0.25, zIndex: 30,
                transform: `rotate(${(i % 2 ? 1 : -1) * u * 32}deg)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 6px 10px rgba(0,0,0,0.6)" }}>
                <Img src={staticFile(`logos/${sl}`)}
                     style={{ width: 40 * sz, height: 40 * sz, objectFit: "contain", display: "block" }} />
              </div>
            );
          })}
          <HeroCard f={f} x={392} y={520} idx={2} s={0.95} t={1} z={34} />
          <Dev f={f} x={44} y={560} size={166} gaze={1} cheer={0.9} nodAmp={3} nodSpeed={10} z={40} />
          <AChip y={706} text="POSTED EVERYWHERE" c={GO} size={32} />
        </>)}

        {/* 10-11 · the integrations, ARRIVING one at a time */}
        {S(C[8], C[9], 1, <>
          <RackHall f={f} z={3} /><Wedges f={f} tint="#141E29" z={5} /><Satellites f={f} at={0} n={7} z={6} />
          {["gmail.svg", "slack.svg", "whatsapp.svg"].map((sl, i) => (
            <Mark key={sl} slug={sl} x={110 + i * 290} y={250} at={sp(C[8], C[9], 3, i)} s={1.35}
                  label={["GMAIL", "SLACK", "WHATSAPP"][i]} />
          ))}
          <AChip y={706} text="REAL INTEGRATIONS" c={A3} size={32} />
        </>)}
        {S(C[9], C[10], 2, <>
          <RackHall f={f} z={3} /><Wedges f={f} tint="#141E29" z={5} /><Satellites f={f} at={0} n={7} z={6} />
          <svg width={1012} height={792} style={{ position: "absolute", inset: 0, zIndex: 18 }}>
            {[0, 1, 2, 3].map((i) => {
              const at = sp(C[9], C[10], 4, i);
              const u = lin(f, at + 6, at + 26);
              if (u <= 0) return null;
              const x1 = 70 + i * 235 + 86, y1 = 272 + 152;
              const x2 = 506, y2 = 560;
              return <path key={i} d={`M${x1} ${y1} Q ${x1} ${(y1 + y2) / 2} ${x1 + (x2 - x1) * u} ${y1 + (y2 - y1) * u}`}
                           stroke={GO} strokeWidth={5} fill="none" opacity={0.85} />;
            })}
          </svg>
          {["youtube.svg", "notion.svg", "telegram.svg", "discord.svg"].map((sl, i) => (
            <Mark key={sl} slug={sl} x={70 + i * 235} y={272} at={sp(C[9], C[10], 4, i)} s={1.15} />
          ))}
          <Dev f={f} x={410} y={548} size={186} gaze={1} cheer={0.85} nodAmp={3} nodSpeed={10} z={40} />
          <AChip y={706} text="AND THE REST" c={A3} size={32} />
        </>)}

        {/* 12 · "18 categories of automations in total" */}
        {S(C[10], C[11], 3, <>
          <Dark />
          {/* 18 cells, each a REAL mark + its real word, revealed on a linear
              sweep. ⛔ never a coloured rectangle standing in for a category. */}
          {AUTO_CATS.slice(0, 18).map((cat, i) => {
            const col = i % 6, row = Math.floor(i / 6);
            const t = lin(f, C[10] - 11 + i * 1.6, C[10] + 1 + i * 1.6);
            if (t <= 0.02) return null;
            const ic = AUTO_CAT_ICONS[i % AUTO_CAT_ICONS.length];
            return (
              <div key={cat} style={{ position: "absolute", left: 26 + col * 162,
                top: 156 + row * 150, width: 150, height: 136, borderRadius: 12,
                background: CARD, zIndex: 16,
                transform: `translateY(${(1 - t) * 26}px) scale(${0.86 + t * 0.14})`,
                opacity: t, boxShadow: "0 7px 11px rgba(0,0,0,0.62)" }}>
                <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 5,
                  borderRadius: "10px 10px 0 0", background: A3 }} />
                <div style={{ position: "absolute", left: 0, right: 0, top: 26,
                  display: "flex", justifyContent: "center" }}>
                  <Img src={staticFile(`logos/${ic.slug}`)}
                       style={{ width: 54, height: 54, objectFit: "contain", display: "block" }} />
                </div>
                <div style={{ position: "absolute", left: 0, right: 0, bottom: 14, textAlign: "center",
                  fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 15,
                  letterSpacing: "0.04em", color: "#6E6656" }}>{cat}</div>
              </div>
            );
          })}
          <div style={{ position: "absolute", left: 26, top: 626, width: 300, height: 96,
            borderRadius: 14, background: "#0B1017", border: `5px solid ${A3}`, zIndex: 30,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 62,
              color: A1, lineHeight: 1 }}>
              {Math.round(18 * lin(f, C[10] - 8, C[11] - 1))}</span>
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 19,
              letterSpacing: "0.16em", color: A3 }}>CATEGORIES</span>
          </div>
        </>)}

        {/* 13 · "and you don't have to build any of them" */}
        {S(C[11], C[12], 0, <>
          <RackHall f={f} z={3} /><Wedges f={f} tint="#141E29" z={5} /><Satellites f={f} at={0} n={7} z={6} />
          <NodeGraph f={f} x={236} y={188} w={620} h={286} at={C[11] + 1} z={20} />
          {/* his hands never touch it — the parts arrive to the canvas on their own */}
          {[0, 1, 2, 3].map((i) => {
            const u = lin(f, C[11] + 2 + i * 7, C[11] + 20 + i * 7);
            if (u <= 0 || u >= 1) return null;
            const b = BRAND_TASKS[(i + 2) % BRAND_TASKS.length];
            return (
              <div key={i} style={{ position: "absolute",
                left: 60 + (300 + i * 90 - 60) * u, top: 560 - 300 * u,
                width: 128 * (1 - u * 0.4), height: 92 * (1 - u * 0.4), borderRadius: 10,
                background: CARD, opacity: 1 - u * 0.3, zIndex: 30,
                transform: `rotate(${(1 - u) * (i % 2 ? 22 : -22)}deg)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 6px 10px rgba(0,0,0,0.6)" }}>
                <Img src={staticFile(`logos/${b.slug}`)}
                     style={{ width: 44 * (1 - u * 0.4), height: 44 * (1 - u * 0.4),
                       objectFit: "contain", display: "block" }} />
              </div>
            );
          })}
          <Dev f={f} x={36} y={512} size={200} gaze={2} nodAmp={1.6} nodSpeed={8} z={40} />
          <AChip y={706} text="YOU BUILD NOTHING" c={RED} size={32} />
        </>)}

        {/* 14-15 · "grab one file · click import and it runs immediately" */}
        {S(C[12], C[13], 1, <>
          <Dark />
          <HeroCard f={f} x={lin(f, C[12], C[13], 150, 470)} y={lin(f, C[12], C[13], 340, 232)}
                    idx={9} s={1.5} t={E(f, C[12] + 2, C[12] + 14, 0, 1, BACK)} z={34} />
          <div style={{ position: "absolute", left: 0, right: 0, top: 540, textAlign: "center",
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 30, letterSpacing: "0.16em",
            color: "#8E8677", zIndex: 30 }}>ONE .JSON FILE</div>
          <AChip y={706} text="GRAB ONE" c={A3} size={32} />
        </>)}
        {S(C[13], C[14], 2, <>
          <Dark />
          {/* ⛔ THE IMPORT WAS A BUTTON THAT POPPED. It is the payoff of the whole
              reel — the one action the viewer has to believe is easy — so it gets
              a real sequence, in order, with a cursor doing the work:
                 0-10  the .json lands on the canvas
                 8-17  the cursor travels to IMPORT and presses it
                14-32  nodes appear one by one, wires draw between them
                26-36  the toggle flips ACTIVE and a packet runs the graph      */}
          {(() => {
            const t = f - C[13];
            const GX = 118, GY = 200, GW = 786, GH = 300;
            const drop = lin(f, C[13], C[13] + 7);
            const cur  = lin(f, C[13] + 5, C[13] + 12);
            const press = t >= 12 && t <= 17;
            const built = lin(f, C[13] + 11, C[13] + 30);
            const live = t >= 21;
            const NODES = [
              { s: "gmail.svg",  l: "Gmail Trigger" },
              { s: "n8n.svg",    l: "Filter" },
              { s: "notion.svg", l: "Create Page" },
              { s: "slack.svg",  l: "Notify" },
            ];
            const NP = [[40, 40], [250, 152], [462, 40], [664, 152]];
            const pk = Math.max(0, Math.min(0.999, (t - 21) / 15));
            const seg = Math.floor(pk * 3), u = pk * 3 - seg;
            return (<>
              {/* the canvas */}
              <div style={{ position: "absolute", left: GX, top: GY, width: GW, height: GH,
                borderRadius: 16, background: "#12161C", border: "3px solid #222C36",
                overflow: "hidden", zIndex: 18 }}>
                {Array.from({ length: 13 }, (_, r) =>
                  Array.from({ length: 34 }, (_, c) => (
                    <div key={`${r}-${c}`} style={{ position: "absolute", left: c * 24 + 8,
                      top: r * 24 + 8, width: 3, height: 3, borderRadius: "50%",
                      background: "#202A34" }} />
                  )))}
              </div>
              {/* wires, drawn behind the nodes */}
              <svg width={GW} height={GH} style={{ position: "absolute", left: GX, top: GY, zIndex: 22 }}>
                {NP.slice(0, -1).map((p, i) => {
                  const q = NP[i + 1];
                  const w = Math.max(0, Math.min(1, built * 4 - i - 0.6));
                  if (w <= 0) return null;
                  const x1 = p[0] + 156, y1 = p[1] + 42, x2 = q[0], y2 = q[1] + 42;
                  return <path key={i} d={`M${x1} ${y1} C ${x1 + 60} ${y1} ${x2 - 60} ${y2} ${x1 + (x2 - x1) * w} ${y1 + (y2 - y1) * w}`}
                               stroke={live ? GO : "#3C4A57"} strokeWidth={5} fill="none" />;
                })}
              </svg>
              {/* the nodes, one at a time */}
              {NODES.map((n, i) => {
                const a = Math.max(0, Math.min(1, built * 4 - i));
                if (a <= 0.02) return null;
                const lit = live && seg >= i;
                return (
                  <div key={n.l} style={{ position: "absolute", left: GX + NP[i][0], top: GY + NP[i][1],
                    width: 156, height: 84, borderRadius: 12, background: CARD, zIndex: 26,
                    transform: `scale(${0.6 + a * 0.4})`, opacity: a,
                    border: lit ? `3px solid ${GO}` : "3px solid transparent",
                    display: "flex", alignItems: "center", gap: 10, paddingLeft: 12,
                    boxSizing: "border-box", boxShadow: "0 8px 12px rgba(0,0,0,0.65)" }}>
                    <Img src={staticFile(`logos/${n.s}`)}
                         style={{ width: 34, height: 34, objectFit: "contain", display: "block" }} />
                    <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 17,
                      color: INKD, lineHeight: 1.15 }}>{n.l}</div>
                  </div>
                );
              })}
              {/* the packet that proves it runs */}
              {live && (() => {
                const a = NP[seg], b = NP[seg + 1];
                const x1 = GX + a[0] + 156, y1 = GY + a[1] + 42;
                const x2 = GX + b[0], y2 = GY + b[1] + 42;
                return <div style={{ position: "absolute", left: x1 + (x2 - x1) * u - 12,
                  top: y1 + (y2 - y1) * u - 12, width: 24, height: 24, borderRadius: "50%",
                  background: "#EAFBF3", boxShadow: `0 0 20px ${GO}`, zIndex: 34 }} />;
              })()}
              {/* the .json file dropping in */}
              {drop < 1 && (
                <div style={{ position: "absolute", left: -140 + drop * 480, top: 250 + drop * 60,
                  width: 168, height: 122, borderRadius: 12, background: "#D8D2C6", zIndex: 30,
                  transform: `rotate(${(1 - drop) * -18}deg)`,
                  boxShadow: "0 10px 14px rgba(0,0,0,0.6)", display: "flex",
                  alignItems: "center", justifyContent: "center",
                  fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 24, color: "#5C5749" }}>
                  .json
                </div>
              )}
              {/* the IMPORT button + the cursor that presses it */}
              <div style={{ position: "absolute", left: 356, top: 556, width: 300, height: 78,
                borderRadius: 12, background: press ? "#1F8A5C" : GO, zIndex: 32,
                transform: `translateY(${press ? 5 : 0}px)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 31,
                letterSpacing: "0.08em", color: "#08110C",
                boxShadow: press ? "0 3px 6px rgba(0,0,0,0.7)" : "0 10px 16px rgba(0,0,0,0.65)" }}>
                IMPORT
              </div>
              <svg width={46} height={62} viewBox="0 0 46 62"
                   style={{ position: "absolute", left: 900 - cur * 400,
                     top: 700 - cur * 100 + (press ? 6 : 0), zIndex: 40,
                     filter: "drop-shadow(0 3px 4px rgba(0,0,0,0.7))" }}>
                <path d="M4 2 L4 44 L14 35 L21 52 L29 48 L22 32 L36 31 Z"
                      fill="#F3EEE3" stroke="#11161C" strokeWidth={3} strokeLinejoin="round" />
              </svg>
              {live && (
                <div style={{ position: "absolute", left: 700, top: 130, padding: "8px 18px",
                  borderRadius: 999, background: GO, zIndex: 36, fontFamily: inter.fontFamily,
                  fontWeight: 900, fontSize: 20, letterSpacing: "0.1em", color: "#08110C",
                  transform: `scale(${E(f, C[13] + 21, C[13] + 27, 0.4, 1, BACK)})` }}>ACTIVE</div>
              )}
            </>);
          })()}
          <AChip y={706} text="AND IT RUNS" c={GO} size={32} />
        </>)}

        {/* 16-18 · "everyone else is still doing all of this by hand every day" */}
        {S(C[14], C[15], 3, <>
          <Room />
          <Tiers f={f} slide={slide} beat={beat} done={done} />
          <Dev f={f} x={28} y={392} size={196} gaze={2} shock={0.7} nodAmp={2.4} nodSpeed={15} z={60} />
          <AChip y={706} text="EVERYONE ELSE" c={RED} size={32} />
        </>)}
        {S(C[15], C[16], 0, <>
          <Room />
          <Tiers f={f} slide={slide} beat={beat} done={done} />
          <WallClock f={f} cx={790} cy={250} r={140} hours={E(f, C[15], C[16], 0, 9, IO)} z={44} />
          <Dev f={f} x={28} y={392} size={196} gaze={2} shock={0.8} nodAmp={2.6} nodSpeed={16} z={60} />
          <AChip y={706} text="HOURS. EVERY DAY." c={RED} size={32} />
        </>)}
        {S(C[16], C[17], 1, <>
          <Room />
          <Tiers f={f} slide={slide * 2.2} beat={beat} done={0}
                 flip={E(f, C[16] + 2, C[17] - 4, 0, 1.1, IO)} />
          <Dev f={f} x={28} y={392} size={196} gaze={2} cheer={0.9} nodAmp={3.4} nodSpeed={10} z={60} />
          <AChip y={706} text="OR NOT" c={GO} size={34} />
        </>)}

        {/* 19 · CTA */}
        {S(C[17], 9999, 2, <>
          <Dark />
          <SkylineNight f={f} z={3} />
          <div style={{ position: "absolute", inset: 0, background: "#080C12", opacity: 0.55, zIndex: 4 }} />
          <div style={{ position: "absolute", left: 96, top: 214, width: 820, height: 214,
            borderRadius: 18, background: "#F3EEE3", zIndex: 34,
            transform: `scale(${E(f, C[17] + 2, C[17] + 15, 0.5, 1, BACK)})`,
            boxShadow: "0 18px 28px rgba(0,0,0,0.75)" }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 16, textAlign: "center",
              fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 24, letterSpacing: "0.22em",
              color: "#6E6656" }}>COMMENT</div>
            <div style={{ position: "absolute", left: 0, right: 0, top: 58, textAlign: "center",
              fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 128, lineHeight: 1,
              letterSpacing: "-0.04em", color: INKD }}>AUTO</div>
          </div>
          {Array.from({ length: 16 }, (_, i) => {
            const born = C[17] + 2 + i * 1.9;
            const u = lin(f, born, born + 26);
            if (u <= 0 || u >= 1) return null;
            const b = BRAND_TASKS[i % BRAND_TASKS.length];
            return <DoneCard key={i} x={40 + (i * 79) % 860} y={90 + u * 600}
                             s={0.42} slug={b.slug}
                             rot={(i % 2 ? 1 : -1) * u * 26} op={(1 - u) * 0.95} z={20} />;
          })}
          <RepoCard f={f} x={286} y={lin(f, C[17] + 8, LEN - 2, 470, 424)} s={0.98}
                     t={E(f, C[17] + 10, C[17] + 22, 0, 1, BACK)} z={34} />
          <Dev f={f} x={36} y={520} size={196} gaze={1} cheer={0.95} nodAmp={3.6} nodSpeed={9} z={40} />
        </>)}

        <Flash f={f} cuts={RQ_CUTS} />
        {(() => {
          const k = f - C[0];
          if (k < -1 || k > 2) return null;
          return <div style={{ position: "absolute", inset: 0, zIndex: 90,
            background: k < 0 ? "#05080C" : "#FFF6E2",
            opacity: k < 0 ? 1 : 0.82 - k * 0.34 }} />;
        })()}
      </Panel>
      <Audio src={staticFile("auto85_vo_v2.wav")} />
    </AbsoluteFill>
  );
};
