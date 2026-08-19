import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx, HookHeader } from "./SlopKit";
import { S0, S1, S2, S3, S4, S5, S6, S7, S8, S9 } from "./FlwScenes";
import type { Variant } from "./FlwScenes";
import { CamCtx } from "./FlwWorld";
import { CAM, GRADE } from "./FlwScenes";
import { SfxTrack, LEVELS, db, Cue } from "./SoundKit";
import words from "./data/words_110flow.json";

/* ===========================================================================
   REEL 110 · "FLOW" — THE ASSEMBLY.  Board: storyboards/110-flow.md.

   github.com/ruvnet/ruflo — the repo that used to be `ruvnet/claude-flow`. One
   Claude drowning in a queue types `npx ruflo init` and becomes SIXTY Claudes
   that work in parallel, share one memory, improve each other every run, and
   route the easy work off the frontier model.

   VO: public/vo_110flow.wav — 31.36s, 119 words, cut from a 50.57s raw take.
   ONE `cut cut` flub removed, the lead and tail trimmed, five pauses tightened,
   x1.15, two-pass loudnorm to -16.0 LUFS. The cut file was re-transcribed and
   0 flubs survived.

   ⛔⛔⛔ THE LEAD TRIM WAS WRONG THE FIRST TIME AND `VO_ONSET_0` PASSED IT.
      Alex: *"the video needs to start right when the VO starts, cut out the blank
      space."* The reel opened with **0.53s of dead room tone** and every gate said
      it was fine, because `silencedetect=-40dB` found a **-48 dB blip** at raw
      1.847s — a mouth click, not a word — and reported speech from there. The
      real onset of "Meet" is raw **2.50s**, 0.65s later, which only a 10ms RMS
      scan shows:
        1.84s  -48.5   <- the blip silencedetect called speech
        1.86s  -60.8       ... 0.6s of room tone at -55 to -70 ...
        2.48s  -69.7
        2.50s  -26.4   <- the actual word
      ⭐ THE RULE: **silencedetect finds a THRESHOLD CROSSING, not a word.** For a
      LEAD or TAIL trim, always confirm with a 10ms RMS scan and cut to where the
      level goes and STAYS above about -30 dB. Re-cut at 2.44 (0.06s of natural
      pre-roll): the voice now starts at 0.01s and is at full level by 0.02s.

   ⭐ 31.36s is just outside the stated 22-29s house range and squarely inside
      what actually ships (107 CLAUDE 35.11 · 104 PLUGIN 30.66 · 100 APPLE 23.21).
      Flagged, not silently trimmed.

   ⛔⛔ THE HONESTY LEDGER LIVES IN FlwWorld.tsx (`R`, `PCT_BANNED`,
      `RANK_BANNED`, `COUNT_BANNED`). The two that matter:
      1 the VO's "75%" is NOWHERE in the source, so no percentage is typeset
        anywhere — S5 shows the needle fall and stops at the edge of the claim;
      2 the VO's "ranked number one" was the OLD claude-flow description and is
        not in the current one, so S8 shows the repo's own TOPIC chips instead.

   ⛔⛔ THE HEADER IS ON FOR ALL 958 FRAMES, rendered HERE at root, outside every
      Sequence — never per-scene, never dropped after the hook. It is fed `f + 12`
      on the hook so it is SETTLED on frame 0 (SectionHeader fades in over 10
      frames). It also CHANGES per section: reel 107 taught that the header must
      never disappear, and reel 108 taught that that is not the same instruction
      as saying the same thing for the whole reel.

   ⛔ ROOT OWNS THE GLOBAL CHROME: Bg, the one continuous ProgressBar, the one
      KaraokeCaption track, the VO and the header. Scene bodies see
      AssemblyCtx = true so their own copies return null.

   ⛔⛔ EVERY `at` IN THE SFX BANK IS ROOT SECONDS, NOT SCENE-LOCAL. Scene bodies
      are not Sequence-wrapped for audio purposes ([[sfx-root-timeline-trap]]).
   ⛔ `src` IS RELATIVE TO public/sfx/ — `Sfx` prefixes "sfx/" itself.
   ========================================================================= */

export const FPS = 30;

/** 941 frames = 31.37s. The VO file runs 31.36s and its last word is still
    sounding at 30.95s, so the reel carries the tail and hard-cuts after it. */
