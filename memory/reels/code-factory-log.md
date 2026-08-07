# CODE — factory log (reel 86)

> ⛔ Opened STAGE 0, 2026-08-03 per [[factory-log-first]] — before any storyboard or build.
> ⚠️ Arrived **PRE-LOCKED as an Alex VO recording** (`IMG_3413.MOV`, 246.2s raw, 10 "cut cut" retakes),
> script supplied in `~/Downloads/August 2nd.txt`. Stages 0-4 did **NOT** run as a gated process.
> **NOT a gated ship** — same status as SERENA/TOOL/POSTS/ARSENAL/REPO. This is a **BUILD task**.

## SUBJECT: three Chinese Claude Code alternatives. Keyword **CODE**.

## STAGE 0 — SOURCE
| field | value |
|---|---|
| door | Alex-authored script, batch of 5 recorded 2026-08-02 |
| comp | ⛔ **NONE ON FILE** — same gap as REPO (reel 85). Flagged, not hidden. |

## LOCKED VO (cut 2026-08-03, 34.7s, EDL `out/vo5/video3-CODE.edl.json`)
> China has killed Claude Code with these three Claude Code alternatives. · First, MiMo Code by Xiaomi. It's
> completely free open source, plus you don't need to register an account to use it. It runs on MiMo v2.5,
> which is better than Claude Sonnet 4.5 on many benchmarks. · Second, Z Code. It uses GLM 5.2, which is
> better than Opus 5 on many benchmarks, plus you get millions of free tokens every single day. · Third, Qwen
> Code. It's a great alternative for those who use Claude Code in the terminal, and it comes with 2,000 free
> requests every single day. · And it's not just these three. There's Kimi Code CLI and CodeArts Snap by
> Huawei that come with generous free limits every single day. You need to try them all. · Comment CODE and
> I'll share the guide immediately.

VO state: markers ✓ clean · duplicate takes ✓ none · longest pause 0.34s (tightest of the five).

## ⛔⛔ STAGE 0.5 — FACT-CHECK IS THE WHOLE RISK ON THIS ONE
**This video names five products and makes eight checkable claims about benchmarks, pricing and limits.**
That is far more exposure than REPO (one product, one claim). The house format puts genuine screenshots on
screen, so a wrong claim becomes a wrong claim *the viewer can see*. And unlike REPO, a benchmark claim that
was true in July can be false in August.

Claims to verify, each blocking:
1. **MiMo Code / Xiaomi** — exists · free · open source · **no account needed** · runs MiMo v2.5 · "better than Claude Sonnet 4.5 on many benchmarks"
2. **Z Code** — exists · uses **GLM 5.2** · "better than Opus 5 in coding on several benchmarks" · "millions of free tokens every day"
3. **Qwen Code** — exists · terminal CLI · **2,000 free requests/day**
4. **Kimi Code CLI** — exists · generous free limits
5. **CodeArts Snap / Huawei** — exists · generous free limits
6. Framing: "China has killed Claude Code" — hyperbole, VO only, ⛔ never an on-screen stat

### RESULT (2026-08-03) — ⛔⛔ TWO CLAIMS ARE FALSE. THIS IS A BLOCKER.

| VO claim | verdict | evidence |
|---|---|---|
| MiMo Code exists, free, open source | ✅ | `github.com/XiaomiMiMo/MiMo-Code`, **MIT** |
| runs MiMo V2.5 (Pro) | ✅ | 1.02T-param MoE, 42B active, 1M context |
| "better than Claude Sonnet on many benchmarks" | ⚠️ **shaky** | beats **Claude Code** — SWE-bench Verified **82 vs 79**, SWE-bench Pro 62 vs 55, Terminal Bench 2 73 vs 69. But ⛔ **all self-reported by Xiaomi, zero independent verification**, and the comparison is against the *harness*, not "Sonnet 4.5" the model |
| "don't need to register a login" | ❓ unverified | could not confirm; do not put on screen |
| Z Code exists, uses GLM 5.2 | ✅ | Zhipu's official coding IDE; GLM 5.2 = 744B MoE, MIT open weights |
| "millions of free tokens every day" | ✅ **understated** | **3 million tokens/day** free |
| **"better than Opus 5 in coding on several benchmarks"** | ⛔ **FALSE** | GLM 5.2 is ~**1 point BEHIND** Opus 4.8 on FrontierSWE, and **62.1% vs 69.2%** on SWE-Bench Pro. It *rivals* Opus at **1/5 the cost** and beats GPT-5.5 on FrontierSWE — but it does not beat Opus. Also the VO says "Opus 5"; every published comparison is against **Opus 4.8** |
| Qwen Code, terminal, 2,000 free requests/day | ✅ | + 60 req/min, 1M context, qwen3-coder-plus/flash. Needs a qwen.ai OAuth login |
| **Kimi Code CLI "generous free limits"** | ⛔ **FALSE** | the free **Adagio** plan explicitly **excludes Kimi Code tools**; Kimi Code starts at **Moderato $19/mo** |
| CodeArts Snap (Huawei) "generous free limits" | ✅ | free **public beta**, PanGu-based |
| "China has killed Claude Code" | ⚠️ hyperbole | VO framing only — ⛔ never an on-screen stat |

⛔ **WHY THIS BLOCKS THE BUILD.** The house GitHub format puts genuine screenshots on screen, so a false
benchmark claim becomes a claim the viewer can check *in the same frame*. And this is the most
benchmark-literate audience on the platform — a wrong SWE-Bench number is the single fastest way to lose
them, and the comment section will carry the correction. **Reel 69 (SERENA) only worked because every claim
checked out first;** that is the precedent.

⭐ **The true numbers are BETTER than the false ones anyway.** "3 million free tokens a day", "MIT open
weights", "a fifth of the cost of Opus", "2,000 free requests a day", "82 vs 79 on SWE-bench Verified" are
all specific, verifiable and impressive ([[specificity-effect]]). The claim that had to be invented is the
only weak part of the script.

## FACECAM — conformed ✅
`public/footage86/clean.mp4`, 1080x1920, **34.9s**, cut from `IMG_3413.MOV` with the VO's own 11 source spans.
⛔ CROP IS PER-SHOOT (law 92) — same shoot day as REPO but solve from landmarks on THIS footage.

## STATUS: ⛔ BLOCKED at Stage 0.5 pending Alex's call on the two false claims. Facecam is conformed and
ready. Recommended fix = re-record two short lines (Z Code, Kimi), which keeps every other beat intact.

---

## SESSION 2026-08-03 (evening) — handoff picked up, build phase

### ⛔ THE FACECAM WAS BROKEN AND IT WAS SHIPPED-LOOKING
`clean.mp4` was **1240 frames against a 34.72s VO that needs 1043**. The container
`duration` field read 34.9s and was believed. Cause: `-ss` before `-i`, once per
span, snapping to the previous keyframe — ~18 stray frames × 11 spans = 198.
Sync drift is progressive, so the opening looked fine and the end was worst.

Also found: **the source is not CFR.** `IMG_3413.MOV` is `r_frame_rate=30` but
`avg_frame_rate=30.0018`; `round(t*30)` selected the wrong frame on **8 of the 11
spans**. Frames are now chosen from the real `pts_time` list using the same
`s <= t < e` rule `atrim` applies to the audio, so picture and sound are cut
identically and cannot drift.

Rebuilt with a new `tools/conform_edl.py` (counts frames itself, exits non-zero on
mismatch). **All three assets now agree at exactly 1043 frames:**

| asset | state |
|---|---|
| `clean.mp4` | 1043f / 34.7667s, verified by `-count_frames` |
| `matte.mov` | 1043f, `yuva444p12le`, regenerated |
| `landmarks.json` | 1043f, **0 no-detection frames** |

Sync proof: conformed source audio vs the locked VO cross-correlates **0.93 at
lag 0**. Geometry proof: the conform is a straight 2:1 downscale (2160x3840 →
1080x1920, no crop) — any shift or zoom scored monotonically worse.

### ⛔ CROP WAS SOLVED AGAINST THE BROKEN DATA
The old `crown 592 / chin 940 / shoulders 1048` were measured on the mis-conformed
file. Alex, on the first sheet: *"i look way too like down low and close versus the
other video"* — measured, card-relative:

| | nose | shoulders |
|---|---|---|
| KEY (shipped) | (487, 97) | 452px |
| old CROP | (528, 270) | 570px — **+173px lower, 26% bigger** |
| new CROP `{1270, -159, -861}` | (487, 97) | 452px |

⛔ CROP numbers are NOT comparable between reels by eye: footage83 is natively
2160x3840, this shoot is 1080x1920, so KEY's `width: 1276` and this file's
`width: 1270` are completely different magnifications. Only the ON-SCREEN nose
position and shoulder width transfer. The derivation reproduces KEY's own shipped
numbers, which is the check `solve_crop.py`'s docstring demands (that tool is
itself broken — do not use its output).

### ⛔ PAINT ORDER: "the orange bar is in front of my head"
`CardProgress` sat at the bottom of the tree, after both cutout copies. KEY draws
`Progress` BEFORE the animation, header and `CardFigure`. Moved. There is no
z-index fix — the cutout must stay above the card and the bar below the cutout.

### CHASSIS IS NOW SHARED, NOT CLONED
`S1Chassis` exported from `CodeS1.tsx`; every hook option renders inside it and
supplies only its animation body. Four copies would drift apart under edits.

### s1 HOOK OPTIONS — ROUND 3 (`src/scenes/hooksCodeS1.tsx`)
Rounds 1-2 (13 options in `hooksCode`/`hooksCodeB`/`hooksCodeFace`) were built on
`src/layout/` and are not comparable — not the same frame. These four are in the
real chassis and **all carry the identical header**, so the only variable is the
animation. Level-1 crossed out first per WORKFLOW.md: *price tags → more price
tags* (the incumbent).

| | concept | different-noun test | level |
|---|---|---|---|
| A WALL | 24 lit sessions blackout, three survive | wall of sessions → three lit windows | 2 (the plan's own beat) |
| B DOOR | invoice-brick paywall punched through | a paywall → a doorway | 3 |
| C BOARD | split-flap prices fall, flaps become the word | a price board → **FREE** | 3 |
| D TOLL | night toll plaza, three barriers lift | a toll gate → an open road | 3 |

Defects found and fixed before showing: **A's "lit" windows were DARKER than the
ground** (#100E0D vs #3B3330) so the wall read as 24 empty holes and the blackout
had nothing to take away — lit is now PAPER; **C's level-3 payoff existed only in
the comment** (flaps just fell off frame = level 2, the exact failure the
incumbent was rejected for); **C cycled invented prices** ('$1204' next to the real
MiMo logo) — a false claim on a paused frame, on a reel already carrying two false
VO claims; **B's arch was implied by missing bricks** and read as a ragged blob.

⛔ STILL OPEN: the companion rides his HAND rather than his shoulder in this take
(same class of defect as reel 82's "companion on his mouth") — pose-dependent,
not yet addressed.

### TOOLING
`--public-dir` with a hard-linked slim public dir: **still 1:42 → 4.9s**, video
84f → 60s. `public/` is 7.9GB and Remotion copied all of it every render; 6.9GB
is other reels' ProRes mattes. ⛔ Their mattes were NOT moved — concurrent
sessions are rendering from them.

## STATUS: chassis correct and verified; awaiting Alex's pick among A/B/C/D for s1.

### ⛔ THE CHASSIS GATE WAS SKIPPED, THEN RUN, AND IT FAILED
`tools/chassis_diff.py` is a standing pre-render gate and four renders went out
before it was run. It failed on **3 of 3** chrome components — `Progress`,
`CardFigure`, `FullFigure` all "missing in target": the bar had been renamed
`CardProgress`, the card figure was inlined into the chassis rather than being a
component, and `FullFigure` did not exist at all.

Nothing about that renders wrong today, which is the point — it is the reel-86
failure mode exactly (a re-implementation compiles, renders, and looks plausible;
it just is not the house format). Now:

    ✓ Progress    99.7%   ✓ CardFigure  100%   ✓ FullFigure  100%   → chrome matches

Fixes: names restored; `Progress` takes `startsAt` and reads against a new
`CODE_DURATION = 1043` instead of the shot's own 84 frames (the bar was filling
completely during s1 — it should read ~8% there); `MATTE_SRC` renamed `MATTE`;
`WALK_CARD`/`WALK` moved to sit BETWEEN `CardFigure` and `FullFigure` because
`grab()` reads a component to the next `};` and their position changes what the
gate compares.

**FULL solved for this shoot** (needed by the FACE beats s2/s10 whichever hook
wins): `{width: 2284, left: -579, top: -904}`, giving nose (582, 819) /
shoulders 813 — Key.tsx records the house full target as (582, 820) / 810, so the
derivation reproduces the reference on a second, independent case.

### ROUND 4 — Alex's note on round 3, and what it actually meant
*"the header needs to be there since the very beginning and the animations need
to be more hierarchcial and obvious to our target aduience ... and more
interesting as well like interesting real world options"*

**⛔ THE HEADER WAS 0.67s LATE AND IT WAS MEASURABLE.** Header band y240-420 at
frame 0 had **0 pixels above L*180**. `Headline`'s default entry is `fade`, a
20-frame interpolation, and line 2 carried `delay: 3`. So the hook opened on an
empty frame at the exact moment the viewer decides to stay. Fixed with a
**negative delay** (`delay: -20`) — runs the same interpolation to completion
before frame 0 — rather than editing `patterns/headline.tsx`, which reels 82/83/84
all import and would have been silently restyled. After: **35,665 bright px**.

**⛔ ROUND 3 WAS ONE MECHANIC IN FOUR COSTUMES** ([[reel-idea-generic-diagnosis]]):
wall / paywall / board / toll were all "a thing that charges you, disabled", and
all four moved EVERYTHING at once (24 windows, 5 brick rows, 4 board rows, 4
lanes) against [[reel-motion-hierarchy]]'s one-subject rule. Round 4 varies the
INTERACTION PARADIGM and gives each ONE hero object filling the band:

| | paradigm | hero |
|---|---|---|
| E TERMINAL | substitution — the session handed over in place | the window the audience actually has open |
| G BELT | dethroning — the champion's plate unscrewed | matches the VO's "killed" framing |
| H VENDING | dispensing — it just gives you the thing | one machine |
| F PUMP | accrual — a running cost stopped | ⛔ weakest; does not read as a pump |

Defects caught before showing: **E opened on an EMPTY terminal** (same defect as
the late header, other half of the frame — fixed with negative `at` so frame 0 is
already mid-session); **E's marks printed on top of the terminal text** (window
narrowed 888→744 so the right column is theirs); **G's fact text overflowed its
plates** at 30px (set to fit, `short` field).

⛔ **DID NOT SWEEP THE TEMP DIR** despite disk hitting 89% / 22GB. `ps` showed
THREE other sessions' renders live (ARMY, Hook86A, Repo) each holding an 8GB
webpack bundle touched seconds earlier — `rm -rf T/remotion-*` would have killed
all three ([[mac-mini-disk-pressure]]). Disk recovered to 39GB on its own when
they finished, exactly as that memory predicts. Contention also caused two render
batches to time out; that was the machine, not the compositions.

### ROUND 5 — 10 FRAME-0 CONCEPTS (stills only, no animation)
Alex: *"none of these ideas are good ... give me like 10 more ideas actually good
ones"* + *"just give me the first frame ... dont need to build out the full
animations"*.

⛔ **THE PATTERN ACROSS ALL 19 REJECTED OPTIONS.** Listed together — tags, shelf,
podium, prices, versus, flags, lineup, grave, shatter, stamp, crown, terminal
wall, brick paywall, split-flap board, toll plaza, terminal, pump, belt, vending
— almost every one is **"a thing that charges you, disabled"**. One mechanic in
nineteen costumes ([[reel-idea-generic-diagnosis]]). And the reel is not about
money: the VO says *CHINA* killed Claude Code, and **not one option was Chinese**.

Round 5 went at the subject instead: CHINA AS PLACE (port · factory ·
Huaqiangbei · rail · mahjong · abacus · Go) and BUILDER-NATIVE (git fork ·
silicon wafer · server hall).

**RESULT — 2 of 10 work.**

| verdict | option |
|---|---|
| ⭐ **4 GIT FORK** | main line dead-ends on a red X, three branches run on. The GRAPH makes the claim. Instantly legible to this audience |
| ⭐ **10 GO BOARD** | three black stones have already surrounded a white group. The POSITION makes the claim — the only option where the image argues rather than labels. Warm board = the only real value contrast in the set |
| ~ salvageable | 5 WAFER, 8 ABACUS — object reads, but the mark plates sit ON it and collide |
| ⛔ starved | 1 PORT, 2 FACTORY, 3 MARKET, 6 RAIL, 7 MAHJONG, 9 SERVER HALL |

⛔ **WHY SIX FAILED, MEASURED.** Edge density in the animation band vs the
shipped KEY frame: KEY **3.00%**, Port 1.95, Factory 1.99, Market **1.35**. The
band is only 680px tall and a whole PLACE will not establish in it at that
density — the crane became two thin posts, the factory a dark bar.

⛔ **AND THE SHARED FLAW EVEN IN THE GOOD ONES:** nine of ten still resolve to
*three white cards carrying a logo, in a row*, which is the level-1 trap — "three
alternatives" illustrated literally is three things in a row. Fork and Go escape
it because the ARRANGEMENT carries the claim.

### ⭐ FIRST FULL RENDER — `out/CODE_v1.mp4`, 1043 frames, 34.8s, 50.9MB
Alex: *"give me the full video render here for this video"*. It was a BUILD, not
a render — only s1 had ever existed. Four things had to be made first:

1. **Captions.** Whisper `base.en` ran, and was then NOT used directly: it wrote
   `jlm 5 2` (GLM 5.2), `quen code`, `code art snap`, and — fatally — **"Come at
   Code"** for the CTA whose keyword is CODE. `tools/code_words.py` aligns the
   true script onto whisper's onsets with difflib (timings survive, text is
   authoritative). 10 words repaired.
