import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx, HookHeader, hexA } from "./SlopKit";
import { S0Hook, S1, S2, S3, S4, S5, S6, S7, S8, S9, S10Cta } from "./TrdScenes";
import { HookB, HookC, HookD } from "./TrdHooks";
import { CamCtx, PalCtx } from "./TrdWorld";
import { camFor } from "./AgyWorld";
import { SfxTrack, LEVELS, layer, repeat, db, Cue } from "./SoundKit";
import words from "./words_trade.json";

/* ===========================================================================
   REEL 103 · "TRADE" — Anthropic shipped ten named finance agents, and three of
   them read the earnings call, track your whole portfolio and build the
   valuation model. Board: storyboards/103-trade.md.

   VO: public/vo_trade.wav — 31.02s, 145 words.
   ⛔ THE RAW TAKE WAS CLEAN — no `cut cut` anywhere, which is unusual and was
      verified rather than assumed. 34.44s raw -> 31.02s: 0.53s of leading
      silence trimmed to 0.03s, six internal holes squeezed from 0.48-1.24s down
      to 0.32-0.36s, 0.82s of tail trimmed to 0.30s. Every boundary came from a
      MEASURED `silencedetect=-40dB` edge, never from a whisper word time
      ([[feedback_vo_cut_to_silence_not_whisper]] — whisper's `end` runs
      150-200ms early).
   ⛔⛔ NO atempo. The read is already dense — 145 words, and the 0.4-5.1s window
      runs 5.06 wps at 1x. The playbook's default x1.10 would have pushed the
      hook to 5.6 wps against R1's 4.5 ceiling, so the lever spent here was the
      GAPS, not the tempo ([[compress-reel]]: R1 was fixed by widening pauses,
      not by slowing the voice — the same trade, read the other way).
   ✅ THE CUT WAS VERIFIED RANGE BY RANGE, NOT END TO END. ⛔⛔ A whole-file
      whisper pass can HIDE a flub by stitching a half-take onto the real one
      (reel 101 lost a build to exactly that), so each of the six KEPT ranges was
      transcribed SEPARATELY with medium.en and each came back a complete, clean
      sentence. The CTA keyword was disambiguated on its own pass: `TRADE`.

   ⛔⛔ THREE VO CLAIMS THE PICTURE DELIBERATELY UNDER-STATES (board §0). The
      recorded line stays as recorded; the PICTURE is what stops at the edge.
      1. "their most advanced TRADING MODEL" -> there is no trading model. There
         IS a model with a real, published finance credential, and Anthropic's
         own post prints it: **Opus 4.7, 64.37% on Vals AI's Finance Agent
         benchmark**. S0-C carries that instead. Nothing anywhere in this reel is
         drawn placing, routing or executing a trade.
      2. "everyone's using incorrectly" -> unbackable, and it is also the reel's
         internal enemy, so it stays in the AUDIO and is drawn as an IGNORANCE
         picture (seven plates dark, three lit). Nobody is drawn getting it wrong.
      3. "building trading bots ... making massive profits" -> ⛔ THE HARD STOP.
         The repo's own README: the agents *"do not make investment
         recommendations, execute transactions ... every output is staged for
         human sign-off."* A P&L curve, a profit figure, money or a bot would
         disprove the reel inside the frame that speaks it. S9 spends its scale
         on the honest "massive" instead — ten desks running, the OUT tray
         stamped FOR REVIEW, and a verified 34,211★ / Apache-2.0.

   ⛔ NO VILLAIN, BY DESIGN. [[feedback_outlier_lift_is_within_creator_only]] is
      measured across 25 real outliers: *"external villains: rel-median 1.00 vs
      1.00 ... every breakout has NO villain."* The enemy here is the internal
      one the VO already states — an ignorance gap — and the pressure object is
      the wall clock, which is furniture and never wins a scene.

   ⛔⛔ EVERY `at` BELOW IS A MEASURED WORD ONSET from src/words_trade.json,
      pattern-matched on the beat's opening word, never an estimate. The SFX fire
      on these seconds; the PICTURE leads them by 4 frames inside the scenes, so
      its crossover — not its start — lands on the syllable.

   ⛔ ROOT OWNS THE GLOBAL CHROME: Bg, the one continuous ProgressBar, the one
      KaraokeCaption track, the VO, the bed and every header. Scene bodies see
      AssemblyCtx = true so their own copies return null.
   ========================================================================= */

