import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx, HookHeader } from "./SlopKit";
import { S0, S1, S2, S3, S4, S5, S6, S7, S8, S9, S10 } from "./Pg3Scenes";
import type { Variant } from "./Pg3Scenes";
import { CAM, camFor } from "./Pg3Scenes";
import { CamCtx } from "./Pg3World";
import { SfxTrack, LEVELS, db, Cue } from "./SoundKit";
import words from "./data/words_109plugins3.json";

/* ===========================================================================
   REEL 109 · "PLUGINS3" — THE ASSEMBLY.  Board: storyboards/109-plugins3.md.

   Three free Claude Code plugins, each knocking down a different wall:
     1  claude-code-setup   scans your codebase and RECOMMENDS what to install
                            anthropics/claude-plugins-official · ★33,639 · Apache-2.0
     2  OmniRoute           routes around the usage limit across 290 providers
                            diegosouzapw/OmniRoute · ★50,060 · MIT
     3  claude-mem          carries context across sessions
                            thedotmack/claude-mem · ★91,045 · Apache-2.0
   Combined ★174,744, every figure from the GitHub API on build day (2026-08-18)
   — never from a blog. A syndicated article had claude-mem at "46.1K" while the
   API returned 91,045.

   VO: public/vo_109plugins3.wav — 31.65s, 125 words, cut from a 37.73s raw take.
   ZERO flubs in the raw (rare). Four cut boundaries, every one inside a silence
   MEASURED with `silencedetect=-40dB` — never a whisper word time, which run
   150-200ms early. The cut file was re-transcribed and is clean.

   ⚠️ 31.65s is over the 22-29s house range. FLAGGED, never silently trimmed:
      the VO names three items, so nothing can be dropped without a re-record.
      In line with recent deliveries (107 = 35.06s, 108 = 47.78s).

   ⛔⛔ THE HONESTY LEDGER LIVES IN Pg3World.tsx (R1..R3 + the three BANNED
      guards). The three that matter:
        · "10x your productivity"  -> UNBACKABLE. S3 typesets no numeral at all.
        · "unlimited usage"        -> the README never claims it. S6 draws the
                                      four-tier CASCADE instead.
        · "1.6 billion tokens"     -> the README publishes ~1.53B/mo. S7 prints
                                      the repo's own figure with its source plate.

   ⛔⛔ THE HEADER IS ON FOR ALL 950 FRAMES, rendered HERE at root, outside every
      Sequence — never per-scene, never dropped after the hook. It is fed `f + 12`
      on the hook so it is SETTLED on frame 0 (SectionHeader fades in over 10f).

   ⛔ ROOT OWNS THE GLOBAL CHROME: Bg, the one continuous ProgressBar, the one
      KaraokeCaption track, the VO, the bed and the header. Scene bodies see
      AssemblyCtx = true so their own copies return null.

   ⛔⛔ EVERY `at` IN THE SFX BANK IS ROOT SECONDS, NOT SCENE-LOCAL. Scene bodies
      are not Sequence-wrapped for audio purposes ([[sfx-root-timeline-trap]]).
   ⛔ `src` IS RELATIVE TO public/sfx/ — `Sfx` prefixes "sfx/" itself.
   ========================================================================= */

export const FPS = 30;

/** 950 frames = 31.667s. The VO runs 31.650s and its last word is still
    sounding at 31.14s, so the reel carries the tail and hard-cuts after it. */
export const PG3_TOTAL = 950;

/* ⛔ MEASURED WORD ONSETS from src/data/words_109plugins3.json, converted to
   frames, with the picture LEADING the word by 4 frames (0.133s) per house rule.
   Nothing here is estimated. */
export const L = {
  S0: 0,      /* HOOK        0.00s  "Don't use Claude Code without these 3 plugins" */
  S1: 52,     /* SCAN        1.73s  "First is Claude Setup..."                      */
  S2: 160,    /* RANK        5.34s  "and recommends the best skills..."             */
  S3: 267,    /* HANDOFF     8.90s  "to 10x your productivity."                     */
  S4: 311,    /* ROAD       10.38s  "The second is OmniRoute..."                    */
  S5: 406,    /* GRID       13.52s  "by connecting to over 200 AI providers..."     */
  S6: 492,    /* SHUTTER    16.41s  "Then the moment you hit your limit..."         */
  S7: 570,    /* MINT       19.00s  "You literally get 1.6 billion tokens..."       */
  S8: 670,    /* WIPE       22.33s  "The third is Claude Mem..."                    */
  S9: 751,    /* RECALL     25.03s  "so it remembers your projects and your files"  */
  S10: 845,   /* CTA        28.16s  "If you want to try these for free..."          */
  END: PG3_TOTAL,
} as const;

