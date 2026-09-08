# SEO — factory log (**FACE reel 14**)
> ⛔⛔ THIS IS A **FACE** REEL — Alex's facecam is in it. Face and Faceless
> number SEPARATELY ([[video-assets-to-personal-gdrive]]). Delivery goes to
> `gdst:"Claude Reels/Face/*Videos/14 - SEO/"` — files `14 - SEO.mp4`,
> `caption.txt`, `SEO - <Title>.docx`. ⛔ NOT Faceless: 93 is already a
> different, live faceless reel there.
>
> ⛔ Opened STAGE 0 per [[factory-log-first]]. Source: `IMG_3531.MOV` (128.2s raw).
> Keyword **SEO**. Pre-locked VO.

## STAGE 0.5 — ⭐ FACT-CHECK PASSED, live GitHub API 2026-08-07
**Repo: `AgriciDaniel/claude-seo`** · **13,588 stars** · 1,980 forks · MIT.

| VO claim | verdict | evidence |
|---|---|---|
| **"18 SEO agents and 25 specialized skills"** | ✅ **EXACT** | repo description: *"25 sub-skills + 18 sub-agents"* |
| "audits technical SEO, content, schema, GEO and local SEO" | ✅ all four | description names technical SEO, schema, GEO/AEO, local SEO |
| "trained around Google's own optimization guidelines" | ⚠️ verify wording in the README before a card |
| "tells you what to improve in what order" | ⚠️ verify |
| "even fixes your website for you" | ⛔ **strongest claim, verify it EDITS and does not only report** |

⭐ The 18/25 pair is the reel's specificity anchor and it is REAL. Put it on a card.
⛔ "I shouldn't be saying this" is a hook device, not a claim — nothing to check,
but do not build a visual that implies the repo is leaked or private. It is MIT.

## STATUS: premise solid. Two claims to confirm in the README.

## STAGE 1 — VO CUT ✅ (2026-08-07)

| | |
|---|---|
| voiceover | `brand-system/out/vo6/video4-SEO-VO.wav` — **24.8s** |
| EDL (source time) | `brand-system/out/vo6/video4-SEO.edl.json` — 9 spans |
| conformed facecam | `brand-system/out/vo6/deliver/VIDEO-4-SEO.mp4` |
| ⭐ **VO to mount** | `brand-system/out/vo6/deliver/VIDEO-4-SEO.wav` — **frame-aligned to the picture** |
| raw | `~/Downloads/IMG_3531.MOV` · 48k audio `brand-system/out/vo6/src/hi_3531.wav` |
| transcript | `brand-system/out/vo6/src/tx/IMG_3531.json` — energy-gated, do NOT regenerate casually |
| batch | **6** — every tool takes `--batch=6` or `VO_BATCH=6` |

⛔ **USE THE `deliver/` WAV, NOT `FINAL/`.** They are the same edit, but the
`FINAL/` one is cut on EDL times while the picture is quantised to whole source
frames — measured up to 2.5 frames of accumulating offset. `deliver/` is cut on
the frames themselves and matches the mp4 exactly.

Marker gate: **0 "cut cut" survive**. Every script sentence is covered by a take
except where noted below.

✅ clean. The "18 SEO agents and 25 specialized skills" pair survives intact —
that is the specificity anchor from Stage 0.5, put it on a card.

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
cd ~/Downloads/brand-system && mkdir -p pub6/footage4 && \
  cp out/vo6/deliver/VIDEO-4-SEO.mp4 pub6/footage4/clean.mp4 && \
  python3 tools/extract_landmarks.py pub6/footage4/clean.mp4 pub6/footage4/landmarks.json && \
  python3 tools/make_matte.py pub6/footage4/clean.mp4 pub6/footage4/matte.mov
