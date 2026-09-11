# REEL 143 · "DEPARTMENT" — factory log

**Opened 2026-09-08 01:57, at Stage 0, before the first idea.** Keyword `DEPARTMENT`.
Repo: `claude-reels-workflow` (the FACELESS lane). Board: `storyboards/143-department.md`.

---

## STAGE 0 — SOURCE

⚠️ **This reel arrived PRE-LOCKED as an Alex VO recording**, dropped as
`~/Downloads/DEPARTMENT.m4a` (3.43 MB, 2:34.69, Sep 8 01:40). There is therefore
**no comp, no kill-gate, no GATE A** — Stages 0-4 did not run and this is **not a
gated ship**, exactly as logged for TOOL-65 and POSTS-66. Recording it is the
decision; the build's job is the picture.

⛔ The one Stage-0 check that DOES still apply is **CAPTURE BEFORE CLAIM**: every
number the VO says is asserted on screen and **no number the VO does not say is
allowed on screen**. The ledger is `D` in `video/src/DeptWorld.tsx` and nowhere else.

## STAGE 1 — THE VO (this is the only stage that ran on real inputs)

`DEPARTMENT.m4a` → 48k/16k mono → **40 measured speech spans** → **each span
transcribed ALONE**.

⛔⛔ **A WHOLE-FILE TRANSCRIPTION IS NOT GROUND TRUTH.** Run over the raw file,
whisper emits `"...and a skill is basically just a cut, cut, and a skill is just a
cut, cut..."` — it merges a flubbed take with its retake and reports the sentence
once. Per-chunk is the only pass that shows a retake as a duplicate opening.
**Eleven `cut cut` flubs**, five of them on one sentence.

| line | takes recorded | kept |
|---|---|---|
| "a skill is just a markdown file…" | 6 (c02, c04, c06, c09, c11 + fragments) | **c11** |
| "here's a collection of 45…" | 2 | **c15** |
| "two I really like are…" | 2 | **c19** |
| "they literally give your agent…" | 2 | **c21** |
| "give the skill to your agent…" | 3 | **c31** |
| the CTA | 4 | **c39** |

⭐ **Two lines whisper got wrong at every model size, resolved by grammar not audio:**
- c01 small.en: *"the 5,000 installed first"* · medium.en: *"the five that I would
  install first"* ← **medium is right**; there is no $5,000 anywhere in this reel and
  a price on screen would have been an invented claim.
- c19 came back as *"To AI like our"*, *"I truly like our"* and *"To where you'll
  like our"*. The line is **"Two I really like are UI UX Pro and Taste."** — settled
  by the NEXT sentence, which is *"**They** literally give your agent…"*: a plural
  subject, so the sentence before it names two things.

**Cut:** 18 keeper spans, 55ms head / 75ms tail, joins 0.26-0.36s. 154.69s → 73.17s
→ **×1.03 = 71.04s** (`memory/alex-claude-motion-and-voice`: 1.03x the ORIGINAL,
never slower). ⚠️ 71s is long against the house 22-29s; it is what was recorded and
every sentence he said is in the cut. Nothing was dropped for length.

## STAGE 4.5 — THE LEDGER (capture before claim)

Everything the picture is allowed to assert, and it is exactly the VO's own list:

```
$0 · 5 departments · MARKETING 45 · SOCIAL 17 · DESIGN 2 (UI UX PRO, TASTE)
FINANCE 8 · LEGAL 9 · "50 skills" · SKILL.md · comment DEPARTMENT
```

⛔ **No star counts, no install counts, no publisher names, no pack URLs.** None of
them are in the VO and none were captured, so none are drawn. Greppable guards in
`DeptWorld.ts`: `SPEED_BANNED`, `COUNT_BANNED`.

## STAGE 6 — STORYBOARD

`storyboards/143-department.md`. 18 VO lines → **18 scenes / 24 shots**, boundaries
taken from `silencedetect -40dB:0.10` on the delivered cut, so every cut sits in a
measured gap and never inside a word.

