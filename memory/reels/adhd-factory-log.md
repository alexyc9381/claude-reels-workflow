# 136 · ADHD — factory log

**Kickoff** 2026-09-05 01:20 (VO `~/Downloads/ADHD Sep 5.m4a`, 65.4s raw) · Alex asleep, autonomous build.
**Number** 136, claimed by creating `Faceless/136 - ADHD/` on the gmail Drive at kickoff (a parallel
session took 137 REPOS at 01:38 — `storyboards/137-repos.md` and `ClaudeRepos137Reel.tsx`).
**Board** `storyboards/136-adhd.md` · **Code** `video/src/Adh*.tsx` + `ClaudeAdhd136Reel.tsx` +
`adhd-136-index.tsx` · **Prefix** `Adh` · **Keyword** ADHD.

## STAGE 0 — the subject, and the one thing that is unresolved

⚠️⚠️ **THE SCRIPT IS REEL 120 UNLAZY'S SCRIPT, RE-RECORDED WITH THE KEYWORD CHANGED.** Every sentence
maps one to one ("dropped a fix called the Unlazy Skill" → "called the ADHD skill", "runs up to 10
sub-agents in parallel without affecting each other" → "without them messing each other up", plus
"getting distracted" added to the first line). Reel 120's world and hooks are therefore FROZEN for
this build.

⚠️⚠️ **THE REPO BEHIND "THE ADHD SKILL" DOES NOT MATCH THE VO'S MECHANISM.** Checked live 2026-09-05:

| repo | what it is | matches the VO? |
|---|---|---|
| `UditAkhourii/adhd` — 4,053★, MIT, created 2026-05-25, Udit Akhouri, divergent.sh | parallel divergent ideation: 5 isolated agent branches under "cognitive frames" → score → cluster → deepen top 3 (~10 agent calls, "5 to 10x a single-shot answer", 30-90s wall clock). Covered by The New Stack ("gave Claude Code ADHD… thinks 2x better"). | ⛔ no ledger, no verify step, no run-commands, no sequential mode, no "hours" |
| `ayghri/i-have-adhd` — 27,137★ | output-formatting skill ("stop your coding agent from burying the answer") | ⛔ |
| `Leonxlnx/unlazy` — 3,062★ (was 973 at reel 120), MIT, 2026-08-09 | GATES.md ledger, `gate-check.mjs` runs CHECK and matches EXPECT, Stop hook blocks "done", solo mode sequential, leaves fan out as fresh subagents | ✅ word for word — and its README never says ADHD |

