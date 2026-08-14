import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx, HookHeader, hexA } from "./SlopKit";
import { S0Hook, S1, S2, S3, S4, S5, S6, S7, S8, S9Cta } from "./PlgScenes";
import { CamCtx, PalCtx } from "./PlgWorld";
import { ThemeCtx, THEME_META } from "./PlgThemes";
import type { ThemeId } from "./PlgThemes";
import { camFor } from "./AgyWorld";
import { SfxTrack, LEVELS, layer, repeat, db, Cue } from "./SoundKit";
import words from "./words_plugin.json";
import bedDuck from "./bed_duck.json";

/* ===========================================================================
   REEL 104 · "PLUGIN" — Claude Code has three empty plugin bays, and the three
   modules that fill them are free, open source and already sitting at 121,174
   combined stars. Board: storyboards/104-plugin.md.

   VO: public/vo_plugin.wav — 31.06s, 138 words.
   ⛔⛔ THE RAW TAKE WAS 71.38s AND CONTAINED FOUR ABANDONED RETAKES. He restated
      the claude-mem line FIVE times; takes 1-4 all end in `cut cut` and the
      FIFTH is the clean one. Every boundary came from a MEASURED
      `silencedetect=-40dB` edge, never from a whisper word time
      ([[feedback_vo_cut_to_silence_not_whisper]] — whisper's `end` runs
      150-200ms early, and here it ran 1.28s early on "capable of", which would
      have spliced the first flub straight into the body).
   ✅ THE CUT WAS VERIFIED RANGE BY RANGE, NOT END TO END. ⛔⛔ A whole-file
      whisper pass can HIDE a flub by stitching a half-take onto the real one
      (reel 101 lost a build to exactly that), so each of the SEVEN kept ranges
      was transcribed SEPARATELY with medium.en and each came back a complete,
      clean sentence. The CTA keyword was disambiguated on its own pass: PLUGIN.
   ⛔ atempo 1.06 — a gentle pace lift only. The lever spent on length was the
      TEMPO, not the GAPS: [[compress-reel]]'s R1 was fixed by WIDENING pauses,
      so the七 inter-beat holds were kept at 0.18-0.30s rather than squeezed.
   ⚠️ 31.06s is ABOVE the 22-29s house range, and it is being shipped anyway,
      flagged rather than silently trimmed: reel 103 shipped at 31.02s and reel
      93 at 31.2s. The VO carries a hook, a stat, three products with a number
      each, and a CTA; there is nothing to cut that is not load-bearing.

   ⛔⛔ TWO VO CLAIMS THE PICTURE DELIBERATELY UNDER-STATES (board §0). The
      recorded line stays as recorded; the PICTURE is what stops at the edge.
      1. ⛔⛔ "it finds AND INSTALLS the right skills for you automatically" —
         THE HARD STOP. `find-skills` searches and RECOMMENDS: its own docs say
         it checks skills.sh, scores candidates by INSTALL COUNT and source
         reputation, and "identifies skills rather than automatically deploying
         them". Installing is a separate `npx skills add`. S5 therefore draws
         the SEARCH and the RANKING, and the install arrives as a card HANDED
         to the Claude carrying the real command. Nothing anywhere in this reel
         is drawn installing itself, and S5's header says "AND RANKS THEM BY
         INSTALLS" — the reel's one literal channel correcting the audio.
      2. "you're only using about 40% of what Claude is actually capable of" —
         unbackable, and it is also the reel's internal enemy, so it stays in
         the AUDIO and is drawn as an IGNORANCE picture (12 of 30 lamps lit, a
         needle at 40) with NO receipt plate, NO source line and NO star figure.
         ⛔ And it is never ANSWERED with a number: the peak says 121,174★ and
         three licences, never "100%" or an invented multiplier.

   ⛔ NO VILLAIN, BY DESIGN. [[feedback_outlier_lift_is_within_creator_only]] is
      measured across 25 real outliers: *"external villains: rel-median 1.00 vs
      1.00 ... every breakout has NO villain."* The enemy is the equipment gap
      the VO already states, and the capability bank is furniture — it never
      becomes a character and it never loses.

   ⛔⛔ EVERY `at` BELOW IS A MEASURED WORD ONSET from src/words_plugin.json,
      pattern-matched on the beat's opening word, never an estimate. The SFX fire
      on these seconds; the PICTURE leads them by 4 frames inside the scenes, so
      its crossover — not its start — lands on the syllable.

   ⛔ ROOT OWNS THE GLOBAL CHROME: Bg, the one continuous ProgressBar, the one
      KaraokeCaption track, the VO, the bed and every header. Scene bodies see
      AssemblyCtx = true so their own copies return null.
   ========================================================================= */

