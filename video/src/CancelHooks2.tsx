import React from "react";
import { AbsoluteFill, useCurrentFrame, Img, Audio, staticFile } from "remotion";
import { inter } from "./fonts";
import { Bg, Panel, ProgressBar, HookHeader, KaraokeCaption, AssemblyCtx, Mascot, hexA } from "./SlopKit";
import WORDS from "./data/words_cancel.json";
import {
  Lock, PAID, FREE, TOTAL, PAPER, PAPER2, INKD, RED, GO, GO_L, AMB, AMB_L, AMB_D,
  STEEL, STEEL_D, SH, SH_S, mix,
} from "./CancelWorld";
import { SfxTrack, LEVELS, layer, repeat, db, type Cue } from "./SoundKit";
import { E, rnd, OUT, IO, BACK } from "./MissionWorld";

/* =========================================================================
   REEL 86 "CANCEL" · HOOK SET 2 — THE REDIRECT.

   ⛔ THE NOTE on set 1 (A-E): "more hierarchical, related to the topic at hand
   and simpler to understand whats going on immediately."

   Set 1 was five GENRE WORLDS — a toll plaza, a subway, a billing factory. Each
   was a metaphor for PAYING MONTHLY, which is only half the subject, and every
   one of them made the viewer decode "toll booth = subscription" before they
   got anything at all. That decode cost is exactly the second the hook has to
   earn. Same failure shape as reel 78's Fury Road: craft was fine, theme was
   working against the line being spoken.

   Set 2 answers the three words literally:

     HIERARCHICAL   the object IS the ranking. Not depth tiers behind a scene —
                    a rank you could read with the sound off and the labels
                    removed. Reel 84 measured a cream room at 1.24 and a dark
                    one at 2.92, so these are dark halls with ONE lit object.
     RELATED        the literal layer carries the information: the REAL paid
                    marks, the REAL star counts, the GitHub mark. No metaphor
                    stands between the viewer and "these five are free".
     SIMPLER        ONE nameable object per hook (learnings §2: if you cannot
                    name the hook's single prop, there isn't one), and FOUR
                    shots instead of five, each ≥1.1s instead of 0.73s.

     F · THE STAR STACK   HEIGHT     five columns, height = the real star count
     G · THE BALANCE      WEIGHT     free side on the floor, paid side in the air
     H · THE MONOLITH     MASS       one slab, five paid apps in its shadow
     I · THE BOARD        ORDER      ranked flap rows, paid below a red cut line
     J · THE STAR FIELD   QUANTITY   176,656 stars as a wall you can see the size of

   ⛔ ONE HALL PER CONCEPT, four framings of it. Set 1 travelled five locations
   per hook and came back "too much going on". Fewer, longer, and always looking
   at the same object is the trade being made deliberately here.
   ========================================================================= */

export const HOOK2_LEN = 145;
export const CUTS2 = [38, 76, 112];       // 1.27 / 1.27 / 1.20 / 1.10s
const HEAD = { big: "5 APPS YOU PAY FOR", hot: "ARE FREE ON GITHUB" };
const CHIP_Y = 672;
const W = 1012;

/* the five REAL pairs, ranked by stars — this order is the hierarchy itself.
   FREE[] is already ranked, and PAID_FOR maps each to the product it replaces. */
export const PAIRS = [
  { stars: FREE[0].stars, paid: PAID[2] },   // AppFlowy 74,690  <- Notion
  { stars: FREE[1].stars, paid: PAID[0] },   // OpenMontage 44,388 <- HiggsField
  { stars: FREE[2].stars, paid: PAID[1] },   // Jan 43,792      <- ChatGPT Plus
  { stars: FREE[3].stars, paid: PAID[3] },   // Presenton 9,268 <- Canva
  { stars: FREE[4].stars, paid: PAID[4] },   // OpenPencil 4,518 <- Figma
];
const MAXS = PAIRS[0].stars;

const Vo: React.FC = () =>
  React.useContext(AssemblyCtx) ? null : (
    <Audio src={staticFile("cancel_vo_final.wav")} endAt={HOOK2_LEN} />
  );
const Cap: React.FC = () =>
  React.useContext(AssemblyCtx) ? null : <KaraokeCaption words={WORDS as any} />;

export const Cl: React.FC<{
  f: number; x: number; y: number; size?: number; z?: number;
  gaze?: number; shock?: number; cheer?: number; stern?: number;
  nodAmp?: number; nodSpeed?: number; flip?: boolean;
}> = ({ f, x, y, size = 190, z = 30, gaze = 0, shock = 0, cheer = 0, stern = 0,
        nodAmp = 3, nodSpeed = 10, flip = false }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    transform: `scaleX(${flip ? -1 : 1})`, transformOrigin: "50% 90%",
    filter: `drop-shadow(0 ${Math.round(size * 0.05)}px ${Math.round(size * 0.07)}px rgba(4,6,10,0.6))` }}>
    <Mascot lf={f} size={size} gaze={gaze} shock={shock} cheer={cheer} stern={stern}
            nodAmp={nodAmp} nodSpeed={nodSpeed} />
  </div>
);

export const Shot: React.FC<{
  f: number; a: number; b: number; k?: number; slamAt?: number; children: React.ReactNode;
}> = ({ f, a, b, k = 0, slamAt, children }) => {
  if (f < a || f >= b) return null;
  const t = Math.min(1, (f - a) / 30), e = t * t * (3 - 2 * t);
  const z = [1.05 - e * 0.04, 1.02 + e * 0.05, 1.06 - e * 0.05, 1.02 + e * 0.04][k % 4];
  /* ⛔ THE IMPACT. Frame 0 is the settled state, so the first shot has nothing
     moving in it but the mascot — measured motion in bucket 1 was 1.7-3.8
     against 14-17 later, i.e. the shot that has to interrupt was the quietest
     one in the hook. Five small /mo stamps did NOT fix it (1.7 -> 1.8): a frame
     difference metric cannot see a 30px tag. A decaying SHAKE moves every pixel
     and is what the house already uses for a slam (reel 79's claw drop). */
  let dx = 0, dy = 0;
  if (slamAt !== undefined) {
    const k2 = f - slamAt;
    if (k2 >= 0 && k2 < 12) {
      const decay = Math.pow(1 - k2 / 12, 2);
      dx = Math.sin(k2 * 2.3) * 17 * decay;
      dy = Math.cos(k2 * 1.9) * 13 * decay;
    }
  }
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden",
      transform: `scale(${z}) translate(${dx}px, ${dy}px)`, transformOrigin: "50% 54%" }}>
      {children}
      {slamAt !== undefined && f >= slamAt && f < slamAt + 3 && (
        <div style={{ position: "absolute", inset: 0, background: "#FFEBC2",
          opacity: (1 - (f - slamAt) / 3) * 0.22, zIndex: 58 }} />
      )}
    </div>
  );
};

