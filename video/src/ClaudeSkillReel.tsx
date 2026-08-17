import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx, HookHeader } from "./SlopKit";
import { HookP, HEAD } from "./SklHooks";
import { S1, S2, S3, S4, S5, S6, S7, S8, S9, S10Cta } from "./SklScenes";
import { CamCtx, PalCtx } from "./SklWorld";
import { camFor } from "./AgyWorld";
import { SfxTrack, LEVELS, layer, repeat, db, Cue } from "./SoundKit";
import words from "./words_106skill.json";
import bedDuck from "./bed_duck_106.json";

/* ===========================================================================
   REEL 106 · "SKILL" — four pasted prompts turn an ordinary Claude Project
   into a tutor that drills you, dates you and grades you.
   Board: storyboards/106-skill.md.

   VO: public/vo_106skill.wav — 39.07s, 191 words.

   ⛔⛔ THE RAW TAKE WAS 106.65s AND CONTAINED **TWENTY-ONE** FLUB WINDOWS, and
      TWO of the retakes were INVISIBLE to a whole-file transcript: the decoder
      smooths a false start away when it has the surrounding sentence to lean
      on. The hook's take 1 dies on "Claude has a hidden feature" and the real
      take starts at **2.844s**; there is a second false start on "Most people
      spend". The gate that found them is the SLIDING ISOLATED-WINDOW SCAN
      (3.2s window, 1.6s step, small.en, grep "cut") — 21 windows in the raw,
      **0 in the cut**.

   ⛔⛔ EVERY CUT BOUNDARY IS A MEASURED SILENCE EDGE, never a whisper word time
      ([[feedback_vo_cut_to_silence_not_whisper]]). Ten kept ranges; the pass
      asserts the 0.10s either side of every splice is under -22 dB and every
      edge came back under **-52 dB**.

   ⚠️ **39.07s against the 22-29s house range, and it is flagged, not trimmed.**
      The VO literally counts "Second ... Third ... Fourth", so no beat can be
      dropped without breaking the script's own numbering. Alex chose to build
      at full length. `docs/KICKOFF-PROMPT.md` §3: say it, never silently pad
      or trim.

   ⛔⛔ THE HONESTY LINE (board §0, checked live 2026-08-14):
      - Claude **Projects** and their **project instructions** are REAL and S3
        draws them, with one text chip.
      - There is **NO Claude feature called "Personal Tutor"** — the name comes
        from a viral X/Medium post. The tutor is a CHARACTER WHO SITS DOWN.
      - Anthropic's real **"Learning" style** is a DIFFERENT mechanism and is
        deliberately not drawn anywhere.
      - "4 hours vs 6 months" is UNSOURCED: it is the reel's CLAIM on the claim
        plate, with no evidence furniture, and S9 grades with a SEAL, never a
        score.

   ⛔⛔ EVERY `at` BELOW IS A MEASURED WORD ONSET from src/words_106skill.json.
      The PICTURE leads them by 4 frames inside the scenes, so its crossover —
      not its start — lands on the syllable.

   ⛔ ROOT OWNS THE GLOBAL CHROME: Bg, the one continuous ProgressBar, the one
      KaraokeCaption track, the VO and every header. Scene bodies see
      AssemblyCtx = true so their own copies return null.
   ========================================================================= */

export const FPS = 30;

/* ⛔ THE REEL HARD-CUTS ON THE LAST WORD. The VO's final "DM." is still
   sounding at 38.96s and the file runs to 39.07s. 1172 frames = 39.067s. */
export const SKILL_TOTAL = 1172;