2. **Shot table.** `tools/code_shots.py` finds each shot's opening words in the
   VO's own timings; asserts the 11 shots tile 1043 frames exactly.
3. **ONE CLOCK, ONE `<Audio>`.** Reel 83's RUN_OF/RUN_FRAMES machinery exists
   because its picture and audio are different clocks — three logged bugs came
   from it. CODE has no such split (VO *is* the cut; facecam conformed from the
   same spans), so the reel plays one audio element and a shot's video trim is
   its own start frame. Nothing can drift.
4. **Ten shot bodies**, s2-s11, from the plan. s1 = the GIT FORK (round 5's best).

**Fact-check enforced ON SCREEN:** neither false VO claim appears. s5 carries
MIT / 3M tokens / "1/5 the cost of Opus" instead of the Opus comparison; s9
NAMES Kimi Code without calling it free; s4's 82-vs-79 is labelled "Xiaomi's own
published figures".

Defects caught in the 9-frame spot-check and fixed BEFORE rendering: s4's bar
labels sat behind his head (chart lifted to a BASE derived from the card, not
guessed); s6's counter collided with his crown (~y1052) — shot compressed and
verified with a measurement (0 px >190 below y1040).

**Verified on the output:** counted 1043 frames · audio cross-correlates 0.978
against the locked VO · onset delta **+43ms = 1.3 frames**, which is AAC encoder
priming (render runs 96ms longer than the source wav), not picture desync, and
is under the ~100ms threshold Key.tsx cites for lip sync.

⛔ STATUS: **WIREFRAME stage** by the repo's own rule (first render = wireframe).
No SFX, no music bed, no per-shot camera/flow work, s1 concept not yet approved.

### ⭐ CODE_v2 — full reel rebuilt to the workflow. 1043f / 34.8s / 55MB
Alex: *"the logos ... should come out of the claude logo in the center"* + *"build
out the full reel here now based on the github video editing workflow"*.

**s1 = THE ASCENT** (rounds 8-11, after 31 rejected hooks). Claude rises out of a
lit column emitting glowy tapered ticks, a shockwave leaves it, and the three are
BORN AT ITS CENTRE and thrown outward on arcs with streaks behind them. Earlier
they rose from below at their final x, which read as three unrelated objects
arriving; born-from-centre makes the causal claim with motion instead of copy.

**THE SIX TEXT-CARD SHOTS ARE GONE.** Every one broke law 1 ("text is a LABEL on
a visual, never the visual itself") and law 14 ("animations are TEXTLESS by
default"):

| | was | now |
|---|---|---|
| s3 | repo card, 3 text rows | a press STAMPS MIT onto a package; ink burst, lid springs |
| s5 | label/value rows | a BALANCE — heavy pan drops, beam levels at 1/5 the cost |
| s6 | grid of cells filling | a HOPPER overflowing past the brim |
| s8 | a progress bar | a TICKET DISPENSER; drum spins back on reset |
| s9 | two subtitle cards | two more CRATES on the same belt |
| s11 | a bulleted list | the GUIDE UNFOLDS, a tag drops carrying CODE |

s4 was already rebuilt as the bench race. **Fact-check still enforced on screen:**
s5 uses only the verified "1/5 the cost", never the false "beats Opus"; s9 NAMES
Kimi Code without calling it free.

⛔ **THE RECURRING DEFECT THIS SESSION: TEXT UNDER THE CROWN.** Caught again in
the v2 spot-check on s5, s6 and s9. The crown sits at ~y1052 on this crop and
anything readable below it is eaten by his head. It has now bitten five times
(s4 labels, s6 counter, S1Limit boot lines, F2Ring readout, and these three).
⭐ Worth a gate: assert no glyph below y1030 in the animation band.

⛔ **DENSITY IS STILL UNDER THE HOUSE BAR.** Hook frame 0 measures 1.70% edge
density against KEY's 3.00%. Glow adds AREA, not EDGE — more light cannot fix
it; only hard-edged mass can.

## STATUS: full cut renders, chassis gated, fact-check enforced. NOT shipped —
no SFX, no music bed, no camera/flow pass, density under bar.

### ⛔⛔ THE TWO NOTES THAT SUPERSEDE EVERYTHING ABOVE (end of session 2026-08-05)

**1. THE SPRITE IS `src/scenes/CharacterSprite.tsx`, NOT `cube.mov`.**
Alex: *"not the 3d claude guy, the 2d animated claude sprite"*. `cube.mov` is the
3D cube that rides his shoulder via `patterns/companion.tsx`. The 2D sprite is a
drawn SVG — a glowing orb with two eyes, ACCENT #FF4D00 / GLOW #FF9A5C. Because
it is CODE, not video, it can be posed, squashed, walked and acted frame by
frame. `cube.mov` cannot. Every future character animation uses CharacterSprite.

**2. ⛔ EVERY SHOT NEEDS A BEGINNING → MIDDLE → END, NOT A POSE.**
Alex: *"all of these dont tell a story or like beginning to end sort of action
for each of those animations nor are they interesting at all"*. This is the
single most repeated failure of the whole session and it explains the rejects
better than any of the diagnoses attempted along the way (density, corporate,
outlandish, paper-based). Every variant offered — 60+ of them — was ONE STATE
drawn well: a padlock that is open, a tray that is full, a sprite holding a
crate. None had an ARC. The shots that survived review (s4 Marked Test, C1
comment bubble) both have one: blank paper → graded; empty box → the word typed.

⭐ THE TEST, for every future shot: *say the shot out loud as three beats —
"it starts X, then Y happens, so it ends Z". If Y is missing, it is a pose, not
a shot,* no matter how well it is drawn or how dense it measures.

## STATE AT HANDOFF
| | |
|---|---|
| LOCKED | s4 = Marked Test · s11 = C1 comment bubble |
| VO | ✅ normalised to −16 dBFS (was −32, which broke the whole mix) |
| SFX | ✅ 42 cues, all solved to −14 dB under dialogue, 0 over ceiling |
| captions | ✅ y946, above the crown — band is now y470..900, NOT 1150 |
| shot table | ✅ generated, tiles 1043 frames exactly |
| chassis gate | ✅ Progress/CardFigure/FullFigure match KEY |
| ⛔ OPEN | s1, s3, s5, s6, s7, s8, s9 all still need arc-based rebuilds |
| ⛔ OPEN | last full render is CODE_v2 + the half-res preview; v3 never rendered |

### OPEN NOTES AT HANDOFF (Alex, final message of the session)
1. ⛔ **"the animations from 8 seconds on are horrible"** — 8s = frame 240 = s4.
   So the note covers s4 onward: **s4, s5, s6, s7, s8, s9, s11**. Note that s4
   (Marked Test) was PICKED by Alex earlier and is now called out for lacking
   movement — the concept passed, the ANIMATION did not. Two papers that sit
   still while a number appears is a pose with a value change, not an arc.
   ⭐ Apply the same three-beat test to s4 that was applied to s3.
2. ⛔ **"better sfx design throughout"** — the 47 cues are LEVEL-correct (all at
   −14 dB, audit green) but they are one-shot markers. What is missing is the
   design: no bed movement, no risers into reveals, no J-cut sweeps at scene
   changes, nothing layered except s3's new latch+snap pair.
3. ✅ **Switch throws fixed**: 18-frame swings read as a lever being lowered
   gently. A bolt is THROWN — 6 frames (0.2s) now, with the saved frames going
   into the dwell after it. Cues retimed to 4.80 / 5.73 / 6.60 and a metal snap
   layered 20ms under each latch (rule 1: movement + texture).

## THE STANDARD, RESTATED FOR WHOEVER PICKS THIS UP
Every shot: `src/character/Mascot.tsx` acting, three beats (starts X → Y happens
→ ends Z), inside the y470..900 band, real product marks in frame, curiosity-loop
header, five variants shown as 3-beat still strips at --scale=0.45 before build.

### ✅ SINGLE HEADER, EVERYWHERE (done) + ⛔ THE 35-VARIANT BRIEF (not started)
Alex: *"for each of the headers there's like a subheader. Remove that. Just have
one header."* — DONE globally. `H()` in Code.tsx now ignores its `small`
argument (kept so the 11 call sites still compile AND so the sub-copy survives
in the file as a record of what each shot claims). Subheaders stripped from all
8 variant files too.
⛔ That strip left `,],` fragments in 6 files — fixed. The 2 remaining tsc errors
(`Pilot.tsx`, `system/pack.ts`) are ANOTHER session's files, not this reel's.

## ⛔ THE OUTSTANDING BRIEF — 7 shots x 5 variants = 35 first frames
Alex: *"the animation at nine seconds, like the papers, is just way too boring
... same with the animation at twelve seconds ... for each of these animations
give me five variants ... build out the first frame image of each"*.

9s = frame 270 = **s4** · 12s = frame 360 = **s5**. Everything from s4 on:
**s4, s5, s6, s7, s8, s9, s11.**

⛔ NOTE ON s4: Alex PICKED the Marked Test, then called it boring. The concept
passed; the ANIMATION did not. Two papers sitting still while a number fades in
is a pose with a value change. It needs the s3 treatment — the Mascot physically
grading them, three beats.

### The standard every variant must meet (all learned the hard way this session)
1. `src/character/Mascot.tsx` ACTING — not cube.mov, not CharacterSprite
2. THREE BEATS — "starts X, then Y happens, ends Z". No poses.
3. band y470..900 (the caption at y946 owns everything below)
4. the real product marks IN FRAME — a number with no face is trivia
5. ONE header line, no subheader, a curiosity loop where it fits
6. deliver as FIRST-FRAME stills at --scale=0.45, five per shot, before building
7. objects/scenes, never flat icons, never bare numerals, never paper-only

---

## SESSION 2026-08-05 (late) — ⭐ THE 35 ARE BUILT AND GATED

`src/scenes/codeVars.tsx` · 35 variants · registered as `VA1..VG5` in
`src/RootCode.tsx` · 140 stills in `out/vars/` · 7 sheets in `out/vars/sheets/`.

### ⛔ DELIVERED AS 3-BEAT STRIPS, NOT FIRST FRAMES — and that was deliberate
The brief said "the first frame image of each". But the note directly above it in
the handoff — the one that explains ~65 rejections better than any other
diagnosis — is that **every rejected variant was ONE STATE DRAWN WELL**. A single
frame is precisely the artefact that cannot answer "is this a pose or a shot".
So each variant is a ROW of four samples across its own shot length, read left to
right as *starts X → Y happens → ends Z*. A row that looks the same in all four
cells is a pose and can be rejected on sight. Superset of what was asked; same
render cost, since the bodies had to be animated anyway for the pick to be
buildable.

### ⭐ EACH EXPORTS A BODY *AND* A PREVIEW, AT THE SHOT'S REAL LENGTH
`A1Body` is a raw `<svg>` for `Shot` to nest; `A1` wraps it in a chassis cloned
from `Shot` (⛔ **with the real `SyncedCaption`** — every earlier variant sheet
was judged in a frame 430px taller than the one it will live in). Compositions
run at `LEN.s4`=117 … `LEN.s11`=61, not a 45-frame preview clock, so a pick
transfers without retiming — s3's log records that exact re-tune.

### ⛔⛔ THE PRODUCT MARKS WERE UNREADABLE AND HAD BEEN FOR THREE ROUNDS
`logos/xiaomi.png` is a 460x460 **fully opaque black tile**; its ink is **406x56,
aspect 7.25, 3.8% coverage**. Drawn into the house `<circle r>` plate it sized by
width and rendered ~15px tall — a black disc where MiMo's identity should be, in
the shot whose whole claim is "MiMo beats Claude". Same for `zhipu`, `moonshot`.
`tools/trim_marks.py` reduces each to its ink on transparency and writes
`marks.json`; `Mk` now takes `r` (half-height) or a `w`/`h` BOX and sizes the
badge to the mark. See [[logo-assets-are-padded-wordmarks]].

### ⭐ THE BAND GATE — `tools/vars_band.py`, calibrated on APPROVED frames
A colour-deviation metric flagged 68/140 **and failed the approved s3 payoff**
(4.80% ceiling / 5.64% floor — its aura crosses both boundaries and always has).
Edge density scores that same frame 0.27% / 0.42%: a glow has no edge, a paper
rect has nothing but. Budget 1.0%. s1 is recorded EXEMPT and measured (9.74%
floor — its lit column is environment, approved that way).

At 1.0% the gate found **35 real structural overflows in 14 variants** — decks at
y928, drums at y933, a chute entering at y450, a fan of copies reaching y960, and
⛔ **the C1 climber, whose crown reached y430 because a sprite's head is a full
`size` above the feet it is placed by** (the exact failure `ceiling_check.py`'s
docstring already warns about). All fixed geometrically, not by clipping —
clipping would just hide it as a cut-off object. **Now 140/140 inside the band.**

### DEFECTS FOUND ON THE SHEETS AND FIXED BEFORE SENDING
| | was |
|---|---|
| VA1 | mascot stood INSIDE the right sheet's edge; last beat left both papers equal |
| VB3 | "1/5 THE COST" ran to x1062 and printed as "/5 THE COS" |
| VB5 | 150px trees on a thin bar — starved |
| VC3 | silo drawn as an OUTLINE, so it read as a doorway; the sun rose through the mascot |
| VD5 | a hoist line + a 600-wide hood at -104° drew as two diagonal sticks. Rebuilt on a VERTICAL hinge — opening it now costs no height |
| VF1 | cabinet painted BEFORE the drawer, so nothing occluded it and it read as boxes sliding over the floor |
| VF5 | 14 cards overlapped into one white block that read as a printer |

### TOOLING
`tools/vars_stills.mjs` — bundles ONCE and calls `renderStill` 140 times.
⛔ `npx remotion still` in a loop re-bundles every time: 5.3s each, of which the
render is under a second. 140 stills went from ~12min of re-bundling to ~6min
wall clock (contended box, load 6.2). `tools/vars_sheet.py` builds the sheets.

## STATUS: ⏳ AWAITING ALEX'S PICK, one per shot (s4 s5 s6 s7 s8 s9 s11).
Once picked: import `<X>Body` into Code.tsx, replace the `S4`..`S11` bodies,
re-run `chassis_diff.py` + `audit_sfx.py`, then `patch_render.py` the changed
shots only. ⛔ Still open after that: SFX design (the 52 cues are level-correct
but are one-shot markers — no bed movement, no risers, no J-cut sweeps), and v3
has never been rendered at full res.

### ⭐ PICKS IN, 2026-08-05 — and s9 rejected WHOLESALE
Alex: VA2 · VB2 ("pretty good but needs more interesting components/color") ·
VC4 · VD2 · VE1 · VG4 · **"None of the VF options are good"**.
Five wired into `Code.tsx` (`S4`=A2Body … `S11`=G4Body); the old bodies are gone,
each replaced by a one-line reference with the reason recorded above it.

⛔ **ALL FIVE s9 OPTIONS FAILING AT ONCE IS THE DIAGNOSIS, NOT THE VERDICT.**
Drawer opens → more. Curtain opens → more. Lookout sees → more. Lights come on →
more. Rolodex spins → more. Every one was *a hidden set is revealed* — ONE
MECHANIC IN FIVE COSTUMES, which is precisely the failure this log already
records for rounds 3 and 5 ("a thing that charges you, disabled", nineteen
times) and which [[reel-idea-generic-diagnosis]] exists to catch. I varied the
prop and left the paradigm alone. Kept as `RF1..RF5Body`, unregistered.

Round 2 varies the PARADIGM, and nothing in it is a reveal:
printing (tape) · processing (turnstile) · accumulation (pile-up) ·
geography (map) · packing (case). ⛔ No stamp — s11's pick IS a stamp and law 47
says an animation appears exactly once in a reel.

Defects caught on the round-2 sheet before sending:
| | was |
|---|---|
| VF1 | he stood away from the tape — a bystander to his own shot. Torn end now in his hands |
| VF4 | ⛔ the landmass was four lazy quadratics and read as an orange kidney, carrying none of the CHINA premise it was chosen for. Characteristic silhouette + a legend |
| VF5 | the lid was a 30px bar at -64° — a diagonal STICK, the same failure that killed the first VD5. Real panel, 46° of travel, and he leans on it |

VB2 palette pass: the note was right and measurable — a grey crate, a grey
counter, a grey truck and a dotted line, four values of one warm neutral. Now
timber and steel on the crate, an amber hazard stripe on the bay floor, a lit
shutter with the depot behind it, an orange truck, a strap and a sealed licence.
⛔ Variety is in MATERIAL, not in added hues — the budget still runs one orange.
⛔ Crate and truck were on separate transforms and leaned apart as it tipped,
and the truck's rails were painted OVER the mark; one rig now, frame behind.

### ⛔⛔⛔ s9 ROUND 2 ALSO REJECTED WHOLESALE — ten options dead
Alex: *"VF options arent good"* (VB2 confirmed good and stays).

⭐ **THE DIAGNOSIS, TAKEN FROM WHAT HE ACTUALLY PICKED.** All six accepted shots
are the same sentence: **the mascot performs ONE physical action on ONE hero
object, and that object visibly changes state.**

| | action | change |
|---|---|---|
| s4 VA2 | he slams a button | the board reorders |
| s5 VB2 | he tips a hand truck | the crate leaves |
| s6 VC4 | a chute dumps | the barrow overflows |
| s7 VD2 | he threads a fitting | the run flows |
| s8 VE1 | he turns it over | the glass is full |
| s11 VG4 | he brings a stamp down | the slip reads CODE |

Every one of the ten dead s9 options illustrates a **QUANTITY** instead — "there
are more of them". ⛔ A quantity has no hero object, so all ten resolved into
many small repeated elements, which fails [[reel-declutter-single-hero]] and
[[reel-motion-hierarchy]] BY CONSTRUCTION, and leaves the mascot a processor or
a bystander rather than the agent of one action. Round 1 varied the prop and
kept the paradigm; round 2 varied the paradigm and kept the *subject*. Neither
touched the thing that was wrong.

⭐ ROUND 3 STOPS ILLUSTRATING "MORE". The VO names TWO PRODUCTS, so they get the
treatment the other three products got. The three already-known ones are built
INTO the same object, so "as well as these three" costs no extra drawing:
toaster (two pop up) · nest (two hatch) · cone (two more scoops) · hob (he
lights two more rings) · jukebox (two more records drop). Round 2 kept as
`QF1..QF5`, round 1 as `RF1..RF5`, both unregistered.

⛔ Band gate caught 6 more overflows in the new set, all the same class: **a
stack that GAINS HEIGHT per item has to be budgeted from the ceiling down, not
from its base up** — five ice-cream scoops at r62/spacing74 put the top crown at
y338, and a 132px card given a 96px pop reached y431.
⛔ And one wasted render cycle: a patch script asserted and exited BEFORE its
`write_text`, so an earlier "fix" never reached the file and the same 6.71%
failure was re-measured. **Write the file per edit, or assert before mutating.**

### ⭐ THE OPTION WORTH PUTTING ON THE TABLE: s9 MAY NOT BE A GRAPHIC
Ten rejected options is itself evidence. s9 is the LONGEST shot in the reel at
179f / 6.0s, and its line is *"you need to try them all"* — direct address, the
most natural FACE moment in the whole cut. s2 and s10 are already FACE, so the
format exists. Either the whole shot goes FACE (making a 210f run with s10), or
it splits: graphic for the two names, FACE for "try them all" — the shot table
is generated by `tools/code_shots.py` from the VO's own word timings, so a split
is a regeneration, not a hand-edit.

### ⛔ ROUND 3 REJECTED — and the note was measured, and the obvious reading was WRONG
Alex: *"need simpler concepts because these concepts are a bit too complicated
too many moving parts like simple to understand but visually genius"*.

I counted drawn primitives per body, expecting that to be it. It is not:

| | |
|---|---|
| PICKED | A2 15 · B2 **29** · C4 10 · D2 11 · E1 12 · G4 11 — median 12 |
| round 1 | median 11 · round 2 median 13 · round 3 median 12 |

Same range on both sides, and the busiest body in the whole file is B2 — the one
he asked to be made RICHER. `tools/part_count.py` keeps the numbers and the
conclusion. ⭐ **What separates them is DECODE STEPS.** Every accepted shot IS
its claim (a scoreboard IS a benchmark; a flipped hourglass IS a refill; a stamp
IS the keyword — 0 steps). Every s9 option is a METAPHOR FOR its claim
(toaster → pops up → ready; nest → eggs hatch → new arrivals — 2 steps), and the
decode is what reads as "complicated" no matter how few shapes it is drawn with.
⛔ The gate is a sentence, not a count: *say the image out loud — is it the
claim, or a metaphor FOR the claim?*

### ROUND 4 + ⭐ THE STRUCTURAL FINDING THAT MATTERS MORE
Round 4 removed the metaphor layer (iceberg · pull-back · dominoes · lit field ·
magnet) and it exposed the real problem: **every genuinely striking idea for
"there are more" wants VERTICAL room — iceberg, pull-back, stack, scale contrast
— and the animation band is 1080x430, a wide letterbox.** In a band that shape a
list can only be a ROW, which is why twenty options across four rounds all
resolve into a row of boxes. ⛔ The claim fights the frame; that is not something
a fifth round of concepts can fix.

So `F6` was built: **s9 as a FACE beat**, on the shipped FullFigure chassis, with
the two products as chips that slide in as he names them. His line here is *"you
need to try them all"* — direct address, the most natural FACE moment in the cut,
and s2/s10 are already FACE. Sent as a sixth row so it can be compared rather
than argued about.

⛔ Band gate caught the SAME trap a third time: anything the mascot STANDS ON
adds his full height to that surface (on the iceberg tip at y486 his crown hit
y336). And VF2 is the one legitimate use of a clip — a pull-back begins inside
its subject, so the band is the viewport, and a grid cut by the viewport edge
says "more beyond the frame", which is the claim.

### ⭐ s9 = VF1 THE ICEBERG (round 4), + the CodeArts mark that was never there
Alex: *"VF1 is pretty good, but there needs to be the codearts snap logo i
included there as well which is the issue here"*.

⛔ **HE WAS RIGHT AND IT HAD BEEN WRONG IN ALL TWENTY VARIANTS.** Kimi carried a
real mark; CodeArts Snap carried the WORD "SNAP" in a box. Law 56 half-applied
across the same frame reads as a placeholder, and it never errored — the asset
simply was not in `public/logos/` (a set of GitHub org avatars; Huawei is not a
GitHub org in it), and nothing on the whole machine matched codearts/huawei/pangu.

It was on **Drive** as `huawei.svg` (simple-icons, 1.3KB), verified before use by
its own `<title>Huawei</title>` — and the parent mark is correct here for the
same reason MiMo Code uses Xiaomi's: the VO says "CodeArts Snap BY HUAWEI".
⭐ **INLINED, not rasterised** — there is no rasteriser on this box (no cairosvg,
rsvg-convert or inkscape), and a single path inlined stays sharp at any size and
tints like type. `Mk` now takes either a trimmed PNG or an inline path.
Every live CodeArts slot updated; the 11 remaining "SNAP" texts are all in the
rejected RF/QF/PF sets.

VF1 rebuilt with it: mass widened to nearly the full band and taken to the floor,
two facets so it reads as ice, light coming down through the water, and a
gradient into the dark at the bottom — ⛔ a hard cut at the band floor reads as a
cropping bug, which is the exact thing `band_overflow.py` exists to catch.

⛔ The band gate now NAMES its FACE exemption (`VF6`) rather than passing it
silently — on a FACE beat the figure fills the frame and y470..900 is his chest.

## STATUS: all seven shots picked.
s4 VA2 · s5 VB2 · s6 VC4 · s7 VD2 · s8 VE1 · **s9 VF1** · s11 VG4.
Six are wired into Code.tsx; s9 still to wire, then patch-render.

### ⭐ CODE_v3 RENDERED — first full render with all seven new bodies
`out/CODE_v3.mp4` · 1080x1920 · 1043 frames · 34.816s · 54MB · h264 + AAC 48k.

Verified, not assumed:
| check | result |
|---|---|
| frames, **counted** with `-count_frames` | **1043** — exact. ⛔ never the header field; it lied once and cost a whole re-conform |
| envelope cross-correlation vs the locked VO | **0.977** at lag -40ms |
| first-onset delta | **40ms** — under the ~100ms lip-sync threshold |
| render vs VO length | +96ms — AAC encoder priming, the same figure v1 measured, not picture drift |
| chassis gate vs Key.tsx | Progress 99.7% · CardFigure 99.8% · FullFigure 100% |
| band gate | 140/140 stills inside y470..900 (VF6 FACE exempt, named) |
| asset paths | 8 literal + 51 SFX cues / 31 distinct files — all resolve |

⛔ **A VALIDATOR THAT MATCHES NOTHING PRINTS A PASS.** The first SFX path check
used `\{f:\s*'...'` but the cues are written `{at: ..., f: ...}`, so it found
**0 cues and reported "0 missing"** — a green line for a check that inspected
nothing ([[reel-tools-hardcoded-to-old-reel]]: a SKIPPED check must never print
as a pass). Caught only because 0 cues was implausible. Assert a plausible
minimum count, not just an empty failure set.

⛔ **THE SFX ARE NOW MISTIMED AND THE AUDIT CANNOT SEE IT.** All 51 cues remain
level-correct (0 over the ceiling) because `audit_sfx.py` compares PEAK against
the VO's RMS — it knows nothing about what is on screen. But they were solved
against the OLD bodies: cues still mark a ticket dispenser tearing and a hopper
filling, and neither exists. **Sound design must be redone against the new
animations before this ships.**

⛔ DISK was at **94% / 12Gi** before the render. 29GB of it was stale Remotion
webpack bundles with **0 live renders** (`ps | grep .bin/remotion` first, per
[[mac-mini-disk-pressure]]) — swept, 39Gi free, re-measured.
⛔ `ffprobe` is not on PATH; the bundled one at
`node_modules/@remotion/compositor-darwin-arm64/ffprobe` needs
`DYLD_LIBRARY_PATH=.` and cwd in that directory or it dies on libavdevice.

## STATUS: v3 renders, gated, sync-verified. NOT SHIPPED — sound design is stale.

---

## SESSION 2026-08-06 — SIX NOTES ON v3, ALL DIAGNOSED BY MEASUREMENT

### 1 ⭐ "MY HEAD TURNED AWAY AT AROUND TWO SECONDS" — and it was a POSE fault
Frame-differencing the opening reported its two biggest spikes at f87 and f126 —
which are simply the two shot CUTS, both correct — and scored the offending
frames as ordinary. ⛔ **A wrong pose held still is invisible to a frame-diff**
([[measure-pose-not-motion]]), and this is the third time that has bitten.

`landmarks.json` + pixels answer it exactly. Eye-region contrast at the landmark
eye centres across f84..f92: **39 · 33 · 32 · 31 · 32 · 22 · 33 · 39 · 42** —
the FACE beat opened at f87 two frames before a blink bottomed out, with yaw at
the window's worst (-0.057). New `tools/pose_check.py` measures yaw, pitch and
eye openness at every FACE cut.

⛔ **AND A YAW-ONLY SCORE RECOMMENDED THE BLINK.** The first version pointed at
f89 — the frame where the eyes are MOST shut — because his head is squarest
there. A gate that names the worst frame in the window is worse than no gate;
the eye term is now weighted to dominate.

⭐ **THE GATE THEN FOUND A SECOND ONE NOBODY REPORTED:** s10 scored 0.90 against
s2's 0.12, opening inside a long partial blink (28-31 across f946..f956).

Fixed in `tools/code_shots.py` with a documented `NUDGE` table — s2 +5 (f87→92),
s10 -7 (f951→944) — never by hand-editing the generated JSON. ⭐ **Sync is
untouched**: picture and audio are one clock and a shot's trim IS its start
frame, so a boundary move only changes WHICH shot draws those frames. The blink
now happens inside s1's small card crop instead of full screen. Still tiles 1043.

### 2 s3 — the MiMo mark now sits on the safe BODY (not the door, which slides)
60px of headroom between the band ceiling and the door top; plate runs y+8..y+56.

### 3-5 THE THREE ANIMATION NOTES, MEASURED AGAINST APPROVED SHOTS
Mean / peak inter-frame motion in the band, approved refs: **s3 2.65 / 9.64**,
s1 4.76 / 11.21.

| note | was | cause | now |
|---|---|---|---|
| "19s very choppy" (s7) | 1.68 / 4.27, 3 still frames | 34 of 104 frames moved the fitting 60px, then it snapped — a dead hold reads as chop | travel starts at frame 0 and never stops; carry/seat/turn/flow OVERLAP; a swinging bracket as the constant layer. 0 still frames |
| "23s way too fast" (s8) | 2.17 / **11.89** | ⛔ **the EASING, not the duration** — `EASE` is bezier(.16,1,.3,1), ~80% done in the first quarter of its window. Sand does not fall like that | drain is LINEAR over 56 frames, flip gets 26 with a settle; individual grains so every frame moves |
| "30s just floating still" (s9) | **1.27 / 1.86** | peak barely above mean = nothing ever happens | **2.36 / 11.41, 0 still** |

⛔ **ADDING BUBBLES TO s9 DID NOT FIX IT (1.51) AND THAT IS THE LESSON.** The
fault was structural, not ambient: every event was over by f40 and the remaining
4.4s of a 5.7s shot was a hold with sparkle on top. The shot is now a **slow
descent** — the camera sinks past the tip and the mass keeps coming: Kimi, then
CodeArts, then more marks that are never named. Continuous motion because the
REVEAL is continuous, and the descent IS the claim.
⛔ Travel is budgeted so nothing named leaves: at 700px both marks were off the
top by f84. Band is 430 tall and Kimi sits at WL+200, so the cap is ~265.

### 6 SOUND — 51 cues rewritten to 70, and a level SOLVER
⛔ The old list was solved to the OLD bodies and **the audit could not see it**:
`audit_sfx.py` compares PEAK against the VO's RMS, so it stayed green while s3
fired a STAMP over three bolts, s8 tore four tickets at an hourglass, and s9
landed two crates on an iceberg. **A level audit is not a sync audit.**

New `tools/solve_sfx.py`. ⛔ Its first version computed its own peak-vs-voice
figure and **disagreed with the standing audit by up to 7 dB** — solving a cue to
-14 that the audit called -7.3 and TOO LOUD. Two tools reporting different
numbers for one quantity is worse than one. It now DRIVES the audit, applying
its suggested gains until nothing is over the ceiling (converges in 2 passes).
⛔ Two decode bugs on the way: this ffmpeg has **no raw muxers at all** (neither
`f32le` nor `s16le`), and the first version swallowed that into `return None`
and reported **36 MISSING FILES that were all present**. A decode failure must
never be reported as absence.

Hook (s1) went 8 cues → 14, built in LAYERS: a sub under the riser, a
movement+texture pair on each of the three arrivals, a tail. **70 cues, 0 over
the ceiling.**

### ⭐ CODE_v4 RENDERED AND VERIFIED — `out/CODE_v4.mp4` · 1043f · 34.816s · 55MB
| check | result |
|---|---|
| frames, **counted** | 1043 — exact |
| cross-correlation vs locked VO | **0.976** |
| first-onset delta | **30 ms** (was 40) — under the 100ms threshold |
| length delta | +96 ms, AAC priming, unchanged from v1/v3 |
| chassis gate | ✓ 3/3 vs Key.tsx |
| pose gate | s2 0.12 · s10 0.02 (were 0.41 / 0.90) |
| band gate | 140/140 |
| SFX audit | 70 cues, 0 over the ceiling |

Spot-checked at the five frames Alex named: f92 opens the FACE beat eyes-open;
f210 carries the Xiaomi MiMo plate on the safe body; f600 the fitting is
mid-travel rather than parked; f700/f760 the hourglass drains progressively
(1361 → flip → 2000); f830/f920 the iceberg descent keeps both named marks in
frame with unnamed ones entering below.

## STATUS: v4 is the current cut. Sound is now authored TO this picture.
⛔ Remaining before ship: no camera/flow pass between shots, and the bed has not
been re-checked against the new cue set.

### SESSION 2026-08-06 (cont) — EIGHT ELEVATION NOTES ON v4
⭐ **THE PRINCIPLE IS IN HIS FIRST NOTE AND IT APPLIES TO ALL OF THEM:** *"every
single time the switch gets flipped, something should happen."* Every rejected
shot had an actor doing a thing and nothing ELSE in the frame responding.

| shot | note | what was actually wrong | fix |
|---|---|---|---|
| s3 6s | "the safe needs to be shaking" | a lever swung and a lamp changed colour — the lever moved, the safe did not, so nothing accumulated over three throws | each throw KICKS the whole body (decaying, so three read as three), drops dust from the seams, flashes the lamp, and the BOLT ITSELF withdraws from the jamb |
| s4 10s | "take it to the next level" | a box, a two-row list, a button that changed colour | marquee chase (constant layer), CRT scanlines + flicker, the cabinet takes the hit, the score COUNTS instead of appearing, the beaten row flashes before dropping, starburst on the new champion |
| s5 14s | "too quick, and what is the mechanism?" | ⭐ both faults were one fault. 620px in 56 frames on the house EASE (≈80% done in its first quarter) so it BOLTED; and the handle bar sat at y542, **174px above his head**, so he was a bystander next to a crate that moved itself | LINEAR roll over 74 frames, bar dropped to his shoulder, his arms DRAWN ONTO IT, wheel turns at the rate the ground passes |
| s6 16s | "just coins falling into a wheelbarrow" | no place, nothing made the tokens, nothing happened to the barrow when the load landed | a mint: a press strikes on a beat and each stroke fires the chute, gantry for depth, the tyre FLATTENS and the frame sags, overflow BOUNCES off the rim, count runs up on a drum |
| s7 20s | "elevated somehow" | two grey bars and a block; no evidence the run carried anything | pressure gauge that sits dead then swings, the pipe LIGHTS UP along its length as the flow front travels, steam at the seam, sparks off the ratchet, valve wheel |
| s8 refill | "more interesting, more SFX" | a wireframe with a wedge; the glass turned over by itself | his hands grip the frame, grains BOUNCE off the growing cone, the counter is a drum that rolls, it rings and throws light when it lands |
| s9 27s | "circles → question marks" | a filled dot reads as debris in water | a **?** on each unnamed mark — says the one thing the shot is for |
| s11 34s | "quotation marks around CODE so people can copy it" | — | quotes strike a beat AFTER the word, so the gesture is "here is the exact string" |

SFX 70 → **86 cues**, authored to the new events (body hits under each safe
throw, four press strokes at rising rates, cabinet hit, gauge tick, glass ring,
a second stamp tick for the quotes). Median **-14.7 dB** under dialogue, 79/86
inside the -20..-10 band, **0 over the ceiling**.

⛔ **THE SPRITE-ON-A-SURFACE TRAP, FOURTH TIME.** The iceberg's waterline sits at
TOP+110 and any sprite standing on it puts its crown through the header. He now
appears only once the surface has descended far enough to hold him. **A sprite
adds its FULL height to whatever it stands on** — it has now bitten on a summit,
a climber, an iceberg tip and a waterline.
⛔ And a patch script anchored on `vol:` values silently matched nothing after
`solve_sfx.py` had rewritten them — anchor on the parts a tool does NOT own.

### ⭐ CODE_v5 — `out/CODE_v5.mp4` · 1043f · 34.816s · 56MB · verified
frames counted **1043** exact · correlation **0.976** · onset delta **30 ms** ·
chassis 3/3 · pose s2 0.12 / s10 0.02 · band 140/140 · **86 SFX cues, 0 over**.

Motion per shot, measured in-band against the approved baselines
(s3 bolts 2.65 / s1 ascent 4.76 mean):

| shot | v3 mean | v5 mean | peak | still |
|---|---|---|---|---|
| s3 bolts | 2.65 (was the ref) | **4.20** | 11.13 | 0/97 |
| s4 arcade | 1.86 | **2.71** | 13.81 | 3/116 |
| s5 truck | 1.55 | **4.48** | 7.72 | 7/145 |
| s6 barrow | 2.00 | 2.11 | 4.33 | 1/84 |
| s7 fitting | 1.68 | 2.18 | 5.13 | 0/103 |
| s8 hourglass | 2.17 | **2.78** | 11.55 | 2/95 |
| s9 iceberg | 1.27 | **3.09** | 12.78 | 0/171 |

⛔ s6 (2.11) and s7 (2.18) remain the two quietest and still sit under the s3
reference — both gained a lot of CONTENT but their events are small and central.
If either comes back, the fix is scale and travel, not more detail.

Spot-checked on the render at all nine flagged moments: the safe kicks with its
bolts withdrawn, the arcade counts (81 mid-roll) under a lit marquee with
scanlines, his arms are on the truck bar with the wheel spoked, the mint press
sits over a sagging barrow, the fitting has its gauge and valve, the hourglass
has his hands on the frame, the iceberg carries a **?**, and the CTA reads
**"CODE"** in quotes.

## STATUS: v5 is the current cut.
⛔ Still open before ship: no camera/flow pass between shots; the music bed has
never been re-balanced against the cue set (now 86, was 51 when the bed was set).

---

## SESSION 2026-08-06 (late) — THE VO SURGERY

### ⛔⛔ "Z CODE" WAS SPOKEN TWICE AND THREE TOOLS ALL SAID IT WASN'T
Alex was right and nothing in the pipeline could see it:

| what I asked | what it said | why it lied |
|---|---|---|
| `words_clean.json` | one "Z Code" at 11.88 | it is the TRUE SCRIPT aligned onto whisper onsets — a duplicate in the AUDIO is hidden **by construction** |
| whisper, whole file | "Second Z-code, it uses" | it corrects a stutter into the sentence it expects |
| whisper, isolated windows | "Second Z code. **The code** uses" vs "**it** uses" | disagreed with itself — the tell |

⛔ **AND MY FIRST TRANSCRIPTION WAS GIBBERISH** ("I'm a precious girl...") because
I fed whisper 48 kHz audio when it wants 16 kHz, so it read everything 3x slow.
It produced confident, fluent, completely unrelated words. **Resample first.**

⭐ **WHAT SETTLED IT WAS ACOUSTIC SELF-SIMILARITY, NOT ASR.** Log-mel features,
220ms windows, every pair ≥300ms apart: a span at **12.14s repeats at 12.50s with
0.873 correlation**. After the cut the strongest repeat in the same window is
0.672, somewhere else. The measure that found it is the measure that verified it.

### THE CUT — `tools/excise.py`, frames 375..384
⛔ Cutting audio alone would have destroyed the reel's one real property: picture
and sound are ONE clock. Every asset lost the same 10 frames — `vo-code.wav`,
`clean.mp4`, `matte.mov`, `landmarks.json` — verified by `-count_frames` at
**1033** each (375 + 658).

Span chosen by two measurements pulling opposite ways:
* audio — candidates were transcribed AFTER cutting; all read "Second, Z Code uses GLM 5.2"
* picture — ordinary frame-to-frame motion here is 1.29. f373 left a jump of
  **10.61 (8.2x)**; **f375 leaves 3.42 (2.7x)**. f375 wins; its slightly worse
  audio step is absorbed by a 12ms crossfade, which costs no length.

⛔ **THIS FFMPEG HAS 50 FILTERS AND NO `select` OR `setpts`.** Two attempts died
on filter syntax before I listed what actually exists. The working route is
output-side `-ss`/`-to` (⛔ never before `-i` — that is the keyword-seek bug that
gave this reel a 1240-frame conform) plus the concat demuxer.

Downstream, all regenerated not hand-edited: the true script in `code_words.py`
lost "It" (it goes with the splice), `total_f` 1043 → **1033**, `CODE_DURATION`
1033, and **48 SFX cues shifted back 10 frames** — a cue list is written against
picture time and picture time moved.

### ⭐ THE 18s HEAD TURN — found by scanning ALL frames, not just cuts
My pose gate only checked FACE cuts, but the CARD shows his face in every shot.
Scanning yaw against a 31-frame rolling baseline over all 1033 frames found
**exactly one sustained excursion in the whole reel: f551-562, peak 1.28** — and
the source frames are motion-blurred mid-swing. There is no facing frame inside
it to substitute, so the fix is reel 89's `holdAfter` (tools/face_hold.py): the
figure freezes on its last facing frame. The turn runs to the end of s6, so
`holdAfter={73}` covers all of it.

### THE OTHER NOTES
* **s7 wrench "comes out of nowhere"** — it was `seat > 0.45 ? <Tool/> : null`,
  literally popping into and out of existence. It now swings in from off-frame
  and is carried back out. ⭐ And every part got an idle: the dead gauge trembles,
  the valve creeps, the dry joint drips.
* **s9** — rings emit from each named mark as it appears (two per mark, offset),
  plus a submarine crossing on a 10s cycle and shoals drifting the other way.
* **s11** — the stamp impact now moves bench, slip, stamp, guide, floor and
  mascot on ONE decaying oscillation, so it reads as one blow, plus dust.

### ⛔⛔ v6 RENDERED DESYNCED AND LOOKED FINE — the hard-link trap
`out/public_code` is a HARD-LINKED mirror of `public/`. `excise.py` rewrote
vo-code.wav / clean.mp4 / matte.mov **in place**, which creates a new inode and
silently breaks the link — so the mirror still held the 1043-frame originals.
The render used the NEW composition geometry (1033 frames) against the OLD
audio. Nothing errored. It produced a complete, plausible file, desynced by
0.33s from 12.5s on.

⭐ **A WHOLE-FILE CORRELATION WOULD HAVE LET IT SHIP.** It read 0.60 — bad, but
dismissible as "we added 16 more cues". What caught it was correlating
**per 1-second window**: 0.87-0.97 for the first 12s at a rock-steady -4 lag,
then 0.1-0.5 with the lag jumping ±15 — and 12s was the splice point exactly.

New gate `tools/check_publicdir.py` compares inodes across the mirror and exits
non-zero on any stale file. It flagged all four. Also verified the re-encoded
matte still carries alpha (yuva444p12le, alpha 0..255, mean 84.9 — identical to
the original), because a matte that loses alpha paints opaque over everything.

⭐ AND THE HOOK MEASUREMENT THAT SETTLES ITS NOTE: s1 runs **4.68 mean / 11.21
peak, 0 still frames** — the highest mean in the reel. "Not interesting enough"
is therefore a CONCEPT note, not a motion note, and more movement cannot fix it.
The distinguishing fact: s1 is the only shot in the reel that is not a real
PLACE — every approved shot is a cabinet, a depot, a mint floor, a pipe run, an
hourglass, an iceberg. Header + hook concepts were put to Alex as options rather
than guessed at, after twenty rejected s9 options this session.

### ⭐ CODE_v6 — `out/CODE_v6.mp4` · **1033f** · 34.496s · 56MB · verified
| check | result |
|---|---|
| frames, counted | **1033** exact (10 excised) |
| whole-file correlation | 0.9752 |
| ⭐ **windowed sync** | **0/34 windows below 0.70, and every window at the IDENTICAL -4 lag** — a constant offset is AAC priming; drift would show as varying lag. This is the check that caught the stale-mirror desync and it is now the standard |
| onset delta | 30 ms |
| chassis / pose / band / SFX | ✓ 3/3 · s2 0.12, s10 0.02 · 140/140 · 86 cues, 0 over |

Spot-checked on the render: the splice reads "Second, Z Code uses GLM" with one
"Code" and no visible picture jump; the 18.6s frame holds the same facing pose as
18.3s; the wrench is visibly ENTERING at 19.9s and working at 20.5s with the
gauge and valve in frame; rings emit from both marks at 26.7s with fish; the
submarine crosses at 28.7s; the CTA reads **"CODE"** in quotes with the scene
displaced by the impact.

## STATUS: v6 is the current cut.
⛔ OPEN, and put to Alex as OPTIONS rather than guessed: the s1 header
("CANCEL $200" is an instruction, so it closes the loop) and the hook concept —
s1 measures 4.68 mean / 11.21 peak, the highest in the reel, so "not interesting
enough" is a CONCEPT note and cannot be fixed with more motion. The one property
separating it from every approved shot: it is not a real PLACE.
⛔ Also still open: no camera/flow pass between shots; the music bed has never
been re-balanced (set when there were 51 cues, now 86).

### SESSION 2026-08-06 (late) — SIX NOTES, THREE OF THEM ONE BAD ASSET
| note | diagnosis |
|---|---|
| "a dude speaking at 27s" | ⛔⛔ `sfx/bed_pocket.wav` HAS A VOICEOVER IN IT — "Let's go viral time and time again. Use them in your next video." Mapped onto reel time: **0.00-4.10s, 11.60-16.86s, 24.36-29.66s**. `bed.wav` too; only `bed_clean.wav` is clean. ⛔ audit_sfx measures LEVELS and cannot see a voice |
| "benchmarks cut off at 10s" | the VO is intact — no splice in the tail (continuous decay, no >18dB step) and the caption holds to 11.27s. It is the BED's voice starting at 11.60 |
| "too crisp, what happened to the grain" | ⛔ measured first, and the obvious answer was WRONG: frame grain is 6.95 / 6.68 / 6.73 across v3/v5/v6 — the overlay never changed. **`Paperize` was imported into Code.tsx and never called.** Key.tsx uses it 16 times; Code.tsx 0. The house look is texture ON the objects, not a layer over them |
| "grey box on the brown box" | a 60x50 mid-grey buckle dead centre of a timber crate — read as a placeholder. Replaced with a keeper at the edge |
| "the wrench is screwing the air" | it was: the jaw sat at PY-78 and the fitting spans PY-38..PY+38. The jaw IS the Tool's origin, so the origin moved onto the joint |
| "17s needs the sprite doing stuff" | four options built and pitched as frames (VH1-VH4) |

⭐ **PAPERIZE WAS PRICED BEFORE IT WAS SPENT.** 20 frames: 110 CPU-s bare vs 163
with it = **+48%**, so a full render goes ~13min -> ~19min. At the default
rough3/grain0.5/dots0 it moved grain only +3.2% and was not worth it; at
**rough4/grain1/dots6** the screen-printed edge wobble is plainly visible and the
cost is the same. Judge the CHARACTER, not the grain number — the metric
under-measures edge roughness, which is the actual tell.

⛔ A pile's tokens were scattered a FIXED depth below a MOVING pile top, so they
fell through the floor whenever the pile was low. Scatter within the pile's real
extent, never by a constant.

### ⭐ s6 = VH3 "HE CAN'T KEEP UP" — picked, rebuilt smooth, and scored
Alex: *"i like vh3 but the animation needs to be smooth and interesting and good
sfx design as well here."*

⛔ **THE PITCH VERSION SWUNG THE SHOVEL ON `Math.sin(f / 3.2)`** — a raw 20-frame
oscillation with no bite, no throw and no return. That is a metronome, not a man
working, and it is exactly what reads as jittery. It now runs a real CYCLE on
eased segments (bite → lift → throw → return, five strokes) with tokens leaving
the blade on the throw.
⛔ **AND THE BURIAL NEVER HAPPENED:** `Actor y = FLOOR - buried * 96` moved him
UP, so the pile grew and he rose out of it. The mound now closes over him,
measured against HIS OWN HEIGHT rather than a constant, and the shovel is left
standing in the heap.
⛔ **THEN THE SAME EASING FAULT AS THE HOURGLASS AND THE ICEBERG:** an eased fill
is ~80% done in its first quarter, so he was buried by f28 of 84 and half the
shot was a hold. A mound arrives at a CONSTANT rate — linear fill, burial at
f42-68, the shovel-standing beat last.

⭐ SMOOTHNESS IS MEASURABLE AS **JERK** (mean |Δ inter-frame motion|), and it is
the number that matters for this note, not the motion mean:

| | mean | peak | jerk | still |
|---|---|---|---|---|
| approved s3 bolts | 2.65 | 9.64 | **0.54** | 0/97 |
| approved s1 ascent | 4.76 | 11.21 | 0.70 | 0/86 |
| VH3 rebuilt | **3.02** | 4.93 | **0.53** | 0/84 |

SFX: the s6 block was rewritten for the new shot (it was still servicing a
barrow). ⭐ HIERARCHY — the shovel is the subject, so four bites on one file at
rising rates stepping down carry the shot, each with its throw 0.14s behind
(movement then texture), and the press drops underneath and lands BETWEEN the
strokes so the two rhythms interleave instead of colliding. Then a low rumble as
the mound reaches him, an impact when it takes him, and a single clank for the
shovel left standing. **91 cues, 0 over the ceiling.**

⛔ `solve_sfx.py` reported "could not place impact.mp3" for a cue that was right
there: it matched on the audit's printed vol (4dp) against a 3dp source literal.
It now matches on **(file, effective time)** — times are unambiguous, formatting
is not.

### ⭐ CODE_v8 — `out/CODE_v8.mp4` · 1033f · 60MB · verified
| check | result |
|---|---|
| frames, counted | **1033** exact |
| whole-file correlation | 0.9742 |
| **windowed sync** | **0/34 below 0.70**, lags {-4: 33, -3: 1} — constant, so no drift |
| ⭐ **bed voice** | VO subtracted from the render and the residual transcribed: **no trace of "viral" / "next video"**. The sound-pack voiceover is gone |
| grain in band | 6.729 (v6, no Paperize) -> **7.231** (v8) |
| chassis / pose / band / SFX | ✓ 3/3 · s2 0.12, s10 0.02 · 156/156 · 91 cues, 0 over |

Spot-checked: the crate's grey box is gone; s6 runs shovel -> buried -> shovel
left standing in the heap (0.9M -> 2.2M -> 3.0M); the wrench GRIPS the joint
through the turn and the fitting goes live; rings + fish + "?" on the iceberg;
the CTA reads "CODE" in quotes.

## STATUS: v8 is the current cut.
⛔ OPEN: the s1 hook concept and its header (put to Alex as options — s1 measures
4.68 mean / 11.21 peak, the highest in the reel, so the note is CONCEPT not
motion, and s1 is the only shot that is not a real PLACE). No camera/flow pass
between shots. Paperize costs +48% CPU: full renders are now ~19 min.

### s1 HOOK — FOUR PLACES PROPOSED (VHA-VHD), 2026-08-06
Alex: *"the hook seems the most important, so think through pretty deeply on how
to elevate that the most. And then propose and show me."*

⛔ NOT A MOTION NOTE — s1 measures 4.68 mean / 11.21 peak, the highest in the
reel, 0 still frames. His words: *"even though we see the Claude logo spinning, I
want to see more interesting ELEMENTS."* The ascent has movement and nothing to
look AT, and it is the only shot in the reel that is not a real PLACE.

| | place | constant layer before the event |
|---|---|---|
| VHA | a service counter | a receipt printer chattering out tape from frame 0 |
| VHB | a server aisle | status LEDs blinking on their own clocks, cooling haze drifting |
| VHC | a night shop front | rain falling, signage on wet pavement |
| VHD | a monitor wall | a scanline sweeping the whole wall |

⛔⛔ **THE THREE MARKS BROKE EVERY LAYOUT AND BOTH OBVIOUS FIXES FAILED.** MiMo's
mark is a 7.25:1 wordmark; the other two are square.
  1. sized by HEIGHT -> MiMo three times wider than its neighbours, collisions
  2. uniform SQUARE badge -> the wordmark fitted to ~57x8 and the badge read as
     **EMPTY** — a blank plate where the lead product should be. Worse than (1).
⭐ The answer is a wide **NAMEPLATE** for all three: a wordmark needs width, and a
square mark sits happily centred in one with air either side. Three 236px plates
fit the 960 safe width. Same shape, same size, every mark legible — which is what
"reads as a set" actually requires. See [[logo-assets-are-padded-wordmarks]].

⛔ STILL OPEN from the same message and NOT yet done: s3's empty right side,
s4's dead first 1.5s, s5 elevation, s6 more SFX, s9 logo movement.

### ⭐ s1 ROUND 12 — THE EXISTING ASCENT, MADE HIERARCHICAL
Alex: *"none of these options are hierarchical enough — the existing hook is fine
but needs to be elevated to another level."*

⭐ **THAT DIAGNOSES THE FOUR PLACE OPTIONS EXACTLY.** A counter, an aisle of
similar racks, three identical doorways and a grid of screens are all FLAT: every
element carries the same weight, so the eye has nowhere to go. The ascent already
had the right bones — ONE thing, centre, rising. It needed tiers, not replacing.

Four tiers, nothing sharing one:
  T1 HERO       the mark — biggest, full contrast, dead centre, its own light,
                plus a hard-edged rotating collar so it is not ONLY brightness
  T2 STRUCTURE  the gantry — large but pushed back: thinner, darker, no glow
  T3 THE THREE  nameplates on a rail below, ~0.6x the hero
  T4 AMBIENT    ticks and dust, small and dim, never competing
plus a vignette — the cheapest hierarchy there is — and ONE THING MOVING AT A
TIME: the old timing started the arrivals at b(4) while the rise ran to b(6), so
two hero-weight events shared the frame and neither led.

⛔⛔ **AND IT HAD BEEN DRAWING 4.58% FLOOR INK AGAINST A 1.00% BUDGET ALL ALONG.**
`hooksCodeS1i.tsx` still declared `BOT = 1150` — the OLD band, from before the
caption moved above his crown — so the gantry, horizon and ground rings sat
between y900 and y1128, inside the caption's space, on every frame from f30.
⛔ **s1 IS NOT ONE OF THE VARIANT COMPOSITIONS, SO THE BAND GATE HAD NEVER LOOKED
AT IT.** A gate only covers what you point it at; the reel's own hook was outside
its scope for the whole build.

| | before | after |
|---|---|---|
| floor ink | **4.58%** | **0.67%** (budget 1.00) |
| edge density in band | 1.70% (round 11, logged) | **2.87%** (house KEY = 3.00) |
| motion mean / jerk | 4.68 / — | 2.39 / 0.51, 0 still |

⛔ Motion mean is LOWER by design — the old value came from everything moving at
once, which is what made it flat. Density is the number that matches the note.
⛔ First pass over-corrected: pushing T2 back emptied the frame (density fell and
motion hit 2.34). Hierarchy is a RATIO, not a subtraction — the lower tiers came
back up with bracing, grating and a second dust bank, all dim, all small.

⛔ AND THE SECOND PASS OVER-CORRECTED THE OTHER WAY: I shrank the hero to 208 and
DELETED its ray emission, which is what made round 11 arresting in the first
place. Hierarchy is the other tiers being subordinate — never the subject being
smaller. Hero restored to 300 (the largest that clears the band ceiling at cy630)
with both counter-rotating tick banks back, as T1.

FINAL round 12 numbers: band ceiling 0.27% / floor **0.44%** (from 4.58%), edge
density **2.81%** (round 11: 1.70, house KEY: 3.00), motion 2.52 mean / 0.51 jerk
/ 0 still. And the hook now uses the TRIMMED marks — round 11 was still drawing
Xiaomi as an untrimmed black square.

### ⭐ CODE_v9 — the five deferred scene notes, done in one pass
| note | fix |
|---|---|
| s3 ~4s "nothing on the right of the switches" | the safe's OWN instrumentation, not decoration parked beside it: a dial whose needle climbs one notch per bolt thrown, a three-lamp status stack that fills as they clear, a vent that breathes. All T2 |
| s4 ~7-8s "it just pauses" | the slam was at local f40, so 1.3s of static cabinet opened the shot. **A coin arrives from the LEFT**, drops in, and the machine WAKES — attract-mode "INSERT COIN" dies, the marquee catches, the cabinet takes the knock |
| s5 ~11s "more stuff going on" | three objects on an empty floor -> a working depot: pallet rack behind, a dispatch board that clears a row as the crate leaves, a swinging lamp, floor markings passing under the wheel |
| s6 ~17s "more sound effects" | 8 more cues UNDER the four bites that carry the shot: token spray off the blade, the mound settling between strokes, the pour thickening. **99 cues, 0 over** |
| s9 ~28s "maybe the logos move" | they were pinned to the ice and pulsed 3%. Every mark now drifts, sways and rocks on its OWN period and phase, riding the swell — no two ever in step |

Verified: 1033 frames counted · correlation 0.9742 · **windowed sync 0/34 below
0.70, lags {-4: 33, -3: 1}** · band 172/172 · chassis 3/3 · 99 cues 0 over.

Per-shot motion (approved baselines: s3 bolts 2.65 mean / 0.54 jerk):

| shot | mean | peak | jerk | still |
|---|---|---|---|---|
| s1 hook | 2.70 | 7.27 | 0.58 | 0/91 |
| s3 safe | 4.61 | 13.13 | 1.30 | 0/97 |
| s4 arcade | 3.31 | 13.51 | 1.29 | 2/115 |
| s5 depot | 4.46 | 7.50 | 0.45 | 0/136 |
| s6 shovel | 3.67 | 5.69 | 0.73 | 0/84 |
| s9 iceberg | 4.53 | 13.20 | 0.43 | 0/171 |

⛔ TOOL BUG FOUND WHILE GATING: `vars_stills.mjs` beat frames were hardcoded to
shot lengths that CHANGED when 10 frames were excised (s5 146 -> 137), so it
asked for frame 139 of a 137-frame composition and killed that variant outright.
Beats now clamp to `composition.durationInFrames`.

## STATUS: v9 is the current cut. Every note from 2026-08-06 is addressed.
⛔ Still never done: a camera/flow pass between shots, and the music bed has not
been re-balanced against the cue set (91 -> 99 since it was last set).

### ⭐ CODE_v10 — headers, hook plates, s3 balance, s5/s7 motion
| note | what was measured / done |
|---|---|
| s3 "WAYYY too right-side biased" | door x470..900 + panel x912..1052 put the ink centre of mass at **x761**, 221px right of frame centre. Whole assembly shifted left 118px, mascot with it. **Now x530 against a centre of 540** |
| hook logos "square, and in colour" | ⛔ measured the files: **Xiaomi 0.0% chromatic pixels, Zhipu 3.0%** — those brands ARE monochrome and colour cannot come from the mark without falsifying it. It comes from the PLATE: white rounded squares (how they read as app icons), accent ring from each logo's own dominant colour where it has one (Qwen = 102,79,234), house orange where it does not. Original square art, not the white trim, which would be invisible on paper |
| "all these headers are not good" | every header now carries a fact the VO NEVER says: MIT LICENSED · 1M CONTEXT · 1/5 THE COST · 3M A DAY · 60 A MINUTE · 1M CONTEXT · FIVE, NOT 3. All checked against the Stage 0.5 table; none repeats the VO (law 29); none touches the two false claims |
| CTA | header reads COMMENT **"CODE"** — the keyword is quoted wherever it appears |
| s5 "shaking the box, the sprite sweating" | crate judder + wheel bump over the floor markings + sweat drops + effort lines, all keyed to `roll` so they only run while he pulls |
| s7 "before the twist, more going on" | the run now shudders under pressure BEFORE the joint seals (harder, because it is leaking), and he has a hard hat and bounces |

⛔⛔ **"BENCHMARKS IS CUT OFF" — RAISED TWICE, AND THE AUDIO IS COMPLETE.** Three
independent measurements: the render tracks the VO at a uniform **-3.0 dB**
straight through the word (no masking, no dropout); the decay has no splice
(>18 dB/ms step: none); and the **"-ks" fricative is plainly present at
11.16-11.24 — HF -10 dB against -44 dB inside the vowel**. What WAS wrong: the
caption broke at "...better than Claude Sonnet" and left **"on many benchmarks."
standing alone**, which reads as severed. `SyncedCaption` gained an ADDITIVE
optional `maxChars` (default unchanged, so reels 82/83/84 cannot be restyled) and
this reel passes 44.

⚠️ **HOOK HEADER FLAGGED, NOT SILENTLY CHANGED.** "FREE $200 CLAUDE MAX" is
Alex's own wording and is in the cut. Read literally it claims you get Claude Max
free, which is false — these are alternatives to it. On a reel that already had
to bury two false VO claims, in front of a benchmark-literate audience, that is
the line the comments correct. "REPLACE $200 MAX" says the same thing and is
true; offered as a one-line change, his call.

Verified: 1033 frames · correlation 0.9742 · **windowed sync 0/34 below 0.70,
lags {-4: 33, -3: 1}** · band 172/172 · chassis 3/3 · 99 cues 0 over.
Motion: s1 2.90/0.73 · s3 4.56/1.26 · s5 4.50/0.47 · s7 2.73/0.51, 0 still in any.

### ⭐⭐ "BENCHMARKS IS CUT OFF" — RAISED THREE TIMES, AND IT WAS THE ACTION RAIL
It was never cut off IN THE FILE, which is why two investigations came back
"nothing wrong":
* audio complete — render tracks the VO at a uniform **-3.0 dB** through the
  word, no splice in the decay, and the "-ks" fricative present at 11.16-11.24
  (HF -10 dB vs -44 in the vowel)
* caption not frame-clipped — it ends at **x977 of 1080**

⛔ **`src/layout/zones.ts` HAS SAID ALL ALONG: the action rail is x960..1080,
y900..1580.** The caption sits at y930..1000. So the tail of the word rendered
under Instagram's like/comment buttons — invisible in the editor, obvious in the
feed, exactly what that file's own header warns about. **186 of 1033 frames (18%
of the reel)** had caption text under the rail, not just that one word. And
widening `maxChars` to 44 the round before had made it WORSE by pushing lines
further right.

Fix: `SyncedCaption` gained an additive `halfWidth` (default unchanged, so reels
82/83/84 cannot move); this reel uses 410 either side of centre with size 46, so
text can never cross x950.

⭐ NEW GATE `tools/safe_zone.py` — **186 frames -> 0, worst 6.31% -> 0.02%.**
⛔ Two earlier versions of it were wrong, both worth remembering:
1. an absolute threshold over the WHOLE rail (y900..1580) fired on frames with no
   caption at all — Paperize grain reads ~0.5% and the card figure lives there;
2. comparing the rail against its MIRROR scored 1.34x and **passed a render that
   genuinely had text under the rail**, because a CENTRED caption puts its left
   edge inside the mirror box and both sides move together.
What works is the narrow strip inside the caption's OWN band: median 0.00%,
p90 4.95%, max 6.31% — empty is truly empty and text is unmistakable.

### OTHER NOTES THIS ROUND
* "60 A MINUTE" — Alex: *"wtf does that even mean??"* Fair: it is Qwen's
  per-minute rate limit and means nothing without the sentence that explains it,
  which a header has no room for. **A header must land on its own.** -> 1M
  CONTEXT, and s8 took NO SUBSCRIPTION.
* hook plates now RING on landing — a decaying oscillation keyed off each impact,
  offset per plate because they arrive at different times.
* "more SFX throughout" — ⭐ measured before adding: 2.9/s but with **TEN gaps
  over 0.9s**. A reel does not need a cue every beat, it needs no DEAD AIR. 18
  cues placed in exactly those gaps, each doing what the picture already does.
  **117 cues, 3.4/s, 0 gaps, 0 over the ceiling.**

CODE_v11 verified: 1033 frames · correlation 0.9742 · windowed sync 0/34 below
0.70, lags {-4: 33, -3: 1} · safe zone 0 · band 172/172 · chassis 3/3.

⚠️ KNOWN, NOT YET FIXED: the narrower caption box means the s4 line breaks as
"better than Claude Sonnet on many" / "benchmarks." — an orphan again. Dropping
`maxChars` back to the house 30 breaks it as "...than Claude" / "Sonnet on many
benchmarks.", which keeps the word with its context. One number; folded into the
next render rather than spending 19 minutes on it alone.

### ⛔⛔⛔ THE REAL "BENCHMARKS" BUG — FOUND ON THE FOURTH REPORT
It was never the audio, the frame edge, or the safe zone. It is
`patterns/synced.tsx`'s phrase selection:

    phrases.find((p) => t >= p.s && t <= p.e + 0.25)

`find` returns the FIRST window containing t, and every window carries a +0.25s
tail — so a phrase that STARTS inside the previous phrase's tail cannot win.
Measured frame by frame on v11: "benchmarks." is **SPOKEN 10.86-11.14** and was
**DISPLAYED from 11.13** — it appeared as he finished the word.

⭐ **YOU HEAR IT AND IT IS NOT ON SCREEN. THAT IS WHAT "CUT OFF" MEANS.** Three
rounds went into waveforms (uniform -3.0 dB, no splice, the "-ks" fricative
present), pixel extents (ends at x977 of 1080) and the action rail (real, and
worth fixing — 186 frames — but not this). Every one of those assumed the word
was RENDERED WRONG. It was rendered LATE.

Fix: `strictOrder` — the MOST RECENTLY STARTED phrase wins; a phrase may only be
replaced by one that has actually begun. Opt-in, default off, so reels 82/83/84
do not move — **but the same bug is in them.** Now shows from 10.80, before the
word is spoken, and holds to 11.30. Verified on the render, not just simulated.

⭐ THE LESSON: when a report keeps not matching the measurements, the assumption
inside the measurement is what is wrong. I measured "is the word correct in the
frame" four times. The question was "is the word on screen WHEN HE SAYS IT."

### s1 · THE FIRST TWO SECONDS
Per-second measurement showed the energy was all at the end: 0-1s mean **2.65** ·
1-2s 3.41 · 2-3.1s 5.29. The opening second — the one that decides retention —
was the quietest in the shot. Rebuilt as three events: CHARGE (rings gathering at
the floor on frame 0) → LAUNCH (fired from BELOW the floor on a snap spring, with
debris and a full-frame flash) → WAVE pulled forward; first plate at 1.0s, was
1.6s. **0-1s 2.65 -> 4.78 · 0-2s 3.01 -> 5.05 · whole hook 2.90 -> 4.30.**
⛔ Needed a band clip: a camera push plus a hero that starts below the floor
leaks past both edges (ceiling hit 2.86%). Clipped -> 0.04% / 0.01%.
⛔ And the plates were STILL reading as black squares — the opaque logo tiles
covered 82% of the white plate. At 56% with a real margin they read as app icons.

CODE_v12: 1033 frames · correlation 0.9742 · windowed sync 0/34 · safe zone 0 ·
band 172/172 · chassis 3/3 · 117 cues 0 over.

## "benchmarks" cut off — the actual cause, after 5 reports and 6 failed variants

⛔ **I had the wrong model of the problem for five rounds.** Alex reported it at
9s, 10s, 11s, then twice more; I kept treating it as the tail being too quiet and
shipped six variants (boost, EQ, HF lift, time-stretch, room tone, tail+room).
All six rejected: *"THE END GETS CUT OFF, ITS NOT ABOUT THE TAIL"*.

**Root cause: `out/vo5/video3-CODE.edl.json` span 4 = `[90.42, 94.08]`.**
That span maps to output 7.66–11.32s. The final *s* of "benchmarks" is at source
**94.23–94.38** — 150ms past the out-point. It was discarded when the takes were
assembled, so it has never been in `vo-code.wav`. No level or EQ work could ever
have recovered it, which is exactly why every variant failed.

**How it was finally proved.** Solve the normalisation gain (source → VO is
+19.7 dB), then walk both timelines side by side. They track exactly to output
11.28 and then diverge by 22 dB — that divergence IS the splice. Then classify
the discarded audio by band ratio, not level: HF(4–9k) − LF(200–1500) goes
−50 dB → **+7.8 dB** across 94.23–94.38. That is a fricative. Level alone read
"quiet and decaying" and looked like room tone.

**Trap hit on the first repair:** crossfading 12ms at the head of the recovered
chunk made it *worse* (whisper: "benchmarks" → "benchmark"). The material either
side of an EDL out-point is one continuous recording — a crossfade blends the
consonant with itself and cancels it. Butt-join the head; fade only into the
next take.

**Whisper is not a gate here** — control and all four repairs transcribe as
"benchmarks" because the LM supplies the plural. Gate on HF−LF in the recovered
window: A −11.3, B −3.9, C −1.6 dB.

Delivered AUDIO ONLY (Alex: *"I JUST NEED THE VO DONT NEED TO RENDER VIDEO"*):
`out/vars/vo/` — `AB_benchmarks.wav` (control→A→B→C→D) plus four full 34s VOs.

| var | span 4 out | adds | note |
|-----|-----------|------|------|
| A | 94.34 | +260ms | the s, tail slightly clipped |
| B | 94.42 | +340ms | whole s + natural decay — **the pick unless the room reads long** |
| C | 94.50 | +420ms | whole s + extra room after |
| D | 94.42 | +340ms | B with the s lifted +4 dB |

⚠️ **Picking any of these lengthens the VO** (34.375s → 34.62/34.70/34.78). The
picture must be re-conformed from the same EDL or the one-clock invariant breaks:
re-cut clean.mp4 / matte.mov / landmarks.json, regenerate the shot table, re-time
every SFX cue after 11.32s. NOT done — awaiting Alex's pick.

## Variant A installed — and a PRE-EXISTING lip-sync bug found while verifying

Alex picked **A** (+260 ms, span 4 out 94.08 -> 94.34). Defensible: it is the
tightest cut that still contains the s's peak (94.24-94.32) and it adds the
least length, so the least re-timing downstream.

**Installed.** `public/footage_code/vo-code.wav` 34.3746s -> **34.6206s** (+246 ms
after the 14 ms crossfade into the next take). Backups in `out/backup_pre_A/`.

⛔ **Rebuild the WAV in int16, not float.** First install read `/32768` and wrote
`*32767`, which rescales EVERY sample by 0.99997 and re-rounds it — the whole
approved master changed for a 246 ms edit. Verified after the fix: bit-identical
before the splice AND after the insert, 0 clipped samples.

`shutil.copy2` wrote into the EXISTING inode, so the `out/public_code` hard link
survived; `check_publicdir.py` green. Do not assume that — check it.

### ⛔⛔ THE REEL AS SHIPPED IS 10 FRAMES OUT OF LIP SYNC AFTER 12s

Verifying the conform exposed this. `code_shots.py` states CODE is ONE clock —
`clean.mp4`/`matte.mov` conformed from the same EDL spans, `trimBefore =
round(at*fps)`. **That comment is stale.** The excision that removed the
duplicated "Z Code" was applied to the VO and NEVER to the picture, and was
never written back to the EDL. Measured, old VO vs its own EDL concatenation:

    VO 11.75s : lag   0 -> 345 ms      (the "Z Code" excision)
    VO 24.00s : lag 345 -> 365 ms      (a second 20 ms cut)
    total removed from the VO but still in the picture: 365 ms

So every shot after 11.75s showed picture ~10.4 frames ahead of the voice.

**Accidental partial fix:** the +246 ms insert partly cancels it —

    BEFORE (as shipped)  345 ms  = 10.4 frames
    NOW  (variant A in)  100 ms  =  3.0 frames

⛔ **Which is why `out/conform_A/clean.mp4` (1051f, verified exact) was NOT
swapped in.** Conforming from an EDL that still does not record the excisions
would put the drift straight back to 345 ms. The old picture is currently the
BETTER of the two. Neither is right.

**The real fix** — record both cuts in the EDL, then conform:
split span 5 `[121.63, 122.77]` at source ~122.06, dropping 122.06->122.405;
find and split the 20 ms cut at VO 24.00s the same way. Then re-conform
clean/matte/landmarks, regenerate the shot table and words_clean, and re-time
every SFX cue. That restores one clock and fixes the 10-frame bug.

⭐ The lesson: **an edit applied to the VO but not written back to the EDL
silently breaks the one-clock invariant, and nothing in the pipeline notices.**
The EDL must be the sole record of every cut. A gate should assert
`len(EDL concatenation) == len(VO)`.

## v13 — RE-SYNCED. Both excisions recorded in the EDL, whole chain rebuilt

Alex: *"we just need to have the reel sync and i need to be able to see it here."*

**The fix, at the source.** Both excisions are now span splits in
`video3-CODE.edl.json`, solved by searching split points for minimum total |lag|
against the installed VO:

    drop source 121.900-122.245   (345 ms, the doubled "Z Code")
    drop source 179.300-179.320   (20 ms)
    span 5 also starts 14 ms later — the A splice crossfaded 14 ms of that take
    into the recovered "s", so the VO really does hold 14 ms less of it

Result: EDL concatenation **34.6210s vs VO 34.6206s, 0 ms**, and windowed lag 0
in all 11 windows. Then re-conformed everything from it:

| asset | frames, `-count_frames` |
|---|---|
| `clean.mp4` | 1041 |
| `matte.mov` | 1041 (515 MB, was 889 MB) |
| `landmarks.json` | 1041, 0 no-detection |

⛔ **`total_f = 1033` in `code_shots.py` was the bug's other half.** Its comment
claimed the excision reached "every asset that shares this clock" — it did not;
clean/matte were the full 1043-frame conform. Shortening the COMP to 1033 chops
10 frames off the END and removes nothing from the MIDDLE, which is exactly how
345 ms of drift survived every render. Now `total_f = 1039`, `CODE_DURATION = 1039`.

Shot table regenerated: s4 +8f (the recovered word), everything after shifts
+0.23..+0.27s, s11 back to 61f so the CTA stamp is not clipped. 75 of 117 SFX
cues re-timed **by their own shot's delta**, not a flat offset — the shot starts
round to different frames and a flat shift drifts cues up to 16 ms off.

### ⛔ THREE VERIFICATION ATTEMPTS THAT WERE INVALID — do not repeat them

1. **Render audio vs VO.** Reports +42 ms constant. That is AAC priming and it
   is identical in v12. ⛔ It can NEVER detect picture drift: the render's audio
   IS the VO, so this compares the VO to itself.
2. **Mouth motion vs speech energy**, 1.3s window. corr 0.33, "best lag" +32
   frames on a 38-frame window — i.e. the search edge. Too weak a signal, too
   short a window. Inconclusive, NOT a failure.
3. **Render facecam pixels vs `clean.mp4` pixels.** corr flat at −0.20 for every
   offset — the render composites the cutout at a different position and scale,
   so the crop compares unrelated pixels.

**What actually proves it**, and it is a two-link chain, not a measurement:

    CodeS1.tsx  trimBefore={trim}, trim = r.from   -> render frame N shows clean.mp4 frame N
    measured    clean.mp4 <-> VO lag 0, 11 windows -> clean.mp4 frame N is VO time N/30

Before, link 2 was 345 ms wrong. Both links now hold. Rendered 1039 frames,
`out/CODE_v13.mp4`. Rollback in `out/backup_pre_A/` (VO, EDL, clean, matte,
landmarks, words, Code.tsx).

## v14 — four fixes

**18s head turn.** ⛔ The existing `holdAfter={73}` on s6 was measured against the
OLD numbering and the re-conform moved everything. Re-measured on the new
landmarks: exactly one sustained yaw excursion in all 1041 frames, **f567-569,
peak 1.32** (f566 and f570 both facing).

The trap: s6 runs to f568 and **s7 begins at f569**, so the turn STRADDLES the
cut and the outgoing shot's freeze can never reach the incoming shot's first
frame. Added `holdBefore` — the mirror of `holdAfter` — which holds the first
facing frame over a shot's opening frames. s6 `holdAfter` 73 -> 82 (tightest
correct value), s7 `holdBefore={1}`. Verified on stills at f568 and f569: both
sides of the cut now show a facing face.