```

⛔ `matte` IS the cutout, not a mask — never draw `clean.mp4` over it
([[matte-is-the-cutout-not-a-mask]]). ⛔ CROP/FULL constants are PER-SHOOT; do not
reuse reel 89's ([[cloned-crop-constants-per-shoot]]). ⛔ Prefix every asset with
the reel number ([[reel-asset-name-collisions]]).

## STAGE 1.5 — ASSETS + THE LOCKED TEXT ✅ (2026-08-07, build chat)

⛔⛔ **THE BOOTSTRAP COMMAND ABOVE IS WRONG IN ALL FIVE BATCH-6 LOGS.** It ends
`make_matte.py ... matte.webm`, but `make_matte.py` hard-codes `prores_ks /
yuva444p12le` — ProRes cannot be muxed into a WebM container, and its own comment
says libvpx silently drops the alpha plane, which is *why* it is ProRes. Written
as `.webm` you get an unplayable file. Use **`matte.mov`**. (COURSE's chat hit
this and corrected it silently; nothing in the pipeline flags it.)

| asset | value |
|---|---|
| `pub6/footage4/clean.mp4` | 1080x1920, 24.77s, 743 frames |
| `pub6/footage4/matte.mov` | ProRes 4444 `yuva444p12le`, 743 frames, 322MB |
| `pub6/footage4/landmarks.json` | **0 frames no-detection (0.0%)** |
| `pub6/footage4/words_clean.json` | 94 words, ends 24.38s |

### ⛔⛔ THE 18/25 ANCHOR NEARLY GOT DELETED BY A "PRINCIPLED" SHORTCUT
Stage 1 recorded the anchor as surviving. Building word timings, I intersected
the locked transcript with the locked EDL — no re-transcription, which is what
the log asks for — and got:

    "...and it fixes your actual website for you. and 25 specialized skills..."

**"18 SEO agents" gone.** The cause is [[transcript-is-not-ground-truth]] exactly
as written: `out/vo6/src/tx/IMG_3531.json` carries **`agents` as one 4.9-second
token**, 97.38 → 102.28, straddling the splice at 100.81. No span test can
resolve that, and a dropped word looks identical to a correctly-cut one.

⭐ **The finished WAV settled it in one pass.** Transcribed in isolated 6s and 4s
windows (16 kHz — see below), both agreeing on every word: **the anchor is
intact.** Stage 1 was right and my mapping was wrong. Two other errors in the
same region were also transcript artefacts, not speech:

| transcript said | he actually says |
|---|---|
| "it will **auto** your website" | "it will **audit** your website" |
| "Google's **goes** own guidelines" | "Google's own guidelines" |
| *(absent)* | "**Comment** SEO below" |

⛔ **16 kHz OR IT HALLUCINATES FLUENTLY.** faster_whisper assumes 16 kHz for a
raw array; fed the 48 kHz deliver WAV it returned *"I found a sign that spreads
on the street"* for clean speech — confident, well-formed, entirely invented.
Resample first, always.

**The locked text is checked in at `out/vo6/scripts/SEO.txt`** so the next agent
reads the record instead of re-deriving it. Words are built by
`tools/vo6_words.py` (true script + whisper timings, difflib-aligned — the
`code_words.py` method with the script passed in rather than pasted into source).

### ⛔ CROP/FULL — and `solve_crop.py`'s replacement target is wrong too
`tools/solve_crop.py` declares itself broken. Its docstring gives a four-line
derivation to use instead and a check: *"run it on reel 84 and it must return
(494,88)/472px."* **That target reproduces NEITHER shipped reel.** Reversed out
of the constants each reel actually ships:

| | card shoulders / nose | full shoulders / nose |
|---|---|---|
| reel 83 KEY | 448.7 · (487.5, 92.1) | 806.6 · (583.1, 810.6) |
| reel 84 AGENTS | 496.8 · (509.9, 60.1) | 852.5 · (608.4, 773.0) |

Reel 84 sits **5% larger and ~30px higher** on both. The docstring target is
close to 83 on FULL and a midpoint on CARD — which is why checking it against 84
fails by a clean 5.2% on every axis. **There is no single house number; the
calibration is a CHOICE and it gets declared.**

`tools/derive_crop.py` (new) carries both looks and reproduces either shipped
reel **exactly, delta (0,0,0)**. Calibrated to **83/KEY** — the chassis reference
`chassis_diff.py` measures against, and the framing
[[read-the-repo-docs-first]] records as shipped and approved:

```ts
const CROP = {width: 1397, left: -166, top: -974};
const FULL = {width: 2511, left: -591, top: -1106};
```

⛔ He sat **further back this shoot** — shoulders 0.3212 against 0.3516 (83) and
0.3691 (84). Cloning any prior reel's constants would have framed him small.

### VO SEGMENTS (the shot spine)
| # | in–out | dur | line |
|---|---|---|---|
| 1 | 0.00–3.86 | 3.86 | I shouldn't be saying this, but if you install this into your Claude, it will audit your website for SEO. |
| 2 | 3.86–8.54 | 4.68 | And it will audit your technical SEO, content, schema, even your GEO and local SEO. |
| 3 | 8.90–13.20 | 4.30 | Then it tells you exactly what to improve and in what order, and it fixes your actual website for you. |
| 4 | 13.44–19.12 | 5.68 | It comes with 18 SEO agents and 25 specialized skills all trained around Google's own optimization guidelines. |
| 5 | 19.26–21.74 | 2.48 | So rather than trying to spend hours manually editing your SEO, |
| 6 | 22.08–22.46 | 0.38 | try this. |
| 7 | 22.74–24.38 | 1.64 | Comment SEO below and I'll send the guide immediately. |

Segments 1-4 all exceed the 3.4s shot ceiling and must split (RECIPE §1).

## STAGE 2 — PLAN ✅ `plan valid — 0 findings`

⛔⛔ **I BOARDED THIS AGAINST THE WRONG REPO FIRST.** Alex: *"BRO THIS IS THE
CHENBUILDSAI GITHUB VIDEO EDITING WORKFLOW NOT THE FACELESS ONE."* He is right.
I used `claude-reels-workflow/storyboards/STORYBOARD-SPEC.md` — villain, story
arc, **sprite roster**, split-screen mirror check. **That is the FACELESS
contract.** A FACE reel goes through `brand-system`'s own planner:

    planner/PLANNER.md  →  plans/<reel>.ts  →  npx tsx plans/<reel>.ts
                        →  "plan valid — 0 findings"  →  build bodies

Registers are picked FROM THE CLAIM via `REGISTER_FIT` in `src/system/grammar.ts`
and enforced by `validatePlan` before a frame exists. Nothing about arcs,
villains or sprites applies. ⛔ Same shape as the 2026-08-03 failure in
[[read-the-repo-docs-first]]: I had *read* brand-system's docs this time, then
reached for a remembered process from the other repo anyway. **Reading the right
docs does not help if the wrong contract is the one you act on.** The bad board
is deleted rather than left to mislead the next agent.

**`plans/seo.ts` — 10 shots · 24.76s · one cut per 2.48s** (reference rate is
2.5-3.2s; the fast end suits a 25s reel).

| register | runtime | share | why |
|---|---|---|---|
| OBJECT | 9.70s | 39% | the mechanics — position, strata, repair, roster |
| BOARD | 6.36s | 26% | narrating with one piece of evidence beside him |
| SCREEN | 5.50s | 22% | the audit running + Google's real guidance |
| FACE | 3.20s | 13% | the one opinion beat (cap is 35%) |

⛔ **"try this." is 0.38s / 11 frames** — not its own shot. It fails `shotRange`
and cannot hold an arc (law 49); the derived table attaches it to the FRONT of
the CTA, which is better than the back of the grind beat.
⛔ **18/25 is OBJECT, not TYPE** — TYPE is capped at one per reel and is for a
single number landing alone; two numbers arriving together is a roster. The grid
version is recorded in the plan as considered and **rejected** under law 63.

## STAGE 3 — SHOT TABLE (derived) + CHASSIS ✅

### ⛔⛔ "SPLIT AT THE WIDEST GAP" IS A MIDPOINT WHEN THERE IS NO GAP
`shot_table.py` splits an over-ceiling segment at its widest internal word gap.
**Two of this reel's breath groups have no internal gap at all:**

    2.56-8.54   (5.98s)  ...for SEO. And it will audit your technical SEO...
    13.44-19.12 (5.68s)  It comes with 18 SEO agents and 25 specialized skills
                         all trained around Google's own optimization guidelines.

With every `g` at 0.00 the score `g - |pos-0.5|*0.25` collapses to **pure
midpoint** — not a decision about the sentence. It cut between **"25 specialized"
and "skills"**, severing a number from its noun on the beat carrying the reel's
whole specificity anchor. Nothing errored; the table looked fine.

The audio is one continuous `<Audio>`, so the picture cut is free (law 67) and
belongs to MEANING. `shot_table.py` now:
- **warns** on any undeclared zero-gap split, naming the two words it fell between
- takes **`--split-at`**, and **raises** if a declared point matches no word onset
  within 0.06s (snapping a typo to "the nearest word" would silently restore the
  arbitrary cut this exists to prevent)

```bash
F=pub6/footage4 python3 tools/shot_table.py pub6/footage4/words_clean.json \
  pub6/footage4/vo.wav --split-at 3.86,6.70,16.58