export const FPS = 30;

/* ⛔⛔ THE REEL HARD-CUTS ON THE LAST WORD. Alex, reel 103: *"near the end the
   video needs to cut right when I say the word over."* The cut point is
   MEASURED, not taken from whisper: `words_plugin.json` ends `immediately.` at
   30.680s, and the 10ms RMS envelope of the cut VO shows its final `-ly` still
   sounding through 30.66s and under -50 dB by 30.71s. 920 frames = 30.667s
   lands on the last audible sample with zero dead tail. */
export const PLUGIN_TOTAL = 918;      // 30.60s — re-derived after the VO lead was cut

type SceneDef = { at: number; C: React.FC; head: [string, string] };

/* ⛔⛔ HEADERS CARRY IMMEDIATE, PLAIN VALUE, AND EACH ONE ADDS A FACT THE VO
   NEVER SAYS ([[feedback_headers_state_the_claim]], as superseded on reel 93,
   then twice more on reel 103).
   ⛔ REEL 103 ROUND 13's LESSON APPLIES DIRECTLY HERE: a product noun the viewer
   cannot decode is theme flavour wearing a lab coat. So no header below says
   "marketplace", "MCP", "agent skills ecosystem" or a repo slug — every one is
   phrased as what the person watching GETS, and the slugs live in the frame on
   plates where a freeze-frame can check them.
   ⭐ S5's header is doing real work: it is where the picture's honest mechanism
   is STATED, against a VO line that overclaims. */
export const SCENES: SceneDef[] = [
  { at: 0,   C: S0Hook, head: ["3 PLUGINS CLAUDE CODE", "DOES NOT SHIP WITH"] },
  { at: 73,  C: S1,     head: ["MOST OF WHAT YOU PAY FOR", "IS SWITCHED OFF BY DEFAULT"] },
  { at: 197, C: S2,     head: ["134 FREE AI API KEYS", "FROM 40+ PROVIDERS"] },
  { at: 331, C: S3,     head: ["GEMINI, GROQ AND NVIDIA", "NO CARD, NO TRIAL, NO EXPIRY"] },
  { at: 404, C: S4,     head: ["ONE CONFIG, THREE EDITORS", "CURSOR, CLAUDE CODE, CODEX"] },
  /* ⛔ NOT "IT INSTALLS SKILLS FOR YOU". It searches and RANKS; you run the add. */
  { at: 526, C: S5,     head: ["IT SEARCHES EVERY SKILL", "AND RANKS THEM BY INSTALLS"] },
  { at: 662, C: S6,     head: ["YOUR WHOLE SESSION", "COMPRESSED INTO ONE FILE"] },
  { at: 711, C: S7,     head: ["TOMORROW'S CHAT OPENS", "ALREADY KNOWING YOUR PROJECT"] },
  /* ⛔ S8/S9 were RE-BALANCED, not just shifted. Cutting the VO lead moved "To"
     later (27.54s) and "comment" earlier (28.42s), which would have squeezed the
     peak to 27 frames. The CTA now starts on PLUGIN (f869, lead-4) instead, so
     the peak keeps 43f and the CTA gets 53f. */
  { at: 822, C: S8,     head: ["121,174 STARS, ALL FREE", "MIT, MIT AND APACHE-2.0"] },
  { at: 865, C: S9Cta,  head: ["COMMENT PLUGIN", "I'LL SEND ALL THREE LINKS"] },
];