⭐ **A per-shot freeze is not enough on its own — a defect at a shot BOUNDARY
needs a guard on BOTH sides.**

**Hook logos blurred + numbered.** ⛔ First pass used 2.4px and it destroyed the
weakest asset: `xiaomi.png` measures **3.5% light pixels** (zhipu 21.9%, Qwen
57.7%) — a black tile with a hairline wordmark — so it blurred to an illegible
smear while the other two still read fine. **Blur to what the THINNEST mark
survives, not to what looks right on the boldest.** 1.3px: all three softened,
"Xiaomi MiMo" still legible.

1·2·3 as ink discs with a paper rule on the plate CORNER, not floating above —
the hero sits at cy 630 and the plates at TY 800, so anything above a plate
collides with the hero's starburst.

**Spinning Claude badge on the safe.** Goes ON the nameplate (y476..524), not
above the safe: the band ceiling is y470, so there is no headroom over it. The
plate belongs to the BODY, so the badge survives the door sliding away. Xiaomi
wordmark narrowed 314 -> 268 to clear it; collar counter-rotates against the
mark so it does not strobe as one wheel.

**Audio delivered for Adobe Podcast** = `out/CODE_v14_VO.wav`, the ISOLATED VO
(34.6206s, 48k mono 16-bit), not the mix — Podcast Enhance is a speech model and
would wreck the bed and SFX.

