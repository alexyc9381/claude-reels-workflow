---
name: ox119-reel
description: Reel 119 OX — ox-alpha, the anonymous model free until Aug 27; THE BAY, carried by an OX. Nine hook rounds and a 20s dropoff. Three cuts, three hooks, all gates green.
metadata:
  node_type: memory
  type: project
---

# REEL 119 · "OX" — carried by an animal

**Subject:** `ox-alpha`, an anonymous frontier coding model that appeared on OpenRouter on
2026-08-20 and is FREE until 2026-08-27. **Board:** `storyboards/119-ox.md`.
**Code:** `video/src/OxWorld.tsx` · `OxProps.tsx` · `OxSets.tsx` · `OxScenes.tsx` ·
`OxHooks.tsx` · `ClaudeOxReel.tsx` · `ox-119-index.tsx`.
**Delivered:** `Faceless/119 - OX/` — `119_OX.mp4` + `_amber` + `_steel`, E1 encode
(yuv420p / bt709 / tv range / faststart), 28.67s. Article live and gated at
`chenmedialabs.com/guides/the-anonymous-model-that-makes-claude-code-free-until-august-27`.

⭐⭐ **THIS CONCEPT IS PROVEN.** Alex: *"this ox concept is super viral and really good, I
tested it as a trial reel and it went viral."* Treat any future edit of 119 as high-stakes.

## The honesty constraint

The VO says it "beats them on all the coding benchmarks". **Exactly one result exists** —
DeepSWE Pass@1 80 / 65 / 52 — from a **10-task community run**, not an audited leaderboard,
and OpenRouter publishes no scores at all. The picture draws that one named test with a
`COMMUNITY RUN · 10 TASKS` provenance strip and never a wall of benchmarks; all three
captions carry the full correction publicly, because the article's version is behind the
email gate.

## Final state

| cut | hook | mechanism | hook motion | frame-0 luma | median |
|---|---|---|---|---|---|
| unsigned | THE PEN GATE | RELEASE | 15.57 | 156.3 | 12.83 |
| amber | THE CRUSH | DEMOLITION | 14.05 | 143.8 | 14.05 |
| steel | THE PRICE BOARD | COLLAPSE | 15.31 | 153.0 | 14.36 |

`verify_reel` 8/8 on all four cuts (incl. quiet) · look audit 0 fails · 0/11 scenes under
bar on every cut · dHash mean 22.8 / MIN 13.

## What this reel produced, and where it now lives

Every one of these is a standing rule with its own file — read those, not this summary:

- [[cut-must-reveal]] — **a change of framing is a cut whether or not you author one**, and
  a full-frame mass leaving is a change of framing. All three hooks were rebuilt from
  close-then-wide into single 75-frame takes. Also: a cut between two views of the same
  subject must MATCH size and position, or it reads as a glitch.
- [[ease-value-outside-its-window]] — **an ease clamps outside its window**, so a decay is
  at full strength BEFORE it starts and an entrance is FROZEN for ever after it ends. The
  second one was the 20-second dropoff Alex spotted; the scene scored 9.78 and passed while
  being dead for 2.7s. Carries the first-half-vs-second-half scan that finds it.
- [[three-cuts-three-hooks]] — **"the variants aren't different" is answered by three
  HOOKS**, never by more grade/rake/camera. The dHash passed at 22.4 the whole time.
  Also: the SFX list must be per cut once the hooks differ.
- [[box-mascot-rig-limits]] — the Mascot **cannot grip, straddle or reach**; bring the
  mechanism to the arm. Plus the two z-order traps that make correct geometry invisible.

## The rounds, in order (nine on the hook alone)