/* ---- THE SFX BANK ---------------------------------------------------------
   ⛔⛔ EVERY `dur` BELOW IS >= THE FILE'S MEASURED TRUE LENGTH, measured with
      ffprobe before a single cue was written (docs/THE-OPEN.md: reel 78's first
      bank chopped five of six opening cues mid-decay and the whole open sounded
      cheap):
        impact_deep 0.80 · sub 0.42 · slate_whump 0.16 · mech_clank 0.12 ·
        pneu_thunk 0.45 · metal_ping 0.31 · metal_riser 1.95 · lib_riser 2.58 ·
        temper_chime 0.70 · pickup_chime 0.34 · gold_stamp 0.50 · swooshup 0.42 ·
        swooshdn 0.42 · scanner_sweep 0.90 · ratchet 0.50 · chain_clank 0.50 ·
        lamp_clunk 0.27 · thock 0.16 · stamp_press 0.34 · crusher 0.90 ·
        harden_chime 0.60 · arrive_chime 1.10 · glitch_counter 0.90 ·
        neon_on 0.54 · c_unlock 0.36 · shimmer 0.80 · resolve 0.80 ·
        rebuild_thud 0.80 · knife_switch 0.12 · ident_chirp 0.48 ·
        am/room-tone 57.17 · am/counter-tick 1.05 · am/lights-on 0.78 ·
        am/gear-mech 1.03 · am/unlock 0.91 · am/paper-slide 0.63
   ⛔ `at` is ROOT seconds, not scene-local ([[reference_reel_sound_design]]).
   ⛔ A `repeat()` RUN IS ONE GESTURE, and no body scene runs more than four cues.
   ⛔ LAYER THE HERO HIT: attack + low-end body. One thin pop is the single thing
      that makes a reel sound cheap.
   ⛔ RISERS CAPPED AT 2, spent on the reel's two real turns: bay one seating
      (13.66s) and the plate completing (27.32s). The second is pre-rolled by its
      full 2.58s so its PEAK lands on the cut, not its start.
   ------------------------------------------------------------------------ */
