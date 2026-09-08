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
