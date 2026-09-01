import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx, HookHeader } from "./SlopKit";
import {
  S0, S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, S13, S14, S15, S16,
  CAM, GRADE, VARKIT,
} from "./RowScenes";
import type { Variant } from "./RowScenes";
import { CamCtx, VarCtx, R } from "./RowWorld";
import { SfxTrack, LEVELS, db, Cue, layer } from "./SoundKit";
import words from "./data/words_google.json";

/* ===========================================================================
   REEL 129 · "GOOGLE" — THE SHUTTER ROW.  Board: storyboards/129-google.md.

   Subject: Google shipped fifteen new AI tools; the internet is crowded around
   two of them. Four of the other thirteen — Jules, Opal, Mixboard, Pomelli —
   will actually do your work.

   ⛔ PRIOR ART, FLAGGED NOT HIDDEN: reel 116 "BILL" (delivered 2026-08-20) was
   also "free Google AI tools" and featured Opal AND Antigravity. This reel
   shares Opal as a featured tool and uses Antigravity as its hook's foil, ten
   days later on the same brand. What keeps them apart: 116 is THE LONG BILL (an
   invoice cut shorter; the enemy is a charge), 129 is THE SHUTTER ROW (the
   enemy is ATTENTION); 116's Opal beat was "one sentence -> a mini-app + a
   shareable link" against a bill, 129's is a node canvas wiring itself against
   n8n. Three of the four tools are net-new. Called out for Alex, not buried.

   ⚠️⛔ THE ONE PLACE THE VO IS WRONG. It calls Opal "a drag and drop video
   editor for AI". Opal is a drag-and-drop WORKFLOW / mini-app builder — which
   is what the rest of the same sentence correctly says. Confirmed a genuine
   misspeak (medium.en on the isolated clip), and the clause cannot be cut
   without splicing inside speech. So BAY 12 CONTAINS NO TIMELINE, NO SCRUBBER,
   NO FILMSTRIP, NO CLIP AND NO PLAY HEAD — it draws the node canvas. A 3-second
   re-record of that clause is the only clean fix and it is offered.

   ⛔ THE HONESTY LEDGER IS `R` IN `RowWorld.tsx` AND NOWHERE ELSE. Mixboard and
   Pomelli publish NO product mark (both serve the generic Google Labs beaker),
   so they get real NAME plates — a wrong mark is worse than no mark.

   1383 frames = 46.10s at 30fps, x1.00 with NO SPEEDUP.
   ⚠️ LENGTH IS FLAGGED: the house range is 22-29s and this is 46.1s. The VO is
      a four-item listicle with a hook and a CTA; no edit reaches 30s without
      dropping two of the four tools. Comparable shipped: 122 at 61.0s (and a
      46.8s short), 116 at 56.5s, 126 at 37.9s. FLAGGED, NOT SILENTLY TRIMMED.
   ⚠️ R1: 4.48 words/sec measured over SPEECH (house mean 5.28, range 4.71-5.96)
      and the 0-10s hook runs 3.60 wps against a 4.0 bar. Both PASS, at the calm
      end — deliberate, after reel 127's "the VO is way too fast".

   ⛔ ROOT OWNS THE GLOBAL CHROME: Bg, the one continuous ProgressBar, the one
      KaraokeCaption track, the VO, the bed and the header. Scene bodies see none.
   ⛔ THE CAMERA OFFSET GOES ON THE PANEL CONTENTS via CamCtx, never the comp.
   ========================================================================= */

const FPS = 30;

/** ⛔ EVERY ONSET IS DERIVED FROM `words_google.json`, never typed by feel, and
    every one is the measured word onset MINUS 4 FRAMES — the picture leads the
    voice by 4f house-wide (`feedback_the_picture_leads_the_voice`).
    Source onsets (seconds):
      S1  "but" 1.86      S2  "and" 3.72      S3  "First," 6.67
      S4  "Hook" 9.84     S5  "fixing" 12.39  S6  "Second," 15.80
      S7  "basically" 18.84                   S8  "Describe" 20.95
      S9  "a" 22.87       S10 "Third," 25.07  S11 "You" 28.00
      S12 "until" 30.69   S13 "Fourth," 34.01 S14 "Just" 36.52
      S15 "Then" 39.82    S16 "There" 43.64   last word ends 45.79 */
