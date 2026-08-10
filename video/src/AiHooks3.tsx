import React from "react";
import { AbsoluteFill, useCurrentFrame, Img, Audio, staticFile } from "remotion";
import { inter } from "./fonts";
import { Bg, Panel, ProgressBar, HookHeader, KaraokeCaption, AssemblyCtx, Mascot, hexA } from "./SlopKit";
import WORDS from "./data/words_ai.json";
import { PAPER, PAPER2, INKD, RED, GO, GO_L, AMB, AMB_L, AMB_D, SH, SH_S, mix } from "./CancelWorld";
import { SfxTrack, LEVELS, layer, repeat, db, type Cue } from "./SoundKit";
import { E, rnd, OUT, IO, BACK } from "./MissionWorld";

/* =========================================================================
   REEL 89 "AI" · HOOK SET 3.

   ⛔ Two sets rejected. Set 1: "way too much text, horrible ideas, I need
   completely different backgrounds." Set 2: "needs to be more hierarchical,
   interesting, and more obvious about what we are talking about topically so
   our target audience doesn't scroll."

   Set 2's worlds were genuinely different and genuinely wordless — and a
   whiteboard, a shredder and a library say NOTHING about Claude to a Claude
   user. The topic had to be inferred from a metaphor, which is the same
   failure reel 86's rituals hit.

   So this set stops guessing at feel and applies the pattern that reviewer
   actually approved on reel 86 (THE FLIP), transposed:

     OBVIOUS        the REAL surface is the set. A Claude conversation window
                    at hero size, that the target audience recognises in under
                    a second without a label.
     HIERARCHICAL   a visible RANK every time — a receding stack, a calibrated
                    dial, a flight of steps, a queue — plus ONE figure at 130px+
                    so there is a single thing the eye lands on.
     INTERESTING    each rank lives in its own PLACE (the note from set 2 that
                    was right and is kept), and each has one physical event.
     TEXT           the header, one figure, and the chat window's own chrome.
                    No chips, no badges, no sentences.
   ========================================================================= */

export const AI3_LEN = 146;
export const AI3_CUTS = [38, 76, 112];
const HEAD = { big: "CLAUDE FORGETS", hot: "EVERY CHAT" };
const W = 1012, H = 792;
const CLAUDE = "claude_logo.png";
const NBLM = "logos/notebooklm.svg";

const Vo: React.FC = () =>
  React.useContext(AssemblyCtx) ? null : (
    <Audio src={staticFile("ai_vo_final.wav")} endAt={AI3_LEN} />
  );
const Cap: React.FC = () =>
  React.useContext(AssemblyCtx) ? null : <KaraokeCaption words={WORDS as any} />;

const Cl: React.FC<{
  f: number; x: number; y: number; size?: number; z?: number; gaze?: number; shock?: number;
  cheer?: number; stern?: number; nodAmp?: number; nodSpeed?: number; flip?: boolean;
}> = ({ f, x, y, size = 140, z = 34, gaze = 0, shock = 0, cheer = 0, stern = 0,
        nodAmp = 3, nodSpeed = 10, flip = false }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    transform: `scaleX(${flip ? -1 : 1})`, transformOrigin: "50% 90%",
    filter: `drop-shadow(0 ${Math.round(size * 0.05)}px ${Math.round(size * 0.07)}px rgba(6,9,14,0.5))` }}>
    <Mascot lf={f} size={size} gaze={gaze} shock={shock} cheer={cheer} stern={stern}
            nodAmp={nodAmp} nodSpeed={nodSpeed} />
  </div>
);

