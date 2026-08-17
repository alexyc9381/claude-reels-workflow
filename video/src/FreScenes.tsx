import React from "react";
import { AbsoluteFill, Img, OffthreadVideo, Sequence, staticFile, useCurrentFrame } from "remotion";
import { inter, fraunces } from "./fonts";
import { MONO, Mascot } from "./SlopKit";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, SH, SH_D, rnd, dkh, mxh,
  CLAY, GOLD, GREEN, RED, SKY, PAPER, INK, MUTE,
  Scene, Cam, Mark, MarkCast, PLACES,
  BR, TABS, MODELS, ENGINES, PAID, ARENA,
  Browser, Shot, ModelTile, Receipt, ChargeStamp, EngineBox, Mosaic, LevelBars,
  PromptBar, RenderSweep, LinkCard, DownloadBar, fillsAt, FullBleed,
  rock, shake, drift,
} from "./FreWorld";

/* ===========================================================================
   REEL 105 "FREE" · THE BODY.  Board: storyboards/105-free.md.

   ⛔⛔ EVERY EVENT FRAME BELOW IS A MEASURED WORD ONSET from
      src/words_105free.json, converted to LOCAL frames, with the PICTURE
      LEADING THE ONSET BY 4 FRAMES so the crossover — not the start — lands on
      the syllable.
      root onsets (s): Number1 1.96 · This 2.18 · ChatGPT 2.90 · Claude 3.19 ·
        Gemini 3.57 · Grok 4.01 · DeepSeek 4.30 · all 4.60 · free 5.55 ·
        So 6.00 · monthly 6.93 · but 8.00 · Number2 9.65 · It 11.46 ·
        Kling 11.76 · Sora 12.10 · Seedance 12.43 · Just 13.86 · video 14.63 ·
        Number3 15.81 · insane 17.35 · that 18.32 · toe 18.70 · Follow 20.27
      scene `at` (frames, lead-4): 0 / 55 / 176 / 286 / 340 / 412 / 470 / 546 /
        604.   TOTAL 662 (22.07s).

   ⛔⛔ THE STAGE, MEASURED. The panel is 1012 x 792; the root header pill owns
      y 0..112 and the slug owns y 730..792, so every hero object lives inside
      **y 118..726**. The browser is BR (x40 y128 w932 h588) and every position
      here is derived from it, never re-guessed.

   ⛔⛔ THE `push` RANGE IS SCENE-LOCAL, NOT SHOT-LOCAL — `Scene` reads
      useCurrentFrame(), which restarts per SEQUENCE. Reel 98 shipped 9 of 15
      shots with a frozen camera this way and reel 103 did it again AFTER
      writing the warning into its own header, so every `push` below ends at or
      past its own scene's last frame.

   ⛔ THE MOVE BUDGET IS THREE: S1 pushes onto the docking row, S4 pushes with
      the travelling band, S8 pulls back on the payoff. Everything else is
      locked but for the mandatory continuous in-panel push.
   ========================================================================= */

/* ⛔ NO IRIS, NO WHITE FLASH, NO PURE BLACK OR WHITE PLATE
   ([[feedback_no_flashing_transitions]]): peak 0.22, ramps in AND out, warm. */
const Flash: React.FC<{ lf: number; at: number; n?: number; o?: number }> =
  ({ lf, at, n = 8, o = 0.22 }) => {
  const k = E(lf, at, at + 3, 0, 1, OUT) - E(lf, at + 3, at + n, 0, 1, IO);
  if (k <= 0.01) return null;
  return <div style={{ position: "absolute", inset: 0, zIndex: 96, pointerEvents: "none",
    background: hexa("#F6E8CE", o * k) }} />;
};

/* the room the browser sits in — matte, high-key, one committed light side.
   ⛔ It is FURNITURE and it is always doing something (the light bar breathes,
   the motes drift), because one hero doing one gesture is a dead shot. */
const Desk: React.FC<{ p: any; f: number; lightX?: number }> = ({ p, f, lightX = 0.42 }) => (
  <>
    <div style={{ position: "absolute", inset: 0, zIndex: 1,
      background: `linear-gradient(178deg, ${p.back} 0%, ${p.back2} 58%, ${p.floor2} 100%)` }} />
    {/* the desk plane */}
    <div style={{ position: "absolute", left: 0, top: p.horizon + 250, width: W, height: H,
      zIndex: 2, background: `linear-gradient(180deg, ${p.floor} 0%, ${p.floor2} 100%)`,
      borderTop: `4px solid ${p.lip}` }} />
    {/* the practical, breathing */}
    <div style={{ position: "absolute", left: W * lightX - 300, top: -140, width: 600, height: 520,
      zIndex: 3, background: `radial-gradient(circle, ${hexa(p.key, 0.20 + 0.05 * Math.sin(f / 21))}, transparent 66%)` }} />
    {/* contact shadow under the browser */}
    <div style={{ position: "absolute", left: BR.x + 26, top: BR.y + BR.h - 16, width: BR.w - 52,
      height: 46, zIndex: 4, borderRadius: "50%",
      background: `radial-gradient(ellipse, ${hexa("#3A3226", 0.34)}, transparent 70%)`,
      filter: "blur(9px)" }} />
  </>
);

/* ⭐⭐ THE CLAUDE SPRITE, IN EVERY SCENE.
   Alex, round 2: *"use our Claude sprite throughout here since I don't see it
   much."* v1 had him in the hook and the CTA only — seven of nine scenes had no
   character at all. `docs/THE-OPEN.md` law 2 already says characters stop
   scrolls and empty rooms do not, and reel 104 measured it: putting three small
   Claudes into the empty bays moved that bucket 14.2 -> 17.8.

   ⛔ HE SITS ON THE BROWSER'S BOTTOM BEZEL, never over the hero. The panel is
      1012 wide and the browser spans x40..972, so there is no desk left to
      stand on — he goes IN FRONT of the screen at panel y~566, which is below
      every scene's hero object, and alternates side so the eye is not parked in
      one corner for 22 seconds ([[feedback_reel_vary_the_locations]]).
   ⛔ NEVER a mark on his face. The body rect IS the face
      ([[reference_reel_build_learnings]]), so nothing is ever pinned to it. */
const Sprite: React.FC<{
  f: number; side?: "l" | "r"; size?: number; y?: number;
  gaze?: number; cheer?: number; shock?: number; stern?: number; nod?: number;
}> = ({ f, side = "r", size = 158, y = 566, gaze = 0, cheer = 0, shock = 0,
        stern = 0, nod = 4.4 }) => (
  <Cam z={46}>
    <div style={{ position: "absolute", left: side === "r" ? 814 : 54, top: y }}>
      <Mascot lf={f} size={size} gaze={gaze} nodAmp={nod} nodSpeed={11}
        cheer={cheer} shock={shock} stern={stern} />
    </div>
  </Cam>
);

/* ===========================================================================
   ⭐⭐⭐ THE PAYOFFS — FULL **FRAME**, NOT FULL PANEL. RENDERED AT ROOT.

   Alex: *"the animations are just not sticking visually, not interesting
   enough to retain attention."* The measurement behind this one:

   **THE PICTURE IS ONLY 41% OF THE SCREEN.** The house Panel is 1012x792 inside
   a 1080x1920 frame (y 384..1176), so 59% of every frame is empty cream. On a
   phone that is a small picture in a large empty field, and it caps attention
   no matter what happens inside it. The previous full-bleed pass filled the
   PANEL, which was the right idea aimed at the wrong rectangle.

   ⭐ These fill the whole 1080x1920 frame: **2.4x the area** of a panel-bleed
   and ~6x the area the same asset had as an in-browser thumbnail. They cannot
   live inside a scene to do it — `Scene` renders inside `Panel`, which clips —
   so they are a ROOT-level track, mounted between the scenes and the chrome so
   the rail and the karaoke captions still read on top.

   ⛔ THIS IS A DELIBERATE, TEMPORARY DEPARTURE FROM THE HOUSE CHASSIS
      ([[feedback_reel_house_chassis]] keeps cream Bg + Panel). It is spent on
      three payoff beats totalling ~2.6s of 22s; the chassis owns every other
      frame. A payoff that breaks the format is an accent — if it ran the whole
      reel it would just be a different flat framing, which is the fault this
      exists to fix.
   ⛔ EVERY PAYOFF PUSHES. A still image at full frame is still a still; each
      one scales continuously so the frame is alive for its whole hold.
   ========================================================================= */
