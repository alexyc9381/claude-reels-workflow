import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx, HookHeader, hexA } from "./SlopKit";
import { S0Hook, S1, S2, S3, S4, S5, S6, S7, S8Cta, Payoffs } from "./FreScenes";
import { CamCtx, PalCtx } from "./FreWorld";
import { camFor } from "./AgyWorld";
import { SfxTrack, LEVELS, layer, repeat, db, Cue } from "./SoundKit";
import words from "./words_105free.json";
import bedDuck from "./bed_duck_105.json";

/* ===========================================================================
   REEL 105 · "FREE" — three websites that give you the frontier models for
   nothing. Board: storyboards/105-free.md.

   VO: public/vo_105free.wav — 22.22s, 101 words.

   ⛔⛔ THE RAW TAKE WAS 45.16s AND CONTAINED **SEVEN** ABANDONED RETAKES, and
      one of them was INVISIBLE to a whole-file transcript. `small.en` reading
      the file end to end returned a clean "Free AI image generation with insane
      quality and realism" for 34-41s. There is a `cut cut` in the middle of it.
      The decoder smooths a false start away when it has the surrounding
      sentence to lean on — exactly the failure [[free-reel]] logged on reel 97.
      ⭐ THE TELL WAS A SINGLE 3.52s WORD: whisper stretched "quality" across the
      hidden restart. A word that long is always a buried retake.
      ⭐ THE GATE IS A SLIDING ISOLATED-WINDOW SCAN (3.2s window, 1.6s step,
      small.en, grep "cut"), run on the RAW and again on the DELIVERED mp4. It
      found 11 flub windows in the raw and 0 in the cut.

   ⛔⛔ EVERY CUT BOUNDARY IS A MEASURED -26 dB ENVELOPE EDGE, never a whisper
      word time ([[feedback_vo_cut_to_silence_not_whisper]] — whisper's `end`
      runs 150-200ms early). The pass ASSERTS that the 0.10s either side of
      every splice is under -22 dB, and **that assertion caught a real error**:
      segment 4's out-edge at 21.10s still held speech at -18.8 dB, so it moved
      to 21.12s. Seven kept ranges, 22.22s, and the cut file re-transcribed and
      re-scanned clean.

   ⚠️ 22.07s sits at the BOTTOM of the 22-29s house range. It is not padded —
      the VO carries a hook, three products and a CTA and nothing else.

   ⛔⛔ THE VO NAMES NO PLATFORM. All three were chosen by Alex and then opened
      LIVE and read before anything was drawn (board §0). Two things came back
      that change the frame:
      1. **lmarena.ai 301s to arena.ai.** The leaderboard was read on the day:
         391 models, 7,779,985 votes. All five models the VO names are on the
         roster — Grok included, listed under "SpaceXAI".
      2. **Freepik's AI product is now Magnific** ("Freepik is now Magnific" on
         their own banner). Its video generation is **CREDIT-METERED**, so the
         word "free" stays in the AUDIO and beat 2 carries **no price plate, no
         $0 and no FREE stamp** — the frame shows only the mechanism, which is
         true. Same rule that governed reel 104's find-skills line.
      ⛔ `freepik.app` is NOT Freepik — it resolves to an unrelated product
         called DeepImagine. It was the first search hit and it was nearly the
         source. Checked, rejected, recorded.

   ⛔ "TOE TO TOE" IS LEVEL, NOT BETTER. S7's two bars are driven by ONE height
      value so they cannot diverge. Nothing in this reel claims a free tool
      beats a paid one, because the VO does not.

   ⛔⛔ EVERY `at` BELOW IS A MEASURED WORD ONSET from src/words_105free.json.
      The SFX fire on these seconds; the PICTURE leads them by 4 frames inside
      the scenes, so its crossover — not its start — lands on the syllable.

   ⛔ ROOT OWNS THE GLOBAL CHROME: Bg, the one continuous ProgressBar, the one
      KaraokeCaption track, the VO, the bed and every header. Scene bodies see
      AssemblyCtx = true so their own copies return null.
   ========================================================================= */

export const FPS = 30;

/* ⛔⛔ THE REEL HARD-CUTS ON THE LAST WORD. Measured, not taken from whisper:
   the 10ms RMS envelope of the cut VO shows the final `-ly` of "links." still
   sounding at 22.06s and under -40 dB by 22.07s. 662 frames = 22.067s lands on
   the last audible sample with zero dead tail. */