export const FPS = 30;
/* ⛔⛔ THE REEL HARD-CUTS ON THE LAST WORD. Alex: *"near the end the video needs
   to cut right when I say the word over."* The cut point is MEASURED, not taken
   from whisper: `words_trade.json` ends `over.` at 30.190s, and the 10ms RMS
   envelope of the VO shows its `-r` still sounding through **30.410s** and not
   under -50 dB until 30.44s — whisper's `end` running ~270ms early, exactly the
   drift [[feedback_vo_cut_to_silence_not_whisper]] warns about. 915 frames =
   30.500s lands 40ms past the last audible sample: the word completes and the
   picture is gone, with zero dead tail. Was 931 + 12 endHold = 943 (31.43s),
   i.e. 0.93s of hang after he finished speaking. */
export const TRADE_TOTAL = 915;      // 30.50s — the hard cut ON "over" 

type Scene = { at: number; C: React.FC; head: [string, string] };

/* ⛔⛔ HEADERS CARRY IMMEDIATE, PLAIN VALUE — REWRITTEN WHOLESALE. Alex: *"the
   headers need to be immediate value at the very beginning and after as well ...
   'THE 3 AGENTS THAT MATTER OF ANTHROPIC'S TEN' is so vague, not even related,
   it should make people actually want to care, especially the later headers,
   not complex jargon."*

   ⭐ THE RULE ALREADY SAID TO ADD A FACT THE VO DOES NOT STATE
   ([[feedback_headers_state_the_claim]], as superseded on reel 93) AND I WAS
   OBEYING IT — but I was spending that fact on the SUBJECT'S vocabulary instead
   of the VIEWER'S. Counted on what shipped, five of eleven body headers were
   insider terms a scroller cannot price:

     anthropics/financial-services · DCF · COMPS · 3-STATEMENT
     FACTSET · LSEG · DALOOPA · APACHE-2.0 · STAGED FOR YOUR SIGN-OFF

   Every one is verifiable and every one is worthless to someone deciding in a
   second whether to keep watching. **A product noun the viewer cannot decode is
   theme flavour wearing a lab coat** — the same failure the original rule was
   written against, arrived at from the technical side instead of the poetic one.

   ⛔⛔ AND ROUND 13 WIDENED THE AUDIENCE. Alex: *"not just earnings calls, it
   should be higher TAM and more about trading or investing value."* The rewrite
   above traded jargon for plain English but kept an ANALYST'S frame — filings,
   models, sectors, updating a model. Those are jobs perhaps 1% of viewers have.
   [[feedback_replicator_topic_kills]] is explicit that this account wants huge
   TAM, so every header now speaks to the person who simply OWNS OR BUYS STOCKS:
   research done for you, what changed and why it matters, finding stocks you do
   not own yet, the data Wall Street pays for, pricing a stock in your own
   spreadsheet. Same verified facts underneath; a hundred times the audience.

   ⛔⛔ ROUND 14 — *"'anthropic just made stock research free' is so generic, like
   no shit. It has to be exaggerated, like 'anthropic just open sourced a hedge
   fund'."* He is right, and his example is more ACCURATE than what I had, not
   less: the repo's ten agents cover research, modelling, valuation review, GL
   reconciliation, **NAV calculation, month-end close, LP statement audits and
   KYC** — that is literally the front and back office of an investment fund,
   published under Apache-2.0. "Open sourced a hedge fund" is a COMPRESSION of a
   true scope, not an invented claim.

   ⛔ THE LINE THIS DOES NOT CROSS, and the reason the compression is safe: a
   hedge fund TRADES and these agents do not. So the exaggeration is allowed only
   because the reel states that limit **twice, in its own headers** — S4 "IT WILL
   NOT TELL YOU TO BUY / AND THAT IS THE POINT" and S9 "A FUND'S ENTIRE BACK
   OFFICE / FREE, AND IT NEVER TRADES". Scope may be compressed; EXECUTION may
   not. Remove either of those two headers and the hook becomes an overclaim.
   ⛔ And still no invented figures: no dollar value on the research desk, no
   percentage of work the three agents do, no price for the data feeds.

   Each header still carries a fact the VO never says — now stated as what
   someone who simply owns a stock GETS:
     "reads transcripts and filings"        -> THE HOMEWORK YOU'D NEVER SIT THROUGH
     "updates models, flags thesis changes" -> WHAT CHANGED, AND WHY IT MATTERS
     README: no investment recommendation   -> IT NEVER TELLS YOU TO BUY
     "sector + issuer", idea-generation     -> IT FINDS NEW STOCKS TOO
     FactSet/S&P/MSCI/LSEG connectors       -> THE SAME DATA WALL STREET PAYS FOR
     "live in Excel"                        -> PRICES A STOCK IN YOUR SPREADSHEET
     "creates AND MAINTAINS models"         -> AND IT REPRICES ITSELF
     Apache-2.0 + 34,211 stars + no trading -> FREE, PUBLIC, AND IT NEVER TRADES
   ⛔ THE HOOK AND CTA HEADERS STAY ECHOES by design — the rule exempts them,
   because one is the promise and the other is the ask.
   ⛔ AND THE PEAK'S HEADER IS STILL WHERE THE PROFIT CLAIM IS ANSWERED: the audio
   says "massive profits", the header says what is actually true and checkable —
   free, 34,211 stars, and it never trades for you. */