const DUR = {
  S0: L.S1 - L.S0, S1: L.S2 - L.S1, S2: L.S3 - L.S2, S3: L.S4 - L.S3,
  S4: L.S5 - L.S4, S5: L.S6 - L.S5, S6: L.S7 - L.S6, S7: L.S8 - L.S7,
  S8: L.S9 - L.S8, S9: L.S10 - L.S9, S10: L.END - L.S10,
} as const;

/* ---- THE SFX BANK ---------------------------------------------------------
   ⛔⛔⛔ THE BAN LIST, inherited whole from reels 107 and 108. Three separate
   rounds of "I still hear a puff of air" came from THREE DIFFERENT defects:
     1 HISS BED   dur > 0.8s AND >85% of energy above 2kHz
     2 AIR SWELL  attack > 40ms AND <250Hz energy < 15%
     3 OVER-RING  a cue must not sustain longer than the event it scores
   ⛔ AND THE "HITTING SOUND": percussion must be LOW, never BRIGHT. A transient
      with most of its energy up top is a SLAP; the same event carried under
      250Hz is a thud you FEEL. Measured on the day:
        clap_slam   62.0% >2kHz ·  9.6% <250Hz   <- BANNED
        punch_thud  93.7% >2kHz ·  3.3% <250Hz   <- BANNED
        thock        1.3% >2kHz · 88.6% <250Hz   ok
        impact       6.2% >2kHz · 42.1% <250Hz   ok
        impact_deep  0.4% >2kHz · 93.1% <250Hz   ok
        sub          0.8% >2kHz · 96.6% <250Hz   ok
   ⛔ `tools/sfx_audit.py` also bans by NAME: anything called whoosh/swoosh/
      swish/puff/breath, whatever it measures. A measurement gate cannot
      out-argue the label on the tin.
   ------------------------------------------------------------------------ */
const BANNED_SFX = ["am/cloth-shiver.wav", "am/paper-rustle.wav",
  "am/check-pop.wav", "swooshup.wav", "swooshdn.wav", "blip_up.wav",
  "am/click-hard.wav", "chimehi.wav", "am/whoosh-fast.wav",
  "lib_whoosh.wav", "lib_deep_whoosh.wav", "boom.wav", "clap_slam.wav",
  "punch_thud.wav"] as const;

/* ⛔ NOT EVERY CUT GETS A TRANSIENT. Eleven identical marks is a metronome, not
   an edit — the picture cut carries itself. Only STRUCTURAL beats keep a mark,
   and all of them are low and warm.
   ⭐ DENSITY IS A SHAPE, NOT A LEVEL. This bank runs 3-5 cues in most scenes and
   EIGHT in S6 (the shutter and the cascade) and SIX in S7 (the mint) — the two
   that carry the story. Flat coverage reads as busy AND unranked.
   ⛔ Every `dur` is >= the file's measured true length, so no tail is chopped
   mid-decay, EXCEPT where gate 3 applies (a slam does not sustain).
   44 cues / 31.65s = 1.39 per second, inside the house range
   (95 TOOLS 0.98 · 105 FREE 1.13 · 108 MARKETING 1.19 · 106 SKILL 1.48 ·
    a REJECTED 107 pass 3.82). */