## STAGE 7 — BUILD

Chassis cloned from **reel 141 GRAVITY** (`Gvt*` → `Dept*`), which re-exports
`HwWorld` verbatim. Every asset prefixed `dept143_` / `143` per
`memory/reel-asset-name-collisions`.

---

## ROUNDS

_(each round: the defect, the measurement, the fix)_

### R1 — 2026-09-08 02:35 · first render, 2132f in 70s

**Gates:** tsc green · motion **median 8.59** (bar 9.00), **5/30 scenes under 6.0**,
0 dead runs anywhere.

| defect | measurement | fix |
|---|---|---|
| ⛔⛔ **THE HOOK MEASURED 2.35** — the worst scene in the reel | HOOK-A 2.35 / HOLD 43% against a 9.00 bar | it had **no background process at all**: `HOOK` does not use the `Works` shell, so it had no `Runner` and no `Rake`, and the only movers were two hat arrivals in 92 frames. Added an overhead job rail (the biggest single lever in §1), moved to 2 hats settled + **3 arriving spread across the full shot**, and gave every landing a **wave of paperwork** onto the counter — many large bright objects arriving, and it is the claim rather than decoration |
| ⛔⛔⛔ **THE WALK IN S2 NEVER FIRED** | `E(f, 92, 150, …)` in two shots that are **87 and 81 frames** long | `ANIMATION-QUALITY` §6.1 verbatim ("an alarm armed at local f68 of a 61-frame shot"). Every timed effect is now in its own shot's local frames. This is why SKILL-A/B measured 7.00/7.30 with HOLD 62/63% — the scene was a still with a lamp on it |
| ⛔⛔ the hat tower floated **75px above the head**, then 42px after the first fix | measured off the render, not the algebra | `Hero` scales the whole div by `sy = 1 - strain*0.16` about its BOTTOM edge AND adds `strain*size*0.05` to `dy`. The head top is `y + strain*size*0.05 - 0.78*size*(1-strain*0.16)`. **The strain deformation is the term that moves**, and it is the one both wrong guesses left out |
| ⛔⛔ an **88px three-line sentence** across the middle of S1 | "FREE · ONE PACK PER DEPARTMENT" covered the five bays the scene exists to show | "animation should not be text". Replaced with a small sprayed `FREE` stencil per bay, arriving with that bay's lamp: five graphical events, identical information |
| ⛔ the split-flap read **"70"** at frame 0 | three `Flap`s stacked at the same coordinates, two of them rendering at once, one caught mid-roll | one component, N values: `steps=[{v,at}…]` and it picks the current one |
| ⛔ the tiles in S14 measured **5.53** | 52px tiles are **12px** after the audit's 1012→240 downsample | 88px, falling from off-frame. *A prop that measures small IS small* |
| ⛔ arrivals bunched, three scenes | LED-A 8 levers in 42 of 67f (5.53) · CON-A 9 seals in 38 of 58f (6.09, **HOLD 84%**) · CTA 10 letters in 26 of 119f (6.93) | every run respread across the FULL shot, and each got something large arriving in its tail (ledger sheets, a brief stacking, the five packs) |
| ⛔ GATE-B **5.44** | three empty drafting boards and a hero | §1: real content ARRIVING beats any effect added to a still room — each board now takes a full drawing, one at a time, across the whole shot |
| ⛔ two labels clipped by the frame-edge occluders | "AD CREATIVES" → "REATIVES" at left:6 under a 98px `Edge`; "UI UX PRO + TASTE → THE DIES" ran off the right | labels start inside the occluders |
| ⛔ the villain's stack read as a detail | the identical pages were 190px beside a 296px press | **sameness is the claim, so it is the biggest thing in frame** — 244px, 13 of them |
| ⛔ the payoff did not read as the hook's answer | TEAM's cast was 152px against the hook's 336px hero | the five are 182px, each striking an object that GROWS, outputs travelling bay to bay |

⭐ **The contact sheet found six of these and the audits found none of them**
(`tools/d143_sheet.sh`, 30 shots at 62% of each).