const Shot: React.FC<{ f: number; a: number; b: number; k?: number; slamAt?: number; children: React.ReactNode }> =
  ({ f, a, b, k = 0, slamAt, children }) => {
  if (f < a || f >= b) return null;
  const t = Math.min(1, (f - a) / 30), e = t * t * (3 - 2 * t);
  const z = [1.05 - e * 0.04, 1.02 + e * 0.05, 1.06 - e * 0.05, 1.02 + e * 0.04][k % 4];
  let dx = 0, dy = 0;
  if (slamAt !== undefined) {
    const k2 = f - slamAt;
    if (k2 >= 0 && k2 < 12) {
      const d = Math.pow(1 - k2 / 12, 2);
      dx = Math.sin(k2 * 2.3) * 16 * d; dy = Math.cos(k2 * 1.9) * 12 * d;
    }
  }
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden",
      transform: `scale(${z}) translate(${dx}px, ${dy}px)`, transformOrigin: "50% 54%" }}>
      {children}
      {slamAt !== undefined && f >= slamAt && f < slamAt + 3 && (
        <div style={{ position: "absolute", inset: 0, background: "#FFEBC2",
          opacity: (1 - (f - slamAt) / 3) * 0.2, zIndex: 58 }} />
      )}
    </div>
  );
};

const Flash: React.FC<{ f: number }> = ({ f }) => (<>
  {AI3_CUTS.map((cf) => {
    const k = f - cf;
    if (k < 0 || k > 2) return null;
    return <div key={cf} style={{ position: "absolute", inset: 0, background: "#FFF6E2",
      opacity: (1 - k / 2) * 0.26, zIndex: 60 }} />;
  })}
</>);

/* ==================================================== the recognisable thing ==
   A Claude conversation, drawn as itself: the mark, a thread title, a user
   turn and an assistant turn. `empty` strips the turns back to a blank thread,
   which is the state the whole reel is about.
   ========================================================================= */
/* ⛔ "how do we make it clearer we are talking about Claude and not some random
   animation?" — because the only Claude signal was a 24px favicon in a title
   bar, which is ~5px on a phone. The repo already has the answer in
   ClaudeEraseReel: the mark AND THE WORDMARK AND a model pill, in claude.ai's
   own colours. Rebuilt to that convention and scaled so it survives the feed:

     · claude.ai's actual surface — APP_BG cream, APP_LINE warm border,
       CO #C96442 for the accent, not a generic grey window
     · the mark at 44px and the WORDMARK "Claude" at 40px in the app bar
     · a model pill, which is a thing only a Claude user reads as familiar
     · the empty state is claude.ai's own new-chat screen: the big sunburst
       centred over a composer, which is exactly what you stare at when a
       session starts from nothing — the subject of the whole reel
   ========================================================================= */