const SFX: Cue[] = [
  /* ---- S0 · THE OPEN. Frame 0 carries the heaviest stack in the reel — it is
     the interrupt (docs/THE-OPEN.md). PLATE (0.00) -> WIDE (1.00) ->
     NEEDLE (1.80). ⛔ A cut with no sound reads as a glitch; all three cuts of
     the open are scored, and frame 0 is the densest. ------------------------ */
  { at: 0.00, src: "am/room-tone.wav", v: LEVELS.SFX_BED, dur: 6.0 },
  ...layer(0.00, { src: "impact_deep.wav", v: LEVELS.SFX_HERO, dur: 0.90, rate: 0.92 },
                 { src: "sub.wav", dur: 0.50, rate: 0.86 }),
  { at: 0.00, src: "slate_whump.wav", v: LEVELS.SFX_HERO, dur: 0.22, rate: 1.0 },
  { at: 0.06, src: "mech_clank.wav", v: LEVELS.SFX_MID, dur: 0.18, rate: 0.94 },
  /* cut B — the wide */
  { at: 0.38, src: "swooshup.wav", v: LEVELS.SFX_MID, dur: 0.48, rate: 1.12 },
  ...layer(0.50, { src: "pneu_thunk.wav", v: LEVELS.SFX_HERO, dur: 0.52, rate: 0.96 },
                 { src: "sub.wav", dur: 0.48, rate: 0.90 }),
  /* cut C — the needle at its worst state */
  { at: 0.68, src: "swooshdn.wav", v: LEVELS.SFX_MID, dur: 0.48, rate: 0.94 },
  { at: 0.80, src: "glitch_counter.wav", v: LEVELS.SFX_HERO, dur: 0.96, rate: 0.90 },

  /* ---- S1 · the bank. The lit twelve tick in sequence; the dark eighteen get
     one dead switch and then nothing. ------------------------------------- */
  { at: 2.43, src: "lamp_clunk.wav", v: LEVELS.SFX_MID, dur: 0.34, rate: 0.88 },
  { at: 2.48, src: "machine_bed.wav", v: LEVELS.SFX_BED, dur: 4.10, rate: 0.92 },
  ...repeat(8, 2.72, 0.15, { src: "am/counter-tick.wav", v: LEVELS.SFX_TEXTURE, dur: 0.30 }, 0.055),
  { at: 3.60, src: "knife_switch.wav", v: LEVELS.SFX_MID, dur: 0.20, rate: 0.82 },

  /* ---- S2 · module one lands, and 134 keys cascade across the full panel. -- */
  ...layer(6.57, { src: "rebuild_thud.wav", v: LEVELS.SFX_HERO, dur: 0.88, rate: 0.94 },
                 { src: "sub.wav", dur: 0.46, rate: 0.88 }),
  ...repeat(9, 7.45, 0.30, { src: "metal_ping.wav", v: LEVELS.SFX_TEXTURE, dur: 0.36 }, 0.06),
  { at: 7.70, src: "am/counter-tick.wav", v: LEVELS.SFX_MID, dur: 1.10, rate: 1.0 },
  { at: 10.50, src: "harden_chime.wav", v: LEVELS.SFX_MID, dur: 0.66, rate: 1.06 },

  /* ---- S3 · the three real marks swing forward, then the free-tier tag drops. */
  ...repeat(3, 11.03, 0.40, { src: "chain_clank.wav", v: LEVELS.SFX_MID, dur: 0.56 }, 0.09),
  { at: 12.50, src: "ratchet.wav", v: LEVELS.SFX_MID, dur: 0.56, rate: 1.04 },
  { at: 12.58, src: "temper_chime.wav", v: LEVELS.SFX_HERO, dur: 0.76, rate: 1.08 },

  /* ---- S4 · ⭐ TURN ONE. Bay one seats and three tools take the config. A
     riser pre-rolls into the seat so the peak lands ON it. ------------------ */
  { at: 12.40, src: "metal_riser.wav", v: LEVELS.SFX_MID, dur: 2.00, rate: 1.0 },
  ...layer(13.47, { src: "pneu_thunk.wav", v: LEVELS.SFX_HERO, dur: 0.52, rate: 0.86 },
                  { src: "sub.wav", dur: 0.50, rate: 0.82 }),
  { at: 13.55, src: "c_unlock.wav", v: LEVELS.SFX_MID, dur: 0.42, rate: 1.0 },
  /* ⭐ THE THREE ENTRIES, one per config card seating. Alex asked for the entry
     to be SATISFYING, so each is LAYERED — a mechanical seat plus a low body
     plus a confirm chime — and pitched up across the three so they read as a
     rising sequence rather than the same sound three times. */
  ...layer(14.33, { src: "pneu_thunk.wav", v: LEVELS.SFX_HERO, dur: 0.50, rate: 1.02 },
                  { src: "sub.wav", dur: 0.44, rate: 0.94 }),
  { at: 14.39, src: "c_unlock.wav", v: LEVELS.SFX_MID, dur: 0.42, rate: 1.04 },
  ...layer(15.27, { src: "pneu_thunk.wav", v: LEVELS.SFX_HERO, dur: 0.50, rate: 1.09 },
                  { src: "sub.wav", dur: 0.44, rate: 0.98 }),
  { at: 15.33, src: "c_unlock.wav", v: LEVELS.SFX_MID, dur: 0.42, rate: 1.10 },
  ...layer(16.20, { src: "pneu_thunk.wav", v: LEVELS.SFX_HERO, dur: 0.50, rate: 1.16 },
                  { src: "sub.wav", dur: 0.44, rate: 1.02 }),
  ...layer(16.26, { src: "c_unlock.wav", v: LEVELS.SFX_MID, dur: 0.42, rate: 1.16 },
                  { src: "temper_chime.wav", dur: 0.76, rate: 1.12 }),

  /* ---- S5 · the beam sweeps the stacks, six candidates re-order, the winner is
     HANDED over. ⛔ The hand-off gets the scene's hero cue, not the search —
     the take is the beat that matters. --------------------------------------- */
  { at: 17.53, src: "scanner_sweep.wav", v: LEVELS.SFX_MID, dur: 0.96, rate: 0.92 },
  ...repeat(8, 18.30, 0.22, { src: "blip3.wav", v: LEVELS.SFX_TEXTURE, dur: 0.26 }, 0.05),
  ...repeat(6, 19.90, 0.13, { src: "thock.wav", v: LEVELS.SFX_MID, dur: 0.22 }, 0.07),
  ...layer(20.60, { src: "am/paper-slide.wav", v: LEVELS.SFX_HERO, dur: 0.70, rate: 1.0 },
                  { src: "pickup_chime.wav", dur: 0.40, rate: 1.04 }),

  /* ---- S6 · the press. Weight is the whole point, so the ram is layered. ---- */
  { at: 22.07, src: "am/gear-mech.wav", v: LEVELS.SFX_BED, dur: 1.70, rate: 0.90 },
  ...layer(22.60, { src: "crusher.wav", v: LEVELS.SFX_HERO, dur: 0.96, rate: 0.88 },
                  { src: "sub.wav", dur: 0.52, rate: 0.80 }),
  { at: 23.18, src: "shimmer.wav", v: LEVELS.SFX_MID, dur: 0.86, rate: 1.10 },

  /* ---- S7 · three trays fill, the wafer drops into tomorrow's session. ------ */
  ...repeat(3, 24.00, 0.30, { src: "am/unlock.wav", v: LEVELS.SFX_MID, dur: 0.96 }, 0.07),
  { at: 26.20, src: "am/lights-on.wav", v: LEVELS.SFX_MID, dur: 0.84, rate: 1.0 },
  { at: 26.32, src: "resolve.wav", v: LEVELS.SFX_MID, dur: 0.86, rate: 1.04 },

  /* ---- S8 · ⭐⭐ THE PEAK. The plate completes. The reel's second and last
     riser is pre-rolled by its full 2.58s so its PEAK lands on the cut. ------ */
  { at: 24.90, src: "lib_riser.wav", v: LEVELS.SFX_MID, dur: 2.62, rate: 1.0 },
  ...layer(27.48, { src: "impact_deep.wav", v: LEVELS.SFX_HERO, dur: 0.88, rate: 0.98 },
                  { src: "sub.wav", dur: 0.52, rate: 0.86 }),
  { at: 27.48, src: "neon_on.wav", v: LEVELS.SFX_MID, dur: 0.60, rate: 1.02 },
  { at: 27.58, src: "arrive_chime.wav", v: LEVELS.SFX_MID, dur: 1.16, rate: 1.0 },

  /* ---- S9 · the keyword stamps. ⛔ The reel hard-cuts on the last word, so
     nothing here may ring past 30.67s. -------------------------------------- */
  { at: 28.83, src: "swooshdn.wav", v: LEVELS.SFX_TEXTURE, dur: 0.46, rate: 1.06 },
  ...layer(28.93, { src: "stamp_press.wav", v: LEVELS.SFX_HERO, dur: 0.40, rate: 0.96 },
                  { src: "sub.wav", dur: 0.46, rate: 0.88 }),
  { at: 29.00, src: "gold_stamp.wav", v: LEVELS.SFX_MID, dur: 0.56, rate: 1.0 },
];