⚠️ **When the enhanced VO comes back it must be length-checked before install.**
The reel is one clock now; anything that changes duration re-breaks it. Verify
`len(new) == 34.6206s` and windowed lag 0 against the current VO, then reinstall
in int16 so nothing outside the change is re-quantized.

## v15 — Adobe-enhanced VO installed, mix rebalanced

Enhanced file came back clean and, importantly, **length-preserving**: 34.6207s
vs 34.6206s (1 sample), 48k mono 16-bit, windowed lag 0 in all 11 windows. Noise
floor -32.4 -> -40.1 dBFS. Per-word level change **-7.0 dB with 0.9 dB spread and
ZERO words gated out** — that spread figure is the check that matters, because a
speech enhancer swallowing a quiet word shows up as an outlier, not as a bad
transcript.

⛔ **BUT IT CAME BACK 7 dB QUIETER, AND THAT SILENTLY BREAKS THE MIX.** All 117
cues are solved to sit a fixed depth under the VO's RMS, so a quieter voice makes
every cue effectively 7 dB hot. `audit_sfx.py` flagged only ONE cue — because it
is a CEILING check, not a target check. **A green audit does not mean the balance
is right.**

Gain staging, measured not guessed: peak 0.692 with the 99.9th pct at 0.468, so
**+2.2 dB is the most that fits with zero limiting**; the full +7 dB would need
gain reduction on 0.25% of samples and would alter transients Alex had already
approved. Took +2.2 (RMS -20.9), then scaled all 117 cue vols AND `MUSIC_BED`
(0.2 -> 0.1151) by the matching **-4.8 dB** so the approved ratios survive intact.