const FW = 1080, FH = 1920;

export const Payoffs: React.FC = () => {
  /* ⛔⛔ ROOT FRAMES, and the CLIP BEAT WAS 18 FRAMES LONG. Alex: *"at 15
     seconds the video sucks and it's only there for a split second."* Both
     halves were true and they had different causes.
       DURATION — the payoff ran 452..470, i.e. **0.6s**, because S5 spent 40 of
       its 58 frames typing a prompt and sweeping a render bar before the thing
       the beat is ABOUT ever appeared. S5's build-up is now compressed so the
       clip lands at local f22 and holds to the cut: **434..470, 1.2s, double**.
       CONTENT — it was a STILL FRAME of a video, in the one beat that is
       literally about a video generator. It is now REAL MOVING FOOTAGE:
       magnific.com's own published showcase render (`video-generator-intro.webm`,
       1920x1080), trimmed to a single continuous 1.72s dolly shot that stays
       inside one take and carries obvious camera motion.
     ⭐ This is exactly what Alex asked for in the very first message of the
        build — *"real screen recordings of the outputs they could generate"* —
        and it is the product's own showcase of the product being featured. */
  const BEATS = [
    { a: 151, b: 176, src: "shots/arena_rows.png", kind: "img",   scroll: true,  mosaic: false },
    { a: 434, b: 470, src: "shots/mag_clip.mp4",   kind: "video", scroll: false, mosaic: false },
    { a: 508, b: 546, src: "shots/nb_out.png",     kind: "img",   scroll: false, mosaic: true  },
  ];
  return (<>
    {BEATS.map((B, i) => (
      /* ⛔ EACH BEAT IS ITS OWN Sequence so `OffthreadVideo` starts at its own
         frame 0 rather than at the reel's — a video mounted outside a Sequence
         plays from whatever the root frame happens to be. */
      <Sequence key={i} from={B.a} durationInFrames={B.b - B.a} layout="none">
        <PayoffBeat {...B} n={B.b - B.a} at={B.a} />
      </Sequence>
    ))}
  </>);
};

const PayoffBeat: React.FC<{ src: string; kind: string; scroll: boolean;
  mosaic: boolean; n: number; at: number }> = ({ src, kind, scroll, mosaic, n, at }) => {
  const lf = useCurrentFrame();
  /* ⛔ A FAST IN. An 8-frame fade cross-dissolves the payoff with the scene
     underneath, and two half-opacity pictures read as a smear, not a cut. */
  const k = E(lf, 0, 3, 0, 1, OUT) - E(lf, n - 5, n, 0, 1, IO);
  if (k <= 0.01) return null;
  const push = 1.03 + E(lf, 0, n, 0, 0.09, LIN);          /* ⛔ never a still */
  const res = mosaic ? E(lf, 2, n - 8, 0.18, 1, IO) : 1;
  return (
    /* ⛔⛔ NO zIndex HERE, DELIBERATELY. `KaraokeCaption` carries no z-index, so
       any positive z on this layer paints OVER the caption track — the first
       render buried it. With auto z the paint order is pure DOM order:
       scenes -> payoffs -> headers -> rail (z120) -> captions. */
    <AbsoluteFill style={{ overflow: "hidden", opacity: k }}>
      <div style={{ position: "absolute", inset: 0, background: "#14120F" }} />
      <div style={{ position: "absolute", inset: 0,
        transform: `scale(${push}) translateY(${scroll ? -Math.min(lf * 9, 200) : 0}px)`,
        transformOrigin: "50% 46%" }}>
        {kind === "video" ? (
          <OffthreadVideo src={staticFile(src)} muted
            style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <Img src={staticFile(src)}
            style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        )}
      </div>
      {mosaic && Array.from({ length: 20 * 30 }, (_, j) => {
        const cx = j % 20, cy = Math.floor(j / 20);
        const front = (cx / 20) * 0.68 + (cy / 30) * 0.24;
        const a = 1 - E(res, front, front + 0.28, 0, 1, IO);
        if (a <= 0.01) return null;
        const v = 176 + Math.floor(rnd(cx * 7 + 1, cy * 3 + 2) * 62);
        return <div key={j} style={{ position: "absolute", left: `${(cx / 20) * 100}%`,
          top: `${(cy / 30) * 100}%`, width: `${100 / 20 + 0.15}%`, height: `${100 / 30 + 0.15}%`,
          background: `rgb(${v},${v - 6},${v - 18})`, opacity: a }} />;
      })}
      <div style={{ position: "absolute", inset: 0,
        background: `radial-gradient(112% 74% at 50% 40%, transparent 34%, ${hexa("#05060B", 0.62)} 100%)` }} />
      {scroll && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 940,
          display: "flex", justifyContent: "center",
          transform: "scale(1.62)", transformOrigin: "50% 50%" }}>
          <Receipt x={0} y={0} rel k={E(lf, 6, 18, 0, 1, OUT)} z={5} />
        </div>
      )}
      <div style={{ position: "absolute", left: 0, right: 0, top: 1430,
        transform: "scale(1.46)", transformOrigin: "50% 50%" }}>
        {/* ⛔ ROOT frame, not the Sequence-local one, or every slot reads full */}
        <DownloadBar f={lf} fill={fillsAt(at + lf)} z={5} top={0} w={FW} />
      </div>
    </AbsoluteFill>
  );
};

/* ==================================================================== S0 ===
   0.00 -> 1.83s · 55f · ONE LOCKED FRAMING · HOOK
   "3 AI platforms that replace paid tools."

   ⛔⛔⛔ ROUND 4. Alex: *"it's still too boring, I don't like the '3' thing, and
      it's just not interesting nor hierarchical."*

   ⭐⭐ THE "3" WAS THE PROBLEM, AND SO WERE THE THREE EQUAL CARDS.
      **Three things the same size, in a row, is a LIST. A list has no
      hierarchy by construction** — nothing is first, so the eye has nowhere to
      land and the numeral has to do the work the layout refused to do. That is
      why the numeral felt bolted on: it was compensating.
      ⛔ So the SIZES carry the hierarchy: card one is 320px, cards two and
      three are 240px. There is now an obvious hero, an obvious reading order,
      and the count is legible from the shapes alone.
      ⭐ ROUND 7 PUT THE NUMERAL BACK, at the measured 84px, and the distinction
      is the whole lesson: **a numeral compensating for a layout with no
      hierarchy reads as bolted on; the same numeral beside a layout that
      already has one reads as a label.** Alex was right to cut it and
      [[feedback_frame0_claim_plate]] is right that it belongs — those are not
      in conflict once the cards do their own job.

   ⭐⭐ AND THE EVENT IS NOW A TRANSACTION, NOT A FADE. The VO line is "3 AI
      platforms that REPLACE PAID tools", so the picture is a price coming OFF:
      cards two and three sit locked behind a dark `$` badge, greyed and
      blurred, and one after the other the badge SNAPS OFF and the card floods
      with that site's real brand colour and its real app icon.
      ⛔ NO INVENTED PRICE. The badge is a bare `$`, never "$20/mo" — the reel
      does not put a number on anyone's pricing anywhere.

   ⭐ THE MARKS ARE REAL APP ICONS, pulled from each site's live
      apple-touch-icon this build, not wordmark crops and not drawn stand-ins.

   THE EVENT (all four parts): before — one bright card, two locked and blurred.
   trigger — the `$` badge snaps. travel — it flips off and falls away.
   arrival — the card floods with colour, the icon lands, it squashes and rings.
   ========================================================================= */