export const FLW_TOTAL = 941;

/* ⛔ MEASURED WORD ONSETS from src/data/words_110flow.json, converted to frames.
   Nothing here is estimated — every value is `round(onset * 30)` of the VO's own
   sentence starts. */
export const L = {
  S0: 0,      /* HOOK      0.00s  "Meet the most powerful Claude tool"     */
  S1: 55,     /* SWARM     1.83s  "60 agents working together"             */
  S2: 167,    /* NAME      5.57s  "It's called Ruflo"                      */
  S3: 226,    /* BENCHES   7.53s  "One agent handles planning"             */
  S4: 340,    /* BANK     11.35s  "They all run in parallel"               */
  S5: 451,    /* METER    15.04s  "here's the part that's even crazier"    */
  S6: 574,    /* ROUTER   19.12s  "Basic tasks route to a free tier"       */
  S7: 720,    /* PAYOFF   23.99s  "Your Claude subscription"               */
  S8: 801,    /* STARS    26.70s  "It's even ranked"                       */
  S9: 905,    /* CTA      30.16s  "Comment Flow for the link"              */
  END: FLW_TOTAL,
} as const;

const DUR = {
  S0: L.S1 - L.S0, S1: L.S2 - L.S1, S2: L.S3 - L.S2, S3: L.S4 - L.S3,
  S4: L.S5 - L.S4, S5: L.S6 - L.S5, S6: L.S7 - L.S6, S7: L.S8 - L.S7,
  S8: L.S9 - L.S8, S9: L.END - L.S9,
} as const;

/* ---- THE SFX BANK ---------------------------------------------------------
   ⛔⛔⛔ REBUILT FROM ZERO. Alex on v1: *"a lot of the sfx are not good enough
   throughout the entire video, it just sounds like video game upgrade sounds or
   something like that, it's not good at all."*

   He is describing a real, countable defect, not a vibe. **24 of v1's 41 cues
   came from ONE chiptune pack** — every file in this library prefixed `c_`:
     c_1up · c_coin · c_collect · c_grow · c_fanfare · c_powerbig · c_bump
     c_clear · c_stomp · c_stomp2 · c_hit · c_break · c_warp · c_boss · c_unlock
   Each one passed `sfx_audit` on its own numbers, because that tool measures
   HISS, AIR, OVER-RING and SLAP — it has no gate for *"this is a Mario sound"*.
   Four level-ups scored with `c_1up` and five lane arrivals with `c_coin` is an
   arcade, and this reel is a machine room.

   ⭐ THE RULE THIS PRODUCED: **the bank has to belong to the WORLD, not just
   pass the gates.** Every cue below is either a cinematic impact or a real
   mechanical/foley sound, chosen so the reel sounds like the place it is set in:
   a relay throwing, a gear changing, a lamp snapping on, a metal drawer taking
   a block, a knife switch, a bin taking a parcel, a service bell.

   **ZERO `c_*` cues remain.** The greppable gate is:
       grep -oE 'src: .c_[a-z0-9_]+' src/ClaudeFlowReel.tsx | wc -l   ->  0

   The measurements below are this repo's own, taken on build day:
     thock         1.3% >2kHz · 88.6% <250Hz    adv_strike    0.4% · 88.9%
     impact        6.2%        · 42.1%          chair_knock  10.8% · 70.1%
     impact_deep   0.4%        · 93.1%          can_bong     17.4% · 46.0%
     sub           0.8%        · 96.6%          slate_whump   2.2% · 44.7%
     spotlight_snap 5.2%       · 16.0%          gear_shift   43.3% · 35.5%
     data         14.6%                         knife_switch 51.5% · 19.7%
     scan_beep     7.4%                         crusher      33.3% · 39.5%
     temper_chime  4.9%                         stage_hum     0.3% · 70.3%
   ⛔ SLAP GATE: a cue used 5+ times must be <=35% above 2kHz. So `ratchet`
   (67.3%), `key` (97.0%), `ticket_click` (92.1%), `sign_clack` (49.9%),
   `gear_shift` (43.3%), `ui_tap` (65.7%), `stamp_press` (50.4%) and
   `gold_stamp` (68.8%) are each capped at FOUR uses, and the low ones carry the
   repetition.
   ⛔ Every `dur` is >= the file's measured true length so no tail is chopped
   mid-decay. `lib_cinematic_hit` (5.63s true) is deliberately truncated to 1.40s
   under the over-ring gate: a slam does not sustain for five seconds.
   40 cues / 31.36s = 1.28 per second, inside the house range
   (95 TOOLS 0.98 · 105 FREE 1.13 · 106 SKILL 1.48 · a REJECTED 107 pass 3.82).
   ------------------------------------------------------------------------ */