export const SCENES: Scene[] = [
  { at: 0,   C: S0Hook, head: ["ANTHROPIC OPEN SOURCED", "AN ENTIRE HEDGE FUND"] },
  { at: 157, C: S1,     head: ["10 ANALYSTS, ZERO SALARY", "NO SUB, NO WAITLIST, NO KEY"] },
  { at: 222, C: S2,     head: ["IT SITS THROUGH THE CALL", "SO YOU NEVER HAVE TO"] },
  { at: 245, C: S3,     head: ["IT FINDS WHAT THEY GLOSSED OVER", "AND WHY IT MATTERS TO YOU"] },
  /* ⛔ NOT "IT TELLS YOU TO HOLD". It reads; you decide. The repo's README is
     explicit that these agents make no investment recommendation, and the
     header is the reel's one literal channel — it must not assert a mechanism
     the repo does not have. */
  { at: 351, C: S4,     head: ["IT WILL NOT TELL YOU TO BUY", "AND THAT IS THE POINT"] },
  { at: 411, C: S5,     head: ["IT NEVER SLEEPS ON YOUR STOCKS", "OR THE ONES YOU DON'T OWN YET"] },
  { at: 451, C: S6,     head: ["IT READS THE FEEDS", "HEDGE FUNDS PAY A FORTUNE FOR"] },
  { at: 581, C: S7,     head: ["IT VALUES A WHOLE COMPANY", "IN YOUR OWN SPREADSHEET"] },
  { at: 613, C: S8,     head: ["AND REPRICES IT ITSELF", "EVERY TIME THE NUMBERS MOVE"] },
  { at: 736, C: S9,     head: ["A FUND'S ENTIRE BACK OFFICE", "FREE, AND IT NEVER TRADES"] },
  { at: 830, C: S10Cta, head: ["COMMENT TRADE", "I'LL SEND ALL 10 + THE SETUP"] },
];

/* ---- THE SFX BANK ---------------------------------------------------------
   ⛔⛔ MEASURE A SAMPLE BEFORE TRUSTING IT ([[reference_reel_sound_design]] —
      reel 99 shipped a bank whose most-used sample measured 0.477 spectral
      flatness and the whole reel read as "fuzzy"). This is reel 102's MEASURED
      subset, re-cast for a room made of oak, brass, paper and a running tape:
      impact_deep 0.001, slate_whump 0.003, pickup_chime 0.005, sub 0.013,
      temper_chime 0.028, lib_riser 0.034, metal_riser 0.034, pneu_thunk 0.036,
      mech_clank 0.041, metal_ping 0.073, gold_stamp 0.277.
   ⛔ A `repeat()` RUN IS ONE GESTURE, and no scene runs more than four cues.
   ⛔ LAYER THE HERO HIT: attack + low-end body. One thin pop is the single thing
      that makes a reel sound cheap.
   ⛔ RISERS CAPPED AT 2, spent on the reel's two real turns: the three plates
      coming forward (5.30s) and the floor lighting up (24.68s). The second is
      pre-rolled through S8's last second so its peak lands ON the cut.
   ------------------------------------------------------------------------ */