export const Flash: React.FC<{ f: number }> = ({ f }) => (<>
  {CUTS2.map((cf) => {
    const k = f - cf;
    if (k < 0 || k > 2) return null;
    return <div key={cf} style={{ position: "absolute", inset: 0, background: "#FFF6E2",
      opacity: (1 - k / 2) * 0.26, zIndex: 60 }} />;
  })}
</>);

export const Chip: React.FC<{ y?: number; text: string; c?: string; size?: number }> =
  ({ y = CHIP_Y, text, c = AMB, size = 34 }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top: y, display: "flex",
    justifyContent: "center", zIndex: 48 }}>
    <div style={{ padding: "9px 26px", borderRadius: 8, background: c, boxShadow: SH_S,
      fontFamily: inter.fontFamily, fontWeight: 900, fontSize: size, letterSpacing: "-0.01em",
      color: c === AMB || c === AMB_L ? "#241A08" : "#FFF8ED", whiteSpace: "nowrap" }}>{text}</div>
  </div>
);

/* ====================================================================== hall =
   A dark hall with THREE tiers, not a black void. Reel 85's note was that on
   pure black there were only two tiers — the object and the figure — so nothing
   receded and the frame read sparse rather than ranked.
   ========================================================================= */
const VOID = "#080C12";
export const Hall: React.FC<{ tint?: string; floor?: string; f: number }> =
  ({ tint = "#141B26", floor = "#0D131B", f }) => (
  <svg viewBox={`0 0 ${W} 792`} width={W} height={792} shapeRendering="crispEdges"
    style={{ position: "absolute", left: 0, top: 0, zIndex: 2 }}>
    <rect x={0} y={0} width={W} height={792} fill={VOID} />
    {/* ⛔ every tier below is a SOLID paint mixed once, not an alpha wash over
        the one behind it. Three depths: far wall, colonnade, floor. */}
    <rect x={0} y={120} width={W} height={480} fill={mix(VOID, tint, 0.55)} />
    {Array.from({ length: 7 }, (_, i) => (
      <rect key={i} x={26 + i * 148} y={168} width={54} height={432} fill={tint} />
    ))}
    <rect x={0} y={168} width={W} height={20} fill={tint} />
    <rect x={0} y={600} width={W} height={192} fill={floor} />
    {Array.from({ length: 11 }, (_, i) => {
      const x0 = -320 + i * 166;
      return <polygon key={`l${i}`} fill={mix(floor, tint, 0.5)}
        points={`${x0},792 ${x0 + 22},792 ${W / 2 + 5},600 ${W / 2 - 5},600`} />;
    })}
    <rect x={0} y={596} width={W} height={9} fill="#05080C" />
  </svg>
);

/** the pool of light the object stands in — three SOLID stepped paints mixed
    against the floor it falls on, never a translucent overlay. */
export const Pool: React.FC<{ x: number; w: number; c?: string; o?: number; floor?: string; z?: number }> =
  ({ x, w, c = AMB_L, o = 0.16, floor = "#0D131B", z = 4 }) => (<>
  {[0, 1, 2].map((k) => (
    <div key={k} style={{ position: "absolute", left: x - k * 34, top: 596 + k * 26,
      width: w + k * 68, height: 30, background: mix(floor, c, o * (1 - k * 0.3) * 3.4),
      zIndex: z, clipPath: "polygon(9% 0, 91% 0, 100% 100%, 0 100%)" }} />
  ))}
</>);

/** the real paid mark on a small plinth — the literal layer, always present.
    `tag` lands a red /mo on it: frame 0 stays the settled state, and this is
    the break at ~f12 that stops the shot reading as a poster (THE-OPEN wants
    something physically surprising by frame ~15, and the first cut of this set
    held a still object for a full 1.27s — motion bucket 1 measured 1.7). */
export const Foot: React.FC<{
  x: number; y: number; s?: number; i: number; dead?: number; tag?: number; z?: number;
}> = ({ x, y, s = 1, i, dead = 0, tag = 0, z = 30 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
    <div style={{ width: 96 * s, height: 96 * s, background: PAPER, boxShadow: SH,
      display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Img src={staticFile(PAID[i].file)} style={{ width: 62 * s, height: 62 * s,
        objectFit: "contain", filter: "none" }} />
    </div>
    <div style={{ width: 96 * s, textAlign: "center", marginTop: 5 * s,
      fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 15 * s, color: "#8A93A0",
      letterSpacing: "0.04em" }}>{PAID[i].short}</div>
    {tag > 0.02 && (
      <div style={{ position: "absolute", left: 52 * s, top: -18 * s, padding: `${3 * s}px ${9 * s}px`,
        background: RED, boxShadow: SH_S, fontFamily: inter.fontFamily, fontWeight: 900,
        fontSize: 21 * s, color: "#FFF8ED", transform: `scale(${tag}) rotate(-8deg)`,
        transformOrigin: "0% 100%" }}>/mo</div>
    )}
    {dead > 0.02 && (
      <div style={{ position: "absolute", left: -6 * s, top: 44 * s, width: 108 * s,
        height: 8 * s, background: RED, transform: "rotate(-13deg)", opacity: dead }} />
    )}
  </div>
);

/** the number, counting UP to its value on the object itself */
export const Count: React.FC<{ f: number; at: number; y: number; size?: number; c?: string; z?: number }> =
  ({ f, at, y, size = 132, c = AMB_L, z = 44 }) => {
  const p = E(f, at, at + 28, 0, 1, OUT);
  const pop = 1 + Math.max(0, 1 - Math.abs(f - (at + 28)) / 7) * 0.1;
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: y, textAlign: "center", zIndex: z,
      fontFamily: inter.fontFamily, fontWeight: 900, fontSize: size, lineHeight: 1,
      letterSpacing: "-0.045em", color: c, transform: `scale(${pop})`,
      textShadow: "0 7px 0 rgba(4,6,10,0.7)" }}>
      {Math.round(TOTAL * p).toLocaleString("en-US")}
    </div>
  );
};

/** THE SUBJECT BADGE. Frame 0 has to say what the video is about without the
    sound on: the real GitHub mark, the real combined star count, and the word
    FREE. Every hook carries it, so whichever object is picked the first frame
    is already the claim rather than a scene the claim arrives into later. */