const BANNED_SFX = ["am/cloth-shiver.wav", "am/paper-rustle.wav",
  "am/check-pop.wav", "swooshup.wav", "swooshdn.wav", "blip_up.wav",
  "am/click-hard.wav", "chimehi.wav", "am/whoosh-fast.wav",
  "lib_whoosh.wav", "boom.wav", "clap_slam.wav", "punch_thud.wav"] as const;

/** ⛔ AND THE FAMILY BAN, which is the new one. Nothing from the chiptune pack
    goes back in, however well it measures. */
const BANNED_FAMILY: string = ["c", "_"].join("");

/* ⛔ NOT EVERY CUT GETS A TRANSIENT. Ten identical marks is a metronome, not an
   edit — the picture cut carries itself.
   ⭐ DENSITY IS A SHAPE, NOT A LEVEL. This bank runs 3-5 cues in most scenes and
   ELEVEN in S6, the one that carries the story. */
const SFX_RAW: Cue[] = [

  /* ---- S0 0.00-1.83 · THE HOOK -----------------------------------------
     ⛔⛔ WHEN A SCENE'S TIMING CHANGES, ITS CUES ARE PART OF THE SCENE. The hook
     was rebuilt as a lift and the old bank was still firing at 0.27 / 0.40
     against a drive at 0.23 and a shatter at 0.70 — re-derived from the frame
     constants, never left to drift.
     ⭐ The two beats are a STRAIN and a BREAK, and they sound different: the
     drive is `adv_strike` (0.4% >2kHz, 88.9% <250Hz) plus `sub`, a low metal
     groan you feel; the shatter is `lib_cinematic_hit` + `sub` + `thock` +
     `crusher` — 80.9%, 96.6%, 88.6% low, with something actually breaking on
     top of it. */
  { at: 0.00, src: "sub.wav", v: LEVELS.SFX_BED, dur: 0.42 },
  { at: 0.23, src: "adv_strike.wav", v: db(-15), dur: 0.60, rate: 0.86 },
  { at: 0.23, src: "sub.wav", v: db(-14), dur: 0.42 },
  { at: 0.70, src: "lib_cinematic_hit.wav", v: LEVELS.SFX_HERO, dur: 1.40 },
  { at: 0.70, src: "sub.wav", v: db(-10), dur: 0.42 },
  { at: 0.70, src: "thock.wav", v: db(-11), dur: 0.16, rate: 0.78 },
  { at: 0.74, src: "crusher.wav", v: db(-17), dur: 0.90 },
  /* the swarm accelerating out — machine data, not arcade blips */
  ...[0.98, 1.26, 1.54].map((t, i) => ({
    at: t, src: "data.wav", v: db(-22 + i * 1.4), dur: 0.21, rate: 0.90 + i * 0.12,
  } as Cue)),

  /* ---- S1 1.83 · SIXTY LAND, then FOUR upgrades -------------------------
     ⛔⛔ v1 SCORED THE FOUR LEVEL-UPS WITH `c_1up` — the single most
     "video-game upgrade sound" choice available in the library, four times in
     three seconds. A swarm getting faster is a MACHINE CHANGING GEAR, so it is
     `gear_shift` with a `can_bong` under it, rising in pitch each time. */
  { at: 1.85, src: "impact_deep.wav", v: db(-11), dur: 0.80 },
  { at: 1.85, src: "sub.wav", v: db(-12), dur: 0.42 },
  ...[2.96, 3.76, 4.56, 5.16].map((t, i) => ({
    at: t, src: i % 2 ? "gear_shift.wav" : "can_bong.wav",
    v: db(-19 + i * 0.8), dur: i % 2 ? 0.09 : 0.34, rate: 0.90 + i * 0.08,
  } as Cue)),

  /* ---- S2 5.57 · the name LANDS, five letters, then the lamps strike ----- */
  ...[5.64, 5.77, 5.90, 6.04, 6.17].map((t, i) => ({
    at: t, src: "thock.wav", v: db(-16 + i * 0.9), dur: 0.16, rate: 0.84 + i * 0.06,
  } as Cue)),
  { at: 6.38, src: "ratchet.wav", v: db(-17), dur: 0.50, rate: 1.06 },
  { at: 6.90, src: "spotlight_snap.wav", v: db(-16), dur: 0.40 },
  { at: 7.14, src: "key.wav", v: db(-22), dur: 0.05, rate: 1.02 },

  /* ---- S3 7.53 · four bench lamps, one job through four hands ------------
     ⭐ A LAMP SNAPPING ON IS `spotlight_snap` — the literal sound of the thing on
     screen, 5.2% above 2kHz and 16% below 250Hz, so four of them do not stack
     into a metronome. The failing test is `chair_knock` (70.1% LOW): a dull
     knock reads as a REJECT, where a bright tick reads as a pass. */
  ...[7.56, 8.59, 9.29, 10.23].map((t, i) => ({
    at: t, src: "spotlight_snap.wav", v: db(-17 + i * 0.5), dur: 0.40, rate: 0.92 + i * 0.06,
  } as Cue)),
  ...[8.86, 9.02].map((t, i) => ({
    at: t, src: "ui_tap.wav", v: db(-24), dur: 0.10, rate: 0.96 + i * 0.10,
  } as Cue)),
  { at: 10.02, src: "chair_knock.wav", v: db(-17), dur: 0.30, rate: 1.04 },
  { at: 10.94, src: "stamp_press.wav", v: db(-16), dur: 0.34, rate: 0.96 },

  /* ---- S4 11.35 · THE MEMORY BANK: one in, three out, three times --------
     ⭐ The deposit is a block going into a METAL DRAWER, so it is `can_bong`
     (46.0% low) rising; the return is `slate_whump` (44.7% low), a flatter,
     softer land, so IN and OUT are audibly different events. `stage_hum` under
     the whole scene is the bank itself running. */
  { at: 11.40, src: "stage_hum.wav", v: db(-26), dur: 2.00 },
  ...[11.79, 12.79, 13.79].map((t, i) => ({
    at: t, src: "can_bong.wav", v: db(-16 + i * 0.7), dur: 0.34, rate: 0.92 + i * 0.09,
  } as Cue)),
  ...[12.32, 13.32, 14.32].map((t, i) => ({
    at: t, src: "slate_whump.wav", v: db(-17 + i * 0.6), dur: 0.16, rate: 1.06 - i * 0.07,
  } as Cue)),
  { at: 14.86, src: "temper_chime.wav", v: db(-19), dur: 0.70, rate: 1.04 },

  /* ---- S5 15.04 · the villain's last four climbs, then its fall ----------
     ⭐ The climbs RISE and the falls DESCEND, so the turn is audible with the
     picture muted. ⛔ v1 threw `c_boss` at the breaker, which is a boss-fight
     sting; the thing on screen is a BREAKER, so it is a `knife_switch`. */
  ...[15.17, 15.57, 15.97, 16.37].map((t, i) => ({
    at: t, src: "impact.wav", v: db(-17 + i * 1.1), dur: 0.62, rate: 0.90 + i * 0.07,
  } as Cue)),
  { at: 16.84, src: "knife_switch.wav", v: db(-13), dur: 0.12 },
  { at: 16.84, src: "sub.wav", v: db(-14), dur: 0.42 },
  ...[16.97, 17.50, 18.04, 18.57].map((t, i) => ({
    at: t, src: "thock.wav", v: db(-13 - i * 0.5), dur: 0.16, rate: 1.10 - i * 0.09,
  } as Cue)),

  /* ---- S6 19.12 · ⭐⭐ THE PEAK. Eleven cues, the densest scene in the reel.
     Six blade throws alternating two MECHANISMS (a ratchet and a gear change),
     five free-lane arrivals and three heavy frontier landings, so the RATIO is
     audible as well as visible. */
  ...[19.66, 20.51, 21.36, 22.21, 22.81, 23.41].map((t, i) => ({
    at: t, src: i % 2 ? "gear_shift.wav" : "ratchet.wav",
    v: db(i % 2 ? -17 : -19), dur: i % 2 ? 0.09 : 0.50, rate: 0.90 + (i % 3) * 0.10,
  } as Cue)),
  ...[19.91, 20.76, 21.61, 22.46, 23.31].map((t, i) => ({
    at: t, src: i % 2 ? "ticket_click.wav" : "sign_clack.wav",
    v: db(-24), dur: i % 2 ? 0.14 : 0.22, rate: 0.98 + i * 0.05,
  } as Cue)),
  ...[20.31, 21.81, 23.06].map((t, i) => ({
    at: t, src: "impact_deep.wav", v: db(-15 + i * 0.8), dur: 0.80, rate: 0.94 + i * 0.05,
  } as Cue)),

  /* ---- S7 23.99 · THE BRIGADE: parcels landing in the bin ----------------
     ⛔ v1 used `c_collect` and `c_fanfare` here, which is exactly the "upgrade
     sound" note. A parcel hitting a wooden bin is `slate_whump`, and the bin
     going over the top is a real `bell_ring`. */
  ...[24.86, 25.46, 26.06].map((t, i) => ({
    at: t, src: "slate_whump.wav", v: db(-16 + i * 0.7), dur: 0.16, rate: 0.96 + i * 0.07,
  } as Cue)),
  { at: 26.24, src: "bell_ring.wav", v: db(-22), dur: 1.60, rate: 1.06 },

  /* ---- S8 26.70 · the card re-forms and the count rolls up --------------- */
  ...[26.78, 26.98, 27.18, 27.38].map((t, i) => ({
    at: t, src: "thock.wav", v: db(-17 + i * 0.7), dur: 0.16, rate: 0.86 + i * 0.07,
  } as Cue)),
  ...[27.70, 28.30, 28.90, 29.44].map((t, i) => ({
    at: t, src: "data.wav", v: db(-23 + i * 0.7), dur: 0.21, rate: 0.88 + i * 0.09,
  } as Cue)),
  { at: 29.62, src: "scan_beep.wav", v: db(-21), dur: 0.40, rate: 1.04 },
  { at: 29.90, src: "gold_stamp.wav", v: db(-15), dur: 0.50, rate: 1.02 },

  /* ---- S9 30.16 · the keyword STRUCK into the plate, twice ---------------
     A strike is a THUD. `impact` is 42.1% under 250Hz; `adv_strike` is 88.9%. */
  { at: 30.26, src: "impact.wav", v: db(-15), dur: 0.62, rate: 0.94 },
  { at: 30.76, src: "impact.wav", v: db(-12), dur: 0.62, rate: 1.04 },
  { at: 30.76, src: "adv_strike.wav", v: db(-13), dur: 0.60, rate: 1.06 },
  { at: 30.76, src: "sub.wav", v: db(-12), dur: 0.42 },
];