/* ---- THE SFX BANK ---------------------------------------------------------
   ⛔⛔ EVERY `dur` IS >= THE FILE'S MEASURED TRUE LENGTH, measured with ffprobe
      before a cue was written (reel 78's first bank chopped five of six opening
      cues mid-decay and the whole open sounded cheap):
        impact_deep 0.800 · sub 0.420 · thock 0.160 · spotlight_snap 0.400 ·
        swooshup/dn 0.420 · chimehi 0.550 · pneu_thunk 0.450 · metal_ping 0.312 ·
        gold_stamp 0.500 · stamp_press 0.340 · arrive_chime 1.100 ·
        pickup_chime 0.340 · lib_whoosh 2.321 · slate_whump 0.160 ·
        mech_clank 0.120 · am/check-pop 0.634 · am/click-hard 0.417 ·
        am/whoosh-fast 0.413 · am/paper-rustle 1.498 · am/cloth-shiver 2.300
   ⛔ `at` is ROOT seconds, not scene-local.
   ⛔ `src` IS RELATIVE TO public/sfx/ — `Sfx` prefixes "sfx/" itself. Writing
      the full "sfx/thock.wav" resolves to sfx/sfx/thock.wav and the whole
      RENDER dies on a file read, not a nice error. Cost one render.
   ⛔ EVERY SCENE CUT GETS A TRANSIENT — a cut with no sound reads as a glitch.
      The eleven cuts are at 0 / 5.40 / 9.70 / 12.80 / 17.40 / 19.40 / 22.43 /
      25.87 / 27.63 / 31.57 / 36.13.
   ⛔ FRAME 0 IS A SETTLED POSTER (the stack is already standing), so it carries
      LOW-BAND WEIGHT ONLY — scoring an impact on an event that is not on screen
      is what made reel 105's hook sound like mush. The first real HIT is the
      card lighting at 3.48.
   ⛔ am/whoosh-fast PEAKS 0.205s IN — it swells. Any pairing with an instant
      transient is pre-rolled by its own attack offset, or the body lands late.
   ------------------------------------------------------------------------ */