Decision, since Alex could not be asked: **draw the MECHANISM the VO describes, stop at the edge of
the claim.** On screen: the GitHub mark (the VO says "GitHub developer"), the stencil `ADHD SKILL`
(the VO's own name), Anthropic's own system-card evaluation term as the receipt for "admitted it".
**No repo path, no owner, no star count, no install line anywhere in the reel** — guarded by
`NAME_BANNED` in `AdhWorld.tsx`. The lead magnet names the resolution question in its first lines
and Alex has to confirm which repo the CTA sends before it is posted.

## THE VO

Raw 65.39s → **35.28s**. Nine `cut cut` flubs / false starts (chunks 04-06, 08, 10-12, 14-15),
found by splitting at every measured silence and transcribing each chunk alone
(`vo/adhd136/split_tx.py`). Eleven keep segments, every boundary chosen by an isolated
transcription SWEEP (`sweep.py`): four words needed the LATER candidate — "skill" (21.80 → "skil-",
22.00 ✓), "work" (28.44 → "worth", 28.58 ✓), "ledger" (36.37 → "ledge", 36.565 ✓), "though" (49.65
→ "catch.", 49.845 ✓). The raw take's inter-sentence pauses are real room tone at -51..-73 dBFS
(not gated), so gaps are 0.24s slices of two verified-empty windows (22.06-22.74s, 13.00-13.70s),
never a loop. +0.20s of the same room after the last word.

**Tempo is piecewise: hook (sentences 1-3) ×0.90, body ×1.00.** The take runs 4.6-5.3 wps raw in
its first three sentences. R1 after: overall 4.17, **hook 0-10s 4.10** (bar 4.0, over by 0.10),
**worst 5s 5.20** (bar 4.5; identical to reel 135's shipped figure and below every shipped reel
measured in this repo). Flagged, not hidden. Loudness -16.9 LUFS integrated, TP -1.5.

Verified on the cut file: whole-file transcript clean; sliding 3.2s isolated-window flub scan
**0 hits**; every sentence transcribed in isolation with its final word present; head 10ms RMS
-60 → -24 at 10ms (first word is frame 1); quiet-run census: eleven runs, 0.24-0.34s, all at
sentence ends.

Captions: `tools/build_captions.py … medium.en` → `words_adhd136.json`, 147 words = script, 48/50
lines anchored to a measured onset. **Total 1058 frames.**

Onsets (frames): S0 0 · S1 135 · S2 184 · S3 293 · S4 383 · S5 512 · S6 608 · S7 723 · S8 760 ·
S9 840 · S10 994 · END 1058.

## Reference sheet pulled before boarding
`out/136ref_hooks.png` — OX / BOSS / FREE / UNLAZY, six frames each over 0-3s. OX and FREE open
on ONE big cream or branded object with a Claude working against it; BOSS on a soft crowd band, a
huge dark boss and one object between two characters; UNLAZY on a bench, a pump, a green DONE
balloon and a nose. Value structure in all three winners: pale cool ground, a near-black mass,
one hot accent, countable content on the back wall.

---

## STAGE 7-9 — the audit rounds, and what each one actually found

⭐⭐⭐ **THE HOOK WAS THE WHOLE JOB, AND IT WAS FOUND BY MEASUREMENT, NOT BY EYE.**
First full render: ten of eleven scenes fine, `PASS` **5.37** and the only STATIC verdict.
Four rebuilds, each one diagnosed before it was fixed:

| round | measured | cause | fix |
|---|---|---|---|
| R1 | mean 5.33 · quarters 8.61 / 7.44 / **2.46** / **2.82** | every authored event finished by f76 (trolley f54, walk f66, plate f76). The two most important VERBS in the reel, "skipping your tasks" (f71-92) and "lying to you about it" (f101-132), had **nothing drawn on them at all** | three tickets FALL onto the spike on the words, spike slip count 4→7; an EMPTY plate leaves on "lying"; the flame licks; the trolley crosses to f88 |
| R2 | 6.43 · 3 dead samples left | it was framed as a ROOM: the cook small, every prop too small to carry a luma delta | `Cam` to s=1.14, y=22. Visible band checked first (source y 43..737) so the hood keeps 137px of near-black and the plate stack stays cropped by the bottom edge |
| R3 | 7.99 | ⛔ **TWO BEATS EXISTED IN THE CODE AND NOT IN THE PIXELS.** The lie plate ran y 600→900 and left the visible band by f120. The spike sat at GY-46 in the bottom-right corner behind the pass counter and the cook's 286px body, so all three arrivals landed where nobody could see them | plate runs ALONG the pass instead (190→490px, cropped by the bottom edge at the end); spike raised 96px and scaled to 1.38; the walk cut 470→356 so he stops clear of it; the bell moved to the dead left third |
| R4 | **11.30** | one locked framing for 4.5s | THREE SHOTS at f0 / f67 / f102 (2.23s · 1.17s · 1.10s), both cuts in measured gaps between words |

⭐⭐ **THE CALIBRATION THAT MADE R4 OBVIOUS.** Before grinding further I measured the
delivered hooks of every reel this repo has shipped:

    agency135 17.80 · hardware122 13.57 · bill116 12.48 · squad111 12.12
    bill115 11.70 · web124 9.61 · free105 10.01 · agents134 9.33   (median 11.91)

At 8.02 this hook was below all eight, and the one structural thing it lacked was a cut.

⛔⛔ **AND THE SAME WORK HAD TO BE DONE THREE TIMES.** `PICKED` only drives the HOUSE cut.
`adh-amber` runs `SPIKE_HOOK` and `adh-steel` runs `SCORCH_HOOK`, which are *different
components in a different file* and had never been measured. Side by side:
`wander` f0 143.1 / motion 10.58 · `spike` 139.9 / **4.16** · `scorch` **135.8** (⛔ under the
frame-0 law) / 6.67. Both got the same three fixes: the lit `ServiceHatch` that carries the
≥140 law, a 3-shot structure, and arrivals that run to the cut (spike now lands TWELVE
tickets accelerating 18→5 frames apart; scorch sets the HOOD alight at f104).
→ f0 141.5 / 140.4 / 141.6, motion 10.63 / 11.70 / 11.89.

## The SFX bank, rebuilt on measurement

Five samples cut on their own numbers: `ticket_click` (92.3% >2kHz, flat 0.771, used 5× =
SLAP), `sorter_tick` (2.40s, 508ms attack, used 8× = AIR/SWELL), `fire_bed` (90.1% bright,
4356ms attack, flat 0.844 = HISS, the reel 115/116 class), `wire_travel`, `snap`, and later
`metal_ping` (100.0% >2kHz, a pure top-octave tone with no body).
⛔ `click.mp3` was replaced by `mallet_tap.wav` **not for how it sounds** but because
`tools/sfx_audit.py` opens files with `wave.open`, so an mp3 CRASHES the gate — and a cue the
gate cannot open is a cue that ships unaudited.

⭐⭐⭐ **THE RATE NUMBER IN THE DOC IS NOT WHAT SHIPPED REELS DO.** 69 cues over 35.27s =
1.84/sec against docs/SOUND-DESIGN.md's "1.0-1.5, treat 1.5 as a ceiling". I was about to cut
twelve cues, then measured every bank in the repo first:

    agency135 3.45 · repos137 2.82 · agents134 2.72 · judge132 2.69 · free131 2.50
    unlazy120 2.19 · **adhd136 1.84** · build133 1.80 · hardware 1.46

**No shipped reel meets 1.5. The approved 135 runs 3.45.** Trimming would have made this the
second-thinnest bank in the repo to satisfy a figure the house does not hold itself to. The
doc's own EVIDENCE is a burst signature, not an average — "10× `key` inside 0.75s" — and
measured here the worst 1.0s window is 7 cues (the intended hook peak) and the worst same
sample in 0.75s is 4× `impact`, which is A-D-H-D, one per letter. Kept at 1.84 and reported.

## Captions

`word_caption_audit` on the VO stem: six stored ends were 86-346ms INSIDE their word, and four
words OUTLIVED their caption line by 71-121ms (`work.` `ledger.` `answer.` `though.`) — the
reel 135 defect exactly. `--fix` extended the ends (never a start). Clean after.

## The one word that flags, and why it is not a defect

`word_audible` reports `anthropic: not transcribed at all`. Isolated four ways: the VO stem
alone mistranscribes it identically to the delivered mix, and **the untouched raw take
mistranscribes it identically too** at the same window width, while a slightly wider window of
the CUT returns "Anthropic actually" correctly. A level-invariant log-mel cross-correlation of
the cut against the raw scores **0.84 at the true offset** (cut 4.45s = raw 7.740s), so the
splice and loudnorm changed level, not phonemes. It is the recording, the caption reads it
correctly on screen, and no cue is masking it (nearest is `motor_sag`, 0% above 2kHz).

## DELIVERED 2026-09-05

`Faceless/136 - ADHD/` on the gmail Drive — three mp4s, three captions, the contact sheet, the
guide source and a READ-ME-FIRST. **Verified server-side** against DriveFS's own item DB copied
WITH its WAL (positive control: 135 = 207 items). All three mp4s first read `file_size=0` with
12 pending operations, then landed at 17,523,672 / 17,069,752 / 17,967,394 bytes with the queue
empty — matching the local encodes exactly.

⛔⛔ **NUMBER COLLISION, FLAGGED FOR ALEX.** A parallel session used 136 for **SIMS** and has the
earlier claim: `136_SIMS.mp4`, `136-sims.md`, `ClaudeSims136Reel.tsx` created 2026-09-03 and
touched 2026-09-04 on the matchtern Drive. This build claimed `136 - ADHD` on the gmail Drive at
01:37 on 2026-09-05 without seeing them, because the Drive MCP is matchtern-scoped and the gmail
Faceless folder contains no `136 - SIMS`. Not renumbered unilaterally: 137 is REPOS so ADHD would
become 138, but SIMS may move instead and every file in this build is named 136.

---

# REV 2 — THE WORLD WAS REJECTED AND REBUILT (2026-09-05)

Alex, on the delivered rev 1: *"the issue with this is that it's like a cooking theme. This is not
good. I don't want to do a cooking theme here for this. Like, it should be just a theme related to
Claude and stuff like that. more related to be on topic with AI right now. It's at cooking, which
is not really the right topic here."*

⛔⛔⛔ **THE RULE FOR THIS EXACT NOTE ALREADY EXISTED AND WAS WRITTEN THE DAY BEFORE.**
`feedback_the_world_must_speak_the_subjects_brand` came out of reel 137 REPOS on 2026-09-05 and
says, in its own words, that "on brand" is TWO separate defects with different fixes: the thing that
TRAVELS is not the subject, and the WORLD never says the brand. Reel 136 was boarded and built as a
restaurant kitchen anyway, passed every gate, and was delivered. **The check has to run at BOARD
time, against the storyboard, not after a delivery** — the two-column VO diagnostic in that memory
finds it in one pass and it was only run here as part of the rebuild.

⭐ And note what did NOT save it: every scene staged its own sentence (the diagnostic confirmed all
eleven), the value structure was in band, the motion was in band, and 0/11 scenes stalled. A reel
can be right in every measurable way and still be about the wrong thing.

## The rebuild: THE SESSION

The world is a Claude Code session drawn as a place. The terminal is ARCHITECTURE, not a prop inside
a room: the scrollback is the back wall, the prompt line is the floor the cast stands on, the
session bar with the mark and the context meter is the ceiling. `SesFit` is the one fitout component
drawn in every scene, painted from that scene's own `Place`.

**The hero artifact is Claude Code's own TODO LIST** — six rows out of one `TASKS` table, with
checkboxes. **The villain is THE GREEN TICK**: a checkbox that marks itself done and never looks at
the work behind it. That is "instead of just saying a task is done", drawn.

| the VO says | what is on screen |
|---|---|
| "skipping your tasks" | the todo list, six rows, checkboxes |
| "saying a task is done" | a checkbox ticking itself, the card behind it empty |
| "lying to you about it" | the tick is green and there is no receipt |
| "Anthropic actually admitted it" | the system-card row, an eval category |
| "dodging the hard parts" | the rows whose `needsRun` is true |
| "a fix called the ADHD skill" | a skill file dropping in, its install bar filling |
| "forcing it to prove its work" | the stop hook, a bar across the exit, lamp red |
| "builds a ledger" | a CHECK / EXPECT table, printing row by row |
| "run commands and verify the output" | a command typing, output printing, an exit code stamping |
| "one task at a time" | one lane grinding, nine panes dark |
| "10 sub-agents in parallel" | the session splits into ten panes, staggered |

Files: `AdhWorld` keeps the ELEVEN PLACES' hues and lightnesses **verbatim** from rev 1 (that ramp is
what put the delivered file inside every look bar; the rejection was about what is drawn, not about
the light) and only renames the keys. `AdhProps` is written from scratch — 20 props, every one an
object the product has. `AdhScenes` and `AdhHooks` are rebuilt but keep rev 1's measured motion
STRUCTURE beat for beat: three shots on the hook at f0/67/102 in measured word gaps, four passes in
QUEUE, the later-and-tighter third shot in GATE, the big print through RUN's third quarter, the
travelling answer in the CTA.

