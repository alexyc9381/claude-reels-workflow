import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx, HookHeader } from "./SlopKit";
import { S0Hook, S1, S2, S3, S4, S5, S6Cta } from "./RepScenes";
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
      2. "GPT-5 … all for free" — OPENAI IS NOT A PROVIDER. No GPT or OpenAI
         mark appears anywhere in this reel. S2's taps carry only providers
         really in the README; Claude appears as the CLIENT (Claude Code runs
         against the pool via `/v1/messages`), which is what the repo documents.

   ⛔ ROOT OWNS THE GLOBAL CHROME: Bg, the one continuous ProgressBar, the one
      KaraokeCaption track, the VO, the bed and every header. Scene bodies see
      AssemblyCtx = true so their own copies return null.
   ========================================================================= */

export const FPS = 30;
export const REP_TOTAL = 628;      // 20.92s of VO

type Scene = { at: number; C: React.FC; head: [string, string] };

/* ⛔ HEADERS STATE THE CLAIM IN PRODUCT NOUNS, THEY NEVER ECHO THE VO OR THE
   THEME ([[feedback_headers_state_the_claim]]). The picture is already carrying
   the waterworks; the header is the reel's one LITERAL channel, so it spends
   itself on the real nouns a Claude Code viewer recognises — freellmapi, the
   star count, /v1, 429, MIT — none of which the audio carries. */
export const SCENES: Scene[] = [
  { at: 0,   C: S0Hook, head: ["800M FREE AI TOKENS", "ONE REPO, 18,265 STARS"] },
  { at: 110, C: S1,     head: ["NOT 800 THOUSAND", "800 MILLION A MONTH"] },
  /* ⛔ "LLAMA" CAME OFF THIS HEADER. The VO names it, but every "llama" in
     the repo's README is `llama.cpp` — a local runtime you can point the proxy
     AT, not a model it serves you. Qwen3 / DeepSeek V4 / GLM-5 are printed in
     that README by name, so the header ships those instead. */
  { at: 178, C: S2,     head: ["29 FREE PROVIDERS", "GEMINI, MISTRAL, NVIDIA"] },
  { at: 251, C: S3,     head: ["YOU PAY PER PROVIDER", "HUNDREDS A MONTH, EACH"] },
  { at: 361, C: S4,     head: ["IT POOLS EVERY FREE TIER", "ONE /v1 ENDPOINT"] },
  { at: 495, C: S5,     head: ["RATE LIMITED? IT SWITCHES", "AUTO FAILOVER ON 429"] },
  { at: 570, C: S6Cta,  head: ["COMMENT REPO", "FOR THE FREE SETUP"] },
];

/* ---- THE SFX BANK ---------------------------------------------------------
   ⛔ COUNT GESTURES, NOT CUES. A `repeat()` run is ONE gesture. No scene runs
      more than four.
   ⛔ LAYER THE HERO HIT: attack + low-end body, or movement + texture. One thin
      pop is the single thing that makes a reel feel cheap.
   ⛔ RISERS CAPPED AT 2, spent on the reel's two real turns: the manifold
      charging (12.90s) and the keyword (19.00s). NOT the open — a riser there
      fights the four hard cuts, which are already the interrupt.
   ⭐ THE TEXTURE LAYER IS WHERE THE MEANING LIVES. `water_fan` under the vault,
      `am/coin-drop` + `ratchet` under the meter, `am/gear-mech` under the
      selector: the sound says what the picture says, in a vocabulary nobody has
      to learn.
   ------------------------------------------------------------------------ */