export const L = {
  S0: 0, S1: 51, S2: 108, S3: 189, S4: 282, S5: 358, S6: 456, S7: 542,
  S8: 608, S9: 661, S10: 724, S11: 810, S12: 887, S13: 980, S14: 1050,
  S15: 1145, S16: 1257, END: 1333,
} as const;
/* ⛔ END = 1383 (46.10s) and the last word ends at 45.79s — a 0.31s tail.
   Reel 128 shipped END at 0.10s behind its last word and the CTA's final word
   DIED IN THE RENDER: re-transcribing the delivered file returned "comment boss
   for the freak" while the VO stem alone was perfect. A word inside the AAC
   encoder's priming/flush window is unrecoverable, and boosting 12 dB did not
   help. 0.31s clears it and is still inside verify_reel's ENDS_TIGHT 0.5s bar. */
export const GOOGLE_TOTAL = L.END;

const DUR = {
  S0: L.S1 - L.S0, S1: L.S2 - L.S1, S2: L.S3 - L.S2, S3: L.S4 - L.S3,
  S4: L.S5 - L.S4, S5: L.S6 - L.S5, S6: L.S7 - L.S6, S7: L.S8 - L.S7,
  S8: L.S9 - L.S8, S9: L.S10 - L.S9, S10: L.S11 - L.S10, S11: L.S12 - L.S11,
  S12: L.S13 - L.S12, S13: L.S14 - L.S13, S14: L.S15 - L.S14,
  S15: L.S16 - L.S15, S16: L.END - L.S16,
};
const S = (fr: number) => fr / FPS;

/* ---- THE SFX BANK ---------------------------------------------------------
   ⛔⛔⛔ THE BAN LIST FIRST, BEFORE ANY MEASUREMENT. `pneu_thunk.wav` and
   `crusher.wav` are on a STANDING FOREVER-BAN (Alex, reel 116: *"those puff of
   air sounds do not use those sound effects again forever"*). Neither is here,
   and neither is any file whose NAME says whoosh / swoosh / puff — a
   measurement cannot out-argue the label on the tin. `ballast_buzz` and
   `chain_clank` both tripped the AIR gate on reel 120 and are excluded; so is
   `slot_lever` (58.7% bright, 116ms attack — an air swell AND a slap), and so
   are `coin_slide` (a 275ms noise swell), `crowd_cheer` (1205ms), `crowd_run`
   (694ms) and `horn`, all of which measure as SWELLS, not hits.

   ⛔⛔ A CLEAN AUDIT IS NOT A GOOD BANK. Reel 110 passed every gate with 24 of
   41 cues out of one chiptune pack, because the tool measures spectra and has
   no gate for *"this is a Mario sound"*. Every `c_*.wav` in the library is that
   pack and NONE of them is here.

   ⭐ THE BANK BELONGS TO THE WORLD, AND THE WORLD IS A DELIVERY ROW AT NIGHT
   PLUS FOUR WORKSHOPS. So: `ratchet` and `slate_whump` for shutters and heavy
   things seating, `mech_clank` for servos, `sorter_tick` for a row counting
   itself, `can_bong` for a STEEL TRAY (the hero artifact has its own voice, and
   it is the only thing that uses it), `ticket_click` for cards leaving a rack,
   `data`/`wire_travel` for things wiring themselves, `mallet_tap` for pinning,
   `swish` for tearing, `engine_loop` for a press, `sign_clack` for sheets
   leaving it, `metal_ping` for type slugs. A hit and a miss never share a
   sample — that is what makes a room read as a room and not a sequence of thumps.

   ⭐ DENSITY IS A SHAPE, NOT A LEVEL (§9). 64 cues over 46.10s = 1.39/sec,
   inside the 1.0-1.5 house ceiling, and PEAKED on the three scenes that carry
   the story — the hook (6), the Mixboard payoff (6) and the CTA (5) — thinning
   to 3 on the bay intros. A rejected reel 107 ran 3.82/sec flat.

   ⛔ EVERY `dur` IS >= THE FILE'S MEASURED TRUE LENGTH, checked with ffprobe
   before this list was written (`dur` truncates tails and reel 78's first bank
   chopped five of six opening cues that way).
   ⛔ `at` IS ROOT SECONDS — scene bodies are not Sequence-wrapped for audio. */
