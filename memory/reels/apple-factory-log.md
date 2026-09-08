# APPLE — factory log (**FACE reel 13**)
> ⛔⛔ THIS IS A **FACE** REEL — Alex's facecam is in it. Face and Faceless
> number SEPARATELY ([[video-assets-to-personal-gdrive]]). Delivery goes to
> `gdst:"Claude Reels/Face/*Videos/13 - APPLE/"` — files `13 - APPLE.mp4`,
> `caption.txt`, `APPLE - <Title>.docx`. ⛔ NOT Faceless: 92 is already a
> different, live faceless reel there.
>
> ⛔ Opened STAGE 0 per [[factory-log-first]]. Source: `IMG_3530.MOV` (178.6s raw).
> Keyword **APPLE**. Pre-locked VO.

## STAGE 0.5 — ⚠️ FACT-CHECK AMBIGUOUS: WHICH REPO?
The VO says "someone just turned Apple's design language into a skill" but never
names it, and there are at least two, both small:

| candidate | stars | description |
|---|---|---|
| `dickwu/apple-design-skill` | 47 | Cross-platform UI/UX design reviewer based on Apple... |
| `chaos-xxl/apple-design-skill` | 14 | An open-source AI Skill that guides AI coding assistants... |
| `haider-nawaz/liquid-glass-skill` | 37 | Claude Code skill for building/migrating Apple Liquid Glass |

⛔ **Alex must pick one.** The CTA promises "I'll send you the skill" — a keyword
gate cannot be fulfilled against an unnamed repo.

⚠️ **And the numbers are weak.** 47 stars carries none of the social proof that
139k does for AGENCY. The reel cannot lean on the count, so the payoff has to be
the AUDIT RESULT — the VO's own better idea: *"take an existing website to the
next level ... it will notice so many minor details that are wrong"*. Build
toward showing a real audit on a real site, not toward the repo page.

## STATUS: blocked on which repo.

## STAGE 1 — VO CUT ✅ (2026-08-07)

| | |
|---|---|
| voiceover | `brand-system/out/vo6/video3-APPLE-VO.wav` — **29.2s** |
| EDL (source time) | `brand-system/out/vo6/video3-APPLE.edl.json` — 16 spans |
| conformed facecam | `brand-system/out/vo6/deliver/VIDEO-3-APPLE.mp4` |
| ⭐ **VO to mount** | `brand-system/out/vo6/deliver/VIDEO-3-APPLE.wav` — **frame-aligned to the picture** |
| raw | `~/Downloads/IMG_3530.MOV` · 48k audio `brand-system/out/vo6/src/hi_3530.wav` |
| transcript | `brand-system/out/vo6/src/tx/IMG_3530.json` — energy-gated, do NOT regenerate casually |
| batch | **6** — every tool takes `--batch=6` or `VO_BATCH=6` |

⛔ **USE THE `deliver/` WAV, NOT `FINAL/`.** They are the same edit, but the
`FINAL/` one is cut on EDL times while the picture is quantised to whole source
frames — measured up to 2.5 frames of accumulating offset. `deliver/` is cut on
the frames themselves and matches the mp4 exactly.

Marker gate: **0 "cut cut" survive**. Every script sentence is covered by a take
except where noted below.

✅ clean read, keyword INTACT.

> ⛔⛔ **THE MARKER GATE ABOVE IS WRONG FOR THIS REEL.** A surviving "cut" and an
> "okay" are audible at vo 19.3-21.6s. Measured and fixed in STAGE 1.5 below.
> The gate reported green because it counted the *phrase* "cut cut"; what
> survived is a single "cut" plus a filler, inside four fragments the picker
> assembled out of the restart region. ([[lint-shots-covers-16-of-89-laws]] —
> a green gate is not a legal cut.)

⛔⛔ I FIRST REPORTED THE KEYWORD MISSING. It was not. He gives the full line
**twice** — 167.30s and 169.40s — and whisper spells APPLE differently on every
pass: "Apple knows", "down below", "up", "I don't know". The transcript-driven
selection therefore could not hold the phrase together and shredded the take into
three fragments, and I read that as "he never said it" and told Alex it needed a
re-record. Alex: *"no i did say that in one of the takes i said the full line"*.

⭐ **The take is now PINNED** in `pick_takes.py` `PINS[6][3][8] = (169.22, 171.20)`
— the second read. A pin overrides every rule above it, so it is only ever for a
defect confirmed by transcribing the RAW in short isolated windows.
⛔ The lesson generalises past this reel: **a missing word in a transcript is not
evidence of a missing word in the audio**, and it is never grounds for asking for
a re-record. Listen to the raw in 3s windows first ([[transcript-is-not-ground-truth]]).

## STAGE 1.5 — ⛔ VO RE-CUT (r2), 2026-08-07 · AWAITING ALEX'S EAR

### The defect
Transcribing the **finished** wav in isolated 6s windows (the log's own rule 3)
returned, at 20-26s: *"**cut.** So instead of trying to spend hours…"*. Five
independent short windows over 19-22s each returned some of `cut` / `okay` /
`it's on the screen` / `trying to`.

⛔ A transcript is not evidence ([[transcript-is-not-ground-truth]]), so it was
measured three ways before anything was touched:

| evidence | result |
|---|---|
| 5 isolated whisper windows, 2-4s | every one reports `cut` and/or `okay` |
| RMS energy, 40ms frames, vo 18.8-22.2 | **four short bursts separated by gaps** at 19.24 / 19.96 / 20.48 / 21.08, then continuous speech from 21.63 |
| RAW at src 151.0-154.0, isolated | *"So instead of trying to **cut cut**, so instead of trying to **cut cut**. Okay, so"* |

So EDL spans 11-14 (src 151.92-155.30, 2.34s) are four fragments of an **aborted
restart**. ⭐ And they are pure loss: the clean take in span 15 already begins
*"So instead of trying to spend hours…"* — the words the fragments were stuttering
toward. Nothing is lost by removing them.

### Two smaller defects found by the same measurement
Spans 15 and 16 each start **after** their own speech onset, clipping the
opening consonant:

| span | speech onset (measured) | EDL head | clipped |
|---|---|---|---|
| 15 `"**S**o instead of…"` | 155.70 | 155.74 | 40ms |
| 16 `"**C**omment APPLE…"` | 169.46 | 169.48 | 20ms |

⭐ This is why the keyword read as unstable. With the head restored, whisper
spells **"Comment Apple"** correctly for the first time; on the old cut it gave
"app" / "up" / "appernos" / "Call the app" and never once "Apple". The word was
always there — the cut was eating its plosive.

### The r2 cut
`out/vo6/video3-APPLE-r2.edl.json` — 16 spans → **12**, every cut recorded
([[edl-must-record-every-cut]]). Conformed with `tools/conform_edl.py`, which
cuts picture and audio on the *same frames*, so lip sync cannot drift:

| | |
|---|---|
| VO | `out/vo6/deliver/VIDEO-3-APPLE-r2.wav` — **26.9667s** |
| picture | `out/vo6/deliver/VIDEO-3-APPLE-r2.mp4` — **809 counted frames** @30 = 26.9667s ✅ exact ([[facecam-conform-count-frames]]) |
| removed | 2.17s of restart fragments |
| re-verified | splice transcribes clean in 3 isolated windows: *"…that you're getting wrong. So instead of trying to spend hours copying Apple's design manually…"* |

⛔ **NOT COMMITTED — Alex hears it first** ([[vo-ml-restoration-studio]]).
A/B built at `out/vo6/ab/APPLE-splice-AB.wav` (16.9s): **A** = old cut 15.6-24.6
(the defect), 0.9s gap, **B** = r2 15.6-22.6 (fixed). The originals are untouched.

## STAGE 1.6 — MEDIA + GEOMETRY

⛔⛔ **THE BOOTSTRAP COMMAND BELOW WAS WRONG — `.webm` IS DEAD.** `make_matte.py`
hardcodes **ProRes 4444**, which is not legal in a WebM container: ffmpeg exits
before frame 1, the script dies on `BrokenPipeError` and leaves a **262-byte**
file. Corrected to `matte.mov` here and in the COURSE/AGENCY/SEO/LOCAL logs.
⛔ And it printed as a pass — `python3 … | tail` returns *tail's* exit code, so
`&&` carried on to "BOOTSTRAP DONE" over a dead encoder
([[reel-tools-hardcoded-to-old-reel]]).

### ⭐ CROP / FULL — solved for this shoot (law 92, never cloned)
`pub6/footage3` median nose **(0.4712, 0.4340)**, shoulder width **0.3175**.

```ts
const CROP = {width: 1413, left: -178, top: -998};   // card
const FULL = {width: 2540, left: -614, top: -1149};  // full-bleed
```

**Calibrated to reel 83 (KEY)** — declared, because there is no single house
number: `derive_crop.py` reproduces KEY's shipped constants exactly (delta
`[0,0,0]`) and reel 84's are a genuinely different look, 5% larger and 30px
higher. ⛔ Do not read a `--check 84` failure as a broken tool: it means
"83's look is not 84's", which is true. `--like 83 --check 83` is the validation.
⛔ AGENCY's `1364/-143/-934` are a *different shoot* (IMG_3528) — not clonable.

### ⛔ Matte + landmarks must be rebuilt for r2
The first pass was built against the 874-frame original. If r2 is approved the
picture is 809 frames and both must come from it, or the cutout runs 65 frames
long against the VO. Rebuilt into `pub6/footage3r2/`.

## ⛔⛔ WRONG PIPELINE — CORRECTED 2026-08-07

> Alex: *"BRO THIS IS THE CHENBUILDSAI GITHUB VIDEO EDITING WORKFLOW NOT THE
> FACELESS ONE…"*

I opened this reel as a **faceless** build — factory-log STAGE 0/0.5/1, a
fact-check "blocker", a storyboard and GATE A. That is `claude-reels-workflow`'s
pipeline. A FACE reel is built with the **chenbuildsai editing system** in
`~/Downloads/brand-system`, whose entry point is its README → `docs/START-HERE.md`
→ `docs/RECIPE-NEW-REEL.md`. I read `WORKFLOW.md` and never opened either of the
two pages the README actually routes to — [[read-the-repo-docs-first]] repeating
almost verbatim.

**The real pipeline (docs/START-HERE.md):**
```
0 takes · 1 concat · 2 voice · 3 transcribe · 4 shot table · 5 shot list
6 cues · 7 music · 8 landmarks · 9 matte · 10 GATE lint_shots · 11 render
12 VERIFY — transcribe the RENDER and diff against the script
```
Steps 0-3 were done by the VO-prep session. ⛔ There is no storyboard/GATE-A
stage in it, and no "STAGE 0.5 blocker" — the repo question is a CTA-deliverable
question, not a gate on the edit.