## ⭐⭐⭐ THE ONE THING THE REBUILD HAD TO RELEARN

First render of the new world: **median 8.57 against a 9.00 bar, two STATIC scenes.** The cause was
structural, not per-scene: **a terminal that never prints is a photograph of a terminal.** Every wall
in this reel is made of `CodeLines`, and they were static.

Making the scrollback SCROLL, every running pane print, and the output block fill lifted **eleven
scenes at once**: 8.57 → 8.90 → 9.49 median. It is also the only motion in the set that needs no
excuse, because it is what a session does.

⛔ AND IT IS NOT A WRAPPING COUNTER. `feedback_a_wrapping_counter_reads_as_chop`: lines advance a
constant px/frame and the content index steps by exactly one at the moment a line leaves the top, so
every line travels its whole distance and nothing teleports.

Two more measured fixes after that: **NIGHT** was still STATIC at 5.40 because ten identical panes
with one lit is nine dark rectangles that never change — the queue became a thin strip and the one
running lane became a hero pane that visibly grinds (→ 6.63). **LEDGER** stalled in its last quarter
because the table finished printing and a `tear` value drove nothing but a face — the sheet now comes
off and travels to the rail it is clipped to (→ 0/11 stalls).

## MEASURED, REV 2 vs REV 1, on the ENCODED files

|  | rev 1 house | **rev 2 house** | rev 2 spike | rev 2 scorch | bar |
|---|---|---|---|---|---|
| frame-0 luma | 141.5 | **153.7** | 166.2 | 148.1 | ≥140 |
| body saturation | 43.1% | **65.3%** | 61.2% | 66.4% | ≥34% |
| black point p10 | 28.8 | **22.3** | 21.6 | 15.2 | ≤35 |
| body luma | 118 ⚠ outside | **92 ✅ in band** | | | 70-105 |
| median motion | 10.63 | 9.49 | 11.59 | 10.42 | ≥9.00 |
| scenes failing / stalling | 0/11 | **0/11** | 0/11 | 0/11 | |
| ship gate | 8/8 | **8/8** | 8/8 | 8/8 | |

dHash mean 23.0 / min 11 (bars 14 / 10). SFX gate clean; `bell_ring` (1.6s of struck metal, the most
kitchen-shaped sound in the bank) replaced by `green_tone` on both its cues.

## DELIVERED 2026-09-05, rev 2

⭐ **STAGE → WAIT FOR THE ITEM-ID → RENAME**, per `feedback_drive_name_gets_stuck_stage_then_rename`,
which reel 137 wrote the same day after delete-then-create destroyed seven live deliverables. Five
changed files replaced, each earning a real item-id under a `.stg_` name before being renamed onto
its final one; the four unchanged files were SKIPPED rather than re-uploaded, because re-uploading
re-poisons a name for nothing. Verified: nine live rows, `trashed=0`, sizes matching the local
encodes exactly, upload queue empty, no staging leftovers.

---

# REV 3 — "BORING + BASIC THEMING" (2026-09-05)

Alex on rev 2: *"the animations are not interesting enough whatsoever here like its way too boring
thorughout here and the themeing is not good enough like its too basic and just simple single
colors here its not interesting enough here either."*

⭐⭐⭐ **BOTH HALVES OF THAT NOTE WERE ONE DEFECT AND IT WAS COUNTABLE IN SECONDS.** Per
`feedback_props_need_real_drawing`, the census against a shipped world in this repo:

| file | median elements / component | hero objects |
|---|---|---|
| `HwProps` (shipped) | **7** | GpuCard 21 · BigRig 20 · NumDoor 18 |
| `AdhProps` rev 2 | **4** | Pane 7 · AnswerCard 5 · TickPile 5 · StopHook 5 |

**The `Pane` — the unit the ENTIRE world is built from — was seven elements**, so ten of them on
screen was ten identical dark rectangles. That is "a whole lot of nothing even though there's more
stuff", and it is also why the animation read as boring: the only motion an object that simple can
have is where it slides to.

## The three fixes

1. ⭐⭐⭐ **THE TEXTURE THE WORLD IS MADE OF WAS ONE COLOUR.** Every wall and every pane is built
   from `CodeLines`, and they drew one hue at one opacity. A line is now 2-4 TOKENS from a `SYN`
   palette (keyword violet, string green, number gold, comment grey, error red). **No new objects,
   and the whole reel gained colour** — this is what "just simple single colors" was pointing at.
   On a light editor the same token renders as a dark ink of the same hue (`dark` prop) or the code
   vanishes into the paper.