const Chat: React.FC<{
  x: number; y: number; w: number; h: number; s?: number; title: string;
  empty?: boolean; lit?: number; z?: number;
}> = ({ x, y, w, h, s = 1, title, empty = false, lit = 0, z = 24 }) => {
  const on = lit > 0.5;
  return (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
    borderRadius: 16 * s, background: on ? "#FAF9F5" : "#E8E5DE",
    border: `${2 * s}px solid ${on ? "#EAE6DC" : "#D8D4CB"}`,
    boxShadow: SH, overflow: "hidden", fontFamily: inter.fontFamily,
    filter: on ? "none" : "saturate(0.45)" }}>
    {/* the app bar: mark + WORDMARK + model. This is the identification. */}
    <div style={{ position: "absolute", left: 0, top: 0, width: w, height: 62 * s,
      background: on ? "#F2EFE7" : "#DFDBD2", borderBottom: `${2 * s}px solid #EAE6DC`,
      display: "flex", alignItems: "center", gap: 10 * s, padding: `0 ${14 * s}px` }}>
      <Img src={staticFile(CLAUDE)} style={{ width: 44 * s, height: 44 * s, objectFit: "contain",
        filter: on ? "none" : "grayscale(0.55) opacity(0.8)" }} />
      <span style={{ fontWeight: 900, fontSize: 40 * s, letterSpacing: "-0.02em",
        color: on ? "#2B2824" : "#8C877D" }}>Claude</span>
      <span style={{ marginLeft: "auto", padding: `${4 * s}px ${11 * s}px`, borderRadius: 999,
        border: `${2 * s}px solid #EAE6DC`, background: on ? "#FAF9F5" : "#E4E0D7",
        fontWeight: 800, fontSize: 17 * s, color: "#8C877D", whiteSpace: "nowrap" }}>Sonnet 5</span>
    </div>
    {/* the thread name, in claude.ai's own muted ink */}
    <div style={{ position: "absolute", left: 14 * s, top: 72 * s, fontWeight: 800,
      fontSize: 19 * s, color: on ? "#8C877D" : "#A9A49A" }}>{title}</div>
    {empty ? (<>
      {/* claude.ai's new-chat state: the sunburst, big, over an empty composer */}
      <Img src={staticFile(CLAUDE)} style={{ position: "absolute", left: w / 2 - 55 * s,
        top: h / 2 - 78 * s, width: 110 * s, height: 110 * s, objectFit: "contain",
        opacity: on ? 1 : 0.42 }} />
      <div style={{ position: "absolute", left: 16 * s, bottom: 16 * s, width: w - 32 * s,
        height: 54 * s, borderRadius: 14 * s, background: on ? "#FFFFFF" : "#EFECE4",
        border: `${2 * s}px solid #EAE6DC`, display: "flex", alignItems: "center",
        padding: `0 ${12 * s}px` }}>
        <div style={{ width: (w - 120 * s), height: 10 * s, borderRadius: 5 * s,
          background: "#E4E0D7" }} />
        <div style={{ marginLeft: "auto", width: 34 * s, height: 34 * s, borderRadius: 10 * s,
          background: on ? "#C96442" : "#C6BFB4" }} />
      </div>
    </>) : (<>
      <div style={{ position: "absolute", right: 14 * s, top: 104 * s, width: w * 0.58,
        height: 34 * s, borderRadius: 12 * s, background: on ? "#EFECE4" : "#DEDAD1" }} />
      {[0, 1, 2, 3].map((i) => (
        <div key={i} style={{ position: "absolute", left: 14 * s, top: (152 + i * 26) * s,
          width: (w - 40 * s) * [1, 0.86, 0.94, 0.6][i], height: 13 * s, borderRadius: 4 * s,
          background: on ? "#DCD7CB" : "#DAD6CD" }} />
      ))}
      <div style={{ position: "absolute", left: 16 * s, bottom: 16 * s, width: w - 32 * s,
        height: 54 * s, borderRadius: 14 * s, background: on ? "#FFFFFF" : "#EFECE4",
        border: `${2 * s}px solid #EAE6DC` }} />
      {on && (
        <div style={{ position: "absolute", right: 14 * s, top: 74 * s, padding: `${3 * s}px ${10 * s}px`,
          borderRadius: 6 * s, background: GO, fontWeight: 900, fontSize: 15 * s,
          color: "#EAF7F0" }}>SAVED</div>
      )}
    </>)}
  </div>
  );
};

/** ONE figure per frame, big enough to be the thing the eye lands on */
const Big: React.FC<{ x: number; y: number; text: string; c?: string; size?: number; w?: number; z?: number }> =
  ({ x, y, text, c = RED, size = 150, w = 400, z = 40 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, textAlign: "center", zIndex: z,
    fontFamily: inter.fontFamily, fontWeight: 900, fontSize: size, lineHeight: 1,
    letterSpacing: "-0.05em", color: c, textShadow: "0 6px 0 rgba(6,9,14,0.28)" }}>{text}</div>
);

/* ------------------------------------------------------------------ places -- */
const Records: React.FC = () => (
  <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} shapeRendering="crispEdges"
    style={{ position: "absolute", left: 0, top: 0, zIndex: 2 }}>
    <rect x={0} y={0} width={W} height={H} fill="#A6B0B8" />
    {[0, 1, 2].map((i) => <rect key={i} x={80 + i * 300} y={48} width={200} height={18} fill="#F6F8F2" />)}
    <rect x={0} y={78} width={W} height={10} fill="#8A959D" />
    {Array.from({ length: 6 }, (_, i) => (
      <React.Fragment key={i}>
        <rect x={16 + i * 168} y={150} width={148} height={330} fill="#B8C2C9" />
        {[0, 1, 2, 3].map((k) => (
          <React.Fragment key={k}>
            <rect x={26 + i * 168} y={170 + k * 78} width={128} height={66} fill="#A2AEB6" />
            <rect x={70 + i * 168} y={198 + k * 78} width={40} height={9} fill="#D2DAE0" />
          </React.Fragment>
        ))}
      </React.Fragment>
    ))}
    <rect x={0} y={480} width={W} height={16} fill="#77838B" />
    <rect x={0} y={496} width={W} height={H - 496} fill="#909BA3" />
    {Array.from({ length: 9 }, (_, i) => (
      <polygon key={`f${i}`} fill="#849098" points={`${-220 + i * 200},792 ${-204 + i * 200},792 516,496 508,496`} />
    ))}
  </svg>
);

