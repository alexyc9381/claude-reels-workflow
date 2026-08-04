# AGENTS — factory log (reel 86)

> ⛔ Opened STAGE 0, 2026-08-03 per [[factory-log-first]] — before any storyboard or build.
> ⚠️ Arrived **PRE-LOCKED as an Alex VO recording** (`IMG_3414.MOV`, 296.4s raw, 14 "cut cut" retakes),
> script supplied in `~/Downloads/August 2nd.txt`. Stages 0-4 did **NOT** run as a gated process.
> **NOT a gated ship** — same status as SERENA/TOOL/POSTS/ARSENAL/REPO. This is a **BUILD task**.

## SUBJECT: a GitHub repo of 50+ role-specialised agents — "an AI company"
Keyword: **AGENTS**. Video 4 of the five recorded 2026-08-02.

## STAGE 0 — SOURCE
| field | value |
|---|---|
| door | Alex-authored script, batch of 5 |
| comp | ⛔ **NONE ON FILE** — same gap as REPO/reel 85. Recording already happened; flagging, not pretending. |

## LOCKED VO (cut 2026-08-03, 41.0s, 18 source spans, EDL `out/vo5/video4-AGENTS.edl.json`)
Verified clean: markers ✓ 0 survive · duplicate takes ✓ none · checked on the **word-level** transcript of
the finished audio, not the raw and not segment text ([[vo-take-cutting-pipeline]]).

> Someone just open-sourced a Github repo that lets you spin up an entire AI company with AI employees.
> Engineers, marketers, product managers, designers, each one runs as its own agent. And then they coordinate
> with each other to ship real ideas. · But the crazy thing is, this thing got over 10,000 stars in a single
> week. The engineering department alone has seven agents. Design has seven, marketing has eight. Product
> management, testing, spatial computing. Over 50 agents for roles that you'd find across a real company. ·
> So instead of one big AI trying to do everything, it structures it across an actual org chart. Specialized
> agents with clear roles and workflows between them. · One person with this repo has an output of a 50
> person startup. Comment AGENTS and I'll send you the guide immediately.

## STAGE 0.5 — ⛔⛔ FACT-CHECK FAILED. THE BUILD IS BLOCKED ON A DECISION.
Repo identified as **`contains-studio/agents`** — the department names and "engineering has seven" pin it
exactly; no other candidate matches. Checked live 2026-08-03 via GitHub API + directory listing.

| VO claim | real | verdict |
|---|---|---|
| "over 10,000 stars" | **12,396** | ✅ true |
| "engineering department alone has seven agents" | engineering = **7** | ✅ true |
| "design has seven" | design = **5** | ❌ wrong |
| "marketing has eight" | marketing = **7** | ❌ wrong |
| "over 50 agents total" | **37 agent files** across 8 folders | ❌ wrong, and by a lot |
| "spatial computing" department | **does not exist** — no file anywhere matches | ❌ invented |
| "open-sourced" | **license: none** (no LICENSE file) | ⚠️ technically all-rights-reserved |
| "got 10,000 stars in a single week" | created **2025-07-28**, last push **2025-07-28** | ⚠️ **that week was TWELVE MONTHS AGO** |

Real folders: engineering 7 · design 5 · marketing 7 · product 3 · project-management 3 ·
studio-operations 5 · testing 5 · bonus 2.

### ⛔ TWO INDEPENDENT BLOCKERS
1. **[[premise-staleness-rerun-test]] (kill-rule 10) fires.** The repo's moment was July-August **2025**.
   It has not received a single push since the day it was created, over a year ago. "Someone JUST
   open-sourced" and "in a single week" are both false as of today.
2. **Four of eight checkable claims are wrong**, and the house GitHub format puts REAL screenshots on
   screen. A card showing "37 agents" under a VO saying "over 50" reads as a lie the viewer catches; a card
   omitting the count to hide the gap is the tell that the number was made up. ⛔ SERENA only worked because
   every claim survived first.

### Options (Alex's call — the VO is locked audio, so I cannot fix this in the edit)
- **A. KILL** on the rerun test. Cleanest; the catalogue already has VAULT as the anti-example of shipping a
  premise that failed its own gate.
