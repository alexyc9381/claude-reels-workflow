import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx, HookHeader } from "./SlopKit";
import { S0Hook, S1, S2, S3, S4, S5, S6, S7, S8, S9Cta } from "./AppScenes";
import { CamCtx, PalCtx } from "./AppWorld";
import { camFor } from "./AgyWorld";
import { SfxTrack, LEVELS, layer, repeat, db, Cue } from "./SoundKit";
import words from "./data/words_apple.json";

/* ===========================================================================
   REEL 100 · "APPLE" — Apple's design language exists as a set of real
   numbers; a Claude skill carries those numbers, so you can point it at the
   site you already have and it names every place the site misses them.

   Board: storyboards/100-apple.md.

   VO: public/100_apple_vo.wav — 22.76s, 117 words.
   ⛔ THE RAW TAKE HAD FIVE `cut cut` FLUBS and three regions came out:
      4.90->13.16s (two dead takes of the "instead of telling Claude" line),
      25.99->29.17s and 32.15->40.70s. Every cut boundary was taken from
      `silencedetect -40dB:d=0.045` on the 48k wav, never from whisper word
      times ([[feedback_vo_cut_to_silence_not_whisper]] — whisper's `end` runs
      150-200ms early). Two internal pauses were capped to 0.32s. 49.09s raw ->
      24.34s cut -> 22.76s at atempo 1.07.
   ✅ THE CUT WAV WAS RE-TRANSCRIBED AND IS CLEAN: zero `cut cut`, zero adjacent
      duplicate takes, all 117 words present. The splice is a single
      filter_complex atrim/concat, NOT `-c copy` — a `-c copy` wav concat writes
      the first segment's RIFF size and fools ffprobe while whisper reads a
      truncated file (reel 99 lost a build to exactly that).

   ⚠️ TWO THINGS FLAGGED, NEITHER SILENTLY "FIXED":
      1. "tell it to AUDIT your own website" — both whisper small.en and
         medium.en hear "auto". It is the only word the sentence supports and
         the next line ("it will notice so many minor details that are wrong")
         confirms an audit, so the caption reads "audit". Alex's call if he
         wants it re-recorded.
      2. The VO's "someone just turned Apple's design language into a skill"
         names no repo, maker or number, and research found several such skills
         with no dominant one (chaos-xxl/apple-design-skill, 15★ MIT, is the
         closest match to what is described; dickwu/apple-design-skill, 57★, is
         an HIG reviewer for Flutter/Tauri/Electron, not websites).
         ⛔ SO THERE IS NO STAR COUNT, NO FORK COUNT AND NO MAKER PLATE IN THIS
            REEL. Every number on screen is a real design TOKEN quoted from the
            skill's own design-tokens.md / typography.md, and the reel
            dramatises the MECHANISM — which is fully sourceable — and stops at
            the edge of the claim (docs/KICKOFF-PROMPT.md §1).

   ⛔⛔ EVERY `at` BELOW IS A MEASURED WORD ONSET from src/data/words_apple.json,
      pattern-matched on the beat's opening word, never an estimate. The SFX
      fire on these seconds; the PICTURE leads them by 4 frames inside the
      scenes, so its crossover — not its start — lands on the syllable.

   ⛔ ROOT OWNS THE GLOBAL CHROME: Bg, the one continuous ProgressBar, the one
      KaraokeCaption track, the VO, the bed and every header. Scene bodies see
      AssemblyCtx = true so their own copies return null.
   ========================================================================= */

export const FPS = 30;
export const APP_TOTAL = 683;      // 22.76s of VO

type Scene = { at: number; C: React.FC; head: [string, string] };

/* ⛔ HEADERS STATE THE CLAIM IN PRODUCT NOUNS, THEY NEVER ECHO THE VO OR THE
   THEME ([[feedback_headers_state_the_claim]]). The picture already carries the
   world; the header is the reel's one LITERAL channel, so it spends itself on
   real nouns a Claude Code viewer recognises — the token names, the px values,
   the hex, DevTools — none of which the audio carries. */