export const S0Hook: React.FC = () => {
  const f = useCurrentFrame();
  const p = PLACES.desk;
  /* ⛔ TIMED TO THE VO'S OWN WORDS at the house 4-frame picture lead:
     3 @0.00 · platforms @0.27 (f8 -> f4) · replace @0.75 (f22 -> f18).
     Two unlocks inside second one — bucket 1 is the most-watched second and a
     previous cut of this hook measured 5.1 there by revealing too late. */
  const OPEN = [-16, 4, 18];   /* card one is FULLY open at f0, badge already gone */
  const SETTLE = 32;
  const sk = [...OPEN, SETTLE].map((a) => shake(f, a, 8, 8));
  const kick = { x: sk.reduce((s, v) => s + v.x, 0), y: sk.reduce((s, v) => s + v.y, 0) };
  const PL = { x: 56, y: 168, w: 900, h: 456 };
  /* ⭐ THE HIERARCHY IS THE GEOMETRY: 320 / 240 / 240, hero first. */
  const CARD = [
    { w: 320, x: 20,  y: 78 },
    { w: 240, x: 370, y: 128 },
    { w: 240, x: 630, y: 128 },
  ];
  return (
    <Scene p={p} slug="arena.ai · magnific.com · aistudio.google.com"
      push={[0, 55, 1.088]} vig={0.44}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1,
        transform: `translate(${kick.x}px, ${kick.y}px)` }}>
        <Desk p={p} f={f} lightX={0.44} />

        {/* the background keeps running so the poster is never a still */}
        {TABS.map((t, lane) => {
          const yy = 132 + lane * 206;
          const xx = ((f * (12 + lane * 5)) % 420) - 420;
          return (
            <div key={t.id} style={{ position: "absolute", left: 0, top: yy, width: W,
              height: 56, zIndex: 4, overflow: "hidden" }}>
              {Array.from({ length: 6 }, (_, i) => (
                <div key={i} style={{ position: "absolute", left: xx + i * 210, top: 0,
                  width: 150, height: 56, borderRadius: 14, background: hexa(t.tint, 0.19) }} />
              ))}
            </div>
          );
        })}

        {/* ---- the cream plate: 900x456 at panel y168 = 51.2% of the panel --- */}
        <div style={{ position: "absolute", left: PL.x, top: PL.y, width: PL.w, height: PL.h,
          zIndex: 30, borderRadius: 30, background: "#F6F2E7",
          border: "5px solid #E0D5BB", boxShadow: SH_D }}>
          {/* the audience filter, big and on frame 0 */}
          <div style={{ position: "absolute", left: 30, top: 20, width: 92, height: 92,
            borderRadius: 22, background: "#FFFFFF", border: "4px solid #EDE7DB",
            display: "flex", alignItems: "center", justifyContent: "center", zIndex: 60 }}>
            <Img src={staticFile("claude_logo.png")}
              style={{ width: 68, height: 68, objectFit: "contain" }} />
          </div>

          {/* ⛔⛔ THE NUMERAL IS OUT, FOR THE SECOND AND FINAL TIME. Alex rejected
              it in round 4 and again in round 7 ("the number 3 at the hook is
              not good"). I brought it back citing [[feedback_frame0_claim_plate]]'s
              "the number in 74-88px Fraunces"; he has now overruled that twice,
              so it is his call and it stays out.

              ⭐⭐ AND THE HOUSE ALREADY HAD THE BETTER ANSWER, which is why I
              should not have reached for type at all:
              [[feedback_graphical_over_textual]] — **a number MOVES to its
              value, it is never typeset at it.** So the count is three PIPS in
              the sites' own brand colours, and each one lights as its card
              unlocks. That satisfies the measured rule's intent (the count is
              on the plate, in the eye's landing zone, at frame 0), satisfies
              the craft rule (graphic, not type), and satisfies Alex. A numeral
              was the lazy reading of all three. */}
          {TABS.map((t, i) => {
            const lit = E(f, OPEN[i], OPEN[i] + 7, 0, 1, OUT);
            return (
              <div key={"pip" + t.id} style={{ position: "absolute", left: 146 + i * 40,
                top: 46, width: 30, height: 30, borderRadius: 9, zIndex: 60,
                background: lit > 0.02 ? t.tint : "#DCD3BF",
                border: `3px solid ${lit > 0.02 ? dkh(t.tint, 0.26) : "#C6BCA6"}`,
                transform: `scale(${0.82 + lit * 0.18})` }} />
            );
          })}
          {/* two graphic rules carrying the eye across to the cards */}
          <div style={{ position: "absolute", left: 278, top: 46, width: 568, height: 11,
            borderRadius: 6, background: CLAY, zIndex: 58 }} />
          <div style={{ position: "absolute", left: 278, top: 72, width: 372, height: 11,
            borderRadius: 6, background: GOLD, zIndex: 58 }} />

          {TABS.map((t, i) => {
            const a = OPEN[i];
            const k = E(f, a, a + 7, 0, 1, OUT);              // the unlock
            const c = CARD[i];
            const rk = rock(f, a + 2, 9, 22) + rock(f, SETTLE + i * 4, 7, 18);
            const sq = 1 + E(f, a, a + 4, 0, 1, OUT) * 0.13 - E(f, a + 4, a + 14, 0, 1, IO) * 0.13
                         + E(f, SETTLE + i * 4, SETTLE + i * 4 + 4, 0, 1, OUT) * 0.09
                         - E(f, SETTLE + i * 4 + 4, SETTLE + i * 4 + 14, 0, 1, IO) * 0.09;
            const ring = E(f, a, a + 15, 0, 1, OUT);
            /* the badge flips off and falls away */
            const bOff = E(f, a, a + 11, 0, 1, IN_Q);
            return (
              <div key={t.id} style={{ position: "absolute", left: c.x, top: c.y + rk,
                width: c.w, height: c.w, zIndex: 40 + (i === 0 ? 2 : 0),
                borderRadius: 30, boxShadow: SH,
                background: k > 0.02 ? t.tint : "#C4BEB2",
                border: `7px solid ${k > 0.02 ? dkh(t.tint, 0.24) : "#ABA498"}`,
                transform: `scaleY(${sq}) rotate(${(1 - k) * (i === 1 ? -4 : i === 2 ? 4 : 0)}deg)`,
                filter: k < 0.99 ? `blur(${(1 - k) * 14}px)` : undefined,
                display: "flex", alignItems: "center", justifyContent: "center" }}>
                {/* ⭐ THE REAL APP ICON, big — no wordmark, no tile behind it */}
                <Img src={staticFile(t.icon)}
                  style={{ width: c.w * 0.60, height: c.w * 0.60, objectFit: "contain",
                    borderRadius: c.w * 0.13,
                    filter: k < 0.99 ? `grayscale(${(1 - k) * 0.92})` : undefined }} />
                {/* the arrival ring */}
                {ring > 0.01 && ring < 0.99 && (
                  <div style={{ position: "absolute", inset: -12, borderRadius: 38,
                    border: `6px solid ${hexa("#FFFFFF", 0.85 * (1 - ring))}`,
                    transform: `scale(${1 + ring * 0.17})` }} />
                )}
                {/* the `$` badge — ⛔ a bare symbol, never a price */}
                {bOff < 0.995 && (
                  <div style={{ position: "absolute", right: -14, top: -16,
                    width: 74, height: 74, borderRadius: 22, background: "#2B2F36",
                    border: "5px solid #454B55", boxShadow: SH, zIndex: 20,
                    transform: `translate(${bOff * 96}px, ${bOff * bOff * 210}px) rotate(${bOff * 128}deg)`,
                    opacity: 1 - E(f, a + 6, a + 11, 0, 1, LIN),
                    display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900,
                      fontSize: 42, color: "#F2F4F7", lineHeight: 1 }}>$</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ⭐ he knocks each price off and flinches as it goes */}
        <Sprite f={f} side="r" y={600} size={162}
          gaze={E(f, 4, 34, -0.30, 0.22, IO)} nod={5.6}
          shock={OPEN.reduce((s, a) => s + E(f, a, a + 4, 0, 0.46, OUT) - E(f, a + 4, a + 12, 0, 0.46, IO), 0)}
          cheer={E(f, 34, 50, 0, 0.85, OUT)} />
      </div>
    </Scene>
  );
};

/* ==================================================================== S1 ===
   1.83 -> 5.87s · 121f · "Number 1. This website lets you run ChatGPT, Claude,
   Gemini, Grok, and DeepSeek all in one place for free."

   ⭐⭐ THE VERB IS "RUN … ALL IN ONE PLACE", so the picture is five separate
      things CONVERGING into one — not five boxes sitting in a row.
      [[reference_animation_quality]] §3: five identical tiles carry ONE bit of
      information (there are five) and there is nothing to watch. Five marks
      travelling in from five different edges and DOCKING is the same
      information as an event.

   ⛔ ARRIVALS ARE SPREAD ACROSS THE FULL 121f, not front-loaded. A rebuild of
      one reel-104 scene put everything inside the first 34 of 70 frames and
      measured 5.94 — UNDER the 6.0 bar — despite being better in every other
      way. Docks here land f28 / f37 / f48 / f61 / f70, the row locks at f83
      and the receipt at f106.

   THE BACKGROUND PROCESS: arena.ai's REAL leaderboard, captured this build,
   scrolling continuously behind the whole scene.
   ========================================================================= */
export const S1: React.FC = () => {
  const f = useCurrentFrame();
  const p = PLACES.desk;
  const DOCK = [28, 37, 48, 61, 70];
  /* the five start points, one per edge of the frame — they converge inward */
  const FROM: [number, number][] = [[-260, 60], [1180, 20], [-240, 430], [1200, 400], [430, 690]];
  const ROW_Y = 300, ROW_X = 128, GAP = 152;
  const lock = E(f, 83, 96, 0, 1, OUT);
  const rec = E(f, 106, 118, 0, 1, OUT);
  const sk = DOCK.map((a) => shake(f, a, 5, 6));
  const kick = { x: sk.reduce((s, v) => s + v.x, 0), y: sk.reduce((s, v) => s + v.y, 0) };
  return (
    <Scene p={p} slug={`arena.ai · ${ARENA.models} MODELS · ${ARENA.date}`}
      push={[0, 121, 1.102]} vig={0.50}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1,
        transform: `translate(${kick.x}px, ${kick.y}px)` }}>
        <Desk p={p} f={f} lightX={0.44} />

        <Browser f={f} active={0} url="arena.ai" z={20}>
          {/* ⛔⛔⛔ THIS BEAT WAS A SCREEN RECORDING AND IT SHOULD NEVER HAVE BEEN.
              Alex: *"the animation at 2 seconds is not good enough, it doesn't
              keep attention, way too boring — I get that it's a screen
              recording but that part should be an animation related to our
              speaking."* He is right, and the craft doc's §3 test names the
              fault exactly: **write the VO line beside the shot and ask what
              the picture ADDS.** The line is "run ChatGPT, Claude, Gemini, Grok
              and DeepSeek ALL IN ONE PLACE" and the picture was a leaderboard
              scrolling — which shows a ranking, not a person RUNNING five
              models at once. The verb was going undrawn.

              ⭐⭐ SO THE PICTURE IS NOW ARENA'S ACTUAL MECHANISM: one question
              fires, and FIVE MODELS ANSWER SIMULTANEOUSLY, side by side, each
              column headed by that model's real mark and streaming at its own
              speed — which is a RACE, and a race holds attention by itself.
              Then on "all in one place" the five columns SLIDE TOGETHER and
              collapse into one window. The verb is the animation.
              ⛔ THE ANSWERS ARE BARS, NOT WORDS ([[feedback_graphical_over_textual]]):
              five columns of readable text would be ~30 text nodes in one shot,
              which is the exact overcorrection reel 104 made. */}
          {(() => {
            const OPENC = [28, 37, 48, 61, 70];      /* measured word onsets, lead-4 */
            const merge = E(f, 79, 92, 0, 1, IO);
            /* ⭐⭐ BIG COLOUR FIELDS, NOT CREAM BOXES. 176 wide against the old
               168, running the FULL viewport height above the download bar, so
               five saturated columns own the frame instead of floating in it. */
            const CW2 = 176, GAP2 = 10, X0 = 21, CY = 78, CH2 = 330;
            return (<>
              {/* the one prompt every column answers */}
              <div style={{ position: "absolute", left: 90, top: 14, width: 752, height: 46,
                zIndex: 30, borderRadius: 13, background: "#FFFFFF",
                border: "3px solid #DCD3BE", boxShadow: SH, overflow: "hidden",
                display: "flex", alignItems: "center", paddingLeft: 16 }}>
                <span style={{ fontFamily: MONO, fontSize: 21, color: "#2A2620", whiteSpace: "nowrap" }}>
                  {"ask all five at once".slice(0, Math.floor(E(f, 2, 16, 0, 20, LIN)))}
                </span>
                {E(f, 18, 26, 0, 1, LIN) > 0 && E(f, 18, 26, 0, 1, LIN) < 1 && (
                  <div style={{ position: "absolute", right: 12, width: 28, height: 28,
                    borderRadius: "50%", background: CLAY,
                    transform: `scale(${1 + E(f, 18, 26, 0, 1, OUT) * 0.7})`,
                    opacity: 1 - E(f, 18, 26, 0, 1, LIN) }} />
                )}
              </div>

              {MODELS.map((m, i) => {
                const o = OPENC[i];
                /* all five land EMPTY early so the five-at-once structure reads
                   before a word is spoken; each then LIGHTS on its own name */
                const arrive = E(f, 6 + i * 3, 16 + i * 3, 0, 1, BACK);
                const open = E(f, o - 8, o, 0, 1, OUT);
                if (arrive <= 0.001) return null;
                const pace = [1.0, 1.22, 0.88, 1.34, 1.10][i];
                const x0 = X0 + i * (CW2 + GAP2);
                const xm = X0 + 2 * (CW2 + GAP2);
                const x = x0 + (xm - x0) * merge;
                const rk = rock(f, o, 7, 22);
                /* ⛔ the colour IS the state: grey until that model answers,
                   then it floods to the model's real brand paint */
                /* ⛔⛔ THE SURVIVING COLUMN GOES NEUTRAL. v1 left the middle
                   column in Gemini purple, so the merge read as "GEMINI WON" —
                   which is not the line. The line is "all in ONE PLACE", so the
                   window that survives has to belong to the SITE, not to one of
                   the five: it fades to the house cream and the five marks ride
                   into it together. A merge that crowns a winner is a different
                   claim from a merge that consolidates. */
                const paint = open > 0.02 ? m.c : "#CFC7B6";
                return (
                  <div key={m.id} style={{ position: "absolute", left: x, top: CY + rk,
                    width: CW2, height: CH2, zIndex: 40 + i, borderRadius: 20,
                    background: paint, border: `4px solid ${dkh(paint, 0.22)}`,
                    boxShadow: SH,
                    opacity: Math.min(1, arrive * 1.6) * (i === 2 ? 1 : 1 - E(merge, 0.15, 0.72, 0, 1, IO)),
                    transform: `translateY(${(1 - arrive) * 40}px) scale(${(0.9 + arrive * 0.1) * (i === 2 ? 1 : 1 - merge * 0.14)})`,
                    overflow: "hidden" }}>
                    {/* the survivor fades to house cream so the merge reads as
                        ONE PLACE holding five, not as one model winning */}
                    {i === 2 && merge > 0.01 && (
                      <div style={{ position: "absolute", inset: 0, zIndex: 8,
                        background: hexa("#F4F0E6", merge) }} />
                    )}
                    {/* ⭐ THE LOGO IS THE HERO OF THE COLUMN, on its own white
                        tile at 3x the size it had as a header chip */}
                    <div style={{ position: "absolute", left: CW2 / 2 - 46, top: 18, zIndex: 12,
                      width: 92, height: 92, borderRadius: 22, background: "#FFFFFF",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      filter: open > 0.02 ? undefined : "grayscale(1)",
                      opacity: (0.5 + open * 0.5) * (i === 2 ? 1 - merge : 1) }}>
                      <Img src={staticFile(m.src)}
                        style={{ width: 92 * (1 - m.pad), height: 92 * (1 - m.pad), objectFit: "contain" }} />
                    </div>
                    <div style={{ position: "absolute", left: 0, top: 118, width: CW2,
                      textAlign: "center", fontFamily: inter.fontFamily, fontWeight: 900,
                      fontSize: 17, letterSpacing: "0.05em",
                      opacity: i === 2 ? 1 - merge : 1,
                      color: open > 0.02 ? "#FFFFFF" : "#8E8676" }}>{m.label}</div>

                    {/* waiting: three dots cycle until this model starts */}
                    {open < 0.02 && [0, 1, 2].map((d) => (
                      <div key={"w" + d} style={{ position: "absolute", left: CW2 / 2 - 27 + d * 22,
                        top: 200, width: 14, height: 14, borderRadius: "50%", background: "#EFEAE0",
                        opacity: 0.3 + 0.7 * Math.max(0, Math.sin((f / 5) - d * 0.9)) }} />
                    ))}
                    {/* the answer, as light bars over the brand colour */}
                    {Array.from({ length: 6 }, (_, r) => {
                      const t = E(f, o + 3 + r * 4.4 / pace, o + 9 + r * 4.4 / pace, 0, 1, OUT);
                      if (t <= 0.01) return null;
                      const wpc = [90, 74, 96, 62, 84, 68][r];
                      return <div key={r} style={{ position: "absolute", left: 14, top: 158 + r * 27, zIndex: 12,
                        width: `${wpc * t * 0.86}%`, height: 15, borderRadius: 8,
                        background: i === 2 && merge > 0.4
                          ? hexa("#B9AE97", r % 3 === 0 ? 0.95 : 0.6)
                          : hexa("#FFFFFF", r % 3 === 0 ? 0.92 : 0.58) }} />;
                    })}
                  </div>
                );
              })}

              {/* "ALL IN ONE PLACE" — the five collapse into one */}
              {merge > 0.35 && (
                <div style={{ position: "absolute", left: X0 + 2 * (CW2 + GAP2) - 7,
                  top: CY - 9, width: CW2 + 14, height: CH2 + 18, zIndex: 60,
                  borderRadius: 25, border: `5px solid ${CLAY}`,
                  opacity: E(merge, 0.35, 0.7, 0, 1, OUT) }} />
              )}
              {merge > 0.5 && MODELS.map((m, i) => (
                <div key={"mm" + m.id} style={{ position: "absolute",
                  left: X0 + 2 * (CW2 + GAP2) + 12 + i * 31, top: CY + CH2 - 46,
                  width: 32, height: 32, borderRadius: 9, background: "#FFF",
                  border: `2px solid ${dkh(m.c, 0.1)}`, zIndex: 70, boxShadow: SH,
                  transform: `scale(${E(merge, 0.5 + i * 0.06, 0.8 + i * 0.06, 0, 1, BACK)})`,
                  display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Img src={staticFile(m.src)}
                    style={{ width: 32 * (1 - m.pad), height: 32 * (1 - m.pad), objectFit: "contain" }} />
                </div>
              ))}
            </>);
          })()}
          <DownloadBar f={f} fill={fillsAt(55 + f)} z={90} />
        </Browser>

        {/* he tracks the marks in, then reacts when the row locks */}
        <Sprite f={f} side="r" gaze={E(f, 20, 70, -0.30, 0.22, IO)}
          shock={DOCK.reduce((a, d) => a + E(f, d, d + 4, 0, 0.34, OUT) - E(f, d + 4, d + 11, 0, 0.34, IO), 0)}
          cheer={E(f, 84, 96, 0, 0.62, OUT)} />
      </div>
    </Scene>
  );
};

/* ==================================================================== S2 ===
   5.87 -> 9.53s · 110f · "So stop paying hundreds in monthly subscription
   costs, but the next one is even better."

   ⛔⛔ NO INVENTED TOTAL. The VO's "hundreds" is not sourceable as a monthly
      figure, so nothing here adds up: no `$89/mo`, no `$521`, no counter. What
      IS true and is what actually hurts is the RECURRENCE — so the depiction is
      the same BILLED stamp landing on the same four cards, again, and again.
      [[feedback_graphical_over_textual]]: the information is "it keeps
      charging", and that is a stamp that will not stop, not a number.

   THE EVENT: before — four paid cards, quiet. trigger — the billing head sweeps
   across. travel — the stamp drops four times, and the stack buckles lower
   under each one. arrival — the whole stack is swept off left as tab two takes
   the window.
   ========================================================================= */
export const S2: React.FC = () => {
  const f = useCurrentFrame();
  const p = PLACES.bench;
  const STAMP = [12, 24, 36, 48];
  const sweep = E(f, 64, 88, 0, 1, IN_Q);           // the stack leaves left
  const tab2 = E(f, 72, 96, 0, 1, OUT);             // tab two slides in
  const head = E(f, 4, 56, 0, 1, LIN);              // the billing head crossing
  const sk = STAMP.map((a) => shake(f, a, 6, 6));
  const kick = { x: sk.reduce((s, v) => s + v.x, 0), y: sk.reduce((s, v) => s + v.y, 0) };
  return (
    <Scene p={p} slug="THE SAME CHARGE, EVERY MONTH" push={[0, 110, 1.068]} vig={0.54}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1,
        transform: `translate(${kick.x}px, ${kick.y}px)` }}>
        <Desk p={p} f={f} lightX={0.36} />

        <Browser f={f} active={tab2 > 0.5 ? 1 : 0} tabIn={[1, 1, 1]}
          url={tab2 > 0.5 ? "magnific.com" : "arena.ai"} z={20}>
          {/* the four paid cards */}
          {PAID.map((c, i) => {
            const bx = 96 + i * 190 - sweep * 1180;
            const sag = STAMP.slice(0, 4).reduce((s, a) => s + E(f, a, a + 8, 0, 9, OUT), 0);
            const rk = rock(f, STAMP[i], 5.0, 20);
            return (
              <div key={c.id} style={{ position: "absolute", left: bx, top: 96 + sag + rk,
                zIndex: 30 + i, width: 160, height: 226, borderRadius: 18,
                background: "#F3EEE2", border: "3px solid #DED2B8", boxShadow: SH,
                transform: `rotate(${rk * 0.4}deg)` }}>
                <div style={{ position: "absolute", left: 30, top: 26, width: 100, height: 100,
                  borderRadius: 22, background: "#FFF", border: "3px solid #E7DEC9",
                  display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Img src={staticFile(c.src)}
                    style={{ width: 100 * (1 - c.pad), height: 100 * (1 - c.pad), objectFit: "contain" }} />
                </div>
                {/* the recurring pill — the row of past charges stacking up */}
                {[0, 1, 2].map((r) => {
                  const on = STAMP[i] + 4 <= f ? 1 : 0;
                  return <div key={r} style={{ position: "absolute", left: 22, top: 148 + r * 22,
                    width: 116, height: 14, borderRadius: 7,
                    background: r === 0 && on ? RED : "#E2D8C2", opacity: r === 0 ? 1 : 0.55 - r * 0.16 }} />;
                })}
                <ChargeStamp x={22} y={140} k={E(f, STAMP[i], STAMP[i] + 22, 0, 1, LIN)} z={60} s={0.92} />
              </div>
            );
          })}

          {/* the billing head — the background process, crossing the whole width */}
          {sweep < 0.9 && (
            <div style={{ position: "absolute", left: -60 + head * (BR.w + 60), top: 0,
              width: 60, height: 484, zIndex: 20,
              background: `linear-gradient(90deg, transparent, ${hexa(RED, 0.20)}, transparent)` }} />
          )}

          {/* tab two arriving — the real Magnific capture wiping in from the right */}
          {tab2 > 0.01 && (
            <div style={{ position: "absolute", left: (1 - tab2) * BR.w, top: 0, width: BR.w,
              height: 484, zIndex: 46, overflow: "hidden", background: "#0C0B0E" }}>
              <Shot src="shots/mag_video.png" w={BR.w} scroll={120} o={1} z={2} />
            </div>
          )}
          <DownloadBar f={f} fill={fillsAt(176 + f)} z={90} />
        </Browser>
        {/* ⭐ the charges land ON him — he is who is being billed */}
        <Sprite f={f} side="l" stern={0.5}
          shock={STAMP.reduce((a, d) => a + E(f, d, d + 4, 0, 0.5, OUT) - E(f, d + 4, d + 12, 0, 0.5, IO), 0)}
          gaze={-0.12} nod={3.2} />
      </div>
    </Scene>
  );
};

/* ==================================================================== S3 ===
   9.53 -> 11.33s · 54f · "Number 2. A free AI video generator."
   THE EVENT: tab two takes the window, the REAL capture settles, and a play
   head lands on it and pulses once.
   ⛔ NO PRICE PLATE IN THIS BEAT OR THE NEXT TWO. Magnific/Freepik video is
      CREDIT-METERED (Sora 2 Pro is quoted at 450 credits/sec on their own
      page), so "free" stays in the audio where Alex said it and the frame
      shows only the mechanism, which is true. Same rule that governed reel
      104's find-skills line and reel 99's GPT-5 line.
   ========================================================================= */
export const S3: React.FC = () => {
  const f = useCurrentFrame();
  const p = PLACES.bench;
  const settle = E(f, 0, 18, 0, 1, OUT);
  const play = E(f, 30, 40, 0, 1, BACK);
  const pulse = 1 + E(f, 40, 46, 0, 1, OUT) * 0.14 - E(f, 46, 54, 0, 1, IO) * 0.14;
  const sk = shake(f, 34, 7, 8);
  return (
    <Scene p={p} slug="magnific.com · FORMERLY FREEPIK" push={[0, 54, 1.056]} vig={0.52}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1,
        transform: `translate(${sk.x}px, ${sk.y}px)` }}>
        <Desk p={p} f={f} lightX={0.52} />
        <Browser f={f} active={1} url="magnific.com/ai/video-generator" z={20}>
          <Shot src="shots/mag_video.png" w={BR.w} scroll={120 - settle * 26} o={1} z={4} />
          {/* the play head — one large bright object arriving, then rocking */}
          <div style={{ position: "absolute", left: BR.w / 2 - 74, top: 176 + rock(f, 34, 7, 22),
            zIndex: 40, width: 148, height: 148, borderRadius: "50%",
            background: hexa("#F7F3E9", 0.95), border: "5px solid #E3D8BE", boxShadow: SH,
            transform: `scale(${play * pulse})`, display: "flex", alignItems: "center",
            justifyContent: "center" }}>
            <div style={{ width: 0, height: 0, marginLeft: 14,
              borderTop: "34px solid transparent", borderBottom: "34px solid transparent",
              borderLeft: `54px solid ${CLAY}` }} />
          </div>
          <DownloadBar f={f} fill={fillsAt(286 + f)} z={90} />
        </Browser>
        {/* he presents the new tab, then reacts to the play head landing */}
        <Sprite f={f} side="r" gaze={0.18} cheer={E(f, 34, 46, 0, 0.7, OUT)}
          shock={E(f, 30, 35, 0, 0.4, OUT) - E(f, 35, 44, 0, 0.4, IO)} nod={5.0} />
      </div>
      <Flash lf={f} at={0} n={7} o={0.18} />
    </Scene>
  );
};

/* ==================================================================== S4 ===
   11.33 -> 13.73s · 72f · "It has tools like Kling, Sora, and Seedance fully
   built in."

   ⭐⭐ THE FULL-WIDTH TRAVELLING BAND IS THE STRONGEST OBJECT IN THE HOUSE
      MOTION TABLE — measured 10.44 against a neighbour's 2.83 at identical
      push, versus +0.11 for a bar filling and NEGATIVE for a blur sweep. And
      here it does not have to be invented: Magnific's own page carries a model
      row, so `shots/mag_models.png` IS the band, captured live this build.

   ⛔ THE VERB IS "BUILT **IN**", so the three the VO names are lifted OUT of
      the band and SEATED INSIDE one box. Marks are the parents' real ones —
      Kling has no distributable mark, so Kuaishou's is used, and Sora's is
      OpenAI's, per the precedent HANDOFF-93 set.
   ========================================================================= */
export const S4: React.FC = () => {
  const f = useCurrentFrame();
  const p = PLACES.bench;
  const SEAT = [20, 32, 44];
  /* ⛔⛔ THE BAND USED TO BE GONE BEFORE THE SEATING EVEN STARTED. v1 ran it
     932 -> -1180 across frames 0..34 of a 72-frame scene, so the strongest
     motion object in the house table (10.44 vs 2.83 at identical push) was off
     screen for the second half of its own scene and the engines detached from
     nothing. It now crosses across 0..64 and never fully exits, so the travel
     is still happening underneath every seat. */
  const band = E(f, 0, 64, 0, 1, LIN);
  const BAND_X = BR.w - band * (BR.w + 260);       // 932 -> -260, still on screen
  const BAND_Y = 40, BAND_H = 96;
  const open = E(f, 6, 20, 0, 1, OUT);
  const close = E(f, 52, 64, 0, 1, OUT);
  const sk = SEAT.map((a) => shake(f, a, 6, 6));
  const kick = { x: sk.reduce((s, v) => s + v.x, 0), y: sk.reduce((s, v) => s + v.y, 0) };
  const BOX = { x: 186, y: 176, w: 560, h: 214 };
  return (
    <Scene p={p} slug="KLING · SORA · SEEDANCE, ONE WINDOW" push={[0, 72, 1.082]} vig={0.52}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1,
        transform: `translate(${kick.x}px, ${kick.y}px)` }}>
        <Desk p={p} f={f} lightX={0.48} />
        <Browser f={f} active={1} url="magnific.com/ai/video-generator" z={20}>
          <Shot src="shots/mag_video.png" w={BR.w} scroll={94} o={0.20} z={3} />

          {/* ---- THE REAL MODEL BAND, travelling the full width, all scene --- */}
          <div style={{ position: "absolute", left: BAND_X, top: BAND_Y,
            width: 1180, height: BAND_H, zIndex: 26, borderRadius: 14, overflow: "hidden",
            background: "#17161B", border: "3px solid #35333C", boxShadow: SH }}>
            <Img src={staticFile("shots/mag_models.png")}
              style={{ width: 1180, height: BAND_H, objectFit: "cover" }} />
          </div>

          <EngineBox x={BOX.x} y={BOX.y} w={BOX.w} h={BOX.h} open={open} z={30} />

          {/* ⭐ THE THREE NAMED ENGINES DETACH FROM THE BAND ITSELF, at the x the
              band actually occupies on the frame they leave — so the lift reads
              as coming OUT of the row rather than appearing near it. */}
          {ENGINES.map((e, i) => {
            const a = SEAT[i];
            const k = E(f, a - 15, a, 0, 1, IN_Q);
            const detach = E(f, a - 15, a - 15, 0, 1, LIN);       // freeze x at lift-off
            const bandXat = BR.w - E(a - 15, 0, 64, 0, 1, LIN) * (BR.w + 260);
            const sx = Math.max(40, Math.min(BR.w - 150, bandXat + 210 + i * 300));
            const sy = BAND_Y + 4;
            const tx = BOX.x + 30 + i * (BOX.w - 60) / 3, ty = BOX.y + 80;
            const rk = rock(f, a, 6.5, 22);
            /* an arc, not a straight line — it lifts before it drops in */
            const arc = Math.sin(k * Math.PI) * -46;
            return (
              <ModelTile key={e.id} src={e.src} pad={e.pad} s={104} label={e.label} z={52 + i}
                x={sx + (tx - sx) * k} y={sy + (ty - sy) * k + arc + rk}
                rot={(1 - k) * (i % 2 ? 18 : -18) + rk * 0.3} />
            );
          })}

          {/* the box latching shut once all three are in */}
          {close > 0.01 && (
            <div style={{ position: "absolute", left: BOX.x, top: BOX.y + BOX.h - 10,
              width: BOX.w * close, height: 10, zIndex: 60, borderRadius: 5, background: GREEN }} />
          )}
          <DownloadBar f={f} fill={fillsAt(340 + f)} z={90} />
        </Browser>
        {/* he counts the three in as they seat */}
        <Sprite f={f} side="l" gaze={E(f, 6, 46, -0.26, 0.20, IO)}
          shock={SEAT.reduce((a, d) => a + E(f, d, d + 4, 0, 0.34, OUT) - E(f, d + 4, d + 11, 0, 0.34, IO), 0)}
          cheer={E(f, 54, 66, 0, 0.6, OUT)} />
      </div>
    </Scene>
  );
};