- **B. RE-RECORD the two number lines** ("design has seven, marketing has eight" → "design has five,
  marketing has seven"; "over 50 agents" → "nearly 40 agents"), drop "spatial computing", and soften "just
  open-sourced". Cheap — it is two sentences — and then every on-screen card can be real.
- **C. SHIP AS IS** with on-screen cards restricted to the true claims only (12,396 stars, engineering 7,
  the real department list) and no total. ⚠️ The VO still states three false numbers aloud.

### ⭐ DECISION (Alex, 2026-08-03): **OPTION C — SHIP AS IS.**
Concern was raised with the evidence above and he reaffirmed. Proceeding on his call.

⛔ **THE BINDING CONSTRAINT THAT FALLS OUT OF IT — on-screen copy carries ONLY verified claims.**
| allowed on screen | banned from screen |
|---|---|
| **12,396 ★** (real, live) | any TOTAL agent count (VO says 50+, real is 37) |
| **ENGINEERING · 7 AGENTS** (real) | design count · marketing count |
| the 8 real folder names | "spatial computing" — does not exist |
| the real repo card / URL | "MIT"/"open source" badge — there is NO licence |
| | any "this week" / "just released" framing |

The VO still says three wrong numbers aloud; that is the accepted cost of the decision. What the build
controls is that **nothing rendered on screen is false**, so no frame can be screenshotted against him.

## ⛔⛔ THE CORRECTION THAT MATTERS MOST — I WAS BUILDING THE WRONG FORMAT
Alex: *"did you even follow the github video editing workflow? for the face videos?"* … *"yes im not
building the faceless videos"*.

**I had been building full-bleed animated scenes with no face in them.** Reels 82/83/84 are FACE reels: his
facecam sits in a card (`CARD {x:68, w:945, y:1180, r:38}`) with the animation band ABOVE it. A face reel
needs **12 assets**; I had produced ONE (`clean.mp4`) for reel 85 and none for 86, and I had skipped the
storyboard gate entirely. Every hook option I showed him was unusable by construction.

## FACE-REEL PIPELINE — run properly for reel 86 (2026-08-03)
| asset | state |
|---|---|
| `clean.mp4` | ✅ 1080x1920, 41.33s, 17 spans conformed from `IMG_3414.MOV` via the VO's own EDL |
| `vo.wav` | ✅ 41.0s, marker-clean |
| `landmarks.json` | ✅ 1240 frames, **0% no-detection** |
| `words_raw/clean.json` | ✅ 135 words, proper nouns repaired |
| `matte.mov` | ⏳ ProRes 4444 alpha, in progress |
| `shots/takes/cues.json`, `bed_pocket.wav` | ⏳ pending |

### ⛔ CONCURRENCY DESTROYED THE FOOTAGE TWICE — never background a job that reads an asset you are rewriting
`clean.mp4` silently became a **2160x3840 / 51.6s** file (the wrong shoot's dimensions and length) because
`make_matte.py`'s ffmpeg child was live on it while I re-conformed. It then had `landmarks.json` extracted
FROM that corrupted file — 1547 frames of the wrong footage — and every constant derived from it was wrong.
**Printing the size right after writing is not a check**; the clobber lands a moment later. Now: write, probe
in the same breath, probe again 3s later.

### ⛔⛔ `tools/solve_crop.py` IS BROKEN AND ITS OUTPUT WAS NEARLY USED
Fed reel 84's OWN footage it returns `CROP width 420` against the **1276** that reel shipped, and prints
"coverage GAP" on a reel that shipped clean. Two independent faults: (1) the stored house target said
**shoulders 310px**, measured off reel 79 — but Alex's "make my face bigger" change moved the shipped
constants to **451px (83) / 472px (84)** and the tool was never updated; (2) it derives through reel 78 as a
reference whose footage is a different resolution, so the ratio is wrong even after the target is fixed.
Marked broken in-file with the four-line direct method inline.

**⭐ The rule that falls out of it: a derivation tool that cannot reproduce the SHIPPED catalogue is wrong
about the house, not the other way round.** Validate any such tool by re-deriving a shipped reel first.

### ✅ REEL 86 CONSTANTS — derived directly, verified against reel 84's shipped look
```
const CROP = {width: 1346, left: -175, top: -920};   // -> nose (494, 88)  shoulders 472px
const FULL = {width: 2310, left: -567, top: -909};   // -> nose (582,820)  shoulders 810px
```
He sits **1.054x smaller** in this shoot than in reel 84, so this shoot needs a genuinely tighter crop —
exactly the per-shoot difference law 92 exists for. Cached at `public/footage86/crop.json`.

## ⛔⛔⛔ THE REAL CORRECTION — I WAS IN THE WRONG SYSTEM ENTIRELY
Alex: *"this is for chenbuildsai not reel 84 or reel 79 like we are building the video for chenbuildsai
which is a completely different editing system."*

**`~/Downloads/brand-system` IS `chenbuildsai-editing-system`, and it has its OWN documented pipeline that I
never opened.** I was treating it as the claude-reels-workflow chassis — cloning reel 84's scene file,
solving crops against reel 79's stored target, inventing furnace/hourglass hooks freehand. All of it was the
wrong method, not merely wrong output.

⭐ **What chenbuildsai actually is** — `docs/START-HERE.md` → `docs/RECIPE-NEW-REEL.md`, 89 laws in
`docs/LAWS.md`, values in `PRODUCTION.md`, 45 techniques in `packs/REFERENCE-TECHNIQUES.md`. It is
**register-driven with a plan linter**, and its README says *"Never skip step 1."*

```
0 assets → 1 SEGMENT the VO → 2 WRITE THE PLAN (must lint 0 findings)
→ 3 DESIGN (escalation procedure) → 4 BUILD → 5 LINT → 6 RENDER + VERIFY
```

`src/system/grammar.ts` picks each shot's form from its CLAIM, never for variety:
FACE (stakes/direct address) · BOARD (one piece of evidence) · OBJECT (abstract mechanics) ·
SCREEN (**proof — a tool actually running**) · PHOTO (human stakes) · TYPE (one number, max one per reel).
Enforced: shot 1.2-3.4s · maxRunSameRegister 2 · maxShotsWithoutFace 4 · maxRunSameMove 1 ·
minGroundFlipRate 0.3 · **minScreenShots 1** ("a reel with no SCREEN shot asserts but never proves").

⛔ **The recipe's own warning, which explains every "too basic" note in the catalogue:**
*"If a reel comes back 'too basic', the cost was skipping step 3. It is the cheapest step and the only one
that changes the ceiling."* Step 3 is 30-60 min; build is 2-4h. I had been going straight to build.

## ⛔⛔ TOOLS TAKE `$F`, NOT ARGV — this silently put VIDEO 2's AUDIO IN VIDEO 4's SLOT
`clean_words.py` opens with `F = os.environ.get('F', 'public/footage78')`. Passing paths as arguments is
**ignored**. Running the chain without exporting F left `public/footage86/vo.wav` byte-identical to
ARMY (md5 `440cf1c37ae9`, 51.34s) instead of AGENTS (`6b56cba087a2`, 41.03s) — and I only caught it because
the segmented transcript said *"his name is Affaan… comment the word army"*. This is the seventh instance of
the hardcoded-path family ([[reel-tools-hardcoded-to-old-reel]]); `tools/reelpath.py` exists for exactly this
and these tools predate it. **Always `export F=public/footage<N>`, then verify the artefact's md5/duration
against the source before trusting any downstream step.**

## ✅ STEPS 0-2 DONE PROPERLY (2026-08-03)
| step | state |
|---|---|
| 0 assets | clean.mp4 ✅ · vo.wav ✅ (md5-verified AGENTS) · landmarks ✅ 1240fr 0% miss · words_clean ✅ 136w · matte ⏳ |
| 1 segment | 13 spoken segments; 5 over the 3.4s ceiling split at their clause break, the 0.30s "Engineers," fragment merged forward |
| 2 plan | `plans/agents.ts` → **plan valid — 0 findings** · 16 shots · FACE 5 · OBJECT 5 · BOARD 3 · SCREEN 2 · TYPE 1 |

⭐ **The fact-check drove the registers, not variety.** Every beat stating a FALSE number (design 7,
marketing 8, "over 50 agents", spatial computing) is **FACE** — he says it, nothing on screen corroborates
it. The three beats whose numbers are TRUE (12,396 stars · engineering = 7 · the real folder names) get
SCREEN/BOARD, where evidence belongs. Shot 10 shows only `product/` and `testing/` and never draws the
invented third department. **No frame can be screenshotted against him.**

## ✅ STEP 3 — CONCEPT ESCALATION (`plans/agents-design.md`)
Ran the `WORKFLOW.md` ladder on all 11 non-FACE shots: level-1 written down and crossed out, then quantity →
viewpoint → **what the elements ADD UP TO**, then the four motion layers, then the law-20 camera gate.
Budget respected — the recipe allows 2 level-3 per 9 shots, so **3 of 11**, on thesis / mechanism / payoff.

**The ladder's test is a NOUN CHANGE** — can you name what you are looking at differently at the end than at
the start? All three pass:

| shot | claim | the level-3 move | noun change |
|---|---|---|---|
| 1 (thesis) | "spins up an entire AI company" | a 40-block skyscraper assembles; the last 6 frames widen and it is sitting **inside an open folder on a desk** | company → a folder's contents |
| 12 (mechanism) | "structures it across an actual org chart" | the chart's connectors **straighten into `├── └──` and the role boxes become folder names** | org chart → a file tree |
| 14 (payoff) | "the output of a 50 person startup" | fifty lit desks from above; the pull resolves them into **one person at one desk** | fifty desks → one person |

⭐ **Shot 12 is the best idea in the reel because the joke IS the fact** — this "company" really is a
directory listing. It also pays shot 1's folder reveal off without repeating it.

⛔ **Shots 7 and 9 are deliberately LEVEL 1.** They are the two most checkable frames in the reel (the seven
real engineering filenames; the two real folder tabs). *Legibility beats cleverness where a viewer can
count.* Cleverness there earns nothing and loses everything if it is wrong.

⛔ Law 20 gates recorded per shot: shot 1's folder rim must not exist at the close framing, and shot 14's
silhouette must be unreadable before the pull — check both on the contact sheet or the reveal is spoiled.

Energy peaks at shot 1, second peak at 12, resolves at 14, then FACE for the CTA — **decelerating after the
thesis**, as the recipe requires.

## ✅ ASSETS COMPLETE + VERIFIED
`clean.mp4` 1080x1920/41.33s · `matte.mov` **prores yuva444p12le** (alpha survived — VP9 would have dropped
it silently) · `landmarks.json` 1240fr 0% miss · `words_clean.json` 136w md5-verified AGENTS · `vo.wav` 41.03s.

## STATUS: steps 0-3 done, plan lints 0 findings, design locked. Next = step 4 BUILD (recipe budgets 2-4h),
then lint / render / verify.