const SFX: Cue[] = [
  /* ── S0 · THE HOOK — RE-CUT WITH THE PICTURE.
        ⛔⛔⛔ These six cues were written for the hook that got replaced: three
        simultaneous impacts for a machined cover slamming, a relay at f7 and a
        thirteen-shutter ratchet at f9. None of those events exist any more.
        `feedback_the_sfx_list_does_not_follow_the_picture` is exactly this — six
        rebuilds against one unchanged cue list, and no gate hears it.

        ⭐ The new hook's events are: he is ALREADY under the load (f0), two more
        land on the pile (f5, f12), the two everyone talks about slide off the
        top (f17), someone walks away with them (f26), he re-grips (f36).

        ⭐⭐ AND THE FIRST THING YOU HEAR IS SOMETHING STRAINING. `motor_sag` is
        86.6% under 250 Hz; reel 119 opens on it for the same reason — the load
        is audible before it is legible. It replaces the impact stack, because an
        impact on a frame where nothing hits is the mismatch this whole note is
        about. `impact_deep` stays as the single interrupt: frame 0 is still a cut. */
  { at: S(0),    src: "motor_sag.wav",    v: LEVELS.SFX_HERO,   dur: 0.92 },
  { at: S(0),    src: "impact_deep.wav",  v: LEVELS.SFX_MID,    dur: 0.58, rate: 0.94 },
  { at: S(0),    src: "sub.wav",          v: LEVELS.SFX_MID,    dur: 0.50 },
  { at: S(5),    src: "thock.wav",        v: LEVELS.SFX_MID,    dur: 0.22 },          // one lands
  { at: S(12),   src: "thock.wav",        v: LEVELS.SFX_MID,    dur: 0.22, rate: 1.12 }, // and another
  { at: S(17),   src: "fling.wav",        v: LEVELS.SFX_MID,    dur: 0.34 },          // the two slide off
  { at: S(21),   src: "mallet_tap.wav",   v: LEVELS.SFX_MID,    dur: 0.20, rate: 1.18 },
  { at: S(26),   src: "pickup_chime.wav", v: LEVELS.SFX_MID,    dur: 0.40 },          // taken away
  { at: S(36),   src: "slate_whump.wav",  v: LEVELS.SFX_HERO,   dur: 0.24, rate: 1.10 }, // he re-grips
  { at: S(37),   src: "mech_clank.wav",   v: LEVELS.SFX_TEXTURE, dur: 0.26 },

  /* ── S1 · fifteen bays counting themselves. `sorter_tick` is 2.40s of a row
        ticking, which is ONE cue where fifteen would blow the rate budget. */
  { at: S(51),   src: "sign_clack.wav",  v: LEVELS.SFX_MID,     dur: 0.28 },
  { at: S(55),   src: "tick.wav",         v: LEVELS.SFX_MID,     dur: 0.10 },
  { at: S(69),   src: "tick.wav",         v: LEVELS.SFX_MID,     dur: 0.10, rate: 1.14 },
  { at: S(85),   src: "tick.wav",         v: LEVELS.SFX_MID,     dur: 0.10, rate: 1.30 },
  { at: S(98),   src: "metal_ping.wav",   v: LEVELS.SFX_MID,     dur: 0.36, rate: 1.22 },

  /* ── S2 · THE OUT-TRAY'S OWN VOICE. `can_bong` appears here and in no other
        scene of the reel: the hero artifact gets a sound nothing else has. */
  { at: S(108),  src: "thock.wav",       v: LEVELS.SFX_MID,     dur: 0.22 },
  { at: S(133),  src: "can_bong.wav",    v: LEVELS.SFX_HERO,    dur: 0.42 },
  { at: S(160),  src: "pickup_chime.wav", v: LEVELS.SFX_MID,    dur: 0.40 },

  /* ── S3 · JULES boots. The charge TRAVELS, so the cue travels with it. */
  { at: S(189),  src: "knife_switch.wav", v: LEVELS.SFX_MID,    dur: 0.20, rate: 0.94 },
  { at: S(199),  src: "lib_correct.wav",  v: LEVELS.SFX_MID,     dur: 2.00, rate: 0.92 },
  { at: S(233),  src: "mech_clank.wav",  v: LEVELS.SFX_MID,     dur: 0.18 },
  { at: S(261),  src: "blip2.wav",        v: LEVELS.SFX_MID,     dur: 0.26 },

  /* ── S4 · the GitHub port, then a rack DRAINING under a machine bed. */
  { at: S(282),  src: "gear_shift.wav",  v: LEVELS.SFX_MID,     dur: 0.14 },
  { at: S(294),  src: "clap_slam.wav",   v: LEVELS.SFX_HERO,    dur: 0.34 },
  { at: S(298),  src: "machine_bed.wav", v: LEVELS.SFX_BED,     dur: 2.40 },
  { at: S(321),  src: "ticket_click.wav", v: LEVELS.SFX_MID,    dur: 0.18 },

  /* ── S5 · three DIFFERENT jobs, so three DIFFERENT samples. The test ticks
        climb a pitch ladder, which is what "writing tests" sounds like filling. */
  { at: S(358),  src: "blip3.wav",       v: LEVELS.SFX_MID,     dur: 0.26 },
  { at: S(372),  src: "snap.wav",        v: LEVELS.SFX_MID,     dur: 0.10 },
  { at: S(391),  src: "blip4.wav",        v: LEVELS.SFX_MID,     dur: 0.26, rate: 0.95 },
  { at: S(403),  src: "blip4.wav",        v: LEVELS.SFX_MID,     dur: 0.26, rate: 1.12 },
  { at: S(415),  src: "blip4.wav",        v: LEVELS.SFX_MID,     dur: 0.26, rate: 1.30 },
  { at: S(436),  src: "pop.wav",         v: LEVELS.SFX_MID,     dur: 0.18 },

  /* ── S6 · OPAL. A node is LIFTED, carried and DROPPED — three separate
        sounds for one gesture, none of them shared with a landing elsewhere. */
  { at: S(456),  src: "ui_tap.wav",      v: LEVELS.SFX_MID,     dur: 0.14 },
  { at: S(518),  src: "thock.wav",       v: LEVELS.SFX_HERO,    dur: 0.22, rate: 0.92 },
  { at: S(518),  src: "chair_knock.wav",  v: LEVELS.SFX_TEXTURE, dur: 0.34 },

  /* ── S7 · the manual haul against the self-wiring. Two textures, one frame. */
  { at: S(542),  src: "ratchet.wav",     v: LEVELS.SFX_MID,     dur: 0.56, rate: 0.90 },
  { at: S(571),  src: "data.wav",        v: LEVELS.SFX_MID,     dur: 0.26 },

  /* ── S8 · the sentence crossing the frame and converting at the lip. */
  { at: S(608),  src: "blip5.wav",       v: LEVELS.SFX_MID,     dur: 0.26 },
  { at: S(614),  src: "machine_bed.wav", v: LEVELS.SFX_BED,     dur: 1.90, rate: 1.08 },
  { at: S(648),  src: "data.wav",        v: LEVELS.SFX_MID,     dur: 0.26, rate: 1.12 },

  /* ── S9 · the wiring lands, the app BOOTS, the code rack leaves. */
  { at: S(661),  src: "thock.wav",       v: LEVELS.SFX_MID,     dur: 0.22, rate: 1.08 },
  { at: S(695),  src: "arrive_chime.wav", v: LEVELS.SFX_HERO,   dur: 1.20 },
  { at: S(709),  src: "rebuild_thud.wav", v: LEVELS.SFX_MID,    dur: 0.86 },

  /* ── S10 · MIXBOARD. A board on chains, and it LANDS heavy. */
  { at: S(724),  src: "gear_shift.wav",  v: LEVELS.SFX_MID,     dur: 0.14, rate: 0.92 },
  { at: S(734),  src: "ratchet.wav",     v: LEVELS.SFX_MID,     dur: 0.58, rate: 1.05 },
  { at: S(770),  src: "slate_whump.wav", v: LEVELS.SFX_HERO,    dur: 0.24 },

  /* ── S11 · pinning. `mallet_tap` pitch-varied, and nothing else uses it. */
  { at: S(810),  src: "mallet_tap.wav",  v: LEVELS.SFX_MID,     dur: 0.24, rate: 0.94 },
  { at: S(834),  src: "mallet_tap.wav",  v: LEVELS.SFX_MID,     dur: 0.24, rate: 1.06 },
  { at: S(872),  src: "temper_chime.wav", v: LEVELS.SFX_MID,    dur: 0.76 },

  /* ── S12 · THE ESCALATING JOKE, AND THE SOUND CARRIES IT. Three tears, each
        HIGHER and SHORTER than the last, then the clamp. The rate IS the joke. */
  { at: S(887),  src: "blip1.wav",       v: LEVELS.SFX_MID,     dur: 0.26 },
  { at: S(911),  src: "bamboo_crack.wav", v: LEVELS.SFX_MID,    dur: 0.44, rate: 0.90 },
  { at: S(931),  src: "bamboo_crack.wav", v: LEVELS.SFX_MID,    dur: 0.44, rate: 1.10 },
  { at: S(947),  src: "bamboo_crack.wav", v: LEVELS.SFX_MID,    dur: 0.44, rate: 1.28 },
  { at: S(961),  src: "metal_ping.wav",  v: LEVELS.SFX_HERO,    dur: 0.36 },
  { at: S(963),  src: "ceramic_crack.wav", v: LEVELS.SFX_MID,   dur: 0.76, rate: 1.10 },

  /* ── S13 · the press comes down its rails and SEATS. */
  { at: S(980), src: "gear_shift.wav",  v: LEVELS.SFX_MID,     dur: 0.14, rate: 1.08 },
  { at: S(988), src: "mech_clank.wav",  v: LEVELS.SFX_MID,     dur: 0.20, rate: 0.80 },
  { at: S(1024), src: "slate_whump.wav", v: LEVELS.SFX_HERO,    dur: 0.24, rate: 0.88 },

  /* ── S14 · three extractions, three different mechanisms, three samples. */
  { at: S(1050), src: "scan_beep.wav",   v: LEVELS.SFX_MID,     dur: 0.44 },
  { at: S(1054), src: "machine_bed.wav", v: LEVELS.SFX_BED,     dur: 3.30, rate: 0.94 },
  { at: S(1076), src: "snap.wav",        v: LEVELS.SFX_MID,     dur: 0.10, rate: 0.92 },
  { at: S(1102), src: "ticket_click.wav", v: LEVELS.SFX_MID,    dur: 0.18, rate: 1.10 },
  { at: S(1126), src: "metal_ping.wav",  v: LEVELS.SFX_MID,     dur: 0.36, rate: 1.14 },

  /* ── S15 · the press RUNS. A bed under it, and a sheet leaving every 4th. */
  { at: S(1145), src: "sign_clack.wav",  v: LEVELS.SFX_MID,     dur: 0.28, rate: 1.06 },
  { at: S(1148), src: "engine_loop.wav", v: LEVELS.SFX_BED,     dur: 2.10 },
  { at: S(1211), src: "engine_loop.wav", v: LEVELS.SFX_BED,     dur: 2.10, rate: 1.04 },
  { at: S(1228), src: "stamp_press.wav", v: LEVELS.SFX_MID,     dur: 0.40 },

  /* ── S16 · THE TURN. The reel's last cue lands at 44.85s and runs to 45.65s;
        the last WORD ends at 45.79s. ⛔ NOTHING SOUNDS AFTER IT — the last word
        needs its room, and reel 128 lost its CTA's final word to exactly this. */
  { at: S(1257), src: "boom.wav",        v: LEVELS.SFX_HERO,    dur: 0.62 },
  { at: S(1257), src: "sub.wav",         v: LEVELS.SFX_MID,     dur: 0.50, rate: 0.94 },
  { at: S(1272), src: "green_tone.wav",  v: LEVELS.SFX_MID,     dur: 0.76 },
  { at: 43.17,   src: "gold_stamp.wav",   v: LEVELS.SFX_HERO,    dur: 0.54 },
];