/* ==================================================================== S5 ===
   13.73 -> 15.67s · 58f · "Just drop in a prompt and get a video on the spot."
   THE EVENT: an empty prompt box -> a line types -> a render bar sweeps the
   full width -> a REAL generated frame lands and rocks.
   ⛔ ONE TEXT CHIP THIS SHOT — the prompt line. Nothing else is typeset.
   ========================================================================= */
export const S5: React.FC = () => {
  const f = useCurrentFrame();
  const p = PLACES.bench;
  /* ⛔⛔ COMPRESSED. v1 typed for 22f and swept a render bar for 18 more before
     the clip existed, leaving it 18 frames of screen time — 0.6s for the beat
     the whole scene is about. The build-up is furniture; the OUTPUT is the
     point, so the prompt types in 12 and renders in 8, and the clip owns the
     remaining 36 frames. */
  const type = E(f, 0, 12, 0, 1, LIN);
  const render = E(f, 12, 20, 0, 1, IO);
  const land = E(f, 20, 28, 0, 1, BACK);
  const sk = shake(f, 20, 8, 8);
  return (
    <Scene p={p} slug="TEXT TO VIDEO" push={[0, 58, 1.060]} vig={0.52}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1,
        transform: `translate(${sk.x}px, ${sk.y}px)` }}>
        <Desk p={p} f={f} lightX={0.46} />
        <Browser f={f} active={1} url="magnific.com/ai/video-generator" z={20}>
          {/* the page itself keeps moving under the prompt — ⛔ one hero doing
              one gesture is a dead shot, every frame needs a background process */}
          <Shot src="shots/mag_scroll1.png" w={BR.w} scroll={520 - f * 3.2} o={0.24} z={3} />
          {/* render tiles streaming across while the clip is being made */}
          {Array.from({ length: 9 }, (_, i) => {
            const xx = ((f * 13 + i * 118) % 1060) - 120;
            return <div key={i} style={{ position: "absolute", left: xx, top: 200 + (i % 3) * 92,
              width: 86, height: 58, zIndex: 5, borderRadius: 8,
              background: hexa("#C6B99B", 0.30), border: `2px solid ${hexa("#A89778", 0.30)}` }} />;
          })}

          <PromptBar x={96} y={44} w={740} text="a cinematic city flythrough at dusk"
            k={type} z={40} />
          <RenderSweep x={96} y={126} w={740} k={render} z={40} />

          {/* the clip previews in-window, then breaks out below */}
          <div style={{ position: "absolute", left: 176,
            top: 140 + (1 - land) * 300 + rock(f, 20, 10, 24),
            width: 580, height: 252, zIndex: 50, borderRadius: 16, overflow: "hidden",
            border: "4px solid #E4DCC8", boxShadow: SH,
            transform: `scale(${0.78 + land * 0.22})`, transformOrigin: "50% 40%",
            opacity: Math.min(1, land * 1.8) }}>
            <Img src={staticFile("shots/mag_scroll1.png")}
              style={{ position: "absolute", left: -840, top: -700, width: 1560 }} />
          </div>
          <DownloadBar f={f} fill={fillsAt(412 + f)} z={90} />
        </Browser>

        {/* ⭐ he TYPES it — nodding fast while the prompt goes in, then reacts
            to the clip landing. He is the one doing the thing the VO describes. */}
        <Sprite f={f} side="r" gaze={E(f, 0, 30, -0.20, 0.16, IO)}
          nod={type < 1 ? 8.2 : 4.4}
          cheer={E(f, 42, 54, 0, 0.85, OUT)}
          shock={E(f, 40, 45, 0, 0.42, OUT) - E(f, 45, 54, 0, 0.42, IO)} />
      </div>
    </Scene>
  );
};