const SFX: Cue[] = [
  /* S0 HOOK — poster open, then the card, then the collapse */
  { at: 0.00, src: "sub.wav", v: LEVELS.SFX_BED, dur: 0.42 },
  { at: 3.48, src: "spotlight_snap.wav", v: db(-11), dur: 0.40 },
  { at: 3.48, src: "chimehi.wav", v: db(-15), dur: 0.55, rate: 1.12 },
  { at: 4.49, src: "swooshdn.wav", v: db(-13), dur: 0.42 },
  { at: 4.62, src: "impact_deep.wav", v: db(-8), dur: 0.80 },
  { at: 4.62, src: "sub.wav", v: db(-11), dur: 0.42 },

  /* S1 LIBRARY 5.40 — the cut, the page blizzard, the chair reveal */
  { at: 5.40, src: "am/whoosh-fast.wav", v: db(-15), dur: 0.42 },
  { at: 5.68, src: "am/paper-rustle.wav", v: db(-15), dur: 1.50 },
  { at: 7.10, src: "am/paper-rustle.wav", v: db(-17), dur: 1.50, rate: 1.15 },
  { at: 8.07, src: "am/cloth-shiver.wav", v: db(-17), dur: 2.30 },

  /* S2 DOOR 9.70 — the gold flood, and the SIT */
  { at: 9.70, src: "swooshup.wav", v: db(-14), dur: 0.42 },
  { at: 9.86, src: "arrive_chime.wav", v: db(-17), dur: 1.10 },
  { at: 11.03, src: "impact_deep.wav", v: db(-9), dur: 0.80 },
  { at: 11.03, src: "slate_whump.wav", v: db(-12), dur: 0.16 },

  /* S3 BENCH 12.80 — the folder, then card 1 SEATS (pneu = a thing inserted) */
  { at: 12.80, src: "am/click-hard.wav", v: db(-15), dur: 0.42 },
  { at: 13.70, src: "am/gear-mech.wav", v: db(-16), dur: 1.03 },
  { at: 15.27, src: "pneu_thunk.wav", v: db(-11), dur: 0.45 },
  { at: 15.27, src: "am/check-pop.wav", v: db(-16), dur: 0.64 },

  /* S4 REHEARSAL 17.40 — the lamps firing on */
  { at: 17.40, src: "spotlight_snap.wav", v: db(-10), dur: 0.40 },
  { at: 17.52, src: "chimehi.wav", v: db(-14), dur: 0.55, rate: 1.18 },

  /* S5 HALL 19.40 — card 2, then the textbook SHOVED off */
  { at: 19.40, src: "am/whoosh-fast.wav", v: db(-16), dur: 0.42 },
  { at: 19.87, src: "pneu_thunk.wav", v: db(-13), dur: 0.45, rate: 0.94 },
  { at: 21.60, src: "swooshdn.wav", v: db(-12), dur: 0.42 },
  { at: 21.86, src: "slate_whump.wav", v: db(-11), dur: 0.16 },

  /* S6 YARD 22.43 — the THROW, the box slamming up, four stamps thinning out */
  { at: 22.43, src: "swooshup.wav", v: db(-12), dur: 0.42 },
  { at: 22.50, src: "am/cloth-shiver.wav", v: db(-16), dur: 2.30 },
  { at: 23.33, src: "impact_deep.wav", v: db(-10), dur: 0.80 },
  { at: 23.73, src: "thock.wav", v: db(-14), dur: 0.16, rate: 0.92 },
  { at: 24.03, src: "thock.wav", v: db(-15), dur: 0.16, rate: 1.00 },
  { at: 24.40, src: "thock.wav", v: db(-16), dur: 0.16, rate: 1.10 },
  { at: 24.80, src: "chimehi.wav", v: db(-13), dur: 0.55, rate: 1.22 },

  /* S7 PLATFORM 25.87 — card 3, then the clamp BITES */
  { at: 25.87, src: "am/click-hard.wav", v: db(-16), dur: 0.42 },
  { at: 26.40, src: "pneu_thunk.wav", v: db(-13), dur: 0.45, rate: 1.06 },
  { at: 27.07, src: "mech_clank.wav", v: db(-9), dur: 0.12 },
  { at: 27.07, src: "impact_deep.wav", v: db(-11), dur: 0.80, rate: 0.9 },

  /* S8 ROOF 27.63 — seven blocks landing, PITCH-VARIED so it is one gesture */
  { at: 27.63, src: "swooshup.wav", v: db(-15), dur: 0.42 },
  ...Array.from({ length: 7 }, (_, i) => ({
    at: 28.60 + i * 0.133, src: "thock.wav", v: db(-14), dur: 0.16,
    rate: 0.92 + i * 0.045,
  })),
  { at: 29.50, src: "am/check-pop.wav", v: db(-15), dur: 0.64 },
  { at: 30.90, src: "pickup_chime.wav", v: db(-15), dur: 0.34 },

  /* S9 EXAM 31.57 — card 4 fills the board, then the SEAL */
  { at: 31.57, src: "am/whoosh-fast.wav", v: db(-16), dur: 0.42 },
  { at: 34.37, src: "pneu_thunk.wav", v: db(-12), dur: 0.45, rate: 1.12 },
  { at: 34.37, src: "am/check-pop.wav", v: db(-14), dur: 0.64 },
  { at: 35.03, src: "stamp_press.wav", v: db(-8), dur: 0.34 },
  { at: 35.03, src: "sub.wav", v: db(-13), dur: 0.42 },
  { at: 35.60, src: "arrive_chime.wav", v: db(-15), dur: 1.10 },

  /* S10 BOARD 36.13 — the fan, then the keyword */
  { at: 36.13, src: "swooshup.wav", v: db(-14), dur: 0.42 },
  ...Array.from({ length: 4 }, (_, i) => ({
    at: 36.47 + i * 0.10, src: "am/check-pop.wav", v: db(-15), dur: 0.64,
    rate: 0.95 + i * 0.06,
  })),
  { at: 37.60, src: "gold_stamp.wav", v: db(-9), dur: 0.50 },
  { at: 37.60, src: "chimehi.wav", v: db(-13), dur: 0.55, rate: 1.05 },
];

type SceneDef = { at: number; C: React.FC; head: [string, string] };

/* ⛔ HEADERS STATE THE CLAIM IN PRODUCT NOUNS, NOT THEME FLAVOUR
   ([[feedback_headers_state_the_claim]]). Each one below says what the viewer
   GETS at that beat. On a muted feed this is the only line that gets read.
   ⛔ HookHeader auto-fits at 22 characters per line; every `hot` below is <= 22
   so the whole reel holds one type size and the header never jumps. */