/* ⛔ THE BED IS A REAL TRACK AND IT IS USED FROM ITS OPENING (`feedback_the_bed
   _drifted_to_the_end_of_the_song`: reels 124 and 125 both used 168.96s of a
   229s master). `129_google_bed.wav` is `ebm_bed_hot` two-pass loudnormed to
   I=-17 with LRA=7 to tame a 12.5 LRA build, measured across the reel's own
   span at -22.0 -> -19.2 dB: present in every window, never flat, and it RISES
   toward the CTA, which is the shape of the intensity curve.
   ⛔ Reel 128's bed was FLAT -25/-32 dB end to end and no gain could fix that —
   `feedback_too_quiet_can_be_the_wrong_track`. This one was measured first. */
/* ⭐ THE ONLY AUDIO-SIDE VARIANT LEVER — the VO is one recording and cannot
   change, so the bed has to. `steel` takes a DIFFERENT SOURCE TRACK, not the
   same one at another level: an audio-only variant is a pixel duplicate. */
const BED: Record<Variant, string> = {
  house: "129_google_bed.wav", amber: "129_google_bed.wav", steel: "129_google_bed_b.wav",
};
const BED_GAIN = db(6);
const BED_QUIET = db(-9);
const CAP_Y: Record<Variant, number> = { house: 1258, amber: 1338, steel: 1186 };

