import React from "react";
import { AbsoluteFill, Sequence, Audio, staticFile, useCurrentFrame } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx, HookHeader } from "./SlopKit";
import { Cue, SfxTrack, LEVELS, layer, repeat, db } from "./SoundKit";
import {
  S1Kill, S2Sourced, S3Name, S4Stars, S5Four, S6Doors, S7Cinema,
  S8Models, S9Named, S10Key, S11NoLimit, S12Optional, S13Cta, LotCamCtx,
} from "./LotScenes";
import { HookTwoCards, HookTear, HookPrice } from "./LotHooks";
import { CARD, INKD, GOLD, CLAY, GO, BLUE } from "./LotWorld";
import words from "./data/words_open.json";

/* ============================================================================
   REEL 90 · "OPEN" — one developer open-sourced a paid AI video studio.

   ⛔ FILE PREFIX IS `Lot`. Reel 79/80 is ALSO called "OPEN" and already owns
      OpenWorld / OpenScenes / OpenReel / OpenArcade / OpenHooks.

   World: THE BACKLOT AT NIGHT. Sound stages with roll-up doors, an overhead
   truss of lamp heads, C-stands and cable runs on the concrete, a water tower,
   and the paid platform as a tall lit building you have to pay to walk into.
   The mechanism is LIGHT: the tower goes dark, the lot comes on.

   VO: public/open_vo.wav — 34.09s (raw take 47.55s). THREE "cut cut" restarts
   removed, plus five slack gaps tightened and the 10/11s pause trimmed 0.22s
   (Alex: "extra long pause at around 10/11 seconds"). Every cut sits inside a measured
   quiet window; the B/C boundary had no -40dB gap so the 5ms RMS envelope put
   the trough at 14.58s (-59 dBFS) and the cut went there. Re-transcribed after
   splicing: 142 tokens, no flubs, nothing clipped.

   Captions: src/data/words_open.json — 140 words, 46 lines, 46/46 anchored to a
   measured RMS onset. Built by tools/build_captions.py, never hand-patched.

   ✅ REPO VERIFIED BEFORE BUILDING (the reel-84 rule).
   Anil-matcha/Open-Generative-AI — 25,503 stars, 4,480 forks, MIT.
   README: "400+ models across 14 studios"; Cinema Studio has "pro camera
   controls (Lens, Focal Length, Aperture)". Seedance/Kling/Veo all listed.

   ⛔ WHERE THE VO AND THE FACTS DIVERGE THE GRAPHIC SHOWS THE VERIFIED VERSION,
      or shows nothing at all:
        "over 10,000 stars"  → the plate rolls to the REAL 25,503, which is
                               bigger, so nothing conflicts.
        "in its first week"  → UNVERIFIABLE. First commit 2026-02-09, six months
                               ago; the repo entity dates to 2023. No "first
                               week" anywhere in the graphics.
        "four studios"       → there are 14. The four he names are all real, and
                               the graphic never claims four is the total.
        "200 AI models"      → README says 400+. On screen "200+", true and it
                               does not fight the audio.
   ⛔ Kling, Veo, Seedance and Higgsfield have no Simple Icons entry, so they are
      typographic wordmarks. A logo is never invented.
   ========================================================================== */

const FPS = 30;
export const LOT_TOTAL = 1025;                   // 34.17s; last word ends 33.51