### R2-R8 — 2026-09-08 02:45-03:30

| round | what changed | measured |
|---|---|---|
| **R2** | the hook rebuilt (background process + 5 spread arrivals + paperwork waves); S2's walk moved into shot-local frames; the giant FREE sentence replaced by per-bay stencils; three bunched runs respread; GATE-B given arriving drawings | motion median **8.59 → 9.17**, failing **5/30 → 1/30**; HOOK-A **2.35 → 8.23** |
| **R3** | HEAP's tiles 52→88px and a third slab added; GATE-A's jam put in shot; the villain's stack 190→244px; TEAM's cast 152→182px and each one striking something | **0/30 failing**; HEAP 5.82 → 7.50, GATE-A 9.45 → 9.89 |
| **R4** | the hook's counter and paperwork were **below the panel edge** — the waves the scene was rebuilt around were invisible; hats resized to the head; tower given a step and a splay | HOOK-A composition fixed |
| **R5** | ⛔ **HOOK_LUMA 104.3 against the ≥140 bar.** The shop was lit like a night interior. Brighter wall and stock, a cream counter actually in frame, vignette 0.30 → 0.20, a wider light spill. ⛔ The palette's dark stop was NOT touched — that is the banned fix | **HOOK_LUMA 145.7 ✓ · BODY_SAT 68.7% ✓ · BODY_BLACK 12.4 ✓ — "the look holds"** |
| **R6** | ⛔⛔ **the SFX bank rebuilt from the audit, not by ear** (see below) | sfx_audit **clean** · verify_reel **9/9** |
| **R7** | the SKILL.md sheet densified (it read as an empty cream slab); an expression beat on every hero — `stern` while straining, `shock` on the beat that surprises him, `cheer` on the one that pays | all gates hold; median 9.17, 0/30 |
| **R8** | ⛔ **the delivered mix measured -26.5 LUFS against a house band of -20.0 to -23.7** | VO stem was **-21.2 LUFS** where his previous takes are -14.3 to -17.0 |

## ⛔⛔ THE SFX BANK WAS WRONG TWICE OVER, AND THE SECOND ONE IS THE REUSABLE ONE

**1. Fifteen of twenty-four samples were flagged**, every one in reel 115's "puff
of air" class and every one defensible by name: `chimehi`/`chimelo` (AIR, 68 and
97ms attacks with 1.7% and 3.7% below 250Hz), `construction` (NOISE-BED, 37.8s of
broadband hiss, used 5x → also SLAP), `crowd_cheer` (NOISE-BED + AIR, 1205ms
attack), `digital-loading` (SWELL-317ms + HISS + AIR), `sand-steps` (all four),
`lib_click`/`lib_pop`/`lib_pop2` (AIR, 80-92% above 2kHz), `shimmer` (99.9%
above 2kHz), `sparkle`, `resolve`, `hit.mp3`, and `paper.wav` at 9 uses (SLAP).
Rebuilt on the low-ended survivors — impact 42% <250Hz · sub 96.6% · thock 88.6%
· boom 94.7% · twang 1.1% >2kHz · blip1-5 tonal · pop 0.6% >2kHz. **The five
machine beds were deleted, not replaced** — broadband room tone under a voice is
exactly what four rounds of reel 115 were.

**2. ⛔⛔⛔ THE AUDIT COULD ONLY SEE HALF THE BANK.** `sfx_audit.py` matches
`src: "…"`, and the local `run()` helper took its filename as a POSITIONAL
argument — so roughly **fifty cues were never measured**, including every
ascending run in the reel. `run()` now takes a cue object purely so the gate can
see them. **A check that silently matches nothing is worse than no check**
([[skipped-check-must-not-pass]] in a new costume).

**3. ⛔ AND THE AUDIT ITSELF CRASHED AT CUE 7 OF 24.** `wave.open` raises on mp3
and on float/extensible wav, and the bank holds both — so the tool aborted with
seventeen cues unexamined and a non-zero exit that reads like a normal failure.
Patched in `tools/sfx_audit.py` to decode anything non-PCM through ffmpeg.

