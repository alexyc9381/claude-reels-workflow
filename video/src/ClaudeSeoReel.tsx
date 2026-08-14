import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx, HookHeader } from "./SlopKit";
import { S0Hook, S1, S2, S3, S4, S5, S6, S7, S8, S9Cta } from "./SeoScenes";
import { CamCtx, PalCtx } from "./SeoWorld";
import { camFor } from "./AgyWorld";
import { SfxTrack, LEVELS, layer, repeat, db, Cue } from "./SoundKit";
import words from "./data/words_seo.json";

/* ===========================================================================
   REEL 102 · "SEO" — an SEO audit is eighteen named agents going over every
   page of your site at once, and handing back the fixes in the order they
   have to happen.

   Board: storyboards/102-seo.md.

   VO: public/102_seo_vo.wav — 21.96s, 92 words.
   ⛔ THE RAW TAKE HAD ONE `cut cut` FLUB and one region came out:
      22.10 -> 24.06s ("Comment SEO, cut cut." — a dead first take of the CTA).
      Both cut boundaries were taken from the MEASURED 20ms peak envelope, at
      -61.1 dB and -49.7 dB respectively, never from whisper word times
      ([[feedback_vo_cut_to_silence_not_whisper]] — whisper's `end` runs
      150-200ms early). Four internal breath holes were squeezed to 0.34-0.40s,
      0.70s of leading digital silence and 0.57s of tail were trimmed.
      26.75s raw -> 21.96s cut. NO atempo: the read was already at pace.
   ✅ THE CUT WAV WAS VERIFIED RANGE BY RANGE, NOT JUST END TO END.
      ⛔⛔ A whole-file whisper pass can HIDE a flub by stitching a half-take
      onto the real one (reel 101 lost a build to exactly that), so each of the
      six KEPT ranges was transcribed SEPARATELY and each came back a complete,
      clean sentence. The assembled file then re-transcribed with zero `cut`
      tokens and zero adjacent duplicates across all 92 words.

   ⛔⛔ THE REPO CARD IS ALLOWED HERE AND WAS NOT ON REEL 100. The APPLE ruling
      was "the VO names no repo AND no candidate dominates", so that reel
      carried no star or maker plate at all. This VO also names no repo — but
      `AgriciDaniel/claude-seo` matches its figures EXACTLY (the repo's own
      description is "25 sub-skills + 18 sub-agents", the VO says 25 skills and
      18 agents, and `agents/` really does hold 18 files). The identification
      is not ambiguous, so the card is a receipt rather than a guess, and it is
      what makes frame 0 a claim plate ([[feedback_frame0_claim_plate]]).

   ⛔ TWO CLAIMS THE PICTURE DELIBERATELY UNDER-STATES (board §0):
      1. "even fixes your own website for you" — ⛔ THIS CLAIM FAILS, and the
         FACE reel 14 factory log had already established that before this build
         started (memory/reels/seo-factory-log.md Stage 3: "NO auto-fix
         anywhere"). The repo is an ANALYSIS plugin whose primary deliverable is
         markdown reports; content writing is a separate repo. So S4 shows the
         tool's GENERATED OUTPUT (`schema.jsonld`, marked GENERATED) and a
         READY TO APPLY tray, the flag never turns green, and the page is never
         drawn as fixed. The recorded line stays as recorded; the picture is
         what stops at the edge of the claim.
      2. "all trained around Google's own optimization guidelines" — nothing is
         trained. The README says "grounded in primary-source guidance from
         Google". S6 draws a printed reference that is read FROM and a plate
         struck from it; there is no training montage anywhere.

   ⛔⛔ EVERY `at` BELOW IS A MEASURED WORD ONSET from src/data/words_seo.json,
      pattern-matched on the beat's opening word, never an estimate. The SFX
      fire on these seconds; the PICTURE leads them by 4 frames inside the
      scenes, so its crossover — not its start — lands on the syllable.

   ⛔ ROOT OWNS THE GLOBAL CHROME: Bg, the one continuous ProgressBar, the one
      KaraokeCaption track, the VO, the bed and every header. Scene bodies see
      AssemblyCtx = true so their own copies return null.
   ========================================================================= */