const SCENES: { at: number; C: React.FC; head: [string, string]; label: string }[] = [
  /* ⛔ S1Kill (a tower whose lights go out) was not legible — it read as "a
        building at night". TWO CARDS replaces it: both products up at frame 0,
        the right one alarming, then flipped to a veiled FREE and the paid one
        booted out of frame. It brings its own SFX. */
  { at:    0, C: HookTwoCards, head: ["ONE GUY KILLED", "A PAID AI PLATFORM"],
                              label: "two cards — the mystery flips, the paid one is kicked out" },
  { at:  125, C: S2Sourced,   head: ["HE BUILT THE SAME THING", "AND GAVE IT AWAY"],
                              label: "open sourced — doors roll up (sourced 134 · talking 172)" },
  { at:  200, C: S3Name,      head: ["MADE BY ANIL MATCHA", "OPEN GENERATIVE AI"],
                              label: "the name (Anil 212 · the repo 236)" },
  { at:  275, C: S4Stars,     head: ["25,503 STARS", "FREE AND OPEN SOURCE"],
                              label: "the stars (10,000 282 · stars 299)" },
  { at:  333, C: S5Four,      head: ["FOUR STUDIOS", "ONE FREE APP"],
                              label: "four studios (four 347 · app 382)" },
  { at:  388, C: S6Doors,     head: ["IMAGE. VIDEO. LIP SYNC.", "ALL IN ONE PLACE"],
                              label: "three doors (400 · 406 · 416)" },
  { at:  433, C: S7Cinema,    head: ["CINEMA STUDIO", "REAL CAMERA CONTROLS"],
                              label: "the camera rig (Cinema 443 · camera 497)" },
  { at:  533, C: S8Models,    head: ["200+ AI MODELS", "IN ONE APP"],
                              label: "the model wall (200 554 · models 571)" },
  { at:  613, C: S9Named,     head: ["SEEDANCE, KLING, VEO", "ALL IN THERE"],
                              label: "the names (628 · 641 · 653)" },
  { at:  683, C: S10Key,      head: ["NO MONTHLY SUBSCRIPTION", "BRING YOUR OWN KEY"],
                              label: "sub struck out 707 · key 746 · generate 801" },
  { at:  823, C: S11NoLimit,  head: ["NO CREDIT LIMIT", "NO RECURRING BILLS"],
                              label: "the two claims (credit 840 · bills 872)" },
  { at:  893, C: S12Optional, head: ["HE MADE PAYING", "OPTIONAL"],
                              label: "optional (paying 910 · optional 973)" },
  { at:  978, C: S13Cta,      head: ["GET THE LINK", "COMMENT OPEN"],
                              label: "the CTA (Comment OPEN 993 · link 1017)" },
];

/* ============================================================================
   TRANSITIONS. A film-gate wipe: solid bars pulling across like a shutter.
   ⛔ No checkerboard — that reads as a 2004 slideshow (reel 88).
   ========================================================================== */
const GateWipe: React.FC<{ at: number; dur?: number; c?: string }> =
  ({ at, dur = 12, c = CLAY }) => {
  const f = useCurrentFrame();
  const k = f - at;
  if (k < 0 || k >= dur) return null;
  const t = k / dur;
  return (
    <AbsoluteFill style={{ zIndex: 90, pointerEvents: "none", overflow: "hidden" }}>
      {Array.from({ length: 11 }, (_, i) => {
        const lead = (i % 4) * 0.06;
        const p = Math.min(1, Math.max(0, (t - lead) * 2.1));
        const x = i % 2 ? 100 - p * 230 : -100 + p * 230;
        return (
          <div key={i} style={{ position: "absolute", left: `${x}%`,
            top: 384 + i * 72, width: "120%", height: [34, 58, 26, 46][i % 4],
            background: i % 3 === 0 ? c : i % 3 === 1 ? CARD : INKD, opacity: 0.95 }} />
        );
      })}
    </AbsoluteFill>
  );
};

const FlashCut: React.FC<{ at: number }> = ({ at }) => {
  const f = useCurrentFrame();
  const k = f - at;
  if (k < 0 || k > 3) return null;
  return <AbsoluteFill style={{ background: "#FFF3E8", opacity: (1 - k / 3) * 0.32, zIndex: 91 }} />;
};

/* ============================================================================
   SOUND. Cues in SECONDS, every one on a measured onset.
   ========================================================================== */
const A = "am/";
const s = (fr: number) => fr / FPS;

