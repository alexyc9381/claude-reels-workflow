import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx, HookHeader } from "./SlopKit";
import { S0Hook, S1, S2, S3, S4, S5, S6Cta } from "./RepScenes";
import { HookPaywall, HookFuse } from "./RepHooks";
import { CamCtx, PalCtx } from "./RepWorld";
import { camFor } from "./AgyWorld";
import { SfxTrack, LEVELS, layer, repeat, db, Cue } from "./SoundKit";
import words from "./data/words_repo.json";

/* ===========================================================================
   REEL 99 · "REPO" — one repo stacks the free tiers of twenty-nine AI
   providers behind a single endpoint, and switches feeds when one runs dry.

   Board: storyboards/99-repo.md.
   Repo:  github.com/tashfeenahmed/freellmapi — 18,265 ★, 2,678 forks, MIT,
          TypeScript, created 2026-04-21, pushed 2026-08-11. Every on-screen
          fact comes from that README or the GitHub API, pulled 2026-08-11.

   VO: public/vo_repo.wav — 20.92s, 79 words, ships at 1.0x.
   ✅ THE RAW TAKE IS A CLEAN SINGLE PASS. Checked the documented way — on the
      FINAL wav, not on the caption JSON (which is aligned to a canon script and
      therefore reads clean whether the audio is or not). Zero `cut cut`, zero
      adjacent duplicates, all 79 words present across all four splices.
   ⛔ 10.56s OF DEAD AIR CAME OUT and every cut window was verified below
      -33 dB, against a -22 dB assertion. The largest hole was 6.86s of nothing
      between "simultaneously." and "Hit" — a `silencedetect` pass alone would
      have found most of it, but the ENERGY-ENVELOPE scan is what proved no cut
      touched a phoneme. 31.53s -> 20.92s. 3.78 words/sec, so no `atempo`.
   ⛔ THE FIRST SPLICE SHIPPED A BROKEN WAV AND ffprobe DID NOT CARE. Concat of
      wav segments with `-c copy` writes the FIRST segment's RIFF size into the
      header: ffprobe re-derived 20.92s from the file size and reported it fine,
      while faster-whisper trusted the chunk and transcribed 4.74s. Re-spliced
      in numpy. Any "the VO is truncated" symptom starts here.

   ⛔⛔ EVERY `at` BELOW IS A MEASURED WORD ONSET from src/data/words_repo.json,
      pattern-matched on the beat's opening word, never an estimate. The SFX
      fire on these seconds; the PICTURE leads them by 4 frames inside the
      scenes, so its crossover — not its start — lands on the syllable.

   ⚠️⚠️ TWO VO CLAIMS THE REPO DOES NOT SUPPORT. Neither is ever DRAWN.
      1. "800 million tokens" — the README says 4 BILLION. The VO understates by
         5x. The gauge is graduated to the VO's number so audio and picture
         agree; the main's rating plate in S4 carries the real 4B, so the
         receipt over-delivers rather than contradicts.
      2. "GPT-5 … all for free" — OPENAI IS NOT A PROVIDER, and no GPT mark ever
         appears on a token, a chute or in a pile. It DOES appear, deliberately,
         in the CLIENTS row: the README names "Claude Code, Codex CLI, Cline /
         Roo Code, Continue, Aider, opencode, and Cursor" as compatible clients
         and Codex is OpenAI's CLI. So the mark sits where it is true — on the
         things that SPEND the tokens, never on the things that supply them.
         ⛔ Never mix a client mark into a provider pile.
      3. "Llama" — every `llama` in that README is `llama.cpp`, a local runtime
         you can point the proxy AT, not a model it serves. Never drawn.

   ⛔ ROOT OWNS THE GLOBAL CHROME: Bg, the one continuous ProgressBar, the one
      KaraokeCaption track, the VO, the bed and every header. Scene bodies see
      AssemblyCtx = true so their own copies return null.
   ========================================================================= */

export const FPS = 30;
export const REP_TOTAL = 628;      // 20.92s of VO

type Scene = { at: number; C: React.FC; head: [string, string] };