const PlantRoom: React.FC = () => (
  <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} shapeRendering="crispEdges"
    style={{ position: "absolute", left: 0, top: 0, zIndex: 2 }}>
    <rect x={0} y={0} width={W} height={H} fill="#A6AC9E" />
    {[0, 1, 2].map((i) => (
      <React.Fragment key={i}>
        <rect x={0} y={112 + i * 78} width={W} height={26} fill="#B4BAAB" />
        <rect x={0} y={112 + i * 78} width={W} height={6} fill="#C6CCBC" />
        {Array.from({ length: 5 }, (_, k) => (
          <rect key={k} x={64 + k * 208} y={106 + i * 78} width={26} height={38} fill="#8E9486" />
        ))}
      </React.Fragment>
    ))}
    <rect x={0} y={446} width={W} height={16} fill="#7E8478" />
    <rect x={0} y={462} width={W} height={H - 462} fill="#949A8C" />
    {Array.from({ length: 9 }, (_, i) => (
      <polygon key={`f${i}`} fill="#8A9082"
        points={`${-220 + i * 200},792 ${-204 + i * 200},792 516,462 508,462`} />
    ))}
  </svg>
);

const Stairwell: React.FC = () => (
  <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} shapeRendering="crispEdges"
    style={{ position: "absolute", left: 0, top: 0, zIndex: 2 }}>
    <rect x={0} y={0} width={W} height={H} fill="#9E8E7A" />
    <rect x={0} y={0} width={W} height={110} fill="#8A7A66" />
    {Array.from({ length: 8 }, (_, i) => (
      <rect key={i} x={0} y={120 + i * 84} width={W} height={7} fill="#8A7A66" />
    ))}
    <rect x={0} y={520} width={W} height={16} fill="#6E6050" />
    <rect x={0} y={536} width={W} height={H - 536} fill="#8E7E6A" />
    {Array.from({ length: 9 }, (_, i) => (
      <polygon key={`f${i}`} fill="#83735F"
        points={`${-220 + i * 200},792 ${-204 + i * 200},792 516,536 508,536`} />
    ))}
  </svg>
);

const Hall: React.FC = () => (
  <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} shapeRendering="crispEdges"
    style={{ position: "absolute", left: 0, top: 0, zIndex: 2 }}>
    <rect x={0} y={0} width={W} height={H} fill="#9C9AA8" />
    {Array.from({ length: 7 }, (_, i) => (
      <rect key={i} x={22 + i * 146} y={96} width={62} height={402} fill="#AAA8B6" />
    ))}
    <rect x={0} y={96} width={W} height={14} fill="#B6B4C2" />
    <rect x={0} y={498} width={W} height={16} fill="#78768A" />
    <rect x={0} y={514} width={W} height={H - 514} fill="#8E8C9C" />
    {Array.from({ length: 9 }, (_, i) => (
      <polygon key={`f${i}`} fill="#848294"
        points={`${-220 + i * 200},792 ${-204 + i * 200},792 516,514 508,514`} />
    ))}
  </svg>
);

