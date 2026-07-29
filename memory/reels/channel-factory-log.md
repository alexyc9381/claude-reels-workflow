# Reel 64 CHANNEL - factory log

**Opened 2026-07-18 at Stage 0.** Keyword CHANNEL. Alex recorded the VO first, so PHASE A (premise) was his
call; my work starts at the VO edit. Repo: `alexyc9381/claude-reels-workflow` (the workflow he named).

## Source
`~/Downloads/CHANNEL.m4a` - 97.10s RAW, multi-take, with Alex's spoken "cut cut" edit markers.

## Stage 1 - THE VO EDIT (done)
**97.10s -> 44.13s.** Cut 53s of dead takes and dead air.

⛔ **My first splice silently left 4 "cut" markers in the audio.** Caught ONLY by re-transcribing the spliced
result instead of trusting the splice. Cause: the `base` whisper model COLLAPSED takes - a 3-second-long word
`'why'` was whisper spanning three separate attempts it never transcribed. Re-running at `small` exposed them.
⭐ **RULE: transcribe the RESULT, never trust the cut.** And for multi-take VO, `base` is not good enough.

⭐ **The accurate transcript revealed two spoken INSTRUCTIONS I had first misread as dialogue:**
- *"cut cut, cut out the part that says 'channels like economics explained'"*
- *"cut cut, cut out the part where it says 'in the right niche, YouTube pays'"*
Acting on the first DROPPED the Economics Explained line entirely (his only take was a false start). That
turned out to remove the single most checkable falsehood in the script - see Stage 2.

**Pacing:** the VO was TOO FAST, not too slow - 4.84 wps vs the CLONE anchor 3.96, and the densest 5s window
landed exactly on the key number. Applied the standing rule (*"let R1 pull the tempo DOWN - tight is not fast"*):
0.95 tempo + breathing beats at sentence ends. Result 4.35 wps overall. Hook 4.30 vs the 4.0 target - I stopped
there deliberately rather than padding his natural delivery into something chopped. Reported, not called a pass.
Normalised to -3 dBFS (was -0.18, no headroom for music/SFX). Lead-in 29ms.

## ⛔ Stage 2 - CLAIMS FACT-CHECK: 3 FATAL, 3 MAJOR. All six MISLEADING.
12 agents, 6 researched + 6 adversarial refuters. Verified against YouTube's own policy page, fetched live.

1. ⛔ **"$15 to $25 for every 1,000 views" is CPM, not RPM.** CPM is what the ADVERTISER pays; YouTube keeps
   45% and only ~half of views serve an ad. Real creator RPM in finance/business is **$5-12**. The VO's phrasing
   ("YouTube *pays*... for every thousand views") is RPM framing, so it overstated take-home 2-3x.
2. ⛔ **YouTube's monetization policy describes this exact pipeline as non-monetizable.** Verbatim from
   support.google.com/youtube/answer/1311392: *"AI-generated content made with generic or unoriginal templates"*
   giving *"the impression of mass production without adding the creator's original, authentic insights or
   perspective."* A ~13 Jul 2026 clarification adds **AI personas on sensitive topics** (financial/investment
   advice) as non-monetizable - i.e. exactly the high-RPM niches the reel steered toward. **Jan 2026: YouTube
   TERMINATED 16 automated faceless channels** (35M subs, 4.7B views, ~$10M/yr).
   ⭐ BUT: AI is NOT banned. Rene Ritchie (YouTube) on record that AI-assisted content stays eligible. Faceless
   is fine. The load-bearing clause is *original insight from you* - which "while you do nothing" removes.
3. ⛔ **Economics Explained is a human.** Michael Burnand, Australian economist, narrating in his own voice with
   original research, on a media network, with a podcast and a CuriosityStream documentary. "Never even talk"
   is false about a named real business and checkable in ten seconds. **Already removed at Stage 1.**
4. **$20-30k/mo is real but the arithmetic is brutal.** Fortune (30 Dec 2025) reviewed Adavia Davis's actual
   AdSense payout records: $40-60k/mo - but at ~2M views/DAY (~$0.82 RPM), ~2 hrs/day, and $6,500/mo in salaries.
   ⭐ His stack is literally **Claude + ElevenLabs**. That is the honest hero proof and it is on-brand.