/* ⛔ HEADERS STATE THE CLAIM IN PRODUCT NOUNS, THEY NEVER ECHO THE VO OR THE
   THEME ([[feedback_headers_state_the_claim]]). The picture is already carrying
   the world; the header is the reel's one LITERAL channel, so it spends itself
   on real nouns a Claude Code viewer recognises — /v1, 429, MIT, the provider
   names — none of which the audio carries. */
export const SCENES: Scene[] = [
  /* ⛔ NO STAR COUNT ON THE HOOK HEADER. It is a receipt, not a hook — it
     answers "is this legit", which is a question nobody has yet at 0.0s, and it
     spent the second line on something the maker's plate already carries later
     in the reel. The line now says what you GET. */
  { at: 0,   C: S0Hook, head: ["800M FREE AI TOKENS", "FROM ONE FREE REPO"] },
  { at: 110, C: S1,     head: ["NOT 800 THOUSAND", "800 MILLION A MONTH"] },
  /* ⛔ "LLAMA" CAME OFF THIS HEADER — every "llama" in that README is
     `llama.cpp`, a runtime you point the proxy AT, not a model it serves. */
  { at: 178, C: S2,     head: ["29 FREE PROVIDERS", "GEMINI, NVIDIA, CLOUDFLARE"] },
  { at: 251, C: S3,     head: ["YOU PAY PER PROVIDER", "HUNDREDS A MONTH, EACH"] },
  { at: 361, C: S4,     head: ["IT POOLS EVERY FREE TIER", "ONE /v1 ENDPOINT"] },
  { at: 495, C: S5,     head: ["RATE LIMITED? IT SWITCHES", "AUTO FAILOVER ON 429"] },
  { at: 570, C: S6Cta,  head: ["COMMENT REPO", "FOR THE FREE SETUP"] },
];

/* ---- THE SFX BANK ---------------------------------------------------------
   ⛔⛔ THE OLD BANK WAS THE WATERWORKS BANK AND IT FUZZED. Alex: *"i hear like a
      fuzzy sound effect ... i just hear fuzzy sounds right now."* Diagnosed
      rather than guessed at — the sample census said `water_fan.wav` fired TEN
      times, more than double anything else, across S0/S1/S2/S4/S5/S6, at rates
      from 0.62 to 1.30. Measured, it is **0.477 spectral flatness** (1.0 is
      white noise) with a 3.1 kHz centroid: a broadband hiss. Pitched down it is
      a rumble, pitched up it is a hiss, and it was under most of the reel. It
      made sense in a waterworks. In a counting house full of struck metal it is
      just noise. It is gone, and so are the other two samples that measured
      near it — `coin_slide` (0.521) and `chain_clank` (0.583).

   ⭐ THE STANDING RULE THIS PRODUCES: measure a sample before you trust it.
      Nothing above **0.45 flatness**, and nothing broadband pitched below
      **0.85** — extreme downpitch is what turns a coin into a rumble. Every
      sample below was measured: impact_deep 0.001, slate_whump 0.003,
      pickup_chime 0.005, chimelo 0.007, sub 0.013, lamp_clunk 0.015,
      bell_ring 0.022, temper_chime 0.028, lib_riser 0.034, metal_riser 0.034,
      pneu_thunk 0.036, mech_clank 0.041, metal_ping 0.073. The coin sounds sit
      higher (c_coin 0.307, gold_stamp 0.277) because a struck coin genuinely
      has a broadband attack — those are short, and they run at TEXTURE/MID.

   ⛔ THE BANK IS RE-TIMED TO THE NEW PICTURE. Both delivery hooks break at the
      same frame (f11 = 0.37s) and cut at f42/f78, so one bank serves both cuts.
   ⛔ COUNT GESTURES, NOT CUES — a `repeat()` run is ONE gesture, and no scene
      runs more than four.
   ⛔ LAYER THE HERO HIT: attack + low-end body. One thin pop is the single
      thing that makes a reel sound cheap.
   ⛔ RISERS CAPPED AT 2, spent on the reel's two real turns: the pool charging
      (12.44s) and the keyword (18.72s).
   ------------------------------------------------------------------------ */