⭐⭐ **AUDIO-ONLY CHANGES DO NOT NEED A PICTURE RE-RENDER.** Everything after v14
was audio; not one frame differed. The first attempt re-rendered anyway and
**died at 708/1039** — compositor SIGTERM x15, browser crashes at f710-715, at
**load 29.9 / 46.6 / 33.1 on 10 cores** (Claude.app, Chrome, GarageBand; 10.7M
pageouts). Assets were fine the whole time. Correct move:

    npx remotion render ... out.wav --codec=wav        # audio only, 8:17
    ffmpeg -i v14.mp4 -i new.wav -map 0:v -map 1:a -c:v copy -c:a aac

⛔ Two of my own verification gates were wrong and both looked like failures:
- asserted the mux would carry v14's +42 ms AAC priming; it came back at **0 ms**,
  which is BETTER. A hardcoded expected offset is not a gate.
- "bed under voice" sampled 3.02s as a silent gap — it is a shot cut with a
  whoosh on it. Re-measured against real VO-quiet windows: v14 +13.1 dB, v15
  +20.9 dB, and the extra separation is the ENHANCER removing room tone from the
  quiet windows, not the bed being wrong.

Finished with +3.03 dB global makeup (peak 0.628 -> 0.891, 0 clipped) so the
delivery is not needlessly quiet — global, so no internal ratio moves.

