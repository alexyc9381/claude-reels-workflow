# AGENCY — factory log (**FACE reel 12**)
> ⛔⛔ THIS IS A **FACE** REEL — Alex's facecam is in it. Face and Faceless
> number SEPARATELY ([[video-assets-to-personal-gdrive]]). Delivery goes to
> `gdst:"Claude Reels/Face/*Videos/12 - AGENCY/"` — files `12 - AGENCY.mp4`,
> `caption.txt`, `AGENCY - <Title>.docx`. ⛔ NOT Faceless: 91 is already a
> different, live faceless reel there.
>
> ⛔ Opened STAGE 0 per [[factory-log-first]]. Source: `IMG_3528.MOV` (238.0s raw).
> Keyword **AGENCY**. Pre-locked VO.

## STAGE 0.5 — ⭐ FACT-CHECK PASSED, live GitHub API 2026-08-07
**Repo: `msitarzewski/agency-agents`** · **139,056 stars** · 22,719 forks · 4.1 MB ·
MIT · created 2025-10-13, last push 2026-08-06.

| VO claim | verdict | evidence |
|---|---|---|
| "an entire AI agency, open sourced" | ✅ | MIT licensed, public |
| "called The Agency" | ⚠️ close — the repo is **agency-agents** | say the name as it appears or people will not find it |
| **"124,000 stars"** | ⛔ **UNDERSTATED** | real count **139,056** and climbing |
| "front-end designers, ad writers, Reddit community wizards" | ✅ | repo's own description: *"From frontend wizards to Reddit community ninjas"* |
| "each with its own personality and process" | ✅ | description: *"a specialized expert with personality, processes, and proven deliverables"* |
| "plugs straight into Claude Code" | ⚠️ verify in the README before the card |
| "desktop app, installs your dream team in one click" | ⛔ **UNVERIFIED** — the load-bearing wow. Confirm it exists |
| "for free" | ✅ | MIT |

⭐ **The number is BETTER than the script.** Show **139,056**, not 124,000.
⛔ Re-pull before ship — this one moves fast (+15k since the script was written).

## STAGE 0.5b — ⭐⭐ BLOCKER CLEARED, live API + README 2026-08-07 15:25

| open item | verdict | evidence |
|---|---|---|
| **"desktop app … one click"** | ✅ **REAL** | README: *"a native app for macOS, Linux & Windows that browses the entire roster and installs it into Claude Code, Cursor, Codex, Gemini, Osaurus, and more — with a click."* Repo `msitarzewski/agency-agents-app` (339★), site `agencyagents.app`, `brew install --cask msitarzewski/agency-agents/agency-agents` |
| **"plugs straight into Claude Code"** | ✅ | README Option 2 is literally *"Use with Claude Code"* — `./scripts/install.sh --tool claude-code`, or `cp engineering/*.md ~/.claude/agents/` |
| **"called The Agency"** | ✅ **upgraded from ⚠️** | the README's own H1 is `# 🎭 The Agency`. The *slug* is `agency-agents`; the *project* is The Agency. Say "The Agency", show the slug on the repo card |
| star count | ✅ **139,093** (re-pulled 15:25) | still climbing — +37 in the ~20 min since the log's 139,056 |