**4. THE RATE WAS 1.94 DISTINCT EVENTS/SEC.** Measured against the right
reference rather than the doc's number: 141 GRAVITY (shipped) **1.37/s**, SQUAD
**1.45/s**, OX **0.82/s**. Thinned every accent run to 2-3 and dropped eight
single accents: **103 events, 1.45/s**, with the density PEAKED on the hook, the
press and the rewrite rather than flat.

## ⛔⛔ THE MIX WAS 3-5 dB UNDER THE HOUSE FLOOR, AND THE CAUSE WAS THE TAKE

`ebur128` on the delivered file: **-26.5 LUFS**, against 105 FREE -20.0 · 110
FLOW -21.3 · 119 OX -22.6 · 120 UNLAZY -23.7. The reel's levels were the house
ones, so the mix could only be quiet if the STEM was, and it was: **-21.2 LUFS
where his previous takes measure -14.3 to -17.0**.

⭐ **It is a CREST problem, not a gain problem, and the distribution says so.**
The take peaks at **-0.12 dBFS** — there is no headroom to add gain into — yet
only **0.2475% of samples are above -6 dBFS** and 0.04% above -3. A handful of
plosives sit near zero while the body of the speech sits 20 dB down. So the fix
is a lookahead LIMITER on that 0.25%, then a straight +5.5 dB: the median speech
level moved **+5.35 dB** (i.e. essentially untouched) while p99 was held to
+3.97 and the peak landed at -1.01 dBFS. **Nothing was compressed, re-voiced or
restored** — [[alex-vo-recordings]] holds.
⭐ Measure the STEM against previous stems before blaming the mix.


## September 11 2026 revision intake

Opened before proposing a new animation concept. Alex requested an elevated full edit from the
DEPARTMENT recording, with immediate subject action plus a slight camera push, strong hierarchy,
expressive original Claude sprites, detailed sets and repeated visual/sound review. Existing
September 8 edits were found in Drive folder 143 - DEPARTMENT and this repo.

Source identified through connected Drive: DEPARTMENT.m4a, file ID
1ij6kCWoXxYwd607uDBeUMjJpImp9jXvp, 3,427,234 bytes, modified September 8 08:40:46 UTC.
No newer same-name voice file was found in the VOs folder. Downloaded source is being checked
against the stored speech-span edit before reuse. Earlier gates above are historical, not new passes.

Intake status: reviewing existing storyboard, animations, source voice, claims and missing assets.
The newly indexed LM guidance is required input; LM-specific tutorial timing is not imposed here.
Next: rebuild source audio, inspect baseline hook and all scenes, then record concrete revision defects.


### September 11 completed revision — source and final export

The historical R1–R8 gates above are not evidence for this revision. The current output
was built from the DEPARTMENT Drive voice with SHA256
`6c5a0a6e566dcb4608a41644b0496cebb09549312afa7f86269679663b4f0bb0`.
Eighteen keeper passages remove retakes; 1.03x playback preserves the full message.
The last spoken word ends at approximately 70.92s; the 71.0667s export keeps its tail.
LM's request to cut on “setup” belongs to LM and was not applied to this different script.