export const FPS = 30;
export const SEO_TOTAL = 659;      // 21.96s of VO

type Scene = { at: number; C: React.FC; head: [string, string] };

/* ⛔ HEADERS STATE THE CLAIM IN PRODUCT NOUNS, THEY NEVER ECHO THE VO OR THE
   THEME ([[feedback_headers_state_the_claim]]). The picture already carries the
   world; the header is the reel's one LITERAL channel, so it spends itself on
   real nouns a Claude Code viewer recognises — the command, the domain names,
   the file count, the source — none of which the audio carries in that form. */
export const SCENES: Scene[] = [
  /* ⛔ THE HOOK HEADER USED TO READ "25 SKILLS · 18 AGENTS", which is exactly
     what the card's own claim bar says — the reel's one literal channel spent
     on a duplicate. It now adds the thing the card does not: what it is FOR. */
  /* ⛔ THE HOOK HEADER DID NOT CONTAIN THE WORD SEO. The reel's one literal
     channel, on the frame that matters most, spent on "AUDITS YOUR WHOLE SITE"
     — true of a dozen kinds of tool. It names the subject now.

     ⚠️⚠️ THE `35` IS ALEX'S EXPLICIT CALL, MADE AFTER BEING SHOWN THE COUNTS.
     DO NOT "CORRECT" IT. The repo was re-verified live on 2026-08-12: exactly
     18 files in `agents/`, 25 sub-skills, 32 commands — 35 matches none of
     them, and the VO says "18 SEO agents" at 12.34s, so the header and the
     audio disagree by design. He was offered 18, 43 (18 agents + 25 skills)
     and "25 SKILLS · 18 AGENTS" and chose 35 anyway. Everything ELSE on screen
     stays verified: the SerpCard, the 18 named station files in S5, the star
     count and the plan are all still the real figures. */
  { at: 0,   C: S0Hook, head: ["A FREE SEO AGENCY", "35 SEO AGENTS"] },
  { at: 116, C: S1,     head: ["ONE COMMAND AUDITS THE SITE", "/seo audit example.com"] },
  { at: 181, C: S2,     head: ["NOT JUST GOOGLE BLUE LINKS", "AI ANSWERS + THE MAP PACK"] },
  { at: 234, C: S3,     head: ["A RANKED PLAN, NOT A DUMP", "FIX #1 BEFORE #2"] },
  /* ⛔ NOT "IT FIXES YOUR SITE". It GENERATES the markup; you apply it. The
     header is the reel's one literal channel and it must not assert a
     mechanism the repo does not have (see SeoProps.EditorPane's scope guard). */
  { at: 294, C: S4,     head: ["IT GENERATES THE MARKUP", "SCHEMA · SITEMAPS · HREFLANG"] },
  { at: 352, C: S5,     head: ["18 NAMED AGENTS", "agents/seo-*.md"] },
  { at: 435, C: S6,     head: ["GROUNDED IN GOOGLE'S DOCS", "PRIMARY SOURCE, NOT VIBES"] },
  { at: 510, C: S7,     head: ["THE MANUAL WAY", "ONE PAGE, ONE LAMP, HOURS"] },
  { at: 575, C: S8,     head: ["EVERY PAGE AT ONCE", "MINUTES, NOT HOURS"] },
  { at: 596, C: S9Cta,  head: ["COMMENT SEO", "FOR THE SETUP GUIDE"] },
];