const A_ = "am/";
const sfxFor = (sig: { src: string; dur: number; rate?: number }): Cue[] => [
  { at: 0, src: A_ + "room-tone.wav", v: LEVELS.SFX_BED, dur: 4.95, from: 2, lead: 0 },
  { at: 0, src: A_ + "hit-boom.wav", v: LEVELS.SFX_HERO, dur: 1.8, lead: 0 },
  { at: 0, src: A_ + "lights-on.wav", v: LEVELS.SFX_MID, dur: 0.80, lead: 0 },
  { at: 0.40, src: A_ + sig.src, v: LEVELS.SFX_HERO, dur: sig.dur, rate: sig.rate, lead: 0 },
  ...layer(1.267, { src: A_ + "whoosh-swoosh.wav", v: LEVELS.SFX_MID, dur: 0.80 },
                  { src: A_ + "punch.wav", v: LEVELS.SFX_TEXTURE, dur: 0.20 }),
  ...layer(2.533, { src: A_ + "whoosh-fast.wav", v: LEVELS.SFX_MID, dur: 0.45 },
                  { src: A_ + "hit-up.wav", v: LEVELS.SFX_TEXTURE, dur: 1.20 }),
  ...layer(3.733, { src: A_ + "whoosh-choppy.wav", v: LEVELS.SFX_MID, dur: 0.80 },
                  { src: A_ + "positive-chime.wav", v: LEVELS.SFX_TEXTURE, dur: 1.10 }),
];

const wrap = (f: number, glow: string, cues: Cue[], children: React.ReactNode) => {
  const assembled = React.useContext(AssemblyCtx);
  return (
    <AbsoluteFill>
      <Bg /><ProgressBar /><Vo />
      {!assembled && <SfxTrack cues={cues} />}
      <HookHeader f={f + 12} big={HEAD.big} hot={HEAD.hot} />
      <Panel glow={hexA(glow, 0.3)}>
        {children}
        <Flash f={f} />
      </Panel>
      <Cap />
    </AbsoluteFill>
  );
};

const THREADS = ["Refactor the API", "Pricing page copy", "Onboarding flow", "DB migration", "New chat"];

/** beats 2-4: it keeps happening · the wire · every thread saved */
const tail = (f: number) => {
  const [C1, C2, C3] = AI3_CUTS;
  return (<>
    <Shot f={f} a={C1} b={C2} k={1}>
      <Records />
      {THREADS.map((th, i) => (
        <Chat key={th} x={26 + i * 194} y={190} w={172} h={244} s={0.78} title={th}
              empty lit={0} z={24} />
      ))}
      <Big x={306} y={478} w={400} text="0" c={RED} size={168} />
      <Cl f={f} x={806} y={520} size={132} gaze={0} stern={0.65} nodAmp={2.2} nodSpeed={13} />
    </Shot>

    <Shot f={f} a={C2} b={C3} k={2}>
      <Hall />
      <div style={{ position: "absolute", left: 84, top: 216, width: 262, height: 262, zIndex: 26,
        borderRadius: 22, background: PAPER, boxShadow: SH, display: "flex", alignItems: "center",
        justifyContent: "center" }}>
        <Img src={staticFile(CLAUDE)} style={{ width: 150, height: 150, objectFit: "contain" }} />
      </div>
      <div style={{ position: "absolute", left: 346, top: 336, height: 26, zIndex: 24,
        width: 320 * E(f, C2 + 3, C2 + 20, 0, 1, OUT), background: GO, borderRadius: 6 }} />
      {[0, 1, 2, 3].map((i) => {
        const q = ((f - C2 + i * 9) % 36) / 36;
        return <div key={i} style={{ position: "absolute", left: 354 + q * 296, top: 326,
          width: 40, height: 40, borderRadius: 10, background: GO_L, zIndex: 28,
          opacity: E(f, C2 + 6, C2 + 16, 0, 1, OUT) * (1 - Math.abs(q - 0.5) * 0.6) }} />;
      })}
      <div style={{ position: "absolute", left: 666, top: 216, width: 262, height: 262, zIndex: 26,
        borderRadius: 22, background: "#2A2118", boxShadow: SH, display: "flex", alignItems: "center",
        justifyContent: "center", transform: `scale(${E(f, C2 + 1, C2 + 14, 0.6, 1, BACK)})` }}>
        <Img src={staticFile(NBLM)} style={{ width: 150, height: 150, objectFit: "contain",
          filter: "invert(1)" }} />
      </div>
      <Cl f={f} x={452} y={548} size={130} gaze={2} cheer={0.9} nodAmp={3.4} nodSpeed={9} />
    </Shot>

    <Shot f={f} a={C3} b={9999} k={3}>
      <Records />
      {THREADS.map((th, i) => (
        <Chat key={th} x={26 + i * 194} y={190} w={172} h={244} s={0.78} title={th}
              lit={E(f, C3 + 2 + i * 5, C3 + 14 + i * 5, 0, 1, OUT)} z={24} />
      ))}
      <Big x={306} y={478} w={400} text={String(Math.round(E(f, C3 + 4, C3 + 28, 0, 1, OUT) * 5))}
           c={GO} size={168} />
      <Cl f={f} x={806} y={520} size={132} gaze={2} cheer={0.95} nodAmp={3.6} nodSpeed={8} flip />
    </Shot>
  </>);
};

