---
name: posts-factory-log
description: "reel 66 POSTS factory log — sell social posts to local businesses with a Claude carousel workflow ($20/post, 50 posts = $1,000/mo). Alex-VO, arrived PRE-LOCKED so Stages 0-4 never ran. First pass built 2026-07-18."
metadata: 
  node_type: memory
  type: project
  originSessionId: 059ffc3c-ed11-44e9-bd3a-cf1c3bce2224
---

# POSTS (reel 66) — factory log

⚠️ **NOT A GATED SHIP.** The script arrived as a finished Alex voice recording (`~/Downloads/POSTS.m4a`,
2:04 raw). Stages 0-4 (source → kill-gate → structure → adversarial gate) **never ran** — same situation as
reel 65 TOOL. Do NOT count this in the gate-calibration set. What follows is the BUILD record only.

## STAGE 5 — VO (the part that was real work)

Raw: 2:04.13, 44.1kHz stereo m4a, **11 "cut cut" retakes** across 9 sentences.

Method ([[video-editing-toolchain]] CUT-CUT + [[alex-vo-recordings]] multi-take splice):
1. Full whisper pass (`ggml-small.en`) → mapped every take.
2. **Isolate-transcribed all 14 boundaries** (`-ss A -t D` → whisper `-nt`) — the full-file pass alone is not
   trustworthy around flubs.
3. Fine 20ms RMS energy map (`-34dB` threshold) to snap every cut into real silence.
4. 13 keep-segments extracted from the 48kHz wav with 8ms boundary fades, concatenated with 0.16s gaps.
5. `loudnorm=I=-16:TP=-2:LRA=12:linear=true` — **level only, ZERO tonal processing** (his standing rule).
6. Gap-cap: any silence >0.33s reduced to 0.24s (7 runs, worst was a **0.94s** mid-sentence hesitation after
   "companies that don't want"). Recovered 1.34s.
7. `atempo=1.04` (Alex specified 1.04x), out at **48000 Hz mono s16**.
8. **Verified**: re-transcribed the finished wav → **zero "cut" markers, zero duplicate lines**, reads exactly
   as the intended script.

Final: `public/vo_66posts.wav`, **51.66s**.

### The keep table (raw m4a seconds)
| # | in | out | line |
|---|------|------|------|
| 1 | 0.700 | 12.850 | hook + problem |
| 2 | 26.190 | 28.270 | "Here's how you make the posts with Claude in under one minute." (take 5 of 5) |
| 3 | 30.890 | 32.780 | "One, pick one industry and stay there." |
| 4 | 36.390 | 38.390 | the industry list (take 2) |
| 5 | 53.830 | 58.790 | "One industry means one style..." (take 4 of 4) |
| 6 | 65.710 | 74.150 | step 2 (take 2) |
| 7 | 75.890 | 78.270 | step 3 + $20 |
| 8 | 81.450 | 83.850 | "nobody argues with" |
| 9 | 86.130 | 89.050 | the $1,000 math (take 2) |
| 10 | 91.730 | 94.210 | retainers |
| 11 | 98.790 | 101.910 | the twist |
| 12 | 112.290 | 116.810 | the grind + referrals (take 4 of 4) |
| 13 | 118.150 | 121.930 | CTA |

⭐ **Reusable lesson — the retake is not always the whole sentence.** On the S4 list he kept "One, pick one
industry and stay there." from take 1 and only re-recorded the four-item list. A naive "cut back to the last
sentence boundary" would have deleted a good clause. Map takes at CLAUSE level, not sentence level.

## STAGE 5b — captions
`src/data/words_66posts.json`, 242 words. Built with the align-to-script method ([[caption-sync-gate]]):
canonical script = source of truth for the WORDS, whisper = timing only, `difflib` alignment, then per-line
constant offset anchored to a **measured RISING EDGE** (a ≥-34dB window whose two predecessors are <-40dB),
0.10s global lead.

⭐ **Reusable lesson — a naive onset detector reads the PREVIOUS line's tail.** v1 searched forward from
`t0-0.25` for the first loud window and returned ~0.24s early on 8 of 15 lines (all pinned at the clamp — that
uniformity was the tell). Two fixes: require a genuine quiet→loud **rising edge**, and narrow the search to
±0.15s so a hit outside that window is treated as "no gap, carry the previous line's delta." Final deltas all
≤0.12s.