const SFX: Cue[] = [
  /* ⛔ frame 0 to 125 is TWO CARDS, and it carries its own cue list (the rising
        alarm, the flip, the kick stack, the win). Nothing here, or every one of
        those doubles. */

  /* S2 · the doors roll up on "sourced", the crowd arrives on "talking" */
  { at: s(125), src: A + "whoosh-swoosh.wav", v: LEVELS.SFX_MID, dur: 0.6 },
  ...repeat(3, s(134), 0.16, { src: A + "gear-mech.wav", v: LEVELS.SFX_MID, dur: 0.9 }, 0.07),
  { at: s(140), src: A + "lights-on.wav", v: LEVELS.SFX_MID, dur: 1.1 },
  ...layer(s(172), { src: A + "crowd-wow.wav",  v: LEVELS.SFX_MID, dur: 1.4 },
                   { src: A + "crowd-cheer.wav", v: LEVELS.SFX_TEXTURE, dur: 1.8 }),

  /* S3 · the name */
  { at: s(200), src: A + "whoosh-fast.wav", v: LEVELS.SFX_MID, dur: 0.5 },
  { at: s(212), src: A + "ui-click.wav",    v: LEVELS.SFX_MID, dur: 0.3 },
  ...layer(s(236), { src: A + "hit-up.wav",        v: LEVELS.SFX_HERO, dur: 0.8 },
                   { src: A + "positive-chime.wav", v: LEVELS.SFX_MID,  dur: 1.0 }),

  /* S4 · the star count */
  { at: s(275), src: A + "whoosh-choppy.wav", v: LEVELS.SFX_MID, dur: 0.5 },
  ...repeat(9, s(282), 0.05, { src: A + "counter-tick.wav", v: LEVELS.SFX_TEXTURE, dur: 0.22 }, 0.05),
  { at: s(302), src: A + "success-jingle.wav", v: LEVELS.SFX_MID, dur: 1.2 },

  /* S5 · four stages land */
  { at: s(333), src: A + "whoosh-fast.wav", v: LEVELS.SFX_MID, dur: 0.5 },
  ...repeat(4, s(340), 0.17, { src: A + "click-hard.wav", v: LEVELS.SFX_MID, dur: 0.4 }, 0.07),

  /* S6 · three doors, each on its own word */
  ...[400, 406, 416].flatMap((fr, i) =>
    [{ at: s(fr), src: A + "gear-mech.wav", v: LEVELS.SFX_MID, dur: 0.8,
       rate: 1 + i * 0.07, lead: 0 }]),

  /* S7 · the camera rig */
  ...layer(s(436), { src: A + "whoosh-swoosh.wav",  v: LEVELS.SFX_MID, dur: 0.6 },
                   { src: A + "film-projector.wav", v: LEVELS.SFX_TEXTURE, dur: 1.6 }),
  ...repeat(3, s(462), 0.20, { src: A + "ui-click.wav", v: LEVELS.SFX_MID, dur: 0.3 }, 0.06),
  { at: s(490), src: A + "film-roll.wav", v: LEVELS.SFX_TEXTURE, dur: 1.2 },

  /* S8 · the wall of models */
  { at: s(533), src: A + "riser-sharp.wav", v: LEVELS.SFX_MID, dur: 0.9 },
  ...repeat(12, s(547), 0.045, { src: A + "click-light.wav", v: LEVELS.SFX_TEXTURE, dur: 0.2 }, 0.05),
  { at: s(569), src: A + "hit-up.wav", v: LEVELS.SFX_MID, dur: 0.7 },

  /* S9 · three names, pitch-varied so they do not read as one buzz */
  ...[628, 641, 653].flatMap((fr, i) =>
    layer(s(fr), { src: A + "snap.wav",    v: LEVELS.SFX_MID,  dur: 0.4, rate: 1 + i * 0.08 },
                 { src: A + "click-hard.wav", v: LEVELS.SFX_TEXTURE, dur: 0.3 })),

  /* S10 · the subscription struck out, then the key */
  { at: s(683), src: A + "whoosh-flyby.wav", v: LEVELS.SFX_MID, dur: 0.6 },
  ...layer(s(700), { src: A + "marker-stroke.wav", v: LEVELS.SFX_HERO, dur: 0.8 },
                   { src: A + "error-take.wav",    v: LEVELS.SFX_MID,  dur: 0.9 }),
  ...layer(s(739), { src: A + "unlock.wav",   v: LEVELS.SFX_HERO, dur: 1.0 },
                   { src: A + "coin-drop.wav", v: LEVELS.SFX_MID,  dur: 0.7 }),
  { at: s(794), src: A + "positive-chime.wav", v: LEVELS.SFX_MID, dur: 1.0 },

  /* S11 · the two claims */
  { at: s(823), src: A + "whoosh-fast.wav", v: LEVELS.SFX_MID, dur: 0.5 },
  ...[840, 867].flatMap((fr, i) =>
    layer(s(fr), { src: A + "check-pop.wav",     v: LEVELS.SFX_MID, dur: 0.4, rate: 1 + i * 0.08 },
                 { src: A + "positive-chime.wav", v: LEVELS.SFX_TEXTURE, dur: 0.6 })),

  /* S12 · he walks past the dark tower, and the word lands */
  { at: s(893), src: A + "whoosh-swoosh.wav", v: LEVELS.SFX_MID, dur: 0.6 },
  ...repeat(4, s(909), 0.34, { src: A + "paper-rustle.wav", v: LEVELS.SFX_TEXTURE, dur: 0.4 }, 0.06),
  ...layer(s(966), { src: A + "hit-boom.wav", v: LEVELS.SFX_HERO, dur: 1.3 },
                   { src: A + "unlock.wav",   v: LEVELS.SFX_MID,  dur: 0.9 }),

  /* S13 · the CTA, and the clapper */
  ...layer(s(978), { src: A + "whoosh-fast.wav", v: LEVELS.SFX_MID, dur: 0.5 },
                   { src: A + "riser-sharp.wav", v: LEVELS.SFX_TEXTURE, dur: 0.7 }),
  ...layer(s(986), { src: A + "snap.wav",            v: LEVELS.SFX_HERO, dur: 0.6 },
                   { src: A + "crowd-applause.wav",  v: LEVELS.SFX_MID,  dur: 1.8 }),
  { at: s(1010), src: A + "success-jingle.wav", v: LEVELS.SFX_MID, dur: 1.3 },
];