## v16 — the 11-12s "two cuts" were MINE, from recording the excision in the EDL

Alex: *"a cut to another scene with my face, and then it cuts back... two
unnecessary cuts even though the voice over is fine."* Exactly right, and the
cause was v13's fix.

Recording the excision split span 5 into `[121.644,121.900]` + `[122.245,122.770]`.
The first splice at f348 is hidden by the s4->s5 shot cut, but the second landed
**mid-shot at f356** — so the facecam cut to an 8-frame fragment of him grinning
and then cut back. Two cuts, from one excision.

### ⭐⭐⭐ THE PICTURE EDL AND THE AUDIO EDL ARE NOT THE SAME FILE

The excision exists to drop a doubled word from the VOICE. **The picture has no
reason to jump for it** — and picture and audio are separate files that only need
equal LENGTH and alignment at shot boundaries.

    out/vo5/video3-CODE.edl.json           13 spans — the voice, keeps the excision
    out/vo5/video3-CODE.picture.edl.json   12 spans — 5+6 merged contiguous

Merged span = `[121.989, 122.770]`, same 0.781s, END-aligned so the back half
stays frame-locked and only the first 0.26s carries the 345 ms offset — 8 frames,
on a small card, with no jump. Restores the original 11 splices: no new cut.

Measured after: every frame diffed between the two conforms — **exactly 8 frames
differ, f348-355**, precisely the merged span and nothing else.

