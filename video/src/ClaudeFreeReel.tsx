import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx, HookHeader } from "./SlopKit";
import { S1Hook, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11Cta } from "./TagScenes";
import { CamCtx, camFor } from "./AgyWorld";
import { PalCtx, PAIRS, TOTAL, ThemeCtx, THEMES } from "./TagWorld";
import { SfxTrack, LEVELS, layer, repeat, Cue } from "./SoundKit";
import words from "./data/words_free.json";

/* ============================================================================
   REEL 97 · "FREE" — ten AI tools you pay for, ten that do the same job for
   nothing, and the $521 a month sitting between them.

   Board: storyboards/97-free.md.
   VO: public/free_vo.wav — 25.94s, 100 words, ships at 1.0x.

   ⛔ THE LEADING "For" IS CUT (round 5). The reel opens on "Image creation,
      this is paid, this is free." The boundary was found by MEASUREMENT, not by
      whisper's word end: five candidate cuts were transcribed in isolation and
      0.120 and 0.135 both left an audible trace of the "or"; 0.150 is the first
      that reads clean. The untrimmed take is kept at vo/free_vo_withfor.wav.
   ⛔⛔ AND THE CAPTIONS ARE ANCHORED ON THE UNTRIMMED FILE, THEN SHIFTED. Running
      the caption builder on the trimmed wav dropped anchoring from 34/34 to
      24/34, because the file now starts mid-syllable and the onset detector has
      no quiet-to-loud edge to find. A pure head trim moves every event by
      exactly the trim, so the correct operation is: anchor on the full take,
      drop the first word, subtract 0.150 from every remaining time.

   ⛔ EVERY `at` BELOW IS A MEASURED WORD ONSET from src/data/words_free.json,
      pattern-matched on the beat's opening words, never an estimate.

   THE VO CUT, so it is not re-derived:
      Raw FREE.m4a is 37.15s and contains TWO "cut cut" flubs, not one:
        1  7.50 -> 11.05   "for avatar creation, this is FREE, cut cut"
        2  25.55 -> 27.30  "for review, cut cut"
      ⛔⛔ FLUB 2 IS INVISIBLE TO A FULL-CONTEXT TRANSCRIPTION. base.en AND
         small.en both returned a clean "for video editing, this is paid, this
         is free" for that region — whisper's decoder smooths a false start away
         when it has the surrounding sentence to lean on. It only appears when
         the region is transcribed IN ISOLATION. The first cut shipped it and it
         survived as a 1.34s "editing," that no existing gate would have caught.
         The flub-finding method is now a SLIDING ISOLATED-WINDOW SCAN over the
         whole raw (3.2s window, 1.6s step), not one long-form transcript.
      Every cut taken inside measured silence (-40dB, d=0.045), head trimmed to
      the first word, every inter-island gap capped to 0.24s in the OUTPUT
      (recovered 6.27s), 0.16s tail.
      ⛔ CAPPING A GAP MEANS SHORTENING THE ROOM TONE ON THE TAIL OF THE EARLIER
         SEGMENT. atrim+concat butt segments with zero gap, so moving the NEXT
         segment's start — the obvious implementation, and the one that shipped
         first — does not shorten the pause, it eats the first phoneme of the
         line.
      37.15s -> 26.09s -> 25.94s with the "For" cut. Re-scanned in isolated
      windows: zero flub markers.
      Captions: 100 words, 34 lines, 34/34 anchored to a measured onset.

   ✅ LENGTH 25.94s — inside the 22-29s house range.
   ✅ PACE at 1.0x: hook 0-10s 3.80 wps, worst 5s window 4.20, overall 3.90.
      R1 passes with no tempo change, so there is none.

   ⛔ THE VO NAMES NOTHING. It says "this is paid, this is free" ten times and
      never speaks a single tool or price, so EVERY FACT IN THIS REEL IS ON
      SCREEN and every one of them is mine to source. All ten prices verified
      2026-08-09; the table is `PAIRS` in TagWorld.tsx and no scene carries a
      literal. Each tool is priced on its SECOND paid tier and every stand names
      the plan (round 3).

   ⚠️ ONE ROW DIFFERS FROM ALEX'S PUBLISHED CAROUSEL, deliberately. The `SWAPS`
      lead magnet pairs Framer with Durable and its own note says Durable is
      "free to build, paid to publish". A website builder you cannot publish
      from is not free, so this is the one row where the on-screen FREE would
      have been untrue. Swapped to Lovable, whose free plan deploys live to a
      lovable.app subdomain with no card. Flagged, not quietly kept.

   ⚠️ THREE ROWS ARE TRUE BUT SOFT — Buffer, GitHub Copilot and CapCut all have
      free tiers of their own. The frame shows the real paid plan and never
      claims the paid tool has no free tier.

   ⛔ ROOT owns the global chrome: Bg, the one ProgressBar, the one caption
      track, the VO and every header.
   ========================================================================== */