## L[] (measured, locked)
```
const L = [0.0, 5.57, 11.12, 13.17, 17.20, 22.12, 25.00, 28.56, 30.27, 32.73, 35.10, 38.05, 40.59, 43.58, 48.04];
const CUT = 51.92;
```
15 scenes, ~3.0s average — inside the "new beat every 1.2-1.5s / scene ≤3.5s" band.

## Soundtrack
"Every Living Breathing Moment" → `public/66_elbm.wav` (⚠️ number-prefixed per
[[reel-asset-name-collisions]]; reel 62's cut is `62_elbm.wav` and must not be clobbered).
Alex: *"the song actually starts at zero seconds for the person"* → pre-trimmed from **4.42s**, the track's
first strong downbeat, so frame 0 opens on audible music (**-13.7dB mean / -1.0dB peak in the first 0.5s**),
not on the mp3's 4s fade-in from -56dB.

⭐ **Reusable lesson — measure the SONG's build with a 6s window, not 2s.** This track is sparse and rhythmic
early, so a 2s RMS window aliases against the beat (-17/-32/-31/-21/-30 dB on consecutive windows) and an
inverse-gain envelope built on it PUMPS. A 6s structural window follows the arrangement instead: raw song
swing **22.7dB → 5.0dB** effective after shaping, gains 0.12-0.40, pinned ~12dB under the VO, plus a light
VO-sidechain (×0.74 on speech) and the standing CTA duck (×0.70 from L[14]). See [[music-duck-song-build]].

## The number spine
$30,000/mo · $20 a post · 50 posts/mo · $1,000/mo · 1 hour a week · 3 first clients · under 1 minute.
Keyword **POSTS**. Lead magnet = the carousel workflow (already in bio) + "the exact pitch that gets the yes".

## Chassis
Cloned from `ClaudeSimulateReel.tsx` (reel 65, the cinematic-legup reel) per
[[reel-clone-chassis-verbatim]] — chrome byte-identical: `Bg`, `Panel` (34/34/384/792), `Mascot`, `Actor`,
`Sfx`, `ScreenHead`, `ProgressBar`, `Captions`, the prop library. ONE panel, never dual-screen
([[reel-never-dual-screen]]).

## Stage 6 — storyboard
Designed by a 69-agent workflow (4 arc concepts → judge → 3 lenses × 15 scenes → picker → 3 adversarial
critics → board). Board at `claude-reels-workflow/storyboards/66-posts.md` (969 lines).
Arc = **MAPLE ST · The Three Empty Slots**: one golden-hour block of local shops, camera walking it strictly
left→right so the camera's x-position IS the progress bar. Open loop planted physically in S1 (a shuttered
door with a brass plaque holding THREE EMPTY SLOTS), kept alive by a 7-frame un-glinted sighting in S5,
re-armed in S13, paid off in S14 — the three slots were always the first three clients.

⭐ **Reusable lesson — a long board can be written in PASSES and a concurrent append will interleave.** The
board agent wrote S1-S4, I read the file at 317 lines and assumed it was finished, generated the missing
cards from the JSON specs and appended them — then the agent wrote S5-S15 into the same file. Result: 26
`### S` headings, my 11 duplicates buried mid-file. Check whether the writer is still running before
"completing" its output.

⭐ **Reusable lesson — always recover the per-agent results from `journal.jsonl`.** The board file was
truncated when I first read it, but all 15 merged scene specs were sitting in the workflow journal as
`{"type":"result"}` lines. Extracting them is what let the build fan-out start immediately.

## Stage 7 — build
15 scene bodies authored + audited by a 30-agent workflow (~15,200 lines), assembled with the chassis
chrome into `src/Claude66PostsReel.tsx` (17,677 lines), registered at `durationInFrames={1558}`.

⛔ **`Easing.quint` and `Easing.quart` DO NOT EXIST in Remotion** and this broke the first render. Valid:
linear, ease, quad, cubic, poly(n), sin, circle, exp, elastic, back, bounce, bezier, in, out, inOut.
`Easing.poly(5)` / `Easing.poly(4)` are the exact substitutes. Two independent agents generated `quint`
unprompted, so put this in the build contract for every future scene fan-out.

### v1 ship-gate results
- **Caption sync: PASS.** 16/16 sampled words (incl. mid-line + post-pause) were on screen and ACTIVE at
  their measured onset.