/* ============================================================================
   THE VARIANTS. Reels 83/84 varied only the hook and their body delta collapsed
   to ~5, so each row swaps its OPENING and a body beat too.
   ========================================================================== */
export type Variant = {
  id: string;
  swap: Record<number, React.FC>;
  bed: string;
  wipes: number[];
  cam: { z: number; dx: number; dy: number };
  capTop: number;
  rate: number;
  note: string;
  /** ⛔ frames 0-125 have NO cues in SFX (the A hook carries its own). A variant
      that swaps the hook must bring the opening's sound with it or it opens mute. */
  hookSfx?: Cue[];
};

/* the two alternate openings, scored to their own beats */
const TEAR_SFX: Cue[] = [
  { at: s(32), src: A + "whoosh-swoosh.wav", v: LEVELS.SFX_MID, dur: 0.6 },
  ...layer(s(42), { src: A + "paper-rustle.wav", v: LEVELS.SFX_HERO, dur: 0.9 },
                  { src: A + "page-turn.wav",   v: LEVELS.SFX_TEXTURE, dur: 0.7 }),
  ...repeat(3, s(48), 0.13, { src: A + "paper-slide.wav", v: LEVELS.SFX_MID, dur: 0.5 }, 0.09),
  { at: s(62), src: A + "riser-sharp.wav", v: LEVELS.SFX_MID, dur: 1.1 },
  ...layer(s(78), { src: A + "hit-up.wav",         v: LEVELS.SFX_HERO, dur: 0.9 },
                  { src: A + "positive-chime.wav", v: LEVELS.SFX_MID,  dur: 1.1 }),
  { at: s(84), src: A + "crowd-wow.wav", v: LEVELS.SFX_TEXTURE, dur: 1.3 },
  { at: s(104), src: A + "whoosh-flyby.wav", v: LEVELS.SFX_MID, dur: 0.7 },
];