export const FPS = 30;
export const FREE_TOTAL = 767;      // 25.57s

/* ⛔ THE HEADER IS THE CATEGORY AND THE COUNT. NOTHING ELSE.
   Round 1 put the paid tool with its price on line 1 and the free replacement on
   line 2, on the reasoning that the VO names nothing so the header had to carry
   every fact. Alex: *"the header should just be the category, stuff like that.
   Way simpler."* He is right, and the reason is hierarchy: once the two STANDS
   carry the marks, the names and the prices at full size, a header repeating all
   four of those is a second copy of the scene competing with the scene. The
   header now labels the shelf and counts the run, which is the only thing on
   screen the stands cannot say themselves. ⛔ ZERO em dashes. */
type Scene = { at: number; C: React.FC; head: [string, string] };

export const SCENES: Scene[] = [
  /* ⭐ THE HOOK HEADER NAMES THE REEL, NOT THE ROW. Alex, round 4. Every other
     scene labels its shelf; scene 0 is the one frame guaranteed to be seen and
     it has to say what the whole thing IS before it says which row this is. The
     category moves to line 2 so nothing is lost. */
  { at: 0,   C: S1Hook, head: ["FREE VS PAID AI", "IMAGE CREATION"] },
  { at: 65,  C: S2,     head: ["AI RESEARCH", "2 OF 10"] },
  { at: 135, C: S3,     head: ["AVATAR CREATION", "3 OF 10"] },
  { at: 204, C: S4,     head: ["CODE GENERATION", "4 OF 10"] },
  { at: 274, C: S5,     head: ["VIDEO GENERATION", "5 OF 10"] },
  { at: 338, C: S6,     head: ["IMAGE EDITING", "6 OF 10"] },
  { at: 407, C: S7,     head: ["SOCIAL SCHEDULING", "7 OF 10"] },
  { at: 479, C: S8,     head: ["WEBSITE BUILDER", "8 OF 10"] },
  { at: 549, C: S9,     head: ["VIDEO EDITING", "9 OF 10"] },
  { at: 618, C: S10,    head: ["VOICE GENERATION", "10 OF 10"] },
  { at: 699, C: S11Cta, head: ["THAT IS $521 A MONTH", "COMMENT FREE FOR THE LIST"] },
];

/** the two hits inside each beat, ROOT frames.
    ⛔⛔ READ FROM `words_free.json`, WHOSE LINES ARE ANCHORED TO RMS ONSETS
    MEASURED OFF THE WAV — not from the raw whisper transcript. Round 2:
    *"the free side pops out too late, it's not properly synced to my voice."*
    The raw-transcript version of these arrays was 2 to 13 frames LATE on every
    single hit (mean 4.3f on paid, and 13f on rows 3 and 8). The caption builder
    already does this measurement; taking the numbers from anywhere else throws
    it away. ⛔ The SFX fire on these exact frames; the PICTURE leads them by 4
    (see `LEAD_V` in TagScenes) so its crossover, not its start, lands on the
    syllable. */
const PAID = [26, 98, 171, 242, 303, 370, 442, 513, 581, 661];
const FREE = [51, 120, 181, 260, 325, 393, 461, 525, 604, 682];