/* ---- THE SFX BANK ---------------------------------------------------------
   ⛔⛔ MEASURE A SAMPLE BEFORE TRUSTING IT ([[reference_reel_sound_design]] —
      reel 99 shipped a bank whose most-used sample measured 0.477 spectral
      flatness and the whole reel read as "fuzzy"). This is reel 100's MEASURED
      subset, re-cast for a room made of paper, steel racks, oak and struck
      brass: impact_deep 0.001, slate_whump 0.003, pickup_chime 0.005,
      sub 0.013, temper_chime 0.028, lib_riser 0.034, metal_riser 0.034,
      pneu_thunk 0.036, mech_clank 0.041, metal_ping 0.073, gold_stamp 0.277.
   ⛔ TRUE FILE LENGTHS WERE MEASURED before any `dur` was set. Where a cue is
      shorter than its file (lib_cinematic_hit is 5.63s, arrive_chime 1.10s)
      SoundKit's `fade` ramp decays it instead of clipping, which is the house
      fix for the chopped-tail gotcha.
   ⛔ A `repeat()` RUN IS ONE GESTURE, and no scene runs more than four cues.
   ⛔ LAYER THE HERO HIT: attack + low-end body. One thin pop is the single
      thing that makes a reel sound cheap.
   ⛔ RISERS CAPPED AT 2, spent on the reel's two real TURNS: the flags sorting
      into an order (8.20s) and the eighteen lamps striking (19.30s). The
      second is pre-rolled through S7's last second so its peak lands ON the
      cut, which is exactly what that villain scene is there to set up.
   ------------------------------------------------------------------------ */