export const FREE_TOTAL = 662;

type SceneDef = { at: number; C: React.FC; head: [string, string] };

/* ⛔ HEADERS STATE THE CLAIM IN PRODUCT NOUNS, NOT THEME FLAVOUR
   ([[feedback_headers_state_the_claim]]). Every one below is phrased as what
   the person watching GETS, and each adds a fact the VO never says — the site
   names, which the VO never once mentions, live here and on the slugs so a
   freeze-frame can check them. */
export const SCENES: SceneDef[] = [
  /* ⛔ Alex, round 3: *"the header needs to mention AI something related
     to free."* v1 said "3 SITES THAT REPLACE / WHAT YOU PAY FOR" — which never
     says AI and never says FREE, the two words the whole reel turns on. */
  { at: 0,   C: S0Hook, head: ["3 FREE AI SITES", "THAT REPLACE PAID TOOLS"] },
  { at: 55,  C: S1,     head: ["EVERY FRONTIER MODEL", "ON ONE FREE SITE"] },
  /* ⛔ NOT "SAVE $89 A MONTH". No total anywhere — see the world kit. */
  { at: 176, C: S2,     head: ["THE SAME CHARGE", "EVERY SINGLE MONTH"] },
  { at: 286, C: S3,     head: ["ONE PROMPT BOX", "EVERY VIDEO MODEL"] },
  { at: 340, C: S4,     head: ["KLING, SORA, SEEDANCE", "IN THE SAME WINDOW"] },
  { at: 412, C: S5,     head: ["TYPE ONE LINE", "GET THE CLIP BACK"] },
  { at: 470, C: S6,     head: ["GOOGLE'S NANO BANANA", "FREE IN AI STUDIO"] },
  /* ⛔ "LEVEL WITH", never "better than". The VO said toe to toe. */
  { at: 546, C: S7,     head: ["LEVEL WITH THE PAID ONES", "NOT BEHIND THEM"] },
  { at: 604, C: S8Cta,  head: ["COMMENT FREE", "I'LL SEND ALL THREE"] },
];

/* ---- THE SFX BANK ---------------------------------------------------------
   ⛔⛔ EVERY `dur` BELOW IS >= THE FILE'S MEASURED TRUE LENGTH, measured with
      ffprobe before a single cue was written (reel 78's first bank chopped five
      of six opening cues mid-decay and the whole open sounded cheap):
        impact_deep 0.80 · sub 0.42 · slate_whump 0.16 · mech_clank 0.12 ·
        pneu_thunk 0.45 · metal_ping 0.312 · swooshup 0.42 · swooshdn 0.42 ·
        lib_riser 2.575 · metal_riser 1.95 · pickup_chime 0.34 · thock 0.16 ·
        gold_stamp 0.50 · stamp_press 0.34 · arrive_chime 1.10 ·
        harden_chime 0.60 · temper_chime 0.70 · c_unlock 0.36 · neon_on 0.54 ·
        resolve 0.80 · shimmer 0.80 · lib_whoosh 2.32 · crusher 0.90 ·
        am/cash-register 1.127 · am/room-tone 57.17 · am/counter-tick 1.048 ·
        am/lights-on 0.779 · am/keys-macbook 12.15 · am/loading-loop 2.271
   ⛔ `at` is ROOT seconds, not scene-local ([[reference_reel_sound_design]]).
   ⛔ A `repeat()` RUN IS ONE GESTURE, and no body scene runs more than four.
   ⛔ LAYER THE HERO HIT: attack + low-end body. One thin pop is the single
      thing that makes a reel sound cheap.
   ⛔ RISERS CAPPED AT 2, spent on the reel's two real turns: the engines
      seating (11.85s) and the image resolving (17.20s).
   ------------------------------------------------------------------------ */