export const Subject: React.FC<{ x: number; y: number; s?: number; z?: number }> =
  ({ x, y, s = 1, z = 46 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z, display: "flex",
    alignItems: "center", gap: 12 * s, padding: `${9 * s}px ${16 * s}px`,
    background: "#0C1119", border: `${3 * s}px solid ${AMB_D}`, boxShadow: SH,
    fontFamily: inter.fontFamily, whiteSpace: "nowrap" }}>
    <Img src={staticFile("logos/github.svg")} style={{ width: 38 * s, height: 38 * s,
      objectFit: "contain", filter: "invert(1)" }} />
    <span style={{ fontWeight: 900, fontSize: 34 * s, color: AMB_L, letterSpacing: "-0.02em" }}>
      ★ {TOTAL.toLocaleString("en-US")}
    </span>
    <span style={{ fontWeight: 900, fontSize: 26 * s, color: GO_L, letterSpacing: "0.06em" }}>
      FREE
    </span>
  </div>
);

/** beat 4, shared: the five replacements, ★ shown, names blacked out */
export const Turn: React.FC<{ f: number; at: number }> = ({ f, at }) => (<>
  {FREE.map((r, i) => (
    <Lock key={r.repo} i={i} x={306} y={206 + i * 64} w={392} s={0.98}
          t={E(f, at + 2 + i * 4, at + 16 + i * 4, 0, 1, BACK)} z={34} />
  ))}
</>);

/* ======================================================================= sfx =
   Cue times are the VISUAL beat in seconds; SoundKit subtracts the 3-frame
   J-cut. Every `dur` was set from the file's MEASURED length (docs/SOUND-DESIGN
   §2: a `dur` shorter than the file used to chop the decay and sound cheap;
   SoundKit's tail ramp now covers deliberate trims).

   The shape follows THE-OPEN: frame 0 carries the heaviest stack because it is
   the interrupt, every cut gets a transient landing ON it, and only the PRIMARY
   action in each shot is sounded — the five /mo stamps are silent under the
   slam because `cash-register` already says "five charges".

     0.00  frame 0     hit-boom + lights-on + the hook's OWN signature texture
     0.40  the slam    punch + cash-register        <- the charge landing
     1.27  cut 1       whoosh-swoosh + punch
     2.53  cut 2       whoosh-fast + hit-up
     2.63  the count   counter-tick under the climbing number
     3.73  cut 3       whoosh-choppy + positive-chime
     3.85  the turn    five check-pops, pitch-walked so they aren't copy-paste
   ========================================================================= */
const A = "am/";
export const sfxFor = (sig: { src: string; v?: number; dur: number; rate?: number }): Cue[] => [
  { at: 0, src: A + "room-tone.wav", v: LEVELS.SFX_BED, dur: 4.9, from: 2, lead: 0 },
  // frame 0 — the heaviest stack in the hook
  { at: 0, src: A + "hit-boom.wav", v: LEVELS.SFX_HERO, dur: 1.8, lead: 0 },
  { at: 0, src: A + "lights-on.wav", v: LEVELS.SFX_MID, dur: 0.80, lead: 0 },
  { at: 0, src: A + sig.src, v: sig.v ?? LEVELS.SFX_TEXTURE, dur: sig.dur, rate: sig.rate, lead: 0 },
  // 0.40 — the slam, and the charge that lands with it
  ...layer(0.40,
    { src: A + "punch.wav", v: LEVELS.SFX_HERO, dur: 0.20 },
    { src: A + "cash-register.wav", v: LEVELS.SFX_TEXTURE, dur: 1.15 }),
  // the three cuts
  ...layer(1.267,
    { src: A + "whoosh-swoosh.wav", v: LEVELS.SFX_MID, dur: 0.80 },
    { src: A + "punch.wav", v: LEVELS.SFX_TEXTURE, dur: 0.20 }),
  ...layer(2.533,
    { src: A + "whoosh-fast.wav", v: LEVELS.SFX_MID, dur: 0.45 },
    { src: A + "hit-up.wav", v: LEVELS.SFX_TEXTURE, dur: 1.20 }),
  { at: 2.63, src: A + "counter-tick.wav", v: LEVELS.SFX_MID * db(-3), dur: 1.05 },
  ...layer(3.733,
    { src: A + "whoosh-choppy.wav", v: LEVELS.SFX_MID, dur: 0.80 },
    { src: A + "positive-chime.wav", v: LEVELS.SFX_TEXTURE, dur: 1.10 }),
  // the five replacements landing
  ...repeat(5, 3.85, 0.133,
    { src: A + "check-pop.wav", v: LEVELS.SFX_TEXTURE, dur: 0.65 }, 0.06),
];

/**
 * BAREBONES mode. The panel content only, at its native 1012x792, with no cream
 * frame, no hook header, no karaoke line, no retention rail and no audio — so
 * what is being watched is the ANIMATION and nothing else.
 *
 * ⛔ These are a review artefact, not a format. A bare comp is missing the
 * chassis BY CONSTRUCTION; do not report the absent header/captions/rail as
 * defects (memory feedback_label_preview_artifacts).
 */
export const BareCtx = React.createContext(false);
export const BARE_W = 1012, BARE_H = 792;

export const wrap = (f: number, glow: string, cues: Cue[], children: React.ReactNode) => {
  /* both contexts read BEFORE any branch, so hook order is identical in every
     mode — an early return past an inline useContext is how that breaks. */
  const bare = React.useContext(BareCtx);
  const assembled = React.useContext(AssemblyCtx);
  if (bare) {
    return (
      <AbsoluteFill style={{ background: "#05080C", overflow: "hidden" }}>
        {children}
        <Flash f={f} />
      </AbsoluteFill>
    );
  }
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

/** BEATS 2-4, shared by every hook in sets 2 and 3, so the only thing a
    reviewer is ever comparing between variants is SCENE 1. */
export const sharedTail = (f: number) => {
  const [C1, C2, C3] = CUTS2;
  return (<>
    <Shot f={f} a={C1} b={C2} k={1}>
      <Hall f={f} tint="#241B18" floor="#140E0C" />
      <Pool x={90} w={832} c={PAPER} o={0.13} floor="#140E0C" />
      {PAIRS.map((p, i) => (
        <Foot key={`b${i}`} x={62 + i * 186} y={330} s={1.62} i={PAID.indexOf(p.paid)}
              dead={E(f, C1 + 12 + i * 3, C1 + 20 + i * 3, 0, 1, OUT)} z={30} />
      ))}
      <div style={{ position: "absolute", left: 0, right: 0, top: 246, textAlign: "center",
        zIndex: 34, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 46, color: RED,
        letterSpacing: "0.02em" }}>YOU PAY FOR ALL FIVE</div>
      <Cl f={f} x={430} y={520} size={162} gaze={0} stern={0.6} nodAmp={2.2} nodSpeed={13} z={34} />
      <Chip text="EVERY MONTH" c={RED} size={34} />
    </Shot>

    <Shot f={f} a={C2} b={C3} k={2}>
      <Hall f={f} tint="#1A2130" floor="#0E141C" />
      <Pool x={30} w={780} c={AMB_L} o={0.17} floor="#0E141C" />
      {PAIRS.map((p, i) => (
        <Column key={i} f={f} x={34 + i * 158} w={124} stars={p.stars} at={-40} z={20} />
      ))}
      <div style={{ position: "absolute", left: 96, top: 250, width: 820, height: 216, zIndex: 40,
        background: "#0A0E14", border: `9px solid ${AMB_D}`, boxShadow: SH }} />
      <Count f={f} at={C2 + 3} y={286} size={126} z={44} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 414, textAlign: "center", zIndex: 44,
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 38, letterSpacing: "0.14em",
        color: PAPER }}>★ ON GITHUB</div>
      <Cl f={f} x={54} y={462} size={182} gaze={2} cheer={0.88} nodAmp={3.4} nodSpeed={9} z={34} />
      <Chip text="ALL FREE" c={GO} size={34} />
    </Shot>

    <Shot f={f} a={C3} b={9999} k={3}>
      <Hall f={f} tint="#12241E" floor="#0A1712" />
      <Pool x={280} w={452} c={GO_L} o={0.16} floor="#0A1712" />
      <Turn f={f} at={C3} />
      <Cl f={f} x={62} y={452} size={196} gaze={2} cheer={0.92} nodAmp={3.6} nodSpeed={8} z={36} />
      <Chip text="AND THEY'RE FREE" c={GO} size={34} />
    </Shot>
  </>);
};