const SFX: Cue[] = [
  /* ---- S0 · THE OPEN. The break at 0.37, then two hard cuts. ----------- */
  { at: 0.00, src: "am/room-tone.wav", v: LEVELS.SFX_BED, dur: 3.4 },
  /* THE BREAK — the repo hits the gate / the stubs slam together */
  ...layer(0.37, { src: "impact_deep.wav", v: LEVELS.SFX_HERO, dur: 1.3, rate: 0.94 },
                 { src: "sub.wav", dur: 1.1, rate: 0.88 }),
  { at: 0.37, src: "mech_clank.wav", v: LEVELS.SFX_HERO, dur: 0.5, rate: 0.96 },
  /* the debris: tokens thrown across the counter */
  ...repeat(5, 0.46, 0.085, { src: "c_coin.wav", v: LEVELS.SFX_MID, dur: 0.34 }, 0.07),
  ...repeat(4, 0.78, 0.13, { src: "am/coin-drop.wav", v: LEVELS.SFX_TEXTURE, dur: 0.35 }, 0.06),
  /* CUT 2 · the close */
  ...layer(1.40, { src: "slate_whump.wav", v: LEVELS.SFX_MID, dur: 0.5, rate: 1.02 },
                 { src: "metal_ping.wav", dur: 0.5, rate: 1.14 }),
  /* CUT 3 · the wide, and what was behind it */
  ...layer(2.60, { src: "lib_whoosh.wav", v: LEVELS.SFX_MID, dur: 0.6, rate: 1.1 },
                 { src: "pickup_chime.wav", dur: 0.4 }),
  ...repeat(4, 2.74, 0.10, { src: "c_coin.wav", v: LEVELS.SFX_TEXTURE, dur: 0.3 }, 0.08),

  /* ---- S1 · THE SCALE. Thin for the stack, heavy for the mountain. ----- */
  ...layer(3.67, { src: "lib_whoosh_fast.wav", v: LEVELS.SFX_MID, dur: 0.4, rate: 1.12 },
                 { src: "c_coin.wav", dur: 0.3, rate: 1.3 }),
  { at: 4.67, src: "lib_whoosh.wav", v: LEVELS.SFX_MID, dur: 0.6, rate: 0.94 },
  /* the mountain lands */
  ...layer(5.40, { src: "impact_deep.wav", v: LEVELS.SFX_HERO, dur: 1.2, rate: 0.9 },
                 { src: "sub.wav", dur: 1.0, rate: 0.86 }),
  ...repeat(6, 5.46, 0.075, { src: "c_coin.wav", v: LEVELS.SFX_MID, dur: 0.3 }, 0.06),

  /* ---- S2 · THREE MARKS LAND, pitched UP so the run rises. ------------- */
  { at: 5.93, src: "lib_whoosh.wav", v: LEVELS.SFX_MID, dur: 0.5, rate: 1.06 },
  ...layer(6.13, { src: "gold_stamp.wav", v: LEVELS.SFX_HERO, dur: 0.5, rate: 0.98 },
                 { src: "metal_ping.wav", dur: 0.4, rate: 1.0 }),
  ...layer(6.33, { src: "gold_stamp.wav", v: LEVELS.SFX_HERO, dur: 0.5, rate: 1.08 },
                 { src: "metal_ping.wav", dur: 0.4, rate: 1.12 }),
  ...layer(6.53, { src: "gold_stamp.wav", v: LEVELS.SFX_HERO, dur: 0.5, rate: 1.18 },
                 { src: "metal_ping.wav", dur: 0.4, rate: 1.24 }),
  /* the set assembling */
  ...repeat(6, 7.20, 0.09, { src: "pneu_thunk.wav", v: LEVELS.SFX_MID, dur: 0.32 }, 0.06),

  /* ---- S3 · THE VILLAIN. The price ratchets UP; the payout does not. --- */
  { at: 8.37, src: "am/room-tone.wav", v: LEVELS.SFX_BED, dur: 3.4 },
  ...layer(8.50, { src: "am/coin-drop.wav", v: LEVELS.SFX_MID, dur: 0.5 },
                 { src: "ratchet.wav", dur: 0.4, rate: 0.96 }),
  ...layer(9.23, { src: "am/coin-drop.wav", v: LEVELS.SFX_MID, dur: 0.5, rate: 1.08 },
                 { src: "ratchet.wav", dur: 0.4, rate: 1.06 }),
  ...layer(9.97, { src: "am/coin-drop.wav", v: LEVELS.SFX_HERO, dur: 0.5, rate: 1.17 },
                 { src: "am/cash-register.wav", dur: 0.6 }),
  { at: 10.97, src: "lib_whoosh.wav", v: LEVELS.SFX_MID, dur: 0.6, rate: 0.86 },

  /* ---- S4 · THE TURN. RISER 1 OF 2 lands on the pool charging. -------- */
  { at: 12.03, src: "lib_whoosh_fast.wav", v: LEVELS.SFX_MID, dur: 0.45, rate: 1.0 },
  { at: 12.44, src: "lib_riser.wav", v: LEVELS.SFX_MID, dur: 0.6, rate: 1.1 },
  ...layer(12.90, { src: "impact_deep.wav", v: LEVELS.SFX_HERO, dur: 1.4, rate: 0.92 },
                  { src: "sub.wav", dur: 1.2, rate: 0.86 }),
  ...repeat(6, 12.96, 0.07, { src: "pneu_thunk.wav", v: LEVELS.SFX_MID, dur: 0.32 }, 0.05),
  /* the ledger: a swing, paper, and a row-by-row tick */
  ...layer(14.37, { src: "gear_shift.wav", v: LEVELS.SFX_MID, dur: 0.4 },
                  { src: "am/paper-slide.wav", dur: 0.6 }),
  ...repeat(5, 14.55, 0.22, { src: "am/counter-tick.wav", v: LEVELS.SFX_TEXTURE, dur: 0.3 }, 0.05),
  ...layer(15.72, { src: "stamp_press.wav", v: LEVELS.SFX_MID, dur: 0.5 },
                  { src: "chimelo.wav", dur: 0.6 }),

  /* ---- S5 · THE MECHANISM. The clack is the loudest transient here. ---- */
  { at: 16.50, src: "am/gear-mech.wav", v: LEVELS.SFX_BED, dur: 2.2, rate: 0.9 },
  /* the chute dies: a dry rattle where tokens used to be */
  ...layer(16.90, { src: "am/counter-tick.wav", v: LEVELS.SFX_MID, dur: 0.4, rate: 0.88 },
                  { src: "ratchet.wav", dur: 0.4, rate: 0.86 }),
  /* the 429 plate drops */
  ...layer(17.00, { src: "slate_whump.wav", v: LEVELS.SFX_MID, dur: 0.5, rate: 0.94 },
                  { src: "metal_ping.wav", dur: 0.45, rate: 0.9 }),
  /* THE SWITCH */
  ...layer(17.30, { src: "mech_clank.wav", v: LEVELS.SFX_HERO, dur: 0.6, rate: 1.12 },
                  { src: "am/gear-mech.wav", dur: 0.5 }),
  { at: 17.32, src: "metal_ping.wav", v: LEVELS.SFX_TEXTURE, dur: 0.5, rate: 1.26 },
  ...layer(17.60, { src: "temper_chime.wav", v: LEVELS.SFX_MID, dur: 0.6 },
                  { src: "c_coin.wav", dur: 0.3, rate: 1.14 }),
  /* and again, unprompted */
  ...layer(18.43, { src: "mech_clank.wav", v: LEVELS.SFX_MID, dur: 0.5, rate: 1.2 },
                  { src: "am/gear-mech.wav", dur: 0.45, rate: 1.1 }),

  /* ---- S6 · THE KEYWORD. RISER 2 OF 2. -------------------------------- */
  { at: 18.72, src: "metal_riser.wav", v: LEVELS.SFX_MID, dur: 0.55, rate: 1.24 },
  ...layer(19.00, { src: "lib_cinematic_hit.wav", v: LEVELS.SFX_HERO, dur: 1.3, rate: 1.0 },
                  { src: "sub.wav", dur: 1.0, rate: 0.9 }),
  { at: 19.06, src: "gold_stamp.wav", v: LEVELS.SFX_HERO, dur: 0.6, rate: 0.96 },
  { at: 19.44, src: "arrive_chime.wav", v: LEVELS.SFX_MID, dur: 0.9 },
  { at: 19.98, src: "am/positive-chime.wav", v: LEVELS.SFX_MID, dur: 0.7 },
];