const SFX: Cue[] = [
  /* ---- S0 · THE OPEN. ⛔⛔ RE-SCORED FOR THE ROUND-4 HOOK, AND IT WAS WRONG IN
     TWO SEPARATE WAYS. Alex: *"the sfx at the hook are not good."*

     1. IT WAS SCORING A HOOK THAT NO LONGER EXISTS. The old bank was written
        for three TABS landing at 0.53 / 0.90 / 1.27. The rebuilt hook has card
        one already open on frame 0 and the two PRICE BADGES snapping off at
        **0.133 and 0.600**, then three settle bounces at 1.067 / 1.200 / 1.333.
        Every cue was firing on a frame where nothing happened, and the two
        things that DO happen were silent. ⛔ A rebuilt scene invalidates its
        cue sheet exactly like a re-cut VO does.
     2. THE SOUNDS WERE THE WRONG GESTURE. `pneu_thunk` is a thing being
        INSERTED — right for a tab seating into a strip, wrong for a lock
        BREAKING OFF and colour flooding in.

     ⭐⭐ AND THE OBVIOUS REPLACEMENTS WERE A TRAP. The literal picks for "a
        badge snaps off" measured as pure noise on the flatness test that
        [[reference_reel_sound_design]] exists for — `snap.wav` **0.79**,
        `c_break.wav` **0.70**, `am/snap.wav` **0.45**, all centred at 8-10 kHz.
        That is precisely the sample profile that produced reel 99's *"I just
        hear fuzzy sounds, it doesn't sound good."* `spotlight_snap.wav`
        measures **0.023** at 1.5 kHz — it still snaps, but it is TONAL, so it
        reads as a mechanism releasing rather than as hiss.
        Everything below was flatness-checked before it was written in. */
  { at: 0.00, src: "am/room-tone.wav", v: LEVELS.SFX_BED, dur: 6.0 },
  /* frame 0 is a POSTER with card one already live, so it gets a confident
     REVEAL, not a demolition — the old impact_deep + slate_whump slam was
     scoring an impact that no longer happens on that frame. */
  /* ⛔⛔ AND THE FIRST RE-SCORE STILL SOUNDED MUSHY, FOR A THIRD REASON THAT IS
     NEITHER TIMING NOR SAMPLE CHOICE: **FREQUENCY MASKING.** `magic-reveal` is
     centred at **2.6 kHz and runs 0.84s**, so it was still sounding straight
     over both unlocks — whose whole character lives at 1.5 kHz (the snap) and
     1.7 kHz (the chime). Synthesising the cue sheet offline showed it plainly:
     no transient at 0.133 at all, just a wash.
     ⭐ So the open is now LOW-BAND ONLY (impact 595 Hz + sub), which leaves the
     mid completely clear for the two snaps, and the brightness moved to the
     END of the hook (the sparkle at 1.333) where nothing has to cut through it.
     A short tick gives frame 0 its definition and is gone by 0.14s. */
  /* ⛔⛔⛔ AND THE LAST FAULT IS THE ONE THAT MATTERED MOST, BECAUSE IT IS
     STRUCTURAL: **FRAME 0 MUST NOT BE SCORED AS A HIT IN THIS HOOK.**
     The J-cut fires every cue 3 frames (0.10s) BEFORE its visual beat, and
     unlock one is at 0.133s — so its sound has to play at **0.033s**. An open
     hit at 0.000 and a snap at 0.033 are 33ms apart: that is a FLAM, not two
     events, and it is why the hook sounded like one soft mush no matter which
     samples went in.
     ⭐ The resolution is not a sample swap, it is remembering what the picture
     does: frame 0 is a SETTLED POSTER with card one already open — **nothing
     happens there**. So 0.000 gets low-band WEIGHT only (a sub, no transient,
     which still satisfies AUDIO_AT_0 alongside the VO and the room tone), and
     the reel's first real HIT is the first thing that actually moves.
     ⛔ docs/THE-OPEN.md's "frame 0 carries the heaviest stack" assumes frame 0
     is the interrupt. When the open is deliberately a poster, scoring an impact
     on it is scoring an event that is not on screen. */
  { at: 0.00, src: "sub.wav", v: LEVELS.SFX_HERO, dur: 0.46, rate: 0.88 },

  /* ⭐ THE TWO UNLOCKS — one gesture each: a tonal SNAP layered with the badge
     tumbling away, then a bright chime as the colour floods. Pitched up on the
     second so the pair reads as a rising sequence, not the same sound twice. */
  /* ⛔⛔ AND A FOURTH FAULT, WHICH IS THE SUBTLEST OF THE LOT: **A SAMPLE'S HIT
     IS NOT AT ITS FILE START.** `am/whoosh-fast.wav` peaks **0.225s in** — it
     is a whoosh that SWELLS — so pairing it with an instant snap put its body a
     fifth of a second late and the "snap" read as a soft double-thump. Measured
     attack offsets for every cue in this scene: impact 0.000 · sub 0.000 ·
     ticket_click 0.005 · spotlight_snap 0.005 · chimehi 0.000 · thock 0.000 ·
     check-pop 0.000 · sparkle 0.000 · **whoosh-fast 0.205**.
     ⭐ So the break is now two INSTANT-ATTACK samples, and the one swelling
     sound is PRE-ROLLED by its own 0.205s so its peak lands on the settle —
     the same trick the house already uses for risers. */
  ...layer(0.133, { src: "spotlight_snap.wav", v: LEVELS.SFX_HERO, dur: 0.44, rate: 1.0 },
                  { src: "thock.wav", dur: 0.20, rate: 1.0 }),
  { at: 0.19, src: "chimehi.wav", v: LEVELS.SFX_MID, dur: 0.58, rate: 1.0 },
  ...layer(0.600, { src: "spotlight_snap.wav", v: LEVELS.SFX_HERO, dur: 0.44, rate: 1.12 },
                  { src: "thock.wav", dur: 0.20, rate: 1.10 }),
  { at: 0.66, src: "chimehi.wav", v: LEVELS.SFX_MID, dur: 0.58, rate: 1.14 },
  /* the sweep into the settle, pre-rolled 0.205s so its swell peaks ON 1.067 */
  { at: 0.862, src: "am/whoosh-fast.wav", v: LEVELS.SFX_TEXTURE, dur: 0.46, rate: 1.0 },

  /* the three cards settling, 1.067 / 1.200 / 1.333 — light and quick, and a
     sparkle on the last one so the hook resolves rather than just stopping */
  ...repeat(3, 1.067, 0.133, { src: "am/check-pop.wav", v: LEVELS.SFX_MID, dur: 0.68 }, 0.10),
  { at: 1.333, src: "sparkle.wav", v: LEVELS.SFX_MID, dur: 0.54, rate: 1.06 },

  /* ---- S1 · ⛔⛔ THE "PUFF OF AIR" AT 3-4s, AND IT IS THE STALE-CUE-SHEET BUG
     FOR THE THIRD TIME. Alex heard it; here is what it was.
       `pneu_thunk.wav` is a PNEUMATIC actuator — literally a compressed-air
       sample — firing at 4.17s (audible from 4.07 after the J-cut lead) at
       **SFX_HERO, the loudest tier**, with ~49% of its energy in the 300-2500Hz
       band a breath occupies. It was scoring the ORIGINAL S1, where five model
       tiles physically DOCKED into a rail and a pneumatic seat was exactly
       right. **That animation no longer exists** — S1 is now five columns
       lighting up as each model answers, and nothing docks, clamps or seats.
       So the reel was playing an air-actuator over an action that is not on
       screen. Replaced with a tonal confirm (chimehi, flatness 0.007 = pure
       tone, no noise component) plus the usual low body.
     ⚠️ HOW THE DIAGNOSIS WENT, because two of the three steps were WRONG and
       the method matters more than the answer:
       1. Checked the VO for a breath — none (max flatness 0.095 at -62 dB).
       2. Measured >4kHz SHARE in the mix and found "78% air" — **an artifact**:
          the ratio spikes in quiet gaps because the DENOMINATOR collapses.
          Absolute HF energy peaks at -55.7 dB, i.e. inaudible. There is no hiss.
       3. A 300-2500Hz band test then flagged every CHIME as airy, because a
          chime's fundamental lives there too. **Band energy alone cannot tell a
          tone from noise — pair it with flatness or it lies.**
     ⛔ Beats: the five columns answer at 2.77 / 3.07 / 3.43 / 3.87 / 4.17. --- */
  ...repeat(5, 2.77, 0.35, { src: "thock.wav", v: LEVELS.SFX_MID, dur: 0.20 }, 0.06),
  ...layer(4.17, { src: "chimehi.wav", v: LEVELS.SFX_HERO, dur: 0.58, rate: 0.94 },
                 { src: "sub.wav", dur: 0.46, rate: 0.96 }),
  { at: 4.60, src: "harden_chime.wav", v: LEVELS.SFX_MID, dur: 0.64, rate: 1.04 },
  /* ⭐ SLOT 1 lands in the download bar. The three slot-fills are the reel's
     new spine, so each one is scored the same way and pitched UP across the
     three — they have to read as one accumulating gesture across 12 seconds,
     not as three unrelated dings. Root frames 161 / 452 / 528. */
  ...layer(5.367, { src: "arrive_chime.wav", v: LEVELS.SFX_MID, dur: 1.14, rate: 1.0 },
                  { src: "am/check-pop.wav", dur: 0.68, rate: 0.94 }),

  /* ---- S2 · ⭐ THE RECURRING CHARGE. Four stamps at 6.27 / 6.67 / 7.07 /
     7.47, pitched DOWN across the run so the fourth lands heavier than the
     first — the point of the beat is that it does not stop. ----------------- */
  ...repeat(4, 6.27, 0.40, { src: "stamp_press.wav", v: LEVELS.SFX_HERO, dur: 0.38 }, -0.055),
  { at: 6.27, src: "am/cash-register.wav", v: LEVELS.SFX_TEXTURE, dur: 1.16, rate: 0.94 },
  ...layer(7.47, { src: "am/cash-register.wav", v: LEVELS.SFX_MID, dur: 1.16, rate: 0.86 },
                 { src: "sub.wav", dur: 0.46, rate: 0.82 }),
  { at: 8.01, src: "swooshdn.wav", v: LEVELS.SFX_MID, dur: 0.46, rate: 0.92 },

  /* ---- S3 · tab two takes the window and the play head lands. ------------- */
  { at: 9.53, src: "lib_whoosh.wav", v: LEVELS.SFX_MID, dur: 1.10, rate: 1.10 },
  ...layer(10.66, { src: "pneu_thunk.wav", v: LEVELS.SFX_HERO, dur: 0.50, rate: 0.92 },
                  { src: "sub.wav", dur: 0.46, rate: 0.86 }),
  { at: 10.72, src: "neon_on.wav", v: LEVELS.SFX_MID, dur: 0.58, rate: 1.06 },

  /* ---- S4 · ⭐ TURN ONE. The band crosses and three engines seat at 11.93 /
     12.27 / 12.60. A riser pre-rolls so its PEAK lands on the first seat. --- */
  /* ⛔⛔ RE-TIMED. Round 2 moved the seats from local f18/28/38 to f20/32/44 and
     the cue sheet was never re-derived — the same fault Alex caught in the hook.
     Real beats: 12.000 / 12.400 / 12.800, latch 13.067.
     ⛔ AND THE RISER PEAKS AT 1.80s INTO ITS 1.95s FILE, so to land its peak on
     seat one it starts at 12.000 - 1.80 = 10.20. At 10.60 it was peaking on
     seat TWO. */
  { at: 10.20, src: "metal_riser.wav", v: LEVELS.SFX_MID, dur: 1.98, rate: 1.0 },
  ...repeat(3, 12.000, 0.400, { src: "pneu_thunk.wav", v: LEVELS.SFX_HERO, dur: 0.50 }, 0.10),
  ...repeat(3, 12.030, 0.400, { src: "c_unlock.wav", v: LEVELS.SFX_MID, dur: 0.40 }, 0.10),
  { at: 13.067, src: "temper_chime.wav", v: LEVELS.SFX_MID, dur: 0.74, rate: 1.10 },

  /* ---- S5 · the prompt types, the render sweeps, the clip lands. ---------- */
  /* ⛔ RE-TIMED with the compressed build-up: type 13.73 · render 14.13 ·
     the clip LANDS 14.40 and holds to the cut at 15.67. */
  { at: 13.73, src: "am/keys-macbook.wav", v: LEVELS.SFX_TEXTURE, dur: 0.50, rate: 1.0 },
  { at: 14.13, src: "am/loading-loop.wav", v: LEVELS.SFX_TEXTURE, dur: 0.40, rate: 1.12 },
  ...layer(14.400, { src: "impact_deep.wav", v: LEVELS.SFX_HERO, dur: 0.84, rate: 1.02 },
                   { src: "sub.wav", dur: 0.46, rate: 0.92 }),
  /* SLOT 2 — the clip lands in the bar, one step up from slot 1 */
  ...layer(14.400, { src: "arrive_chime.wav", v: LEVELS.SFX_MID, dur: 1.14, rate: 1.10 },
                   { src: "am/check-pop.wav", dur: 0.68, rate: 1.04 }),

  /* ---- S6 · ⭐ TURN TWO. The image resolves. The reel's second and last riser
     is pre-rolled so its peak lands where the picture goes sharp. ----------- */
  /* ⛔⛔ THE RISER WAS PEAKING AFTER ITS OWN SCENE FINISHED. `lib_riser` peaks
     2.53s in; starting at 16.06 put its peak at **18.59**, and the image is
     fully sharp at 17.600 with the scene ending at 18.200. Nobody ever heard
     the payoff. `metal_riser` peaks 1.80s in, so at rate 0.92 it peaks 1.96s
     in and starting at 15.64 lands it exactly on the sharp frame. */
  { at: 15.67, src: "lib_whoosh.wav", v: LEVELS.SFX_MID, dur: 1.10, rate: 0.94 },
  { at: 15.64, src: "metal_riser.wav", v: LEVELS.SFX_MID, dur: 2.15, rate: 0.92 },
  { at: 17.600, src: "shimmer.wav", v: LEVELS.SFX_MID, dur: 0.84, rate: 1.08 },
  /* ⭐ SLOT 3 — the tray completes. Highest of the three, and it is the beat
     the whole build has been pointing at since 5.4s. */
  ...layer(17.600, { src: "arrive_chime.wav", v: LEVELS.SFX_HERO, dur: 1.14, rate: 1.20 },
                   { src: "am/check-pop.wav", dur: 0.68, rate: 1.14 }),
  { at: 17.86, src: "am/lights-on.wav", v: LEVELS.SFX_MID, dur: 0.80, rate: 1.0 },

  /* ---- S7 · the two bars rise and LOCK LEVEL. The tie is one sound, not a
     fanfare — nothing here is a victory. ------------------------------------ */
  /* ⛔⛔ RE-TIMED — S7 was rebuilt from scratch in round 2 and its cues were not.
     Real beats: card L 18.867 · card R 19.033 · the equals 19.200 · the bars
     LOCKING LEVEL 19.800, which is the beat of the whole scene and was being
     scored 0.4s early. ⭐ counter-tick peaks 0.60s in, so at 18.26 it lands on
     card L at 18.86 — kept exactly for that reason. */
  { at: 18.26, src: "am/counter-tick.wav", v: LEVELS.SFX_TEXTURE, dur: 1.06, rate: 1.04 },
  { at: 19.033, src: "thock.wav", v: LEVELS.SFX_MID, dur: 0.20, rate: 1.06 },
  { at: 19.200, src: "pickup_chime.wav", v: LEVELS.SFX_MID, dur: 0.38, rate: 1.10 },
  ...layer(19.800, { src: "harden_chime.wav", v: LEVELS.SFX_HERO, dur: 0.64, rate: 0.98 },
                   { src: "sub.wav", dur: 0.46, rate: 0.90 }),

  /* ---- S8 · the keyword stamps. ⛔ The reel hard-cuts at 22.067s, so nothing
     here may ring past it — the last cue starts at 21.10 and runs 0.52s. ---- */
  /* ⛔⛔ RE-TIMED — round 2 pulled the link-card fan from f24/30/36 to f10/17/24
     so the three chimes were firing up to **0.46s after** the cards had landed.
     Real beats: card1 20.467 · FREE stamp 20.533 · card2 20.700 · card3 20.933. */
  { at: 20.30, src: "swooshup.wav", v: LEVELS.SFX_TEXTURE, dur: 0.46, rate: 1.06 },
  ...layer(20.533, { src: "stamp_press.wav", v: LEVELS.SFX_HERO, dur: 0.38, rate: 0.96 },
                   { src: "sub.wav", dur: 0.46, rate: 0.88 }),
  { at: 20.60, src: "gold_stamp.wav", v: LEVELS.SFX_MID, dur: 0.54, rate: 1.0 },
  ...repeat(3, 20.467, 0.233, { src: "pickup_chime.wav", v: LEVELS.SFX_MID, dur: 0.38 }, 0.10),
  { at: 21.10, src: "resolve.wav", v: LEVELS.SFX_MID, dur: 0.84, rate: 1.02 },
];