/* ############################################################### A · THE STACK
   A records room. Four past conversations receding into depth, greyed out, and
   today's in the near foreground — empty. Rank by DEPTH, one figure: 0.
   ######################################################################### */
export const AiHookA: React.FC = () => {
  const f = useCurrentFrame();
  const C1 = AI3_CUTS[0];
  const wipe = E(f, 12, 26, 0, 1, OUT);
  return wrap(f, RED, sfxFor({ src: "paper-slide.wav", dur: 0.63, rate: 0.85 }), (<>
    <Shot f={f} a={0} b={C1} k={0} slamAt={12}>
      <Records />
      {/* the four behind, ranked smaller and higher the further back they are */}
      {[3, 2, 1, 0].map((i) => {
        const s = 0.44 + i * 0.1;
        return <Chat key={i} x={244 - i * 58} y={150 + i * 20} w={380 * s} h={470 * s} s={s}
                     title={THREADS[3 - i]} empty lit={0} z={20 + i} />;
      })}
      {/* today's, near and large — the one you are in */}
      <Chat x={302} y={192} w={392} h={442} s={1.0} title="New chat" empty lit={0} z={26} />
      <Big x={704} y={296} w={268} text="0" c={RED} size={196} z={30} />
      <Cl f={f} x={84} y={512} size={144} gaze={1} shock={0.75} nodAmp={2.2} nodSpeed={14} />
    </Shot>
    {tail(f)}
  </>));
};

/* ############################################################### B · THE DIAL
   A plant room. One calibrated gauge, floor to ceiling, and the needle is on
   the stop. Rank by the CALIBRATION, one figure: 0%.
   ######################################################################### */
export const AiHookB: React.FC = () => {
  const f = useCurrentFrame();
  const C1 = AI3_CUTS[0];
  const drop = E(f, 10, 24, 0.88, 0, IO);            // it was full. It is not now.
  const ang = -128 + drop * 256;
  return wrap(f, RED, sfxFor({ src: "gear-mech.wav", dur: 1.05, rate: 0.8 }), (<>
    <Shot f={f} a={0} b={C1} k={0} slamAt={12}>
      <PlantRoom />
      <div style={{ position: "absolute", left: 246, top: 142, width: 400, height: 400, zIndex: 24,
        borderRadius: "50%", background: "#6E7468", boxShadow: SH }} />
      <div style={{ position: "absolute", left: 268, top: 164, width: 356, height: 356, zIndex: 25,
        borderRadius: "50%", background: PAPER }} />
      {Array.from({ length: 21 }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: 444, top: 176, width: i % 5 ? 5 : 9,
          height: i % 5 ? 24 : 38, background: i > 15 ? RED : "#5E6458", zIndex: 26,
          transformOrigin: `50% ${i % 5 ? 166 : 166}px`,
          transform: `rotate(${-128 + i * 12.8}deg)` }} />
      ))}
      <div style={{ position: "absolute", left: 441, top: 196, width: 12, height: 160,
        background: RED, zIndex: 28, borderRadius: 6, transformOrigin: "50% 100%",
        transform: `rotate(${ang}deg)` }} />
      <div style={{ position: "absolute", left: 424, top: 328, width: 46, height: 46,
        borderRadius: "50%", background: "#3A4034", zIndex: 29 }} />
      <Big x={246} y={566} w={400} text="0%" c={RED} size={116} z={30} />
      {/* the thing the gauge is measuring, small and off to the side */}
      <Chat x={706} y={244} w={252} h={272} s={0.62} title="New chat" empty lit={0} z={24} />
      <Cl f={f} x={92} y={496} size={148} gaze={1} shock={0.75} nodAmp={2.2} nodSpeed={14} />
    </Shot>
    {tail(f)}
  </>));
};