/* ==================================================================== S6 ===
   15.67 -> 18.20s · 76f · "Number 3. Free AI image generation with insane
   quality and realism…"

   ⭐ "INSANE QUALITY AND REALISM" IS DEPICTED BY THE RESOLVE, NOT TYPESET.
      [[feedback_graphical_over_textual]]: a number MOVES to its value and is
      never written at it; the same applies to an adjective. Nothing on screen
      says the word "quality" — the viewer watches a coarse mosaic sharpen into
      Google's own real Nano Banana output and reaches the adjective themselves.
   ========================================================================= */
export const S6: React.FC = () => {
  const f = useCurrentFrame();
  const p = PLACES.studio;
  const tab3 = E(f, 0, 14, 0, 1, OUT);
  /* ⛔ v1 ran the resolve 0 -> 1 across f14..66 from a STANDING START, so the
     first half-second of the scene was a flat grey slab that read as a broken
     image and measured 6.30. It now begins already part-resolved and finishes
     sooner, so there is never a static grey frame and the sharpening is the
     fastest-changing thing on screen for most of the scene. */
  const res = E(f, 4, 58, 0.22, 1, IO);
  const sk = shake(f, 2, 6, 7);
  /* ⛔ THE CANVAS MUST FIT THE 484px VIEWPORT. It is drawn at MY-44 .. MY+MH+26,
     so MY=76 / MH=340 puts it at y 32..442 — inside, with the push's end-of-
     scene crop accounted for. A canvas taller than the window clips at the
     bottom only in the LAST frames of the shot, which is exactly the class of
     bug that survives a frame-0 check (ANIMATION-QUALITY §6.4). */
  const MX = 196, MY = 64, MW = 540, MH = 300;
  return (
    <Scene p={p} slug="aistudio.google.com · NANO BANANA" push={[0, 76, 1.098]} vig={0.52}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1,
        transform: `translate(${sk.x}px, ${sk.y}px)` }}>
        <Desk p={p} f={f} lightX={0.58} />
        <Browser f={f} active={2} url="aistudio.google.com" z={20}>
          {/* ⛔ THE BACKDROP WAS FIGHTING THE HERO. AI Studio's public page is a
              DARK marketing hero with 60px white type, and at 0.26 opacity its
              headline sat half-covered behind the mosaic and read as a render
              bug. It is now dimmed to a texture and the canvas below is opaque,
              so nothing bleeds through the thing the scene is actually about. */}
          <Shot src="shots/ais_scroll0.png" w={BR.w} scroll={40 + f * 3.4} o={0.13 * tab3} z={3} />
          {/* ⛔⛔ THE OPAQUE CANVAS FIXED THE LEGIBILITY AND COST 0.41 OF MOTION
              (6.70 -> 6.29) — it covered the only thing that had been moving.
              That is the same trap [[plugin-reel]] logged when swapping a list
              for a bar dropped a second 8.4 -> 6.9: **re-audit the WINDOW you
              changed, not the reel median.** The motion comes back on the
              canvas's own terms — generation tiles streaming down BOTH margins,
              which is what an image model working actually looks like. */}
          {Array.from({ length: 14 }, (_, i) => {
            const side = i % 2 === 0;
            const yy = ((f * 8 + i * 74) % 600) - 60;
            return <div key={i} style={{ position: "absolute",
              left: side ? 22 : BR.w - 152, top: yy, width: 130, height: 54, zIndex: 8,
              borderRadius: 10, background: hexa("#B9C6D8", 0.34),
              border: `2px solid ${hexa("#8FA0B8", 0.34)}` }} />;
          })}
          {/* the generator canvas — an opaque card the image is made ON */}
          <div style={{ position: "absolute", left: MX - 26, top: MY - 44, width: MW + 52,
            height: MH + 70, zIndex: 20, borderRadius: 20, background: "#F6F2E8",
            border: "4px solid #E0D6BE", boxShadow: SH }} />
          {/* the generate press, running as background process */}
          <RenderSweep x={MX} y={MY - 28} w={MW} k={E(f, 6, 54, 0, 1, LIN)} z={30} />
          <Mosaic x={MX} y={MY} w={MW} h={MH} k={res} src="shots/nb_out.png" z={40}
            cols={16} rows={11} />
          {/* ⭐ THE RESOLVING FRONT — a bright vertical edge riding the boundary
              between sharp and coarse. It is what makes the sharpening READ as
              an event with a direction instead of a slow global crossfade. */}
          {res < 0.99 && (
            <div style={{ position: "absolute", left: MX + MW * Math.min(1, res * 1.34) - 5,
              top: MY, width: 10, height: MH, zIndex: 46, borderRadius: 5,
              background: hexa("#FFF6E2", 0.85) }} />
          )}
          <DownloadBar f={f} fill={fillsAt(470 + f)} z={90} />
        </Browser>

        {/* he leans in on the resolve and reacts when it goes sharp */}
        <Sprite f={f} side="l" gaze={0.22} nod={5.2}
          cheer={E(f, 58, 72, 0, 0.9, OUT)} />
      </div>
      <Flash lf={f} at={0} n={7} o={0.18} />
    </Scene>
  );
};