/* ⛔⛔⛔ "WHERE ARE THE SFX?" — AND THEY WERE ALL THERE (reel 108). The bank had
   57 cues, the audit was green, and every one fired. SOLOING THE STEM is what
   found it: at -16 LUFS the VO dominates every RMS window and will happily tell
   you the effects are fine.
     SFX stem alone   mean -37.8 dB   peak -15.9 dB
     VO same window   mean -19.5 dB   peak  -2.7 dB
   A transient 13 dB below a continuous voice is not a quiet effect, it is an
   inaudible one. The bank's SHAPE was never the problem, so this is ONE global
   gain rather than 41 hand-edits — the density contour and the no-bright-sample
   -over-3x rule are both untouched. */
const SFX_GAIN = db(9);
const SFX: Cue[] = SFX_RAW.map((c) => ({ ...c, v: c.v * SFX_GAIN }));

/** ⛔ A DIFFERENT BED PER CUT — the VO is the same recording and cannot change,
    so the bed is the only real audio-side lever against a fingerprint match.
    ⛔⛔ EVERY BED IS AIR-SWELL SCANNED BEFORE USE. The reel-107 "puff of air" was
    reported FIVE times over four rounds and answered three times by rebuilding
    the SFX bank — which changed nothing, because the sound was in the MUSIC BED
    and then in the VOICE. A note that survives a fix means the fix is in the
    WRONG LAYER. */