export const SCENES: SceneDef[] = [
  { at: 0,    C: HookP,  head: HEAD },
  { at: 162,  C: S1,     head: ["MONTHS OF STUDY", "AND STILL STUCK"] },
  { at: 291,  C: S2,     head: ["ONE PASTED PROMPT", "AND CLAUDE TEACHES YOU"] },
  { at: 384,  C: S3,     head: ["OPEN A CLAUDE PROJECT", "PASTE PROMPT ONE"] },
  { at: 522,  C: S4,     head: ["YOUR TUTOR IS LIVE", "FROM ONE PASTE"] },
  { at: 582,  C: S5,     head: ["PROMPT TWO KILLS", "THE BORING TEXTBOOK"] },
  { at: 673,  C: S6,     head: ["IT DRILLS YOU", "UNTIL YOU STOP MISSING"] },
  { at: 776,  C: S7,     head: ["PROMPT THREE SETS", "A REAL DEADLINE"] },
  /* ⛔ 7 DAY, NOT 70. small.en mis-heard it; medium.en and large-v3 agree
     across two independent windows, and this number goes on screen. */
  { at: 829,  C: S8,     head: ["A SEVEN DAY ROADMAP", "45 MINUTES A DAY"] },
  { at: 947,  C: S9,     head: ["PROMPT FOUR GRADES", "WHAT YOU LEARNED"] },
  { at: 1084, C: S10Cta, head: ["COMMENT SKILL", "I'LL SEND ALL FOUR"] },
];

/** `f` restarts inside each Sequence, so the header's settle replays per cut.
    ⛔ `HookHeader` eases in from its `f` prop, so at frame 0 it is INVISIBLE —
    the hook passes `f + 12` to satisfy docs/THE-OPEN.md's frame-0 law. */
const HeadFor: React.FC<{ big: string; hot: string; settled?: boolean }> =
  ({ big, hot, settled }) => {
  const f = useCurrentFrame();
  return <HookHeader f={settled ? f + 12 : f} big={big} hot={hot} />;
};

export type Variant = { seed: number; capTop: number };
export const VARIANTS: Variant[] = [{ seed: 0, capTop: 1252 }];

export const makeReel = (v: Variant): React.FC => () => (
  <AbsoluteFill>
    <Audio src={staticFile("vo_106skill.wav")} />
    {/* ⛔⛔ THE BED MUST BE AUDIBLE AT 0.00s ([[soundtrack-onset-at-zero]]), and
        the level is a REAL SIDECHAIN, not a flat trim. `bed_duck_106.json` is
        generated from THIS VO's own per-frame envelope (fast 3f attack, 8f
        release) so the bed closes under every phrase and lifts in every gap.
        ⚠️ THE GAPS ARE SHORT BY CONSTRUCTION: this VO was cut tight, and its
        longest continuous gap is 10 frames (0.33s), so the duck runs
        min 0.38 / mean 0.45 and never fully opens. That is the tight cut, not
        a bug — a slower release just buried the bed entirely (a 14f release
        measured 0% of frames above 0.9).
        ⛔ Do NOT also multiply by LEVELS.MUSIC — reel 104 did and landed the
        bed at -45 dB, inaudible. The 0.50 here IS the level.
        ⛔ A NEW SOURCE TRACK: "Another Day Of Sun" was exhausted by reel 105
        and "Every Living Breathing Moment" is fully consumed. This is
        route_music from 178.50s, chosen by scanning for a 40s window that is
        audible at 0.00s and never drops below -46 dB (a real musical rest
        would fail MUSIC_CONTINUOUS). */}
    <Audio src={staticFile("106skill_bed.wav")}
      volume={(fr) => 0.50 * ((bedDuck as number[])[Math.min(fr, bedDuck.length - 1)] ?? 1)} />
    <SfxTrack cues={SFX} />
    <Bg />

    <AssemblyCtx.Provider value={true}>
      {SCENES.map((sc, i) => {
        const to = i < SCENES.length - 1 ? SCENES[i + 1].at : SKILL_TOTAL;
        const C = sc.C;
        return (
          <Sequence key={sc.at} from={sc.at} durationInFrames={to - sc.at} layout="none">
            <PalCtx.Provider value={0}>
              <CamCtx.Provider value={camFor(v.seed, i)}>
                <AbsoluteFill><C /></AbsoluteFill>
              </CamCtx.Provider>
            </PalCtx.Provider>
          </Sequence>
        );
      })}
    </AssemblyCtx.Provider>

    {SCENES.map((sc, i) => {
      const to = i < SCENES.length - 1 ? SCENES[i + 1].at : SKILL_TOTAL;
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

export const SkillReel = makeReel(VARIANTS[0]);