/* ############################################################ F · STAR STACK
   THE OBJECT: five columns of stars. Column height IS the star count, to scale
   and undistorted — 74,690 leaves the top of frame, 4,518 is a stub, and that
   difference is the truth, not a design choice. At the foot of each column, the
   product it replaces. The whole VO sentence is one picture.
   ######################################################################### */
export const Column: React.FC<{ f: number; x: number; w: number; stars: number; at: number; z?: number }> =
  ({ f, x, w, stars, at, z = 20 }) => {
  /* ⛔ 470 put the tallest column's own label at y=92, underneath the hook
     header (which owns panel-local 0..98) — "74,690" shipped as "74,6". 400
     lands the label at 162. The scale stays LINEAR across all five: 4,518 is a
     sliver next to 74,690 because it is, and that ratio is the hierarchy. */
  const H = Math.round((stars / MAXS) * 400);
  const g = E(f, at, at + 26, 0, 1, OUT), hh = Math.max(10, H * g);
  const rows = Math.max(1, Math.floor(hh / 30));
  const cols = Math.max(2, Math.floor(w / 34));
  return (<>
    <div style={{ position: "absolute", left: x, top: 596 - hh, width: w, height: hh,
      background: "#3E3212", zIndex: z, boxShadow: SH, overflow: "hidden" }}>
      {Array.from({ length: rows }, (_, r) => (
        <div key={r} style={{ position: "absolute", left: 4, top: 4 + r * 30, display: "flex", gap: 4 }}>
          {Array.from({ length: cols }, (_, c) => (
            <div key={c} style={{ width: 28, height: 26, background: rnd(r * 9 + c, 3) > 0.15 ? AMB : AMB_D,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: inter.fontFamily, fontSize: 17, color: "#4A3505", fontWeight: 900 }}>★</div>
          ))}
        </div>
      ))}
    </div>
    <div style={{ position: "absolute", left: x - 6, top: 596 - hh - 34, width: w + 12,
      textAlign: "center", zIndex: z + 2, fontFamily: inter.fontFamily, fontWeight: 900,
      fontSize: 24, color: AMB_L, opacity: g,
      textShadow: "0 4px 0 rgba(4,6,10,0.7)" }}>{stars.toLocaleString("en-US")}</div>
  </>);
};

export const CancelHookF: React.FC = () => {
  const f = useCurrentFrame();
  const [C1, C2, C3] = CUTS2;
  return wrap(f, AMB, sfxFor({ src: "coin-spin.wav", dur: 1.20, rate: 0.9 }), (<>
    {/* 1 · THE RANK — complete on frame 0. Nothing to decode. */}
    <Shot f={f} a={0} b={C1} k={0} slamAt={12}>
      <Hall f={f} tint="#1A2130" floor="#0E141C" />
      <Pool x={30} w={780} c={AMB_L} o={0.15} />
      {/* ⛔ the columns keep to the left 790px so the mascot has its own column
          and the chip band at y=706 is empty floor. The first cut put the chip
          across the CANVA plate and the mascot across the fifth column. */}
      {PAIRS.map((p, i) => (
        <Column key={i} f={f} x={34 + i * 158} w={124} stars={p.stars} at={-40} z={20} />
      ))}
      {PAIRS.map((p, i) => (
        <Foot key={`ft${i}`} x={62 + i * 158} y={610} s={0.7} i={PAID.indexOf(p.paid)}
              tag={E(f, 10 + i * 3, 19 + i * 3, 0, 1, BACK)} z={30} />
      ))}
      <Subject x={556} y={172} s={0.95} />
      <Cl f={f} x={800} y={430} size={165} gaze={1} shock={0.7} nodAmp={2.4} nodSpeed={14}
          flip z={34} />
      <Chip y={706} text="★ = ITS FREE VERSION" c={AMB} size={34} />
    </Shot>

    {/* 2 · THE PAID FIVE — down at the feet, and every one of them is a bill */}
    <Shot f={f} a={C1} b={C2} k={1}>
      <Hall f={f} tint="#241B18" floor="#140E0C" />
      <Pool x={90} w={832} c={PAPER} o={0.13} />
      {PAIRS.map((p, i) => (
        <Foot key={`b${i}`} x={62 + i * 186} y={330} s={1.62} i={PAID.indexOf(p.paid)}
              dead={E(f, C1 + 12 + i * 3, C1 + 20 + i * 3, 0, 1, OUT)} z={30} />
      ))}
      <div style={{ position: "absolute", left: 0, right: 0, top: 246, textAlign: "center",
        zIndex: 34, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 46, color: RED,
        letterSpacing: "0.02em" }}>YOU PAY FOR ALL FIVE</div>
      <Cl f={f} x={430} y={520} size={162} gaze={0} stern={0.6} nodAmp={2.2} nodSpeed={13} z={34} />
      <Chip text="EVERY MONTH" c={RED} size={34} />
    </Shot>

    {/* 3 · THE NUMBER — it lands on the stack, not on a card */}
    <Shot f={f} a={C2} b={C3} k={2}>
      <Hall f={f} tint="#1A2130" floor="#0E141C" />
      <Pool x={30} w={780} c={AMB_L} o={0.17} />
      {PAIRS.map((p, i) => (
        <Column key={i} f={f} x={34 + i * 158} w={124} stars={p.stars} at={-40} z={20} />
      ))}
      <div style={{ position: "absolute", left: 96, top: 250, width: 820, height: 216, zIndex: 40,
        background: "#0A0E14", border: `9px solid ${AMB_D}`, boxShadow: SH }} />
      <Count f={f} at={C2 + 3} y={286} size={126} z={44} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 414, textAlign: "center", zIndex: 44,
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 38, letterSpacing: "0.14em",
        color: PAPER }}>★ ON GITHUB</div>
      <Cl f={f} x={54} y={462} size={182} gaze={2} cheer={0.88} nodAmp={3.4} nodSpeed={9} z={34} />
      <Chip text="ALL FREE" c={GO} size={34} />
    </Shot>

    {/* 4 · THE TURN — the five repos, star counts shown, names blacked out */}
    <Shot f={f} a={C3} b={9999} k={3}>
      <Hall f={f} tint="#12241E" floor="#0A1712" />
      <Pool x={280} w={452} c={GO_L} o={0.16} />
      <Turn f={f} at={C3} />
      <Cl f={f} x={62} y={452} size={196} gaze={2} cheer={0.92} nodAmp={3.6} nodSpeed={8} z={36} />
      <Chip text="AND THEY'RE FREE" c={GO} size={34} />
    </Shot>
  </>));
};