export const SCENES: Scene[] = [
  /* ⛔ THE HOOK HEADER SAYS WHAT YOU GET, not who made it and not how many
     stars it has. There is no star count anywhere in this reel; see the header. */
  { at: 0,   C: S0Hook, head: ["APPLE'S DESIGN RULES", "AS A CLAUDE SKILL"] },
  { at: 77,  C: S1,     head: ['"MAKE IT BETTER" IS NOT A SPEC', "SO CLAUDE GUESSES"] },
  { at: 134, C: S2,     head: ["TOKENS, NOT VIBES", "100px · 980px · #1D1D1F"] },
  /* ⛔ THE HEADER USED TO SAY "START BLANK" AND THE SCENE USED TO SHOW SIX
     BLANK SHEETS. Both were wrong: the rack is now four finished sites with
     the Claude who built each one, so the header states the same claim
     without contradicting the picture. */
  { at: 190, C: S3,     head: ["MOST PEOPLE BUILD NEW", "A SITE FROM SCRATCH"] },
  { at: 249, C: S4,     head: ["POINT IT AT THE SITE YOU HAVE", "IT UPGRADES, NOT REBUILDS"] },
  { at: 329, C: S5,     head: ["DROP THE SKILL IN", "THEN ASK FOR AN AUDIT"] },
  { at: 410, C: S6,     head: ["IT FLAGS WHAT YOU CANNOT SEE", "SPACING · WIDTH · CONTRAST"] },
  { at: 490, C: S7,     head: ["THE MANUAL WAY", "HOURS IN DEVTOOLS"] },
  { at: 558, C: S8,     head: ["THE ACTUAL RULES, APPLIED", "SF PRO · 600 · 980px"] },
  { at: 629, C: S9Cta,  head: ["COMMENT APPLE", "FOR THE SKILL"] },
];

/* ---- THE SFX BANK ---------------------------------------------------------
   ⛔⛔ MEASURE A SAMPLE BEFORE TRUSTING IT ([[reference_reel_sound_design]] —
      reel 99 shipped a bank whose most-used sample measured 0.477 spectral
      flatness and the whole reel read as "fuzzy"). Nothing above 0.45 flatness
      and nothing broadband pitched below 0.85. This bank is the counting-house
      bank's MEASURED subset, re-cast for a room made of paper, wood, steel
      tools and struck plates: impact_deep 0.001, slate_whump 0.003,
      pickup_chime 0.005, sub 0.013, bell/temper_chime 0.022/0.028,
      lib_riser 0.034, metal_riser 0.034, pneu_thunk 0.036, mech_clank 0.041,
      metal_ping 0.073, gold_stamp 0.277.
   ⛔ A `repeat()` RUN IS ONE GESTURE, and no scene runs more than four.
   ⛔ LAYER THE HERO HIT: attack + low-end body. One thin pop is the single
      thing that makes a reel sound cheap.
   ⛔ RISERS CAPPED AT 2, spent on the reel's two real turns: the skill loading
      into the console (11.90s) and the rules landing on the page (18.73s).
      ⛔ S6's sweep deliberately uses a WHOOSH, not a third riser.
   ------------------------------------------------------------------------ */