/* ############################################################## C · THE FLIGHT
   A stairwell. Every session is a step going up and away, and every one of
   them is dark. Rank by the FLIGHT, one figure: 0.
   ######################################################################### */
export const AiHookC: React.FC = () => {
  const f = useCurrentFrame();
  const C1 = AI3_CUTS[0];
  return wrap(f, RED, sfxFor({ src: "page-turn.wav", dur: 0.90 }), (<>
    <Shot f={f} a={0} b={C1} k={0} slamAt={12}>
      <Stairwell />
      {/* five steps descending toward the viewer, a session on each tread */}
      {[4, 3, 2, 1, 0].map((j) => {
        const s = 0.62 - j * 0.10;
        const sx = 40 + j * 150, sy = 600 - j * 84;
        const dead = E(f, 10 + (4 - j) * 4, 22 + (4 - j) * 4, 0, 1, OUT);
        return (
          <React.Fragment key={j}>
            <div style={{ position: "absolute", left: sx, top: sy, width: 300 * s + 180,
              height: 20, background: "#6E6050", zIndex: 16 + (4 - j), boxShadow: SH_S }} />
            <div style={{ position: "absolute", left: sx, top: sy + 20, width: 300 * s + 180,
              height: 64, background: "#7E6E5A", zIndex: 15 + (4 - j) }} />
            <Chat x={sx + 22} y={sy - 300 * s} w={340 * s} h={300 * s} s={s}
                  title={THREADS[4 - j]} empty lit={1 - dead} z={22 + (4 - j)} />
          </React.Fragment>
        );
      })}
      <Big x={646} y={168} w={320} text="0" c={RED} size={190} z={30} />
      <Cl f={f} x={806} y={556} size={138} gaze={1} shock={0.72} nodAmp={2.2} nodSpeed={14} flip />
    </Shot>
    {tail(f)}
  </>));
};

/* ############################################################### D · THE QUEUE
   A hall. Five conversations queued at a door that only ever swallows them.
   Rank by POSITION IN THE LINE, one figure: 0.
   ######################################################################### */
export const AiHookD: React.FC = () => {
  const f = useCurrentFrame();
  const C1 = AI3_CUTS[0];
  const eat = E(f, 12, 30, 0, 1, IO);
  return wrap(f, RED, sfxFor({ src: "gear-stutter.wav", dur: 1.10 }), (<>
    <Shot f={f} a={0} b={C1} k={0} slamAt={12}>
      <Hall />
      {/* the door: a black slot the queue walks into */}
      <div style={{ position: "absolute", left: 704, top: 138, width: 250, height: 388, zIndex: 20,
        background: "#4A4856", boxShadow: SH }} />
      <div style={{ position: "absolute", left: 728, top: 162, width: 202, height: 340, zIndex: 21,
        background: "#15131C" }} />
      {/* the queue, ranked by how close each is to going in */}
      {[4, 3, 2, 1, 0].map((i) => {
        const s = 0.40 + i * 0.085;
        const gone = i === 0 ? eat : 0;
        return <Chat key={i} x={62 + (4 - i) * 132 + gone * 560} y={470 - 320 * s}
                     w={330 * s} h={320 * s} s={s} title={THREADS[4 - i]} empty
                     lit={1 - gone} z={26 - i} />;
      })}
      <Big x={104} y={520} w={400} text="0" c={RED} size={176} z={30} />
      <Cl f={f} x={484} y={556} size={136} gaze={1} shock={0.72} nodAmp={2.2} nodSpeed={14} />
    </Shot>
    {tail(f)}
  </>));
};