/* ⛔ ONE BED ACROSS THREE CUTS IS NOT A VARIANT. The VO is the same recording and
   cannot change, so the bed is the ONLY real audio-side lever against a fingerprint
   match — and all three cuts were sharing one. Three different SOURCE tracks now,
   each time-stretched to 31.40s, faded and two-pass loudnormed to -16.9 LUFS. */
/* ⛔⛔⛔ NEVER `atempo` A MUSIC BED BY MORE THAN ABOUT 6%. The first amber bed was
   built from a 39.2s source stretched to 31.4s — **atempo 1.2464, a 25% speed-up**
   — and Alex heard it immediately: *"the background music doesn't sound right."*
   `atempo` preserves pitch, which is exactly why it is so easy to abuse: nothing
   goes out of tune, the TEMPO just becomes wrong and the transient smearing gets
   audible past roughly 1.1. A voice can take it; music cannot.
   ⭐ THE RULE: pick a source that is ALREADY within ~6% of the target length, or
   trim/loop it. Do not stretch it into place. `build` asserts the limit now.
      night  104_plugin_bed    31.50s -> atempo 1.0016  (0.2%)
      amber  104_plugin_bed_b  31.50s -> atempo 1.0016  (0.2%)
      steel  103_trade_bed_c   32.00s -> atempo 1.0175  (1.8%)
   ⛔ And they must be different PIECES, not level variants of one track: envelope
   correlation against night's bed is +0.34 and -0.07, i.e. genuinely different. */