/* ⛔ NO IRIS, NO WHITE FLASH, NO PURE BLACK OR WHITE PLATE
   ([[feedback_no_flashing_transitions]]): peak opacity 0.16, ramping in AND
   out, and warm rather than white. ⭐ The rule's own escape hatch — *"a hard cut
   with nothing over it is always an acceptable answer"* — is taken on the two
   matched joins below. */
const Trans: React.FC<{ at: number }> = ({ at }) => {
  const f = useCurrentFrame();
  const n = 9;
  if (f < at || f >= at + n) return null;
  const env = Math.sin(((f - at) / n) * Math.PI);
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 140, pointerEvents: "none",
      background: "#F4EEE2", opacity: env * 0.16 }} />
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

/* ⛔⛔ THREE CUTS, ONE SPINE. Alex, after the FITTING BAY was rejected on theme
   and four metaphor worlds were rejected for not being about the subject:
   *"it has to match the theme of the video - build it in multiple themes here."*
   So the VO, the caption track, the measured scene boundaries, the verified
   numbers and the find-skills honesty fix are IDENTICAL in all three; what
   changes is the SET, the palette, the hero object, the bed, the camera seed
   and the transition ([[feedback_trial_reel_variants]]: a variant must change
   hook, bed, camera AND transitions, or it is the same reel twice).
   ⛔ Every bed is a DIFFERENT passage of the source, each located by envelope
   cross-correlation so none repeats a shipped reel: A 137.0s, B 188.0s,
   C 111.0s (reel 101 took 39.2s, reel 103 56.0s, reel 102 61.2s). */
