---
name: sharp-reel
description: "Reel 23 SHARP — the 30-second '3 Fable 5 mistakes' reel (2nd Fable 5 reel) + its build/comp details"
metadata:
  node_type: memory
  type: project
  originSessionId: 18338ca5-bbdb-4b71-8530-25a9d4d4baa5
---

Reel 23 = **SHARP**, a 30-second-max "3 Fable 5 mistakes" reel (Alex asked for a 2nd trending Fable 5 reel, then specifically "3 mistakes, under 30s"). Distinct from [[fable-reel]] (reel 22, the "4 fixes" how-to) by using FRESH tips + a mistakes/curiosity frame. Comp `ClaudeSharpReel` in `src/ClaudeSharpReel.tsx`, durationInFrames 835 (~27.9s, 30fps), registered in Root.tsx. Delivered `23_Claude-fable5-mistakes.mp4` to Final + Drive/Claude Reels + Photos.

**Hook (Alex's exact words, he overrode my honesty flag):** "You're making these three mistakes with Fable 5, and the third one makes your outputs 90% worse." The "90%" is an INVENTED stat (Anthropic's real wording = "can degrade output quality"); I flagged it, he kept it. On-screen shows "#3 makes it 90% worse" + a "-90%" quality-drop. If a caption/screenshot gets scrutinized, that's the one line to hedge.

**The 3 mistakes (fresh, chosen to NOT repeat reel 22's effort/verify/goal set):**
1. No example → paste one sample of what good looks like, it matches it.
2. It rambles → tell it to lead with the answer first, replies get sharper.
3. (peak) Over-instructing → a long step-by-step prompt boxes it in and drags quality down; give it the goal, not the script (this IS the "90% worse" one, and it's the real documented "prescriptive prompts can degrade output quality" mechanism). CTA keyword **SHARP** (FABLE/MARATHON/LEAK were prior-script keywords).

**Scene map (L, sec) = [0, 5.76, 10.52, 15.14, 25.22]** (hook, M1, M2, M3, CTA). M3 is the long one (15.1 to 25.2) with mistake→fix inside it (cage clamps + quality bar drops to -90% red, then step-list collapses into a "Goal / Done when" card + quality bar recovers green at fixT ~ lf 8.64s).

**Build reused the proven infra:** cream + navy `Stage` panel, `ProgressBar` with 3 milestone nodes (#3 amber-teased) + the gold finish-line reward seal ([[reel-progress-bar-reward]]), the IG safe-zone `translateY(90px)` shift + progress bar y272 ([[reel-ig-feed-safezone]]), word-synced instant `Captions` at y1206 (+90). Each mistake is a LITERAL centered UI card with a before→after motion (the "literal reads instantly" lesson from [[fable-reel]] v7). CTA = ClaudeMark + big clay SHARP pill + reward seal.

**VO pipeline (this take):** "Untitled - 7:3:26, 12.39 AM.m4a", clean single take (no cut-cuts), 32.5s raw. silenceremove stop_duration=0.55 (keeps beat-pauses; 0.32 was too tight/choppy at 23s), NO atempo (natural pace) → 27.7s, standard polish chain, re-transcribed → `words_sharp.json`. **Caption gotcha fixed:** whisper split "90%"→"90"/"%" and "step-by-step"→"step"/"-by"/"-step"; added a `cw` pre-merge that folds any token starting with %/-/punct into the previous word before line-grouping. Always do this for captions.

**Lead magnet (not built yet):** "3 lines that make Fable 5 sharper" = the one-example prompt, the lead-with-the-answer line, the goal-not-a-script template. CTA = comment SHARP.

**v2 revisions (Alex feedback):** (1) CTA upgraded to a premium payoff = a floating "Your 3 fixes" gift card + celebration sparkle burst + shine-swept SHARP pill + "and I'll DM it to you" (old ClaudeMark+plain-pill CTA was "not good enough"). (2) End-of-bar reward = a 🎁 GIFT emoji (teased grey/dim → unlocks bright + sparkle at CTA), NOT a plain gold ✓ (he wanted "money bag / reward / achievement"). (3) Added a mid-bar gold ★ star node at 77% to fill the big empty gap between mistake-node 3 (~54%) and the finish gift. (4) Captions are now ALL ORANGE (revealed=CLAY, active=deeper #B8501F) — he hated the orange+black two-tone I'd used. (5) Hook header "3 mistakes with Fable 5" moved down (top 330→388) so it stops covering the red/amber/green console dots at the stage top-left. (6) M1 (No example) made dynamic: a gold SCAN BEAM sweeps L→R + output lines SNAP into a match staggered (red ✗ → amber → green ✓) + trailing sparkles + copy chevrons (was a boring linear morph). (7) M2 (rambles) made dynamic: 7 lines pile up fast with a climbing red "340 words" counter, then SNAP-collapse (back-ease) as the green "The answer, first" banner launches up from below + "details after" (was a boring static rise). **Emoji (🎁, ⭐, ★) render fine in Remotion headless Chrome.** Redelivered v2.

**v3 (Alex: "use a real Fable logo/screen recording at the beginning so it's recognizable"):** Opened the hook on the REAL Anthropic "Introducing Claude Fable 5" release video card (reused `public/fable/fable_video.jpg` butterflies + a `VideoCard` player frame: play button, red scrubber, Claude mark + "Introducing Claude Fable 5 · Anthropic" bar) as an establishing shot, FULL from frame 0 (recognizable), timed to the VO "...mistakes with Fable 5" (0 to ~2.2s), then it shrinks up + fades (`vs = ramp(lf, fr(2.2), fr(2.9))`) as the "3 mistakes" header/tag/split-cards fade in. Needed `Img` import. STANDING: reuse `fable/fable_video.jpg` + this VideoCard to make any Fable 5 reel instantly recognizable. Redelivered v3.

**v5 (Alex CTA feedback):** (1) CTA no longer on the navy "black screen" — the `<Stage/>` navy panel now FADES OUT over `[Lf[4]-4, Lf[4]+6]` so the CTA sits on the light cream editorial Bg. (2) "Comment" recolored INK→SLATE (blue). (3) "Your 3 fixes" gift card was cramped (fixed height 210 overflowed, last checkmark jammed at the bottom) → removed the fixed height, let it size to content with real padding "34px 36px 38px", title mb 28, rows mb 24 (last row 0), whiter card (#FFFDF8) so it pops on cream. Also: the import-to-photos bug got fixed this session (see [[social-assets-to-camera-roll]] — zsh + DIR-then-ALBUM). Redelivered v5.

**v6 (Alex: CTA "too low, move higher" + "make the visual like a full guide, really appealing"):** (1) Raised the whole CTA block: AbsoluteFill now justifyContent flex-start + paddingTop 322 (center moved ~270px higher, from ~y1050 to ~y783). (2) Replaced the blank-bars "Your 3 fixes" card with a real GUIDE COVER = a clay "FREE GUIDE" badge + 🎁, fraunces title "The Fable 5 Guide", subtitle "3 fixes for sharper answers", a gold divider, and the 3 REAL fix titles with green checks ("Give it an example", "Lead with the answer", "Skip the step-by-step"), plus 2 offset/rotated stacked pages behind it for multi-page depth. Reads as an actual lead-magnet PDF cover. Verified clear of IG top(250)/bottom(1580) safe zones. Redelivered v6.