const SFX_RAW: Cue[] = [

  /* ⛔⛔ FOURTEEN CUES WERE REPLACED AFTER `tools/sfx_audit.py` RAN ON v1, not
     before. Every one of them sounded fine by name and failed on measurement:
       am/unlock · am/gear-mech · am/lights-on · am/coin-drop · am/counter-tick
       am/positive-chime · am/film-roll · lib_pop · lib_pop2 · sorter_tick
       harden_chime · coin_slide · chain_clank · crowd_cheer
     Nine were HISS (>85% of energy above 2kHz over 0.8s), eleven were AIR
     (attack >40ms with under 15% below 250Hz), six were both. That is the
     five-round "puff of air" defect arriving pre-emptively — this time caught by
     the gate instead of by Alex. ⭐ The replacements were picked by MEASUREMENT
     off the whole library (116 files pass all four gates), not by name. */

  /* --- S0 · THE BAY. The hatches bang, three cartridges lock, the fuse runs.
     ⛔ ONE cue for the three hatches, not three: they are 0.1s apart and three
     marks there is a stutter, not an event. The LOCKS take the hits, and they
     climb — thock, thock+9%, then the deep one. */
  { at: 0.13, src: "pneu_thunk.wav",   v: LEVELS.SFX_MID,     dur: 0.50 },
  { at: 0.37, src: "thock.wav",        v: LEVELS.SFX_HERO,    dur: 0.20 },
  { at: 0.60, src: "thock.wav",        v: LEVELS.SFX_HERO,    dur: 0.20, rate: 1.09 },
  { at: 0.87, src: "impact_deep.wav",  v: LEVELS.SFX_HERO,    dur: 0.85 },
  { at: 1.02, src: "green_tone.wav",   v: LEVELS.SFX_MID,     dur: 0.75 },

  /* --- S1 · THE SCAN. A motor bed under the whole scene, and a blip per column
     the beam opens. ⛔ The bed's dur is the scene's own length so it cannot run
     on under S2. */
  { at: 1.80, src: "machine_bed.wav",  v: LEVELS.SFX_BED,     dur: 3.50 },
  { at: 2.20, src: "scan_beep.wav",    v: LEVELS.SFX_MID,     dur: 0.45 },
  { at: 3.90, src: "blip1.wav",        v: LEVELS.SFX_TEXTURE, dur: 0.25 },

  /* --- S2 · THE SORT. The shelf running, then the ranking landing. */
  { at: 5.55, src: "shop_bed.wav",     v: LEVELS.SFX_BED,     dur: 3.30 },
  { at: 6.80, src: "mallet_tap.wav",   v: LEVELS.SFX_MID,     dur: 0.25 },
  { at: 8.30, src: "pickup_chime.wav", v: LEVELS.SFX_MID,     dur: 0.40 },

  /* --- S3 · THE HANDOFF. ⭐ `lamp_clunk` is the bench light because it IS a
     lamp — 20.3% above 2kHz against `am/lights-on`'s 91%. */
  { at: 8.97, src: "slate_whump.wav",  v: LEVELS.SFX_HERO,    dur: 0.20 },
  { at: 9.23, src: "lamp_clunk.wav",   v: LEVELS.SFX_MID,     dur: 0.30 },
  { at: 9.70, src: "mech_clank.wav",   v: LEVELS.SFX_TEXTURE, dur: 0.15 },

  /* --- S4 · THE ROAD. An engine under the scene, the hoarding slamming in. */
  { at: 10.45, src: "engine_loop.wav", v: LEVELS.SFX_BED,     dur: 3.10 },
  { at: 10.60, src: "engine_rev.wav",  v: LEVELS.SFX_MID,     dur: 1.45 },
  { at: 11.85, src: "mech_clank.wav",  v: LEVELS.SFX_MID,     dur: 0.15, rate: 0.92 },

  /* --- S5 · THE GRID. He throws the switch, the wall lights, it converges. */
  { at: 13.60, src: "knife_switch.wav",v: LEVELS.SFX_HERO,    dur: 0.15 },
  { at: 14.60, src: "blip3.wav",       v: LEVELS.SFX_TEXTURE, dur: 0.25 },
  { at: 15.60, src: "temper_chime.wav",v: LEVELS.SFX_MID,     dur: 0.75 },

  /* --- S6 · THE SHUTTER. ⭐ THE DENSITY PEAK: eight cues in 2.59s, because this
     is the beat the whole reel turns on. The shape is deliberate —
       screech + slam + sub   the villain wins, hard and LOW
       three ticks, rising    the cascade trying tiers 1-3 and failing
       green tone             tier 4 takes it
       rev                    and he is moving again
     ⛔ There is a hole of near-silence between the slam and the first tick. It
        is the loudest thing in the scene. */
  { at: 16.62, src: "tire_screech.wav",v: LEVELS.SFX_MID,     dur: 0.95 },
  { at: 16.72, src: "impact_deep.wav", v: LEVELS.SFX_HERO,    dur: 0.85 },
  { at: 16.78, src: "sub.wav",         v: LEVELS.SFX_HERO,    dur: 0.45 },
  { at: 17.15, src: "tick.wav",        v: LEVELS.SFX_MID,     dur: 0.10 },
  { at: 17.38, src: "tick.wav",        v: LEVELS.SFX_MID,     dur: 0.10, rate: 1.08 },
  { at: 17.61, src: "tick.wav",        v: LEVELS.SFX_MID,     dur: 0.10, rate: 1.16 },
  { at: 17.85, src: "green_tone.wav",  v: LEVELS.SFX_HERO,    dur: 0.75 },
  { at: 18.10, src: "engine_rev.wav",  v: LEVELS.SFX_HERO,    dur: 1.45 },

  /* --- S7 · THE MINT. ⭐ The second density peak. `engine_idle` runs UNDER the
     pour at bed level so the count is audibly climbing, and `gong` is the
     landing — a low bell beats a crowd cheer, which measured as AIR. */
  { at: 19.20, src: "am/rumble-build.wav", v: LEVELS.SFX_MID,     dur: 0.90 },
  { at: 19.70, src: "can_bong.wav",        v: LEVELS.SFX_MID,     dur: 0.40 },
  { at: 20.30, src: "mallet_tap.wav",      v: LEVELS.SFX_MID,     dur: 0.25, rate: 0.90 },
  { at: 20.60, src: "engine_idle.wav",     v: LEVELS.SFX_BED,     dur: 1.60 },
  { at: 21.55, src: "gold_stamp.wav",      v: LEVELS.SFX_HERO,    dur: 0.55 },
  { at: 21.95, src: "gong.wav",            v: LEVELS.SFX_TEXTURE, dur: 2.25 },

  /* --- S8 · THE WIPE. The room stripped, the room DEAD, then the spool. */
  { at: 22.40, src: "crusher.wav",     v: LEVELS.SFX_MID,     dur: 0.95 },
  { at: 22.95, src: "dead_thud.wav",   v: LEVELS.SFX_HERO,    dur: 0.50 },
  { at: 23.90, src: "line_dead.wav",   v: LEVELS.SFX_TEXTURE, dur: 0.75 },
  { at: 24.05, src: "rebuild_thud.wav",v: LEVELS.SFX_HERO,    dur: 0.85 },

  /* --- S9 · THE RECALL. The reel playing back, and the board rebuilding. */
  { at: 25.10, src: "stage_hum.wav",   v: LEVELS.SFX_BED,     dur: 2.05 },
  { at: 26.20, src: "mallet_tap.wav",  v: LEVELS.SFX_MID,     dur: 0.25, rate: 1.14 },
  { at: 27.40, src: "temper_chime.wav",v: LEVELS.SFX_MID,     dur: 0.75, rate: 1.06 },

  /* --- S10 · THE RUN. Rolling, then the stamp. */
  { at: 28.25, src: "engine_loop.wav", v: LEVELS.SFX_BED,     dur: 3.40, rate: 1.06 },
  { at: 28.45, src: "mech_clank.wav",  v: LEVELS.SFX_MID,     dur: 0.15, rate: 1.08 },
  { at: 30.20, src: "gold_stamp.wav",  v: LEVELS.SFX_HERO,    dur: 0.55, rate: 0.94 },
  { at: 30.30, src: "impact_deep.wav", v: LEVELS.SFX_HERO,    dur: 0.85, rate: 0.90 },
];