⛔ `patch_render.py` was hardcoded to `src/index.ts` with no `--public-dir` and
died with a bare non-zero exit. Fixed: `--entry` and `--public-dir` are now
arguments. Patch took **74s** against a ~14 min full render.
⚠️ It re-encodes the WHOLE video at crf 18 — PSNR 40-43 dB on unchanged frames,
62.4 MB -> 44.5 MB. Fine for a revision, **do a full render for the ship.**
⛔ And it re-encodes the audio to a 2nd AAC generation — re-mux the patched video
with the first-generation WAV instead (`-c:v copy`).

### ⚠️ STILL PRESENT, PRE-EXISTING, NOT FIXED: the f372 take change

Face-region diff **19.73 at f371->f372** against ~4.5 either side (graphic only
2.02, so it is the face). It is the span 5->6 take change, source 122.770 ->
155.52 — two takes 33s apart — and it is REQUIRED for lip sync, so it cannot be
merged away like the excision. It has been in every version of this reel.

Masking it needs one of: a shot cut placed on it (adds a 12th shot), or a 2-3
frame cross-dissolve on the card figure. Flagged to Alex rather than restructuring
the edit unasked.

⭐ Useful diagnostic: measure the FACE crop and the GRAPHIC band separately. A
whole-frame delta could not tell a facecam jump from the crate animating.

## v17 — blur up, Claude mark relocated, s6 header reworded. FULL render.

**Hook blur 1.3 -> 2.6px.** Alex asked twice. ⛔ Known trade, made deliberately:
past ~1.5px `xiaomi.png` (3.5% light pixels) stops reading as a brand and becomes
a soft dark tile. He saw 1.3 and wanted more, so softness wins; the plate, ring
and the 1/2/3 disc carry identity instead.