2. **THE OBJECTS GOT DRAWN.** `Pane` 7 → **27** (bezel with a lit top edge and a shadowed lip, a
   recessed screen with a vignette, a line-number gutter, a sliding current-line band, a scrollbar
   whose thumb TRAVELS, three window dots, a lamp in a bezel, a segmented status strip with a
   progress worm, two screw heads, and a SPINNER that turns while it works). `TodoList` 12 → 21
   (torn top edge, punched margin with inner shadow, red margin rule, ruling, hatched receipt
   slots, brass clip). `SesFit` 13 → 30 (window dots, a tab strip, a diff gutter, a MINIMAP whose
   viewport travels, a status bar). Plus `AnswerCard` 16, `StopHook` 14 with a hydraulic ram whose
   piston extends, `SkillFile`, `TickPile`.
   ⭐ The spinner and the scrollbar are the `GpuCard` fan-blade trick: **motion INSIDE the object**.
   That answers "boring" and "basic" in one move, and it lifted the median from 9.49 to **11.72**
   without one new prop.
3. **THE EDITOR FOLLOWS THE SCENE'S LIGHT.**

## ⛔⛔ THE MISTAKE I MADE ON THE WAY, AND IT IS WORTH THE ENTRY

Making the screen "properly dark" like a real terminal, in every scene, **destroyed the value
structure**: frame-0 luma fell to **108.2** against the 140 law and body luma to **71.0**, the floor
of the house range. I then swept the rail tone from #23262B to #79838E and got only 108 → 117, well
short — because the dominant dark area was the SCREEN, not the rail.

⭐ The recipe was never "dark world". It is **pale cool GROUND + near-black MASS**
(`feedback_eyecatch_is_value_structure`), and I had inverted it: the ground was the black thing. The
fix is that the editor chrome reads its own `Place` and renders LIGHT in the bright beats and DARK
in the dark ones, so the ground is the editor surface and the mass is the panes. Frame-0 luma
108.2 → **159.7**, body luma → 81.6, and the reel gained two visually distinct treatments instead
of one flat register.
⛔ Also caught here: the first pass painted the wall in translucent `hexa()` over the `Room`'s haze
and parallax bands, and the whole reel went milky — a terminal seen through fog. A screen is an
opaque surface; `bands={0}` and solid tones.

## MEASURED, REV 3

|  | house | spike | scorch | bar |
|---|---|---|---|---|
| frame-0 luma | 159.7 | 175.8 | 144.7 | ≥140 |
| body saturation | 54.6% | 49.5% | 50.4% | ≥34% |
| black point p10 | 11.3 | 4.0 | 3.0 | ≤35 |
| median motion | **11.72** | 12.72 | 11.92 | ≥9.00 |
| scenes failing / stalling | 0/11 | 0/11 | 0/11 | |
| ship gate | 8/8 | 8/8 | 8/8 | |

Subject share **6.72%** (the rail was buried to the chest; it was lowered 56px and the sprites
scaled 1.16x). dHash mean 23.6 / min 11. SFX gate clean. Delivered by stage → item-id → rename;
nine live rows, sizes matching, no staging leftovers.

---

# REV 4 — THE HOOK, REBUILT ON THE HOUSE TEMPLATE (2026-09-05)

Alex: *"the hook scene sucks and like the style isnt anyhting like weve mentioned the animation
level is just so much worse compared to all of the animation styles here neeeds to be completely
revamped based on our nocodealex animation system."*

⛔⛔⛔ **THE CAUSE WAS NAMED IN A MEMORY I HAD NOT OBEYED.**
`feedback_read_the_winning_hook_do_not_just_measure_it` says, in its first line: *"READ THE WINNING
HOOK'S CODE. MEASURING ITS OUTPUT ONLY GIVES YOU THE SCORE."* Across three revisions I profiled the
winners numerically — hook means, quarter traces, element censuses — and never once opened
`FreeHooks.tsx`. Reel 134 got this identical note for the identical reason.

Reading `FreeHooks.HookToll` took two minutes and its own comment is the whole specification. Scored
against its eight points, rev 3's hook failed six.

## What the house system actually does, and what I was missing

| the template | rev 3 hook | rev 4 hook |
|---|---|---|
| ONE body against a LOAD | a body standing near sliding cards | he STAMPS a wall of rows |
| f0 already the joke | a settled desk | mid-swing, three rows green, every receipt slot EMPTY |
| the whole event in ~30 frames | events spread over 135 | trigger f13, slam f27 |
| travel ≥ 1/3 of the hero's body width | tiny cards | 172px = **0.52** of his body |
| the arrival COSTS | a puff | damped recoil + board jolt + puff + ring + a sheet slides off |
| last third is a BODY action | a plate sliding | he lifts the next stamp |
| it does not resolve | it resolved | at the cut he is loading the fourth blow |
| dense on-topic set + near crop | thin | two `Runner` bands, a shaped cone, a pool, a near-edge crop |

⭐⭐⭐ **THREE TECHNIQUES I HAD NEVER USED, ALL IN THAT ONE FILE:**
1. **WEIGHT IS DEFORMATION.** The FREE hook's bar BOWS: *"a rigid stick reads as someone holding a
   prop."* `StampTool` now has a three-coil spring that compresses on the blow and a barrel that
   squashes.
2. **NOTHING LANDS AND STOPS.** Its lock recoil is `sin(t*0.74) * exp(-t/5.5) * 7.5` — a damped
   oscillation, not an ease. Every blow here now carries one, through the arm AND through the board.
3. **THE SET IS WORTH MORE THAN THE EFFECTS.** Two `Runner` bands at different depths and rates are
   named in that file as *"the single biggest per-scene lever in the measured motion table"*, plus a
   SHAPED lamp cone (never a full-frame fill) which it measures as +9 points of saturated share.
   I had not used `Runner` once in this reel.

⭐ And the sentence is staged on its own measured word frames: the notification arrives on
"distracted" (f50-66) and HIS HEAD TURNS TO IT; the next two blows land while he is still looking
away, which is "skipping your tasks and lying to you about it" as one image with no caption doing
the work.

## All three cuts, because each opens on its own hook

    house   STAMP   one body putting DONE on work it has not done
    spike   LOAD    he CARRIES the tower he is stamping, and each blow adds to it
    scorch  BURIAL  the work rains down faster than he stamps, and buries him

Hook motion **8.69 → 10.85 / 11.34 / 12.91** against a shipped band of 9.33-17.80. All three were
below the band; all three are now inside it.

## MEASURED, REV 4