/* ############################################################## G · BALANCE
   THE OBJECT: one scale. Five paid marks in the pan that is up in the air; one
   GitHub mark in the pan that is already on the floor. Which side is heavier is
   not a thing you read, it is a thing you see.
   ######################################################################### */
const Pan: React.FC<{
  x: number; y: number; w?: number; hang?: number; children?: React.ReactNode; z?: number;
}> = ({ x, y, w = 340, hang = 104, children, z = 24 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, zIndex: z }}>
    {/* ⛔ the hanger length has to REACH the tipped beam. Fixed at 104 it did
        not, so the paid pan floated up under the hook header with two of its
        five marks off the top of the panel entirely. */}
    {[0, 1, 2].map((k) => (
      <div key={k} style={{ position: "absolute", left: w / 2 - 2 + (k - 1) * (w / 2 - 26),
        top: -hang, width: 4, height: hang, background: STEEL_D }} />
    ))}
    <div style={{ position: "absolute", left: 0, top: 0, width: w, height: 26,
      background: STEEL_D, boxShadow: SH }} />
    <div style={{ position: "absolute", left: 12, top: 22, width: w - 24, height: 12,
      background: "#25303C", clipPath: "polygon(0 0,100% 0,88% 100%,12% 100%)" }} />
    {children}
  </div>
);

export const CancelHookG: React.FC = () => {
  const f = useCurrentFrame();
  const [C1, C2, C3] = CUTS2;
  return wrap(f, GO, sfxFor({ src: "gear-mech.wav", dur: 1.05, rate: 0.8 }), (<>
    {/* 1 · THE RANK — already tipped. The break is it settling harder. */}
    <Shot f={f} a={0} b={C1} k={0} slamAt={12}>
      <Hall f={f} tint="#161F2B" floor="#0C1219" />
      <Pool x={466} w={90} c={PAPER} o={0.1} />
      {/* the post and the beam. Pivot (506, 296); at 13° the left end lifts to
          y≈204 and the right end drops to y≈388, so the hangers are sized to
          each of those, not to one shared constant. */}
      <div style={{ position: "absolute", left: 484, top: 290, width: 44, height: 312, zIndex: 14,
        background: STEEL_D, boxShadow: SH }} />
      <div style={{ position: "absolute", left: 96, top: 284, width: 820, height: 24, zIndex: 20,
        background: STEEL, boxShadow: SH,
        transform: `rotate(${13 + Math.max(0, 1 - Math.abs(f - 10) / 8) * 1.4}deg)`,
        transformOrigin: "50% 50%" }} />
      <div style={{ position: "absolute", left: 476, top: 268, width: 60, height: 44, zIndex: 22,
        background: STEEL_D }} />
      {/* paid pan — five marks in one row, all of them inside the frame */}
      <Pan x={64} y={392} w={332} hang={188} z={24}>
        {PAIRS.map((p, i) => (
          <div key={i} style={{ position: "absolute", left: 6 + i * 64, top: -66, width: 58,
            height: 66, background: PAPER, boxShadow: SH_S, display: "flex",
            alignItems: "center", justifyContent: "center" }}>
            <Img src={staticFile(p.paid.file)} style={{ width: 38, height: 38,
              objectFit: "contain", filter: "none" }} />
          </div>
        ))}
        {/* the break: five /mo tags land on the light pan at ~f12 */}
        {PAIRS.map((p, i) => (
          <div key={`t${i}`} style={{ position: "absolute", left: 34 + i * 64, top: -84,
            padding: "2px 7px", background: RED, boxShadow: SH_S, fontFamily: inter.fontFamily,
            fontWeight: 900, fontSize: 18, color: "#FFF8ED",
            transform: `scale(${E(f, 10 + i * 3, 19 + i * 3, 0, 1, BACK)}) rotate(-8deg)`,
            transformOrigin: "0% 100%" }}>/mo</div>
        ))}
        <div style={{ position: "absolute", left: 0, top: -128, width: 332, textAlign: "center",
          fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 30, color: RED }}>
          5 SUBSCRIPTIONS
        </div>
      </Pan>
      {/* free pan — already on the floor */}
      <Pan x={616} y={578} w={332} hang={190} z={24}>
        <div style={{ position: "absolute", left: 63, top: -150, width: 206, height: 150,
          background: "#12472F", boxShadow: SH, display: "flex", alignItems: "center",
          justifyContent: "center" }}>
          <Img src={staticFile("logos/github.svg")} style={{ width: 100, height: 100,
            objectFit: "contain", filter: "invert(1)" }} />
        </div>
        <div style={{ position: "absolute", left: 0, top: -190, width: 332, textAlign: "center",
          fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 34, color: GO_L }}>
          {TOTAL.toLocaleString("en-US")} ★
        </div>
      </Pan>
      <Cl f={f} x={404} y={452} size={148} gaze={1} shock={0.65} nodAmp={2.2} nodSpeed={14} z={34} />
      <Chip text="FREE OUTWEIGHS PAID" c={GO} size={34} />
    </Shot>

    {/* 2 · THE PAID FIVE — what is actually in the light pan */}
    <Shot f={f} a={C1} b={C2} k={1}>
      <Hall f={f} tint="#241B18" floor="#140E0C" />
      <Pool x={90} w={832} c={PAPER} o={0.13} />
      {PAIRS.map((p, i) => (
        <Foot key={`b${i}`} x={62 + i * 186} y={330} s={1.62} i={PAID.indexOf(p.paid)}
              dead={E(f, C1 + 12 + i * 3, C1 + 20 + i * 3, 0, 1, OUT)} z={30} />
      ))}
      <div style={{ position: "absolute", left: 0, right: 0, top: 246, textAlign: "center",
        zIndex: 34, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 46, color: RED,
        letterSpacing: "0.02em" }}>YOU PAY FOR ALL FIVE</div>
      <Cl f={f} x={430} y={520} size={162} gaze={0} stern={0.6} nodAmp={2.2} nodSpeed={13} z={34} />
      <Chip text="EVERY MONTH" c={RED} size={34} />
    </Shot>

    {/* 3 · THE NUMBER — the weight, named */}
    <Shot f={f} a={C2} b={C3} k={2}>
      <Hall f={f} tint="#12241E" floor="#0A1712" />
      <Pool x={300} w={412} c={GO_L} o={0.16} />
      <div style={{ position: "absolute", left: 96, top: 250, width: 820, height: 216, zIndex: 40,
        background: "#0A0E14", border: `9px solid ${GO}`, boxShadow: SH }} />
      <Count f={f} at={C2 + 3} y={286} size={126} c={GO_L} z={44} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 414, textAlign: "center", zIndex: 44,
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 38, letterSpacing: "0.14em",
        color: PAPER }}>★ ON GITHUB</div>
      <Img src={staticFile("logos/github.svg")} style={{ position: "absolute", left: 466, top: 494,
        width: 82, height: 82, objectFit: "contain", filter: "invert(1)", zIndex: 44 }} />
      <Cl f={f} x={58} y={462} size={182} gaze={2} cheer={0.88} nodAmp={3.4} nodSpeed={9} z={34} />
      <Chip text="ALL FREE" c={GO} size={34} />
    </Shot>

    {/* 4 · THE TURN */}
    <Shot f={f} a={C3} b={9999} k={3}>
      <Hall f={f} tint="#12241E" floor="#0A1712" />
      <Pool x={280} w={452} c={GO_L} o={0.16} />
      <Turn f={f} at={C3} />
      <Cl f={f} x={62} y={452} size={196} gaze={2} cheer={0.92} nodAmp={3.6} nodSpeed={8} z={36} />
      <Chip text="AND THEY'RE FREE" c={GO} size={34} />
    </Shot>
  </>));
};