const SFX: Cue[] = [
  /* ---- S0 · THE OPEN. Frame 0 carries the heaviest stack in the reel — it is
     the interrupt (docs/THE-OPEN.md). SHEET (f0) -> TEN (1.00s) ->
     MODEL (1.87s) -> FLOOR (2.77s). ------------------------------------- */
  /* ⛔⛔ THE OPEN CARRIED FOUR EXPLICIT CUES IN 5.3 SECONDS AND THE PATTERN
     INTERRUPT WAS SILENT. Counted before rebuilding: cues at 0.00, 0.00, 0.03
     and 2.10 — so the burst at 0.50s (the one moment docs/THE-OPEN.md calls
     "the interrupt"), the cut to the working floor at 3.60s and the macro cut
     at 4.37s all played with nothing on them. A cut with no sound reads as a
     glitch; a cut with sound reads as intent. */
  { at: 0.00, src: "am/room-tone.wav", v: LEVELS.SFX_BED, dur: 5.2 },
  ...layer(0.00, { src: "impact_deep.wav", v: LEVELS.SFX_HERO, dur: 1.4, rate: 0.90 },
                 { src: "sub.wav", dur: 1.1, rate: 0.84 }),
  { at: 0.00, src: "slate_whump.wav", v: LEVELS.SFX_HERO, dur: 0.55, rate: 1.0 },
  { at: 0.03, src: "am/paper-slide.wav", v: LEVELS.SFX_MID, dur: 0.5, rate: 1.04 },
  { at: 0.10, src: "am/page-turn.wav", v: LEVELS.SFX_TEXTURE, dur: 0.44, rate: 1.10 },

  /* ⭐ THE BURST at 0.50s — the reel's interrupt, and its heaviest stack after
     frame 0. A riser pre-rolls into it, the tear lands on it, and ten pitched
     pings scatter out of it with the ten sprites. */
  { at: 0.28, src: "metal_riser.wav", v: LEVELS.SFX_MID, dur: 0.30, rate: 1.30 },
  ...layer(0.50, { src: "lib_cinematic_hit.wav", v: LEVELS.SFX_HERO, dur: 1.10, rate: 1.08 },
                 { src: "sub.wav", dur: 0.85, rate: 0.92 }),
  { at: 0.50, src: "am/paper-rustle.wav", v: LEVELS.SFX_HERO, dur: 0.55, rate: 1.14 },
  ...repeat(10, 0.56, 0.030, { src: "metal_ping.wav", v: LEVELS.SFX_TEXTURE, dur: 0.26 }, 0.055),

  /* CUT 2 · TEN PLATES DROP — one gesture, ten strikes, pitched up the run */
  ...layer(1.00, { src: "lib_whoosh.wav", v: LEVELS.SFX_MID, dur: 0.8, rate: 0.98 },
                 { src: "pneu_thunk.wav", dur: 0.45, rate: 0.92 }),
  ...repeat(10, 1.06, 0.050, { src: "metal_ping.wav", v: LEVELS.SFX_TEXTURE, dur: 0.30 }, 0.050),

  /* CUT 3 · THE MODEL + THE BENCHMARK */
  ...layer(1.87, { src: "lib_whoosh.wav", v: LEVELS.SFX_MID, dur: 0.6, rate: 1.12 },
                 { src: "gold_stamp.wav", dur: 0.5, rate: 1.02 }),
  { at: 2.10, src: "temper_chime.wav", v: LEVELS.SFX_TEXTURE, dur: 0.62, rate: 1.10 },

  /* CUT 4 · THE FLOOR — three lamps strike out of ten */
  ...layer(2.77, { src: "am/lights-on.wav", v: LEVELS.SFX_MID, dur: 0.75, rate: 1.0 },
                 { src: "pneu_thunk.wav", dur: 0.42, rate: 1.06 }),
  ...repeat(3, 2.86, 0.075, { src: "am/lights-on.wav", v: LEVELS.SFX_TEXTURE, dur: 0.36 }, 0.05),
  /* CUT 5 · SEVEN GO DARK at 3.60s — a power-down, pitched DOWN across the run */
  ...layer(3.60, { src: "pneu_thunk.wav", v: LEVELS.SFX_HERO, dur: 0.55, rate: 0.84 },
                 { src: "am/gear-stutter.wav", dur: 0.60, rate: 0.90 }),
  ...repeat(4, 3.70, 0.085, { src: "am/click-hard.wav", v: LEVELS.SFX_TEXTURE, dur: 0.24 }, -0.05),
  /* CUT 6 · THE MACRO at 4.37s — a hard punch in, no tail */
  ...layer(4.37, { src: "slate_whump.wav", v: LEVELS.SFX_HERO, dur: 0.48, rate: 0.94 },
                 { src: "mech_clank.wav", dur: 0.40, rate: 1.06 }),

  /* ---- S1 · THE THREE COME FORWARD. RISER 1 OF 2, then three brass landings
     on their measured settle frames, pitched up the run. ------------------ */
  { at: 5.30, src: "lib_riser.wav", v: LEVELS.SFX_MID, dur: 0.95, rate: 1.04 },
  ...layer(6.23, { src: "gold_stamp.wav", v: LEVELS.SFX_HERO, dur: 0.5, rate: 0.96 },
                 { src: "metal_ping.wav", dur: 0.34, rate: 0.98 }),
  ...layer(6.47, { src: "gold_stamp.wav", v: LEVELS.SFX_HERO, dur: 0.5, rate: 1.06 },
                 { src: "metal_ping.wav", dur: 0.34, rate: 1.10 }),
  ...layer(6.70, { src: "gold_stamp.wav", v: LEVELS.SFX_HERO, dur: 0.5, rate: 1.16 },
                 { src: "metal_ping.wav", dur: 0.34, rate: 1.22 }),

  /* ---- S1 · THE SPOT PASS. ⛔ A LIGHT THAT MOVES SILENTLY IS AN EFFECT. The
     beam travels at 5.23+28/30 = 6.16s and parks on each of the three at 6.30 /
     6.67 / 7.03; each park gets a soft lamp strike, and the travel between them
     gets a short air move so the move is audible as a move. ------------- */
  ...repeat(3, 6.16, 0.367, { src: "am/whoosh-swoosh.wav", v: LEVELS.SFX_TEXTURE, dur: 0.30 }, 0.03),
  ...repeat(3, 6.30, 0.367, { src: "am/lights-on.wav", v: LEVELS.SFX_MID, dur: 0.42 }, 0.06),

  /* ---- S2 · AGENT ONE IS NAMED. One layered brass strike, nothing else. -- */
  ...layer(7.63, { src: "stamp_press.wav", v: LEVELS.SFX_HERO, dur: 0.5, rate: 0.94 },
                 { src: "mech_clank.wav", dur: 0.42, rate: 1.0 }),

  /* ---- S3 · THE CALL FEEDS THROUGH. A paper bed under the travel, four
     pickups on their measured onsets, pitched up. ------------------------- */
  { at: 8.30, src: "am/paper-rustle.wav", v: LEVELS.SFX_MID, dur: 1.9, rate: 0.94 },
  ...layer(8.63, { src: "am/highlighter.wav", v: LEVELS.SFX_MID, dur: 0.36, rate: 0.98 },
                 { src: "metal_ping.wav", dur: 0.30, rate: 1.02 }),
  { at: 9.30, src: "am/highlighter.wav", v: LEVELS.SFX_MID, dur: 0.36, rate: 1.06 },
  { at: 10.03, src: "am/highlighter.wav", v: LEVELS.SFX_MID, dur: 0.36, rate: 1.14 },
  ...layer(10.70, { src: "am/highlighter.wav", v: LEVELS.SFX_MID, dur: 0.36, rate: 1.22 },
                  { src: "temper_chime.wav", dur: 0.55, rate: 1.14 }),

  /* ---- S4 · THE DECISION. The fan, then ONE wooden turn on the measured
     onset of "decide". The quietest beat in the reel, on purpose. --------- */
  { at: 11.78, src: "am/page-turn.wav", v: LEVELS.SFX_MID, dur: 0.5, rate: 1.02 },
  ...layer(12.83, { src: "pneu_thunk.wav", v: LEVELS.SFX_HERO, dur: 0.5, rate: 1.0 },
                  { src: "am/check-pop.wav", dur: 0.4 }),

  /* ---- S5 · AGENT TWO IS NAMED, over a running tape. ------------------- */
  { at: 13.72, src: "am/gear-mech.wav", v: LEVELS.SFX_BED, dur: 5.4, rate: 1.06 },
  ...layer(13.97, { src: "stamp_press.wav", v: LEVELS.SFX_HERO, dur: 0.5, rate: 1.02 },
                  { src: "mech_clank.wav", dur: 0.42, rate: 1.08 }),

  /* ---- S6 · THE WIRE WALL. The card goes up, then three columns land on the
     VO's own onsets — announcement 16.71, news 17.20, analyst 17.72. ------ */
  { at: 15.12, src: "am/paper-slide.wav", v: LEVELS.SFX_MID, dur: 0.5, rate: 1.10 },
  ...layer(16.71, { src: "gold_stamp.wav", v: LEVELS.SFX_HERO, dur: 0.48, rate: 0.98 },
                  { src: "am/click-hard.wav", dur: 0.3 }),
  ...layer(17.20, { src: "gold_stamp.wav", v: LEVELS.SFX_HERO, dur: 0.48, rate: 1.08 },
                  { src: "am/click-hard.wav", dur: 0.3, rate: 1.08 }),
  ...layer(17.72, { src: "gold_stamp.wav", v: LEVELS.SFX_HERO, dur: 0.48, rate: 1.18 },
                  { src: "am/click-hard.wav", dur: 0.3, rate: 1.16 }),

  /* ---- S6 · THE COLUMN PASS. The beam parks on each column as it lands, on
     the same measured onsets the columns use. ---------------------------- */
  ...repeat(3, 16.40, 0.50, { src: "am/whoosh-swoosh.wav", v: LEVELS.SFX_TEXTURE, dur: 0.28 }, 0.04),

  /* ---- S7 · AGENT THREE IS NAMED, over a ledger already ruling in. ----- */
  ...layer(19.63, { src: "stamp_press.wav", v: LEVELS.SFX_HERO, dur: 0.5, rate: 1.10 },
                  { src: "mech_clank.wav", dur: 0.42, rate: 1.16 }),

  /* ---- S8 · ⭐ THE MATCH CUT. ⛔ A MATCHED JOIN STILL NEEDS A TRANSIENT — the
     picture hides the cut on purpose, so the SOUND is the only thing that tells
     the viewer the camera moved. A low swell on the leap, no impact (an impact
     would announce the join the picture is hiding). --------------------- */
  { at: 20.43, src: "sub.wav", v: LEVELS.SFX_MID, dur: 0.70, rate: 0.82 },

  /* ---- S8 · THE MODEL BUILDS. An eight-step tick run for the columns filling
     (ONE gesture for thirty cells), then the two landings the VO names. --- */
  ...repeat(8, 20.75, 0.135, { src: "am/counter-tick.wav", v: LEVELS.SFX_TEXTURE, dur: 0.26 }, 0.03),
  ...layer(22.83, { src: "gold_stamp.wav", v: LEVELS.SFX_HERO, dur: 0.55, rate: 1.02 },
                  { src: "pneu_thunk.wav", dur: 0.44, rate: 0.96 }),
  ...layer(23.38, { src: "gold_stamp.wav", v: LEVELS.SFX_HERO, dur: 0.55, rate: 1.12 },
                  { src: "metal_ping.wav", dur: 0.36, rate: 1.18 }),

  /* ---- S9 · THE PEAK. RISER 2 OF 2, pre-rolled through S8's last second so
     its peak lands ON the cut, then the layered hero hit and a ten-step lamp
     run. The loudest moment in the reel. --------------------------------- */
  { at: 24.06, src: "metal_riser.wav", v: LEVELS.SFX_MID, dur: 0.66, rate: 1.18 },
  ...layer(24.68, { src: "lib_cinematic_hit.wav", v: LEVELS.SFX_HERO, dur: 1.6, rate: 1.0 },
                  { src: "sub.wav", dur: 1.05, rate: 0.88 }),
  ...repeat(10, 24.74, 0.072, { src: "am/lights-on.wav", v: LEVELS.SFX_TEXTURE, dur: 0.34 }, 0.04),
  ...layer(26.98, { src: "stamp_press.wav", v: LEVELS.SFX_HERO, dur: 0.5, rate: 0.92 },
                  { src: "gold_stamp.wav", dur: 0.5, rate: 0.98 }),

  /* ---- S10 · ⭐ THE SECOND MATCH CUT, on the out tray. Same treatment. --- */
  { at: 27.67, src: "sub.wav", v: LEVELS.SFX_MID, dur: 0.66, rate: 0.88 },

  /* ---- S10 · THE KEYWORD. Four beats, one cue each — never two cues and a
     hold (reel 100's CTA v1 spent everything by f26 and then sat). -------- */
  { at: 27.94, src: "am/paper-slide.wav", v: LEVELS.SFX_MID, dur: 0.55, rate: 0.96 },
  ...layer(28.81, { src: "gold_stamp.wav", v: LEVELS.SFX_HERO, dur: 0.55, rate: 1.0 },
                  { src: "pneu_thunk.wav", dur: 0.45, rate: 1.02 }),
  ...layer(29.19, { src: "lib_cinematic_hit.wav", v: LEVELS.SFX_HERO, dur: 1.1, rate: 1.06 },
                  { src: "arrive_chime.wav", dur: 0.95 }),
  { at: 29.98, src: "am/positive-chime.wav", v: LEVELS.SFX_MID, dur: 0.50 },
];