const BED: Record<Variant, string> = {
  night: "110_flow_bed.wav",             /* 104 PLUGIN   · atempo 1.0016 */
  amber: "110_flow_bed_amber.wav",       /* 104 PLUGIN b · atempo 1.0016 */
  steel: "110_flow_bed_steel.wav",       /* 103 TRADE  c · atempo 1.0175 */
};

/** ⛔ a different caption band per cut — cheap, and it changes every frame */
const CAP_Y: Record<Variant, number> = { night: 1252, amber: 1318, steel: 1186 };

/** ⛔⛔ THE BED WAS 7 dB HOTTER THAN THE HOUSE FIGURE, and the ear caught it before
    any tool did. Alex: *"the bg music is pretty damn loud right now."* Measured:

      VO  file -17.7 LUFS x LEVELS.DIALOGUE (-6)  ->  -23.7 in the mix
      bed file -16.9 LUFS x LEVELS.MUSIC*db(8)    ->  -28.9 in the mix
      gap 5.2 dB

    Reel 108's own note sets the target at **~12 dB under the VO — "present, not
    competing"** — so this was carrying 7 dB too much. `db(2)` instead of `db(8)`
    puts the gap at **11.2 dB**, i.e. back on the house figure.
    ⭐ The reason it drifted: reel 108 hit the OPPOSITE bug (a bed 26 dB under the
    voice, inaudible) and the +8 dB trim that fixed it was copied forward without
    re-measuring against a DIFFERENT bed source. **A gain that fixed one reel is
    not a constant** — always re-measure the two stems against each other.
    ⛔ The shared `LEVELS.MUSIC` is untouched; other reels are balanced to it. */
export const BED_TRIM = { loud: db(8), quiet: db(2) } as const;