|  | house | spike | scorch | bar |
|---|---|---|---|---|
| frame-0 luma | 150.5 | 158.0 | 159.6 | ≥140 |
| body saturation | 54.5% | 49.5% | 50.4% | ≥34% |
| black point p10 | 11.3 | 4.0 | 3.0 | ≤35 |
| median motion | 11.72 | 12.72 | 12.50 | ≥9.00 |
| scenes failing / stalling | 0/11 | 0/11 | 0/11 | |
| ship gate | 8/8 | 8/8 | 8/8 | |

dHash mean 23.4 / min 11. SFX clean. Delivered by stage → item-id → rename.

---

# REV 5 — THE SETS TRANSFORM (2026-09-05)

Alex: *"the scenes animations between scenes lik ethe hook and stuff thorughout here are not good
not interesting and just way too basic and boring animations here please see hte other elite
vdieos here."*

⛔ First check: **the elite reels have NO transition component.** `ClaudeFree131Reel` sequences its
thirteen scenes with plain `<Sequence>` hard cuts, exactly like this reel. So "animations between
scenes" was never about a wipe — it was about the scenes themselves.

⭐⭐⭐ **THEN I READ AN ELITE BODY SCENE INSTEAD OF THE HOOK, AND THE DIFFERENCE WAS ONE THING: THE
SET ITSELF TRANSFORMS.** `FreeScenes.S4`, on the line "all in one spot":

> *"Seven plates at a 232px pitch are 1392px wide on a 1012px panel — five of the seven marks were
> never on screen at the moment the VO says all of them are in one place. From f39 the pitch closes
> 232 -> 124 and the plates slide together… **The compress IS the event, and it is a large
> travelling change rather than a lamp turning on.**"*

Mine slid props around inside sets that never moved. Four levers ported:

| lever | where it came from | where it went |
|---|---|---|
| **THE SET RE-FLOWS** | the rack's pitch contracting | FANOUT: the ONE pane SPLITS into ten — x, y, w AND h all interpolated from the single rect to each grid slot. **11.72 → 14.31.** NIGHT: the queue strip SHIFTS a slot per closed row |
| **THE SWEEP** | *"a full-width high-contrast band travelling the rack, the highest-value shape in the motion table"* | every stamp in the hook, the ledger closing, the fan-out completing, the CTA |
| **THE ASCENDING RUN** | *"an ascending run is what makes a repeated reward read as PROGRESS rather than as repetition"* | the pip row, staggered 2.4 frames apart |
| **THE TALLY** | its seven-pip rack row at `BAND_Y` | `PipRow`, one pip per task in its own colour |

## ⛔⛔ AND A REAL BUG THE RE-FLOW EXPOSED: A SYMMETRIC GRID IS MIRROR-INVARIANT

`MIRROR.steel` includes scene 9, so the steel cut flips the fan-out. **Ten identical panes in a 5x2
grid look the SAME flipped**, so the mirror lever bought nothing and house vs steel measured **3 bits**
of dHash at f945 — inside the duplicate-risk band, on a reel that had passed this gate five times.

⭐ Fixed the way `feedback_variants_need_shot_sizes` says: with STRUCTURE. Each cut fans out into a
different arrangement — **5 across / 4 across / 2 across** — same ten lanes, three different
pictures, and per-cut pane seeds so the code content differs too. dHash min 3 → **12**.
⛔ THE LESSON: a mirror is only a variant lever on an ASYMMETRIC composition. Check what the lever
actually does to the frame it is applied to, rather than trusting that it is listed.

## MEASURED, REV 5

|  | house | spike | scorch | bar |
|---|---|---|---|---|
| frame-0 luma | 150.9 | 158.0 | 159.6 | ≥140 |
| body saturation | 54.6% | 49.5% | 50.4% | ≥34% |
| black point p10 | 11.1 | 4.0 | 2.9 | ≤35 |
| median motion | 11.73 | 12.72 | 12.65 | ≥9.00 |
| HOOK motion | 10.86 | 11.32 | 12.88 | shipped band 9.33-17.80 |
| scenes failing / stalling | 0/11 | 0/11 | 0/11 | |
| ship gate | 8/8 | 8/8 | 8/8 | |

dHash mean 23.6 / min 12. SFX clean. Delivered by stage → item-id → rename.

---

# REV 6 — A PLACE, NOT A SCREENSHOT (2026-09-05)

Alex: *"the hhook scene is not good here whatseover and hte scenes aftewrawrds are oto much like
just shapes rectangles squares not good here like it needs ot be signifaclty better and more themed
here like its os boring here."*

⭐⭐⭐ **THIS IS A SILHOUETTE NOTE AND IT WAS MEASURABLE IN ONE SCRIPT.** Counting non-rectangular
shape declarations (circles, clipPaths, skews, svg paths, radial gradients) as a share of all shape
declarations:

| file | non-rectangular share |
|---|---|
| `FreeScenes` (elite) | **21%** |
| `HwProps` (elite) | **22%** |
| `AdhScenes` (mine) | **6%** |

⛔ **CHOOSING "A CLAUDE CODE SESSION" AS THE WORLD MADE EVERY OBJECT A RECTANGLE** — panes, cards,
boards, lists, tables. `feedback_props_need_real_drawing` move 3 is exactly this: *"SILHOUETTE
VARIETY. Open, splayed, leaning, face-down, plus one CURVED object among the rectangles. A stack of
identical rects reads as a bar chart, not a pile."* Rev 5 was a bar chart.

⭐ **THE FIX IS NOT TO DROP THE THEME, IT IS TO STOP DRAWING A SCREENSHOT AND DRAW THE PLACE THE
SCREEN IS IN.** A dev desk is full of curves and diagonals and every one of them is on topic.
`DeskFit`, one layer in all eleven scenes, painted from each room's own `Place` and alternating side
so no two neighbours frame alike:

    a desk in PERSPECTIVE            a trapezoid ground, not a band
    an ANGLEPOISE                    two diagonal arms + a CONICAL shade
                                     + a cone of light + its elliptical pool
    a MUG                            a cylinder with a CURVED handle, steaming
    a KEYBOARD                       a trapezoid in perspective with key rows
    CABLES                           draping SVG curves, the only organic line
    a PLANT                          leaves with no straight edge
    a CHAIR BACK                     a curved mass cropped by the near edge

## ⛔ AND THE HOOK HAD A REAL BUG BEHIND "NOT GOOD WHATSOEVER"

The raised stamp and the claim board's header were both sitting inside **the reserved band**
(`BAND_Y` — nothing may enter panel y 112..210), so both were being clipped by the header plate. The
stamp is 202px tall at s=1.15, so its base has to stay at or below 420 at full raise. Board moved to
y=414 h=330 (top 249), stamp base 486 with a 66px raise (top 218). The tally is now legible through
every blow, which is the whole point of the shot.