| round | note | what it cost / taught |
|---|---|---|
| 1 | *"pauses between sections too long"* | ⭐ **TIGHTNESS BEATS R1** — I had widened gaps to 0.55-0.60s to buy the R1 hook window; every gap went to 0.15s |
| 2 | *"the ox doesn't look good"* | it was a box on four sticks. An animal is a SILHOUETTE — brisket, hump, sloping back; horns need SKY between them |
| 3 | *"claude sprites are wayyy too small"* | ⛔ when a reel gains scenery, RE-CHECK THE CAST SCALE — it does not grow with the set (92-140 -> 150-270) |
| 4 | *"none of these ideas are hierarchical"* | **hierarchical = RANKED BY SIZE, and it is countable.** A payoff with 3 oxen + 5 cast + a carrier band = eight subjects in one size band. Rebuilt as three tiers with a job each |
| 5 | *"way too boring, just a big plain card"* | ⛔ I had gamed HOOK_PLATE. Went and read the winning scene's CODE and found it does three things I had copied one of |
| 6 | *"show FREE in some idiom way"* | ⭐⭐ **take the idiom from the world's own verb** — in a stockyard you BRAND cattle. Bright ember on dark hide is also the right side of the contrast |
| 7 | *"it glitches at 1 second"* | the size-match rule, now in [[cut-must-reveal]] |
| 8 | *"why are there two cuts"* | the framing rule, now in [[cut-must-reveal]] |
| 9 | *"massive dropoff at 20 seconds"* | the entrance-freeze, now in [[ease-value-outside-its-window]] |

## Audio findings

- ⛔ **`ox_bellow` is SYNTHESISED for this reel** by `tools/gen_ox_bellow.py` — the 183-file
  house bank has no animal in it at all, and a borrowed pack is not this world. Gliding
  84-134Hz fundamental, 16 harmonics, a half-frequency growl, a breath bed. Self-gates at
  37.7ms attack (<150ms bar) and 7.0% above 2kHz, so it is neither a SWELL nor an "air" cue.
- ⭐⭐ **MEASURE LIFT OVER THE LOCAL FLOOR, NOT ABSOLUTE PEAK.** Every cue peaks around
  -18 dBFS whether or not you can hear it under a -6 dBFS VO. Two cues measured **-0.4 and
  -0.7 dB of lift** — inaudible — because a ratchet at f18 sat inside the 3-frame J-cut lead
  of a gate cue at f20. Re-spaced to f16/f20: +8.9 and +7.0.
- ⛔ **The biggest visual event needs an IMPACT, not a whoosh.** 700px of steel breaking free
  had only `whoosh_heavy` and read as nothing.
- ⭐ **A texture layer is only free when the picture shows the thing making it.** A `paper_burn`
  sizzle works under the hook's iron (you watch a hot press make contact) and read as noise
  under a wall stamp, where the burn is already there when the hiss arrives.
- ⛔ **Final count: exactly TWO bellows per cut** — the opening, and that cut's stamp beat.
  Verified by band-detecting 50-190Hz across each whole file, not by reading the cue list.
  (A third hit at 12.60s in the same band is `impact_deep.wav`, a different file.)

## Traps worth re-reading before the next build

- ⛔ **A palette is a LUMA BUDGET.** THE PRICE BOARD failed HOOK_LUMA at **98.6** (bar 140)
  because `row` measures back2 78 / floor 58 and I put a dark board on it. Inverting the
  tiles to cream took it to 119.1; moving to `yard` (221/141) with a dark FRAME — so the
  silhouette is still dark-on-bright — took it to 149.5, and motion 10.20 -> 15.11.
- ⛔ **The crop bound includes `cam`.** `GY + 96` = 802 is past the 792 floor *before* a 1.09
  push, so a 244px hero showed only a hard hat. Bit twice more in this reel alone.
- ⛔ **`Motes` anchors TOP-LEFT**, not centre — "move the field off the subject" needs the y
  checked separately.
- ⛔ **`Ox` draws its load rug unconditionally** — pass `rug={false}` to clear the flank.
- ⛔ **Convert frames to envelope bins properly.** A frames-as-10ms-bins slip in my own
  measurement made four healthy cues look dead and nearly sent me re-mixing them.

Related: [[cut-must-reveal]] · [[ease-value-outside-its-window]] · [[three-cuts-three-hooks]] ·
[[box-mascot-rig-limits]] · [`../../docs/ANIMATION-QUALITY.md`](../../docs/ANIMATION-QUALITY.md) ·
[`../../docs/TRIAL-CUTS.md`](../../docs/TRIAL-CUTS.md)