/* ############################################################# H · MONOLITH
   THE OBJECT: one slab, floor to past the top of frame, with the GitHub mark
   and 176,656 cut into its face. The five paid apps stand at its base, in its
   shadow, at a tenth of its size. Rank by MASS — nothing else in the shot.
   ######################################################################### */
export const CancelHookH: React.FC = () => {
  const f = useCurrentFrame();
  const [C1, C2, C3] = CUTS2;
  return wrap(f, PAPER, sfxFor({ src: "hit-boom.wav", dur: 2.10, rate: 0.62 }), (<>
    {/* 1 · THE RANK */}
    <Shot f={f} a={0} b={C1} k={0} slamAt={12}>
      <Hall f={f} tint="#161C26" floor="#0B1017" />
      <Pool x={286} w={440} c={PAPER} o={0.14} />
      {/* the slab: it starts above the frame, so the eye cannot find its top */}
      <div style={{ position: "absolute", left: 300, top: 106, width: 412, height: 496, zIndex: 18,
        background: "#20293A", boxShadow: SH }} />
      <div style={{ position: "absolute", left: 300, top: 106, width: 30, height: 496, zIndex: 19,
        background: "#2C384C" }} />
      <Img src={staticFile("logos/github.svg")} style={{ position: "absolute", left: 442, top: 168,
        width: 128, height: 128, objectFit: "contain", filter: "invert(1)", zIndex: 22 }} />
      <div style={{ position: "absolute", left: 300, top: 328, width: 412, textAlign: "center",
        zIndex: 22, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 62, color: AMB_L,
        letterSpacing: "-0.04em", textShadow: "0 5px 0 rgba(4,6,10,0.7)" }}>
        {TOTAL.toLocaleString("en-US")}
      </div>
      <div style={{ position: "absolute", left: 300, top: 400, width: 412, textAlign: "center",
        zIndex: 22, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 27, color: "#93A2B8",
        letterSpacing: "0.2em" }}>STARS</div>
      {/* the five, in ONE row across the slab's base, tiny against it. Splitting
          them 2-left / 3-right read as an arbitrary arrangement rather than as
          a size comparison, which is the entire point of this concept. */}
      {PAIRS.map((p, i) => (
        <Foot key={i} x={76 + i * 152} y={520} s={0.72} i={PAID.indexOf(p.paid)}
              tag={E(f, 10 + i * 3, 19 + i * 3, 0, 1, BACK)} z={30} />
      ))}
      <Cl f={f} x={800} y={456} size={150} gaze={1} shock={0.72} nodAmp={2.2} nodSpeed={14}
          flip z={34} />
      <Chip text="ONE REPO EACH. $0." c={GO} size={34} />
    </Shot>

    {/* 2 · THE PAID FIVE */}
    <Shot f={f} a={C1} b={C2} k={1}>
      <Hall f={f} tint="#241B18" floor="#140E0C" />
      <Pool x={90} w={832} c={PAPER} o={0.13} />
      {PAIRS.map((p, i) => (
        <Foot key={`b${i}`} x={62 + i * 186} y={330} s={1.62} i={PAID.indexOf(p.paid)}
              dead={E(f, C1 + 12 + i * 3, C1 + 20 + i * 3, 0, 1, OUT)} z={30} />
      ))}
      <div style={{ position: "absolute", left: 0, right: 0, top: 246, textAlign: "center",
        zIndex: 34, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 46, color: RED,
        letterSpacing: "0.02em" }}>YOU PAY FOR ALL FIVE</div>
      <Cl f={f} x={430} y={520} size={162} gaze={0} stern={0.6} nodAmp={2.2} nodSpeed={13} z={34} />
      <Chip text="EVERY MONTH" c={RED} size={34} />
    </Shot>

    {/* 3 · THE NUMBER — climbing the slab face */}
    <Shot f={f} a={C2} b={C3} k={2}>
      <Hall f={f} tint="#161C26" floor="#0B1017" />
      <Pool x={200} w={612} c={PAPER} o={0.16} />
      <div style={{ position: "absolute", left: 176, top: 106, width: 660, height: 496, zIndex: 18,
        background: "#20293A", boxShadow: SH }} />
      <Count f={f} at={C2 + 3} y={214} size={140} z={44} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 372, textAlign: "center", zIndex: 44,
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 38, letterSpacing: "0.14em",
        color: PAPER }}>★ ON GITHUB</div>
      <Img src={staticFile("logos/github.svg")} style={{ position: "absolute", left: 466, top: 442,
        width: 82, height: 82, objectFit: "contain", filter: "invert(1)", zIndex: 44 }} />
      <Cl f={f} x={64} y={462} size={182} gaze={2} cheer={0.88} nodAmp={3.4} nodSpeed={9} z={34} />
      <Chip text="ALL FREE" c={GO} size={34} />
    </Shot>

    {/* 4 · THE TURN */}
    <Shot f={f} a={C3} b={9999} k={3}>
      <Hall f={f} tint="#12241E" floor="#0A1712" />
      <Pool x={280} w={452} c={GO_L} o={0.16} />
      <Turn f={f} at={C3} />
      <Cl f={f} x={62} y={452} size={196} gaze={2} cheer={0.92} nodAmp={3.6} nodSpeed={8} z={36} />
      <Chip text="AND THEY'RE FREE" c={GO} size={34} />
    </Shot>
  </>));
};