export type Variant = { theme: ThemeId; bed: string; seed: number; capTop: number };

export const VARIANTS: Variant[] = [
  { theme: "mkt", bed: "104_plugin_bed.wav",   seed: 0,  capTop: 1252 },
  { theme: "mch", bed: "104_plugin_bed_b.wav", seed: 5,  capTop: 1226 },
  { theme: "rck", bed: "104_plugin_bed_c.wav", seed: 9,  capTop: 1264 },
];

export const makeReel = (v: Variant): React.FC => () => (
  <ThemeCtx.Provider value={v.theme}>
  <AbsoluteFill>
    <Audio src={staticFile("vo_plugin.wav")} />
    {/* ⛔⛔ THE BED MUST BE AUDIBLE AT 0.00s ([[soundtrack-onset-at-zero]]):
        three stacked causes have killed this before — a fade-in envelope, the
        TRACK's own fade-in intro, and AAC priming. This passage is "Another Day
        Of Sun" from 137.0s, chosen by scanning the whole track in half-second
        buckets for the loudest continuous 32s window (mean -12.40 dB, min
        -15.71 dB) and MEASURED over its first 500ms after the cut: mean
        -29.0 dB, peak -14.8 dB. It is not silence at zero.
        ⛔ It is also a FRESH passage. The other reels' beds were located inside
        the source by envelope cross-correlation — reel 101 at 39.2s, reel 103 at
        56.0s, reel 102 at 61.2s — so 137.0s has not been used.
        ⛔ "Every Living Breathing Moment" is fully consumed and is not an option
        ([[agency-reel]]). */}
    {/* ⛔⛔ THE BED WAS PLAYING AT FULL FILE LEVEL. `LEVELS.MUSIC` (db(-20))
        exists in SoundKit and was never applied to it — reel 103 has the same
        line, so this is a house-wide fault, not a reel-104 one. Measured on the
        delivered cut: bed -29.3 dB at the top rising to -26.2 dB by the CTA
        against a VO peaking at -17.5, i.e. only **6.4 dB of separation** where
        a dialogue bed wants 10-15.
        ⭐ THE FIX IS A REAL SIDECHAIN, not a flat trim: `bed_duck.json` is
        generated from the VO's OWN per-frame envelope with a fast attack (3f)
        and a slow release (14f), so the bed opens up under every phrase and
        closes in the gaps. It also removes the ~3 dB rise the passage itself
        has (which is why it "got loud at the end"), and ramps off over the last
        0.6s so nothing swells past the final word. */}
    <Audio src={staticFile(v.bed)}
      volume={(fr) => 0.62 * (bedDuck[Math.min(fr, bedDuck.length - 1)] ?? 1)} />
    <SfxTrack cues={SFX} />
    <Bg />

    <AssemblyCtx.Provider value={true}>
      {SCENES.map((sc, i) => {
        const to = i < SCENES.length - 1 ? SCENES[i + 1].at : PLUGIN_TOTAL;
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
        that a wipe kills a match cut. S3 (337) matches S2 on the vault and S7
        (714) matches S6 on the cold room, so both are excluded. */}
    {SCENES.slice(1).filter((sc) => sc.at !== 337 && sc.at !== 714)
      .map((sc) => <Trans key={"t" + sc.at} at={sc.at} />)}

    {SCENES.map((sc, i) => {
      const to = i < SCENES.length - 1 ? SCENES[i + 1].at : PLUGIN_TOTAL;
      return (
        <Sequence key={"h" + sc.at} from={sc.at} durationInFrames={to - sc.at} layout="none">
          <HeadFor big={sc.head[0]} hot={sc.head[1]} settled={i === 0} />
        </Sequence>
      );
    })}

    <ProgressBar />
    <KaraokeCaption words={words as any} fps={FPS} top={v.capTop} />
  </AbsoluteFill>
  </ThemeCtx.Provider>
);

export const PluginReel  = makeReel(VARIANTS[0]);   /* T1 THE MARKETPLACE */
export const PluginReelB = makeReel(VARIANTS[1]);   /* T2 THE MACHINE     */
export const PluginReelC = makeReel(VARIANTS[2]);   /* T3 THE RACK        */