**Alex's call: SURGICAL CUT, no re-record.** Removed the "$15 to $25" clause and "so the video builds itself
while you do nothing" - both cut cleanly in silence. Final VO 44.10s, verified free of all three.
⚠️ "$20-30k/month" and "10 minutes a day" remain (his choice; the band is defensible via Fortune, though the
arithmetic implies a top-fraction-of-a-percent channel and Fortune reports ~2 hrs/day, not 10 minutes).

**On-screen: Alex is adding real earnings screenshots himself later.** ⛔ I build NO earnings visual: no
Analytics/AdSense mock, no Social Blade (its own method spans $0.25-$4.00 RPM and assumes every view is
monetized; the same channel reads $2.9k vs $22.4k vs $55.5k across three tools), no fabricated record.

## ⛔ Stage 3 - I CLOBBERED REEL 28'S ASSETS
Naming my files after the KEYWORD overwrote **reel 28 CHANNEL** (`ClaudeChannelReel.tsx`, shipped 2026-07-05):
- `src/data/words_channel.json` - restored from git (168 entries, needs a `line` key mine lacked).
- `public/vo_channel.wav` - **`public/` is gitignored (`*.wav`), so NO git backup.** Restored best-effort by
  extracting audio from the shipped `28_Claude-faceless-channel.mp4` (48.06s vs the reel's 47.2s expectation).
  ⚠️ **That restore is the MIXED track, not the clean VO** - a re-render of reel 28 would double its music.
My assets renamed `Claude64ChannelReel.tsx` / `words_64channel.json` / `vo_64channel.wav`.
⭐ The tell was a render error in a file I had never touched. Full rule: [[reel-asset-name-collisions]].

## Stage 4 - BUILD
Chassis cloned from `Claude59CarouselReel.tsx` (164KB chrome preserved, 507KB of carousel scene bodies replaced).
`L = [0, 7.76, 9.92, 14.28, 15.58, 17.34, 22.36, 26.24, 33.12, 40.48]`, `CUT = 44.10`, 1323 frames.
Header: "A YOUTUBE CHANNEL / THAT RUNS ITSELF." GATE C passed (wireframe compiles + renders + captions land).
World: **THE NIGHT SHIFT** - a broadcast station that keeps transmitting after everyone goes home; the studio
is empty and the work still gets done. Ten scenes out to a coder fan-out.

## Stage 5 - SCENES + SOUND + SHIP (2026-07-18)

**10 scene coders, THE NIGHT SHIFT world.** 9/10 returned clean source. C4 returned a FILE PATH instead of code
(schema misread) - re-run as a single agent, then asked it to Write the source to disk rather than pass 27KB
through chat. ⭐ For large generated components, have the agent WRITE THE FILE; transcription through the
conversation is a needless corruption risk.

**Two mechanical bugs caught by rendering, not by reading:**
1. `durationInFrames` stayed at the CAROUSEL's **887** when I cloned the Root.tsx block - the reel is 1323.
   Symptom was `RangeError: Cannot use frame 900`. Anything past 29.5s simply did not exist.
2. The journal's per-agent field is **`result`**, not `value` - my first extraction found 0 of 10 bodies and
   reported them all MISSING. Inspect the journal's actual keys before concluding a fan-out returned nothing.

**SOUND: 66 cues, written with ROOT offsets from the start** (`L[i] + local`), per [[sfx-root-timeline-trap]] -
these bodies are NOT Sequence-wrapped, confirmed by grep before writing a single cue. Verified every cue
computes into its own scene window. Density 0.90-3.08 onsets/s, C4 (the turn) correctly the densest at 3.08.
Risers capped at 2 (C1 hook, C8 dawn). Max cue volume 0.42. Hero hit at the turn is 3-deep
(impact + lib_boom + thock on one `at`).

**EXPORT GATE applied** (the rule from the CAROUSEL preview failure): yuv420p/tv, faststart, 42.7ms AAC priming
stripped -> **lead-in 2ms**, peak -5.92 dB, 0 clipped. 44.12s, 24.0MB.

**Delivered:** `Claude Reels/64 - CHANNEL/64_Claude-youtube-channel.mp4` + `Claude-Reels-Final/`.
⛔ Reel 28's folder verified untouched.

## Open for Alex
- **Earnings screenshots** - he is adding real ones himself. No slot is reserved; drop them over C1 or C9.
  ⛔ Do NOT use Social Blade (its own method spans $0.25-$4.00 RPM and assumes every view is monetized;
  the same channel reads $2.9k / $22.4k / $55.5k across three tools). The Fortune Dec-2025 piece on Adavia
  Davis is the one journalist-verified source and its stack is literally Claude + ElevenLabs.
- **Still in the VO by his choice:** "$20-30k a month" (defensible via Fortune, but that is ~2M views/day)
  and "10 minutes a day" (Fortune reports ~2 hrs/day plus $6,500/mo in salaried staff).
- **The demonetization risk is NOT in the reel.** The guide must carry it: YouTube does not monetize content
  that reads as mass-produced with no original insight. This is the single most important thing the .docx says.
- **docx + caption not built yet.**
- ⚠️ `vo_channel.wav` for reel 28 is the MIXED restore, not its clean VO.

## Stage 6 - GATE D (motion) + SHIP COMPLETE (2026-07-18)

⭐ **I MEASURED THE REEL INSTEAD OF LOOKING AT IT, AND THE TWO MOST IMPORTANT SCENES FAILED.**
`motion_audit`: crop to the PANEL, 10fps, mean abs frame delta per second. Ship bar 4.0.
- **C1 HOOK measured 1.71** - the worst thing in the reel, over its longest window (7.8s), and it is the
  scroll-stop. A beautiful STILL LIFE, which is exactly the failure.
- **C9 HONESTY measured 2.27** - the longest scene and the trust beat; its crossing-off marks are a few
  pixels each so the passage of time did not register at all.
- The other eight scored 5.1 to 14.8, so this was not a global problem, it was these two.

Rebuilt both with an explicit brief: **small motion measures ZERO** (dust, LEDs, particles, a 1.6% push,
a mascot bob). What registers is **~40,000px² travelling >=6px/frame, present at EVERY second.**
⭐ Both agents MEASURED their own result rather than estimating, and each was asked to name, second by
second, the large object travelling and how fast. That requirement is what made the fix land first try.

**Verified independently with my own instrument (their numbers were slightly optimistic):**
| scene | was | agent claimed | I measured | weakest sec |
|---|---|---|---|---|
| C1 HOOK | 1.71 | 6.18 | **5.18** | 4.30 |
| C9 HONESTY | 2.27 | 13.06 | **13.28** | 10.38 |
Reel median 3.16 -> **4.10**.
⚠️ C8 LOOP mean 5.19 passes but has one 1.69s bucket at the night->dawn handover. Left deliberately:
several scenes dip similarly (C6 2.14, C10 2.78) and a beat of stillness before dawn is dramatically right.

⛔ **HAZARD FOUND: the motion agents spliced into the SHARED project file to render-test, concurrently.**
One reported the other's edits appearing mid-run. Both restored correctly, but I verified rather than
trusted: 10 unique bodies, no duplicates, every body within 1 byte of expected, and the file's +6,801 byte
delta traced to MY OWN Sfx block (6,812 bytes). **When fanning out render-testing agents, expect them to
touch the real file; diff every body before splicing.**

## SHIPPED
`Claude Reels/64 - CHANNEL/` (all three cloud-verified, byte sizes match local):
- `64_Claude-youtube-channel.mp4` 31,364,913 (44.12s, yuv420p/tv, faststart, lead-in 2ms, peak -5.92dB, 0 clipped)
- `CHANNEL - The Night Shift.docx` 16,305 (135 paras / 9 tables / 0 em-dashes)
- `CHANNEL_caption.txt` 3,270 (all 6 caption gates pass)
Flat copies in `~/Downloads/Claude-Reels-Final/`. ⛔ Reel 28's folder verified untouched.

⭐ **The guide leads with the POLICY, not the prompts** - because the reel's own honesty beat does not carry
the demonetization risk, and everyone who comments CHANNEL is about to automate uploads. The best single
idea in it: the project-instructions prompt ends every script with a **YOUR TAKE** section (three places
needing an opinion only the user can give). That converts YouTube's "original, authentic insight" clause
from a warning into a step you cannot skip without noticing.