/** ⛔ THE BAN IS ENFORCED IN CODE, not in a comment. A cue added by a later pass
    that names a banned file is dropped at build time rather than shipping. */
const SFX: Cue[] = SFX_RAW.filter((c) => !(BANNED_SFX as readonly string[]).includes(c.src));

/** ⛔ The bed is derived from `107_bed_baydoor.wav`, the bed on the DELIVERED
    reel 107 — i.e. the one that survived the five-round "puff of air" hunt after
    it was traced to the MUSIC BED and then to the VOICE, never to the effects.
    Measured on the trimmed 109 file: 26.5% of energy above 2kHz, 32.4% below
    250Hz. For contrast, `106skill_bed` reads 51.8% / 6.4% — that is the airy
    profile, and it is why it is not used here.
    ⭐ A DIFFERENT 31.65s WINDOW of the source (2.0-33.65s) so 108 -> 109 do not
    open on the same bar. Re-normalised to -16.9 LUFS with an 0.8s tail fade. */
/* ⭐ AXIS 2: A DIFFERENT SOURCE TRACK PER CUT. The VO is the same recording and
   cannot change, so the bed is the only real audio-side lever against a
   fingerprint. Three different sources, each cut from a LOUD DOWNBEAT rather
   than from 0 — a bed that opens quiet still fails MUSIC_ONSET_0 after loudnorm,
   because loudnorm lifts the whole track and leaves the intro quiet relative to
   it. Measured first 150ms: A -28.0dB · B -19.0dB · C -18.9dB, all audible.
     A  107_bed_baydoor  window 2.00-33.65s
     B  107_bed_floor    window 2.20-33.85s (its first downbeat is at 2.20)
     C  100_apple_bed_b  a different reel's track entirely; only 23.6s long, so
                         it loops once with a 1.2s crossfade at the seam
   All three: 26.5 / 26.2 / 23.5% above 2kHz — none is the airy profile. */
const BED: Record<Variant, string> = {
  night: "109_plugins3_bed.wav",
  amber: "109_plugins3_bed_b.wav",
  steel: "109_plugins3_bed_c.wav",
};