const PRICE_SFX: Cue[] = [
  ...repeat(4, s(20), 0.14, { src: A + "counter-tick.wav", v: LEVELS.SFX_TEXTURE, dur: 0.3 }, 0.08),
  { at: s(40), src: A + "riser-metal.wav", v: LEVELS.SFX_MID, dur: 1.0 },
  ...layer(s(44), { src: A + "punch.wav",    v: LEVELS.SFX_HERO, dur: 0.7 },
                  { src: A + "hit-boom.wav", v: LEVELS.SFX_MID,  dur: 1.0 }),
  { at: s(70), src: A + "whoosh-fast.wav", v: LEVELS.SFX_MID, dur: 0.5 },
  ...layer(s(82), { src: A + "snap.wav",           v: LEVELS.SFX_HERO, dur: 0.6 },
                  { src: A + "positive-chime.wav", v: LEVELS.SFX_MID,  dur: 1.1 }),
  { at: s(90), src: A + "crowd-cheer.wav", v: LEVELS.SFX_TEXTURE, dur: 1.4 },
];

export const VARIANTS: Variant[] = [
  { id: "A", swap: {}, bed: "open_bed.wav", wipes: [200, 433, 683, 978],
    cam: { z: 1.00, dx: 0, dy: 0 }, capTop: 1272, rate: 1.00,
    note: "TWO CARDS — the mystery card flips to FREE and kicks the paid one out." },
  { id: "B", swap: { 0: HookTear }, bed: "open_bed_b.wav", wipes: [275, 388, 533, 823],
    cam: { z: 1.055, dx: -20, dy: 14 }, capTop: 1244, rate: 1.00,
    hookSfx: TEAR_SFX,
    note: "THE TEAR — the subscription is ripped in half and FREE is behind it." },
  { id: "C", swap: { 0: HookPrice }, bed: "open_bed_c.wav", wipes: [333, 613, 893],
    cam: { z: 0.972, dx: 18, dy: -12 }, capTop: 1300, rate: 1.00,
    hookSfx: PRICE_SFX,
    note: "THE PRICE — $129/mo is struck out and $0 rises in its place." },
];

/** the per-scene header; `f` restarts inside each Sequence, so the settle
    animation replays on every cut for free */
const HeadFor: React.FC<{ big: string; hot: string }> = ({ big, hot }) => {
  const f = useCurrentFrame();
  return <HookHeader f={f} big={big} hot={hot} />;
};

export const makeLotReel = (V: Variant): React.FC => () => {
  const f = useCurrentFrame();
  const music =
    f < 12 ? db(-13) :
    f > LOT_TOTAL - 16 ? db(-12) * Math.max(0, (LOT_TOTAL - f) / 16) : db(-12);
  return (
    <AbsoluteFill>
      <Audio src={staticFile("open_vo.wav")} />
      <Audio src={staticFile(V.bed)} volume={music} />
      <SfxTrack cues={V.hookSfx ? [...V.hookSfx, ...SFX] : SFX} />

      <Bg />

      <LotCamCtx.Provider value={V.cam}>
      <AssemblyCtx.Provider value={true}>
        {SCENES.map((sc, i) => {
          const to = i < SCENES.length - 1 ? SCENES[i + 1].at : LOT_TOTAL;
          const C = V.swap[sc.at] ?? sc.C;
          return (
            <Sequence key={i} from={sc.at} durationInFrames={to - sc.at} layout="none">
              <AbsoluteFill><C /></AbsoluteFill>
            </Sequence>
          );
        })}
      </AssemblyCtx.Provider>
      </LotCamCtx.Provider>

      {SCENES.slice(1).map((sc, i) =>
        V.wipes.includes(sc.at)
          ? <GateWipe key={"w" + sc.at} at={sc.at - 6}
                       c={[CLAY, GOLD, GO, BLUE][V.wipes.indexOf(sc.at) % 4]} />
          : <FlashCut key={"f" + sc.at} at={sc.at} />)}

      {SCENES.map((sc, i) => {
        const to = i < SCENES.length - 1 ? SCENES[i + 1].at : LOT_TOTAL;
        return (
          <Sequence key={"h" + sc.at} from={sc.at} durationInFrames={to - sc.at} layout="none">
            <HeadFor big={sc.head[0]} hot={sc.head[1]} />
          </Sequence>
        );
      })}

      <ProgressBar />
      <KaraokeCaption words={words as any} fps={FPS} top={V.capTop} />
    </AbsoluteFill>
  );
};

export const LotReel = makeLotReel(VARIANTS[0]);