## MEASURED, REV 6

|  | house | spike | scorch | bar |
|---|---|---|---|---|
| frame-0 luma | 147.3 | 158.0 | 159.6 | ≥140 |
| body saturation | 51.1% | 46.2% | 48.8% | ≥34% |
| black point p10 | 11.0 | 3.9 | 2.9 | ≤35 |
| body luma | 88.1 | | | 70-105 |
| median motion | 11.57 | 12.47 | 12.14 | ≥9.00 |
| scenes failing / stalling | 0/11 | 0/11 | 0/11 | |
| ship gate | 8/8 | 8/8 | 8/8 | |

dHash mean 23.5 / min 10 (⚠️ exactly on the bar — the per-cut fan-out grids are carrying it, so any
future change to that scene must re-check). SFX clean. Delivered by stage → item-id → rename.

---

# REV 7 — SCALE AND CAST, READ OFF THE WINNERS' OWN FRAMES (2026-09-05)

Alex: *"the animations are just not enough and not interesting neough whatsoever compared to all fo
the other winning videos here even the hook scene isnt interesting enough here."*

⛔⛔⛔ **I HAD NEVER PUT MY FRAMES NEXT TO A WINNER'S.** Seven revisions of measuring — hook means,
quarter traces, element censuses, silhouette shares — and not once a side-by-side picture. One
ffmpeg tile of the same four timestamps from two winners and mine answered it in a second:

| | f12 | f40 | f72 |
|---|---|---|---|
| **135 AGENCY** | an empty desk | **FIFTEEN characters** poured out of it | more still |
| **122 HARDWARE** | a TINY Claude holding three GPU cards, each wider than he is tall, **TILTING** | they come down on him | crates + cast |
| **mine (rev 6)** | one Claude, one board his own size | same frame, digit 4/6 | same frame, digit 6/6 |

⭐⭐⭐ **THE TWO THINGS THE WINNERS DO THAT I WAS NOT:**

1. **SCALE DRAMA.** The load is far bigger than the body and visibly UNSTABLE. `RowTower`: the
   hook's board became a stack of unproved rows that runs off the top of frame, starts at NINE
   rows, **grows by two on every blow and leans further as it does**, each sheet at its own angle so
   the stack has a silhouette. He is stamping the bottom of something about to fall on him. The
   tally rides the tower, so it is ONE load, ONE number, ONE image — a second board fighting it for
   the same fact was what made the frame busy.
2. **A CAST.** A pane is not a character. `AgentRow`: the ten sub-agents in the payoff are ten
   CLAUDES at ten desks, each arriving on its own slot clock in its own costume with its own little
   screen, instead of ten rectangles fading up. **Population change is the thing the winners' frames
   do and mine did not.**

⭐ Measured: the hook's composition change sampled at 2fps is now **28.52** on a shot that was
near-identical frame to frame. Hook motion 10.90 / 11.32 / 12.88 against the shipped band.

## MEASURED, REV 7

|  | house | spike | scorch | bar |
|---|---|---|---|---|
| frame-0 luma | 145.2 | 158.0 | 159.6 | ≥140 |
| body saturation | 51.1% | 46.2% | 48.8% | ≥34% |
| black point p10 | 11.0 | 3.9 | 2.9 | ≤35 |
| median motion | 11.57 | 12.47 | 12.14 | ≥9.00 |
| HOOK motion | 10.90 | 11.32 | 12.88 | band 9.33-17.80 |
| scenes failing / stalling | 0/11 | 0/11 | 0/11 | |
| ship gate | 8/8 | 8/8 | 8/8 | |

dHash mean 23.7 / min 11. Delivered by stage → item-id → rename.
⚠️ Still to tune if it comes back: the tally plate on the tower is small at thumbnail size, and the
hero could be larger against the tower than he currently is.

---

# REV 8 — THE DENSITY DEVICE, READ OUT OF UNLAZY'S CODE (2026-09-05)

Alex named the references: *"check the OX video and unlazy videos like these animations still arent
interesting enough like its too much focused on squares nad rectangles rather than like actually
interesting animation concepts here."*

⭐ Six frames spanning each of 119 OX and 120 UNLAZY, stacked against six of mine:

| | what is in the frame |
|---|---|
| **OX** | a giant OX WITH HORNS beside a small Claude · a vault floor that OPENS and pours gold · stacks of coloured crates · real branded logo tiles |
| **UNLAZY** | a wall of lockers · a BELL · a conveyor of crates · a gate arch with a clock · a BULLPEN of a dozen Claudes at desks |
| **mine** | a desk, a white card, a Claude. Repeated. |

⭐⭐⭐ **AND UNLAZY'S CODE NAMES THE DEVICE.** `UnlazyWorld.ToolWall` is a **10x3 grid of FOUR
different hand-drawn tools** — a spanner, a clamp, a machined part on a peg, a coil of cable — hung
on rails, each swaying on its own clock, dressed into nearly every scene (`<ToolWall … cols={10}
rows={3} live={6} />` appears in S2, S4, S6, S8, S10…). **Thirty-odd objects of four silhouettes
behind the action.** That is the whole reason those frames read as PLACES and mine read as diagrams.

`BayWall` is the same device in this world's objects, so it stays on topic and buys four silhouettes
the reel did not have:

    0 · a SKILL FILE on a hook, folded corner        → a diagonal
    1 · a COIL OF CABLE on a peg                     → the frame's only true circle
    2 · a lit SUB-AGENT BAY with a tiny Claude face  → a character, at wall scale
    3 · a MODULE with PIN TEETH                      → fine repeated detail

⭐ Each unit takes its hue from the `TASKS` table, so the back wall is where the frame's colour
variety now comes from — the job the crate stacks do in OX.

## ⛔⛔ WHAT DRESSING EVERY SCENE COST, AND IT IS THE LESSON

Adding one dark component to all eleven scenes broke **two** gates at once:
1. **frame-0 luma fell to 140.0** against a `>= 140` law — i.e. it failed on the rounding.
2. **dHash min fell to 9** (bar 10) because *the identical wall in all three cuts ate the very
   separation it was sitting behind.*

⭐ Fixes: the wall is lighter (o 0.92 → 0.72) and shorter (3 rows → 2) in the hook only, and **every
cut gets its own seed AND its own row count**. → luma 141.2, dHash min 12.
⛔ **A SET DRESSING ADDED TO EVERY SCENE IS A VARIANT LEVER TOO.** If it is identical across cuts it
subtracts from their difference; check the dHash after any global set change, not just after a
camera or layout change.

## MEASURED, REV 8