const SFX: Cue[] = [
  /* ---- S0 · THE OPEN.  ⛔ RE-TIMED FOR THE BURST.
     The hook is no longer "a card lands, then two cuts" — it is BURST (f8 =
     0.27s) -> STORM (0.90s) -> ASSEMBLE (1.80s), so the bank has to carry an
     explosion and then a continuous rush rather than three tidy taps. The
     scatter run is ONE gesture, and the storm's passes are another. ------- */
  { at: 0.00, src: "am/room-tone.wav", v: LEVELS.SFX_BED, dur: 3.2 },
  /* THE BURST — the card comes apart and fourteen tokens leave it */
  ...layer(0.27, { src: "impact_deep.wav", v: LEVELS.SFX_HERO, dur: 1.4, rate: 0.92 },
                 { src: "sub.wav", dur: 1.2, rate: 0.86 }),
  { at: 0.27, src: "slate_whump.wav", v: LEVELS.SFX_HERO, dur: 0.55, rate: 1.02 },
  { at: 0.29, src: "mech_clank.wav", v: LEVELS.SFX_MID, dur: 0.5, rate: 1.08 },
  /* the chips scattering out of it, pitched UP across the run */
  ...repeat(9, 0.34, 0.052, { src: "metal_ping.wav", v: LEVELS.SFX_TEXTURE, dur: 0.32 }, 0.055),
  /* CUT 2 · THE STORM — a rush, and the tokens going past camera */
  ...layer(0.90, { src: "lib_whoosh.wav", v: LEVELS.SFX_MID, dur: 0.8, rate: 0.96 },
                 { src: "pickup_chime.wav", dur: 0.4, rate: 1.1 }),
  ...repeat(7, 0.98, 0.105, { src: "metal_ping.wav", v: LEVELS.SFX_TEXTURE, dur: 0.3 }, 0.04),
  /* CUT 3 · THE ASSEMBLE — they land as the wall, and the screens wake */
  ...layer(1.80, { src: "lib_whoosh.wav", v: LEVELS.SFX_MID, dur: 0.6, rate: 1.12 },
                 { src: "pneu_thunk.wav", dur: 0.45, rate: 0.94 }),
  ...repeat(3, 1.86, 0.14, { src: "temper_chime.wav", v: LEVELS.SFX_TEXTURE, dur: 0.45 }, 0.09),

  /* ---- S1 · THE VAGUE ASK. A cheerful chime under a bad result. ------- */
  ...layer(2.70, { src: "am/paper-slide.wav", v: LEVELS.SFX_MID, dur: 0.5 },
                 { src: "mech_clank.wav", dur: 0.4, rate: 1.04 }),
  { at: 3.55, src: "am/positive-chime.wav", v: LEVELS.SFX_MID, dur: 0.7, rate: 1.06 },

  /* ---- S2 · THREE PLATES SEAT, pitched UP so the run rises. ----------- */
  ...layer(4.60, { src: "gold_stamp.wav", v: LEVELS.SFX_HERO, dur: 0.5, rate: 0.98 },
                 { src: "metal_ping.wav", dur: 0.4, rate: 1.00 }),
  ...layer(5.13, { src: "gold_stamp.wav", v: LEVELS.SFX_HERO, dur: 0.5, rate: 1.08 },
                 { src: "metal_ping.wav", dur: 0.4, rate: 1.12 }),
  ...layer(5.60, { src: "gold_stamp.wav", v: LEVELS.SFX_HERO, dur: 0.5, rate: 1.18 },
                 { src: "metal_ping.wav", dur: 0.4, rate: 1.24 }),
  { at: 5.92, src: "temper_chime.wav", v: LEVELS.SFX_MID, dur: 0.6 },

  /* ---- S3 · THE BLANK RACK. One run, pitched DOWN as it recedes.
     ⛔ RE-TIMED WITH THE PICTURE: the boards used to flip in place over
        f6..f38; they now DROP IN and land at f17+i*7, i.e. 6.90 to 8.30s. The
        run is pulled 0.08s early so its tail clears the S4 cut at 8.30. ---- */
  ...repeat(7, 6.82, 0.222, { src: "pneu_thunk.wav", v: LEVELS.SFX_MID, dur: 0.32 }, -0.045),

  /* ---- S4 · YOUR BOARD. It seats on the easel, then he walks in. ------ */
  { at: 8.44, src: "lib_whoosh.wav", v: LEVELS.SFX_MID, dur: 0.6, rate: 0.94 },
  /* the board seating — the new largest mover in the scene gets the hit */
  ...layer(9.26, { src: "slate_whump.wav", v: LEVELS.SFX_HERO, dur: 0.6, rate: 0.92 },
                 { src: "pneu_thunk.wav", dur: 0.4, rate: 0.9 }),
  ...repeat(4, 9.62, 0.24, { src: "am/counter-tick.wav", v: LEVELS.SFX_TEXTURE, dur: 0.3 }, 0.05),
  { at: 10.70, src: "slate_whump.wav", v: LEVELS.SFX_MID, dur: 0.5, rate: 0.96 },

  /* ---- S5 · THE POST. RISER 1 OF 2 lands on the rules loading.
     ⛔ THE TYPING TICKS CAME OUT AND THE PLATE RUN WENT IN. The scene's second
        half is no longer a cursor — it is four rule plates rising out of the
        console, landing at 12.57 / 12.87 / 13.17 / 13.47, and the sound has to
        be on the plates, not on the text. Still four gestures. ------------- */
  { at: 11.33, src: "am/paper-slide.wav", v: LEVELS.SFX_MID, dur: 0.5, rate: 1.05 },
  ...layer(11.80, { src: "pneu_thunk.wav", v: LEVELS.SFX_HERO, dur: 0.45 },
                  { src: "mech_clank.wav", dur: 0.5, rate: 0.98 }),
  { at: 11.90, src: "lib_riser.wav", v: LEVELS.SFX_MID, dur: 0.6, rate: 1.06 },
  ...repeat(4, 12.57, 0.30, { src: "gold_stamp.wav", v: LEVELS.SFX_MID, dur: 0.45 }, 0.06),

  /* ---- S6 · THE REVEAL. 14 pings, pitch stepping UP across the run.
     ⛔ RE-TIMED: the tag run was stretched from f16..f52 to f10..f57 to kill an
        18-frame dead tail, so the pings move to 14.00..15.56 at 0.12 spacing
        and the hero impact moves onto the fourteenth, not ahead of it. ------ */
  { at: 13.80, src: "lib_whoosh.wav", v: LEVELS.SFX_MID, dur: 0.7, rate: 0.92 },
  ...repeat(14, 14.00, 0.12, { src: "metal_ping.wav", v: LEVELS.SFX_MID, dur: 0.34 }, 0.035),
  ...layer(15.62, { src: "impact_deep.wav", v: LEVELS.SFX_HERO, dur: 1.2, rate: 0.90 },
                  { src: "sub.wav", dur: 1.0, rate: 0.86 }),

  /* ---- S7 · THE GRIND. Fast, dry, and going nowhere. ------------------ */
  { at: 16.48, src: "am/gear-mech.wav", v: LEVELS.SFX_BED, dur: 2.1, rate: 0.9 },
  ...repeat(7, 16.60, 0.14, { src: "am/counter-tick.wav", v: LEVELS.SFX_MID, dur: 0.28 }, 0.02),
  { at: 17.75, src: "ratchet.wav", v: LEVELS.SFX_MID, dur: 0.45, rate: 0.86 },
  { at: 18.41, src: "slate_whump.wav", v: LEVELS.SFX_MID, dur: 0.5, rate: 0.92 },

  /* ---- S8 · THE PEAK. RISER 2 OF 2, then four corrections. ------------ */
  { at: 18.73, src: "metal_riser.wav", v: LEVELS.SFX_MID, dur: 0.55, rate: 1.24 },
  ...layer(19.06, { src: "lib_cinematic_hit.wav", v: LEVELS.SFX_HERO, dur: 1.3, rate: 1.0 },
                  { src: "sub.wav", dur: 1.0, rate: 0.9 }),
  /* one chime per correction, on its own measured onset, pitched up the run */
  { at: 19.10, src: "temper_chime.wav", v: LEVELS.SFX_MID, dur: 0.6, rate: 0.96 },
  { at: 19.47, src: "temper_chime.wav", v: LEVELS.SFX_MID, dur: 0.6, rate: 1.06 },
  { at: 19.89, src: "temper_chime.wav", v: LEVELS.SFX_MID, dur: 0.6, rate: 1.14 },
  { at: 20.38, src: "temper_chime.wav", v: LEVELS.SFX_MID, dur: 0.6, rate: 1.22 },
  { at: 20.62, src: "arrive_chime.wav", v: LEVELS.SFX_MID, dur: 0.9 },

  /* ---- S9 · THE KEYWORD. Hard cut on it.
     ⛔ RE-TIMED ACROSS THE WHOLE CTA. v1 spent every beat by f26 and held for
        28 frames; the card now lands at 21.50, stamps SENT at 21.90, sets
        the keyword at 22.10 and lights the rule wall behind it to 22.77, so
        each of the four gets its own cue instead of two cues and a hold. ---- */
  ...layer(21.16, { src: "gold_stamp.wav", v: LEVELS.SFX_HERO, dur: 0.6, rate: 0.96 },
                  { src: "lib_cinematic_hit.wav", dur: 1.2, rate: 1.04 }),
  { at: 21.62, src: "stamp_press.wav", v: LEVELS.SFX_MID, dur: 0.5, rate: 0.98 },
  ...layer(21.92, { src: "gold_stamp.wav", v: LEVELS.SFX_HERO, dur: 0.6, rate: 1.10 },
                  { src: "arrive_chime.wav", dur: 0.8 }),
  { at: 22.24, src: "am/positive-chime.wav", v: LEVELS.SFX_MID, dur: 0.8 },
];