/* ################################################################ I · BOARD
   THE OBJECT: a split-flap board. Five ranked rows above a red CUT LINE, each
   a star count and a blacked-out repo name; the five things you pay for sit
   BELOW the line, greyed, with /mo against them. Rank by ORDER.
   ######################################################################### */
export const CancelHookI: React.FC = () => {
  const f = useCurrentFrame();
  const [C1, C2, C3] = CUTS2;
  return wrap(f, AMB, sfxFor({ src: "gear-stutter.wav", dur: 1.10 }), (<>
    {/* 1 · THE RANK */}
    <Shot f={f} a={0} b={C1} k={0} slamAt={12}>
      <Hall f={f} tint="#151A22" floor="#0A0E13" />
      <Pool x={130} w={752} c={AMB_L} o={0.12} />
      <div style={{ position: "absolute", left: 88, top: 118, width: 836, height: 476, zIndex: 16,
        background: "#06090D", border: `10px solid ${STEEL_D}`, boxShadow: SH }} />
      {/* five ranked rows, above the line */}
      {/* the board's own header carries the subject: GitHub, the real total, FREE */}
      <Subject x={112} y={130} s={0.86} z={26} />
      {FREE.map((r, i) => (
        <div key={r.repo} style={{ position: "absolute", left: 112, top: 194 + i * 46, width: 788,
          height: 42, zIndex: 22, background: "#10151C", display: "flex", alignItems: "center",
          gap: 14, padding: "0 16px", fontFamily: inter.fontFamily }}>
          <span style={{ fontWeight: 900, fontSize: 24, color: AMB_L, width: 34 }}>{i + 1}</span>
          <Img src={staticFile("logos/github.svg")} style={{ width: 26, height: 26,
            objectFit: "contain", filter: "invert(1)" }} />
          <div style={{ height: 18, width: 96, background: "#3A4553", borderRadius: 3 }} />
          <span style={{ fontWeight: 900, fontSize: 22, color: "#3A4553" }}>/</span>
          <div style={{ flex: 1, height: 18, background: "#3A4553", borderRadius: 3, maxWidth: 210 }} />
          <span style={{ fontWeight: 900, fontSize: 26, color: AMB_L, whiteSpace: "nowrap" }}>
            ★ {r.stars.toLocaleString("en-US")}
          </span>
          <span style={{ fontWeight: 900, fontSize: 22, color: GO_L, whiteSpace: "nowrap" }}>FREE</span>
        </div>
      ))}
      {/* the break: the red cut line SLAMS in from the left at ~f10 */}
      <div style={{ position: "absolute", left: 112, top: 432, height: 7, zIndex: 26,
        width: 788 * E(f, 10, 19, 0, 1, OUT), background: RED }} />
      <div style={{ position: "absolute", left: 112, top: 450, width: 788, height: 132, zIndex: 22,
        display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 14px" }}>
        {PAIRS.map((p, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{ width: 96, height: 96, background: "#C9C3B6", display: "flex",
              alignItems: "center", justifyContent: "center" }}>
              <Img src={staticFile(p.paid.file)} style={{ width: 60, height: 60,
                objectFit: "contain", filter: "none" }} />
            </div>
            <div style={{ marginTop: 5, fontFamily: inter.fontFamily, fontWeight: 900,
              fontSize: 20, color: RED }}>/mo</div>
          </div>
        ))}
      </div>
      {/* on the floor BELOW the board — at y=452 it stood across the Figma plate */}
      <Cl f={f} x={820} y={596} size={148} gaze={1} shock={0.7} nodAmp={2.2} nodSpeed={14}
          flip z={34} />
      <Chip text="ABOVE THE LINE IS FREE" c={AMB} size={32} />
    </Shot>

    {/* 2 · THE PAID FIVE */}
    <Shot f={f} a={C1} b={C2} k={1}>
      <Hall f={f} tint="#241B18" floor="#140E0C" />
      <Pool x={90} w={832} c={PAPER} o={0.13} />
      {PAIRS.map((p, i) => (
        <Foot key={`b${i}`} x={62 + i * 186} y={330} s={1.62} i={PAID.indexOf(p.paid)}
              dead={E(f, C1 + 12 + i * 3, C1 + 20 + i * 3, 0, 1, OUT)} z={30} />
      ))}
      <div style={{ position: "absolute", left: 0, right: 0, top: 246, textAlign: "center",
        zIndex: 34, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 46, color: RED,
        letterSpacing: "0.02em" }}>YOU PAY FOR ALL FIVE</div>
      <Cl f={f} x={430} y={520} size={162} gaze={0} stern={0.6} nodAmp={2.2} nodSpeed={13} z={34} />
      <Chip text="EVERY MONTH" c={RED} size={34} />
    </Shot>

    {/* 3 · THE NUMBER — the board totals itself */}
    <Shot f={f} a={C2} b={C3} k={2}>
      <Hall f={f} tint="#151A22" floor="#0A0E13" />
      <Pool x={150} w={712} c={AMB_L} o={0.16} />
      <div style={{ position: "absolute", left: 88, top: 190, width: 836, height: 316, zIndex: 24,
        background: "#06090D", border: `10px solid ${STEEL_D}`, boxShadow: SH }} />
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: 132 + i * 130, top: 224, width: 110,
          height: 158, zIndex: 26, background: "#0E131A", border: "3px solid #1B222B" }} />
      ))}
      <Count f={f} at={C2 + 3} y={252} size={126} z={44} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 414, textAlign: "center", zIndex: 44,
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 38, letterSpacing: "0.14em",
        color: PAPER }}>★ ON GITHUB</div>
      <Cl f={f} x={58} y={462} size={182} gaze={2} cheer={0.88} nodAmp={3.4} nodSpeed={9} z={34} />
      <Chip text="ALL FREE" c={GO} size={34} />
    </Shot>

    {/* 4 · THE TURN */}
    <Shot f={f} a={C3} b={9999} k={3}>
      <Hall f={f} tint="#12241E" floor="#0A1712" />
      <Pool x={280} w={452} c={GO_L} o={0.16} />
      <Turn f={f} at={C3} />
      <Cl f={f} x={62} y={452} size={196} gaze={2} cheer={0.92} nodAmp={3.6} nodSpeed={8} z={36} />
      <Chip text="AND THEY'RE FREE" c={GO} size={34} />
    </Shot>
  </>));
};