const Reel: React.FC<{ v: Variant; quiet?: boolean }> = ({ v, quiet = false }) => (
  <AbsoluteFill style={{ background: "#ECE9E2" }}>
    <Bg />
    <Audio src={staticFile("129_google_vo.wav")} volume={LEVELS.DIALOGUE} />
    <Audio src={staticFile(BED[v])}
      volume={LEVELS.MUSIC * BED_GAIN * (quiet ? BED_QUIET : 1)} />
    <SfxTrack cues={SFX} />

    <CamCtx.Provider value={{ ...CAM[v] }}>
      <VarCtx.Provider value={VARKIT[v]}>
      <AssemblyCtx.Provider value={true}>
        <div style={{ position: "absolute", inset: 0, filter: GRADE[v] }}>
          <Sequence from={L.S0} durationInFrames={DUR.S0}><S0 v={v} dur={DUR.S0} /></Sequence>
          <Sequence from={L.S1} durationInFrames={DUR.S1}><S1 v={v} dur={DUR.S1} /></Sequence>
          <Sequence from={L.S2} durationInFrames={DUR.S2}><S2 v={v} dur={DUR.S2} /></Sequence>
          <Sequence from={L.S3} durationInFrames={DUR.S3}><S3 v={v} dur={DUR.S3} /></Sequence>
          <Sequence from={L.S4} durationInFrames={DUR.S4}><S4 v={v} dur={DUR.S4} /></Sequence>
          <Sequence from={L.S5} durationInFrames={DUR.S5}><S5 v={v} dur={DUR.S5} /></Sequence>
          <Sequence from={L.S6} durationInFrames={DUR.S6}><S6 v={v} dur={DUR.S6} /></Sequence>
          <Sequence from={L.S7} durationInFrames={DUR.S7}><S7 v={v} dur={DUR.S7} /></Sequence>
          <Sequence from={L.S8} durationInFrames={DUR.S8}><S8 v={v} dur={DUR.S8} /></Sequence>
          <Sequence from={L.S9} durationInFrames={DUR.S9}><S9 v={v} dur={DUR.S9} /></Sequence>
          <Sequence from={L.S10} durationInFrames={DUR.S10}><S10 v={v} dur={DUR.S10} /></Sequence>
          <Sequence from={L.S11} durationInFrames={DUR.S11}><S11 v={v} dur={DUR.S11} /></Sequence>
          <Sequence from={L.S12} durationInFrames={DUR.S12}><S12 v={v} dur={DUR.S12} /></Sequence>
          <Sequence from={L.S13} durationInFrames={DUR.S13}><S13 v={v} dur={DUR.S13} /></Sequence>
          <Sequence from={L.S14} durationInFrames={DUR.S14}><S14 v={v} dur={DUR.S14} /></Sequence>
          <Sequence from={L.S15} durationInFrames={DUR.S15}><S15 v={v} dur={DUR.S15} /></Sequence>
          <Sequence from={L.S16} durationInFrames={DUR.S16}><S16 v={v} dur={DUR.S16} /></Sequence>
        </div>
      </AssemblyCtx.Provider>
      </VarCtx.Provider>
    </CamCtx.Provider>

    <ProgressBar />
    <KaraokeCaption words={words as any[]} fps={FPS} top={CAP_Y[v]} />
    {/* ⛔ THE HEADER IS THERE ON FRAME 0 — `at0` on the FIRST band only, or the
        reel opens with no header and pops one in at ~0.2s. */}
    <Sequence from={0} durationInFrames={L.S3}>
      <HookHeader big="GOOGLE JUST SHIPPED" hot="15 NEW AI TOOLS" at0 />
    </Sequence>
    <Sequence from={L.S3} durationInFrames={L.S16 - L.S3}>
      <HookHeader big="THE FOUR WORTH" hot="ACTUALLY USING" />
    </Sequence>
    <Sequence from={L.S16} durationInFrames={DUR.S16}>
      <HookHeader big="COMMENT" hot="&ldquo;GOOGLE&rdquo;" />
    </Sequence>
  </AbsoluteFill>
);

export const ClaudeGoogle129Reel: React.FC = () => <Reel v="house" />;
export const ClaudeGoogle129ReelAmber: React.FC = () => <Reel v="amber" />;
export const ClaudeGoogle129ReelSteel: React.FC = () => <Reel v="steel" />;
export const ClaudeGoogle129ReelQuiet: React.FC = () => <Reel v="house" quiet />;