/* ---- THE VARIANT CUTS -----------------------------------------------------
   [[feedback_trial_reel_variants]]: a variant must change hook, bed, camera,
   palette AND transition — not one lever.
   ------------------------------------------------------------------------ */
type Trans = "flash" | "bars" | "punch" | "slide";
export type Variant = { hook: React.FC; hookHead: [string, string]; bed: string;
  seed: number; pal: number; trans: Trans; capTop: number; endHold: number };

export const VARIANTS: Variant[] = [
  { hook: S0Hook, hookHead: ["APPLE'S DESIGN RULES", "AS A CLAUDE SKILL"],
    bed: "100_apple_bed.wav",   seed: 0,  pal: 0, trans: "flash", capTop: 1268, endHold: 12 },
  { hook: S0Hook, hookHead: ["YOUR SITE HAS 14 FLAWS", "THIS SKILL NAMES THEM"],
    bed: "100_apple_bed_b.wav", seed: 5,  pal: 0, trans: "bars",  capTop: 1214, endHold: 10 },
];

/** the cut punctuation. One per variant, so two cuts never edit the same way.
    ⛔ [[feedback_no_flashing_transitions]]: no iris, no white plate, peak
       opacity <= 0.30, ramped in AND out, and never closing over the full frame. */
const Trans: React.FC<{ at: number; kind: Trans }> = ({ at, kind }) => {
  const f = useCurrentFrame();
  const n = kind === "flash" ? 8 : 9;
  if (f < at || f >= at + n) return null;
  const p = (f - at) / n;
  if (kind === "flash") return (
    <div style={{ position: "absolute", inset: 0, zIndex: 140, pointerEvents: "none",
      background: "#F4EEE2", opacity: Math.sin(p * Math.PI) * 0.28 }} />
  );
  if (kind === "bars") return (
    <div style={{ position: "absolute", inset: 0, zIndex: 140, pointerEvents: "none",
      overflow: "hidden" }}>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} style={{ position: "absolute", left: 0, right: 0, top: `${i * 25}%`,
          height: "25%", background: "#14110E", opacity: 0.86,
          transform: `translateX(${(i % 2 ? 1 : -1) * p * 130}%)` }} />
      ))}
    </div>
  );
  if (kind === "punch") return (
    <div style={{ position: "absolute", inset: 0, zIndex: 140, pointerEvents: "none",
      background: "#14110E", opacity: 0.9,
      clipPath: `circle(${16 + p * 116}% at 50% 46%)`,
      WebkitClipPath: `circle(${16 + p * 116}% at 50% 46%)` }} />
  );
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 140, pointerEvents: "none",
      overflow: "hidden" }}>
      <div style={{ position: "absolute", left: `${-100 + p * 100}%`, top: 0, width: "100%",
        height: "100%", background: "#14110E", opacity: 0.88 }} />
    </div>
  );
};