**Claude mark moved into the safe.** Alex: *"should be to the rightside of the
switches, not at the top there... should fill in that relatively big blank
space."* It was r30 on the nameplate — and the nameplate is only 48px tall, so it
could never be more than a pin. Measured the actual hole: levers end x528, door
ends x782, mascot never leaves x150..250. Now **r92 at (656, CY), 3x the size**,
with two counter-rotating collars.
⛔ ON THE DOOR, not the body — it has to travel with the thing it locks or it
reads as painted on the air when the door slides.

**s6 header `3M A DAY` -> `3M TOKENS A DAY`**, size 108 -> 86 (15 chars). Measured
the rendered ink: x159-924, margins 159/156, clear of the IG action rail at x960.

### ⛔ WHEN TO STOP PATCHING

Three shots changed (s1, s3, s6 = 275 of 1039 frames). Patching v16 would have
made it a THIRD generation encode — v15 full render -> v16 patch (PSNR 40-43) ->
v17 patch. Did a full render instead: 63.2 MB, zero crashes at load 4.6, first
generation everywhere. **Patch for a quick look; re-render once changes
accumulate or before showing something that might ship.**

⛔ A full render does NOT carry the +3.03 dB makeup — that lives in the WAV, not
the composition. Always mux `out/CODE_v15_audio_gain.wav` over a fresh render's
video, which also drops the +42 ms AAC priming the render's own track carries.
Verified on the delivered file: -20.86 dBFS, lag 0, spread 0 ms.

⛔ My own check "render audio unchanged since v15" reported False at max diff
0.85 and that was MY error — it compared an AAC-decoded track against a raw WAV
render, so it was measuring the 42 ms priming offset, not a real change.
**Compare like with like, or compare lag instead of samples.**

## Hook round 13 — fluff stripped, and three concepts drafted

Alex: *"the first 0.4 seconds needs more interesting stuff going on... too much
fluff. I don't know what the left and right bars are... I don't like to see the
dotted line... the three logos come in too late... brainstorm other ideas."*

⛔⛔ **THE MEASUREMENT THAT EXPLAINS ALL OF IT: frame 0 was 1.70% ink** — the
emptiest frame in the shot — because the hero starts below the floor at cy940 and
does not clear it until f6. The single frame that decides whether anyone stays
had nothing on it. Everything else Alex named is downstream of that.

Done to the shipped hook: gantry columns + tick scale DELETED (density bought
with scenery nobody can name is fluff, and it competed with the only object that
matters); both dashed collars DELETED; the three plates now **park on the rail
from f0** and ACTIVATE at f4/f10/f16 instead of flying in at f30/42/54.
**frame 0 ink 1.70% -> 7.65%**, 0.4s 15.42% -> 21.33%.

⭐ Parking beats re-timing: it fixes "too late" and "empty opening" with ONE
change, and does not fight law 47 — the hero is still the only thing that MOVES.

### The three drafts (`src/scenes/hooksCodeS1j.tsx`, comps J1Swap/J2Flip/J3Board)

Different PARADIGMS, not reskins: A replacement · B reveal · C competition.

| | f0 | f6 | f12 | f20 | f40 |
|---|---|---|---|---|---|
| A SWAP | 6.49 | 12.93 | **1.37** | 12.86 | 18.88 |
| B FLIP | **0.86** | 6.97 | 12.52 | 25.71 | 28.28 |
| C BOARD | 6.77 | 6.60 | 6.40 | 7.01 | 7.37 |

⛔ **A has a DEAD FRAME at 0.40s** — 1.37%, worse than the defect being fixed. The
eject finishes before the plates land, so the seat is empty mid-window. A
concept can fix frame 0 and still open a hole later; measure the WHOLE window.

⛔ **B's f0 reads 0.86% because the card backs are dark** — the metric counts
brightness, and three big dark objects on a dark ground score near zero. Here the
number and the eye disagree and BOTH are right: there is mass, but no contrast.

⛔⛔ **C SHIPPED A FALSE PREMISE IN THE DRAFT.** All four rows start at $200 and
three count down — which says MiMo/Z/Qwen used to cost $200. They never did.
Fix: challengers read FREE from f0, and the motion becomes Claude's $200 being
struck through with each row lighting in turn. Same beat, no invented claim.
⭐ Also why C is a PRICE board and not a benchmark board: a score board needs
numbers for Z Code and Qwen that do not exist, and this reel already carries two
unfact-checkable VO claims.

## Hook: concept A built, and the SFX lesson that cost three rounds

Alex picked A: *"needs good sound design and more smooth animation and also the
claude logo somewhere in the back."*

**Smooth.** The draft drove the eject with `Math.pow(t,2)` — accelerates, then
simply stops, no settle. That IS what "unsmooth" was. Replaced with a snap spring
so the mark is thrown and damps.

**Claude in the back.** It is DETHRONED, not deleted: keeps its size, loses its
light (opacity 1 -> 0.45), settles higher and is drawn BEFORE the plates so they
occlude it. That also removes the dead frame for free.

**The dead frame, twice.** Draft dipped to 1.37% at f12. First fix got it to
3.94% at f9 — still a dip, because plates fell from y194 which is ABOVE the band
ceiling at y470, so each was invisible for the first third of its fall.
⭐ **Travel the frame cannot show is not animation, it is delay.** Drop shortened
560 -> 300. Window is now 6.6-13.4%, min at frame 0.

### ⛔⛔⭐ THE FLAT J-CUT IS WRONG — THE LEAD IS THE FILE'S OWN PEAK OFFSET

`J = 0.07` is applied to every cue in this reel. Measured peak offsets:

    click-hard.wav   0.250s     gem0.wav   0.425s     whoosh_deep.mp3  0.551s
    punch.wav        0.017s     futuristic-click 0.046s   pop.wav      0.009s

So `at: BEAT - J` put click-hard **180 ms LATE** and gem0 **355 ms late**. Plate
2's impact measured **-37.6 dBFS at the instant it landed** — inaudible exactly
where it mattered. A constant lead only works if every file peaks at the same
offset, and none do. **An impact must PEAK on the frame; only swells lead.**
Re-picked files by attack: punch 0.017, futuristic-click 0.046.

### ⛔⛔ THREE MEASUREMENT MISTAKES, ALL MINE, ALL THE SAME SHAPE

1. **Gated the beats against the FULL MIX** — peaks of 0.49-0.63 were the VOICE
   ("China has killed..." starts at 0.0s), so changing cue volumes moved the
   numbers by nothing and I read it as "the edit did not apply". Render a
   **soloed SFX bus** (VO + bed muted) — it is the only signal that answers this.
2. **`str.replace` that silently no-opped** and I reported "rebalanced". Assert
   on every replacement; a no-op edit reads exactly like a failed hypothesis.
3. **Ill-posed gate**: "loudest in +/-150 ms" can never pass for hits 133 ms
   apart — each beat's window swallows its neighbour. Match the window to the
   spacing, or measure onsets instead.

Final, on the soloed bus: all 5 beats within +/-32 ms of their picture frame
(4 of 5 within 10 ms), three impacts levelled from a 4.2 dB spread to ~1 dB.

## ⛔⛔⭐ THE BACKGROUND SEAM WAS THE HEADER SCRIM

Alex: *"the texture is not the same as the normal background... you see this
line? That's where the animations are, that's the bar. In the background there
should not be discrepancies in quality."* Correct, and it was the scrim.

⛔ **MY FIRST DIAGNOSIS WAS WRONG AND I SAID "CONFIRMED".** Row means showed a
10.9-level step at exactly y469->470 (the band ceiling) — which looked like a
smoking gun and was actually the `code-grunge` dot pattern's own 9px
periodicity. **Smooth by the texture's period before calling any step a seam.**

Measured properly (left margin, 9px smoothed, artwork-free):

    with the scrim   above band 42.2 bright / 1.92 texture
                     in band    57.0 / 2.37      below 58.2 / 2.41
    scrim removed    above band 60.1 / 2.91
                     in band    57.7 / 2.66      below 57.9 / 2.66

A 0.82-alpha wash over the top 560px does not merely darken — it **crushes the
texture under it**, so the printed grain dies above the band and survives below.
The eye reads that boundary as a bar. Confirmed by experiment: disabling the
scrim made all three zones uniform.

**Fix: the shadow belongs to the TYPE, not the frame.** Replaced with
`drop-shadow` on the headline element. Result: brightness spread **15.6 levels
(37%) -> 0.2 levels (0%)**, texture 37% -> 8%, and header contrast **193 levels**
— better than the 162 that justified the scrim in the first place.

## ⛔ "TOO FLAT / TWO SECONDS OF NOTHING" — measured, and only partly fixable

Band motion: **0-0.6s = 10.31, 0.6-3.07s = 0.99 — ten percent.** He was right.

Landing had no weight: a bare translate, no shadow, no squash, no debris. Added
a proximity shadow, a contact squash, and side debris.

⛔ **SMALL EVENTS CANNOT CARRY A WHOLE-FRAME SENSATION.** Adding the drain, three
FREE stamps and a rail lock moved the tail from 0.99 to only **1.21** — a
travelling dot, a 168x60 tag and a filling rail are small-area events in a
1080x430 band. Restoring the **camera push** (which the ascent had and I dropped
in the rewrite) took it to **1.56 (1.6x)**, because it is the only change that
touches every pixel every frame.

⚠️ STILL ONLY 14% of the opening. The honest read: **this shot has a 0.6s idea
filling a 3.07s slot**, and no amount of motion tuning fixes that — it needs a
second IDEA in the back half, not more decoration on the first one.

## ⛔⛔⭐ THE SEAM WAS NEVER BRIGHTNESS — IT WAS PAPERIZE TEXTURING A BACKGROUND RECT

Alex, after the scrim fix: *"still there is the background seam here."* He was
right, and I had fixed a real but different problem. Three wrong diagnoses in a
row on one defect, each corrected only by measuring differently:

1. **"Step at y469->470"** — the `code-grunge` dot pattern's own 9px periodicity.
   ⛔ Smooth by the texture's period before calling any row step a seam.
2. **The header scrim** — REAL (top zone 42.2 bright / 1.92 texture vs 57/2.37
   inside), and worth fixing, but not the line he was pointing at.
3. **A 9-level "trough" at the band floor** — noise. A 9px smooth does not
   suppress this grain; single-row comparisons on this footage are unreliable.

**The actual cause, found by measuring TEXTURE over large areas instead of
brightness over rows:**

    inside the band   texture 5.0 - 7.8
    outside the band  texture 2.65
    brightness:       uniform to 6.9%

**193% more texture inside the band at MATCHED BRIGHTNESS.** The vignette was a
full-band rect sitting INSIDE the `<Paperize>` wrapper, so the printed grain and
dot screen were applied to it — treating the BACKGROUND, but only where that rect
existed. The band edge was a TEXTURE edge, invisible to every brightness test I
ran. Removing it: **193.8% -> 32.0%**, and the 32% residue is the header type
zone, not background (band zones 2.63-2.76 vs 2.65-2.69 outside).

⭐⭐ **THE RULE: `Paperize` is for OBJECTS.** The moment a body draws a full-band
background rect inside it, that rect becomes a visible tile of treated
background. A body draws its objects and nothing else.

⭐ **And when the eye says "quality difference" but brightness matches, measure
TEXTURE.** Alex said "quality", not "brightness", and he was describing the
variable I was not measuring.

## ⛔ A HORIZONTAL BAR AT LABEL HEIGHT IS ALWAYS A STRIKE-THROUGH

*"i dont like how theres a line that goes through these."* Z-order was not the
fix: putting the rail BEHIND the tags stopped it crossing them but it still ran
through the row at their mid-height and still read as a line struck through the
labels. Removed the bar entirely; then the seat's glow ELLIPSE showed the same
defect with its lower arc, so it now fades when the eject ends (it belonged to
the eject, not to the row).

⛔ Broke the build again with `{/* ... */` missing its closing brace — the same
JSX-comment slip already logged for hooksCodeS1i.tsx. Check the brace.

## DELIVERED — Drive `Claude Reels/Face/*Videos/10 - CODE`

Full res `CODE_v18.mp4`: 1080x1920, 1039 frames, 34.633s, 66.4 MB, zero crashes
at load 7.9. Audio muxed from the first-generation WAV at -20.8 dBFS / peak
0.891 (a fresh render does NOT carry the +3.08 dB makeup — that lives in the WAV).

⛔ **The Face tree numbers separately from the repo.** In-repo this is "reel 86",
which is the FACELESS series and means nothing here. Listed the destination: it
was at `09 - ARMY`, so this is **`10 - CODE`**. Filenames copied from the sibling,
not assumed: `10 - CODE.mp4` · `CODE - The China Stack.docx` · `caption.txt`.

Verified by **md5 against the cloud**, all three match. Flat copies in
`~/Downloads/Claude-Reels-Final/`.

### ⛔⛔ NEITHER THE DOC NOR THE CAPTION EXISTED — and researching them found a
### FACTUAL DEFECT IN THE SHIPPED REEL

Alex asked to upload the render "alongside the leadmagnet doc and the captions
file" as though they existed. They did not, so both were built. Grounding them
turned up something the reel gets wrong:

⛔⛔ **Qwen OAuth was discontinued 15 April 2026.** The 1,000 free requests a day
are gone; model access now needs an API key or a coding plan. **s8 claims "NO
SUBSCRIPTION" over a VO saying "2,000 free requests"** — that is no longer true,
and it also explains the on-screen "545 per day" vs VO "2,000" mismatch spotted
in the v18 preview sheet. FLAGGED, not silently fixed: changing a claim is Alex's
call, and the reel is already on Drive.

Other corrections carried into the doc rather than repeating the video:
- MiMo's 82 vs 79 on SWE-bench Verified is **self reported by Xiaomi**, not
  independently reproduced.
- GLM does NOT beat Opus (~62 vs 69 SWE-Bench Pro) — already in the log.
- Kimi Code is not free (~$19/mo tier).
- All three route code to servers in China on hosted tiers; Z Code / GLM 5.2 can
  be self hosted.

⭐ The caption was gated MECHANICALLY, not by eye ([[caption-structure]] says to).
One refinement: the check's "no 3+ consecutive lines" rule must SKIP the `.`/`.`/`.`
IG spacer block, which is house standard and appears in the ARMY sibling — the
rule is about body paragraphs.