|  | house | spike | scorch | bar |
|---|---|---|---|---|
| frame-0 luma | **141.2** ⚠️ | 158.0 | 159.6 | ≥140 |
| body saturation | 47.1% | 45.2% | 49.3% | ≥34% |
| black point p10 | 11.5 | 4.8 | 3.3 | ≤35 |
| median motion | 11.51 | 12.48 | 12.17 | ≥9.00 |
| scenes failing / stalling | 0/11 | 0/11 | 0/11 | |
| ship gate | 8/8 | 8/8 | 8/8 | |

dHash mean 23.8 / min 12. SFX clean.
⚠️ **The house frame-0 luma is 1.2 over a hard gate** — anything added to that scene's back wall must
be re-measured against it.

⚠️ STILL SHORT OF OX/UNLAZY, honestly: they each carry a MEMORABLE HERO OBJECT per beat (an ox, a
bell, a vault floor that opens, a gate arch) and this reel's beats are still mostly cards and panes.
That is the next thing to build if the note repeats.

---

# REV 9 — THE PAPER IS A PROMPT, AND IT FLIES (2026-09-05)

Alex: *"needs more interesintg motion in the beginning hok scene especially here and the prompts
square spapers etc needs ot be way more interesting here where right now its not whatseover."*

## ⭐⭐⭐ THE PAPER — the object the reel repeats forty times was a rounded rect

Every sheet in this reel (tower rows, queue cards, skipped rows, the answer) was a rounded rectangle
with a checkbox and ONE coloured bar. A real prompt has an ASKER, WORDS, a TIME and a VERDICT, and
drawing those gives the object meaning **and an outline**. `PromptCard`:

    a PAPERCLIP bent over the corner   → the outline stops being a rectangle
    a TORN LEFT EDGE, perforated       → it reads as pulled off a run
    a round AVATAR chip + a name bar   → somebody asked for this
    ragged WORDS in SYNTAX colours     → never one flat bar
    a green DONE pill                  → the claim
    an EMPTY hatched RECEIPT SLOT      → the joke, now on every single card
    a COFFEE RING on some              → a circle among the rectangles

⭐ `compact` mode makes the same component a stack row, so `RowTower` is now built from prompt cards
at their own angles and its edge is ragged instead of nine identical white bars. **One component,
used at two scales, upgraded every sheet in the reel at once.**

## ⭐⭐ THE MOTION — two travelling events per blow, both made of that object

    IN   a prompt flies in from off-frame and SLAPS onto the tower, 12 frames
         ahead of each blow — the work arriving faster than he fakes it
    OUT  the blow knocks a FLURRY of six sheets loose, each on its own clock,
         tumbling with real rotation and lateral drift before settling

⛔ Neither is a fade. Both cross real distance, which is the only motion the eye resolves at 30fps
on a phone. **Hook 10.90 → 12.70**, above the shipped median of 11.91, quarters rising
9.27 / 12.33 / 14.60 / 14.58, zero samples under 4.0.

## ⛔ AND THE FRAME-0 GATE CAUGHT IT AGAIN

The rev-8 note flagged that house frame-0 luma sat 1.2 over a hard gate; the new flying paper does
not exist yet at frame 0, so it stayed tight at **140.6** — 0.6 of margin. Fixed the same way as
always, with LIT CONTENT rather than a brightness lever: two prompts already lying on the desk in
the foreground, on topic, giving the near ground something to be. → **146.6**.

## MEASURED, REV 9

|  | house | spike | scorch | bar |
|---|---|---|---|---|
| frame-0 luma | 146.6 | 158.0 | 159.6 | ≥140 |
| body saturation | 46.8% | 45.2% | 49.3% | ≥34% |
| black point p10 | 11.4 | 4.8 | 3.3 | ≤35 |
| median motion | 11.84 | 12.48 | 12.17 | ≥9.00 |
| HOOK motion | **12.70** | | | shipped median 11.91 |
| scenes failing / stalling | 0/11 | 0/11 | 0/11 | |
| ship gate | 8/8 | 8/8 | 8/8 | |

dHash mean 23.7 / min 12. SFX clean. Delivered by stage → item-id → rename.

---

# REV 10 — THE HOOK STAGES ITS OWN SENTENCE (2026-09-05)

Alex: *"the hook scene does nto really reprsent whats being spoklen on the screen and its not
interestinge tiher like each of the scenes dont have enough motion so a lot of htem need to be
completely redone."*

## ⭐⭐⭐ THE STAGING DEFECT, NAMED EXACTLY

The hook's sentence is *"The rumors are true, Claude is secretly getting **DISTRACTED**, skipping
your tasks, and lying to you about it."* Run the MUTE TEST
(`feedback_illustrate_the_sentence_not_the_set`) and rev 9's hook read as **"a Claude stamps a
stack"** — which is the LYING clause. **The word the whole reel turns on had been demoted to a
notification sliding past behind him.**

⛔ This is the second time on this reel that a technically strong hook staged the wrong clause. The
mute test is cheap and I did not run it after the rev-4 rebuild.

The shot is now the sentence, in its own measured order:

    f0-27    he stamps once — the job, and the lie: DONE on an empty receipt
    f46-58   "getting distracted" — a notification LANDS, big enough to be the
             reason, and he TURNS to it
    f66-100  "skipping your tasks" — he WALKS AWAY, 190px (over half his own
             body width), and prompts keep flying in and PILE UP UNSTAMPED
    f100-135 "lying to you about it" — the rows tick THEMSELVES green in an
             ascending run while he is not even looking, each shedding paper,
             and the tower leans further with every one
    ⛔ He never comes back. It does not resolve.

⛔ AND A MEASURED TRAP ON THE WAY: the notification at s=1.22 centred was frame-covering, and **one
big static rectangle cost the hook 1.9 of motion** (12.70 → 10.79). At s=0.94 upper-right it is
still unmistakably the reason he turns, and the hero, the tower and the blow all still read.

## THE FOUR WEAKEST SCENES, REDONE

| scene | was | now | what it got |
|---|---|---|---|
| NIGHT | 9.15 | **13.29** | ONE prompt crawls the full width across the whole beat — "one task at a time" as a single continuous travel — and every close sheds paper |
| RUN | 10.15 | **11.39** | the row that finally HAS a receipt leaves frame; each exit code sheds |
| LEDGER | 9.68 | **10.17** | prompts fly in and CLIP to the rail as the table prints, so arrivals span the whole beat |
| CTA | 8.22 | **9.41** | four proved prompts fly in on the four spoken letters and land in a fan, each with a FILLED receipt |

## MEASURED, REV 10

|  | house | spike | scorch | bar |
|---|---|---|---|---|
| frame-0 luma | 146.2 | 158.0 | 159.6 | ≥140 |
| median motion | 11.84 | 13.81 | 12.91 | ≥9.00 |
| scenes failing / stalling | 0/11 | 0/11 | 0/11 | |
| ship gate | 8/8 | 8/8 | 8/8 | |