/* ---- THE VARIANT CUTS -----------------------------------------------------
   [[feedback_trial_reel_variants]]: a variant must change hook, bed, camera,
   palette AND transition — not one lever.
   ------------------------------------------------------------------------ */
type Trans = "flash" | "bars" | "punch" | "slide";
export type Variant = { hook: React.FC; hookHead: [string, string]; bed: string;
  seed: number; pal: number; trans: Trans; capTop: number; endHold: number };

/* ⛔ THE TWO DELIVERY CUTS CARRY THE TWO PICKED HOOKS. `pal` stays 0 on both:
   the palette rotation is a variance lever for the BODY, and running it under a
   hook that was designed and measured at pal 0 would change the thing being
   judged. The variance between these two cuts is the hook itself, the bed and
   the transition — which is more divergence than a recolour ever bought. */
export const VARIANTS: Variant[] = [
  { hook: HookPaywall, hookHead: ["800M FREE AI TOKENS", "FROM ONE FREE REPO"],
    bed: "repo_bed.wav",   seed: 0,  pal: 0, trans: "flash", capTop: 1268, endHold: 12 },
  { hook: HookFuse, hookHead: ["29 FREE TIERS, POOLED", "INTO ONE ENDPOINT"],
    bed: "repo_bed_b.wav", seed: 0,  pal: 0, trans: "bars",  capTop: 1214, endHold: 10 },
  { hook: S0Hook, hookHead: ["THE FREE TIER NOBODY STACKS", "800M TOKENS A MONTH"],
    bed: "repo_bed_c.wav", seed: 7,  pal: 2, trans: "punch", capTop: 1300, endHold: 8 },
  { hook: S0Hook, hookHead: ["STOP PAYING PER PROVIDER", "ONE ENDPOINT, 29 OF THEM"],
    bed: "repo_bed_d.wav", seed: 11, pal: 3, trans: "slide", capTop: 1240, endHold: 12 },
];