⭐ **NEW VERIFIED NUMBERS for the screen** (from the git tree, not the README's prose):
**286 agents** across **18 divisions** — engineering 58 · specialized 57 · marketing 36 ·
game-dev 21 · strategy 16 · gis 13 · security 12 · design 10 · sales 9 · testing 9 ·
paid-media 7 · project-mgmt 7 · academic 6 · spatial-computing 6 · support 6 ·
finance 5 · product 5 · healthcare 3.

## ⭐ THE 124,000 vs 139,093 CONFLICT — RESOLVED BY ONE WORD
The VO says **"over 124,000 stars"**. `over` makes the live 139,093 *literally true*,
so the graphic may show the live number without contradicting the voice. ⛔ But the
CAPTION is word-synced to the VO and therefore still reads "124,000" — that is
correct and must not be "fixed". Proposed use: the counter **rolls past 124,000 and
keeps going to the live number**, which turns the discrepancy into the point.

## STATUS: ⭐ ALL CLAIMS VERIFIED. Nothing blocking the build.

## STAGE 1 — VO CUT ✅ (2026-08-07)

| | |
|---|---|
| voiceover | `brand-system/out/vo6/video2-AGENCY-VO.wav` — **24.4s** |
| EDL (source time) | `brand-system/out/vo6/video2-AGENCY.edl.json` — 9 spans |
| conformed facecam | `brand-system/out/vo6/deliver/VIDEO-2-AGENCY.mp4` |
| ⭐ **VO to mount** | `brand-system/out/vo6/deliver/VIDEO-2-AGENCY.wav` — **frame-aligned to the picture** |
| raw | `~/Downloads/IMG_3528.MOV` · 48k audio `brand-system/out/vo6/src/hi_3528.wav` |
| transcript | `brand-system/out/vo6/src/tx/IMG_3528.json` — energy-gated, do NOT regenerate casually |
| batch | **6** — every tool takes `--batch=6` or `VO_BATCH=6` |

⛔ **USE THE `deliver/` WAV, NOT `FINAL/`.** They are the same edit, but the
`FINAL/` one is cut on EDL times while the picture is quantised to whole source
frames — measured up to 2.5 frames of accumulating offset. `deliver/` is cut on
the frames themselves and matches the mp4 exactly.

Marker gate: **0 "cut cut" survive**. Every script sentence is covered by a take
except where noted below.

✅ clean.
⚠️ THE CTA IS NOT THE SCRIPT. Script says "I'll send you the repo"; the
last take he actually gave is "...I'll send you the full setup guide". Recording
wins ([[recording-beats-script]]) — build the card to match the VOICE, not the doc.

## STAGE 1.5 — ⭐ TRUE TRANSCRIPT LOCKED (2026-08-07)
Transcribed the **delivered** WAV (`deliver/VIDEO-2-AGENCY.wav`, 24.333s) — full
pass for word onsets, then **isolated windows** for every proper noun, per
[[transcript-is-not-ground-truth]]. ⭐ **The full-file pass was wrong on three of
the six lines and the isolated windows fixed all three** — the rule paid out again.

| full-file whisper heard | truth | how resolved |
|---|---|---|
| "friend and designers" | **"front-end designers"** | isolated 9.9-11.6s; `small` AND `medium` agree |
| "It clicks straight in a clock code" | **"It plugs straight into Claude Code"** | every model heard the `pl-` cluster; `medium` + a domain `initial_prompt` converges. Matches the script |
| "the full set of guide" | **"the full setup guide"** | `medium` isolated 22.9-24.2s + `src/takes/3528.json` agree. ⭐ this settles the log's open question above |

**THE LOCKED SCRIPT — 90 words, last word ends 24.00s:**
1. `0.00` Someone just built an entire AI agency and open sourced it.
2. `3.46` It is called The Agency, with over 124,000 stars on GitHub.
3. `7.26` So this has a full roster of specialist agents,
4. `10.38` front-end designers, ad writers, Reddit community wizards,
5. `13.04` each with its own personality and process.
6. `15.18` It plugs straight into Claude Code,
7. `16.28` and there's even a desktop app that lets you install your dream team in one click.
8. `19.96` You just became an AI agency owner for free.
9. `22.06` Comment AGENCY and I'll send you the full setup guide.

## STAGE 1.6 — MEDIA + GEOMETRY VERIFIED
| check | result |
|---|---|
| VO | 24.333s |
| picture | **730 counted frames** @30 = 24.333s — frame-exact, ONE clock ([[facecam-conform-count-frames]]) |
| mp4 audio | none (VO mounts separately) — correct |
| matte | `pub6/footage2/matte.mov` · prores `yuva444p12le` · **730 frames** |
| matte alpha | ⭐ **REAL CUTOUT** — 25.4% opaque / 72.0% transparent / 2.6% soft edge. Crown at source y=591 |
| landmarks | 730/730 frames, **0% no-detection** |

### ⛔⛔ THE BOOTSTRAP COMMAND IN THIS LOG WAS WRONG — `.webm` IS DEAD
`make_matte.py` hardcodes **ProRes 4444**, which is not a legal codec in a WebM
container, so ffmpeg exits before the first frame and the script dies on
`BrokenPipeError` leaving a **262-byte** file. The `.webm` in the command predates
the tool's own VP9→ProRes fix (its comment: *"Remotion's bundled libvpx silently
drops the alpha plane … you get a valid webm that is fully opaque"*).
⛔ **Output must be `matte.mov`.** Same stale line is in the COURSE/APPLE/SEO/LOCAL
logs — fix there before those builds. ([[reel-tools-hardcoded-to-old-reel]])

### ⭐ CROP / FULL — SOLVED FOR THIS SHOOT (law 92, never cloned)
Median over all 730 frames: nose **(498.7, 816.6)**, shoulders **357.9px**.
Solved onto the house targets (CARD nose (487,97)/452px · FULL nose (582,820)/813px),
both round-trip **exactly**:
```ts
export const CROP = {width: 1364, left: -143, top: -934};   // card
export const FULL = {width: 2453, left: -551, top: -1035};  // full-bleed
```
⛔ CODE's are `1270/-159/-861` and `2284/-579/-904` — cloning them would have made
him **7% too small and 70px misplaced**. The law is not theoretical.

## ⛔⛔⭐ STAGE 2 WAS BUILT THE WRONG WAY ONCE — READ THIS BEFORE REELS 13/14/15
> Alex, 2026-08-07: *"BRO THIS IS THE CHENBUILDSAI VIDEO EDITING WORKFLOW NOT THE
> FACELESS ONE.... the one on github bro"*

He was right and it was structural, not taste. **`~/Downloads/brand-system` IS the
chenbuildsai editing system** (`origin = github.com/alexyc9381/chenbuildsai-editing-system`),
so I was in the correct repo — but I boarded it against
`claude-reels-workflow/storyboards/STORYBOARD-SPEC.md`, which is the **FACELESS**
repo's contract. This repo has its own recipe and its own gate, and I ran neither.

**Two defects followed, and only the gate could see them:**
1. ⛔ **I hand-wrote a 9-shot table with invented kinds** (`GRAPHIC`, `ARTIFACT`) —
   those are not registers. The real vocabulary is `FACE · BOARD · OBJECT · SCREEN ·
   PHOTO · TYPE` in `src/system/grammar.ts`, and **the claim picks the register**.
2. ⛔ **FOUR of those nine shots were outside `REGISTER_RULES.shotRange` (1.2–3.4s)**
   — 3.47s, 3.80s, 3.70s and a 1.10s. A hand-typed table cannot catch this because
   it is the only record. `npx tsx plans/agency.ts` catches it in under a second.
3. ⛔ **Every beat was OBJECT** (an invented office-tower metaphor) for claims that
   are **PROOF**. Reel 89's plan already names this exact error: *"a museum plinth
   is a metaphor a viewer has to decode; a real repo page is recognised."*

⭐ **THE FIX PAYS DOUBLE ON THIS REEL**, because AGENCY is unusually rich in real,
verified, showable proof: the live repo page at 139,093★, the 18 real division
folders, a real agent `.md` with literal `Personality` / `Process` headings, and the
real desktop app. All of that is SCREEN/BOARD material that a drawn metaphor was
throwing away.

⛔ **THE ORDER IS `docs/RECIPE-NEW-REEL.md`, NOT the faceless spec:**
`0 assets → 1 segment VO → 2 WRITE + LINT THE PLAN → 3 escalate each shot →
4 build → 5 lint → 6 render+verify`. Step 2 is the one I skipped and step 3 is
"where the quality is decided".

## STAGE 2 — DERIVED ASSETS BUILT ✅ (2026-08-07) — build is unblocked

| artifact | path | state |
|---|---|---|
| clean picture | `pub6/footage2/clean.mp4` | 730 frames |
| matte | `pub6/footage2/matte.mov` | 730 frames, real alpha (verified) |
| landmarks | `pub6/footage2/landmarks.json` | 730/730, 0% miss |
| captions | `pub6/footage2/words_clean.json` | **86 words**, monotonic, 0 overlaps |
| ⭐ **the plan** | `plans/agency.ts` | **`plan valid — 0 findings`** |
| shot table | `out/agency_shots.json` | **11 shots, tile 730 exactly**, all in range |
| tools written | `tools/agency_words.py` · `tools/agency_shots.py` | both gate themselves |

⛔ Both tools are DERIVED and self-asserting — `agency_shots.py` fails on a gap,
an overlap, a non-positive shot or a frame-0 hole; `agency_words.py` fails if any
whisper artefact survives or a correction goes missing. Do not hand-edit either output.

**THE SHOT TABLE — registers from the gated plan, never invented**
```
 s1  OBJECT    0  64f 2.13s  someone just built     HOOK · ⭐ level 3
 s2  OBJECT   64  40f 1.33s  and open sourced       the giveaway
 s3  BOARD   104  41f 1.37s  it is called           the real repo beside him
 s4  TYPE    145  73f 2.43s  124,000 stars          ⭐ THE number, rolls to 139,093
 s5  OBJECT  218  93f 3.10s  so this has            286 agents, 18 divisions
 s6  SCREEN  311  80f 2.67s  front-end designers    the three named = REAL FILES
 s7  BOARD   391  64f 2.13s  each with its          real agent .md, its own headings
 s8  SCREEN  455  66f 2.20s  it plugs straight      install.sh --tool claude-code
 s9  OBJECT  521  78f 2.60s  that lets you          PAYOFF · ⭐ level 3
 s10 FACE    599  63f 2.10s  you just became        full-bleed
 s11 BOARD   662  68f 2.27s  comment agency         CTA · "full SETUP GUIDE"
```
`OBJECT×4 BOARD×3 SCREEN×2 TYPE×1 FACE×1` · **cut rate 1 per 2.21s** ·
runtime 24.33s = the VO exactly. Level-3 budget spent on s1 and s9 (2 of 11), and
s9 pays back s1's org-chart shape — the callback.

### ⛔ THE CHASSIS TO CLONE — and the trap inside it
Clone `src/scenes/Code.tsx` + `src/scenes/CodeS1.tsx` (newest FACE reel, best
documented). Gate with `python3 tools/chassis_diff.py src/scenes/Agency.tsx --ref src/scenes/CodeS1.tsx`.
⛔⛔ **TWO SYSTEMS EXIST AND THE DOCUMENTED ONE IS NOT THE SHIPPED ONE.**
`src/layout/` (Paper·Header·FaceFrame·zones.ts) is what the markdown describes;
**`src/patterns/` (Plate·Headline·Grain·Matte) is what every shipped reel imports.**
Build on `patterns/`. ⛔ And the card does NOT contain his footage — it contains a
studio **Plate** with the alpha cutout over it; `clean.mp4` is never drawn.

## STAGE 3 — SHOT DESIGN: ⏸ NEXT, and it is where the quality is decided
`plans/agency.ts` records the escalation per shot in `object` / `reveals`. Two
metaphor worlds were offered to Alex and are **WITHDRAWN** as the OBJECT-register
error above — TOWER / CREW ASSEMBLE / EMPTY FLOOR FILLS were all "decode this
metaphor" when the repo itself is recognised on sight.

Level-1 versions written down and crossed out (RECIPE step 3):
- **s1 hook** — ~~office tower lighting up floor by floor~~ (L1) · ~~a wall of 286
  badges~~ (L2) → **L3: hundreds of specialists converge and lock into ONE org
  chart.** crowd → org, passes the different-noun test.
- **s9 payoff** — ~~a cursor clicks Install~~ (L1) → **L3: the click fires and the
  hook's org chart returns with every seat filled, inside the viewer's editor.**

⛔ Still to do before any build: the 7 non-face bodies each need the 4 motion
layers counted (constant · event · satellites · backdrop) — under three reads as
basic no matter how good the drawing is.

## STAGE 3a — s1 HOOK VARIANTS BUILT ✅ (2026-08-07) — awaiting Alex's pick
`src/scenes/AgencyS1.tsx` (chassis) + `src/scenes/hooksAgency.tsx` (3 bodies).
Comps `AgA` / `AgB` / `AgC`, 64 frames each = s1's real length.
⭐ **Chassis gate: `Progress 99.6% · CardFigure 100% · FullFigure 100%` — chrome
matches.** Cloned from `CodeS1.tsx`; only MATTE/CARD/CROP/FULL/LANDMARKS/DURATION
differ, which is what a new reel is supposed to change.

| | paradigm | frame-0 ink | reads as |
|---|---|---|---|
| **A THE ORG** | CONVERGENCE many→one | 23.6% | ⭐ **strongest.** 33 specialists stream in and LOCK into one org chart crowned by the Claude mark. crowd → org, passes the different-noun test |
| **B THE ROSTER** | DISTRIBUTION deck→slots | 23.6% | clean and legible; cards cascade into the 18 real division slots, filling L→R |
| **C THE FLOOR** | SCALE REVEAL one→286 | 62.3% | ⛔ **BROKEN AS BUILT** — see below |

### ⛔⛔ C IS THE PROOF THAT A GREEN INK GATE IS NOT A LEGIBLE FRAME
C scored **62.3% frame-0 ink — the HIGHEST of the three, above MCP's 53.9%** — and
is the only unusable one. Its 22×13 desk grid (=286, the real count) is drawn in
UNCLIPPED frame coordinates, so it (a) overruns the animation band, (b) **paints
over the header**, leaving "286 SPECIALISTS" as the fragments `S…C…S`, and (c)
reads as grey blobs at that scale. ⭐ Law 130 measures *ink*, not *meaning* —
exactly [[aesthetic-notes-are-measurable]] / [[lint-shots-covers-16-of-89-laws]].
Fixable (clip to TOP..BOT, raise contrast) but it is the weakest concept anyway.

### ⛔⛔⭐ HE BLINKS ON FRAME 0 — FOUND ONLY BY LOOKING, NOT BY MEASURING
A 16-frame contact sheet of the conformed facecam shows **f0, f1, f2 are a blink,
open from f3**. All three drafts rendered with his eyes shut on the one frame every
viewer sees. ⛔ **Law 130 cannot catch this: it measures rows 420-1300 to judge the
ANIMATION band, and the defect is in the FIGURE.** Same class as law 119, one layer
down.
⭐ Fixed with the chassis's existing `holdBefore` (reel 89 / `tools/face_hold.py`):
`FigureHold trim={0} holdBefore={3}` freezes the first open-eyed frame over f0-f2.
100ms, imperceptible. Re-rendered and confirmed open.
⛔ **CHECK THIS ON REELS 11/13/14/15 — same shoot, same batch, same risk.**

## STAGE 3b — HOOK ROUNDS 2-4 (2026-08-07). Still not landed; here is what is known.
> Alex: *"not hierarchical enough… so many little cards, so many little things"*
> then *"still too boring and try to integrate real logos / our signature 2d claude sprite"*

⛔⛔ **`chaos_audit.py` IS THE WRONG GATE HERE AND COST TWO ROUNDS** — its 25% bar
fails `hook_A_final` (APPROVED, 11.8%), CODE_v18, MCP-V26 and KEY-V2. On a FACE reel
the card is ~38% of frame and moves constantly, so half a 6×6 grid is facecam.
⭐ Wrote **`tools/hero_share.py`** instead — largest connected blob / band ink, plus
blob count, calibrated on the approved hook. Full write-up: [[hierarchy-gate-is-hero-share]].

| | hero | blobs | |
|---|---|---|---|
| ⭐ `hook_A_final` APPROVED | **97.1%** | **2** | 3 big tiles, tight row, REAL marks |
| round 1 (rejected) | 17/77/8% | 23/19/18 | the "little things" note, measured |
| round 3 claw | 90.2% | 3 | |
| round 4 G belt | 74.9% | 2 | sprite + real GitHub mark |
| round 4 H stack | 90.0% | 2 | sprite + real GitHub mark |

⛔ **ASSET ALPHA IS NOT UNIFORM — measured:** `claude.png` is 66% transparent (a real
glyph, may stand alone); **`github.png` / `cursor.png` / `openai.png` are 0%
transparent SOLID TILES** and must sit inside a plate or they punch a black hole.

⛔⛔ **THE BAND CANNOT HOLD A TALL STACK — arithmetic, not taste.** Band is 470..900
(**430px**). A house-size sprite (206-228px, [[reel-sprite-grounding-law]]) puts his
hands near y700, leaving **~230px of headroom = 3 tiles**. Six tiles need a 63° lean
before they clear the type. The vertical build punched through the header (law 25,
printed `SPE…ALISTS`); the 50° leaned fix cleared it but rotated the glyphs sideways
and detached the column from the sprite.
⭐ **THE BAND IS WIDE AND SHORT, SO THE COMPOSITION MUST BE HORIZONTAL** — which is
exactly why the approved hook is three big tiles in a ROW. Build across, not up.

## STAGE 3c — ⭐ s1 = **THE PULL**, built by running the new procedure (2026-08-07)
`src/scenes/hooksAgency4.tsx`, comp `AgPull`. He hauls an unbroken chain of
specialists out of a GitHub plate; the slack deepens as more comes out.
**LEVEL 3 — the noun changes: `a card` → `a chain with no end`.** Round 1's
`avatars → an org chart` was the same noun rearranged, which is why it read flat.

⭐ **THE PROCESS IS NOW WRITTEN DOWN** — Alex asked for a replica of it:
`brand-system/docs/ANIMATION-IDEA-PROCEDURE.md`, indexed from `docs/START-HERE.md`
and cross-linked from `ANIMATION-BAR.md`. Memory: [[animation-idea-procedure]].
The three things that actually turned it around:
1. **Step 3 was the whole defect** — "what object represents an agency?" can only
   return a NOUN, which is why all three round-1 ideas were swarms of little cards.
2. **The AGENT axis gets skipped** — rounds 1-3 had no character at all.
3. **Calibrate every gate against something APPROVED** — two rounds were lost to
   `chaos_audit.py`, which fails the entire shipped catalogue.

⛔⛔ **AND STEP 9 PAID FOR ITSELF TWICE ON THIS ONE SHOT.** Draft 1 was flat across
the band: it read as a RIGID STRIP OF STICKERS, passed THROUGH HIS HEAD, and used
~100px of a 430px band. Draft 2 fixed the geometry with a diagonal but the run
continued off the left edge past him — so the picture was "a chain going by" and
the one thing the shot is about (HE is hauling it out) was the one thing it did not
show. **Both were visible in a single still, and neither would have been obvious in
the source.** Draft 3 terminates the run at his grip and escalates the SLACK.

| | hero | blobs |
|---|---|---|
| `hook_A_final` approved | 97.1% | 2 |
| **AgPull** | 73.7% | **2** |

⚠️ Hero share sits below the reference because an AGENT plus an OBJECT is
inherently two comparable masses — the approved hook has no character in it. Blob
count, which is the metric that tracked Alex's actual note, matches at 2.

## STAGE 3d — ⛔⛔⭐ "WAY TOO BORING" WAS MY OWN FIX, AND THE NUMBER PROVED IT
> Alex: *"way too boring… not enough motion not enough stuff going on… the
> rightside is touching the danger zone… maybe even the header is touching"*

**All three were true and all three measured.** Band motion (mean |frame delta|
over rows 470..900, which is what `dead_air.py` measures and why it measures the
BAND — a talking head makes whole-frame motion meaningless):

| | motion | moving area | deadest frame |
|---|---|---|---|
| `hook_A_final` APPROVED | 4.58 | 8.5% | 0.65 |
| round 1 — **rejected** | 3.64 | 6.6% | — |
| draft 3 "the pull" | **1.94** | 5.8% | — |
| ⭐ **draft 5** | **5.17** | **9.3%** | **3.37** |

⛔⛔ **DRAFT 3 HAD LESS MOTION THAN THE ROUND ALEX ALREADY REJECTED — and I caused
it.** Terminating the chain at his hands (the draft-3 "fix") deleted the TRAVEL:
links sat at fixed x and only the sag crept. ⭐ **A correct composition can be a
dead one, and the composition gate cannot see it.** hero_share was 73.7% and
"passing" the whole time.

⭐ FIX = FLOW + 4 MOTION LAYERS (the WORKFLOW.md bar; under three reads as basic):
constant = the chain flows · event = he hauls hand-over-hand, a yank every 15f ·
satellites = slot flexes + links wobble · backdrop = push + the belly dropping.
Plus a PILE at his feet — the consequence layer, which is what makes 2.1s feel
like it went somewhere.
⭐ **The modulo-wrap ban did not apply**: links are born behind the GitHub plate
and die behind the sprite, so both recycle points are OCCLUDED and the loop is
invisible. The ban is about a VISIBLE recycle point, not about wrapping.

### ⛔⛔ THE DANGER ZONES — and the camera push is what breaks them
Measured on the render, not assumed:
- **right edge ran to x=1079**, 47px past the 1032 safe line (`zones.ts` edge=48,
  action rail 960..1080). Source plate moved; now 1020 at max push.
- **header ink began at y261 — clearing the 250 top dead zone by ELEVEN pixels.**
  Legal, no margin. `y 0.128 → 0.145`, now **289 (+39)**. Chrome-gate safe.
- ⛔⛔ **`scale(1.05)` ABOUT x=540 PUSHES EVERYTHING OUTWARD**: a pile whose ink sat
  at x=64 rendered at **40**, inside the edge zone, from a legal source coordinate.
  Same failure as [[header-ceiling-at-max-zoom]]. **Place against MAX zoom:**
  `pre-push x ∈ [71.4, 1008.6]` for a 1.05 push. Verified on the **f63** still.

**FINAL s1 GATES — all three beat the approved reference:**
`motion 5.17 (bar 4.58) · moving-area 9.3% (8.5%) · hero 100.0%, 1 blob (97.1%, 2)`
`frame-0 ink 25.8% (bar 10) · zones ✓ at max push · chassis ✓`

## STAGE 3e — ⭐ THE ELEVATION PASS (2026-08-07). `src/scenes/agencyCostumes.tsx`
> Alex: *"each one of the specialists is a different designed Claude sprite with a
> different outfit… each time one of the boxes goes to the Claude, an external
> brain grows bigger… really animating each aspect."* Then: *"each of the cloth
> sprites need its OWN outfit — not the same color, different color… and the brain
> actually needs to look like a brain, it needs to be pink."*

**⛔⛔ "TOO CHOPPY" WAS A METRONOME, NOT A FRAME RATE.** Per-frame band delta:
```
mine      7 6 6 5 5 4 5 4 4 4 4 4 4 4 [10] 7 7 6 5 5 4 ... (identical, every 15f)
approved  2 2 2 2 3 6 16 20 23 20 14 11 14 13 13 9 13 14 6 2 ...  (one gesture)
```
An identical pulse forever reads mechanical **even though my jerk statistic was
LOWER than the reference (0.19 vs 0.28)** — the number said smooth, the eye said
choppy. ⭐ And the impulse jumped 0.004→1.0 in ONE frame; it now rises over 3.
Fixed with six NAMED hauls that accelerate (f1,17,31,43,52,59).

**⛔ ONE PALETTE FOR SIX SPECIALISTS IS A UNIFORM, NOT A ROSTER.** First pass
dressed all six in steel/navy/slate. Each division now owns a hue: engineering
**yellow** hard hat · design **purple** beret · marketing **green** cap · support
**teal** headset · security **steel-blue** visor · strategy **wine** tie.
⭐ This does not repeal "a garment must be cool" — it satisfies its REASON, which
is separation from the clay body `#D2795B`, not coldness as such.

**⛔⛔ A SMOOTH BLOB WITH LINES ON IT IS AN ONION.** The first brain was exactly
that and read as one. ⭐ **A brain is named from a BUMPY SILHOUETTE** — gyri on the
outline, not folds drawn inside a smooth shape. Rebuilt as nine outward arcs
around an ellipse + cerebellum + stem, and **pink** (`#F0A8BC`) — the one non-house
hue this reel spends, on the one object that has to be nameable in a word. In
house orange it was just another clay object in a frame full of them.

**⛔ TWO SPRITES, TWO GRIDS — costumes are NOT portable.** `character/Mascot.tsx`
is a 200-grid DIV (SwapsCarousel's costumes); `patterns/props.tsx :: Claude` is SVG
on a **1024 viewBox** and is what reels use. Their eyes are in different relative
places, so scaling the existing costumes across misplaces every feature. These are
authored against `Claude`'s real geometry (body 220..800 / 265..710, eyes y378..496).

**⛔ `const N = 9` SHADOWED THE IMPORTED COLOUR RAMP** — every `N.ink` resolved on
the number 9. **tsc caught it; the bundle did not**, and the render would simply
have lost every outline. Always run `npx tsc --noEmit` before believing a render.

**⛔ AND THE FOOT PILE WAS DOING THE BRAIN'S JOB.** Removed: it tangled with his
legs, and once the brain grows per arrival a second accumulator states the same
thing twice (one indicator per element).

**GATES:** `motion 5.86 (bar 4.36) · deadest 2.53 (0.65) · hero 96.3%, 2 blobs
(97.1%, 2) · zones 58..1023 ✓ · header +39 ✓ · tsc ✓ · chassis ✓`

## STAGE 4 — ⭐ WHOLE REEL BUILT (2026-08-07). 11 shots, 730 frames, first cut.
`src/scenes/Agency.tsx` (the reel + per-shot chassis, cloned from `Code.tsx`) ·
`src/scenes/bodiesAgency.tsx` (s2-s11 bodies) · comp **`Agency`**.
First half-scale preview: **730 frames / 24.384s, 2m45s render** — matches the
ladder's ~3min for a reel at `--scale=0.5`.

⭐ **THE TWO SCREEN SHOTS CARRY REAL FETCHED CONTENT, not invented filenames** —
pulled live from the repo's git tree:
`engineering/engineering-frontend-developer.md` · `marketing/marketing-content-creator.md`
· `marketing/marketing-reddit-community-builder.md`, and **s7's headings are the
real ones inside that first file** — which is literally titled *"Frontend Developer
Agent **PERSONALITY**"* and contains *Your Core Mission* / *Critical Rules You Must
Follow* / *Your Technical Deliverables*. That IS the VO's "personality and
process", already written by the repo, so the shot SHOWS it. s8 uses the README's
real command `./scripts/install.sh --tool claude-code`.
⛔ The real headings carry emoji; stripped per [[reel-no-emoji-no-lowopacity]].

### ⛔⛔ `tsc` CAUGHT A SILENT CAPTION KILLER — run it before believing a render
`patterns/synced.tsx` declares **`Word = {w, s, e}`** and `agency_words.py` was
emitting **`{w, a, b}`**. The cast was refused. ⭐ Had I forced it with `as unknown
as Word[]`, every caption would have had `undefined` start/end times and **the
render would have completed without erroring**. Generator fixed at source; the keys
are now `s`/`e` and the note is in its docstring.
⛔ Second one the same day: `const N = 9` shadowed the imported colour ramp so every
`N.ink` resolved on a number — bundle fine, outlines gone. **`npx tsc --noEmit` is
not optional; the bundler does not typecheck.**

### FIRST-CUT AUDIT
`tools/dead_air.py`: ✅ **no run of 2+ dead seconds** — two isolated held beats
(16s, 24s), which the tool itself calls legitimate. Peak 6.62 at 17s.
⚠️ 24s is the CTA tail and 16s sits in s8's terminal — both worth a look.

### render economics
`pub6` holds four other reels' footage (**1.8 GB**); a dedicated `pub12/` with hard
links to only matte + plates + logos + `cube.mov` is **309 MB = 5.9× less copied
per render**. Bundle ONCE (`out/agbundle`) then `remotion still` from it — a bare
`still src/index.ts` re-bundles every call.
⛔ `companion.tsx:275` loads `staticFile('cube.mov')` — omitting it 404s the whole
render with no useful message. Validate every reachable `staticFile` before a long
render.

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
cd ~/Downloads/brand-system && mkdir -p pub6/footage2 && \
  cp out/vo6/deliver/VIDEO-2-AGENCY.mp4 pub6/footage2/clean.mp4 && \
  python3 tools/extract_landmarks.py pub6/footage2/clean.mp4 pub6/footage2/landmarks.json && \
  python3 tools/make_matte.py pub6/footage2/clean.mp4 pub6/footage2/matte.mov
```

⛔ `matte` IS the cutout, not a mask — never draw `clean.mp4` over it
([[matte-is-the-cutout-not-a-mask]]). ⛔ CROP/FULL constants are PER-SHOOT; do not
reuse reel 89's ([[cloned-crop-constants-per-shoot]]). ⛔ Prefix every asset with
the reel number ([[reel-asset-name-collisions]]).


## STAGE 5 — s2 CONTACT FIX (2026-08-08). Three poses, gated, awaiting Alex's pick.
`src/scenes/framesAgencyS2.tsx` → comps `AgS2plant` / `AgS2drive` / `AgS2tip`.

⛔ **THE HANDOFF UNDERSTATED THE STATE: `bodiesAgency.tsx` STILL RENDERS
`GiveawayBody` — "THE GATE", a lifting barrier.** That is the *rejected*
"a barrier opens" paradigm (dam/gate/hatch/fire-escape, 4 of the 17). The crate
existed only as a static `F1` frame, so the reel as built still plays a killed
concept at s2. Nothing was wired.

### ⛔⛔ THE CANDIDATE WAS BEING JUDGED ON A FRAME THAT WILL NEVER EXIST
`F1` previewed the crate through **`S1Chassis`** — `GROUND.deep`, header
`286 SPECIALISTS`. s2 actually ships on **`ink`** under **`MIT LICENSED`**.
⭐ Fixed structurally, not by copying two values: `Agency` now takes an `s2v`
prop and the candidates render as **the whole reel**, so ground, header, caption,
progress arc and facecam are the shipped ones *by construction*. A still pulled
at frame 75 IS s2. Same trap as [[measure-against-the-right-reference]], one
layer up: the wrong *reference frame*, not the wrong number.

### ⛔⛔ DRAFT 1 OF THE FIX WAS A REJECT, AND STEP 9 CAUGHT IT AGAIN
I applied Alex's three notes literally and produced a worse frame. All three
failures were visible in one still and none would have been obvious in the source:

| note applied | what it actually produced |
|---|---|
| "crate should go cooler" | `N.slate` + `N.steel` = **a featureless CONCRETE SLAB.** Neutral killed the crate's identity along with its warmth |
| "specialists should sit IN the rim" | cropped them through the middle → **three white domes with a small brown thing inside = SUSHI** |
| (unchanged) sprite at w=240 | beside a 420px object the mascot **reads as a DOG** — four legs, flush arms, side-on |

⭐ **THE FIX CAME FROM OPENING s1, NOT FROM ADJUSTING THE DRAFT.** Reel 12's own
approved shot answers all three: the sprite runs **~300px and dominates**, its
roster cards are **never cropped** (identical objects, and they read as badges
there), and GitHub is a **big LIGHT plate with the black mark**. ⛔ I had first
measured against `hook_A_final`, which is the approved *hook* — the right
reference was the adjacent shot, 1.8s away, whose sprite must be THE SAME SIZE
ACROSS THE CUT or it is a different character.

Crate rebuilt as light neutral + **slats + end battens** (says "crate", costs no
band height — a hinged lid would have broken y470), cards at s=104 with only a
~15px sliver occluded *below the face*, tilted apart so the row cannot read as a
tray. ⛔ Arms are the sprite's OWN (`props.tsx` viewBox x=918 → +118.9 at w=300);
he is placed so they land on the wall and the crate is drawn first. Drawing
longer arms to reach would put an off-model sprite on screen.

### GATES — measured with `hero_share.blobs`, approved s1 as the control
| | hero | blobs |
|---|---|---|
| s1 THE PULL — **approved control** | **88.1%** | **2** |
| A PLANT | 98.1% | 2 |
| B DRIVE | 98.1% | 2 |
| C TIP | 97.6% | 2 |

All three beat the approved shot on the same instrument at the same blob count.
⭐ Note the control sits *below* the doc's "≥90%" bar — the bar is a guide; the
approved render is the reference ([[aesthetic-notes-are-measurable]]).

### ⛔ `npx tsc --noEmit -p .` NOW ALWAYS EXITS NON-ZERO, AND IT IS NOT REEL 12
Two pre-existing errors, both another session's live work: `src/scenes/Pilot.tsx:110`
(`SyncedCaption from/to` — `patterns/synced.tsx` changed signature under it) and
`src/system/pack.ts:85`. Confirmed present at `HEAD`. **The handoff's "tsc is not
optional" gate is now useless as a binary** — filter it:
`npx tsc --noEmit -p . 2>&1 | grep -E 'framesAgencyS2|RootAgency|scenes/Agency\.tsx'`
Reel 12's three files are clean.

### ⏸ NEXT — unchanged priority, and s2 is still the unblocker
1. Alex picks a pose → port into `bodiesAgency.tsx` as the ANIMATED body
   (`GiveawayBody` is replaced, not edited) → 4 motion layers → then **SOUND**.
2. ⛔ Do not start the SFX pass before that: cue lists index to events.

## STAGE 6 — s2 SHIPPED AS `HandoverBody` (2026-08-08). Alex picked **DRIVE**.
`GiveawayBody` ("THE GATE") is **deleted**, not edited — it was a rejected
paradigm. `bodiesAgency.tsx :: HandoverBody`, `pose` defaults to `drive`;
`plant`/`tip` survive as the SAME animated body at a different lean, so a future
round compares like with like instead of a still against a shot.
⛔ `src/scenes/framesAgencyS2.tsx` removed — the crate living in two files is the
exact drift that caused this round.

**Four motion layers**: ① constant — the crate never stops travelling, no spring
anywhere (the settle trap killed 8 of 11 bodies on the first cut) · ② event —
three named shoves at f1/f15/f27 whose amplitude CLIMBS (11→16→21) and whose
impulse rises over 3 frames, because "too choppy" on s1 was a metronome, not a
frame rate · ③ satellites — the roster jostles, each card on its own phase,
kicked by each shove · ④ backdrop — the camera (`hold`, from the plan).

### ⛔⛔⭐ TWO DEFECTS THE GATES SCORED AS PERFECT
**Measured hero 99.6% · motion 4.28 · zero dead frames — and his feet were off
the ground.** Rotating a four-legged sprite breaks contact by construction: at
18° about the body centre the front legs punch 26px THROUGH the floor while the
back legs float 19px above it, and the shadow tilted with him.
[[measure-pose-not-motion]] is exactly this and it still got through, because a
frame-diff cannot see a *wrong pose held correctly*. **Only the filmstrip caught
it.**
⛔ **AND THE OBVIOUS FIX WAS ALSO WRONG.** `skewX` does plant the feet (it fixes
every point at y=0) — but at 18° it shears this blocky sprite into a **slanted
SLAB** and it stops reading as the mascot at all. Ground contact bought with the
character is not a fix.
⭐ **THE FIX: keep the rotate, lift by exactly what it cost.** His rightmost leg
is at x=+84.4 with the foot line at y=0, so a lean of θ drives that corner
`84.4·sin θ` below the floor; lift by that and the braced front foot lands ON the
line while the back legs come up — which is what a shove looks like anyway.
The shadow is drawn OUTSIDE the lean: it lies on the ground plane.

### ⛔⛔ `XL`/`XR` ARE STALE FOR EVERY BODY IN THIS FILE
The floor line drawn at `XL=78` renders at **x=12 at max zoom** — inside the 48px
edge. Cause: `XL/XR` encode the pre-push window for a **1.05** push, and the `CAM`
magnitudes were later "roughly doubled" to 1.10 hold / 1.19 push to fix the motion
floor. Nothing re-derived them. Same class as [[header-ceiling-at-max-zoom]], on
the other axis. ⭐ Added `safeSpan(move)` — exact, because `screen(x,t)` is linear
in `t` so the endpoints bound it. **⚠️ ONLY s2 IS RE-FITTED. Every other body still
draws to XL/XR — check each against its own render.**

### ⭐⭐ THE MOTION FLOOR IN THE HANDOFF IS NOT REPRODUCIBLE — SCALE CHANGES IT
Measuring the SAME shipped reel two ways:

| `CODE_v18` | mean | per-sec median | lowest second |
|---|---|---|---|
| @ half scale | 4.29 | 3.87 | **1.36** |
| @ full scale | 4.74 | 4.36 | 1.74 |

⛔ So "median 3.04 / floor 2.07" cannot be checked without knowing its scale, and
**a number off the wrong scale is as wrong as one off the wrong reel**
([[measure-against-the-right-reference]]). On ONE instrument at half scale:

`s1 7.67 · s2 5.74 · s3 4.60 · s4 7.38 · s5 4.29 · s6 1.66 · s7 1.70 · s8 2.13 ·
s9 4.39 · s10 4.22 · s11 2.04` — **reel median 4.29**, i.e. level with the
shipped reel's whole-reel mean and above its per-second median. The three low
shots (s6, s7, s11) are still **above CODE_v18's own lowest second (1.36)**, so
they are soft spots, not failures. The handoff's "s3 1.84 / s8 1.16" no longer
reproduce at all.

### s2 FINAL GATES
`hero 99.9%, 1 blob (control: approved s1 = 88.1%, 2) · motion 4.29, 0 dead
frames, min 1.98 · zones x48..1030 in 48..1032 at max zoom · tsc clean`

### ⭐ THERE IS NOW A PLAYABLE REEL, WHICH THERE WAS NOT
`out/AGENCY_v1.mp4` — 721f / 24.03s, half scale, 2m52s render. Video 24.03s +
AAC 24.09s, one clock. ⛔ The handoff called the reel "built end-to-end and
playable"; **nothing existed in `out/`** and s2 was still playing the killed GATE.

### ⏸ NEXT
1. **SOUND — still does not exist, and it is now UNBLOCKED.** s2 has stopped
   moving, so cue lists will hold.
2. s6 real logos + outfits · 3. s6/s7/s11 soft spots (camera, not more events).

## STAGE 7 — ⛔⛔⭐ THE "LOCKED" VO WAS NOT CLEAN. Alex, 2026-08-08.
> *"i still hear the 'cut cut' scene at 6 seconds and my face turned away."*

**Both true, and they are ONE defect: he resets the take and turns away doing it.**

### ⛔⛔ THE MARKER GATE WAS HONEST AND STILL WRONG — HE SAYS "OKAY.", NOT "CUT CUT"
Stage 1 logged *"0 'cut cut' survive"* and that was TRUE. The reset word here is
**"Okay."** and nothing was looking for it. A **full-file** whisper pass smoothed
it away entirely; **isolated windows** spell it out on the first try:

    VO 6.5-8.5  ->  "on GitHub. Okay. So this is"
    VO 7.0-8.5  ->  "Okay, so this is"

⭐ [[transcript-is-not-ground-truth]] paid out for the THIRD time on this reel.
⛔ **A marker gate that greps for one phrase is not a take-reset gate.** Score the
GAP, not the vocabulary: this one was a **0.86s hole at -73 dB in the middle of a
sentence**, which a de-gapped VO cannot contain ([[bed-wav-has-a-voice-in-it]]'s
"suspiciously long gap" tell). The energy profile found it before whisper did.

### ⛔⛔ AND THE PREVIOUS FIX MADE IT UNFINDABLE — A HOLD IS NOT A CUT
Stage 3a measured the turn correctly (one 7-sigma yaw excursion, source f217-235)
and then **froze the picture over it** with `holdAfter`/`holdBefore`. So the reel
shipped a frozen face on top of a silent hole with an "Okay." in it, and the log
recorded the turn as ✅ FIXED. **Freezing a defect removes the symptom you can see
and keeps the one you can hear.**

### ⭐ THE REPAIR — two instruments agreeing on one span
    AUDIO    speech <=6.90 | -69dB | "Okay." 7.30-7.56 | -78dB | 7.88 "So this has"
    PICTURE  the yaw excursion, source f217-235
Cut **source f217-235, 19 frames, 0.6333s**, from BOTH streams
([[edl-must-record-every-cut]] — a VO-only cut is how reel 86 went 10 frames out
of sync for 2/3 of its length). 48000/30 = **1600 samples per frame exactly**, so
the excision is frame-exact; 2ms fades either side of a butt-join, never an
overlapping crossfade (that would shorten the file and break the frame relation).
⭐ **No re-encode.** `matte.mov` keeps all 730 frames; the reel just never asks for
those 19 — the same trick `LEAD` already used. `srcAt()` in Agency.tsx.
Then re-derived, never hand-edited: captions (`agency_words.py` on the cut WAV,
86 words, all 6 corrections intact) and the shot table (702 frames).
**Reel 24.03s -> 23.40s.**

### ⭐⭐ SNAP THE SHOT BOUNDARY ONTO THE SPLICE — IT MAKES THE JUMP CUT INVISIBLE
Removing 19 frames mid-shot is a JUMP CUT: his hand and the walking Companion both
leap. v2 put the splice at f208 and the s4/s5 boundary at f213, so the jump sat
naked in the middle of s4. The 5-frame difference was only the breath before "So",
and **cutting a graphic a few frames before the line is ordinary editing, whereas
an unmasked jump in the face is not.** Snapped (`agency_shots.py`, backward only,
<=8 frames): ground flips ink->deep, header goes AND CLIMBING -> 18 DIVISIONS, and
the facecam jump is completely hidden inside the shot change. Verified on frames.

## STAGE 8 — s6 REAL MARKS + THE COSTUME BUG
> Alex: *"you dont have the reddit logo at 11 seconds."*

Correct, and it was deliberate — the code drew an "upvote burst" commented *"the
community read, no wordmark needed."* It IS needed
([[carousel-recognizable-over-accurate]]).

⛔⛔ **AND ALL THREE COSTUMES WERE WRONG.** The comments read `beret / cap /
headset`; `COSTUMES` order is `0 hardhat · 1 beret · 2 cap · 3 headset · 4 visor ·
5 tie`, so `ci:4` dressed the **DESIGNER in a security VISOR**, the ad writer in a
support headset and the Reddit specialist in a marketing cap. **A comment is not a
gate; the index is.** Now referenced by name.

⭐ **MARKS ARE DRAWN, NOT DOWNLOADED — and that is better here, not a compromise.**
Every logo PNG in this repo is a **0%-transparent padded tile**, which is why they
need plates and cannot sit on a sprite's shoulder. Flat vectors composite cleanly
at 90px in the house style. ⛔ First attempts failed for measurable reasons: Figma
at `u = r*0.42` rendered ~35x53px and read as **confetti**; Meta drawn as two
separate arcs read as **a wonky blue "M"** — the logo's identity is one unbroken
self-crossing loop, so it must be a single continuous path (lemniscate).
⛔ WIZARD is deliberately **NOT** in `COSTUMES`: that array's order is the cycle
s1's chain indexes with `ci % length`, so a 7th entry would silently re-deal every
costume in the APPROVED hook.
Trio also went 176 -> 202px at tighter spacing — BIG / FEW / TOUCHING.

### CURRENT MOTION (same instrument, half scale; CODE_v18 = 4.29 mean)
`s1 7.67 · s2 5.74 · s3 4.60 · s4 7.42 · s5 4.60 · s6 1.63 · s7 1.62 · s8 2.17 ·
s9 4.49 · s10 4.09 · s11 2.05`

### ⏸ OPEN
1. **s7 (now 12.03-14.27s) — Alex: "nowhere near good enough, needs to be redone."**
   Diagnosis: it is **objects in a VOID** (a dashed ring + 4 clipart glyphs on
   black) = the abstract-diagram auto-fail, plus 4 small icons = "many little
   things", plus springs that settle (1.62).
2. **SFX — still does not exist.** Now genuinely unblocked: the TIMELINE is final.
3. Documentation of the s2 idea process -> push to the repo.

## STAGE 9 — s7 = THE PRESS, REBUILT AS AN ACTUAL MECHANISM (2026-08-08)
> Alex: *"I like the press idea but the press doesnt work right now… it actually
> has to be a good working press, and the outfits need to be good too."*

He picked the concept off three ANIMATED options (he asked for animated, not
stills — *"i want to see each of those options at s7 animated… and just that
scene"*, which is the right ask: a static option cannot be compared with a moving
one). Measured before the rebuild: `press 3.43 / 98.8% / 1 blob` ·
`lockers 2.43 / 87.5% / 3` · `dossier 1.97 / 94.0% / 2` · current 1.62.

### ⛔⛔ v1 WAS NOT A PRESS, IT WAS A RECTANGLE ON A SINE WAVE
Five separate reasons, all mechanical rather than stylistic:
1. **Nothing DROVE it.** A ram with no linkage is an animated rectangle.
2. **The die passed THROUGH the sprite** instead of landing on it.
3. **No reaction** — no squash, no recoil, no dust, so nothing was struck.
4. **The belt ran continuously while a sprite sat still under the ram**, so the
   work was not on the belt in any believable sense.
5. ⛔ **Every sprite got the SAME wizard hat** — on a shot whose line is *"each
   with its OWN personality"*. The content contradicted the copy.

### ⭐ THE FIX: A SOLVED SLIDER-CRANK, NOT A POSED ONE
    pin     = wheel + R(cos t, sin t)
    ramPinY = pinY + sqrt(L^2 - (RAM_X - pinX)^2)
The flywheel drives the crosshead through a rod of **fixed length** — draw the rod
between those two points and it never stretches. The wheel turning is also the
constant layer, so the machine is visibly powered between strokes.

### ⛔⛔ TWO GEOMETRY TRAPS, BOTH OF WHICH SHIPPED SILENTLY THE FIRST TIME
1. **THE DIE WAS PRESSING AIR — 34px above the head.** I sized the stroke against
   the sprite's BOUNDING BOX, but `Claude` draws its body from **viewBox y=265 of
   1024**, so the visible head top sits 26% of the sprite's height below the box
   top. ⭐ **Contact must be derived from where the drawing starts, never from the
   layout box.** `S7_HEAD = FLOOR - W + 265*(W/1024)`, and the die offset is then
   solved to land 8px inside it. Same family as the s2 lift: the sprite's real
   geometry is in props.tsx and it is not the box you placed.
2. **AN OFFSET CRANK IS NOT SYMMETRIC.** Bottom-dead-centre is NOT at u=0.5 and
   the ram is not highest at u=0 — assuming either puts the belt's index stroke
   **underneath a descending die**. ⭐ Sample the linkage (240 points, once at
   module load) and read `uTop`/`uBdc` off it rather than trusting algebra.

### ⭐ THE BELT INDEXES, AND IT PAYS TWICE
It advances only around the TOP of the stroke, so the work is never moving while
the die is near it — which is how a stamping line actually runs, AND it hands the
shot a free hierarchy: the belt moves, THEN the ram moves, never both
([[reel-motion-hierarchy]]).
⛔ `EASE` is the wrong curve for an index — it is so front-loaded it snapped 35%
of the move in its first frame. Smoothstep.

### ⭐ "EACH WITH ITS OWN" IS NOW LITERAL
`S7_KIT` cycles hardhat -> WIZARD+Reddit -> beret+Figma -> cap+Meta, revealed on
the stroke. The line stops being asserted and starts being shown.

**GATES:** `motion 6.79 (v1 3.43, current s7 1.62) · hero 88.2% · 2 blobs ·
0 dead frames · tsc clean`

### ⏸ OPEN
1. Alex to approve the rebuilt press -> flip `s7v` default to `press`.
2. **SFX — the last item, and still nothing exists.**

## STAGE 9b — ⛔⛔ THE BELT WAS RUNNING BACKWARDS. My bug, from the fix before it.
> Alex: *"why is the press thing going back and forth, it should go one direction
> and then stamp WHOLE outfits onto them."*

**Both true.**

### ⛔⛔ AN INDEX IS MONOTONIC BY DEFINITION — I MADE IT A BUMP
Stage 9 moved the index window to centre on the top of the stroke:

    dTop = |((u - uTop + 1.5) % 1) - 0.5|
    adv  = 1 - smoothstep((dTop - 0.06) / 0.30)      // ⛔ 0 -> 1 -> 0

That is a **bump function**: `adv` rises to 1 at the top of the stroke and falls
back to 0 before the cycle ends, so `belt = (cyc + adv)*SPACING` advanced and then
**reversed, every single cycle.** The previous version (`EASE(clamp01((u-0.58)/0.36))`)
was monotonic and correct; "improving" it broke it.
⭐ **THE FIX IS TO REBASE THE CYCLE ON BOTTOM-DEAD-CENTRE.** With u=0 at the
strike, the index ramps 0→1 exactly once and then HOLDS at 1 until the cycle rolls
over — at which point `cyc` increments and `adv` resets, so `(cyc + adv)` is
continuous and never decreases.
⛔ **AND IT IS AN ASSERTION, NOT AN OPINION.** Replicating the formula in Python
and counting frames where `belt[i+1] < belt[i]` reports 0/67. That check costs
seconds and would have caught it before Alex did.

### ⭐ AND THE SAME SCRIPT SOLVED THE SPACING
The first monotonic version peaked at **31.9 px/frame**, past the ~26px/frame
strobe ceiling ([[mascot-walk-cycle-in-midair]]). Sweeping SPACING × window
against three gates at once — monotonic · peak ≤ 26 · die clear of the head while
the belt moves — picked **SPACING 225 / window 0.42**: peak 24.2px/f, 43px
clearance. ⛔ Do not choose a travel distance by eye when three constraints are
coupled.

### ⛔ "A HAT IS NOT AN OUTFIT"
`COSTUMES` is headgear only, so the press was pressing a hat onto a naked sprite.
Added `OUTFITS` — headgear AND a torso garment (hi-vis + bands · indigo robe +
star · smock + pockets · jacket + lapels).
⛔ **THE GARMENT MUST START BELOW y=505.** `Claude`'s eyes are at viewBox
y 378..496, so a vest drawn where a real vest sits **covers the face**. The torso
is only y 505..710 — that is the entire budget.
⛔ And the file's own rule bit me: **axis-aligned rects only** (`crispEdges` is the
whole pixel look) — I had put `rx` on the smock pockets. Removed.
⭐ The reveal is now a white FLASH on the strike, not an opacity fade — it reads
as pressed on rather than faded in.

**GATES:** `motion 6.07 · hero 89.8% · 2 blobs · 0 dead · belt 0 backward frames ·
peak 24.2px/f · tsc clean`

## STAGE 10 — s7 SHIPPED + THE FIRST SFX IN THE REEL (2026-08-08)
> Alex: *"put it into the main video… have more animated components like the
> spinning wheel and actual sfx for this scene that sound like the real thing."*

`s7v` defaults to `press`. Added a GEAR TRAIN so the machine has moving parts
beyond the ram: **teeth on the flywheel · a meshing pinion (counter-rotating at
the true 42/26 tooth ratio — a meshed pair turning the same way is the tell that
it is decoration) · a drive chain with scrolling links · a motor pulley · a
pressure gauge whose needle swings with the stroke · guide blocks riding the
columns · exhaust puffs · sparks off the die.**
⭐ Every part is ATTACHED to the machine, so it buys motion without adding a
second thing to read. **s7 motion 1.62 → 7.80, the highest body shot in the reel**;
hero 86.1% / 3 blobs.

### ⛔⛔ THE RENDER 404'd — `--public-dir=pub12` HAS NO `sfx/`
`staticFile('sfx/...')` resolves against the **public dir passed to the render**,
and `pub12` holds only footage/logos/plates. The whole render died on
`404 .../public/sfx/am/gear-slow.wav`.
⛔ **AND MY OWN VALIDATION MISSED IT BECAUSE IT CHECKED `public/sfx`** — the
directory the render never reads. A validator pointed at the wrong root reports a
clean bill on a build that cannot start. Six files hard-linked into `pub12/sfx/`
(links, not copies: the dir is copied on EVERY render, [[remotion-public-dir-render-cost]]).

### ⛔⛔ I SET THE LEVELS BY HAND AND THEY WERE ~14 dB TOO HOT
`punch.wav` at my hand-picked `vol 0.05` peaks at **-31.8 dB against a voice
whose RMS is -35.5** — i.e. the effect was LOUDER than the speech. The library's
intrinsic loudness varies ~20 dB, which is exactly why the repo says a shared
constant cannot deliver a level. Solved with the documented formula at per-class
depths (impact 10 · event 14 · texture 16-19):
`vol = 10^((voRms - DEPTH - filePeak)/20)`.
⛔ `tools/solve_sfx.py` could NOT do it — it drives `audit_sfx.py`, which only
finds cues that are TOO LOUD, and it is hardcoded to `Code.tsx`
([[reel-tools-hardcoded-to-old-reel]]).

### ⛔⛔⭐ AND MY VERIFICATION WAS WRONG TWICE BEFORE IT WAS RIGHT
1. Comparing **peak-in-a-window** between the two renders reported every cue
   "silent" — a window containing speech always reports the speech.
2. ⭐ **THE RIGHT INSTRUMENT IS TO DIFFERENCE THE TWO RENDERS.** `v5 - v4` IS the
   SFX bus, soloed, with nothing else in it. It proves presence AND level:
   all five events PRESENT, bus peak -46.2 dB against a voice RMS of -35.5 =
   **10.7 dB under**, which is the house impact target.
⭐ Built `out/LISTEN-s7-press.wav` per [[listening-test-first]] — one beep then
the SFX soloed, two beeps then the finished mix. Whether a press should sit at
the house depth is a taste call, and one listen settles it faster than argument.

### LEADS ARE MEASURED, NOT ASSUMED (`tools/sfx_peak.py`)
`punch/clank/thud` peak at **0.00s — fire ON the frame**; `servo` 0.15; `gear-slow`
0.10; `gear-chain` is flagged *"never use as a hit"* so it is texture only. A flat
0.30s house lead would have put every strike 9 frames early.

### ⏸ OPEN
1. Alex to judge the press level (listening test sent).
2. **The other ten shots still have NO sound and there is no music bed.** When it
   is added it must be `bed_clean.wav` ([[bed-wav-has-a-voice-in-it]]).
3. Soft spots remain: s6 1.69 · s8 2.15 · s11 2.05.

## STAGE 11 — FULL SOUND DESIGN + THE CONVEYOR POP-IN (2026-08-08)

### ⛔⛔ THE QUEUE POPPED IN — AN OFF-BY-ONE IN THE SLOT RANGE
> Alex: *"the claude sprite to the left of the middle one only appears after the
> middle one gets stamped."*

Exactly right, and not a timing bug. I drew slots `o = -1..2`, so the
furthest-upstream sprite **was the next one to be stamped**. The moment the belt
indexed, that sprite moved into the press and left nothing behind it — so the
next blank appeared out of thin air instead of riding in.
⭐ **A CONVEYOR MUST BE DRAWN ONE SLOT BEYOND THE FRAME AT BOTH ENDS**, so work is
always arriving from off-screen and leaving to off-screen. `-3..2`, with the
existing x-cull discarding the ones genuinely outside. 4 → 6 sprites resident.

### ⭐ 56 CUES + A BED, ACROSS ALL ELEVEN SHOTS
> Alex: *"you didnt add sfx to this video so do that."* True — stage 10 sounded
> only s7, and one scene with sound reads as worse than none.

⭐ **EVERY CUE TIME IS A MEASURED PICTURE EVENT.** Local maxima of band motion were
read off the render per shot, so a cue can only land on something that actually
happens — the standing failure is a beat grid instead of a physical action
([[reel-sfx-pass]]). ⛔ Three shots had NO detectable maxima (s3 is a smooth
slide), which is itself the tell that those shots are soft.

⭐ **EVERY LEAD IS THE FILE'S OWN PEAK OFFSET** (`tools/sfx_peak.py`): punch /
clank / thud / click-* / coin_get all peak at 0.00s and fire ON the frame;
whoosh-fast needs 0.20s; `tick`, `type`, `achievement`, `chime-pos`,
`click-burst` are flagged *"never use as a hit"* and are texture only.

⭐ **EVERY LEVEL IS SOLVED, NOT CHOSEN** — `vol = 10^((voRms - DEPTH - filePeak)/20)`
at house depths (impact 10 · event 14 · texture 17 · air 19 · music 20). Solved
range 0.0019..0.0207 — a 21 dB spread, which is precisely why a shared constant
cannot deliver a level.

⛔ **THE BED IS `bed_clean.wav`, RE-TRANSCRIBED HERE**: clean. `bed_pocket_clean`
still returns a music marker. It carries `loop` — an 8.6s bed under a 23.4s reel
silently stops a third of the way in and nothing warns.

### ⭐ VERIFIED BY DIFFERENCING AGAINST THE SILENT CUT
`v4` has no audio design at all, so **`v6 - v4` IS the sound design, soloed**.
All 11 shots fire; bus peak -43.0 dB against a -34.2 dB voice = **8.8 dB under**;
bed audible at 0.5 / 8 / 15 / 22.5s, so the loop covers the reel.

### ⏸ OPEN — three animation asks, all needing options shown first
1. **s3 (3.17-4.53s)** *"a lot more stimulating and interesting to retain
   attention"* — and it is the ONE shot with no detectable motion peak at all.
2. **s8 (14.27-16.43s)** — five variants wanted. (Alex said "14 seconds"; s7 ends
   at 14.27 and he had just approved it, so this reads as s8. CONFIRM.)
3. **s9 (16.43-18.93s)** — the PAYOFF, wants elevating.

## STAGE 12 — HEADERS REWRITTEN + SOUND DENSITY PASS (2026-08-08)

### ⛔⛔ THREE HEADERS REPEATED THE VOICE. AUDITED, NOT EYEBALLED.
> Alex: *"the headers need to be more interesting, like RELATED, not just random
> stuff that actually dont provide value."*

Diffing each header against its own VO line found it immediately:
| shot | was | fault |
|---|---|---|
| s3 | THE AGENCY | ⛔ he SAYS "it is called The Agency" — law 29 |
| s9 | ONE CLICK | ⛔ he SAYS "in one click" |
| s11 | COMMENT AGENCY | ⛔ he SAYS it — but a CTA keyword must be readable, so this one STAYS |
| s4 · s6 · s7 · s10 | AND CLIMBING · REAL FILES · ITS OWN BRIEF · YOURS. FREE. | adjectives carrying no information |

⭐ **A HEADER SPENDS THE ONLY LINE ON SCREEN, SO IT MUST CARRY A FACT THE VOICE
DOES NOT SAY.** Every replacement comes from the Stage-0.5 verification, never
from copywriting:
`22,719 FORKS` · `10 MONTHS OLD` (created 2025-10-13 — 139k stars in ten months IS
the story) · `MARKETING: 36` · `286 BRIEFS` · `CURSOR TOO` (it also installs into
Codex/Gemini/Osaurus) · `MAC WIN LINUX` · `COMMERCIAL OK` (MIT permits selling).
All eleven measured on the render: inside x48..1032 and clear of the 250 dead zone.
⚠️ s10's sits BEHIND his head by design (law 86) and reads "COMM…AL OK". That is
the house full-bleed treatment, but it is worth a shorter word next pass.

### ⭐ SOUND: 56 → 92 CUES, AND DENSITY WAS THE RIGHT LEVER
> Alex: *"the sfx at the beginning and throughout there arent enough, not good enough."*

⛔ **MORE VOLUME WAS NOT AVAILABLE.** Impacts already sat at 10 dB under the voice,
which is the loudest the house allows; pushing further just ducks the words.
⭐ Measured the real defect instead: **seven of eleven shots had ONE onset and then
nothing** — technically scored, audibly bare. The fix is LAYERS:
every beat is now a PAIR (movement, then texture 20-30ms later), every shot
carries a bed that cannot settle, and every shot gets a TAIL so it does not stop
while he keeps talking. Texture/air classes came up 2-3 dB; impacts unchanged.
Bus now **6.9 dB under the voice** (was 8.8), all 92 levels solved per file.
⛔ s10 stays deliberately sparse — full-bleed FACE, and there the subject is him.

### ⏸ STILL OPEN
s3 · s8 (five variants) · s9 — the three animation asks, options first.

## STAGE 13 — ⛔⛔ THE TURN CUT WAS TOO TIGHT. WIDENED, AND NOW GATED.
> Alex, a THIRD time: *"between six and seven seconds for a split second I am
> looking away. Like, it glitches."*

He was right again and the cause is a measurement choice, not an oversight.
Stage 7 cut the span the log had measured at **|z| > 1.9 → src 217-235**. Re-run
at |z| > 1.2 the excursion is **216-236**, so three frames of it stayed in the
reel: f215/216 turning INTO it, and **f236 — the first frame after the cut, still
at |z| 1.25.** A split second of turned face, exactly as described.

⭐⭐ **A THRESHOLD CHOSEN TO ISOLATE A PEAK IS THE WRONG THRESHOLD FOR CHOOSING A
CUT.** 1.9σ answers "where is the worst of it"; a cut has to clear the
SHOULDERS. Cut 215-236 (22 frames). Reel 23.40 → 23.60s… (699 frames).

### ⭐ AND THE GATE THAT SHOULD HAVE EXISTED FROM THE START
Checking the SOURCE for excursions is not the question. The question is **"is any
frame the REEL SHOWS turned?"** — which means mapping every reel frame through
BOTH cuts and reading the yaw there:

    shown(f) = f + LEAD + (f >= CUT_AT-LEAD ? CUT_LEN : 0)

Result: **0 of 699 shown frames exceed |z| 1.2; worst is 0.56** (was 7.0). That
gate is cheap and it is the one that answers the complaint.

### ⛔⛔ AND THE RE-CUT WOULD HAVE SILENTLY DESYNCED ALL 129 SFX CUES
The widened cut moved every shot after 6.9s by 2 frames. The cue list was written
in ABSOLUTE root seconds, so every cue after the splice would have drifted off
the picture it was authored against — invisibly, because a mistimed cue still
renders and still passes a level audit.
⭐ Converted the whole list to **shot-relative `{s, dt}`**, resolved through the
live shot table: `cueAt(c) = shot(c.s).at + c.dt`. The repo's own note said
"absolute lists desynced twice" and I had written a third; this is the fix
applied rather than repeated.
⛔ A J-cut lead is assigned to the shot it leads INTO, not the one it starts in.

### ⏸ NEXT — Alex's four animation directions, captured verbatim
- **s5 (7s)** "elevated significantly… something completely different"
- **s6 (10s)** as the three arrive, "lines come up through the top of them,
  connect to the middle where there's a spinning wheel… makes it grow bigger or
  faster… shows they're growing as a team"
- **s8 (15s)** "a cloth spray, and then he's wired up — a bunch of wires connect
  to a Claude Code logo, and that's what represents it"
- **s9 (17s)** "a big cursor mouse comes in… after those things get fanned out,
  the cursor clicks, then we see a blink, and then the brain gets really big"
  ⭐ the pink Brain already exists in `agencyCostumes.tsx` — this is a callback.

## STAGE 14 — THREE SHOTS REBUILT TO ALEX'S DIRECTIONS + A HOOK THAT ARRIVES

### ⛔⛔ MY SFX MEASUREMENT WAS LYING, AND IT MATTERED
I had been proving the sound design by differencing the current render against
`AGENCY_v4.mp4` (the silent cut). **That stopped being valid the moment the turn
cut was widened**: v4 is 702 frames and v9 is 699, so after 6.9s the two are
misaligned and the VOICE no longer cancels. The "-13.9 dB SFX peaks" I measured
were voice residue, not effects. ⛔ A differencing instrument is only valid
between renders that share a TIMELINE — and nothing warns when they stop doing so.
⛔ Subtracting the VO directly failed too (the least-squares gain solved to 0.001).
⭐ The reliable answer here is the one the memory already prescribes: when the
question is "can you hear it", **build the listening test** ([[listening-test-first]]).

### ⛔ THE HOOK HAD NO ARRIVAL
Alex: *"the beginning doesnt have any interesting or engaging sfx whatsoever."*
s1 had EIGHTEEN cues and every one was a click or a whoosh — **all transient, no
body**. Nothing lands ON frame 0. Added `open_boom` + `open_sting` + `open_shimmer`
layered at 0.000, which is what `Code.tsx`'s hook does ("a sub under the riser so
the lift has weight").
⛔ `open_riser`, `riser.mp3` and `sub.mp3` all measure **"never use as a hit"** —
they peak 0.9-2.2s in, so on a 1.8s hook they would crest after the shot ends.
Only the three that peak at 0.00-0.03s can carry frame 0.

### ⭐ THE REBUILDS (Alex's own directions, built as given)
- **s6** — the three specialists now POWER A GEAR: a filament rises from each as
  it lands, dots stream up it, and the wheel grows and spins faster with every
  connection. ⭐ The house proved this shape on reel 68 (agents feeding a hub);
  a gear rather than a brain also sets up s7's press.
- **s8** — the terminal is replaced by CABLES: four wires strike home from him
  into a big Claude mark, with pulses that never stop travelling. The old version
  printed the install command, which is real proof but is TEXT — and the captions
  already carry the words. ⭐ `claude.png` is 66% transparent (measured), the one
  logo here that may stand alone without a plate.
- **s9** — the fan spreads, a BIG CURSOR arrives and clicks, a white BLINK, and
  the pink **Brain from s1 returns and grows**. That closes the loop the hook
  opened, which is the callback the plan asked s9 to pay back.

### ⏸ s5 (7s) STILL NEEDS A DIRECTION
Alex asked for it "elevated significantly… something completely different" but
gave no shape for it, unlike the other three. ⛔ Do NOT guess — the SCALE axis
(286 tiny sprites) is literally the rejected round-1 concept, and a split-flap
board of 18 divisions is a wall of text, which is the note that killed s6 v1.

## STAGE 15 — v11: ALL ELEVEN SHOTS CLEAR THE MOTION FLOOR
`s1 7.61 · s2 5.64 · s3 4.60 · s4 7.53 · s5 4.62 · s6 2.80 · s7 8.50 · s8 3.11 ·
s9 6.42 · s10 4.11 · s11 2.07` — first time nothing is soft.

### ⛔⛔ s8 REBUILT WORSE BEFORE IT REBUILT BETTER — AND THE FILE HAD WARNED ME
The cables version first measured **1.99, below the floor and worse than the
terminal it replaced.** `bodiesAgency.tsx`'s own header says exactly why:
*"The old versions scrolled TEXT, and scrolling text generates frame-delta for
free. Replacing it with big drawn objects that arrive on a spring and then hold
is more visual and LESS alive."* I replaced a scrolling terminal with sprung
cables and hit the documented trap verbatim.
Fixes, in order of payoff: a travelling wave on every cable (1.99 → 2.20), then
the CAMERA (2.20 → 3.11).
⛔ **DEVIATING FROM THE PLAN'S `move` IS SOMETIMES CORRECT, BUT IT INVALIDATES THE
ZONE FIT.** `hold` was chosen for a SCREEN register; the rebuild made s8 an
OBJECT shot. Switching to `push` immediately breached the edge — the floor line
was still fitted with `safeSpan('hold')` (110..1003) and renders at **8..1060**
under a 1.19 zoom, and his shadow fell to x29. Re-fitted: 54..1026.
⭐ **A SPAN IS FITTED TO A MOVE. Change the move, re-fit every span in the shot.**

### ⭐⭐ THE SFX SOLO INSTRUMENT, FINALLY CORRECT
Differencing two renders broke when the timelines diverged; subtracting the VO at
the ASSUMED 0.30s LEAD failed too (gain solved to 0.001 = "no voice found").
⭐ **CROSS-CORRELATE FOR THE OFFSET INSTEAD OF ASSUMING IT**: the true offset is
**0.257s, short by 2048 samples — which is AAC encoder priming**, not a sync
fault. With that corrected the VO gain solves to **0.997** and the voice cancels
(residual/mix energy 0.048), so `mix - g*vo` IS the SFX bus.
⛔ Every earlier "the sfx measures X" in this log from stage 10-13 was measured on
a broken subtraction and should not be trusted.

### ⚠️ THE TWO SHOTS ALEX HAS NOT DIRECTED ARE THE TWO WITH THE WORST HIERARCHY
`s3 hero 15.8%` · `s5 hero 36.2%` — against a house bar of ~90%. **s3 is the "4
seconds" shot he called unstimulating**, so the complaint and the measurement
agree independently. Both need rebuilding, and s5 needs a direction first.

## STAGE 16 — ⛔⛔⭐ WHY HE COULD NOT HEAR THE SOUND, THREE TIMES RUNNING
> Alex, a third time: *"you didnt add in the sfx and the music and stuff like
> that here ???"*

**He was right every time and the cause was one line of my solver.**

    vol = 10 ** ((REF - DEPTH - filePeak) / 20)

I set `REF` to the **QUIETEST WORD THE CUE OVERLAPS**, to guarantee no cue could
ever mask a syllable. Measured, per-word, across this VO:

    min    -46.8 dB   <- what I referenced EVERY cue and BOTH beds to
    p10    -40.0 dB
    median -34.9 dB   <- where dialogue actually sits
    max    -25.5 dB

**The quietest word is 11.9 dB below the median**, so the entire mix was solved
~12 dB too quiet. `MUSIC_BED` shipped at **0.0019 = -54.4 dB of gain**; the music
was not quiet, it was *absent*. And the fix I made in stage 12 to stop cues
ducking words is exactly what caused it — I traded audibility for safety and
never checked what the trade cost.

⭐ **DIALOGUE IS A MEDIAN, NOT A MINIMUM.** An outlier function word ("a", "it",
"in") is not the level of the voice. Reference the median and enforce the
per-word ceiling separately if a specific cue collides.
⛔ **AND NO GATE COULD SEE THIS.** `audit_sfx.py` only asks "is anything TOO
LOUD" — a mix that is 12 dB too quiet passes it perfectly. There was no
too-quiet gate, and three rounds of "not enough SFX" was the missing gate
talking.

Re-solved against the median at tighter depths (impact 8 · event 11 · texture 14
· air 16 · music 13 · room tone 19).

## STAGE 16b — the rest of the round
- ⭐ **THIRD EDL CUT.** *"between 18 and 19 seconds there's a slightly extra long
  pause"* — measured 0.60s of silence at reel 18.40-19.00 between "click." and
  "You". Cut 11 frames. ⛔ This forced `CUT_AT/CUT_LEN` to become a **LIST** in
  both the generator and `srcAt`, and the boundary snap had to iterate every cut
  — s9 straddled the new one by 3 frames the moment it was added. Reel 22.93s.
- **s8** wires now originate INSIDE the sprite (`LX+18`, drawn under him) instead
  of at `LX+96`, where they read as cables lying beside him.
- **s9** ⛔ the brain WAS in the danger zone: x886 + a 190px body at scale 1.5 =
  right edge 1028, and s9's move is `pull`, which is WIDEST AT t=0 — so it
  rendered at **x1126**, 94px past the line. ⭐ Alex's own direction fixes it:
  the cards fly INTO the brain and the brain becomes the whole shot, so it
  belongs at CENTRE. Cards absorbed then orbiting, cursor 1.0 → 1.8.
- **s11** pad 420x96 → 560x132, a glow that blooms on the hit, stamp head +46%,
  guide 144x184 → 192x240, sprite 220 → 250. ⛔ Him at x880/rx122 reached x1002,
  past `safeSpan('push')`'s 975 — moved to 846.

### ⚠️ "process" AT 14s — I CANNOT REPRODUCE IT, and said so rather than guessing
Isolated transcription of reel 13.6-14.2 returns **'process.'** cleanly; the 10ms
energy shows the full sibilant decaying to -54.8 dB; and the rendered caption is
complete and centred. The word ends at 14.04 and s7 runs to 14.17, so the cut
does not clip it either. Needs Alex to say whether he means the SOUND or the TYPE.

### ⏸ s3 (3s) and s5 (7s) still need directions — and they measure worst
`s3 hero 15.8%` · `s5 hero 36.2%` against a ~90% bar.

## STAGE 17 — ⛔⛔⭐ THE DOT SCREEN ON HIS FACE WAS `Paperize`, NOT `Grain`
> Alex: *"i dont like the grainy filter on my face and body when my face goes
> full screen."*

**My first fix was the wrong layer and it would have shipped still broken.**
I removed `<Grain>` on full-bleed shots — correct, necessary, and NOT the cause.
The screen came from **`Paperize`**, which:
1. renders **two full-frame overlay `AbsoluteFill`s** (a multiply dot-screen
   `dots={6}` and an overlay grain) **unconditionally — they are not clipped to
   the wrapped children**, and
2. sits **AFTER `FullFigure`** in the Shot's band order.
On s10 `children` is `undefined`, so Paperize textured **nothing** and screened
**his face**. ⭐ A wrapper that paints whether or not it wraps anything is a trap
the band order cannot reveal — it looks correctly placed.

⛔⛔ **AND THE MEASUREMENT NEARLY SENT ME THE WRONG WAY TWICE.**
- Judging it off my own half-scale contact sheet upscaled 2.25x could not
  distinguish a real screen from resampling. **Pull a FULL-RES still.**
- An FFT peak/median test read **2701** before the fix and **3954 after** — it
  went UP, because the statistic is dominated by low-frequency FACE structure,
  not by the screen. ⭐ **A number that moves the wrong way after a fix that
  visibly worked is a broken instrument, not a failed fix.** The eye settled it
  in one look ([[listening-test-first]]'s principle, in the visual domain).

## STAGE 17b
- **s9** fan 7 → 10 cards, arc ±58° → ±84°, radius 150 → 232 (*"fanned out more
  and wider… so the click is more satisfying"* — the payoff of a collapse scales
  with how much collapses). Brain ~223px → ~350px (*"really big"*).
  ⭐ Zone-verified PER FRAME: the only frames exceeding 48..1032 are the **five
  blink frames**, which are a deliberate full-frame flash. **0 frames breach for
  real content** — a whole-shot min/max would have called this a breach and been
  wrong.
- **VO delivered** for Adobe Podcast: `out/deliver/AGENCY-VO-for-enhance.wav`,
  48k/16-bit stereo, **exactly 697 frames**.
  ⛔⛔ THE RETURNED FILE MUST BE THE SAME LENGTH. Enhance trims silence by
  default; the picture is conformed frame-for-frame through TWO excisions, so any
  change desyncs everything ([[edl-must-record-every-cut]]). Verify before mounting.

## STAGE 18 — ⭐ SHIPPED (2026-08-08). Full-res master delivered.
`gdst:"Claude Reels/Face/*Videos/12 - AGENCY/"`
| file | |
|---|---|
| `12 - AGENCY.mp4` | 1080x1920 · 30fps · **697 frames** · h264 crf17 · AAC 48k stereo · 23.296s · 48.3 MB |
| `caption.txt` | 381 words, opens AND closes on the keyword, 10 tags, zero em-dashes |
| `AGENCY - The Free AI Agency Setup.docx` | built via `make_lead_magnet.py`, valid OOXML, verified by unzip |

⛔ Convention checked against the folder rather than assumed — the recent reels
(10 CODE, 14 SEO) use `NN - NAME.mp4` + `caption.txt` + `NAME - Title.docx`, NOT
the older `01_Claude-EYES.mp4` form. ⛔ The working VO in `out/deliver/` was
deliberately NOT uploaded.

### ⭐ FACTS RE-PULLED AT SHIP, as the log demanded
`139,875 stars · 22,819 forks` (were 139,093 / 22,719 at build, +782 in a day —
the "re-pull before ship" note was right). Caption and doc carry the LIVE
numbers; the reel's graphic carries the capture. ⚠️ s3's header reads
`22,719 FORKS`, now 100 light. A reel is a snapshot and the VO's "over 124,000"
stays true, but flag it if it is ever re-rendered.

### THE SHIPPED NUMBERS
`s1 9.45 · s2 5.77 · s3 4.51 · s4 7.19 · s5 4.03 · s6 2.79 · s7 7.99 · s8 3.17 ·
s9 7.84 · s10 3.69 · s11 4.39` — every shot over the 2.07 floor.
Hero share: nine of eleven at 84-100%.

### ⛔ SHIPPED WITH KNOWN GAPS, RECORDED SO THEY ARE NOT REDISCOVERED
1. **s3 hero 17.7%** — the one shot never given a direction. It is the weakest
   thing in the reel and the only one with no motion peak the SFX pass could land
   a cue on. Two independent measurements, same conclusion.
2. **FOUR SHOTS OPEN UNDER THE 10% FRAME-0 INK FLOOR**: s6 2.3% · s9 3.8% ·
   s3 5.6% · s4 8.6%. s6 is the worst in the reel and also its lowest hero share
   (69.8%) — those are probably the same defect seen twice. Cheap to fix: start
   the content on screen instead of animating it in.
3. **s7 keeps ink past the 48px rail** — deliberate. A conveyor carries work off
   screen; that is content passing THROUGH the frame edge, not crowding it. The
   sprites fade over the last 130px rather than hard-clipping.

---

# ROUND 31 — TRIAL VARIANTS. ⛔ I BUILT THE WRONG THING FIRST.

Alex: *"can you also make 2 more trial reel variants for this video here?"* I
rendered four full reels that differed **only in the hook's header text** —
"FREE AI AGENCY" / "$0 AI AGENCY" / "124K STARS" / "AN ENTIRE AGENCY" — and
started uploading them. His reply: *"are these supposed to be the different trial
reel versions or whats going on here"*, then, when asked: **"hook animations"**.

### ⭐ THE PRECEDENT SETTLED IT, AND IT WAS ALREADY ON DISK
`14 - SEO.mp4` vs `14 - SEO (trial, swarm hook).mp4`. Same VO, same captions,
same 697 frames — and the master inspects ONE page with a magnifier while the
trial tiles THIRTY with a counter climbing "0/30 → 29/30 pages". **A trial
variant is a different SCENE for shot 1.** Text is not a variant; it is a typo
fix with a new filename.

⭐ **THE CHECK I SHOULD HAVE RUN BEFORE RENDERING FOUR REELS:** open the last
approved artefact of the same kind. It was two directories away.

### ⛔ A HERO THAT SHRINKS ON FRAME 0 IS A RETREAT
THE SWARM opened with one card at 2.9x easing down to 1x over ten frames, so the
filmstrip read *big card · smaller card · smaller card*. Nothing was arriving;
something was leaving — the exact inverse of the stun-gun frame 0.
⭐ **Move the scale off the OBJECT and onto the GROUP.** The card now never
changes size; the WALL is scaled about the origin and steps down as each wave
fires, which reads as a camera pulling back to keep up. Same pixels, opposite
meaning.

### ⛔⛔ A ROTATING OBJECT IS TALLEST WHEN IT IS TURNED
The pour hopper passed the header ceiling upright and breached by 45px at full
tip, because the rim's far corner swings from -104 to -171 local at 64°:

    HY 604   tip 0 -> 470.4 OK      tip 64 -> 425.0 BREACH
    HY 650   tip 0 -> 523.8 OK      tip 64 -> 472.4 OK

⭐ [[header-ceiling-at-max-zoom]] says measure at max ZOOM. This adds: **and at
max ROTATION.** Solve the binding pose, not the rest pose — the same failure as
[[measure-pose-not-motion]], on a prop instead of the mascot.

### ⭐⭐ hero_share TOLD ME THE ACTOR WAS A BYSTANDER
Measured at matching scale over the same 55 frames:

    s1 PULL  (approved master)   hero 92.7%   2 blobs
    s1 SWARM (round 2)           hero 59.6%   2 blobs   <- same count, half the share

The blob COUNT matched the approved hook, so a count check passes it. **The SHARE
is what exposed it:** the master reads 92.7% because the chain physically reaches
his hands, so he and the object are one mass. Mine was a wall over there and a
sprite over here, watching. ⭐ The fix was CAUSAL, not compositional — the swarm
now grows out of a card he is HOLDING (slots ordered by distance from his hands,
group scaled about that point). **100%, 1 blob.**

### ⛔ AND THE SAME TOOL THEN LIED ABOUT THE POUR
Shifting the heap 24px so it buries his legs — visible in the frame, verified by
eye — moved hero share by **0.0%** (63.1% before and after). Per
[[when-the-instrument-lies]] rule 2, a number that does not move after a fix you
can SEE worked is not measuring your change. Shipped at 63.1% / 2 blobs on the
eye, which is the approved master's own blob count.
⛔ `ceiling_check.py` and `band_overflow.py` BOTH fail the shipped master
identically (y≈279 every frame; "body paints 46.4%") — they are probe tools, not
composite tools. Rule 1: a gate that fails the shipped catalogue is the broken thing.

### ⛔ A PATCH MUST RE-ENCODE AT THE REFERENCE'S CRF
`patch_render.py` hard-coded `-crf 18` while delivery is 17, and it re-encodes
EVERY frame — so 92% of the video that was never patched came back degraded:
**10.2 Mbps against a 16.3 Mbps master.** Now `--crf`, defaulted to 18 so other
reels are unchanged. ⭐ Patch cost: 55 of 697 frames, 8%, ~90s per variant.

### SHIPPED
`out/deliver/12 - AGENCY (trial, swarm hook).mp4` · `(trial, pour hook).mp4`
697 frames each, 1080x1920, CRF 17, audio byte-identical to the master (23.296s).
The four text-swap variants were deleted locally; **the two already pushed to
Drive (scale, fire) are stale and still need removing there.**