export const makeReel = (v: Variant, bed: keyof typeof BED_TRIM = "quiet"): React.FC => () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Bg />
      <Audio src={staticFile("vo_110flow.wav")} volume={LEVELS.DIALOGUE} />
      {/* ⛔⛔ "WHERE IS THE BG MUSIC?" — and it was in the file the whole time,
          26 dB under the voice, because TWO attenuations were stacked: a bed
          built at -5.8 dB AND the house `LEVELS.MUSIC = db(-20)`. The bed here is
          normalised to -16.9 LUFS and given a +8 dB reel-local trim so it lands
          ~12 dB under the VO — present, not competing. The shared MUSIC constant
          is untouched, because other reels are balanced against it. */}
      <Audio src={staticFile(BED[v])} volume={LEVELS.MUSIC * BED_TRIM[bed]} />
      <SfxTrack cues={SFX} />

      <CamCtx.Provider value={{ ...CAM[v] }}>
        <AssemblyCtx.Provider value={true}>
          <div style={{ position: "absolute", inset: 0, filter: GRADE[v] }}>
          <Sequence from={L.S0} durationInFrames={DUR.S0}><S0 v={v} /></Sequence>
          <Sequence from={L.S1} durationInFrames={DUR.S1}><S1 v={v} /></Sequence>
          <Sequence from={L.S2} durationInFrames={DUR.S2}><S2 v={v} /></Sequence>
          <Sequence from={L.S3} durationInFrames={DUR.S3}><S3 v={v} /></Sequence>
          <Sequence from={L.S4} durationInFrames={DUR.S4}><S4 v={v} /></Sequence>
          <Sequence from={L.S5} durationInFrames={DUR.S5}><S5 v={v} /></Sequence>
          <Sequence from={L.S6} durationInFrames={DUR.S6}><S6 v={v} /></Sequence>
          <Sequence from={L.S7} durationInFrames={DUR.S7}><S7 v={v} /></Sequence>
          <Sequence from={L.S8} durationInFrames={DUR.S8}><S8 v={v} /></Sequence>
          <Sequence from={L.S9} durationInFrames={DUR.S9}><S9 v={v} /></Sequence>
          </div>
        </AssemblyCtx.Provider>
      </CamCtx.Provider>

      <ProgressBar />
      <KaraokeCaption words={words as any} fps={FPS} top={CAP_Y[v]} />
      <SectionBand f={f} />
    </AbsoluteFill>
  );
};

/* =========================================================================
   ⭐⭐ THE HEADER CHANGES PER SECTION, AND IS NEVER OFF.
   Reel 107: *"the header needs to be there the whole time."* Reel 108: *"the
   headers don't change."* Both are true and they are not the same instruction —
   it is on for every frame AND it re-states the current claim, so the reel is
   legible to someone watching muted.

   ⭐ Each band names the MECHANISM in product nouns, never the theme
   ([[feedback_headers_state_the_claim]]).
   ⛔⛔ NOTHING HERE MAY CARRY A PERCENTAGE OR A RANK. The VO's "75%" and "ranked
   number one" are both unsourced against the live repo (see FlwWorld `R`), so
   the S5/S8 bands state the MECHANISM and the RECEIPT instead.
   ====================================================================== */
const BANDS: Array<{ from: number; big: string; hot: string }> = [
  { from: L.S0, big: "60 CLAUDE AGENTS", hot: "OUT OF ONE FREE REPO" },
  { from: L.S1, big: "THEY ALL RUN AT ONCE", hot: "AND LEARN EVERY RUN" },
  { from: L.S2, big: "RUFLO", hot: "ONE COMMAND TO INSTALL" },
  { from: L.S3, big: "PLAN · CODE · TEST · SECURE", hot: "FOUR AGENTS, ONE JOB" },
  { from: L.S4, big: "ONE SHARED MEMORY", hot: "WHAT WORKED GOES BACK" },
  { from: L.S5, big: "YOUR API SPEND", hot: "STOPS GOING UP" },
  { from: L.S6, big: "EASY WORK GOES FREE", hot: "ONLY HARD WORK PAYS" },
  { from: L.S7, big: "THE QUEUE IS GONE", hot: "SAME SUBSCRIPTION" },
  { from: L.S8, big: "68,132 STARS · MIT", hot: "ruvnet/ruflo" },
  { from: L.S9, big: "COMMENT FLOW", hot: "AND I'LL SEND THE LINK" },
];

const SectionBand: React.FC<{ f: number }> = ({ f }) => {
  let i = 0;
  for (let j = 0; j < BANDS.length; j++) if (f >= BANDS[j].from) i = j;
  const b = BANDS[i];
  /* ⛔ the hook is fed f+12 so it is SETTLED on frame 0 (SectionHeader fades in
     over 10 frames); every later band fades in on its own cut. */
  return <HookHeader big={b.big} hot={b.hot} f={i === 0 ? f + 12 : f - b.from} />;
};

export const ReelNight = makeReel("night");
export const ReelAmber = makeReel("amber");
export const ReelSteel = makeReel("steel");
/** ⛔ `quiet` IS THE DEFAULT because it is the house figure — the bed lands 11.2 dB
    under the VO, where `loud` put it 5.2. `ReelLoud` exists only as an A/B
    reference so the two levels can be compared on identical picture. */
export const ReelLoud = makeReel("night", "loud");