| Review | Defect found | Change and evidence |
|---|---|---|
| Source parity | Drive's FULL hook differed from Git's hat tower | Built a new reproducible green dispatch-machine hook in `DeptHookPolish.tsx`; the older movie is not claimed as reproduced |
| Opening rounds 1–2 | Lever and gear motion did not change enough of the subject; motion 3.99 | Added large, individually routed SKILL.md sheets and increased visible compression |
| Opening round 3 | Agent launch ended too early; motion 5.47 | Staggered landings, contact squash, expression changes and five different finished work products |
| Opening round 4 | Follow-through and hierarchy needed verification | Hook motion 6.01 before delivery encode; final 6.04; operator pixels change between f0 and f1 |
| Body bounds | Edge operators, props and CTA crowded right edge | Moved each operator with its props/shadow; reduced walks and TEAM push; narrowed and centered keyword board |
| Final full export | Every scene passed, but overall median 8.85 was below 9.00 | Larger centered MOST approach and distinct work products rising into TEAM bays; final median 9.32, all 29 scenes at least 6.0 |
| Audio | Missing legacy cue filenames; excessive repeated accents; helper-based cue count hidden from regex | Replaced missing files, reduced bright/redundant layers, expanded 106 actual layer cues and rendered a separate SFX stem |
| Delivery color | Remotion picture was full-range BT.601 matrix with incomplete tags | Converted actual pixels to limited-range BT.709 before tagging and final AAC mux |
| Resource accuracy | Marketing README count lagged its directory; finance/legal READMEs stale | Marketing header now 45+; guide explains 50 current marketing entries and verifies 8 finance/9 legal skill folders |

Final checks on the delivered MP4: typecheck; 9/9 verifier checks; scene motion
median **9.32**, **0/29 failing**, hook **6.04**; all 2132 decoded frames checked,
longest panel difference run below 0.6 **one frame** (bar 12). First-frame actor
difference **4.9095**; final 1.5 seconds of hook average panel difference **2.4891**.
Hook luma **161.2**, body saturation **68.2%**, body black p10 **9.6**.
The look tool retains its nonblocking “header pill” advisory; it is not reported as absent.
Caption words were compared to fresh ASR, with brand spelling corrected and UI UX tokenization
normalized; largest matched-word timing difference **0.088s**.

Audio inventory: **106 layers**, **15 files**, **103 actual start timestamps**.
The actual SFX-only stem measures **−14.59 dBFS peak** and **−47.16 dB A-weighted
whole-track RMS**; it contains effect energy in 309 of 711 100ms windows. Individual
cue gain/level estimates are separately included in the source package. A cue energy
check on the complete mix alone cannot prove an effect is audible over narration.
No missing, banned air, hiss or swell cues were found. These are measured audio
checks, not a claim that a person listened to the final mix.