### RECIPE step 0 — assets ✅ (against the r2 cut)
| asset | state |
|---|---|
| `pub6/footage3r2/clean.mp4` | 809 counted frames @30 = 26.9667s |
| `pub6/footage3r2/matte.mov` | prores **yuva444p12le**, 809 frames, 348 MB |
| `pub6/footage3r2/landmarks.json` | 809 frames, **0% no-detection** |
| `pub6/footage3r2/words_clean.json` | **114 words**, 5 repaired, ends 26.72s |
| `pub6/footage3r2/vo.wav` | 26.9667s |
| plates | `public/plates/studio-day{,-vertical}.png` present |

True script checked in at `out/vo6/scripts/APPLE.txt`, built the way
`tools/vo6_words.py` demands — from the **cut wav** in isolated windows, 6s and
4s passes cross-checked, ⛔ never by mapping the source transcript through the
EDL (that method silently dropped SEO's "18 agents").
⚠️ One word unresolved by ear: *"…copying Apple's design manually, **even** the
actual rules…"*. Six tight windows all say `even`; the source transcript says
`you get`, which reads better. Flagged, not silently chosen.

### RECIPE step 1 — segments (6 beats; 4 exceed the 3.4s ceiling and must split)
| # | t | dur | line |
|---|---|---|---|
| 1 | 0.00-3.04 | 3.04 | So someone just turned Apple's design language into a skill. |
| 2 | 3.48-7.62 | 4.14 ⚠️ | Instead of telling Claude, hey, can you make this website design better, you give it elite design rules to follow. |
| 3 | 8.06-13.28 | 5.22 ⚠️ | Now most people use this to build a new website, but a better use case is to take an existing website to the next level. |
| 4 | 13.66-18.98 | 5.32 ⚠️ | So just drop the skill in the Claude and tell it to audit your own website, and it will find so many minor details that you're getting wrong. |
| 5 | 19.34-24.90 | 5.56 ⚠️ | So instead of trying to spend hours copying Apple's design manually, even the actual rules behind why each design looks so good. |
| 6 | 24.90-26.72 | 1.82 | Comment APPLE and I'll send you the skill now. |

### HOOK VARIANTS — `src/scenes/hooksApple.tsx`, comp `Apple13Hooks` (frames 30-35)
Six options, chrome CLONED from `hooksRepoFace.tsx` ([[clone-chassis-or-it-breaks]]).
Stills in `out/apple13/`; `SHEET.png` is the 3x2 contact sheet.

| | concept | register | note |
|---|---|---|---|
| A | GRID — a loose page snaps onto Apple's grid | OBJECT | clean read |
| B | MARKS — red audit pins rain onto a page that looked fine | OBJECT | ⭐ strongest, matches the VO's own payoff |
| C | FOLD — a wall of 12 Apple screens collapses into one file | OBJECT | level 3 (different noun) |
| D | MANUAL — the manual open, rules lifting off as bars | OBJECT | weakest concept |
| E | SAME SITE — one page, a wipe, Apple-clean behind it | OBJECT | before/after |
| F | DROP IN — the skill loading in Claude, real terminal | **SCREEN** | ⭐ the only one that PROVES |

⭐ **HOOK CROP ≠ BODY CROP.** The hook card is `{x:60,w:960,y:1140,r:40}` with the
face much larger. Solved from this shoot's own matte+landmarks against the two
constraints reel 85 ships — crown **170px ABOVE** the card top (the head breaks
out) and shoulders 394px down — giving `{width:1626, left:-300, top:-1108}`.
The solver reproduces footage85's shipped `1500/-348/-980` to within 8px, which
is what makes it trustworthy. ⛔ He sat further back than 85, hence 1626 not 1500.
⛔ Crown is NOT a landmark — it is the topmost opaque MATTE pixel (0.3245 here).

### ⛔ THREE DEFECTS THE FIRST RENDER HAD, ALL INVISIBLE IN THE SOURCE
1. ⛔ **`squash()` returns `{x,y}`, not a number.** `scale(${sq})` emitted
   `scale([object Object])`, which SVG silently drops — so the whole object
   rendered untransformed in the top-left corner. Nothing errored. The
   docstring shows the correct form; I did not read it before using it.
2. ⛔ **The band collided with the face card.** Drawn at `FLOOR-40` with a 250px
   half-height, the bottom row went behind the card and left a dead gap under
   the header. The band lives BETWEEN header (~400) and card (1140): centre
   `BAND_Y=880`, half-height ≤230, per-variant scale.
3. ⛔⛔ **F's terminal rendered INVENTED STATS** — "Auditing 34 components /
   spacing · 11 issues / contrast · 6 issues". Nobody has run this skill against
   anything. Replaced with categories and no counts. ⛔ **The numbers only go
   back in once the skill is actually run and the output captured** — which is
   the one thing the repo choice still gates.

⭐ And two variants previewed as their own AFTERMATH: C's collapse and E's wipe
both completed before the preview frame, so C showed an empty stage and E showed
only the clean side. **A transformation shot must be judged mid-transformation**
— retimed so the wall holds and the wipe sits mid-frame.

## ⛔⛔ HOOK ROUND 1 REJECTED — SIX NOUNS. ROUND 2 = SITUATIONS.
> Alex: *"the animations are genuinely horrible... did you even follow the
> chenbuildsai github repo about animations? You didn't even follow the header."*

I had never opened **`docs/ANIMATION-BAR.md`**. Its two automatic kill tests fail
all six of round 1: *is it a single prop being handled?* and *does the object's
name appear in the line?* A grid for "grid", a file for "one file", a manual for
"the rules" — every one a **synonym for the sentence**, so the picture carried
nothing the words didn't. And every one a statement, not a loop.

⭐ *"Everything rejected was a NOUN. Everything approved was a SITUATION."* The
question that returns a prop is "what object represents X"; the one that works is
**"what would someone SEE if this were true?"** A situation needs an AGENT WITH
INTENT · a STAKE WITH A VISIBLE OUTCOME · a GENRE the viewer already reads, and it
must OPEN A LOOP resolving in the last third.

### ⛔⛔ AND THE CHASSIS WAS THE WRONG ONE TOO
`AgencyS1.tsx` states it outright: **two systems exist and the documented one is
not the shipped one.** `src/layout/` (Paper·Header·FaceFrame·zones.ts) is what the
markdown describes; **`src/patterns/` (Plate·Headline·Grain·Matte) is what every
finished reel imports.** I cloned `hooksRepoFace.tsx`, an older format, and so:
- ⛔ drew **`clean.mp4` directly**. The card never contains his footage — it is a
  studio **Plate** with the alpha-matted **cutout** over it ([[matte-is-the-cutout-not-a-mask]]).
- ⛔ no `Progress` arc, no `Grain`, no grunge, no `holdBefore` blink fix.
- ⛔ wrong card geometry (60/960/1140 instead of 68/945/1180).

Round 2 clones `AgencyS1.tsx` → **`src/scenes/AppleS1.tsx`**, swapping only the
per-reel constants. Gated: `chassis_diff.py --ref CodeS1.tsx` → Progress 99.6%,
CardFigure 100%, FullFigure 100%.

### ⛔ LAW 29 — THE HEADER NEVER REPEATS THE VO (caught twice)
AGENCY's header is `286 SPECIALISTS` — a verified count he never says. All six of
round 1 restated the line. First replacement, `53 APPLE GUIDELINES`, broke it
*again*: he says "**APPLE'S** design language", so APPLE is a VO word — and 19
chars at 104px **overran 1080**, slicing both ends off frame in all three drafts.
Final: **`53 GUIDELINES`**, 13 chars.
⭐ **53 is CAPTURED** — `references/hig/*.md` counted off the GitHub tree API for
`dickwu/apple-design-skill`. ⚠️ contingent on that being the repo.

### The three drafts — `hooksApple2.tsx`, comps `ApD`/`ApE`/`ApF`, frame 52
| | situation | axis · genre | loop |
|---|---|---|---|
| D | THE PANEL — your site on an easel before three reviewers; every paddle comes up the same mark | AGENT · talent show | what is the verdict? |
| E | THE LINE — the site rides a belt under an inspection gantry; what was wrong drops into a bin | MACHINE · factory QC | does it come out? |
| F | THE TABLE — the site set down on a lit showroom table between two crisp products | PLACE · showroom | does it belong? |

⭐ **D is the strongest read.** F is weakest — it says "different colour", not
"worse design". E's bin is the "so many minor details" quantity made visible
*without* asserting a number.

⛔ Draft-frame faults found and fixed: E's belt+bin ran to y1074, **straight
through his head** (the cutout breaks out of the card to ~y990 — nothing may be
drawn past `BOT`); D's middle paddle rose behind the easel and was invisible.
⛔ A render also failed on `bodies11course.tsx:267` — the **COURSE session's
in-progress save**, since the bundle is shared. Retried, did not touch their file.

**NEXT: Alex picks a situation → build it out → step 2 plan (`plans/apple.ts`,
must lint 0 findings) → step 3 design.**
⭐ Step 3 is where the quality is decided — a reel that comes back "too basic"
skipped it (RECIPE §3 + WORKFLOW.md CONCEPT ESCALATION).

### ⛔ HOW THIS BATCH DIFFERS FROM Aug-02, and why it matters here
The recordings restart **without** saying "cut cut" — often with no pause at all.
Marker-splitting therefore cannot find take boundaries, and `pick_takes.py` was
rewritten to pick takes by ALIGNMENT instead. Three things follow for the build:

1. ⛔ **Re-run nothing blindly.** `VO_BATCH=6` is mandatory; the named cuts in
   `build_vo5.py` are keyed by batch, and running without it applies Aug-02's
   cuts to this audio and still reports success.
2. ⛔ **The transcript is generated, not given.** `tools/transcribe_takes.py`
   re-reads any stretch of speech the transcript fails to account for. If you
   re-transcribe with a plain whisper call you WILL lose restarts and the cut
   will silently regress.
3. ⭐ **Verify by transcribing the finished WAV in short windows**, never the raw.
   Whisper smooths a restart away on a long file and spells it plainly on a
   5-second one.

### ⭐ FIRST THING TO RUN IN THE BUILD CHAT
The matte and landmarks are deliberately NOT pre-generated — they are per-reel and
take ~2 minutes, so they are made where they are used rather than staged.

```bash
cd ~/Downloads/brand-system && mkdir -p pub6/footage3 && \
  cp out/vo6/deliver/VIDEO-3-APPLE.mp4 pub6/footage3/clean.mp4 && \
  python3 tools/extract_landmarks.py pub6/footage3/clean.mp4 pub6/footage3/landmarks.json && \
  python3 tools/make_matte.py pub6/footage3/clean.mp4 pub6/footage3/matte.mov
```

⛔ `matte` IS the cutout, not a mask — never draw `clean.mp4` over it
([[matte-is-the-cutout-not-a-mask]]). ⛔ CROP/FULL constants are PER-SHOOT; do not
reuse reel 89's ([[cloned-crop-constants-per-shoot]]). ⛔ Prefix every asset with
the reel number ([[reel-asset-name-collisions]]).


## ROUND 5 — STEP 0 DONE PROPERLY, AND THE PACE PREMISE WAS WRONG (2026-08-07)

### ⛔ THE HANDOFF'S PACE NUMBER DID NOT DESCRIBE OUR OWN WORK
The handoff said build to *"1.2-1.4s median, 20% under 0.7s"*. That is the
**external reference** figure in `ANIMATION-BAR.md`. Measured off the reel that
IS the bar (`tools/shotmap.py out/CODE_v18.mp4`, plus a band-cropped variant
because the facecam runs continuously and a whole-frame diff under-counts):

| | shots | median | under 0.7s |
|---|---|---|---|
| CODE v18, whole frame | **12** | **3.13s** | 8% |
| CODE v18, band only | **16** | **1.93s** | 12% |
| reel 82 (rejected as boring) | 16 | 2.30s | 0% |

⭐ **The shipped bar is 12 planned scenes / 16 band events.** The band changes
more often than the scene cuts because bodies carry fast internal beats — CODE's
shot 0 is a **7-frame** flash before its 2.83s body. That is where the sub-0.7s
shots come from, and it is why `REGISTER_RULES.shotRange` is `[1.2, 3.4]`: a
0.23s event lives INSIDE a body and is never a planned shot. Planning 20 shots at
1.3s would fail the linter on every one.
⛔ **So "the references cut twice as fast" is a note about the references, not a
house target.** Reading it as a target would have produced a plan that cannot lint.

APPLE ships **12 shots, median 2.22s** — faster than CODE v18, inside `shotRange`.
Table + claim ladder + capture sheet: `out/apple13/SHOT-TABLE.md`.

### ⭐ THE REPO IS SETTLED — AND IT COSTS SOMETHING
`dickwu/apple-design-skill`, picked by Alex. `53` re-verified live: strictly
`references/hig/*.md` = **53**. ⛔ A looser `hig` glob returns 54 —
`references/hig-lookup.md` is the routing table, not a guideline. The header holds.

⛔⛔ **BUT THE SKILL NEVER SAYS "WEB".** Zero occurrences of web / website /
browser / HTML / CSS in its SKILL.md; it targets Flutter · React Native · Tauri ·
Electron · SwiftUI. **The VO says "website" five times.** The other candidate has
the mirror-image fault: `chaos-xxl` is genuinely web (`examples/*/output.html`)
but it GENERATES pages — the use case the VO explicitly calls the worse one, and
it has no audit and no citations.

⭐ The VO's spine is the **verb**, not the noun — *audit · find · the actual rules
behind why* — and only dickwu does that. **So: no browser window may ever appear
as the audit target.** Rounds 1-4 all drew one. The thing being audited is an
**app UI** (tab bar, status notch). This is now the binding constraint on shots
2, 8, 9.

### ⛔ "DELETE THE FIVE REJECTED FILES" IS A REWIRE, NOT A CLEANUP
`hooksApple{,2,3,4}.tsx` and `Apple13.tsx` are all **imported by `src/Root.tsx`**
(lines 14-24) and registered as compositions. `Root.tsx` is the **shared bundle**
the COURSE/AGENCY/SEO/LOCAL chats render against. Deleting the files without
removing the imports breaks *their* renders, not ours. Do it as one atomic edit at
build time. (Confirmed live this session: `npx tsc` currently fails on
`src/scenes/Agency.tsx` → missing `./bodiesAgency`, the AGENCY chat's unsaved file.)

### DRAFT FRAME — SHOTS 8-9, THE SORTING MACHINE ✅ rendered, awaiting Alex
`src/scenes/apple13Bodies.tsx` → `SorterBody`; comp `Apple13Draft`; still at
`out/prev_Apple13Draft_100.png` (frame 100 of 170 = mid-fill, judged
mid-transformation). Idiom cloned from `codeVars.tsx` B2Body, not invented.

Situation: your app screen goes in the hopper; what is wrong drops through a
grader into **four labelled bins**, CRITICAL filling first and fastest.
agent = the sprite on the feed lever · stake = the CRITICAL bin · loop = which bin
fills, resolving at 0.78 · says-what-the-VO-doesn't = the findings are **graded**,
not counted.
⛔ **No tally anywhere.** The readout names the **lens** being checked
(ACCESSIBILITY / CONVENTIONS / VISUAL / INTERACTION / CONTENT — all captured) and
carries no number, because nobody has run this skill against anything yet.

### ⛔⛔ THE FIRST DRAFT HID ITS OWN PAYOFF BEHIND ITS OWN FURNITURE
Housing ran to y834; the bins' rims start at y776. **The four spouts, the three
status lamps and the dial — the entire grader → spout → bin chain the shot exists
to show — were drawn behind the bins they feed.** Nothing errored and the render
looked plausible; the causal chain was simply absent.

⭐ **The band is 408px (TOP 470 → FLOOR 878) and it has to hold four stacked
tiers, so each one now gets an explicit non-overlapping range**, declared next to
`BX` in the source:

    470-510  readout, on the housing roof
    510-660  housing + lit belly
    660-706  the four spouts, fully visible
    706-745  ⭐ OPEN AIR — chips in flight between spout and bin
    745-878  the bins

⛔ And the bin labels were floated above the rims, straight through the spouts. A
label that overlaps the thing it names is worse than no label — they are now on a
plate on each bin's own front face, with the contents stacking above the plate.

Gates on the still: header ink **x159..922** (margins 159/157, `SAFE.side` 96) ✅ ·
lowest drawn band row **y891**, clear of `BOT` 900 ✅ · `tsc` clean on all three
new files ✅.

### STILL OPEN FOR ALEX
1. **The VO A/B** — `out/vo6/ab/APPLE-splice-AB.wav`. Every asset above is built
   on r2. Not committed.
2. **The one word** — *"copying Apple's design manually, **even** the actual
   rules…"*; six windows say `even`, the source transcript says `you get`.

## ⭐ r2 IS THE SHIPPING CUT — DECIDED BY ALEX, 2026-08-07

Decision: **`out/vo6/deliver/VIDEO-3-APPLE-r2.wav`, 26.9667s / 809 frames.** The
29.1333s original is superseded and stays on disk untouched.

⭐ Re-verified independently before he ruled, by ENERGY not whisper
([[vo-pause-measure-energy-not-whisper]]) — 40ms RMS at 16% of peak over the
original's 18.6-22.4s returns **seven short bursts separated by silence** before
continuous speech resumes at 21.68. That is an aborted restart, not a sentence,
and it confirms the previous session's finding by a different instrument.

Wiring confirmed: no stale `footage3/` (non-r2) reference survives in
`AppleS1.tsx` / `apple13Bodies.tsx` / `Apple13Draft.tsx`.

⛔⛔ **AND THE FIRST WIRING CHECK WAS A FALSE PASS.** `cd` does not persist between
Bash calls in this harness, so the grep ran against relative paths that did not
exist, exited non-zero, and my `|| echo "no stale refs"` fallback printed a PASS
over a check that had matched nothing — [[skipped-check-must-not-pass]] exactly.
⛔ **Never phrase a gate so that "found nothing" and "could not run" print the
same thing.** Re-run with an absolute `cd` in the same command and print the grep
exit code.

### PREVIEW WIRING — `trim` added to `S1Chassis`
A single-shot preview was showing the reel's OPENING three seconds of face under
shot 8-9's animation. `S1Chassis` now takes an **optional `trim`, default 0**, so
every existing caller is unchanged; `chassis_diff --ref src/scenes/CodeS1.tsx`
still reports Progress 99.6% / CardFigure 100% / FullFigure 100%.
⛔ `holdBefore` is applied **only at trim 0** — it exists to cover his blink on
f0-f2 of the recording, and holding a frame at any other trim would freeze his
mouth mid-sentence.
⛔ `chassis_diff` takes a **path** for `--ref`, not a bare filename.

Shot 8-9 preview: `out/prev_Apple13Draft_0-169.mp4` (170 frames, half scale, r2 VO
under it). Verified before sending: h264+aac, 5.717s, band frame-diff mean 1.27
with **0 near-frozen frames** — no dead air ([[reel-dead-air-motion-audit]]).

## ⛔⛔⭐ THE DRAFT CHASSIS WAS NOT A REEL CHASSIS (2026-08-07)

> Alex: *"where is the caption above my head and the animation ends to be
> elevated here as well and give me the reel now"*

Both notes had ONE cause. `AppleS1.tsx`'s `S1Chassis` was written to render
**40-frame hook stills**, and it calls neither `SyncedCaption` nor `Paperize`. So
every preview out of it had:

- **no caption above his head** — the layer simply was not there
- **untextured, vector-clean artwork** — the house look does NOT come from the
  grain overlay, it comes from `Paperize` ON the objects. `Code.tsx` shipped with
  0 calls to it and Alex read that instantly as *"too crisp — what happened to the
  grainy overlay things?"*. My chassis repeated it exactly.

⛔⛔ **AND `chassis_diff` REPORTED 99.6 / 100 / 100 THE WHOLE TIME.** It compares
Progress · CardFigure · FullFigure. **It cannot see a layer that is ABSENT.** A
green chassis gate is evidence that the layers you *have* match; it is not
evidence that you have the layers ([[lint-shots-covers-16-of-89-laws]]).
⭐ **The check that would have caught it in one second:** `grep -c Paperize` and
`grep -c SyncedCaption` against the reference reel and yours. Code.tsx: 5 and 1.
AppleS1: 0 and 0.

The reel wrapper is now `src/scenes/Apple.tsx`, cloned from `Code.tsx`'s `Shot` —
per-shot ground flip, `Paperize rough=4 grain=1 dots=6 seed=from%97`, type-owned
drop-shadow (never a full-width scrim, which crushes the texture under it), and
`SyncedCaption y=946 halfWidth=410 size=46 maxChars=30`.
⛔ halfWidth 410 is not cosmetic — IG's action rail is x960..1080 / y900..1580, and
a caption that fits the FRAME can still render under the like button.

## ⛔⛔⭐ YOU CANNOT RENDER FROM THE SHARED `Root.tsx` WHILE SIBLINGS ARE BUILDING

The first full-reel render died on:

    Error  hook14e: descent peaks at 27.3 px/frame, ceiling is 26. It will strobe.

That is **reel 14 SEO's** file. Remotion evaluates every registered composition's
module at bundle time, so one sibling's build-time assertion takes down a render
that has nothing to do with it.
⛔ The log's standing advice — *"retry; never edit theirs"* — only covers a
HALF-SAVED file. **A deterministic assertion never clears on retry**, and waiting
for another chat to fix its reel is not a plan.

⭐ **The repo already had the answer and it was never used here:** `RootCode.tsx` +
`src/index-code.ts` are a per-reel entry PAIR, and every CODE render went through
them. Added `src/RootApple.tsx` + `src/index-apple.ts`; render with
`PUB=pub6 ENTRY=src/index-apple.ts`. This also makes reel 13 immune to the four
sibling chats for the rest of the build.

## THE REEL — 12 shots, rendered and verified
`out/prev_Apple_half.mp4` · 809 frames = **26.9667s exact** · h264+aac.
| check | result |
|---|---|
| caption present | **802/809 frames = 99%** of the reel carries caption type |
| band motion | mean 3.08, **1/808 near-frozen** — no dead air |
| duration vs r2 VO | 809 frames, frame-exact |

### ⭐ ELEVATE PASS — why the belly read grey
`O.glow` at 0.13 over `#15120F` lands near **L\*22** — still near-black, so it
read as a smudge rather than as a lit interior. ⛔ **A low-opacity wash over a
near-black fill cannot make light; it only makes fog.** Replaced with an actual
source stack — warm floor plate (`O.burnt` 0.55) → `O.deep` → hot core (`O.core`)
→ glow on top — and the housing was broken from one long box into an assembly
with a lit top face, a shadowed skirt, ribs and a bolted end plate. The hue budget
still runs through one orange; the variety is in MATERIAL.

### NEXT
Full-scale render only on Alex's word ([[preview-renders-until-final]]). Still to
do before ship: `plans/apple.ts` + lint, SFX pass, and the atomic Root.tsx rewire
that deletes the five rejected hook files.

## ⛔⛔⭐ ROUND 6 — "ALL OF THEM MISS THE BAR", MEASURED (2026-08-07)

> Alex: *"you need to use components from Apple's design system ... so we can
> actually see them. And a lot of these animations are not beating the quality
> bar ... basically all of them. And the sound effects as well."*

All three notes turned out to be measurable, and the third was trivial:

| note | measurement |
|---|---|
| sound | the reel had **one** audio element (the VO). **0 SFX cues, no bed.** CODE v18 carries **120 cues + bed_clean.wav** |
| animations | **8 of 12 shots chroma-starved**: s3 2.6% · s11 3.7% · s2 5.7% · s4 7.8% · s1 9.1% · s7 9.7% · s5 10.5% · s6 13.9%, against CODE v18's **35.4% mean** |
| s1 | abstract spines, unrecognisable AND the 5th-worst shot |

### ⭐ THE REAL DIAGNOSIS — IT IS AREA x LIT-SHARE, AND I GOT IT WRONG TWICE
First hypothesis was "light ground is unsaturated, go all-deep like CODE".
Measured and TRUE — CODE is **0% light-ground frames**, mine was 36% — and it
moved the reel mean from 19.6% to **18.8%**. Nearly nothing.

⛔ **When every fix moves the number a little and none of them works, the model is
wrong** (ANIMATION-BAR §the-room-method). Re-measured, and the actual gap is two
compounding factors:

|  | CODE v18 | APPLE |
|---|---|---|
| band covered by OBJECTS | **44.0%** | 33.8% |
| of the band, lit + chromatic | **16.9%** | 8.4% |

Chroma ≈ area drawn x share of it lit, so ~0.77 x ~0.50 ≈ the 19.6 / 35.4 gap
exactly. **Tastefully-spaced small objects cannot reach the bar however they are
coloured.** CODE's machines and molten piles fill the band edge to edge.

### ⛔⛔⭐ AND THEN I HIT THE NUMBER AND MADE THE FRAME WORSE
Rebuilt s1 as a full-width settings sheet and tuned it over four renders:
62.0% → 52.3% → 60.9% → **40.3%**, finally inside `BUDGET.maxColouredPixels`
(45%) and above CODE's 35.4%.

**The frame is worse than the one it replaced.** It reads as three orange slabs
with small controls parked on them — no depth, no place, no internal detail. A
passing score on a flat rectangle is the *abstract rendering* failure from
ANIMATION-BAR's own two-axis table, arrived at by optimising the metric.

⭐ **THE METRIC IS NECESSARY AND NOT SUFFICIENT.** It correctly says *bigger and
more lit*; it cannot say *and still an object*. CODE's shots are big AND DENSE
AND A PLACE — the Xiaomi panel is full-width and carries a dial, LED rows, a
lever, a screen and a knob; the depot is full-width and carries a crate, hazard
stripes, a crane and shelving. Inflating a rectangle gets the same score and none
of the quality.
⛔ So the gate for a redraw is BOTH: `cover >= 44% and 25% <= chroma <= 45%`
**and** it still has to survive the naming test and the mute test.

### THE THREE TUNING FAULTS FOUND ALONG THE WAY (all real, all kept)
1. ⛔ **A cascade that ACCUMULATES is not an event.** `sweep*3.4 - i*1.5` left
   every row it passed still lit, so the last frame had all three on (60.9%). A
   travelling highlight lights one row and turns the previous off — better number
   AND better read, because a scan moving down is an event and three rows lit is
   a state.
2. ⛔⛔ **`SorterBody` was still timed for the 170-frame combined shot.** Once the
   intake moved to s8 it drove only s9's **88** frames, so `mill` reached **0.52**
   and the bins stopped half full — **the loop never resolved** and nothing
   errored. ⭐ A body's timings are only valid for the length they were authored
   against; re-derive on every split or merge.
3. ⛔ `minGroundFlipRate` 0.3 is a **third** grammar rule the shipped reel ignores
   (CODE: 0 flips), after `shotRange` and the reference cut-rate. The gate is not
   the bar; the last approved render is.

### SFX PASS — built, not yet level-audited
31 cues + `bed_clean.wav`. ⛔ Every `at` is `<event> − <that file's own peak
offset>`, measured off this library: snap 0.001 · click 0.137 · paper 0.175 ·
servo 0.381 · whoosh **0.715** · riser **1.810** · impact **2.172**. A flat J of
0.07 would land a whoosh 0.65s and an impact 2.1s late
([[sweep-lead-equals-peak-offset]]). ⛔ `tools/audit_sfx.py` has NOT been run yet —
levels are still the named classes, not solved literals.

### NEXT — the redraw, with the gate stated up front
s2 · s3 · s4 · s5 · s6 · s7 · s11 need rebuilding to **cover ≥44%, chroma 25-45%,
lit ≈17%** *as dense objects in a place*, not as inflated flats. s1 needs the same
second pass — it currently passes the number and fails the eye.

## ROUND 7 — HEADERS, AND REAL APPLE FOOTAGE (2026-08-08)

> Alex: *"the headers are not good ... they have to explain clearly and like what
> specific topic — it can't be vague."* · *"I'm literally just seeing the bottom
> part."* · *"look for Apple style motion graphics."*

### ⭐ THE HEADER FAULT, NAMED AT LAST — A NUMBER WITH NO SUBJECT
Three rounds of rejected headers, and the defect common to rounds 2 and 3 was one
thing: **a value or phrase with nothing to attach it to.**

    5 LENSES        lenses of WHAT?
    WORST FIRST     worst WHAT?
    4.5:1 MINIMUM   minimum of WHAT?
    THE CROWDED WAY / NOBODY DOES THIS / ALREADY BUILT  — labels for the picture,
                    which the viewer is already looking at, so they carry nothing

CODE v18 never does this: `3M TOKENS A DAY`, not `3M A DAY`. Every header now
NAMES THE SPECIFIC THING — `5 REVIEW CATEGORIES` · `CRITICAL TO LOW` ·
`4.5:1 TEXT CONTRAST` · `EVERY FIX CITES HIG` · hook `APPLE HIG AS A SKILL`.
⭐ **HIG is the most specific word available** — Apple's real, named standard, and
what the skill literally contains.

### ⛔⛔⭐ AND THEN ALL TWELVE OVERRAN THE FRAME
Naming the subject made every string longer; I carried the old point sizes across
by eye. Measured ink extents in 1080 space, `SAFE.side` 96:

| | ink | margin |
|---|---|---|
| s5 `MOST BUILD FROM SCRATCH` | 0..1078 | **0** |
| s7 `CHECK A LIVE PRODUCT` | 8..1076 | **4** |
| s10 `44PT TAP TARGETS` | 8..1070 | **8** |

**0 of 12 passed.** The log had already recorded this once ("19 chars at 104px
overran 1080"), so the lesson is not "check the header":
⛔⛔ **A HEADER'S POINT SIZE IS A FUNCTION OF ITS CHARACTER COUNT AND MUST BE
SOLVED, NEVER INHERITED FROM THE STRING IT REPLACED.** Solve from measured ink
width for a ~104px margin, then RE-VERIFY on the render — the re-verify caught s6
still 2px short at 94.

### ⛔ THE FACE-BEAT HEADER WAS GOING THROUGH HIS HEAD
`hy = 0.177` on a `full` shot put the row at y340; the crown on this shoot reaches
~y540, so his head occluded x350..750 and `44PT TAP TARGETS` rendered as
`44PT TA▮RGETS`. Law 86 wants a row straddling the hairline — but **an unreadable
middle is not depth, it is a broken header.** Raised to 0.118.

### B-ROLL — WHAT WORKED AND WHAT DID NOT
⛔ **THE CROP WAS EATING THE SHOT, NOT THE SOURCE.** A 812x372 card is 2.2:1 and
the source is 16:9, so `cover` discarded ~40% of Apple's frame and `pos="50% 70%"`
discarded the top — which is exactly *"I'm literally just seeing the bottom part"*.
⭐ Every b-roll card is now **700x394, 16:9 exactly, so nothing is cropped at all.**
Narrower, but the whole composition survives, which is the trade that matters.

⛔ **THIRD-PARTY "APPLE STYLE" SHOWREELS DID NOT DELIVER**, and it is worth
recording so nobody spends the time again. Alex chose to allow them; the material
itself is the problem. `qK4Re_ArS3Q` (SOGA, "Apple Motion Graphics") is **monochrome
kinetic typography carrying its own copy** — near-zero chroma, someone else's words
on screen, and nothing that reads as Apple design. The rest of that search is After
Effects tutorials: a presenter plus a screen recording of AE.
⭐ The footage that actually looks like Apple motion design is **Apple's own product
films**, which is also the case `BROLL.md` prefers on rights grounds.

⛔ **`ap_262` (the glass Apple logo) was the lowest-chroma shot in the reel at
5.1%.** Apple render the mark on white, so as a card it is mostly background. Good
footage, wrong shot — reverted s12 to the lit control board, which is also the
better read since the CTA is where s1's loop closes.

### THE TWO EMPTIEST SHOTS, REBUILT
s3 (4.8% chroma / 13.1% cover) and s11 (5.9% / 13.5%) were both *the idea was right
and the SCALE was wrong*. s3 is now a full-width service counter with a lit hatch
behind it; s11 is the **real captured HIG page** with the cited line struck through
— asserting "every fix is sourced" was the weak version, showing the source is the
proof.

## ROUND 8 — THE REFERENCE INVERTS THE TARGET (2026-08-08)

> Alex named a reference: youtube.com/watch?v=BaWrJajJRjA — Kram.Visuals,
> *"Apple Christmas Ad | 3D Motion Graphics"*, 17.2s, **and singled out the END**.
> Then: *"the animations shouldn't be containerized by some sort of black
> container ... so obviously"* · *"hook should just have the video directly not
> redesigning"* · *"for this video only don't have the grainy filter and stuff
> since we want it to look crisp"*.

### ⛔⛔⭐ THREE ROUNDS OF CHROMA-CHASING WERE AIMED AT THE WRONG REEL
Measured off the named reference against the target I had been using:

| | CODE v18 | this reference |
|---|---|---|
| ground luma | ~59 (deep) | **205** (near-white) |
| chromatic px | 35.4% | **9.7%** |
| the END section | — | luma **229**, chroma **2.1%** |
| value spread | 0.49 | 0.55 |

I diagnosed "8 of 12 shots chroma-starved" off CODE v18 and spent three rounds
pushing chroma UP toward 35%. **The look Alex wants sits at 9.7% and gets its
impact from FORM, DEPTH and SOFT LIGHT** — objects floating in an infinite bright
void, real contact shadows, depth-of-field — not from saturated colour.

⭐⭐ **A MEASUREMENT IS ONLY A TARGET WHEN IT CAME OFF THE THING YOU ARE ACTUALLY
TRYING TO MATCH.** The number was right, the arithmetic was right, the reference
was wrong — and nothing inside the measurement could reveal that. Before adopting
a house number, confirm the reel is in the same visual language as the reel the
number came from. [[aesthetic-notes-are-measurable]] gets you to measure;
it does not tell you WHAT to measure against, and that choice is the whole game.

### THE THREE INSTRUCTIONS, APPLIED
1. ⛔ **NOT CONTAINERIZED.** Every rim, inset vignette, overlay wash and card is
   gone from s1/s2/s4/s7/s11 — the frame now floats with only a soft CONTACT
   SHADOW so it still sits in the world rather than pasted on it.
   ⛔ This deliberately overrides `docs/BROLL.md` §2 ("it must be INSIDE
   something, never full-bleed") **for this reel**, which was written for found
   footage on the grainy dark chassis.
2. ⛔ **THE HOOK IS THE VIDEO.** No card, no grade, no drawn recreation — Apple's
   own frame fills the band and that is the whole shot.
3. ⛔ **NO GRAIN ON THIS REEL.** Three separate layers were degrading it and all
   three are removed: the multiply dot-screen, `Paperize` on every object, and the
   final `Grain` pass. `HOUSE_GRADE` is no longer applied anywhere either — sepia
   over Apple's own colour is the opposite of crisp.
   ⛔⛔ **REEL-LOCAL. Do not copy this omission into another reel's chassis** —
   COURSE/SEO/AGENCY are carried by DRAWN objects, which is exactly what the print
   texture exists for.

### ⭐ VARIANT SHEETS — 5 options per shot, one render
`src/scenes/apple13Variants.tsx` + comp `HookVariants`. Five hook variants in the
reference language (float / pills / squircle constellation / device plinth /
end-card), tiled one frame each into a single still, so a pick costs ONE render
rather than five. Sheet: `out/apple13_hookvariants.png`.
⛔ The first sheet laid a 137px band crop inside a 616px tile — five postage
stamps in dead space. **A contact sheet's tile must be the BAND's aspect
(1080x430), not the frame's.**

### ⚠️ THE CONSEQUENCE NOT YET RESOLVED
Removing the grain widens the gap between the footage shots and the drawn ones.
s3/s5/s6/s8/s9 were designed to sit under a print texture and now read as a
different video beside crisp Apple material. ⛔ The fix is to move those shots
into the bright-void language too — **not** to put the grain back.

## ROUND 9 — THE THREE UNBLOCKED FIXES, ALL MEASURED (2026-08-08)

Handoff items 0, s7 and "the costume that does not exist". Done and verified.
Animations are NOT started — they need picks first ([[show-options-not-one-guess]]).

### ⛔⛔ 0 · THE OPENING GLITCH — FIXED AS A CLOCK SHIFT, NOT A MEDIA RE-CUT

Re-measured independently before touching anything. 10ms RMS on
`pub6/footage3r2/vo.wav`: noise floor **11-27 through f8**, then **238 at f9**,
773 at f12.6. First frame over 12% of the 2s peak = **f9 = 0.300s** — the
handoff's number reproduced exactly, by a second instrument.

⭐ **THE FIX IS ONE NEGATIVE-OFFSET WRAPPER.** `Apple.tsx` now wraps the whole
reel in `<Sequence from={-APPLE_HEAD}>` with `APPLE_HEAD = 9`, and
`APPLE_FRAMES = APPLE_DURATION - APPLE_HEAD` = **800 = 26.6667s** (confirmed:
`remotion compositions` reports `Apple 800 (26.67 sec)`).

⛔ **The handoff prescribed trimming picture AND audio and shifting every
boundary in `apple13_shots.json` by −9. Do not.** Everything in this reel hangs
off ONE clock — VO, bed, 50 cues, 12 shot Sequences, captions, and the facecam's
per-shot `trimBefore`. Shifting the clock moves all of them together, so **there
is no second timebase for lip sync to drift against** ([[edl-must-record-every-cut]],
reel 86's 10-frame desync). The prescribed version is four media rewrites — the
matte alone is a 348 MB ProRes re-encode on a disk with 31 GB free — it destroys
the r2 originals Alex approved, and it puts arithmetic on every boundary. This
costs one constant and reverses by setting it to 0.

Verified on a 45-frame render (`out/ap_head_check.mp4`):

| | before | after |
|---|---|---|
| audio first >12% of peak | frame 9.0 | **frame 0.9** |
| face-card frame-diff f0→f1 | ~0 (flat to f8) | **5.05** — mouth already moving |

Inner frame numbering is unchanged, so `apple13_shots.json`, every `trim`, every
caption `offset` and every SFX `at` stay exactly as authored. `holdBefore=3`
becomes a no-op (f0-f2 are now before frame 0); left in so `APPLE_HEAD=0`
restores the old behaviour exactly.

### ⛔ s7 · THE APPLE STORE — IT WAS NEVER THE CLIP, AND NOW IT IS MEASURED
Reported twice, never measured. `ap_232.mp4` is 8.008s / 240f @29.97 and carries
**three** sections, found by frame-diff:

    0.000-4.104  the device family assembling      ← the only usable one
    4.104-7.741  APPLE STORE INTERIOR (retail table, "hello")  ← diff 79.7
    7.741-8.008  a third cut                                   ← diff 55.6

`at=2.4` played 2.4→4.4s and crossed the cut by 0.30s, so the last ~9 frames of
s7 were the store. The shot is 60f = 2.0s, so the latest legal start is
**4.104 − 2.0 = 2.104**. Set to **`at=2.0`** — ends at 4.0s, **3 frames of
headroom**, and it is the better read: the Watch lands at source 3.34s, so the
family finishes ASSEMBLING on frame 40 of 60 instead of standing still.
⛔ Never raise `at` past 2.10. The fence is in the source, not in taste.

### ⭐ THE SPRITE COSTUME — `src/scenes/apple13Costumes.tsx`, comp `Apple13Costumes`
Asked for three times, never built. Built now, as four options on one sheet:
`out/apple13_costumes.png` — **CRITIC** (black turtleneck + glasses) ·
**INSPECTOR** (lab coat + head loupe) · **REVIEWER** (studio apron + pencil) ·
**SCANNER** (visor + field vest), plus the naked sprite as the control.

⛔⛔ **THE HANDOFF POINTED AT THE WRONG SPRITE AND THE WRONG DONOR FILE.** There
are two sprites and they do not share a grid:

| | grid | used by |
|---|---|---|
| `character/Mascot.tsx` | **200x200**, div+svg | **APPLE** (`apple13Bodies.tsx:18`) |
| `patterns/props.tsx :: Claude` | 1024x1024, svg | AGENCY |

`agencyCostumes.tsx` — the file the handoff says to clone — is authored against
the **1024** grid, so scaling its `OUTFITS` onto Mascot lands a visor on the
forehead. Everything here is measured off `Mascot.tsx` itself. The real donor for
this grid is `SwapsCarousel.tsx`'s `COSTUMES`.

⛔⛔ **AND `SwapsCarousel`'s `Dressed` WRAPPER HAS A BUG THAT ONLY A STILL HIDES.**
It stacks the costume svgs as SIBLINGS of `<Mascot>`, so they do not inherit the
`translateY(-hop) scaleY(squash)` Mascot applies to its own div. That is
invisible on a cover — `Dressed` pins `lf=30` and renders one frame — and fatal
the moment the sprite animates: **the body hops and the hat stays behind.**
[[mascot-walk-cycle-in-midair]] with the parts swapped.
⭐ Fixed by exporting **`mascotPose(lf, …)`** from `Mascot.tsx` (purely additive;
the component now calls it, so every value and every existing caller is
unchanged) and applying its transform to every costume layer in `DressedMascot`.
One definition of the hop, so a costume can never drift out of sync with it.

⭐ **A COSTUME HERE IS A FUNCTION OF THE POSE, NOT A NODE.** The eyes translate by
`gaze` inside the 200 grid and APPLE drives it hard (s3 +9 · s9 +12 · s11 −9 ·
s7 −12), so eyewear drawn at a fixed x slides off the face. `front`/`behind` take
`{gaze, f}`.

⛔ Sheet faults found and fixed: the detail row at `left: 60 + i*250` with 400px
sprites **overlapped by 150px each** and merged into one mass of legs — now 2x2.
A contact sheet whose tiles collide cannot be judged; same class as the hook
sheet's five postage stamps, in the other direction.
⚠️ Known, not yet fixed: REVIEWER's apron neck straps run y78-102 and clip the
eye band (y70-96), so they crowd the face. Only matters if he picks it.

### THE DIAGNOSIS THE PER-SHOT NOTES ARE ALL POINTING AT
A band contact sheet of all 12 shots makes it plain: **the reel is two videos.**
s1/s2/s4/s7/s12 are crisp bright Apple footage; s3/s5/s6/s8/s9/s11 are dark-ground
orange objects on a soft vignette. ROUND 8 predicted exactly this
(*"the consequence not yet resolved"*) and the per-shot asks — 4x better, five
variants, five variants, five variants, 3x better — are that one gap, itemised.
⭐ So every animation option in ROUND 10 is authored in the **bright-void**
language (Kram reference: ground luma 205, chroma 9.7%, impact from FORM, DEPTH
and SOFT LIGHT), not as a better dark object.

### STILL ALEX'S CALL (unchanged, plus one)
1. **The VO word at 21.6s** — `even` vs `you get`.
2. **s3: Stripe or trashy?**
3. **NEW: which costume.**
4. **NEW: the animation options** — ROUND 10, below.

## ROUND 10 — ANIMATION OPTIONS, IN WORDS, BEFORE ANY BUILD (2026-08-08)

⛔ Nothing below is built. [[show-options-not-one-guess]]: 2-3 candidates per
BEAT from DIFFERENT axes, in words → Alex picks → ONE draft frame each → build.
Eleven rounds were lost on reel 89 to skipping straight to a build, and this reel
has already lost s3, s8, s9 and s11 to it once.

### THE FOUR CONSTRAINTS EVERY OPTION BELOW IS AUTHORED AGAINST
1. ⛔ **BRIGHT VOID, not a better dark object.** Kram reference: ground luma 205,
   chroma 9.7%, impact from FORM · DEPTH · SOFT LIGHT · real contact shadows.
   Six of twelve shots are currently in the wrong language and that IS the
   "not beating the quality bar" note ([[measure-against-the-right-reference]]).
2. ⛔⛔ **TIMINGS DERIVED FROM THE SHOT'S OWN FRAME COUNT** — the fault that cost
   four rebuilds. s3 **71** · s5 **66** · s6 **42** · s8 **82** · s9 **88** ·
   s11 **94** · s12 **62**. And something must keep travelling: idle periods live
   in 9-17 frames, never `sin(f/37)`.
3. ⛔ **THE AUDIT TARGET IS AN APP UI, NEVER A BROWSER** (binding on s8/s9 — the
   skill targets Flutter/RN/SwiftUI and never says "web"). s3's stripe.com is
   Alex's own explicit exception and is open question 2.
4. ⛔ **A SITUATION, NOT A NOUN.** Agent with intent · stake with a visible
   outcome · a genre the viewer already reads · a loop that resolves.

### s3 · `"BETTER" IS NOT A SPEC` · 71f · *"…can you make this website design better"*
| | option | axis · genre | loop |
|---|---|---|---|
| A | **THE BLANK DOCKET** — a service counter; a ticket slides to the costumed sprite reading `MAKE IT BETTER` and every field under it is empty. He stamps it `NOT A SPEC` | AGENT · service counter | can he fill the order? |
| B | ⭐ **THE VAGUE DIAL** — one control on a plinth labelled `BETTER`, one detent. He turns it; the needle has nowhere to go. A second plinth rises carrying a dense panel of REAL named controls (contrast · tap target · spacing) | MACHINE · control room | which knob actually does something? |
| C | **THE CRIT TABLE** — the page lies flat on a lit table; a card reading `MAKE IT BETTER` drops onto it and he pushes it off the edge | PLACE · design crit | what replaces it? |
⭐ **B.** It makes the header literally true and argues it in one picture: vague
input has one dead control, real input has fifty live ones. A and C both restate
the line. ⛔ B is also the only one whose second half gives the shot somewhere to
travel for all 71 frames.

### s5 · `MOST BUILD FROM SCRATCH` · 66f · *"most people use this to build a new website"*
| | option | axis · genre | loop |
|---|---|---|---|
| A | **THE EMPTY LOT** — a foundation outline; identical blank slabs land fast, one after another. The last lands and it is still blank | PLACE · construction | does anything get built? |
| B | ⭐ **THE SPAWN FIELD** — identical grey wireframe shells pop into being in a grid receding into depth-of-field; camera pulls back and there are hundreds | SCALE · reveal | is anyone doing something else? |
| C | **THE BLANK CANVASES** — a studio; a blank frame lifted onto an easel, primed, then another, then another. The stack never shrinks | AGENT · studio | will one ever get finished? |
⭐ **B.** The header's subject is **MOST**, and B is the only one that makes the
CROWD the subject rather than one instance of it. It is also the one that is not
another conveyor — the current s5 is a conveyor and s8/s9 are a grader, so a
third belt would be the same shot three times ([[reel-interscene-contrast]]).

### s6 · `REVIEW WHAT EXISTS` · **42f — 1.4s, ONE BEAT ONLY** · *"but a better use case is…"*
⛔ 42 frames buys one clean move. Anything with two events will read as choppy —
which is what "less choppy" already meant on s3.
| | option | axis · genre | loop |
|---|---|---|---|
| A | ⭐⭐ **THE TURN** — the SAME void as s5. The camera turns 90° off the field of blanks to face ONE finished thing already standing, already lit | CAMERA · the room method | what is that one? |
| B | **THE LIT WINDOW** — he walks past the empty lots and stops at a façade with the lights already on | AGENT · street | who lives there? |
| C | **THE HUNG PIECE** — rows of empty gallery frames, one already filled. Push in | PLACE · gallery | why that one? |
⭐⭐ **A, strongly.** It is a single camera move (fits 42f exactly), it pays s5
off instead of starting a new idea, and s5→s6 becomes ONE world across the cut —
the house's own strongest device ([[reel-room-method]], [[reel-flow-between-shots]]).
The word is *"but"*; a turn IS "but".

### s8 · `5 REVIEW CATEGORIES` · 82f · *"tell it to audit your own website"*
| | option | axis · genre | loop |
|---|---|---|---|
| A | ⭐ **THE FIVE-LANE GATE** — the app screen travels through five lit gates in sequence, each named: ACCESSIBILITY · CONVENTIONS · VISUAL · INTERACTION · CONTENT | MACHINE · QC line | does it clear all five? |
| B | **THE FIVE OVERLAYS** — the screen on a plinth; five gel sheets drop onto it one at a time, each revealing a different class of finding | OPTICS · x-ray | what does the next one show? |
| C | **THE FIVE-ARM RIG** — a rig with five heads descends onto the screen, each head running a different check | MACHINE · robotics | which arm finds something? |
⭐ **A.** A sequence of five naturally spans 82 frames at ~16f each — the timing
falls out of the content instead of being imposed on it, which is the exact fault
that killed the first s8 (73/82 frozen). All five names are captured off SKILL.md
Step 3. ⛔ No tally anywhere; nobody has run this skill against anything.

### s9 · `CRITICAL TO LOW` · 88f · *"it will find so many minor details you're getting wrong"*
⭐ Six idea rounds died here. The one that landed was **spot-the-difference on
real Apple pages — a game the viewer already owns.** Keep that and build on it.
| | option | axis · genre | loop |
|---|---|---|---|
| A | ⭐⭐ **SPOT THE DIFFERENCE** — two near-identical app screens; the costumed sprite walks the gap with a big loupe and each difference he passes is ringed and drops into a severity column, CRITICAL at the top | AGENT · puzzle game | how many are there? |
| B | **THE LIFT-OFF** — findings peel off one screen as chips and file themselves into four trays, CRITICAL filling first and fastest | MACHINE · sorting | which tray fills? |
| C | **THE PEG BOARD** — findings pinned up at random, then re-sorted top-to-bottom by severity in one sweep | PLACE · war room | what ends up on top? |
⭐⭐ **A.** It carries the outfit note, the bigger-lens note and the severity
ladder in one shot, and it is the only one where the VIEWER plays. ⛔ B is the
current shot with better lighting — adjusting a rejected idea keeps it rejected.
⭐ Use s11's resolution trick for the "max res" note: **draw the page at 1.9x and
clip**, which is how you get capture-res text inside a small panel.

### s11 · `EVERY FIX CITES HIG` · 94f · *"…even the actual rules behind why each design looks so good"*
| | option | axis · genre | loop |
|---|---|---|---|
| A | ⭐ **THE CITATION PULL** — a finding chip on the left; a line shoots to the real HIG page and the exact cited line LIFTS OFF the page and docks to the chip | OBJECT · evidence | where did that rule come from? |
| B | **THE STACK OF 53** — 53 files fan out behind the finding, one slides forward, opens to the cited paragraph and stamps it | SCALE · archive | which file was it? |
| C | **THE MARGIN** — the fix appears with a numbered tag; the tag leads back to one open book | OBJECT · footnote | weakest — a label, not an event |
⭐ **A.** The pencil-circle already built asserts "this is sourced"; A *shows the
source moving into the claim*, which is the same upgrade that made the current
s11 work (showing the real page beat asserting it). One object transforms, and
the pull spans 94 frames without a second event.

### s12 · `53 GUIDELINE FILES` · 62f · **CURRENTLY DEAD — 17/61 frames frozen** · the CTA
| | option | axis · genre | loop |
|---|---|---|---|
| A | ⭐ **THE HANDOFF** — the costumed sprite carries the stack of 53 and sets it down facing camera; the Apple mark rests on top as the seal; `APPLE` types into a comment field beside him | AGENT · giving | closes s1's loop |
| B | **THE FAN** — the 53 files fan into an arc behind him and the Apple mark forms out of them | SCALE · reveal | what do they make? |
| C | **THE COUNTER** — he slides the skill across a lit counter toward camera, Apple mark stamped on it | AGENT · service | callback to s3-A |
⭐ **A.** A CTA's gesture must be TOWARD the viewer, and it is the only one that
uses both things Alex asked for (sprite AND Apple logo) as one action rather than
two objects parked together. ⛔ Whichever wins, the 17 frozen frames are the
actual defect — the shot currently has no event at all.

## ⛔⛔⭐ ROUND 10 CORRECTED — I READ A SUPERSEDED ROUND AS CURRENT (2026-08-08)

ROUND 10 above authored every option in the **bright-void** language, on ROUND 8's
closing line (*"the fix is to move those shots into the bright-void language
too"*). **That instruction was reversed by Alex afterwards and I missed it.**

The reversal is recorded in `src/scenes/apple13Dark.tsx`'s header:

> Alex: *"our animations should still be OUR style, not the white style — the
> black style thing of our pre-existing animations — they just need to be more
> interesting."*

and again in `Apple.tsx`'s wiring comment: *"the animations at 8 and 10 seconds
suck, need to be replaced with our animation system"*, which is why s5/s6/s8 were
rewired from the bright-void variants to `apple13Dark.tsx`'s house-style bodies.

⭐ **BOTH REFERENCES ARE RIGHT, FOR DIFFERENT LAYERS** — the thing
[[measure-against-the-right-reference]] exists to say, arrived at a second time:

| layer | reference | numbers |
|---|---|---|
| found Apple FOOTAGE — s1/s2/s4/s7/s12 | Kram film | ground luma 205, chroma 9.7% |
| OUR DRAWN shots — s3/s5/s6/s8/s9/s11 | **CODE v18** | ground luma ~59, cover 44%, lit 16.9%, chroma **35.4%** |

⛔⛔ **SO THE "TWO VIDEOS" OBSERVATION IS TRUE AND THE CONCLUSION WAS WRONG.** The
reel does split into a bright layer and a dark layer, and that split is
**INTENDED**. The note is not *"unify them"* — it is *"they just need to be more
interesting."* Proposing bright-void rebuilds would have handed Alex a menu of
the exact thing he had already rejected once.

⭐⭐ **THE PROCESS LESSON, AND IT IS NEW.** The factory log narrates in rounds, so
its LAST round reads as current state — but this decision was recorded only in
two source docstrings, never appended to the log. **A decision that reverses a
logged round MUST be logged, or the log actively misleads the next session.**
Reading the log top-to-bottom was correct and still produced a wrong premise.
⛔ Before adopting any earlier round's closing instruction, grep the SHIPPED
files for a later note that reverses it. Round 8 is 60 lines from the end of this
file; the reversal was in the code the whole time.

### THE OPTIONS, RE-CAST IN THE HOUSE STYLE
Deep ground · orange as LIGHT · hazard floor · ONE HERO with smaller satellites
and visible ground between them · big and dense (cover ≥44%, chroma 25-45%) ·
continuous motion with idle periods of **9-17 frames** · ⛔ every timing derived
from the shot's own frame count.

| shot | f | A | B | C |
|---|---|---|---|---|
| **s3** `"BETTER" IS NOT A SPEC` | 71 | **THE ORDER WINDOW** — a lit service hatch; a docket slams down reading `MAKE IT BETTER`, every field under it blank. He holds it to the lamp, turns it over: nothing on the back | ⭐ **THE ONE-KNOB CONSOLE** — full-width console, the trashy page glowing on its screen, ONE giant knob labelled `BETTER` with one detent. He cranks it, the needle slams to the stop, nothing happens. A panel above then drops open on FIFTY labelled switches, all lit | **THE WRONG TOOLS** — the page clamped in a vise on a lit bench; he tries tool after tool off the rack and none fits, because the order card just says BETTER |
| **s5** `MOST BUILD FROM SCRATCH` | 66 | ⭐ **THE STAMPING PRESS** — a press hammers out identical blank shells into a growing heap, lit from the molten side | **THE SCAFFOLD FOREST** — dozens of identical half-built towers receding into the dark, cranes swinging, none finished | **THE SLAB YARD** — a gantry lowers blank slabs into a yard already stacked full of them |
| **s6** `REVIEW WHAT EXISTS` | **42** | **THE PAN** — camera pans off the blank yard onto ONE finished lit building already standing | ⭐ **THE LAMP SNAP** — a work lamp swings around and snaps onto a finished structure that was in the dark all along | **THE SHUTTER** — a roller shutter lifts on a bay where a finished thing is already sitting, lit |
| **s8** `5 REVIEW CATEGORIES` | 82 | **THE FIVE-STATION LINE** — the app screen rides a carrier through five lit stations, each its own machine with a name plate | ⭐ **THE TURRET** — a five-head turret rotates over the app screen, each head clicking into place and lighting | **THE FIVE-LAMP GANTRY** — five lamps ignite in turn, each casting a different pass |
| **s9** `CRITICAL TO LOW` | 88 | ⭐ **THE LIGHT TABLE** — both app screens on a big lit table; he drags a LARGE lens along the seam and each difference he crosses is ringed and drops down a chute into one of four bins, CRITICAL tallest | **THE OVERLAY REGISTER** — the two screens slide over each other; mismatches glow and lift out as chips | **THE COMPARATOR** — an optical comparator; he works the wheel, hits eject into graded trays |
| **s11** `EVERY FIX CITES HIG` | 94 | ⭐ **THE EVIDENCE LINE** — an arm pulls ONE file from a wall of 53, opens it, and the lit cited line lifts off the page and clamps onto the finding chip | **THE STAMP PRESS** — the press descends carrying the cited HIG line as its die and stamps it into the finding | **THE TUBE** — a request shoots up to the archive; the cited page comes back down and docks |
| **s12** `53 GUIDELINE FILES` CTA | 62 | **THE HANDOFF** — he wheels a loaded pallet of 53 into the lit foreground and sets it down facing camera, Apple mark as the front plate | ⭐ **THE DISPATCH CRATE** — the files pack into a crate, Apple mark stencilled on it, and it slides down a chute toward camera | **THE LIT SHELF** — a shelf of 53 rolls forward; he pulls one and offers it to camera |

⛔ **s3's target is now A TRASHY OLD WEBSITE** — Alex's call, 2026-08-08, against
my recommendation of stripe.com (I argued the sharper joke is asking "make it
better" of something already beautiful; he chose the literal read). All three s3
options above carry the page. ⭐ Author the page in HTML and capture THAT rather
than screenshotting a real site ([[real-page-is-the-clutter]]).

### RESOLVED THIS ROUND
- **The VO word** — Alex picked `even`, which is what `words_clean.json` already
  carries at 21.76-21.98. **No change needed**; the built reel was already right.
- **The costume** — THE INSPECTOR, wired into BOTH `Actor` definitions
  (`apple13Bodies.tsx` and `apple13Dark.tsx` each own one — swapping only one
  leaves half the reel's sprites naked). Verified on a 28-frame s9 render: the
  coat and loupe stay attached while he travels, so `mascotPose` is riding.

## ROUND 11 — THE 21 DRAFT FRAMES, BUILT (2026-08-08)

> Alex: *"i have to see the options visually to decide here"*

`src/scenes/apple13Opts.tsx` — 21 bodies, 7 sheets, 3 tiles each, comps
`S3Opts`…`S12Opts`, stills at `out/apple13_S<n>Opts.png`. Idiom cloned verbatim
from `apple13Dark.tsx` ([[clone-chassis-or-it-breaks]]). `tsc` clean on all 21.

### ⛔⛔ WHY THESE ARE NOT MORE ROWS OF ROUNDED RECTS
Opened `out/apple13_D5Sheet.png` first ([[open-a-shipped-render-first]]) and the
five existing s5 variants are **a grid, a row, a conveyor, a hopper and a grid**
— five spellings of "identical boxes in a line". That is the whole "too basic"
note ([[too-basic-is-the-cut-rate]]) and no amount of relighting fixes it.
⭐ CODE v18's actual content is the counter-example: its Xiaomi panel carries a
dial, LED rows, a lever, a screen and a knob; its depot carries a crate, hazard
stripes, a crane and shelving. **Every option here is ONE COMPOUND MACHINE OR
PLACE** — press frames, ram, molten bolster, rivet rows, name plates, lamps,
turret heads, a vice, a tool rack — with a smaller satellite and visible ground
between them. `Rivets` and `Lamp` are extracted for exactly this: they are the
cheapest thing that turns a slab into a machine.

### ⛔ THE FRAME YOU SAMPLE IS PART OF THE TEST
S6 was first rendered at f20. `O6B`'s reveal is `ease(f, 18, 30)`, so at f20 it
was **17% lit** — the option was previewed as a dark rectangle and would have
been rejected for a defect of the SAMPLING, not of the idea. Re-rendered at f26,
where all three of A/B/C are mid-event. ⭐ On a sheet whose tiles have different
timings, the sheet frame must be solved so **every** tile is mid-transformation,
not just the first one. Same family as the earlier fault where C's collapse and
E's wipe both previewed as their own aftermath.

### ⛔ WHAT A SHEET STILL CANNOT TELL YOU
These answer *"is this the right object"*. They do **not** answer *"is this shot
alive"* — five approved stills once shipped 37% frozen on this reel. After the
pick: derive every timing from the shot's own frame count, then run the dead-shot
audit on a moving render before showing anything.

### CARRIED FORWARD
- ⛔ s12 is not a weak shot, it is a BROKEN one — **17 of 61 frames frozen**,
  mean band motion 0.67 against the reel's 3.96. It has no event at all.
- ⛔ s6 is **42 frames**. One event. B and C are single events; A only works if
  s5 is its setup.
- s3's page is the authored `TrashPage` component, not a screenshot
  ([[real-page-is-the-clutter]]) — 2000s blue nav, red banner, three clashing
  blocks. A real site cannot reach that much clutter.

## ⛔⛔⭐ ROUND 12 — "NOT HIERARCHICAL" HAS A NUMBER, AND IT IS THE CRATE'S (2026-08-08)

> Alex: *"this crate one is pretty good but besides that for the other shots like
> they arent heirarchicla nor interesting enough"* · *"like either they have too
> much going on or the animations themselves arent interesting"*

⭐ **HE NAMED TWO FAULTS AND THEY ARE TWO DIFFERENT MEASUREMENTS.** Ran
`tools/hero_share.py`'s method over all 21 ROUND 11 tiles:

| | hero | blobs |
|---|---|---|
| ⭐ **S12B — the crate, approved** | **98.4%** | **2** |
| everything else | median **69.9%** | up to **21** |
| worst: s6 | 16.7-31.2% | 15-17 |
| s8 | 26.5-47.8% | 4-18 |

⛔⛔ **"TOO MUCH GOING ON" IS THE GRIDS.** Every failing tile had a lattice of
small parts — 53 files, 25 switches, 5 stations, 18 slabs. I built WIDE SCENES
WITH MANY PARTS; the crate is **ONE BIG THING COMING AT THE CAMERA**. A repeated
element may only appear as DEPTH (copies touching the hero), never as a grid —
a grid is one blob per cell, by construction.

⭐ ROUND 12 (`src/scenes/apple13Hero.tsx`, 12 bodies, sheets `HeroS3S5` /
`HeroS6S8` / `HeroS9S11`) moved the median from **69.9% → 100.0%**, 10/12 at
≥95%.

### ⛔⛔ AND THE NUMBER IS STILL NOT SUFFICIENT — IT FAILED TWICE IN ONE ROUND
`H5A` "THE BLANK COMING AT YOU" measured **100% hero / 1 blob** and rendered as
**a large grey empty rectangle.** ⭐ The trap is in the brief: **s5's subject is
BLANKNESS, and a blank hero is an empty frame.** Same failure as S5C's yard of
slabs and the old full-width settings sheet — three times now on this reel.
⭐⭐ **THE FIX IS TO MAKE THE MACHINE THE HERO, NOT THE BLANK.** The blanks then
appear as REPETITION INSIDE one lit mass, which is texture rather than emptiness.
Rebuilt as THE TOWER (a column of identical slabs, newest landing on top).

### ⛔ TWO SAMPLING/GEOMETRY FAULTS THAT WOULD HAVE MISREPRESENTED THE IDEA
1. ⭐ **Per-tile frame offsets, added to the sheet chassis.** ROUND 11's S6 sheet
   was rendered at f20 where `O6B`'s reveal was **17% lit** — previewed as a dark
   rectangle, i.e. a defect of the SAMPLING, not the idea. One sheet frame cannot
   be mid-event for four bodies whose timings derive from shots of 42f to 94f, so
   each tile now carries its own offset via `Sequence from={-n}`.
2. ⛔ THE TOWER's landing slab was authored at y −260 against a stack whose top is
   −156 — **104 units above it, off the tile**, so the shot's ONLY event was
   invisible. Landed onto the stack and shortened to 7 slabs.

### ⚠️ WHAT THE GATE CANNOT SEE, AND IS NOW THE OPEN RISK: CROSS-SHOT REPETITION
Every tile passes hierarchy INDIVIDUALLY while the SET repeats itself:
- **s6A · s6B · s8A are all "one big white app screen"** — three consecutive
  shots that would read as the same picture.
- **s8B and s11B are both "a giant die stamping down"**.
⛔ `hero_share` is a per-frame statistic and is blind to this by construction —
it is [[reel-interscene-contrast]]'s job (distinct setting + dominant colour per
scene) and nothing measures it yet. Flagged to Alex rather than silently picked.

## ⛔⛔⭐⭐ ROUND 13 — "TOO BIG AND NOT INTERESTING, IDK" → GO MEASURE THE SHIPPED REEL

> Alex: *"the animations feel too big and not interesting enough idk"*

⭐ **"idk" IS THE INSTRUCTION TO STOP GUESSING AND MEASURE.** Two rounds rejected
from OPPOSITE directions, and the bar sits between them:

| | cover | hero share | blobs | **hero AREA** |
|---|---|---|---|---|
| ⭐ **CODE v18, shipped** | **40.7%** | **87.8%** | **4** | **36.8%** |
| ROUND 11 "too much going on" | 31% | 70% | up to 21 | **18.8%** |
| ROUND 12 "too big" | 78% | 100% | **1** | **81.5%** = **2.2x the bar** |

### ⛔⛔ THE CALIBRATION ERROR, FOR THE THIRD TIME ON THIS REEL
ROUND 12 was calibrated to **ONE TILE — the crate — and the crate is a CTA payoff
shot.** A closing frame is deliberately the biggest thing in the reel. Taking its
number as the spec for six BODY shots is [[measure-against-the-right-reference]]
again: *the reference for a body is the shipped reel's bodies, not its last frame.*
⛔ n=1 is not a bar. Sample the reel.

### ⛔⛔ THE BLOB COUNT WAS THE TELL I HAD ALREADY BEEN TOLD
CODE runs **4 blobs**, not 1 — a hero **PLUS ~3 SMALL SATELLITES**, with **59% of
the band left as empty ground**. This log wrote it in words one round earlier —
*"the hourglass is the hero, the counter and the creature are small satellites,
and there is clear ground between them"* — and I read "one hero" and **deleted the
satellites**, then inflated the hero to fill the space they left.

### ⭐⭐ AND THEN I OPENED THE RENDER, WHICH SHOULD HAVE BEEN STEP ONE
[[open-a-shipped-render-first]]. Four things live in CODE v18's bands that no
measurement contains, and they are the whole of "not interesting enough":

1. ⭐ **THE HERO IS A NAMEABLE REAL-WORLD OBJECT** — an arcade cabinet, a shipping
   crate, an hourglass, a pipe with a wrench through it, a sonar porthole.
   **Mine were slabs, panels and generic screens.** ⛔ A rectangle at the right
   size is still a rectangle ([[reel-chassis-cinematic-not-abstract]],
   [[animation-concepts-need-a-real-artifact]]).
2. ⭐ **IT CARRIES REAL TEXT OR A REAL MARK** — `HIGH SCORES · Xiaomi MIMO 82 ·
   CLAUDE 79`, `MIT`, `OPEN WEIGHTS`, `2000 per day`, the Z and Huawei logos.
   There is always something to READ.
3. ⭐ **THE SPRITE IS A PARTICIPANT** — at the cabinet's controls, in a hard hat
   beside the pipe, watching the hourglass run. Mine was parked in a corner.
4. ⭐ **EVERY SHOT IS A DIFFERENT PLACE** — arcade, factory, depot, workshop, seabed.

### THE BUILD — `src/scenes/apple13Bar.tsx`, comp `BarSheet`
Three shots to the measured spec (hero ~560x310 = 37% of the 1080x438 band, cover
~41%, 4 blobs, sprite in-scene, 2-3 satellites: a gauge, an extractor fan, a mug).

| | cover | hero | blobs | hero area | |
|---|---|---|---|---|---|
| s5 THE BLANK PRESS | 43.1% | 88.0% | **4** | **37.9%** | ⭐ on the bar |
| s3 REQUEST TERMINAL | 35.3% | 82.4% | 7 | 29.1% | on the bar; ⛔ button collides with the screen overlay |
| s9 INSPECTION BENCH | 23.5% | 56.1% | 7 | 13.2% | ⛔ hero FRAGMENTED — top/legs/device/loupe never connect |

⛔ NOT SENT AS FINISHED. Direction check first — two rounds have now been built
past a wrong premise, and a third would be the same error a third time.

## ⭐⭐ ROUND 14 — s9 PICKED, AND IT IS THE ONE MY GATE SCORED WORST (2026-08-08)

> Alex: *"im thinking s9 here could be a pretty good option"*

⛔⛔ **s9 SCORED THE WORST OF THE THREE ON MY OWN GATE** — hero **13.2%**, **7
blobs**, against CODE v18's 36.8% / 4. I had flagged it in the handover as
*"hero FRAGMENTED"* and offered to fix it. **He picked it.**
⭐ So the gate does not get to overrule him: `hero_share` reverts to a SANITY
RAIL, not a target. This is [[hierarchy-gate-is-hero-share]]'s own lesson
recurring — there, `chaos_audit.py`'s 25% bar failed the entire shipped catalogue
including the hook Alex approved. **A gate that rejects what he approves is the
wrong gate for that case.** ⛔ Do NOT "fix" s9 toward 36.8%.

### ⭐ WHAT s9 HAS, NAMED SO IT CAN BE REPEATED ON PURPOSE
Six properties, none of which is a number:
1. a **REAL PLACE with a WORK SURFACE** — not an object floating in a void
2. the **SUBJECT SITS ON that surface, small** — never the hero itself
3. a **TOOL enters frame and ACTS** on the subject
4. a **LABELLED READOUT with real words**, lighting in sequence — something to READ
5. the **SPRITE AT the surface**, a participant
6. big empty ground + 2-3 small satellites (gauge · fan · mug · gantry rail)

⛔ **VARY THE PLACE OR IT IS ONE SET SIX TIMES** ([[reel-interscene-contrast]]):
s3 service counter · s5 factory · s6 storeroom · s8 workshop · **s9 workshop
(deliberately the same room as s8 — the room method)** · s11 archive ·
s12 loading dock (the approved crate).

### THE SET — `src/scenes/apple13Bar.tsx`, comps `SetSheetA` / `SetSheetB`
| | cover | hero | blobs | hero area |
|---|---|---|---|---|
| ⭐ CODE v18 | 40.7% | 87.8% | 4 | 36.8% |
| ⭐ **s9 — HIS PICK** | 25.9% | 60.1% | 7 | **15.6%** |
| s3 SERVICE COUNTER | 30.6% | 76.8% | 4 | 23.5% |
| s5 BLANK PRESS | 43.1% | 88.0% | 4 | 37.9% |
| s6 STOREROOM | 37.6% | 89.4% | 4 | 33.6% |
| s8 WORKSHOP | 22.9% | 66.7% | 12 | 15.3% |
| s11 ARCHIVE | 34.9% | 74.8% | 8 | 26.1% |

⭐ The whole set now lies BETWEEN his pick and the shipped bar. No outlier in
either direction — ROUND 11 was 18.8%/21 blobs and ROUND 12 was 81.5%/1 blob.

### ⛔ TWO SAMPLING FAULTS, ONE OF WHICH I HAD ALREADY WRITTEN THE LESSON FOR
1. ⛔⛔ **s6's dust sheet had ALREADY LEFT FRAME at offset 26** — the shot
   previewed as its own aftermath, which is the exact fault recorded two rounds
   earlier about C's collapse and E's wipe, and again about S6 at f20. Writing
   the lesson down did not stop me repeating it; **the offset has to be SOLVED
   from the body's own easing, not eyeballed.** Fixed to 15 (mid-pull).
2. ⛔ s9's loupe arm was drawn to y−118 from HY=TOP+172 → absolute y460, **ten
   pixels above the band top (470)**, so the tool hung from nothing. It now hangs
   off an in-frame gantry rail — which also gives the shot its fourth satellite.

## ⭐⭐ ROUND 14b — WIRED INTO THE REEL, AND SIX SHOTS WERE DEAD (2026-08-08)

> Alex: *"can we just proceed"*

Wired s3/s5/s6/s8/s9/s11 → `apple13Bar.tsx`'s bodies and s12 → the approved
crate (`O12B`). Render `out/prev_Apple_r14.mp4`, 800 frames = 26.67s.

### ⛔⛔ THE FIRST RENDER WAS 26.8% FROZEN — **SIX OF TWELVE SHOTS DEAD**
| shot | frozen /frames | cause |
|---|---|---|
| s8 | **51/82** | `settle` finished 7 frames into each 16-frame step → **static for 9 of every 16 frames, five times over** |
| s11 | **52/94** | a **12-frame HOLE** between `open` ending at 32 and `lift` starting at 44, plus a dead tail |
| s3 | 28/71 | events SEQUENTIAL with gaps — land ended 26, stamp began 30, nothing after 62 |
| s6 | 26/42 | `eased` decelerates into its end; on 42 frames most of them moved sub-threshold |
| s12 | 26/61 | same — `eased` crawls at both ends, plus a 24→26 gap |
| s5 | 20/66 | `1 - abs(beat-0.4)*4.2` **clamps to zero** for most of every cycle |

⭐⭐ **THE COMMON CAUSE, AND IT IS NOT "TIMINGS TOO SHORT".** I had already
extended every ending to reach the shot's frame count — the standing rule as I
had understood it. **The rule is not "make the events reach the end", it is
"SOMETHING MUST BE TRAVELLING ON EVERY FRAME."** Six shots each satisfied
"spans the shot" while containing gaps, holds and clamped-to-zero stretches
inside that span. A body can span its shot and still be a slideshow.

⭐ Three concrete anti-patterns, all found here and all invisible in a still:
1. ⛔ **A clamped peak** — `max(0, 1 - abs(t-k)*m)` is ZERO across most of its
   cycle. A raised cosine `(1-cos(2*PI*t))/2` never stops moving.
2. ⛔ **`eased` on a SHORT shot** — its ease-in/ease-out means the middle is the
   only moving part. Use linear `ease` under ~50 frames.
3. ⛔ **Snap-then-hold stepping** — `floor(f/16)` + a 7-frame settle is 9 static
   frames per step. Drive the step index OFF a continuous rotation instead.

### RESULT — ALL TWELVE ALIVE
`reel frozen **4.4%** (was 26.8%) · mean band motion 3.44` · **0 dead shots**.
s8 went 51 frozen → **2**, s11 52 → **13**, s3 28 → **0**.

⛔ Still ahead: SFX re-solve (the cue times are keyed to the OLD bodies), the
`plans/apple.ts` lint, the atomic `Root.tsx` rewire, and a full-scale render —
preview only until Alex says final ([[preview-renders-until-final]]).