/* ########################################################### J · STAR FIELD
   THE OBJECT: 176,656 stars as a physical WALL, so the quantity is a thing you
   can see the size of rather than a number you have to imagine. The five paid
   apps sit on it at actual scale. Rank by QUANTITY.
   ######################################################################### */
export const CancelHookJ: React.FC = () => {
  const f = useCurrentFrame();
  const [C1, C2, C3] = CUTS2;
  const COLS = 46, ROWS = 22;
  return wrap(f, AMB, sfxFor({ src: "coin-drop.wav", dur: 0.70, rate: 1.15 }), (<>
    {/* 1 · THE RANK */}
    <Shot f={f} a={0} b={C1} k={0} slamAt={12}>
      <Hall f={f} tint="#171E29" floor="#0B1017" />
      {/* the wall of stars, complete on frame 0, still filling in at the edges */}
      <div style={{ position: "absolute", left: 40, top: 118, width: 932, height: 470, zIndex: 14,
        background: "#181307", overflow: "hidden" }}>
        {Array.from({ length: ROWS }, (_, r) => (
          <div key={r} style={{ position: "absolute", left: 4, top: 3 + r * 21, display: "flex", gap: 3 }}>
            {Array.from({ length: COLS }, (_, c) => {
              const on = rnd(r * 53 + c, 7) > 0.06;
              return <div key={c} style={{ width: 17, height: 18, display: "flex",
                alignItems: "center", justifyContent: "center", fontFamily: inter.fontFamily,
                fontSize: 15, fontWeight: 900, color: on ? AMB : "#4A3505" }}>★</div>;
            })}
          </div>
        ))}
      </div>
      {/* the five, on it, at their actual size against it */}
      {PAIRS.map((p, i) => (
        <div key={i} style={{ position: "absolute", left: 92 + i * 176, top: 300, width: 116,
          zIndex: 28 }}>
          <div style={{ width: 116, height: 116, background: PAPER, boxShadow: SH,
            display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Img src={staticFile(p.paid.file)} style={{ width: 74, height: 74,
              objectFit: "contain", filter: "none" }} />
          </div>
          <div style={{ width: 116, textAlign: "center", marginTop: 5, fontFamily: inter.fontFamily,
            fontWeight: 900, fontSize: 17, color: PAPER }}>{p.paid.short}</div>
        </div>
      ))}
      {/* ⛔ dark-brown type set straight onto the star field vanished into it.
          It needs its own solid plate, and its own column clear of the mascot. */}
      {/* the break: the plate slams onto the field at ~f10. The field and the
          five marks are the settled frame-0 state; this is what lands on it. */}
      <div style={{ position: "absolute", left: 58, top: 466, width: 726, height: 84, zIndex: 30,
        background: "#100D06", boxShadow: SH, display: "flex", alignItems: "center",
        justifyContent: "center", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 46,
        color: AMB_L, letterSpacing: "-0.02em",
        transform: `scale(${E(f, 10, 20, 0.5, 1, BACK)})`, opacity: E(f, 10, 15, 0, 1, OUT) }}>
        {TOTAL.toLocaleString("en-US")} ★ REPLACE THEM
      </div>
      <Subject x={330} y={140} s={0.9} />
      <Cl f={f} x={824} y={462} size={140} gaze={1} shock={0.68} nodAmp={2.2} nodSpeed={14}
          flip z={34} />
      <Chip text="ALL FIVE. FREE." c={GO} size={34} />
    </Shot>

    {/* 2 · THE PAID FIVE */}
    <Shot f={f} a={C1} b={C2} k={1}>
      <Hall f={f} tint="#241B18" floor="#140E0C" />
      <Pool x={90} w={832} c={PAPER} o={0.13} />
      {PAIRS.map((p, i) => (
        <Foot key={`b${i}`} x={62 + i * 186} y={330} s={1.62} i={PAID.indexOf(p.paid)}
              dead={E(f, C1 + 12 + i * 3, C1 + 20 + i * 3, 0, 1, OUT)} z={30} />
      ))}
      <div style={{ position: "absolute", left: 0, right: 0, top: 246, textAlign: "center",
        zIndex: 34, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 46, color: RED,
        letterSpacing: "0.02em" }}>YOU PAY FOR ALL FIVE</div>
      <Cl f={f} x={430} y={520} size={162} gaze={0} stern={0.6} nodAmp={2.2} nodSpeed={13} z={34} />
      <Chip text="EVERY MONTH" c={RED} size={34} />
    </Shot>

    {/* 3 · THE NUMBER */}
    <Shot f={f} a={C2} b={C3} k={2}>
      <Hall f={f} tint="#171E29" floor="#0B1017" />
      <div style={{ position: "absolute", left: 40, top: 118, width: 932, height: 470, zIndex: 14,
        background: "#181307", overflow: "hidden" }}>
        {Array.from({ length: ROWS }, (_, r) => (
          <div key={r} style={{ position: "absolute", left: 4, top: 3 + r * 21, display: "flex", gap: 3 }}>
            {Array.from({ length: COLS }, (_, c) => (
              <div key={c} style={{ width: 17, height: 18, display: "flex", alignItems: "center",
                justifyContent: "center", fontFamily: inter.fontFamily, fontSize: 15,
                fontWeight: 900, color: rnd(r * 53 + c, 7) > 0.06 ? AMB : "#4A3505" }}>★</div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", left: 116, top: 252, width: 780, height: 208, zIndex: 40,
        background: "#0A0E14", boxShadow: SH }} />
      <Count f={f} at={C2 + 3} y={282} size={126} z={44} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 410, textAlign: "center", zIndex: 44,
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 38, letterSpacing: "0.14em",
        color: PAPER }}>★ ON GITHUB</div>
      <Cl f={f} x={58} y={462} size={182} gaze={2} cheer={0.88} nodAmp={3.4} nodSpeed={9} z={34} />
      <Chip text="ALL FREE" c={GO} size={34} />
    </Shot>

    {/* 4 · THE TURN */}
    <Shot f={f} a={C3} b={9999} k={3}>
      <Hall f={f} tint="#12241E" floor="#0A1712" />
      <Pool x={280} w={452} c={GO_L} o={0.16} />
      <Turn f={f} at={C3} />
      <Cl f={f} x={62} y={452} size={196} gaze={2} cheer={0.92} nodAmp={3.6} nodSpeed={8} z={36} />
      <Chip text="AND THEY'RE FREE" c={GO} size={34} />
    </Shot>
  </>));
};