/* ---- THE SFX BANK ---------------------------------------------------------
   ⛔ COUNT GESTURES, NOT CUES. Each beat runs exactly three: the CUT, the PAID
      slam, the FREE flip. A `repeat()` run is one gesture, so a typing run under
      a beat whose primary action is the typing does not make a fourth.
   ⛔ LAYER THE HERO HIT 3 DEEP: attack + low-end body + texture. One thin pop is
      the single thing that makes a reel feel cheap.
   ⭐ THE TEXTURE LAYER IS WHERE THE MEANING LIVES. `cash-register` under every
      paid slam and `coin-drop` under every free flip mean the sound says what
      the picture says, in a vocabulary nobody has to learn.
   ⛔ TEN IDENTICAL HITS READ AS A GLITCH, NOT AS A RHYTHM. Every slam and every
      flip is pitched up the row index so the ten arrivals read as ONE rising
      gesture — the same trick reel 96 used across three snaps, run over ten.
   ⛔ RISERS CAPPED AT 2 — this reel's two real turns are the last flip (the bill
      reaches $0) and the keyword. Not the open: a riser there would fight the
      heaviest cue stack in the reel.
   -------------------------------------------------------------------------- */
const A_ = "am/";
const WHOOSH = ["whoosh-swoosh.wav", "whoosh-fast.wav", "whoosh-choppy.wav", "whoosh-flyby.wav"];