/* ==================================================================== S7 ===
   18.20 -> 20.13s · 58f · "…that goes toe to toe with paid tools."

   ⛔⛔ THE HONESTY BEAT. "Toe to toe" is LEVEL, not better. Both bars rise
      together and stop at exactly the same height, and the tie bar locks
      across them. The free bar does not pass the paid one in any frame, at any
      k — see LevelBars, where a single `hh` drives both columns so it is not
      possible for them to diverge.
   ========================================================================= */
export const S7: React.FC = () => {
  const f = useCurrentFrame();
  const p = PLACES.studio;
  const k = E(f, 4, 48, 0, 1, OUT);
  const sk = shake(f, 36, 6, 8);
  return (
    <Scene p={p} slug="LEVEL WITH THE PAID ONES" push={[0, 58, 1.058]} vig={0.54}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1,
        transform: `translate(${sk.x}px, ${sk.y}px)` }}>
        <Desk p={p} f={f} lightX={0.50} />
        <Browser f={f} active={2} url="aistudio.google.com" z={20}>
          {/* ⛔⛔ ROUND 2, AND THIS SCENE WAS THE WORST THING IN THE REEL. Alex:
              *"at 19 seconds the images are miscropped and bad, not interesting
              enough."* Both were true and the cause was the same mistake twice:
              the two cards positioned their images by HAND, with negative
              offsets (`left:-180 top:-120 width:700`) tuned against an EARLIER
              crop of nb_out.png. When that file was re-cropped 1900x1180 ->
              1880x560 the offsets were never re-derived, so the left card
              showed a sliver of dog over a white gap and the right card showed
              an unreadable brown blob of a seat back.
              ⭐ THE FIX IS STRUCTURAL, NOT NEW NUMBERS: both cards now use
              `objectFit: cover` on a sized box, so a re-crop of the source can
              never miscrop the shot again. Hand-placed negative offsets are
              banned in this file.

              ⛔ AND THE RIGHT CARD IS NO LONGER A FAKE. It used to be a frame
              of Magnific's showreel standing in for "a paid tool", which is
              both dishonest and meaningless. It is now the SAME real Nano
              Banana output carrying a price pill: identical picture, one of
              them charges. That IS the claim "toe to toe", drawn literally. */}
          {[0, 1].map((i) => {
            const kk = E(f, 2 + i * 5, 20 + i * 5, 0, 1, OUT);
            const fromX = i === 0 ? -300 : 300;
            const X = i === 0 ? 96 : 508, Y = 30, WI = 328, HI = 214;
            return (
              <div key={i} style={{ position: "absolute", left: X + fromX * (1 - kk),
                top: Y + rock(f, 20 + i * 5, 7, 22), width: WI, height: HI, zIndex: 24 + i,
                borderRadius: 16, overflow: "hidden", boxShadow: SH,
                border: `5px solid ${i === 0 ? GREEN : "#7C8794"}`, opacity: Math.min(1, kk * 1.6) }}>
                <Img src={staticFile("shots/nb_out.png")}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                {/* the price pill is the ONLY difference between the two */}
                {i === 1 && (
                  <div style={{ position: "absolute", right: 12, top: 12, padding: "7px 15px",
                    borderRadius: 13, background: "#2E333A", border: "3px solid #4A5058" }}>
                    <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 21,
                      letterSpacing: "0.08em", color: "#F2F4F7" }}>PAID</span>
                  </div>
                )}
                {i === 0 && (
                  <div style={{ position: "absolute", right: 12, top: 12, padding: "7px 15px",
                    borderRadius: 13, background: GREEN, border: `3px solid ${dkh(GREEN, 0.22)}` }}>
                    <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 21,
                      letterSpacing: "0.08em", color: "#FFFFFF" }}>FREE</span>
                  </div>
                )}
              </div>
            );
          })}
          {/* the equals sign that lands between them when the bars lock level */}
          {E(f, 30, 40, 0, 1, BACK) > 0.01 && (
            <div style={{ position: "absolute", left: 442, top: 104, zIndex: 40,
              transform: `scale(${E(f, 30, 40, 0, 1, BACK)})` }}>
              {[0, 1].map((r) => (
                <div key={r} style={{ width: 48, height: 12, borderRadius: 6, marginBottom: 12,
                  background: GOLD, boxShadow: SH }} />
              ))}
            </div>
          )}
          <LevelBars x={286} y={246} w={360} h={124} k={k} z={60} />
          <DownloadBar f={f} fill={fillsAt(546 + f)} z={90} />
        </Browser>
        {/* he stands between the two and shrugs — they are the same picture */}
        <Sprite f={f} side="r" gaze={E(f, 4, 40, -0.24, 0.20, IO)}
          cheer={E(f, 40, 52, 0, 0.75, OUT)} nod={5.0} />
      </div>
    </Scene>
  );
};