const SFX: Cue[] = [
  /* ---- S0 · THE OPEN. Frame 0 carries the heaviest stack in the reel —
     it is the interrupt (docs/THE-OPEN.md). BURST (f8 = 0.27s) -> STORM
     (0.93s) -> INSTALL (1.87s) -> SITE (2.93s). ------------------------- */
  { at: 0.00, src: "am/room-tone.wav", v: LEVELS.SFX_BED, dur: 4.0 },
  /* THE BURST — the card comes apart and eighteen filenames leave it */
  ...layer(0.27, { src: "impact_deep.wav", v: LEVELS.SFX_HERO, dur: 1.3, rate: 0.92 },
                 { src: "sub.wav", dur: 1.0, rate: 0.86 }),
  { at: 0.27, src: "slate_whump.wav", v: LEVELS.SFX_HERO, dur: 0.5, rate: 1.02 },
  { at: 0.29, src: "mech_clank.wav", v: LEVELS.SFX_MID, dur: 0.45, rate: 1.08 },
  /* the chips scattering out of it, pitched UP across the run */
  ...repeat(9, 0.34, 0.052, { src: "metal_ping.wav", v: LEVELS.SFX_TEXTURE, dur: 0.32 }, 0.055),
  /* CUT 2 · THE STORM */
  ...layer(0.93, { src: "lib_whoosh.wav", v: LEVELS.SFX_MID, dur: 0.85, rate: 0.96 },
                 { src: "pickup_chime.wav", dur: 0.4, rate: 1.10 }),
  ...repeat(6, 1.00, 0.108, { src: "metal_ping.wav", v: LEVELS.SFX_TEXTURE, dur: 0.3 }, 0.04),
  /* CUT 3 · THE INSTALL — the plugin seats */
  ...layer(1.87, { src: "lib_whoosh.wav", v: LEVELS.SFX_MID, dur: 0.6, rate: 1.12 },
                 { src: "pneu_thunk.wav", dur: 0.45, rate: 0.94 }),
  ...repeat(4, 1.96, 0.13, { src: "am/click-hard.wav", v: LEVELS.SFX_TEXTURE, dur: 0.26 }, 0.06),
  /* CUT 4 · THE SITE — the lamp strikes and the dial sweeps off its stop */
  ...layer(2.93, { src: "am/lights-on.wav", v: LEVELS.SFX_MID, dur: 0.7, rate: 1.0 },
                 { src: "pneu_thunk.wav", dur: 0.4, rate: 1.06 }),
  { at: 3.14, src: "temper_chime.wav", v: LEVELS.SFX_TEXTURE, dur: 0.6, rate: 1.08 },

  /* ---- S1 · THE SWEEP. One whoosh under the travel, three plates on their
     own measured onsets (4.14 / 5.44 / 5.56), pitched up the run. --------- */
  { at: 3.87, src: "lib_whoosh.wav", v: LEVELS.SFX_MID, dur: 1.9, rate: 0.90 },
  ...layer(4.14, { src: "gold_stamp.wav", v: LEVELS.SFX_HERO, dur: 0.5, rate: 0.98 },
                 { src: "metal_ping.wav", dur: 0.36, rate: 1.00 }),
  ...layer(5.44, { src: "gold_stamp.wav", v: LEVELS.SFX_HERO, dur: 0.5, rate: 1.08 },
                 { src: "metal_ping.wav", dur: 0.36, rate: 1.12 }),
  ...layer(5.56, { src: "gold_stamp.wav", v: LEVELS.SFX_HERO, dur: 0.5, rate: 1.18 },
                 { src: "metal_ping.wav", dur: 0.36, rate: 1.24 }),

  /* ---- S2 · GEO AND LOCAL. The citation lands, then the pin drops. ----- */
  { at: 6.03, src: "am/paper-slide.wav", v: LEVELS.SFX_MID, dur: 0.55, rate: 1.05 },
  { at: 6.24, src: "temper_chime.wav", v: LEVELS.SFX_MID, dur: 0.65, rate: 1.10 },
  ...layer(6.84, { src: "pneu_thunk.wav", v: LEVELS.SFX_HERO, dur: 0.5, rate: 0.92 },
                 { src: "mech_clank.wav", dur: 0.4, rate: 0.98 }),

  /* ---- S3 · THE TURN. RISER 1 OF 2 into the sort, then five arrivals on
     the ladder, pitched UP so the run climbs the rank it is drawing. ----- */
  { at: 8.20, src: "lib_riser.wav", v: LEVELS.SFX_MID, dur: 1.0, rate: 1.06 },
  ...repeat(5, 8.53, 0.167, { src: "gold_stamp.wav", v: LEVELS.SFX_MID, dur: 0.45 }, 0.07),
  ...layer(9.33, { src: "impact_deep.wav", v: LEVELS.SFX_HERO, dur: 1.0, rate: 0.94 },
                 { src: "sub.wav", dur: 0.9, rate: 0.90 }),

  /* ---- S4 · THE FIX. The flag lifts, the block writes, the flag turns.
     ⛔ The typing is ONE gesture (a short tick run), not a per-character bed. */
  { at: 9.94, src: "am/paper-rustle.wav", v: LEVELS.SFX_MID, dur: 0.5, rate: 1.06 },
  ...repeat(4, 10.20, 0.20, { src: "am/keys-macbook.wav", v: LEVELS.SFX_TEXTURE, dur: 0.3 }, 0.05),
  ...layer(11.20, { src: "temper_chime.wav", v: LEVELS.SFX_HERO, dur: 0.7, rate: 1.14 },
                  { src: "am/check-pop.wav", dur: 0.4 }),

  /* ---- S5 · THE ROSTER. An 8-step lamp run (ONE gesture for eighteen
     strikes), then a layered hit on each count landing. ------------------ */
  ...repeat(8, 12.10, 0.115, { src: "am/lights-on.wav", v: LEVELS.SFX_TEXTURE, dur: 0.34 }, 0.045),
  ...layer(12.34, { src: "slate_whump.wav", v: LEVELS.SFX_HERO, dur: 0.55, rate: 0.94 },
                  { src: "pneu_thunk.wav", dur: 0.42, rate: 0.90 }),
  ...layer(13.52, { src: "gold_stamp.wav", v: LEVELS.SFX_HERO, dur: 0.55, rate: 1.10 },
                  { src: "metal_ping.wav", dur: 0.38, rate: 1.16 }),

  /* ---- S6 · THE SOURCE. Three strikes, the third the largest. --------- */
  { at: 14.50, src: "am/page-turn.wav", v: LEVELS.SFX_MID, dur: 0.5, rate: 0.98 },
  { at: 14.90, src: "stamp_press.wav", v: LEVELS.SFX_MID, dur: 0.42, rate: 0.94 },
  { at: 15.50, src: "stamp_press.wav", v: LEVELS.SFX_MID, dur: 0.42, rate: 1.04 },
  ...layer(16.06, { src: "stamp_press.wav", v: LEVELS.SFX_HERO, dur: 0.45, rate: 1.14 },
                  { src: "gold_stamp.wav", dur: 0.5, rate: 1.06 }),

  /* ---- S7 · THE VILLAIN. Fast, dry, and going nowhere. ---------------- */
  { at: 17.00, src: "am/gear-mech.wav", v: LEVELS.SFX_BED, dur: 2.1, rate: 0.88 },
  ...repeat(7, 17.20, 0.145, { src: "am/counter-tick.wav", v: LEVELS.SFX_MID, dur: 0.28 }, 0.02),
  { at: 18.34, src: "ratchet.wav", v: LEVELS.SFX_MID, dur: 0.45, rate: 0.86 },

  /* ---- S8 · THE PEAK. RISER 2 OF 2, pre-rolled through S7's last second so
     its peak lands ON the slam, then the layered hero hit. --------------- */
  { at: 18.78, src: "metal_riser.wav", v: LEVELS.SFX_MID, dur: 0.62, rate: 1.22 },
  ...layer(19.30, { src: "lib_cinematic_hit.wav", v: LEVELS.SFX_HERO, dur: 1.5, rate: 1.0 },
                  { src: "sub.wav", dur: 1.0, rate: 0.88 }),
  { at: 19.32, src: "am/lights-on.wav", v: LEVELS.SFX_HERO, dur: 0.8, rate: 1.06 },

  /* ---- S9 · THE KEYWORD. Four beats, one cue each — never two cues and a
     hold (reel 100's CTA v1 spent everything by f26 and sat for 28 frames). */
  ...layer(20.02, { src: "gold_stamp.wav", v: LEVELS.SFX_HERO, dur: 0.55, rate: 0.96 },
                  { src: "pneu_thunk.wav", dur: 0.45, rate: 1.0 }),
  { at: 20.32, src: "stamp_press.wav", v: LEVELS.SFX_MID, dur: 0.45, rate: 0.98 },
  ...layer(20.72, { src: "gold_stamp.wav", v: LEVELS.SFX_HERO, dur: 0.6, rate: 1.10 },
                  { src: "arrive_chime.wav", dur: 0.9 }),
  { at: 21.16, src: "am/positive-chime.wav", v: LEVELS.SFX_MID, dur: 0.85 },
];