/** `f` restarts inside each Sequence, so the header's settle replays per cut.
    ⛔ `HookHeader` eases in from its `f` prop, so at frame 0 it is INVISIBLE —
    the hook passes `f + 12` to satisfy docs/THE-OPEN.md's frame-0 law. */
const HeadFor: React.FC<{ big: string; hot: string; settled?: boolean }> =
  ({ big, hot, settled }) => {
  const f = useCurrentFrame();
  return <HookHeader f={settled ? f + 12 : f} big={big} hot={hot} />;
};

export const makeReel = (v: Variant): React.FC => () => {
  const SC = SCENES.map((sc, i) => (i === 0 ? { ...sc, head: v.hookHead } : sc));
  const TOTAL = APP_TOTAL + v.endHold;
  return (
    <AbsoluteFill>
      <Audio src={staticFile("100_apple_vo.wav")} />
      {/* ⛔⛔ THE BED MUST BE AUDIBLE AT 0.00s ([[soundtrack-onset-at-zero]]):
          three stacked causes killed this before — a fade-in envelope, the
          TRACK's own ~4s fade-in intro, and AAC priming. Both passages below
          are PRE-TRIMMED to their first downbeat and measured over their first
          500ms, then frequency-pocketed against the VO and gain-flattened only
          75% of the way, because full inversion sterilises the song. */}
      <Audio src={staticFile(v.bed)} />
      <SfxTrack cues={SFX} />
      <Bg />

      <AssemblyCtx.Provider value={true}>
        {SC.map((sc, i) => {
          const to = i < SC.length - 1 ? SC[i + 1].at : TOTAL;
          const C = i === 0 ? v.hook : sc.C;
          return (
            <Sequence key={sc.at} from={sc.at} durationInFrames={to - sc.at} layout="none">
              <PalCtx.Provider value={v.pal}>
                <CamCtx.Provider value={camFor(v.seed, i)}>
                  <AbsoluteFill><C /></AbsoluteFill>
                </CamCtx.Provider>
              </PalCtx.Provider>
            </Sequence>
          );
        })}
      </AssemblyCtx.Provider>

      {SC.slice(1).map((sc) => <Trans key={"t" + sc.at} at={sc.at} kind={v.trans} />)}

      {SC.map((sc, i) => {
        const to = i < SC.length - 1 ? SC[i + 1].at : TOTAL;
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

export const AppleReel = makeReel(VARIANTS[0]);
export const AppleReelB = makeReel(VARIANTS[1]);