/** ⛔ a different caption band per cut — cheap, and it changes every frame */
const CAP_Y: Record<Variant, number> = { night: 1252, amber: 1306, steel: 1198 };

export const makeReel = (v: Variant): React.FC => () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Bg />
      <Audio src={staticFile("vo_109plugins3.wav")} volume={LEVELS.DIALOGUE} />
      {/* ⛔⛔ TWO ATTENUATIONS STACK IF YOU ARE NOT WATCHING. On reel 108 the bed
          was built at -5.8 dB AND then cut again by the house `LEVELS.MUSIC`
          (db(-20)), landing 26 dB under the voice — i.e. "where is the bg music"
          while the file was there the whole time. The bed here is normalised to
          -16.9 LUFS and given the same +8 dB reel-local trim, so it lands ~12 dB
          under the VO: present, not competing. The shared MUSIC constant is left
          alone, because every other reel is balanced against it. */}
      <Audio src={staticFile(BED[v])} volume={LEVELS.MUSIC * db(8)} />
      <SfxTrack cues={SFX} />

      <CamCtx.Provider value={camFor(v, f)}>
        <AssemblyCtx.Provider value={true}>
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
          <Sequence from={L.S10} durationInFrames={DUR.S10}><S10 v={v} /></Sequence>
        </AssemblyCtx.Provider>
      </CamCtx.Provider>

      <ProgressBar />
      <KaraokeCaption words={words as any} fps={FPS} top={CAP_Y[v]} />
      <SectionBand f={f} />
    </AbsoluteFill>
  );
};

/* =========================================================================
   ⭐⭐ THE HEADER CHANGES PER BEAT AND NEVER DISAPPEARS.
   Two rules that sound contradictory and are not: reel 107 got "the header needs
   to be there the whole time"; reel 108 got "the headers don't change". Both are
   satisfied by a band that is on for every frame AND re-states the current claim.

   ⭐ Each header states the CLAIM in PRODUCT NOUNS, never the theme and never
   the world ([[feedback_headers_state_the_claim]]) — so a muted viewer still
   gets the whole reel.

   ⛔⛔ S6's header is the honesty ledger showing up in the chrome: the VO says
   "unlimited usage", so the band says what actually happens —
   HIT THE LIMIT, IT FAILS OVER. And S7's band prints the repo's audited figure,
   not the VO's rounded one.
   ====================================================================== */
const BANDS: Array<{ from: number; big: string; hot: string }> = [
  /* ⛔⛔ ALEX'S EXPLICIT CALL, 2026-08-18: *"revise the header for this video in the
     hook part should be '3 Claude Code Plugins to 10X Productivity'"*. `10X` is in
     `MULTIPLIER_BANNED` because nothing sources a multiplier, and I flagged that.
     His decision, recorded here so it is not silently re-litigated next round —
     the same shape as reel 108's "10 MARKETING SKILLS". ⭐ The scope of the
     override is THIS HEADER ONLY: no scene typesets a multiplier, S3 still draws
     the hand-off with no numeral, and the article and caption still carry the
     honest note that nothing backs the figure. */
  { from: L.S0,  big: "3 CLAUDE CODE PLUGINS", hot: "TO 10X PRODUCTIVITY" },
  { from: L.S1,  big: "1 · CLAUDE SETUP",      hot: "SCANS YOUR WHOLE CODEBASE" },
  { from: L.S2,  big: "1 · CLAUDE SETUP",      hot: "RANKS WHAT YOUR REPO NEEDS" },
  { from: L.S3,  big: "1 · CLAUDE SETUP",      hot: "READ-ONLY: IT RECOMMENDS" },
  { from: L.S4,  big: "2 · OMNIROUTE",         hot: "ONE ENDPOINT, 290 PROVIDERS" },
  { from: L.S5,  big: "2 · OMNIROUTE",         hot: "90+ OF THEM ARE FREE" },
  { from: L.S6,  big: "2 · OMNIROUTE",         hot: "HIT THE LIMIT, IT FAILS OVER" },
  { from: L.S7,  big: "2 · OMNIROUTE",         hot: "~1.53B FREE TOKENS A MONTH" },
  { from: L.S8,  big: "3 · CLAUDE MEM",        hot: "SESSIONS END, CONTEXT DOESN'T" },
  { from: L.S9,  big: "3 · CLAUDE MEM",        hot: "NEVER RE-EXPLAIN YOUR REPO" },
  { from: L.S10, big: "COMMENT CLAUDE",        hot: "AND I'LL SEND ALL THREE" },
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