const SFX: Cue[] = [
  /* ⛔ FRAME 0 GETS THE HEAVIEST STACK IN THE REEL — it is the interrupt, and
     THE-OPEN law 4 says frame 0 is the loudest hit of the open. Five cues: the
     impact, the body, the till, the room and the first pip. */
  ...layer(0, { src: A_ + "hit-boom.wav", v: LEVELS.SFX_HERO, dur: 2.0 },
              { src: A_ + "punch.wav", v: LEVELS.SFX_MID, dur: 1.0 }),
  { at: 0, src: A_ + "room-tone.wav", v: LEVELS.SFX_BED, dur: 3.4, lead: 0 },
  { at: 0, src: A_ + "counter-tick.wav", v: LEVELS.SFX_TEXTURE, dur: 1.1, lead: 0 },
  /* ⛔⛔ TWO RUNS WERE DELETED HERE, AND THE REASON IS THE POINT: they were
     sounding actions that no longer exist on screen. A nine-tap run scored the
     fanned deck (removed in the layout pass) and a seven-tap keyboard run
     scored the prompt typing (the prompt is settled at frame 0 now). A cue for
     something that is not happening is worse than no cue — and together they
     were 16 of the 72 transients that put the mix at 2.76/s against a 1.0-2.5
     target, i.e. the density failure and the hierarchy failure had one cause. */


  /* ---- the ten CUTS. rotated across four whooshes so no two consecutive
     boundaries share a sound. ⛔ scene 0 has no cut; the reel starts on it. --- */
  ...SCENES.slice(1).map((sc, i): Cue => ({
    at: sc.at / FPS, src: A_ + WHOOSH[i % 4], v: LEVELS.SFX_MID, dur: 0.9,
    rate: 0.94 + (i % 3) * 0.06, lead: 2,
  })),

  /* ---- the ten PAID slams: attack + body + till, pitched up the run -------- */
  ...PAID.flatMap((f, i): Cue[] => {
    const r = 0.93 + i * 0.015;
    return [
      { at: f / FPS, src: A_ + "punch.wav", v: LEVELS.SFX_HERO, dur: 0.85, rate: r, lead: 1 },
      { at: f / FPS, src: A_ + "hit-boom.wav", v: LEVELS.SFX_MID, dur: 1.25, rate: r * 0.96, lead: 2 },
      { at: f / FPS, src: A_ + "cash-register.wav", v: LEVELS.SFX_MID, dur: 1.0, rate: r, lead: 0 },
    ];
  }),

  /* ---- the ten RUMBLES: the anticipation layer under each reveal ----------
     ⛔ ONE GESTURE, NOT A SECOND CUE. The rumble and the pull it resolves into
     are the same gesture — the rumble is its attack. It is synthesized
     (brown noise + a 38 Hz floor tone + an exponential swell), because the AM
     pack has no rumble: ring-low is a bell and film-roll is a rattle.
     ⛔ NOT A RISER. Risers are capped at 2 per reel and this is ten of them; it
     stays a rumble by having no pitch sweep and by sitting at TEXTURE level. */
  ...FREE.map((f, i): Cue => ({
    at: (f - 19) / FPS, src: A_ + "rumble-build.wav", v: LEVELS.SFX_TEXTURE,
    dur: 0.86, rate: 0.97 + i * 0.006, lead: 0,
  })),

  /* ---- the cloth shiver: the shake made audible ---------------------------
     ⭐ Round 9: *"have some sort of slight shaking sound effect as well
     playing."*  Synthesized (the pack has no rustle but paper-rustle, which is
     paper). Band-passed noise with a 15 Hz flutter: fabric under strain is a
     broadband stutter, not a tone.
     ⛔ THE HOOK GETS ITS OWN, LONGER AND LOUDER, because the hook shakes from
     frame 0 and a sound that starts two thirds of a second in would contradict
     the picture. */
  { at: 0, src: A_ + "cloth-shiver.wav", v: LEVELS.SFX_TEXTURE, dur: 1.90, rate: 0.94, lead: 0 },
  ...FREE.slice(1).map((f, i): Cue => ({
    at: (f - 22) / FPS, src: A_ + "cloth-shiver.wav", v: LEVELS.SFX_BED,
    dur: 0.78, rate: 1.02 + i * 0.008, lead: 0,
  })),

  /* ---- the ten FREE flips: the lock bursting + the money coming back ------- */
  ...FREE.flatMap((f, i): Cue[] => {
    const r = 0.95 + i * 0.017;
    return [
      { at: f / FPS, src: A_ + "unlock.wav", v: LEVELS.SFX_MID, dur: 0.75, rate: r, lead: 1 },
      { at: f / FPS, src: A_ + "coin-drop.wav", v: LEVELS.SFX_MID, dur: 0.9, rate: r, lead: 0 },
      { at: f / FPS, src: A_ + "check-pop.wav", v: LEVELS.SFX_TEXTURE, dur: 0.5, rate: r, lead: 0 },
    ];
  }),

  /* ⛔⛔ EVERY TEXTURE RUN THAT USED TO LIVE HERE IS GONE, AND IT IS THE SAME
     MISTAKE TWICE. Round 1 deleted two runs for scoring things that had been
     removed from the picture; these five (typing under the code editor, a film
     roll under the filmstrip, clicks under the calendar and the page blocks, a
     shutter on the upscale) scored the ten PRODUCT SURFACES, which round 1 then
     unmounted. A cue for an action that is not happening is worse than no cue.
     ⭐ What replaces them is the one texture this world actually has: a gallery
     room tone under the whole reel. */
  { at: 0, src: A_ + "room-tone.wav", v: LEVELS.SFX_BED, dur: 9.0, lead: 0 },
  { at: 8.6, src: A_ + "room-tone.wav", v: LEVELS.SFX_BED, dur: 9.0, lead: 0 },
  { at: 17.2, src: A_ + "room-tone.wav", v: LEVELS.SFX_BED, dur: 8.8, lead: 0 },

  /* ---- RISER 1 OF 2 · pre-rolled its full length so its peak lands ON the
     last flip at 23.07s, where the rail reaches $0. That is the peak, not the
     cut before it. ------------------------------------------------------- */
  { at: 682 / FPS - 1.35, src: A_ + "riser-metal.wav", v: LEVELS.SFX_MID, dur: 1.45, lead: 0 },
  ...layer(682 / FPS, { src: A_ + "success-jingle.wav", v: LEVELS.SFX_MID, dur: 1.9 },
                       { src: A_ + "positive-chime.wav", v: LEVELS.SFX_MID, dur: 1.5 }),

  /* ---- the CTA: the wall lights, then RISER 2 into the keyword ------------ */
  /* ten marks land, ten pings — one gesture, and the only run in the reel
     where the count is load-bearing (it IS the ten). */
  ...repeat(10, 701 / FPS, 2.4 / FPS, { src: A_ + "ping.wav", v: LEVELS.SFX_TEXTURE, dur: 0.5 }, 0.045),
  { at: 709 / FPS - 1.10, src: A_ + "riser-sharp.wav", v: LEVELS.SFX_MID, dur: 1.20, lead: 0 },
  /* ⛔ HARD CUT ON THE KEYWORD, AND THE KEYWORD IS THE FIRST ONE. The VO says
     "Follow and comment FREE for the list of every free tool" — the word the
     viewer is being asked to type lands at f713, not at the closing "free" at
     f760. The stamp is on 713; 760 gets the send. */
  ...layer(709 / FPS, { src: A_ + "hit-up.wav", v: LEVELS.SFX_HERO, dur: 1.4 },
                       { src: A_ + "unlock.wav", v: LEVELS.SFX_MID, dur: 0.9 }),
  ...layer(756 / FPS, { src: A_ + "positive-chime.wav", v: LEVELS.SFX_MID, dur: 1.5 },
                       { src: A_ + "crowd-cheer.wav", v: LEVELS.SFX_MID, dur: 1.8 }),
];