/* ---- THE VARIANT CUTS -----------------------------------------------------
   [[feedback_trial_reel_variants]]: a variant must change hook, bed, camera,
   palette AND transition — not one lever.
   ------------------------------------------------------------------------ */
export type Variant = { hook: React.FC; hookHead: [string, string]; bed: string;
  seed: number; pal: number; trans: Trans; capTop: number; endHold: number };

export const VARIANTS: Variant[] = [
  { hook: S0Hook, hookHead: ["ANTHROPIC OPEN SOURCED", "AN ENTIRE HEDGE FUND"],
    bed: "103_trade_bed.wav",   seed: 0, pal: 0, trans: "flash", capTop: 1268, endHold: 0 },
  /* every cut opens on a different line but carries the SAME figures, so no two
     cuts ever disagree with each other about a verified number. */
  { hook: HookB, hookHead: ["ANTHROPIC BUILT YOU", "A 10-ANALYST RESEARCH DESK"],
    bed: "103_trade_bed_b.wav", seed: 5, pal: 0, trans: "sweep", capTop: 1214, endHold: 0 },
  /* ⛔⛔ EVERY CUT NOW RENDERS ITS OWN HOOK COMPONENT. Alex: *"variants B, C, D
     have to be different than A, they are wayyyy too same, especially the
     hook."* All four used to render the SAME `S0Hook` — so `hookHead`, `bed`,
     `seed`, `pal` and `trans` were paint and jitter over one identical sequence
     of six shots in one identical room. Four of the five levers
     [[feedback_trial_reel_variants]] asks for, and the missing one was the one
     he could see. `TrdHooks.tsx` gives B, C and D a different ROOM, a different
     second shot, a different order and a different agent to close on; frame 0
     stays Anthropic's real post in all four, because that is the standing
     instruction and the gated claim plate.
     ⛔ C AND D ALSO MOVE THE PALETTE RING, which is the lever the first two did
     not touch. [[feedback_trial_reel_variants]]: *"if the scenes are shared, the
     middle is weak; the next lever is swapping which WORLD each scene uses."*
     A and B differ only on hook line, bed, camera seed and wipe — every scene
     body is pixel-identical between them, which is exactly the weak-middle case
     that memory names. `pal` rotates each scene onto a NEIGHBOURING place in its
     own warm/cold ring, so C and D are re-lit end to end, not just re-titled. */
  { hook: HookC, hookHead: ["A HEDGE FUND'S RESEARCH DESK", "IS NOW A FREE DOWNLOAD"],
    bed: "103_trade_bed_c.wav", seed: 9, pal: 1, trans: "bloom", capTop: 1240, endHold: 0 },
  { hook: HookD, hookHead: ["WALL STREET'S RESEARCH STACK", "JUST WENT OPEN SOURCE"],
    bed: "103_trade_bed_d.wav", seed: 13, pal: 2, trans: "none",  capTop: 1252, endHold: 0 },
];