/** the cut punctuation. One per variant, so two cuts never edit the same way. */
const Trans: React.FC<{ at: number; kind: Trans }> = ({ at, kind }) => {
  const f = useCurrentFrame();
  const n = kind === "flash" ? 6 : 9;
  if (f < at || f >= at + n) return null;
  const p = (f - at) / n;
  if (kind === "flash") return (
    <div style={{ position: "absolute", inset: 0, zIndex: 140, pointerEvents: "none",
      background: "#F4EEE2", opacity: (1 - p) * 0.40 }} />
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
  const TOTAL = REP_TOTAL + v.endHold;
  return (
    <AbsoluteFill>
      <Audio src={staticFile("vo_repo.wav")} />
      {/* ⛔ THE BED IS "Every Living Breathing Moment", the house track. Each cut
          takes a DIFFERENT PASSAGE, and every passage was chosen by measuring
          its first 500ms — a bed that opens quiet fails the onset check however
          good its mean is (all four measured -18 to -23 dB). All four are
          frequency-pocketed against the VO (450 / 1400 / 2800 Hz notches) so
          they can run hot without masking, and gain-flattened only 75% of the
          way, because full inversion sterilises the song. */}
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

export const RepoReel = makeReel(VARIANTS[0]);
export const RepoReelB = makeReel(VARIANTS[1]);
export const RepoReelC = makeReel(VARIANTS[2]);
export const RepoReelD = makeReel(VARIANTS[3]);