/* ==================================================================== S8 ===
   20.13 -> 22.07s · 58f · CTA
   "Follow and comment FREE and I'll send you all the links."
   ⛔ THE REEL HARD-CUTS ON THE LAST WORD (662f = 22.067s, measured off the 10ms
      RMS envelope: the final `-ly` of "links." is still sounding at 22.06s and
      is under -40 dB by 22.07s). Nothing here may ring past that.
   ========================================================================= */
export const S8Cta: React.FC = () => {
  const f = useCurrentFrame();
  const p = PLACES.desk;
  /* ⛔⛔ v1 MEASURED 4.87 AND THE AUDIT CALLED IT STATIC. Two causes, both real:
     the three link cards fanned at f24/30/36 of a 58-frame scene so the last
     one was still arriving as the reel hard-cut, and once landed nothing else
     in the frame moved. The fan now starts at f10 and finishes by f34, every
     card TRAVELS in from off-frame instead of fading up on the spot, and the
     scene keeps a background process running underneath for its whole length. */
  const FAN = [10, 17, 24];
  const stamp = E(f, 12, 21, 0, 1, BACK);
  const sk = shake(f, 12, 9, 9);
  return (
    <Scene p={p} slug="COMMENT FREE" push={[0, 58, 1.072]} vig={0.46}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1,
        transform: `translate(${sk.x}px, ${sk.y}px)` }}>
        <Desk p={p} f={f} lightX={0.44} />
        <Browser f={f} active={2} tabIn={[1, 1, 1]} url="comment: FREE" z={20}>
          {/* ⭐ THREE COLOUR LANES, one per site, travelling at different speeds
              with the real marks riding them. ⛔ TRIMMED TO TWO ROWS AND LIFTED:
              once the download bar became the CTA's payoff, a third lane sat
              directly behind it and the bottom of the frame turned to noise —
              the payoff has to be the clearest thing in the shot, not the
              busiest. */}
          {TABS.slice(0, 2).map((t, lane) => {
            const speed = [13, 17][lane];
            const yy = 268 + lane * 54;   /* between the cards and the download bar */
            return (
              <div key={t.id} style={{ position: "absolute", left: 0, top: yy, width: BR.w,
                /* ⛔ 0.16 alpha over a white page read as near-white — the lanes
                   were invisible as COLOUR, which is the only job they have */
                height: 46, zIndex: 4, background: hexa(t.tint, 0.34), overflow: "hidden" }}>
                {Array.from({ length: 7 }, (_, i) => {
                  const xx = ((f * speed + i * 190) % 1300) - 180;
                  return (
                    <div key={i} style={{ position: "absolute", left: xx, top: 4, width: 148,
                      height: 38, borderRadius: 10, overflow: "hidden",
                      background: t.dark ? hexa("#17161B", 0.55) : hexa("#FFFFFF", 0.72),
                      display: "flex", alignItems: "center", justifyContent: "center",
                      padding: 8 }}>
                      {/* ⛔ icons, not wordmarks — same colour fix as the cards */}
                      <Img src={staticFile(t.icon)}
                        style={{ width: 30, height: 30, objectFit: "contain", borderRadius: 7,
                          opacity: 0.85 }} />
                    </div>
                  );
                })}
              </div>
            );
          })}
          {/* the keyword stamping into the comment field */}
          <div style={{ position: "absolute", left: 236, top: 22, width: 460, height: 84,
            zIndex: 40, borderRadius: 18, background: "#FFFFFF", border: "4px solid #E0D5BB",
            boxShadow: SH, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 66,
              letterSpacing: "0.04em", color: CLAY,
              transform: `scale(${stamp})`, display: "inline-block" }}>FREE</span>
          </div>
          {/* three link cards, one per tab, each with its REAL wordmark. They
              TRAVEL in from below-left / below / below-right and rock on
              landing — ⛔ nothing in a reel lands and simply stops. */}
          {TABS.map((t, i) => {
            const k = E(f, FAN[i], FAN[i] + 13, 0, 1, OUT);
            const rk = rock(f, FAN[i] + 13, 5.5, 22);
            return (
              <div key={t.id} style={{ position: "absolute",
                left: (i - 1) * 190 * (1 - k), top: rk, zIndex: 60 + i }}>
                <LinkCard t={t} x={62 + i * 300} y={112} k={k} rot={(i - 1) * 3.5} z={1} />
              </div>
            );
          })}
          <DownloadBar f={f} fill={fillsAt(604 + f)} z={90} />
        </Browser>

        <Cam z={44}>
          <div style={{ position: "absolute", left: 792, top: 574 }}>
            <Mascot lf={f} size={196} gaze={0.1} nodAmp={5.6} nodSpeed={12}
              cheer={E(f, 14, 26, 0, 1.0, OUT)} />
          </div>
        </Cam>
      </div>
    </Scene>
  );
};