- **Motion: PASS.** Panel-cropped 10fps audit — median 14.82 (bar 4.0, a static frame measures ~2.1).
  Exactly ONE dead bucket: t=7s in S2 at 2.40.
- **Audio: PASS.** Music audible from frame 0 (-17.1dB mean / -3.6 peak in the first 0.5s). Music fills VO
  gaps (-26 to -29dB) and sits well under speech. ⚠️ NOTE: the rendered mix measures ~3dB below the raw VO
  wav — that is a **mono→stereo measurement artifact**, not gain loss; don't "fix" it.
- **Visual: 5 FAILS** found by inspecting real rendered frames per scene at 30%/72%:
  S2 measured dead air · S5 empty quadrant + flat wall · S8 hero blurred unreadable ·
  S9 the hero number `$20` blurred unreadable · S10 flat pale wash, facade palette lock ignored ·
  S11 washed-out + hero too small.

⭐ **Reusable lesson — heavy depth-of-field blur on the HERO is the new recurring first-pass failure.**
Three scenes (S7/S8/S9) blurred the hero object to sell depth. Depth comes from blurring the FOREGROUND and
FAR planes against a SHARP hero, never the reverse. On a 1.7s scene there is no time for focus to resolve.

### v2 — the six defects repaired, re-gated
Fixed by a 5-agent workflow + one rebuild agent. Two of the six were misdiagnosed by me and the agents
found the real cause, which is the useful part:
- **S2 dead air was NOT a missing mover — it was an OCCLUDED one.** The delivery van was authored on the
  far-city plane at world y308, and the four facades span x-140..1152 continuously from y~200 down, so it
  was **100% hidden for its entire 36-frame pass**. An earlier audit pass had "fixed" the bucket by adding
  a blurred cloud gradient, which contributes ~0.07 to a mean-frame-delta metric — mathematically invisible.
  ⭐ **A mover you can't see is not a mover. Check the z-order and the occluders, not just the px²/frame.**
- **S8's "blur" was not a blur at all.** The hero had no filter on it. It was three things compounding:
  camZ peaked at 2.70 (the blade tips fell outside the visible window), both blades landed at exactly 0°
  (two coincident slabs reading as one bar), and a 0.85-white glint sat on that bar at the cut frame.
  ⭐ **"Looks blurry" can mean over-magnified + coincident geometry + blown highlight.** Check the camera
  and the silhouette before reaching for the filter.

**v2 gate: motion 0 dead buckets** (median 15.04, was 1 dead @2.40) · all six scenes visually confirmed on
re-rendered frames · caption sync unchanged · music still opens at -17.2dB mean / -3.7 peak in the first
0.5s.

⚠️ **Delivered with ~72ms of AAC priming silence at the head** (reel 65 shipped with 54ms). Do NOT strip it
— [[caption-sync-gate]] is explicit that an `atrim=start=0.0427` shifts the VO ~43ms against the baked-in
captions. The music covers it; the viewer hears the song from frame 0 regardless.

**First pass = WIREFRAME by definition** ([[reel-overhaul-stage]]) — the full Gate A / Gate B overhaul has
NOT been run; only the six measured/observed defects above were fixed.

## v3 REJECTED — "too chaotic, I can't see what's going on" → the HIERARCHY pass (v4)
Alex on v3: *"the quality of the animation just isn't good... too chaotic. It should be more hierarchical.
Everything's moving way too fast as I'm speaking, I can't even see what's going on... too much stuff
moving around."* He also called the HOOK boring, twice, and flagged the claw machine's animation quality.

**I caused this by optimising the wrong metric.** I chased [[reel-dead-air-motion-audit]] (mean |frame
delta| ≥4/bucket) to a median of 15.3 with zero dead buckets — and the reel was unwatchable. That metric
scores ONE big legible hero and EIGHT jittering things IDENTICALLY, so "no dead air" got satisfied by
corgis, pigeons, vans, crowds and 5-6 shots per scene. Wrote `tools/chaos_audit.py` (6×6 grid, per-second
top-cell share of total change) to measure what was actually wrong: **3.5-7.5% top-cell share in 51 of 51
buckets**, against 2.8% for a perfectly uniform smear. Motion was spread evenly over the whole panel for
the entire reel. Full rule + gate: [[reel-motion-hierarchy]].