const SFX: Cue[] = [
  /* ---- S0 · THE OPEN. Four cuts, a transient on every one. -------------- */
  { at: 0.00, src: "water_fan.wav", v: LEVELS.SFX_BED, dur: 3.9, rate: 0.62 },
  { at: 0.00, src: "am/room-tone.wav", v: LEVELS.SFX_BED, dur: 3.6 },
  /* the wheel breaking free — the reel's first physical event */
  { at: 0.30, src: "ratchet.wav", v: LEVELS.SFX_MID, dur: 0.5, rate: 0.88 },
  ...layer(0.40, { src: "mech_clank.wav", v: LEVELS.SFX_HERO, dur: 1.0 },
                 { src: "sub.wav", dur: 1.2, rate: 0.74 }),
  { at: 0.46, src: "wrench_clank.wav", v: LEVELS.SFX_TEXTURE, dur: 0.6, rate: 0.9 },
  /* CUT 2 · the glass. The column climbing IS the sound. */
  ...layer(0.73, { src: "lib_whoosh.wav", v: LEVELS.SFX_MID, dur: 0.6, rate: 1.14 },
                 { src: "water_fan.wav", dur: 1.5, rate: 1.28 }),
  { at: 1.30, src: "metal_ping.wav", v: LEVELS.SFX_MID, dur: 0.7, rate: 1.2 },
  /* CUT 3 · the maker's plate */
  ...layer(1.87, { src: "slate_whump.wav", v: LEVELS.SFX_HERO, dur: 0.8, rate: 0.98 },
                 { src: "lamp_clunk.wav", dur: 0.5 }),
  /* CUT 4 · the outlet, first water */
  ...layer(2.73, { src: "lib_whoosh_fast.wav", v: LEVELS.SFX_MID, dur: 0.5, rate: 0.94 },
                 { src: "water_fan.wav", dur: 1.4, rate: 1.05 }),
  { at: 2.90, src: "graph_hum.wav", v: LEVELS.SFX_TEXTURE, dur: 0.8, rate: 1.1 },

  /* ---- S1 · THE SCALE. The cup is deliberately THIN and the column is not. */
  { at: 3.67, src: "lib_whoosh.wav", v: LEVELS.SFX_MID, dur: 0.5, rate: 1.06 },
  { at: 3.86, src: "metal_ping.wav", v: LEVELS.SFX_TEXTURE, dur: 0.4, rate: 1.5 },
  ...layer(4.67, { src: "lib_deep_whoosh.wav", v: LEVELS.SFX_MID, dur: 1.1, rate: 0.92 },
                 { src: "water_fan.wav", dur: 1.4, rate: 1.18 }),
  /* the top-out */
  ...layer(5.37, { src: "mech_clank.wav", v: LEVELS.SFX_HERO, dur: 0.8, rate: 1.06 },
                 { src: "harden_chime.wav", dur: 0.9 }),

  /* ---- S2 · THE ROW. Four taps, PITCHED UP in sequence — the rising line
     is what says "and there are more of these". --------------------------- */
  { at: 5.93, src: "lib_whoosh.wav", v: LEVELS.SFX_MID, dur: 0.5, rate: 1.1 },
  ...repeat(4, 6.00, 0.166, { src: "pneu_thunk.wav", v: LEVELS.SFX_MID, dur: 0.4 }, 0.075),
  /* the four spits, pitched UP across the run — `repeat` centres its drift on
     1.0, so a one-directional climb has to be written out */
  ...[0, 1, 2, 3].map((i) => ({ at: 6.04 + i * 0.166, src: "water_fan.wav",
    v: LEVELS.SFX_TEXTURE, dur: 0.5, rate: 1.22 + i * 0.09 })),
  ...layer(7.20, { src: "lib_whoosh.wav", v: LEVELS.SFX_MID, dur: 0.6, rate: 0.9 },
                 { src: "am/lights-on.wav", dur: 0.7 }),
  { at: 7.72, src: "c_collect.wav", v: LEVELS.SFX_MID, dur: 0.6 },

  /* ---- S3 · THE VILLAIN. Three coins, the ratchet RISING while the dribble
     stays identical. The pitch climb is the price climbing. ---------------- */
  { at: 8.37, src: "am/room-tone.wav", v: LEVELS.SFX_BED, dur: 3.5 },
  ...layer(8.50, { src: "am/coin-drop.wav", v: LEVELS.SFX_MID, dur: 0.6 },
                 { src: "ratchet.wav", dur: 0.5, rate: 0.94 }),
  ...layer(9.23, { src: "am/coin-drop.wav", v: LEVELS.SFX_MID, dur: 0.6, rate: 1.07 },
                 { src: "ratchet.wav", dur: 0.5, rate: 1.03 }),
  ...layer(9.97, { src: "am/coin-drop.wav", v: LEVELS.SFX_HERO, dur: 0.6, rate: 1.15 },
                 { src: "ratchet.wav", dur: 0.5, rate: 1.12 }),
  { at: 9.97, src: "am/cash-register.wav", v: LEVELS.SFX_TEXTURE, dur: 0.7 },
  { at: 10.97, src: "lib_whoosh.wav", v: LEVELS.SFX_MID, dur: 0.6, rate: 0.82 },

  /* ---- S4 · THE TURN. RISER 1 OF 2 lands on the all-29 impact. ---------- */
  ...layer(12.03, { src: "lib_whoosh_fast.wav", v: LEVELS.SFX_MID, dur: 0.5, rate: 1.0 },
                  { src: "water_fan.wav", dur: 1.2, rate: 1.1 }),
  { at: 12.44, src: "lib_riser.wav", v: LEVELS.SFX_MID, dur: 0.62, rate: 1.1 },
  /* the hero of the whole reel: twenty-nine feeds landing at once */
  ...layer(12.90, { src: "impact_deep.wav", v: LEVELS.SFX_HERO, dur: 1.4, rate: 0.92 },
                  { src: "sub.wav", dur: 1.3, rate: 0.7 }),
  { at: 12.92, src: "water_fan.wav", v: LEVELS.SFX_MID, dur: 1.8, rate: 0.86 },
  ...repeat(5, 12.96, 0.07, { src: "pneu_thunk.wav", v: LEVELS.SFX_TEXTURE, dur: 0.35 }, 0.05),
  { at: 13.60, src: "deep_engine.wav", v: LEVELS.SFX_BED, dur: 2.6, rate: 0.9 },
  /* the rating plate swinging into the light */
  ...layer(14.50, { src: "gear_shift.wav", v: LEVELS.SFX_MID, dur: 0.6 },
                  { src: "metal_ping.wav", dur: 0.7, rate: 0.86 }),
  ...layer(15.50, { src: "water_fan.wav", v: LEVELS.SFX_MID, dur: 1.1, rate: 1.0 },
                  { src: "am/positive-chime.wav", dur: 0.8 }),

  /* ---- S5 · THE MECHANISM. The clack is the point, so it is the loudest
     single transient in the back half and it is LAYERED. ------------------ */
  { at: 16.50, src: "graph_hum.wav", v: LEVELS.SFX_BED, dur: 2.4, rate: 1.0 },
  /* feed 07 dying: a dry rattle where water used to be */
  ...layer(17.03, { src: "am/counter-tick.wav", v: LEVELS.SFX_MID, dur: 0.4, rate: 0.8 },
                  { src: "am/digital-countdown.wav", dur: 0.45, rate: 1.25 }),
  /* THE CLACK */
  ...layer(17.30, { src: "mech_clank.wav", v: LEVELS.SFX_HERO, dur: 0.7, rate: 1.14 },
                  { src: "am/gear-mech.wav", dur: 0.6 }),
  { at: 17.32, src: "metal_ping.wav", v: LEVELS.SFX_TEXTURE, dur: 0.6, rate: 1.28 },
  ...layer(17.50, { src: "water_fan.wav", v: LEVELS.SFX_MID, dur: 1.0, rate: 1.06 },
                  { src: "temper_chime.wav", dur: 0.7 }),
  /* the second, unprompted clack — it is a loop, not a trick */
  ...layer(18.57, { src: "mech_clank.wav", v: LEVELS.SFX_MID, dur: 0.6, rate: 1.2 },
                  { src: "am/gear-mech.wav", dur: 0.5, rate: 1.1 }),

  /* ---- S6 · THE KEYWORD. RISER 2 OF 2 lands on the hard cut. ------------ */
  { at: 18.72, src: "lib_riser.wav", v: LEVELS.SFX_MID, dur: 0.5, rate: 1.32 },
  ...layer(19.00, { src: "lib_cinematic_hit.wav", v: LEVELS.SFX_HERO, dur: 1.2, rate: 1.02 },
                  { src: "water_fan.wav", dur: 1.6, rate: 1.0 }),
  { at: 19.40, src: "gold_stamp.wav", v: LEVELS.SFX_MID, dur: 0.8 },
  { at: 19.95, src: "arrive_chime.wav", v: LEVELS.SFX_MID, dur: 0.9 },
];

/* ---- THE VARIANT CUTS -----------------------------------------------------
   [[feedback_trial_reel_variants]]: a variant must change hook, bed, camera,
   palette AND transition — not one lever. The primary cut is A; B/C/D exist so
   a trial round is a one-line change rather than a rebuild.
   ------------------------------------------------------------------------ */
type Trans = "flash" | "bars" | "punch" | "slide";
export type Variant = { hook: React.FC; hookHead: [string, string]; bed: string;
  seed: number; pal: number; trans: Trans; capTop: number; endHold: number };

export const VARIANTS: Variant[] = [
  { hook: S0Hook, hookHead: ["800M FREE AI TOKENS", "ONE REPO, 18,265 STARS"],
    bed: "repo_bed.wav",   seed: 0,  pal: 0, trans: "flash", capTop: 1268, endHold: 12 },
  { hook: S0Hook, hookHead: ["ONE REPO, 29 FREE TIERS", "18,265 STARS, MIT"],
    bed: "repo_bed_b.wav", seed: 3,  pal: 1, trans: "bars",  capTop: 1214, endHold: 10 },
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