/* ===========================================================================
   THE VARIANT FACTORY. ⛔ `makeReel(variant)`, never a copied file, so one fix
   lands in every cut. ⚠️ The bed lever is passage-level: reels 94/95/96 take
   "Every Living Breathing Moment" at 15.0 / 52.0 / 80.0 / 33.0 / 8.0 / 66.0, so
   this one takes 44.0 and no two reels share an audio fingerprint.
   ======================================================================== */
export type TransKind = "flash" | "bars" | "punch" | "slide";
export type Variant = {
  id: string; label: string; theme: number; bed: string; seed: number; pal: number;
  trans: TransKind; capTop: number; endHold: number;
};

/* ⛔ THREE CUTS, ONE ARGUMENT. What varies is the WORLD (theme), the bed
   PASSAGE, the per-scene camera offset, the transition grammar and the caption
   band. What does NOT vary is the ranking chassis, the ten pairs, the prices or
   the timing — those are the reel.
   ⚠️ The bed lever is passage-level: reels 94/95/96 take "Every Living Breathing
   Moment" at 15.0 / 52.0 / 80.0 / 33.0 / 8.0 / 66.0, so these take 44.0 / 24.0 /
   96.0 and no two cuts anywhere share an audio fingerprint. */
export const VARIANTS: Variant[] = [
  { id: "a", label: "THE GALLERY · behind glass, behind a rope", theme: 0,
    bed: "free_bed.wav",   seed: 0, pal: 0, trans: "flash", capTop: 1268, endHold: 0 },
  { id: "b", label: "THE READING ROOM · chained to the lectern", theme: 1,
    bed: "free_bed_b.wav", seed: 5, pal: 0, trans: "bars",  capTop: 1232, endHold: 0 },
  { id: "c", label: "THE COIN-OP · feed the slot", theme: 2,
    bed: "free_bed_c.wav", seed: 9, pal: 0, trans: "punch", capTop: 1300, endHold: 0 },
  { id: "d", label: "THE ODYSSEY · lashed to the column, raised on shoulders", theme: 3,
    bed: "free_bed_d.wav", seed: 13, pal: 0, trans: "slide", capTop: 1256, endHold: 0 },
  { id: "e", label: "THE GLASSHOUSE · under a locked cloche", theme: 4,
    bed: "free_bed_e.wav", seed: 5, pal: 0, trans: "flash", capTop: 1272, endHold: 0 },
  { id: "f", label: "THE CAGE · behind bars, padlocked", theme: 5,
    bed: "free_bed_f.wav", seed: 21, pal: 0, trans: "bars", capTop: 1288, endHold: 0 },
];

/** ⛔ A DIFFERENT TRANSITION PER CUT, so the boundary frames — where a
    near-duplicate check looks hardest — never match across variants. */