```
→ **10 shots**, anchor intact. ⛔ `clean.mp4` is VIDEO-ONLY in batch 6, so the
audio path must be passed explicitly; without it the tool dies on ffmpeg 234.
⛔ `takes.json` did not exist, so `take_edges()` returned **[]** and the law-76
seam check silently passed on zero seams — built it from the EDL's 9 spans.

### ⛔ CLONE SOURCE IS **Smart89**, NOT Mcp
Mcp is Face 03 and passes `chassis_diff` 100%, so it was the obvious pick. It is
the wrong one: Mcp carries `RUN_OF` / `RUN_FRAMES` and a **per-shot `<Audio>`**,
because reel 83's picture and audio were different clocks. Batch 6 is Code's
situation — `VIDEO-4-SEO.mp4` and `.wav` are the SAME 9 EDL spans, frame-exact —
so there is nothing to drift and the run table is pure liability (law 94: *the
audio run table is the last cloned thing and half of it fails silently*; law 82:
an `<Audio>` loses ~38ms at its head, so start as few as possible).

**`Smart89.tsx` passes `chassis_diff` at 99.2-99.4% AND mounts ONE root `<Audio>`
with a per-shot `trim`** — the architecture batch 6 actually has.
→ `src/scenes/Seo14Frame.tsx`, constants swapped, `npx tsc` clean.

⚠️ **Open deviation to declare:** `Seo14Frame` hard-codes `GROUND.deep` (reel 89
was deep throughout) and this plan alternates light/deep by scene. Adding a
`ground` prop does not affect `chassis_diff` (it measures only Progress /
CardFigure / FullFigure) but law 90 applies: **the body paints the plate and the
prop colours the type — they must agree**, or headers go invisible, which is
exactly MCP defect #2.

`pub6/` now carries hard-linked `marks/ sfx/ plates/ logos/ cube.mov`
([[remotion-public-dir-render-cost]] — hard links, never symlinks).

## STAGE 3.5 — ⛔⛔ REGISTER CORRECTION + LAW-124 VERIFICATION

⛔ `brand-system`'s git remote **is** `github.com/alexyc9381/chenbuildsai-editing-system`.
`git remote -v` settles "which repo does he mean" in one command.

### The second correction: the register came from the ANIMATION, not the CLAIM
The first plan ran **OBJECT 41%** — a SERP haul, "hidden strata", a map pin, a
roster board. `plans/repo.ts` names this error in its own header and it was
committed again here. ⭐ **The tell: if the shot needs a METAPHOR for something
that HAS A URL, the register is wrong.** Corrected plan: **SCREEN 54% · BOARD 26%
· FACE 11% · OBJECT 9%**, still `plan valid — 0 findings`.

### ⭐⭐ THE PAGE BACKS THE SCRIPT — verified live, before a frame
| VO claim | live check | verdict |
|---|---|---|
| "18 SEO agents" | `agents/` = **exactly 18 files** | ✅ **CIRCLE IT** |
| "25 specialized skills" | `skills/` = **exactly 25 dirs** | ✅ **CIRCLE IT** |
| technical · content · schema · GEO · local | five REAL filenames: `seo-technical` `seo-content` `seo-schema` `seo-geo` `seo-local` | ✅ the five domains ARE five files |
| "Google's own optimization guidelines" | README cites `developers.google.com/.../ai-optimization-guide` by URL | ✅ |
| stars | **13,623** (13,588 at Stage 0.5 — it grew) | ✅ badge reads 13.6k |
| **"it fixes your actual website for you"** | **NO auto-fix anywhere** | ⛔ **FAILS** |

⛔⛔ **THE AUTO-FIX CLAIM DOES NOT HOLD.** The repo is an *analysis* plugin by its
own README: *"Every audit produces a prioritized action plan"*, *"writes real
markdown reports as its primary deliverable"*, and content WRITING is a separate
companion repo (`claude-blog`). Stage 0.5 flagged this as the one to verify and
it does not survive.

**Consequence for the build (law 124):** shot 5 may NOT carry a capture. A real
page reading "analysis plugin" under a VO saying "it fixes your website" would
disprove the line in the frame that speaks it — worse than any drawing. It is
the reel's single OBJECT shot for exactly that reason, asserting no mechanism.
⛔ This is the PACK "226 skills / 17 directories" trap, caught before render
instead of after. ⛔ Alex's call whether to leave the line as recorded
([[recording-beats-script]] — the recording is the script and I do not re-cut it).

### Real assets staged in `pub6/seo14/` (law 124: capture, don't draw)
`14-repo.png` · `14-agents.png` · `14-skills.png` · `14-google.png` (headless
Chrome, 1360x1000) · `14-growth-3-months.png` (repo's own GSC panel: **10.8K
clicks, 324K impressions**, curve off the floor, + PageSpeed 99/93/100/100) ·
`14-seo-audit-demo.gif` (the audit ACTUALLY RUNNING — `/seo audit rankenstein.pro`
in Claude Code, command table visible).
⚠️ Re-shoot `14-agents.png` taller: only 15 of 18 rows are in frame at 1000px.

## STAGE 4 — CROWN PROBE ✅ (a real frame, before writing any body)

`Seo14Probe` renders the chassis with the two constraint lines drawn on it —
magenta `HEAD_CLEAR14`, cyan `BASELINE14` — because both are inherited from reel
89 and **reel 89 is a different shoot** (law 103, [[measure-pose-not-motion]]:
arithmetic first, then look). `out/seo14_crown.png`, frame 120, 9s to render.

**What it proves works:** the cutout composites correctly and **his head breaks
the panel's top edge** ([[matte-is-the-cutout-not-a-mask]]); the plate is behind
him, not his real wall; captions are word-synced and read *"your website for
SEO."* — the verified text, not whisper's; and the derived CROP (calibrated to
83/KEY) frames him large and chest-up, which is the house look.

**Two defects it caught:**
1. ⛔ **The header is still reel 89's** — "REMOVE 99% CLAUDE MISTAKES / One File"
   is `Seo14Frame`'s default. Exactly [[reel-cloned-chassis-stale-assets]]: the
   clone half-works and nothing errors. Every shot must pass its own `header`.
2. ⚠️ **`HEAD_CLEAR14 = 500` is inherited and loose here.** He sits LOWER in this
   crop than in 89 — crown lands near y≈990 against a 500 ceiling, so the mass
   band (500→850) is entirely clear. Safe, but it is luck rather than a
   measurement, and it means ~140px of usable band is being left unused between
   the cyan line and his crown. Re-derive before the bodies are sized.

## STAGE 5 — BUILT + 4 DEFECTS FROM STILLS + ⛔ A FALSE GREEN GATE

Built: `bodies14.tsx` (9 bodies) + `Seo.tsx` (10 shots, one root `<Audio>`).
`chassis_diff` ✓ 99.2-99.7% · `tsc` clean.

### Defects the STILLS caught (law 85 — never commit 743 frames first)
1. ⛔⛔ **EVERY HEADER WAS INVISIBLE.** The bodies painted a full-band `Room`
   background and the body div is a LATER SIBLING than the header, so it covered
   it. **MCP defect #2 verbatim.** Law 90: the FRAME owns the ground, a body only
   adds atmosphere. Fixed by deleting the background from `Room`.
2. ⛔ **Bodies were authored from y=250 — inside the header block** (288..490),
   i.e. above `HEAD_CLEAR14`, law 103. Moved below 500.
3. ⛔ **"0 SKILLS" on screen for 14 frames** — the count card faded in at f=30
   but its counter did not start until f=44. A wrong number on screen. Card and
   count now share one clock.
4. ⛔ **Ground seam / white-on-white.** `ground` is now a real prop and the
   caption + header scrim follow it.

### ⛔⛔ `lint_shots.py` EXITED 0 HAVING CHECKED NOTHING
It matches `<Shot src={...}>` by regex; `Seo.tsx` renders `<Seo14Frame>` from a
`.map()`, so it found **zero** shots and printed `no <Shot> blocks found` — and
**returned success**. The reel would have "passed" the gate that enforces laws
47-50 (an animation appears exactly once · one ground per scene · an animation
finishes inside its own shot · **no two shots share a paradigm**) while being
entirely ungated. [[reel-tools-hardcoded-to-old-reel]] / [[lint-shots-covers-16-of-89-laws]]
again: **a skipped check must never print as a pass.** Now `sys.exit(...)` → exit 1.
⛔ Still to do: give the linter a shape it can read for map-rendered scenes, or
the gate stays red for the wrong reason.

## STAGE 6 — ⛔ ALEX'S ANIMATION BAR (2026-08-07). THE CURRENT BUILD FAILS IT.
> *"if there's screenshots, they have to be hierarchical… you have to annotate
> the screenshots. I only wanna see one screenshot on the screen at a time, like
> one image. And it should really just be one animation at a time… making sure
> the animations are actually to our quality bar."*

| ask | current state |
|---|---|
| **ONE screenshot on screen at a time** | ⛔ `Roster` shows agents/ AND skills/ side by side |
| **ANNOTATE them** | ⛔ a single thin ellipse is not annotation — needs punch-in, circle, arrow, callout |
| **HIERARCHICAL** | ⛔ the whole page arrives at once and is never resolved to the one region that matters |
| **ONE animation at a time** | ⛔ ungated (above), and `Running` ticks 3 chips while the capture is still settling |
| **see the options** | ⛔ not offered — [[show-options-not-one-guess]] |

⭐ The fix for "one screenshot at a time" is law 54, which is already the house
answer: **one object TRANSFORMS, it is not replaced.** agents/ punches in,
annotates, then the SAME window re-crops to skills/ — one image throughout.

## STAGE 6 — HOOK, 8 ROUNDS. THE CLUTTER WAS THE SCREENSHOT.

Options pass run (18 draft stills, one bundle, 29s), then 6 animated hook
candidates, then 4 frame-0 concepts per `docs/THE-OPEN.md`. Alex picked **C1 the
drop** — Claude abseiling a real page — and the remaining work was making it hit
the approved numbers.

### ⛔⛔ `hero_share.py` SETTLED "TOO CLUTTERED" IN ONE RUN
| | hero | blobs |
|---|---|---|
| `hook_A_final` — APPROVED | 97.1% | **2** |
| real dense site @940px | 69.8% | 9 |
| punched to 1180 + brackets deleted | 72.4% | **18** ← worse |
| + spotlight scrim | 45.7% | 17 |
| **simple white page authored in HTML, 610px slab** | **90.5%** | **2** |

Deleting elements made it WORSE, which is MEASURING.md's signal that the model is
wrong. **A real marketing page is inherently 20+ disconnected elements**; punching
in makes each bigger, not fewer. Full detail: [[real-page-is-the-clutter]].

### Other things this stage cost, all now written down
- ⛔ **law 103 bit THREE times in one hook** — the page column, C1's sprite through
  the headline (`SEO … DE`), C4's top tile row at y=400. Now arithmetic:
  `floorFor(size) = TOP + size*0.92`, plus a pixel gate on the header block.
- ⛔ **"glitchy sprite" was the WALK CYCLE**, not the frame rate — `Mascot` hops,
  squashes and pumps its legs while hanging, and `crispEdges` shimmers at
  fractional positions. [[mascot-walk-cycle-in-midair]].
- ⛔ **scroll ceiling ~26 px/frame** at 30fps. Peaked at 67.9. Written as a
  module-level `throw`, it then caught my own retry at 27.3. Final 9.1.
- ⛔ **IG danger zone** — the page spanned x -64..1116 on a 1080 frame. Contained
  at 330..940, sprite beside it at 85..295.
- ⛔ `kit/Satellites` lands at y≈122, **inside the header block** — band-local
  replacement needed; do not edit the kit, every shipped reel is calibrated on it.
- ⛔ `kit/Wedges` mounts its own 1080x1920 viewBox and squashes inside the band.
- ⛔ A `scale(k, 1)` "pull-back" SQUASHES rather than recedes. A camera move is a
  similarity transform.
- ⚠️ ffmpeg is NOT on PATH on this machine. Only Remotion's, and it needs
  `DYLD_LIBRARY_PATH=node_modules/@remotion/compositor-darwin-arm64`. Its build
  also lacks the `pad` filter — use PIL for contact sheets.
- ⚠️ `pub6/` is now 1.9GB and is copied on every render.

### Assets added
`pub6/seo14/14-site-tall.png` (rankenstein.pro 1280x4200, dark) ·
`pub6/seo14/14-white-site.png` (**authored** simple page, 760x2600, the one in use)

## STAGE 7 — SHIPPED. Delivered 2026-08-08 to
`gdst:"Claude Reels/Face/*Videos/14 - SEO/"` — `14 - SEO.mp4` (31,782,614 B),
`caption.txt` (1,868 B), `SEO - The Free SEO Agency Setup.docx` (13,028 B).
All three cloud-verified non-zero (⛔ the desktop mount writes 0-byte files).

Final render `out/14-SEO-v19.mp4`, 24.51s, 734 frames. 19 versions.

### The lessons this stage actually produced
- ⛔⛔ **A LOW-RES SOURCE CANNOT BE SHARPENED BY CROPPING HARDER.** `probe_a6.png`
  is 820px wide; a 290px slice shown at 620 is a **2.14x UPSCALE**. Alex called
  it blurry twice and my "zoom in more" pass punched *further* into the same
  small source, making it worse. Fix: re-capture at
  `--force-device-scale-factor=2` (2800x3200) so the region is WIDER than its
  display width. **The rule: source region >= display width, or it cannot be
  sharp.** ⭐ Only `probe_a6` was low-res; every GitHub capture is 1360 and safe.
- ⛔⛔ **THREE SILENT NO-MATCHES on `Seo.tsx` and one on `bodies14.tsx`.** A
  multi-line string replace that does not match is a NO-OP that reports success:
  the headers render came back with the old text still in it, and `Guide`'s ring
  was drawn 228px off its target for a full render. Switched to line-range edits
  with assertions on the boundary lines.
- ⛔ **A GATE AT ITS OWN RESOLUTION IS NOISE.** The VO drift check at 10ms hops
  reported "+1 hop = SHIFTED, breaks lip sync". At 2ms hops with sub-hop
  interpolation: **0.016 frames**. Same shape as the safe-zone gate reporting the
  entire 60px strip as bleeding (it was the chassis vignette).
- ⛔ **EVERY EDL SEAM NEEDS A PICTURE CUT ON IT.** Seam at frame 672 sat 21
  frames from the nearest cut = the "I turn away at 22 seconds" note.
- ⛔ **`trim` MUST DERIVE FROM `from`, NOT FROM `s.at`.** The head trim clamped
  shot 0's `from` to 0 and left its `trim` at 0, putting shot 0 alone NINE FRAMES
  out of lip sync.
- ⭐ The enhanced VO needed LESS gain but landed QUIETER: de-reverb raised the
  crest factor 20.8 -> 21.4 dB, so at the same peak ceiling it sits lower in RMS.
- ⛔ Headers can pass law 136 AND law 114 and still say nothing. "43 AT ONCE" is
  a quantity with no unit of value. The test is: can a viewer ACT on it, CHECK
  it, or REPEAT it.

## STILL OPEN
⛔ Alex has never ruled on **"and it fixes your actual website for you"** (11.0s).
The repo's README says verbatim *"Claude SEO does not edit or write to the user's
website, all analysis is local and diagnostic only."* The picture asserts no
mechanism (the squeegee wipe) and the lead-magnet doc ships the correction in a
green callout, but the LINE is still as recorded ([[recording-beats-script]]).