/* ---- THE VARIANT CUTS -----------------------------------------------------
   [[feedback_trial_reel_variants]]: a variant must change hook, bed, camera,
   palette AND transition — not one lever.
   ------------------------------------------------------------------------ */
type Trans = "flash" | "bars" | "punch" | "slide";
export type Variant = { hook: React.FC; hookHead: [string, string]; bed: string;
  seed: number; pal: number; trans: Trans; capTop: number; endHold: number };

export const VARIANTS: Variant[] = [
  { hook: S0Hook, hookHead: ["A FREE SEO AGENCY", "35 SEO AGENTS"],
    bed: "102_seo_bed.wav",   seed: 0, pal: 0, trans: "flash", capTop: 1268, endHold: 12 },
  /* cut B keeps a different opening line (the variant rule) but carries the
     same figure, so the two cuts do not disagree with each other. */
  { hook: S0Hook, hookHead: ["YOUR SEO HAS FAULTS", "35 AGENTS FIND THEM"],
    bed: "102_seo_bed_b.wav", seed: 5, pal: 0, trans: "bars",  capTop: 1214, endHold: 10 },
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
  const TOTAL = SEO_TOTAL + v.endHold;
  return (
    <AbsoluteFill>
      <Audio src={staticFile("102_seo_vo.wav")} />
      {/* ⛔⛔ THE BED MUST BE AUDIBLE AT 0.00s ([[soundtrack-onset-at-zero]]):
          three stacked causes have killed this before — a fade-in envelope, the
          TRACK's own ~4s fade-in intro, and AAC priming. Both passages are
          PRE-TRIMMED to their first downbeat and measured over their first
          500ms, then frequency-pocketed against the VO. */}
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

export const SeoReel = makeReel(VARIANTS[0]);
export const SeoReelB = makeReel(VARIANTS[1]);