const Trans: React.FC<{ at: number; kind: TransKind }> = ({ at, kind }) => {
  const f = useCurrentFrame();
  const k = f - at;
  const len = kind === "flash" ? 2 : 3;
  if (k < 0 || k > len) return null;
  const p = k / len;
  if (kind === "flash") return <div style={{ position: "absolute", inset: 0,
    background: "#EDF2E6", opacity: (1 - p) * 0.20, zIndex: 140, pointerEvents: "none" }} />;
  if (kind === "bars") return (<div style={{ position: "absolute", inset: 0, zIndex: 140,
    pointerEvents: "none" }}>
    {[0, 1, 2, 3].map((i) => (
      <div key={i} style={{ position: "absolute", left: 0, right: 0, top: `${i * 25}%`,
        height: `${(1 - p) * 12.5}%`, background: "#0E1218", opacity: 0.9 }} />
    ))}
  </div>);
  if (kind === "punch") return <div style={{ position: "absolute", inset: 0, zIndex: 140,
    pointerEvents: "none", background: "#0B0F14", opacity: (1 - p) * 0.5,
    transform: `scale(${1 + (1 - p) * 0.06})` }} />;
  return (<div style={{ position: "absolute", inset: 0, zIndex: 140, pointerEvents: "none",
    overflow: "hidden" }}>
    <div style={{ position: "absolute", top: 0, bottom: 0, left: `${-100 + p * 100}%`,
      width: "100%", background: "#0E1218", opacity: 0.86 }} />
  </div>);
};

/** ⛔ the header must be SETTLED on frame 0 — it fades in over 0.34s, and frame
    0 is the one frame guaranteed to be seen (THE-OPEN law 4). */
const HeadFor: React.FC<{ big: string; hot: string; settled?: boolean }> =
  ({ big, hot, settled }) => {
  const f = useCurrentFrame();
  return <HookHeader f={settled ? f + 12 : f} big={big} hot={hot} />;
};

export const makeReel = (v: Variant): React.FC => () => {
  const TOTAL_F = FREE_TOTAL + v.endHold;
  return (
  <AbsoluteFill>
    <Audio src={staticFile("free_vo.wav")} />
    {/* ⭐ THE FREQUENCY-POCKET BED (docs/SOUND-DESIGN.md §3): three EQ notches
        where the voice lives (450 Hz body, 1.4 kHz presence, 2.8 kHz clarity)
        plus a sidechain keyed off the VO, then loudnorm.
        ⛔ THE POINT IS NOT "TURN THE MUSIC DOWN" — that makes it thin and it
        still masks. Because the pocket exists the bed runs HOTTER and is
        actually audible. Reel 79's lesson: "the music is too quiet" is
        arithmetic, not taste. */}
    <Audio src={staticFile(v.bed)} />
    <SfxTrack cues={SFX} />
    <Bg />

    <AssemblyCtx.Provider value={true}>
      <ThemeCtx.Provider value={v.theme}>
      <PalCtx.Provider value={v.pal}>
        {SCENES.map((sc, i) => {
          const to = i < SCENES.length - 1 ? SCENES[i + 1].at : TOTAL_F;
          const C = sc.C;
          return (
            <Sequence key={sc.at} from={sc.at} durationInFrames={to - sc.at} layout="none">
              <CamCtx.Provider value={camFor(v.seed, i)}>
                <AbsoluteFill><C /></AbsoluteFill>
              </CamCtx.Provider>
            </Sequence>
          );
        })}
      </PalCtx.Provider>
      </ThemeCtx.Provider>
    </AssemblyCtx.Provider>

    {SCENES.slice(1).map((sc) => <Trans key={"t" + sc.at} at={sc.at} kind={v.trans} />)}

    {SCENES.map((sc, i) => {
      const to = i < SCENES.length - 1 ? SCENES[i + 1].at : TOTAL_F;
      return (
        <Sequence key={"h" + sc.at} from={sc.at} durationInFrames={to - sc.at} layout="none">
          <HeadFor big={sc.head[0]} hot={sc.head[1]} settled={i === 0} />
        </Sequence>
      );
    })}

    <ProgressBar />
    <KaraokeCaption words={words as any} fps={FPS} top={v.capTop} />
  </AbsoluteFill>
  );
};

export const FreeReel  = makeReel(VARIANTS[0]);
export const FreeReelB = makeReel(VARIANTS[1]);
export const FreeReelC = makeReel(VARIANTS[2]);
export const FreeReelD = makeReel(VARIANTS[3]);
export const FreeReelE = makeReel(VARIANTS[4]);
export const FreeReelF = makeReel(VARIANTS[5]);