Companion guide: [Build your AI team with Claude skills](https://chen.media/guides/build-your-ai-team-with-claude-skills),
keyword **DEPARTMENT**, 1348 words with all five departments, exact source links,
install commands, customization and tests. Published and full-body/download verified.
Site source commit `b3b9332`; deployment `dpl_4E5bHxUqJ9osNKGUdBUypuFQhKPf`.

Drive delivery uses the existing canonical file ID `14IvVB1jWwDofGqaHGR_JCIWzd0VIbBHV`.
Old FULL, HOOK and small versions are preserved in **Archive - previous cuts**.
The main folder contains one current MP4 plus caption, frame zero and the source archive.
The current upload receipt is kept with the local delivery notes; this log does not
treat the earlier file's metadata as proof of the new bytes.

Reusable findings are indexed in [DEPARTMENT source and motion proof](../alex-department-source-and-motion-proof.md)
and linked to [Alex's LM corrections](../alex-lm-hooks-demo-and-delivery.md).


## September 11 user rejection: recreate is not revise

Alex rejected the delivered revision as recreating what he already had, and said
the opening concept and many animations throughout were not good. This supersedes
any inference of creative approval from the preceding technical passes.

New revision intake, before authoring: the repeated workshop/machine/rack staging
is the primary defect. Keep original narration, captions, house chrome and sprite
identity; replace the creative action and framing throughout. Passing motion
checks is a build floor, not evidence that this request has been fulfilled.

Candidate hook mechanisms: (A) an overwhelmed founder catches five oversized job
props and passes them to specialists; (B) five competing desk lights pull one
founder between jobs; (C) a founder conducts five departments into an ensemble.
A is selected for a motion probe because its problem and relief read without
decoding an abstract mechanism. B risks looking like five labeled panels; C spends
too long establishing a metaphor. The user's standing request authorizes autonomous
iteration, so the revision proceeds while reviewable probes are built.


### Rebuild review rounds (not acceptance)

1. Entire storyboard and all 31 shot bodies replaced. First motion preview found
   props reading as a floating icon row, weak hand contact, and repeating low-edge
   characters. The hook's first motion was still a sway. These were creative defects
   even before any motion score was measured.
2. Replaced the hook's sway with crossing, gravity-shaped juggling arcs; specialists
   catch the work. Reframed its final shot around a large campaign result, with other
   specialists receding in depth. Enlarged primary characters; a camera produces
   a print and the design's major blocks physically change positions. Native review
   exposed missing support under the elevated hook characters; desks/platforms added.
3. Whole-reel motion review found empty lead-ins and parked tails in several new
   scenes. Changed local action windows to start immediately and run into a result;
   expanded meaningful travel in the paint, edit, design, statement/variance, contract,
   fit and guide handoff actions. The new sound map expands to 102 layers over 71.07s.
   Full expanded audit caught repeated bright c_bump/key samples hidden by the prior
   helper-based audit. Reduced each bright sample to fewer than five uses and replaced
   the extra contacts with measured mallet/wood cues.

The short opening draft was shared for optional direction feedback while independent
body refinements continued. No response or delivery is treated as creative approval.

4. Native whole-body review checked complete actor/prop bounds, not just center points.
   Upper office floors and hook platforms now support the characters. The design
   introduction depicts a browser layout rather than a house plan. Finished work is
   larger in the campaign and team shots so it reads at phone size.
5. Strengthened the physical results: a display is erected while painted, the content
   performer jumps for the camera, the camera prints the shot, identical sites spread
   into a fan before one is recomposed, and a finished brief closes the team handoff.
   The music-only low shelf is +1.5dB at 150Hz; the input is attenuated 2dB before EQ
   and that headroom restored in the mix, so the prepared stem stays below full scale.
   Narration processing, speed and caption timing are unchanged.

The current rebuild imports eight transitive source files. The rejected speed-ramp
pass temporarily added DeptPerformance.ts as a ninth file; that file is removed.
DeptScenes, DeptWorld and DeptHookPolish are retained as historical source but are
not in this render's dependency graph. Shared SlopKit chrome and the original Mascot anatomy are retained.

6. Full-film and phone playback review found the generic suit staying upright and the
   team handing over its result too late. The suit now tips, drops and spills across
   the floor as Claude escapes; the team starts its transfer earlier and the final
   brief continues traveling through the cut. Specialist catch hands follow the props.
   The DEPARTMENT registry had been split across source abbreviation `dept143`,
   number-first log `143department`, and storyboard `department`. Verified aliases
   now join all four assets into one complete reel row; every unrelated row was
   compared against HEAD and remains unchanged. The rejected board moved into
   `storyboards/archive/`, leaving one canonical current board.

7. Native catch-frame review rejected overextended hand links: they created long
   crossing lines instead of contact. Links now appear only near the catch. Removed
   detached sleeve overlays that obscured the tailor scene; the suit itself rotates
   and falls, and the escaping face stays inside the safe edge. The campaign copy
   sheet now has a separate weighted placement. The v8 source render passes all
   31 scene floors with median 9.04; final encoded-file checks follow below.

### Historical rejected speed-ramp pass — not guidance

8. Full decoded-frame QA caught 16 quiet frames at SKILL FILE's tail and 13 at the
   storefront head; action travel was extended into those intervals. Alex then
   explicitly called the repeated speed predictable and boring. The next performance
   pass replaces the shared glide rhythm with 31 individually authored action clocks,
   without retiming narration. Sound cues are inverse-mapped to maintain contact.
   Original sprite stride, anticipatory lean, gaze and recoil are staggered; the
   camera closes its aperture, lenses inspect along authored paths, and Claude Code
   has a typing cursor. Retention and creative acceptance remain unclaimed.

9. Strengthened secondary task motion after reviewing the varied-speed pass: tools
   turn and travel with the specialists' work gestures, the film strip is tall enough
   to read its changing frames, the camera print is larger, and the finished phone
   keeps moving into the cut. Campaign copy lands with weight; the site rebuild and
   reconciliation statement remain dominant while their actors react. These changes
   preserve each action's distinct speed curve.

10. Final staging review found the new website was drawn in front of its peeling
    stencil, hiding the removal. The stencil now peels from the front and reveals
    the changed composition underneath. Reconciliation lifts the abacus into the
    comparison; the instant print contains the original Claude rig from the shot,
    replacing the reused abstract campaign artwork.

### Historical encoded checks — rejected performance revision

- 1080×1920, 30fps, 2132 frames / 71.0667s; actual full-range BT.601 to
  limited-range BT.709 conversion, H.264/yuv420p + AAC 48kHz.
- All 31 scene floors pass; median motion 9.14 against 9.0. All 2132 frames
  decoded; longest panel run below 0.6 is 9 frames (bar 12). Frame0→1 MAD 12.36.
- Verifier 9/9; script/caption match; prepared voice unchanged from ASR-checked
  source. There are 102 SFX layers across 101 starts; actual isolated SFX stem
  measured separately. Bank clean; mix >2kHz 37.1%, <250Hz 9.7%, both in band.
- Look blocking checks pass: hook luma171.3, body saturation67.5%, black p10=26.5.
  Header-pill and body-luma108.3 are nonblocking advisories, retained in the reports.
- Native frames and whole-film contact sheets reviewed, with phone playback of the
  performance pass. Three isolated-package/source frames match exactly: 0,1150,1968.
- Source package contains nine transitive files, original voice and only required
  media. The canonical current board, indexed rejection/timing learnings and complete
  DEPARTMENT registry row are included or linked. No creative acceptance, audience
  retention result or human listening check is claimed by these technical results.

### User correction: withdraw shared speed ramps

Alex explicitly rejected the pushed interpretation because the animation randomly
slowed down and sped up. Different objects/animations should have different fixed
speeds; an individual movement should not change speed halfway through. The prior
scene-clock and inverse-sound advice is withdrawn, and its implementation removed.
The current source uses real local frames and per-object fixed travel durations.
This correction supersedes the historical speed-ramp review and its technical passes.

### Historical checks — subsequently rejected steady-motion delivery

- The final encoded correction uses real local frames with fixed travel durations
  for each object/action. Shared time warps and inverse sound mapping are removed.
- All 31 scene motion floors pass; median 9.30. All 2132 frames decode; the longest
  panel run below 0.6 MAD is 7 frames against the 12-frame bar. Frame 0→1 MAD is 5.31.
- Verifier 9/9, script/caption match, 101/101 declared SFX starts have audible energy.
  The 102-layer cue map uses 14 files. Mix balance remains 37.1% above 2kHz and
  9.7% below 250Hz. Narration processing and caption timing are unchanged.
- Look blocking checks pass: hook luma169.5, body saturation67.6%, black p10=26.5.
  Header-pill and body-luma108.3 remain nonblocking advisories in the actual report.
- Native frames 0,1150,1968 from the isolated eight-source package match the corrected
  source bundle exactly. The final file is 1080×1920, 30fps, 71.0667s, H.264/yuv420p
  limited BT.709 with AAC 48kHz; the range and matrix are converted during encoding.
- These checks establish technical integrity only; they do not establish creative
  approval, audience retention, or a human listening check.

### Active revision: natural action speed, September 11 follow-up

Alex rejected the steady-motion delivery as too slow, unnatural and insufficiently
detailed/interesting. The previous correction removed scene speed ramps but kept
long 40–118-frame translations. This is a separate defect; neither the 9.30 motion
score nor the steady-travel rule makes it acceptable.

Implemented change: replace stretched scene-length travel with short, physically
plausible operations and a sequence of consequences: arrival, useful operation,
contact, result, reaction. Author each object's timing directly, preserve original
sprite anatomy and narration, add construction/operation detail, then review short
normal-speed probes before the full export. No shared time warp is being restored.

#### Internal moving-draft reviews

- v14 replaced long travel with short per-object actions and removed automatic
  scene-independent recoil. It was not delivered: shortened moves left weak
  follow-through, crowding in the hook, and quiet regions in the atelier/guide.
  Its motion audit reported 20/31 floor failures and median5.52.
- v15 refined the hook spacing, made the illustrated retail campaign recognizable,
  unfurled the actual poster material, added large inspection detail, handled cloth
  as a collapsed pile, kept the code rewrite readable and opened the guide into
  pages. It was not delivered: 16/31 motion floors failed, median5.90.
- v16 enlarged individual operators and gave them work-position locomotion with
  matching walking gait, instead of generic idle/recoil. Widened the paint surface,
  opened the code screen quickly and clarified the reconciliation handoff. It was
  not delivered: 7/31 floors failed, median6.93. Native/full-film review continued.
- v17 strengthens the hook's primary result, unfolds the shared plan in separate
  stages, makes the responsive test visible and hands out the custom brief only
  after the rewrite completes. Technical checks and creative review are separate.
- v18 replaces the shared-plan abstraction with a bound department book, improves
  the hook handoff, fixes roller-to-hand contact and clips arriving UI inside its
  browser. Its two floor failures were shared brief5.55 and start design5.54;
  median7.06. It was not delivered.
- v19 gives the book a quick physical placement and clearer operator action, and
  frames the design setup more closely. Its remaining scene floor was start
  design5.92. The decoded trace found 16 quiet frames in the atelier and identical
  template tail, and 14 after recomposition. It was not delivered.
- v20 draws the wireframe, stacks the identical sites for comparison and pulls out
  an actual mobile preview. All 31 scene floors passed; median7.07 remained below
  the documented9.0 target. The every-frame check still found the atelier's
  16-frame near-still tail. It was not delivered.
- v21 makes the atelier operator walk into position for the next drawing action,
  connecting the wireframe reveal to the following shot. This addresses the last
  decoded pause without slowing down an earlier operation or adding a shared
  speed curve. Final measurements are recorded below after the encoded check.

The cup/pastry campaign is an illustrative retail-work example drawn in SVG, not a
claim about Alex's business or an external brand. The original source voice, caption
timing and selected music remain unchanged. New motion/source reports supersede
older rejected-pass reports only when the corresponding render is checked.

#### Encoded natural-action revision — v21

- Final picture: 1080×1920, 30fps, 2132 frames / 71.0667s. Actual full BT.601 to
  limited BT.709 conversion, H.264/yuv420p and AAC48kHz. Original voice, captions,
  and selected music are unchanged; contact sounds follow the new actions.
- All31 per-scene motion floors pass. Weakest: DISTINCT RESULT6.03. Median7.07
  remains below the documented9.0 motion-density target; this is explicitly not an
  all-benchmarks pass. The previous9.30 edit was rejected as slow, so long glides
  or unrelated motion were not reinstated to raise this number.
- Every2132 frames decoded. Longest near-still panel run is12 frames, at the mobile
  result, matching the12-frame bar. Frame0→1 MAD8.44. The atelier, template and
  recomposition pauses found in earlier drafts were replaced with useful actions.
- Delivery verifier9/9; caption text matches the known script.106 SFX layers across
  105 starts,14 source files; actual separate SFX stem and expanded inventory
  measured. Full-mix energy at105/105 starts is not proof of effect audibility by
  itself. Mix spectral balance:36.8% above2kHz and9.7% below250Hz, both in band.
- Look blocking checks pass: frame0 luma169.0, body saturation67.0%, black p10=26.5.
  Header-pill11.9% and body luma107.8 remain reported advisories.
- Inspected native frames and full-film midpoint sheets, plus sampled normal-speed
  browser playback across the hook, work scenes, design and customization. Four
  native source/package frames match exactly:0,930,1150,1968. The isolated package
  contains eight transitive sources and its own required public media.
- The guidance is linked from CLAUDE.md, MEMORY.md, animation craft and build
  learnings; the registry/index check passes. These are production findings, not
  a record of user creative acceptance, measured retention or human listening.