dHash mean 23.5 / min 10 (⚠️ on the bar again). SFX clean.
⚠️ **CTA 86% HOLD and NIGHT 77% HOLD** — their means now come from strong peaks with quiet spans
between. If either reads as stop-start, the fix is arrivals spread WIDER, not bigger
(`feedback_hold_needs_arrivals_not_travel`).

---

# REV 11 — NO PAPER, NO SQUARES, NO RECTANGLES (2026-09-05)

Alex, third time and escalating: *"still a lot of these animations are not interesting enough here
like its way too boring like i dont nwat ot see papers or squares or rectnagles those are just wayyy
oto boring here..... wtf is going on."*

⛔⛔⛔ **I ANSWERED THE SAME NOTE THREE TIMES BY DRAWING THE RECTANGLE BETTER.**

| round | the note | what I did |
|---|---|---|
| rev 6 | *"too much like just shapes rectangles squares"* | added a workspace layer (curves in the SET, rectangles still the heroes) |
| rev 9 | *"the prompts square papers need to be way more interesting"* | drew the paper card properly — 18 elements, paperclip, torn edge. **Still paper.** |
| rev 11 | *"i dont want to see papers or squares or rectangles"* | — |

`feedback_repeated_note_means_wrong_object` says it exactly: **a note repeating on the same object
means the OBJECT is wrong.** And the object was wrong because the WORLD was: "a Claude Code session"
contains nothing but panes, cards and lists, so every fix I made produced more of them. I had already
rebuilt the world once for being off-topic (rev 2) and never noticed it had this second failure mode
baked in.

## ⭐⭐⭐ THE RE-MAP: A PROVING RIG. Every noun is a cylinder, a circle or a pipe.

| the VO | the old object | the new object |
|---|---|---|
| a task | a card | a **JOB CANISTER** — a steel cylinder, banded, with a lit round core in the task's colour |
| "saying a task is done" | a checkbox | a **GREEN CAP** slapped on without a run |
| "prove its work" | a bar across a door | **THE RIG** — a round chamber port with 8 bolts, two closing pistons, a real pressure GAUGE (bezel, ticks, red + green arcs, needle, hub), a lever that throws 62°, curved pipework |
| a verdict | a tick in a box | the needle swinging and a **ROUND SEAL** stamped on the can |
| the queue | a rail of cards | a **CONVEYOR** on rollers that actually turn |

**Zero `PromptCard` uses remain in the scenes.** The hook keeps rev 10's staging and plays it in
machinery; the rig runs throughout with its verdict lamp RED, because he never tests anything.

## ⛔ AND A MEASURED TRAP: A MACHINE THAT DOES NOT RUN IS A PICTURE OF A MACHINE

First render of the machine hook came back at **8.22** (from 11.11) — the vocabulary was right and
the frame was dead, because the rig just SAT there and the canisters were drawn at s=0.98. Fixes:
canisters to **s=1.62** so they are the biggest travelling objects in the shot, twelve of them
instead of eight, and the rig's gauge needle, pistons and lever all cycle continuously. → **10.00**,
0 samples under 4.0.

## MEASURED, REV 11

|  | house | spike | scorch | bar |
|---|---|---|---|---|
| frame-0 luma | 143.2 | 158.0 | 159.6 | ≥140 |
| median motion | 11.84 | 13.81 | 12.91 | ≥9.00 |
| scenes failing / stalling | 0/11 | 0/11 | 0/11 | |
| ship gate | 8/8 | 8/8 | 8/8 | |

dHash mean 24.0 / min 13 (best of the run). SFX clean.

---

# REV 12 — THE HOOK SCRAPPED AND RE-PICKED FROM THREE (2026-09-05)

Alex: *"no this hook is horrible just scrap it completely and remake it again."*

⛔⛔⛔ **FOUR REJECTIONS OF ONE HOOK WERE ONE PROBLEM, AND I NEVER NAMED IT.**
`feedback_one_concept_four_costumes` says: before generating anything new, finish *"in all of these,
the thing that happens is ___"*. For mine it finishes easily:

    wander   a Claude at a workstation TICKING rows he did not do
    stamp    a Claude at a workstation STAMPING rows he did not do
    cap      a Claude at a workstation CAPPING cans he did not test

**One concept — a hero performing a repetitive falsifying action on a queue — in three costumes.**
Four rounds of better drawing, more motion, a new world and a new vocabulary all happened INSIDE it,
which is why none of them moved the note.

⭐⭐⭐ **AND I HAD SKIPPED docs/THE-OPEN.md STEP 1 FOR FOUR ROUNDS**: N concepts for scene 0, each
rendered at full quality, ONE picked before the body is defended. Doing it took one pass and settled
it on measurement:

| concept | the KIND of event | solo motion |
|---|---|---|
| **THE FRONT** | a screen CONCEALS a room | **20.24** ⭐ PICKED |
| SPLIT | a body DIVIDES | 8.25 |
| HOLLOW | a sealed thing is EMPTY | 7.48 |

⭐ The column test passes: a concealment, a division and an emptiness cannot be finished with one
sentence, and none of them is a repetitive action on a queue.

## THE FRONT

A giant green ALL CLEAR board slides across frame and hides a room where five rigs sit with RED
lamps and the failure stacks are climbing. He holds it and grins down the lens, never looking back.
It SLIPS three times, each time revealing more, each time shoved back — and it CREEPS down
continuously between the slips, so he is losing it the whole time and only catching it in jerks.
⛔ It does not resolve: at the cut he has stopped being able to hold it.

**In-reel hook motion 16.22**, quarters 11.41 / 20.92 / 16.44 / 16.11 — near the top of the shipped
band and the highest this reel has produced. The house cut's median went 11.84 → **12.69**.

⛔ Two fixes it needed: the board hung still between slips (4 dead samples → the creep), and at
940px wide the camera cropped it to "ALL CL" — **the claim is the whole hook, so it has to be
readable**; 772px fits the tightest of the three cuts' framings.

⭐ SPLIT and HOLLOW are kept and now open the amber and steel cuts, so all three still open on
genuinely different mechanisms. Re-picking the main is a one-line change to `PICKED`.

## MEASURED, REV 12

|  | house | spike | scorch | bar |
|---|---|---|---|---|
| frame-0 luma | 147.6 | 154.1 | 144.9 | ≥140 |
| median motion | 12.69 | 13.81 | 12.17 | ≥9.00 |
| scenes failing / stalling | 0/11 | 0/11 | 0/11 | |
| ship gate | 8/8 | 8/8 | 8/8 | |

dHash mean 24.0 / min 13. SFX clean.