/** the cut punctuation. One per variant, so two cuts never edit the same way.

    ⛔⛔ ALL FOUR KINDS WERE REBUILT — THREE OF THEM BROKE A STANDING RULE THAT
    ALEX HAD ALREADY FLAGGED, ON REEL 98, IN THESE WORDS: *"I hate the black
    circle transition thing, it is so flashy and hurts my eyes, please prevent
    stuff like this in the future too and remove it from all of these videos."*
    ([[feedback_no_flashing_transitions]].) I cloned this component off the SEO
    chassis and never diffed it against the rule — the exact class of bug
    [[feedback_reel_house_chassis]] warns about, where a clone silently inherits
    something that is not house-legal. What was actually shipping:

      punch  `clipPath: circle()` in #14110E at **opacity 0.90** — a full-frame
             black IRIS, i.e. the precise thing he named
      bars   #14110E at **0.86**, no envelope
      slide  #14110E at **0.88**, no envelope

    THE BAR, from that memory: peak opacity **<= 0.30**; never pure white or
    black (warm near-black #2A2620); **no shape that closes over the full
    frame**; ramp in AND out on a sin envelope; at least 8 frames.
    ⭐ And the rule's own escape hatch is the best variant of the four: *"a hard
    cut with nothing over it is always an acceptable answer."* Cut D takes it. */