⭐ **Deepest cause: a continuously moving camera destroys hierarchy by construction.** [[reel-cinematic-legup]]
asks for a camera move per scene + 4-6 parallax planes; taken as a CONTINUOUS move, every pixel changes
every frame so no region can dominate. Reconciled as: cut on movement, hold on stillness.

⭐ **The hook's real fault, from a 10-frame strip:** chalkboard "$30,000" → a big brown satchel → the SAME
"$30,000" on brass. Monochrome brown for 4 of 5.5s, frames at 0.2s and 0.8s near-identical (opened
STATIC), the interesting action staged tiny BEHIND an inert hero, and **the payoff restated the setup
instead of exceeding it**. Rebuilt as "one person runs the whole street": one shop's IG grid filling →
one pull-back to the whole row → all of it pouring into one still hand, $30,000 landing once, at the end.

## v5 REJECTED — "not polished, hard to tell what's happening" → the CRAFT rebuild (v6)
Alex on v5: *"Each scene is just hard to see what's going on... visually it's just hard to tell what's even
happening because each of the animation components are just not polished at all."*

Different failure from v3's chaos — this one is CRAFT. Full rule: [[reel-draw-dont-stack]].

⛔ **My review method hid it for five versions.** I judged every render from contact sheets scaled to
~300px wide. At that size a rough blob still "reads" as a claw machine *because I already knew what it was
meant to be*. Pulling the same frames at NATIVE 1012×792 made it obvious instantly: S4's claw was a thin
grey stick with a small wedge and no visible jaws (read as a pencil on a chain); **S7 was an orange
trapezoid, an orange rectangle, a grey striped block and some white blobs, all brown-on-brown —
genuinely unidentifiable.**

⭐ **Root cause: objects were STACKED from CSS divs, not DRAWN.** Same build, same session, the evidence
splits cleanly: manufactured FACES read fine (phone + IG grid, brass counter, split-flap board, till,
postbox, plaque); anything illustrated or mechanical was mush (claw, plush molar, hopper, satchel,
scissors). And every "premium polish" pass had been *adding* stacked translucent gradients — more layers
made it worse. The polish rules assume the shape is already right; they cannot rescue a wrong shape.

**The fix, proven on S4+S7 and approved by Alex before rollout:** one inline `<svg>` with authored paths
per hero · the SILHOUETTE TEST run flat-black before shading · VALUE separation (hero vs ground must differ
in LIGHTNESS, not hue) · four values per object (base + one shade + one highlight + contact shadow) · one
stated light direction · one projection · delete anything unnameable.

⭐ Two silhouette findings worth reusing: closed claw jaws that trace a continuous arc read as a
**horseshoe magnet** — split the pivots and taper the jaw so dark negative space opens between finger and
prize, because *that gap is what sells the grip*. And a molar's roots must **splay**; parallel stubs read
as legs. Both took 3-4 look-at-native-size rounds to find — one look is never enough.

## Delivered
Drive subfolder **`My Drive/Claude Reels/66 - POSTS/`** (the per-reel folder pattern) with all three:
- `66_Claude-posts-local-business.mp4` (51.99s, faststart, 48kHz stereo)
- `POSTS - The Carousel Agency Setup.docx` — the lead magnet ([[lead-magnet-docs]]). Delivers the CTA's
  two promises: **the carousel workflow** (save-once Claude project = TOKENS + SLIDES array + one template
  fn, 1080×1350, system fonts only, screenshot the slides — grounded in the reel-63 CAROUSEL build) **and
  the exact pitch that gets the yes** (walk-in opener + DM version + the free-first-one close + "ask to see
  their last 10 posts before you quote"). Plus the 3 steps, the $20→$1k retainer math, and an honest note
  that the workflow is the passive part but the first 3 clients are real outreach. Built with
  `build_posts_doc.js` (cloned from `build_simulate_doc.js`, hard DASH GATE). VERIFIED: XML well-formed,
  91 paras / 10 tables, ZERO em/en dashes.
- `POSTS_caption.txt` (agency-framing version, comment-first).

## Pairs with
[[script-factory-pipeline]] · [[reel-clone-chassis-verbatim]] · [[reel-cinematic-legup]] ·
[[caption-sync-gate]] · [[music-duck-song-build]] · [[reel-asset-name-collisions]] ·
[[tool-factory-log]] (the other PRE-LOCKED-VO reel)