/* ⛔ NO IRIS, NO WHITE FLASH, NO PURE BLACK OR WHITE PLATE
   ([[feedback_no_flashing_transitions]]): peak opacity 0.15, ramping in AND
   out, and warm rather than white. ⭐ The rule's own escape hatch — *"a hard cut
   with nothing over it is always an acceptable answer"* — is taken on the two
   matched joins below. */
const Trans: React.FC<{ at: number }> = ({ at }) => {
  const f = useCurrentFrame();
  const n = 8;
  if (f < at || f >= at + n) return null;
  const env = Math.sin(((f - at) / n) * Math.PI);
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 140, pointerEvents: "none",
      background: "#F4EEE2", opacity: env * 0.15 }} />
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

export type Variant = { bed: string; seed: number; capTop: number };

export const VARIANTS: Variant[] = [
  { bed: "105_free_bed.wav", seed: 0, capTop: 1252 },
];

export const makeReel = (v: Variant): React.FC => () => (
  <AbsoluteFill>
    <Audio src={staticFile("vo_105free.wav")} />
    {/* ⛔⛔ THE BED MUST BE AUDIBLE AT 0.00s ([[soundtrack-onset-at-zero]]).
        ROUND 2: Alex, *"the BG music is too loud and isn't the right BG music
        here."* Both halves were real and they had different causes.

        TOO LOUD was measurable: the delivered mix sat **7.3 dB under the VO in
        the gaps** where a dialogue bed wants 10-15. Fixed in three places, not
        one — the passage is loudnormed to -25 LUFS instead of -23, the duck now
        pulls to **0.28** under a phrase instead of 0.38, and the fader is 0.42
        instead of 0.62. Measured after: separation -7.3 dB -> -11.5 dB.

        NOT THE RIGHT MUSIC was a passage problem. v1 took 88.0s, which is the
        brass section, on a reel about quietly replacing subscriptions. This is
        **1.5s — the track's own sparse piano intro**, and it is the last part
        of this track that no reel has touched: 39.2s (101), 56.0s (103), 61.2s
        (102), 88.0s (this reel's v1), 111.0/137.0/188.0s (104's three cuts).
        ⛔ A 23s window with ZERO overlap does not otherwise exist any more —
        the only other candidate (160s) contains a real 4.5s musical rest that
        would fail MUSIC_CONTINUOUS. The intro is the last clean passage.
        ⛔ "Every Living Breathing Moment" is fully consumed ([[agency-reel]]). */}
    {/* ⛔⛔ THE HOUSE-WIDE BED BUG IS FIXED HERE, NOT INHERITED. Reels 103 and
        104 both shipped `<Audio src={bed} />` with NO volume prop, so
        `LEVELS.MUSIC` was never applied and the bed played at full file level
        against a VO peaking at -17.5 — about 6 dB of separation where a
        dialogue bed wants 10-15.
        ⭐ THE FIX IS A REAL SIDECHAIN, not a flat trim. `bed_duck_105.json` is
        generated from THIS VO's own per-frame envelope with a fast attack (3f)
        and a slow release (14f), so the bed opens up in every gap and closes
        under every phrase. It also cancels the passage's own **+2.03 dB rise**
        across the reel (which is what "it gets loud at the end" actually is)
        and ramps to zero over the last 0.6s so nothing swells past "links."
        ⛔ Do NOT also multiply by LEVELS.MUSIC — reel 104 tried that and the
        bed landed at -45 dB, inaudible. The 0.42 here IS the level. */}
    <Audio src={staticFile(v.bed)}
      volume={(fr) => 0.42 * (bedDuck[Math.min(fr, bedDuck.length - 1)] ?? 1)} />
    <SfxTrack cues={SFX} />
    <Bg />

    <AssemblyCtx.Provider value={true}>
      {SCENES.map((sc, i) => {
        const to = i < SCENES.length - 1 ? SCENES[i + 1].at : FREE_TOTAL;
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

    {/* ⛔ NO WIPE ON A MATCHED JOIN. storyboards/CAMERA-GRAMMAR.md is explicit
        that a wipe kills a match cut. S3 (286) matches S2 on the Magnific
        capture already wiped in, and S5 (412) matches S4 on the same page, so
        both are excluded and take a hard cut. */}
    {/* ⭐ the full-FRAME payoffs sit ABOVE the panel and BELOW the chrome, so
        they break the 41%-of-screen ceiling while the rail and the karaoke
        captions still read on top of them. */}
    <Payoffs />

    {SCENES.slice(1).filter((sc) => sc.at !== 286 && sc.at !== 412)
      .map((sc) => <Trans key={"t" + sc.at} at={sc.at} />)}

    {SCENES.map((sc, i) => {
      const to = i < SCENES.length - 1 ? SCENES[i + 1].at : FREE_TOTAL;
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

export const FreeReel = makeReel(VARIANTS[0]);