type Trans = "flash" | "sweep" | "bloom" | "none";

const Trans: React.FC<{ at: number; kind: Trans }> = ({ at, kind }) => {
  const f = useCurrentFrame();
  const n = 9;
  if (kind === "none" || f < at || f >= at + n) return null;
  const p = (f - at) / n;
  const env = Math.sin(p * Math.PI);                       /* in AND out */

  /* A · a cream bloom over the seam. Warm, low, never white. */
  if (kind === "flash") return (
    <div style={{ position: "absolute", inset: 0, zIndex: 140, pointerEvents: "none",
      background: "#F4EEE2", opacity: env * 0.16 }} />
  );

  /* B · a soft warm band travelling across. ⛔ A BAND, NOT A SHUTTER — it is
     440px of a 1080px frame, so at no point is the picture covered. */
  if (kind === "sweep") return (
    <div style={{ position: "absolute", inset: 0, zIndex: 140, pointerEvents: "none",
      overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "-20%", bottom: "-20%", width: "42%",
        left: `${-46 + p * 150}%`, transform: "skewX(-14deg)",
        background: `linear-gradient(90deg, ${hexA("#2A2620", 0)} 0%, `
          + `${hexA("#2A2620", env * 0.24)} 50%, ${hexA("#2A2620", 0)} 100%)` }} />
    </div>
  );

  /* C · a warm exposure lift from the bottom edge — reads as the room
     brightening for a beat rather than as a device firing. */
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 140, pointerEvents: "none",
      background: `linear-gradient(0deg, ${hexA("#F6EBCE", env * 0.28)} 0%, `
        + `${hexA("#F6EBCE", env * 0.10)} 46%, ${hexA("#F6EBCE", 0)} 100%)` }} />
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
  const TOTAL = TRADE_TOTAL + v.endHold;
  return (
    <AbsoluteFill>
      <Audio src={staticFile("vo_trade.wav")} />
      {/* ⛔⛔ THE BED MUST BE AUDIBLE AT 0.00s ([[soundtrack-onset-at-zero]]):
          three stacked causes have killed this before — a fade-in envelope, the
          TRACK's own fade-in intro, and AAC priming. Both passages are
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

      {/* ⛔ NO WIPE ON A MATCHED JOIN. storyboards/CAMERA-GRAMMAR.md is explicit
          that a wipe kills a match cut — the whole point is that the audience
          cannot see the join. S8 (613) matches S7 on the model grid and S10
          (830) matches S9 on the out tray, so both are excluded here. */}
      {SC.slice(1).filter((sc) => sc.at !== 613 && sc.at !== 830)
        .map((sc) => <Trans key={"t" + sc.at} at={sc.at} kind={v.trans} />)}

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

export const TradeReel  = makeReel(VARIANTS[0]);
export const TradeReelB = makeReel(VARIANTS[1]);
export const TradeReelC = makeReel(VARIANTS[2]);
export const TradeReelD = makeReel(VARIANTS[3]);
